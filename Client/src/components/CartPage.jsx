import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react'; 
import { useDispatch, useSelector } from "react-redux";
import { getCartStart, getCartSuccess, getCartError } from "../store/cartSlice";
import './CartPage.css'
const CartPage = () => {
  const [totalPrice, setTotalPrice] = useState(0); // Start with 0, as a number.

  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user); // User state

  useEffect(() => {
    if (user) {
      fetchCart(); // Fetch cart only if the user is logged in
    }
  }, [user]); // Run once when the user is available

  const fetchCart = async () => {
    try {
      dispatch(getCartStart());
      const response = await axios.get('http://localhost:8080/api/cart', { withCredentials: true });
      if (response.data && Array.isArray(response.data.products)) {
        dispatch(getCartSuccess(response.data.products));
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      dispatch(getCartError(error.message));
    }
  };

  const handleDel = (productId) => {
    axios.delete(`http://localhost:8080/api/cart/${productId}`, { withCredentials: true })
      .then(() => {
        if (cart) {
          setCart(cart.filter(item => item.product._id !== productId)); // Remove item from the cart UI
        }
      });
  };

  const handleChangeQty = async (productId, newQty) => {
    try {
      if (newQty <= 0) return; // Prevent setting quantity to zero or negative
      await axios.put(`http://localhost:8080/api/cart/${productId}`, { quantity: newQty }, { withCredentials: true });
      fetchCart(); // Refetch the cart to make sure we're in sync with the server
    } catch (err) {
      console.error("Error updating quantity", err);
    }
  };

  const handleQuantityUp = async (productId, currentQty) => {
    const newQty = currentQty + 1; // Increment by 1
    await handleChangeQty(productId, newQty);
  };

  const handleQuantityDown = async (productId, currentQty) => {
    if (currentQty > 1) { // Prevent decrementing below 1
      const newQty = currentQty - 1;
      await handleChangeQty(productId, newQty);
    }
  };

  const handleInputChange = async (productId, value) => {
    const newQty = parseInt(value);
    if (newQty > 0) {
      await handleChangeQty(productId, newQty);
    }
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      // Calculate the total price and ensure it's a number.
      const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      setTotalPrice(total); // Store the total price as a number.
    }
  }, [cart]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <h3>{error.message}</h3>;
  }

  if (!user) {
    return <div className="cart-page">Please login to view your cart.</div>; // Message if user is not logged in
  }

  return (
    <> 
      <div className="cart-page">
        <h2>Total: ${totalPrice.toFixed(2)}</h2> {/* Now it is guaranteed to be a number */}

        {cart && cart.length > 0 ? (
          cart.map((item, index) => ( 
            <div key={index} className="cart-item">
              <img src={item.product.image} alt="Product" className="product-image" />
              <h2>{item.product.name}</h2>
              <p>{item.product.description}</p>
              <p>{item.product.category}</p>
              <p>${item.product.price} each</p>

              <div className="quantity-controls">
                <button 
                  className="quantity-down" 
                  onClick={() => handleQuantityDown(item.product._id, item.quantity)} 
                  disabled={item.quantity <= 1}
                >
                  -
                </button>

                <input 
                  type="number" 
                  name="quantity" 
                  value={item.quantity} 
                  onChange={(e) => handleInputChange(item.product._id, e.target.value)}
                  min="1"
                />

                <button 
                  className="quantity-up"
                  onClick={() => handleQuantityUp(item.product._id, item.quantity)} 
                  disabled={item.quantity >= 5} 
                >
                  +
                </button>
              </div>

              <button className="delete-button" onClick={() => handleDel(item.product._id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <div>Cart is empty</div>
        )}
      </div> 
    </>
  );
};

export default CartPage;
