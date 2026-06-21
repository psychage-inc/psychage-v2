/**
 * Deep content — Secondary mental or behavioural syndromes (ICD-11 6E60–6E69).
 *
 * These are mental-health syndromes (psychotic, mood, anxiety, OCD-like, dissociative, impulse
 * control, neurocognitive, personality change, catatonia, neurodevelopmental) that are DIRECTLY
 * CAUSED BY another medical or neurological condition, or by a substance/medication. The unifying
 * message: find and treat the underlying cause AND manage the symptoms. Plain-language,
 * non-diagnostic, no dosing. ICD-11 framed.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

/** Shared "treat the cause" + "when to get help" closers, lightly customised. */
const treatCause = (symptomsPhrase: string) => ({
    heading: 'Treatment — start with the cause',
    body: `The most important step is identifying and treating the underlying medical, neurological, or substance-related cause, which can often improve or resolve ${symptomsPhrase}. Alongside this, the symptoms are managed in their own right — with appropriate psychological support, and sometimes medication, chosen carefully because of the underlying condition — and the person is kept safe and supported. Care is usually shared between the relevant medical specialists and mental health professionals.`,
});

const whenToGetHelp = {
    heading: 'When to get help',
    body: 'Seek medical assessment when mental-health symptoms appear or change alongside a physical illness, a new medication, substance use, or neurological symptoms — because an underlying, treatable cause may be found. Seek urgent help for sudden or severe changes (such as confusion, psychosis, or a marked personality change), and emergency help if there is any risk to the person’s safety or thoughts of suicide or self-harm.',
};

