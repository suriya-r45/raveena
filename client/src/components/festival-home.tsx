import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Product } from '@shared/schema';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import WhatsAppFloat from '@/components/whatsapp-float';
import { Currency } from '@/lib/currency';
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Sparkles, 
  Crown, 
  Gift, 
  Star, 
  Diamond, 
  Gem, 
  Heart, 
  Award, 
  Zap, 
  ArrowRight, 
  Play, 
  ShoppingBag,
  Phone,
  MapPin,
  Clock,
  Check,
  Users,
  TrendingUp,
  Shield,
  Medal,
  BookOpen,
  Camera,
  Eye,
  Search,
  Calendar
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Import existing jewelry images
import luxuryNecklaceImage from '@assets/luxury-necklace.png';
import earringsLuxuryImage from '@assets/earrings_luxury.png';
import ringsLuxuryImage from '@assets/rings_luxury.png';
import braceletsHeroImage from '@assets/bracelets_hero.png';
import goldCollectionImage from '@assets/gold_collection_luxury.png';
import diamondCollectionImage from '@assets/diamond_collection_luxury_new.png';
import bridalCollectionsImage from '@assets/bridal_new.png';
import royalGoldImage from '@assets/Royal_gold_jewelry_collection_e293857a.png';
import goldCoinsImage from '@assets/HD_luxury_gold_coins_31016b54.png';

// Enhanced Animation Components
function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating Sparkles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100, -20],
            x: [-10, 10, -10],
            rotate: [0, 360],
            scale: [0.5, 1.5, 0.5],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-3 h-3 text-amber-400/40" />
        </motion.div>
      ))}
      
      {/* Floating Diamonds */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`diamond-${i}`}
          className="absolute text-blue-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80],
            rotate: [0, 180],
            scale: [0.3, 1.2, 0.3],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        >
          <Diamond className="w-4 h-4" />
        </motion.div>
      ))}
      
      {/* Floating Hearts */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-pink-400/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [10, -120, 10],
            x: [-5, 5, -5],
            rotate: [0, 15, -15, 0],
            scale: [0.4, 1.3, 0.4],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 12 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          <Heart className="w-3 h-3" />
        </motion.div>
      ))}
    </div>
  );
}

// Animated Background Gradient
function AnimatedGradientBg() {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        background: [
          "radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.15) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 80% 20%, rgba(139, 69, 19, 0.1) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.05) 0%, rgba(0, 0, 0, 0) 50%)",
          "radial-gradient(circle at 80% 50%, rgba(251, 191, 36, 0.15) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.1) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 60% 80%, rgba(139, 69, 19, 0.05) 0%, rgba(0, 0, 0, 0) 50%)",
          "radial-gradient(circle at 40% 30%, rgba(168, 85, 247, 0.15) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 70% 70%, rgba(251, 191, 36, 0.1) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 20% 90%, rgba(139, 69, 19, 0.05) 0%, rgba(0, 0, 0, 0) 50%)",
          "radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.15) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 80% 20%, rgba(139, 69, 19, 0.1) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.05) 0%, rgba(0, 0, 0, 0) 50%)"
        ]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

// Typing Effect Animation
function TypingEffect({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        setShowCursor(false);
      }
    }, delay);
    
    return () => clearTimeout(startTimeout);
  }, [currentIndex, text, delay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayText}
      {showCursor && currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}

