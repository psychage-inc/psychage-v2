// Clarity Journal — localStorage CRUD
// Single versioned key with structured JSON object

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
} from './types';

const STORAGE_KEY = 'psychage_clarity_journal_v1';

const DEFAULT_DATA: ClarityJournalData = {
  version: 1,
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
};

/** Load full journal data from localStorage */
export function loadJournal(): ClarityJournalData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_DATA);
    const parsed = JSON.parse(raw) as ClarityJournalData;
    if (parsed.version !== 1) return structuredClone(DEFAULT_DATA);
    // Merge with defaults to handle missing fields from older saves
    return {
      ...structuredClone(DEFAULT_DATA),
      ...parsed,
      preferences: { ...DEFAULT_DATA.preferences, ...parsed.preferences },
    };
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

// ── Daily Check-In ──

export function addDailyCheckIn(entry: DailyCheckIn): ClarityJournalData {
  const data = loadJournal();
  // Replace existing entry for the same date (don't duplicate)
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

// ── Behavioral Activation ──

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

// ── Clear all ──

export function clearAllJournalData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
