import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
const SERVICE_FEE_PERCENTAGE = 0.05;

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const addItemWithQuantity = (product, quantityToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Məhsul varsa, sayını artır
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }

      // Məhsul yoxdursa, yeni məhsul kimi əlavə et
      return [...prevCart, { ...product, quantity: quantityToAdd }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const deleteFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getServiceFee = () => {
    return getCartSubtotal() * SERVICE_FEE_PERCENTAGE;
  };
  const getCartTotal = () => {
    return getCartSubtotal() + getServiceFee();
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
    getCartItemCount,
    getCartSubtotal,
    getServiceFee,
    getCartTotal,
    addItemWithQuantity
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
