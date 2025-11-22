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

  // Cari restoran ID-sini yaddaşda saxlayırıq ki, müqayisə edə bilək
  const [currentRestaurantId, setCurrentRestaurantId] = useState(null);

  const location = useLocation();

  // 1. fetchMenu funksiyası (Dəyişmədi, amma status yoxlaması əlavə etdik)
  const fetchMenu = useCallback(async (profileId) => {
    if (!profileId) return;

    setStatus("loading");
    setError(null);
    setCurrentRestaurantId(profileId); // Hazırkı ID-ni qeyd edirik

    try {
      // console.log("API Sorğusu gedir:", profileId); // Test üçün
      const response = await axios.get(
        `https://tamteam.net/api/v3/get_menu_list?profileId=${profileId}`
      );

      if (!response.data || (response.data.menu && response.data.menu.length === 0)) {
         throw new Error("Menyu tapılmadı.");
      }

      setMenuData(response.data);
      setStatus("succeeded");
    } catch (err) {
      console.error("API Xətası:", err);
      setError(err.message || "Xəta baş verdi");
      setStatus("failed");
    }
  }, []);

  // 2. URL Dəyişəndə işləyən hissə
  useEffect(() => {
      let profileId = null;
      const path = location.pathname;
      
      // URL-dən ID-ni tapırıq
      if (path.includes("r=")) {
        const parts = path.split("r=");
        if (parts[1]) profileId = parts[1].split("/")[0]; 
      }
      
      if (!profileId) {
        const searchParams = new URLSearchParams(location.search);
        const queryParam = searchParams.get("r");
        if (queryParam) profileId = queryParam;
      }

      // LocalStorage məntiqi
      if (profileId) {
        localStorage.setItem("restaurantId", profileId);
      } else {
        profileId = localStorage.getItem("restaurantId");
      }

      // --- SONSUZ DÖVRƏNİN QARŞISINI ALAN HİSSƏ ---
      
      // 1. Əgər ID yoxdursa, heç nə etmə
      if (!profileId) return;

      // 2. Əgər artıq bu restoranın datası yüklənibsə (və status 'loading' deyilsə),
      // təkrar sorğu göndərmə!
      if (currentRestaurantId === profileId && menuData) {
          return;
      }

      // Sorğunu göndər
      fetchMenu(profileId);

  // DİQQƏT: Dependency array-də sadəcə location.pathname və location.search qaldı.
  // menuData-nı buradan sildik!
  }, [location.pathname, location.search]); 

  const value = {
    menuData,
    status,
    error,
    fetchMenu,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};