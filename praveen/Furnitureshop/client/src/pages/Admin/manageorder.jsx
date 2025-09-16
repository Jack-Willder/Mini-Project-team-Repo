import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // ✅ THIS IS MISSING
import { useAuth } from "../../context/AuthContext";


function ManageOrder() {
    const { logout } = useAuth();
      const navigate = useNavigate();
    
      const handleLogout = () => {
        logout();
        navigate("/"); // redirect to admin login page after logout
      };
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 Fetch all orders (Admin View)
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  // 🔹 Update a specific order field (paymentStatus, shippingStatus, orderStatus)
  const handleStatusChange = async (orderId, field, value) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        [field]: value
      });
      setMessage(`Order ${field} updated successfully ✅`);
      fetchOrders(); // refresh table
    } catch (err) {
      console.error("Error updating order:", err);
      setMessage(`Failed to update ${field} ❌`);
    }
  };

  // 🔹 Cancel order (restores stock via backend controller)
  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
          orderStatus: "Cancelled"
        });
        setMessage("Order cancelled successfully ✅ (Stock Restored)");
        fetchOrders();
      } catch (err) {
        console.error("Error cancelling order:", err);
        setMessage("Failed to cancel order ❌");
      }
    }
  };

  return (
    <div className="orders-management">
      <h1 className="header funky-text">
        <span className="circle-bg">&nbsp;Furniture</span>One Orders
      </h1>
       <ul><li>
          <button
              onClick={handleLogout}
              className="loginbtn hover:text-green-500"
            >
              Logout
            </button>
        </li>
          
        </ul>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Items</th>
            <th>Total Amount</th>
            <th>Payment Status</th>
            <th>Shipping Status</th>
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId?.name || "Unknown"}</td>
              <td>
                {order.items?.map((item, i) => (
                  <div key={i}>
                    {item.name} ({item.variant}) x {item.quantity}
                  </div>
                ))}
              </td>
              <td>₹{order.totalAmount}</td>

              {/* Payment Status Dropdown */}
              <td>
                <select
                  value={order.paymentStatus || "Pending"}
                  onChange={(e) =>
                    handleStatusChange(order._id, "paymentStatus", e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                </select>
              </td>

              {/* Shipping Status Dropdown */}
              <td>
                <select
                  value={order.shippingStatus || "Pending"}
                  onChange={(e) =>
                    handleStatusChange(order._id, "shippingStatus", e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>

              {/* Order Status Dropdown */}
              <td>
                <select
                  value={order.orderStatus || "Processing"}
                  onChange={(e) =>
                    handleStatusChange(order._id, "orderStatus", e.target.value)
                  }
                >
                  <option value="Processing">Processing</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>

              {/* Actions */}
              <td>
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  disabled={order.orderStatus === "Cancelled"} // disable if already cancelled
                >
                  Cancel Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {message && <p className="delivery-message">{message}</p>}
    </div>
  );
}

export default ManageOrder;
