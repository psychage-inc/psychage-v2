import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigatorProvider, useNavigator } from '../../context/NavigatorContext';
import { NavigatorFlow } from '../screens/NavigatorFlow';
import { NavigatorErrorBoundary } from '../navigator/NavigatorErrorBoundary';
import { useToast } from '../../context/ToastContext';
import SEO from '../SEO';
import type { NavigatorStep } from '../../lib/navigator/stepConfig';

/** Steps that represent stable, user-interactive states (not transient ones). */
const STABLE_STEPS = new Set<string>(['welcome', 'domains', 'symptoms', 'details', 'results']);

const NavigatorFlowWithErrorBoundary: React.FC = () => {
    const navigate = useNavigate();
    const { state, dispatch, wasRestored, wasCorrupted, announcePolite } = useNavigator();
    const { info, warning } = useToast();
    const lastStableStepRef = useRef<NavigatorStep>('welcome');
    const announcedRef = useRef(false);

    // Track the last stable step the user was on
    useEffect(() => {
        if (STABLE_STEPS.has(state.currentStep)) {
            lastStableStepRef.current = state.currentStep as NavigatorStep;
        }
    }, [state.currentStep]);

    // Announce + visual toast for restored/corrupted state once
    useEffect(() => {
        if (announcedRef.current) return;
        if (wasRestored) {
            announcedRef.current = true;
            announcePolite('Your previous session has been restored.');
            info('Your previous progress has been restored.');
        } else if (wasCorrupted) {
            announcedRef.current = true;
            announcePolite('Your previous session data was invalid and has been cleared.');
            warning('Previous session was invalid. Starting fresh.');
        }
    }, [wasRestored, wasCorrupted, announcePolite, info, warning]);

    const handleReset = () => {
        dispatch({ type: 'RESET_FLOW' });
    };

    const handleGoBack = () => {
        // Return to the last stable step the user was on, not always welcome
        const target = lastStableStepRef.current;
        dispatch({ type: 'SET_STEP', payload: target === 'processing' ? 'details' : target });
    };

    const handleExit = () => {
        dispatch({ type: 'RESET_FLOW' });
        navigate('/tools');
    };

    return (
        <NavigatorErrorBoundary onReset={handleReset} onGoBack={handleGoBack} onExit={handleExit}>
            <NavigatorFlow />
        </NavigatorErrorBoundary>
    );
};

const NavigatorPage: React.FC = () => {
    return (
        <NavigatorProvider>
            <SEO
                title="Symptom Navigator | Psychage"
                description="Understand your symptoms and find clarity with our intelligent, adaptive assessment tool."
            />
            <NavigatorFlowWithErrorBoundary />
        </NavigatorProvider>
    );
};

export default NavigatorPage;
