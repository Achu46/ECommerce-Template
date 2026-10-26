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
              <div className="flex items-center justify-between p-2.5 bg-white border border-[#0A0A0A] rounded-btn">
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-[#0A0A0A]" />
                  <span className="text-xs font-mono font-bold uppercase">{appliedCoupon.code}</span>
                  <span className="text-[11px] text-[#525252]">(-{formatCurrency(discountAmount)})</span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  aria-label="Remove coupon"
                  className="p-1 text-[#525252] hover:text-[#0A0A0A]"
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
                  className="flex-1 min-h-[40px] px-3 py-1.5 text-xs font-mono border border-[#E5E5E5] rounded-btn bg-white uppercase placeholder:normal-case placeholder:font-sans focus:border-[#0A0A0A]"
                />
                <Button type="submit" variant="secondary" size="sm">
                  Apply
                </Button>
              </form>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 pt-2 text-xs border-t border-[#E5E5E5]">
              <div className="flex justify-between text-[#525252]">
                <span>Subtotal</span>
                <span className="font-mono text-[#0A0A0A]">{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#0A0A0A] font-medium">
                  <span>Discount</span>
                  <span className="font-mono">-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#525252]">
                <span>Estimated Shipping</span>
                <span className="font-mono text-[#0A0A0A]">
                  {shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#0A0A0A] pt-2 border-t border-[#E5E5E5]">
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
      <div className="mb-4 pb-4 border-b border-[#E5E5E5]">
        <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
          <span className="text-[#525252]">
            {amountToFreeShipping === 0
              ? 'QUALIFIED FOR COMPLIMENTARY SHIPPING'
              : `ADD ${formatCurrency(amountToFreeShipping)} MORE FOR FREE SHIPPING`}
          </span>
          <span className="font-bold">{freeShippingProgress}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0A0A0A] transition-all duration-300"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Cart Items List */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full border border-[#0A0A0A] bg-[#F5F5F5] flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8 text-[#0A0A0A]" />
          </div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A0A0A] mb-1">
            Your Cart is Empty
          </h4>
          <p className="text-xs text-[#525252] max-w-xs mb-6">
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
        <div className="space-y-4 divide-y divide-[#E5E5E5]">
          {cart.map((item) => (
            <div key={item.productId} className="pt-4 first:pt-0 flex gap-3.5">
              <div className="w-20 h-20 shrink-0 border border-[#E5E5E5] rounded-btn overflow-hidden">
                <ProductImage src={item.image} alt={item.name} aspectRatio="aspect-square" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="text-xs font-semibold text-[#0A0A0A] line-clamp-2">
                      {item.name}
                    </h5>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId)}
                      aria-label={`Remove ${item.name}`}
                      className="p-1 text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="font-mono text-xs text-[#525252] mt-0.5 block">
                    {formatCurrency(item.price)}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center border border-[#0A0A0A] rounded-btn">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="w-7 h-7 flex items-center justify-center hover:bg-[#F5F5F5] transition-colors"
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
                      className="w-7 h-7 flex items-center justify-center hover:bg-[#F5F5F5] transition-colors disabled:opacity-40"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#0A0A0A]">
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
