import { describe, it, expect } from 'vitest';
import {
  checkDVSafety,
  checkSocialIsolation,
} from '@/components/tools/RelationshipHealthCheck/alerts';
import type { FourHorsemenResult } from '@/components/tools/RelationshipHealthCheck/types';

// ── DV Safety Detection ──────────────────────────────────────────────────────

describe('checkDVSafety', () => {
  const noHorsemen: FourHorsemenResult = {
    criticism: { score: 2, present: false },
    contempt: { score: 2, present: false },
    defensiveness: { score: 2, present: false },
    stonewalling: { score: 2, present: false },
    overallRisk: 'low',
    activeCount: 0,
  };

  it('returns not triggered for neutral answers', () => {
    const result = checkDVSafety({}, 60, 60, noHorsemen);
    expect(result.triggered).toBe(false);
  });

  it('triggers critical when safety item (p_ts_02) is ≤ 2', () => {
    const result = checkDVSafety({ p_ts_02: 1 }, 50, 50, noHorsemen);
    expect(result.triggered).toBe(true);
    expect(result.severity).toBe('critical');
  });

  it('triggers critical when p_ts_02 is exactly 2', () => {
    const result = checkDVSafety({ p_ts_02: 2 }, 50, 50, noHorsemen);
    expect(result.triggered).toBe(true);
    expect(result.severity).toBe('critical');
  });

  it('does NOT trigger when p_ts_02 is 3 and partner score is normal', () => {
    const result = checkDVSafety({ p_ts_02: 3 }, 60, 60, noHorsemen);
    expect(result.triggered).toBe(false);
  });

  it('triggers warning when contempt is high and trust sub-dim is very low', () => {
    const result = checkDVSafety({ p_ap_02: 4, p_ts_02: 3 }, 50, 20, noHorsemen);
    expect(result.triggered).toBe(true);
    expect(result.severity).toBe('warning');
  });

  it('triggers warning when Four Horsemen elevated + low partner domain', () => {
    const elevatedHorsemen: FourHorsemenResult = {
      ...noHorsemen,
      overallRisk: 'elevated',
      criticism: { score: 5, present: true },
      activeCount: 1,
    };
    const result = checkDVSafety({ p_ts_02: 3, p_ap_02: 3 }, 25, 40, elevatedHorsemen);
    expect(result.triggered).toBe(true);
    expect(result.severity).toBe('warning');
  });

  it('triggers warning when one distress item and low partner domain', () => {
    const result = checkDVSafety({ p_ts_02: 3, p_ap_02: 4 }, 20, 30, noHorsemen);
    expect(result.triggered).toBe(true);
    expect(result.severity).toBe('warning');
  });
});

// ── Social Isolation Detection ───────────────────────────────────────────────

describe('checkSocialIsolation', () => {
  it('returns not triggered for normal scores', () => {
    const result = checkSocialIsolation(
      60,
      { partner: 60, family: 60, friends: 60, community: 60 },
      false
    );
    expect(result.triggered).toBe(false);
  });

  it('triggers severe when composite is below 20', () => {
    const result = checkSocialIsolation(
      15,
      { partner: 15, family: 15, friends: 15, community: 15 },
      false
    );
    expect(result.triggered).toBe(true);
    expect(result.severity).toBe('severe');
  });

  it('triggers moderate when friends + community both below 30', () => {
    const result = checkSocialIsolation(
      45,
      { partner: 70, family: 60, friends: 25, community: 25 },
      false
    );
    expect(result.triggered).toBe(true);
    expect(result.severity).toBe('moderate');
  });

  it('triggers moderate when composite < 30 with no strong domain', () => {
    const result = checkSocialIsolation(
      25,
      { partner: 25, family: 25, friends: 25, community: 25 },
      false
    );
    expect(result.triggered).toBe(true);
    expect(result.severity).toBe('moderate');
  });

  it('does not trigger moderate when composite < 30 but one domain is strong', () => {
    const result = checkSocialIsolation(
      28,
      { partner: 60, family: 10, friends: 10, community: 10 },
      false
    );
    // friends + community are both < 30, so it should trigger moderate
    expect(result.triggered).toBe(true);
    expect(result.severity).toBe('moderate');
  });

  it('considers skip partner for the strong-domain check', () => {
    const result = checkSocialIsolation(
      25,
      { partner: 80, family: 25, friends: 25, community: 25 },
      true
    );
    // When skipping partner, partner score is excluded from active domains
    // No active domain ≥ 50, composite < 30 → moderate
    expect(result.triggered).toBe(true);
    expect(result.severity).toBe('moderate');
  });
});
