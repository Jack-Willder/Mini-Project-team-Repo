import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  const handleLoginRedirect = () => {
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

  // 🔥 Filter products by category
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((item) => item.category === selectedCategory);

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
          <li style={{ display: "flex", alignItems: "center" }}>
            {user ? (
              <>
                <button className="loginbtn" onClick={handleLogout}>
                  Logout
                </button>
                <div className="usericon">
                  <Link to="/userdashboard">
                    <User size={25} />
                  </Link>
                </div>
              </>
            ) : (
              <button className="loginbtn" onClick={handleLoginRedirect}>
                Login
              </button>
            )}
          </li>
        </ul>
      </div>

      {/* Products Section */}
      <section className="home-gallery">
        <h1 className="gallery-heading"><span>OUR</span> PRODUCTS</h1>

        {/* 🔥 Category Filter */}
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          >
            <option value="All">All Categories</option>
            <option value="SOFA">SOFA</option>
            <option value="CHAIR">CHAIR</option>
            <option value="DINING TABLE">DINING TABLE</option>
            <option value="COT">COT</option>
            <option value="STORAGE UNIT">STORAGE UNIT</option>
            <option value="SEATER">SEATER</option>


            {/* 👉 You can make this dynamic later */}
          </select>
        </div>

        {/* Gallery */}
        <section className="gallery-wrapper">
          <div className="gallery-grid">
            {filteredProducts.map((item) => {
              const imageUrl = `http://localhost:5000/api/items/image/${item._id}`;
              const selectedIndex = selectedVariants[item._id] || 0;
              const selectedVariant = item.variants?.[selectedIndex];

              return (
                <div key={item._id} className="gallery-item">
                  <img className="gallery-image" src={imageUrl} alt={item.name} />
                  <h3 style={{ fontSize: '18px', marginTop: '10px', textAlign: 'center' }}>
                    {item.name}
                  </h3>

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

export default Products;
