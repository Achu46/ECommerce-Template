import React, { useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Grid,
  Boxes,
  Ticket,
  BarChart3,
  Image as ImageIcon,
  Settings,
  Store,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  Tag
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AdminSidebar({
  isMobileOpen,
  onCloseMobile,
  isCollapsed,
  onToggleCollapsed
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Lock body scroll on mobile when drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isMobileOpen]);

  const navigationItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Reviews', path: '/admin/reviews', icon: Star },
    { label: 'Offer Details', path: '/admin/offers', icon: Tag },
    { label: 'Categories', path: '/admin/categories', icon: Grid },
    { label: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { label: 'Coupons', path: '/admin/coupons', icon: Ticket },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Banners', path: '/admin/banners', icon: ImageIcon },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-[100dvh] max-h-[100dvh] bg-white dark:bg-[#000000] border-r border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF] overflow-hidden">
      {/* 1. Header: Fixed 64-80px, shared surface token */}
      <div className="h-16 sm:h-20 border-b border-[#DDDDDD] dark:border-[#333333] px-4 flex items-center justify-between shrink-0 bg-white dark:bg-[#000000]">
        <Link
          to="/admin"
          className="flex items-center gap-2.5 overflow-hidden rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
        >
          <div className="w-8 h-8 rounded-[8px] bg-black dark:bg-white text-white dark:text-black font-bold flex items-center justify-center shrink-0 text-sm select-none">
            M
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div className="flex flex-col">
              <span className="text-[16px] font-bold tracking-tight uppercase leading-none text-[#000000] dark:text-[#FFFFFF]">
                MONO COMMAND
              </span>
              <span className="text-[11px] font-medium tracking-normal text-[#444444] dark:text-[#CCCCCC] mt-1">
                V1.0 ARCHITECTURE
              </span>
            </div>
          )}
        </Link>

        {/* Mobile close button / Desktop collapse toggle */}
        {isMobileOpen ? (
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
            className="md:hidden p-1.5 text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex p-1.5 text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* 2. Menu Area: Flex-1 with min-height: 0, 16px bottom padding, and 24px subtle fade gradient */}
      <div className="relative flex-1 min-h-0 flex flex-col overflow-hidden">
        <nav
          aria-label="Management Modules Navigation"
          className="sidebar-scrollbar flex-1 min-h-0 overflow-y-auto pl-3 pr-2.5 py-4 pb-4 space-y-1 [scrollbar-gutter:stable]"
        >
          {(!isCollapsed || isMobileOpen) && (
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#444444] dark:text-[#CCCCCC] px-3 mb-2 block select-none">
              Management Modules
            </span>
          )}

          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => isMobileOpen && onCloseMobile()}
                title={isCollapsed && !isMobileOpen ? item.label : undefined}
                className={({ isActive }) =>
                  `sidebar-nav-link relative flex items-center h-[44px] min-h-[44px] rounded-[12px] px-[12px] gap-[12px] text-[14px] uppercase tracking-[0.04em] transition-colors duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white ${
                    isActive
                      ? 'sidebar-nav-item-active bg-[#EEEEEE] dark:bg-[#111111] text-[#000000] dark:text-[#FFFFFF] border border-[#DDDDDD] dark:border-[#333333] font-semibold shadow-xs'
                      : 'text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] border border-transparent font-medium'
                  } ${isCollapsed && !isMobileOpen ? 'justify-center px-0 w-full' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active Left Indicator Bar (3px White in dark mode, 3px Black in light mode) */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r bg-[#000000] dark:bg-[#FFFFFF]"
                      />
                    )}
                    <Icon className="w-5 h-5 min-w-[20px] min-h-[20px] shrink-0 text-current" strokeWidth={1.75} />
                    {(!isCollapsed || isMobileOpen) && <span>{item.label}</span>}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Subtle 24px fade gradient at the bottom edge of the scroll area */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-[#000000] to-transparent z-10"
        />
      </div>

      {/* 3. Footer: Fixed, matching surface background and 1px border */}
      <div className="p-3 border-t border-[#DDDDDD] dark:border-[#333333] space-y-1 bg-white dark:bg-[#000000] shrink-0">
        <Link
          to="/"
          title={isCollapsed && !isMobileOpen ? 'Live Storefront' : undefined}
          className={`flex items-center h-[44px] min-h-[44px] rounded-[12px] px-[12px] gap-[12px] text-[14px] font-medium tracking-[0.04em] uppercase text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] border border-transparent transition-colors duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white ${
            isCollapsed && !isMobileOpen ? 'justify-center px-0 w-full' : ''
          }`}
        >
          <Store className="w-5 h-5 min-w-[20px] min-h-[20px] shrink-0 text-current" strokeWidth={1.75} />
          {(!isCollapsed || isMobileOpen) && <span>Live Storefront</span>}
        </Link>

        <button
          type="button"
          onClick={() => {
            logout();
            navigate('/');
          }}
          title={isCollapsed && !isMobileOpen ? 'End Session' : undefined}
          className={`w-full flex items-center h-[44px] min-h-[44px] rounded-[12px] px-[12px] gap-[12px] text-[14px] font-medium tracking-[0.04em] uppercase text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] border border-transparent transition-colors duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white ${
            isCollapsed && !isMobileOpen ? 'justify-center px-0 w-full' : ''
          }`}
        >
          <LogOut className="w-5 h-5 min-w-[20px] min-h-[20px] shrink-0 text-current" strokeWidth={1.75} />
          {(!isCollapsed || isMobileOpen) && <span>End Session</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Off-Canvas Drawer (<768px) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative w-72 max-w-[80vw] h-[100dvh] max-h-[100dvh] z-10 shadow-drawer">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop / Tablet Sidebar (Hidden on mobile) */}
      <aside
        className={`hidden md:flex flex-col h-[100dvh] max-h-[100dvh] sticky top-0 shrink-0 transition-all duration-300 z-30 select-none ${
          isCollapsed ? 'w-[72px]' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
