import React, { useState, useMemo } from 'react';
import {
  Search,
  Eye,
  Filter,
  Package,
  Clock,
  RotateCcw,
  Truck,
  CheckCircle2,
  XCircle,
  MapPin,
  Calendar,
  CreditCard,
  X
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Pagination } from '../../components/ui/Pagination';
import { ProductImage } from '../../components/ui/ProductImage';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

const PAGE_SIZE = 10;

export function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useData();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter & Search
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customer?.name?.toLowerCase().includes(q) ||
        o.customer?.email?.toLowerCase().includes(q) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(q));

      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast.success('Status Updated', `Order #${orderId} marked as ${newStatus}.`);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E5E5]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] block mb-1">
            Fulfillment Pipeline
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0A0A0A]">
            Consignment Orders ({orders.length})
          </h1>
        </div>

        {/* Quick status count badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 bg-[#F5F5F5] rounded border border-[#E5E5E5]">
            Pending: <strong>{orders.filter((o) => o.status === 'pending').length}</strong>
          </span>
          <span className="px-2.5 py-1 bg-[#F5F5F5] rounded border border-[#E5E5E5]">
            Processing: <strong>{orders.filter((o) => o.status === 'processing').length}</strong>
          </span>
          <span className="px-2.5 py-1 bg-[#F5F5F5] rounded border border-[#E5E5E5]">
            Shipped: <strong>{orders.filter((o) => o.status === 'shipped').length}</strong>
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-[#E5E5E5] rounded-card p-4 shadow-subtle flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by Order ID, customer, tracking..."
            className="w-full min-h-[44px] pl-10 pr-4 py-2 text-xs border border-[#E5E5E5] rounded-input bg-white focus:border-[#0A0A0A]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="min-h-[44px] px-3 text-xs font-mono border border-[#E5E5E5] rounded-btn bg-white focus:border-[#0A0A0A]"
          >
            <option value="all">All Statuses ({orders.length})</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#E5E5E5] rounded-card shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#F5F5F5] border-b border-[#E5E5E5] text-[#737373] uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Patron</th>
                <th className="py-3 px-4">Date Placed</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {paginatedOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#0A0A0A]">{ord.id}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#0A0A0A] block">{ord.customer.name}</span>
                    <span className="text-[10px] text-[#737373]">{ord.customer.email}</span>
                  </td>
                  <td className="py-3 px-4 text-[#525252]">
                    {formatDateTime(ord.createdAt)}
                  </td>
                  <td className="py-3 px-4 text-[#525252]">
                    {ord.items?.reduce((s, i) => s + (i.quantity || 1), 0)} unit(s)
                  </td>
                  <td className="py-3 px-4 font-bold text-[#0A0A0A]">
                    {formatCurrency(ord.total)}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                      className="px-2 py-1 text-xs font-mono rounded border border-[#E5E5E5] bg-white text-[#0A0A0A] focus:border-[#0A0A0A]"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(ord)}
                      className="p-1.5 text-[#525252] hover:text-[#0A0A0A] hover:bg-[#F5F5F5] rounded transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[#E5E5E5]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredOrders.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Order Inspection Modal */}
      {selectedOrder && (
        <Modal
          isOpen={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
          title={`Consignment Docket: ${selectedOrder.id}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6 text-xs font-mono">
            {/* Status change header */}
            <div className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] rounded-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-[#737373] uppercase tracking-wider block mb-1">
                  Active Status
                </span>
                <Badge status={selectedOrder.status} size="md" />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#525252]">Update:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                  className="px-3 py-1.5 text-xs font-mono rounded-btn border border-[#0A0A0A] bg-white font-bold"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Destination & Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-[#E5E5E5] rounded-btn">
                <h4 className="font-bold uppercase text-[#0A0A0A] mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Patron & Address
                </h4>
                <p className="font-bold text-[#0A0A0A]">{selectedOrder.customer.name}</p>
                <p className="text-[#525252]">{selectedOrder.customer.email}</p>
                <p className="text-[#525252] mt-2 leading-relaxed">
                  {selectedOrder.shippingAddress?.street}<br />
                  {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.postalCode}<br />
                  {selectedOrder.shippingAddress?.country}
                </p>
              </div>

              <div className="p-4 border border-[#E5E5E5] rounded-btn">
                <h4 className="font-bold uppercase text-[#0A0A0A] mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Telemetry & Settlement
                </h4>
                <p className="text-[#525252]">Placed: {formatDateTime(selectedOrder.createdAt)}</p>
                <p className="text-[#525252] mt-1">Settlement: {selectedOrder.paymentMethod}</p>
                <p className="text-[#0A0A0A] font-bold mt-1">
                  Tracking: {selectedOrder.trackingNumber || 'Awaiting Allocation'}
                </p>
                {selectedOrder.notes && (
                  <p className="mt-2 text-[11px] text-[#737373] italic">
                    Note: "{selectedOrder.notes}"
                  </p>
                )}
              </div>
            </div>

            {/* Items Manifest */}
            <div>
              <h4 className="font-bold uppercase text-[#0A0A0A] mb-3 border-b border-[#E5E5E5] pb-2">
                Manifest Line Items ({selectedOrder.items?.length || 0})
              </h4>
              <div className="space-y-2.5 divide-y divide-[#F5F5F5]">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="pt-2.5 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-[#E5E5E5] rounded overflow-hidden shrink-0">
                        <ProductImage src={item.image} alt={item.name} aspectRatio="aspect-square" />
                      </div>
                      <div>
                        <span className="font-bold text-[#0A0A0A] block">{item.name}</span>
                        <span className="text-[11px] text-[#737373]">
                          {item.quantity} × {formatCurrency(item.price)}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-[#0A0A0A]">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Reconciliation */}
            <div className="border-t border-[#E5E5E5] pt-3 space-y-1 text-right text-xs">
              <div className="flex justify-between text-[#525252]">
                <span>Subtotal</span>
                <span>{formatCurrency(selectedOrder.subtotal)}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-[#0A0A0A]">
                  <span>Discount</span>
                  <span>-{formatCurrency(selectedOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#525252]">
                <span>Shipping</span>
                <span>{formatCurrency(selectedOrder.shipping)}</span>
              </div>
              <div className="flex justify-between text-[#525252]">
                <span>Tax</span>
                <span>{formatCurrency(selectedOrder.tax)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#0A0A0A] pt-2 border-t border-[#E5E5E5]">
                <span>Total Settled</span>
                <span>{formatCurrency(selectedOrder.total)}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
