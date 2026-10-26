# MONO™ — Monochrome E-Commerce Storefront & Admin Command Architecture

A client-ready, fully responsive e-commerce storefront and admin dashboard engineered with **React 18**, **Vite**, **Tailwind CSS**, **React Router DOM v6**, **Lucide React**, **Recharts**, and **Framer Motion**, powered by **LocalStorage** for multi-session persistence.

---

## 🖤 Design System: Strict Monochrome

The entire application adheres to a strict black & white design token palette with **zero accent colors** (no indigo, blue, green, amber, or red):

| Token | Hex Value | Usage |
|---|---|---|
| **Background** | `#FFFFFF` | Global page background |
| **Surface / Card** | `#FFFFFF` | Card surfaces with 1px border `#E5E5E5` |
| **Subtle Surface** | `#F5F5F5` | Section accents, table headers, hover states |
| **Primary Text** | `#0A0A0A` | Headings, titles, high-contrast labels |
| **Secondary Text** | `#525252` | Subtitles, descriptions, secondary data |
| **Muted Text** | `#A3A3A3` | Placeholders, inactive hints |
| **Borders** | `#E5E5E5` / `#0A0A0A` | Subtle dividers and strong geometric accents |
| **Primary Action** | `#0A0A0A` | White text; hover `#262626`; active `#000000` |
| **Secondary Action** | `#FFFFFF` | 1px black border, black text; hover `#F5F5F5` |
| **Focus Ring** | `2px #0A0A0A` | 2px offset on all keyboard-focused interactive items |
| **Disabled** | `#E5E5E5` / `#A3A3A3` | Background `#E5E5E5`, text `#A3A3A3` |

### Visual Status Rules Without Color:
- **Pending**: Light-gray fill (`#F5F5F5`) + solid border + `Clock` icon.
- **Processing**: White fill + dashed border (`border-dashed border-[#0A0A0A]`) + `RotateCcw` icon.
- **Shipped**: Double/thick outline (`border-2 border-[#0A0A0A]`) + `Truck` icon.
- **Delivered**: Solid black fill (`bg-[#0A0A0A] text-white`) + `CheckCircle2` icon.
- **Cancelled**: Strikethrough text (`line-through`) + light-gray fill + `XCircle` icon.
- **Form Errors**: High-contrast black text with a **bold left border** (`border-l-4 border-[#0A0A0A]`) and `AlertCircle` icon (never red).
- **Charts (Recharts)**: Grayscale series only (`#0A0A0A`, `#525252`, `#A3A3A3`, `#D4D4D4`), dash patterns, circular/square markers, monochrome tooltips and legends.
- **Image Fallback**: Light-gray block with a subtle grayscale filter and a Lucide `ImageOff` icon.

---

## 🛠 Tech Stack

