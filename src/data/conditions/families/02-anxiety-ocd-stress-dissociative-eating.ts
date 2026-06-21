import type { ConditionSeed } from '@/types/condition';

/**
 * ICD-11 Chapter 6 — Anxiety or fear-related disorders, Obsessive-compulsive or
 * related disorders, Disorders specifically associated with stress, Dissociative
 * disorders, and Feeding or eating disorders.
 *
 * GAD (6B00) is the calibration exemplar; its four fields are the founder-approved
 * seed copy, used verbatim. All rows land unverified for clinical review.
 */
export const anxietyOcdStressDissociativeEating: ConditionSeed[] = [
    // --- Anxiety or fear-related disorders ----------------------------------
    {
        slug: 'generalized-anxiety-disorder',
        name: 'Generalised anxiety disorder',
        icd11_code: '6B00',
        icd11_grouping: 'Anxiety or fear-related disorders',
        short_definition:
            'Persistent, excessive worry about everyday things that is hard to control and lasts for months.',
        what_it_feels_like:
            'Worrying most days about many things even with no clear reason — often with restlessness, fatigue, trouble concentrating, irritability, muscle tension, and disrupted sleep.',
        how_it_differs:
            "Unlike panic disorder's sudden fear surges, GAD is a steady background of worry; unlike social anxiety it isn't tied to being judged; unlike ordinary stress it persists without a clear trigger and interferes with daily life.",
        when_more_than_everyday:
            'When the worry is present most days for six months or more and starts interfering with work, relationships, or sleep.',
        provenance: 'ICD-11 6B00 / DSM-5-TR GAD',
    },
    {
        slug: 'panic-disorder',
        name: 'Panic disorder',
        icd11_code: '6B01',
        icd11_grouping: 'Anxiety or fear-related disorders',
        short_definition:
            'Repeated, unexpected surges of intense fear that peak within minutes, along with ongoing worry about when the next one will come.',
        what_it_feels_like:
            'A person may suddenly feel a wave of terror with a pounding heart, shortness of breath, dizziness, sweating, or a sense of unreality. Many fear they are dying or losing control, then dread the next attack.',
        how_it_differs:
            'Unlike generalised anxiety disorder’s steady worry, panic comes in sharp, sudden surges. Unlike a specific phobia, the attacks are not always tied to one feared object or situation and can seem to come from nowhere.',
        when_more_than_everyday:
            'When panic attacks keep coming back unexpectedly and the fear of more attacks starts changing how a person lives, where they go, or what they avoid.',
        provenance: 'ICD-11 6B01 / DSM-5-TR Panic Disorder',
    },
    {
        slug: 'agoraphobia',
        name: 'Agoraphobia',
        icd11_code: '6B02',
        icd11_grouping: 'Anxiety or fear-related disorders',
        short_definition:
            'Strong fear of situations where escape might be hard or help unavailable if something goes wrong, leading a person to avoid them.',
        what_it_feels_like:
            'A person may feel intense fear in crowds, on public transport, in open spaces, or far from home, worrying they could panic and be trapped. To feel safe, they may avoid these places or only go with someone they trust.',
        how_it_differs:
            'Unlike a specific phobia, the fear centres on being unable to escape or get help rather than on one object. Unlike social anxiety, the worry is about being trapped, not about being judged.',
        when_more_than_everyday:
            'When fear of these situations leads to real avoidance that shrinks daily life — missing work, errands, or seeing people — over several months.',
        provenance: 'ICD-11 6B02 / DSM-5-TR Agoraphobia',
    },
    {
        slug: 'specific-phobia',
        name: 'Specific phobia',
        icd11_code: '6B03',
        icd11_grouping: 'Anxiety or fear-related disorders',
        short_definition:
            'Intense, lasting fear of a particular object or situation that is out of proportion to any real danger, leading to avoidance.',
        what_it_feels_like:
            'A person may feel immediate, strong fear when faced with the thing they dread — such as heights, needles, flying, or certain animals — and go out of their way to avoid it. Just thinking about it can bring on anxiety.',
        how_it_differs:
            'Unlike agoraphobia, the fear is tied to one specific trigger rather than to escape or help. Unlike everyday caution, the fear is intense, persistent, and larger than the actual risk.',
        when_more_than_everyday:
            'When fear of a specific thing is strong, lasts months, and leads to avoidance or distress that interferes with daily life.',
        provenance: 'ICD-11 6B03 / DSM-5-TR Specific Phobia',
    },
    {
        slug: 'social-anxiety-disorder',
        name: 'Social anxiety disorder',
        icd11_code: '6B04',
        icd11_grouping: 'Anxiety or fear-related disorders',
        short_definition:
            'Strong, lasting fear of social situations because of worry about being judged, embarrassed, or rejected.',
        what_it_feels_like:
            'A person may dread speaking up, meeting new people, eating in front of others, or being the centre of attention, fearing they will be seen as anxious or foolish. They may blush, shake, or avoid these moments altogether.',
        how_it_differs:
            'Unlike generalised anxiety disorder, the worry centres on being watched and judged rather than on many topics. Unlike ordinary shyness, the fear is intense and leads to avoidance that limits life.',
        when_more_than_everyday:
            'When fear of being judged lasts months and leads a person to avoid social or performance situations, affecting friendships, study, or work.',
        provenance: 'ICD-11 6B04 / DSM-5-TR Social Anxiety Disorder',
    },
    {
        slug: 'separation-anxiety-disorder',
        name: 'Separation anxiety disorder',
        icd11_code: '6B05',
        icd11_grouping: 'Anxiety or fear-related disorders',
        short_definition:
            'Excessive fear or distress about being apart from the people a person is most attached to, beyond what fits their age.',
        what_it_feels_like:
            'A person — a child or an adult — may worry that harm will come to a loved one or to themselves when apart, resist being separated, fear being alone, or have physical complaints when separation looms.',
        how_it_differs:
            'Unlike everyday missing of loved ones, the fear is intense, persistent, and out of step with the situation. Unlike generalised anxiety disorder, the worry centres specifically on separation from attachment figures.',
        when_more_than_everyday:
            'When fear of separation lasts months, is more than expected for the person’s age, and interferes with school, work, or relationships.',
        provenance: 'ICD-11 6B05 / DSM-5-TR Separation Anxiety Disorder',
    },
    {
        slug: 'selective-mutism',
        name: 'Selective mutism',
        icd11_code: '6B06',
        icd11_grouping: 'Anxiety or fear-related disorders',
        short_definition:
            'A consistent inability to speak in certain social settings, such as school, while speaking normally in others, usually beginning in childhood.',
        what_it_feels_like:
            'A child may talk freely at home yet stay completely silent at school or with less familiar people, not by choice but because anxiety makes speaking feel impossible in those settings.',
        how_it_differs:
            'Unlike a speech or language disorder, the child can speak and does so comfortably in some places. Unlike ordinary shyness, the silence is consistent and gets in the way of school or friendships.',
        when_more_than_everyday:
            'When the inability to speak in specific settings lasts at least a month (beyond the first month of school) and affects learning or social life.',
        provenance: 'ICD-11 6B06 / DSM-5-TR Selective Mutism',
    },

    // --- Obsessive-compulsive or related disorders --------------------------
    {
        slug: 'obsessive-compulsive-disorder',
        name: 'Obsessive-compulsive disorder',
        icd11_code: '6B20',
        icd11_grouping: 'Obsessive-compulsive or related disorders',
        short_definition:
            'Unwanted, repeated thoughts (obsessions) and repeated actions or mental rituals (compulsions) done to ease the distress those thoughts cause.',
        what_it_feels_like:
            'A person may have intrusive thoughts — about germs, harm, order, or doubt — that feel hard to dismiss, and feel driven to check, wash, count, or repeat actions to feel safe. The relief is brief, so the cycle repeats.',
        how_it_differs:
            'Unlike generalised anxiety disorder, the worry takes the form of specific intrusive thoughts paired with rituals. Unlike a careful or tidy personality, the thoughts are unwanted and the rituals take real time and distress.',
        when_more_than_everyday:
            'When obsessions and compulsions take up more than an hour a day, cause distress, or interfere with work, relationships, or daily routines.',
        provenance: 'ICD-11 6B20 / DSM-5-TR Obsessive-Compulsive Disorder',
    },
    {
        slug: 'body-dysmorphic-disorder',
        name: 'Body dysmorphic disorder',
        icd11_code: '6B21',
        icd11_grouping: 'Obsessive-compulsive or related disorders',
        short_definition:
            'A preoccupation with one or more perceived flaws in appearance that others barely notice, along with repeated checking or grooming to manage the distress.',
        what_it_feels_like:
            'A person may spend hours focused on a feature they see as ugly or defective — skin, nose, hair, or build — checking mirrors, comparing, grooming, or seeking reassurance, while feeling deep shame.',
        how_it_differs:
            'Unlike an eating disorder, the focus is on appearance in general rather than weight and eating. Unlike ordinary self-consciousness, the concern is intense, time-consuming, and hard to be reassured out of.',
        when_more_than_everyday:
            'When concern about appearance takes up a lot of time, drives repeated behaviours, and interferes with daily life, relationships, or mood.',
        provenance: 'ICD-11 6B21 / DSM-5-TR Body Dysmorphic Disorder',
    },
    {
        slug: 'olfactory-reference-disorder',
        name: 'Olfactory reference disorder',
        icd11_code: '6B22',
        icd11_grouping: 'Obsessive-compulsive or related disorders',
        short_definition:
            'A persistent belief that one gives off a foul or offensive body odour that others notice, when in fact little or no odour is present.',
        what_it_feels_like:
            'A person may be sure they smell bad and that people around them react to it, leading to repeated washing, changing clothes, using perfume, or avoiding others out of embarrassment.',
        how_it_differs:
            'Unlike body dysmorphic disorder’s focus on looks, the concern here is about smell. Unlike a delusional disorder, the person can often hold some doubt about whether the odour is real.',
        when_more_than_everyday:
            'When worry about body odour is constant, drives repeated behaviours, and leads to distress or avoidance that affects daily life.',
        provenance: 'ICD-11 6B22 / DSM-5-TR Olfactory Reference Syndrome',
    },
    {
        slug: 'hypochondriasis',
        name: 'Hypochondriasis (health anxiety)',
        icd11_code: '6B23',
        icd11_grouping: 'Obsessive-compulsive or related disorders',
        short_definition:
            'A persistent fear of having or developing a serious illness, kept going by repeated checking or by avoiding anything that triggers the worry.',
        what_it_feels_like:
            'A person may read ordinary body sensations as signs of grave disease, check their body, search symptoms online, and seek reassurance — or avoid doctors entirely — while the fear keeps returning.',
        how_it_differs:
            'Unlike bodily distress disorder, the focus is on the fear of illness rather than the burden of symptoms themselves. Unlike sensible health caution, the worry persists despite reassurance and medical checks.',
        when_more_than_everyday:
            'When fear of serious illness lasts months, resists reassurance, and drives checking or avoidance that disrupts daily life.',
        provenance: 'ICD-11 6B23 / DSM-5-TR Illness Anxiety Disorder',
    },
    {
        slug: 'hoarding-disorder',
        name: 'Hoarding disorder',
        icd11_code: '6B24',
        icd11_grouping: 'Obsessive-compulsive or related disorders',
        short_definition:
            'Ongoing difficulty parting with possessions because of a strong need to save them, leading to clutter that fills and limits living spaces.',
        what_it_feels_like:
            'A person may feel real distress at the thought of discarding items, even ones of little value, and keep acquiring more. Over time, rooms fill up until they can no longer be used as intended.',
        how_it_differs:
            'Unlike ordinary collecting, the saving is distressing, hard to control, and crowds out usable space. Unlike OCD, the keeping is driven by a need to save rather than by rituals to undo intrusive thoughts.',
        when_more_than_everyday:
            'When difficulty discarding fills living areas with clutter, causes distress, or makes a home unsafe or hard to live in.',
        provenance: 'ICD-11 6B24 / DSM-5-TR Hoarding Disorder',
    },
    {
        slug: 'body-focused-repetitive-behaviour-disorders',
        name: 'Body-focused repetitive behaviour disorders',
        icd11_code: '6B25',
        icd11_grouping: 'Obsessive-compulsive or related disorders',
        short_definition:
            'Repeated actions directed at the body — such as pulling out hair or picking at skin — that cause damage and are hard to stop.',
        what_it_feels_like:
            'A person may pull hair or pick skin, sometimes without fully noticing, often to relieve tension or for a sense of release. Afterward they may feel shame and try, without success, to cut back.',
        how_it_differs:
            'Unlike OCD, the behaviour is not done to neutralise an intrusive thought; it is the behaviour itself that is repeated. Unlike an occasional habit, it causes visible damage and repeated failed attempts to stop.',
        when_more_than_everyday:
            'When hair-pulling, skin-picking, or similar acts cause noticeable damage, repeated attempts to stop fail, and they cause distress or affect daily life.',
        provenance:
            'ICD-11 6B25 / DSM-5-TR Trichotillomania and Excoriation (Skin-Picking) Disorder',
    },

    // --- Disorders specifically associated with stress ----------------------
    {
        slug: 'post-traumatic-stress-disorder',
        name: 'Post-traumatic stress disorder',
        icd11_code: '6B40',
        icd11_grouping: 'Disorders specifically associated with stress',
        short_definition:
            'A lasting reaction to a terrifying or life-threatening event, where the past keeps intruding on the present long after the danger has passed.',
        what_it_feels_like:
            'A person may relive the event through flashbacks or nightmares, avoid reminders of it, stay on high alert, and feel jumpy or easily startled. Ordinary moments can suddenly bring the danger flooding back.',
        how_it_differs:
            'Unlike an adjustment disorder, this follows a clearly threatening event and centres on reliving it. Unlike complex PTSD, it does not usually include deep, lasting problems with self-worth, emotions, and relationships.',
        when_more_than_everyday:
            'When reliving, avoidance, and feeling on guard last more than a month after a frightening event and interfere with daily life. Trauma symptoms respond well to professional support.',
        provenance: 'ICD-11 6B40 / DSM-5-TR Posttraumatic Stress Disorder',
    },
    {
        slug: 'complex-post-traumatic-stress-disorder',
        name: 'Complex post-traumatic stress disorder',
        icd11_code: '6B41',
        icd11_grouping: 'Disorders specifically associated with stress',
        short_definition:
            'A reaction to prolonged or repeated trauma that includes the core signs of PTSD plus lasting difficulties with emotions, self-worth, and relationships.',
        what_it_feels_like:
            'Along with reliving, avoidance, and feeling on guard, a person may struggle to manage strong emotions, carry deep feelings of shame or worthlessness, and find it hard to feel close to or safe with others.',
        how_it_differs:
            'Unlike PTSD, it adds long-standing problems with emotion, self-image, and relationships. It usually follows trauma that was repeated or inescapable, such as ongoing abuse, rather than a single event.',
        when_more_than_everyday:
            'When trauma symptoms are joined by lasting struggles with emotions, self-worth, and closeness that shape daily life. This is best worked through with professional support.',
        provenance: 'ICD-11 6B41 / Complex PTSD',
    },
    {
        slug: 'prolonged-grief-disorder',
        name: 'Prolonged grief disorder',
        icd11_code: '6B42',
        icd11_grouping: 'Disorders specifically associated with stress',
        short_definition:
            'Grief after a loss that stays intense and disabling far longer than usual and keeps a person from moving forward in life.',
        what_it_feels_like:
            'A person may feel a deep, aching longing for the one who died, be preoccupied with them, and struggle to accept the loss, feel part of themselves is gone, or take part in life again — long after the death.',
        how_it_differs:
            'Unlike the natural grief that softens over time, this stays severe and limiting well beyond what is expected for the person’s culture and situation. Unlike depression, the pain centres specifically on the loss.',
        when_more_than_everyday:
            'When intense grief persists well beyond the expected period — at least six months — and continues to disrupt relationships, work, or daily functioning.',
        provenance: 'ICD-11 6B42 / DSM-5-TR Prolonged Grief Disorder',
    },
    {
        slug: 'adjustment-disorder',
        name: 'Adjustment disorder',
        icd11_code: '6B43',
        icd11_grouping: 'Disorders specifically associated with stress',
        short_definition:
            'A strong reaction of distress to an identifiable life change or stressor that is more than expected and makes daily coping difficult.',
        what_it_feels_like:
            'After an event like a job loss, breakup, illness, or move, a person may feel preoccupied with it, worried, low, or unable to settle, and find normal routines harder than usual.',
        how_it_differs:
            'Unlike PTSD, the trigger need not be life-threatening, and there is no central reliving of the event. Unlike a depressive disorder, the distress is clearly tied to a specific stressor and tends to ease as the person adapts.',
        when_more_than_everyday:
            'When distress after a stressful event is out of proportion or clearly disrupts daily life, usually within a month of the event and easing as things settle.',
        provenance: 'ICD-11 6B43 / DSM-5-TR Adjustment Disorders',
    },
    {
        slug: 'reactive-attachment-disorder',
        name: 'Reactive attachment disorder',
        icd11_code: '6B44',
        icd11_grouping: 'Disorders specifically associated with stress',
        short_definition:
            'A pattern in young children who were badly neglected, where they rarely seek or respond to comfort from caregivers.',
        what_it_feels_like:
            'A child may seem withdrawn and emotionally distant, seldom turning to caregivers when upset and showing little warmth or joy in everyday interactions, after early care that was severely lacking.',
        how_it_differs:
            'Unlike autism spectrum disorder, the difficulty follows grossly inadequate care and can improve with stable, loving caregiving. Unlike disinhibited social engagement disorder, the child withdraws rather than over-approaching strangers.',
        when_more_than_everyday:
            'When a young child consistently avoids comfort and shows little emotional connection, following a history of neglect, and it affects their development and relationships.',
        provenance: 'ICD-11 6B44 / DSM-5-TR Reactive Attachment Disorder',
    },
    {
        slug: 'disinhibited-social-engagement-disorder',
        name: 'Disinhibited social engagement disorder',
        icd11_code: '6B45',
        icd11_grouping: 'Disorders specifically associated with stress',
        short_definition:
            'A pattern in young children who were badly neglected, where they are overly familiar with strangers and show little wariness of unfamiliar adults.',
        what_it_feels_like:
            'A child may approach and go off with people they do not know, seek attention indiscriminately, and show little of the normal caution children have around strangers, after early care that was severely lacking.',
        how_it_differs:
            'Unlike reactive attachment disorder, the child over-approaches rather than withdraws. Unlike an outgoing temperament, the behaviour ignores normal social boundaries and can put the child at risk.',
        when_more_than_everyday:
            'When a young child is strikingly over-familiar with unfamiliar adults, following a history of neglect, in a way that is unsafe or affects their relationships.',
        provenance: 'ICD-11 6B45 / DSM-5-TR Disinhibited Social Engagement Disorder',
    },

    // --- Dissociative disorders ---------------------------------------------
    {
        slug: 'dissociative-neurological-symptom-disorder',
        name: 'Dissociative neurological symptom disorder',
        icd11_code: '6B60',
        icd11_grouping: 'Dissociative disorders',
        short_definition:
            'Physical symptoms affecting movement or the senses — such as weakness, seizures, or loss of sensation — that are real but not explained by a disease of the body.',
        what_it_feels_like:
            'A person may suddenly have trouble walking, moving a limb, speaking, seeing, or may have seizure-like episodes. The symptoms are genuine and not under their control, even though tests find no physical disease to explain them.',
        how_it_differs:
            'Unlike symptoms from a neurological disease, medical tests do not match the pattern. Unlike faking, the symptoms are not produced on purpose and cause real distress.',
        when_more_than_everyday:
            'When neurological-type symptoms appear that are not explained by physical illness and disrupt daily life. A medical assessment is needed to understand them.',
        provenance: 'ICD-11 6B60 / DSM-5-TR Functional Neurological Symptom Disorder',
    },
    {
        slug: 'dissociative-amnesia',
        name: 'Dissociative amnesia',
        icd11_code: '6B61',
        icd11_grouping: 'Dissociative disorders',
        short_definition:
            'An inability to recall important personal memories, usually of a stressful or traumatic time, that is too broad to be ordinary forgetting.',
        what_it_feels_like:
            'A person may find they cannot remember key events, periods of their life, or personal details, often around something painful. The gaps are larger and more troubling than everyday forgetfulness.',
        how_it_differs:
            'Unlike memory loss from a head injury or illness, no physical cause explains it. Unlike normal forgetting, the lost memories are significant and tied to stress or trauma.',
        when_more_than_everyday:
            'When a person cannot recall important personal information beyond ordinary forgetting, especially around stressful events, and it causes distress or disruption.',
        provenance: 'ICD-11 6B61 / DSM-5-TR Dissociative Amnesia',
    },
    {
        slug: 'trance-disorder',
        name: 'Trance disorder',
        icd11_code: '6B62',
        icd11_grouping: 'Dissociative disorders',
        short_definition:
            'Episodes of a narrowed or altered state of awareness, with reduced response to surroundings, that are unwanted and not part of an accepted cultural or religious practice.',
        what_it_feels_like:
            'A person may enter a state where they feel disconnected from their surroundings and their usual sense of self, with limited awareness or repetitive movements, then come out of it with little memory of the episode.',
        how_it_differs:
            'Unlike possession trance disorder, the person’s identity is not replaced by another. Unlike accepted spiritual practice, these states are involuntary, unwanted, and distressing.',
        when_more_than_everyday:
            'When trance-like episodes happen outside accepted cultural practices, are involuntary, and cause distress or get in the way of daily life.',
        provenance: 'ICD-11 6B62 / Trance Disorder',
    },
    {
        slug: 'possession-trance-disorder',
        name: 'Possession trance disorder',
        icd11_code: '6B63',
        icd11_grouping: 'Dissociative disorders',
        short_definition:
            'Episodes where a person’s sense of identity is replaced by another, experienced as an outside presence, outside accepted cultural or religious practice and causing distress.',
        what_it_feels_like:
            'During an episode, a person may act, speak, or move as though taken over by another identity or force, with little awareness or memory afterward. The experiences feel beyond their control.',
        how_it_differs:
            'Unlike trance disorder, the usual sense of self is replaced by another identity. Unlike accepted religious or cultural rituals, these episodes are unwanted, distressing, and disruptive.',
        when_more_than_everyday:
            'When possession-like episodes occur outside accepted practices, feel involuntary, and cause distress or disrupt daily life.',
        provenance: 'ICD-11 6B63 / Possession Trance Disorder',
    },
    {
        slug: 'dissociative-identity-disorder',
        name: 'Dissociative identity disorder',
        icd11_code: '6B64',
        icd11_grouping: 'Dissociative disorders',
        short_definition:
            'A condition where a person’s identity is split into two or more distinct states that take turns controlling their thoughts and behaviour, often linked to early trauma.',
        what_it_feels_like:
            'A person may experience separate identity states with their own ways of relating to the world, along with gaps in memory for daily events or personal information. The shifts can be confusing and frightening.',
        how_it_differs:
            'Unlike partial dissociative identity disorder, the different states each take full control at times. Unlike psychosis, the experience is of separated parts of the self rather than loss of contact with reality.',
        when_more_than_everyday:
            'When distinct identity states and memory gaps disrupt a person’s sense of self and daily life. This is complex and best understood with professional support.',
        provenance: 'ICD-11 6B64 / DSM-5-TR Dissociative Identity Disorder',
    },
    {
        slug: 'partial-dissociative-identity-disorder',
        name: 'Partial dissociative identity disorder',
        icd11_code: '6B65',
        icd11_grouping: 'Dissociative disorders',
        short_definition:
            'A condition with two or more distinct identity states, where one usually stays in day-to-day control while the others intrude without fully taking over.',
        what_it_feels_like:
            'A person may sense other identity states pushing in — through thoughts, feelings, urges, or actions that do not feel like their own — while one main identity continues to run daily life most of the time.',
        how_it_differs:
            'Unlike dissociative identity disorder, the non-dominant states intrude but rarely take full control. Unlike intrusive thoughts in OCD, the experiences are felt as coming from separate parts of the self.',
        when_more_than_everyday:
            'When intrusions from other identity states cause distress or disrupt daily life, even though one identity stays mostly in control.',
        provenance: 'ICD-11 6B65 / Partial Dissociative Identity Disorder',
    },
    {
        slug: 'depersonalization-derealization-disorder',
        name: 'Depersonalization-derealization disorder',
        icd11_code: '6B66',
        icd11_grouping: 'Dissociative disorders',
        short_definition:
            'Persistent or repeated feelings of being detached from oneself or from the surrounding world, as if watching life from the outside or through a fog.',
        what_it_feels_like:
            'A person may feel unreal, robotic, or cut off from their own thoughts, body, or emotions, or feel the world around them looks dreamlike, flat, or distant — while knowing this is a feeling, not reality.',
        how_it_differs:
            'Unlike psychosis, the person knows these experiences are not literally true. Unlike a brief moment of spaciness, the feelings are persistent or recurring and cause real distress.',
        when_more_than_everyday:
            'When feelings of detachment from self or surroundings keep returning, last over time, and cause distress or interfere with daily life.',
        provenance: 'ICD-11 6B66 / DSM-5-TR Depersonalization/Derealization Disorder',
    },

    // --- Feeding or eating disorders ----------------------------------------
    {
        slug: 'anorexia-nervosa',
        name: 'Anorexia nervosa',
        icd11_code: '6B80',
        icd11_grouping: 'Feeding or eating disorders',
        short_definition:
            'A condition marked by keeping body weight much lower than is healthy through restricting food, driven by intense fear of weight gain and a distorted view of one’s body.',
        what_it_feels_like:
            'A person may severely limit what they eat, exercise heavily, and feel terror at the thought of gaining weight, often seeing themselves as larger than they are even as their health is at risk.',
        how_it_differs:
            'Unlike bulimia nervosa, body weight is kept significantly low. Unlike ordinary dieting, the restriction is extreme, driven by fear and body-image distress, and endangers health.',
        when_more_than_everyday:
            'When food restriction keeps weight dangerously low and is paired with intense fear of weight gain. This can be medically serious and needs professional care.',
        provenance: 'ICD-11 6B80 / DSM-5-TR Anorexia Nervosa',
    },
    {
        slug: 'bulimia-nervosa',
        name: 'Bulimia nervosa',
        icd11_code: '6B81',
        icd11_grouping: 'Feeding or eating disorders',
        short_definition:
            'A cycle of eating large amounts of food with a sense of loss of control, followed by efforts to undo it, such as vomiting or extreme exercise.',
        what_it_feels_like:
            'A person may eat far more than usual in a short time, feeling unable to stop, then try to make up for it by purging, fasting, or over-exercising. Shame and secrecy often surround the cycle.',
        how_it_differs:
            'Unlike anorexia nervosa, body weight is often in the typical range. Unlike binge eating disorder, the binges are followed by efforts to undo them, such as vomiting or fasting.',
        when_more_than_everyday:
            'When binge eating and efforts to compensate happen regularly over time and cause distress or harm to health.',
        provenance: 'ICD-11 6B81 / DSM-5-TR Bulimia Nervosa',
    },
    {
        slug: 'binge-eating-disorder',
        name: 'Binge eating disorder',
        icd11_code: '6B82',
        icd11_grouping: 'Feeding or eating disorders',
        short_definition:
            'Repeated episodes of eating large amounts of food with a sense of loss of control, but without the regular efforts to undo it seen in bulimia.',
        what_it_feels_like:
            'A person may eat a lot quickly, past fullness, often alone and not from hunger, then feel distress, guilt, or disgust afterward. The eating can feel beyond their control in the moment.',
        how_it_differs:
            'Unlike bulimia nervosa, binges are not followed by purging or fasting. Unlike ordinary overeating, the episodes involve loss of control and cause real distress.',
        when_more_than_everyday:
            'When binge episodes happen regularly over months, feel out of control, and cause distress — not just occasional overeating.',
        provenance: 'ICD-11 6B82 / DSM-5-TR Binge-Eating Disorder',
    },
    {
        slug: 'avoidant-restrictive-food-intake-disorder',
        name: 'Avoidant-restrictive food intake disorder',
        icd11_code: '6B83',
        icd11_grouping: 'Feeding or eating disorders',
        short_definition:
            'Eating very little or avoiding many foods — not because of weight or body image — leading to poor nutrition or weight that is too low.',
        what_it_feels_like:
            'A person may avoid foods because of texture, smell, or taste, a lack of interest in eating, or fear of choking or vomiting, ending up with a very limited diet and, at times, health or growth problems.',
        how_it_differs:
            'Unlike anorexia nervosa, the avoidance is not driven by fear of weight gain or body-image concerns. Unlike picky eating, it leads to nutritional problems or significant interference with life.',
        when_more_than_everyday:
            'When limited or avoided eating leads to weight loss, poor nutrition, reliance on supplements, or trouble with daily life — beyond ordinary fussy eating.',
        provenance: 'ICD-11 6B83 / DSM-5-TR Avoidant/Restrictive Food Intake Disorder',
    },
    {
        slug: 'pica',
        name: 'Pica',
        icd11_code: '6B84',
        icd11_grouping: 'Feeding or eating disorders',
        short_definition:
            'Regularly eating things that are not food and have no nutritional value, such as dirt, chalk, or paper, beyond what fits a person’s developmental stage.',
        what_it_feels_like:
            'A person may repeatedly eat non-food items over time. Depending on what is eaten, this can lead to health problems such as poisoning, infection, or blockages.',
        how_it_differs:
            'Unlike a toddler briefly mouthing objects, the eating is persistent and beyond what fits the person’s development. Unlike other eating disorders, it centres on non-food substances rather than body weight.',
        when_more_than_everyday:
            'When eating non-food items is persistent, beyond the expected developmental stage, and risks harm to health.',
        provenance: 'ICD-11 6B84 / DSM-5-TR Pica',
    },
    {
        slug: 'rumination-regurgitation-disorder',
        name: 'Rumination-regurgitation disorder',
        icd11_code: '6B85',
        icd11_grouping: 'Feeding or eating disorders',
        short_definition:
            'Repeatedly bringing food back up into the mouth after eating, then re-chewing, re-swallowing, or spitting it out, without a medical cause.',
        what_it_feels_like:
            'A person may, soon after meals, have food come back up without nausea or disgust, and then chew it again or spit it out. It often happens without much effort and can become a regular pattern.',
        how_it_differs:
            'Unlike acid reflux or other medical conditions, no physical disease explains it. Unlike vomiting in bulimia, it is not done to control weight and does not feel forceful or distressing in the same way.',
        when_more_than_everyday:
            'When bringing food back up happens repeatedly over at least a month, without a medical cause, and affects nutrition, health, or daily life.',
        provenance: 'ICD-11 6B85 / DSM-5-TR Rumination Disorder',
    },
];
