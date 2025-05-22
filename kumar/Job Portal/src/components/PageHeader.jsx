import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <div className="header bg-blue-600 py-5 text-center">
        <h1 className="text-6xl font-bold text-white">Jobzy</h1>
      </div>
      <nav className="navbar bg-white shadow-md p-4 flex justify-between items-center">
        <ul className="flex gap-6 text-blue-500">
          <li><Link to="/" className="hover:text-green-500">Home</Link></li>
          <li><Link to="/jobs" className="hover:text-green-500">Jobs</Link></li>
          <li><Link to="/companies" className="hover:text-green-500">Companies</Link></li>
          <li><Link to="/contact" className="hover:text-green-500">Contact</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
