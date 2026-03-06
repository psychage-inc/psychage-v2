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
} from '../../components/tools/SleepArchitect/model';

// ─── parseTime / formatTime ─────────────────────────────────────────────────

describe('parseTime', () => {
  it('parses midnight', () => {
    expect(parseTime('00:00')).toBe(0);
  });
  it('parses morning time', () => {
    expect(parseTime('07:30')).toBe(450);
  });
  it('parses late night', () => {
    expect(parseTime('23:45')).toBe(1425);
  });
});

describe('formatTime', () => {
  it('formats midnight', () => {
    expect(formatTime(0)).toBe('00:00');
  });
  it('formats morning', () => {
    expect(formatTime(450)).toBe('07:30');
  });
  it('wraps past midnight', () => {
    expect(formatTime(1500)).toBe('01:00'); // 1440 + 60
  });
  it('handles negative (wraps)', () => {
    expect(formatTime(-60)).toBe('23:00');
  });
});

describe('formatDuration', () => {
  it('formats hours only', () => {
    expect(formatDuration(120)).toBe('2h');
  });
  it('formats minutes only', () => {
    expect(formatDuration(45)).toBe('45m');
  });
  it('formats mixed', () => {
    expect(formatDuration(510)).toBe('8h 30m');
  });
});

// ─── minutesBetween ─────────────────────────────────────────────────────────

describe('minutesBetween', () => {
  it('handles same-day (bed before wake)', () => {
    expect(minutesBetween('22:00', '06:00')).toBe(480); // crosses midnight
  });
  it('handles crossing midnight (typical)', () => {
    expect(minutesBetween('23:30', '07:00')).toBe(450);
  });
  it('handles bed after midnight', () => {
    expect(minutesBetween('01:00', '08:30')).toBe(450);
  });
  it('handles identical times as full day', () => {
    // When wake == bed, the cross-midnight path yields 1440 (24h)
    expect(minutesBetween('07:00', '07:00')).toBe(1440);
  });
  it('handles short sleep', () => {
    expect(minutesBetween('03:00', '06:00')).toBe(180);
  });
});

// ─── buildCycleArchitecture ─────────────────────────────────────────────────

describe('buildCycleArchitecture', () => {
  it('returns empty for 0 minutes', () => {
    expect(buildCycleArchitecture(0)).toEqual([]);
  });

  it('returns correct number of cycles for 7.5h', () => {
    const cycles = buildCycleArchitecture(450);
    expect(cycles.length).toBe(5);
  });

  it('returns correct number of cycles for 6h', () => {
    const cycles = buildCycleArchitecture(360);
    expect(cycles.length).toBe(4);
  });

  it('stage percentages sum to 100 for each cycle', () => {
    const cycles = buildCycleArchitecture(450);
    cycles.forEach(c => {
      expect(c.n1Percent + c.n2Percent + c.n3Percent + c.remPercent).toBe(100);
    });
  });

  it('N3 decreases across cycles', () => {
    const cycles = buildCycleArchitecture(450);
    for (let i = 1; i < cycles.length; i++) {
      expect(cycles[i].n3Percent).toBeLessThanOrEqual(cycles[i - 1].n3Percent);
    }
  });

  it('REM increases across cycles', () => {
    const cycles = buildCycleArchitecture(450);
    for (let i = 1; i < cycles.length; i++) {
      expect(cycles[i].remPercent).toBeGreaterThanOrEqual(cycles[i - 1].remPercent);
    }
  });

  it('total duration sums to input', () => {
    const cycles = buildCycleArchitecture(450);
    const total = cycles.reduce((sum, c) => sum + c.durationMinutes, 0);
    expect(total).toBe(450);
  });

  it('cycle boundaries are contiguous', () => {
    const cycles = buildCycleArchitecture(450);
    for (let i = 1; i < cycles.length; i++) {
      expect(cycles[i].startMinuteFromSleep).toBe(cycles[i - 1].endMinuteFromSleep);
    }
  });
});

// ─── classifyNap ────────────────────────────────────────────────────────────

describe('classifyNap', () => {
  it('classifies 20min as power nap', () => {
    const result = classifyNap(
      { id: '1', startTime: '14:00', durationMinutes: 20 },
      '23:00'
    );
    expect(result.classification).toBe('power_nap');
    expect(result.inertiaRisk).toBe(false);
    expect(result.tooCloseToSleep).toBe(false);
  });

  it('classifies 30min as short nap', () => {
    const result = classifyNap(
      { id: '2', startTime: '14:00', durationMinutes: 30 },
      '23:00'
    );
    expect(result.classification).toBe('short_nap');
  });

  it('classifies 45min as deep risk', () => {
    const result = classifyNap(
      { id: '3', startTime: '14:00', durationMinutes: 45 },
      '23:00'
    );
    expect(result.classification).toBe('deep_risk');
    expect(result.inertiaRisk).toBe(true);
  });

  it('classifies 90min as full cycle', () => {
    const result = classifyNap(
      { id: '4', startTime: '13:00', durationMinutes: 90 },
      '23:00'
    );
    expect(result.classification).toBe('full_cycle');
    expect(result.inertiaRisk).toBe(false);
  });

  it('flags nap too close to bedtime', () => {
    const result = classifyNap(
      { id: '5', startTime: '20:00', durationMinutes: 20 },
      '23:00'
    );
    expect(result.tooCloseToSleep).toBe(true);
  });

  it('does not flag nap far from bedtime', () => {
    const result = classifyNap(
      { id: '6', startTime: '12:00', durationMinutes: 20 },
      '23:00'
    );
    expect(result.tooCloseToSleep).toBe(false);
  });
});

