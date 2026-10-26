import React, { createContext, useContext, useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useData } from './DataContext';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('mono_cart', []);
  const [appliedCouponCode, setAppliedCouponCode] = useLocalStorage('mono_applied_coupon', null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { coupons, settings, products } = useData();
  const toast = useToast();

  const addToCart = (product, quantity = 1, options = {}) => {
    // Check real-time stock
    const freshProduct = products.find((p) => p.id === product.id) || product;
    if (freshProduct.stock <= 0) {
      toast.error('Out of Stock', `${freshProduct.name} is currently sold out.`);
      return false;
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.productId === product.id);
      if (existingIndex > -1) {
        const currentQty = prev[existingIndex].quantity;
        const newQty = Math.min(freshProduct.stock, currentQty + quantity);
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          options: { ...updated[existingIndex].options, ...options }
        };
        return updated;
      } else {
        const item = {
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images?.[0] || '',
          sku: product.sku,
          stock: freshProduct.stock,
          quantity: Math.min(freshProduct.stock, Math.max(1, quantity)),
          options
        };
        return [item, ...prev];
      }
    });

    toast.success('Added to Cart', `${product.name} has been added to your cart.`);
    return true;
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    toast.info('Item Removed', 'The item was removed from your cart.');
  };

  const updateQuantity = (productId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId);
      return;
    }

    const targetProduct = products.find((p) => p.id === productId);
    const maxStock = targetProduct ? targetProduct.stock : 99;

    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId) {
          const finalQty = Math.min(maxStock, qty);
          return { ...item, quantity: finalQty, stock: maxStock };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCouponCode(null);
  };

  const applyCoupon = (code) => {
    if (!code) {
      toast.error('Invalid Code', 'Please enter a coupon code.');
      return false;
    }

    const cleanCode = code.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code.toUpperCase() === cleanCode);

    if (!coupon) {
      toast.error('Invalid Coupon', `Code "${cleanCode}" was not found.`);
      return false;
    }

    if (coupon.status !== 'active') {
      toast.error('Coupon Inactive', `Code "${cleanCode}" has expired or is inactive.`);
      return false;
    }

    // Check min spend against subtotal
    const currentSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (currentSubtotal < coupon.minSpend) {
      toast.warning(
        'Minimum Spend Required',
        `A minimum subtotal of $${coupon.minSpend} is required to apply ${coupon.code}.`
      );
      return false;
    }

    setAppliedCouponCode(coupon.code);
    toast.success('Coupon Applied', `Code ${coupon.code} applied successfully!`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCouponCode(null);
    toast.info('Coupon Removed', 'Coupon discount has been removed.');
  };

  // Calculations
  const calculations = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    let discountAmount = 0;
    const activeCoupon = coupons.find(
      (c) => c.code.toUpperCase() === (appliedCouponCode || '').toUpperCase() && c.status === 'active'
    );

    if (activeCoupon && subtotal >= activeCoupon.minSpend) {
      if (activeCoupon.type === 'percentage') {
        discountAmount = Math.min(
          activeCoupon.maxDiscount || Infinity,
          (subtotal * activeCoupon.value) / 100
        );
      } else if (activeCoupon.type === 'fixed') {
        discountAmount = Math.min(subtotal, activeCoupon.value);
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const standardShipping = settings.shippingStandard || 15;
    const freeThreshold = settings.freeShippingThreshold || 150;

    let shippingFee = discountedSubtotal >= freeThreshold || subtotal === 0 ? 0 : standardShipping;
    if (activeCoupon && activeCoupon.type === 'shipping') {
      shippingFee = 0;
    }

    const taxRate = settings.taxRate || 0.09;
    const taxAmount = Math.round(discountedSubtotal * taxRate * 100) / 100;
    const total = discountedSubtotal + shippingFee + taxAmount;

    return {
      subtotal,
      discountAmount,
      shippingFee,
      taxAmount,
      total,
      totalItems,
      activeCoupon,
      freeShippingThreshold: freeThreshold,
      amountToFreeShipping: Math.max(0, freeThreshold - subtotal)
    };
  }, [cart, appliedCouponCode, coupons, settings]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        appliedCoupon: calculations.activeCoupon,
        isCartOpen,
        setIsCartOpen,
        ...calculations
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
