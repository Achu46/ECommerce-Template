import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Grid, Layers, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { ProductImage } from '../../components/ui/ProductImage';

export function AdminCategoriesPage() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useData();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    subcategoriesString: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      subcategoriesString: 'Standard\nSignature\nModular'
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug || '',
      description: cat.description || '',
      image: cat.image || '',
      subcategoriesString: cat.subcategories?.join('\n') || ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormErrors({ name: 'Category name is required' });
      return;
    }

    const payload = {
      name: formData.name.trim(),
      slug: formData.slug.trim() || formData.name.toLowerCase().replace(/\s+/g, '-'),
      description: formData.description.trim(),
      image: formData.image.trim(),
      subcategories: formData.subcategoriesString
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
    };

    if (editingCategory) {
      updateCategory(editingCategory.id, payload);
      toast.success('Category Updated', `${payload.name} modified.`);
    } else {
      addCategory(payload);
      toast.success('Category Created', `${payload.name} added.`);
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      deleteCategory(deleteConfirmId);
      toast.info('Category Removed', 'Category was deleted.');
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DDDDDD] dark:border-[#333333]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#444444] dark:text-[#CCCCCC] block mb-1">
            Classification Hierarchy
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF]">
            Catalog Categories ({categories.length})
          </h1>
        </div>

        <Button variant="primary" size="md" onClick={handleOpenCreate} icon={Plus}>
          Add Category
        </Button>
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const associatedProducts = products.filter((p) => p.category === cat.name);

          return (
            <div
              key={cat.id}
              className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card overflow-hidden shadow-subtle flex flex-col justify-between hover:border-[#000000] dark:hover:border-[#FFFFFF] transition-all"
            >
              <div>
                <div className="h-40 bg-[#EBEBEB] dark:bg-[#0A0A0A] overflow-hidden relative border-b border-[#DDDDDD] dark:border-[#333333]">
                  <ProductImage
                    src={cat.image}
                    alt={cat.name}
                    aspectRatio="aspect-auto"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute top-3 right-3 bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                    {associatedProducts.length} Artifacts
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-black uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF] mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#444444] dark:text-[#CCCCCC] leading-relaxed mb-4 line-clamp-2">
                    {cat.description || 'No description provided.'}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-[#DDDDDD] dark:border-[#333333]">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#444444] dark:text-[#CCCCCC] block">
                      Subcategories:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cat.subcategories?.map((sub, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] rounded text-[11px] font-mono text-[#000000] dark:text-[#FFFFFF]"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-[#EBEBEB] dark:bg-[#0A0A0A] border-t border-[#DDDDDD] dark:border-[#333333] flex items-center justify-between text-xs font-mono">
                <span className="text-[#444444] dark:text-[#CCCCCC]">Slug: /{cat.slug || cat.id}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(cat)}
                    aria-label={`Edit ${cat.name}`}
                    className="p-1.5 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] rounded"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(cat.id)}
                    aria-label={`Delete ${cat.name}`}
                    className="p-1.5 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add or Edit Category */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? `Edit Category: ${editingCategory.name}` : 'Create Category Classification'}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSaveCategory} className="space-y-4">
          <Input
            label="Category Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formErrors.name}
            placeholder="e.g. Leathercraft"
          />

          <Input
            label="Slug (Optional)"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="e.g. leathercraft"
          />

          <Input
            label="Cover Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://images.unsplash.com/photo-..."
          />

          <Textarea
            label="Description"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Overview of this product classification..."
          />

          <Textarea
            label="Subcategories (One per line)"
            rows={3}
            value={formData.subcategoriesString}
            onChange={(e) => setFormData({ ...formData, subcategoriesString: e.target.value })}
            placeholder="Wallets&#10;Belts&#10;Keyrings"
          />

          <div className="pt-4 border-t border-[#DDDDDD] dark:border-[#333333] flex justify-end gap-3">
            <Button variant="outline" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              {editingCategory ? 'Save Modifications' : 'Create Category'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message="Are you certain you wish to delete this category classification? Any assigned artifacts will remain in the catalog."
        confirmLabel="Delete Category"
        isDestructive={true}
      />
    </div>
  );
}
