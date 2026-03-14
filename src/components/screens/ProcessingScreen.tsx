import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigator } from '../../context/NavigatorContext';
import { runSymptomNavigator } from '../../lib/navigator/engine';
import type { NavigatorResults } from '../../lib/navigator/types';
import { NavigatorButton } from '../navigator/NavigatorButton';
import { ShieldAlert } from 'lucide-react';

// Processing animation configuration
// Timing budget: PROCESSING_STEPS.length × STEP_INTERVAL_MS + FINAL_DELAY_MS ≤ 2500ms
// The engine itself runs in ~1-3ms (client-side, synchronous). These delays exist solely
// for UX feedback — giving users confidence that analysis occurred. Keep total ≤ 2.5s.
export const PROCESSING_STEPS = [
    "Analyzing symptom patterns...",
    "Cross-referencing knowledge base...",
    "Evaluating severity markers...",
];

// Timing constants (in milliseconds)
export const STEP_INTERVAL_MS = 650;
export const FINAL_DELAY_MS = 300;
const KB_STALENESS_MINUTES = 30;
const KB_STALE_MS = KB_STALENESS_MINUTES * 60 * 1000;

// Animation constants (in seconds for Framer Motion)
const TEXT_TRANSITION_SECONDS = 0.3;

export const ProcessingScreen: React.FC = () => {
    const { state, dispatch, announcePolite, announceAssertive } = useNavigator();
    const [currentStep, setCurrentStep] = useState(0);
    const [processingError, setProcessingError] = useState<string | null>(null);
    const hasRun = useRef(false);
    const finalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        // Guard: only run engine once (React 18 StrictMode double-invokes effects)
        if (hasRun.current) return;
        hasRun.current = true;

        const { knowledgeBase, selectedSymptoms, detectedRegion, kbLoadedAt } = state;

        // Error: Missing knowledge base (WCAG 4.1.3 Status Messages - announce error assertively)
        if (!knowledgeBase) {
            const errorMsg = 'Unable to process results: symptom data unavailable.';
            setProcessingError(errorMsg);
            announceAssertive(errorMsg);
            return;
        }

        // Staleness warning
        if (kbLoadedAt && Date.now() - kbLoadedAt > KB_STALE_MS) {
            console.warn(`[Navigator] Knowledge base loaded >${KB_STALENESS_MINUTES}min ago, results may use stale rules`);
        }

        // Run the engine synchronously (client-side, ~1-2ms)
        const userInputs = Array.from(selectedSymptoms.values());

        let engineResults: NavigatorResults;
        try {
            engineResults = runSymptomNavigator(
                userInputs,
                knowledgeBase,
                detectedRegion ?? undefined
            );
        } catch (err) {
            console.error('[Navigator] Engine error:', err);
            const errorMsg = 'We encountered an issue analyzing your symptoms. Please try again or adjust your selections.';
            setProcessingError(errorMsg);
            announceAssertive(errorMsg);
            return;
        }

        // Reconcile crisis: engine may detect severity-threshold flags
        // not caught during symptom selection (inherent-only check)
        if (engineResults.safety.has_crisis && !state.crisisTriggered) {
            dispatch({ type: 'TRIGGER_CRISIS', payload: 'CRISIS' });
        } else if (engineResults.safety.has_urgent && !state.crisisTriggered) {
            dispatch({ type: 'TRIGGER_CRISIS', payload: 'URGENT' });
        }

        // Animate the processing steps, then dispatch results
        const sequenceLength = PROCESSING_STEPS.length;
        let step = 0;

        announcePolite(PROCESSING_STEPS[0]);

        const interval = setInterval(() => {
            step++;
            if (step < sequenceLength) {
                setCurrentStep(step);
                announcePolite(PROCESSING_STEPS[step]);
            } else {
                clearInterval(interval);
                finalTimeoutRef.current = setTimeout(() => {
                    // SET_RESULTS before SET_STEP so ResultsScreen has data on render
                    dispatch({ type: 'SET_RESULTS', payload: engineResults });
                    dispatch({ type: 'SET_STEP', payload: 'results' });
                }, FINAL_DELAY_MS);
            }
        }, STEP_INTERVAL_MS);

        return () => {
            clearInterval(interval);
            if (finalTimeoutRef.current) clearTimeout(finalTimeoutRef.current);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps — run once on mount

    // Error state: show accessible error UI with recovery options (WCAG 4.1.3)
    if (processingError) {
        return (
            <div
                className="max-w-xl mx-auto py-24 px-4 sm:px-6 flex flex-col items-center justify-center min-h-[30vh] sm:min-h-[40vh] lg:min-h-[50vh] text-center space-y-6"
                role="alert"
            >
                <div className="w-16 h-16 bg-crisis-red/10 rounded-full flex items-center justify-center">
                    <ShieldAlert className="w-8 h-8 text-crisis-red" />
                </div>
                <div>
                    <h3 className="text-2xl font-display text-text-primary mb-2">Processing Error</h3>
                    <p className="text-text-secondary max-w-md">{processingError}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <NavigatorButton
                        variant="outline"
                        onClick={() => dispatch({ type: 'SET_STEP', payload: 'symptoms' })}
                    >
                        Go Back
                    </NavigatorButton>
                    <NavigatorButton
                        variant="primary"
                        onClick={() => dispatch({ type: 'RESET_FLOW' })}
                    >
                        Start Over
                    </NavigatorButton>
                </div>
            </div>
        );
    }

    const totalSteps = PROCESSING_STEPS.length;
    const progress = Math.round(((currentStep + 1) / totalSteps) * 100);

    // SVG progress ring constants
    const RING_RADIUS = 44;
    const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
    const strokeOffset = RING_CIRCUMFERENCE - (progress / 100) * RING_CIRCUMFERENCE;

    return (
        <div className="max-w-xl mx-auto py-24 px-4 sm:px-6 flex flex-col items-center justify-center min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh] text-center">
            {/* Progress ring with percentage */}
            <div className="relative w-28 h-28 mb-8">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50" cy="50" r={RING_RADIUS}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="text-surface-hover/50"
                    />
                    <motion.circle
                        cx="50" cy="50" r={RING_RADIUS}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={RING_CIRCUMFERENCE}
                        animate={{ strokeDashoffset: strokeOffset }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="text-teal-500"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                        key={progress}
                        initial={{ opacity: 0.6, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl font-bold font-display tabular-nums text-text-primary"
                    >
                        {progress}%
                    </motion.span>
                </div>
            </div>

            {/* Step dots */}
            <div className="flex items-center gap-2.5 mb-6">
                {PROCESSING_STEPS.map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            backgroundColor: i <= currentStep ? 'rgb(20 184 166)' : 'rgb(var(--color-surface-hover) / 0.5)',
                            scale: i === currentStep ? 1.3 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-2 h-2 rounded-full"
                    />
                ))}
            </div>

            {/* Step text */}
            <div className="h-8 overflow-hidden relative w-full mb-3">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: TEXT_TRANSITION_SECONDS }}
                        className="text-base font-medium text-text-primary absolute inset-0"
                    >
                        {PROCESSING_STEPS[currentStep]}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Thin progress bar */}
            <div className="w-full max-w-xs h-1 rounded-full bg-surface-hover/50 overflow-hidden mb-5">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </div>

            <p className="text-sm text-text-secondary">
                Please wait while we prepare your personalized insights.
            </p>
        </div>
    );
};
