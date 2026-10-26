import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Eye,
  Plus,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Package
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Pagination } from '../../components/ui/Pagination';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { isValidEmail } from '../../utils/validators';

const PAGE_SIZE = 10;

export function AdminCustomersPage() {
  const { customers, orders, toggleCustomerStatus, addCustomer } = useData();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States'
  });
  const [formErrors, setFormErrors] = useState({});

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.address?.city?.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [customers, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredCustomers.length / PAGE_SIZE) || 1;
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleToggle = (id, name, currentStatus) => {
    toggleCustomerStatus(id);
    toast.info(
      'Status Changed',
      `${name} marked as ${currentStatus === 'active' ? 'inactive' : 'active'}.`
    );
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Client name is required';
    if (!isValidEmail(formData.email)) errs.email = 'Valid email is required';

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    addCustomer({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: {
        street: formData.street.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        postalCode: formData.postalCode.trim(),
        country: formData.country.trim()
      }
    });

    toast.success('Patron Registered', `${formData.name} added to client database.`);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States'
    });
  };

  // Inspect orders for selected customer
  const customerOrders = selectedCustomer
    ? orders.filter(
      (o) =>
        o.customer?.email?.toLowerCase() === selectedCustomer.email?.toLowerCase() ||
        o.customer?.id === selectedCustomer.id
    )
    : [];

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E5E5]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] block mb-1">
            Client Registry
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0A0A0A]">
            Registered Patrons ({customers.length})
          </h1>
        </div>

        <Button variant="primary" size="md" onClick={() => setIsAddModalOpen(true)} icon={Plus}>
          Register Patron
        </Button>
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
            placeholder="Search patron by name, email, city..."
            className="w-full min-h-[44px] pl-10 pr-4 py-2 text-xs border border-[#E5E5E5] rounded-input bg-white focus:border-[#0A0A0A]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="min-h-[44px] px-3 text-xs font-mono border border-[#E5E5E5] rounded-btn bg-white focus:border-[#0A0A0A]"
        >
          <option value="all">All Patron Statuses</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-[#E5E5E5] rounded-card shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#F5F5F5] border-b border-[#E5E5E5] text-[#737373] uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Patron Name</th>
                <th className="py-3 px-4">Contact Coordinates</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Lifetime Spend</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {paginatedCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#0A0A0A]">{cust.name}</td>
                  <td className="py-3 px-4">
                    <span className="text-[#0A0A0A] block">{cust.email}</span>
                    <span className="text-[10px] text-[#737373]">{cust.phone || '—'}</span>
                  </td>
                  <td className="py-3 px-4 text-[#525252]">
                    {cust.address?.city}, {cust.address?.country}
                  </td>
                  <td className="py-3 px-4 font-bold text-[#0A0A0A]">{cust.totalOrders}</td>
                  <td className="py-3 px-4 font-bold text-[#0A0A0A]">
                    {formatCurrency(cust.totalSpent)}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggle(cust.id, cust.name, cust.status)}
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border transition-colors ${cust.status === 'active'
                          ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                          : 'bg-[#E5E5E5] text-[#525252] border-[#A3A3A3] line-through'
                        }`}
                    >
                      {cust.status}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedCustomer(cust)}
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
            totalItems={filteredCustomers.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={Boolean(selectedCustomer)}
          onClose={() => setSelectedCustomer(null)}
          title={`Patron Profile: ${selectedCustomer.name}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6 text-xs font-mono">
            {/* Header profile meta */}
            <div className="p-4 bg-[#F5F5F5] rounded-card border border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-[#0A0A0A]">{selectedCustomer.name}</h3>
                <p className="text-[#525252]">{selectedCustomer.email} · {selectedCustomer.phone}</p>
                <p className="text-[11px] text-[#737373] mt-1">Patron since {selectedCustomer.joinedDate}</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-[#737373] uppercase block">Lifetime Value</span>
                <span className="text-lg font-black text-[#0A0A0A]">
                  {formatCurrency(selectedCustomer.totalSpent)}
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="p-4 border border-[#E5E5E5] rounded-btn">
              <h4 className="font-bold uppercase text-[#0A0A0A] mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Primary Delivery Location
              </h4>
              <p className="text-[#525252] leading-relaxed">
                {selectedCustomer.address?.street}<br />
                {selectedCustomer.address?.city}, {selectedCustomer.address?.state} {selectedCustomer.address?.postalCode}<br />
                {selectedCustomer.address?.country}
              </p>
            </div>

            {/* Associated Consignments */}
            <div>
              <h4 className="font-bold uppercase text-[#0A0A0A] mb-3 border-b border-[#E5E5E5] pb-2">
                Order History ({customerOrders.length})
              </h4>
              <div className="space-y-2">
                {customerOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3 bg-[#FAFAFA] border border-[#E5E5E5] rounded-btn flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-[#0A0A0A] block">{ord.id}</span>
                      <span className="text-[10px] text-[#737373]">{formatDate(ord.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge status={ord.status} size="sm" />
                      <span className="font-bold text-[#0A0A0A]">{formatCurrency(ord.total)}</span>
                    </div>
                  </div>
                ))}

                {customerOrders.length === 0 && (
                  <p className="text-[#737373] py-4 text-center">No active consignments logged.</p>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Customer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Patron Profile"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            label="Full Legal Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formErrors.name}
            placeholder="e.g. Maya Lin"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={formErrors.email}
              placeholder="maya@domain.com"
            />
            <Input
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <Input
            label="Street Address"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            placeholder="123 Studio Way"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="New York"
            />
            <Input
              label="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="United States"
            />
          </div>

          <div className="pt-4 border-t border-[#E5E5E5] flex justify-end gap-3">
            <Button variant="outline" size="md" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Register Client
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
