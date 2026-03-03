/**
 * CRISIS DETECTION HOOK
 *
 * 100% CLIENT-SIDE DETECTION — MANDATORY, NON-NEGOTIABLE
 * Raw user text NEVER leaves the browser during detection phase.
 *
 * Performance requirement: <50ms for any input
 * Detection runs on onChange (300ms debounce) + onSubmit (safety net)
 */

import { useState, useCallback } from 'react';
import type { CrisisDetectionResult } from '../types/crisis.types';
import { crisisKeywords } from '../data/crisisKeywords';

/**
 * Detect false positives in crisis keyword detection
 * Examples: "I died laughing", "I could kill for coffee", "my business is dying"
 */
function detectFalsePositive(text: string, keyword: string): boolean {
  const falsePositivePatterns = [
    // "died/dying" in casual expressions
    /died (laughing|from|of laughter)/i,
    /dying (laughing|of laughter|from)/i,
    /(my|the) (business|company|startup|project|idea) is dying/i,
    /battery is dying/i,
    /phone is dying/i,

    // "kill" in casual expressions
    /kill for (a|some|the) (coffee|drink|food|pizza|burger)/i,
    /killing it/i, // positive expression
    /killed the (game|presentation|interview)/i, // positive

    // "hurt/harm" in non-self context
    /hurt (someone|them|him|her|anybody|anyone)/i,
    /harm (someone|them|him|her|anybody|anyone)/i,
  ];

  return falsePositivePatterns.some(pattern => pattern.test(text));
}

interface UseCrisisDetectionReturn {
  detect: (text: string) => CrisisDetectionResult;
  lastResult: CrisisDetectionResult | null;
  reset: () => void;
}

export function useCrisisDetection(locale: string): UseCrisisDetectionReturn {
  const [lastResult, setLastResult] = useState<CrisisDetectionResult | null>(null);

  const detect = useCallback((text: string): CrisisDetectionResult => {
    const startTime = performance.now();
    const normalizedText = text.toLowerCase().trim();

    // Early return for empty text
    if (!normalizedText) {
      return {
        tier: 0,
        confidence: 0,
        matchedKeywords: [],
        language: locale,
        shouldShowEmergencyModal: false,
        shouldShowCrisisBanner: false,
        shouldShowGentleCheckin: false,
      };
    }

    // Filter keywords by locale (and fallback to 'en' if locale not found)
    const localeKeywords = crisisKeywords.filter(
      kw => kw.language === locale || (locale.startsWith(kw.language + '-'))
    );
    const fallbackKeywords = locale !== 'en'
      ? crisisKeywords.filter(kw => kw.language === 'en')
      : [];
    const activeKeywords = localeKeywords.length > 0 ? localeKeywords : fallbackKeywords;

    // Scan for keyword matches
    const matches: Array<{ keyword: string; tier: number; weight: number }> = [];

    for (const { keyword, tier, weight } of activeKeywords) {
      // Check for exact phrase match
      if (normalizedText.includes(keyword.toLowerCase())) {
        // Avoid false positives like "I died laughing" or "I could kill for coffee"
        const isFalsePositive = detectFalsePositive(normalizedText, keyword);
        if (!isFalsePositive) {
          matches.push({ keyword, tier, weight });
        }
      }
    }

    // Calculate tier (highest matched tier wins)
    let detectedTier: 0 | 1 | 2 | 3 = 0;
    let totalWeight = 0;

    if (matches.length > 0) {
      detectedTier = Math.max(...matches.map(m => m.tier)) as 1 | 2 | 3;
      totalWeight = matches.reduce((sum, m) => sum + m.weight, 0);
    }

    // Calculate confidence (0-1 scale, capped at 0.95)
    const confidence = Math.min(totalWeight / matches.length || 0, 0.95);

    // Determine UI actions
    const shouldShowEmergencyModal = detectedTier === 3;
    const shouldShowCrisisBanner = detectedTier >= 2;
    const shouldShowGentleCheckin = detectedTier === 1;

    const result: CrisisDetectionResult = {
      tier: detectedTier,
      confidence,
      matchedKeywords: matches.map(m => m.keyword),
      language: locale,
      shouldShowEmergencyModal,
      shouldShowCrisisBanner,
      shouldShowGentleCheckin,
    };

    const elapsedTime = performance.now() - startTime;

    // Log warning if detection takes > 50ms (requirement)
    if (elapsedTime > 50) {
      console.warn(`⚠️ Crisis detection took ${elapsedTime.toFixed(2)}ms (threshold: 50ms)`);
    }

    setLastResult(result);
    return result;
  }, [locale]);

  const reset = useCallback(() => {
    setLastResult(null);
  }, []);

  return { detect, lastResult, reset };
}
