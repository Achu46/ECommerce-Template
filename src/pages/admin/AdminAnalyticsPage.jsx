import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, TrendingUp, DollarSign, ShoppingBag, Percent, ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { MetricCard } from '../../components/admin/MetricCard';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../utils/formatters';

// Grayscale shades for Pie & Charts
const GRAYSCALE_PALETTE = ['#000000', '#222222', '#444444', '#777777', '#AAAAAA', '#DDDDDD'];

function AnalyticsTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white p-3 rounded-btn border border-[#333333] font-mono text-xs shadow-modal">
        <p className="font-bold border-b border-[#333333] pb-1 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="flex justify-between gap-4 text-[#CCCCCC]">
            <span>{entry.name}:</span>
            <span className="font-bold text-white">
              {entry.name.toLowerCase().includes('revenue') || entry.name.toLowerCase().includes('average')
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

export function AdminAnalyticsPage() {
  const { analytics, orders } = useData();
  const toast = useToast();

  const handleExportData = () => {
    toast.success('Report Generated', 'Consolidated financial telemetry exported to CSV.');
  };

  return (
    <div className="space-y-8 pb-12 text-[#000000] dark:text-[#FFFFFF]">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DDDDDD] dark:border-[#333333]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#444444] dark:text-[#CCCCCC] block mb-1">
            Quantitative Business Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF]">
            Financial & Volume Analytics
          </h1>
        </div>

        <Button variant="secondary" size="md" onClick={handleExportData} icon={Download}>
          Export CSV Telemetry
        </Button>
      </div>

      {/* High-level KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <MetricCard
          label="Average Order Value"
          value={formatCurrency(analytics.averageOrderValue)}
          delta="+8.2%"
          isPositive={true}
          subtext="Net basket yield"
          icon={TrendingUp}
        />
        <MetricCard
          label="Order Fulfillment Rate"
          value="95.4%"
          delta="+1.1%"
          isPositive={true}
          subtext="Dispatched vs cancelled"
          icon={Percent}
        />
        <MetricCard
          label="Gross Consignment Net"
          value={formatCurrency(analytics.totalRevenue)}
          delta="+18.4%"
          isPositive={true}
          subtext="365-day cumulative"
          icon={DollarSign}
        />
        <MetricCard
          label="Total Manifest Transactions"
          value={analytics.totalOrdersCount}
          subtext={`${analytics.cancelledOrdersCount} cancelled duplicate`}
          icon={ShoppingBag}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Chart 1: Average Order Value Trend (Line Chart) */}
        <div className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-6 shadow-subtle">
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] font-mono">
              Average Order Value Trend ($ USD)
            </h3>
            <p className="text-xs text-[#444444] dark:text-[#CCCCCC] mt-0.5">
              Fluctuations in basket value across calendar quarters
            </p>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DDDDDD" vertical={false} />
                <XAxis dataKey="month" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip content={<AnalyticsTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontFamily: "'Poppins', sans-serif" }} />
                <Line
                  type="monotone"
                  dataKey="average"
                  name="Average Basket Value"
                  stroke="#000000"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#000000', stroke: '#FFFFFF', strokeWidth: 1.5 }}
                  activeDot={{ r: 6, fill: '#000000' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Monthly Order Volume (Bar Chart) */}
        <div className="bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-6 shadow-subtle">
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] font-mono">
              Monthly Consignment Counts
            </h3>
            <p className="text-xs text-[#444444] dark:text-[#CCCCCC] mt-0.5">
              Total orders processed per calendar month
            </p>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DDDDDD" vertical={false} />
                <XAxis dataKey="month" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<AnalyticsTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontFamily: "'Poppins', sans-serif" }} />
                <Bar
                  dataKey="orders"
                  name="Orders Dispatched"
                  fill="#000000"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
