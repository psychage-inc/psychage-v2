// Clarity Journal V2 — Main React hook
// Wraps localStorage operations with React state for reactivity

import { useState, useCallback, useEffect } from 'react';
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
  MoodCheckIn,
  BehavioralLog,
  SleepEntry,
  StressorEntry,
  CopingUseEntry,
  FreeFormEntry,
  ThoughtRecordEntry,
  SafetyFlag,
} from '../types';
import {
  loadJournal,
  addDailyCheckIn as storageAddCheckIn,
  addWeeklyScreening as storageAddScreening,
  addBehavioralActivation as storageAddActivation,
  deleteBehavioralActivation as storageDeleteActivation,
  addTriggerLogItem as storageAddTrigger,
  updateTriggerLogItem as storageUpdateTrigger,
  deleteTriggerLogItem as storageDeleteTrigger,
  addWellnessToolboxItem as storageAddToolbox,
  updateWellnessToolboxItem as storageUpdateToolbox,
  deleteWellnessToolboxItem as storageDeleteToolbox,
  saveSafetyPlan as storageSaveSafetyPlan,
  addWeeklyReflection as storageAddReflection,
  updatePreferences as storageUpdatePrefs,
  clearAllJournalData,
  // V2
  addMoodCheckIn as storageAddMoodCheckIn,
  addBehavioralLogV2 as storageAddBehavioralLog,
  addSleepEntry as storageAddSleep,
  addStressor as storageAddStressor,
  addCopingUse as storageAddCoping,
  addFreeFormEntry as storageAddFreeForm,
  addThoughtRecordEntry as storageAddThoughtRecord,
  addSafetyFlag as storageAddSafetyFlag,
  updateSettings as storageUpdateSettings,
  getDailyJournal,
  exportAllData,
} from '../storage';
import { calculateStreak } from '../dates';
import { exportJournalData, importJournalData } from '../export';

