import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
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
  Compass,
  Heart,
  Check,
  Home,
  MessageSquare
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { ProductCard } from '../../components/store/ProductCard';
import { ProductImage } from '../../components/ui/ProductImage';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Reveal, StaggerReveal } from '../../components/ui/Reveal';
import { formatCurrency } from '../../utils/formatters';

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
      setTimeLeft(Math.max(0, diff));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export function HomePage() {
  const { products, categories, banners, activeOffer, isOfferEnabled, addReview, updateProduct } = useData();
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const toast = useToast();
  const shouldReduceMotion = useReducedMotion();

  // Customer Review Modal State (Hero Section Review Option)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewProduct, setReviewProduct] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewErrors, setReviewErrors] = useState({});
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Auto-rotating countdown for promotional section
  const countdown = useCountdown();

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

  // ─────────────────────────────────────────────────────────────
  // Hero Curated Showcase Products (Real Prices Only, No Fake Offers)
  // ─────────────────────────────────────────────────────────────
  const saleProducts = useMemo(() => {
    const featured = products.filter((p) => p.isFeatured);
    return (featured.length >= 4 ? featured : products).slice(0, 6);
  }, [products]);

  // Main Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [isSliderHovered, setIsSliderHovered] = useState(false);
  const [addingHeroId, setAddingHeroId] = useState(null);

  const totalSlides = saleProducts.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % (totalSlides || 1));
    setSlideProgress(0);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + (totalSlides || 1)) % (totalSlides || 1));
    setSlideProgress(0);
  }, [totalSlides]);

  const goToSlide = (idx) => {
    setCurrentSlide(idx);
    setSlideProgress(0);
  };

  // 5-second autoplay with continuous progress bar
  useEffect(() => {
    if (shouldReduceMotion || isSliderHovered || totalSlides <= 1) return;

    const intervalMs = 50;
    const increment = (intervalMs / 5000) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [shouldReduceMotion, isSliderHovered, totalSlides, nextSlide, currentSlide]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

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

  // Quick Add To Cart from Hero Slider
  const handleHeroAddToCart = (product) => {
    setAddingHeroId(product.id);
    addToCart(product, 1);
    toast.success('Added to Bag', `${product.name} placed in your consignment bag.`);
    setTimeout(() => setAddingHeroId(null), 900);
  };

  // Testimonial auto-rotation
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

  const planarAudio = products.find((p) => p.category.includes('Audio')) || products[0];
  const chronographPiece = products.find((p) => p.category.includes('Timepieces')) || products[1];

  const currentProduct = saleProducts[currentSlide] || products[0] || {};
  const currentImage = currentProduct.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';

  // Customer Review Handlers for Hero Section
  const handleOpenHeroReview = (product) => {
    const target = product || currentProduct;
    setReviewProduct(target);
    setReviewRating(5);
    setReviewName(currentUser?.name || '');
    setReviewLocation(currentUser?.address?.city || '');
    setReviewTitle('');
    setReviewComment('');
    setReviewErrors({});
    setIsReviewModalOpen(true);
  };

  const handleSubmitHeroReview = (e) => {
    e.preventDefault();
    const errs = {};
    if (!reviewName.trim()) errs.name = 'Please provide your name or moniker';
    if (!reviewComment.trim()) errs.comment = 'Please share your review commentary';
    if (Object.keys(errs).length > 0) {
      setReviewErrors(errs);
      return;
    }

    setIsSubmittingReview(true);
    setTimeout(() => {
      const targetProd = reviewProduct || currentProduct;
      if (addReview) {
        addReview({
          customerName: reviewName.trim(),
          customerEmail: currentUser?.email || '',
          location: reviewLocation.trim() || 'Verified Patron',
          avatar: currentUser?.avatar || '',
          productName: targetProd?.name || 'Featured Atelier Piece',
          productSku: targetProd?.sku || '',
          rating: reviewRating,
          title: reviewTitle.trim() || 'Architectural Precision & Quality',
          comment: reviewComment.trim(),
          status: 'approved',
          verifiedPurchase: true
        });
      }

      if (updateProduct && targetProd?.id) {
        const curCount = targetProd.reviewsCount || 85;
        const newCount = curCount + 1;
        const newRating = Number((((targetProd.rating || 4.9) * curCount + reviewRating) / newCount).toFixed(1));
        updateProduct(targetProd.id, {
          reviewsCount: newCount,
          rating: newRating
        });
      }

      toast.success(
        'Review Submitted',
        `Thank you for reviewing "${targetProd?.name}". Your testimonial has been posted.`
      );
      setIsSubmittingReview(false);
      setIsReviewModalOpen(false);
    }, 400);
  };

  return (
    <div className="flex flex-col w-full selection:bg-[#0A0A0A] selection:text-white">
      {/* ────────────────────────────────────────────────────────────────
          SECTION 3: HERO (ANIMATED SALE PRODUCT SLIDER + FLASH SALE STRIP)
          Task 4: Full-width animated slider showing real sale products,
          5s autoplay with progress bar, touch swipe, keyboard nav, and
          Flash Sale marquee with countdown timer.
      ──────────────────────────────────────────────────────────────── */}
      <section
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsSliderHovered(true)}
        onMouseLeave={() => setIsSliderHovered(false)}
        className="relative min-h-[calc(100dvh-4rem)] sm:min-h-[100dvh] bg-white dark:bg-[#000000] text-[#000000] dark:text-[#FFFFFF] overflow-hidden flex flex-col justify-between"
      >
        {/* Subtle geometric dot grid background */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }}
        />

        {/* Top 5s Autoplay Progress Bar */}
        <div className="w-full h-1 bg-black/10 dark:bg-white/10 relative z-30">
          <div
            className="h-full bg-black dark:bg-white transition-all duration-75 ease-linear"
            style={{ width: `${shouldReduceMotion ? 0 : slideProgress}%` }}
          />
        </div>

        {/* Main Slider Content Area */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 my-auto relative z-10 flex-1 flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Staggered Entrance Slide Information */}
            <div className="lg:col-span-7 flex flex-col items-start justify-center">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id || currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-start"
                >
                  {/* Hero Home Icon & Category Pill */}
                  <div className="flex items-center gap-2 mb-5">
                    <Link
                      to="/"
                      aria-label="Return to Home"
                      title="Return to Home"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#111111] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF] transition-all shadow-subtle group text-xs font-mono font-semibold"
                    >
                      <Home className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                      <span>Home</span>
                    </Link>
                    <span className="text-[#888888] font-mono text-xs">/</span>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 rounded-full text-xs tracking-wider uppercase font-semibold text-[#000000] dark:text-[#FFFFFF]">
                      <span>{currentProduct.category || 'Atelier Collection'}</span>
                    </div>
                  </div>

                  {/* Headline Product Name */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight uppercase leading-[1.02] mb-4 text-[#000000] dark:text-[#FFFFFF]">
                    {currentProduct.name}
                  </h1>

                  {/* Rating & Review Count + Direct Customer Review Option */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 text-xs">
                    <button
                      type="button"
                      onClick={() => handleOpenHeroReview(currentProduct)}
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/20 transition-colors group cursor-pointer"
                      title="Rate or review this piece"
                    >
                      <div className="flex items-center text-black dark:text-white">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current text-current" />
                        ))}
                      </div>
                      <span className="font-bold text-[#000000] dark:text-[#FFFFFF]">{currentProduct.rating || 4.9}</span>
                      <span className="text-[#888888]">·</span>
                      <span className="text-[#444444] dark:text-[#CCCCCC] font-mono text-[11px]">
                        {currentProduct.reviewsCount || 85} Patron Reviews
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenHeroReview(currentProduct)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white text-[#000000] dark:text-[#FFFFFF] bg-white dark:bg-[#111111] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-subtle group"
                    >
                      <MessageSquare className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                      <span>Write Review</span>
                    </button>
                  </div>

                  {/* Real Product Prices in INR (₹) */}
                  <div className="flex items-baseline gap-3.5 mb-6">
                    <span className="text-2xl sm:text-4xl font-extrabold text-[#000000] dark:text-[#FFFFFF] tracking-tight">
                      {formatCurrency(currentProduct.price)}
                    </span>
                    {currentProduct.originalPrice && currentProduct.originalPrice > currentProduct.price && (
                      <span className="text-lg sm:text-2xl text-[#737373] dark:text-[#888888] line-through font-normal">
                        {formatCurrency(currentProduct.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Subtitle Description */}
                  <p className="text-xs sm:text-sm text-[#444444] dark:text-[#CCCCCC] max-w-xl leading-relaxed mb-8">
                    {currentProduct.description || 'Constructed with architectural rigor and sustainable engineering. Designed for enduring silhouette and tactile comfort.'}
                  </p>

                  {/* Call-to-Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <Link to={`/product/${currentProduct.id}`} className="group">
                      <Button
                        variant="primary"
                        size="lg"
                        className="rounded-lg font-bold text-sm px-7 py-3.5 shadow-sm"
                      >
                        <span className="flex items-center gap-2">
                          <span>Shop Now</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Button>
                    </Link>

                    <Link to="/products" className="group">
                      <Button
                        variant="outline"
                        size="lg"
                        className="rounded-lg font-bold text-sm px-7 py-3.5 transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <span>Explore Collection</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleOpenHeroReview(currentProduct)}
                      className="rounded-lg font-bold text-sm px-5 py-3.5 transition-all flex items-center gap-2 border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white text-[#000000] dark:text-[#FFFFFF]"
                      title="Write customer review for this piece"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Review Piece</span>
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Navigation Controls (Arrows + Dots) */}
              <div className="mt-8 sm:mt-10 flex items-center gap-4 pt-4 border-t border-[#DDDDDD] dark:border-[#333333] w-full">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous product slide"
                    className="w-10 h-10 rounded-full border border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white bg-[#F5F5F5] dark:bg-[#111111] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] text-[#000000] dark:text-[#FFFFFF] flex items-center justify-center transition-all focus:outline-none focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next product slide"
                    className="w-10 h-10 rounded-full border border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white bg-[#F5F5F5] dark:bg-[#111111] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] text-[#000000] dark:text-[#FFFFFF] flex items-center justify-center transition-all focus:outline-none focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex items-center gap-2">
                  {saleProducts.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? 'w-7 bg-black dark:bg-white'
                          : 'w-2 bg-black/20 dark:bg-white/30 hover:bg-black/40 dark:hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>

                <span className="text-xs font-mono text-[#444444] dark:text-[#CCCCCC] ml-auto">
                  0{currentSlide + 1} / 0{totalSlides}
                </span>
              </div>
            </div>

            {/* Right Column: Hero Image with Floating Animation, Parallax, and Touch Drag */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] sm:min-h-[460px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id || currentSlide}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 50 || info.velocity.x > 400) {
                      prevSlide();
                    } else if (info.offset.x < -50 || info.velocity.x < -400) {
                      nextSlide();
                    }
                  }}
                  initial={{ opacity: 0, scale: 0.92, x: 30 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: shouldReduceMotion ? 0 : mousePosition.x * 0.7,
                    y: shouldReduceMotion ? 0 : [0, -10, 0]
                  }}
                  exit={{ opacity: 0, scale: 0.92, x: -30 }}
                  transition={{
                    y: {
                      repeat: Infinity,
                      duration: 5.5,
                      ease: 'easeInOut'
                    },
                    duration: 0.55
                  }}
                  className="relative w-64 sm:w-80 lg:w-[340px] aspect-[4/5] rounded-2xl overflow-hidden bg-[#F5F5F5] dark:bg-[#111111] text-[#000000] dark:text-[#FFFFFF] border border-[#DDDDDD] dark:border-[#333333] shadow-2xl z-20 group cursor-grab active:cursor-grabbing select-none"
                >
                  {/* Fixed Aspect Ratio Product Image */}
                  <img
                    src={currentImage}
                    alt={currentProduct.name}
                    loading={currentSlide === 0 ? "eager" : "lazy"}
                    fetchPriority={currentSlide === 0 ? "high" : "auto"}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Image Gradient Footer Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                    <span className="text-[11px] font-semibold tracking-wide uppercase text-white/70 block mb-0.5">
                      {currentProduct.category}
                    </span>
                    <h4 className="text-base font-bold text-white truncate">
                      {currentProduct.name}
                    </h4>
                    <span className="text-sm font-extrabold text-white mt-1 block">
                      {formatCurrency(currentProduct.price)}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-[#DDDDDD] dark:border-[#333333]">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#444444] dark:text-[#CCCCCC] block mb-1">
                Curated Collections
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#000000] dark:text-[#FFFFFF]">
                Shop by Category
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#000000] dark:text-[#FFFFFF] hover:underline"
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
                className="group relative flex flex-col bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#000000] dark:hover:border-[#FFFFFF] hover:shadow-md hover:-translate-y-1 block"
              >
                {/* Media with 1.05 scale zoom */}
                <div className="aspect-[4/5] overflow-hidden bg-white dark:bg-[#0A0A0A] relative">
                  <ProductImage
                    src={cat.image}
                    alt={cat.name}
                    aspectRatio="aspect-[4/5]"
                    className="w-full h-full object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Card footer */}
                <div className="p-3.5 bg-[#F5F5F5] dark:bg-[#111111] border-t border-[#DDDDDD] dark:border-[#333333] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#000000] dark:text-[#FFFFFF] group-hover:underline truncate">
                      {cat.name}
                    </h4>
                    <span className="text-[11px] text-[#444444] dark:text-[#CCCCCC] mt-0.5 block">
                      {cat.subcategories?.length || 4} collections
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white dark:bg-[#0A0A0A] group-hover:bg-black dark:group-hover:bg-white text-[#000000] dark:text-[#FFFFFF] group-hover:text-white dark:group-hover:text-black flex items-center justify-center transition-colors shrink-0">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24 border-t border-[#DDDDDD] dark:border-[#333333]">
        <Reveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#444444] dark:text-[#CCCCCC] block mb-1">
                Customer Favorites
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#000000] dark:text-[#FFFFFF]">
                Trending This Season
              </h2>
            </div>

            {/* Filter Tabs with Active Animated Pill */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-lg overflow-x-auto select-none">
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
                      ? 'text-white dark:text-black font-bold'
                      : 'text-[#444444] dark:text-[#CCCCCC] hover:text-[#000000] dark:hover:text-[#FFFFFF]'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-black dark:bg-white rounded-md z-0"
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24 border-t border-[#DDDDDD] dark:border-[#333333]">
        <div className="bg-[#F5F5F5] dark:bg-[#111111] text-[#000000] dark:text-[#FFFFFF] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-[#DDDDDD] dark:border-[#333333] shadow-xl">
          
          {/* Editorial Content (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start">
            <Reveal variant="fade-up">
              <span className="text-xs uppercase font-semibold tracking-wider px-3 py-1 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 rounded-full text-[#000000] dark:text-[#FFFFFF] mb-6 inline-block">
                Featured Spotlight · Master Acoustics
              </span>
            </Reveal>

            <Reveal variant="fade-up" delay={0.1}>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08] mb-6 text-[#000000] dark:text-[#FFFFFF]">
                Pure Studio Acoustics, Engineered in Aircraft Alloy
              </h2>
            </Reveal>

            <Reveal variant="fade-up" delay={0.2}>
              <p className="text-sm sm:text-base text-[#444444] dark:text-[#CCCCCC] leading-relaxed mb-8 max-w-xl font-normal">
                Experience high-fidelity sound crafted with ultra-thin planar magnetic diaphragms and precision-machined aluminum housings. Engineered for natural acoustic balance, rich dynamic detail, and exceptional listening comfort.
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={0.3}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-[#DDDDDD] dark:border-[#333333] w-full mb-8">
                <div>
                  <span className="text-xs uppercase text-[#444444] dark:text-[#CCCCCC] block font-medium">DRIVER</span>
                  <span className="text-sm font-semibold text-[#000000] dark:text-[#FFFFFF]">100mm Planar</span>
                </div>
                <div>
                  <span className="text-xs uppercase text-[#444444] dark:text-[#CCCCCC] block font-medium">IMPEDANCE</span>
                  <span className="text-sm font-semibold text-[#000000] dark:text-[#FFFFFF]">32 Ohms</span>
                </div>
                <div>
                  <span className="text-xs uppercase text-[#444444] dark:text-[#CCCCCC] block font-medium">HOUSING</span>
                  <span className="text-sm font-semibold text-[#000000] dark:text-[#FFFFFF]">Aircraft Alloy</span>
                </div>
              </div>
            </Reveal>

            <Reveal variant="fade-up" delay={0.4}>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/products?category=Audio+%26+Tech">
                  <Button variant="primary" size="lg" icon={ArrowRight} className="rounded-lg font-semibold text-sm">
                    Discover Audio Collection
                  </Button>
                </Link>
                {planarAudio && (
                  <Link
                    to={`/product/${planarAudio.id}`}
                    className="text-xs font-semibold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] hover:underline px-3 py-2 transition-colors"
                  >
                    View Headphones Details →
                  </Link>
                )}
              </div>
            </Reveal>
          </div>

          {/* Editorial Image with Mask Reveal (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden bg-white dark:bg-[#0A0A0A]">
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
      {isOfferEnabled && activeOffer && activeOffer.status !== 'disabled' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24 border-t border-[#DDDDDD] dark:border-[#333333]">
          <Reveal variant="fade-up">
            <div className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-2xl p-8 sm:p-12 lg:p-16 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Details */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-xs font-semibold rounded-full uppercase">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeOffer?.subtitle || 'Limited Time Offer'}</span>
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#000000] dark:text-[#FFFFFF]">
                    {activeOffer?.title || 'Season Finale Reductions'}
                  </h3>
                  <p className="text-sm sm:text-base text-[#444444] dark:text-[#CCCCCC] leading-relaxed">
                    {activeOffer?.description || 'Enjoy up to 40% off selected outerwear, timepieces, and travel gear. Crafted in small batches with complimentary gift packaging on every order.'}
                  </p>
                  <div className="pt-2">
                    <Link to={activeOffer?.ctaLink || '/offers'}>
                      <Button variant="primary" size="lg" icon={ArrowRight} className="rounded-lg font-semibold text-sm">
                        {activeOffer?.ctaText || 'Shop Selected Offers'}
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right Live Countdown Timer */}
                <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#444444] dark:text-[#CCCCCC] mb-3 block">
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
                        className="bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] rounded-xl p-3 sm:p-4 shadow-subtle flex flex-col justify-between"
                      >
                        <div className="overflow-hidden h-10 sm:h-12 flex items-center justify-center">
                          <AnimatePresence mode="popLayout">
                            <motion.span
                              key={unit.value}
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -20, opacity: 0 }}
                              transition={{ duration: 0.28, ease: 'easeOut' }}
                              className="text-2xl sm:text-4xl font-bold text-[#000000] dark:text-[#FFFFFF] tabular-nums"
                            >
                              {unit.value}
                            </motion.span>
                          </AnimatePresence>
                        </div>
                        <span className="text-[11px] font-semibold tracking-wider text-[#444444] dark:text-[#CCCCCC] mt-1 block">
                          {unit.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-xs text-[#444444] dark:text-[#CCCCCC] flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#000000] dark:text-[#FFFFFF]" />
                    <span>Use code <strong className="text-[#000000] dark:text-[#FFFFFF] font-bold">{activeOffer?.code || 'MONO40'}</strong> for savings at checkout</span>
                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────────────
          SECTION 8: BRAND HIGHLIGHTS / BENEFITS
      ──────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24 border-t border-[#DDDDDD] dark:border-[#333333]">
        <Reveal variant="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#444444] dark:text-[#CCCCCC] block mb-1">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#000000] dark:text-[#FFFFFF]">
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
                <div className="h-full bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-xl p-6 sm:p-8 hover:border-[#000000] dark:hover:border-[#FFFFFF] hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] flex items-center justify-center text-[#000000] dark:text-[#FFFFFF] mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-semibold text-[#000000] dark:text-[#FFFFFF] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#444444] dark:text-[#CCCCCC] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[#444444] dark:text-[#CCCCCC] pt-4 block border-t border-[#DDDDDD] dark:border-[#333333] mt-6">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24 border-t border-[#DDDDDD] dark:border-[#333333]">
        <Reveal variant="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#DDDDDD] dark:border-[#333333]">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#444444] dark:text-[#CCCCCC] block mb-1">
                Customer Reviews
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#000000] dark:text-[#FFFFFF]">
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
                className="p-2 border border-[#DDDDDD] dark:border-[#333333] hover:border-[#000000] dark:hover:border-[#FFFFFF] rounded-lg hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-[#000000] dark:text-[#FFFFFF]" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length)
                }
                aria-label="Next review"
                className="p-2 border border-[#DDDDDD] dark:border-[#333333] hover:border-[#000000] dark:hover:border-[#FFFFFF] rounded-lg hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-[#000000] dark:text-[#FFFFFF]" />
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
              className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-2xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Quote */}
              <div className="lg:col-span-8 space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#000000] dark:text-[#FFFFFF]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black dark:fill-white text-black dark:text-white" />
                  ))}
                </div>

                <blockquote className="text-lg sm:text-2xl font-semibold tracking-tight text-[#000000] dark:text-[#FFFFFF] leading-snug">
                  "{TESTIMONIALS[currentTestimonialIndex].quote}"
                </blockquote>

                <div className="flex items-center gap-2.5 pt-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-black text-white dark:bg-white dark:text-black text-xs font-semibold rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Customer
                  </span>
                  <span className="text-xs text-[#444444] dark:text-[#CCCCCC]">
                    {TESTIMONIALS[currentTestimonialIndex].location}
                  </span>
                </div>
              </div>

              {/* Right Author Badge */}
              <div className="lg:col-span-4 flex items-center lg:justify-end gap-4 border-t lg:border-t-0 lg:border-l border-[#DDDDDD] dark:border-[#333333] pt-4 lg:pt-0 lg:pl-8">
                <img
                  src={TESTIMONIALS[currentTestimonialIndex].avatar}
                  alt={TESTIMONIALS[currentTestimonialIndex].author}
                  className="w-14 h-14 rounded-full border border-black dark:border-white object-cover grayscale"
                />
                <div>
                  <h4 className="text-base font-bold text-[#000000] dark:text-[#FFFFFF]">
                    {TESTIMONIALS[currentTestimonialIndex].author}
                  </h4>
                  <p className="text-xs text-[#444444] dark:text-[#CCCCCC]">
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
                    ? 'w-8 bg-black dark:bg-white'
                    : 'w-2 bg-[#DDDDDD] dark:bg-[#333333]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 10: NEWSLETTER
      ──────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24 border-t border-[#DDDDDD] dark:border-[#333333]">
        <Reveal variant="fade-up">
          <div className="bg-[#F5F5F5] dark:bg-[#111111] text-[#000000] dark:text-[#FFFFFF] rounded-2xl p-8 sm:p-14 lg:p-16 text-center max-w-3xl mx-auto border border-[#DDDDDD] dark:border-[#333333] shadow-xl">
            <span className="text-xs uppercase font-semibold tracking-wider px-3 py-1 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 rounded-full text-[#000000] dark:text-[#FFFFFF] mb-4 inline-block">
              Stay Connected
            </span>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-[#000000] dark:text-[#FFFFFF]">
              Join the MONO™ Community
            </h2>

            <p className="text-sm sm:text-base text-[#444444] dark:text-[#CCCCCC] max-w-lg mx-auto leading-relaxed mb-8 font-normal">
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
                    className={`w-full min-h-[46px] px-4 py-2.5 text-sm text-[#000000] dark:text-[#FFFFFF] bg-white dark:bg-[#0A0A0A] rounded-lg placeholder:text-[#444444]/60 dark:placeholder:text-[#CCCCCC]/60 transition-all border ${
                      newsletterStatus === 'error'
                        ? 'border-red-500 ring-2 ring-red-500/20'
                        : 'border-[#DDDDDD] dark:border-[#333333] focus:border-black dark:focus:border-white'
                    }`}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={newsletterStatus === 'loading'}
                  className="min-h-[46px] rounded-lg font-semibold text-sm shrink-0"
                >
                  {newsletterStatus === 'loading' ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
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

            <span className="text-xs text-[#444444] dark:text-[#CCCCCC] mt-6 block">
              We respect your privacy. No spam, ever. Unsubscribe anytime with one click.
            </span>
          </div>
        </Reveal>
      </section>

      {/* Customer Review Modal for Hero Section */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Write a Customer Review"
        description={`Share your review commentary for ${(reviewProduct || currentProduct)?.name}`}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSubmitHeroReview} className="space-y-4 pt-2">
          {/* Featured Product Preview Badge */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F5F5F5] dark:bg-[#161616] border border-[#DDDDDD] dark:border-[#333333]">
            <img
              src={(reviewProduct || currentProduct)?.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200'}
              alt={(reviewProduct || currentProduct)?.name}
              className="w-12 h-12 rounded-lg object-cover border border-[#DDDDDD] dark:border-[#333333] shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-sm text-[#000000] dark:text-[#FFFFFF] truncate">
                {(reviewProduct || currentProduct)?.name}
              </h4>
              <span className="text-[11px] font-mono text-[#444444] dark:text-[#BDBDBD] block">
                {(reviewProduct || currentProduct)?.sku || 'ATELIER-001'} · {formatCurrency((reviewProduct || currentProduct)?.price || 0)}
              </span>
            </div>
          </div>

          {/* Star Rating Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#444444] dark:text-[#CCCCCC] mb-1.5 font-semibold">
              Star Rating (1 to 5)
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewRating(star)}
                  className={`p-2 sm:px-3 sm:py-2 rounded-lg border border-[#DDDDDD] dark:border-[#333333] transition-all flex items-center gap-1.5 ${
                    reviewRating >= star
                      ? 'bg-black text-white dark:bg-white dark:text-black font-bold scale-105 shadow-sm'
                      : 'bg-white dark:bg-[#111111] text-[#666666] dark:text-[#888888] hover:border-black/50 dark:hover:border-white/50'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-mono">{star}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Your Name / Moniker"
              placeholder="e.g. Marcus Vance"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              error={reviewErrors.name}
              required
            />

            <Input
              label="Location"
              placeholder="e.g. London, UK"
              value={reviewLocation}
              onChange={(e) => setReviewLocation(e.target.value)}
            />
          </div>

          <Input
            label="Review Title"
            placeholder="e.g. Architectural precision and pure tactile comfort"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />

          <Textarea
            label="Review Commentary"
            rows={4}
            placeholder="Describe your tactile experience, build finish, audio clarity, or everyday durability..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            error={reviewErrors.comment}
            required
          />

          <div className="pt-3 border-t border-[#DDDDDD] dark:border-[#333333] flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsReviewModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmittingReview}
              className="font-bold"
            >
              {isSubmittingReview ? 'Publishing...' : 'Publish Review'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
