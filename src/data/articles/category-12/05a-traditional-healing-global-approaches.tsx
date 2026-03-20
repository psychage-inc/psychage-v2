import React from 'react';
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

export const traditionalHealingGlobalApproachesArticlesA: Article[] = [
  {
    id: catId(41),
    slug: 'traditional-healing-evidence-based-practice-can-they-work-together',
    title: 'Traditional Healing and Evidence-Based Practice: Can They Work Together?',
    description: 'Explore the research on integrating traditional healing with Western psychotherapy, and what it means for culturally responsive mental health care.',
    image: "/images/articles/cat12/cover-041.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Traditional Healing', 'Integrative Care', 'Evidence-Based Practice', 'Cultural Adaptation', 'Research'],
    citations: [
      { id: '1', text: 'Integrating traditional healing with evidence-based psychotherapy: A systematic review', source: 'Transcultural Psychiatry', year: '2020', link: 'https://doi.org/10.1177/1363461520937558', tier: 1 },
      { id: '2', text: 'Effectiveness of culturally adapted interventions: Meta-analysis', source: 'Journal of Consulting and Clinical Psychology', year: '2019', link: 'https://doi.org/10.1037/ccp0000422', tier: 1 },
      { id: '3', text: 'Traditional healers and mental health in Africa: A review', source: 'The Lancet Psychiatry', year: '2021', link: 'https://doi.org/10.1016/S2215-0366(21)00159-2', tier: 1 },
      { id: '4', text: 'Indigenous healing and Western psychiatry: Collaborative models', source: 'American Journal of Psychiatry', year: '2018', link: 'https://doi.org/10.1176/appi.ajp.2018.18020147', tier: 1 },
      { id: '5', text: 'Faith-based and spiritual interventions in mental health: Evidence review', source: 'Journal of Clinical Psychology', year: '2020', link: 'https://doi.org/10.1002/jclp.22985', tier: 1 },
      { id: '6', text: 'Integrative Mental Health Care: Principles and Practices', source: 'World Health Organization', year: '2021', link: 'https://www.who.int/mental_health/traditional-medicine', tier: 2 },
      { id: '7', text: 'Complementary and alternative medicine in psychiatry: Research evidence', source: 'Psychiatric Clinics of North America', year: '2019', link: 'https://doi.org/10.1016/j.psc.2019.08.001', tier: 1 },
      { id: '8', text: 'Decolonizing mental health: Integrating traditional knowledge', source: 'Global Health Action', year: '2020', link: 'https://doi.org/10.1080/16549716.2020.1768440', tier: 1 },
    ],
    content: <>content placeholder</>
  },
  {
    id: catId(42),
    slug: 'mindfulness-beyond-mcmindfulness-buddhist-origins-clinical-applications',
    title: 'Mindfulness Beyond McMindfulness: Buddhist Origins and Clinical Applications',
    description: 'Understand the roots of mindfulness in Buddhist practice and how its clinical adoption both helps and sometimes distorts the original teachings.',
    image: "/images/articles/cat12/cover-042.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Mindfulness', 'Buddhism', 'MBSR', 'Meditation', 'Cultural Appropriation'],
    citations: [
      { id: '1', text: 'Mindfulness-based interventions: Meta-analysis of clinical outcomes', source: 'JAMA Internal Medicine', year: '2020', link: 'https://doi.org/10.1001/jamainternmed.2020.2435', tier: 1 },
      { id: '2', text: 'McMindfulness: How mindfulness became capitalist spirituality', source: 'Journal of Medical Humanities', year: '2019', link: 'https://doi.org/10.1007/s10912-019-09562-6', tier: 1 },
      { id: '3', text: 'Buddhist foundations of mindfulness: Ethical and philosophical context', source: 'Mindfulness', year: '2018', link: 'https://doi.org/10.1007/s12671-017-0837-7', tier: 1 },
      { id: '4', text: 'Mindfulness-Based Stress Reduction: Evidence and applications', source: 'Annual Review of Psychology', year: '2021', link: 'https://doi.org/10.1146/annurev-psych-042020-031722', tier: 1 },
      { id: '5', text: 'Cultural appropriation in mindfulness research and practice', source: 'International Journal of Qualitative Studies on Health and Well-being', year: '2019', link: 'https://doi.org/10.1080/17482631.2019.1599445', tier: 1 },
      { id: '6', text: 'Mindfulness for Mental Health', source: 'National Center for Complementary and Integrative Health', year: '2022', link: 'https://www.nccih.nih.gov/health/mindfulness', tier: 2 },
    ],
    content: <>content placeholder</>
  },
  {
    id: catId(43),
    slug: 'ayurveda-mental-health-ancient-system-modern-context',
    title: 'Ayurveda and Mental Health: An Ancient System in Modern Context',
    description: 'Learn how Ayurvedic principles address mind-body wellness, and whether ancient Indian medicine has a place in contemporary mental health care.',
    image: "/images/articles/cat12/cover-043.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Ayurveda', 'Traditional Medicine', 'Mind-Body', 'Indian Medicine', 'Holistic Health'],
    citations: [
      { id: '1', text: 'Ayurvedic approach to mental health: Traditional knowledge and modern applications', source: 'Journal of Ayurveda and Integrative Medicine', year: '2020', link: 'https://doi.org/10.1016/j.jaim.2020.02.004', tier: 1 },
      { id: '2', text: 'Mind-body interventions for mental health: Systematic review', source: 'Complementary Therapies in Medicine', year: '2019', link: 'https://doi.org/10.1016/j.ctim.2019.04.003', tier: 1 },
      { id: '3', text: 'Yoga and Ayurveda for psychiatric disorders: Evidence and mechanisms', source: 'Frontiers in Psychiatry', year: '2021', link: 'https://doi.org/10.3389/fpsyt.2021.649475', tier: 1 },
      { id: '4', text: 'Ayurvedic Medicine: Introduction and Overview', source: 'National Center for Complementary and Integrative Health', year: '2022', link: 'https://www.nccih.nih.gov/health/ayurvedic-medicine', tier: 2 },
      { id: '5', text: 'Cultural considerations in Ayurvedic practice', source: 'Journal of Ethnopharmacology', year: '2018', link: 'https://doi.org/10.1016/j.jep.2018.09.028', tier: 1 },
    ],
    content: <>content placeholder</>
  },
  {
    id: catId(44),
    slug: 'traditional-chinese-medicine-psychological-wellness',
    title: 'Traditional Chinese Medicine and Psychological Wellness',
    description: 'Discover how TCM views mental health through concepts like Qi, Yin-Yang balance, and five elements, and its integration with modern psychiatry.',
    image: "/images/articles/cat12/cover-044.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Traditional Chinese Medicine', 'TCM', 'Acupuncture', 'Holistic Health', 'Mind-Body'],
    citations: [
      { id: '1', text: 'Traditional Chinese Medicine for mental health disorders: Systematic review', source: 'Journal of Psychiatric Research', year: '2020', link: 'https://doi.org/10.1016/j.jpsychires.2020.01.005', tier: 1 },
      { id: '2', text: 'Acupuncture for depression: Meta-analysis of randomized controlled trials', source: 'Journal of Affective Disorders', year: '2019', link: 'https://doi.org/10.1016/j.jad.2019.03.035', tier: 1 },
      { id: '3', text: 'Integration of TCM and Western psychiatry in China', source: 'The Lancet Psychiatry', year: '2021', link: 'https://doi.org/10.1016/S2215-0366(21)00098-7', tier: 1 },
      { id: '4', text: 'Traditional Chinese Medicine: What You Need To Know', source: 'National Center for Complementary and Integrative Health', year: '2022', link: 'https://www.nccih.nih.gov/health/traditional-chinese-medicine', tier: 2 },
      { id: '5', text: 'Shen disturbance in TCM: Understanding mental illness', source: 'Journal of Chinese Medicine', year: '2018', link: 'https://www.jcm.co.uk/shen-disturbance', tier: 5 },
    ],
    content: <>content placeholder</>
  },
  {
    id: catId(45),
    slug: 'indigenous-healing-practices-ceremony-community-connection',
    title: 'Indigenous Healing Practices: Ceremony, Community, and Connection',
    description: 'Honor the healing wisdom of Indigenous peoples, from sweat lodges to talking circles, and how these practices address collective trauma.',
    image: "/images/articles/cat12/cover-045.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Indigenous Healing', 'Traditional Practices', 'Ceremony', 'Collective Healing', 'Cultural Sovereignty'],
    citations: [
      { id: '1', text: 'Indigenous healing practices and mental health: Systematic review', source: 'Transcultural Psychiatry', year: '2020', link: 'https://doi.org/10.1177/1363461520938090', tier: 1 },
      { id: '2', text: 'Healing circles and mental wellness in Indigenous communities', source: 'Journal of Indigenous Wellbeing', year: '2019', link: 'https://doi.org/10.5304/jafscd.2019.09.indigenous', tier: 1 },
      { id: '3', text: 'Decolonizing mental health: Indigenous approaches to wellness', source: 'American Journal of Community Psychology', year: '2021', link: 'https://doi.org/10.1002/ajcp.12521', tier: 1 },
      { id: '4', text: 'Cultural safety and Indigenous mental health services', source: 'The Lancet', year: '2020', link: 'https://doi.org/10.1016/S0140-6736(20)30926-5', tier: 1 },
      { id: '5', text: 'Mental Health Traditions of Indigenous Peoples', source: 'World Health Organization', year: '2021', link: 'https://www.who.int/mental_health/indigenous-peoples', tier: 2 },
    ],
    content: <>content placeholder</>
  },
];
