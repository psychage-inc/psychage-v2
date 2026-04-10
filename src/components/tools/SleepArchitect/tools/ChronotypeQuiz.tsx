/**
 * Chronotype Quiz — rMEQ questionnaire with animal chronotype mapping.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sunrise, Waves, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChronotype } from '../hooks/useChronotype';
import { getCategoryLabel } from '@/lib/sleep/chronotype';

const ANIMAL_ICONS: Record<string, React.ReactNode> = {
  lion: <Sunrise size={40} className="text-amber-500" />,
  bear: <Sun size={40} className="text-orange-500" />,
  wolf: <Moon size={40} className="text-indigo-500" />,
  dolphin: <Waves size={40} className="text-sky-500" />,
};

const ANIMAL_COLORS: Record<string, string> = {
  lion: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700',
  bear: 'from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-700',
  wolf: 'from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 border-indigo-200 dark:border-indigo-700',
  dolphin: 'from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 border-sky-200 dark:border-sky-700',
};

const ChronotypeQuiz: React.FC = () => {
  const {
    questions,
    answers,
    setAnswer,
    currentQuestion,
    goNext,
    goPrev,
    isComplete,
    submit,
    result,
    reset,
  } = useChronotype();

  // Show result
  if (result) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
            Your Chronotype
          </h3>
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <RotateCcw size={12} />
            Retake
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            'bg-gradient-to-br rounded-2xl p-6 border text-center mb-6',
            ANIMAL_COLORS[result.animal]
          )}
        >
          <div className="flex justify-center mb-3">
            {ANIMAL_ICONS[result.animal]}
          </div>
          <h4 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-1">
            The {result.label}
          </h4>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {getCategoryLabel(result.category)} &middot; Score: {result.score}
          </p>
        </motion.div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {result.description}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-center border border-indigo-100 dark:border-indigo-800">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">
              Ideal Bedtime
            </div>
            <div className="font-display font-bold text-lg text-gray-900 dark:text-white">
              {result.ideal_bedtime}
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center border border-amber-100 dark:border-amber-800">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">
              Ideal Wake Time
            </div>
            <div className="font-display font-bold text-lg text-gray-900 dark:text-white">
              {result.ideal_wake_time}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz flow
  const q = questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-gray-700">
      <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-1">
        Chronotype Quiz
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
        5 questions to discover your sleep animal &middot; Question{' '}
        {currentQuestion + 1} of {questions.length}
      </p>

      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {questions.map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 h-1 rounded-full transition-colors',
              answers[i] !== null
                ? 'bg-indigo-500'
                : i === currentQuestion
                  ? 'bg-indigo-200 dark:bg-indigo-700'
                  : 'bg-gray-200 dark:bg-gray-700'
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            {q.question}
          </p>

          <div className="space-y-2">
            {q.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setAnswer(currentQuestion, opt.value);
                  if (currentQuestion < questions.length - 1) {
                    setTimeout(goNext, 200);
                  }
                }}
                className={cn(
                  'w-full p-3 rounded-xl text-left text-sm font-medium transition-all border',
                  currentAnswer === opt.value
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300'
                    : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
        <button
          type="button"
          onClick={goPrev}
          disabled={currentQuestion === 0}
          className={cn(
            'flex items-center gap-1.5 text-sm font-bold transition-colors',
            currentQuestion === 0
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          )}
        >
          <ChevronLeft size={16} />
          Back
        </button>

        {isComplete ? (
          <button
            type="button"
            onClick={submit}
            className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            See Your Chronotype
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            disabled={currentAnswer === null}
            className={cn(
              'flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl transition-colors',
              currentAnswer !== null
                ? 'bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            )}
          >
            Next
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChronotypeQuiz;
