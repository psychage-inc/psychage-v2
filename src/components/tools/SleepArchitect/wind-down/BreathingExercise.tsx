/**
 * Breathing Exercise — Animated breathing patterns (4-7-8, Box, Diaphragmatic).
 * Uses Framer Motion for visual feedback and respects prefers-reduced-motion.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, Pause, X, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BREATHING_EXERCISES } from '@/lib/sleep/constants';
import type { BreathingPattern, BreathingExerciseConfig } from '@/lib/sleep/types';

interface BreathingExerciseProps {
  onClose?: () => void;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onClose }) => {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>('4-7-8');
  const [isRunning, setIsRunning] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [currentPhaseIdx, setCurrentPhaseIdx] = useState(0);
  const [phaseTimer, setPhaseTimer] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const config = BREATHING_EXERCISES.find(
    (e) => e.id === selectedPattern
  ) as BreathingExerciseConfig;
  const currentPhase = config.phases[currentPhaseIdx];
  const isComplete = currentCycle >= config.cycles;

  const reset = useCallback(() => {
    setIsRunning(false);
    setCurrentCycle(0);
    setCurrentPhaseIdx(0);
    setPhaseTimer(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (!isRunning || isComplete) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setPhaseTimer((prev) => {
        const next = prev + 1;
        if (next >= currentPhase.duration) {
          // Move to next phase
          const nextPhaseIdx = currentPhaseIdx + 1;
          if (nextPhaseIdx >= config.phases.length) {
            // Completed one cycle
            setCurrentCycle((c) => c + 1);
            setCurrentPhaseIdx(0);
          } else {
            setCurrentPhaseIdx(nextPhaseIdx);
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
  }, [isRunning, currentPhaseIdx, currentPhase, config.phases, config.cycles, isComplete]);

  // Reset when pattern changes
  useEffect(() => {
    reset();
  }, [selectedPattern, reset]);

  const circleScale = (() => {
    if (!isRunning || isComplete) return 1;
    const progress = phaseTimer / currentPhase.duration;
    if (currentPhase.type === 'inhale') return 1 + progress * 0.4;
    if (currentPhase.type === 'exhale') return 1.4 - progress * 0.4;
    return 1.4; // hold
  })();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Wind size={20} className="text-sky-500" />
          <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
            Breathing Exercise
          </h3>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Pattern selector */}
      {!isRunning && (
        <div className="flex gap-2 mb-6">
          {BREATHING_EXERCISES.map((ex) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => setSelectedPattern(ex.id)}
              className={cn(
                'flex-1 p-3 rounded-xl text-xs font-bold transition-all border text-center',
                selectedPattern === ex.id
                  ? 'bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-700 text-sky-700 dark:text-sky-300'
                  : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-300'
              )}
            >
              {ex.name}
            </button>
          ))}
        </div>
      )}

      {/* Description */}
      {!isRunning && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
          {config.description}
        </p>
      )}

      {/* Animated circle */}
      <div className="flex justify-center my-8">
        <div className="relative w-48 h-48 flex items-center justify-center">
          {shouldReduceMotion ? (
            // Reduced motion: text-only
            <div className="text-center">
              {isRunning && !isComplete && (
                <>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentPhase.label}
                  </div>
                  <div className="text-lg font-display text-indigo-600 dark:text-indigo-400">
                    {currentPhase.duration - phaseTimer}s
                  </div>
                </>
              )}
              {isComplete && (
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  Complete!
                </div>
              )}
            </div>
          ) : (
            <>
              <motion.div
                animate={{ scale: circleScale }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className={cn(
                  'w-40 h-40 rounded-full flex items-center justify-center',
                  currentPhase?.type === 'inhale'
                    ? 'bg-sky-100 dark:bg-sky-900/30'
                    : currentPhase?.type === 'exhale'
                      ? 'bg-indigo-100 dark:bg-indigo-900/30'
                      : 'bg-purple-100 dark:bg-purple-900/30'
                )}
              >
                <div className="text-center">
                  {isRunning && !isComplete && (
                    <>
                      <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        {currentPhase.label}
                      </div>
                      <div className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                        {currentPhase.duration - phaseTimer}
                      </div>
                    </>
                  )}
                  {isComplete && (
                    <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      Complete!
                    </div>
                  )}
                  {!isRunning && !isComplete && (
                    <div className="text-sm text-gray-400 dark:text-gray-500">
                      Tap start
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Cycle counter */}
      {isRunning && (
        <div className="text-center text-xs text-gray-400 dark:text-gray-500 mb-4">
          Cycle {Math.min(currentCycle + 1, config.cycles)} of {config.cycles}
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-3">
        {isComplete ? (
          <button
            type="button"
            onClick={reset}
            className="px-6 py-2.5 bg-emerald-600 dark:bg-emerald-500 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors"
          >
            Done
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className="px-6 py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors flex items-center gap-2"
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
        )}
        {isRunning && !isComplete && (
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 font-bold text-sm rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default BreathingExercise;
