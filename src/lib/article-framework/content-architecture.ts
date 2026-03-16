// ============================================================================
// Psychage Content Architecture — 15 Categories × 1,000 Articles
// ============================================================================
//
// Source: "THE ARTICLE's" — Content Architecture for Psychage
// Prepared for Dr. Lena Dobson, March 2026
//
// Built from 5 layers of analysis:
//   1. Validated Psychological Instruments (PHQ-4, WHO-5, UCLA-3, PSS-4, WHODAS)
//   2. Clinical Condition Coverage (45 Symptom Navigator profiles)
//   3. Global Mental Health Data (WHO, GBD, Surgeon General)
//   4. Search Behavior & Reader Intent (keyword demand, intent classification)
//   5. Cultural & Demographic Reach (global/multilingual stress testing)
//
// Categories 1–12: Life-context foundation
// Categories 13–15 (★): Clinical & structural gap-closers
// ============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ContentCategory {
  /** Category number (1–15) */
  number: number;
  /** Full category name from the content architecture */
  name: string;
  /** URL-safe slug */
  slug: string;
  /** Target number of articles in this category */
  articleTarget: number;
  /** Short description of the category's scope */
  description: string;
  /** Research basis — why this category exists */
  researchBasis: string;
  /** Why this category matters for Psychage specifically */
  platformRole: string;
  /** Clarity Score instruments this category supports */
  clarityScoreInstruments: ClarityInstrument[];
  /** Symptom Navigator condition IDs this category covers */
  navigatorConditions: string[];
  /** Cross-references to related category numbers */
  relatedCategories: number[];
  /** Whether this is a gap-closer category (13–15) */
  isGapCloser: boolean;
}

export type ClarityInstrument =
  | 'PHQ-4'      // Anxiety + Depression screening
  | 'WHO-5'      // General psychological wellbeing
  | 'UCLA-3'     // Social connectedness / loneliness
  | 'PSS-4'      // Perceived stress
  | 'WHODAS';    // Daily functioning

// ---------------------------------------------------------------------------
// The 15 Categories
// ---------------------------------------------------------------------------

