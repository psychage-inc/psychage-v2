/**
 * Sleep Architect V2 — Chronotype Scoring
 *
 * Implements the reduced Morningness-Eveningness Questionnaire (rMEQ)
 * scoring and maps results to animal chronotypes.
 */

import type {
  ChronotypeAnimal,
  ChronotypeCategory,
  ChronotypeResult,
} from './types';

interface AnimalProfile {
  animal: ChronotypeAnimal;
  label: string;
  description: string;
  ideal_bedtime: string;
  ideal_wake_time: string;
}

const ANIMAL_PROFILES: Record<ChronotypeAnimal, AnimalProfile> = {
  lion: {
    animal: 'lion',
    label: 'Lion',
    description:
      'You thrive in the early morning. Your energy peaks before noon, and you wind down early in the evening. Morning routines and early workouts suit you best.',
    ideal_bedtime: '21:30',
    ideal_wake_time: '05:30',
  },
  bear: {
    animal: 'bear',
    label: 'Bear',
    description:
      'You follow the solar cycle naturally. Most productive mid-morning to early afternoon, you adapt well to conventional schedules. This is the most common chronotype.',
    ideal_bedtime: '23:00',
    ideal_wake_time: '07:00',
  },
  wolf: {
    animal: 'wolf',
    label: 'Wolf',
    description:
      'You come alive in the evening. Creative energy peaks later in the day, and mornings are your slowest period. Night owls often excel in creative and analytical work.',
    ideal_bedtime: '00:00',
    ideal_wake_time: '08:00',
  },
  dolphin: {
    animal: 'dolphin',
    label: 'Dolphin',
    description:
      'You are a light, irregular sleeper. You may have difficulty with consistent schedules, but you\'re often highly intelligent and alert. Focus on sleep hygiene and a calming bedtime routine.',
    ideal_bedtime: '23:30',
    ideal_wake_time: '06:30',
  },
};

function getCategory(score: number): ChronotypeCategory {
  if (score >= 22) return 'definitely_morning';
  if (score >= 18) return 'moderately_morning';
  if (score >= 12) return 'neither';
  if (score >= 8) return 'moderately_evening';
  return 'definitely_evening';
}

function mapToAnimal(category: ChronotypeCategory): ChronotypeAnimal {
  switch (category) {
    case 'definitely_morning':
      return 'lion';
    case 'moderately_morning':
      return 'lion';
    case 'neither':
      return 'bear';
    case 'moderately_evening':
      return 'wolf';
    case 'definitely_evening':
      return 'wolf';
  }
}

/**
 * Score the rMEQ from an array of answer values.
 * @param answers Array of 5 numeric values (one per question)
 * @returns ChronotypeResult with score, category, and animal mapping
 */
export function scoreChronotype(answers: number[]): ChronotypeResult {
  if (answers.length !== 5) {
    throw new Error('rMEQ requires exactly 5 answers');
  }

  const score = answers.reduce((sum, v) => sum + v, 0);
  const category = getCategory(score);
  let animal = mapToAnimal(category);

  // Special case: low scores with high morning alertness question (Q3)
  // suggests dolphin type (light/irregular sleeper)
  if (category === 'neither' && answers[2] <= 2) {
    animal = 'dolphin';
  }

  const profile = ANIMAL_PROFILES[animal];

  return {
    score,
    category,
    animal: profile.animal,
    label: profile.label,
    description: profile.description,
    ideal_bedtime: profile.ideal_bedtime,
    ideal_wake_time: profile.ideal_wake_time,
  };
}

export function getCategoryLabel(category: ChronotypeCategory): string {
  const labels: Record<ChronotypeCategory, string> = {
    definitely_morning: 'Definitely Morning',
    moderately_morning: 'Moderately Morning',
    neither: 'Neither',
    moderately_evening: 'Moderately Evening',
    definitely_evening: 'Definitely Evening',
  };
  return labels[category];
}

export { ANIMAL_PROFILES };
