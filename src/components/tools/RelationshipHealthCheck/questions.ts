import type { RelationshipQuestion } from './types';

export const QUESTIONS: RelationshipQuestion[] = [
  // ── Partner (6 questions) ──────────────────────────────────────────
  {
    id: 'partner_01',
    domain: 'partner',
    text: 'I feel emotionally supported by my partner.',
    reverseScored: false,
  },
  {
    id: 'partner_02',
    domain: 'partner',
    text: 'My partner and I communicate openly about what matters to us.',
    reverseScored: false,
  },
  {
    id: 'partner_03',
    domain: 'partner',
    text: 'When we disagree, I feel heard and respected.',
    reverseScored: false,
  },
  {
    id: 'partner_04',
    domain: 'partner',
    text: 'I can be fully myself around my partner.',
    reverseScored: false,
  },
  {
    id: 'partner_05',
    domain: 'partner',
    text: 'I often feel lonely even when my partner is around.',
    reverseScored: true,
    isDistressItem: true,
  },
  {
    id: 'partner_06',
    domain: 'partner',
    text: 'I worry about the stability of my relationship.',
    reverseScored: true,
    isDistressItem: true,
  },

  // ── Family (6 questions) ───────────────────────────────────────────
  {
    id: 'family_01',
    domain: 'family',
    text: 'I can turn to my family when I need emotional support.',
    reverseScored: false,
  },
  {
    id: 'family_02',
    domain: 'family',
    text: 'I feel accepted by my family for who I am.',
    reverseScored: false,
  },
  {
    id: 'family_03',
    domain: 'family',
    text: 'My family celebrates my achievements and supports my goals.',
    reverseScored: false,
  },
  {
    id: 'family_04',
    domain: 'family',
    text: 'I feel a sense of belonging within my family.',
    reverseScored: false,
  },
  {
    id: 'family_05',
    domain: 'family',
    text: 'There are unresolved tensions in my family that affect my well-being.',
    reverseScored: true,
  },
  {
    id: 'family_06',
    domain: 'family',
    text: 'I feel pressure to be someone I\'m not around my family.',
    reverseScored: true,
  },

  // ── Friends (6 questions) ──────────────────────────────────────────
  {
    id: 'friends_01',
    domain: 'friends',
    text: 'I have at least one friend I can be completely honest with.',
    reverseScored: false,
  },
  {
    id: 'friends_02',
    domain: 'friends',
    text: 'My friendships feel balanced — not mostly one-sided.',
    reverseScored: false,
  },
  {
    id: 'friends_03',
    domain: 'friends',
    text: 'I regularly spend meaningful time with friends.',
    reverseScored: false,
  },
  {
    id: 'friends_04',
    domain: 'friends',
    text: 'I feel comfortable reaching out to friends when I need support.',
    reverseScored: false,
  },
  {
    id: 'friends_05',
    domain: 'friends',
    text: 'I often wish I had more meaningful friendships.',
    reverseScored: true,
  },
  {
    id: 'friends_06',
    domain: 'friends',
    text: 'I feel like I have drifted apart from people I used to be close to.',
    reverseScored: true,
  },

  // ── Community (6 questions) ────────────────────────────────────────
  {
    id: 'community_01',
    domain: 'community',
    text: 'I feel a sense of belonging in my neighborhood or community.',
    reverseScored: false,
  },
  {
    id: 'community_02',
    domain: 'community',
    text: 'I have positive relationships with people I work or study with.',
    reverseScored: false,
  },
  {
    id: 'community_03',
    domain: 'community',
    text: 'I participate in group activities or organizations that matter to me.',
    reverseScored: false,
  },
  {
    id: 'community_04',
    domain: 'community',
    text: 'I feel valued and respected in my workplace or school.',
    reverseScored: false,
  },
  {
    id: 'community_05',
    domain: 'community',
    text: 'I feel disconnected from the people in my daily environment.',
    reverseScored: true,
  },
  {
    id: 'community_06',
    domain: 'community',
    text: 'I rarely interact with my neighbors or local community.',
    reverseScored: true,
  },
];

/** Get questions filtered by whether user has a partner */
export function getActiveQuestions(skipPartner: boolean): RelationshipQuestion[] {
  if (skipPartner) {
    return QUESTIONS.filter((q) => q.domain !== 'partner');
  }
  return QUESTIONS;
}

/** Get questions for a specific domain */
export function getDomainQuestions(domain: string): RelationshipQuestion[] {
  return QUESTIONS.filter((q) => q.domain === domain);
}
