import React, { useState } from "react"; // useState import edildi
import { Card } from "react-bootstrap";
import { Plus, Image as ImageIcon } from "react-bootstrap-icons"; // İkon əlavə etdim (istəyə bağlı)
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product, isHorizontal = false }) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorited } = useFavorites();
  const isItemFavorited = isFavorited(product.id);
  
  // Şəkil xətası üçün state
  const [imgError, setImgError] = useState(false);

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isItemFavorited) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const price = parseFloat(product.price).toFixed(2);

  // Şəkil URL-ini hazırlayırıq
  const imageUrl = `https://tamteam.net/${product.img}`;

  // Şəkil varmı? (Həm API-dan gələn string boş olmamalı, həm də xəta verməməlidir)
  const hasValidImage = product.img && product.img.trim() !== "" && !imgError;

  return (
    <Link to={`/product/${product.id}`} className="text-decoration-none">
      <Card className={`product-card ${isHorizontal ? "product-card-horizontal" : ""}`}>
        <div style={{ position: "relative" }}>
          
          {/* --- ŞƏKİL MƏNTİQİ --- */}
          {hasValidImage ? (
            <Card.Img 
              variant="top" 
              src={imageUrl} 
              alt={product.name}
              onError={() => setImgError(true)} // Əgər şəkil tapılmasa, state dəyişir
              style={{ 
                height: "150px", 
                objectFit: "cover", 
                backgroundColor: "#f0f0f0" // Yüklənənə qədər görünən rəng
              }} 
            />
          ) : (
            // --- BOZ QUTU (PLACEHOLDER) ---
            <div 
              style={{ 
                height: "150px", 
                backgroundColor: "#e9ecef", // Boz rəng (Bootstrap boz tonu)
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderTopLeftRadius: "calc(0.375rem - 1px)",
                borderTopRightRadius: "calc(0.375rem - 1px)",
                color: "#adb5bd"
              }}
            >
              {/* İstəsəniz burada ikon və ya məhsulun baş hərflərini göstərə bilərsiniz */}
               <ImageIcon size={30} /> 
            </div>
          )}

          {/* Ürək İkonu */}
          <div className="heart" onClick={handleFavoriteClick} style={{ position: "absolute", top: "4px", right: "4px", display: "flex", width: "32px", height: "32px", justifyContent: "center", alignItems: "center", borderRadius: "50%", background: "#fff", boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)" }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="15" 
              height="14" 
              viewBox="0 0 15 14" 
              fill={isItemFavorited ? "#FF0000" : "none"} 
              stroke={isItemFavorited ? "#FF0000" : "#949494"}
            >
              <path 
                d="M7.83 12.5567C7.60333 12.6367 7.23 12.6367 7.00333 12.5567C5.07 11.8967 0.75 9.14333 0.75 4.47667C0.75 2.41667 2.41 0.75 4.45667 0.75C5.67 0.75 6.74333 1.33667 7.41667 2.24333C8.09 1.33667 9.17 0.75 10.3767 0.75C12.4233 0.75 14.0833 2.41667 14.0833 4.47667C14.0833 9.14333 9.76333 11.8967 7.83 12.5567Z" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>
        </div>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="product-card-price">{price} ₼</span>
            {!isHorizontal && (
              <button className="add-to-cart-btn" onClick={handleAddToCartClick}>
                <Plus />
              </button>
            )}
          </div>
        </Card.Body>
        {isHorizontal && (
          <button className="add-to-cart-btn" onClick={handleAddToCartClick}>
            <Plus />
          </button>
        )}
      </Card>
    </Link>
  );
};

export default ProductCard;