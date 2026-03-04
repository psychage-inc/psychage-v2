'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ExternalLink, ShieldAlert } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface CrisisModalProps {
    isOpen: boolean;
    onContinue: () => void;
}

export default function CrisisModal({ isOpen, onContinue }: CrisisModalProps) {
    const continueRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => continueRef.current?.focus(), 100);

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    e.preventDefault();
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="crisis-title"
                        aria-describedby="crisis-desc"
                        className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-bg-secondary shadow-2xl"
                    >
                        <div className="flex flex-col items-center border-b border-red-500/20 bg-red-500/10 p-6">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-red-400 ring-4 ring-red-500/10">
                                <ShieldAlert size={32} />
                            </div>
                            <h2 id="crisis-title" className="font-heading text-center text-2xl text-white">Safety Support Check</h2>
                        </div>

                        <div className="space-y-6 p-8">
                            <p id="crisis-desc" className="text-center text-lg leading-relaxed text-text-primary">
                                Your responses indicate you may be experiencing significant distress right now.
                                <strong className="mt-2 block text-white">You don't have to carry this alone.</strong>
                            </p>

                            <div className="space-y-3">
                                <a
                                    href="https://988lifeline.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center gap-4 rounded-xl bg-red-500 p-4 font-medium text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-colors hover:bg-red-600 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary"
                                >
                                    <Phone size={24} className="shrink-0" />
                                    <div className="flex-1">
                                        <div className="text-lg font-bold">Call or Text 988</div>
                                        <div className="text-sm font-normal text-red-100">Free, confidential, 24/7 crisis support</div>
                                    </div>
                                    <ExternalLink size={20} className="text-red-200" />
                                </a>
                            </div>

                            <div className="mt-6 flex flex-col items-center border-t border-white/10 pt-6">
                                <button
                                    ref={continueRef}
                                    onClick={onContinue}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-4 text-sm font-medium text-text-muted transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                >
                                    I'm safe right now — continue assessment
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
