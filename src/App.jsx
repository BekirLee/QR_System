// src/App.jsx
import React from "react";
// useLocation əlavə edin
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import HomeScreen from "./pages/HomeScreen";
import CartScreen from "./pages/CartScreen";
import ProductDetailScreen from "./pages/ProductDetailScreen";
import BottomNav from "./components/BottomNav";
import "./App.css";
import ReviewScreen from "./pages/ReviewScreen";
import { FavoritesProvider } from "./context/FavoritesContext";
import FavoritesScreen from "./pages/FavoritesScreen";
import { MenuProvider } from "./context/MenuContext";
import Profile from "./pages/Profile";

const AppContent = () => {
  const location = useLocation();
  const showBottomNav = !location.pathname.startsWith("/product/");

  return (
    <div className="mobile-view-wrapper">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/review" element={<ReviewScreen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="/product/:productId" element={<ProductDetailScreen />} />
      </Routes>

      <BottomNav />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavoritesProvider>
          <MenuProvider>
            <AppContent />
          </MenuProvider>
        </FavoritesProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
