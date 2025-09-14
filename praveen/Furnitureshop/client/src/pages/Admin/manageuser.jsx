import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // ✅ THIS IS MISSING

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


function ManageUser() {
  const { logout } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
      navigate("/"); // redirect to admin login page after logout
    };
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      doorNo: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      landmark: ""
    }
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/userman/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleEditClick = (user) => {
    setFormData(user);
    setEditId(user._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/userman/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setFormData({
      ...formData,
      address: { ...formData.address, [e.target.name]: e.target.value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/userman/users/${editId}`, formData);
      setMessage("User updated successfully ✅");
      setShowForm(false);
      setIsEditing(false);
      setEditId(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
      setMessage("Failed to update user ❌");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: {
        doorNo: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        landmark: ""
      }
    });
    setMessage("");
  };

  return (
    <div className="products-management">
      <div className="header-wrapper">
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
         <ul><li>
          <button
              onClick={handleLogout}
              className="loginbtn hover:text-green-500"
            >
              Logout
            </button>
        </li>
          
        </ul>
      </div>

      <div className="manage-container">
        {showForm && (
          <form onSubmit={handleSubmit} className="product-form">
            <h2>{isEditing ? "Update User" : "Add New User"}</h2>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />

            <h4>Address</h4>
            {["doorNo","street","city","state","postalCode","country","landmark"].map(field => (
              <input
                key={field}
                type="text"
                name={field}
                value={formData.address?.[field] || ""}
                onChange={handleAddressChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required
              />
            ))}

            <div className="form-buttons">
              <button type="submit">{isEditing ? "Update User" : "Add User"}</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        )}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  {user.address && (
                    <>
                      {`${user.address.doorNo}, ${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.postalCode}, ${user.address.country}`}
                      {user.address.landmark ? ` (Landmark: ${user.address.landmark})` : ""}
                    </>
                  )}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditClick(user)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="add-btn"
          onClick={() => setShowForm(true)}
          style={{ marginTop: "20px" }}
        >
          ➕ Add User
        </button>

        {message && <p className="delivery-message">{message}</p>}
      </div>
    </div>
  );
}

export default ManageUser;
