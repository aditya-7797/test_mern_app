import React, { useState } from 'react';
import Axios from 'axios';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaPinterest } from 'react-icons/fa';
import API_BASE_URL from '../config/api';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await Axios.post(`${API_BASE_URL}/create`, {
        user_email: email,
        password: password
      });

      // Clear input fields after successful creation
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Display success alert
      alert(response.data.message || "User created successfully");

      if (response.data.message === 'User created successfully') {
        // Set cookie to store user email
        Cookies.set('user_email', email, { expires: 7 }); // Set cookie to expire in 7 days

        // Redirect to profile page or another page after successful sign-up
        navigate('/profile');
      } 
    } catch (error) {
      console.error('Error creating user:', error);
      // Display error alert
      alert(error.response?.data?.message || 'Error creating user from frontend');
    }
  };
  return (
    <div>
      <Header/>
      <div className='cu'>
        <div className="container mt-5" style={{backgroundColor:"whitesmoke"}} >
          <div className="row justify-content-center">
            <div className="col-md-3">
              <h2 className="text-center mb-2">Sign Up</h2>
              <div className="d-grid gap-1.5">
                <button className="btn btn-danger btn-md mb-2">
                  <FaGoogle style={{ marginRight: '10px' }} />
                  Sign up with Gmail
                </button>
                <button className="btn btn-primary btn-md mb-2">
                  <FaFacebook style={{ marginRight: '10px' }} />
                  Sign up with Facebook
                </button>
                <button className="btn btn-danger btn-md mb-2">
                  <FaPinterest style={{ marginRight: '10px' }} />
                  Sign up with Pinterest
                </button>
              </div>
              <hr className="my-4" />
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success btn-lg btn-block">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default SignUp;
