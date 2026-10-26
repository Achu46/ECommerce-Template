import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { SearchModal } from './SearchModal';
import { Drawer } from '../ui/Drawer';
import { ProductImage } from '../ui/ProductImage';

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { currentUser, isAdmin, logout } = useAuth();
  const { categories, products } = useData();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const megaMenuRef = useRef(null);
  const navigate = useNavigate();

  // Scroll detection: frosted glass background & shadow after 24px
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 24;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Close mega menu on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setIsMegaMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMegaMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    if (isMegaMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMegaMenuOpen]);

  // Featured artifact for the mega menu preview
  const featuredProduct = products.find((p) => p.isFeatured) || products[0];

  const navLinks = [
    { label: 'Collection', path: '/products', hasDropdown: true },
    { label: 'Offers', path: '/offers' },
    { label: 'Track Order', path: '/order-tracking' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-[#E5E5E5] shadow-subtle py-0'
            : 'bg-white/70 backdrop-blur-sm border-b border-transparent py-0 sm:py-1'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Left: Mobile Hamburger & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 -ml-2 text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-btn transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link
              to="/"
              className="flex items-center gap-2.5 text-xl sm:text-2xl font-black tracking-tighter uppercase text-[#0A0A0A] select-none group"
            >
              <span className="w-8 h-8 rounded-btn bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-base font-black group-hover:scale-105 transition-transform shadow-sm">
                M
              </span>
              <span>MONO<sup className="text-[10px] tracking-normal font-sans font-bold ml-0.5">™</sup></span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Bar with Animated Underline and Mega Menu */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium relative">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.path}
                    ref={megaMenuRef}
                    className="relative"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                      className="group inline-flex items-center gap-1 uppercase tracking-wider text-xs font-semibold py-2 text-[#525252] hover:text-[#0A0A0A] transition-colors relative"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isMegaMenuOpen ? 'rotate-180 text-[#0A0A0A]' : 'text-[#737373]'
                        }`}
                      />
                      {/* Animated hover underline */}
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0A0A0A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                    </button>

                    {/* Mega Dropdown Menu (Fades & slides in 180ms) */}
                    <AnimatePresence>
                      {isMegaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          onMouseLeave={() => setIsMegaMenuOpen(false)}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[680px] bg-white border border-[#E5E5E5] rounded-card shadow-modal p-6 z-50 grid grid-cols-3 gap-6"
                        >
                          {/* Categories columns */}
                          <div className="col-span-2 grid grid-cols-2 gap-4">
                            {categories.slice(0, 6).map((cat) => (
                              <div key={cat.id} className="space-y-1.5">
                                <Link
                                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                                  onClick={() => setIsMegaMenuOpen(false)}
                                  className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:underline flex items-center justify-between"
                                >
                                  <span>{cat.name}</span>
                                  <ChevronRight className="w-3 h-3 text-[#A3A3A3]" />
                                </Link>
                                <ul className="space-y-1 text-[11px] text-[#525252]">
                                  {cat.subcategories?.slice(0, 3).map((sub, sIdx) => (
                                    <li key={sIdx}>
                                      <Link
                                        to={`/products?category=${encodeURIComponent(cat.name)}&subcategory=${encodeURIComponent(sub)}`}
                                        onClick={() => setIsMegaMenuOpen(false)}
                                        className="hover:text-[#0A0A0A] hover:translate-x-0.5 transition-transform inline-block"
                                      >
                                        {sub}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* Curated Spotlight Column */}
                          {featuredProduct && (
                            <div className="col-span-1 bg-[#F5F5F5] border border-[#E5E5E5] rounded p-3.5 flex flex-col justify-between">
                              <div>
                                <span className="font-mono text-[9px] uppercase tracking-widest text-[#737373] block mb-1">
                                  CURATOR SPOTLIGHT
                                </span>
                                <div className="aspect-[4/3] rounded overflow-hidden mb-2 bg-white border border-[#E5E5E5]">
                                  <ProductImage
                                    src={featuredProduct.images?.[0]}
                                    alt={featuredProduct.name}
                                    aspectRatio="aspect-[4/3]"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <h5 className="text-xs font-bold uppercase tracking-tight text-[#0A0A0A] line-clamp-1">
                                  {featuredProduct.name}
                                </h5>
                              </div>
                              <Link
                                to={`/product/${featuredProduct.id}`}
                                onClick={() => setIsMegaMenuOpen(false)}
                                className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase text-[#0A0A0A] hover:underline pt-2"
                              >
                                <span>Inspect Piece</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `group transition-colors uppercase tracking-wider text-xs font-semibold py-2 relative ${
                      isActive
                        ? 'text-[#0A0A0A]'
                        : 'text-[#525252] hover:text-[#0A0A0A]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      <span
                        className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#0A0A0A] transition-transform duration-200 origin-left ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right: Actions (Search, Wishlist, User, Cart) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Live Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search catalog"
              className="hidden md:flex items-center gap-3 px-3.5 py-1.5 border border-[#E5E5E5] bg-[#F5F5F5] hover:bg-white hover:border-[#0A0A0A] rounded-input text-xs text-[#525252] transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-[#0A0A0A]" />
              <span>Search products...</span>
              <kbd className="font-mono text-[10px] text-[#A3A3A3] border border-[#E5E5E5] px-1 py-0.5 rounded bg-white">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="md:hidden p-2.5 text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-btn transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              aria-label={`Wishlist (${wishlistCount} items)`}
              className="relative p-2.5 text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-btn transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 bg-[#0A0A0A] text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Account Dropdown */}
            <div className="relative">
              {currentUser ? (
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-expanded={isUserMenuOpen}
                  aria-label="Account menu"
                  className="p-2 text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-btn transition-colors flex items-center gap-1"
                >
                  <User className="w-5 h-5" />
                </button>
              ) : (
                <Link
                  to="/login"
                  aria-label="Sign in"
                  className="p-2.5 text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-btn transition-colors"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              {/* User Dropdown Menu */}
              {isUserMenuOpen && currentUser && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E5E5] rounded-btn shadow-modal p-2 z-50 text-xs font-mono"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-[#E5E5E5] mb-1">
                    <p className="font-bold text-[#0A0A0A] truncate">{currentUser.name}</p>
                    <p className="text-[10px] text-[#525252] truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#F5F5F5] border border-[#E5E5E5] text-[9px] uppercase font-bold rounded">
                      ROLE: {currentUser.role}
                    </span>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[#0A0A0A] hover:bg-[#F5F5F5] rounded transition-colors font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin Dashboard
                    </Link>
                  )}

                  <Link
                    to="/account"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-[#0A0A0A] hover:bg-[#F5F5F5] rounded transition-colors"
                  >
                    <User className="w-4 h-4" />
                    My Profile & Orders
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                      navigate('/');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-[#525252] hover:text-[#0A0A0A] hover:bg-[#F5F5F5] rounded transition-colors border-t border-[#E5E5E5] mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Cart Trigger with Animated Count Badge Bump */}
            <motion.button
              type="button"
              onClick={() => setIsCartOpen(true)}
              whileTap={{ scale: 0.95 }}
              aria-label={`Shopping bag (${totalItems} items)`}
              className="relative p-2.5 text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-btn transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 1.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="absolute top-1 right-1 w-4 h-4 bg-[#0A0A0A] text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center shadow-sm"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Off-Canvas Navigation Drawer */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        title="Navigation"
        position="left"
        maxWidth="max-w-xs"
      >
        <div className="flex flex-col gap-6">
          {/* Main Links */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373]">
              Menu
            </span>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm font-semibold uppercase tracking-wider text-[#0A0A0A] hover:translate-x-1 transition-transform flex items-center justify-between"
              >
                {link.label}
                <ChevronRight className="w-4 h-4 text-[#A3A3A3]" />
              </NavLink>
            ))}
          </div>

          {/* Category Links */}
          <div className="flex flex-col gap-2 pt-4 border-t border-[#E5E5E5]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373]">
              Categories
            </span>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1.5 text-xs text-[#525252] hover:text-[#0A0A0A] transition-colors flex items-center justify-between"
              >
                <span>{cat.name}</span>
                <span className="font-mono text-[10px] text-[#A3A3A3]">
                  {cat.subcategories?.length || 4}
                </span>
              </Link>
            ))}
          </div>

          {/* Admin Direct Access */}
          <div className="pt-4 border-t border-[#E5E5E5]">
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 p-3 bg-[#F5F5F5] border border-[#E5E5E5] rounded-btn text-xs font-mono font-bold uppercase hover:bg-[#0A0A0A] hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin Command
            </Link>
          </div>
        </div>
      </Drawer>

      {/* Global Quick Search Modal with Live Suggestions */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
