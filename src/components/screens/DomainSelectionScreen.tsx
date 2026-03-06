import React from 'react';
import { motion } from 'framer-motion';
import { useNavigator } from '../../context/NavigatorContext';
import { DomainCard } from '../navigator/DomainCard';
import { NavigatorButton } from '../navigator/NavigatorButton';
import { SymptomDomain } from '../../lib/navigator/types';

const DOMAINS: { id: SymptomDomain; title: string; description: string }[] = [
    {
        id: 'emotional',
        title: 'Emotional & Mood',
        description: 'Feelings of sadness, anxiety, anger, or rapid mood changes.'
    },
    {
        id: 'physical',
        title: 'Physical Responses',
        description: 'Changes in sleep, energy, appetite, or unexplained aches.'
    },
    {
        id: 'cognitive',
        title: 'Cognitive & Focus',
        description: 'Difficulty concentrating, memory issues, or racing thoughts.'
    },
    {
        id: 'behavioral',
        title: 'Behavioral Changes',
        description: 'Changes in social habits, impulsivity, or coping mechanisms.'
    }
];

export const DomainSelectionScreen: React.FC = () => {
    const { state, dispatch } = useNavigator();
    const { selectedDomains } = state;

    const handleToggle = (domain: SymptomDomain) => {
        dispatch({ type: 'TOGGLE_DOMAIN', payload: domain });
    };

    const handleNext = () => {
        if (selectedDomains.length > 0) {
            dispatch({ type: 'SET_STEP', payload: 'symptoms' });
        }
    };

    const handleSelectAll = () => {
        dispatch({ type: 'SELECT_ALL_DOMAINS' });
        dispatch({ type: 'SET_STEP', payload: 'symptoms' });
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
            <div className="mb-10 text-center">
                <h2 className="text-3xl sm:text-4xl font-display font-medium text-text-primary mb-4 drop-shadow-sm">
                    What brings you here today?
                </h2>
                <p className="text-lg text-text-secondary">
                    Select the areas where you are experiencing the most noticeable changes or challenges. You can select more than one.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {DOMAINS.map((domain, index) => (
                    <motion.div
                        key={domain.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <DomainCard
                            domain={domain.id}
                            title={domain.title}
                            description={domain.description}
                            isSelected={selectedDomains.includes(domain.id)}
                            onToggle={handleToggle}
                        />
                    </motion.div>
                ))}
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-8 pt-8 border-t border-border">
                <NavigatorButton
                    variant="ghost"
                    onClick={handleSelectAll}
                    className="w-full sm:w-auto text-text-tertiary hover:text-text-primary transition-colors"
                >
                    Not sure? Explore all symptoms
                </NavigatorButton>

                <NavigatorButton
                    size="lg"
                    onClick={handleNext}
                    isDisabled={selectedDomains.length === 0}
                    className="w-full sm:w-auto min-w-[160px]"
                >
                    Continue
                </NavigatorButton>
            </div>
        </div>
    );
};
