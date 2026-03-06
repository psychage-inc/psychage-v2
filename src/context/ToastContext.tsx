import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { toast as sonnerToast } from 'sonner';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastContextType {
    addToast: (type: ToastType, message: string, duration?: number) => void;
    removeToast: (id: string) => void;
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
}

const toastMethods: ToastContextType = {
    addToast: (type: ToastType, message: string, duration?: number) => {
        const options = duration ? { duration } : undefined;
        switch (type) {
            case 'success':
                sonnerToast.success(message, options);
                break;
            case 'error':
                sonnerToast.error(message, options);
                break;
            case 'warning':
                sonnerToast.warning(message, options);
                break;
            case 'info':
                sonnerToast.info(message, options);
                break;
        }
    },
    removeToast: (id: string) => {
        sonnerToast.dismiss(id);
    },
    success: (message: string, duration?: number) => {
        sonnerToast.success(message, duration ? { duration } : undefined);
    },
    error: (message: string, duration?: number) => {
        sonnerToast.error(message, duration ? { duration } : undefined);
    },
    warning: (message: string, duration?: number) => {
        sonnerToast.warning(message, duration ? { duration } : undefined);
    },
    info: (message: string, duration?: number) => {
        sonnerToast.info(message, duration ? { duration } : undefined);
    },
};

const ToastContext = createContext<ToastContextType>(toastMethods);

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
    return useContext(ToastContext);
};

// ToastProvider is now optional — Sonner uses a global toast() function.
// Kept for backward compatibility with existing context wrapping patterns.
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const value = useMemo(() => toastMethods, []);
    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
};
