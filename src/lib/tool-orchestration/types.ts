export type ToolSlug =
  | 'mood-journal'
  | 'sleep-architect'
  | 'clarity-journal'
  | 'clarity-score'
  | 'symptom-navigator'
  | 'relationship-health'
  | 'medication-tracker'
  | 'mindmate'
  | 'provider-finder'
  | 'crisis-support';

export interface ToolSignal {
  toolSlug: ToolSlug;
  moodScore?: number;
  sleepQuality?: number;
  clarityScore?: number;
  clarityTier?: string;
  navigatorConditions?: string[];
  hasSafetyFlags?: boolean;
  relationshipScore?: number;
  relationshipTier?: string;
  medAdherence?: number;
  medStreak?: number;
}

export interface ToolRecommendationItem {
  slug: ToolSlug;
  title: string;
  description: string;
  iconName: string;
  color: string;
  path: string;
  relevanceReason: string;
  priority: number;
}
