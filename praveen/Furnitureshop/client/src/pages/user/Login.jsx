import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.status === 200) {
        // Store the token (you can also store user info if needed)
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.client));

        alert('✅ Login successful!');
        navigate('/products'); 
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error('Login Error:', err);
      setMessage('❌ Server error, try again later.');
    }
  };

  return (
    <div className="loginpage">
      <div className="aboutpage">
        {/* Header */}
        <div className="header-wrapper">
          <h1 className="header funky-text">
            <span className="circle-bg">&nbsp;Furniture</span>One
          </h1>
          <ul className="navigation">
            <li><Link to="/" className="hover:text-green-500">Home </Link></li>
            <li><Link to="/products" className="hover:text-green-500">Shop </Link></li>
            <li><Link to="/contact" className="hover:text-green-500">Contact Us </Link></li>
            <li><Link to="/about" className="hover:text-green-500">About</Link></li>
            <li>
              <Link to="/register">
                <button className="loginbtn hover:text-green-500">Register</button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Login Form */}
        <div className="login-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-button">Login</button>
          </form>

          {message && <p className="error-message">{message}</p>}

          <div className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p className="foot">
            Copyright © 2025 |
            Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
