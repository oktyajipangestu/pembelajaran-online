import './App.css';
import {Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1 className="my-3">Aplikasi Pembelajaran</h1>
      <p>Silahkan Login untuk memulai</p>
      <Link class="btn btn-primary"  role="button" to="/login-admin">
          Login User
      </Link>
    </div>
  );
}

export default App;
