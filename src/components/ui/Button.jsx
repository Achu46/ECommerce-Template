import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'subtle' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg' | 'icon'
  isLoading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  type = 'button',
  icon: Icon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 select-none relative focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white focus-visible:outline-offset-2';

  const sizeStyles = {
    sm: 'text-xs px-3 py-2 min-h-[36px] rounded-btn gap-1.5',
    md: 'text-sm px-4 py-2.5 min-h-[44px] rounded-btn gap-2',
    lg: 'text-base px-6 py-3.5 min-h-[50px] rounded-btn gap-2.5',
    icon: 'p-2.5 min-w-[44px] min-h-[44px] rounded-btn'
  };

  const variantStyles = {
    primary: 'bg-black text-white hover:bg-[#333333] active:bg-black border border-black dark:bg-white dark:text-black dark:hover:bg-[#E5E5E5] dark:active:bg-white dark:border-white disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-white text-black border border-[#DDDDDD] hover:bg-[#F5F5F5] active:bg-[#EEEEEE] dark:bg-[#111111] dark:text-white dark:border-[#333333] dark:hover:bg-[#1A1A1A] disabled:opacity-50 disabled:cursor-not-allowed',
    subtle: 'bg-[#F5F5F5] text-black border border-[#DDDDDD] hover:bg-[#EEEEEE] active:bg-[#DDDDDD] dark:bg-[#111111] dark:text-white dark:border-[#333333] dark:hover:bg-[#1A1A1A] disabled:opacity-50 disabled:cursor-not-allowed',
    outline: 'bg-transparent text-black border border-[#DDDDDD] hover:border-black hover:bg-[#F5F5F5] dark:bg-transparent dark:text-white dark:border-[#333333] dark:hover:border-white dark:hover:bg-[#111111] disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'bg-transparent text-black hover:bg-[#F5F5F5] dark:text-white dark:hover:bg-[#111111] disabled:opacity-50 disabled:cursor-not-allowed'
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const stateStyle = (disabled || isLoading) ? 'cursor-not-allowed opacity-60' : 'cursor-pointer';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${stateStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0 text-current" />}
          {children}
        </>
      )}
    </button>
  );
}
