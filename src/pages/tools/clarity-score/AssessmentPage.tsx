import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Phone, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { assessmentService } from '@/services/assessmentService';
import { Question } from '@/types/models';
import SEO from '@/components/SEO';

const STORAGE_KEY = 'psychage_clarity_progress';

const AssessmentPage: React.FC = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [step, setStep] = useState<'intro' | 'questions' | 'calculating'>('intro');

    // Load questions
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await assessmentService.getQuestions();
                setQuestions(data);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    // State for assessment
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [showCrisisOverlay, setShowCrisisOverlay] = useState(false);

    // Restore progress
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.answers) setAnswers(parsed.answers);
                if (parsed.currentQuestionIndex) setCurrentQuestionIndex(parsed.currentQuestionIndex);
                if (parsed.step && parsed.step !== 'results') setStep(parsed.step);
            }
        } catch (e) {
            console.error("Failed to restore progress", e);
        }
    }, []);

    // Save progress
    useEffect(() => {
        if (Object.keys(answers).length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                step: 'questions',
                currentQuestionIndex,
                answers
            }));
        }
    }, [answers, currentQuestionIndex]);

    const handleAnswer = (value: number) => {
        // Crisis Detection
        const currentQuestion = questions[currentQuestionIndex];
        // Scale dependent IDs: 9 (PHQ-9 item 9), 13 (Similar item if exists)
        if (currentQuestion && (currentQuestion.id === 9 || currentQuestion.id === 13) && value >= 2) {
            setShowCrisisOverlay(true);
        }

        setAnswers(prev => ({ ...prev, [currentQuestionIndex]: value }));

        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
            }, 250);
        } else {
            finishAssessment();
        }
    };

    const finishAssessment = () => {
        setStep('calculating');
        // Final save before clean up/transition logic in Results page
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            step: 'results',
            answers,
            timestamp: new Date().toISOString()
        }));

        setTimeout(() => {
            navigate('/tools/clarity-score/results');
        }, 2000);
    };

    if (isLoading) return <div className="min-h-screen bg-background pt-32 text-center text-text-primary">Loading assessment...</div>;

    const progress = Math.round(((currentQuestionIndex) / questions.length) * 100);

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-6 transition-colors duration-300">
            <SEO title="Clarity Assessment | Psychage" />

            {/* Crisis Overlay */}
            <AnimatePresence>
                {showCrisisOverlay && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <div className="bg-surface max-w-md w-full rounded-3xl p-8 border border-error/20 shadow-2xl">
                            <div className="flex items-center gap-3 text-error mb-4">
                                <AlertTriangle size={32} />
                                <h2 className="text-2xl font-bold">Support is Available</h2>
                            </div>
                            <p className="text-text-secondary mb-6">
                                It sounds like you're going through a tough time. You don't have to face this alone.
                            </p>
                            <div className="space-y-3 mb-8">
                                <a href="tel:988" className="flex items-center justify-center gap-2 w-full py-4 bg-error hover:bg-red-700 text-white rounded-xl font-bold transition-colors">
                                    <Phone size={20} /> Call 988 (Crisis Lifeline)
                                </a>
                                <a href="sms:988" className="flex items-center justify-center gap-2 w-full py-4 bg-surface-hover hover:bg-surface-active text-text-primary rounded-xl font-bold transition-colors">
                                    Text 988
                                </a>
                            </div>
                            <button
                                onClick={() => setShowCrisisOverlay(false)}
                                className="w-full text-text-tertiary hover:text-text-primary text-sm"
                            >
                                I'm safe, continue assessment
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                    {step === 'intro' ? (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary">
                                <AlertTriangle size={40} className="rotate-180" /> {/* Abstract icon */}
                            </div>
                            <h1 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-6">
                                Let's check in.
                            </h1>
                            <p className="text-xl text-text-secondary mb-12 leading-relaxed">
                                This 2-minute assessment measures key indicators of mental wellness. Your responses are private.
                            </p>

                            <div className="flex flex-col gap-4 max-w-xs mx-auto">
                                <Button onClick={() => setStep('questions')} size="lg" rightIcon={<ChevronRight size={20} />}>
                                    Start Check-in
                                </Button>
                                <button onClick={() => navigate('/tools')} className="text-text-tertiary text-sm hover:text-text-primary">
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    ) : step === 'calculating' ? (
                        <motion.div
                            key="calculating"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="relative w-24 h-24 mx-auto mb-8">
                                <motion.div className="absolute inset-0 border-4 border-border rounded-full" />
                                <motion.div
                                    className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-text-primary mb-2">Analyzing your responses...</h2>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="questions"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="bg-surface rounded-3xl p-8 md:p-12 shadow-xl shadow-shadow/10 border border-border"
                        >
                            <div className="mb-8 flex justify-between items-center text-sm font-medium text-text-tertiary">
                                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                                <span>{progress}% Complete</span>
                            </div>

                            <div className="w-full h-2 bg-surface-hover rounded-full mb-12 overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-12 leading-tight">
                                {questions[currentQuestionIndex].text}
                            </h2>

                            <div className="space-y-4">
                                {questions[currentQuestionIndex].options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(option.value)}
                                        className="w-full text-left p-6 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all font-medium text-lg text-text-primary"
                                    >
                                        {option.text}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 text-center">
                                <button onClick={() => navigate('/tools')} className="text-text-tertiary text-sm hover:text-error">
                                    Exit Assessment
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AssessmentPage;