export const secondaryDeep: ConditionDeepMap = {
    'secondary-neurodevelopmental-syndrome': {
        short_definition:
            'Developmental difficulties with thinking, learning, language, or behaviour that are directly caused by another medical condition — such as a genetic or chromosomal disorder, an exposure or injury affecting brain development, an infection, or a metabolic condition — rather than arising on their own. Recognising the underlying cause guides treatment and support.',
        what_it_feels_like:
            'A child may show developmental delays or difficulties (in learning, language, attention, or behaviour) that are part of, or explained by, an identified medical condition. Families often experience these alongside the wider effects of that condition. Understanding the cause helps make sense of the difficulties and access the right support.',
        how_it_differs:
            'Unlike the primary neurodevelopmental disorders (which arise without a single identified medical cause), this syndrome is directly attributable to another diagnosed condition. The features may look similar, but the presence of an identifiable underlying cause is what defines it and shapes care.',
        when_more_than_everyday:
            'It is worth assessment when developmental difficulties occur alongside, or as part of, a known or suspected medical condition (genetic, metabolic, infectious, or following a brain insult). Identifying the cause opens up specific treatment and tailored developmental support.',
        sections: [
            { heading: 'What it is', body: 'A neurodevelopmental syndrome — affecting cognition, language, learning, attention, or behaviour — that is a direct consequence of another medical condition affecting brain development or function. The developmental picture is understood as part of that underlying condition.' },
            { heading: 'Common underlying causes', body: 'These can include genetic and chromosomal conditions, exposures during pregnancy (such as alcohol or certain infections), problems around birth, early brain injury or infection, and metabolic or other medical disorders. Identifying the cause often involves paediatric, genetic, and neurological assessment.' },
            { heading: 'Signs and features', body: 'Features mirror neurodevelopmental difficulties generally — delays or differences in learning, language, motor skills, attention, or behaviour — but occur in the context of, and are explained by, the underlying condition, often alongside its other effects.' },
            { heading: 'How it’s recognised', body: 'A clinician links the developmental difficulties to an identified underlying medical condition, through developmental assessment and investigations specific to the suspected cause. In ICD-11 it is coded 6E60.' },
            treatCause('the developmental difficulties or their impact'),
            { heading: 'Support and living well', body: 'Support combines treatment of the underlying condition with developmental help — early intervention, individualised education, and speech, occupational, or other therapies — tailored to the child’s strengths and needs. Family support and coordination across services matter.' },
            whenToGetHelp,
        ],
        sources: [WHO_ICD11],
    },

    'secondary-psychotic-syndrome': {
        short_definition:
            'Psychotic symptoms — such as hallucinations or delusions — that are directly caused by another medical or neurological condition, or by a substance or medication, rather than by a primary psychotic disorder like schizophrenia. Because there is an identifiable, often treatable cause, finding and treating it is central, and symptoms frequently improve when it is addressed.',
        what_it_feels_like:
            'A person may experience hallucinations, strongly held false beliefs, or disorganised thinking that arise in the context of a physical illness, a medication, or substance use. The experiences are as real and distressing as in any psychosis, but here they are a symptom of an underlying cause that can often be treated.',
        how_it_differs:
            'Unlike a primary psychotic disorder, these symptoms are directly attributable to another condition (such as a brain disorder, infection, hormonal problem, or substance/medication). Identifying that cause is what distinguishes it — and often what resolves it. New psychosis, especially with physical or neurological symptoms, always prompts a search for a medical cause.',
        when_more_than_everyday:
            'New psychotic symptoms always need prompt assessment, and especially so when they appear alongside a physical illness, a new medication, substance use, or neurological signs — because a treatable underlying cause may be found. Treat psychosis with any risk of harm as an emergency.',
        sections: [
            { heading: 'What it is', body: 'A psychotic syndrome (hallucinations, delusions, or disorganised thinking) that is a direct physiological consequence of another medical or neurological condition, or of a substance or medication — not a primary psychotic illness.' },
            { heading: 'Common underlying causes', body: 'Causes can include neurological conditions (such as epilepsy, brain injury, tumours, or autoimmune brain inflammation), infections, hormonal and metabolic problems, and a range of substances and medications (including intoxication or withdrawal). A careful medical work-up looks for these.' },
            { heading: 'Signs and features', body: 'The symptoms resemble psychosis generally, but typically arise in close relation to the underlying condition — for example, appearing with a new illness or medication, fluctuating with it, or accompanied by physical or neurological signs.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies the psychotic symptoms and links them to an underlying cause through history, examination, and investigations (such as blood tests, brain imaging, or specialist tests). In ICD-11 it is coded 6E61. Excluding and treating medical causes is a priority.' },
            treatCause('the psychotic symptoms'),
            { heading: 'Safety and support', body: 'During an episode, keeping the person safe and calm matters, alongside urgent treatment of the cause. Psychological support and, where needed, short-term medication for the psychosis help while the underlying condition is addressed.' },
            whenToGetHelp,
        ],
        sources: [WHO_ICD11],
    },

    'secondary-mood-syndrome': {
        short_definition:
            'Significant mood symptoms — depression, elevated mood (mania), or both — that are directly caused by another medical condition, or by a substance or medication, rather than by a primary mood disorder. Because there is an identifiable cause, recognising and treating it is central, and the mood symptoms often improve when it is addressed.',
        what_it_feels_like:
            'A person may feel persistently low, or unusually high and energised, in a way that is out of character and arises alongside a physical illness, a medication, or substance use. The mood change is genuine and impairing, but here it is a symptom of an underlying cause that can often be treated.',
        how_it_differs:
            'Unlike a primary mood disorder, these mood symptoms are directly attributable to another condition (such as a thyroid problem, stroke, hormonal disorder, or certain medications or substances). The presence of an identifiable medical cause is what defines it and guides treatment.',
        when_more_than_everyday:
            'It is worth assessment when significant low or high mood appears alongside a physical illness, a new medication, or substance use — because a treatable cause may be found. Treat any thoughts of suicide or self-harm as urgent.',
        sections: [
            { heading: 'What it is', body: 'A mood syndrome (depressive, manic, or mixed) that is a direct physiological consequence of another medical condition or a substance/medication — not a primary mood disorder.' },
            { heading: 'Common underlying causes', body: 'Causes can include hormonal conditions (such as thyroid or adrenal disorders), neurological conditions (such as stroke or Parkinson’s disease), other physical illnesses, and many medications and substances (including their use or withdrawal). A medical review looks for these.' },
            { heading: 'Signs and features', body: 'The symptoms resemble depression or mania generally, but arise in relation to the underlying condition — for example, appearing or changing with the illness or a medication. Physical symptoms of the underlying cause are often present.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies the mood symptoms and links them to an underlying cause through history, examination, and investigations (such as blood tests). In ICD-11 it is coded 6E62. Identifying and treating the cause is central.' },
            treatCause('the mood symptoms'),
            { heading: 'Support and safety', body: 'Alongside treating the cause, the mood symptoms are supported in their own right — with psychological support and, where appropriate, carefully chosen medication — and any risk (such as suicidal thoughts) is assessed and managed.' },
            whenToGetHelp,
        ],
        sources: [WHO_ICD11],
    },

    'secondary-anxiety-syndrome': {
        short_definition:
            'Significant anxiety symptoms — such as excessive worry, panic, or physical tension — that are directly caused by another medical condition, or by a substance or medication, rather than by a primary anxiety disorder. Recognising and treating the underlying cause is central, and the anxiety often eases when it is addressed.',
        what_it_feels_like:
            'A person may feel anxious, panicky, or physically on edge in a way that arises alongside a physical illness, a stimulant or medication, or substance withdrawal. The anxiety is real and distressing, but here it is a symptom of an identifiable, often treatable cause.',
        how_it_differs:
            'Unlike a primary anxiety disorder, these symptoms are directly attributable to another condition (such as an overactive thyroid, a heart or lung problem, too much caffeine, or certain medications or withdrawal states). The identifiable medical cause defines it and guides treatment.',
        when_more_than_everyday:
            'It is worth assessment when notable anxiety appears alongside a physical illness, a new medication or stimulant, or substance withdrawal — because a treatable cause may be found. Seek prompt care for severe symptoms such as chest pain or breathlessness.',
        sections: [
            { heading: 'What it is', body: 'An anxiety syndrome (worry, panic, restlessness, physical tension) that is a direct physiological consequence of another medical condition or a substance/medication — not a primary anxiety disorder.' },
            { heading: 'Common underlying causes', body: 'Causes can include an overactive thyroid, heart and lung conditions, hormonal and metabolic problems, neurological conditions, excessive caffeine or stimulants, certain medications, and withdrawal from alcohol or other substances. A medical review looks for these.' },
            { heading: 'Signs and features', body: 'The symptoms resemble anxiety generally — worry, panic, a racing heart, restlessness — but arise in relation to the underlying condition, often with its physical signs, and may improve when it is treated.' },
            { heading: 'How it’s recognised', body: 'A clinician links the anxiety to an underlying cause through history, examination, and investigations (such as blood tests or heart tests). In ICD-11 it is coded 6E63. Identifying and treating the cause is the priority.' },
            treatCause('the anxiety symptoms'),
            { heading: 'Support', body: 'Alongside treating the cause, anxiety is supported with reassurance, psychological techniques, and, where appropriate, carefully chosen medication, while reducing contributors such as excess caffeine.' },
            whenToGetHelp,
        ],
        sources: [WHO_ICD11],
    },

    'secondary-obsessive-compulsive-or-related-syndrome': {
        short_definition:
            'Obsessive-compulsive or related symptoms — such as intrusive thoughts and repetitive behaviours, or body-focused or appearance-related preoccupations — that are directly caused by another medical or neurological condition, rather than by a primary obsessive-compulsive or related disorder. Recognising and treating the underlying cause is central.',
        what_it_feels_like:
            'A person may develop obsessions and compulsions, or related repetitive behaviours, in the context of a neurological or other medical condition. The symptoms can be as distressing as in primary OCD, but here they are a feature of an identifiable underlying cause.',
        how_it_differs:
            'Unlike primary OCD and related disorders, these symptoms are directly attributable to another condition (such as a neurological disorder affecting specific brain circuits, an infection-related process, or a brain injury). The identifiable cause defines it, and may change treatment.',
        when_more_than_everyday:
            'It is worth assessment when obsessive-compulsive or related symptoms appear or change alongside a neurological or other medical condition, an infection, or a brain insult — because an underlying cause may be found and treated.',
        sections: [
            { heading: 'What it is', body: 'An obsessive-compulsive or related syndrome (intrusive thoughts and compulsions, or related repetitive or preoccupation-based behaviours) that is a direct consequence of another medical or neurological condition — not a primary disorder.' },
            { heading: 'Common underlying causes', body: 'Causes can include neurological conditions affecting brain circuits involved in habit and control, brain injury, certain infections or autoimmune processes, and some other medical conditions. Assessment often involves neurological input.' },
            { heading: 'Signs and features', body: 'The symptoms resemble OCD or related disorders, but arise in relation to the underlying condition — for example, beginning after a neurological event — often alongside its other features.' },
            { heading: 'How it’s recognised', body: 'A clinician links the symptoms to an underlying cause through history, examination, and investigations. In ICD-11 it is coded 6E64. Treating the underlying condition is central.' },
            treatCause('the obsessive-compulsive or related symptoms'),
            { heading: 'Support', body: 'Alongside treating the cause, the symptoms are managed in their own right — psychological approaches used for OCD (such as exposure-based therapy) and, where appropriate, medication can help.' },
            whenToGetHelp,
        ],
        sources: [WHO_ICD11],
    },

    'secondary-dissociative-syndrome': {
        short_definition:
            'Dissociative symptoms — such as a sense of detachment, memory gaps, or other disruptions of awareness or identity — that are directly caused by another medical or neurological condition, rather than by a primary dissociative disorder. Recognising and treating the underlying cause is central.',
        what_it_feels_like:
            'A person may experience detachment from themselves or their surroundings, memory disturbances, or other dissociative experiences arising in the context of a neurological or other medical condition (such as epilepsy or a brain injury). The experiences are genuine, and here they point to an underlying cause to be assessed.',
        how_it_differs:
            'Unlike primary dissociative disorders (often linked to psychological trauma), these symptoms are directly attributable to another medical or neurological condition. Distinguishing the two matters, because a medical cause needs its own assessment and treatment.',
        when_more_than_everyday:
            'It is worth prompt assessment when dissociative experiences arise alongside neurological symptoms, seizures, a head injury, or another medical condition — because an underlying cause may be found and treated. Seek urgent care for new neurological symptoms.',
        sections: [
            { heading: 'What it is', body: 'A dissociative syndrome (detachment, memory or awareness disturbances, or other dissociative features) that is a direct consequence of another medical or neurological condition — not a primary dissociative disorder.' },
            { heading: 'Common underlying causes', body: 'Causes can include neurological conditions such as epilepsy, brain injury, and other brain disorders, as well as some other medical conditions. A neurological and medical assessment helps identify them.' },
            { heading: 'Signs and features', body: 'The symptoms resemble dissociation generally, but arise in relation to the underlying condition, often with neurological or other physical features, and may fluctuate with it.' },
            { heading: 'How it’s recognised', body: 'A clinician links the dissociative symptoms to an underlying cause through history, examination, and investigations (such as brain imaging or seizure tests). In ICD-11 it is coded 6E65. Identifying and treating the cause is central.' },
            treatCause('the dissociative symptoms'),
            { heading: 'Support', body: 'Alongside treating the cause, grounding techniques and psychological support help the person manage dissociative experiences and stay connected to the present.' },
            whenToGetHelp,
        ],
        sources: [WHO_ICD11],
    },

    'secondary-impulse-control-syndrome': {
        short_definition:
            'Difficulties with impulse control — such as trouble resisting urges, or new compulsive or disinhibited behaviours — that are directly caused by another medical or neurological condition, or by a medication, rather than by a primary impulse control disorder. Recognising the cause (which can include certain medications) is central, because adjusting it can resolve the behaviour.',
        what_it_feels_like:
            'A person may develop new difficulties controlling urges or behaviours — for example, increased impulsivity, gambling, or other compulsive behaviours — in the context of a brain condition or after starting certain medications. The change is often out of character, and identifying the cause is key.',
        how_it_differs:
            'Unlike primary impulse control disorders, these behaviours are directly attributable to another condition (such as a brain disorder affecting impulse-regulating areas) or to a medication (notably some used in Parkinson’s disease). Recognising a medication cause matters, because adjusting it under medical guidance can resolve the problem.',
        when_more_than_everyday:
            'It is worth prompt assessment when new impulse-control difficulties or compulsive behaviours appear alongside a brain condition or after starting a new medication — because the cause, including a medication, may be identifiable and reversible. Do not stop prescribed medication abruptly; seek medical advice.',
        sections: [
            { heading: 'What it is', body: 'An impulse control syndrome (difficulty resisting urges, or new compulsive or disinhibited behaviours) that is a direct consequence of another medical or neurological condition, or of a medication — not a primary impulse control disorder.' },
            { heading: 'Common underlying causes', body: 'Causes can include neurological conditions affecting the brain’s impulse-regulating regions (such as frontal-lobe injury or some forms of dementia), and certain medications — notably some dopamine-related medicines used in Parkinson’s disease, which can cause new compulsive behaviours. A medication review is important.' },
            { heading: 'Signs and features', body: 'New or out-of-character impulsivity or compulsive behaviours (which can include gambling, spending, or other urges) arising in relation to the underlying condition or a medication. Recognising the link is the key step.' },
            { heading: 'How it’s recognised', body: 'A clinician links the behaviour to an underlying cause — reviewing medications and assessing for neurological conditions. In ICD-11 it is coded 6E66. Identifying a reversible cause, such as a medication, is a priority.' },
            treatCause('the impulse-control symptoms (for example, by carefully adjusting a responsible medication under specialist guidance)'),
            { heading: 'Support and safety', body: 'Alongside addressing the cause, practical measures (such as limiting access to gambling or spending) and psychological support help reduce harm while the underlying issue is treated.' },
            whenToGetHelp,
        ],
        sources: [WHO_ICD11],
    },

    'secondary-neurocognitive-syndrome': {
        short_definition:
            'Problems with thinking — such as memory, attention, or other cognitive functions — that are directly caused by another medical condition, substance, or medication, and that do not fit the specific patterns of delirium, dementia, or amnestic disorder. Identifying and treating the underlying cause is central, and the difficulties often improve when it is addressed.',
        what_it_feels_like:
            'A person may notice problems with memory, concentration, or thinking that arise in the context of a physical illness, a medication, or substance use, without the sudden fluctuation of delirium or the progressive course of dementia. The difficulties are real and warrant a search for a treatable cause.',
        how_it_differs:
            'Unlike delirium (acute and fluctuating), dementia (progressive), or amnestic disorder (focused on memory), this category covers cognitive difficulties caused by another condition that do not fit those specific patterns. The identifiable cause is what defines it, and some causes are reversible.',
        when_more_than_everyday:
            'It is worth assessment when problems with thinking appear alongside a physical illness, a new medication, or substance use — because a treatable cause may be found. Seek urgent help for any sudden change in alertness or confusion (which may be delirium).',
        sections: [
            { heading: 'What it is', body: 'A neurocognitive syndrome (difficulties with memory, attention, or other thinking abilities) that is a direct consequence of another medical condition, substance, or medication, and does not fit the specific categories of delirium, dementia, or amnestic disorder.' },
            { heading: 'Common underlying causes', body: 'Causes can include a wide range of medical conditions (hormonal, metabolic, infectious, or organ-related), nutritional deficiencies, medications, and substances. Some of these are reversible, which is why a thorough medical review matters.' },
            { heading: 'Signs and features', body: 'Problems with cognition arising in relation to the underlying condition, often alongside its physical symptoms, without the specific pattern of the other neurocognitive disorders.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses the cognitive difficulties, links them to an underlying cause, and checks for reversible factors (with examination and investigations such as blood tests). In ICD-11 it is coded 6E67.' },
            treatCause('the cognitive difficulties'),
            { heading: 'Support', body: 'Alongside treating the cause, practical memory and thinking strategies, a supportive environment, and rehabilitation where needed help the person manage day to day.' },
            whenToGetHelp,
        ],
        sources: [WHO_ICD11],
    },

    'secondary-personality-change': {
        short_definition:
            'A persistent change in a person’s usual personality and behaviour — such as in their emotional control, social conduct, or motivation — that is directly caused by another medical or neurological condition affecting the brain, rather than being a lifelong personality pattern. Recognising the underlying cause is central to understanding and supporting the person.',
        what_it_feels_like:
            'Those close to the person often notice that they are "not themselves" — for example more irritable, disinhibited, apathetic, or emotionally changed — following or alongside a brain condition such as an injury, stroke, or illness. The change is real and rooted in the effect on the brain, not a choice.',
        how_it_differs:
            'Unlike a personality disorder (a long-standing pattern present since earlier life), this is an acquired change from the person’s previous personality, caused by an identifiable brain condition. The clear change from how the person used to be, linked to a medical cause, is what defines it.',
        when_more_than_everyday:
            'It is worth assessment when there is a marked, persistent change in someone’s personality or behaviour following or alongside a brain injury, stroke, tumour, infection, or other neurological or medical condition — because the cause needs identifying and the person and family need support.',
        sections: [
            { heading: 'What it is', body: 'A persistent change in personality and behaviour — for example in emotional regulation, impulse control, social conduct, or motivation — that is a direct consequence of another medical or neurological condition affecting the brain.' },
            { heading: 'Common underlying causes', body: 'Causes can include brain injury, stroke, brain tumours, infections, epilepsy, and other neurological or medical conditions, often affecting the frontal parts of the brain. Identifying the cause usually involves neurological assessment.' },
            { heading: 'Signs and features', body: 'A clear change from the person’s previous character — such as increased irritability or aggression, disinhibition, apathy, emotional instability, or impaired judgment — arising in relation to the underlying brain condition.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies the change from the person’s previous personality and links it to an underlying brain condition, through history (often from family), examination, and investigations such as brain imaging. In ICD-11 it is coded 6E68.' },
            treatCause('the personality and behavioural changes'),
            { heading: 'Support for the person and family', body: 'Support includes managing specific behaviours, rehabilitation, structure and a supportive environment, and crucially help for families adjusting to the change, who may feel they have "lost" the person they knew. Understanding the change as part of the condition helps.' },
            whenToGetHelp,
        ],
        sources: [WHO_ICD11],
    },

    'secondary-catatonia-syndrome': {
        short_definition:
            'Catatonia — a syndrome of disturbed movement, speech, and responsiveness (such as becoming still, mute, and unresponsive, holding postures, or becoming agitated) — that is directly caused by another medical condition. Like all catatonia, it is serious, can be a medical emergency, and is usually treatable, with priority on identifying and treating the underlying cause.',
        what_it_feels_like:
            'A person may suddenly become "frozen" — not moving, speaking, or responding — hold unusual postures, resist movement, or become very agitated, in the context of a physical illness. It is frightening for families and, as with all catatonia, needs urgent medical attention.',
        how_it_differs:
            'Catatonia can occur with mental disorders, with substances, or — as here — as a direct result of another medical condition. The features are the same; what defines this category is that the cause is an underlying medical illness, which must be found and treated.',
        when_more_than_everyday:
            'A sudden, marked change in movement and responsiveness — becoming unresponsive, mute, or rigid, or severely agitated — is a medical emergency. Seek urgent help to find and treat the cause; untreated catatonia can become dangerous.',
        sections: [
            { heading: 'What it is', body: 'A catatonia syndrome (stupor, mutism, posturing, rigidity, resistance to movement, repetitive or echoing behaviour, or excessive agitation) that is a direct physiological consequence of another medical condition.' },
            { heading: 'Common underlying causes', body: 'Causes can include a range of medical and neurological conditions — such as infections, autoimmune brain inflammation, metabolic disturbances, and other serious illnesses. A prompt medical work-up is needed to find the cause.' },
            { heading: 'Signs and symptoms', body: 'The features are those of catatonia generally — little movement or response, not speaking, holding fixed or unusual postures, waxy resistance to movement, or, conversely, agitated, purposeless activity — here arising from an underlying medical condition.' },
            { heading: 'Why prompt care matters', body: 'As with all catatonia, untreated it can lead to serious complications from not eating, drinking, or moving, and a severe form with fever and unstable vital signs is a medical emergency. Prompt recognition and treatment usually lead to good recovery.' },
            { heading: 'How it’s recognised', body: 'Doctors recognise the catatonia and urgently investigate the underlying medical cause. In ICD-11 it is coded 6E69. Treating the cause, alongside specific catatonia treatment, is central.' },
            treatCause('the catatonia (alongside specific catatonia treatments, which are often rapidly effective)'),
            whenToGetHelp,
        ],
        sources: [WHO_ICD11],
    },
};
