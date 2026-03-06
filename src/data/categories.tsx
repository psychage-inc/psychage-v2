import React from 'react';
import { Category } from '../types';
import { getCategoryTheme } from '../config/categoryThemes';

const themeIcon = (slug: string) => {
    const Icon = getCategoryTheme(slug).icon;
    return <Icon size={24} />;
};

const themeColor = (slug: string) => getCategoryTheme(slug).classes.bg;

export const categories: Category[] = [
    // --- CONDITIONS ---
    {
        id: 'anxiety',
        name: 'Anxiety Disorders',
        slug: 'anxiety',
        description: 'Understanding and managing various forms of anxiety and panic.',
        icon: themeIcon('anxiety'),
        color: themeColor('anxiety'),
        group: 'condition',
        image: '/images/categories/anxiety.png',
        subTopics: ['Generalized Anxiety (GAD)', 'Social Anxiety', 'Panic Disorder', 'Phobias', 'OCD']
    },
    {
        id: 'mood',
        name: 'Mood Disorders',
        slug: 'mood-disorders',
        description: 'Resources for depression, bipolar disorder, and emotional regulation.',
        icon: themeIcon('mood-disorders'),
        color: themeColor('mood-disorders'),
        group: 'condition',
        image: '/images/categories/mood.png',
        subTopics: ['Major Depression', 'Bipolar I & II', 'Seasonal Affective (SAD)', 'Postpartum']
    },
    {
        id: 'trauma',
        name: 'Trauma & PTSD',
        slug: 'trauma-stress',
        description: 'Healing from traumatic experiences and managing acute stress.',
        icon: themeIcon('trauma-stress'),
        color: themeColor('trauma-stress'),
        group: 'condition',
        image: '/images/categories/trauma.png',
        subTopics: ['PTSD', 'Complex PTSD', 'Acute Stress', 'Grief & Loss']
    },
    {
        id: 'neurodevelopmental',
        name: 'Neurodiversity',
        slug: 'neurodiversity',
        description: 'Understanding ADHD, Autism, and learning differences.',
        icon: themeIcon('neurodiversity'),
        color: themeColor('neurodiversity'),
        group: 'condition',
        image: '/images/categories/neurodiversity.png',
        subTopics: ['ADHD', 'Autism Spectrum', 'Dyslexia', 'Executive Function']
    },
    {
        id: 'personality',
        name: 'Personality Disorders',
        slug: 'personality-disorders',
        description: 'Understanding complex personality patterns and traits.',
        icon: themeIcon('personality-disorders'),
        color: themeColor('personality-disorders'),
        group: 'condition',
        image: '/images/categories/personality.png',
        subTopics: ['Borderline (BPD)', 'Narcissistic (NPD)', 'Avoidant', 'OCPD']
    },
    {
        id: 'addiction',
        name: 'Addiction & Recovery',
        slug: 'addiction',
        description: 'Support for substance use and behavioral addictions.',
        icon: themeIcon('addiction'),
        color: themeColor('addiction'),
        group: 'condition',
        image: '/images/categories/addiction.png',
        subTopics: ['Alcohol Use', 'Substance Use', 'Gambling', 'Digital Addiction']
    },
    {
        id: 'eating-disorders',
        name: 'Eating Disorders',
        slug: 'eating-disorders',
        description: 'Recovery resources for anorexia, bulimia, and body image.',
        icon: themeIcon('eating-disorders'),
        color: themeColor('eating-disorders'),
        group: 'condition',
        image: '/images/categories/eating_disorders.png',
        subTopics: ['Anorexia', 'Bulimia', 'Binge Eating', 'Body Dysmorphia']
    },
    {
        id: 'psychosis',
        name: 'Psychosis & Schizophrenia',
        slug: 'psychosis',
        description: 'Understanding reality distortion and thought disorders.',
        icon: themeIcon('psychosis'),
        color: themeColor('psychosis'),
        group: 'condition',
        image: '/images/categories/psychosis.svg',
        subTopics: ['Schizophrenia', 'Schizoaffective', 'Brief Psychotic Disorder']
    },

    // --- WELLNESS ---
    {
        id: 'sleep',
        name: 'Sleep & Rest',
        slug: 'sleep',
        description: 'Optimizing sleep hygiene and treating sleep disorders.',
        icon: themeIcon('sleep'),
        color: themeColor('sleep'),
        group: 'wellness',
        image: '/images/categories/sleep.svg',
        subTopics: ['Insomnia', 'Sleep Apnea', 'Circadian Rhythms', 'Sleep Hygiene']
    },
    {
        id: 'wellness',
        name: 'Holistic Wellness',
        slug: 'wellness',
        description: 'Nutrition, movement, and lifestyle for mental health.',
        icon: themeIcon('wellness'),
        color: themeColor('wellness'),
        group: 'wellness',
        image: '/images/categories/wellness.svg',
        subTopics: ['Nutrition', 'Exercise', 'Nature Therapy', 'Breathwork']
    },
    {
        id: 'mindfulness',
        name: 'Mindfulness',
        slug: 'mindfulness',
        description: 'Practices to stay present and reduce stress.',
        icon: themeIcon('mindfulness'),
        color: themeColor('mindfulness'),
        group: 'wellness',
        image: '/images/categories/mindfulness.svg',
        subTopics: ['Meditation', 'Grounding', 'Gratitude', 'Mindful Eating']
    },
    {
        id: 'digital-wellbeing',
        name: 'Digital Wellbeing',
        slug: 'digital-wellbeing',
        description: 'Managing screen time and social media impact.',
        icon: themeIcon('digital-wellbeing'),
        color: themeColor('digital-wellbeing'),
        group: 'wellness',
        image: '/images/categories/digital_wellbeing.svg',
        subTopics: ['Social Media Detox', 'Screen Addiction', 'Cyberbullying']
    },

    // --- LIFE & RELATIONSHIPS ---
    {
        id: 'relationships',
        name: 'Relationships',
        slug: 'relationships',
        description: 'Navigating connections, family, and boundaries.',
        icon: themeIcon('relationships'),
        color: themeColor('relationships'),
        group: 'life',
        image: '/images/categories/relationships.svg',
        subTopics: ['Communication', 'Boundaries', 'Couples', 'Family Dynamics']
    },
    {
        id: 'workplace',
        name: 'Workplace Health',
        slug: 'workplace',
        description: 'Navigating burnout and professional growth.',
        icon: themeIcon('workplace'),
        color: themeColor('workplace'),
        group: 'life',
        image: '/images/categories/workplace.svg',
        subTopics: ['Burnout', 'Work-Life Balance', 'Imposter Syndrome', 'Leadership']
    },
    {
        id: 'parenting',
        name: 'Parenting',
        slug: 'parenting',
        description: 'Raising resilient children and managing parental stress.',
        icon: themeIcon('parenting'),
        color: themeColor('parenting'),
        group: 'family',
        image: '/images/categories/parenting.svg',
        subTopics: ['Positive Parenting', 'Teen Issues', 'New Parents', 'Family Therapy']
    },
    {
        id: 'grief',
        name: 'Grief & Loss',
        slug: 'grief',
        description: 'Navigating the complex emotions of loss.',
        icon: themeIcon('grief'),
        color: themeColor('grief'),
        group: 'life',
        image: '/images/categories/grief.svg',
        subTopics: ['Bereavement', 'Anticipatory Grief', 'Pet Loss']
    },
    {
        id: 'anger',
        name: 'Anger Management',
        slug: 'anger',
        description: 'Healthy ways to express and process anger.',
        icon: themeIcon('anger'),
        color: themeColor('anger'),
        group: 'life',
        image: '/images/categories/anger.svg',
        subTopics: ['Emotional Regulation', 'Conflict Resolution', 'Triggers']
    },

    // --- IDENTITY ---
    {
        id: 'mens-health',
        name: 'Men\'s Mental Health',
        slug: 'mens-health',
        description: 'Specific challenges and resources for men.',
        icon: themeIcon('mens-health'),
        color: themeColor('mens-health'),
        group: 'identity',
        image: '/images/categories/mens_health.svg',
        subTopics: ['Emotional Expression', 'Fatherhood', 'Masculinity']
    },
    {
        id: 'womens-health',
        name: 'Women\'s Mental Health',
        slug: 'womens-health',
        description: 'Specific challenges and resources for women.',
        icon: themeIcon('womens-health'),
        color: themeColor('womens-health'),
        group: 'identity',
        image: '/images/categories/womens_health.svg',
        subTopics: ['Hormonal Health', 'Motherhood', 'Body Image']
    },
    {
        id: 'lgbtq',
        name: 'LGBTQ+ Support',
        slug: 'lgbtq',
        description: 'Resources for the LGBTQ+ community.',
        icon: themeIcon('lgbtq'),
        color: themeColor('lgbtq'),
        group: 'identity',
        image: '/images/categories/lgbtq.svg',
        subTopics: ['Coming Out', 'Gender Identity', 'Discrimination']
    },

    // --- THERAPY ---
    {
        id: 'therapy-types',
        name: 'Types of Therapy',
        slug: 'therapy-types',
        description: 'Guides to different therapeutic modalities.',
        icon: themeIcon('therapy-types'),
        color: themeColor('therapy-types'),
        group: 'therapy',
        image: '/images/categories/therapy_types.svg',
        subTopics: ['CBT', 'DBT', 'EMDR', 'Psychodynamic']
    },
    {
        id: 'medication',
        name: 'Medication',
        slug: 'medication',
        description: 'Understanding psychiatric medications.',
        icon: themeIcon('medication'),
        color: themeColor('medication'),
        group: 'therapy',
        image: '/images/categories/medication.svg',
        subTopics: ['Antidepressants', 'Anxiolytics', 'Mood Stabilizers']
    }
];

export const getCategoryById = (id: string): Category | undefined => {
    return categories.find(c => c.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
    return categories.find(c => c.slug === slug);
};
