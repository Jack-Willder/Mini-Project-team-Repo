import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function UserOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user orders
  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:5000/api/orders/user/${user.id}`)
        .then((res) => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user orders:", err);
          setLoading(false);
        });
    }
  }, [user]);

  // Cancel order
  const handleCancel = async (orderId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/orders/cancel/${orderId}`
      );
      alert(res.data.message);

      // Refresh orders after cancel
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, orderStatus: "canceled", shippingStatus: "canceled" } : o
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Error canceling order");
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment Status</th>
              <th>Shipping Status</th>
              <th>Order Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  {order.items.map((item, i) => (
                    <div key={i}>
                      {item.productName} ({item.variantName}) × {item.quantity}
                    </div>
                  ))}
                </td>
                <td>₹{order.totalAmount}</td>
                <td>{order.paymentStatus}</td>
                <td>{order.shippingStatus}</td>
                <td>{order.orderStatus}</td>
                <td>
                  {order.shippingStatus === "pending" && order.orderStatus !== "canceled" ? (
                    <button onClick={() => handleCancel(order._id)}>Cancel</button>
                  ) : (
                    "Not Allowed"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserOrders;
