import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import UserNavbar from './Navbar/UserNavbar';
import AdminLogin from './Admin/AdminLogin';
import { Hero } from './Hero/Hero';
import { Collection } from './Collection/Collection';
import Dashboard from './Admin/Dashboard';
import UserProfile from './User/UserProfile';
import UserLogin from './User/UserLogin';
import AboutUs from '../about/AboutUs';

// ✅ Import Product Management Components
import ManageProducts from './Admin/products/ManageProducts';
// import CreateProduct from './Admin/products/CreateProduct';
// import EditProduct from './Admin/products/EditProduct';

const App = () => {
  // Login state persists using localStorage
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage.getItem('userLoggedIn') === 'true'
  );

  // Handle user login
  const handleUserLogin = () => {
    setIsUserLoggedIn(true);
    localStorage.setItem('userLoggedIn', 'true');
  };

  // Handle user logout
  const handleUserLogout = () => {
    setIsUserLoggedIn(false);
    localStorage.setItem('userLoggedIn', 'false');
  };

  return (
    <Router>
      {/* Dynamic Navbar switch based on login */}
      {isUserLoggedIn ? (
        <UserNavbar onLogout={handleUserLogout} />
      ) : (
        <Navbar />
      )}

      {/* Application Routes */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/collection" element={<Collection isLoggedIn={isUserLoggedIn} />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/UserLogin" element={<UserLogin onLogin={handleUserLogin} />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/admin/*" element={<Dashboard />} />

        {/* ✅ Product Management Routes */}
        <Route path="/manage-products" element={<ManageProducts />} />
        {/* <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} /> */}

        {/* ✅ Placeholder for Users & Orders (to prevent future errors) */}
        <Route path="/manage-users" element={<h2>Manage Users Page</h2>} />
        <Route path="/manage-orders" element={<h2>Manage Orders Page</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
