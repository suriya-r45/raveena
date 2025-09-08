import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/lib/auth';
import Header from '@/components/header';
import ProductForm from '@/components/admin/product-form';
import BillingForm from '@/components/admin/billing-form';
import BillPreview from '@/components/admin/bill-preview';
import CategoryManagement from '@/components/admin/category-management';
import PriceManagement from '@/components/admin/price-management';
import { EstimatesList } from '@/components/admin/estimates-list';
import { HomeSectionsManagement } from '@/components/admin/home-sections-management';
import { MetalRatesAdmin } from '@/components/admin/metal-rates-admin';
import OrderTracking from '@/components/admin/order-tracking';
import VideoManagement from '@/components/admin/video-management';
import UserManagement from '@/components/admin/user-management';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Product, Bill } from '@shared/schema';
import { Currency } from '@/lib/currency';
import { Package, FileText, TrendingUp, Users, Calculator, DollarSign, Edit, QrCode, Printer, Search, CheckSquare, Square, Plus, Receipt, History, ClipboardList, Tag, BarChart3, Grid3X3, Film, Settings, Crown, Eye, EyeOff, Star, StarOff, X } from 'lucide-react';
import BarcodeDisplay from '@/components/barcode-display';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';

// Product Management Dialog Component
function ProductManagementDialog({ products, onClose }: { products: Product[], onClose: () => void }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Mutation to update product active status
  const updateActiveStatusMutation = useMutation({
    mutationFn: async ({ productId, isActive }: { productId: string; isActive: boolean }) => {
      const response = await apiRequest('PATCH', `/api/products/${productId}`, {
        isActive
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ 
        title: "Success", 
        description: "Product status updated successfully" 
      });
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to update product status" 
      });
    }
  });

  // Mutation to update product featured status (Secondary Home Page)
  const updateFeaturedStatusMutation = useMutation({
    mutationFn: async ({ productId, isFeatured }: { productId: string; isFeatured: boolean }) => {
      const response = await apiRequest('PATCH', `/api/products/${productId}`, {
        isFeatured
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ 
        title: "Success", 
        description: "Secondary home page status updated successfully" 
      });
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to update secondary home page status" 
      });
    }
  });

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.productCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto" data-testid="dialog-product-management">
      <DialogHeader>
        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Product Management
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-1">
              Manage product visibility and secondary home page display
            </DialogDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} data-testid="button-close-dialog">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </DialogHeader>

      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by product name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            data-testid="input-search-products"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-blue-600 font-medium">Total Products</p>
                <p className="text-2xl font-bold text-blue-800">{products.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-green-600 font-medium">Active Products</p>
                <p className="text-2xl font-bold text-green-800">{products.filter(p => p.isActive).length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-purple-600 font-medium">On Secondary Home</p>
                <p className="text-2xl font-bold text-purple-800">{products.filter(p => p.isFeatured).length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product List */}
        <div className="space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500" data-testid="message-no-products">
              {searchTerm ? 'No products found matching your search.' : 'No products available.'}
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Product Info */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">PRODUCT CODE</p>
                        <p className="text-sm font-semibold text-gray-900" data-testid={`product-code-${product.id}`}>
                          {product.productCode || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">PRODUCT NAME</p>
                        <p className="text-sm font-semibold text-gray-900" data-testid={`product-name-${product.id}`}>
                          {product.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">STOCK</p>
                        <p className={`text-sm font-semibold ${product.stock > 5 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`} data-testid={`product-stock-${product.id}`}>
                          {product.stock} units
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">PRICE</p>
                        <p className="text-sm font-semibold text-gray-900" data-testid={`product-price-${product.id}`}>
                          ₹{parseInt(product.priceInr).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 lg:gap-4">
                      {/* Active/Inactive Toggle */}
                      <div 
                        className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <Button
                          variant={product.isActive ? "default" : "secondary"}
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateActiveStatusMutation.mutate({ 
                              productId: product.id, 
                              isActive: !product.isActive 
                            });
                          }}
                          disabled={updateActiveStatusMutation.isPending}
                          className={`h-8 px-3 ${product.isActive ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 hover:bg-gray-500'}`}
                          data-testid={`button-toggle-active-${product.id}`}
                        >
                          {product.isActive ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                          {product.isActive ? 'Active' : 'Inactive'}
                        </Button>
                      </div>

                      {/* Secondary Home Page Toggle */}
                      <div 
                        className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <Button
                          variant={product.isFeatured ? "default" : "secondary"}
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateFeaturedStatusMutation.mutate({ 
                              productId: product.id, 
                              isFeatured: !product.isFeatured 
                            });
                          }}
                          disabled={updateFeaturedStatusMutation.isPending}
                          className={`h-8 px-3 ${product.isFeatured ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 hover:bg-gray-500'}`}
                          data-testid={`button-toggle-featured-${product.id}`}
                        >
                          {product.isFeatured ? <Star className="h-3 w-3 mr-1" /> : <StarOff className="h-3 w-3 mr-1" />}
                          {product.isFeatured ? 'On Royal Page' : 'Add to Royal Page'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DialogContent>
  );
}

function SecondaryHomePageToggle() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query to get the secondary home page setting
  const { data: secondaryPageSetting, isLoading } = useQuery({
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
  });

  // Mutation to update the setting
  const toggleMutation = useMutation({
    mutationFn: async (enabled: boolean) => {
      const response = await apiRequest('POST', '/api/settings', {
        key: 'secondary_home_page_enabled',
        value: enabled ? 'true' : 'false',
        description: 'Enable/disable the royal-style secondary home page for special occasions'
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings/secondary_home_page_enabled'] });
      toast({ 
        title: "Success", 
        description: "Secondary home page setting updated successfully" 
      });
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to update secondary home page setting" 
      });
    }
  });

  const isEnabled = secondaryPageSetting?.value === 'true';

  const handleToggle = (checked: boolean) => {
    toggleMutation.mutate(checked);
  };

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200" data-testid="secondary-home-page-toggle">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Crown className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Royal Secondary Home Page
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Enable the premium royal-style home page for special occasions and festivals
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="secondary-page-toggle"
              checked={isEnabled}
              onCheckedChange={handleToggle}
              disabled={isLoading || toggleMutation.isPending}
              data-testid="switch-secondary-page"
            />
            <Label htmlFor="secondary-page-toggle" className="text-sm font-medium">
              {isEnabled ? 'Enabled' : 'Disabled'}
            </Label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <Settings className="h-5 w-5 text-purple-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-purple-800 font-medium mb-1">
              Royal Premium Design Features:
            </p>
            <ul className="text-xs text-purple-700 space-y-1">
              <li>• Ultra-luxury premium layout with royal styling</li>
              <li>• Perfect for festivals, special occasions, and promotions</li>
              <li>• Single elegant layout (not multiple sections like main page)</li>
              <li>• Premium gold and royal color scheme</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const [location, setLocation] = useLocation();
  const { isAdmin, token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('INR');
  const [activeTab, setActiveTab] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam === 'products' || tabParam === 'billing' || tabParam === 'bills' || tabParam === 'estimates' || tabParam === 'categories' || tabParam === 'pricing' || tabParam === 'barcodes' || tabParam === 'home-sections' || tabParam === 'orders' || tabParam === 'metal-rates' || tabParam === 'videos' || tabParam === 'users') {
      return tabParam;
    }
    return 'products';
  });
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [billSearchTerm, setBillSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [isProductManagementOpen, setIsProductManagementOpen] = useState(false);

  // Helper functions for product selection
  const handleProductSelect = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const handleSelectAll = () => {
    const productsWithQR = products.filter(p => p.productCode);
    setSelectedProducts(new Set(productsWithQR.map(p => p.id)));
  };

  const handleClearSelection = () => {
    setSelectedProducts(new Set());
  };

  const printSelectedQRCodes = async () => {
    if (selectedProducts.size === 0) return;
    
    const selectedProductsList = products.filter(p => selectedProducts.has(p.id) && p.productCode);
    if (selectedProductsList.length === 0) return;

    try {
      // Generate all QR codes as data URLs first (same as individual print)
      const qrDataURLs: {[key: string]: string} = {};
      
      for (const product of selectedProductsList) {
        const qrData = `🏷️ PALANIAPPA JEWELLERS
📋 Product Code: ${product.productCode}
💍 Product Name: ${product.name}
⚖️ Purity: ${product.purity || '22K'}
📊 Gross Weight: ${product.grossWeight} g
📈 Net Weight: ${product.netWeight} g
💎 Stone: ${product.stones || 'None'}
📉 Gold Rate: ${product.goldRateAtCreation ? `₹${product.goldRateAtCreation}/g` : 'N/A'}
💰 Approx Price: ₹${parseInt(product.priceInr).toLocaleString('en-IN')}

📞 Contact: +91 994 206 1393
💬 WhatsApp: +91 994 206 1393`;

        // Generate QR code as data URL (same method as individual print)
        const qrCodeDataURL = await QRCode.toDataURL(qrData, {
          width: 120,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'M',
          scale: 4
        });
        
        qrDataURLs[product.id] = qrCodeDataURL;
      }

      // Now create the print window with pre-generated QR codes as images
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const qrCodesPerPage = 4; // 2x2 grid
        
        let barcodesHTML = '';
        for (let i = 0; i < selectedProductsList.length; i += qrCodesPerPage) {
          const pageProducts = selectedProductsList.slice(i, i + qrCodesPerPage);
          
          barcodesHTML += `
            <div style="page-break-after: ${i + qrCodesPerPage < selectedProductsList.length ? 'always' : 'auto'}; padding: 20px; min-height: 100vh; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 20px;">
          `;
          
          pageProducts.forEach((product) => {
            const productType = product.name.split(' ')[0].toUpperCase();
            barcodesHTML += `
              <div style="border: 2px solid #000; border-radius: 10px; padding: 20px; width: 320px; text-align: center; background: white; position: relative; font-family: Arial, sans-serif;">
                <div style="position: absolute; top: 8px; right: 8px; width: 12px; height: 12px; display: flex; align-items: center; justify-content: center; color: #000 !important; font-size: 12px; font-weight: bold; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important;">●</div>
                <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px; letter-spacing: 1px;">PALANIAPPA JEWELLERS</div>
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px; font-family: monospace;">${product.productCode}</div>
                <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                  <span>${productType}</span>
                  <span>${product.purity || '22K'}</span>
                </div>
                <div style="font-size: 12px; font-weight: bold; margin-bottom: 12px;">Gross Weight : ${product.grossWeight} g</div>
                <div style="margin: 12px 0; display: flex; justify-content: center;">
                  <img src="${qrDataURLs[product.id]}" style="width: 120px; height: 120px;" alt="QR Code">
                </div>
                <div style="font-size: 14px; font-weight: bold; margin-top: 8px; font-family: monospace;">${product.productCode}</div>
              </div>
            `;
          });
          
          barcodesHTML += '</div>';
        }

        printWindow.document.write(`
          <html>
            <head>
              <title>Selected Product QR Codes</title>
              <style>
                @page { size: A4; margin: 0.5in; }
                body { margin: 0; padding: 0; }
              </style>
            </head>
            <body>
              ${barcodesHTML}
              <script>
                setTimeout(() => {
                  window.print();
                  setTimeout(() => window.close(), 500);
                }, 500);
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Error generating QR codes:', error);
      toast({
        title: "Error",
        description: "Failed to generate QR codes for printing",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!isAdmin && !token) {
      window.location.href = '/login';
    }
  }, [isAdmin, token]);

  // Handle URL tab parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam === 'products' || tabParam === 'billing' || tabParam === 'bills' || tabParam === 'estimates' || tabParam === 'categories' || tabParam === 'pricing' || tabParam === 'barcodes' || tabParam === 'home-sections' || tabParam === 'orders' || tabParam === 'metal-rates' || tabParam === 'videos' || tabParam === 'users') {
      setActiveTab(tabParam);
    }
  }, []);

  // Listen for URL changes
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam === 'products' || tabParam === 'billing' || tabParam === 'bills' || tabParam === 'estimates' || tabParam === 'categories' || tabParam === 'pricing' || tabParam === 'barcodes' || tabParam === 'home-sections' || tabParam === 'orders' || tabParam === 'metal-rates' || tabParam === 'videos' || tabParam === 'users') {
        setActiveTab(tabParam);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Also check when location changes (for programmatic navigation)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam === 'products' || tabParam === 'billing' || tabParam === 'bills' || tabParam === 'estimates' || tabParam === 'categories' || tabParam === 'pricing' || tabParam === 'barcodes' || tabParam === 'home-sections' || tabParam === 'orders' || tabParam === 'metal-rates' || tabParam === 'videos' || tabParam === 'users') {
      setActiveTab(tabParam);
    }
  }, [location]);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
    enabled: !!token,
  });

  const { data: bills = [] } = useQuery<Bill[]>({
    queryKey: ['/api/bills'],
    queryFn: async () => {
      const response = await fetch('/api/bills', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch bills');
      return response.json();
    },
    enabled: !!token,
  });

  const totalRevenue = bills.reduce((sum, bill) => sum + parseFloat(bill.total), 0);
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock < 5).length;

  // WhatsApp send mutation for bills
  const sendBillToWhatsAppMutation = useMutation({
    mutationFn: async (billId: string) => {
      const response = await fetch(`/api/bills/${billId}/send-whatsapp`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to send bill to WhatsApp");
      }
      return response.json();
    },
    onSuccess: (data: { whatsappUrl: string; message: string }) => {
      toast({
        title: "Success",
        description: "Bill sent to WhatsApp successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bills"] });
      
      // Open WhatsApp URL
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank');
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send bill to WhatsApp.",
        variant: "destructive",
      });
    },
  });

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen" data-testid="page-admin-dashboard" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
      <Header 
        selectedCurrency={selectedCurrency} 
        onCurrencyChange={setSelectedCurrency} 
      />

      <div className="px-3 md:px-6 lg:px-8 py-4 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Admin Dashboard</h1>
          </div>
          <Button
            onClick={() => setLocation('/estimates')}
            className="bg-amber-600 border border-amber-600 text-white hover:bg-amber-700 font-medium shadow-md w-full sm:w-auto text-sm px-3 py-2"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Create Customer Estimate
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card 
            data-testid="card-total-products" 
            className="bg-white shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300 rounded-xl cursor-pointer transform hover:scale-105"
            onClick={() => setIsProductManagementOpen(true)}
          >
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Package className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
                  </div>
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Total Products</p>
                    <p className="text-xl md:text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{totalProducts}</p>
                    <p className="text-xs text-blue-600 font-medium mt-1">Click to manage</p>
                  </div>
                </div>
                <div className="text-blue-400">
                  <Eye className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-total-bills" className="bg-white shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300 rounded-xl">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <FileText className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
                  </div>
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Total Bills</p>
                    <p className="text-xl md:text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{bills.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-total-revenue" className="bg-white shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300 rounded-xl">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-emerald-50 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-emerald-600" />
                  </div>
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Total Revenue</p>
                    <p className="text-lg md:text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {selectedCurrency === 'INR' ? '₹' : 'BD'} {totalRevenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-low-stock" className="bg-white shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300 rounded-xl">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <Users className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
                  </div>
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Low Stock Items</p>
                    <p className="text-xl md:text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{lowStockProducts}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6" data-testid="tabs-admin">
          <div className="relative">
            {/* Mobile: Vertical scrollable tabs */}
            <div className="md:hidden">
              <div className="overflow-x-auto">
                <TabsList className="grid w-full grid-cols-12 bg-white border border-gray-200 shadow-md h-auto p-2 rounded-xl min-w-max">
                  <TabsTrigger value="products" data-testid="tab-products" className="text-xs font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-300 px-3 py-3 mx-1 rounded-lg min-h-[44px] flex items-center justify-center whitespace-nowrap border border-gray-200">
                    <Plus className="h-4 w-4 mr-1" />
                    Products
                  </TabsTrigger>
                  <TabsTrigger value="billing" data-testid="tab-billing" className="text-xs font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-300 px-3 py-3 mx-1 rounded-lg min-h-[44px] flex items-center justify-center whitespace-nowrap border border-gray-200">
                    <Receipt className="h-4 w-4 mr-1" />
                    Billing
                  </TabsTrigger>
                  <TabsTrigger value="bills" data-testid="tab-bills" className="text-xs font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-300 px-3 py-3 mx-1 rounded-lg min-h-[44px] flex items-center justify-center whitespace-nowrap border border-gray-200">
                    <History className="h-4 w-4 mr-1" />
                    Bills History
                  </TabsTrigger>
                  <TabsTrigger value="estimates" data-testid="tab-estimates" className="text-xs font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-300 px-3 py-3 mx-1 rounded-lg min-h-[44px] flex items-center justify-center whitespace-nowrap border border-gray-200">
                    <ClipboardList className="h-4 w-4 mr-1" />
                    Estimates
                  </TabsTrigger>
                  <TabsTrigger value="categories" data-testid="tab-categories" className="text-xs font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-300 px-3 py-3 mx-1 rounded-lg min-h-[44px] flex items-center justify-center whitespace-nowrap border border-gray-200">
                    <Tag className="h-4 w-4 mr-1" />
                    Categories
                  </TabsTrigger>
                  <TabsTrigger value="pricing" data-testid="tab-pricing" className="text-xs font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-300 px-3 py-3 mx-1 rounded-lg min-h-[44px] flex items-center justify-center whitespace-nowrap border border-gray-200">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Pricing
                  </TabsTrigger>
                  <TabsTrigger value="barcodes" data-testid="tab-barcodes" className="text-xs font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-300 px-3 py-3 mx-1 rounded-lg min-h-[44px] flex items-center justify-center whitespace-nowrap border border-gray-200">
                    <QrCode className="h-4 w-4 mr-1" />
                    QR Codes
                  </TabsTrigger>
                  <TabsTrigger value="home-sections" data-testid="tab-home-sections" className="text-xs font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-300 px-3 py-3 mx-1 rounded-lg min-h-[44px] flex items-center justify-center whitespace-nowrap border border-gray-200">
                    <Grid3X3 className="h-4 w-4 mr-1" />
                    Home Sections
                  </TabsTrigger>
                  <TabsTrigger value="orders" data-testid="tab-orders" className="text-xs font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-300 px-3 py-3 mx-1 rounded-lg min-h-[44px] flex items-center justify-center whitespace-nowrap border border-gray-200">
                    <Package className="h-4 w-4 mr-1" />
                    Order Tracking
                  </TabsTrigger>
                  <TabsTrigger value="metal-rates" data-testid="tab-metal-rates" className="text-xs font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-300 px-3 py-3 mx-1 rounded-lg min-h-[44px] flex items-center justify-center whitespace-nowrap border border-gray-200">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Metal Rates
                  </TabsTrigger>
                  <TabsTrigger value="videos" data-testid="tab-videos" className="text-xs font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-300 px-3 py-3 mx-1 rounded-lg min-h-[44px] flex items-center justify-center whitespace-nowrap border border-gray-200">
                    <Film className="h-4 w-4 mr-1" />
                    Videos
                  </TabsTrigger>
                  <TabsTrigger value="users" data-testid="tab-users" className="text-xs font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-300 px-3 py-3 mx-1 rounded-lg min-h-[44px] flex items-center justify-center whitespace-nowrap border border-gray-200">
                    <Users className="h-4 w-4 mr-1" />
                    Users
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            {/* Desktop: Original horizontal layout */}
            <TabsList className="hidden md:grid w-full grid-cols-12 bg-white border border-gray-200 shadow-sm h-auto p-1">
              <TabsTrigger value="products" data-testid="tab-products" className="text-xs md:text-sm font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-200 px-1 py-2 mx-0.5 rounded-md min-h-[40px] flex items-center justify-center border border-gray-200">
                <Plus className="h-4 w-4 mr-1" />
                Products
              </TabsTrigger>
              <TabsTrigger value="billing" data-testid="tab-billing" className="text-xs md:text-sm font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-200 px-1 py-2 mx-0.5 rounded-md min-h-[40px] flex items-center justify-center border border-gray-200">
                <Receipt className="h-4 w-4 mr-1" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="bills" data-testid="tab-bills" className="text-xs md:text-sm font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-200 px-1 py-2 mx-0.5 rounded-md min-h-[40px] flex items-center justify-center border border-gray-200">
                <History className="h-4 w-4 mr-1" />
                Bills History
              </TabsTrigger>
              <TabsTrigger value="estimates" data-testid="tab-estimates" className="text-xs md:text-sm font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-200 px-1 py-2 mx-0.5 rounded-md min-h-[40px] flex items-center justify-center border border-gray-200">
                <ClipboardList className="h-4 w-4 mr-1" />
                Customer Estimates
              </TabsTrigger>
              <TabsTrigger value="categories" data-testid="tab-categories" className="text-xs md:text-sm font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-200 px-1 py-2 mx-0.5 rounded-md min-h-[40px] flex items-center justify-center border border-gray-200">
                <Tag className="h-4 w-4 mr-1" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="pricing" data-testid="tab-pricing" className="text-xs md:text-sm font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-200 px-1 py-2 mx-0.5 rounded-md min-h-[40px] flex items-center justify-center border border-gray-200">
                <BarChart3 className="h-4 w-4 mr-1" />
                Pricing
              </TabsTrigger>
              <TabsTrigger value="barcodes" data-testid="tab-barcodes" className="text-xs md:text-sm font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-200 px-1 py-2 mx-0.5 rounded-md min-h-[40px] flex items-center justify-center border border-gray-200">
                <QrCode className="h-4 w-4 mr-1" />
                QR Codes
              </TabsTrigger>
              <TabsTrigger value="home-sections" data-testid="tab-home-sections" className="text-xs md:text-sm font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-200 px-1 py-2 mx-0.5 rounded-md min-h-[40px] flex items-center justify-center border border-gray-200">
                <Grid3X3 className="h-4 w-4 mr-1" />
                Home Sections
              </TabsTrigger>
              <TabsTrigger value="orders" data-testid="tab-orders" className="text-xs md:text-sm font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-200 px-1 py-2 mx-0.5 rounded-md min-h-[40px] flex items-center justify-center border border-gray-200">
                <Package className="h-4 w-4 mr-1" />
                Order Tracking
              </TabsTrigger>
              <TabsTrigger value="metal-rates" data-testid="tab-metal-rates" className="text-xs md:text-sm font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-200 px-1 py-2 mx-0.5 rounded-md min-h-[40px] flex items-center justify-center border border-gray-200">
                <TrendingUp className="h-4 w-4 mr-1" />
                Metal Rates
              </TabsTrigger>
              <TabsTrigger value="videos" data-testid="tab-videos" className="text-xs md:text-sm font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-200 px-1 py-2 mx-0.5 rounded-md min-h-[40px] flex items-center justify-center border border-gray-200">
                <Film className="h-4 w-4 mr-1" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="users" data-testid="tab-users" className="text-xs md:text-sm font-light text-gray-700 hover:text-gray-500 hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:text-gray-700 data-[state=active]:shadow-md transition-all duration-200 px-1 py-2 mx-0.5 rounded-md min-h-[40px] flex items-center justify-center border border-gray-200">
                <Users className="h-4 w-4 mr-1" />
                Users
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="products" className="space-y-6">
            <ProductForm currency={selectedCurrency} />
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <BillingForm 
              currency={selectedCurrency} 
              products={products} 
            />
          </TabsContent>

          <TabsContent value="bills" className="space-y-6">
            <Card data-testid="card-bills-history" className="bg-white shadow-sm border border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800 font-light" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Bills History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search Bills */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search by customer name, mobile number, or bill number..."
                      value={billSearchTerm}
                      onChange={(e) => setBillSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-400 text-gray-700"
                      data-testid="input-search-bills"
                    />
                  </div>
                  {bills.length === 0 ? (
                    <p className="text-gray-500 text-center py-8" data-testid="message-no-bills">
                      No bills generated yet.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full bg-white rounded-lg border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-light text-gray-700">Bill No.</th>
                            <th className="px-4 py-3 text-left text-sm font-light text-gray-700">Customer</th>
                            <th className="px-4 py-3 text-left text-sm font-light text-gray-700">Date</th>
                            <th className="px-4 py-3 text-left text-sm font-light text-gray-700">Amount</th>
                            <th className="px-4 py-3 text-left text-sm font-light text-gray-700">Currency</th>
                            <th className="px-4 py-3 text-left text-sm font-light text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {bills
                            .filter(bill => {
                              if (!billSearchTerm) return true;
                              const searchLower = billSearchTerm.toLowerCase();
                              return (
                                bill.customerName.toLowerCase().includes(searchLower) ||
                                bill.customerPhone.toLowerCase().includes(searchLower) ||
                                bill.billNumber.toLowerCase().includes(searchLower)
                              );
                            })
                            .map((bill) => (
                            <tr key={bill.id} className="hover:bg-gray-50" data-testid={`row-bill-${bill.id}`}>
                              <td className="px-4 py-3 text-sm font-light text-gray-700">{bill.billNumber}</td>
                              <td className="px-4 py-3 text-sm font-light text-gray-700">{bill.customerName}</td>
                              <td className="px-4 py-3 text-sm font-light text-gray-700">
                                {new Date(bill.createdAt!).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3 text-sm font-light text-gray-700">
                                {bill.currency === 'INR' ? '₹' : 'BD'} {parseFloat(bill.total).toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-sm font-light text-gray-700">{bill.currency}</td>
                              <td className="px-4 py-3 text-sm">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setSelectedBill(bill)}
                                    data-testid={`button-preview-${bill.id}`}
                                  >
                                    Preview
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      // Store bill data in localStorage for editing
                                      localStorage.setItem('editBill', JSON.stringify(bill));
                                      // Set active tab immediately
                                      setActiveTab('billing');
                                      // Also update URL for consistency
                                      setLocation('/admin?tab=billing');
                                      
                                      toast({
                                        title: "Bill Loaded",
                                        description: `Bill ${bill.billNumber} loaded for editing.`,
                                      });
                                    }}
                                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                                    data-testid={`button-edit-${bill.id}`}
                                  >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      const link = document.createElement('a');
                                      link.href = `/api/bills/${bill.id}/pdf`;
                                      link.download = `${bill.customerName.replace(/\s+/g, '_')}_${bill.billNumber}.pdf`;
                                      document.body.appendChild(link);
                                      link.click();
                                      document.body.removeChild(link);
                                    }}
                                    data-testid={`button-download-${bill.id}`}
                                  >
                                    Download
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => sendBillToWhatsAppMutation.mutate(bill.id)}
                                    disabled={sendBillToWhatsAppMutation.isPending}
                                    className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                                    data-testid={`button-whatsapp-${bill.id}`}
                                  >
                                    {sendBillToWhatsAppMutation.isPending ? "Sending..." : "Send to WhatsApp"}
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="estimates" className="space-y-6">
            <EstimatesList />
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <CategoryManagement />
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <PriceManagement />
          </TabsContent>

          <TabsContent value="barcodes" className="space-y-6">
            <Card data-testid="card-barcode-management" className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-700 font-light" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <QrCode className="h-5 w-5 text-gray-700" />
                  Product QR Code Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {products.length === 0 ? (
                    <div className="text-center py-8">
                      <QrCode className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 font-light" data-testid="message-no-products">
                        No products available for QR code generation.
                      </p>
                      <p className="text-sm text-gray-500 font-light">
                        Add products first to generate QR codes.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-sm text-gray-600 mb-4">
                        Total Products: <span className="font-semibold">{products.length}</span> | 
                        Products with QR Codes: <span className="font-semibold">{products.filter(p => p.productCode).length}</span>
                      </div>
                      
                      {/* Search Products by Name */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          placeholder="Search products by name..."
                          value={productSearchTerm}
                          onChange={(e) => setProductSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {products
                          .filter(product => 
                            product.name.toLowerCase().includes(productSearchTerm.toLowerCase())
                          )
                          .map((product) => (
                          <div key={product.id} className="bg-white border rounded-lg shadow-sm relative">
                            {/* Selection Checkbox */}
                            {product.productCode && (
                              <div className="absolute top-3 left-3 z-10">
                                <button
                                  onClick={() => handleProductSelect(product.id)}
                                  className="flex items-center justify-center w-6 h-6 border-2 border-gray-400 rounded hover:border-rose-500 transition-colors"
                                  style={{ backgroundColor: selectedProducts.has(product.id) ? '#be185d' : 'white' }}
                                >
                                  {selectedProducts.has(product.id) && (
                                    <CheckSquare className="w-4 h-4 text-white" />
                                  )}
                                </button>
                              </div>
                            )}
                            <div className="p-4">
                              <div className="flex items-start gap-3 mb-4">
                                <img
                                  src={product.images?.[0] || '/placeholder-jewelry.jpg'}
                                  alt={product.name}
                                  className="w-16 h-16 rounded-lg object-cover border"
                                />
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-gray-900 truncate">
                                    {product.name}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {product.category}
                                  </p>
                                  <p className="text-sm font-medium text-gray-900">
                                    ₹{parseInt(product.priceInr).toLocaleString('en-IN')}
                                  </p>
                                </div>
                              </div>
                              
                              {product.productCode ? (
                                <div className="space-y-3">
                                  <div className="flex justify-center">
                                    <BarcodeDisplay 
                                      product={product}
                                    />
                                  </div>
                                  <p className="text-xs text-center font-mono text-gray-600">
                                    {product.productCode}
                                  </p>
                                </div>
                              ) : (
                                <div className="text-center text-gray-500 py-4">
                                  <QrCode className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                  <p className="text-xs">No QR code generated</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {products.filter(p => p.productCode).length > 0 && (
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            onClick={handleSelectAll}
                            className="text-sm"
                          >
                            <CheckSquare className="w-4 h-4 mr-2" />
                            Select All
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleClearSelection}
                            className="text-sm"
                          >
                            <Square className="w-4 h-4 mr-2" />
                            Clear Selection
                          </Button>
                          <Button
                            onClick={printSelectedQRCodes}
                            disabled={selectedProducts.size === 0}
                            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm"
                          >
                            <Printer className="w-4 h-4 mr-2" />
                            Print Selected ({selectedProducts.size})
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="home-sections" className="space-y-6">
            <SecondaryHomePageToggle />
            <HomeSectionsManagement />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrderTracking />
          </TabsContent>

          <TabsContent value="metal-rates" className="space-y-6">
            <MetalRatesAdmin />
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <VideoManagement />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Management Dialog */}
      <Dialog open={isProductManagementOpen} onOpenChange={setIsProductManagementOpen}>
        <ProductManagementDialog 
          products={products} 
          onClose={() => setIsProductManagementOpen(false)} 
        />
      </Dialog>

      {/* Bill Preview Modal */}
      {selectedBill && (
        <BillPreview
          bill={selectedBill}
          onClose={() => setSelectedBill(null)}
        />
      )}
    </div>
  );
}