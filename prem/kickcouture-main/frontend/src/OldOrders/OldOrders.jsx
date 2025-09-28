import React, { useState } from 'react';
import './OldOrders.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect } from "react";


export const OldOrders = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

    useEffect(() => {
    fetchProducts();
  }, []);

    const handleAddToCart = async (product) => {
      try {
        const res = await axios.post("http://localhost:5000/api/order/add", {
          _id: product._id,
          email: product.email,
          productId: product.productId,
          status: "pending",
          createdAt: new Date()
        });
        alert(res.data.message);
      } catch (err) {
        console.error("Error adding to cart", err);
      }
    };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/order/all");
      const email = localStorage.getItem("userEmail");
      const filteredOrders = res.data.orders.filter(order => order.email === email);
      
      // old orders
      const oldOrders = filteredOrders.filter(order => order.status !== "cart");
      setProducts(oldOrders);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleRemoveFromCart = async (product) => {
    try {
      await axios.delete(`http://localhost:5000/api/order/${product._id}`);
      // After deletion, fetch the updated list of products
      fetchProducts();
    } catch (err) {
      console.error("Error removing from cart", err);
    }
  };

  const handleBuyNow = (product) => {
    // Implement buy now functionality here
    alert(`Buying ${product.productId.name}`);
    console.log(product);
    handleRemoveFromCart(product); 
    handleAddToCart(product);
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
      <h2 className='collection-title'>Old Orders</h2>

          <section className="best-selling">
            {products.map((order) => {
              const product = order.productId;
              return (
                <div className="product-card" key={order._id}>
                  <img src={"http://localhost:5000/" + product.image} alt={product.title} />
                  <div className="product-info">
                    <h1>{product.name}</h1>
                    <h2>STATUS: {order.status}</h2>
                    <h2>size {product.size}</h2>
                    <h3>₹ {product.price}</h3>
                    <p>brand {product.brand}</p>
                    <p>{product.description}</p>
                    <p>{order.createdAt}</p>
                  </div>
                </div>
              );
            })}
          </section>

    </div>
  );
};
