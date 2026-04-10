/**
 * Progressive Muscle Relaxation Guide — Step-through with auto-advance.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PMR_STEPS } from '@/lib/sleep/constants';

const PMRGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'tense' | 'release' | 'complete'>('idle');
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = PMR_STEPS[currentStep];
  const isComplete = currentStep >= PMR_STEPS.length;

  const reset = useCallback(() => {
    setCurrentStep(0);
    setPhase('idle');
    setTimer(0);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
    setPhase('tense');
    setTimer(0);
  }, []);

  useEffect(() => {
    if (!isRunning || isComplete) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        const next = prev + 1;
        if (phase === 'tense' && next >= step.tense_seconds) {
          setPhase('release');
          return 0;
        }
        if (phase === 'release' && next >= step.release_seconds) {
          // Move to next step
          const nextStep = currentStep + 1;
          if (nextStep >= PMR_STEPS.length) {
            setPhase('complete');
            setIsRunning(false);
          } else {
            setCurrentStep(nextStep);
            setPhase('tense');
          }
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, phase, step, currentStep, isComplete]);

  const skipStep = useCallback(() => {
    const nextStep = currentStep + 1;
    if (nextStep >= PMR_STEPS.length) {
      setPhase('complete');
      setIsRunning(false);
    } else {
      setCurrentStep(nextStep);
      setPhase('tense');
      setTimer(0);
    }
  }, [currentStep]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-gray-700">
      <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-1">
        Progressive Muscle Relaxation
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
        7 muscle groups &middot; ~10 minutes
      </p>

      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {PMR_STEPS.map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 h-1.5 rounded-full transition-colors',
              i < currentStep
                ? 'bg-emerald-400 dark:bg-emerald-500'
                : i === currentStep && isRunning
                  ? phase === 'tense'
                    ? 'bg-orange-400'
                    : 'bg-sky-400'
                  : 'bg-gray-200 dark:bg-gray-700'
            )}
          />
        ))}
      </div>

      {/* Content */}
      {phase === 'idle' && (
        <div className="text-center py-6">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 max-w-sm mx-auto">
            Find a comfortable position. You'll tense each muscle group for 5
            seconds, then release and relax for 10 seconds.
          </p>
          <button
            type="button"
            onClick={start}
            className="inline-flex items-center gap-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            <Play size={16} />
            Begin
          </button>
        </div>
      )}

      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-6"
        >
          <div className="text-3xl mb-3">🧘</div>
          <h4 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">
            Session Complete
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Take a moment to notice how your body feels. Let that relaxation
            carry you into sleep.
          </p>
          <button
            type="button"
            onClick={reset}
            className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Start Over
          </button>
        </motion.div>
      )}

      {(phase === 'tense' || phase === 'release') && step && (
        <motion.div
          key={`${currentStep}-${phase}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <div
            className={cn(
              'text-xs font-bold uppercase tracking-wider mb-2',
              phase === 'tense'
                ? 'text-orange-500'
                : 'text-sky-500'
            )}
          >
            {step.muscle_group} — {phase === 'tense' ? 'Tense' : 'Release'}
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 max-w-sm mx-auto">
            {phase === 'tense'
              ? step.instruction_tense
              : step.instruction_release}
          </p>

          {/* Timer */}
          <div className="flex justify-center mb-4">
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: phase === 'tense' ? [1, 1.1, 1] : [1, 0.95, 1],
                    }
              }
              transition={{ duration: 2, repeat: Infinity }}
              className={cn(
                'w-20 h-20 rounded-full flex items-center justify-center',
                phase === 'tense'
                  ? 'bg-orange-100 dark:bg-orange-900/30'
                  : 'bg-sky-100 dark:bg-sky-900/30'
              )}
            >
              <span className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                {(phase === 'tense' ? step.tense_seconds : step.release_seconds) -
                  timer}
              </span>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className="p-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {isRunning ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              type="button"
              onClick={skipStep}
              className="p-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              aria-label="Skip to next"
            >
              <SkipForward size={16} />
            </button>
            <button
              type="button"
              onClick={reset}
              className="p-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              aria-label="Reset"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PMRGuide;
