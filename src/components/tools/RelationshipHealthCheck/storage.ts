import type { RelationshipHealthResult, RelationshipHistoryItem } from './types';

const STORAGE_KEY = 'psychage_relationship_health_v1';

export function saveResult(result: RelationshipHealthResult): void {
  try {
    const history = loadHistory();
    const item: RelationshipHistoryItem = {
      id: result.id,
      date: result.createdAt,
      compositeScore: result.compositeScore,
      domainScores: result.domainScores,
      tier: result.tier,
      skipPartner: result.skipPartner,
    };
    history.unshift(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Silently ignore (storage full or private browsing)
  }
}

export function loadHistory(): RelationshipHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function deleteResult(id: string): RelationshipHistoryItem[] {
  const history = loadHistory().filter((h) => h.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Silently ignore
  }
  return history;
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
