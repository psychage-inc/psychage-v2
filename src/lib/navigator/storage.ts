/**
 * LocalStorage persistence for Symptom Navigator.
 * Versioned keys so schema changes don't corrupt old data.
 * Follows the same pattern as SleepArchitect/storage.ts.
 */

import type { UserSymptomInput } from './types';

const STORAGE_KEY = 'psychage_navigator_v1';
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

/** Serializable shape of the persisted navigator state. */
export interface NavigatorPersistState {
    version: 1;
    currentStep: string;
    selectedDomains: string[];
    selectedSymptoms: [string, UserSymptomInput][]; // Map → tuples for JSON
    crisisAcknowledged: boolean;
    ageGatePassed: boolean;
    savedAt: number;
}

const VALID_STEPS = new Set([
    'welcome', 'domains', 'symptoms', 'details', 'results',
]);

/** Runtime type guard — checks structure, not just existence. */
function isNavigatorStateValid(data: unknown): data is NavigatorPersistState {
    if (!data || typeof data !== 'object') return false;
    const d = data as Record<string, unknown>;
    if (d.version !== 1) return false;
    if (typeof d.currentStep !== 'string' || !VALID_STEPS.has(d.currentStep)) return false;
    if (!Array.isArray(d.selectedDomains)) return false;
    if (!Array.isArray(d.selectedSymptoms)) return false;
    if (typeof d.savedAt !== 'number') return false;
    return true;
}

/** Save navigator state to localStorage. Silent failure. */
export function saveNavigatorState(state: {
    currentStep: string;
    selectedDomains: string[];
    selectedSymptoms: Map<string, UserSymptomInput>;
    crisisAcknowledged: boolean;
    ageGatePassed: boolean;
}): void {
    try {
        const persist: NavigatorPersistState = {
            version: 1,
            currentStep: state.currentStep,
            selectedDomains: state.selectedDomains,
            selectedSymptoms: Array.from(state.selectedSymptoms.entries()),
            crisisAcknowledged: state.crisisAcknowledged,
            ageGatePassed: state.ageGatePassed,
            savedAt: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
    } catch {
        // Storage full or unavailable — silently ignore
    }
}

/**
 * Load navigator state from localStorage.
 * Returns null if: missing, expired (>24h), invalid version, or corrupted.
 * Clears corrupted data automatically.
 */
export function loadNavigatorState(): NavigatorPersistState | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;

        const parsed: unknown = JSON.parse(raw);

        if (!isNavigatorStateValid(parsed)) {
            // Corrupted or version mismatch — clear and signal
            clearNavigatorState();
            return null;
        }

        // Expire sessions older than 24 hours
        if (Date.now() - parsed.savedAt > MAX_AGE_MS) {
            clearNavigatorState();
            return null;
        }

        return parsed;
    } catch {
        // JSON parse failure — clear corrupted data
        clearNavigatorState();
        return null;
    }
}

/** Remove persisted navigator state. */
export function clearNavigatorState(): void {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch {
        // Silently ignore
    }
}

/**
 * Check if there is raw data in storage (even if invalid).
 * Used to detect corrupted state vs no state.
 */
export function hasRawNavigatorState(): boolean {
    try {
        return localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
        return false;
    }
}
