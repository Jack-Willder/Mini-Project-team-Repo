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
                        <li><Link to="/" className="hover:text-green-500">Home 🏠</Link></li>
                        <li><Link to="/products" className="hover:text-green-500">Shop 🛒</Link></li>
                        <li><Link to="/contact" className="hover:text-green-500">Contact Us 📞</Link></li>
                        <li><Link to="/about" className="hover:text-green-500">About</Link></li>
                        <li>
                          <Link to="/login">
                            <button className="loginbtn hover:text-green-500">Login</button>
                          </Link>
                        </li>
                      </ul>
                    </div>
            
        <section className="home text-center mt-5 bg-white">
            <h1 className="gallery"><span>OUR</span> GALLERY</h1>
            <section className="p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {['Wooden Sofa Set', 'Queen Bed Frame', 'Dining Table 6-Seater', 'Coffee Table','Garden Chair Set'].map((category, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <img className="mb-2 h-48 w-full object-cover rounded" src="/productimages/p1.jpg" alt="icon" />
                        <h4 className="text-lg font-medium mb-2">{category}</h4>
                    </div>
                    ))}
                </div>            
            </section>
        </section>

            {/* Footer */}
        <div className="footer">
        <p className="foot">Copyright © {year} | Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link></p>
        </div>
      </div>
    );
}

export default Products;
