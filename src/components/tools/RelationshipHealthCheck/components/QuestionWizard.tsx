import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, SkipForward, Heart, Home, Users, Globe } from 'lucide-react';
import SEO from '@/components/SEO';
import Button from '@/components/ui/Button';
import { getActiveQuestions } from '../questions';
import { LIKERT_OPTIONS, DOMAIN_META } from '../types';
import type { RelationshipDomain, RelationshipQuestion } from '../types';

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

const DOMAIN_ORDER: RelationshipDomain[] = ['partner', 'family', 'friends', 'community'];

export const QuestionWizard: React.FC<QuestionWizardProps> = ({
  skipPartner,
  onComplete,
  onCancel,
}) => {
  const questions = useMemo(() => getActiveQuestions(skipPartner), [skipPartner]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [showDomainTransition, setShowDomainTransition] = useState(false);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevDomainRef = useRef<string | null>(null);
  const seenDomainsRef = useRef<Set<string>>(new Set());

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex) / totalQuestions) * 100;

  // Mark first domain as seen on mount
  useEffect(() => {
    if (currentQuestion) {
      seenDomainsRef.current.add(currentQuestion.domain);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Detect domain transitions — only show once per domain, only going forward
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

      // Auto-advance after brief delay
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

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  if (!currentQuestion) return null;

  const domainMeta = DOMAIN_META[currentQuestion.domain];
  const selectedValue = answers[currentQuestion.id];

  // Domain badge colors (static Tailwind classes)
  const domainBadgeClasses: Record<RelationshipDomain, string> = {
    partner: 'bg-rose-50 text-rose-600 border-rose-200',
    family: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    friends: 'bg-amber-50 text-amber-600 border-amber-200',
    community: 'bg-teal-50 text-teal-600 border-teal-200',
  };

  const domainProgressColors: Record<RelationshipDomain, string> = {
    partner: 'bg-rose-500',
    family: 'bg-indigo-500',
    friends: 'bg-amber-500',
    community: 'bg-teal-500',
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <SEO
        title="Relationship Health Check | Psychage"
        description="Complete your relationship health assessment."
      />
      <div className="container mx-auto max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-medium">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <div
            className="h-2 bg-gray-200 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={currentIndex + 1}
            aria-valuemin={1}
            aria-valuemax={totalQuestions}
            aria-label={`Question ${currentIndex + 1} of ${totalQuestions}`}
          >
            <motion.div
              className={`h-full rounded-full ${domainProgressColors[currentQuestion.domain]}`}
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Domain badge */}
        <div className="flex justify-center mb-6">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${domainBadgeClasses[currentQuestion.domain]}`}
          >
            {DOMAIN_ICONS[currentQuestion.domain]}
            {domainMeta.name}
          </span>
        </div>

        {/* Domain transition banner */}
        <AnimatePresence>
          {showDomainTransition && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mb-6 rounded-xl border p-4 flex items-center gap-3"
              style={{
                backgroundColor: `var(--domain-bg, #f0fdfa)`,
                borderColor: `var(--domain-border, #ccfbf1)`,
              }}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${domainMeta.bgColor} ${domainMeta.textColor}`}
              >
                {DOMAIN_ICONS[currentQuestion.domain]}
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">
                  Now exploring: {domainMeta.name}
                </p>
                <p className="text-xs text-gray-500">{domainMeta.description}</p>
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
            className="mb-8"
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center leading-snug">
              {currentQuestion.text}
            </h2>
          </motion.div>
        </AnimatePresence>

        {/* Likert options */}
        <div className="space-y-3 max-w-md mx-auto mb-8">
          {LIKERT_OPTIONS.map((option) => {
            const isSelected = selectedValue === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all min-h-[48px] ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50 text-teal-800'
                    : 'border-gray-100 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-teal-500 bg-teal-500' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="font-medium text-sm">{option.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between max-w-md mx-auto">
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
  );
};
