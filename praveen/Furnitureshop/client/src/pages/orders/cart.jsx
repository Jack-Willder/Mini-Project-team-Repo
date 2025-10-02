import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function Cart() {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], totalAmount: 0, status: "empty" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${user.id}`);
      setCart(res.data); 
    } catch (err) {
      console.error(err);
      setCart({ items: [], totalAmount: 0, status: "empty" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const handleUpdateQuantity = async (item, change) => {
    try {
      await axios.put("http://localhost:5000/api/cart/update", {
        userId: user.id,
        productId: item.productId,
        woodType: item.woodType,
        quantity: change,
      });
      await fetchCart(); 
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update quantity");
    }
  };

  const handleRemoveItem = async (item) => {
    try {
      await axios.delete("http://localhost:5000/api/cart/remove", {
        data: {
          userId: user.id,
          productId: item.productId,
          woodType: item.woodType,
        },
      });
      await fetchCart(); 
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove item");
    }
  };

  const handleNext = () => {
    navigate("/Deliveryaddress"); 
  };

  if (!user) {
    return (
      <div className="cart-wrapper-unique">
        <h2 className="cart-empty-msg-unique">Please login to view your cart</h2>
        <Link to="/login">
          <button className="cart-login-btn-unique">Login</button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return <h2 className="cart-loading-msg-unique">Loading cart...</h2>;
  }

  if (!cart.items.length || cart.status === "empty") {
    return (
      <div className="cart-wrapper-unique">
        <h2 className="cart-empty-msg-unique">Your cart is empty</h2>
        <Link to="/products">
          <button className="cart-add-more-btn-unique">Add Products</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-wrapper-unique">
      <h1 className="cart-title-unique">Your Cart</h1>
      <table className="cart-table-unique">
        <thead>
          <tr>
            <th>Product</th>
            <th>Variant</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item.productId + item.woodType}>
              <td>{item.name}</td>
              <td>{item.woodType}</td>
              <td>₹{item.price}</td>
              <td>
                <button
                  className="cart-qty-btn-unique"
                  onClick={() => handleUpdateQuantity(item, -1)}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="cart-qty-display-unique">{item.quantity}</span>
                <button
                  className="cart-qty-btn-unique"
                  onClick={() => handleUpdateQuantity(item, 1)}
                >
                  +
                </button>
              </td>
              <td>₹{item.price * item.quantity}</td>
              <td>
                <button
                  className="cart-remove-btn-unique"
                  onClick={() => handleRemoveItem(item)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Backend totalAmount */}
      <h2 className="cart-total-unique">Total: ₹{cart.totalAmount}</h2>

      {cart.status === "active" && (
        <button
          onClick={handleNext}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            margin: "20px",
          }}
        >
          Next
        </button>
      )}

      <Link to="/products">
        <button className="cart-add-more-btn-unique">Add More Items</button>
      </Link>
    </div>
  );
}

export default Cart;
