import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const navigate = useNavigate();
  const location = useLocation(); 
  const { user, logout } = useAuth();

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

  const handleAddToCart = () => {
    const variant = product.variants?.[selectedVariant];
    if (!user) {
      alert("Please login to add items to cart.");
      navigate('/login', { state: { from: location.pathname } }); 
      return;
    }
    if (variant) {
      alert(`${product.name} (${variant.woodType}) added to cart!`);
     
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
          <li>
            {user ? (
              <button className="loginbtn hover:text-green-500" onClick={handleLogout}>Logout</button>
            ) : (
              <button className="loginbtn hover:text-green-500" onClick={handleLoginRedirect}>Login</button>
            )}
          </li>
        </ul>
      </div>

      {/* Product Detail */}
      <div className="product-detail">
        <img
          src={imageUrl}
          alt={product.name}
          className="product-image"
        />
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

          <Link to="/cart"><button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button></Link>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="foot">
          Copyright © 2025 |
          Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link>
        </p>
      </div>
    </div>
  );
}

export default ProductDetail;
