export const INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    sku: 'APP-OVT-001',
    name: 'Architectural Heavyweight Oversized Tee',
    category: 'Apparel',
    subcategory: 'T-Shirts & Tops',
    price: 68,
    originalPrice: 85,
    stock: 42,
    rating: 4.8,
    reviewsCount: 124,
    isFeatured: true,
    isNew: false,
    isOnSale: true,
    description: 'Crafted from 320 GSM combed organic cotton with a structured boxy drape, drop-shoulder geometry, and reinforced ribbed collar. Designed to maintain structural silhouette wash after wash.',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['320 GSM Organic Cotton', 'Pre-shrunk treatment', 'Blind stitch hems', 'Unisex relaxed silhouette']
  },
  {
    id: 'prod-002',
    sku: 'APP-BLZ-002',
    name: 'Brutalist Tailored Wool Blazer',
    category: 'Apparel',
    subcategory: 'Outerwear',
    price: 320,
    originalPrice: 320,
    stock: 14,
    rating: 4.9,
    reviewsCount: 56,
    isFeatured: true,
    isNew: true,
    isOnSale: false,
    description: 'Single-breasted wool blazer with concealed horn buttons, unstructured soft shoulders, and clean interior taped seams. Bridges formal rigor with modular daily wear.',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['100% Virgin Wool', 'Cupro lining', 'Interior passport pocket', 'Notch lapel']
  },
  {
    id: 'prod-003',
    sku: 'APP-TRS-003',
    name: 'Pleated Wide-Leg Wool Trousers',
    category: 'Apparel',
    subcategory: 'Trousers',
    price: 185,
    originalPrice: 220,
    stock: 28,
    rating: 4.7,
    reviewsCount: 89,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    description: 'Deep double pleats create dramatic movement through a relaxed wide leg. Features side adjusters for a tailored waistline without needing a belt.',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['High-rise fit', 'Double front pleats', 'Corozo button closure', 'Dry clean recommended']
  },
  {
    id: 'prod-004',
    sku: 'APP-KNT-004',
    name: 'Ribbed Merino Wool Mock-Neck',
    category: 'Apparel',
    subcategory: 'Knitwear',
    price: 160,
    originalPrice: 160,
    stock: 8,
    rating: 4.9,
    reviewsCount: 42,
    isFeatured: true,
    isNew: true,
    isOnSale: false,
    description: 'Fine-gauge extra-fine Australian merino wool spun in Italy. Breathable thermal regulation with zero scratchiness and an engineered snug collar.',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['19.5 Micron Merino', 'Thermal balancing', 'Seamless tubular knit', 'Ribbed cuffs & hem']
  },
  {
    id: 'prod-005',
    sku: 'FTW-SNK-001',
    name: 'Monolith High-Top Vulcanized Sneaker',
    category: 'Footwear',
    subcategory: 'Sneakers',
    price: 210,
    originalPrice: 210,
    stock: 35,
    rating: 4.8,
    reviewsCount: 164,
    isFeatured: true,
    isNew: false,
    isOnSale: false,
    description: 'Constructed from heavy 16oz duck canvas vulcanized to an engineered rubber sole with high foxing tape. Features an anatomical memory foam insole.',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Vulcanized construction', 'High foxing rubber sole', 'Ergonomic footbed', 'Waxed cotton laces']
  },
  {
    id: 'prod-006',
    sku: 'FTW-DER-002',
    name: 'Commando Sole Leather Derby Shoes',
    category: 'Footwear',
    subcategory: 'Loafers & Derbies',
    price: 295,
    originalPrice: 340,
    stock: 12,
    rating: 4.9,
    reviewsCount: 78,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    description: 'Handmade in Tuscany using full-grain box calf leather and Goodyear welted to a rugged Vibram commando lug sole for all-weather grip.',
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Goodyear Welted', 'Full-Grain Box Calf', 'Vibram Commando Lug', 'Leather lined']
  },
  {
    id: 'prod-007',
    sku: 'FTW-BOT-003',
    name: 'Minimalist Chelsea Boot in Matte Calfskin',
    category: 'Footwear',
    subcategory: 'Boots',
    price: 340,
    originalPrice: 340,
    stock: 18,
    rating: 4.7,
    reviewsCount: 52,
    isFeatured: true,
    isNew: true,
    isOnSale: false,
    description: 'Clean shaft design without extraneous panels. Matte finish black calfskin with heavy elastic side gussets and dual woven pull tabs.',
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Concealed welt', 'Supple calfskin lining', 'Reinforced heel counter', 'Natural rubber crepe outsole']
  },
  {
    id: 'prod-008',
    sku: 'FTW-SND-004',
    name: 'Tactical Neoprene Webbing Slide',
    category: 'Footwear',
    subcategory: 'Sandals',
    price: 95,
    originalPrice: 120,
    stock: 24,
    rating: 4.5,
    reviewsCount: 39,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    description: 'Dual adjustable nylon webbing straps over padded neoprene backing. Contoured antimicrobial EVA footbed for summer comfort.',
    images: [
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Antimicrobial EVA base', 'Nylon web straps', 'Padded neoprene lining', 'Lug traction pattern']
  },
  {
    id: 'prod-009',
    sku: 'AUD-HDP-001',
    name: 'Studio Master Planar Magnetic Headphones',
    category: 'Audio & Tech',
    subcategory: 'Headphones',
    price: 450,
    originalPrice: 450,
    stock: 9,
    rating: 5.0,
    reviewsCount: 94,
    isFeatured: true,
    isNew: true,
    isOnSale: false,
    description: '90mm ultra-thin planar magnetic drivers housed in aircraft-grade anodized matte black aluminum. Delivers pristine acoustic reproduction across 5Hz to 55kHz.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['90mm Planar Drivers', 'Frequency response: 5Hz-55kHz', 'Detachable silver cable', 'Lambskin memory ear pads']
  },
  {
    id: 'prod-010',
    sku: 'AUD-EAR-002',
    name: 'True Wireless Noise-Cancelling Buds',
    category: 'Audio & Tech',
    subcategory: 'Earphones',
    price: 180,
    originalPrice: 220,
    stock: 45,
    rating: 4.6,
    reviewsCount: 210,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    description: 'Hybrid ANC with dual feed-forward mics, IPX5 water resistance, and 36-hour total battery life with Qi wireless charging case.',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Hybrid Active Noise Cancelling', 'Bluetooth 5.3 Multipoint', 'Qi Wireless Fast Charge', 'IPX5 Splash Resistant']
  },
  {
    id: 'prod-011',
    sku: 'AUD-SPK-003',
    name: 'Cast Aluminum Bluetooth Studio Speaker',
    category: 'Audio & Tech',
    subcategory: 'Speakers',
    price: 360,
    originalPrice: 360,
    stock: 15,
    rating: 4.8,
    reviewsCount: 47,
    isFeatured: true,
    isNew: false,
    isOnSale: false,
    description: 'Single-piece die-cast aluminum chassis with dual neodymium woofers and custom acoustic waveguide for 360-degree room filling dispersion.',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Die-cast aluminum body', '60W RMS Class D amp', 'Acoustic waveguide', 'AptX HD support']
  },
  {
    id: 'prod-012',
    sku: 'AUD-KEY-004',
    name: 'Minimal Mechanical Keyboard (CNC Case)',
    category: 'Audio & Tech',
    subcategory: 'Desk Accessories',
    price: 240,
    originalPrice: 280,
    stock: 22,
    rating: 4.9,
    reviewsCount: 112,
    isFeatured: false,
    isNew: true,
    isOnSale: true,
    description: 'Heavy CNC milled aluminum 75% layout keyboard with lubricated linear switches, FR4 plate, and custom monochrome PBT dye-sub keycaps.',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['75% Exploded Layout', 'Hot-swappable PCB', 'Gasket mount structure', 'Custom Monochrome PBT keycaps']
  },
  {
    id: 'prod-013',
    sku: 'TIM-AUT-001',
    name: 'Sector 01 Automatic Minimalist Watch',
    category: 'Timepieces',
    subcategory: 'Automatic',
    price: 520,
    originalPrice: 520,
    stock: 7,
    rating: 5.0,
    reviewsCount: 68,
    isFeatured: true,
    isNew: true,
    isOnSale: false,
    description: 'Japanese Miyota 9015 high-beat automatic movement visible through sapphire exhibition caseback. 38mm bead-blasted 316L surgical steel case.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Miyota 9015 28,800 BPH', 'Double-domed sapphire crystal', '100m Water resistance', 'Horween leather strap']
  },
  {
    id: 'prod-014',
    sku: 'TIM-CHR-002',
    name: 'Monochrome Sub-Dial Chronograph',
    category: 'Timepieces',
    subcategory: 'Chronograph',
    price: 380,
    originalPrice: 420,
    stock: 19,
    rating: 4.7,
    reviewsCount: 83,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    description: 'Mecha-quartz chronograph movement with instant snapback reset. Clean asymmetrical dial with high-contrast printed indices and matte hands.',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Seiko VK64 mecha-quartz', '316L stainless steel', 'Quick-release Milanese mesh', 'Super-LumiNova BGW9']
  },
  {
    id: 'prod-015',
    sku: 'TIM-QTZ-003',
    name: 'Monolithic Bauhaus Slim Quartz',
    category: 'Timepieces',
    subcategory: 'Quartz',
    price: 195,
    originalPrice: 195,
    stock: 31,
    rating: 4.6,
    reviewsCount: 45,
    isFeatured: false,
    isNew: false,
    isOnSale: false,
    description: 'Ultra-thin 6.2mm case profile with high-precision Swiss quartz movement. Clean Bauhaus numerals and recessed minute track.',
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['6.2mm Ultra-slim case', 'Ronda Swiss Quartz', 'Sapphire coated mineral', 'Genuine vegetable tanned leather']
  },
  {
    id: 'prod-016',
    sku: 'TIM-STP-004',
    name: 'Ballistic Textured Rubber Watch Strap',
    category: 'Timepieces',
    subcategory: 'Straps',
    price: 45,
    originalPrice: 55,
    stock: 60,
    rating: 4.8,
    reviewsCount: 37,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    description: 'Fluoroelastomer FKM rubber compound resistant to saltwater, UV, and chemicals. Integrated quick-release spring bars.',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['FKM Vulcanized Rubber', 'Quick-release pins (20mm/22mm)', 'Brushed steel hardware', 'Hypoallergenic']
  },
  {
    id: 'prod-017',
    sku: 'BAG-BPK-001',
    name: 'Modular Ballistic Nylon Commuter Pack (24L)',
    category: 'Bags & Luggage',
    subcategory: 'Backpacks',
    price: 260,
    originalPrice: 260,
    stock: 25,
    rating: 4.9,
    reviewsCount: 142,
    isFeatured: true,
    isNew: true,
    isOnSale: false,
    description: '1680D Cordura ballistic nylon with YKK AquaGuard waterproof zippers. Features a suspended 16" laptop cradle and luggage pass-through handle.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['1680D Cordura Ballistic', 'YKK AquaGuard Zippers', 'Suspended 16-inch laptop pocket', 'Fidlock magnetic sternum buckle']
  },
  {
    id: 'prod-018',
    sku: 'BAG-TOT-002',
    name: 'Architectural Geometric Canvas Tote',
    category: 'Bags & Luggage',
    subcategory: 'Tote Bags',
    price: 110,
    originalPrice: 140,
    stock: 33,
    rating: 4.7,
    reviewsCount: 88,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    description: 'Heavy paraffin-waxed 20oz duck canvas with bridle leather handles. Self-standing structured base that will not sag when loaded.',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['20oz Waxed Canvas', 'English bridle leather', 'Solid copper rivets', 'Internal key lanyard']
  },
  {
    id: 'prod-019',
    sku: 'BAG-DUF-003',
    name: 'Overnight Weekender Holdall (42L)',
    category: 'Bags & Luggage',
    subcategory: 'Duffels',
    price: 290,
    originalPrice: 290,
    stock: 11,
    rating: 4.8,
    reviewsCount: 61,
    isFeatured: true,
    isNew: false,
    isOnSale: false,
    description: 'TSA carry-on compliant holdall with isolated shoe compartment, ventilated laundry pouch, and padded ergonomic seatbelt webbing shoulder strap.',
    images: [
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['TSA Overhead Compliant', 'Isolated shoe garage', 'Waterproof base fabric', 'Padded seatbelt sling']
  },
  {
    id: 'prod-020',
    sku: 'BAG-CRD-004',
    name: 'Precision Anodized Cardholder Wallet',
    category: 'Bags & Luggage',
    subcategory: 'Cardholders',
    price: 65,
    originalPrice: 75,
    stock: 54,
    rating: 4.6,
    reviewsCount: 198,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    description: 'CNC machined 6061-T6 aluminum card slider mechanism with RFID blocking and integrated silicone cash strap. Holds 1 to 6 cards securely.',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['RFID Shielding', 'Quick-draw ejection lever', 'Holds 1-6 embossed cards', 'Weight only 62 grams']
  },
  {
    id: 'prod-021',
    sku: 'LIV-LMP-001',
    name: 'Cast Aluminum Minimalist Task Lamp',
    category: 'Living & Design',
    subcategory: 'Lighting',
    price: 220,
    originalPrice: 220,
    stock: 16,
    rating: 4.9,
    reviewsCount: 73,
    isFeatured: true,
    isNew: true,
    isOnSale: false,
    description: 'Touch-sensitive continuous dimming task light with 97 CRI glare-free diffused LED strip. 360-degree rotational arm with internal counterweight.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['High CRI 97+ LEDs', 'Continuous capacitive dimming', 'Balanced counterweight pivot', 'Braided cloth power cable']
  },
  {
    id: 'prod-022',
    sku: 'LIV-CRM-002',
    name: 'Matte Black Hand-Thrown Ceramic Mug (Set of 2)',
    category: 'Living & Design',
    subcategory: 'Ceramics',
    price: 58,
    originalPrice: 70,
    stock: 38,
    rating: 4.8,
    reviewsCount: 129,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    description: 'Wheel-thrown iron-rich stoneware finished in a velvety satin matte black food-safe glaze. Ergonomic thumb-rest handle with 350ml capacity.',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['High-fire Stoneware', 'Food safe & microwave safe', 'Satin tactile glaze', 'Packaged in recyclable box']
  },
  {
    id: 'prod-023',
    sku: 'LIV-DSK-003',
    name: 'Cast Concrete Desktop Organiser Tray',
    category: 'Living & Design',
    subcategory: 'Desk Objects',
    price: 48,
    originalPrice: 48,
    stock: 29,
    rating: 4.7,
    reviewsCount: 65,
    isFeatured: false,
    isNew: false,
    isOnSale: false,
    description: 'Architectural ultra-high-performance concrete sealed with penetrating matte wax. Features sculpted grooves for pens, cards, and daily EDC gear.',
    images: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['UHPC Concrete', 'Laser-etched cork feet', 'Wax sealed surface', 'Individual natural air void patterns']
  },
  {
    id: 'prod-024',
    sku: 'LIV-CND-004',
    name: 'Smoked Vetiver & Hinoki Wood Soy Candle',
    category: 'Living & Design',
    subcategory: 'Candles',
    price: 42,
    originalPrice: 42,
    stock: 50,
    rating: 4.9,
    reviewsCount: 84,
    isFeatured: false,
    isNew: true,
    isOnSale: false,
    description: 'Poured into a matte ceramic vessel with a crackling FSC-certified cedar wood wick. Notes of cold incense, dried vetiver, and smoky cypress.',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['100% GMO-free soy wax', 'Natural wood wick', '65 hours burn time', 'Reusable ceramic pot']
  },
  {
    id: 'prod-025',
    sku: 'APP-JKT-005',
    name: 'Technical 3-Layer Storm Shell Jacket',
    category: 'Apparel',
    subcategory: 'Outerwear',
    price: 380,
    originalPrice: 420,
    stock: 12,
    rating: 4.9,
    reviewsCount: 46,
    isFeatured: true,
    isNew: true,
    isOnSale: true,
    description: '20,000mm hydrostatic head waterproof membrane with fully taped seams and dual-direction pit zips for active urban microclimate control.',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['20,000mm Waterproofing', 'Fully seam sealed', 'Cohaesive cord-lock hood', 'Reflective tonal detailing']
  },
  {
    id: 'prod-026',
    sku: 'APP-HOO-006',
    name: 'Dense Fleece Heavyweight Hoodie (500 GSM)',
    category: 'Apparel',
    subcategory: 'T-Shirts & Tops',
    price: 140,
    originalPrice: 140,
    stock: 30,
    rating: 4.8,
    reviewsCount: 135,
    isFeatured: false,
    isNew: false,
    isOnSale: false,
    description: 'Custom-knit 500 GSM french terry cotton. Double-layered hood without drawstrings for pure minimalist geometry. Deep kangaroo pouch.',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['500 GSM French Terry', 'Double-layer hood', 'No exposed cords', 'Heavy 2x2 ribbing']
  },
  {
    id: 'prod-027',
    sku: 'FTW-SNK-005',
    name: 'Retrograde Runner in Monochrome Suede',
    category: 'Footwear',
    subcategory: 'Sneakers',
    price: 175,
    originalPrice: 195,
    stock: 20,
    rating: 4.7,
    reviewsCount: 92,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    description: 'Archival 1980s silhouette reimagined in tonal charcoal and pitch black calf suede with an ultra-lightweight EVA midsole.',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Premium Calf Suede', 'Cushioned EVA Midsole', 'Treaded rubber outsole', 'Removable footbed']
  },
  {
    id: 'prod-028',
    sku: 'AUD-DAC-005',
    name: 'Balanced USB-C Studio DAC & Headphone Amp',
    category: 'Audio & Tech',
    subcategory: 'Desk Accessories',
    price: 165,
    originalPrice: 165,
    stock: 14,
    rating: 4.9,
    reviewsCount: 51,
    isFeatured: false,
    isNew: true,
    isOnSale: false,
    description: 'Dual ESS Sabre ES9038Q2M digital-to-analog converters supporting 32-bit/768kHz PCM and DSD512. 4.4mm balanced and 3.5mm single-ended outputs.',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Dual ESS Sabre DACs', 'Up to 32bit/768kHz PCM', '4.4mm Balanced output', 'CNC aluminum enclosure']
  },
  {
    id: 'prod-029',
    sku: 'BAG-SLG-005',
    name: 'Weatherproof Crossbody Tech Sling (5L)',
    category: 'Bags & Luggage',
    subcategory: 'Bags & Luggage',
    price: 98,
    originalPrice: 120,
    stock: 40,
    rating: 4.8,
    reviewsCount: 110,
    isFeatured: true,
    isNew: false,
    isOnSale: true,
    description: 'Designed for daily carry of an iPad Mini, camera, and chargers. Features a quick-release magnetic Fidlock V-buckle and expandable gussets.',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Fidlock magnetic buckle', 'Weatherproof X-Pac fabric', 'Key clip & pen slots', 'Expandable volume']
  },
  {
    id: 'prod-030',
    sku: 'LIV-MIR-005',
    name: 'Brutalist Matte Cast Iron Wall Mirror',
    category: 'Living & Design',
    subcategory: 'Desk Objects',
    price: 180,
    originalPrice: 180,
    stock: 6,
    rating: 4.9,
    reviewsCount: 31,
    isFeatured: false,
    isNew: true,
    isOnSale: false,
    description: 'Cast iron frame with tactile industrial sand-cast texture. High-definition silver mirror plate with shatter-resistant backing.',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Sand-cast Iron Frame', 'Distortion-free glass', 'Integrated flush wall mount', 'Weight 4.2 kg']
  },
  {
    id: 'prod-031',
    sku: 'APP-SRT-007',
    name: 'Structured Camp-Collar Poplin Shirt',
    category: 'Apparel',
    subcategory: 'T-Shirts & Tops',
    price: 115,
    originalPrice: 130,
    stock: 27,
    rating: 4.6,
    reviewsCount: 74,
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    description: 'Crisp Japanese typewriter cotton poplin with a relaxed Cuban collar and straight hem designed to be worn untucked.',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['100% Japanese Typewriter Poplin', 'Camp open collar', 'Matte black buttons', 'Chest patch pocket']
  },
  {
    id: 'prod-032',
    sku: 'FTW-LFR-006',
    name: 'Chunky Lug-Sole Penny Loafer',
    category: 'Footwear',
    subcategory: 'Loafers & Derbies',
    price: 275,
    originalPrice: 275,
    stock: 15,
    rating: 4.8,
    reviewsCount: 81,
    isFeatured: true,
    isNew: true,
    isOnSale: false,
    description: 'Subverting classic collegiate footwear with an architectural 40mm platform cleated sole and glazed box calf upper.',
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['40mm cleated lug outsole', 'Glazed black box calf', 'Traditional penny strap', 'Cushioned calf interior']
  }
];
