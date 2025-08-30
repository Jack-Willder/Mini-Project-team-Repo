import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function products() {
  const [products, setProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  const handleLoginClick = () => {
    localStorage.setItem("redirectAfterLogin", "/products");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/items');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleVariantChange = (productId, index) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: index,
    }));
  };

  return (
    <div className="productpage">
      {/* Header */}
      <div className="header-wrapper">
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul className="navigation">
          <li><Link to="/" className="hover:text-green-500">Home</Link></li>
          <li><Link to="/products" className="hover:text-green-500">Shop</Link></li>
          <li><Link to="/contact" className="hover:text-green-500">Contact</Link></li>
          <li><Link to="/about" className="hover:text-green-500">About</Link></li>
          <li>
            {user ? (
              <button className="loginbtn hover:text-green-500" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button className="loginbtn hover:text-green-500" onClick={handleLoginClick}>
                Login
              </button>
            )}
          </li>
        </ul>
      </div>

      {/* Products Section */}
      <section className="home-gallery">
        <h1 className="gallery-heading"><span>OUR</span> PRODUCTS</h1>
        <section className="gallery-wrapper">
          <div className="gallery-grid">
            {products.map((item) => {
              const imageUrl = `http://localhost:5000/api/items/image/${item._id}`;
              const selectedIndex = selectedVariants[item._id] || 0;
              const selectedVariant = item.variants?.[selectedIndex];

              return (
                <div key={item._id} className="gallery-item">
                  <img className="gallery-image" src={imageUrl} alt={item.name} />
                  <h3 style={{ fontSize: '18px', marginTop: '10px', textAlign: 'center' }}>{item.name}</h3>

                  {item.variants?.length > 0 && (
                    <select
                      onChange={(e) => handleVariantChange(item._id, e.target.value)}
                      value={selectedIndex}
                      style={{
                        margin: '10px 0',
                        padding: '5px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        width: '80%',
                      }}
                    >
                      {item.variants.map((variant, idx) => (
                        <option key={idx} value={idx}>
                          {variant.woodType} – ₹{variant.price}
                        </option>
                      ))}
                    </select>
                  )}

                  {selectedVariant && (
                    <p className="gallery-price">Price: ₹{selectedVariant.price}</p>
                  )}

                  <Link to={`/product/${item._id}`}>
                    <button className="view-details-btn">View Details</button>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </section>

      {/* Footer */}
      <div className="footer">
        <p className="foot">
          Copyright © {year} | Designed by
          <Link to="/adminlogin" className="footer-link"> Praveen</Link>
        </p>
      </div>
    </div>
  );
}

export default products; 
