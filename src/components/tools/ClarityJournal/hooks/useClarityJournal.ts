// Clarity Journal — Main React hook
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
} from '../storage';
import { calculateStreak } from '../dates';
import { exportJournalData, importJournalData } from '../export';

export function useClarityJournal() {
  const [data, setData] = useState<ClarityJournalData>(() => loadJournal());

  // Reload from storage (useful after import)
  const reload = useCallback(() => setData(loadJournal()), []);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === 'psychage_clarity_journal_v1') reload();
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [reload]);

  // ── Daily Check-In ──
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
  const streak = calculateStreak(data.dailyCheckIns.map(e => e.date));
  const todayCheckIn = data.dailyCheckIns.find(e => e.date === new Date().toISOString().slice(0, 10));

  return {
    data,
    streak,
    todayCheckIn,
    // Daily Check-In
    addCheckIn,
    // Weekly Screening
    addScreening,
    // Behavioral Activation
    addActivation,
    deleteActivation,
    // Trigger Log
    addTrigger,
    updateTrigger,
    deleteTrigger,
    // Wellness Toolbox
    addToolboxItem,
    updateToolboxItem,
    deleteToolboxItem,
    // Safety Plan
    saveSafetyPlan,
    // Weekly Reflection
    addReflection,
    // Preferences
    updatePreferences,
    // Export/Import
    exportData,
    importData,
    clearData,
    reload,
  };
}
