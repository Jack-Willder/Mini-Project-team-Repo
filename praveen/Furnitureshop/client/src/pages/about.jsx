import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  const year = new Date().getFullYear();  // define current year here
   return (
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

      <section className="about-section">
  <div className="about-container">
    <h1 className="about-title">
      About <span>Furniture One</span>
    </h1>

    <p className="about-text">
      Welcome to <strong>Furniture One</strong> – your one-stop destination for premium-quality, stylish, and affordable furniture.
    </p>

    <p className="about-text">
      Founded with a vision to bring comfort and elegance into every home, Furniture One is an online furniture store that blends craftsmanship with convenience...
    </p>

    <div className="about-box">
      <h2>What We Offer</h2>
      <ul>
        <li><strong>Wide Range of Products:</strong> Furniture for living rooms, bedrooms, offices, and more.</li>
        <li><strong>Quality & Durability:</strong> Handpicked materials and skilled craftsmanship.</li>
        <li><strong>Easy Online Shopping:</strong> Browse, choose, and buy with ease from any device.</li>
        <li><strong>Customer Satisfaction:</strong> Fast delivery, transparent support, and friendly service.</li>
      </ul>
    </div>

    <div className="about-grid">
      <div className="mission-box">
        <h3>Our Mission</h3>
        <p>To redefine how people shop for furniture by offering quality, style, and value — all from the comfort of home.</p>
      </div>

      <div className="vision-box">
        <h3>Our Vision</h3>
        <p>To become a trusted name in online furniture retail by continuously innovating and listening to our customers.</p>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <div className="footer">
        <p className="foot">Copyright © {year} | Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link></p>
      </div>
    </div>
  );
}

export default About;
