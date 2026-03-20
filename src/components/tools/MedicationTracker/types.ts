// ── Frequency ────────────────────────────────────────────────────────────────

export type MedicationFrequency =
  | 'once-daily'
  | 'twice-daily'
  | 'three-times'
  | 'four-times'
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'as-needed';

// ── Dose status ──────────────────────────────────────────────────────────────

export type DoseStatus = 'taken' | 'skipped' | 'missed';

// ── Side-effect severity ─────────────────────────────────────────────────────

export type SideEffectSeverity = 1 | 2 | 3 | 4 | 5;

// ── Medication ───────────────────────────────────────────────────────────────

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  unit: string;
  frequency: MedicationFrequency;
  timesOfDay: string[]; // HH:MM
  startDate: string; // YYYY-MM-DD
  endDate?: string;
  prescriber?: string;
  pharmacy?: string;
  supplyCount?: number;
  refillDate?: string; // YYYY-MM-DD
  notes?: string;
  color: string; // hex or palette key
  isActive: boolean;
  createdAt: string; // ISO 8601
  updatedAt: string;
}

// ── Dose log ─────────────────────────────────────────────────────────────────

export interface DoseLogEntry {
  id: string;
  medicationId: string;
  scheduledTime: string; // ISO 8601 (date + time combined)
  status: DoseStatus;
  takenAt?: string; // ISO 8601 — actual time dose was taken
  notes?: string;
}

// ── Side-effect log ──────────────────────────────────────────────────────────

export interface SideEffectEntry {
  id: string;
  medicationId: string;
  date: string; // YYYY-MM-DD
  effect: string;
  severity: SideEffectSeverity;
  notes?: string;
}

// ── Preferences ──────────────────────────────────────────────────────────────

export interface TrackerPreferences {
  refillAlertDays: number;
  showInactiveMeds: boolean;
}

// ── Master data structure ────────────────────────────────────────────────────

export interface MedicationTrackerData {
  version: 1;
  medications: Medication[];
  doseLog: DoseLogEntry[];
  sideEffectLog: SideEffectEntry[];
  preferences: TrackerPreferences;
}

// ── Scheduled dose (computed, not persisted) ─────────────────────────────────

export interface ScheduledDose {
  medication: Medication;
  scheduledTime: string; // HH:MM
  scheduledISO: string; // full ISO timestamp for the day
  logged?: DoseLogEntry; // already-logged entry if exists
}

// ── Adherence stats (computed) ───────────────────────────────────────────────

export interface AdherenceStats {
  total: number;
  taken: number;
  skipped: number;
  missed: number;
  percentage: number; // 0–100
  currentStreak: number; // consecutive days with all doses taken
}
