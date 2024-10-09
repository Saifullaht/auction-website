import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// import { Button, FloatButton } from 'antd';
import Header from './Components/Header';
import About from './Components/About';
import Home from './Components/Home';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SignIn from './Auth/SignIn';
import Product from './Users/Products';
import Allproduct from './Components/Allproducts';
import Layout from './Components/Layout';
import UserProfile from './Users/Profile';
import UserProduct from './Users/Products';
import Bids from './Components/Bids';
import UserLayout from './Components/UserLayout';
import Addproducts from './Components/Addproducts';
import Productdetail from './Components/Productdetail';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="Userproduct/:id" element={< UserProduct/>} />
            <Route path="/Allproducts" element={<Allproduct />} />
            <Route path="/Addproducts" element={< Addproducts />} />
            <Route path="Allproducts/:id" element={<Productdetail/> } />
          </Route>
          <Route path="/User" element={<UserLayout />}>
            <Route path="/UserProfile" element={<UserProfile />} />  
            <Route path="products" element={<UserProduct />} />
            <Route path="Bids" element={<Bids />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
