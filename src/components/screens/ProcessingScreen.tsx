import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigator } from '../../context/NavigatorContext';
import { runSymptomNavigator } from '../../lib/navigator/engine';
import type { NavigatorResults } from '../../lib/navigator/types';
import { NavigatorButton } from '../navigator/NavigatorButton';
import { ShieldAlert } from 'lucide-react';

// Processing animation configuration
const PROCESSING_STEPS = [
    "Analyzing symptom patterns...",
    "Cross-referencing knowledge base...",
    "Evaluating severity markers...",
    "Synthesizing results..."
];

// Timing constants (in milliseconds)
const STEP_INTERVAL_MS = 1200;
const FINAL_DELAY_MS = 1000;
const KB_STALENESS_MINUTES = 30;
const KB_STALE_MS = KB_STALENESS_MINUTES * 60 * 1000;

// Animation constants (in seconds for Framer Motion)
const BREATH_ANIM_SECONDS = 2;
const TEXT_TRANSITION_SECONDS = 0.3;

export const ProcessingScreen: React.FC = () => {
    const { state, dispatch, announcePolite, announceAssertive } = useNavigator();
    const [currentStep, setCurrentStep] = useState(0);
    const [processingError, setProcessingError] = useState<string | null>(null);
    const hasRun = useRef(false);

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
                setTimeout(() => {
                    // SET_RESULTS before SET_STEP so ResultsScreen has data on render
                    dispatch({ type: 'SET_RESULTS', payload: engineResults });
                    dispatch({ type: 'SET_STEP', payload: 'results' });
                }, FINAL_DELAY_MS);
            }
        }, STEP_INTERVAL_MS);

        return () => clearInterval(interval);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps — run once on mount

    // Error state: show accessible error UI with recovery options (WCAG 4.1.3)
    if (processingError) {
        return (
            <div
                className="max-w-xl mx-auto py-24 px-4 sm:px-6 flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6"
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

    return (
        <div className="max-w-xl mx-auto py-24 px-4 sm:px-6 flex flex-col items-center justify-center min-h-[50vh] text-center">
            <div className="relative w-24 h-24 mb-10">
                <svg className="animate-spin-slow w-full h-full text-white/5" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
                </svg>
                <svg className="animate-spin w-full h-full text-teal-500/80 absolute top-0 left-0 drop-shadow-[0_0_15px_rgba(20,184,166,0.6)]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="100 200" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-teal-900/30 border border-teal-500/30 flex items-center justify-center shadow-[inset_0_0_10px_rgba(20,184,166,0.2)] backdrop-blur-sm">
                        {/* Simple breathing dot inner */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                            transition={{ repeat: Infinity, duration: BREATH_ANIM_SECONDS, ease: "easeInOut" }}
                            className="w-3 h-3 bg-teal-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.8)]"
                        />
                    </div>
                </div>
            </div>

            <div className="h-8 overflow-hidden relative w-full">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: TEXT_TRANSITION_SECONDS }}
                        className="text-lg font-medium text-text-primary absolute inset-0 font-mono tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
                    >
                        {PROCESSING_STEPS[currentStep]}
                    </motion.p>
                </AnimatePresence>
            </div>

            <p className="mt-4 text-sm text-text-secondary">
                Please wait a moment while we prepare your personalized insights.
            </p>
        </div>
    );
};
