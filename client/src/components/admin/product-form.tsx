import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Trash2, Upload, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import { Product, MetalRate } from '@shared/schema';

// Categories from home page
const HOME_CATEGORIES = {
  'rings': {
    name: 'Rings 💍',
    subcategories: [
      'Engagement Rings',
      'Wedding Bands',
      'Fashion Rings',
      'Cocktail Rings',
      'Promise Rings',
      'Birthstone Rings'
    ]
  },
  'necklaces': {
    name: 'Necklaces 📿',
    subcategories: [
      'Chains',
      'Chokers',
      'Lockets',
      'Beaded Necklaces',
      'Collars',
      'Long Necklaces/Opera Chains',
      'Multi-layered Necklaces'
    ]
  },
  'pendants': {
    name: 'Pendants ✨',
    subcategories: [
      'Solitaire',
      'Halo',
      'Cluster',
      'Heart',
      'Cross',
      'Initial',
      'Diamond',
      'Gemstone',
      'Pearl',
      'Bridal',
      'Minimalist',
      'Traditional'
    ]
  },
  'earrings': { 
    name: 'Earrings 🌸',
    subcategories: [
      'Stud Earrings',
      'Hoop Earrings',
      'Drop Earrings',
      'Dangle Earrings',
      'Ear Cuffs',
      'Huggie Earrings'
    ]
  },
  'bracelets': {
    name: 'Bracelets 🔗',
    subcategories: [
      'Cuff',
      'Tennis',
      'Charm',
      'Chain',
      'Beaded',
      'Link',
      'Bolo',
      'Leather',
      'Diamond',
      'Gemstone',
      'Pearl',
      'Bridal',
      'Minimalist',
      'Traditional'
    ]
  },
  'bangles': {
    name: 'Bangles 💫',
    subcategories: [
      'Classic',
      'Kada',
      'Cuff',
      'Openable',
      'Adjustable',
      'Charm',
      'Diamond',
      'Gemstone',
      'Pearl',
      'Bridal',
      'Minimalist',
      'Traditional',
      'Temple',
      'Kundan',
      'Polki',
      'Navratna'
    ]
  },
  'watches': {
    name: 'Watches ⌚',
    subcategories: [
      "Men's Watches",
      "Women's Watches",
      'Smartwatches',
      'Luxury Watches',
      'Sport Watches'
    ]
  },
  'men': {
    name: 'Men 👨',
    subcategories: [
      'Bracelets',
      'Chain',
      'Cufflinks Button',
      'Pendant',
      'Ring',
      'Stud'
    ]
  },
  'kids': {
    name: 'Kids 🧒',
    subcategories: [
      'Bangle',
      'Bracelet',
      'Chain',
      'Earrings',
      'Gold Kid Anklet',
      'Necklace',
      'Pendant',
      'Ring',
      'Waist Chain'
    ]
  },
  'occasion': {
    name: 'Occasion 🎉',
    subcategories: [
      'Casual Wear',
      'Daily Wear',
      'Miniature',
      'Office Wear',
      'Party Wear',
      'Pooja Items'
    ]
  },
  'accessories': {
    name: 'Accessories 👜',
    subcategories: [
      'Belt',
      'Button Pin',
      'Frames',
      'Pen',
      'Safety Pin',
      'Wallet'
    ]
  },
  'materials': {
    name: 'Materials 💎',
    subcategories: [
      'Gold Jewellery',
      'Silver Jewellery',
      'Platinum Jewellery',
      'Diamond Jewellery',
      'Gemstone Jewellery',
      'Pearl Jewellery'
    ]
  },
  'collections': {
    name: 'Collections 👰',
    subcategories: [
      'Bridal Collection',
      'Vintage Collection',
      'Contemporary Collection',
      'Minimalist Collection',
      'Celebrity Collection'
    ]
  },
  'custom': {
    name: 'Custom Jewellery ✏️',
    subcategories: [
      'Design Your Own',
      'Engraving Services',
      'Repairs & Restorations'
    ]
  },
  'new_arrivals': {
    name: 'New Arrivals ✨',
    subcategories: [
      'Latest Products',
      'Featured Items',
      'Trending Now',
      'Exclusive Pieces'
    ]
  },
  'gold_coins': {
    name: 'Gold Coins 🪙',
    subcategories: [
      'Investment',
      'Religious',
      'Customized',
      'Occasion',
      'Corporate Gifting',
      'Collectible',
      'Plain',
      'Hallmarked'
    ]
  },
  'mangalsutra': {
    name: 'Mangalsutra 🖤',
    subcategories: [
      'Traditional',
      'Contemporary',
      'Diamond',
      'Gold',
      'Long Chain',
      'Short Chain',
      'Pendant Style',
      'Beaded'
    ]
  },
  'nose jewellery': {
    name: 'Nose Jewelry 👃',
    subcategories: [
      'Nose Rings',
      'Nose Studs',
      'Septum Rings',
      'Traditional',
      'Contemporary',
      'Diamond',
      'Gold',
      'Silver'
    ]
  },
  'anklets & toe rings': {
    name: 'Anklets & Toe Rings 👣',
    subcategories: [
      'Anklets',
      'Toe Rings',
      'Chain Anklets',
      'Charm Anklets',
      'Traditional',
      'Contemporary',
      'Gold',
      'Silver'
    ]
  },
  'bridal collections': {
    name: 'Bridal Collections 💍',
    subcategories: [
      'Bridal Sets',
      'Wedding Jewelry',
      'Engagement Jewelry',
      'Traditional Bridal',
      'Contemporary Bridal',
      'Complete Sets'
    ]
  }
};

