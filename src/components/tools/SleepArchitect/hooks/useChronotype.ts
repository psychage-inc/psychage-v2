/**
 * Chronotype Quiz Hook — Manages quiz state and computes result
 */

import { useState, useCallback, useEffect } from 'react';
import type { ChronotypeResult } from '@/lib/sleep/types';
import { scoreChronotype } from '@/lib/sleep/chronotype';
import { CHRONOTYPE_QUESTIONS } from '@/lib/sleep/constants';

const STORAGE_KEY = 'psychage_sleep_chronotype';

export function useChronotype() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(CHRONOTYPE_QUESTIONS.length).fill(null)
  );
  const [result, setResult] = useState<ChronotypeResult | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as ChronotypeResult) : null;
    } catch {
      return null;
    }
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const setAnswer = useCallback((questionIndex: number, value: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = value;
      return next;
    });
  }, []);

  const isComplete = answers.every((a) => a !== null);

  const submit = useCallback(() => {
    if (!isComplete) return null;
    const r = scoreChronotype(answers as number[]);
    setResult(r);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
    } catch { /* ignore */ }
    return r;
  }, [answers, isComplete]);

  const reset = useCallback(() => {
    setAnswers(new Array(CHRONOTYPE_QUESTIONS.length).fill(null));
    setResult(null);
    setCurrentQuestion(0);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
  }, []);

  const goNext = useCallback(() => {
    if (currentQuestion < CHRONOTYPE_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }, [currentQuestion]);

  const goPrev = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  return {
    questions: CHRONOTYPE_QUESTIONS,
    answers,
    setAnswer,
    currentQuestion,
    setCurrentQuestion,
    goNext,
    goPrev,
    isComplete,
    submit,
    result,
    reset,
  };
}