// Luxury Collections Data with real images
const luxuryCollections = [
  {
    id: 1,
    name: "Royal Gold Collection",
    description: "Handcrafted masterpieces in pure gold",
    image: royalGoldImage,
    itemCount: 156,
    startingPrice: "₹25,999",
    category: "GOLD",
    gradient: "from-amber-400 via-yellow-500 to-amber-600",
    badge: "BESTSELLER"
  },
  {
    id: 2,
    name: "Diamond Elegance",
    description: "Brilliant diamonds, timeless design", 
    image: diamondCollectionImage,
    itemCount: 89,
    startingPrice: "₹45,999",
    category: "DIAMOND",
    gradient: "from-blue-400 via-cyan-500 to-blue-600",
    badge: "EXCLUSIVE"
  },
  {
    id: 3,
    name: "Bridal Heritage",
    description: "Traditional meets contemporary elegance",
    image: bridalCollectionsImage,
    itemCount: 124,
    startingPrice: "₹35,999",
    category: "BRIDAL",
    gradient: "from-rose-400 via-pink-500 to-rose-600",
    badge: "TRENDING"
  },
  {
    id: 4,
    name: "Premium Earrings",
    description: "Exquisite designs for every occasion",
    image: earringsLuxuryImage,
    itemCount: 78,
    startingPrice: "₹12,999",
    category: "EARRINGS",
    gradient: "from-purple-400 via-violet-500 to-purple-600",
    badge: "NEW"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Absolutely stunning jewelry! The craftsmanship is exceptional and the service was outstanding.",
    product: "Diamond Necklace Set",
    verified: true
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi",
    rating: 5,
    text: "Perfect choice for my daughter's wedding. The quality exceeded our expectations.",
    product: "Bridal Gold Set",
    verified: true
  },
  {
    id: 3,
    name: "Anita Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "Beautiful designs and excellent value. Will definitely shop here again!",
    product: "Gold Earrings",
    verified: true
  }
];

const whyChooseUs = [
  {
    icon: Shield,
    title: "100% Certified",
    description: "All jewelry comes with authenticity certificates"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Handcrafted by skilled artisans with attention to detail"
  },
  {
    icon: Users,
    title: "50,000+ Happy Customers",
    description: "Trusted by families across the country"
  },
  {
    icon: Clock,
    title: "Lifetime Support",
    description: "Free maintenance and repairs for life"
  }
];

