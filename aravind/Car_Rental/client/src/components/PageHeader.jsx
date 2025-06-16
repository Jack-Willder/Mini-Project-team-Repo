import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../pages/Login';

function PageHeader() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

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
        <div className="btns">
          <button
            onClick={openLoginModal}
            className="bg-amber-800 text-white font-semibold px-6 py-2 rounded mt-2 ml-4 hover:bg-amber-700"
          >
            LOGIN / REGISTER
          </button>
        </div>
      </div>

      <nav className="bg-green-900 text-gray-100 p-5">
        <ul className="flex gap-6 text-sm font-medium">
          <li><Link to="/" className="hover:text-yellow-500 transition-colors duration-200">Home</Link></li>
          <li><Link to="/cars" className="hover:text-yellow-500 transition-colors duration-200">Cars</Link></li>
          <li><Link to="/about" className="hover:text-yellow-500 transition-colors duration-200">About</Link></li>
          <li><Link to="/contact" className="hover:text-yellow-500 transition-colors duration-200">Contact</Link></li>
        </ul>
      </nav>

      {showLoginModal && <LoginModal closeModal={closeLoginModal} />}
    </>
  );
}

export default PageHeader;
