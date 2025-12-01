import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  ProgressBar,
  Spinner,
  Alert,
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
import { useMenu } from "../context/MenuContext";
import "./../assets/css/ProductDetail.css"; // CSS faylınız (App.css-dən ayrıdırsa)
import { Helmet } from "react-helmet";

// ... NutritionInfo komponenti olduğu kimi qalır ...
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
  // ... Bütün React hook-ları (useParams, useState, useEffect) olduğu kimi qalır ...
  const { productId } = useParams();
  const { addItemWithQuantity } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { menuData, status } = useMenu();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const fullDescription =
    "Yumşaq və ətirli pancake-lər, üzərinə ərimiş kərə yağı, təravətli meyvələr, və xüsusi ağcaqayın siropumuz əlavə olunub.\nBu, günə başlamaq üçün mükəmməl bir yoldur və sizə enerji verəcək. Hər bir loxma sizi sevindirəcək və gününüzü daha da gözəlləşdirəcək.";

  // Neçə simvoldan sonra qısaldılacağını təyin edirik
  const TRUNCATE_LENGTH = 120;

  // Düyməyə kliklədikdə state-i dəyişən funksiya
  const toggleExpanded = (e) => {
    e.preventDefault(); // a tag-inin səhifəni yeniləməsinin qarşısını alır
    setIsExpanded(!isExpanded);
  };

  // Göstəriləcək mətni təyin edirik
  const displayedText = isExpanded
    ? fullDescription
    : `${fullDescription.substring(0, TRUNCATE_LENGTH)}...`;

  useEffect(() => {
    // 1. Status 'succeeded' olmalıdır və menuData mövcud olmalıdır
    if (status === "succeeded" && menuData) {
      // 2. Kateqoriyaları düzgün yerdən götürürük
      let categories = [];
      if (menuData.menu && Array.isArray(menuData.menu)) {
        categories = menuData.menu;
      } else if (Array.isArray(menuData)) {
        categories = menuData;
      }

      // 3. Məhsulu axtarırıq
      let foundProduct = null;

      // Bütün kateqoriyaları gəzirik
      for (const category of categories) {
        if (category.products && Array.isArray(category.products)) {
          // ID-ləri string kimi müqayisə edirik (təhlükəsizlik üçün)
          const product = category.products.find(
            (p) => String(p.id) === String(productId)
          );
          if (product) {
            foundProduct = product;
            break; // Tapdıqsa dövrü dayandırırıq
          }
        }
      }

      setProduct(foundProduct);
      setLoading(false); // Yüklənməni dayandır
    } else if (status === "failed") {
      setLoading(false);
    }
  }, [status, menuData, productId]);

  const [showInfo, setShowInfo] = useState(false);

  const handleShowInfo = () => setShowInfo(true);

  // ... Yüklənmə və "Məhsul tapılmadı" hissələri olduğu kimi qalır ...
  if (loading || status === "loading") {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </Container>
    );
  }
  if (!product) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">Məhsul tapılmadı.</Alert>
        <Link to="/" className="btn btn-primary">
          Ana səhifəyə qayıt
        </Link>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addItemWithQuantity(product, quantity);
    navigate("/cart");
  };

  const imageUrl =
    product && product.img && product.img.trim() !== ""
      ? `https://tamteam.net/${product.img}`
      : "/img/image1.png";

  return (
    <div className="product-detail-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Details - UniPOS</title>
      </Helmet>
      <div className="main-header-wrapper">
        <div
          className="detail-header-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <svg
            className="header-wave-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 375 240"
            fill="none"
            preserveAspectRatio="none"
            onClick={handleShowInfo} // --- KLİK HADİSƏSİ ƏLAVƏ EDİLDİ ---
            style={{ cursor: "pointer" }}
          >
            <path
              d="M2.37162e-10 222.087C165.527 272.265 266.895 198.596 375 222.087C375 158.454 375 0 375 0H2.37162e-10C2.37162e-10 0 -2.96453e-10 191.683 2.37162e-10 222.087Z"
              fill="url(#paint0_linear_2822_7033)"
            />
            <defs>
              {/* <linearGradient
              id="paint0_linear_2822_7033"
              x1="187.5"
              y1="240"
              x2="187.5"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#5b3a29" stopOpacity="0.5" />{" "}
              <stop offset="0.5" stopColor="#5b3a29" stopOpacity="0.3" />
              <stop offset="1" stopColor="#5b3a29" stopOpacity="0.7" />
            </linearGradient> */}
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

        {/* QEYD: Bu datalar (Nutrition, Kkal, Time, Rating) sizin API-dən gəlmir.
          Ona görə də mən onları statik olaraq saxlayıram. 
          Əgər API-dən gəlsəydi, 'product.rating' kimi istifadə etmək olardı.
        */}

        {/* <Row className="my-4">
          <NutritionInfo label="Protein" value={65} color="success" />
          <NutritionInfo label="Yağ" value={35} color="warning" />
          <NutritionInfo label="Karbohidrat" value={15} color="info" />
        </Row>

        <Row className="text-center text-muted small mb-4">
          <Col>
            <i className="bi bi-fire text-danger me-1"></i> 240 Kkal
          </Col>
          <Col>
            <i className="bi bi-clock text-primary me-1"></i>
            {product.deliveryTime || "20-30"} Dəq
          </Col>
          <Col>
            <StarFill color="#ffc107" className="me-1" />
            {product.rating || "4.5"}
          </Col>
        </Row> */}

        {/* <div className="my-4">
          <h5 className="fw-bold">Təsvir:</h5>
    
          <p className="text-muted" style={{ whiteSpace: "pre-line" }}>
            {displayedText}

            {fullDescription.length > TRUNCATE_LENGTH && (
              <a
                href="#"
                className="text-decoration-none fw-bold ms-1"
                onClick={toggleExpanded}
              >
                {isExpanded ? "Daha az" : "Daha çox"}
              </a>
            )}
          </p>
        </div> */}

        {/* ... Tərkibi və Allergiya məlumatları olduğu kimi qalır ... */}
        {product.ingredient && product.ingredient.trim() !== "" && (
          <div className="my-4">
            <h5 className="fw-bold">Tərkibi:</h5>
            <p className="text-muted">{product.ingredient}</p>
          </div>
        )}

        {/* <div className="my-4">
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
        </div> */}

        {/* Səbətə əlavə etmə hissəsi olduğu kimi qalır */}
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
          <Button className="btn-add-to-cart btnmain" onClick={handleAddToCart}>
            <CartFill className="me-2" /> Səbətə əlavə et
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailScreen;
