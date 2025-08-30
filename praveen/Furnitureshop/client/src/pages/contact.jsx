import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function contact() {
  const year = new Date().getFullYear();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: location.pathname } });
  };

  return (
    <div className='contactpage'>
      <div className="aboutpage">
        {/* Header */}
        <div className="header-wrapper">
          <h1 className="header funky-text">
            <span className="circle-bg">&nbsp;Furniture</span>One
          </h1>
          <ul className="navigation">
            <li><Link to="/" className="hover:text-green-500">Home</Link></li>
            <li><Link to="/products" className="hover:text-green-500">Shop</Link></li>
            <li><Link to="/contact" className="hover:text-green-500">Contact</Link></li>
            <li><Link to="/about" className="hover:text-green-500">About</Link></li>
            <li>
              {user ? (
                <button className="loginbtn hover:text-green-500" onClick={handleLogout}>Logout</button>
              ) : (
                <button className="loginbtn hover:text-green-500" onClick={handleLoginRedirect}>Login</button>
              )}
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="contact-container">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-description">
              Have questions or need assistance? We're here to help! Reach out to Furniture One anytime.
            </p>

            <div className="contact-card">
              <div className="contact-block">
                <h2 className="contact-heading">📍 Address</h2>
                <p>44/1A, Oakwood Avenue,<br />Tirunelveli, Tamil Nadu,<br />India</p>
              </div>

              <div className="contact-block">
                <h2 className="contact-heading">📧 Email</h2>
                <p>
                  <a href="mailto:support@furnitureone.com" className="contact-link">
                    support@furnitureone.com
                  </a>
                </p>
              </div>

              <div className="contact-block">
                <h2 className="contact-heading">📞 Phone</h2>
                <p>
                  <a href="tel:+1234567890" className="contact-link">
                    +91 93564 27836<br />
                    +91 86859 40567
                  </a>
                </p>
              </div>

              <div className="contact-block">
                <h2 className="contact-heading">⏰ Working Hours</h2>
                <p>Monday - Friday: 9:00 AM – 6:00 PM<br />Saturday: 10:00 AM – 4:00 PM<br />Sunday: Closed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="footer">
          <p className="foot">Copyright © {year} | Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link></p>
        </div>
      </div>
    </div>
  );
}

export default contact;
