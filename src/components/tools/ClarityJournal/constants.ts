// Clarity Journal — Constants & configuration
// Screening questions, emotion presets, section metadata, score thresholds

import type { JournalSectionId } from './types';

// ── Screening questions ──

export const PHQ2_QUESTIONS = [
  'Over the past 2 weeks, how often have you been bothered by little interest or pleasure in doing things?',
  'Over the past 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?',
] as const;

export const GAD2_QUESTIONS = [
  'Over the past 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?',
  'Over the past 2 weeks, how often have you been bothered by not being able to stop or control worrying?',
] as const;

export const PSS4_QUESTIONS = [
  'In the last 2 weeks, how often have you felt that you were unable to control the important things in your life?',
  'In the last 2 weeks, how often have you felt confident about your ability to handle your personal problems?',
] as const;

export const WHO5_QUESTIONS = [
  'Over the past 2 weeks, I have felt cheerful and in good spirits.',
  'Over the past 2 weeks, I have felt calm and relaxed.',
] as const;

// Scale options for PHQ-2 and GAD-2
export const FREQUENCY_OPTIONS = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Several days' },
  { value: 2, label: 'More than half the days' },
  { value: 3, label: 'Nearly every day' },
] as const;

// Scale options for PSS-4
export const STRESS_OPTIONS = [
  { value: 0, label: 'Never' },
  { value: 1, label: 'Almost never' },
  { value: 2, label: 'Sometimes' },
  { value: 3, label: 'Fairly often' },
  { value: 4, label: 'Very often' },
] as const;

// Scale options for WHO-5
export const WELLBEING_OPTIONS = [
  { value: 0, label: 'At no time' },
  { value: 1, label: 'Some of the time' },
  { value: 2, label: 'Less than half the time' },
  { value: 3, label: 'More than half the time' },
  { value: 4, label: 'Most of the time' },
  { value: 5, label: 'All of the time' },
] as const;

// ── Score thresholds ──

export const PHQ2_THRESHOLDS = { low: 2, moderate: 4 } as const; // 0-2 low, 3-4 moderate, 5-6 elevated
export const GAD2_THRESHOLDS = { low: 2, moderate: 4 } as const;
export const PSS4_THRESHOLDS = { low: 3, moderate: 5 } as const; // adapted for 2-question subset
export const WHO5_THRESHOLDS = { good: 7, moderate: 4 } as const; // higher = better (inverted)

// ── Emotion presets ──

export const EMOTION_PRESETS = [
  'Anxious', 'Sad', 'Angry', 'Frustrated', 'Ashamed',
  'Guilty', 'Fearful', 'Lonely', 'Overwhelmed', 'Hopeless',
] as const;

// ── Quick tags for daily check-in ──

export const DAILY_TAGS = [
  'stressed', 'grateful', 'anxious', 'calm', 'lonely',
  'hopeful', 'tired', 'motivated', 'irritable', 'content',
] as const;

// ── Sleep quality options ──

export const SLEEP_QUALITY_OPTIONS = [
  { value: 'poor' as const, label: 'Poor' },
  { value: 'fair' as const, label: 'Fair' },
  { value: 'good' as const, label: 'Good' },
  { value: 'great' as const, label: 'Great' },
] as const;

// ── Mood emoji anchors ──

export const MOOD_EMOJIS: Record<number, string> = {
  1: '\u{1F61E}', // 😞
  2: '\u{1F641}', // 🙁
  3: '\u{1F615}', // 😕
  4: '\u{1F610}', // 😐
  5: '\u{1F610}', // 😐
  6: '\u{1F642}', // 🙂
  7: '\u{1F642}', // 🙂
  8: '\u{1F60A}', // 😊
  9: '\u{1F604}', // 😄
  10: '\u{1F929}', // 🤩
};

// ── Trigger log categories ──

export const TRIGGER_SUBCATEGORIES = {
  triggers: ['People', 'Places', 'Situations', 'Times', 'Other'],
  warning_signs: ['Physical', 'Emotional', 'Behavioral', 'Cognitive'],
} as const;

// ── Wellness toolbox categories ──

export const WELLNESS_CATEGORIES = [
  { id: 'physical' as const, label: 'Physical', description: 'Exercise, sleep, nutrition, time outdoors', icon: 'Heart' },
  { id: 'social' as const, label: 'Social', description: 'Trusted people, communities, connection', icon: 'Users' },
  { id: 'mental' as const, label: 'Mental', description: 'Meditation, journaling, reading, boundaries', icon: 'Brain' },
  { id: 'professional' as const, label: 'Professional', description: 'Therapist, doctor, support services', icon: 'Stethoscope' },
] as const;

// ── Safety plan section labels ──

