import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/Header";
import Footer from "../components/Footer";

const SearchResults = () => {
  const [searchProducts, setSearchProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Fetch products based on the query or productId
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams(location.search);
        const productId = query.get("productId");
        const queryValue = query.get("query");

        // Construct the URL based on the query or productId
        const url = `http://localhost:8080/api/products/q?productId=${productId ? productId : queryValue}`;
        
        // Make the API request to fetch the products
        const response = await axios.get(url);
        setSearchProducts(response.data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);  // Handle error
      }
    };

    fetchData();
  }, [location.search]);  // Triggered whenever location.search changes

  // Perform filtering once searchProducts is updated
  useEffect(() => {
    if (searchProducts.length === 0) return;  // Don't filter if no products are available

    const query = new URLSearchParams(location.search);
    const productId = query.get("productId");
    const queryValue = query.get("query");

    if (productId) {
      // Filter by productId if it's available
      const filtered = searchProducts.filter((product) => product._id === productId); 
      setFilteredProducts(filtered);
    } else if (queryValue) {
      // Filter by search query (name or description)
      const filtered = searchProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(queryValue.toLowerCase()) ||
          product.description.toLowerCase().includes(queryValue.toLowerCase())
      ); 
      setFilteredProducts(filtered);
    }
  }, [searchProducts, location.search]);  // This will run whenever searchProducts or location.search changes

  return (
    <> 
      <h1>Search Results</h1>
      {loading ? (
        <p>Loading...</p> // Show loading state while fetching
      ) : (
        <div className="container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="card"> 
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No products found.</p> // Handle case where no products match the search
          )}
        </div>
      )} 
    </>
  );
};

export default SearchResults;
