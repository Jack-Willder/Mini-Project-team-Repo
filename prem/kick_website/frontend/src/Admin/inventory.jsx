import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.css";

const Inventory = () => {
  const [brandCounts, setBrandCounts] = useState({});

  // 🧩 Fetch products and compute brand counts
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/product/get");
      const allProducts = res.data.data || [];

      const counts = allProducts.reduce((acc, item) => {
        acc[item.brand] = (acc[item.brand] || 0) + 1;
        return acc;
      }, {});
      setBrandCounts(counts);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h1>📦 Inventory Management</h1>
        <p>Monitor product availability and brand-wise stock counts.</p>
      </div>

      <div className="inventory-card">
        <h2>📊 Product Count by Brand</h2>

        {Object.keys(brandCounts).length > 0 ? (
          <ul className="brand-list">
            {Object.entries(brandCounts).map(([brand, count], index) => (
              <li key={brand} className="brand-item">
                <div className="brand-name">
                  <span className="brand-circle">{brand[0]}</span>
                  {brand}
                </div>
                <span className={`brand-count count-${(index % 4) + 1}`}>
                  {count} products
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Inventory;
