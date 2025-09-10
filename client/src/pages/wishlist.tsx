import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { formatPrice } from "@/lib/currency";
import { toast } from "@/hooks/use-toast";

interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product?: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    category: string;
    subCategory?: string;
  };
}

export default function WishlistPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ["/api/wishlist"],
    enabled: !!user,
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: (productId: string) => apiRequest(`/api/wishlist/${productId}`, {
      method: "DELETE",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      toast({
        title: "Removed from Wishlist",
        description: "Item has been removed from your wishlist.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist.",
        variant: "destructive",
      });
    },
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <Heart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Please Login</h2>
            <p className="text-gray-600 mb-4">You need to login to view your wishlist.</p>
            <Link href="/login">
              <Button data-testid="button-login">Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900" data-testid="title-wishlist">My Wishlist</h1>
          <p className="text-gray-600" data-testid="text-wishlist-count">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <Card className="p-12 text-center">
            <CardContent>
              <Heart className="h-24 w-24 mx-auto mb-6 text-gray-400" />
              <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
              <p className="text-gray-600 mb-6">Save items you love for later by clicking the heart icon.</p>
              <Link href="/">
                <Button data-testid="button-continue-shopping">Continue Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item: WishlistItem) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={item.product?.imageUrl || '/api/placeholder/300/300'}
                    alt={item.product?.name || 'Product'}
                    className="w-full h-64 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm text-red-500"
                    onClick={() => removeFromWishlistMutation.mutate(item.productId)}
                    disabled={removeFromWishlistMutation.isPending}
                    data-testid={`button-remove-wishlist-${item.productId}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2" data-testid={`text-product-name-${item.productId}`}>
                    {item.product?.name || 'Unknown Product'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{item.product?.category}</p>
                  <p className="text-lg font-bold text-amber-600 mb-4" data-testid={`text-product-price-${item.productId}`}>
                    {formatPrice(item.product?.price || 0)}
                  </p>
                  <div className="flex gap-2">
                    <Link href={`/product/${item.productId}`} className="flex-1">
                      <Button variant="outline" className="w-full" data-testid={`button-view-product-${item.productId}`}>
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      className="px-3"
                      data-testid={`button-add-to-cart-${item.productId}`}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}