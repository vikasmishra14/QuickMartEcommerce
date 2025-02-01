import './App.css'; // Import the CSS file for styling
import React from 'react'; // Import the React library
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom'; // Import the Router and Route components from the react-router-dom library
import About from './pages/AboutUs';
import Contact from './pages/ContactUs';
import Login from './pages/LogIn';
import Registration from './pages/Registration';
import SeachResults from './pages/SearchResults';
import Layout from './components/Layout';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
        <Route path="/" element={<Home/>} /> 
        <Route path="/About" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Registration" element={<Registration/>}/>
        <Route path="/Search-results" element={<SeachResults/>}/>
        <Route path="/profile" element={<Contact/>}/>
        </Route>
      </Routes>   
    </>
  );
};

export default App;
