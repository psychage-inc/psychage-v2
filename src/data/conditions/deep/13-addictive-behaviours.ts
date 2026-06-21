/**
 * Deep content — Addictive behaviours (ICD-11 6C50–6C51): gambling and gaming disorders.
 * Part B of the "substance use or addictive behaviours" grouping (part A = substances, file 12).
 *
 * These are behavioural addictions: persistent, impairing patterns of gambling or gaming with
 * loss of control. The copy is non-judgmental and recovery-oriented, stresses these are real
 * (not "just willpower"), and for gambling flags financial harm and raised suicide risk. For
 * gaming it stresses that enjoying games is normal — the disorder is the impairing minority.
 * Plain-language, non-diagnostic. ICD-11 / DSM-5-TR framed.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

export const addictiveBehavioursDeep: ConditionDeepMap = {
    'gambling-disorder': {
        short_definition:
            'A persistent, recurring pattern of gambling — in person or online — that a person struggles to control and continues despite serious harm to their finances, relationships, work, and wellbeing. It is a recognised behavioural addiction, not a lack of willpower or a moral weakness, and it carries a high risk of debt, family breakdown, and suicide. It is treatable, and help and recovery are very possible.',
        what_it_feels_like:
            'Gambling can take over: thoughts return to it constantly, bigger bets are needed for the same excitement, losses are "chased" in the hope of winning them back, and the person bets more than they can afford, hides it, and feels unable to stop even as harm mounts. Many feel intense shame, secrecy, and despair, especially as debts grow — which is part of why reaching out can feel so hard.',
        how_it_differs:
            'Unlike recreational gambling (an occasional flutter within one’s means), gambling disorder involves loss of control, preoccupation, chasing losses, and continued gambling despite serious harm. It is now understood as a behavioural addiction with brain-reward features similar to substance addictions — not simply a bad habit or a question of self-discipline.',
        when_more_than_everyday:
            'It is worth seeking help when gambling is hard to control, when you are betting more than you can afford or chasing losses, hiding it, borrowing or stealing to gamble, or when it is harming your finances, relationships, work, or mood. You do not need to have lost everything to deserve help — earlier is far easier.',
        sections: [
            { heading: 'Signs and symptoms', body: 'Common features include preoccupation with gambling (planning, reliving, or finding money for it), needing to bet more to feel the same excitement, repeated failed attempts to cut down or stop, restlessness or irritability when trying to stop, gambling to escape problems or low mood, "chasing" losses, lying to hide the extent of gambling, risking or damaging relationships and work, and relying on others to relieve money problems it has caused. The harm — not the amount staked — is what matters.' },
            { heading: 'The harm it causes', body: 'Gambling disorder can be devastating: serious debt and financial crisis, relationship and family breakdown, problems at work, and a high toll on mental health, including anxiety and depression. Importantly, gambling disorder is associated with a markedly raised risk of suicide, which is why early help and honest conversations about safety matter so much.' },
            { heading: 'Who it affects', body: 'Gambling problems can affect anyone, and the spread of fast, always-available online betting and gaming has increased risk. It often coexists with depression, anxiety, and substance use. Many people hide it for a long time, so the true scale is under-recognised.' },
            { heading: 'Why it develops', body: 'Gambling strongly activates the brain’s reward system, and features like near-misses, fast play, and the illusion of control are designed to keep people engaged. Genetics, mental health, stress, and easy access all contribute. Understanding it as an addiction — not a character flaw — is key to getting and giving help.' },
            { heading: 'Treatment and recovery', body: 'Gambling disorder responds well to treatment. Psychological therapy (especially cognitive behavioural therapy) helps people regain control, manage urges and the beliefs that drive gambling, and address underlying distress; peer-support groups help many; and practical tools — self-exclusion schemes, blocking software, and handing over control of finances temporarily — support recovery. Debt advice and treating co-occurring depression or anxiety are important parts of care. Many people recover fully.' },
            { heading: 'Practical steps that help', body: 'Useful steps include self-excluding from betting sites and venues, installing gambling-blocking software, limiting access to money (for example, a trusted person managing finances for a time), getting free debt advice, and connecting with a gambling support service or peer group. Lapses are part of recovery, not failure — what matters is reaching back out.' },
            { heading: 'For family and friends', body: 'Gambling harm affects the whole family. Approach with care rather than blame, protect your own and shared finances, get debt and support advice, and encourage treatment without taking on responsibility for the person’s recovery. Take any hopelessness or talk of suicide very seriously. Support exists for affected family members too, and using it is wise.' },
            { heading: 'When to get help', body: 'Contact a GP or a gambling support service if gambling is hard to control or causing harm — many countries have free, confidential helplines and self-exclusion tools. Because of the raised suicide risk, treat any thoughts of suicide or self-harm as urgent and contact emergency services or a crisis line now. Help works, and recovery is possible.' },
        ],
        sources: [WHO_ICD11],
    },

    'gaming-disorder': {
        short_definition:
            'A pattern of persistent or recurrent gaming — digital or video games, online or offline — that a person increasingly struggles to control, that takes priority over other interests and daily activities, and that continues despite clear negative consequences, to the point of significant harm over an extended period (usually at least a year). It is important to be clear: enjoying games, even a lot, is normal — gaming disorder is the impairing minority, and it is treatable.',
        what_it_feels_like:
            'For someone with the disorder, gaming stops being just fun and starts crowding out sleep, study or work, relationships, and self-care, while feeling hard to cut back even when it is causing problems. People may game to escape difficult feelings, feel irritable when unable to play, and notice their life narrowing around it — yet feel unable to step away.',
        how_it_differs:
            'Unlike the normal, healthy enjoyment of games (which most players have without harm), gaming disorder involves impaired control over gaming, gaming taking increasing priority over other parts of life, and continuing or escalating despite negative consequences, with significant impairment, typically sustained for around 12 months. Long hours alone do not equal a disorder — the loss of control and the harm do.',
        when_more_than_everyday:
            'It is worth seeking help when gaming is hard to control and is significantly harming sleep, school or work, relationships, health, or mood over a sustained period — not simply because someone plays a lot. If gaming has become a way to escape and other parts of life are suffering, support can help.',
        sections: [
            { heading: 'Signs and symptoms', body: 'Three features stand out: impaired control over gaming (over starting, frequency, intensity, duration, and stopping); gaming taking increasing priority over other interests and daily activities; and continuing or escalating gaming despite negative consequences. Alongside these, people may neglect sleep, meals, study, work, and relationships, feel irritable or low when unable to play, and use gaming to avoid problems or feelings. For a diagnosis the pattern is severe and sustained, usually for at least a year.' },
            { heading: 'Important context', body: 'Most people who play games — including those who play a great deal — do not have gaming disorder. Gaming can be social, creative, and enjoyable. The disorder is defined not by hours played but by loss of control and clear, lasting harm to a person’s life. Avoiding over-labelling normal enthusiasm is as important as recognising genuine problems.' },
            { heading: 'Who it affects', body: 'Gaming disorder affects a small minority of players, more often adolescents and young adults, and more often males. It frequently coexists with anxiety, depression, ADHD, or social difficulties, with gaming sometimes used to cope with these. Recognising any underlying difficulty is part of helping.' },
            { heading: 'Why it develops', body: 'Games are engaging by design, with rewards, goals, social connection, and progression that strongly engage the brain’s motivation systems. When gaming becomes a main way to meet needs (for achievement, belonging, or escape) or to avoid distress, a harmful pattern can develop, especially alongside anxiety, low mood, or loneliness. It is not simply laziness or a lack of discipline.' },
            { heading: 'Treatment and support', body: 'Support focuses on restoring balance rather than necessarily eliminating gaming. Psychological therapy (such as cognitive behavioural therapy) helps with control, underlying difficulties, and building other sources of reward and connection; addressing any co-occurring anxiety, depression, or ADHD is often central; and practical structure — boundaries on time, protecting sleep and responsibilities, and re-engaging offline activities and relationships — helps. For young people, family involvement is important. Many people regain balance.' },
            { heading: 'Building balance', body: 'Helpful steps include setting realistic limits, protecting sleep, study/work, and meals, scheduling offline activities and time with others, noticing the feelings that drive escape into gaming, and addressing them directly. The aim is usually a healthier relationship with gaming, not shame about enjoying games.' },
            { heading: 'For family and friends', body: 'Avoid blanket criticism of gaming, which often backfires; instead, focus on the impact on the person’s life and feelings, and on rebuilding balance together. Set boundaries calmly and consistently (especially for young people), encourage other activities and connection, and look for any underlying anxiety, low mood, or social difficulty. Seek professional help if gaming is causing sustained harm.' },
            { heading: 'When to get help', body: 'Consider help from a GP or mental health service when gaming is hard to control and is significantly harming a person’s life over a sustained period, particularly if it is bound up with low mood or anxiety. If there are thoughts of suicide or self-harm, seek urgent help.' },
        ],
        sources: [WHO_ICD11],
    },
};
