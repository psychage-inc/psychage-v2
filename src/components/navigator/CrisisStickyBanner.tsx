import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CrisisStickyBanner: React.FC = () => {
    const [isDismissed, setIsDismissed] = useState(false);

    return (
        <AnimatePresence>
            {!isDismissed && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-0 left-0 right-0 bg-charcoal-950/95 backdrop-blur-md border-t border-crisis-red/30 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
                    style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                    role="region"
                    aria-label="Crisis support resources"
                >
                    {/* Mobile Layout */}
                    <div className="sm:hidden px-4 py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Phone className="w-5 h-5 text-crisis-red flex-shrink-0 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-white truncate">
                                    Crisis? Call 988
                                </div>
                                <a
                                    href="tel:988"
                                    className="text-xs text-crisis-red hover:text-red-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crisis-red focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950 rounded"
                                >
                                    Tap to call now
                                </a>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsDismissed(true)}
                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                            aria-label="Dismiss crisis banner"
                        >
                            <X className="w-4 h-4 text-charcoal-300" />
                        </button>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:block">
                        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-crisis-red drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                                <span className="text-sm font-medium text-white tracking-wide">
                                    In crisis? Call or text 988 (US)
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <a
                                    href="tel:988"
                                    className="text-sm font-semibold text-crisis-red hover:text-red-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crisis-red focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950 rounded px-2 py-1"
                                >
                                    Call Now
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setIsDismissed(true)}
                                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                    aria-label="Dismiss crisis banner"
                                >
                                    <X className="w-3 h-3 text-charcoal-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