export const SAFETY_PLAN_SECTIONS = [
  { number: 1 as const, title: 'Warning signs that a crisis may be developing', placeholder: 'e.g., Feeling hopeless, withdrawing from friends...' },
  { number: 2 as const, title: 'Internal coping strategies I can try on my own', placeholder: 'e.g., Deep breathing, going for a walk...' },
  { number: 3 as const, title: 'People and social settings that can provide distraction', placeholder: 'e.g., Coffee shop, gym, library...', hasContact: true },
  { number: 4 as const, title: 'People I can ask for help', placeholder: 'Name', hasContact: true },
  { number: 5 as const, title: 'Professionals and agencies I can contact in a crisis', placeholder: 'Name or organization', hasContact: true },
  { number: 6 as const, title: 'Steps to make my environment safer', placeholder: 'e.g., Remove or secure items...' },
] as const;

// ── Behavioral activation types ──

export const ACTIVATION_TYPES = [
  { value: 'mastery' as const, label: 'Mastery', shortLabel: 'M' },
  { value: 'pleasure' as const, label: 'Pleasure', shortLabel: 'P' },
  { value: 'both' as const, label: 'Both', shortLabel: 'M+P' },
] as const;

// ── Section metadata for dashboard ──

export interface SectionMeta {
  id: JournalSectionId;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  frequency: string;
  time: string;
  route: string;
}

export const JOURNAL_SECTIONS: SectionMeta[] = [
  {
    id: 'daily-checkin',
    title: 'Daily Check-In',
    subtitle: 'The weather check for your mind',
    description: 'Rate your mood, note your sleep, and write one sentence about how you are feeling.',
    icon: 'Sun',
    frequency: 'Every day',
    time: '2-5 min',
    route: '/tools/clarity-journal/daily-checkin',
  },
  {
    id: 'weekly-screening',
    title: 'Weekly Screening',
    subtitle: 'A quick pulse check, backed by research',
    description: 'Brief validated questions for depression, anxiety, stress, and well-being.',
    icon: 'ClipboardCheck',
    frequency: 'Once a week',
    time: '3-5 min',
    route: '/tools/clarity-journal/weekly-screening',
  },
  {
    id: 'thought-record',
    title: 'Thought Record',
    subtitle: 'See your thoughts clearly',
    description: 'Challenge negative thought patterns with the Thought Reframer tool.',
    icon: 'Lightbulb',
    frequency: 'As needed',
    time: '5-10 min',
    route: '/tools/clarity-journal/thought-record',
  },
  {
    id: 'behavioral-activation',
    title: 'Behavioral Activation',
    subtitle: 'Do more of what helps',
    description: 'Track activities and their actual vs. predicted mood impact.',
    icon: 'Activity',
    frequency: '2-3x per week',
    time: '2-3 min',
    route: '/tools/clarity-journal/behavioral-activation',
  },
  {
    id: 'trigger-log',
    title: 'Trigger & Pattern Log',
    subtitle: 'Map what affects you',
    description: 'Identify your personal triggers, early warning signs, and coping strategies.',
    icon: 'Map',
    frequency: 'As needed + monthly review',
    time: '5-15 min',
    route: '/tools/clarity-journal/trigger-log',
  },
  {
    id: 'wellness-toolbox',
    title: 'Wellness Toolbox & Safety Plan',
    subtitle: 'Your plan for hard days',
    description: 'Personal maintenance strategies and a structured crisis safety plan.',
    icon: 'ShieldCheck',
    frequency: 'Fill once, update as needed',
    time: '15-20 min',
    route: '/tools/clarity-journal/wellness-toolbox',
  },
  {
    id: 'weekly-reflection',
    title: 'Weekly Reflection',
    subtitle: 'Step back. See the bigger picture.',
    description: 'Review the week, spot patterns, and set intentions for the next one.',
    icon: 'BookOpen',
    frequency: 'Once a week',
    time: '5-10 min',
    route: '/tools/clarity-journal/weekly-reflection',
  },
];

// ── Disclaimers ──

export const SCREENING_DISCLAIMER =
  'These questions are used by healthcare providers worldwide to screen for common mental health concerns. They are NOT a diagnosis. They help you notice patterns over time.';

export const PRIVACY_NOTICE =
  'Your journal data never leaves your device. Psychage cannot see, access, or store anything you write here.';

export const CRISIS_MESSAGE =
  'If you are in crisis right now: Call or text 988 (US) or visit findahelpline.com for crisis resources worldwide. You can also visit psychage.com/crisis.';

export const ELEVATED_SCORE_MESSAGE = (domain: string, weeks: number) =>
  `Your ${domain} score has been elevated for ${weeks} week${weeks > 1 ? 's' : ''}. This might be a good time to talk to a mental health professional.`;
