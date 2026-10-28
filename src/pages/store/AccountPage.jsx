import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Clock,
  LogOut,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

export function AccountPage() {
  const { currentUser, logout } = useAuth();
  const { orders } = useData();
  const navigate = useNavigate();

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState(
    currentUser?.address || {
      street: '420 West Broadway, Loft 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10012',
      country: 'United States'
    }
  );

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold uppercase mb-2 text-[#000000] dark:text-[#FFFFFF]">Authentication Required</h2>
        <p className="text-xs text-[#444444] dark:text-[#CCCCCC] mb-6">Please log in to view your account details and past orders.</p>
        <Link to="/login">
          <Button variant="primary">Proceed to Login</Button>
        </Link>
      </div>
    );
  }

  // Filter orders associated with this user
  const userOrders = orders.filter(
    (o) =>
      o.customer?.email?.toLowerCase() === currentUser.email?.toLowerCase() ||
      o.customer?.name?.toLowerCase() === currentUser.name?.toLowerCase()
  );

  const displayOrders = userOrders.length > 0 ? userOrders : orders.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1 text-[#000000] dark:text-[#FFFFFF]">
      {/* Account Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DDDDDD] dark:border-[#333333] mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-mono font-black text-xl">
            {currentUser.name?.charAt(0) || 'P'}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF]">
              {currentUser.name}
            </h1>
            <p className="text-xs text-[#444444] dark:text-[#CCCCCC] font-mono">
              {currentUser.email} · <span className="uppercase font-bold text-[#000000] dark:text-[#FFFFFF]">{currentUser.role}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentUser.role === 'admin' && (
            <Link to="/admin">
              <Button variant="outline" size="sm">
                Admin Panel
              </Button>
            </Link>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              logout();
              navigate('/');
            }}
            icon={LogOut}
          >
            Sign Out
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Order History (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDDDDD] dark:border-[#333333]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] flex items-center gap-2">
              <Package className="w-4 h-4 text-[#000000] dark:text-[#FFFFFF]" /> Consignment History ({displayOrders.length})
            </h2>
            <span className="text-xs font-mono text-[#444444] dark:text-[#CCCCCC]">Real-time Database Sync</span>
          </div>

          <div className="space-y-4">
            {displayOrders.map((order) => (
              <div
                key={order.id}
                className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-5 shadow-subtle hover:border-black dark:hover:border-white transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DDDDDD] dark:border-[#333333]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#000000] dark:text-[#FFFFFF]">{order.id}</span>
                      <Badge status={order.status} size="sm" />
                    </div>
                    <span className="text-[11px] text-[#444444] dark:text-[#CCCCCC] font-mono">
                      {formatDateTime(order.createdAt)}
                    </span>
                  </div>

                  <div className="text-left sm:text-right font-mono">
                    <span className="text-sm font-black text-[#000000] dark:text-[#FFFFFF]">
                      {formatCurrency(order.total)}
                    </span>
                    <span className="text-[11px] text-[#444444] dark:text-[#CCCCCC] block">
                      {order.items?.length || 1} line item(s)
                    </span>
                  </div>
                </div>

                {/* Items summary */}
                <div className="py-3 space-y-1.5 text-xs">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex justify-between text-[#444444] dark:text-[#CCCCCC]">
                      <span className="truncate pr-4">{item.quantity}× {item.name}</span>
                      <span className="font-mono shrink-0 font-medium text-[#000000] dark:text-[#FFFFFF]">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Actions Footer */}
                <div className="pt-3 border-t border-[#DDDDDD] dark:border-[#333333] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#444444] dark:text-[#CCCCCC]">
                    Tracking: {order.trackingNumber || 'Pending'}
                  </span>
                  <Link
                    to={`/order-tracking?orderId=${order.id}`}
                    className="inline-flex items-center gap-1 font-bold text-[#000000] dark:text-[#FFFFFF] hover:underline"
                  >
                    Track Shipment <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Address & Account Meta (4 cols) */}
        <div className="lg:col-span-4 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-6 shadow-subtle space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDDDDD] dark:border-[#333333]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#000000] dark:text-[#FFFFFF]" /> Saved Delivery Address
            </h3>
            <button
              type="button"
              onClick={() => setIsEditingAddress(!isEditingAddress)}
              className="text-xs font-mono underline text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF]"
            >
              {isEditingAddress ? 'Done' : 'Edit'}
            </button>
          </div>

          {isEditingAddress ? (
            <div className="space-y-3">
              <Input
                label="Street"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
              />
              <Input
                label="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />
              <Input
                label="Postal Code"
                value={address.postalCode}
                onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
              />
            </div>
          ) : (
            <div className="text-xs text-[#444444] dark:text-[#CCCCCC] leading-relaxed font-mono">
              <p className="font-bold text-[#000000] dark:text-[#FFFFFF] mb-1">{currentUser.name}</p>
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.postalCode}</p>
              <p>{address.country}</p>
            </div>
          )}

          <div className="pt-4 border-t border-[#DDDDDD] dark:border-[#333333] space-y-2 text-xs font-mono">
            <span className="font-bold text-[#000000] dark:text-[#FFFFFF] block uppercase">Patron Benefits</span>
            <ul className="space-y-1.5 text-[#444444] dark:text-[#CCCCCC]">
              <li>✓ Automated 30-Day Solitude Guarantee</li>
              <li>✓ Private early drop allocation</li>
              <li>✓ Complimentary bespoke alterations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
