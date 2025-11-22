// src/pages/FavoritesScreen.jsx
import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, StarFill, Clock } from "react-bootstrap-icons"; // Clock icon əlavə etdim
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import '../assets/css/CartScreen.css';

const EmptyFavorites = () => (
  <div className="empty-cart-container text-center">
    <div className="gif-placeholder">
      <img src="/img/noFavorites.gif" alt="Boş sevimlilər" className="empty-cart-gif w-100" style={{maxWidth: '300px'}} />
    </div>
    <h3 className="mt-4">Sevimlilər Siyahınız Boşdur</h3>
    <p className="text-muted">Bəyəndiyiniz məhsullar burada görünəcək.</p>
    <Button as={Link} to="/" variant="primary" className="mt-3 btnmain">
      Menyuya Baxın
    </Button>
  </div>
);

const FavoritesList = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  return (
    <div className="cart-list-container">
      {favorites.map((item) => {
        // --- DÜZƏLİŞ 1: Qiyməti rəqəmə çeviririk ---
        const price = parseFloat(item.price).toFixed(2);

        // --- DÜZƏLİŞ 2: Şəkil URL-ini düzəldirik ---
        // API-da sahənin adı 'img'-dir, 'image' deyil. Və tam URL lazımdır.
        const imageUrl = item.img 
          ? `https://tamteam.net/${item.img}` 
          : "https://via.placeholder.com/150"; // Şəkil yoxdursa placeholder

        return (
          <Row key={item.id} className="cart-item-new align-items-center mb-3">
            <Col xs={4}>
              <Image 
                src={imageUrl} 
                fluid 
                rounded 
                style={{ height: '80px', objectFit: 'cover', width: '100%' }} 
              />
            </Col>
            <Col xs={8}>
              <h6 className="fw-bold mb-1">{item.name}</h6>
              
              {/* Reytinq və vaxt (əgər data yoxdursa gizlət və ya default ver) */}
              <div className="d-flex align-items-center text-muted small mb-2">
                {/* API-da deliveryTime yoxdursa, bu sətri silə və ya statik edə bilərsiz */}
                <span>
                  <Clock className="me-1"/> 15-20 dəq
                </span>
                <span className="ms-2">
                  <StarFill color="#ffc107" className="me-1" /> 4.8
                </span>
              </div>

              {/* --- Qiymətin Göstərilməsi --- */}
              <h5 className="fw-bold text-primary mb-3">
                {price} ₼
              </h5>

              <div className="d-flex justify-content-between align-items-center">
                <Button
                  variant="primary"
                  className="btn-circle"
                  onClick={() => addToCart(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M5 10H15"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 15V5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>

                <Button
                  variant="link"
                  className="text-danger ms-auto"
                  onClick={() => removeFromFavorites(item.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M17.5 4.98333C14.725 4.70833 11.9333 4.56667 9.15 4.56667C7.5 4.56667 5.85 4.65 4.2 4.81667L2.5 4.98333"
                      stroke="#FF0039"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.08331 4.14167L7.26665 3.05001C7.39998 2.25834 7.49998 1.66667 8.90831 1.66667H11.0916C12.5 1.66667 12.6083 2.29167 12.7333 3.05834L12.9166 4.14167"
                      stroke="#FF0039"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.7084 7.61667L15.1667 16.0083C15.075 17.3167 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3167 4.83335 16.0083L4.29169 7.61667"
                      stroke="#FF0039"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.60834 13.75H11.3833"
                      stroke="#FF0039"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.91669 10.4167H12.0834"
                      stroke="#FF0039"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

const FavoritesScreen = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <Container fluid className="p-3 cart-screen">
      <div className="cart-header d-flex align-items-center mb-4">
        <Link to="/" className="text-dark me-3">
          <ArrowLeft size={24} />
        </Link>
        <h5
          className="mb-0 flex-grow-1 text-center"
          style={{ marginRight: "24px" }}
        >
          Sevimlilər
        </h5>
      </div>

      {favorites.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <FavoritesList />
      )}
    </Container>
  );
};

export default FavoritesScreen;