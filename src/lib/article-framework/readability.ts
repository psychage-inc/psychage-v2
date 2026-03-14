// ============================================================================
// Psychage Evidence-Based Article Framework (PEAF) — Readability Analysis
//
// Pure TypeScript implementation of Flesch-Kincaid readability metrics.
// No external dependencies — syllable counting uses a heuristic approach
// that is accurate enough for health content quality gating.
// ============================================================================

import type { ReadabilityResult } from './types';

// ---------------------------------------------------------------------------
// Syllable Counting
// ---------------------------------------------------------------------------

/**
 * Counts syllables in an English word using a heuristic approach.
 * Based on the algorithm from:
 *   - Count vowel groups as syllable nuclei
 *   - Subtract silent-e endings
 *   - Handle common suffixes (-le, -es, -ed)
 *   - Minimum 1 syllable per word
 */
function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length <= 2) return 1;

  // Common exceptions
  const exceptions: Record<string, number> = {
    area: 3, idea: 3, real: 2, being: 2, doing: 2,
    going: 2, having: 2, create: 2, every: 3, different: 3,
    science: 2, people: 2, schizophrenia: 5, anxiety: 4,
    depression: 3, bipolar: 3, diagnosis: 4, cognitive: 3,
    behavioral: 4, therapeutic: 4, psychiatric: 4, psychological: 5,
    dissociative: 5, obsessive: 3, compulsive: 3, medication: 4,
    treatment: 2, evidence: 3, experience: 4, disorder: 3,
  };
  if (exceptions[w] !== undefined) return exceptions[w];

  let count = 0;
  const vowels = 'aeiouy';
  let prevVowel = false;

  for (let i = 0; i < w.length; i++) {
    const isVowel = vowels.includes(w[i]);
    if (isVowel && !prevVowel) {
      count++;
    }
    prevVowel = isVowel;
  }

  // Silent e at end (but not -le)
  if (w.endsWith('e') && !w.endsWith('le') && count > 1) {
    count--;
  }

  // -ed endings that don't add a syllable (e.g., "worked" but not "created")
  if (w.endsWith('ed') && !w.endsWith('ted') && !w.endsWith('ded') && count > 1) {
    count--;
  }

  // -es endings that don't add a syllable
  if (w.endsWith('es') && !w.endsWith('ses') && !w.endsWith('zes') && !w.endsWith('ces') && !w.endsWith('xes') && count > 1) {
    count--;
  }

  return Math.max(1, count);
}

// ---------------------------------------------------------------------------
// Text Parsing
// ---------------------------------------------------------------------------

/** Splits text into words, filtering out empty strings and pure punctuation */
function getWords(text: string): string[] {
  return text
    .replace(/[—–]/g, ' ') // em/en dashes to spaces
    .split(/\s+/)
    .map((w) => w.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '')) // strip leading/trailing punctuation
    .filter((w) => w.length > 0 && /[a-zA-Z]/.test(w));
}

/** Splits text into sentences using punctuation boundaries */
function getSentences(text: string): string[] {
  // Split on sentence-ending punctuation followed by space or end-of-string
  const sentences = text
    .replace(/\n{2,}/g, '. ') // paragraph breaks count as sentence breaks
    .split(/[.!?]+(?:\s|$)/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return sentences.length > 0 ? sentences : [''];
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Analyzes readability of plain text content.
 *
 * Returns Flesch Reading Ease and Flesch-Kincaid Grade Level scores along
 * with component metrics (word count, sentence count, syllable count).
 *
 * Target for Psychage articles: FK Grade Level ≤ 8.0 (6th–8th grade reading level)
 */
export function analyzeReadability(text: string): ReadabilityResult {
  const words = getWords(text);
  const sentences = getSentences(text);
  const wordCount = words.length;
  const sentenceCount = Math.max(1, sentences.length);
  const syllableCount = words.reduce((sum, w) => sum + countSyllables(w), 0);

  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = wordCount > 0 ? syllableCount / wordCount : 0;

  // Flesch Reading Ease: 206.835 - 1.015 × (words/sentences) - 84.6 × (syllables/words)
  const fleschReadingEase = Math.max(
    0,
    Math.min(100, 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord),
  );

  // Flesch-Kincaid Grade Level: 0.39 × (words/sentences) + 11.8 × (syllables/words) - 15.59
  const fleschKincaidGrade = Math.max(
    0,
    0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59,
  );

  return {
    fleschReadingEase: Math.round(fleschReadingEase * 10) / 10,
    fleschKincaidGrade: Math.round(fleschKincaidGrade * 10) / 10,
    wordCount,
    sentenceCount,
    syllableCount,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
  };
}