const MATERIAL_OPTIONS = [
  { value: 'GOLD_22K', label: 'Gold 22K' },
  { value: 'GOLD_18K', label: 'Gold 18K' },
  { value: 'SILVER_925', label: 'Silver 925' },
  { value: 'GOLD_PLATED_SILVER', label: 'Gold Platted Silver Jewellery' },
  { value: 'PLATINUM', label: 'Platinum' },
  { value: 'DIAMOND', label: 'Diamond' },
  { value: 'GEMSTONE', label: 'Gemstone' },
  { value: 'PEARL', label: 'Pearl' },
  { value: 'OTHER', label: 'Other' }
];

import { Currency } from '@/lib/currency';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface ProductFormProps {
  currency: Currency;
}

function ProductForm({ currency }: ProductFormProps) {
  const { token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  // Fetch current metal rates for automatic calculation
  const { data: metalRates = [] } = useQuery<MetalRate[]>({
    queryKey: ['/api/metal-rates'],
    refetchInterval: 60000, // Refresh every minute
  });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subCategory: '',
    material: 'GOLD_22K',
    metalType: 'GOLD', // Add metalType field
    priceInr: '',
    priceBhd: '',
    grossWeight: '',
    netWeight: '',
    purity: '22K',
    stones: 'None',
    stock: '',
    isNewArrival: false,
    isMetalPriceBased: false
  });

  // Auto-calculate prices when weight or material changes
  const calculatePrices = (grossWeight: string, material: string, purity: string) => {
    console.log('calculatePrices called with:', { grossWeight, material, purity, metalRatesLength: metalRates.length });
    
    if (!grossWeight || !metalRates.length) {
      console.log('Early return: no weight or no metal rates');
      return { priceInr: '', priceBhd: '' };
    }
    
    const weight = parseFloat(grossWeight);
    if (isNaN(weight) || weight <= 0) {
      console.log('Early return: invalid weight');
      return { priceInr: '', priceBhd: '' };
    }

    // Find the appropriate metal type from material
    let metalType = 'GOLD';
    if (material.includes('SILVER')) metalType = 'SILVER';
    else if (material.includes('GOLD')) metalType = 'GOLD';
    else {
      console.log('Early return: unsupported material');
      return { priceInr: '', priceBhd: '' }; // Only calculate for gold/silver
    }

    // Find rates for the metal type and purity (matching API response format)
    const indiaRate = metalRates.find(rate => 
      rate.market === 'INDIA' && 
      rate.metal === metalType && 
      rate.purity === purity
    );
    const bahrainRate = metalRates.find(rate => 
      rate.market === 'BAHRAIN' && 
      rate.metal === metalType && 
      rate.purity === purity
    );

    if (!indiaRate || !bahrainRate) return { priceInr: '', priceBhd: '' };

    // Calculate prices (weight * rate per gram) - using correct field names
    const priceInr = (weight * parseFloat(indiaRate.pricePerGramInr)).toFixed(0);
    const priceBhd = (weight * parseFloat(bahrainRate.pricePerGramBhd)).toFixed(3);

    return { priceInr, priceBhd };
  };

  // Update prices when weight or material changes
  const updateFormData = (updates: Partial<typeof formData>) => {
    console.log('updateFormData called with:', updates);
    const newFormData = { ...formData, ...updates };
    
    // Auto-calculate if gross weight, material, or purity changed
    if (updates.grossWeight !== undefined || updates.material !== undefined || updates.purity !== undefined) {
      console.log('Triggering calculation...');
      const calculatedPrices = calculatePrices(
        updates.grossWeight ?? newFormData.grossWeight,
        updates.material ?? newFormData.material,
        updates.purity ?? newFormData.purity
      );
      
      console.log('Calculated result:', calculatedPrices);
      
      if (calculatedPrices.priceInr && calculatedPrices.priceBhd) {
        newFormData.priceInr = calculatedPrices.priceInr;
        newFormData.priceBhd = calculatedPrices.priceBhd;
        console.log('Prices updated in form data');
      } else {
        console.log('No prices calculated');
      }
    }
    
    setFormData(newFormData);
  };

  // Helper function to determine metalType from material
  const getMetalTypeFromMaterial = (material: string): string => {
    if (material.includes('GOLD') && !material.includes('PLATED')) return 'GOLD';
    if (material.includes('SILVER') || material.includes('GOLD_PLATED_SILVER')) return 'SILVER';
    if (material.includes('DIAMOND')) return 'DIAMOND';
    if (material.includes('PEARL')) return 'PEARL';
    if (material.includes('PLATINUM')) return 'PLATINUM';
    if (material.includes('GEMSTONE')) return 'GEMSTONE';
    return 'OTHER';
  };
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);


  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    enabled: !!token,
  });

  // Fetch categories from API
  const { data: apiCategories = [] } = useQuery<any[]>({
    queryKey: ['/api/categories'],
    enabled: !!token,
  });



  const addProductMutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (!token) {
        throw new Error('Authentication required');
      }
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to create product');
      }
      return response.json();
    },
    onSuccess: (newProduct) => {
      // Optimized cache update - add product to existing cache instead of full refetch
      queryClient.setQueryData(['/api/products'], (oldData: Product[] | undefined) => {
        return oldData ? [newProduct, ...oldData] : [newProduct];
      });
      
      // Invalidate home sections to refresh homepage immediately
      queryClient.invalidateQueries({ queryKey: ['/api/home-sections/public'] });
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      
      toast({
        title: "Success", 
        description: "Product added successfully!",
      });
      resetForm();
      
      // Auto-refresh homepage if it's open in another tab
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          // Trigger a storage event to notify other tabs
          window.localStorage.setItem('homepage-refresh', Date.now().toString());
          window.localStorage.removeItem('homepage-refresh');
        }, 500);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add product.",
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({
        title: "Success",
        description: "Product deleted successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // Handle boolean values properly
      if (typeof value === 'boolean') {
        data.append(key, value ? 'true' : 'false');
      } else {
        data.append(key, String(value));
      }
    });
    
    selectedFiles.forEach(file => {
      data.append('images', file);
    });

    addProductMutation.mutate(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      subCategory: '',
      material: 'GOLD_22K',
      metalType: 'GOLD',
      priceInr: '',
      priceBhd: '',
      grossWeight: '',
      netWeight: '',
      purity: '22K',
      stones: 'None',
      stock: '',
      isNewArrival: false,
      isMetalPriceBased: false
    });
    setSelectedFiles([]);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(id);
    }
  };

  // Auto-populate product name when material and subcategory are selected
  useEffect(() => {
    if (formData.material && formData.subCategory) {
      const materialLabel = MATERIAL_OPTIONS.find(m => m.value === formData.material)?.label || formData.material;
      const autoGeneratedName = `${materialLabel} ${formData.subCategory}`;
      setFormData(prev => ({ ...prev, name: autoGeneratedName }));
    }
  }, [formData.material, formData.subCategory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Add Product Form */}
      <Card data-testid="card-add-product" className="bg-white shadow-sm border border-amber-200">
        <CardHeader>
          <CardTitle className="text-gray-900 font-semibold flex items-center gap-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            <Plus className="h-5 w-5 text-amber-700" />
            Add New Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-add-product">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value, subCategory: '' })}
                  required
                >
                  <SelectTrigger data-testid="select-category">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Static predefined categories */}
                    {Object.entries(HOME_CATEGORIES).map(([key, category]) => (
                      <SelectItem key={key} value={key}>{category.name}</SelectItem>
                    ))}
                    {/* Dynamic categories from API */}
                    {apiCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="subCategory" className="font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Sub Category</Label>
                <Select 
                  value={formData.subCategory} 
                  onValueChange={(value) => setFormData({ ...formData, subCategory: value })}
                  disabled={!formData.category}
                >
                  <SelectTrigger data-testid="select-subcategory">
                    <SelectValue placeholder={formData.category ? "Select Sub Category" : "Select Category First"} />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Show subcategories from static HOME_CATEGORIES */}
                    {formData.category && HOME_CATEGORIES[formData.category as keyof typeof HOME_CATEGORIES]?.subcategories?.map((subCat) => (
                      <SelectItem key={subCat} value={subCat}>
                        {subCat}
                      </SelectItem>
                    ))}
                    
                    {/* For API categories, show children as subcategories */}
                    {formData.category && apiCategories.find(cat => cat.id === formData.category)?.children?.map((child: any) => (
                      <SelectItem key={`api-${child.id}`} value={child.name}>
                        {child.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="material" className="font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Material</Label>
                <Select 
                  value={formData.material} 
                  onValueChange={(value) => updateFormData({ 
                    material: value,
                    metalType: getMetalTypeFromMaterial(value) // Auto-set metalType
                  })}
                >
                  <SelectTrigger data-testid="select-material">
                    <SelectValue placeholder="Select Material" />
                  </SelectTrigger>
                  <SelectContent>
                    {MATERIAL_OPTIONS.map((material) => (
                      <SelectItem key={material.value} value={material.value}>
                        {material.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="name" className="font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  required
                  data-testid="input-product-name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Product Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter detailed description"
                rows={3}
                required
                data-testid="textarea-description"
              />
            </div>

            {/* Purity and Stones - moved above weight for better calculation flow */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="purity" className="font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Purity</Label>
                <Select 
                  value={formData.purity} 
                  onValueChange={(value) => updateFormData({ purity: value })}
                >
                  <SelectTrigger data-testid="select-purity">
                    <SelectValue placeholder="Select Purity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24K">24K Gold</SelectItem>
                    <SelectItem value="22K">22K Gold</SelectItem>
                    <SelectItem value="18K">18K Gold</SelectItem>
                    <SelectItem value="14K">14K Gold</SelectItem>
                    <SelectItem value="925">925 Silver</SelectItem>
                    <SelectItem value="999">999 Silver</SelectItem>
                    <SelectItem value="PT950">PT950 Platinum</SelectItem>
                    <SelectItem value="PT900">PT900 Platinum</SelectItem>
                    <SelectItem value="VS1">VS1 Diamond</SelectItem>
                    <SelectItem value="VS2">VS2 Diamond</SelectItem>
                    <SelectItem value="VVS1">VVS1 Diamond</SelectItem>
                    <SelectItem value="VVS2">VVS2 Diamond</SelectItem>
                    <SelectItem value="FL">FL (Flawless) Diamond</SelectItem>
                    <SelectItem value="IF">IF (Internally Flawless) Diamond</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-blue-600 mt-1">Select purity for automatic price calculation</p>
              </div>
              
              <div>
                <Label htmlFor="stones" className="font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Stones/Gems</Label>
                <Input
                  id="stones"
                  value={formData.stones}
                  onChange={(e) => setFormData({ ...formData, stones: e.target.value })}
                  placeholder="None, Diamond, Ruby, etc."
                  data-testid="input-stones"
                  className="bg-white"
                />
              </div>
            </div>

            {/* Weight fields - for automatic price calculation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grossWeight" className="font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Gross Weight (g)</Label>
                <Input
                  id="grossWeight"
                  type="number"
                  step="0.1"
                  value={formData.grossWeight}
                  onChange={(e) => updateFormData({ grossWeight: e.target.value })}
                  placeholder="0.0"
                  required
                  data-testid="input-gross-weight"
                  className="bg-white"
                />
                <p className="text-xs text-gray-500 mt-1">Prices auto-calculate based on current metal rates</p>
              </div>
              
              <div>
                <Label htmlFor="netWeight" className="font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Net Weight (g)</Label>
                <Input
                  id="netWeight"
                  type="number"
                  step="0.1"
                  value={formData.netWeight}
                  onChange={(e) => updateFormData({ netWeight: e.target.value })}
                  placeholder="0.0"
                  required
                  data-testid="input-net-weight"
                  className="bg-white"
                />
              </div>
            </div>

            {/* Auto-calculated price fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priceInr" className="font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Price (INR)</Label>
                <Input
                  id="priceInr"
                  type="number"
                  step="0.01"
                  value={formData.priceInr}
                  onChange={(e) => setFormData({ ...formData, priceInr: e.target.value })}
                  placeholder="Auto-calculated or enter manually"
                  required
                  data-testid="input-price-inr"
                  className="bg-white"
                />
                <p className="text-xs text-green-600 mt-1">✓ Auto-calculated from weight × current rates</p>
              </div>
              
              <div>
                <Label htmlFor="priceBhd" className="font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Price (BHD)</Label>
                <Input
                  id="priceBhd"
                  type="number"
                  step="0.001"
                  value={formData.priceBhd}
                  onChange={(e) => setFormData({ ...formData, priceBhd: e.target.value })}
                  placeholder="Auto-calculated or enter manually"
                  required
                  data-testid="input-price-bhd"
                  className="bg-white"
                />
                <p className="text-xs text-green-600 mt-1">✓ Auto-calculated from weight × current rates</p>
              </div>
            </div>



            <div>
              <Label htmlFor="stock" className="font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="0"
                required
                data-testid="input-stock"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isNewArrival"
                  checked={formData.isNewArrival === true}
                  onCheckedChange={(checked) => setFormData({ ...formData, isNewArrival: checked === true })}
                  data-testid="checkbox-new-arrival"
                />
                <Label htmlFor="isNewArrival" className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Mark as New Arrival (will appear in New Arrivals section)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isMetalPriceBased"
                  checked={formData.isMetalPriceBased === true}
                  onCheckedChange={(checked) => setFormData({ ...formData, isMetalPriceBased: checked === true })}
                  data-testid="checkbox-metal-price-based"
                />
                <Label htmlFor="isMetalPriceBased" className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Calculate price based on current metal rates (weight-based pricing)
                </Label>
              </div>
            </div>

            <div>
              <Label htmlFor="images" className="font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Product Images</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400">
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  data-testid="input-images"
                />
                <label htmlFor="images" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload images or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                </label>
              </div>
              
              {selectedFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="preview-images">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => setSelectedFiles(files => files.filter((_, i) => i !== index))}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                        data-testid={`button-remove-image-${index}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 border border-green-600 text-white hover:bg-green-700 font-medium py-3 rounded-lg shadow-lg transition-all"
              disabled={addProductMutation.isPending}
              data-testid="button-add-product"
            >
              {addProductMutation.isPending ? 'Adding Product...' : 'Add Product'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Product List */}
      <Card data-testid="card-product-inventory" className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-700 font-light" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {products.length === 0 ? (
              <p className="text-gray-500 text-center py-8" data-testid="message-no-products">
                No products added yet.
              </p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg p-4 border shadow-sm" data-testid={`item-product-${product.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.images[0] || "https://images.unsplash.com/photo-1603561596112-db2eca6c9df4?w=60"}
                        alt={product.name}
                        className="w-15 h-15 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-black">{product.name}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant={product.stock > 5 ? "default" : product.stock > 0 ? "destructive" : "secondary"}>
                            Stock: {product.stock}
                          </Badge>
                          <Badge variant="outline">{product.category}</Badge>
                          {product.productCode && (
                            <Badge variant="secondary" className="font-mono text-xs">
                              {product.productCode}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          ₹{parseInt(product.priceInr).toLocaleString('en-IN')} | BD {parseFloat(product.priceBhd).toFixed(3)}
                        </p>
                        {product.purity && (
                          <p className="text-xs text-gray-500">
                            {product.purity} • {product.grossWeight}g • {product.stones || 'No stones'}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingProduct(product)}
                        data-testid={`button-edit-${product.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product.id)}
                        disabled={deleteProductMutation.isPending}
                        data-testid={`button-delete-${product.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductForm;
