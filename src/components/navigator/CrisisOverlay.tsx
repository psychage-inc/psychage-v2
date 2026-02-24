import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';
import { useNavigator } from '../../context/NavigatorContext';
import { CrisisResourceCard } from './CrisisResourceCard';

export const CrisisOverlay: React.FC = () => {
    const { state, dispatch } = useNavigator();

    const { crisisTriggered, crisisAcknowledged, detectedRegion, knowledgeBase } = state;
    const isVisible = crisisTriggered && !crisisAcknowledged;

    useEffect(() => {
        // Prevent body scrolling when overlay is active
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isVisible]);

    if (!knowledgeBase) return null;

    // Filter resources based on detected region or fallback to international
    const resources = knowledgeBase.crisisResources[detectedRegion || 'INT'] || knowledgeBase.crisisResources['INT'] || [];

    const handleAcknowledge = () => {
        dispatch({ type: 'ACKNOWLEDGE_CRISIS' });
    };

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
                        className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm z-[100]"
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[101] overflow-y-auto">
                        <div className="min-h-full flex items-center justify-center p-4 text-center sm:p-0">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="relative bg-charcoal-900/90 backdrop-blur-xl rounded-2xl text-left overflow-hidden shadow-[0_0_40px_rgba(239,68,68,0.15)] transform transition-all sm:my-8 sm:max-w-2xl w-full border border-crisis-red/20"
                                role="alertdialog"
                                aria-modal="true"
                                aria-labelledby="crisis-modal-title"
                            >
                                {/* Header Strip */}
                                <div className="h-2 bg-crisis-red w-full"></div>

                                <div className="px-6 py-8 sm:p-10">
                                    <div className="sm:flex sm:items-start gap-6">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-crisis-red/10 sm:mx-0">
                                            <ShieldAlert className="h-8 w-8 text-crisis-red" aria-hidden="true" />
                                        </div>

                                        <div className="mt-4 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-2xl font-serif font-bold text-white drop-shadow-sm" id="crisis-modal-title">
                                                Important Safety Information
                                            </h3>
                                            <div className="mt-3">
                                                <p className="text-base text-charcoal-200 leading-relaxed">
                                                    Based on your responses, we noticed symptoms that may require immediate attention or support. <strong className="font-semibold text-white">You don't have to go through this alone.</strong> Please consider reaching out to one of the resources below.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Crisis Resources List */}
                                    <div className="mt-8 space-y-4">
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-charcoal-300 mb-2">
                                            Available Support ({detectedRegion || 'International'})
                                        </h4>
                                        {resources.map((resource) => (
                                            <CrisisResourceCard key={resource.id} resource={resource} />
                                        ))}
                                    </div>

                                    <div className="mt-10 sm:flex sm:flex-row-reverse gap-3">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-lg border border-white/20 px-6 py-3 bg-white/10 text-base font-medium text-white shadow-sm hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 sm:w-auto sm:text-sm transition-colors backdrop-blur-md"
                                            onClick={handleAcknowledge}
                                        >
                                            I understand, continue to results
                                        </button>
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
