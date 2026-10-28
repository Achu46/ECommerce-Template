import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function MetricCard({
  label,
  value,
  subtext,
  icon: Icon,
  delta, // e.g. "+14.2%" or "-2.1%"
  isPositive = true,
  className = ''
}) {
  return (
    <div
      className={`bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-4 sm:p-5 shadow-subtle flex flex-col justify-between hover:border-[#000000] dark:hover:border-[#FFFFFF] transition-colors min-w-0 h-full min-h-[152px] ${className}`}
    >
      {/* Header: Label on left, Icon on right */}
      <div className="flex items-start justify-between gap-2 min-w-0 h-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[#444444] dark:text-[#CCCCCC] leading-tight break-words">
          {label}
        </span>
        {Icon && (
          <div className="p-1.5 sm:p-2 bg-white dark:bg-[#0A0A0A] border border-[#DDDDDD] dark:border-[#333333] rounded-btn text-[#000000] dark:text-[#FFFFFF] shrink-0">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Main Metric Value: Responsive clamp, tabular-nums, no-wrap, no-clip */}
      <div className="my-auto py-2 min-w-0">
        <div
          className="text-[clamp(1.05rem,1.55vw,1.85rem)] font-black font-mono tracking-tight text-[#000000] dark:text-[#FFFFFF] tabular-nums whitespace-nowrap leading-none select-all"
          title={String(value)}
        >
          {value}
        </div>
      </div>

      {/* Footer: Delta Badge & Wrapped Subtext on 2 lines with consistent baseline */}
      <div className="min-w-0 mt-auto min-h-[36px] flex items-end">
        {(delta || subtext) ? (
          <div className="flex flex-wrap items-center gap-1.5 text-xs leading-normal">
            {delta && (
              <span
                className={`inline-flex items-center gap-0.5 font-mono font-semibold px-1.5 py-0.5 rounded shrink-0 ${isPositive
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-[#EEEEEE] dark:bg-[#1A1A1A] text-[#000000] dark:text-[#FFFFFF] border border-[#DDDDDD] dark:border-[#333333]'
                  }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {delta}
              </span>
            )}
            {subtext && (
              <span className="text-[#444444] dark:text-[#CCCCCC] text-xs leading-snug break-words">
                {subtext}
              </span>
            )}
          </div>
        ) : (
          <div className="h-4" />
        )}
      </div>
    </div>
  );
}
