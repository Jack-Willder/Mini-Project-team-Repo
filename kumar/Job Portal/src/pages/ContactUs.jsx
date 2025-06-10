import React from 'react';
import { Link } from "react-router-dom";

function ContactUs() {
  return (
    <>
      {/* HEADER */}
      <div className="page-header">
        <nav className="navbar">
          <h1 className="logo">Job<span className="logo-accent">Zy</span></h1>
          <ul className="nav-links">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/jobs" className="nav-link">Jobs</Link></li>
            <li><Link to="/companies" className="nav-link">Companies</Link></li>
            <li><Link to="/about" className="nav-link">About Us</Link></li>
            <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
            <Link to="/login"><button className="login-button">Login</button></Link>
          </ul>
        </nav>
      </div>

      {/* CONTACT US */}
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="contact-subtitle">Get in Touch</h2>
            <p><strong>Email:</strong> <a href="mailto:support@jobzy.com">support@jobzy.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+911234567890">+91 1234567890</a></p>
            <p><strong>Address:</strong> 123 xyz St, def City, India</p>
          </div>

          <div className="contact-form">
            <form>
              <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required placeholder="Your full name" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} required placeholder="Write your message here..."></textarea>
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Jobzy | Designed By <Link to="/adminlogin" className="footer-link">RK</Link></p>
      </footer>
    </>
  );
}

export default ContactUs;
