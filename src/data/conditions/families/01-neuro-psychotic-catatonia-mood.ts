import type { ConditionSeed } from '@/types/condition';

/**
 * ICD-11 Chapter 6 — Neurodevelopmental disorders, Schizophrenia or other primary
 * psychotic disorders, Catatonia, and Mood disorders.
 *
 * Codes and names are ICD-11 reference data. The four plain-language fields are
 * authored to the GAD calibration: third person, ~8th-grade, non-diagnostic,
 * "common" never "normal". All rows land unverified for clinical review.
 */
export const neuroPsychoticCatatoniaMood: ConditionSeed[] = [
    // --- Neurodevelopmental disorders ---------------------------------------
    {
        slug: 'disorders-of-intellectual-development',
        name: 'Disorders of intellectual development',
        icd11_code: '6A00',
        icd11_grouping: 'Neurodevelopmental disorders',
        short_definition:
            'A group of conditions that begin in childhood, where both thinking skills and everyday independent living develop more slowly than usual.',
        what_it_feels_like:
            'A person with this may take longer to learn to talk, read, solve problems, or handle money and daily tasks. Family often notices early that milestones come later than for other children the same age.',
        how_it_differs:
            'Unlike a developmental learning disorder, which affects one specific skill like reading, this involves broad thinking and self-care abilities. Unlike dementia, it is present from early development rather than being a later loss of skills already gained.',
        when_more_than_everyday:
            'When the slower learning is clearly below what is expected for a person’s age, shows up across many areas of life, and started during the developmental years rather than after an injury or illness.',
        provenance: 'ICD-11 6A00 / DSM-5-TR Intellectual Developmental Disorder',
    },
    {
        slug: 'developmental-speech-or-language-disorders',
        name: 'Developmental speech or language disorders',
        icd11_code: '6A01',
        icd11_grouping: 'Neurodevelopmental disorders',
        short_definition:
            'Difficulties learning to make speech sounds or to understand and use language that begin in childhood and are not explained by another condition.',
        what_it_feels_like:
            'A child may be hard to understand, mix up sounds, struggle to find words, or have trouble following what others say. The gap between them and other children their age can be frustrating for everyone.',
        how_it_differs:
            'Unlike a hearing problem or autism spectrum disorder, the main difficulty here is with speech or language itself rather than hearing or social communication overall. Unlike shyness, the child wants to communicate but the skills lag behind.',
        when_more_than_everyday:
            'When speech or language is clearly behind same-age peers, lasts beyond the usual range, and gets in the way of being understood, learning, or making friends.',
        provenance: 'ICD-11 6A01 / DSM-5-TR Communication Disorders',
    },
    {
        slug: 'autism-spectrum-disorder',
        name: 'Autism spectrum disorder',
        icd11_code: '6A02',
        icd11_grouping: 'Neurodevelopmental disorders',
        short_definition:
            'A lifelong difference in how a person communicates, relates to others, and experiences the world, with focused interests and a need for routine, beginning early in development.',
        what_it_feels_like:
            'A person on the spectrum may find back-and-forth conversation and reading social cues hard, prefer predictable routines, feel strongly about specific interests, and notice sounds, lights, or textures more intensely than others.',
        how_it_differs:
            'Unlike social anxiety, the social difficulty comes from a different way of processing communication rather than fear of being judged. Unlike a language disorder alone, it also involves repetitive patterns and sensory differences.',
        when_more_than_everyday:
            'When these differences are present from early childhood, show up across settings, and shape daily life enough that support helps — not just a preference for time alone or for routine.',
        provenance: 'ICD-11 6A02 / DSM-5-TR Autism Spectrum Disorder',
    },
    {
        slug: 'developmental-learning-disorder',
        name: 'Developmental learning disorder',
        icd11_code: '6A03',
        icd11_grouping: 'Neurodevelopmental disorders',
        short_definition:
            'Ongoing trouble with a specific school skill — reading, writing, or maths — that is well below what is expected for a person’s age and is not due to poor teaching.',
        what_it_feels_like:
            'A person may read slowly, mix up letters or numbers, spell inconsistently, or struggle with calculations, even when they work hard and understand other subjects well. School can feel exhausting and discouraging.',
        how_it_differs:
            'Unlike disorders of intellectual development, overall thinking is in the usual range and only one or two specific skills are affected. Unlike ADHD, the core problem is the skill itself rather than attention.',
        when_more_than_everyday:
            'When the difficulty stays despite good teaching and effort, is far below age level, and interferes with school, work, or daily tasks that need that skill.',
        provenance: 'ICD-11 6A03 / DSM-5-TR Specific Learning Disorder',
    },
    {
        slug: 'developmental-motor-coordination-disorder',
        name: 'Developmental motor coordination disorder',
        icd11_code: '6A04',
        icd11_grouping: 'Neurodevelopmental disorders',
        short_definition:
            'Marked difficulty learning and doing coordinated physical movements that begins in childhood and is well below what is expected for a person’s age.',
        what_it_feels_like:
            'A person may seem clumsy — dropping things, bumping into objects, or struggling with handwriting, buttons, cutlery, or sport. Tasks that need smooth movement take longer and more effort than for others.',
        how_it_differs:
            'Unlike a movement problem caused by a nerve or muscle disease, there is no underlying physical illness to explain it. Unlike simple inexperience, the coordination stays behind even with practice.',
        when_more_than_everyday:
            'When the coordination problems are clearly below age level, last over time, and get in the way of school, self-care, play, or work.',
        provenance: 'ICD-11 6A04 / DSM-5-TR Developmental Coordination Disorder',
    },
    {
        slug: 'attention-deficit-hyperactivity-disorder',
        name: 'Attention deficit hyperactivity disorder',
        icd11_code: '6A05',
        icd11_grouping: 'Neurodevelopmental disorders',
        short_definition:
            'A pattern of inattention, restlessness, or acting on impulse that begins in childhood and is strong enough to get in the way of daily life.',
        what_it_feels_like:
            'A person may lose focus, be easily distracted, forget or misplace things, struggle to sit still, feel driven by a motor, interrupt others, or act before thinking. Many find it hard to start or finish tasks even when they care about them.',
        how_it_differs:
            'Unlike ordinary busyness or a lively temperament, the difficulties show up across home, school, or work and have been there since childhood. Unlike anxiety, the trouble focusing is not mainly driven by worry.',
        when_more_than_everyday:
            'When attention, restlessness, or impulsivity has been present from early life, shows up in more than one setting, and clearly interferes with learning, work, or relationships.',
        provenance: 'ICD-11 6A05 / DSM-5-TR Attention-Deficit/Hyperactivity Disorder',
    },
    {
        slug: 'stereotyped-movement-disorder',
        name: 'Stereotyped movement disorder',
        icd11_code: '6A06',
        icd11_grouping: 'Neurodevelopmental disorders',
        short_definition:
            'Repeated, rhythmic movements with no clear purpose — such as rocking, hand-flapping, or head-banging — that begin early in development.',
        what_it_feels_like:
            'A person may rock, flap their hands, twirl, or bang their head in a repeated way. The movements can be soothing, but some can cause injury or get in the way of daily activities.',
        how_it_differs:
            'Unlike tics, these movements tend to be rhythmic and longer-lasting rather than sudden and brief. Unlike a habit that fades, they are repeated, can start very early, and may need support to manage.',
        when_more_than_everyday:
            'When the movements are frequent, last over time, and interfere with daily life or risk harm — not just brief self-soothing that comes and goes.',
        provenance: 'ICD-11 6A06 / DSM-5-TR Stereotypic Movement Disorder',
    },

    // --- Schizophrenia or other primary psychotic disorders -----------------
    {
        slug: 'schizophrenia',
        name: 'Schizophrenia',
        icd11_code: '6A20',
        icd11_grouping: 'Schizophrenia or other primary psychotic disorders',
        short_definition:
            'A condition that affects how a person thinks, perceives, and feels, where the mind can lose touch with what is real for a sustained period.',
        what_it_feels_like:
            'A person may hear voices others do not hear, hold strong beliefs that others find hard to follow, feel that thoughts are jumbled, or pull back from people and lose drive. These experiences can feel very real and frightening.',
        how_it_differs:
            'Unlike a brief or one-off psychotic episode, the changes last longer and affect several areas of the mind. Unlike bipolar or depressive disorders with psychosis, the psychotic experiences are central and are not only present during extreme mood states.',
        when_more_than_everyday:
            'When changes in perception, thinking, and motivation last for weeks or more and clearly disrupt work, relationships, or self-care. Sudden changes like this deserve professional support quickly.',
        provenance: 'ICD-11 6A20 / DSM-5-TR Schizophrenia',
    },
    {
        slug: 'schizoaffective-disorder',
        name: 'Schizoaffective disorder',
        icd11_code: '6A21',
        icd11_grouping: 'Schizophrenia or other primary psychotic disorders',
        short_definition:
            'A condition where strong mood episodes and psychotic experiences happen together within the same period of illness.',
        what_it_feels_like:
            'A person may have times of deep low mood or high, racing energy alongside hearing or believing things others do not. The mix of intense mood and altered reality can be confusing and hard to ride out.',
        how_it_differs:
            'Unlike schizophrenia, prominent mood episodes are a core part of the picture. Unlike a mood disorder with psychosis, the psychotic experiences also appear at times when the mood is more settled.',
        when_more_than_everyday:
            'When both major mood changes and psychotic experiences occur together within one period of illness and disrupt daily life. This combination is best assessed by a professional.',
        provenance: 'ICD-11 6A21 / DSM-5-TR Schizoaffective Disorder',
    },
    {
        slug: 'schizotypal-disorder',
        name: 'Schizotypal disorder',
        icd11_code: '6A22',
        icd11_grouping: 'Schizophrenia or other primary psychotic disorders',
        short_definition:
            'A lasting pattern of unusual thinking, perception, and behaviour, and discomfort with closeness, that is milder than schizophrenia and does not include clear, lasting psychosis.',
        what_it_feels_like:
            'A person may have odd beliefs, magical thinking, or brief unusual perceptions, feel very uneasy in close relationships, and come across to others as eccentric or distant.',
        how_it_differs:
            'Unlike schizophrenia, there are no sustained, full psychotic episodes. Unlike social anxiety, the discomfort with people is tied to a broader pattern of unusual thinking rather than fear of being judged.',
        when_more_than_everyday:
            'When eccentric thinking and discomfort with closeness form a stable, long-term pattern that affects relationships and daily life — beyond simply being a private or unconventional person.',
        provenance: 'ICD-11 6A22 / DSM-5-TR Schizotypal Personality Disorder',
    },
    {
        slug: 'acute-and-transient-psychotic-disorder',
        name: 'Acute and transient psychotic disorder',
        icd11_code: '6A23',
        icd11_grouping: 'Schizophrenia or other primary psychotic disorders',
        short_definition:
            'A sudden, short-lived episode where a person loses touch with reality, often changing quickly and usually settling within weeks.',
        what_it_feels_like:
            'A person may suddenly develop strong unusual beliefs or perceptions that shift fast from day to day or hour to hour. The episode often comes on quickly and then eases, sometimes after a stressful event.',
        how_it_differs:
            'Unlike schizophrenia, the episode is brief and the person usually returns to their former self. Unlike a substance-induced state, it is not explained by drugs or alcohol.',
        when_more_than_everyday:
            'When psychotic experiences appear suddenly and disrupt daily life, even briefly. A rapid change like this should be checked by a professional promptly.',
        provenance: 'ICD-11 6A23 / DSM-5-TR Brief Psychotic Disorder',
    },
    {
        slug: 'delusional-disorder',
        name: 'Delusional disorder',
        icd11_code: '6A24',
        icd11_grouping: 'Schizophrenia or other primary psychotic disorders',
        short_definition:
            'A condition built around one or more fixed beliefs that are not true, held strongly for a long time, while the rest of thinking stays fairly clear.',
        what_it_feels_like:
            'A person may be deeply convinced of something others know is not so — for example, being followed, deceived, or loved by someone — and hold to it firmly. Outside that belief, daily functioning can look mostly intact.',
        how_it_differs:
            'Unlike schizophrenia, hearing voices and disorganised thinking are not prominent, and the belief is the main feature. Unlike an ordinary strong opinion, the belief does not change even with clear evidence against it.',
        when_more_than_everyday:
            'When a fixed false belief persists for months, resists evidence, and shapes choices or relationships. Beliefs this firm are best explored with professional support.',
        provenance: 'ICD-11 6A24 / DSM-5-TR Delusional Disorder',
    },

    // --- Catatonia ----------------------------------------------------------
    {
        slug: 'catatonia-associated-with-another-mental-disorder',
        name: 'Catatonia associated with another mental disorder',
        icd11_code: '6A40',
        icd11_grouping: 'Catatonia',
        short_definition:
            'A state of marked changes in movement and responsiveness — such as not moving, holding fixed postures, or sudden agitation — that occurs alongside another mental health condition.',
        what_it_feels_like:
            'A person may become very still and not respond, hold unusual positions, stop speaking, resist being moved, or swing into restless, repetitive movement. It can be distressing for them and for those around them.',
        how_it_differs:
            'Unlike catatonia caused by a medicine or substance, this appears together with a condition such as a mood or psychotic disorder. Unlike ordinary withdrawal, the changes in movement and response are striking and physical.',
        when_more_than_everyday:
            'When movement and responsiveness change markedly — freezing, posturing, or agitation — alongside another condition. This needs urgent professional assessment.',
        provenance: 'ICD-11 6A40 / DSM-5-TR Catatonia',
    },
    {
        slug: 'catatonia-induced-by-substances-or-medications',
        name: 'Catatonia induced by substances or medications',
        icd11_code: '6A41',
        icd11_grouping: 'Catatonia',
        short_definition:
            'The same striking changes in movement and responsiveness as other catatonia, but brought on by a medicine, drug, or withdrawal from one.',
        what_it_feels_like:
            'A person may become unresponsive, hold fixed postures, or grow agitated after starting, stopping, or taking a substance or medicine. The state can come on over hours to days.',
        how_it_differs:
            'Unlike catatonia tied to another mental disorder, here a substance or medication is the trigger. Unlike ordinary side effects, the movement and response changes are severe and need quick care.',
        when_more_than_everyday:
            'When marked movement and responsiveness changes follow a medicine or substance. This is a medical emergency and needs urgent professional help.',
        provenance: 'ICD-11 6A41 / DSM-5-TR Substance/Medication-Induced Catatonia',
    },

    // --- Mood disorders -----------------------------------------------------
    {
        slug: 'bipolar-type-i-disorder',
        name: 'Bipolar type I disorder',
        icd11_code: '6A60',
        icd11_grouping: 'Mood disorders',
        short_definition:
            'A mood condition with at least one episode of mania — a period of very high, expansive, or irritable mood and energy — usually with low-mood episodes as well.',
        what_it_feels_like:
            'During a high, a person may feel powerful, need little sleep, talk fast, take risks, and have racing thoughts. During a low, they may feel heavy, hopeless, and drained. The swings can reshape sleep, spending, and relationships.',
        how_it_differs:
            'Unlike bipolar type II, the highs reach full mania, which is more intense and can include loss of touch with reality. Unlike ordinary mood ups and downs, the episodes last days to weeks and clearly disrupt life.',
        when_more_than_everyday:
            'When a person has a distinct period of unusually high mood and energy lasting about a week or more, often with low episodes too, that disrupts work, relationships, or safety.',
        provenance: 'ICD-11 6A60 / DSM-5-TR Bipolar I Disorder',
    },
    {
        slug: 'bipolar-type-ii-disorder',
        name: 'Bipolar type II disorder',
        icd11_code: '6A61',
        icd11_grouping: 'Mood disorders',
        short_definition:
            'A mood condition with episodes of depression and episodes of hypomania — a milder high than full mania — but no full manic episode.',
        what_it_feels_like:
            'During a hypomanic period, a person may feel unusually upbeat, productive, and energetic with less need for sleep. These lift often alternate with longer, heavier stretches of depression that are harder to bear.',
        how_it_differs:
            'Unlike bipolar type I, the highs stay at the hypomanic level and never reach full mania. Unlike depression alone, there are also clear periods of raised mood and energy that are a change from the person’s usual self.',
        when_more_than_everyday:
            'When clear hypomanic periods alternate with depression and together they affect mood, sleep, and daily life over time. A professional can help tell this apart from depression alone.',
        provenance: 'ICD-11 6A61 / DSM-5-TR Bipolar II Disorder',
    },
    {
        slug: 'cyclothymic-disorder',
        name: 'Cyclothymic disorder',
        icd11_code: '6A62',
        icd11_grouping: 'Mood disorders',
        short_definition:
            'A long-running pattern of many mood swings between mild highs and mild lows that never quite reach full hypomania or depression.',
        what_it_feels_like:
            'A person may shift often between feeling upbeat and energetic and feeling down and flat, for years at a time. The ups and downs can make mood feel unpredictable and hard to plan around.',
        how_it_differs:
            'Unlike bipolar type II, the highs and lows stay milder and do not meet the full thresholds for hypomania or depression. Unlike everyday moodiness, the pattern is steady and lasts for years.',
        when_more_than_everyday:
            'When mild mood swings continue for a couple of years or more, happen often, and wear on relationships, work, or a sense of stability.',
        provenance: 'ICD-11 6A62 / DSM-5-TR Cyclothymic Disorder',
    },
    {
        slug: 'single-episode-depressive-disorder',
        name: 'Single episode depressive disorder',
        icd11_code: '6A70',
        icd11_grouping: 'Mood disorders',
        short_definition:
            'One period of low mood or loss of interest, with other changes in sleep, energy, and thinking, lasting at least two weeks, in someone with no past depressive episodes.',
        what_it_feels_like:
            'A person may feel sad, empty, or unable to enjoy things, with low energy, changed sleep or appetite, trouble concentrating, and harsh thoughts about themselves. Even small tasks can feel heavy.',
        how_it_differs:
            'Unlike recurrent depressive disorder, this is a first and so far only episode. Unlike grief or a passing low, the symptoms are sustained, broad, and interfere with daily life rather than easing within days.',
        when_more_than_everyday:
            'When low mood or loss of interest lasts most of the day, nearly every day, for two weeks or more, with other changes, and gets in the way of work, relationships, or self-care.',
        provenance: 'ICD-11 6A70 / DSM-5-TR Major Depressive Disorder, single episode',
    },
    {
        slug: 'recurrent-depressive-disorder',
        name: 'Recurrent depressive disorder',
        icd11_code: '6A71',
        icd11_grouping: 'Mood disorders',
        short_definition:
            'A pattern of two or more separate episodes of depression over time, with periods of more settled mood in between.',
        what_it_feels_like:
            'A person may go through repeated stretches of low mood, loss of interest, low energy, and dark thoughts, separated by times when they feel more like themselves. Knowing it can return is part of the burden.',
        how_it_differs:
            'Unlike a single episode, depression here comes back more than once. Unlike bipolar disorders, there are no episodes of raised mood and energy between the lows.',
        when_more_than_everyday:
            'When depression returns as distinct episodes over time, each lasting weeks, and the pattern disrupts daily life. Ongoing support can help reduce how often it returns.',
        provenance: 'ICD-11 6A71 / DSM-5-TR Major Depressive Disorder, recurrent',
    },
    {
        slug: 'dysthymic-disorder',
        name: 'Dysthymic disorder',
        icd11_code: '6A72',
        icd11_grouping: 'Mood disorders',
        short_definition:
            'A low mood that is less intense than a depressive episode but lasts a long time — most days for two years or more.',
        what_it_feels_like:
            'A person may feel down, low on energy, or joyless for so long it can seem like part of who they are. They often keep going day to day, but life feels muted and effortful.',
        how_it_differs:
            'Unlike a depressive episode, the symptoms are milder but far longer-lasting. Unlike a passing low mood, this persists for years rather than lifting after days or weeks.',
        when_more_than_everyday:
            'When a low, flat mood lasts most days for two years or more and quietly drains energy, enjoyment, and self-worth over time.',
        provenance: 'ICD-11 6A72 / DSM-5-TR Persistent Depressive Disorder (Dysthymia)',
    },
    {
        slug: 'mixed-depressive-and-anxiety-disorder',
        name: 'Mixed depressive and anxiety disorder',
        icd11_code: '6A73',
        icd11_grouping: 'Mood disorders',
        short_definition:
            'A condition where symptoms of depression and anxiety are both present together, but neither on its own is strong enough to be its own diagnosis.',
        what_it_feels_like:
            'A person may feel low and worried at the same time — flat and tearful, yet also tense, on edge, and unable to relax. The blend can be hard to put into words.',
        how_it_differs:
            'Unlike a depressive disorder, low mood is only part of the picture and sits alongside clear anxiety. Unlike generalised anxiety disorder, worry is matched by an equal weight of depression.',
        when_more_than_everyday:
            'When mixed low mood and anxiety last over weeks, neither clearly outweighs the other, and together they wear on daily life.',
        provenance: 'ICD-11 6A73 / DSM-5-TR Depressive and anxiety features',
    },
];
