// src/pages/CartScreen.jsx
import React, { useState } from "react";
import { Container, Row, Col, Button, Image, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Dash,
  Trash,
  StarFill,
  CheckCircleFill,
} from "react-bootstrap-icons";
import { useCart } from "../context/CartContext";
import "../assets/css/CartScreen.css";

const EmptyCart = () => (
  <div className="empty-cart-container text-center">
    <div className="gif-placeholder">
      <img
        src="/img/cart.gif"
        alt="Boş səbət"
        className="empty-cart-gif w-100"
      />
    </div>
    <h3 className="mt-4">Səbətiniz Boşdur </h3>
    <p className="text-muted">Başlamaq üçün menyudan məhsullar əlavə edin.</p>
  </div>
);

const OrderSuccess = ({ onReturnToMenu }) => (
  <div className="order-success-container text-center">
    <div className="gif-placeholder-success">
      <img
        src="/img/cartSucces.gif"
        alt="Sifariş tamamlandı"
        className="order-success-gif w-100"
      />
    </div>
    <h2 className="mt-4 fw-bold">Sifarişiniz tamamlandı.</h2>
    <p className="text-muted fs-5">
      Təşəkkür edirik! Qısa zamanda hazır olacaq – nuş olsun!
    </p>
    <Button
      // variant="primary"
      className="w-100 mt-5 btn-order btnmain"
      onClick={onReturnToMenu}
    >
      Menyuya qayıt
    </Button>

    <Link
      to="/review"
      className="btn btn-link w-100 mt-2 text-decoration-none fw-bold"
    >
      Təcrübənizi qiymətləndirin
    </Link>
  </div>
);

const CartList = ({ onOrderComplete }) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
    getCartItemCount,
    getCartSubtotal,
    getServiceFee,
    getCartTotal,
  } = useCart();

  const subtotal = getCartSubtotal();
  const serviceFee = getServiceFee();
  const total = getCartTotal();
  const itemCount = getCartItemCount();

  return (
    <div className="cart-list-container">
      {cart.map((item) => (
        <Row key={item.id} className="cart-item-new align-items-center mb-3">
          <Col xs={4}>
            <Image
              // URL-i HomeScreen-dəki kimi düzəldirik
              src={
                item.img
                  ? `https://tamteam.net/${item.img}`
                  : "/img/image1.png"
              }
              alt={item.name}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </Col>
          <Col xs={8}>
            <h6 className="fw-bold mb-1">{item.name}</h6>
            <div className="d-flex align-items-center text-muted small mb-2">
              <span>
                <i className="bi bi-clock"></i> {item.deliveryTime} dəq
              </span>
              <span className="ms-2">
                <StarFill color="#ffc107" className="me-1" /> {item.rating}
              </span>
            </div>
            <h5 className="fw-bold text-primary mb-3">
              {parseFloat(item.price).toFixed(2)} ₼
            </h5>

            <div className="d-flex align-items-center">
              <Button
                variant="primary"
                className="btn-circle"
                onClick={() => removeFromCart(item.id)}
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
                    stroke="#343434"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
              <span className="mx-3 fs-5 fw-bold">{item.quantity}</span>
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
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 15V5"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>

              <Button
                variant="link"
                className="text-danger ms-auto"
                onClick={() => deleteFromCart(item.id)}
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
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.08331 4.14167L7.26665 3.05001C7.39998 2.25834 7.49998 1.66667 8.90831 1.66667H11.0916C12.5 1.66667 12.6083 2.29167 12.7333 3.05834L12.9166 4.14167"
                    stroke="#FF0039"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.7084 7.61667L15.1667 16.0083C15.075 17.3167 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3167 4.83335 16.0083L4.29169 7.61667"
                    stroke="#FF0039"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.60834 13.75H11.3833"
                    stroke="#FF0039"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.91669 10.4167H12.0834"
                    stroke="#FF0039"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </Col>
        </Row>
      ))}

      <div className="notes-section mt-4">
        <h6 className="fw-bold">Qeydlər</h6>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Məs.: yemək isti gətirilsin"
          className="notes-textarea"
        />
      </div>

      <div className="cart-summary-block mt-4">
        <h6 className="fw-bold mb-3">Məhsulların cəmi: {itemCount}əd.</h6>
        <div className="summary-row">
          <span>Cəmi</span>
          <span>{subtotal.toFixed(2)} ₼</span>
        </div>
        <div className="summary-row">
          <span>Xidmət haqqı (5%)</span>
          <span>{serviceFee.toFixed(2)} ₼</span>
        </div>

        <hr className="my-2" />

        <div className="summary-total">
          <span>Ümumi məbləğ</span>
          <span>{total.toFixed(2)} ₼</span>
        </div>

        <Button
          variant="primary"
          className="w-100 mt-3 btn-order"
          onClick={onOrderComplete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              d="M15.75 2.08782C14.2791 1.23697 12.5714 0.75 10.75 0.75C5.22715 0.75 0.75 5.22715 0.75 10.75C0.75 16.2728 5.22715 20.75 10.75 20.75C16.2728 20.75 20.75 16.2728 20.75 10.75C20.75 10.0651 20.6811 9.39622 20.55 8.75"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M6.75 11.25C6.75 11.25 8.25 11.25 10.25 14.75C10.25 14.75 15.8088 5.58333 20.75 3.75"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Sifarişi tamamla
        </Button>

        <Button
          variant="link"
          className="w-100 mt-2 btn-clear-cart"
          onClick={clearCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
              stroke="#494949"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.78999C5.99999 22 5.90999 20.78 5.79999 19.21L5.14999 9.14001"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.33 16.5H13.66"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.5 12.5H14.5"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>{" "}
          Hamısını təmizlə
        </Button>
      </div>
    </div>
  );
};

const CartScreen = () => {
  const { cart, clearCart } = useCart();
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const navigate = useNavigate();

  const handleOrderComplete = () => {
    clearCart();
    setIsOrderComplete(true);
  };

  const handleReturnToMenu = () => {
    navigate("/");
  };

  const backLink = isOrderComplete ? "/" : "/";

  return (
    <Container fluid className="p-3 cart-screen">
      <div className="cart-header d-flex align-items-center mb-4">
        <Link to={backLink} className="text-dark me-3">
          <ArrowLeft size={24} />
        </Link>
        <h5
          className="mb-0 flex-grow-1 text-center"
          style={{ marginRight: "24px" }}
        >
          Səbətim
        </h5>
      </div>

      {isOrderComplete ? (
        <OrderSuccess onReturnToMenu={handleReturnToMenu} />
      ) : cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <CartList onOrderComplete={handleOrderComplete} />
      )}
    </Container>
  );
};

export default CartScreen;
