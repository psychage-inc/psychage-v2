/**
 * Evidence-Based Intervention Library for Relationship Health Check v2.
 *
 * ~25 interventions sourced from Gottman Method, EFT, PREPARE/ENRICH,
 * Reis & Shaver, Stafford & Canary, and general clinical practice.
 *
 * Each intervention includes specific behavioral steps, difficulty rating,
 * time estimate, and academic citation.
 */

import type { Intervention, DetectedPattern } from './types';

export const INTERVENTIONS: Record<string, Intervention> = {
  // ── Partner interventions (Gottman Method) ─────────────────────────────

  gottman_softened_startup: {
    id: 'gottman_softened_startup',
    title: 'Softened Start-Up for Conflict',
    description:
      'Replace harsh criticism with a gentle approach using the XYZ format: "When X happens, I feel Y, and I need Z." This prevents the criticism horseman and keeps conversations productive.',
    frameworkRef: 'gottman_horsemen',
    citation: 'Gottman, J. M., & Silver, N. (2015). The Seven Principles for Making Marriage Work. Harmony Books.',
    domain: 'partner',
    difficulty: 'moderate',
    timeEstimate: '5 minutes per conversation',
    steps: [
      'Think of a specific recent situation that bothered you (not a pattern)',
      'Write it in XYZ format: "When [specific event], I felt [emotion], and I need [request]"',
      'Start with "I" not "You" — describe your experience, not their character',
      'Practice this format before your next real disagreement',
      'After trying it, notice how your partner\'s response differs from usual',
    ],
  },

  gottman_appreciation_audit: {
    id: 'gottman_appreciation_audit',
    title: 'Daily Appreciation Practice',
    description:
      'Gottman found that stable couples maintain a 5:1 ratio of positive to negative interactions. This exercise builds your fondness and admiration system — the antidote to contempt.',
    frameworkRef: 'gottman_srh',
    citation: 'Gottman, J. M. (1999). The Marriage Clinic. W.W. Norton & Company.',
    domain: 'partner',
    difficulty: 'easy',
    timeEstimate: '2 minutes daily',
    steps: [
      'Each evening, identify 3 specific things your partner did that you appreciate',
      'Express at least 1 of these to your partner directly — be specific, not generic',
      'Example: "I noticed you made coffee this morning before I woke up. That made me feel cared for"',
      'Avoid backhanded compliments ("You were actually nice today")',
      'Track this for 7 days and notice how it shifts the emotional climate',
    ],
  },

  gottman_turning_toward: {
    id: 'gottman_turning_toward',
    title: 'Recognize and Turn Toward Bids',
    description:
      'A "bid" is any attempt to connect — a sigh, a comment, a touch. Gottman found couples who turned toward bids 86% of the time were still married 6 years later; those at 33% were divorced.',
    frameworkRef: 'gottman_srh',
    citation: 'Gottman, J. M. (2011). The Science of Trust. W.W. Norton & Company.',
    domain: 'partner',
    difficulty: 'easy',
    timeEstimate: 'Ongoing awareness',
    steps: [
      'For one day, notice when your partner makes a bid for connection (comments, questions, gestures)',
      'When you notice a bid, respond by turning toward: acknowledge, engage, show interest',
      'Even a brief "mm-hmm, tell me more" counts — turning toward doesn\'t require a long conversation',
      'Notice bids you might usually miss: "Look at this," a sigh, showing you something on their phone',
      'At the end of the day, reflect on how many bids you noticed versus how many you responded to',
    ],
  },

  gottman_repair_attempts: {
    id: 'gottman_repair_attempts',
    title: 'Repair Attempt Toolkit',
    description:
      'Repair attempts are any statement or action that de-escalates negativity during conflict. The success of repairs — not the frequency of conflict — is what separates stable from unstable couples.',
    frameworkRef: 'gottman_srh',
    citation: 'Gottman, J. M., & Silver, N. (2015). The Seven Principles for Making Marriage Work. Harmony Books.',
    domain: 'partner',
    difficulty: 'moderate',
    timeEstimate: 'Use during conflict',
    steps: [
      'Learn 3-4 repair phrases: "Can we take a break?", "I\'m sorry, let me try again", "You\'re right about that part"',
      'When you feel a conversation escalating, use one of your phrases',
      'If your partner attempts a repair, receive it — don\'t dismiss or override it',
      'If your heart rate exceeds 100 BPM during an argument, request a 20-minute break before continuing',
      'After the break, re-approach with a softened start-up',
    ],
  },

  gottman_stress_reducing: {
    id: 'gottman_stress_reducing',
    title: 'Stress-Reducing Conversation',
    description:
      'A daily 20-minute ritual where partners discuss the stresses of their day (NOT relationship issues). The goal is to be an ally against the world, not to fix or advise.',
    frameworkRef: 'gottman_srh',
    citation: 'Gottman, J. M. (1999). The Marriage Clinic. W.W. Norton & Company.',
    domain: 'partner',
    difficulty: 'easy',
    timeEstimate: '20 minutes daily',
    steps: [
      'Set aside 20 minutes at the end of the day (no screens)',
      'Take turns (10 min each) sharing what stressed you today — work, traffic, health, anything',
      'The listener\'s job: show understanding, take your partner\'s side, express empathy',
      'Do NOT offer advice unless explicitly asked. Do NOT bring up relationship complaints',
      'End by expressing gratitude for the conversation: "Thanks for listening"',
    ],
  },

  gottman_love_maps: {
    id: 'gottman_love_maps',
    title: 'Love Maps Update',
    description:
      'A Love Map is your cognitive room for knowing your partner\'s inner world — their dreams, worries, preferences, and history. Updating it regularly prevents emotional drift.',
    frameworkRef: 'gottman_srh',
    citation: 'Gottman, J. M., & Silver, N. (2015). The Seven Principles for Making Marriage Work. Harmony Books.',
    domain: 'partner',
    difficulty: 'easy',
    timeEstimate: '15 minutes weekly',
    steps: [
      'Set a weekly 15-minute "Love Map date" (can be during a walk or meal)',
      'Ask open-ended questions: "What\'s been on your mind lately?", "What are you looking forward to?"',
      'Go deeper: "What\'s your biggest worry right now?", "Is there a dream you haven\'t told me about?"',
      'Listen with genuine curiosity — this is about learning, not solving',
      'Over time, build knowledge of their friends, stressors, life dreams, and current concerns',
    ],
  },

  gottman_shared_meaning: {
    id: 'gottman_shared_meaning',
    title: 'Create a Shared Meaning Ritual',
    description:
      'Gottman Level 7 is about creating a shared culture — the rituals, stories, and goals that give your relationship a sense of "us." Couples with shared meaning report deeper satisfaction.',
    frameworkRef: 'gottman_srh',
    citation: 'Gottman, J. M. (1999). The Marriage Clinic. W.W. Norton & Company.',
    domain: 'partner',
    difficulty: 'moderate',
    timeEstimate: '30 minutes to plan',
    steps: [
      'Together, list your current rituals (bedtime routine, weekend activities, how you greet each other)',
      'Identify which rituals feel meaningful and which have become empty or lost',
      'Create or revive ONE ritual this week — a daily check-in, a weekly date, a morning coffee together',
      'Discuss: "What values do we want our relationship to stand for?"',
      'Write a brief "relationship mission statement" — what your partnership is about beyond daily logistics',
    ],
  },

  // ── Family interventions ──────────────────────────────────────────────

  family_boundary_script: {
    id: 'family_boundary_script',
    title: 'Boundary Communication Script',
    description:
      'A structured approach to setting boundaries with family members that maintains connection while protecting your well-being. Uses the DEAR MAN framework from DBT.',
    frameworkRef: 'prepare_enrich',
    citation: 'Linehan, M. M. (2015). DBT Skills Training Manual (2nd ed.). Guilford Press.',
    domain: 'family',
    difficulty: 'challenging',
    timeEstimate: '15 minutes to prepare',
    steps: [
      'Describe: State the specific situation factually ("When family dinners include comments about my career...")',
      'Express: Share how it affects you ("I feel pressured and less excited to visit")',
      'Assert: State your request clearly ("I\'d like us to keep dinner conversation supportive")',
      'Reinforce: Explain the positive outcome ("I\'ll feel more relaxed and visit more often")',
      'Practice: Write this out before the conversation. Deliver it calmly, not during conflict',
    ],
  },

  family_differentiation: {
    id: 'family_differentiation',
    title: 'Differentiation Reflection Exercise',
    description:
      'Based on Murray Bowen\'s family systems theory, this exercise helps you identify where you end and your family begins — maintaining your identity while staying emotionally connected.',
    frameworkRef: 'prepare_enrich',
    citation: 'Bowen, M. (1978). Family Therapy in Clinical Practice. Jason Aronson.',
    domain: 'family',
    difficulty: 'moderate',
    timeEstimate: '20 minutes',
    steps: [
      'List 3 beliefs or values you hold that differ from your family\'s expectations',
      'For each, ask: "Am I holding this belief because I genuinely chose it, or because I\'m rebelling against family?"',
      'Identify 1 area where you currently change your behavior to avoid family disapproval',
      'Practice expressing your authentic position on a low-stakes topic first',
      'Notice the difference between "I disagree with my family" and "I am my own person who also loves my family"',
    ],
  },

  family_meeting: {
    id: 'family_meeting',
    title: 'Structured Family Check-In',
    description:
      'A regular, structured conversation format that creates a safe space for addressing family tensions before they build up. Based on family therapy meeting protocols.',
    frameworkRef: 'prepare_enrich',
    citation: 'Olson, D. H., & Olson, A. K. (2000). Empowering Couples: Building on Your Strengths. Life Innovations.',
    domain: 'family',
    difficulty: 'moderate',
    timeEstimate: '30 minutes monthly',
    steps: [
      'Schedule a monthly family check-in (even if just between you and one family member)',
      'Start with appreciations: each person shares 1 thing they appreciate about the other',
      'Raise ONE concern using "I" statements — no blame, no history-diving',
      'Together, brainstorm one small step to address the concern',
      'End with a shared activity or meal — the check-in is not the whole visit',
    ],
  },

  // ── Friends interventions ─────────────────────────────────────────────

  friends_vulnerability_ladder: {
    id: 'friends_vulnerability_ladder',
    title: 'Vulnerability Ladder',
    description:
      'Based on the Reis & Shaver intimacy process model, this exercise helps you gradually deepen friendships through progressive self-disclosure.',
    frameworkRef: 'reis_shaver',
    citation: 'Reis, H. T., & Shaver, P. (1988). Intimacy as an interpersonal process. Handbook of Personal Relationships.',
    domain: 'friends',
    difficulty: 'moderate',
    timeEstimate: 'Gradual, over weeks',
    steps: [
      'Rung 1: Share an opinion you normally keep to yourself (a preference, a mild frustration)',
      'Rung 2: Share something you\'re currently struggling with (work stress, a difficult decision)',
      'Rung 3: Share a deeper feeling (something you\'re afraid of, a regret, a hope for the future)',
      'Pay attention to their response — does it feel understanding, validating, and caring?',
      'Match their level of disclosure — intimacy is a mutual escalation, not a one-sided confession',
    ],
  },

  friends_reconnection: {
    id: 'friends_reconnection',
    title: 'Reconnection Message',
    description:
      'A low-pressure way to re-engage with friends you\'ve drifted from. Research shows that most people underestimate how much others would appreciate hearing from them.',
    frameworkRef: 'stafford_canary',
    citation: 'Liu, P. J., & Epley, N. (2022). Underestimating the positive impact of reaching out. Journal of Personality and Social Psychology, 123(5), 986.',
    domain: 'friends',
    difficulty: 'easy',
    timeEstimate: '5 minutes',
    steps: [
      'Pick one friend you haven\'t spoken to in months',
      'Send a brief, genuine message: "I was thinking about you today and wanted to reach out. How have you been?"',
      'Don\'t overthink it — a 2022 study found people consistently underestimate how much others appreciate unexpected contact',
      'If they respond, suggest a low-commitment catch-up: a 15-minute call or a walk',
      'Repeat with one friend per week for a month',
    ],
  },

  friends_maintenance_schedule: {
    id: 'friends_maintenance_schedule',
    title: 'Friendship Maintenance Rhythm',
    description:
      'Stafford & Canary\'s research shows relationships require routine maintenance to survive. This exercise creates a sustainable rhythm for staying connected.',
    frameworkRef: 'stafford_canary',
    citation: 'Stafford, L. (2011). Measuring relationship maintenance behaviors. Journal of Social and Personal Relationships, 28(2).',
    domain: 'friends',
    difficulty: 'easy',
    timeEstimate: '10 minutes to set up',
    steps: [
      'List your 3-5 closest friends (or the ones you wish were closer)',
      'For each, set a realistic contact rhythm: weekly text, biweekly call, monthly hangout',
      'Add calendar reminders — don\'t rely on "I\'ll remember"',
      'Quality matters more than frequency: one genuine conversation beats 10 "hey how are you" texts',
      'Alternate who initiates — balanced maintenance signals mutual investment',
    ],
  },

  // ── Community interventions ───────────────────────────────────────────

  community_micro_belonging: {
    id: 'community_micro_belonging',
    title: 'Micro-Belonging Practices',
    description:
      'Small, daily actions that build a sense of community connection without requiring major time commitment. These micro-interactions compound over time.',
    frameworkRef: 'general_social',
    citation: 'Holt-Lunstad, J. (2010). Social relationships and mortality risk. PLoS Medicine, 7(7).',
    domain: 'community',
    difficulty: 'easy',
    timeEstimate: '2-5 minutes daily',
    steps: [
      'Greet people you see regularly — the barista, the security guard, your mail carrier — by name if you know it',
      'Linger 30 seconds longer in casual conversations: "How\'s your day going?" and actually listen',
      'Smile and make eye contact with strangers (research shows this boosts both parties\' mood)',
      'Leave a positive comment or review for a local business you appreciate',
      'Say "thank you" with specificity: not just "thanks" but "thank you for staying late to help me"',
    ],
  },

  community_volunteering: {
    id: 'community_volunteering',
    title: 'Volunteering Gateway',
    description:
      'Volunteering is one of the most effective ways to build community connection because it simultaneously creates purpose, social contact, and a sense of contribution.',
    frameworkRef: 'general_social',
    citation: 'Jenkinson, C. E., et al. (2013). Is volunteering a public health intervention? BMC Public Health, 13, 773.',
    domain: 'community',
    difficulty: 'moderate',
    timeEstimate: '2-4 hours monthly',
    steps: [
      'Identify 1-2 causes that genuinely matter to you (not what you "should" care about)',
      'Search for volunteer opportunities in your area (VolunteerMatch.org, local community boards)',
      'Start with a one-time event to test the waters — no ongoing commitment yet',
      'Notice who you connect with during the experience',
      'If it feels right, commit to a recurring schedule (weekly or monthly)',
    ],
  },

  community_third_place: {
    id: 'community_third_place',
    title: 'Find Your Third Place',
    description:
      'Sociologist Ray Oldenburg coined "third place" for the social environments separate from home (first) and work (second) — cafes, parks, libraries, gyms — where community bonds naturally form.',
    frameworkRef: 'general_social',
    citation: 'Oldenburg, R. (1999). The Great Good Place. Da Capo Press.',
    domain: 'community',
    difficulty: 'easy',
    timeEstimate: '1 hour weekly',
    steps: [
      'List places in your area where you could become a "regular": a café, gym, library, park, house of worship',
      'Choose one and visit at the same time each week for a month',
      'Bring a book or laptop if you need an activity — being present is enough at first',
      'Notice who else is a regular; over time, make brief conversation',
      'Consistency is key — regularity creates recognition, and recognition creates belonging',
    ],
  },

  // ── General / cross-domain interventions ──────────────────────────────

  general_professional_support: {
    id: 'general_professional_support',
    title: 'Seek Professional Support',
    description:
      'When relationship patterns feel entrenched, a trained therapist can help you see blind spots, break cycles, and build skills that are difficult to develop alone.',
    frameworkRef: 'general_social',
    citation: 'Wampold, B. E. (2015). The Great Psychotherapy Debate (2nd ed.). Routledge.',
    domain: 'general',
    difficulty: 'moderate',
    timeEstimate: '1 hour weekly',
    steps: [
      'Consider what type of support fits: individual therapy, couples therapy, or family therapy',
      'For romantic issues: look for therapists trained in Gottman Method or Emotionally Focused Therapy',
      'For family issues: look for family systems therapists',
      'Use your insurance provider directory or Psychology Today\'s therapist finder',
      'A good therapeutic fit matters more than the specific approach — give yourself permission to try 2-3 therapists',
    ],
  },

  general_connection_audit: {
    id: 'general_connection_audit',
    title: 'Relationship Portfolio Audit',
    description:
      'A structured reflection on the balance of your social connections across all life domains. Helps identify gaps and strengths in your overall support network.',
    frameworkRef: 'general_social',
    citation: 'Cohen, S., & Wills, T. A. (1985). Stress, social support, and the buffering hypothesis. Psychological Bulletin, 98(2).',
    domain: 'general',
    difficulty: 'easy',
    timeEstimate: '15 minutes',
    steps: [
      'Draw 4 circles on paper: Partner, Family, Friends, Community',
      'In each, list the people you feel meaningfully connected to',
      'Mark each connection with + (energizing) or - (draining) or = (neutral)',
      'Notice: which circle is fullest? Which is emptiest? Are there mostly + or - connections?',
      'Choose ONE action to strengthen the emptiest circle this week',
    ],
  },
};

/**
 * Get interventions for a detected pattern, sorted by difficulty (easy first).
 */
export function getPatternInterventions(pattern: DetectedPattern): Intervention[] {
  const difficultyOrder = { easy: 0, moderate: 1, challenging: 2 };
  return pattern.interventionKeys
    .map((key) => INTERVENTIONS[key])
    .filter(Boolean)
    .sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
}

/**
 * Get top interventions across all detected patterns, deduplicated and ranked.
 */
export function getTopInterventions(
  patterns: DetectedPattern[],
  limit = 4
): Intervention[] {
  const seen = new Set<string>();
  const result: Intervention[] = [];

  for (const pattern of patterns) {
    for (const key of pattern.interventionKeys) {
      if (seen.has(key)) continue;
      seen.add(key);
      const intervention = INTERVENTIONS[key];
      if (intervention) result.push(intervention);
      if (result.length >= limit) return result;
    }
  }

  return result;
}
