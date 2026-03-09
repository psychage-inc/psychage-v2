// Clarity Journal V2 — All TypeScript interfaces
// Therapist-integrated structured journaling system
// All data stored client-side only (localStorage)

// ── V1 TYPES (preserved for backward compatibility) ──

export interface DailyCheckIn {
  id: string;
  date: string; // YYYY-MM-DD
  mood: number; // 1-10
  sleepHours: number; // 0-24, step 0.5
  sleepQuality: 'poor' | 'fair' | 'good' | 'great';
  energy: number; // 1-10
  oneSentence: string;
  tags: string[];
  createdAt: string; // ISO datetime
  updatedAt: string;
}

export interface WeeklyScreening {
  id: string;
  weekStartDate: string; // YYYY-MM-DD (Monday)
  phq2: { q1: number; q2: number; total: number }; // 0-3 each, 0-6 total
  gad2: { q1: number; q2: number; total: number }; // 0-3 each, 0-6 total
  pss4: { q1: number; q2: number; total: number }; // adapted scoring
  who5: { q1: number; q2: number; total: number }; // higher = better
  safetyCheck?: {
    selfHarmThoughts: boolean;
    suicidalThoughts: boolean;
    crisisTriggered: boolean;
  };
  createdAt: string;
}

export interface BehavioralActivationEntry {
  id: string;
  date: string; // YYYY-MM-DD
  activity: string;
  predictedMood: number; // 1-10
  actualMood: number; // 1-10
  type: 'mastery' | 'pleasure' | 'both';
  createdAt: string;
}

