/**
 * Brain Dump — Pre-sleep free-text journaling with crisis detection.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Clock, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { detectCrisisContent } from '@/lib/sleep/calculations';
import CrisisAlert from '../shared/CrisisAlert';

const BrainDump: React.FC = () => {
  const [text, setText] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [isActive, setIsActive] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Crisis detection on text change
  useEffect(() => {
    if (text.length > 10) {
      setShowCrisis(detectCrisisContent(text));
    }
  }, [text]);

  // Timer
  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeLeft <= 0 && isActive) {
        setIsDone(true);
        setIsActive(false);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, timeLeft]);

  const formatTimer = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleDone = () => {
    // Save to localStorage linked to tonight
    const today = new Date().toISOString().split('T')[0];
    try {
      localStorage.setItem(
        `psychage_brain_dump_${today}`,
        JSON.stringify({ text, timestamp: new Date().toISOString() })
      );
    } catch { /* ignore */ }
    setIsDone(true);
    setIsActive(false);
  };

  if (isDone) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-neutral-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-neutral-700 text-center"
      >
        <Check size={32} className="text-emerald-500 mx-auto mb-3" />
        <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-2">
          Thoughts captured
        </h3>
        <p className="text-sm text-gray-500 dark:text-neutral-400 max-w-sm mx-auto">
          Now close this screen and let go of these thoughts. They'll be here
          tomorrow if you need them.
        </p>
        <button
          type="button"
          onClick={() => {
            setText('');
            setTimeLeft(180);
            setIsDone(false);
            setShowCrisis(false);
          }}
          className="mt-4 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Start another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-neutral-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Pencil size={20} className="text-violet-500" />
          <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
            Brain Dump
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-neutral-500">
          <Clock size={14} />
          {formatTimer(timeLeft)}
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-neutral-400 mb-4">
        Write down everything on your mind right now. Don't organize — just dump.
        The timer is a suggestion, not a deadline.
      </p>

      {showCrisis && (
        <div className="mb-4">
          <CrisisAlert onDismiss={() => setShowCrisis(false)} />
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (!isActive && e.target.value.length > 0) {
            setIsActive(true);
          }
        }}
        placeholder="What's on your mind tonight..."
        aria-label="Brain dump — write what's on your mind"
        className="w-full p-4 rounded-xl border border-gray-200 dark:border-neutral-600 bg-gray-50 dark:bg-neutral-700/50 text-gray-900 dark:text-white text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none h-40 leading-relaxed"
        autoFocus
      />

      <div className="flex justify-end mt-3">
        <button
          type="button"
          onClick={handleDone}
          disabled={text.trim().length === 0}
          className={cn(
            'px-5 py-2 rounded-xl text-sm font-bold transition-colors',
            text.trim().length > 0
              ? 'bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white'
              : 'bg-gray-200 dark:bg-neutral-700 text-gray-400 dark:text-neutral-500 cursor-not-allowed'
          )}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default BrainDump;
