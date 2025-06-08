import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  const year = new Date().getFullYear(); // Fix: define year here

  return (
    <div className='contactpage'>
      <div className="aboutpage">
        {/* Header */}
        <div className="header-wrapper">
          <h1 className="header funky-text">
            <span className="circle-bg">&nbsp;Furniture</span>One
          </h1>
          <ul className="navigation">
            <li><Link to="/" className="hover:text-green-500">Home 🏠</Link></li>
            <li><Link to="/products" className="hover:text-green-500">Shop 🛒</Link></li>
            <li><Link to="/contact" className="hover:text-green-500">Contact Us 📞</Link></li>
            <li><Link to="/about" className="hover:text-green-500">About</Link></li>
            <li>
              <Link to="/login">
                <button className="loginbtn hover:text-green-500">Login</button>
              </Link>
            </li>
          </ul>
        </div>

        <section className="bg-white text-gray-800 py-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center">📞 Contact Us</h1>
            <p className="text-lg mb-10 text-center max-w-xl mx-auto">
              Have questions or need assistance? We're here to help! Reach out to Furniture One anytime.
            </p>

            <div className="bg-gray-100 p-8 rounded-lg shadow-md space-y-6 max-w-md mx-auto">
              <div>
                <h2 className="text-2xl font-semibold mb-2">📍 Address</h2>
                <p>44/1A, Oakwood Avenue,<br />Tirunelveli, Tamil Nadu,<br />India</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2">📧 Email</h2>
                <p>
                  <a href="mailto:support@furnitureone.com" className="text-green-600 hover:underline">
                    support@furnitureone.com
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2">📞 Phone</h2>
                <p>
                  <a href="tel:+1234567890" className="text-green-600 hover:underline">
                    +91 93564 27836<br/>
                    +91 86859 40567
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2">⏰ Working Hours</h2>
                <p>Monday - Friday: 9:00 AM – 6:00 PM<br />Saturday: 10:00 AM – 4:00 PM<br />Sunday: Closed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="footer">
          <p className="foot">Copyright © {year} | Designed by Praveen</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
