import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Use full backend URL (change if hosted elsewhere)
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
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="header-wrapper">
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul className="navigation">
          <li><Link to="/">Home 🏠</Link></li>
          <li><Link to="/products">Shop 🛒</Link></li>
          <li><Link to="/contact">Contact Us 📞</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login"><button className="loginbtn">Login</button></Link></li>
        </ul>
      </div>

      {/* Admin Login Form */}
      <div className="adminloginform">
        <h2>Admin Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />

          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? "🙈" : "👁️"}
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
