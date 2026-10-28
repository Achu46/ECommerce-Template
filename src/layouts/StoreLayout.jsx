import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DemoBadge } from '../components/shared/DemoBadge';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { CartDrawer } from '../components/shared/CartDrawer';

export function StoreLayout() {
  const location = useLocation();
  const isAuthRoute =
    ['/login', '/register', '/forgot-password'].includes(location.pathname) ||
    location.pathname.startsWith('/reset-password');

  // Dedicated full-viewport view for Auth routes (Login, Register, Forgot Password, Reset Password)
  if (isAuthRoute) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-white dark:bg-black text-[#000000] dark:text-[#FFFFFF] font-sans antialiased">
        <main className="flex-1 flex flex-col min-h-[100dvh]">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white dark:bg-black text-[#000000] dark:text-[#FFFFFF] font-sans antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Persistent Top Portfolio Demo Notice */}
      <DemoBadge />

      {/* Main Header with Theme Toggle */}
      <Navbar />

      {/* Primary Page Canvas */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Slide-over Shopping Cart */}
      <CartDrawer />

      {/* Footer */}
      <Footer />
    </div>
  );
}
