/**
 * Deep content — Obsessive-compulsive or related disorders (ICD-11 6B20–6B25).
 *
 * These conditions share a pattern of distressing preoccupations and repetitive behaviours.
 * The copy stresses they are common, not "quirks", treatable (especially with CBT/exposure-based
 * therapy), and that reassurance/avoidance tend to keep them going. Plain-language, non-diagnostic,
 * no drug dosing. ICD-11 / DSM-5-TR framed.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

const NIMH_OCD = {
    label: 'National Institute of Mental Health (NIMH) — Obsessive-Compulsive Disorder',
    url: 'https://www.nimh.nih.gov/health/topics/obsessive-compulsive-disorder-ocd',
};
const NHS_OCD = { label: 'NHS — Obsessive compulsive disorder (OCD)', url: 'https://www.nhs.uk/mental-health/conditions/obsessive-compulsive-disorder-ocd/' };
const NHS_BDD = { label: 'NHS — Body dysmorphic disorder (BDD)', url: 'https://www.nhs.uk/mental-health/conditions/body-dysmorphia/' };
const NHS_HOARD = { label: 'NHS — Hoarding disorder', url: 'https://www.nhs.uk/mental-health/conditions/hoarding-disorder/' };

export const ocdDeep: ConditionDeepMap = {
    'obsessive-compulsive-disorder': {
        short_definition:
            'A condition with two linked parts: obsessions — unwanted, intrusive thoughts, images, or urges that cause anxiety — and compulsions — repetitive behaviours or mental acts a person feels driven to perform to relieve that anxiety or prevent a feared outcome. The cycle can take up hours a day and feel impossible to resist, even when the person knows it is excessive. It is common and very treatable.',
        what_it_feels_like:
            'An intrusive thought (for example, of contamination, harm, or something being "not right") triggers intense anxiety, and a compulsion (washing, checking, counting, repeating, or mentally reviewing) briefly relieves it — only for the thought to return, so the cycle repeats. People often feel ashamed of the thoughts, exhausted by the rituals, and frustrated that knowing it is irrational does not make it stop.',
        how_it_differs:
            'Unlike everyday double-checking or liking things tidy, OCD is distressing, time-consuming, and driven by anxiety rather than preference. Unlike generalised worry, the thoughts are specific, intrusive, and paired with compulsions. The intrusive thoughts are not wishes — people with OCD are distressed precisely because the thoughts clash with their values.',
        when_more_than_everyday:
            'When intrusive thoughts and the rituals used to relieve them take up significant time (often an hour or more a day), cause real distress, or interfere with life, it is worth seeking help. Liking order is fine; OCD is when anxiety and rituals run the show.',
        sections: [
            { heading: 'Signs and symptoms', body: 'Obsessions are recurrent, unwanted intrusive thoughts, images, or urges — common themes include contamination, fear of harm coming to oneself or others, a need for symmetry or "just right" feelings, and forbidden or taboo thoughts. Compulsions are repetitive acts done to reduce the distress or prevent a feared event — washing, checking, counting, ordering, repeating, or mental rituals such as reviewing or silently reassuring. The person usually recognises the cycle is excessive but feels unable to stop.' },
            { heading: 'Who it affects', body: 'OCD affects around 1–2 in 100 people, across all backgrounds, and often begins in childhood, the teens, or early adulthood. It affects all genders. Because the thoughts can be embarrassing, many people hide their OCD for years before seeking help.' },
            { heading: 'What causes it', body: 'OCD develops from a mix of genetic vulnerability, differences in brain circuits involved in habit and threat, and life stress. A key driver of its persistence is the compulsion itself: relieving anxiety by performing a ritual teaches the brain the ritual was necessary, so the urge returns stronger. It is not caused by personality or upbringing alone.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies the presence of obsessions and/or compulsions, the time they take, the distress they cause, and their impact, distinguishing OCD from generalised anxiety, a preference for order, and other conditions. In ICD-11 it is coded 6B20. Describing the thoughts honestly — even the embarrassing ones — helps get the right help.' },
            { heading: 'Treatment and what helps', body: 'OCD responds very well to a specific therapy: cognitive behavioural therapy with exposure and response prevention (ERP), in which a person gradually faces the triggering thoughts or situations while resisting the compulsion, so the brain learns the anxiety fades on its own and the feared outcome does not happen. Certain antidepressant medications also help and are often combined with therapy. Recovery is very possible.' },
            { heading: 'Breaking the cycle', body: 'The path out of OCD runs counter to instinct: facing the fear and not performing the ritual, so anxiety can rise and then fall naturally. Done gradually and with support, this weakens the cycle. Seeking reassurance and avoiding triggers feel helpful but keep OCD going, so reducing them — gently — is part of recovery.' },
            { heading: 'For family and friends', body: 'It is natural to want to give reassurance or help with rituals, but doing so (called "accommodation") strengthens OCD. With the person and their therapist, work toward gradually stepping back from reassurance and rituals, with kindness and without criticism. Support the person’s ERP practice and celebrate their courage in facing fears.' },
            { heading: 'When to get help', body: 'See a GP or mental health service when obsessions and compulsions take up time, cause distress, or interfere with life. If OCD brings thoughts of suicide or self-harm — which can happen with severe distress — seek urgent help. Effective, specific treatment exists.' },
        ],
        sources: [WHO_ICD11, NIMH_OCD, NHS_OCD],
    },

    'body-dysmorphic-disorder': {
        short_definition:
            'A condition in which a person is preoccupied with one or more perceived flaws in their appearance — flaws that are minor or not visible to others — to the point of significant distress. They typically perform repetitive behaviours such as mirror-checking, grooming, comparing, or seeking reassurance. It is more than vanity; it can be deeply distressing and is linked to a high risk of depression and suicide, so it deserves prompt, compassionate help.',
        what_it_feels_like:
            'A person may feel convinced that part of their appearance — skin, nose, hair, body shape — is ugly or deformed, even when others do not see it, and find the thought intrusive and consuming. They may check mirrors repeatedly (or avoid them), camouflage the area, compare themselves to others, or seek reassurance that never quite reassures. The distress can dominate the day and shrink life.',
        how_it_differs:
            'Unlike ordinary appearance concerns or low self-esteem, BDD involves intense, time-consuming preoccupation and repetitive behaviours that cause real distress and impairment. Unlike an eating disorder’s focus on weight and shape, BDD usually centres on specific features. It shares the obsession–compulsion pattern of OCD, which is why it sits in this family.',
        when_more_than_everyday:
            'When concern about appearance becomes preoccupying, drives repetitive checking, grooming, comparing, or reassurance-seeking, and causes distress or holds back life — for example avoiding social situations, work, or photos — it is worth seeking help. This is especially important given the raised risk of depression and suicidal thoughts.',
        sections: [
            { heading: 'Signs and symptoms', body: 'BDD involves preoccupation with one or more perceived defects in appearance that are not noticeable or appear slight to others, together with repetitive behaviours or mental acts in response — mirror-checking or mirror-avoidance, excessive grooming, skin-picking, comparing one’s appearance with others, seeking reassurance, or seeking cosmetic procedures. The preoccupation is time-consuming and causes marked distress or interferes with life. Many people have limited insight, genuinely believing the flaw is real and obvious.' },
            { heading: 'Who it affects', body: 'BDD affects a meaningful minority of people and usually begins in adolescence, a time of heightened appearance focus. It affects all genders. It is often hidden out of shame and frequently goes unrecognised, sometimes for years, including in cosmetic and dermatology settings.' },
            { heading: 'What causes it', body: 'BDD develops from a combination of genetic vulnerability, brain processing differences, temperament, and experiences such as teasing, bullying, or appearance-related pressure. Cultural and social emphasis on appearance can contribute. It is not vanity or a choice — the distress is real and the focus on the flaw feels involuntary.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies the appearance preoccupation, the repetitive behaviours, the distress and impact, and distinguishes BDD from eating disorders and ordinary appearance concern. In ICD-11 it is coded 6B21. Asking directly and gently about appearance worries and any hopelessness is important, given the suicide risk.' },
            { heading: 'Treatment and what helps', body: 'BDD responds to treatment, particularly cognitive behavioural therapy tailored to BDD (including reducing checking, comparing, and reassurance-seeking, and gradually facing avoided situations), and certain antidepressant medications, often in combination. Importantly, cosmetic or surgical procedures rarely help and often make things worse, because the underlying distress is not about the body part itself.' },
            { heading: 'Recovery and self-care', body: 'Recovery involves gradually reducing the appearance-focused rituals and avoidance, and learning to relate differently to intrusive appearance thoughts. Limiting mirror-checking, photo-editing, and comparison (including on social media), and reconnecting with valued activities beyond appearance, all help. Progress takes time and self-compassion.' },
            { heading: 'For family and friends', body: 'Reassurance about looks tends not to help and can feed the cycle, so focus instead on the person’s feelings and encourage treatment. Avoid debating whether the flaw is "real". Take any hopelessness or talk of suicide seriously and seek help. Discourage cosmetic procedures as a fix, and support the person’s therapy.' },
            { heading: 'When to get help', body: 'Seek help when appearance preoccupation causes distress or limits life. Because BDD carries a high risk of depression and suicide, treat any thoughts of suicide or self-harm as urgent — contact emergency services or a crisis line now. Effective, compassionate treatment is available.' },
        ],
        sources: [WHO_ICD11, NHS_BDD],
    },

    'olfactory-reference-disorder': {
        short_definition:
            'A condition in which a person is persistently preoccupied with the belief that they give off a foul or offensive body odour or breath that others notice — when in fact there is no such odour, or only a trivial one. This belief causes significant distress and leads to repetitive behaviours such as checking, washing, or trying to mask the smell, and often to avoiding people.',
        what_it_feels_like:
            'A person may feel certain they smell bad and that others are reacting to it — stepping back, covering their nose, or commenting — and become intensely self-conscious and ashamed. They may wash excessively, change clothes often, chew gum or use deodorant repeatedly, check with others, or avoid social situations altogether. The conviction can feel undeniable even when no one else notices any odour.',
        how_it_differs:
            'Unlike ordinary concern about hygiene, the belief is preoccupying, distressing, and out of proportion to any real odour. Unlike a medical cause of body odour (which should be checked for and treated), the distress persists even when no odour is found. It shares the obsessive preoccupation and repetitive-behaviour pattern of this family, and overlaps with social anxiety.',
        when_more_than_everyday:
            'When worry about emitting an odour becomes preoccupying, drives repeated washing, checking, masking, or reassurance-seeking, and leads to distress or avoiding people — despite reassurance that there is no offensive smell — it is worth seeking help.',
        sections: [
            { heading: 'Signs and symptoms', body: 'The condition involves persistent preoccupation with the belief that one emits an offensive body odour or breath, which others can detect. In response, people perform repetitive behaviours — checking for the odour, excessive washing or grooming, changing clothes, using perfume or gum, seeking reassurance — and often misinterpret others’ ordinary actions (a sniff, a movement) as reactions to their smell. Many avoid social, work, or intimate situations as a result.' },
            { heading: 'Who it affects', body: 'Olfactory reference disorder is uncommon and tends to begin in adolescence or early adulthood. It often goes unrecognised because people may seek help from doctors or dentists for a smell rather than from mental health services, and may feel too ashamed to describe the full picture.' },
            { heading: 'What causes it', body: 'The causes are not fully understood but likely involve the same mix of genetic, temperamental, and experiential factors seen across this family, sometimes triggered by a comment or experience about smell. The repetitive checking and reassurance-seeking, and avoidance, keep the preoccupation alive.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies the persistent preoccupation with emitting an odour, the repetitive behaviours, and the distress, after a sensible medical check rules out an actual cause of odour. In ICD-11 it is coded 6B22. Sensitivity and a non-judgmental approach matter, because shame runs deep.' },
            { heading: 'Treatment and what helps', body: 'Treatment is similar to OCD and BDD: cognitive behavioural therapy (reducing checking, reassurance-seeking, masking, and avoidance, and gradually facing feared social situations) and certain antidepressant medications. Repeated medical investigations for a non-existent odour are not helpful and can reinforce the belief, so the focus shifts to the distress and behaviours.' },
            { heading: 'Recovery and self-care', body: 'Recovery comes from gradually reducing the checking, masking, and reassurance-seeking, and re-entering avoided situations so the brain can relearn that feared reactions do not occur. This is hard and benefits from professional support and self-compassion. Reconnecting socially, at a manageable pace, is central.' },
            { heading: 'For family and friends', body: 'Reassurance about smell tends not to stick and can feed the cycle, so gently shift the focus to the person’s distress and encourage treatment. Avoid arguments about whether an odour exists, and support the person in resisting checking and avoidance. Patience and a non-shaming attitude help most.' },
            { heading: 'When to get help', body: 'Seek help when worry about body odour becomes preoccupying, drives repetitive behaviours, or leads to avoiding people and distress. If the distress brings thoughts of suicide or self-harm, seek urgent help. Effective treatment exists, and recovery is possible.' },
        ],
        sources: [WHO_ICD11],
    },

    'hypochondriasis': {
        short_definition:
            'A condition (often called health anxiety) in which a person is persistently preoccupied with the fear of having, or developing, a serious illness, based on misinterpreting normal body sensations or minor symptoms. The worry persists despite medical reassurance and leads either to repeated checking and doctor visits, or to avoiding anything health-related. It is distressing and treatable.',
        what_it_feels_like:
            'Ordinary bodily sensations — a headache, a skipped heartbeat, a twinge — become alarming "evidence" of serious illness. People may check their body, search symptoms online, seek repeated tests and reassurance, and feel briefly relieved before the worry returns; others avoid doctors and health information entirely out of fear. The fear feels very real, and reassurance rarely sticks for long.',
        how_it_differs:
            'Unlike sensible health awareness, this involves persistent, distressing preoccupation with illness that continues despite medical reassurance. Unlike a condition where physical symptoms themselves are the focus, here the central problem is the fear and conviction of illness and the checking or avoidance it drives. It overlaps with anxiety and obsessive patterns.',
        when_more_than_everyday:
            'When fear of serious illness is persistent, dominates your thoughts, drives repeated checking, searching, or doctor visits (or complete avoidance), and is not eased by reassurance or normal test results, it is worth seeking help for the anxiety itself — which is the treatable problem.',
        sections: [
            { heading: 'Signs and symptoms', body: 'Health anxiety involves persistent preoccupation with having or getting a serious illness, fuelled by misreading ordinary sensations or minor signs. Two patterns are common: an over-checking pattern (frequent self-examination, symptom-searching online, repeated medical visits and tests, reassurance-seeking) and an avoidant pattern (avoiding doctors, medical information, or reminders of illness). Either way, the worry persists despite reassurance and causes real distress.' },
            { heading: 'Who it affects', body: 'Health anxiety is common and can occur at any age. It often increases at times of stress, after a health scare in oneself or a loved one, or with greater exposure to health information. It affects all genders and can come and go over time.' },
            { heading: 'What causes it', body: 'It develops from a mix of anxious temperament, past experiences of illness or loss, a tendency to focus on and catastrophise bodily sensations, and stress. Online symptom-searching and a focus on health can amplify it. The checking and reassurance-seeking, while comforting briefly, maintain the anxiety by never letting the brain learn the sensations are harmless.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies persistent illness preoccupation that continues despite appropriate medical assessment and reassurance, and distinguishes it from a genuine undiagnosed condition (which should be sensibly assessed) and from other anxiety. In ICD-11 it is coded 6B23. The aim is to treat the anxiety, not to keep ordering more tests.' },
            { heading: 'Treatment and what helps', body: 'Health anxiety responds well to cognitive behavioural therapy, which helps people reinterpret bodily sensations, reduce checking and reassurance-seeking, and tolerate uncertainty about health. Certain antidepressant medications can also help. A key shift is moving from "ruling out every illness" (impossible, and anxiety-feeding) to managing the worry itself.' },
            { heading: 'Self-help that helps', body: 'Reducing symptom-checking and online searching, limiting reassurance-seeking, and gradually tolerating uncertainty all weaken the cycle. Practising stress management and reconnecting with life beyond health worries help too. Agreeing sensible, limited medical check-ups (rather than endless ones) with a trusted GP can provide a stable framework.' },
            { heading: 'For family and friends', body: 'Endless reassurance feels kind but tends to feed the anxiety, so gently shift toward supporting the person’s coping and treatment rather than answering every worry. Encourage limiting symptom-searching and over-checking, and support them in tolerating uncertainty. Acknowledge that the fear feels real while encouraging help for the anxiety.' },
            { heading: 'When to get help', body: 'Seek help when fear of illness is persistent, distressing, and not eased by reassurance or normal results. New or genuinely concerning physical symptoms should still be checked sensibly with a doctor — health anxiety and real illness are not mutually exclusive. If distress brings thoughts of self-harm, seek urgent help.' },
        ],
        sources: [WHO_ICD11],
    },

    'hoarding-disorder': {
        short_definition:
            'A condition marked by persistent difficulty parting with possessions — regardless of their actual value — because of a strong perceived need to keep them and distress at the thought of discarding them. The result is an accumulation of clutter that fills living spaces and makes them hard to use, and that causes significant distress or problems with daily life and safety.',
        what_it_feels_like:
            'Letting go of items feels genuinely distressing — wasteful, risky, or like losing part of oneself — so things accumulate until rooms can no longer be used for their purpose. People often feel attached to possessions, fear needing them later, and feel overwhelmed and ashamed by the clutter, which can make it hard to invite people in or ask for help.',
        how_it_differs:
            'Unlike ordinary clutter or collecting (which is organised and enjoyed), hoarding causes distress, difficulty discarding, and clutter that prevents normal use of living spaces. Unlike a tidiness problem, it is driven by emotional attachment and anxiety about discarding. It is recognised as a distinct condition rather than laziness or a lifestyle choice.',
        when_more_than_everyday:
            'When difficulty discarding and accumulating clutter starts to fill and disable living spaces, cause distress, strain relationships, or create safety risks (fire, falls, hygiene), it is worth seeking help. Hoarding tends to worsen gradually over years, so earlier, compassionate support is better.',
        sections: [
            { heading: 'Signs and symptoms', body: 'The core features are persistent difficulty discarding or parting with possessions due to a perceived need to save them and distress at discarding; the accumulation of possessions that congests and clutters living areas to the point they cannot be used as intended; and significant distress or impairment as a result. Excessive acquiring (buying or collecting free items) is common. Many people have limited insight into the scale of the problem.' },
            { heading: 'Who it affects', body: 'Hoarding disorder becomes more common with age and often begins earlier in life, worsening gradually. It affects all backgrounds. Because of shame and limited insight, it frequently comes to attention only through family, neighbours, or services, sometimes when safety is at risk.' },
            { heading: 'What causes it', body: 'Hoarding arises from a mix of genetic vulnerability, differences in how decisions and emotional attachment to objects are processed, and life experiences, including loss or trauma. Difficulties with attention, organisation, and decision-making contribute. It is not simply untidiness or a moral failing.' },
            { heading: 'How it’s recognised', body: 'A clinician (sometimes alongside a home visit) identifies the difficulty discarding, the clutter and its effect on living spaces, and the distress or risk, distinguishing it from OCD and other conditions. In ICD-11 it is coded 6B24. A compassionate, non-shaming approach is essential, as shame is a major barrier to help.' },
            { heading: 'Treatment and what helps', body: 'Hoarding responds best to a specific form of cognitive behavioural therapy that builds skills in decision-making, sorting, and resisting acquiring, and gradually reduces clutter — usually slowly and with the person in control. Certain medications may help where anxiety or depression coexist. Pressuring someone or clearing the home against their will tends to backfire and increase distress.' },
            { heading: 'Making progress', body: 'Progress is gradual and works best when the person leads it: sorting in small, manageable sessions, practising letting go of lower-stakes items first, and reducing new acquiring. Setbacks are normal. The goal is safe, usable living space and less distress, not perfection. Patience — with oneself and from others — is key.' },
            { heading: 'For family and friends', body: 'Avoid throwing things away without consent or shaming the person — both damage trust and rarely lead to lasting change. Instead, offer calm, respectful support, help the person seek treatment, and let them make decisions about their belongings. Focus on safety risks first, and be patient with slow progress.' },
            { heading: 'When to get help', body: 'Seek help when clutter affects the use of living spaces, relationships, or safety, or causes distress. Where there are serious safety risks (fire hazards, blocked exits, falls, hygiene), involve appropriate services. Compassionate, skill-building support works better than force.' },
        ],
        sources: [WHO_ICD11, NHS_HOARD],
    },

    'body-focused-repetitive-behaviour-disorders': {
        short_definition:
            'A group of conditions involving recurrent, hard-to-resist behaviours focused on the body — most commonly hair-pulling (trichotillomania) and skin-picking (excoriation disorder) — that cause noticeable damage (hair loss, skin lesions) and distress, despite repeated attempts to stop. They are not habits a person can simply break by trying harder.',
        what_it_feels_like:
            'A person may pull out hair or pick at skin, often without fully realising at first, sometimes feeling a build-up of tension that the behaviour relieves, or doing it while absorbed in something else. There is usually shame about the visible effects and frustration at being unable to stop, even after promising oneself to. The behaviour can be soothing in the moment but distressing overall.',
        how_it_differs:
            'Unlike occasional fiddling with hair or skin, these behaviours are repetitive, cause real physical damage, and resist repeated attempts to stop. Unlike self-harm intended to cope with emotional pain through injury, the focus here is the pulling or picking itself, often soothing or automatic. They sit in the obsessive-compulsive family because of the repetitive, hard-to-resist pattern.',
        when_more_than_everyday:
            'When hair-pulling or skin-picking causes noticeable hair loss or skin damage, takes up time, or causes distress, and attempts to stop have not worked, it is worth seeking help. These are recognised, treatable conditions — not a lack of willpower.',
        sections: [
            { heading: 'Signs and symptoms', body: 'The main forms are trichotillomania (recurrent pulling out of one’s hair — scalp, eyebrows, eyelashes, or elsewhere — leading to hair loss) and excoriation disorder (recurrent skin-picking leading to lesions). The behaviour is repetitive and hard to resist, often preceded by tension or an urge and followed by relief or pleasure, and may be "automatic" (during other activities) or "focused" (a deliberate response to an urge). Repeated attempts to cut down usually fail without support.' },
            { heading: 'Who it affects', body: 'These behaviours are more common than often realised and frequently begin around adolescence. They are more often identified in girls and women. Many people keep them hidden out of embarrassment, covering the affected areas, and do not seek help for years.' },
            { heading: 'What causes it', body: 'They arise from a mix of genetic vulnerability, temperament, and the way the behaviour regulates emotion — relieving tension, boredom, or stress, which reinforces it. Differences in habit and urge-control systems in the brain are involved. They are not caused by vanity or a lack of self-control, and shaming makes them worse.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies the recurrent body-focused behaviour, the resulting damage, the distress, and the repeated unsuccessful attempts to stop, and checks for any skin or hair condition that needs separate care. In ICD-11 these are coded 6B25. A non-judgmental approach helps people feel able to describe behaviours they may find embarrassing.' },
            { heading: 'Treatment and what helps', body: 'The main treatment is a behavioural therapy called habit reversal training — building awareness of when and where the behaviour happens, identifying urges and triggers, and replacing the behaviour with a competing, harmless action. Broader approaches add strategies for managing the emotions and situations that drive it. Certain medications may help some people. Keeping hands busy and reducing triggers (such as touching the area) support progress.' },
            { heading: 'Managing it day to day', body: 'Practical steps help: noticing the high-risk times and places, keeping hands occupied (with a fidget object, for example), making the behaviour harder (gloves, plasters, shorter nails), and managing stress and boredom that fuel urges. Self-compassion matters — lapses are part of recovery, not failure, and shame tends to increase the behaviour.' },
            { heading: 'For family and friends', body: 'Avoid telling the person to "just stop" or drawing attention to the damage — both increase shame and the behaviour. Instead, offer understanding, support their use of strategies and treatment, and help reduce triggers. Recognise these as real conditions, not bad habits.' },
            { heading: 'When to get help', body: 'Seek help when pulling or picking causes noticeable damage, takes up time, or distresses you, especially if you have tried to stop without success. Treatment can substantially reduce the behaviour. If skin damage becomes infected, also seek medical care.' },
        ],
        sources: [WHO_ICD11],
    },
};
