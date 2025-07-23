import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ManageProduct() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [desc, setDesc] = useState('');
  const [variants, setVariants] = useState([{ woodType: '', price: '', stock: '' }]);
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

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { woodType: '', price: '', stock: '' }]);
  };

  const removeVariant = (index) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("size", size);
    formData.append("desc", desc);
    formData.append("variants", JSON.stringify(variants));

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

      // Reset
      setName('');
      setImage(null);
      setCategory('');
      setSize('');
      setDesc('');
      setVariants([{ woodType: '', price: '', stock: '' }]);
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
    setCategory(item.category);
    setSize(item.size || '');
    setDesc(item.desc);
    setVariants(item.variants || [{ woodType: '', price: '', stock: '' }]);
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
            <Link className='loginbtn' to="/"><button>Logout</button></Link>
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
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" required />
            <input type="text" value={size} onChange={e => setSize(e.target.value)} placeholder="Size (e.g., 6x6 ft)" required />

            <h4>Wood Variants</h4>
            {variants.map((variant, index) => (
              <div key={index} className="variant-group">
                <input
                  type="text"
                  value={variant.woodType}
                  placeholder="Wood Type"
                  onChange={e => handleVariantChange(index, 'woodType', e.target.value)}
                  required
                />
                <input
                  type="text"
                  value={variant.price}
                  placeholder="Price"
                  onChange={e => handleVariantChange(index, 'price', e.target.value)}
                  required
                />
                <input
                  type="number"
                  value={variant.stock}
                  placeholder="Stock"
                  onChange={e => handleVariantChange(index, 'stock', e.target.value)}
                  required
                />
                <button type="button" onClick={() => removeVariant(index)}>❌</button>
              </div>
            ))}
            <button type="button" onClick={addVariant}>➕ Add Variant</button>

            <button type="submit">{isEditing ? 'Update Product' : 'Submit'}</button>
          </form>
        )}

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Size</th>
              <th>Variants (Wood - ₹Price)</th>
              <th>Stock by Wood</th>
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
                <td>{item.category}</td>
                <td>{item.size}</td>
                <td>
                  {item.variants?.map((v, i) => (
                    <div key={i}>{v.woodType}: ₹{v.price}</div>
                  ))}
                </td>
                <td>
                  {item.variants?.map((v, i) => (
                    <div key={i}>{v.woodType}: {v.stock}</div>
                  ))}
                </td>
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
            setCategory('');
            setSize('');
            setDesc('');
            setVariants([{ woodType: '', price: '', stock: '' }]);
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
