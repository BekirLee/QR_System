// src/components/ProductCard.jsx
import React from "react";
import { Card } from "react-bootstrap";
import { StarFill, HeartFill, Plus } from "react-bootstrap-icons";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

// Dəyişiklik yoxdur, olduğu kimi qalır
const ProductCard = ({ product, isHorizontal = false }) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorited } = useFavorites();
  const isItemFavorited = isFavorited(product.id);

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

  // ----- DƏYİŞİKLİKLƏR BURADADIR -----

  // 1. API-dən gələn 'img' istifadə edirik və tam URL yaradırıq
  //    Şəkil yoxdursa, ehtiyat üçün bir şəkil yolu (placeholder) qoyun
  const imageUrl = product.img
    ? `https://tamteam.net/${product.img}`
    : "https://via.placeholder.com/150"; // Ehtiyat şəkil

  // 2. API-dən gələn qiymət string-dir, onu rəqəmə çeviririk
  const price = parseFloat(product.price).toFixed(2);

  // 3. API-dən gəlməyən dataları (rating, deliveryTime)
  //    ya gizlədirik, ya da müvəqqəti data veririk. Mən gizlətdim.

  return (
    <Link to={`/product/${product.id}`} className="text-decoration-none">
      <Card
        className={`product-card ${
          isHorizontal ? "product-card-horizontal" : ""
        }`}
      >
        <div style={{ position: "relative" }}>
          {/* DƏYİŞİKLİK: product.image -> imageUrl */}
          <Card.Img variant="top" src={imageUrl} />

          {/* 'Heart' ikonu olduğu kimi qalır */}
          <div
            className="heart"
            onClick={handleFavoriteClick}
            style={{
              position: "absolute",
              top: "4px",
              right: "4px",
              display: "flex",
              width: "32px",
              height: "32px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "26843500px",
              background: "#fff",

              boxShadow: "0 2px 4px 0 rgba(62, 52, 69, 0.08)",
            }}
          >
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
                stroke="#949494"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <Card.Body>
          {/* DƏYİŞİKLİK: product.name olduğu kimi qalır */}
          <Card.Title>{product.name}</Card.Title>

          {/* DƏYİŞİKLİK: 'deliveryTime' və 'rating' olan hissəni gizlətdim
              Çünki bu data API-dən gəlmir.
          */}
          {/* <div className="d-flex justify-content-between align-items-center mb-2 product-card-info">
            <span>
              <i className="bi bi-clock"></i> {product.deliveryTime} dəq
            </span>
            <span>
              <StarFill color="#ffc107" className="me-1" /> {product.rating}
            </span>
          </div> 
          */}

          <div className="d-flex justify-content-between align-items-center mt-2">
            {/* DƏYİŞİKLİK: product.price -> price (formatlanmış) */}
            <span className="product-card-price">{price} ₼</span>
            {!isHorizontal && (
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCartClick}
              >
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
