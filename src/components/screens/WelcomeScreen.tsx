import React from 'react';
import { useNavigator } from '../../context/NavigatorContext';
import { NavigatorButton } from '../navigator/NavigatorButton';
import { DisclaimerCard } from '../navigator/DisclaimerCard';
import { Loader2, AlertCircle } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
    const { dispatch, state } = useNavigator();
    const { isLoading, error, knowledgeBase } = state;

    const handleStart = () => {
        dispatch({ type: 'SET_STEP', payload: 'domains' });
    };

    const handleRetry = () => {
        window.location.reload();
    };

    const canStart = !isLoading && !error && knowledgeBase !== null;

    return (
        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-teal-900/30 rounded-2xl flex items-center justify-center mb-8 transform -rotate-3 border border-teal-500/30 shadow-[0_0_30px_rgba(20,184,166,0.15)] backdrop-blur-sm">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            </div>

            <h1 className="text-4xl sm:text-5xl font-display text-text-primary mb-6 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
                Understand your experience. <br />
                <span className="text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.3)]">Find your path forward.</span>
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-xl">
                The Symptom Navigator is a guided tool to help you articulate what you're going through, identify potential patterns, and discover the right resources for your mental wellbeing.
            </p>

            {/* Loading State */}
            {isLoading && (
                <div className="flex flex-col items-center gap-4 mb-12">
                    <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
                    <p className="text-sm text-text-secondary font-medium">
                        Loading symptom library...
                    </p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="flex flex-col items-center gap-4 mb-12 p-6 bg-crisis-red/5 border border-crisis-red/20 rounded-xl max-w-md">
                    <AlertCircle className="w-8 h-8 text-crisis-red" />
                    <div className="text-center">
                        <p className="text-sm text-text-primary font-semibold mb-2">
                            Unable to Load
                        </p>
                        <p className="text-xs text-text-secondary mb-4">
                            {error}
                        </p>
                        <NavigatorButton
                            variant="outline"
                            size="sm"
                            onClick={handleRetry}
                        >
                            Retry
                        </NavigatorButton>
                    </div>
                </div>
            )}

            {/* Start Button */}
            {!error && (
                <NavigatorButton
                    size="xl"
                    onClick={handleStart}
                    isDisabled={!canStart}
                    isLoading={isLoading}
                    className="mb-12 shadow-lg hover:shadow-xl transition-shadow"
                    aria-label={isLoading ? 'Loading symptom library, please wait' : 'Start the Navigator'}
                >
                    {isLoading ? 'Loading...' : 'Start the Navigator'}
                </NavigatorButton>
            )}

            <DisclaimerCard className="w-full text-left bg-transparent shadow-none" />
        </div>
    );
};
