import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function Review() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
        const orderItems = res.data.items.map((item) => ({
          productId: item.productId?._id || item.productId,
          name: item.productId?.name || item.name,
          rating: 0,
          comment: "",
        }));
        setItems(orderItems);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to fetch order items");
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleRating = (productId, star) => {
    setItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, rating: star } : item))
    );
  };

  const handleComment = (productId, value) => {
    setItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, comment: value } : item))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return alert("User not logged in");

    try {
      const reviews = items.map((i) => ({
        productId: i.productId,
        rating: i.rating,
        comment: i.comment,
      }));

      await axios.post("http://localhost:5000/api/reviews", {
        items: reviews,
        orderId,
        userId: user.id,
      });

      alert("Reviews submitted successfully!");
      navigate("/userorders");
    } catch (err) {
      console.error("Error submitting reviews:", err);
      alert(err.response?.data?.message || "Error submitting reviews");
    }
  };

  if (loading) return <p>Loading order items...</p>;

  return (
    <div>
      <h2 style={{fontWeight:"bold",justifyContent:"center", alignItems:"center"}}>Review Your Products</h2>
      <br/>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Rating</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.productId}>
                <td>{item.name}</td>
                <td>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRating(item.productId, star)}
                      style={{
                        cursor: "pointer",
                        color: item.rating >= star ? "#ffc107" : "#ccc",
                        marginRight: "2px",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </td>
                <td>
                  <textarea
                    value={item.comment}
                    onChange={(e) => handleComment(item.productId, e.target.value)}
                    rows="2"
                    style={{ width: "100%", border:"1px solid black",borderRadius:"10px"}}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       <button 
  type="submit" 
  style={{
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginRight: "10px"
  }}
  >
  Submit
</button>

<button 
  type="button" 
  onClick={() => navigate("/userorders")}
  style={{
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  }}
  >
  Cancel
</button>

      </form>
    </div>
  );
}

export default Review;
