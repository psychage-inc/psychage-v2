import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigator } from '../../context/NavigatorContext';
import { ResultCard } from '../navigator/ResultCard';
import { NextStepCards, NextStepItem } from '../navigator/NextStepCards';
import { ProviderQuestions } from '../navigator/ProviderQuestions';
import { NavigatorButton } from '../navigator/NavigatorButton';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { CrisisResourceCard } from '../navigator/CrisisResourceCard';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { generateProviderQuestions } from '../../lib/navigator/providerQuestions';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { staggerContainer, slideUp } from '../../lib/animations';

export const ResultsScreen: React.FC = () => {
    const { state, dispatch, announcePolite } = useNavigator();
    const { results, knowledgeBase, detectedRegion, isLoading, error, selectedSymptoms } = state;
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    // Brief success moment before revealing result cards
    useEffect(() => {
        if (prefersReducedMotion) {
            setShowContent(true);
            return;
        }
        const timer = setTimeout(() => setShowContent(true), 400);
        return () => clearTimeout(timer);
    }, [prefersReducedMotion]);

    const handleResetClick = () => {
        setShowResetConfirm(true);
    };

    const handleResetConfirm = () => {
        dispatch({ type: 'RESET_FLOW' });
        announcePolite('Flow reset. Returning to welcome screen.');
    };

    React.useEffect(() => {
        if (results && results.results) {
            if (results.results.length > 0) {
                announcePolite(`Results ready. ${results.results.length} possible conditions shown.`);
            } else {
                announcePolite(`Results ready. We couldn't find a strong match for your specific combination of symptoms.`);
            }
        }
    }, [results, announcePolite]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4" aria-busy="true" aria-live="polite">
                <div className="w-8 h-8 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
                <p className="text-charcoal-200 font-medium tracking-wide">Loading your insights...</p>
            </div>
        );
    }

    if (error || !results || !knowledgeBase) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center px-4" role="alert">
                <div className="w-16 h-16 bg-crisis-red/10 rounded-full flex items-center justify-center">
                    <ShieldAlert className="w-8 h-8 text-crisis-red" />
                </div>
                <div>
                    <h3 className="text-2xl font-serif text-white mb-2">Notice</h3>
                    <p className="text-charcoal-200 max-w-md">{error || "Unable to load results. Please try again."}</p>
                </div>
                <NavigatorButton
                    variant="outline"
                    onClick={handleResetClick}
                >
                    Start Over
                </NavigatorButton>
            </div>
        );
    }

    const { safety, results: matchResults } = results;

    const nextSteps: NextStepItem[] = [
        {
            id: 'ns1',
            type: 'track',
            title: 'Track Your Symptoms',
            description: 'Consider keeping a daily log of how you feel, noting what makes things better or worse.',
            actionText: 'Start Tracking'
        },
        {
            id: 'ns2',
            type: 'professional',
            title: 'Consult a Professional',
            description: 'Share these insights with a healthcare provider for an accurate assessment.',
            actionText: 'Find a Provider'
        },
        {
            id: 'ns3',
            type: 'selfcare',
            title: 'Practice Self-Care',
            description: 'Explore the Library for guided exercises and educational content.',
            actionText: 'Explore Library'
        }
    ];

    // Generate personalized provider questions based on results
    const questions = useMemo(() => {
        if (!results || !knowledgeBase) {
            return [
                "I've been noticing these symptoms for some time. Is this typical?",
                "Could this be related to stress, physical health, or something else?",
                "What are the most effective treatment options for someone with these specific experiences?",
                "Are there any lifestyle changes you would recommend starting today?"
            ];
        }
        return generateProviderQuestions({
            results,
            selectedSymptoms,
            knowledgeBase
        });
    }, [results, selectedSymptoms, knowledgeBase]);

    const resources = knowledgeBase.crisisResources[detectedRegion || 'DEFAULT'] || knowledgeBase.crisisResources['DEFAULT'] || [];

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-12 pb-24">
            <div className="text-center mb-8 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal-500/20 blur-[50px] rounded-full pointer-events-none" />
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex justify-center mb-4 relative z-10"
                >
                    <CheckCircle2 className="w-10 h-10 text-teal-400 drop-shadow-[0_0_12px_rgba(45,212,191,0.4)]" />
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-serif text-text-primary mb-4 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)] relative z-10">
                    Your Insights
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto relative z-10">
                    Based on what you've shared, here are some patterns that might relate to your experience. Remember, this is not a diagnosis.
                </p>
            </div>

            <AnimatePresence>
            {showContent && (
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-12"
                >
                    {safety.has_crisis && (
                        <motion.div variants={slideUp}>
                            <div className="bg-crisis-red/5 backdrop-blur-md border border-crisis-red/20 shadow-[0_0_30px_rgba(239,68,68,0.1)] p-6 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-crisis-red z-10 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                                <div className="flex items-start gap-4 ml-2">
                                    <ShieldAlert className="w-8 h-8 text-crisis-red flex-shrink-0 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                                    <div>
                                        <h3 className="text-xl font-serif font-semibold text-text-primary mb-2">
                                            Prioritizing Your Safety
                                        </h3>
                                        <p className="text-text-secondary mb-6 max-w-2xl leading-relaxed">
                                            You mentioned experiences that indicate you might be going through a particularly difficult time. Your safety is deeply important. Please reach out to these resources for immediate support.
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {resources.map((resource) => (
                                                <CrisisResourceCard key={resource.id} resource={resource} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Recommended Matches */}
                    <motion.section variants={slideUp} className="relative z-10">
                        <h3 className="text-2xl font-serif font-medium text-text-primary mb-6 drop-shadow-sm">
                            Relevant Profiles
                        </h3>
                        <div className="space-y-4">
                            {matchResults.map((match, i) => (
                                <motion.div
                                    key={match.condition_id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.12), duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    <ResultCard result={match} />
                                </motion.div>
                            ))}
                            {matchResults.length === 0 && (
                                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10 shadow-lg relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                    <p className="text-text-secondary font-medium tracking-wide relative z-10">
                                        We couldn't find a strong match for your specific combination of symptoms, but your experience is still valid.
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.section>

                    {/* Next Steps */}
                    <motion.section variants={slideUp} className="relative z-10">
                        <h3 className="text-2xl font-serif font-medium text-text-primary mb-6 drop-shadow-sm">
                            Suggested Next Steps
                        </h3>
                        <NextStepCards steps={nextSteps} />
                    </motion.section>

                    <motion.section variants={slideUp}>
                        <ProviderQuestions questions={questions} />
                    </motion.section>

                    <motion.div variants={slideUp} className="flex justify-center pt-8 border-t border-white/10 relative z-10">
                        <NavigatorButton variant="outline" onClick={handleResetClick}>
                            Start Over
                        </NavigatorButton>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>

            <ConfirmDialog
                isOpen={showResetConfirm}
                onClose={() => setShowResetConfirm(false)}
                onConfirm={handleResetConfirm}
                title="Start Over?"
                message="This will clear your current selections and results. You'll return to the beginning of the Symptom Navigator."
                confirmText="Start Over"
                cancelText="Cancel"
                variant="destructive"
            />
        </div>
    );
};
