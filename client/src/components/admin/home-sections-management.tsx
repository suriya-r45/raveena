import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Settings, Eye, EyeOff, Move, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import type { HomeSection, Product, HomeSectionItem } from "@shared/schema";

interface HomeSectionWithItems extends HomeSection {
  items: HomeSectionItemWithProduct[];
}

interface HomeSectionItemWithProduct extends HomeSectionItem {
  product: Product;
}

interface CreateHomeSectionData {
  title: string;
  subtitle: string;
  description: string;
  layoutType: 'grid' | 'featured' | 'mixed' | 'festival' | 'festival-specials' | 'carousel' | 'mosaic' | 'magazine' | 'new-arrivals' | 'premium' | 'zen' | 'royal' | 'curved-grid' | 'tilted-grid';
  isActive: boolean;
  displayOrder: number;
  backgroundColor: string;
  textColor: string;
  festivalImage?: string;
  showCountdown: boolean; // Toggle for countdown timer
  countdownStartDate?: string;
  countdownEndDate?: string;
  countdownTitle?: string;
  countdownDescription?: string;
}

interface AddSectionItemData {
  productId: string;
  displayName?: string;
  displayPrice?: string;
  displayPriceInr?: string;
  displayPriceBhd?: string;
  position: number;
  size: 'small' | 'normal' | 'large';
}

