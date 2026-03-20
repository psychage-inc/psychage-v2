import type {
  MedicationTrackerData,
  Medication,
  DoseLogEntry,
  SideEffectEntry,
  ScheduledDose,
  AdherenceStats,
} from './types';
import { generateId, todayStr, nowISO } from './constants';

// ── Storage key ──────────────────────────────────────────────────────────────

const STORAGE_KEY = 'psychage_medication_tracker_v1';

// ── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_DATA: MedicationTrackerData = {
  version: 1,
  medications: [],
  doseLog: [],
  sideEffectLog: [],
  preferences: {
    refillAlertDays: 7,
    showInactiveMeds: false,
  },
};

// ── Core load / save ─────────────────────────────────────────────────────────

export function loadData(): MedicationTrackerData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_DATA);
    const parsed = JSON.parse(raw) as Partial<MedicationTrackerData>;
    return {
      ...structuredClone(DEFAULT_DATA),
      ...parsed,
      preferences: { ...DEFAULT_DATA.preferences, ...(parsed.preferences ?? {}) },
    };
  } catch {
    return structuredClone(DEFAULT_DATA);
  }
}

function persist(data: MedicationTrackerData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Silently ignore (storage full or private browsing)
  }
}

// ── Medication CRUD ──────────────────────────────────────────────────────────

