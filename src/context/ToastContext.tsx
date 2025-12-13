import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import Toast, { ToastType } from '../components/ui/Toast';

interface ToastMessage {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface ToastContextType {
    addToast: (type: ToastType, message: string, duration?: number) => void;
    removeToast: (id: string) => void;
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const addToast = useCallback((type: ToastType, message: string, duration = 5000) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, type, message, duration }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, [removeToast]);

    const success = useCallback((msg: string, dur?: number) => addToast('success', msg, dur), [addToast]);
    const error = useCallback((msg: string, dur?: number) => addToast('error', msg, dur), [addToast]);
    const warning = useCallback((msg: string, dur?: number) => addToast('warning', msg, dur), [addToast]);
    const info = useCallback((msg: string, dur?: number) => addToast('info', msg, dur), [addToast]);

    return (
        <ToastContext.Provider value={{ addToast, removeToast, success, error, warning, info }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none p-4">
                <AnimatePresence mode="popLayout">
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            id={toast.id}
                            type={toast.type}
                            message={toast.message}
                            duration={toast.duration}
                            onDismiss={removeToast}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
