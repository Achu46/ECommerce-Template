import React, { forwardRef } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

export const Select = forwardRef(function Select(
  {
    label,
    error,
    helperText,
    required = false,
    className = '',
    id,
    options = [],
    children,
    ...props
  },
  ref
) {
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold tracking-wide uppercase text-[#0A0A0A] flex items-center gap-1">
          {label}
          {required && <span className="text-[#0A0A0A] font-bold" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-desc` : undefined}
          className={`w-full appearance-none min-h-[44px] rounded-input border bg-white pl-3.5 pr-10 py-2 text-sm text-[#0A0A0A] transition-colors focus:border-[#0A0A0A] focus-visible:outline-2 focus-visible:outline-[#0A0A0A] focus-visible:outline-offset-2 disabled:bg-[#F5F5F5] disabled:text-[#A3A3A3] ${error
              ? 'border-2 border-[#0A0A0A] bg-[#FAFAFA]'
              : 'border-[#E5E5E5] hover:border-[#A3A3A3]'
            } ${className}`}
          {...props}
        >
          {options.length > 0
            ? options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
            : children}
        </select>
        <div className="pointer-events-none absolute right-3 text-[#525252]">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error && (
        <div
          id={`${selectId}-error`}
          role="alert"
          className="flex items-center gap-2 border-l-4 border-[#0A0A0A] bg-[#F5F5F5] px-3 py-1.5 mt-1 text-xs font-medium text-[#0A0A0A]"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#0A0A0A]" />
          <span>{error}</span>
        </div>
      )}

      {helperText && !error && (
        <p id={`${selectId}-desc`} className="text-[11px] text-[#525252] mt-0.5">
          {helperText}
        </p>
      )}
    </div>
  );
});
