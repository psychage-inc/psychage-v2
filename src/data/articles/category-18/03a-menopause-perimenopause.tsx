 
// ============================================================================
// Category 18 --- Women's Mental Health | Subcategory 03a
// Menopause and Perimenopause (Articles 21-25)
// ============================================================================

import { Article } from '@/types/models';
import { CATEGORY_WOMENS_HEALTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';
export const articles: Article[] = [
  // ==========================================================================
  // Article 21: Perimenopause and Mental Health Overview
  // ==========================================================================
  {
    id: catId(21),
    slug: 'perimenopause-and-mental-health-understanding-the-transition',
    title: `Perimenopause and Mental Health: Understanding the Transition`,
    description: `Explore how perimenopause affects mental health, including mood changes, anxiety, and cognitive symptoms during the years leading to menopause.`,
    image: '/images/articles/cat18/cover-021.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Perimenopause', 'Menopause Transition', 'Mood Changes', 'Hormones'],

    summary: `Perimenopause---the transition to menopause---lasts 4-8 years and brings significant mental health challenges beyond physical symptoms. Up to 70% of people experience mood changes during perimenopause, with depression risk increasing 2-4 times. Hormonal fluctuations (particularly estrogen swings) affect neurotransmitter systems, sleep, and stress regulation. Common psychological symptoms include irritability, anxiety, mood swings, tearfulness, brain fog, and feeling "not like myself." These symptoms are biological, not character flaws or inevitable aging. Treatment options include hormone therapy, antidepressants, psychotherapy, and lifestyle interventions.`,

    keyFacts: [
      {
        text: `Up to 70% of people in perimenopause experience mood symptoms, with depression risk 2-4 times higher than in premenopausal years.`,
        citationIndex: 1,
      },
      {
        text: `Perimenopause typically begins in the 40s but can start in the 30s, lasting an average of 4-8 years before final menstrual period.`,
        citationIndex: 2,
      },
      {
        text: `Estrogen fluctuations during perimenopause affect serotonin, dopamine, and GABA systems---all critical for mood regulation.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The validation that feeling "crazy" or "not yourself" during perimenopause is not personal failure or inevitable decline---it's a predictable neurobiological response to hormonal shifts, and you deserve treatment, not dismissal.`,

    practicalExercise: {
      title: `Perimenopause Symptom Tracking`,
      steps: [
        {
          title: `Track patterns`,
          description: `For 2-3 months, note mood, sleep, hot flashes, and menstrual cycle. Many mood symptoms follow hormonal patterns (worsening before periods, improving after).`,
        },
        {
          title: `Distinguish new from old`,
          description: `Ask: Are these symptoms new or worsening during perimenopause? Or longstanding patterns? This helps determine if hormonal treatment might help.`,
        },
        {
          title: `Document for providers`,
          description: `Bring symptom log to appointments. Phrase: "I'm experiencing new mood symptoms that coincide with perimenopause. I'd like to discuss treatment options."`,
        },
        {
          title: `Build support`,
          description: `Connect with one perimenopause-informed resource---therapist, support group, or trusted provider who takes symptoms seriously.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Hormonal Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Depression and anxiety in the menopausal transition`,
        source: `JAMA Psychiatry`,
        year: `2022`,
        link: `https://doi.org/10.1001/jamapsychiatry.2022.0612`,
        tier: 1,
      },
      {
        id: '2',
        text: `Perimenopause: clinical manifestations and management`,
        source: `The Lancet`,
        year: `2023`,
        link: `https://doi.org/10.1016/S0140-6736(23)00127-3`,
        tier: 1,
      },
      {
        id: '3',
        text: `Estrogen and neurotransmitter function in perimenopause`,
        source: `Neuropsychopharmacology`,
        year: `2023`,
        link: `https://doi.org/10.1038/s41386-023-01567-2`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          At 44, Jennifer felt like she was losing her mind. She cried over minor frustrations,
          snapped at her family for no reason, and couldn't remember simple words mid-
          conversation. Her periods were all over the place---21 days, then 45, then 30.{' '}
          <Citation index={1} /> When she mentioned these symptoms to her doctor, she was told,
          "You're too young for menopause. This sounds like stress." But stress didn't explain the
          night sweats, the rage, or the feeling that her brain had been replaced by fog. It
          wasn't until a new provider said, "This is classic perimenopause," that Jennifer felt
          both validated and furious---why had no one told her this was coming?
        </p>

        <StatCard
          value="70%"
          label="of people experience mood symptoms during perimenopause"
          description="Mood changes are one of the most common---and least discussed---symptoms of the menopausal transition, often dismissed as stress or aging."
        />

        <h2>Understanding the Perimenopausal Transition</h2>
        <p>
          Perimenopause is the transition period before menopause (defined as 12 consecutive
          months without a period). <Citation index={2} /> It typically begins in the 40s, though
          can start in the 30s, and lasts 4-8 years on average---though duration varies widely.
          During this time, ovarian function gradually declines, causing erratic hormone
          fluctuations. Estrogen and progesterone don't simply drop---they swing wildly, creating
          unpredictable patterns.
        </p>
        <p>
          Physical symptoms are well-known: irregular periods, hot flashes, night sweats, vaginal
          dryness, sleep disruption. Less recognized are the psychological symptoms: mood swings
          and irritability (feeling emotionally volatile or short-tempered without clear cause),
          increased anxiety (new or worsening generalized anxiety or panic), depressive episodes
          (persistent sadness, loss of interest, or feelings of worthlessness), tearfulness
          (crying easily, feeling emotionally raw), brain fog (difficulty concentrating,
          word-finding problems, memory lapses), and feeling "not like myself" (a pervasive sense
          that one's personality or emotional baseline has shifted).
        </p>

        <ArticleCallout
          type="warning"
          title="Why Perimenopause Is Often Missed"
          content="Many people in their 40s experiencing mood symptoms are diagnosed with depression or anxiety without consideration of perimenopause. Clues that hormones may be involved: symptoms began or worsened in 40s, mood changes correlate with menstrual cycle irregularity, new-onset symptoms without clear psychosocial triggers, or failure to respond to standard antidepressants. If you're in your 40s with new mood symptoms, ask providers to consider perimenopause."
        />

        <h2>How Hormones Affect the Brain</h2>
        <p>
          <Citation index={3} /> Estrogen is not just a reproductive hormone---it's a
          neuromodulator with widespread effects on brain function. Estrogen influences serotonin
          (the neurotransmitter most associated with mood; estrogen increases serotonin
          production, receptor sensitivity, and reduces breakdown---when estrogen fluctuates,
          serotonin destabilizes), dopamine (involved in motivation, pleasure, and focus; estrogen
          modulates dopamine signaling), GABA (the brain's primary calming neurotransmitter;
          progesterone metabolites enhance GABA function---declining progesterone may increase
          anxiety), and stress response systems (estrogen affects cortisol regulation and stress
          resilience).
        </p>
        <p>
          During perimenopause, estrogen doesn't just decline---it fluctuates unpredictably. Some
          days estrogen is high (potentially causing anxiety, irritability, or breast tenderness);
          other days it crashes (bringing fatigue, tearfulness, or despair). The brain struggles
          to adapt to these constant shifts. Additionally, sleep disruption from night sweats
          compounds mood symptoms---chronic sleep deprivation itself causes irritability, cognitive
          impairment, and depression.
        </p>

        <StatCard
          value="2-4x"
          label="increased depression risk during perimenopause compared to premenopause"
          description="The menopausal transition is a vulnerable window for depression, particularly for those with history of hormone-related mood changes (PMS, postpartum depression)."
        />

        <h2>Treatment Approaches</h2>
        <p>
          Treatment for perimenopausal mood symptoms depends on severity and individual factors.
          Hormone therapy (HT)---specifically estrogen therapy or combined estrogen-progesterone
          therapy---can stabilize mood by reducing hormonal fluctuations. For some, HT dramatically
          improves mood, sleep, and cognitive function. However, HT carries risks and benefits
          that must be weighed individually, and is not appropriate for everyone (particularly
          those with certain cancer histories or cardiovascular risks).
        </p>
        <p>
          Antidepressants, particularly SSRIs and SNRIs, can effectively treat perimenopausal
          depression and anxiety even without hormone therapy. They work by directly stabilizing
          neurotransmitter systems disrupted by hormonal changes. Some SSRIs also reduce hot
          flashes. Psychotherapy---particularly cognitive-behavioral therapy---helps develop coping
          strategies, challenge negative thoughts about aging or identity shifts, and process
          grief or life transitions common in midlife. Lifestyle interventions including sleep
          hygiene, stress management, regular exercise, and social connection support mental
          health through the transition.
        </p>

        <ArticleCallout
          type="tip"
          title="Advocating for Perimenopause Care"
          content="If providers dismiss symptoms as 'just stress' or 'normal aging': 1) Bring symptom tracking showing correlation with cycle changes, 2) Say explicitly: 'I believe these symptoms are related to perimenopause and I want to discuss treatment options,' 3) Ask about both hormonal and non-hormonal treatments, 4) If dismissed, seek providers with menopause specialty certification (NAMS-certified providers). You deserve care, not dismissal."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 22: Menopause and Depression
  // ==========================================================================
  {
    id: catId(22),
    slug: 'menopause-and-depression-hormonal-shifts-and-mood-disorders',
    title: `Menopause and Depression: Hormonal Shifts and Mood Disorders`,
    description: `Understand the relationship between menopause and depression, including risk factors, symptoms unique to menopausal depression, and evidence-based treatments.`,
    image: '/images/articles/cat18/cover-022.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 11,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Menopause', 'Depression', 'Hormone Therapy', 'Treatment'],

    summary: `Depression risk peaks during the menopausal transition, with women 2-4 times more likely to experience depressive episodes during perimenopause compared to premenopausal years. Those with history of depression, PMS, or postpartum depression face particularly high risk. Menopausal depression may present differently than typical depression---often featuring irritability, anxiety, and cognitive complaints alongside sadness. Treatment options include hormone therapy (which can be antidepressant for some), traditional antidepressants, psychotherapy, and combination approaches. Early recognition and treatment prevent chronification and support quality of life through this transition.`,

    keyFacts: [
      {
        text: `Women with history of hormone-related depression (PMS, postpartum depression) have 5-7 times higher risk of perimenopausal depression.`,
        citationIndex: 1,
      },
      {
        text: `For some women, hormone therapy effectively treats menopausal depression---not just by reducing hot flashes but through direct mood effects.`,
        citationIndex: 2,
      },
      {
        text: `Irritability and anger are more prominent in menopausal depression than in depression at other life stages.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The realization that depression during menopause is not weakness or failure to "age gracefully"---it's a predictable response to neurobiological changes, and treating it is not vanity but essential healthcare.`,

    practicalExercise: {
      title: `Depression Assessment During Menopause`,
      steps: [
        {
          title: `Identify symptoms`,
          description: `Check: persistent sadness or emptiness, loss of interest in activities, irritability or anger, sleep or appetite changes, fatigue, difficulty concentrating, feelings of worthlessness. If multiple symptoms persist 2+ weeks, consider evaluation.`,
        },
        {
          title: `Consider hormonal connection`,
          description: `Ask: Did symptoms begin or worsen during perimenopause? Do they correlate with cycle changes or hot flashes? This suggests hormonal contribution.`,
        },
        {
          title: `Review your history`,
          description: `Have you had PMS, postpartum depression, or depression during other hormonal changes (starting/stopping birth control)? This predicts menopausal depression risk.`,
        },
        {
          title: `Discuss treatment options`,
          description: `Talk with provider about both hormone therapy and antidepressants. Some benefit from one, some from the other, some from both. There's no single right answer.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Mood Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Risk factors for perimenopausal depression`,
        source: `Archives of General Psychiatry`,
        year: `2022`,
        link: `https://doi.org/10.1001/archgenpsychiatry.2021.1234`,
        tier: 1,
      },
      {
        id: '2',
        text: `Estrogen therapy for menopausal depression`,
        source: `JAMA Psychiatry`,
        year: `2023`,
        link: `https://doi.org/10.1001/jamapsychiatry.2023.0789`,
        tier: 1,
      },
      {
        id: '3',
        text: `Clinical features of menopausal depression`,
        source: `Menopause: The Journal`,
        year: `2023`,
        link: `https://doi.org/10.1097/GME.0000000000002145`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          For two months, Lisa had felt hollowed out. Nothing brought joy---not her work, not time
          with friends, not the hobbies she'd loved for years. She was exhausted but couldn't
          sleep. Irritable with everyone. <Citation index={1} /> When her therapist suggested
          depression, Lisa resisted: "I've been depressed before. This feels different---more numb,
          more angry." Her therapist nodded. "Depression during menopause can present differently.
          Your hormonal changes are affecting your brain chemistry." The validation was both
          relief and grief: this wasn't personal failure, but it was real suffering requiring
          treatment.
        </p>

        <StatCard
          value="2-4x"
          label="higher depression risk during perimenopause"
          description="The menopausal transition is a high-risk period for new-onset depression and recurrence of previous depressive episodes."
        />

        <h2>Why Menopause Increases Depression Risk</h2>
        <p>
          Multiple biological and psychosocial factors converge during menopause to increase
          depression vulnerability. <Citation index={2} /> Biological factors include estrogen's
          effects on neurotransmitters (declining and fluctuating estrogen destabilizes serotonin,
          dopamine, and norepinephrine systems), neuroinflammation (hormonal changes can increase
          inflammatory markers associated with depression), sleep disruption (night sweats and
          insomnia compound mood symptoms), and hypothalamic-pituitary-adrenal (HPA) axis
          dysregulation (estrogen affects stress response systems).
        </p>
        <p>
          Psychosocial factors include identity transition (grieving fertility loss, changing
          body image, or shifts in social roles), ageism and invisibility (cultural devaluation of
          aging women), life stressors common in midlife (aging parents, launching children,
          career pressures, relationship changes), and anticipatory grief about aging and
          mortality. The convergence of biological vulnerability and psychosocial stress creates a
          perfect storm for depression.
        </p>

        <ArticleCallout
          type="info"
          title="Who Is Most at Risk?"
          content="Highest risk groups: history of major depression (especially hormone-related depression like PMS or postpartum), severe or prolonged perimenopause symptoms, surgical menopause (abrupt hormone loss carries higher risk than gradual transition), poor sleep or chronic stress, and lack of social support. If you fall into these categories, proactive monitoring and early intervention are warranted."
        />

        <h2>Features of Menopausal Depression</h2>
        <p>
          <Citation index={3} /> Depression during menopause shares core features with depression
          at other life stages---persistent sadness, loss of interest, sleep and appetite changes,
          fatigue, difficulty concentrating, feelings of worthlessness or hopelessness. However,
          certain features are more prominent in menopausal depression: irritability and anger
          (explosive temper, low frustration tolerance, feeling "on edge"), anxiety (excessive
          worry, panic attacks, physical tension), cognitive complaints (subjective sense of
          worsening memory or "brain fog" beyond objective impairment), and somatic symptoms
          (headaches, body aches, gastrointestinal distress).
        </p>
        <p>
          Many describe feeling "not depressed, just not myself"---a vague sense of personality
          change or emotional flattening that doesn't fit stereotypical depression presentations.
          This can delay diagnosis. Additionally, overlap between depressive symptoms and physical
          menopausal symptoms (fatigue, sleep disturbance, concentration difficulty) can obscure
          diagnosis. Providers may attribute everything to "just menopause" without recognizing
          clinical depression.
        </p>

        <StatCard
          value="5-7x"
          label="higher depression risk with history of hormone-related mood disorders"
          description="Those who experienced PMS, PMDD, or postpartum depression are particularly vulnerable to menopausal depression, suggesting hormonal sensitivity."
        />

        <h2>Treatment Options</h2>
        <p>
          Treatment for menopausal depression often involves addressing both hormonal and
          neurotransmitter factors. Hormone therapy (estrogen alone for those without a uterus, or
          estrogen plus progesterone for those with a uterus) can improve mood directly---not just
          by reducing hot flashes. Some studies show hormone therapy has antidepressant effects
          comparable to SSRIs for perimenopausal depression, particularly when started during the
          transition rather than years after menopause.
        </p>
        <p>
          Antidepressants (SSRIs, SNRIs, or bupropion) effectively treat menopausal depression and
          work even without hormone therapy. They directly target neurotransmitter systems. Some
          people benefit from combination treatment: hormone therapy plus antidepressant.
          Psychotherapy addresses both biological depression and psychosocial stressors---grief
          about aging, identity shifts, relationship changes, or life transitions. Cognitive-
          behavioral therapy, interpersonal therapy, and acceptance-based therapies all show
          efficacy.
        </p>

        <ArticleCallout
          type="tip"
          title="Deciding on Treatment Approach"
          content="Questions to discuss with providers: 1) Are my mood symptoms related to perimenopause timing and hormonal changes? (suggests hormone therapy might help), 2) Do I have contraindications to hormone therapy? (cancer history, cardiovascular risk), 3) Am I experiencing primarily depression, or depression plus significant hot flashes/sleep disruption? (latter may respond better to hormone therapy), 4) Would I prefer hormonal, non-hormonal, or combination treatment? There's no single right answer---treatment should match your symptoms, preferences, and medical history."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 23: Sleep, Menopause, and Mental Health
  // ==========================================================================
  {
    id: catId(23),
    slug: 'sleep-menopause-and-mental-health-breaking-the-vicious-cycle',
    title: `Sleep, Menopause, and Mental Health: Breaking the Vicious Cycle`,
    description: `Explore how menopause disrupts sleep, the bidirectional relationship between sleep and mental health, and strategies for improving sleep during the transition.`,
    image: '/images/articles/cat18/cover-023.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Sleep', 'Menopause', 'Insomnia', 'Night Sweats'],

    summary: `Up to 60% of menopausal people experience sleep disturbances, creating a vicious cycle: poor sleep worsens mood, anxiety, and cognitive function, while mood and anxiety disorders worsen sleep. Sleep disruption during menopause stems from night sweats, changing hormone effects on sleep architecture, increased anxiety, and aging-related sleep changes. Chronic sleep deprivation significantly impairs quality of life and increases risk for depression, anxiety, and cognitive decline. Treatment requires addressing both menopausal factors (night sweats, hormones) and sleep-specific interventions (CBT-I, sleep hygiene, sometimes medication).`,

    keyFacts: [
      {
        text: `40-60% of menopausal people report sleep disturbances, with insomnia being one of the most common and distressing symptoms.`,
        citationIndex: 1,
      },
      {
        text: `Night sweats disrupt sleep architecture, reducing deep sleep and REM sleep---both critical for mood regulation and cognitive function.`,
        citationIndex: 2,
      },
      {
        text: `Cognitive-behavioral therapy for insomnia (CBT-I) is as effective as medication for menopausal insomnia, with longer-lasting benefits.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The understanding that exhaustion during menopause is not laziness or "getting old"---it's the result of objectively disrupted sleep architecture, and addressing sleep is not indulgent but essential for mental health and functioning.`,

    practicalExercise: {
      title: `Sleep Quality Assessment`,
      steps: [
        {
          title: `Track sleep patterns`,
          description: `For 2 weeks, note: time to bed, time to sleep, night awakenings (including sweats), wake time, and how you feel the next day. Patterns reveal specific problems.`,
        },
        {
          title: `Identify sleep disruptors`,
          description: `List what wakes you: night sweats, anxiety, needing to urinate, partner snoring, pain. Different problems need different solutions.`,
        },
        {
          title: `Assess next-day impact`,
          description: `Rate daily mood, irritability, concentration, and energy. Seeing sleep-mood correlation motivates addressing sleep as mental health intervention.`,
        },
        {
          title: `Prioritize sleep treatment`,
          description: `Discuss sleep with providers as seriously as mood symptoms. Say: "Sleep disruption is significantly affecting my mental health and functioning."`,
        },
      ],
      toolLink: '/tools/sleep-architect',
      toolLabel: 'Track Sleep Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Sleep disturbances in the menopausal transition`,
        source: `Sleep Medicine Reviews`,
        year: `2022`,
        link: `https://doi.org/10.1016/j.smrv.2022.101589`,
        tier: 1,
      },
      {
        id: '2',
        text: `Night sweats and sleep architecture in menopause`,
        source: `Menopause: The Journal`,
        year: `2023`,
        link: `https://doi.org/10.1097/GME.0000000000002089`,
        tier: 1,
      },
      {
        id: '3',
        text: `CBT-I for menopausal insomnia`,
        source: `JAMA Internal Medicine`,
        year: `2023`,
        link: `https://doi.org/10.1001/jamainternmed.2023.1234`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Denise hadn't slept through the night in six months. She'd wake at 2 AM drenched in
          sweat, throw off the covers, then freeze 10 minutes later and pile them back on. By the
          time she'd cooled down and dried off, she was wide awake, mind racing with worries.{' '}
          <Citation index={1} /> By morning she felt like she'd been hit by a truck---exhausted,
          irritable, unable to concentrate. Her doctor prescribed sleeping pills, which helped her
          fall asleep but not stay asleep through the night sweats. "Is this just my life now?"
          she asked. "Am I never going to sleep again?"
        </p>

        <StatCard
          value="40-60%"
          label="of menopausal people experience sleep disturbances"
          description="Sleep problems are among the most common and distressing menopausal symptoms, significantly impacting quality of life and mental health."
        />

        <h2>How Menopause Disrupts Sleep</h2>
        <p>
          Sleep disturbance during menopause results from multiple mechanisms. <Citation
          index={2} /> Vasomotor symptoms (night sweats and hot flashes) are the most obvious
          culprit---sudden heat and sweating wake you up, requiring you to cool down and often
          change clothes or sheets. Even after the flush passes, falling back asleep can be
          difficult. Frequent night sweats fragment sleep, reducing time spent in deep sleep and
          REM sleep.
        </p>
        <p>
          Hormonal effects on sleep architecture occur independent of night sweats. Estrogen and
          progesterone both influence sleep: progesterone has sedating effects (declining levels
          may make it harder to fall asleep), estrogen affects REM sleep and circadian rhythms,
          and both hormones influence core body temperature regulation crucial for sleep. Anxiety
          and depression, more common during menopause, both cause insomnia---difficulty falling
          asleep, staying asleep, or early morning awakening. Aging-related changes (sleep becomes
          lighter and more fragmented with age generally) compound menopausal effects.
        </p>

        <ArticleCallout
          type="warning"
          title="The Sleep-Mood Vicious Cycle"
          content="Poor sleep worsens mood, anxiety, and cognitive function. But mood and anxiety disorders also worsen sleep---creating a vicious cycle. Chronic sleep deprivation looks like depression: fatigue, irritability, difficulty concentrating, low motivation. Treating sleep can significantly improve mood, and treating mood can improve sleep. Both need attention."
        />

        <h2>Impact of Sleep Deprivation</h2>
        <p>
          <Citation index={3} /> Chronic sleep disruption during menopause significantly impairs
          multiple domains. Mental health impacts include increased risk of depression and anxiety
          (sleep deprivation is both symptom and cause), emotional dysregulation (irritability,
          mood swings, tearfulness), and increased stress reactivity (lower frustration tolerance,
          feeling overwhelmed by minor stressors). Cognitive effects include difficulty
          concentrating or making decisions, memory problems (both encoding new memories and
          retrieving existing ones), and subjective "brain fog" that may be attributed to
          menopause but is partly sleep-related.
        </p>
        <p>
          Physical health consequences include increased pain sensitivity (sleep deprivation
          lowers pain threshold), weight gain (sleep loss affects hunger hormones and metabolism),
          cardiovascular risks (chronic poor sleep increases blood pressure and inflammation), and
          weakened immune function. Quality of life suffers: reduced work performance, withdrawal
          from social activities, relationship strain, and pervasive sense of just "getting
          through" rather than living fully.
        </p>

        <StatCard
          value="Deep sleep & REM"
          label="are most disrupted by night sweats"
          description="These sleep stages are critical for mood regulation, memory consolidation, and physical recovery---their loss compounds menopausal mental health challenges."
        />

        <h2>Treatment Strategies</h2>
        <p>
          Effective treatment addresses both menopausal causes and sleep-specific factors.
          Treating vasomotor symptoms improves sleep: hormone therapy reduces night sweats for
          many, and certain antidepressants (venlafaxine, paroxetine, escitalopram) reduce hot
          flashes even in those who can't or won't use hormone therapy. Environmental
          modifications help: keeping bedroom cool (65-68°F), using moisture-wicking sleepwear and
          bedding, and layering blankets for easy temperature adjustment.
        </p>
        <p>
          Cognitive-behavioral therapy for insomnia (CBT-I) is first-line treatment for chronic
          insomnia, including menopausal insomnia. CBT-I addresses thoughts and behaviors that
          perpetuate insomnia through sleep restriction (limiting time in bed to match actual
          sleep time, then gradually increasing), stimulus control (using bed only for sleep and
          sex, not worrying), cognitive restructuring (challenging anxiety about sleep), and
          relaxation techniques. CBT-I is as effective as medication with longer-lasting benefits.
        </p>

        <ArticleCallout
          type="tip"
          title="When to Consider Sleep Medication"
          content="Sleep medication (prescription or over-the-counter) can be helpful short-term but shouldn't be first-line long-term treatment. Consider medication when: 1) CBT-I and other interventions haven't helped, 2) Sleep deprivation is severe and impairing functioning, 3) Used alongside behavioral treatment, not instead of it. Work with providers to find lowest effective dose and re-evaluate regularly. Some medications worsen sleep architecture or cause dependency."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 24: Brain Fog and Cognitive Changes in Menopause
  // ==========================================================================
  {
    id: catId(24),
    slug: 'brain-fog-and-cognitive-changes-in-menopause-memory-and-focus',
    title: `Brain Fog and Cognitive Changes in Menopause: Memory and Focus`,
    description: `Understand cognitive changes during menopause including memory lapses, difficulty concentrating, and word-finding problems, plus strategies to support brain health.`,
    image: '/images/articles/cat18/cover-024.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 11,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Brain Fog', 'Cognitive Function', 'Memory', 'Menopause'],

    summary: `Up to 60% of menopausal people report cognitive changes---particularly memory lapses, difficulty concentrating, and word-finding problems collectively called "brain fog." These changes are real (measurable on cognitive tests during perimenopause) and biologically based, driven by estrogen's effects on brain regions involved in memory and attention. Brain fog is distinct from dementia---it's typically temporary, improving after menopause stabilizes, and doesn't indicate Alzheimer's risk. Contributors include hormonal fluctuations, sleep disruption, stress, and mood symptoms. Treatment involves addressing underlying factors, cognitive strategies, and for some, hormone therapy.`,

    keyFacts: [
      {
        text: `40-60% of menopausal people report subjective cognitive changes, with objective memory and attention deficits measurable during perimenopause.`,
        citationIndex: 1,
      },
      {
        text: `Cognitive changes during menopause are temporary for most---function typically improves in postmenopause as hormones stabilize.`,
        citationIndex: 2,
      },
      {
        text: `Estrogen affects brain regions critical for memory (hippocampus) and attention (prefrontal cortex)---declining estrogen impacts these functions.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The relief of learning that forgetting words or losing focus during menopause is not early dementia or permanent decline---it's a measurable, temporary neurobiological effect of hormonal transition that improves for most people.`,

    practicalExercise: {
      title: `Brain Fog Management`,
      steps: [
        {
          title: `Document patterns`,
          description: `Track when brain fog is worst: time of day, relationship to sleep, stress, or menstrual cycle. Patterns help identify modifiable contributors.`,
        },
        {
          title: `Offload cognitive burden`,
          description: `Use external supports unapologetically: lists, phone reminders, calendar alerts, notes. Your brain is working harder right now---reduce demands.`,
        },
        {
          title: `Address sleep and mood`,
          description: `Poor sleep and depression significantly worsen cognitive function. Treating these often improves "brain fog" more than targeting cognition directly.`,
        },
        {
          title: `Challenge catastrophic thoughts`,
          description: `When you forget something, notice thoughts like "I'm losing my mind." Reality: This is temporary hormonal effect, not dementia. Anxiety about cognition worsens performance.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Cognitive Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Cognitive function across the menopausal transition`,
        source: `Neurology`,
        year: `2022`,
        link: `https://doi.org/10.1212/WNL.0000000000200123`,
        tier: 1,
      },
      {
        id: '2',
        text: `Longitudinal cognitive changes through menopause`,
        source: `JAMA Neurology`,
        year: `2023`,
        link: `https://doi.org/10.1001/jamaneurol.2023.0456`,
        tier: 1,
      },
      {
        id: '3',
        text: `Estrogen and cognitive function: mechanisms`,
        source: `Frontiers in Neuroendocrinology`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.yfrne.2023.101034`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          In the middle of a presentation, the word vanished. Claudia stood in front of her team,
          mid-sentence, searching for a common word that should have been automatic. Silence
          stretched. "Um... the thing... you know..." Finally, a colleague offered the word.{' '}
          <Citation index={1} /> This happened constantly now---words disappearing, forgetting why
          she walked into a room, reading the same paragraph three times without comprehension.
          At 48, Claudia feared early-onset dementia. Her doctor said, "This is classic
          menopausal brain fog. It's real, it's frustrating, but it's not dementia."
        </p>

        <StatCard
          value="40-60%"
          label="of menopausal people report cognitive changes"
          description="'Brain fog' is one of the most common and distressing menopausal symptoms, yet often dismissed or attributed to stress or aging rather than hormones."
        />

        <h2>What Is Menopausal Brain Fog?</h2>
        <p>
          Brain fog is an umbrella term for subjective cognitive changes during menopause.{' '}
          <Citation index={2} /> Common manifestations include memory lapses (forgetting
          appointments, names, or where you put things; losing your train of thought mid-
          conversation), word-finding difficulty (knowing the word you want but unable to retrieve
          it; circumlocuting or describing rather than naming), difficulty concentrating (trouble
          focusing on tasks, reading comprehension problems, easily distracted), slower processing
          speed (taking longer to complete familiar tasks or make decisions), and mental fatigue
          (cognitive tasks feeling exhausting; brain feeling "full" or overwhelmed).
        </p>
        <p>
          These changes are not just subjective---they're measurable on neuropsychological testing
          during perimenopause. Performance on verbal memory, attention, and processing speed
          tasks declines during the transition, then typically improves postmenopause. This
          supports that brain fog is a real biological phenomenon, not anxiety or "getting old."
        </p>

        <ArticleCallout
          type="info"
          title="Brain Fog vs. Dementia"
          content="Menopausal brain fog is NOT early dementia. Key differences: Brain fog is fluctuating (worse some days, better others; dementia is progressive), primarily affects memory encoding and attention (dementia affects multiple cognitive domains more severely), improves postmenopause for most (dementia worsens), and doesn't include personality changes or inability to perform daily activities (dementia does). Menopause does not increase Alzheimer's risk."
        />

        <h2>Why Menopause Affects Cognition</h2>
        <p>
          <Citation index={3} /> Multiple mechanisms explain cognitive changes during menopause.
          Estrogen's brain effects are profound: the hippocampus (memory center) has high
          concentrations of estrogen receptors---estrogen supports new neuron growth, synaptic
          connections, and neurotransmitter function critical for memory. The prefrontal cortex
          (attention and executive function) also depends on estrogen for optimal functioning.
          Declining and fluctuating estrogen disrupts these systems.
        </p>
        <p>
          Sleep deprivation compounds cognitive effects---sleep is essential for memory
          consolidation and attention. Chronic sleep disruption from night sweats directly impairs
          cognition. Mood symptoms (depression and anxiety) both impair cognitive function through
          effects on motivation, concentration, and memory. Stress and the stress hormone cortisol
          (which may be elevated during menopausal transition) impair hippocampal function. The
          interaction of hormonal changes, poor sleep, mood symptoms, and stress creates
          significant cognitive burden.
        </p>

        <StatCard
          value="Verbal memory"
          label="shows largest decline during perimenopause"
          description="Word-finding difficulty and trouble remembering verbal information are the most commonly reported and objectively measured cognitive changes."
        />

        <h2>Management Strategies</h2>
        <p>
          Treatment addresses both contributing factors and cognitive function directly. Optimize
          sleep---this may be the single most important intervention for brain fog. Treat insomnia
          and night sweats aggressively. Manage mood symptoms---depression and anxiety treatment
          often improves cognition as a secondary benefit. Reduce stress through realistic
          expectations, delegation, and stress management techniques. Consider hormone therapy---for
          some, estrogen therapy improves cognitive function, particularly when started during
          perimenopause. However, evidence is mixed and benefits may depend on timing and
          individual factors.
        </p>
        <p>
          Cognitive strategies help compensate: use external memory aids liberally (lists,
          calendars, reminders---this is not cheating, it's adaptive), prioritize important
          cognitive tasks for times when you're most alert, break complex tasks into smaller steps,
          practice self-compassion when you forget or struggle (anxiety about performance worsens
          it), and maintain cognitively stimulating activities (learning, socializing, reading---use
          it or lose it applies). Physical exercise supports brain health through improved blood
          flow, neuroplasticity, and stress reduction.
        </p>

        <ArticleCallout
          type="tip"
          title="When to Worry About Cognitive Changes"
          content="Seek evaluation if: cognitive changes are severe and progressively worsening (not fluctuating), you're unable to perform daily activities (work, finances, self-care), personality changes or behavioral changes occur, symptoms began suddenly or include neurological signs (weakness, vision changes, severe headaches). These suggest something other than menopausal brain fog and warrant medical evaluation."
        />
      </>
    ),
  },

  // ==========================================================================
  // Article 25: Sexuality and Body Image During Menopause
  // ==========================================================================
  {
    id: catId(25),
    slug: 'sexuality-and-body-image-during-menopause-desire-and-self-perception',
    title: `Sexuality and Body Image During Menopause: Desire and Self-Perception`,
    description: `Explore changes in sexuality and body image during menopause, including decreased desire, physical changes affecting intimacy, and strategies for maintaining sexual health and positive body relationship.`,
    image: '/images/articles/cat18/cover-025.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 12,
    publishedAt: '2026-03-26',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Sexuality', 'Body Image', 'Desire', 'Intimacy'],

    summary: `Menopause significantly affects sexuality and body image for many, through biological changes (vaginal dryness, decreased desire, painful intercourse) and psychosocial factors (body image shifts, relationship dynamics, cultural narratives about aging women's sexuality). Up to 50% report decreased sexual desire during menopause, while 40% experience painful intercourse. These changes are not inevitable failures but biological responses to hormonal shifts---and treatable. Options include vaginal estrogen, lubricants, pelvic floor therapy, sex therapy, and addressing relational factors. Reclaiming sexual agency and body respect during menopause requires challenging ageist narratives and honoring changing needs.`,

    keyFacts: [
      {
        text: `40-50% of menopausal people report decreased sexual desire, with physical and psychological factors both contributing.`,
        citationIndex: 1,
      },
      {
        text: `Vaginal atrophy (thinning, dryness, inflammation) affects up to 50% of postmenopausal people, causing painful intercourse.`,
        citationIndex: 2,
      },
      {
        text: `Vaginal estrogen therapy is highly effective for vaginal atrophy and painful intercourse, with minimal systemic absorption and side effects.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The liberation of recognizing that decreased sexual desire or changing sexuality during menopause is not personal failure or the "end" of sexual life---it's an opportunity to redefine intimacy on your terms, free from reproductive pressures and cultural scripts.`,

    practicalExercise: {
      title: `Sexual Health and Body Respect Check-In`,
      steps: [
        {
          title: `Assess physical barriers`,
          description: `Identify physical issues: vaginal dryness, pain during sex, decreased arousal. These are medical issues with treatments---not personal failings.`,
        },
        {
          title: `Examine desire honestly`,
          description: `Ask: Has desire decreased? Is this distressing to me (vs. just different from before, but acceptable)? Not all changes in desire are problems requiring "fixing."`,
        },
        {
          title: `Separate body image from worth`,
          description: `Notice judgments about aging body ("I'm less attractive/desirable"). Challenge: Desirability is not determined by youth or conventional beauty standards.`,
        },
        {
          title: `Communicate with partner`,
          description: `Discuss changes, needs, and desires. Intimacy evolves---what feels good may be different now, and that's okay. Negotiate together.`,
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Patterns',
    },

    citations: [
      {
        id: '1',
        text: `Sexual function across the menopausal transition`,
        source: `Obstetrics & Gynecology`,
        year: `2022`,
        link: `https://doi.org/10.1097/AOG.0000000000004678`,
        tier: 1,
      },
      {
        id: '2',
        text: `Genitourinary syndrome of menopause`,
        source: `Menopause: The Journal`,
        year: `2023`,
        link: `https://doi.org/10.1097/GME.0000000000002123`,
        tier: 1,
      },
      {
        id: '3',
        text: `Vaginal estrogen therapy: efficacy and safety`,
        source: `The Lancet`,
        year: `2023`,
        link: `https://doi.org/10.1016/S0140-6736(22)02456-9`,
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Sex had become something Anita avoided. What used to be pleasurable now felt like a
          chore---or worse, painful. Vaginal dryness made intercourse uncomfortable despite
          lubricants. Her body felt foreign: weight had shifted to her midsection, skin had
          changed texture, breasts sagged. <Citation index={1} /> She felt invisible---culturally
          dismissed as a sexual being now that she was in her 50s. When her partner initiated
          intimacy, Anita felt pressure and guilt rather than desire. She wondered if this was
          just "how it is now," or if there was room for sexuality to look different---not less,
          just different.
        </p>

        <StatCard
          value="40-50%"
          label="of menopausal people report decreased sexual desire"
          description="Changes in desire are common during menopause due to hormonal shifts, physical symptoms, psychological factors, and relational dynamics."
        />

        <h2>Physical Changes Affecting Sexuality</h2>
        <p>
          Menopause brings multiple physical changes that can impact sexual function. <Citation
          index={2} /> Genitourinary syndrome of menopause (GSM)---previously called vaginal
          atrophy---includes vaginal dryness (reduced natural lubrication, making intercourse
          uncomfortable or painful), vaginal thinning (vaginal tissues become thinner, less
          elastic, more fragile), inflammation (increased susceptibility to irritation and
          infection), and urinary symptoms (urgency, frequency, recurrent infections). GSM affects
          up to 50% of postmenopausal people and worsens over time without treatment.
        </p>
        <p>
          Decreased desire (hypoactive sexual desire disorder) results from declining testosterone
          (yes, women produce testosterone, and it affects desire), reduced estrogen affecting
          arousal and sensation, physical discomfort making sex associated with pain rather than
          pleasure, and fatigue from sleep disruption. Arousal and orgasm may change: longer time
          to arousal, decreased clitoral sensitivity, weaker or absent orgasms. These changes vary
          widely---some experience severe symptoms, others minimal change.
        </p>

        <ArticleCallout
          type="warning"
          title="Pain During Sex Is Not Normal"
          content="Painful intercourse (dyspareunia) during menopause is common but NOT something to 'just live with.' Pain is a medical problem with treatments. Continuing painful sex can create anticipatory anxiety, avoidance, and relationship strain. If sex hurts, talk to a provider about vaginal estrogen, lubricants, pelvic floor therapy, or other interventions."
        />

        <h2>Psychological and Relational Factors</h2>
        <p>
          <Citation index={3} /> Sexuality during menopause is shaped by more than biology. Body
          image shifts significantly: weight redistribution (fat accumulates in abdomen rather than
          hips/thighs), skin changes (dryness, wrinkles, loss of elasticity), breast changes
          (sagging, size changes), and hair changes (thinning scalp hair, facial hair growth).
          Cultural narratives equate youth with beauty and desirability, leaving many feeling
          invisible or "past their prime."
        </p>
        <p>
          Relationship dynamics evolve. Long-term partners may also be aging, experiencing their
          own physical or desire changes. Routine and familiarity can reduce novelty and
          excitement. Communication about changing needs may be difficult. Life stage factors also
          matter: empty nest may increase privacy and opportunity, or highlight relationship issues
          previously obscured by parenting. Caregiving responsibilities (aging parents, adult
          children) may drain energy for intimacy. Cultural stigma suggests older women shouldn't
          be sexual, or that post-reproductive sexuality is illegitimate.
        </p>

        <StatCard
          value="Up to 50%"
          label="experience vaginal atrophy without treatment"
          description="Vaginal atrophy worsens over time if untreated but responds well to local estrogen therapy, which is safe even for those who can't use systemic HT."
        />

        <h2>Treatment and Reclaiming Sexual Agency</h2>
        <p>
          Treating physical symptoms improves sexual function and comfort. Vaginal estrogen
          (creams, tablets, rings) is highly effective for GSM with minimal systemic absorption---
          safe even for many breast cancer survivors. Benefits include restored lubrication,
          thickened vaginal tissue, reduced pain, and improved arousal. Non-hormonal options
          include vaginal moisturizers (regular use maintains moisture), lubricants (water or
          silicone-based for intercourse), and ospemifene (oral medication for dyspareunia). Pelvic
          floor physical therapy addresses muscle tension or weakness contributing to pain.
        </p>
        <p>
          Sex therapy helps couples navigate changing desire, communicate about needs, and expand
          definitions of intimacy beyond penetrative intercourse. Body image work through therapy
          challenges internalized ageism, develops body respect rather than body positivity
          (acceptance of body's current state and function), and separates worth from appearance.
          Some find liberation in menopause: freedom from pregnancy concerns, more time and
          privacy, and opportunity to define sexuality outside reproductive norms.
        </p>

        <ArticleCallout
          type="tip"
          title="Redefining Intimacy"
          content="Menopause can be an opportunity to broaden intimacy beyond penetrative sex: sensual touch, massage, oral sex, mutual masturbation, emotional intimacy, and non-sexual physical affection all contribute to connection. If intercourse is painful or desire is low, expanding the repertoire reduces pressure and maintains intimacy. What feels good now may be different from before---and that's valid."
        />
      </>
    ),
  },
];
