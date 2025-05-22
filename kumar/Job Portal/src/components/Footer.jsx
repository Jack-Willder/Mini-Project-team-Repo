import {Link} from 'react-router-dom' 
function Footer() {
  return (
    <footer className="bg-gray-100 text-center p-4 mt-4">
        <p>© 2025 Jobzy | Designed By <Link to="/adminlogin" className="hover:text-blue-600">RK</Link></p>
    </footer>
  );
}

export default Footer;
