/**
 * Deep content — Elimination disorders (ICD-11 6C00–6C01): enuresis and encopresis.
 *
 * These are common childhood conditions that are involuntary, not the child's fault, and very
 * treatable. The copy is explicitly non-shaming and practical. Plain-language, non-diagnostic.
 * ICD-11 / DSM-5-TR framed.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

export const eliminationDeep: ConditionDeepMap = {
    'enuresis': {
        short_definition:
            'Repeated, involuntary wetting — most often bedwetting at night — in a child old enough to be expected to have bladder control, when it is not caused by a physical illness or medication. It is common, the child cannot help it, and it is not a sign of laziness or bad behaviour. Most children grow out of it, and effective treatments can speed that along.',
        what_it_feels_like:
            'For the child, wetting happens without warning, usually during deep sleep, and is not something they choose or can simply "try harder" to stop. Many children feel embarrassed or ashamed, especially as they get older or around sleepovers. Reassurance that it is common and not their fault makes a real difference.',
        how_it_differs:
            'Unlike normal wetting in toddlers still learning control, enuresis is wetting that continues (or returns) past the age where bladder control is usually established. Unlike wetting caused by a urine infection, diabetes, or other medical issue (which should be checked for), enuresis is not explained by a physical illness. Most cases are night-time only.',
        when_more_than_everyday:
            'It is worth seeking help when a child who is past the usual age for bladder control regularly wets the bed or themselves, especially if it is distressing, has returned after a dry period, or comes with other symptoms (pain, daytime wetting, excessive thirst). A check rules out medical causes and opens up effective treatments.',
        sections: [
            { heading: 'Signs and types', body: 'Enuresis means repeated involuntary wetting. It is described as night-time (the most common, "bedwetting"), daytime, or both. It can be "primary" (the child has never had a long dry period) or "secondary" (wetting returns after at least several months of dryness), which can sometimes follow stress or change. The defining point is that it happens in a child old enough to be expected to have control and is not due to a medical cause.' },
            { heading: 'Who it affects', body: 'Bedwetting is very common in young children and becomes less frequent with age; a smaller number of older children and occasionally teenagers are affected. It is somewhat more common in boys and tends to run in families. It is a normal variation in development for many children, not a disorder in the early years.' },
            { heading: 'What causes it', body: 'Common factors include a bladder that is still maturing, producing more urine at night than the bladder can hold, very deep sleep so the child does not wake to a full bladder, and a family history (genes play a big part). Constipation can contribute. Secondary wetting can be triggered by stress, illness, or change. It is not caused by drinking habits alone, and not by laziness.' },
            { heading: 'How it’s recognised', body: 'A clinician asks about the pattern of wetting, fluids, constipation, and any other symptoms, and checks the urine to rule out infection and other causes such as diabetes. In ICD-11 it is coded 6C00. Most assessment is straightforward, and the focus quickly moves to practical help.' },
            { heading: 'Treatment and what helps', body: 'Many children need only reassurance and time. Where help is wanted, simple measures come first: treating any constipation, sensible fluid timing, and not punishing accidents. A bedwetting alarm is a very effective treatment for night-time wetting and helps the child learn to wake to a full bladder. Medication is available for specific situations (such as sleepovers) under medical guidance. Most children become dry.' },
            { heading: 'Supporting a child', body: 'A calm, blame-free approach matters most. Reward systems for things the child can control (like helping change sheets or going to the toilet before bed) help more than punishing wet nights. Protecting the child’s confidence and keeping the issue low-key reduce shame and often the wetting itself.' },
            { heading: 'For family and friends', body: 'Never punish or shame a child for wetting — it is involuntary and shaming makes it worse. Stay matter-of-fact, involve the child in simple routines without pressure, and seek help if it is distressing or persistent. Practical steps (waterproof bedding, easy changes) reduce stress for everyone.' },
            { heading: 'When to get help', body: 'See a GP if a child past the usual age regularly wets, if dryness is lost after a long dry spell, or if there are other symptoms such as pain, daytime wetting, or excessive thirst. A check rules out medical causes, and effective, kind treatments are available.' },
        ],
        sources: [WHO_ICD11],
    },

    'encopresis': {
        short_definition:
            'Repeated passing of stool in inappropriate places — such as in clothing (soiling) — in a child old enough to be toilet trained, when it is not caused by a physical illness. It is usually linked to constipation and is involuntary; the child is not being naughty or lazy. It can be distressing, but it is common and treatable, often by addressing the underlying constipation.',
        what_it_feels_like:
            'Soiling often happens without the child realising until afterwards, because long-standing constipation can dull the normal urge and cause leakage around a hard stool. Children frequently feel embarrassed and may hide soiled clothes. Understanding that it is involuntary and usually due to constipation — not bad behaviour — changes everything.',
        how_it_differs:
            'Unlike a toddler still learning toileting, encopresis is soiling that continues past the age where control is expected. Unlike soiling from a physical gut disease (which should be excluded), it is most often the result of chronic constipation and stool withholding rather than another illness. It is involuntary, not deliberate.',
        when_more_than_everyday:
            'It is worth seeking help when a child past the usual age for toilet training repeatedly soils, especially with signs of constipation (infrequent or painful stools, tummy pain, leakage of loose stool). Treating the underlying constipation usually resolves it, and earlier help prevents a difficult cycle.',
        sections: [
            { heading: 'Signs and symptoms', body: 'Encopresis is repeated passing of stool in places other than the toilet, often as soiling of underwear. Most cases involve constipation: a build-up of hard stool stretches the bowel, dulls the urge to go, and allows softer stool to leak around the blockage (so soiling can look like diarrhoea). Signs of underlying constipation — infrequent, large, or painful stools, tummy pain, reduced appetite — are common. A minority of cases occur without constipation.' },
            { heading: 'Who it affects', body: 'Encopresis affects a noticeable minority of school-age children and is more common in boys. It can begin after a period of constipation, painful bowel movements, stress, or changes such as starting school. It is under-discussed because of embarrassment, but it is a recognised, treatable condition.' },
            { heading: 'What causes it', body: 'The most common path is chronic constipation and stool withholding — often started by a painful or frightening bowel movement, leading the child to hold on, which makes stools harder and the next movement more painful, creating a cycle. Diet, routine, stress, and toileting habits all play a part. It is not caused by laziness or defiance.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses the pattern of soiling and looks for constipation (sometimes with a simple examination), ruling out other medical causes. In ICD-11 it is coded 6C01. Recognising the (very common) constipation behind most cases is the key to effective treatment.' },
            { heading: 'Treatment and what helps', body: 'When constipation is the cause, treatment focuses on clearing the bowel and keeping stools soft and regular — usually with medical guidance on diet, fluids, and stool-softening treatments — alongside a calm, regular toileting routine (such as sitting after meals). Behavioural support and reward systems for sitting on the toilet help. Most children improve well once the constipation is properly treated; consistency over time is important.' },
            { heading: 'Supporting a child', body: 'A blame-free, patient approach is essential — the soiling is involuntary. Establishing relaxed, regular toilet sits, rewarding effort (not just clean days), and sticking with treatment even when progress is slow all help. Protecting the child from shame supports both their wellbeing and their recovery.' },
            { heading: 'For family and friends', body: 'Do not punish or shame soiling — it is not deliberate, and shame worsens the cycle. Keep responses calm and practical, support the toileting routine and any prescribed treatment, and be patient, as it can take time. Work with the GP and stick with the plan.' },
            { heading: 'When to get help', body: 'See a GP if a child past toilet-training age repeatedly soils, particularly with signs of constipation or tummy pain. Treating the underlying constipation usually resolves it, and earlier help breaks the cycle sooner. Seek prompt care for severe pain, vomiting, or a swollen, tender abdomen.' },
        ],
        sources: [WHO_ICD11],
    },
};
