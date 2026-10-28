import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({
  icon: Icon = PackageOpen,
  title = 'No Records Found',
  description = 'There are no items matching your current filters or query.',
  actionLabel,
  onAction,
  actionIcon,
  className = ''
}) {
  return (
    <div
      role="region"
      aria-label={title}
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-[#DDDDDD] dark:border-[#333333] rounded-card bg-[#F5F5F5] dark:bg-[#111111] ${className}`}
    >
      <div className="w-14 h-14 rounded-full border border-[#DDDDDD] dark:border-[#333333] bg-white dark:bg-[#000000] flex items-center justify-center mb-4 shadow-subtle">
        <Icon className="w-7 h-7 text-[#000000] dark:text-[#FFFFFF]" />
      </div>
      <h3 className="text-base font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] mb-1.5">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#444444] dark:text-[#CCCCCC] max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction} icon={actionIcon}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
