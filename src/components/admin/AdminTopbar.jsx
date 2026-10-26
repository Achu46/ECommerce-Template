import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  Store,
  User,
  LogOut,
  AlertTriangle,
  Clock,
  CheckCircle2,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export function AdminTopbar({ onOpenMobileSidebar }) {
  const { currentUser, logout } = useAuth();
  const { orders, products } = useData();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Dynamic notifications based on real data
  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 10);
  const outOfStockProducts = products.filter((p) => p.stock === 0);

  const notificationsCount = pendingOrders.length + lowStockProducts.length + outOfStockProducts.length;

  return (
    <header className="h-16 sm:h-20 bg-white border-b border-[#E5E5E5] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
      {/* Mobile Sidebar Hamburger & Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          aria-label="Open management menu"
          className="md:hidden p-2 -ml-2 text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-btn transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden sm:flex flex-col">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A]">
            MONO™ Operating System
          </span>
          <span className="text-[11px] text-[#525252]">
            Storefront & Fulfillment Management
          </span>
        </div>
      </div>

      {/* Right Topbar Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[#E5E5E5] rounded-btn text-[#0A0A0A] hover:bg-[#F5F5F5] transition-colors"
        >
          <Store className="w-3.5 h-3.5" />
          <span>View Storefront</span>
        </Link>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsProfileOpen(false);
            }}
            aria-label={`Notifications (${notificationsCount})`}
            className="p-2.5 text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-btn transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {notificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#0A0A0A] text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center">
                {notificationsCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E5E5E5] rounded-card shadow-modal p-4 z-50 text-xs font-mono"
              onMouseLeave={() => setIsNotificationsOpen(false)}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] mb-3">
                <span className="font-bold text-[#0A0A0A] uppercase tracking-wider">
                  System Alerts ({notificationsCount})
                </span>
                <button
                  type="button"
                  onClick={() => setIsNotificationsOpen(false)}
                  className="p-1 text-[#525252] hover:text-[#0A0A0A]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {pendingOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-2.5 bg-[#F5F5F5] border border-[#E5E5E5] rounded-btn flex items-start gap-2.5 cursor-pointer hover:border-[#0A0A0A]"
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate('/admin/orders');
                    }}
                  >
                    <Clock className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-bold text-[#0A0A0A]">{ord.id} pending review</div>
                      <div className="text-[11px] text-[#525252]">{ord.customer.name} · ${ord.total}</div>
                    </div>
                  </div>
                ))}

                {lowStockProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-2.5 bg-white border-2 border-dashed border-[#0A0A0A] rounded-btn flex items-start gap-2.5 cursor-pointer"
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate('/admin/inventory');
                    }}
                  >
                    <AlertTriangle className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-bold text-[#0A0A0A]">Low Stock: {prod.sku}</div>
                      <div className="text-[11px] text-[#525252]">{prod.name} ({prod.stock} units remaining)</div>
                    </div>
                  </div>
                ))}

                {notificationsCount === 0 && (
                  <div className="py-6 text-center text-[#737373]">
                    <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-[#0A0A0A]" />
                    All inventory levels and fulfillment orders are operating normally.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 hover:bg-[#F5F5F5] border border-[#E5E5E5] rounded-btn transition-colors text-xs font-mono"
          >
            <div className="w-6 h-6 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-bold text-[11px]">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <span className="hidden sm:inline font-bold text-[#0A0A0A]">
              {currentUser?.name || 'Admin'}
            </span>
          </button>

          {isProfileOpen && (
            <div
              className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E5E5] rounded-btn shadow-modal p-2 z-50 text-xs font-mono"
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <div className="px-3 py-2 border-b border-[#E5E5E5] mb-1">
                <p className="font-bold text-[#0A0A0A] truncate">{currentUser?.name}</p>
                <p className="text-[10px] text-[#525252] truncate">{currentUser?.email}</p>
                <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#0A0A0A] text-white text-[9px] uppercase font-bold rounded">
                  ADMINISTRATOR
                </span>
              </div>

              <Link
                to="/admin/settings"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-[#0A0A0A] hover:bg-[#F5F5F5] rounded transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                Store Settings
              </Link>

              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsProfileOpen(false);
                  navigate('/login');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-left text-[#525252] hover:text-[#0A0A0A] hover:bg-[#F5F5F5] rounded transition-colors border-t border-[#E5E5E5] mt-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