// Hero Section Component
function UltraModernHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  
  const heroSlides = [
    {
      title: "Luxury Redefined",
      subtitle: "Discover Our Exclusive Collection",
      image: luxuryNecklaceImage,
      cta: "Explore Now"
    },
    {
      title: "Timeless Elegance", 
      subtitle: "Handcrafted Perfection",
      image: goldCollectionImage,
      cta: "Shop Collection"
    },
    {
      title: "Brilliant Moments",
      subtitle: "Diamond Excellence", 
      image: diamondCollectionImage,
      cta: "Discover Diamonds"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Enhanced Animated Background */}
      <AnimatedGradientBg />
      <FloatingElements />
      
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* Enhanced Grid Pattern with Animation */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:60px_60px]" />
        </motion.div>
        
        {/* Enhanced Pulsing Rings */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full rounded-full border border-amber-400/20" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 mb-6"
              >
                <Diamond className="w-4 h-4 text-amber-400" />
                <span className="text-white/90 text-sm font-medium">LUXURY COLLECTION 2024</span>
              </motion.div>
              
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8 }}
                  className="text-6xl lg:text-8xl font-black text-white mb-6 leading-tight"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>
              </AnimatePresence>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl text-white/80 mb-8 font-light"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>
              </AnimatePresence>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold px-8 py-4 text-lg hover:from-amber-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300"
                  data-testid="button-hero-cta"
                >
                  <span>{heroSlides[currentSlide].cta}</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
                  data-testid="button-watch-story"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Our Story
                </Button>
              </motion.div>
              
            </motion.div>

            {/* Image Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full blur-3xl transform scale-150" />
                
                {/* Main Image Container */}
                <div className="relative z-10 aspect-square rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={heroSlides[currentSlide].image}
                      alt={heroSlides[currentSlide].title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.8 }}
                    />
                  </AnimatePresence>
                  
                  {/* Overlay Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-blue-500/10" />
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400/30 to-yellow-500/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-blue-400/20 to-purple-500/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                />
              </div>
              
              {/* Slide Indicators */}
              <div className="flex justify-center space-x-2 mt-8">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 w-8' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    data-testid={`indicator-slide-${index}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-center"
      >
        <div className="text-sm mb-2">Scroll to explore</div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function FestivalHomePage() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('INR');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Fetch products for featured sections
  const { data: allProducts = [] } = useQuery({
    queryKey: ['/api/products'],
    queryFn: () => apiRequest('/api/products'),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Ensure products is an array and filter for sections
  const products = Array.isArray(allProducts) ? allProducts as Product[] : [];
  
  const featuredProducts = products
    .filter(product => product.isFeatured)
    .slice(0, 8);

  const newArrivalProducts = products
    .filter(product => product.isNewArrival)
    .slice(0, 6);

  const goldProducts = products
    .filter(product => product.metalType === 'GOLD' || product.metalType === 'GOLD_18K' || product.metalType === 'GOLD_22K')
    .slice(0, 8);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header 
        selectedCurrency={selectedCurrency} 
        onCurrencyChange={setSelectedCurrency} 
      />
      
      {/* Ultra Modern Hero Section */}
      <UltraModernHero />

      {/* Luxury Collections Showcase */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
            >
              <Crown className="w-5 h-5 text-amber-400" />
              <span className="text-white/80 font-medium tracking-wider text-sm">LUXURY COLLECTIONS</span>
            </motion.div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Crafted for
              <span className="block bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                Perfection
              </span>
            </h2>
            
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Discover our curated collections where traditional craftsmanship meets contemporary design.
            </p>
          </motion.div>

          {/* Enhanced Collections Grid with Advanced Animations */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {luxuryCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ 
                  duration: 1.2, 
                  delay: index * 0.3,
                  ease: "backOut",
                  type: "spring",
                  bounce: 0.4
                }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group cursor-pointer perspective-1000"
                data-testid={`collection-card-${collection.id}`}
              >
                <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 transform-gpu">
                  {/* Enhanced Background Glow with Animation */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-3xl`}
                    whileHover={{
                      scale: [1, 1.2, 1.1],
                      opacity: [0, 0.15, 0.1]
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Animated Sparkle Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-400 rounded-full"
                        style={{
                          left: `${20 + (i * 10)}%`,
                          top: `${20 + (i * 8)}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ 
                          scale: [0, 1.5, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          delay: 0.5 + (i * 0.1),
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Enhanced Badge with Animation */}
                  <motion.div 
                    className="absolute top-6 right-6 z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring", bounce: 0.5 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Badge className={`bg-gradient-to-r ${collection.gradient} text-white border-none font-bold relative overflow-hidden`}>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">{collection.badge}</span>
                    </Badge>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                    {/* Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-64 h-64 lg:w-48 lg:h-48 relative">
                        {/* Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${collection.gradient} opacity-20 rounded-2xl blur-xl scale-110`} />
                        
                        {/* Image Container */}
                        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10">
                          <img
                            src={collection.image}
                            alt={collection.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>
                        
                        {/* Floating Stats */}
                        <motion.div
                          className="absolute -bottom-4 -right-4 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
                        >
                          <div className="text-center">
                            <div className={`text-lg font-bold bg-gradient-to-r ${collection.gradient} bg-clip-text text-transparent`}>
                              {collection.itemCount}+
                            </div>
                            <div className="text-xs text-white/60">Designs</div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-amber-400 group-hover:to-yellow-500 transition-all duration-500">
                        {collection.name}
                      </h3>
                      
                      <p className="text-white/70 mb-6 leading-relaxed">
                        {collection.description}
                      </p>
                      
                      <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                        <div className="text-center">
                          <div className={`text-2xl font-bold bg-gradient-to-r ${collection.gradient} bg-clip-text text-transparent`}>
                            {collection.startingPrice}
                          </div>
                          <div className="text-sm text-white/60">Starting from</div>
                        </div>
                        <div className="w-px h-12 bg-white/20" />
                        <div className="text-center">
                          <div className="text-lg font-semibold text-white">{collection.category}</div>
                          <div className="text-sm text-white/60">Category</div>
                        </div>
                      </div>
                      
                      <Button 
                        className={`bg-gradient-to-r ${collection.gradient} text-white font-semibold px-6 py-3 hover:shadow-lg hover:scale-105 transition-all duration-300`}
                        data-testid={`button-explore-${collection.id}`}
                      >
                        <span>Explore Collection</span>
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-white mb-6">
              Why Choose
              <span className="block bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Palaniappa?
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Experience excellence in every aspect of your jewelry journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="text-center group"
                data-testid={`feature-${index}`}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-10 h-10 text-amber-400" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-amber-400/10 to-yellow-500/10 rounded-2xl blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-white/70 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Brand Story Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(251,191,36,0.1),transparent)]" />
          <motion.div 
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M60 60l30-30v60l-30-30zM60 60l-30-30v60l30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '120px 120px'
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
              >
                <Crown className="w-5 h-5 text-amber-400" />
                <span className="text-white/80 font-medium tracking-wider text-sm">OUR LEGACY</span>
              </motion.div>
              
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                Crafting Dreams into
                <span className="block bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Timeless Beauty
                </span>
              </h2>
              
              <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                <p>
                  For generations, Palaniappa Jewellers has been synonymous with exceptional craftsmanship and unparalleled beauty. Each piece tells a story of dedication, artistry, and the pursuit of perfection.
                </p>
                <p>
                  Our master artisans blend traditional techniques with contemporary design, creating jewelry that transcends time and celebrates life's most precious moments.
                </p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-6 mt-12"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">1999</div>
                  <div className="text-white/60 text-sm">Established</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">100%</div>
                  <div className="text-white/60 text-sm">Certified Gold</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">25+</div>
                  <div className="text-white/60 text-sm">Expert Artisans</div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Visual Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Main Image */}
                <div className="relative z-10 aspect-square rounded-3xl overflow-hidden border border-amber-400/20 backdrop-blur-xl">
                  <img
                    src={goldCollectionImage}
                    alt="Luxury Gold Collection"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-500/10" />
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-purple-400/15 to-pink-500/15 rounded-full blur-3xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{ duration: 10, repeat: Infinity, delay: 3 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Jewelry Categories */}
      <section className="py-32 bg-gradient-to-br from-black via-gray-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_60%,rgba(139,69,19,0.1),transparent)]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
            >
              <Gem className="w-5 h-5 text-blue-400" />
              <span className="text-white/80 font-medium tracking-wider text-sm">EXPLORE COLLECTIONS</span>
            </motion.div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Perfect Style
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Necklaces", icon: Diamond, image: luxuryNecklaceImage, count: "150+ Designs", color: "from-amber-400 to-yellow-500" },
              { name: "Earrings", icon: Sparkles, image: earringsLuxuryImage, count: "200+ Designs", color: "from-purple-400 to-pink-500" },
              { name: "Rings", icon: Crown, image: ringsLuxuryImage, count: "300+ Designs", color: "from-blue-400 to-cyan-500" },
              { name: "Bracelets", icon: Heart, image: braceletsHeroImage, count: "80+ Designs", color: "from-green-400 to-emerald-500" }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 + index * 0.1 }}
                    className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-white/60 text-lg mb-6">
                    {category.count}
                  </p>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center text-white/80 group-hover:text-white transition-colors duration-300"
                  >
                    <span className="text-sm font-medium mr-2">Explore Collection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.div>
                </div>
                
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500 blur-xl`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_20%,rgba(168,85,247,0.1),transparent)]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
            >
              <Award className="w-5 h-5 text-purple-400" />
              <span className="text-white/80 font-medium tracking-wider text-sm">PREMIUM SERVICES</span>
            </motion.div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Beyond Jewelry
              <span className="block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Exceptional Service
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Gem,
                title: "Custom Design",
                description: "Bring your vision to life with our expert designers and craftsmen",
                features: ["Personal consultation", "3D design preview", "Handcrafted execution"]
              },
              {
                icon: Shield,
                title: "Lifetime Warranty",
                description: "Complete protection and maintenance for your precious investments",
                features: ["Free cleaning service", "Repair guarantee", "Authenticity certificate"]
              },
              {
                icon: Crown,
                title: "VIP Experience",
                description: "Exclusive access to limited collections and personalized service",
                features: ["Private showroom", "First access to collections", "Personal jewelry consultant"]
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-400/30 hover:bg-white/10 transition-all duration-500 group"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.3 + index * 0.1 }}
                  className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-white/70 text-lg mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 + featureIndex * 0.1 }}
                      className="flex items-center text-white/80 group-hover:text-white transition-colors duration-300"
                    >
                      <Check className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards and Certifications */}
      <section className="py-32 bg-gradient-to-br from-black via-slate-900 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_40%,rgba(34,197,94,0.1),transparent)]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
            >
              <Medal className="w-5 h-5 text-green-400" />
              <span className="text-white/80 font-medium tracking-wider text-sm">TRUSTED EXCELLENCE</span>
            </motion.div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Award-Winning
              <span className="block bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Craftsmanship
              </span>
            </h2>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Our commitment to excellence has been recognized by industry leaders and trusted organizations worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: Award,
                title: "BIS Certified",
                subtitle: "Hallmark Guarantee",
                description: "All gold jewelry certified by Bureau of Indian Standards"
              },
              {
                icon: Shield,
                title: "ISO 9001:2015",
                subtitle: "Quality Management",
                description: "International standard for quality management systems"
              },
              {
                icon: Star,
                title: "Jewellers Association",
                subtitle: "Member Since 2000",
                description: "Proud member of National Jewellers Association"
              },
              {
                icon: Crown,
                title: "Excellence Award",
                subtitle: "Best Craftsmanship 2023",
                description: "Recognized for outstanding jewelry design and quality"
              }
            ].map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 30, rotateY: -45 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  rotateY: 10,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:border-green-400/30 hover:bg-white/10 transition-all duration-500"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.3 + index * 0.1 }}
                  className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                >
                  <award.icon className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors duration-300">
                  {award.title}
                </h3>
                
                <div className="text-green-400 font-medium text-sm mb-3">
                  {award.subtitle}
                </div>
                
                <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {award.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News and Updates */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-black to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(59,130,246,0.1),transparent)]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
            >
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span className="text-white/80 font-medium tracking-wider text-sm">LATEST UPDATES</span>
            </motion.div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              News &
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Insights
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: "Collection Launch",
                title: "Diwali Special Collection 2024",
                excerpt: "Explore our latest festive collection featuring traditional designs with contemporary elegance.",
                date: "Oct 15, 2024",
                readTime: "3 min read",
                image: goldCollectionImage
              },
              {
                category: "Care Tips",
                title: "How to Maintain Your Gold Jewelry",
                excerpt: "Expert tips on keeping your precious jewelry looking brilliant and lasting for generations.",
                date: "Oct 10, 2024",
                readTime: "5 min read",
                image: luxuryNecklaceImage
              },
              {
                category: "Trends",
                title: "2024 Bridal Jewelry Trends",
                excerpt: "Discover the latest trends in bridal jewelry that modern brides are choosing for their special day.",
                date: "Oct 5, 2024",
                readTime: "4 min read",
                image: earringsLuxuryImage
              }
            ].map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-blue-400/30 hover:bg-white/10 transition-all duration-500 cursor-pointer"
              >
                {/* Article Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500/90 backdrop-blur-xl border border-blue-400/30 rounded-full px-4 py-2 text-white text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                {/* Article Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:text-white/90 transition-colors duration-300">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-white/60 text-xs">
                    <time className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </time>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </span>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center text-white/80 group-hover:text-blue-300 transition-colors duration-300 mt-4"
                  >
                    <span className="text-sm font-medium mr-2">Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Showroom Preview */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(168,85,247,0.1),transparent)]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
              >
                <Camera className="w-5 h-5 text-purple-400" />
                <span className="text-white/80 font-medium tracking-wider text-sm">VIRTUAL EXPERIENCE</span>
              </motion.div>
              
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                Explore Our
                <span className="block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Virtual Showroom
                </span>
              </h2>
              
              <div className="space-y-6 text-white/80 text-lg leading-relaxed mb-12">
                <p>
                  Step into our immersive virtual showroom and experience our jewelry collections like never before. Browse through our extensive catalog with 360° views and detailed close-ups.
                </p>
                <p>
                  Get a realistic preview of how each piece looks and feels, making your shopping experience more engaging and confident.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-12">
                {[
                  { icon: Eye, label: "360° Product Views", description: "See every detail from all angles" },
                  { icon: Zap, label: "AR Try-On", description: "Virtual try-on experience" },
                  { icon: Search, label: "Zoom & Inspect", description: "Examine craftsmanship closely" },
                  { icon: Heart, label: "Wishlist & Compare", description: "Save and compare favorites" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm mb-1">{feature.label}</div>
                      <div className="text-white/60 text-xs">{feature.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
              >
                Launch Virtual Showroom
              </motion.button>
            </motion.div>
            
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Main Showcase */}
                <div className="relative z-10 aspect-square rounded-3xl overflow-hidden border border-purple-400/20 backdrop-blur-xl">
                  <img
                    src={ringsLuxuryImage}
                    alt="Virtual Showroom Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
                  
                  {/* Interactive Elements */}
                  <div className="absolute top-6 right-6">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center"
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                  
                  <div className="absolute bottom-6 left-6">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      className="bg-purple-500/90 backdrop-blur-xl border border-purple-400/50 rounded-xl px-4 py-2"
                    >
                      <div className="text-white text-sm font-medium">360° View Available</div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Floating UI Elements */}
                <motion.div
                  className="absolute -top-8 -left-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4"
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [-5, 5, -5],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Eye className="w-8 h-8 text-purple-400" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4"
                  animate={{
                    y: [10, -10, 10],
                    rotate: [5, -5, 5],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Search className="w-8 h-8 text-pink-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      {featuredProducts.length > 0 && (
        <section className="py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(255,255,255,.05)_50%,transparent_65%)] animate-pulse" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black text-white mb-6">
                Featured
                <span className="block bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Masterpieces
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Handpicked selections from our finest collections
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group"
                  data-testid={`featured-product-${product.id}`}
                >
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                    <ProductCard product={product} currency={selectedCurrency} />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-12"
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold px-8 py-4 hover:from-amber-500 hover:to-yellow-600 transition-all duration-300"
                data-testid="button-view-all-products"
              >
                <ShoppingBag className="mr-2 w-5 h-5" />
                View All Products
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-600 text-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(0,0,0,.1)_50%,transparent_65%)]" />
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-black/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-black/10 backdrop-blur-xl border border-black/20 rounded-full px-6 py-3 mb-8"
              >
                <Heart className="w-5 h-5 text-red-600" />
                <span className="text-black/80 font-medium tracking-wider text-sm">VISIT US TODAY</span>
              </motion.div>
              
              <h2 className="text-5xl lg:text-7xl font-black text-black mb-6 leading-tight">
                Visit Our
                <span className="block text-white drop-shadow-lg">
                  Showroom
                </span>
              </h2>
              
              <p className="text-xl text-black/80 mb-12 leading-relaxed max-w-2xl mx-auto">
                Visit our showroom or connect with our experts to find the perfect piece that tells your unique story.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg"
                className="bg-black text-white hover:bg-gray-800 font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
                data-testid="button-visit-showroom"
              >
                <MapPin className="mr-2 w-5 h-5" />
                Visit Showroom
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-black/30 text-black hover:bg-black/10 backdrop-blur-sm px-8 py-4 text-lg font-bold transition-all duration-300"
                data-testid="button-call-expert"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call Expert
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-black/30 text-black hover:bg-black/10 backdrop-blur-sm px-8 py-4 text-lg font-bold transition-all duration-300"
                data-testid="button-browse-online"
              >
                <Zap className="mr-2 w-5 h-5" />
                Browse Online
              </Button>
            </div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-8 mt-12 text-black/70"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Mon-Sat: 10AM-8PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span className="font-medium">+91 98765 43210</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}