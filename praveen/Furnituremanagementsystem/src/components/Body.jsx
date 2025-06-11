import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';

function Body() {
  const images = [image1, image2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const year = new Date().getFullYear();

  function nextImage() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  return (
    <div className="Home">
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

      {/* Center Content */}
      <div className="body-center">
        <div className="frcontent">
          <div className="quote">
            Transform your space with timeless elegance
          </div>
          <button className="explore-btn">
            <Link to="/products">Explore</Link>
          </button>
        </div>
        <img
          src={images[currentIndex]}
          alt="Furniture"
          onClick={nextImage}
          style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
        />
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="foot">Copyright © {year} | Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link></p>
      </div>
    </div>
  );
}

export default Body;
