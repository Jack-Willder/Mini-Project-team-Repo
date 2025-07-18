import React from 'react';
import './AdminLogin.css';

const AdminLogin = () => {
  
  return (
    <div className="admin-login-container">
      <form className="admin-login-form">
        <h2>Admin Login</h2>
        <div className="form-group">
          <label htmlFor="admin User Name">User Name:</label>
          <input type="text" id="adminUserName" placeholder="Admin UserName" required />
        </div>
        <div className="form-group">
          <label htmlFor="adminPassword">Password</label>
          <input type="password" id="adminPassword" placeholder="Admin password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
