 
import { describe, it, expect } from 'vitest';
import {
  scorePHQ2,
  scoreGAD2,
  scorePSS4,
  scoreWHO5,
  classifyPHQ2,
  classifyGAD2,
  classifyPSS4,
  classifyWHO5,
  getScoreColor,
  getScoreLabel,
} from '@/components/tools/ClarityJournal/scoring';

describe('Clarity Journal — Scoring', () => {
  // ── PHQ-2 ──
  describe('scorePHQ2', () => {
    it('sums two items correctly', () => {
      expect(scorePHQ2(0, 0)).toBe(0);
      expect(scorePHQ2(3, 3)).toBe(6);
      expect(scorePHQ2(1, 2)).toBe(3);
    });

    it('clamps to 0-6 range', () => {
      expect(scorePHQ2(-1, 0)).toBe(0);
      expect(scorePHQ2(4, 4)).toBe(6);
    });
  });

  describe('classifyPHQ2', () => {
    it('returns low for 0-2', () => {
      expect(classifyPHQ2(0)).toBe('low');
      expect(classifyPHQ2(2)).toBe('low');
    });
    it('returns moderate for 3-4', () => {
      expect(classifyPHQ2(3)).toBe('moderate');
      expect(classifyPHQ2(4)).toBe('moderate');
    });
    it('returns elevated for 5+', () => {
      expect(classifyPHQ2(5)).toBe('elevated');
      expect(classifyPHQ2(6)).toBe('elevated');
    });
  });

  // ── GAD-2 ──
  describe('scoreGAD2', () => {
    it('sums two items correctly', () => {
      expect(scoreGAD2(0, 0)).toBe(0);
      expect(scoreGAD2(3, 3)).toBe(6);
      expect(scoreGAD2(2, 1)).toBe(3);
    });
  });

  describe('classifyGAD2', () => {
    it('returns low for 0-2', () => {
      expect(classifyGAD2(0)).toBe('low');
      expect(classifyGAD2(2)).toBe('low');
    });
    it('returns moderate for 3', () => {
      expect(classifyGAD2(3)).toBe('moderate');
    });
    it('returns elevated for 4+', () => {
      expect(classifyGAD2(5)).toBe('elevated');
    });
  });

  // ── PSS-4 (reverse scoring) ──
  describe('scorePSS4', () => {
    it('applies reverse scoring on q2', () => {
      // q1=0, q2=4 (confident) → 0 + (4-4) = 0
      expect(scorePSS4(0, 4)).toBe(0);
      // q1=4, q2=0 (not confident) → 4 + (4-0) = 8
      expect(scorePSS4(4, 0)).toBe(8);
      // q1=2, q2=2 → 2 + (4-2) = 4
      expect(scorePSS4(2, 2)).toBe(4);
    });

    it('clamps to 0-8 range', () => {
      expect(scorePSS4(0, 5)).toBe(0); // would be -1 without clamp
    });
  });

  describe('classifyPSS4', () => {
    it('returns low for 0-3', () => {
      expect(classifyPSS4(0)).toBe('low');
      expect(classifyPSS4(3)).toBe('low');
    });
    it('returns moderate for 4-5', () => {
      expect(classifyPSS4(4)).toBe('moderate');
      expect(classifyPSS4(5)).toBe('moderate');
    });
    it('returns elevated for 6+', () => {
      expect(classifyPSS4(6)).toBe('elevated');
      expect(classifyPSS4(8)).toBe('elevated');
    });
  });

  // ── WHO-5 (inverted — higher is better) ──
  describe('scoreWHO5', () => {
    it('sums two items correctly', () => {
      expect(scoreWHO5(0, 0)).toBe(0);
      expect(scoreWHO5(5, 5)).toBe(10);
      expect(scoreWHO5(3, 2)).toBe(5);
    });
  });

  describe('classifyWHO5', () => {
    it('returns low (good wellbeing) for 7+', () => {
      expect(classifyWHO5(7)).toBe('low');
      expect(classifyWHO5(10)).toBe('low');
    });
    it('returns moderate for 4-6', () => {
      expect(classifyWHO5(4)).toBe('moderate');
      expect(classifyWHO5(6)).toBe('moderate');
    });
    it('returns elevated (poor wellbeing) for 0-3', () => {
      expect(classifyWHO5(0)).toBe('elevated');
      expect(classifyWHO5(3)).toBe('elevated');
    });
  });

  // ── Display helpers ──
  describe('getScoreColor', () => {
    it('returns green classes for low', () => {
      expect(getScoreColor('low')).toContain('green');
    });
    it('returns amber classes for moderate', () => {
      expect(getScoreColor('moderate')).toContain('amber');
    });
    it('returns red classes for elevated', () => {
      expect(getScoreColor('elevated')).toContain('red');
    });
  });

  describe('getScoreLabel', () => {
    it('returns "Low concern" for low', () => {
      expect(getScoreLabel('low')).toBe('Low concern');
    });
    it('returns "Moderate" for moderate', () => {
      expect(getScoreLabel('moderate')).toBe('Moderate');
    });
    it('returns "Elevated" for elevated', () => {
      expect(getScoreLabel('elevated')).toBe('Elevated');
    });
  });
});
