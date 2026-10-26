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
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 select-none relative focus-visible:outline-2 focus-visible:outline-[#0A0A0A] focus-visible:outline-offset-2';

  const sizeStyles = {
    sm: 'text-xs px-3 py-2 min-h-[36px] rounded-btn gap-1.5',
    md: 'text-sm px-4 py-2.5 min-h-[44px] rounded-btn gap-2',
    lg: 'text-base px-6 py-3.5 min-h-[50px] rounded-btn gap-2.5',
    icon: 'p-2.5 min-w-[44px] min-h-[44px] rounded-btn'
  };

  const variantStyles = {
    primary: 'bg-[#0A0A0A] text-white hover:bg-[#262626] active:bg-black border border-[#0A0A0A] disabled:bg-[#E5E5E5] disabled:text-[#A3A3A3] disabled:border-[#E5E5E5]',
    secondary: 'bg-white text-[#0A0A0A] border border-[#0A0A0A] hover:bg-[#F5F5F5] active:bg-[#E5E5E5] disabled:border-[#E5E5E5] disabled:text-[#A3A3A3]',
    subtle: 'bg-[#F5F5F5] text-[#0A0A0A] border border-[#E5E5E5] hover:bg-[#E5E5E5] active:bg-[#D4D4D4] disabled:bg-[#F5F5F5] disabled:text-[#A3A3A3]',
    outline: 'bg-transparent text-[#0A0A0A] border border-[#E5E5E5] hover:border-[#0A0A0A] hover:bg-[#F5F5F5] active:bg-[#E5E5E5] disabled:border-[#E5E5E5] disabled:text-[#A3A3A3]',
    ghost: 'bg-transparent text-[#0A0A0A] hover:bg-[#F5F5F5] active:bg-[#E5E5E5] disabled:text-[#A3A3A3]'
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const stateStyle = (disabled || isLoading) ? 'cursor-not-allowed opacity-80' : 'cursor-pointer';

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
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          {children}
        </>
      )}
    </button>
  );
}