// ─── computeRiskFlags ───────────────────────────────────────────────────────

describe('computeRiskFlags', () => {
  it('flags too short sleep (<6h)', () => {
    const flags = computeRiskFlags(300, 0.9, [], DEFAULT_PROFILE, '23:00');
    const flag = flags.find(f => f.type === 'too_short');
    expect(flag).toBeDefined();
    expect(flag!.severity).toBe('danger');
  });

  it('flags low efficiency', () => {
    const flags = computeRiskFlags(420, 0.7, [], DEFAULT_PROFILE, '23:00');
    const flag = flags.find(f => f.type === 'low_efficiency');
    expect(flag).toBeDefined();
    expect(flag!.severity).toBe('danger');
  });

  it('flags late naps', () => {
    const lateNap = classifyNap({ id: '1', startTime: '20:00', durationMinutes: 20 }, '23:00');
    const flags = computeRiskFlags(480, 0.9, [lateNap], DEFAULT_PROFILE, '23:00');
    expect(flags.find(f => f.type === 'nap_too_late')).toBeDefined();
  });

  it('flags caffeine cutoff too late', () => {
    const profile = { ...DEFAULT_PROFILE, caffeineCutoffTime: '20:00' };
    const flags = computeRiskFlags(480, 0.9, [], profile, '23:00');
    expect(flags.find(f => f.type === 'caffeine_warning')).toBeDefined();
  });

  it('no flags for healthy sleep', () => {
    const flags = computeRiskFlags(480, 0.92, [], DEFAULT_PROFILE, '23:00');
    expect(flags.length).toBe(0);
  });
});

// ─── getRecommendedBedtimes / WakeTimes ─────────────────────────────────────

describe('getRecommendedBedtimes', () => {
  it('returns 4 options (3–6 cycles)', () => {
    const bedtimes = getRecommendedBedtimes('07:00', 15);
    expect(bedtimes.length).toBe(4);
  });

  it('6-cycle bedtime is earliest', () => {
    const bedtimes = getRecommendedBedtimes('07:00', 15);
    const sixCycle = bedtimes.find(b => b.cycles === 6)!;
    // 6 cycles × 90min + 15min latency = 555min before 07:00 = 21:45
    expect(sixCycle.time).toBe('21:45');
  });

  it('3-cycle bedtime is latest', () => {
    const bedtimes = getRecommendedBedtimes('07:00', 15);
    const threeCycle = bedtimes.find(b => b.cycles === 3)!;
    // 3 × 90 + 15 = 285min before 07:00 = 02:15
    expect(threeCycle.time).toBe('02:15');
  });
});

describe('getRecommendedWakeTimes', () => {
  it('returns 4 options', () => {
    const wakes = getRecommendedWakeTimes('23:00', 15);
    expect(wakes.length).toBe(4);
  });

  it('3-cycle wake is earliest', () => {
    const wakes = getRecommendedWakeTimes('23:00', 15);
    const threeCycle = wakes.find(w => w.cycles === 3)!;
    // 23:00 + 15min + 270min = 23:00 + 285min = 03:45
    expect(threeCycle.time).toBe('03:45');
  });
});

// ─── computeSleepPlan ───────────────────────────────────────────────────────

describe('computeSleepPlan', () => {
  it('computes typical night (23:30 → 07:00)', () => {
    const result = computeSleepPlan({
      ...DEFAULT_INPUTS,
      bedtime: '23:30',
      wakeTime: '07:00',
    });
    expect(result.timeInBedMinutes).toBe(450); // 7.5h
    expect(result.totalSleepTimeMinutes).toBe(435); // 450 - 15 latency
    expect(result.estimatedCycles).toBe(5);
    expect(result.sleepEfficiency).toBeCloseTo(435 / 450, 2);
  });

  it('computes late bedtime crossing midnight (01:00 → 08:30)', () => {
    const result = computeSleepPlan({
      ...DEFAULT_INPUTS,
      bedtime: '01:00',
      wakeTime: '08:30',
    });
    expect(result.timeInBedMinutes).toBe(450);
    expect(result.totalSleepTimeMinutes).toBe(435);
  });

  it('accounts for WASO', () => {
    const result = computeSleepPlan({
      ...DEFAULT_INPUTS,
      bedtime: '23:00',
      wakeTime: '07:00',
      awakeningsCount: 2,
      awakeningMinutesEach: 10,
    });
    expect(result.wasoMinutes).toBe(20);
    // TIB = 480, TST = 480 - 15 - 20 = 445
    expect(result.totalSleepTimeMinutes).toBe(445);
  });

  it('handles short sleep with risk flags', () => {
    const result = computeSleepPlan({
      ...DEFAULT_INPUTS,
      bedtime: '03:00',
      wakeTime: '06:00',
    });
    expect(result.timeInBedMinutes).toBe(180);
    expect(result.riskFlags.some(f => f.type === 'too_short')).toBe(true);
  });

  it('includes nap analysis', () => {
    const result = computeSleepPlan({
      ...DEFAULT_INPUTS,
      naps: [{ id: '1', startTime: '14:00', durationMinutes: 20 }],
    });
    expect(result.napAnalysis.length).toBe(1);
    expect(result.napAnalysis[0].classification).toBe('power_nap');
  });

  it('generates recommended times', () => {
    const result = computeSleepPlan(DEFAULT_INPUTS);
    expect(result.recommendedWakeTimes.length).toBe(4);
    expect(result.recommendedBedtimes.length).toBe(4);
  });
});
