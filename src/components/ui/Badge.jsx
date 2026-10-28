import React from 'react';
import {
  Clock,
  RotateCcw,
  Truck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Check,
  Slash,
  Tag
} from 'lucide-react';

export function Badge({
  status, // 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'in_stock' | 'low_stock' | 'out_of_stock'
  variant, // 'solid' | 'outline' | 'subtle' | 'dashed'
  children,
  icon: CustomIcon,
  className = '',
  size = 'md'
}) {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2'
  };

  // If a preset status is passed, configure icon, label, and fill style
  let computedIcon = CustomIcon;
  let computedStyle = '';
  let computedLabel = children;

  switch (status) {
    case 'pending':
      computedIcon = Clock;
      computedStyle = 'bg-[#F5F5F5] dark:bg-[#111111] text-[#000000] dark:text-[#FFFFFF] border border-[#DDDDDD] dark:border-[#333333]';
      computedLabel = children || 'Pending';
      break;

    case 'processing':
      computedIcon = RotateCcw;
      computedStyle = 'bg-white dark:bg-[#000000] text-[#000000] dark:text-[#FFFFFF] border-2 border-dashed border-black dark:border-white font-semibold';
      computedLabel = children || 'Processing';
      break;

    case 'shipped':
      computedIcon = Truck;
      computedStyle = 'bg-white dark:bg-[#000000] text-[#000000] dark:text-[#FFFFFF] border-2 border-black dark:border-white font-bold';
      computedLabel = children || 'Shipped';
      break;

    case 'delivered':
      computedIcon = CheckCircle2;
      computedStyle = 'bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white font-semibold';
      computedLabel = children || 'Delivered';
      break;

    case 'cancelled':
      computedIcon = XCircle;
      computedStyle = 'bg-[#EEEEEE] dark:bg-[#1A1A1A] text-[#444444] dark:text-[#CCCCCC] border border-[#DDDDDD] dark:border-[#333333] line-through font-medium';
      computedLabel = children || 'Cancelled';
      break;

    case 'in_stock':
      computedIcon = Check;
      computedStyle = 'bg-white dark:bg-[#000000] text-[#000000] dark:text-[#FFFFFF] border border-black dark:border-white font-medium';
      computedLabel = children || 'In Stock';
      break;

    case 'low_stock':
      computedIcon = AlertTriangle;
      computedStyle = 'bg-[#F5F5F5] dark:bg-[#111111] text-[#000000] dark:text-[#FFFFFF] border border-dashed border-black dark:border-white font-medium';
      computedLabel = children || 'Low Stock';
      break;

    case 'out_of_stock':
      computedIcon = Slash;
      computedStyle = 'bg-black text-white dark:bg-white dark:text-black font-medium';
      computedLabel = children || 'Sold Out';
      break;

    default:
      // Generic variant styling
      if (variant === 'solid') {
        computedStyle = 'bg-black text-white border border-black dark:bg-white dark:text-black dark:border-white';
      } else if (variant === 'outline') {
        computedStyle = 'bg-transparent text-[#000000] dark:text-[#FFFFFF] border border-black dark:border-white';
      } else if (variant === 'dashed') {
        computedStyle = 'bg-transparent text-[#000000] dark:text-[#FFFFFF] border border-dashed border-black dark:border-white';
      } else {
        // subtle
        computedStyle = 'bg-[#F5F5F5] dark:bg-[#111111] text-[#000000] dark:text-[#FFFFFF] border border-[#DDDDDD] dark:border-[#333333]';
      }
      break;
  }

  const IconToRender = computedIcon;

  return (
    <span
      className={`inline-flex items-center rounded-full font-mono uppercase tracking-wider ${sizeClasses[size]} ${computedStyle} ${className}`}
    >
      {IconToRender && <IconToRender className="w-3 h-3 shrink-0" />}
      <span>{computedLabel}</span>
    </span>
  );
}