export function HomeSectionsManagement() {
  const [activeTab, setActiveTab] = useState("sections");
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [addingItemToSection, setAddingItemToSection] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Queries
  const { data: homeSections, isLoading: sectionsLoading } = useQuery<HomeSectionWithItems[]>({
    queryKey: ["/api/home-sections"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/home-sections");
      return response.json();
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    staleTime: 0, // Always refetch to get latest products
    refetchOnWindowFocus: true,
  });

  // Mutations
  const createSectionMutation = useMutation({
    mutationFn: async (data: CreateHomeSectionData) => {
      const response = await apiRequest("POST", "/api/home-sections", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/home-sections"] });
      queryClient.invalidateQueries({ queryKey: ["/api/home-sections/public"] }); // Refresh public home sections
      queryClient.invalidateQueries({ queryKey: ["/api/products"] }); // Refresh products too
      toast({ title: "Success", description: "Home section created successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create home section" });
    }
  });

  const updateSectionMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateHomeSectionData> }) => {
      const response = await apiRequest("PUT", `/api/home-sections/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/home-sections"] });
      queryClient.invalidateQueries({ queryKey: ["/api/home-sections/public"] }); // Refresh public home sections
      toast({ title: "Success", description: "Home section updated successfully" });
      setEditingSectionId(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update home section" });
    }
  });

  const deleteSectionMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/home-sections/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/home-sections"] });
      queryClient.invalidateQueries({ queryKey: ["/api/home-sections/public"] }); // Refresh public home sections
      toast({ title: "Success", description: "Home section deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete home section" });
    }
  });

  const addItemMutation = useMutation({
    mutationFn: async ({ sectionId, data }: { sectionId: string; data: AddSectionItemData }) => {
      const response = await apiRequest("POST", `/api/home-sections/${sectionId}/items`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/home-sections"] });
      queryClient.invalidateQueries({ queryKey: ["/api/home-sections/public"] }); // Refresh public home sections
      toast({ title: "Success", description: "Product added to section successfully" });
      setAddingItemToSection("");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add product to section" });
    }
  });

  const removeItemMutation = useMutation({
    mutationFn: async ({ sectionId, itemId }: { sectionId: string; itemId: string }) => {
      const response = await apiRequest("DELETE", `/api/home-sections/${sectionId}/items/${itemId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/home-sections"] });
      queryClient.invalidateQueries({ queryKey: ["/api/home-sections/public"] }); // Refresh public home sections
      toast({ title: "Success", description: "Product removed from section successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to remove product from section" });
    }
  });

  if (sectionsLoading || productsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6" data-testid="home-sections-management">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Custom Home Sections</h2>
          <p className="text-sm sm:text-base font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Create and manage custom showcase sections for your homepage</p>
        </div>
        <CreateSectionDialog
          onCreate={(data) => createSectionMutation.mutate(data)}
          isLoading={createSectionMutation.isPending}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sections" className="text-sm">Manage Sections</TabsTrigger>
          <TabsTrigger value="preview" className="text-sm">Live Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-4 mt-4">
          {!homeSections || homeSections.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No custom sections yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Create your first custom home section to showcase products in unique layouts
                </p>
                <CreateSectionDialog
                  onCreate={(data) => createSectionMutation.mutate(data)}
                  isLoading={createSectionMutation.isPending}
                />
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {homeSections.map((section: HomeSectionWithItems) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  products={products || []}
                  onUpdate={(data) => updateSectionMutation.mutate({ id: section.id, data })}
                  onDelete={() => deleteSectionMutation.mutate(section.id)}
                  onAddItem={(data) => addItemMutation.mutate({ sectionId: section.id, data })}
                  onRemoveItem={(itemId) => removeItemMutation.mutate({ sectionId: section.id, itemId })}
                  isUpdating={updateSectionMutation.isPending}
                  isDeleting={deleteSectionMutation.isPending}
                  isAddingItem={addItemMutation.isPending}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="preview" className="space-y-4 mt-4">
          <div className="rounded-lg border bg-background p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Homepage Preview</h3>
            <div className="space-y-6 sm:space-y-8">
              {homeSections?.filter((section: HomeSectionWithItems) => section.isActive).map((section: HomeSectionWithItems) => (
                <div
                  key={section.id}
                  className="rounded-lg p-4 sm:p-6"
                  style={{
                    backgroundColor: section.backgroundColor || '#fff8e1',
                    color: section.textColor || '#8b4513'
                  }}
                >
                  <div className="text-center mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">{section.title}</h2>
                    {section.subtitle && <p className="text-base sm:text-lg opacity-90">{section.subtitle}</p>}
                    {section.description && <p className="mt-2 text-sm sm:text-base opacity-80">{section.description}</p>}
                  </div>
                  
                  <div className={`grid gap-3 sm:gap-4 ${getLayoutClasses(section.layoutType, section.items.length)}`}>
                    {section.items.map((item: HomeSectionItemWithProduct, index: number) => (
                      <div
                        key={item.id}
                        className={`rounded-lg bg-background/10 p-3 sm:p-4 ${getSizeClasses(item.size || 'normal')}`}
                      >
                        <div className="aspect-square bg-background/20 rounded-lg mb-2 sm:mb-3 flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 opacity-50" />
                        </div>
                        <h4 className="font-semibold text-xs sm:text-sm">
                          {item.displayName || item.product.name}
                        </h4>
                        <p className="text-xs sm:text-sm opacity-80">
                          {item.displayPrice || `Starting from ${(section.textColor || '#8b4513') === '#FFFFFF' ? 'BHD' : '₹'} ${item.product.priceInr}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )) || (
                <div className="text-center py-8 sm:py-12 text-muted-foreground">
                  <ImageIcon className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm sm:text-base">No active sections to preview</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CreateSectionDialog({ 
  onCreate, 
  isLoading 
}: { 
  onCreate: (data: CreateHomeSectionData) => void;
  isLoading: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<CreateHomeSectionData>({
    title: "",
    subtitle: "",
    description: "",
    layoutType: "grid",
    isActive: true,
    displayOrder: 0,
    backgroundColor: "#fff8e1",
    textColor: "#8b4513",
    showCountdown: false,
    countdownStartDate: "",
    countdownEndDate: "",
    countdownTitle: "",
    countdownDescription: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData to handle file uploads
    const submissionData = new FormData();
    
    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        submissionData.append(key, value ? 'true' : 'false');
      } else {
        submissionData.append(key, String(value));
      }
    });
    
    // Add festival image if selected
    if (selectedFile) {
      submissionData.append('festivalImage', selectedFile);
    }
    
    // Submit the data
    try {
      await submitSectionWithImage(submissionData);
      setOpen(false);
      // Reset form
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        layoutType: "grid",
        isActive: true,
        displayOrder: 0,
        backgroundColor: "#fff8e1",
        textColor: "#8b4513",
        countdownStartDate: "",
        countdownEndDate: "",
        countdownTitle: "",
        countdownDescription: ""
      });
      setSelectedFile(null);
    } catch (error) {
      console.error('Error creating section:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const submitSectionWithImage = async (formData: FormData) => {
    // First create the section without the image
    const sectionData: CreateHomeSectionData = {
      title: formData.get('title') as string,
      subtitle: formData.get('subtitle') as string,
      description: formData.get('description') as string,
      layoutType: formData.get('layoutType') as any,
      isActive: formData.get('isActive') === 'true',
      displayOrder: parseInt(formData.get('displayOrder') as string),
      backgroundColor: formData.get('backgroundColor') as string,
      textColor: formData.get('textColor') as string,
      countdownStartDate: formData.get('countdownStartDate') as string || undefined,
      countdownEndDate: formData.get('countdownEndDate') as string || undefined,
      countdownTitle: formData.get('countdownTitle') as string || undefined,
      countdownDescription: formData.get('countdownDescription') as string || undefined,
    };

    // Upload image if provided
    if (selectedFile) {
      const imageFormData = new FormData();
      imageFormData.append('festivalImage', selectedFile);
      
      const uploadResponse = await fetch('/api/upload-festival-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: imageFormData,
      });
      
      if (uploadResponse.ok) {
        const { imagePath } = await uploadResponse.json();
        sectionData.festivalImage = imagePath;
      } else {
        throw new Error('Failed to upload festival image');
      }
    }

    onCreate(sectionData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-light"
          data-testid="create-section-button"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Section
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Create Custom Home Section</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Design a custom section to showcase products in unique layouts. For the Royal Secondary Home Page, configure title, subtitle, and description to customize how sections appear.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Royal Page Customization Section */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-800 mb-3 flex items-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              👑 Royal Secondary Home Page Customization
            </h4>
            <p className="text-sm text-amber-700 mb-4">
              These fields control how your section appears on the elegant Royal Secondary Home Page. Customize the title, subtitle, and description to create a stunning presentation.
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-medium text-amber-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Section Title *
                  <span className="text-xs font-normal text-amber-600 ml-2">(Appears as main heading)</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Royal Diamond Collection, Bridal Treasures, Heritage Gems"
                  required
                  data-testid="input-section-title"
                  className="border-amber-300 focus:border-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle" className="font-medium text-amber-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Section Subtitle
                  <span className="text-xs font-normal text-amber-600 ml-2">(Appears below the main title)</span>
                </Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="e.g., Exquisite craftsmanship for royal occasions"
                  data-testid="input-section-subtitle"
                  className="border-amber-300 focus:border-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-medium text-amber-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Section Description
                  <span className="text-xs font-normal text-amber-600 ml-2">(Detailed description for the section)</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="e.g., Discover our handpicked collection of premium jewelry, each piece crafted with unparalleled attention to detail and designed to make every moment extraordinary"
                  data-testid="textarea-section-description"
                  rows={3}
                  className="border-amber-300 focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="layoutType" className="font-medium text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Layout Type *</Label>
            <Select
              value={formData.layoutType}
              onValueChange={(value: 'grid' | 'featured' | 'mixed' | 'split' | 'festival' | 'festival-specials' | 'carousel' | 'mosaic' | 'luxury' | 'magazine' | 'diamond' | 'floating' | 'radial' | 'artistic' | 'royal' | 'new-arrivals' | 'premium' | 'curved-grid' | 'tilted-grid') => 
                setFormData(prev => ({ ...prev, layoutType: value }))
              }
            >
              <SelectTrigger data-testid="select-layout-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid Layout</SelectItem>
                <SelectItem value="featured">Featured Layout</SelectItem>
                <SelectItem value="mixed">Mixed Layout</SelectItem>
                <SelectItem value="festival">Festival Banner (Image + Products)</SelectItem>
                <SelectItem value="festival-specials">🎊 Festival Specials - Countdown & Offers</SelectItem>
                <SelectItem value="carousel">🎠 Carousel - Elegant Sliding Showcase</SelectItem>
                <SelectItem value="mosaic">🎨 Mosaic - Pinterest Style Masonry</SelectItem>
                <SelectItem value="magazine">📖 Magazine - Editorial Layout</SelectItem>
                <SelectItem value="royal">👑 Royal - Majestic Palace Layout</SelectItem>
                <SelectItem value="new-arrivals">✨ New Arrivals - Auto-scrolling Showcase</SelectItem>
                <SelectItem value="premium">👑 Premium - Ultra-Luxury Elite Showcase</SelectItem>
                <SelectItem value="zen">🧘 Zen - Minimalist Floating Cards</SelectItem>
                <SelectItem value="curved-grid">🌊 3D Grid - Elegant 3D Product Showcase</SelectItem>
                <SelectItem value="tilted-grid">🎯 Tilted Grid - 1x5 Desktop Layout with 30° Tilted Sides</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Countdown Timer Toggle - Available for all layout types */}
          <div className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="showCountdown" className="font-medium text-blue-800">
                  ⏰ Enable Countdown Timer
                </Label>
                <p className="text-xs text-blue-600">
                  Add a countdown timer to create urgency and excitement for your section
                </p>
              </div>
              <Switch
                id="showCountdown"
                checked={formData.showCountdown}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showCountdown: checked }))}
                data-testid="switch-countdown"
              />
            </div>

            {formData.showCountdown && (
              <div className="space-y-4 pt-2 border-t border-blue-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="countdownStartDate">Countdown Start Date & Time</Label>
                    <Input
                      id="countdownStartDate"
                      type="datetime-local"
                      value={formData.countdownStartDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, countdownStartDate: e.target.value }))}
                      className="border-blue-300 focus:border-blue-500"
                      data-testid="input-countdown-start"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="countdownEndDate">Countdown End Date & Time</Label>
                    <Input
                      id="countdownEndDate"
                      type="datetime-local"
                      value={formData.countdownEndDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, countdownEndDate: e.target.value }))}
                      className="border-blue-300 focus:border-blue-500"
                      data-testid="input-countdown-end"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="countdownTitle">Countdown Title</Label>
                    <Input
                      id="countdownTitle"
                      value={formData.countdownTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, countdownTitle: e.target.value }))}
                      placeholder="e.g., Sale Ends In, Limited Time Offer"
                      className="border-blue-300 focus:border-blue-500"
                      data-testid="input-countdown-title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="countdownDescription">Countdown Description</Label>
                    <Input
                      id="countdownDescription"
                      value={formData.countdownDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, countdownDescription: e.target.value }))}
                      placeholder="e.g., Don't miss out on these amazing deals!"
                      className="border-blue-300 focus:border-blue-500"
                      data-testid="input-countdown-description"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {formData.layoutType === 'festival' ? (
            <>
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Festival Banner Configuration</h4>
                <div className="space-y-2">
                  <Label htmlFor="festivalImage">Festival Banner Image</Label>
                  <Input
                    id="festivalImage"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
                  />
                  {selectedFile && (
                    <p className="text-xs text-green-600">Selected: {selectedFile.name}</p>
                  )}
                  <p className="text-xs text-gray-500">Choose an image file for your festival banner. Supported formats: JPG, PNG, WebP</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <Input
                      id="backgroundColor"
                      type="color"
                      value={formData.backgroundColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="textColor">Text Color</Label>
                    <Input
                      id="textColor"
                      type="color"
                      value={formData.textColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, textColor: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : formData.layoutType === 'festival-specials' ? (
            <>
              <div className="space-y-4 bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-medium text-sm text-orange-800 flex items-center">
                  🎊 Festival Specials - Countdown Timer Configuration
                </h4>
                <p className="text-xs text-orange-600">
                  Configure the countdown timer for your festival specials section. Set custom start and end dates for your promotional countdown.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="countdownStartDate">Countdown Start Date & Time *</Label>
                    <Input
                      id="countdownStartDate"
                      type="datetime-local"
                      value={formData.countdownStartDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, countdownStartDate: e.target.value }))}
                      className="border-orange-300 focus:border-orange-500"
                      data-testid="input-countdown-start"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="countdownEndDate">Countdown End Date & Time *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="countdownEndDate"
                        type="datetime-local"
                        value={formData.countdownEndDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, countdownEndDate: e.target.value }))}
                        className="flex-1 border-orange-300 focus:border-orange-500"
                        data-testid="input-countdown-end"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (formData.countdownEndDate) {
                            alert(`✅ Countdown end date confirmed: ${new Date(formData.countdownEndDate).toLocaleString()}`);
                          } else {
                            alert('⚠️ Please select a date and time first');
                          }
                        }}
                        className="px-4 border-orange-300 text-orange-700 hover:bg-orange-50"
                        data-testid="button-confirm-countdown-end"
                      >
                        OK
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="countdownTitle">Countdown Title</Label>
                  <Input
                    id="countdownTitle"
                    value={formData.countdownTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, countdownTitle: e.target.value }))}
                    placeholder="e.g., Festival Sale Ends In"
                    className="border-orange-300 focus:border-orange-500"
                    data-testid="input-countdown-title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="countdownDescription">Countdown Description</Label>
                  <Input
                    id="countdownDescription"
                    value={formData.countdownDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, countdownDescription: e.target.value }))}
                    placeholder="e.g., Don't miss out on these limited-time offers!"
                    className="border-orange-300 focus:border-orange-500"
                    data-testid="input-countdown-description"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Background Color</Label>
                <Input
                  id="backgroundColor"
                  type="color"
                  value={formData.backgroundColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                  data-testid="input-background-color"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="textColor">Text Color</Label>
                <Input
                  id="textColor"
                  type="color"
                  value={formData.textColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, textColor: e.target.value }))}
                  data-testid="input-text-color"
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
              data-testid="switch-section-active"
            />
            <Label htmlFor="isActive">Make section active</Label>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} data-testid="button-create-section" className="w-full sm:w-auto">
              {isLoading ? "Creating..." : "Create Section"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SectionCard({ 
  section, 
  products, 
  onUpdate, 
  onDelete, 
  onAddItem, 
  onRemoveItem,
  isUpdating,
  isDeleting,
  isAddingItem
}: {
  section: HomeSectionWithItems;
  products: Product[];
  onUpdate: (data: Partial<CreateHomeSectionData>) => void;
  onDelete: () => void;
  onAddItem: (data: AddSectionItemData) => void;
  onRemoveItem: (itemId: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
  isAddingItem: boolean;
}) {
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <Card data-testid={`section-card-${section.id}`}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-base sm:text-lg">{section.title}</CardTitle>
              <Badge variant={section.isActive ? "default" : "secondary"} className="text-xs">
                {section.isActive ? "Active" : "Inactive"}
              </Badge>
              <Badge variant="outline" className="text-xs">{section.layoutType}</Badge>
            </div>
            {section.subtitle && <p className="text-sm text-muted-foreground">{section.subtitle}</p>}
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpdate({ isActive: !section.isActive })}
              disabled={isUpdating}
              data-testid={`button-toggle-${section.id}`}
            >
              {section.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddProduct(true)}
              disabled={isAddingItem}
              data-testid={`button-add-product-${section.id}`}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isDeleting}
                  data-testid={`button-delete-${section.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Section</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{section.title}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {section.items.length > 0 ? (
            <div className="grid gap-3">
              {section.items.map((item: HomeSectionItemWithProduct) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-muted overflow-hidden">
                      {item.product.images && item.product.images.length > 0 ? (
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement as HTMLElement;
                            parent.innerHTML = '<div class="h-full w-full flex items-center justify-center"><svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg></div>';
                          }}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {item.displayName || item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.displayPriceInr || item.displayPrice || `₹${item.product.priceInr}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {item.size}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                      data-testid={`button-remove-item-${item.id}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No products added yet</p>
            </div>
          )}
        </div>

        <AddProductDialog
          open={showAddProduct}
          onOpenChange={setShowAddProduct}
          products={products}
          onAdd={onAddItem}
          isLoading={isAddingItem}
          existingItems={section.items}
        />
      </CardContent>
    </Card>
  );
}

function AddProductDialog({
  open,
  onOpenChange,
  products,
  onAdd,
  isLoading,
  existingItems
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  onAdd: (data: AddSectionItemData) => void;
  isLoading: boolean;
  existingItems: HomeSectionItemWithProduct[];
}) {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [displayPriceInr, setDisplayPriceInr] = useState("");
  const [displayPriceBhd, setDisplayPriceBhd] = useState("");
  const [size, setSize] = useState<'small' | 'normal' | 'large'>('normal');
  const [addToDefaultLayout, setAddToDefaultLayout] = useState(false);
  const [customizeLayout, setCustomizeLayout] = useState(false);

  const existingProductIds = existingItems.map(item => item.productId);
  const availableProducts = products.filter(p => !existingProductIds.includes(p.id));

  const handleSubmit = () => {
    if (!selectedProductId) return;
    
    onAdd({
      productId: selectedProductId,
      displayName: displayName || undefined,
      displayPrice: displayPriceInr || undefined, // Keep for backward compatibility
      displayPriceInr: displayPriceInr || undefined,
      displayPriceBhd: displayPriceBhd || undefined,
      position: existingItems.length,
      size
    });

    // Reset form
    setSelectedProductId("");
    setDisplayName("");
    setDisplayPriceInr("");
    setDisplayPriceBhd("");
    setSize('normal');
    setAddToDefaultLayout(false);
    setCustomizeLayout(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product to Section</DialogTitle>
          <DialogDescription>
            Select a product to showcase in this section
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product">Product *</Label>
            <Select value={selectedProductId} onValueChange={setSelectedProductId}>
              <SelectTrigger data-testid="select-product">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {availableProducts.map(product => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} - ₹{product.priceInr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Custom Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Optional custom name"
                data-testid="input-display-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayPriceInr">Custom Display Price (INR)</Label>
              <Input
                id="displayPriceInr"
                value={displayPriceInr}
                onChange={(e) => setDisplayPriceInr(e.target.value)}
                placeholder="e.g., ₹ 1,23,456"
                data-testid="input-display-price-inr"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="displayPriceBhd">Custom Display Price (BHD)</Label>
            <Input
              id="displayPriceBhd"
              value={displayPriceBhd}
              onChange={(e) => setDisplayPriceBhd(e.target.value)}
              placeholder="e.g., BHD 500.750"
              data-testid="input-display-price-bhd"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Display Size</Label>
            <Select value={size} onValueChange={(value: 'small' | 'normal' | 'large') => setSize(value)}>
              <SelectTrigger data-testid="select-size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="large">Large (Featured)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Layout Options */}
          <div className="space-y-3 pt-4 border-t">
            <Label className="text-sm font-medium">Layout Options</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="addToDefaultLayout"
                  checked={addToDefaultLayout}
                  onCheckedChange={(checked) => setAddToDefaultLayout(checked === true)}
                  data-testid="checkbox-add-to-default"
                />
                <Label 
                  htmlFor="addToDefaultLayout"
                  className="text-sm font-normal cursor-pointer"
                >
                  Add to default layout
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="customizeLayout"
                  checked={customizeLayout}
                  onCheckedChange={(checked) => setCustomizeLayout(checked === true)}
                  data-testid="checkbox-customize-layout"
                />
                <Label 
                  htmlFor="customizeLayout"
                  className="text-sm font-normal cursor-pointer"
                >
                  Customize layout
                </Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedProductId || isLoading}
            data-testid="button-add-product"
          >
            {isLoading ? "Adding..." : "Add Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function getLayoutClasses(layoutType: string, itemCount: number): string {
  switch (layoutType) {
    case 'grid':
      return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    case 'featured':
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    case 'mixed':
      return 'grid-cols-2 md:grid-cols-4';
    default:
      return 'grid-cols-2 md:grid-cols-3';
  }
}

function getSizeClasses(size: string): string {
  switch (size) {
    case 'small':
      return 'col-span-1';
    case 'large':
      return 'col-span-2 row-span-2';
    default:
      return 'col-span-1';
  }
}