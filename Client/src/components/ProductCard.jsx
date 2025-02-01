import React, { useState } from 'react';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false); // Track cart status

  const handleAddToCart = async () => {
    setLoading(true);
    try { 
       // Check if token is present in the cookies

      const response = await axios.post("http://localhost:8080/api/cart", {
        productId: product._id,
        quantity: 1,
        
      },
    {
      withCredentials: true,
    });
      console.log(response)
      if (response.status === 200 || response.status===201) {
        setAddedToCart(true);
        alert("Product added to cart successfully");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <img src={product.image} alt="Product" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={handleAddToCart} disabled={loading}>
        {loading ? "Adding..." : "Add to Cart"}
      </button>
      {addedToCart && <p>Product added to cart!</p>}
    </div>
  );
};

export default ProductCard;
