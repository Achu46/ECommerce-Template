import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Building,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ProductImage } from '../../components/ui/ProductImage';
import { formatCurrency } from '../../utils/formatters';
import { isValidEmail, isValidPhone, isValidPostalCode } from '../../utils/validators';

export function CheckoutPage() {
  const { cart, subtotal, discountAmount, shippingFee, taxAmount, total, clearCart, appliedCoupon } = useCart();
  const { addOrder } = useData();
  const { currentUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    firstName: currentUser?.name?.split(' ')[0] || 'Alexander',
    lastName: currentUser?.name?.split(' ')[1] || 'Wright',
    email: currentUser?.email || 'alexander.wright@archdesign.com',
    phone: currentUser?.phone || '+1 (555) 234-8901',
    street: currentUser?.address?.street || '420 West Broadway, Loft 4B',
    city: currentUser?.address?.city || 'New York',
    state: currentUser?.address?.state || 'NY',
    postalCode: currentUser?.address?.postalCode || '10012',
    country: currentUser?.address?.country || 'United States',
    paymentMethod: 'credit_card', // 'credit_card' | 'apple_pay' | 'bank_transfer'
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
    notes: 'Please buzz loft 4B on arrival.'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold uppercase mb-2 text-[#000000] dark:text-[#FFFFFF]">No Items in Checkout</h2>
        <p className="text-sm text-[#444444] dark:text-[#CCCCCC] mb-6">Your bag is currently empty. Please add items to proceed with simulated checkout.</p>
        <Link to="/products">
          <Button variant="primary">Return to Collection</Button>
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!isValidEmail(formData.email)) errs.email = 'Please provide a valid email';
    if (!isValidPhone(formData.phone)) errs.phone = 'Please provide a valid telephone number';
    if (!formData.street.trim()) errs.street = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.state.trim()) errs.state = 'State / Region is required';
    if (!isValidPostalCode(formData.postalCode)) errs.postalCode = 'Valid postal / zip code is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Incomplete Details', 'Please review highlighted form fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderPayload = {
        customer: {
          id: currentUser?.id || `cust-${Date.now()}`,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country
        },
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        subtotal,
        discount: discountAmount,
        shipping: shippingFee,
        tax: taxAmount,
        total,
        paymentMethod:
          formData.paymentMethod === 'credit_card'
            ? 'Credit Card (Simulated)'
            : formData.paymentMethod === 'apple_pay'
              ? 'Apple Pay (Simulated)'
              : 'Bank Wire (Simulated)',
        notes: formData.notes
      };

      const createdOrder = addOrder(orderPayload);
      clearCart();
      setIsSubmitting(false);

      toast.success('Order Confirmed', `Consignment #${createdOrder.id} successfully queued.`);
      navigate(`/order-tracking?orderId=${createdOrder.id}`);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1 text-[#000000] dark:text-[#FFFFFF]">
      {/* Disclaimer Banner */}
      <div className="mb-8 p-4 bg-[#F5F5F5] dark:bg-[#111111] border-2 border-black dark:border-white rounded-card flex items-start gap-3">
        <Info className="w-5 h-5 text-[#000000] dark:text-[#FFFFFF] shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <strong className="text-[#000000] dark:text-[#FFFFFF] uppercase tracking-wider block font-bold mb-0.5">
            Simulated Demo Payment Gateway
          </strong>
          <span className="text-[#444444] dark:text-[#CCCCCC]">
            This is an interactive front-end portfolio demonstration. No real financial transaction will occur, and no real physical shipment will be dispatched. Form fields are pre-populated for rapid evaluation.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Checkout Forms (7 cols) */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-8">

          {/* Section 1: Customer Contact */}
          <div className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-6 shadow-subtle space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] border-b border-[#DDDDDD] dark:border-[#333333] pb-3 flex items-center justify-between">
              <span>01 / Contact Identification</span>
              <Lock className="w-4 h-4 text-[#444444] dark:text-[#CCCCCC]" />
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                required
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                error={errors.firstName}
              />
              <Input
                label="Last Name"
                required
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                error={errors.lastName}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                helperText="Simulated receipt sent here"
              />
              <Input
                label="Phone Number"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
              />
            </div>
          </div>

          {/* Section 2: Consignment Address */}
          <div className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-6 shadow-subtle space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] border-b border-[#DDDDDD] dark:border-[#333333] pb-3">
              02 / Delivery Destination
            </h2>

            <Input
              label="Street Address"
              required
              value={formData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              error={errors.street}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="City"
                required
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                error={errors.city}
              />
              <Input
                label="State / Region"
                required
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                error={errors.state}
              />
              <Input
                label="Postal / Zip Code"
                required
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                error={errors.postalCode}
              />
            </div>

            <Input
              label="Country"
              required
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
            />

            <Input
              label="Delivery Instructions (Optional)"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="e.g. Leave with doorman or gate code..."
            />
          </div>

          {/* Section 3: Payment Method (Simulated) */}
          <div className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-6 shadow-subtle space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] border-b border-[#DDDDDD] dark:border-[#333333] pb-3 flex items-center justify-between">
              <span>03 / Settlement Protocol</span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#EEEEEE] dark:bg-[#1A1A1A] rounded border border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF]">
                MOCK SANDBOX
              </span>
            </h2>

            {/* Payment Method Radio Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleInputChange('paymentMethod', 'credit_card')}
                className={`p-3 rounded-btn border text-left flex flex-col justify-between h-20 transition-all ${formData.paymentMethod === 'credit_card'
                    ? 'border-2 border-black dark:border-white bg-[#EEEEEE] dark:bg-[#1A1A1A]'
                    : 'border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white'
                  }`}
              >
                <CreditCard className="w-5 h-5 text-[#000000] dark:text-[#FFFFFF]" />
                <span className="text-xs font-mono font-bold uppercase text-[#000000] dark:text-[#FFFFFF]">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => handleInputChange('paymentMethod', 'apple_pay')}
                className={`p-3 rounded-btn border text-left flex flex-col justify-between h-20 transition-all ${formData.paymentMethod === 'apple_pay'
                    ? 'border-2 border-black dark:border-white bg-[#EEEEEE] dark:bg-[#1A1A1A]'
                    : 'border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white'
                  }`}
              >
                <div className="w-5 h-5 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-mono text-[9px] font-black">
                  
                </div>
                <span className="text-xs font-mono font-bold uppercase text-[#000000] dark:text-[#FFFFFF]">Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => handleInputChange('paymentMethod', 'bank_transfer')}
                className={`p-3 rounded-btn border text-left flex flex-col justify-between h-20 transition-all ${formData.paymentMethod === 'bank_transfer'
                    ? 'border-2 border-black dark:border-white bg-[#EEEEEE] dark:bg-[#1A1A1A]'
                    : 'border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white'
                  }`}
              >
                <Building className="w-5 h-5 text-[#000000] dark:text-[#FFFFFF]" />
                <span className="text-xs font-mono font-bold uppercase text-[#000000] dark:text-[#FFFFFF]">Bank Wire</span>
              </button>
            </div>

            {formData.paymentMethod === 'credit_card' && (
              <div className="p-4 bg-white dark:bg-[#0A0A0A] rounded-btn border border-[#DDDDDD] dark:border-[#333333] space-y-3 mt-3">
                <Input
                  label="Card Number"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Expiration"
                    value={formData.cardExp}
                    onChange={(e) => handleInputChange('cardExp', e.target.value)}
                  />
                  <Input
                    label="Security Code (CVC)"
                    value={formData.cardCvc}
                    onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            icon={ArrowRight}
          >
            Authorize Consignment • {formatCurrency(total)}
          </Button>
        </form>

        {/* Right Column: Sticky Order Summary (5 cols) */}
        <div className="lg:col-span-5 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-6 shadow-subtle lg:sticky lg:top-28 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] border-b border-[#DDDDDD] dark:border-[#333333] pb-3">
            Manifest ({cart.length} distinct lines)
          </h3>

          {/* Cart preview list */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-[#DDDDDD] dark:divide-[#333333]">
            {cart.map((item) => (
              <div key={item.productId} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 shrink-0 border border-[#DDDDDD] dark:border-[#333333] rounded overflow-hidden">
                    <ProductImage src={item.image} alt={item.name} aspectRatio="aspect-[4/5]" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-[#000000] dark:text-[#FFFFFF] line-clamp-1">{item.name}</h5>
                    <span className="text-[11px] text-[#444444] dark:text-[#CCCCCC] font-mono">
                      Qty: {item.quantity} × {formatCurrency(item.price)}
                    </span>
                  </div>
                </div>
                <span className="font-mono font-bold text-[#000000] dark:text-[#FFFFFF]">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Line Totals */}
          <div className="space-y-2 text-xs font-mono border-t border-[#DDDDDD] dark:border-[#333333] pt-4">
            <div className="flex justify-between text-[#444444] dark:text-[#CCCCCC]">
              <span>Subtotal</span>
              <span className="text-[#000000] dark:text-[#FFFFFF] font-semibold">{formatCurrency(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-[#000000] dark:text-[#FFFFFF] font-bold">
                <span>Coupon ({appliedCoupon?.code})</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#444444] dark:text-[#CCCCCC]">
              <span>Expedited Transit</span>
              <span className="text-[#000000] dark:text-[#FFFFFF] font-semibold">
                {shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}
              </span>
            </div>

            <div className="flex justify-between text-[#444444] dark:text-[#CCCCCC]">
              <span>Sales Tax</span>
              <span className="text-[#000000] dark:text-[#FFFFFF] font-semibold">{formatCurrency(taxAmount)}</span>
            </div>

            <div className="flex justify-between text-base font-black text-[#000000] dark:text-[#FFFFFF] border-t border-[#DDDDDD] dark:border-[#333333] pt-3">
              <span>Final Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] rounded-btn text-[11px] text-[#444444] dark:text-[#CCCCCC] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#000000] dark:text-[#FFFFFF] shrink-0" />
            <span>Simulated checkout session. Order will instantly reflect in live database.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
