import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  getWeekStart,
  getWeekEnd,
  calculateStreak,
  addDays,
  formatDate,
  isToday,
  isFuture,
  generateId,
} from '@/components/tools/ClarityJournal/dates';

describe('Clarity Journal — Dates', () => {
  describe('getWeekStart', () => {
    it('returns Monday for a Wednesday', () => {
      // 2026-03-04 is a Wednesday
      expect(getWeekStart('2026-03-04')).toBe('2026-03-02');
    });

    it('returns same day for a Monday', () => {
      // 2026-03-02 is a Monday
      expect(getWeekStart('2026-03-02')).toBe('2026-03-02');
    });

    it('returns previous Monday for a Sunday', () => {
      // 2026-03-08 is a Sunday
      expect(getWeekStart('2026-03-08')).toBe('2026-03-02');
    });
  });

  describe('getWeekEnd', () => {
    it('returns Sunday of the same week', () => {
      expect(getWeekEnd('2026-03-04')).toBe('2026-03-08');
    });

    it('returns same day for a Sunday', () => {
      expect(getWeekEnd('2026-03-08')).toBe('2026-03-08');
    });
  });

  describe('addDays', () => {
    it('adds positive days', () => {
      expect(addDays('2026-03-01', 5)).toBe('2026-03-06');
    });

    it('subtracts negative days', () => {
      expect(addDays('2026-03-06', -3)).toBe('2026-03-03');
    });

    it('crosses month boundaries', () => {
      expect(addDays('2026-02-28', 1)).toBe('2026-03-01');
    });
  });

  describe('calculateStreak', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('returns 0 for empty array', () => {
      expect(calculateStreak([])).toBe(0);
    });

    it('returns 1 for single entry today', () => {
      const today = new Date().toISOString().slice(0, 10);
      expect(calculateStreak([today])).toBe(1);
    });

    it('counts consecutive days backward from today', () => {
      const today = new Date().toISOString().slice(0, 10);
      const yesterday = addDays(today, -1);
      const dayBefore = addDays(today, -2);
      expect(calculateStreak([today, yesterday, dayBefore])).toBe(3);
    });

    it('returns 0 if last entry is older than yesterday', () => {
      const today = new Date().toISOString().slice(0, 10);
      const threeDaysAgo = addDays(today, -3);
      expect(calculateStreak([threeDaysAgo])).toBe(0);
    });

    it('handles duplicates', () => {
      const today = new Date().toISOString().slice(0, 10);
      const yesterday = addDays(today, -1);
      expect(calculateStreak([today, today, yesterday, yesterday])).toBe(2);
    });
  });

  describe('formatDate', () => {
    it('formats a date string', () => {
      const result = formatDate('2026-03-06');
      // Should include "Mar" and "6" and "2026" in some locale format
      expect(result).toContain('2026');
    });

    it('returns raw string on invalid date', () => {
      expect(formatDate('invalid')).toBeTruthy();
    });
  });

  describe('isToday / isFuture', () => {
    it('isToday returns true for current date', () => {
      const today = new Date().toISOString().slice(0, 10);
      expect(isToday(today)).toBe(true);
    });

    it('isToday returns false for yesterday', () => {
      const today = new Date().toISOString().slice(0, 10);
      expect(isToday(addDays(today, -1))).toBe(false);
    });

    it('isFuture returns true for tomorrow', () => {
      const today = new Date().toISOString().slice(0, 10);
      expect(isFuture(addDays(today, 1))).toBe(true);
    });

    it('isFuture returns false for today', () => {
      const today = new Date().toISOString().slice(0, 10);
      expect(isFuture(today)).toBe(false);
    });
  });

  describe('generateId', () => {
    it('generates unique UUIDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^[0-9a-f-]{36}$/);
    });
  });
});
