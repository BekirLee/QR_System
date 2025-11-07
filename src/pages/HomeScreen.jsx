import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import Header from '../components/Header';
import { useMenu } from '../context/MenuContext'; // Context-i import edirik
import '../assets/css/HomeScreen.css'; // Mütləq CSS faylını import edin

// Sizin komponentləri import edirik
import CategoryFilters from '../components/CategoryFilters';
import ProductGrid from '../components/ProductGrid';

const HomeScreen = () => {
  // 1. Data və Statusu Context-dən alırıq
  const { menuData, status, error } = useMenu();

  // 2. Daxili State-lər (Kateqoriyalar, Aktiv Kateqoriya)
  const [allCategories, setAllCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  // 3. Referanslar (Ref-lər)
  const sectionRefs = useRef(new Map()); // Məhsul section-ları üçün
  const filterButtonRefs = useRef(new Map()); // Filter düymələri üçün
  const scrollDebounceTimer = useRef(null); // Scroll-u gözlətmək (debounce) üçün

  // 4. API Datasını Emal edən Effekt (data gələndə)
  useEffect(() => {
    if (status === "succeeded" && menuData && menuData.length > 0) {
      // İç-içə datanı düz bir massivə çeviririk
      const flattenedCategories = menuData.flatMap(
        (mainCategory) => mainCategory.categories
      );
      setAllCategories(flattenedCategories);
      
      // İlkin aktiv kateqoriyanı təyin edirik
      if (flattenedCategories.length > 0) {
        setActiveCategory(flattenedCategories[0].id);
      }
    }
  }, [menuData, status]);

  // 5. Vertikal Scroll-u İzləyən Effekt (IntersectionObserver + Debounce)
  useEffect(() => {
    if (allCategories.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // "Atma" probleminin qarşısını almaq üçün debounce
            if (scrollDebounceTimer.current) {
              clearTimeout(scrollDebounceTimer.current);
            }

            const newActiveCategoryId = entry.target.dataset.id;
            
            // Aktiv kateqoriyanı 150ms gecikmə ilə təyin et
            scrollDebounceTimer.current = setTimeout(() => {
              setActiveCategory(newActiveCategoryId);
            }, 150);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0.1 } // Ekranın yuxarı hissəsi
    );

    sectionRefs.current.forEach((section) => { if (section) observer.observe(section); });

    // Təmizləmə funksiyası
    return () => {
      observer.disconnect();
      if (scrollDebounceTimer.current) {
        clearTimeout(scrollDebounceTimer.current);
      }
    };
  }, [allCategories]); // Yalnız kateqoriyalar yükləndikdə qurulsun

  // 6. Horizontal Filter Barını Hərəkət etdirən Effekt
  // Bu, 'activeCategory' (gecikmə ilə) dəyişdikdə işə düşür
  useEffect(() => {
    if (!activeCategory) return; 

    const button = filterButtonRefs.current.get(activeCategory);
    if (button) {
      // Düyməni horizontal olaraq mərkəzə gətir
      button.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeCategory]); // Debounce ilə təyin olunan 'activeCategory'-ni izləyir

  // 7. Düyməyə Klikləmə Funksiyası (Gecikmə OLMADAN)
  const scrollToCategory = (id) => {
    // Gözləmədə olan timer varsa ləğv et
    if (scrollDebounceTimer.current) {
      clearTimeout(scrollDebounceTimer.current);
    }
    
    // 1. Səhifəni həmin kateqoriyaya (vertikal) scroll et
    const section = sectionRefs.current.get(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    
    // 2. State-i dərhal dəyiş (Bu, 6-cı effekti də dərhal işə salacaq)
    setActiveCategory(id); 
  };

  // 8. Yüklənmə və Xəta Göstəriciləri
  if (status === "loading" || status === "idle") {
    return <Container className="d-flex justify-content-center align-items-center vh-100"><div>Yüklənir...</div></Container>;
  }
  if (status === "failed") {
    return <Container className="pt-5"><div>Xəta baş verdi: {error}</div></Container>;
  }

  // 9. Render (JSX)
  return (
    <Container fluid className="p-0 menu-container">
      <Header />

      {/* Axtarış Qutusu */}
      <div className="p-2">
        <InputGroup>
          <InputGroup.Text><Search /></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Axtar və ya təkliflərdən seç..."
            className="border-start-0"
          />
        </InputGroup>
      </div>

      {/* Dinamik Kateqoriya Filteri (Sticky) */}
      <CategoryFilters 
        categories={allCategories}
        activeCategory={activeCategory}
        onCategoryClick={scrollToCategory}
        buttonRefs={filterButtonRefs}
      />
      
      {/* Dinamik Məhsul Siyahısı */}
      <div className="product-list-container">
        {allCategories.map((category) => (
          <section
            key={category.id}
            id={category.id} // Kliklə scroll üçün
            data-id={category.id} // Observer-in oxuması üçün
            ref={(el) => { // Section ref-lərini yığır
              if (el) sectionRefs.current.set(category.id, el);
            }}
            className="category-section" // CSS-də boşluq (padding) üçün
          >
            {/* Sizin ProductGrid komponentiniz */}
            <ProductGrid 
              title={category.name}
              products={category.products} 
            />
          </section>
        ))}
      </div>
    </Container>
  );
};

export default HomeScreen;