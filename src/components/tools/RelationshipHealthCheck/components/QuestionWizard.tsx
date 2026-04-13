import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, SkipForward, Heart, Home, Users, Globe } from 'lucide-react';
import SEO from '@/components/SEO';
import Button from '@/components/ui/Button';
import { getActiveQuestions } from '../questions';
import { LIKERT_OPTIONS, DOMAIN_META, SUB_DIMENSION_META } from '../types';
import type { RelationshipDomain } from '../types';

interface QuestionWizardProps {
  skipPartner: boolean;
  onComplete: (answers: Record<string, number>) => void;
  onCancel: () => void;
}

const DOMAIN_ICONS: Record<RelationshipDomain, React.ReactNode> = {
  partner: <Heart size={16} />,
  family: <Home size={16} />,
  friends: <Users size={16} />,
  community: <Globe size={16} />,
};

/** Muted domain accent colors that work with design-system neutrals */
const DOMAIN_ACCENT: Record<RelationshipDomain, { badge: string; progress: string; selected: string }> = {
  partner: {
    badge: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800',
    progress: 'bg-rose-500',
    selected: 'bg-rose-600 dark:bg-rose-500',
  },
  family: {
    badge: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
    progress: 'bg-indigo-500',
    selected: 'bg-indigo-600 dark:bg-indigo-500',
  },
  friends: {
    badge: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    progress: 'bg-amber-500',
    selected: 'bg-amber-600 dark:bg-amber-500',
  },
  community: {
    badge: 'bg-primary/10 text-primary border-primary/20',
    progress: 'bg-primary',
    selected: 'bg-primary',
  },
};

export const QuestionWizard: React.FC<QuestionWizardProps> = ({
  skipPartner,
  onComplete,
  onCancel,
}) => {
  const questions = useMemo(() => getActiveQuestions(skipPartner), [skipPartner]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [direction, setDirection] = useState(1);
  const [showDomainTransition, setShowDomainTransition] = useState(false);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevDomainRef = useRef<string | null>(null);
  const seenDomainsRef = useRef<Set<string>>(new Set());

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex) / totalQuestions) * 100;

  // Sub-dimension label for current question
  const currentSubDimMeta = useMemo(() => {
    if (!currentQuestion) return null;
    return SUB_DIMENSION_META.find((m) => m.key === currentQuestion.subDimension) ?? null;
  }, [currentQuestion]);

  // Progress milestones
  const showMilestone = useMemo(() => {
    const pct = Math.round(progress);
    if (pct >= 49 && pct <= 52) return 'You\'re halfway there!';
    if (pct >= 74 && pct <= 77) return 'Almost done -- just a few more!';
    return null;
  }, [progress]);

  // Mark first domain as seen on mount
  useEffect(() => {
    if (currentQuestion) {
      seenDomainsRef.current.add(currentQuestion.domain);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Detect domain transitions -- only show once per domain, only going forward
  useEffect(() => {
    if (!currentQuestion) return;
    const currentDomain = currentQuestion.domain;
    const isNewDomain = prevDomainRef.current && prevDomainRef.current !== currentDomain;
    const notSeenYet = !seenDomainsRef.current.has(currentDomain);

    if (isNewDomain && notSeenYet) {
      seenDomainsRef.current.add(currentDomain);
      setShowDomainTransition(true);
      const timer = setTimeout(() => setShowDomainTransition(false), 1500);
      return () => clearTimeout(timer);
    }
    prevDomainRef.current = currentDomain;
  }, [currentIndex, currentQuestion]);

  const handleAnswer = useCallback(
    (value: number) => {
      if (!currentQuestion) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));

      autoAdvanceTimer.current = setTimeout(() => {
        if (currentIndex < totalQuestions - 1) {
          setDirection(1);
          setCurrentIndex((i) => i + 1);
        } else {
          onComplete({ ...answers, [currentQuestion.id]: value });
        }
      }, 400);
    },
    [currentQuestion, currentIndex, totalQuestions, answers, onComplete]
  );

  const handleBack = useCallback(() => {
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
    }
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const handleSkip = useCallback(() => {
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
    }
    if (currentIndex < totalQuestions - 1) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
    } else {
      onComplete(answers);
    }
  }, [currentIndex, totalQuestions, answers, onComplete]);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  if (!currentQuestion) return null;

  const domainMeta = DOMAIN_META[currentQuestion.domain];
  const selectedValue = answers[currentQuestion.id];
  const accent = DOMAIN_ACCENT[currentQuestion.domain];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 transition-colors duration-300">
      <SEO
        title="Relationship Health Check | Psychage"
        description="Complete your relationship health assessment."
      />
      <div className="container mx-auto max-w-2xl">
        {/* Question card */}
        <div className="bg-surface rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50 dark:shadow-none border border-border">
          {/* Progress header */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-tertiary font-medium">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-xs text-text-tertiary font-medium">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress bar */}
          <div
            className="h-2 bg-surface-active rounded-full overflow-hidden mb-8"
            role="progressbar"
            aria-valuenow={currentIndex + 1}
            aria-valuemin={1}
            aria-valuemax={totalQuestions}
            aria-label={`Question ${currentIndex + 1} of ${totalQuestions}`}
          >
            <motion.div
              className={`h-full rounded-full ${accent.progress}`}
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>

          {/* Progress milestone */}
          <AnimatePresence>
            {showMilestone && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center mb-4"
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {showMilestone}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Domain + sub-dimension badges */}
          <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl bg-surface-hover border border-border">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${accent.badge}`}
            >
              {DOMAIN_ICONS[currentQuestion.domain]}
              {domainMeta.name}
            </span>
            {currentSubDimMeta && (
              <span className="text-[11px] text-text-tertiary font-medium">
                {currentSubDimMeta.name}
              </span>
            )}
          </div>

          {/* Domain transition banner */}
          <AnimatePresence>
            {showDomainTransition && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="mb-6 rounded-xl border border-border bg-surface-hover p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                  {DOMAIN_ICONS[currentQuestion.domain]}
                </div>
                <div>
                  <p className="font-semibold text-sm text-text-primary">
                    Now exploring: {domainMeta.name}
                  </p>
                  <p className="text-xs text-text-tertiary">{domainMeta.description}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Question */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.25 }}
              className="mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center leading-tight">
                {currentQuestion.text}
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* Likert options */}
          <div className="space-y-3 max-w-md mx-auto mb-10">
            {LIKERT_OPTIONS.map((option) => {
              const isSelected = selectedValue === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all min-h-[48px] ${
                    isSelected
                      ? `${accent.selected} text-white border-transparent shadow-md`
                      : 'border-border bg-surface text-text-secondary hover:border-border-hover hover:bg-surface-hover'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-white bg-white' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {isSelected && (
                        <div className={`w-2 h-2 rounded-full ${accent.progress}`} />
                      )}
                    </div>
                    <span className="font-medium text-sm">{option.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between max-w-md mx-auto pt-6 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ArrowLeft size={16} />}
              onClick={currentIndex > 0 ? handleBack : onCancel}
            >
              {currentIndex > 0 ? 'Back' : 'Cancel'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<SkipForward size={16} />}
              onClick={handleSkip}
            >
              Skip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
