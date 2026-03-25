 
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  loadHistory,
  saveResult,
  deleteResult,
  clearHistory,
} from '@/components/tools/RelationshipHealthCheck/storage';
import type { RelationshipHealthResult } from '@/components/tools/RelationshipHealthCheck/types';

// ── Mock localStorage ────────────────────────────────────────────────────────

const storage: Record<string, string> = {};

const mockLocalStorage = {
  getItem: vi.fn((key: string) => storage[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { storage[key] = value; }),
  removeItem: vi.fn((key: string) => { delete storage[key]; }),
};

vi.stubGlobal('localStorage', mockLocalStorage);

beforeEach(() => {
  for (const key of Object.keys(storage)) {
    delete storage[key];
  }
  vi.clearAllMocks();
});

// ── V1 format ────────────────────────────────────────────────────────────────

const V1_KEY = 'psychage_relationship_health_v1';
const V2_KEY = 'psychage_relationship_health_v2';

const V1_ITEM = {
  id: 'v1-test-001',
  date: '2025-01-01T00:00:00.000Z',
  compositeScore: 65,
  domainScores: { partner: 70, family: 60, friends: 65, community: 50 },
  tier: 'healthy',
  skipPartner: false,
};

// ── Tests ────────────────────────────────────────────────────────────────────

describe('loadHistory', () => {
  it('returns empty array when no data exists', () => {
    const result = loadHistory();
    expect(result).toEqual([]);
  });

  it('loads V2 data directly', () => {
    const v2Item = {
      id: 'v2-test-001',
      version: 2,
      date: '2026-01-01T00:00:00.000Z',
      compositeScore: 70,
      domainScores: { partner: 80, family: 60, friends: 70, community: 50 },
      subDimensionScores: {
        partner: {
          emotional_responsiveness: 80,
          conflict_quality: 80,
          trust_safety: 80,
          appreciation: 80,
          growth_meaning: 80,
        },
        family: {
          emotional_support: 60,
          acceptance_belonging: 60,
          healthy_communication: 60,
          autonomy_respect: 60,
        },
        friends: {
          depth_authenticity: 70,
          reciprocity_balance: 70,
          connection_presence: 70,
          vulnerability_trust: 70,
        },
        community: {
          belonging_identity: 50,
          active_engagement: 50,
          social_integration: 50,
          purpose_contribution: 50,
        },
      },
      tier: 'healthy',
      skipPartner: false,
      patternKeys: [],
    };
    storage[V2_KEY] = JSON.stringify([v2Item]);

    const result = loadHistory();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('v2-test-001');
    expect(result[0].version).toBe(2);
  });

  it('migrates V1 data to V2 format', () => {
    storage[V1_KEY] = JSON.stringify([V1_ITEM]);

    const result = loadHistory();
    expect(result).toHaveLength(1);
    expect(result[0].version).toBe(2);
    expect(result[0].id).toBe('v1-test-001');
    expect(result[0].compositeScore).toBe(65);
    expect(result[0].patternKeys).toEqual([]);
  });

  it('fills sub-dimension scores from parent domain during migration', () => {
    storage[V1_KEY] = JSON.stringify([V1_ITEM]);

    const result = loadHistory();
    const item = result[0];

    // Sub-dimensions should match parent domain score
    expect(item.subDimensionScores.partner.emotional_responsiveness).toBe(70);
    expect(item.subDimensionScores.partner.conflict_quality).toBe(70);
    expect(item.subDimensionScores.family.emotional_support).toBe(60);
    expect(item.subDimensionScores.friends.depth_authenticity).toBe(65);
    expect(item.subDimensionScores.community.belonging_identity).toBe(50);
  });

  it('removes V1 key after migration', () => {
    storage[V1_KEY] = JSON.stringify([V1_ITEM]);

    loadHistory();

    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(V1_KEY);
  });

  it('saves migrated data to V2 key', () => {
    storage[V1_KEY] = JSON.stringify([V1_ITEM]);

    loadHistory();

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      V2_KEY,
      expect.any(String)
    );
  });

  it('prefers V2 data over V1 if both exist', () => {
    const v2Item = {
      id: 'v2-latest',
      version: 2,
      date: '2026-03-01T00:00:00.000Z',
      compositeScore: 75,
      domainScores: { partner: 80, family: 70, friends: 75, community: 60 },
      subDimensionScores: {
        partner: { emotional_responsiveness: 80, conflict_quality: 80, trust_safety: 80, appreciation: 80, growth_meaning: 80 },
        family: { emotional_support: 70, acceptance_belonging: 70, healthy_communication: 70, autonomy_respect: 70 },
        friends: { depth_authenticity: 75, reciprocity_balance: 75, connection_presence: 75, vulnerability_trust: 75 },
        community: { belonging_identity: 60, active_engagement: 60, social_integration: 60, purpose_contribution: 60 },
      },
      tier: 'healthy',
      skipPartner: false,
      patternKeys: [],
    };
    storage[V2_KEY] = JSON.stringify([v2Item]);
    storage[V1_KEY] = JSON.stringify([V1_ITEM]);

    const result = loadHistory();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('v2-latest');
  });

  it('handles corrupted V1 data gracefully', () => {
    storage[V1_KEY] = 'not json';
    const result = loadHistory();
    expect(result).toEqual([]);
  });

  it('handles corrupted V2 data gracefully', () => {
    storage[V2_KEY] = '{broken}';
    const result = loadHistory();
    expect(result).toEqual([]);
  });
});

