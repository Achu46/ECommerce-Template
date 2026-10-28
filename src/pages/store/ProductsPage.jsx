import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, SlidersHorizontal, X, RotateCcw, PackageSearch } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ProductCard } from '../../components/store/ProductCard';
import { FilterDrawer } from '../../components/store/FilterDrawer';
import { Pagination } from '../../components/ui/Pagination';
import { EmptyState } from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';

const PAGE_SIZE = 12;

export function ProductsPage() {
  const { products, categories } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query params
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [priceRange, setPriceRange] = useState(600);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Sync category from URL if changed externally
  useEffect(() => {
    if (searchParams.get('category') !== null) {
      setSelectedCategory(searchParams.get('category') || '');
      setSelectedSubcategory('');
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Subcategory
    if (selectedSubcategory) {
      list = list.filter((p) => p.subcategory === selectedSubcategory);
    }

    // Price
    list = list.filter((p) => p.price <= priceRange);

    // Rating
    if (minRating > 0) {
      list = list.filter((p) => p.rating >= minRating);
    }

    // In-Stock
    if (inStockOnly) {
      list = list.filter((p) => p.stock > 0);
    }

    // On-Sale
    if (onSaleOnly) {
      list = list.filter((p) => p.isOnSale);
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price_asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return list;
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    priceRange,
    minRating,
    inStockOnly,
    onSaleOnly,
    sortBy
  ]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setPriceRange(600);
    setMinRating(0);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSortBy('featured');
    setCurrentPage(1);
    setSearchParams({});
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    Boolean(selectedCategory) ||
    Boolean(selectedSubcategory) ||
    priceRange < 600 ||
    minRating > 0 ||
    inStockOnly ||
    onSaleOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1 flex flex-col">
      {/* Header & Title */}
      <div className="mb-6 sm:mb-8">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#444444] dark:text-[#CCCCCC] block mb-1">
          Catalog Architecture
        </span>
        <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF]">
          {selectedCategory || 'Entire Collection'}
        </h1>
        <p className="text-xs sm:text-sm text-[#444444] dark:text-[#CCCCCC] mt-1 font-mono">
          {totalItems} items matching active parameters
        </p>
      </div>

      {/* Control Bar: Search input, filter drawer trigger, quick pill categories */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pb-6 border-b border-[#DDDDDD] dark:border-[#333333] mb-6">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search...."
            className="w-full min-h-[44px] pl-4 pr-12 py-2 text-xs border border-[#DDDDDD] dark:border-[#333333] rounded-xl bg-white dark:bg-[#0A0A0A] text-[#000000] dark:text-[#FFFFFF] focus:border-[#000000] dark:focus:border-[#FFFFFF] placeholder:text-[#444444]/60 dark:placeholder:text-[#CCCCCC]/60"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] dark:bg-[#161616] border border-[#DDDDDD] dark:border-[#333333] flex items-center justify-center text-[#000000] dark:text-[#FFFFFF] pointer-events-none shadow-subtle">
              <Search className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Filter Drawer Trigger */}
          <Button
            variant={hasActiveFilters ? 'primary' : 'outline'}
            size="md"
            onClick={() => setIsFilterDrawerOpen(true)}
            icon={SlidersHorizontal}
          >
            Filters {hasActiveFilters && '• Active'}
          </Button>

          {/* Quick Sort Select */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="min-h-[44px] px-3 text-xs font-mono border border-[#DDDDDD] dark:border-[#333333] rounded-btn bg-white dark:bg-[#0A0A0A] text-[#000000] dark:text-[#FFFFFF] focus:border-[#000000] dark:focus:border-[#FFFFFF]"
          >
            <option value="featured">Sort: Featured</option>
            <option value="newest">Sort: Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setSelectedCategory('');
            setSelectedSubcategory('');
            setSearchParams({});
            setCurrentPage(1);
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase whitespace-nowrap transition-colors border ${!selectedCategory
              ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white font-bold'
              : 'bg-[#F5F5F5] dark:bg-[#111111] text-[#444444] dark:text-[#CCCCCC] border-[#DDDDDD] dark:border-[#333333] hover:border-[#000000] dark:hover:border-[#FFFFFF]'
            }`}
        >
          All ({products.length})
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          const count = products.filter((p) => p.category === cat.name).length;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.name);
                setSelectedSubcategory('');
                setSearchParams({ category: cat.name });
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase whitespace-nowrap transition-colors border ${isSelected
                  ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white font-bold'
                  : 'bg-[#F5F5F5] dark:bg-[#111111] text-[#444444] dark:text-[#CCCCCC] border-[#DDDDDD] dark:border-[#333333] hover:border-[#000000] dark:hover:border-[#FFFFFF]'
                }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-btn text-xs font-mono">
          <span className="text-[#444444] dark:text-[#CCCCCC] text-[10px] uppercase font-bold">Filters:</span>
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF] rounded">
              Cat: {selectedCategory}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('')} />
            </span>
          )}
          {selectedSubcategory && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF] rounded">
              Sub: {selectedSubcategory}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSubcategory('')} />
            </span>
          )}
          {priceRange < 600 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF] rounded">
              Max: ${priceRange}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange(600)} />
            </span>
          )}
          {minRating > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF] rounded">
              Rating: {minRating}+
              <X className="w-3 h-3 cursor-pointer" onClick={() => setMinRating(0)} />
            </span>
          )}
          {inStockOnly && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF] rounded">
              In Stock
              <X className="w-3 h-3 cursor-pointer" onClick={() => setInStockOnly(false)} />
            </span>
          )}
          {onSaleOnly && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF] rounded">
              Sale Items
              <X className="w-3 h-3 cursor-pointer" onClick={() => setOnSaleOnly(false)} />
            </span>
          )}
          <button
            type="button"
            onClick={handleClearFilters}
            className="ml-auto underline text-[#000000] dark:text-[#FFFFFF] hover:text-[#444444] dark:hover:text-[#CCCCCC] text-[11px]"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Product Grid Area */}
      {paginatedProducts.length === 0 ? (
        <EmptyState
          icon={PackageSearch}
          title="No Products Match Your Criteria"
          description="Try broadening your price range, clearing specific subcategory filters, or searching for an alternative term."
          actionLabel="Reset All Filters"
          onAction={handleClearFilters}
          actionIcon={RotateCcw}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {paginatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-8 pt-6 border-t border-[#DDDDDD] dark:border-[#333333]">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={PAGE_SIZE}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        </>
      )}

      {/* Slide-out Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage(1);
        }}
        selectedSubcategory={selectedSubcategory}
        onSelectSubcategory={(sub) => {
          setSelectedSubcategory(sub);
          setCurrentPage(1);
        }}
        priceRange={priceRange}
        onPriceChange={(val) => {
          setPriceRange(val);
          setCurrentPage(1);
        }}
        minRating={minRating}
        onRatingChange={(val) => {
          setMinRating(val);
          setCurrentPage(1);
        }}
        inStockOnly={inStockOnly}
        onToggleInStock={(val) => {
          setInStockOnly(val);
          setCurrentPage(1);
        }}
        onSaleOnly={onSaleOnly}
        onToggleOnSale={(val) => {
          setOnSaleOnly(val);
          setCurrentPage(1);
        }}
        sortBy={sortBy}
        onSortChange={(val) => {
          setSortBy(val);
          setCurrentPage(1);
        }}
        onClearFilters={handleClearFilters}
        totalMatching={totalItems}
      />
    </div>
  );
}
