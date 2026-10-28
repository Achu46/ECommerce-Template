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
        <div className="relative flex items-center bg-[#F5F5F5] dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] focus-within:border-black dark:focus-within:border-white rounded-xl p-1.5 pl-4 transition-colors">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search...."
            className="w-full text-sm sm:text-base bg-transparent text-[#000000] dark:text-[#FFFFFF] placeholder:text-[#444444]/60 dark:placeholder:text-[#CCCCCC]/60 focus:outline-none pr-2"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors"
                title="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="w-9 h-9 rounded-lg bg-white dark:bg-[#161616] border border-[#DDDDDD] dark:border-[#333333] flex items-center justify-center text-[#000000] dark:text-[#FFFFFF] shadow-subtle">
              <Search className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Categories Fast Jump */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] opacity-75 block mb-2">
            Explore Categories
          </span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat.name)}
                className="px-3 py-1.5 text-xs font-mono rounded-full border border-[#DDDDDD] dark:border-[#333333] bg-[#F5F5F5] dark:bg-[#111111] text-[#000000] dark:text-[#FFFFFF] hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="mt-2 min-h-[160px] max-h-[360px] overflow-y-auto divide-y divide-[#DDDDDD] dark:divide-[#333333]">
          {query.trim() && filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#444444] dark:text-[#CCCCCC]">
              No products found matching <span className="font-semibold text-[#000000] dark:text-[#FFFFFF]">"{query}"</span>.
            </div>
          ) : query.trim() ? (
            filteredProducts.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectProduct(p.id)}
                className="w-full py-3 px-2 flex items-center justify-between text-left hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] transition-colors rounded-btn group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 shrink-0 rounded border border-[#DDDDDD] dark:border-[#333333] overflow-hidden">
                    <ProductImage src={p.images[0]} alt={p.name} aspectRatio="aspect-square" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#000000] dark:text-[#FFFFFF] group-hover:underline">
                      {p.name}
                    </h4>
                    <span className="text-xs text-[#444444] dark:text-[#CCCCCC] font-mono">
                      {p.category} · {formatCurrency(p.price)}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#444444] dark:text-[#CCCCCC] group-hover:text-[#000000] dark:group-hover:text-[#FFFFFF] transition-colors" />
              </button>
            ))
          ) : (
            <div className="py-6 text-center text-xs text-[#444444] dark:text-[#CCCCCC] font-mono">
              Type to instantly query the catalog...
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
