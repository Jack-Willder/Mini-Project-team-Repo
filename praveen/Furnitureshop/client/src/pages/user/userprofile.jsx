import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { User } from "lucide-react";

const UserProfile = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Auth + navigation
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Get logged-in user from localStorage as fallback
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || storedUser?._id || storedUser?.id;

  // Fetch user profile
  useEffect(() => {
    if (!userId) {
      console.error("No logged-in user found");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/userman/users/${userId}`);
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // Handle top-level fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle nested address fields
  const handleAddressChange = (e) => {
    setFormData({
      ...formData,
      address: { ...formData.address, [e.target.name]: e.target.value },
    });
  };

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Redirect to login
  const handleLoginRedirect = () => {
    localStorage.setItem("redirectAfterLogin", "/userprofile");
    navigate("/login");
  };

  // Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/userman/users/${userId}`, formData);
      setMessage("Profile updated successfully ✅");
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("Failed to update profile ❌");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!formData) return <p>No user found</p>;

  return (
    <div className="userprofilepage">
      {/* Header */}
      <div className="header-wrapper">
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul className="navigation">
          <li><Link to="/" className="hover:text-green-500">Home</Link></li>
          <li><Link to="/products" className="hover:text-green-500">Shop</Link></li>
          <li><Link to="/contact" className="hover:text-green-500">Contact</Link></li>
          <li><Link to="/about" className="hover:text-green-500">About</Link></li>
          <li style={{ display: "flex", alignItems: "center" }}>
            {user ? (
              <>
                <button className="loginbtn" onClick={handleLogout}>Logout</button>
                <div className="usericon">
                  <Link to="/userdashboard">
                    <User size={25} />
                  </Link>
                </div>
              </>
            ) : (
              <button className="loginbtn" onClick={handleLoginRedirect}>Login</button>
            )}
          </li>
        </ul>
      </div>

      {/* Profile Form */}
      <div className="userprofile-container">
        <h2 className="userprofile-title">My Profile</h2>
        <form className="userprofile-form" onSubmit={handleUpdate}>
          {/* Top-level fields */}
          <label>Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>Phone:
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </label>

          {/* Nested address fields */}
          <h3>Address</h3>
          {["doorNo","street","city","state","postalCode","country","landmark"].map(field => (
            <label key={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
              <input
                type="text"
                name={field}
                value={formData.address?.[field] || ""}
                onChange={handleAddressChange}
              />
            </label>
          ))}

          <button type="submit" className="userprofile-update-btn">Update Profile</button>
        </form>
        {message && <p className="userprofile-message">{message}</p>}
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="foot">
          Copyright © 2025 | Designed by
          <Link to="/adminlogin" className="footer-link"> Praveen</Link>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
