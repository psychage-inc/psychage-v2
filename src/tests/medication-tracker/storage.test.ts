import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  loadData,
  saveMedication,
  updateMedication,
  deleteMedication,
  logDose,
  logSideEffect,
  deleteDoseLog,
  deleteSideEffect,
  getAdherenceStats,
  getOverallAdherence,
  getTodaySchedule,
  buildSummaryText,
  clearAllData,
  updatePreferences,
} from '@/components/tools/MedicationTracker/storage';
import type { MedicationFrequency } from '@/components/tools/MedicationTracker/types';

function makeTestMed(overrides: Record<string, unknown> = {}) {
  return {
    name: (overrides.name as string) ?? 'Sertraline',
    dosage: (overrides.dosage as string) ?? '50',
    unit: (overrides.unit as string) ?? 'mg',
    frequency: (overrides.frequency as MedicationFrequency) ?? 'once-daily',
    timesOfDay: (overrides.timesOfDay as string[]) ?? ['08:00'],
    startDate: (overrides.startDate as string) ?? '2026-01-01',
    color: (overrides.color as string) ?? '#3B82F6',
    isActive: (overrides.isActive as boolean) ?? true,
    ...(overrides.prescriber ? { prescriber: overrides.prescriber as string } : {}),
    ...(overrides.pharmacy ? { pharmacy: overrides.pharmacy as string } : {}),
    ...(overrides.notes ? { notes: overrides.notes as string } : {}),
  };
}

