import type { ToolSlug, ToolSignal, ToolRecommendationItem } from './types';

const TOOL_REGISTRY: Record<
  ToolSlug,
  { title: string; path: string; iconName: string; color: string; description: string }
> = {
  'mood-journal': {
    title: 'Mood Journal',
    path: '/tools/mood-journal',
    iconName: 'PenTool',
    color: 'amber',
    description: 'Track your emotional patterns over time',
  },
  'sleep-architect': {
    title: 'Sleep Architect',
    path: '/tools/sleep-architect',
    iconName: 'Moon',
    color: 'indigo',
    description: 'Optimize your rest with personalized sleep plans',
  },
  'clarity-journal': {
    title: 'Clarity Journal',
    path: '/tools/clarity-journal',
    iconName: 'NotebookPen',
    color: 'teal',
    description: 'Structured journaling with mood tracking and insights',
  },
  'clarity-score': {
    title: 'Clarity Score',
    path: '/clarity-score',
    iconName: 'BrainCircuit',
    color: 'teal',
    description: 'Assess your current mental well-being',
  },
  'symptom-navigator': {
    title: 'Symptom Navigator',
    path: '/tools/symptom-navigator',
    iconName: 'BrainCircuit',
    color: 'indigo',
    description: 'Explore symptoms and find possible conditions',
  },
  'relationship-health': {
    title: 'Relationship Health Check',
    path: '/tools/relationship-health',
    iconName: 'HeartHandshake',
    color: 'rose',
    description: 'Measure relationship health across life domains',
  },
  'medication-tracker': {
    title: 'Medication Tracker',
    path: '/tools/medication-tracker',
    iconName: 'Pill',
    color: 'teal',
    description: 'Track medications, doses, and adherence',
  },
  mindmate: {
    title: 'MindMate AI',
    path: '/tools/mindmate',
    iconName: 'BrainCircuit',
    color: 'teal',
    description: 'AI-powered mental health companion',
  },
  'provider-finder': {
    title: 'Find a Provider',
    path: '/providers/search',
    iconName: 'Users',
    color: 'rose',
    description: 'Connect with licensed therapists near you',
  },
  'crisis-support': {
    title: 'Crisis Support',
    path: '/crisis',
    iconName: 'ShieldAlert',
    color: 'red',
    description: 'Immediate access to emergency resources',
  },
};

interface RecommendationRule {
  condition: (signal: ToolSignal) => boolean;
  recommend: ToolSlug;
  reason: string;
  priority: number;
}

