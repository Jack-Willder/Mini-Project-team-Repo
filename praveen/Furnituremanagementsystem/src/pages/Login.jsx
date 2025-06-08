import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const year = new Date().getFullYear();

  return (
    <div className="loginpage">
      <div className="aboutpage">
        {/* Header */}
        <div className="header-wrapper">
          <h1 className="header funky-text">
            <span className="circle-bg">&nbsp;Furniture</span>One
          </h1>
          <ul className="navigation">
            <li><Link to="/" className="hover:text-green-500">Home 🏠</Link></li>
            <li><Link to="/products" className="hover:text-green-500">Shop 🛒</Link></li>
            <li><Link to="/contact" className="hover:text-green-500">Contact Us 📞</Link></li>
            <li><Link to="/about" className="hover:text-green-500">About</Link></li>
            <li>
              <Link to="/login">
                <button className="loginbtn hover:text-green-500">Login</button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Login Form */}
        <div className="login-container">
          <form action="/login" method="post">
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input type="text" id="Email" name="Email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <div className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p className="foot">Copyright © {year} | Designed by Praveen</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
