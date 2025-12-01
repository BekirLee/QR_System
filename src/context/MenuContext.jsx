import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu mütləq MenuProvider daxilində istifadə olunmalıdır.");
  }
  return context;
};

export const MenuProvider = ({ children }) => {
  const [menuData, setMenuData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [currentRestaurantId, setCurrentRestaurantId] = useState(null);

  const location = useLocation();

  const checkBlockingStatus = (profile) => {
    if (!profile) return false;

    if (String(profile.is_menu_block) === "1") {
      return true;
    }

    if (profile.next_payment_date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const paymentDate = new Date(profile.next_payment_date);

      if (paymentDate < today) {
        return true;
      }
    }

    return false;
  };

  const fetchMenu = useCallback(async (profileId) => {
    if (!profileId) return;

    setIsBlocked(false);
    setStatus("loading");
    setError(null);
    setCurrentRestaurantId(profileId);

    try {
      const response = await axios.get(
        `https://tamteam.net/api/v3/get_menu_list?profileId=${profileId}`
      );

      if (!response.data || (response.data.menu && response.data.menu.length === 0)) {
         throw new Error("Menyu tapılmadı.");
      }

      setMenuData(response.data);

      const blockedStatus = checkBlockingStatus(response.data.profile);
      setIsBlocked(blockedStatus);

      setStatus("succeeded");
    } catch (err) {
      setError(err.message || "Xəta baş verdi");
      setStatus("failed");
      setIsBlocked(false);
    }
  }, []);

  useEffect(() => {
      let profileId = null;
      const path = location.pathname;
      
      if (path.includes("r=")) {
        const parts = path.split("r=");
        if (parts[1]) profileId = parts[1].split("/")[0]; 
      }
      
      if (!profileId) {
        const searchParams = new URLSearchParams(location.search);
        const queryParam = searchParams.get("r");
        if (queryParam) profileId = queryParam;
      }

      if (profileId) {
        localStorage.setItem("restaurantId", profileId);
      } else {
        profileId = localStorage.getItem("restaurantId");
      }
      
      if (!profileId) return;

      if (currentRestaurantId === profileId && menuData) {
          const blocked = checkBlockingStatus(menuData.profile);
          setIsBlocked(blocked);
          return;
      }

      fetchMenu(profileId);

  }, [location.pathname, location.search, fetchMenu, currentRestaurantId, menuData]); 

  const value = {
    menuData,
    status,
    error,
    fetchMenu,
    isBlocked,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};