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
        const res = await axios.get(`http://localhost:5000/api/items/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const imageUrl = `http://localhost:5000/api/items/image/${product._id}`;

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={imageUrl} alt={product.name} />
      <p><strong>Description:</strong> {product.desc}</p>
      <p><strong>Size:</strong> {product.size}</p>

      {product.variants && product.variants.length > 0 && (
        <>
          <label htmlFor="variant">Select Wood Type:</label>
          <select
            id="variant"
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(Number(e.target.value))}
          >
            {product.variants.map((variant, i) => (
              <option key={i} value={i}>{variant.woodType}</option>
            ))}
          </select>
          <p><strong>Price:</strong> ₹{product.variants[selectedVariant].price}</p>
          <p><strong>Stock:</strong> {product.variants[selectedVariant].stock}</p>
        </>
      )}
    </div>
  );
}

export default ProductDetail;
