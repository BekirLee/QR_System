import React from "react";
import { Card } from "react-bootstrap";
import { StarFill, HeartFill, Plus } from "react-bootstrap-icons";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product, isHorizontal = false }) => {
  const { addToCart } = useCart();

  const handleAddToCartClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="text-decoration-none">
      <Card
        className={`product-card ${
          isHorizontal ? "product-card-horizontal" : ""
        }`}
      >
        <div style={{ position: "relative" }}>
          <Card.Img variant="top" src={product.image} />
          <div
            className="heart"
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
              fill="none"
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
          <Card.Title>{product.name}</Card.Title>
          <div className="d-flex justify-content-between align-items-center mb-2 product-card-info">
            <span>
              <i className="bi bi-clock"></i> {product.deliveryTime} dəq
            </span>
            <span>
              <StarFill color="#ffc107" className="me-1" /> {product.rating}
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="product-card-price">
              {product.price.toFixed(2)} ₼
            </span>
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
