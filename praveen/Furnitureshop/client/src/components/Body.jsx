import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Body() {
  return (
    <div className="Home">
      {/* Header */}
      <div className="header-wrapper">
        <h1 className="header funky-text">
          <span className="circle-bg">&nbsp;Furniture</span>One
        </h1>
        <ul className="navigation">
          <li><b><Link to="/" >Home </Link></b></li>
          <li><b><Link to="/products" >Shop </Link></b></li>
          <li><b><Link to="/contact">Contact Us </Link></b></li>
          <li><b><Link to="/about">About Us</Link></b></li>
          <li>
            <Link className='loginbtn' to="/login">
              <button>Login</button>
            </Link>
          </li>
        </ul>
      </div>

      {/* Center Content */}
      <div className="actual-content-index">
        <div className="background-picsofa">
          <img src="/productimages/background1final.jpg" />
          <div className="sale-specification">
            <h1>SUMMER SALE</h1>
            <p>GET<span className="word"> ATTRACTIVE </span>OFFERS</p>
          </div>
        </div>
        <div className="information">
    <h2 class="headline">We do only <span>Customer Satisfaction</span> - Furniture Store</h2>
    <p>
      Shopping for living room furniture can be challenging. While not every store carries the style or size of furniture you need.
    </p>
    <p>
      <strong>Furniture One</strong> has one of the largest selections of quality-made furniture and a team of salespeople who are ready and waiting to help you find the perfect pieces for your Home and Office.
    </p>
    <p>
      Whether you're looking for a sectional sofa, a matching loveseat and sofa, recliners, coffee tables, or any other furniture for your living room — <strong>Furniture One</strong> is the place where you will find everything you're looking for at prices that just can't be beat.
    </p>
    <div className="home-container">
    <div className="image-box">
      <img src="/productimages/sofa1.jpg" alt="Image 1"/>
    </div>
    <div className="image-box">
      <img src="/productimages/sofa2.jpg" alt="Image 2"/>
    </div>
    <div className="image-box">
      <img src="/productimages/sofa3.jpg" alt="Image 3"/>
    </div>
  </div>
  </div>
  <div className="new-arrivals">
    <h2><span>NEW </span>ARRIVALS</h2>
    <p>
      Celebrate being together in the room that is the heart of what home is about.
      </p>
    <p>
      Create a space that welcomes you and your guest and makes each moment a special occasion.
      </p>
      </div>
      
<div className="newfurniture">
  <div className="row">
    <div className="image-box">
      <figure>
        <img src="/productimages/background.jpg" alt="Royal Sofas" />
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
        <img src="/productimages/plasticfurniture.jpg" alt="Plastic Furniture" />
        <figcaption>PLASTIC FURNITURE</figcaption>
      </figure>
    </div>
  </div>

  <div className="row row-center">
    <div className="image-box">
      <figure>
        <img src="/productimages/p1.jpg" alt="Cot & Mattress" />
        <figcaption>COT & MATTRESS</figcaption>
      </figure>
    </div>
    <div className="image-box">
      <figure>
        <img src="/productimages/living.jpg" alt="Loveseat" />
        <figcaption>LOVESEAT</figcaption>
      </figure>
    </div>
  </div>
</div>
<div className="final-image">
  <img src="/productimages/FINALPIC.jpg" alt="final image to explore products"/>
  <p>COMPLETE HOME FURNITURE</p>
  <Link to="/products">  <button>Explore</button>
</Link>

</div>  
  {/* Footer */}
      <div className="footer">
        <p className="foot">Copyright © 2025 | Designed by <Link to="/adminlogin" className="footer-link">Praveen</Link></p>
      </div>
    </div>
</div>

    
  );
}

export default Body;
