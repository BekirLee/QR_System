// src/components/ProductGrid.jsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductGrid = ({ title, products }) => {
  return (
    <div className="p-2">
      <h5 className="mb-2 fw-bold">{title}</h5>
      <Row>
        {products.map(product => (
          <Col key={product.id} xs={6} className="mb-2">
            <ProductCard product={product} isHorizontal={false} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductGrid;