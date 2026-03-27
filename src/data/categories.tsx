import React from 'react';
import { Category } from '../types';
import { getCategoryTheme } from '../config/categoryThemes';

const themeIcon = (slug: string) => {
    const Icon = getCategoryTheme(slug).icon;
    return <Icon size={24} />;
};

const themeColor = (slug: string) => getCategoryTheme(slug).classes.bg;

/**
 * 18 categories aligned with content-architecture slugs.
 * Used as fallback when Supabase is unavailable.
 * Only includes categories that have published articles.
 */
export const categories: Category[] = [
    {
        id: 'emotional-regulation',
        name: 'Emotional Regulation & Self-Awareness',
        slug: 'emotional-regulation',
        description: 'Foundational emotional literacy — identifying, naming, and modulating emotions. The gateway skill for every other mental health topic.',
        icon: themeIcon('emotional-regulation'),
        color: themeColor('emotional-regulation'),
        image: '/images/categories/emotional-regulation.svg',
        subTopics: ['Understanding Your Emotions', 'Everyday Emotional Regulation Strategies', 'Self-Awareness & Reflection', 'Emotional Intelligence in Practice', 'Emotional Patterns & Habits', 'The Neuroscience of Emotions', 'Emotions Across Life Stages', 'Advanced: Emotional Complexity & Growth'],
    },
    {
        id: 'anxiety-stress',
        name: 'Anxiety, Stress & Overwhelm',
        slug: 'anxiety-stress',
        description: 'Understanding and managing various forms of anxiety, panic, and chronic stress — from everyday tension to clinical anxiety disorders.',
        icon: themeIcon('anxiety-stress'),
        color: themeColor('anxiety-stress'),
        image: '/images/categories/anxiety.png',
        subTopics: ['Understanding Anxiety', 'Panic & Physical Anxiety', 'Social Anxiety', 'Burnout & Emotional Exhaustion', 'Phobias & Specific Fears', 'Children & Adolescent Anxiety', 'Anxiety in Relationships & Work'],
    },
    {
        id: 'relationships-communication',
        name: 'Relationships & Communication',
        slug: 'relationships-communication',
        description: 'Building deeper connections, navigating conflict, setting boundaries, and strengthening communication skills across all relationships.',
        icon: themeIcon('relationships-communication'),
        color: themeColor('relationships-communication'),
        image: '/images/categories/relationships.svg',
        subTopics: ['Communication Skills', 'Healthy Boundaries', 'Couples & Partnership', 'Family Dynamics', 'Conflict Resolution', 'Attachment Styles', 'Toxic Dynamics & Red Flags', 'Friendships & Social Networks'],
    },
    {
        id: 'self-worth-identity',
        name: 'Self-Worth, Confidence & Identity',
        slug: 'self-worth-identity',
        description: 'Building self-worth from the inside out — confidence, body image, imposter syndrome, and authentic identity.',
        icon: themeIcon('self-worth-identity'),
        color: themeColor('self-worth-identity'),
        image: '/images/categories/self_esteem.svg',
        subTopics: ['Self-Worth Foundations', 'Confidence Building', 'Body Image & Self-Perception', 'Imposter Syndrome', 'Identity Exploration', 'People-Pleasing & Codependency', 'Self-Compassion & Inner Dialogue'],
    },
    {
        id: 'work-productivity',
        name: 'Work, Productivity & Burnout',
        slug: 'work-productivity',
        description: 'Navigating burnout, professional growth, work-life balance, and academic stress with practical strategies.',
        icon: themeIcon('work-productivity'),
        color: themeColor('work-productivity'),
        image: '/images/categories/workplace.svg',
        subTopics: ['Burnout Prevention & Recovery', 'Work-Life Balance', 'Academic Pressure', 'Leadership & Stress', 'Remote Work', 'Career Transitions', 'Productivity & Focus', 'Workplace Relationships'],
    },
    {
        id: 'family-parenting',
        name: 'Family, Parenting & Childhood Patterns',
        slug: 'family-parenting',
        description: 'Understanding family systems, parenting challenges, childhood influences, and breaking intergenerational patterns.',
        icon: themeIcon('family-parenting'),
        color: themeColor('family-parenting'),
        image: '/images/categories/parenting.svg',
        subTopics: ['Family Systems & Dynamics', 'Parenting Strategies', 'Childhood Patterns', 'Intergenerational Trauma', 'Sibling Relationships', 'Co-Parenting', 'Navigating Family Conflict', "Supporting Children's Mental Health"],
    },
    {
        id: 'depression-grief',
        name: 'Depression, Grief & Loss',
        slug: 'depression-grief',
        description: "Resources for depression, grief, bereavement, and emotional regulation during life's darkest seasons.",
        icon: themeIcon('depression-grief'),
        color: themeColor('depression-grief'),
        image: '/images/categories/mood.png',
        subTopics: ['Understanding Depression', 'Grief & Bereavement', 'Coping Strategies', 'Seasonal & Situational Depression', 'Supporting Loved Ones', 'Finding Professional Help', 'Recovery & Hope'],
    },
    {
        id: 'habits-behavior-change',
        name: 'Habits, Motivation & Behavior Change',
        slug: 'habits-behavior-change',
        description: 'The psychology of habits, motivation, and behavior change — building routines that support mental health.',
        icon: themeIcon('habits-behavior-change'),
        color: themeColor('habits-behavior-change'),
        image: '/images/categories/habits.svg',
        subTopics: ['Habit Formation', 'Motivation Science', 'Behavior Change Models', 'Breaking Bad Habits', 'Building Routines', 'Procrastination', 'Goal Setting'],
    },
    {
        id: 'sleep-body-connection',
        name: 'Sleep, Body & Mind-Body Connection',
        slug: 'sleep-body-connection',
        description: 'The mind-body connection — sleep science, exercise psychology, nutrition, and somatic awareness for mental wellness.',
        icon: themeIcon('sleep-body-connection'),
        color: themeColor('sleep-body-connection'),
        image: '/images/categories/sleep.svg',
        subTopics: ['Sleep Hygiene', 'Insomnia & Sleep Disorders', 'Exercise & Mental Health', 'Nutrition & Mood', 'Somatic Awareness', 'Circadian Rhythms', 'Relaxation Techniques'],
    },
    {
        id: 'digital-life',
        name: 'Digital Life, Social Media & Modern Stressors',
        slug: 'digital-life',
        description: 'Managing digital life, social media impact, screen time, and modern stressors for better mental health.',
        icon: themeIcon('digital-life'),
        color: themeColor('digital-life'),
        image: '/images/categories/digital-life.svg',
        subTopics: ['Social Media & Mental Health', 'Screen Time & Digital Boundaries', 'Cyberbullying', 'Digital Detox', 'Online Relationships'],
    },
    {
        id: 'trauma-healing',
        name: 'Trauma-Informed Education & Healing',
        slug: 'trauma-healing',
        description: 'Understanding trauma, its impact on the brain and body, and evidence-based paths to healing and recovery.',
        icon: themeIcon('trauma-healing'),
        color: themeColor('trauma-healing'),
        image: '/images/categories/trauma.png',
        subTopics: ['Understanding Trauma', 'PTSD & Complex PTSD', 'Trauma Recovery', 'Childhood Trauma', 'Somatic Experiencing', 'Trauma-Informed Care'],
    },
    {
        id: 'cultural-global',
        name: 'Cultural Perspectives, Inclusion & Global Wellness',
        slug: 'cultural-global',
        description: 'Cultural perspectives on mental health, reducing stigma, and building inclusive approaches to psychological wellness.',
        icon: themeIcon('cultural-global'),
        color: themeColor('cultural-global'),
        image: '/images/categories/global.svg',
        subTopics: ['Cultural Stigma', 'Indigenous Perspectives', 'LGBTQ+ Mental Health', 'Racial Trauma', 'Migration & Displacement', 'Collectivist vs Individualist'],
    },
    {
        id: 'aging-dementia-late-life',
        name: 'Aging, Dementia & Late-Life Mental Health',
        slug: 'aging-dementia-late-life',
        description: 'Comprehensive resources on mental health challenges unique to older adults, including dementia, cognitive decline, caregiving, and healthy aging.',
        icon: themeIcon('aging-dementia-late-life'),
        color: themeColor('aging-dementia-late-life'),
        image: '/images/categories/aging.svg',
        subTopics: ["Dementia & Alzheimer's", 'Late-Life Depression', 'Cognitive Decline', 'Caregiving', 'Healthy Aging', 'Retirement & Identity'],
    },
    {
        id: 'womens-mental-health',
        name: "Women's Mental Health",
        slug: 'womens-mental-health',
        description: "Comprehensive coverage of mental health issues affecting women across the lifespan, from reproductive health to gender-specific risk factors and treatment considerations.",
        icon: themeIcon('womens-mental-health'),
        color: themeColor('womens-mental-health'),
        image: '/images/categories/womens-mental-health.svg',
        subTopics: ['Reproductive Mental Health', 'Postpartum & Perinatal', 'Menopause & Hormones', 'Gender-Based Violence', 'Body Image & Eating', 'Work-Life Balance', 'Caregiving Burden'],
    },
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
