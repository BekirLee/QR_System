// src/components/CategoryFilters.jsx
import React from "react";
import { Button } from "react-bootstrap";
import { categories } from "../data";
import "./../App.css";
const CategoryFilters = () => {
  return (
    <div className="p-2 category-filter">
      <div className="horizontal-scroll-container">
        {categories.map((category, index) => (
          <Button
            key={index}
            // variant={index === 0 ? 'btnmain' : 'light'}
            className={index == 0 ? "btnmainlittle" : "btn-light"}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;
