import { useState } from 'react';
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      {/* HEADER */}
      <div className="page-header">
        <nav className="navbar">
          <h1 className="logo">Job<span className="logo-accent">Zy</span></h1>
          <ul className="nav-links">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/jobs" className="nav-link">Jobs</Link></li>
            <li><Link to="/companies" className="nav-link">Companies</Link></li>
            <li><Link to="/about" className="nav-link">About Us</Link></li>
            <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
            <Link to="/login"><button className="login-button">Login</button></Link>
          </ul>
        </nav>
      </div>

      {/* Login Page */}
      <div className="adminloginform">
        <h2><b>Welcome To Admin Login</b></h2>
        <form action="/login" method="POST">
            <label htmlFor="adminemail"><b>Email: </b></label><br />
            <input type="email" id="email" name="email" required /><br />
            <label htmlFor="adminpassword"><b>Password: </b></label><br />
            <input type={showPassword ? "text" : "password"} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}required/>
            <span className="eye-icon" onClick={togglePasswordVisibility}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
            <input type="checkbox" name="" id="" />showPassword
            <button type="submit">Login</button>
        </form>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Jobzy | Designed By <Link to="/adminlogin" className="footer-link">RK</Link></p>
      </footer>
    </>
  );
}

export default AdminLogin;
