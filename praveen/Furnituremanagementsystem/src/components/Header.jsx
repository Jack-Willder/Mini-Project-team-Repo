import { Link } from 'react-router-dom';

function Header(){
    return(
  <div class="header-wrapper">
  <h1 class="header funky-text">
    <span class="circle-bg">&nbsp;Furniture</span>One
  </h1>
  <ul class="navigation">
    <li><Link to="/" >&#127968; Home</Link></li>
    <li><Link to="/products" className="hover:text-green-500">Shop 🛒</Link>/</li>
    <li><Link to="/contact" className="hover:text-green-500">Contact Us 📞</Link></li>
    <li><Link to="/" className="hover:text-green-500">About</Link></li>
    <li><button class="loginbtn">Login</button></li>
  </ul>
</div>
    )
}

export default Header



          