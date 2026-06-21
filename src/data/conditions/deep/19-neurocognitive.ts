/**
 * Deep content — Neurocognitive disorders (ICD-11 6D70–6D85).
 *
 * Delirium, mild neurocognitive disorder, amnestic disorder, and the dementias. The copy is
 * compassionate and carer-focused, stresses that delirium is often reversible and a medical
 * urgency (not dementia), supports living well with dementia, and signposts early assessment.
 * Plain-language, non-diagnostic, no dosing. ICD-11 / DSM-5-TR framed.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

const NHS_ALZ = { label: 'NHS — Alzheimer’s disease', url: 'https://www.nhs.uk/conditions/alzheimers-disease/' };
const NHS_VASC = { label: 'NHS — Vascular dementia', url: 'https://www.nhs.uk/conditions/vascular-dementia/' };
const NHS_DLB = { label: 'NHS — Dementia with Lewy bodies', url: 'https://www.nhs.uk/conditions/dementia-with-lewy-bodies/' };
const NHS_FTD = { label: 'NHS — Frontotemporal dementia', url: 'https://www.nhs.uk/conditions/frontotemporal-dementia/' };

/** Shared carer section, lightly customised. */
const carerSection = {
    heading: 'For family and carers',
    body: 'Caring for someone with this condition can be rewarding and demanding. Keep communication calm, simple, and patient; maintain routine and a safe, familiar environment; focus on the person’s remaining strengths and dignity; and plan ahead together where possible (including wishes for future care). Use available support — memory services, social care, carer support, and respite — and look after your own health, as carer wellbeing matters too.',
};

