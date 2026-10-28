import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Check, X } from 'lucide-react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { ProductImage } from '../ui/ProductImage';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    amountToFreeShipping,
    freeShippingThreshold
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

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

  return (
    <Drawer
      isOpen={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      title={`Your Bag (${cart.reduce((s, i) => s + i.quantity, 0)})`}
      position="right"
      maxWidth="max-w-md"
      footer={
        cart.length > 0 && (
          <div className="flex flex-col gap-3">
            {/* Coupon Code Input */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-btn text-[#000000] dark:text-[#FFFFFF]">
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-[#000000] dark:text-[#FFFFFF]" />
                  <span className="text-xs font-mono font-bold uppercase">{appliedCoupon.code}</span>
                  <span className="text-[11px] text-[#444444] dark:text-[#CCCCCC]">(-{formatCurrency(discountAmount)})</span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  aria-label="Remove coupon"
                  className="p-1 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Promo code (e.g. MONO10)"
                  className="flex-1 min-h-[40px] px-3 py-1.5 text-xs font-mono border border-[#DDDDDD] dark:border-[#333333] rounded-btn bg-white dark:bg-[#0A0A0A] text-[#000000] dark:text-[#FFFFFF] uppercase placeholder:normal-case placeholder:font-sans focus:border-[#000000] dark:focus:border-[#FFFFFF]"
                />
                <Button type="submit" variant="secondary" size="sm">
                  Apply
                </Button>
              </form>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 pt-2 text-xs border-t border-[#DDDDDD] dark:border-[#333333]">
              <div className="flex justify-between text-[#444444] dark:text-[#CCCCCC]">
                <span>Subtotal</span>
                <span className="font-mono text-[#000000] dark:text-[#FFFFFF]">{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#000000] dark:text-[#FFFFFF] font-medium">
                  <span>Discount</span>
                  <span className="font-mono">-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#444444] dark:text-[#CCCCCC]">
                <span>Estimated Shipping</span>
                <span className="font-mono text-[#000000] dark:text-[#FFFFFF]">
                  {shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#000000] dark:text-[#FFFFFF] pt-2 border-t border-[#DDDDDD] dark:border-[#333333]">
                <span>Total</span>
                <span className="font-mono">{formatCurrency(total)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleCheckout}
              icon={ArrowRight}
              className="mt-2"
            >
              Proceed to Checkout
            </Button>
          </div>
        )
      }
    >
      {/* Free Shipping Meter */}
      <div className="mb-4 pb-4 border-b border-[#DDDDDD] dark:border-[#333333]">
        <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
          <span className="text-[#444444] dark:text-[#CCCCCC]">
            {amountToFreeShipping === 0
              ? 'QUALIFIED FOR COMPLIMENTARY SHIPPING'
              : `ADD ${formatCurrency(amountToFreeShipping)} MORE FOR FREE SHIPPING`}
          </span>
          <span className="font-bold text-[#000000] dark:text-[#FFFFFF]">{freeShippingProgress}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#E5E5E5] dark:bg-[#222222] rounded-full overflow-hidden">
          <div
            className="h-full bg-black dark:bg-white transition-all duration-300"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Cart Items List */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full border border-[#DDDDDD] dark:border-[#333333] bg-[#F5F5F5] dark:bg-[#111111] flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8 text-[#000000] dark:text-[#FFFFFF]" />
          </div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] mb-1">
            Your Cart is Empty
          </h4>
          <p className="text-xs text-[#444444] dark:text-[#CCCCCC] max-w-xs mb-6">
            Explore our curated catalog to begin building your monochrome collection.
          </p>
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              setIsCartOpen(false);
              navigate('/products');
            }}
          >
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="space-y-4 divide-y divide-[#DDDDDD] dark:divide-[#333333]">
          {cart.map((item) => (
            <div key={item.productId} className="pt-4 first:pt-0 flex gap-3.5">
              <div className="w-20 h-20 shrink-0 border border-[#DDDDDD] dark:border-[#333333] rounded-btn overflow-hidden">
                <ProductImage src={item.image} alt={item.name} aspectRatio="aspect-square" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="text-xs font-semibold text-[#000000] dark:text-[#FFFFFF] line-clamp-2">
                      {item.name}
                    </h5>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId)}
                      aria-label={`Remove ${item.name}`}
                      className="p-1 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="font-mono text-xs text-[#444444] dark:text-[#CCCCCC] mt-0.5 block">
                    {formatCurrency(item.price)}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center border border-[#DDDDDD] dark:border-[#333333] rounded-btn text-[#000000] dark:text-[#FFFFFF]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="w-7 h-7 flex items-center justify-center hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-mono font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      aria-label="Increase quantity"
                      className="w-7 h-7 flex items-center justify-center hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] transition-colors disabled:opacity-40"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#000000] dark:text-[#FFFFFF]">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
}
