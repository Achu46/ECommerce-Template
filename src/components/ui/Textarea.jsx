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
        <label htmlFor={textareaId} className="text-xs font-semibold tracking-wide uppercase text-[#0A0A0A] flex items-center gap-1">
          {label}
          {required && <span className="text-[#0A0A0A] font-bold" aria-hidden="true">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-desc` : undefined}
        className={`w-full rounded-input border bg-white px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder:text-[#A3A3A3] transition-colors focus:border-[#0A0A0A] focus-visible:outline-2 focus-visible:outline-[#0A0A0A] focus-visible:outline-offset-2 disabled:bg-[#F5F5F5] disabled:text-[#A3A3A3] ${error
            ? 'border-2 border-[#0A0A0A] bg-[#FAFAFA]'
            : 'border-[#E5E5E5] hover:border-[#A3A3A3]'
          } ${className}`}
        {...props}
      />

      {error && (
        <div
          id={`${textareaId}-error`}
          role="alert"
          className="flex items-center gap-2 border-l-4 border-[#0A0A0A] bg-[#F5F5F5] px-3 py-1.5 mt-1 text-xs font-medium text-[#0A0A0A]"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#0A0A0A]" />
          <span>{error}</span>
        </div>
      )}

      {helperText && !error && (
        <p id={`${textareaId}-desc`} className="text-[11px] text-[#525252] mt-0.5">
          {helperText}
        </p>
      )}
    </div>
  );
});
