import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <div className='navbar'>
      <p className="logo">Kick<span>Couture</span></p>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/collection">Collection</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
        <li><Link to="/AboutUs">About</Link></li>
        <li className="login-item">
          <span className="login-link" onClick={toggleDropdown}>Login</span>
          {showDropdown && (
            <div className="dropdown">
              <Link to="/AdminLogin">Admin Login</Link>
              <Link to="/UserLogin">User Login</Link>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
