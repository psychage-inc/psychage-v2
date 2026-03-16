import React, { useState } from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '@/lib/utils';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  destructive?: boolean;
  confirmText?: string;
  onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  destructive = false,
  confirmText,
  onConfirm,
}) => {
  const [inputValue, setInputValue] = useState('');
  const canConfirm = confirmText ? inputValue === confirmText : true;

  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/40 z-50 animate-in fade-in" />
        <AlertDialogPrimitive.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-surface rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in-95">
          <AlertDialogPrimitive.Title className="text-lg font-semibold text-text-primary">
            {title}
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="mt-2 text-sm text-text-secondary">
            {description}
          </AlertDialogPrimitive.Description>

          {confirmText && (
            <div className="mt-4">
              <p className="text-sm text-text-secondary mb-2">
                Type <strong>{confirmText}</strong> to confirm:
              </p>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary outline-none"
                autoFocus
              />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <AlertDialogPrimitive.Cancel asChild>
              <button className="px-4 py-2 text-sm font-medium text-text-primary bg-surface-hover rounded-lg hover:bg-surface-active transition-colors">
                Cancel
              </button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <button
                onClick={onConfirm}
                disabled={!canConfirm}
                className={cn(
                  'px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
                  destructive
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-primary hover:bg-primary-hover'
                )}
              >
                {confirmLabel}
              </button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};

export default ConfirmDialog;
