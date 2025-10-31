// src/components/ProductCarousel.jsx
import React from 'react';
import ProductCard from './ProductCard';

const ProductCarousel = ({ title, products }) => {
  return (
    <div className="p-2">
      <h5 className="mb-2 fw-bold">{title}</h5>
      <div className="horizontal-scroll-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} isHorizontal={true} />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;