// ============================================================================
// Psychage Content Architecture — 31 Categories × 2,000+ Articles
// ============================================================================
//
// Source: "THE ARTICLE's" — Content Architecture for Psychage
// Prepared for Dr. Lena Dobson, March 2026 · Expanded April 2026
//
// Built from 5 layers of analysis:
//   1. Validated Psychological Instruments (PHQ-4, WHO-5, UCLA-3, PSS-4, WHODAS)
//   2. Clinical Condition Coverage (45 Symptom Navigator profiles)
//   3. Global Mental Health Data (WHO, GBD, Surgeon General)
//   4. Search Behavior & Reader Intent (keyword demand, intent classification)
//   5. Cultural & Demographic Reach (global/multilingual stress testing)
//
// Categories 1–12:  Life-context foundation
// Categories 13–15 (★): Clinical & structural gap-closers
// Categories 16–21: Specialized populations & conditions (22 merged into 31)
// Categories 23–31: Extended domains & applied psychology
// ============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ContentCategory {
  /** Category number (1–31) */
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

  // =========================================================================
  // CATEGORIES 16–22: Specialized Populations & Conditions
  // =========================================================================
  {
    number: 16,
    name: 'Psychosis, Schizophrenia & Severe Mental Illness',
    slug: 'psychosis-schizophrenia',
    articleTarget: 60,
    description:
      'Comprehensive education on psychotic disorders, schizophrenia spectrum conditions, and severe mental illness — from neuroscience and treatment to family support and recovery.',
    researchBasis:
      'Schizophrenia affects ~24 million people globally (WHO, 2022). Psychotic disorders remain among the most stigmatized and misunderstood mental health conditions. Early intervention research shows that reducing duration of untreated psychosis significantly improves outcomes. Public education is critical for early recognition and reducing treatment delays.',
    platformRole:
      'Directly supports Symptom Navigator condition profiles for SCZ and SA. Fills a critical educational gap — most mental health platforms provide only surface-level psychosis content. Family support content serves caregivers who are often the first to notice warning signs.',
    clarityScoreInstruments: ['PHQ-4', 'WHODAS'],
    navigatorConditions: ['SCZ', 'SA'],
    relatedCategories: [13, 14, 17],
    isGapCloser: false,
  },
  {
    number: 17,
    name: 'Aging, Dementia & Late-Life Mental Health',
    slug: 'aging-dementia-late-life',
    articleTarget: 60,
    description:
      'Comprehensive resources on mental health challenges unique to older adults, including dementia, Alzheimer disease, late-life depression, cognitive decline, caregiving, and strategies for healthy aging.',
    researchBasis:
      'Over 55 million people live with dementia globally (WHO, 2023), projected to reach 139 million by 2050. Late-life depression affects 5.7% of older adults and is frequently underdiagnosed. Caregiver burden research shows that family caregivers experience depression rates 2–3x higher than non-caregivers. Cognitive reserve and brain health interventions show promise for delaying decline.',
    platformRole:
      'Serves an underrepresented demographic in digital mental health. Bridges to Family (6) for caregiver support content. Supports the growing "sandwich generation" audience managing both aging parents and children. Expands Psychage\'s reach beyond the 18–45 primary demographic.',
    clarityScoreInstruments: ['WHO-5', 'WHODAS'],
    navigatorConditions: [],
    relatedCategories: [6, 9, 20],
    isGapCloser: false,
  },
  {
    number: 18,
    name: 'Women\'s Mental Health',
    slug: 'womens-mental-health',
    articleTarget: 70,
    description:
      'Comprehensive coverage of mental health issues affecting women across the lifespan, from reproductive health to gender-specific risk factors, treatment considerations, and sociocultural influences on women\'s psychological well-being.',
    researchBasis:
      'Women experience depression and anxiety at roughly 2x the rate of men (WHO). Reproductive transitions — menstruation, pregnancy, postpartum, perimenopause — each carry distinct mental health risks. Research on perinatal mood disorders, PMDD, and menopause-related cognitive changes has expanded significantly. Gender-specific trauma (IPV, sexual violence) requires specialized content.',
    platformRole:
      'Captures high-volume search traffic around pregnancy mental health, postpartum depression, and menopause. Serves a majority-female mental health content audience. Provides nuanced, evidence-based alternatives to wellness misinformation targeting women.',
    clarityScoreInstruments: ['PHQ-4', 'WHO-5'],
    navigatorConditions: ['MDE', 'GAD', 'PTSD'],
    relatedCategories: [6, 7, 9, 19],
    isGapCloser: false,
  },
  {
    number: 19,
    name: 'Men\'s Mental Health',
    slug: 'mens-mental-health',
    articleTarget: 70,
    description:
      'Evidence-based education on men\'s mental health — exploring the gender paradox in suicide, masked depression, help-seeking barriers, and the impact of cultural norms on men\'s psychological wellbeing.',
    researchBasis:
      'Men die by suicide at 3.5x the rate of women (CDC, 2023) despite lower depression diagnosis rates — the "gender paradox" in suicide. Research shows men present depression differently (irritability, anger, risk-taking) leading to underdiagnosis. Masculine norms research (Addis & Mahalik) documents how traditional expectations create barriers to help-seeking.',
    platformRole:
      'Addresses a critical gap in mental health content. Most platforms skew female in audience and content framing. Captures an underserved audience searching for "am I depressed or just tired" and "why can\'t I talk about feelings." Bridges to Relationships (3) and Work (5).',
    clarityScoreInstruments: ['PHQ-4', 'WHO-5'],
    navigatorConditions: ['MDE', 'AUD', 'SUD'],
    relatedCategories: [3, 5, 7, 18],
    isGapCloser: false,
  },
  {
    number: 20,
    name: 'Chronic Illness, Pain & Medical Psychology',
    slug: 'chronic-illness-pain',
    articleTarget: 65,
    description:
      'Evidence-based education on the psychological dimensions of chronic illness — covering pain neuroscience, medical trauma, identity shifts after diagnosis, and resilience-building strategies for people living with ongoing health conditions.',
    researchBasis:
      'Chronic pain affects 20% of adults globally. Comorbidity between chronic illness and depression/anxiety exceeds 30%. Pain neuroscience education (PNE) research shows that understanding pain mechanisms reduces disability. Medical trauma — distressing healthcare experiences — is increasingly recognized as a distinct trauma type.',
    platformRole:
      'Bridges physical and mental health in a way few competitors do. Serves the large population managing both chronic conditions and mental health challenges. Supports readers who approach Psychage through a physical health lens rather than a mental health one.',
    clarityScoreInstruments: ['WHO-5', 'WHODAS'],
    navigatorConditions: ['SSD', 'IAD', 'ADJ'],
    relatedCategories: [9, 11, 14],
    isGapCloser: false,
  },
  {
    number: 21,
    name: 'Technology, Digital Life & Mental Health',
    slug: 'technology-digital-life',
    articleTarget: 70,
    description:
      'Evidence-based education on the psychological impact of technology — from social media and smartphone use to emerging tools like VR therapy and digital therapeutics, exploring both harms and benefits for mental health.',
    researchBasis:
      'Digital therapeutics (DTx) is a rapidly growing field with FDA-approved treatments for substance use and insomnia. VR therapy shows promise for PTSD, phobias, and pain management. AI mental health tools are proliferating with limited regulation. Balanced coverage of both risks (addiction, comparison, cyberbullying) and opportunities (teletherapy, apps, digital communities) is needed.',
    platformRole:
      'Forward-looking content that positions Psychage at the intersection of technology and mental health. Captures audiences interested in VR therapy, AI chatbots, and digital wellness tools. Complements Category 10 (Digital Life) with deeper clinical and research content.',
    clarityScoreInstruments: ['UCLA-3', 'PSS-4'],
    navigatorConditions: [],
    relatedCategories: [10, 14, 23],
    isGapCloser: false,
  },
  // NOTE: Category 22 was merged into Category 31 (both used slug 'spirituality-meaning')
  // Cat 22's 11 articles are now in Cat 31's subcategories 14-15

  // =========================================================================
  // CATEGORIES 23–31: Extended Domains & Applied Psychology
  // =========================================================================
  {
    number: 23,
    name: 'Brain, Neuroscience & Biological Basis',
    slug: 'brain-neuroscience',
    articleTarget: 66,
    description:
      'Understanding the biological foundations of mental health — neurotransmitters, brain structure, neuroplasticity, and the intersection of biology and psychology.',
    researchBasis:
      'Neuroscience literacy is foundational to understanding modern mental health treatment. Research on neuroplasticity (Merzenich, Doidge) demonstrates the brain\'s capacity for change throughout life. Understanding neurotransmitter systems, the HPA axis, and brain circuitry helps readers contextualize their experiences and treatment options.',
    platformRole:
      'Educational backbone for readers who want to understand the "why" behind mental health conditions. Supports informed decision-making about medication, brain stimulation therapies, and lifestyle interventions. Bridges to Sleep (9), Chronic Illness (20), and Conditions (13).',
    clarityScoreInstruments: ['PHQ-4', 'WHODAS'],
    navigatorConditions: ['ADHD', 'SCZ', 'BPD_I', 'BPD_II'],
    relatedCategories: [9, 13, 16, 20],
    isGapCloser: false,
  },
  {
    number: 24,
    name: 'Creativity, Therapeutic Arts & Expressive Healing',
    slug: 'creativity-therapeutic-arts',
    articleTarget: 64,
    description:
      'The science and practice of creative expression as a pathway to mental health — art therapy, music therapy, drama therapy, writing therapy, and the psychology of the creative process.',
    researchBasis:
      'Art therapy, music therapy, and expressive arts have growing evidence bases for depression, PTSD, and dementia. Research on creative flow states (Csikszentmihalyi) shows associations with wellbeing. Writing therapy (Pennebaker) demonstrates measurable health benefits from expressive disclosure. Creative arts therapies are recognized by the APA as evidence-based treatments.',
    platformRole:
      'Offers alternative entry points for readers who connect with creative/artistic approaches rather than traditional clinical framing. Highly shareable content — art projects, music playlists, journaling prompts. Bridges to Emotional Regulation (1) and Trauma (11).',
    clarityScoreInstruments: ['WHO-5'],
    navigatorConditions: [],
    relatedCategories: [1, 8, 11, 17],
    isGapCloser: false,
  },
  {
    number: 25,
    name: 'Disability, Accessibility & Inclusive Mental Health',
    slug: 'disability-accessibility',
    articleTarget: 64,
    description:
      'Mental health at the intersection of disability — identity, access to care, chronic illness, neurodivergence, universal design, and the psychology of inclusion and advocacy.',
    researchBasis:
      'People with disabilities experience mental health conditions at 2–3x the rate of the general population. Access barriers — physical, attitudinal, communication — significantly limit mental health service utilization. Disability-affirming approaches and the social model of disability reframe mental health support. Neurodiversity-affirming practice is increasingly recognized as best practice.',
    platformRole:
      'Core inclusivity play — ensures Psychage serves the 1.3 billion people globally living with significant disability. Captures underserved audiences searching for accessible therapy, disability identity, and neurodivergent mental health. Supports platform accessibility commitments.',
    clarityScoreInstruments: ['WHODAS', 'WHO-5'],
    navigatorConditions: ['ADHD', 'AUT'],
    relatedCategories: [12, 13, 14, 20],
    isGapCloser: false,
  },
  {
    number: 26,
    name: 'Forensic Psychology & Criminal Justice Mental Health',
    slug: 'forensic-legal-justice',
    articleTarget: 64,
    description:
      'Psychology within the legal and justice systems — criminal behavior, forensic assessment, mental health in incarceration, juvenile justice, victim psychology, and rehabilitation.',
    researchBasis:
      'Approximately 37% of incarcerated individuals have a diagnosed mental health condition (BJS). Forensic psychology research covers risk assessment, competency evaluation, and rehabilitation effectiveness. Juvenile justice mental health research shows that early intervention reduces recidivism. Victim psychology and restorative justice have growing evidence bases.',
    platformRole:
      'Serves an underrepresented but high-interest topic area. Captures audiences interested in criminal psychology, true crime from a scientific lens, and justice reform. Provides educational content for families of incarcerated individuals and crime survivors.',
    clarityScoreInstruments: ['PHQ-4', 'WHODAS'],
    navigatorConditions: ['ASPD', 'SUD', 'PTSD'],
    relatedCategories: [11, 13, 19],
    isGapCloser: false,
  },
  {
    number: 27,
    name: 'Military, Veterans & First Responder Mental Health',
    slug: 'military-veterans-firstresponder',
    articleTarget: 44,
    description:
      'Mental health for those who serve — combat trauma, moral injury, first responder stress, military families, transition challenges, and evidence-based treatment approaches.',
    researchBasis:
      'PTSD rates among veterans range from 11–30% depending on service era (VA). Moral injury — violating one\'s moral code in service — is increasingly recognized as distinct from PTSD. First responders experience PTSD at rates 5x the general population. Military-to-civilian transition is a critical vulnerability period. Evidence-based treatments (CPT, PE, EMDR) show strong outcomes for military populations.',
    platformRole:
      'Serves military, veteran, and first responder communities with specialized content. Captures family members searching for support resources. Bridges to Trauma (11) and Therapy Navigation (14).',
    clarityScoreInstruments: ['PHQ-4', 'WHO-5'],
    navigatorConditions: ['PTSD', 'CPTSD', 'AUD', 'MDE'],
    relatedCategories: [5, 11, 14],
    isGapCloser: false,
  },
  {
    number: 28,
    name: 'Sexuality, Intimacy & Sexual Health',
    slug: 'sexuality-intimacy',
    articleTarget: 64,
    description:
      'The psychology of human sexuality — sexual health, intimacy, identity, dysfunction, trauma recovery, sex therapy, and the intersection of sexuality with mental wellbeing.',
    researchBasis:
      'Sexual dysfunction affects 31% of men and 43% of women (Laumann et al.). Sexual trauma is a leading cause of PTSD, depression, and relationship difficulties. LGBTQ+ mental health disparities persist due to minority stress. Sex therapy and intimacy counseling have strong evidence bases. Sexual health is recognized by WHO as integral to overall wellbeing.',
    platformRole:
      'Addresses a topic many mental health platforms avoid or handle superficially. Captures high-demand search traffic around sexual dysfunction, intimacy issues, and sexual trauma recovery. Serves LGBTQ+ audiences with affirming content.',
    clarityScoreInstruments: ['UCLA-3', 'WHO-5'],
    navigatorConditions: ['PTSD'],
    relatedCategories: [3, 4, 11],
    isGapCloser: false,
  },
  {
    number: 29,
    name: 'Environmental, Eco-Psychology & Planetary Mental Health',
    slug: 'environmental-eco-psychology',
    articleTarget: 66,
    description:
      'The psychological dimensions of our relationship with the natural world — eco-anxiety, climate grief, nature-based therapy, urban psychology, and environmental justice.',
    researchBasis:
      'Climate anxiety affects 45% of young people globally (Hickman et al., 2021). Eco-psychology research demonstrates bidirectional relationships between environmental degradation and mental health. Nature-based therapy (ecotherapy, forest bathing) has growing evidence for depression and anxiety. Urban design and green space access significantly impact psychological wellbeing.',
    platformRole:
      'Timely content addressing a rapidly growing concern — especially among younger audiences. Captures search traffic around "eco-anxiety," "climate grief," and "nature therapy." Positions Psychage as forward-thinking on emerging mental health topics.',
    clarityScoreInstruments: ['PSS-4', 'WHO-5'],
    navigatorConditions: ['GAD', 'ADJ'],
    relatedCategories: [2, 9, 12],
    isGapCloser: false,
  },
  {
    number: 30,
    name: 'Applied Life Skills, Self-Design & Practical Psychology',
    slug: 'life-skills-practical-psychology',
    articleTarget: 110,
    description:
      'Practical psychology for everyday life — decision-making, emotional intelligence, communication, productivity, habit formation, financial psychology, and the examined life.',
    researchBasis:
      'Positive psychology and applied behavioral science provide robust frameworks for everyday functioning. Decision science (Kahneman, Tversky), emotional intelligence (Goleman, Salovey & Mayer), and financial psychology research document how psychological principles improve daily life. Life skills education is identified by WHO as protective against mental health problems.',
    platformRole:
      'Broadest audience appeal — captures readers searching for self-improvement content through a psychological lens. High social media engagement potential. Bridges traditional mental health content with practical personal development. Largest category by article count.',
    clarityScoreInstruments: ['WHO-5', 'WHODAS', 'PSS-4'],
    navigatorConditions: [],
    relatedCategories: [1, 5, 8],
    isGapCloser: false,
  },
  {
    number: 31,
    name: 'Spirituality, Meaning & Existential Mental Health',
    slug: 'spirituality-meaning',
    articleTarget: 69,
    description:
      'Evidence-based exploration of existential psychology — confronting questions of meaning, mortality, freedom, and isolation through philosophical frameworks and therapeutic approaches.',
    researchBasis:
      'Extended content covering positive psychology, secular meaning-making, altered states of consciousness, spiritual crises, and the integration of spiritual and psychological wellbeing. Research on post-traumatic growth, values-based living (ACT), and transpersonal psychology provides an evidence base beyond traditional existential frameworks.',
    platformRole:
      'Expands Category 22\'s existential foundation into broader territory — positive psychology, spiritual practice, values and ethics, collective meaning. Captures audiences interested in human flourishing, consciousness, and integrated wellbeing beyond symptom reduction.',
    clarityScoreInstruments: ['WHO-5', 'UCLA-3'],
    navigatorConditions: [],
    relatedCategories: [7, 8, 15, 22],
    isGapCloser: false,
  },
];

// ---------------------------------------------------------------------------
// Lookup Helpers
// ---------------------------------------------------------------------------

/** Total planned articles across all 31 categories */
export const TOTAL_ARTICLE_TARGET = CONTENT_CATEGORIES.reduce(
  (sum, c) => sum + c.articleTarget,
  0
);

/** Get a category by its number (1–31) */
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
export const FOUNDATION_CATEGORIES = CONTENT_CATEGORIES.filter(
  (c) => !c.isGapCloser && c.number <= 12,
);

/** Get the specialized populations & conditions categories (16–21) */
export const SPECIALIZED_CATEGORIES = CONTENT_CATEGORIES.filter(
  (c) => c.number >= 16 && c.number <= 21,
);

/** Get the extended domains & applied psychology categories (23–31) */
export const EXTENDED_CATEGORIES = CONTENT_CATEGORIES.filter((c) => c.number >= 23);
