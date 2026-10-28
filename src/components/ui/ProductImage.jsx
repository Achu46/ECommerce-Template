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
        className={`w-full ${aspectRatio} bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] flex flex-col items-center justify-center p-4 text-[#444444] dark:text-[#CCCCCC] select-none ${className}`}
        aria-label={`${alt} (image unavailable)`}
      >
        <ImageOff className="w-8 h-8 stroke-1 text-[#444444] dark:text-[#CCCCCC] mb-1.5" />
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#444444] dark:text-[#CCCCCC]">
          MONO ARCHIVE
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F5F5F5] dark:bg-[#111111] ${aspectRatio} ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#E5E5E5] dark:bg-[#1A1A1A] animate-pulse" />
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
