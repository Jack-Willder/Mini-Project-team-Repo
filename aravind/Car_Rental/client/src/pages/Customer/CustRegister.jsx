import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CustRegister() {
  const [formData, setFormData] = useState({
    fname: "",
    uname: "",
    email: "",
    phno: "",
    address: "",
    pwd: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/customers/register", {
        fullName: formData.fname,
        userName: formData.uname,
        email: formData.email,
        phone: formData.phno,
        address: formData.address,
        password: formData.pwd
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/customer-dashboard")
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <PageHeader />
      <section className="loginpanel">
        <div className="header-panel">
          <h1>Car Rentals  -  Registration</h1>
          <p>Get Started By Creating Customer Account</p>
        </div>

        <div className="login-form-wrap">
          <div className="login-card">
            <div className="login-card-header">Create Account</div>

            <form className="login-card-body" onSubmit={handleSubmit}>
              <label htmlFor="fname"><span className="required">*</span>Full Name:</label>
              <input type="text" id="fname" name="fname" placeholder="Your Full Name" value={formData.fname} onChange={handleChange} />

              <label htmlFor="uname"><span className="required">*</span>Username:</label>
              <input type="text" id="uname" name="uname" placeholder="Your Username" value={formData.uname} onChange={handleChange} />

              <label htmlFor="email"><span className="required">*</span>Email:</label>
              <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />

              <label htmlFor="phno"><span className="required">*</span>Phone:</label>
              <input type="tel" id="phno" name="phno" placeholder="Phone" value={formData.phno} onChange={handleChange} />

              <label htmlFor="address"><span className="required">*</span>Address:</label>
              <input type="text" id="address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />

              <label htmlFor="pwd"><span className="required">*</span>Password:</label>
              <input type="password" id="pwd" name="pwd" placeholder="Password" value={formData.pwd} onChange={handleChange} />

              <div className="actions-row">
                <button type="submit" className="submit-btn">SUBMIT</button>
              </div>

              <p className="alt">
                or<br />
                Have an account? <Link to="/custlogin">Login</Link>.
              </p>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default CustRegister;