export function saveMedication(
  med: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>
): MedicationTrackerData {
  const data = loadData();
  const now = nowISO();
  const newMed: Medication = {
    ...med,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  data.medications.unshift(newMed);
  persist(data);
  return data;
}

export function updateMedication(
  id: string,
  updates: Partial<Omit<Medication, 'id' | 'createdAt'>>
): MedicationTrackerData {
  const data = loadData();
  const idx = data.medications.findIndex((m) => m.id === id);
  if (idx === -1) return data;
  data.medications[idx] = {
    ...data.medications[idx],
    ...updates,
    updatedAt: nowISO(),
  };
  persist(data);
  return data;
}

export function deleteMedication(id: string): MedicationTrackerData {
  const data = loadData();
  data.medications = data.medications.filter((m) => m.id !== id);
  data.doseLog = data.doseLog.filter((d) => d.medicationId !== id);
  data.sideEffectLog = data.sideEffectLog.filter((s) => s.medicationId !== id);
  persist(data);
  return data;
}

// ── Dose log CRUD ────────────────────────────────────────────────────────────

export function logDose(
  entry: Omit<DoseLogEntry, 'id'>
): MedicationTrackerData {
  const data = loadData();
  // Replace existing log for same medication + scheduled time
  const existing = data.doseLog.findIndex(
    (d) =>
      d.medicationId === entry.medicationId &&
      d.scheduledTime === entry.scheduledTime
  );
  const newEntry: DoseLogEntry = { ...entry, id: generateId() };
  if (existing !== -1) {
    data.doseLog[existing] = newEntry;
  } else {
    data.doseLog.unshift(newEntry);
  }
  persist(data);
  return data;
}

export function deleteDoseLog(id: string): MedicationTrackerData {
  const data = loadData();
  data.doseLog = data.doseLog.filter((d) => d.id !== id);
  persist(data);
  return data;
}

// ── Side-effect log CRUD ─────────────────────────────────────────────────────

export function logSideEffect(
  entry: Omit<SideEffectEntry, 'id'>
): MedicationTrackerData {
  const data = loadData();
  const newEntry: SideEffectEntry = { ...entry, id: generateId() };
  data.sideEffectLog.unshift(newEntry);
  persist(data);
  return data;
}

export function deleteSideEffect(id: string): MedicationTrackerData {
  const data = loadData();
  data.sideEffectLog = data.sideEffectLog.filter((s) => s.id !== id);
  persist(data);
  return data;
}

// ── Preferences ──────────────────────────────────────────────────────────────

export function updatePreferences(
  updates: Partial<MedicationTrackerData['preferences']>
): MedicationTrackerData {
  const data = loadData();
  data.preferences = { ...data.preferences, ...updates };
  persist(data);
  return data;
}

// ── Queries ──────────────────────────────────────────────────────────────────

/** Build today's dose schedule from active medications. */
export function getTodaySchedule(data: MedicationTrackerData): ScheduledDose[] {
  const today = todayStr();
  const schedule: ScheduledDose[] = [];

  for (const med of data.medications) {
    if (!med.isActive) continue;
    if (med.startDate > today) continue;
    if (med.endDate && med.endDate < today) continue;
    if (med.frequency === 'as-needed') continue;

    // Weekly: only show on the same weekday as start date
    if (med.frequency === 'weekly') {
      const startDay = new Date(med.startDate + 'T00:00:00').getDay();
      const todayDay = new Date(today + 'T00:00:00').getDay();
      if (startDay !== todayDay) continue;
    }

    // Biweekly: every 14 days from start
    if (med.frequency === 'biweekly') {
      const start = new Date(med.startDate + 'T00:00:00').getTime();
      const now = new Date(today + 'T00:00:00').getTime();
      const diffDays = Math.round((now - start) / 86_400_000);
      if (diffDays % 14 !== 0) continue;
    }

    // Monthly: same day-of-month as start
    if (med.frequency === 'monthly') {
      const startDom = new Date(med.startDate + 'T00:00:00').getDate();
      const todayDom = new Date(today + 'T00:00:00').getDate();
      if (startDom !== todayDom) continue;
    }

    for (const time of med.timesOfDay) {
      const scheduledISO = `${today}T${time}:00`;
      const logged = data.doseLog.find(
        (d) =>
          d.medicationId === med.id && d.scheduledTime === scheduledISO
      );
      schedule.push({ medication: med, scheduledTime: time, scheduledISO, logged });
    }
  }

  // Sort by time
  schedule.sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
  return schedule;
}

/** Get a YYYY-MM-DD string for N days before today (UTC). */
function daysAgo(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

/** Compute adherence statistics for a medication over N days. */
export function getAdherenceStats(
  data: MedicationTrackerData,
  medicationId: string,
  days: number = 7
): AdherenceStats {
  const todayDate = todayStr();
  const startStr = daysAgo(days - 1);

  const logs = data.doseLog.filter((d) => {
    if (d.medicationId !== medicationId) return false;
    const logDate = d.scheduledTime.slice(0, 10);
    return logDate >= startStr && logDate <= todayDate;
  });

  const taken = logs.filter((d) => d.status === 'taken').length;
  const skipped = logs.filter((d) => d.status === 'skipped').length;
  const missed = logs.filter((d) => d.status === 'missed').length;
  const total = logs.length;

  // Current streak: count consecutive days (from today backwards) where
  // all scheduled doses for this med were taken.
  let currentStreak = 0;
  const med = data.medications.find((m) => m.id === medicationId);
  if (med) {
    for (let i = 0; i < days; i++) {
      const dateStr = daysAgo(i);

      const dayLogs = data.doseLog.filter(
        (dl) => dl.medicationId === medicationId && dl.scheduledTime.startsWith(dateStr)
      );
      if (dayLogs.length === 0) break; // no data = streak broken
      if (dayLogs.every((dl) => dl.status === 'taken')) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  return {
    total,
    taken,
    skipped,
    missed,
    percentage: total === 0 ? 0 : Math.round((taken / total) * 100),
    currentStreak,
  };
}

/** Compute overall adherence across all active medications. */
export function getOverallAdherence(
  data: MedicationTrackerData,
  days: number = 7
): AdherenceStats {
  const activeMeds = data.medications.filter((m) => m.isActive);
  if (activeMeds.length === 0) {
    return { total: 0, taken: 0, skipped: 0, missed: 0, percentage: 0, currentStreak: 0 };
  }

  const stats = activeMeds.map((m) => getAdherenceStats(data, m.id, days));
  const total = stats.reduce((s, a) => s + a.total, 0);
  const taken = stats.reduce((s, a) => s + a.taken, 0);
  const skipped = stats.reduce((s, a) => s + a.skipped, 0);
  const missed = stats.reduce((s, a) => s + a.missed, 0);
  const currentStreak = Math.min(...stats.map((a) => a.currentStreak));

  return {
    total,
    taken,
    skipped,
    missed,
    percentage: total === 0 ? 0 : Math.round((taken / total) * 100),
    currentStreak,
  };
}

// ── Export ────────────────────────────────────────────────────────────────────

export function exportDataAsJson(): void {
  const data = loadData();
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `psychage-medications-${todayStr()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function buildSummaryText(data: MedicationTrackerData): string {
  const lines: string[] = [
    'Medication Summary',
    '══════════════════════════════════',
    `Generated: ${new Date().toLocaleDateString()}`,
    '',
  ];

  const activeMeds = data.medications.filter((m) => m.isActive);
  if (activeMeds.length === 0) {
    lines.push('No active medications.');
  } else {
    lines.push(`Active Medications (${activeMeds.length}):`);
    lines.push('');
    for (const med of activeMeds) {
      lines.push(`  ${med.name} — ${med.dosage} ${med.unit}`);
      lines.push(`    Frequency: ${med.frequency.replace(/-/g, ' ')}`);
      if (med.timesOfDay.length > 0) {
        lines.push(`    Times: ${med.timesOfDay.join(', ')}`);
      }
      if (med.prescriber) lines.push(`    Prescriber: ${med.prescriber}`);
      if (med.notes) lines.push(`    Notes: ${med.notes}`);

      const stats = getAdherenceStats(data, med.id, 7);
      if (stats.total > 0) {
        lines.push(`    7-day adherence: ${stats.percentage}%`);
      }
      lines.push('');
    }
  }

  lines.push('──────────────────────────────────');
  lines.push('Generated by Psychage — psychage.com');

  return lines.join('\n');
}

export async function copySummaryToClipboard(
  data: MedicationTrackerData
): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(buildSummaryText(data));
    return true;
  } catch {
    return false;
  }
}

// ── Clear all data ───────────────────────────────────────────────────────────

export function clearAllData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently ignore
  }
}
