import { useState } from 'react';
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const year = new Date().getFullYear();

  return (
    <>
      {/* Header */}
      <div className="header-wrapper">
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul className="navigation">
          <li><Link to="/" className="hover:text-green-500">Home 🏠</Link></li>
          <li><Link to="/products" className="hover:text-green-500">Shop 🛒</Link></li>
          <li><Link to="/contact" className="hover:text-green-500">Contact Us 📞</Link></li>
          <li><Link to="/about" className="hover:text-green-500">About</Link></li>
          <li>
            <Link to="/login">
              <button className="loginbtn hover:text-green-500">Login</button>
            </Link>
          </li>
        </ul>
      </div>

      {/* Admin Login Form */}
      <div className="adminloginform">
        <h2><b>Welcome To Admin Login</b></h2>
        <form action="/login" method="POST">
          <label htmlFor="adminemail"><b>Email: </b></label><br />
          <input type="email" id="email" name="email" required /><br />

          <label htmlFor="adminpassword"><b>Password: </b></label><br />
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="foot">
          Copyright © {year} | Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link>
        </p>
      </div>
    </>
  );
}

export default AdminLogin;
