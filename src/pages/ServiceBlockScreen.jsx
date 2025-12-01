import React from "react";
import { Container, Button } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import "../assets/css/ServiceBlockScreen.css";
import { Helmet } from "react-helmet";
const ServiceBlockScreen = () => {
  return (
    <div className="blocked-screen-wrapper">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blocked - UniPOS</title>
      </Helmet>
      <div className="blocked-content">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-secondary">UniPOS</h2>
        </div>

        <div className="text-center mb-3">
          <div className="lock-icon-container">
            <div className="">
              <img
                src="/img/lockBlock.png"
                alt=""
                style={{ width: "100%", objectFit: "cover", height: "100%" }}
              />
            </div>
            <div className="coins-decoration"></div>
          </div>
        </div>

        <h4 className="fw-bold text-center mb-3">
          “Xidmət müvəqqəti deaktiv edilib.”
        </h4>

        <p className="text-center text-muted mb-4">
          “Ödəniş vaxtı keçdiyi üçün menyu aktiv deyil. Ödəniş etdikdən sonra
          avtomatik bərpa olunacaq.”
        </p>

        {/* <Button
          className="w-100 py-2 mb-3 rounded-pill"
          style={{ backgroundColor: "#103288", border: "none" }}
          onClick={() => window.location.reload()} // Ödənişdən sonra yeniləmək üçün
        >
          Ödənişi bərpa et
        </Button>

        <div className="text-center">
          <button className="btn btn-link text-decoration-none text-muted">
            Dəstək ilə əlaqə saxla
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ServiceBlockScreen;
