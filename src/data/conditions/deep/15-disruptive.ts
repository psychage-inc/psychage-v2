/**
 * Deep content — Disruptive behaviour or dissocial disorders (ICD-11 6C90–6C91).
 *
 * Patterns of defiant, aggressive, or rule-breaking behaviour, usually in children and young
 * people. The copy avoids labelling children as "bad", looks at the distress and circumstances
 * behind behaviour, and stresses early support and that outcomes improve with help. Plain-language,
 * non-diagnostic. ICD-11 / DSM-5-TR framed.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

export const disruptiveDeep: ConditionDeepMap = {
    'oppositional-defiant-disorder': {
        short_definition:
            'A pattern, usually seen in children and young people, of markedly defiant, disobedient, argumentative, and often angry or irritable behaviour toward authority figures, that goes well beyond ordinary "testing the limits" and persists over time, causing problems at home, school, or with peers. It is not simply a "naughty" or "difficult" child — it is a recognised pattern that often reflects underlying distress, and it responds to support.',
        what_it_feels_like:
            'A child may seem frequently angry, easily frustrated, quick to argue, and resistant to rules and requests, sometimes deliberately annoying others or blaming them for their own mistakes. Beneath the behaviour, many children feel overwhelmed, anxious, or unhappy. Family life can become a series of conflicts, leaving everyone — including the child — exhausted and demoralised.',
        how_it_differs:
            'Unlike the normal defiance and boundary-testing of childhood and adolescence, ODD is more frequent, intense, and persistent, and clearly interferes with relationships and daily life. Unlike conduct-dissocial disorder, it does not typically involve serious violations of others’ rights or the law (such as serious aggression, theft, or destruction), though one can develop into the other.',
        when_more_than_everyday:
            'It is worth seeking help when a child’s anger, defiance, and arguing are frequent, intense, and persistent, are out of step with their age, and are seriously affecting family life, school, or friendships — beyond the ups and downs most children go through. Earlier support tends to work better and prevents difficulties from deepening.',
        sections: [
            { heading: 'Signs and features', body: 'The pattern includes a persistently angry or irritable mood (frequent loss of temper, being easily annoyed, resentful), argumentative and defiant behaviour (arguing with adults, refusing to follow rules, deliberately annoying others, blaming others for one’s mistakes), and sometimes spitefulness or vindictiveness. The behaviour is more frequent and severe than usual for the child’s age and lasts over months, across one or more settings.' },
            { heading: 'Who it affects', body: 'ODD is one of the more common behavioural difficulties of childhood, often appearing in the preschool or early school years. It frequently coexists with ADHD, anxiety, low mood, and learning difficulties, which can drive or worsen the behaviour. With support, many children improve, though some go on to other difficulties if unsupported.' },
            { heading: 'What causes it', body: 'It usually results from a mix of the child’s temperament, brain development and any co-occurring conditions (such as ADHD), and family and environmental factors such as stress, inconsistent or harsh discipline, conflict, or adversity. It is rarely about one cause, and it is not a sign of bad parenting or a bad child — it reflects a child struggling to manage emotions and demands.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses the pattern, frequency, and impact of the behaviour across settings, and looks for co-occurring conditions like ADHD, anxiety, or learning difficulties that may be driving it. In ICD-11 it is coded 6C90. Information from family and school is central, and the focus is on understanding the child, not labelling them.' },
            { heading: 'Treatment and support', body: 'Support is effective and usually centres on the family and school. Parenting programmes that build positive, consistent approaches and reduce conflict are particularly helpful, alongside support for the child to manage emotions, and treatment of any co-occurring ADHD, anxiety, or learning difficulties. School support and, sometimes, individual therapy add to this. Early, consistent help makes a real difference.' },
            { heading: 'Helping a child', body: 'Approaches that help include consistent, calm, and predictable boundaries, noticing and praising positive behaviour (rather than only reacting to problems), reducing conflict and power struggles, and addressing any underlying difficulties such as attention problems or anxiety. Children do better when the adults around them are supported too.' },
            { heading: 'For family and friends', body: 'Try to look beneath the behaviour to the distress or difficulty driving it, and avoid a cycle of escalating conflict and punishment, which tends to make things worse. Seek parenting support without shame — these programmes are effective and not a sign of failure — and work with school. Look after your own wellbeing, as parenting a child with ODD is demanding.' },
            { heading: 'When to get help', body: 'Speak to a GP, school, or child mental health service when defiance, anger, and arguing are frequent, intense, and harming family life, school, or friendships. Early support improves outcomes and can prevent more serious difficulties developing.' },
        ],
        sources: [WHO_ICD11],
    },

    'conduct-dissocial-disorder': {
        short_definition:
            'A repetitive, persistent pattern of behaviour, usually beginning in childhood or adolescence, that seriously violates the basic rights of others or major age-appropriate rules — such as aggression toward people or animals, destruction of property, deceitfulness or theft, and serious rule-breaking. It is a recognised mental health condition that often reflects underlying difficulties and adversity, and early, comprehensive support genuinely improves outcomes.',
        what_it_feels_like:
            'A young person may act aggressively, break rules and the law, lie or steal, or show little regard for others’ feelings or safety. Beneath this, many are struggling with unmet needs, trauma, difficult environments, or other conditions, even if the behaviour pushes people away. The pattern strains families, schools, and relationships and can have serious consequences for the young person’s future.',
        how_it_differs:
            'Unlike oppositional defiant disorder (defiance and anger without serious violation of others’ rights), conduct-dissocial disorder involves more serious behaviour — aggression, cruelty, destruction, deceit, theft, or major rule-breaking. Unlike occasional adolescent rule-breaking, the pattern is repetitive, persistent, and seriously harmful. It is distinct from antisocial behaviour fully explained by another condition or circumstance.',
        when_more_than_everyday:
            'It is worth seeking help when a child or young person repeatedly and seriously breaks rules and the law, is aggressive toward people or animals, destroys property, or lies and steals, in a sustained pattern — not isolated incidents. Early, joined-up support improves outcomes and reduces harm; this should not be left to "grow out of".',
        sections: [
            { heading: 'Signs and features', body: 'The pattern can include aggression toward people or animals (bullying, fighting, cruelty), destruction of property (including fire-setting), deceitfulness or theft (lying, breaking into places, stealing), and serious violations of rules (truancy, running away, staying out against rules). It is repetitive and persistent over time, and clearly more serious than ordinary misbehaviour. Some young people show limited empathy or remorse, while many are deeply affected by their circumstances.' },
            { heading: 'Who it affects', body: 'Conduct-dissocial disorder is one of the more common reasons young people are referred to mental health services. It is more often identified in boys. It frequently coexists with ADHD, learning difficulties, anxiety, depression, substance use, and a history of trauma or adversity, all of which need attention.' },
            { heading: 'What causes it', body: 'It arises from a complex mix of factors: temperament and brain development, co-occurring conditions (such as ADHD), and powerful environmental influences — exposure to violence, abuse or neglect, harsh or inconsistent parenting, poverty, and community adversity. It is rarely about a single cause, and understanding the whole picture is essential to helping.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses the pattern and seriousness of the behaviour over time and across settings, the young person’s circumstances and history, and any co-occurring conditions, often working with family, school, and other services. In ICD-11 it is coded 6C91. The aim is understanding and support, not simply labelling.' },
            { heading: 'Treatment and support', body: 'Outcomes improve with early, comprehensive support that involves the family, school, and sometimes other services. Family- and parenting-based interventions, support for the young person to manage emotions and relationships, treatment of co-occurring conditions (ADHD, trauma, substance use, depression), and addressing the wider environment all help. Multi-component, well-coordinated programmes are most effective. Support works better than punishment alone.' },
            { heading: 'A hopeful view', body: 'Although the behaviour can be serious, many young people do better with the right help, especially when support starts early and addresses underlying needs and circumstances rather than only the behaviour. Stable, caring relationships and opportunities are powerful protective factors.' },
            { heading: 'For family and friends', body: 'Seek help early and engage with the services involved — outcomes are better with coordinated support. Try to address underlying needs and circumstances, not just the behaviour, set clear and consistent boundaries with support, and prioritise safety where there is risk. Caring for a young person with these difficulties is hard, so seek support for yourself too.' },
            { heading: 'When to get help', body: 'Contact a GP, school, or child and adolescent mental health service for a sustained pattern of serious rule-breaking, aggression, or harm to others. Where there is immediate risk to anyone’s safety, involve the appropriate services. Early, comprehensive help offers the best chance of a positive future.' },
        ],
        sources: [WHO_ICD11],
    },
};
