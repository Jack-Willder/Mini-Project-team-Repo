import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header-wrapper">
      <h1 className="header funky-text">
        <span className="circle-bg">&nbsp;Furniture</span>One
      </h1>
      <ul className="navigation">
        <li><Link to="/" className="hover:text-green-500">🏠 Home</Link></li>
        <li><Link to="/products" className="hover:text-green-500">Shop 🛒</Link></li>
        <li><Link to="/contact" className="hover:text-green-500">Contact Us 📞</Link></li>
        <li><Link to="/about" className="hover:text-green-500">About</Link></li>
        <li>
          <button className="loginbtn hover:text-green-500">Login</button>
          {/* Or use this if login has a separate page: */}
          {/* <Link to="/login" className="loginbtn hover:text-green-500">Login</Link> */}
        </li>
      </ul>
    </div>
  );
}

export default Header;



          