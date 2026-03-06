import { CRISIS_KEYWORDS } from './types';

export function scanForCrisisKeywords(text: string): {
  detected: boolean;
  matchedKeywords: string[];
} {
  const lower = text.toLowerCase();
  const matched = CRISIS_KEYWORDS.filter(kw => lower.includes(kw));
  return { detected: matched.length > 0, matchedKeywords: matched };
}
