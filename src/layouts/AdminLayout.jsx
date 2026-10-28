import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminTopbar } from '../components/admin/AdminTopbar';

export function AdminLayout() {
  const { currentUser, isAdmin } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Route Guard: Redirect unauthorized users to login
  if (!currentUser || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="h-[100dvh] max-h-[100dvh] flex bg-white dark:bg-[#000000] text-[#000000] dark:text-[#FFFFFF] font-sans antialiased overflow-hidden">
      {/* Sidebar Navigation (Fixed / Sticky 100dvh with independent scroll) */}
      <AdminSidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapsed={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Column: Header fixed at top, only main scrolls */}
      <div className="flex-1 flex flex-col h-[100dvh] min-w-0 overflow-hidden">
        <AdminTopbar onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto overscroll-contain [scrollbar-gutter:stable] p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
