import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

export const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    required = false,
    className = '',
    id,
    type = 'text',
    icon: Icon,
    ...props
  },
  ref
) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold tracking-wide uppercase text-[#0A0A0A] flex items-center gap-1">
          {label}
          {required && <span className="text-[#0A0A0A] font-bold" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-[#525252] pointer-events-none flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-desc` : undefined}
          className={`w-full min-h-[44px] rounded-input border bg-white px-3.5 py-2 text-sm text-[#0A0A0A] placeholder:text-[#A3A3A3] transition-colors focus:border-[#0A0A0A] focus-visible:outline-2 focus-visible:outline-[#0A0A0A] focus-visible:outline-offset-2 disabled:bg-[#F5F5F5] disabled:text-[#A3A3A3] disabled:cursor-not-allowed ${Icon ? 'pl-10' : ''
            } ${error
              ? 'border-2 border-[#0A0A0A] bg-[#FAFAFA]'
              : 'border-[#E5E5E5] hover:border-[#A3A3A3]'
            } ${className}`}
          {...props}
        />
      </div>

      {/* Monochrome Error Box: black text with alert icon and bold left border */}
      {error && (
        <div
          id={`${inputId}-error`}
          role="alert"
          className="flex items-center gap-2 border-l-4 border-[#0A0A0A] bg-[#F5F5F5] px-3 py-1.5 mt-1 text-xs font-medium text-[#0A0A0A]"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#0A0A0A]" />
          <span>{error}</span>
        </div>
      )}

      {helperText && !error && (
        <p id={`${inputId}-desc`} className="text-[11px] text-[#525252] mt-0.5">
          {helperText}
        </p>
      )}
    </div>
  );
});
