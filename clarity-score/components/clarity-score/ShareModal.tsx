'use client';

import { useState } from 'react';
import { useShareAssessment } from '@/lib/hooks/useAssessment';
import { X, Copy, Check, Share2, Lock, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareModalProps {
    assessmentId: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function ShareModal({ assessmentId, isOpen, onClose }: ShareModalProps) {
    const [expiresInDays, setExpiresInDays] = useState(7);
    const [copied, setCopied] = useState(false);

    const {
        mutate: shareAssessment,
        data: shareResult,
        isPending,
        error
    } = useShareAssessment();

    const handleShare = () => {
        shareAssessment({ assessmentId, expiresInDays });
    };

    const handleCopy = async () => {
        if (!shareResult?.url) return;

        try {
            await navigator.clipboard.writeText(shareResult.url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-bg-card shadow-2xl"
                >
                    <div className="flex items-center justify-between border-b border-white/5 p-6">
                        <h2 className="font-heading text-xl text-white">Share Results</h2>
                        <button
                            onClick={onClose}
                            className="rounded-full p-2 text-text-muted transition-colors hover:bg-white/5 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6">
                        {!shareResult ? (
                            <>
                                <p className="mb-6 text-sm text-text-secondary">
                                    Create a secure, temporary link to share your Clarity Score with a healthcare provider, therapist, or trusted person.
                                </p>

                                <div className="mb-6 space-y-4">
                                    <div className="flex items-start gap-3 rounded-lg border border-teal/20 bg-teal/5 p-4">
                                        <Lock size={18} className="mt-0.5 text-teal" />
                                        <div className="text-sm">
                                            <p className="font-medium text-white">Secure Access</p>
                                            <p className="text-text-muted">Links are randomly generated and cannot be guessed.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                                            <Clock size={16} /> Link Expiration
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[1, 7, 30].map(days => (
                                                <button
                                                    key={days}
                                                    onClick={() => setExpiresInDays(days)}
                                                    className={`rounded-lg border px-3 py-2 text-sm transition-colors ${expiresInDays === days
                                                            ? 'border-teal bg-teal/10 text-teal'
                                                            : 'border-white/10 bg-white/5 text-text-muted hover:bg-white/10'
                                                        }`}
                                                >
                                                    {days} {days === 1 ? 'Day' : 'Days'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="mb-4 rounded border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                                        {error.message || 'Failed to generate share link.'}
                                    </div>
                                )}

                                <button
                                    onClick={handleShare}
                                    disabled={isPending}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal px-4 py-3 font-medium text-white transition-colors hover:bg-teal-hover disabled:opacity-50"
                                >
                                    {isPending ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                                            Generating...
                                        </div>
                                    ) : (
                                        <>
                                            <Share2 size={18} /> Generate Secure Link
                                        </>
                                    )}
                                </button>
                            </>
                        ) : (
                            <div className="space-y-6 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                                    <Check size={32} />
                                </div>

                                <div>
                                    <h3 className="mb-2 font-heading text-lg text-white">Link Generated!</h3>
                                    <p className="text-sm text-text-muted">
                                        This link will expire in {expiresInDays} {expiresInDays === 1 ? 'day' : 'days'}.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 p-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={shareResult.url}
                                        className="w-full bg-transparent px-2 text-sm text-text-primary outline-none"
                                    />
                                    <button
                                        onClick={handleCopy}
                                        className={`flex shrink-0 items-center justify-center rounded-md p-2 transition-colors ${copied ? 'bg-emerald-500 text-white' : 'bg-white/10 text-text-primary hover:bg-white/20'
                                            }`}
                                    >
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>

                                <p className="text-xs text-text-muted">
                                    Anyone with this exact link can view these results until they expire.
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
