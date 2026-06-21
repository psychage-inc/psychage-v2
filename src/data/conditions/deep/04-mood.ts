/**
 * Deep content — Mood disorders (ICD-11 6A60–6A73): bipolar and depressive disorders.
 *
 * These are common, treatable, and carry a real risk of suicide, so the copy is hopeful but
 * consistently signposts help and crisis support. Plain-language, non-diagnostic; no drug
 * dosing. ICD-11 / DSM-5-TR framed.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

const NIMH_DEP = {
    label: 'National Institute of Mental Health (NIMH) — Depression',
    url: 'https://www.nimh.nih.gov/health/topics/depression',
};
const NHS_DEP = { label: 'NHS — Depression in adults', url: 'https://www.nhs.uk/mental-health/conditions/depression-in-adults/' };
const NIMH_BIP = {
    label: 'National Institute of Mental Health (NIMH) — Bipolar Disorder',
    url: 'https://www.nimh.nih.gov/health/topics/bipolar-disorder',
};
const NHS_BIP = { label: 'NHS — Bipolar disorder', url: 'https://www.nhs.uk/mental-health/conditions/bipolar-disorder/' };

export const moodDeep: ConditionDeepMap = {
    'bipolar-type-i-disorder': {
        short_definition:
            'A long-term mood condition in which a person has at least one episode of mania — a period of abnormally elevated, expansive, or irritable mood with high energy — usually along with episodes of depression. The mood swings go well beyond ordinary ups and downs, last days to weeks, and can seriously affect judgement, behaviour, and daily life. With treatment, most people manage it well and live full lives.',
        what_it_feels_like:
            'In a manic episode, a person may feel euphoric, unstoppable, or intensely irritable, need little sleep, talk fast, have racing thoughts and grand plans, and act impulsively in ways that feel right at the time but cause harm later. In a depressive episode, the same person may feel heavy, hopeless, exhausted, and unable to enjoy anything. Between episodes, many people feel completely well.',
        how_it_differs:
            'Unlike depression alone, bipolar I includes at least one full manic episode. Unlike bipolar II, the highs reach full mania (severe, often needing hospital care) rather than the milder "hypomania". And unlike everyday mood swings, the episodes are sustained, extreme, and impairing. Recognising the highs — not just the lows — is key, because antidepressants alone can sometimes worsen bipolar disorder.',
        when_more_than_everyday:
            'Periods of unusually high energy, reduced need for sleep, racing thoughts, and risky or out-of-character behaviour — especially alternating with episodes of deep depression — are signs to seek specialist help. A first manic episode, or any episode with risk to the person or others, needs urgent assessment.',
        sections: [
            { heading: 'Signs and symptoms', body: 'Bipolar I involves two kinds of episodes. Mania: elevated, expansive, or irritable mood with increased energy, lasting at least a week (or any length if hospital care is needed), often with reduced need for sleep, rapid speech, racing thoughts, inflated self-belief, distractibility, and impulsive or risky behaviour (spending, driving, sex, or business decisions). Severe mania can include psychosis (losing touch with reality). Depression: persistent low mood, loss of interest, fatigue, changes in sleep and appetite, difficulty concentrating, and feelings of worthlessness or hopelessness.\n\nMost people spend more time depressed than manic. Some have "mixed" features, with high and low symptoms together.' },
            { heading: 'Who it affects', body: 'Bipolar disorder affects around 1–2 in 100 people, across all backgrounds, and usually begins in late adolescence or early adulthood. Bipolar I affects men and women roughly equally. It is a lifelong condition that is managed, much like other long-term health conditions, rather than cured.' },
            { heading: 'What causes it', body: 'Bipolar disorder runs strongly in families and involves differences in brain function and chemistry. Episodes are often triggered by stress, major life changes, disrupted sleep, or drug and alcohol use, in someone with this underlying vulnerability. It is not caused by personal weakness or bad choices.' },
            { heading: 'How it’s recognised', body: 'A psychiatrist makes the diagnosis from the history of mood episodes over time — crucially, evidence of at least one manic episode — and rules out other causes such as drugs, medications, or medical conditions. Because people often seek help when depressed and may not recognise highs as a problem, the diagnosis can take time and benefits from input from family. In ICD-11 it is coded 6A60.' },
            { heading: 'Treatment and support', body: 'Bipolar disorder is very treatable. Long-term mood-stabilising medication (prescribed and monitored by a specialist) helps prevent episodes, with additional medication for acute mania or depression as needed. Psychological therapy, education about the condition, a steady sleep and daily routine, and avoiding drugs and alcohol all help reduce relapses. A crisis plan, agreed in advance, helps everyone act early when warning signs appear.' },
            { heading: 'Living well', body: 'Many people with bipolar I lead full, successful lives. What helps most is steady treatment, protecting sleep, recognising personal early-warning signs of both highs and lows, managing stress, and having trusted people who can flag changes. Tracking mood over time turns a confusing condition into a manageable one.' },
            { heading: 'For family and friends', body: 'Learn the early-warning signs together and agree, while the person is well, what to do if an episode starts. In mania, gently encourage help and safety without shaming; in depression, offer patient support and watch for any signs of suicidal thoughts. Look after your own wellbeing too — supporting someone with bipolar disorder is demanding, and carer support exists.' },
            { heading: 'When to get help', body: 'Seek specialist help for sustained highs or lows that disrupt life, and urgent help for a first manic episode, psychosis, or any risk to safety. If there are thoughts of suicide or self-harm — a real risk in bipolar disorder — contact emergency services or a crisis line immediately. Help works, and reaching out early can be life-saving.' },
        ],
        sources: [WHO_ICD11, NIMH_BIP, NHS_BIP],
    },

    'bipolar-type-ii-disorder': {
        short_definition:
            'A mood condition with episodes of depression and episodes of hypomania — a milder form of mania, with elevated or irritable mood and increased energy that is noticeable but does not reach the severity of full mania. The depressive episodes are often the most disabling part. Like bipolar I, it is long-term but very manageable with treatment.',
        what_it_feels_like:
            'Hypomania can feel good — productive, confident, sociable, needing less sleep — which is partly why it can be missed or even welcomed. But it can also bring irritability and poor decisions, and it is usually followed or preceded by depression that feels heavy and hopeless. Many people seek help for the lows without realising the highs are part of the same condition.',
        how_it_differs:
            'Unlike bipolar I, the highs are hypomania (milder, no psychosis, not severe enough to need hospital care for the high itself) rather than full mania. Unlike depression alone, there are clear hypomanic episodes — which matters, because treatment differs. Unlike everyday good moods, hypomania is a distinct change from a person’s usual self that others notice.',
        when_more_than_everyday:
            'Recurrent depression combined with distinct periods of unusually high energy, reduced need for sleep, and uncharacteristic confidence or irritability is a reason to seek specialist assessment. It is worth mentioning the "up" times to a clinician, even when you seek help for the "down" ones — they change the picture.',
        sections: [
            { heading: 'Signs and symptoms', body: 'Bipolar II is defined by at least one hypomanic episode and at least one depressive episode. Hypomania: a clear period (at least several days) of elevated or irritable mood and increased energy, with reduced need for sleep, talkativeness, racing thoughts, confidence, and increased activity — noticeable to others but not severe enough to cause major impairment or psychosis. Depression: low mood, loss of interest, fatigue, sleep and appetite changes, poor concentration, and hopelessness, often lasting weeks.' },
            { heading: 'Who it affects', body: 'Bipolar II affects a small percentage of people and usually begins in the late teens or twenties. The depressive episodes tend to dominate and recur, which is why it is sometimes mistaken for depression alone. It is a lifelong, manageable condition.' },
            { heading: 'What causes it', body: 'Like bipolar I, it has strong genetic roots and involves brain chemistry, with episodes often triggered by stress, sleep disruption, or substance use. It is not a matter of willpower or character.' },
            { heading: 'How it’s recognised', body: 'Diagnosis rests on identifying both hypomanic and depressive episodes over time and ruling out other causes. Because hypomania can feel positive and go unreported, it is easily missed; careful history-taking, and information from people who know the person, help. In ICD-11 it is coded 6A61.' },
            { heading: 'Treatment and support', body: 'Treatment is similar in spirit to bipolar I: mood-stabilising medication to reduce episodes, careful management of depression (antidepressants are used cautiously and usually alongside a mood stabiliser, under specialist guidance), psychological therapy, and protecting sleep and routine. Recognising and tracking mood patterns is a powerful tool.' },
            { heading: 'Living well', body: 'With the right support, people with bipolar II live full lives. Keeping a regular sleep schedule, monitoring mood, limiting alcohol and drugs, managing stress, and acting early on warning signs all reduce relapses. Many people come to know their patterns well enough to head off episodes.' },
            { heading: 'For family and friends', body: 'Understanding that the cheerful, energetic "up" times are part of the condition — not just the person being well — helps you spot patterns. Support help-seeking during both highs and lows, take depression and any talk of suicide seriously, and agree a plan together for early action.' },
            { heading: 'When to get help', body: 'Seek help for recurrent depression, especially alongside periods of unusual highs. If depression brings thoughts of suicide or self-harm, treat it as urgent — contact emergency services or a crisis line now. Effective treatment is available.' },
        ],
        sources: [WHO_ICD11, NIMH_BIP, NHS_BIP],
    },

    'cyclothymic-disorder': {
        short_definition:
            'A long-standing pattern of frequent mood swings — many periods of mild low mood and many periods of mild high (hypomania-like) mood — that are not severe enough to be full depressive or manic episodes, but persist for years and can be wearing and disruptive. It sits on the bipolar spectrum in a milder, more chronic form.',
        what_it_feels_like:
            'Life can feel like an emotional roller-coaster that never fully settles: stretches of feeling low, flat, or irritable give way to stretches of feeling up, energetic, and confident, often unpredictably. Because the swings are milder, they may be put down to "being moody" or a personality trait, even though they cause real strain on work and relationships.',
        how_it_differs:
            'Unlike bipolar I or II, the highs and lows stay mild and do not reach full manic or depressive episodes. Unlike ordinary mood changes, the pattern is persistent (lasting years, with few stable stretches) and affects daily life. It can develop into bipolar disorder in some people, which is one reason it is worth recognising.',
        when_more_than_everyday:
            'Frequent, ongoing mood swings that have lasted a long time and that affect relationships, work, or wellbeing — even though they never become severe — are worth discussing with a professional. Recognising the pattern can bring relief and access to support.',
        sections: [
            { heading: 'Signs and symptoms', body: 'Cyclothymic disorder involves numerous periods of mild elevated mood (more energy, confidence, sociability, reduced sleep) and numerous periods of mild low mood (low energy, self-doubt, withdrawal), over an extended time (years in adults). The shifts are frequent and the person rarely feels stable for long, but no single episode is severe enough to be full mania or major depression.' },
            { heading: 'Who it affects', body: 'Cyclothymia is uncommon and often begins in adolescence or early adulthood. Because the swings are mild and long-standing, many people live with it for years before it is recognised, sometimes seeing it as just their temperament.' },
            { heading: 'What causes it', body: 'It shares genetic and biological roots with the wider bipolar spectrum and is more common in families with bipolar disorder. Stress and lifestyle factors can influence the swings. It is not simply a personality flaw or a matter of self-control.' },
            { heading: 'How it’s recognised', body: 'A clinician looks for a long-standing pattern of many mild highs and lows that fall short of full episodes, and distinguishes it from bipolar I/II, depression, and personality patterns. In ICD-11 it is coded 6A62. A mood diary kept over time is often the most useful tool.' },
            { heading: 'Support and what helps', body: 'Support combines psychological therapy (to understand the pattern, manage stress, and steady routines) with mood monitoring, and sometimes mood-stabilising medication where the swings are disruptive — guided by a specialist. Regular sleep, limiting alcohol and drugs, and managing stress all help smooth the ups and downs.' },
            { heading: 'Living with it', body: 'Many people manage cyclothymia well once they recognise it, learning to anticipate and ride the swings rather than being caught off guard. Tracking mood, protecting sleep, and keeping a steady routine reduce the swings’ impact. Keeping an eye out for any deepening toward full episodes allows early action.' },
            { heading: 'For family and friends', body: 'Recognise that the swings are part of a condition, not just "moodiness", and try not to take the shifts personally. Encourage steady routines and help-seeking, and support the person in tracking patterns. If lows deepen or highs intensify, encourage a review with a professional.' },
            { heading: 'When to seek help', body: 'Consider professional support when ongoing mild mood swings affect your life and relationships, or if they begin to deepen toward full depressive or manic episodes. If low periods ever bring thoughts of suicide or self-harm, seek help urgently.' },
        ],
        sources: [WHO_ICD11, NHS_BIP],
    },

    'single-episode-depressive-disorder': {
        short_definition:
            'A period of persistent low mood and loss of interest or pleasure, lasting at least two weeks, along with other symptoms such as changes in sleep, energy, appetite, and concentration, that affect daily life — occurring for the first time, without a past depressive episode. It is common, and most people recover well with treatment and support.',
        what_it_feels_like:
            'Depression is more than sadness. People describe a heavy flatness, losing interest in things they used to enjoy, feeling exhausted, struggling to concentrate or make decisions, and being weighed down by guilt or hopelessness. Sleep and appetite often change. Everyday tasks can feel impossible, and it can be hard to imagine feeling better — even though, with help, most people do.',
        how_it_differs:
            'Unlike ordinary sadness or grief, depression is persistent (most of the day, nearly every day, for at least two weeks), pervasive, and impairing. Unlike recurrent depressive disorder, this is a first, single episode. And unlike bipolar disorder, there is no history of manic or hypomanic highs — which is important to check, because it changes treatment.',
        when_more_than_everyday:
            'When low mood or loss of interest lasts most of the day, nearly every day, for two weeks or more and starts affecting sleep, work, relationships, or self-worth, it is worth seeking help — you do not need to wait until you cannot cope. Any thoughts of suicide or self-harm mean help should be sought straight away.',
        sections: [
            { heading: 'Signs and symptoms', body: 'Depression is recognised by a cluster of symptoms present for at least two weeks: persistent low mood and/or loss of interest or pleasure, plus several of — fatigue or low energy, changes in sleep (too much or too little), changes in appetite or weight, difficulty concentrating or deciding, feelings of worthlessness or excessive guilt, slowed or agitated movement, and thoughts of death or suicide. The more symptoms and the greater the impact, the more severe the episode.' },
            { heading: 'Who it affects', body: 'Depression is one of the most common mental health conditions worldwide, affecting people of all ages and backgrounds, and is more often diagnosed in women. A first episode can happen at any age, often triggered by a difficult period of life. Most people who experience it recover.' },
            { heading: 'What causes it', body: 'Depression usually results from a combination of factors: genetic vulnerability, brain chemistry, and life circumstances such as loss, stress, trauma, isolation, physical illness, or major change. Sometimes there is a clear trigger; sometimes there is not. It is not a sign of weakness or something a person can simply "snap out of".' },
            { heading: 'How it’s recognised', body: 'A GP or mental health professional assesses the symptoms, how long they have lasted, and their impact, often using brief questionnaires, and checks for physical causes (such as thyroid problems) and for any history of manic highs. In ICD-11 it is coded 6A70. Talking openly about symptoms, including any thoughts of suicide, helps get the right support.' },
            { heading: 'Treatment and support', body: 'Depression is very treatable. Talking therapies (such as cognitive behavioural therapy) are effective, especially for mild to moderate depression; antidepressant medication helps many people, particularly in moderate to severe depression, and the two are often combined. Support with sleep, activity, and daily structure, and addressing life stressors, all help. Improvement is usually gradual — keeping going through the early stages matters.' },
            { heading: 'Helping yourself recover', body: 'Alongside treatment, small steps help: gentle regular activity, a steady sleep routine, staying connected to people even when you would rather withdraw, limiting alcohol, and breaking tasks into manageable pieces. Recovery is rarely linear, and setbacks do not mean failure. Being patient and kind with yourself is part of getting better.' },
            { heading: 'For family and friends', body: 'Listen without trying to "fix", take the person seriously, and avoid telling them to cheer up. Encourage and help them access treatment, offer practical support, and stay in touch even if they pull away. Always take any mention of suicide seriously and seek help. Caring for someone with depression is hard, so look after yourself too.' },
            { heading: 'When to get help', body: 'See a GP if low mood or loss of interest lasts two weeks or more and affects daily life. Seek help urgently for any thoughts of suicide or self-harm — contact emergency services or a crisis line immediately. Depression is treatable, and reaching out is a strong, effective step.' },
        ],
        sources: [WHO_ICD11, NIMH_DEP, NHS_DEP],
    },

    'recurrent-depressive-disorder': {
        short_definition:
            'A condition in which a person has repeated episodes of depression over their life, with periods of recovery in between, and no history of manic or hypomanic highs. Each episode involves persistent low mood or loss of interest plus other symptoms. Recognising the recurring pattern matters, because it shapes longer-term treatment and relapse prevention.',
        what_it_feels_like:
            'Each depressive episode brings the familiar heaviness — low mood, loss of interest, exhaustion, poor concentration, and hopelessness — and between episodes the person usually feels well. Living with a recurring condition can itself be hard: people may fear the next episode. But recurrence also means patterns can be learned, and relapses prevented or softened.',
        how_it_differs:
            'Unlike a single depressive episode, here there have been two or more episodes separated by periods of recovery. Unlike bipolar disorder, there are no manic or hypomanic highs — only the lows. Knowing it is recurrent guides longer-term care, including staying on treatment to prevent relapse for some people.',
        when_more_than_everyday:
            'A return of depressive symptoms — low mood, loss of interest, fatigue, hopelessness — in someone who has been depressed before is a reason to seek help promptly, ideally before the episode deepens. Catching a relapse early often makes it shorter and milder. Any thoughts of suicide need urgent help.',
        sections: [
            { heading: 'Signs and symptoms', body: 'The symptoms of each episode are those of depression: persistent low mood and/or loss of interest, with several of fatigue, sleep and appetite changes, poor concentration, feelings of worthlessness or guilt, slowed or agitated movement, and thoughts of death or suicide, lasting at least two weeks. What defines this diagnosis is the pattern over time — recurring episodes with recovery in between.' },
            { heading: 'Who it affects', body: 'Many people who experience one episode of depression go on to have others, making recurrent depression common. It affects all backgrounds and is more often diagnosed in women. The number and spacing of episodes varies widely from person to person.' },
            { heading: 'What causes it', body: 'The causes are those of depression generally — a mix of genetic vulnerability, brain chemistry, and life stressors — with a stronger genetic loading where episodes recur. Each episode can be triggered by stress, loss, illness, or sometimes nothing obvious. Past episodes can make future ones somewhat more likely, which is why prevention matters.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies a history of two or more depressive episodes with recovery between them and no manic highs, and assesses the current episode’s severity and impact. In ICD-11 it is coded 6A71. Understanding the personal pattern of episodes guides the longer-term plan.' },
            { heading: 'Treatment and relapse prevention', body: 'Acute episodes are treated like other depression — talking therapy and/or antidepressant medication. For recurrent depression, prevention is central: some people benefit from staying on medication longer to reduce relapse, and therapies such as mindfulness-based cognitive therapy or maintenance CBT can lower the chance of future episodes. Knowing personal early-warning signs allows quick action.' },
            { heading: 'Living well between episodes', body: 'Building a stable foundation — regular sleep, activity, connection, limiting alcohol, and managing stress — helps protect against relapse. A personal "staying well" plan, including warning signs and steps to take, turns recurrence from a dread into something manageable. Setbacks are part of a long-term condition, not a personal failure.' },
            { heading: 'For family and friends', body: 'Knowing the person’s warning signs helps you both act early. Offer steady, non-judgmental support, encourage them to keep up the things that protect their mood, and take any return of symptoms — and any talk of suicide — seriously. Your steady presence between and during episodes matters.' },
            { heading: 'When to get help', body: 'Seek help when depressive symptoms return, ideally early. Treat any thoughts of suicide or self-harm as an emergency — contact emergency services or a crisis line now. With the right long-term support, many people have fewer and milder episodes over time.' },
        ],
        sources: [WHO_ICD11, NIMH_DEP, NHS_DEP],
    },

    'dysthymic-disorder': {
        short_definition:
            'A persistent, long-lasting form of depression (often called persistent depressive disorder) in which low mood and other depressive symptoms are present more days than not for a long time — at least two years in adults — but are usually less intense than a major depressive episode. Because it is so long-running, it can feel like "just how I am", yet it is treatable.',
        what_it_feels_like:
            'People describe a steady, low-grade greyness — feeling down, flat, tired, self-critical, and low on enjoyment for so long that they may not remember feeling otherwise. It rarely lifts fully, but rarely becomes as severe as major depression. This "always there" quality is what makes it both wearing and easy to overlook.',
        how_it_differs:
            'Unlike a major depressive episode, the symptoms are often milder but far more persistent — measured in years rather than weeks. Unlike a personality trait or temperament, it is a treatable condition, not a fixed part of who someone is. People can also have major depressive episodes on top of it (sometimes called "double depression").',
        when_more_than_everyday:
            'If low mood and a lack of enjoyment have been present most of the time for a long stretch — years rather than weeks — and colour daily life, it is worth seeking help, even if you have come to see it as normal for you. Long-standing low mood is treatable, and improvement is possible.',
        sections: [
            { heading: 'Signs and symptoms', body: 'The core is a persistently low or down mood, present more days than not for at least two years (one year in young people), with several of: low energy or fatigue, low self-esteem, poor concentration or difficulty deciding, changes in appetite or sleep, and feelings of hopelessness. The symptoms are usually less severe than major depression but more enduring, with few symptom-free stretches.' },
            { heading: 'Who it affects', body: 'Persistent depression is fairly common and often begins early — in childhood, the teens, or early adulthood — and runs a long course. Because it starts young and lasts, many people assume it is simply their personality, and live with it for years before seeking help.' },
            { heading: 'What causes it', body: 'Like other depression, it stems from a mix of genetic vulnerability, brain chemistry, and life factors such as chronic stress, early adversity, or ongoing difficult circumstances. Long-standing stress and isolation can both feed and result from it. It is not a character flaw.' },
            { heading: 'How it’s recognised', body: 'A clinician looks for a long-standing pattern (years) of milder depressive symptoms, distinguishes it from major depression and from temperament, and checks whether major depressive episodes also occur on top. In ICD-11 it is coded 6A72. Naming it can be a relief — it reframes a "personality" as a treatable condition.' },
            { heading: 'Treatment and support', body: 'Persistent depression responds to the same treatments as other depression — talking therapy and/or antidepressant medication — though, because it is long-standing, treatment may take longer to show its full effect, and persistence pays off. Therapy can address the long-held negative beliefs that often build up over years. Support with routine, activity, and connection helps.' },
            { heading: 'Living with and beyond it', body: 'Because the condition is long-standing, recovery can feel like rediscovering a baseline the person did not know they were missing. Steady routines, regular activity, connection, and continuing treatment all help. Tracking mood over time makes gradual improvement visible, which is encouraging when change is slow.' },
            { heading: 'For family and friends', body: 'Understand that long-term low mood is a condition, not the person’s "true nature" or a choice. Encourage treatment, support healthy routines, and notice and reflect back improvements the person may not see in themselves. Take any worsening or talk of suicide seriously.' },
            { heading: 'When to get help', body: 'See a GP if low mood and lack of enjoyment have been present for a long time and affect your life — even if it feels normal to you. Seek urgent help for any thoughts of suicide or self-harm. Long-standing depression is treatable, and feeling better is possible.' },
        ],
        sources: [WHO_ICD11, NHS_DEP],
    },

    'mixed-depressive-and-anxiety-disorder': {
        short_definition:
            'A condition in which symptoms of both depression and anxiety are present together, with neither set severe enough on its own to be a separate disorder, but the combination causing real distress and affecting daily life. It is a very common pattern, especially in primary care, and is treatable.',
        what_it_feels_like:
            'People describe being both low and on edge — flat, tired, and unmotivated, while also worried, tense, and unable to relax. The two feed each other: worry drains energy and lifts mood lower, and low mood makes everything feel more threatening. Neither feels overwhelming on its own, but together they are wearing and hard to shake.',
        how_it_differs:
            'Unlike depression or an anxiety disorder diagnosed on its own, here both clusters are present but each is below the threshold for its own diagnosis. Unlike ordinary stress, the combined symptoms are persistent and impairing. Recognising the mix matters because addressing only one half often leaves the other untreated.',
        when_more_than_everyday:
            'When a blend of low mood and persistent worry or tension lasts and starts affecting sleep, work, relationships, or enjoyment of life, it is worth talking to a professional — even if neither feeling seems "bad enough" alone. The combination is a recognised, treatable condition.',
        sections: [
            { heading: 'Signs and symptoms', body: 'The picture combines depressive symptoms (low mood, reduced interest, fatigue, poor concentration, sleep and appetite changes, low self-worth) with anxiety symptoms (excessive worry, restlessness, tension, irritability, feeling on edge, physical signs like a racing heart). For this diagnosis, both are present together but neither alone meets the full criteria for depression or a specific anxiety disorder.' },
            { heading: 'Who it affects', body: 'This mixed pattern is among the most common presentations of distress seen by GPs and is found across all backgrounds. Because it sits below the threshold of "full" depression or anxiety, it can be under-recognised, even though it causes real impairment.' },
            { heading: 'What causes it', body: 'As with depression and anxiety separately, it arises from a mix of temperament, genetics, brain chemistry, and life stress. Ongoing stress, difficult circumstances, and isolation commonly contribute. The two symptom sets share underlying factors, which is why they so often travel together.' },
            { heading: 'How it’s recognised', body: 'A clinician identifies meaningful symptoms of both depression and anxiety occurring together, with neither reaching the full threshold alone, and rules out other causes. In ICD-11 it is coded 6A73. It is worth describing the whole picture — both the low and the anxious sides — so support addresses both.' },
            { heading: 'Treatment and support', body: 'Treatment addresses both strands at once. Talking therapies such as cognitive behavioural therapy work well, since they target the worry and the low mood together; antidepressant medication that also helps anxiety may be used. Lifestyle foundations — regular sleep, activity, limiting caffeine and alcohol, and stress-management skills like paced breathing — support recovery.' },
            { heading: 'Helping yourself', body: 'Small, steady steps help both sides: regular gentle exercise, a consistent sleep routine, staying connected, limiting stimulants, and practising relaxation or mindfulness. Tackling avoidance (a habit of anxiety) and inactivity (a habit of low mood) gently and gradually often eases both at once.' },
            { heading: 'For family and friends', body: 'Recognise that someone can be both down and anxious at the same time, and that "just relax" or "cheer up" rarely helps. Offer patient, practical support, encourage treatment, and help the person keep up the routines that steady mood and calm worry. Take any talk of suicide seriously.' },
            { heading: 'When to get help', body: 'See a GP when a mix of low mood and worry persists and affects your life. Seek urgent help for any thoughts of suicide or self-harm. Both depression and anxiety respond well to treatment, and addressing them together works best.' },
        ],
        sources: [WHO_ICD11, NHS_DEP],
    },
};
