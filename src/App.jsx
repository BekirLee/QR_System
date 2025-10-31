// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomeScreen from './pages/HomeScreen';
import CartScreen from './pages/CartScreen';
import BottomNav from './components/BottomNav';
import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="mobile-view-wrapper">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/cart" element={<CartScreen />} />
          </Routes>
          
          <BottomNav />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;