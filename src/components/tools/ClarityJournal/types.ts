// Clarity Journal — All TypeScript interfaces
// Evidence-based mental health journaling system
// All data stored client-side only (localStorage)

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
  subCategory?: string; // People, Places, Situations, Times, Other / Physical, Emotional, Behavioral, Cognitive
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

export interface JournalPreferences {
  firstVisitCompleted: boolean;
  privacyNoticeDismissed: boolean;
  showGuidanceTooltips: boolean;
}

export interface ClarityJournalData {
  version: 1;
  dailyCheckIns: DailyCheckIn[];
  weeklyScreenings: WeeklyScreening[];
  behavioralActivation: BehavioralActivationEntry[];
  triggerLog: TriggerLogItem[];
  wellnessToolbox: WellnessToolboxItem[];
  safetyPlan: SafetyPlanSection[];
  weeklyReflections: WeeklyReflection[];
  preferences: JournalPreferences;
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
  | 'insights';
