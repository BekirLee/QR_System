import React, { useState } from 'react';
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
  Twitter,
  Tiktok
} from "react-bootstrap-icons";
import { useMenu } from "../context/MenuContext"; // 1. Context importu vacibdir

const Profile = () => {
  const { menuData } = useMenu(); // 2. Datanı çağırırıq
  const [isCopied, setIsCopied] = useState(false);

  // 3. Profile datasını çıxarırıq. Əgər hələ yüklənməyibsə, boş obyekt götürürük.
  const profile = menuData?.profile || {};

  // 4. Dəyişənləri təyin edirik (API boşdursa, default dəyərlər görünməsin deyə yoxlayırıq)
  const wifiSSID = profile.wifi_ssid || "Wifi adı yoxdur";
  const wifiPassword = profile.wifi_password || "";
  const restaurantName = profile.restaurant_name || "Restoran";
  const address = profile.address || "";
  const openHours = profile.open_hours || "";
  
  // Logo şəkli
  const logoUrl = profile.logo 
    ? `https://tamteam.net/${profile.logo}` 
    : "https://via.placeholder.com/100x100?text=Logo";

  const handleCopyClick = () => {
    if(wifiPassword) {
      navigator.clipboard.writeText(wifiPassword).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  return (
    <Container className="info-sheet pt-4" style={{paddingBottom: "100px"}}>
      
      <div className="border-0 pb-0 mb-3 text-center">
        
        {/* Logo Hissəsi */}
        <div className="d-flex justify-content-center mb-3">
             <div style={{width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #ddd'}}>
                 <img src={logoUrl} alt="Logo" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
             </div>
        </div>

        <div className="info-sheet-header">
          <h2>{restaurantName}</h2>
          <p className="text-muted mb-0">{profile.about || "Xoş gəlmisiniz!"}</p>
        </div>
      </div>

      <div>
        {/* WiFi Məlumatları - Yalnız Wifi adı varsa göstər */}
        {profile.wifi_ssid && (
          <div className="info-section">
            <div className="info-icon-wrapper">
              <Wifi size={20} />
            </div>
            <div className="info-content w-100">
              <h6>WiFi məlumatları</h6>
              <div className="text-muted small">Şəbəkə</div>
              <div className="fw-bold mb-2">{wifiSSID}</div>
              
              {/* Şifrə varsa göstər */}
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

        {/* Ünvan */}
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

        {/* İş saatları */}
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

        {/* Sosial İkonlar - Yalnız data varsa görünsün */}
        <div className="social-icons-row text-center mt-4 d-flex justify-content-center gap-3 flex-wrap">
          
          {/* Telefon */}
          {profile.phone && (
            <a href={`tel:${profile.phone}`} className="social-icon text-dark">
              <Telephone size={24} />
            </a>
          )}

          {/* Whatsapp - Telefon varsa Whatsapp da aktiv olsun */}
          {profile.phone && (
            <a href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`} className="social-icon whatsapp text-success">
              <Whatsapp size={24} />
            </a>
          )}

          {/* Facebook - Boş deyilsə göstər */}
          {profile.facebook && profile.facebook !== "" && (
            <a href={profile.facebook} className="social-icon facebook text-primary">
              <Facebook size={24} />
            </a>
          )}

          {/* Instagram - Boş deyilsə göstər */}
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
      </div>
    </Container>
  );
}

export default Profile;