export const neurocognitiveDeep: ConditionDeepMap = {
    'delirium': {
        short_definition:
            'A sudden, usually short-lived state of acute confusion in which a person’s awareness, attention, and thinking become disturbed, often fluctuating through the day, caused by an underlying medical problem — such as an infection, dehydration, medication, or after surgery. It is common in older or unwell people, is a medical urgency, and is often reversible when the cause is found and treated. It is NOT the same as dementia.',
        what_it_feels_like:
            'A person may suddenly become confused, disorientated, drowsy or agitated, struggle to follow conversations, and sometimes see or believe things that are not real. The state often comes and goes, frequently worse at night. It is frightening and bewildering for the person and alarming for those around them — but it usually has a treatable cause.',
        how_it_differs:
            'Unlike dementia (which develops gradually over months or years), delirium comes on quickly — over hours or days — and fluctuates, with disturbed attention and awareness. It is caused by an acute medical problem and is often reversible. Delirium can occur in someone who also has dementia, which makes prompt recognition important.',
        when_more_than_everyday:
            'A sudden change in someone’s confusion, alertness, attention, or behaviour — especially in an older or unwell person — should be treated as a medical urgency. Seek prompt medical help to find and treat the cause; do not assume it is "just confusion" or dementia.',
        sections: [
            { heading: 'Signs and symptoms', body: 'Delirium develops suddenly and tends to fluctuate. Features include disturbed attention (hard to focus or follow conversation), reduced awareness of surroundings, disorientation (in time or place), and changes in thinking, memory, and perception — sometimes with hallucinations or false beliefs. People may be agitated and restless ("hyperactive") or quiet, drowsy, and withdrawn ("hypoactive" — easily missed). Sleep is often disturbed.' },
            { heading: 'Common causes', body: 'Delirium is the brain’s response to an acute physical problem. Common causes include infections (such as urine or chest infections), dehydration, constipation, pain, medication (including changes or withdrawal), alcohol withdrawal, low oxygen, problems with body salts, and the period after surgery. Often more than one factor is involved, especially in frail or older people.' },
            { heading: 'Who it affects', body: 'Delirium is very common, particularly in older people, those with existing dementia, and people who are seriously unwell or in hospital. It is often under-recognised, especially the quiet form. It can affect anyone of any age during severe illness.' },
            { heading: 'How it’s recognised', body: 'Doctors recognise delirium from the sudden, fluctuating change in attention and awareness, and then search for the underlying cause with examinations and tests. In ICD-11 it is coded 6D70. A clear account from family of how quickly the change came on, and what the person is normally like, is extremely valuable.' },
            { heading: 'Treatment and recovery', body: 'Treatment means finding and treating the underlying cause (for example, an infection), alongside supportive care: ensuring hydration and nutrition, managing pain, reviewing medications, and providing a calm, familiar environment with good lighting, glasses and hearing aids, and reassurance. Most people recover as the cause is treated, though in frail or older people it can take time and recovery may be incomplete.' },
            { heading: 'Helping someone with delirium', body: 'A calm, familiar presence helps: speak slowly and simply, reorient the person gently, ensure they have their glasses and hearing aids, encourage drinking and eating, support good sleep, and reduce noise and disruption. Familiar faces and objects are reassuring. Avoid arguing with confused beliefs; focus on safety and comfort.' },
            { heading: 'When to get help', body: 'Treat a sudden onset of confusion or a change in alertness as a medical urgency — seek prompt medical assessment to find the cause. Recognising delirium early, and not mistaking it for dementia, leads to better recovery.' },
        ],
        sources: [WHO_ICD11],
    },

    'mild-neurocognitive-disorder': {
        short_definition:
            'A condition in which a person has a measurable decline in one or more areas of thinking — such as memory, attention, or planning — that is greater than expected for their age, but not severe enough to stop them managing day-to-day life independently. It may stay stable, improve (if there is a treatable cause), or, in some people, progress toward dementia, so assessment and follow-up are worthwhile.',
        what_it_feels_like:
            'A person (or those close to them) may notice they are more forgetful, lose their thread, or find planning and concentration harder than before — enough to be frustrating or worrying, but they can still manage their usual activities, perhaps with more effort or strategies. The uncertainty about what it means can be unsettling.',
        how_it_differs:
            'Unlike normal age-related slowing, the decline is measurable and greater than expected. Unlike dementia, it does not (yet) significantly impair the ability to live independently. It is a recognised stage that may have many causes — some reversible — and does not always progress to dementia.',
        when_more_than_everyday:
            'It is worth seeking assessment when changes in memory or thinking are noticeable, persistent, and more than you would expect for your age — especially if they are getting worse. Assessment can identify treatable causes and provide a baseline to monitor over time.',
        sections: [
            { heading: 'Signs and features', body: 'There is a noticeable, measurable decline in one or more cognitive areas — commonly memory, but also attention, language, planning, or processing speed — that represents a change from the person’s previous level. Crucially, the person can still carry out everyday activities independently, perhaps using more effort or aids. The changes are confirmed by the person, someone who knows them, or testing.' },
            { heading: 'Possible causes', body: 'Mild cognitive changes have many causes. Some are treatable or reversible — depression, anxiety, poor sleep, thyroid or vitamin problems, medication side effects, alcohol, or other physical illness. In others, it reflects early changes of a condition that may progress, such as Alzheimer’s or another cause of dementia. Identifying the cause guides what happens next.' },
            { heading: 'What it may mean', body: 'Mild neurocognitive disorder does not always worsen. In some people it stays stable or improves, especially where there is a treatable cause; in others it progresses to dementia over time. Because the outlook varies, assessment, addressing reversible factors, and follow-up over time are valuable.' },
            { heading: 'How it’s recognised', body: 'A clinician takes a history, checks for treatable causes (with examination and blood tests), and may use cognitive testing to measure the changes and set a baseline. In ICD-11 it is coded 6D71. Information from someone who knows the person well helps build the picture.' },
            { heading: 'What helps', body: 'Treating any reversible cause is the first step. Beyond that, brain and general health measures help: staying physically, mentally, and socially active, managing blood pressure, diabetes, hearing, sleep, and mood, limiting alcohol, and using practical memory strategies and aids. These support wellbeing and may help protect cognition.' },
            { heading: 'For family and friends', body: 'Be supportive and patient, encourage assessment and healthy lifestyle steps, and help the person use reminders and routines without taking over. Avoid alarm — many people remain stable — while staying alert to changes that warrant review. Your observations over time are useful to clinicians.' },
            { heading: 'When to get help', body: 'See a GP if memory or thinking changes are noticeable, persistent, or worsening. Assessment can find and treat reversible causes and monitor for any progression, giving the best chance to act early.' },
        ],
        sources: [WHO_ICD11],
    },

    'amnestic-disorder': {
        short_definition:
            'A condition in which memory is prominently and persistently impaired — especially the ability to learn and recall new information — due to an underlying brain cause (such as injury, lack of oxygen, thiamine deficiency, stroke, or substances), while other thinking abilities are relatively preserved. It is not explained by delirium or a broader dementia, and identifying and treating the cause is central.',
        what_it_feels_like:
            'A person may struggle to form new memories — forgetting recent conversations or events — while older memories and other abilities are comparatively intact. Some people fill memory gaps without realising. It can be disorientating and distressing, and its impact depends on the cause and severity.',
        how_it_differs:
            'Unlike dementia, the impairment is focused on memory rather than a broad decline across many cognitive areas. Unlike delirium, it is persistent rather than acutely fluctuating, with preserved attention and awareness. It is tied to a specific brain cause, which must be identified.',
        when_more_than_everyday:
            'A persistent, prominent problem with forming or recalling memories — particularly after a head injury, illness, lack of oxygen, heavy alcohol use, or other brain insult — warrants prompt medical assessment to find the cause, some of which (such as thiamine deficiency) need urgent treatment.',
        sections: [
            { heading: 'Signs and features', body: 'The core feature is a marked, persistent impairment of memory — especially difficulty learning and recalling new information — out of proportion to any other cognitive changes. Attention and awareness are preserved (unlike delirium), and the impairment is not part of a broad dementia. Some people unknowingly "fill in" memory gaps.' },
            { heading: 'Causes', body: 'Amnestic disorder results from a specific brain cause, such as head injury, stroke, lack of oxygen, infection, tumours, or thiamine (vitamin B1) deficiency — notably in the context of heavy alcohol use (Wernicke–Korsakoff syndrome), which is a medical emergency requiring urgent treatment. Some substances and medications can also be involved. Finding the cause is essential.' },
            { heading: 'Who it affects', body: 'It can affect people of any age, depending on the cause — for example after a brain injury in a younger person, or with alcohol-related thiamine deficiency. It is uncommon and often comes to light after an identifiable brain insult.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses the memory impairment and its impact, distinguishes it from delirium and dementia, and investigates the underlying cause (with examination, blood tests, and sometimes brain scans). In ICD-11 it is coded 6D72. Urgent causes such as thiamine deficiency are looked for and treated quickly.' },
            { heading: 'Treatment and support', body: 'Treatment targets the underlying cause — for example, urgent thiamine replacement where deficiency is suspected, which can prevent lasting harm — alongside rehabilitation and memory strategies. Recovery depends on the cause and how quickly it is treated; some causes improve, while others leave lasting memory difficulties that can be supported with aids and structured routines.' },
            { heading: 'Living with memory difficulty', body: 'Practical aids help a great deal: notebooks, calendars, alarms, labelled environments, and consistent routines. Rehabilitation can build strategies to compensate. A supportive, structured environment and patience from those around the person make daily life more manageable.' },
            { heading: 'When to get help', body: 'Seek prompt medical assessment for a persistent, prominent memory problem, especially after a head injury, illness, or heavy alcohol use. Some causes (such as thiamine deficiency) are emergencies, so early help can prevent lasting damage.' },
        ],
        sources: [WHO_ICD11],
    },

    'dementia-due-to-alzheimer-disease': {
        short_definition:
            'The most common cause of dementia — a progressive condition in which changes in the brain gradually impair memory, thinking, language, and the ability to manage daily life. It usually begins with difficulty remembering recent events and slowly worsens over years. There is no cure, but treatments, support, and good care help people live as well as possible, often for a long time.',
        what_it_feels_like:
            'Early on, a person may forget recent conversations or events, repeat themselves, misplace things, or struggle to find words, while older memories and skills remain. Over time, more areas of thinking and daily life are affected. People may feel frightened, frustrated, or low, especially with insight in the earlier stages — emotional support matters as much as practical help.',
        how_it_differs:
            'Unlike delirium (sudden and fluctuating) or normal ageing, Alzheimer’s dementia develops gradually and progressively, typically starting with recent memory. Unlike some other dementias, prominent early features are memory and learning rather than, say, behaviour (as in frontotemporal dementia) or marked fluctuations and hallucinations (as in Lewy body dementia).',
        when_more_than_everyday:
            'It is worth seeking assessment when memory and thinking problems are persistent, worsening, and starting to affect everyday life — for the person or those close to them. Early diagnosis allows treatment, planning, and support, and rules out other, sometimes reversible, causes.',
        sections: [
            { heading: 'Signs and progression', body: 'Alzheimer’s usually begins with difficulty remembering recent events and learning new information, repeating questions, and misplacing items. As it progresses, it affects language, orientation, planning, recognition, and the ability to manage daily tasks, and later, physical functions. The pace varies between people, and the journey can span many years.' },
            { heading: 'Who it affects and causes', body: 'Alzheimer’s mainly affects people over 65, with risk rising with age, though younger-onset forms occur. It involves a build-up of abnormal proteins and loss of brain cells over time. Risk is influenced by age, genetics, and factors such as heart and blood-vessel health, with a healthy lifestyle offering some protection. It is a disease, not a normal part of ageing.' },
            { heading: 'How it’s recognised', body: 'A clinician (often via a memory service) takes a history, assesses cognition, checks for and treats other causes (including reversible ones), and may use brain scans. In ICD-11 it is coded 6D80. A diagnosis, though hard to receive, opens the door to treatment, support, and planning.' },
            { heading: 'Treatment and support', body: 'There is no cure, but treatment helps. Some medications can ease symptoms or slow decline for a time in some people; managing other health conditions, mood, sleep, and the environment helps; and increasingly, support focuses on living well — maintaining activity, relationships, and routine. Newer treatments are emerging. Good support can make a major difference to quality of life.' },
            { heading: 'Living well with dementia', body: 'Many people live meaningfully for years after diagnosis. Helpful approaches include keeping active and social, using routines, reminders, and a familiar, safe environment, staying engaged in enjoyable and purposeful activities, and planning ahead for future care and wishes while able. Support for mood and a focus on remaining strengths matter.' },
            carerSection,
            { heading: 'When to get help', body: 'See a GP for persistent, worsening memory or thinking problems affecting daily life. Early assessment can identify treatable causes, start helpful treatment and support, and allow planning. Seek urgent help for any sudden change in confusion (which may be delirium, not dementia).' },
        ],
        sources: [WHO_ICD11, NHS_ALZ],
    },

    'dementia-due-to-cerebrovascular-disease': {
        short_definition:
            'A common form of dementia caused by reduced blood flow to the brain — for example after strokes or damage to small blood vessels — leading to problems with thinking, planning, concentration, and memory. It can begin suddenly after a stroke or develop gradually, sometimes in a "stepwise" way. Managing the underlying vascular risk factors can help slow its progression.',
        what_it_feels_like:
            'A person may have problems with concentration, planning, organising, and speed of thinking, sometimes more than with memory in the early stages, along with mood changes. Difficulties may appear or worsen suddenly after a stroke, or build up gradually. Physical effects of strokes (such as weakness) may also be present.',
        how_it_differs:
            'Unlike Alzheimer’s (which usually starts with memory and progresses smoothly), vascular dementia often affects planning, attention, and speed of thinking early, and may progress in a "stepwise" pattern linked to vascular events. It is caused by problems with the brain’s blood supply, and it can coexist with Alzheimer’s ("mixed dementia").',
        when_more_than_everyday:
            'Seek assessment for persistent, worsening difficulties with thinking, planning, or memory, especially after a stroke or with vascular risk factors (high blood pressure, diabetes, smoking). Managing these risks early can help protect the brain.',
        sections: [
            { heading: 'Signs and progression', body: 'Common early features include difficulties with concentration, planning, organising, and the speed of thinking, alongside mood and memory changes. Symptoms may begin suddenly after a stroke, or develop gradually with small-vessel damage, and may progress in steps (periods of stability then sudden worsening). Physical signs from strokes can accompany it.' },
            { heading: 'Causes and risk factors', body: 'It is caused by reduced blood flow to brain tissue — from strokes, mini-strokes, or damage to small blood vessels. Risk factors are largely those for heart and vascular disease: high blood pressure, diabetes, high cholesterol, smoking, obesity, and physical inactivity. Managing these can reduce risk and slow progression.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses the pattern of cognitive difficulties, vascular history and risk factors, and usually arranges brain imaging showing vascular damage. In ICD-11 it is coded 6D81. Other causes are checked, and Alzheimer’s often coexists.' },
            { heading: 'Treatment and slowing progression', body: 'A key aim is managing vascular risk factors — blood pressure, diabetes, cholesterol, stopping smoking, activity, and diet — to protect the brain and reduce further damage. Treating mood and other conditions, rehabilitation after strokes, and support for daily living all help. Some dementia medications may help where Alzheimer’s coexists. Good vascular care can slow decline.' },
            { heading: 'Living well', body: 'As with other dementias, staying active, social, and engaged, using routines and aids, keeping a safe and familiar environment, and planning ahead all support quality of life — alongside actively managing vascular health to protect against further decline.' },
            carerSection,
            { heading: 'When to get help', body: 'See a GP for persistent thinking or memory difficulties, particularly with vascular risk factors or after a stroke. Treat stroke symptoms (sudden face, arm, or speech changes) as an emergency — call emergency services immediately. Managing vascular risks early protects the brain.' },
        ],
        sources: [WHO_ICD11, NHS_VASC],
    },

    'dementia-due-to-lewy-body-disease': {
        short_definition:
            'A common type of dementia caused by tiny protein deposits (Lewy bodies) in the brain, featuring fluctuating alertness and thinking, recurrent detailed visual hallucinations, movement problems similar to Parkinson’s disease, and disturbed sleep. Recognising it matters, partly because people with it can be very sensitive to certain medications. Support and the right care help people live as well as possible.',
        what_it_feels_like:
            'A person’s alertness and thinking may vary markedly from hour to hour or day to day, they may see things that are not there (often vivid and detailed), move more slowly or stiffly, and act out dreams during sleep. This variability can be confusing for everyone and is a characteristic feature.',
        how_it_differs:
            'Unlike Alzheimer’s (steadier, memory-led), Lewy body dementia is marked by fluctuating cognition, early and recurrent visual hallucinations, and parkinsonian movement features. Importantly, people can have severe, even dangerous, reactions to certain antipsychotic medications, so a correct diagnosis is especially important. It overlaps with Parkinson’s disease dementia.',
        when_more_than_everyday:
            'Seek assessment for fluctuating confusion or alertness, recurrent visual hallucinations, new movement problems, or acting out dreams, especially together. A correct diagnosis guides safe treatment, since some medications can be harmful in this condition.',
        sections: [
            { heading: 'Signs and features', body: 'Core features include fluctuating attention and alertness, recurrent well-formed visual hallucinations, spontaneous parkinsonism (slowness, stiffness, tremor), and a sleep disorder in which people physically act out their dreams. Memory may be relatively preserved early on, while attention, alertness, and visual-spatial skills are affected. Fainting, falls, and sensitivity to medications are common.' },
            { heading: 'Who it affects and causes', body: 'It mainly affects older people and is one of the more common dementias. It is caused by abnormal protein deposits (Lewy bodies) in brain cells, related to the changes seen in Parkinson’s disease. The exact causes are not fully understood.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies the characteristic mix of fluctuation, hallucinations, parkinsonism, and sleep features, sometimes with scans, and distinguishes it from other dementias and delirium. In ICD-11 it is coded 6D82. Getting the diagnosis right is important for safe treatment.' },
            { heading: 'Treatment and a key safety point', body: 'There is no cure, but symptoms can be managed: some dementia medications can help thinking and hallucinations, and movement and sleep symptoms can be addressed, all under specialist guidance. Crucially, certain antipsychotic medications can cause severe, sometimes dangerous reactions in Lewy body dementia, so medications must be chosen very carefully by professionals — never started without specialist advice.' },
            { heading: 'Living well', body: 'Support focuses on managing the fluctuating symptoms, ensuring safety (falls, fainting), maintaining routine and a calm environment, treating sleep problems, and keeping active and engaged. Because symptoms vary, flexibility and patience help, and good days can be made the most of.' },
            carerSection,
            { heading: 'When to get help', body: 'See a GP for fluctuating confusion, visual hallucinations, new movement problems, or acting out dreams. Always tell professionals if Lewy body dementia is suspected before any new medication, given the risk from certain drugs. Seek urgent help for sudden worsening (which may be delirium).' },
        ],
        sources: [WHO_ICD11, NHS_DLB],
    },

    'frontotemporal-dementia': {
        short_definition:
            'A less common form of dementia, often beginning at a younger age (frequently between 45 and 65), caused by damage to the front and side parts of the brain. It typically affects behaviour, personality, and language more than memory in the early stages — for example causing marked changes in conduct, empathy, or speech. Support, understanding, and the right care are central, as treatments for the underlying disease are limited.',
        what_it_feels_like:
            'Depending on the type, early changes may be in behaviour and personality (acting out of character, loss of empathy or inhibition, apathy, or repetitive behaviours) or in language (difficulty speaking, finding words, or understanding). Memory is often relatively preserved at first, which can lead to the condition being mistaken for a mental health problem. The changes are distressing and confusing for families.',
        how_it_differs:
            'Unlike Alzheimer’s (memory-led, usually older onset), frontotemporal dementia often starts younger and affects behaviour, personality, or language first, with memory relatively spared early. Because early features can look like depression, midlife crisis, or other psychiatric conditions, it is frequently misdiagnosed at first.',
        when_more_than_everyday:
            'Seek assessment for marked, persistent changes in behaviour, personality, empathy, or language — especially in midlife — that are out of character and worsening. Early, accurate diagnosis helps families understand what is happening and access the right support.',
        sections: [
            { heading: 'Signs and types', body: 'There are two broad patterns. Behavioural changes: acting out of character, loss of empathy or social awareness, disinhibition, apathy, compulsive or repetitive behaviours, and changes in eating. Language changes: increasing difficulty with speaking, finding words, or understanding language. Memory and visual-spatial skills are often relatively preserved early on. The pattern depends on which brain areas are most affected.' },
            { heading: 'Who it affects and causes', body: 'It often begins younger than other dementias (commonly 45–65) and affects men and women. It is caused by progressive damage to the frontal and temporal lobes, linked to abnormal proteins; a notable proportion of cases have a family history, and some are linked to specific genes. The causes are still being researched.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses the behavioural or language changes, takes a careful history (often from family), uses brain scans, and distinguishes it from psychiatric conditions and other dementias. In ICD-11 it is coded 6D83. Because it can mimic mental health conditions, getting the right diagnosis can take time.' },
            { heading: 'Treatment and support', body: 'There is no cure or specific treatment for the underlying disease, so care focuses on managing symptoms and supporting the person and family: strategies for behaviour, speech and language therapy, treating mood or sleep problems, ensuring safety, and practical and emotional support. Because onset is often younger, support around work, finances, and family (including children) is especially important.' },
            { heading: 'Living well and family impact', body: 'The behavioural and personality changes can be especially hard for families, who may feel they have "lost" the person. Understanding that the changes are due to the illness — not choice — helps. Structure, routine, managing triggers for difficult behaviour, and good support services all help, as does specialist advice tailored to younger-onset dementia.' },
            carerSection,
            { heading: 'When to get help', body: 'See a GP for persistent, out-of-character changes in behaviour, personality, or language, particularly in midlife. Early assessment helps families understand and plan, and rules out other causes. Specialist support tailored to younger-onset dementia is valuable.' },
        ],
        sources: [WHO_ICD11, NHS_FTD],
    },

    'dementia-due-to-psychoactive-substances': {
        short_definition:
            'A form of dementia in which lasting damage to thinking, memory, and daily functioning results from long-term, heavy use of a psychoactive substance — most commonly alcohol — rather than from another disease. Unlike many dementias, its course can sometimes stabilise or partly improve if the substance use stops and any related deficiencies are treated, so stopping and getting help is especially important.',
        what_it_feels_like:
            'A person may have lasting problems with memory, planning, attention, and judgment that affect daily life, in the context of long-term heavy substance use. There is often a mix of difficulties, and the person may not fully recognise the extent of the problem. Stopping the substance offers the best chance of stabilising or improving.',
        how_it_differs:
            'Unlike progressive dementias such as Alzheimer’s, substance-related dementia is caused by the toxic effects of long-term heavy use (and related problems such as vitamin deficiency or head injuries), and its course can sometimes stabilise or partly improve with abstinence and treatment. Distinguishing it matters because stopping the substance can change the outlook.',
        when_more_than_everyday:
            'Seek help when long-term heavy substance use is accompanied by lasting problems with memory, thinking, and daily functioning. Stopping the substance — with medical support, as withdrawal from alcohol or some drugs can be dangerous — and treating any deficiencies offers the best chance of improvement.',
        sections: [
            { heading: 'Signs and features', body: 'Lasting impairment across thinking, memory, planning, attention, and judgment, sufficient to affect daily life, in someone with a long history of heavy psychoactive substance use (most often alcohol). The pattern can vary, and physical effects of substance use are often present. It develops over time rather than suddenly.' },
            { heading: 'Causes', body: 'The main cause is the cumulative toxic effect of long-term heavy use on the brain, often compounded by related factors such as thiamine (vitamin B1) deficiency, repeated head injuries, liver disease, and poor nutrition. Alcohol is the most common substance involved. Identifying and treating these contributing factors is important.' },
            { heading: 'Who it affects', body: 'It affects people with a long history of heavy substance use, often at a younger age than other dementias. It is frequently under-recognised, and stigma around substance use can be a barrier to compassionate assessment and help.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses the cognitive difficulties and the substance use history, treats and excludes reversible causes (such as thiamine deficiency, which needs urgent treatment), and distinguishes it from other dementias. In ICD-11 it is coded 6D84.' },
            { heading: 'Treatment and the chance of improvement', body: 'The most important step is stopping or greatly reducing the substance — with medical support, since withdrawal from alcohol or some drugs can be dangerous and should not be done abruptly alone — along with treating deficiencies (such as thiamine), nutrition, and other health problems. With sustained abstinence, some people stabilise or partly recover, especially earlier on. Rehabilitation and support for daily living help.' },
            { heading: 'Support and recovery', body: 'Support combines substance-use treatment, cognitive rehabilitation, good nutrition, and practical help with daily living and a stable environment. Treating the substance use compassionately, and supporting abstinence over time, gives the best chance of improvement and a better quality of life.' },
            { heading: 'When to get help', body: 'See a GP or substance-use service for lasting memory and thinking problems alongside heavy substance use. Seek medical advice before stopping heavy alcohol or drug use, as withdrawal can be dangerous, and urgent help for confusion, unsteadiness, or eye-movement problems (which can signal a thiamine-deficiency emergency).' },
        ],
        sources: [WHO_ICD11],
    },

    'dementia-due-to-diseases-classified-elsewhere': {
        short_definition:
            'Dementia that is caused by another identified disease — for example Parkinson’s disease, Huntington’s disease, HIV, multiple sclerosis, certain infections, or other neurological or medical conditions — rather than by Alzheimer’s, vascular disease, Lewy bodies, or frontotemporal degeneration alone. The features and course depend on the underlying disease, which is treated where possible alongside supporting the person’s thinking and daily life.',
        what_it_feels_like:
            'The experience varies with the underlying condition, but generally involves a decline in memory, thinking, and the ability to manage daily life, often alongside the physical or other symptoms of the underlying disease. Understanding the cause helps make sense of the particular pattern of difficulties.',
        how_it_differs:
            'Unlike the primary dementias, this is dementia occurring as part of another diagnosed disease. The specific symptoms, course, and treatment depend on that underlying condition — for example, dementia associated with Parkinson’s disease differs from that linked to Huntington’s disease or an infection. Identifying and treating the underlying disease is central.',
        when_more_than_everyday:
            'Seek assessment when memory and thinking decline in the context of another neurological or medical condition, or when such a decline appears alongside other unexplained symptoms. Identifying the underlying disease guides treatment and support.',
        sections: [
            { heading: 'What it covers', body: 'This category includes dementia arising from a range of other diseases — such as Parkinson’s disease, Huntington’s disease, HIV-related brain disease, multiple sclerosis, certain infections (for example, late effects of some infections), and other neurological or systemic conditions. The cognitive decline is part of, or a consequence of, the underlying disease.' },
            { heading: 'Signs and how they vary', body: 'Because the causes differ, so do the features. There is generally a decline in memory, thinking, and daily functioning, but the specific pattern (and accompanying physical symptoms) reflects the underlying disease — for instance, movement problems in Parkinson’s or Huntington’s, or the particular effects of an infection. The course also depends on the cause.' },
            { heading: 'Who it affects', body: 'It affects people with the relevant underlying conditions, across a range of ages depending on the disease. Some causes affect younger people (for example, certain inherited or infectious conditions), which brings particular support needs.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies the cognitive decline and links it to an underlying disease, through history, examination, and investigations specific to the suspected cause. In ICD-11 it is coded 6D85. Diagnosing the underlying condition is key to guiding treatment.' },
            { heading: 'Treatment and support', body: 'Where the underlying disease can be treated (for example, HIV with antiretroviral therapy, or managing Parkinson’s symptoms), this is central and can sometimes stabilise or improve the cognitive picture. Alongside this, support focuses on the person’s thinking, daily living, safety, mood, and the symptoms of the underlying disease, coordinated across the relevant specialists.' },
            carerSection,
            { heading: 'When to get help', body: 'See a doctor for a decline in memory or thinking alongside another medical or neurological condition, or with other unexplained symptoms. Identifying and treating the underlying disease, where possible, offers the best outcomes, alongside support for the person and family.' },
        ],
        sources: [WHO_ICD11],
    },
};