describe('saveResult', () => {
  it('saves a result to V2 storage', () => {
    const result: RelationshipHealthResult = {
      id: 'save-test-001',
      version: 2,
      createdAt: '2026-03-16T00:00:00.000Z',
      compositeScore: 70,
      domainScores: { partner: 80, family: 60, friends: 70, community: 50 },
      subDimensionScores: {
        partner: { emotional_responsiveness: 80, conflict_quality: 80, trust_safety: 80, appreciation: 80, growth_meaning: 80 },
        family: { emotional_support: 60, acceptance_belonging: 60, healthy_communication: 60, autonomy_respect: 60 },
        friends: { depth_authenticity: 70, reciprocity_balance: 70, connection_presence: 70, vulnerability_trust: 70 },
        community: { belonging_identity: 50, active_engagement: 50, social_integration: 50, purpose_contribution: 50 },
      },
      tier: 'healthy',
      tierLabel: 'Solid foundation with areas to nurture',
      skipPartner: false,
      answers: {},
      dvAlert: { triggered: false, severity: 'warning' },
      isolationAlert: { triggered: false, severity: 'moderate' },
      patterns: [],
      fourHorsemen: null,
      blueprint: 'Test blueprint text',
    };

    saveResult(result);

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(V2_KEY, expect.any(String));
    const saved = JSON.parse(storage[V2_KEY]);
    expect(saved).toHaveLength(1);
    expect(saved[0].id).toBe('save-test-001');
    expect(saved[0].version).toBe(2);
  });
});

describe('deleteResult', () => {
  it('removes a result by id', () => {
    const items = [
      { id: 'a', version: 2, date: '', compositeScore: 50, domainScores: { partner: 50, family: 50, friends: 50, community: 50 }, subDimensionScores: { partner: {}, family: {}, friends: {}, community: {} }, tier: 'mixed', skipPartner: false, patternKeys: [] },
      { id: 'b', version: 2, date: '', compositeScore: 60, domainScores: { partner: 60, family: 60, friends: 60, community: 60 }, subDimensionScores: { partner: {}, family: {}, friends: {}, community: {} }, tier: 'healthy', skipPartner: false, patternKeys: [] },
    ];
    storage[V2_KEY] = JSON.stringify(items);

    const remaining = deleteResult('a');
    expect(remaining).toHaveLength(1);
    expect(remaining[0].id).toBe('b');
  });
});

describe('clearHistory', () => {
  it('removes both V1 and V2 keys', () => {
    storage[V1_KEY] = '[]';
    storage[V2_KEY] = '[]';

    clearHistory();

    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(V2_KEY);
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(V1_KEY);
  });
});