const RULES: RecommendationRule[] = [
  // --- Mood Journal rules ---
  {
    condition: (s) => s.toolSlug === 'mood-journal' && (s.moodScore ?? 10) <= 3,
    recommend: 'sleep-architect',
    reason: 'Low mood often correlates with sleep disruption',
    priority: 1,
  },
  {
    condition: (s) => s.toolSlug === 'mood-journal' && (s.moodScore ?? 10) <= 3,
    recommend: 'symptom-navigator',
    reason: 'Persistent low mood may warrant further exploration',
    priority: 2,
  },
  {
    condition: (s) => s.toolSlug === 'mood-journal' && (s.moodScore ?? 10) <= 3,
    recommend: 'provider-finder',
    reason: 'A professional can help with difficult periods',
    priority: 3,
  },
  {
    condition: (s) => s.toolSlug === 'mood-journal' && (s.moodScore ?? 0) >= 7,
    recommend: 'clarity-score',
    reason: 'Great mood — capture a wellness snapshot',
    priority: 1,
  },
  {
    condition: (s) => s.toolSlug === 'mood-journal' && (s.moodScore ?? 0) >= 7,
    recommend: 'clarity-journal',
    reason: 'Record what contributed to today\'s positive mood',
    priority: 2,
  },
  {
    condition: (s) => s.toolSlug === 'mood-journal' && (s.moodScore ?? 5) > 3 && (s.moodScore ?? 5) < 7,
    recommend: 'clarity-journal',
    reason: 'Journaling helps identify patterns in your mood',
    priority: 1,
  },
  {
    condition: (s) => s.toolSlug === 'mood-journal' && (s.moodScore ?? 5) > 3 && (s.moodScore ?? 5) < 7,
    recommend: 'sleep-architect',
    reason: 'Track how sleep affects your daily mood',
    priority: 2,
  },
  {
    condition: (s) => s.toolSlug === 'mood-journal' && (s.moodScore ?? 5) > 3 && (s.moodScore ?? 5) < 7,
    recommend: 'clarity-score',
    reason: 'See how your mood fits into your overall wellness',
    priority: 3,
  },

  // --- Sleep Architect rules ---
  {
    condition: (s) => s.toolSlug === 'sleep-architect',
    recommend: 'mood-journal',
    reason: 'Track how sleep affects your daily mood',
    priority: 1,
  },
  {
    condition: (s) => s.toolSlug === 'sleep-architect',
    recommend: 'clarity-score',
    reason: 'Your sleep data feeds into the Sleep Quality dimension',
    priority: 2,
  },
  {
    condition: (s) => s.toolSlug === 'sleep-architect',
    recommend: 'clarity-journal',
    reason: 'Journal about factors affecting your sleep',
    priority: 3,
  },

  // --- Clarity Journal rules ---
  {
    condition: (s) => s.toolSlug === 'clarity-journal',
    recommend: 'clarity-score',
    reason: 'See how your journal entries reflect in your overall score',
    priority: 1,
  },
  {
    condition: (s) => s.toolSlug === 'clarity-journal',
    recommend: 'mood-journal',
    reason: 'Quick daily mood check-ins complement journaling',
    priority: 2,
  },
  {
    condition: (s) => s.toolSlug === 'clarity-journal',
    recommend: 'sleep-architect',
    reason: 'Sleep quality influences the patterns you journal about',
    priority: 3,
  },

  // --- Clarity Score rules ---
  {
    condition: (s) => s.toolSlug === 'clarity-score' && (s.clarityScore ?? 100) < 40,
    recommend: 'provider-finder',
    reason: 'A professional can help you build a support plan',
    priority: 1,
  },
  {
    condition: (s) => s.toolSlug === 'clarity-score' && (s.clarityScore ?? 100) < 40,
    recommend: 'symptom-navigator',
    reason: 'Explore specific symptoms for deeper insight',
    priority: 2,
  },
  {
    condition: (s) => s.toolSlug === 'clarity-score' && (s.clarityScore ?? 100) < 40,
    recommend: 'mood-journal',
    reason: 'Track your mood daily to identify what helps',
    priority: 3,
  },
  {
    condition: (s) => s.toolSlug === 'clarity-score' && (s.clarityScore ?? 0) >= 40 && (s.clarityScore ?? 0) < 70,
    recommend: 'mood-journal',
    reason: 'Track your mood to build on your foundation',
    priority: 1,
  },
  {
    condition: (s) => s.toolSlug === 'clarity-score' && (s.clarityScore ?? 0) >= 40 && (s.clarityScore ?? 0) < 70,
    recommend: 'sleep-architect',
    reason: 'Better sleep can help strengthen your wellness',
    priority: 2,
  },
  {
    condition: (s) => s.toolSlug === 'clarity-score' && (s.clarityScore ?? 0) >= 40 && (s.clarityScore ?? 0) < 70,
    recommend: 'clarity-journal',
    reason: 'Journaling helps identify what\'s working for you',
    priority: 3,
  },
  {
    condition: (s) => s.toolSlug === 'clarity-score' && (s.clarityScore ?? 0) >= 70,
    recommend: 'clarity-journal',
    reason: 'Maintain your wellness momentum with structured journaling',
    priority: 1,
  },
  {
    condition: (s) => s.toolSlug === 'clarity-score' && (s.clarityScore ?? 0) >= 70,
    recommend: 'mood-journal',
    reason: 'Continue tracking for long-term patterns',
    priority: 2,
  },
  {
    condition: (s) => s.toolSlug === 'clarity-score' && (s.clarityScore ?? 0) >= 70,
    recommend: 'relationship-health',
    reason: 'Strong personal wellness — check your relationship health too',
    priority: 3,
  },

  // --- Symptom Navigator rules ---
  {
    condition: (s) => s.toolSlug === 'symptom-navigator' && s.hasSafetyFlags === true,
    recommend: 'crisis-support',
    reason: 'Immediate support is available for you right now',
    priority: 0,
  },
  {
    condition: (s) => s.toolSlug === 'symptom-navigator' && s.hasSafetyFlags === true,
    recommend: 'provider-finder',
    reason: 'Connect with a professional who can help',
    priority: 1,
  },
  {
    condition: (s) => s.toolSlug === 'symptom-navigator' && s.hasSafetyFlags !== true,
    recommend: 'mood-journal',
    reason: 'Track the symptoms you identified over time',
    priority: 1,
  },
  {
    condition: (s) => s.toolSlug === 'symptom-navigator' && s.hasSafetyFlags !== true,
    recommend: 'provider-finder',
    reason: 'Discuss your results with a professional',
    priority: 2,
  },
  {
    condition: (s) => s.toolSlug === 'symptom-navigator' && s.hasSafetyFlags !== true,
    recommend: 'clarity-journal',
    reason: 'Journal to understand your symptom patterns',
    priority: 3,
  },

  // --- Relationship Health rules ---
  {
    condition: (s) => s.toolSlug === 'relationship-health' && (s.relationshipScore ?? 100) < 40,
    recommend: 'provider-finder',
    reason: 'A professional can support your relationship growth',
    priority: 1,
  },
  {
    condition: (s) => s.toolSlug === 'relationship-health' && (s.relationshipScore ?? 100) < 40,
    recommend: 'symptom-navigator',
    reason: 'Relationship stress may connect to other patterns',
    priority: 2,
  },
  {
    condition: (s) => s.toolSlug === 'relationship-health' && (s.relationshipScore ?? 100) < 40,
    recommend: 'mood-journal',
    reason: 'Track how your relationships affect your daily mood',
    priority: 3,
  },
  {
    condition: (s) => s.toolSlug === 'relationship-health' && (s.relationshipScore ?? 0) >= 40 && (s.relationshipScore ?? 0) < 70,
    recommend: 'clarity-journal',
    reason: 'Journal about your relationship insights',
    priority: 1,
  },
  {
    condition: (s) => s.toolSlug === 'relationship-health' && (s.relationshipScore ?? 0) >= 40 && (s.relationshipScore ?? 0) < 70,
    recommend: 'mood-journal',
    reason: 'Track emotional patterns in your relationships',
    priority: 2,
  },
  {
    condition: (s) => s.toolSlug === 'relationship-health' && (s.relationshipScore ?? 0) >= 40 && (s.relationshipScore ?? 0) < 70,
    recommend: 'clarity-score',
    reason: 'See how relationships fit into your overall wellness',
    priority: 3,
  },
  {
    condition: (s) => s.toolSlug === 'relationship-health' && (s.relationshipScore ?? 0) >= 70,
    recommend: 'clarity-journal',
    reason: 'Capture what makes your relationships strong',
    priority: 1,
  },
  {
    condition: (s) => s.toolSlug === 'relationship-health' && (s.relationshipScore ?? 0) >= 70,
    recommend: 'mood-journal',
    reason: 'Track how healthy relationships boost your mood',
    priority: 2,
  },
  {
    condition: (s) => s.toolSlug === 'relationship-health' && (s.relationshipScore ?? 0) >= 70,
    recommend: 'sleep-architect',
    reason: 'Strong relationships support better sleep',
    priority: 3,
  },

  // --- Medication Tracker rules ---
  {
    condition: (s) => s.toolSlug === 'medication-tracker' && (s.medAdherence ?? 0) >= 80,
    recommend: 'mood-journal',
    reason: 'Track how medication affects your daily mood',
    priority: 1,
  },
  {
    condition: (s) => s.toolSlug === 'medication-tracker' && (s.medAdherence ?? 0) >= 80,
    recommend: 'sleep-architect',
    reason: 'Monitor sleep patterns alongside medication',
    priority: 2,
  },
  {
    condition: (s) => s.toolSlug === 'medication-tracker' && (s.medAdherence ?? 0) >= 80,
    recommend: 'clarity-score',
    reason: 'Great adherence — see how it reflects in your wellness',
    priority: 3,
  },
  {
    condition: (s) => s.toolSlug === 'medication-tracker' && (s.medAdherence ?? 100) < 80,
    recommend: 'clarity-journal',
    reason: 'Journal about barriers to staying on track',
    priority: 1,
  },
  {
    condition: (s) => s.toolSlug === 'medication-tracker' && (s.medAdherence ?? 100) < 80,
    recommend: 'provider-finder',
    reason: 'Discuss medication challenges with your provider',
    priority: 2,
  },
  {
    condition: (s) => s.toolSlug === 'medication-tracker' && (s.medAdherence ?? 100) < 80,
    recommend: 'mood-journal',
    reason: 'Track how missed doses affect your mood',
    priority: 3,
  },
];

const MAX_RECOMMENDATIONS = 3;

export function getRecommendations(signal: ToolSignal): ToolRecommendationItem[] {
  const applicable = RULES.filter((rule) => rule.condition(signal));

  const seen = new Set<ToolSlug>();
  const deduplicated: (RecommendationRule & { tool: (typeof TOOL_REGISTRY)[ToolSlug] })[] = [];

  for (const rule of applicable) {
    if (seen.has(rule.recommend) || rule.recommend === signal.toolSlug) continue;
    const tool = TOOL_REGISTRY[rule.recommend];
    if (!tool) continue;
    seen.add(rule.recommend);
    deduplicated.push({ ...rule, tool });
  }

  deduplicated.sort((a, b) => a.priority - b.priority);

  return deduplicated.slice(0, MAX_RECOMMENDATIONS).map((r) => ({
    slug: r.recommend,
    title: r.tool.title,
    description: r.tool.description,
    iconName: r.tool.iconName,
    color: r.tool.color,
    path: r.tool.path,
    relevanceReason: r.reason,
    priority: r.priority,
  }));
}
