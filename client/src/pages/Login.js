import React, { useState } from 'react';
import Axios from 'axios';
import API_BASE_URL from '../config/api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Header from '../components/Header';
import Cookies from 'js-cookie';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`${API_BASE_URL}/login`, {
        user_email: email,
        password: password
      });
      if (response.data.message === 'Login successful') {
        // Set cookie to store user email
        Cookies.set('user_email', email, { expires: 7 }); // Set cookie to expire in 7 days
        
        // Redirect to profile page or another page after successful login
        navigate('/profile');
      } else {
        alert(response.data.message); // Show backend message
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Network error or server is down. Please try again later.');
    }
  };

  return (
    <div className='cu'>
      <Header/>
      <div className="login-container d-flex justify-content-center align-items-center">
        <div className="login-box p-4 shadow-lg">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">Login</button>
              <a href="/forgot_password" className="text-decoration-none">Forgot Password?</a>
            </div>
          </form>
          <div className="text-center mt-4">
            <p>Don't have an account?</p>
            <button onClick={() => navigate('/signup')} className="btn btn-outline-primary">Create an Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
