import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Body from './components/Body'; 
import Footer from'./components/Footer';
import Contact from './pages/contact';
import Products from './pages/products';
import About from './pages/about'; 
import ProtectedRoute from './components/ProtectedRoute';
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
import UserDashboard from './pages/user/userdashboard';
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
        <Route path="/userdashboard" element={<UserDashboard/>}/>
        <Route path="/footer" element={<Footer />}/>
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/dashboard" element={
          <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }/>
          <Route path="/userprofile" element={
         <ProtectedRoute role="user">
              <UserProfile />
            </ProtectedRoute>
          }/>
        <Route path="/manageorder" element={
          <ProtectedRoute role="admin">
            <ManageOrder/>
          </ProtectedRoute>
          }/>
        <Route path="/manageproduct" element={
          <ProtectedRoute role="admin">
          <ManageProduct/>
          </ProtectedRoute>
          }/>
        <Route path="/manageuser" element={
          <ProtectedRoute role="admin">
          <ManageUser/></ProtectedRoute>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </Router>
  );
}

export default App;
