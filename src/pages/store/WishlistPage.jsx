import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { ProductCard } from '../../components/store/ProductCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';

export function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddAllToCart = () => {
    wishlist.forEach((p) => {
      if (p.stock > 0) {
        addToCart(p, 1);
      }
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 w-full flex-1 flex flex-col justify-center">
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Save timeless pieces for later evaluation. Tap the heart symbol on any product card to bookmark."
          actionLabel="Browse Curations"
          onAction={() => navigate('/products')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E5E5] mb-8">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] block mb-1">
            Personal Registry
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0A0A0A]">
            Saved Items ({wishlist.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={clearWishlist}>
            Clear Registry
          </Button>
          <Button variant="primary" size="sm" onClick={handleAddAllToCart} icon={ShoppingBag}>
            Move Available to Bag
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {wishlist.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
