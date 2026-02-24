import React from 'react';
import { motion } from 'framer-motion';
import { useNavigator } from '../../context/NavigatorContext';
import { NavigatorButton } from '../navigator/NavigatorButton';
import { DisclaimerCard } from '../navigator/DisclaimerCard';

export const WelcomeScreen: React.FC = () => {
    const { dispatch, state } = useNavigator();

    const handleStart = () => {
        dispatch({ type: 'SET_STEP', payload: 'domains' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-2xl mx-auto py-12 px-4 sm:px-6 flex flex-col items-center text-center"
        >
            <div className="w-20 h-20 bg-teal-900/30 rounded-2xl flex items-center justify-center mb-8 transform -rotate-3 border border-teal-500/30 shadow-[0_0_30px_rgba(20,184,166,0.15)] backdrop-blur-sm">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif font-medium text-white mb-6 drop-shadow-sm">
                Understand your experience. <br />
                <span className="text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.3)]">Find your path forward.</span>
            </h1>

            <p className="text-lg text-charcoal-300 leading-relaxed mb-10 max-w-xl">
                The Symptom Navigator is a guided tool to help you articulate what you're going through, identify potential patterns, and discover the right resources for your mental wellbeing.
            </p>

            <NavigatorButton
                size="xl"
                onClick={handleStart}
                className="mb-12 shadow-lg hover:shadow-xl transition-shadow"
            >
                Start the Navigator
            </NavigatorButton>

            <DisclaimerCard className="w-full text-left bg-transparent shadow-none" />
        </motion.div>
    );
};
