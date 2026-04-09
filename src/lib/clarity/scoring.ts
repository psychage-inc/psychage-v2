import type {
  ClarityScoreResult,
  ClarityDomainScores,
  ScoreTier,
  Recommendation,
  ClinicalFlag,
  StrengthInsight,
  DomainKey,
} from './types';
import { DOMAINS } from './questions';

/**
 * Calculate the Clarity Score from raw answers.
 *
 * Instruments & scoring:
 *   PHQ-4 (q1-q4):  0-3 scale, higher = worse. Max raw 12.
 *   WHO-5 (q5-q9):  0-5 scale, 0 = "All of the time" (best), 5 = "At no time" (worst). Max raw 25.
 *   UCLA-3 (q10-q12): 1-3 scale, 1 = best, 3 = worst. Min raw 3, max raw 9.
 *   PSS-4 (q13-q16): 0-4 scale. q14 & q15 reverse-scored. Max symptom score 16.
 *   Custom (q17-q20): 0-4 scale, higher = worse. Max raw 16.
 *
 * Each domain is normalized to 0-20 (higher = better wellbeing).
 * Composite = sum of 5 domains = 0-100.
 */
export function calculateClarityScore(
  answers: Record<string, number>
): ClarityScoreResult {
  // --- Emotional Wellness (PHQ-4) ---
  const gad2 = (answers['q1'] || 0) + (answers['q2'] || 0);
  const phq2 = (answers['q3'] || 0) + (answers['q4'] || 0);
  const phq4Raw = phq2 + gad2; // max 12
  const emotionalDomain = Math.max(0, 20 - (phq4Raw / 12) * 20);

  // --- Cognitive Clarity (WHO-5) ---
  // Stored under key 'vitality' for historical DB compatibility.
  // Options are symptom-scaled: 0 = best mental state, 5 = worst
  const who5SymptomRaw =
    (answers['q5'] || 0) +
    (answers['q6'] || 0) +
    (answers['q7'] || 0) +
    (answers['q8'] || 0) +
    (answers['q9'] || 0); // max 25
  const who5Raw = 25 - who5SymptomRaw; // Invert to wellbeing raw (25 = best)
  const who5Percentage = who5Raw * 4; // 0-100
  const who5Domain = Math.max(0, (who5Percentage / 100) * 20);

  // --- Social Connection (UCLA-3) ---
  // Scale 1-3, min raw = 3, max raw = 9. Lower = better.
  const uclaRaw =
    (answers['q10'] || 1) + (answers['q11'] || 1) + (answers['q12'] || 1);
  const normalizedUcla = uclaRaw - 3; // 0 to 6
  const socialDomain = Math.max(0, 20 - (normalizedUcla / 6) * 20);

  // --- Physical Vitality (PSS-4) ---
  // Stored under key 'cognitive' for historical DB compatibility.
  // q13 & q16 are direct (higher = more stress = worse)
  // q14 & q15 are positive items, reverse-scored: 4 - value
  const pss1 = answers['q13'] || 0;
  const pss2 = 4 - (answers['q14'] !== undefined ? answers['q14'] : 4);
  const pss3 = 4 - (answers['q15'] !== undefined ? answers['q15'] : 4);
  const pss4 = answers['q16'] || 0;
  const pssScore = pss1 + pss2 + pss3 + pss4; // max 16
  const pss4Domain = Math.max(0, 20 - (pssScore / 16) * 20);

  // --- Daily Functioning (Custom) ---
  // 0-4 scale, higher = worse. Max raw 16.
  const funcRaw =
    (answers['q17'] || 0) +
    (answers['q18'] || 0) +
    (answers['q19'] || 0) +
    (answers['q20'] || 0);
  const functioningDomain = Math.max(0, 20 - (funcRaw / 16) * 20);

  // --- Composite ---
  const totalScore = Math.round(
    emotionalDomain +
      who5Domain +
      socialDomain +
      pss4Domain +
      functioningDomain
  );

  // --- Domain scores object ---
  // Key mapping (preserved for historical DB compatibility):
  //   'vitality'  → Cognitive Clarity (WHO-5)
  //   'cognitive'  → Physical Vitality (PSS-4)
  const domainScores: ClarityDomainScores = {
    emotional: Math.round(emotionalDomain * 10) / 10,
    vitality: Math.round(who5Domain * 10) / 10,
    social: Math.round(socialDomain * 10) / 10,
    cognitive: Math.round(pss4Domain * 10) / 10,
    functioning: Math.round(functioningDomain * 10) / 10,
  };

  // --- Clinical flags ---
  const flags: string[] = [];
  const structuredFlags: ClinicalFlag[] = [];
  if (phq2 >= 3) {
    flags.push('Elevated depressive symptoms (PHQ-2 ≥ 3)');
    structuredFlags.push({ label: 'Depressive Symptoms', result: `PHQ-2: ${phq2}/6`, severity: 'elevated' });
  }
  if (gad2 >= 3) {
    flags.push('Elevated anxiety symptoms (GAD-2 ≥ 3)');
    structuredFlags.push({ label: 'Anxiety Symptoms', result: `GAD-2: ${gad2}/6`, severity: 'elevated' });
  }
  if (who5Percentage <= 28) {
    flags.push('Low well-being (WHO-5 ≤ 28%)');
    structuredFlags.push({ label: 'Well-Being Index', result: `WHO-5: ${who5Percentage}%`, severity: 'significant' });
  }
  if (uclaRaw >= 6) {
    flags.push('Significant feelings of loneliness');
    structuredFlags.push({ label: 'Loneliness', result: `UCLA: ${uclaRaw}/9`, severity: 'significant' });
  }

  // --- Strengths & growth areas ---
  const { strengths, growthAreas } = getStrengthsAndGrowth(domainScores);

  // --- Tier label ---
  const { label, tier } = getScoreLabel(totalScore);

  return {
    totalScore,
    domainScores,
    subScores: {
      phq2,
      gad2,
      who5Percentage,
      uclaScore: uclaRaw,
      pssScore,
    },
    rawScores: answers,
    flags,
    structuredFlags,
    strengths,
    growthAreas,
    label,
    tier,
  };
}

