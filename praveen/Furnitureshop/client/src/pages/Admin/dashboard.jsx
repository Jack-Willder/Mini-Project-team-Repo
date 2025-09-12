import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";  // ✅ import context

function Dashboard() {
  const { user, logout } = useAuth();  // ✅ get user + logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears user from context + localStorage
    navigate("/"); // redirect to admin login page
  };

  return (
    <div className="admindashboard">
      <div className="header-wrapper">
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul >
          {user && user.role === "admin" ? ( // ✅ show logout only if logged in as admin
            <li>
              <button
                onClick={handleLogout}
                className="loginbtn hover:text-green-500"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/adminlogin">
                <button className="loginbtn">Admin Login</button>
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* content of dashboard*/}
      <div className="dashboard-content">
        <h2>Welcome Admin...!</h2>
        <div className="sales-orders-users">
          <h3>Total Orders</h3>
          <h3>Total Sales</h3>
          <h3>Total Users</h3>
        </div>
        <div className="dashboard-container">
          <div className="manage-products">
            <button className="btn-products">
              <Link to="/manageproduct">Manage Products</Link>
            </button>
          </div>
          <div className="manage-users">
            <button className="btn-users">
              <Link to="/manageuser">Manage Users</Link>
            </button>
          </div>
          <div className="manage-orders">
            <button className="btn-orders">
              <Link to="/manageorder">Manage Orders</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="foot">
          Copyright © 2025 | Designed by{" "}
          <Link to="/adminlogin" className="footer-link">
            Praveen
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