export function useClarityJournal() {
  const [data, setData] = useState<ClarityJournalData>(() => loadJournal());

  const reload = useCallback(() => setData(loadJournal()), []);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === 'psychage_clarity_journal_v2' || e.key === 'psychage_clarity_journal_v1') reload();
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [reload]);

  // ── V1 Daily Check-In ──
  const addCheckIn = useCallback((entry: DailyCheckIn) => {
    setData(storageAddCheckIn(entry));
  }, []);

  // ── Weekly Screening ──
  const addScreening = useCallback((entry: WeeklyScreening) => {
    setData(storageAddScreening(entry));
  }, []);

  // ── Behavioral Activation ──
  const addActivation = useCallback((entry: BehavioralActivationEntry) => {
    setData(storageAddActivation(entry));
  }, []);

  const deleteActivation = useCallback((id: string) => {
    setData(storageDeleteActivation(id));
  }, []);

  // ── Trigger Log ──
  const addTrigger = useCallback((item: TriggerLogItem) => {
    setData(storageAddTrigger(item));
  }, []);

  const updateTrigger = useCallback((item: TriggerLogItem) => {
    setData(storageUpdateTrigger(item));
  }, []);

  const deleteTrigger = useCallback((id: string) => {
    setData(storageDeleteTrigger(id));
  }, []);

  // ── Wellness Toolbox ──
  const addToolboxItem = useCallback((item: WellnessToolboxItem) => {
    setData(storageAddToolbox(item));
  }, []);

  const updateToolboxItem = useCallback((item: WellnessToolboxItem) => {
    setData(storageUpdateToolbox(item));
  }, []);

  const deleteToolboxItem = useCallback((id: string) => {
    setData(storageDeleteToolbox(id));
  }, []);

  // ── Safety Plan ──
  const saveSafetyPlan = useCallback((sections: SafetyPlanSection[]) => {
    setData(storageSaveSafetyPlan(sections));
  }, []);

  // ── Weekly Reflection ──
  const addReflection = useCallback((entry: WeeklyReflection) => {
    setData(storageAddReflection(entry));
  }, []);

  // ── Preferences ──
  const updatePreferences = useCallback((prefs: Partial<JournalPreferences>) => {
    setData(storageUpdatePrefs(prefs));
  }, []);

  // ── V2: Mood Check-In ──
  const addMoodCheckIn = useCallback((date: string, checkIn: MoodCheckIn) => {
    setData(storageAddMoodCheckIn(date, checkIn));
  }, []);

  // ── V2: Behavioral Log ──
  const addBehavioralLog = useCallback((date: string, log: BehavioralLog) => {
    setData(storageAddBehavioralLog(date, log));
  }, []);

  // ── V2: Sleep Entry ──
  const addSleepEntry = useCallback((date: string, entry: SleepEntry) => {
    setData(storageAddSleep(date, entry));
  }, []);

  // ── V2: Stressor ──
  const addStressor = useCallback((date: string, stressor: StressorEntry) => {
    setData(storageAddStressor(date, stressor));
  }, []);

  // ── V2: Coping Use ──
  const addCopingUse = useCallback((date: string, entry: CopingUseEntry) => {
    setData(storageAddCoping(date, entry));
  }, []);

  // ── V2: Free Form Entry ──
  const addFreeFormEntry = useCallback((date: string, entry: FreeFormEntry) => {
    setData(storageAddFreeForm(date, entry));
  }, []);

  // ── V2: Thought Record ──
  const addThoughtRecord = useCallback((date: string, record: ThoughtRecordEntry) => {
    setData(storageAddThoughtRecord(date, record));
  }, []);

  // ── V2: Safety Flag ──
  const addSafetyFlag = useCallback((flag: SafetyFlag) => {
    setData(storageAddSafetyFlag(flag));
  }, []);

  // ── V2: Settings ──
  const updateSettings = useCallback((settings: Partial<JournalSettings>) => {
    setData(storageUpdateSettings(settings));
  }, []);

  // ── Export/Import/Clear ──
  const exportData = useCallback(() => {
    exportJournalData();
  }, []);

  const importData = useCallback((jsonString: string): boolean => {
    const result = importJournalData(jsonString);
    if (result) {
      setData(result);
      return true;
    }
    return false;
  }, []);

  const clearData = useCallback(() => {
    clearAllJournalData();
    reload();
  }, [reload]);

  // ── Computed values ──
  const allDates = [
    ...data.dailyCheckIns.map(e => e.date),
    ...data.dailyJournals.map(d => d.date),
  ];
  const streak = calculateStreak([...new Set(allDates)]);
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayCheckIn = data.dailyCheckIns.find(e => e.date === todayStr);
  const todayJournal = data.dailyJournals.find(d => d.date === todayStr);

  const todaySections = {
    mood: (todayJournal?.moodCheckIns.length ?? 0) > 0,
    activity: !!todayJournal?.behavioralLog,
    sleep: !!todayJournal?.sleepEntry,
    stressor: (todayJournal?.stressors.length ?? 0) > 0,
    coping: (todayJournal?.copingUses.length ?? 0) > 0,
    freeForm: (todayJournal?.freeFormEntries.length ?? 0) > 0,
    thoughtRecord: (todayJournal?.thoughtRecords.length ?? 0) > 0,
    dailyCheckIn: !!todayCheckIn,
  };
  const todaySectionCount = Object.values(todaySections).filter(Boolean).length;

  return {
    data,
    streak,
    todayCheckIn,
    todayJournal,
    todaySections,
    todaySectionCount,
    // V1 operations
    addCheckIn,
    addScreening,
    addActivation,
    deleteActivation,
    addTrigger,
    updateTrigger,
    deleteTrigger,
    addToolboxItem,
    updateToolboxItem,
    deleteToolboxItem,
    saveSafetyPlan,
    addReflection,
    updatePreferences,
    // V2 operations
    addMoodCheckIn,
    addBehavioralLog,
    addSleepEntry,
    addStressor,
    addCopingUse,
    addFreeFormEntry,
    addThoughtRecord,
    addSafetyFlag,
    updateSettings,
    getDailyJournal,
    // Export/Import
    exportData,
    importData,
    clearData,
    reload,
    exportAllData,
  };
}
