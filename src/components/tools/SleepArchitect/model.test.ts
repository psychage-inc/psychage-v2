import { describe, it, expect } from 'vitest';
import {
    parseTime,
    formatTime,
    formatDuration,
    minutesBetween,
    buildCycleArchitecture,
    classifyNap,
    computeRiskFlags,
    getRecommendedBedtimes,
    getRecommendedWakeTimes,
    computeSleepPlan,
    DEFAULT_INPUTS,
    DEFAULT_PROFILE,
} from './model';

describe('parseTime', () => {
    it('should parse midnight', () => expect(parseTime('00:00')).toBe(0));
    it('should parse noon', () => expect(parseTime('12:00')).toBe(720));
    it('should parse 23:30', () => expect(parseTime('23:30')).toBe(1410));
    it('should parse 07:15', () => expect(parseTime('07:15')).toBe(435));
});

describe('formatTime', () => {
    it('should format midnight', () => expect(formatTime(0)).toBe('00:00'));
    it('should format noon', () => expect(formatTime(720)).toBe('12:00'));
    it('should wrap negative minutes', () => expect(formatTime(-60)).toBe('23:00'));
    it('should wrap over 1440', () => expect(formatTime(1500)).toBe('01:00'));
    it('should pad single digits', () => expect(formatTime(65)).toBe('01:05'));
});

describe('formatDuration', () => {
    it('should format minutes only', () => expect(formatDuration(30)).toBe('30m'));
    it('should format hours only', () => expect(formatDuration(120)).toBe('2h'));
    it('should format hours and minutes', () => expect(formatDuration(90)).toBe('1h 30m'));
    it('should format 0 minutes', () => expect(formatDuration(0)).toBe('0m'));
    it('should format 7.5 hours', () => expect(formatDuration(450)).toBe('7h 30m'));
});

describe('minutesBetween', () => {
    it('should calculate same day duration', () => {
        expect(minutesBetween('22:00', '06:00')).toBe(480);
    });
    it('should calculate without crossing midnight', () => {
        expect(minutesBetween('08:00', '16:00')).toBe(480);
    });
    it('should handle crossing midnight', () => {
        expect(minutesBetween('23:00', '07:00')).toBe(480);
    });
    it('should handle short duration', () => {
        expect(minutesBetween('23:45', '00:15')).toBe(30);
    });
});

describe('buildCycleArchitecture', () => {
    it('should return empty array for 0 minutes', () => {
        expect(buildCycleArchitecture(0)).toEqual([]);
    });

    it('should return empty array for negative minutes', () => {
        expect(buildCycleArchitecture(-10)).toEqual([]);
    });

    it('should create cycles for typical 8h sleep', () => {
        const cycles = buildCycleArchitecture(480);
        expect(cycles.length).toBeGreaterThanOrEqual(4);
        expect(cycles.length).toBeLessThanOrEqual(7);
    });

    it('should have decreasing N3 across cycles', () => {
        const cycles = buildCycleArchitecture(450);
        if (cycles.length >= 3) {
            expect(cycles[0].n3Percent).toBeGreaterThan(cycles[2].n3Percent);
        }
    });

    it('should have increasing REM across cycles', () => {
        const cycles = buildCycleArchitecture(450);
        if (cycles.length >= 3) {
            expect(cycles[0].remPercent).toBeLessThan(cycles[2].remPercent);
        }
    });

    it('should have stage percentages summing to 100', () => {
        const cycles = buildCycleArchitecture(450);
        cycles.forEach(c => {
            expect(c.n1Percent + c.n2Percent + c.n3Percent + c.remPercent).toBe(100);
        });
    });

    it('should have contiguous start/end times', () => {
        const cycles = buildCycleArchitecture(450);
        for (let i = 1; i < cycles.length; i++) {
            expect(cycles[i].startMinuteFromSleep).toBe(cycles[i - 1].endMinuteFromSleep);
        }
    });
});

describe('classifyNap', () => {
    it('should classify <= 20 min as power_nap', () => {
        const result = classifyNap({ id: '1', startTime: '14:00', durationMinutes: 15 }, '23:00');
        expect(result.classification).toBe('power_nap');
        expect(result.inertiaRisk).toBe(false);
    });

    it('should classify 21-30 min as short_nap', () => {
        const result = classifyNap({ id: '2', startTime: '14:00', durationMinutes: 25 }, '23:00');
        expect(result.classification).toBe('short_nap');
    });

    it('should classify 31-60 min as deep_risk', () => {
        const result = classifyNap({ id: '3', startTime: '14:00', durationMinutes: 45 }, '23:00');
        expect(result.classification).toBe('deep_risk');
        expect(result.inertiaRisk).toBe(true);
    });

    it('should classify > 60 min as full_cycle', () => {
        const result = classifyNap({ id: '4', startTime: '13:00', durationMinutes: 90 }, '23:00');
        expect(result.classification).toBe('full_cycle');
    });

    it('should flag naps too close to bedtime', () => {
        const result = classifyNap({ id: '5', startTime: '20:00', durationMinutes: 20 }, '23:00');
        expect(result.tooCloseToSleep).toBe(true);
    });

    it('should not flag naps far from bedtime', () => {
        const result = classifyNap({ id: '6', startTime: '13:00', durationMinutes: 20 }, '23:00');
        expect(result.tooCloseToSleep).toBe(false);
    });
});

