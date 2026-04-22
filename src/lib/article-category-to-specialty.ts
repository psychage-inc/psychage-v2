/**
 * Bidirectional mapping between article category slugs and provider specialty slugs.
 * Used for cross-flow connections: articles → provider search, provider profiles → articles.
 */

/** Article category slug → provider specialty slug(s) */
export const CATEGORY_TO_SPECIALTY: Record<string, string> = {
  'emotional-regulation': 'emotional-regulation',
  'anxiety-stress': 'anxiety',
  'relationships-communication': 'couples-therapy',
  'self-worth-identity': 'self-esteem',
  'depression-grief': 'depression',
  'habits-behavior-change': 'behavioral-health',
  'sleep-body-connection': 'sleep-disorders',
  'trauma-healing': 'trauma',
  'chronic-illness-pain': 'chronic-pain',
  'womens-mental-health': 'womens-health',
  'mens-mental-health': 'mens-health',
  'aging-dementia-late-life': 'geriatric',
  'family-parenting': 'family-therapy',
};

/** Provider specialty slug → article category slug */
export const SPECIALTY_TO_CATEGORY: Record<string, string> = {
  'anxiety': 'anxiety-stress',
  'depression': 'depression-grief',
  'trauma': 'trauma-healing',
  'ptsd': 'trauma-healing',
  'couples-therapy': 'relationships-communication',
  'family-therapy': 'family-parenting',
  'sleep-disorders': 'sleep-body-connection',
  'chronic-pain': 'chronic-illness-pain',
  'womens-health': 'womens-mental-health',
  'mens-health': 'mens-mental-health',
  'geriatric': 'aging-dementia-late-life',
  'behavioral-health': 'habits-behavior-change',
  'self-esteem': 'self-worth-identity',
  'emotional-regulation': 'emotional-regulation',
  'ocd': 'anxiety-stress',
  'eating-disorders': 'habits-behavior-change',
  'substance-abuse': 'habits-behavior-change',
  'adhd': 'work-productivity',
  'bipolar': 'emotional-regulation',
};
