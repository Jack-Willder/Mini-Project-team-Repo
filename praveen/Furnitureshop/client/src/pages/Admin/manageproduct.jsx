import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/items`);
        const foundProduct = res.data.find((p) => p._id === id);
        setProduct(foundProduct);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    fetchProduct();
  }, [id]);

 
  if (!product) return <p className="loading">Loading...</p>;

  const imageUrl = `http://localhost:5000/api/items/image/${product._id}`;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img src={imageUrl} alt={product.name} className="product-detail-image" />
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p><strong>Description:</strong> {product.desc}</p>
          <p><strong>Size:</strong> {product.size}</p>

          {product.variants && product.variants.length > 0 && (
            <>
              <label htmlFor="variant">Select Wood Type:</label>
              <select
                id="variant"
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(Number(e.target.value))}
                className="variant-select"
              >
                {product.variants.map((variant, i) => (
                  <option key={i} value={i}>{variant.woodType}</option>
                ))}
              </select>
              <p><strong>Price:</strong> ₹{product.variants[selectedVariant].price}</p>
              <p><strong>Stock:</strong> {product.variants[selectedVariant].stock}</p>
            </>
          )}

          <button className="add-to-cart-btn" >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
