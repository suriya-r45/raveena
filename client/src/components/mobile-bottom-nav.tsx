import React, { useState } from 'react';
import { Grid3X3, ArrowUpDown, Filter, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

interface MobileBottomNavProps {
  onCategorySelect?: (category: string) => void;
  onSortChange?: (sort: string) => void;
  onFilterChange?: (filters: any) => void;
  activeFilters?: number;
  sortBy?: string;
  currentMainCategory?: string;
}

export default function MobileBottomNav({
  onCategorySelect,
  onSortChange,
  onFilterChange,
  activeFilters = 0,
  sortBy = 'featured',
  currentMainCategory
}: MobileBottomNavProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' }
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 lg:hidden">
        <div className="flex justify-around items-center">
          {/* Categories */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <Grid3X3 className="h-5 w-5" />
                <span className="text-xs">Categories</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>Categories</SheetTitle>
              </SheetHeader>
              <div className="p-4">
                <p className="text-gray-500">Categories will be loaded from API soon...</p>
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort */}
          <Sheet open={sortOpen} onOpenChange={setSortOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <ArrowUpDown className="h-5 w-5" />
                <span className="text-xs">Sort</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-fit">
              <SheetHeader className="pb-4">
                <SheetTitle>Sort by</SheetTitle>
              </SheetHeader>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={sortBy === option.value ? "default" : "ghost"}
                    size="lg"
                    className="w-full justify-start"
                    onClick={() => {
                      onSortChange?.(option.value);
                      setSortOpen(false);
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Filter */}
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 relative">
                <Filter className="h-5 w-5" />
                <span className="text-xs">Filter</span>
                {activeFilters > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs rounded-full">
                    {activeFilters}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-fit">
              <SheetHeader className="pb-4">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="space-y-4">
                <p className="text-gray-500">Filter options will be available soon...</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Spacer for fixed bottom nav */}
      <div className="h-20 lg:hidden" />
    </>
  );
}