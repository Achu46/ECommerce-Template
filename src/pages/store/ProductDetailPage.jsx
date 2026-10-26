import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Truck,
  RotateCcw,
  Shield,
  ArrowLeft,
  Share2,
  ChevronRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { ProductImage } from '../../components/ui/ProductImage';
import { ProductRating } from '../../components/store/ProductRating';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProductCard } from '../../components/store/ProductCard';
import { formatCurrency } from '../../utils/formatters';

export function ProductDetailPage() {
  const { id } = useParams();
  const { products } = useData();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const toast = useToast();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'shipping' | 'returns'

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold uppercase mb-2">Item Not Found</h2>
        <p className="text-sm text-[#525252] mb-6">The requested product could not be found in our database.</p>
        <Link to="/products">
          <Button variant="primary">Return to Collection</Button>
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const images = product.images && product.images.length > 0 ? product.images : [''];

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success('Link Copied', 'Product link copied to clipboard.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 w-full">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs font-mono text-[#737373] mb-6 sm:mb-8">
        <Link to="/" className="hover:text-[#0A0A0A] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/products" className="hover:text-[#0A0A0A] transition-colors">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          to={`/products?category=${encodeURIComponent(product.category)}`}
          className="hover:text-[#0A0A0A] transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#0A0A0A] font-semibold truncate max-w-[150px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Product Layout: Two columns on tablet/desktop, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pb-16">

        {/* Left Column: Gallery (6 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Hero Main Image View */}
          <div className="w-full aspect-[4/5] bg-[#F5F5F5] border border-[#E5E5E5] rounded-card overflow-hidden relative">
            <ProductImage
              src={images[selectedImageIndex] || images[0]}
              alt={`${product.name} preview`}
              aspectRatio="aspect-[4/5]"
              className="w-full h-full object-cover"
            />
            {/* Quick badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {isOutOfStock ? (
                <Badge status="out_of_stock" />
              ) : isLowStock ? (
                <Badge status="low_stock">Only {product.stock} units left</Badge>
              ) : product.isNew ? (
                <Badge variant="solid">NEW ARCHIVE</Badge>
              ) : null}
            </div>
          </div>

          {/* Thumbnails row (desktop & mobile swipe) */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-24 shrink-0 rounded-btn border overflow-hidden transition-all ${selectedImageIndex === idx
                      ? 'border-2 border-[#0A0A0A] ring-1 ring-[#0A0A0A]'
                      : 'border-[#E5E5E5] opacity-60 hover:opacity-100'
                    }`}
                >
                  <ProductImage src={img} alt={`Thumbnail ${idx + 1}`} aspectRatio="aspect-[4/5]" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Controls (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <div className="border-b border-[#E5E5E5] pb-6">
            <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs text-[#737373]">
              <span>SKU: {product.sku}</span>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1 hover:text-[#0A0A0A] transition-colors"
                title="Share product link"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0A0A0A] leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating and Stock */}
            <div className="flex items-center gap-4 mb-4">
              <ProductRating rating={product.rating} count={product.reviewsCount} />
              <span className="text-[#E5E5E5]">|</span>
              {isOutOfStock ? (
                <Badge status="out_of_stock" size="sm" />
              ) : isLowStock ? (
                <Badge status="low_stock" size="sm">
                  Low Stock
                </Badge>
              ) : (
                <Badge status="in_stock" size="sm" />
              )}
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 font-mono">
              <span className="text-3xl font-black text-[#0A0A0A]">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-[#A3A3A3] line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="py-6 border-b border-[#E5E5E5]">
            <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
              {product.description}
            </p>

            {/* Features Bullet Points */}
            {product.features && product.features.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#F5F5F5]">
                <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-[#0A0A0A] mb-2">
                  Engineering Specifications
                </h4>
                <ul className="space-y-1.5 text-xs text-[#525252] font-mono">
                  {product.features.map((feat, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#0A0A0A] rounded-full shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Desktop Purchasing Block */}
          <div className="py-6 space-y-4">
            <div className="flex items-center gap-4">
              {/* Quantity Picker */}
              <div className="flex items-center border border-[#0A0A0A] rounded-btn">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1 || isOutOfStock}
                  className="w-11 h-11 flex items-center justify-center hover:bg-[#F5F5F5] transition-colors disabled:opacity-40"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-mono font-bold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  aria-label="Increase quantity"
                  disabled={quantity >= product.stock || isOutOfStock}
                  className="w-11 h-11 flex items-center justify-center hover:bg-[#F5F5F5] transition-colors disabled:opacity-40"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                icon={ShoppingBag}
                className="flex-1"
              >
                {isOutOfStock ? 'Sold Out' : `Add to Bag • ${formatCurrency(product.price * quantity)}`}
              </Button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                className="w-12 h-12 min-w-[48px] rounded-btn border border-[#E5E5E5] flex items-center justify-center hover:border-[#0A0A0A] hover:bg-[#F5F5F5] transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${isFavorited ? 'fill-[#0A0A0A] text-[#0A0A0A]' : 'text-[#0A0A0A]'
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Tabs: Specifications, Shipping, Solitude Guarantee */}
          <div className="border-t border-[#E5E5E5] pt-4">
            <div className="flex border-b border-[#E5E5E5] text-xs font-mono uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`py-2 px-3 border-b-2 font-bold transition-colors ${activeTab === 'specs'
                    ? 'border-[#0A0A0A] text-[#0A0A0A]'
                    : 'border-transparent text-[#737373] hover:text-[#0A0A0A]'
                  }`}
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('shipping')}
                className={`py-2 px-3 border-b-2 font-bold transition-colors ${activeTab === 'shipping'
                    ? 'border-[#0A0A0A] text-[#0A0A0A]'
                    : 'border-transparent text-[#737373] hover:text-[#0A0A0A]'
                  }`}
              >
                Shipping & Delivery
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('returns')}
                className={`py-2 px-3 border-b-2 font-bold transition-colors ${activeTab === 'returns'
                    ? 'border-[#0A0A0A] text-[#0A0A0A]'
                    : 'border-transparent text-[#737373] hover:text-[#0A0A0A]'
                  }`}
              >
                Returns & Trial
              </button>
            </div>

            <div className="py-4 text-xs text-[#525252] leading-relaxed">
              {activeTab === 'specs' && (
                <div className="space-y-2">
                  <p>All items undergo strict structural quality verification prior to dispatch.</p>
                  <p>Category: <strong className="text-[#0A0A0A]">{product.category}</strong> {product.subcategory && `(${product.subcategory})`}</p>
                  <p>Stock Status: <strong className="text-[#0A0A0A]">{product.stock} units</strong> warehouse ready.</p>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#0A0A0A] font-semibold">
                    <Truck className="w-4 h-4" /> Global Carbon-Neutral Delivery
                  </div>
                  <p>Complimentary shipping applied automatically for orders exceeding $150. Domestic transit takes 2-4 business days.</p>
                </div>
              )}
              {activeTab === 'returns' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#0A0A0A] font-semibold">
                    <RotateCcw className="w-4 h-4" /> 30-Day Solitude Guarantee
                  </div>
                  <p>If the material or silhouette does not satisfy your functional requirements, return in original box within 30 days for a full refund.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Add-to-Cart Bar (<640px) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E5E5E5] p-3 flex items-center gap-3 z-30 shadow-drawer">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#737373] font-mono">TOTAL</span>
          <span className="font-mono text-sm font-bold text-[#0A0A0A]">
            {formatCurrency(product.price * quantity)}
          </span>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          icon={ShoppingBag}
          className="flex-1"
        >
          {isOutOfStock ? 'Sold Out' : 'Add to Bag'}
        </Button>
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label="Wishlist"
          className="p-2.5 border border-[#E5E5E5] rounded-btn text-[#0A0A0A]"
        >
          <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#0A0A0A]' : ''}`} />
        </button>
      </div>

      {/* Related Curations */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold tracking-tight text-[#0A0A0A]">
              You May Also Like
            </h3>
            <Link
              to={`/products?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-mono uppercase font-bold hover:underline"
            >
              More in {product.category} →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
