import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Gift, Star, Sparkles, Tag, Calendar, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CountdownTimerProps {
  targetDate: Date;
  title: string;
  description?: string;
}

export function CountdownTimer({ targetDate, title, description }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-timer text-center">
      {/* Ultra Modern Countdown Container - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative max-w-4xl mx-auto px-3 sm:px-4 md:px-6"
      >
        {/* Futuristic Background with Gradient Mesh */}
        <div className="relative">
          {/* Dynamic gradient background */}
          <div 
            className="absolute inset-0 rounded-2xl md:rounded-3xl"
            style={{
              background: `
                linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%),
                radial-gradient(ellipse 600px 300px at 30% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 70%),
                radial-gradient(ellipse 400px 200px at 70% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)
              `
            }}
          />
          
          {/* Animated grid pattern - smaller on mobile */}
          <div 
            className="absolute inset-0 opacity-5 md:opacity-10 rounded-2xl md:rounded-3xl"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Floating orbs - adjusted for mobile */}
          <motion.div
            className="absolute top-4 right-4 md:top-10 md:right-10 w-16 h-16 md:w-32 md:h-32 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-full blur-xl md:blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-4 left-4 md:bottom-10 md:left-10 w-12 h-12 md:w-24 md:h-24 bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 rounded-full blur-lg md:blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 2,
              ease: "easeInOut"
            }}
          />

          {/* Main Content */}
          <div className="relative z-10 p-4 sm:p-6 md:p-12">
            
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center mb-8 md:mb-12"
            >
              {/* Modern Badge */}
              <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-xs md:text-sm font-mono tracking-[0.15em] md:tracking-[0.2em] uppercase">
                  Limited Time
                </span>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              </div>
              
              {/* Title */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-2 tracking-wide">
                {title}
              </h3>
              
              {/* Decorative line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60px' }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto"
              />
            </motion.div>

            {/* Ultra Modern Timer Grid - Mobile Optimized 2x2 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
              
              {/* Days */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-xl md:rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Main container */}
                  <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-purple-500/20 rounded-lg md:rounded-2xl p-3 sm:p-4 md:p-8">
                    {/* Corner accents */}
                    <div className="absolute top-1 left-1 md:top-2 md:left-2 w-2 h-2 md:w-3 md:h-3 border-l-2 border-t-2 border-purple-400/50 rounded-tl-lg"></div>
                    <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-2 h-2 md:w-3 md:h-3 border-r-2 border-b-2 border-purple-400/50 rounded-br-lg"></div>
                    
                    {/* Number */}
                    <motion.div
                      className="text-2xl sm:text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-purple-400 mb-1 sm:mb-2 md:mb-3"
                      key={timeLeft.days}
                      initial={{ scale: 1.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: "backOut" }}
                    >
                      {String(timeLeft.days).padStart(2, '0')}
                    </motion.div>
                    
                    {/* Label */}
                    <div className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] font-medium">
                      Days
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Hours */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="relative">
                  <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-xl md:rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-blue-500/20 rounded-lg md:rounded-2xl p-3 sm:p-4 md:p-8">
                    <div className="absolute top-1 left-1 md:top-2 md:left-2 w-2 h-2 md:w-3 md:h-3 border-l-2 border-t-2 border-blue-400/50 rounded-tl-lg"></div>
                    <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-2 h-2 md:w-3 md:h-3 border-r-2 border-b-2 border-blue-400/50 rounded-br-lg"></div>
                    
                    <motion.div
                      className="text-2xl sm:text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-200 to-blue-400 mb-1 sm:mb-2 md:mb-3"
                      key={timeLeft.hours}
                      initial={{ scale: 1.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: "backOut" }}
                    >
                      {String(timeLeft.hours).padStart(2, '0')}
                    </motion.div>
                    
                    <div className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] font-medium">
                      Hours
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Minutes */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="relative">
                  <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-cyan-500/30 to-emerald-500/30 rounded-xl md:rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-lg md:rounded-2xl p-3 sm:p-4 md:p-8">
                    <div className="absolute top-1 left-1 md:top-2 md:left-2 w-2 h-2 md:w-3 md:h-3 border-l-2 border-t-2 border-cyan-400/50 rounded-tl-lg"></div>
                    <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-2 h-2 md:w-3 md:h-3 border-r-2 border-b-2 border-cyan-400/50 rounded-br-lg"></div>
                    
                    <motion.div
                      className="text-2xl sm:text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-200 to-cyan-400 mb-1 sm:mb-2 md:mb-3"
                      key={timeLeft.minutes}
                      initial={{ scale: 1.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: "backOut" }}
                    >
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </motion.div>
                    
                    <div className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] font-medium">
                      Minutes
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Seconds */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="relative">
                  <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-emerald-500/30 to-purple-500/30 rounded-xl md:rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-emerald-500/20 rounded-lg md:rounded-2xl p-3 sm:p-4 md:p-8">
                    <div className="absolute top-1 left-1 md:top-2 md:left-2 w-2 h-2 md:w-3 md:h-3 border-l-2 border-t-2 border-emerald-400/50 rounded-tl-lg"></div>
                    <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-2 h-2 md:w-3 md:h-3 border-r-2 border-b-2 border-emerald-400/50 rounded-br-lg"></div>
                    
                    <motion.div
                      className="text-2xl sm:text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-emerald-200 to-emerald-400 mb-1 sm:mb-2 md:mb-3"
                      key={timeLeft.seconds}
                      initial={{ scale: 1.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: "backOut" }}
                    >
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </motion.div>
                    
                    <div className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] font-medium">
                      Seconds
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                />
                <span className="tracking-wide font-mono">Offer expires soon</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5] 
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {description && (
        <motion.p 
          className="text-gray-300 mt-8 text-lg font-light max-w-2xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

interface OfferBannerProps {
  title: string;
  description: string;
  discountPercent?: number;
  validUntil?: Date;
  festivalName?: string;
}

export function OfferBanner({ 
  title, 
  description, 
  discountPercent, 
  validUntil, 
  festivalName 
}: OfferBannerProps) {
  return (
    <motion.div
      className="offer-banner rounded-lg p-6 text-white relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Sparkle effects */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gift className="w-6 h-6" />
            {festivalName && (
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {festivalName}
              </Badge>
            )}
          </div>
          {discountPercent && (
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-2xl font-bold">{discountPercent}% OFF</span>
            </div>
          )}
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
        <p className="text-lg mb-4 opacity-90">{description}</p>

        {validUntil && (
          <div className="flex items-center gap-2 text-sm opacity-80">
            <Calendar className="w-4 h-4" />
            <span>Valid until {validUntil.toLocaleDateString()}</span>
          </div>
        )}

        <Button 
          className="mt-4 bg-white text-orange-600 hover:bg-white/90 font-semibold px-8"
          size="lg"
        >
          Shop Now
        </Button>
      </div>
    </motion.div>
  );
}

interface FestivalHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  festivalName: string;
  specialOffer?: string;
}

export function FestivalHero({ 
  title, 
  subtitle, 
  backgroundImage, 
  festivalName, 
  specialOffer 
}: FestivalHeroProps) {
  return (
    <div className="festival-hero flex items-center justify-center relative">
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Festival badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8"
        >
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span className="text-lg font-semibold">{festivalName} Special</span>
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl font-light mb-8 opacity-90"
          >
            {subtitle}
          </motion.p>
        )}

        {specialOffer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="special-price inline-block text-xl md:text-2xl font-bold mb-8"
          >
            {specialOffer}
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 px-8 py-4 text-lg font-semibold">
            Explore Festival Collection
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg"
          >
            View All Offers
          </Button>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Crown className="w-8 h-8 text-yellow-300" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface SeasonalCollectionProps {
  title: string;
  description: string;
  collections: {
    name: string;
    image: string;
    itemCount: number;
    specialPrice?: string;
  }[];
}

export function SeasonalCollection({ title, description, collections }: SeasonalCollectionProps) {
  return (
    <div className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="modern-product-card group cursor-pointer h-full">
                <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{collection.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{collection.itemCount} Items</span>
                    {collection.specialPrice && (
                      <Badge className="special-price border-0">
                        {collection.specialPrice}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FestivalOffersProps {
  offers: {
    title: string;
    description: string;
    discount: string;
    conditions?: string;
    validUntil: Date;
    highlight?: boolean;
  }[];
}

export function FestivalOffers({ offers }: FestivalOffersProps) {
  return (
    <div className="py-16 px-6 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Festival Offers
          </h2>
          <p className="text-lg text-gray-600">Don't miss these limited-time deals</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${offer.highlight ? 'col-span-full lg:col-span-2' : ''}`}
            >
              <Card className={`p-6 h-full ${
                offer.highlight 
                  ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-white' 
                  : 'bg-white'
              }`}>
                {offer.highlight && (
                  <Badge className="absolute -top-3 left-6 bg-white text-orange-600 font-semibold">
                    BEST OFFER
                  </Badge>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <Tag className={`w-6 h-6 ${offer.highlight ? 'text-white' : 'text-orange-600'}`} />
                  <div className={`text-2xl font-bold ${offer.highlight ? 'text-white' : 'text-orange-600'}`}>
                    {offer.discount}
                  </div>
                </div>

                <h3 className={`text-xl font-semibold mb-2 ${offer.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {offer.title}
                </h3>
                <p className={`mb-4 ${offer.highlight ? 'text-white/90' : 'text-gray-600'}`}>
                  {offer.description}
                </p>

                {offer.conditions && (
                  <p className={`text-sm mb-4 ${offer.highlight ? 'text-white/80' : 'text-gray-500'}`}>
                    *{offer.conditions}
                  </p>
                )}

                <div className={`text-sm ${offer.highlight ? 'text-white/90' : 'text-gray-500'}`}>
                  Valid until {offer.validUntil.toLocaleDateString()}
                </div>

                <Button 
                  className={`mt-4 w-full ${
                    offer.highlight 
                      ? 'bg-white text-orange-600 hover:bg-white/90' 
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  Claim Offer
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}