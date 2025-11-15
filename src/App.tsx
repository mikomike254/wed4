import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedCollections from './components/FeaturedCollections';
import ProductGrid from './components/ProductGrid';
import BrandStory from './components/BrandStory';
import WhatsAppCTA from './components/WhatsAppCTA';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import CartDrawer from './components/CartDrawer';
import DiscountBanner from './components/DiscountBanner';
import CategorySection from './components/CategorySection';
import { cartService } from './lib/cart';
import { supabase, Product } from './lib/supabase';

function App() {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [showHero, setShowHero] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);
  const [unisexProducts, setUnisexProducts] = useState<Product[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    updateCartCount();
    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadCategoryProducts();
  }, []);

  const updateCartCount = async () => {
    try {
      const count = await cartService.getCartCount();
      setCartCount(count);
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  };

  const loadCategoryProducts = async () => {
    setLoadingCategories(true);
    try {
      const { data: men } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'men')
        .eq('in_stock', true)
        .order('sort_order', { ascending: true })
        .limit(8);

      const { data: women } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'women')
        .eq('in_stock', true)
        .order('sort_order', { ascending: true })
        .limit(8);

      const { data: unisex } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'unisex')
        .eq('in_stock', true)
        .order('sort_order', { ascending: true })
        .limit(8);

      setMenProducts(men || []);
      setWomenProducts(women || []);
      setUnisexProducts(unisex || []);
    } catch (error) {
      console.error('Error loading category products:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    setShowHero(category === 'all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== '') {
      setShowHero(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCategoryChange={handleCategoryChange}
        currentCategory={currentCategory}
        onSearch={handleSearch}
        onCartOpen={() => setIsCartOpen(true)}
        cartCount={cartCount}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
          updateCartCount();
        }}
      />

      {showHero && (
        <>
          <Hero onShopClick={handleCategoryChange} />
          <FeaturedCollections onCollectionClick={handleCategoryChange} />
          <BrandStory />
        </>
      )}

      {showHero && (
        <>
          <DiscountBanner />

          {!loadingCategories && (
            <>
              <CategorySection
                title="Women's Collection"
                category="women"
                products={womenProducts}
                onCartUpdate={updateCartCount}
              />

              <CategorySection
                title="Men's Collection"
                category="men"
                products={menProducts}
                onCartUpdate={updateCartCount}
              />

              {unisexProducts.length > 0 && (
                <CategorySection
                  title="Unisex Collection"
                  category="unisex"
                  products={unisexProducts}
                  onCartUpdate={updateCartCount}
                />
              )}
            </>
          )}

          <WhatsAppCTA />
          <Newsletter />
        </>
      )}

      {!showHero && (
        <>
          <DiscountBanner />
          <ProductGrid
            category={currentCategory}
            searchQuery={searchQuery}
            onCartUpdate={updateCartCount}
          />
        </>
      )}

      <Footer />
      <WhatsAppFloating />
    </div>
  );
}

export default App;
