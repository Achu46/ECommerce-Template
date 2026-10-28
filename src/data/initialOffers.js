export const INITIAL_OFFERS = [
  {
    id: 'offer-mono40',
    title: 'Season Finale Reductions',
    subtitle: 'Limited Time Offer',
    description: 'Enjoy up to 40% off selected outerwear, timepieces, and travel gear. Crafted in small batches with complimentary gift packaging on every order.',
    code: 'MONO40',
    discount: '40% OFF',
    status: 'active', // 'active' | 'scheduled' | 'ended'
    ctaText: 'Shop Selected Offers',
    ctaLink: '/offers',
    days: 1,
    hours: 22,
    minutes: 44,
    seconds: 57,
    autoReset: true,
    bannerBadge: 'FLASH SALE'
  },
  {
    id: 'offer-atelier20',
    title: 'Flash Atelier Launch Event',
    subtitle: 'Exclusive Flash Concession',
    description: 'Receive an instant 20% savings on newly arrived minimalist mechanical keyboards and planar headphones.',
    code: 'ATELIER20',
    discount: '20% OFF',
    status: 'scheduled',
    ctaText: 'Explore Collection',
    ctaLink: '/products',
    days: 5,
    hours: 12,
    minutes: 0,
    seconds: 0,
    autoReset: false,
    bannerBadge: 'NEW SEASON'
  },
  {
    id: 'offer-patron15',
    title: 'VIP Patron Weekend Privilege',
    subtitle: 'Member Exclusive',
    description: 'Take 15% off site-wide for all registered accounts with priority expedited dispatch and carbon-neutral packaging.',
    code: 'PATRON15',
    discount: '15% OFF',
    status: 'ended',
    ctaText: 'View Vault',
    ctaLink: '/products',
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    autoReset: false,
    bannerBadge: 'ARCHIVED'
  }
];
