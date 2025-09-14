import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DeliveryAddress() {
  const [address, setAddress] = useState({
    doorNo: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    landmark: ""
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || storedUser?._id || storedUser?.id;

  // Fetch user's current address
  useEffect(() => {
    if (!userId) {
      console.error("No logged-in user");
      setLoading(false);
      return;
    }

    const fetchAddress = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/userman/users/${userId}`);
        if (res.data.address) setAddress(res.data.address);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching address:", err);
        setLoading(false);
      }
    };

    fetchAddress();
  }, [userId]);

  // Handle input change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Update address
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/userman/users/${userId}`, {
        address,
      });
      setMessage("Address updated successfully ✅");
    } catch (err) {
      console.error("Error updating address:", err);
      setMessage("Failed to update address ❌");
    }
  };

  // Proceed to payment
  const handleProceedToPayment = () => {
    navigate("/payment");
  };

  if (loading) return <p className="delivery-loading">Loading address...</p>;

  const fields = ["doorNo", "street", "city", "state", "postalCode", "country", "landmark"];

  return (
    <div className="delivery-container">
      <h2 className="delivery-title">Confirm Delivery Address</h2>

      <form className="delivery-form">
        {fields.map((field) => (
          <label key={field} className="delivery-label">
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              type="text"
              name={field}
              value={address[field] || ""}
              onChange={handleAddressChange}
              className="delivery-input"
            />
          </label>
        ))}
      </form>

      <div className="delivery-buttons">
        <button onClick={handleUpdate} className="delivery-update-btn">
          Update Address
        </button>
        <button onClick={handleProceedToPayment} className="delivery-pay-btn">
          Proceed to Payment
        </button>
      </div>

      {message && <p className="delivery-message">{message}</p>}
    </div>
  );
}

export default DeliveryAddress;
