export interface ScaleOption {
  value: number;
  label: string;
}

export interface ClarityQuestion {
  id: string;
  domainId: number;
  text: string;
  options: ScaleOption[];
}

export interface ClarityDomain {
  id: number;
  name: string;
  key: DomainKey;
  description: string;
  citation: string;
  color: string;
  bgColor: string;
}

export type DomainKey = 'emotional' | 'vitality' | 'social' | 'cognitive' | 'functioning';

export interface ClarityDomainScores {
  emotional: number;
  vitality: number;
  social: number;
  cognitive: number;
  functioning: number;
}

export interface ClaritySubScores {
  phq2: number;
  gad2: number;
  who5Percentage: number;
  uclaScore: number;
  pssScore: number;
}

export interface ClarityScoreResult {
  totalScore: number;
  domainScores: ClarityDomainScores;
  subScores: ClaritySubScores;
  rawScores: Record<string, number>;
  flags: string[];
  strengths: string[];
  growthAreas: string[];
  label: string;
  tier: ScoreTier;
}

export type ScoreTier = 'thriving' | 'balanced' | 'struggling' | 'distressed' | 'crisis';

export interface Recommendation {
  dimension: string;
  text: string;
  link: string;
  linkLabel: string;
}

export interface ClarityHistoryItem {
  id: string;
  date: string;
  score: number;
  label?: string;
  domainScores?: ClarityDomainScores;
}
