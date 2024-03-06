import React, { useEffect } from 'react'
import { useState } from 'react';
import "../Stylesheets/Login.css";
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons'
import "../Stylesheets/Eye.css"
import "../Stylesheets/Eyeslash.css"
import axios from 'axios';
import { useAuth } from "../Context/AuthContext"


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setshowPassword] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleClick = () => {
    setshowPassword(!showPassword)
  }

  const handleInputChange = () => {
    setError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8082/api/User/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        // Successful login, navigate to the language page
        login(response.data)
        navigate('/language');
      } else {
        // Login failed, display an error message
        setError('Login Failed');
      }
    } catch (error) {
      // An error occurred during the request (e.g., network error)
      setError('Invalid Credentials');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate("/language")
    }
  }, [navigate])


  const styles = {

    position: "absolute",
    right: "10px", /* Adjust as needed */
    top: "60%", /* Adjust to vertically center */
    transform: "translateY(-50%)",
    cursor: "pointer",
  }

  const toggle = {
    position: "absolute",
    right: "10px", /* Adjust as needed */
    top: "60%", /* Adjust to vertically center */
    transform: "translateY(-50%)",
    cursor: "pointer",
  }
  return (
    <div className='page-container'>
      <div className="login-container" onSubmit={handleSubmit}>
        <h2 className="login-heading">Login</h2>
        <form className="login-form">
          <p style={{ color: "red" }}>{error}</p>
          <div className="form-group">

            <input
              style={{ borderRadius: "10px" }}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange();
              }}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group passwordfiled" >
            <input
              className='mt-2'
              style={{ borderRadius: "10px" }}
              type={showPassword ? "password" : "text"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange();
              }}
              placeholder="Enter your password"
              required

            />
            <div>
              {password && (
                showPassword ? (
                  <FontAwesomeIcon icon={faEye} onClick={handleClick} style={styles} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} onClick={handleClick} style={toggle} />
                )
              )}
            </div>
          </div>
          <div className='mb-3' style={{ marginLeft: "12em" }}>
            <label>Forget Password?</label>
            <Link to="/">click</Link>
          </div>
          <div className="form-group">
            <button type="submit" className="login-button" >
              Login
            </button>
            <div className='mt-3'>
              <label>New User?</label>
              <Link to="/signin">Signup</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;