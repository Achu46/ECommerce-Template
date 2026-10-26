import React from 'react';
import { Filter, X, RotateCcw, Check } from 'lucide-react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';

export function FilterDrawer({
  isOpen,
  onClose,
  categories = [],
  selectedCategory,
  onSelectCategory,
  selectedSubcategory,
  onSelectSubcategory,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  inStockOnly,
  onToggleInStock,
  onSaleOnly,
  onToggleOnSale,
  sortBy,
  onSortChange,
  onClearFilters,
  totalMatching = 0
}) {
  const currentCategoryObj = categories.find((c) => c.name === selectedCategory);
  const subcategories = currentCategoryObj?.subcategories || [];

  const sortOptions = [
    { label: 'Featured Curations', value: 'featured' },
    { label: 'Newest Releases', value: 'newest' },
    { label: 'Price: Ascending', value: 'price_asc' },
    { label: 'Price: Descending', value: 'price_desc' },
    { label: 'Top Rated', value: 'rating' }
  ];

  const ratingOptions = [
    { label: 'All Ratings', value: 0 },
    { label: '4.5 Stars & Above', value: 4.5 },
    { label: '4.0 Stars & Above', value: 4.0 }
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Refine Collection"
      position="right"
      maxWidth="max-w-sm"
      footer={
        <div className="flex gap-2">
          <Button variant="outline" size="md" onClick={onClearFilters} className="flex-1">
            Reset
          </Button>
          <Button variant="primary" size="md" onClick={onClose} className="flex-1">
            Show ({totalMatching})
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-6 divide-y divide-[#E5E5E5] text-xs">
        {/* Sort Section */}
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#737373]">
            Sort By
          </span>
          <div className="flex flex-col gap-1">
            {sortOptions.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center justify-between p-2 rounded-btn hover:bg-[#F5F5F5] cursor-pointer"
              >
                <span className={sortBy === opt.value ? 'font-bold text-[#0A0A0A]' : 'text-[#525252]'}>
                  {opt.label}
                </span>
                <input
                  type="radio"
                  name="sort"
                  value={opt.value}
                  checked={sortBy === opt.value}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="accent-[#0A0A0A] w-4 h-4 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="pt-4 flex flex-col gap-2.5">
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#737373]">
            Category
          </span>
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => {
                onSelectCategory('');
                onSelectSubcategory('');
              }}
              className={`w-full text-left py-2 px-2.5 rounded-btn transition-colors ${!selectedCategory
                  ? 'bg-[#0A0A0A] text-white font-semibold'
                  : 'text-[#525252] hover:bg-[#F5F5F5]'
                }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.name);
                  onSelectSubcategory('');
                }}
                className={`w-full text-left py-2 px-2.5 rounded-btn transition-colors ${selectedCategory === cat.name
                    ? 'bg-[#0A0A0A] text-white font-semibold'
                    : 'text-[#525252] hover:bg-[#F5F5F5]'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories (if selected) */}
        {subcategories.length > 0 && (
          <div className="pt-4 flex flex-col gap-2.5">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#737373]">
              Subcategory
            </span>
            <div className="flex flex-wrap gap-1.5">
              {subcategories.map((sub) => {
                const isSelected = selectedSubcategory === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => onSelectSubcategory(isSelected ? '' : sub)}
                    className={`px-3 py-1.5 rounded-full border text-[11px] font-mono transition-colors ${isSelected
                        ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                        : 'border-[#E5E5E5] bg-white text-[#525252] hover:border-[#0A0A0A]'
                      }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price Range */}
        <div className="pt-4 flex flex-col gap-2.5">
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#737373]">
            Price Limit (Max: ${priceRange})
          </span>
          <input
            type="range"
            min="40"
            max="600"
            step="10"
            value={priceRange}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="w-full accent-[#0A0A0A] cursor-pointer"
          />
          <div className="flex justify-between font-mono text-[11px] text-[#525252]">
            <span>$40</span>
            <span className="font-bold text-[#0A0A0A]">${priceRange}</span>
            <span>$600+</span>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="pt-4 flex flex-col gap-2.5">
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#737373]">
            Customer Rating
          </span>
          <div className="flex flex-col gap-1">
            {ratingOptions.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center justify-between p-2 rounded-btn hover:bg-[#F5F5F5] cursor-pointer"
              >
                <span className={minRating === opt.value ? 'font-bold text-[#0A0A0A]' : 'text-[#525252]'}>
                  {opt.label}
                </span>
                <input
                  type="radio"
                  name="rating"
                  value={opt.value}
                  checked={minRating === opt.value}
                  onChange={() => onRatingChange(opt.value)}
                  className="accent-[#0A0A0A] w-4 h-4 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Toggles (In Stock, On Sale) */}
        <div className="pt-4 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#737373]">
            Availability & Offers
          </span>

          <label className="flex items-center justify-between p-2 rounded-btn hover:bg-[#F5F5F5] cursor-pointer">
            <span className="text-[#0A0A0A]">In-Stock Only</span>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onToggleInStock(e.target.checked)}
              className="accent-[#0A0A0A] w-4 h-4 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-btn hover:bg-[#F5F5F5] cursor-pointer">
            <span className="text-[#0A0A0A]">Archive Sale Items</span>
            <input
              type="checkbox"
              checked={onSaleOnly}
              onChange={(e) => onToggleOnSale(e.target.checked)}
              className="accent-[#0A0A0A] w-4 h-4 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>
    </Drawer>
  );
}
