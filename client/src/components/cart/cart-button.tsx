import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import CartDrawer from "./cart-drawer";

export default function CartButton() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(true)}
        className="relative p-1 md:p-2 text-amber-800 hover:bg-amber-50 rounded-lg transition-all duration-200"
        data-testid="button-cart"
      >
        <ShoppingCart className="h-3 w-3 md:h-6 md:w-6" />
        {totalItems > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center text-[10px] md:text-xs bg-amber-700 text-white"
            data-testid="badge-cart-count"
          >
            {totalItems}
          </Badge>
        )}
      </Button>
      
      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}