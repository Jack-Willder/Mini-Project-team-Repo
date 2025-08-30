
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/userman/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address
    });
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/userman/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/userman/users/${editId}`, formData);
      setMessage('✅ User updated successfully');
      setEditId(null);
      setFormData({ name: '', email: '', phone: '', address: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage(' Failed to update user');
    }
  };

  return (
    <div className="registerpage">
      <div className="aboutpage">
        <div className="header-wrapper">
          <h1 className="header funky-text">
            <span className="circle-bg">&nbsp;Furniture</span>One
          </h1>
          <ul className="navigation">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Shop</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login"><button className="loginbtn">Login</button></Link></li>
          </ul>
        </div>

        {/* Update Form */}
        <div className="register-container">
          {editId && (
            <form onSubmit={handleUpdate}>
              <h2>Edit User</h2>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="register-button">Update User</button>
            </form>
          )}

          {message && <p className="error-message">{message}</p>}
        </div>

        {/* User Table */}
        <div className="register-container">
          <h2>Registered Users</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    &nbsp;
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

export default ManageUser;
