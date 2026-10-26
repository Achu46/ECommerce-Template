import React from 'react';
import { Tag, Copy, Check, ArrowRight, Percent, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { ProductCard } from '../../components/store/ProductCard';
import { Button } from '../../components/ui/Button';

export function OffersPage() {
  const { coupons, products } = useData();
  const toast = useToast();

  const activeCoupons = coupons.filter((c) => c.status === 'active');
  const onSaleProducts = products.filter((p) => p.isOnSale);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    toast.success('Code Copied', `Promo code ${code} copied to clipboard.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full flex-1">
      {/* Header */}
      <div className="mb-10 sm:mb-14">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] block mb-2">
          Privileged Incentives
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0A0A0A]">
          Exclusive Offers & Coupons
        </h1>
        <p className="text-xs sm:text-sm text-[#525252] mt-2 max-w-xl">
          Apply these active promotion codes at checkout to unlock percentage reductions and global shipping benefits.
        </p>
      </div>

      {/* Coupons Grid */}
      <section className="mb-16">
        <h2 className="text-sm font-mono uppercase font-bold tracking-wider text-[#0A0A0A] mb-4 flex items-center gap-2">
          <Tag className="w-4 h-4" /> Active Promotion Codes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {activeCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white border-2 border-[#0A0A0A] rounded-card p-5 shadow-subtle flex flex-col justify-between relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xl font-black font-mono tracking-tight text-[#0A0A0A]">
                  {coupon.code}
                </span>
                <span className="px-2 py-0.5 bg-[#0A0A0A] text-white text-[10px] font-mono font-bold uppercase rounded">
                  {coupon.type === 'percentage'
                    ? `${coupon.value}% OFF`
                    : coupon.type === 'fixed'
                      ? `$${coupon.value} OFF`
                      : 'FREE SHIPPING'}
                </span>
              </div>

              <p className="text-xs text-[#525252] leading-relaxed mb-4">
                {coupon.description}
              </p>

              <div className="pt-3 border-t border-[#E5E5E5] flex items-center justify-between text-xs font-mono">
                <span className="text-[#737373]">
                  Min spend: ${coupon.minSpend}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(coupon.code)}
                  className="inline-flex items-center gap-1.5 font-bold text-[#0A0A0A] hover:underline p-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Code
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clearance Archive Products */}
      <section className="pt-8 border-t border-[#E5E5E5]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-[#0A0A0A]">
              Archive Clearance Items ({onSaleProducts.length})
            </h2>
            <p className="text-xs text-[#737373] font-mono mt-1">
              Final seasonal production runs marked below original MSRP
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {onSaleProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
}
