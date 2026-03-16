/**
 * Crisis keyword detection — shared safety utility.
 * Used by ClarityJournal FreeForm section for real-time text scanning.
 */

export const CRISIS_KEYWORDS: string[] = [
  'kill myself', 'end my life', 'suicide', 'want to die',
  'better off dead', 'no reason to live', 'end it all',
  'self-harm', 'hurt myself', 'cutting myself',
  // Spanish
  'matarme', 'suicidarme', 'quiero morir',
  // French
  'me tuer', 'me suicider', 'envie de mourir',
];

export function scanForCrisisKeywords(text: string): {
  detected: boolean;
  matchedKeywords: string[];
} {
  const lower = text.toLowerCase();
  const matched = CRISIS_KEYWORDS.filter(kw => lower.includes(kw));
  return { detected: matched.length > 0, matchedKeywords: matched };
}
