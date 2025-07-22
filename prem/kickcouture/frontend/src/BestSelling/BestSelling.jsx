// export default BestSelling;
import React from 'react';
import './BestSelling.css';
import heroImg from '../assets/img1.jpeg';

const products = [
  {
    id: 1,
    title: "Summer Essentials",
    description: "Lightweight and breathable shoes for the hottest days",
    image: "heroImg",
  },
  {
    id: 2,
    title: "Sport Performance",
    description: "Engineered for maximum performance and durability",
    image: "heroImg",
  },
  {
    id: 3,
    title: "Urban Collection",
    description: "Street-ready styles for the modern trendsetter",
    image: "heroImg",
  },
];

const BestSelling = () => {
  return (
    <section className="best-selling">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.title} />
          <div className="product-info">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <button>Shop Now →</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default BestSelling;
