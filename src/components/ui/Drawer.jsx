import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'right', // 'right' | 'left'
  maxWidth = 'max-w-md',
  className = '',
  footer
}) {
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const variants = {
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' },
    },
    left: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'drawer-title' : undefined}
          className="fixed inset-0 z-50 flex overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A0A0A]/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer content */}
          <motion.div
            ref={drawerRef}
            initial={variants[position].initial}
            animate={variants[position].animate}
            exit={variants[position].exit}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            className={`fixed inset-y-0 ${position === 'right' ? 'right-0' : 'left-0'
              } w-full ${maxWidth} bg-white dark:bg-[#111111] border-l border-[#DDDDDD] dark:border-[#333333] shadow-drawer flex flex-col z-20 overflow-hidden ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#DDDDDD] dark:border-[#333333] shrink-0 bg-[#F5F5F5] dark:bg-[#111111]">
              {title ? (
                <h3 id="drawer-title" className="text-sm font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF]">
                  {title}
                </h3>
              ) : <div />}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="p-2 -mr-2 text-[#000000] dark:text-[#FFFFFF] hover:bg-[#EEEEEE] dark:hover:bg-[#1A1A1A] rounded-btn transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-5 overflow-y-auto flex-1">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="p-4 sm:p-6 border-t border-[#DDDDDD] dark:border-[#333333] bg-[#F5F5F5] dark:bg-[#0A0A0A] shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
