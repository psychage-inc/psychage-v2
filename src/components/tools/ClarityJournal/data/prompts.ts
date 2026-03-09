// Clarity Journal V2 — Guided prompts library
// Evidence-informed prompts drawn from positive psychology, CBT, ACT, and self-compassion research
// Rotates daily — no repetition within a month

export interface JournalPrompt {
  id: string;
  text: string;
  category: 'reflection' | 'intention' | 'gratitude' | 'self-compassion' | 'values' | 'relationships' | 'coping' | 'growth';
}

export const JOURNAL_PROMPTS: JournalPrompt[] = [
  // Reflection (7)
  { id: 'ref-01', text: "What's one thing you handled well this week, even if it was small?", category: 'reflection' },
  { id: 'ref-02', text: 'What drained your energy today? What restored it?', category: 'reflection' },
  { id: 'ref-03', text: 'Write about a moment today where you felt most like yourself.', category: 'reflection' },
  { id: 'ref-04', text: 'What surprised you about today?', category: 'reflection' },
  { id: 'ref-05', text: 'If you could go back to this morning and give yourself one piece of advice, what would it be?', category: 'reflection' },
  { id: 'ref-06', text: 'What emotion showed up most today? What do you think it was trying to tell you?', category: 'reflection' },
  { id: 'ref-07', text: 'Describe your day in three words. Why those three?', category: 'reflection' },

  // Intention (4)
  { id: 'int-01', text: 'What is one small thing you can do tomorrow to take care of yourself?', category: 'intention' },
  { id: 'int-02', text: "What would tomorrow look like if it went well? What's one step toward that?", category: 'intention' },
  { id: 'int-03', text: 'What is one boundary you want to set or maintain this week?', category: 'intention' },
  { id: 'int-04', text: 'What do you need more of right now? Less of?', category: 'intention' },

  // Gratitude (4)
  { id: 'gra-01', text: 'Name three things that went right today, no matter how small.', category: 'gratitude' },
  { id: 'gra-02', text: 'Who made a positive difference in your day? What did they do?', category: 'gratitude' },
  { id: 'gra-03', text: 'What is something about your body or mind that you appreciate today?', category: 'gratitude' },
  { id: 'gra-04', text: "What's one comfort you have access to that you often take for granted?", category: 'gratitude' },

  // Self-Compassion (4)
  { id: 'sc-01', text: "If a friend described your week to you, what would they say you're not giving yourself enough credit for?", category: 'self-compassion' },
  { id: 'sc-02', text: 'What would you say to comfort a friend who had the day you had?', category: 'self-compassion' },
  { id: 'sc-03', text: 'Where are you being hard on yourself right now? Is that standard fair?', category: 'self-compassion' },
  { id: 'sc-04', text: 'Write a permission slip to yourself. What do you give yourself permission to feel, do, or let go of?', category: 'self-compassion' },

  // Values & Meaning (4)
  { id: 'val-01', text: 'When did you feel most aligned with your values today?', category: 'values' },
  { id: 'val-02', text: "What matters most to you right now? Are your actions reflecting that?", category: 'values' },
  { id: 'val-03', text: 'What would you do today if you knew no one would judge you?', category: 'values' },
  { id: 'val-04', text: 'What kind of person do you want to be in your hardest moments?', category: 'values' },

  // Relationships (4)
  { id: 'rel-01', text: 'Who do you wish you could talk to right now? What would you say?', category: 'relationships' },
  { id: 'rel-02', text: 'Describe a moment of genuine connection you had recently.', category: 'relationships' },
  { id: 'rel-03', text: 'Is there a relationship that needs attention right now? What would help?', category: 'relationships' },
  { id: 'rel-04', text: "Who in your life makes you feel safe? What is it about them?", category: 'relationships' },

  // Coping (4)
  { id: 'cop-01', text: "What are you avoiding right now? What would happen if you faced it?", category: 'coping' },
  { id: 'cop-02', text: 'What coping strategy have you used recently that actually helped?', category: 'coping' },
  { id: 'cop-03', text: 'When you feel overwhelmed, what is the first thing you reach for? Is it helping?', category: 'coping' },
  { id: 'cop-04', text: 'What is one healthy way you could process the stress you are carrying?', category: 'coping' },

  // Growth (4)
  { id: 'gro-01', text: 'What is something you can do now that you could not do a year ago?', category: 'growth' },
  { id: 'gro-02', text: 'What challenge taught you the most about yourself recently?', category: 'growth' },
  { id: 'gro-03', text: 'Where do you see yourself growing, even slowly?', category: 'growth' },
  { id: 'gro-04', text: 'What mistake did you learn the most from recently?', category: 'growth' },
];

/** Get today's prompt (rotates daily based on day-of-year) */
export function getDailyPrompt(): JournalPrompt {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return JOURNAL_PROMPTS[dayOfYear % JOURNAL_PROMPTS.length];
}

/** Get a random prompt, optionally filtered by category */
export function getRandomPrompt(category?: JournalPrompt['category']): JournalPrompt {
  const pool = category ? JOURNAL_PROMPTS.filter(p => p.category === category) : JOURNAL_PROMPTS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export const PROMPT_CATEGORIES = [
  { id: 'reflection' as const, label: 'Reflection', icon: 'Eye' },
  { id: 'intention' as const, label: 'Intention', icon: 'Target' },
  { id: 'gratitude' as const, label: 'Gratitude', icon: 'Heart' },
  { id: 'self-compassion' as const, label: 'Self-Compassion', icon: 'Flower2' },
  { id: 'values' as const, label: 'Values', icon: 'Compass' },
  { id: 'relationships' as const, label: 'Relationships', icon: 'Users' },
  { id: 'coping' as const, label: 'Coping', icon: 'Shield' },
  { id: 'growth' as const, label: 'Growth', icon: 'Sprout' },
] as const;
