// src/components/InfoSheet.jsx
import React, { useState } from "react";
import { Offcanvas, Button, InputGroup, FormControl } from "react-bootstrap";
import {
  X,
  Wifi,
  GeoAlt,
  Clock,
  Clipboard,
  ClipboardCheck,
  Telephone,
  Whatsapp,
  Facebook,
  Instagram,
  Twitter,
  Tiktok
} from "react-bootstrap-icons";
import "./../assets/css/Header.css";
import { useMenu } from "../context/MenuContext";

const InfoSheet = ({ show, onHide }) => {
  const { menuData } = useMenu();
  const [isCopied, setIsCopied] = useState(false);

  const profile = menuData?.profile || {};

  const wifiSSID = profile.wifi_ssid || "";
  const wifiPassword = profile.wifi_password || "";
  const restaurantName = profile.restaurant_name || "Restoran";
  const address = profile.address || "";
  const openHours = profile.open_hours || "";

  const handleCopyClick = () => {
    if (wifiPassword) {
      navigator.clipboard.writeText(wifiPassword).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="bottom"
      className="info-sheet"
      style={{maxHeight: '85vh'}}
    >
      <Offcanvas.Header className="border-0 pb-0">
        <div className="info-sheet-header">
          <Offcanvas.Title as="h5">{restaurantName}</Offcanvas.Title>
          <p className="text-muted mb-0">{profile.about || "Xoş gəlmisiniz"}</p>
        </div>
        <button onClick={onHide} className="info-sheet-close-btn">
          <X size={24} />
        </button>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {wifiSSID && (
          <div className="info-section">
            <div className="info-icon-wrapper">
              <Wifi size={20} />
            </div>
            <div className="info-content w-100">
              <h6>WiFi məlumatları</h6>
              <div className="text-muted small">Şəbəkə</div>
              <div className="fw-bold mb-2">{wifiSSID}</div>
              
              {wifiPassword && (
                <>
                  <div className="text-muted small">Şifrə</div>
                  <InputGroup>
                    <FormControl
                      value={wifiPassword}
                      readOnly
                      className="wifi-password-input"
                    />
                    <Button
                      variant="light"
                      onClick={handleCopyClick}
                      className="copy-btn"
                    >
                      {isCopied ? <ClipboardCheck size={20} color="green" /> : <Clipboard size={20} />}
                    </Button>
                  </InputGroup>
                </>
              )}
            </div>
          </div>
        )}

        {address && (
          <div className="info-section">
            <div className="info-icon-wrapper">
              <GeoAlt size={20} />
            </div>
            <div className="info-content">
              <h6>Ünvan</h6>
              <p className="mb-0">
                {address}
              </p>
            </div>
          </div>
        )}

        {openHours && (
          <div className="info-section">
            <div className="info-icon-wrapper">
              <Clock size={20} />
            </div>
            <div className="info-content w-100">
              <h6>İş saatları</h6>
              <div className="d-flex justify-content-between">
                <span>Hər gün</span>
                <span className="fw-bold">{openHours}</span>
              </div>
            </div>
          </div>
        )}

        <div className="social-icons-row text-center mt-4 d-flex justify-content-center gap-3 flex-wrap">
          
          {/* Telefon */}
          {profile.phone && (
            <a href={`tel:${profile.phone}`} className="social-icon text-dark">
              <Telephone size={24} />
            </a>
          )}

          {/* Whatsapp */}
          {profile.phone && (
             <a href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`} className="social-icon whatsapp text-success">
               <Whatsapp size={24} />
             </a>
          )}

          {/* Facebook */}
          {profile.facebook && profile.facebook !== "" && (
            <a href={profile.facebook} className="social-icon facebook text-primary">
              <Facebook size={24} />
            </a>
          )}

          {/* Instagram */}
          {profile.instagram && profile.instagram !== "" && (
            <a href={profile.instagram} className="social-icon instagram text-danger">
              <Instagram size={24} />
            </a>
          )}

          {/* Twitter */}
          {profile.twitter && profile.twitter !== "" && (
             <a href={profile.twitter} className="social-icon text-dark">
               <Twitter size={24} />
             </a>
          )}

          {/* Tiktok */}
          {profile.tiktok && profile.tiktok !== "" && (
             <a href={profile.tiktok} className="social-icon text-dark">
               <Tiktok size={24} />
             </a>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default InfoSheet;