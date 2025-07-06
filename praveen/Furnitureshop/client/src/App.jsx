import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Body from './components/Body'; 
import Contact from './pages/contact';
import Products from './pages/products';
import About from './pages/about'; 
import Login from './pages/user/login';
import Register from './pages/user/Register';
import AdminLogin from './pages/Admin/adminlogin'
import Dashboard from './pages/Admin/dashboard';
import UserProfile from './pages/user/userprofile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/userprofile" element={<UserProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
