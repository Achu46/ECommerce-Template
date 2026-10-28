import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function ThemeToggle({ className = '', size = 'md' }) {
  const { theme, toggleTheme, isDark } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8 min-w-[32px] min-h-[32px] p-1.5',
    md: 'w-9 h-9 min-w-[36px] min-h-[36px] sm:w-10 sm:h-10 sm:min-w-[40px] sm:min-h-[40px] p-2',
    lg: 'w-11 h-11 min-w-[44px] min-h-[44px] p-2.5',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4 sm:w-5 sm:h-5',
    lg: 'w-5 h-5 sm:w-6 sm:h-6',
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Activate Light Mode' : 'Activate Dark Mode'}
      className={`relative inline-flex items-center justify-center rounded-lg border border-[#DDDDDD] dark:border-[#333333] bg-white dark:bg-[#0A0A0A] hover:bg-[#F5F5F5] dark:hover:bg-[#111111] text-[#000000] dark:text-[#FFFFFF] transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-[#000000] dark:focus-visible:outline-[#FFFFFF] ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="dark-icon"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="flex items-center justify-center text-white"
          >
            <Moon className={`${iconSizes[size] || iconSizes.md} text-white fill-white/10`} />
          </motion.div>
        ) : (
          <motion.div
            key="light-icon"
            initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="flex items-center justify-center text-black"
          >
            <Sun className={`${iconSizes[size] || iconSizes.md} text-black fill-black/10`} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
