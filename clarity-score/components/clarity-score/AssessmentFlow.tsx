'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { QUESTIONS, DOMAINS } from '@/lib/data/questions';
import { useAuth } from '@/lib/hooks/useAuth';
import { useSubmitAssessment } from '@/lib/hooks/useAssessment';
import { Loader2 } from 'lucide-react';

import ProgressBar from './ProgressBar';
import DomainIndicator from './DomainIndicator';
import QuestionCard from './QuestionCard';
import CrisisModal from './CrisisModal';
import AuthModal from './AuthModal';

export default function AssessmentFlow() {
    const router = useRouter();
    const { user, isLoading: authLoading } = useAuth();
    const { mutateAsync: submitAssessment } = useSubmitAssessment();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [direction, setDirection] = useState(1);
    const [showCrisis, setShowCrisis] = useState(false);
    const [showSavePrompt, setShowSavePrompt] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasCrisisTriggered, setHasCrisisTriggered] = useState(false);

    useEffect(() => {
        const saved = sessionStorage.getItem('clarity_score_draft');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.answers && parsed.currentIndex) {
                    setAnswers(parsed.answers);
                    setCurrentIndex(parsed.currentIndex);
                }
            } catch (e) {
                // Ignored
            }
        }
    }, []);

    const handleBeforeUnload = useCallback((e: BeforeUnloadEvent) => {
        if (currentIndex > 0 && currentIndex < QUESTIONS.length) {
            e.preventDefault();
            e.returnValue = '';
        }
    }, [currentIndex]);

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [handleBeforeUnload]);

    useEffect(() => {
        if (currentIndex > 0 && currentIndex < QUESTIONS.length) {
            sessionStorage.setItem('clarity_score_draft', JSON.stringify({ answers, currentIndex }));
        }
    }, [answers, currentIndex]);

    const currentQuestion = QUESTIONS[currentIndex];
    const currentDomain = DOMAINS[currentQuestion.domainId];

    const advanceFlow = useCallback(async (currentAnswers: Record<string, number>) => {
        if (currentIndex === 3 && !hasCrisisTriggered) {
            const phqTotal = (currentAnswers['q1'] || 0) + (currentAnswers['q2'] || 0) + (currentAnswers['q3'] || 0) + (currentAnswers['q4'] || 0);
            if (phqTotal >= 8 || currentAnswers['q4'] >= 2) {
                setShowCrisis(true);
                setHasCrisisTriggered(true);
                return;
            }
        }

        if (currentIndex < QUESTIONS.length - 1) {
            setDirection(1);
            setCurrentIndex(prev => prev + 1);
        } else {
            handleCompletion(currentAnswers);
        }
    }, [currentIndex, hasCrisisTriggered]);

    const handleCompletion = (currentAnswers: Record<string, number>) => {
        if (!user && !authLoading) {
            setShowSavePrompt(true);
            return;
        }
        submitFinal(currentAnswers);
    };

    const submitFinal = async (finalAnswers: Record<string, number>) => {
        setIsSubmitting(true);
        setError(null);
        setShowSavePrompt(false);

        try {
            const result = await submitAssessment(finalAnswers);
            sessionStorage.removeItem('clarity_score_draft');

            if (result.id.startsWith('anon-')) {
                sessionStorage.setItem(`assessment-${result.id}`, JSON.stringify(result));
            }

            router.push(`/clarity-score/results/${result.id}`);
        } catch (err: any) {
            setError(err.message || 'Failed to submit assessment. Please try again.');
            setIsSubmitting(false);
        }
    };

    const handleAnswerSelect = (value: number) => {
        const newAnswers = { ...answers, [currentQuestion.id]: value };
        setAnswers(newAnswers);
        setTimeout(() => advanceFlow(newAnswers), 300);
    };

    // Listen for user login changes effectively (handled passively right now)
    useEffect(() => {
        if (showSavePrompt && user) {
            // User just logged in via modal
            setShowSavePrompt(false);
            setShowAuthModal(false);
            submitFinal(answers);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    if (authLoading) return null;

    if (isSubmitting) {
        return (
            <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4">
                <div className="relative mb-8 h-24 w-24">
                    <div className="absolute inset-0 animate-[spin_3s_linear_infinite] rounded-full border border-teal/30" />
                    <div className="absolute inset-2 animate-[spin_2s_linear_infinite_reverse] rounded-full border border-teal/50" />
                    <Loader2 className="absolute inset-0 m-auto h-8 w-8 animate-spin text-teal" />
                </div>
                <h2 className="font-heading mb-2 text-2xl text-white">Computing your Score...</h2>
                <p className="max-w-sm text-center text-sm text-text-muted">Analyzing domains and comparing with clinical baselines.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col min-h-[calc(100vh-64px)] px-4 py-8 md:py-12">
            <ProgressBar
                current={currentIndex + 1}
                total={QUESTIONS.length}
                domainColorClass={currentDomain.bgColor}
            />

            <div className="relative flex flex-1 flex-col justify-center overflow-hidden py-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentDomain.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex w-full flex-shrink-0 flex-col items-center"
                    >
                        <DomainIndicator domainId={currentDomain.id} />
                    </motion.div>
                </AnimatePresence>

                <div className="mt-8">
                    <AnimatePresence mode="wait" custom={direction}>
                        <QuestionCard
                            key={currentQuestion.id}
                            question={currentQuestion}
                            selectedValue={answers[currentQuestion.id]}
                            onSelect={handleAnswerSelect}
                            direction={direction}
                        />
                    </AnimatePresence>
                </div>

                {error && (
                    <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-200">
                        {error}
                        <button
                            onClick={() => submitFinal(answers)}
                            className="ml-4 font-medium underline hover:text-white focus:outline-none focus:ring-2 focus:ring-teal"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>

            <CrisisModal
                isOpen={showCrisis}
                onContinue={() => {
                    setShowCrisis(false);
                    if (currentIndex === QUESTIONS.length - 1) {
                        handleCompletion(answers);
                    } else {
                        setDirection(1);
                        setCurrentIndex(prev => prev + 1);
                    }
                }}
            />

            <AnimatePresence>
                {showSavePrompt && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-bg-secondary p-8"
                        >
                            <h2 className="font-heading mb-2 text-center text-2xl text-white">Save Your Results</h2>
                            <p className="mb-8 text-center text-sm text-text-secondary">
                                Create an account to track your progress over time, or continue to see a one-time snapshot.
                            </p>

                            <div className="space-y-4">
                                <button
                                    onClick={() => setShowAuthModal(true)}
                                    className="w-full rounded-xl bg-gradient-to-r from-teal-dark to-teal py-4 text-sm font-medium text-white transition-transform hover:shadow-[0_0_20px_rgba(13,148,136,0.3)] active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary"
                                >
                                    Sign Up to Save
                                </button>
                                <button
                                    onClick={() => submitFinal(answers)}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-4 text-sm font-medium text-text-muted transition-colors hover:bg-white/10 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary"
                                >
                                    Skip & View Results
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                defaultMode="signup"
            />
        </div>
    );
}
