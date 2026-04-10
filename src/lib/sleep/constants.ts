/**
 * Sleep Architect V2 — Constants
 *
 * Sleep recommendations, breathing patterns, PMR steps,
 * CBT-I education content, and hygiene categories.
 */

import type {
  BreathingExerciseConfig,
  CBTICard,
  ChronotypeQuestion,
  HygieneCategory,
  PMRStep,
} from './types';

// ─── Sleep Recommendations by Age ───────────────────────────────────────────
// Source: National Sleep Foundation, 2015 (Hirshkowitz et al.)

export const SLEEP_RECOMMENDATIONS: Record<
  string,
  { min: number; max: number; ideal: number; label: string }
> = {
  teen_14_17: { min: 480, max: 600, ideal: 540, label: 'Teen (14–17)' },
  young_18_25: { min: 420, max: 540, ideal: 480, label: 'Young Adult (18–25)' },
  adult_26_64: { min: 420, max: 540, ideal: 480, label: 'Adult (26–64)' },
  older_65_plus: { min: 420, max: 480, ideal: 450, label: 'Older Adult (65+)' },
};

export const DEFAULT_SLEEP_SETTINGS = {
  target_sleep_minutes: 480,
  age_range: 'adult_26_64',
};

// ─── Breathing Exercise Configurations ──────────────────────────────────────

export const BREATHING_EXERCISES: BreathingExerciseConfig[] = [
  {
    id: '4-7-8',
    name: '4-7-8 Breathing',
    description:
      'A calming technique that activates your parasympathetic nervous system. Inhale for 4 seconds, hold for 7, exhale for 8.',
    phases: [
      { label: 'Inhale', duration: 4, type: 'inhale' },
      { label: 'Hold', duration: 7, type: 'hold' },
      { label: 'Exhale', duration: 8, type: 'exhale' },
    ],
    cycles: 4,
  },
  {
    id: 'box',
    name: 'Box Breathing',
    description:
      'Used by Navy SEALs to stay calm under pressure. Equal parts inhale, hold, exhale, hold — like tracing a box.',
    phases: [
      { label: 'Inhale', duration: 4, type: 'inhale' },
      { label: 'Hold', duration: 4, type: 'hold' },
      { label: 'Exhale', duration: 4, type: 'exhale' },
      { label: 'Hold', duration: 4, type: 'hold' },
    ],
    cycles: 6,
  },
  {
    id: 'diaphragmatic',
    name: 'Diaphragmatic Breathing',
    description:
      'Deep belly breathing that slows your heart rate and relaxes your body. Focus on expanding your belly, not your chest.',
    phases: [
      { label: 'Inhale', duration: 5, type: 'inhale' },
      { label: 'Exhale', duration: 7, type: 'exhale' },
    ],
    cycles: 10,
  },
];

// ─── Progressive Muscle Relaxation Steps ────────────────────────────────────

export const PMR_STEPS: PMRStep[] = [
  {
    id: 1,
    muscle_group: 'Feet',
    instruction_tense: 'Curl your toes tightly and tense the muscles in your feet.',
    instruction_release: 'Release and let your feet go completely limp. Feel the warmth spreading.',
    tense_seconds: 5,
    release_seconds: 10,
  },
  {
    id: 2,
    muscle_group: 'Calves',
    instruction_tense: 'Point your toes toward your shins and tighten your calf muscles.',
    instruction_release: 'Release and feel the tension melting away from your lower legs.',
    tense_seconds: 5,
    release_seconds: 10,
  },
  {
    id: 3,
    muscle_group: 'Thighs',
    instruction_tense: 'Squeeze your thigh muscles by pressing your knees together.',
    instruction_release: 'Let go and feel your legs become heavy and relaxed.',
    tense_seconds: 5,
    release_seconds: 10,
  },
  {
    id: 4,
    muscle_group: 'Hands',
    instruction_tense: 'Make tight fists with both hands, squeezing as hard as you can.',
    instruction_release: 'Open your hands slowly and feel the tension flowing out through your fingertips.',
    tense_seconds: 5,
    release_seconds: 10,
  },
  {
    id: 5,
    muscle_group: 'Arms',
    instruction_tense: 'Bend your elbows and flex your biceps like a strongman pose.',
    instruction_release: 'Let your arms drop and go completely loose. Notice the difference.',
    tense_seconds: 5,
    release_seconds: 10,
  },
  {
    id: 6,
    muscle_group: 'Shoulders',
    instruction_tense: 'Raise your shoulders up toward your ears and hold them tight.',
    instruction_release: 'Let your shoulders drop down. Feel the weight releasing from your neck and shoulders.',
    tense_seconds: 5,
    release_seconds: 10,
  },
  {
    id: 7,
    muscle_group: 'Face',
    instruction_tense: 'Scrunch your entire face — forehead, eyes, jaw — as tightly as you can.',
    instruction_release: 'Relax your face completely. Let your jaw hang slightly open. Smooth your forehead.',
    tense_seconds: 5,
    release_seconds: 10,
  },
];

