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
  const [lowStockItems, setLowStockItems] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      try {
        const ordersRes = await axios.get("http://localhost:5000/api/orders/count");
        setTotalOrders(ordersRes.data.count);
      } catch (err) {
        console.error("Error fetching total orders:", err.response?.data || err.message);
        setTotalOrders(0); 
      }

      try {
        if (!token) throw new Error("Token missing. Cannot fetch users count.");

        const usersRes = await axios.get("http://localhost:5000/api/user/count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalUsers(usersRes.data.count);
      } catch (err) {
        console.error("Error fetching total users:", err.response?.data || err.message);
        setTotalUsers(0); 
      }

      try {
        const salesRes = await axios.get("http://localhost:5000/api/orders/completed/count");
        setTotalSales(salesRes.data.completedOrdersCount);
      } catch (err) {
        console.error("Error fetching total sales:", err.response?.data || err.message);
        setTotalSales(0);
      }

      try {
        const productsRes = await axios.get("http://localhost:5000/api/items");

        let lowStock = [];

        productsRes.data.forEach(product => {
          product.variants.forEach(variant => {
            if (variant.stock < 3) {
              lowStock.push(`${product.name} (${variant.woodType})`);
            }
          });
        });

        if (lowStock.length > 0) {
          setLowStockItems(lowStock);
          alert(`⚠️ Low Stock Alert:\n${lowStock.join(", ")} (below 3 left!)`);
        }
      } catch (err) {
        console.error("Error fetching product stock:", err.response?.data || err.message);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="admindashboard">
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

      <div className="dashboard-content">
        <h2>Welcome Admin...!</h2>

        {/* ✅ Warning Box in UI */}
        {lowStockItems.length > 0 && (
          <div className="low-stock-warning" style={{ 
            backgroundColor: "#ffe6e6", 
            color: "#cc0000", 
            padding: "10px", 
            borderRadius: "8px", 
            margin: "15px 0" 
          }}>
            <strong>⚠️ Low Stock Alert:</strong>
            <ul>
              {lowStockItems.map((item, index) => (
                <li key={index}>{item} (below 3 left!)</li>
              ))}
            </ul>
          </div>
        )}

        <div className="sales-orders-users">
          <h3>Total Orders: {totalOrders}</h3>
          <h3>Total Sales: {totalSales}</h3>
          <h3>Total Users: {totalUsers}</h3>
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
          <div className="manage-reviews">
            <button className="btn-review">
              <Link to="/managereview">Manage Reviews</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="footer">
        <p className="foot">
          Copyright © 2025 | Designed by{" "}
          Praveen
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
