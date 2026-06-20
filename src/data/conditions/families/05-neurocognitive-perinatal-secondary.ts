import type { ConditionSeed } from '@/types/condition';

/**
 * ICD-11 Chapter 6 — Neurocognitive disorders, Mental or behavioural disorders
 * associated with pregnancy, childbirth or the puerperium, and Secondary mental or
 * behavioural syndromes (those caused by a disorder or disease classified elsewhere).
 *
 * All rows land unverified for clinical review.
 */

const SECONDARY_GROUP = 'Secondary mental or behavioural syndromes';

export const neurocognitivePerinatalSecondary: ConditionSeed[] = [
    // --- Neurocognitive disorders -------------------------------------------
    {
        slug: 'delirium',
        name: 'Delirium',
        icd11_code: '6D70',
        icd11_grouping: 'Neurocognitive disorders',
        short_definition:
            'A sudden, usually short-lived state of confusion and reduced awareness, often caused by illness, medicines, or substances.',
        what_it_feels_like:
            'A person may become confused over hours or days, lose track of where they are, have trouble paying attention, and shift between drowsy and agitated. Thinking and memory can swing within the same day.',
        how_it_differs:
            'Unlike dementia, delirium comes on quickly and often clears once the cause is treated. Unlike a primary psychotic disorder, it is driven by a physical cause such as infection, medicines, or substances.',
        when_more_than_everyday:
            'When confusion and reduced awareness come on suddenly, especially in someone unwell or older. This is a medical emergency and needs urgent care.',
        provenance: 'ICD-11 6D70 / DSM-5-TR Delirium',
    },
    {
        slug: 'mild-neurocognitive-disorder',
        name: 'Mild neurocognitive disorder',
        icd11_code: '6D71',
        icd11_grouping: 'Neurocognitive disorders',
        short_definition:
            'A noticeable but mild decline in thinking skills such as memory or attention that does not yet stop a person from living independently.',
        what_it_feels_like:
            'A person — or those close to them — may notice they are more forgetful, slower to think, or less sharp than before, while still managing daily tasks, perhaps with extra effort or reminders.',
        how_it_differs:
            'Unlike dementia, the decline is mild and independence is preserved. Unlike ordinary ageing, the change is clear, noticeable to others or on testing, and a step down from the person’s former level.',
        when_more_than_everyday:
            'When a real decline in thinking is noticeable and confirmed but daily independence remains. A check-up can help find the cause and track any change.',
        provenance: 'ICD-11 6D71 / DSM-5-TR Mild Neurocognitive Disorder',
    },
    {
        slug: 'amnestic-disorder',
        name: 'Amnestic disorder',
        icd11_code: '6D72',
        icd11_grouping: 'Neurocognitive disorders',
        short_definition:
            'A marked memory problem — especially forming new memories — caused by a brain condition, injury, or substance, while other thinking skills stay relatively intact.',
        what_it_feels_like:
            'A person may struggle to remember recent events or learn new information, repeating questions or losing track of what just happened, even though other abilities like language stay fairly strong.',
        how_it_differs:
            'Unlike dementia, the main loss is memory rather than a broad decline across many thinking skills. Unlike dissociative amnesia, it has a physical cause such as injury, illness, or substances.',
        when_more_than_everyday:
            'When a marked memory problem follows a brain injury, illness, or substance use and affects daily life. A medical assessment is needed to find the cause.',
        provenance: 'ICD-11 6D72 / DSM-5-TR Major Neurocognitive Disorder (amnestic presentation)',
    },
    {
        slug: 'dementia-due-to-alzheimer-disease',
        name: 'Dementia due to Alzheimer disease',
        icd11_code: '6D80',
        icd11_grouping: 'Neurocognitive disorders',
        short_definition:
            'A gradual, lasting decline in memory and other thinking skills caused by Alzheimer disease, severe enough to affect everyday independence.',
        what_it_feels_like:
            'A person often first struggles to remember recent events and words, then over time finds planning, orientation, and familiar tasks harder, gradually needing more help with daily life.',
        how_it_differs:
            'Unlike delirium, it develops slowly over months to years rather than suddenly. Unlike other dementias, memory loss tends to come first, and the underlying cause is Alzheimer disease.',
        when_more_than_everyday:
            'When a gradual decline in memory and thinking begins to affect daily independence. An early assessment helps with planning, support, and care.',
        provenance: 'ICD-11 6D80 / DSM-5-TR Major Neurocognitive Disorder Due to Alzheimer’s Disease',
    },
    {
        slug: 'dementia-due-to-cerebrovascular-disease',
        name: 'Dementia due to cerebrovascular disease',
        icd11_code: '6D81',
        icd11_grouping: 'Neurocognitive disorders',
        short_definition:
            'A decline in thinking skills caused by reduced blood flow to the brain, such as after strokes, severe enough to affect everyday independence.',
        what_it_feels_like:
            'A person may notice changes in thinking that come on in steps — sometimes after a stroke — affecting attention, planning, or speed of thought, alongside physical effects of the underlying blood-vessel problems.',
        how_it_differs:
            'Unlike Alzheimer dementia, the decline often comes in steps tied to vascular events and may affect planning and speed more than memory at first. The cause is problems with the brain’s blood supply.',
        when_more_than_everyday:
            'When thinking declines enough to affect daily life, especially after strokes or with vascular risk factors. Assessment helps guide care and reduce further risk.',
        provenance: 'ICD-11 6D81 / DSM-5-TR Major Vascular Neurocognitive Disorder',
    },
    {
        slug: 'dementia-due-to-lewy-body-disease',
        name: 'Dementia due to Lewy body disease',
        icd11_code: '6D82',
        icd11_grouping: 'Neurocognitive disorders',
        short_definition:
            'A decline in thinking skills caused by Lewy body disease, often with changing alertness, visual hallucinations, and movement changes.',
        what_it_feels_like:
            'A person may have thinking that fluctuates from hour to hour, see things that are not there, move more slowly or stiffly, and have vivid dreams that disturb sleep, alongside memory and attention changes.',
        how_it_differs:
            'Unlike Alzheimer dementia, alertness often changes markedly, visual hallucinations are common early, and movement symptoms appear. The cause is Lewy body disease rather than Alzheimer changes.',
        when_more_than_everyday:
            'When changing alertness, hallucinations, or movement changes accompany a decline in thinking. An assessment helps because care needs to be tailored to this condition.',
        provenance: 'ICD-11 6D82 / DSM-5-TR Major Neurocognitive Disorder with Lewy Bodies',
    },
    {
        slug: 'frontotemporal-dementia',
        name: 'Frontotemporal dementia',
        icd11_code: '6D83',
        icd11_grouping: 'Neurocognitive disorders',
        short_definition:
            'A decline caused by damage to the front and side parts of the brain, often changing personality, behaviour, or language more than memory at first.',
        what_it_feels_like:
            'A person may show changes in personality, judgement, or social behaviour, or growing trouble with language, while everyday memory may be relatively spared early on. Changes can be confusing for loved ones.',
        how_it_differs:
            'Unlike Alzheimer dementia, early changes are often in behaviour or language rather than memory, and it tends to begin at a younger age. The cause is degeneration of the frontal and temporal brain regions.',
        when_more_than_everyday:
            'When personality, behaviour, or language change in a lasting way, especially in mid-life. An assessment helps identify the cause and support those affected.',
        provenance: 'ICD-11 6D83 / DSM-5-TR Major Neurocognitive Disorder, Frontotemporal',
    },
    {
        slug: 'dementia-due-to-psychoactive-substances',
        name: 'Dementia due to use of psychoactive substances',
        icd11_code: '6D84',
        icd11_grouping: 'Neurocognitive disorders',
        short_definition:
            'A lasting decline in thinking skills caused by long-term heavy use of substances such as alcohol, severe enough to affect everyday independence.',
        what_it_feels_like:
            'A person may have lasting problems with memory, planning, or judgement that remain even after stopping the substance, following years of heavy use.',
        how_it_differs:
            'Unlike intoxication or withdrawal, the decline persists beyond the substance leaving the body. Unlike Alzheimer dementia, the cause is long-term substance use rather than a degenerative brain disease.',
        when_more_than_everyday:
            'When thinking skills stay impaired after long-term heavy substance use, affecting daily life. Assessment and support can help, and some changes may improve with abstinence.',
        provenance: 'ICD-11 6D84 / DSM-5-TR Substance-Induced Major Neurocognitive Disorder',
    },
    {
        slug: 'dementia-due-to-diseases-classified-elsewhere',
        name: 'Dementia due to diseases classified elsewhere',
        icd11_code: '6D85',
        icd11_grouping: 'Neurocognitive disorders',
        short_definition:
            'A decline in thinking skills caused by another known disease — such as Parkinson, HIV, or Huntington disease — severe enough to affect everyday independence.',
        what_it_feels_like:
            'A person may develop lasting problems with memory, attention, or planning as part of another diagnosed illness, alongside that illness’s other effects on the body or movement.',
        how_it_differs:
            'Unlike Alzheimer or vascular dementia, the decline is part of a different, identified disease. The thinking changes are understood as one feature of that underlying condition.',
        when_more_than_everyday:
            'When thinking declines enough to affect daily life as part of another diagnosed disease. Care is coordinated with treatment for the underlying condition.',
        provenance: 'ICD-11 6D85 / DSM-5-TR Major Neurocognitive Disorder Due to Another Medical Condition',
    },

    // --- Disorders associated with pregnancy, childbirth or the puerperium ---
    {
        slug: 'mental-or-behavioural-disorders-associated-with-pregnancy-without-psychotic-symptoms',
        name: 'Mental or behavioural disorders associated with pregnancy, childbirth or the puerperium, without psychotic symptoms',
        icd11_code: '6E20',
        icd11_grouping: 'Disorders associated with pregnancy, childbirth or the puerperium',
        short_definition:
            'Significant mood or anxiety symptoms that arise during pregnancy or in the weeks after birth, without losing touch with reality.',
        what_it_feels_like:
            'A new or expecting parent may feel persistently low, anxious, tearful, or overwhelmed, struggle to sleep or bond, and feel guilt or fear about coping — beyond the short-lived "baby blues".',
        how_it_differs:
            'Unlike the perinatal disorder with psychotic symptoms, there is no loss of contact with reality. Unlike the brief baby blues, the symptoms are more intense, last longer, and interfere with daily life and caregiving.',
        when_more_than_everyday:
            'When low mood or anxiety around pregnancy or birth lasts beyond a couple of weeks and affects daily life or caring for the baby. Help is available and effective.',
        provenance:
            'ICD-11 6E20 / DSM-5-TR Depressive or anxiety disorder with peripartum onset',
    },
    {
        slug: 'mental-or-behavioural-disorders-associated-with-pregnancy-with-psychotic-symptoms',
        name: 'Mental or behavioural disorders associated with pregnancy, childbirth or the puerperium, with psychotic symptoms',
        icd11_code: '6E21',
        icd11_grouping: 'Disorders associated with pregnancy, childbirth or the puerperium',
        short_definition:
            'Severe mental health symptoms after childbirth that include losing touch with reality, such as confusion, false beliefs, or hallucinations.',
        what_it_feels_like:
            'In the days or weeks after birth, a parent may become confused, hold strong false beliefs, see or hear things others do not, or shift rapidly in mood. The experience can be frightening and disorienting.',
        how_it_differs:
            'Unlike the perinatal disorder without psychotic symptoms, this includes a loss of contact with reality. Unlike the baby blues, it is severe and develops quickly.',
        when_more_than_everyday:
            'When psychotic symptoms appear after childbirth, this is a medical emergency that needs urgent care for the safety of parent and baby.',
        provenance: 'ICD-11 6E21 / DSM-5-TR Postpartum psychosis (brief psychotic disorder, peripartum onset)',
    },

    // --- Secondary mental or behavioural syndromes --------------------------
    {
        slug: 'secondary-neurodevelopmental-syndrome',
        name: 'Secondary neurodevelopmental syndrome',
        icd11_code: '6E60',
        icd11_grouping: SECONDARY_GROUP,
        short_definition:
            'Neurodevelopmental difficulties that arise as a direct result of another medical condition, disease, or injury affecting the brain.',
        what_it_feels_like:
            'A person may show difficulties with learning, attention, or development that are caused by an underlying illness or injury rather than appearing on their own.',
        how_it_differs:
            'Unlike a primary neurodevelopmental disorder, these difficulties are caused by another identified medical condition. Treating or managing that condition is central.',
        when_more_than_everyday:
            'When neurodevelopmental difficulties clearly stem from another medical condition and affect daily life. Care is coordinated with treatment for the underlying cause.',
        provenance: 'ICD-11 6E60 / Secondary neurodevelopmental syndrome',
    },
    {
        slug: 'secondary-psychotic-syndrome',
        name: 'Secondary psychotic syndrome',
        icd11_code: '6E61',
        icd11_grouping: SECONDARY_GROUP,
        short_definition:
            'Psychotic symptoms such as hallucinations or false beliefs that are caused directly by another medical condition or substance.',
        what_it_feels_like:
            'A person may hear or see things others do not, or hold strong false beliefs, as a direct effect of an illness, injury, or substance rather than from a primary psychotic disorder.',
        how_it_differs:
            'Unlike schizophrenia or other primary psychotic disorders, the symptoms are caused by an identified medical condition or substance. Treating that cause is central.',
        when_more_than_everyday:
            'When psychotic symptoms arise from another medical condition or substance. This needs prompt medical assessment to find and treat the cause.',
        provenance: 'ICD-11 6E61 / DSM-5-TR Psychotic Disorder Due to Another Medical Condition',
    },
    {
        slug: 'secondary-mood-syndrome',
        name: 'Secondary mood syndrome',
        icd11_code: '6E62',
        icd11_grouping: SECONDARY_GROUP,
        short_definition:
            'Significant changes in mood — low, elevated, or irritable — that are caused directly by another medical condition or substance.',
        what_it_feels_like:
            'A person may experience depression, elevated mood, or marked irritability as a direct effect of an illness, medicine, or substance rather than from a primary mood disorder.',
        how_it_differs:
            'Unlike primary mood disorders, the mood changes are caused by an identified medical condition or substance. Addressing that cause is central.',
        when_more_than_everyday:
            'When marked mood changes arise from another medical condition or substance and affect daily life. Assessment helps find and treat the cause.',
        provenance: 'ICD-11 6E62 / DSM-5-TR Mood Disorder Due to Another Medical Condition',
    },
    {
        slug: 'secondary-anxiety-syndrome',
        name: 'Secondary anxiety syndrome',
        icd11_code: '6E63',
        icd11_grouping: SECONDARY_GROUP,
        short_definition:
            'Significant anxiety symptoms that are caused directly by another medical condition or substance.',
        what_it_feels_like:
            'A person may feel intense worry, fear, or physical anxiety as a direct effect of an illness, medicine, or substance rather than from a primary anxiety disorder.',
        how_it_differs:
            'Unlike primary anxiety disorders, the anxiety is caused by an identified medical condition or substance. Treating that cause is central.',
        when_more_than_everyday:
            'When marked anxiety arises from another medical condition or substance and affects daily life. Assessment helps find and treat the cause.',
        provenance: 'ICD-11 6E63 / DSM-5-TR Anxiety Disorder Due to Another Medical Condition',
    },
    {
        slug: 'secondary-obsessive-compulsive-or-related-syndrome',
        name: 'Secondary obsessive-compulsive or related syndrome',
        icd11_code: '6E64',
        icd11_grouping: SECONDARY_GROUP,
        short_definition:
            'Obsessive-compulsive or related symptoms that are caused directly by another medical condition or substance.',
        what_it_feels_like:
            'A person may have intrusive thoughts, repetitive behaviours, or related symptoms as a direct effect of an illness, injury, or substance rather than from a primary disorder.',
        how_it_differs:
            'Unlike primary obsessive-compulsive or related disorders, the symptoms are caused by an identified medical condition or substance. Treating that cause is central.',
        when_more_than_everyday:
            'When obsessive-compulsive symptoms arise from another medical condition or substance and affect daily life. Assessment helps find and treat the cause.',
        provenance: 'ICD-11 6E64 / Secondary obsessive-compulsive or related syndrome',
    },
    {
        slug: 'secondary-dissociative-syndrome',
        name: 'Secondary dissociative syndrome',
        icd11_code: '6E65',
        icd11_grouping: SECONDARY_GROUP,
        short_definition:
            'Dissociative symptoms — such as detachment or memory gaps — that are caused directly by another medical condition or substance.',
        what_it_feels_like:
            'A person may feel detached from themselves or their surroundings, or have memory gaps, as a direct effect of an illness, injury, or substance rather than from a primary dissociative disorder.',
        how_it_differs:
            'Unlike primary dissociative disorders, the symptoms are caused by an identified medical condition or substance. Treating that cause is central.',
        when_more_than_everyday:
            'When dissociative symptoms arise from another medical condition or substance and affect daily life. Assessment helps find and treat the cause.',
        provenance: 'ICD-11 6E65 / Secondary dissociative syndrome',
    },
    {
        slug: 'secondary-impulse-control-syndrome',
        name: 'Secondary impulse control syndrome',
        icd11_code: '6E66',
        icd11_grouping: SECONDARY_GROUP,
        short_definition:
            'Difficulty controlling impulses or urges that is caused directly by another medical condition or substance.',
        what_it_feels_like:
            'A person may struggle to resist urges or act on impulse in new ways as a direct effect of an illness, medicine, or substance rather than from a primary impulse control disorder.',
        how_it_differs:
            'Unlike primary impulse control disorders, the difficulty is caused by an identified medical condition or substance. Treating that cause is central.',
        when_more_than_everyday:
            'When new problems controlling impulses arise from another medical condition or substance and affect daily life. Assessment helps find and treat the cause.',
        provenance: 'ICD-11 6E66 / Secondary impulse control syndrome',
    },
    {
        slug: 'secondary-neurocognitive-syndrome',
        name: 'Secondary neurocognitive syndrome',
        icd11_code: '6E67',
        icd11_grouping: SECONDARY_GROUP,
        short_definition:
            'Changes in thinking, mood, or behaviour linked to a brain condition that do not fit the usual neurocognitive disorder categories, caused by another medical condition.',
        what_it_feels_like:
            'A person may show changes in thinking, personality, or behaviour tied to an underlying brain condition, in a pattern that does not match the standard neurocognitive disorders.',
        how_it_differs:
            'Unlike delirium or dementia, the picture does not fit those categories, though it stems from a brain-related medical condition. Treating that condition is central.',
        when_more_than_everyday:
            'When brain-related changes in thinking or behaviour arise from another medical condition and affect daily life. Assessment helps find and treat the cause.',
        provenance: 'ICD-11 6E67 / Secondary neurocognitive syndrome',
    },
    {
        slug: 'secondary-personality-change',
        name: 'Secondary personality change',
        icd11_code: '6E68',
        icd11_grouping: SECONDARY_GROUP,
        short_definition:
            'A lasting change in a person’s usual personality and behaviour that is caused directly by another medical condition, such as a brain injury or disease.',
        what_it_feels_like:
            'Those close to a person may notice a clear shift from their former self — in temperament, judgement, or emotional control — following an illness or injury affecting the brain.',
        how_it_differs:
            'Unlike a personality disorder, this is a change from the person’s previous, established personality and is caused by an identified medical condition. Treating that condition is central.',
        when_more_than_everyday:
            'When a clear, lasting change in personality follows a medical condition or brain injury. Assessment helps identify the cause and guide support.',
        provenance: 'ICD-11 6E68 / DSM-5-TR Personality Change Due to Another Medical Condition',
    },
    {
        slug: 'secondary-catatonia-syndrome',
        name: 'Secondary catatonia syndrome',
        icd11_code: '6E69',
        icd11_grouping: SECONDARY_GROUP,
        short_definition:
            'The marked changes in movement and responsiveness of catatonia, caused directly by another medical condition.',
        what_it_feels_like:
            'A person may become very still and unresponsive, hold fixed postures, or grow agitated, as a direct effect of another medical illness affecting the body or brain.',
        how_it_differs:
            'Unlike catatonia tied to a mental disorder or to substances, this is caused by another general medical condition. Treating that condition is central and urgent.',
        when_more_than_everyday:
            'When marked movement and responsiveness changes arise from another medical condition. This is a medical emergency and needs urgent care.',
        provenance: 'ICD-11 6E69 / DSM-5-TR Catatonic Disorder Due to Another Medical Condition',
    },
];
