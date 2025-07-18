import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const res = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.status === 201) {
        alert('✅ Registration successful!');
        navigate('/login');
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('❌ Server error, try again later.');
    }
  };

  return (
    <div className="registerpage">
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
              <Link to="/login">
                <button className="loginbtn hover:text-green-500">Login</button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Register Form */}
        <div className="register-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
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
            <button type="submit" className="register-button">Register</button>
          </form>

          {message && <p className="error-message">{message}</p>}

          <div className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
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

export default Register;
