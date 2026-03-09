// Clarity Journal V2 — localStorage CRUD
// Versioned storage with V1 → V2 migration
// All health data stays client-side

import type {
  ClarityJournalData,
  DailyCheckIn,
  WeeklyScreening,
  BehavioralActivationEntry,
  TriggerLogItem,
  WellnessToolboxItem,
  SafetyPlanSection,
  WeeklyReflection,
  JournalPreferences,
  JournalSettings,
  DailyJournal,
  MoodCheckIn,
  BehavioralLog,
  SleepEntry,
  StressorEntry,
  CopingUseEntry,
  FreeFormEntry,
  ThoughtRecordEntry,
  SafetyFlag,
} from './types';

const STORAGE_KEY = 'psychage_clarity_journal_v2';
const V1_STORAGE_KEY = 'psychage_clarity_journal_v1';

const DEFAULT_SETTINGS: JournalSettings = {
  reminderMorning: false,
  reminderEvening: false,
  reminderMorningTime: '08:00',
  reminderEveningTime: '20:00',
  weeklyScreenerDay: 'sunday',
  defaultReportPeriod: 7,
  showGuidedPrompts: true,
};

const DEFAULT_DATA: ClarityJournalData = {
  version: 2,
  dailyCheckIns: [],
  weeklyScreenings: [],
  behavioralActivation: [],
  triggerLog: [],
  wellnessToolbox: [],
  safetyPlan: [
    { sectionNumber: 1, items: [] },
    { sectionNumber: 2, items: [] },
    { sectionNumber: 3, items: [] },
    { sectionNumber: 4, items: [{ id: '988-default', text: '988 Suicide & Crisis Lifeline', contactName: '988 Lifeline', contactPhone: '988' }] },
    { sectionNumber: 5, items: [] },
    { sectionNumber: 6, items: [] },
  ],
  weeklyReflections: [],
  preferences: {
    firstVisitCompleted: false,
    privacyNoticeDismissed: false,
    showGuidanceTooltips: true,
  },
  dailyJournals: [],
  safetyFlags: [],
  settings: { ...DEFAULT_SETTINGS },
};

/** Migrate V1 data to V2 format */
function migrateV1toV2(v1Raw: string): ClarityJournalData | null {
  try {
    const v1 = JSON.parse(v1Raw);
    if (!v1 || v1.version !== 1) return null;

    const migrated: ClarityJournalData = {
      ...structuredClone(DEFAULT_DATA),
      dailyCheckIns: v1.dailyCheckIns || [],
      weeklyScreenings: v1.weeklyScreenings || [],
      behavioralActivation: v1.behavioralActivation || [],
      triggerLog: v1.triggerLog || [],
      wellnessToolbox: v1.wellnessToolbox || [],
      safetyPlan: v1.safetyPlan || DEFAULT_DATA.safetyPlan,
      weeklyReflections: v1.weeklyReflections || [],
      preferences: { ...DEFAULT_DATA.preferences, ...v1.preferences },
    };

    return migrated;
  } catch {
    return null;
  }
}

/** Load full journal data from localStorage, with V1 migration */
export function loadJournal(): ClarityJournalData {
  try {
    // Try V2 first
    const v2Raw = localStorage.getItem(STORAGE_KEY);
    if (v2Raw) {
      const parsed = JSON.parse(v2Raw);
      if (parsed.version === 2) {
        return {
          ...structuredClone(DEFAULT_DATA),
          ...parsed,
          preferences: { ...DEFAULT_DATA.preferences, ...parsed.preferences },
          settings: { ...DEFAULT_SETTINGS, ...parsed.settings },
        };
      }
    }

    // Try V1 migration
    const v1Raw = localStorage.getItem(V1_STORAGE_KEY);
    if (v1Raw) {
      const migrated = migrateV1toV2(v1Raw);
      if (migrated) {
        saveJournal(migrated);
        return migrated;
      }
    }

    return structuredClone(DEFAULT_DATA);
  } catch {
    return structuredClone(DEFAULT_DATA);
  }
}

