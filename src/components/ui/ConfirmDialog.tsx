import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scaleIn } from '@/lib/animations';

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
    const handleConfirm = () => {
        onConfirm();
        // onClose is triggered automatically by Radix via onOpenChange
    };

    return (
        <AlertDialogPrimitive.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <AlertDialogPrimitive.Portal>
                {/* Backdrop — NOT dismissible (AlertDialog blocks outside clicks) */}
                <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] data-[state=open]:animate-in data-[state=open]:fade-in-0" />

                {/* Dialog */}
                <AlertDialogPrimitive.Content className="fixed inset-0 z-[101] flex items-center justify-center p-4">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={scaleIn}
                        className="bg-charcoal-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
                    >
                        {/* Gradient accent */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                        {/* Content */}
                        <div className="relative z-10 space-y-4">
                            {/* Icon & Title */}
                            <div className="flex items-start gap-4">
                                <div className={cn(
                                    "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
                                    variant === 'destructive'
                                        ? 'bg-crisis-red/10'
                                        : 'bg-teal-500/10'
                                )}>
                                    {icon || (
                                        <AlertCircle className={cn(
                                            "w-6 h-6",
                                            variant === 'destructive'
                                                ? 'text-crisis-red'
                                                : 'text-teal-400'
                                        )} />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <AlertDialogPrimitive.Title className="text-xl font-serif font-semibold text-white mb-2">
                                        {title}
                                    </AlertDialogPrimitive.Title>
                                    <AlertDialogPrimitive.Description className="text-charcoal-200 leading-relaxed">
                                        {message}
                                    </AlertDialogPrimitive.Description>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                                <AlertDialogPrimitive.Cancel asChild>
                                    <button
                                        className={cn(
                                            "flex-1 inline-flex items-center justify-center rounded-xl px-6 py-3",
                                            "font-bold text-sm transition-all duration-200",
                                            "bg-transparent text-charcoal-300 hover:text-white hover:bg-white/10",
                                            "border border-white/10 hover:border-white/20",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900"
                                        )}
                                    >
                                        {cancelText}
                                    </button>
                                </AlertDialogPrimitive.Cancel>
                                <AlertDialogPrimitive.Action asChild>
                                    <button
                                        onClick={handleConfirm}
                                        className={cn(
                                            "flex-1 inline-flex items-center justify-center rounded-xl px-6 py-3",
                                            "font-bold text-sm transition-all duration-200",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900",
                                            variant === 'destructive'
                                                ? 'border border-crisis-red/50 text-crisis-red hover:bg-crisis-red/10 focus-visible:ring-crisis-red'
                                                : 'bg-primary text-white hover:bg-primary-hover border border-transparent focus-visible:ring-primary'
                                        )}
                                    >
                                        {confirmText}
                                    </button>
                                </AlertDialogPrimitive.Action>
                            </div>
                        </div>
                    </motion.div>
                </AlertDialogPrimitive.Content>
            </AlertDialogPrimitive.Portal>
        </AlertDialogPrimitive.Root>
    );
};
