// import { openWhatsAppGeneral } from '@/lib/whatsapp';
import { MessageCircle, Phone, Mail, MapPin, Instagram, Package, Search } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import logoPath from '@assets/company_logo_new.jpg';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';


// Order Tracking Component
function OrderTrackingDialog() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<any>(null);
  const { toast } = useToast();

  const handleTrackOrder = async () => {
    if (!trackingNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tracking number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/track/${trackingNumber.trim()}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          toast({
            title: "Tracking Number Not Found",
            description: "Please check your tracking number and try again",
            variant: "destructive"
          });
        } else {
          throw new Error('Failed to track order');
        }
        setTrackingData(null);
        return;
      }

      const data = await response.json();
      setTrackingData(data);
      toast({
        title: "Order Found!",
        description: "Your order tracking information has been retrieved",
      });
    } catch (error) {
      console.error('Error tracking order:', error);
      toast({
        title: "Error",
        description: "Failed to track order. Please try again later.",
        variant: "destructive"
      });
      setTrackingData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'OUT_FOR_DELIVERY':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'IN_TRANSIT':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'PICKED_UP':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'CREATED':
      case 'PICKUP_SCHEDULED':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'RETURNED':
      case 'LOST':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status?.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) || 'Unknown';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 text-amber-800 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300"
          data-testid="button-track-order"
        >
          <Package className="h-4 w-4 mr-2" />
          Track Your Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-amber-600" />
            <span>Track Your Order</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Tracking Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Enter your tracking number:
            </label>
            <div className="flex space-x-2">
              <Input
                placeholder="e.g., TR123456789"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                className="flex-1"
                data-testid="input-tracking-number"
              />
              <Button 
                onClick={handleTrackOrder} 
                disabled={isLoading}
                className="bg-amber-600 hover:bg-amber-700"
                data-testid="button-track-submit"
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Tracking Results */}
          {trackingData && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border" data-testid="tracking-results">
              {/* Status Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Tracking: {trackingData.trackingNumber}
                </h3>
                <Badge className={getStatusColor(trackingData.status)}>
                  {formatStatus(trackingData.status)}
                </Badge>
              </div>

              {/* Delivery Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Carrier</h4>
                  <p className="text-gray-600">{trackingData.carrier}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Destination</h4>
                  <p className="text-gray-600">
                    {trackingData.recipientCity}, {trackingData.recipientState}, {trackingData.recipientCountry}
                  </p>
                </div>

                {trackingData.estimatedDeliveryDate && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Estimated Delivery</h4>
                    <p className="text-gray-600">{formatDate(trackingData.estimatedDeliveryDate)}</p>
                  </div>
                )}

                {trackingData.actualDeliveryDate && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Delivered On</h4>
                    <p className="text-green-600 font-medium">{formatDate(trackingData.actualDeliveryDate)}</p>
                  </div>
                )}
              </div>

              {/* Tracking Events */}
              {trackingData.trackingEvents && trackingData.trackingEvents.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Tracking History</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {trackingData.trackingEvents.map((event: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded border">
                        <div className="flex-shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-800">{event.status}</p>
                            <p className="text-xs text-gray-500">
                              {formatDate(event.timestamp)}
                            </p>
                          </div>
                          {event.description && (
                            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          )}
                          {event.location && (
                            <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Last Update */}
              {trackingData.lastTrackingUpdate && (
                <div className="text-xs text-gray-500 text-center pt-2 border-t">
                  Last updated: {formatDate(trackingData.lastTrackingUpdate)}
                </div>
              )}
            </div>
          )}

          {/* Help Text */}
          <div className="text-sm text-gray-500 text-center">
            <p>Your tracking number can be found in your order confirmation email.</p>
            <p className="mt-1">Need help? Contact us at <span className="text-amber-600">jewelerypalaniappa@gmail.com</span></p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Footer() {
  return (
    <footer className="py-4 border-t-2" data-testid="footer-main" style={{
      background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)',
      borderTopColor: '#E5E5E5',
      color: '#374151'
    }}>
      <div className="container mx-auto px-4">
        {/* Order Tracking Section */}
        <div className="text-center py-6 mb-8 border-b border-gray-200">
          <h3 className="text-lg font-light text-gray-800 mb-3">Track Your Order</h3>
          <p className="text-sm text-gray-600 mb-4">Get real-time updates on your jewelry order status</p>
          <OrderTrackingDialog />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={logoPath}
                  alt="Palaniappa Jewellers Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-light text-gray-800">PALANIAPPA JEWELLERS</h3>
                <p className="text-xs font-light text-gray-600">Since 2025</p>
              </div>
            </div>
            <p className="text-sm font-light text-gray-600">
              Premium jewelry crafted with precision and elegance for discerning customers worldwide.
            </p>
          </div>

          {/* <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-home">Home</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-products">Products</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-about">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-contact">Contact</a></li>
            </ul>
          </div> */}

          <div>
            <h4 className="text-lg font-light mb-4 text-gray-800">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 font-light hover:text-gray-800 transition-colors" data-testid="link-category-gold">Gold Jewelry</a></li>
              <li><a href="#" className="text-gray-600 font-light hover:text-gray-800 transition-colors" data-testid="link-category-diamond">Diamond Jewelry</a></li>
              <li><a href="#" className="text-gray-600 font-light hover:text-gray-800 transition-colors" data-testid="link-category-silver">Silver Jewelry</a></li>
              <li><a href="#" className="text-gray-600 font-light hover:text-gray-800 transition-colors" data-testid="link-category-custom">Custom Designs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-light mb-4 text-gray-800">Contact Info</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <a 
                href="https://wa.me/919597201554?text=Hi!%20I'm%20interested%20in%20your%20jewelry%20collection.%20Could%20you%20please%20help%20me%20with%20more%20information?"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors cursor-pointer" 
                data-testid="link-whatsapp-phone"
              >
                <FaWhatsapp className="h-4 w-4 text-green-500" />
                <span className="text-green-600">+91 959 720 1554</span>
              </a>
              <a
                href="https://instagram.com/palaniappa.bh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-pink-500 hover:text-pink-400 transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
              </a>
              <p className="flex items-center space-x-2" data-testid="text-email">
                <Mail className="h-4 w-4 text-gray-600" />
                <span>jewelerypalaniappa@gmail.com</span>
              </p>
              {/* <p className="flex items-center space-x-2" data-testid="text-address">
                <MapPin className="h-4 w-4" />
                <span>123 Jewelry Street, Chennai</span>
              </p> */}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-light mb-4 text-gray-800">Locations</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-800">India</h4>
                  <p className="text-sm text-gray-600">Salem, Tamil Nadu</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-800">Bahrain</h4>
                  <p className="text-sm text-gray-600">Gold City, Manama</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 text-center text-sm border-t-2 border-gray-200 text-gray-600">
          <p>&copy; 2025 Palaniappa Jewellers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
