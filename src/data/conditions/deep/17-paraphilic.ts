/**
 * Deep content — Paraphilic disorders (ICD-11 6D30–6D36).
 *
 * Authored with maximum care. Principles applied to EVERY entry:
 *  - An atypical sexual interest is a DISORDER only when it (a) is acted on with, or creates a
 *    serious risk to, NON-CONSENTING people, or (b) causes the person marked distress.
 *  - Having an urge is not a choice; ACTING in a way that harms others is a choice, is abuse,
 *    is never acceptable, and is illegal. Child sexual abuse, in particular, causes profound,
 *    lasting harm.
 *  - Confidential professional help exists to prevent harm; seeking it is responsible.
 *  - NO methods, NO specifics, NOTHING that could facilitate offending. Safety + protecting
 *    others come first; this is harm-prevention education, never normalisation of harm.
 * Plain-language, non-diagnostic. ICD-11 / DSM-5-TR framed.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

/** Shared "interest vs. acting" section, customised per entry by the lead-in sentence. */
const interestVsActing = (lead: string) => ({
    heading: 'Having an urge is not the same as acting on one',
    body: `${lead} A person does not choose to have an urge or attraction. But acting in a way that harms or violates another person is a choice — and it is abuse, it is never acceptable, and it is against the law. The goal of recognising this as a health condition is not to excuse harm; it is to help people who are troubled by such urges to never act on them, and to protect others. Seeking confidential professional help to manage urges and prevent harm is a responsible and important step.`,
});

/** Shared closing safety/help section. */
const safetyHelp = {
    heading: 'Getting help and keeping others safe',
    body: 'Confidential help is available from GPs, mental health services, and in many places dedicated prevention services for people worried about their sexual thoughts or urges — reaching out before any harm occurs is the responsible thing to do. If a child or any person is at risk of harm, or has been harmed, protecting them comes first: contact the police, emergency services, or local safeguarding/child-protection services immediately. If distressing urges come with thoughts of suicide or self-harm, seek urgent help too.',
};

