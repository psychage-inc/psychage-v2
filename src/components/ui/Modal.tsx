import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeIn, scaleIn } from '@/lib/animations';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, maxWidth = 'md' }) => {
    return (
        <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <AnimatePresence>
                {isOpen && (
                    <DialogPrimitive.Portal forceMount>
                        {/* Backdrop */}
                        <DialogPrimitive.Overlay asChild forceMount>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={fadeIn}
                                className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
                            />
                        </DialogPrimitive.Overlay>

                        {/* Content */}
                        <DialogPrimitive.Content asChild forceMount aria-describedby={undefined}>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={scaleIn}
                                className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                            >
                                <div
                                    className={cn(
                                        "relative w-full bg-surface rounded-2xl shadow-xl overflow-hidden",
                                        "border border-white/20",
                                        maxWidths[maxWidth]
                                    )}
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between p-6 border-b border-border">
                                        {title ? (
                                            <DialogPrimitive.Title className="text-xl font-display font-bold text-text-primary">
                                                {title}
                                            </DialogPrimitive.Title>
                                        ) : (
                                            <DialogPrimitive.Title className="sr-only">Dialog</DialogPrimitive.Title>
                                        )}
                                        <DialogPrimitive.Close asChild>
                                            <button
                                                className="p-2 -mr-2 text-text-tertiary hover:text-text-primary hover:bg-surface-hover rounded-full transition-colors"
                                                aria-label="Close modal"
                                            >
                                                <X size={20} />
                                            </button>
                                        </DialogPrimitive.Close>
                                    </div>

                                    {/* Body */}
                                    <div className="p-6 overflow-y-auto max-h-[80vh] custom-scrollbar">
                                        {children}
                                    </div>
                                </div>
                            </motion.div>
                        </DialogPrimitive.Content>
                    </DialogPrimitive.Portal>
                )}
            </AnimatePresence>
        </DialogPrimitive.Root>
    );
};

// Named exports for compound component usage
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogOverlay = DialogPrimitive.Overlay;
export const DialogContent = DialogPrimitive.Content;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
export const DialogClose = DialogPrimitive.Close;

export default Modal;
