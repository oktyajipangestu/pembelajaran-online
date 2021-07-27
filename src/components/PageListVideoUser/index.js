import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactPlayer from 'react-player';
import { useHistory, Link } from "react-router-dom";

const PageListVideoUser = () => {
  const history = useHistory();
  const [dataListVideo, setDataListVideo] = useState([]);
  const [handleShowVideo, setHandleShowVideo] = useState(false);
  const [linkVideo, setLinkVideo] = useState('');
  
  const handleClose = () => {
    setHandleShowVideo(false);
  }

  useEffect(() => {
    const login = localStorage.getItem('loginUser');
    if(!login){
      history.push('/');
    }
    getData();
  }, []);

  const getData = () => {
    const token = localStorage.getItem("loginUser");
    const sendData = {
      token,
    };

    fetch(`${process.env.REACT_APP_API}/listKontenPeserta`, {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(hasil => {
      if(hasil.status === "berhasil") {
        setDataListVideo(hasil.data);
      } else {
        history.push('/l');
        localStorage.removeItem("loginUser");
      }
      console.log(hasil.data);
    })
    .catch((err) => {
      alert(err);
    });
  };

  const handleOpenVideo = (data) => {
    setHandleShowVideo(true);
    setLinkVideo(data.link_video);
  }

  const logOut = () => {
    localStorage.removeItem('loginUser');
    history.push('/');
  }


  return (
    <>
      <Modal show={handleShowVideo} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <>
              <ReactPlayer
                pip={true}
                config={{
                  youtube: {
                    playerVars: {
                      showinfo: 1,
                      origin: window.location.origin
                    },
                  },
                }}
                width="100%"
                height="300px"
                controls={true}
                url={`${linkVideo}`}
              />
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>


      <div class="jumbotron">
        <h1 class="display-4">Aplikasi Pembelajaran</h1>
        <p class="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr class="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <Link class="btn btn-success btn-lg"  role="button" to="/list-users">
          User
        </Link>
        <button class="btn btn-danger btn-lg ml-3" onClick={() => logOut()} role="button">
          Logout
        </button>
      </div>

      <div className="row justify-content-center">
        {dataListVideo?dataListVideo.map((data,index) => {
          return(
            <div key={index} class="card m-3 col-md-4 col-lg-3" style={{ width: "18rem", height: 'auto', border:'none' }}>
              <img src={data.link_thumbnail} onClick={() => handleOpenVideo(data) } class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{data.judul}</h5>
                <p class="card-text">
                  {data.keterangan}
                </p>
              </div>
            </div>
          );
        }): ""}

      </div>
    </>
  );
};


export default PageListVideoUser;