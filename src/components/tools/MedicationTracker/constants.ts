import type { MedicationFrequency } from './types';

// ── ID generation ────────────────────────────────────────────────────────────

export function generateId(): string {
  return crypto.randomUUID();
}

// ── Dosage units ─────────────────────────────────────────────────────────────

export const DOSAGE_UNITS = [
  'mg',
  'ml',
  'mcg',
  'g',
  'IU',
  'tablets',
  'capsules',
  'drops',
  'patches',
  'puffs',
  'units',
] as const;

// ── Frequency labels ─────────────────────────────────────────────────────────

export const FREQUENCY_LABELS: Record<MedicationFrequency, string> = {
  'once-daily': 'Once daily',
  'twice-daily': 'Twice daily',
  'three-times': '3 times daily',
  'four-times': '4 times daily',
  'weekly': 'Weekly',
  'biweekly': 'Every 2 weeks',
  'monthly': 'Monthly',
  'as-needed': 'As needed',
};

export const FREQUENCY_DOSE_COUNTS: Record<MedicationFrequency, number> = {
  'once-daily': 1,
  'twice-daily': 2,
  'three-times': 3,
  'four-times': 4,
  'weekly': 1,
  'biweekly': 1,
  'monthly': 1,
  'as-needed': 0,
};

// ── Default times for each frequency ─────────────────────────────────────────

export const DEFAULT_TIMES: Record<MedicationFrequency, string[]> = {
  'once-daily': ['08:00'],
  'twice-daily': ['08:00', '20:00'],
  'three-times': ['08:00', '14:00', '20:00'],
  'four-times': ['08:00', '12:00', '16:00', '20:00'],
  'weekly': ['08:00'],
  'biweekly': ['08:00'],
  'monthly': ['08:00'],
  'as-needed': [],
};

// ── Color palette for medication cards ───────────────────────────────────────

export const MEDICATION_COLORS = [
  { key: 'blue', hex: '#3B82F6', label: 'Blue' },
  { key: 'emerald', hex: '#10B981', label: 'Green' },
  { key: 'amber', hex: '#F59E0B', label: 'Amber' },
  { key: 'rose', hex: '#F43F5E', label: 'Rose' },
  { key: 'violet', hex: '#8B5CF6', label: 'Violet' },
  { key: 'cyan', hex: '#06B6D4', label: 'Cyan' },
  { key: 'orange', hex: '#F97316', label: 'Orange' },
  { key: 'pink', hex: '#EC4899', label: 'Pink' },
] as const;

// ── Common side effects ──────────────────────────────────────────────────────

export const COMMON_SIDE_EFFECTS = [
  'Nausea',
  'Headache',
  'Dizziness',
  'Fatigue',
  'Drowsiness',
  'Insomnia',
  'Dry mouth',
  'Weight gain',
  'Weight loss',
  'Appetite changes',
  'Constipation',
  'Diarrhea',
  'Blurred vision',
  'Tremor',
  'Sweating',
  'Anxiety',
  'Restlessness',
  'Brain fog',
  'Muscle aches',
  'Stomach pain',
] as const;

export const SEVERITY_LABELS: Record<number, string> = {
  1: 'Minimal',
  2: 'Mild',
  3: 'Moderate',
  4: 'Severe',
  5: 'Very severe',
};

// ── Today helper ─────────────────────────────────────────────────────────────

export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function nowISO(): string {
  return new Date().toISOString();
}
