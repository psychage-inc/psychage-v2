/**
 * Deep content — Catatonia (ICD-11 6A40–6A41).
 *
 * Catatonia is a serious but highly treatable syndrome of disturbed movement, speech, and
 * behaviour that occurs alongside another mental or medical condition, or is brought on by
 * substances/medications. The copy stresses two things: it is a medical situation that needs
 * prompt assessment, and it usually responds well to treatment. Plain-language, non-diagnostic.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

export const catatoniaDeep: ConditionDeepMap = {
    'catatonia-associated-with-another-mental-disorder': {
        short_definition:
            'A syndrome in which movement, speech, and responsiveness are markedly disturbed — a person may become still, silent, and unresponsive, hold unusual postures, resist being moved, or, at the other extreme, become very agitated. It occurs alongside another mental health condition (such as a mood disorder, schizophrenia, or autism). It is important to recognise because it is usually very treatable, often quickly.',
        what_it_feels_like:
            'From the outside, a person may appear "frozen" — not moving, not speaking, not reacting — or may repeat others’ words or movements, hold stiff or odd postures, or resist gentle attempts to move them. Some people become highly agitated and restless instead. It is frightening for families, who often feel they have "lost" the person. With treatment, the person usually returns to themselves.',
        how_it_differs:
            'Catatonia is not usually a condition on its own — it appears as part of another mental disorder. Unlike someone simply choosing not to respond, the person cannot easily control it. Unlike the slowing of severe depression alone, catatonia involves specific features such as posturing, rigidity, resistance to movement, or echoing others. And unlike a neurological movement disorder, it is tied to a mental health condition and responds to specific psychiatric treatment.',
        when_more_than_everyday:
            'A sudden, marked change in movement and responsiveness — becoming unresponsive, mute, or "frozen", holding rigid postures, or becoming severely agitated — needs urgent medical assessment. Untreated catatonia can become dangerous (through dehydration, immobility, or exhaustion), so it should be treated as an emergency, not waited out.',
        sections: [
            { heading: 'Signs and symptoms', body: 'Catatonia is recognised by a cluster of features affecting movement and behaviour. These can include: stupor (little or no movement or response to surroundings), mutism (little or no speech), holding fixed or unusual postures, "waxy flexibility" (limbs staying where they are placed), negativism (resisting instructions or movement for no clear reason), repeating others’ words (echolalia) or movements (echopraxia), grimacing, and stereotyped or purposeless movement. Some people show the opposite — excessive, agitated, undirected activity.\n\nA person does not need all of these; a few, appearing together and clearly out of character, point to catatonia.' },
            { heading: 'When and with whom it occurs', body: 'Catatonia most often occurs during a severe episode of a mood disorder (depression or bipolar disorder) or a psychotic disorder such as schizophrenia, and can also occur with autism and some other conditions. It can develop over hours to days. It is more common than is often realised, partly because it can be mistaken for the underlying condition alone.' },
            { heading: 'What causes it', body: 'Catatonia reflects a temporary disturbance in how the brain regulates movement and behaviour during a severe mental health episode. The exact mechanisms are still being studied, but it is understood to involve brain chemical systems that can be helped by specific treatments. It is not "putting it on" and not within the person’s control.' },
            { heading: 'How it’s recognised', body: 'Doctors recognise catatonia from the characteristic signs and often by examining how the person responds to movement and instructions; standard checklists help. A medical work-up looks for and rules out physical causes (such as infections or neurological conditions), since these need different treatment. Sometimes a small dose of a specific medication is used as a diagnostic test, because rapid improvement supports the diagnosis. In ICD-11 it is coded 6A40.' },
            { heading: 'Treatment and what helps', body: 'Catatonia is one of the more treatable conditions in psychiatry, and treatment can work quickly. Specific medications (notably benzodiazepines) often bring marked improvement, and where these are not enough, electroconvulsive therapy (ECT) is highly effective and can be life-saving. Alongside this, the underlying condition (such as depression or psychosis) is treated, and the person is kept safe, hydrated, and physically well while they recover. Treatment is always directed by doctors.' },
            { heading: 'Why prompt care matters', body: 'Most people recover well, especially when catatonia is recognised and treated early. Left untreated, it can lead to serious complications from not eating, drinking, or moving, and a severe form (sometimes called malignant catatonia, with fever and unstable vital signs) is a medical emergency. This is why catatonia is treated promptly rather than observed.' },
            { heading: 'For family and friends', body: 'If someone close to you suddenly becomes unresponsive, "frozen", mute, or strangely rigid or agitated, seek urgent medical help — describe exactly what you are seeing. Stay calm, keep them safe, and don’t assume they are choosing not to respond. Your account of how quickly it came on and what the person is normally like is valuable to the medical team.' },
            { heading: 'When to get help', body: 'Treat a sudden, marked change in movement and responsiveness as a medical emergency — go to emergency services or call for urgent help. This is especially important if there is fever, a racing heart, or the person cannot eat or drink. Early treatment usually leads to full recovery.' },
        ],
        sources: [WHO_ICD11],
    },

    'catatonia-induced-by-substances-or-medications': {
        short_definition:
            'The same syndrome of disturbed movement, speech, and responsiveness as other forms of catatonia, but brought on by a substance or medication — for example certain prescribed drugs, drug withdrawal, or recreational drugs. A person may become unresponsive and rigid, or agitated. Recognising the cause matters, because treatment includes addressing the substance or medication involved.',
        what_it_feels_like:
            'As with other catatonia, the person may appear frozen, mute, and unresponsive, hold unusual postures, resist movement, or become very agitated — a striking change from how they usually are. Those around them are often alarmed by how suddenly the person seems to "switch off" or change.',
        how_it_differs:
            'The key difference is the cause: here, catatonia is linked in time to a substance or medication — starting it, stopping it, or a reaction to it — rather than arising purely from a mental health episode. Identifying the substance or drug is central, because adjusting or stopping it (under medical care) is part of treatment. Otherwise it looks like other forms of catatonia.',
        when_more_than_everyday:
            'A sudden, marked change in movement and responsiveness in someone who has recently started or stopped a medication, or used drugs or alcohol, needs urgent medical assessment. As with all catatonia, it can become dangerous if untreated, so it should be treated as an emergency.',
        sections: [
            { heading: 'Signs and symptoms', body: 'The features are the same as in other catatonia: stupor (little movement or response), mutism, holding fixed or unusual postures, rigidity, resistance to movement, repeating others’ words or actions, and at times agitated, purposeless activity. What distinguishes this form is the timing — the symptoms appear in close connection with a substance or medication.' },
            { heading: 'What can cause it', body: 'A range of substances and medications can be involved. These include some prescribed psychiatric and other medications, the withdrawal of certain drugs (for example sedatives), and some recreational drugs. Because medications affect people differently, this can happen even when a drug is taken as prescribed. The link is identified by the timing and the medical history.' },
            { heading: 'Who it affects', body: 'This form can affect anyone exposed to the substance or medication involved, including people receiving treatment for another mental or physical health condition. It is uncommon, but important to consider whenever catatonia appears in someone who has recently changed medication or used drugs or alcohol.' },
            { heading: 'How it’s recognised', body: 'Doctors recognise the catatonia from its signs and then look carefully at what substances or medications the person has recently taken, started, or stopped, ruling out other medical and psychiatric causes. A clear time link between the substance and the symptoms supports the diagnosis. In ICD-11 it is coded 6A41.' },
            { heading: 'Treatment and what helps', body: 'Treatment has two parts: managing the catatonia itself — often with specific medication (such as benzodiazepines), and ECT where needed — and addressing the cause, by safely adjusting or stopping the responsible medication or managing withdrawal, always under medical supervision. The person is kept safe and physically well while recovering. Never stop a prescribed medication abruptly on your own; this is done with a doctor.' },
            { heading: 'Why prompt care matters', body: 'As with other catatonia, early recognition and treatment usually lead to full recovery, while delay risks complications from not eating, drinking, or moving. Some drug reactions can also cause a severe form with fever and unstable vital signs, which is a medical emergency. Identifying the substance quickly also prevents further harm.' },
            { heading: 'For family and friends', body: 'If someone becomes suddenly unresponsive, rigid, mute, or agitated — especially after a change in medication or use of drugs or alcohol — seek urgent medical help and tell the team exactly what they have taken and when. Bring medication packets or details if you can. Keep the person safe, and do not assume they are simply intoxicated and will "sleep it off".' },
            { heading: 'When to get help', body: 'Treat a sudden, marked change in movement and responsiveness as an emergency, particularly when a substance or medication may be involved, or if there is fever or a racing heart. Contact emergency services straight away; prompt treatment, including stopping the cause safely, usually leads to recovery.' },
        ],
        sources: [WHO_ICD11],
    },
};
