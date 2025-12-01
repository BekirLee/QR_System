import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import {
  Wifi,
  Bell,
  HeartFill,
  StarFill,
  PersonFill,
} from "react-bootstrap-icons";
import { useMenu } from "../context/MenuContext"; 
import "./../assets/css/Header.css";
import InfoSheet from "./InfoSheet";

const Header = () => {
  const [showInfo, setShowInfo] = useState(false);
  const { menuData } = useMenu(); 

  const handleShowInfo = () => setShowInfo(true);
  const handleCloseInfo = () => setShowInfo(false);

  const profile = menuData?.profile || {};

  const headerBgImage =
    profile.background_img && profile.background_img.trim() !== ""
      ? `https://tamteam.net/${profile.background_img}` 
      : "/img/image1.png";


  const bgImage =
    profile.background_img && profile.background_img !== ""
      ? `https://tamteam.net/${profile.background_img}`
      : "/img/image1.png";

  const logoUrl =
    profile.logo && profile.logo !== ""
      ? `https://tamteam.net/${profile.logo}`
      : null;

  const restaurantName = profile.restaurant_name || "Yüklənir...";
  const address = profile.address || "";
  const serviceFee = profile.service_fee || "0";

  useEffect(() => {
    if (restaurantName) {
      document.title = restaurantName + " - UniPOS";
    }
  }, [restaurantName]);

  return (
    <div className="main-header-wrapper">
      <div
        className="header-background-image"
        style={{ backgroundImage: `url('${headerBgImage}')` }} 
      >
        <svg
          className="header-wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 375 240"
          fill="none"
          preserveAspectRatio="none"
          onClick={handleShowInfo}
          style={{ cursor: "pointer" }}
        >
          {/* SVG kodları eyni qalır */}
          <path
            d="M2.37162e-10 222.087C165.527 272.265 266.895 198.596 375 222.087C375 158.454 375 0 375 0H2.37162e-10C2.37162e-10 0 -2.96453e-10 191.683 2.37162e-10 222.087Z"
            fill="url(#paint0_linear_2822_7033)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2822_7033"
              x1="187.5"
              y1="240"
              x2="187.5"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#5b3a29" stopOpacity="0.5" />
              <stop offset="0.5" stopColor="#5b3a29" stopOpacity="0.3" />
              <stop offset="1" stopColor="#5b3a29" stopOpacity="0.7" />
            </linearGradient>
          </defs>
        </svg>

        <div className="header-content-top">
          <div style={{ width: "24px" }}></div>
          <div className="d-flex align-items-center">
            <Wifi size={20} className="me-3" onClick={handleShowInfo} />
            <Bell size={20} className="me-3" />
            {/* Bayraq və ya Dil seçimi hissəsi burda qalır */}
            <div className="flag">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_2821_7072)">
                  <rect width="24" height="24" rx="12" fill="#509E2F" />
                  <path d="M-12 0H36V16H-12V0Z" fill="#EF3340" />
                  <path d="M-12 0H36V8H-12V0Z" fill="#00B5E2" />
                  <path
                    d="M10.8 15.6C12.7882 15.6 14.4 13.9882 14.4 12C14.4 10.0118 12.7882 8.39999 10.8 8.39999C8.81176 8.39999 7.19998 10.0118 7.19998 12C7.19998 13.9882 8.81176 15.6 10.8 15.6Z"
                    fill="white"
                  />
                  <path
                    d="M11.6 15C13.2569 15 14.6 13.6569 14.6 12C14.6 10.3431 13.2569 9 11.6 9C9.94315 9 8.60001 10.3431 8.60001 12C8.60001 13.6569 9.94315 15 11.6 15Z"
                    fill="#EF3340"
                  />
                  <path
                    d="M14.8 10L15.1827 11.0761L16.2142 10.5858L15.7239 11.6173L16.8 12L15.7239 12.3827L16.2142 13.4142L15.1827 12.9239L14.8 14L14.4173 12.9239L13.3858 13.4142L13.8761 12.3827L12.8 12L13.8761 11.6173L13.3858 10.5858L14.4173 11.0761L14.8 10Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2821_7072">
                    <rect width="24" height="24" rx="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* 4. Dinamik Logo */}
        <div className="cafe-logo-container">
          <div className="cafe-logo-circle" style={{ overflow: "hidden" }}>
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              // Logo yoxdursa default icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M16.6667 3.33334V6.66667"
                  stroke="white"
                  strokeWidth="3.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23.3333 3.33334V6.66667"
                  stroke="white"
                  strokeWidth="3.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M26.6667 13.3333C27.1087 13.3333 27.5326 13.5089 27.8452 13.8215C28.1577 14.1341 28.3333 14.558 28.3333 15V28.3333C28.3333 30.1014 27.631 31.7971 26.3807 33.0474C25.1305 34.2976 23.4348 35 21.6667 35H11.6667C9.89856 35 8.20286 34.2976 6.95262 33.0474C5.70238 31.7971 5 30.1014 5 28.3333V15C5 14.558 5.17559 14.1341 5.48816 13.8215C5.80072 13.5089 6.22464 13.3333 6.66667 13.3333H30C31.7681 13.3333 33.4638 14.0357 34.714 15.286C35.9643 16.5362 36.6667 18.2319 36.6667 20C36.6667 21.7681 35.9643 23.4638 34.714 24.714C33.4638 25.9643 31.7681 26.6667 30 26.6667H28.3333"
                  stroke="white"
                  strokeWidth="3.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 3.33334V6.66667"
                  stroke="white"
                  strokeWidth="3.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* 5. Dinamik Mətnlər */}
      <div className="header-content-bottom">
        <h1 className="cafe-name">{restaurantName}</h1>
        <p className="cafe-type">Ünvan:  {address ? `${address}` : ""}</p>
        {/*         
        <div className="d-flex align-items-center justify-content-center flex-wrap gap-2 mt-2">
          <div className="d-flex align-items-center rating-info">
            <StarFill color="#ffc107" className="me-1" /> 4.8 (30+ rəy)
          </div>
          <span className="info-divider">•</span>
          <div className="d-flex align-items-center like-info">
            <HeartFill color="#fd4b4b" className="me-1" /> 1.2k bəyənmə
          </div>
        </div> */}

        {/* Service Fee varsa göstər */}
        {Number(serviceFee) > 0 && (
          <div className="service-fee mt-2">
            <PersonFill className="me-1" /> Xidmət haqqı: {serviceFee}%
          </div>
        )}
      </div>
      <InfoSheet show={showInfo} onHide={handleCloseInfo} />
    </div>
  );
};

export default Header;
