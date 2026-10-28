import React, { useState } from 'react';
import { Boxes, AlertTriangle, Search, Plus, Minus, Check, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProductImage } from '../../components/ui/ProductImage';
import { formatCurrency } from '../../utils/formatters';

export function AdminInventoryPage() {
  const { products, updateProduct } = useData();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'low' | 'out'

  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  const handleAdjustStock = (product, delta) => {
    const nextStock = Math.max(0, product.stock + delta);
    updateProduct(product.id, { stock: nextStock });
    toast.success('Inventory Adjusted', `${product.sku} now at ${nextStock} units.`);
  };

  const handleSetStock = (product, value) => {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      updateProduct(product.id, { stock: parsed });
      toast.success('Stock Level Defined', `${product.sku} updated to ${parsed} units.`);
    }
  };

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);

    let matchesMode = true;
    if (filterMode === 'low') matchesMode = p.stock > 0 && p.stock <= 10;
    else if (filterMode === 'out') matchesMode = p.stock === 0;

    return matchesQuery && matchesMode;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DDDDDD] dark:border-[#333333]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#444444] dark:text-[#CCCCCC] block mb-1">
            Warehouse Level Balances
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF]">
            Inventory Management ({products.length})
          </h1>
        </div>

        {/* Warning Badges */}
        <div className="flex items-center gap-2">
          {outOfStockCount > 0 && (
            <Badge status="out_of_stock">
              {outOfStockCount} Sold Out
            </Badge>
          )}
          {lowStockCount > 0 && (
            <Badge status="low_stock">
              {lowStockCount} Low Stock
            </Badge>
          )}
        </div>
      </div>

      {/* Control Strip */}
      <div className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-4 shadow-subtle flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search...."
            className="w-full min-h-[44px] pl-4 pr-12 py-2 text-xs border border-[#DDDDDD] dark:border-[#333333] rounded-xl bg-white dark:bg-[#0A0A0A] text-[#000000] dark:text-[#FFFFFF] placeholder-[#737373] dark:placeholder-[#666666] focus:border-[#000000] dark:focus:border-[#FFFFFF]"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#F5F5F5] dark:bg-[#161616] border border-[#DDDDDD] dark:border-[#333333] flex items-center justify-center text-[#000000] dark:text-[#FFFFFF] pointer-events-none shadow-subtle">
            <Search className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-2 text-xs font-mono rounded-btn border transition-colors ${
              filterMode === 'all'
                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                : 'bg-white dark:bg-[#0A0A0A] text-[#444444] dark:text-[#CCCCCC] border-[#DDDDDD] dark:border-[#333333] hover:text-[#000000] dark:hover:text-[#FFFFFF]'
            }`}
          >
            All Items ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('low')}
            className={`px-3 py-2 text-xs font-mono rounded-btn border transition-colors ${
              filterMode === 'low'
                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                : 'bg-white dark:bg-[#0A0A0A] text-[#444444] dark:text-[#CCCCCC] border-[#DDDDDD] dark:border-[#333333] hover:text-[#000000] dark:hover:text-[#FFFFFF]'
            }`}
          >
            Low Stock ({lowStockCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('out')}
            className={`px-3 py-2 text-xs font-mono rounded-btn border transition-colors ${
              filterMode === 'out'
                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                : 'bg-white dark:bg-[#0A0A0A] text-[#444444] dark:text-[#CCCCCC] border-[#DDDDDD] dark:border-[#333333] hover:text-[#000000] dark:hover:text-[#FFFFFF]'
            }`}
          >
            Sold Out ({outOfStockCount})
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#EBEBEB] dark:bg-[#0A0A0A] border-b border-[#DDDDDD] dark:border-[#333333] text-[#444444] dark:text-[#CCCCCC] uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Artifact</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Unit Price</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Status Indicator</th>
                <th className="py-3 px-4 text-right">Instant Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDDDDD] dark:divide-[#333333]">
              {filteredProducts.map((p) => {
                const isOut = p.stock === 0;
                const isLow = p.stock > 0 && p.stock <= 10;

                return (
                  <tr
                    key={p.id}
                    className="hover:bg-[#EBEBEB] dark:hover:bg-[#1C1C1C] focus-within:bg-[#EBEBEB] dark:focus-within:bg-[#1C1C1C] transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 shrink-0 border border-[#DDDDDD] dark:border-[#333333] rounded overflow-hidden bg-white dark:bg-[#0A0A0A]">
                          <ProductImage src={p.images?.[0]} alt={p.name} aspectRatio="aspect-[4/5]" />
                        </div>
                        <div className="truncate max-w-[220px]">
                          <span className="font-bold text-[#000000] dark:text-[#FFFFFF] block truncate">{p.name}</span>
                          <span className="text-[10px] text-[#444444] dark:text-[#BDBDBD]">{p.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#444444] dark:text-[#BDBDBD]">{p.sku}</td>
                    <td className="py-3.5 px-4 text-[#000000] dark:text-[#FFFFFF] font-bold">{formatCurrency(p.price)}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-sm font-black text-[#000000] dark:text-[#FFFFFF]">
                        {p.stock}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {isOut ? (
                        <Badge status="out_of_stock" size="sm" />
                      ) : isLow ? (
                        <Badge status="low_stock" size="sm">
                          Low Stock
                        </Badge>
                      ) : (
                        <Badge status="in_stock" size="sm" />
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleAdjustStock(p, -1)}
                          disabled={p.stock <= 0}
                          className="px-2.5 py-1 bg-white dark:bg-[#161616] border border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white text-[#000000] dark:text-[#FFFFFF] rounded text-[11px] font-bold disabled:opacity-30 transition-colors"
                          title="Decrement stock by 1"
                        >
                          -1
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAdjustStock(p, 5)}
                          className="px-2.5 py-1 bg-white dark:bg-[#161616] border border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white text-[#000000] dark:text-[#FFFFFF] rounded text-[11px] font-bold transition-colors"
                          title="Restock 5 units"
                        >
                          +5
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAdjustStock(p, 25)}
                          className="px-2.5 py-1 bg-black text-white hover:bg-[#333333] dark:bg-white dark:text-black dark:hover:bg-[#E5E5E5] rounded text-[11px] font-bold transition-colors"
                          title="Restock batch of 25 units"
                        >
                          +25
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
