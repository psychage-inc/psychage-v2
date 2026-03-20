import type {
  RelationshipHealthResult,
  RelationshipHistoryItem,
} from './types';

const V1_KEY = 'psychage_relationship_health_v1';
const V2_KEY = 'psychage_relationship_health_v2';

// ── V1 types (for migration) ────────────────────────────────────────────────

interface V1HistoryItem {
  id: string;
  date: string;
  compositeScore: number;
  domainScores: { partner: number; family: number; friends: number; community: number };
  tier: string;
  skipPartner: boolean;
}

// ── Migration ───────────────────────────────────────────────────────────────

/**
 * Migrate a V1 history item to V2 format.
 * Sub-dimension scores are approximated from parent domain scores.
 * Pattern keys are empty (cannot retroactively detect).
 */
function migrateV1Item(item: V1HistoryItem): RelationshipHistoryItem {
  const ds = item.domainScores;
  return {
    id: item.id,
    version: 2,
    date: item.date,
    compositeScore: item.compositeScore,
    domainScores: ds,
    subDimensionScores: {
      partner: {
        emotional_responsiveness: ds.partner,
        conflict_quality: ds.partner,
        trust_safety: ds.partner,
        appreciation: ds.partner,
        growth_meaning: ds.partner,
      },
      family: {
        emotional_support: ds.family,
        acceptance_belonging: ds.family,
        healthy_communication: ds.family,
        autonomy_respect: ds.family,
      },
      friends: {
        depth_authenticity: ds.friends,
        reciprocity_balance: ds.friends,
        connection_presence: ds.friends,
        vulnerability_trust: ds.friends,
      },
      community: {
        belonging_identity: ds.community,
        active_engagement: ds.community,
        social_integration: ds.community,
        purpose_contribution: ds.community,
      },
    },
    tier: item.tier as RelationshipHistoryItem['tier'],
    skipPartner: item.skipPartner,
    patternKeys: [],
  };
}

function tryLoadV1(): V1HistoryItem[] | null {
  try {
    const raw = localStorage.getItem(V1_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function tryLoadV2(): RelationshipHistoryItem[] | null {
  try {
    const raw = localStorage.getItem(V2_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveHistoryRaw(history: RelationshipHistoryItem[]): void {
  try {
    localStorage.setItem(V2_KEY, JSON.stringify(history));
  } catch {
    // Silently ignore (storage full or private browsing)
  }
}

// ── Public API ──────────────────────────────────────────────────────────────

export function loadHistory(): RelationshipHistoryItem[] {
  // Try v2 first
  const v2 = tryLoadV2();
  if (v2 && v2.length > 0) return v2;

  // Migrate v1 if exists
  const v1 = tryLoadV1();
  if (v1 && v1.length > 0) {
    const migrated = v1.map(migrateV1Item);
    saveHistoryRaw(migrated);
    try {
      localStorage.removeItem(V1_KEY);
    } catch {
      // Ignore
    }
    return migrated;
  }

  return [];
}

export function saveResult(result: RelationshipHealthResult): void {
  try {
    const history = loadHistory();
    const item: RelationshipHistoryItem = {
      id: result.id,
      version: 2,
      date: result.createdAt,
      compositeScore: result.compositeScore,
      domainScores: result.domainScores,
      subDimensionScores: result.subDimensionScores,
      tier: result.tier,
      skipPartner: result.skipPartner,
      patternKeys: result.patterns.map((p) => p.key),
    };
    history.unshift(item);
    saveHistoryRaw(history);
  } catch {
    // Silently ignore
  }
}

export function deleteResult(id: string): RelationshipHistoryItem[] {
  const history = loadHistory().filter((h) => h.id !== id);
  saveHistoryRaw(history);
  return history;
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(V2_KEY);
    localStorage.removeItem(V1_KEY);
  } catch {
    // Silently ignore
  }
}