export function getScoreLabel(score: number): {
  label: string;
  tier: ScoreTier;
} {
  if (score >= 80) return { label: 'Thriving', tier: 'thriving' };
  if (score >= 60) return { label: 'Balanced', tier: 'balanced' };
  if (score >= 40) return { label: 'Concerning', tier: 'struggling' };
  if (score >= 20) return { label: 'Distressed', tier: 'distressed' };
  return { label: 'Crisis', tier: 'crisis' };
}

export function getScoreTierColor(tier: ScoreTier): {
  text: string;
  bg: string;
  border: string;
} {
  switch (tier) {
    case 'thriving':
      return {
        text: 'text-emerald-500',
        bg: 'bg-emerald-500',
        border: 'border-emerald-500',
      };
    case 'balanced':
      return {
        text: 'text-teal-500',
        bg: 'bg-teal-500',
        border: 'border-teal-500',
      };
    case 'struggling':
      return {
        text: 'text-amber-500',
        bg: 'bg-amber-500',
        border: 'border-amber-500',
      };
    case 'distressed':
      return {
        text: 'text-orange-500',
        bg: 'bg-orange-500',
        border: 'border-orange-500',
      };
    case 'crisis':
      return {
        text: 'text-red-500',
        bg: 'bg-red-500',
        border: 'border-red-500',
      };
  }
}

export function getStrengthsAndGrowth(domainScores: ClarityDomainScores): {
  strengths: string[];
  growthAreas: string[];
} {
  const entries = DOMAINS.map((d) => ({
    name: d.name,
    score: domainScores[d.key],
  }));
  entries.sort((a, b) => b.score - a.score);

  return {
    strengths: [entries[0].name, entries[1].name],
    growthAreas: [entries[entries.length - 1].name, entries[entries.length - 2].name],
  };
}

