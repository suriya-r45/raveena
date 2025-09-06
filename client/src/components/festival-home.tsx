import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Product } from '@shared/schema';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import WhatsAppFloat from '@/components/whatsapp-float';
import { Currency } from '@/lib/currency';
import { 
  FestivalHero, 
  CountdownTimer, 
  OfferBanner, 
  SeasonalCollection, 
  FestivalOffers 
} from '@/components/festival-components';
import { motion } from "framer-motion";
import { Sparkles, Crown, Gift, Star } from "lucide-react";

// Sample festival data - in real app, this would come from API/admin
const festivalData = {
  currentFestival: {
    name: "Diwali",
    title: "Golden Celebrations",
    subtitle: "Illuminate your festivities with timeless elegance",
    specialOffer: "Up to 50% OFF + Free Gold Plating",
    backgroundImage: "/api/placeholder/1920/1080",
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  },
  offers: [
    {
      title: "Diwali Gold Rush",
      description: "Extra 30% off on all gold jewelry. Perfect for gifting this festive season.",
      discount: "30% OFF",
      conditions: "Minimum purchase of ₹25,000. Valid on gold jewelry only.",
      validUntil: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      highlight: true
    },
    {
      title: "Silver Sparkle",
      description: "Beautiful silver collections at unbeatable prices.",
      discount: "25% OFF",
      conditions: "On silver jewelry above ₹5,000",
      validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    },
    {
      title: "Diamond Dazzle",
      description: "Shine bright with our diamond collection.",
      discount: "40% OFF",
      conditions: "On selected diamond pieces",
      validUntil: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)
    },
    {
      title: "Free Gift Wrapping",
      description: "Complimentary luxury gift wrapping for all purchases.",
      discount: "FREE",
      conditions: "No minimum purchase required",
      validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
    },
    {
      title: "Exchange Bonus",
      description: "Get extra value when you exchange your old jewelry.",
      discount: "₹5,000 EXTRA",
      conditions: "On jewelry exchange above ₹20,000",
      validUntil: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
    }
  ],
  seasonalCollections: [
    {
      name: "Diwali Gold Collection",
      image: "/api/placeholder/400/500",
      itemCount: 45,
      specialPrice: "Starting ₹15,999"
    },
    {
      name: "Festival Silver Sets",
      image: "/api/placeholder/400/500", 
      itemCount: 32,
      specialPrice: "Starting ₹3,999"
    },
    {
      name: "Bridal Specials",
      image: "/api/placeholder/400/500",
      itemCount: 28,
      specialPrice: "Starting ₹25,999"
    },
    {
      name: "Diamond Delights",
      image: "/api/placeholder/400/500",
      itemCount: 18,
      specialPrice: "Starting ₹45,999"
    },
    {
      name: "Kids Festive Jewelry",
      image: "/api/placeholder/400/500",
      itemCount: 22,
      specialPrice: "Starting ₹2,999"
    },
    {
      name: "Men's Gold Chains",
      image: "/api/placeholder/400/500",
      itemCount: 15,
      specialPrice: "Starting ₹12,999"
    }
  ]
};

export default function FestivalHomePage() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(Currency.INR);

  // Fetch products for featured sections
  const { data: allProducts = [] } = useQuery({
    queryKey: ['/api/products'],
    queryFn: () => apiRequest('/api/products')
  });

  // Ensure products is an array and filter for festival sections
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

  return (
    <div className="min-h-screen bg-background">
      <Header 
        selectedCurrency={selectedCurrency} 
        onCurrencyChange={setSelectedCurrency} 
      />
      
      {/* Festival Hero Section */}
      <FestivalHero
        title={festivalData.currentFestival.title}
        subtitle={festivalData.currentFestival.subtitle}
        backgroundImage={festivalData.currentFestival.backgroundImage}
        festivalName={festivalData.currentFestival.name}
        specialOffer={festivalData.currentFestival.specialOffer}
      />

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
              <CountdownTimer
                targetDate={festivalData.currentFestival.endDate}
                title="Festival Sale Ends In"
                description="Don't miss out on these amazing deals!"
              />
            </motion.div>

            {/* Featured Offer Banner */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <OfferBanner
                title="Limited Time Offer"
                description="Extra savings on your favorite jewelry pieces. Shop now before time runs out!"
                discountPercent={50}
                validUntil={festivalData.currentFestival.endDate}
                festivalName={festivalData.currentFestival.name}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Festival Offers Grid */}
      <FestivalOffers offers={festivalData.offers} />

      {/* Seasonal Collections */}
      <SeasonalCollection
        title="Festival Collections"
        description="Curated jewelry collections perfect for this festive season"
        collections={festivalData.seasonalCollections}
      />

      {/* Featured Products Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-6 h-6 text-orange-600" />
              <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: 'Playfair Display, serif' }}>
                Featured Pieces
              </h2>
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-lg text-gray-600">Handpicked favorites for the festive season</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} currency={selectedCurrency} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-amber-50/30 to-orange-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-orange-600" />
              <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: 'Playfair Display, serif' }}>
                New Arrivals
              </h2>
              <Sparkles className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-lg text-gray-600">Latest additions to our festival collection</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newArrivalProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} currency={selectedCurrency} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold Collection Spotlight */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-orange-600" />
              <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: 'Playfair Display, serif' }}>
                Gold Collection
              </h2>
              <Crown className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-lg text-gray-600">Premium gold jewelry for your special celebrations</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {goldProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} currency={selectedCurrency} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Gift className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Ready to Celebrate?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Visit our store or browse online to find the perfect jewelry for your festivities. 
              Our experts are ready to help you create magical moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Visit Store
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Call Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}