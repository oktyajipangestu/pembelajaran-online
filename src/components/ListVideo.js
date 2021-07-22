import { useEffect, useState } from "react";

const ListVideo = () => {

  const [dataListVideo, setDataListVideo] = useState();

  useEffect(() => {
    getData();
  },[]);

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
    })
    .catch((err) => {
      alert(err);
    });
  };

  return (
    <>
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
        <a class="btn btn-primary btn-lg" href="#" role="button">
          Learn more
        </a>
      </div>

      <div className="row justify-content-center">
        {dataListVideo.map((data,index) => {
          return(
            <div key={index} class="card m-3 col-md-4 col-lg-3" style={{ width: "18rem", height: 'auto' }}>
              <img src={data.link_thumbnail} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{data.judul}</h5>
                <p class="card-text">
                  {data.keterangan}
                </p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          );
        })}

      </div>
    </>
  );
};

export default ListVideo;
