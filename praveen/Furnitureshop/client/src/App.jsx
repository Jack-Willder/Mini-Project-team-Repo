import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Body from './components/Body'; 
import Contact from './pages/contact';
import Products from './pages/products';
import About from './pages/about'; 
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import AdminLogin from './pages/Admin/adminlogin';
import Dashboard from './pages/Admin/dashboard';
import UserProfile from './pages/user/userprofile';
import ManageOrder from './pages/Admin/manageorder';
import ManageProduct from './pages/Admin/manageproduct';
import ManageUser from './pages/Admin/manageuser';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/orders/cart';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/userprofile" element={<UserProfile/>}/>
        <Route path="/manageorder" element={<ManageOrder/>}/>
        <Route path="/manageproduct" element={<ManageProduct/>}/>
        <Route path="/manageuser" element={<ManageUser/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </Router>
  );
}

export default App;
