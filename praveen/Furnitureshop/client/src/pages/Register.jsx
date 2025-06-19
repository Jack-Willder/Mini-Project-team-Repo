import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const year = new Date().getFullYear();

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
          <form action="/register" method="post">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required />
            </div>
            <button type="submit" className="register-button">Register</button>
          </form>
          <div className="login-link">
            Already have an account? <Link to="/Login">Login here</Link>
          </div>
        </div>

      {/* Footer */}
            <div className="footer">
              <p className="foot">Copyright © 2025 | Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link></p>
            </div>
          </div>
      </div>
      
  );
}

export default Register;
