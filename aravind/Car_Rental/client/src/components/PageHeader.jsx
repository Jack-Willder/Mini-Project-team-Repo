import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../pages/Login';

function PageHeader() {

  return (
    <>
      <div className="headers flex justify-between items-center p-4 bg-white shadow">
        <div className="imgheader">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </div>
        <div className="widgets text-center">
          <p>For Support Mail Us:</p>
          <a href="#">xyz@gmail.com</a>
        </div>
        <div className="widgets1 text-center">
          <p>Service Helpline Call Us:</p>
          <a href="#">1234567890</a>
        </div>
      </div>

      <nav className="bg-green-900 text-gray-100 p-5 sticky top-0 z-1">
        <ul className="flex gap-6 text-sm font-medium">
          <li><Link to="/" className="hover:text-yellow-500 transition-colors duration-200">Home</Link></li>
          <li><Link to="/cars" className="hover:text-yellow-500 transition-colors duration-200">Cars</Link></li>
          <li><Link to="/driverlogin" className="hover:text-yellow-500 transition-colors duration-200">Drivers</Link></li>
          <li><Link to="/custlogin" className="hover:text-yellow-500 transition-colors duration-200">Customer</Link></li>
          <li><Link to="/about" className="hover:text-yellow-500 transition-colors duration-200">About</Link></li>
          <li><Link to="/contact" className="hover:text-yellow-500 transition-colors duration-200">Contact</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default PageHeader;
