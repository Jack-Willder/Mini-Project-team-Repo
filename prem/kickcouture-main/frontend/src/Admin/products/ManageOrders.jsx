import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../products/ManageProducts.css";

function ManageOrders() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/order/all");
      setProducts(res.data.orders);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleDelete = async (product) => {
    try {
      await axios.delete(`http://localhost:5000/api/order/${product._id}`);
      // After deletion, fetch the updated list of products
      fetchProducts();
    } catch (err) {
      console.error("Error removing from cart", err);
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
          <h2>Manage Orders</h2>
        </div>
        <section className="best-selling">
          {products.map((order) => {
              const product = order.productId;
              return (
                <div className="product-card" key={order._id}>
                  <img src={"http://localhost:5000/" + product.image} alt={product.title} />
                  <div className="product-info">
                    <h1>{product.name}</h1>
                    <h2>status {order.status}</h2>
                    <h2>Recipient {order.email}</h2>
                    <h2>size {product.size}</h2>
                    <h3>₹ {product.price}</h3>
                    <p>brand {product.brand}</p>
                    <p>brand {product.brand}</p>
                    <p>{product.description}</p>
                    <button onClick={() => handleDelete(order)}>Remove from Cart 🛒</button>
                  </div>
                </div>
              );
            })}
        </section>
      </div>
    </div>
  );
}

export default ManageOrders;