import { useState, useMemo, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import ProductFilters from '@/components/product-filters';
import WhatsAppFloat from '@/components/whatsapp-float';
import { Button } from '@/components/ui/button';
import { Product, HomeSection, HomeSectionItem } from '@shared/schema';
import { Currency } from '@/lib/currency';
import { ProductFilters as IProductFilters } from '@shared/cart-schema';
import { ArrowRight, Star, Sparkles, Crown, Gem, Heart, Watch, Users, Baby, Palette, Wrench, Diamond, TrendingUp } from "lucide-react";
import WatchAndShop from '@/components/WatchAndShop';
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import ringsImage from '@assets/new_rings.png';
import { 
  CountdownTimer, 
  OfferBanner, 
  SeasonalCollection
} from '@/components/festival-components';

interface HomeSectionWithItems extends HomeSection {
  items: HomeSectionItemWithProduct[];
}

interface HomeSectionItemWithProduct extends HomeSectionItem {
  product: Product;
}
import pendantsImage from '@assets/new_pendants.png';
import earringsImage from '@assets/new_earrings.png';
import braceletsImage from '@assets/bracelets_hero.png';
import necklacesImage from '@assets/necklaces_hero.png';
import chainsImage from '@assets/chains_hero.png';
import banglesImage from '@assets/bangles_hero_new.png';
import ringsImageMosaic from '@assets/rings_luxury.png';
import watchesImage from '@assets/watches_luxury_new.png';
import mensJewelryImage from '@assets/mens_jewelry_luxury_new.png';
import childrenJewelryImage from '@assets/children_jewelry_luxury_new.png';
import customJewelryImage from '@assets/custom_jewelry_luxury_new.png';
import collectionsImage from '@assets/collections_luxury_new.png';
import goldCollectionImage from '@assets/gold_collection_luxury.png';
import silverCollectionImage from '@assets/silver_collection_luxury.png';
import diamondCollectionImage from '@assets/diamond_collection_luxury_new.png';
import mangalsutraImage from '@assets/mangalsutra_new.png';
import noseJewelryImage from '@assets/nosepins_new.png';
import ankletsImage from '@assets/anklets_new.png';
import broochesImage from '@assets/brooches_new.png';
import bridalCollectionsImage from '@assets/bridal_new.png';
import newArrivalsBackground from '@assets/image_1756713608055.png';
import newArrivalsBackgroundNew from '@assets/new_arrivals_bg.png';
import jewelryImage1 from '@assets/image_1757151692791.png';
import jewelryImage2 from '@assets/image_1757151723842.png';
import jewelryImage3 from '@assets/image_1757151754440.png';
import jewelryImage4 from '@assets/image_1757151794600.png';
import jewelryImage5 from '@assets/image_1757151817054.png';
import jewelryImage6 from '@assets/image_1757151835990.png';

// Auto-sliding Jewelry Gallery Component
function JewelrySlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const jewelryImages = [
    {
      src: jewelryImage1,
      title: "Exquisite Gold Necklace Set",
      description: "Traditional craftsmanship meets modern elegance"
    },
    {
      src: jewelryImage2,
      title: "Royal Bridal Collection", 
      description: "Timeless beauty for your special moments"
    },
    {
      src: jewelryImage3,
      title: "Heritage Gold Choker",
      description: "Classic designs with contemporary appeal"
    },
    {
      src: jewelryImage4,
      title: "Elegant Statement Necklace",
      description: "Luxury redefined with precious artistry"
    },
    {
      src: jewelryImage5,
      title: "Ornate Royal Chain",
      description: "Magnificent detailing for the discerning connoisseur"
    },
    {
      src: jewelryImage6,
      title: "Luxury Display Collection",
      description: "Curated excellence in precious jewelry artistry"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % jewelryImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [jewelryImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{perspective: '1000px'}}>
      {/* Premium Background with Glass Morphism */}
      <div className="absolute inset-0">
        {/* Gradient Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/50 to-black/25"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/10 to-transparent"></div>
        
        {/* Floating Luxury Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            >
              <div 
                className="w-2 h-2 rounded-full shadow-lg" 
                style={{background: i % 3 === 0 ? '#00f5ff' : i % 3 === 1 ? '#ff006e' : '#8338ec'}} 
              />
            </motion.div>
          ))}
        </div>

        {/* Premium Light Rays */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-px h-full transform -skew-x-12" style={{background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent)'}}></div>
          <div className="absolute top-0 right-1/4 w-px h-full transform skew-x-12" style={{background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent)'}}></div>
          <div className="absolute top-0 right-1/3 w-px h-full transform -skew-x-6" style={{background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), transparent)'}}></div>
        </div>
      </div>

      {/* Main Slider Content */}
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12"
        initial={{ rotateX: 15, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -50, rotateY: -30, z: -100 }}
            animate={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
            exit={{ opacity: 0, x: 50, rotateY: 30, z: -100 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center lg:text-left"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Crown Icon with 3D Glow */}
            <motion.div
              initial={{ scale: 0, rotate: -180, rotateX: -90 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                rotateX: 0,
                rotateY: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 1.5,
                rotateY: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="relative mb-8 flex justify-center lg:justify-start"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 rounded-full blur-xl scale-150" style={{background: 'rgba(0, 0, 0, 0.5)'}}></div>
              <Crown className="relative h-16 w-16" style={{color: '#ffffff'}} />
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif', transformStyle: 'preserve-3d' }}
              initial={{ z: -50 }}
              animate={{ z: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="relative">
                <span className="absolute inset-0 blur-sm" style={{background: 'linear-gradient(to right, #ffffff, #ffffff, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                  {jewelryImages[currentSlide].title}
                </span>
                <span className="relative" style={{background: 'linear-gradient(to right, #ffffff, #ffffff, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 0 30px rgba(255, 255, 255, 1)'}}>
                  {jewelryImages[currentSlide].title}
                </span>
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg sm:text-2xl mb-8 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
              style={{color: '#ffffff', fontFamily: 'Cormorant Garamond, serif', textShadow: '0 0 20px rgba(255, 255, 255, 1)', transformStyle: 'preserve-3d'}}
              initial={{ z: -30, opacity: 0 }}
              animate={{ z: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {jewelryImages[currentSlide].description}
            </motion.p>

            {/* Premium Action Button */}
            <motion.div 
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5, 
                z: 20,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
              }} 
              whileTap={{ 
                scale: 0.95,
                rotateY: -5,
                z: -10
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Button 
                className="group relative overflow-hidden text-white font-semibold px-8 py-4 text-lg rounded-full shadow-2xl backdrop-blur-sm"
                style={{background: 'linear-gradient(45deg, #ffffff, #ffffff, #ffffff)', border: '2px solid rgba(255, 255, 255, 1)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 1)', color: '#000000'}}
                onClick={() => window.location.href = '/collections'}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Gem className="relative h-5 w-5 mr-3" />
                <span className="relative">Explore Collection</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Slider */}
          <motion.div 
            className="relative"
            initial={{ rotateY: 30, z: -100 }}
            animate={{ rotateY: 0, z: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.1))',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={jewelryImages[currentSlide].src}
                  alt={jewelryImages[currentSlide].title}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                />
              </AnimatePresence>
              
              {/* Elegant overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none"></div>
            </motion.div>

            {/* Slide Indicators */}
            <motion.div 
              className="flex justify-center mt-6 space-x-3"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {jewelryImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: index === currentSlide ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                    boxShadow: index === currentSlide ? '0 0 15px rgba(255, 255, 255, 1)' : 'none'
                  }}
                  whileHover={{
                    scale: 1.5,
                    z: 10,
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)'
                  }}
                  whileTap={{
                    scale: 0.8,
                    z: -5
                  }}
                  animate={{
                    rotateZ: index === currentSlide ? [0, 360] : 0
                  }}
                  transition={{
                    rotateZ: {
                      duration: 2,
                      ease: "linear",
                      repeat: index === currentSlide ? Infinity : 0
                    },
                    scale: { duration: 0.2 }
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// Royal Secondary Home Page Component
function RoyalSecondaryHomePage({ 
  allProducts, 
  selectedCurrency 
}: { 
  allProducts: Product[];
  selectedCurrency: Currency;
}) {
  // State for filtering Today's Special Offer section
  const [specialOfferFilters, setSpecialOfferFilters] = useState({
    sortBy: 'newest',
    category: 'all',
    metalType: 'all',
    priceRange: 'all',
    inStock: false
  });

  // Fetch custom home sections for royal display
  const { data: homeSections = [] } = useQuery<HomeSectionWithItems[]>({
    queryKey: ['/api/home-sections/public'],
    staleTime: 10000, // Cache for 10 seconds
    refetchOnWindowFocus: true,
  });

  // Filter products for royal sections - only show products that are specifically added to sections
  const royalSectionProducts = useMemo(() => {
    const sectionProductIds = new Set();
    homeSections.forEach(section => {
      section.items.forEach(item => {
        sectionProductIds.add(item.productId);
      });
    });
    return allProducts.filter(product => sectionProductIds.has(product.id));
  }, [allProducts, homeSections]);

  // Fallback: If no sections configured, show featured products
  const featuredProducts = useMemo(() => 
    royalSectionProducts.length > 0 
      ? royalSectionProducts.slice(0, 12)
      : allProducts.filter(product => product.isFeatured).slice(0, 12), 
    [royalSectionProducts, allProducts]
  );

  // Function to apply filters to section products
  const applySectionFilters = (products: any[], filters: typeof specialOfferFilters) => {
    let filtered = [...products];

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Metal type filter
    if (filters.metalType !== 'all') {
      filtered = filtered.filter(product => 
        product.metalType === filters.metalType
      );
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(p => p.replace('+', ''));
      const minPrice = parseInt(min);
      const maxPrice = max ? parseInt(max) : Infinity;
      
      filtered = filtered.filter(product => {
        const price = parseFloat(product.priceInr || 0);
        return price >= minPrice && (maxPrice === Infinity ? true : price <= maxPrice);
      });
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    // Sort products
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => parseFloat(a.priceInr || 0) - parseFloat(b.priceInr || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseFloat(b.priceInr || 0) - parseFloat(a.priceInr || 0));
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return filtered;
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #8B4513 0%, #4B0082 30%, #663399 70%, #800080 100%)'
    }}>
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3Ccircle cx='100' cy='40' r='1.5'/%3E%3Ccircle cx='30' cy='100' r='1'/%3E%3Ccircle cx='90' cy='90' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               animation: 'float 20s ease-in-out infinite'
             }} />
      </div>
      
      <Header />
      
      {/* Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative py-16 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Palaniappa Jewellers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/90 font-light tracking-[0.2em] drop-shadow-lg"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Since 2025
        </motion.p>
      </motion.div>
      
      {/* Auto-Sliding Jewelry Gallery */}
      <JewelrySlider />

      {/* Dynamic Home Sections - Admin Configured (excluding special layouts) */}
      {homeSections.length > 0 && homeSections.map((section) => {
        if (section.items.length === 0) return null;
        
        // Skip special layouts - they're handled in the second mapping below
        if (['festival-specials', 'split', 'diamond', 'festival', 'carousel', 'mosaic', 'magazine', 'new-arrivals', 'premium', 'zen', 'royal', 'curved-grid', 'tilted-grid', 'countdown-offers'].includes(section.layoutType)) {
          return null;
        }
        
        let sectionProducts = section.items.map(item => {
          const product = allProducts.find(p => p.id === item.productId);
          return product ? { ...product, ...item } : null;
        }).filter(Boolean);

        // Apply filters for Today's Special Offer section
        if (section.title.toLowerCase().includes('today\'s special offer')) {
          sectionProducts = applySectionFilters(sectionProducts, specialOfferFilters);
        }

        if (sectionProducts.length === 0) return null;

        return (
          <section key={section.id} className="relative py-24 overflow-hidden">
            {/* Section Background with Stylish Glass Effect */}
            <div className="absolute inset-0">
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.1) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}></div>
              
              {/* Elegant Geometric Patterns */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" 
                     style={{
                       backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.08'%3E%3Cpolygon points='50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40'/%3E%3C/g%3E%3C/svg%3E")`,
                     }} />
              </div>
            </div>

            <div className="relative container mx-auto px-4">
              {/* Section Header with Premium Styling */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center mb-20"
              >
                {/* Decorative Elements */}
                <div className="flex items-center justify-center mb-8">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 60 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-lg"
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mx-6 relative"
                  >
                    <Crown className="relative h-20 w-20 text-transparent bg-clip-text" style={{
                      background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #d97706)',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 4px 8px rgba(251, 191, 36, 0.3))'
                    }} />
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 60 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-lg"
                  />
                </div>

                {/* Section Title */}
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 font-bold tracking-wide">
                    {section.title}
                  </span>
                </motion.h2>

                {/* Section Description */}
                {section.description && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="max-w-4xl mx-auto"
                  >
                    <p className="text-xl sm:text-2xl text-white/90 font-light leading-relaxed tracking-wide"
                       style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {section.description}
                    </p>
                  </motion.div>
                )}
              </motion.div>
              
              {/* Advanced Sort and Filter Options - Only for Today's Special Offer */}
              {section.title.toLowerCase().includes('today\'s special offer') && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="mb-12"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl" style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}>
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500 font-bold mb-6 text-xl tracking-wide">Advanced Filters & Sort</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {/* Sort Options */}
                      <div>
                        <label className="block text-white/80 text-sm mb-3 font-medium tracking-wide">Sort By</label>
                        <select 
                          value={specialOfferFilters.sortBy}
                          onChange={(e) => setSpecialOfferFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                          className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 hover:bg-white/15"
                        >
                          <option value="newest">Newest First</option>
                          <option value="oldest">Oldest First</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="name-asc">Name: A to Z</option>
                          <option value="name-desc">Name: Z to A</option>
                        </select>
                      </div>
                      
                      {/* Category Filter */}
                      <div>
                        <label className="block text-white/80 text-sm mb-3 font-medium tracking-wide">Category</label>
                        <select 
                          value={specialOfferFilters.category}
                          onChange={(e) => setSpecialOfferFilters(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 hover:bg-white/15"
                        >
                          <option value="all">All Categories</option>
                          <option value="rings">Rings</option>
                          <option value="necklaces">Necklaces</option>
                          <option value="earrings">Earrings</option>
                          <option value="bracelets">Bracelets</option>
                          <option value="bangles">Bangles</option>
                          <option value="pendants">Pendants</option>
                        </select>
                      </div>
                      
                      {/* Metal Type Filter */}
                      <div>
                        <label className="block text-white/80 text-sm mb-3 font-medium tracking-wide">Metal Type</label>
                        <select 
                          value={specialOfferFilters.metalType}
                          onChange={(e) => setSpecialOfferFilters(prev => ({ ...prev, metalType: e.target.value }))}
                          className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 hover:bg-white/15"
                        >
                          <option value="all">All Metals</option>
                          <option value="GOLD">Gold</option>
                          <option value="SILVER">Silver</option>
                          <option value="DIAMOND">Diamond</option>
                          <option value="PLATINUM">Platinum</option>
                          <option value="GEMSTONE">Gemstone</option>
                        </select>
                      </div>
                      
                      {/* Price Range Filter */}
                      <div>
                        <label className="block text-white/80 text-sm mb-3 font-medium tracking-wide">Price Range</label>
                        <select 
                          value={specialOfferFilters.priceRange}
                          onChange={(e) => setSpecialOfferFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                          className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 hover:bg-white/15"
                        >
                          <option value="all">All Prices</option>
                          <option value="0-5000">Under ₹5,000</option>
                          <option value="5000-15000">₹5,000 - ₹15,000</option>
                          <option value="15000-50000">₹15,000 - ₹50,000</option>
                          <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                          <option value="100000+">Above ₹1,00,000</option>
                        </select>
                      </div>
                      
                      {/* Stock Filter */}
                      <div className="flex items-center pt-6">
                        <label className="flex items-center space-x-2 text-black/80 cursor-pointer">
                          <input 
                            type="checkbox"
                            checked={specialOfferFilters.inStock}
                            onChange={(e) => setSpecialOfferFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                            className="rounded border-amber-400/30 bg-black/50 text-amber-400 focus:ring-amber-400 focus:ring-offset-0"
                          />
                          <span className="text-sm">In Stock Only</span>
                        </label>
                      </div>
                    </div>
                    
                    {/* Results Count */}
                    <div className="mt-4 pt-4 border-t border-amber-400/20">
                      <p className="text-amber-300/60 text-sm">
                        Showing {sectionProducts.length} product{sectionProducts.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Products Grid with Enhanced Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sectionProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.1,
                      ease: "easeOut" 
                    }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    className="group relative"
                  >
                    {/* Card Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                    
                    {/* Product Card Container */}
                    <div className="relative bg-black/90 backdrop-blur-sm rounded-3xl shadow-xl border border-amber-200/50 overflow-hidden group-hover:border-amber-400/60 transition-all duration-500">
                      <ProductCard
                        product={product}
                        currency={selectedCurrency}
                        showActions={true}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Fallback: Show featured products if no sections configured */}
      {homeSections.length === 0 && featuredProducts.length > 0 && (
        <section className="relative py-24 overflow-hidden">
          {/* Premium Fallback Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/90 via-yellow-100/70 to-orange-50/80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-amber-50/30"></div>
          </div>

          <div className="relative container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              {/* Admin Notice with Elegant Styling */}
              <div className="mb-12 p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-amber-200/50 max-w-4xl mx-auto">
                <Crown className="h-16 w-16 mx-auto mb-6 text-amber-600" />
                <h2 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Crown Jewels Collection
                </h2>
                <p className="text-lg text-amber-800/70 font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Configure royal page sections in the admin dashboard to showcase your premium collections
                </p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-amber-200/50 overflow-hidden">
                    <ProductCard
                      product={product}
                      currency={selectedCurrency}
                      showActions={true}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Royal Call to Action */}
      <section className="relative py-32 overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-purple-900/80 to-amber-800"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
          
          {/* Floating Luxury Particles */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [0.8, 1.4, 0.8],
                }}
                transition={{
                  duration: 6 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          {/* Premium Light Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-yellow-400/30 via-transparent to-transparent transform -rotate-12"></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-amber-400/30 via-transparent to-transparent transform rotate-12"></div>
          </div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            {/* Crown with Enhanced Glow */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative mb-12"
            >
              <div className="absolute inset-0 bg-yellow-400/40 rounded-full blur-2xl scale-200"></div>
              <Crown className="relative h-24 w-24 mx-auto text-yellow-400" />
            </motion.div>

            {/* Premium Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-white"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
                Join the Royal Legacy
              </span>
            </motion.h2>

            {/* Elegant Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-xl sm:text-2xl mb-12 text-amber-100/90 max-w-3xl mx-auto font-light leading-relaxed"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Experience the finest craftsmanship and timeless elegance that has adorned royalty for generations
            </motion.p>

            {/* Premium Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 hover:from-yellow-400 hover:via-amber-300 hover:to-yellow-400 text-amber-900 font-bold px-12 py-6 text-xl rounded-full shadow-2xl border border-yellow-300/50"
                  onClick={() => window.location.href = '/collections'}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <Crown className="relative h-6 w-6 mr-3" />
                  <span className="relative">Shop Royal Collection</span>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline"
                  className="group relative overflow-hidden border-2 border-yellow-300/60 text-yellow-200 hover:text-amber-900 font-bold px-12 py-6 text-xl rounded-full bg-white/10 hover:bg-yellow-300/90 backdrop-blur-md shadow-2xl transition-all duration-300"
                  onClick={() => window.location.href = '/contact'}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/0 via-yellow-300/20 to-yellow-300/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <Users className="relative h-6 w-6 mr-3" />
                  <span className="relative">Contact Royal Advisors</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

// Auto-Scrolling Tilted Card Row Layout Component (1x6 Grid)
function TiltedGridSection({
  section,
  selectedCurrency,
}: {
  section: HomeSectionWithItems;
  selectedCurrency: Currency;
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const rotationAngles = [-6, 4, -3, 5, -4, 2]; // subtle tilts for 6 items
  
  // Auto-scroll functionality
  useEffect(() => {
    const autoScroll = setInterval(() => {
      setScrollPosition(prev => prev - 1); // Scroll from right to left
    }, 50); // Smooth scrolling speed

    return () => clearInterval(autoScroll);
  }, []);

  // Duplicate items for seamless scrolling
  const displayItems = section.items.length > 0 
    ? [...section.items, ...section.items, ...section.items]
    : [];

  return (
    <section className="py-16 px-4 md:px-8 relative bg-gradient-to-br from-stone-50 to-stone-100 overflow-hidden" data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="container mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-4 font-[Playfair]">
            {section.title}
          </h2>
          {section.description && (
            <p className="text-lg text-stone-600">{section.description}</p>
          )}
        </div>

        {/* Auto-Scrolling Tilted Row - Desktop (1x6 Grid) */}
        <div className="hidden md:block relative">
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-6 xl:gap-8"
              style={{
                transform: `translateX(${scrollPosition}px)`,
                width: 'fit-content',
              }}
              onMouseEnter={() => setScrollPosition(scrollPosition)} // Pause on hover
            >
              {displayItems.map((item, index) => {
                const rotation = rotationAngles[index % rotationAngles.length];
                const actualIndex = index % section.items.length;

                return (
                  <motion.div
                    key={`${item.id}-${index}`}
                    className="relative shrink-0 w-52 xl:w-60 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                    initial={{
                      rotate: rotation,
                      scale: 1,
                    }}
                    animate={{
                      rotate: rotation,
                      scale: 1,
                    }}
                    whileHover={{
                      scale: 1.05,
                      rotate: rotation, // Explicitly maintain the rotation
                      transition: { duration: 0.3 },
                    }}
                    onClick={() => (window.location.href = `/product/${item.product.id}`)}
                    data-testid={`tilted-grid-item-${actualIndex}`}
                  >
                    {/* Product Image */}
                    <div className="h-48 xl:h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                      {item.product.images?.length ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Gem className="w-12 h-12 text-gray-400" />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="p-4 text-center">
                      <h3 className="text-sm xl:text-base font-semibold text-gray-800 mb-2 line-clamp-2">
                        {item.product.name}
                      </h3>
                      <p className="text-lg xl:text-xl font-bold text-gray-900">
                        {selectedCurrency === "INR" ? "₹" : "BD "}
                        {selectedCurrency === "INR"
                          ? parseFloat(item.product.priceInr).toLocaleString("en-IN")
                          : parseFloat(item.product.priceBhd).toLocaleString("en-BH", {
                              minimumFractionDigits: 3,
                            })}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* View All Collections Button - Desktop */}
        <div className="hidden md:flex justify-center mt-8">
          <motion.button
            className="inline-flex items-center gap-2 bg-gradient-to-r from-stone-600 to-stone-700 text-white px-6 py-3 rounded-full font-medium hover:from-stone-700 hover:to-stone-800 transition-all duration-300 shadow-lg"
            onClick={() => (window.location.href = '/collections')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid="view-all-collections-button"
          >
            <span>View All Collections</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile View - 2x3 Grid */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {section.items.slice(0, 6).map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
                onClick={() => (window.location.href = `/product/${item.product.id}`)}
              >
                <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {item.product.images?.length ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Gem className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
                    {item.product.name}
                  </h3>
                  <p className="text-base font-bold text-gray-900">
                    {selectedCurrency === "INR" ? "₹" : "BD "}
                    {selectedCurrency === "INR"
                      ? parseFloat(item.product.priceInr).toLocaleString("en-IN")
                      : parseFloat(item.product.priceBhd).toLocaleString("en-BH", {
                          minimumFractionDigits: 3,
                        })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Collections Button - Mobile */}
          <div className="text-center">
            <button
              className="inline-flex items-center gap-2 bg-gradient-to-r from-stone-600 to-stone-700 text-white px-6 py-3 rounded-full font-medium shadow-lg"
              onClick={() => (window.location.href = '/collections')}
              data-testid="view-all-collections-button-mobile"
            >
              <span>View All Collections</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3D Curved Carousel Component with Auto-Scroll
function CurvedCarouselSection({ 
  section, 
  selectedCurrency 
}: { 
  section: HomeSectionWithItems;
  selectedCurrency: Currency;
}) {
  const [angle, setAngle] = useState(0);
  const [startX, setStartX] = useState(0);
  const displayItems = section.items; // Use all available products
  
  // Calculate angle step dynamically based on number of products
  const angleStep = displayItems.length > 0 ? 360 / displayItems.length : 72;
  
  // Calculate which card is currently active (facing front)
  const activeIndex = Math.round(((angle % 360) / -angleStep) + displayItems.length) % displayItems.length;
  
  const rotate = (direction: 'left' | 'right') => {
    setAngle(prev => prev + (direction === 'left' ? angleStep : -angleStep));
  };

  // Auto-scroll functionality
  useEffect(() => {
    const autoRotate = setInterval(() => {
      rotate('right'); // Auto-rotate to the right every 4 seconds
    }, 4000);

    return () => clearInterval(autoRotate); // Cleanup on unmount
  }, []);

  return (
    <section 
      className="w-full relative py-20 overflow-hidden" 
      data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
      style={{
        background: `
          linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 15%, #2a2f3e 30%, #3a4556 45%, #4a556e 60%, #5a6585 75%, #6a759d 90%, #7a85b5 100%),
          radial-gradient(ellipse 800px 400px at 20% 10%, rgba(99, 102, 241, 0.15) 0%, transparent 60%),
          radial-gradient(ellipse 600px 350px at 80% 90%, rgba(139, 92, 246, 0.12) 0%, transparent 55%),
          radial-gradient(ellipse 500px 300px at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Universal Countdown Section */}
      <div className="relative z-20 container mx-auto px-4">
        {renderCountdownSection(section)}
      </div>

      {/* Premium Luxury Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* High-End Layer Patterns */}
        <div 
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 700px 350px at 10% 20%, rgba(165, 180, 252, 0.18) 0%, transparent 70%),
              radial-gradient(ellipse 600px 450px at 90% 10%, rgba(196, 181, 253, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse 550px 280px at 80% 90%, rgba(147, 197, 253, 0.12) 0%, transparent 55%),
              radial-gradient(ellipse 500px 550px at 15% 85%, rgba(199, 210, 254, 0.1) 0%, transparent 65%),
              linear-gradient(60deg, transparent 0%, rgba(165, 180, 252, 0.08) 30%, transparent 50%, rgba(196, 181, 253, 0.1) 70%, transparent 100%)
            `,
            backgroundSize: '1100px 800px, 1000px 900px, 900px 650px, 800px 1000px, 1500px 1100px'
          }}
        />
        
        {/* Luxury Geometric Textures */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              conic-gradient(from 60deg at 40% 30%, transparent 0deg, rgba(165, 180, 252, 0.2) 60deg, transparent 120deg, rgba(196, 181, 253, 0.18) 180deg, transparent 240deg, rgba(147, 197, 253, 0.15) 300deg, transparent 360deg),
              linear-gradient(150deg, transparent 20%, rgba(199, 210, 254, 0.12) 40%, transparent 60%, rgba(165, 180, 252, 0.1) 80%, transparent 100%),
              linear-gradient(-45deg, rgba(196, 181, 253, 0.1) 0%, transparent 30%, rgba(147, 197, 253, 0.14) 50%, transparent 80%, rgba(199, 210, 254, 0.08) 100%),
              radial-gradient(circle at 70% 40%, rgba(165, 180, 252, 0.15) 0%, transparent 45%),
              linear-gradient(30deg, transparent 35%, rgba(196, 181, 253, 0.06) 55%, transparent 75%)
            `,
            backgroundSize: '1000px 1000px, 800px 700px, 1100px 500px, 700px 700px, 900px 500px'
          }}
        />
        
        {/* Premium Floating Elements */}
        <motion.div
          className="absolute top-16 left-24 w-48 h-32 bg-gradient-to-br from-indigo-300/12 to-purple-300/10 rounded-full blur-sm"
          style={{ borderRadius: '70% 30% 76% 24% / 58% 42% 68% 32%' }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 3, 0],
            scale: [1, 1.08, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute top-32 right-32 w-40 h-52 bg-gradient-to-br from-purple-300/10 to-blue-300/8 rounded-full blur-sm"
          style={{ borderRadius: '38% 62% 70% 30% / 75% 25% 80% 20%' }}
          animate={{
            y: [0, 16, 0],
            x: [0, -12, 0],
            rotate: [0, -2, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        
        <motion.div
          className="absolute bottom-32 left-1/5 w-56 h-36 bg-gradient-to-br from-blue-300/8 to-indigo-300/10 rounded-full blur-md"
          style={{ borderRadius: '80% 20% 72% 28% / 35% 65% 45% 55%' }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 1.5, 0],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        <motion.div
          className="absolute bottom-24 right-24 w-44 h-56 bg-gradient-to-br from-purple-300/9 to-indigo-300/11 rounded-full blur-sm"
          style={{ borderRadius: '48% 52% 88% 12% / 72% 75% 25% 28%' }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 2.5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />
        
        {/* Elegant Light Points */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              radial-gradient(circle 3px at 20% 15%, rgba(165, 180, 252, 0.6) 0%, transparent 50%),
              radial-gradient(circle 2.5px at 80% 20%, rgba(196, 181, 253, 0.5) 0%, transparent 50%),
              radial-gradient(circle 3.5px at 15% 85%, rgba(147, 197, 253, 0.7) 0%, transparent 50%),
              radial-gradient(circle 2.8px at 85% 80%, rgba(199, 210, 254, 0.5) 0%, transparent 50%),
              radial-gradient(circle 3.2px at 40% 60%, rgba(165, 180, 252, 0.6) 0%, transparent 50%),
              radial-gradient(circle 2.2px at 65% 25%, rgba(196, 181, 253, 0.4) 0%, transparent 50%),
              radial-gradient(circle 2.6px at 25% 75%, rgba(147, 197, 253, 0.5) 0%, transparent 50%)
            `,
            backgroundSize: '500px 500px, 450px 450px, 480px 480px, 400px 400px, 420px 420px, 380px 380px, 360px 360px'
          }}
        />
        
        {/* Premium Gold & Jewelry Accents */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 250px 120px at 35% 65%, rgba(251, 191, 36, 0.12) 0%, transparent 75%),
              radial-gradient(ellipse 180px 140px at 75% 25%, rgba(245, 158, 11, 0.08) 0%, transparent 65%),
              radial-gradient(ellipse 200px 100px at 60% 80%, rgba(217, 119, 6, 0.06) 0%, transparent 70%),
              linear-gradient(45deg, transparent 55%, rgba(251, 191, 36, 0.04) 65%, transparent 75%)
            `,
            backgroundSize: '700px 500px, 600px 550px, 650px 450px, 900px 400px'
          }}
        />
        
        {/* High-End Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-transparent to-slate-800/12" />
        <div className="absolute inset-0 bg-gradient-to-tl from-slate-700/8 via-transparent to-slate-600/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/6 via-transparent to-slate-900/8" />
        
        {/* Luxury Depth & Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/4 via-transparent to-purple-900/6 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-blue-50/3 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/3 via-transparent to-yellow-900/4 opacity-60" />
        
        {/* Final Premium Touch */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/2 to-purple-950/3" />
      </div>

      {/* Content Container with Glass Effect */}
      <div className="w-full px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {section.title || '3D Curved Collection'}
          </h2>
          {section.description && (
            <p className="text-lg text-stone-600 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {section.description}
            </p>
          )}
        </div>

        {/* 3D Curved Carousel Container */}
        <div className="flex flex-col items-center justify-center w-full">
          <div 
            className="relative w-full max-w-5xl h-[350px] md:h-[500px] mx-auto"
            style={{ perspective: '1200px' }}
            /* Touch/Swipe Support for Mobile */
            onTouchStart={(e) => setStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const delta = e.changedTouches[0].clientX - startX;
              if (delta > 50) rotate('left');
              else if (delta < -50) rotate('right');
            }}
          >
            <motion.div
              className="absolute w-full h-full"
              animate={{ rotateY: angle }}
              transition={{ type: "spring", stiffness: 60, damping: 12 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {displayItems.map((item, index) => {
                const itemAngle = index * angleStep; // Dynamically calculated angle based on number of products
                const isActive = index === activeIndex;
                
                return (
                  <motion.div
                    key={item.id}
                    className={`absolute w-40 h-52 md:w-64 md:h-80 p-3 md:p-6 bg-white rounded-xl md:rounded-3xl cursor-pointer group overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                      isActive 
                        ? 'shadow-3xl brightness-100 z-10' 
                        : 'shadow-lg brightness-75 blur-[1px] z-0'
                    }`}
                    style={{
                      transform: `rotateY(${itemAngle}deg) translateZ(${window.innerWidth < 768 ? '220px' : '400px'}) scale(${isActive ? (window.innerWidth < 768 ? 1.08 : 1.2) : 1})`,
                      opacity: isActive ? 1 : 0.6,
                      left: '50%',
                      top: '50%',
                      marginLeft: window.innerWidth < 768 ? '-80px' : '-128px', // Half width responsive
                      marginTop: window.innerWidth < 768 ? '-104px' : '-160px', // Half height responsive
                    }}
                    onClick={() => window.location.href = `/product/${item.product.id}`}
                    data-testid={`curved-grid-item-${index}`}
                  >
                    {/* Product Image */}
                    <div className="w-full h-28 md:h-52 bg-gray-100 rounded-lg md:rounded-2xl overflow-hidden mb-2 md:mb-4 group-hover:shadow-lg transition-shadow">
                      {item.product.images && item.product.images.length > 0 ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Gem className="w-8 h-8 md:w-16 md:h-16" />
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="text-center h-16 md:h-auto flex flex-col justify-between">
                      <h3 className="text-sm md:text-lg font-semibold text-gray-700 mb-1 md:mb-2 line-clamp-2 leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
                        {item.product.name}
                      </h3>
                      <p className="text-sm md:text-2xl font-bold text-amber-600 mt-auto">
                        {selectedCurrency === 'INR' ? '₹' : 'BD '}
                        {selectedCurrency === 'INR' ? 
                          parseFloat(item.product.priceInr).toLocaleString('en-IN') :
                          parseFloat(item.product.priceBhd).toLocaleString('en-BH', { minimumFractionDigits: 3 })
                        }
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-6 mt-16">
            <button
              onClick={() => rotate('left')}
              className="px-10 py-4 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 text-white rounded-2xl shadow-xl hover:from-slate-700 hover:to-slate-800 hover:shadow-2xl transition-all duration-500 font-medium text-lg backdrop-blur-sm hover:scale-105"
              data-testid="carousel-prev-button"
            >
              ← Previous
            </button>
            <button
              onClick={() => rotate('right')}
              className="px-10 py-4 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 text-white rounded-2xl shadow-xl hover:from-slate-700 hover:to-slate-800 hover:shadow-2xl transition-all duration-500 font-medium text-lg backdrop-blur-sm hover:scale-105"
              data-testid="carousel-next-button"
            >
              Next →
            </button>
          </div>

          {/* View All Collection Button */}
          <div className="text-center mt-12">
            <button
              className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white font-semibold px-12 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 text-xl border border-emerald-500/20 backdrop-blur-sm"
              style={{ fontFamily: 'Playfair Display, serif' }}
              onClick={() => window.location.href = '/collections'}
              data-testid="view-all-collections-button"
            >
              View All Collection →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Separate component for auto-scrolling categories to avoid React hooks rule violations
function CategoriesScrollSection({ categories, handleViewAllClick }: { categories: any[]; handleViewAllClick: (key: string) => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const autoScroll = () => {
      const currentScrollLeft = scrollContainer.scrollLeft;
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (currentScrollLeft >= maxScrollLeft) {
        // Reset to start if at the end
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll right by 200px
        scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
      }
    };

    const interval = setInterval(autoScroll, 3000); // Auto-scroll every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-4 pb-0" data-testid="section-categories" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
      <div className="px-2 md:px-6 lg:px-8">
        {/* Horizontally Scrollable Categories */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-2 md:gap-4 lg:gap-6 pb-2"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
        >
          {categories.map((category, index) => (
            <div 
              key={category.key}
              className="flex-shrink-0 flex flex-col items-center cursor-pointer hover:transform hover:scale-105 transition-all duration-200"
              onClick={() => handleViewAllClick(category.key)}
              data-testid={`category-card-${category.key}`}
            >
              {/* Category Image */}
              <div 
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full shadow-lg overflow-hidden mb-1.5 md:mb-2 bg-gradient-to-br from-white to-gray-50"
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              
              {/* Category Name */}
              <h3 
                className="text-[9px] md:text-xs lg:text-sm font-light text-center leading-tight text-gray-700 px-0.5 w-20 md:w-24 lg:w-28 min-h-[28px] md:min-h-[32px] flex items-center justify-center"
              >
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Ultra-Modern Budget Selection - Cutting-Edge Design System
function ShopByBudgetSection({ selectedCurrency }: { selectedCurrency: Currency }) {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const luxuryTiers = [
    {
      id: 1,
      tier: 'ESSENTIAL',
      subtitle: 'Your Journey Begins',
      price: selectedCurrency === 'INR' ? '15,000' : '75',
      currency: selectedCurrency === 'INR' ? '₹' : 'BD',
      value: selectedCurrency === 'INR' ? 15000 : 75,
      description: 'Timeless elegance meets modern accessibility',
      features: ['925 Sterling Silver', 'Lab-Created Gems', 'Lifetime Warranty', 'Free Sizing'],
      gradient: 'from-indigo-600 via-purple-600 to-pink-600',
      shadowColor: 'shadow-purple-500/25',
      borderColor: 'border-purple-200',
      accentColor: 'bg-purple-500',
      glowColor: 'shadow-[0_0_40px_rgba(147,51,234,0.3)]',
      popularity: 94,
      badge: 'POPULAR'
    },
    {
      id: 2,
      tier: 'PREMIUM',
      subtitle: 'Elevated Sophistication',
      price: selectedCurrency === 'INR' ? '30,000' : '150',
      currency: selectedCurrency === 'INR' ? '₹' : 'BD',
      value: selectedCurrency === 'INR' ? 30000 : 150,
      description: 'Where artistry meets precious materials',
      features: ['18K Gold', 'Natural Diamonds', 'Custom Design', 'Priority Service'],
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      shadowColor: 'shadow-orange-500/25',
      borderColor: 'border-orange-200',
      accentColor: 'bg-orange-500',
      glowColor: 'shadow-[0_0_40px_rgba(251,146,60,0.3)]',
      popularity: 87,
      badge: 'RECOMMENDED'
    },
    {
      id: 3,
      tier: 'ELITE',
      subtitle: 'Masterpiece Collection',
      price: selectedCurrency === 'INR' ? '60,000' : '300',
      currency: selectedCurrency === 'INR' ? '₹' : 'BD',
      value: selectedCurrency === 'INR' ? 60000 : 300,
      description: 'Exclusive pieces for the connoisseur',
      features: ['24K Gold', 'Rare Gemstones', 'Bespoke Crafting', 'Personal Concierge'],
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      shadowColor: 'shadow-emerald-500/25',
      borderColor: 'border-emerald-200',
      accentColor: 'bg-emerald-500',
      glowColor: 'shadow-[0_0_40px_rgba(16,185,129,0.3)]',
      popularity: 91,
      badge: 'EXCLUSIVE'
    }
  ];

  const handleBudgetClick = (maxPrice: number) => {
    const params = new URLSearchParams();
    params.set('maxPrice', maxPrice.toString());
    params.set('currency', selectedCurrency);
    window.location.href = `/collections?${params.toString()}`;
  };

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Ultra-Modern Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        {/* Floating Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Ultra-Modern Header */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-3 bg-white/[0.08] backdrop-blur-xl border border-white/[0.16] rounded-full px-6 py-3 mb-8"
          >
            <div className="relative">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full absolute top-0 animate-ping"></div>
            </div>
            <span className="text-white/80 font-medium tracking-[0.16em] text-sm">LUXURY TIERS</span>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight"
          >
            Choose Your
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Perfect Tier
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Experience luxury redefined. From accessible elegance to exclusive masterpieces.
          </motion.p>
        </motion.div>

        {/* Revolutionary Card Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {luxuryTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 60, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -12, 
                rotateY: 5,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              onHoverStart={() => setHoveredCard(tier.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => handleBudgetClick(tier.value)}
              className="group cursor-pointer perspective-1000"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Main Card */}
              <div className={`
                relative bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 
                border border-white/[0.08] ${tier.shadowColor} shadow-2xl 
                overflow-hidden transition-all duration-500
                ${hoveredCard === tier.id ? tier.glowColor + ' scale-[1.02]' : ''}
              `}>
                
                {/* Floating Badge */}
                <div className={`absolute top-6 right-6 ${tier.accentColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm`}>
                  {tier.badge}
                </div>
                
                {/* Gradient Border Effect */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${tier.gradient} p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="bg-gray-900/95 backdrop-blur-xl rounded-3xl w-full h-full"></div>
                </motion.div>
                
                {/* Content */}
                <div className="relative z-10 space-y-6">
                  
                  {/* Header Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${tier.gradient} animate-pulse`}></div>
                      <span className="text-white/60 font-mono text-xs tracking-[0.2em] uppercase">
                        {tier.tier}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      {tier.subtitle}
                    </h3>
                    
                    {/* Popularity Indicator */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${tier.gradient} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tier.popularity}%` }}
                          transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                        />
                      </div>
                      <span className="text-white/70 text-xs font-medium">
                        {tier.popularity}% choose this
                      </span>
                    </div>
                  </div>
                  
                  {/* Price Display */}
                  <div className="space-y-2">
                    <div className="text-white/50 text-sm font-medium">Starting from</div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-6xl font-black bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent leading-none`}>
                        {tier.price}
                      </span>
                      <span className="text-2xl font-bold text-white/60">
                        {tier.currency}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {tier.description}
                    </p>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-3">
                    <div className="text-white/50 text-xs font-semibold tracking-wider uppercase">
                      What's Included
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {tier.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + idx * 0.1 + 0.6 }}
                          className="flex items-center gap-2"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tier.gradient}`}></div>
                          <span className="text-white/70 text-xs font-medium">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full py-4 px-6 bg-gradient-to-r ${tier.gradient} 
                      text-white font-bold rounded-2xl shadow-lg 
                      backdrop-blur-sm transition-all duration-300
                      hover:shadow-xl hover:${tier.shadowColor}
                    `}
                  >
                    <span className="flex items-center justify-center gap-2">
                      EXPLORE COLLECTION
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </motion.button>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-xl"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-4 bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] rounded-full px-8 py-4">
            <span className="text-white/60 text-sm">Need help choosing?</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-medium text-sm hover:text-white/80 transition-colors"
            >
              Talk to an Expert
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// Separate component for festival auto-scrolling 1x4 grid layout
function FestivalScrollSection({ items, selectedCurrency, handleViewAllClick }: { items: any[]; selectedCurrency: Currency; handleViewAllClick: (category: string) => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const userScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollTimeout: NodeJS.Timeout;

    const autoScroll = () => {
      // Don't auto-scroll if user is manually scrolling
      if (isUserScrolling) return;
      
      const currentScrollLeft = scrollContainer.scrollLeft;
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      // Enhanced mobile scrolling - scroll by single product width for smoother transition
      const isMobile = window.innerWidth < 768;
      const scrollDistance = isMobile ? scrollContainer.clientWidth / 4 : scrollContainer.clientWidth;
      
      if (currentScrollLeft >= maxScrollLeft - 10) { // Small buffer to handle rounding
        // Reset to start if at the end
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll right by calculated distance
        scrollContainer.scrollBy({ left: scrollDistance, behavior: 'smooth' });
      }
    };

    // Enhanced user scroll detection
    let scrollDetectionTimeout: NodeJS.Timeout;
    const handleUserScroll = () => {
      setIsUserScrolling(true);
      
      // Clear existing timeouts
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
      if (scrollDetectionTimeout) {
        clearTimeout(scrollDetectionTimeout);
      }
      
      // Use shorter timeout for mobile to detect scroll end more accurately
      const isMobile = window.innerWidth < 768;
      const timeoutDelay = isMobile ? 1500 : 3000;
      
      scrollDetectionTimeout = setTimeout(() => {
        setIsUserScrolling(false);
      }, 150); // Quick detection of scroll end
      
      // Resume auto-scroll after longer delay
      userScrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, timeoutDelay);
    };

    // Enhanced touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      setIsUserScrolling(true);
      // Prevent momentum scrolling interference
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Clear existing timeout
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
      
      // Resume auto-scroll after brief delay for mobile
      scrollTimeout = setTimeout(() => {
        setIsUserScrolling(false);
      }, 2000);
    };

    // Enhanced mobile touch handling
    const handleTouchMove = () => {
      setIsUserScrolling(true);
    };

    // Auto-scroll interval - faster for mobile for better UX
    const isMobile = window.innerWidth < 768;
    const intervalDelay = isMobile ? 3000 : 4000;
    const interval = setInterval(autoScroll, intervalDelay);
    
    // Add event listeners with passive option for better mobile performance
    scrollContainer.addEventListener('scroll', handleUserScroll, { passive: true });
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      clearInterval(interval);
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      if (scrollDetectionTimeout) {
        clearTimeout(scrollDetectionTimeout);
      }
      scrollContainer.removeEventListener('scroll', handleUserScroll);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
      scrollContainer.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isUserScrolling]);

  return (
    <div className="relative z-10">
      {items.length > 0 ? (
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-2 md:gap-3 pb-2"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
        >
          {/* Create groups of 4 products */}
          {Array.from({ length: Math.ceil(items.length / 4) }, (_, groupIndex) => (
            <div key={groupIndex} className="flex-shrink-0 grid grid-cols-4 gap-2 md:gap-3 w-full">
              {items.slice(groupIndex * 4, (groupIndex + 1) * 4).map((item, index) => (
            <div 
              key={item.id}
                className="w-full group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleViewAllClick(item.product.category)}
            >
                <div className="bg-white/20 md:bg-white/95 backdrop-blur-sm rounded-lg p-1.5 md:p-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 md:border-white/50 h-full">
                  {/* Product Image */}
                  <div className="aspect-square mb-1.5 overflow-hidden rounded-md bg-gradient-to-br from-purple-50 to-pink-50">
                    <img
                      src={item.product.images?.[0] || ringsImage}
                      alt={item.product.name}
                      className="w-full h-full object-contain transform transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-0.5 mb-1">
                      <span className="text-amber-500 text-xs">₹</span>
                      <span className="text-xs md:text-sm font-semibold text-gray-800">
                        {item.product.priceInr?.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-600 font-medium line-clamp-2">
                      {item.product.name}
                    </p>
                  </div>
                </div>
              </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-full bg-white/20 md:bg-white/95 backdrop-blur-sm rounded-lg p-1.5 md:p-2 shadow-lg border border-white/30 md:border-white/50">
              <div className="aspect-square mb-1.5 overflow-hidden rounded-md bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-gray-400 text-xs">No Image</div>
              </div>
              <div className="text-center">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Separate component for New Arrivals layout to avoid React hooks rule violations
function NewArrivalsSection({ section, selectedCurrency }: { section: HomeSectionWithItems; selectedCurrency: Currency }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const autoScroll = () => {
      const currentScrollLeft = scrollContainer.scrollLeft;
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (currentScrollLeft >= maxScrollLeft) {
        // Reset to start if at the end
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll right by 300px
        scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
      }
    };

    const interval = setInterval(autoScroll, 2000); // Auto-scroll every 2 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="py-12" 
      data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
      style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {section.title || 'New Arrivals'}
          </h2>
          <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {section.description || 'New Arrivals Dropping Daily, Monday through Friday. Explore the Latest Launches Now!'}
          </p>
        </div>
        
        {/* Promotional Image with Overlay Button */}
        <div className="mb-8 relative">
          <img 
            src={newArrivalsBackgroundNew} 
            alt="New Arrivals - Ganesh Chaturthi Offer" 
            className="w-full h-auto max-w-none rounded-lg shadow-lg"
            style={{ minHeight: 'auto', objectFit: 'contain' }}
          />
          
          {/* Overlay Button */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <Button 
              className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200 shadow-lg" 
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
              onClick={() => window.location.href = '/collections?category=new-arrivals'}
            >
              View All New Arrivals <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Universal countdown renderer for all layout types
function renderCountdownSection(section: HomeSectionWithItems) {
  if (!section.showCountdown || !section.countdownEndDate) {
    return null;
  }

  return (
    <div className="mb-8">
      <CountdownTimer
        targetDate={new Date(section.countdownEndDate)}
        title={section.countdownTitle || "Limited Time Offer"}
        description={section.countdownDescription || "Don't miss out on these amazing deals!"}
      />
    </div>
  );
}

export default function Home() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('BHD');

  // Royal layout hooks (moved to top level to avoid conditional hook calls)
  const royalContainerRef = useRef(null);
  const royalIsInView = useInView(royalContainerRef, { once: true });

  // Listen for product addition events to auto-refresh homepage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'homepage-refresh') {
        // Refetch data when a product is added
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Handle "View All" button clicks - navigate to collections page
  const handleViewAllClick = (material: string) => {
    const materialPath = material.toLowerCase();
    window.location.href = `/collections/${materialPath}`;
  };

  // Category carousel data
  const categories = [
    { name: 'Rings', image: ringsImage, key: 'rings' },
    { name: 'Earrings', image: earringsImage, key: 'earrings' },
    { name: 'Pendants', image: pendantsImage, key: 'pendants' },
    { name: 'Necklaces', image: braceletsImage, key: 'necklaces' },
    { name: 'Bangles & Bracelets', image: banglesImage, key: 'bangles' },
    { name: 'Chains', image: necklacesImage, key: 'chains' },
    { name: 'Bracelets', image: chainsImage, key: 'bracelets' },
    { name: 'Nosepins', image: noseJewelryImage, key: 'nose-jewelry' },
    { name: 'Watches', image: watchesImage, key: 'watches' },
    { name: "Men's Jewelry", image: mensJewelryImage, key: 'mens' },
    { name: "Children's Jewelry", image: childrenJewelryImage, key: 'children' },
    { name: 'Custom Jewelry', image: customJewelryImage, key: 'custom' },
    { name: 'Collections', image: collectionsImage, key: 'collections' },
    { name: 'Gold Collection', image: goldCollectionImage, key: 'gold' },
    { name: 'Silver Collection', image: silverCollectionImage, key: 'silver' },
    { name: 'Diamond Collection', image: diamondCollectionImage, key: 'diamond' },
    { name: 'Mangalsutra', image: mangalsutraImage, key: 'mangalsutra' },
    { name: 'Anklets & Toe Rings', image: ankletsImage, key: 'anklets' },
    { name: 'Brooches & Pins', image: broochesImage, key: 'brooches' },
    { name: 'Bridal Collections', image: bridalCollectionsImage, key: 'bridal-collections' }
  ];


  // Fetch all products for display
  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Fetch custom home sections
  const { data: homeSections = [] } = useQuery<HomeSectionWithItems[]>({
    queryKey: ['/api/home-sections/public'],
    queryFn: async () => {
      const response = await fetch('/api/home-sections/public');
      if (!response.ok) throw new Error('Failed to fetch home sections');
      const data = await response.json();
      return data;
    },
    staleTime: 0, // Always fetch fresh data
    refetchOnWindowFocus: true, // Refetch when user focuses the window
    refetchInterval: 2000, // Auto-refetch every 2 seconds to catch admin updates
  });

  // Fetch secondary home page setting
  const { data: secondaryPageSetting } = useQuery({
    queryKey: ['/api/settings/secondary_home_page_enabled'],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', '/api/settings/secondary_home_page_enabled');
        return response.json();
      } catch (error) {
        // Setting doesn't exist yet, return default
        return { key: 'secondary_home_page_enabled', value: 'false' };
      }
    },
    staleTime: 10000, // Cache for 10 seconds
    refetchOnWindowFocus: true,
  });

  const isSecondaryPageEnabled = secondaryPageSetting?.value === 'true';

  // Simple filtering for home page (not used directly but keeps type consistency)
  const filteredProducts = useMemo(() => {
    return allProducts.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }, [allProducts]);

  // Category counts for display
  const getCategoryCount = (category: string) => {
    return allProducts.filter(product => {
      // Don't exclude new arrivals - they should be counted in their respective categories too
      // Map display category names to database category names (handle both cases)
      const categoryMapping: { [key: string]: string } = {
        'rings': 'rings',
        'necklaces': 'necklaces', 
        'pendants': 'pendants',
        'earrings': 'earrings',
        'bracelets': 'bracelets',
        'bangles': 'bangles',
        'watches': 'watches',
        'mens_jewellery': 'mens_jewellery',
        'mens': 'mens_jewellery',
        'children_jewellery': 'children_jewellery',
        'children': 'children_jewellery',
        'materials': 'materials',
        'collections': 'collections',
        'custom_jewellery': 'custom_jewellery',
        'custom': 'custom_jewellery',
        'new_arrivals': 'new_arrivals',
        'anklets': 'anklets & toe rings' // Handle compound category names
      };
      const mappedCategory = categoryMapping[category.toLowerCase()] || category.toLowerCase();
      return product.category.toLowerCase() === mappedCategory.toLowerCase();
    }).length;
  };

  const getMaterialCount = (material: string) => {
    return allProducts.filter(product => {
      // Don't exclude new arrivals - they should be counted in their material categories too
      // Use metalType field for broad material categorization instead of material field
      return product.metalType === material;
    }).length;
  };

  // Material-based collections
  const goldProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'GOLD' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  const silverProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'SILVER' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  const diamondProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'DIAMOND' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  // Platinum Products
  const platinumProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'PLATINUM' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  // Gemstone Products  
  const gemstoneProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'GEMSTONE' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  // Pearl Products
  const pearlProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'PEARL' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  // Gold Plated Silver Products
  const goldPlatedSilverProducts = useMemo(() => 
    allProducts.filter(product => 
      product.material?.includes('GOLD_PLATED_SILVER') && !product.isNewArrival
    ).slice(0, 8), 
    [allProducts]
  );

  // Other Products
  const otherProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'OTHER' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  // New Arrivals - Products specifically marked as new arrivals
  const newArrivalProducts = useMemo(() => {    
    return allProducts
      .filter(product => product.isNewArrival) // Only products explicitly marked as new arrivals
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, 9);
  }, [allProducts]);

  // Enhanced Layout classes for home sections with modern designs
  const getLayoutClasses = (layoutType: string, itemCount: number) => {
    switch (layoutType) {
      case 'featured':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 'mixed':
        return 'grid-cols-3 md:grid-cols-3 lg:grid-cols-4';
      case 'split':
        return 'grid-cols-1 md:grid-cols-2 gap-0';
      case 'mosaic':
        return 'grid-cols-12 auto-rows-fr gap-6';
      case 'royal':
        return 'grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-6';
      case 'luxury':
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';
      case 'magazine':
        return 'grid-cols-12 auto-rows-[200px] gap-4';
      case 'floating':
        return 'grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3 lg:gap-4';
      default:
        return 'grid-cols-3 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  const getSizeClasses = (size: string, layoutType: string = 'default') => {
    if (layoutType === 'royal') {
      switch (size) {
        case 'small':
          return 'col-span-2 row-span-2';
        case 'medium':
          return 'col-span-3 row-span-3';
        case 'large':
          return 'col-span-4 row-span-4';
        case 'xlarge':
          return 'col-span-6 row-span-4';
        default:
          return 'col-span-2 row-span-2';
      }
    } else if (layoutType === 'magazine') {
      switch (size) {
        case 'small':
          return 'col-span-3 row-span-1';
        case 'medium':
          return 'col-span-4 row-span-2';
        case 'large':
          return 'col-span-6 row-span-3';
        case 'xlarge':
          return 'col-span-8 row-span-2';
        default:
          return 'col-span-4 row-span-2';
      }
    } else {
      switch (size) {
        case 'small':
          return 'col-span-1';
        case 'large':
          return 'col-span-2 row-span-2';
        default:
          return 'col-span-1';
      }
    }
  };

  // If secondary page is enabled, show royal layout
  if (isSecondaryPageEnabled) {
    return (
      <RoyalSecondaryHomePage 
        allProducts={allProducts}
        selectedCurrency={selectedCurrency}
      />
    );
  }

  // Regular homepage layout
  return (
    <div className="min-h-screen" data-testid="page-home" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
      />

      {/* Hero Section - Find Your Perfect Match */}
      <section className="py-8 md:py-12" data-testid="section-hero" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
        <div className="px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Find Your Perfect Match
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-600 mb-6">
            Shop by Categories
          </p>
        </div>
      </section>

      {/* Categories Horizontal Scroll */}
      <CategoriesScrollSection categories={categories} handleViewAllClick={handleViewAllClick} />

      {/* Section Divider - hidden for festival sections */}
      {homeSections.length > 0 && !homeSections.some(s => s.layoutType === 'festival') && (
        <div className="w-full border-t border-gray-200 my-8"></div>
      )}

      {/* Custom Admin Sections */}
      {homeSections.length > 0 && homeSections.map((section) => {
        if (section.items.length === 0) return null;
        
        // Countdown Offers Banner - Ultra Modern Style with Enhanced Animations
        if (section.layoutType === 'countdown-offers') {
          return (
            <section 
              key={section.id} 
              className="w-full relative py-16 md:py-24 overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{
                background: `
                  linear-gradient(135deg, #0a0a1f 0%, #1a1a3e 25%, #2d2d5f 50%, #4a4a80 75%, #6767a1 100%),
                  radial-gradient(ellipse 1200px 600px at 30% 20%, rgba(139, 69, 19, 0.2) 0%, transparent 70%),
                  radial-gradient(ellipse 800px 400px at 70% 80%, rgba(255, 215, 0, 0.15) 0%, transparent 60%),
                  conic-gradient(from 45deg at 20% 50%, rgba(255, 215, 0, 0.1), transparent, rgba(255, 215, 0, 0.1))
                `,
                position: 'relative'
              }}
            >
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 5,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                {/* Premium geometric pattern */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.08'%3E%3Cpolygon points='60,30 90,90 30,90'/%3E%3Cpolygon points='60,30 90,90 30,90' transform='rotate(120 60 60)'/%3E%3Cpolygon points='60,30 90,90 30,90' transform='rotate(240 60 60)'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }} 
                />
                
                {/* Animated gradient orbs */}
                <motion.div
                  className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-tl from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: 2,
                    ease: "easeInOut"
                  }}
                />
              </div>

              <div className="relative z-10 container mx-auto px-4">
                {/* Enhanced Countdown Timer */}
                {section.showCountdown && section.countdownEndDate && (
                  <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center mb-16"
                  >
                    <motion.div 
                      className="inline-block relative"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Glowing border effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-3xl blur opacity-30 animate-pulse"></div>
                      
                      <div className="relative bg-gradient-to-br from-amber-500/25 to-orange-600/25 backdrop-blur-xl border border-amber-400/40 rounded-3xl p-8 shadow-2xl">
                        {/* Decorative corners */}
                        <div className="absolute top-4 left-4 w-3 h-3 border-l-2 border-t-2 border-amber-400/60"></div>
                        <div className="absolute top-4 right-4 w-3 h-3 border-r-2 border-t-2 border-amber-400/60"></div>
                        <div className="absolute bottom-4 left-4 w-3 h-3 border-l-2 border-b-2 border-amber-400/60"></div>
                        <div className="absolute bottom-4 right-4 w-3 h-3 border-r-2 border-b-2 border-amber-400/60"></div>
                        
                        <motion.h3 
                          className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 mb-6" 
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        >
                          {section.countdownTitle || 'Limited Time Offer'}
                        </motion.h3>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7, duration: 0.8 }}
                        >
                          <CountdownTimer 
                            targetDate={new Date(section.countdownEndDate)}
                            title={section.countdownTitle || 'Limited Time Offer'}
                            description={section.countdownDescription || undefined}
                          />
                        </motion.div>
                        
                        {section.countdownDescription && (
                          <motion.p 
                            className="text-amber-200/90 mt-4 text-lg font-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                          >
                            {section.countdownDescription}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Enhanced Main Banner Content */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                  {/* Left Side - Enhanced Content */}
                  <div className="space-y-10">
                    {/* Animated Premium Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -50, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 1, delay: 0.8, ease: "backOut" }}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/30 to-orange-600/30 backdrop-blur-xl border-2 border-amber-400/50 rounded-full px-8 py-4 shadow-lg"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="h-6 w-6 text-amber-400" />
                      </motion.div>
                      <span className="text-amber-100 font-bold tracking-wider text-sm uppercase">
                        Exclusive Collection
                      </span>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="h-4 w-4 text-orange-400" />
                      </motion.div>
                    </motion.div>

                    {/* Enhanced Main Heading with Stagger Effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.2, delay: 1 }}
                    >
                      <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      >
                        {section.title.split(' ').map((word, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 50, rotateX: -90 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ 
                              duration: 0.8, 
                              delay: 1.2 + (index * 0.15),
                              ease: "backOut"
                            }}
                            className="inline-block mr-4 text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-yellow-400 to-orange-500"
                            whileHover={{ scale: 1.05, y: -5 }}
                          >
                            {word}
                          </motion.span>
                        ))}
                      </motion.h1>
                    </motion.div>

                    {/* Enhanced Description with Typewriter Effect */}
                    {section.description && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 1.8 }}
                        className="relative"
                      >
                        <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-500 rounded-full opacity-60"></div>
                        <motion.p
                          className="text-xl md:text-2xl text-gray-200/90 font-light leading-relaxed max-w-2xl pl-6"
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                          whileHover={{ x: 5, color: "#fbbf24" }}
                          transition={{ duration: 0.3 }}
                        >
                          {section.description}
                        </motion.p>
                      </motion.div>
                    )}

                    {/* Enhanced CTA Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 2.2 }}
                      className="space-y-6"
                    >
                      
                      {/* Enhanced CTA Button */}
                      <motion.div
                        className="pt-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 2.5, ease: "backOut" }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.08, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative group"
                        >
                          {/* Glowing backdrop */}
                          <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                          
                          <Button
                            className="group relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-bold px-12 py-6 text-xl rounded-full shadow-2xl border-2 border-amber-400/50 backdrop-blur-sm transition-all duration-500"
                            onClick={() => window.location.href = '/collections'}
                            data-testid="button-explore-offers"
                          >
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            
                            {/* Pulsing border */}
                            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse"></div>
                            
                            <div className="relative flex items-center gap-4">
                              <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              >
                                <Gem className="h-7 w-7" />
                              </motion.div>
                              <span className="font-extrabold tracking-wide">Explore Offers</span>
                              <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              >
                                <ArrowRight className="h-6 w-6" />
                              </motion.div>
                            </div>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Enhanced Product Showcase */}
                  <motion.div
                    initial={{ opacity: 0, x: 100, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 1.8, delay: 0.6, ease: "backOut" }}
                    className="relative perspective-1000"
                  >
                    {section.items && section.items.length > 0 && (
                      <div className="relative">
                        {/* Floating decorative elements */}
                        <motion.div
                          className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-amber-400/30 to-orange-500/30 rounded-full blur-2xl"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.7, 0.3] 
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-tr from-purple-400/30 to-blue-500/30 rounded-full blur-xl"
                          animate={{ 
                            scale: [1.2, 1, 1.2],
                            opacity: [0.4, 0.8, 0.4] 
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        />

                        {/* Enhanced Product Showcase Container */}
                        <motion.div 
                          className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-10 shadow-2xl"
                          whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" 
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          {/* Premium header */}
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="text-center mb-8"
                          >
                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 mb-2">
                              Featured Collection
                            </h3>
                            <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto"></div>
                          </motion.div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {section.items.slice(0, 4).map((item, index) => (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ 
                                  duration: 0.8, 
                                  delay: 1.8 + (index * 0.2),
                                  ease: "backOut"
                                }}
                                whileHover={{ 
                                  scale: 1.05, 
                                  y: -10,
                                  rotateY: 5,
                                  rotateX: 5 
                                }}
                                className="group cursor-pointer"
                                onClick={() => handleViewAllClick(item.product.category)}
                                data-testid={`card-product-${item.product.id}`}
                              >
                                <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform-gpu">
                                  {/* Animated border glow */}
                                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-3xl opacity-0 group-hover:opacity-70 blur transition-opacity duration-500"></div>
                                  
                                  <div className="relative">
                                    <div className="aspect-square relative overflow-hidden">
                                      <motion.img
                                        src={item.customImageUrl || item.product.images?.[0] || ringsImage}
                                        alt={item.product.name}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.15, rotate: 2 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                      />
                                      
                                      {/* Enhanced offer badge */}
                                      <motion.div 
                                        className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs px-3 py-2 rounded-full font-bold shadow-lg"
                                        animate={{ 
                                          scale: [1, 1.1, 1],
                                          boxShadow: ["0 4px 8px rgba(0,0,0,0.2)", "0 8px 16px rgba(245, 158, 11, 0.4)", "0 4px 8px rgba(0,0,0,0.2)"]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                      >
                                        ✨ OFFER
                                      </motion.div>
                                      
                                      {/* Hover overlay */}
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    
                                    <div className="p-6">
                                      <motion.h4 
                                        className="font-bold text-gray-800 text-sm mb-3 line-clamp-2"
                                        whileHover={{ color: "#f59e0b" }}
                                      >
                                        {item.displayName || item.product.name}
                                      </motion.h4>
                                    <div className="flex items-center justify-between">
                                      <div className="text-lg font-bold text-amber-600">
                                        {selectedCurrency === 'INR' ? '₹' : 'BD '}
                                        {selectedCurrency === 'INR' ? 
                                          parseFloat(item.product.priceInr).toLocaleString('en-IN') :
                                          parseFloat(item.product.priceBhd).toLocaleString('en-BH', { minimumFractionDigits: 3 })
                                        }
                                      </div>
                                      <Star className="h-4 w-4 text-amber-500 fill-current" />
                                    </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Floating Elements */}
                          <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-lg opacity-60 animate-pulse"></div>
                          <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </section>
          );
        }
        
        // Split layout rendering - Elegant Design matching reference image
        if (section.layoutType === 'split') {
          return (
            <section 
              key={section.id} 
              className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                backgroundImage: `url(${newArrivalsBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/20"></div>

              {/* Section Header */}
              <div className="relative z-20 text-left mb-8 md:mb-16 max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {section.title || 'New Arrivals'}
                </h2>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/80 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <span className="text-amber-600">✦</span>
                    <span>500+ New Items</span>
                  </div>
                </div>
                <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                  {section.description || 'New Arrivals Dropping Daily, Monday through Friday. Explore the Latest Launches Now!'}
                </p>
              </div>
              
              {/* Split Layout Container */}
              <div className="relative z-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  
                  {/* Left Half - First Category */}
                  <div 
                    className="relative cursor-pointer group transition-all duration-500 hover:scale-[1.02] min-h-[300px] md:min-h-[400px] overflow-hidden rounded-2xl md:rounded-3xl"
                    onClick={() => handleViewAllClick(section.items[0]?.product?.category || 'mangalsutra')}
                  >
                    {/* Content Container */}
                    <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-center">
                      {/* Category Image */}
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <img
                            src={section.items[0]?.product?.images?.[0] || mangalsutraImage}
                            alt={section.items[0]?.product?.name || 'Mangalsutra'}
                            className="max-w-full h-40 md:h-56 object-contain filter drop-shadow-lg transform transition-all duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>

                  {/* Right Half - Second Category */}
                  <div 
                    className="relative cursor-pointer group transition-all duration-500 hover:scale-[1.02] min-h-[300px] md:min-h-[400px] overflow-hidden rounded-2xl md:rounded-3xl"
                    onClick={() => handleViewAllClick(section.items[1]?.product?.category || 'pendants')}
                  >
                    {/* Content Container */}
                    <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-center">
                      {/* Category Image */}
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <img
                            src={section.items[1]?.product?.images?.[0] || pendantsImage}
                            alt={section.items[1]?.product?.name || 'Pendants'}
                            className="max-w-full h-40 md:h-56 object-contain filter drop-shadow-lg transform transition-all duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>

                </div>
                
                {/* Bottom Section Titles - Compact and Small */}
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-7xl mx-auto">
                  {/* Left Category Title - Blue */}
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleViewAllClick(section.items[0]?.product?.category || 'mangalsutra')}
                  >
                    <div 
                      className="rounded-lg py-2 px-4"
                      style={{ 
                        background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 50%, #2A5F94 100%)',
                      }}
                    >
                      <h3 className="text-sm md:text-base font-light text-white text-center tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {section.items[0]?.product?.category || 'Bracelets'}
                      </h3>
                    </div>
                  </div>

                  {/* Right Category Title - Dark */}
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleViewAllClick(section.items[1]?.product?.category || 'pendants')}
                  >
                    <div 
                      className="rounded-lg py-2 px-4"
                      style={{ 
                        background: 'linear-gradient(135deg, #2D3748 0%, #1A202C 50%, #171923 100%)',
                      }}
                    >
                      <h3 className="text-sm md:text-base font-light text-white text-center tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {section.items[1]?.product?.category || 'Nose Jewellery'}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Carousel layout rendering - Elegant horizontal sliding showcase
        if (section.layoutType === 'carousel') {
          return (
            <section 
              key={section.id} 
              className="py-16 overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)'
              }}
            >
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-5xl font-light text-gray-800 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{section.description}</p>
                  )}
                </div>
                
                {/* Horizontal Scrolling Carousel */}
                <div className="relative">
                  <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {section.items.map((item, index) => (
                      <div key={item.id} className="flex-none w-72 md:w-80">
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 to-amber-400/20 rounded-2xl transform rotate-1 transition-transform group-hover:rotate-2"></div>
                          <div className="relative bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                            <ProductCard
                              product={item.product}
                              currency={selectedCurrency}
                              showActions={false}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Scroll Indicators */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {section.items.map((_, index) => (
                      <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Ultra-Modern Elegant Mosaic Layout - Completely Redesigned
        if (section.layoutType === 'mosaic') {
          return (
            <section 
              key={section.id} 
              className="relative min-h-screen overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{
                background: `
                  linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #f8fafc 75%, #ffffff 100%),
                  radial-gradient(circle at 20% 80%, #ddd6fe22 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, #fbbf2422 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, #06b6d422 0%, transparent 50%)
                `
              }}
            >
              {/* Ultra-Modern Background Effects */}
              <div className="absolute inset-0">
                {/* Floating Glass Morphism Elements */}
                <motion.div
                  className="absolute top-20 left-20 w-96 h-96 rounded-full"
                  style={{
                    background: 'linear-gradient(45deg, rgba(139, 69, 19, 0.03), rgba(184, 134, 11, 0.05))',
                    backdropFilter: 'blur(60px)',
                    filter: 'blur(1px)'
                  }}
                  animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute top-40 right-32 w-72 h-72 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.04), rgba(168, 85, 247, 0.03))',
                    backdropFilter: 'blur(80px)',
                  }}
                  animate={{
                    x: [0, -40, 0],
                    y: [0, 40, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Ultra-Modern Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: `
                      linear-gradient(90deg, #000 1px, transparent 1px),
                      linear-gradient(0deg, #000 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                  }}
                />

                {/* Floating Particles */}
                <div className="absolute inset-0">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-amber-200 to-amber-300 opacity-20"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -100, 0],
                        opacity: [0.1, 0.3, 0.1],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: Math.random() * 10 + 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 10,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="relative z-10 max-w-[1600px] mx-auto px-8 py-20">
                {/* Ultra-Modern Header */}
                <div className="text-center mb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                  >
                    {/* Minimalist Line Accent */}
                    <div className="flex items-center justify-center mb-8">
                      <motion.div 
                        className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"
                        initial={{ width: 0 }}
                        whileInView={{ width: 200 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </div>

                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-extralight text-slate-800 mb-6 tracking-[-0.02em] leading-none" 
                        style={{ 
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontWeight: 200,
                        }}>
                      {section.title || 'MOSAIC'}
                    </h2>

                    <motion.div
                      className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"
                      initial={{ width: 0 }}
                      whileInView={{ width: 300 }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                    />

                    {section.description && (
                      <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
                        {section.description}
                      </p>
                    )}
                  </motion.div>
                </div>
                
                {/* Revolutionary Mosaic Grid */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-min"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  {section.items.map((item, index) => {
                    // Dynamic column spans for ultra-modern asymmetric layout
                    const spans = [
                      'md:col-span-7 md:row-span-2', // Large feature
                      'md:col-span-5 md:row-span-1', // Medium
                      'md:col-span-4 md:row-span-1', // Small
                      'md:col-span-8 md:row-span-1', // Wide
                      'md:col-span-6 md:row-span-2', // Tall
                      'md:col-span-6 md:row-span-1', // Medium
                      'md:col-span-5 md:row-span-1', // Small
                      'md:col-span-7 md:row-span-1', // Wide
                    ];
                    const span = spans[index % spans.length];
                    
                    // Dynamic heights for sophisticated variety
                    const heights = [
                      'min-h-[500px] md:min-h-[600px]', // Extra large
                      'min-h-[350px] md:min-h-[400px]', // Large
                      'min-h-[280px] md:min-h-[320px]', // Medium
                      'min-h-[300px] md:min-h-[350px]', // Medium-large
                      'min-h-[450px] md:min-h-[500px]', // Large
                      'min-h-[320px] md:min-h-[380px]', // Medium
                      'min-h-[250px] md:min-h-[300px]', // Small
                      'min-h-[380px] md:min-h-[420px]', // Large
                    ];
                    const height = heights[index % heights.length];
                    
                    return (
                      <motion.div
                        key={item.id}
                        className={`${span} ${height} group cursor-pointer relative`}
                        initial={{ opacity: 0, y: 60, scale: 0.9 }}
                        whileInView={{ 
                          opacity: 1, 
                          y: 0, 
                          scale: 1,
                        }}
                        transition={{ 
                          duration: 0.8, 
                          ease: [0.16, 1, 0.3, 1], 
                          delay: index * 0.1 
                        }}
                        whileHover={{ 
                          y: -8,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                        onClick={() => handleViewAllClick(item.product.category)}
                      >
                        {/* Ultra-Modern Card Container */}
                        <div className="relative w-full h-full bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500">
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                          
                          {/* Glass Morphism Border Effect */}
                          <div className="absolute inset-0 rounded-3xl border border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                          {/* Modern Content Layout */}
                          <div className="relative z-10 flex flex-col h-full p-8">
                            
                            {/* Product Image Area */}
                            <div className="flex-1 flex items-center justify-center mb-6 relative">
                              {/* Background Glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-amber-100/30 rounded-2xl transform rotate-3 scale-105 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                              
                              <div className="relative z-10 w-full max-w-sm transform transition-all duration-500 group-hover:scale-105">
                                <ProductCard
                                  product={item.product}
                                  currency={selectedCurrency}
                                  showActions={false}
                                />
                              </div>
                            </div>

                            {/* Ultra-Modern Product Info */}
                            <div className="space-y-4">
                              
                              {/* Category Badge */}
                              <div className="flex items-center justify-between">
                                <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100/80 rounded-full tracking-wide uppercase backdrop-blur-sm">
                                  {item.product.category}
                                </span>
                                
                                {/* Modern Action Icon */}
                                <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 hover:scale-110">
                                  <ArrowRight className="w-4 h-4 text-slate-700" />
                                </div>
                              </div>

                              {/* Product Name */}
                              <h3 className="text-2xl md:text-3xl font-light text-slate-800 leading-tight mb-3 group-hover:text-slate-700 transition-colors duration-300" 
                                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300 }}>
                                {item.product.name}
                              </h3>

                              {/* Price with Modern Typography */}
                              <div className="flex items-center justify-between">
                                <div className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">
                                  {selectedCurrency === 'BHD' ? 'BD ' : '₹'}
                                  <span className="font-light">
                                    {selectedCurrency === 'BHD' 
                                      ? (parseFloat(item.product.priceBhd || '0')).toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
                                      : (parseFloat(item.product.priceInr || '0')).toLocaleString('en-IN')
                                    }
                                  </span>
                                </div>
                              </div>

                              {/* Minimal Divider */}
                              <div className="h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 origin-left" />
                              
                            </div>
                          </div>

                          {/* Ultra-Modern Hover Indicator */}
                          <div className="absolute bottom-4 left-4 right-4 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 origin-left" />
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
                
                {/* Ultra-Modern Footer */}
                <motion.div 
                  className="text-center mt-20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                >
                  <div className="flex items-center justify-center space-x-8">
                    <motion.div 
                      className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
                      initial={{ width: 0 }}
                      whileInView={{ width: 150 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                    <span className="text-sm text-slate-500 font-light tracking-[0.2em] uppercase">
                      Curated Excellence
                    </span>
                    <motion.div 
                      className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
                      initial={{ width: 0 }}
                      whileInView={{ width: 150 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              </div>
            </section>
          );
        }

        // Luxury layout rendering - Hero product with elegant arrangement
        if (section.layoutType === 'luxury') {
          const heroProduct = section.items[0];
          const otherProducts = section.items.slice(1);
          
          return (
            <section 
              key={section.id} 
              className="py-20" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)'
              }}
            >
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-6xl font-light text-gray-800 mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="text-xl font-light text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{section.description}</p>
                  )}
                </div>
                
                {heroProduct && (
                  <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Hero Product */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-300/30 to-yellow-400/20 rounded-3xl transform rotate-3"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-rose-300/20 to-pink-400/10 rounded-3xl transform -rotate-2"></div>
                      <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105">
                        <ProductCard
                          product={heroProduct.product}
                          currency={selectedCurrency}
                          showActions={false}
                        />
                        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          Featured
                        </div>
                      </div>
                    </div>
                    
                    {/* Supporting Content */}
                    <div className="space-y-8">
                      <div className="text-center lg:text-left">
                        <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                          Exquisite Craftsmanship
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          Discover our premium collection featuring the finest materials and exceptional artistry.
                        </p>
                      </div>
                      
                      {/* Mini Gallery */}
                      <div className="grid grid-cols-2 gap-4">
                        {otherProducts.slice(0, 4).map((item) => (
                          <div key={item.id} className="bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition-shadow">
                            <ProductCard
                              product={item.product}
                              currency={selectedCurrency}
                              showActions={false}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        }

        // New Arrivals layout rendering - Horizontal auto-scrolling layout
        if (section.layoutType === 'new-arrivals') {
          return <NewArrivalsSection key={section.id} section={section} selectedCurrency={selectedCurrency} />;
        }

        // 1x5 Tilted Grid Layout - Desktop 30-degree tilt effects
        if (section.layoutType === 'tilted-grid') {
          return (
            <div key={section.id}>
              {renderCountdownSection(section)}
              <TiltedGridSection section={section} selectedCurrency={selectedCurrency} />
            </div>
          );
        }

        // 3D Curved Carousel - True perspective 3D circular arrangement
        if (section.layoutType === 'curved-grid') {
          return <CurvedCarouselSection key={section.id} section={section} selectedCurrency={selectedCurrency} />;
        }

        // Magazine layout rendering - Luxury Editorial Design
        if (section.layoutType === 'magazine') {
          return (
            <section 
              key={section.id} 
              className="relative bg-gradient-to-br from-neutral-50 via-white to-stone-50/80 overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Universal Countdown Section */}
              <div className="relative z-20 container mx-auto px-4 pt-8">
                {renderCountdownSection(section)}
              </div>
              {/* Sophisticated Background Pattern */}
              <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 25px 25px, #000 1px, transparent 0), radial-gradient(circle at 75px 75px, #000 1px, transparent 0)`,
                  backgroundSize: '100px 100px'
                }}></div>
              </div>

              <div className="relative z-10">
                {/* Luxury Magazine Header */}
                <div className="py-20 md:py-32">
                  <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="text-center mb-20">
                      {/* Elegant Brand Mark */}
                      <div className="mb-12">
                        <div className="relative inline-block">
                          <div className="absolute -top-4 -left-8 w-16 h-16 border border-amber-200 rounded-full opacity-30"></div>
                          <div className="absolute -bottom-4 -right-8 w-12 h-12 border border-amber-300 rounded-full opacity-20"></div>
                          <div className="relative bg-white/80 backdrop-blur-sm border border-amber-100 rounded-full px-8 py-4 shadow-lg">
                            <span className="text-xs font-semibold tracking-[0.25em] text-amber-700 uppercase">
                              Palaniappa Exclusive
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Dramatic Typography */}
                      <div className="mb-8">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-thin text-neutral-900 mb-4 tracking-tight leading-[0.85]" 
                            style={{ fontFamily: 'Playfair Display, serif' }}>
                          {section.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 mt-8">
                          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                          <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                        </div>
                      </div>
                      
                      {section.description && (
                        <div className="max-w-4xl mx-auto">
                          <p className="text-xl md:text-2xl lg:text-3xl text-neutral-600 leading-relaxed font-light italic tracking-wide"
                             style={{ fontFamily: 'Playfair Display, serif' }}>
                            "{section.description}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Luxury Editorial Grid */}
                <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
                  {/* Main Feature Story */}
                  {section.items[0] && (
                    <div className="mb-16">
                      <div className="relative group">
                        {/* Hero Article */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                          {/* Large Image Section */}
                          <div className="lg:col-span-3 relative overflow-hidden">
                            <div className="aspect-[4/3] lg:aspect-[3/2] relative">
                              <ProductCard
                                product={section.items[0].product}
                                currency={selectedCurrency}
                                showActions={false}
                                customImageUrl={section.items[0].customImageUrl}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                              
                              {/* Floating Feature Badge */}
                              <div className="absolute top-8 left-8">
                                <div className="bg-amber-500 text-white px-6 py-3 rounded-full shadow-lg">
                                  <span className="text-sm font-semibold tracking-wide">COVER STORY</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Content Section */}
                          <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-neutral-50/50">
                            <div className="mb-6">
                              <span className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase mb-2 block">
                                {section.items[0].product.category}
                              </span>
                              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light text-neutral-900 leading-tight mb-6" 
                                  style={{ fontFamily: 'Playfair Display, serif' }}>
                                {section.items[0].product.name}
                              </h2>
                            </div>
                            
                            <p className="text-neutral-600 leading-relaxed text-lg mb-8 font-light">
                              {section.items[0].product.description || 'An extraordinary masterpiece that embodies the pinnacle of craftsmanship and design excellence.'}
                            </p>
                            
                            <div className="space-y-6">
                              <div className="flex items-center gap-4">
                                <span className="text-3xl font-light text-neutral-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                                  {selectedCurrency === 'INR' ? '₹' : 'BD'} {selectedCurrency === 'INR' ? section.items[0].product.priceInr?.toLocaleString() : Number(section.items[0].product.priceBhd)?.toFixed(3)}
                                </span>
                              </div>
                              <Button 
                                className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-medium tracking-wide transition-all duration-300 hover:shadow-xl group"
                              >
                                Discover More
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Secondary Articles Grid */}
                  {section.items.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                      {section.items.slice(1, 4).map((item, index) => (
                        <div key={item.id} className="group">
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-white/30 h-full">
                            <div className="aspect-[4/3] relative overflow-hidden">
                              <ProductCard
                                product={item.product}
                                currency={selectedCurrency}
                                showActions={false}
                                customImageUrl={item.customImageUrl}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                              
                              {/* Article Number */}
                              <div className="absolute top-4 right-4">
                                <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                                  <span className="text-xs font-bold text-neutral-700">{index + 2}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-6">
                              <div className="mb-3">
                                <span className="text-xs font-bold tracking-[0.15em] text-amber-600 uppercase">
                                  {item.product.category}
                                </span>
                              </div>
                              <h3 className="text-xl lg:text-2xl font-light text-neutral-900 leading-tight mb-4" 
                                  style={{ fontFamily: 'Playfair Display, serif' }}>
                                {item.product.name}
                              </h3>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-light text-neutral-700">
                                  {selectedCurrency === 'INR' ? '₹' : 'BD'} {selectedCurrency === 'INR' ? item.product.priceInr?.toLocaleString() : Number(item.product.priceBhd)?.toFixed(3)}
                                </span>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-amber-600 hover:bg-amber-50 hover:text-amber-700 p-2 rounded-full"
                                >
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Additional Items Grid */}
                  {section.items.length > 4 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                      {section.items.slice(4).map((item, index) => (
                        <div key={item.id} className="group">
                          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-100">
                            <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-neutral-50 to-stone-100">
                              <ProductCard
                                product={item.product}
                                currency={selectedCurrency}
                                showActions={false}
                                customImageUrl={item.customImageUrl}
                              />
                            </div>
                            <div className="p-4">
                              <span className="text-xs font-medium text-amber-600 uppercase tracking-wider block mb-2">
                                {item.product.category}
                              </span>
                              <h5 className="text-sm font-light text-neutral-900 leading-snug line-clamp-2">
                                {item.product.name}
                              </h5>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Luxury Editorial Footer */}
                  {section.items.length > 0 && (
                    <div className="relative mt-24 pt-16">
                      {/* Elegant Divider */}
                      <div className="flex items-center justify-center mb-16">
                        <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                        <div className="mx-8">
                          <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                        </div>
                        <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                      </div>
                      
                      {/* Closing Statement */}
                      <div className="text-center max-w-3xl mx-auto mb-12">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 mb-6 leading-tight" 
                            style={{ fontFamily: 'Playfair Display, serif' }}>
                          The Story Continues
                        </h3>
                        <p className="text-xl md:text-2xl text-neutral-600 font-light leading-relaxed italic mb-8">
                          "Each piece tells a story of timeless elegance and exceptional craftsmanship"
                        </p>
                        <div className="space-y-4">
                          <Button 
                            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-12 py-4 text-base font-medium rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 transform" 
                            onClick={() => window.location.href = '/collections'}
                          >
                            Explore Full Collection
                            <ArrowRight className="ml-3 h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        }

        // Festival layout rendering - Full background with overlay content
        if (section.layoutType === 'festival') {
          return (
            <section 
              key={section.id} 
              className="w-full relative overflow-hidden -mt-0 -mb-8 m-0 p-0" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Universal Countdown Section */}
              <div className="relative z-20 container mx-auto px-4 pt-8">
                {renderCountdownSection(section)}
              </div>
              {section.festivalImage ? (
                <div 
                  className="relative w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] m-0 p-0"
                  style={{
                    backgroundImage: `url("${section.festivalImage}")`,
                    backgroundSize: '120%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
                  
                  {/* Full content container */}
                  <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 h-full flex flex-col">
                    
                    {/* Header content */}
                    <div className="text-center mb-8">
                      {/* Main Heading */}
                      <h2 
                        className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3 leading-tight tracking-wide"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      >
                        {section.title}
                      </h2>
                      
                      {/* Italic subtitle */}
                      {section.subtitle && (
                        <p 
                          className="text-2xl md:text-3xl text-white/90 italic mb-6 font-light"
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                          {section.subtitle}
                        </p>
                      )}
                      
                      {/* Description */}
                      {section.description && (
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-lg mx-auto">
                          {section.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Products section with festival background */}
                    {section.items && section.items.length > 0 && (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-full max-w-5xl">
                          <FestivalScrollSection 
                            items={section.items} 
                            selectedCurrency={selectedCurrency} 
                            handleViewAllClick={handleViewAllClick} 
                          />
                          
                          {/* Call to Action Button */}
                          <div className="text-center mt-8">
                            <Button 
                              className="bg-white/90 hover:bg-white text-gray-900 px-8 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm" 
                              style={{ fontFamily: 'Cormorant Garamond, serif' }}
                              onClick={() => window.location.href = '/collections'}
                            >
                              View Full Collection
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div 
                  className="relative w-full min-h-[400px] md:min-h-[500px]"
                  style={{ 
                    background: 'linear-gradient(135deg, #B19CD9 0%, #C8A9DD 25%, #DEB4E2 50%, #E8BFE8 75%, #F0CAF0 100%)',
                  }}
                >
                  <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                      
                      {/* Left side - Text content */}
                      <div className="relative z-10 text-left">
                        {/* Main Heading */}
                        <h2 
                          className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-3 leading-tight tracking-wide"
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                          {section.title}
                        </h2>
                        
                        {/* Italic subtitle */}
                        {section.subtitle && (
                          <p 
                            className="text-2xl md:text-3xl text-gray-700 italic mb-6 font-light"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                          >
                            {section.subtitle}
                          </p>
                        )}
                        
                        {/* Description */}
                        {section.description && (
                          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                            {section.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Right side - Auto-scrolling 1x3 Product showcase */}
                      <div className="relative z-10">
                        <FestivalScrollSection 
                          items={section.items} 
                          selectedCurrency={selectedCurrency} 
                          handleViewAllClick={handleViewAllClick} 
                        />
                        
                        {/* Call to Action Button */}
                        <div className="text-center mt-6">
                          <Button 
                            className="bg-purple-700 hover:bg-purple-800 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg" 
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            onClick={() => window.location.href = '/collections'}
                          >
                            View Full Collection
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Only show products section if no festival image (fallback) */}
              {!section.festivalImage && section.items && section.items.length > 0 && (
                <section className="py-8 bg-white" data-testid={`${section.title.toLowerCase().replace(/\s+/g, '-')}-products`}>
                  <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <FestivalScrollSection 
                      items={section.items} 
                      selectedCurrency={selectedCurrency} 
                      handleViewAllClick={handleViewAllClick} 
                    />
                    
                    {/* Call to Action Button */}
                    <div className="text-center mt-8">
                      <Button 
                        className="bg-gray-900 hover:bg-gray-800 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg" 
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        onClick={() => window.location.href = '/collections'}
                      >
                        View Full Collection
                      </Button>
                    </div>
                  </div>
                </section>
              )}
            </section>
          );
        }

        // Festival Specials layout - New layout with countdown timers, special offers, and seasonal collections
        console.log('Section layout type:', section.layoutType, 'Section title:', section.title);
        if (section.layoutType === 'festival-specials') {
          console.log('✅ Rendering festival-specials layout!');
          return (
            <div key={section.id} data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}>
              {/* Festival Specials Header */}
              <section className="py-16 px-4 text-center" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
                <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {section.title || 'Festival Specials'}
                </h2>
                {section.subtitle && (
                  <p className="text-xl md:text-2xl font-light text-gray-600 mb-6">
                    {section.subtitle}
                  </p>
                )}
                {section.description && (
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {section.description}
                  </p>
                )}
              </section>

              {/* Countdown & Offers Section */}
              <section className="py-16 bg-gradient-to-br from-orange-50/50 to-amber-50/50">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Countdown Timer */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      {section.countdownEndDate ? (
                        <CountdownTimer
                          targetDate={new Date(section.countdownEndDate)}
                          title={section.countdownTitle || "Festival Sale Ends In"}
                          description={section.countdownDescription || "Don't miss out on these amazing deals!"}
                        />
                      ) : (
                        <div className="text-center p-6 text-gray-500">
                          <p>No countdown timer configured. Admin can set dates in the home sections management.</p>
                        </div>
                      )}
                    </motion.div>

                    {/* Featured Offer Banner */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg"
                    >
                      <OfferBanner
                        title="Limited Time Offer"
                        description="Extra savings on your favorite jewelry pieces. Shop now before time runs out!"
                        discountPercent={50}
                        validUntil={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
                        festivalName="Diwali"
                      />
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Actual Products Added by Admin */}
              <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{section.subtitle}</h3>
                  <p className="text-gray-600">{section.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <ProductCard
                        key={item.id}
                        product={item.product}
                        customImageUrl={item.customImageUrl || undefined}
                        displayName={item.displayName || undefined}
                        displayPriceInr={item.displayPriceInr || undefined}
                        displayPriceBhd={item.displayPriceBhd || undefined}
                        index={index}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          );
        }

        // Diamond layout rendering - Enhanced luxury diamond showcase with premium animations
        if (section.layoutType === 'diamond') {
          return (
            <section 
              key={section.id} 
              className="py-20 md:py-32 overflow-hidden relative min-h-screen" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 20%, #16213e 40%, #0f3460 60%, #533a7b 80%, #6a4c93 100%)',
              }}
            >
              {/* Universal Countdown Section */}
              <div className="relative z-20 container mx-auto px-4">
                {renderCountdownSection(section)}
              </div>
              {/* Enhanced Cosmic Background Effects */}
              <div className="absolute inset-0">
                {/* Floating particles */}
                <div className="absolute top-10 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-32 right-32 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-80" style={{ animationDelay: '3s' }}></div>
                
                {/* Large gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/30 to-orange-500/15 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-tl from-purple-400/25 to-blue-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-violet-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                
                {/* Sparkle effects */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-pulse opacity-30"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 4}s`,
                        animationDuration: `${2 + Math.random() * 3}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                  <div className="mb-8">
                    <div className="inline-block">
                      <h2 className="text-5xl md:text-8xl font-extralight text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-200 to-orange-300 mb-6 tracking-widest animate-pulse" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {section.title || 'DIAMOND COLLECTION'}
                      </h2>
                      <div className="w-48 h-1 bg-gradient-to-r from-transparent via-amber-400 via-white to-transparent mx-auto mb-6 animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-white/90 text-xl md:text-2xl font-light max-w-4xl mx-auto leading-relaxed">{section.description || 'Discover the brilliance of our exclusive diamond collection, where each piece reflects pure luxury and timeless elegance'}</p>
                </div>

                <div className="relative">
                  {/* Enhanced Central Diamond */}
                  <div className="flex justify-center mb-16">
                    <div className="relative">
                      {/* Rotating ring around central diamond */}
                      <div className="absolute inset-0 w-80 h-80 md:w-96 md:h-96 border border-amber-400/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                      <div className="absolute inset-4 w-72 h-72 md:w-88 md:h-88 border border-purple-400/20 rounded-full animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}></div>
                      
                      <div 
                        className="w-72 h-72 md:w-88 md:h-88 transform rotate-45 relative group cursor-pointer transition-all duration-1000 hover:scale-110 hover:rotate-[50deg]"
                        onClick={() => section.items[0] && handleViewAllClick('featured')}
                      >
                        {/* Multiple gradient layers for depth */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/40 via-orange-500/30 to-yellow-600/20 rounded-3xl animate-pulse shadow-2xl"></div>
                        <div className="absolute inset-1 bg-gradient-to-tl from-white/20 via-transparent to-purple-400/10 rounded-3xl"></div>
                        <div className="absolute inset-2 bg-gradient-to-br from-transparent via-amber-300/15 to-transparent rounded-2xl"></div>
                        
                        {/* Glowing border effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/50 via-white/30 to-purple-400/50 p-0.5">
                          <div className="w-full h-full bg-black/20 rounded-3xl"></div>
                        </div>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-56 h-56 md:w-72 md:h-72 -rotate-45 overflow-hidden rounded-3xl shadow-2xl border border-white/20">
                            {section.items[0] && (
                              <img
                                src={section.items[0].product.images?.[0] || ringsImage}
                                alt="Featured Diamond Piece"
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                              <div className="text-center w-full">
                                <h3 className="text-white font-light text-xl md:text-2xl mb-3 tracking-wide">SIGNATURE PIECE</h3>
                                <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-white mx-auto"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Premium badge */}
                        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black px-6 py-3 rounded-full text-sm font-bold shadow-2xl border border-white/30 animate-pulse">
                          PREMIUM
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Surrounding Diamonds with Better Layout */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-16">
                    {section.items.slice(1, 5).map((item, index) => (
                      <div key={item.id} className="flex justify-center">
                        <div 
                          className="w-36 h-36 md:w-48 md:h-48 transform rotate-45 relative group cursor-pointer transition-all duration-700 hover:scale-110 hover:rotate-[50deg]"
                          onClick={() => handleViewAllClick('rings')}
                        >
                          {/* Enhanced gradient effects */}
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/25 via-blue-500/20 to-indigo-600/15 rounded-2xl animate-pulse shadow-xl" style={{ animationDelay: `${index * 300}ms` }}></div>
                          <div className="absolute inset-1 bg-gradient-to-tl from-white/15 to-transparent rounded-2xl"></div>
                          
                          {/* Glowing border */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/40 via-blue-400/30 to-indigo-400/40 p-0.5">
                            <div className="w-full h-full bg-black/20 rounded-2xl"></div>
                          </div>
                          
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-28 h-28 md:w-40 md:h-40 -rotate-45 overflow-hidden rounded-xl shadow-xl border border-white/20">
                              <img
                                src={item.product.images?.[0] || [necklacesImage, earringsImage, pendantsImage, banglesImage][index]}
                                alt={`Diamond ${index + 1}`}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                          </div>
                          
                          {/* Price display */}
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 -rotate-45 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                            {selectedCurrency === 'BHD' ? `${item.product.priceBhd} BHD` : `₹${item.product.priceInr}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Call to Action Section */}
                  <div className="text-center">
                    <div className="mb-8">
                      <h3 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        Experience Diamond Perfection
                      </h3>
                      <p className="text-white/80 text-lg max-w-2xl mx-auto">
                        Each diamond tells a story of brilliance, cut to perfection and set with unmatched craftsmanship
                      </p>
                    </div>
                    <button 
                      className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:via-yellow-500 hover:to-amber-600 text-black px-12 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 transform border border-white/20"
                      onClick={() => window.location.href = '/collections/diamond'}
                    >
                      Explore Diamond Collection
                      <span className="ml-2 text-xl">💎</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Premium Layout - Modern Asymmetric Masonry Layout
        if (section.layoutType === 'premium') {
          return (
            <section 
              key={section.id} 
              className="py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Universal Countdown Section */}
              <div className="relative z-20 container mx-auto px-4">
                {renderCountdownSection(section)}
              </div>
              <div className="max-w-7xl mx-auto px-6">
                {/* Modern Header */}
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wide">
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                      {section.description}
                    </p>
                  )}
                </div>
                
                {/* Asymmetric Masonry Grid - Desktop Quality Mobile */}
                {section.items && section.items.length > 0 && (
                  <div className="relative">
                    {/* Mobile: Same sophisticated structure as desktop */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mb-16">
                      {section.items.map((item, index) => {
                        // Dynamic sizing pattern - Desktop Experience on Mobile
                        const getCardSize = (index: number) => {
                          const patterns = [
                            'col-span-2 row-span-2 md:col-span-2 md:row-span-2', // Large featured
                            'col-span-1 row-span-1 md:col-span-1 md:row-span-1', // Small
                            'col-span-2 row-span-1 md:col-span-2 md:row-span-1', // Wide
                            'col-span-1 row-span-2 md:col-span-1 md:row-span-2', // Tall
                            'col-span-1 row-span-1 md:col-span-1 md:row-span-1', // Small
                            'col-span-2 row-span-1 md:col-span-2 md:row-span-1', // Wide
                          ];
                          return patterns[index % patterns.length];
                        };
                        
                        const cardSize = getCardSize(index);
                        const isLarge = cardSize.includes('span-2');
                        
                        return (
                          <div 
                            key={item.id} 
                            className={`group relative cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95 hover:z-10 ${cardSize}`}
                            onClick={() => handleViewAllClick(item.product.category)}
                            style={{ 
                              animationDelay: `${index * 100}ms`,
                              animation: 'slideUp 0.6s ease-out forwards'
                            }}
                          >
                            <div className="relative h-full bg-white rounded-2xl shadow-lg group-hover:shadow-2xl group-active:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:border-amber-200 min-h-[280px] sm:min-h-[320px]">
                              {/* Premium Badge */}
                              <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                PREMIUM
                              </div>
                              
                              {/* Product Image Section - Premium Mobile Experience */}
                              <div className={`${isLarge ? 'h-48 sm:h-56 md:h-64' : 'h-32 sm:h-40 md:h-48'} overflow-hidden bg-gray-50 relative`}>
                                <ProductCard
                                  product={item.product}
                                  currency={selectedCurrency}
                                  showActions={false}
                                  customImageUrl={item.customImageUrl}
                                />
                              </div>
                              
                              {/* Content Section - Premium Mobile Design */}
                              <div className="p-3 sm:p-4 md:p-6">
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                                  {item.displayName || item.product.name}
                                </h3>
                                
                                <div className="flex items-center justify-between">
                                  <span className="text-base sm:text-lg md:text-2xl font-bold text-amber-600">
                                    {item.displayPrice || (selectedCurrency === 'INR' 
                                      ? `₹${item.product.priceInr?.toLocaleString()}` 
                                      : `BD ${Number(item.product.priceBhd)?.toFixed(3)}`)}
                                  </span>
                                  
                                  <div className="opacity-100 transition-opacity duration-300">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-amber-100 rounded-full flex items-center justify-center">
                                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Premium Tags - Mobile Optimized */}
                                {isLarge && (
                                  <div className="mt-2 sm:mt-3 md:mt-4 flex flex-wrap gap-1 sm:gap-2">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Handcrafted</span>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Limited Edition</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Modern CTA */}
                    <div className="text-center">
                      <button 
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        onClick={() => window.location.href = '/collections'}
                      >
                        View All Premium Collection
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <style>{`
                @keyframes slideUp {
                  from {
                    opacity: 0;
                    transform: translateY(40px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>
            </section>
          );
        }

        // ROYAL LAYOUT: Exact Layout from Reference Image
        if (section.layoutType === 'royal') {
          return (
            <motion.section 
              ref={royalContainerRef}
              key={section.id} 
              className="relative py-16 sm:py-20 lg:py-24"
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                background: `linear-gradient(135deg, ${section.backgroundColor || '#fff8e1'} 0%, #f5f5dc 50%, #faf0e6 100%)`
              }}
            >              
              {/* Universal Countdown Section */}
              <div className="relative z-20 container mx-auto px-4">
                {renderCountdownSection(section)}
              </div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <motion.div 
                  className="text-center mb-12 sm:mb-16"
                  initial={{ y: 30, opacity: 0 }}
                  animate={royalIsInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.h2 
                    className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 dark:text-gray-100 mb-4 tracking-wide"
                    style={{ fontFamily: 'serif' }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={royalIsInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {section.title}
                  </motion.h2>
                  
                  {section.description && (
                    <motion.p 
                      className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto"
                      initial={{ y: 15, opacity: 0 }}
                      animate={royalIsInView ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {section.description}
                    </motion.p>
                  )}
                </motion.div>

                {/* Main Layout - 3 Products Left + 1 Featured Right */}
                {section.items && section.items.length > 0 && (
                  <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8"
                    initial={{ opacity: 0, y: 40 }}
                    animate={royalIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    
                    {/* Left Side - 3 Product Grid */}
                    <div className="lg:col-span-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                        {section.items.slice(0, 3).map((item, index) => (
                          <motion.div 
                            key={item.id}
                            className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                            onClick={() => handleViewAllClick(item.product.category)}
                            initial={{ opacity: 0, y: 30 }}
                            animate={royalIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: 0.8 + (index * 0.15),
                              ease: "easeOut"
                            }}
                            whileHover={{ y: -4 }}
                          >
                            <div className="relative">
                              
                              {/* Product Image */}
                              <div className="aspect-square relative overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-700">
                                <img
                                  src={item.product.images?.[0] || ringsImage}
                                  alt={item.product.name || 'Product'}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                
                              </div>
                              
                              {/* Product Details */}
                              <div className="p-4">
                                <h3 className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base mb-2 line-clamp-1">
                                  {item.product.name}
                                </h3>
                                
                                <div className="text-lg font-semibold text-amber-600">
                                  {selectedCurrency === 'INR' ? '₹' : 'BD '}
                                  {selectedCurrency === 'INR' ? 
                                    parseFloat(item.product.priceInr).toLocaleString('en-IN') :
                                    parseFloat(item.product.priceBhd).toLocaleString('en-BH', { minimumFractionDigits: 3 })
                                  }
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Right Side - Featured Product */}
                    {section.items[0] && (
                      <motion.div 
                        className="lg:col-span-1"
                        initial={{ opacity: 0, x: 30 }}
                        animate={royalIsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                      >
                        <div 
                          className="group cursor-pointer bg-gray-900 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full"
                          onClick={() => handleViewAllClick(section.items[0].product.category)}
                        >
                          <div className="relative h-full flex flex-col">
                            
                            {/* Featured Badge */}
                            <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1.5 rounded z-10 font-medium">
                              FEATURED
                            </div>
                            
                            {/* Featured Product Image */}
                            <div className="flex-1 relative bg-gray-800">
                              <img
                                src={section.items[0].product.images?.[0] || ringsImage}
                                alt={section.items[0].product.name || 'Featured Product'}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              
                              {/* Dark overlay for better text contrast */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            </div>
                            
                            {/* Featured Product Details */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                              <h3 className="font-medium text-lg mb-2 leading-tight">
                                {section.items[0].product.name}
                              </h3>
                              <div className="text-xl font-semibold text-amber-600">
                                {selectedCurrency === 'INR' ? '₹' : 'BD '}
                                {selectedCurrency === 'INR' ? 
                                  parseFloat(section.items[0].product.priceInr).toLocaleString('en-IN') :
                                  parseFloat(section.items[0].product.priceBhd).toLocaleString('en-BH', { minimumFractionDigits: 3 })
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Navigation Arrows with Functionality */}
                <motion.div 
                  className="flex justify-center items-center gap-3 mt-8"
                  initial={{ opacity: 0 }}
                  animate={royalIsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                >
                  <button 
                    className="w-10 h-10 rounded-full bg-black hover:bg-gray-800 text-white transition-colors flex items-center justify-center shadow-lg"
                    onClick={() => window.location.href = '/collections'}
                    aria-label="View previous products"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 text-black border-2 border-gray-300 transition-colors flex items-center justify-center shadow-lg"
                    onClick={() => window.location.href = '/collections'}
                    aria-label="View more products"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            </motion.section>
          );
        }

        
        // Regular layout rendering
        return (
          <section 
            key={section.id} 
            className="py-12" 
            data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            style={{ 
              background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)'
            }}
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {section.title}
                </h2>
                {section.description && (
                  <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{section.description}</p>
                )}
              </div>
              <div className={`grid gap-4 md:gap-6 mb-10 ${getLayoutClasses(section.layoutType, section.items.length)}`}>
                {section.items.map((item) => (
                  <div key={item.id} className={getSizeClasses(item.size || 'normal')}>
                    <ProductCard
                      product={item.product}
                      currency={selectedCurrency}
                      showActions={false}
                      customImageUrl={item.customImageUrl}
                    />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button 
                  className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  onClick={() => window.location.href = '/collections'}
                >
                  View All <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          </section>
        );
      })}

      {/* Section Divider */}
      {homeSections.length > 0 && <div className="w-full border-t border-gray-200 my-8"></div>}

      {/* New Arrivals - Only show if no custom new-arrivals layout exists */}
      {newArrivalProducts.length > 0 && !homeSections.some(section => section.layoutType === 'new-arrivals') && (
        <section className="py-12" data-testid="section-new-arrivals" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>New Arrivals</h2>
              <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Latest additions to our collection</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {newArrivalProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                onClick={() => window.location.href = '/collections?category=new-arrivals'}
              >
                View All New Arrivals <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Section Divider */}
      {newArrivalProducts.length > 0 && <div className="w-full border-t border-gray-200 my-8"></div>}

      {/* Gold Plated Silver Collection */}
      {goldPlatedSilverProducts.length > 0 && (
        <section className="py-12" data-testid="section-gold-plated-silver-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Gold Plated Silver</h2>
              <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Affordable luxury with gold plated silver elegance</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {goldPlatedSilverProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                onClick={() => window.location.href = '/collections?material=gold-plated-silver'}
              >
                View Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Section Divider */}
      {goldPlatedSilverProducts.length > 0 && <div className="w-full border-t border-gray-200 my-8"></div>}

      {/* Material-Based Sections - Always show these regardless of custom sections */}
      
      {/* Gold Collection */}
      {goldProducts.length > 0 && (
        <section className="py-12" data-testid="section-gold-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Gold Collection</h2>
              <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Exquisite gold jewelry crafted to perfection</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {goldProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                onClick={() => window.location.href = '/collections?material=gold'}
              >
                View Gold Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Section Divider */}
      {goldProducts.length > 0 && <div className="w-full border-t border-gray-200 my-8"></div>}

      {/* Silver Collection */}
      {silverProducts.length > 0 && (
        <section className="py-12" data-testid="section-silver-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Silver Collection</h2>
              <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Elegant silver jewelry for every occasion</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {silverProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                onClick={() => window.location.href = '/collections?material=silver'}
              >
                View Silver Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Section Divider */}
      {silverProducts.length > 0 && <div className="w-full border-t border-gray-200 my-8"></div>}

      {/* Diamond Collection */}
      {diamondProducts.length > 0 && (
        <section className="py-12" data-testid="section-diamond-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Diamond Collection</h2>
              <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Brilliant diamonds for life's special moments</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {diamondProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                onClick={() => window.location.href = '/collections?material=diamond'}
              >
                View Diamond Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Platinum Collection */}
      {platinumProducts.length > 0 && (
        <section className="py-12" data-testid="section-platinum-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Platinum Collection</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Premium platinum jewelry for discerning taste</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {platinumProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?material=platinum'}
              >
                View Platinum Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Gemstone Collection */}
      {gemstoneProducts.length > 0 && (
        <section className="py-12" data-testid="section-gemstone-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Gemstone Collection</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Colorful gemstones for vibrant elegance</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {gemstoneProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?material=gemstone'}
              >
                View Gemstone Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Pearl Collection */}
      {pearlProducts.length > 0 && (
        <section className="py-12" data-testid="section-pearl-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Pearl Collection</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Timeless pearls for classic beauty</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {pearlProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?material=pearl'}
              >
                View Pearl Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}


      {/* Other Materials Collection */}
      {otherProducts.length > 0 && (
        <section className="py-12" data-testid="section-other-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Other Materials Collection</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Unique materials for distinctive styles</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {otherProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?material=other'}
              >
                View All Collections <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Watch and Shop Section */}
      <WatchAndShop />

      {/* Shop by Budget Section */}
      <ShopByBudgetSection selectedCurrency={selectedCurrency} />
      
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}