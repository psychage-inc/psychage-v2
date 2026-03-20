import { useState, useCallback, useEffect, useMemo } from 'react';
import type {
  MedicationTrackerData,
  Medication,
  DoseLogEntry,
  SideEffectEntry,
  ScheduledDose,
  AdherenceStats,
} from '../types';
import {
  loadData,
  saveMedication,
  updateMedication,
  deleteMedication,
  logDose,
  logSideEffect,
  deleteDoseLog,
  deleteSideEffect,
  updatePreferences,
  getTodaySchedule,
  getAdherenceStats,
  getOverallAdherence,
  exportDataAsJson,
  copySummaryToClipboard,
  clearAllData,
} from '../storage';

const STORAGE_KEY = 'psychage_medication_tracker_v1';

export function useMedicationTracker() {
  const [data, setData] = useState<MedicationTrackerData>(() => loadData());

  // Reload from localStorage
  const reload = useCallback(() => setData(loadData()), []);

  // Cross-tab sync
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) reload();
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [reload]);

  // ── Medication CRUD ──────────────────────────────────────────────────────

  const addMedication = useCallback(
    (med: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>) => {
      setData(saveMedication(med));
    },
    []
  );

  const editMedication = useCallback(
    (id: string, updates: Partial<Omit<Medication, 'id' | 'createdAt'>>) => {
      setData(updateMedication(id, updates));
    },
    []
  );

  const removeMedication = useCallback((id: string) => {
    setData(deleteMedication(id));
  }, []);

  // ── Dose log ─────────────────────────────────────────────────────────────

  const addDoseLog = useCallback(
    (entry: Omit<DoseLogEntry, 'id'>) => {
      setData(logDose(entry));
    },
    []
  );

  const removeDoseLog = useCallback((id: string) => {
    setData(deleteDoseLog(id));
  }, []);

  // ── Side effects ─────────────────────────────────────────────────────────

  const addSideEffect = useCallback(
    (entry: Omit<SideEffectEntry, 'id'>) => {
      setData(logSideEffect(entry));
    },
    []
  );

  const removeSideEffect = useCallback((id: string) => {
    setData(deleteSideEffect(id));
  }, []);

  // ── Preferences ──────────────────────────────────────────────────────────

  const setPreferences = useCallback(
    (updates: Partial<MedicationTrackerData['preferences']>) => {
      setData(updatePreferences(updates));
    },
    []
  );

  // ── Computed values ──────────────────────────────────────────────────────

  const activeMeds = useMemo(
    () => data.medications.filter((m) => m.isActive),
    [data.medications]
  );

  const todaySchedule: ScheduledDose[] = useMemo(
    () => getTodaySchedule(data),
    [data]
  );

  const overallAdherence: AdherenceStats = useMemo(
    () => getOverallAdherence(data, 7),
    [data]
  );

  const getMedAdherence = useCallback(
    (medId: string, days: number = 7) => getAdherenceStats(data, medId, days),
    [data]
  );

  // ── Export ───────────────────────────────────────────────────────────────

  const exportJson = useCallback(() => exportDataAsJson(), []);

  const copyToClipboard = useCallback(
    () => copySummaryToClipboard(data),
    [data]
  );

  // ── Clear ────────────────────────────────────────────────────────────────

  const clearData = useCallback(() => {
    clearAllData();
    reload();
  }, [reload]);

  return {
    data,
    activeMeds,
    todaySchedule,
    overallAdherence,
    addMedication,
    editMedication,
    removeMedication,
    addDoseLog,
    removeDoseLog,
    addSideEffect,
    removeSideEffect,
    getMedAdherence,
    setPreferences,
    exportJson,
    copyToClipboard,
    clearData,
    reload,
  };
}
