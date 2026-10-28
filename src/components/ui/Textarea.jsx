import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

export const Textarea = forwardRef(function Textarea(
  {
    label,
    error,
    helperText,
    required = false,
    className = '',
    id,
    rows = 4,
    ...props
  },
  ref
) {
  const textareaId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={textareaId} className="text-xs font-semibold tracking-wide uppercase text-[#000000] dark:text-[#FFFFFF] flex items-center gap-1">
          {label}
          {required && <span className="text-[#000000] dark:text-[#FFFFFF] font-bold" aria-hidden="true">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-desc` : undefined}
        className={`w-full rounded-input border bg-white dark:bg-[#0A0A0A] px-3.5 py-2.5 text-sm text-[#000000] dark:text-[#FFFFFF] placeholder:text-[#444444]/60 dark:placeholder:text-[#CCCCCC]/60 transition-colors focus:border-black dark:focus:border-white focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white focus-visible:outline-offset-2 disabled:bg-[#F5F5F5] dark:disabled:bg-[#111111] disabled:opacity-50 ${error
            ? 'border-2 border-black dark:border-white bg-[#FAFAFA] dark:bg-[#111111]'
            : 'border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white'
          } ${className}`}
        {...props}
      />

      {error && (
        <div
          id={`${textareaId}-error`}
          role="alert"
          className="flex items-center gap-2 border-l-4 border-black dark:border-white bg-[#F5F5F5] dark:bg-[#111111] px-3 py-1.5 mt-1 text-xs font-medium text-[#000000] dark:text-[#FFFFFF]"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-current" />
          <span>{error}</span>
        </div>
      )}

      {helperText && !error && (
        <p id={`${textareaId}-desc`} className="text-[11px] text-[#444444] dark:text-[#CCCCCC] mt-0.5">
          {helperText}
        </p>
      )}
    </div>
  );
});
