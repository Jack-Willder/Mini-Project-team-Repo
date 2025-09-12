import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import {User} from 'lucide-react';
import { useAuth } from "../context/AuthContext";

function Body() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLoginRedirect = () => {
    localStorage.setItem("redirectAfterLogin", location.pathname);
    navigate("/login",{ state: { from: location.pathname } });
  };

  return (
    <div className="Home">
      {/* Header */}
      <div className="header-wrapper">
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul className="navigation">
          <li><b><Link to="/">Home</Link></b></li>
          <li><b><Link to="/products">Shop</Link></b></li>
          <li><b><Link to="/contact">Contact</Link></b></li>
          <li><b><Link to="/about">About Us</Link></b></li>
           <li style={{ display: "flex", alignItems: "center" }}>
                                 {user ? (
                                   <>
                                     <button className="loginbtn" onClick={handleLogout}>
                                       Logout
                                     </button>
                                     <div className="usericon">
                                       <Link to="/userdashboard">
                             <User size={25} />
                           </Link>
                                     </div>
                                   
                                   </>
                                 ) : (
                                   <button className="loginbtn" onClick={handleLoginRedirect}>
                                     Login
                                   </button>
                                 )}
                               </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="actual-content-index">
        {/* Hero Banner */}
        <div className="background-picsofa">
          <img src="/productimages/frontpagelargeimage.jpeg" alt="Sale" />
          <div className="sale-specification">
            <h1>SUMMER SALE</h1>
            <p>GET <span className="word">ATTRACTIVE</span> OFFERS</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="information">
          <h2 className="headline">
            WE DO ONLY <span>CUSTOMER SATISFICATION</span> - Furniture One
          </h2>
          <p>Shopping for living room furniture can be challenging. While not every store carries the style or size of furniture you need.</p>
          <p><strong>Furniture One</strong> has one of the largest selections of quality made furniture and a team of sales people who are ready and waiting to help you find the perfect pieces for your Home.</p>
          <p>Whether you're looking for a sectional sofa, a matching love seat and sofa, recliners, coffee tables or any other furniture for your living room. <strong>Furniture One</strong> is the place where you will find everything you're looking for at prices that just can't be beat.</p>

          <div className="home-container">
            <div className="image-box"><img src="/productimages/sofa1.jpg" alt="Sofa 1" /></div>
            <div className="image-box"><img src="/productimages/sofa2.jpg" alt="Sofa 2" /></div>
            <div className="image-box"><img src="/productimages/frontpagechair.png" alt="Chair" /></div>
          </div>
        </div>

        {/* New Arrivals Section */}
        <div className="new-arrivals">
          <h2><span>NEW </span>ARRIVALS</h2>
          <p>Celebrate being together in the room that is the heart of what home is about.</p>
          <p>Create a space that welcomes you and your guest and makes each moment a special occasion.
          </p>
        </div>

        <div className="newfurniture">
          <div className="row">
            <div className="image-box">
              <figure>
                <img src="/productimages/frontpageproduct1.jpg" alt="Royal Sofas" />
                <figcaption>ROYAL SOFAS</figcaption>
              </figure>
            </div>
            <div className="image-box">
              <figure>
                <img src="/productimages/diningtable.jpg" alt="Dining Table" />
                <figcaption>DINING TABLE</figcaption>
              </figure>
            </div>
            <div className="image-box">
              <figure>
                <img src="/productimages/frontpageproduct5.jpg" alt="Lounge Chair" />
                <figcaption>ARMREST LOUNGE CHAIR</figcaption>
              </figure>
            </div>
          </div>

          <div className="row row-center">
            <div className="image-box">
              <figure>
                <img src="/productimages/p1.jpg" alt="Cot" />
                <figcaption>COT</figcaption>
              </figure>
            </div>
            <div className="image-box">
              <figure>
                <img src="/productimages/frontpageproduct6-Pica.png" alt="Loveseat" />
                <figcaption>LOVESEAT</figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Final Promo Section */}
        <div className="final-image">
          <img src="/productimages/backgroundfullpic-Pica.png" alt="Complete Home Furniture" />
          <p>COMPLETE HOME FURNITURE</p>
          <Link to="/products">
            <button>Explore</button>
          </Link>
        </div>

        {/* Footer */}
         <div className="footer">
        <p className="foot">
          Copyright © 2025 | Designed by
          <Link to="/adminlogin" className="footer-link"> Praveen</Link>
        </p>
      </div>
      </div>
    </div>
  );
}

export default Body;
