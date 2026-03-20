import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadJournal,
  saveJournal,
  addDailyCheckIn,
  getDailyCheckIn,
  addWeeklyScreening,
  addBehavioralActivation,
  deleteBehavioralActivation,
  addTriggerLogItem,
  updateTriggerLogItem,
  deleteTriggerLogItem,
  addWellnessToolboxItem,
  deleteWellnessToolboxItem,
  saveSafetyPlan,
  addWeeklyReflection,
  updatePreferences,
  clearAllJournalData,
} from '@/components/tools/ClarityJournal/storage';
import type { DailyCheckIn, WeeklyScreening, BehavioralActivationEntry, TriggerLogItem, WellnessToolboxItem } from '@/components/tools/ClarityJournal/types';

describe('Clarity Journal — Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('loadJournal / saveJournal', () => {
    it('returns default data when empty', () => {
      const data = loadJournal();
      expect(data.version).toBe(2);
      expect(data.dailyCheckIns).toEqual([]);
      expect(data.preferences.firstVisitCompleted).toBe(false);
    });

    it('round-trips data correctly', () => {
      const data = loadJournal();
      data.dailyCheckIns.push({
        id: 'test-1',
        date: '2026-03-06',
        mood: 7,
        sleepHours: 8,
        sleepQuality: 'good',
        energy: 6,
        oneSentence: 'Good day',
        tags: ['productive'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      saveJournal(data);
      const loaded = loadJournal();
      expect(loaded.dailyCheckIns).toHaveLength(1);
      expect(loaded.dailyCheckIns[0].mood).toBe(7);
    });

    it('returns default data for invalid JSON', () => {
      localStorage.setItem('psychage_clarity_journal_v2', 'not-json');
      const data = loadJournal();
      expect(data.version).toBe(2);
      expect(data.dailyCheckIns).toEqual([]);
    });

    it('returns default data for wrong version', () => {
      localStorage.setItem('psychage_clarity_journal_v2', JSON.stringify({ version: 99 }));
      const data = loadJournal();
      expect(data.version).toBe(2);
    });

    it('includes default 988 safety plan entry', () => {
      const data = loadJournal();
      const section4 = data.safetyPlan.find(s => s.sectionNumber === 4);
      expect(section4?.items).toHaveLength(1);
      expect(section4?.items[0].contactPhone).toBe('988');
    });
  });

  describe('addDailyCheckIn', () => {
    const makeCheckIn = (date: string, mood: number): DailyCheckIn => ({
      id: `ci-${date}`,
      date,
      mood,
      sleepHours: 7,
      sleepQuality: 'good',
      energy: 5,
      oneSentence: '',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    it('adds a new check-in', () => {
      addDailyCheckIn(makeCheckIn('2026-03-06', 7));
      expect(loadJournal().dailyCheckIns).toHaveLength(1);
    });

    it('replaces existing entry for same date', () => {
      addDailyCheckIn(makeCheckIn('2026-03-06', 5));
      addDailyCheckIn(makeCheckIn('2026-03-06', 8));
      const data = loadJournal();
      expect(data.dailyCheckIns).toHaveLength(1);
      expect(data.dailyCheckIns[0].mood).toBe(8);
    });

    it('keeps entries for different dates', () => {
      addDailyCheckIn(makeCheckIn('2026-03-05', 5));
      addDailyCheckIn(makeCheckIn('2026-03-06', 7));
      expect(loadJournal().dailyCheckIns).toHaveLength(2);
    });
  });

  describe('getDailyCheckIn', () => {
    it('returns undefined for missing date', () => {
      expect(getDailyCheckIn('2026-03-06')).toBeUndefined();
    });

    it('returns the entry for a given date', () => {
      addDailyCheckIn({
        id: 'test',
        date: '2026-03-06',
        mood: 7,
        sleepHours: 8,
        sleepQuality: 'good',
        energy: 6,
        oneSentence: '',
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      const result = getDailyCheckIn('2026-03-06');
      expect(result?.mood).toBe(7);
    });
  });

  describe('addWeeklyScreening', () => {
    const makeScreening = (weekStart: string): WeeklyScreening => ({
      id: `ws-${weekStart}`,
      weekStartDate: weekStart,
      phq2: { q1: 1, q2: 1, total: 2 },
      gad2: { q1: 0, q2: 1, total: 1 },
      pss4: { q1: 2, q2: 2, total: 4 },
      who5: { q1: 3, q2: 3, total: 6 },
      createdAt: new Date().toISOString(),
    });

    it('adds a screening', () => {
      addWeeklyScreening(makeScreening('2026-03-02'));
      expect(loadJournal().weeklyScreenings).toHaveLength(1);
    });

    it('replaces screening for same week', () => {
      addWeeklyScreening(makeScreening('2026-03-02'));
      const updated = makeScreening('2026-03-02');
      updated.phq2.total = 5;
      addWeeklyScreening(updated);
      const data = loadJournal();
      expect(data.weeklyScreenings).toHaveLength(1);
      expect(data.weeklyScreenings[0].phq2.total).toBe(5);
    });
  });

  describe('behavioral activation CRUD', () => {
    const makeEntry = (id: string): BehavioralActivationEntry => ({
      id,
      date: '2026-03-06',
      activity: 'Walk',
      predictedMood: 5,
      actualMood: 7,
      type: 'pleasure',
      createdAt: new Date().toISOString(),
    });

    it('adds and deletes entries', () => {
      addBehavioralActivation(makeEntry('ba-1'));
      addBehavioralActivation(makeEntry('ba-2'));
      expect(loadJournal().behavioralActivation).toHaveLength(2);

      deleteBehavioralActivation('ba-1');
      const remaining = loadJournal().behavioralActivation;
      expect(remaining).toHaveLength(1);
      expect(remaining[0].id).toBe('ba-2');
    });
  });

  describe('trigger log CRUD', () => {
    const makeTrigger = (id: string): TriggerLogItem => ({
      id,
      category: 'triggers',
      text: 'Loud noise',
      sortOrder: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    it('adds, updates, and deletes items', () => {
      addTriggerLogItem(makeTrigger('tl-1'));
      expect(loadJournal().triggerLog).toHaveLength(1);

      updateTriggerLogItem({ ...makeTrigger('tl-1'), text: 'Updated trigger' });
      expect(loadJournal().triggerLog[0].text).toBe('Updated trigger');

      deleteTriggerLogItem('tl-1');
      expect(loadJournal().triggerLog).toHaveLength(0);
    });
  });

  describe('wellness toolbox CRUD', () => {
    const makeItem = (id: string): WellnessToolboxItem => ({
      id,
      category: 'physical',
      text: 'Go for a walk',
      sortOrder: 0,
    });

    it('adds and deletes items', () => {
      addWellnessToolboxItem(makeItem('wt-1'));
      expect(loadJournal().wellnessToolbox).toHaveLength(1);

      deleteWellnessToolboxItem('wt-1');
      expect(loadJournal().wellnessToolbox).toHaveLength(0);
    });
  });

  describe('saveSafetyPlan', () => {
    it('saves custom safety plan', () => {
      const customPlan = [
        { sectionNumber: 1 as const, items: [{ id: 'sp-1', text: 'Warning sign' }] },
        { sectionNumber: 2 as const, items: [] },
        { sectionNumber: 3 as const, items: [] },
        { sectionNumber: 4 as const, items: [] },
        { sectionNumber: 5 as const, items: [] },
        { sectionNumber: 6 as const, items: [] },
      ];
      saveSafetyPlan(customPlan);
      const data = loadJournal();
      expect(data.safetyPlan[0].items).toHaveLength(1);
      expect(data.safetyPlan[0].items[0].text).toBe('Warning sign');
    });
  });

  describe('addWeeklyReflection', () => {
    it('adds and replaces by week', () => {
      addWeeklyReflection({
        id: 'wr-1',
        weekStartDate: '2026-03-02',
        wentWell: 'Exercise',
        wasDifficult: 'Work stress',
        patterns: '',
        doNext: '',
        gratitude: '',
        createdAt: new Date().toISOString(),
      });
      expect(loadJournal().weeklyReflections).toHaveLength(1);

      addWeeklyReflection({
        id: 'wr-2',
        weekStartDate: '2026-03-02',
        wentWell: 'Updated',
        wasDifficult: '',
        patterns: '',
        doNext: '',
        gratitude: '',
        createdAt: new Date().toISOString(),
      });
      const data = loadJournal();
      expect(data.weeklyReflections).toHaveLength(1);
      expect(data.weeklyReflections[0].wentWell).toBe('Updated');
    });
  });

  describe('updatePreferences', () => {
    it('partially updates preferences', () => {
      updatePreferences({ firstVisitCompleted: true });
      const data = loadJournal();
      expect(data.preferences.firstVisitCompleted).toBe(true);
      expect(data.preferences.privacyNoticeDismissed).toBe(false);
    });
  });

  describe('clearAllJournalData', () => {
    it('removes all data', () => {
      addDailyCheckIn({
        id: 'test',
        date: '2026-03-06',
        mood: 7,
        sleepHours: 8,
        sleepQuality: 'good',
        energy: 6,
        oneSentence: '',
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      clearAllJournalData();
      const data = loadJournal();
      expect(data.dailyCheckIns).toEqual([]);
    });
  });
});
