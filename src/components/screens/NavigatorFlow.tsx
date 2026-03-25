/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigator } from '../../context/NavigatorContext';

import { WelcomeScreen } from './WelcomeScreen';
import { DomainSelectionScreen } from './DomainSelectionScreen';
import { SymptomSelectionScreen } from './SymptomSelectionScreen';
import { DurationSeverityScreen } from './DurationSeverityScreen';
import { ProcessingScreen } from './ProcessingScreen';
import { ResultsScreen } from './ResultsScreen';
import { EnhancedProgressBar } from '../navigator/EnhancedProgressBar';
import { CrisisOverlay } from '../navigator/CrisisOverlay';

import { LiveRegion } from '../a11y/LiveRegion';
import type { NavigatorStep } from '../../lib/navigator/stepConfig';
import { getStepConfig } from '../../lib/navigator/stepConfig';
import { navigatorSlide, navigatorFade } from '../../lib/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const STEP_ORDER: NavigatorStep[] = ['welcome', 'domains', 'symptoms', 'details', 'processing', 'results'];

export const NavigatorFlow: React.FC = () => {
    const { state, dispatch, announcePolite } = useNavigator();
    const prefersReducedMotion = useReducedMotion();

    const [politeMsg, setPoliteMsg] = useState('');
    const [assertiveMsg, setAssertiveMsg] = useState('');
    const [completedSteps, setCompletedSteps] = useState<Set<NavigatorStep>>(new Set());

    // Direction tracking for step transitions
    const previousStepRef = useRef<NavigatorStep>(state.currentStep as NavigatorStep);
    const directionRef = useRef<1 | -1>(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const variants = prefersReducedMotion ? navigatorFade : navigatorSlide;

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

    // Announce step transitions, track completed steps, compute direction, manage focus
    useEffect(() => {
        const currentStep = state.currentStep as NavigatorStep;
        const stepConfig = getStepConfig(currentStep);
        announcePolite(stepConfig.label);

        // Compute direction (forward = 1, backward = -1)
        const prevIndex = STEP_ORDER.indexOf(previousStepRef.current);
        const currIndex = STEP_ORDER.indexOf(currentStep);
        if (currIndex !== prevIndex) {
            directionRef.current = currIndex > prevIndex ? 1 : -1;
        }
        previousStepRef.current = currentStep;

        // Mark previous steps as completed when advancing
        if (currIndex > 0) {
            const newCompleted = new Set(completedSteps);
            for (let i = 0; i < currIndex; i++) {
                newCompleted.add(STEP_ORDER[i]);
            }
            setCompletedSteps(newCompleted);
        }

        // Push state to history on step change
        window.history.pushState({ navigatorStep: state.currentStep }, '');

        // Focus management: move focus to new screen heading after transition
        requestAnimationFrame(() => {
            const heading = containerRef.current?.querySelector('h1, h2');
            if (heading instanceof HTMLElement) {
                heading.setAttribute('tabindex', '-1');
                heading.focus({ preventScroll: true });
            }
        });
    }, [state.currentStep, announcePolite]);

    // Handle browser back/forward navigation
    useEffect(() => {
        const handlePopState = (_event: PopStateEvent) => {
            // Check if we have flow progress to prevent accidental exit
            const hasProgress = state.currentStep !== 'welcome' ||
                               state.selectedSymptoms.size > 0 ||
                               state.selectedDomains.length > 0;

            if (hasProgress && state.currentStep !== 'welcome') {
                const currentIndex = STEP_ORDER.indexOf(state.currentStep as NavigatorStep);

                if (currentIndex > 0) {
                    const previousStep = STEP_ORDER[currentIndex - 1];
                    dispatch({ type: 'SET_STEP', payload: previousStep });
                }
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [state.currentStep, state.selectedSymptoms.size, state.selectedDomains.length, dispatch]);

    // Keyboard shortcut: Escape to go back one step (not on welcome/processing)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return;
            const step = state.currentStep as NavigatorStep;
            if (step === 'welcome' || step === 'processing') return;
            // Don't interfere when a dialog/modal is open
            if (document.querySelector('[role="alertdialog"], [role="dialog"]')) return;

            const currentIndex = STEP_ORDER.indexOf(step);
            if (currentIndex > 0) {
                e.preventDefault();
                dispatch({ type: 'SET_STEP', payload: STEP_ORDER[currentIndex - 1] });
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [state.currentStep, dispatch]);

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
                            </div>

            <div ref={containerRef} className="relative z-10 w-full h-full">
                {/* Enhanced Progress Bar with clickable navigation */}
                {state.currentStep !== 'welcome' && (
                    <EnhancedProgressBar
                        currentStep={state.currentStep as NavigatorStep}
                        completedSteps={completedSteps}
                        onStepClick={handleStepClick}
                    />
                )}

                <AnimatePresence mode="wait" custom={directionRef.current}>
                    <motion.div
                        key={state.currentStep}
                        custom={directionRef.current}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                    >
                        {state.currentStep === 'welcome' && <WelcomeScreen />}
                        {state.currentStep === 'domains' && <DomainSelectionScreen />}
                        {state.currentStep === 'symptoms' && <SymptomSelectionScreen />}
                        {state.currentStep === 'details' && <DurationSeverityScreen />}
                        {state.currentStep === 'processing' && <ProcessingScreen />}
                        {state.currentStep === 'results' && <ResultsScreen />}
                    </motion.div>
                </AnimatePresence>

                <CrisisOverlay />
            </div>
        </div>
    );
};
