import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  BarChart2,
  Phone,
  ChevronRight,
  CheckCircle2,
  RefreshCw,
  TrendingUp,
  ShieldAlert,
  ExternalLink,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import SEO from '../SEO';
import {
  QUESTIONS,
  DOMAINS,
  calculateClarityScore,
  getScoreLabel,
  getScoreTierColor,
  getRecommendations,
  checkCrisisPattern,
} from '../../lib/clarity';
import type {
  ClarityScoreResult,
  ClarityHistoryItem,
  Recommendation,
} from '../../lib/clarity';

const STORAGE_KEY = 'psychage_clarity_progress';
const HISTORY_KEY = 'psychage_clarity_history';

const ClarityScoreTool: React.FC = () => {
  // --- State ---
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

  // --- Answer handler ---
  const handleAnswer = useCallback(
    (value: number) => {
      const newAnswers = { ...answers, [currentQuestion.id]: value };
      setAnswers(newAnswers);

      setTimeout(() => {
        // Crisis detection: after completing all 4 PHQ-4 items (index 3)
        if (currentIndex === 3 && !hasCrisisTriggered) {
          if (checkCrisisPattern(newAnswers)) {
            setShowCrisisModal(true);
            setHasCrisisTriggered(true);
            return;
          }
        }

        if (currentIndex < QUESTIONS.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          computeResults(newAnswers);
        }
      }, 250);
    },
    [currentIndex, answers, hasCrisisTriggered, currentQuestion]
  );

  // --- Crisis modal continue ---
  const handleCrisisContinue = useCallback(() => {
    setShowCrisisModal(false);
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
    localStorage.removeItem(STORAGE_KEY);
  };

  // --- Domain color helpers ---
  const getDomainBarColor = (domainId: number): string => {
    return DOMAINS[domainId]?.bgColor || 'bg-gray-500';
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-6 transition-colors duration-300">
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

      <div className="max-w-2xl mx-auto">
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
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                A structured wellness check-in built on validated psychological
                instruments. 20 questions, five dimensions, under 3 minutes.
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-12">
                This is a wellness snapshot, not a diagnosis or clinical
                assessment.
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
          {step === 'questions' && currentQuestion && (
            <motion.div
              key={`question-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
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

              {/* Domain indicator */}
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full ${getDomainBarColor(currentQuestion.domainId)}`}
                />
                <span
                  className={`text-sm font-semibold ${currentDomain.color}`}
                >
                  {currentDomain.name}
                </span>
                <span className="text-xs text-gray-400">
                  ({currentDomain.description})
                </span>
              </div>

              {/* Citation / context */}
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-8 italic">
                {currentDomain.citation}
              </p>

              {/* Question text */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-10 leading-tight">
                {currentQuestion.text}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full text-left p-5 rounded-2xl border-2 border-gray-100 dark:border-gray-800 hover:border-teal-500 dark:hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all font-medium text-lg text-gray-700 dark:text-gray-200"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Score Hero */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
                <div className="bg-gray-900 dark:bg-black text-white p-12 text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-teal-500/20 to-transparent" />
                  <div className="relative z-10">
                    <p className="text-gray-400 font-bold tracking-wider uppercase text-sm mb-4">
                      Your Clarity Score
                    </p>
                    <div className="text-8xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                      {results.totalScore}
                    </div>
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border text-sm font-semibold ${
                        results.tier === 'thriving'
                          ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                          : results.tier === 'balanced'
                            ? 'bg-teal-500/20 border-teal-500/30 text-teal-400'
                            : results.tier === 'struggling'
                              ? 'bg-amber-500/20 border-amber-500/30 text-amber-400'
                              : results.tier === 'distressed'
                                ? 'bg-orange-500/20 border-orange-500/30 text-orange-400'
                                : 'bg-red-500/20 border-red-500/30 text-red-400'
                      }`}
                    >
                      <CheckCircle2 size={16} />
                      {results.label}
                    </div>
                  </div>
                </div>

                {/* Domain Breakdown */}
                <div className="p-8 md:p-10">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <BarChart2 size={20} className="text-teal-500" />
                    Dimension Breakdown
                  </h3>
                  <div className="space-y-5">
                    {DOMAINS.map((domain) => {
                      const score =
                        results.domainScores[domain.key];
                      const pct = (score / 20) * 100;
                      return (
                        <div key={domain.id}>
                          <div className="flex justify-between text-sm mb-1.5">
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {domain.name}
                            </span>
                            <span className="font-bold text-gray-900 dark:text-white">
                              {Math.round(score)}/20
                            </span>
                          </div>
                          <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${domain.bgColor}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{
                                duration: 0.8,
                                delay: domain.id * 0.1,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Strengths & Growth Areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 size={18} />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Core Strengths
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {results.strengths.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                        <span>
                          Your <strong>{s}</strong> is a source of strength
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <TrendingUp size={18} />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Growth Opportunities
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {results.growthAreas.map((g, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        <span>
                          Your <strong>{g}</strong> could use some attention
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <ArrowRight size={20} className="text-teal-500" />
                    What You Can Do
                  </h3>
                  <div className="space-y-4">
                    {recommendations.map((rec, i) => (
                      <div
                        key={i}
                        className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-5 border border-teal-100 dark:border-teal-800"
                      >
                        <p className="text-sm font-medium text-teal-900 dark:text-teal-200 mb-3">
                          {rec.text}
                        </p>
                        <Link to={rec.link}>
                          <Button
                            size="sm"
                            className="bg-teal-600 hover:bg-teal-700 text-white border-none"
                          >
                            {rec.linkLabel}
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Clinical Flags */}
              {results.flags.length > 0 && (
                <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle
                      size={18}
                      className="text-amber-600 dark:text-amber-400"
                    />
                    <h3 className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                      Clinical Indicators
                    </h3>
                  </div>
                  <ul className="space-y-1.5">
                    {results.flags.map((flag, i) => (
                      <li
                        key={i}
                        className="text-sm text-amber-800 dark:text-amber-300"
                      >
                        {flag}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-3">
                    These are not diagnoses. Consider discussing with a
                    healthcare provider.
                  </p>
                </div>
              )}

              {/* Disclaimer */}
              <p className="text-center text-xs text-gray-400 dark:text-gray-500 px-4">
                The Clarity Score is a wellness snapshot, not a clinical
                assessment or diagnosis. It does not replace professional care.
                If you are in crisis, call or text 988.
              </p>

              {/* Retake */}
              <div className="text-center pt-4">
                <button
                  onClick={resetAssessment}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
                >
                  <RefreshCw size={16} />
                  Retake Assessment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ClarityScoreTool;
