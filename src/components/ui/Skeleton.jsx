import React from 'react';

export function Skeleton({ className = '', variant = 'rect' }) {
  const variantStyles = {
    rect: 'rounded-md',
    circle: 'rounded-full',
    text: 'rounded h-4',
    card: 'rounded-card'
  };

  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-[#E5E5E5] ${variantStyles[variant]} ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-3 bg-white border border-[#E5E5E5] rounded-card">
      <Skeleton className="w-full aspect-[4/5] rounded-lg" />
      <Skeleton className="w-1/3 h-3 text" />
      <Skeleton className="w-4/5 h-4 text" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="w-1/4 h-5 text" />
        <Skeleton className="w-8 h-8 rounded-btn" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr className="border-b border-[#E5E5E5] animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="py-4 px-4">
          <Skeleton className="h-4 w-3/4 text" />
        </td>
      ))}
    </tr>
  );
}
