import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch cart when page loads
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data.cart);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Update quantity
  const updateQuantity = async (itemId, action) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/cart/update`,
        { itemId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Remove item
  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:5000/api/cart/remove/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (!cart || cart.items.length === 0) return <p>Your cart is empty 🛒</p>;

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Variant</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item._id}>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
              </td>
              <td>{item.name}</td>
              <td>{item.woodType}</td>
              <td>₹{item.price}</td>
              <td>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item._id, "decrease")}
                    disabled={item.quantity === 1}
                  >
                    ➖
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, "increase")}
                  >
                    ➕
                  </button>
                </div>
              </td>
              <td>₹{item.price * item.quantity}</td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item._id)}
                >
                  🗑 Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="cart-summary">
        <p>Total Items: {cart.totalQuantity}</p>
        <p>Total Price: ₹{cart.totalPrice}</p>
      </div>

      {/* Next Button */}
      <div className="cart-actions">
        <button
          onClick={() => navigate("/checkout")}
          className="next-btn"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default cart;
