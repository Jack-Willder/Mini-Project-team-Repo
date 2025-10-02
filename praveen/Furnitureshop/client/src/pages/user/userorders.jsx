import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { User } from "lucide-react";

function UserOrders() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewStatus, setReviewStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      const fetchOrders = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/orders/user/${user.id}`
          );
          setOrders(res.data);

          // Check review status for each order
          const reviewChecks = await Promise.all(
            res.data.map((order) =>
              axios.get(
                `http://localhost:5000/api/reviews/check/${user.id}/${order._id}`
              )
            )
          );

          const statusObj = {};
          res.data.forEach((order, i) => {
            statusObj[order._id] = reviewChecks[i].data.exists;
          });
          setReviewStatus(statusObj);
        } catch (err) {
          console.error("Error fetching user orders:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [user]);

  // Cancel order
  const handleCancel = async (orderId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/orders/cancel/${orderId}`
      );
      alert(res.data.message);
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId
            ? { ...o, orderStatus: "Cancelled", shippingStatus: "Cancelled" }
            : o
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Error canceling order");
    }
  };

  // Repurchase order
  const handleRepurchase = async (order) => {
    try {
      for (let item of order.items) {
        await axios.post("http://localhost:5000/api/cart/add", {
          userId: user.id,
          productId: item.productId, // MongoDB _id of product
          name: item.name,
          woodType: item.variant, // variant info
          price: item.price,
          quantity: item.quantity,
        });
      }
      alert("Items added to your cart for repurchase!");
      navigate("/cart");
    } catch (err) {
      console.error(err);
      alert("Error adding items to cart for repurchase.");
    }
  };

  const renderAction = (order) => {
  const status = order.orderStatus.toLowerCase();

  if (status === "processing") {
    return (
      <button
        className="action-btn cancel-btn"
        onClick={() => handleCancel(order._id)}
      >
        Cancel
      </button>
    );
  }

  if (status === "delivered") {
    return (
      <div className="action-group">
        {reviewStatus[order._id] ? (
          "Reviewed"
        ) : (
          <button
            className="action-btn review-btn"
            onClick={() => navigate(`/review/${order._id}`)}
          >
            Review
          </button>
        )}
        <button
          className="action-btn repurchase-btn"
          onClick={() => handleRepurchase(order)}
        >
          Repurchase
        </button>
      </div>
    );
  }
};

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLoginRedirect = () => {
    localStorage.setItem("redirectAfterLogin", "/userprofile");
    navigate("/login");
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="userorderspage">
      {/* Header */}
      <div className="header-wrapper">
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul className="navigation">
          <li>
            <Link to="/" className="hover:text-green-500">Home</Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-green-500">Shop</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-green-500">Contact</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-green-500">About</Link>
          </li>
          <li style={{ display: "flex", alignItems: "center" }}>
            {user ? (
              <>
                <button className="loginbtn" onClick={handleLogout}>Logout</button>
                <div className="usericon">
                  <Link to="/userdashboard"><User size={25} /></Link>
                </div>
              </>
            ) : (
              <button className="loginbtn" onClick={handleLoginRedirect}>Login</button>
            )}
          </li>
        </ul>
      </div>

      {/* Orders Table */}
      <div>
        <h2 style={{ fontWeight: "bold", textAlign: "center" }}>My Orders</h2>
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
                        {item.name} ({item.woodType}) × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>₹{order.totalAmount}</td>
                  <td>{order.paymentStatus}</td>
                  <td>{order.orderStatus}</td>
                  <td>{renderAction(order)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="foot">Copyright © 2025 | Designed by Praveen</p>
      </div>
    </div>
  );
}

export default UserOrders;
