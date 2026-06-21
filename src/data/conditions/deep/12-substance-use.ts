/**
 * Deep content — Disorders due to substance use (ICD-11 6C40–6C4G), part A of the
 * "substance use or addictive behaviours" grouping (part B = gambling/gaming, file 13).
 *
 * Each "disorders due to use of X" entry is an UMBRELLA covering a spectrum: a single episode
 * of harmful use, a harmful pattern of use, and dependence, plus intoxication and withdrawal.
 * The copy treats substance use disorders as health conditions, is non-judgmental, harm-
 * reduction-minded, and recovery-oriented. NO dosing, NO how-to-use/obtain, NO glamorising.
 * Plain-language, non-diagnostic. Always signposts help and crisis.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

const NHS_ALCOHOL = { label: 'NHS — Alcohol-use disorder', url: 'https://www.nhs.uk/conditions/alcohol-misuse/' };
const NHS_DRUGHELP = { label: 'NHS — Drug addiction: getting help', url: 'https://www.nhs.uk/live-well/addiction-support/drug-addiction-getting-help/' };

/** Shared closing sections reused across the substance entries (kept consistent + non-judgmental). */
const forFamily = (substance: string) => ({
    heading: 'For family and friends',
    body: `Approach with care rather than blame — substance use disorders are health conditions, and shame and confrontation often push people away from help. Learn about ${substance} and about local services, set kind but clear boundaries, look after your own wellbeing, and encourage treatment without trying to control the person. Support groups exist for families and carers, and using them is a strength.`,
});

