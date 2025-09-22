import React, { useEffect, useState } from "react";
import axios from "axios";

function ManageReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="manage-review">
      <h2>Manage Reviews</h2>
      <table className="review-table" border="1" cellPadding="10">
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
  );
}

export default ManageReview;
