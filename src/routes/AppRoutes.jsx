import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layouts
import { StoreLayout } from '../layouts/StoreLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Storefront Pages
import { HomePage } from '../pages/store/HomePage';
import { ProductsPage } from '../pages/store/ProductsPage';
import { ProductDetailPage } from '../pages/store/ProductDetailPage';
import { CartPage } from '../pages/store/CartPage';
import { WishlistPage } from '../pages/store/WishlistPage';
import { CheckoutPage } from '../pages/store/CheckoutPage';
import { LoginPage } from '../pages/store/LoginPage';
import { RegisterPage } from '../pages/store/RegisterPage';
import { ForgotPasswordPage } from '../pages/store/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/store/ResetPasswordPage';
import { AccountPage } from '../pages/store/AccountPage';
import { OrderTrackingPage } from '../pages/store/OrderTrackingPage';
import { OffersPage } from '../pages/store/OffersPage';
import { AboutPage } from '../pages/store/AboutPage';
import { ContactPage } from '../pages/store/ContactPage';
import { FAQPage } from '../pages/store/FAQPage';
import { PrivacyPage, TermsPage } from '../pages/store/LegalPages';

// Admin Pages
import { AdminOverviewPage } from '../pages/admin/AdminOverviewPage';
import { AdminProductsPage } from '../pages/admin/AdminProductsPage';
import { AdminOrdersPage } from '../pages/admin/AdminOrdersPage';
import { AdminCustomersPage } from '../pages/admin/AdminCustomersPage';
import { AdminCategoriesPage } from '../pages/admin/AdminCategoriesPage';
import { AdminInventoryPage } from '../pages/admin/AdminInventoryPage';
import { AdminCouponsPage } from '../pages/admin/AdminCouponsPage';
import { AdminAnalyticsPage } from '../pages/admin/AdminAnalyticsPage';
import { AdminBannersPage } from '../pages/admin/AdminBannersPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';
import { AdminReviewsPage } from '../pages/admin/AdminReviewsPage';
import { AdminOffersPage } from '../pages/admin/AdminOffersPage';

// 404
import { NotFoundPage } from '../pages/NotFoundPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Customer Storefront Routes */}
        <Route path="/" element={<StoreLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="order-tracking" element={<OrderTrackingPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Protected Admin Command Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverviewPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="customers" element={<AdminCustomersPage />} />
          <Route path="reviews" element={<AdminReviewsPage />} />
          <Route path="offers" element={<AdminOffersPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="inventory" element={<AdminInventoryPage />} />
          <Route path="coupons" element={<AdminCouponsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="banners" element={<AdminBannersPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
