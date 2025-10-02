import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CustLogin() {
  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/customers/login", {
        username: uname,
        password: pwd,
      });

      // store token, username, and customerId
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("customerId", res.data.id);

      navigate("/customer-dashboard"); // redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <PageHeader />
      <section className="loginpanel">
        <div className="header-panel">
          <h1>Car Rentals - Customer Panel</h1>
          <p>Please LOGIN to continue.</p>
        </div>

        <div className="login-form-wrap">
          <div className="login-card">
            <div className="login-card-header">Login</div>
            <form className="login-card-body" onSubmit={handleSubmit}>
              {error && <p style={{ color: "red" }}>{error}</p>}

              <label htmlFor="uname">Username:</label>
              <input
                type="text"
                id="uname"
                value={uname}
                onChange={(e) => setUname(e.target.value)}
                placeholder="Username"
                required
              />

              <label htmlFor="pwd">Password:</label>
              <input
                type="password"
                id="pwd"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="Password"
                required
              />

              <div className="actions-row">
                <button type="submit" className="submit-btn">
                  SUBMIT
                </button>
              </div>

              <p className="alt">
                or<br />
                <Link to="/custregister">Create a new account.</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default CustLogin;
