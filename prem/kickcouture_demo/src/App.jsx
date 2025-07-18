import React from 'react';
import Navbar from './Navbar/Navbar';
import AdminLogin from './Admin/AdminLogin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './Hero/Hero';
import { Collection } from './Collection/collection';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Collection" element={<Collection />}/>
        <Route path="/AdminLogin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
