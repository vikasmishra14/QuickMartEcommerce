import React, { useState, useEffect } from 'react';
import '../index.css';
import { Link, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state

const NavBar = () => {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  // Access products from Redux store
  const products = useSelector((state) => state.products.products); // Get the products from the Redux state
  const { user, loading, error } = useSelector((state) => state.user); // Get the user and loading state from Redux

  // Debounced function to handle search
  const handleSearch = debounce((query) => {
    // Simulate filtering products (you might want to use API for large datasets)
    if (query) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, 2000); // 2 seconds debounce

  // Update search state and trigger debounce search
  const handleInputChange = (e) => {
    setSearch(e.target.value);
    handleSearch(e.target.value); // Trigger debounce
  };

  // Redirect to search results when user clicks "Search" or on a product suggestion
  const handleSearchBtn = () => {
    if (search) {
      navigate(`/search-results?query=${search}`);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/search-results?productId=${product._id}`);
  };

  const handleProfileClick = () => {
    // Navigate to the profile page or any other page you want for user profile
    navigate(`/profile`);
  };

  useEffect(() => {
    if (search === '') {
      setFilteredProducts([]); // Clear suggestions if no search query
    }
  }, [search]);

  // Handle Loading and Error States
  if (loading) {
    return (
      <nav>
        <div>Loading...</div>
      </nav>
    );
  }

  if (error) {
    return (
      <nav>
        <div>Error fetching user data. Please try again later.</div>
      </nav>
    );
  }

  return (
    <nav>
      <div>
        <h1>Travel Website</h1>
      </div>
      <ul className="nav-left">
        <li>
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={handleInputChange}
          />
          <button onClick={handleSearchBtn}>Search</button>
          {/* Display suggestions below the search input */}
          {filteredProducts.length > 0 && (
            <div className="search-suggestions">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="search-suggestion-item"
                  onClick={() => handleProductClick(product)}
                >
                  <img src={product.image} alt={product.name} />
                  <span>{product.name}</span>
                </div>
              ))}
            </div>
          )}
        </li>
      </ul>
      <ul className="nav-right">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        {/* Conditional rendering based on login status */}
        {  
        user ? (
          console.log(user),
          <li>
              <li><Link to="/profile">{user.name}</Link></li>
          </li>
        ) : (
          <li><Link to="/login">LogIn</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
