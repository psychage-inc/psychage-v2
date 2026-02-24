import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigator } from '../../context/NavigatorContext';

const PROCESSING_STEPS = [
    "Analyzing symptom patterns...",
    "Cross-referencing knowledge base...",
    "Evaluating severity markers...",
    "Synthesizing results..."
];

export const ProcessingScreen: React.FC = () => {
    const { dispatch } = useNavigator();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Sequence the loading messages
        const sequenceLength = PROCESSING_STEPS.length;
        let step = 0;

        const interval = setInterval(() => {
            step++;
            if (step < sequenceLength) {
                setCurrentStep(step);
            } else {
                clearInterval(interval);
                // After sequence is done, generate fake results and move to results screen
                // In a real app, this is where you'd call the engine algorithm
                // For now, we simulate matching
                setTimeout(() => {
                    // This should ideally call a function from the matching engine
                    // dispatch({ type: 'SET_RESULTS', payload: ... })
                    dispatch({ type: 'SET_STEP', payload: 'results' });
                }, 1000);
            }
        }, 1200);

        return () => clearInterval(interval);
    }, [dispatch]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-xl mx-auto py-24 px-4 sm:px-6 flex flex-col items-center justify-center min-h-[50vh] text-center"
        >
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
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
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
                        transition={{ duration: 0.3 }}
                        className="text-lg font-medium text-white absolute inset-0 font-mono tracking-tight"
                    >
                        {PROCESSING_STEPS[currentStep]}
                    </motion.p>
                </AnimatePresence>
            </div>

            <p className="mt-4 text-sm text-charcoal-300">
                Please wait a moment while we prepare your personalized insights.
            </p>
        </motion.div>
    );
};
