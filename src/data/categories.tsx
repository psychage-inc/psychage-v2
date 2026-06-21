import React from 'react';
import { Category } from '../types';
import { getCategoryTheme } from '../config/categoryThemes';
import { CANONICAL_CATEGORIES } from '../config/taxonomy';

const themeIcon = (slug: string) => {
    const Icon = getCategoryTheme(slug).icon;
    return <Icon size={24} />;
};

const themeColor = (slug: string) => getCategoryTheme(slug).classes.bg;

/**
 * Plain-language descriptions, keyed by canonical slug. Sourced from the
 * article `_shared.ts` definitions and the Supabase category seed — existing
 * copy, not fabricated. A slug without an entry renders an empty description.
 */
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
    'emotional-regulation': 'Foundational emotional literacy — identifying, naming, and modulating emotions. The gateway skill for every other mental health topic.',
    'anxiety-stress': 'Understanding and managing various forms of anxiety, panic, and chronic stress — from everyday tension to clinical anxiety disorders.',
    'relationships-communication': 'Building deeper connections, navigating conflict, setting boundaries, and strengthening communication skills across all relationships.',
    'self-worth-identity': 'Building self-worth from the inside out — confidence, body image, imposter syndrome, and authentic identity.',
    'work-productivity': 'Navigating burnout, professional growth, work-life balance, and academic stress with practical strategies.',
    'family-parenting': 'Understanding family systems, parenting challenges, childhood influences, and breaking intergenerational patterns.',
    'depression-grief': "Resources for depression, grief, bereavement, and emotional regulation during life's darkest seasons.",
    'habits-behavior-change': 'The psychology of habits, motivation, and behavior change — building routines that support mental health.',
    'sleep-body-connection': 'The mind-body connection — sleep science, exercise psychology, nutrition, and somatic awareness for mental wellness.',
    'digital-life': 'Managing digital life, social media impact, screen time, and modern stressors for better mental health.',
    'trauma-healing': 'Understanding trauma, its impact on the brain and body, and evidence-based paths to healing and recovery.',
    'cultural-global': 'Cultural perspectives on mental health, reducing stigma, and building inclusive approaches to psychological wellness.',
    'mental-health-conditions': 'Clear, research-based explanations of mental health conditions — symptoms, causes, diagnosis, and treatment.',
    'therapy-navigation': 'Navigating the therapy landscape — types of therapy, medication, finding providers, and the mental health system.',
    'loneliness-connection': 'Neuroscience of social connection, health impacts of isolation, building friendships, community belonging, and the paradox of digital connection.',
    'psychosis-schizophrenia': 'Comprehensive education on psychotic disorders, schizophrenia spectrum conditions, and severe mental illness — from neuroscience to family support and recovery.',
    'aging-dementia-late-life': 'Comprehensive resources on mental health challenges unique to older adults, including dementia, cognitive decline, caregiving, and healthy aging.',
    'womens-mental-health': 'Comprehensive coverage of mental health issues affecting women across the lifespan, from reproductive health to gender-specific risk factors and treatment considerations.',
    'mens-mental-health': "Evidence-based education on men's mental health — exploring help-seeking barriers, masked depression, the gender paradox in suicide, and cultural norms impacting men's psychological wellbeing.",
    'chronic-illness-pain': 'Evidence-based education on the psychological dimensions of chronic illness — covering pain neuroscience, medical trauma, and resilience-building strategies.',
    'technology-digital-life': 'Evidence-based education on the psychological impact of technology — from social media to emerging digital therapeutics.',
    'brain-neuroscience': 'Biological foundations of mental health — neurotransmitters, brain structure, neuroplasticity, and the intersection of biology and psychology.',
    'creativity-therapeutic-arts': 'Creative expression as a pathway to mental health — art, music, drama, writing therapy, and the psychology of the creative process.',
    'disability-accessibility': 'Mental health at the intersection of disability — identity, access to care, neurodivergence, universal design, and inclusion.',
    'forensic-legal-justice': 'Psychology within the legal and justice systems — criminal behavior, forensic assessment, incarceration mental health, and rehabilitation.',
    'military-veterans-firstresponder': 'Mental health for those who serve — combat trauma, moral injury, first responder stress, military families, and transition.',
    'sexuality-intimacy': 'Psychology of human sexuality — sexual health, intimacy, identity, dysfunction, trauma recovery, and sex therapy.',
    'environmental-eco-psychology': 'Psychological dimensions of our relationship with the natural world — eco-anxiety, climate grief, nature-based therapy, and environmental justice.',
    'life-skills-practical-psychology': 'Practical psychology for everyday life — decision-making, emotional intelligence, communication, productivity, habit formation, financial psychology.',
    'spirituality-meaning': 'Evidence-based exploration of existential psychology — confronting questions of meaning, mortality, freedom, and isolation.',
    'eating-body': 'Understanding eating disorders, body image, and building a healthier relationship with food.',
};

/**
 * Existing cover-image slots, keyed by canonical slug. Categories without an
 * entry render the card's clean empty state — no placeholder art is added
 * (real assets are produced separately by the designer).
 */
const CATEGORY_IMAGES: Record<string, string> = {
    'emotional-regulation': '/images/categories/emotional-regulation.svg',
    'anxiety-stress': '/images/categories/anxiety.png',
    'relationships-communication': '/images/categories/relationships.svg',
    'self-worth-identity': '/images/categories/self_esteem.svg',
    'work-productivity': '/images/categories/workplace.svg',
    'family-parenting': '/images/categories/parenting.svg',
    'depression-grief': '/images/categories/mood.png',
    'habits-behavior-change': '/images/categories/habits.svg',
    'sleep-body-connection': '/images/categories/sleep.svg',
    'digital-life': '/images/categories/digital-life.svg',
    'trauma-healing': '/images/categories/trauma.png',
    'cultural-global': '/images/categories/global.svg',
    'aging-dementia-late-life': '/images/categories/aging.svg',
    'womens-mental-health': '/images/categories/womens-mental-health.svg',
    'mens-mental-health': '/images/categories/mens-mental-health.svg',
    'chronic-illness-pain': '/images/categories/chronic-illness-pain.svg',
    'technology-digital-life': '/images/categories/technology-digital-life.svg',
    'spirituality-meaning': '/images/categories/spirituality-meaning.svg',
};

/**
 * Mock category list, DERIVED from the frozen taxonomy contract so it can
 * never drift from the canonical slug set again. Used as the fallback when
 * Supabase is unavailable. Order mirrors the contract (grouped).
 */
export const categories: Category[] = CANONICAL_CATEGORIES.map((c) => ({
    id: c.slug,
    name: c.name,
    slug: c.slug,
    description: CATEGORY_DESCRIPTIONS[c.slug] ?? '',
    icon: themeIcon(c.slug),
    color: themeColor(c.slug),
    image: CATEGORY_IMAGES[c.slug],
    subTopics: [],
}));

export const getCategoryById = (id: string): Category | undefined => {
    return categories.find(c => c.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
    return categories.find(c => c.slug === slug);
};
