/**
 * Deep content — Factitious disorders (ICD-11 6D50–6D51).
 *
 * Intentionally feigning, falsifying, or inducing illness — in oneself, or in another person.
 * The "imposed on another" form is a serious type of abuse: the copy keeps it non-sensational,
 * and puts the safety of the victim (often a child or dependent adult) first. Plain-language,
 * non-diagnostic. ICD-11 / DSM-5-TR framed.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

export const factitiousDeep: ConditionDeepMap = {
    'factitious-disorder-imposed-on-self': {
        short_definition:
            'A condition in which a person deliberately fakes, exaggerates, or actually produces physical or psychological symptoms in themselves — and presents as ill or injured — without an obvious external reward such as money or avoiding work. The driver is a psychological need (often to take on the "sick role" and receive care and attention), and the behaviour can lead to repeated, unnecessary, and sometimes harmful medical tests and treatments. It is a recognised mental health condition that needs sensitive, specialist help.',
        what_it_feels_like:
            'From the outside, a person may seem genuinely and often dramatically unwell, moving between doctors and hospitals. Inside, there is usually deep distress and unmet emotional needs driving the behaviour, even though the symptoms are produced deliberately. People rarely see it as a problem they can disclose, which makes it hard to recognise and to treat.',
        how_it_differs:
            'Unlike a genuine illness, the symptoms are deliberately produced or falsified. Unlike malingering (faking illness for a clear external gain like money, drugs, or avoiding duties), here there is no obvious external reward — the motivation is internal and psychological. Unlike conditions where symptoms are real but unexplained (such as bodily distress disorder), in factitious disorder the deception is conscious, even if the underlying needs are not.',
        when_more_than_everyday:
            'It is difficult to seek help for directly, but support is warranted when a person repeatedly presents with symptoms that are produced or falsified, undergoes many unnecessary investigations, or recognises they are caught in a cycle of seeking care this way. A compassionate, non-confronting approach helps people engage.',
        sections: [
            { heading: 'Signs and features', body: 'Features can include a long, dramatic, and inconsistent medical history, symptoms that do not fit known patterns or change when the person is observed, eagerness to undergo tests and procedures, extensive medical knowledge, frequent moves between hospitals or doctors, and symptoms that worsen without clear cause. Crucially, the symptoms are deliberately produced or falsified, and there is no obvious external reward.' },
            { heading: 'Who it affects', body: 'It is uncommon — though possibly under-recognised — and is associated with a history of difficult early experiences, other mental health conditions, and sometimes work or experience in healthcare. Because the behaviour involves deception, people seldom disclose it, and it often comes to light through inconsistencies in their care.' },
            { heading: 'What causes it', body: 'The causes are not fully understood but are thought to involve deep emotional needs — for care, attention, or a sense of identity — often rooted in early adversity, trauma, neglect, or experiences of illness, alongside other mental health difficulties. The person is usually struggling with real distress, even though the symptoms are produced.' },
            { heading: 'How it’s recognised', body: 'Recognising it is difficult and is usually done carefully by clinicians who notice inconsistencies between reported symptoms, findings, and the course of "illness", while ruling out genuine conditions (which can coexist). In ICD-11 it is coded 6D50. A non-accusatory approach is important, because confrontation often leads the person to leave care.' },
            { heading: 'Treatment and support', body: 'Treatment is challenging but possible, and focuses on the underlying psychological needs rather than on "catching out" the person. A consistent, compassionate relationship with one main clinician, gentle psychological therapy where the person can engage, treatment of co-occurring depression, anxiety, or personality difficulties, and avoiding unnecessary tests and procedures all help. Reducing harm from repeated medical interventions is an important goal.' },
            { heading: 'Reducing harm', body: 'Because the behaviour can lead to genuinely harmful tests, treatments, and surgeries, a key aim is to limit unnecessary medical intervention while keeping the person engaged and supported. Coordinated care, with clear communication between professionals, helps protect the person’s physical health while their underlying needs are addressed.' },
            { heading: 'For family and friends', body: 'This is confusing and distressing for those close to the person. Try to respond with concern rather than anger, encourage engagement with mental health support, and avoid getting drawn into escalating medical investigations. Recognising the genuine distress behind the behaviour — without endorsing the deception — helps. Support for yourself is reasonable too.' },
            { heading: 'When to get help', body: 'Encourage compassionate mental health support where someone is producing or falsifying symptoms and undergoing unnecessary care. If there is any risk of serious self-harm from inducing illness, or thoughts of suicide, seek urgent help. Specialist input is usually needed.' },
        ],
        sources: [WHO_ICD11],
    },

    'factitious-disorder-imposed-on-another': {
        short_definition:
            'A condition in which a person deliberately fakes, exaggerates, or induces illness or injury in ANOTHER person — most often a child or a dependent adult in their care — and presents them as ill, without an obvious external reward. This is a serious form of abuse that can seriously harm or even kill the victim. Protecting the person being harmed always comes first; the perpetrator also needs specialist mental health assessment.',
        what_it_feels_like:
            'To others, the carer may appear devoted and very attentive, while the person in their care undergoes repeated, unexplained illnesses, tests, and treatments. The harm to the victim is real and can be severe. Because the perpetrator usually appears caring and credible, this form of abuse can be very hard to detect.',
        how_it_differs:
            'Unlike a carer reporting a child’s or dependent’s genuine illness, here the illness is fabricated or deliberately induced. Unlike factitious disorder imposed on self, the harm is done to another person — which makes it a child-protection or adult-safeguarding matter and a form of abuse, not only a mental health diagnosis. The victim’s safety is the overriding concern.',
        when_more_than_everyday:
            'Any suspicion that a child or dependent adult’s illness is being fabricated or induced by a carer must be acted on immediately to protect them — through safeguarding and medical channels. This is urgent: the victim can be seriously harmed. Concerns should be raised with safeguarding services, the police, or emergency services.',
        sections: [
            { heading: 'What it is', body: 'A carer deliberately fabricates, exaggerates, or induces signs or symptoms of illness in a person in their care (commonly a child, but it can be a dependent adult), and seeks medical attention for them, in the absence of an obvious external reward. The victim may be subjected to repeated unnecessary and harmful investigations and treatments, and can be directly harmed by the carer’s actions.' },
            { heading: 'A safeguarding matter first', body: 'This is recognised as a form of abuse. The first and overriding priority is always the safety of the person being harmed. Where it is suspected, professionals act to protect the victim — this is a child-protection or adult-safeguarding issue, handled through the proper channels — alongside any mental health assessment of the perpetrator. Protecting the victim is never delayed.' },
            { heading: 'Why it is hard to detect', body: 'The perpetrator usually appears caring, attentive, and credible, and may have some medical knowledge, which makes the abuse difficult to identify. Suspicion often arises from a pattern of unexplained, recurrent illness that does not fit, improves when the carer is absent, or is witnessed. Detection requires careful, coordinated professional assessment.' },
            { heading: 'The harm to the victim', body: 'The victim can suffer serious, lasting physical and psychological harm — from induced illness, unnecessary medical procedures, and the betrayal of trust — and in severe cases it can be fatal. Recovery for the victim, especially a child, requires safety first and then specialist support.' },
            { heading: 'What is understood about the perpetrator', body: 'The motivations are complex and not fully understood, often involving deep psychological needs and sometimes other mental health difficulties. Understanding this never reduces the seriousness of the abuse or the need to protect the victim; the perpetrator also requires specialist mental health and, where relevant, legal assessment.' },
            { heading: 'How it’s recognised and managed', body: 'It is identified through careful, multi-professional assessment — medical, mental health, and safeguarding — that protects the victim while evaluating the situation. In ICD-11 it is coded 6D51. Management always centres on the victim’s safety, alongside legal and child-protection processes and assessment of the perpetrator.' },
            { heading: 'For family, friends, and professionals', body: 'If you suspect a child or dependent adult’s illness is being fabricated or induced, do not confront the suspected person yourself — instead, raise your concern with safeguarding services, the relevant medical team, the police, or emergency services, so the person at risk can be protected safely. Trust your concern; protecting the victim is what matters.' },
            { heading: 'When to get help — urgently', body: 'Treat any suspicion as urgent. Contact child-protection or adult-safeguarding services, the relevant medical team, or the police; in an emergency, call emergency services. The safety of the person being harmed comes before everything else.' },
        ],
        sources: [WHO_ICD11],
    },
};
