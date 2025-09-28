import React, { useState } from 'react';
import './Collection.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect } from "react";


export const Collection = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('Kids');
  const [selectedBrand, setSelectedBrand] = useState('Nike');
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

    useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/product/get");
      setProducts(res.data.data);
      setDisplayedProducts(res.data.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleAddToCart = async (product) => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/order/add", {
        email,
        productId: product._id,
        status: "cart"
      });
      alert(res.data.message);
    } catch (err) {
      console.error("Error adding to cart", err);
    }
  };

  const handleRedirect = (path) => {
    navigate(path);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
    setSelectedBrand(e.target.value);
    const filteredProducts = products.filter(
      (product) => product.gender.toLowerCase() === e.target.value.toLowerCase()
    );
    setDisplayedProducts(filteredProducts);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    const filteredProducts = products.filter(
      (product) => product.brand.toLowerCase() === e.target.value.toLowerCase() && product.gender.toLowerCase() === selectedGender.toLowerCase()
    );
    setDisplayedProducts(filteredProducts);
  };
  return (
    <div className="collection-container">
      <h2 className='collection-title'>Collection</h2>

      {/* Gender Select Dropdown */}
      <div className="select-navbar">
        <div className="gender-select">
        <label htmlFor="gender">Select Gender: </label>
        <select id="gender" value={selectedGender} onChange={handleGenderChange}>
          {Array.from(new Set(products.map((product) => product.gender.toLowerCase()))).map((gender) => (
            <option key={gender} value={gender}>{
              gender.charAt(0).toUpperCase() + gender.slice(1)
            }</option>
          ))}
        </select>
       
      </div>

            {/* Brand Select Dropdown */}
      <div className="brand-select">
        <label htmlFor="brand">Select Brand: </label>
        <select id="brand" value={selectedBrand} onChange={handleBrandChange}>
          {Array.from(new Set(products.map((product) => product.brand.toLowerCase()))).map((brand) => (
            <option key={brand} value={brand}>{
              brand.charAt(0).toUpperCase() + brand.slice(1)
            }</option>
          ))}
        </select>
      </div>
      </div>
      
                <section className="best-selling">
            {displayedProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <img src={"http://localhost:5000/" + product.image} alt={product.title} />
                <div className="product-info">
                  <h1>{product.name}</h1>
                  <h2>size {product.size}</h2>
                  <h3>₹ {product.price}</h3>
                  <p>brand {product.brand}</p>
                  <p>{product.description}</p>
                  <button onClick={() => handleAddToCart(product)}>Add to Cart 🛒</button>
                  <button>Buy Now</button>
                </div>
              </div>
            ))}
          </section>

    </div>
  );
};
