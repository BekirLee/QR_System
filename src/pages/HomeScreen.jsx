// src/pages/HomeScreen.jsx
import React from 'react';
import { Container, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import Header from '../components/Header';
import CategoryFilters from '../components/CategoryFilters';
import ProductCarousel from '../components/ProductCarousel';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data'; 

const HomeScreen = () => {
  return (
    <Container fluid className="p-0">
      <Header />

      <div className="p-2">
        <InputGroup>
          <InputGroup.Text>
            <Search />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Axtar və ya təkliflərdən seç..."
            className="border-start-0"
          />
        </InputGroup>
      </div>

      <CategoryFilters />
      
      <hr className='my-0'/>

      <ProductCarousel title="Ən çox sifariş edilənlər" products={products.slice(0, 4)} />

      <ProductGrid title="Səhər yeməyi" products={products} />
      
    </Container>
  );
};

export default HomeScreen;