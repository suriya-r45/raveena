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
    <div className="countdown-timer p-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      {description && (
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      )}
      
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-lg p-3 mb-2">
            <div className="text-2xl font-bold">{timeLeft.days}</div>
          </div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">Days</div>
        </div>
        <div className="text-center">
          <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-lg p-3 mb-2">
            <div className="text-2xl font-bold">{timeLeft.hours}</div>
          </div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">Hours</div>
        </div>
        <div className="text-center">
          <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-lg p-3 mb-2">
            <div className="text-2xl font-bold">{timeLeft.minutes}</div>
          </div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">Minutes</div>
        </div>
        <div className="text-center">
          <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-lg p-3 mb-2">
            <div className="text-2xl font-bold">{timeLeft.seconds}</div>
          </div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">Seconds</div>
        </div>
      </div>
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