import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  ProgressBar,
} from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  StarFill,
  Trash,
  Plus,
  Dash,
  CartFill,
} from "react-bootstrap-icons";
import { useCart } from "../context/CartContext";
import { products } from "../data"; 
import "./../assets/css/ProductDetail.css";
const NutritionInfo = ({ label, value, color }) => (
  <Col className="text-center">
    <ProgressBar
      variant={color}
      now={100}
      className="mb-1"
      style={{ height: "5px" }}
    />
    <span className="fw-bold">{value} q</span>
    <p className="small text-muted">{label}</p>
  </Col>
);

const ProductDetailScreen = () => {
  const { productId } = useParams();
  const { addItemWithQuantity } = useCart(); 
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1); 

  const product = products.find((p) => p.id.toString() === productId);

  if (!product) {
    return (
      <Container className="text-center mt-5">
        <h2>Məhsul tapılmadı</h2>
        <Link to="/">Ana səhifəyə qayıt</Link>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addItemWithQuantity(product, quantity);
    navigate("/cart"); 
  };

  return (
    <div className="product-detail-page">
      <div className="main-header-wrapper">
        <div
          className="detail-header-image"
          style={{ backgroundImage: `url(${product.image})` }}
        >
          <svg
            className="detail-wave-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 375 240"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M2.37162e-10 222.087C165.527 272.265 266.895 198.596 375 222.087C375 158.454 375 0 375 0H2.37162e-10C2.37162e-10 0 -2.96453e-10 191.683 2.37162e-10 222.087Z"
              fill="url(#paint_detail_wave)"
            />
            <defs>
              <linearGradient
                id="paint_detail_wave"
                x1="187.5"
                y1="240"
                x2="187.5"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" stopOpacity="0.5" />
                <stop offset="0.5" stopColor="white" stopOpacity="0.3" />
                <stop offset="1" stopColor="white" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>

          <div className="detail-header-top">
            <Link to="/" className="text-dark">
              <ArrowLeft size={24} />
            </Link>
            <h5 className="mb-0">Detallar</h5>
            <span></span> {/* Başlığı mərkəzdə saxlamaq üçün boş element */}
          </div>
        </div>
      </div>

      <Container className="product-detail-content">
        <h2 className="fw-bold text-center">{product.name}</h2>

        <Row className="my-4">
          <NutritionInfo label="Protein" value={65} color="success" />
          <NutritionInfo label="Yağ" value={35} color="warning" />
          <NutritionInfo label="Karbohidrat" value={15} color="info" />
        </Row>

        <Row className="text-center text-muted small mb-4">
          <Col>
            <i className="bi bi-fire text-danger me-1"></i> 240 Kkal
          </Col>
          <Col>
            <i className="bi bi-clock text-primary me-1"></i>{" "}
            {product.deliveryTime} Dəq
          </Col>
          <Col>
            <StarFill color="#ffc107" className="me-1" /> {product.rating}
          </Col>
        </Row>

        <p>
          Yumşaq və ətirli pancake-lər,üzərinə ərimiş kərə yağı təravətli
          meyvələr, və xüsusi ağcaqayın siropumuz əlavə olunub.
          <a href="#" className="text-decoration-none fw-bold">
            {" "}
            Daha çox
          </a>
        </p>

        <div className="my-4">
          <h5 className="fw-bold">Tərkibi:</h5>
          <p className="text-muted">
            Un, süd, yumurta, kərə yağı, şəkər, ağcaqayın siropu, təzə meyvələr
            (banan, çiyələk, yaban mərsini), vanil ekstraktı, duz.
          </p>
        </div>

        <div className="my-4">
          <h5 className="fw-bold">Allergiya məlumatları:</h5>
          <div>
            <Badge pill bg="danger" className="allergy-badge">
              Süd
            </Badge>
            <Badge pill bg="danger" className="allergy-badge">
              Qlüten
            </Badge>
            <Badge pill bg="danger" className="allergy-badge">
              Yumurta
            </Badge>
            <Badge pill bg="danger" className="allergy-badge">
              Bal
            </Badge>
          </div>
        </div>

        <div className="detail-cart-footer">
          <div className="quantity-selector">
            <Button
              variant="light"
              className="btn-circle"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Dash size={20} />
            </Button>
            <span className="mx-3 fs-5 fw-bold">{quantity}</span>
            <Button
              variant="primary"
              className="btn-circle"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <Plus size={20} />
            </Button>
            <Button variant="link" className="text-danger ms-2">
              <Trash size={20} />
            </Button>
          </div>
          <Button
            className="btn-add-to-cart btnmain"
            onClick={handleAddToCart}
          >
            <CartFill className="me-2" /> Səbətə əlavə et
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailScreen;
