import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '../shared/ThemeToggle';

export function AuthVisualLayout({
  title,
  subtitle,
  children,
  isShake = false,
  showBackToLogin = false,
  backToLoginText = "Back to Login",
  backToLoginPath = "/login"
}) {
  const shouldReduceMotion = useReducedMotion();

  // Staggered entrance animation variants (logo, title, fields, button fade up 70ms apart)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full grid place-items-center p-4 sm:p-6 py-10 overflow-x-hidden bg-white dark:bg-black text-[#000000] dark:text-[#FFFFFF] select-text">
      
      {/* ─────────────────────────────────────────────────────────────
          TASK 1: ANIMATED BACKGROUND (3-4 BLOBS + FLOATING SHAPES)
          Theme-adaptive, 60fps transform & opacity only, pointer-events: none,
          respects prefers-reduced-motion.
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Blob 1: Top Left */}
        <div
          className={`absolute -top-32 -left-32 w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-[#E0E0E0] dark:bg-[#1F1F1F] filter blur-[80px] opacity-70 ${
            shouldReduceMotion ? '' : 'animate-blob-1'
          }`}
        />
        {/* Blob 2: Top Right */}
        <div
          className={`absolute top-1/4 -right-28 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full bg-[#D4D4D4] dark:bg-[#141414] filter blur-[90px] opacity-60 ${
            shouldReduceMotion ? '' : 'animate-blob-2'
          }`}
        />
        {/* Blob 3: Bottom Left */}
        <div
          className={`absolute -bottom-32 left-1/6 w-80 h-80 sm:w-[460px] sm:h-[460px] rounded-full bg-[#F0F0F0] dark:bg-[#262626] filter blur-[70px] opacity-75 ${
            shouldReduceMotion ? '' : 'animate-blob-3'
          }`}
        />
        {/* Blob 4: Bottom Right */}
        <div
          className={`absolute bottom-1/4 -right-24 w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-[#E8E8E8] dark:bg-[#181818] filter blur-[85px] opacity-65 ${
            shouldReduceMotion ? '' : 'animate-blob-4'
          }`}
        />

        {/* Floating Subtle Geometric Shapes & Dots */}
        <div
          className={`absolute top-24 left-[15%] w-3 h-3 rounded-full border border-black/20 dark:border-white/20 opacity-40 ${
            shouldReduceMotion ? '' : 'animate-shape-1'
          }`}
        />
        <div
          className={`absolute top-1/3 right-[18%] w-2.5 h-2.5 rotate-45 border border-black/25 dark:border-white/25 opacity-35 ${
            shouldReduceMotion ? '' : 'animate-shape-2'
          }`}
        />
        <div
          className={`absolute bottom-32 left-[22%] w-2 h-2 rounded-full bg-black/15 dark:bg-white/15 opacity-40 ${
            shouldReduceMotion ? '' : 'animate-shape-1'
          }`}
        />
        <div
          className={`absolute bottom-24 right-[12%] w-3 h-3 border border-black/15 dark:border-white/15 opacity-30 ${
            shouldReduceMotion ? '' : 'animate-shape-2'
          }`}
        />

        {/* Subtle geometric dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          Top Bar: Store Navigation (Left) & Theme Toggle (Top Right)
      ───────────────────────────────────────────────────────────── */}
      <header className="absolute top-0 inset-x-0 z-30 p-4 sm:p-6 max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 group text-[#000000] dark:text-[#FFFFFF] transition-opacity hover:opacity-80"
          aria-label="Return to store homepage"
        >
          <span className="w-8 h-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm tracking-wider transition-transform duration-300 group-hover:scale-105 shadow-sm">
            M
          </span>
          <span className="text-base font-bold tracking-tight uppercase">
            MONO<sup className="text-[9px] font-mono ml-0.5">™</sup>
          </span>
        </Link>

        {/* Theme Toggle in Top Right Corner */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Store</span>
          </Link>
          <ThemeToggle size="md" />
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          CENTERED GLASSMORPHISM AUTH CARD
          Single-column layout, max-width 430px (420-440px), width 100%,
          16px side padding on mobile, no horizontal overflow,
          scrolls gracefully on landscape/short screens.
      ───────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-[430px] my-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`w-full backdrop-blur-xl bg-white/90 dark:bg-[#111111]/90 border border-[#DDDDDD] dark:border-[#333333] rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative transition-all duration-300 ${
            isShake ? 'animate-shake' : ''
          }`}
        >
          {/* Brand Logo & Header Entrance */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <Link to="/" className="inline-flex items-center justify-center mb-3 group" aria-label="MONO Brand Home">
              <span className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-base tracking-wider transition-transform duration-300 group-hover:scale-105 shadow-sm">
                M
              </span>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF]">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-[#000000] dark:text-[#FFFFFF] mt-1.5 leading-relaxed opacity-80">
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Form Content / Children */}
          {children}

          {/* Back to Login Link */}
          {showBackToLogin && (
            <motion.div variants={itemVariants} className="mt-5 pt-4 border-t border-[#DDDDDD] dark:border-[#333333] text-center">
              <Link
                to={backToLoginPath}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#000000] dark:text-[#FFFFFF] hover:underline transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{backToLoginText}</span>
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Footer info below card */}
        <div className="mt-6 text-center text-[11px] text-[#000000] dark:text-[#FFFFFF] opacity-70 flex items-center justify-center gap-3">
          <span>© {new Date().getFullYear()} MONO™</span>
          <span>·</span>
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          <span>·</span>
          <Link to="/terms" className="hover:underline">Terms</Link>
        </div>
      </div>
    </div>
  );
}

// Shared alias so both names resolve identically
export const AuthLayout = AuthVisualLayout;
