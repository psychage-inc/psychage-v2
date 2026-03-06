import type { ThoughtRecord } from './types';

const STORAGE_KEY = 'psychage_thought_reframer_v1';
const RUMINATION_KEY = 'psychage_thought_reframer_rumination_v1';

export function saveRecords(records: ThoughtRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Silently ignore (storage full or private browsing)
  }
}

export function loadRecords(): ThoughtRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function deleteRecord(id: string): ThoughtRecord[] {
  const records = loadRecords().filter(r => r.id !== id);
  saveRecords(records);
  return records;
}

export function clearRecords(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getRuminationCount(): { date: string; count: number } {
  try {
    const raw = localStorage.getItem(RUMINATION_KEY);
    if (!raw) return { date: new Date().toDateString(), count: 0 };
    return JSON.parse(raw);
  } catch {
    return { date: new Date().toDateString(), count: 0 };
  }
}

export function incrementRuminationCount(): number {
  const current = getRuminationCount();
  const today = new Date().toDateString();
  const updated = current.date === today
    ? { date: today, count: current.count + 1 }
    : { date: today, count: 1 };
  try {
    localStorage.setItem(RUMINATION_KEY, JSON.stringify(updated));
  } catch {
    // Silently ignore
  }
  return updated.count;
}
