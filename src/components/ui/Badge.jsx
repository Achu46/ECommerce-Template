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
      computedStyle = 'bg-[#F5F5F5] text-[#0A0A0A] border border-[#A3A3A3]';
      computedLabel = children || 'Pending';
      break;

    case 'processing':
      computedIcon = RotateCcw;
      computedStyle = 'bg-white text-[#0A0A0A] border-2 border-dashed border-[#0A0A0A] font-semibold';
      computedLabel = children || 'Processing';
      break;

    case 'shipped':
      computedIcon = Truck;
      computedStyle = 'bg-white text-[#0A0A0A] border-2 border-[#0A0A0A] font-bold';
      computedLabel = children || 'Shipped';
      break;

    case 'delivered':
      computedIcon = CheckCircle2;
      computedStyle = 'bg-[#0A0A0A] text-white border border-[#0A0A0A] font-semibold';
      computedLabel = children || 'Delivered';
      break;

    case 'cancelled':
      computedIcon = XCircle;
      computedStyle = 'bg-[#E5E5E5] text-[#525252] border border-[#A3A3A3] line-through font-medium';
      computedLabel = children || 'Cancelled';
      break;

    case 'in_stock':
      computedIcon = Check;
      computedStyle = 'bg-white text-[#0A0A0A] border border-[#0A0A0A] font-medium';
      computedLabel = children || 'In Stock';
      break;

    case 'low_stock':
      computedIcon = AlertTriangle;
      computedStyle = 'bg-[#F5F5F5] text-[#0A0A0A] border border-dashed border-[#0A0A0A] font-medium';
      computedLabel = children || 'Low Stock';
      break;

    case 'out_of_stock':
      computedIcon = Slash;
      computedStyle = 'bg-[#0A0A0A] text-white font-medium';
      computedLabel = children || 'Sold Out';
      break;

    default:
      // Generic variant styling
      if (variant === 'solid') {
        computedStyle = 'bg-[#0A0A0A] text-white border border-[#0A0A0A]';
      } else if (variant === 'outline') {
        computedStyle = 'bg-white text-[#0A0A0A] border border-[#0A0A0A]';
      } else if (variant === 'dashed') {
        computedStyle = 'bg-white text-[#0A0A0A] border border-dashed border-[#0A0A0A]';
      } else {
        // subtle
        computedStyle = 'bg-[#F5F5F5] text-[#0A0A0A] border border-[#E5E5E5]';
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
