import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigatorProvider, useNavigator } from '../../context/NavigatorContext';
import { NavigatorFlow } from '../screens/NavigatorFlow';
import { NavigatorErrorBoundary } from '../navigator/NavigatorErrorBoundary';
import SEO from '../SEO';

const NavigatorFlowWithErrorBoundary: React.FC = () => {
    const navigate = useNavigate();
    const { dispatch } = useNavigator();

    const handleReset = () => {
        dispatch({ type: 'RESET_FLOW' });
    };

    const handleGoBack = () => {
        // Navigate to previous step if possible
        dispatch({ type: 'SET_STEP', payload: 'welcome' });
    };

    const handleExit = () => {
        navigate('/');
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
            <div className="pt-16 lg:pt-20"> {/* Offset for navigation bar */}
                <NavigatorFlowWithErrorBoundary />
            </div>
        </NavigatorProvider>
    );
};

export default NavigatorPage;
