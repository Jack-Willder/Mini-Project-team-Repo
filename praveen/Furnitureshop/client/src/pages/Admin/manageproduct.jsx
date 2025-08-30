import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ManageProduct() {
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
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
    const res = await axios.get('http://localhost:5000/api/items');
    setItems(res.data);
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
    formData.append("productId", productId);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("size", size);
    formData.append("desc", desc);
    formData.append("variants", JSON.stringify(variants));
    if (image) formData.append("image", image);

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/items/${editId}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/items", formData);
      }
      resetForm();
      fetchItems();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const resetForm = () => {
    setProductId('');
    setName('');
    setImage(null);
    setCategory('');
    setSize('');
    setDesc('');
    setVariants([{ woodType: '', price: '', stock: '' }]);
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (item) => {
    setProductId(item.productId || '');
    setName(item.name);
    setCategory(item.category);
    setSize(item.size);
    setDesc(item.desc);
    setVariants(item.variants || [{ woodType: '', price: '', stock: '' }]);
    setEditId(item._id);
    setIsEditing(true);
    setShowForm(true);
    setImage(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems();
    }
  };

  return (
    <div className="products-management">
      <div className="header-wrapper">
     {/* Header */}
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul className="navigation">
          <li><b><Link to="/" >Home </Link></b></li>
          <li><b><Link to="/products" >Shop </Link></b></li>
          <li><b><Link to="/contact">Contact Us </Link></b></li>
           
          <li><b><Link to="/about">About Us</Link></b></li>
          <li>
            <Link className='loginbtn' to="/">
              <button>Logout</button>
            </Link>
          </li>
        </ul>
      </div>
      <br></br>
    <div className="manage-container">
      

      {showForm && (
        <form onSubmit={handleSubmit} className="product-form">
          <h2>{isEditing ? "Update Product" : "Insert New Product"}</h2>

          <input
            type="text"
            value={productId}
            onChange={e => setProductId(e.target.value)}
            placeholder="Product ID (optional)"
          />

          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Product Name"
            required
          />

          <input
            type="file"
            onChange={e => setImage(e.target.files[0])}
            required={!isEditing}
          />

          <input
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="Category"
            required
          />

          <input
            type="text"
            value={size}
            onChange={e => setSize(e.target.value)}
            placeholder="Size (e.g., 6x6 ft)"
            required
          />

          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Description"
            required
          />

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
                type="number"
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
              <button type="button" onClick={() => removeVariant(index)}>Remove Variant</button>
            </div>
          ))}
          <button type="button" onClick={addVariant}>➕ Add Variant</button>

          <div className="form-buttons">
            <button type="submit">{isEditing ? 'Update Product' : 'Submit Product'}</button>
            <button type="button" onClick={resetForm}> Cancel</button>
          </div>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product ID</th>
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
                <img src={`http://localhost:5000/api/items/image/${item._id}`} alt={item.name} height="50" />
              </td>
              <td>{item.productId}</td>
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

      <button
        className="add-btn"
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}
        style={{ marginTop: "20px" }}
      >
        ➕ Insert Product
      </button>
    </div>
    </div>
  );
}

export default ManageProduct;
