import type { ConditionSeed } from '@/types/condition';

/**
 * ICD-11 Chapter 6 — Elimination disorders, Disorders of bodily distress or bodily
 * experience, and Disorders due to substance use or addictive behaviours.
 *
 * Substance-use categories are written at the four-character class level (each covers
 * the spectrum from a single harmful episode through harmful pattern and dependence).
 * All rows land unverified for clinical review.
 */

const SUBSTANCE_GROUP = 'Disorders due to substance use or addictive behaviours';

export const eliminationBodilySubstance: ConditionSeed[] = [
    // --- Elimination disorders ----------------------------------------------
    {
        slug: 'enuresis',
        name: 'Enuresis',
        icd11_code: '6C00',
        icd11_grouping: 'Elimination disorders',
        short_definition:
            'Repeated wetting, in clothing during the day or in bed at night, in a child old enough to have usually gained bladder control, without a medical cause.',
        what_it_feels_like:
            'A child may wet the bed or themselves more than occasionally, past the age this is expected, often feeling embarrassed. It is not done on purpose and is not a sign of laziness.',
        how_it_differs:
            'Unlike wetting caused by a urinary infection or other illness, no physical disease explains it. Unlike the early years of toilet learning, the child is old enough that control is usually established.',
        when_more_than_everyday:
            'When wetting happens regularly past the expected age, without a medical cause, and affects a child’s comfort, sleep, or confidence.',
        provenance: 'ICD-11 6C00 / DSM-5-TR Enuresis',
    },
    {
        slug: 'encopresis',
        name: 'Encopresis',
        icd11_code: '6C01',
        icd11_grouping: 'Elimination disorders',
        short_definition:
            'Repeatedly passing stool in inappropriate places in a child old enough to have usually gained bowel control, without a medical cause.',
        what_it_feels_like:
            'A child may soil their clothing, often without meaning to, sometimes linked to constipation. It can bring shame and be confusing for the child and family.',
        how_it_differs:
            'Unlike soiling caused by a bowel disease, no physical illness fully explains it. Unlike the toddler years, the child is old enough that bowel control is usually established.',
        when_more_than_everyday:
            'When soiling happens regularly past the expected age, without a medical cause, and affects a child’s comfort, hygiene, or confidence.',
        provenance: 'ICD-11 6C01 / DSM-5-TR Encopresis',
    },

    // --- Disorders of bodily distress or bodily experience ------------------
    {
        slug: 'bodily-distress-disorder',
        name: 'Bodily distress disorder',
        icd11_code: '6C20',
        icd11_grouping: 'Disorders of bodily distress or bodily experience',
        short_definition:
            'Distressing physical symptoms the person is very focused on, where the time and worry spent on them is out of step with the symptoms themselves.',
        what_it_feels_like:
            'A person may have real, troubling symptoms — such as pain, fatigue, or gut trouble — and spend a great deal of energy worrying about them, checking the body, and seeking care, often with limited relief.',
        how_it_differs:
            'Unlike health anxiety, the focus is on the burden of the symptoms themselves rather than on fear of a future illness. Unlike symptoms with a clear medical cause alone, the distress and attention are excessive and disabling.',
        when_more_than_everyday:
            'When bodily symptoms and the worry around them take up excessive time and energy and interfere with daily life for several months.',
        provenance: 'ICD-11 6C20 / DSM-5-TR Somatic Symptom Disorder',
    },
    {
        slug: 'body-integrity-dysphoria',
        name: 'Body integrity dysphoria',
        icd11_code: '6C21',
        icd11_grouping: 'Disorders of bodily distress or bodily experience',
        short_definition:
            'A persistent, distressing sense that a healthy part of one’s body — most often a limb — does not belong, with a strong wish to change that.',
        what_it_feels_like:
            'A person may feel that a normal, working part of their body is wrong or foreign, and long for it to be different, sometimes imagining or acting as if it were not there. The mismatch can cause deep distress.',
        how_it_differs:
            'Unlike body dysmorphic disorder, the concern is not about appearance or flaws but about a body part feeling like it does not belong. Unlike a delusion, the person knows the body part is physically healthy.',
        when_more_than_everyday:
            'When the sense that a healthy body part does not belong persists, causes lasting distress, or leads to risky attempts to change the body.',
        provenance: 'ICD-11 6C21 / Body Integrity Dysphoria',
    },

    // --- Disorders due to substance use -------------------------------------
    {
        slug: 'disorders-due-to-use-of-alcohol',
        name: 'Disorders due to use of alcohol',
        icd11_code: '6C40',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'A range of problems caused by drinking alcohol, from harmful drinking that damages health to dependence, where alcohol takes priority over other parts of life.',
        what_it_feels_like:
            'A person may find drinking hard to control, need more to feel the same effect, feel unwell when not drinking, and keep going despite harm to health, work, or relationships. Cutting down can feel very difficult.',
        how_it_differs:
            'Unlike disorders due to other substances, the substance is alcohol. Unlike occasional heavy drinking, these patterns cause real harm or show signs of dependence over time.',
        when_more_than_everyday:
            'When drinking harms health or daily life, is hard to control, or shows dependence such as cravings, tolerance, or withdrawal. Support is available and effective.',
        provenance: 'ICD-11 6C40 / DSM-5-TR Alcohol Use Disorder',
    },
    {
        slug: 'disorders-due-to-use-of-cannabis',
        name: 'Disorders due to use of cannabis',
        icd11_code: '6C41',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'A range of problems caused by using cannabis, from harmful use that damages health to dependence, where cannabis takes priority over other parts of life.',
        what_it_feels_like:
            'A person may use cannabis more than intended, find it hard to cut down, need more for the same effect, and keep using despite problems with motivation, memory, mood, work, or relationships.',
        how_it_differs:
            'Unlike disorders due to other substances, the substance is cannabis. Unlike occasional use, these patterns cause harm or show dependence such as cravings, tolerance, or difficulty stopping.',
        when_more_than_everyday:
            'When cannabis use harms health or daily life, is hard to control, or shows signs of dependence. Support can help.',
        provenance: 'ICD-11 6C41 / DSM-5-TR Cannabis Use Disorder',
    },
    {
        slug: 'disorders-due-to-use-of-synthetic-cannabinoids',
        name: 'Disorders due to use of synthetic cannabinoids',
        icd11_code: '6C42',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'Problems caused by using lab-made cannabis-like chemicals, from harmful use to dependence, often with stronger and less predictable effects than cannabis.',
        what_it_feels_like:
            'A person may use these substances despite frightening or unpredictable effects, find them hard to stop, and keep using even as health, mood, or daily life suffer. Effects can be intense and risky.',
        how_it_differs:
            'Unlike cannabis, these are synthetic chemicals whose strength and effects are often unpredictable and more dangerous. Unlike occasional use, these patterns cause harm or show dependence.',
        when_more_than_everyday:
            'When use of synthetic cannabinoids harms health or daily life, is hard to control, or shows signs of dependence. These substances carry serious risks.',
        provenance: 'ICD-11 6C42 / Disorders due to use of synthetic cannabinoids',
    },
    {
        slug: 'disorders-due-to-use-of-opioids',
        name: 'Disorders due to use of opioids',
        icd11_code: '6C43',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'A range of problems caused by using opioids such as heroin or certain pain medicines, from harmful use to dependence, with a high risk of overdose.',
        what_it_feels_like:
            'A person may feel strong cravings, need more for the same effect, feel very unwell in withdrawal, and keep using despite serious harm. The pull of the substance can come to dominate daily life.',
        how_it_differs:
            'Unlike disorders due to other substances, the substances are opioids, which carry a high overdose risk. Unlike short-term prescribed use, these patterns cause harm or show clear dependence.',
        when_more_than_everyday:
            'When opioid use harms health or daily life, is hard to control, or shows dependence such as cravings, tolerance, or withdrawal. This carries overdose risk and deserves prompt support.',
        provenance: 'ICD-11 6C43 / DSM-5-TR Opioid Use Disorder',
    },
    {
        slug: 'disorders-due-to-use-of-sedatives-hypnotics-or-anxiolytics',
        name: 'Disorders due to use of sedatives, hypnotics or anxiolytics',
        icd11_code: '6C44',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'Problems caused by using calming or sleep medicines such as benzodiazepines, from harmful use to dependence, including difficult withdrawal.',
        what_it_feels_like:
            'A person may need more of the medicine for the same calming or sleep effect, feel unable to stop, and have distressing symptoms when cutting down, even if it began as prescribed treatment.',
        how_it_differs:
            'Unlike disorders due to stimulants, these substances slow the body and mind. Unlike short-term prescribed use, these patterns cause harm or show dependence, and stopping suddenly can be dangerous.',
        when_more_than_everyday:
            'When use of these medicines harms daily life, is hard to control, or shows dependence. Reducing them is safest with professional guidance.',
        provenance: 'ICD-11 6C44 / DSM-5-TR Sedative, Hypnotic, or Anxiolytic Use Disorder',
    },
    {
        slug: 'disorders-due-to-use-of-cocaine',
        name: 'Disorders due to use of cocaine',
        icd11_code: '6C45',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'A range of problems caused by using cocaine, from harmful use to dependence, where the drug takes priority over other parts of life.',
        what_it_feels_like:
            'A person may feel intense cravings, use more than planned, and keep using despite harm to the heart, mood, finances, or relationships. Lows after use can be sharp, fuelling more use.',
        how_it_differs:
            'Unlike disorders due to other stimulants, the substance is cocaine. Unlike occasional use, these patterns cause harm or show dependence such as strong cravings and difficulty stopping.',
        when_more_than_everyday:
            'When cocaine use harms health or daily life, is hard to control, or shows signs of dependence. Support can help.',
        provenance: 'ICD-11 6C45 / DSM-5-TR Stimulant Use Disorder (cocaine)',
    },
    {
        slug: 'disorders-due-to-use-of-stimulants-including-amphetamines',
        name: 'Disorders due to use of stimulants including amphetamines, methamphetamine or methcathinone',
        icd11_code: '6C46',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'Problems caused by using stimulant drugs such as amphetamines or methamphetamine, from harmful use to dependence, where the drug takes priority over other parts of life.',
        what_it_feels_like:
            'A person may feel wired and sleepless during use, then crash afterward, with strong cravings to use again. Over time, mood, thinking, physical health, and relationships can suffer.',
        how_it_differs:
            'Unlike cocaine, these stimulants tend to act for longer. Unlike occasional use, these patterns cause harm or show dependence such as cravings, tolerance, and difficulty stopping.',
        when_more_than_everyday:
            'When stimulant use harms health or daily life, is hard to control, or shows signs of dependence. Support can help.',
        provenance: 'ICD-11 6C46 / DSM-5-TR Stimulant Use Disorder',
    },
    {
        slug: 'disorders-due-to-use-of-synthetic-cathinones',
        name: 'Disorders due to use of synthetic cathinones',
        icd11_code: '6C47',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'Problems caused by using lab-made stimulant chemicals (sometimes sold as "bath salts"), from harmful use to dependence, often with unpredictable effects.',
        what_it_feels_like:
            'A person may use these substances despite intense, sometimes frightening effects on mood and the body, find them hard to stop, and keep using as health and daily life suffer.',
        how_it_differs:
            'Unlike amphetamine-type stimulants, these are newer synthetic chemicals with less predictable strength and effects. Unlike occasional use, these patterns cause harm or show dependence.',
        when_more_than_everyday:
            'When use of synthetic cathinones harms health or daily life, is hard to control, or shows signs of dependence. These substances carry serious risks.',
        provenance: 'ICD-11 6C47 / Disorders due to use of synthetic cathinones',
    },
    {
        slug: 'disorders-due-to-use-of-caffeine',
        name: 'Disorders due to use of caffeine',
        icd11_code: '6C48',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'Problems linked to heavy caffeine use, such as harmful effects on health or sleep, and withdrawal symptoms when cutting down.',
        what_it_feels_like:
            'A person may rely on large amounts of caffeine, feel jittery, anxious, or unable to sleep, and get headaches, tiredness, or irritability when they cut back. Stopping can feel harder than expected.',
        how_it_differs:
            'Unlike stronger stimulants, caffeine is widely used and legal, and problems centre on heavy use and withdrawal. Unlike ordinary daily coffee, this involves harm to health or sleep or a difficult withdrawal.',
        when_more_than_everyday:
            'When caffeine use clearly harms sleep, mood, or health, or withdrawal symptoms make cutting down hard, beyond ordinary daily use.',
        provenance: 'ICD-11 6C48 / DSM-5-TR Caffeine-related disorders',
    },
    {
        slug: 'disorders-due-to-use-of-hallucinogens',
        name: 'Disorders due to use of hallucinogens',
        icd11_code: '6C49',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'Problems caused by using hallucinogenic drugs such as LSD or psilocybin, from harmful use to dependence, including distressing or lasting effects on perception.',
        what_it_feels_like:
            'A person may keep using despite frightening experiences, changes in perception, or distress, and at times have perception changes that linger after the drug wears off.',
        how_it_differs:
            'Unlike stimulants or opioids, these drugs mainly alter perception and thought. Unlike a single experience, these patterns cause harm or show dependence over time.',
        when_more_than_everyday:
            'When hallucinogen use harms daily life, is hard to control, or leads to distressing or lasting effects on perception. Support can help.',
        provenance: 'ICD-11 6C49 / DSM-5-TR Hallucinogen Use Disorder',
    },
    {
        slug: 'disorders-due-to-use-of-nicotine',
        name: 'Disorders due to use of nicotine',
        icd11_code: '6C4A',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'Problems caused by using nicotine, most often through smoking or vaping, from harmful use to dependence, with cravings and withdrawal when stopping.',
        what_it_feels_like:
            'A person may feel a strong pull to smoke or vape, find quitting hard despite wanting to, and feel irritable, restless, or low when going without. Use often continues despite known health harms.',
        how_it_differs:
            'Unlike disorders due to other substances, the substance is nicotine. Unlike occasional use, these patterns show dependence such as cravings, tolerance, and withdrawal.',
        when_more_than_everyday:
            'When nicotine use is hard to control, continues despite harm, or brings cravings and withdrawal that make quitting difficult. Support and treatments are effective.',
        provenance: 'ICD-11 6C4A / DSM-5-TR Tobacco Use Disorder',
    },
    {
        slug: 'disorders-due-to-use-of-volatile-inhalants',
        name: 'Disorders due to use of volatile inhalants',
        icd11_code: '6C4B',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'Problems caused by breathing in fumes from products such as solvents, glues, or aerosols to get high, from harmful use to dependence.',
        what_it_feels_like:
            'A person may inhale fumes for a brief high despite serious risks to the brain, heart, and other organs, find the habit hard to stop, and keep using as health and daily life suffer.',
        how_it_differs:
            'Unlike most other substances, these are everyday products not meant to be inhaled, and even occasional use can be very dangerous. Unlike one-off experimentation, these patterns cause harm or show dependence.',
        when_more_than_everyday:
            'When inhalant use harms health or daily life, is hard to control, or shows dependence. These substances carry serious, sometimes sudden, risks.',
        provenance: 'ICD-11 6C4B / DSM-5-TR Inhalant Use Disorder',
    },
    {
        slug: 'disorders-due-to-use-of-mdma-or-related-drugs',
        name: 'Disorders due to use of MDMA or related drugs, including MDA',
        icd11_code: '6C4C',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'Problems caused by using MDMA (ecstasy) or related drugs, from harmful use to dependence, including effects on mood and the body.',
        what_it_feels_like:
            'A person may use these drugs despite low mood, anxiety, or fatigue in the days after, find use hard to control, and keep going as health, mood, or daily life suffer.',
        how_it_differs:
            'Unlike pure stimulants or hallucinogens, these drugs combine stimulant and perception-altering effects. Unlike occasional use, these patterns cause harm or show dependence.',
        when_more_than_everyday:
            'When use of MDMA or related drugs harms daily life, is hard to control, or shows signs of dependence. Support can help.',
        provenance: 'ICD-11 6C4C / Disorders due to use of MDMA or related drugs',
    },
    {
        slug: 'disorders-due-to-use-of-dissociative-drugs',
        name: 'Disorders due to use of dissociative drugs including ketamine and PCP',
        icd11_code: '6C4D',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'Problems caused by using dissociative drugs such as ketamine or PCP, from harmful use to dependence, including detachment from reality and physical harm.',
        what_it_feels_like:
            'A person may use these drugs despite feeling cut off from their body or surroundings, find use hard to stop, and keep going as health — including bladder or memory problems — and daily life suffer.',
        how_it_differs:
            'Unlike hallucinogens, these drugs mainly cause a sense of detachment rather than vivid visions. Unlike occasional use, these patterns cause harm or show dependence.',
        when_more_than_everyday:
            'When use of dissociative drugs harms health or daily life, is hard to control, or shows signs of dependence. Support can help.',
        provenance: 'ICD-11 6C4D / Disorders due to use of dissociative drugs',
    },
    {
        slug: 'disorders-due-to-use-of-other-specified-psychoactive-substances',
        name: 'Disorders due to use of other specified psychoactive substances, including medications',
        icd11_code: '6C4E',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'Problems caused by using a named psychoactive substance or medication not covered by the other classes, from harmful use to dependence.',
        what_it_feels_like:
            'A person may use a particular substance or medicine in a way that harms health or daily life, find it hard to cut down, and keep using despite the consequences.',
        how_it_differs:
            'Unlike the specific substance classes, this covers other identified substances and medicines. Unlike short-term appropriate use, these patterns cause harm or show dependence.',
        when_more_than_everyday:
            'When use of the substance harms health or daily life, is hard to control, or shows signs of dependence. Support can help.',
        provenance: 'ICD-11 6C4E / Other specified psychoactive substance use disorders',
    },
    {
        slug: 'disorders-due-to-use-of-multiple-specified-psychoactive-substances',
        name: 'Disorders due to use of multiple specified psychoactive substances',
        icd11_code: '6C4F',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'Problems caused by using several psychoactive substances together, from harmful use to dependence, where more than one substance plays a role.',
        what_it_feels_like:
            'A person may use a mix of substances, find the combined use hard to control, and keep going despite harm. Using several at once can raise the risks of each.',
        how_it_differs:
            'Unlike single-substance disorders, more than one identified substance is involved. Unlike occasional mixed use, these patterns cause harm or show dependence.',
        when_more_than_everyday:
            'When using several substances harms health or daily life, is hard to control, or shows signs of dependence. Support can help.',
        provenance: 'ICD-11 6C4F / Disorders due to use of multiple specified psychoactive substances',
    },
    {
        slug: 'disorders-due-to-use-of-unknown-or-unspecified-psychoactive-substances',
        name: 'Disorders due to use of unknown or unspecified psychoactive substances',
        icd11_code: '6C4G',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'Problems clearly caused by a psychoactive substance whose identity is unknown or not specified, from harmful use to dependence.',
        what_it_feels_like:
            'A person may show clear signs of a substance problem — cravings, harm, or withdrawal — when exactly which substance is involved is not known.',
        how_it_differs:
            'Unlike the named classes, the substance here is unidentified. Unlike a clearly identified substance disorder, the picture is recognised but the substance is not specified.',
        when_more_than_everyday:
            'When signs of a substance problem harm health or daily life even though the substance is unknown. Support can help.',
        provenance: 'ICD-11 6C4G / Unknown or unspecified psychoactive substance use disorders',
    },

    // --- Addictive behaviours -----------------------------------------------
    {
        slug: 'gambling-disorder',
        name: 'Gambling disorder',
        icd11_code: '6C50',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'A pattern of gambling that a person finds hard to control and that takes priority over other interests and responsibilities despite the harm it causes.',
        what_it_feels_like:
            'A person may gamble more and more to feel the same excitement, chase losses, hide how much they gamble, and keep going despite debt, strained relationships, or low mood. Stopping feels very hard.',
        how_it_differs:
            'Unlike substance-use disorders, no substance is involved — the behaviour itself becomes hard to control. Unlike casual betting, gambling here causes real harm and continues despite it.',
        when_more_than_everyday:
            'When gambling is hard to control, takes priority over daily life, and continues despite harm to finances, relationships, or wellbeing. Support can help.',
        provenance: 'ICD-11 6C50 / DSM-5-TR Gambling Disorder',
    },
    {
        slug: 'gaming-disorder',
        name: 'Gaming disorder',
        icd11_code: '6C51',
        icd11_grouping: SUBSTANCE_GROUP,
        short_definition:
            'A pattern of digital or video gaming that a person finds hard to control and that takes priority over other interests and daily life despite the harm it causes.',
        what_it_feels_like:
            'A person may game for longer and longer, struggle to stop, put gaming ahead of sleep, school, work, or relationships, and keep going even as these areas suffer.',
        how_it_differs:
            'Unlike enjoying games as a hobby, here gaming is hard to control and crowds out other parts of life. Unlike gambling disorder, money and betting are not the central feature.',
        when_more_than_everyday:
            'When gaming is hard to control, takes priority over daily life, and continues despite clear harm — usually over at least a year. Support can help.',
        provenance: 'ICD-11 6C51 / Gaming Disorder',
    },
];
