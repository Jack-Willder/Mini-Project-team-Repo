import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminLogin() {
  const [email, setEmail] = useState("");   
  const [password, setPassword] = useState("");
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
    <div className="login-container">
      <h2 >Admin Login</h2>
      <form  onSubmit={handleLogin}>
        {error && <p className="error"  style={{justifyContent:"center"}}>{error}</p>}
        <div className="form-group">
          <label >Email</label>
          <input 
            type="email"
            className="form-group-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-group">Password</label>
          <input 
            type="password"
            className="form-group-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <button className="back-home" >
        <Link to="/"  >Back to Home</Link>
      </button>
    </div>
  );
}

export default AdminLogin;
