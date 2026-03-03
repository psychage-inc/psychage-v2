/**
 * CRISIS KEYWORD CORPUS
 *
 * Multilingual keyword database for client-side crisis detection.
 * Minimum languages: EN, ES, FR, DE, BN at launch.
 *
 * Weight system:
 * - 1.0 = Exact phrase match
 * - 0.7 = Partial word match
 * - 0.4 = Semantic proximity (Levenshtein distance)
 *
 * This file must be easily updatable by non-developers.
 */

import type { CrisisKeyword } from '../types/crisis.types';

export const crisisKeywords: CrisisKeyword[] = [
  // ==================== TIER 3 — IMMEDIATE DANGER ====================
  // English
  { keyword: 'kill myself', language: 'en', tier: 3, weight: 1.0 },
  { keyword: 'end my life', language: 'en', tier: 3, weight: 1.0 },
  { keyword: 'want to die', language: 'en', tier: 3, weight: 1.0 },
  { keyword: 'suicide', language: 'en', tier: 3, weight: 1.0 },
  { keyword: 'suicidal', language: 'en', tier: 3, weight: 1.0 },
  { keyword: 'harm myself', language: 'en', tier: 3, weight: 1.0 },
  { keyword: 'hurt myself', language: 'en', tier: 3, weight: 1.0 },
  { keyword: 'no reason to live', language: 'en', tier: 3, weight: 1.0 },

  // Spanish
  { keyword: 'matarme', language: 'es', tier: 3, weight: 1.0 },
  { keyword: 'suicidarme', language: 'es', tier: 3, weight: 1.0 },
  { keyword: 'quiero morir', language: 'es', tier: 3, weight: 1.0 },
  { keyword: 'acabar con mi vida', language: 'es', tier: 3, weight: 1.0 },
  { keyword: 'suicidio', language: 'es', tier: 3, weight: 1.0 },

  // French
  { keyword: 'me suicider', language: 'fr', tier: 3, weight: 1.0 },
  { keyword: 'me tuer', language: 'fr', tier: 3, weight: 1.0 },
  { keyword: 'veux mourir', language: 'fr', tier: 3, weight: 1.0 },
  { keyword: 'suicide', language: 'fr', tier: 3, weight: 1.0 },

  // German
  { keyword: 'umbringen', language: 'de', tier: 3, weight: 1.0 },
  { keyword: 'selbstmord', language: 'de', tier: 3, weight: 1.0 },
  { keyword: 'sterben will', language: 'de', tier: 3, weight: 1.0 },

  // Bengali
  { keyword: 'আত্মহত্যা', language: 'bn', tier: 3, weight: 1.0 },
  { keyword: 'মরতে চাই', language: 'bn', tier: 3, weight: 1.0 },

  // ==================== TIER 2 — ELEVATED DISTRESS ====================
  // English
  { keyword: 'hopeless', language: 'en', tier: 2, weight: 0.9 },
  { keyword: 'worthless', language: 'en', tier: 2, weight: 0.9 },
  { keyword: 'no hope', language: 'en', tier: 2, weight: 0.9 },
  { keyword: 'nobody cares', language: 'en', tier: 2, weight: 0.8 },
  { keyword: 'feel trapped', language: 'en', tier: 2, weight: 0.8 },
  { keyword: 'burden', language: 'en', tier: 2, weight: 0.7 },
  { keyword: 'give up', language: 'en', tier: 2, weight: 0.7 },
  { keyword: 'no way out', language: 'en', tier: 2, weight: 0.8 },

  // Spanish
  { keyword: 'sin esperanza', language: 'es', tier: 2, weight: 0.9 },
  { keyword: 'no vale la pena', language: 'es', tier: 2, weight: 0.8 },
  { keyword: 'atrapado', language: 'es', tier: 2, weight: 0.8 },
  { keyword: 'nadie me quiere', language: 'es', tier: 2, weight: 0.8 },

  // French
  { keyword: 'sans espoir', language: 'fr', tier: 2, weight: 0.9 },
  { keyword: 'désespéré', language: 'fr', tier: 2, weight: 0.9 },
  { keyword: 'personne ne se soucie', language: 'fr', tier: 2, weight: 0.8 },
  { keyword: 'piégé', language: 'fr', tier: 2, weight: 0.8 },

  // German
  { keyword: 'hoffnungslos', language: 'de', tier: 2, weight: 0.9 },
  { keyword: 'wertlos', language: 'de', tier: 2, weight: 0.9 },
  { keyword: 'keine hoffnung', language: 'de', tier: 2, weight: 0.9 },
  { keyword: 'gefangen', language: 'de', tier: 2, weight: 0.8 },

  // Bengali
  { keyword: 'আশাহীন', language: 'bn', tier: 2, weight: 0.9 },
  { keyword: 'কোন আশা নেই', language: 'bn', tier: 2, weight: 0.9 },

  // ==================== TIER 1 — MILD DISTRESS ====================
  // English
  { keyword: 'sad', language: 'en', tier: 1, weight: 0.6 },
  { keyword: 'anxious', language: 'en', tier: 1, weight: 0.6 },
  { keyword: 'depressed', language: 'en', tier: 1, weight: 0.7 },
  { keyword: 'overwhelmed', language: 'en', tier: 1, weight: 0.6 },
  { keyword: 'stressed', language: 'en', tier: 1, weight: 0.5 },
  { keyword: 'lonely', language: 'en', tier: 1, weight: 0.6 },
  { keyword: 'alone', language: 'en', tier: 1, weight: 0.5 },
  { keyword: 'scared', language: 'en', tier: 1, weight: 0.5 },
  { keyword: 'worried', language: 'en', tier: 1, weight: 0.5 },

  // Spanish
  { keyword: 'triste', language: 'es', tier: 1, weight: 0.6 },
  { keyword: 'ansioso', language: 'es', tier: 1, weight: 0.6 },
  { keyword: 'deprimido', language: 'es', tier: 1, weight: 0.7 },
  { keyword: 'solo', language: 'es', tier: 1, weight: 0.6 },
  { keyword: 'estresado', language: 'es', tier: 1, weight: 0.5 },

  // French
  { keyword: 'triste', language: 'fr', tier: 1, weight: 0.6 },
  { keyword: 'anxieux', language: 'fr', tier: 1, weight: 0.6 },
  { keyword: 'déprimé', language: 'fr', tier: 1, weight: 0.7 },
  { keyword: 'seul', language: 'fr', tier: 1, weight: 0.6 },
  { keyword: 'stressé', language: 'fr', tier: 1, weight: 0.5 },

  // German
  { keyword: 'traurig', language: 'de', tier: 1, weight: 0.6 },
  { keyword: 'ängstlich', language: 'de', tier: 1, weight: 0.6 },
  { keyword: 'deprimiert', language: 'de', tier: 1, weight: 0.7 },
  { keyword: 'einsam', language: 'de', tier: 1, weight: 0.6 },
  { keyword: 'gestresst', language: 'de', tier: 1, weight: 0.5 },

  // Bengali
  { keyword: 'দুঃখিত', language: 'bn', tier: 1, weight: 0.6 },
  { keyword: 'চিন্তিত', language: 'bn', tier: 1, weight: 0.6 },
  { keyword: 'একা', language: 'bn', tier: 1, weight: 0.6 },
];

/**
 * Load keywords for a specific language
 */
export function getKeywordsByLanguage(language: string): CrisisKeyword[] {
  return crisisKeywords.filter((kw) => kw.language === language);
}

/**
 * Load keywords for a specific tier
 */
export function getKeywordsByTier(tier: 1 | 2 | 3): CrisisKeyword[] {
  return crisisKeywords.filter((kw) => kw.tier === tier);
}
