import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowUpRight, Clock } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useData } from '../../context/DataContext';
import { ProductImage } from '../ui/ProductImage';
import { formatCurrency } from '../../utils/formatters';

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const { products, categories } = useData();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Filter products by query
  const filteredProducts = query.trim()
    ? products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.subcategory?.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6)
    : [];

  const handleSelectProduct = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleSelectCategory = (catName) => {
    onClose();
    navigate(`/products?category=${encodeURIComponent(catName)}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl" showClose={false}>
      <div className="flex flex-col gap-4">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b-2 border-[#0A0A0A] pb-3">
          <Search className="w-5 h-5 text-[#525252] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product name, category, or SKU..."
            className="w-full text-base sm:text-lg bg-transparent text-[#0A0A0A] placeholder:text-[#A3A3A3] focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-[#525252] hover:text-[#0A0A0A]"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="hidden sm:inline-block font-mono text-[11px] text-[#A3A3A3] border border-[#E5E5E5] px-1.5 py-0.5 rounded">
              ESC
            </span>
          )}
        </div>

        {/* Categories Fast Jump */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block mb-2">
            Explore Categories
          </span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat.name)}
                className="px-3 py-1.5 text-xs font-mono rounded-full border border-[#E5E5E5] bg-[#F5F5F5] hover:bg-[#0A0A0A] hover:text-white transition-colors"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="mt-2 min-h-[160px] max-h-[360px] overflow-y-auto divide-y divide-[#E5E5E5]">
          {query.trim() && filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#525252]">
              No products found matching <span className="font-semibold text-[#0A0A0A]">"{query}"</span>.
            </div>
          ) : query.trim() ? (
            filteredProducts.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectProduct(p.id)}
                className="w-full py-3 px-2 flex items-center justify-between text-left hover:bg-[#F5F5F5] transition-colors rounded-btn group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 shrink-0 rounded border border-[#E5E5E5] overflow-hidden">
                    <ProductImage src={p.images[0]} alt={p.name} aspectRatio="aspect-square" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#0A0A0A] group-hover:underline">
                      {p.name}
                    </h4>
                    <span className="text-xs text-[#525252] font-mono">
                      {p.category} · {formatCurrency(p.price)}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#A3A3A3] group-hover:text-[#0A0A0A] transition-colors" />
              </button>
            ))
          ) : (
            <div className="py-6 text-center text-xs text-[#737373] font-mono">
              Type to instantly query the catalog...
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
