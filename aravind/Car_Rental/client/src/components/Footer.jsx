import {Link} from 'react-router-dom';
function Footer(){
  return (
    <footer className="bg-indigo-100 text-center p-4 mt-4">
        <p>© 2025 Car Rental | Designed By <Link to='/adminlogin'>Sid</Link></p>
    </footer>
  );
}

export default Footer;
