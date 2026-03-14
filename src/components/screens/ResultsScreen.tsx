import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigator } from '../../context/NavigatorContext';
import { ResultCard } from '../navigator/ResultCard';
import { NextStepCards, NextStepItem } from '../navigator/NextStepCards';
import { ProviderQuestions } from '../navigator/ProviderQuestions';
import { NavigatorButton } from '../navigator/NavigatorButton';
import { DisclaimerCard } from '../navigator/DisclaimerCard';
import { ShieldAlert, CheckCircle2, AlertTriangle, Stethoscope, FileText } from 'lucide-react';
import { CrisisResourceCard } from '../navigator/CrisisResourceCard';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { generateProviderQuestions } from '../../lib/navigator/providerQuestions';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { staggerContainer, staggerItem, slideUp, spark } from '../../lib/animations';
import { SkeletonResultCard } from '../navigator/NavigatorSkeletons';

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
        const timer = setTimeout(() => setShowContent(true), 200);
        return () => clearTimeout(timer);
    }, [prefersReducedMotion]);

    const handleResetClick = () => {
        setShowResetConfirm(true);
    };

    const handleResetConfirm = () => {
        dispatch({ type: 'RESET_FLOW' });
        announcePolite('Flow reset. Returning to welcome screen.');
    };

    useEffect(() => {
        if (results?.results) {
            if (results.results.length > 0) {
                announcePolite(`Results ready. ${results.results.length} possible conditions identified.`);
            } else {
                announcePolite(`Results ready. No strong matches found for your specific combination.`);
            }
        }
    }, [results, announcePolite]);

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-4" aria-busy="true" aria-live="polite">
                <SkeletonResultCard />
                <SkeletonResultCard />
                <SkeletonResultCard />
            </div>
        );
    }

    if (error || !results || !knowledgeBase) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[30vh] sm:min-h-[40vh] lg:min-h-[50vh] space-y-6 text-center px-4" role="alert">
                <div className="w-16 h-16 bg-crisis-red/10 rounded-full flex items-center justify-center">
                    <ShieldAlert className="w-8 h-8 text-crisis-red" />
                </div>
                <div>
                    <h3 className="text-2xl font-display text-text-primary mb-2">Unable to Load Results</h3>
                    <p className="text-text-secondary max-w-md">{error || "Something went wrong while preparing your results. Please try again."}</p>
                </div>
                <div className="flex gap-3">
                    <NavigatorButton
                        variant="outline"
                        onClick={() => dispatch({ type: 'SET_STEP', payload: 'symptoms' })}
                    >
                        Go Back
                    </NavigatorButton>
                    <NavigatorButton
                        variant="primary"
                        onClick={handleResetClick}
                    >
                        Start Over
                    </NavigatorButton>
                </div>
            </div>
        );
    }

    // Safe destructuring with fallbacks
    const safety = results.safety ?? { has_crisis: false, has_urgent: false, has_watch: false, flags: [], crisis_resources: [], highest_level: null, should_halt: false };
    const matchResults = Array.isArray(results.results) ? results.results : [];
    const symptomCount = selectedSymptoms?.size ?? 0;
    const hasUrgentFlags = safety.has_crisis || safety.has_urgent;
    const hasWatchFlags = safety.has_watch;
    const anyProfessionalRecommended = matchResults.some(r => r.always_recommend_professional);

    const nextSteps: NextStepItem[] = [
        {
            id: 'ns1',
            type: 'track',
            title: 'Track Your Symptoms',
            description: 'Keep a daily log of how you feel, noting patterns, triggers, and what helps. This information is invaluable for any future clinical conversations.',
            actionText: 'Start Tracking'
        },
        {
            id: 'ns2',
            type: 'professional',
            title: 'Talk to a Professional',
            description: 'Share these insights with a therapist, counselor, or doctor. They can provide an accurate assessment based on your full history.',
            actionText: 'Find a Provider'
        },
        {
            id: 'ns3',
            type: 'selfcare',
            title: 'Explore Self-Care Resources',
            description: 'Our library includes guided exercises, educational content, and coping strategies tailored to different experiences.',
            actionText: 'Browse Library'
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
        try {
            return generateProviderQuestions({ results, selectedSymptoms, knowledgeBase });
        } catch {
            return [
                "I've been noticing these symptoms for some time. Is this typical?",
                "What are the most effective treatment options for someone with these experiences?",
                "Are there any lifestyle changes you would recommend?",
            ];
        }
    }, [results, selectedSymptoms, knowledgeBase]);

    const resources = knowledgeBase.crisisResources?.[detectedRegion || 'DEFAULT']
        || knowledgeBase.crisisResources?.['DEFAULT']
        || [];

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-10 pb-24">
            {/* ─── Header ─── */}
            <div className="text-center mb-4 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal-500/20 blur-[50px] rounded-full pointer-events-none" />
                <motion.div
                    variants={spark}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-center mb-4 relative z-10"
                >
                    <div className="relative">
                        <CheckCircle2 className="w-10 h-10 text-teal-400 drop-shadow-[0_0_12px_rgba(45,212,191,0.4)]" />
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-teal-400/60"
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                        />
                    </div>
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-display text-text-primary mb-4 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)] relative z-10">
                    Your Insights
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto relative z-10">
                    Based on what you've shared, here are patterns that may relate to your experience.
                </p>
            </div>

            <AnimatePresence>
            {showContent && (
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-10"
                >
                    {/* ─── Section 1: Summary ─── */}
                    <motion.section variants={slideUp} className="relative z-10">
                        <div className="bg-surface/50 backdrop-blur-xl rounded-2xl border border-border p-6 shadow-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none" />
                            <div className="relative z-10 flex items-start gap-4">
                                <div className="flex-shrink-0 p-2 bg-teal-500/10 rounded-xl border border-teal-500/20">
                                    <FileText className="w-5 h-5 text-teal-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-display text-lg font-medium text-text-primary">Summary</h3>
                                    <p className="text-text-secondary leading-relaxed">
                                        We analyzed <strong className="text-text-primary font-semibold">{symptomCount} symptom{symptomCount !== 1 ? 's' : ''}</strong> you
                                        reported{matchResults.length > 0
                                            ? <> and identified <strong className="text-text-primary font-semibold">{matchResults.length} possible pattern{matchResults.length !== 1 ? 's' : ''}</strong> that may be relevant to your experience.</>
                                            : <> but did not find a strong match for your specific combination. This doesn't mean your experience isn't valid — it may reflect something unique or multi-faceted.</>
                                        }
                                    </p>
                                    {hasUrgentFlags && (
                                        <p className="text-crisis-red font-medium text-sm">
                                            Some of the experiences you described may need immediate attention. Please review the safety resources below.
                                        </p>
                                    )}
                                    {hasWatchFlags && !hasUrgentFlags && (
                                        <p className="text-amber-500 font-medium text-sm">
                                            Some of your reported experiences are worth monitoring closely. Consider speaking with a professional.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* ─── Section 2: Red Flags / Seek Urgent Care ─── */}
                    {hasUrgentFlags && (
                        <motion.section variants={slideUp} aria-label="Crisis resources">
                            <div className="bg-crisis-red/5 backdrop-blur-md border border-crisis-red/20 shadow-[0_0_30px_rgba(239,68,68,0.1)] p-6 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-crisis-red z-10 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                                <div className="flex items-start gap-4 ml-2">
                                    <ShieldAlert className="w-8 h-8 text-crisis-red flex-shrink-0 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                                    <div>
                                        <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                                            Prioritizing Your Safety
                                        </h3>
                                        <p className="text-text-secondary mb-6 max-w-2xl leading-relaxed">
                                            You mentioned experiences that suggest you may be going through a particularly difficult time. Your safety matters deeply. Please reach out for immediate support.
                                        </p>
                                        {resources.length > 0 && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {resources.map((resource) => (
                                                    <CrisisResourceCard key={resource.id} resource={resource} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {/* ─── Section 3: Likely Possibilities ─── */}
                    <motion.section variants={slideUp} className="relative z-10">
                        <h3 className="text-2xl font-display font-medium text-text-primary mb-2 drop-shadow-sm">
                            {matchResults.length > 0 ? 'Likely Possibilities' : 'Assessment Results'}
                        </h3>
                        <p className="text-sm text-text-secondary mb-6">
                            {matchResults.length > 0
                                ? 'These profiles reflect patterns commonly associated with the symptoms you described. They are ranked by relevance — not certainty.'
                                : 'Based on the symptoms you selected, no strong pattern match was found.'
                            }
                        </p>
                        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
                            {matchResults.map((match) => (
                                <motion.div key={match.condition_id} variants={staggerItem}>
                                    <ResultCard result={match} />
                                </motion.div>
                            ))}
                            {matchResults.length === 0 && (
                                <div className="bg-surface/50 backdrop-blur-xl rounded-2xl p-8 text-center border border-border shadow-lg relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-surface-hover/50 to-transparent pointer-events-none" />
                                    <div className="relative z-10 space-y-3">
                                        <p className="text-text-secondary font-medium">
                                            We couldn't find a strong match for your specific combination of symptoms.
                                        </p>
                                        <p className="text-text-tertiary text-sm max-w-lg mx-auto">
                                            This can happen when symptoms span multiple areas or don't fit neatly into common patterns. Your experience is still valid, and a professional can help you understand what you're going through.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.section>

                    {/* ─── Section 4: When to See a Clinician ─── */}
                    <motion.section variants={slideUp} className="relative z-10">
                        <div className="bg-surface/50 backdrop-blur-xl rounded-2xl border border-border p-6 shadow-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
                            <div className="relative z-10 flex items-start gap-4">
                                <div className="flex-shrink-0 p-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                    <Stethoscope className="w-5 h-5 text-purple-400" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="font-display text-lg font-medium text-text-primary">When to See a Clinician</h3>
                                    <ul className="space-y-2 text-sm text-text-secondary leading-relaxed">
                                        {hasUrgentFlags && (
                                            <li className="flex items-start gap-2">
                                                <span className="text-crisis-red mt-1 flex-shrink-0">*</span>
                                                <span><strong className="text-text-primary">Immediately</strong> — your responses included experiences that suggest you may need urgent professional support.</span>
                                            </li>
                                        )}
                                        {anyProfessionalRecommended && (
                                            <li className="flex items-start gap-2">
                                                <span className="text-amber-500 mt-1 flex-shrink-0">*</span>
                                                <span><strong className="text-text-primary">As soon as practical</strong> — one or more of the patterns identified above is best assessed by a trained professional.</span>
                                            </li>
                                        )}
                                        <li className="flex items-start gap-2">
                                            <span className="text-teal-400 mt-1 flex-shrink-0">*</span>
                                            <span>If your symptoms persist for more than <strong className="text-text-primary">two weeks</strong> or begin to interfere with daily activities, work, or relationships.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-teal-400 mt-1 flex-shrink-0">*</span>
                                            <span>If you notice your symptoms worsening over time or new symptoms emerging.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-teal-400 mt-1 flex-shrink-0">*</span>
                                            <span>If self-care strategies aren't providing relief, or if you're unsure whether what you're experiencing is typical.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* ─── Section 5: Self-Care & Next Steps ─── */}
                    <motion.section variants={slideUp} className="relative z-10">
                        <h3 className="text-2xl font-display font-medium text-text-primary mb-6 drop-shadow-sm">
                            Suggested Next Steps
                        </h3>
                        <NextStepCards steps={nextSteps} />
                    </motion.section>

                    {/* ─── Section 6: Questions for Your Provider ─── */}
                    <motion.section variants={slideUp}>
                        <ProviderQuestions questions={questions} />
                    </motion.section>

                    {/* ─── Section 7: Important Disclaimer ─── */}
                    <motion.section variants={slideUp} className="relative z-10" aria-label="Disclaimer">
                        <div className="bg-amber-500/5 backdrop-blur-xl rounded-2xl border border-amber-500/20 p-6 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 left-0 bottom-0 w-1 bg-amber-500/50 z-10" />
                            <div className="flex items-start gap-4 ml-1">
                                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div className="space-y-2">
                                    <h3 className="font-display text-base font-medium text-text-primary">Important Disclaimer</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        This tool provides <strong className="font-semibold text-text-primary">educational information only</strong> and is not a substitute for professional medical advice, diagnosis, or treatment. The results shown are based on general patterns and may not reflect your individual situation.
                                    </p>
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        Always consult a qualified healthcare provider for personal medical concerns. If you are in crisis, please contact emergency services or a crisis helpline immediately.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* ─── Actions ─── */}
                    <motion.div variants={slideUp} className="flex justify-center pt-6 border-t border-border relative z-10">
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
