import type { ConditionSeed } from '@/types/condition';

/**
 * ICD-11 Chapter 6 — Impulse control disorders, Disruptive behaviour or dissocial
 * disorders, Personality disorders and related traits, Paraphilic disorders, and
 * Factitious disorders.
 *
 * Paraphilic categories describe patterns that, as ICD-11 defines them, involve acting
 * on or being distressed by urges toward non-consenting people or where there is risk
 * of harm. Copy stays plain, non-diagnostic, and centred on consent and harm. All rows
 * land unverified for clinical review.
 */
export const impulseDisruptivePersonalityParaphilicFactitious: ConditionSeed[] = [
    // --- Impulse control disorders ------------------------------------------
    {
        slug: 'pyromania',
        name: 'Pyromania',
        icd11_code: '6C70',
        icd11_grouping: 'Impulse control disorders',
        short_definition:
            'A recurring failure to resist strong urges to set fires, with a build-up of tension before and a sense of release or interest afterward.',
        what_it_feels_like:
            'A person may feel mounting tension and a powerful pull toward fire, then relief or fascination once a fire is set, not for revenge or gain but driven by the urge itself.',
        how_it_differs:
            'Unlike fire-setting for profit, revenge, or as part of another disorder, here the act is driven by an urge and fascination with fire. Unlike a one-off, the pattern recurs and is hard to resist.',
        when_more_than_everyday:
            'When urges to set fires recur, are hard to resist, and lead to fire-setting that risks serious harm. This needs professional support.',
        provenance: 'ICD-11 6C70 / DSM-5-TR Pyromania',
    },
    {
        slug: 'kleptomania',
        name: 'Kleptomania',
        icd11_code: '6C71',
        icd11_grouping: 'Impulse control disorders',
        short_definition:
            'A recurring failure to resist urges to steal items that are not needed for use or value, with tension before and relief afterward.',
        what_it_feels_like:
            'A person may feel rising tension and a strong urge to take something, then relief or release after taking it, often feeling guilt or shame later. The items are usually not needed or wanted.',
        how_it_differs:
            'Unlike ordinary theft for gain, the items have little use or value and the act is driven by an urge. Unlike a planned crime, it is impulsive and followed by distress.',
        when_more_than_everyday:
            'When urges to steal recur, are hard to resist, and lead to taking things not needed — causing distress or legal and personal harm. Support can help.',
        provenance: 'ICD-11 6C71 / DSM-5-TR Kleptomania',
    },
    {
        slug: 'compulsive-sexual-behaviour-disorder',
        name: 'Compulsive sexual behaviour disorder',
        icd11_code: '6C72',
        icd11_grouping: 'Impulse control disorders',
        short_definition:
            'A persistent pattern of failing to control intense sexual urges, leading to repetitive sexual behaviour that continues despite causing harm or distress.',
        what_it_feels_like:
            'A person may feel that sexual urges and activity have taken over, spend a great deal of time on them, try and fail to cut back, and continue even when it harms their health, relationships, or responsibilities.',
        how_it_differs:
            'Unlike a paraphilic disorder, the urges are not defined by an unusual focus but by a loss of control over ordinary sexual behaviour. Unlike a high sex drive alone, the behaviour is distressing and hard to control.',
        when_more_than_everyday:
            'When sexual urges and behaviour feel out of control for many months, continue despite harm, and bring little satisfaction. Support can help.',
        provenance: 'ICD-11 6C72 / Compulsive Sexual Behaviour Disorder',
    },
    {
        slug: 'intermittent-explosive-disorder',
        name: 'Intermittent explosive disorder',
        icd11_code: '6C73',
        icd11_grouping: 'Impulse control disorders',
        short_definition:
            'Repeated, sudden outbursts of anger or aggression that are far out of proportion to the situation and hard to control.',
        what_it_feels_like:
            'A person may have brief explosions of rage — shouting, breaking things, or lashing out — that erupt quickly over minor triggers, then feel regret or embarrassment once the moment passes.',
        how_it_differs:
            'Unlike planned aggression, the outbursts are impulsive and quickly over. Unlike ordinary irritability, they are intense, out of proportion, and cause real harm or distress.',
        when_more_than_everyday:
            'When anger outbursts are frequent, far out of proportion to triggers, and harm relationships, property, or safety. Support can help.',
        provenance: 'ICD-11 6C73 / DSM-5-TR Intermittent Explosive Disorder',
    },

    // --- Disruptive behaviour or dissocial disorders ------------------------
    {
        slug: 'oppositional-defiant-disorder',
        name: 'Oppositional defiant disorder',
        icd11_code: '6C90',
        icd11_grouping: 'Disruptive behaviour or dissocial disorders',
        short_definition:
            'A lasting pattern in children of defiant, argumentative, or irritable behaviour toward authority figures that is beyond what fits their age.',
        what_it_feels_like:
            'A child may often lose their temper, argue with adults, refuse to follow rules, blame others, and seem angry or easily annoyed, in a way that strains family and school life.',
        how_it_differs:
            'Unlike conduct-dissocial disorder, it does not usually involve serious violations of others’ rights such as aggression or theft. Unlike ordinary defiance, the pattern is frequent, lasting, and beyond what fits the child’s age.',
        when_more_than_everyday:
            'When defiant, irritable behaviour is frequent, lasts at least several months, and clearly disrupts family, school, or friendships — beyond typical testing of limits.',
        provenance: 'ICD-11 6C90 / DSM-5-TR Oppositional Defiant Disorder',
    },
    {
        slug: 'conduct-dissocial-disorder',
        name: 'Conduct-dissocial disorder',
        icd11_code: '6C91',
        icd11_grouping: 'Disruptive behaviour or dissocial disorders',
        short_definition:
            'A repeated pattern of behaviour in children or teens that violates others’ basic rights or major age-appropriate rules, such as aggression, deceit, or serious rule-breaking.',
        what_it_feels_like:
            'A young person may be aggressive toward people or animals, destroy property, lie or steal, or seriously break rules, in a pattern that causes real harm to others and to themselves.',
        how_it_differs:
            'Unlike oppositional defiant disorder, the behaviour involves serious violations of others’ rights, not just defiance. Unlike isolated incidents, the pattern is repeated and lasting.',
        when_more_than_everyday:
            'When serious rule-breaking or aggression forms a repeated pattern over time and harms others or the young person’s future. Early support can help.',
        provenance: 'ICD-11 6C91 / DSM-5-TR Conduct Disorder',
    },

    // --- Personality disorders and related traits ---------------------------
    {
        slug: 'personality-disorder',
        name: 'Personality disorder',
        icd11_code: '6D10',
        icd11_grouping: 'Personality disorders and related traits',
        short_definition:
            'A long-standing pattern in how a person sees themselves and relates to others that causes ongoing difficulty across many areas of life.',
        what_it_feels_like:
            'A person may struggle for years with a stable sense of self, managing emotions, or keeping close relationships, in ways that repeat across situations and feel hard to change. ICD-11 describes this along a range from mild to severe.',
        how_it_differs:
            'Unlike a passing reaction to stress, the pattern is enduring and shows up across many settings and relationships. Unlike a single mood or anxiety episode, it shapes a person’s broader way of relating over time.',
        when_more_than_everyday:
            'When long-standing patterns in self-image, emotions, and relationships repeatedly cause distress or difficulty across life — beyond an ordinary personality style. Support can help.',
        provenance: 'ICD-11 6D10 / DSM-5-TR Personality Disorders',
    },

    // --- Paraphilic disorders -----------------------------------------------
    {
        slug: 'exhibitionistic-disorder',
        name: 'Exhibitionistic disorder',
        icd11_code: '6D30',
        icd11_grouping: 'Paraphilic disorders',
        short_definition:
            'A sustained pattern of sexual arousal from exposing one’s genitals to non-consenting people, where the person has acted on the urges or is markedly distressed by them.',
        what_it_feels_like:
            'A person may have recurring urges to expose themselves to others who have not consented, and either act on these urges or feel significant distress about them.',
        how_it_differs:
            'Unlike consensual sexual expression, this centres on non-consenting others, which causes harm. Unlike a passing thought, the pattern is sustained and is either acted on or markedly distressing.',
        when_more_than_everyday:
            'When urges involving non-consenting people are acted on, or cause marked distress, over a sustained period. This needs professional assessment and support.',
        provenance: 'ICD-11 6D30 / DSM-5-TR Exhibitionistic Disorder',
    },
    {
        slug: 'voyeuristic-disorder',
        name: 'Voyeuristic disorder',
        icd11_code: '6D31',
        icd11_grouping: 'Paraphilic disorders',
        short_definition:
            'A sustained pattern of sexual arousal from secretly watching others who are undressing or being intimate without their consent, acted on or causing marked distress.',
        what_it_feels_like:
            'A person may have recurring urges to secretly observe others without their consent, and either act on these urges or feel significant distress about them.',
        how_it_differs:
            'Unlike consensual interests, this involves people who have not consented, which causes harm. Unlike a fleeting thought, the pattern is sustained and is either acted on or markedly distressing.',
        when_more_than_everyday:
            'When urges to watch non-consenting people are acted on, or cause marked distress, over a sustained period. This needs professional assessment and support.',
        provenance: 'ICD-11 6D31 / DSM-5-TR Voyeuristic Disorder',
    },
    {
        slug: 'pedophilic-disorder',
        name: 'Pedophilic disorder',
        icd11_code: '6D32',
        icd11_grouping: 'Paraphilic disorders',
        short_definition:
            'A sustained pattern of sexual arousal focused on pre-pubertal children, where the person has acted on the urges or is markedly distressed by them.',
        what_it_feels_like:
            'This involves recurring sexual urges or thoughts focused on children. ICD-11 defines the disorder by the person acting on these urges or being markedly distressed by them.',
        how_it_differs:
            'Unlike other paraphilic disorders, the focus is on children, who cannot consent and are seriously harmed by any sexual act. Acting on these urges is abuse and is a crime.',
        when_more_than_everyday:
            'Any acting on these urges harms children and requires immediate professional and legal involvement. People distressed by such urges can and should seek specialist help.',
        provenance: 'ICD-11 6D32 / DSM-5-TR Pedophilic Disorder',
    },
    {
        slug: 'coercive-sexual-sadism-disorder',
        name: 'Coercive sexual sadism disorder',
        icd11_code: '6D33',
        icd11_grouping: 'Paraphilic disorders',
        short_definition:
            'A sustained pattern of sexual arousal from inflicting physical or psychological suffering on a non-consenting person, acted on or causing marked distress.',
        what_it_feels_like:
            'This involves recurring urges to cause suffering to someone who has not consented. ICD-11 defines the disorder by the person acting on these urges or being markedly distressed by them.',
        how_it_differs:
            'Unlike consensual practices between agreeing adults, this centres on non-consenting people, who are harmed. Acting on these urges is abuse and is a crime.',
        when_more_than_everyday:
            'Any acting on these urges harms others and requires immediate professional and legal involvement. People distressed by such urges can seek specialist help.',
        provenance: 'ICD-11 6D33 / DSM-5-TR Sexual Sadism Disorder (coercive)',
    },
    {
        slug: 'frotteuristic-disorder',
        name: 'Frotteuristic disorder',
        icd11_code: '6D34',
        icd11_grouping: 'Paraphilic disorders',
        short_definition:
            'A sustained pattern of sexual arousal from touching or rubbing against a non-consenting person, where the urges are acted on or cause marked distress.',
        what_it_feels_like:
            'A person may have recurring urges to touch or rub against others without their consent, often in crowded places, and either act on these urges or feel significant distress about them.',
        how_it_differs:
            'Unlike consensual contact, this involves non-consenting people, who are harmed. Unlike a passing thought, the pattern is sustained and is either acted on or markedly distressing.',
        when_more_than_everyday:
            'When urges to touch non-consenting people are acted on, or cause marked distress, over a sustained period. This needs professional assessment and support.',
        provenance: 'ICD-11 6D34 / DSM-5-TR Frotteuristic Disorder',
    },
    {
        slug: 'other-paraphilic-disorder-involving-non-consenting-individuals',
        name: 'Other paraphilic disorder involving non-consenting individuals',
        icd11_code: '6D35',
        icd11_grouping: 'Paraphilic disorders',
        short_definition:
            'A sustained pattern of intense sexual arousal involving non-consenting people that does not fit the other named categories, acted on or causing marked distress.',
        what_it_feels_like:
            'This involves recurring sexual urges focused on people who have not consented, in a form not captured by the other categories, that the person acts on or is markedly distressed by.',
        how_it_differs:
            'Unlike the named paraphilic disorders, the specific focus differs, but it still centres on non-consenting people, who are harmed. Acting on these urges harms others.',
        when_more_than_everyday:
            'When urges involving non-consenting people are acted on, or cause marked distress, over a sustained period. This needs professional and, where others are harmed, legal involvement.',
        provenance: 'ICD-11 6D35 / Other paraphilic disorder involving non-consenting individuals',
    },
    {
        slug: 'paraphilic-disorder-involving-solitary-behaviour-or-consenting-individuals',
        name: 'Paraphilic disorder involving solitary behaviour or consenting individuals',
        icd11_code: '6D36',
        icd11_grouping: 'Paraphilic disorders',
        short_definition:
            'A pattern of intense, unusual sexual arousal involving only oneself or consenting adults that causes the person marked distress or carries a real risk of harm.',
        what_it_feels_like:
            'A person may have an intense sexual interest that involves only themselves or consenting partners, but feel significant distress about it, or it may carry a risk of injury or death.',
        how_it_differs:
            'Unlike the paraphilic disorders involving non-consenting people, here others are not harmed by lack of consent. The concern is the person’s own marked distress or a real risk of harm to themselves.',
        when_more_than_everyday:
            'When an unusual sexual interest causes lasting personal distress or carries a serious risk of harm. Support can help when it is wanted.',
        provenance: 'ICD-11 6D36 / Paraphilic disorder involving solitary behaviour or consenting individuals',
    },

    // --- Factitious disorders -----------------------------------------------
    {
        slug: 'factitious-disorder-imposed-on-self',
        name: 'Factitious disorder imposed on self',
        icd11_code: '6D50',
        icd11_grouping: 'Factitious disorders',
        short_definition:
            'Deliberately faking, exaggerating, or causing physical or mental symptoms in oneself, without an obvious outside reward such as money.',
        what_it_feels_like:
            'A person may invent or produce symptoms, seek tests and treatments, and present as ill, even undergoing procedures — driven by a need to take on the role of a patient rather than for clear practical gain.',
        how_it_differs:
            'Unlike malingering, there is no obvious external reward such as money or avoiding work. Unlike bodily distress disorder, the symptoms are deliberately produced rather than genuinely experienced.',
        when_more_than_everyday:
            'When symptoms are deliberately produced or faked over time, leading to unnecessary care or risk. This is best understood and addressed with professional support.',
        provenance: 'ICD-11 6D50 / DSM-5-TR Factitious Disorder Imposed on Self',
    },
    {
        slug: 'factitious-disorder-imposed-on-another',
        name: 'Factitious disorder imposed on another',
        icd11_code: '6D51',
        icd11_grouping: 'Factitious disorders',
        short_definition:
            'Deliberately faking, exaggerating, or causing symptoms in another person — often a dependent — and presenting them as ill, without an obvious outside reward.',
        what_it_feels_like:
            'A person may produce or invent illness in someone in their care, seeking medical attention for them, in a way that can seriously endanger the other person’s health and safety.',
        how_it_differs:
            'Unlike factitious disorder imposed on self, the symptoms are produced in another person. Unlike an honest mistake, the symptoms are deliberately caused or faked, putting the other person at risk.',
        when_more_than_everyday:
            'When someone deliberately causes or fakes illness in another, the other person is at serious risk and the situation needs urgent professional and protective involvement.',
        provenance: 'ICD-11 6D51 / DSM-5-TR Factitious Disorder Imposed on Another',
    },
];
