import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tag,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit3,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  Power,
  ArrowRight,
  Layers,
  Percent
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Drawer } from '../../components/ui/Drawer';

export function AdminOffersPage() {
  const {
    offers,
    activeOffer,
    isOfferEnabled,
    toggleOfferEnabled,
    toggleOfferStatus,
    addOffer,
    updateOffer,
    deleteOffer,
    setActiveOffer
  } = useData();
  const toast = useToast();

  // Find currently active template or fallback to first
  const activeTemplate = useMemo(() => {
    return offers.find((o) => o.status === 'active') || offers[0] || {};
  }, [offers]);

  // Selected template for editing or viewing
  const [selectedId, setSelectedId] = useState(() => activeTemplate.id || 'offer-mono40');

  const currentOffer = useMemo(() => {
    return offers.find((o) => o.id === selectedId) || activeTemplate;
  }, [offers, selectedId, activeTemplate]);

  // Live countdown state for the preview simulation
  const [previewTimer, setPreviewTimer] = useState({
    days: currentOffer.days ?? 1,
    hours: currentOffer.hours ?? 22,
    minutes: currentOffer.minutes ?? 44,
    seconds: currentOffer.seconds ?? 57
  });

  // Drawer state for creating or editing template
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    code: '',
    discount: '',
    status: 'active',
    ctaText: 'Shop Selected Offers',
    ctaLink: '/offers',
    days: 1,
    hours: 22,
    minutes: 44,
    seconds: 57,
    autoReset: true,
    bannerBadge: 'FLASH SALE'
  });

  const [formErrors, setFormErrors] = useState({});

  // Sync preview timer whenever current offer selection changes
  useEffect(() => {
    if (currentOffer) {
      setPreviewTimer({
        days: currentOffer.days ?? 1,
        hours: currentOffer.hours ?? 22,
        minutes: currentOffer.minutes ?? 44,
        seconds: currentOffer.seconds ?? 57
      });
    }
  }, [currentOffer]);

  // Live ticking simulation for the preview card
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewTimer((prev) => {
        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;
        let d = prev.days;

        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) {
          h = 23;
          d -= 1;
        }
        if (d < 0) {
          // Auto-reset to template values
          return {
            days: currentOffer.days ?? 1,
            hours: currentOffer.hours ?? 22,
            minutes: currentOffer.minutes ?? 44,
            seconds: currentOffer.seconds ?? 57
          };
        }
        return { days: d, hours: h, minutes: m, seconds: s };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentOffer]);

  // Open drawer to create new offer template
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: 'Mid-Season Design Concession',
      subtitle: 'Exclusive Flash Concession',
      description: 'Architectural silhouettes and precision timepieces at special celebratory patron rates.',
      code: 'FLASH30',
      discount: '30% OFF',
      status: 'scheduled',
      ctaText: 'Explore Collection',
      ctaLink: '/products',
      days: 2,
      hours: 12,
      minutes: 30,
      seconds: 0,
      autoReset: true,
      bannerBadge: 'LIMITED RUN'
    });
    setFormErrors({});
    setIsDrawerOpen(true);
  };

  // Open drawer to edit template
  const handleOpenEdit = (template) => {
    setEditingId(template.id);
    setFormData({
      title: template.title || '',
      subtitle: template.subtitle || '',
      description: template.description || '',
      code: template.code || '',
      discount: template.discount || '',
      status: template.status || 'scheduled',
      ctaText: template.ctaText || 'Shop Selected Offers',
      ctaLink: template.ctaLink || '/offers',
      days: template.days ?? 1,
      hours: template.hours ?? 22,
      minutes: template.minutes ?? 44,
      seconds: template.seconds ?? 57,
      autoReset: template.autoReset ?? true,
      bannerBadge: template.bannerBadge || 'FLASH SALE'
    });
    setFormErrors({});
    setIsDrawerOpen(true);
  };

  // Handle Save
  const handleSave = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Offer title is required';
    if (!formData.code.trim()) errs.code = 'Coupon code is required';

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    if (editingId) {
      updateOffer(editingId, formData);
      toast.success('Offer Template Saved', 'Campaign parameters have been updated.');
    } else {
      const created = addOffer(formData);
      setSelectedId(created.id);
      toast.success('Template Created', 'New promotional offer campaign registered.');
    }

    setIsDrawerOpen(false);
  };

  // Activate Offer for live Storefront
  const handleActivate = (id) => {
    setActiveOffer(id);
    setSelectedId(id);
    toast.success('Campaign Activated', 'Storefront live countdown banner has been synchronized.');
  };

  // Toggle Master Offer Banner Visibility
  const handleToggleOfferEnabled = () => {
    const next = !isOfferEnabled;
    toggleOfferEnabled(next);
    if (next) {
      toast.success('Offer Module Enabled', 'The promotional countdown banner is now LIVE and visible on the storefront.');
    } else {
      toast.info('Offer Module Disabled', 'The promotional countdown banner is now HIDDEN from the storefront.');
    }
  };

  // Toggle Single Template Status (Active <-> Disabled)
  const handleToggleTemplateStatus = (id) => {
    toggleOfferStatus(id);
    const target = offers.find((o) => o.id === id);
    const willBeDisabled = target?.status === 'active';
    if (willBeDisabled) {
      toast.info('Template Disabled', `"${target?.title || 'Offer'}" is now disabled and hidden.`);
    } else {
      toast.success('Template Enabled', `"${target?.title || 'Offer'}" is now enabled.`);
    }
  };

  // Delete Offer
  const handleDelete = (id) => {
    if (offers.length <= 1) {
      toast.error('Cannot Delete', 'At least one offer campaign template must remain.');
      return;
    }
    if (window.confirm('Are you sure you wish to delete this offer template?')) {
      deleteOffer(id);
      if (selectedId === id) {
        setSelectedId(offers.find((o) => o.id !== id)?.id || '');
      }
      toast.success('Template Removed', 'Promotional template has been deleted.');
    }
  };

  return (
    <div className="space-y-8 text-[#000000] dark:text-[#FFFFFF]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Offer Details Template Module
          </h1>
          <p className="text-xs sm:text-sm text-[#444444] dark:text-[#CCCCCC] mt-1 font-mono">
            Configure live countdown timers, promo vouchers, and promotional flash campaigns
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          variant="primary"
          icon={Plus}
          className="rounded-btn shrink-0"
        >
          New Offer Template
        </Button>
      </div>

      {/* MASTER STOREFRONT ENABLE / DISABLE CONTROL BAR */}
      <div className="border border-[#DDDDDD] dark:border-[#333333] rounded-card bg-[#F5F5F5] dark:bg-[#111111] p-5 sm:p-6 transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span
                className={`w-3 h-3 rounded-full shrink-0 ${
                  isOfferEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-[#888888]'
                }`}
              />
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF]">
                Storefront Promotional Offer Banner
              </h2>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                  isOfferEnabled
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : 'bg-[#888888]/15 text-[#888888] dark:text-[#AAAAAA] border-[#888888]/30'
                }`}
              >
                {isOfferEnabled ? '● ENABLED / VISIBLE' : '○ DISABLED / HIDDEN'}
              </span>
            </div>
            <p className="text-xs text-[#555555] dark:text-[#CCCCCC] leading-relaxed pl-5.5">
              {isOfferEnabled
                ? 'The promotional countdown banner is currently active and rendering live on the storefront homepage.'
                : 'The promotional banner module is deactivated and completely hidden from visitors on the storefront homepage.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 pl-5.5 md:pl-0">
            <button
              type="button"
              onClick={handleToggleOfferEnabled}
              className={`px-4 py-2.5 rounded-btn text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-subtle ${
                isOfferEnabled
                  ? 'bg-black text-white hover:bg-[#222222] dark:bg-white dark:text-black dark:hover:bg-[#E5E5E5]'
                  : 'bg-white text-black dark:bg-[#1C1C1C] dark:text-white border border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{isOfferEnabled ? 'Disable Offer Banner' : 'Enable Offer Banner'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: LIVE INTERACTIVE PREVIEW */}
      <div className="border border-[#DDDDDD] dark:border-[#333333] rounded-card bg-white dark:bg-[#111111] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#DDDDDD] dark:border-[#333333]">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isOfferEnabled && currentOffer.status === 'active'
                  ? 'bg-emerald-500 animate-pulse'
                  : 'bg-[#888888]'
              }`}
            />
            <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#000000] dark:text-[#FFFFFF]">
              Live Storefront Template Preview
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#DDDDDD] dark:border-[#333333] bg-[#F5F5F5] dark:bg-[#161616]">
              {currentOffer.code} ({currentOffer.status?.toUpperCase()})
            </span>
            {!isOfferEnabled && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                STOREFRONT HIDDEN
              </span>
            )}
          </div>
        </div>

        {/* The Exact Preview Canvas */}
        <div className="rounded-2xl p-6 sm:p-10 transition-colors border bg-[#F9F9F9] dark:bg-[#000000] border-[#E0E0E0] dark:border-[#222222] text-[#000000] dark:text-[#FFFFFF]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative info */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border border-current opacity-80">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentOffer.subtitle || 'Limited Time Offer'}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-bold tracking-tight uppercase">
                {currentOffer.title || 'Season Finale Reductions'}
              </h3>

              <p className="text-xs sm:text-sm leading-relaxed text-[#555555] dark:text-[#BDBDBD]">
                {currentOffer.description ||
                  'Enjoy up to 40% off selected outerwear, timepieces, and travel gear. Crafted in small batches with complimentary gift packaging on every order.'}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  className="px-6 py-3 rounded-lg text-xs font-mono uppercase tracking-wider font-bold inline-flex items-center gap-2 transition-transform hover:scale-105 bg-black text-white hover:bg-[#222222] dark:bg-white dark:text-black dark:hover:bg-[#E5E5E5]"
                >
                  <span>{currentOffer.ctaText || 'Shop Selected Offers'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: EXACT COUNTDOWN TIMER */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center">
              <span className="text-xs uppercase tracking-wider font-semibold mb-3 block text-[#555555] dark:text-[#CCCCCC]">
                OFFER ENDS IN:
              </span>

              {/* 4 Countdown Boxes */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center w-full max-w-md">
                {[
                  { label: 'DAYS', value: String(previewTimer.days).padStart(2, '0') },
                  { label: 'HOURS', value: String(previewTimer.hours).padStart(2, '0') },
                  { label: 'MINUTES', value: String(previewTimer.minutes).padStart(2, '0') },
                  { label: 'SECONDS', value: String(previewTimer.seconds).padStart(2, '0') }
                ].map((unit, uIdx) => (
                  <div
                    key={uIdx}
                    className="rounded-xl p-3 sm:p-4 border flex flex-col justify-between shadow-subtle bg-white dark:bg-[#0A0A0A] border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF]"
                  >
                    <div className="overflow-hidden h-10 sm:h-12 flex items-center justify-center">
                      <span className="text-2xl sm:text-4xl font-extrabold tracking-tight tabular-nums">
                        {unit.value}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider mt-1 block uppercase text-[#666666] dark:text-[#BDBDBD]">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tag and Promo Code Banner */}
              <div className="mt-4 text-xs flex items-center gap-2 text-[#444444] dark:text-[#CCCCCC]">
                <Tag className="w-3.5 h-3.5 text-current" />
                <span>
                  Use code{' '}
                  <strong className="font-bold text-[#000000] dark:text-[#FFFFFF]">
                    {currentOffer.code || 'MONO40'}
                  </strong>{' '}
                  for savings at checkout
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Quick action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#444444] dark:text-[#CCCCCC] flex-wrap">
            <span>Active Live Template:</span>
            <span className="font-bold text-[#000000] dark:text-[#FFFFFF]">
              {activeTemplate.title} ({activeTemplate.code})
            </span>
            <span
              className={`ml-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                isOfferEnabled && activeTemplate.status === 'active'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : 'bg-[#888888]/15 text-[#888888] border-[#888888]/30'
              }`}
            >
              {isOfferEnabled && activeTemplate.status === 'active' ? '● Live on Store' : '○ Hidden on Store'}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={isOfferEnabled ? 'outline' : 'primary'}
              onClick={handleToggleOfferEnabled}
              icon={isOfferEnabled ? EyeOff : Eye}
              className="rounded-btn text-xs font-mono"
            >
              {isOfferEnabled ? 'Disable on Storefront' : 'Enable on Storefront'}
            </Button>

            {currentOffer.status !== 'active' && (
              <Button
                variant="primary"
                onClick={() => handleActivate(currentOffer.id)}
                icon={CheckCircle2}
                className="rounded-btn text-xs font-mono"
              >
                Activate for Storefront
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => handleOpenEdit(currentOffer)}
              icon={Edit3}
              className="rounded-btn text-xs font-mono"
            >
              Edit Parameters
            </Button>
          </div>
        </div>
      </div>

      {/* SECTION 2: SAVED OFFER TEMPLATES GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight">
            Configured Offer Templates
          </h2>
          <span className="text-xs font-mono text-[#444444] dark:text-[#CCCCCC]">
            {offers.length} Templates Registered
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((item) => {
            const isSelected = item.id === selectedId;
            const isActive = item.status === 'active';

            return (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`cursor-pointer rounded-card p-5 border transition-all ${
                  isSelected
                    ? 'border-black dark:border-white shadow-card bg-[#F5F5F5] dark:bg-[#161616]'
                    : 'border-[#DDDDDD] dark:border-[#333333] bg-white dark:bg-[#111111] hover:border-black/50 dark:hover:border-white/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                      isActive
                        ? isOfferEnabled
                          ? 'bg-black text-white dark:bg-white dark:text-black border-transparent font-bold'
                          : 'bg-[#888888]/15 text-[#888888] dark:text-[#AAAAAA] border-[#888888]/30 font-bold'
                        : item.status === 'disabled'
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30 font-bold'
                        : 'bg-transparent border-[#888888] text-[#888888]'
                    }`}
                  >
                    {isActive
                      ? isOfferEnabled
                        ? '● Live Storefront'
                        : '○ Active (Store Hidden)'
                      : item.status === 'disabled'
                      ? '✕ Disabled'
                      : item.status}
                  </span>

                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded border border-[#DDDDDD] dark:border-[#333333] bg-white dark:bg-[#0A0A0A]">
                    {item.code}
                  </span>
                </div>

                <h3 className="font-bold text-base uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF] mb-1">
                  {item.title}
                </h3>

                <p className="text-xs text-[#444444] dark:text-[#BDBDBD] line-clamp-2 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Countdown snapshot */}
                <div className="grid grid-cols-4 gap-1.5 text-center py-2.5 px-3 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] mb-4">
                  <div>
                    <span className="text-sm font-bold block">{item.days ?? 0}</span>
                    <span className="text-[9px] font-mono uppercase text-[#888888]">Days</span>
                  </div>
                  <div>
                    <span className="text-sm font-bold block">{item.hours ?? 0}</span>
                    <span className="text-[9px] font-mono uppercase text-[#888888]">Hours</span>
                  </div>
                  <div>
                    <span className="text-sm font-bold block">{item.minutes ?? 0}</span>
                    <span className="text-[9px] font-mono uppercase text-[#888888]">Mins</span>
                  </div>
                  <div>
                    <span className="text-sm font-bold block">{item.seconds ?? 0}</span>
                    <span className="text-[9px] font-mono uppercase text-[#888888]">Secs</span>
                  </div>
                </div>

                {/* Card actions */}
                <div className="flex items-center justify-between pt-2 border-t border-[#DDDDDD] dark:border-[#333333] text-xs font-mono">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEdit(item);
                    }}
                    className="hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleTemplateStatus(item.id);
                    }}
                    className={`font-semibold hover:underline flex items-center gap-1 ${
                      item.status === 'disabled'
                        ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                        : 'text-[#888888] hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{item.status === 'disabled' ? 'Enable' : 'Disable'}</span>
                  </button>

                  {!isActive && item.status !== 'disabled' && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActivate(item.id);
                      }}
                      className="font-bold hover:underline text-[#000000] dark:text-[#FFFFFF]"
                    >
                      Make Live
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="text-[#888888] hover:text-black dark:hover:text-white"
                    title="Delete template"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide-out Drawer for Offer Template Editor */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingId ? 'Edit Offer Template' : 'Create Offer Template'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Campaign Headline"
            placeholder="e.g. Season Finale Reductions"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={formErrors.title}
            required
          />

          <Input
            label="Subtitle / Tagline"
            placeholder="e.g. Limited Time Offer"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          />

          <Textarea
            label="Narrative Description"
            rows={3}
            placeholder="e.g. Enjoy up to 40% off selected outerwear..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Promo Code"
              placeholder="e.g. MONO40"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              error={formErrors.code}
              required
            />

            <Input
              label="Discount Label"
              placeholder="e.g. 40% OFF"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            />
          </div>

          {/* Countdown Duration Inputs */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#444444] dark:text-[#CCCCCC] mb-1.5">
              Countdown Timer Duration
            </label>
            <div className="grid grid-cols-4 gap-2">
              <div>
                <label className="text-[10px] font-mono text-[#888888] block">Days</label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value, 10) || 0 })}
                  className="w-full h-9 px-2 rounded-lg border border-[#DDDDDD] dark:border-[#333333] bg-white dark:bg-[#0A0A0A] text-sm text-center font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-[#888888] block">Hours</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value, 10) || 0 })}
                  className="w-full h-9 px-2 rounded-lg border border-[#DDDDDD] dark:border-[#333333] bg-white dark:bg-[#0A0A0A] text-sm text-center font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-[#888888] block">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={formData.minutes}
                  onChange={(e) => setFormData({ ...formData, minutes: parseInt(e.target.value, 10) || 0 })}
                  className="w-full h-9 px-2 rounded-lg border border-[#DDDDDD] dark:border-[#333333] bg-white dark:bg-[#0A0A0A] text-sm text-center font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-[#888888] block">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={formData.seconds}
                  onChange={(e) => setFormData({ ...formData, seconds: parseInt(e.target.value, 10) || 0 })}
                  className="w-full h-9 px-2 rounded-lg border border-[#DDDDDD] dark:border-[#333333] bg-white dark:bg-[#0A0A0A] text-sm text-center font-bold"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Call to Action Text"
              placeholder="Shop Selected Offers"
              value={formData.ctaText}
              onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
            />

            <Input
              label="Destination Link"
              placeholder="/offers"
              value={formData.ctaLink}
              onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
            />
          </div>

          <Select
            label="Campaign Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={[
              { value: 'active', label: 'Active (Live on Storefront)' },
              { value: 'disabled', label: 'Disabled (Hidden from Storefront)' },
              { value: 'scheduled', label: 'Scheduled' },
              { value: 'ended', label: 'Ended / Archived' }
            ]}
          />

          {/* Quick Global Storefront Visibility Toggle inside Drawer */}
          <div className="p-3.5 rounded-lg border border-[#DDDDDD] dark:border-[#333333] bg-[#F5F5F5] dark:bg-[#161616] flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isOfferEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-[#888888]'}`} />
                <span className="text-xs font-bold uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF]">
                  Storefront Banner Visibility
                </span>
              </div>
              <p className="text-[11px] text-[#555555] dark:text-[#AAAAAA]">
                {isOfferEnabled ? 'Enabled — Banner displays on homepage' : 'Disabled — Banner hidden on homepage'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggleOfferEnabled}
              className={`px-3 py-1.5 rounded-btn text-[11px] font-mono font-bold uppercase tracking-wider shrink-0 transition-colors ${
                isOfferEnabled
                  ? 'bg-black text-white hover:bg-[#222222] dark:bg-white dark:text-black dark:hover:bg-[#E5E5E5]'
                  : 'bg-white text-black dark:bg-[#111111] dark:text-white border border-[#DDDDDD] dark:border-[#333333]'
              }`}
            >
              {isOfferEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="autoReset"
              checked={formData.autoReset}
              onChange={(e) => setFormData({ ...formData, autoReset: e.target.checked })}
              className="w-4 h-4 rounded border-[#DDDDDD] dark:border-[#333333] accent-black dark:accent-white"
            />
            <label htmlFor="autoReset" className="text-xs font-medium text-[#000000] dark:text-[#FFFFFF] cursor-pointer">
              Auto-restart countdown timer when countdown reaches zero
            </label>
          </div>

          <div className="pt-4 border-t border-[#DDDDDD] dark:border-[#333333] flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDrawerOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingId ? 'Update Template' : 'Save Template'}
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}

export default AdminOffersPage;
