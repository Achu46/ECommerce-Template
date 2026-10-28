import React from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Boxes,
  Plus
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useData } from '../../context/DataContext';
import { MetricCard } from '../../components/admin/MetricCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProductImage } from '../../components/ui/ProductImage';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

// Custom strictly monochrome tooltip for Recharts
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white p-3 rounded-btn border border-[#333333] font-mono text-xs shadow-modal">
        <p className="font-bold border-b border-[#333333] pb-1 mb-1.5">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="flex items-center justify-between gap-4 text-[#CCCCCC]">
            <span className="capitalize">{entry.name}:</span>
            <span className="font-bold text-white">
              {entry.name.includes('revenue') || entry.name.includes('Average')
                ? formatCurrency(entry.value)
                : entry.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export function AdminOverviewPage() {
  const { products, orders, customers, analytics } = useData();

  const recentOrders = orders.slice(0, 6);

  return (
    <div className="space-y-8 pb-12 text-[#000000] dark:text-[#FFFFFF]">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DDDDDD] dark:border-[#333333]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#444444] dark:text-[#CCCCCC] block mb-1">
            Telemetry & Financial Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF]">
            Executive Overview
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <Link to="/admin/products">
            <Button variant="secondary" size="sm" icon={Plus}>
              New Artifact
            </Button>
          </Link>
          <Link to="/admin/orders">
            <Button variant="primary" size="sm">
              Process Orders
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards Row (computed dynamically from data) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 min-w-0">
        <MetricCard
          label="Gross Revenue"
          value={formatCurrency(analytics.totalRevenue)}
          delta="+18.4%"
          isPositive={true}
          subtext="vs previous 12-mo cycle"
          icon={DollarSign}
        />

        <MetricCard
          label="Orders Settled"
          value={analytics.totalOrdersCount}
          delta="+12.1%"
          isPositive={true}
          subtext={`${analytics.pendingOrdersCount} pending triage`}
          icon={ShoppingBag}
        />

        <MetricCard
          label="Catalog Inventory"
          value={products.length}
          subtext={`${analytics.lowStockProducts.length} low stock warnings`}
          icon={Package}
        />

        <MetricCard
          label="Patron Registry"
          value={customers.length}
          delta="+9.5%"
          isPositive={true}
          subtext="Verified client profiles"
          icon={Users}
        />
      </div>

      {/* Charts Grid: Strictly Grayscale */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 min-w-0">

        {/* Main Chart: Monthly Revenue & Order Volume (8 cols) */}
        <div className="lg:col-span-8 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-4 sm:p-6 shadow-subtle flex flex-col justify-between min-w-0 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] font-mono">
                Revenue Trajectory (Last 12 Months)
              </h3>
              <p className="text-xs text-[#444444] dark:text-[#CCCCCC] mt-0.5">
                Aggregated monthly settlement volumes across all fulfilled consignments
              </p>
            </div>
            <div className="font-mono text-xs font-semibold px-2.5 py-1 bg-white dark:bg-[#0A0A0A] rounded border border-[#DDDDDD] dark:border-[#333333] text-[#000000] dark:text-[#FFFFFF] self-start sm:self-auto">
              AOV: {formatCurrency(analytics.averageOrderValue)}
            </div>
          </div>

          <div className="w-full h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.monthlySales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="monochromeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#000000" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#DDDDDD" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#DDDDDD' }}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: '12px', fontSize: '11px', fontFamily: "'Poppins', sans-serif" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Monthly Revenue"
                  stroke="#000000"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#monochromeGradient)"
                  dot={{ r: 3, fill: '#000000', stroke: '#FFFFFF', strokeWidth: 1.5 }}
                  activeDot={{ r: 6, fill: '#000000' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart: Category Revenue Share (4 cols) */}
        <div className="lg:col-span-4 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-4 sm:p-6 shadow-subtle flex flex-col justify-between min-w-0 overflow-hidden">
          <div className="mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] font-mono">
              Category Distribution
            </h3>
            <p className="text-xs text-[#444444] dark:text-[#CCCCCC] mt-0.5">
              Net revenue generated across product categories
            </p>
          </div>

          <div className="w-full h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics.categoryDistribution}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#DDDDDD" horizontal={false} />
                <XAxis type="number" stroke="#888888" fontSize={10} tickFormatter={(v) => `$${v}`} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#888888"
                  fontSize={10}
                  tickLine={false}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  name="Category Revenue"
                  fill="#000000"
                  radius={[0, 4, 4, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Bottom Row: Recent Orders Table & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-w-0">

        {/* Recent Orders (8 cols) */}
        <div className="lg:col-span-8 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-4 sm:p-6 shadow-subtle space-y-4 min-w-0 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#DDDDDD] dark:border-[#333333]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] font-mono">
              Recent Consignments ({recentOrders.length})
            </h3>
            <Link
              to="/admin/orders"
              className="text-xs font-mono font-bold uppercase text-[#000000] dark:text-[#FFFFFF] hover:underline shrink-0"
            >
              All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white dark:bg-[#0A0A0A] border-b border-[#DDDDDD] dark:border-[#333333] text-[#444444] dark:text-[#CCCCCC] uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDDDDD] dark:divide-[#333333]">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#EBEBEB] dark:hover:bg-[#1C1C1C] focus-within:bg-[#EBEBEB] dark:focus-within:bg-[#1C1C1C] transition-colors">
                    <td className="py-3 px-3 font-bold text-[#000000] dark:text-[#FFFFFF]">
                      <Link to="/admin/orders" className="hover:underline">
                        {ord.id}
                      </Link>
                    </td>
                    <td className="py-3 px-3 text-[#444444] dark:text-[#CCCCCC] truncate max-w-[140px]">
                      {ord.customer.name}
                    </td>
                    <td className="py-3 px-3 text-[#444444] dark:text-[#CCCCCC]">
                      {formatDateTime(ord.createdAt)}
                    </td>
                    <td className="py-3 px-3 font-bold text-[#000000] dark:text-[#FFFFFF]">
                      {formatCurrency(ord.total)}
                    </td>
                    <td className="py-3 px-3">
                      <Badge status={ord.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Sellers (4 cols) */}
        <div className="lg:col-span-4 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-4 sm:p-6 shadow-subtle space-y-4 min-w-0 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#DDDDDD] dark:border-[#333333]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] font-mono">
              Top Selling Artifacts
            </h3>
            <Link
              to="/admin/products"
              className="text-xs font-mono font-bold uppercase text-[#000000] dark:text-[#FFFFFF] hover:underline shrink-0"
            >
              Catalog →
            </Link>
          </div>

          <div className="space-y-3 divide-y divide-[#DDDDDD] dark:divide-[#333333] min-w-0">
            {analytics.topSellers.map((item, idx) => (
              <div key={item.productId} className="pt-3 first:pt-0 flex items-center gap-3 text-xs min-w-0">
                {/* 1. Rank */}
                <span className="w-5 shrink-0 font-mono font-bold text-[#444444] dark:text-[#CCCCCC]">0{idx + 1}</span>

                {/* 2. Thumbnail */}
                <div className="w-10 h-10 shrink-0 border border-[#DDDDDD] dark:border-[#333333] rounded overflow-hidden">
                  <ProductImage src={item.image} alt={item.name} aspectRatio="aspect-square" />
                </div>

                {/* 3. Name + Meta */}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <h5 className="font-semibold text-[#000000] dark:text-[#FFFFFF] truncate" title={item.name}>
                    {item.name}
                  </h5>
                  <span className="text-[11px] text-[#444444] dark:text-[#CCCCCC] font-mono block truncate">
                    {item.unitsSold} units dispatched
                  </span>
                </div>

                {/* 4. Amount */}
                <span className="font-mono font-bold text-[#000000] dark:text-[#FFFFFF] shrink-0 text-right tabular-nums whitespace-nowrap pl-2">
                  {formatCurrency(item.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
