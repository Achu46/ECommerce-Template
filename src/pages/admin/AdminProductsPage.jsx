import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Filter,
  Package,
  AlertTriangle,
  ArrowUpDown,
  ExternalLink,
  X
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Badge } from '../../components/ui/Badge';
import { Pagination } from '../../components/ui/Pagination';
import { ProductImage } from '../../components/ui/ProductImage';
import { formatCurrency } from '../../utils/formatters';
import { isPositiveNumber, isNonNegativeNumber } from '../../utils/validators';

const PAGE_SIZE = 10;

export function AdminProductsPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('all'); // 'all' | 'low' | 'out' | 'in'
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form input state
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Apparel',
    subcategory: '',
    price: '',
    originalPrice: '',
    stock: '',
    description: '',
    imageUrl: '',
    featuresString: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Reset form
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      category: categories[0]?.name || 'Apparel',
      subcategory: '',
      price: '',
      originalPrice: '',
      stock: '25',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      featuresString: 'Architectural geometry\nCombed organic fibers\nHigh-density construction'
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      sku: prod.sku,
      category: prod.category,
      subcategory: prod.subcategory || '',
      price: prod.price.toString(),
      originalPrice: prod.originalPrice ? prod.originalPrice.toString() : '',
      stock: prod.stock.toString(),
      description: prod.description || '',
      imageUrl: prod.images?.[0] || '',
      featuresString: prod.features?.join('\n') || ''
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validateProductForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Artifact title is required';
    if (!formData.sku.trim()) errs.sku = 'SKU is required';
    if (!isPositiveNumber(formData.price)) errs.price = 'Price must be a number greater than 0';
    if (!isNonNegativeNumber(formData.stock)) errs.stock = 'Stock must be a non-negative integer';
    if (!formData.description.trim()) errs.description = 'Description is required';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!validateProductForm()) return;

    const payload = {
      name: formData.name.trim(),
      sku: formData.sku.trim().toUpperCase(),
      category: formData.category,
      subcategory: formData.subcategory.trim(),
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      description: formData.description.trim(),
      images: [formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'],
      features: formData.featuresString
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean)
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      toast.success('Artifact Updated', `${payload.name} has been refreshed in the catalog.`);
    } else {
      addProduct(payload);
      toast.success('Artifact Cataloged', `${payload.name} successfully created.`);
    }

    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      deleteProduct(deleteConfirmId);
      toast.info('Artifact Erased', 'Product record was deleted.');
      setDeleteConfirmId(null);
    }
  };

  // Filtered & Paginated list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !categoryFilter || p.category === categoryFilter;

      let matchesStock = true;
      if (stockFilter === 'low') matchesStock = p.stock > 0 && p.stock <= 10;
      else if (stockFilter === 'out') matchesStock = p.stock === 0;
      else if (stockFilter === 'in') matchesStock = p.stock > 10;

      return matchesQuery && matchesCategory && matchesStock;
    });
  }, [products, searchQuery, categoryFilter, stockFilter]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;
  const paginatedList = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="space-y-6 pb-12 text-[#000000] dark:text-[#FFFFFF]">
      {/* Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DDDDDD] dark:border-[#333333]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#444444] dark:text-[#CCCCCC] block mb-1">
            Inventory Registry
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF]">
            Catalog Artifacts ({products.length})
          </h1>
        </div>

        <Button variant="primary" size="md" onClick={handleOpenCreate} icon={Plus}>
          Add New Artifact
        </Button>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-4 shadow-subtle flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search...."
            className="w-full min-h-[44px] pl-4 pr-12 py-2 text-xs border border-[#DDDDDD] dark:border-[#333333] rounded-xl bg-white dark:bg-[#0A0A0A] text-[#000000] dark:text-[#FFFFFF] focus:border-black dark:focus:border-white placeholder:text-[#444444]/60 dark:placeholder:text-[#CCCCCC]/60"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#F5F5F5] dark:bg-[#161616] border border-[#DDDDDD] dark:border-[#333333] flex items-center justify-center text-[#000000] dark:text-[#FFFFFF] pointer-events-none shadow-subtle">
            <Search className="w-4 h-4" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="min-h-[44px] px-3 text-xs font-mono border border-[#DDDDDD] dark:border-[#333333] rounded-btn bg-white dark:bg-[#0A0A0A] text-[#000000] dark:text-[#FFFFFF] focus:border-black dark:focus:border-white"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => {
              setStockFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="min-h-[44px] px-3 text-xs font-mono border border-[#DDDDDD] dark:border-[#333333] rounded-btn bg-white dark:bg-[#0A0A0A] text-[#000000] dark:text-[#FFFFFF] focus:border-black dark:focus:border-white"
          >
            <option value="all">All Stock Levels</option>
            <option value="in">In Stock (&gt;10)</option>
            <option value="low">Low Stock (≤10)</option>
            <option value="out">Sold Out (0)</option>
          </select>
        </div>
      </div>

      {/* Table: Responsive scroll container or card transformation */}
      <div className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-white dark:bg-[#0A0A0A] border-b border-[#DDDDDD] dark:border-[#333333] text-[#444444] dark:text-[#CCCCCC] uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Artifact</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDDDDD] dark:divide-[#333333]">
              {paginatedList.map((p) => {
                const isOut = p.stock === 0;
                const isLow = p.stock > 0 && p.stock <= 10;

                return (
                  <tr key={p.id} className="hover:bg-[#EBEBEB] dark:hover:bg-[#1C1C1C] focus-within:bg-[#EBEBEB] dark:focus-within:bg-[#1C1C1C] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 shrink-0 border border-[#DDDDDD] dark:border-[#333333] rounded overflow-hidden">
                          <ProductImage src={p.images?.[0]} alt={p.name} aspectRatio="aspect-[4/5]" />
                        </div>
                        <div className="truncate max-w-[200px]">
                          <span className="font-bold text-[#000000] dark:text-[#FFFFFF] block truncate">{p.name}</span>
                          <span className="text-[10px] text-[#444444] dark:text-[#CCCCCC]">{p.subcategory || 'Signature'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#444444] dark:text-[#CCCCCC]">{p.sku}</td>
                    <td className="py-3 px-4 text-[#000000] dark:text-[#FFFFFF]">{p.category}</td>
                    <td className="py-3 px-4 font-bold text-[#000000] dark:text-[#FFFFFF]">{formatCurrency(p.price)}</td>
                    <td className="py-3 px-4">
                      {isOut ? (
                        <Badge status="out_of_stock" size="sm" />
                      ) : isLow ? (
                        <Badge status="low_stock" size="sm">
                          {p.stock} left
                        </Badge>
                      ) : (
                        <span className="font-bold text-[#000000] dark:text-[#FFFFFF]">{p.stock} units</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[#444444] dark:text-[#CCCCCC]">★ {p.rating.toFixed(1)}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(p)}
                          aria-label={`Edit ${p.name}`}
                          className="p-1.5 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] rounded transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(p.id)}
                          aria-label={`Delete ${p.name}`}
                          className="p-1.5 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="p-4 border-t border-[#DDDDDD] dark:border-[#333333]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProducts.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Modal: Create or Edit Product */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingProduct ? `Edit Artifact: ${editingProduct.sku}` : 'Catalog New Artifact'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSaveProduct} className="space-y-4">
          <Input
            label="Artifact Title"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formErrors.name}
            placeholder="e.g. Architectural Wool Trench Coat"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="SKU Identifier"
              required
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              error={formErrors.sku}
            />

            <Select
              label="Primary Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={categories.map((c) => ({ label: c.name, value: c.name }))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Price ($ USD)"
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              error={formErrors.price}
              placeholder="120"
            />
            <Input
              label="Original Price ($ USD)"
              type="number"
              step="0.01"
              value={formData.originalPrice}
              onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              placeholder="140"
            />
            <Input
              label="Units in Stock"
              type="number"
              required
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              error={formErrors.stock}
              placeholder="25"
            />
          </div>

          <Input
            label="Hero Image URL (Unsplash)"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://images.unsplash.com/photo-..."
          />

          <Textarea
            label="Product Narrative & Description"
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            error={formErrors.description}
            placeholder="Material composition, drape, and engineering details..."
          />

          <Textarea
            label="Features (One per line)"
            rows={3}
            value={formData.featuresString}
            onChange={(e) => setFormData({ ...formData, featuresString: e.target.value })}
            placeholder="100% Virgin Wool&#10;Cupro interior lining&#10;Corozo buttons"
          />

          <div className="pt-4 border-t border-[#DDDDDD] dark:border-[#333333] flex justify-end gap-3">
            <Button variant="outline" size="md" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              {editingProduct ? 'Save Modifications' : 'Catalog Artifact'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Artifact"
        message="Are you sure you wish to permanently delete this product from the catalog registry? All inventory records will be eradicated."
        confirmLabel="Eradicate Product"
        isDestructive={true}
      />
    </div>
  );
}
