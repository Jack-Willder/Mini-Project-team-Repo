import React from 'react';
import Navbar from './Navbar/Navbar';
import AdminLogin from './Admin/AdminLogin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './Hero/Hero';
import { Collection } from './Collection/collection';
import Dashboard from './Admin/Dashboard';
import UserLogin  from './User/UserLogin';
import UserProfile from './User/UserProfile'
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/UserLogin" element={<UserLogin/>}/>
        <Route path="UserProfile" element={<UserProfile/>}/>
        
      </Routes>
    </Router>
  );
};

export default App;
  