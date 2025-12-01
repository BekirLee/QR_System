// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { MenuProvider, useMenu } from "./context/MenuContext"; // MenuContext importu

import HomeScreen from "./pages/HomeScreen";
import CartScreen from "./pages/CartScreen";
import ProductDetailScreen from "./pages/ProductDetailScreen";
import ReviewScreen from "./pages/ReviewScreen";
import FavoritesScreen from "./pages/FavoritesScreen";
import Profile from "./pages/Profile";
import BottomNav from "./components/BottomNav";
import "./App.css";
import ServiceBlockScreen from "./pages/ServiceBlockScreen"; // Adını düzgün yoxlayın (ServiceBlockScreen vs ServiceBlockedScreen)

const AppContent = () => {
  const location = useLocation();
  // Context-dən isBlocked-i götürürük
  const { isBlocked, status } = useMenu();

  // Yüklənmə vaxtı (İstəyə görə)
  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (isBlocked) {
    return <ServiceBlockScreen />;
  }

  const showBottomNav = !location.pathname.startsWith("/product/");

  return (
    <div className="mobile-view-wrapper">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/review" element={<ReviewScreen />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="/product/:productId" element={<ProductDetailScreen />} />
      </Routes>

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
