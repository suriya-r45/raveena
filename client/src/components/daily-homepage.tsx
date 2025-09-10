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

  const divineImages = [jewelryImage1, jewelryImage2, jewelryImage3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % divineImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [divineImages.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Divine Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-100/50 via-transparent to-yellow-100/30" />
        
        {/* Divine Light Rays */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-1/2 w-px h-full origin-top"
              style={{
                background: `linear-gradient(to bottom, rgba(251, 191, 36, ${0.1 + (i % 3) * 0.1}), transparent)`,
                transform: `translateX(-50%) rotate(${i * 30}deg)`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scaleY: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Floating Divine Elements */}
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
                y: [-30, -80, -30],
                rotate: [0, 360],
                scale: [0.5, 1.2, 0.5],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <Sun className="w-4 h-4 text-amber-400/40" />
            </motion.div>
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-6xl lg:text-8xl font-black mb-6 leading-tight"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                    Divine
                  </span>
                  <br />
                  <span className="text-amber-900">Elegance</span>
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
                  {/* Divine Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-yellow-400/30 rounded-full blur-3xl transform scale-150" />
                  
                  <div className="relative z-10 aspect-square rounded-3xl overflow-hidden border-4 border-amber-200/50 shadow-2xl">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={divineImages[currentSlide]}
                        alt="Divine Collection"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
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
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const royalImages = [royalGoldImage, goldCollectionImage, bridalCollectionsImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % royalImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [royalImages.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Royal Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-800/50 via-transparent to-blue-800/30" />
        
        {/* Royal Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Royal Sparkles */}
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
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              <Diamond className="w-3 h-3 text-purple-300/60" />
            </motion.div>
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-6xl lg:text-8xl font-black mb-6 leading-tight"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                    Royal
                  </span>
                  <br />
                  <span className="text-white drop-shadow-lg">Majesty</span>
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
                  {/* Royal Aura */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 rounded-full blur-3xl transform scale-150" />
                  
                  <div className="relative z-10 aspect-square rounded-3xl overflow-hidden border-4 border-purple-300/30 shadow-2xl">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={royalImages[currentSlide]}
                        alt="Royal Collection"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
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

  const luxeImages = [diamondCollectionImage, earringsLuxuryImage, ringsLuxuryImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % luxeImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [luxeImages.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern Luxe Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-teal-900/20" />
        
        {/* Modern Grid */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M0 0h100v1H0zM0 20h100v1H0zM0 40h100v1H0zM0 60h100v1H0zM0 80h100v1H0z'/%3E%3Cpath d='M0 0v100h1V0zM20 0v100h1V0zM40 0v100h1V0zM60 0v100h1V0zM80 0v100h1V0z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [-20, 20, -20],
                y: [-30, 30, -30],
                rotate: [0, 360],
                scale: [0.5, 1.5, 0.5],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <div 
                className="w-4 h-4 border border-emerald-400/40 transform rotate-45"
                style={{
                  background: i % 2 === 0 ? 'rgba(52, 211, 153, 0.1)' : 'transparent'
                }}
              />
            </motion.div>
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-6xl lg:text-8xl font-black mb-6 leading-tight"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Modern
                  </span>
                  <br />
                  <span className="text-white drop-shadow-lg">Luxe</span>
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
                  {/* Modern Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-3xl transform scale-125" />
                  
                  <div className="relative z-10 aspect-square rounded-2xl overflow-hidden border border-emerald-400/30 shadow-2xl backdrop-blur-sm">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={luxeImages[currentSlide]}
                        alt="Modern Luxe Collection"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
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

// Main Daily Homepage Component
export default function DailyHomepage({ selectedCurrency }: DailyHomepageProps) {
  const currentDay = getCurrentDay();
  
  // Fetch all products
  const { data: allProducts = [] } = useQuery({
    queryKey: ['/api/products'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const products = Array.isArray(allProducts) ? allProducts as Product[] : [];
  
  // Get current day's products (featured + new arrivals for variety)
  const currentDayProducts = useMemo(() => {
    const featured = products.filter(product => product.isFeatured);
    const newArrivals = products.filter(product => product.isNewArrival);
    const combined = [...featured, ...newArrivals];
    
    // Remove duplicates and return up to 12 products
    const unique = combined.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );
    
    return unique.slice(0, 12);
  }, [products]);

  // Render the appropriate layout based on current day
  const renderDayLayout = () => {
    switch (currentDay) {
      case 0: // Sunday
        return <SundayLayout products={currentDayProducts} selectedCurrency={selectedCurrency} />;
      case 1: // Monday
        return <MondayLayout products={currentDayProducts} selectedCurrency={selectedCurrency} />;
      case 2: // Tuesday
        return <TuesdayLayout products={currentDayProducts} selectedCurrency={selectedCurrency} />;
      default:
        // For Wednesday-Saturday, show Sunday layout as placeholder
        return <SundayLayout products={currentDayProducts} selectedCurrency={selectedCurrency} />;
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