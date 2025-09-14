import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = ({ user }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate("/userprofile");
  };

  const handleMyOrders = () => {
    navigate("/userorders");
  };

  return (
    <div className="userdashboard-page">
      <div className="userdashboard-container">
        <div className="userdashboard-box">
          {/* Welcome Message */}
          <h1 className="userdashboard-welcome">
            Welcome, {user?.name || "User"} 👋
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
  );
};

export default UserDashboard;
