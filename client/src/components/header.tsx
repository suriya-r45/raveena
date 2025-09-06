import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, LogOut, Heart, ShoppingCart, Menu } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Currency, CURRENCY_NAMES } from '@/lib/currency';
import CartButton from '@/components/cart/cart-button';
import MobileMenu from '@/components/mobile-menu';
import { MetalRatesDropdown } from '@/components/metal-rates-dropdown';
import logoPath from '@assets/company_logo_new.jpg';

interface HeaderProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export default function Header({ selectedCurrency, onCurrencyChange }: HeaderProps) {
  const [location] = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };


  return (
    <>
      {/* Main Header */}
      <header className="shadow-sm sticky top-0 z-50 border-b border-gray-200" data-testid="header-main" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
        <div className="container mx-auto px-2 md:px-4">
          {/* Top Row */}
          <div className="flex items-center justify-between h-16 md:h-16">
            {/* Left Section - Mobile Menu & Brand */}
            <div className="flex items-center space-x-1 md:space-x-4 flex-1 min-w-0">
              {/* Hamburger Menu - Mobile Only */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1 text-gray-700 hover:bg-gray-50 flex-shrink-0"
              >
                <Menu className="h-4 w-4" />
              </Button>

              {/* Brand with Logo */}
              <Link href="/" className="flex items-center space-x-1 md:space-x-3 min-w-0 flex-1" data-testid="link-home">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden border border-gray-300 flex-shrink-0">
                  <img 
                    src={logoPath} 
                    alt="Palaniappa Jewellers Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xs md:text-2xl font-light text-gray-800 tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif', whiteSpace: 'nowrap', overflow: 'visible' }}>PALANIAPPA JEWELLERS</h1>
                  <p className="text-[9px] md:text-xs text-gray-600 font-light hidden md:block">ESTD 2025</p>
                </div>
              </Link>
            </div>


            {/* Center Section - Metal Rates & Currency (Desktop Only) */}
            <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
              {/* Metal Rates Dropdown */}
              <MetalRatesDropdown selectedCurrency={selectedCurrency} />
              
              {/* Currency Selection */}
              <Select value={selectedCurrency} onValueChange={onCurrencyChange} data-testid="select-currency-main">
                <SelectTrigger className="bg-white/90 hover:bg-white border border-gray-300 rounded-full px-3 py-2 h-8 w-auto min-w-[100px] shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-2 cursor-pointer">
                    {selectedCurrency === 'INR' ? (
                      <div className="w-4 h-4 rounded-full overflow-hidden border border-gray-200">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <rect width="24" height="8" fill="#FF9933"/>
                          <rect y="8" width="24" height="8" fill="#FFFFFF"/>
                          <rect y="16" width="24" height="8" fill="#138808"/>
                          <circle cx="12" cy="12" r="3" fill="#000080"/>
                        </svg>
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full overflow-hidden border border-gray-200">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <rect width="24" height="12" fill="#FFFFFF"/>
                          <rect y="12" width="24" height="12" fill="#CE1126"/>
                          <path d="M0 0 L8 6 L0 12 V8 L4 6 L0 4 Z" fill="#CE1126"/>
                        </svg>
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-800">
                      {selectedCurrency === 'INR' ? 'India' : 'Bahrain'}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent className="min-w-[140px] rounded-xl border border-gray-200 shadow-lg bg-white">
                  <SelectItem value="INR" data-testid="option-inr-main" className="rounded-lg">
                    <div className="flex items-center gap-3 py-1">
                      <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <rect width="24" height="8" fill="#FF9933"/>
                          <rect y="8" width="24" height="8" fill="#FFFFFF"/>
                          <rect y="16" width="24" height="8" fill="#138808"/>
                          <circle cx="12" cy="12" r="3" fill="#000080"/>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">India</span>
                        <span className="text-xs text-gray-500">₹ INR</span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="BHD" data-testid="option-bhd-main" className="rounded-lg">
                    <div className="flex items-center gap-3 py-1">
                      <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <rect width="24" height="12" fill="#FFFFFF"/>
                          <rect y="12" width="24" height="12" fill="#CE1126"/>
                          <path d="M0 0 L8 6 L0 12 V8 L4 6 L0 4 Z" fill="#CE1126"/>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">Bahrain</span>
                        <span className="text-xs text-gray-500">BD BHD</span>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Right Section - Icons */}
            <div className="flex items-center space-x-0.5 md:space-x-4 flex-shrink-0">

              {/* Login/Profile */}
              <div className="flex flex-col items-center">
                {user ? (
                  <div className="flex items-center space-x-0.5">
                    {isAdmin && (
                      <Link href="/admin">
                        <Button variant="ghost" size="sm" className="text-gray-800 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 px-0.5 md:px-2 py-1" data-testid="button-admin-dashboard">
                          <span className="text-[8px] md:text-xs">Dashboard</span>
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="p-0.5 md:p-2 text-gray-800 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                      data-testid="button-logout"
                    >
                      <LogOut className="h-3 w-3 md:h-6 md:w-6" />
                    </Button>
                  </div>
                ) : (
                  <Link href="/login">
                    <button className="p-0.5 md:p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <User className="h-3 w-3 md:h-6 md:w-6 text-gray-800" />
                    </button>
                  </Link>
                )}
              </div>

              {/* Wishlist Heart */}
              <button className="p-0.5 md:p-2 hover:bg-gray-50 rounded-lg">
                <Heart className="h-3 w-3 md:h-6 md:w-6 text-gray-800" />
              </button>

              {/* Cart with Badge */}
              <div className="relative">
                <CartButton />
              </div>
            </div>
          </div>

          {/* Second Header Row - Metal Rates & Currency (Mobile Only) */}
          <div className="md:hidden flex items-center justify-between h-10 border-t border-gray-100">
            {/* Left - Metal Rates Dropdown */}
            <div className="flex items-center">
              <MetalRatesDropdown selectedCurrency={selectedCurrency} />
            </div>

            {/* Right - Currency Selection */}
            <div className="flex items-center">
              <Select value={selectedCurrency} onValueChange={onCurrencyChange} data-testid="select-currency-secondary">
                <SelectTrigger className="bg-white/90 hover:bg-white border border-gray-300 rounded-full px-3 py-2 h-8 w-auto min-w-[100px] shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-2 cursor-pointer">
                    {selectedCurrency === 'INR' ? (
                      <div className="w-4 h-4 rounded-full overflow-hidden border border-gray-200">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <rect width="24" height="8" fill="#FF9933"/>
                          <rect y="8" width="24" height="8" fill="#FFFFFF"/>
                          <rect y="16" width="24" height="8" fill="#138808"/>
                          <circle cx="12" cy="12" r="3" fill="#000080"/>
                        </svg>
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full overflow-hidden border border-gray-200">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <rect width="24" height="12" fill="#FFFFFF"/>
                          <rect y="12" width="24" height="12" fill="#CE1126"/>
                          <path d="M0 0 L8 6 L0 12 V8 L4 6 L0 4 Z" fill="#CE1126"/>
                        </svg>
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-800">
                      {selectedCurrency === 'INR' ? 'India' : 'Bahrain'}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent className="min-w-[140px] rounded-xl border border-gray-200 shadow-lg bg-white">
                  <SelectItem value="INR" data-testid="option-inr-secondary" className="rounded-lg">
                    <div className="flex items-center gap-3 py-1">
                      <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <rect width="24" height="8" fill="#FF9933"/>
                          <rect y="8" width="24" height="8" fill="#FFFFFF"/>
                          <rect y="16" width="24" height="8" fill="#138808"/>
                          <circle cx="12" cy="12" r="3" fill="#000080"/>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">India</span>
                        <span className="text-xs text-gray-500">₹ INR</span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="BHD" data-testid="option-bhd-secondary" className="rounded-lg">
                    <div className="flex items-center gap-3 py-1">
                      <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <rect width="24" height="12" fill="#FFFFFF"/>
                          <rect y="12" width="24" height="12" fill="#CE1126"/>
                          <path d="M0 0 L8 6 L0 12 V8 L4 6 L0 4 Z" fill="#CE1126"/>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">Bahrain</span>
                        <span className="text-xs text-gray-500">BD BHD</span>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

        </div>

      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        selectedCurrency={selectedCurrency}
      />
    </>
  );
}
