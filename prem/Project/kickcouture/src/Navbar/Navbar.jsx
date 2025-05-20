

import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <p className="logo">Kick<span>Couture</span></p>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/collection">Collection</a></li>
        <li><a href="/features">Features</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/review">Review</a></li>
        <li className="login-item">
          <span className="login-link">Login</span>
          <div className="dropdown">
            <a href="">Admin Login</a>
            <a href="/user-login">User Login</a>
          </div>
        </li>
      </ul>
    </div>
  );
};  
export default Navbar;
