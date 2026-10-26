import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(({ title, message, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, message, type };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const toast = {
    success: (title, message) => addToast({ title, message, type: 'success' }),
    error: (title, message) => addToast({ title, message, type: 'error' }),
    info: (title, message) => addToast({ title, message, type: 'info' }),
    warning: (title, message) => addToast({ title, message, type: 'warning' }),
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {/* Toast viewport */}
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 sm:px-0 pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            let IconComponent = Info;
            let badgeText = 'NOTICE';

            if (t.type === 'success') {
              IconComponent = CheckCircle2;
              badgeText = 'SUCCESS';
            } else if (t.type === 'error') {
              IconComponent = AlertCircle;
              badgeText = 'ALERT';
            } else if (t.type === 'warning') {
              IconComponent = AlertTriangle;
              badgeText = 'WARNING';
            }

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-auto bg-white text-mono-primary border-2 border-mono-primary shadow-modal rounded-btn p-3.5 flex items-start gap-3 relative"
              >
                <div className="mt-0.5 p-1 bg-mono-subtle rounded border border-mono-border">
                  <IconComponent className="w-4 h-4 text-mono-primary" />
                </div>
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] tracking-wider font-mono uppercase px-1.5 py-0.5 bg-mono-primary text-white rounded">
                      {badgeText}
                    </span>
                    {t.title && <h4 className="text-xs font-bold uppercase tracking-wide">{t.title}</h4>}
                  </div>
                  {t.message && <p className="text-xs text-mono-secondary leading-relaxed">{t.message}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(t.id)}
                  aria-label="Dismiss notification"
                  className="absolute top-2.5 right-2.5 p-1 text-mono-muted hover:text-mono-primary rounded transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
}
