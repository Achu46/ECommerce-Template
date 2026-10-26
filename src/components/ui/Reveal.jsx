import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Reusable scroll animation component with full prefers-reduced-motion support.
 * Only animates transform and opacity for maximum 60fps compositor performance.
 */
export function Reveal({
  children,
  variant = 'fade-up', // 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in' | 'mask-reveal'
  delay = 0,
  duration = 0.6,
  className = '',
  threshold = 0.15,
  rootMargin = '-80px',
  once = true,
  as = 'div',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  // Reduced motion: instantaneous or gentle fade without positional transform
  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount: threshold, margin: rootMargin }}
        transition={{ duration: 0.3, delay }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0 }
    },
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    'slide-left': {
      hidden: { opacity: 0, x: -28 },
      visible: { opacity: 1, x: 0 }
    },
    'slide-right': {
      hidden: { opacity: 0, x: 28 },
      visible: { opacity: 1, x: 0 }
    },
    'scale-in': {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 }
    },
    'mask-reveal': {
      hidden: { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
      visible: { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }
    }
  };

  const Component = motion[as] || motion.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: rootMargin }}
      variants={variants[variant] || variants['fade-up']}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Container component for staggered children reveals
 */
export function StaggerReveal({
  children,
  staggerDelay = 0.08,
  initialDelay = 0,
  className = '',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: initialDelay
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '-60px' }}
      variants={containerVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