describe('Medication Tracker — Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // ── loadData ─────────────────────────────────────────────────────────

  describe('loadData', () => {
    it('returns default data when storage is empty', () => {
      const data = loadData();
      expect(data.version).toBe(1);
      expect(data.medications).toEqual([]);
      expect(data.doseLog).toEqual([]);
      expect(data.sideEffectLog).toEqual([]);
      expect(data.preferences.refillAlertDays).toBe(7);
      expect(data.preferences.showInactiveMeds).toBe(false);
    });

    it('handles invalid JSON gracefully', () => {
      localStorage.setItem('psychage_medication_tracker_v1', '{bad json');
      const data = loadData();
      expect(data.version).toBe(1);
      expect(data.medications).toEqual([]);
    });

    it('merges with defaults when stored data is partial', () => {
      localStorage.setItem(
        'psychage_medication_tracker_v1',
        JSON.stringify({ version: 1, medications: [{ id: 'test' }] })
      );
      const data = loadData();
      expect(data.medications).toHaveLength(1);
      expect(data.doseLog).toEqual([]);
      expect(data.preferences.refillAlertDays).toBe(7);
    });
  });

  // ── Medication CRUD ──────────────────────────────────────────────────

  describe('saveMedication', () => {
    it('adds a medication with generated id and timestamps', () => {
      const data = saveMedication(makeTestMed());
      expect(data.medications).toHaveLength(1);
      expect(data.medications[0].name).toBe('Sertraline');
      expect(data.medications[0].id).toBeTruthy();
      expect(data.medications[0].createdAt).toBeTruthy();
      expect(data.medications[0].updatedAt).toBeTruthy();
    });

    it('persists to localStorage', () => {
      saveMedication(makeTestMed());
      const loaded = loadData();
      expect(loaded.medications).toHaveLength(1);
    });

    it('prepends new medications (newest first)', () => {
      saveMedication(makeTestMed({ name: 'First' }));
      const data = saveMedication(makeTestMed({ name: 'Second' }));
      expect(data.medications[0].name).toBe('Second');
      expect(data.medications[1].name).toBe('First');
    });
  });

  describe('updateMedication', () => {
    it('updates fields correctly', () => {
      const initial = saveMedication(makeTestMed());
      const medId = initial.medications[0].id;

      const data = updateMedication(medId, { dosage: '100', notes: 'increased dose' });
      expect(data.medications[0].dosage).toBe('100');
      expect(data.medications[0].notes).toBe('increased dose');
      expect(data.medications[0].name).toBe('Sertraline'); // unchanged
    });

    it('returns unchanged data for non-existent id', () => {
      saveMedication(makeTestMed());
      const data = updateMedication('non-existent', { dosage: '100' });
      expect(data.medications[0].dosage).toBe('50');
    });
  });

  describe('deleteMedication', () => {
    it('removes medication and its associated logs', () => {
      const initial = saveMedication(makeTestMed());
      const medId = initial.medications[0].id;

      // Add a dose log for this medication
      logDose({
        medicationId: medId,
        scheduledTime: '2026-03-20T08:00:00',
        status: 'taken',
        takenAt: '2026-03-20T08:05:00',
      });

      // Add a side effect for this medication
      logSideEffect({
        medicationId: medId,
        date: '2026-03-20',
        effect: 'Nausea',
        severity: 2,
      });

      const data = deleteMedication(medId);
      expect(data.medications).toHaveLength(0);
      expect(data.doseLog).toHaveLength(0);
      expect(data.sideEffectLog).toHaveLength(0);
    });
  });

  // ── Dose log CRUD ────────────────────────────────────────────────────

  describe('logDose', () => {
    it('adds a dose log entry', () => {
      const data = logDose({
        medicationId: 'med-1',
        scheduledTime: '2026-03-20T08:00:00',
        status: 'taken',
        takenAt: '2026-03-20T08:05:00',
      });
      expect(data.doseLog).toHaveLength(1);
      expect(data.doseLog[0].status).toBe('taken');
      expect(data.doseLog[0].id).toBeTruthy();
    });

    it('replaces existing log for same medication + scheduled time', () => {
      logDose({
        medicationId: 'med-1',
        scheduledTime: '2026-03-20T08:00:00',
        status: 'skipped',
      });
      const data = logDose({
        medicationId: 'med-1',
        scheduledTime: '2026-03-20T08:00:00',
        status: 'taken',
        takenAt: '2026-03-20T08:10:00',
      });
      expect(data.doseLog).toHaveLength(1);
      expect(data.doseLog[0].status).toBe('taken');
    });
  });

  describe('deleteDoseLog', () => {
    it('removes a specific dose log', () => {
      const initial = logDose({
        medicationId: 'med-1',
        scheduledTime: '2026-03-20T08:00:00',
        status: 'taken',
      });
      const logId = initial.doseLog[0].id;
      const data = deleteDoseLog(logId);
      expect(data.doseLog).toHaveLength(0);
    });
  });

  // ── Side-effect CRUD ─────────────────────────────────────────────────

  describe('logSideEffect', () => {
    it('adds a side effect entry', () => {
      const data = logSideEffect({
        medicationId: 'med-1',
        date: '2026-03-20',
        effect: 'Nausea',
        severity: 3,
        notes: 'After breakfast',
      });
      expect(data.sideEffectLog).toHaveLength(1);
      expect(data.sideEffectLog[0].effect).toBe('Nausea');
      expect(data.sideEffectLog[0].severity).toBe(3);
    });
  });

  describe('deleteSideEffect', () => {
    it('removes a specific side effect', () => {
      const initial = logSideEffect({
        medicationId: 'med-1',
        date: '2026-03-20',
        effect: 'Headache',
        severity: 2,
      });
      const seId = initial.sideEffectLog[0].id;
      const data = deleteSideEffect(seId);
      expect(data.sideEffectLog).toHaveLength(0);
    });
  });

  // ── Adherence stats ──────────────────────────────────────────────────

  describe('getAdherenceStats', () => {
    it('returns 0% when no logs exist', () => {
      const initial = saveMedication(makeTestMed());
      const medId = initial.medications[0].id;
      const stats = getAdherenceStats(initial, medId, 7);
      expect(stats.percentage).toBe(0);
      expect(stats.total).toBe(0);
      expect(stats.currentStreak).toBe(0);
    });

    it('calculates correct percentage', () => {
      const initial = saveMedication(makeTestMed());
      const medId = initial.medications[0].id;
      const today = new Date().toISOString().slice(0, 10);

      logDose({ medicationId: medId, scheduledTime: `${today}T08:00:00`, status: 'taken' });

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);
      logDose({ medicationId: medId, scheduledTime: `${yesterdayStr}T08:00:00`, status: 'missed' });

      const data = loadData();
      const stats = getAdherenceStats(data, medId, 7);
      expect(stats.total).toBe(2);
      expect(stats.taken).toBe(1);
      expect(stats.missed).toBe(1);
      expect(stats.percentage).toBe(50);
    });

    it('calculates streak — breaks when no prior logs', () => {
      const initial = saveMedication(makeTestMed());
      const medId = initial.medications[0].id;

      // Log taken for today only — streak should be 1
      const today = new Date().toISOString().slice(0, 10);
      logDose({ medicationId: medId, scheduledTime: `${today}T08:00:00`, status: 'taken' });

      const data = loadData();
      const stats = getAdherenceStats(data, medId, 7);
      expect(stats.currentStreak).toBe(1);
    });
  });

  describe('getOverallAdherence', () => {
    it('returns 0% with no active medications', () => {
      const data = loadData();
      const stats = getOverallAdherence(data, 7);
      expect(stats.percentage).toBe(0);
    });
  });

  // ── Today schedule ───────────────────────────────────────────────────

  describe('getTodaySchedule', () => {
    it('returns empty for no medications', () => {
      const data = loadData();
      const schedule = getTodaySchedule(data);
      expect(schedule).toHaveLength(0);
    });

    it('returns schedule for active daily medication', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 7);
      const initial = saveMedication(
        makeTestMed({
          startDate: pastDate.toISOString().slice(0, 10),
          timesOfDay: ['08:00', '20:00'],
          frequency: 'twice-daily',
        })
      );
      const schedule = getTodaySchedule(initial);
      expect(schedule).toHaveLength(2);
      expect(schedule[0].scheduledTime).toBe('08:00');
      expect(schedule[1].scheduledTime).toBe('20:00');
    });

    it('excludes inactive medications', () => {
      const initial = saveMedication(
        makeTestMed({ isActive: false, startDate: '2026-01-01' })
      );
      const schedule = getTodaySchedule(initial);
      expect(schedule).toHaveLength(0);
    });

    it('excludes as-needed medications', () => {
      const initial = saveMedication(
        makeTestMed({ frequency: 'as-needed', startDate: '2026-01-01' })
      );
      const schedule = getTodaySchedule(initial);
      expect(schedule).toHaveLength(0);
    });

    it('excludes medications that have not started yet', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      const initial = saveMedication(
        makeTestMed({ startDate: futureDate.toISOString().slice(0, 10) })
      );
      const schedule = getTodaySchedule(initial);
      expect(schedule).toHaveLength(0);
    });
  });

  // ── Preferences ──────────────────────────────────────────────────────

  describe('updatePreferences', () => {
    it('merges preference updates', () => {
      const data = updatePreferences({ refillAlertDays: 14 });
      expect(data.preferences.refillAlertDays).toBe(14);
      expect(data.preferences.showInactiveMeds).toBe(false); // unchanged
    });
  });

  // ── Export ───────────────────────────────────────────────────────────

  describe('buildSummaryText', () => {
    it('generates summary for empty data', () => {
      const data = loadData();
      const text = buildSummaryText(data);
      expect(text).toContain('No active medications');
      expect(text).toContain('Psychage');
    });

    it('includes active medication details', () => {
      const data = saveMedication(
        makeTestMed({ name: 'Lexapro', dosage: '10', prescriber: 'Dr. Smith' })
      );
      const text = buildSummaryText(data);
      expect(text).toContain('Lexapro');
      expect(text).toContain('10 mg');
      expect(text).toContain('Dr. Smith');
    });
  });

  // ── Clear ────────────────────────────────────────────────────────────

  describe('clearAllData', () => {
    it('removes all data from localStorage', () => {
      saveMedication(makeTestMed());
      clearAllData();
      const data = loadData();
      expect(data.medications).toHaveLength(0);
    });
  });
});
