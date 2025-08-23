import { useNavigate } from 'react-router-dom'; 
import logo from '../images/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Home() {
  
  const navigate = useNavigate(); 

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <img src={logo} alt="Logo" style={{ maxWidth: '7%' }} />
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">HOME</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/blogs">BLOGS</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/about_us">ABOUT US</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/contact_us">CONTACT US</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/products">PRODUCTS</a>
              </li>
            </ul>
            <button onClick={() => navigate('/login')} className="btn btn-primary">Login</button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Home;
