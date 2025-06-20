import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Body from './components/Body'; 
import Contact from './pages/contact';
import Products from './pages/products';
import About from './pages/about'; 
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/Admin/adminlogin'
import Dashboard from './pages/Admin/dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
