import { useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import {Link} from "react-router-dom";

const ListUsers = () => {
  const history = useHistory();
  const [dataUser, setDataUser] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [idHapus, setIdHapus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("dataLoginAdmin");
    if (!token) {
      history.push("/login-admin");
    }
    getDataUser();
  }, []);

  const getDataUser = () => {
    const token = localStorage.getItem("dataLoginAdmin");
    const dataSend = {
      token,
    };
    fetch(`${process.env.REACT_APP_API}/listAdmin`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        console.log(hasil.data);
        if (hasil.status === "berhasil") {
          setDataUser(hasil.data);
        } else {
          history.push("/login-admin");
        }
      });
  };

  const handleSimpan = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("dataLoginAdmin");
    const dataSend = {
      nama,
      email,
      password,
      token,
    };
    if (nama === "" || email === "" || password === "") {
      swal("Failed", "Data Gagal diTambahkan", "error");
      return;
    }
    fetch(`${process.env.REACT_APP_API}/tambahAdmin`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        if (hasil.status === "berhasil") {
          swal("Sukses", "Data Berhasil di Simpan", "success");
          setLgShow(false);
          clearData();
          getDataUser();
        } else {
          history.push("/login-admin");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const clearData = () => {
    setNama("");
    setEmail("");
    setPassword("");
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleHapus = (id) => {
    setShow(true);
    setIdHapus(id);
  };

  const handleTriggerHapus = () => {
    const token = localStorage.getItem("dataLoginAdmin");
    const dataSend = {
      token,
      id_user: idHapus,
    };
    fetch(`${process.env.REACT_APP_API}/hapusAdmin`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        if (hasil.status === "berhasil") {
          swal("Sukses", "Data Berhasil di Simpan", "success");
          setShow(false);
          getDataUser();
        } else {
          history.push("/login-admin");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      {/* Modal Tambah Admin */}
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
            <div class="form-group">
              <label htmlFor="nama">Nama</label>
              <input
                onChange={(e) => setNama(e.target.value)}
                value={nama}
                type="text"
                class="form-control"
                id="nama"
                aria-describedby="nama"
                placeholder="Nama Lengkap"
              />
            </div>
            <div class="form-group">
              <label htmlFor="email">Email address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={(e) => handleSimpan(e)}
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal Hapus Admin */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>Anda Yakin Untuk Menghapus Data</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleTriggerHapus()}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container">
        <Link class="btn btn-primary mt-2"  role="button" to="/list-video-admin">
            kembali
        </Link>
      </div>
      <h1 className="text-center pb-5 mb-5 mt-5">List Users</h1>
      <div className="container">
        <button
          onClick={() => setLgShow(true)}
          className="btn btn-info rounded mb-4"
        >
          + Tambah
        </button>
        <Table striped bordered hover>
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataUser.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.nama}</td>
                  <td>{data.email}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleHapus(data.id_user)}
                    >
                      hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ListUsers;
