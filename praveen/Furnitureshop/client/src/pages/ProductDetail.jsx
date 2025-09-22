import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [reviews, setReviews] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLoginRedirect = () => {
    navigate('/login', { state: { from: location.pathname } });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/items`);
        const foundProduct = res.data.find((p) => p._id === id);
        setProduct(foundProduct);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/product/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };
    fetchReviews();
  }, [id]);

  const handleAddToCart = async () => {
    const variant = product.variants?.[selectedVariant];

    if (!user) {
      alert("Please login to add items to cart.");
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (variant) {
      try {
        await axios.post("http://localhost:5000/api/cart/add", {
          userId: user.id,
          productId: product._id,
          quantity: 1,
          woodType: variant.woodType,
          price: variant.price,
          name: product.name,
        });
        alert(`${product.name} (${variant.woodType}) added to your cart!`);
        navigate("/cart");
      } catch (err) {
        console.error("Error adding to cart:", err);
        alert("Failed to add item to cart. Please try again.");
      }
    }
  };

  if (!product) return <p>Loading...</p>;

  const imageUrl = `http://localhost:5000/api/items/image/${product._id}`;

  return (
    <div className="single-product-detail">
      {/* Header */}
      <div className="header-wrapper">
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul className="navigation">
          <li><Link to="/" className="hover:text-green-500">Home</Link></li>
          <li><Link to="/products" className="hover:text-green-500">Shop</Link></li>
          <li><Link to="/contact" className="hover:text-green-500">Contact Us</Link></li>
          <li><Link to="/about" className="hover:text-green-500">About</Link></li>
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

      {/* Product Detail */}
      <div className="product-detail">
        <img src={imageUrl} alt={product.name} className="product-image" />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p><strong>Description:</strong> {product.desc}</p>
          <p><strong>Size:</strong> {product.size}</p>

          {product.variants?.length > 0 && (
            <>
              <label htmlFor="variant">Select Wood Type:</label>
              <select
                id="variant"
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(Number(e.target.value))}
              >
                {product.variants.map((variant, i) => (
                  <option key={i} value={i}>{variant.woodType}</option>
                ))}
              </select>
              <p><strong>Price:</strong> ₹{product.variants[selectedVariant]?.price}</p>
              <p><strong>Stock:</strong> {product.variants[selectedVariant]?.stock}</p>
            </>
          )}

          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews found for this product.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <p className="stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                ))}
              </p>
              <p><strong>User:</strong> {review.userId?.name || "Anonymous"}</p>
              <p className="comment">{review.comment}</p>
              <p><small>Reviewed on: {new Date(review.reviewDate).toLocaleString()}</small></p>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="foot">
          Copyright © 2025 | Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link>
        </p>
      </div>
    </div>
  );
}

export default ProductDetail;
