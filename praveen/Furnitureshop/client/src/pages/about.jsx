import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react";

function About() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: location.pathname } });
  };

  return (
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
                 <li style={{ display: "flex", alignItems: "center" }}>
                            {user ? (
                              <>
                                <button className="loginbtn" onClick={handleLogout}>
                                  Logout
                                </button>
                                <div className="usericon">
                                  <Link to="/userdashboard">
                        <User size={25} />
                      </Link>
                                </div>
                              
                              </>
                            ) : (
                              <button className="loginbtn" onClick={handleLoginRedirect}>
                                Login
                              </button>
                            )}
                          </li>
                 </ul>
             </div>

      {/* About Section */}
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
      <footer className="footer">
        <p className="foot">
          Copyright © 2025 | Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link>
        </p>
      </footer>
    </div>
  );
}

export default About;
