export const INITIAL_ORDERS = [
  {
    id: 'ORD-98214',
    customer: {
      id: 'cust-01',
      name: 'Alexander Wright',
      email: 'alexander.wright@archdesign.com'
    },
    items: [
      { productId: 'prod-013', name: 'Sector 01 Automatic Minimalist Watch', price: 520, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-001', name: 'Architectural Heavyweight Oversized Tee', price: 68, quantity: 2, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 656,
    discount: 65.6,
    tax: 59.04,
    shipping: 0,
    total: 649.44,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-01-18T14:32:00Z',
    shippingAddress: {
      street: '420 West Broadway, Loft 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10012',
      country: 'United States'
    },
    trackingNumber: 'MN-TRK-774920',
    notes: 'Please leave in front door vestibule.'
  },
  {
    id: 'ORD-98215',
    customer: {
      id: 'cust-02',
      name: 'Elena Rostova',
      email: 'elena.rostova@berlinart.de'
    },
    items: [
      { productId: 'prod-009', name: 'Studio Master Planar Magnetic Headphones', price: 450, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 450,
    discount: 0,
    tax: 40.50,
    shipping: 15,
    total: 505.50,
    status: 'delivered',
    paymentMethod: 'Apple Pay (Simulated)',
    createdAt: '2024-01-25T09:15:00Z',
    shippingAddress: {
      street: 'Torstraße 118',
      city: 'Berlin',
      state: 'Berlin',
      postalCode: '10119',
      country: 'Germany'
    },
    trackingNumber: 'MN-TRK-881230',
    notes: ''
  },
  {
    id: 'ORD-98216',
    customer: {
      id: 'cust-03',
      name: 'Kenji Takahashi',
      email: 'kenji.takahashi@tokyostudio.jp'
    },
    items: [
      { productId: 'prod-017', name: 'Modular Ballistic Nylon Commuter Pack (24L)', price: 260, quantity: 1, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-020', name: 'Precision Anodized Cardholder Wallet', price: 65, quantity: 1, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 325,
    discount: 32.50,
    tax: 29.25,
    shipping: 0,
    total: 321.75,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-02-04T18:45:00Z',
    shippingAddress: {
      street: '5-7-2 Minami-Aoyama',
      city: 'Minato-ku, Tokyo',
      state: 'Tokyo',
      postalCode: '107-0062',
      country: 'Japan'
    },
    trackingNumber: 'MN-TRK-990145',
    notes: ''
  },
  {
    id: 'ORD-98217',
    customer: {
      id: 'cust-04',
      name: 'Marcus Vance',
      email: 'marcus.vance@vancemedia.co'
    },
    items: [
      { productId: 'prod-002', name: 'Brutalist Tailored Wool Blazer', price: 320, quantity: 1, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-003', name: 'Pleated Wide-Leg Wool Trousers', price: 185, quantity: 1, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 505,
    discount: 50.50,
    tax: 45.45,
    shipping: 0,
    total: 499.95,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-02-14T11:20:00Z',
    shippingAddress: {
      street: '742 Evergreen Terrace',
      city: 'Portland',
      state: 'OR',
      postalCode: '97201',
      country: 'United States'
    },
    trackingNumber: 'MN-TRK-102938',
    notes: ''
  },
  {
    id: 'ORD-98218',
    customer: {
      id: 'cust-05',
      name: 'Chloe Laurent',
      email: 'chloe.laurent@parisatelier.fr'
    },
    items: [
      { productId: 'prod-021', name: 'Cast Aluminum Minimalist Task Lamp', price: 220, quantity: 1, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 220,
    discount: 0,
    tax: 19.80,
    shipping: 15,
    total: 254.80,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-02-28T16:05:00Z',
    shippingAddress: {
      street: '14 Rue de Turenne',
      city: 'Paris',
      state: 'Île-de-France',
      postalCode: '75004',
      country: 'France'
    },
    trackingNumber: 'MN-TRK-223401',
    notes: ''
  },
  {
    id: 'ORD-98219',
    customer: {
      id: 'cust-06',
      name: 'Siddharth Mehta',
      email: 'siddharth.mehta@designcore.in'
    },
    items: [
      { productId: 'prod-005', name: 'Monolith High-Top Vulcanized Sneaker', price: 210, quantity: 1, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-012', name: 'Minimal Mechanical Keyboard (CNC Case)', price: 240, quantity: 1, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 450,
    discount: 45,
    tax: 40.50,
    shipping: 0,
    total: 445.50,
    status: 'delivered',
    paymentMethod: 'Bank Transfer (Simulated)',
    createdAt: '2024-03-08T13:40:00Z',
    shippingAddress: {
      street: 'B-402 Bandra Kurla Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400051',
      country: 'India'
    },
    trackingNumber: 'MN-TRK-334592',
    notes: ''
  },
  {
    id: 'ORD-98220',
    customer: {
      id: 'cust-07',
      name: 'Astrid Lindgren',
      email: 'astrid.nordic@scandistyle.se'
    },
    items: [
      { productId: 'prod-022', name: 'Matte Black Hand-Thrown Ceramic Mug (Set of 2)', price: 58, quantity: 2, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-024', name: 'Smoked Vetiver & Hinoki Wood Soy Candle', price: 42, quantity: 2, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 200,
    discount: 20,
    tax: 18,
    shipping: 0,
    total: 198,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-03-19T10:10:00Z',
    shippingAddress: {
      street: 'Sveavägen 44',
      city: 'Stockholm',
      state: 'Stockholm',
      postalCode: '111 34',
      country: 'Sweden'
    },
    trackingNumber: 'MN-TRK-445678',
    notes: ''
  },
  {
    id: 'ORD-98221',
    customer: {
      id: 'cust-08',
      name: 'Julian Sterling',
      email: 'julian.sterling@oxfordadvisory.uk'
    },
    items: [
      { productId: 'prod-006', name: 'Commando Sole Leather Derby Shoes', price: 295, quantity: 1, image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 295,
    discount: 0,
    tax: 26.55,
    shipping: 0,
    total: 321.55,
    status: 'cancelled',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-03-27T08:50:00Z',
    shippingAddress: {
      street: '88 Jermyn Street',
      city: 'London',
      state: 'Greater London',
      postalCode: 'SW1Y 6JD',
      country: 'United Kingdom'
    },
    trackingNumber: '',
    notes: 'Customer cancelled prior to shipping: order duplicate'
  },
  {
    id: 'ORD-98222',
    customer: {
      id: 'cust-09',
      name: 'Sofia Al-Mansoor',
      email: 'sofia.mansoor@dubaicreative.ae'
    },
    items: [
      { productId: 'prod-013', name: 'Sector 01 Automatic Minimalist Watch', price: 520, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-011', name: 'Cast Aluminum Bluetooth Studio Speaker', price: 360, quantity: 1, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 880,
    discount: 88,
    tax: 79.20,
    shipping: 0,
    total: 871.20,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-04-05T15:25:00Z',
    shippingAddress: {
      street: 'Building 7, Dubai Design District',
      city: 'Dubai',
      state: 'Dubai',
      postalCode: '00000',
      country: 'United Arab Emirates'
    },
    trackingNumber: 'MN-TRK-556789',
    notes: 'Express courier delivery'
  },
  {
    id: 'ORD-98223',
    customer: {
      id: 'cust-10',
      name: 'Oliver King',
      email: 'oliver.king@melbournearch.au'
    },
    items: [
      { productId: 'prod-019', name: 'Overnight Weekender Holdall (42L)', price: 290, quantity: 1, image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 290,
    discount: 29,
    tax: 26.10,
    shipping: 0,
    total: 287.10,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-04-14T12:00:00Z',
    shippingAddress: {
      street: '12 Flinders Lane',
      city: 'Melbourne',
      state: 'VIC',
      postalCode: '3000',
      country: 'Australia'
    },
    trackingNumber: 'MN-TRK-667890',
    notes: ''
  },
  {
    id: 'ORD-98224',
    customer: {
      id: 'cust-11',
      name: 'Mia Chen',
      email: 'mia.chen@shanghaiforward.cn'
    },
    items: [
      { productId: 'prod-025', name: 'Technical 3-Layer Storm Shell Jacket', price: 380, quantity: 1, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-004', name: 'Ribbed Merino Wool Mock-Neck', price: 160, quantity: 1, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 540,
    discount: 54,
    tax: 48.60,
    shipping: 0,
    total: 534.60,
    status: 'delivered',
    paymentMethod: 'Apple Pay (Simulated)',
    createdAt: '2024-04-26T07:45:00Z',
    shippingAddress: {
      street: '333 Nanjing West Road',
      city: 'Shanghai',
      state: 'Shanghai',
      postalCode: '200041',
      country: 'China'
    },
    trackingNumber: 'MN-TRK-778901',
    notes: ''
  },
  {
    id: 'ORD-98225',
    customer: {
      id: 'cust-12',
      name: 'Lukas Meyer',
      email: 'lukas.meyer@zurichlaw.ch'
    },
    items: [
      { productId: 'prod-014', name: 'Monochrome Sub-Dial Chronograph', price: 380, quantity: 1, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 380,
    discount: 0,
    tax: 34.20,
    shipping: 0,
    total: 414.20,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-05-07T14:10:00Z',
    shippingAddress: {
      street: 'Bahnhofstrasse 45',
      city: 'Zürich',
      state: 'Zürich',
      postalCode: '8001',
      country: 'Switzerland'
    },
    trackingNumber: 'MN-TRK-889012',
    notes: ''
  },
  {
    id: 'ORD-98226',
    customer: {
      id: 'cust-13',
      name: 'Grace Hopper',
      email: 'grace.h@cyberfoundry.io'
    },
    items: [
      { productId: 'prod-012', name: 'Minimal Mechanical Keyboard (CNC Case)', price: 240, quantity: 1, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-028', name: 'Balanced USB-C Studio DAC & Headphone Amp', price: 165, quantity: 1, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 405,
    discount: 40.50,
    tax: 36.45,
    shipping: 0,
    total: 400.95,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-05-18T19:30:00Z',
    shippingAddress: {
      street: '555 Mission St, Suite 2100',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'United States'
    },
    trackingNumber: 'MN-TRK-990123',
    notes: ''
  },
  {
    id: 'ORD-98227',
    customer: {
      id: 'cust-14',
      name: 'Matteo Rossi',
      email: 'matteo.rossi@milanoindustrial.it'
    },
    items: [
      { productId: 'prod-007', name: 'Minimalist Chelsea Boot in Matte Calfskin', price: 340, quantity: 1, image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 340,
    discount: 34,
    tax: 30.60,
    shipping: 0,
    total: 336.60,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-05-29T11:45:00Z',
    shippingAddress: {
      street: 'Via Tortona 31',
      city: 'Milano',
      state: 'Lombardia',
      postalCode: '20144',
      country: 'Italy'
    },
    trackingNumber: 'MN-TRK-111222',
    notes: ''
  },
  {
    id: 'ORD-98228',
    customer: {
      id: 'cust-15',
      name: 'Nadia Benali',
      email: 'nadia.benali@casadesign.ma'
    },
    items: [
      { productId: 'prod-018', name: 'Architectural Geometric Canvas Tote', price: 110, quantity: 1, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-023', name: 'Cast Concrete Desktop Organiser Tray', price: 48, quantity: 1, image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 158,
    discount: 0,
    tax: 14.22,
    shipping: 15,
    total: 187.22,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-06-08T13:20:00Z',
    shippingAddress: {
      street: 'Boulevard d\'Anfa',
      city: 'Casablanca',
      state: 'Casablanca-Settat',
      postalCode: '20000',
      country: 'Morocco'
    },
    trackingNumber: 'MN-TRK-222333',
    notes: ''
  },
  {
    id: 'ORD-98229',
    customer: {
      id: 'cust-19',
      name: 'Zara Patel',
      email: 'zara.patel@austintech.net'
    },
    items: [
      { productId: 'prod-010', name: 'True Wireless Noise-Cancelling Buds', price: 180, quantity: 1, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-029', name: 'Weatherproof Crossbody Tech Sling (5L)', price: 98, quantity: 1, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 278,
    discount: 27.80,
    tax: 25.02,
    shipping: 0,
    total: 275.22,
    status: 'delivered',
    paymentMethod: 'Apple Pay (Simulated)',
    createdAt: '2024-06-19T17:15:00Z',
    shippingAddress: {
      street: '1100 Congress Avenue',
      city: 'Austin',
      state: 'TX',
      postalCode: '78701',
      country: 'United States'
    },
    trackingNumber: 'MN-TRK-333444',
    notes: ''
  },
  {
    id: 'ORD-98230',
    customer: {
      id: 'cust-20',
      name: 'Liam O\'Connor',
      email: 'liam.oconnor@dublincloud.ie'
    },
    items: [
      { productId: 'prod-026', name: 'Dense Fleece Heavyweight Hoodie (500 GSM)', price: 140, quantity: 2, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 280,
    discount: 0,
    tax: 25.20,
    shipping: 0,
    total: 305.20,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-07-02T10:05:00Z',
    shippingAddress: {
      street: '22 Grand Canal Dock',
      city: 'Dublin',
      state: 'Leinster',
      postalCode: 'D02 X260',
      country: 'Ireland'
    },
    trackingNumber: 'MN-TRK-444555',
    notes: ''
  },
  {
    id: 'ORD-98231',
    customer: {
      id: 'cust-21',
      name: 'Yuki Morimoto',
      email: 'yuki.morimoto@kyotocraft.jp'
    },
    items: [
      { productId: 'prod-032', name: 'Chunky Lug-Sole Penny Loafer', price: 275, quantity: 1, image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 275,
    discount: 27.50,
    tax: 24.75,
    shipping: 0,
    total: 272.25,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-07-22T08:30:00Z',
    shippingAddress: {
      street: 'Gion-machi Kitagawa',
      city: 'Higashiyama-ku, Kyoto',
      state: 'Kyoto',
      postalCode: '605-0073',
      country: 'Japan'
    },
    trackingNumber: 'MN-TRK-555666',
    notes: ''
  },
  {
    id: 'ORD-98232',
    customer: {
      id: 'cust-22',
      name: 'Gabriel Santos',
      email: 'gabriel.santos@saopaulodesign.br'
    },
    items: [
      { productId: 'prod-008', name: 'Tactical Neoprene Webbing Slide', price: 95, quantity: 1, image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-001', name: 'Architectural Heavyweight Oversized Tee', price: 68, quantity: 1, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 163,
    discount: 0,
    tax: 14.67,
    shipping: 15,
    total: 192.67,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-08-15T20:10:00Z',
    shippingAddress: {
      street: 'Rua Oscar Freire, 900',
      city: 'São Paulo',
      state: 'SP',
      postalCode: '01426-001',
      country: 'Brazil'
    },
    trackingNumber: 'MN-TRK-666777',
    notes: ''
  },
  {
    id: 'ORD-98233',
    customer: {
      id: 'cust-01',
      name: 'Alexander Wright',
      email: 'alexander.wright@archdesign.com'
    },
    items: [
      { productId: 'prod-030', name: 'Brutalist Matte Cast Iron Wall Mirror', price: 180, quantity: 1, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 180,
    discount: 0,
    tax: 16.20,
    shipping: 0,
    total: 196.20,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-08-29T14:40:00Z',
    shippingAddress: {
      street: '420 West Broadway, Loft 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10012',
      country: 'United States'
    },
    trackingNumber: 'MN-TRK-777888',
    notes: ''
  },
  {
    id: 'ORD-98234',
    customer: {
      id: 'cust-03',
      name: 'Kenji Takahashi',
      email: 'kenji.takahashi@tokyostudio.jp'
    },
    items: [
      { productId: 'prod-031', name: 'Structured Camp-Collar Poplin Shirt', price: 115, quantity: 2, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 230,
    discount: 23,
    tax: 20.70,
    shipping: 0,
    total: 227.70,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-09-08T09:20:00Z',
    shippingAddress: {
      street: '5-7-2 Minami-Aoyama',
      city: 'Minato-ku, Tokyo',
      state: 'Tokyo',
      postalCode: '107-0062',
      country: 'Japan'
    },
    trackingNumber: 'MN-TRK-888999',
    notes: ''
  },
  {
    id: 'ORD-98235',
    customer: {
      id: 'cust-09',
      name: 'Sofia Al-Mansoor',
      email: 'sofia.mansoor@dubaicreative.ae'
    },
    items: [
      { productId: 'prod-002', name: 'Brutalist Tailored Wool Blazer', price: 320, quantity: 1, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-007', name: 'Minimalist Chelsea Boot in Matte Calfskin', price: 340, quantity: 1, image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 660,
    discount: 66,
    tax: 59.40,
    shipping: 0,
    total: 653.40,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-09-24T16:15:00Z',
    shippingAddress: {
      street: 'Building 7, Dubai Design District',
      city: 'Dubai',
      state: 'Dubai',
      postalCode: '00000',
      country: 'United Arab Emirates'
    },
    trackingNumber: 'MN-TRK-999000',
    notes: ''
  },
  {
    id: 'ORD-98236',
    customer: {
      id: 'cust-06',
      name: 'Siddharth Mehta',
      email: 'siddharth.mehta@designcore.in'
    },
    items: [
      { productId: 'prod-009', name: 'Studio Master Planar Magnetic Headphones', price: 450, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 450,
    discount: 0,
    tax: 40.50,
    shipping: 0,
    total: 490.50,
    status: 'delivered',
    paymentMethod: 'Bank Transfer (Simulated)',
    createdAt: '2024-10-02T11:00:00Z',
    shippingAddress: {
      street: 'B-402 Bandra Kurla Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400051',
      country: 'India'
    },
    trackingNumber: 'MN-TRK-101112',
    notes: ''
  },
  {
    id: 'ORD-98237',
    customer: {
      id: 'cust-18',
      name: 'Kasper Schmeichel',
      email: 'kasper.cph@nordicliving.dk'
    },
    items: [
      { productId: 'prod-017', name: 'Modular Ballistic Nylon Commuter Pack (24L)', price: 260, quantity: 1, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-027', name: 'Retrograde Runner in Monochrome Suede', price: 175, quantity: 1, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 435,
    discount: 43.50,
    tax: 39.15,
    shipping: 0,
    total: 430.65,
    status: 'delivered',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-10-10T14:30:00Z',
    shippingAddress: {
      street: 'Bredgade 28',
      city: 'Copenhagen',
      state: 'Capital Region',
      postalCode: '1260',
      country: 'Denmark'
    },
    trackingNumber: 'MN-TRK-212223',
    notes: ''
  },
  {
    id: 'ORD-98238',
    customer: {
      id: 'cust-19',
      name: 'Zara Patel',
      email: 'zara.patel@austintech.net'
    },
    items: [
      { productId: 'prod-013', name: 'Sector 01 Automatic Minimalist Watch', price: 520, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 520,
    discount: 52,
    tax: 46.80,
    shipping: 0,
    total: 514.80,
    status: 'shipped',
    paymentMethod: 'Apple Pay (Simulated)',
    createdAt: '2024-10-18T18:00:00Z',
    shippingAddress: {
      street: '1100 Congress Avenue',
      city: 'Austin',
      state: 'TX',
      postalCode: '78701',
      country: 'United States'
    },
    trackingNumber: 'MN-TRK-323334',
    notes: 'Signature required upon delivery.'
  },
  {
    id: 'ORD-98239',
    customer: {
      id: 'cust-04',
      name: 'Marcus Vance',
      email: 'marcus.vance@vancemedia.co'
    },
    items: [
      { productId: 'prod-025', name: 'Technical 3-Layer Storm Shell Jacket', price: 380, quantity: 1, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 380,
    discount: 0,
    tax: 34.20,
    shipping: 0,
    total: 414.20,
    status: 'shipped',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-10-20T09:40:00Z',
    shippingAddress: {
      street: '742 Evergreen Terrace',
      city: 'Portland',
      state: 'OR',
      postalCode: '97201',
      country: 'United States'
    },
    trackingNumber: 'MN-TRK-434445',
    notes: ''
  },
  {
    id: 'ORD-98240',
    customer: {
      id: 'cust-02',
      name: 'Elena Rostova',
      email: 'elena.rostova@berlinart.de'
    },
    items: [
      { productId: 'prod-005', name: 'Monolith High-Top Vulcanized Sneaker', price: 210, quantity: 1, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-001', name: 'Architectural Heavyweight Oversized Tee', price: 68, quantity: 1, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 278,
    discount: 0,
    tax: 25.02,
    shipping: 0,
    total: 303.02,
    status: 'shipped',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-10-21T12:15:00Z',
    shippingAddress: {
      street: 'Torstraße 118',
      city: 'Berlin',
      state: 'Berlin',
      postalCode: '10119',
      country: 'Germany'
    },
    trackingNumber: 'MN-TRK-545556',
    notes: ''
  },
  {
    id: 'ORD-98241',
    customer: {
      id: 'cust-05',
      name: 'Chloe Laurent',
      email: 'chloe.laurent@parisatelier.fr'
    },
    items: [
      { productId: 'prod-026', name: 'Dense Fleece Heavyweight Hoodie (500 GSM)', price: 140, quantity: 1, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-020', name: 'Precision Anodized Cardholder Wallet', price: 65, quantity: 1, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 205,
    discount: 20.50,
    tax: 18.45,
    shipping: 0,
    total: 202.95,
    status: 'processing',
    paymentMethod: 'Apple Pay (Simulated)',
    createdAt: '2024-10-22T16:00:00Z',
    shippingAddress: {
      street: '14 Rue de Turenne',
      city: 'Paris',
      state: 'Île-de-France',
      postalCode: '75004',
      country: 'France'
    },
    trackingNumber: '',
    notes: 'Fulfilling from EU Central Hub'
  },
  {
    id: 'ORD-98242',
    customer: {
      id: 'cust-10',
      name: 'Oliver King',
      email: 'oliver.king@melbournearch.au'
    },
    items: [
      { productId: 'prod-011', name: 'Cast Aluminum Bluetooth Studio Speaker', price: 360, quantity: 1, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 360,
    discount: 36,
    tax: 32.40,
    shipping: 0,
    total: 356.40,
    status: 'processing',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-10-23T11:20:00Z',
    shippingAddress: {
      street: '12 Flinders Lane',
      city: 'Melbourne',
      state: 'VIC',
      postalCode: '3000',
      country: 'Australia'
    },
    trackingNumber: '',
    notes: ''
  },
  {
    id: 'ORD-98243',
    customer: {
      id: 'cust-11',
      name: 'Mia Chen',
      email: 'mia.chen@shanghaiforward.cn'
    },
    items: [
      { productId: 'prod-012', name: 'Minimal Mechanical Keyboard (CNC Case)', price: 240, quantity: 1, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 240,
    discount: 0,
    tax: 21.60,
    shipping: 0,
    total: 261.60,
    status: 'processing',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-10-24T08:10:00Z',
    shippingAddress: {
      street: '333 Nanjing West Road',
      city: 'Shanghai',
      state: 'Shanghai',
      postalCode: '200041',
      country: 'China'
    },
    trackingNumber: '',
    notes: ''
  },
  {
    id: 'ORD-98244',
    customer: {
      id: 'cust-13',
      name: 'Grace Hopper',
      email: 'grace.h@cyberfoundry.io'
    },
    items: [
      { productId: 'prod-009', name: 'Studio Master Planar Magnetic Headphones', price: 450, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 450,
    discount: 45,
    tax: 40.50,
    shipping: 0,
    total: 445.50,
    status: 'pending',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-10-25T14:45:00Z',
    shippingAddress: {
      street: '555 Mission St, Suite 2100',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'United States'
    },
    trackingNumber: '',
    notes: 'Awaiting warehouse pick list assignment.'
  },
  {
    id: 'ORD-98245',
    customer: {
      id: 'cust-17',
      name: 'Hannah Abbott',
      email: 'hannah.abbott@londonbotanics.co.uk'
    },
    items: [
      { productId: 'prod-004', name: 'Ribbed Merino Wool Mock-Neck', price: 160, quantity: 1, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80' },
      { productId: 'prod-024', name: 'Smoked Vetiver & Hinoki Wood Soy Candle', price: 42, quantity: 1, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 202,
    discount: 0,
    tax: 18.18,
    shipping: 0,
    total: 220.18,
    status: 'pending',
    paymentMethod: 'Apple Pay (Simulated)',
    createdAt: '2024-10-25T18:20:00Z',
    shippingAddress: {
      street: '15 Highbury Place',
      city: 'London',
      state: 'Greater London',
      postalCode: 'N5 1QP',
      country: 'United Kingdom'
    },
    trackingNumber: '',
    notes: 'Awaiting stock verification.'
  },
  {
    id: 'ORD-98246',
    customer: {
      id: 'cust-14',
      name: 'Matteo Rossi',
      email: 'matteo.rossi@milanoindustrial.it'
    },
    items: [
      { productId: 'prod-006', name: 'Commando Sole Leather Derby Shoes', price: 295, quantity: 1, image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 295,
    discount: 0,
    tax: 26.55,
    shipping: 0,
    total: 321.55,
    status: 'pending',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-10-26T04:10:00Z',
    shippingAddress: {
      street: 'Via Tortona 31',
      city: 'Milano',
      state: 'Lombardia',
      postalCode: '20144',
      country: 'Italy'
    },
    trackingNumber: '',
    notes: 'Recent new order.'
  },
  {
    id: 'ORD-98247',
    customer: {
      id: 'cust-16',
      name: 'Devon Thorne',
      email: 'devon.thorne@torontoresearch.ca'
    },
    items: [
      { productId: 'prod-028', name: 'Balanced USB-C Studio DAC & Headphone Amp', price: 165, quantity: 1, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 165,
    discount: 0,
    tax: 14.85,
    shipping: 15,
    total: 194.85,
    status: 'cancelled',
    paymentMethod: 'Credit Card (Simulated)',
    createdAt: '2024-10-26T06:00:00Z',
    shippingAddress: {
      street: '180 Queen Street West',
      city: 'Toronto',
      state: 'ON',
      postalCode: 'M5V 3X3',
      country: 'Canada'
    },
    trackingNumber: '',
    notes: 'Payment authorization timeout.'
  }
];
