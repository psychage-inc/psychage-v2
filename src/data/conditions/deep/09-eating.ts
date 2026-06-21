/**
 * Deep content — Feeding or eating disorders (ICD-11 6B80–6B85).
 *
 * Eating disorders are serious mental illnesses with real medical risk (anorexia has one of
 * the highest mortality rates of any mental disorder). The copy foregrounds medical
 * seriousness and prompt help-seeking, is recovery-oriented, and DELIBERATELY avoids any
 * numbers, weights, calorie counts, or method detail that could be misused. Plain-language,
 * non-diagnostic. ICD-11 / DSM-5-TR framed.
 */

import type { ConditionDeepMap } from './types';
import { WHO_ICD11 } from './types';

const NIMH_EAT = {
    label: 'National Institute of Mental Health (NIMH) — Eating Disorders',
    url: 'https://www.nimh.nih.gov/health/topics/eating-disorders',
};

export const eatingDeep: ConditionDeepMap = {
    'anorexia-nervosa': {
        short_definition:
            'A serious mental illness in which a person restricts what they eat and keeps their body weight much lower than is healthy for them, driven by an intense fear of weight gain and a distorted view of their own body. It is not a lifestyle choice or vanity — it has serious effects on the body and mind and one of the highest death rates of any mental health condition, so it needs prompt, specialist help. With treatment, recovery is possible.',
        what_it_feels_like:
            'A person may feel a relentless drive to restrict food and "control" their body, intense fear of gaining weight, and a sense that their worth is tied to their shape — while often not seeing how unwell they have become. Hunger, low energy, low mood, and preoccupation with food are common. The illness can feel both frightening and, confusingly, like the only thing keeping the person safe.',
        how_it_differs:
            'Unlike dieting or wanting to be healthy, anorexia is a mental illness with a fear of weight gain and a distorted body image that persists even as health declines. Unlike other eating disorders, it centres on restriction and very low weight relative to what is healthy for that person. The serious physical effects set it apart and make early help essential.',
        when_more_than_everyday:
            'Restricting food, an intense fear of weight gain, preoccupation with eating, shape, or "control", and noticeable weight loss or failure to grow as expected are reasons to seek help urgently — the earlier the better, as recovery is more likely with early treatment. You do not need to be "thin enough" to deserve help.',
        sections: [
            { heading: 'Signs and symptoms', body: 'Signs can be behavioural, psychological, and physical. Behaviourally: restricting food, rigid rules around eating, avoiding meals or eating with others, and sometimes excessive exercise or other ways of controlling weight. Psychologically: intense fear of weight gain, preoccupation with food, shape, and "control", a distorted body image, and often anxiety, low mood, and perfectionism. Physically: the effects of undernutrition, which can affect every organ system and become dangerous. People often hide the difficulty and may not recognise how unwell they are.' },
            { heading: 'Who it affects', body: 'Anorexia can affect anyone — any gender, age, body size, or background — though it most often begins in adolescence or early adulthood and is more often diagnosed in girls and women. Stereotypes (that it only affects young, thin, white women) cause many people to be missed. It can occur in people who are not visibly underweight.' },
            { heading: 'What causes it', body: 'There is no single cause. Anorexia develops from a mix of genetic vulnerability, temperament (such as perfectionism and anxiety), brain and biological factors, and social and life pressures, often triggered during a stressful period or transition. It is nobody’s fault — not the person’s, and not their family’s.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses eating patterns, thoughts about weight and shape, and physical and psychological health, and arranges medical checks because of the physical risks. In ICD-11 it is coded 6B80. Because people may minimise the problem, information from family is often valuable, and assessment is approached with care and compassion.' },
            { heading: 'Treatment and support', body: 'Anorexia is treatable, and specialist eating-disorder services lead care. Treatment combines psychological therapy (to address the thoughts and behaviours around eating, weight, and self-worth), support to restore safe, adequate nutrition (guided by professionals), and careful monitoring and treatment of physical health. For young people, family-based approaches are often central. Treating co-occurring anxiety or depression matters too. Early treatment improves outcomes.' },
            { heading: 'The road to recovery', body: 'Recovery is possible, though it takes time, and setbacks are part of the journey rather than failure. It involves both physical restoration and changing the relationship with food, body, and self-worth. Steady support, patience, and hope matter. Many people make a full recovery and go on to live well.' },
            { heading: 'For family and friends', body: 'Avoid commenting on weight, shape, or food, which can fuel the illness, and instead focus on the person beneath it. Take the condition seriously even if the person looks "fine", support them to get specialist help promptly, and be patient with a difficult, non-linear recovery. Seek support for yourself too — caring for someone with anorexia is hard, and carer support exists.' },
            { heading: 'When to get help', body: 'Seek help early — through a GP or eating-disorder service — for restriction, fear of weight gain, preoccupation with eating or shape, or weight loss. This is urgent: anorexia carries serious medical risk. If there are signs of physical crisis (fainting, chest pain, very low energy) or thoughts of suicide or self-harm, seek emergency help now.' },
        ],
        sources: [WHO_ICD11, NIMH_EAT],
    },

    'bulimia-nervosa': {
        short_definition:
            'A serious mental illness involving recurring episodes of eating a large amount of food with a sense of loss of control (binge eating), followed by behaviours intended to "make up for" it, such as purging, fasting, or excessive exercise. Self-worth becomes heavily tied to weight and shape. People are often at a weight that looks unremarkable, which can hide the illness — but it carries real physical and emotional risks and is treatable.',
        what_it_feels_like:
            'The cycle is distressing: a binge can feel out of control and is often followed by intense shame, guilt, and a drive to compensate, which brings brief relief before the cycle repeats. People frequently hide it, feel trapped and exhausted by it, and judge themselves harshly. Their mood and self-esteem can swing with the cycle.',
        how_it_differs:
            'Unlike binge eating disorder, bulimia includes regular compensatory behaviours after binges. Unlike anorexia, weight is often in a typical range, so the illness is easily missed. Unlike ordinary overeating, the binges feel out of control and are bound up with shame and with self-worth being tied to shape and weight.',
        when_more_than_everyday:
            'Recurrent episodes of out-of-control eating followed by efforts to compensate (purging, fasting, or excessive exercise), and self-worth strongly tied to weight and shape, are reasons to seek help — regardless of body size. The cycle is hard to break alone, and treatment helps.',
        sections: [
            { heading: 'Signs and symptoms', body: 'The core is a repeated cycle of binge eating (eating a large amount with a sense of loss of control) and compensatory behaviour aimed at preventing weight gain. Surrounding this are preoccupation with food, weight, and shape, secrecy and shame about eating, and mood that fluctuates with the cycle. There can be physical effects from repeated compensatory behaviours, which a doctor should assess. People are often very distressed and self-critical.' },
            { heading: 'Who it affects', body: 'Bulimia can affect anyone and most often begins in adolescence or early adulthood. It is more frequently diagnosed in girls and women, but affects people of all genders. Because weight is often unremarkable and the behaviours are hidden, it frequently goes unrecognised.' },
            { heading: 'What causes it', body: 'As with other eating disorders, it arises from a mix of genetic vulnerability, temperament, brain and biological factors, and social and emotional pressures, often beginning at a stressful time. Dieting and weight stigma can contribute. It is not a lack of willpower or a choice.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses the eating cycle, thoughts about weight and shape, and physical health (since compensatory behaviours can affect the body), often using sensitive questions because of the shame involved. In ICD-11 it is coded 6B81. People deserve help regardless of their weight.' },
            { heading: 'Treatment and support', body: 'Bulimia responds well to treatment. Psychological therapy — particularly forms of cognitive behavioural therapy designed for eating disorders — helps break the binge–compensation cycle, establish regular eating, and change the beliefs linking self-worth to weight and shape. Certain medications can help some people, and any physical effects are monitored and treated. Recovery is very achievable, especially with early help.' },
            { heading: 'Breaking the cycle', body: 'A key step is establishing regular, adequate eating, which reduces the biological and psychological drivers of bingeing, alongside addressing the shame and the all-or-nothing thinking that fuel the cycle. Setbacks are normal. Self-compassion, structure, and support all help recovery take hold.' },
            { heading: 'For family and friends', body: 'Avoid comments about weight, shape, or eating, and avoid judgment about the behaviours — shame already drives the illness. Support the person to seek specialist help, be patient with a cyclical recovery, and focus on them as a person. Look after your own wellbeing too.' },
            { heading: 'When to get help', body: 'Seek help for recurrent out-of-control eating and compensatory behaviours, whatever your size. If there are physical warning signs (dizziness, fainting, chest pain, or other concerning symptoms) or thoughts of suicide or self-harm, seek urgent help. Effective treatment is available.' },
        ],
        sources: [WHO_ICD11, NIMH_EAT],
    },

    'binge-eating-disorder': {
        short_definition:
            'A serious eating disorder involving recurring episodes of eating a large amount of food with a sense of loss of control and marked distress, but without the regular compensatory behaviours seen in bulimia. People often eat when not hungry, eat alone out of shame, and feel guilt and self-disgust afterwards. It is the most common eating disorder, and it is treatable.',
        what_it_feels_like:
            'During a binge, eating can feel automatic and out of control, sometimes numbing or soothing in the moment, and is usually followed by shame, guilt, and distress. People often eat in secret, feel unable to stop the pattern, and judge themselves harshly, which can feed a cycle of low mood and further bingeing.',
        how_it_differs:
            'Unlike bulimia, there are no regular compensatory behaviours after binges. Unlike ordinary overeating, binges involve a real sense of loss of control and cause marked distress, and they recur. It is a recognised mental health condition, not a lack of discipline, and it can occur at any body size.',
        when_more_than_everyday:
            'Recurrent episodes of eating large amounts with a sense of loss of control, followed by distress, guilt, or shame — without compensatory behaviours — are reasons to seek help, at any weight. The pattern is hard to change alone, and treatment works.',
        sections: [
            { heading: 'Signs and symptoms', body: 'The core feature is recurrent binge eating with a sense of loss of control and marked distress. Common features include eating much faster than usual, eating until uncomfortably full, eating large amounts when not hungry, eating alone due to embarrassment, and feeling disgusted, guilty, or low afterwards. Unlike bulimia, there are no regular compensatory behaviours.' },
            { heading: 'Who it affects', body: 'Binge eating disorder is the most common eating disorder and affects people of all genders, ages, and body sizes, including many people in larger bodies who face additional stigma. It often begins in adolescence or adulthood. It is frequently hidden and under-recognised.' },
            { heading: 'What causes it', body: 'It develops from a mix of genetic vulnerability, emotional and psychological factors (such as using food to cope with difficult feelings), dieting and weight stigma, and life stress. It is not simply about willpower or "greed", and shame tends to worsen it.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses the pattern of binge eating, the loss of control and distress, and the absence of regular compensatory behaviours, with sensitivity to the shame involved and without assumptions based on body size. In ICD-11 it is coded 6B82.' },
            { heading: 'Treatment and support', body: 'Binge eating disorder responds well to treatment. Psychological therapy — especially cognitive behavioural therapy adapted for eating disorders — helps establish regular eating, reduce binges, and address the emotions and beliefs that drive them. Support for any co-occurring depression or anxiety, and certain medications, can also help. Crucially, treatment focuses on the disorder and wellbeing, not on dieting, which can make things worse.' },
            { heading: 'Building a steadier pattern', body: 'Recovery often involves moving away from restriction and dieting (which fuel bingeing) toward regular, adequate, flexible eating, and finding other ways to manage difficult emotions. Reducing shame and self-blame is central. Progress can be gradual, and self-compassion supports lasting change.' },
            { heading: 'For family and friends', body: 'Avoid diet talk, food policing, and comments about weight, all of which tend to worsen binge eating. Offer non-judgmental support, encourage specialist help, and focus on the person’s wellbeing rather than their size. Be patient with a gradual recovery.' },
            { heading: 'When to get help', body: 'Seek help for recurrent, distressing, out-of-control eating, at any body size. If bingeing comes with significant low mood or thoughts of self-harm, seek help promptly. Effective, non-diet-focused treatment is available.' },
        ],
        sources: [WHO_ICD11, NIMH_EAT],
    },

    'avoidant-restrictive-food-intake-disorder': {
        short_definition:
            'An eating disorder (ARFID) in which a person avoids or restricts food — leading to inadequate nutrition, weight or growth problems, or difficulty functioning — but NOT because of concerns about weight or body shape. Instead it is driven by things like extreme sensitivity to the taste, smell, or texture of food, a lack of interest in eating, or a fear of choking or being sick. It can affect children and adults and is treatable.',
        what_it_feels_like:
            'Eating can feel genuinely difficult: certain textures or smells may be intensely unpleasant, food may hold little appeal, or there may be real fear linked to choking, vomiting, or stomach pain. The person is not trying to lose weight — they may want to eat more variety but find it very hard. Mealtimes and social eating can become stressful, and nutrition can suffer.',
        how_it_differs:
            'Unlike anorexia or bulimia, ARFID is NOT about body image or weight loss — the restriction is driven by sensory sensitivity, low interest in food, or fear of aversive consequences. Unlike ordinary "picky eating", it is severe enough to cause nutritional, weight, growth, or functioning problems. It can occur alongside autism, ADHD, and anxiety.',
        when_more_than_everyday:
            'Food avoidance or restriction becomes a concern when it leads to significant weight loss or poor growth, nutritional deficiency, reliance on supplements, or major difficulty eating socially — and is not driven by body-image concerns. Children and adults both deserve assessment and help.',
        sections: [
            { heading: 'Signs and symptoms', body: 'ARFID typically shows up as a very limited range of accepted foods, avoidance of whole food groups or textures, eating very little, slow or distressed eating, or avoidance following a frightening experience such as choking or vomiting. The consequences — not the body-image concern — define it: significant weight loss or faltering growth, nutritional deficiencies, dependence on supplements or tube feeding, or marked interference with social and daily life.' },
            { heading: 'Who it affects', body: 'ARFID can affect children, adolescents, and adults. It is more common in people who are autistic or have ADHD or anxiety, and in those with heightened sensory sensitivity. Unlike some eating disorders, it is not particularly tied to gender. It is increasingly recognised, having previously been dismissed as "fussy eating".' },
            { heading: 'What causes it', body: 'ARFID arises from factors such as heightened sensory sensitivity to food, naturally low appetite or interest in eating, and anxiety or frightening experiences around food (like a choking incident). Temperament and neurodevelopmental differences play a part. It is not about wanting to change weight or shape, and it is not deliberate defiance.' },
            { heading: 'How it’s recognised', body: 'A clinician assesses the eating pattern, the reasons for avoidance (confirming it is not driven by body image), and the nutritional and functional impact, with medical checks as needed. In ICD-11 it is coded 6B83. Distinguishing ARFID from ordinary picky eating and from anorexia guides the right support.' },
            { heading: 'Treatment and support', body: 'Treatment is tailored to the cause. It may include support to ensure adequate nutrition and growth, gradual, supported exposure to new foods (for sensory- or fear-based avoidance), anxiety-focused therapy where fear drives the restriction, and input from dietitians and, where relevant, occupational or speech therapists. For children, family involvement is central. Many people expand their eating and meet their nutritional needs with the right help.' },
            { heading: 'Living with and beyond it', body: 'Progress is usually gradual and built on small, low-pressure steps rather than force. Reducing anxiety and pressure around eating, working with (not against) sensory needs, and ensuring nutrition in the meantime all help. Patience and a supportive, blame-free approach make the biggest difference.' },
            { heading: 'For family and friends', body: 'Avoid pressure, bribery, or framing eating as a battle — these tend to increase anxiety and avoidance. Keep mealtimes calm and low-pressure, offer new foods gently and repeatedly without force, and seek specialist support. Recognise ARFID as a real condition, not naughtiness or fussiness.' },
            { heading: 'When to get help', body: 'Seek help when food avoidance causes weight loss, poor growth, nutritional problems, reliance on supplements, or major difficulty with eating and daily life. Early support prevents nutritional and developmental problems and eases the anxiety that can build around food.' },
        ],
        sources: [WHO_ICD11, NIMH_EAT],
    },

    'pica': {
        short_definition:
            'A condition in which a person regularly eats things that are not food and have no nutritional value — such as soil, chalk, paper, soap, or ice — over a sustained period, in a way that is not appropriate for their developmental stage and is not part of an accepted cultural practice. It can cause medical harm and needs assessment, especially as it sometimes signals a nutritional or other underlying problem.',
        what_it_feels_like:
            'A person may feel a recurrent urge or craving to eat particular non-food substances, sometimes finding it soothing. They may eat these things privately due to embarrassment. The behaviour is persistent rather than a one-off, and can carry real risks to health depending on what is eaten.',
        how_it_differs:
            'Unlike a young child mouthing objects (developmentally normal in infancy), pica involves persistently eating non-food substances beyond the age where this is expected. Unlike culturally accepted practices (some communities consume certain earths), pica is not a sanctioned practice and causes concern or harm. It can occur on its own or alongside other conditions.',
        when_more_than_everyday:
            'Regularly eating non-food substances over weeks or more, beyond the developmental stage where mouthing is normal and outside any cultural practice, warrants assessment — both for medical risks and because it can point to an underlying nutritional deficiency or other condition.',
        sections: [
            { heading: 'Signs and symptoms', body: 'The defining feature is the persistent eating of non-nutritive, non-food substances — which can include earth, clay, chalk, paper, hair, cloth, soap, paint, or ice — over a sustained period. The substances vary, and the behaviour may be hidden. Depending on what is eaten, it can lead to medical problems such as poisoning, infection, blockages, or dental damage.' },
            { heading: 'Who it affects', body: 'Pica is most often seen in young children, in people with intellectual developmental disorders or autism, and during pregnancy. It also occurs alongside some nutritional deficiencies (such as iron). It can affect people of any background and is sometimes under-reported due to embarrassment.' },
            { heading: 'What causes it', body: 'Causes vary and can include nutritional deficiencies (which sometimes drive specific cravings), developmental or neurodevelopmental factors, stress, and the behaviour being self-soothing. Sometimes more than one factor is involved. Identifying the cause guides treatment.' },
            { heading: 'How it’s recognised', body: 'A clinician confirms the persistent eating of non-food substances beyond the expected developmental stage and outside cultural norms, and looks for causes and complications — including blood tests for nutritional deficiencies and checks for any medical harm. In ICD-11 it is coded 6B84.' },
            { heading: 'Treatment and support', body: 'Treatment addresses both the behaviour and any underlying cause: correcting nutritional deficiencies where present, treating any medical complications, and behavioural strategies to reduce the behaviour and keep the person safe (including limiting access to harmful substances and offering safer alternatives). Support for any co-occurring condition is part of care.' },
            { heading: 'Keeping safe', body: 'Because some substances are dangerous, safety comes first — limiting access to harmful items, supervising where needed, and seeking medical help for any signs of poisoning, blockage, or infection. Addressing underlying needs (nutritional, sensory, or emotional) helps reduce the behaviour over time.' },
            { heading: 'For family and friends', body: 'Respond without shaming, keep harmful substances out of reach, and seek medical assessment to check for deficiencies and complications. Offer safer alternatives where the behaviour is self-soothing, and support any underlying condition. Patience and a practical, safety-focused approach help most.' },
            { heading: 'When to get help', body: 'Seek assessment for persistent eating of non-food substances, especially in children, during pregnancy, or alongside another condition. Seek urgent medical help for any sign of poisoning, a swallowed harmful object, severe stomach pain, or a possible blockage.' },
        ],
        sources: [WHO_ICD11],
    },

    'rumination-regurgitation-disorder': {
        short_definition:
            'A condition in which a person repeatedly brings back up (regurgitates) food they have recently eaten, then re-chews, re-swallows, or spits it out — not because of nausea or a medical gut problem, and over a sustained period. It can lead to weight loss, nutritional problems, and distress, and it is treatable, often with techniques that retrain the body’s response after eating.',
        what_it_feels_like:
            'Soon after eating, food returns to the mouth without the usual feeling of being sick; the person may then chew it again, swallow it, or spit it out. It often happens without full conscious effort and can feel automatic. People may feel embarrassed, avoid eating with others, and worry about the effects on their health.',
        how_it_differs:
            'Unlike vomiting from a stomach bug or reflux (which involve nausea or a medical cause), rumination is effortless regurgitation of recently eaten food, usually without nausea, and is behavioural rather than caused by a gut disease — though medical causes must be excluded first. Unlike normal "bringing up wind", it is repeated and sustained and affects nutrition or wellbeing.',
        when_more_than_everyday:
            'Repeatedly bringing food back up to re-chew, re-swallow, or spit out — over weeks or more, without a medical cause — is a reason to seek assessment, especially if it affects weight, nutrition, dental health, or daily life. A medical check comes first to rule out physical causes.',
        sections: [
            { heading: 'Signs and symptoms', body: 'The core feature is the repeated, seemingly effortless regurgitation of recently swallowed food, which is then re-chewed and re-swallowed or spat out, occurring on most days over a sustained period. It is not driven by nausea or by an underlying medical condition of the gut. It may lead to weight loss, nutritional deficiencies, dental problems, bad breath, and social avoidance around eating.' },
            { heading: 'Who it affects', body: 'Rumination disorder can occur in infants, children, and adults. It is more common in people with intellectual developmental disorders, but also occurs in people without them, including those who are otherwise healthy. It is often under-recognised and mistaken for reflux or vomiting.' },
            { heading: 'What causes it', body: 'It is understood as a learned, often unconscious habit involving the muscles used in eating and breathing — a subtle, automatic action after meals that brings food back up. Stress can play a part, and in some cases it may begin as self-soothing. It is not deliberate "being sick" and is not, in itself, a gut disease.' },
            { heading: 'How it’s recognised', body: 'A clinician confirms the pattern of effortless regurgitation, and importantly excludes medical causes such as reflux or other gut conditions with appropriate assessment before diagnosing it as a behavioural disorder. In ICD-11 it is coded 6B85.' },
            { heading: 'Treatment and support', body: 'Treatment is usually behavioural and effective. A key approach is learning diaphragmatic (belly) breathing to use during and after meals, which is incompatible with the regurgitation reflex and helps retrain the body’s response. Addressing any stress, and support around eating, also help. Nutritional and dental effects are managed alongside. Many people improve significantly.' },
            { heading: 'Managing it day to day', body: 'Practising the breathing technique consistently, especially around mealtimes, eating in a calm setting, and reducing stress all support recovery. Because the behaviour is often automatic, learning to notice and interrupt it — with guidance — is central. Progress builds with practice.' },
            { heading: 'For family and friends', body: 'Respond without disgust or blame — the behaviour is usually not fully voluntary. Support the person to get a medical assessment (to rule out physical causes) and behavioural treatment, keep mealtimes calm, and encourage the breathing techniques. Patience and understanding help recovery.' },
            { heading: 'When to get help', body: 'Seek assessment for repeated regurgitation of food without a clear medical cause, particularly if it affects weight, nutrition, or daily life. A medical check is the first step to exclude reflux or other gut conditions, after which effective behavioural treatment can begin.' },
        ],
        sources: [WHO_ICD11],
    },
};
