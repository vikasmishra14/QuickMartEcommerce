import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from './store/userSlice';  // Assuming your Redux slice is here
import Home from './components/Home';
import About from './pages/AboutUs';
import Contact from './pages/ContactUs';
import Login from './pages/LogIn';
import Registration from './pages/Registration';
import SeachResults from './pages/SearchResults';
import Layout from './components/Layout';
import CartPage from './components/CartPage';
import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = document.cookie.split('; ').find(row => row.startsWith('token='));

  if (token) {
    console.log(token.split('=')[1]);  // Logs the value of the 'token' cookie
  } else {
    console.log('Token cookie not found.');
  }
  
  useEffect(() => { 
      // Token is found, make the authentication request
      axios
        .get('http://localhost:8080/api/users/signin', { 
          withCredentials: true,  // Send cookies with the request
        })
        .then((response) => {
          console.log(response.data)
          dispatch(loginSuccess(response.data));  // Store user data in Redux
        })
        .catch((error) => {
          dispatch(loginFailure(error.message));  // Handle login failure
          // Redirect to login page if not authenticated
        });
    
  }, [window.re]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Search-results" element={<SeachResults />} />
        <Route path="/profile" element={<Contact />} />
      </Route>
    </Routes>
  );
};

export default App;
