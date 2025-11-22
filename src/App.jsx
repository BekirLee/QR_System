// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { MenuProvider } from "./context/MenuContext";

import HomeScreen from "./pages/HomeScreen";
import CartScreen from "./pages/CartScreen";
import ProductDetailScreen from "./pages/ProductDetailScreen";
import ReviewScreen from "./pages/ReviewScreen";
import FavoritesScreen from "./pages/FavoritesScreen";
import Profile from "./pages/Profile";
import BottomNav from "./components/BottomNav";
import "./App.css";

const AppContent = () => {
  const location = useLocation();

  // BottomNav-ın görünməməsi lazım olan səhifələr
  const hideNavRoutes = ["/product/"]; 
  
  // Əgər hazırkı yol '/product/' ilə başlayırsa, nav-ı gizlət
  const showBottomNav = !location.pathname.startsWith("/product/");

  return (
    <div className="mobile-view-wrapper">
      <Routes>
        {/* 1. Standart Ana Səhifə */}
        <Route path="/" element={<HomeScreen />} />

        {/* 2. YENİ: QR Kodla gələn linklər üçün Route */}
        {/* Bu sətir deyir ki: Link '/r=nəsə' olarsa, yenə HomeScreen açılsın */}
        <Route path="/r=:restaurantName" element={<HomeScreen />} />

        <Route path="/cart" element={<CartScreen />} />
        <Route path="/review" element={<ReviewScreen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="/product/:productId" element={<ProductDetailScreen />} />
      </Routes>

      {/* BottomNav-ı sadəcə showBottomNav true olduqda göstər */}
      {showBottomNav && <BottomNav />}
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