// ─── Chronotype Quiz (rMEQ — 5 questions) ──────────────────────────────────

export const CHRONOTYPE_QUESTIONS: ChronotypeQuestion[] = [
  {
    id: 1,
    question: 'If you were entirely free to plan your day, what time would you get up?',
    options: [
      { value: 5, label: '5:00–6:30 AM' },
      { value: 4, label: '6:30–7:45 AM' },
      { value: 3, label: '7:45–9:45 AM' },
      { value: 2, label: '9:45–11:00 AM' },
      { value: 1, label: '11:00 AM–12:00 PM' },
    ],
  },
  {
    id: 2,
    question: 'If you were entirely free to plan your evening, what time would you go to bed?',
    options: [
      { value: 5, label: '8:00–9:00 PM' },
      { value: 4, label: '9:00–10:15 PM' },
      { value: 3, label: '10:15 PM–12:30 AM' },
      { value: 2, label: '12:30–1:45 AM' },
      { value: 1, label: '1:45–3:00 AM' },
    ],
  },
  {
    id: 3,
    question: 'How alert do you feel during the first half hour after waking up?',
    options: [
      { value: 1, label: 'Not at all alert' },
      { value: 2, label: 'Slightly alert' },
      { value: 3, label: 'Fairly alert' },
      { value: 4, label: 'Very alert' },
    ],
  },
  {
    id: 4,
    question: 'At approximately what time of day do you usually feel your best?',
    options: [
      { value: 5, label: '5:00–8:00 AM' },
      { value: 4, label: '8:00–10:00 AM' },
      { value: 3, label: '10:00 AM–5:00 PM' },
      { value: 2, label: '5:00–10:00 PM' },
      { value: 1, label: '10:00 PM–5:00 AM' },
    ],
  },
  {
    id: 5,
    question: 'One hears about "morning types" and "evening types." Which do you consider yourself?',
    options: [
      { value: 6, label: 'Definitely a morning type' },
      { value: 4, label: 'Rather more a morning type than an evening type' },
      { value: 2, label: 'Rather more an evening type than a morning type' },
      { value: 0, label: 'Definitely an evening type' },
    ],
  },
];

// ─── Hygiene Audit Categories ───────────────────────────────────────────────

export const HYGIENE_CATEGORIES: HygieneCategory[] = [
  {
    id: 'environment',
    title: 'Sleep Environment',
    icon: 'Home',
    items: [
      { id: 'dark', label: 'Room is dark (blackout curtains or eye mask)', priority: 'high' },
      { id: 'cool', label: 'Room temperature is 65\u201368\u00B0F / 18\u201320\u00B0C', priority: 'high' },
      { id: 'quiet', label: 'Room is quiet (earplugs or white noise if needed)', priority: 'medium' },
      { id: 'bed_only', label: 'Bed is used only for sleep (no working in bed)', priority: 'high' },
    ],
  },
  {
    id: 'timing',
    title: 'Sleep Schedule',
    icon: 'Clock',
    items: [
      { id: 'consistent_bed', label: 'Same bedtime within 30 minutes every night', priority: 'high' },
      { id: 'consistent_wake', label: 'Same wake time every day (including weekends)', priority: 'high' },
      { id: 'no_long_naps', label: 'Naps limited to 20\u201330 minutes before 3 PM', priority: 'medium' },
    ],
  },
  {
    id: 'substances',
    title: 'Substances',
    icon: 'Coffee',
    items: [
      { id: 'caffeine', label: 'No caffeine after 2 PM (or 8 hours before bed)', priority: 'high' },
      { id: 'alcohol', label: 'No alcohol within 3 hours of bedtime', priority: 'medium' },
      { id: 'nicotine', label: 'No nicotine close to bedtime', priority: 'medium' },
    ],
  },
  {
    id: 'pre_sleep',
    title: 'Pre-Sleep Routine',
    icon: 'Moon',
    items: [
      { id: 'screens', label: 'No screens 30\u201360 minutes before bed', priority: 'high' },
      { id: 'wind_down', label: 'Consistent wind-down routine (reading, stretching, etc.)', priority: 'medium' },
      { id: 'no_heavy_meals', label: 'No heavy meals within 2\u20133 hours of bedtime', priority: 'medium' },
    ],
  },
  {
    id: 'daytime',
    title: 'Daytime Habits',
    icon: 'Sun',
    items: [
      { id: 'exercise', label: 'Regular exercise (but not within 2 hours of bed)', priority: 'medium' },
      { id: 'sunlight', label: 'Morning sunlight exposure within 1 hour of waking', priority: 'high' },
      { id: 'limit_bed', label: 'If unable to sleep after 20 min, leave bed and return when sleepy', priority: 'high' },
    ],
  },
  {
    id: 'worry',
    title: 'Mind Management',
    icon: 'Brain',
    items: [
      { id: 'worry_time', label: 'Dedicated "worry time" earlier in the day (not at bedtime)', priority: 'medium' },
      { id: 'journal', label: 'Brain dump or to-do list before bed to offload thoughts', priority: 'medium' },
      { id: 'no_clock', label: 'Clock face turned away / phone face down while in bed', priority: 'low' },
    ],
  },
];

