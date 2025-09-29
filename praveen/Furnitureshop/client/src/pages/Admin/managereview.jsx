import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ManageReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reviews");
        setReviews(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to fetch reviews");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review");
    }
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}
    >
      {/* Header */}
      <div className="header-wrapper">
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul>
          <li>
            <button
              onClick={handleLogout}
              className="loginbtn hover:text-green-500"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <table className="review-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>User</th>
              <th>Order ID</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Created At</th>
              <th>Action</th> 
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <td>{index + 1}</td>
                <td>{review.productId?.name || "N/A"}</td>
                <td>{review.userId?.name || "N/A"}</td>
                <td>{review.orderId?._id || "N/A"}</td>
                <td>{review.rating}</td>
                <td>{review.comment}</td>
                <td>{new Date(review.reviewDate).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(review._id)}
                    style={{ color: "red", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     <div
  style={{
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"  // ensures container fills viewport
  }}
>
  {/* Footer */}
  <footer
    style={{
      background: "#f1f1f1",
      textAlign: "center",
      padding: "10px 0",
      marginTop: "auto"  // pushes footer to bottom only if content is short
    }}
  >
    Copyright © 2025 | Designed by Praveen
  </footer>
</div>

    </div>
  );
}

export default ManageReview;
