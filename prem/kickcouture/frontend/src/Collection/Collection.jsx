import React, { useState } from 'react';
import './Collection.css';
import { useNavigate } from 'react-router-dom';

// Import logos
import adidasLogo from '../assets/adidas_logo.jpeg';
import nikeLogo from '../assets/nike_logo.png';
import urbanShoeLogo from '../assets/urbanshoe_logo.png';
import pinkLogo from '../assets/pink_logo.jpeg';
import butterflyLogo from '../assets/Butterfly_slipper.webp';

const brandData = [
  {
    name: 'Adidas',
    image: adidasLogo,
    path: '/adidas',
  },
  {
    name: 'Nike',
    image: nikeLogo,
    path: '#',
  },
  {
    name: 'UrbanShoe',
    image: urbanShoeLogo,
    path: '#',
  },
  {
    name: 'PinkShoe',
    image: pinkLogo,
    path: '#',
  },
  {
    name: 'Butterfly',
    image: butterflyLogo,
    path: '#',
  },
];

export const Collection = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('Kids');
  const [selectedBrand, setSelectedBrand] = useState('Nike');

  const handleRedirect = (path) => {
    navigate(path);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
    setSelectedBrand(e.target.value); 
    // You can filter brands here based on gender if needed
    console.log("Selected gender:", e.target.value);
    console.log("Selected brand:", e.target.value);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    console.log("Selected brand:", e.target.value);
  };
  return (
    <div className="collection-container">
      <h2 className='collection-title'>Collection</h2>

      {/* Gender Select Dropdown */}
      <div className="select-navbar">
        <div className="gender-select">
        <label htmlFor="gender">Select Gender: </label>
        <select id="gender" value={selectedGender} onChange={handleGenderChange}>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
       
      </div>

            {/* Brand Select Dropdown */}
      <div className="brand-select">
        <label htmlFor="brand">Select Brand: </label>
        <select id="brand" value={selectedBrand} onChange={handleBrandChange}>
          <option value="Nike">Nike</option>
          <option value="Rose">Adidas</option>
          <option value="butterfly">Butterfly</option>
        </select>
      </div>
      </div>
      

      {/* Brand Buttons */}
      {/* <div className="button-grid">
        {brandData.map((brand, index) => (
          <div
            key={index}
            className="brand-button"
            onClick={() => handleRedirect(brand.path)}
            style={{
              backgroundImage: `url(${brand.image})`,
            }}
          >
            <span className="brand-name">{brand.name}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
};
