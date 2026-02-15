import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
    onDismiss: (id: string) => void;
}

const icons = {
    success: <CheckCircle size={20} className="text-green-500" />,
    error: <AlertCircle size={20} className="text-red-500" />,
    warning: <AlertTriangle size={20} className="text-amber-500" />,
    info: <Info size={20} className="text-blue-500" />
};

const bgColors = {
    success: 'bg-green-50 border-green-100',
    error: 'bg-red-50 border-red-100',
    warning: 'bg-amber-50 border-amber-100',
    info: 'bg-blue-50 border-blue-100'
};

const Toast: React.FC<ToastProps> = ({ id, type, message, onDismiss }) => {
    const isUrgent = type === 'error' || type === 'warning';

    return (
        <motion.div
            layout
            role={isUrgent ? 'alert' : 'status'}
            aria-live={isUrgent ? 'assertive' : 'polite'}
            aria-atomic="true"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg max-w-sm w-full pointer-events-auto ${bgColors[type]}`}
        >
            <div className="shrink-0 mt-0.5" aria-hidden="true">{icons[type]}</div>
            <p className="text-sm font-medium text-gray-800 flex-grow pt-0.5">{message}</p>
            <button
                onClick={() => onDismiss(id)}
                aria-label="Dismiss notification"
                className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X size={16} />
            </button>
        </motion.div>
    );
};

export default Toast;
