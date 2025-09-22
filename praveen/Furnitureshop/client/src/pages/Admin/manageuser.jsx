import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ManageUser() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);

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
    let fieldName = e.target.name;
    if (fieldName === "Village/city") fieldName = "city"; 
    setFormData({
      ...formData,
      address: { ...formData.address, [fieldName]: e.target.value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/userman/users/${editId}`, formData);
        setMessage("User updated successfully ");
      } else {
        await axios.post(`http://localhost:5000/api/userman/users`, formData);
        setMessage("User added successfully ");
      }
      setShowForm(false);
      setIsEditing(false);
      setEditId(null);
      setFormData(initialFormData);
      fetchUsers();
    } catch (err) {
      console.error("Error submitting user:", err);
      setMessage("Failed to submit user ");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
    setFormData(initialFormData);
    setMessage("");
  };

  const addressFields = [
    { name: "doorNo", label: "Door No" },
    { name: "street", label: "Street" },
    { name: "city", label: "Village / City" },
    { name: "state", label: "State" },
    { name: "postalCode", label: "Postal Code" },
    { name: "country", label: "Country" },
    { name: "landmark", label: "Landmark" }
  ];

  return (
    <div className="products-management">
      <div className="header-wrapper">
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul>
          <li>
            <button onClick={handleLogout} className="loginbtn hover:text-green-500">
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="manage-container">
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
            {users.map((user) => (
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
            {addressFields.map((field) => (
              <input
                key={field.name}
                type="text"
                name={field.label} 
                value={formData.address?.[field.name] || ""}
                onChange={handleAddressChange}
                placeholder={field.label}
                required
              />
            ))}

            <div className="form-buttons">
              <button type="submit">{isEditing ? "Update User" : "Add User"}</button>
              <button type="button" style={{marginLeft:"10px",backgroundColor:"red", color:"white",borderRadius:"7px",fontWeight:"bold",padding:"10px"}} onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        )}

        <button
          className="add-btn"
          onClick={() => {
            setFormData(initialFormData);
            setIsEditing(false);
            setEditId(null);
            setShowForm(true);
          }}
          style={{ marginTop: "20px", marginLeft: "20px" }}
        >
          ➕ Add User
        </button>

        {message && <p className="delivery-message">{message}</p>}
      </div>
     <div >
        <p className="foot"  style={{ 
        position: "fixed", 
        bottom: "0", 
        left: "0", 
        width: "100%", 
        background: "#f1f1f1", 
        textAlign: "center", 
        padding: "10px" 
        }}>
                Copyright © 2025 | Designed by Praveen
              </p>
      </div>
    </div>
  );
}

export default ManageUser;
