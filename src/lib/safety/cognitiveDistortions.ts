/**
 * Cognitive distortion definitions — shared CBT reference data.
 * Used by ClarityJournal report engine for thought record analysis.
 */

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
