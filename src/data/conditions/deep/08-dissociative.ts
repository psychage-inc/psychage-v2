/**
 * Deep content — Dissociative disorders (ICD-11 6B60–6B66).
 *
 * Dissociation is an involuntary disconnection from one's mind, body, memories, identity, or
 * surroundings, often linked to overwhelming stress or trauma. The copy is trauma-informed,
 * de-stigmatising (especially for DID, which is widely sensationalised), and culturally
 * respectful (trance/possession are disorders only when involuntary, unwanted, and distressing).
 * Plain-language, non-diagnostic, no drug dosing. ICD-11 / DSM-5-TR framed.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

const NHS_DISS = { label: 'NHS — Dissociative disorders', url: 'https://www.nhs.uk/mental-health/conditions/dissociative-disorders/' };

export const dissociativeDeep: ConditionDeepMap = {
    'dissociative-neurological-symptom-disorder': {
        short_definition:
            'A condition (also called functional neurological symptom disorder) in which a person has real neurological symptoms — such as weakness, paralysis, seizures, tremor, difficulty walking, or loss of sensation, vision, or speech — that are genuine and disabling, but are not explained by a disease of the nervous system. The symptoms reflect a problem in how the brain functions rather than structural damage, and they can improve with the right support.',
        what_it_feels_like:
            'The symptoms are real and not under the person’s control — a limb that will not move, episodes that look like seizures, numbness, or loss of speech — and can be frightening and disabling. People are often distressed to be told tests are "normal", and may feel disbelieved. Understanding that the symptoms are genuine, common, and treatable is an important first step.',
        how_it_differs:
            'Unlike a stroke, epilepsy, or another disease that damages the nervous system, here the structure is intact but the brain’s functioning is disrupted — like a software rather than hardware problem. Unlike "putting it on", the symptoms are involuntary and real. Distinguishing it from neurological disease requires careful assessment, since the two can also coexist.',
        when_more_than_everyday:
            'Any new neurological symptom — weakness, seizures, numbness, problems with vision, speech, or walking — needs prompt medical assessment to find the cause. Where tests show no disease but the symptoms persist and disable, this condition may be the explanation, and specific help is available.',
        sections: [
            { heading: 'Signs and symptoms', body: 'Symptoms can affect movement (weakness or paralysis, tremor, abnormal walking, jerks), sensation (numbness, loss of vision, hearing, or speech), or take the form of dissociative (non-epileptic) seizures that resemble epileptic ones. They are genuine, often fluctuate, and can be disabling. Characteristic features in the way symptoms behave help clinicians recognise the condition positively, not just by excluding disease.' },
            { heading: 'Who it affects', body: 'Functional neurological symptoms are among the most common reasons people see a neurologist, and can affect anyone, at any age. They are more often diagnosed in women. They frequently arise at times of stress, but not always, and can also occur alongside genuine neurological disease.' },
            { heading: 'What causes it', body: 'The condition reflects a disruption in how the brain sends and processes signals — a functioning problem, not damage. Stress, trauma, pain, illness, or a physical trigger can set it off, though sometimes no clear trigger is found. It is increasingly understood through brain science, and the message that symptoms are "all in the mind" is outdated and unhelpful.' },
            { heading: 'How it’s recognised', body: 'Diagnosis is made by a neurologist or specialist who looks for positive signs typical of functional symptoms and ensures other conditions are appropriately assessed. It is not a diagnosis of exclusion alone. In ICD-11 it is coded 6B60. A clear, believing explanation of the diagnosis is itself part of treatment.' },
            { heading: 'Treatment and what helps', body: 'Treatment is collaborative and tailored. Understanding the diagnosis (that symptoms are real and potentially reversible) helps. Physiotherapy retrains movement for motor symptoms; specific psychological therapy helps with seizures and with any stress or trauma involved; and occupational therapy supports daily function. Many people improve significantly, particularly with early, joined-up care.' },
            { heading: 'Recovery and self-management', body: 'Recovery often involves relearning normal movement or function with guidance, managing triggers and stress, and pacing activity. Progress can fluctuate. Believing the symptoms are real while understanding they can change, and engaging actively with rehabilitation, support better outcomes.' },
            { heading: 'For family and friends', body: 'Take the symptoms seriously — they are genuine and not deliberate. Avoid suggesting the person is faking, and support their rehabilitation and any psychological therapy. Encourage activity within their limits and patience with a fluctuating course. A believing, supportive attitude genuinely aids recovery.' },
            { heading: 'When to get help', body: 'Seek prompt medical assessment for any new neurological symptom to identify the cause. If functional neurological symptoms are diagnosed, specialist rehabilitation and psychological support help. Seek urgent care for sudden severe symptoms (such as one-sided weakness or speech loss) to rule out a stroke.' },
        ],
        sources: [WHO_ICD11],
    },

    'dissociative-amnesia': {
        short_definition:
            'An inability to recall important personal memories — usually of stressful or traumatic events — that is too extensive to be ordinary forgetting and is not due to a physical condition or substance. The memories are not lost but blocked from awareness, and the gap can range from specific events to whole periods of life. It is usually linked to overwhelming stress, and memory often returns with safety and support.',
        what_it_feels_like:
            'A person may find they cannot remember a traumatic event, a period of time, or even personal information about themselves, often becoming aware of the gap when others mention things they cannot recall. It can be disorienting and distressing. The forgetting is involuntary — a way the mind has protected itself from something overwhelming.',
        how_it_differs:
            'Unlike everyday forgetfulness, the memory loss is extensive, centres on stressful or important personal information, and is out of keeping with normal forgetting. Unlike amnesia from a head injury, dementia, or substances, there is no physical cause — which must be checked for. It is understood as a dissociative response to overwhelming experience.',
        when_more_than_everyday:
            'When a person cannot recall important personal experiences — especially around stressful or traumatic events — to a degree well beyond normal forgetting, and this causes distress or difficulty, it is worth seeking assessment. A medical check is needed first to rule out physical causes of memory loss.',
        sections: [
            { heading: 'Signs and symptoms', body: 'The core feature is an inability to recall important autobiographical information, usually of a stressful or traumatic nature, that is too great to be normal forgetting. It may be localised (a specific period), selective (parts of an event), or, more rarely, generalised (loss of identity and life history). In some cases a person may travel or wander in a confused state (a "fugue"). The person is otherwise able to learn and remember new information.' },
            { heading: 'Who it affects', body: 'Dissociative amnesia is uncommon and is strongly associated with severe stress or trauma, including abuse, accidents, disasters, or combat. It can occur at any age. Episodes may be brief or last longer, and memory may return suddenly or gradually.' },
            { heading: 'What causes it', body: 'It is understood as the mind’s way of protecting itself from memories that are too overwhelming to integrate, by blocking them from conscious awareness. Severe or repeated trauma, especially early in life, raises the risk. It is not faking, and it is not the same as choosing to forget.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies the memory loss, its link to stress, and its extent, after ruling out physical causes (head injury, neurological conditions, substances) with appropriate assessment. In ICD-11 it is coded 6B61. A safe, unpressured approach is important, since pushing to "recover" memories can be harmful.' },
            { heading: 'Treatment and what helps', body: 'Treatment focuses first on safety and stability, then on trauma-informed psychological therapy that supports the person at their own pace. Memory often returns as the person feels safe; therapy does not force recall but helps process the underlying trauma and manage distress. Treating any co-occurring depression, anxiety, or PTSD matters too.' },
            { heading: 'A note on memory', body: 'Memory is reconstructive and can be influenced by suggestion, so careful, non-leading approaches are used and "memory recovery" techniques that risk creating false memories are avoided. The aim is the person’s wellbeing and safety, not extracting a precise account of the past.' },
            { heading: 'For family and friends', body: 'Be patient and reassuring, avoid pressuring the person to remember, and do not fill in gaps with details that could distort memory. Support their sense of safety and their engagement with trauma-informed care. Recognise the forgetting as protective, not deliberate.' },
            { heading: 'When to get help', body: 'Seek assessment for significant, unexplained memory loss — a medical check comes first to rule out physical causes. If the amnesia is linked to trauma and causing distress, trauma-informed support helps. Seek urgent help if the person is disoriented, at risk, or having thoughts of self-harm.' },
        ],
        sources: [WHO_ICD11, NHS_DISS],
    },

    'trance-disorder': {
        short_definition:
            'A condition involving an involuntary, unwanted trance state — a marked narrowing or loss of the usual sense of personal identity and awareness of surroundings, with limited and repetitive movements, speech, or behaviours that feel outside the person’s control. It is diagnosed only when the trance is unwanted, distressing, or impairing, and is not part of an accepted cultural, religious, or spiritual practice.',
        what_it_feels_like:
            'During an episode, a person’s awareness narrows: they may become unresponsive to their surroundings, repeat simple movements or words, and afterwards have little memory of it. The episodes are involuntary and can be frightening or disruptive, and the person does not choose to enter or stay in the state.',
        how_it_differs:
            'Unlike trance states that are sought and valued within religious, cultural, or meditative practice (which are not disorders), this trance is involuntary, unwanted, and distressing or impairing. Unlike a seizure, it is a dissociative state, though medical causes must be excluded. Cultural context is central to the judgment.',
        when_more_than_everyday:
            'When trance-like episodes occur involuntarily, are unwanted, and cause distress or disrupt life — and are not part of an accepted cultural or spiritual practice — it is worth seeking assessment, including a medical check to exclude other causes such as seizures.',
        sections: [
            { heading: 'Signs and symptoms', body: 'A trance state involves a temporary, marked alteration in consciousness with a narrowing of awareness of immediate surroundings, or a loss of the usual sense of identity, accompanied by a restricted, repetitive set of movements, postures, or speech that feel beyond the person’s control. Episodes are typically brief and followed by partial or no memory of them.' },
            { heading: 'Who it affects', body: 'Involuntary trance disorder is uncommon. Trance states themselves occur widely across cultures, very often as valued, accepted practices; it is only the involuntary, unwanted, distressing form, outside accepted practice, that is considered a disorder. It can be associated with stress or trauma.' },
            { heading: 'What causes it', body: 'It is understood as a dissociative response, often linked to stress, trauma, or strong emotional states. Cultural and contextual factors shape how it appears. As with other dissociative conditions, it is involuntary, not chosen.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses the nature of the episodes, whether they are involuntary and unwanted, their cultural context, and their impact, and excludes medical causes such as epilepsy. In ICD-11 it is coded 6B62. Cultural humility is essential — accepted spiritual or religious trance is not a disorder.' },
            { heading: 'Treatment and what helps', body: 'Where the trance is a disorder, treatment is trauma-informed and focuses on safety, reducing stress, and addressing any underlying trauma or distress with psychological therapy. Grounding techniques can help reduce episodes. Respect for the person’s cultural and spiritual framework is part of good care.' },
            { heading: 'Living with it', body: 'Managing stress, identifying triggers, and using grounding strategies to stay connected to the present can reduce episodes. Support that respects the person’s cultural background, and addresses any underlying trauma, tends to help most.' },
            { heading: 'For family and friends', body: 'Keep the person safe during an episode, stay calm, and avoid alarm or judgment. Afterwards, offer reassurance. Support help-seeking and respect cultural and spiritual context. Encourage medical assessment to rule out other causes if episodes are new or frequent.' },
            { heading: 'When to get help', body: 'Seek assessment for involuntary, unwanted trance episodes that cause distress or disruption, including a medical check to exclude seizures or other conditions. If episodes put the person at risk, prioritise safety and prompt help.' },
        ],
        sources: [WHO_ICD11],
    },

    'possession-trance-disorder': {
        short_definition:
            'A condition involving involuntary, unwanted trance states in which a person’s usual sense of identity is replaced by an external "possessing" identity — they may speak, move, or act as though they are someone or something else, with little control or later memory. It is diagnosed only when these states are involuntary, unwanted, distressing or impairing, and are not part of an accepted cultural, religious, or spiritual practice.',
        what_it_feels_like:
            'During an episode, the person seems to be taken over by another identity and may speak or behave very differently, often with little awareness or memory afterwards. The experience is involuntary and can be distressing and disruptive for the person and those around them, and is not something they choose or can easily stop.',
        how_it_differs:
            'Unlike possession experiences that are sought, valued, and accepted within a person’s religion or culture (which are not disorders), this form is involuntary, unwanted, and harmful or distressing. Unlike dissociative identity disorder, the identities are experienced as external "possessing" agents rather than parts of the self. Cultural context is essential to the judgment.',
        when_more_than_everyday:
            'When possession-trance episodes are involuntary, unwanted, and cause distress or disruption — and fall outside accepted cultural or religious practice — it is worth seeking assessment, including a medical check to exclude other causes.',
        sections: [
            { heading: 'Signs and symptoms', body: 'During episodes, the person’s normal identity is replaced by a "possessing" identity, and they may speak, move, or behave as that identity, sometimes with dramatic changes in voice or manner. Awareness of surroundings narrows, control is lost, and there is often partial or no memory afterwards. Episodes are involuntary and recurrent.' },
            { heading: 'Who it affects', body: 'It is uncommon as a disorder. Possession and trance experiences are common and accepted in many cultures and religions, where they are not disorders. The disorder applies only to involuntary, unwanted, distressing experiences outside such accepted practice. It is often linked to stress or trauma.' },
            { heading: 'What causes it', body: 'It is understood as a dissociative response, shaped strongly by cultural context and often related to stress, trauma, or intense emotional or social pressures. As with other dissociative conditions, the states are involuntary, not chosen or faked.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses whether the episodes are involuntary and unwanted, their cultural and religious context, and their impact, and excludes medical and other causes. In ICD-11 it is coded 6B63. Distinguishing a disorder from a culturally accepted practice requires cultural sensitivity and, often, input from the person’s community.' },
            { heading: 'Treatment and what helps', body: 'Treatment, where the experiences are a disorder, is trauma-informed and respectful of the person’s cultural and spiritual world: ensuring safety, reducing stress, and addressing underlying trauma or conflict through psychological therapy. Working with, rather than against, the person’s cultural framework supports engagement and recovery.' },
            { heading: 'Living with it', body: 'Reducing stress, managing triggers, grounding strategies, and culturally respectful support all help. Because culture shapes the experience deeply, care that honours the person’s beliefs and community tends to be most effective.' },
            { heading: 'For family and friends', body: 'Keep the person safe during episodes, stay calm, and avoid fear-driven responses. Respect cultural and religious context while supporting access to assessment and care where the experiences are unwanted and harmful. Afterwards, offer reassurance and support.' },
            { heading: 'When to get help', body: 'Seek assessment when possession-trance episodes are involuntary, unwanted, and distressing or disruptive, including a medical check to rule out other causes. Prioritise safety if the person is at risk during episodes.' },
        ],
        sources: [WHO_ICD11],
    },

    'dissociative-identity-disorder': {
        short_definition:
            'A condition in which a person’s identity is split across two or more distinct personality states, each with its own way of experiencing and relating to the world, which recurrently take control of the person’s behaviour. It is usually rooted in severe, repeated childhood trauma, and — despite how it is sensationalised in films — it is a real, understandable, and treatable response to overwhelming early experiences.',
        what_it_feels_like:
            'People may experience marked discontinuities in their sense of self and agency — gaps in memory for everyday events, finding evidence of things they do not remember doing, hearing distinct internal "voices" or parts, and feeling that at times they are not in control of their actions, thoughts, or body. It can be confusing and frightening, and is often accompanied by other trauma-related difficulties.',
        how_it_differs:
            'Unlike the dramatic, dangerous caricature in popular media, DID is usually subtle, hidden, and centred on coping with trauma rather than on harm to others. Unlike psychosis, the experiences are dissociative (a fragmentation of identity and memory) rather than a loss of contact with reality. It develops as a survival response to severe early trauma.',
        when_more_than_everyday:
            'When a person experiences distinct shifts in identity, significant gaps in memory for everyday events, and a recurring sense of not being in control of their actions — often alongside a history of severe trauma — specialist, trauma-informed assessment is warranted. These experiences are understandable and treatable.',
        sections: [
            { heading: 'Signs and symptoms', body: 'DID involves two or more distinct personality states with discontinuities in sense of self, agency, behaviour, memory, perception, or thinking. People often have amnesia — gaps in memory for everyday events, personal information, or trauma — that goes beyond ordinary forgetting. Many also experience intrusive thoughts or "voices", depersonalisation, and other trauma-related symptoms. The condition is frequently hidden, and people may have spent years undiagnosed or misdiagnosed.' },
            { heading: 'Who it affects', body: 'DID is uncommon and is strongly associated with severe, repeated trauma in early childhood, usually before the sense of self has consolidated. It is more often identified in women. Because it is hidden and easily mistaken for other conditions, recognition often comes only after years of difficulty.' },
            { heading: 'What causes it', body: 'DID is understood as a survival adaptation to overwhelming, repeated trauma in early childhood — when a child cannot escape, the mind can compartmentalise unbearable experiences, and a unified sense of self may not fully form. It is a response to what happened to the person, not a sign of being "dangerous" or "broken".' },
            { heading: 'How it’s recognised', body: 'Diagnosis requires careful, specialist, trauma-informed assessment over time, distinguishing DID from psychosis, borderline personality patterns, and other conditions, and avoiding both over- and under-diagnosis. In ICD-11 it is coded 6B64. A safe, trusting, paced process is essential, given the trauma involved.' },
            { heading: 'Treatment and what helps', body: 'Treatment is long-term, phased, and trauma-informed: first establishing safety and stability and skills for managing emotions and dissociation; then, when ready, processing traumatic memories; and finally supporting integration and a more cohesive sense of self and life. The aim is greater internal cooperation, safety, and functioning. A steady therapeutic relationship is central, and recovery is possible.' },
            { heading: 'Living with DID', body: 'Many people with DID live meaningful lives, especially with support. Helpful approaches include grounding skills for dissociation, routines and safety planning, internal communication and cooperation between parts (with therapeutic guidance), and treating co-occurring conditions. Self-understanding and reducing shame are important parts of recovery.' },
            { heading: 'For family and friends', body: 'Set aside sensationalised media portrayals — DID is usually about coping with past trauma, not danger. Be patient, consistent, and trustworthy; respect the person’s experience without forcing it; and support their trauma-informed treatment. Take dissociation and any self-harm risk seriously, and look after yourself too.' },
            { heading: 'When to get help', body: 'Seek specialist, trauma-informed help for distinct identity shifts, significant memory gaps, and a sense of not being in control, particularly with a trauma history. If there are thoughts of suicide or self-harm — a real risk — seek urgent help immediately. Recovery is possible with appropriate, paced support.' },
        ],
        sources: [WHO_ICD11, NHS_DISS],
    },

    'partial-dissociative-identity-disorder': {
        short_definition:
            'A condition similar to dissociative identity disorder in which a person has two or more distinct personality states, but one state usually remains dominant and in control of everyday life, while the others intrude — through thoughts, emotions, voices, urges, or actions — without fully taking over. Like DID, it is rooted in severe trauma and is treatable with trauma-informed care.',
        what_it_feels_like:
            'A person mostly functions through one main sense of self, but experiences intrusions from other parts: unbidden thoughts or emotions that feel "not mine", internal voices, urges, or moments where another part briefly influences behaviour, often without a full switch or memory gap. It can feel confusing and distressing, and frequently goes unrecognised.',
        how_it_differs:
            'Unlike full DID, the non-dominant identity states do not usually take complete control of behaviour, and amnesia for everyday events is less prominent — instead, the other parts intrude on the dominant self. Like DID, it stems from severe early trauma. It is more common than full DID and is easily mistaken for other conditions.',
        when_more_than_everyday:
            'When a person experiences persistent intrusions of "not-me" thoughts, emotions, voices, or urges, alongside a sense of fragmented identity and often a trauma history, specialist, trauma-informed assessment is warranted. These experiences are understandable responses to trauma and can be helped.',
        sections: [
            { heading: 'Signs and symptoms', body: 'There are two or more distinct personality states, but one is dominant in daily life. The others intrude — as intrusive thoughts, emotions, sensations, voices, or urges, or brief influences on behaviour — without fully taking control. Memory gaps for everyday events are usually less prominent than in full DID. People often experience depersonalisation and other trauma-related symptoms.' },
            { heading: 'Who it affects', body: 'Partial DID is thought to be more common than full DID and, like it, is strongly linked to severe, repeated early trauma. It is frequently undiagnosed or misdiagnosed because the intrusions can resemble other conditions and because the dominant self carries on functioning.' },
            { heading: 'What causes it', body: 'As with DID, it is understood as an adaptation to overwhelming, repeated childhood trauma, in which parts of experience are compartmentalised. The intrusions reflect those split-off parts making themselves felt. It is a response to trauma, not a character flaw or a sign of danger.' },
            { heading: 'How it’s recognised', body: 'Careful, specialist, trauma-informed assessment identifies the dominant state and intruding parts, distinguishing partial DID from psychosis, mood, and personality conditions. In ICD-11 it is coded 6B65. A safe, paced approach matters, as with all trauma-related dissociation.' },
            { heading: 'Treatment and what helps', body: 'Treatment mirrors that for DID: phased, trauma-informed therapy beginning with safety, stability, and skills for managing emotions and dissociation, then processing trauma when ready, and supporting greater internal cooperation and a more integrated self. Treating co-occurring conditions and reducing shame are part of recovery.' },
            { heading: 'Living with it', body: 'Helpful strategies include grounding for dissociation and intrusions, understanding the intruding parts as carrying parts of one’s history, building internal communication with therapeutic support, and steady routines. Many people improve meaningfully with the right help.' },
            { heading: 'For family and friends', body: 'Respond with patience and consistency, take dissociative experiences seriously without sensationalising them, and support trauma-informed treatment. Recognise intrusions as part of the condition. Take any self-harm risk seriously and seek help, and look after your own wellbeing.' },
            { heading: 'When to get help', body: 'Seek specialist, trauma-informed help for persistent "not-me" intrusions and a fragmented sense of identity, especially with a trauma history. If there are thoughts of suicide or self-harm, seek urgent help. Treatment can help, and recovery is possible.' },
        ],
        sources: [WHO_ICD11, NHS_DISS],
    },

    'depersonalization-derealization-disorder': {
        short_definition:
            'A condition involving persistent or recurrent experiences of feeling detached from oneself (depersonalisation) — as if watching oneself from outside, or feeling unreal or robotic — and/or feeling that the world around is unreal, dreamlike, or distant (derealisation). The person knows these experiences are not literally true, which can make them especially unsettling. It is often linked to stress, anxiety, or trauma, and is treatable.',
        what_it_feels_like:
            'People describe feeling cut off from themselves or the world: emotions feel muted or absent, the body or thoughts feel "not mine", or surroundings look flat, foggy, or like a film set. It can be frightening — many fear they are "going mad" — yet the person remains aware that the experience is a feeling, not reality. It is often worse with stress and tiredness.',
        how_it_differs:
            'Unlike psychosis, the person knows these experiences are not real and stays in touch with reality. Unlike the brief depersonalisation many people feel under stress, drugs, or exhaustion (which is common and not a disorder), here it is persistent or recurrent and distressing or impairing. It commonly accompanies anxiety, depression, and trauma.',
        when_more_than_everyday:
            'Brief feelings of unreality are common and harmless. It becomes a disorder worth treating when feelings of detachment from yourself or the world are persistent or recurrent, distressing, and interfere with life. Seeking help is reasonable, especially as it often improves with treatment of underlying anxiety or trauma.',
        sections: [
            { heading: 'Signs and symptoms', body: 'Depersonalisation: feeling detached from, or an outside observer of, one’s own thoughts, feelings, body, or actions — emotional numbing, feeling robotic or unreal, or as if in a dream. Derealisation: experiencing the surroundings as unreal, dreamlike, foggy, lifeless, or visually distorted. Throughout, the person knows the experience is not literally true (reality testing is intact), which is part of what makes it so distressing.' },
            { heading: 'Who it affects', body: 'Transient depersonalisation/derealisation is very common, especially under stress, fatigue, or after drug use. The disorder — persistent or recurrent and impairing — is less common and often begins in adolescence or early adulthood. It frequently accompanies anxiety, depression, and trauma.' },
            { heading: 'What causes it', body: 'It is understood as a protective response in which the mind "turns down" the intensity of experience under overwhelming stress, anxiety, or trauma. Severe stress, trauma, exhaustion, and sometimes cannabis or other drugs can trigger it. Worrying about the symptoms (fearing they mean madness or brain damage) can keep the cycle going.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies persistent or recurrent depersonalisation and/or derealisation with intact reality testing, and rules out other causes such as drugs, neurological conditions, or another mental health disorder. In ICD-11 it is coded 6B66. Reassurance that the experience, while distressing, is not dangerous or a sign of psychosis is itself helpful.' },
            { heading: 'Treatment and what helps', body: 'Treatment includes psychological therapy — particularly approaches that reduce the fear and self-monitoring that maintain the symptoms, and that address underlying anxiety, depression, or trauma. Grounding techniques help reconnect with the present. Treating co-occurring conditions, reducing cannabis and stimulant use, and improving sleep and stress management all support recovery.' },
            { heading: 'Coping with detachment', body: 'Grounding through the senses (noticing textures, sounds, temperature), staying engaged in activities rather than monitoring the symptoms, reducing stress and tiredness, and avoiding drugs that trigger episodes all help. Understanding that the feeling is a harmless, if unpleasant, protective response reduces the fear that fuels it.' },
            { heading: 'For family and friends', body: 'Reassure the person that the experience, while frightening, is not dangerous and does not mean they are "going mad". Encourage grounding, support treatment of any underlying anxiety or trauma, and be patient — the symptoms can be hard to describe and easy to feel alone with. Take any distress or self-harm risk seriously.' },
            { heading: 'When to get help', body: 'Seek help when feelings of detachment from yourself or the world are persistent, distressing, or interfere with life. If detachment comes with depression or thoughts of self-harm, seek help promptly. The condition is treatable, particularly alongside any underlying anxiety or trauma.' },
        ],
        sources: [WHO_ICD11, NHS_DISS],
    },
};