// ─── CBT-I Educational Cards ────────────────────────────────────────────────

export const CBTI_EDUCATION_CARDS: CBTICard[] = [
  {
    id: 'stimulus_control',
    title: 'The bed-sleep connection',
    summary:
      'Your brain associates your bed with whatever you do in it. If you scroll, worry, or watch TV in bed, your brain learns that bed = awake.',
    technique:
      'Use your bed only for sleep. If you can\'t sleep after 20 minutes, get up and do something quiet in another room. Return when sleepy.',
    source: 'Bootzin & Perlis, 2011',
  },
  {
    id: 'sleep_restriction',
    title: 'Less time in bed, better sleep',
    summary:
      'Spending too much time in bed actually makes insomnia worse. It sounds backwards, but limiting your time in bed increases sleep pressure and efficiency.',
    technique:
      'Calculate your average actual sleep time. Set your initial "sleep window" to that amount. Gradually expand by 15 minutes as efficiency improves above 85%.',
    source: 'Spielman et al., 1987',
  },
  {
    id: 'cognitive_restructuring',
    title: 'Challenging sleep thoughts',
    summary:
      'Catastrophic thoughts about sleep ("I won\'t function tomorrow," "I need 8 hours or I\'ll get sick") increase anxiety and make it harder to sleep.',
    technique:
      'When you notice a catastrophic thought, ask: "What\'s the evidence? Have I functioned after poor sleep before? What would I tell a friend?"',
    source: 'Harvey, 2002',
  },
  {
    id: 'sleep_pressure',
    title: 'How sleep pressure works',
    summary:
      'Adenosine builds up in your brain during waking hours, creating "sleep pressure." The longer you\'re awake, the stronger the pressure. Naps and caffeine drain this pressure.',
    technique:
      'Avoid naps after 3 PM. Limit caffeine to mornings only. Let sleep pressure build naturally.',
    source: 'Borb\u00E9ly, 1982',
  },
  {
    id: 'circadian',
    title: 'Your internal clock',
    summary:
      'Your circadian rhythm is a ~24-hour cycle controlled by light exposure. It determines when you feel alert and when you feel sleepy, independent of how much sleep you\'ve had.',
    technique:
      'Get bright light (ideally sunlight) within 30\u201360 minutes of waking. Dim lights 2 hours before bed. Keep a consistent wake time \u2014 it\'s the strongest anchor for your clock.',
    source: 'Czeisler et al., 1999',
  },
];

// ─── Crisis Detection Keywords ──────────────────────────────────────────────
// Used in free-text inputs (Brain Dump, Racing Thoughts, dream journal, notes)

export const CRISIS_KEYWORDS = [
  'suicide',
  'suicidal',
  'kill myself',
  'end my life',
  'want to die',
  'better off dead',
  'no reason to live',
  'self-harm',
  'self harm',
  'cut myself',
  'hurt myself',
  'overdose',
  'jump off',
  'hang myself',
  'not worth living',
  "can't go on",
  'end it all',
  'plan to die',
];

export const CRISIS_RESOURCES = {
  title: 'If you are in crisis, please reach out',
  resources: [
    {
      name: '988 Suicide & Crisis Lifeline',
      contact: 'Call or text 988',
      available: '24/7',
    },
    {
      name: 'Crisis Text Line',
      contact: 'Text HOME to 741741',
      available: '24/7',
    },
    {
      name: 'International Association for Suicide Prevention',
      contact: 'https://www.iasp.info/resources/Crisis_Centres/',
      available: 'Directory of crisis centers worldwide',
    },
  ],
};

// ─── Thought Categories ─────────────────────────────────────────────────────

export const THOUGHT_CATEGORIES = [
  { id: 'work' as const, label: 'Work', icon: 'Briefcase' },
  { id: 'relationships' as const, label: 'Relationships', icon: 'Heart' },
  { id: 'health' as const, label: 'Health', icon: 'Activity' },
  { id: 'money' as const, label: 'Money', icon: 'DollarSign' },
  { id: 'tomorrow' as const, label: "Tomorrow's Tasks", icon: 'Calendar' },
  { id: 'other' as const, label: 'Other', icon: 'MoreHorizontal' },
];
