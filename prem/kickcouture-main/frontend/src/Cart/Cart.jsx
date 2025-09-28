import React, { useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect } from "react";


export const Cart = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('Kids');
  const [selectedBrand, setSelectedBrand] = useState('Nike');
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

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
      const filter = res.data.orders.filter(order => order.email === email)
      const filteredOrders = filter.filter(order => order.status === "cart");

      setProducts(filteredOrders);
      setDisplayedProducts(filteredOrders);
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

  const totalPrice = () => {
    // Implement total price calculation here
    return products.reduce((total, product) => total + product.productId.price, 0);
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
      <h2 className='collection-title'>Cart</h2>

      <div className="select-navbar">
        <div className="gender-select">
        <label htmlFor="gender">Total Price : ₹ {totalPrice()} </label>
      </div>

      <div className="brand-select">
        <label htmlFor="brand">Check Out</label>
      </div>
      </div>
          <section className="best-selling">
            {products.map((order) => {
              const product = order.productId;
              return (
                <div className="product-card" key={order._id}>
                  <img src={"http://localhost:5000/" + product.image} alt={product.title} />
                  <div className="product-info">
                    <h1>{product.name}</h1>
                    <h2>size {product.size}</h2>
                    <h3>₹ {product.price}</h3>
                    <p>brand {product.brand}</p>
                    <p>{product.description}</p>
                    <button onClick={() => handleRemoveFromCart(order)}>Remove from Cart 🛒</button>
                    <button onClick={() => handleBuyNow(order)}>Buy Now</button>
                  </div>
                </div>
              );
            })}
          </section>

    </div>
  );
};
