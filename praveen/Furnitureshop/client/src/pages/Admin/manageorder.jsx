import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ManageOrder() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState({}); 
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchOrdersAndUsers();
  }, []);

  
  const fetchOrdersAndUsers = async () => {
    try {
      const ordersRes = await axios.get("http://localhost:5000/api/orders");
      const usersRes = await axios.get("http://localhost:5000/api/userman/users");

      
      const usersMap = {};
      usersRes.data.forEach((user) => {
        usersMap[user._id] = user;
      });

      setUsers(usersMap);
      setOrders(ordersRes.data);
    } catch (err) {
      console.error("Error fetching orders or users:", err);
    }
  };

  
  const handleStatusChange = async (orderId, field, value) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        [field]: value
      });
      setMessage(`Order ${field} updated successfully `);
      fetchOrdersAndUsers(); 
    } catch (err) {
      console.error("Error updating order:", err);
      setMessage(`Failed to update ${field} `);
    }
  };

  
  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
          orderStatus: "Cancelled"
        });
        setMessage("Order cancelled successfully  (Stock Restored)");
        fetchOrdersAndUsers();
      } catch (err) {
        console.error("Error cancelling order:", err);
        setMessage("Failed to cancel order ");
      }
    }
  };

  return (
    <div className="orders-management">
      <div className="header-wrapper">
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul>
          <li>
            <button onClick={handleLogout} className="loginbtn hover:text-green-500">
              Logout
            </button>
          </li>
        </ul>
      </div>
      <br/>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Items</th>
            <th>Total Amount</th>
            <th>Payment Status</th>
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{users[order.userId]?.name || "Unknown"}</td>
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

              {/* Order Status Dropdown */}
              <td>
                <select
                  value={order.orderStatus || "Processing"}
                  onChange={(e) =>
                    handleStatusChange(order._id, "orderStatus", e.target.value)
                  }
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>

              {/* Actions */}
              <td>
                <button
  onClick={() => handleCancelOrder(order._id)}
  disabled={order.orderStatus === "Cancelled" || order.orderStatus === "Delivered"}
  style={{
    backgroundColor: order.orderStatus === "Cancelled" || order.orderStatus === "Delivered" ? "#ccc" : "red",
    color: "white",
    fontWeight: "700",
    borderRadius: "6px",
    padding: "8px",
    cursor: order.orderStatus === "Cancelled" || order.orderStatus === "Delivered" ? "not-allowed" : "pointer"
  }}
>
  Cancel Order
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {message && <p className="delivery-message">{message}</p>}
     <div
  style={{
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh" // full height of viewport
  }}
>
  {/* Main page content */}
  <div style={{ flex: 1 }}>
    {/* All your page content goes here */}
  </div>

  {/* Footer */}
  <footer
    style={{
      background: "#f1f1f1",
      textAlign: "center",
      padding: "10px 0",
      marginTop: "auto" // pushes footer to bottom if content is short
    }}
  >
    Copyright © 2025 | Designed by Praveen
  </footer>
</div>

    </div>
  );
}

export default ManageOrder;
