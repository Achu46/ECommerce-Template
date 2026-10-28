import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { INITIAL_CATEGORIES } from '../data/initialCategories';
import { INITIAL_ORDERS } from '../data/initialOrders';
import { INITIAL_CUSTOMERS } from '../data/initialCustomers';
import { INITIAL_COUPONS } from '../data/initialCoupons';
import { INITIAL_BANNERS, INITIAL_SETTINGS } from '../data/initialBanners';
import { INITIAL_REVIEWS } from '../data/initialReviews';
import { INITIAL_OFFERS } from '../data/initialOffers';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [products, setProducts] = useLocalStorage('mono_products', INITIAL_PRODUCTS);
  const [categories, setCategories] = useLocalStorage('mono_categories', INITIAL_CATEGORIES);
  const [orders, setOrders] = useLocalStorage('mono_orders', INITIAL_ORDERS);
  const [customers, setCustomers] = useLocalStorage('mono_customers', INITIAL_CUSTOMERS);
  const [coupons, setCoupons] = useLocalStorage('mono_coupons', INITIAL_COUPONS);
  const [banners, setBanners] = useLocalStorage('mono_banners', INITIAL_BANNERS);
  const [settings, setSettings] = useLocalStorage('mono_settings', INITIAL_SETTINGS);
  const [reviews, setReviews] = useLocalStorage('mono_reviews', INITIAL_REVIEWS);
  const [offers, setOffers] = useLocalStorage('mono_offers', INITIAL_OFFERS);
  const [isOfferEnabled, setIsOfferEnabled] = useLocalStorage('mono_offer_enabled', true);

  // PRODUCT CRUD
  const addProduct = (newProduct) => {
    const id = `prod-${Date.now()}`;
    const product = {
      id,
      sku: newProduct.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: 5.0,
      reviewsCount: 1,
      isOnSale: newProduct.price < (newProduct.originalPrice || newProduct.price),
      isNew: true,
      images: newProduct.images?.length ? newProduct.images : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'],
      features: newProduct.features || [],
      ...newProduct,
    };
    setProducts((prev) => [product, ...prev]);
    return product;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // CATEGORY CRUD
  const addCategory = (newCat) => {
    const id = `cat-${Date.now()}`;
    const cat = { id, subcategories: [], ...newCat };
    setCategories((prev) => [...prev, cat]);
    return cat;
  };

  const updateCategory = (id, updatedFields) => {
    setCategories((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  // ORDER ACTIONS
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId ? { ...ord, status: newStatus } : ord
      )
    );
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      trackingNumber: `MN-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
      ...orderData,
    };

    // Deduct inventory
    if (orderData.items && orderData.items.length) {
      setProducts((prev) =>
        prev.map((p) => {
          const item = orderData.items.find((i) => i.productId === p.id);
          if (item) {
            const nextStock = Math.max(0, p.stock - item.quantity);
            return { ...p, stock: nextStock };
          }
          return p;
        })
      );
    }

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  // CUSTOMER ACTIONS
  const toggleCustomerStatus = (id) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
      )
    );
  };

  const addCustomer = (customerData) => {
    const id = `cust-${Date.now()}`;
    const newCust = {
      id,
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalSpent: 0,
      ...customerData
    };
    setCustomers((prev) => [newCust, ...prev]);
    return newCust;
  };

  // COUPON CRUD
  const addCoupon = (coupon) => {
    const id = `coup-${Date.now()}`;
    const newCoup = { id, usageCount: 0, status: 'active', ...coupon };
    setCoupons((prev) => [...prev, newCoup]);
    return newCoup;
  };

  const updateCoupon = (id, updatedFields) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
  };

  const deleteCoupon = (id) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  // BANNER CRUD
  const addBanner = (banner) => {
    const id = `ban-${Date.now()}`;
    const newBanner = { id, status: 'active', ...banner };
    setBanners((prev) => [...prev, newBanner]);
    return newBanner;
  };

  const updateBanner = (id, updatedFields) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
  };

  const deleteBanner = (id) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  // REVIEWS CRUD
  const addReview = (reviewData) => {
    const id = `rev-${Date.now()}`;
    const newRev = {
      id,
      date: new Date().toISOString().split('T')[0],
      status: 'approved',
      verifiedPurchase: true,
      rating: 5,
      ...reviewData
    };
    setReviews((prev) => [newRev, ...prev]);
    return newRev;
  };

  const updateReview = (id, updatedFields) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedFields } : r))
    );
  };

  const deleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleReviewStatus = (id, newStatus) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  // OFFERS CRUD
  const addOffer = (offerData) => {
    const id = `offer-${Date.now()}`;
    const newOffer = {
      id,
      status: 'scheduled',
      days: 1,
      hours: 24,
      minutes: 0,
      seconds: 0,
      autoReset: true,
      ...offerData
    };
    setOffers((prev) => [newOffer, ...prev]);
    return newOffer;
  };

  const updateOffer = (id, updatedFields) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...updatedFields } : o))
    );
  };

  const deleteOffer = (id) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  const setActiveOffer = (id) => {
    setOffers((prev) =>
      prev.map((o) => ({
        ...o,
        status: o.id === id ? 'active' : (o.status === 'active' ? 'ended' : o.status)
      }))
    );
  };

  const toggleOfferEnabled = (val) => {
    setIsOfferEnabled((prev) => (typeof val === 'boolean' ? val : !prev));
  };

  const toggleOfferStatus = (id) => {
    setOffers((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          const nextStatus = o.status === 'disabled' ? 'active' : 'disabled';
          return { ...o, status: nextStatus };
        }
        return o;
      })
    );
  };

  const activeOffer = useMemo(() => {
    if (!isOfferEnabled) return null;
    const found = offers.find((o) => o.status === 'active');
    return found || offers[0] || null;
  }, [offers, isOfferEnabled]);

  // SETTINGS
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // RESET DEMO DATA
  const resetDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setCoupons(INITIAL_COUPONS);
    setBanners(INITIAL_BANNERS);
    setSettings(INITIAL_SETTINGS);
    setReviews(INITIAL_REVIEWS);
    setOffers(INITIAL_OFFERS);
    window.localStorage.removeItem('mono_cart');
    window.localStorage.removeItem('mono_wishlist');
    return true;
  };

  // COMPUTED ANALYTICS (strictly derived from active data)
  const analytics = useMemo(() => {
    const validOrders = orders.filter((o) => o.status !== 'cancelled');
    const totalRevenue = validOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalOrdersCount = orders.length;
    const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
    const processingOrdersCount = orders.filter((o) => o.status === 'processing').length;
    const shippedOrdersCount = orders.filter((o) => o.status === 'shipped').length;
    const deliveredOrdersCount = orders.filter((o) => o.status === 'delivered').length;
    const cancelledOrdersCount = orders.filter((o) => o.status === 'cancelled').length;

    const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 10);
    const outOfStockProducts = products.filter((p) => p.stock === 0);

    const averageOrderValue = validOrders.length > 0 ? totalRevenue / validOrders.length : 0;

    // Monthly revenue & order count aggregation for last 12 months
    const monthlyMap = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Initialize months in sequence
    months.forEach((m) => {
      monthlyMap[m] = { month: m, revenue: 0, orders: 0, average: 0 };
    });

    validOrders.forEach((o) => {
      const d = new Date(o.createdAt);
      if (!isNaN(d.getTime())) {
        const monthName = months[d.getMonth()];
        if (monthlyMap[monthName]) {
          monthlyMap[monthName].revenue += Math.round(o.total || 0);
          monthlyMap[monthName].orders += 1;
        }
      }
    });

    const monthlySales = Object.values(monthlyMap).map((m) => ({
      ...m,
      average: m.orders > 0 ? Math.round(m.revenue / m.orders) : 0
    }));

    // Top selling products calculated from valid orders
    const salesMap = {};
    validOrders.forEach((order) => {
      order.items?.forEach((item) => {
        if (!salesMap[item.productId]) {
          salesMap[item.productId] = {
            productId: item.productId,
            name: item.name,
            unitsSold: 0,
            revenue: 0,
            image: item.image
          };
        }
        salesMap[item.productId].unitsSold += (item.quantity || 1);
        salesMap[item.productId].revenue += (item.price * (item.quantity || 1));
      });
    });

    const topSellers = Object.values(salesMap)
      .sort((a, b) => b.unitsSold - a.unitsSold)
      .slice(0, 5);

    // Category distribution
    const categoryRevenueMap = {};
    validOrders.forEach((order) => {
      order.items?.forEach((item) => {
        const product = products.find((p) => p.id === item.productId);
        const cat = product?.category || 'Other';
        categoryRevenueMap[cat] = (categoryRevenueMap[cat] || 0) + (item.price * (item.quantity || 1));
      });
    });

    const categoryDistribution = Object.entries(categoryRevenueMap).map(([name, value]) => ({
      name,
      value: Math.round(value)
    }));

    return {
      totalRevenue,
      totalOrdersCount,
      pendingOrdersCount,
      processingOrdersCount,
      shippedOrdersCount,
      deliveredOrdersCount,
      cancelledOrdersCount,
      lowStockProducts,
      outOfStockProducts,
      averageOrderValue,
      monthlySales,
      topSellers,
      categoryDistribution
    };
  }, [orders, products]);

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        orders,
        customers,
        coupons,
        banners,
        settings,
        reviews,
        offers,
        activeOffer,
        isOfferEnabled,
        toggleOfferEnabled,
        setIsOfferEnabled,
        toggleOfferStatus,
        analytics,
        // Product Actions
        addProduct,
        updateProduct,
        deleteProduct,
        // Category Actions
        addCategory,
        updateCategory,
        deleteCategory,
        // Order Actions
        updateOrderStatus,
        addOrder,
        // Customer Actions
        toggleCustomerStatus,
        addCustomer,
        // Coupon Actions
        addCoupon,
        updateCoupon,
        deleteCoupon,
        // Banner Actions
        addBanner,
        updateBanner,
        deleteBanner,
        // Review Actions
        addReview,
        updateReview,
        deleteReview,
        toggleReviewStatus,
        // Offer Actions
        addOffer,
        updateOffer,
        deleteOffer,
        setActiveOffer,
        // Settings & Reset
        updateSettings,
        resetDemoData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
