import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const year = new Date().getFullYear();

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
          <li><Link to="/contact" className="hover:text-green-500">Contact Us</Link></li>
          <li><Link to="/about" className="hover:text-green-500">About</Link></li>
          <li>
            <Link to="/login">
              <button className="loginbtn hover:text-green-500">Login</button>
            </Link>
          </li>
        </ul>
      </div>

      {/* Products */}
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
                  {/* Image */}
                  <img className="gallery-image" src={imageUrl} alt={item.name} />

                  {/* Product Name */}
                  <h3 style={{ fontSize: '18px', marginTop: '10px', textAlign: 'center' }}>
                    {item.name}
                  </h3>

                  {/* Tree Variant Dropdown */}
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

                  {/* Price Display */}
                  {selectedVariant && (
                    <p className="gallery-price">Price: ₹{selectedVariant.price}</p>
                  )}

                  {/* View Details */}
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
