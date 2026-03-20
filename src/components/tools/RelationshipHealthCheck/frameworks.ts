import type { FrameworkKey } from './types';

export interface FrameworkInfo {
  key: FrameworkKey;
  name: string;
  shortName: string;
  authors: string;
  year: number;
  description: string;
  keyInsight: string;
  citation: string;
}

export const FRAMEWORKS: Record<FrameworkKey, FrameworkInfo> = {
  gottman_srh: {
    key: 'gottman_srh',
    name: 'Sound Relationship House Theory',
    shortName: 'Gottman SRH',
    authors: 'John & Julie Gottman',
    year: 1999,
    description:
      'A 7-level model of relationship health developed from 40+ years of longitudinal research observing 3,000+ couples. The levels build from cognitive knowledge of your partner up through shared meaning and culture.',
    keyInsight:
      'Successful relationships are built from the bottom up — you cannot create shared meaning without first establishing trust, fondness, and constructive conflict patterns.',
    citation:
      'Gottman, J. M. (1999). The Marriage Clinic: A Scientifically-Based Marital Therapy. W.W. Norton & Company.',
  },
  gottman_horsemen: {
    key: 'gottman_horsemen',
    name: 'The Four Horsemen of the Apocalypse',
    shortName: 'Four Horsemen',
    authors: 'John Gottman & Robert Levenson',
    year: 2000,
    description:
      'Four communication patterns — criticism, contempt, defensiveness, and stonewalling — identified as the most destructive behaviors in relationships. Their presence predicts divorce with 93.6% accuracy.',
    keyInsight:
      'Contempt is the single strongest predictor of divorce. It is the sulfuric acid of relationships. The antidote is building a culture of appreciation and fondness.',
    citation:
      'Gottman, J. M., & Levenson, R. W. (2000). The timing of divorce: Predicting when a couple will divorce over a 14-year period. Journal of Marriage and Family, 62(3), 737-745.',
  },
  eft_are: {
    key: 'eft_are',
    name: 'Emotionally Focused Therapy — ARE Model',
    shortName: 'EFT',
    authors: 'Sue Johnson',
    year: 2008,
    description:
      'ARE stands for Accessibility, Responsiveness, and Engagement — the three qualities that define a secure emotional bond. EFT is the most empirically validated approach to couples therapy, with 70-75% of couples moving from distress to recovery.',
    keyInsight:
      'Relationship distress is fundamentally an attachment crisis. When partners feel they cannot reach each other emotionally, they fall into negative cycles like pursue-withdraw.',
    citation:
      'Johnson, S. M. (2008). Hold Me Tight: Seven Conversations for a Lifetime of Love. Little, Brown and Company.',
  },
  attachment_ecr: {
    key: 'attachment_ecr',
    name: 'Adult Attachment Theory (ECR-R)',
    shortName: 'Attachment',
    authors: 'Brennan, Clark & Shaver; Fraley, Waller & Brennan',
    year: 2000,
    description:
      'Attachment in adult relationships operates along two dimensions: anxiety (fear of rejection) and avoidance (discomfort with closeness). The combination determines your attachment style: secure, anxious, avoidant, or fearful.',
    keyInsight:
      'Attachment security is not fixed — it can shift through corrective emotional experiences in relationships. One secure relationship can reshape your entire attachment orientation.',
    citation:
      'Fraley, R. C., Waller, N. G., & Brennan, K. A. (2000). An item response theory analysis of self-report measures of adult attachment. Journal of Personality and Social Psychology, 78(2), 350-365.',
  },
  reis_shaver: {
    key: 'reis_shaver',
    name: 'Interpersonal Process Model of Intimacy',
    shortName: 'Intimacy Process',
    authors: 'Harry Reis & Phillip Shaver',
    year: 1988,
    description:
      'Intimacy is not a trait but a transactional process: Person A discloses → Person B responds with understanding, validation, and care → Person A feels understood. The process is bidirectional and builds on itself.',
    keyInsight:
      'Relationships die not from conflict but from failed intimacy processes — when partners stop disclosing or stop responding. Emotional disclosure, not just factual sharing, is what builds true closeness.',
    citation:
      'Reis, H. T., & Shaver, P. (1988). Intimacy as an interpersonal process. In S. Duck (Ed.), Handbook of Personal Relationships (pp. 367-389). John Wiley & Sons.',
  },
  equity_theory: {
    key: 'equity_theory',
    name: 'Equity Theory in Relationships',
    shortName: 'Equity Theory',
    authors: 'Elaine Hatfield (Walster) & colleagues',
    year: 1978,
    description:
      'Relationships are most satisfying when both partners perceive the give-and-take to be fair. Both over-benefited and under-benefited partners report lower satisfaction than equitably maintained partners.',
    keyInsight:
      'Fairness is perception-based, not objective. What matters is whether both people feel the relationship is balanced — and this perception requires ongoing communication.',
    citation:
      'Walster, E., Walster, G. W., & Berscheid, E. (1978). Equity: Theory and Research. Allyn & Bacon.',
  },
  joel_ml: {
    key: 'joel_ml',
    name: 'Machine Learning Meta-Analysis of Relationship Quality',
    shortName: 'Joel et al. ML',
    authors: 'Samantha Joel & colleagues',
    year: 2020,
    description:
      'The largest machine learning analysis of relationship quality ever conducted — 43 datasets, 11,196 couples. Used ML to identify which variables most powerfully predict relationship satisfaction.',
    keyInsight:
      'How you perceive your specific partner matters far more than who you are as a person. Perceived partner commitment, appreciation, and trust outpredict personality, demographics, and attachment style.',
    citation:
      'Joel, S., Eastwick, P. W., & Finkel, E. J. (2020). Is romantic desire predictable? Machine learning applied to initial romantic attraction. Psychological Science, 28(10), 1478-1489.',
  },
  stafford_canary: {
    key: 'stafford_canary',
    name: 'Relational Maintenance Behaviors',
    shortName: 'Maintenance',
    authors: 'Laura Stafford & Daniel Canary',
    year: 2011,
    description:
      'Seven strategies that sustain relationships: positivity, understanding, self-disclosure, relationship talk, tasks, networks, and assurances. The best maintenance is when these behaviors become second nature.',
    keyInsight:
      'Routine maintenance behaviors (enacted without conscious effort) are more strongly associated with satisfaction than strategic ones. The best relationship care is habitual, not forced.',
    citation:
      'Stafford, L. (2011). Measuring relationship maintenance behaviors: Critique and development of the revised relationship maintenance behavior scale. Journal of Social and Personal Relationships, 28(2), 278-303.',
  },
  prepare_enrich: {
    key: 'prepare_enrich',
    name: 'PREPARE/ENRICH Assessment Program',
    shortName: 'PREPARE/ENRICH',
    authors: 'David Olson & colleagues',
    year: 1996,
    description:
      'The most widely used premarital and marriage assessment, taken by 4 million+ couples across 75+ countries. Measures communication, conflict resolution, closeness, flexibility, and family dynamics.',
    keyInsight:
      'PREPARE scores predict with 80-85% accuracy which premarital couples will divorce versus remain happily married. The key metric is partner agreement — not individual scores but how well the couple aligns.',
    citation:
      'Olson, D. H., & Olson, A. K. (2000). Empowering Couples: Building on Your Strengths. Life Innovations.',
  },
  general_social: {
    key: 'general_social',
    name: 'Social Support & Connection Research',
    shortName: 'Social Science',
    authors: 'Multiple researchers',
    year: 2023,
    description:
      'Decades of research consistently show that perceived social support is the #1 factor associated with mental health outcomes — stronger than income, education, or even genetic factors.',
    keyInsight:
      'Loneliness is as harmful to health as smoking 15 cigarettes per day. But the quality of connections matters more than quantity — one deep relationship outweighs many superficial ones.',
    citation:
      'Holt-Lunstad, J., Smith, T. B., & Layton, J. B. (2010). Social relationships and mortality risk: A meta-analytic review. PLoS Medicine, 7(7), e1000316.',
  },
};

/** Get frameworks relevant to a specific set of pattern keys */
export function getRelevantFrameworks(
  frameworkRefs: FrameworkKey[],
  limit = 3
): FrameworkInfo[] {
  const unique = [...new Set(frameworkRefs)];
  return unique.slice(0, limit).map((key) => FRAMEWORKS[key]);
}
