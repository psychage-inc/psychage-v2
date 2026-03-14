import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X, Globe, ExternalLink } from 'lucide-react';
import { useNavigator } from '../../context/NavigatorContext';
import { CrisisResourceCard } from './CrisisResourceCard';
import { useFocusTrap } from '../../hooks/useFocusTrap';

const CLOSE_DELAY_MS = 4000;

export const CrisisOverlay: React.FC = () => {
    const { state, dispatch, announceAssertive } = useNavigator();

    const { crisisTriggered, crisisAcknowledged, detectedRegion, knowledgeBase } = state;
    const isVisible = crisisTriggered && !crisisAcknowledged;

    const [closeEnabled, setCloseEnabled] = useState(false);

    const handleAcknowledge = () => {
        dispatch({ type: 'ACKNOWLEDGE_CRISIS' });
    };

    const modalRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const acknowledgeButtonRef = useRef<HTMLButtonElement>(null);

    // Custom Escape handler: focus primary button instead of closing (acknowledgment required)
    const handleEscapeKey = () => {
        if (acknowledgeButtonRef.current) {
            acknowledgeButtonRef.current.focus();
            announceAssertive("Please acknowledge to continue.");
        }
    };

    // Focus trap: traps focus within modal, Escape focuses primary button (doesn't close)
    // Initial focus goes to heading for context (WCAG 2.4.3)
    useFocusTrap(modalRef, isVisible, handleAcknowledge, undefined, headingRef, false, handleEscapeKey);

    useEffect(() => {
        // Prevent body scrolling when overlay is active
        if (isVisible) {
            document.body.style.overflow = 'hidden';
            announceAssertive("Important Safety Information shown. Please consider reaching out to one of the resources provided.");

            // Enable close button after delay
            const timer = setTimeout(() => setCloseEnabled(true), CLOSE_DELAY_MS);
            return () => {
                clearTimeout(timer);
                document.body.style.overflow = 'unset';
            };
        } else {
            document.body.style.overflow = 'unset';
            setCloseEnabled(false);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isVisible, announceAssertive]);

    // Filter resources based on detected region or fallback to international
    // If knowledgeBase is not available, use empty array (error state already handled in context)
    const resources = knowledgeBase?.crisisResources?.[detectedRegion || 'INT']
        || knowledgeBase?.crisisResources?.['INT']
        || [];

    return (
        <AnimatePresence>
            {isVisible && (
                <React.Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[100]"
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[101] overflow-y-auto">
                        <div className="min-h-full flex items-center justify-center p-4 text-center sm:p-0">
                            <motion.div
                                ref={modalRef}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="relative bg-background/90 backdrop-blur-xl rounded-2xl text-left overflow-hidden shadow-[0_0_40px_rgba(239,68,68,0.15)] transform transition-all sm:my-8 sm:max-w-2xl w-full border border-crisis-red/20"
                                role="alertdialog"
                                aria-modal="true"
                                aria-labelledby="crisis-modal-title"
                                aria-describedby="crisis-modal-desc"
                                tabIndex={-1}
                            >
                                {/* Delayed close button */}
                                <AnimatePresence>
                                    {closeEnabled && (
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            type="button"
                                            onClick={handleAcknowledge}
                                            className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-white/30 hover:text-white/60 transition-colors"
                                            aria-label="Close safety information"
                                        >
                                            <X size={18} />
                                        </motion.button>
                                    )}
                                </AnimatePresence>

                                {/* Header Strip */}
                                <div className="h-2 bg-crisis-red w-full"></div>

                                <div className="px-6 py-8 sm:p-10">
                                    <div className="sm:flex sm:items-start gap-6">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-crisis-red/10 sm:mx-0">
                                            <ShieldAlert className="h-8 w-8 text-crisis-red" aria-hidden="true" />
                                        </div>

                                        <div className="mt-4 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3
                                                ref={headingRef}
                                                className="text-2xl font-display font-bold text-text-primary drop-shadow-sm"
                                                id="crisis-modal-title"
                                                tabIndex={-1}
                                            >
                                                Important Safety Information
                                            </h3>
                                            <div className="mt-3">
                                                <p id="crisis-modal-desc" className="text-base text-text-secondary leading-relaxed">
                                                    Based on your responses, we noticed symptoms that may require immediate attention or support. <strong className="font-semibold text-text-primary">You don't have to go through this alone.</strong> Please consider reaching out to one of the resources below.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Crisis Resources List */}
                                    <div className="mt-8 space-y-4">
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-2">
                                            Available Support ({detectedRegion || 'International'})
                                        </h4>
                                        {resources.map((resource) => (
                                            <CrisisResourceCard key={resource.id} resource={resource} />
                                        ))}

                                        {/* International helpline link */}
                                        <a
                                            href="https://findahelpline.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0">
                                                <Globe size={20} className="text-teal-400" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="text-sm font-semibold text-text-primary">
                                                    Find A Helpline
                                                </p>
                                                <p className="text-xs text-text-secondary">
                                                    Search crisis helplines in any country worldwide
                                                </p>
                                            </div>
                                            <ExternalLink size={14} className="text-text-secondary group-hover:text-teal-400 transition-colors shrink-0" />
                                        </a>
                                    </div>

                                    <div className="mt-10 sm:flex sm:flex-row-reverse gap-3">
                                        <button
                                            ref={acknowledgeButtonRef}
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-lg border border-white/20 px-6 py-3 bg-white/10 text-base font-medium text-white shadow-sm hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 sm:w-auto sm:text-sm transition-colors backdrop-blur-md"
                                            onClick={handleAcknowledge}
                                        >
                                            I understand, continue to results
                                        </button>
                                    </div>

                                    {/* Disclaimer */}
                                    <div className="mt-6 pt-4 border-t border-white/10">
                                        <p className="text-xs text-text-secondary/60 leading-relaxed">
                                            Psychage is not a crisis service and does not provide emergency support.
                                            The resources shown are operated by independent organizations.
                                            If you are in immediate danger, call your local emergency number.
                                            Information may not reflect the most current availability.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </AnimatePresence>
    );
};
