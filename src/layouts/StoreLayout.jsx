import React from 'react';
import { Outlet } from 'react-router-dom';
import { DemoBadge } from '../components/shared/DemoBadge';
import { AnnouncementBar } from '../components/store/AnnouncementBar';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { CartDrawer } from '../components/shared/CartDrawer';

export function StoreLayout() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-white text-[#0A0A0A] font-sans antialiased selection:bg-[#0A0A0A] selection:text-white">
      {/* Persistent Top Portfolio Demo Notice */}
      <DemoBadge />

      {/* Rotating Promotional Announcement Bar */}
      <AnnouncementBar />

      {/* Main Header */}
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
