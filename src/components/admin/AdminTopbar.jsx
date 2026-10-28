import React, { useState, useMemo } from 'react';
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
  Check,
  CheckCheck,
  Trash2,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { ThemeToggle } from '../shared/ThemeToggle';

export function AdminTopbar({ onOpenMobileSidebar }) {
  const { currentUser, logout } = useAuth();
  const { orders, products } = useData();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all' | 'unread'
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const navigate = useNavigate();

  // Persisted notification states using existing useLocalStorage hook
  const [readNotificationIds, setReadNotificationIds] = useLocalStorage('mono_notifications_read', []);
  const [clearedNotificationIds, setClearedNotificationIds] = useLocalStorage('mono_notifications_cleared', []);

  // Dynamic notifications based on real data (pending orders, low stock products, out of stock)
  const allNotifications = useMemo(() => {
    const list = [];

    // Order alerts: Pending orders
    orders
      .filter((o) => o.status === 'pending')
      .forEach((ord) => {
        list.push({
          id: `order-${ord.id}`,
          type: 'order',
          title: `${ord.id} pending review`,
          subtitle: `${ord.customer?.name || 'Customer'} · $${ord.total}`,
          link: '/admin/orders',
          createdAt: ord.createdAt
        });
      });

    // Low stock product alerts (stock > 0 and stock <= 10)
    products
      .filter((p) => p.stock > 0 && p.stock <= 10)
      .forEach((prod) => {
        list.push({
          id: `stock-${prod.id}`,
          type: 'low_stock',
          title: `Low Stock: ${prod.sku}`,
          subtitle: `${prod.name} (${prod.stock} units remaining)`,
          link: '/admin/inventory'
        });
      });

    // Out of stock product alerts (stock === 0)
    products
      .filter((p) => p.stock === 0)
      .forEach((prod) => {
        list.push({
          id: `stock-${prod.id}`,
          type: 'out_of_stock',
          title: `Out of Stock: ${prod.sku}`,
          subtitle: `${prod.name} (0 units remaining)`,
          link: '/admin/inventory'
        });
      });

    return list;
  }, [orders, products]);

  // Active (non-cleared) notifications
  const activeNotifications = useMemo(() => {
    return allNotifications.filter((n) => !clearedNotificationIds.includes(n.id));
  }, [allNotifications, clearedNotificationIds]);

  // Unread notifications
  const unreadNotifications = useMemo(() => {
    return activeNotifications.filter((n) => !readNotificationIds.includes(n.id));
  }, [activeNotifications, readNotificationIds]);

  const unreadCount = unreadNotifications.length;

  // Filtered notifications to display
  const displayedNotifications = useMemo(() => {
    if (filter === 'unread') {
      return unreadNotifications;
    }
    return activeNotifications;
  }, [filter, unreadNotifications, activeNotifications]);

  const markAsRead = (id, e) => {
    if (e) {
      e.stopPropagation();
    }
    setReadNotificationIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const markAllAsRead = () => {
    const activeIds = activeNotifications.map((n) => n.id);
    setReadNotificationIds((prev) => Array.from(new Set([...prev, ...activeIds])));
  };

  const handleClearAll = () => {
    const activeIds = activeNotifications.map((n) => n.id);
    setClearedNotificationIds((prev) => Array.from(new Set([...prev, ...activeIds])));
    setIsClearConfirmOpen(false);
  };

  const handleNotificationClick = (item) => {
    // Automatically mark as read on click
    if (!readNotificationIds.includes(item.id)) {
      setReadNotificationIds((prev) => [...prev, item.id]);
    }
    setIsNotificationsOpen(false);
    navigate(item.link);
  };

  return (    <header className="h-16 sm:h-20 bg-white dark:bg-[#000000] border-b border-[#DDDDDD] dark:border-[#333333] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
      {/* Mobile Sidebar Hamburger & Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          aria-label="Open management menu"
          className="md:hidden p-2 -ml-2 text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] rounded-btn transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden sm:flex flex-col">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF]">
            MONO™ Operating System
          </span>
          <span className="text-[11px] font-medium text-[#444444] dark:text-[#CCCCCC]">
            Storefront & Fulfillment Management
          </span>
        </div>
      </div>

      {/* Right Topbar Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle size="md" />

        <Link
          to="/"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[#DDDDDD] dark:border-[#333333] rounded-btn text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
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
            aria-label={`Notifications (${unreadCount} unread)`}
            className="p-2.5 text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] rounded-btn transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-black dark:bg-white text-white dark:text-black text-[9px] font-mono font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card shadow-modal p-4 z-50 text-xs font-mono text-[#000000] dark:text-[#FFFFFF]"
              onMouseLeave={() => setIsNotificationsOpen(false)}
            >
              {/* Header */}
              <div className="pb-3 border-b border-[#DDDDDD] dark:border-[#333333] mb-3">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#000000] dark:text-[#FFFFFF] uppercase tracking-wider">
                      System Alerts
                    </span>
                    {unreadCount > 0 ? (
                      <span className="px-1.5 py-0.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold rounded-full">
                        {unreadCount} unread
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 bg-white dark:bg-[#0A0A0A] text-[#000000] dark:text-[#FFFFFF] text-[10px] border border-[#DDDDDD] dark:border-[#333333] rounded-full">
                        0 unread
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsNotificationsOpen(false)}
                    aria-label="Close alerts"
                    className="p-1 text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] rounded transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Filter and Top Action Bar */}
                <div className="flex items-center justify-between gap-2">
                  {/* All / Unread Filter */}
                  <div className="flex items-center gap-1 bg-white dark:bg-[#0A0A0A] p-0.5 rounded-btn border border-[#DDDDDD] dark:border-[#333333]">
                    <button
                      type="button"
                      onClick={() => setFilter('all')}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        filter === 'all'
                          ? 'bg-black dark:bg-white text-white dark:text-black font-bold shadow-xs'
                          : 'text-[#000000] dark:text-[#FFFFFF] hover:bg-black/5 dark:hover:bg-white/10'
                      }`}
                    >
                      All ({activeNotifications.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilter('unread')}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        filter === 'unread'
                          ? 'bg-black dark:bg-white text-white dark:text-black font-bold shadow-xs'
                          : 'text-[#000000] dark:text-[#FFFFFF] hover:bg-black/5 dark:hover:bg-white/10'
                      }`}
                    >
                      Unread ({unreadCount})
                    </button>
                  </div>

                  {/* Top Actions: Mark All as Read & Clear All */}
                  <div className="flex items-center gap-1.5">
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllAsRead}
                        className="px-2 py-1 text-[11px] font-mono font-medium text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] border border-[#DDDDDD] dark:border-[#333333] rounded-btn transition-colors flex items-center gap-1"
                        title="Mark all notifications as read"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Mark all read</span>
                      </button>
                    )}

                    {activeNotifications.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setIsClearConfirmOpen(true)}
                        className="p-1.5 sm:px-2 sm:py-1 text-[11px] font-mono text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] border border-transparent hover:border-[#DDDDDD] dark:hover:border-[#333333] rounded-btn transition-colors flex items-center gap-1"
                        title="Clear all alerts"
                        aria-label="Clear all alerts"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Clear all</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Alerts List */}
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {displayedNotifications.map((item) => {
                  const isRead = readNotificationIds.includes(item.id);
                  const isOrder = item.type === 'order';

                  return (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-btn flex items-start gap-2.5 cursor-pointer transition-all ${
                        isOrder
                          ? isRead
                            ? 'bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333]'
                            : 'bg-[#EEEEEE] dark:bg-[#1A1A1A] border border-black dark:border-white shadow-xs'
                          : isRead
                            ? 'bg-white dark:bg-[#0A0A0A] border border-dashed border-[#DDDDDD] dark:border-[#333333]'
                            : 'bg-white dark:bg-[#1A1A1A] border-2 border-dashed border-black dark:border-white'
                      }`}
                      onClick={() => handleNotificationClick(item)}
                    >
                      {/* Icon */}
                      {isOrder ? (
                        <Clock className="w-4 h-4 shrink-0 mt-0.5 text-current" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-current" />
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          {!isRead && (
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white shrink-0"
                              title="Unread alert"
                            />
                          )}
                          <span className={`truncate text-xs ${isRead ? 'font-medium' : 'font-bold'}`}>
                            {item.title}
                          </span>
                        </div>
                        <div className="text-[11px] truncate mt-0.5">
                          {item.subtitle}
                        </div>
                      </div>

                      {/* Action: Mark as Read Button */}
                      {!isRead ? (
                        <button
                          type="button"
                          onClick={(e) => markAsRead(item.id, e)}
                          className="px-1.5 py-1 text-[10px] text-[#000000] dark:text-[#FFFFFF] bg-white dark:bg-[#0A0A0A] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] border border-[#DDDDDD] dark:border-[#333333] rounded transition-all shrink-0 flex items-center gap-1 self-center"
                          title="Mark as read"
                          aria-label={`Mark ${item.title} as read`}
                        >
                          <Check className="w-3.5 h-3.5 text-current" />
                          <span className="hidden sm:inline">Read</span>
                        </button>
                      ) : (
                        <span
                          className="text-[10px] text-[#000000] dark:text-[#FFFFFF] flex items-center gap-0.5 shrink-0 px-1 py-0.5 self-center"
                          title="Read"
                        >
                          <CheckCheck className="w-3.5 h-3.5 text-current" />
                        </span>
                      )}
                    </div>
                  );
                })}

                {/* Empty State when filter is 'unread' and there are no unread */}
                {displayedNotifications.length === 0 && filter === 'unread' && activeNotifications.length > 0 && (
                  <div className="py-6 text-center text-[#000000] dark:text-[#FFFFFF]">
                    <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-current" />
                    <p className="font-bold text-xs">No unread alerts</p>
                    <p className="text-[11px] mt-1">All current notifications have been marked as read.</p>
                  </div>
                )}

                {/* Empty State when there are no active notifications at all */}
                {activeNotifications.length === 0 && (
                  <div className="py-6 text-center text-[#000000] dark:text-[#FFFFFF]">
                    <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-current" />
                    All inventory levels and fulfillment orders are operating normally.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Clear All Confirmation Dialog */}
        <ConfirmDialog
          isOpen={isClearConfirmOpen}
          onClose={() => setIsClearConfirmOpen(false)}
          onConfirm={handleClearAll}
          title="Clear All System Alerts"
          message="Are you sure you want to dismiss all active alerts? This will remove them from your System Alerts panel."
          confirmLabel="Clear All"
          cancelLabel="Cancel"
          isDestructive={true}
        />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] border border-[#DDDDDD] dark:border-[#333333] rounded-btn transition-colors text-xs font-mono text-[#000000] dark:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
          >
            <div className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-[11px]">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <span className="hidden sm:inline font-bold text-[#000000] dark:text-[#FFFFFF]">
              {currentUser?.name || 'Admin'}
            </span>
          </button>

          {isProfileOpen && (
            <div
              className="absolute right-0 mt-2 w-56 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-btn shadow-modal p-2 z-50 text-xs font-mono text-[#000000] dark:text-[#FFFFFF]"
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <div className="px-3 py-2 border-b border-[#DDDDDD] dark:border-[#333333] mb-1">
                <p className="font-bold text-[#000000] dark:text-[#FFFFFF] truncate">{currentUser?.name}</p>
                <p className="text-[10px] text-[#444444] dark:text-[#CCCCCC] truncate mt-0.5">{currentUser?.email}</p>
                <span className="inline-block mt-1 px-1.5 py-0.5 bg-black dark:bg-white text-white dark:text-black text-[9px] uppercase font-bold rounded">
                  ADMINISTRATOR
                </span>
              </div>

              <Link
                to="/admin/settings"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] rounded transition-colors"
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
                className="w-full flex items-center gap-2 px-3 py-2 text-left text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] rounded transition-colors border-t border-[#DDDDDD] dark:border-[#333333] mt-1"
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
