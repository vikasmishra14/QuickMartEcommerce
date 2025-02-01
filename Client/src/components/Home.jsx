import CategorySelector from './CategorySelector';
import Footer from './Footer';
import NavBar from './Header';
import Product from './Product';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from '../store/productSlice';

const Home = () => {
  const categories = ["all", "Electronics", "Clothes", "Books", "Groceries", "Jewelry", "Toys"];
  const [category, setCategory] = useState("all"); // Added state for category

  const dispatch = useDispatch();

  // Get data from Redux store
  const { products, loading, error } = useSelector((state) => state.products);

  // Fetch products based on the category
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart()); // Dispatch start action

      try {
        const response = await axios.get(`http://localhost:8080/api/products/q?category=${category}`);
        dispatch(fetchProductsSuccess(response.data)); // Dispatch success action
      } catch (error) {
        dispatch(fetchProductsFailure(error.message)); // Dispatch failure action
      }
    };

    fetchProducts();
  }, [category, dispatch]); // The effect depends on the category state

  return (
    <>
      {/* Render the Category Selector */}
      <CategorySelector 
        categories={categories} 
        selectedCategory={category} 
        setSelectedCategory={setCategory} 
      />

      {/* Display loading state */}
      {loading && <p>Loading...</p>}

      {/* Display error message if any */}
      {error && <p>Error: {error}</p>}

      {/* Render the Products */}
      <Product products={products} />
 
    </>
  );
};

export default Home;
