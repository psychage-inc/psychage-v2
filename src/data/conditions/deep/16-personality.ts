/**
 * Deep content — Personality disorders and related traits (ICD-11 6D10).
 *
 * ICD-11 reframes personality disorder dimensionally: a single diagnosis described by SEVERITY
 * (mild/moderate/severe) and TRAIT DOMAINS, rather than many separate "types". The copy is
 * strongly de-stigmatising (this is one of the most stigmatised diagnoses), emphasises that it
 * usually reflects difficulty rooted in temperament and early adversity, and is hopeful —
 * personality difficulties CAN improve with support. Crisis-aware (self-harm/suicide risk).
 * Plain-language, non-diagnostic. ICD-11 / DSM-5-TR framed.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

const NHS_PD = { label: 'NHS — Personality disorders', url: 'https://www.nhs.uk/mental-health/conditions/personality-disorder/' };

export const personalityDeep: ConditionDeepMap = {
    'personality-disorder': {
        short_definition:
            'A long-standing pattern in how a person experiences themselves and relates to others that differs markedly from what their culture expects, is pervasive across situations, and causes significant distress or problems in relationships, work, and daily life. ICD-11 describes it by severity (mild, moderate, or severe) and by which personality traits are most prominent, rather than as separate "types". It is common, often rooted in difficult early experiences, and — contrary to old pessimism — it can genuinely improve with support.',
        what_it_feels_like:
            'People may struggle with a stable sense of who they are and what they want, with managing intense emotions, and with close relationships — which can feel unstable, painful, or hard to trust. Some feel empty, fearful of abandonment, or quick to anger; others feel detached, rigid, or driven by perfectionism. The difficulties are long-standing and feel like "just how I am", which is part of why they are so distressing and so often misunderstood.',
        how_it_differs:
            'Unlike a passing difficulty or a single episode of mental illness, personality difficulties are long-standing and show up across many situations and relationships. Unlike ordinary personality differences, they are pervasive and cause real distress or impairment. ICD-11’s approach focuses on how severe the difficulties are and which traits stand out, rather than fitting people into rigid categories.',
        when_more_than_everyday:
            'Everyone has a personality, with strengths and rough edges. It is worth seeking help when long-standing patterns in how you see yourself and relate to others repeatedly cause significant distress or seriously affect your relationships, work, or wellbeing — and especially if they bring self-harm or thoughts of suicide.',
        sections: [
            { heading: 'How it’s understood (severity and traits)', body: 'ICD-11 makes one diagnosis of personality disorder and then describes it in two ways. Severity: mild, moderate, or severe, based on how much the difficulties affect the person’s sense of self and their relationships, and the level of distress or risk. Trait domains: which features are most prominent — for example negative emotionality (intense, easily triggered emotions), detachment (withdrawal from relationships and emotion), dissociality (disregard for others), disinhibition (acting on impulse), and anankastia (rigidity and perfectionism). A "borderline pattern" can also be noted, marked by emotional instability, fear of abandonment, unstable relationships, and self-harm.' },
            { heading: 'Signs and features', body: 'Difficulties typically show up in two areas: the self (an unstable or unclear sense of identity, self-worth, and direction; difficulty managing emotions) and relationships (trouble forming and keeping close, mutually satisfying relationships; misreading others; conflict, withdrawal, or instability). These patterns are long-standing, appear across different situations, and cause distress or problems — they are not just an occasional bad patch.' },
            { heading: 'Who it affects', body: 'Personality difficulties are common, affecting a meaningful share of people, often becoming apparent in adolescence or early adulthood. They frequently coexist with depression, anxiety, trauma-related conditions, and substance use. Despite this, the diagnosis carries heavy, unfair stigma — including within healthcare — which can be a barrier to compassionate help.' },
            { heading: 'What causes it', body: 'Personality difficulties usually develop from an interaction between temperament (which is partly genetic) and life experiences, especially difficult, frightening, or invalidating early environments — including neglect, abuse, or trauma. They reflect a person’s best attempts to cope with what they have lived through, not a flaw in character. Understanding this is central to compassionate, effective help.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses long-standing patterns in how a person experiences themselves and relates to others, across situations and over time, and rates the severity and prominent traits — while distinguishing personality difficulties from other conditions (and recognising they often coexist). In ICD-11 it is coded 6D10. A careful, non-judgmental, trusting assessment matters, given the stigma and the personal nature of what is being explored.' },
            { heading: 'Treatment and support', body: 'The old belief that personality disorders cannot be treated is wrong. Structured psychological therapies are effective — approaches such as dialectical behaviour therapy, mentalization-based therapy, and other specialist programmes help people manage emotions, build a steadier sense of self, and improve relationships. Treating co-occurring depression, anxiety, trauma, or substance use matters too; medication is not a treatment for the personality difficulties themselves but may help specific symptoms. A consistent, respectful therapeutic relationship is itself healing.' },
            { heading: 'Recovery and hope', body: 'Many people improve substantially over time, with symptoms easing and lives becoming more stable and satisfying — research shows personality difficulties are far more changeable than once thought. Recovery is rarely a straight line, but with the right support, people build steadier relationships, a clearer sense of self, and a life that feels more their own. Hope is justified.' },
            { heading: 'For family and friends', body: 'Stigma hurts; compassion helps. Try to understand the difficulties as long-standing ways of coping with past pain, be consistent and reliable, set kind and clear boundaries, and avoid blame. Support the person’s engagement with specialist therapy, take any self-harm or suicidal talk seriously, and look after your own wellbeing — support exists for families and carers too.' },
            { heading: 'When to get help', body: 'Seek help from a GP or mental health service when long-standing patterns in how you relate to yourself and others cause significant distress or seriously affect your life. If there is self-harm or any thought of suicide — which can accompany severe personality difficulties — treat it as urgent and contact emergency services or a crisis line now. Effective, compassionate help is available, and improvement is possible.' },
        ],
        sources: [WHO_ICD11, NHS_PD],
    },
};
