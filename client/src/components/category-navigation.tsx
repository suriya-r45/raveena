import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronRight, 
  Heart, 
  Crown, 
  Gem, 
  Watch,
  Users,
  Baby,
  Sparkles,
  Star,
  Palette,
  Wrench,
  Package
} from 'lucide-react';

const categoryIcons = {
  accessories: Package,
  occasion: Palette,
  'men-collection': Users,
  kids: Baby,
  // Keep legacy mappings for other categories
  rings: Crown,
  necklaces: Sparkles,
  pendants: Star,
  earrings: Gem,
  bracelets: Heart,
  bangles: Heart,
  watches: Watch,
  mens: Users,
  children: Baby,
  materials: Gem,
  collections: Palette,
  custom: Wrench
};

// Fetch categories from API
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  children?: Category[];
}

export default function CategoryNavigation() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Fetch categories from API
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      return response.json();
    },
  });

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleCategoryClick = (categoryName: string) => {
    // Scroll to products section and filter by category
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
    console.log('Navigate to category:', categoryName);
  };

  const handleSubcategoryClick = (subcategoryName: string) => {
    // Scroll to products section and filter by subcategory
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
    console.log('Navigate to subcategory:', subcategoryName);
  };

  if (isLoading) {
    return (
      <section className="py-8 md:py-12 bg-white relative" data-testid="section-category-navigation" style={{ backgroundColor: '#ffffff' }}>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 bg-white relative" data-testid="section-category-navigation" style={{ backgroundColor: '#ffffff' }}>
      <div className="container mx-auto px-4 relative">


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
          {categories.map((category, index) => {
            const IconComponent = categoryIcons[category.slug as keyof typeof categoryIcons] || Crown;
            const isExpanded = expandedCategory === category.id;
            const subcategories = category.children || [];
            
            return (
              <Card 
                key={category.id} 
                className="card-hover glass-effect border-0"
                data-testid={`category-card-${category.id}`}
              >
                <CardContent className="p-2 md:p-4">
                  <Button
                    variant="ghost"
                    className="w-full p-0 h-auto justify-start hover:bg-transparent"
                    onClick={() => toggleCategory(category.id)}
                    data-testid={`button-toggle-${category.id}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <IconComponent className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 text-gray-600" />
                        <div className="text-left">
                          <h3 className="font-semibold text-black text-xs md:text-sm">{category.name}</h3>
                          <p className="text-xs text-gray-500">{subcategories.length} types</p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                      )}
                    </div>
                  </Button>

                  {isExpanded && (
                    <div className="mt-2 md:mt-4 pl-4 md:pl-8 space-y-1 md:space-y-2 animate-in slide-in-from-top-2 duration-200">
                      {subcategories.map((subcategory, subIndex) => (
                        <Button
                          key={subcategory.id}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start p-1 h-auto text-xs text-gray-600 hover:text-black hover:bg-gray-50"
                          onClick={() => handleSubcategoryClick(subcategory.name)}
                          data-testid={`button-subcategory-${category.id}-${subIndex}`}
                        >
                          • {subcategory.name}
                        </Button>
                      ))}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full mt-2 md:mt-3 text-xs border-gray-200 text-gray-700 hover:bg-gray-50"
                        onClick={() => handleCategoryClick(category.name)}
                        data-testid={`button-view-all-${category.id}`}
                      >
                        View All {category.name}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>


      </div>
    </section>
  );
}