export const CONTENT_CATEGORIES: ContentCategory[] = [
  // =========================================================================
  // CATEGORIES 1–12: Life-Context Foundation
  // =========================================================================
  {
    number: 1,
    name: 'Emotional Regulation & Self-Awareness',
    slug: 'emotional-regulation',
    articleTarget: 80,
    description:
      'Foundational emotional literacy — identifying, naming, and modulating emotions. Emotional granularity, self-awareness, and regulation skills.',
    researchBasis:
      'Emotional literacy is identified by the APA as a foundational competency for mental wellness. Research in affective science shows that emotional granularity is associated with better mental health outcomes, reduced reactivity, and more effective coping. The PHQ-4 directly measures emotional distress that regulation skills help address.',
    platformRole:
      'Gateway category. Nearly every other topic — anxiety, relationships, work stress, trauma — requires emotional regulation skill. Pillar content that anchors internal links across the entire library and provides the educational foundation for breathing and grounding tools.',
    clarityScoreInstruments: ['PHQ-4'],
    navigatorConditions: [],
    relatedCategories: [2, 3, 7, 11],
    isGapCloser: false,
  },
  {
    number: 2,
    name: 'Anxiety, Stress & Overwhelm',
    slug: 'anxiety-stress',
    articleTarget: 90,
    description:
      'Understanding and managing anxiety disorders, panic, chronic stress, burnout, and overwhelm. The largest category by article count.',
    researchBasis:
      'Anxiety disorders are the most prevalent mental health conditions globally, affecting ~301 million people (WHO, 2022). "Anxiety" is the highest-volume mental health search term across all major markets. The PSS-4 (perceived stress) is a core Clarity Score instrument, and the PHQ-4 includes the GAD-2 anxiety screen. Burnout is classified in ICD-11 as an occupational phenomenon.',
    platformRole:
      'Largest article allocation — serves the broadest audience and highest search demand. Every article directly supports two Clarity Score dimensions (emotional wellbeing and perceived stress). Primary content funnel for the Symptom Navigator covering GAD, social anxiety, and panic disorder.',
    clarityScoreInstruments: ['PHQ-4', 'PSS-4'],
    navigatorConditions: ['GAD', 'SOC_ANX', 'PAN_DIS', 'PHO', 'ADJ'],
    relatedCategories: [1, 5, 8, 9],
    isGapCloser: false,
  },
  {
    number: 3,
    name: 'Relationships & Communication',
    slug: 'relationships-communication',
    articleTarget: 80,
    description:
      'Navigating connections, attachment patterns, boundaries, conflict resolution, and communication skills in all relationship types.',
    researchBasis:
      'Relationship difficulties are the second most common reason people seek therapy (APA survey data). Attachment theory research (Bowlby, Ainsworth, Levine & Heller) shows relational patterns formed in early life significantly shape adult functioning. Communication skills — active listening, assertive expression, repair attempts — are learnable and improve relationship satisfaction.',
    platformRole:
      'Highest social media engagement of any mental health topic. Every article produces atomizable assets: scripts, boundary frameworks, "signs" lists, do/don\'t comparisons. Natural bridges to Family (6), Self-Worth (4), and Loneliness (15).',
    clarityScoreInstruments: ['UCLA-3'],
    navigatorConditions: ['DPD'],
    relatedCategories: [4, 6, 15],
    isGapCloser: false,
  },
  {
    number: 4,
    name: 'Self-Worth, Confidence & Identity',
    slug: 'self-worth-identity',
    articleTarget: 70,
    description:
      'Self-esteem, self-compassion, identity development, imposter syndrome, body image, and building authentic confidence.',
    researchBasis:
      'Self-esteem and identity are among the most searched psychological topics, yet most content is superficial. Research in self-concept theory (Carl Rogers), self-compassion (Kristin Neff), and identity development (Erikson, Marcia) provides an evidence base for deeper content. Self-worth disturbances are transdiagnostic — they appear across depression, anxiety, eating disorders, and personality patterns.',
    platformRole:
      'Entry point for people who may not identify with a specific condition but are searching for help with how they feel about themselves. Captures audiences who search "why do I feel like I\'m not good enough" rather than "depression." Reaches audiences that condition-focused competitors miss.',
    clarityScoreInstruments: ['WHO-5'],
    navigatorConditions: ['BDD', 'NPD', 'DPD'],
    relatedCategories: [1, 3, 5, 7],
    isGapCloser: false,
  },
  {
    number: 5,
    name: 'Work, Productivity & Burnout',
    slug: 'work-productivity',
    articleTarget: 75,
    description:
      'Workplace mental health, burnout, work-life balance, professional development, and occupational stress management.',
    researchBasis:
      'WHO included burnout in ICD-11. Gallup global data shows 67% of employees report feeling disengaged. Growing body of research on occupational stress and mental health consequences. The WHODAS-adapted functioning items in the Clarity Score directly measure work and daily task performance.',
    platformRole:
      'Dual audience: individuals managing work-related stress and professionals seeking science-backed workplace wellness content. Primary LinkedIn content channel. Bridges to Anxiety (2), Habits (8), and Therapy Navigation (14).',
    clarityScoreInstruments: ['WHODAS', 'PSS-4'],
    navigatorConditions: ['ADJ'],
    relatedCategories: [2, 8, 14],
    isGapCloser: false,
  },
  {
    number: 6,
    name: 'Family, Parenting & Childhood Patterns',
    slug: 'family-parenting',
    articleTarget: 75,
    description:
      'Intergenerational patterns, parenting stress, family systems, ACEs, co-parenting, eldercare, and childhood developmental impact on adult mental health.',
    researchBasis:
      'The ACE (Adverse Childhood Experiences) study established that early life experiences have profound, measurable effects on adult mental and physical health. Research on intergenerational trauma transmission, parenting stress, and family systems theory supports connecting childhood experiences to adult patterns. Parenting-related mental health content is consistently high-demand.',
    platformRole:
      'Bridges Trauma (11) with Relationships (3) and Emotional Regulation (1). Multiple reader profiles: adults examining their own childhood patterns, parents worried about children\'s mental health, family members supporting a loved one. Content clusters: divorce, co-parenting, eldercare, sibling dynamics.',
    clarityScoreInstruments: ['UCLA-3', 'WHO-5'],
    navigatorConditions: ['CPTSD', 'ASD_ACUTE', 'ADJ'],
    relatedCategories: [1, 3, 11],
    isGapCloser: false,
  },
  {
    number: 7,
    name: 'Depression, Grief & Loss',
    slug: 'depression-grief',
    articleTarget: 70,
    description:
      'Depression spectrum, grief and bereavement, prolonged grief disorder, seasonal affective patterns, and emotional loss across life stages.',
    researchBasis:
      'Depression affects over 280 million people globally (WHO, 2022) and is the leading cause of disability worldwide. The PHQ-4 includes the PHQ-2 depression screen — a core Clarity Score dimension. Grief research (Stroebe & Schut, Dual Process Model) and recognition of prolonged grief disorder in DSM-5-TR provides evidence beyond the outdated "five stages" framework.',
    platformRole:
      'High-intent search traffic — people searching "why am I so sad" or "how to deal with grief" are in acute need. Directly supports the PHQ-4 dimension. Grief content serves as an entry point for readers who wouldn\'t identify as "depressed" but are experiencing loss — a nuance clinical platforms often miss.',
    clarityScoreInstruments: ['PHQ-4', 'WHO-5'],
    navigatorConditions: ['MDE', 'PDD', 'BPD_I', 'BPD_II', 'CYC', 'ADJ'],
    relatedCategories: [1, 6, 15],
    isGapCloser: false,
  },
  {
    number: 8,
    name: 'Habits, Motivation & Behavior Change',
    slug: 'habits-behavior-change',
    articleTarget: 65,
    description:
      'Behavioral science of habit formation, motivation, discipline, routine-building, stages of change, and sustainable behavior modification.',
    researchBasis:
      'From Skinner\'s operant conditioning to contemporary work by BJ Fogg (Tiny Habits), James Clear (Atomic Habits), and Prochaska & DiClemente\'s Stages of Change model — robust evidence base for why behavior change is difficult and what works. The WHO-5 (general wellbeing) captures the positive wellness outcomes that sustained healthy habits support.',
    platformRole:
      'Positive psychology anchor — content focused on building up rather than managing distress. Serves readers searching for motivation, discipline, routine-building, and habit formation. High-yield social content: 30-day challenges, habit trackers, framework graphics.',
    clarityScoreInstruments: ['WHO-5', 'WHODAS'],
    navigatorConditions: [],
    relatedCategories: [5, 9, 14],
    isGapCloser: false,
  },
  {
    number: 9,
    name: 'Sleep, Body & Mind-Body Connection',
    slug: 'sleep-body-connection',
    articleTarget: 60,
    description:
      'Sleep science, exercise and mental health, nutrition, somatic awareness, psychoneuroimmunology, and body-based therapeutic approaches.',
    researchBasis:
      'Sleep disturbance is both a symptom and driver of nearly every mental health condition. Research by Matthew Walker and others established sleep as foundational to cognitive function, emotional regulation, and mental health. The bidirectional relationship between physical and mental health — supported by psychoneuroimmunology and somatic experiencing research — justifies bridging mind and body.',
    platformRole:
      'Supports the Clarity Score\'s sleep-related assessments. Bridges to multiple categories (anxiety, depression, habits). Exercise, nutrition, and somatic content serves readers who approach mental health through a physical wellness lens — an important entry point for audiences who may resist traditional psychological framing.',
    clarityScoreInstruments: ['WHO-5', 'WHODAS'],
    navigatorConditions: ['INS', 'SLP_AP', 'NAR'],
    relatedCategories: [2, 7, 8],
    isGapCloser: false,
  },
  {
    number: 10,
    name: 'Digital Life, Social Media & Modern Stressors',
    slug: 'digital-life',
    articleTarget: 50,
    description:
      'Impact of technology on mental health — social media, screen time, doomscrolling, cyberbullying, comparison culture, information overload, and digital wellness.',
    researchBasis:
      'Research by Twenge, Haidt, and others documents correlations between heavy social media use and increased anxiety, depression, and loneliness — particularly among adolescents and young adults. APA\'s 2023 advisory on social media and youth mental health, plus growing discourse on screen time and digital burnout, establishes this as an increasingly important content area.',
    platformRole:
      'Timeliness play. Competitors built content libraries before the smartphone era reshaped mental health. Captures younger audiences (18–30) who experience mental health through a digital-first lens. Directly relevant to the loneliness epidemic, bridging to Category 15.',
    clarityScoreInstruments: ['UCLA-3', 'PSS-4'],
    navigatorConditions: [],
    relatedCategories: [2, 4, 15],
    isGapCloser: false,
  },
  {
    number: 11,
    name: 'Trauma-Informed Education & Healing',
    slug: 'trauma-healing',
    articleTarget: 55,
    description:
      'Trauma literacy, PTSD and C-PTSD education, ACE impact, body-based trauma responses, trauma-informed care frameworks, and recovery pathways.',
    researchBasis:
      'The ACE study, van der Kolk\'s research on body-based trauma responses, and widespread adoption of trauma-informed care frameworks across healthcare, education, and social services. PTSD affects ~3.9% of the global population (WHO), but subclinical trauma responses are far more prevalent. Helps people recognize responses they may not identify as trauma-related — hypervigilance, emotional numbness, difficulty trusting.',
    platformRole:
      'Directly supports the PTSD condition profile in the Symptom Navigator. Serves readers who have experienced ACEs, community violence, displacement, or systemic oppression — critical for Psychage\'s global, culturally diverse audience. Bridges to Family (6), Emotional Regulation (1), and Therapy Navigation (14).',
    clarityScoreInstruments: ['PHQ-4', 'WHO-5'],
    navigatorConditions: ['PTSD', 'CPTSD', 'ASD_ACUTE', 'DID', 'OSDD'],
    relatedCategories: [1, 6, 14],
    isGapCloser: false,
  },
  {
    number: 12,
    name: 'Cultural Perspectives, Inclusion & Global Wellness',
    slug: 'cultural-global',
    articleTarget: 50,
    description:
      'Cross-cultural mental health, stigma across regions, traditional healing alongside evidence-based approaches, and content for immigrants, refugees, and diaspora communities.',
    researchBasis:
      'The Lancet Commission on Global Mental Health found that Western diagnostic frameworks inadequately capture how mental distress manifests across cultures. Stigma research shows that language, framing, and cultural context significantly affect engagement with mental health information. With Psychage launching in 5 languages and targeting a global audience, culturally adapted content is a structural requirement.',
    platformRole:
      'Core differentiator. Competitors (WebMD, Psychology Today) are overwhelmingly US/Western-centric. Ensures content resonates in collectivist cultures, addresses culture-specific stigma, acknowledges traditional healing, and speaks to the experiences of immigrants, refugees, and diaspora communities.',
    clarityScoreInstruments: ['UCLA-3', 'WHO-5'],
    navigatorConditions: [],
    relatedCategories: [3, 6, 15],
    isGapCloser: false,
  },

  // =========================================================================
  // CATEGORIES 13–15: Clinical & Structural Gap-Closers (★)
  // =========================================================================
  {
    number: 13,
    name: 'Understanding Mental Health Conditions',
    slug: 'mental-health-conditions',
    articleTarget: 80,
    description:
      'Dedicated condition education hub — comprehensive guides for every condition the Symptom Navigator surfaces, including anxiety disorders, mood disorders, personality patterns, eating disorders, neurodevelopmental conditions, substance use, psychotic experiences, and more.',
    researchBasis:
      'The Symptom Navigator matches users to 45 condition profiles spanning the full spectrum of mental health. Without dedicated condition-education content, users matched to bipolar disorder, OCD, ADHD, eating disorders, substance use, psychotic experiences, or personality patterns would have no educational articles. These conditions affect hundreds of millions globally yet had no content home in a life-context-only architecture.',
    platformRole:
      'Content backbone for the Symptom Navigator and Condition Guides. Ensures every condition the platform surfaces has a library of educational articles — what the condition involves, how it presents, contributing factors, support options, and what living with it looks like. All content uses educational framing: "research suggests," "may experience," with professional-help CTAs.',
    clarityScoreInstruments: ['PHQ-4', 'WHO-5', 'WHODAS'],
    navigatorConditions: [
      // Mood
      'MDE', 'PDD', 'BPD_I', 'BPD_II', 'CYC',
      // Anxiety
      'GAD', 'SOC_ANX', 'PAN_DIS', 'PHO',
      // Trauma / Dissociative
      'PTSD', 'CPTSD', 'ASD_ACUTE', 'DID', 'OSDD',
      // OCD / Impulse
      'OCD', 'BDD', 'TTM', 'SPD_EXCOR', 'IED',
      // Neurodevelopmental
      'ADHD', 'AUT', 'HYPER',
      // Eating
      'ANR', 'BUL', 'BED', 'ARFID',
      // Substance
      'AUD', 'SUD',
      // Sleep
      'INS', 'SLP_AP', 'NAR',
      // Psychotic
      'SCZ', 'SA',
      // Somatic
      'SSD', 'IAD',
      // Personality
      'NPD', 'ASPD', 'DPD', 'SZPD',
      // Adjustment
      'ADJ',
    ],
    relatedCategories: [2, 7, 9, 11, 14],
    isGapCloser: true,
  },
  {
    number: 14,
    name: 'Therapy, Treatment & Mental Health Navigation',
    slug: 'therapy-navigation',
    articleTarget: 50,
    description:
      'Therapy types (CBT, DBT, EMDR, psychodynamic), medication classes, first session expectations, provider evaluation, insurance navigation, and supporting someone in treatment.',
    researchBasis:
      'The global treatment gap exceeds 75% in low- and middle-income countries (WHO, 2022). A major barrier is not just access but literacy — people don\'t understand what therapy is, modalities available, how to choose a provider, or what to expect. A 2022 APA survey found 41% of adults who considered therapy didn\'t seek it because they didn\'t know where to start. Navigational search intent was entirely unserved by the original architecture.',
    platformRole:
      'Educational funnel for the Provider Directory. When a user decides they want professional help, they need content explaining therapy types, what a first session looks like, how to evaluate provider fit, navigate costs/insurance, and support someone in treatment. Without this, the Provider Directory is a directory without context.',
    clarityScoreInstruments: ['WHO-5', 'WHODAS'],
    navigatorConditions: [],
    relatedCategories: [5, 8, 11, 13],
    isGapCloser: true,
  },
  {
    number: 15,
    name: 'Loneliness, Social Connection & Belonging',
    slug: 'loneliness-connection',
    articleTarget: 50,
    description:
      'Neuroscience of social connection, health impacts of isolation, building friendships at every life stage, community belonging, age-specific loneliness (youth, elderly, new parents, immigrants), and the paradox of digital connection.',
    researchBasis:
      'The UCLA 3-Item Loneliness Scale is one of five instruments powering the Clarity Score, yet loneliness had only tangential coverage through Relationships. The U.S. Surgeon General\'s 2023 Advisory classified loneliness as a public health epidemic with mortality risk equivalent to smoking 15 cigarettes daily. Holt-Lunstad\'s meta-analyses show social isolation increases risk of premature death by 26–32%. The WHO named social connection a global health priority.',
    platformRole:
      'Ensures Psychage\'s most-measured and most-timely Clarity Score dimension has dedicated educational support. This is not a subtopic of relationships — it is a standalone public health crisis. Bridges to Digital Life (10), Cultural Perspectives (12), and Relationships (3).',
    clarityScoreInstruments: ['UCLA-3'],
    navigatorConditions: ['SZPD'],
    relatedCategories: [3, 10, 12],
    isGapCloser: true,
  },
];

