import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Crown, 
  Diamond, 
  Gem, 
  Star, 
  Sparkles, 
  Sun, 
  Moon, 
  Zap, 
  ArrowRight, 
  Gift,
  Heart,
  Shield,
  Award,
  Palette,
  Calendar
} from "lucide-react";
import { Product } from '@shared/schema';
import Header from './header';
import Footer from './footer';
import ProductCard from './product-card';
import WhatsAppFloat from './whatsapp-float';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Currency } from '@/lib/currency';

// Import assets
import luxuryNecklaceImage from '@assets/luxury-necklace.png';
import goldCollectionImage from '@assets/gold_collection_luxury.png';
import diamondCollectionImage from '@assets/diamond_collection_luxury_new.png';
import bridalCollectionsImage from '@assets/bridal_new.png';
import earringsLuxuryImage from '@assets/earrings_luxury.png';
import ringsLuxuryImage from '@assets/rings_luxury.png';
import royalGoldImage from '@assets/Royal_gold_jewelry_collection_e293857a.png';
import jewelryImage1 from '@assets/image_1757151692791.png';
import jewelryImage2 from '@assets/image_1757151723842.png';
import jewelryImage3 from '@assets/image_1757151754440.png';

interface DailyHomepageProps {
  selectedCurrency: Currency;
}

// Get current day of the week (0 = Sunday, 1 = Monday, etc.)
function getCurrentDay(): number {
  return new Date().getDay();
}

// Get day name for display
function getDayName(dayIndex: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex];
}

