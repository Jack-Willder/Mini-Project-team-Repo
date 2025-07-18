import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';  

const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="dashboard-buttons">
        <Link to="/admin/add-product">Add Product</Link>
        <Link to="/admin/orders">View Orders</Link>
        <Link to="/admin/edit-product/1">Edit Product</Link>
      </div>
      
    </div>
  );
};

export default Dashboard;
