import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { ProductImage } from '../../components/ui/ProductImage';

export function AdminBannersPage() {
  const { banners, addBanner, updateBanner, deleteBanner } = useData();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    ctaText: 'Explore Collection',
    ctaLink: '/products',
    badge: 'NEW DROP',
    image: '',
    placement: 'hero'
  });
  const [formErrors, setFormErrors] = useState({});

  const handleOpenCreate = () => {
    setEditingBanner(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      ctaText: 'Explore Collection',
      ctaLink: '/products',
      badge: 'ARCHIVE DROP',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&auto=format&fit=crop&q=80',
      placement: 'hero'
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b) => {
    setEditingBanner(b);
    setFormData({
      title: b.title,
      subtitle: b.subtitle || '',
      description: b.description || '',
      ctaText: b.ctaText || 'Explore',
      ctaLink: b.ctaLink || '/products',
      badge: b.badge || '',
      image: b.image || '',
      placement: b.placement || 'hero'
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleSaveBanner = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormErrors({ title: 'Banner title is required' });
      return;
    }

    const payload = {
      title: formData.title.trim().toUpperCase(),
      subtitle: formData.subtitle.trim(),
      description: formData.description.trim(),
      ctaText: formData.ctaText.trim(),
      ctaLink: formData.ctaLink.trim(),
      badge: formData.badge.trim(),
      image: formData.image.trim(),
      placement: formData.placement
    };

    if (editingBanner) {
      updateBanner(editingBanner.id, payload);
      toast.success('Banner Updated', `${payload.title} modified.`);
    } else {
      addBanner(payload);
      toast.success('Banner Published', `${payload.title} published.`);
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      deleteBanner(deleteConfirmId);
      toast.info('Banner Erased', 'Banner was removed from layout rotation.');
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DDDDDD] dark:border-[#333333]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#444444] dark:text-[#CCCCCC] block mb-1">
            Visual Merchandising
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF]">
            Editorial Banners ({banners.length})
          </h1>
        </div>

        <Button variant="primary" size="md" onClick={handleOpenCreate} icon={Plus}>
          New Editorial Banner
        </Button>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((b) => (
          <div
            key={b.id}
            className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card overflow-hidden shadow-subtle flex flex-col justify-between hover:border-[#000000] dark:hover:border-[#FFFFFF] transition-all"
          >
            <div>
              <div className="h-44 bg-black dark:bg-[#0A0A0A] overflow-hidden relative border-b border-[#DDDDDD] dark:border-[#333333]">
                <ProductImage
                  src={b.image}
                  alt={b.title}
                  aspectRatio="aspect-auto"
                  className="w-full h-full object-cover grayscale opacity-80"
                />
                <div className="absolute top-3 left-3 bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                  {b.placement}
                </div>
                {b.badge && (
                  <div className="absolute top-3 right-3 bg-white text-black dark:bg-[#0A0A0A] dark:text-white border border-[#DDDDDD] dark:border-[#333333] text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                    {b.badge}
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-base font-black uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF] mb-1">
                  {b.title}
                </h3>
                <h4 className="text-xs font-mono text-[#444444] dark:text-[#CCCCCC] mb-2">{b.subtitle}</h4>
                <p className="text-xs text-[#444444] dark:text-[#CCCCCC] leading-relaxed line-clamp-2">
                  {b.description}
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#EBEBEB] dark:bg-[#0A0A0A] border-t border-[#DDDDDD] dark:border-[#333333] flex items-center justify-between text-xs font-mono">
              <span className="text-[#444444] dark:text-[#CCCCCC]">CTA: {b.ctaText}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(b)}
                  aria-label={`Edit ${b.title}`}
                  className="p-1.5 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(b.id)}
                  aria-label={`Delete ${b.title}`}
                  className="p-1.5 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create/Edit Banner */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBanner ? `Edit Editorial: ${editingBanner.title}` : 'Draft Editorial Banner'}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSaveBanner} className="space-y-4">
          <Input
            label="Main Title Headline"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={formErrors.title}
            placeholder="e.g. THE FALL MONOCHROME DROP"
          />

          <Input
            label="Subtitle"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="e.g. Tailored Minimal Outerwear"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Badge Ribbon"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              placeholder="e.g. LIMITED EDITION"
            />
            <Select
              label="Placement Slot"
              value={formData.placement}
              onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
              options={[
                { label: 'Homepage Hero', value: 'hero' },
                { label: 'Mid-page Promo', value: 'promo' }
              ]}
            />
          </div>

          <Input
            label="Image Asset URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://images.unsplash.com/photo-..."
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Button Text"
              value={formData.ctaText}
              onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
            />
            <Input
              label="Destination Route"
              value={formData.ctaLink}
              onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
            />
          </div>

          <Textarea
            label="Narrative Description"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Explanatory copy for the promotional banner..."
          />

          <div className="pt-4 border-t border-[#DDDDDD] dark:border-[#333333] flex justify-end gap-3">
            <Button variant="outline" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              {editingBanner ? 'Save Changes' : 'Publish Banner'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleConfirmDelete}
        title="Remove Editorial Banner"
        message="Are you certain you wish to delete this editorial banner from the layout pipeline?"
        confirmLabel="Eradicate Banner"
        isDestructive={true}
      />
    </div>
  );
}
