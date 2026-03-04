import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { NavigatorButton } from '../navigator/NavigatorButton';

export interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
    icon?: React.ReactNode;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'default',
    icon
}) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const cancelButtonRef = useRef<HTMLButtonElement>(null);

    useFocusTrap(dialogRef, isOpen, onClose, undefined, cancelButtonRef);

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* Dialog */}
                    <div
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="confirm-dialog-title"
                        aria-describedby="confirm-dialog-message"
                    >
                        <motion.div
                            ref={dialogRef}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-charcoal-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
                            tabIndex={-1}
                        >
                            {/* Gradient accent */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                            {/* Content */}
                            <div className="relative z-10 space-y-4">
                                {/* Icon & Title */}
                                <div className="flex items-start gap-4">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                        variant === 'destructive'
                                            ? 'bg-crisis-red/10'
                                            : 'bg-teal-500/10'
                                    }`}>
                                        {icon || (
                                            <AlertCircle className={`w-6 h-6 ${
                                                variant === 'destructive'
                                                    ? 'text-crisis-red'
                                                    : 'text-teal-400'
                                            }`} />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h2
                                            id="confirm-dialog-title"
                                            className="text-xl font-serif font-semibold text-white mb-2"
                                        >
                                            {title}
                                        </h2>
                                        <p
                                            id="confirm-dialog-message"
                                            className="text-charcoal-200 leading-relaxed"
                                        >
                                            {message}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                                    <NavigatorButton
                                        ref={cancelButtonRef}
                                        variant="ghost"
                                        onClick={onClose}
                                        className="flex-1"
                                    >
                                        {cancelText}
                                    </NavigatorButton>
                                    <NavigatorButton
                                        variant={variant === 'destructive' ? 'outline' : 'primary'}
                                        onClick={handleConfirm}
                                        className={`flex-1 ${
                                            variant === 'destructive'
                                                ? 'border-crisis-red/50 text-crisis-red hover:bg-crisis-red/10'
                                                : ''
                                        }`}
                                    >
                                        {confirmText}
                                    </NavigatorButton>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
