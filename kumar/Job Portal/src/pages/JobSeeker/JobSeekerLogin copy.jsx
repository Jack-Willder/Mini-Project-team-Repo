import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";

function JobSeekerLogin() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/jobseekers/login", {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("jsToken", res.data.token);
      localStorage.setItem("jsData", JSON.stringify(res.data.jobseeker));
      navigate("/jsprofile");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:5000/api/jobseekers/register", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });

      const res = await axios.post("http://localhost:5000/api/jobseekers/login", {
        email: registerEmail,
        password: registerPassword,
      });

      localStorage.setItem("jsToken", res.data.token);
      localStorage.setItem("jsData", JSON.stringify(res.data.jobseeker));
      navigate("/jsprofile");
    } catch (err) {
      setError(err.response?.data?.message || "Registration or login failed.");
    }
  };

  return (
    <>
      <Header />
      <section className="full-container">
        <div className={`container ${isActive ? "active" : ""}`}>
          {/* Sign Up Form */}
          <div className="form-container sign-up">
            <form onSubmit={handleRegister}>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              <input
                type="text"
                placeholder="Name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className="form-container sign-in">
            <form onSubmit={handleLogin}>
              <h1>Sign In</h1>
              <span>or use your email and password</span>
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <Link to="/forgot-password">Forgot your password?</Link>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
              <button type="submit">Sign In</button>
            </form>
          </div>

          {/* Toggle Panel */}
          <div className="toggle-container">
            <div className="toggle">
              {!isActive ? (
                <div className="toggle-panel toggle-right">
                  <h1>Hello, Friend!</h1>
                  <p>Register with your personal details to use all of the site's features</p>
                  <button className="ghost" onClick={() => setIsActive(true)}>
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="toggle-panel toggle-left">
                  <h1>Welcome Back!</h1>
                  <p>Enter your personal details to use all of the site's features</p>
                  <button className="ghost" onClick={() => setIsActive(false)}>
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default JobSeekerLogin;