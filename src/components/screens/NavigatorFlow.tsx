import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigator } from '../../context/NavigatorContext';

import { WelcomeScreen } from './WelcomeScreen';
import { DomainSelectionScreen } from './DomainSelectionScreen';
import { SymptomSelectionScreen } from './SymptomSelectionScreen';
import { DurationSeverityScreen } from './DurationSeverityScreen';
import { ProcessingScreen } from './ProcessingScreen';
import { ResultsScreen } from './ResultsScreen';
import { EnhancedProgressBar } from '../navigator/EnhancedProgressBar';
import { CrisisOverlay } from '../navigator/CrisisOverlay';
import { CrisisStickyBanner } from '../navigator/CrisisStickyBanner';
import { LiveRegion } from '../a11y/LiveRegion';
import MeshGradient from '../ui/MeshGradient';
import type { NavigatorStep } from '../../lib/navigator/stepConfig';
import { getStepConfig } from '../../lib/navigator/stepConfig';

export const NavigatorFlow: React.FC = () => {
    const { state, dispatch, announcePolite } = useNavigator();

    const [politeMsg, setPoliteMsg] = useState('');
    const [assertiveMsg, setAssertiveMsg] = useState('');
    const [completedSteps, setCompletedSteps] = useState<Set<NavigatorStep>>(new Set());

    // Handle announcements from context
    useEffect(() => {
        if (state.liveAnnouncement) {
            // Append an invisible character alternatingly to force screen reader announcement of identical consecutive messages
            const suffix = state.liveAnnouncement.id % 2 === 0 ? '\u00A0' : '\u00A0\u00A0';
            if (state.liveAnnouncement.mode === 'polite') {
                setPoliteMsg(state.liveAnnouncement.message + suffix);
            } else {
                setAssertiveMsg(state.liveAnnouncement.message + suffix);
            }
        }
    }, [state.liveAnnouncement]);

    // Announce step transitions and track completed steps
    useEffect(() => {
        const stepConfig = getStepConfig(state.currentStep as NavigatorStep);
        announcePolite(stepConfig.label);

        // Mark previous steps as completed when advancing
        const stepOrder: NavigatorStep[] = ['welcome', 'domains', 'symptoms', 'details', 'processing', 'results'];
        const currentIndex = stepOrder.indexOf(state.currentStep as NavigatorStep);

        if (currentIndex > 0) {
            const newCompleted = new Set(completedSteps);
            for (let i = 0; i < currentIndex; i++) {
                newCompleted.add(stepOrder[i]);
            }
            setCompletedSteps(newCompleted);
        }

        // Push state to history on step change
        window.history.pushState({ navigatorStep: state.currentStep }, '');
    }, [state.currentStep, announcePolite]);

    // Handle browser back/forward navigation
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            // Check if we have flow progress to prevent accidental exit
            const hasProgress = state.currentStep !== 'welcome' ||
                               state.selectedSymptoms.size > 0 ||
                               state.selectedDomains.length > 0;

            if (hasProgress && state.currentStep !== 'welcome') {
                const stepOrder: NavigatorStep[] = ['welcome', 'domains', 'symptoms', 'details', 'processing', 'results'];
                const currentIndex = stepOrder.indexOf(state.currentStep as NavigatorStep);

                if (currentIndex > 0) {
                    const previousStep = stepOrder[currentIndex - 1];
                    dispatch({ type: 'SET_STEP', payload: previousStep });
                }
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [state.currentStep, state.selectedSymptoms.size, state.selectedDomains.length, dispatch]);

    // Handle step navigation from enhanced progress bar
    const handleStepClick = (targetStep: NavigatorStep) => {
        // Clear results if navigating away from results
        if (state.currentStep === 'results' && targetStep !== 'results') {
            dispatch({ type: 'SET_RESULTS', payload: null as any });
        }

        dispatch({ type: 'SET_STEP', payload: targetStep });
    };

    return (
        <div className="min-h-screen bg-background text-text-primary transition-colors pt-16 lg:pt-24 relative pb-20 sm:pb-0 overflow-x-hidden">
            <LiveRegion politeMessage={politeMsg} assertiveMessage={assertiveMsg} />

            {/* Immersive Background */}
            <div className="fixed inset-0 z-0 bg-background">
                <MeshGradient className="opacity-40" />
            </div>

            <div className="relative z-10 w-full h-full">
                {/* Enhanced Progress Bar with clickable navigation */}
                {state.currentStep !== 'welcome' && (
                    <EnhancedProgressBar
                        currentStep={state.currentStep as NavigatorStep}
                        completedSteps={completedSteps}
                        onStepClick={handleStepClick}
                    />
                )}

                <AnimatePresence mode="wait">
                    {state.currentStep === 'welcome' && <WelcomeScreen key="welcome" />}
                    {state.currentStep === 'domains' && <DomainSelectionScreen key="domains" />}
                    {state.currentStep === 'symptoms' && <SymptomSelectionScreen key="symptoms" />}
                    {state.currentStep === 'details' && <DurationSeverityScreen key="details" />}
                    {state.currentStep === 'processing' && <ProcessingScreen key="processing" />}
                    {state.currentStep === 'results' && <ResultsScreen key="results" />}
                </AnimatePresence>

                <CrisisOverlay />
                <CrisisStickyBanner />
            </div>
        </div>
    );
};
