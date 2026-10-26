import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  RotateCcw,
  AlertCircle,
  MapPin,
  Calendar,
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProductImage } from '../../components/ui/ProductImage';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

export function OrderTrackingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { orders } = useData();

  const urlOrderId = searchParams.get('orderId') || '';
  const [query, setQuery] = useState(urlOrderId);
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (urlOrderId) {
      handleSearch(urlOrderId);
    }
  }, [urlOrderId, orders]);

  const handleSearch = (searchTerm) => {
    const term = (searchTerm || query).trim().toUpperCase();
    if (!term) return;

    setHasSearched(true);
    const found = orders.find(
      (o) =>
        o.id.toUpperCase() === term ||
        (o.trackingNumber && o.trackingNumber.toUpperCase() === term)
    );
    setSearchedOrder(found || null);
  };

  const steps = [
    { key: 'pending', label: 'Order Queued', icon: Clock },
    { key: 'processing', label: 'Fulfillment & Pick', icon: RotateCcw },
    { key: 'shipped', label: 'In Transit', icon: Truck },
    { key: 'delivered', label: 'Consignment Delivered', icon: CheckCircle2 }
  ];

  const getStepStatus = (stepKey, currentStatus) => {
    if (currentStatus === 'cancelled') return 'cancelled';
    const orderRank = { pending: 0, processing: 1, shipped: 2, delivered: 3 };
    const stepRank = orderRank[stepKey];
    const currentRank = orderRank[currentStatus] ?? 0;

    if (stepRank < currentRank) return 'completed';
    if (stepRank === currentRank) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full flex-1">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] block mb-2">
          Consignment Telemetry
        </span>
        <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0A0A0A]">
          Track Your Shipment
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] mt-2">
          Enter your Order ID (e.g. ORD-98214) or Tracking Code to view real-time fulfillment state.
        </p>

        {/* Search Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="mt-6 flex gap-2 max-w-md mx-auto"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.toUpperCase())}
            placeholder="e.g. ORD-98214 or MN-TRK-774920"
            className="flex-1 min-h-[44px] px-3.5 py-2 text-xs font-mono uppercase border border-[#E5E5E5] rounded-btn bg-white focus:border-[#0A0A0A]"
          />
          <Button type="submit" variant="primary" size="md" icon={Search}>
            Track
          </Button>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-mono text-[#737373]">
          <span>Recent Demo IDs:</span>
          {orders.slice(0, 3).map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => {
                setQuery(o.id);
                handleSearch(o.id);
              }}
              className="underline text-[#0A0A0A] hover:text-[#525252]"
            >
              {o.id}
            </button>
          ))}
        </div>
      </div>

      {/* Result Display */}
      {searchedOrder ? (
        <div className="bg-white border border-[#E5E5E5] rounded-card p-6 sm:p-8 shadow-subtle space-y-8">
          {/* Order Header Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E5E5]">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-mono font-black text-[#0A0A0A]">
                  {searchedOrder.id}
                </h2>
                <Badge status={searchedOrder.status} size="md" />
              </div>
              <p className="text-xs font-mono text-[#737373]">
                Placed on {formatDateTime(searchedOrder.createdAt)}
              </p>
            </div>

            <div className="text-left sm:text-right font-mono text-xs">
              <span className="text-[#737373] block">Tracking Code</span>
              <strong className="text-[#0A0A0A] font-bold">
                {searchedOrder.trackingNumber || 'Pending Courier Allocation'}
              </strong>
            </div>
          </div>

          {/* Stepper Progression */}
          {searchedOrder.status !== 'cancelled' ? (
            <div className="py-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                {steps.map((st, idx) => {
                  const state = getStepStatus(st.key, searchedOrder.status);
                  const Icon = st.icon;

                  let style = 'border-[#E5E5E5] text-[#A3A3A3] bg-[#FAFAFA]';
                  if (state === 'completed') {
                    style = 'border-[#0A0A0A] bg-[#0A0A0A] text-white';
                  } else if (state === 'current') {
                    style = 'border-2 border-[#0A0A0A] bg-white text-[#0A0A0A] font-bold';
                  }

                  return (
                    <div
                      key={st.key}
                      className={`p-4 rounded-card border flex flex-col items-center text-center gap-2.5 transition-all ${style}`}
                    >
                      <div className="p-2 rounded-full border border-current">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-wider">
                        {st.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-[#F5F5F5] border-l-4 border-[#0A0A0A] rounded-btn text-xs text-[#0A0A0A] font-mono">
              <strong>ORDER CANCELLED</strong>
              <p className="mt-1 text-[#525252]">
                {searchedOrder.notes || 'This consignment was cancelled and refunded.'}
              </p>
            </div>
          )}

          {/* Details Grid: Consignment Manifest & Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E5E5E5] text-xs">
            {/* Destination */}
            <div className="space-y-3 bg-[#FAFAFA] p-4 rounded-card border border-[#E5E5E5]">
              <h3 className="font-mono font-bold uppercase tracking-wider text-[#0A0A0A] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0A0A0A]" /> Delivery Destination
              </h3>
              <p className="font-semibold text-[#0A0A0A]">{searchedOrder.customer.name}</p>
              <p className="text-[#525252] leading-relaxed">
                {searchedOrder.shippingAddress?.street}<br />
                {searchedOrder.shippingAddress?.city}, {searchedOrder.shippingAddress?.state} {searchedOrder.shippingAddress?.postalCode}<br />
                {searchedOrder.shippingAddress?.country}
              </p>
              <div className="pt-2 border-t border-[#E5E5E5] text-[11px] font-mono text-[#737373]">
                Payment: {searchedOrder.paymentMethod}
              </div>
            </div>

            {/* Items Manifest */}
            <div className="space-y-3 bg-[#FAFAFA] p-4 rounded-card border border-[#E5E5E5]">
              <h3 className="font-mono font-bold uppercase tracking-wider text-[#0A0A0A] flex items-center gap-2">
                <Package className="w-4 h-4 text-[#0A0A0A]" /> Consignment Contents
              </h3>
              <div className="space-y-2 divide-y divide-[#E5E5E5]">
                {searchedOrder.items?.map((item, i) => (
                  <div key={i} className="pt-2 first:pt-0 flex items-center justify-between gap-3">
                    <span className="truncate text-[#0A0A0A]">
                      {item.quantity}× {item.name}
                    </span>
                    <span className="font-mono font-bold text-[#0A0A0A] shrink-0">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-[#E5E5E5] flex justify-between font-mono font-black text-sm">
                <span>Total Settled</span>
                <span>{formatCurrency(searchedOrder.total)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="bg-white border border-[#E5E5E5] rounded-card p-12 text-center max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-[#0A0A0A] mx-auto mb-3" />
          <h3 className="text-base font-bold uppercase tracking-wider text-[#0A0A0A] mb-1">
            Consignment Not Located
          </h3>
          <p className="text-xs text-[#525252] mb-6">
            No active record found matching query "{query}". Please verify your identifier or select an active order from below.
          </p>
          <div className="space-y-2">
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setQuery(o.id);
                  handleSearch(o.id);
                }}
                className="w-full p-2 bg-[#F5F5F5] border border-[#E5E5E5] rounded-btn text-xs font-mono text-left flex justify-between items-center hover:border-[#0A0A0A]"
              >
                <span>{o.id} ({o.customer.name})</span>
                <span className="font-bold">{o.status}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
