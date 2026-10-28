import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, X, RotateCcw, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ProductImage } from '../../components/ui/ProductImage';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { formatCurrency } from '../../utils/formatters';

export function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    amountToFreeShipping,
    freeShippingThreshold
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(couponCode)) {
      setCouponCode('');
    }
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round(((freeShippingThreshold - amountToFreeShipping) / freeShippingThreshold) * 100)
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 w-full flex-1 flex flex-col justify-center">
        <EmptyState
          icon={ShoppingBag}
          title="Your Shopping Bag is Empty"
          description="Explore our monochrome collections to curate your wardrobe, studio, or living space."
          actionLabel="Explore Products"
          onAction={() => navigate('/products')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1 text-[#000000] dark:text-[#FFFFFF]">
      <div className="flex items-center justify-between pb-6 border-b border-[#DDDDDD] dark:border-[#333333] mb-8">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#444444] dark:text-[#CCCCCC] block mb-1">
            Order Review
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF]">
            Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
          </h1>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-mono text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] underline underline-offset-4"
        >
          Clear Entire Bag
        </button>
      </div>

      {/* Free Shipping Meter */}
      <div className="mb-8 p-4 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card">
        <div className="flex items-center justify-between text-xs mb-2 font-mono">
          <span className="text-[#000000] dark:text-[#FFFFFF] font-semibold">
            {amountToFreeShipping === 0
              ? 'QUALIFIED FOR COMPLIMENTARY EXPEDITED SHIPPING'
              : `ADD ${formatCurrency(amountToFreeShipping)} MORE FOR FREE SHIPPING`}
          </span>
          <span className="font-bold text-[#000000] dark:text-[#FFFFFF]">{freeShippingProgress}%</span>
        </div>
        <div className="w-full h-2 bg-[#DDDDDD] dark:bg-[#222222] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#000000] dark:bg-[#FFFFFF] transition-all duration-300"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Two columns on desktop / tablet, single on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Cart Items (8 cols) */}
        <div className="lg:col-span-8 divide-y divide-[#DDDDDD] dark:divide-[#333333] border-y border-[#DDDDDD] dark:border-[#333333]">
          {cart.map((item) => (
            <div key={item.productId} className="py-6 flex flex-col sm:flex-row gap-4 items-start">
              {/* Product Image */}
              <div className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 border border-[#DDDDDD] dark:border-[#333333] rounded-btn overflow-hidden">
                <ProductImage src={item.image} alt={item.name} aspectRatio="aspect-[4/5]" />
              </div>

              {/* Item Info */}
              <div className="flex-1 w-full flex flex-col justify-between self-stretch">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <Link
                      to={`/product/${item.productId}`}
                      className="text-sm sm:text-base font-bold text-[#000000] dark:text-[#FFFFFF] hover:underline"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId)}
                      aria-label={`Remove ${item.name}`}
                      className="text-[#666666] dark:text-[#888888] hover:text-[#000000] dark:hover:text-[#FFFFFF] p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-[#444444] dark:text-[#CCCCCC] font-mono mt-0.5 block">
                    SKU: {item.sku} · Unit Price: {formatCurrency(item.price)}
                  </span>
                </div>

                {/* Bottom Row: Qty Controls and Line Total */}
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#DDDDDD] dark:border-[#333333]">
                  <div className="flex items-center border border-[#DDDDDD] dark:border-[#333333] rounded-btn bg-white dark:bg-[#0A0A0A]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] text-[#000000] dark:text-[#FFFFFF] transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-mono text-xs font-bold text-[#000000] dark:text-[#FFFFFF]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] text-[#000000] dark:text-[#FFFFFF] transition-colors disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-base font-bold text-[#000000] dark:text-[#FFFFFF]">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary (4 cols) */}
        <div className="lg:col-span-4 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-6 lg:sticky lg:top-28 shadow-subtle">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] mb-4">
            Order Summary
          </h2>

          {/* Coupon Entry */}
          <div className="mb-6">
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] rounded-btn">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#000000] dark:text-[#FFFFFF]" />
                  <div>
                    <span className="text-xs font-mono font-bold uppercase block text-[#000000] dark:text-[#FFFFFF]">{appliedCoupon.code}</span>
                    <span className="text-[10px] text-[#444444] dark:text-[#CCCCCC]">{appliedCoupon.description}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="p-1 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Coupon code (e.g. MONO10)"
                  className="flex-1 min-h-[44px] px-3.5 py-2 text-xs font-mono border border-[#DDDDDD] dark:border-[#333333] rounded-btn bg-white dark:bg-[#0A0A0A] text-[#000000] dark:text-[#FFFFFF] focus:border-black dark:focus:border-white uppercase"
                />
                <Button type="submit" variant="secondary" size="md">
                  Apply
                </Button>
              </form>
            )}
          </div>

          {/* Summary Breakdown */}
          <div className="space-y-3 text-xs font-mono border-t border-[#DDDDDD] dark:border-[#333333] pt-4">
            <div className="flex justify-between text-[#444444] dark:text-[#CCCCCC]">
              <span>Subtotal</span>
              <span className="text-[#000000] dark:text-[#FFFFFF] font-semibold">{formatCurrency(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-[#000000] dark:text-[#FFFFFF] font-bold">
                <span>Coupon Reduction</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#444444] dark:text-[#CCCCCC]">
              <span>Expedited Shipping</span>
              <span className="text-[#000000] dark:text-[#FFFFFF] font-semibold">
                {shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}
              </span>
            </div>

            <div className="flex justify-between text-[#444444] dark:text-[#CCCCCC]">
              <span>Estimated Sales Tax (9%)</span>
              <span className="text-[#000000] dark:text-[#FFFFFF] font-semibold">{formatCurrency(taxAmount)}</span>
            </div>

            <div className="flex justify-between text-base font-black text-[#000000] dark:text-[#FFFFFF] border-t border-[#DDDDDD] dark:border-[#333333] pt-4 font-mono">
              <span>Total Amount</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate('/checkout')}
            icon={ArrowRight}
            className="mt-6"
          >
            Proceed to Checkout
          </Button>

          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#444444] dark:text-[#CCCCCC] font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Simulated checkout session · No charge</span>
          </div>
        </div>
      </div>
    </div>
  );
}