export function getRecommendations(
  domainScores: ClarityDomainScores
): Recommendation[] {
  const recs: Recommendation[] = [];

  if (domainScores.emotional <= 10) {
    recs.push({
      dimension: 'Emotional Wellness',
      text: 'Your emotional wellness scores suggest you may benefit from professional support.',
      link: '/providers',
      linkLabel: 'Find a Provider',
    });
  }

  if (domainScores.vitality <= 10) {
    recs.push({
      dimension: 'Cognitive Clarity',
      text: 'Your cognitive clarity is low. Mindfulness tools and structured routines may help.',
      link: '/tools',
      linkLabel: 'Explore Wellness Tools',
    });
  }

  if (domainScores.social <= 10) {
    recs.push({
      dimension: 'Social Connection',
      text: 'You may be experiencing isolation. Building connections can make a real difference.',
      link: '/learn',
      linkLabel: 'Read About Social Wellness',
    });
  }

  if (domainScores.cognitive <= 10) {
    recs.push({
      dimension: 'Physical Vitality',
      text: 'Stress levels are elevated. Sleep quality and physical activity tools may help.',
      link: '/tools/sleep-architect',
      linkLabel: 'Try Sleep Architect',
    });
  }

  if (domainScores.functioning <= 10) {
    recs.push({
      dimension: 'Daily Functioning',
      text: 'Daily functioning is impacted. Professional support is recommended.',
      link: '/providers',
      linkLabel: 'Find a Provider',
    });
  }

  if (recs.length === 0) {
    recs.push({
      dimension: 'General',
      text: 'Keep up your wellness routines. Regular self-check-ins help maintain mental health.',
      link: '/tools',
      linkLabel: 'Explore Tools',
    });
  }

  return recs;
}

/**
 * Get the hex color for a given score tier.
 */
export function getTierHexColor(tier: ScoreTier): string {
  const map: Record<ScoreTier, string> = {
    thriving: '#10b981',
    balanced: '#1A9B8C',
    struggling: '#f59e0b',
    distressed: '#f97316',
    crisis: '#ef4444',
  };
  return map[tier];
}

/**
 * Get detailed strengths and growth insights with dimension-specific sentences.
 */
export function getStrengthsAndGrowthDetailed(
  domainScores: ClarityDomainScores
): { strengths: StrengthInsight[]; growthAreas: StrengthInsight[] } {
  const insights: Record<DomainKey, { strength: string; growth: string }> = {
    emotional: {
      strength: 'Your emotional resilience helps you navigate challenges with stability and hope.',
      growth: 'Emotional patterns suggest room for building stronger regulation habits.',
    },
    vitality: {
      strength: 'You maintain a positive outlook with good energy and daily engagement.',
      growth: 'Your well-being indicators suggest exploring routines that restore energy and calm.',
    },
    social: {
      strength: 'Strong social connections provide a meaningful support network.',
      growth: 'Feelings of disconnection may benefit from intentional social engagement.',
    },
    cognitive: {
      strength: 'You manage stress effectively with a healthy sense of control.',
      growth: 'Elevated stress levels indicate a need for structured coping strategies.',
    },
    functioning: {
      strength: 'Daily responsibilities and relationships are well-maintained.',
      growth: 'Functional impact suggests simplifying routines and seeking support.',
    },
  };

  const entries = DOMAINS.map((d) => ({
    name: d.name,
    key: d.key,
    score: domainScores[d.key],
  }));
  entries.sort((a, b) => b.score - a.score);

  return {
    strengths: entries.slice(0, 2).map((e) => ({
      ...e,
      insight: insights[e.key].strength,
    })),
    growthAreas: entries.slice(-2).reverse().map((e) => ({
      ...e,
      insight: insights[e.key].growth,
    })),
  };
}

/**
 * Check for crisis pattern after completing PHQ-4 (questions q1-q4).
 * Returns true if crisis resources should be shown immediately.
 */
export function checkCrisisPattern(answers: Record<string, number>): boolean {
  const phq4Total =
    (answers['q1'] || 0) +
    (answers['q2'] || 0) +
    (answers['q3'] || 0) +
    (answers['q4'] || 0);
  const q4Value = answers['q4'] ?? 0;
  return phq4Total >= 8 || q4Value >= 2;
}
