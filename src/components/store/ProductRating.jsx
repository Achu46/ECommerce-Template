import React from 'react';
import { Star } from 'lucide-react';

export function ProductRating({ rating = 0, count, showCount = true, size = 'sm' }) {
  const rounded = Math.round(rating * 10) / 10;
  const starSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1.5 select-none" aria-label={`Rating: ${rounded} out of 5 stars`}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = rating >= star;
          const isHalf = !isFilled && rating >= star - 0.5;

          return (
            <Star
              key={star}
              className={`${starSize} ${isFilled
                  ? 'fill-black text-black dark:fill-white dark:text-white'
                  : isHalf
                    ? 'fill-[#737373] text-[#737373]'
                    : 'text-[#DDDDDD] dark:text-[#333333]'
                }`}
            />
          );
        })}
      </div>
      <span className="font-mono text-xs font-semibold text-[#000000] dark:text-[#FFFFFF]">
        {rounded.toFixed(1)}
      </span>
      {showCount && count !== undefined && (
        <span className="text-[11px] text-[#444444] dark:text-[#CCCCCC] font-mono">
          ({count})
        </span>
      )}
    </div>
  );
}
