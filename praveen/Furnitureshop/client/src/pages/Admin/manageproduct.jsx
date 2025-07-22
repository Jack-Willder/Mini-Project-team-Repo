import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ManageProduct() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [stock, setStock] = useState('');
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("desc", desc);

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/items/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await axios.post("http://localhost:5000/api/items", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      setName('');
      setImage(null);
      setDesc('');
      setStock('');
      setPrice('');
      setCategory('');
      setShowForm(false);
      setIsEditing(false);
      setEditId(null);
      fetchItems();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setDesc(item.desc);
    setPrice(item.price);
    setCategory(item.category);
    setStock(item.stock);
    setImage(null);
    setEditId(item._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/items/${id}`);
        fetchItems();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  return (
    <div className="manproduct">

      {/* Header */}
      <div className="header-wrapper">
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul className="navigation">
          <li>
            <Link className='loginbtn' to="/">
              <button>Logout</button>
            </Link>
          </li>
        </ul>
      </div>

      {/* Form & Table Section */}
      <div className="furniture-manager-container">
        {showForm && (
          <form className="form-section" onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" required />
            <input type="file" onChange={e => setImage(e.target.files[0])} required={!isEditing} />
            <input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required />
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" required />
            <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="Stock" required />
            <button type="submit">{isEditing ? 'Update Product' : 'Submit'}</button>
          </form>
        )}

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id}>
                <td>
                  <img
                    src={`http://localhost:5000/api/items/image/${item._id}`}
                    alt="Item"
                    width="100"
                    height="100"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.stock}</td>
                <td>{item.desc}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="add-button-container">
          <button id="add-product-btn" onClick={() => {
            setIsEditing(false);
            setEditId(null);
            setShowForm(true);
            setName('');
            setImage(null);
            setPrice('');
            setCategory('');
            setDesc('');
            setStock('');
          }}>
            ➕ Add New Furniture
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="foot">
          Copyright © 2025 | Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link>
        </p>
      </div>
    </div>
  );
}

export default ManageProduct;
