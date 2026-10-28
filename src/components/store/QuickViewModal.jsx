import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, Star, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Badge } from '../ui/Badge';
import { ProductImage } from '../ui/ProductImage';

export function QuickViewModal({ product, isOpen, onClose }) {
  const modalRef = useRef(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
    setIsAdded(false);
  }, [product]);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow || '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const images = product.images?.length ? product.images : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'];

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0A0A0A]/70 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF] rounded-card shadow-modal max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 p-2 bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#DDDDDD] dark:border-[#333333] rounded-full text-[#000000] dark:text-[#FFFFFF] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left: Gallery */}
          <div className="p-4 sm:p-6 bg-white dark:bg-[#0A0A0A] border-b md:border-b-0 md:border-r border-[#DDDDDD] dark:border-[#333333] flex flex-col gap-3">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded bg-white dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333]">
              <ProductImage
                src={images[selectedImageIndex] || images[0]}
                alt={product.name}
                aspectRatio="aspect-[4/5]"
                className="w-full h-full object-cover"
              />
              {discountPercent > 0 && (
                <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black rounded-full shadow-sm">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-14 rounded border overflow-hidden shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-black ring-1 ring-black dark:border-white dark:ring-white'
                        : 'border-[#DDDDDD] dark:border-[#333333] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Spec & Action */}
          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs text-[#444444] dark:text-[#CCCCCC] font-medium capitalize block mb-1">
                  {product.category} · {product.sku}
                </span>
                <h3 id="quick-view-title" className="text-xl sm:text-2xl font-bold tracking-tight text-[#000000] dark:text-[#FFFFFF]">
                  {product.name}
                </h3>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center text-[#000000] dark:text-[#FFFFFF]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating || 5)
                          ? 'fill-black text-black dark:fill-white dark:text-white'
                          : 'text-[#DDDDDD] dark:text-[#333333]'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-[#000000] dark:text-[#FFFFFF]">{product.rating || 5.0}</span>
                <span className="text-[#444444] dark:text-[#CCCCCC]">({product.reviewsCount || 42} customer reviews)</span>
              </div>

              {/* Price in INR */}
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-bold text-[#000000] dark:text-[#FFFFFF]">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-[#737373] dark:text-[#888888] line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              <p className="text-sm text-[#444444] dark:text-[#CCCCCC] leading-relaxed line-clamp-3">
                {product.description}
              </p>

              {/* Highlights and materials */}
              {product.features?.length > 0 && (
                <div className="pt-3 border-t border-[#DDDDDD] dark:border-[#333333]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#444444] dark:text-[#CCCCCC] block mb-2">
                    Highlights & Details
                  </span>
                  <ul className="grid grid-cols-2 gap-1.5 text-xs text-[#444444] dark:text-[#CCCCCC]">
                    {product.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 truncate">
                        <Check className="w-3.5 h-3.5 text-[#000000] dark:text-[#FFFFFF] shrink-0" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Trust assurances */}
              <div className="pt-3 border-t border-[#DDDDDD] dark:border-[#333333] flex flex-wrap items-center gap-4 text-xs text-[#444444] dark:text-[#CCCCCC]">
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#000000] dark:text-[#FFFFFF]" /> Free shipping over ₹10,000
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#000000] dark:text-[#FFFFFF]" /> 30-day returns
                </span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-4 border-t border-[#DDDDDD] dark:border-[#333333]">
              <div className="flex items-center gap-3">
                {/* Quantity adjuster */}
                <div className="inline-flex items-center border border-[#DDDDDD] dark:border-[#333333] rounded-lg text-sm bg-white dark:bg-[#0A0A0A]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="px-3 py-2 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] rounded-l-lg transition-colors disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 font-semibold text-[#000000] dark:text-[#FFFFFF] min-w-[28px] text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                    disabled={quantity >= (product.stock || 10) || isOutOfStock}
                    className="px-3 py-2 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] rounded-r-lg transition-colors disabled:opacity-40"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to cart */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 py-2.5 px-4 bg-black text-white hover:bg-[#333333] dark:bg-white dark:text-black dark:hover:bg-[#E5E5E5] text-sm font-semibold rounded-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-[#DDDDDD] dark:disabled:bg-[#222222] disabled:text-[#888888] dark:disabled:text-[#666666]"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart
                    </>
                  ) : isOutOfStock ? (
                    'Sold Out'
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart · {formatCurrency(product.price * quantity)}
                    </>
                  )}
                </button>

                {/* Wishlist toggle */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isFavorited
                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                      : 'border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF] hover:border-[#000000] dark:hover:border-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A]'
                  }`}
                  aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Link to detail page */}
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="w-full text-center text-xs font-medium text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] hover:underline flex items-center justify-center gap-1.5 pt-1 transition-colors"
              >
                <span>View Full Product Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
