import React, { useState, useMemo } from 'react';
import {
  Star,
  Search,
  Filter,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Flag,
  User,
  MapPin,
  Calendar,
  X,
  MessageSquare,
  ThumbsUp,
  ShieldCheck,
  Package
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Drawer } from '../../components/ui/Drawer';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';

export function AdminReviewsPage() {
  const { reviews, addReview, deleteReview, toggleReviewStatus, products } = useData();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal / Drawer state for adding a review
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    location: '',
    productName: '',
    productSku: '',
    rating: 5,
    title: '',
    comment: '',
    status: 'approved',
    verifiedPurchase: true
  });

  const [formErrors, setFormErrors] = useState({});

  // Summary Metrics
  const stats = useMemo(() => {
    const total = reviews.length;
    const approved = reviews.filter((r) => r.status === 'approved').length;
    const pending = reviews.filter((r) => r.status === 'pending').length;
    const flagged = reviews.filter((r) => r.status === 'flagged').length;
    const avg = total > 0
      ? (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / total).toFixed(1)
      : '5.0';
    return { total, approved, pending, flagged, avg };
  }, [reviews]);

  // Filtered Reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((rev) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        rev.customerName?.toLowerCase().includes(q) ||
        rev.productName?.toLowerCase().includes(q) ||
        rev.comment?.toLowerCase().includes(q) ||
        rev.title?.toLowerCase().includes(q);

      const matchesRating =
        ratingFilter === 'all' || String(rev.rating) === String(ratingFilter);

      const matchesStatus =
        statusFilter === 'all' || rev.status === statusFilter;

      return matchesQuery && matchesRating && matchesStatus;
    });
  }, [reviews, searchQuery, ratingFilter, statusFilter]);

  // Open drawer for creating new review
  const handleOpenCreate = () => {
    setFormData({
      customerName: '',
      customerEmail: '',
      location: '',
      productName: products[0]?.name || 'Minimalist Heavyweight Tee',
      productSku: products[0]?.sku || 'SKU-1001',
      rating: 5,
      title: '',
      comment: '',
      status: 'approved',
      verifiedPurchase: true
    });
    setFormErrors({});
    setIsDrawerOpen(true);
  };

  // Handle Save
  const handleSaveReview = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.customerName.trim()) errs.customerName = 'Customer name is required';
    if (!formData.comment.trim()) errs.comment = 'Review commentary is required';

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    addReview(formData);
    toast.success('Review Published', 'New customer testimonial added successfully.');
    setIsDrawerOpen(false);
  };

  // Handle Quick Status Change
  const handleStatusChange = (id, newStatus) => {
    toggleReviewStatus(id, newStatus);
    toast.success('Status Updated', `Review status transitioned to ${newStatus}.`);
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you wish to permanently delete this customer review?')) {
      deleteReview(id);
      toast.success('Review Deleted', 'Customer testimonial removed from database.');
    }
  };

  return (
    <div className="space-y-6 text-[#000000] dark:text-[#FFFFFF]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Customer Reviews
          </h1>
          <p className="text-xs sm:text-sm text-[#444444] dark:text-[#CCCCCC] mt-1 font-mono">
            Moderate, curate, and review patron testimonials and product ratings
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          variant="primary"
          icon={Plus}
          className="rounded-btn shrink-0"
        >
          Add Review
        </Button>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-4">
          <span className="text-[11px] font-mono uppercase text-[#444444] dark:text-[#BDBDBD] block">
            Total Reviews
          </span>
          <span className="text-2xl sm:text-3xl font-bold tracking-tight block mt-1">
            {stats.total}
          </span>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-4">
          <span className="text-[11px] font-mono uppercase text-[#444444] dark:text-[#BDBDBD] block">
            Average Rating
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight">
              {stats.avg}
            </span>
            <Star className="w-5 h-5 fill-current text-[#000000] dark:text-[#FFFFFF]" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-4">
          <span className="text-[11px] font-mono uppercase text-[#444444] dark:text-[#BDBDBD] block">
            Approved
          </span>
          <span className="text-2xl sm:text-3xl font-bold tracking-tight block mt-1">
            {stats.approved}
          </span>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-4">
          <span className="text-[11px] font-mono uppercase text-[#444444] dark:text-[#BDBDBD] block">
            Pending Moderation
          </span>
          <span className={`text-2xl sm:text-3xl font-bold tracking-tight block mt-1 ${stats.pending > 0 ? 'text-[#000000] dark:text-[#FFFFFF] underline decoration-dashed' : ''}`}>
            {stats.pending}
          </span>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-4">
          <span className="text-[11px] font-mono uppercase text-[#444444] dark:text-[#BDBDBD] block">
            Flagged
          </span>
          <span className="text-2xl sm:text-3xl font-bold tracking-tight block mt-1">
            {stats.flagged}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar with Screenshot-2 Right Search Icon Design */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input with dedicated right icon */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-4 pr-12 rounded-xl bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] text-sm text-[#000000] dark:text-[#FFFFFF] placeholder-[#888888] focus:outline-none focus:border-black dark:focus:border-white transition-colors"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#F5F5F5] dark:bg-[#161616] border border-[#DDDDDD] dark:border-[#333333] flex items-center justify-center text-[#666666] dark:text-[#CCCCCC] pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="h-10 px-3 text-xs font-mono rounded-xl border border-[#DDDDDD] dark:border-[#333333] bg-white dark:bg-[#0A0A0A] text-[#000000] dark:text-[#FFFFFF] focus:outline-none"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 text-xs font-mono rounded-xl border border-[#DDDDDD] dark:border-[#333333] bg-white dark:bg-[#0A0A0A] text-[#000000] dark:text-[#FFFFFF] focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="flagged">Flagged</option>
          </select>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="border border-[#DDDDDD] dark:border-[#333333] rounded-card bg-white dark:bg-[#111111] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#DDDDDD] dark:border-[#333333] bg-[#F5F5F5] dark:bg-[#0A0A0A] text-[11px] font-mono uppercase tracking-wider text-[#444444] dark:text-[#BDBDBD]">
                <th className="py-3.5 px-4 font-semibold">Customer</th>
                <th className="py-3.5 px-4 font-semibold">Product</th>
                <th className="py-3.5 px-4 font-semibold">Rating</th>
                <th className="py-3.5 px-4 font-semibold">Review Commentary</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDDDDD] dark:divide-[#333333]">
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-[#444444] dark:text-[#CCCCCC]">
                    No customer reviews match your active filter criteria.
                  </td>
                </tr>
              ) : (
                filteredReviews.map((rev) => (
                  <tr
                    key={rev.id}
                    className="hover:bg-[#EBEBEB] dark:hover:bg-[#1C1C1C] focus-within:bg-[#EBEBEB] dark:focus-within:bg-[#1C1C1C] transition-colors"
                  >
                    {/* Customer */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="flex items-center gap-2.5">
                        {rev.avatar ? (
                          <img
                            src={rev.avatar}
                            alt={rev.customerName}
                            className="w-8 h-8 rounded-full object-cover border border-[#DDDDDD] dark:border-[#333333]"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#EEEEEE] dark:bg-[#222222] border border-[#DDDDDD] dark:border-[#333333] flex items-center justify-center font-bold text-xs">
                            {rev.customerName?.charAt(0) || 'U'}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-[#000000] dark:text-[#FFFFFF] flex items-center gap-1.5">
                            <span>{rev.customerName}</span>
                            {rev.verifiedPurchase && (
                              <span title="Verified Patron" className="text-[10px] text-[#444444] dark:text-[#CCCCCC]">
                                <ShieldCheck className="w-3.5 h-3.5 inline" />
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#444444] dark:text-[#BDBDBD] font-mono block">
                            {rev.location || rev.customerEmail}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Product */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-medium text-[#000000] dark:text-[#FFFFFF] max-w-[160px] truncate">
                        {rev.productName || 'General Store Review'}
                      </div>
                      {rev.productSku && (
                        <span className="text-[10px] font-mono text-[#444444] dark:text-[#BDBDBD] block">
                          {rev.productSku}
                        </span>
                      )}
                    </td>

                    {/* Star Rating */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap">
                      <div className="flex items-center gap-0.5 text-[#000000] dark:text-[#FFFFFF]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'fill-current text-current'
                                : 'text-[#DDDDDD] dark:text-[#333333]'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-[#444444] dark:text-[#BDBDBD] block mt-0.5">
                        {rev.rating}.0 / 5.0
                      </span>
                    </td>

                    {/* Review Commentary */}
                    <td className="py-3.5 px-4 align-top max-w-sm">
                      {rev.title && (
                        <div className="font-semibold text-xs text-[#000000] dark:text-[#FFFFFF] mb-1">
                          "{rev.title}"
                        </div>
                      )}
                      <p className="text-xs text-[#444444] dark:text-[#CCCCCC] leading-relaxed line-clamp-2">
                        {rev.comment}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap text-xs font-mono text-[#444444] dark:text-[#BDBDBD]">
                      {rev.date}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${
                          rev.status === 'approved'
                            ? 'bg-[#F5F5F5] dark:bg-[#161616] border-[#000000] dark:border-[#FFFFFF] text-[#000000] dark:text-[#FFFFFF]'
                            : rev.status === 'pending'
                            ? 'bg-transparent border-[#888888] text-[#888888]'
                            : 'bg-black text-white dark:bg-white dark:text-black border-transparent'
                        }`}
                      >
                        {rev.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {rev.status !== 'approved' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(rev.id, 'approved')}
                            title="Approve Review"
                            className="p-1.5 rounded-lg border border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white text-[#000000] dark:text-[#FFFFFF] transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {rev.status !== 'flagged' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(rev.id, 'flagged')}
                            title="Flag Review"
                            className="p-1.5 rounded-lg border border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white text-[#000000] dark:text-[#FFFFFF] transition-colors"
                          >
                            <Flag className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDelete(rev.id)}
                          title="Delete Review"
                          className="p-1.5 rounded-lg border border-[#DDDDDD] dark:border-[#333333] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Drawer for Add Review */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Add Customer Review"
        size="md"
      >
        <form onSubmit={handleSaveReview} className="space-y-4">
          <Input
            label="Customer Name"
            placeholder="e.g. Marcus Vance"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            error={formErrors.customerName}
            required
          />

          <Input
            label="Customer Email"
            type="email"
            placeholder="patron@domain.com"
            value={formData.customerEmail}
            onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
          />

          <Input
            label="Location"
            placeholder="e.g. London, UK"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          <Select
            label="Associated Product"
            value={formData.productName}
            onChange={(e) => {
              const selected = products.find((p) => p.name === e.target.value);
              setFormData({
                ...formData,
                productName: e.target.value,
                productSku: selected?.sku || ''
              });
            }}
            options={[
              { value: '', label: 'General Store Testimonial' },
              ...products.map((p) => ({ value: p.name, label: `${p.name} (${p.sku})` }))
            ]}
          />

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#444444] dark:text-[#CCCCCC] mb-1.5">
              Star Rating (1 to 5)
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className={`p-2 rounded-lg border border-[#DDDDDD] dark:border-[#333333] transition-colors flex items-center gap-1 ${
                    formData.rating >= star
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-white dark:bg-[#111111] text-[#444444] dark:text-[#CCCCCC]'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-mono font-bold">{star}</span>
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Review Headline / Quote"
            placeholder="e.g. Pure tactile perfection"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <Textarea
            label="Review Commentary"
            rows={4}
            placeholder="Write customer review observations..."
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            error={formErrors.comment}
            required
          />

          <Select
            label="Moderation Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={[
              { value: 'approved', label: 'Approved (Visible on Storefront)' },
              { value: 'pending', label: 'Pending Moderation' },
              { value: 'flagged', label: 'Flagged / Hidden' }
            ]}
          />

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="verifiedPurchase"
              checked={formData.verifiedPurchase}
              onChange={(e) => setFormData({ ...formData, verifiedPurchase: e.target.checked })}
              className="w-4 h-4 rounded border-[#DDDDDD] dark:border-[#333333] accent-black dark:accent-white"
            />
            <label htmlFor="verifiedPurchase" className="text-xs font-medium text-[#000000] dark:text-[#FFFFFF] cursor-pointer">
              Mark as Verified Patron Purchase
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
              Publish Review
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
export default AdminReviewsPage;
