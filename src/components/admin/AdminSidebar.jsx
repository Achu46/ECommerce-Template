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
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AdminSidebar({
  isMobileOpen,
  onCloseMobile,
  isCollapsed,
  onToggleCollapsed
}) {
  const { logout, currentUser } = useAuth();
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
    { label: 'Overview', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Categories', path: '/admin/categories', icon: Grid },
    { label: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { label: 'Coupons', path: '/admin/coupons', icon: Ticket },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Banners', path: '/admin/banners', icon: ImageIcon },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-[#E5E5E5] text-[#0A0A0A]">
      {/* Brand Header */}
      <div className="h-16 sm:h-20 border-b border-[#E5E5E5] px-4 flex items-center justify-between shrink-0">
        <Link to="/admin" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-btn bg-[#0A0A0A] text-white font-mono font-black flex items-center justify-center shrink-0">
            M
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight uppercase leading-none">
                MONO COMMAND
              </span>
              <span className="text-[10px] font-mono text-[#737373] mt-0.5">
                V1.0 ARCHITECTURE
              </span>
            </div>
          )}
        </Link>

        {/* Mobile close button */}
        {isMobileOpen ? (
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
            className="md:hidden p-1.5 text-[#525252] hover:text-[#0A0A0A] rounded-btn"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex p-1.5 text-[#525252] hover:text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-btn transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Nav List */}
      <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
        {(!isCollapsed || isMobileOpen) && (
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] px-3 mb-2 block">
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
                `flex items-center gap-3 px-3 py-2.5 rounded-btn text-xs font-semibold uppercase tracking-wider transition-all select-none ${isActive
                  ? 'bg-[#0A0A0A] text-white shadow-subtle'
                  : 'text-[#525252] hover:text-[#0A0A0A] hover:bg-[#F5F5F5]'
                } ${isCollapsed && !isMobileOpen ? 'justify-center px-2' : ''}`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {(!isCollapsed || isMobileOpen) && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-[#E5E5E5] space-y-1 bg-[#FAFAFA] shrink-0">
        <Link
          to="/"
          title={isCollapsed && !isMobileOpen ? 'View Storefront' : undefined}
          className={`flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#0A0A0A] hover:bg-[#E5E5E5] rounded-btn transition-colors ${isCollapsed && !isMobileOpen ? 'justify-center px-2' : ''
            }`}
        >
          <Store className="w-4 h-4 shrink-0" />
          {(!isCollapsed || isMobileOpen) && <span>Live Storefront</span>}
        </Link>

        <button
          type="button"
          onClick={() => {
            logout();
            navigate('/');
          }}
          title={isCollapsed && !isMobileOpen ? 'Sign Out' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#525252] hover:text-[#0A0A0A] hover:bg-[#E5E5E5] rounded-btn transition-colors ${isCollapsed && !isMobileOpen ? 'justify-center px-2' : ''
            }`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
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
            className="fixed inset-0 bg-[#0A0A0A]/60 backdrop-blur-sm"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop / Tablet Sidebar (Hidden on mobile) */}
      <aside
        className={`hidden md:flex flex-col h-full sticky top-0 shrink-0 transition-all duration-300 z-30 select-none ${isCollapsed ? 'w-18' : 'w-64'
          }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
