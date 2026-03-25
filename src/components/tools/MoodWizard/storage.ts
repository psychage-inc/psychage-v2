/**
 * LocalStorage persistence for Mood Wizard entries.
 * Follows the same pattern as SleepArchitect/storage.ts.
 */

import type { WizardState } from './MoodWizard';

export interface MoodEntry {
  id: string;
  timestamp: string;
  valence: number;
  emotions: string[];
  impactAreas: string[];
  note: string;
}

const STORAGE_KEY = 'psychage_mood_wizard_v1';

function generateId(): string {
  return `mood_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function saveMoodEntry(data: WizardState): MoodEntry {
  const entry: MoodEntry = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    valence: data.valence,
    emotions: data.emotions,
    impactAreas: data.impactAreas,
    note: data.note,
  };

  try {
    const history = getMoodHistory();
    history.unshift(entry);
    // Keep last 100 entries
    const trimmed = history.slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Storage full or unavailable — silently ignore
  }

  return entry;
}

export function getMoodHistory(): MoodEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as MoodEntry[];
  } catch {
    return [];
  }
}

export function deleteMoodEntry(id: string): void {
  try {
    const history = getMoodHistory().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // silently ignore
  }
}

export function clearMoodHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
