import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import {
    AGE_GATE_LOCK_KEY,
    isAdultByBirthYear,
    isAgeGateLocked,
    lockAgeGate,
} from '../ageGate';

// Node >= 22 ships a global `localStorage` that shadows jsdom's and is
// undefined without --localstorage-file. Point the global at jsdom's Storage.
beforeAll(() => {
    vi.stubGlobal('localStorage', (globalThis as unknown as { jsdom: { window: Window } }).jsdom.window.localStorage);
});

const HOUR = 60 * 60 * 1000;
const NOW = new Date('2026-11-14T12:00:00Z');

describe('isAdultByBirthYear', () => {
    it('treats current year minus 18 as adult', () => {
        expect(isAdultByBirthYear(NOW.getFullYear() - 18, NOW)).toBe(true);
    });

    it('treats current year minus 17 as under 18', () => {
        expect(isAdultByBirthYear(NOW.getFullYear() - 17, NOW)).toBe(false);
    });

    it('treats older and younger years accordingly', () => {
        expect(isAdultByBirthYear(1950, NOW)).toBe(true);
        expect(isAdultByBirthYear(NOW.getFullYear(), NOW)).toBe(false);
    });
});

describe('age gate lock', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('is unlocked when nothing is stored', () => {
        expect(isAgeGateLocked(NOW)).toBe(false);
    });

    it('stores now + 24h in epoch ms under the documented key', () => {
        lockAgeGate(NOW);
        expect(localStorage.getItem('psychage_age_gate_locked_until')).toBe(
            String(NOW.getTime() + 24 * HOUR),
        );
    });

    it('stays locked until 24h have passed', () => {
        lockAgeGate(NOW);
        expect(isAgeGateLocked(NOW)).toBe(true);
        expect(isAgeGateLocked(new Date(NOW.getTime() + 24 * HOUR - 1))).toBe(true);
    });

    it('unlocks and removes the value once 24h have passed', () => {
        lockAgeGate(NOW);
        expect(isAgeGateLocked(new Date(NOW.getTime() + 24 * HOUR))).toBe(false);
        expect(localStorage.getItem(AGE_GATE_LOCK_KEY)).toBeNull();
    });

    it.each(['', 'abc', '12abc', '-5', '1.5e15', 'NaN', 'Infinity'])(
        'treats malformed value %j as unlocked and removes it',
        (value) => {
            localStorage.setItem(AGE_GATE_LOCK_KEY, value);
            expect(isAgeGateLocked(NOW)).toBe(false);
            expect(localStorage.getItem(AGE_GATE_LOCK_KEY)).toBeNull();
        },
    );
});
