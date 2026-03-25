// =============================================================================
// GET /api/ai/suggested-questions — Contextual starter questions
// =============================================================================

import type { SuggestedQuestionsResponse, SuggestedQuestion } from '@/lib/ai/types';

// =============================================================================
// Suggested Question Sets
// =============================================================================

const QUESTION_POOLS: Record<string, SuggestedQuestion[]> = {
  general: [
    {
      text: 'What is depression and how is it different from sadness?',
      category: 'education',
      icon: 'book-open',
    },
    {
      text: 'What are the most common signs of anxiety?',
      category: 'education',
      icon: 'heart-pulse',
    },
    {
      text: 'How can I manage stress better?',
      category: 'coping',
      icon: 'shield',
    },
    {
      text: 'What should I look for in a therapist?',
      category: 'provider',
      icon: 'user-search',
    },
    {
      text: "I'm having trouble sleeping. What can help?",
      category: 'coping',
      icon: 'moon',
    },
    {
      text: 'What is cognitive behavioral therapy (CBT)?',
      category: 'education',
      icon: 'brain',
    },
    {
      text: 'How do I know if I need professional help?',
      category: 'guidance',
      icon: 'compass',
    },
    {
      text: 'What tools does Psychage offer?',
      category: 'navigation',
      icon: 'wrench',
    },
  ],
  evening: [
    {
      text: "I'm having trouble sleeping — any tips?",
      category: 'coping',
      icon: 'moon',
    },
    {
      text: 'How can I wind down after a stressful day?',
      category: 'coping',
      icon: 'sunset',
    },
    {
      text: 'What is sleep hygiene and why does it matter?',
      category: 'education',
      icon: 'bed',
    },
    {
      text: 'Can anxiety cause insomnia?',
      category: 'education',
      icon: 'heart-pulse',
    },
  ],
  morning: [
    {
      text: 'How can I start my day with less anxiety?',
      category: 'coping',
      icon: 'sunrise',
    },
    {
      text: "What's a simple mindfulness exercise I can try?",
      category: 'coping',
      icon: 'flower',
    },
    {
      text: 'How does exercise help with mental health?',
      category: 'education',
      icon: 'dumbbell',
    },
    {
      text: 'What are the benefits of mood tracking?',
      category: 'education',
      icon: 'chart-line',
    },
  ],
};

// =============================================================================
// Handler
// =============================================================================

export function handleSuggestedQuestions(
  timeOfDay?: string,
  _language?: string
): SuggestedQuestionsResponse {
  let pool: SuggestedQuestion[];

  // Select pool based on time of day
  const hour = getHourFromTimeOfDay(timeOfDay);

  if (hour !== null) {
    if (hour >= 20 || hour < 5) {
      pool = [...QUESTION_POOLS.evening, ...QUESTION_POOLS.general];
    } else if (hour >= 5 && hour < 11) {
      pool = [...QUESTION_POOLS.morning, ...QUESTION_POOLS.general];
    } else {
      pool = QUESTION_POOLS.general;
    }
  } else {
    pool = QUESTION_POOLS.general;
  }

  // Shuffle and pick 4
  const shuffled = pool.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 4);

  return { questions: selected };
}

function getHourFromTimeOfDay(timeOfDay?: string): number | null {
  if (!timeOfDay) return null;

  // Accept "morning", "afternoon", "evening", or an ISO timestamp
  switch (timeOfDay.toLowerCase()) {
    case 'morning':
      return 8;
    case 'afternoon':
      return 14;
    case 'evening':
      return 21;
    default: {
      // Try parsing as ISO date
      const date = new Date(timeOfDay);
      if (!isNaN(date.getTime())) {
        return date.getHours();
      }
      return null;
    }
  }
}
