/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigator } from '../../context/NavigatorContext';
import { ResultCard } from '../navigator/ResultCard';
import { NextStepCards, NextStepItem } from '../navigator/NextStepCards';
import { ProviderQuestions } from '../navigator/ProviderQuestions';
import { NavigatorButton } from '../navigator/NavigatorButton';
import {
    ShieldAlert,
    AlertTriangle,
    Stethoscope,
    Activity,
    Compass,
    ArrowRight,
} from 'lucide-react';
import { CrisisResourceCard } from '../navigator/CrisisResourceCard';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { generateProviderQuestions } from '../../lib/navigator/providerQuestions';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { staggerContainer, staggerItem, slideUp } from '../../lib/animations';
import { SkeletonResultCard } from '../navigator/NavigatorSkeletons';
import ToolRecommendation from '../tools/shared/ToolRecommendation';
import FeedbackWidget from '../ui/FeedbackWidget';

/* ─────────────────────────────────────────────────────────────────────────────
 * Section label — matches homepage overline pattern
 * ────────────────────────────────────────────────────────────────────────── */
const SectionLabel: React.FC<{
    number: string;
    label: string;
}> = ({ number, label }) => (
    <div className="flex items-center gap-3 mb-3">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-white/[0.06] text-[11px] font-bold text-gray-500 dark:text-neutral-400 border border-gray-200 dark:border-white/10">
            {number}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            {label}
        </span>
    </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
 * Severity label helper
 * ────────────────────────────────────────────────────────────────────────── */
function severityLabel(severity?: number): string | null {
    if (!severity) return null;
    if (severity <= 3) return 'Mild';
    if (severity <= 6) return 'Moderate';
    if (severity <= 8) return 'Significant';
    return 'Severe';
}

function severityColor(severity?: number): string {
    if (!severity) return 'text-text-tertiary';
    if (severity <= 3) return 'text-gray-400 dark:text-neutral-500';
    if (severity <= 6) return 'text-amber-600 dark:text-amber-400';
    if (severity <= 8) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
}

/* ═══════════════════════════════════════════════════════════════════════════
 * ResultsScreen
 * ═══════════════════════════════════════════════════════════════════════════ */
export const ResultsScreen: React.FC = () => {
    const navigate = useNavigate();
    const { state, dispatch, announcePolite } = useNavigator();
    const { results, knowledgeBase, detectedRegion, isLoading, error, selectedSymptoms } = state;
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    // Brief pause before revealing content
    useEffect(() => {
        if (prefersReducedMotion) {
            setShowContent(true);
            return;
        }
        const timer = setTimeout(() => setShowContent(true), 200);
        return () => clearTimeout(timer);
    }, [prefersReducedMotion]);

    const handleResetClick = () => setShowResetConfirm(true);

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

    /* ── Loading ── */
    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-4" aria-busy="true" aria-live="polite">
                <SkeletonResultCard />
                <SkeletonResultCard />
                <SkeletonResultCard />
            </div>
        );
    }

    /* ── Error ── */
    if (error || !results || !knowledgeBase) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[30vh] sm:min-h-[40vh] lg:min-h-[50vh] space-y-6 text-center px-4" role="alert">
                <div className="w-16 h-16 bg-crisis-red/10 rounded-full flex items-center justify-center">
                    <ShieldAlert className="w-8 h-8 text-crisis-red" />
                </div>
                <div>
                    <h3 className="text-2xl font-display font-bold text-text-primary mb-2">Unable to Load Results</h3>
                    <p className="text-text-secondary max-w-md">{error || "Something went wrong while preparing your results. Please try again."}</p>
                </div>
                <div className="flex gap-3">
                    <NavigatorButton variant="outline" onClick={() => dispatch({ type: 'SET_STEP', payload: 'symptoms' })}>
                        Go Back
                    </NavigatorButton>
                    <NavigatorButton variant="primary" onClick={handleResetClick}>
                        Start Over
                    </NavigatorButton>
                </div>
            </div>
        );
    }

    /* ── Derived data ── */
    const safety = results.safety ?? { has_crisis: false, has_urgent: false, has_watch: false, flags: [], crisis_resources: [], highest_level: null, should_halt: false };
    const matchResults = Array.isArray(results.results) ? results.results : [];
    const symptomCount = selectedSymptoms?.size ?? 0;
    const hasUrgentFlags = safety.has_crisis || safety.has_urgent;
    const hasWatchFlags = safety.has_watch;
    const anyProfessionalRecommended = matchResults.some(r => r.always_recommend_professional);

    const strongMatches = matchResults.filter(r => r.relevance_level === 'high' || r.relevance_level === 'moderate');
    const exploratoryMatches = matchResults.filter(r => r.relevance_level === 'low' || r.relevance_level === 'minimal');
    const allWeak = matchResults.length > 0 && strongMatches.length === 0;

    // Build enriched symptom list from knowledgeBase
    const symptomDetails = useMemo(() => {
        if (!selectedSymptoms || !knowledgeBase) return [];
        const details: { id: string; name: string; severity?: number; duration?: string; frequency?: string }[] = [];
        selectedSymptoms.forEach((input, symptomId) => {
            const symptomDef = knowledgeBase.symptoms.find(s => s.id === symptomId);
            if (symptomDef) {
                details.push({
                    id: symptomId,
                    name: symptomDef.name.replace(/_/g, ' '),
                    severity: input.severity,
                    duration: input.duration?.replace(/_/g, ' '),
                    frequency: input.frequency,
                });
            }
        });
        return details;
    }, [selectedSymptoms, knowledgeBase]);

    const nextSteps: NextStepItem[] = [
        {
            id: 'ns1',
            type: 'track',
            title: 'Track Your Symptoms',
            description: 'Keep a daily log of how you feel, noting patterns, triggers, and what helps. This information is invaluable for any future clinical conversations.',
            actionText: 'Start Tracking',
            onClick: () => navigate('/tools/mood-journal')
        },
        {
            id: 'ns2',
            type: 'professional',
            title: 'Talk to a Professional',
            description: 'Share these insights with a therapist, counselor, or doctor. They can provide an accurate assessment based on your full history.',
            actionText: 'Find a Provider',
            onClick: () => navigate('/providers/search')
        },
        {
            id: 'ns3',
            type: 'selfcare',
            title: 'Explore Self-Care Resources',
            description: 'Our library includes guided exercises, educational content, and coping strategies tailored to different experiences.',
            actionText: 'Browse Library',
            onClick: () => navigate('/learn')
        }
    ];

    // Generate personalized provider questions
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

    /* ══════════════════════════════════════════════════════════════════════════
     * Render
     * ═════════════════════════════════════════════════════════════════════════ */
    return (
        <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 pb-24">
            {/* ─── Page Header ─── */}
            <header className="mb-12">
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-primary tracking-tight mb-3">
                    Your Results
                </h1>
                <p className="text-base text-text-secondary max-w-2xl leading-relaxed">
                    Based on the {symptomCount} symptom{symptomCount !== 1 ? 's' : ''} you reported, here is what we found. This is an educational overview — not a diagnosis.
                </p>
            </header>

            {/* ─── Crisis Banner (always top-priority) ─── */}
            {hasUrgentFlags && (
                <div className="mb-10 bg-red-50 dark:bg-crisis-red/[0.06] border border-red-200 dark:border-crisis-red/20 rounded-xl p-5 relative overflow-hidden" role="alert">
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-crisis-red" />
                    <div className="flex items-start gap-3.5 ml-1">
                        <ShieldAlert className="w-5 h-5 text-crisis-red flex-shrink-0 mt-0.5" />
                        <div>
                            <h2 className="text-base font-display font-bold text-text-primary mb-1.5">
                                Prioritizing Your Safety
                            </h2>
                            <p className="text-sm text-text-secondary leading-relaxed mb-5">
                                You mentioned experiences that suggest you may be going through a particularly difficult time. Your safety matters deeply. Please reach out for immediate support.
                            </p>
                            {resources.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {resources.map((resource) => (
                                        <CrisisResourceCard key={resource.id} resource={resource} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Watch-level notice ─── */}
            {hasWatchFlags && !hasUrgentFlags && (
                <div className="mb-10 bg-amber-50 dark:bg-amber-500/[0.06] border border-amber-200 dark:border-amber-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-text-secondary leading-relaxed">
                            Some of your reported experiences are worth monitoring closely. Consider speaking with a professional if they persist.
                        </p>
                    </div>
                </div>
            )}

            <AnimatePresence>
            {showContent && (
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-0"
                >
                    {/* ═══════════════════════════════════════════════════════════
                     * SECTION 1 — Your Symptoms
                     * ═══════════════════════════════════════════════════════════ */}
                    <motion.section variants={slideUp} className="pb-10 mb-10 border-b border-border">
                        <SectionLabel number="1" label="Your Symptoms" />
                        <h2 className="text-xl font-display font-bold text-text-primary mb-1.5">
                            What You Reported
                        </h2>
                        <p className="text-sm text-text-secondary mb-6">
                            {symptomCount} symptom{symptomCount !== 1 ? 's' : ''} across your selected areas of concern.
                        </p>

                        <div className="space-y-2">
                            {symptomDetails.map((symptom) => (
                                <div
                                    key={symptom.id}
                                    className="flex items-center justify-between gap-4 py-3 px-4 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06]"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <Activity className="w-3.5 h-3.5 text-gray-400 dark:text-neutral-500 flex-shrink-0" />
                                        <span className="text-sm font-medium text-text-primary truncate">
                                            {symptom.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0 text-xs">
                                        {symptom.severity && (
                                            <span className={`font-medium ${severityColor(symptom.severity)}`}>
                                                {severityLabel(symptom.severity)}
                                            </span>
                                        )}
                                        {symptom.frequency && (
                                            <span className="text-text-tertiary capitalize">
                                                {symptom.frequency}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* ═══════════════════════════════════════════════════════════
                     * SECTION 2 — Possible Patterns
                     * ═══════════════════════════════════════════════════════════ */}
                    <motion.section variants={slideUp} className="pb-10 mb-10 border-b border-border">
                        <SectionLabel number="2" label="Possible Patterns" />

                        {/* Strong matches */}
                        {strongMatches.length > 0 && (
                            <>
                                <h2 className="text-xl font-display font-bold text-text-primary mb-1.5">
                                    Likely Patterns
                                </h2>
                                <p className="text-sm text-text-secondary mb-6">
                                    These profiles reflect patterns commonly associated with the symptoms you described. Ranked by relevance — not certainty.
                                </p>
                                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-3 mb-8">
                                    {strongMatches.map((match) => (
                                        <motion.div key={match.condition_id} variants={staggerItem}>
                                            <ResultCard result={match} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </>
                        )}

                        {/* Exploratory matches */}
                        {exploratoryMatches.length > 0 && (
                            <>
                                <h3 className="text-lg font-display font-semibold text-text-primary mb-1.5 mt-2">
                                    {strongMatches.length > 0 ? 'Worth Exploring' : 'Possible Patterns'}
                                </h3>
                                <p className="text-sm text-text-secondary mb-5">
                                    {strongMatches.length > 0
                                        ? 'These showed a weaker connection but may be worth discussing with a professional.'
                                        : 'Your symptoms showed a partial match with these patterns. They may be a helpful starting point for a conversation with a provider.'
                                    }
                                </p>
                                {allWeak && (
                                    <div className="bg-amber-50 dark:bg-amber-500/[0.05] border border-amber-200 dark:border-amber-500/20 rounded-lg p-4 mb-5">
                                        <p className="text-sm text-text-secondary leading-relaxed">
                                            <strong className="text-amber-700 dark:text-amber-400 font-semibold">Tip:</strong> Providing more detail about severity, duration, and frequency can help produce stronger matches. You can also try selecting additional symptoms.
                                        </p>
                                    </div>
                                )}
                                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-3">
                                    {exploratoryMatches.map((match) => (
                                        <motion.div key={match.condition_id} variants={staggerItem}>
                                            <ResultCard result={match} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </>
                        )}

                        {/* No matches */}
                        {matchResults.length === 0 && (
                            <>
                                <h2 className="text-xl font-display font-bold text-text-primary mb-1.5">
                                    No Strong Matches Found
                                </h2>
                                <p className="text-sm text-text-secondary mb-6">
                                    We couldn't find a clear match for your specific combination. This doesn't mean your experience isn't valid.
                                </p>
                                <div className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] rounded-xl p-6">
                                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                                        This can happen when symptoms span multiple areas or don't fit neatly into common patterns. A professional can help you understand what you're going through.
                                    </p>
                                    <div className="space-y-2">
                                        <p className="text-sm text-text-primary font-medium">What you can try:</p>
                                        <ul className="text-sm text-text-secondary space-y-1.5 list-disc list-inside">
                                            <li>Go back and select additional symptoms you may be experiencing</li>
                                            <li>Provide more detail about duration, severity, and frequency</li>
                                            <li>Rate symptoms you feel strongly about at a higher severity</li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.section>

                    {/* ═══════════════════════════════════════════════════════════
                     * SECTION 3 — Recommended Next Steps
                     * ═══════════════════════════════════════════════════════════ */}
                    <motion.section variants={slideUp} className="pb-10 mb-10 border-b border-border">
                        <SectionLabel number="3" label="Recommended Next Steps" />
                        <h2 className="text-xl font-display font-bold text-text-primary mb-1.5">
                            Where to Go from Here
                        </h2>
                        <p className="text-sm text-text-secondary mb-8">
                            These results are a starting point. Here's how to make the most of them.
                        </p>

                        {/* When to see a clinician */}
                        <div className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] rounded-xl p-5 mb-8">
                            <div className="flex items-center gap-2.5 mb-4">
                                <Stethoscope className="w-4 h-4 text-gray-500 dark:text-neutral-400" />
                                <h3 className="text-sm font-display font-bold text-text-primary uppercase tracking-wide">
                                    When to See a Clinician
                                </h3>
                            </div>
                            <ul className="space-y-3 text-sm text-text-secondary leading-relaxed">
                                {hasUrgentFlags && (
                                    <li className="flex items-start gap-2.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-crisis-red mt-2 flex-shrink-0" />
                                        <span><strong className="text-text-primary font-medium">Immediately</strong> — your responses included experiences that suggest you may need urgent professional support.</span>
                                    </li>
                                )}
                                {anyProfessionalRecommended && (
                                    <li className="flex items-start gap-2.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                                        <span><strong className="text-text-primary font-medium">As soon as practical</strong> — one or more of the patterns identified is best assessed by a trained professional.</span>
                                    </li>
                                )}
                                <li className="flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-neutral-600 mt-2 flex-shrink-0" />
                                    <span>If your symptoms persist for more than <strong className="text-text-primary font-medium">two weeks</strong> or interfere with daily activities, work, or relationships.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-neutral-600 mt-2 flex-shrink-0" />
                                    <span>If you notice symptoms worsening over time or new symptoms emerging.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-neutral-600 mt-2 flex-shrink-0" />
                                    <span>If self-care strategies aren't providing relief, or you're unsure about what you're experiencing.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Action cards */}
                        <NextStepCards steps={nextSteps} />
                        <ToolRecommendation
                            signal={{
                                toolSlug: 'symptom-navigator',
                                navigatorConditions: matchResults.map((r) => r.condition_id),
                                hasSafetyFlags: hasUrgentFlags,
                            }}
                            className="mt-8"
                        />
                    </motion.section>

                    {/* ─── Questions for Your Provider ─── */}
                    <motion.section variants={slideUp} className="pb-10 mb-10 border-b border-border">
                        <div className="flex items-center gap-2.5 mb-5">
                            <Compass className="w-4 h-4 text-gray-500 dark:text-neutral-400" />
                            <h3 className="text-sm font-display font-bold text-text-primary uppercase tracking-wide">
                                Conversation Starters
                            </h3>
                        </div>
                        <ProviderQuestions
                            questions={questions}
                            matchedConditions={strongMatches.map(m => ({ condition_id: m.condition_id, name: m.name }))}
                        />
                    </motion.section>

                    {/* ─── Disclaimer ─── */}
                    <motion.section variants={slideUp} aria-label="Disclaimer">
                        <div className="bg-amber-50 dark:bg-amber-500/[0.04] border border-amber-100 dark:border-amber-500/15 rounded-xl p-5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-amber-400 dark:bg-amber-500/50" />
                            <div className="flex items-start gap-3 ml-0.5">
                                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                                <div className="space-y-2">
                                    <h3 className="text-sm font-display font-bold text-text-primary">Important Disclaimer</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        This tool provides <strong className="font-medium text-text-primary">educational information only</strong> and is not a substitute for professional medical advice, diagnosis, or treatment.
                                    </p>
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        Always consult a qualified healthcare provider for personal medical concerns. If you are in crisis, contact emergency services or a crisis helpline immediately.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <FeedbackWidget contentType="tool-result" contentId="symptom-navigator" className="mt-6" />
                    </motion.section>

                    {/* ─── Footer Action ─── */}
                    <motion.div variants={slideUp} className="flex justify-center pt-10">
                        <NavigatorButton variant="outline" onClick={handleResetClick}>
                            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
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
