import React, { useState } from 'react';
// Offcanvas və X silindi, yerinə Container əlavə edildi
import { Container, Button, InputGroup, FormControl } from "react-bootstrap";
import {
  Wifi,
  GeoAlt,
  Clock,
  Clipboard,
  ClipboardCheck,
  Telephone,
  Whatsapp,
  Facebook,
  Instagram,
} from "react-bootstrap-icons";

// Komponentin adını səhifə olduğunu bildirəcək şəkildə dəyişdirmək daha yaxşı olar
const Profile = () => {
  const [isCopied, setIsCopied] = useState(false);
  const wifiPassword = "Cafe2024Baku";

  const handleCopyClick = () => {
    navigator.clipboard.writeText(wifiPassword).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    // <Offcanvas...> yerinə <Container...> istifadə edirik
    // "pt-4" yuxarıdan bir az boşluq əlavə edir
    <Container className="info-sheet pt-4">
      
      {/* Offcanvas.Header yerinə sadə bir div */}
      <div className="border-0 pb-0 mb-3">
        <div className="info-sheet-header">
          {/* Offcanvas.Title yerinə <h2> */}
          <h2>Baku Cafe Lounge</h2>
          <p className="text-muted mb-0">Restoran</p>
        </div>
        {/* Bağlama düyməsi (X) buradan silindi */}
      </div>

      {/* Offcanvas.Body yerinə sadə bir div (və ya heç bir şey) */}
      <div>
        {/* WiFi Məlumatları */}
        <div className="info-section">
          <div className="info-icon-wrapper">
            <Wifi size={20} />
          </div>
          <div className="info-content">
            <h6>WiFi məlumatları</h6>
            <div className="text-muted small">Şəbəkə</div>
            <div className="fw-bold mb-2">Baku_Cafe_Guest</div>
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
                {isCopied ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
              </Button>
            </InputGroup>
          </div>
        </div>

        {/* Ünvan */}
        <div className="info-section">
          <div className="info-icon-wrapper">
            <GeoAlt size={20} />
          </div>
          <div className="info-content">
            <h6>Ünvan</h6>
            <p className="mb-0">
              Baku, Azerbaijan 28 May Street, Nizami District
            </p>
          </div>
        </div>

        {/* İş saatları */}
        <div className="info-section">
          <div className="info-icon-wrapper">
            <Clock size={20} />
          </div>
          <div className="info-content">
            <h6>İş saatları</h6>
            <div className="d-flex justify-content-between">
              <span>Bazar ertəsi - Cümə</span>
              <span className="fw-bold">08:00 - 23:00</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Şənbə - Bazar</span>
              <span className="fw-bold">09:00 - 00:00</span>
            </div>
          </div>
        </div>

        {/* Sosial İkonlar */}
        <div className="social-icons-row text-center mt-4">
          <a href="#" className="social-icon">
            <Telephone size={24} />
          </a>
          <a href="#" className="social-icon whatsapp">
            <Whatsapp size={24} />
          </a>
          <a href="#" className="social-icon facebook">
            <Facebook size={24} />
          </a>
          <a href="#" className="social-icon instagram">
            <Instagram size={24} />
          </a>
        </div>
      </div>
    </Container>
  );
}

export default Profile;