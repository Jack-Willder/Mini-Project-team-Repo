import { Link } from 'react-router-dom';
function PageHeader() {
  return (
    <>
      <div className="headers">
        <div className="imgheader">
          <img src="/images/logo.png" alt="Logo" />
        </div>
        <div className="widgets text-center">
          <p>For Support Mail Us:</p>
          <a href="#">xyz@gmail.com</a>
        </div>
        <div className="widgets1 text-center">
          <p>Service Helpline Call Us:</p>
          <a href="#">1234567890</a>
        </div>
        <div className="btns">
          <Link to="/login"  className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">
          <button  className="bg-amber-800 text-white font-semibold px-6 py-2 rounded mt-5 ml-10">LOGIN / REGISTER</button>
          </Link>
        </div>
      </div>
      <nav className="bg-green-900 text-gray-100 p-5">
        <ul className="flex gap-6 text-sm font-medium">
          <li><Link to="/"  className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">Home</Link></li>
          <li><Link to="/cars"  className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">Cars</Link></li>
          <li><Link to="/about"  className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">About</Link></li>
          <li><Link to="/contact" className="hover:text-yellow-500 transition-colors duration-200 cursor-pointer">Contact</Link></li>
        </ul>
      </nav>
    </>
  );
}


export default PageHeader;