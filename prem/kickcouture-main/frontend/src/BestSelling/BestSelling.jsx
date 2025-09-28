import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BestSelling.css';
import heroImg from '../assets/img1.jpeg';
import { useState, useEffect } from "react";
import axios from "axios";

const BestSelling = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
    useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/product/get");
      setProducts(res.data.data.slice(0, 3));
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      navigate('/UserLogin');
    } else {
      console.log("Added to cart:", product.title);
      // Implement actual cart logic here
    }
  };

  return (
    <section className="best-selling">
      {products.map((product) => (
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
  );
};

export default BestSelling;
