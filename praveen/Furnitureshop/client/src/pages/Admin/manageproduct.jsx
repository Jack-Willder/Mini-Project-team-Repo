import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ManageProduct() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [desc, setDesc] = useState('');
  const [stock, setStock] = useState('');
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
    formData.append("name", name);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("size", size);
    formData.append("desc", desc);
    formData.append("variants", JSON.stringify(variants));

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
    setName('');
    setImage(null);
    setPrice('');
    setStock('');
    setCategory('');
    setSize('');
    setDesc('');
    setVariants([{ woodType: '', price: '', stock: '' }]);
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (item) => {
    setName(item.name);
    setDesc(item.desc);
    setPrice(item.price);
    setCategory(item.category);
    setStock(item.stock);
    setSize(item.size || '');
    setVariants(item.variants || [{ woodType: '', price: '', stock: '' }]);
    setImage(null);
    setEditId(item._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  return (
    <div className="manage-container">
      <div className="admin-nav">
        <h1>Manage Products</h1>
        <ul className="navigation">
          <li>
            <Link className='loginbtn' to="/">
              <button>Logout</button>
            </Link>
          </li>
        </ul>
      </div>

      <button className="add-btn" onClick={() => {
        setShowForm(true);
        resetForm();
      }}>
        ➕ Add New Furniture
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="product-form">
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" required />
          <input type="file" onChange={e => setImage(e.target.files[0])} required={!isEditing} />
          <input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required />
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" required />
          <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="Stock" required />
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

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
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
                <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} height="50" />
              </td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.stock}</td>
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
    </div>
  );
}

export default ManageProduct;
