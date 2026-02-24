import React from 'react';
import { NavigatorProvider } from '../../context/NavigatorContext';
import { NavigatorFlow } from '../screens/NavigatorFlow';
import SEO from '../SEO';

const NavigatorPage: React.FC = () => {
    return (
        <NavigatorProvider>
            <SEO
                title="Symptom Navigator | Psychage"
                description="Understand your symptoms and find clarity with our intelligent, adaptive assessment tool."
            />
            <div className="pt-16 lg:pt-20"> {/* Offset for navigation bar */}
                <NavigatorFlow />
            </div>
        </NavigatorProvider>
    );
};

export default NavigatorPage;
