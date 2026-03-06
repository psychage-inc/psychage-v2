/**
 * LocalStorage persistence for Sleep Architect.
 * Versioned keys so schema changes don't corrupt old data.
 */

import { SleepPlanInputs, DEFAULT_INPUTS } from './model';

const STORAGE_KEY = 'psychage_sleep_architect_v1';

export function savePlan(inputs: SleepPlanInputs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

export function loadPlan(): SleepPlanInputs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_INPUTS;
    const parsed = JSON.parse(raw) as Partial<SleepPlanInputs>;
    // Merge with defaults so new fields are populated
    return {
      ...DEFAULT_INPUTS,
      ...parsed,
      profile: { ...DEFAULT_INPUTS.profile, ...(parsed.profile ?? {}) },
      naps: parsed.naps ?? [],
    };
  } catch {
    return DEFAULT_INPUTS;
  }
}

export function clearPlan(): void {
  localStorage.removeItem(STORAGE_KEY);
}
