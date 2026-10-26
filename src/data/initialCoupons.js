export const INITIAL_COUPONS = [
  {
    id: 'coup-1',
    code: 'MONO10',
    type: 'percentage',
    value: 10,
    minSpend: 50,
    maxDiscount: 100,
    expiryDate: '2026-12-31',
    usageCount: 142,
    usageLimit: 500,
    status: 'active',
    description: '10% discount on all minimalist apparel and accessories.'
  },
  {
    id: 'coup-2',
    code: 'WELCOME20',
    type: 'percentage',
    value: 20,
    minSpend: 150,
    maxDiscount: 200,
    expiryDate: '2026-12-31',
    usageCount: 89,
    usageLimit: 300,
    status: 'active',
    description: '20% off for first-time design patrons over $150.'
  },
  {
    id: 'coup-3',
    code: 'VIP50',
    type: 'fixed',
    value: 50,
    minSpend: 300,
    maxDiscount: 50,
    expiryDate: '2026-12-31',
    usageCount: 38,
    usageLimit: 100,
    status: 'active',
    description: '$50 instant reduction on flagship timepieces and audio.'
  },
  {
    id: 'coup-4',
    code: 'FREESHIP',
    type: 'shipping',
    value: 100,
    minSpend: 75,
    maxDiscount: 25,
    expiryDate: '2026-12-31',
    usageCount: 215,
    usageLimit: 1000,
    status: 'active',
    description: 'Complimentary expedited global shipping.'
  },
  {
    id: 'coup-5',
    code: 'ARCHIVE15',
    type: 'percentage',
    value: 15,
    minSpend: 100,
    maxDiscount: 75,
    expiryDate: '2024-01-01',
    usageCount: 120,
    usageLimit: 120,
    status: 'expired',
    description: 'Winter solstice archive promotion (Expired).'
  }
];
