import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import "../assets/css/Footer.css";

const BottomNav = () => {
  const { getCartItemCount } = useCart();
  const { favorites } = useFavorites();
  const location = useLocation();

  const totalItems = getCartItemCount();
  const totalFavorites = favorites.length;

  const searchParams = new URLSearchParams(location.search);
  const businessName = searchParams.get("r");
  console.log(businessName);

  const getLink = (path) => {
    if (!businessName) return path;
    return path.includes("?")
      ? `${path}&r=${businessName}`
      : `${path}?r=${businessName}`;
  };

  return (
    <div className="bottom-nav-container">
      <svg
        className="bottom-nav-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="375"
        height="70"
        viewBox="0 0 375 70"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M244.539 0.00481318C231.971 0.15431 221.059 7.08074 215.388 17.2504C209.472 26.8342 198.778 33.236 186.565 33.236C174.357 33.2358 163.667 26.8384 157.75 17.2601C157.505 16.8196 157.25 16.3847 156.985 15.9567C156.942 15.8796 156.899 15.803 156.856 15.7256L156.839 15.7247C150.959 6.39359 140.522 0.14669 128.593 0.00481318L128.589 0H0V70H375V0H244.543L244.539 0.00481318Z"
          fill="white"
        />
      </svg>

      <nav className="bottom-nav-icons">
        {/* ANA SƏHİFƏ */}
        <Link
          to={getLink("/")}
          className={`bottom-nav-item ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 18V15"
              stroke="#053796"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.07 2.81997L3.14002 8.36997C2.36002 8.98997 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.98997 20.86 8.36997L13.93 2.82997C12.86 1.96997 11.13 1.96997 10.07 2.81997Z"
              stroke="#053796"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {/* SEÇİLMİŞLƏR (FAVORITES) */}
        <Link
          to={getLink("/favorites")}
          className={`bottom-nav-item favoritesBtn ${
            location.pathname === "/favorites" ? "active" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {totalFavorites > 0 && (
            <span className="cart-badge">{totalFavorites}</span>
          )}
        </Link>

        {/* SƏBƏT (CART) */}
        <Link
          to={getLink("/cart")}
          className={`bottom-nav-item cart-btn ${
            location.pathname === "/cart" ? "active" : ""
          }`}
          style={{ background: "#053796" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 8H21"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>

        {/* REVIEW */}
        <Link
          to={getLink("/review")}
          className={`bottom-nav-item ${
            location.pathname === "/review" ? "active" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18.47 16.83L18.86 19.99C18.96 20.82 18.07 21.4 17.36 20.97L13.17 18.48C12.71 18.48 12.26 18.45 11.82 18.39C12.56 17.52 13 16.42 13 15.23C13 12.39 10.54 10.09 7.5 10.09C6.34 10.09 5.27 10.42 4.38 11C4.35 10.75 4.34 10.5 4.34 10.24C4.34 5.68999 8.29 2 13.17 2C18.05 2 22 5.68999 22 10.24C22 12.94 20.61 15.33 18.47 16.83Z"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 15.23C13 16.42 12.56 17.5201 11.82 18.3901C10.83 19.5901 9.26 20.36 7.5 20.36L4.89 21.91C4.45 22.18 3.89 21.81 3.95 21.3L4.2 19.3301C2.86 18.4001 2 16.91 2 15.23C2 13.47 2.94 11.9201 4.38 11.0001C5.27 10.4201 6.34 10.0901 7.5 10.0901C10.54 10.0901 13 12.39 13 15.23Z"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {/* PROFILE */}
        <Link
          to={getLink("/profile")}
          className={`bottom-nav-item ${
            location.pathname === "/profile" ? "active" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.45 10.79 7.56 8.84 7.56 6.44C7.56 3.99 9.54 2 12 2C14.45 2 16.44 3.99 16.44 6.44C16.43 8.84 14.54 10.79 12.16 10.87Z"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.16 14.56C4.74 16.18 4.74 18.82 7.16 20.43C9.91 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.92 12.73 7.16 14.56Z"
              stroke="#B5B5B5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </nav>
    </div>
  );
};

export default BottomNav;
