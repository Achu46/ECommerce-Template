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
  ArrowRight,
  Home
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { SearchModal } from './SearchModal';
import { Drawer } from '../ui/Drawer';
import { ProductImage } from '../ui/ProductImage';
import { ThemeToggle } from './ThemeToggle';

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
    { label: 'Home', path: '/', icon: Home, end: true },
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
            ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-[#DDDDDD] dark:border-[#333333] shadow-subtle py-0'
            : 'bg-white/70 dark:bg-black/70 backdrop-blur-sm border-b border-transparent py-0 sm:py-1'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Left: Mobile Hamburger & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 -ml-2 text-[#000000] dark:text-[#FFFFFF] hover:bg-[#F5F5F5] dark:hover:bg-[#111111] rounded-btn transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link
              to="/"
              className="flex items-center gap-2.5 text-xl sm:text-2xl font-black tracking-tighter uppercase text-[#000000] dark:text-[#FFFFFF] select-none group"
            >
              <span className="w-8 h-8 rounded-btn bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-mono text-base font-black group-hover:scale-105 transition-transform shadow-sm">
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
                      className="group inline-flex items-center gap-1 uppercase tracking-wider text-xs font-semibold py-2 text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors relative"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isMegaMenuOpen ? 'rotate-180 text-[#000000] dark:text-[#FFFFFF]' : 'text-[#444444] dark:text-[#CCCCCC]'
                        }`}
                      />
                      {/* Animated hover underline */}
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
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
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[680px] bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card shadow-modal p-6 z-50 grid grid-cols-3 gap-6"
                        >
                          {/* Categories columns */}
                          <div className="col-span-2 grid grid-cols-2 gap-4">
                            {categories.slice(0, 6).map((cat) => (
                              <div key={cat.id} className="space-y-1.5">
                                <Link
                                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                                  onClick={() => setIsMegaMenuOpen(false)}
                                  className="text-xs font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] hover:underline flex items-center justify-between"
                                >
                                  <span>{cat.name}</span>
                                  <ChevronRight className="w-3 h-3 text-[#444444] dark:text-[#CCCCCC]" />
                                </Link>
                                <ul className="space-y-1 text-[11px] text-[#444444] dark:text-[#CCCCCC]">
                                  {cat.subcategories?.slice(0, 3).map((sub, sIdx) => (
                                    <li key={sIdx}>
                                      <Link
                                        to={`/products?category=${encodeURIComponent(cat.name)}&subcategory=${encodeURIComponent(sub)}`}
                                        onClick={() => setIsMegaMenuOpen(false)}
                                        className="hover:text-[#000000] dark:hover:text-[#FFFFFF] hover:translate-x-0.5 transition-transform inline-block"
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
                            <div className="col-span-1 bg-white dark:bg-[#000000] border border-[#DDDDDD] dark:border-[#333333] rounded p-3.5 flex flex-col justify-between">
                              <div>
                                <span className="font-mono text-[9px] uppercase tracking-widest text-[#444444] dark:text-[#CCCCCC] block mb-1">
                                  CURATOR SPOTLIGHT
                                </span>
                                <div className="aspect-[4/3] rounded overflow-hidden mb-2 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333]">
                                  <ProductImage
                                    src={featuredProduct.images?.[0]}
                                    alt={featuredProduct.name}
                                    aspectRatio="aspect-[4/3]"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <h5 className="text-xs font-bold uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF] line-clamp-1">
                                  {featuredProduct.name}
                                </h5>
                              </div>
                              <Link
                                to={`/product/${featuredProduct.id}`}
                                onClick={() => setIsMegaMenuOpen(false)}
                                className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase text-[#000000] dark:text-[#FFFFFF] hover:underline pt-2"
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
                  end={link.end}
                  className={({ isActive }) =>
                    `group transition-colors uppercase tracking-wider text-xs font-semibold py-2 flex items-center gap-1.5 relative ${
                      isActive
                        ? 'text-[#000000] dark:text-[#FFFFFF]'
                        : 'text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.icon && <link.icon className="w-3.5 h-3.5 shrink-0" />}
                      <span>{link.label}</span>
                      <span
                        className={`absolute bottom-0 left-0 w-full h-[2px] bg-black dark:bg-white transition-transform duration-200 origin-left ${
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
              className="hidden md:flex items-center justify-between gap-3 pl-4 pr-1.5 py-1.5 border border-[#DDDDDD] dark:border-[#333333] bg-white dark:bg-[#0A0A0A] hover:border-black dark:hover:border-white rounded-xl text-xs transition-all w-48 sm:w-56 lg:w-64 group shadow-sm"
            >
              <span className="text-[#444444] dark:text-[#CCCCCC] text-xs font-normal">
                Search....
              </span>
              <span className="w-7 h-7 rounded-lg bg-[#F5F5F5] dark:bg-[#161616] border border-[#DDDDDD] dark:border-[#333333] group-hover:border-black dark:group-hover:border-white flex items-center justify-center text-[#000000] dark:text-[#FFFFFF] transition-colors shrink-0 shadow-subtle">
                <Search className="w-3.5 h-3.5" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="md:hidden w-9 h-9 rounded-lg border border-[#DDDDDD] dark:border-[#333333] bg-white dark:bg-[#0A0A0A] hover:bg-[#F5F5F5] dark:hover:bg-[#111111] flex items-center justify-center text-[#000000] dark:text-[#FFFFFF] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              aria-label={`Wishlist (${wishlistCount} items)`}
              className="relative p-2.5 text-[#000000] dark:text-[#FFFFFF] hover:bg-[#F5F5F5] dark:hover:bg-[#111111] rounded-btn transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono font-bold rounded-full flex items-center justify-center"
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
                  className="p-2 text-[#000000] dark:text-[#FFFFFF] hover:bg-[#F5F5F5] dark:hover:bg-[#111111] rounded-btn transition-colors flex items-center gap-1"
                >
                  <User className="w-5 h-5" />
                </button>
              ) : (
                <Link
                  to="/login"
                  aria-label="Sign in"
                  className="p-2.5 text-[#000000] dark:text-[#FFFFFF] hover:bg-[#F5F5F5] dark:hover:bg-[#111111] rounded-btn transition-colors"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              {/* User Dropdown Menu */}
              {isUserMenuOpen && currentUser && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-btn shadow-modal p-2 z-50 text-xs font-mono"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-[#DDDDDD] dark:border-[#333333] mb-1">
                    <p className="font-bold text-[#000000] dark:text-[#FFFFFF] truncate">{currentUser.name}</p>
                    <p className="text-[10px] text-[#444444] dark:text-[#CCCCCC] truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-white dark:bg-[#000000] border border-[#DDDDDD] dark:border-[#333333] text-[9px] uppercase font-bold text-[#000000] dark:text-[#FFFFFF] rounded">
                      ROLE: {currentUser.role}
                    </span>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] rounded transition-colors font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin Dashboard
                    </Link>
                  )}

                  <Link
                    to="/account"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] rounded transition-colors"
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
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] rounded transition-colors border-t border-[#DDDDDD] dark:border-[#333333] mt-1"
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
              className="relative p-2.5 text-[#000000] dark:text-[#FFFFFF] hover:bg-[#F5F5F5] dark:hover:bg-[#111111] rounded-btn transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 1.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="absolute top-1 right-1 w-4 h-4 bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono font-bold rounded-full flex items-center justify-center shadow-sm"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* Theme Toggle Button */}
            <ThemeToggle size="md" />
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
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#444444] dark:text-[#CCCCCC]">
              Menu
            </span>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm font-semibold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] hover:translate-x-1 transition-transform flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {link.icon && <link.icon className="w-4 h-4 shrink-0" />}
                  <span>{link.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#444444] dark:text-[#CCCCCC]" />
              </NavLink>
            ))}
          </div>

          {/* Category Links */}
          <div className="flex flex-col gap-2 pt-4 border-t border-[#DDDDDD] dark:border-[#333333]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#444444] dark:text-[#CCCCCC]">
              Categories
            </span>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1.5 text-xs text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors flex items-center justify-between"
              >
                <span>{cat.name}</span>
                <span className="font-mono text-[10px] text-[#444444] dark:text-[#CCCCCC]">
                  {cat.subcategories?.length || 4}
                </span>
              </Link>
            ))}
          </div>

          {/* Admin Direct Access */}
          <div className="pt-4 border-t border-[#DDDDDD] dark:border-[#333333]">
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 p-3 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-btn text-xs font-mono font-bold uppercase text-[#000000] dark:text-[#FFFFFF] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
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
