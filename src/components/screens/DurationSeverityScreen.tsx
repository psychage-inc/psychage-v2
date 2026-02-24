import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigator } from '../../context/NavigatorContext';
import { NavigatorButton } from '../navigator/NavigatorButton';
import { SymptomQuestionCard } from '../navigator/SymptomQuestionCard';
import { DurationPicker } from '../navigator/DurationPicker';
import { SeveritySlider } from '../navigator/SeveritySlider';
import { FrequencyPicker } from '../navigator/FrequencyPicker';

export const DurationSeverityScreen: React.FC = () => {
    const { state, dispatch } = useNavigator();
    const { knowledgeBase, selectedSymptoms } = state;
    const [currentSymptomIndex, setCurrentSymptomIndex] = useState(0);

    // Array of selected symptom details
    const symptomsArray = useMemo(() => {
        if (!knowledgeBase) return [];

        // Sort logic to prioritize severe symptoms or specific domains
        const symptoms = Array.from(selectedSymptoms.values()).map(s => {
            const details = knowledgeBase.symptoms.find(kb => kb.id === s.symptom_id);
            return { ...s, details };
        }).filter(s => s.details); // Ensure exists

        return symptoms;
    }, [knowledgeBase, selectedSymptoms]);

    if (symptomsArray.length === 0) {
        return null; // Safety
    }

    const currentSymptom = symptomsArray[currentSymptomIndex];
    const isLastSymptom = currentSymptomIndex === symptomsArray.length - 1;

    // Determine readiness of current symptom questions
    const isCurrentComplete = () => {
        const s = selectedSymptoms.get(currentSymptom.symptom_id);
        if (!s) return false;

        const details = currentSymptom.details;
        if (!details) return false;

        if (details.ask_severity && s.severity === undefined) return false;
        if (details.ask_duration && s.duration === undefined) return false;
        if (details.ask_frequency && s.frequency === undefined) return false;

        return true;
    };

    const handleNextSymptom = () => {
        if (!isLastSymptom) {
            setCurrentSymptomIndex(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Proceed to processing
            dispatch({ type: 'SET_STEP', payload: 'processing' });
        }
    };

    const handleBack = () => {
        if (currentSymptomIndex > 0) {
            setCurrentSymptomIndex(prev => prev - 1);
        } else {
            dispatch({ type: 'SET_STEP', payload: 'symptoms' });
        }
    };

    const updateDetail = (field: 'severity' | 'duration' | 'frequency', value: any) => {
        dispatch({
            type: 'UPDATE_SYMPTOM_DETAIL',
            payload: { symptomId: currentSymptom.symptom_id, updates: { [field]: value } }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto py-8 px-4 sm:px-6 relative pb-36 sm:pb-40"
        >
            <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal-900 dark:text-white mb-4">
                    Let's understand more
                </h2>
                <p className="text-lg text-charcoal-600 dark:text-charcoal-300">
                    Tell us about the intensity and duration of these experiences to help us provide better insights. ({currentSymptomIndex + 1} of {symptomsArray.length})
                </p>
            </div>

            <div className="space-y-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSymptom.symptom_id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                        className="space-y-6"
                    >
                        <div className="p-6 rounded-2xl bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-800/50">
                            <h3 className="font-serif text-2xl text-teal-900 dark:text-teal-100 mb-2">
                                Regarding: {currentSymptom.details?.name}
                            </h3>
                            <p className="text-teal-800 dark:text-teal-200/80">
                                {currentSymptom.details?.description}
                            </p>
                        </div>

                        {currentSymptom.details?.ask_severity && (
                            <SymptomQuestionCard
                                title="How severe is this symptom?"
                                description="On a scale from 1 (mild) to 10 (intense or disruptive), how would you rate it?"
                                isActive={true}
                                isCompleted={selectedSymptoms.get(currentSymptom.symptom_id)?.severity !== undefined}
                            >
                                <SeveritySlider
                                    value={selectedSymptoms.get(currentSymptom.symptom_id)?.severity || 5}
                                    onChange={(val) => updateDetail('severity', val)}
                                />
                            </SymptomQuestionCard>
                        )}

                        {currentSymptom.details?.ask_duration && (
                            <SymptomQuestionCard
                                title="How long have you been experiencing this?"
                                isActive={true}
                                isCompleted={selectedSymptoms.get(currentSymptom.symptom_id)?.duration !== undefined}
                            >
                                <DurationPicker
                                    value={selectedSymptoms.get(currentSymptom.symptom_id)?.duration}
                                    onChange={(val) => updateDetail('duration', val)}
                                />
                            </SymptomQuestionCard>
                        )}

                        {currentSymptom.details?.ask_frequency && (
                            <SymptomQuestionCard
                                title="How often does this happen?"
                                isActive={true}
                                isCompleted={selectedSymptoms.get(currentSymptom.symptom_id)?.frequency !== undefined}
                            >
                                <FrequencyPicker
                                    value={selectedSymptoms.get(currentSymptom.symptom_id)?.frequency}
                                    onChange={(val) => updateDetail('frequency', val)}
                                />
                            </SymptomQuestionCard>
                        )}

                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Floating Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-charcoal-900/90 backdrop-blur-md border-t border-charcoal-200 dark:border-charcoal-800 p-4 pb-8 sm:p-6 sm:pb-8 z-30 transform translate-y-0">
                <div className="max-w-3xl mx-auto flex flex-row items-center justify-between gap-2 sm:gap-4">
                    <NavigatorButton
                        variant="ghost"
                        onClick={handleBack}
                        className="w-auto px-2 sm:px-4 text-sm sm:text-base"
                    >
                        Back
                    </NavigatorButton>

                    <NavigatorButton
                        size="lg"
                        onClick={handleNextSymptom}
                        isDisabled={!isCurrentComplete()}
                        className="flex-1 sm:flex-none sm:min-w-[200px] text-sm sm:text-base px-4 py-2 sm:py-3"
                    >
                        {isLastSymptom ? "Analyze Results" : `Next (${currentSymptomIndex + 1}/${symptomsArray.length})`}
                    </NavigatorButton>
                </div>
            </div>
        </motion.div>
    );
};
