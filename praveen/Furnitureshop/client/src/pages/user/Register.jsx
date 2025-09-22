import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {User} from 'lucide-react';


function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: {
      doorNo: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      landmark: ''
    }
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1]; 
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, address, password } = formData;

    try {
      const res = await axios.post("http://localhost:5000/api/user/register", {
        name,
        email,
        phone,
        address,   
        password,
      });

      const data = res.data;

      if (res.status === 201) {
        alert(' Registration successful!');
        navigate('/login');
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage(' Server error, try again later.');
    }
  };

  return (
    <div className="registerpage">
      <div className="aboutpage">

        {/* Header */}
        <div className="header-wrapper">
          <h1 className="header funky-text">
            <span className="circle-bg">&nbsp;Furniture</span>One
          </h1>
          <ul className="navigation">
            <li><Link to="/" className="hover:text-green-500">Home</Link></li>
            <li><Link to="/products" className="hover:text-green-500">Shop</Link></li>
            <li><Link to="/contact" className="hover:text-green-500">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-green-500">About</Link></li>
            <li>
              <Link to="/login">
                <button className="loginbtn hover:text-green-500">Login</button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Register Form */}
        <div className="register-container">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                maxLength={10}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address Fields */}
            <div className="form-group">
              <label htmlFor="doorNo">Door No</label>
              <input
                type="text"
                id="doorNo"
                name="address.doorNo"
                value={formData.address.doorNo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">Village/City</label>
              <input
                type="text"
                id="city"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleChange}
                maxLength={6}
                minLength={6}

                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="landmark">Landmark</label>
              <input
                type="text"
                id="landmark"
                name="address.landmark"
                value={formData.address.landmark}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                min={8}
                max={16}
                required
              />
            </div>

            <button type="submit" className="register-button">Register</button>
          </form>

          {message && <p className="error-message">{message}</p>}

          <div className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p className="foot">
            Copyright © 2025 |
            Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
