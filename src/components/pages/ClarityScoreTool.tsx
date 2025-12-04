import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, BarChart2, Phone, ChevronRight, CheckCircle2, Calendar, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';
import { assessmentService } from '../../services/assessmentService';
import { Question } from '../../types/models';
import { Link } from 'react-router-dom';
import SEO from '../SEO';

const STORAGE_KEY = 'psychage_clarity_progress';
const HISTORY_KEY = 'psychage_clarity_history';

interface AssessmentHistory {
    date: string;
    score: number;
}

const ClarityScoreTool: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    // Lazy initialization for state from localStorage
    const [step, setStep] = useState<'intro' | 'questions' | 'calculating' | 'results'>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.step && parsed.step !== 'intro' && parsed.step !== 'results') {
                    return parsed.step;
                }
            }
        } catch (e) {
            console.error("Failed to parse saved progress", e);
        }
        return 'intro';
    });

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                return parsed.currentQuestionIndex || 0;
            }
        } catch {
            // Ignore parsing errors
        }
        return 0;
    });

    const [answers, setAnswers] = useState<Record<number, number>>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                return parsed.answers || {};
            }
        } catch {
            // Ignore parsing errors
        }
        return {};
    });

    const [score, setScore] = useState<number | null>(null);
    const [showCrisisOverlay, setShowCrisisOverlay] = useState(false);

    const [history, setHistory] = useState<AssessmentHistory[]>(() => {
        try {
            const saved = localStorage.getItem(HISTORY_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });



    useEffect(() => {
        if (step !== 'intro' && step !== 'results') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, currentQuestionIndex, answers }));
        }
    }, [step, currentQuestionIndex, answers]);

    const handleAnswer = (value: number) => {

        // Crisis Detection Logic
        const currentQuestion = questions[currentQuestionIndex];
        // Question ID 4 is "Feeling down, depressed, or hopeless?"
        // Value 3 is "Nearly every day"
        if (currentQuestion && currentQuestion.id === 4 && value === 3) {
            setShowCrisisOverlay(true);
        }

        setAnswers(prev => ({ ...prev, [currentQuestionIndex]: value }));



        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(prev => prev + 1);
            }, 250);
        } else {
            calculateResults();
        }
    };

    const calculateResults = () => {
        setStep('calculating');
        localStorage.removeItem(STORAGE_KEY);


        setTimeout(() => {
            const currentAnswersList = Object.values(answers) as number[];
            const maxScore = questions.length * 3;
            const symptomScore = currentAnswersList.reduce((a: number, b: number) => a + b, 0);
            const clarity = Math.round(100 - ((symptomScore / maxScore) * 100));

            setScore(clarity);

            // Save to history
            const newHistory = [{ date: new Date().toLocaleDateString(), score: clarity }, ...history].slice(0, 5);
            setHistory(newHistory);
            localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));

            setStep('results');
        }, 2000);
    };

    const resetAssessment = () => {
        setStep('intro');
        setCurrentQuestionIndex(0);
        setAnswers({});
        setScore(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    const getRecommendation = (score: number) => {
        if (score >= 80) return {
            text: "Your mental clarity is high. Keep up your current wellness routines.",
            action: "Explore advanced mindfulness techniques in our Learn Hub.",
            link: "/learn"
        };
        if (score >= 50) return {
            text: "You're experiencing moderate stress. It might be helpful to talk to someone.",
            action: "Browse our directory to find a therapist who fits your needs.",
            link: "/find-care"
        };
        return {
            text: "Your clarity score suggests you may be overwhelmed. Professional support is recommended.",
            action: "Connect with a specialist immediately.",
            link: "/find-care"
        };
    };

    if (isLoading) return <div className="min-h-screen bg-[#fafaf9] dark:bg-[#050505] pt-32 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#fafaf9] dark:bg-[#050505] pt-24 pb-12 px-6 transition-colors duration-300">
            <SEO title="Clarity Score Assessment | Psychage" description="Assess your mental clarity and receive personalized recommendations." />

            {/* Crisis Overlay */}
            <AnimatePresence>
                {showCrisisOverlay && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <div className="bg-white dark:bg-gray-900 max-w-md w-full rounded-3xl p-8 border border-red-200 dark:border-red-900 shadow-2xl">
                            <div className="flex items-center gap-3 text-red-600 mb-4">
                                <AlertTriangle size={32} />
                                <h2 className="text-2xl font-bold">Support is Available</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                It sounds like you're going through a tough time. You don't have to face this alone.
                            </p>
                            <div className="space-y-3 mb-8">
                                <a href="tel:988" className="flex items-center justify-center gap-2 w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors">
                                    <Phone size={20} /> Call 988 (Crisis Lifeline)
                                </a>
                                <a href="sms:988" className="flex items-center justify-center gap-2 w-full py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold transition-colors">
                                    Text 988
                                </a>
                            </div>
                            <button
                                onClick={() => setShowCrisisOverlay(false)}
                                className="w-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm"
                            >
                                I'm safe, continue assessment
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                    {step === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8 text-teal-600 dark:text-teal-400">
                                <BarChart2 size={40} />
                            </div>
                            <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 dark:text-white mb-6">
                                Clarity Score™ Assessment
                            </h1>
                            <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 leading-relaxed">
                                A clinical-grade tool to measure your mental clarity, stress levels, and emotional balance. Takes less than 2 minutes.
                            </p>

                            {history.length > 0 && (
                                <div className="mb-12 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Recent History</h3>
                                    <div className="flex justify-center gap-4">
                                        {history.map((entry, i) => (
                                            <div key={i} className="text-center">
                                                <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center font-bold text-teal-600 dark:text-teal-400 mb-1 border border-gray-200 dark:border-gray-700">
                                                    {entry.score}
                                                </div>
                                                <span className="text-[10px] text-gray-400">
                                                    {entry.date}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Button onClick={() => setStep('questions')} size="lg" rightIcon={<ChevronRight size={20} />}>
                                Start Assessment
                            </Button>
                        </motion.div>
                    )}

                    {step === 'questions' && (
                        <motion.div
                            key="questions"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800"
                        >
                            <div className="mb-8 flex justify-between items-center text-sm font-medium text-gray-400">
                                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                                <span>{Math.round(((currentQuestionIndex) / questions.length) * 100)}% Complete</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full mb-12 overflow-hidden">
                                <motion.div
                                    className="h-full bg-teal-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12 leading-tight">
                                {questions[currentQuestionIndex].text}
                            </h2>

                            <div className="space-y-4">
                                {questions[currentQuestionIndex].options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(option.value)}
                                        className="w-full text-left p-6 rounded-2xl border-2 border-gray-100 dark:border-gray-800 hover:border-teal-500 dark:hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all font-medium text-lg text-gray-700 dark:text-gray-200"
                                    >
                                        {option.text}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 'calculating' && (
                        <motion.div
                            key="calculating"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20"
                        >
                            <div className="relative w-24 h-24 mx-auto mb-8">
                                <motion.div
                                    className="absolute inset-0 border-4 border-gray-200 dark:border-gray-800 rounded-full"
                                />
                                <motion.div
                                    className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Analyzing your responses...</h2>
                            <p className="text-gray-500 dark:text-gray-400">Generating your personalized Clarity Score™</p>
                        </motion.div>
                    )}

                    {step === 'results' && score !== null && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800"
                        >
                            <div className="bg-gray-900 dark:bg-black text-white p-12 text-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-20 bg-[url('/images/ui/noise.svg')] filter contrast-125 brightness-100"></div>
                                <div className="relative z-10">
                                    <p className="text-gray-400 font-bold tracking-wider uppercase text-sm mb-4">Your Clarity Score</p>
                                    <div className="text-8xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                                        {score}
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-medium">
                                        <CheckCircle2 size={16} className="text-green-400" />
                                        Assessment Complete
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 md:p-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <BarChart2 size={20} className="text-teal-500" />
                                            Analysis
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                            {getRecommendation(score).text}
                                        </p>
                                        <div className="space-y-4">
                                            {/* Mock Dimensions */}
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-500 dark:text-gray-400">Anxiety</span>
                                                    <span className="font-bold text-gray-900 dark:text-white">Low</span>
                                                </div>
                                                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-green-500 w-[20%]" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-500 dark:text-gray-400">Mood</span>
                                                    <span className="font-bold text-gray-900 dark:text-white">Stable</span>
                                                </div>
                                                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500 w-[80%]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <Calendar size={20} className="text-teal-500" />
                                            Recommendation
                                        </h3>
                                        <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-6 border border-teal-100 dark:border-teal-800">
                                            <p className="font-medium text-teal-900 dark:text-teal-200 mb-4">
                                                {getRecommendation(score).action}
                                            </p>
                                            <Link to={getRecommendation(score).link}>
                                                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white border-none">
                                                    Take Action
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center pt-8 border-t border-gray-100 dark:border-gray-800">
                                    <button
                                        onClick={resetAssessment}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
                                    >
                                        <RefreshCw size={16} />
                                        Retake Assessment
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ClarityScoreTool;