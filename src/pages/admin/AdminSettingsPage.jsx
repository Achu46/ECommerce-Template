import React, { useState } from 'react';
import { Settings, RotateCcw, Save, ShieldAlert, CheckCircle2, HelpCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';

export function AdminSettingsPage() {
  const { settings, updateSettings, resetDemoData } = useData();
  const toast = useToast();

  const [formData, setFormData] = useState({
    storeName: settings.storeName || 'MONO™',
    tagline: settings.tagline || 'Minimal Monochrome E-Commerce Architecture',
    supportEmail: settings.supportEmail || 'concierge@mono-atelier.com',
    phone: settings.phone || '+1 (800) 555-0199',
    currency: settings.currency || 'USD',
    taxRate: (settings.taxRate * 100).toString() || '9',
    shippingStandard: settings.shippingStandard?.toString() || '15',
    freeShippingThreshold: settings.freeShippingThreshold?.toString() || '150'
  });

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings({
      storeName: formData.storeName.trim(),
      tagline: formData.tagline.trim(),
      supportEmail: formData.supportEmail.trim(),
      phone: formData.phone.trim(),
      currency: formData.currency.trim(),
      taxRate: parseFloat(formData.taxRate) / 100 || 0.09,
      shippingStandard: parseFloat(formData.shippingStandard) || 15,
      freeShippingThreshold: parseFloat(formData.freeShippingThreshold) || 150
    });
    toast.success('Settings Saved', 'Storefront system parameters have been persisted.');
  };

  const handleResetExecute = () => {
    resetDemoData();
    setIsResetConfirmOpen(false);
    toast.success('Seed Data Restored', 'All products, orders, customers, and coupons restored to initial seed state.');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="max-w-4xl space-y-8 pb-16">
      {/* Title */}
      <div className="pb-6 border-b border-[#E5E5E5]">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] block mb-1">
          System Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0A0A0A]">
          Operating Parameters & Settings
        </h1>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="bg-white border border-[#E5E5E5] rounded-card p-6 sm:p-8 shadow-subtle space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#0A0A0A] border-b border-[#E5E5E5] pb-3">
          Atelier Global Variables
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Brand Identity Name"
            required
            value={formData.storeName}
            onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
          />
          <Input
            label="Design Tagline"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Support Desk Email"
            type="email"
            required
            value={formData.supportEmail}
            onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
          />
          <Input
            label="Concierge Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <h2 className="text-sm font-bold uppercase tracking-wider text-[#0A0A0A] border-b border-[#E5E5E5] pb-3 pt-4">
          Financial & Shipping Rates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Sales Tax Rate (%)"
            type="number"
            step="0.1"
            required
            value={formData.taxRate}
            onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
            helperText="e.g. 9 for 9% rate"
          />
          <Input
            label="Standard Shipping ($ USD)"
            type="number"
            required
            value={formData.shippingStandard}
            onChange={(e) => setFormData({ ...formData, shippingStandard: e.target.value })}
          />
          <Input
            label="Free Shipping Spend Threshold ($)"
            type="number"
            required
            value={formData.freeShippingThreshold}
            onChange={(e) => setFormData({ ...formData, freeShippingThreshold: e.target.value })}
            helperText="Cart total to trigger free freight"
          />
        </div>

        <div className="pt-4 border-t border-[#E5E5E5] flex justify-end">
          <Button type="submit" variant="primary" size="md" icon={Save}>
            Save Configuration Changes
          </Button>
        </div>
      </form>

      {/* Dangerous Operations / Demo Data Reset */}
      <div className="bg-white border-2 border-[#0A0A0A] rounded-card p-6 sm:p-8 shadow-subtle space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#F5F5F5] border border-[#0A0A0A] rounded-btn shrink-0">
            <RotateCcw className="w-5 h-5 text-[#0A0A0A]" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0A0A0A]">
              Factory Reset Demo Telemetry
            </h3>
            <p className="text-xs text-[#525252] leading-relaxed mt-1 max-w-xl">
              Permanently purges all customized products, user-submitted checkout orders, modified categories, and test coupons from LocalStorage. Restores the pristine initial database (32+ products, 44+ orders, 22+ patrons, 5+ coupons).
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-[#E5E5E5] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#737373]">
            Target: LocalStorage keys (mono_products, mono_orders, mono_cart, etc.)
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsResetConfirmOpen(true)}
            icon={RotateCcw}
          >
            Reset Seed Data
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleResetExecute}
        title="Reset Entire Portfolio Demo State"
        message="This action will completely wipe all local modifications and restore factory seed values for all products, orders, categories, and clients. Are you sure you wish to proceed?"
        confirmLabel="Confirm Full Factory Reset"
        isDestructive={true}
      />
    </div>
  );
}
