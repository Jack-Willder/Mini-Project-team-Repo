import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";   // ✅ Import CSS

function Dashboard() {
  return (
    <div className="admindashboard">
      {/* Dashboard Welcome */}
      <div className="dashboard-header">
        <h2>Welcome Admin</h2>
      </div>

      {/* Dashboard Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">📦 Total Orders</div>
        <div className="stat-card">👤 Total Users</div>
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
