/**
 * Deep content — Disorders of bodily distress or bodily experience (ICD-11 6C20–6C21).
 *
 * Bodily distress disorder centres on real, distressing physical symptoms; the copy never
 * implies they are "made up". Body integrity dysphoria is rare and stigma-prone; the copy is
 * respectful, non-sensational, and safety-focused (no methods). Plain-language, non-diagnostic.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

export const bodilyDistressDeep: ConditionDeepMap = {
    'bodily-distress-disorder': {
        short_definition:
            'A condition in which a person has one or more distressing physical symptoms — such as pain, fatigue, or digestive problems — together with excessive thoughts, feelings, and behaviours focused on those symptoms, in a way that takes up significant time and energy and affects daily life. The symptoms are real, whether or not a medical cause is found, and the condition is treatable.',
        what_it_feels_like:
            'A person experiences genuine, often persistent physical symptoms and finds their attention pulled toward them — worrying about what they mean, checking the body, seeking tests and reassurance, and reorganising life around them. The distress is about how consuming the symptoms and the worry become, not about whether the symptoms are "real" — they are.',
        how_it_differs:
            'Unlike normal concern about a symptom, here the symptoms and the response to them dominate a person’s thoughts and life. Unlike health anxiety (which centres on the fear of having a serious illness), bodily distress disorder centres on the bodily symptoms themselves and the distress around them. A medical cause may or may not be present; either way, the symptoms and distress are genuine.',
        when_more_than_everyday:
            'When distressing physical symptoms — and the worry, checking, or appointments that surround them — take up excessive time and energy and interfere with life, it is worth seeking help for the distress alongside any medical care. New or changing physical symptoms should still be assessed medically in the usual way.',
        sections: [
            { heading: 'Signs and symptoms', body: 'The condition has two parts: distressing bodily symptoms (commonly pain, fatigue, breathlessness, or gut symptoms — single or multiple) and a disproportionate focus on them, shown as persistent worry about the symptoms, frequent checking of the body, repeated medical visits and tests, and changing daily life around the symptoms. The level of preoccupation and impairment, not the presence or absence of a medical explanation, defines it.' },
            { heading: 'Who it affects', body: 'Distressing physical symptoms with a heavy focus on them are common in primary and general medical care, across all ages and backgrounds. It is more often diagnosed in women. It frequently coexists with anxiety and depression, and with diagnosed physical conditions.' },
            { heading: 'What causes it', body: 'It usually arises from a combination of factors: how the brain and body process and amplify physical sensations, stress and emotional difficulties, past experiences of illness, and patterns of attention and worry that focus on the body. The symptoms are not imagined; rather, the nervous system’s processing of them, and the response to them, become part of the problem.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies distressing bodily symptoms together with excessive, impairing focus on them, while ensuring appropriate medical assessment of the symptoms themselves. In ICD-11 it is coded 6C20. Importantly, it can be diagnosed whether or not a medical cause is found, and it does not mean the symptoms are "all in the mind".' },
            { heading: 'Treatment and what helps', body: 'Treatment supports both the symptoms and the distress. A trusted, ongoing relationship with one main clinician (rather than repeated new investigations) helps. Psychological therapies such as cognitive behavioural therapy reduce the worry, checking, and symptom-focus and build coping; graded activity, stress management, and treating any anxiety or depression all help. Where there is an underlying physical condition, it is managed in parallel.' },
            { heading: 'Living better with symptoms', body: 'Helpful approaches include shifting attention away from constant symptom-monitoring, pacing activity, agreeing sensible (rather than endless) medical reviews, and building a life that is not organised solely around symptoms. Reducing the cycle of worry and checking often eases both the distress and, over time, the symptoms’ grip.' },
            { heading: 'For family and friends', body: 'Take the symptoms seriously — they are real — while gently supporting the person away from constant reassurance-seeking and toward coping and treatment. Encourage a steady relationship with one clinician rather than repeated tests, and support engagement in valued activities. Avoid implying the person is exaggerating.' },
            { heading: 'When to get help', body: 'Seek help when distressing symptoms and the focus on them take over your life — for the distress as well as the symptoms. Genuinely new or worsening physical symptoms should always be assessed medically. If distress brings thoughts of self-harm, seek urgent help.' },
        ],
        sources: [WHO_ICD11],
    },

    'body-integrity-dysphoria': {
        short_definition:
            'A rare condition in which a person has a persistent, intense desire to have a specific physical disability — most often to have a healthy limb amputated, or to be paralysed — driven by a long-standing sense that a part of their body does not belong to them or does not match their inner sense of self. It causes significant distress and can lead to risky attempts at self-harm, so compassionate, specialist support and safety are key.',
        what_it_feels_like:
            'From early in life, a person may feel that a particular limb or part of their body is "not theirs", or that their true self is one with a particular disability. This mismatch can be deeply distressing and preoccupying, and some people feel they would only feel "complete" if their body matched their inner sense — a feeling that is hard to explain to others and often hidden out of shame.',
        how_it_differs:
            'Unlike body dysmorphic disorder (a preoccupation with a perceived flaw in appearance), here the experience is of a body part not belonging or a desire for a specific disability. Unlike a delusion, the person knows the limb is healthy and "theirs" in reality, while still feeling it should not be. It is a recognised condition of bodily experience, not attention-seeking.',
        when_more_than_everyday:
            'When a persistent feeling that part of the body does not belong, or a desire for a specific disability, causes significant distress or leads to thoughts of harming the body, it is important to seek specialist help — both for support and for safety. Compassionate professional care, free of judgment, is essential.',
        sections: [
            { heading: 'Signs and experiences', body: 'The core experience is a long-standing, intense desire for a specific physical disability (commonly amputation of a healthy limb, or paralysis), arising from a persistent sense that the body part does not belong or does not match the person’s inner sense of self. People may mimic the desired state (for example, using a wheelchair or binding a limb), feel persistent distress about the mismatch, and, in some cases, consider risky steps to bring their body into line with how they feel.' },
            { heading: 'Who it affects', body: 'Body integrity dysphoria is rare and tends to begin in childhood or adolescence, with the feelings persisting over many years. Because of shame and fear of being misunderstood, many people keep it private for a long time, which can add to isolation and distress.' },
            { heading: 'What causes it', body: 'The causes are not fully understood. Current thinking links it to differences in how the brain maps and represents the body, so that a healthy limb is not fully experienced as part of the self. It is a genuine disorder of body experience, not a choice, a fashion, or attention-seeking, and it is no one’s fault.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies the long-standing desire for a disability and the sense of a body part not belonging, along with the distress it causes, and distinguishes it from other conditions such as body dysmorphic disorder or psychosis. In ICD-11 it is coded 6C21. A non-judgmental, trusting relationship is central, given how isolating the experience can be.' },
            { heading: 'Support and what helps', body: 'There is no simple cure, and the priority is compassionate support, reducing distress, and keeping the person safe. Psychological therapy can help people understand and cope with the feelings, manage distress, and reduce isolation and any co-occurring depression or anxiety. Because some people consider dangerous attempts to alter their body, open, non-judgmental conversations about safety are an important part of care.' },
            { heading: 'Living with it', body: 'Living with body integrity dysphoria often means finding ways to reduce distress and shame, build understanding and support, and stay safe, even when the underlying feeling persists. A trusted therapeutic relationship, connection with others, and treatment of any depression or anxiety can meaningfully improve wellbeing and quality of life.' },
            { heading: 'For family and friends', body: 'Respond with compassion rather than shock or judgment — the experience is genuine and distressing, and shame already isolates many people. Encourage specialist support, take any risk of self-harm seriously, and focus on the person’s safety and wellbeing. Listening without dismissing helps someone feel less alone.' },
            { heading: 'When to get help', body: 'Seek specialist help when these feelings cause significant distress, isolation, or any thoughts of harming the body. If a person is considering dangerous action to alter their body, or has thoughts of suicide or self-harm, treat it as urgent and contact emergency services or a crisis line. Compassionate, confidential help is available.' },
        ],
        sources: [WHO_ICD11],
    },
};
