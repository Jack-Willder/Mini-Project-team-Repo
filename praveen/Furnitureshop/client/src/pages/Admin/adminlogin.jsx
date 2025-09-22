import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";  

function AdminLogin() {
  const [email, setEmail] = useState("");   
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      login({ email: data.user?.email || email, role: "admin", ...data.user }, data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="admin-loginpage">
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
        </ul>
      </div>

      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          {error && <p className="error" style={{justifyContent:"center"}}>{error}</p>}

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email"
              className="form-group-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ position: "relative" }}>
            <label>Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              className="form-group-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              maxLength={16}
            />
            {/* Toggle Button */}
            <span 
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "35px",
                cursor: "pointer",
                marginTop:"10px"
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        <button className="back-home">
          <Link to="/" >Back to Home</Link>
        </button>
      </div>

      <div className="footer">
        <p className="foot">
          Copyright © 2025 | Designed by
          <Link to="/adminlogin" className="footer-link"> Praveen</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
