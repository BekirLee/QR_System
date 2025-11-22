import React, { useState, useEffect, useRef } from "react";
import { Container, Form, InputGroup, Spinner, Alert } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import Header from "../components/Header";
import { useMenu } from "../context/MenuContext";
import CategoryFilters from "../components/CategoryFilters";
import ProductGrid from "../components/ProductGrid";
import "../assets/css/HomeScreen.css";

const HomeScreen = () => {
  const { menuData, status, error } = useMenu();
  const [allCategories, setAllCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const sectionRefs = useRef(new Map());
  const filterButtonRefs = useRef(new Map());
  const scrollDebounceTimer = useRef(null);

  // --- ƏSAS DÜZƏLİŞ BURADA ---
  useEffect(() => {
    // Status 'succeeded' olmalıdır VƏ menuData gəlməlidir
    if (status === "succeeded" && menuData) {
      // 1. Yoxlayırıq: Gələn data Obyektdirmi və içində 'menu' varmı?
      let categories = [];

      if (menuData.menu && Array.isArray(menuData.menu)) {
        // Yeni struktur: { profile: ..., menu: [...] }
        categories = menuData.menu;
      } else if (Array.isArray(menuData)) {
        // Köhnə struktur (əgər birbaşa massiv gəlirsə)
        categories = menuData;
      }

      console.log("HomeScreen Kateqoriyalar:", categories); // Konsolda yoxlayın

      setAllCategories(categories);

      // İlk kateqoriyanı seçirik
      if (categories.length > 0) {
        setActiveCategory(categories[0].id);
      }
    }
  }, [menuData, status]);
  // ---------------------------

  useEffect(() => {
    if (allCategories.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (scrollDebounceTimer.current)
              clearTimeout(scrollDebounceTimer.current);
            const newId = entry.target.dataset.id;

            // Debounce müddətini azaltdıq (daha cəld reaksiya versin)
            scrollDebounceTimer.current = setTimeout(
              () => setActiveCategory(newId),
              50
            );
          }
        });
      },
      {
        // DÜZƏLİŞ BURADA:
        // "-130px" -> Header-in təxmini hündürlüyü qədər yuxarıdan "görməzdən gəlirik"
        // Beləliklə, element Header-in altına girəndə aktiv olur.
        rootMargin: "-130px 0px -60% 0px",
        threshold: 0.05,
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
      if (scrollDebounceTimer.current)
        clearTimeout(scrollDebounceTimer.current);
    };
  }, [allCategories]);

  // Horizontal Scroll Effekti
  useEffect(() => {
    if (!activeCategory) return;
    const button = filterButtonRefs.current.get(activeCategory);
    if (button) {
      button.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeCategory]);

  const scrollToCategory = (id) => {
    if (scrollDebounceTimer.current) clearTimeout(scrollDebounceTimer.current);
    const section = sectionRefs.current.get(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveCategory(id);
  };

  // --- Render Hissəsi ---
  if (status === "loading" || status === "idle") {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </Container>
    );
  }
  if (status === "failed") {
    return (
      <Container className="pt-5">
        <Alert variant="danger">Xəta: {error}</Alert>
      </Container>
    );
  }
  if (allCategories.length === 0) {
    return (
      <Container className="pt-5">
        <Alert variant="warning">Menyu boşdur.</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0 menu-container">
      <Header />

      <div className="p-2">
        <InputGroup>
          <InputGroup.Text>
            <Search />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Axtar..."
            className="border-start-0"
          />
        </InputGroup>
      </div>

      <CategoryFilters
        categories={allCategories}
        activeCategory={activeCategory}
        onCategoryClick={scrollToCategory}
        buttonRefs={filterButtonRefs}
      />

      <div className="product-list-container">
        {allCategories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            data-id={category.id}
            ref={(el) => {
              if (el) sectionRefs.current.set(category.id, el);
            }}
            className="category-section"
          >
            {/* Products massivi kateqoriyanın içindədir */}
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
