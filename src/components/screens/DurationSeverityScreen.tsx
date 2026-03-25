/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigator } from '../../context/NavigatorContext';
import { NavigatorButton } from '../navigator/NavigatorButton';
import { SymptomQuestionCard } from '../navigator/SymptomQuestionCard';
import { DurationPicker } from '../navigator/DurationPicker';
import { SeveritySlider } from '../navigator/SeveritySlider';
import { FrequencyPicker } from '../navigator/FrequencyPicker';
import { SymptomDetailsProgress } from '../navigator/SymptomDetailsProgress';
import { SymptomReviewPanel, ReviewSymptom } from '../navigator/SymptomReviewPanel';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { ShieldAlert, SkipForward, Zap } from 'lucide-react';
import { SYMPTOM_DEFAULTS, SYMPTOM_DETAIL_UX_THRESHOLD } from '../../lib/navigator/defaults';
import { SkeletonSymptomDetails } from '../navigator/NavigatorSkeletons';
import { cn } from '../../lib/utils';

type QuestionType = 'severity' | 'duration' | 'frequency';

export const DurationSeverityScreen: React.FC = () => {
    const { state, dispatch, announcePolite } = useNavigator();
    const { knowledgeBase, selectedSymptoms, isLoading, error } = state;
    const [currentSymptomIndex, setCurrentSymptomIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [completedSymptoms, setCompletedSymptoms] = useState<Set<string>>(new Set());
    const [showBackConfirm, setShowBackConfirm] = useState(false);

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

    // Reset question sub-index when symptom changes
    useEffect(() => {
        setCurrentQuestionIndex(0);
    }, [currentSymptomIndex]);

    if (isLoading) {
        return <SkeletonSymptomDetails />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[30vh] sm:min-h-[40vh] lg:min-h-[50vh] space-y-6 text-center px-4" role="alert">
                <div className="w-16 h-16 bg-crisis-red/10 rounded-full flex items-center justify-center">
                    <ShieldAlert className="w-8 h-8 text-crisis-red" />
                </div>
                <div>
                    <h3 className="text-2xl font-display text-text-primary mb-2">Notice</h3>
                    <p className="text-text-secondary max-w-md">{error}</p>
                </div>
                <NavigatorButton
                    variant="outline"
                    onClick={() => dispatch({ type: 'RESET_FLOW' })}
                >
                    Start Over
                </NavigatorButton>
            </div>
        );
    }

    if (symptomsArray.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[30vh] sm:min-h-[40vh] lg:min-h-[50vh] space-y-6 text-center px-4" role="alert">
                <h3 className="text-2xl font-display text-text-primary mb-2">No symptoms selected</h3>
                <p className="text-text-secondary max-w-md">You haven't selected any symptoms to provide details for.</p>
                <NavigatorButton
                    variant="primary"
                    onClick={() => dispatch({ type: 'SET_STEP', payload: 'symptoms' })}
                >
                    Go Back to Symptoms
                </NavigatorButton>
            </div>
        );
    }

    const currentSymptom = symptomsArray[currentSymptomIndex];
    const isLastSymptom = currentSymptomIndex === symptomsArray.length - 1;
    const showEnhancedUX = symptomsArray.length >= SYMPTOM_DETAIL_UX_THRESHOLD;

    // Build review symptom list
    const reviewSymptoms: ReviewSymptom[] = useMemo(() => {
        return symptomsArray.map(s => ({
            id: s.symptom_id,
            name: s.details?.name || 'Unknown',
            isComplete: completedSymptoms.has(s.symptom_id)
        }));
    }, [symptomsArray, completedSymptoms]);

    // Compute applicable questions for current symptom
    const currentQuestions: QuestionType[] = useMemo(() => {
        const details = currentSymptom?.details;
        if (!details) return [];
        const questions: QuestionType[] = [];
        if (details.ask_severity) questions.push('severity');
        if (details.ask_duration) questions.push('duration');
        if (details.ask_frequency) questions.push('frequency');
        return questions;
    }, [currentSymptom]);

    // Paginate when >2 questions per symptom
    const shouldPaginate = currentQuestions.length > 2;
    const visibleQuestions: QuestionType[] = shouldPaginate
        ? [currentQuestions[currentQuestionIndex]]
        : currentQuestions;

    // Check if current visible question is answered
    const isCurrentQuestionAnswered = (): boolean => {
        const s = selectedSymptoms.get(currentSymptom.symptom_id);
        if (!s) return false;

        if (shouldPaginate) {
            const q = currentQuestions[currentQuestionIndex];
            if (q === 'severity' && s.severity === undefined) return false;
            if (q === 'duration' && s.duration === undefined) return false;
            if (q === 'frequency' && s.frequency === undefined) return false;
            return true;
        }

        // Non-paginated: check all questions
        const details = currentSymptom.details;
        if (!details) return false;
        if (details.ask_severity && s.severity === undefined) return false;
        if (details.ask_duration && s.duration === undefined) return false;
        if (details.ask_frequency && s.frequency === undefined) return false;
        return true;
    };

    // Determine readiness of current symptom questions (all questions)
    const _isCurrentComplete = () => {
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
        // If paginated and not on last sub-question, advance sub-question
        if (shouldPaginate && currentQuestionIndex < currentQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            announcePolite(`Question ${currentQuestionIndex + 2} of ${currentQuestions.length}`);
            return;
        }

        // Mark current as completed
        setCompletedSymptoms(prev => new Set(prev).add(currentSymptom.symptom_id));

        if (!isLastSymptom) {
            setCurrentSymptomIndex(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            announcePolite(`Moving to symptom ${currentSymptomIndex + 2} of ${symptomsArray.length}`);
        } else {
            // Proceed to processing
            dispatch({ type: 'SET_STEP', payload: 'processing' });
        }
    };

    const handleSkipCurrent = () => {
        // Apply defaults to current symptom
        const details = currentSymptom.details;
        if (!details) return;

        const updates: any = {};
        if (details.ask_severity) updates.severity = SYMPTOM_DEFAULTS.severity;
        if (details.ask_duration) updates.duration = SYMPTOM_DEFAULTS.duration;
        if (details.ask_frequency) updates.frequency = SYMPTOM_DEFAULTS.frequency;

        dispatch({
            type: 'UPDATE_SYMPTOM_DETAIL',
            payload: { symptomId: currentSymptom.symptom_id, updates }
        });

        announcePolite(`Defaults applied for ${currentSymptom.details?.name}. Moving to next symptom.`);
        handleNextSymptom();
    };

    const handleApplyDefaultsToRemaining = () => {
        // Apply defaults to all remaining incomplete symptoms
        for (let i = currentSymptomIndex; i < symptomsArray.length; i++) {
            const symptom = symptomsArray[i];
            const details = symptom.details;
            if (!details) continue;

            const updates: any = {};
            if (details.ask_severity) updates.severity = SYMPTOM_DEFAULTS.severity;
            if (details.ask_duration) updates.duration = SYMPTOM_DEFAULTS.duration;
            if (details.ask_frequency) updates.frequency = SYMPTOM_DEFAULTS.frequency;

            dispatch({
                type: 'UPDATE_SYMPTOM_DETAIL',
                payload: { symptomId: symptom.symptom_id, updates }
            });
        }

        announcePolite(`Defaults applied to all remaining symptoms. Proceeding to results.`);
        dispatch({ type: 'SET_STEP', payload: 'processing' });
    };

    const handleJumpToSymptom = (index: number) => {
        setCurrentSymptomIndex(index);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        announcePolite(`Jumped to ${symptomsArray[index].details?.name}`);
    };

    const hasAnyDetails = () => {
        for (const [_, symptom] of selectedSymptoms) {
            if (symptom.severity !== undefined || symptom.duration !== undefined || symptom.frequency !== undefined) {
                return true;
            }
        }
        return false;
    };

    const handleBack = () => {
        // If paginated and not on first sub-question, go back one sub-question
        if (shouldPaginate && currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            announcePolite('Returned to previous question');
            return;
        }

        if (currentSymptomIndex > 0) {
            setCurrentSymptomIndex(prev => prev - 1);
            announcePolite(`Returned to previous symptom`);
        } else {
            // Going back to symptoms screen - confirm if details exist
            if (hasAnyDetails()) {
                setShowBackConfirm(true);
            } else {
                dispatch({ type: 'SET_STEP', payload: 'symptoms' });
            }
        }
    };

    const handleBackConfirm = () => {
        dispatch({ type: 'SET_STEP', payload: 'symptoms' });
        announcePolite('Returned to symptom selection');
    };

    const updateDetail = (field: 'severity' | 'duration' | 'frequency', value: any) => {
        dispatch({
            type: 'UPDATE_SYMPTOM_DETAIL',
            payload: { symptomId: currentSymptom.symptom_id, updates: { [field]: value } }
        });
    };

    return (
        <div className="max-w-3xl mx-auto py-4 sm:py-6 px-3 sm:px-4 relative pb-28 sm:pb-32">
            <div className="mb-4 sm:mb-6 relative space-y-3">
                <div className="absolute -inset-x-8 -inset-y-8 bg-teal-500/10 blur-3xl rounded-full opacity-50 pointer-events-none" />
                <div className="relative z-10">
                    <h2 className="text-3xl sm:text-4xl font-display text-text-primary mb-4 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
                        Let's understand more
                    </h2>
                    <p className="text-lg text-text-secondary">
                        Rate how severe each symptom feels, how long you've experienced it, and how often it occurs. This helps us match you with the most relevant resources.
                    </p>
                </div>

                {/* Progress Bar */}
                <SymptomDetailsProgress
                    current={completedSymptoms.size}
                    total={symptomsArray.length}
                    className="relative z-10"
                />

                {/* Review Panel - shown for 8+ symptoms */}
                {showEnhancedUX && (
                    <SymptomReviewPanel
                        symptoms={reviewSymptoms}
                        currentIndex={currentSymptomIndex}
                        onJumpTo={handleJumpToSymptom}
                        className="relative z-10"
                    />
                )}
            </div>

            <div className="space-y-4 sm:space-y-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSymptom.symptom_id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                        className="space-y-4"
                    >
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 border border-teal-500 shadow-lg relative overflow-hidden">
                            <h3 className="font-display text-2xl font-bold text-white mb-2">
                                Regarding: {currentSymptom.details?.name}
                            </h3>
                            <p className="text-white/90 text-base leading-relaxed">
                                {currentSymptom.details?.description}
                            </p>
                        </div>

                        {/* Sub-progress dots when paginated */}
                        {shouldPaginate && (
                            <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
                                {currentQuestions.map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            'w-2 h-2 rounded-full transition-colors duration-200',
                                            i === currentQuestionIndex
                                                ? 'bg-teal-500'
                                                : i < currentQuestionIndex
                                                    ? 'bg-teal-500/50'
                                                    : 'bg-surface-hover'
                                        )}
                                    />
                                ))}
                                <span className="ml-2 text-text-tertiary">
                                    Question {currentQuestionIndex + 1} of {currentQuestions.length}
                                </span>
                            </div>
                        )}

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={shouldPaginate ? `${currentSymptom.symptom_id}-q${currentQuestionIndex}` : currentSymptom.symptom_id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
                                className="space-y-6"
                            >
                                {visibleQuestions.includes('severity') && (
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

                                {visibleQuestions.includes('duration') && (
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

                                {visibleQuestions.includes('frequency') && (
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

                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Floating Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-2xl border-t border-border p-4 sm:p-6 z-[65]" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 1rem)' }}>
                <div className="max-w-3xl mx-auto space-y-3">
                    {/* Skip/Defaults Row - only shown for enhanced UX */}
                    {showEnhancedUX && (
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <NavigatorButton
                                variant="ghost"
                                size="sm"
                                onClick={handleSkipCurrent}
                                className="flex-1 text-xs sm:text-sm"
                            >
                                <SkipForward className="w-4 h-4 mr-2" />
                                Skip (Use Defaults)
                            </NavigatorButton>
                            {!isLastSymptom && (
                                <NavigatorButton
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleApplyDefaultsToRemaining}
                                    className="flex-1 text-xs sm:text-sm"
                                >
                                    <Zap className="w-4 h-4 mr-2" />
                                    Defaults for All Remaining
                                </NavigatorButton>
                            )}
                        </div>
                    )}

                    {/* Main Navigation Row */}
                    <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
                        <NavigatorButton
                            variant="secondary"
                            onClick={handleBack}
                            className="w-auto px-4 sm:px-6 text-sm sm:text-base bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 border-slate-900 dark:border-white"
                        >
                            Back
                        </NavigatorButton>

                        <NavigatorButton
                            size="lg"
                            onClick={handleNextSymptom}
                            isDisabled={!isCurrentQuestionAnswered()}
                            className="flex-1 sm:flex-none sm:min-w-[200px] text-sm sm:text-base px-4 py-2 sm:py-3"
                        >
                            {shouldPaginate && currentQuestionIndex < currentQuestions.length - 1
                                ? 'Next Question'
                                : isLastSymptom
                                    ? 'Analyze Results'
                                    : `Next (${currentSymptomIndex + 1}/${symptomsArray.length})`}
                        </NavigatorButton>
                    </div>
                </div>
            </div>

            <ConfirmDialog
                isOpen={showBackConfirm}
                onClose={() => setShowBackConfirm(false)}
                onConfirm={handleBackConfirm}
                title="Go Back to Symptoms?"
                message="Going back may cause you to lose details for symptoms you deselect. Your current answers will be saved for symptoms you keep selected."
                confirmText="Go Back"
                cancelText="Stay Here"
                variant="default"
            />
        </div>
    );
};
