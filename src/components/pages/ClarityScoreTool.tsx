import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2,
  Phone,
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  ExternalLink,
  MessageCircle,
  Save,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import SEO from '../SEO';
import {
  QUESTIONS,
  DOMAINS,
  calculateClarityScore,
  getRecommendations,
  checkCrisisPattern,
} from '../../lib/clarity';
import type {
  ClarityScoreResult,
  ClarityHistoryItem,
  Recommendation,
  DomainKey,
} from '../../lib/clarity';
import ClarityResultsDashboard from '../tools/ClarityScore/results/ClarityResultsDashboard';
import { DIMENSION_META } from '../tools/ClarityScore/data/dimensions';
import AuthGate from '../auth/AuthGate';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { clarityScoreService } from '@/services/clarityScoreService';

/** Map domain index → DomainKey for icon lookup */
const DOMAIN_INDEX_TO_KEY: DomainKey[] = ['emotional', 'vitality', 'social', 'cognitive', 'functioning'];

const STORAGE_KEY = 'psychage_clarity_progress';
const HISTORY_KEY = 'psychage_clarity_history';

const ClarityScoreTool: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  // --- State ---
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [step, setStep] = useState<'intro' | 'questions' | 'calculating' | 'results'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.step === 'questions') return 'questions';
      }
    } catch {
      // Ignore
    }
    return 'intro';
  });

  const [currentIndex, setCurrentIndex] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.currentIndex || 0;
      }
    } catch {
      // Ignore
    }
    return 0;
  });

  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.answers || {};
      }
    } catch {
      // Ignore
    }
    return {};
  });

  const [results, setResults] = useState<ClarityScoreResult | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [hasCrisisTriggered, setHasCrisisTriggered] = useState(false);

  const [history, setHistory] = useState<ClarityHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const crisisContinueRef = useRef<HTMLButtonElement>(null);
  const directionRef = useRef<'forward' | 'backward'>('forward');

  // --- Load history from Supabase when authenticated ---
  useEffect(() => {
    if (isAuthenticated) {
      clarityScoreService.getHistory(10).then(setHistory).catch(() => {
        // Fall back to localStorage (already loaded)
      });
    }
  }, [isAuthenticated]);

  // --- Save to Dashboard handler ---
  const handleSaveToDashboard = useCallback(async () => {
    if (!results || saving || saved) return;
    setSaving(true);
    try {
      const { success } = await clarityScoreService.saveResult(results, answers);
      if (success) {
        setSaved(true);
        addToast('success', 'Clarity Score saved to your dashboard!');
      } else {
        addToast('error', 'Failed to save score. Please try again.');
      }
    } catch {
      addToast('error', 'Failed to save score. Please try again.');
    } finally {
      setSaving(false);
    }
  }, [results, answers, saving, saved, addToast]);

  // --- Persist progress ---
  useEffect(() => {
    if (step === 'questions') {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ step, currentIndex, answers })
      );
    }
  }, [step, currentIndex, answers]);

  // --- Crisis modal: block Escape, manage focus ---
  useEffect(() => {
    if (showCrisisModal) {
      setTimeout(() => crisisContinueRef.current?.focus(), 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') e.preventDefault();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showCrisisModal]);

  // --- Current question & domain ---
  const currentQuestion = QUESTIONS[currentIndex];
  const currentDomain = currentQuestion ? DOMAINS[currentQuestion.domainId] : DOMAINS[0];

  // --- Answer handler (select only, no auto-advance) ---
  const handleAnswer = useCallback(
    (value: number) => {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    },
    [currentQuestion]
  );

  // --- Next handler ---
  const handleNext = useCallback(() => {
    // Crisis detection: after completing all 4 PHQ-4 items (navigating past index 3)
    if (currentIndex === 3 && !hasCrisisTriggered) {
      if (checkCrisisPattern(answers)) {
        setShowCrisisModal(true);
        setHasCrisisTriggered(true);
        return;
      }
    }

    directionRef.current = 'forward';
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      computeResults(answers);
    }
  }, [currentIndex, answers, hasCrisisTriggered]);

  // --- Previous handler ---
  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      directionRef.current = 'backward';
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // --- Crisis modal continue ---
  const handleCrisisContinue = useCallback(() => {
    setShowCrisisModal(false);
    directionRef.current = 'forward';
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      computeResults(answers);
    }
  }, [currentIndex, answers]);

  // --- Compute results ---
  const computeResults = (finalAnswers: Record<string, number>) => {
    setStep('calculating');
    localStorage.removeItem(STORAGE_KEY);

    setTimeout(() => {
      const result = calculateClarityScore(finalAnswers);
      setResults(result);
      setRecommendations(getRecommendations(result.domainScores));

      // Save to history
      const entry: ClarityHistoryItem = {
        id: crypto.randomUUID(),
        date: new Date().toLocaleDateString(),
        score: result.totalScore,
        label: result.label,
        domainScores: result.domainScores,
      };
      const newHistory = [entry, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));

      setStep('results');
    }, 2000);
  };

  // --- Reset ---
  const resetAssessment = () => {
    setStep('intro');
    setCurrentIndex(0);
    setAnswers({});
    setResults(null);
    setRecommendations([]);
    setHasCrisisTriggered(false);
    setSaved(false);
    setSaving(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  // --- Domain color helpers ---
  const getDomainBarColor = (domainId: number): string => {
    return DOMAINS[domainId]?.bgColor || 'bg-gray-500';
  };

  // --- Render ---
  return (
    <div className={`${step === 'intro' ? 'min-h-screen' : 'min-h-[60vh]'} bg-background pt-24 pb-12 px-6 transition-colors duration-300`}>
      <SEO
        title="Clarity Score Assessment | Psychage"
        description="A 20-question wellness check-in built on validated psychological instruments. Get a snapshot of your mental wellbeing across five dimensions."
      />

      {/* ========== CRISIS MODAL ========== */}
      <AnimatePresence>
        {showCrisisModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="crisis-title"
              aria-describedby="crisis-desc"
              className="bg-white dark:bg-gray-900 max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border border-red-200 dark:border-red-900"
            >
              <div className="flex flex-col items-center bg-red-50 dark:bg-red-950/30 p-6 border-b border-red-100 dark:border-red-900">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400 mb-4 ring-4 ring-red-100 dark:ring-red-900/20">
                  <ShieldAlert size={32} />
                </div>
                <h2
                  id="crisis-title"
                  className="text-2xl font-bold text-gray-900 dark:text-white text-center"
                >
                  Support is Available
                </h2>
              </div>

              <div className="p-8 space-y-6">
                <p
                  id="crisis-desc"
                  className="text-center text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  Your responses suggest you may be experiencing significant
                  distress.{' '}
                  <strong className="text-gray-900 dark:text-white block mt-2">
                    You don't have to face this alone.
                  </strong>
                </p>

                <div className="space-y-3">
                  <a
                    href="tel:988"
                    className="flex items-center gap-4 w-full p-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-red-600/20"
                  >
                    <Phone size={24} className="shrink-0" />
                    <div className="flex-1">
                      <div className="text-lg font-bold">Call or Text 988</div>
                      <div className="text-sm text-red-100">
                        Free, confidential, 24/7 crisis support
                      </div>
                    </div>
                    <ExternalLink size={20} className="text-red-200" />
                  </a>

                  <a
                    href="sms:741741&body=HOME"
                    className="flex items-center gap-4 w-full p-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium transition-colors"
                  >
                    <MessageCircle size={24} className="shrink-0" />
                    <div className="flex-1">
                      <div className="font-bold">Text HOME to 741741</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Crisis Text Line — 24/7
                      </div>
                    </div>
                  </a>

                  <Link
                    to="/crisis"
                    className="flex items-center gap-4 w-full p-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium transition-colors"
                  >
                    <ExternalLink size={24} className="shrink-0" />
                    <div className="flex-1">
                      <div className="font-bold">More Crisis Resources</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Region-specific support services
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    ref={crisisContinueRef}
                    onClick={handleCrisisContinue}
                    className="w-full py-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-medium transition-colors rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    I'm safe right now — continue assessment
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`mx-auto ${step === 'results' ? 'max-w-5xl' : 'max-w-2xl'}`}>
        <AnimatePresence mode="wait">
          {/* ========== INTRO ========== */}
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
                Clarity Score
              </h1>
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 leading-relaxed">
                A structured wellness check-in built on validated psychological
                instruments. 20 questions, five dimensions, under 3 minutes.
              </p>

              {history.length > 0 && (
                <div className="mb-12 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                    Recent History
                  </h3>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {history.slice(0, 5).map((entry) => (
                      <div key={entry.id || entry.date} className="text-center">
                        <div
                          className={`w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center font-bold mb-1 border border-gray-200 dark:border-gray-700 ${
                            entry.score >= 80
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : entry.score >= 60
                                ? 'text-teal-600 dark:text-teal-400'
                                : entry.score >= 40
                                  ? 'text-amber-600 dark:text-amber-400'
                                  : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {entry.score}
                        </div>
                        <span className="text-[10px] text-gray-400">
                          {entry.label || entry.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={() => setStep('questions')}
                size="lg"
                rightIcon={<ChevronRight size={20} />}
              >
                Start Assessment
              </Button>
            </motion.div>
          )}

          {/* ========== QUESTIONS ========== */}
          {step === 'questions' && currentQuestion && (() => {
            const domainKey = DOMAIN_INDEX_TO_KEY[currentQuestion.domainId];
            const DomainIcon = DIMENSION_META[domainKey].icon;
            const isAnswered = answers[currentQuestion.id] !== undefined;
            const isLastQuestion = currentIndex === QUESTIONS.length - 1;

            return (
              <motion.div
                key={`question-${currentIndex}`}
                initial={{ opacity: 0, x: directionRef.current === 'forward' ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: directionRef.current === 'forward' ? -50 : 50 }}
                className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800"
              >
                {/* Progress header */}
                <div className="mb-6 flex justify-between items-center text-sm font-medium text-gray-400">
                  <span>
                    Question {currentIndex + 1} of {QUESTIONS.length}
                  </span>
                  <span>
                    {Math.round((currentIndex / QUESTIONS.length) * 100)}%
                    Complete
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full mb-8 overflow-hidden">
                  <motion.div
                    className={`h-full ${getDomainBarColor(currentQuestion.domainId)}`}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(currentIndex / QUESTIONS.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Domain banner */}
                <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                  <span
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${getDomainBarColor(currentQuestion.domainId)} text-white shrink-0`}
                  >
                    <DomainIcon size={20} />
                  </span>
                  <div>
                    <span className={`text-lg font-bold ${currentDomain.color}`}>
                      {currentDomain.name}
                    </span>
                    <span className="block text-xs text-gray-400 dark:text-gray-500">
                      {currentDomain.description}
                    </span>
                  </div>
                </div>

                {/* Question text with integrated time-period context */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-10 leading-tight">
                  <span className="flex items-center gap-2 text-base font-semibold text-teal-600 dark:text-teal-400 mb-3">
                    <Calendar size={16} className="shrink-0" />
                    {currentDomain.citation}
                  </span>
                  {currentQuestion.text}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = answers[currentQuestion.id] === option.value;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-medium text-lg ${
                          isSelected
                            ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300'
                            : 'border-gray-100 dark:border-gray-800 hover:border-teal-500 dark:hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 text-gray-700 dark:text-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                {/* Previous / Next navigation */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
                  {currentIndex > 0 ? (
                    <motion.button
                      type="button"
                      onClick={handlePrevious}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                    >
                      <ChevronLeft size={18} />
                      Previous
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  <motion.button
                    type="button"
                    onClick={handleNext}
                    disabled={!isAnswered}
                    whileTap={isAnswered ? { scale: 0.97 } : undefined}
                    whileHover={isAnswered ? { scale: 1.02 } : undefined}
                    className={`flex items-center gap-1.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isAnswered
                        ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm shadow-teal-600/20'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isLastQuestion ? 'Finish' : 'Next'}
                    <motion.span
                      className="inline-flex"
                      animate={isAnswered ? { x: [0, 3, 0] } : { x: 0 }}
                      transition={isAnswered ? { duration: 1.5, repeat: Infinity, repeatDelay: 2 } : undefined}
                    >
                      <ChevronRight size={18} />
                    </motion.span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })()}

          {/* ========== CALCULATING ========== */}
          {step === 'calculating' && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
              role="status"
              aria-live="polite"
            >
              <div className="relative w-24 h-24 mx-auto mb-8">
                <motion.div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-800 rounded-full" />
                <motion.div
                  className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Analyzing your responses...
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Computing your Clarity Score across five dimensions
              </p>
            </motion.div>
          )}

          {/* ========== RESULTS ========== */}
          {step === 'results' && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Save to Dashboard — top placement */}
              <div className="mb-4">
                <AuthGate
                  inline
                  message="Sign in to save your Clarity Score and track your progress over time."
                >
                  <button
                    onClick={handleSaveToDashboard}
                    disabled={saving || saved}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                      saved
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 cursor-default'
                        : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20 disabled:opacity-60'
                    }`}
                  >
                    {saved ? (
                      <>
                        <CheckCircle2 size={18} />
                        Saved to Dashboard
                      </>
                    ) : saving ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save to Dashboard
                      </>
                    )}
                  </button>
                </AuthGate>
              </div>

              <ClarityResultsDashboard
                results={results}
                recommendations={recommendations}
                history={history}
                onRetake={resetAssessment}
              />

              {/* Save to Dashboard — bottom placement */}
              <div className="mt-6">
                <AuthGate
                  inline
                  message="Sign in to save your Clarity Score and track your progress over time."
                >
                  <button
                    onClick={handleSaveToDashboard}
                    disabled={saving || saved}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                      saved
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 cursor-default'
                        : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20 disabled:opacity-60'
                    }`}
                  >
                    {saved ? (
                      <>
                        <CheckCircle2 size={18} />
                        Saved to Dashboard
                      </>
                    ) : saving ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save to Dashboard
                      </>
                    )}
                  </button>
                </AuthGate>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ClarityScoreTool;