export const paraphilicDeep: ConditionDeepMap = {
    'exhibitionistic-disorder': {
        short_definition:
            'A sustained pattern of intense sexual arousal from exposing one’s genitals to non-consenting people, where the person has either acted on these urges with a non-consenting person or is markedly distressed by them. Exposing oneself to others without consent is harmful and a criminal act; the disorder is recognised so that people troubled by these urges can get help to never act on them and others can be protected.',
        what_it_feels_like:
            'A person may experience recurrent, intense urges and arousal connected to exposing themselves to others who have not consented, sometimes feeling driven by them and ashamed or distressed. These urges can feel hard to control, which is exactly why confidential professional help — before any harm occurs — matters.',
        how_it_differs:
            'Consensual sexual expression between adults is not this disorder. It becomes a disorder specifically because it involves non-consenting people: either the person has acted on the urges toward someone who did not consent, or is significantly distressed by them. The harm to others, and the lack of consent, are what define it.',
        when_more_than_everyday:
            'Help should be sought when a person has recurrent, intense urges to expose themselves to non-consenting people, has acted on such urges, or is distressed by them — ideally before any harm is ever done. Acting on these urges harms others and is a crime, so reaching out early is both responsible and protective.',
        sections: [
            { heading: 'What it is and the disorder threshold', body: 'The condition involves a sustained, focused pattern of sexual arousal from exposing one’s genitals to non-consenting people. It is diagnosed when the person has acted on these urges with a non-consenting individual, or when the urges cause marked distress that is not simply due to fear of disapproval. Non-consent and harm to others are central to the diagnosis.' },
            interestVsActing('Exhibitionistic urges can be unwanted and distressing.'),
            { heading: 'Who it affects', body: 'It is uncommon and is identified far more often in men. As with the other paraphilic disorders, much remains unknown, and many people who could benefit from help do not come forward because of shame, fear, or stigma — which is part of why confidential prevention services exist.' },
            { heading: 'What is understood about causes', body: 'The causes are not well understood and are thought to involve a mix of developmental, psychological, and biological factors. Importantly, understanding possible causes never excuses harming others — it informs assessment and treatment aimed at preventing harm.' },
            { heading: 'How it’s assessed', body: 'Assessment is carried out by specialist mental health or forensic professionals, who consider the pattern of urges, any actions, the risk to others, and any distress, alongside a person’s wider history and circumstances. In ICD-11 it is coded 6D30. Assessment is also about evaluating and managing risk to keep others safe.' },
            { heading: 'Treatment and harm prevention', body: 'Treatment focuses on preventing harm: structured psychological therapies that help the person understand and manage urges, develop self-control and relapse-prevention strategies, and address any other difficulties; in some cases medication may be used under specialist care; and, where there has been offending, this is managed within legal and forensic frameworks. The overriding aim is the safety of others.' },
            safetyHelp,
        ],
        sources: [WHO_ICD11],
    },

    'voyeuristic-disorder': {
        short_definition:
            'A sustained pattern of intense sexual arousal from observing non-consenting people who are naked, undressing, or engaging in sexual activity, where the person has acted on these urges with a non-consenting person or is markedly distressed by them. Watching or recording others without consent is a serious violation and a criminal act; the disorder is recognised so that people troubled by these urges can get help to never act on them.',
        what_it_feels_like:
            'A person may have recurrent, intense urges to observe others without their consent, and feel driven by them and ashamed or distressed. As with the other disorders in this group, the urges can feel hard to control — which is exactly why seeking confidential help before any harm occurs is so important.',
        how_it_differs:
            'Consensual sexual activity and viewing between adults is not this disorder. It becomes a disorder because it involves non-consenting people — either acting on the urges toward someone who did not consent, or marked distress about them. Non-consent and the violation of others’ privacy are central.',
        when_more_than_everyday:
            'Help should be sought when a person has recurrent, intense urges to watch non-consenting people, has acted on such urges, or is distressed by them — ideally before any harm is done. Observing or recording others without consent harms them and is a crime.',
        sections: [
            { heading: 'What it is and the disorder threshold', body: 'The condition involves a sustained pattern of sexual arousal from observing non-consenting people in private situations. It is diagnosed when the person has acted on these urges with a non-consenting individual, or when the urges cause marked distress not simply due to disapproval. The violation of consent and privacy is central.' },
            interestVsActing('Voyeuristic urges can be unwanted and distressing.'),
            { heading: 'Who it affects', body: 'It is uncommon and identified far more often in men. Much remains unknown, and stigma and fear keep many people from seeking help — which is why confidential prevention services are important.' },
            { heading: 'What is understood about causes', body: 'The causes are not well understood and likely involve a mix of developmental, psychological, and biological factors. Understanding causes never excuses violating others; it guides assessment and treatment focused on preventing harm.' },
            { heading: 'How it’s assessed', body: 'Specialist mental health or forensic professionals assess the pattern of urges, any actions, the risk to others, and any distress, within the person’s wider history. In ICD-11 it is coded 6D31. Assessing and managing risk to others is part of the process.' },
            { heading: 'Treatment and harm prevention', body: 'Treatment centres on preventing harm through psychological therapies that build understanding, self-control, and relapse-prevention skills, with medication in some cases under specialist care, and management within legal frameworks where offending has occurred. Protecting others is the priority.' },
            safetyHelp,
        ],
        sources: [WHO_ICD11],
    },

    'pedophilic-disorder': {
        short_definition:
            'A sustained pattern of sexual arousal involving children, where the person has acted on these urges or is markedly distressed by them. Sexual contact with a child is child sexual abuse: it causes profound, lasting harm and is always wrong and illegal. This is recognised as a disorder so that people who are distressed by such attractions and want to never harm a child can access confidential help, and so that children can be protected.',
        what_it_feels_like:
            'Some people experience sexual thoughts or attractions involving children that they do not want and that cause them deep distress, shame, and fear. Recognising the condition is not about excusing harm — it is about making it possible for such a person to reach confidential help to ensure they never act, and to protect children.',
        how_it_differs:
            'There is a crucial distinction between having an unwanted attraction and abusing a child. Many people with these attractions never offend; many who sexually abuse children are not primarily attracted to them. Either way, any sexual act involving a child is abuse, causes serious harm, and is never acceptable. The disorder is defined by acting on urges or being markedly distressed by them.',
        when_more_than_everyday:
            'Anyone troubled by sexual thoughts or urges involving children, or worried about their risk of harming a child, should seek confidential professional help now — before any harm occurs. This is the single most responsible and protective step. If a child is at risk or has been harmed, contact the police or child-protection services immediately.',
        sections: [
            { heading: 'What it is and the disorder threshold', body: 'The condition involves a sustained, focused pattern of sexual arousal involving pre-pubertal children. It is diagnosed when a person has acted on these urges, or is markedly distressed by them. The protection of children is paramount throughout.' },
            { heading: 'Having an attraction is not the same as abusing a child', body: 'A person does not choose to have an attraction. But sexually abusing a child is a choice, is among the most serious harms one person can do to another, and is never acceptable or legal. Recognising the condition is intended to help people who do not want to act to get help and never harm a child — not, in any way, to excuse abuse. Where any child is at risk, protecting the child comes before everything else.' },
            { heading: 'Who it affects and what is understood', body: 'Reliable figures are hard to establish because of stigma and secrecy. The causes are not well understood and are thought to involve developmental and biological factors. None of this lessens the wrongness or harm of abuse; it informs prevention and treatment aimed at protecting children.' },
            { heading: 'How it’s assessed', body: 'Assessment is carried out by specialist mental health or forensic professionals, with a central focus on risk to children and on safeguarding. In ICD-11 it is coded 6D32. Assessment always prioritises child protection.' },
            { heading: 'Treatment and preventing harm to children', body: 'Treatment focuses entirely on preventing harm: specialist psychological therapies that help a person manage and reduce the risk of acting, build self-control and relapse-prevention strategies, and address other difficulties; medication in some cases under specialist care; and management within legal and safeguarding frameworks. In several countries, confidential prevention programmes specifically help people who are worried about their attractions to children to never offend.' },
            { heading: 'Getting confidential help — and protecting children', body: 'If you are distressed by sexual thoughts or urges involving children, or worried you might act, seek confidential professional help now, including dedicated prevention services where they exist — doing so before any harm occurs is responsible and protective. If a child is being harmed or is at risk, protecting them comes first: contact the police, emergency services, or child-protection/safeguarding services immediately. If you are supporting a child who has been harmed, specialist services can help them recover.' },
        ],
        sources: [WHO_ICD11],
    },

    'coercive-sexual-sadism-disorder': {
        short_definition:
            'A sustained pattern of sexual arousal from inflicting suffering on a non-consenting person, where the person has acted on these urges with a non-consenting individual or is markedly distressed by them. Sexual violence and coercion cause serious harm, are abuse, and are always wrong and illegal. The disorder is recognised so that people troubled by such urges can get help to never act, and so others can be protected.',
        what_it_feels_like:
            'A person may experience recurrent urges or arousal tied to inflicting suffering on someone who has not consented, sometimes feeling driven by them and distressed. The presence of non-consent is what makes this so serious, and is why confidential help before any harm occurs is essential.',
        how_it_differs:
            'Consensual sexual activity between adults — including consensual interests within agreed limits — is not this disorder. This condition is defined by the involvement of NON-CONSENTING people: acting on urges to inflict suffering on someone who has not consented, or marked distress about such urges. Consent is the dividing line, and coercion is always abuse.',
        when_more_than_everyday:
            'Help should be sought when a person has urges to inflict suffering on non-consenting people, has acted on them, or is distressed by them — before any harm is done. Sexual violence and coercion are abuse and crimes; if anyone is at risk or has been harmed, contact the police or emergency services immediately.',
        sections: [
            { heading: 'What it is and the disorder threshold', body: 'The condition involves a sustained pattern of sexual arousal from inflicting physical or psychological suffering on a non-consenting person. It is diagnosed when the person has acted on these urges with a non-consenting individual, or is markedly distressed by them. Non-consent and the harm to others are central and define it.' },
            interestVsActing('Urges of this kind can be unwanted and distressing.'),
            { heading: 'The consent distinction', body: 'This disorder is specifically about non-consent. Consensual activities between adults who freely agree, within limits they set, are different in kind. Any sexual act that is coerced or inflicted on a person who has not consented is sexual violence and abuse — always wrong, harmful, and illegal.' },
            { heading: 'What is understood and how it’s assessed', body: 'The causes are not well understood. Assessment is carried out by specialist mental health or forensic professionals with a central focus on the risk to others and on protecting potential victims. In ICD-11 it is coded 6D33.' },
            { heading: 'Treatment and harm prevention', body: 'Treatment focuses on preventing harm: specialist psychological therapies to manage urges and reduce risk, build self-control and relapse-prevention skills, and address other difficulties; medication in some cases under specialist care; and management within legal and forensic frameworks where there has been offending. The safety of others is the overriding aim.' },
            safetyHelp,
        ],
        sources: [WHO_ICD11],
    },

    'frotteuristic-disorder': {
        short_definition:
            'A sustained pattern of intense sexual arousal from touching or rubbing against a non-consenting person, where the person has acted on these urges with a non-consenting individual or is markedly distressed by them. Sexual touching without consent is a violation and a criminal act; the disorder is recognised so that people troubled by these urges can get help to never act on them and others can be protected.',
        what_it_feels_like:
            'A person may have recurrent, intense urges connected to touching or rubbing against people who have not consented — often in crowded places — and may feel driven by them and ashamed or distressed. As with the others in this group, the urges can feel hard to control, which is why confidential help before any harm occurs matters.',
        how_it_differs:
            'Consensual physical and sexual contact between adults is not this disorder. It becomes a disorder because it involves non-consenting people — either acting on the urges, or marked distress about them. Non-consent and the violation of another person are central.',
        when_more_than_everyday:
            'Help should be sought when a person has recurrent urges to touch non-consenting people, has acted on them, or is distressed by them — ideally before any harm is done. Touching others without consent harms them and is a crime.',
        sections: [
            { heading: 'What it is and the disorder threshold', body: 'The condition involves a sustained pattern of sexual arousal from touching or rubbing against a non-consenting person. It is diagnosed when the person has acted on these urges with a non-consenting individual, or is markedly distressed by them. The lack of consent and the harm to others are central.' },
            interestVsActing('Frotteuristic urges can be unwanted and distressing.'),
            { heading: 'Who it affects', body: 'It is uncommon and identified far more often in men. As with the others in this group, much remains unknown, and stigma and fear keep many people from seeking help — which is why confidential prevention services matter.' },
            { heading: 'What is understood about causes', body: 'The causes are not well understood and likely involve a mix of developmental, psychological, and biological factors. Understanding causes never excuses violating others; it guides assessment and treatment aimed at preventing harm.' },
            { heading: 'How it’s assessed', body: 'Specialist mental health or forensic professionals assess the pattern of urges, any actions, the risk to others, and any distress, within the person’s wider history. In ICD-11 it is coded 6D34. Managing risk to others is part of the process.' },
            { heading: 'Treatment and harm prevention', body: 'Treatment focuses on preventing harm through psychological therapies that build understanding, self-control, and relapse-prevention skills, with medication in some cases under specialist care, and management within legal frameworks where offending has occurred. Protecting others is the priority.' },
            safetyHelp,
        ],
        sources: [WHO_ICD11],
    },

    'other-paraphilic-disorder-involving-non-consenting-individuals': {
        short_definition:
            'A category for sustained patterns of sexual arousal focused on non-consenting people — or on acts that would cause serious harm — that are not captured by the other named paraphilic disorders, where the person has acted on these urges or is markedly distressed by them. As with the others in this group, acting on such urges harms others, is abuse, and is never acceptable or legal; the disorder is recognised so that people troubled by these urges can get help to never act, and others can be protected.',
        what_it_feels_like:
            'A person may experience recurrent, intense urges or arousal involving non-consenting people in ways not covered by the specific named disorders, and may feel driven by them and distressed. As throughout this group, the presence of non-consent is what makes the urges so serious and why confidential help before any harm matters.',
        how_it_differs:
            'This category is used when the focus involves non-consenting people (or seriously harmful acts) but does not fit one of the specifically named disorders. Like the others, it is defined by non-consent and harm to others — not by being unusual in itself. Consensual activity between adults is different in kind.',
        when_more_than_everyday:
            'Help should be sought when a person has urges focused on non-consenting people, has acted on them, or is distressed by them — before any harm is done. Acting on such urges harms others and is a crime; if anyone is at risk or has been harmed, contact the police or emergency services immediately.',
        sections: [
            { heading: 'What it is and the disorder threshold', body: 'This category covers sustained patterns of sexual arousal involving non-consenting people, or acts that would cause serious harm, that are not captured by the named paraphilic disorders. It is diagnosed when a person has acted on the urges with a non-consenting individual, or is markedly distressed by them. Non-consent and harm to others are central.' },
            interestVsActing('Urges of this kind can be unwanted and distressing.'),
            { heading: 'What is understood and how it’s assessed', body: 'The causes are not well understood. Specialist mental health or forensic professionals assess the pattern, any actions, and the risk to others, with a central focus on protecting potential victims. In ICD-11 it is coded 6D35.' },
            { heading: 'Treatment and harm prevention', body: 'Treatment focuses on preventing harm: specialist psychological therapies to manage urges and reduce risk, build self-control and relapse-prevention skills, and address other difficulties; medication in some cases under specialist care; and management within legal and forensic frameworks where there has been offending. The safety of others is the overriding aim.' },
            safetyHelp,
        ],
        sources: [WHO_ICD11],
    },

    'paraphilic-disorder-involving-solitary-behaviour-or-consenting-individuals': {
        short_definition:
            'A category for an atypical sexual interest expressed only alone or with consenting adults, that is a disorder solely because it causes the person significant distress — or, in rare cases, carries a substantial risk of serious injury or death even when consensual. An unusual sexual interest, by itself, is not a disorder; this diagnosis applies only when there is marked personal distress or serious risk of harm.',
        what_it_feels_like:
            'A person may have an atypical sexual interest that they act on only by themselves or with consenting adults, and may feel significant distress about it — for example shame, anxiety, or a sense of being controlled by it. The distress (or, rarely, a serious safety risk), not the unusualness of the interest, is what brings it into the realm of a health condition.',
        how_it_differs:
            'Unlike the other paraphilic disorders in this group, this does not involve non-consenting people. An unusual but consensual, solitary interest that causes no distress and no serious risk is NOT a disorder. It becomes one only when it causes the person marked distress, or involves activities with a substantial risk of serious injury or death even with consent.',
        when_more_than_everyday:
            'It is worth seeking help when an atypical sexual interest is causing you significant distress, feels out of your control, or involves a substantial risk of serious physical harm to yourself or a consenting partner. Having an unusual interest that causes no distress and no serious risk is not, by itself, a reason for treatment.',
        sections: [
            { heading: 'What it is and the disorder threshold', body: 'This category applies to an atypical sexual interest enacted alone or with consenting adults that is a disorder only because it causes the person marked distress, or because it involves a substantial risk of serious injury or death even when consensual. The key point is that being unusual is not, in itself, a disorder.' },
            { heading: 'Atypical does not mean disordered', body: 'Sexual interests vary widely, and many that are uncommon are harmless and cause no distress — these are not disorders and need no treatment. This diagnosis is reserved for situations where the interest causes the person significant, persistent distress, or where there is a real risk of serious physical harm. The focus is the person’s wellbeing and safety, not judgment of their interest.' },
            { heading: 'Who it affects and what is understood', body: 'Such interests occur across the population; only a minority involve the distress or risk that would make them a disorder. The causes of particular interests are not well understood. Distress is often shaped by shame and stigma, which support can help ease.' },
            { heading: 'How it’s assessed', body: 'A clinician explores the interest, the distress it causes, any safety risks, and the person’s wider wellbeing, taking care not to pathologise harmless variation. In ICD-11 it is coded 6D36. Assessment is respectful and centred on the person’s distress and safety.' },
            { heading: 'Treatment and support', body: 'Where there is distress, psychological therapy can help — reducing shame, easing distress, addressing any sense of being controlled by the interest, and improving wellbeing and relationships. Where there is a risk of serious physical harm, support focuses on safety. The aim is the person’s wellbeing, not changing harmless aspects of who they are.' },
            { heading: 'When to get help', body: 'Consider help if an atypical sexual interest is causing you significant distress or feels out of control, or if any related activity carries a real risk of serious injury. If distress brings thoughts of suicide or self-harm, seek urgent help. Support is confidential and focused on your wellbeing.' },
        ],
        sources: [WHO_ICD11],
    },
};
