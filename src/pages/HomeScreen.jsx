import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, InputGroup, Spinner, Alert } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import Header from '../components/Header';
import { useMenu } from '../context/MenuContext';
import CategoryFilters from '../components/CategoryFilters';
import ProductGrid from '../components/ProductGrid';
import '../assets/css/HomeScreen.css'; 

const HomeScreen = () => {
  const { menuData, status, error } = useMenu();
  const [allCategories, setAllCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  
  // --- 1. YENİ: Axtarış State-i ---
  const [searchTerm, setSearchTerm] = useState(""); 

  const sectionRefs = useRef(new Map());
  const filterButtonRefs = useRef(new Map());
  const scrollDebounceTimer = useRef(null);

  useEffect(() => {
    if (status === "succeeded" && menuData) {
      let categories = [];
      if (menuData.menu && Array.isArray(menuData.menu)) {
         categories = menuData.menu;
      } else if (Array.isArray(menuData)) {
         categories = menuData;
      }
      setAllCategories(categories);
      
      if (categories.length > 0) {
        setActiveCategory(categories[0].id);
      }
    }
  }, [menuData, status]);

  // --- 2. YENİ: Filtrləmə Məntiqi ---
  // Axtarış sözünə əsasən kateqoriyaları və məhsulları süzürük
  const filteredCategories = allCategories.map(category => {
    // Kateqoriya içindəki məhsulları yoxlayırıq
    const matchingProducts = category.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Məhsullar süzülsə belə, kateqoriya strukturunu qoruyuruq, 
    // amma içindəki 'products' massivini yeniləyirik.
    return {
      ...category,
      products: matchingProducts
    };
  }).filter(category => category.products.length > 0); 
  // Əgər axtarışa uyğun heç bir məhsul yoxdursa, həmin kateqoriyanı gizlədirik.

  // ---------------------------

  useEffect(() => {
    // Burada 'filteredCategories' istifadə etmək daha düzgündür
    if (filteredCategories.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (scrollDebounceTimer.current) clearTimeout(scrollDebounceTimer.current);
            const newId = entry.target.dataset.id;
            scrollDebounceTimer.current = setTimeout(() => setActiveCategory(newId), 50);
          }
        });
      },
      { rootMargin: "-130px 0px -60% 0px", threshold: 0.05 }
    );

    sectionRefs.current.forEach((section) => { if (section) observer.observe(section); });

    return () => {
      observer.disconnect();
      if (scrollDebounceTimer.current) clearTimeout(scrollDebounceTimer.current);
    };
  }, [filteredCategories]); // Dependency dəyişdi

  useEffect(() => {
    if (!activeCategory) return;
    const button = filterButtonRefs.current.get(activeCategory);
    if (button) {
      button.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeCategory]);

  const scrollToCategory = (id) => {
    if (scrollDebounceTimer.current) clearTimeout(scrollDebounceTimer.current);
    const section = sectionRefs.current.get(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveCategory(id);
  };

  if (status === "loading" || status === "idle") {
    return <Container className="d-flex justify-content-center align-items-center vh-100"><Spinner animation="border" /></Container>;
  }
  if (status === "failed") {
    return <Container className="pt-5"><Alert variant="danger">Xəta: {error}</Alert></Container>;
  }
  if (allCategories.length === 0) {
    return <Container className="pt-5"><Alert variant="warning">Menyu boşdur.</Alert></Container>;
  }

  return (
    <Container fluid className="p-0 menu-container">
      <Header />

      <div className="p-2">
        <InputGroup>
          <InputGroup.Text><Search /></InputGroup.Text>
          
          {/* --- 3. YENİ: Input-u State-ə bağlayırıq --- */}
          <Form.Control 
            type="text" 
            placeholder="Axtar..." 
            className="border-start-0"
            value={searchTerm} // Inputun dəyəri state-dən gəlir
            onChange={(e) => setSearchTerm(e.target.value)} // Yazdıqca state yenilənir
          />
        </InputGroup>
      </div>

      {/* Filtrlər də 'filteredCategories' istifadə etməlidir ki, boş kateqoriyalar görünsün */}
      <CategoryFilters 
        categories={filteredCategories}
        activeCategory={activeCategory}
        onCategoryClick={scrollToCategory}
        buttonRefs={filterButtonRefs}
      />
      
      <div className="product-list-container">
        {/* Əgər axtarış nəticəsi yoxdursa mesaj göstər */}
        {filteredCategories.length === 0 && searchTerm !== "" && (
            <div className="text-center mt-5 text-muted">Heç nə tapılmadı.</div>
        )}

        {/* Burada 'allCategories' YOX, 'filteredCategories' istifadə edirik */}
        {filteredCategories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            data-id={category.id}
            ref={(el) => { if (el) sectionRefs.current.set(category.id, el); }}
            className="category-section"
          >
            <ProductGrid 
              title={category.name}
              products={category.products || []} 
            />
          </section>
        ))}
      </div>
    </Container>
  );
};

export default HomeScreen;