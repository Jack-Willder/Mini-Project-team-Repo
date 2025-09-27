import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSales, setTotalSales] = useState(0); 

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, usersRes, salesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/orders/count"),           
          axios.get("http://localhost:5000/api/user/count"),            
          axios.get("http://localhost:5000/api/orders/completed/count")  
        ]);

        // Set state with correct response keys
        setTotalOrders(ordersRes.data.count);
        setTotalUsers(usersRes.data.count);
        setTotalSales(salesRes.data.completedOrdersCount); 

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="admindashboard">
      {/* Header */}
      <div className="header-wrapper">
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul>
          <li>
            <button
              onClick={handleLogout}
              className="loginbtn hover:text-green-500"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <h2>Welcome Admin...!</h2>

        {/* Stats */}
        <div className="sales-orders-users">
          <h3>Total Orders: {totalOrders}</h3>
          <h3>Total Sales: {totalSales}</h3>
          <h3>Total Users: {totalUsers}</h3>
        </div>

        {/* Management Buttons */}
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
           <div className="manage-orders">
            <button className="btn-review">
              <Link to="/managereview">Manage Reviews</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="foot">
          Copyright © 2025 | Designed by{" "}
          <Link className="footer-link">Praveen</Link>
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
