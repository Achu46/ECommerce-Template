import React, { useState } from 'react';
import { Ticket, Plus, Edit2, Trash2, Tag, Check, X, AlertTriangle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { isPositiveNumber } from '../../utils/validators';

export function AdminCouponsPage() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useData();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage', // 'percentage' | 'fixed' | 'shipping'
    value: '10',
    minSpend: '50',
    maxDiscount: '100',
    expiryDate: '2026-12-31',
    description: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleOpenCreate = () => {
    setEditingCoupon(null);
    setFormData({
      code: '',
      type: 'percentage',
      value: '15',
      minSpend: '75',
      maxDiscount: '100',
      expiryDate: '2026-12-31',
      description: 'Exclusive seasonal patron concession'
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingCoupon(c);
    setFormData({
      code: c.code,
      type: c.type,
      value: c.value.toString(),
      minSpend: c.minSpend.toString(),
      maxDiscount: c.maxDiscount ? c.maxDiscount.toString() : '',
      expiryDate: c.expiryDate,
      description: c.description || ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleToggleStatus = (coupon) => {
    const nextStatus = coupon.status === 'active' ? 'expired' : 'active';
    updateCoupon(coupon.id, { status: nextStatus });
    toast.info('Status Updated', `Coupon ${coupon.code} marked as ${nextStatus}.`);
  };

  const handleSaveCoupon = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.code.trim()) errs.code = 'Coupon code is required';
    if (!isPositiveNumber(formData.value)) errs.value = 'Discount value must be positive';
    if (!isPositiveNumber(formData.minSpend)) errs.minSpend = 'Minimum spend must be positive';

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    const payload = {
      code: formData.code.trim().toUpperCase(),
      type: formData.type,
      value: parseFloat(formData.value),
      minSpend: parseFloat(formData.minSpend),
      maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : 100,
      expiryDate: formData.expiryDate,
      description: formData.description.trim()
    };

    if (editingCoupon) {
      updateCoupon(editingCoupon.id, payload);
      toast.success('Coupon Updated', `Code ${payload.code} updated.`);
    } else {
      addCoupon(payload);
      toast.success('Coupon Created', `Code ${payload.code} activated.`);
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      deleteCoupon(deleteConfirmId);
      toast.info('Coupon Erased', 'Coupon was deleted from database.');
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DDDDDD] dark:border-[#333333]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#444444] dark:text-[#CCCCCC] block mb-1">
            Concessions & Incentives
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF]">
            Promotion Codes ({coupons.length})
          </h1>
        </div>

        <Button variant="primary" size="md" onClick={handleOpenCreate} icon={Plus}>
          Issue Coupon Code
        </Button>
      </div>

      {/* Coupons Table */}
      <div className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#EBEBEB] dark:bg-[#0A0A0A] border-b border-[#DDDDDD] dark:border-[#333333] text-[#444444] dark:text-[#CCCCCC] uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Type & Concession</th>
                <th className="py-3 px-4">Minimum Spend</th>
                <th className="py-3 px-4">Usage Recorded</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDDDDD] dark:divide-[#333333]">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-[#EBEBEB] dark:hover:bg-[#1C1C1C] focus-within:bg-[#EBEBEB] dark:focus-within:bg-[#1C1C1C] transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#000000] dark:text-[#FFFFFF] block">{c.code}</span>
                    <span className="text-[10px] text-[#444444] dark:text-[#CCCCCC]">{c.description}</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#000000] dark:text-[#FFFFFF]">
                    {c.type === 'percentage'
                      ? `${c.value}% Reduction`
                      : c.type === 'fixed'
                        ? `$${c.value} Deduction`
                        : 'Free Shipping'}
                  </td>
                  <td className="py-3 px-4 text-[#444444] dark:text-[#CCCCCC]">${c.minSpend}</td>
                  <td className="py-3 px-4 text-[#444444] dark:text-[#CCCCCC]">{c.usageCount || 0} redeems</td>
                  <td className="py-3 px-4 text-[#444444] dark:text-[#CCCCCC]">{c.expiryDate}</td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(c)}
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border transition-colors ${
                        c.status === 'active'
                          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                          : 'bg-[#DDDDDD] text-[#444444] border-[#DDDDDD] dark:bg-[#222222] dark:text-[#888888] dark:border-[#333333] line-through'
                      }`}
                    >
                      {c.status}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(c)}
                        className="p-1.5 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(c.id)}
                        className="p-1.5 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add or Edit Coupon */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCoupon ? `Edit Coupon: ${editingCoupon.code}` : 'Issue Promotion Code'}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSaveCoupon} className="space-y-4">
          <Input
            label="Coupon Code"
            required
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            error={formErrors.code}
            placeholder="e.g. SOLSTICE25"
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Concession Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              options={[
                { label: 'Percentage (%)', value: 'percentage' },
                { label: 'Fixed Amount ($)', value: 'fixed' },
                { label: 'Free Shipping', value: 'shipping' }
              ]}
            />

            <Input
              label="Value Amount"
              type="number"
              required
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              error={formErrors.value}
              placeholder="15"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Min Spend ($)"
              type="number"
              required
              value={formData.minSpend}
              onChange={(e) => setFormData({ ...formData, minSpend: e.target.value })}
              error={formErrors.minSpend}
              placeholder="50"
            />

            <Input
              label="Expiry Date"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            />
          </div>

          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="e.g. 15% discount for solstice members"
          />

          <div className="pt-4 border-t border-[#DDDDDD] dark:border-[#333333] flex justify-end gap-3">
            <Button variant="outline" size="md" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              {editingCoupon ? 'Save Modifications' : 'Issue Coupon'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Coupon"
        message="Are you certain you wish to delete this promotional coupon? Clients will no longer be able to redeem this code at checkout."
        confirmLabel="Eradicate Coupon"
        isDestructive={true}
      />
    </div>
  );
}