// ---------------------------------------------------------------------------
// Lookup Helpers
// ---------------------------------------------------------------------------

/** Total planned articles across all 15 categories */
export const TOTAL_ARTICLE_TARGET = CONTENT_CATEGORIES.reduce(
  (sum, c) => sum + c.articleTarget,
  0
);

/** Get a category by its number (1–15) */
export const getCategoryByNumber = (n: number): ContentCategory | undefined =>
  CONTENT_CATEGORIES.find((c) => c.number === n);

/** Get a category by its slug */
export const getCategoryBySlug = (slug: string): ContentCategory | undefined =>
  CONTENT_CATEGORIES.find((c) => c.slug === slug);

/** Get all categories that serve a given Clarity Score instrument */
export const getCategoriesForInstrument = (instrument: ClarityInstrument): ContentCategory[] =>
  CONTENT_CATEGORIES.filter((c) => c.clarityScoreInstruments.includes(instrument));

/** Get all categories that cover a given navigator condition ID */
export const getCategoriesForCondition = (conditionId: string): ContentCategory[] =>
  CONTENT_CATEGORIES.filter((c) => c.navigatorConditions.includes(conditionId));

/** Get the 3 gap-closer categories (13–15) */
export const GAP_CLOSER_CATEGORIES = CONTENT_CATEGORIES.filter((c) => c.isGapCloser);

/** Get the 12 life-context foundation categories (1–12) */
export const FOUNDATION_CATEGORIES = CONTENT_CATEGORIES.filter((c) => !c.isGapCloser);
