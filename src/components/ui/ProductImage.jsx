import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

export function ProductImage({
  src,
  alt = 'Product Image',
  className = '',
  aspectRatio = 'aspect-square',
  sizes,
  loading = 'lazy',
  fetchPriority,
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full ${aspectRatio} bg-[#F5F5F5] border border-[#E5E5E5] flex flex-col items-center justify-center p-4 text-[#A3A3A3] select-none ${className}`}
        aria-label={`${alt} (image unavailable)`}
      >
        <ImageOff className="w-8 h-8 stroke-1 text-[#A3A3A3] mb-1.5" />
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373]">
          MONO ARCHIVE
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F5F5F5] ${aspectRatio} ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#F5F5F5] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchpriority={fetchPriority}
        sizes={sizes}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        {...props}
      />
    </div>
  );
}
