import { Link } from 'react-router-dom';
function Products() {
     const year = new Date().getFullYear();
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
            
     <section className="home-gallery">
  <h1 className="gallery-heading"><span>OUR</span> GALLERY</h1>

  <section className="gallery-wrapper">
    <div className="gallery-grid">
      {['Wooden Sofa Set', 'Queen Bed Frame', 'Dining Table 6-Seater', 'Coffee Table','Garden Chair Set'].map((category, idx) => (
        <div key={idx} className="gallery-item">
          <img className="gallery-image" src="/productimages/p1.jpg" alt="icon" />
          <h4 className="gallery-title">{category}</h4>
        </div>
      ))}
    </div>
  </section>
</section>
            {/* Footer */}
                  <div className="footer">
                    <p className="foot">Copyright © 2025 | Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link></p>
                  </div>
            </div>
    );
}

export default Products;
