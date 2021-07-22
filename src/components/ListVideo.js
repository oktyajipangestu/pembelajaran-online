import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactPlayer from 'react-player';
import swal from "sweetalert";

const ListVideo = () => {
  const [dataListVideo, setDataListVideo] = useState([]);
  const [handleShowVideo, setHandleShowVideo] = useState(false);
  const [linkVideo, setLinkVideo] = useState('');
  const [lgShow, setLgShow] = useState(false);
  const [judul, setJudul] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [linkTumbnail, setLinkTumbnail] = useState('');
  const [linkVideoUpload, setLinkVideoUpload] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  
  const handleClose = () => {
    setHandleShowVideo(false);
    setShowDelete(false);
  }

  const handleShow = () => {
    setShowDelete(true);
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const token = localStorage.getItem("dataLoginAdmin");
    const sendData = {
      token,
    };

    fetch(`${process.env.REACT_APP_API}/listKonten`, {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(hasil => {
      setDataListVideo(hasil.data);
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

  const handleSimpan = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('dataLoginAdmin');
    const dataSend = {
      judul: judul,
      keterangan: keterangan,
      link_thumbnail: linkTumbnail,
      link_video: linkVideoUpload,
      token: token
    }

    if(judul==='' || keterangan==='' || linkTumbnail==='' || linkVideoUpload==='') {
      swal("Failed", "Form Harus diisi Semua", 'error');
      return;
    }

    fetch(`${process.env.REACT_APP_API}/tambahKonten`, {
      method: 'POST',
      body: JSON.stringify(dataSend),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(res => res.json())
    .then(hasil => {
      console.log('hasil => ', hasil)
      if(hasil.status === "berhasil") {
        clearState();
        swal('Success', "Data Bersail ditambahkan", 'success');
        getData()
      } else {
        swal('Failed', "Data Gagal Ditambahkan", 'error');
      }
    })
  }


  const clearState = () => {
    setJudul('');
    setKeterangan('');
    setLinkTumbnail('');
    setLinkVideoUpload('');
  }

  return (
    <>
      <Modal show={handleShowVideo} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Modal Tambah Video */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="judul">
                Judul
              </label>
              <input onChange={(e) => setJudul(e.target.value)} value={judul} type="text" className="form-control" id="judul" placeholder="judul">
              </input>
            </div>

            <div className="form-group">
              <label htmlFor="keterangan">
                Keterangan
              </label>
              <input onChange={(e) => setKeterangan(e.target.value)} value={keterangan} type="text" className="form-control" id="keterangan" placeholder="keterangan">
              </input>
            </div>

            <div className="form-group">
              <label htmlFor="link_tumbnail">
                Link Thumbnail
              </label>
              <input onChange={(e) => setLinkTumbnail(e.target.value)} value={linkTumbnail} type="text" className="form-control" id="link_tumbnail" placeholder="Link Tumbnail">
              </input>
            </div>

            <div className="form-group">
              <label htmlFor="link_video">
                Link Video
              </label>
              <input onChange={(e) => setLinkVideoUpload(e.target.value)} value={linkVideoUpload} type="text" className="form-control" id="link_video" placeholder="Link Video">
              </input>
            </div>

            <button onClick={(e) => handleSimpan(e)} className="btn btn-primary">Simpan</button>
          </form>
        </Modal.Body>
      </Modal>


      {/* Modal Hapus Data */}
      <Modal show={showDelete} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div class="jumbotron">
        <h1 class="display-4">Hello, world!</h1>
        <p class="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr class="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <button class="btn btn-primary btn-lg" onClick={() => setLgShow(true)} role="button">
          + Tambah Video
        </button>
      </div>

      <div className="row justify-content-center">
        {dataListVideo.map((data,index) => {
          return(
            <div key={index} class="card m-3 col-md-4 col-lg-3" style={{ width: "18rem", height: 'auto', border:'none' }}>
              <img src={data.link_thumbnail} onClick={() => handleOpenVideo(data) } class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{data.judul}</h5>
                <p class="card-text">
                  {data.keterangan}
                </p>
                <button onClick={() => handleShow()} class="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          );
        })}

      </div>
    </>
  );
};

export default ListVideo;
