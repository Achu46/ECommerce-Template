import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

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
    autoComplete,
    ...props
  },
  ref
) {
  const isPasswordField = type === 'password';
  const [showPassword, setShowPassword] = useState(false);
  const internalInputRef = useRef(null);

  useImperativeHandle(ref, () => internalInputRef.current);

  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const handleTogglePassword = (e) => {
    e.preventDefault();
    const el = internalInputRef.current;
    if (el) {
      const start = el.selectionStart;
      const end = el.selectionEnd;
      setShowPassword((prev) => !prev);
      requestAnimationFrame(() => {
        el.focus();
        if (start !== null && end !== null) {
          try {
            el.setSelectionRange(start, end);
          } catch {
            // setSelectionRange may not be supported on all input types
          }
        }
      });
    } else {
      setShowPassword((prev) => !prev);
    }
  };

  const effectiveType = isPasswordField ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold tracking-wide uppercase text-[#000000] dark:text-[#FFFFFF] flex items-center gap-1">
          {label}
          {required && <span className="font-bold text-[#000000] dark:text-[#FFFFFF]" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-[#000000] dark:text-[#FFFFFF] opacity-70 pointer-events-none flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={internalInputRef}
          id={inputId}
          type={effectiveType}
          required={required}
          autoComplete={autoComplete || (isPasswordField ? 'current-password' : undefined)}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-desc` : undefined}
          className={`w-full min-h-[44px] rounded-input border bg-white dark:bg-[#0A0A0A] px-3.5 py-2 text-sm text-[#000000] dark:text-[#FFFFFF] placeholder:text-[#444444]/60 dark:placeholder:text-[#CCCCCC]/60 transition-colors focus:border-black dark:focus:border-white focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white focus-visible:outline-offset-2 disabled:bg-[#F5F5F5] dark:disabled:bg-[#111111] disabled:opacity-50 disabled:cursor-not-allowed ${
            Icon ? 'pl-10' : ''
          } ${
            isPasswordField ? 'pr-12' : ''
          } ${
            error
              ? 'border-2 border-black dark:border-white bg-[#FAFAFA] dark:bg-[#111111]'
              : 'border-[#DDDDDD] dark:border-[#333333] hover:border-black dark:hover:border-white'
          } ${className}`}
          {...props}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={handleTogglePassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            tabIndex={0}
            className="absolute right-1 w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center text-[#000000] dark:text-[#FFFFFF] opacity-75 hover:opacity-100 rounded-input focus:outline-none focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white focus-visible:outline-offset-1 transition-colors z-10"
          >
            <span className="transition-all duration-150 transform active:scale-90 flex items-center justify-center">
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </span>
          </button>
        )}
      </div>

      {/* Error Box: bold left border with alert icon */}
      {error && (
        <div
          id={`${inputId}-error`}
          role="alert"
          className="flex items-center gap-2 border-l-4 border-black dark:border-white bg-[#F5F5F5] dark:bg-[#1A1A1A] px-3 py-1.5 mt-1 text-xs font-medium text-[#000000] dark:text-[#FFFFFF]"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {helperText && !error && (
        <p id={`${inputId}-desc`} className="text-[11px] text-[#000000] dark:text-[#FFFFFF] opacity-70 mt-0.5">
          {helperText}
        </p>
      )}
    </div>
  );
});
