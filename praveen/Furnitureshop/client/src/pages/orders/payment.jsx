import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [upiId, setUpiId] = useState("");
  const [message, setMessage] = useState("");
  const [userAddress, setUserAddress] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || storedUser?._id || storedUser?.id;

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch cart
        const cartRes = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCart(cartRes.data);

        // Fetch user address
        const userRes = await axios.get(`http://localhost:5000/api/userman/users/${userId}`);
        if (userRes.data.address) {
          setUserAddress(userRes.data.address);
        } else {
          setMessage("Please update your address before placing an order.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setMessage("Failed to fetch cart or address.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!userAddress) {
      setMessage("Cannot place order: Address not available.");
      return;
    }

    if (paymentMethod === "Online" && !upiId) {
      setMessage("Please enter your UPI ID for online payment.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/orders/place-order", {
        userId,
        items: cart.items,
        totalAmount: cart.totalAmount,
        paymentMethod,
        upiId: paymentMethod === "Online" ? upiId : null,
        shippingAddress: userAddress,
      });

      alert("Order placed successfully!");
      setCart({ items: [], totalAmount: 0 });
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error(err);
      setMessage("Failed to place order. Please try again.");
    }
  };

  if (loading) return <p className="payment-loading">Loading your cart and address...</p>;

  return (
    <div className="payment-wrapper">
      <h2 className="payment-title">Order Summary</h2>

      {cart.items.length === 0 ? (
        <p className="payment-empty">Your cart is empty.</p>
      ) : (
        <div className="payment-content">
          <ul className="payment-items">
            {cart.items.map((item, index) => (
              <li key={index} className="payment-item">
                {item.name} - {item.variant} x {item.quantity} = ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>

          <p className="payment-total">
            <strong>Total Amount: ₹{cart.totalAmount}</strong>
          </p>

          <h3 className="payment-method-title">Select Payment Method</h3>
          <form className="payment-form" onSubmit={handlePayment}>
            <div className="payment-option">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
            </div>
            <div className="payment-option">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Online"
                  checked={paymentMethod === "Online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Online Payment
              </label>
            </div>

            {paymentMethod === "Online" && (
              <div className="payment-upi">
                <label>UPI ID:</label>
                <input
                  type="text"
                  className="payment-upi-input"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="example@upi"
                />
              </div>
            )}

            <button className="payment-btn" type="submit">
              Proceed to Pay ₹{cart.totalAmount}
            </button>
          </form>

          {message && <p className="payment-message">{message}</p>}
        </div>
      )}
    </div>
  );
}

export default Payment;
