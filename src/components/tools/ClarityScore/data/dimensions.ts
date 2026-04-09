import { Heart, Brain, Users, Zap, Activity } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { DomainKey, ScoreTier } from '@/lib/clarity/types';

export interface DimensionMeta {
  key: DomainKey;
  name: string;
  shortName: string;
  icon: LucideIcon;
  hexColor: string;
  tailwindBg: string;
  tailwindText: string;
  tailwindBgLight: string;
  instrument: string;
  instrumentFull: string;
  description: string;
}

/**
 * Enriched dimension metadata for the results dashboard.
 *
 * IMPORTANT: The domain key mapping is inherited from the scoring engine
 * and MUST be preserved exactly:
 *   key 'vitality'  → "Cognitive Clarity" (WHO-5)
 *   key 'cognitive'  → "Physical Vitality" (PSS-4)
 */
export const DIMENSION_META: Record<DomainKey, DimensionMeta> = {
  emotional: {
    key: 'emotional',
    name: 'Emotional Wellness',
    shortName: 'Emotional',
    icon: Heart,
    hexColor: '#1A9B8C',
    tailwindBg: 'bg-teal-500',
    tailwindText: 'text-teal-500',
    tailwindBgLight: 'bg-teal-50 dark:bg-teal-900/20',
    instrument: 'PHQ-4',
    instrumentFull: 'Patient Health Questionnaire-4 (Depression & Anxiety)',
    description:
      'Measures mood stability, emotional regulation, capacity for joy, and levels of hope and optimism. Based on the PHQ-4, a validated screener for depression and anxiety symptoms.',
  },
  vitality: {
    key: 'vitality',
    name: 'Cognitive Clarity',
    shortName: 'Cognitive',
    icon: Brain,
    hexColor: '#6366f1',
    tailwindBg: 'bg-indigo-500',
    tailwindText: 'text-indigo-500',
    tailwindBgLight: 'bg-indigo-50 dark:bg-indigo-900/20',
    instrument: 'WHO-5',
    instrumentFull: 'World Health Organization Well-Being Index (WHO-5)',
    description:
      'Assesses general psychological well-being, including cheerfulness, calm, energy, restfulness, and daily interest. The WHO-5 is one of the most widely used measures of subjective well-being.',
  },
  social: {
    key: 'social',
    name: 'Social Connection',
    shortName: 'Social',
    icon: Users,
    hexColor: '#ec4899',
    tailwindBg: 'bg-pink-500',
    tailwindText: 'text-pink-500',
    tailwindBgLight: 'bg-pink-50 dark:bg-pink-900/20',
    instrument: 'UCLA-3',
    instrumentFull: 'UCLA 3-Item Loneliness Scale',
    description:
      'Measures perceived social isolation, feelings of being left out, and lack of companionship. The UCLA Loneliness Scale is the gold standard for assessing loneliness in research and clinical settings.',
  },
  cognitive: {
    key: 'cognitive',
    name: 'Physical Vitality',
    shortName: 'Physical',
    icon: Zap,
    hexColor: '#f59e0b',
    tailwindBg: 'bg-amber-500',
    tailwindText: 'text-amber-500',
    tailwindBgLight: 'bg-amber-50 dark:bg-amber-900/20',
    instrument: 'PSS-4',
    instrumentFull: 'Perceived Stress Scale (PSS-4)',
    description:
      'Evaluates perceived stress levels, sense of control, confidence in handling problems, and whether difficulties feel manageable. The PSS-4 captures how stressful life feels rather than counting stressors.',
  },
  functioning: {
    key: 'functioning',
    name: 'Daily Functioning',
    shortName: 'Functioning',
    icon: Activity,
    hexColor: '#10b981',
    tailwindBg: 'bg-emerald-500',
    tailwindText: 'text-emerald-500',
    tailwindBgLight: 'bg-emerald-50 dark:bg-emerald-900/20',
    instrument: 'Custom',
    instrumentFull: 'WHODAS-adapted Daily Functioning Items',
    description:
      'Assesses how much symptoms interfere with daily life, relationships, responsibilities, and physical health. Adapted from the WHO Disability Assessment Schedule to capture functional impact.',
  },
};

/** Consistent iteration order for dimensions */
export const DIMENSION_ORDER: DomainKey[] = [
  'emotional',
  'vitality',
  'social',
  'cognitive',
  'functioning',
];

/**
 * Assign a tier to a per-dimension score (0–20 scale).
 * Boundaries mirror the composite tiers proportionally.
 */
export function getDimensionTier(score: number): ScoreTier {
  if (score >= 16) return 'thriving';
  if (score >= 12) return 'balanced';
  if (score >= 8) return 'struggling';
  if (score >= 4) return 'distressed';
  return 'crisis';
}

const TIER_DISPLAY: Record<ScoreTier, string> = {
  thriving: 'Thriving',
  balanced: 'Balanced',
  struggling: 'Concerning',
  distressed: 'Distressed',
  crisis: 'Crisis',
};

/** Human-readable label for a dimension tier */
export function getDimensionTierLabel(score: number): string {
  const tier = getDimensionTier(score);
  return TIER_DISPLAY[tier];
}