/** Save full journal data to localStorage */
export function saveJournal(data: ClarityJournalData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Silently ignore (storage full or private browsing)
  }
}

// ── Daily Check-In (V1 compat) ──

export function addDailyCheckIn(entry: DailyCheckIn): ClarityJournalData {
  const data = loadJournal();
  const filtered = data.dailyCheckIns.filter(e => e.date !== entry.date);
  data.dailyCheckIns = [entry, ...filtered];
  saveJournal(data);
  return data;
}

export function getDailyCheckIn(date: string): DailyCheckIn | undefined {
  return loadJournal().dailyCheckIns.find(e => e.date === date);
}

// ── Weekly Screening ──

export function addWeeklyScreening(entry: WeeklyScreening): ClarityJournalData {
  const data = loadJournal();
  const filtered = data.weeklyScreenings.filter(e => e.weekStartDate !== entry.weekStartDate);
  data.weeklyScreenings = [entry, ...filtered];
  saveJournal(data);
  return data;
}

// ── Behavioral Activation (V1 compat) ──

export function addBehavioralActivation(entry: BehavioralActivationEntry): ClarityJournalData {
  const data = loadJournal();
  data.behavioralActivation = [entry, ...data.behavioralActivation];
  saveJournal(data);
  return data;
}

export function deleteBehavioralActivation(id: string): ClarityJournalData {
  const data = loadJournal();
  data.behavioralActivation = data.behavioralActivation.filter(e => e.id !== id);
  saveJournal(data);
  return data;
}

// ── Trigger Log ──

export function addTriggerLogItem(item: TriggerLogItem): ClarityJournalData {
  const data = loadJournal();
  data.triggerLog = [...data.triggerLog, item];
  saveJournal(data);
  return data;
}

export function updateTriggerLogItem(item: TriggerLogItem): ClarityJournalData {
  const data = loadJournal();
  data.triggerLog = data.triggerLog.map(existing =>
    existing.id === item.id ? item : existing,
  );
  saveJournal(data);
  return data;
}

export function deleteTriggerLogItem(id: string): ClarityJournalData {
  const data = loadJournal();
  data.triggerLog = data.triggerLog.filter(e => e.id !== id);
  saveJournal(data);
  return data;
}

// ── Wellness Toolbox ──

export function addWellnessToolboxItem(item: WellnessToolboxItem): ClarityJournalData {
  const data = loadJournal();
  data.wellnessToolbox = [...data.wellnessToolbox, item];
  saveJournal(data);
  return data;
}

export function updateWellnessToolboxItem(item: WellnessToolboxItem): ClarityJournalData {
  const data = loadJournal();
  data.wellnessToolbox = data.wellnessToolbox.map(existing =>
    existing.id === item.id ? item : existing,
  );
  saveJournal(data);
  return data;
}

export function deleteWellnessToolboxItem(id: string): ClarityJournalData {
  const data = loadJournal();
  data.wellnessToolbox = data.wellnessToolbox.filter(e => e.id !== id);
  saveJournal(data);
  return data;
}

// ── Safety Plan ──

export function saveSafetyPlan(sections: SafetyPlanSection[]): ClarityJournalData {
  const data = loadJournal();
  data.safetyPlan = sections;
  saveJournal(data);
  return data;
}

// ── Weekly Reflection ──

export function addWeeklyReflection(entry: WeeklyReflection): ClarityJournalData {
  const data = loadJournal();
  const filtered = data.weeklyReflections.filter(e => e.weekStartDate !== entry.weekStartDate);
  data.weeklyReflections = [entry, ...filtered];
  saveJournal(data);
  return data;
}

// ── Preferences ──

export function updatePreferences(prefs: Partial<JournalPreferences>): ClarityJournalData {
  const data = loadJournal();
  data.preferences = { ...data.preferences, ...prefs };
  saveJournal(data);
  return data;
}

// ── V2: Daily Journal Operations ──

function getOrCreateDailyJournal(data: ClarityJournalData, date: string): DailyJournal {
  const existing = data.dailyJournals.find(d => d.date === date);
  if (existing) return existing;
  return {
    date,
    moodCheckIns: [],
    thoughtRecords: [],
    stressors: [],
    copingUses: [],
    freeFormEntries: [],
  };
}

