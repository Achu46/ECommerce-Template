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
                  ? 'fill-[#0A0A0A] text-[#0A0A0A]'
                  : isHalf
                    ? 'fill-[#737373] text-[#737373]'
                    : 'text-[#D4D4D4]'
                }`}
            />
          );
        })}
      </div>
      <span className="font-mono text-xs font-semibold text-[#0A0A0A]">
        {rounded.toFixed(1)}
      </span>
      {showCount && count !== undefined && (
        <span className="text-[11px] text-[#525252] font-mono">
          ({count})
        </span>
      )}
    </div>
  );
}
