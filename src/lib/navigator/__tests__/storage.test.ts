 
/**
 * Navigator Storage Module — Unit Tests
 *
 * Tests persistence round-trips, expiry, corruption recovery, and Map serialization.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
    saveNavigatorState,
    loadNavigatorState,
    clearNavigatorState,
    hasRawNavigatorState,
} from '../storage';

const STORAGE_KEY = 'psychage_navigator_v1';

function makeValidState() {
    return {
        currentStep: 'symptoms',
        selectedDomains: ['emotional', 'cognitive'],
        selectedSymptoms: new Map([
            ['MOD_001', { symptom_id: 'MOD_001', severity: 7 }],
            ['ANX_001', { symptom_id: 'ANX_001', severity: 5, duration: '2_to_4_weeks' as const }],
        ]),
        crisisAcknowledged: false,
        ageGatePassed: true,
    };
}

describe('Navigator Storage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    // ─── Round-Trip ──────────────────────────────────────────────────────────

    describe('save + load round-trip', () => {
        it('persists and restores valid state', () => {
            const state = makeValidState();
            saveNavigatorState(state);

            const loaded = loadNavigatorState();
            expect(loaded).not.toBeNull();
            expect(loaded!.version).toBe(1);
            expect(loaded!.currentStep).toBe('symptoms');
            expect(loaded!.selectedDomains).toEqual(['emotional', 'cognitive']);
            expect(loaded!.crisisAcknowledged).toBe(false);
            expect(loaded!.ageGatePassed).toBe(true);
        });

        it('serializes Map as tuple array and preserves entries', () => {
            const state = makeValidState();
            saveNavigatorState(state);

            const loaded = loadNavigatorState();
            expect(loaded!.selectedSymptoms).toHaveLength(2);

            // Reconstruct Map from tuples
            const map = new Map(loaded!.selectedSymptoms);
            expect(map.get('MOD_001')).toEqual({ symptom_id: 'MOD_001', severity: 7 });
            expect(map.get('ANX_001')).toEqual({
                symptom_id: 'ANX_001',
                severity: 5,
                duration: '2_to_4_weeks',
            });
        });
    });

    // ─── No Data ─────────────────────────────────────────────────────────────

    describe('no data', () => {
        it('returns null when nothing stored', () => {
            expect(loadNavigatorState()).toBeNull();
        });

        it('hasRawNavigatorState returns false', () => {
            expect(hasRawNavigatorState()).toBe(false);
        });
    });

    // ─── Version Mismatch ────────────────────────────────────────────────────

    describe('version mismatch', () => {
        it('returns null and clears storage for wrong version', () => {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ version: 99, currentStep: 'welcome', savedAt: Date.now() })
            );

            const loaded = loadNavigatorState();
            expect(loaded).toBeNull();
            expect(localStorage.getItem(STORAGE_KEY)).toBeNull(); // was cleared
        });
    });

    // ─── Corrupted Data ──────────────────────────────────────────────────────

    describe('corrupted data', () => {
        it('returns null and clears for invalid JSON', () => {
            localStorage.setItem(STORAGE_KEY, '{broken json!!!}');

            const loaded = loadNavigatorState();
            expect(loaded).toBeNull();
            expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
        });

        it('returns null and clears for missing required fields', () => {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ version: 1 }) // missing currentStep, selectedDomains, etc.
            );

            const loaded = loadNavigatorState();
            expect(loaded).toBeNull();
            expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
        });

        it('returns null for invalid step value', () => {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    version: 1,
                    currentStep: 'nonexistent_step',
                    selectedDomains: [],
                    selectedSymptoms: [],
                    savedAt: Date.now(),
                })
            );

            expect(loadNavigatorState()).toBeNull();
        });

        it('hasRawNavigatorState returns true even for corrupted data', () => {
            localStorage.setItem(STORAGE_KEY, 'garbage');
            expect(hasRawNavigatorState()).toBe(true);
        });
    });

    // ─── Expiry ──────────────────────────────────────────────────────────────

    describe('expiry', () => {
        it('returns null when session older than 24 hours', () => {
            const state = makeValidState();
            saveNavigatorState(state);

            // Manipulate savedAt to be >24h ago
            const raw = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
            raw.savedAt = Date.now() - 25 * 60 * 60 * 1000; // 25 hours ago
            localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));

            const loaded = loadNavigatorState();
            expect(loaded).toBeNull();
            expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
        });

        it('returns data when session is within 24 hours', () => {
            const state = makeValidState();
            saveNavigatorState(state);

            // Manipulate savedAt to be 23h ago
            const raw = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
            raw.savedAt = Date.now() - 23 * 60 * 60 * 1000;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));

            expect(loadNavigatorState()).not.toBeNull();
        });
    });

    // ─── Silent Failure ──────────────────────────────────────────────────────

    describe('silent failure', () => {
        it('does not throw when localStorage is full', () => {
            const originalSetItem = localStorage.setItem;
            localStorage.setItem = () => {
                throw new DOMException('QuotaExceededError');
            };

            expect(() => saveNavigatorState(makeValidState())).not.toThrow();
            localStorage.setItem = originalSetItem;
        });
    });

    // ─── Clear ───────────────────────────────────────────────────────────────

    describe('clearNavigatorState', () => {
        it('removes the storage key', () => {
            saveNavigatorState(makeValidState());
            expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();

            clearNavigatorState();
            expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
        });
    });
});
