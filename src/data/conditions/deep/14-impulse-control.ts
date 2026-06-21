/**
 * Deep content — Impulse control disorders (ICD-11 6C70–6C73).
 *
 * These involve repeated failure to resist an impulse to do something harmful to oneself or
 * others, often with rising tension beforehand and relief afterwards. The copy is non-judgmental
 * and recovery-oriented, safety-aware (pyromania, intermittent explosive disorder), and avoids
 * any harmful specifics. Plain-language, non-diagnostic. ICD-11 / DSM-5-TR framed.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

export const impulseControlDeep: ConditionDeepMap = {
    'pyromania': {
        short_definition:
            'A rare condition in which a person repeatedly and deliberately sets fires, driven by a powerful urge and a fascination with fire, with rising tension beforehand and a sense of relief or gratification during or afterwards — not for money, revenge, to cover a crime, or for any political or other practical reason. It is a recognised impulse control disorder, and the fire-setting is dangerous, so assessment and support (and safety) are essential.',
        what_it_feels_like:
            'A person may feel a building tension or urge connected to fire, a strong fascination with it, and a release of tension or excitement around setting or watching fires — followed, often, by guilt or distress. The urges can feel hard to resist, even though the person knows the danger and harm involved.',
        how_it_differs:
            'Unlike fire-setting for gain, revenge, concealment, or a cause (which is not pyromania), here the fire-setting is driven by an internal urge and fascination, with the tension-and-relief pattern of an impulse control disorder. It is also distinct from fire-setting due to another condition (such as intoxication or psychosis). It is rare and must be taken seriously because of the obvious danger.',
        when_more_than_everyday:
            'Recurrent, deliberate fire-setting driven by urges and fascination — rather than any practical motive — needs prompt professional assessment, both for the person and for everyone’s safety. This is urgent: fire endangers lives.',
        sections: [
            { heading: 'Signs and features', body: 'The pattern involves more than one episode of deliberate fire-setting, a fascination with or attraction to fire and its context (equipment, uses, aftermath), tension or arousal before the act, and pleasure, gratification, or relief when setting fires or witnessing their aftermath. Crucially, the fire-setting is not done for money, revenge, to express a grievance or belief, to conceal a crime, or in response to a delusion — and is not better explained by another condition.' },
            { heading: 'Who it affects', body: 'Pyromania is rare. Deliberate fire-setting overall is more common, but most of it is for other reasons (and much is by young people, often linked to other behavioural or developmental difficulties rather than pyromania itself). A careful assessment distinguishes true pyromania from these.' },
            { heading: 'What causes it', body: 'The causes are not well understood, but it is thought to involve difficulties with impulse control, the brain’s reward and tension-relief systems, and sometimes co-occurring conditions or earlier adversity. It is not simply "badness", though the behaviour is dangerous and has serious consequences.' },
            { heading: 'How it’s recognised', body: 'A clinician carefully assesses the pattern and the reasons for fire-setting, ruling out practical motives and other conditions (such as conduct problems, intoxication, or psychosis), often as part of a wider forensic or mental health assessment. In ICD-11 it is coded 6C70.' },
            { heading: 'Treatment and support', body: 'Treatment focuses on safety and on the urges: psychological therapies (such as cognitive behavioural approaches) to build impulse control, manage urges and tension, and address triggers, alongside treating any co-occurring conditions. For young people, family and educational involvement is important. Because of the danger, treatment is part of a wider plan to keep the person and others safe.' },
            { heading: 'Safety first', body: 'Given the risk to life and property, safety planning is central — reducing access to fire-setting materials, close support, and engaging promptly with professionals. This is not about punishment alone; it is about preventing harm while treating the underlying difficulty.' },
            { heading: 'For family and friends', body: 'Take any deliberate fire-setting extremely seriously and seek professional help promptly — for the person’s sake and everyone’s safety. Reduce access to materials, avoid leaving the person unsupervised where there is risk, and work closely with the professionals involved. Respond with concern and structure rather than shame alone.' },
            { heading: 'When to get help', body: 'Seek professional assessment urgently for recurrent deliberate fire-setting. If there is an immediate risk of fire or harm, contact emergency services. Engaging early with mental health and, where relevant, other services is essential for safety and treatment.' },
        ],
        sources: [WHO_ICD11],
    },

    'kleptomania': {
        short_definition:
            'A rare condition in which a person repeatedly fails to resist urges to steal objects they do not need for use or for their value, with rising tension before the act and relief or gratification during or afterwards. It is not ordinary theft for gain — the items are often discarded, given away, or hoarded — and it usually brings shame and distress. It is a recognised impulse control disorder and is treatable.',
        what_it_feels_like:
            'A person may feel a growing, hard-to-resist urge to take something, tension that builds until they do, and a brief sense of relief or excitement afterwards — usually followed by guilt, shame, and fear of being caught. The stealing is not planned for profit and often makes no practical sense, which can be confusing and distressing for the person.',
        how_it_differs:
            'Unlike ordinary shoplifting or theft (done for the object’s use or value, or for gain), kleptomania is driven by an urge and the tension-relief cycle, and the items are typically unneeded — often discarded or hoarded. It is also distinct from stealing due to another condition. The internal compulsion, not material need or planning, is the key.',
        when_more_than_everyday:
            'Recurrent, urge-driven stealing of things you do not need or want — with tension beforehand and relief afterwards, and usually shame and distress — is a reason to seek help. It is a recognised, treatable condition, and help can also reduce the legal and personal consequences.',
        sections: [
            { heading: 'Signs and features', body: 'The pattern involves recurrent failure to resist urges to steal objects not needed for personal use or monetary value, increasing tension before the theft, and pleasure, gratification, or relief at the time of the act. The stealing is not done for gain, anger, or revenge, and is not better explained by another condition. People often feel intense guilt afterwards and may hoard, discard, return, or give away what they took.' },
            { heading: 'Who it affects', body: 'Kleptomania is rare. It often begins in adolescence or early adulthood and is more often identified in women. It frequently coexists with depression, anxiety, eating disorders, and other impulse control or substance use difficulties, and the shame involved means many people hide it for a long time.' },
            { heading: 'What causes it', body: 'The causes are not fully understood but are thought to involve difficulties with impulse control and the brain’s reward and tension-relief systems, often alongside other mental health conditions and stress. It is not simply dishonesty or a lack of morals, though it has real consequences.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses the pattern and motivation for stealing, distinguishing kleptomania from ordinary theft and from stealing linked to another condition, often in the context of co-occurring depression, anxiety, or other difficulties. In ICD-11 it is coded 6C71. The shame involved makes a non-judgmental approach important.' },
            { heading: 'Treatment and support', body: 'Treatment centres on psychological therapy — particularly cognitive behavioural approaches that build impulse control, manage urges, and address triggers and the tension-relief cycle — alongside treating any co-occurring depression, anxiety, or other conditions. Some people are helped by medication for those co-occurring conditions. Many people gain much better control with support.' },
            { heading: 'Managing urges', body: 'Helpful strategies include recognising the build-up of tension and triggers, delaying and "riding out" urges (which tend to pass), avoiding high-risk situations where possible, and addressing the stress or low mood that often fuels the cycle. Self-compassion helps, as shame can drive the behaviour.' },
            { heading: 'For family and friends', body: 'Respond with understanding rather than only condemnation — kleptomania is a recognised condition, and shame already weighs heavily. Encourage professional help, support engagement with treatment, and recognise that the behaviour is driven by urges rather than greed. Practical and legal consequences may still need to be addressed alongside treatment.' },
            { heading: 'When to get help', body: 'Seek help from a GP or mental health service for recurrent urge-driven stealing, especially where there is distress or it coexists with depression or anxiety. If there are thoughts of suicide or self-harm — which can accompany the shame — seek urgent help.' },
        ],
        sources: [WHO_ICD11],
    },

    'compulsive-sexual-behaviour-disorder': {
        short_definition:
            'A condition in which a person experiences a persistent pattern of failing to control intense, repetitive sexual urges or behaviours, leading to significant distress or serious problems in their personal, family, social, work, or other life. It is defined by loss of control and harm over time — not by how much sex a person has, their orientation, or any moral judgment about sexual behaviour itself.',
        what_it_feels_like:
            'A person may feel that sexual urges or behaviours have become hard to control and central in their life — taking up excessive time, continuing despite negative consequences or little satisfaction, and being used to cope with stress or difficult feelings. Many feel distressed, ashamed, or out of control, and find it affects their relationships, work, or wellbeing.',
        how_it_differs:
            'Unlike a high sex drive or an active sex life that is not causing harm (which is not a disorder), this involves a sustained failure to control sexual urges or behaviour that causes real distress or impairment. Importantly, distress arising only from moral or religious disapproval of one’s sexual behaviour is not, by itself, this disorder. It is about control and harm, not orientation, identity, or morality.',
        when_more_than_everyday:
            'It is worth seeking help when sexual urges or behaviours feel out of control, take up excessive time, continue despite causing harm or distress, or are used to cope with difficult feelings, and this is affecting your relationships, work, health, or wellbeing — regardless of the type of behaviour. Help is non-judgmental and focuses on control and wellbeing.',
        sections: [
            { heading: 'Signs and features', body: 'The pattern includes repetitive sexual activities becoming a central focus of life to the neglect of health and other interests, many unsuccessful efforts to reduce the behaviour, continuing despite adverse consequences or deriving little satisfaction, and difficulty controlling the urges or behaviour. For a diagnosis, this persists over time (generally six months or more) and causes marked distress or impairment in important areas of life.' },
            { heading: 'What it is not', body: 'This is not about judging sexual interests, orientation, identity, or how often someone has sex. A consensual, active sex life that is not causing harm is not a disorder. And distress that comes only from feeling one’s sexual behaviour conflicts with personal, religious, or cultural values — without loss of control — is not, by itself, this condition. The focus is loss of control and genuine harm.' },
            { heading: 'Who it affects', body: 'It can affect people of any gender, orientation, or background. It often coexists with depression, anxiety, or other conditions, and the behaviour is frequently used to cope with stress, loneliness, or difficult emotions. Shame and stigma mean many people delay seeking help.' },
            { heading: 'What causes it', body: 'The causes are not fully understood and likely involve a mix of difficulties with impulse control, the brain’s reward systems, mental health, stress, and the use of sexual behaviour to regulate emotions. Easy access to online sexual content can be a factor for some. It is understood as a health issue, not a moral failing.' },
            { heading: 'Treatment and support', body: 'Psychological therapy is central — helping the person regain control, understand and manage urges and triggers, address the emotions and stresses that drive the behaviour, and repair its effects on relationships and life. Treating co-occurring depression, anxiety, or other conditions matters too. A non-judgmental, confidential approach helps people engage, and many regain control and wellbeing.' },
            { heading: 'Regaining control', body: 'Helpful approaches include identifying triggers and high-risk situations, finding other ways to manage stress and difficult feelings, setting practical boundaries (for example around online content), and addressing relationship impacts honestly with support. Reducing shame, which often fuels the cycle, is part of recovery.' },
            { heading: 'For family and friends', body: 'Approach the issue without shaming, focusing on the person’s distress and the impact on their life rather than moral judgment. Encourage confidential professional help, and, where relationships have been affected, consider support for those affected too. Recognise it as a recognised condition about control, not character.' },
            { heading: 'When to get help', body: 'See a GP or mental health professional when sexual urges or behaviours feel out of control and are causing distress or harm to your life and relationships. If distress brings thoughts of suicide or self-harm, seek urgent help. Confidential, non-judgmental support is available.' },
        ],
        sources: [WHO_ICD11],
    },

    'intermittent-explosive-disorder': {
        short_definition:
            'A condition marked by repeated, sudden outbursts of intense anger or aggression — verbal or physical — that are clearly out of proportion to whatever triggered them and that the person struggles to control. The outbursts are impulsive, often quickly regretted, and can damage relationships, work, and safety. It is a recognised impulse control disorder, not simply "having a temper", and it is treatable.',
        what_it_feels_like:
            'A person may feel anger surge rapidly and overwhelmingly in response to minor triggers, erupting before they can stop it, then feel exhausted, ashamed, and remorseful afterwards. Between outbursts they may be perfectly calm. Many describe feeling unable to control the reaction in the moment, which is frightening and distressing for them and those around them.',
        how_it_differs:
            'Unlike ordinary irritability or occasional anger, the outbursts are recurrent, impulsive, and grossly out of proportion to the trigger, and cause real harm or distress. Unlike planned or instrumental aggression, they are sudden and unpremeditated. It is also distinct from aggression better explained by another condition, substance use, or a medical cause.',
        when_more_than_everyday:
            'When anger erupts in sudden, disproportionate outbursts you cannot control, that damage relationships, work, property, or safety and leave you regretful afterwards, it is worth seeking help. Everyone gets angry sometimes; this is a recurrent, impairing pattern — and effective help exists.',
        sections: [
            { heading: 'Signs and symptoms', body: 'The core feature is recurrent, impulsive outbursts of aggression that are out of proportion to the situation — these can be verbal (shouting, tirades) or physical (toward people, animals, or property). The outbursts come on quickly, are not premeditated, and are often followed by remorse, embarrassment, or exhaustion. Between episodes the person may function well. The pattern causes distress or problems in relationships, work, or the law.' },
            { heading: 'Who it affects', body: 'Intermittent explosive disorder usually begins in adolescence or early adulthood. It often coexists with depression, anxiety, substance use, and other conditions. It is frequently under-recognised, sometimes dismissed as simply a "bad temper", even though it can seriously affect relationships, work, and safety.' },
            { heading: 'What causes it', body: 'It is thought to arise from a mix of genetics, brain systems involved in regulating anger and impulse, and experiences such as exposure to violence, trauma, or harsh environments in childhood. Stress and substance use can worsen it. It reflects difficulty regulating a powerful emotion, not simply a choice to lash out.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses the pattern, frequency, and disproportion of the outbursts and their impact, and rules out other explanations such as another mental health condition, substance use, or a medical cause. In ICD-11 it is coded 6C73. Honest description of the outbursts and their triggers guides treatment.' },
            { heading: 'Treatment and support', body: 'Treatment is effective. Psychological therapies — especially cognitive behavioural approaches and anger-management work — help people recognise early warning signs, manage the build-up of anger, develop coping and communication skills, and reduce triggers. Certain medications can help some people, particularly where there is a co-occurring condition. Addressing stress, substance use, and any trauma is part of recovery.' },
            { heading: 'Managing anger', body: 'Helpful strategies include learning to notice the early physical signs of rising anger, using time-outs and calming techniques before an outburst, reducing alcohol and other triggers, improving sleep and stress management, and practising communication skills. Over time, many people gain much better control and repair relationships.' },
            { heading: 'For family and friends', body: 'Stay safe first — step away from a situation that is escalating, and do not put yourself at risk. Encourage the person to seek treatment, support their use of anger-management strategies, and set clear boundaries about acceptable behaviour. Where there is any risk of harm, prioritise safety and seek help. Support also exists for those affected by another person’s anger.' },
            { heading: 'When to get help', body: 'Seek help from a GP or mental health service for recurrent, disproportionate outbursts you cannot control. If there is any immediate risk of harm to yourself or others, contact emergency services. If anger comes with thoughts of suicide or self-harm, seek urgent help.' },
        ],
        sources: [WHO_ICD11],
    },
};