export interface TriggerLogItem {
  id: string;
  category: 'triggers' | 'warning_signs' | 'what_helps' | 'what_worsens';
  text: string;
  severity?: number; // 1-5 for triggers
  subCategory?: string;
  effectivenessRating?: number; // 1-5 for what_helps
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface WellnessToolboxItem {
  id: string;
  category: 'physical' | 'social' | 'mental' | 'professional';
  text: string;
  notes?: string;
  sortOrder: number;
}

export interface SafetyPlanContact {
  id: string;
  text: string;
  contactName?: string;
  contactPhone?: string;
}

export interface SafetyPlanSection {
  sectionNumber: 1 | 2 | 3 | 4 | 5 | 6;
  items: SafetyPlanContact[];
}

export interface WeeklyReflection {
  id: string;
  weekStartDate: string; // YYYY-MM-DD (Monday)
  wentWell: string;
  wasDifficult: string;
  patterns: string;
  doNext: string;
  gratitude: string;
  clarityScore?: number;
  createdAt: string;
}

// ── V2 NEW TYPES ──

export interface EmotionEntry {
  name: string;
  intensity: number; // 0-100
  category: 'positive' | 'negative' | 'neutral';
}

export interface MoodCheckIn {
  id: string;
  timestamp: string; // ISO 8601
  timeOfDay: 'morning' | 'evening' | 'anytime';
  overallMood: number; // 1-10
  emotions: EmotionEntry[];
  energyLevel: number; // 1-10
  note?: string; // max 500 chars
}

export interface ActivityEntry {
  name: string;
  category: 'physical' | 'social' | 'creative' | 'work' | 'rest' | 'self-care' | 'other';
  duration: number; // minutes
  enjoyment: number; // 1-10
  mastery: number; // 1-10
}

export interface BehavioralLog {
  id: string;
  timestamp: string;
  activities: ActivityEntry[];
  socialInteractions: number;
  avoidanceBehaviors?: string;
  overallActivityLevel: number; // 1-10
}

export interface SleepEntry {
  id: string;
  date: string; // YYYY-MM-DD
  bedtime: string; // HH:MM
  wakeTime: string; // HH:MM
  sleepQuality: number; // 1-10
  minutesToFallAsleep?: number;
  nightWakings?: number;
  factors?: string[];
  note?: string;
}

export interface StressorEntry {
  id: string;
  timestamp: string;
  description: string;
  category: 'work' | 'relationship' | 'health' | 'financial' | 'family' | 'social' | 'academic' | 'other';
  intensity: number; // 1-10
  isRecurring: boolean;
  copingUsed?: string;
}

export interface CopingUseEntry {
  id: string;
  timestamp: string;
  tool: string;
  distressBefore: number; // 1-10
  distressAfter: number; // 1-10
  helpful: boolean;
  note?: string;
}

export interface FreeFormEntry {
  id: string;
  timestamp: string;
  content: string;
  prompt?: string;
  includeInReport: boolean;
}

export interface ThoughtRecordEntry {
  id: string;
  timestamp: string;
  situation: string;
  automaticThought: string;
  emotions: EmotionEntry[];
  distortions: string[];
  evidenceFor: string;
  evidenceAgainst: string;
  balancedThought: string;
  emotionsAfter: EmotionEntry[];
  completed: boolean;
  source: 'journal' | 'thought-reframer';
}

export interface SafetyFlag {
  date: string;
  source: 'screener' | 'keyword';
  details: string;
}

// ── DAILY JOURNAL AGGREGATE ──

export interface DailyJournal {
  date: string; // YYYY-MM-DD
  moodCheckIns: MoodCheckIn[];
  thoughtRecords: ThoughtRecordEntry[];
  behavioralLog?: BehavioralLog;
  sleepEntry?: SleepEntry;
  stressors: StressorEntry[];
  copingUses: CopingUseEntry[];
  freeFormEntries: FreeFormEntry[];
}

// ── REPORT CONFIGURATION ──

export interface ReportConfig {
  periodStart: string;
  periodEnd: string;
  includeSections: {
    moodTrends: boolean;
    screenerScores: boolean;
    thoughtRecords: boolean;
    behavioralActivity: boolean;
    sleepPatterns: boolean;
    stressorSummary: boolean;
    copingEffectiveness: boolean;
    freeFormExcerpts: boolean;
    safetyFlags: boolean;
    sessionPrepPrompts: boolean;
  };
  clientName?: string;
  therapistName?: string;
  nextSessionDate?: string;
}

// ── JOURNAL SETTINGS ──

export interface JournalSettings {
  reminderMorning: boolean;
  reminderEvening: boolean;
  reminderMorningTime: string;
  reminderEveningTime: string;
  weeklyScreenerDay: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  defaultReportPeriod: 7 | 14 | 30;
  showGuidedPrompts: boolean;
}

// ── V1 PREFERENCES (kept for backward compat) ──

export interface JournalPreferences {
  firstVisitCompleted: boolean;
  privacyNoticeDismissed: boolean;
  showGuidanceTooltips: boolean;
}

// ── MASTER DATA STRUCTURE ──

export interface ClarityJournalData {
  version: 2;
  // V1 sections (preserved)
  dailyCheckIns: DailyCheckIn[];
  weeklyScreenings: WeeklyScreening[];
  behavioralActivation: BehavioralActivationEntry[];
  triggerLog: TriggerLogItem[];
  wellnessToolbox: WellnessToolboxItem[];
  safetyPlan: SafetyPlanSection[];
  weeklyReflections: WeeklyReflection[];
  preferences: JournalPreferences;
  // V2 additions
  dailyJournals: DailyJournal[];
  safetyFlags: SafetyFlag[];
  settings: JournalSettings;
}

export type ScoreLevel = 'low' | 'moderate' | 'elevated';

export type JournalSectionId =
  | 'daily-checkin'
  | 'weekly-screening'
  | 'thought-record'
  | 'behavioral-activation'
  | 'trigger-log'
  | 'wellness-toolbox'
  | 'weekly-reflection'
  | 'history'
  | 'insights'
  // V2 sections
  | 'mood-checkin'
  | 'activity-log'
  | 'sleep-log'
  | 'stressor-log'
  | 'coping-log'
  | 'free-form'
  | 'report';

// ── REPORT ENGINE OUTPUT ──

export interface ReportData {
  period: { start: string; end: string };
  journalDays: number;
  totalEntries: number;
  mood: {
    averageMood: number;
    moodTrend: 'improving' | 'stable' | 'declining';
    dailyAverages: { date: string; avg: number }[];
    morningAvg: number | null;
    eveningAvg: number | null;
    topEmotions: { name: string; count: number; avgIntensity: number; category: string }[];
    dayOfWeekAverages: Record<string, number>;
  };
  screeners: {
    phq2: { date: string; score: number }[];
    gad2: { date: string; score: number }[];
    pss4: { date: string; score: number }[];
    who5: { date: string; score: number }[];
    phq2Trend: 'improving' | 'stable' | 'worsening';
    gad2Trend: 'improving' | 'stable' | 'worsening';
  };
  thoughtRecords: {
    count: number;
    completionRate: number;
    topDistortions: { id: string; name: string; count: number }[];
  };
  behavioral: {
    avgActivityLevel: number;
    categoryDistribution: Record<string, number>;
    zeroDays: number;
    avgEnjoyment: number;
    avgMastery: number;
    socialInteractionAvg: number;
    moodCorrelation: number | null;
  };
  sleep: {
    avgDuration: number;
    avgQuality: number;
    consistencyScore: number;
    nightsBelow6: number;
    topFactors: { factor: string; count: number }[];
    moodCorrelation: number | null;
  };
  stressors: {
    topByFrequency: { description: string; count: number; category: string }[];
    topByIntensity: { description: string; avgIntensity: number; category: string }[];
    recurringCount: number;
    categoryDistribution: Record<string, number>;
  };
  coping: {
    toolUsage: { tool: string; count: number; avgReduction: number }[];
    mostEffective: string | null;
    leastEffective: string | null;
  };
  safety: {
    flags: SafetyFlag[];
    hasFlags: boolean;
  };
  sessionPrompts: string[];
  freeFormExcerpts: { date: string; content: string; prompt?: string }[];
}
