/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_CULTURAL_GLOBAL, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ComparisonTable,
  StatCard,
  ProgressSteps,
  QuoteBlock,
} from '../../../components/article/blocks';

export const traditionalHealingGlobalApproachesArticlesB: Article[] = [
  {
    id: catId(46),
    slug: 'faith-based-counseling-spiritual-support-meets-psychological-need',
    title: 'Faith-Based Counseling: When Spiritual Support Meets Psychological Need',
    description: 'Understand how faith and therapy can work together, when religious counseling is helpful, and when clinical care is essential.',
    image: "/images/articles/cat12/cover-046.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Faith-Based Counseling', 'Religion', 'Spirituality', 'Pastoral Care', 'Mental Health'],
    citations: [
      { id: '1', text: 'Effectiveness of faith-based interventions for mental health: Meta-analysis', source: 'Journal of Religion and Health', year: '2020', link: 'https://doi.org/10.1007/s10943-020-01006-x', tier: 1 },
      { id: '2', text: 'Integrating spirituality into mental health treatment: Clinical guidelines', source: 'American Psychological Association', year: '2021', link: 'https://www.apa.org/topics/spirituality-mental-health', tier: 3 },
      { id: '3', text: 'Religious coping and mental health outcomes: Systematic review', source: 'Psychology of Religion and Spirituality', year: '2019', link: 'https://doi.org/10.1037/rel0000228', tier: 1 },
      { id: '4', text: 'Pastoral counseling and clinical psychology: Collaborative care', source: 'Journal of Psychology and Theology', year: '2018', link: 'https://doi.org/10.1177/0091647118809162', tier: 1 },
      { id: '5', text: 'Faith communities and mental health: Resources and referrals', source: 'Substance Abuse and Mental Health Services Administration', year: '2022', link: 'https://www.samhsa.gov/faith-based-initiatives', tier: 2 },
    ],
    content: <>content placeholder</>
  },
  {
    id: catId(47),
    slug: 'art-therapy-across-cultures-creative-healing-universal-language',
    title: 'Art Therapy Across Cultures: Creative Healing as a Universal Language',
    description: 'Discover how art therapy transcends language barriers and provides culturally accessible expression for trauma, grief, and healing.',
    image: "/images/articles/cat12/cover-047.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Art Therapy', 'Creative Therapies', 'Cross-Cultural', 'Trauma Treatment', 'Expressive Arts'],
    citations: [
      { id: '1', text: 'Art therapy for trauma: Systematic review and meta-analysis', source: 'Trauma, Violence, & Abuse', year: '2020', link: 'https://doi.org/10.1177/1524838020915591', tier: 1 },
      { id: '2', text: 'Cultural considerations in art therapy practice', source: 'Art Therapy: Journal of the American Art Therapy Association', year: '2019', link: 'https://doi.org/10.1080/07421656.2019.1649549', tier: 1 },
      { id: '3', text: 'Art therapy with refugees and asylum seekers: Evidence and practice', source: 'The Arts in Psychotherapy', year: '2021', link: 'https://doi.org/10.1016/j.aip.2021.101815', tier: 1 },
      { id: '4', text: 'Cross-cultural applications of expressive therapies', source: 'Journal of Cross-Cultural Psychology', year: '2018', link: 'https://doi.org/10.1177/0022022118789147', tier: 1 },
      { id: '5', text: 'What is Art Therapy?', source: 'American Art Therapy Association', year: '2022', link: 'https://arttherapy.org/about-art-therapy/', tier: 3 },
    ],
    content: <>content placeholder</>
  },
  {
    id: catId(48),
    slug: 'community-based-mental-health-non-western-models-center-collective',
    title: 'Community-Based Mental Health: How Non-Western Models Center the Collective',
    description: 'Learn from mental health models that prioritize community, connection, and collective healing over individual treatment.',
    image: "/images/articles/cat12/cover-048.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Community Mental Health', 'Collectivism', 'Global Models', 'Ubuntu', 'Collective Healing'],
    citations: [
      { id: '1', text: 'Community-based mental health care in low-resource settings', source: 'The Lancet Global Health', year: '2020', link: 'https://doi.org/10.1016/S2214-109X(20)30432-0', tier: 1 },
      { id: '2', text: 'Ubuntu philosophy and mental health in Africa', source: 'Transcultural Psychiatry', year: '2019', link: 'https://doi.org/10.1177/1363461519857074', tier: 1 },
      { id: '3', text: 'Collective healing approaches in Indigenous communities', source: 'American Journal of Community Psychology', year: '2021', link: 'https://doi.org/10.1002/ajcp.12498', tier: 1 },
      { id: '4', text: 'Task-shifting and community health workers in mental health', source: 'World Psychiatry', year: '2018', link: 'https://doi.org/10.1002/wps.20544', tier: 1 },
      { id: '5', text: 'Community Mental Health Services', source: 'World Health Organization', year: '2021', link: 'https://www.who.int/mental_health/community-based-services', tier: 2 },
    ],
    content: <>content placeholder</>
  },
  {
    id: catId(49),
    slug: 'global-mental-health-policy-who-guidelines-treatment-gap',
    title: 'Global Mental Health Policy: WHO Guidelines and the Treatment Gap',
    description: 'Examine the global mental health crisis through WHO data, understand the treatment gap, and explore policy solutions for equity.',
    image: "/images/articles/cat12/cover-049.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Global Mental Health', 'WHO', 'Treatment Gap', 'Policy', 'Health Equity'],
    citations: [
      { id: '1', text: 'World Mental Health Report: Transforming mental health for all', source: 'World Health Organization', year: '2022', link: 'https://www.who.int/publications/i/item/9789240049338', tier: 2 },
      { id: '2', text: 'The global mental health treatment gap: Evidence and policy implications', source: 'The Lancet Psychiatry', year: '2020', link: 'https://doi.org/10.1016/S2215-0366(20)30232-0', tier: 1 },
      { id: '3', text: 'Mental health in low- and middle-income countries: Burden and interventions', source: 'Nature Reviews Disease Primers', year: '2021', link: 'https://doi.org/10.1038/s41572-021-00275-w', tier: 1 },
      { id: '4', text: 'Scaling up mental health services in resource-poor settings', source: 'Annual Review of Clinical Psychology', year: '2019', link: 'https://doi.org/10.1146/annurev-clinpsy-050718-095559', tier: 1 },
      { id: '5', text: 'Global mental health governance: Challenges and opportunities', source: 'Global Health Action', year: '2020', link: 'https://doi.org/10.1080/16549716.2020.1790793', tier: 1 },
    ],
    content: <>content placeholder</>
  },
  {
    id: catId(50),
    slug: 'future-culturally-responsive-mental-healthcare-integration-not-replacement',
    title: 'The Future of Culturally Responsive Mental Healthcare: Integration, Not Replacement',
    description: 'Envision a future where Western and traditional healing systems work together, honoring diverse ways of knowing and healing.',
    image: "/images/articles/cat12/cover-050.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Future of Mental Health', 'Integrative Care', 'Cultural Competence', 'Health Equity', 'Innovation'],
    citations: [
      { id: '1', text: 'Integrative mental health care: Future directions', source: 'JAMA Psychiatry', year: '2021', link: 'https://doi.org/10.1001/jamapsychiatry.2021.2478', tier: 1 },
      { id: '2', text: 'Decolonizing global mental health: Moving toward epistemic justice', source: 'Transcultural Psychiatry', year: '2020', link: 'https://doi.org/10.1177/1363461520938090', tier: 1 },
      { id: '3', text: 'Cultural humility in mental health: A framework for the future', source: 'American Journal of Orthopsychiatry', year: '2019', link: 'https://doi.org/10.1037/ort0000429', tier: 1 },
      { id: '4', text: 'Pluralistic approaches to mental health: Global perspectives', source: 'Global Mental Health', year: '2021', link: 'https://doi.org/10.1017/gmh.2021.16', tier: 1 },
      { id: '5', text: 'Mental Health Action Plan 2013-2030', source: 'World Health Organization', year: '2021', link: 'https://www.who.int/publications/i/item/9789241506021', tier: 2 },
    ],
    content: <>content placeholder</>
  },
];
