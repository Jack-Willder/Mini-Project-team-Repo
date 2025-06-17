import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Body from './components/Body'; // <- This is your homepage
import Contact from './pages/Contact';
import Products from './pages/Products';
import About from './pages/about'; 
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/Admin/AdminLogin';
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
        <Route path="/adminlogin" element={<AdminLogin />}/>
      </Routes>
    </Router>
  );
}

export default App;
