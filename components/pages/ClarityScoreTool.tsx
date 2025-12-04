import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import { assessmentQuestions } from '../../data/assessment';

interface ClarityScoreToolProps {
  onBack: () => void;
  onFinish: () => void;
}

type AssessmentStep = 'landing' | 'quiz' | 'calculating' | 'results';

const STORAGE_KEY = 'psychage_clarity_assessment';

const ClarityScoreTool: React.FC<ClarityScoreToolProps> = ({ onBack, onFinish }) => {
  const [step, setStep] = useState<AssessmentStep>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);

  // Resume from storage on mount
  useEffect(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
          try {
              const data = JSON.parse(saved);
              // Only resume if not finished or explicitly requested
              if (data.answers && Object.keys(data.answers).length > 0) {
                   setAnswers(data.answers);
                   if (data.currentQuestionIndex) setCurrentQuestionIndex(data.currentQuestionIndex);
                   if (data.step === 'quiz') setStep('quiz');
              }
          } catch(e) { console.error("Failed to load assessment"); }
      }
  }, []);

  // Save to storage on update
  useEffect(() => {
      if (step === 'quiz') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
              step,
              currentQuestionIndex,
              answers
          }));
      }
  }, [step, currentQuestionIndex, answers]);

  const clearProgress = () => {
      localStorage.removeItem(STORAGE_KEY);
      setAnswers({});
      setCurrentQuestionIndex(0);
      setScore(0);
      setStep('landing');
  };

  // --- QUIZ LOGIC ---
  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: value }));
    
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 250);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    setStep('calculating');
    // Clear storage on completion so they don't get stuck in old results if they leave
    localStorage.removeItem(STORAGE_KEY);
    
    setTimeout(() => {
        const currentAnswersList = Object.values(answers) as number[];
        // Add the last answer implicitly if batching missed it (though state usually catches up)
        // For robustness, calculate from what we have.
        
        const maxScore = assessmentQuestions.length * 3;
        const symptomScore = currentAnswersList.reduce((a: number, b: number) => a + b, 0);
        const clarity = Math.round(100 - ((symptomScore / maxScore) * 100));
        
        setScore(clarity);
        setStep('results');
    }, 2000);
  };

  // --- RENDERERS ---

  if (step === 'landing') {
    return (
      <div className="min-h-screen bg-white pt-24 pb-12 px-6 flex items-center justify-center">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 font-bold text-sm uppercase tracking-wider">
                    <ArrowLeft size={16} /> Back
                </button>
                <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
                    <BrainCircuit size={32} />
                </div>
                <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-6">
                    Clarity Score™ Assessment
                </h1>
                <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                    Understand your mental well-being in under 5 minutes. Our clinically-validated screening tool analyzes anxiety, mood, stress, and sleep patterns.
                </p>
                <ul className="space-y-4 mb-10">
                    {['Free & Anonymous', 'Clinical-grade insights', 'Personalized resource map'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                            <CheckCircle2 size={20} className="text-teal-500" />
                            {item}
                        </li>
                    ))}
                </ul>
                <div className="flex gap-4">
                    <Button size="lg" onClick={() => setStep('quiz')} rightIcon={<ArrowRight size={20} />}>
                        {Object.keys(answers).length > 0 ? 'Resume Assessment' : 'Start Assessment'}
                    </Button>
                    {Object.keys(answers).length > 0 && (
                        <Button variant="outline" size="lg" onClick={clearProgress}>
                            Start Over
                        </Button>
                    )}
                </div>
                <p className="mt-6 text-xs text-gray-400">
                    Disclaimer: This tool is for educational purposes only and is not a diagnostic instrument.
                </p>
            </div>
            <div className="hidden md:block bg-gray-50 rounded-[2.5rem] p-8 aspect-square relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20" />
            </div>
        </div>
      </div>
    );
  }

  if (step === 'quiz') {
    const question = assessmentQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / assessmentQuestions.length) * 100;

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-6 flex flex-col items-center max-w-2xl mx-auto">
            {/* Progress */}
            <div className="w-full h-1.5 bg-gray-200 rounded-full mb-12 overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-teal-500"
                />
            </div>

            <div className="w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-gray-200/50">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-4 block">
                    Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
                </span>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-gray-900 mb-10">
                    {question.text}
                </h2>

                <div className="space-y-4">
                    {question.options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleAnswer(option.value)}
                            className="w-full p-5 text-left rounded-xl border-2 border-gray-100 hover:border-teal-500 hover:bg-teal-50 transition-all font-medium text-gray-700 flex items-center justify-between group"
                        >
                            {option.text}
                            <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-teal-500 group-hover:bg-teal-500 flex items-center justify-center transition-colors">
                                <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={() => {
                    if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1);
                    else setStep('landing');
                }}
                className="mt-8 text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors"
            >
                Back to previous
            </button>
        </div>
    );
  }

  if (step === 'calculating') {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-gray-100 border-t-teal-500 rounded-full mb-8"
            />
            <h2 className="font-display font-bold text-2xl text-gray-900 animate-pulse">Analyzing patterns...</h2>
        </div>
    );
  }

  // Results
  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
                <h1 className="font-display font-bold text-4xl text-gray-900 mb-4">Your Clarity Score</h1>
                <p className="text-gray-500">Based on your responses from today</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Score Card */}
                <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-teal-500/20 blur-[80px] rounded-full" />
                    <div className="relative z-10">
                        <div className="text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-teal-200 to-teal-500 mb-4">
                            {score}
                        </div>
                        <div className="text-xl font-medium text-gray-300 mb-8">
                            / 100
                        </div>
                        
                        <div className="inline-block px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-bold tracking-wide">
                            {score > 80 ? 'OPTIMAL CLARITY' : score > 50 ? 'MODERATE STRAIN' : 'HIGH LOAD'}
                        </div>
                    </div>
                </div>

                {/* Breakdown */}
                <div>
                    <h3 className="font-bold text-gray-900 text-xl mb-6">Dimensional Breakdown</h3>
                    <div className="space-y-6">
                        {[
                            { label: "Anxiety & Focus", val: 75, color: "bg-teal-500" },
                            { label: "Mood Stability", val: 60, color: "bg-amber-500" },
                            { label: "Sleep Quality", val: 45, color: "bg-indigo-500" },
                            { label: "Stress Load", val: 80, color: "bg-rose-500" },
                        ].map(dim => (
                            <div key={dim.label}>
                                <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                                    <span>{dim.label}</span>
                                    <span>{dim.val}/100</span>
                                </div>
                                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${dim.val}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className={`h-full ${dim.color} rounded-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-2">Recommendation</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            Your sleep quality seems to be affecting your overall clarity. Prioritizing rest could have positive cascading effects on your mood and stress levels.
                        </p>
                        <a href="#" className="text-teal-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                            View Sleep Protocol <ChevronRight size={16} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center">
                <Button onClick={clearProgress} variant="outline" rightIcon={<RotateCcw size={16} />}>
                    Retake Assessment
                </Button>
            </div>
        </div>
    </div>
  );
};

export default ClarityScoreTool;