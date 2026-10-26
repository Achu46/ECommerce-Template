import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Truck,
  RefreshCw,
  Mail,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Tag,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { ProductCard } from '../../components/store/ProductCard';
import { ProductImage } from '../../components/ui/ProductImage';
import { Button } from '../../components/ui/Button';
import { Reveal, StaggerReveal } from '../../components/ui/Reveal';
import { formatCurrency } from '../../utils/formatters';

// Countdown Timer Helper (Ends 3 days from now and auto-resets)
function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTarget = localStorage.getItem('mono_countdown_target');
    let target = savedTarget ? parseInt(savedTarget, 10) : null;
    if (!target || target <= Date.now()) {
      target = Date.now() + 3 * 24 * 60 * 60 * 1000;
      localStorage.setItem('mono_countdown_target', target.toString());
    }
    return Math.max(0, target - Date.now());
  });

  useEffect(() => {
    const timer = setInterval(() => {
      let target = parseInt(localStorage.getItem('mono_countdown_target') || '0', 10);
      let diff = target - Date.now();
      if (diff <= 0) {
        // Auto-reset for another 3 days
        target = Date.now() + 3 * 24 * 60 * 60 * 1000;
        localStorage.setItem('mono_countdown_target', target.toString());
        diff = target - Date.now();
      }
      setTimeLeft(diff);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return { days, hours, minutes, seconds };
}

// Customer Testimonials Dataset
const TESTIMONIALS = [
  {
    id: 1,
    quote: "The organic heavyweight cotton feels incredible from day one. Exceptionally comfortable, soft on the skin, and holds its shape wash after wash.",
    author: "Marcus Vance",
    role: "Architect & Designer",
    location: "London",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    quote: "Unbelievable sound clarity and all-day comfort. The planar drivers produce rich bass and crisp highs without any ear fatigue during long studio sessions.",
    author: "Elena Rostova",
    role: "Audio Producer",
    location: "Berlin",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    quote: "Clean, understated, and durable. The automatic chronograph gets daily compliments and feels far more premium than its price tag suggests.",
    author: "Hiroshi Tanaka",
    role: "Product Designer",
    location: "Tokyo",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    quote: "Fast international shipping and thoughtful, sustainable packaging. The customer support team was also super helpful with sizing recommendations.",
    author: "Sophia Sterling",
    role: "Art Director",
    location: "New York",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80"
  }
];

export function HomePage() {
  const { products, categories, banners } = useData();
  const toast = useToast();
  const shouldReduceMotion = useReducedMotion();

  // Active filter tab for Section 5: Trending / Best Sellers
  const [activeTab, setActiveTab] = useState('all');

  // Hero Parallax Mouse State (Desktop only)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Testimonials Carousel State
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [newsletterMessage, setNewsletterMessage] = useState('');

  // Auto-rotating countdown
  const countdown = useCountdown();

  // Mouse move parallax for hero floating cards (throttled with rAF)
  const rAFRef = useRef(null);
  const handleMouseMove = (e) => {
    if (shouldReduceMotion || window.innerWidth < 1024) return;
    if (rAFRef.current) return;

    rAFRef.current = requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
      rAFRef.current = null;
    });
  };

  useEffect(() => {
    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, []);

  // Testimonial auto-rotation (every 6 seconds unless hovered)
  useEffect(() => {
    if (isTestimonialHovered) return;
    const timer = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isTestimonialHovered]);

  // Newsletter form submission handler
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail || !emailRegex.test(newsletterEmail)) {
      setNewsletterStatus('error');
      setNewsletterMessage('Please provide a valid email address.');
      return;
    }

    setNewsletterStatus('loading');
    setNewsletterMessage('');

    // Simulate async subscription dispatch
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterMessage('Thank you for subscribing! Your 10% welcome coupon has been sent to your email.');
      toast.success('Welcome to MONO™', 'Thank you for joining our community. Enjoy 10% off your first order.');
      setNewsletterEmail('');
    }, 800);
  };

  // Filtered products for Section 5
  const tabFilteredProducts = products.filter((p) => {
    if (activeTab === 'featured') return p.isFeatured;
    if (activeTab === 'new') return p.isNew;
    if (activeTab === 'sale') return p.isOnSale;
    return true;
  }).slice(0, 8);

  // Editorial Featured Products
  const planarAudio = products.find((p) => p.category.includes('Audio')) || products[0];
  const chronographPiece = products.find((p) => p.category.includes('Timepieces')) || products[1];

  // Headline words for staggered word-by-word reveal in Hero
  const heroWords = ['THOUGHTFULLY', 'CRAFTED', 'FOR', 'LIVING.'];

  return (
    <div className="flex flex-col w-full selection:bg-[#0A0A0A] selection:text-white">
      {/* ────────────────────────────────────────────────────────────────
          SECTION 3: HERO (FULL VIEWPORT 100dvh)
          Staggered entrance, floating images, looping motion, parallax
      ──────────────────────────────────────────────────────────────── */}
      <section
        onMouseMove={handleMouseMove}
        className="relative min-h-[calc(100dvh-5rem)] sm:min-h-[100dvh] bg-[#0A0A0A] text-white overflow-x-clip flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        {/* Subtle geometric grid background */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Hero Left Column: Staggered Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center">
            
            {/* Promo Banner Chip */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs tracking-wider uppercase mb-6 font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>NEW SEASON COLLECTION · COMPLIMENTARY SHIPPING</span>
            </motion.div>

            {/* Headline Word-by-Word Staggered Entrance */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight uppercase leading-[0.96] mb-6 flex flex-wrap gap-x-3 sm:gap-x-4">
              {heroWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + idx * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base lg:text-lg text-[#D4D4D4] max-w-xl leading-relaxed mb-8 font-normal"
            >
              Thoughtfully designed apparel, timepieces, and everyday essentials crafted from sustainable materials. Built for effortless comfort, understated elegance, and daily wear.
            </motion.p>

            {/* Interactive CTAs with Lift + Glow + Arrow Slide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <Link to="/products" className="group">
                <Button
                  variant="secondary"
                  size="lg"
                  fullWidth
                  className="sm:w-auto relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(255,255,255,0.35)] rounded-lg font-semibold text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span>Shop The Collection</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </Button>
              </Link>

              <a
                href="#categories"
                className="group px-6 py-3.5 border border-white/40 hover:border-white rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
              >
                <span>Explore Categories</span>
                <span className="text-white/60 transition-transform duration-300 group-hover:translate-y-1">↓</span>
              </a>
            </motion.div>

            {/* Editorial Metadata Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-12 pt-6 border-t border-white/15 w-full flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-[#A3A3A3]"
            >
              <span>DESIGNED IN-HOUSE</span>
              <span>·</span>
              <span>PREMIUM SUSTAINABLE MATERIALS</span>
              <span>·</span>
              <span>COMPLIMENTARY SHIPPING WORLDWIDE</span>
            </motion.div>
          </div>

          {/* Hero Right Column: Floating Product Cards with Looping Motion & Parallax */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] sm:min-h-[480px]">
            {/* Primary Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: shouldReduceMotion ? 0 : [0, -10, 0],
                x: shouldReduceMotion ? 0 : mousePosition.x * 0.8
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 6,
                  ease: 'easeInOut'
                },
                duration: 0.8,
                delay: 0.3
              }}
              className="relative w-64 sm:w-80 aspect-[4/5] rounded-xl overflow-hidden bg-white text-[#0A0A0A] border border-white/20 shadow-2xl z-20 group"
            >
              <ProductImage
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
                alt="Sector 01 Chronograph"
                aspectRatio="aspect-[4/5]"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                <span className="text-[11px] font-medium tracking-wide uppercase text-white/70 block mb-0.5">
                  Automatic Chronograph · 316L Steel
                </span>
                <h4 className="text-base font-semibold text-white">Sector 01 Automatic</h4>
                <span className="text-sm font-semibold text-white mt-1 block">
                  {formatCurrency(1560)}
                </span>
              </div>
            </motion.div>

            {/* Secondary Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 40 }}
              animate={{
                opacity: 0.9,
                scale: 0.95,
                y: shouldReduceMotion ? 0 : [-8, 8, -8],
                x: shouldReduceMotion ? 20 : 20 + mousePosition.x * -0.6
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 6.8,
                  ease: 'easeInOut',
                  delay: 1.2
                },
                duration: 0.8,
                delay: 0.5
              }}
              className="hidden sm:block absolute -right-4 -bottom-6 w-52 aspect-[4/5] rounded-xl overflow-hidden bg-white text-[#0A0A0A] border border-white/20 shadow-xl z-10"
            >
              <ProductImage
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                alt="Studio Master Headphones"
                aspectRatio="aspect-[4/5]"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent text-white">
                <span className="text-[10px] uppercase font-medium tracking-wide text-white/70">
                  Studio Reference Audio
                </span>
                <h5 className="text-xs font-semibold text-white">Planar Magnetic Headphones</h5>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 4: FEATURED CATEGORIES
      ──────────────────────────────────────────────────────────────── */}
      <section
        id="categories"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24 scroll-mt-24"
      >
        <Reveal variant="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-[#E5E5E5]">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#737373] block mb-1">
                Curated Collections
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A]">
                Shop by Category
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A0A0A] hover:underline"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Reveal key={cat.id} variant="scale-in">
              <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group relative flex flex-col bg-white border border-[#EBEBEB] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#0A0A0A] hover:shadow-md hover:-translate-y-1 block"
              >
                {/* Media with 1.05 scale zoom */}
                <div className="aspect-[4/5] overflow-hidden bg-[#F5F5F5] relative">
                  <ProductImage
                    src={cat.image}
                    alt={cat.name}
                    aspectRatio="aspect-[4/5]"
                    className="w-full h-full object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Card footer */}
                <div className="p-3.5 bg-white border-t border-[#EBEBEB] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#0A0A0A] group-hover:underline truncate">
                      {cat.name}
                    </h4>
                    <span className="text-[11px] text-[#737373] mt-0.5 block">
                      {cat.subcategories?.length || 4} collections
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#F5F5F5] group-hover:bg-[#0A0A0A] text-[#0A0A0A] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </StaggerReveal>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 5: TRENDING / BEST SELLERS
      ──────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24 border-t border-[#E5E5E5]">
        <Reveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#737373] block mb-1">
                Customer Favorites
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A]">
                Trending This Season
              </h2>
            </div>

            {/* Filter Tabs with Active Animated Pill */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F5F5F5] border border-[#E5E5E5] rounded-lg overflow-x-auto select-none">
              {[
                { id: 'all', label: 'All Products' },
                { id: 'featured', label: 'Featured' },
                { id: 'new', label: 'New Arrivals' },
                { id: 'sale', label: 'Special Offers' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-[#525252] hover:text-[#0A0A0A]'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-[#0A0A0A] rounded-md z-0"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Animated Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 min-h-[380px]"
        >
          <AnimatePresence mode="popLayout">
            {tabFilteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <Reveal variant="fade-up" delay={0.2} className="mt-12 text-center">
          <Link to="/products">
            <Button variant="secondary" size="lg" icon={ArrowRight} className="rounded-lg font-semibold text-sm">
              Explore All {products.length} Products
            </Button>
          </Link>
        </Reveal>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 6: NEW ARRIVALS + EXCLUSIVE SPOTLIGHT
      ──────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24 border-t border-[#E5E5E5]">
        <div className="bg-[#0A0A0A] text-white rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-[#262626] shadow-xl">
          
          {/* Editorial Content (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start">
            <Reveal variant="fade-up">
              <span className="text-xs uppercase font-semibold tracking-wider px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white mb-6 inline-block">
                Featured Spotlight · Master Acoustics
              </span>
            </Reveal>

            <Reveal variant="fade-up" delay={0.1}>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08] mb-6">
                Pure Studio Acoustics, Engineered in Aircraft Alloy
              </h2>
            </Reveal>

            <Reveal variant="fade-up" delay={0.2}>
              <p className="text-sm sm:text-base text-[#D4D4D4] leading-relaxed mb-8 max-w-xl font-normal">
                Experience high-fidelity sound crafted with ultra-thin planar magnetic diaphragms and precision-machined aluminum housings. Engineered for natural acoustic balance, rich dynamic detail, and exceptional listening comfort.
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={0.3}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-white/15 w-full mb-8">
                <div>
                  <span className="text-xs uppercase text-[#A3A3A3] block font-medium">DRIVER</span>
                  <span className="text-sm font-semibold text-white">100mm Planar</span>
                </div>
                <div>
                  <span className="text-xs uppercase text-[#A3A3A3] block font-medium">IMPEDANCE</span>
                  <span className="text-sm font-semibold text-white">32 Ohms</span>
                </div>
                <div>
                  <span className="text-xs uppercase text-[#A3A3A3] block font-medium">HOUSING</span>
                  <span className="text-sm font-semibold text-white">Aircraft Alloy</span>
                </div>
              </div>
            </Reveal>

            <Reveal variant="fade-up" delay={0.4}>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/products?category=Audio+%26+Tech">
                  <Button variant="secondary" size="lg" icon={ArrowRight} className="rounded-lg font-semibold text-sm">
                    Discover Audio Collection
                  </Button>
                </Link>
                {planarAudio && (
                  <Link
                    to={`/product/${planarAudio.id}`}
                    className="text-xs font-semibold uppercase tracking-wider text-white hover:underline px-3 py-2 transition-colors"
                  >
                    View Headphones Details →
                  </Link>
                )}
              </div>
            </Reveal>
          </div>

          {/* Editorial Image with Mask Reveal (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden bg-[#171717]">
            <Reveal variant="mask-reveal" duration={0.9} className="w-full h-full">
              <ProductImage
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&auto=format&fit=crop&q=80"
                alt="Planar Magnetic Studio Headphones"
                aspectRatio="aspect-auto"
                className="w-full h-full object-cover grayscale"
              />
            </Reveal>
          </div>

        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 7: PROMOTIONAL OFFERS & LIVE COUNTDOWN
      ──────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24 border-t border-[#E5E5E5]">
        <Reveal variant="fade-up">
          <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-8 sm:p-12 lg:p-16 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Details */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A0A0A] text-white text-xs font-semibold rounded-full uppercase">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Limited Time Offer</span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A]">
                  Season Finale Reductions
                </h3>
                <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
                  Enjoy up to 40% off selected outerwear, timepieces, and travel gear. Crafted in small batches with complimentary gift packaging on every order.
                </p>
                <div className="pt-2">
                  <Link to="/offers">
                    <Button variant="primary" size="lg" icon={ArrowRight} className="rounded-lg font-semibold text-sm">
                      Shop Selected Offers
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Live Countdown Timer */}
              <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#737373] mb-3 block">
                  Offer Ends In:
                </span>
                
                <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center w-full max-w-md">
                  {[
                    { label: 'DAYS', value: String(countdown.days).padStart(2, '0') },
                    { label: 'HOURS', value: String(countdown.hours).padStart(2, '0') },
                    { label: 'MINUTES', value: String(countdown.minutes).padStart(2, '0') },
                    { label: 'SECONDS', value: String(countdown.seconds).padStart(2, '0') }
                  ].map((unit, uIdx) => (
                    <div
                      key={uIdx}
                      className="bg-white border border-[#E5E5E5] rounded-xl p-3 sm:p-4 shadow-subtle flex flex-col justify-between"
                    >
                      <div className="overflow-hidden h-10 sm:h-12 flex items-center justify-center">
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={unit.value}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                            className="text-2xl sm:text-4xl font-bold text-[#0A0A0A] tabular-nums"
                          >
                            {unit.value}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider text-[#737373] mt-1 block">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xs text-[#737373] flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-[#0A0A0A]" />
                  <span>Use code <strong className="text-[#0A0A0A] font-bold">MONO40</strong> for savings at checkout</span>
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 8: BRAND HIGHLIGHTS / BENEFITS
      ──────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24 border-t border-[#E5E5E5]">
        <Reveal variant="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#737373] block mb-1">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A]">
              The MONO™ Commitment
            </h2>
          </div>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Truck,
              title: 'Complimentary Shipping',
              desc: 'Free expedited delivery on all orders over ₹10,000, delivered carefully to your door worldwide.'
            },
            {
              icon: ShieldCheck,
              title: '2-Year Warranty',
              desc: 'Premium sustainable materials backed by our comprehensive warranty against any defects.'
            },
            {
              icon: RefreshCw,
              title: '30-Day Easy Returns',
              desc: 'Try your pieces at home. Enjoy smooth, hassle-free exchanges and returns within 30 days.'
            },
            {
              icon: Mail,
              title: '24/7 Dedicated Care',
              desc: 'Friendly customer service available around the clock for sizing advice, care tips, and order tracking.'
            }
          ].map((item, bIdx) => {
            const Icon = item.icon;
            return (
              <Reveal key={bIdx} variant="fade-up" delay={bIdx * 0.08}>
                <div className="h-full bg-white border border-[#E5E5E5] rounded-xl p-6 sm:p-8 hover:border-[#0A0A0A] hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center text-[#0A0A0A] mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-semibold text-[#0A0A0A] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[#A3A3A3] pt-4 block border-t border-[#F5F5F5] mt-6">
                    Benefit 0{bIdx + 1}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </StaggerReveal>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 9: TESTIMONIALS
      ──────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24 border-t border-[#E5E5E5]">
        <Reveal variant="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E5E5E5]">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#737373] block mb-1">
                Customer Reviews
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A]">
                Loved by Over 10,000 Customers
              </h2>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentTestimonialIndex(
                    (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                  )
                }
                aria-label="Previous review"
                className="p-2 border border-[#E5E5E5] hover:border-[#0A0A0A] rounded-lg hover:bg-[#F5F5F5] transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-[#0A0A0A]" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length)
                }
                aria-label="Next review"
                className="p-2 border border-[#E5E5E5] hover:border-[#0A0A0A] rounded-lg hover:bg-[#F5F5F5] transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-[#0A0A0A]" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsTestimonialHovered(true)}
          onMouseLeave={() => setIsTestimonialHovered(false)}
          className="relative overflow-hidden min-h-[220px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonialIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Quote */}
              <div className="lg:col-span-8 space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#0A0A0A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#0A0A0A]" />
                  ))}
                </div>

                <blockquote className="text-lg sm:text-2xl font-semibold tracking-tight text-[#0A0A0A] leading-snug">
                  "{TESTIMONIALS[currentTestimonialIndex].quote}"
                </blockquote>

                <div className="flex items-center gap-2.5 pt-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#0A0A0A] text-white text-xs font-semibold rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Customer
                  </span>
                  <span className="text-xs text-[#737373]">
                    {TESTIMONIALS[currentTestimonialIndex].location}
                  </span>
                </div>
              </div>

              {/* Right Author Badge */}
              <div className="lg:col-span-4 flex items-center lg:justify-end gap-4 border-t lg:border-t-0 lg:border-l border-[#E5E5E5] pt-4 lg:pt-0 lg:pl-8">
                <img
                  src={TESTIMONIALS[currentTestimonialIndex].avatar}
                  alt={TESTIMONIALS[currentTestimonialIndex].author}
                  className="w-14 h-14 rounded-full border border-[#0A0A0A] object-cover grayscale"
                />
                <div>
                  <h4 className="text-base font-bold text-[#0A0A0A]">
                    {TESTIMONIALS[currentTestimonialIndex].author}
                  </h4>
                  <p className="text-xs text-[#525252]">
                    {TESTIMONIALS[currentTestimonialIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentTestimonialIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentTestimonialIndex === idx
                    ? 'w-8 bg-[#0A0A0A]'
                    : 'w-2 bg-[#D4D4D4] hover:bg-[#A3A3A3]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 10: NEWSLETTER
      ──────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24 border-t border-[#E5E5E5]">
        <Reveal variant="fade-up">
          <div className="bg-[#0A0A0A] text-white rounded-2xl p-8 sm:p-14 lg:p-16 text-center max-w-3xl mx-auto border border-[#262626] shadow-xl">
            <span className="text-xs uppercase font-semibold tracking-wider px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white mb-4 inline-block">
              Stay Connected
            </span>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              Join the MONO™ Community
            </h2>

            <p className="text-sm sm:text-base text-[#D4D4D4] max-w-lg mx-auto leading-relaxed mb-8 font-normal">
              Subscribe to receive early access to new collections, exclusive private sales, and curated design stories.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterStatus === 'error') setNewsletterStatus('idle');
                    }}
                    placeholder="Enter your email address..."
                    disabled={newsletterStatus === 'loading'}
                    className={`w-full min-h-[46px] px-4 py-2.5 text-sm text-[#0A0A0A] bg-white rounded-lg placeholder:text-[#A3A3A3] transition-all border ${
                      newsletterStatus === 'error'
                        ? 'border-red-500 ring-2 ring-red-500/20'
                        : 'border-[#E5E5E5] focus:border-[#0A0A0A]'
                    }`}
                  />
                </div>

                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  disabled={newsletterStatus === 'loading'}
                  className="min-h-[46px] rounded-lg font-semibold text-sm shrink-0"
                >
                  {newsletterStatus === 'loading' ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </span>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </Button>
              </div>

              {/* Status and Feedback Messages */}
              <AnimatePresence mode="wait">
                {newsletterStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center justify-center gap-1.5 text-xs text-red-400 pt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{newsletterMessage}</span>
                  </motion.div>
                )}

                {newsletterStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2 p-3 bg-white/10 border border-white/20 rounded-lg text-xs text-white mt-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>{newsletterMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <span className="text-xs text-[#737373] mt-6 block">
              We respect your privacy. No spam, ever. Unsubscribe anytime with one click.
            </span>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
