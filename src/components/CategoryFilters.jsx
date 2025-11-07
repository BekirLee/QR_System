// src/components/CategoryFilters.jsx
import React from "react";
import { Button } from "react-bootstrap";
// STATİK DATANI SİLİRİK: import { categories } from "../data";
import "./../App.css";

// DƏYİŞİKLİK: Props-ları qəbul edirik
const CategoryFilters = ({ 
  categories, 
  activeCategory, 
  onCategoryClick, 
  buttonRefs 
}) => {
  return (
    // Sizin CSS sinfiniz olduğu kimi qalır
    <div className="p-2 category-filter"> 
      <div className="horizontal-scroll-container category-filter-bar"> 
        {/* DƏYİŞİKLİK: Statik data yerinə 'categories' prop-unu map edirik */}
        {categories.map((category) => (
          <Button
            key={category.id}
            // DƏYİŞİKLİK: Ref-i HomeScreen-dən alırıq (avto-scroll üçün)
            ref={(el) => {
              if (el) buttonRefs.current.set(category.id, el);
            }}
            // DƏYİŞİKLİK: Aktiv stili dinamik təyin edirik
            className={
              activeCategory === category.id ? "btnmainlittle" : "btn-light"
            }
            // DƏYİŞİKLİK: Klikləyəndə HomeScreen-dəki funksiyanı çağırırıq
            onClick={() => onCategoryClick(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;