import { describe, it, expect } from 'vitest';
import {
  encodePlanToHash,
  decodePlanFromHash,
  buildSummaryText,
} from '../../components/tools/SleepArchitect/share';
import {
  DEFAULT_INPUTS,
  computeSleepPlan,
} from '../../components/tools/SleepArchitect/model';

describe('encodePlanToHash / decodePlanFromHash', () => {
  it('round-trips default inputs', () => {
    const hash = encodePlanToHash(DEFAULT_INPUTS);
    const decoded = decodePlanFromHash(hash);
    expect(decoded).not.toBeNull();
    expect(decoded!.bedtime).toBe(DEFAULT_INPUTS.bedtime);
    expect(decoded!.wakeTime).toBe(DEFAULT_INPUTS.wakeTime);
    expect(decoded!.sleepLatencyMinutes).toBe(DEFAULT_INPUTS.sleepLatencyMinutes);
    expect(decoded!.profile.ageGroup).toBe(DEFAULT_INPUTS.profile.ageGroup);
  });

  it('round-trips inputs with naps', () => {
    const inputs = {
      ...DEFAULT_INPUTS,
      naps: [{ id: 'test', startTime: '14:00', durationMinutes: 20 }],
    };
    const hash = encodePlanToHash(inputs);
    const decoded = decodePlanFromHash(hash);
    expect(decoded!.naps.length).toBe(1);
    expect(decoded!.naps[0].startTime).toBe('14:00');
    expect(decoded!.naps[0].durationMinutes).toBe(20);
  });

  it('returns null for invalid hash', () => {
    expect(decodePlanFromHash('not-valid-base64!!!')).toBeNull();
  });
});

describe('buildSummaryText', () => {
  it('includes key metrics', () => {
    const output = computeSleepPlan(DEFAULT_INPUTS);
    const text = buildSummaryText(DEFAULT_INPUTS, output);
    expect(text).toContain('Sleep Architect');
    expect(text).toContain('Bedtime');
    expect(text).toContain('23:00');
    expect(text).toContain('07:00');
    expect(text).toContain('Cycle');
  });

  it('includes risk flags when present', () => {
    const shortSleep = {
      ...DEFAULT_INPUTS,
      bedtime: '03:00',
      wakeTime: '06:00',
    };
    const output = computeSleepPlan(shortSleep);
    const text = buildSummaryText(shortSleep, output);
    expect(text).toContain('Alerts');
  });
});
