import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigator } from '../../context/NavigatorContext';

import { WelcomeScreen } from './WelcomeScreen';
import { DomainSelectionScreen } from './DomainSelectionScreen';
import { SymptomSelectionScreen } from './SymptomSelectionScreen';
import { DurationSeverityScreen } from './DurationSeverityScreen';
import { ProcessingScreen } from './ProcessingScreen';
import { ResultsScreen } from './ResultsScreen';
import { ProgressBar } from '../navigator/ProgressBar';
import { CrisisOverlay } from '../navigator/CrisisOverlay';
import { CrisisStickyBanner } from '../navigator/CrisisStickyBanner';
import MeshGradient from '../ui/MeshGradient';

export const NavigatorFlow: React.FC = () => {
    const { state } = useNavigator();

    const getStepNumber = () => {
        switch (state.currentStep) {
            case 'welcome': return 0;
            case 'domains': return 1;
            case 'symptoms': return 2;
            case 'details': return 3;
            case 'processing': return 4;
            case 'results': return 5;
            default: return 0;
        }
    };

    const totalSteps = 5; // welcome doesn't count towards progress track technically, or it does but results is the end.
    const stepNum = getStepNumber();

    return (
        <div className="min-h-screen bg-charcoal-900 text-white transition-colors pt-16 lg:pt-24 relative pb-20 sm:pb-0 overflow-x-hidden">
            {/* Immersive Background */}
            <div className="fixed inset-0 z-0 bg-charcoal-950">
                <MeshGradient className="opacity-40" />
            </div>

            <div className="relative z-10 w-full h-full">
                {/* Global Progress Bar */}
                {stepNum > 0 && <ProgressBar currentStep={stepNum} totalSteps={totalSteps} />}

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
