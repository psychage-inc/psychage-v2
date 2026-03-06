import { describe, it, expect, beforeEach } from 'vitest';
import { savePlan, loadPlan, clearPlan } from './storage';
import { DEFAULT_INPUTS, DEFAULT_PROFILE } from './model';

describe('SleepArchitect storage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('savePlan', () => {
        it('should save plan to localStorage', () => {
            savePlan(DEFAULT_INPUTS);
            const stored = localStorage.getItem('psychage_sleep_architect_v1');
            expect(stored).not.toBeNull();
            expect(JSON.parse(stored!)).toEqual(DEFAULT_INPUTS);
        });
    });

    describe('loadPlan', () => {
        it('should return defaults when nothing saved', () => {
            const result = loadPlan();
            expect(result).toEqual(DEFAULT_INPUTS);
        });

        it('should return saved plan', () => {
            const custom = { ...DEFAULT_INPUTS, bedtime: '22:00' };
            savePlan(custom);

            const result = loadPlan();
            expect(result.bedtime).toBe('22:00');
        });

        it('should merge with defaults for missing fields', () => {
            // Simulate partial data (e.g., from an older version)
            localStorage.setItem('psychage_sleep_architect_v1', JSON.stringify({ bedtime: '22:30' }));

            const result = loadPlan();
            expect(result.bedtime).toBe('22:30');
            expect(result.wakeTime).toBe(DEFAULT_INPUTS.wakeTime);
            expect(result.profile).toEqual(DEFAULT_PROFILE);
        });

        it('should merge profile with defaults', () => {
            localStorage.setItem('psychage_sleep_architect_v1', JSON.stringify({
                profile: { ageGroup: 'teen' },
            }));

            const result = loadPlan();
            expect(result.profile.ageGroup).toBe('teen');
            expect(result.profile.chronotype).toBe('neutral');
        });

        it('should return defaults for corrupted data', () => {
            localStorage.setItem('psychage_sleep_architect_v1', 'not-json');

            const result = loadPlan();
            expect(result).toEqual(DEFAULT_INPUTS);
        });

        it('should default naps to empty array when missing', () => {
            localStorage.setItem('psychage_sleep_architect_v1', JSON.stringify({ bedtime: '22:00' }));

            const result = loadPlan();
            expect(result.naps).toEqual([]);
        });
    });

    describe('clearPlan', () => {
        it('should remove saved plan', () => {
            savePlan(DEFAULT_INPUTS);
            clearPlan();
            expect(localStorage.getItem('psychage_sleep_architect_v1')).toBeNull();
        });
    });
});