export const substanceUseDeep: ConditionDeepMap = {
    'disorders-due-to-use-of-alcohol': {
        short_definition:
            'An umbrella for the range of problems that can come from drinking alcohol — from a single episode of harmful drinking, through a harmful pattern of use that damages health or life, to dependence, where alcohol takes priority and stopping becomes hard. It also covers intoxication and withdrawal. Alcohol problems are common, are health conditions rather than moral failings, and respond well to treatment.',
        what_it_feels_like:
            'Drinking can start as a way to relax, cope, or socialise and gradually take up more space — needing more to feel the same effect, struggling to cut down, drinking despite harm to health, work, or relationships, and feeling unwell without it. People often feel shame and try to hide it, which makes reaching out harder. Many feel trapped, even as part of them wants to stop.',
        how_it_differs:
            'Unlike social or moderate drinking, these disorders involve harm to health or life, or dependence with loss of control. Unlike a one-off heavy night, dependence involves craving, tolerance, and withdrawal. The condition exists on a spectrum, and a person does not have to "hit rock bottom" or be dependent to benefit from help.',
        when_more_than_everyday:
            'It is worth seeking help when drinking is harming your health, relationships, work, or finances; when you find it hard to cut down or stop; or when you feel shaky, sweaty, anxious, or unwell when you have not had a drink. You do not need to be "an alcoholic" to deserve support — earlier help is easier.',
        sections: [
            { heading: 'A spectrum, not a single thing', body: 'Alcohol problems range widely: a single episode of harmful use (for example, drinking to the point of injury or harm), a harmful pattern over time that damages physical or mental health or daily life, and dependence — where alcohol becomes central, with craving, tolerance (needing more for the same effect), difficulty controlling use, and withdrawal when stopping. Intoxication and withdrawal states are part of the picture too.' },
            { heading: 'Signs of a problem', body: 'Warning signs include drinking more or longer than intended, repeated unsuccessful attempts to cut down, spending a lot of time drinking or recovering, craving, neglecting responsibilities, drinking despite clear harm, needing more to feel the effect, and withdrawal symptoms (shakiness, sweating, anxiety, nausea) that ease with a drink. Hiding drinking and feeling defensive about it are common.' },
            { heading: 'Health and life effects', body: 'Heavy or long-term drinking can affect almost every organ — the liver, heart, brain, and gut — and raises the risk of several cancers, mental health problems, accidents, and relationship and financial harm. Alcohol withdrawal in dependence can be medically dangerous, which is why stopping suddenly after heavy, prolonged drinking should be done with medical advice, not alone.' },
            { heading: 'Why it develops', body: 'It arises from a mix of genetics, mental health (alcohol is often used to cope with stress, anxiety, low mood, or trauma), environment and availability, and the way regular drinking changes the brain’s reward and stress systems. It is nobody’s moral failing, and willpower alone is rarely the missing piece.' },
            { heading: 'Treatment and recovery', body: 'Effective help exists across the spectrum. This may include support to cut down or stop, medically supervised withdrawal (detox) where dependence is significant — which can be dangerous to attempt alone — medication to support recovery, psychological therapies, and peer support such as mutual-aid groups. Treating co-occurring anxiety, depression, or trauma matters too. Recovery is common, and lapses are part of the journey, not failure.' },
            forFamily('alcohol'),
            { heading: 'When to get help', body: 'Speak to a GP or local alcohol service if drinking is harming you or you struggle to control it — and seek advice before stopping heavy, regular drinking, as withdrawal can be dangerous. Get urgent medical help for confusion, fits, severe shaking, or signs of alcohol poisoning, and crisis help for any thoughts of suicide or self-harm.' },
        ],
        sources: [WHO_ICD11, NHS_ALCOHOL],
    },

    'disorders-due-to-use-of-cannabis': {
        short_definition:
            'An umbrella for problems arising from cannabis use — from a harmful pattern that damages health, mental health, or daily life, to dependence, where cannabis takes priority and cutting down is hard — along with intoxication and a recognised withdrawal state. Cannabis dependence is real, more likely with frequent and high-strength use, and treatable.',
        what_it_feels_like:
            'Regular use can shift from occasional to daily, with more time spent using or recovering, difficulty cutting down, using to cope or to feel "normal", and irritability, poor sleep, or low mood when not using. Motivation, memory, and mood can be affected. Many people underestimate cannabis’s hold until they try to stop.',
        how_it_differs:
            'Unlike occasional use, these disorders involve harm or dependence with craving, difficulty controlling use, and withdrawal. Stronger, modern cannabis and frequent use raise the risk. Unlike the common belief that cannabis is not addictive, dependence and a withdrawal syndrome are well recognised.',
        when_more_than_everyday:
            'Consider help when cannabis is affecting your mood, motivation, memory, sleep, relationships, work, or finances; when you find it hard to cut down; or when stopping brings irritability, anxiety, or sleep problems. Help is available whether or not you see yourself as "dependent".',
        sections: [
            { heading: 'A spectrum, not a single thing', body: 'Cannabis-related problems range from a harmful pattern of use (harming physical or mental health or daily life) to dependence — craving, difficulty controlling use, prioritising cannabis over other activities, tolerance, and a withdrawal state (irritability, anxiety, sleep and appetite changes) on stopping. Intoxication and, less commonly, cannabis-induced anxiety or psychotic symptoms can also occur.' },
            { heading: 'Signs of a problem', body: 'Signs include using more or more often than intended, difficulty cutting down, building daily routines around use, using to cope with stress or to sleep, neglecting responsibilities, and withdrawal symptoms when not using. Effects on motivation, concentration, and memory, and worsening anxiety or low mood, are common reasons people seek help.' },
            { heading: 'Health and mental-health effects', body: 'Regular, heavy use — especially of high-strength cannabis and starting young — is linked to anxiety, depression, and a raised risk of psychosis in vulnerable people, as well as effects on memory, motivation, and lung health when smoked. Driving while intoxicated is dangerous. The risks rise with frequency and strength of use.' },
            { heading: 'Why it develops', body: 'As with other substances, it reflects a mix of genetics, mental health, environment, and changes in the brain’s reward system with regular use. Many people use cannabis to manage anxiety, low mood, pain, or sleep, which can entrench a cycle of dependence.' },
            { heading: 'Treatment and recovery', body: 'Psychological therapies (such as cognitive behavioural therapy and motivational approaches) are the mainstay and work well; managing the withdrawal period, improving sleep and stress coping, and treating any underlying anxiety, depression, or trauma all help. Peer support can add to this. Many people cut down or stop successfully, often after a few attempts.' },
            forFamily('cannabis'),
            { heading: 'When to get help', body: 'Speak to a GP or a local drug service if cannabis is affecting your mental health, motivation, or daily life, or you struggle to cut down. Seek urgent help for severe anxiety, paranoia, or any psychotic symptoms, and crisis help for thoughts of suicide or self-harm.' },
        ],
        sources: [WHO_ICD11, NHS_DRUGHELP],
    },

    'disorders-due-to-use-of-synthetic-cannabinoids': {
        short_definition:
            'An umbrella for problems from using synthetic cannabinoids — lab-made chemicals (sometimes sold under street names such as "spice") sprayed onto plant material to mimic cannabis, but often far more potent and unpredictable. They can cause severe intoxication, dependence, and a withdrawal state, and carry serious, sometimes life-threatening risks that differ from natural cannabis.',
        what_it_feels_like:
            'Effects are often stronger, more erratic, and more frightening than cannabis — intense agitation, confusion, paranoia, or sedation that varies batch to batch because the chemicals and strengths are unknown. People can quickly find use hard to control, and stopping can bring marked withdrawal. The unpredictability is part of what makes these substances dangerous.',
        how_it_differs:
            'Unlike natural cannabis, synthetic cannabinoids are typically much more potent and unpredictable, with a higher risk of severe reactions, medical emergencies, and dependence. Because the actual chemicals vary and are often unknown, effects and dangers are hard to predict, which sets them apart from other substances.',
        when_more_than_everyday:
            'Any use is high-risk, but seek help especially if use is hard to control, is harming your health or life, or if stopping brings withdrawal. Severe agitation, chest pain, seizures, or collapse after use are medical emergencies.',
        sections: [
            { heading: 'A spectrum, not a single thing', body: 'As with other substances, problems range from a harmful pattern of use to dependence with craving, loss of control, and withdrawal. Because of their potency and unpredictability, however, even occasional use of synthetic cannabinoids carries a high risk of severe intoxication and medical emergencies.' },
            { heading: 'Signs and serious risks', body: 'Intoxication can cause extreme agitation, confusion, paranoia, hallucinations, vomiting, a racing or irregular heart, seizures, and loss of consciousness — and has been linked to serious harm and deaths. Signs of a use disorder include difficulty controlling use, prioritising the drug, and withdrawal symptoms when stopping.' },
            { heading: 'Why they are especially dangerous', body: 'These are unregulated, constantly changing chemicals; users rarely know what or how much they are taking, and potency can be far higher than cannabis. This makes overdoses, severe reactions, and dependence more likely and harder to predict or treat.' },
            { heading: 'Why it develops', body: 'Use is shaped by availability, cost, environment, mental health, and the strong effects on the brain’s reward system. People who are marginalised or in certain settings may be at higher risk. As with all substances, it is a health issue, not a moral failing.' },
            { heading: 'Treatment and recovery', body: 'Support combines managing intoxication and withdrawal safely (sometimes needing medical care), psychological therapies, treatment of co-occurring mental and physical health problems, and harm-reduction advice. Specialist drug services can help people stop and stay well. Recovery is possible with support.' },
            forFamily('synthetic cannabinoids'),
            { heading: 'When to get help', body: 'Contact a drug service or GP if use is harming you or hard to control. Treat severe agitation, chest pain, seizures, breathing problems, or collapse after use as a medical emergency — call emergency services. Seek crisis help for any thoughts of suicide or self-harm.' },
        ],
        sources: [WHO_ICD11, NHS_DRUGHELP],
    },

    'disorders-due-to-use-of-opioids': {
        short_definition:
            'An umbrella for problems from opioid use — including heroin and prescription painkillers such as morphine, oxycodone, and codeine — from a harmful pattern of use to dependence, plus intoxication and a distressing withdrawal state. Opioid dependence is a serious health condition with a real risk of overdose and death, and it is one of the most treatable, with effective medical treatments available.',
        what_it_feels_like:
            'Opioids can relieve pain and produce a sense of calm or euphoria, but tolerance builds quickly, and dependence can develop even when a medicine is taken as prescribed. People often describe using to feel "normal" and to avoid withdrawal, which is intensely uncomfortable. The fear of withdrawal and the pull of the drug can feel overwhelming, alongside shame and isolation.',
        how_it_differs:
            'Unlike short-term, supervised pain relief, an opioid use disorder involves harm or dependence with craving, loss of control, tolerance, and withdrawal. Opioids stand out for their high overdose risk — they can slow or stop breathing — which makes overdose awareness and treatment especially important.',
        when_more_than_everyday:
            'Seek help when opioid use is hard to control, is harming your life, continues beyond medical need, or when stopping brings withdrawal. This is urgent because of the overdose risk — and because highly effective treatments exist.',
        sections: [
            { heading: 'A spectrum, not a single thing', body: 'Opioid problems range from a harmful pattern of use to dependence — craving, tolerance, difficulty controlling use, prioritising opioids, and a withdrawal syndrome (aches, sweating, agitation, stomach upset, intense craving) on stopping. Intoxication and, critically, overdose are part of the picture.' },
            { heading: 'Overdose — the key danger', body: 'Opioids can dangerously slow or stop breathing, especially when combined with alcohol or sedatives, after a break in use (when tolerance has dropped), or with unknown-strength street drugs. Signs of overdose include pinpoint pupils, slow or stopped breathing, and unresponsiveness — a medical emergency. The medication naloxone can reverse an opioid overdose and is often available to people at risk and their families.' },
            { heading: 'Signs of a problem', body: 'Signs include using more or longer than intended, difficulty cutting down, craving, using to avoid withdrawal, neglecting responsibilities, and continued use despite harm. Dependence can develop with prescribed opioids too, which is not a personal failing.' },
            { heading: 'Why it develops', body: 'Opioids strongly affect the brain’s reward and pain systems, and dependence can build quickly. Pain, mental health, trauma, environment, and genetics all play a part. Many people’s opioid problems begin with legitimate pain treatment.' },
            { heading: 'Treatment and recovery', body: 'Opioid dependence is highly treatable. Medication-based treatment (opioid agonist treatments prescribed and monitored by specialists) greatly reduces craving, withdrawal, overdose risk, and harm, and supports stable recovery, alongside psychological support and help with housing, health, and social needs. Take-home naloxone saves lives. Recovery is very possible, and staying in treatment improves outcomes.' },
            forFamily('opioids'),
            { heading: 'When to get help', body: 'Contact a GP or drug service — opioid treatment is effective and you are entitled to it. Learn the signs of overdose and how to access naloxone. Treat slow or stopped breathing or unresponsiveness as an emergency: call emergency services and give naloxone if available. Seek crisis help for thoughts of suicide or self-harm.' },
        ],
        sources: [WHO_ICD11, NHS_DRUGHELP],
    },

    'disorders-due-to-use-of-sedatives-hypnotics-or-anxiolytics': {
        short_definition:
            'An umbrella for problems from using sedative, sleep, or anti-anxiety medicines — such as benzodiazepines and "z-drugs" — from a harmful pattern of use to dependence, plus intoxication and a withdrawal state that can be medically serious. Dependence can develop even with prescribed use, and stopping suddenly after regular use can be dangerous, so changes are made gradually with medical guidance.',
        what_it_feels_like:
            'These medicines can ease anxiety or aid sleep, but with regular use the body adapts: more is needed for the same effect, anxiety and sleeplessness can rebound, and stopping brings uncomfortable — sometimes dangerous — withdrawal. People may feel reliant, anxious about running out, and unsure how to stop safely.',
        how_it_differs:
            'Unlike short-term, supervised use, a sedative use disorder involves harm or dependence with tolerance, difficulty stopping, and withdrawal. Unlike some drugs, withdrawal from these medicines can be medically serious (including seizures), so it must be managed gradually and with medical support, never stopped abruptly alone.',
        when_more_than_everyday:
            'Seek advice when use continues beyond what was intended, when more is needed for the same effect, when you cannot stop or feel unwell trying, or when use is affecting daily life. Importantly, do not stop suddenly after regular use — ask a doctor about a safe, gradual plan.',
        sections: [
            { heading: 'A spectrum, not a single thing', body: 'Problems range from a harmful pattern of use to dependence — tolerance, difficulty controlling use, prioritising the medicine, and withdrawal on stopping. Dependence can arise from prescribed use, particularly with longer-term use, and is not a personal failing.' },
            { heading: 'Why withdrawal needs care', body: 'Stopping suddenly after regular use of these medicines can cause serious withdrawal, including severe anxiety, insomnia, and, in some cases, seizures. For this reason, coming off them is done slowly, with a doctor’s guidance and a gradual reduction plan — never abruptly and alone.' },
            { heading: 'Signs of a problem', body: 'Signs include needing more for the same effect, using more or longer than intended, difficulty stopping, anxiety about supply, daytime drowsiness or memory problems, and combining them with alcohol or other sedatives (which is dangerous). Rebound anxiety and insomnia between doses are common.' },
            { heading: 'Why it develops', body: 'These medicines act on the brain’s calming systems, which adapt with regular use. Underlying anxiety, insomnia, or other distress often drives ongoing use, and dependence can build gradually, frequently starting with a legitimate prescription.' },
            { heading: 'Treatment and recovery', body: 'Treatment centres on a carefully supervised, gradual reduction, alongside support for the underlying anxiety or sleep problems (psychological therapies are particularly helpful), and managing any other substance use. With a slow plan and support, most people can reduce or stop safely. Recovery is very achievable.' },
            forFamily('sedative or anti-anxiety medicines'),
            { heading: 'When to get help', body: 'Talk to the prescribing doctor or a drug service about a safe plan — do not stop abruptly after regular use. Seek urgent help for severe withdrawal, fits, or signs of overdose (very drowsy, slow breathing, unresponsive — especially if combined with alcohol or opioids), and crisis help for thoughts of suicide or self-harm.' },
        ],
        sources: [WHO_ICD11, NHS_DRUGHELP],
    },

    'disorders-due-to-use-of-cocaine': {
        short_definition:
            'An umbrella for problems from cocaine use — from a harmful pattern to dependence — along with intoxication and a withdrawal "crash". Cocaine is a powerful stimulant; problems can develop quickly, and it carries serious risks to the heart and mind. These are treatable health conditions.',
        what_it_feels_like:
            'Cocaine produces a short, intense high of energy, confidence, and euphoria, followed by a "crash" of low mood, fatigue, and craving that drives more use. People often use more than intended, binge, spend heavily, and feel low, anxious, or paranoid between use. The cycle can escalate fast.',
        how_it_differs:
            'Unlike occasional use, a cocaine use disorder involves harm or dependence with strong craving, loss of control, and a withdrawal crash. Cocaine stands out for its acute risks to the heart and its strong, fast-developing craving, and for the danger of mixing it with alcohol or other drugs.',
        when_more_than_everyday:
            'Seek help when cocaine use is hard to control, is harming your health, mood, relationships, or finances, or when you use to chase the high or avoid the crash. Chest pain, severe agitation, or collapse after use are emergencies.',
        sections: [
            { heading: 'A spectrum, not a single thing', body: 'Problems range from a harmful pattern of use to dependence — intense craving, difficulty controlling use, prioritising cocaine, and a withdrawal crash (exhaustion, low mood, increased appetite, craving) after use. Bingeing is common, and dependence can develop relatively quickly.' },
            { heading: 'Health and safety risks', body: 'Cocaine raises heart rate and blood pressure and can cause chest pain, heart rhythm problems, heart attack, stroke, and seizures, even in young, healthy people. It can trigger severe anxiety, paranoia, and aggression. Mixing cocaine with alcohol produces a more toxic substance in the body, and combining with other drugs is especially dangerous.' },
            { heading: 'Signs of a problem', body: 'Signs include using more or longer than intended, strong craving, bingeing, spending large amounts, neglecting responsibilities, mood swings and paranoia, and using despite clear harm. Low mood, anxiety, and exhaustion between use are common.' },
            { heading: 'Why it develops', body: 'Cocaine strongly stimulates the brain’s reward system, producing powerful craving. Genetics, mental health, environment, and the rapid high–crash cycle all contribute. As with all substances, it is a health condition, not a moral weakness.' },
            { heading: 'Treatment and recovery', body: 'There is no specific medication for cocaine dependence, but psychological therapies — such as cognitive behavioural therapy and contingency-based and motivational approaches — are effective, alongside treating co-occurring mental health problems and building support and structure. Many people recover with the right help; lapses are part of the process, not failure.' },
            forFamily('cocaine'),
            { heading: 'When to get help', body: 'Contact a GP or drug service if cocaine use is harming you or hard to control. Treat chest pain, severe agitation, breathing problems, fits, or collapse after use as a medical emergency. Seek crisis help for thoughts of suicide or self-harm, which can spike during the crash.' },
        ],
        sources: [WHO_ICD11, NHS_DRUGHELP],
    },

    'disorders-due-to-use-of-stimulants-including-amphetamines': {
        short_definition:
            'An umbrella for problems from stimulants such as amphetamine and methamphetamine (excluding cocaine, which is classed separately) — from a harmful pattern to dependence, plus intoxication and a withdrawal crash. These powerful stimulants can cause serious physical and mental harm, and dependence is treatable.',
        what_it_feels_like:
            'Stimulants produce energy, alertness, confidence, and reduced need for sleep, often followed by a crash of exhaustion, low mood, and craving. People may stay awake for long periods, binge, and then crash hard. Heavy use can bring anxiety, paranoia, and, at times, psychosis, and the cycle can escalate.',
        how_it_differs:
            'Unlike occasional or prescribed stimulant use, a stimulant use disorder involves harm or dependence with craving, loss of control, and a withdrawal crash. Methamphetamine in particular is associated with severe dependence and marked physical and mental harm. (Cocaine is classified separately.)',
        when_more_than_everyday:
            'Seek help when stimulant use is hard to control, is harming your health, sleep, mood, or life, or when you binge and crash. Severe agitation, chest pain, overheating, or psychotic symptoms after use need urgent care.',
        sections: [
            { heading: 'A spectrum, not a single thing', body: 'Problems range from a harmful pattern of use to dependence — strong craving, difficulty controlling use, prioritising the drug, tolerance, and a withdrawal crash (exhaustion, low mood, heavy sleep, increased appetite, craving). Binge–crash cycles and prolonged sleeplessness are common.' },
            { heading: 'Health and mental-health risks', body: 'Stimulants strain the heart (raising the risk of chest pain, rhythm problems, heart attack, and stroke), can cause dangerous overheating and seizures, and damage sleep, weight, and dental and skin health with heavy use. Heavy or prolonged use can cause severe anxiety, paranoia, aggression, and stimulant-induced psychosis, which usually settles with abstinence and treatment.' },
            { heading: 'Signs of a problem', body: 'Signs include using more or longer than intended, craving, bingeing, staying awake for long periods, neglecting responsibilities, mood and weight changes, paranoia, and using despite harm. The crash period brings low mood and exhaustion.' },
            { heading: 'Why it develops', body: 'Stimulants powerfully activate the brain’s reward system, driving craving and repeated use. Genetics, mental health, environment, and the high–crash cycle all contribute. It is a health condition, not a moral failing.' },
            { heading: 'Treatment and recovery', body: 'As with cocaine, there is no specific approved medication, but psychological therapies (cognitive behavioural, motivational, and contingency-based approaches) are effective, alongside treating any stimulant-induced or co-occurring mental health problems and rebuilding sleep, structure, and support. Recovery is achievable with sustained help.' },
            forFamily('stimulants'),
            { heading: 'When to get help', body: 'Contact a GP or drug service if stimulant use is harming you or hard to control. Treat chest pain, severe agitation, very high temperature, fits, or psychotic symptoms as a medical emergency. Seek crisis help for thoughts of suicide or self-harm, which can be high during the crash.' },
        ],
        sources: [WHO_ICD11, NHS_DRUGHELP],
    },

    'disorders-due-to-use-of-synthetic-cathinones': {
        short_definition:
            'An umbrella for problems from synthetic cathinones — lab-made stimulants (sometimes called "bath salts" or by other street names) chemically related to amphetamines — from a harmful pattern to dependence, plus intoxication and withdrawal. They are potent, unpredictable, and carry serious physical and mental health risks.',
        what_it_feels_like:
            'Effects resemble other stimulants — energy, euphoria, and reduced need for sleep — but are often stronger and more erratic, with a higher risk of agitation, paranoia, and frightening reactions because the exact chemical and strength are usually unknown. Use can quickly become hard to control.',
        how_it_differs:
            'Unlike better-known stimulants, synthetic cathinones are unregulated, ever-changing chemicals of unknown potency, which raises the risk of severe intoxication and medical emergencies. This unpredictability sets them apart and makes any use high-risk.',
        when_more_than_everyday:
            'Any use carries serious risk; seek help especially if use is hard to control or harming you. Severe agitation, chest pain, very high temperature, seizures, or collapse after use are medical emergencies.',
        sections: [
            { heading: 'A spectrum, not a single thing', body: 'As with other stimulants, problems range from a harmful pattern to dependence with craving, loss of control, and a withdrawal crash. Because of their potency and unpredictability, even occasional use carries a high risk of severe reactions.' },
            { heading: 'Health and safety risks', body: 'Synthetic cathinones can cause severe agitation, paranoia, hallucinations, dangerously high temperature, a racing or irregular heart, chest pain, seizures, and serious — sometimes fatal — reactions. Because composition and strength vary, effects and dangers are hard to predict.' },
            { heading: 'Signs of a problem', body: 'Signs include difficulty controlling use, craving, prioritising the drug, bingeing and sleeplessness, paranoia and agitation, and using despite harm. A withdrawal crash of low mood and exhaustion is common.' },
            { heading: 'Why it develops', body: 'Like other stimulants, these drugs strongly activate the brain’s reward system. Availability, cost, environment, and mental health all play a part. It is a health issue, not a moral failing.' },
            { heading: 'Treatment and recovery', body: 'Support combines safely managing intoxication and withdrawal (sometimes needing medical care), psychological therapies, treatment of co-occurring mental health problems, and harm-reduction advice. Specialist drug services can help. Recovery is possible with support.' },
            forFamily('synthetic cathinones'),
            { heading: 'When to get help', body: 'Contact a drug service or GP if use is harming you or hard to control. Treat severe agitation, chest pain, very high temperature, seizures, or collapse as a medical emergency. Seek crisis help for thoughts of suicide or self-harm.' },
        ],
        sources: [WHO_ICD11, NHS_DRUGHELP],
    },

    'disorders-due-to-use-of-caffeine': {
        short_definition:
            'An umbrella for problems arising from caffeine — from harmful patterns of very high intake to dependence with a recognised withdrawal state, along with caffeine intoxication. Caffeine is the world’s most widely used stimulant and is safe for most people in moderate amounts; problems arise mainly with heavy use or in people sensitive to it.',
        what_it_feels_like:
            'For most people caffeine is a harmless pick-me-up. With heavy intake, some experience jitteriness, anxiety, a racing heart, and disrupted sleep, and find they need it to feel normal, with headaches, tiredness, and low mood when they cut back. A few are very sensitive even to modest amounts.',
        how_it_differs:
            'Unlike ordinary, moderate coffee or tea drinking, a caffeine use disorder involves a harmful pattern or dependence — difficulty cutting down despite harm (such as anxiety, insomnia, or heart symptoms) and withdrawal on stopping. Caffeine’s risks are generally milder than other substances, but heavy intake (often from energy drinks or supplements) can cause real problems.',
        when_more_than_everyday:
            'Consider cutting down or seeking advice if caffeine is causing anxiety, insomnia, a racing heart, or stomach problems, if you cannot reduce it despite this, or if stopping brings troublesome headaches and fatigue. Very high intake — especially from energy drinks or caffeine powders — warrants particular care.',
        sections: [
            { heading: 'A spectrum, not a single thing', body: 'Most caffeine use is harmless. Problems involve a harmful pattern (intake that causes or worsens anxiety, insomnia, or heart symptoms) or dependence — difficulty cutting down despite harm, and a withdrawal syndrome (headache, tiredness, low mood, poor concentration, irritability) on stopping. Caffeine intoxication can occur with very high intake.' },
            { heading: 'Signs and effects', body: 'High intake can cause restlessness, anxiety, a fast or irregular heartbeat, stomach upset, and trouble sleeping. Very large amounts — particularly from energy drinks, tablets, or pure caffeine powder — can be dangerous. Sensitivity varies widely between people.' },
            { heading: 'Why it develops', body: 'The body adapts to regular caffeine, so more may be needed for the same lift and withdrawal occurs when stopping. Habit, fatigue, demanding schedules, and the wide availability of strong caffeinated products all contribute.' },
            { heading: 'How to cut down', body: 'Reducing caffeine gradually (rather than stopping abruptly) helps avoid withdrawal headaches and fatigue. Tracking sources (coffee, tea, cola, energy drinks, some medicines and supplements), switching to lower-caffeine or decaf options, and avoiding caffeine later in the day to protect sleep all help.' },
            { heading: 'Treatment and support', body: 'Most people can manage caffeine themselves by cutting down gradually. Where anxiety or insomnia is involved, addressing those directly helps. Anyone with heart symptoms or who consumes very high amounts (especially from energy products) should speak to a doctor.' },
            forFamily('caffeine'),
            { heading: 'When to get help', body: 'See a GP if caffeine is causing anxiety, insomnia, or heart symptoms you cannot resolve by cutting down, or if you are using very high amounts. Seek urgent care for chest pain, a very fast or irregular heartbeat, fits, or collapse after very high intake.' },
        ],
        sources: [WHO_ICD11],
    },

    'disorders-due-to-use-of-hallucinogens': {
        short_definition:
            'An umbrella for problems from hallucinogens — such as LSD, psilocybin ("magic mushrooms"), and related substances — including a harmful pattern of use and, less commonly, dependence, along with intoxication and lasting perceptual effects. While dependence is less typical than with some drugs, hallucinogens carry psychological risks, especially difficult experiences and, rarely, persistent perceptual changes.',
        what_it_feels_like:
            'Hallucinogens alter perception, thought, and mood, producing experiences that can range from profound or pleasant to frightening ("bad trips") with intense fear, confusion, or paranoia. Effects are strongly shaped by mood, setting, and expectation, and are unpredictable. Some people develop problematic, harmful patterns of use.',
        how_it_differs:
            'Unlike many substances, classic hallucinogens are not strongly physically addictive and rarely cause a typical withdrawal syndrome, though tolerance builds quickly. The main concerns are acute psychological harm (frightening experiences, risky behaviour while intoxicated) and, rarely, lasting perceptual disturbances or triggering of mental health problems in vulnerable people.',
        when_more_than_everyday:
            'Seek help if hallucinogen use is harming your mental health or life, becoming a recurring way to cope, or if you experience lasting distressing perceptual changes or worsening anxiety, low mood, or psychosis. Severe distress during intoxication needs a calm, safe environment and, if needed, medical help.',
        sections: [
            { heading: 'A spectrum, not a single thing', body: 'Problems most often take the form of a harmful pattern of use — use that damages mental health or daily life — and, less commonly, dependence. Tolerance builds rapidly. Acute intoxication can include altered perception, intense emotions, and impaired judgment.' },
            { heading: 'Psychological risks', body: 'The main risks are psychological: frightening experiences ("bad trips") with panic, paranoia, or confusion; risky behaviour due to altered perception; triggering or worsening anxiety, low mood, or psychosis in vulnerable people; and, rarely, persistent perceptual changes (such as visual disturbances) after use. A calm, safe setting and trusted company reduce acute risk.' },
            { heading: 'Signs of a problem', body: 'Signs include using in a way that harms mental health or life, using to escape or cope, distress during or after experiences, and continued use despite harm. Worsening anxiety, low mood, or unusual perceptual experiences are reasons to seek help.' },
            { heading: 'Why problems develop', body: 'Although not strongly physically addictive, hallucinogen use can become a harmful pattern, shaped by mental health, environment, and the search for meaning or escape. Vulnerable people (for example, with a personal or family history of psychosis) are at greater risk of harm.' },
            { heading: 'Treatment and support', body: 'Support is mainly psychological — addressing the reasons for use, managing any lasting perceptual or mental health effects, and treating co-occurring anxiety, depression, or psychosis. During a frightening experience, a calm, reassuring, safe environment helps; medical help may be needed for severe distress. Recovery is very achievable.' },
            forFamily('hallucinogens'),
            { heading: 'When to get help', body: 'See a GP or drug service if hallucinogen use is harming your mental health or life, or you develop lasting perceptual changes or worsening mental health. Seek urgent help for severe panic, psychosis, or risky behaviour during intoxication, and crisis help for thoughts of suicide or self-harm.' },
        ],
        sources: [WHO_ICD11, NHS_DRUGHELP],
    },

    'disorders-due-to-use-of-nicotine': {
        short_definition:
            'An umbrella for problems from nicotine — most often from smoking tobacco, and also from vaping and other products — centring on dependence, with strong craving and a withdrawal state, along with harmful patterns of use. Nicotine is highly addictive, and tobacco smoking is one of the leading causes of preventable illness and death; stopping at any age brings major health benefits, and effective help is available.',
        what_it_feels_like:
            'Nicotine dependence shows up as strong, frequent cravings, smoking or vaping soon after waking, using more than intended, and finding it very hard to stop despite wanting to, with irritability, restlessness, low mood, and poor concentration during withdrawal. Many people have tried to quit several times — which is normal, not failure.',
        how_it_differs:
            'Unlike substances with dramatic intoxication, nicotine’s problem is powerful dependence: strong craving and withdrawal that drive continued use. With tobacco, the greatest harm comes from the other chemicals in smoke rather than nicotine itself, which is why stopping smoking — with support — is such a high-impact health goal.',
        when_more_than_everyday:
            'It is worth seeking help whenever you want to stop smoking or using nicotine and find it hard — you do not need a "problem level" to deserve support. Quitting is one of the best things you can do for your health, and combining medication with support greatly improves success.',
        sections: [
            { heading: 'Dependence and withdrawal', body: 'Nicotine dependence involves craving, tolerance, using soon after waking, difficulty cutting down, and a withdrawal state (irritability, anxiety, restlessness, low mood, poor concentration, increased appetite) that eases with use. These features keep people using even when they want to stop, and explain why willpower alone is often not enough.' },
            { heading: 'Health effects (mainly from smoking)', body: 'Smoking tobacco harms nearly every organ and is a leading cause of cancers, heart and lung disease, and early death; it also harms others through second-hand smoke. Most of this harm comes from burning tobacco, not nicotine itself. Stopping smoking at any age substantially improves health and life expectancy.' },
            { heading: 'Why it develops', body: 'Nicotine quickly produces dependence by acting on the brain’s reward system, reinforced by daily habits and cues, stress relief, and social factors. Starting young increases the risk. It is a recognised dependence, not a simple lack of willpower.' },
            { heading: 'Treatment and quitting', body: 'Stop-smoking support works, especially when combined: nicotine replacement (patches, gum, and similar) or other stop-smoking medicines, plus behavioural support from a stop-smoking service, greatly increase the chances of quitting for good. Switching completely from smoking to regulated vaping is widely considered far less harmful for adults who would otherwise keep smoking, though not risk-free. Most successful quitters needed several attempts.' },
            { heading: 'Making a quit attempt work', body: 'Helpful steps include setting a quit date, using effective medication or nicotine replacement, getting behavioural support, identifying and planning for triggers, and treating a lapse as a learning point rather than a failure. Each attempt builds toward success.' },
            forFamily('nicotine and smoking'),
            { heading: 'When to get help', body: 'Ask a GP, pharmacist, or local stop-smoking service for support whenever you want to quit — combined support and medication work best. Seek prompt medical advice for new breathing problems, chest pain, or other concerning symptoms.' },
        ],
        sources: [WHO_ICD11],
    },

    'disorders-due-to-use-of-volatile-inhalants': {
        short_definition:
            'An umbrella for problems from inhaling volatile substances — such as solvents, glues, aerosols, gases, and certain household or industrial products — to get high, from a harmful pattern to dependence, along with intoxication and withdrawal. Inhalants are especially dangerous because they can cause sudden death even on a first use, and they can seriously damage the brain and other organs.',
        what_it_feels_like:
            'Inhalants produce a quick, short-lived intoxication — dizziness, euphoria, slurred speech, and disorientation — followed by drowsiness and headache. Use is most common among young people and can quickly become harmful. Because the high is brief, people often repeat use, increasing the danger.',
        how_it_differs:
            'Unlike most substances, inhalants carry a risk of "sudden sniffing death" — a fatal heart rhythm disturbance that can occur even on a first or occasional use. They are also widely available as everyday products, and heavy use can cause lasting brain, nerve, liver, and kidney damage. These features make inhalants particularly dangerous.',
        when_more_than_everyday:
            'Any inhalant use is high-risk and warrants concern, especially in young people. Seek help if use is occurring, becoming repeated or hard to control, or harming health or development. Collapse, fits, or unresponsiveness during or after use are emergencies.',
        sections: [
            { heading: 'A spectrum, and acute danger', body: 'Problems range from a harmful pattern of use to dependence with craving and difficulty stopping. But a defining feature is acute danger: inhalants can cause a sudden fatal heart rhythm problem ("sudden sniffing death") even on a first use, as well as suffocation and accidents while intoxicated.' },
            { heading: 'Health effects', body: 'Beyond the acute risk of sudden death, repeated use can damage the brain and nervous system (affecting memory, coordination, and thinking), the liver, kidneys, and heart, and can cause lasting harm, especially in developing young people. Intoxication impairs judgment and coordination, raising the risk of accidents.' },
            { heading: 'Signs of a problem', body: 'Signs may include chemical smells on breath or clothing, hidden empty containers or rags, slurred speech, disorientation, sores around the mouth or nose, and changes in mood, school, or behaviour. Repeated use and difficulty stopping point to a use disorder.' },
            { heading: 'Why it develops', body: 'Inhalants are cheap, legal, and easy to obtain, which makes them more accessible to young people. Environment, peer factors, distress, and the rapid effect on the brain all play a part. As with all substances, it is a health and safeguarding issue, not simply "bad behaviour".' },
            { heading: 'Treatment and recovery', body: 'Support involves keeping the person safe, treating any acute effects, addressing underlying difficulties and the home and social environment, and psychological support — often with family involvement for young people. Specialist services can help. Recovery is achievable, and reducing access to inhalants is part of safety.' },
            forFamily('volatile inhalants'),
            { heading: 'When to get help', body: 'Seek help from a GP, school, or drug service if inhalant use is suspected, especially in a young person. Treat collapse, fits, chest pain, or unresponsiveness during or after use as a medical emergency — call emergency services. Seek crisis help for thoughts of suicide or self-harm.' },
        ],
        sources: [WHO_ICD11, NHS_DRUGHELP],
    },

    'disorders-due-to-use-of-mdma-or-related-drugs': {
        short_definition:
            'An umbrella for problems from MDMA ("ecstasy") and related drugs — substances with both stimulant and mild perception-altering effects — including harmful patterns of use and, less commonly, dependence, along with intoxication and an "after-effects" low. MDMA carries real acute risks, particularly overheating and effects on the heart, and a characteristic low mood in the days after use.',
        what_it_feels_like:
            'MDMA produces feelings of energy, warmth, closeness to others, and euphoria, often in social or dance settings, followed in the days afterwards by low mood, fatigue, and irritability (sometimes called the "comedown"). Effects and risks are heightened by unknown purity and dose, heat, and dehydration.',
        how_it_differs:
            'Unlike strongly addictive drugs, MDMA dependence is less common, and tolerance tends to reduce its desired effects with frequent use. The main concerns are acute harms — dangerous overheating, effects on the heart and, with excessive water intake, on body salts — and the after-effects low, plus the unpredictability of unregulated pills and powders.',
        when_more_than_everyday:
            'Seek help if MDMA use is becoming frequent or hard to control, is harming your mood or life, or if you experience severe comedowns or worsening mental health. Overheating, collapse, confusion, or seizures during use are medical emergencies.',
        sections: [
            { heading: 'A spectrum, not a single thing', body: 'Problems most often involve a harmful pattern of use, with dependence being less common than for some drugs. Frequent use tends to reduce the desired effects (tolerance) and worsen the after-effects. Acute intoxication brings stimulant and mild perceptual effects.' },
            { heading: 'Acute risks', body: 'Key dangers include dangerous overheating (especially when dancing in hot environments), effects on the heart, and, paradoxically, harm from drinking too much water, which can dangerously dilute the body’s salts. Unregulated pills and powders vary widely in strength and content, and mixing with other drugs increases risk. The days-after low can include marked low mood.' },
            { heading: 'Signs of a problem', body: 'Signs include using more often than intended, difficulty cutting down, planning life around use, severe comedowns, and worsening anxiety or low mood. Continued use despite harm points to a use disorder.' },
            { heading: 'Why problems develop', body: 'MDMA affects the brain’s mood and reward chemistry, and use is shaped by social settings, mental health, and environment. While dependence is less typical, harmful patterns can develop, and the after-effects can entrench low mood.' },
            { heading: 'Treatment and support', body: 'Support is mainly psychological — addressing the reasons for use, managing mood effects, and treating any co-occurring anxiety or depression — alongside harm-reduction advice. Specialist services can help where use is problematic. Recovery is very achievable.' },
            forFamily('MDMA and related drugs'),
            { heading: 'When to get help', body: 'See a GP or drug service if MDMA use is becoming frequent, hard to control, or harming your mood or life. Treat overheating, collapse, confusion, chest pain, or seizures during use as a medical emergency. Seek crisis help for thoughts of suicide or self-harm, which can rise during the comedown.' },
        ],
        sources: [WHO_ICD11, NHS_DRUGHELP],
    },

    'disorders-due-to-use-of-dissociative-drugs': {
        short_definition:
            'An umbrella for problems from dissociative drugs such as ketamine and PCP — substances that produce a sense of detachment from the body and surroundings — including harmful patterns of use and dependence, along with intoxication and, for some, a withdrawal state. These drugs carry risks of accidents, mental health effects, and, with heavy ketamine use, serious bladder and other physical damage.',
        what_it_feels_like:
            'Dissociative drugs create feelings of detachment, dreaminess, and altered perception, which at higher doses can become disorienting or frightening, with confusion, immobility, or a sense of being cut off from reality. Heavy, regular use can become hard to control, and ketamine in particular can cause painful bladder problems.',
        how_it_differs:
            'Unlike many substances, the hallmark is dissociation — feeling detached from body and surroundings — which raises the risk of accidents and frightening experiences. Ketamine stands out for causing serious bladder damage with heavy use. PCP can cause marked agitation and unpredictable behaviour. Dependence can develop, especially with ketamine.',
        when_more_than_everyday:
            'Seek help if use is becoming frequent or hard to control, is harming your health or life, or if you develop bladder or urinary problems (with ketamine) or worsening mental health. Severe agitation, unresponsiveness, or injury during use needs urgent care.',
        sections: [
            { heading: 'A spectrum, not a single thing', body: 'Problems range from a harmful pattern of use to dependence — craving, difficulty controlling use, prioritising the drug, and, for some, withdrawal. Tolerance can build, leading to heavier use, particularly with ketamine.' },
            { heading: 'Health and safety risks', body: 'Dissociation impairs awareness and coordination, raising the risk of accidents and harm while intoxicated. Heavy, regular ketamine use can cause serious, sometimes irreversible bladder and urinary tract damage and stomach pain. PCP can cause severe agitation and unpredictable, occasionally dangerous behaviour. Mixing with other drugs increases risk.' },
            { heading: 'Signs of a problem', body: 'Signs include using more or more often than intended, difficulty cutting down, planning life around use, urinary or bladder problems (with ketamine), and continued use despite harm. Mood and memory effects, and detachment that spills into daily life, can also occur.' },
            { heading: 'Why it develops', body: 'These drugs act on brain systems involved in perception and reward; dependence can develop, especially with frequent ketamine use. Mental health, environment, and the appeal of dissociation as escape all contribute. It is a health condition, not a moral failing.' },
            { heading: 'Treatment and recovery', body: 'Support includes psychological therapies, treating co-occurring mental health problems, and medical care for any physical harm (such as ketamine-related bladder damage, which may improve with stopping). Specialist drug services can help. Recovery is achievable, and stopping can reverse some physical harms.' },
            forFamily('dissociative drugs such as ketamine'),
            { heading: 'When to get help', body: 'Contact a GP or drug service if use is hard to control or harming you, and seek medical advice for any bladder, urinary, or stomach problems. Treat severe agitation, unresponsiveness, or injury during use as an emergency. Seek crisis help for thoughts of suicide or self-harm.' },
        ],
        sources: [WHO_ICD11, NHS_DRUGHELP],
    },

    'disorders-due-to-use-of-other-specified-psychoactive-substances': {
        short_definition:
            'A category for substance use disorders due to a specific psychoactive substance that does not fall under the named groups — covering the same spectrum of harmful use, dependence, intoxication, and withdrawal. It allows problems with less common or newer substances to be recognised and treated as the health conditions they are.',
        what_it_feels_like:
            'The experience depends on the particular substance, but the pattern of a use disorder is similar: using more than intended, difficulty cutting down, prioritising the substance, using despite harm, and sometimes withdrawal when stopping. People often feel the same loss of control, shame, and isolation seen with other substances.',
        how_it_differs:
            'This category is defined by the substance not being one of the specifically named groups, rather than by a different kind of problem. The harms and the approach to treatment follow the same principles as for other substance use disorders, tailored to the particular substance involved.',
        when_more_than_everyday:
            'Seek help when use of any psychoactive substance is hard to control or is harming your health, relationships, or life. You do not need a specific label — if a substance has a hold on you, support is available.',
        sections: [
            { heading: 'A spectrum, not a single thing', body: 'As with named substances, problems range from a harmful pattern of use to dependence — craving, loss of control, prioritising the substance, tolerance, and withdrawal — along with intoxication. The specific features depend on the substance, but the overall pattern of a use disorder is shared.' },
            { heading: 'Signs of a problem', body: 'General signs include using more or longer than intended, difficulty cutting down, spending a lot of time using or recovering, craving, neglecting responsibilities, and continuing despite harm. Withdrawal symptoms on stopping may also occur, depending on the substance.' },
            { heading: 'Why it develops', body: 'Like other substance use disorders, it reflects a mix of the substance’s effects on the brain’s reward system, genetics, mental health, and environment. It is a health condition, not a moral failing.' },
            { heading: 'Treatment and recovery', body: 'Treatment follows the same principles as for other substances: assessing the specific substance and its risks, managing intoxication and withdrawal safely, psychological therapies, treating co-occurring mental health problems, and harm reduction and support. Specialist drug services can advise on less common substances. Recovery is achievable.' },
            forFamily('the substance involved'),
            { heading: 'When to get help', body: 'Contact a GP or drug service if use of any substance is harming you or hard to control. Seek urgent medical help for severe intoxication, dangerous withdrawal, or a suspected overdose, and crisis help for thoughts of suicide or self-harm.' },
        ],
        sources: [WHO_ICD11, NHS_DRUGHELP],
    },

    'disorders-due-to-use-of-multiple-specified-psychoactive-substances': {
        short_definition:
            'A category for substance use disorders involving the use of several specified psychoactive substances together or over the same period — a very common real-world pattern. Using multiple substances can increase risks and complicate treatment, but the same recovery-focused principles apply, addressing all the substances involved.',
        what_it_feels_like:
            'Many people use more than one substance — for example, combining alcohol with stimulants, or opioids with sedatives — to enhance, balance, or manage the effects of each. This can make use harder to control and the risks harder to predict, and recovery can feel more complicated, but help that addresses the whole picture works.',
        how_it_differs:
            'Unlike a disorder centred on one substance, this involves several, which raises the risk of dangerous interactions (some combinations, such as opioids with alcohol or sedatives, are especially risky for overdose) and means treatment must address all the substances and the reasons behind their use.',
        when_more_than_everyday:
            'Seek help when the use of more than one substance is harming your health or life or is hard to control. Combining substances — especially anything that slows breathing, like opioids, alcohol, and sedatives together — sharply raises overdose risk, so this is important to address.',
        sections: [
            { heading: 'A common, higher-risk pattern', body: 'Using several substances together or in the same period is common. It can involve any combination, and the disorder spans the usual spectrum of harmful use and dependence across the substances involved. Combining substances can intensify effects, mask warning signs, and make intoxication, withdrawal, and overdose harder to predict.' },
            { heading: 'Why combinations are risky', body: 'Some combinations are particularly dangerous — for example, mixing opioids, alcohol, and sedatives can dangerously slow or stop breathing, and stimulant–depressant mixes strain the heart and mask each other’s effects. Unknown street-drug strength adds further unpredictability.' },
            { heading: 'Signs of a problem', body: 'Signs mirror those of single-substance disorders — loss of control, craving, prioritising substances, withdrawal, and harm — but across more than one substance, and with patterns of using one to manage the effects of another.' },
            { heading: 'Why it develops', body: 'Polysubstance use is shaped by the same factors as other substance use disorders — brain reward systems, mental health, environment, and availability — plus the way substances are combined to seek particular effects or to cope with comedowns and withdrawal.' },
            { heading: 'Treatment and recovery', body: 'Effective treatment addresses all the substances involved and the reasons behind their use, manages withdrawal safely (which can be more complex with multiple substances), and provides psychological support, treatment of co-occurring conditions, and harm reduction (including overdose awareness and naloxone where opioids are involved). Recovery is achievable with comprehensive support.' },
            forFamily('the substances involved'),
            { heading: 'When to get help', body: 'Contact a GP or drug service if using more than one substance is harming you or hard to control — tell them about everything you use, so care is safe. Treat suspected overdose (especially slowed breathing) as an emergency. Seek crisis help for thoughts of suicide or self-harm.' },
        ],
        sources: [WHO_ICD11, NHS_DRUGHELP],
    },

    'disorders-due-to-use-of-unknown-or-unspecified-psychoactive-substances': {
        short_definition:
            'A category used when a person has a substance use disorder but the specific substance is unknown or not specified — for example, when someone has taken an unidentified drug, or the details are not yet clear. It allows the problem to be recognised and treated promptly, following the same principles as for known substances.',
        what_it_feels_like:
            'A person may know they are using something harmful, or may have taken an unidentified substance (for example, an unknown pill or powder), without knowing exactly what it is. The uncertainty can be frightening, both for the person and for those helping them, and makes effects and risks harder to predict.',
        how_it_differs:
            'This category is defined by the substance being unknown or unspecified, not by a different kind of problem. Because the substance is unidentified, intoxication and withdrawal can be unpredictable, and a cautious, supportive medical approach is used until more is known.',
        when_more_than_everyday:
            'Seek help when use of any substance — even an unidentified one — is harming you or hard to control. If someone has taken an unknown substance and becomes unwell, seek medical help and share whatever is known, as this guides safe care.',
        sections: [
            { heading: 'When this category is used', body: 'It applies when a substance use disorder is present but the specific substance is unknown or not specified — for instance, after taking an unidentified drug, or where information is incomplete. The same spectrum of harmful use, dependence, intoxication, and withdrawal applies, but the specifics are uncertain.' },
            { heading: 'Why uncertainty matters', body: 'Not knowing the substance makes effects, risks, and the right response harder to predict, which is why medical assessment is cautious and supportive, watching for dangerous effects and treating symptoms as they arise. Any information about what was taken is valuable.' },
            { heading: 'Signs of a problem', body: 'Signs follow the general pattern of substance use disorders — loss of control, craving, prioritising use, withdrawal, and harm — even when the exact substance is unclear. Unexpected or severe reactions to an unknown substance warrant prompt care.' },
            { heading: 'Why it develops', body: 'As with other substance use disorders, it reflects the interaction of a substance’s effects on the brain, mental health, environment, and availability — here with the added factor that the substance itself is unidentified, which is increasingly common with unregulated drugs.' },
            { heading: 'Treatment and recovery', body: 'Care follows general principles: keeping the person safe, managing symptoms of intoxication or withdrawal, identifying the substance where possible, and providing psychological support, treatment of co-occurring conditions, and harm reduction. Once more is known, treatment is tailored. Recovery is achievable.' },
            forFamily('the substance involved'),
            { heading: 'When to get help', body: 'Contact a GP or drug service if substance use is harming you or hard to control, even if you are unsure what you have used. If someone is unwell after taking an unknown substance, seek urgent medical help and share any details. Seek crisis help for thoughts of suicide or self-harm.' },
        ],
        sources: [WHO_ICD11, NHS_DRUGHELP],
    },
};
