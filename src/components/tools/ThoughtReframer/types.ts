// Thought Reframer — CBT-based cognitive restructuring tool
// All types, constants, and distortion data

export type ReframerMode = 'guided' | 'quick';

export interface EmotionRating {
  name: string;
  intensity: number; // 0-100
}

export interface ThoughtRecord {
  id: string;
  createdAt: string; // ISO 8601
  mode: ReframerMode;
  situation: string;
  emotions: EmotionRating[];
  automaticThought: string;
  distortions: string[]; // distortion IDs
  evidenceFor: string;
  evidenceAgainst: string;
  balancedThought: string;
  emotionsAfter: EmotionRating[];
  completed: boolean;
}

export interface CognitiveDistortion {
  id: string;
  name: string;
  description: string;
  example: string;
  doesThisFit: string;
}

export const COGNITIVE_DISTORTIONS: CognitiveDistortion[] = [
  {
    id: 'all-or-nothing',
    name: 'All-or-Nothing Thinking',
    description: 'Seeing things in black and white — if it\'s not perfect, it\'s a failure.',
    example: '"If I don\'t get an A, I\'m a complete failure."',
    doesThisFit: 'Are you judging the situation in extremes, with no middle ground?',
  },
  {
    id: 'overgeneralization',
    name: 'Overgeneralization',
    description: 'Drawing broad conclusions from a single event.',
    example: '"I failed this test, so I\'ll never succeed at anything."',
    doesThisFit: 'Are you using words like "always," "never," or "every time"?',
  },
  {
    id: 'mental-filter',
    name: 'Mental Filter',
    description: 'Focusing only on the negative and ignoring the positive.',
    example: '"One person criticized my work, so the whole presentation was terrible."',
    doesThisFit: 'Are you dwelling on one negative detail and ignoring everything else?',
  },
  {
    id: 'disqualifying-positive',
    name: 'Disqualifying the Positive',
    description: 'Dismissing positive experiences as not counting.',
    example: '"They only said that to be nice — they didn\'t mean it."',
    doesThisFit: 'Are you explaining away good things that happened?',
  },
  {
    id: 'jumping-to-conclusions',
    name: 'Jumping to Conclusions',
    description: 'Making negative assumptions without evidence. Includes mind reading and fortune telling.',
    example: '"They didn\'t reply, so they must be angry at me."',
    doesThisFit: 'Are you assuming you know what others think, or predicting the worst?',
  },
  {
    id: 'magnification',
    name: 'Magnification / Minimization',
    description: 'Exaggerating negatives or shrinking positives out of proportion.',
    example: '"My small mistake ruined everything, but my success was just luck."',
    doesThisFit: 'Are you blowing something negative out of proportion, or downplaying something positive?',
  },
  {
    id: 'emotional-reasoning',
    name: 'Emotional Reasoning',
    description: 'Treating feelings as evidence of reality.',
    example: '"I feel like a burden, so I must be one."',
    doesThisFit: 'Are you treating your feelings as proof that something is true?',
  },
  {
    id: 'should-statements',
    name: 'Should Statements',
    description: 'Rigid rules about how things must be. Creates guilt and frustration.',
    example: '"I should always be productive. I should never need help."',
    doesThisFit: 'Are you using "should," "must," or "ought to" about yourself or others?',
  },
  {
    id: 'labeling',
    name: 'Labeling',
    description: 'Attaching a fixed, global label to yourself or others based on one behavior.',
    example: '"I made a mistake — I\'m such a loser."',
    doesThisFit: 'Are you defining yourself or someone else by a single action?',
  },
  {
    id: 'personalization',
    name: 'Personalization',
    description: 'Taking responsibility for events outside your control.',
    example: '"My friend is upset; it must be something I did."',
    doesThisFit: 'Are you blaming yourself for something that isn\'t entirely your fault?',
  },
  {
    id: 'catastrophizing',
    name: 'Catastrophizing',
    description: 'Expecting the absolute worst-case scenario.',
    example: '"If I make this mistake, my entire career is over."',
    doesThisFit: 'Are you jumping to the worst possible outcome?',
  },
  {
    id: 'blame',
    name: 'Blame',
    description: 'Holding others entirely responsible for your pain, or entirely blaming yourself.',
    example: '"This is all their fault" or "Everything bad is because of me."',
    doesThisFit: 'Are you placing all the responsibility on one person — yourself or someone else?',
  },
];

export const EMOTION_PRESETS: string[] = [
  'Anxious', 'Sad', 'Angry', 'Frustrated', 'Ashamed',
  'Guilty', 'Hopeless', 'Lonely', 'Overwhelmed', 'Scared',
  'Embarrassed', 'Jealous', 'Disgusted', 'Confused',
];

export const SOCRATIC_PROMPTS: string[] = [
  'What would I tell a close friend thinking this?',
  'Am I confusing a feeling with a fact?',
  'Will this matter in 5 years?',
  'What\'s the most realistic outcome, not the worst case?',
  'Am I taking this personally when it isn\'t about me?',
  'Have I handled something like this successfully before?',
  'What are some other possible explanations?',
  'Am I basing this on feelings rather than facts?',
];

export const CRISIS_KEYWORDS: string[] = [
  'kill myself', 'end my life', 'suicide', 'want to die',
  'better off dead', 'no reason to live', 'end it all',
  'self-harm', 'hurt myself', 'cutting myself',
  // Spanish
  'matarme', 'suicidarme', 'quiero morir',
  // French
  'me tuer', 'me suicider', 'envie de mourir',
];

export const DEFAULT_THOUGHT_RECORD: Omit<ThoughtRecord, 'id' | 'createdAt'> = {
  mode: 'guided',
  situation: '',
  emotions: [],
  automaticThought: '',
  distortions: [],
  evidenceFor: '',
  evidenceAgainst: '',
  balancedThought: '',
  emotionsAfter: [],
  completed: false,
};
