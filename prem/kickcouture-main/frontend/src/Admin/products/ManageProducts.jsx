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
  const [price, setPrice] = useState(99999);
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
      const res = await axios.get("http://localhost:5000/api/product/get");
      setProducts(res.data.data);
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
    formData.append("price", Number(price));
    formData.append("desc", desc);
    if (image) formData.append("image", image);

    try {
      // if (isEditing) {
      //   await axios.put(`http://localhost:5000/api/product/${editId}`, formData);
      // } else {
        await axios.post("http://localhost:5000/api/product/add", formData);
      // }
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
    setPrice(0.00);
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
    setPrice(product.price || 99999);
    setDesc(product.desc || "");
    setEditId(product._id);
    setIsEditing(true);
    setShowForm(true);
    setImage(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:5000/api/product/${id}`);
      fetchProducts();
    }
  };

  const handleDashboard = () => {
    navigate("/Dashboard");
  };

  return (
    <div className="page-container">
      <div className="header">
        <h1 className="logo">
          <span>Kick</span>Couture
        </h1>
        <button onClick={handleDashboard} className="logout-button">
          DashBoard
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
              <label className="input-label">Price</label>
              <textarea
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-textarea"
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












      <div className="card">
        <div className="card-header">
          <h2>Product List</h2>
        </div>
          <section className="best-selling">
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                <img src={"http://localhost:5000/" + product.image} alt={product.title} />
                <div className="product-info">
                  <h1>{product.name}</h1>
                  <h2>size {product.size}</h2>
                  <h3>₹ {product.price}</h3>
                  <p>brand {product.brand}</p>
                  <p>{product.description}</p>
                  {/* <button onClick={() => handleAddToCart(product)}>Add to Cart 🛒</button> */}
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </div>
              </div>
            ))}
          </section>
      </div>
    </div>
  );
}

export default ManageProduct;
