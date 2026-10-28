import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { ProductImage } from '../ui/ProductImage';
import { Badge } from '../ui/Badge';
import { ProductRating } from './ProductRating';
import { QuickViewModal } from './QuickViewModal';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';

export function ProductCard({ product, className = '' }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isBestSeller = product.reviewsCount > 80 || product.isFeatured;
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const primaryImage = product.images?.[0];
  const secondaryImage = product.images?.[1];

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex flex-col bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-black dark:hover:border-white ${className}`}
      >
        {/* Media Container (Fixed 4/5 Aspect Ratio) */}
        <Link
          to={`/product/${product.id}`}
          className="relative block w-full aspect-[4/5] overflow-hidden bg-[#EEEEEE] dark:bg-[#000000]"
          aria-label={`View details for ${product.name}`}
        >
          {/* Primary Product Image with 1.05 scale on hover */}
          <div className="w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-105">
            <ProductImage
              src={primaryImage}
              alt={product.name}
              aspectRatio="aspect-[4/5]"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Secondary Image crossfade on hover if available */}
          {secondaryImage && (
            <div
              className={`absolute inset-0 transition-opacity duration-500 ease-out pointer-events-none ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{ transitionProperty: 'opacity, transform' }}
            >
              <img
                src={secondaryImage}
                alt={`${product.name} alternate view`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start z-10 pointer-events-none">
            {isOutOfStock ? (
              <Badge status="out_of_stock" size="sm" />
            ) : isLowStock ? (
              <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white rounded-full shadow-sm">
                Only {product.stock} left
              </span>
            ) : discountPercent > 0 ? (
              <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-black text-white dark:bg-white dark:text-black rounded-full shadow-sm">
                Save {discountPercent}%
              </span>
            ) : product.isNew ? (
              <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-white text-black dark:bg-[#111111] dark:text-white border border-[#DDDDDD] dark:border-[#333333] rounded-full shadow-sm">
                New
              </span>
            ) : isBestSeller ? (
              <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-black text-white dark:bg-white dark:text-black rounded-full shadow-sm">
                Bestseller
              </span>
            ) : null}
          </div>

          {/* Wishlist Button with Pop Animation */}
          <motion.button
            type="button"
            onClick={handleFavorite}
            whileTap={{ scale: 0.85 }}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute top-2.5 right-2.5 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 dark:bg-[#111111]/95 backdrop-blur-sm border border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF] flex items-center justify-center hover:bg-white dark:hover:bg-[#1A1A1A] transition-all shadow-subtle active:scale-90"
          >
            <motion.div
              animate={{ scale: isFavorited ? [1, 1.25, 1] : 1 }}
              transition={{ duration: 0.25 }}
            >
              <Heart
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                  isFavorited ? 'fill-current text-[#000000] dark:text-[#FFFFFF]' : 'text-[#444444] dark:text-[#CCCCCC]'
                }`}
              />
            </motion.div>
          </motion.button>

          {/* Desktop Hover Action Bar: Slides up from bottom */}
          <div className="hidden sm:flex absolute inset-x-2.5 bottom-2.5 z-10 gap-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 ease-out">
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isOutOfStock}
              className="flex-1 py-2 px-3 bg-black text-white hover:bg-[#333333] dark:bg-white dark:text-black dark:hover:bg-[#E5E5E5] text-xs font-semibold rounded-lg active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : isOutOfStock ? (
                'Sold Out'
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleQuickView}
              aria-label={`Quick view ${product.name}`}
              className="p-2 bg-white dark:bg-[#111111] text-[#000000] dark:text-[#FFFFFF] border border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white rounded-lg shadow-md hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A] transition-colors"
              title="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </Link>

        {/* Info Container */}
        <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2 bg-[#F5F5F5] dark:bg-[#111111]">
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-xs text-[#444444] dark:text-[#CCCCCC] capitalize font-medium truncate">
                {product.category}
              </span>
              <span className="text-[11px] text-[#444444] dark:text-[#CCCCCC] opacity-80 shrink-0">
                {product.subcategory || ''}
              </span>
            </div>

            <Link
              to={`/product/${product.id}`}
              className="text-sm sm:text-base font-semibold text-[#000000] dark:text-[#FFFFFF] hover:underline line-clamp-1 block transition-colors"
              title={product.name}
            >
              {product.name}
            </Link>
          </div>

          {/* Rating with review count */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <ProductRating
              rating={product.rating}
              count={product.reviewsCount}
              showCount={true}
              size="sm"
            />
          </div>

          {/* Pricing in INR with Strikethrough & Discount % */}
          <div className="pt-2 flex items-baseline justify-between border-t border-[#DDDDDD] dark:border-[#333333]">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-[#000000] dark:text-[#FFFFFF]">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[#666666] dark:text-[#888888] line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            {discountPercent > 0 && (
              <span className="text-[11px] font-semibold text-black dark:text-white bg-white dark:bg-black px-2 py-0.5 rounded-full border border-[#DDDDDD] dark:border-[#333333]">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Touch / Mobile Permanent Action Bar */}
          <div className="sm:hidden grid grid-cols-5 gap-1.5 pt-2 border-t border-[#DDDDDD] dark:border-[#333333]">
            <motion.button
              type="button"
              onClick={handleQuickAdd}
              disabled={isOutOfStock}
              whileTap={{ scale: 0.97 }}
              className="col-span-4 py-2 px-2 bg-black text-white hover:bg-[#333333] dark:bg-white dark:text-black dark:hover:bg-[#E5E5E5] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 active:bg-black disabled:opacity-50"
            >
              {isAdding ? (
                <>
                  <Check className="w-3 h-3" /> Added
                </>
              ) : isOutOfStock ? (
                'Sold Out'
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              onClick={handleQuickView}
              whileTap={{ scale: 0.97 }}
              aria-label="Quick preview"
              className="col-span-1 p-2 bg-white dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-lg flex items-center justify-center text-[#000000] dark:text-[#FFFFFF] active:bg-[#F5F5F5] dark:active:bg-[#1A1A1A]"
            >
              <Eye className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Accessible Quick View Modal (only mounted when active) */}
      {isQuickViewOpen && (
        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
}
