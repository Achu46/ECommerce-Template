import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Check, Copy, X } from 'lucide-react';

const OFFERS = [
  {
    text: 'SOLSTICE DISPATCH: 40% OFF MODULAR ARCHIVE EDITIONS',
    code: 'MONO40'
  },
  {
    text: 'COMPLIMENTARY EXPEDITED SHIPPING ON ORDERS OVER ₹10,000',
    code: 'FREESHIP'
  },
  {
    text: 'NEW CHRONOGRAPH CURATION NOW LIVE — LIMITED BATCH FULFILLMENT',
    code: 'CHRONO'
  }
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isDismissed]);

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isDismissed) return null;

  const currentOffer = OFFERS[currentIndex];

  return (
    <aside
      aria-label="Promotional announcements"
      className="bg-[#0A0A0A] text-white text-[11px] font-mono tracking-wider py-2 px-3 sm:px-6 border-b border-[#262626] relative z-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 min-h-[22px]">
        {/* Rotating message */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex flex-wrap items-center justify-center gap-2 text-center"
            >
              <span className="hidden xs:inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-white/90 uppercase tracking-widest">{currentOffer.text}</span>
              
              <button
                type="button"
                onClick={() => handleCopy(currentOffer.code)}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/10 hover:bg-white text-white hover:text-[#0A0A0A] border border-white/20 rounded transition-colors text-[10px] font-bold"
                title={`Copy code ${currentOffer.code}`}
              >
                <Tag className="w-2.5 h-2.5" />
                <span>{currentOffer.code}</span>
                {copied ? (
                  <Check className="w-2.5 h-2.5 text-white hover:text-black" />
                ) : (
                  <Copy className="w-2.5 h-2.5 opacity-70" />
                )}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss announcement"
          className="text-white/60 hover:text-white p-1 rounded transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
