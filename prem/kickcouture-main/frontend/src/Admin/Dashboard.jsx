import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { useState } from "react";
import axios from "axios";

function Dashboard() {
  // User state
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  React.useEffect(() => {
    async function fetchUserCount() { 
      try {
        const response = await axios.get("http://localhost:5000/api/user/userCount");
        setUserCount(response.data.userCount);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    }

    async function fetchOrderCount() {
      try {
        const res = await axios.get("http://localhost:5000/api/order/all");
        setOrderCount(res.data.orders.length);
      } catch (error) {
        console.error("Error fetching order count:", error);
      }
    }

    fetchUserCount();
    fetchOrderCount();
  }, []);

  return (
    <div className="admindashboard">
      {/* Dashboard Welcome */}
      <div className="dashboard-header">
        <h2>Welcome Admin</h2>
      </div>

      {/* Dashboard Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">📦 Total Orders <span>{orderCount}</span></div>
        <div className="stat-card">👤 Total Users <span>{userCount}</span></div>
      </div>

      {/* Admin Controls */}
      <div className="dashboard-controls">
        <div className="control-card">
          <Link to="/manage-users">👤 Manage Users</Link>
        </div>
        <div className="control-card">
          <Link to="/manage-products">👟 Manage Products</Link>
        </div>
        <div className="control-card">
          <Link to="/manage-orders">🛒 Manage Orders</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
