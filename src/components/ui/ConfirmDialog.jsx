import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed? This action cannot be reversed.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = true,
  isLoading = false
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md" showClose={!isLoading}>
      <div className="flex flex-col items-center text-center py-2">
        <div className="w-12 h-12 rounded-full border-2 border-black dark:border-white bg-[#F5F5F5] dark:bg-[#111111] flex items-center justify-center mb-4 text-[#000000] dark:text-[#FFFFFF]">
          <AlertTriangle className="w-6 h-6 text-current" />
        </div>
        <h3 className="text-base font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] mb-2">
          {title}
        </h3>
        <p className="text-sm text-[#444444] dark:text-[#CCCCCC] leading-relaxed mb-6">
          {message}
        </p>
        <div className="flex items-center justify-center gap-3 w-full">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            {cancelLabel}
          </Button>
          <Button
            variant={isDestructive ? 'primary' : 'primary'}
            onClick={onConfirm}
            isLoading={isLoading}
            className="flex-1"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