function upsertDailyJournal(data: ClarityJournalData, journal: DailyJournal): ClarityJournalData {
  const filtered = data.dailyJournals.filter(d => d.date !== journal.date);
  data.dailyJournals = [journal, ...filtered].sort((a, b) => b.date.localeCompare(a.date));
  saveJournal(data);
  return data;
}

export function addMoodCheckIn(date: string, checkIn: MoodCheckIn): ClarityJournalData {
  const data = loadJournal();
  const journal = getOrCreateDailyJournal(data, date);
  journal.moodCheckIns = [...journal.moodCheckIns, checkIn];
  return upsertDailyJournal(data, journal);
}

export function addBehavioralLogV2(date: string, log: BehavioralLog): ClarityJournalData {
  const data = loadJournal();
  const journal = getOrCreateDailyJournal(data, date);
  journal.behavioralLog = log;
  return upsertDailyJournal(data, journal);
}

export function addSleepEntry(date: string, entry: SleepEntry): ClarityJournalData {
  const data = loadJournal();
  const journal = getOrCreateDailyJournal(data, date);
  journal.sleepEntry = entry;
  return upsertDailyJournal(data, journal);
}

export function addStressor(date: string, stressor: StressorEntry): ClarityJournalData {
  const data = loadJournal();
  const journal = getOrCreateDailyJournal(data, date);
  journal.stressors = [...journal.stressors, stressor];
  return upsertDailyJournal(data, journal);
}

export function addCopingUse(date: string, entry: CopingUseEntry): ClarityJournalData {
  const data = loadJournal();
  const journal = getOrCreateDailyJournal(data, date);
  journal.copingUses = [...journal.copingUses, entry];
  return upsertDailyJournal(data, journal);
}

export function addFreeFormEntry(date: string, entry: FreeFormEntry): ClarityJournalData {
  const data = loadJournal();
  const journal = getOrCreateDailyJournal(data, date);
  journal.freeFormEntries = [...journal.freeFormEntries, entry];
  return upsertDailyJournal(data, journal);
}

export function addThoughtRecordEntry(date: string, record: ThoughtRecordEntry): ClarityJournalData {
  const data = loadJournal();
  const journal = getOrCreateDailyJournal(data, date);
  journal.thoughtRecords = [...journal.thoughtRecords, record];
  return upsertDailyJournal(data, journal);
}

export function getDailyJournal(date: string): DailyJournal | undefined {
  return loadJournal().dailyJournals.find(d => d.date === date);
}

export function getDailyJournalsInRange(start: string, end: string): DailyJournal[] {
  return loadJournal().dailyJournals.filter(d => d.date >= start && d.date <= end);
}

// ── V2: Safety Flags ──

export function addSafetyFlag(flag: SafetyFlag): ClarityJournalData {
  const data = loadJournal();
  data.safetyFlags = [...data.safetyFlags, flag];
  saveJournal(data);
  return data;
}

// ── V2: Settings ──

export function updateSettings(settings: Partial<JournalSettings>): ClarityJournalData {
  const data = loadJournal();
  data.settings = { ...data.settings, ...settings };
  saveJournal(data);
  return data;
}

// ── Clear all ──

export function clearAllJournalData(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(V1_STORAGE_KEY);
}

// ── Storage usage ──

export function getStorageUsage(): { usedBytes: number; maxBytes: number; percentage: number } {
  const maxBytes = 5 * 1024 * 1024; // ~5MB
  let usedBytes = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        usedBytes += localStorage.getItem(key)?.length ?? 0;
      }
    }
    usedBytes *= 2; // UTF-16 encoding
  } catch {
    usedBytes = 0;
  }
  return { usedBytes, maxBytes, percentage: Math.round((usedBytes / maxBytes) * 100) };
}

// ── Export all data as JSON ──

export function exportAllData(): string {
  return JSON.stringify(loadJournal(), null, 2);
}