- **Framework**: React 18.3.1
- **Bundler & Dev Server**: Vite 5.4.10
- **Styling**: Tailwind CSS 3.4.15 with custom monochrome tokens
- **Routing**: React Router DOM 6.28.0 (Browser router with layouts and guards)
- **Icons**: Lucide React 0.460.0
- **Data Visualization**: Recharts 2.13.3 (Grayscale custom themes & tooltips)
- **Animations**: Framer Motion 11.11.17
- **Persistence**: Browser `LocalStorage` (`mono_products`, `mono_orders`, `mono_cart`, `mono_wishlist`, `mono_categories`, `mono_customers`, `mono_coupons`, `mono_banners`, `mono_settings`)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminSidebar.jsx       # Responsive drawer / icon rail / expanded sidebar
│   │   ├── AdminTopbar.jsx        # Search, alerts popover, profile, mobile toggle
│   │   └── MetricCard.jsx         # KPI statistic cards in monochrome
│   ├── shared/
│   │   ├── CartDrawer.jsx         # Slide-over cart with free shipping meter & coupon input
│   │   ├── DemoBadge.jsx          # Top persistent portfolio demonstration notice
│   │   ├── Footer.jsx             # Sitemap, guarantees, and newsletter form
│   │   ├── Navbar.jsx             # Responsive store header with search, cart, wishlist
│   │   └── SearchModal.jsx        # Fast instant search modal (Cmd+K / Click)
│   ├── store/
│   │   ├── FilterDrawer.jsx       # Slide-up/side drawer for sorting & multi-facet filters
│   │   ├── ProductCard.jsx        # Responsive card with wishlist & quick add
│   │   └── ProductRating.jsx      # Grayscale star rendering & reviews count
│   └── ui/
│       ├── Badge.jsx              # Status badges without color (shape/fill/icon)
│       ├── Button.jsx             # Accessible button with 44px min touch target
│       ├── ConfirmDialog.jsx      # Confirmation modal for destructive workflows
│       ├── Drawer.jsx             # Off-canvas slide-out panels (accessible with ESC)
│       ├── EmptyState.jsx         # Empty state placeholder with action CTA
│       ├── Input.jsx              # Form input with bold left-border error callout
│       ├── Modal.jsx              # Bottom sheet on mobile, dialog on desktop
│       ├── Pagination.jsx         # Accessible page controls
│       ├── ProductImage.jsx       # Image with graceful fallback to ImageOff placeholder
│       ├── Select.jsx             # Monochrome select component
│       ├── Skeleton.jsx           # Shimmering loading skeletons
│       └── Textarea.jsx           # Form textarea with inline error callout
├── context/
│   ├── AuthContext.jsx            # User state, role checking ('admin' | 'customer'), demo logins
│   ├── CartContext.jsx            # Cart items, coupon application, tax, free shipping
│   ├── DataContext.jsx            # Central store: products, orders, categories, analytics
│   ├── ToastContext.jsx           # Accessible monochrome toast notifications
│   └── WishlistContext.jsx        # Saved items registry
├── data/
│   ├── initialBanners.js          # Hero and promotional editorial banners
│   ├── initialCategories.js       # 6 categories with subcategories
│   ├── initialCoupons.js          # 5 coupon codes (MONO10, WELCOME20, VIP50, etc.)
│   ├── initialCustomers.js        # 22 customer records with addresses & spend
│   ├── initialOrders.js           # 44 orders distributed across 12 months & all statuses
│   └── initialProducts.js         # 32 products with high-res Unsplash photography
├── hooks/
│   ├── useDebounce.js             # Input debouncing hook
│   ├── useLocalStorage.js         # Safe LocalStorage synchronization hook
│   └── useMediaQuery.js           # Responsive viewport match media hook
├── layouts/
│   ├── AdminLayout.jsx            # Guarded admin shell with sidebar and topbar
│   └── StoreLayout.jsx            # Customer storefront layout with sticky navbar
├── pages/
│   ├── admin/
│   │   ├── AdminAnalyticsPage.jsx   # Volume and basket trend reports
│   │   ├── AdminBannersPage.jsx     # Visual merchandising editor
│   │   ├── AdminCategoriesPage.jsx  # Category CRUD
│   │   ├── AdminCustomersPage.jsx   # Patron registry & spending history
│   │   ├── AdminInventoryPage.jsx   # Stock tracking & instant restock controls
│   │   ├── AdminOrdersPage.jsx      # Consignment pipeline & status updates
│   │   ├── AdminOverviewPage.jsx    # Real-time computed revenue, charts, top sellers
│   │   ├── AdminProductsPage.jsx    # Product CRUD with search, filter, pagination
│   │   └── AdminSettingsPage.jsx    # Configuration & factory reset demo state
│   ├── store/
│   │   ├── AboutPage.jsx            # Architectural manifesto
│   │   ├── AccountPage.jsx          # Profile details & personal order history
│   │   ├── CartPage.jsx             # Full cart review with free shipping meter
│   │   ├── CheckoutPage.jsx         # Form validation & simulated payment
│   │   ├── ContactPage.jsx          # Concierge communication form
│   │   ├── FAQPage.jsx              # Expandable knowledge base
│   │   ├── HomePage.jsx             # Hero, category spotlights, featured curations
│   │   ├── LegalPages.jsx           # Privacy policy & terms of service
│   │   ├── LoginPage.jsx            # Authentication with quick demo fill buttons
│   │   ├── OffersPage.jsx           # Coupon codes showcase & archive sale items
│   │   ├── OrderTrackingPage.jsx    # Consignment telemetry & progress stepper
│   │   ├── ProductDetailPage.jsx    # Gallery, specs, sticky add to bag
│   │   ├── ProductsPage.jsx         # Multi-facet filters, sorting, search
│   │   ├── RegisterPage.jsx         # Client registration
│   │   └── WishlistPage.jsx         # Saved items registry
│   └── NotFoundPage.jsx             # 404 handler
├── routes/
│   └── AppRoutes.jsx              # Central router configuration
├── utils/
│   ├── formatters.js              # Currency, date, and number formatters
│   └── validators.js              # Email, phone, postal code, and positive number validators
├── App.jsx                        # Provider wiring
├── index.css                      # Strict monochrome variables & utility classes
└── main.jsx                       # Entrypoint
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn

