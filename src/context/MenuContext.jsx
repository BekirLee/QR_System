import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu mütləq MenuProvider daxilində istifadə olunmalıdır.");
  }
  return context;
};

export const MenuProvider = ({ children }) => {
  const [menuData, setMenuData] = useState([]);
  const [status, setStatus] = useState("idle"); 
  const [error, setError] = useState(null);

  const PROFILE_ID = "14"; 

  useEffect(() => {
    if (status !== "idle") return;

    const fetchMenuData = async () => {
      setStatus("loading");
      setError(null);
      try {
        const response = await axios.get(
          `https://tamteam.net/api/v1/get_menu_list?profileId=${PROFILE_ID}`
        );
        setMenuData(response.data);
        setStatus("succeeded");
      } catch (err) {
        setError(err.response?.data || err.message);
        setStatus("failed");
      }
    };

    fetchMenuData();
  }, [status]); 

  const value = {
    menuData,
    status,
    error,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};