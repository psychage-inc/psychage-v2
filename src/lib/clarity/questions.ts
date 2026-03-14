import type { ClarityQuestion, ClarityDomain, ScaleOption } from './types';

/**
 * Domain key↔name mapping (preserved for historical DB compatibility):
 *   key 'vitality'  → "Cognitive Clarity" (WHO-5 Well-Being Index)
 *   key 'cognitive'  → "Physical Vitality" (PSS-4 Perceived Stress)
 * See also: dimensions.ts DIMENSION_META for the results dashboard mapping.
 */
export const DOMAINS: ClarityDomain[] = [
  {
    id: 0,
    name: 'Emotional Wellness',
    key: 'emotional',
    description: 'PHQ-4',
    citation: 'Over the last 2 weeks, how often have you been bothered by...',
    color: 'text-teal-500',
    bgColor: 'bg-teal-500',
  },
  {
    id: 1,
    name: 'Cognitive Clarity',
    key: 'vitality',
    description: 'WHO-5',
    citation: 'Over the last 2 weeks...',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500',
  },
  {
    id: 2,
    name: 'Social Connection',
    key: 'social',
    description: 'UCLA 3-Item',
    citation: 'How often do you feel...',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500',
  },
  {
    id: 3,
    name: 'Physical Vitality',
    key: 'cognitive',
    description: 'PSS-4',
    citation: 'In the last month...',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500',
  },
  {
    id: 4,
    name: 'Daily Functioning',
    key: 'functioning',
    description: 'General',
    citation: 'Over the last 2 weeks...',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500',
  },
];

const phqOptions: ScaleOption[] = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Several days' },
  { value: 2, label: 'More than half the days' },
  { value: 3, label: 'Nearly every day' },
];

const who5Options: ScaleOption[] = [
  { value: 0, label: 'All of the time' },
  { value: 1, label: 'Most of the time' },
  { value: 2, label: 'More than half of the time' },
  { value: 3, label: 'Less than half of the time' },
  { value: 4, label: 'Some of the time' },
  { value: 5, label: 'At no time' },
];

const uclaOptions: ScaleOption[] = [
  { value: 1, label: 'Hardly ever' },
  { value: 2, label: 'Some of the time' },
  { value: 3, label: 'Often' },
];

const pssOptions: ScaleOption[] = [
  { value: 0, label: 'Never' },
  { value: 1, label: 'Almost never' },
  { value: 2, label: 'Sometimes' },
  { value: 3, label: 'Fairly often' },
  { value: 4, label: 'Very often' },
];

const functioningOptions: ScaleOption[] = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'A little bit' },
  { value: 2, label: 'Moderately' },
  { value: 3, label: 'Quite a bit' },
  { value: 4, label: 'Extremely' },
];

export const QUESTIONS: ClarityQuestion[] = [
  // PHQ-4 → Emotional Wellness (domain 0)
  { id: 'q1', domainId: 0, text: 'Feeling nervous, anxious, or on edge', options: phqOptions },
  { id: 'q2', domainId: 0, text: 'Not being able to stop or control worrying', options: phqOptions },
  { id: 'q3', domainId: 0, text: 'Little interest or pleasure in doing things', options: phqOptions },
  { id: 'q4', domainId: 0, text: 'Feeling down, depressed, or hopeless', options: phqOptions },

  // WHO-5 → Cognitive Clarity (domain 1)
  { id: 'q5', domainId: 1, text: 'I have felt cheerful and in good spirits', options: who5Options },
  { id: 'q6', domainId: 1, text: 'I have felt calm and relaxed', options: who5Options },
  { id: 'q7', domainId: 1, text: 'I have felt active and vigorous', options: who5Options },
  { id: 'q8', domainId: 1, text: 'I woke up feeling fresh and rested', options: who5Options },
  { id: 'q9', domainId: 1, text: 'My daily life has been filled with things that interest me', options: who5Options },

  // UCLA 3-Item → Social Connection (domain 2)
  { id: 'q10', domainId: 2, text: 'How often do you feel that you lack companionship?', options: uclaOptions },
  { id: 'q11', domainId: 2, text: 'How often do you feel left out?', options: uclaOptions },
  { id: 'q12', domainId: 2, text: 'How often do you feel isolated from others?', options: uclaOptions },

  // PSS-4 → Physical Vitality (domain 3)
  { id: 'q13', domainId: 3, text: 'How often have you felt that you were unable to control the important things in your life?', options: pssOptions },
  { id: 'q14', domainId: 3, text: 'How often have you felt confident about your ability to handle your personal problems?', options: pssOptions },
  { id: 'q15', domainId: 3, text: 'How often have you felt that things were going your way?', options: pssOptions },
  { id: 'q16', domainId: 3, text: 'How often have you felt difficulties were piling up so high that you could not overcome them?', options: pssOptions },

  // Custom → Daily Functioning (domain 4)
  { id: 'q17', domainId: 4, text: 'How much have your symptoms interfered with your daily life or work?', options: functioningOptions },
  { id: 'q18', domainId: 4, text: 'How much difficulty have you had maintaining personal relationships?', options: functioningOptions },
  { id: 'q19', domainId: 4, text: 'How often have you struggled to fulfill your responsibilities?', options: functioningOptions },
  { id: 'q20', domainId: 4, text: 'How much has your mental state affected your physical health?', options: functioningOptions },
];