### Installation
```bash
# Clone the repository and install dependencies
npm install

# Start the development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
# Compile optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🔑 Demo Access & Credentials

The application is configured with one-click **Quick Fill** buttons on the [Login Page](/login):

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Admin Curator** | `admin@mono.com` | `admin123` | Full access to `/admin` dashboard & storefront |
| **Client Patron** | `alexander.wright@archdesign.com` | `customer123` | Storefront, Wishlist, Checkout, My Account |

> **Notice**: All authentication is simulated locally in browser memory (`localStorage`). You can also register any arbitrary email/password combination on the register page.

---

## 🎯 Active Demo Features

1. **Storefront**:
   - **Catalog Filtering**: Instant search, category and subcategory selection, price slider, rating filter, and in-stock toggle.
   - **Product Detail**: Multi-angle gallery, specifications, customer ratings, real-time inventory count, and sticky bottom purchase bar on mobile.
   - **Cart & Slide-Over Drawer**: Free shipping progress threshold meter, coupon code validator (`MONO10`, `WELCOME20`, `VIP50`, `FREESHIP`), quantity controls, and local persistence.
   - **Wishlist**: Add/remove saved items, transfer available items to bag.
   - **Checkout**: Multi-step checkout with comprehensive input validation (email, phone, required fields), order summary breakdown, and simulated payment gateway.
   - **Order Tracking**: Search by Order ID (`ORD-98214`) or Tracking Code with a real-time progress stepper.

2. **Admin Command (`/admin`)**:
   - **Executive Overview**: Computed revenue, order volume, catalog inventory, and patron count computed dynamically from the active order book.
   - **Grayscale Recharts**: 12-month revenue trajectory area chart and category share horizontal bar chart.
   - **Artifacts (Products) CRUD**: Add, edit, and delete products with image preview, SKU, stock count, and price. Includes confirmation modals for destructive deletion.
   - **Consignment Orders**: Real-time status update dropdowns (`Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`) with order inspection modal.
   - **Inventory Management**: Real-time stock alerts for low stock (≤10) and sold-out items (0), with instant `+5`, `+25`, and `-1` adjustment controls.
   - **Promotion Codes**: Issue new percentage or fixed discount coupons, set minimum spend, and toggle active/expired states.
   - **Factory Reset**: "Reset Seed Data" button under Admin Settings completely clears user-created edits and restores the original 32 products, 44 orders, and 22 patrons.

---

## 📱 Responsive Layout Matrix

Tested across all requested viewport breakpoints without horizontal scroll or clipping:
- **Mobile (360px, 375px, 414px)**: 2-column product grid, touch targets ≥ 44×44px, bottom-sheet modals, off-canvas navigation and filter drawers, sticky mobile purchase bar.
- **Tablet (640px - 1023px)**: 3-column product grid, collapsed admin icon rail, slide-out cart drawer.
- **Desktop (1024px, 1280px, 1536px)**: 4-column product grid, expanded collapsible admin sidebar, side-by-side product detail gallery and sticky summary bars.

---

## 🛡 Demo vs. Production Transparency

- **Payments**: Labeled as **Simulated Mock Sandbox**. No real credit card or bank transfers are processed.
- **Orders**: Orders placed during testing are saved to your browser's `LocalStorage` and immediately appear in the admin order book.
- **Reset**: Tapping **Reset Seed Data** in the top demo banner or inside the Admin Settings restores initial factory data.

---

## 📄 License
Released for evaluation and portfolio demonstration under the MIT License.