describe('computeRiskFlags', () => {
    const profile = DEFAULT_PROFILE;

    it('should flag too short sleep (< 6h)', () => {
        const flags = computeRiskFlags(300, 0.9, [], profile, '23:00');
        expect(flags.some(f => f.type === 'too_short' && f.severity === 'danger')).toBe(true);
    });

    it('should flag borderline sleep (6-7h)', () => {
        const flags = computeRiskFlags(380, 0.9, [], profile, '23:00');
        expect(flags.some(f => f.type === 'too_short' && f.severity === 'warning')).toBe(true);
    });

    it('should flag too long sleep (> 10h)', () => {
        const flags = computeRiskFlags(650, 0.9, [], profile, '23:00');
        expect(flags.some(f => f.type === 'too_long')).toBe(true);
    });

    it('should flag low efficiency (< 85%)', () => {
        const flags = computeRiskFlags(480, 0.75, [], profile, '23:00');
        expect(flags.some(f => f.type === 'low_efficiency')).toBe(true);
    });

    it('should flag late naps', () => {
        const lateNap = { nap: { id: '1', startTime: '20:00', durationMinutes: 20 }, classification: 'power_nap' as const, label: '', description: '', inertiaRisk: false, tooCloseToSleep: true };
        const flags = computeRiskFlags(480, 0.9, [lateNap], profile, '23:00');
        expect(flags.some(f => f.type === 'nap_too_late')).toBe(true);
    });

    it('should flag caffeine too close to bed', () => {
        const cafProfile = { ...profile, caffeineCutoffTime: '20:00' };
        const flags = computeRiskFlags(480, 0.9, [], cafProfile, '23:00');
        expect(flags.some(f => f.type === 'caffeine_warning')).toBe(true);
    });

    it('should return no flags for healthy sleep', () => {
        const flags = computeRiskFlags(480, 0.92, [], profile, '23:00');
        expect(flags).toHaveLength(0);
    });
});

describe('getRecommendedBedtimes', () => {
    it('should return 4 recommendations (3-6 cycles)', () => {
        const recs = getRecommendedBedtimes('07:00', 15);
        expect(recs).toHaveLength(4);
    });

    it('should have increasing cycle counts', () => {
        const recs = getRecommendedBedtimes('07:00', 15);
        // Sorted: 6, 5, 4, 3 cycles
        expect(recs[0].cycles).toBe(6);
        expect(recs[3].cycles).toBe(3);
    });

    it('should account for sleep latency', () => {
        const noLatency = getRecommendedBedtimes('07:00', 0);
        const withLatency = getRecommendedBedtimes('07:00', 30);
        // With latency, bedtime should be earlier
        expect(parseTime(withLatency[0].time)).toBeLessThan(parseTime(noLatency[0].time));
    });
});

describe('getRecommendedWakeTimes', () => {
    it('should return 4 recommendations (3-6 cycles)', () => {
        const recs = getRecommendedWakeTimes('23:00', 15);
        expect(recs).toHaveLength(4);
    });

    it('should have increasing cycle counts', () => {
        const recs = getRecommendedWakeTimes('23:00', 15);
        expect(recs[0].cycles).toBe(3);
        expect(recs[3].cycles).toBe(6);
    });
});

describe('computeSleepPlan', () => {
    it('should compute correct metrics for default inputs', () => {
        const result = computeSleepPlan(DEFAULT_INPUTS);
        expect(result.timeInBedMinutes).toBe(480); // 23:00 to 07:00
        expect(result.totalSleepTimeMinutes).toBe(465); // 480 - 15 latency
        expect(result.wasoMinutes).toBe(0);
        expect(result.sleepEfficiency).toBeCloseTo(465 / 480, 2);
    });

    it('should account for awakenings', () => {
        const inputs = { ...DEFAULT_INPUTS, awakeningsCount: 2, awakeningMinutesEach: 10 };
        const result = computeSleepPlan(inputs);
        expect(result.wasoMinutes).toBe(20);
        expect(result.totalSleepTimeMinutes).toBe(445); // 480 - 15 - 20
    });

    it('should never have negative total sleep time', () => {
        const inputs = { ...DEFAULT_INPUTS, sleepLatencyMinutes: 600 };
        const result = computeSleepPlan(inputs);
        expect(result.totalSleepTimeMinutes).toBe(0);
    });

    it('should include nap analysis', () => {
        const inputs = {
            ...DEFAULT_INPUTS,
            naps: [{ id: '1', startTime: '14:00', durationMinutes: 20 }],
        };
        const result = computeSleepPlan(inputs);
        expect(result.napAnalysis).toHaveLength(1);
        expect(result.napAnalysis[0].classification).toBe('power_nap');
    });

    it('should include recommended times', () => {
        const result = computeSleepPlan(DEFAULT_INPUTS);
        expect(result.recommendedWakeTimes.length).toBeGreaterThan(0);
        expect(result.recommendedBedtimes.length).toBeGreaterThan(0);
    });
});
