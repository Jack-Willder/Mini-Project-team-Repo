import React, { useState } from 'react';
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';

function Body() {
  const images = [image1, image2];
  const [currentIndex, setCurrentIndex] = useState(0);

  function nextImage() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  return (
    <div className="body-center">
      <div className="frcontent">
        <div className="quote">
          Transform your space with timeless elegance
        </div>
        <button className="explore-btn">Explore</button>
      </div>
      <img
        src={images[currentIndex]}
        alt="Furniture"
        onClick={nextImage}
        style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
      />
    </div>
  );
}

export default Body;
