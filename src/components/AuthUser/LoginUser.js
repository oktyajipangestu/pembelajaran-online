import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

const LoginUser = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    const login = localStorage.getItem("loginUser");
    if(login) {
    //   history.push('/list-video-admin');
    }
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataSend = {
      email,
      password,
    };

    if (email === "" || password === "") {
      swal('Failed', 'Gagal Login', 'error');
    } else {
      fetch(`${process.env.REACT_APP_API}/loginPeserta`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((hasil) => {
            console.log(hasil)
        //   if(hasil.status === 'berhasil') {
        //     localStorage.setItem("loginUser", hasil.token);
        //     history.push("/list-video-admin");
        //   }

        })
        .catch((err) => {
            alert(err);
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h1>Login User</h1>
              <div className="d-flex justify-content-end social-icon">
                <span>
                  <i className="fab fa-facebook-square"></i>
                </span>
                <span>
                  <i className="fab fa-google-plus-square"></i>
                </span>
                <span>
                  <i className="fab fa-twitter-square"></i>
                </span>
              </div>
            </div>

            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="email"
                  ></input>
                </div>

                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="password"
                  ></input>
                </div>

                <div className="form-group">
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="btn float-right login_btn"
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginUser;