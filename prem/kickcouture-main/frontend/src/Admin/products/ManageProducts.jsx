import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../products/ManageProducts.css";

function ManageProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [gender, setGender] = useState("");
  const [desc, setDesc] = useState("");

  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("size", size);
    formData.append("brand", brand);
    formData.append("gender", gender);
    formData.append("desc", desc);
    if (image) formData.append("image", image);

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/products/add", formData);
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error submitting product", error);
    }
  };

  const resetForm = () => {
    setName("");
    setImage(null);
    setCategory("");
    setSize("");
    setBrand("");
    setGender("");
    setDesc("");
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (product) => {
    setName(product.name);
    setCategory(product.category);
    setSize(product.size);
    setBrand(product.brand);
    setGender(product.gender);
    setDesc(product.desc || "");
    setEditId(product._id);
    setIsEditing(true);
    setShowForm(true);
    setImage(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="header">
        <h1 className="logo">
          <span>Kick</span>Couture
        </h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Manage Shoes</h2>
          {!showForm && (
            <button onClick={() => setShowForm(true)} className="add-button">
              + Add New Shoe
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="form-grid">
            <div>
              <label className="input-label">Shoe Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="input-label">Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="form-file"
                required={!isEditing}
              />
            </div>

            <div>
              <label className="input-label">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="input-label">Size</label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="input-label">Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="input-label">Gender</label>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="input-label">Description</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="form-textarea"
                required
              />
            </div>

            <div className="button-group">
              <button type="submit" className="submit-button">
                {isEditing ? "Update Shoe" : "Submit Shoe"}
              </button>
              <button type="button" onClick={resetForm} className="cancel-button">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ManageProduct;
