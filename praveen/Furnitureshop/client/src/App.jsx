import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import './App.css';
import Body from './components/Body'; 
import Footer from './components/Footer';
import Contact from './pages/contact';
import Products from './pages/products';
import About from './pages/about'; 
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/user/Login';
import Payment from './pages/orders/payment';
import Register from './pages/user/Register';
import AdminLogin from './pages/Admin/adminlogin';
import Dashboard from './pages/Admin/dashboard';
import UserProfile from './pages/user/userprofile';
import ManageOrder from './pages/Admin/manageorder';
import ManageProduct from './pages/Admin/manageproduct';
import ManageUser from './pages/Admin/manageuser';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/orders/Cart';
import UserOrders from './pages/user/userorders';
import DeliveryAddress from './pages/orders/Deliveryaddress';
import UserDashboard from './pages/user/userdashboard';
import Review from './pages/user/Review';
import ManageReview from './pages/Admin/managereview'

function AppContent() {
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
  const publicPaths = ["/", "/about", "/contact", "/products"];
  if (user?.role === "admin" && publicPaths.includes(location.pathname)) {
    logout();
  }
}, [location, user, logout]);

  return (
    <Routes>
      <Route path="/" element={<Body />} />
      <Route path="/Deliveryaddress" element={<DeliveryAddress />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/userorders" element={<UserOrders />} />
      <Route path="/review/:orderId" element={
       <Review />
        
        } />
      <Route path="/managereview" element={<ManageReview />}/>
      
      {/* Admin Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute role="admin">
          <Dashboard />
        </ProtectedRoute>
      }/>
      <Route path="/manageorder" element={
        <ProtectedRoute role="admin">
          <ManageOrder />
        </ProtectedRoute>
      }/>
      <Route path="/manageproduct" element={
        <ProtectedRoute role="admin">
          <ManageProduct />
        </ProtectedRoute>
      }/>
      <Route path="/manageuser" element={
        <ProtectedRoute role="admin">
          <ManageUser />
        </ProtectedRoute>
      }/>

      {/* User Protected Routes */}
      <Route path="/userprofile" element={
        <ProtectedRoute role="user">
          <UserProfile />
        </ProtectedRoute>
      }/>
   
      <Route path="/cart" element={
        <ProtectedRoute role="user">
          <Cart />
        </ProtectedRoute>
      }/>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
