// Toast system is now powered by Sonner.
// This file kept for backward compatibility with type exports.
// Rendering is handled by <Toaster /> in App.tsx.

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
    onDismiss: (id: string) => void;
}
