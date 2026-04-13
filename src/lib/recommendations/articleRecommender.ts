/**
 * Article recommendation engine.
 * Pure function: takes user signals → returns ranked category slugs.
 * Extends the existing categoryMap pattern from RecommendedArticles.tsx.
 */

const CATEGORY_MAP: Record<string, string> = {
  // Onboarding wellness focus → category slug
  mood: 'emotional-regulation',
  sleep: 'sleep-and-rest',
  stress: 'stress-and-anxiety',
  relationships: 'relationships',
  'self-understanding': 'self-awareness',
  support: 'finding-support',
};

// Navigator condition families → relevant category slugs
const CONDITION_CATEGORY_MAP: Record<string, string[]> = {
  GAD: ['stress-and-anxiety', 'emotional-regulation'],
  MDE: ['depression-grief', 'emotional-regulation'],
  PDD: ['depression-grief', 'self-awareness'],
  SAD: ['stress-and-anxiety', 'relationships'],
  PTSD: ['trauma-healing', 'emotional-regulation'],
  CPTSD: ['trauma-healing', 'relationships'],
  OCD: ['stress-and-anxiety', 'self-awareness'],
  PD: ['stress-and-anxiety', 'emotional-regulation'],
  ADHD: ['self-awareness', 'emotional-regulation'],
  ASD: ['self-awareness', 'relationships'],
  BPD: ['emotional-regulation', 'relationships'],
  BD1: ['emotional-regulation', 'sleep-and-rest'],
  BD2: ['emotional-regulation', 'sleep-and-rest'],
  INS: ['sleep-and-rest', 'stress-and-anxiety'],
  AN: ['emotional-regulation', 'self-awareness'],
  BN: ['emotional-regulation', 'self-awareness'],
  BED: ['emotional-regulation', 'self-awareness'],
};

// Tool usage → relevant category slugs
const TOOL_CATEGORY_MAP: Record<string, string[]> = {
  'mood-journal': ['emotional-regulation', 'self-awareness'],
  'sleep-architect': ['sleep-and-rest'],
  'clarity-journal': ['self-awareness', 'emotional-regulation'],
  'clarity-score': ['emotional-regulation', 'stress-and-anxiety'],
  'symptom-navigator': ['stress-and-anxiety', 'depression-grief'],
  'relationship-health': ['relationships'],
  'medication-tracker': ['finding-support'],
};

interface RecommendationSignals {
  wellnessFocus?: string[] | null;
  navigatorConditions?: string[];
  recentToolSlugs?: string[];
  readArticleSlugs?: string[];
}

export function getRecommendedCategories(signals: RecommendationSignals): string[] {
  const scored: Record<string, number> = {};

  const boost = (slug: string, weight: number) => {
    scored[slug] = (scored[slug] || 0) + weight;
  };

  // 1. Navigator conditions — strongest signal (weight 3)
  if (signals.navigatorConditions) {
    for (const conditionId of signals.navigatorConditions) {
      // Extract family prefix (e.g., "GAD" from "GAD_001")
      const family = conditionId.split('_')[0];
      const cats = CONDITION_CATEGORY_MAP[family];
      if (cats) {
        cats.forEach((c) => boost(c, 3));
      }
    }
  }

  // 2. Wellness focus — secondary signal (weight 2)
  if (signals.wellnessFocus) {
    for (const focus of signals.wellnessFocus) {
      const cat = CATEGORY_MAP[focus];
      if (cat) boost(cat, 2);
    }
  }

  // 3. Tool usage — tertiary signal (weight 1)
  if (signals.recentToolSlugs) {
    for (const tool of signals.recentToolSlugs) {
      const cats = TOOL_CATEGORY_MAP[tool];
      if (cats) {
        cats.forEach((c) => boost(c, 1));
      }
    }
  }

  // Sort by score descending, return slugs
  return Object.entries(scored)
    .sort((a, b) => b[1] - a[1])
    .map(([slug]) => slug);
}
