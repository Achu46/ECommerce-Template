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
        <label htmlFor={selectId} className="text-xs font-semibold tracking-wide uppercase text-[#000000] dark:text-[#FFFFFF] flex items-center gap-1">
          {label}
          {required && <span className="text-[#000000] dark:text-[#FFFFFF] font-bold" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-desc` : undefined}
          className={`w-full appearance-none min-h-[44px] rounded-input border bg-white dark:bg-[#0A0A0A] pl-3.5 pr-10 py-2 text-sm text-[#000000] dark:text-[#FFFFFF] transition-colors focus:border-black dark:focus:border-white focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white focus-visible:outline-offset-2 disabled:bg-[#F5F5F5] dark:disabled:bg-[#111111] disabled:opacity-50 ${error
              ? 'border-2 border-black dark:border-white bg-[#FAFAFA] dark:bg-[#111111]'
              : 'border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white'
            } ${className}`}
          {...props}
        >
          {options.length > 0
            ? options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white dark:bg-[#0A0A0A] text-[#000000] dark:text-[#FFFFFF]">
                {opt.label}
              </option>
            ))
            : children}
        </select>
        <div className="pointer-events-none absolute right-3 text-[#444444] dark:text-[#CCCCCC]">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error && (
        <div
          id={`${selectId}-error`}
          role="alert"
          className="flex items-center gap-2 border-l-4 border-black dark:border-white bg-[#F5F5F5] dark:bg-[#111111] px-3 py-1.5 mt-1 text-xs font-medium text-[#000000] dark:text-[#FFFFFF]"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-current" />
          <span>{error}</span>
        </div>
      )}

      {helperText && !error && (
        <p id={`${selectId}-desc`} className="text-[11px] text-[#444444] dark:text-[#CCCCCC] mt-0.5">
          {helperText}
        </p>
      )}
    </div>
  );
});
