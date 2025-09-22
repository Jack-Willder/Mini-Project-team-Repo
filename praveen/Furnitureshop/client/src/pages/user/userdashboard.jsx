import React from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

const UserDashboard = ({ user }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate("/userprofile");
  };

  const handleMyOrders = () => {
    navigate("/userorders");
  };
  const handleLoginRedirect = () => {
    localStorage.setItem("redirectAfterLogin", "/products");
    navigate("/login");
  };

  return (
    <div className="user-dashboards">
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
    <div className="userdashboard-page">
      <div className="userdashboard-container">
        <div className="userdashboard-box">
          {/* Welcome Message */}
          <h1 className="userdashboard-welcome">
            Welcome, {user?.name || "User"} 
          </h1>

          {/* Buttons */}
          <div className="userdashboard-buttons">
            <button
              onClick={handleViewProfile}
              className="userdashboard-btn userdashboard-profile-btn"
            >
              View Profile
            </button>

            <button
              onClick={handleMyOrders}
              className="userdashboard-btn userdashboard-orders-btn"
            >
              My Orders
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* Footer */}
      <div className="footer">
        <p className="foot">
          Copyright © 2025 | Designed by Praveen
        </p>
      </div>
    </div>
  );
};

export default UserDashboard;
