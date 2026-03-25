import React from 'react';
import { Category } from '../types';
import { getCategoryTheme } from '../config/categoryThemes';

const themeIcon = (slug: string) => {
    const Icon = getCategoryTheme(slug).icon;
    return <Icon size={24} />;
};

const themeColor = (slug: string) => getCategoryTheme(slug).classes.bg;

/**
 * Categories aligned with the `article_categories` DB table.
 * Used as fallback when Supabase is unavailable.
 */
export const categories: Category[] = [
    {
        id: 'anxiety-stress',
        name: 'Anxiety & Stress',
        slug: 'anxiety-stress',
        description: 'Understanding and managing various forms of anxiety, panic, and chronic stress.',
        icon: themeIcon('anxiety-stress'),
        color: themeColor('anxiety-stress'),
        image: '/images/categories/anxiety.png',
        subTopics: ['Generalized Anxiety (GAD)', 'Social Anxiety', 'Panic Disorder', 'Phobias', 'Chronic Stress', 'Performance Anxiety']
    },
    {
        id: 'depression-mood',
        name: 'Depression & Mood',
        slug: 'depression-mood',
        description: 'Resources for depression, bipolar disorder, and emotional regulation.',
        icon: themeIcon('depression-mood'),
        color: themeColor('depression-mood'),
        image: '/images/categories/mood.png',
        subTopics: ['Major Depressive Disorder', 'Persistent Depressive Disorder', 'Bipolar Disorder', 'Seasonal Affective Disorder', 'Postpartum Depression', 'Emotional Regulation']
    },
    {
        id: 'relationships-social',
        name: 'Relationships & Social Health',
        slug: 'relationships-social',
        description: 'Navigating connections, family dynamics, boundaries, and social well-being.',
        icon: themeIcon('relationships-social'),
        color: themeColor('relationships-social'),
        image: '/images/categories/relationships.svg',
        subTopics: ['Communication Skills', 'Healthy Boundaries', 'Couples & Partnership', 'Family Dynamics', 'Loneliness & Isolation', 'Conflict Resolution']
    },
    {
        id: 'trauma-ptsd',
        name: 'Trauma & PTSD',
        slug: 'trauma-ptsd',
        description: 'Healing from traumatic experiences and managing acute stress responses.',
        icon: themeIcon('trauma-ptsd'),
        color: themeColor('trauma-ptsd'),
        image: '/images/categories/trauma.png',
        subTopics: ['PTSD', 'Complex PTSD', 'Acute Stress Disorder', 'Trauma Recovery', 'Childhood Trauma', 'Dissociative Experiences']
    },
    {
        id: 'neurodevelopmental',
        name: 'Neurodevelopmental',
        slug: 'neurodevelopmental',
        description: 'Understanding ADHD, Autism, learning differences, and executive function.',
        icon: themeIcon('neurodevelopmental'),
        color: themeColor('neurodevelopmental'),
        image: '/images/categories/neurodiversity.png',
        subTopics: ['ADHD', 'Autism Spectrum', 'Learning Disabilities', 'Executive Function', 'Sensory Processing']
    },
    {
        id: 'substance-addiction',
        name: 'Substance Use & Addiction',
        slug: 'substance-addiction',
        description: 'Support for substance use, behavioral addictions, and recovery.',
        icon: themeIcon('substance-addiction'),
        color: themeColor('substance-addiction'),
        image: '/images/categories/addiction.png',
        subTopics: ['Alcohol Use Disorder', 'Drug Dependence', 'Behavioral Addictions', 'Recovery & Sobriety', 'Harm Reduction', 'Dual Diagnosis']
    },
    {
        id: 'sleep-circadian',
        name: 'Sleep & Circadian Health',
        slug: 'sleep-circadian',
        description: 'Optimizing sleep hygiene, treating sleep disorders, and circadian rhythms.',
        icon: themeIcon('sleep-circadian'),
        color: themeColor('sleep-circadian'),
        image: '/images/categories/sleep.svg',
        subTopics: ['Insomnia', 'Sleep Apnea', 'Circadian Rhythm Disorders', 'Sleep Hygiene', 'Parasomnias', 'Shift Work & Jet Lag']
    },
    {
        id: 'self-esteem-identity',
        name: 'Self-Esteem & Identity',
        slug: 'self-esteem-identity',
        description: 'Building self-worth, confidence, and authentic identity.',
        icon: themeIcon('self-esteem-identity'),
        color: themeColor('self-esteem-identity'),
        image: '/images/categories/self_esteem.svg',
        subTopics: ['Self-Worth', 'Imposter Syndrome', 'Body Image', 'Gender Identity', 'Cultural Identity', 'People-Pleasing']
    },
    {
        id: 'therapy-treatment',
        name: 'Therapy & Treatment',
        slug: 'therapy-treatment',
        description: 'Guides to therapeutic modalities, medications, and finding the right support.',
        icon: themeIcon('therapy-treatment'),
        color: themeColor('therapy-treatment'),
        image: '/images/categories/therapy_types.svg',
        subTopics: ['CBT', 'DBT', 'EMDR', 'Psychodynamic Therapy', 'Medication Management', 'Finding a Therapist', 'Group Therapy']
    },
    {
        id: 'workplace-academic',
        name: 'Workplace & Academic',
        slug: 'workplace-academic',
        description: 'Navigating burnout, professional growth, and academic stress.',
        icon: themeIcon('workplace-academic'),
        color: themeColor('workplace-academic'),
        image: '/images/categories/workplace.svg',
        subTopics: ['Burnout', 'Work-Life Balance', 'Academic Pressure', 'Imposter Syndrome', 'Leadership & Stress', 'Remote Work']
    },
    {
        id: 'life-transitions',
        name: 'Life Transitions & Crises',
        slug: 'life-transitions',
        description: 'Navigating major life changes, grief, loss, and personal crises.',
        icon: themeIcon('life-transitions'),
        color: themeColor('life-transitions'),
        image: '/images/categories/life_transitions.svg',
        subTopics: ['Grief & Bereavement', 'Divorce & Separation', 'Retirement', 'Moving & Relocation', 'Identity Shifts', 'Midlife Transitions']
    },
    {
        id: 'children-adolescents',
        name: 'Children & Adolescents',
        slug: 'children-adolescents',
        description: 'Mental health resources for children, teens, and parenting support.',
        icon: themeIcon('children-adolescents'),
        color: themeColor('children-adolescents'),
        image: '/images/categories/parenting.svg',
        subTopics: ['Child Mental Health', 'Adolescent Issues', 'Parenting Strategies', 'Bullying', 'School Refusal', 'Teen Anxiety & Depression']
    },
    {
        id: 'eating-body',
        name: 'Eating & Body',
        slug: 'eating-body',
        description: 'Recovery resources for eating disorders, body image, and nutrition.',
        icon: themeIcon('eating-body'),
        color: themeColor('eating-body'),
        image: '/images/categories/eating_disorders.png',
        subTopics: ['Anorexia Nervosa', 'Bulimia Nervosa', 'Binge Eating Disorder', 'Body Dysmorphia', 'ARFID', 'Intuitive Eating', 'Orthorexia']
    },
    {
        id: 'ocd-related',
        name: 'OCD & Related',
        slug: 'ocd-related',
        description: 'Understanding OCD, body-focused repetitive behaviors, and impulse control.',
        icon: themeIcon('ocd-related'),
        color: themeColor('ocd-related'),
        image: '/images/categories/ocd.svg',
        subTopics: ['OCD', 'Trichotillomania', 'Excoriation Disorder', 'Hoarding', 'Impulse Control', 'Body-Focused Repetitive Behaviors']
    },
    {
        id: 'global-cultural',
        name: 'Global & Cultural MH',
        slug: 'global-cultural',
        description: 'Global mental health perspectives, cultural considerations, and cross-cultural research.',
        icon: themeIcon('global-cultural'),
        color: themeColor('global-cultural'),
        image: '/images/categories/global.svg',
        subTopics: ['Cultural Stigma', 'Migration & Displacement', 'Indigenous Perspectives', 'LGBTQ+ Mental Health', 'Racial Trauma', 'Collectivist vs Individualist']
    },
    // ─── BATCH 2 CATEGORIES ───────────────────────────────────────
    {
        id: 'mens-mental-health',
        name: "Men's Mental Health",
        slug: 'mens-mental-health',
        description: "Evidence-based education on men's mental health — exploring help-seeking barriers, masked depression, the gender paradox in suicide, and cultural norms impacting men's psychological wellbeing.",
        icon: themeIcon('mens-mental-health'),
        color: themeColor('mens-mental-health'),
        image: '/images/categories/mens-mental-health.svg',
        subTopics: ["Understanding Men's Mental Health", "Men's Relationships and Family", "Men's Physical and Mental Health", "Men in Specific Contexts", "Myths About Men's Mental Health", "Men's Health Interventions"],
    },
    {
        id: 'chronic-illness-pain',
        name: 'Chronic Illness, Pain & Medical Psychology',
        slug: 'chronic-illness-pain',
        description: 'Evidence-based education on the psychological dimensions of chronic illness — covering pain neuroscience, medical trauma, and resilience-building strategies.',
        icon: themeIcon('chronic-illness-pain'),
        color: themeColor('chronic-illness-pain'),
        image: '/images/categories/chronic-illness-pain.svg',
        subTopics: ['Psychology of Chronic Illness', 'Chronic Pain and the Mind', 'Specific Medical Conditions', 'Medical Trauma', 'Supporting Wellbeing', 'Psychological Resilience'],
    },
    {
        id: 'technology-digital-life',
        name: 'Technology, Digital Life & Mental Health',
        slug: 'technology-digital-life',
        description: 'Evidence-based education on the psychological impact of technology — from social media to emerging digital therapeutics.',
        icon: themeIcon('technology-digital-life'),
        color: themeColor('technology-digital-life'),
        image: '/images/categories/technology-digital-life.svg',
        subTopics: ['Social Media Impact', 'Digital Addiction', 'AI & Emerging Tech', 'Online Relationships', 'Healthy Digital Life', 'Digital Culture'],
    },
    {
        id: 'spirituality-meaning',
        name: 'Spirituality, Meaning & Existential Mental Health',
        slug: 'spirituality-meaning',
        description: 'Evidence-based exploration of existential psychology — confronting questions of meaning, mortality, freedom, and isolation.',
        icon: themeIcon('spirituality-meaning'),
        color: themeColor('spirituality-meaning'),
        image: '/images/categories/spirituality-meaning.svg',
        subTopics: ['Existential Psychology', 'Search for Meaning', 'Mortality and Death Anxiety', 'Existential Loneliness', 'Freedom and Choice'],
    },
];

export const getCategoryById = (id: string): Category | undefined => {
    return categories.find(c => c.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
    return categories.find(c => c.slug === slug);
};
