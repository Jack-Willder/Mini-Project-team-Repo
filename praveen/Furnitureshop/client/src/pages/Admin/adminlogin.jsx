import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="adminloginpage">
      <div className="header-wrapper">
     {/* Header */}
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul className="navigation">
          <li><b><Link to="/" >Home </Link></b></li>
          <li><b><Link to="/products" >Shop </Link></b></li>
          <li><b><Link to="/contact">Contact Us </Link></b></li>
           
          <li><b><Link to="/about">About Us</Link></b></li>
          <li>
            <Link className='loginbtn' to="/login">
              <button>Login</button>
            </Link>
          </li>
        </ul>
      </div>

    <div className="admin-login-container">
      <form onSubmit={handleLogin} className="admin-login-form">
        <h2 className="admin-login-title">Admin Login</h2>

        {error && <p className="admin-login-error">{error}</p>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>

      {/* Footer */}
      <div className="footer">
        <p className="foot">Copyright © 2025 | Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link></p>
      </div>
    </div>
  );
}

export default AdminLogin;
