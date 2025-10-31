// src/components/CategoryFilters.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { categories } from '../data'; 

const CategoryFilters = () => {
  return (
    <div className="p-2 category-filter">
      <div className="horizontal-scroll-container">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={index === 0 ? 'primary' : 'light'} 
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;