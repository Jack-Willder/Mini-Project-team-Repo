import { Link } from 'react-router-dom';

function Header() {
  return (
      <div className="header-wrapper">
     {/* Header */}
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul className="navigation">
          <li><b><Link to="/" >Home </Link></b></li>
          <li><b><Link to="/products" >Shop </Link></b></li>
          <li><b><Link to="/contact">Contact Us </Link></b></li>
           
          <li><b><Link to="/about">About Us</Link></b></li>
          <li>
            <Link className='loginbtn' to="/login">
              <button>Login</button>
            </Link>
          </li>
        </ul>
      </div>
  );
}

export default Header;



          