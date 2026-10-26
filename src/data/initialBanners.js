export const INITIAL_BANNERS = [
  {
    id: 'ban-1',
    title: 'THE MONOCHROME ARCHIVE',
    subtitle: 'Fall / Winter Modular Collection',
    description: 'Precision-tailored heavyweight silhouettes, brutalist timepieces, and acoustic instruments stripped of extraneous ornament.',
    ctaText: 'Explore Collection',
    ctaLink: '/products',
    badge: 'NEW DROP 04',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&auto=format&fit=crop&q=80',
    status: 'active',
    placement: 'hero'
  },
  {
    id: 'ban-2',
    title: 'ACOUSTIC PURITY',
    subtitle: 'Planar Magnetic Precision Series',
    description: 'Aircraft-grade matte aluminum engineering delivering 5Hz to 55kHz frequency fidelity.',
    ctaText: 'Discover Audio',
    ctaLink: '/products?category=Audio+%26+Tech',
    badge: 'STUDIO GRADE',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop&q=80',
    status: 'active',
    placement: 'promo'
  },
  {
    id: 'ban-3',
    title: 'BAUHAUS HOROLOGY',
    subtitle: 'Sector 01 Automatic',
    description: 'Exhibition sapphire caseback with high-beat Japanese movement and surgical steel architecture.',
    ctaText: 'View Timepieces',
    ctaLink: '/products?category=Timepieces',
    badge: 'LIMITED RUN',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&auto=format&fit=crop&q=80',
    status: 'active',
    placement: 'promo'
  }
];

export const INITIAL_SETTINGS = {
  storeName: 'MONO™',
  tagline: 'Minimal Monochrome E-Commerce Architecture',
  supportEmail: 'concierge@mono-atelier.com',
  phone: '+1 (800) 555-0199',
  currency: 'USD',
  currencySymbol: '$',
  taxRate: 0.09, // 9%
  shippingStandard: 15,
  freeShippingThreshold: 150,
  demoModeNotice: true,
  allowGuestCheckout: true,
  enableStockAlerts: true
};