// Sunday - "Divine Elegance" Theme
function SundayLayout({ products, selectedCurrency }: { products: Product[], selectedCurrency: Currency }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.7]);

  const divineImages = [jewelryImage1, jewelryImage2, jewelryImage3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % divineImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [divineImages.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Divine Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y, opacity }}
      >
        {/* Multiple Gradient Layers for Depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-700/80 via-transparent to-yellow-600/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent" />
        
        {/* Dramatic Light Rays */}
        <div className="absolute inset-0">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-1/2 w-1 h-full origin-top"
              style={{
                background: `linear-gradient(to bottom, 
                  rgba(251, 191, 36, ${0.4 + (i % 4) * 0.2}), 
                  rgba(245, 158, 11, ${0.3 + (i % 3) * 0.1}),
                  transparent)`,
                transform: `translateX(-50%) rotate(${i * 20}deg)`,
                filter: 'blur(1px)',
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scaleY: [0.5, 1.5, 0.5],
                scaleX: [0.5, 2, 0.5],
              }}
              transition={{
                duration: 6 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Floating Divine Orbs */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-50, -120, -50],
                x: [-20, 20, -20],
                rotate: [0, 360],
                scale: [0.3, 1.8, 0.3],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-300 to-yellow-200 shadow-2xl" 
                style={{
                  filter: 'blur(2px)',
                  boxShadow: '0 0 30px rgba(251, 191, 36, 0.8)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Divine Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-200 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(0.5px)',
              }}
              animate={{
                y: [-100, -200],
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="text-center lg:text-left"
              >
                {/* Day Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 rounded-full px-6 py-3 mb-8"
                >
                  <Sun className="w-5 h-5 text-amber-600" />
                  <span className="text-amber-800 font-semibold tracking-wider text-sm">SUNDAY DIVINE COLLECTION</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.5, delay: 0.4, type: "spring", stiffness: 100 }}
                  className="text-7xl lg:text-9xl font-black mb-8 leading-tight relative"
                  style={{ 
                    fontFamily: 'Cormorant Garamond, serif',
                    textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }}
                >
                  <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-transparent drop-shadow-2xl relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent blur-sm opacity-60 animate-pulse">Divine</span>
                    Divine
                  </span>
                  <br />
                  <span className="text-white drop-shadow-2xl relative">
                    <span className="absolute inset-0 text-amber-200 blur-sm opacity-40 animate-pulse">Elegance</span>
                    Elegance
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl text-amber-700 mb-8 font-light leading-relaxed"
                >
                  Start your week with celestial beauty and timeless grace
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold px-8 py-4 text-lg hover:from-amber-600 hover:to-yellow-600 shadow-xl"
                    data-testid="button-sunday-explore"
                  >
                    <Gem className="mr-2 w-5 h-5" />
                    Explore Divine Collection
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-amber-300 text-amber-700 hover:bg-amber-50 px-8 py-4 text-lg"
                    data-testid="button-sunday-blessed"
                  >
                    <Crown className="mr-2 w-5 h-5" />
                    Blessed Pieces
                  </Button>
                </motion.div>
              </motion.div>

              {/* Image Showcase */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="relative"
              >
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Enhanced Divine Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/50 to-yellow-400/50 rounded-full blur-3xl transform scale-150 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-300/30 to-yellow-300/30 rounded-full blur-2xl transform scale-125" />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full blur-xl transform scale-100" />
                  
                  <div className="relative z-10 aspect-square rounded-3xl overflow-hidden border-4 border-amber-300/70 shadow-2xl" style={{boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 100px rgba(251, 191, 36, 0.3)'}}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={divineImages[currentSlide]}
                        alt="Divine Collection"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.2, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8 }}
                      />
                    </AnimatePresence>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-yellow-100/20" />
                  </div>

                  {/* Floating Halos */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border-2 border-amber-300/30"
                      style={{
                        transform: `scale(${1 + i * 0.2})`,
                      }}
                      animate={{
                        rotate: [0, 360],
                        opacity: [0.2, 0.6, 0.2],
                      }}
                      transition={{
                        duration: 15 + i * 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-24 bg-gradient-to-br from-white via-amber-50/30 to-yellow-50/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl lg:text-6xl font-black text-amber-900 mb-6">
                Blessed Collection
              </h2>
              <p className="text-xl text-amber-700 max-w-2xl mx-auto">
                Handpicked pieces that radiate divine energy and eternal beauty
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-amber-100 hover:border-amber-200 transition-all duration-300"
                >
                  <ProductCard 
                    product={product} 
                    currency={selectedCurrency}
                    showActions={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Monday - "Royal Majesty" Theme
function MondayLayout({ products, selectedCurrency }: { products: Product[], selectedCurrency: Currency }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const royalImages = [royalGoldImage, goldCollectionImage, bridalCollectionsImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % royalImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [royalImages.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Royal Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-indigo-950 to-violet-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/70 via-indigo-700/40 to-violet-600/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" />
        
        {/* Royal Damask Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.6'%3E%3Cpath d='M60 0c16.569 0 30 13.431 30 30s-13.431 30-30 30S30 46.569 30 30 43.431 0 60 0zm0 15c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15-6.716-15-15-15z'/%3E%3Cpath d='M30 60l30-30-30-30-30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Royal Shimmer */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/20 to-transparent"
          animate={{
            x: [-1000, 1000],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Royal Crown Constellation */}
        <div className="absolute inset-0">
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 2, 0],
                rotate: [0, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 8,
              }}
            >
              <div className="relative">
                <Crown className="w-6 h-6 text-purple-200/80" style={{filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.8))'}} />
                <div className="absolute inset-0 animate-ping">
                  <Crown className="w-6 h-6 text-purple-300/40" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Royal Orbs */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.4), rgba(99, 102, 241, 0.2))',
                filter: 'blur(4px)',
                boxShadow: '0 0 50px rgba(147, 51, 234, 0.5)',
              }}
              animate={{
                y: [-100, -200, -100],
                x: [-30, 30, -30],
                scale: [0.5, 1.5, 0.5],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 8,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="text-center lg:text-left"
              >
                {/* Day Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 rounded-full px-6 py-3 mb-8"
                >
                  <Crown className="w-5 h-5 text-purple-600" />
                  <span className="text-purple-800 font-semibold tracking-wider text-sm">MONDAY ROYAL COLLECTION</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 50, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 2, delay: 0.4, type: "spring", stiffness: 50 }}
                  className="text-8xl lg:text-10xl font-black mb-8 leading-tight relative"
                  style={{ 
                    fontFamily: 'Cormorant Garamond, serif',
                    textShadow: '0 20px 40px rgba(0,0,0,0.8)'
                  }}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-purple-200 via-violet-100 to-indigo-200 bg-clip-text text-transparent drop-shadow-2xl relative block"
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(147, 51, 234, 0.8)',
                        '0 0 40px rgba(147, 51, 234, 1)',
                        '0 0 20px rgba(147, 51, 234, 0.8)',
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse">Royal</span>
                    Royal
                  </motion.span>
                  <br />
                  <motion.span 
                    className="text-white drop-shadow-2xl relative block"
                    animate={{
                      textShadow: [
                        '0 0 30px rgba(255, 255, 255, 0.8)',
                        '0 0 60px rgba(255, 255, 255, 1)',
                        '0 0 30px rgba(255, 255, 255, 0.8)',
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  >
                    <span className="absolute inset-0 text-purple-200 blur-sm opacity-60 animate-pulse">Majesty</span>
                    Majesty
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl text-purple-100 mb-8 font-light leading-relaxed"
                >
                  Begin your week with regal sophistication and imperial grandeur
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold px-8 py-4 text-lg hover:from-purple-600 hover:to-indigo-700 shadow-xl"
                    data-testid="button-monday-explore"
                  >
                    <Crown className="mr-2 w-5 h-5" />
                    Explore Royal Collection
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-purple-300 text-purple-100 hover:bg-purple-800/20 px-8 py-4 text-lg"
                    data-testid="button-monday-imperial"
                  >
                    <Shield className="mr-2 w-5 h-5" />
                    Imperial Pieces
                  </Button>
                </motion.div>
              </motion.div>

              {/* Image Showcase */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="relative"
              >
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Enhanced Royal Aura */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/40 to-indigo-500/40 rounded-full blur-3xl transform scale-150"
                    animate={{
                      scale: [1.5, 1.8, 1.5],
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-violet-400/30 rounded-full blur-2xl transform scale-125 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl transform scale-100" />
                  
                  <div className="relative z-10 aspect-square rounded-3xl overflow-hidden border-4 border-purple-400/60 shadow-2xl" style={{boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 120px rgba(147, 51, 234, 0.4), inset 0 0 60px rgba(147, 51, 234, 0.1)'}}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={royalImages[currentSlide]}
                        alt="Royal Collection"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.3, rotateY: 90 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8 }}
                      />
                    </AnimatePresence>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-indigo-100/10" />
                  </div>

                  {/* Royal Ornaments */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: `${20 + i * 20}%`,
                        right: `${-10 + i * 5}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        rotate: [0, 15, -15, 0],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    >
                      <Crown className="w-8 h-8 text-purple-300/40" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-24 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-blue-900/20 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                Imperial Collection
              </h2>
              <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                Pieces fit for royalty, crafted with unparalleled magnificence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-purple-900/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-300/20 hover:border-purple-300/40 transition-all duration-300"
                >
                  <ProductCard 
                    product={product} 
                    currency={selectedCurrency}
                    showActions={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Tuesday - "Modern Luxe" Theme
function TuesdayLayout({ products, selectedCurrency }: { products: Product[], selectedCurrency: Currency }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const rotate = useTransform(scrollY, [0, 500], [0, 360]);

  const luxeImages = [diamondCollectionImage, earringsLuxuryImage, ringsLuxuryImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % luxeImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [luxeImages.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Modern Luxe Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-gray-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 via-teal-800/20 to-cyan-900/30" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-emerald-600/10 to-transparent" />
        
        {/* Cyber Grid */}
        <div className="absolute inset-0 opacity-15">
          <motion.div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2310b981' stroke-width='0.5' stroke-opacity='0.8'%3E%3Cpath d='M0 0h50v50H0z'/%3E%3Cpath d='M25 0v50M0 25h50'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
            animate={{
              backgroundPosition: ['0 0', '50px 50px', '0 0'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* Digital Waves */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-1 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                filter: 'blur(1px)',
              }}
              animate={{
                x: [-1000, 1000],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Cyber Cubes */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [-40, 40, -40],
                y: [-60, 60, -60],
                rotateX: [0, 360],
                rotateY: [0, 360],
                scale: [0.3, 2, 0.3],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              <div 
                className="w-8 h-8 border-2 border-emerald-400/60 transform rotate-45 relative"
                style={{
                  background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.1))',
                  boxShadow: '0 0 30px rgba(16, 185, 129, 0.4), inset 0 0 20px rgba(20, 184, 166, 0.2)',
                  filter: 'blur(0.5px)',
                }}
              >
                <div className="absolute inset-2 border border-emerald-300/40 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Digital Particles */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(0.5px)',
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
              }}
              animate={{
                y: [-150, -300],
                x: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
                scale: [0, 3, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 15,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="text-center lg:text-left"
              >
                {/* Day Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
                >
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-100 font-semibold tracking-wider text-sm">TUESDAY MODERN LUXE</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 50, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 2, delay: 0.4, type: "spring", stiffness: 60 }}
                  className="text-8xl lg:text-10xl font-black mb-8 leading-tight relative"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    textShadow: '0 20px 40px rgba(0,0,0,0.9)',
                    perspective: '1000px'
                  }}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-emerald-200 via-teal-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl relative block"
                    animate={{
                      textShadow: [
                        '0 0 30px rgba(16, 185, 129, 0.8)',
                        '0 0 60px rgba(16, 185, 129, 1)',
                        '0 0 30px rgba(16, 185, 129, 0.8)',
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent blur-sm opacity-60 animate-pulse">Modern</span>
                    <span className="relative inline-block" style={{transform: 'rotateY(0deg)'}}>
                      Modern
                    </span>
                  </motion.span>
                  <br />
                  <motion.span 
                    className="text-white drop-shadow-2xl relative block"
                    animate={{
                      textShadow: [
                        '0 0 40px rgba(255, 255, 255, 0.8)',
                        '0 0 80px rgba(255, 255, 255, 1)',
                        '0 0 40px rgba(255, 255, 255, 0.8)',
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                  >
                    <span className="absolute inset-0 text-emerald-200 blur-sm opacity-50 animate-pulse">Luxe</span>
                    <span className="relative inline-block" style={{transform: 'rotateY(0deg)'}}>
                      Luxe
                    </span>
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl text-slate-200 mb-8 font-light leading-relaxed"
                >
                  Where contemporary design meets timeless luxury
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-8 py-4 text-lg hover:from-emerald-600 hover:to-teal-700 shadow-xl"
                    data-testid="button-tuesday-explore"
                  >
                    <Diamond className="mr-2 w-5 h-5" />
                    Explore Modern Collection
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-emerald-400/50 text-emerald-100 hover:bg-emerald-800/20 px-8 py-4 text-lg backdrop-blur-sm"
                    data-testid="button-tuesday-contemporary"
                  >
                    <Palette className="mr-2 w-5 h-5" />
                    Contemporary Pieces
                  </Button>
                </motion.div>
              </motion.div>

              {/* Image Showcase */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="relative"
              >
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Cyber Glow */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400/40 to-teal-400/40 rounded-2xl blur-3xl transform scale-125"
                    animate={{
                      scale: [1.25, 1.5, 1.25],
                      opacity: [0.4, 0.8, 0.4],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-emerald-400/30 rounded-2xl blur-2xl transform scale-100 animate-pulse" />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-2xl blur-xl transform scale-75"
                    animate={{
                      scale: [0.75, 1, 0.75],
                      rotate: [0, -360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                    }}
                  />
                  
                  <div className="relative z-10 aspect-square rounded-2xl overflow-hidden border-2 border-emerald-400/50 shadow-2xl backdrop-blur-sm" style={{boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 150px rgba(16, 185, 129, 0.3), inset 0 0 80px rgba(16, 185, 129, 0.1)'}}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={luxeImages[currentSlide]}
                        alt="Modern Luxe Collection"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.2, rotateY: 180, filter: 'hue-rotate(90deg)' }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'hue-rotate(0deg)' }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8 }}
                      />
                    </AnimatePresence>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-teal-100/10" />
                  </div>

                  {/* Modern Accents */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                      style={{
                        top: `${30 + i * 20}%`,
                        left: `${-15 + i * 10}%`,
                        transform: `rotate(${45 + i * 15}deg)`,
                      }}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scaleX: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.7,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-24 bg-gradient-to-br from-slate-800/50 via-gray-800/50 to-emerald-900/20 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                Contemporary Collection
              </h2>
              <p className="text-xl text-slate-200 max-w-2xl mx-auto">
                Cutting-edge designs that redefine modern luxury
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300"
                >
                  <ProductCard 
                    product={product} 
                    currency={selectedCurrency}
                    showActions={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Wednesday - "Elegant Classic" Theme
function WednesdayLayout({ products, selectedCurrency }: { products: Product[], selectedCurrency: Currency }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  const elegantImages = [luxuryNecklaceImage, goldCollectionImage, bridalCollectionsImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % elegantImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [elegantImages.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Elegant Classic Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/60 via-indigo-700/30 to-slate-600/40" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-500/15 to-transparent" />
        
        {/* Classic Patterns */}
        <div className="absolute inset-0 opacity-8">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3Ccircle cx='60' cy='60' r='1.5'/%3E%3Ccircle cx='20' cy='60' r='1'/%3E%3Ccircle cx='60' cy='20' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Classic Constellation */}
        <div className="absolute inset-0">
          {[...Array(28)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 2.5, 0],
                rotate: [0, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 6,
              }}
            >
              <div className="relative">
                <Star className="w-5 h-5 text-blue-200/80" style={{filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.9))'}} />
                <div className="absolute inset-0 animate-ping">
                  <Star className="w-5 h-5 text-blue-300/50" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Classic Orbs */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-10 h-10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.2))',
                filter: 'blur(3px)',
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
              }}
              animate={{
                y: [-80, -160, -80],
                x: [-25, 25, -25],
                scale: [0.4, 1.8, 0.4],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 6,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="text-center lg:text-left"
              >
                {/* Day Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100/20 to-indigo-100/20 border border-blue-300/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
                >
                  <Star className="w-5 h-5 text-blue-300" />
                  <span className="text-blue-100 font-semibold tracking-wider text-sm">WEDNESDAY ELEGANT CLASSIC</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 40, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.8, delay: 0.4, type: "spring", stiffness: 80 }}
                  className="text-8xl lg:text-10xl font-black mb-8 leading-tight relative"
                  style={{ 
                    fontFamily: 'Cormorant Garamond, serif',
                    textShadow: '0 15px 30px rgba(0,0,0,0.7)'
                  }}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-blue-200 via-indigo-100 to-slate-200 bg-clip-text text-transparent drop-shadow-2xl relative block"
                    animate={{
                      textShadow: [
                        '0 0 25px rgba(59, 130, 246, 0.8)',
                        '0 0 50px rgba(59, 130, 246, 1)',
                        '0 0 25px rgba(59, 130, 246, 0.8)',
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-slate-400 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse">Elegant</span>
                    Elegant
                  </motion.span>
                  <br />
                  <motion.span 
                    className="text-white drop-shadow-2xl relative block"
                    animate={{
                      textShadow: [
                        '0 0 35px rgba(255, 255, 255, 0.8)',
                        '0 0 70px rgba(255, 255, 255, 1)',
                        '0 0 35px rgba(255, 255, 255, 0.8)',
                      ]
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                  >
                    <span className="absolute inset-0 text-blue-200 blur-sm opacity-40 animate-pulse">Classic</span>
                    Classic
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl text-blue-100 mb-8 font-light leading-relaxed"
                >
                  Timeless sophistication meets refined luxury in perfect harmony
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold px-8 py-4 text-lg hover:from-blue-600 hover:to-indigo-700 shadow-xl"
                    data-testid="button-wednesday-explore"
                  >
                    <Star className="mr-2 w-5 h-5" />
                    Explore Elegant Collection
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-blue-300/50 text-blue-100 hover:bg-blue-800/20 px-8 py-4 text-lg backdrop-blur-sm"
                    data-testid="button-wednesday-classic"
                  >
                    <Award className="mr-2 w-5 h-5" />
                    Classic Pieces
                  </Button>
                </motion.div>
              </motion.div>

              {/* Image Showcase */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="relative"
              >
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Elegant Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/25 to-indigo-500/25 rounded-full blur-3xl transform scale-140" />
                  
                  <div className="relative z-10 aspect-square rounded-3xl overflow-hidden border-2 border-blue-300/30 shadow-2xl backdrop-blur-sm">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={elegantImages[currentSlide]}
                        alt="Elegant Classic Collection"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8 }}
                      />
                    </AnimatePresence>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-indigo-100/10" />
                  </div>

                  {/* Classic Ornaments */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: `${15 + i * 25}%`,
                        left: `${-8 + i * 3}%`,
                      }}
                      animate={{
                        y: [-15, 15, -15],
                        rotate: [0, 10, -10, 0],
                        scale: [0.9, 1.1, 0.9],
                      }}
                      transition={{
                        duration: 5 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.8,
                      }}
                    >
                      <Star className="w-6 h-6 text-blue-300/60" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-24 bg-gradient-to-br from-blue-900/30 via-indigo-900/30 to-slate-900/30 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                Classic Elegance
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Sophisticated pieces that embody timeless beauty and refined taste
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-blue-900/25 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-300/20 hover:border-blue-300/40 transition-all duration-300"
                >
                  <ProductCard 
                    product={product} 
                    currency={selectedCurrency}
                    showActions={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Thursday - "Vintage Romance" Theme
function ThursdayLayout({ products, selectedCurrency }: { products: Product[], selectedCurrency: Currency }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 140]);

  const romanticImages = [bridalCollectionsImage, earringsLuxuryImage, ringsLuxuryImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % romanticImages.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [romanticImages.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Vintage Romance Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-pink-950 to-red-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-800/70 via-pink-700/40 to-red-600/50" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-rose-500/20 to-transparent" />
        
        {/* Vintage Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M60 60c16.569 0 30-13.431 30-30S76.569 0 60 0 30 13.431 30 30s13.431 30 30 30zm0-16c7.732 0 14-6.268 14-14s-6.268-14-14-14-14 6.268-14 14 6.268 14 14 14z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Romantic Hearts Constellation */}
        <div className="absolute inset-0">
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-40, -100, -40],
                rotate: [0, 360],
                scale: [0.2, 2.8, 0.2],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 8,
              }}
            >
              <div className="relative">
                <Heart className="w-6 h-6 text-rose-200/90" style={{filter: 'drop-shadow(0 0 20px rgba(244, 63, 94, 1))'}} />
                <div className="absolute inset-0 animate-ping">
                  <Heart className="w-6 h-6 text-pink-300/60" />
                </div>
                <div className="absolute inset-0 animate-pulse delay-500">
                  <Heart className="w-6 h-6 text-red-300/40" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Romantic Petals */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: 'linear-gradient(45deg, rgba(244, 63, 94, 0.4), rgba(236, 72, 153, 0.3))',
                filter: 'blur(4px)',
                boxShadow: '0 0 50px rgba(244, 63, 94, 0.7)',
              }}
              animate={{
                y: [-60, -140, -60],
                x: [-40, 40, -40],
                rotate: [0, 360],
                scale: [0.3, 2.2, 0.3],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 14 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 8,
              }}
            />
          ))}
        </div>

        {/* Rose Shimmer */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-300/30 to-transparent"
          animate={{
            x: [-1200, 1200],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="text-center lg:text-left"
              >
                {/* Day Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100/20 to-pink-100/20 border border-rose-300/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
                >
                  <Heart className="w-5 h-5 text-rose-300" />
                  <span className="text-rose-100 font-semibold tracking-wider text-sm">THURSDAY VINTAGE ROMANCE</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 60, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 2.5, delay: 0.4, type: "spring", stiffness: 60 }}
                  className="text-8xl lg:text-10xl font-black mb-8 leading-tight relative"
                  style={{ 
                    fontFamily: 'Cormorant Garamond, serif',
                    textShadow: '0 20px 40px rgba(0,0,0,0.8)'
                  }}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-rose-200 via-pink-100 to-red-200 bg-clip-text text-transparent drop-shadow-2xl relative block"
                    animate={{
                      textShadow: [
                        '0 0 30px rgba(244, 63, 94, 0.9)',
                        '0 0 60px rgba(244, 63, 94, 1.2)',
                        '0 0 30px rgba(244, 63, 94, 0.9)',
                      ],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-rose-400 via-pink-400 to-red-400 bg-clip-text text-transparent blur-sm opacity-60 animate-pulse">Vintage</span>
                    Vintage
                  </motion.span>
                  <br />
                  <motion.span 
                    className="text-white drop-shadow-2xl relative block"
                    animate={{
                      textShadow: [
                        '0 0 40px rgba(255, 182, 193, 0.8)',
                        '0 0 80px rgba(255, 182, 193, 1)',
                        '0 0 40px rgba(255, 182, 193, 0.8)',
                      ],
                      scale: [1, 1.01, 1],
                    }}
                    transition={{ duration: 4.5, repeat: Infinity, delay: 1.8 }}
                  >
                    <span className="absolute inset-0 text-rose-200 blur-sm opacity-50 animate-pulse">Romance</span>
                    Romance
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl text-rose-100 mb-8 font-light leading-relaxed"
                >
                  Enchanting designs that capture the essence of eternal love
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold px-8 py-4 text-lg hover:from-rose-600 hover:to-pink-700 shadow-xl"
                    data-testid="button-thursday-explore"
                  >
                    <Heart className="mr-2 w-5 h-5" />
                    Explore Romantic Collection
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-rose-300/50 text-rose-100 hover:bg-rose-800/20 px-8 py-4 text-lg backdrop-blur-sm"
                    data-testid="button-thursday-vintage"
                  >
                    <Gift className="mr-2 w-5 h-5" />
                    Vintage Pieces
                  </Button>
                </motion.div>
              </motion.div>

              {/* Image Showcase */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="relative"
              >
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Romantic Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/30 to-pink-500/30 rounded-full blur-3xl transform scale-150" />
                  
                  <div className="relative z-10 aspect-square rounded-3xl overflow-hidden border-2 border-rose-300/30 shadow-2xl backdrop-blur-sm">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={romanticImages[currentSlide]}
                        alt="Vintage Romance Collection"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8 }}
                      />
                    </AnimatePresence>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-900/25 via-transparent to-pink-100/10" />
                  </div>

                  {/* Romantic Elements */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: `${10 + i * 20}%`,
                        right: `${-5 + i * 2}%`,
                      }}
                      animate={{
                        y: [-20, 20, -20],
                        rotate: [0, 360],
                        scale: [0.7, 1.3, 0.7],
                      }}
                      transition={{
                        duration: 6 + i * 0.8,
                        repeat: Infinity,
                        delay: i * 0.6,
                      }}
                    >
                      <Heart className="w-5 h-5 text-rose-300/50" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-24 bg-gradient-to-br from-rose-900/30 via-pink-900/30 to-red-900/30 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                Romantic Collection
              </h2>
              <p className="text-xl text-rose-100 max-w-2xl mx-auto">
                Vintage-inspired pieces that tell stories of love and devotion
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-rose-900/25 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-rose-300/20 hover:border-rose-300/40 transition-all duration-300"
                >
                  <ProductCard 
                    product={product} 
                    currency={selectedCurrency}
                    showActions={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Friday - "Contemporary Edge" Theme
function FridayLayout({ products, selectedCurrency }: { products: Product[], selectedCurrency: Currency }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 160]);

  const contemporaryImages = [diamondCollectionImage, luxuryNecklaceImage, earringsLuxuryImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % contemporaryImages.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [contemporaryImages.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Contemporary Edge Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-800/80 via-slate-700/40 to-zinc-600/60" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/5 to-transparent" />
        
        {/* Modern Grid */}
        <div className="absolute inset-0 opacity-8">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Holographic Cubes */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [-60, 60, -60],
                y: [-80, 80, -80],
                rotateX: [0, 360],
                rotateY: [0, 360],
                rotateZ: [0, 360],
                scale: [0.2, 3, 0.2],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              <div 
                className="w-12 h-12 border-2 border-white/50 transform rotate-45 relative"
                style={{
                  background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(156, 163, 175, 0.2))',
                  boxShadow: '0 0 40px rgba(255, 255, 255, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.1)',
                  filter: 'blur(0.5px)',
                }}
              >
                <div className="absolute inset-3 border border-white/30 animate-ping" />
                <div className="absolute inset-1 border border-white/20 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Neon Scanlines */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{
                top: `${10 + i * 12}%`,
                filter: 'blur(0.5px)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scaleX: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Cyber Particles */}
        <div className="absolute inset-0">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(0.5px)',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.9)',
              }}
              animate={{
                y: [-200, -400],
                x: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
                scale: [0, 4, 0],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 20,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="text-center lg:text-left"
              >
                {/* Day Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-100/10 to-white/10 border border-gray-300/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
                >
                  <Zap className="w-5 h-5 text-gray-300" />
                  <span className="text-gray-100 font-semibold tracking-wider text-sm">FRIDAY CONTEMPORARY EDGE</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 80, scale: 0.4, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  transition={{ duration: 3, delay: 0.4, type: "spring", stiffness: 40 }}
                  className="text-8xl lg:text-10xl font-black mb-8 leading-tight relative"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    textShadow: '0 25px 50px rgba(0,0,0,0.9)',
                    perspective: '1000px'
                  }}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-gray-100 via-white to-zinc-200 bg-clip-text text-transparent drop-shadow-2xl relative block"
                    animate={{
                      textShadow: [
                        '0 0 40px rgba(255, 255, 255, 0.9)',
                        '0 0 80px rgba(255, 255, 255, 1.2)',
                        '0 0 40px rgba(255, 255, 255, 0.9)',
                      ],
                      filter: [
                        'drop-shadow(0 0 20px rgba(255,255,255,0.8))',
                        'drop-shadow(0 0 40px rgba(255,255,255,1))',
                        'drop-shadow(0 0 20px rgba(255,255,255,0.8))',
                      ]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-zinc-300 bg-clip-text text-transparent blur-sm opacity-60 animate-pulse">Contemporary</span>
                    Contemporary
                  </motion.span>
                  <br />
                  <motion.span 
                    className="text-white drop-shadow-2xl relative block"
                    animate={{
                      textShadow: [
                        '0 0 50px rgba(255, 255, 255, 0.8)',
                        '0 0 100px rgba(255, 255, 255, 1)',
                        '0 0 50px rgba(255, 255, 255, 0.8)',
                      ],
                      scale: [1, 1.03, 1],
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 1.2 }}
                  >
                    <span className="absolute inset-0 text-gray-200 blur-sm opacity-70 animate-pulse">Edge</span>
                    Edge
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl text-gray-200 mb-8 font-light leading-relaxed"
                >
                  Bold designs that define the future of luxury jewelry
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-gray-500 to-slate-600 text-white font-bold px-8 py-4 text-lg hover:from-gray-600 hover:to-slate-700 shadow-xl"
                    data-testid="button-friday-explore"
                  >
                    <Diamond className="mr-2 w-5 h-5" />
                    Explore Contemporary Collection
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-gray-300/50 text-gray-200 hover:bg-gray-800/30 px-8 py-4 text-lg backdrop-blur-sm"
                    data-testid="button-friday-edge"
                  >
                    <Zap className="mr-2 w-5 h-5" />
                    Edge Pieces
                  </Button>
                </motion.div>
              </motion.div>

              {/* Image Showcase */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="relative"
              >
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Contemporary Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-white/20 rounded-lg blur-3xl transform scale-125" />
                  
                  <div className="relative z-10 aspect-square rounded-lg overflow-hidden border border-gray-300/30 shadow-2xl backdrop-blur-sm">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={contemporaryImages[currentSlide]}
                        alt="Contemporary Edge Collection"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8 }}
                      />
                    </AnimatePresence>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-white/5" />
                  </div>

                  {/* Modern Elements */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-24 h-1 bg-gradient-to-r from-gray-300 to-white rounded-full"
                      style={{
                        top: `${25 + i * 25}%`,
                        right: `${-20 + i * 5}%`,
                        transform: `rotate(${-45 + i * 30}deg)`,
                      }}
                      animate={{
                        opacity: [0.2, 1, 0.2],
                        scaleX: [0.5, 1.5, 0.5],
                      }}
                      transition={{
                        duration: 4 + i * 1.5,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-24 bg-gradient-to-br from-gray-900/40 via-slate-900/40 to-black/40 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                Future Collection
              </h2>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Cutting-edge designs that push the boundaries of jewelry artistry
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-gray-300/20 hover:border-gray-300/40 transition-all duration-300"
                >
                  <ProductCard 
                    product={product} 
                    currency={selectedCurrency}
                    showActions={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Saturday - "Royal Heritage" Theme
function SaturdayLayout({ products, selectedCurrency }: { products: Product[], selectedCurrency: Currency }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 130]);

  const heritageImages = [royalGoldImage, goldCollectionImage, luxuryNecklaceImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heritageImages.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [heritageImages.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Royal Heritage Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-amber-950 to-yellow-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-red-800/80 via-amber-700/50 to-yellow-600/70" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-amber-500/25 to-transparent" />
        
        {/* Heritage Patterns */}
        <div className="absolute inset-0 opacity-12">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.25'%3E%3Cpath d='M80 80c22.091 0 40-17.909 40-40S102.091 0 80 0 40 17.909 40 40s17.909 40 40 40zm0-16c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24z'/%3E%3Cpath d='M80 80l20-20-20-20-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Royal Jewel Crown */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-70, -150, -70],
                rotate: [0, 360],
                scale: [0.1, 3.5, 0.1],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
            >
              <div className="relative">
                <Crown className="w-8 h-8 text-amber-200/90" style={{filter: 'drop-shadow(0 0 25px rgba(245, 158, 11, 1.2))'}} />
                <div className="absolute inset-0 animate-ping">
                  <Crown className="w-8 h-8 text-yellow-300/70" />
                </div>
                <div className="absolute inset-0 animate-pulse delay-300">
                  <Gem className="w-8 h-8 text-amber-300/50" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Golden Orbs */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: 'linear-gradient(45deg, rgba(245, 158, 11, 0.5), rgba(251, 191, 36, 0.4))',
                filter: 'blur(5px)',
                boxShadow: '0 0 80px rgba(245, 158, 11, 0.8)',
              }}
              animate={{
                y: [-100, -200, -100],
                x: [-50, 50, -50],
                rotate: [0, 360],
                scale: [0.2, 2.5, 0.2],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: 18 + Math.random() * 12,
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>

        {/* Golden Shimmer */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"
          animate={{
            x: [-1500, 1500],
            opacity: [0, 0.8, 0],
            scaleY: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="text-center lg:text-left"
              >
                {/* Day Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100/20 to-yellow-100/20 border border-amber-300/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
                >
                  <Crown className="w-5 h-5 text-amber-300" />
                  <span className="text-amber-100 font-semibold tracking-wider text-sm">SATURDAY ROYAL HERITAGE</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 100, scale: 0.3, rotateY: 180 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
                  transition={{ duration: 3.5, delay: 0.4, type: "spring", stiffness: 50 }}
                  className="text-9xl lg:text-11xl font-black mb-8 leading-tight relative"
                  style={{ 
                    fontFamily: 'Cormorant Garamond, serif',
                    textShadow: '0 30px 60px rgba(0,0,0,0.9)'
                  }}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-amber-200 via-yellow-100 to-gold-200 bg-clip-text text-transparent drop-shadow-2xl relative block"
                    animate={{
                      textShadow: [
                        '0 0 50px rgba(245, 158, 11, 1)',
                        '0 0 100px rgba(245, 158, 11, 1.5)',
                        '0 0 50px rgba(245, 158, 11, 1)',
                      ],
                      filter: [
                        'drop-shadow(0 0 30px rgba(245,158,11,0.9))',
                        'drop-shadow(0 0 60px rgba(245,158,11,1.2))',
                        'drop-shadow(0 0 30px rgba(245,158,11,0.9))',
                      ],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-gold-400 bg-clip-text text-transparent blur-sm opacity-70 animate-pulse">Royal</span>
                    Royal
                  </motion.span>
                  <br />
                  <motion.span 
                    className="text-white drop-shadow-2xl relative block"
                    animate={{
                      textShadow: [
                        '0 0 60px rgba(255, 215, 0, 0.8)',
                        '0 0 120px rgba(255, 215, 0, 1)',
                        '0 0 60px rgba(255, 215, 0, 0.8)',
                      ],
                      scale: [1, 1.04, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                  >
                    <span className="absolute inset-0 text-amber-200 blur-sm opacity-60 animate-pulse">Heritage</span>
                    Heritage
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl text-amber-100 mb-8 font-light leading-relaxed"
                >
                  Celebrating generations of masterful craftsmanship and royal tradition
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold px-8 py-4 text-lg hover:from-amber-600 hover:to-yellow-700 shadow-xl"
                    data-testid="button-saturday-explore"
                  >
                    <Crown className="mr-2 w-5 h-5" />
                    Explore Heritage Collection
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-amber-300/50 text-amber-100 hover:bg-amber-800/20 px-8 py-4 text-lg backdrop-blur-sm"
                    data-testid="button-saturday-royal"
                  >
                    <Gem className="mr-2 w-5 h-5" />
                    Royal Pieces
                  </Button>
                </motion.div>
              </motion.div>

              {/* Image Showcase */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="relative"
              >
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Heritage Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/35 to-yellow-500/35 rounded-full blur-3xl transform scale-155" />
                  
                  <div className="relative z-10 aspect-square rounded-3xl overflow-hidden border-4 border-amber-300/30 shadow-2xl backdrop-blur-sm">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={heritageImages[currentSlide]}
                        alt="Royal Heritage Collection"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8 }}
                      />
                    </AnimatePresence>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/25 via-transparent to-yellow-100/10" />
                  </div>

                  {/* Heritage Crowns */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: `${5 + i * 18}%`,
                        left: `${-12 + (i % 2) * 5}%`,
                      }}
                      animate={{
                        y: [-18, 18, -18],
                        rotate: [0, 15, -15, 0],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 7 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    >
                      <Crown className="w-7 h-7 text-amber-300/50" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-24 bg-gradient-to-br from-red-900/30 via-amber-900/30 to-yellow-900/30 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                Heritage Collection
              </h2>
              <p className="text-xl text-amber-100 max-w-2xl mx-auto">
                Timeless treasures that honor the royal legacy of exceptional craftsmanship
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-amber-900/25 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-amber-300/20 hover:border-amber-300/40 transition-all duration-300"
                >
                  <ProductCard 
                    product={product} 
                    currency={selectedCurrency}
                    showActions={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Main Daily Homepage Component
export default function DailyHomepage({ selectedCurrency }: DailyHomepageProps) {
  const currentDay = getCurrentDay();
  
  // Fetch all products
  const { data: allProducts = [] } = useQuery({
    queryKey: ['/api/products'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const products = Array.isArray(allProducts) ? allProducts as Product[] : [];
  
  // Separate featured and new arrivals for better customer clarity
  const { featuredProducts, newArrivalProducts, allDayProducts } = useMemo(() => {
    const featured = products.filter(product => product.isFeatured);
    const newArrivals = products.filter(product => product.isNewArrival);
    
    // Create combined array with clear identification
    const combined = [
      ...featured.map(product => ({ ...product, displayType: 'featured' as const })),
      ...newArrivals.map(product => ({ ...product, displayType: 'newArrival' as const }))
    ];
    
    // Remove duplicates and prioritize featured products
    const unique = combined.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );
    
    return {
      featuredProducts: featured.slice(0, 6),
      newArrivalProducts: newArrivals.slice(0, 6), 
      allDayProducts: unique.slice(0, 12)
    };
  }, [products]);

  // Render the appropriate layout based on current day
  const renderDayLayout = () => {
    switch (currentDay) {
      case 0: // Sunday
        return <SundayLayout products={allDayProducts} selectedCurrency={selectedCurrency} />;
      case 1: // Monday
        return <MondayLayout products={allDayProducts} selectedCurrency={selectedCurrency} />;
      case 2: // Tuesday
        return <TuesdayLayout products={allDayProducts} selectedCurrency={selectedCurrency} />;
      case 3: // Wednesday
        return <WednesdayLayout products={allDayProducts} selectedCurrency={selectedCurrency} />;
      case 4: // Thursday
        return <ThursdayLayout products={allDayProducts} selectedCurrency={selectedCurrency} />;
      case 5: // Friday
        return <FridayLayout products={allDayProducts} selectedCurrency={selectedCurrency} />;
      case 6: // Saturday
        return <SaturdayLayout products={allDayProducts} selectedCurrency={selectedCurrency} />;
      default:
        // Fallback to Sunday layout
        return <SundayLayout products={allDayProducts} selectedCurrency={selectedCurrency} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        selectedCurrency={selectedCurrency} 
        onCurrencyChange={() => {}} 
      />
      
      {/* Current Day Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-20 right-6 z-50"
      >
        <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">{getDayName(currentDay)} Collection</span>
          </div>
        </div>
      </motion.div>
      
      {renderDayLayout()}
      
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}