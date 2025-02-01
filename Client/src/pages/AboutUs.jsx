 
import { useEffect, useState } from "react";
import axios from "axios";

const AboutUs = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');

  // Fetch the cart when the component mounts
  useEffect(() => {
    fetchCart();
  }, []); // Only run once on mount

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cart', {
        withCredentials: true
      });
      setCart(response.data.products);
    } catch (error) {
      console.error('Error fetching cart', error);
    }
  };

  const handleDel = (productId) => {
    axios.delete(`http://localhost:8080/api/cart/${productId}`, {
      withCredentials: true
    })
      .then((res) => {
        console.log('Deleted');
        setCart(cart.filter(item => item.product._id !== productId)); // Remove item from the cart UI
      });
  };

  const handleChangeQty = async (productId, newQty) => {
    try {
      if (newQty <= 0) return; // Prevent setting quantity to zero or negative
      await axios.put(`http://localhost:8080/api/cart/${productId}`, {
        quantity: newQty
      }, {
        withCredentials: true
      });
      // After updating, refetch the cart to make sure we're in sync with the server
      fetchCart();
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

  return (
    <> 
      <div>
        {/* <h2>total {totalPrice}</h2> */}

        {cart && cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index}>
              <img src={item.product.image} alt="Product" />
              <h2>{item.product.name}</h2>
              <p>{item.product.description}</p>
              <p>{item.product.category}</p>
              <p>{item.product.price} price</p>

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
                disabled={item.quantity >= 5}  // Prevent incrementing above 5, change the condition if needed
              >
                +
              </button>

              <button onClick={() => handleDel(item.product._id)}>Delete</button>
            </div>
          ))
        ) : (
          <div>Cart is empty</div>
        )}
      </div> 
    </>
  );
};

export default AboutUs;
