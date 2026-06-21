/**
 * Deep content — Disorders associated with pregnancy, childbirth or the puerperium
 * (ICD-11 6E20–6E21).
 *
 * Mental health difficulties arising in pregnancy or after birth. The copy is supportive,
 * non-stigmatising, and strongly encourages help-seeking. It makes clear that postpartum
 * (puerperal) PSYCHOSIS is a medical EMERGENCY, and that any thoughts of harming oneself or the
 * baby need urgent help. Plain-language, non-diagnostic, no dosing. ICD-11 / DSM-5-TR framed.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

const NHS_PND = { label: 'NHS — Postnatal depression', url: 'https://www.nhs.uk/mental-health/conditions/post-natal-depression/overview/' };

export const perinatalDeep: ConditionDeepMap = {
    'mental-or-behavioural-disorders-associated-with-pregnancy-without-psychotic-symptoms': {
        short_definition:
            'Mental health difficulties — such as depression or anxiety — that arise during pregnancy or in the weeks and months after birth, without loss of contact with reality. They are common, are not a sign of being a bad or weak parent, and are very treatable. Getting help protects both the parent and the baby, and most people recover well with support.',
        what_it_feels_like:
            'A new or expectant parent may feel persistently low, tearful, anxious, irritable, overwhelmed, or unable to enjoy things, struggle to sleep (beyond normal newborn tiredness), feel little connection to the baby, or be flooded with worry or guilt. Many feel ashamed to admit this when they are "supposed" to be happy — which is exactly why compassionate, judgment-free help matters.',
        how_it_differs:
            'Unlike the short-lived "baby blues" (tearfulness and mood swings in the first days after birth, which usually pass within a couple of weeks), these disorders are more intense, last longer, and interfere with daily life and caring for the baby. Unlike the version with psychotic symptoms, the person stays in touch with reality. The timing — during pregnancy or after birth — is the defining context.',
        when_more_than_everyday:
            'It is worth seeking help when low mood, anxiety, or other symptoms during pregnancy or after birth last more than a couple of weeks, are intense, or affect your ability to function or care for yourself or your baby. Any thoughts of harming yourself or the baby, or feeling unable to cope, need urgent help — reach out straight away.',
        sections: [
            { heading: 'Signs and symptoms', body: 'These can include persistent low mood, tearfulness, anxiety or excessive worry (often about the baby), irritability, feeling overwhelmed or unable to cope, loss of interest or enjoyment, difficulty bonding with the baby, sleep and appetite changes beyond normal new-parent tiredness, guilt, and difficulty concentrating. Anxiety conditions, including intrusive frightening thoughts about the baby’s safety, are common. Symptoms can start in pregnancy or after birth.' },
            { heading: 'Who it affects', body: 'Depression and anxiety in pregnancy and after birth are common, affecting a significant proportion of parents — including fathers and partners, not only birthing parents. They occur across all backgrounds. Despite how common they are, stigma and the expectation to feel joyful mean many people suffer in silence.' },
            { heading: 'What causes it', body: 'They arise from a mix of factors: hormonal and physical changes, exhaustion and disrupted sleep, a personal or family history of depression or anxiety, birth experiences, lack of support, relationship or financial stress, and the major life adjustment of having a baby. It is not caused by being a bad parent or not loving the baby.' },
            { heading: 'How it’s recognised', body: 'Midwives, health visitors, and GPs ask about mood and wellbeing during and after pregnancy, sometimes using simple questionnaires, and assess the impact and any risks. In ICD-11 it is coded 6E20. Being honest about how you really feel — even the hard or frightening thoughts — helps you get the right support.' },
            { heading: 'Treatment and support', body: 'These conditions are very treatable. Talking therapies are effective and often offered first; some people benefit from medication, which can be chosen with care during pregnancy and breastfeeding under medical guidance. Practical and social support, rest where possible, and treating any anxiety are important. Specialist perinatal mental health services exist in many areas. Most people recover well.' },
            { heading: 'Helping yourself and bonding', body: 'Accepting help, resting when you can, staying connected to others, gentle activity, and being kind to yourself all support recovery. Difficulty bonding with the baby is a symptom, not a failure, and usually improves with treatment and support; skin-to-skin contact, responding to the baby, and support with feeding and settling can help the bond grow.' },
            { heading: 'For partners, family, and friends', body: 'Watch for signs that a new or expectant parent is struggling, listen without judgment, offer practical help (sleep, chores, baby care), and gently encourage them to talk to a midwife, health visitor, or GP. Partners can be affected too and also deserve support. Take any talk of not coping, or of harm, seriously and seek help.' },
            { heading: 'When to get help', body: 'Speak to a midwife, health visitor, or GP if symptoms last more than two weeks, are severe, or affect daily life or caring for your baby — help is effective and you will be supported, not judged. Seek urgent help immediately for any thoughts of harming yourself or your baby, or if you feel unable to keep yourself or your baby safe.' },
        ],
        sources: [WHO_ICD11, NHS_PND],
    },

    'mental-or-behavioural-disorders-associated-with-pregnancy-with-psychotic-symptoms': {
        short_definition:
            'A serious mental health condition arising during pregnancy or, most often, in the days to weeks after birth, in which a parent loses contact with reality — with symptoms such as confusion, severe mood disturbance, delusions, or hallucinations. The form occurring after birth is known as postpartum (or puerperal) psychosis. It is a medical EMERGENCY that needs urgent treatment, and with prompt care most people make a full recovery.',
        what_it_feels_like:
            'Onset is often sudden, within days or weeks of giving birth. A person may become confused, severely high or low in mood (or rapidly switching), unable to sleep, paranoid or fearful, and may believe things that are not true or see or hear things that are not there. They may not realise they are unwell. It is frightening and disorientating for the person and alarming for those around them.',
        how_it_differs:
            'Unlike postnatal depression or anxiety (where the person stays in touch with reality), this involves psychosis — a loss of contact with reality. Unlike the short-lived "baby blues", it is severe and dangerous and comes on rapidly. Postpartum psychosis is a psychiatric emergency, distinct in urgency from the other perinatal disorders.',
        when_more_than_everyday:
            'This is an emergency. Sudden confusion, severe mood changes, not sleeping, paranoia, or unusual beliefs or experiences in a pregnant person or new parent need urgent medical help straight away — do not wait. Any risk to the parent or baby requires immediate emergency care.',
        sections: [
            { heading: 'Signs and symptoms', body: 'Symptoms come on quickly and can include severe confusion, rapidly changing or extreme mood (very high, very low, or both), being unable to sleep, restlessness, paranoia or fearfulness, delusions (strongly held false beliefs, sometimes about the baby), and hallucinations. The person may behave very out of character and may not recognise that they are unwell. Onset is usually within the first two weeks after birth, but can be later.' },
            { heading: 'Why it is an emergency', body: 'Postpartum psychosis is a psychiatric emergency. The person can be at risk of harming themselves or, rarely, the baby, often without realising they are unwell. Prompt assessment and treatment — usually in hospital, ideally in a specialist mother and baby unit where available — keep both safe and lead to recovery. It must never be "waited out".' },
            { heading: 'Who it affects and causes', body: 'It is uncommon but serious. The risk is much higher in people with bipolar disorder or a previous episode of postpartum psychosis, or a family history, so these should be flagged in pregnancy so care can be planned. The causes involve the dramatic hormonal, sleep, and physical changes around birth interacting with this vulnerability. It is not caused by anything the parent did wrong.' },
            { heading: 'How it’s recognised', body: 'It is recognised from the sudden onset of psychotic and severe mood symptoms after birth, and is treated as urgent. In ICD-11 it is coded 6E21. Where someone is known to be at higher risk (for example, with bipolar disorder or a previous episode), a care plan can be made in advance and any early signs acted on immediately.' },
            { heading: 'Treatment and recovery', body: 'With prompt treatment, the outlook is good and most people recover fully. Treatment usually involves urgent specialist care — often admission, ideally to a mother and baby unit so the parent and baby can stay together safely — with medication to treat the psychosis and mood symptoms and to restore sleep, plus support and, later, talking therapy. Recovery takes time, and ongoing support afterwards helps.' },
            { heading: 'For partners, family, and friends', body: 'If you notice sudden confusion, severe mood changes, not sleeping, paranoia, or unusual beliefs or experiences in a new parent, seek urgent medical help immediately — call a doctor, crisis service, or emergency services. Stay with the person, keep them and the baby safe, and do not leave them alone if there is any risk. Acting fast makes a real difference.' },
            { heading: 'When to get help — urgently', body: 'Treat this as an emergency. Contact emergency services, a crisis team, or your maternity or mental health team straight away for sudden psychotic or severe mood symptoms after birth, and immediately if there is any risk to the parent or baby. Prompt help leads to recovery.' },
        ],
        sources: [WHO_ICD11],
    },
};
