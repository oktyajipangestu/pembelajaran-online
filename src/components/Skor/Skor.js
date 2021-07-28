import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Skor = () => {
  const history = useHistory();
  const [skor, setSkor] = useState([]);

  useEffect(() => {
    getNilai();
  }, []);

  const handleCobaLagi = () => {
    const token = localStorage.getItem("loginUser");
    const dataSend = {
      token,
    };
    fetch(`${process.env.REACT_APP_API}/selesaiUjian`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        if (hasil.status === "berhasil") {
          history.push("/quiz");
          return;
        } else {
          history.replace("/");
          return;
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getNilai = () => {
    const token = localStorage.getItem("loginUser");
    const dataSend = {
      token,
    };
    fetch(`${process.env.REACT_APP_API}/hitungSkor`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        if (hasil.status === "gagal") {
          history.replace("/");
          return;
        }
        setSkor(hasil);
      });
  };

  return (
    <>
      <div className="card" style={{ margin: "auto" }}>
        <div className="card-content" style={{ padding: "94px" }}>
          <div className="content text-center text-black">
            <h3>Nilai yang kamu peroleh</h3>
            <h1>{skor.skor ? skor.skor * 10 : null}</h1>
            <button
              className="btn btn-info mt-2"
              onClick={() => handleCobaLagi()}
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skor;
