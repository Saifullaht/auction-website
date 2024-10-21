import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Header from './Components/Header';
import About from './Components/About';
import Home from './Components/Home';
import SignIn from './Auth/SignIn';
import Allproduct from './Components/Allproducts';
import Layout from './Components/Layout';
import UserProfile from './Users/Profile';
import UserProduct from './Users/Products';
import Bids from './Components/Bids';
import UserLayout from './Components/UserLayout';
import Addproducts from './Components/Addproducts';
import Productdetail from './Components/Productdetail';
import { AuthContext } from './Context/AuthContext';

const queryClient = new QueryClient();

const ProtectedRoute = ({ element, user }) => {
  return user?.isLogin ? element : <Navigate to="/SignIn" />;
};

function App() {
  const { user } = useContext(AuthContext);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<ProtectedRoute element={<Home/>} user={user}/>} />
            <Route path="/About" element={ <ProtectedRoute element={<About/>} user={user} />} />
            <Route path="Userproduct/:id" element={<UserProduct />} />
            <Route path="/Allproducts" element={<Allproduct />} />
            <Route path="/Addproducts" element={<ProtectedRoute element={<Addproducts />} user={user} />} />
            <Route path="Allproducts/:id" element={<Productdetail />} />
          </Route>
          <Route path="/User" element={<ProtectedRoute element={<UserLayout />} user={user} />}>
            <Route path="Profile" element={<UserProfile />} />
            <Route path="products" element={<UserProduct />} />
            <Route path="bids" element={<Bids />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
