import { Link } from 'react-router-dom';
function PageHeader() {
  return (
    <nav className="bg-green-900 text-gray-100 shadow-lg p-4 flex justify-between items-center">
      <h1 className="text-white-400 text-4xl cursor-pointer hover:text-yellow-500">Car Rental</h1>
      <ul className="flex gap-6 text-sm font-medium">
        <li><Link to="/"  className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">Home</Link></li>
        <li><Link to="/cars"  className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">Cars</Link></li>
        <li><Link to="/about"  className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">About</Link></li>
        <li><Link to="/contact" className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">Contact</Link></li>
      </ul>
    </nav>
  );
}


export default PageHeader;