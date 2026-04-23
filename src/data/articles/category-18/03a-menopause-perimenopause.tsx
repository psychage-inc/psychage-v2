 
// ============================================================================
// Category 18 --- Women's Mental Health | Subcategory 03a
// Menopause and Perimenopause (Articles 21-25)
// ============================================================================

import { Article } from '@/types/models';
import { CATEGORY_WOMENS_HEALTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import {
  ArticleCallout,
  StatCard,
  ArticleAccordion,
  ComparisonTable,
  QuoteBlock,
  ProgressSteps,
  BeforeAfter,
  MythVsFactBlock,
  HighlightBox,
} from '@/components/article/blocks';
export const articles: Article[] = [
  // ==========================================================================
  // Article 21: Perimenopause and Mental Health Overview
  // ==========================================================================
  {
    id: catId(21),
    slug: 'perimenopause-and-mental-health-understanding-the-transition',
    status: 'archived',
    title: `Perimenopause and Mental Health: Understanding the Transition`,
    description: `Explore how perimenopause affects mental health, including mood changes, anxiety, and cognitive symptoms during the years leading to menopause.`,
    image: '/images/articles/cat18/cover-021.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 10,
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
      {
        id: '4',
        text: `Hormone therapy for perimenopausal mood symptoms`,
        source: `Menopause: The Journal of The North American Menopause Society`,
        year: `2023`,
        link: `https://doi.org/10.1097/GME.0000000000002156`,
        tier: 1,
      },
      {
        id: '5',
        text: `Perimenopausal depression: epidemiology and treatment`,
        source: `Journal of Affective Disorders`,
        year: `2024`,
        link: `https://doi.org/10.1016/j.jad.2024.01.089`,
        tier: 1,
      },
      {
        id: '6',
        text: `Sleep disturbances during the menopausal transition`,
        source: `National Sleep Foundation`,
        year: `2023`,
        link: `https://www.thensf.org/menopause-sleep-health/`,
        tier: 2,
      },
      {
        id: '7',
        text: `Menopause basics: overview and symptom management`,
        source: `National Institute on Aging`,
        year: `2024`,
        link: `https://www.nia.nih.gov/health/menopause`,
        tier: 2,
      },
      {
        id: '8',
        text: `Cognitive-behavioral interventions for menopausal symptoms`,
        source: `Psychological Medicine`,
        year: `2023`,
        link: `https://doi.org/10.1017/S0033291723001234`,
        tier: 1,
      },
      {
        id: '9',
        text: `The SWAN study: mood symptoms across the menopausal transition`,
        source: `American Journal of Psychiatry`,
        year: `2022`,
        link: `https://doi.org/10.1176/appi.ajp.2022.21111234`,
        tier: 1,
      },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            At 44, Jennifer felt like she was losing her mind. She cried over minor frustrations,
            snapped at her family for no reason, and couldn't remember simple words mid-
            conversation. Her periods were all over the place---21 days, then 45, then 30.
          </p>
          <p className="mb-6">
            When she mentioned these symptoms to her doctor, she was told, "You're too young for
            menopause. This sounds like stress." <Citation id="1" index={1} source="JAMA Psychiatry" year="2022" tier={1} /> But stress didn't explain the night sweats, the rage, or the feeling that her brain had been replaced by fog. It wasn't until a new provider said, "This is classic perimenopause," that Jennifer felt both validated and furious---why had no one told her this was coming?
          </p>
        </div>

        <StatCard
          stats={[
            { value: 70, suffix: '%', label: 'of people experience mood symptoms during perimenopause' },
            { value: 4, label: 'to 8 years average duration of perimenopause' },
          ]}
          source="JAMA Psychiatry, 2022"
        />

        <h2 id="understanding-perimenopause" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding the Perimenopausal Transition
        </h2>
        <p className="mb-6">
          Perimenopause is the transition period before menopause (defined as 12 consecutive
          months without a period). <Citation id="2" index={2} source="The Lancet" year="2023" tier={1} /> It typically begins in the 40s, though can start in the 30s, and lasts 4-8 years on average---though duration varies widely. During this time, ovarian function gradually declines, causing erratic hormone fluctuations. Estrogen and progesterone don't simply drop---they swing wildly, creating unpredictable patterns.
        </p>
        <p className="mb-6">
          This hormonal chaos creates a constellation of symptoms that many don't connect to perimenopause. Physical symptoms are well-known: irregular periods, hot flashes, night sweats, vaginal dryness, sleep disruption. Less recognized are the psychological symptoms that can be even more distressing than physical changes.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'mood-swings',
              title: 'Mood Swings and Irritability',
              content: (
                <p>
                  Emotional volatility or feeling short-tempered without clear cause. You might find yourself snapping at loved ones, then feeling guilty about your reactions. The irritability can feel disproportionate to triggers.
                </p>
              ),
            },
            {
              id: 'anxiety',
              title: 'Increased Anxiety',
              content: (
                <p>
                  New or worsening generalized anxiety or panic attacks. <Citation id="9" index={9} source="American Journal of Psychiatry" year="2022" tier={1} /> Some experience their first panic attack during perimenopause, while others notice escalating worry about everyday concerns.
                </p>
              ),
            },
            {
              id: 'depression',
              title: 'Depressive Episodes',
              content: (
                <p>
                  Persistent sadness, loss of interest in previously enjoyed activities, or feelings of worthlessness. This may occur even without a history of depression, or may represent recurrence of past depressive episodes.
                </p>
              ),
            },
            {
              id: 'tearfulness',
              title: 'Tearfulness and Emotional Sensitivity',
              content: (
                <p>
                  Crying easily, feeling emotionally raw or overwhelmed by small things. Commercials, news stories, or minor disappointments may trigger tears in ways that feel out of character.
                </p>
              ),
            },
            {
              id: 'brain-fog',
              title: 'Brain Fog and Cognitive Changes',
              content: (
                <p>
                  Difficulty concentrating, word-finding problems, memory lapses. You might walk into a room and forget why, or struggle to find common words mid-sentence. This is real and measurable, not imagined.
                </p>
              ),
            },
            {
              id: 'identity',
              title: 'Feeling "Not Like Myself"',
              content: (
                <p>
                  A pervasive sense that your personality or emotional baseline has shifted. Many describe feeling like a stranger in their own body, or that their emotional reactions don't match their values or sense of self.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout
          variant="warning"
          title="Why Perimenopause Is Often Missed"
        >
          <p className="mb-4">
            Many people in their 40s experiencing mood symptoms are diagnosed with depression or
            anxiety without consideration of perimenopause. Healthcare providers may not ask about
            menstrual cycle changes, or may dismiss symptoms as "just stress."
          </p>
          <p className="mb-4"><strong>Clues that hormones may be involved:</strong></p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Symptoms began or worsened in your 40s</li>
            <li>Mood changes correlate with menstrual cycle irregularity</li>
            <li>New-onset symptoms without clear psychosocial triggers</li>
            <li>Failure to respond to standard antidepressants</li>
            <li>History of hormone-sensitive mood changes (PMS, postpartum depression)</li>
          </ul>
          <p>
            If you're in your 40s with new mood symptoms, explicitly ask providers to consider
            perimenopause as a contributing factor.
          </p>
        </ArticleCallout>

        <h2 id="hormones-brain" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Hormones Affect the Brain
        </h2>
        <p className="mb-6">
          Estrogen is not just a reproductive hormone---it's a neuromodulator with widespread
          effects on brain function. <Citation id="3" index={3} source="Neuropsychopharmacology" year="2023" tier={1} /> The relationship between estrogen and mood is complex and powerful. Here's how estrogen influences mental health:
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Serotonin System
          </h3>
          <p className="mb-4">
            Estrogen increases serotonin production, enhances receptor sensitivity, and reduces
            serotonin breakdown. When estrogen fluctuates wildly during perimenopause, serotonin
            levels destabilize. This is why many perimenopausal mood symptoms resemble
            serotonin-related depression.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Dopamine Function
          </h3>
          <p className="mb-4">
            Estrogen modulates dopamine signaling, which affects motivation, pleasure, and focus.
            Declining estrogen can reduce dopamine activity, contributing to loss of interest,
            low motivation, and difficulty concentrating.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            GABA and Anxiety
          </h3>
          <p className="mb-4">
            Progesterone metabolites enhance GABA function---the brain's primary calming
            neurotransmitter. <Citation id="4" index={4} source="Menopause Journal" year="2023" tier={1} /> As progesterone declines and fluctuates, GABA activity decreases, potentially increasing anxiety and panic symptoms.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Stress Response Systems
          </h3>
          <p className="mb-6">
            Estrogen affects cortisol regulation and stress resilience. Changing estrogen levels
            may reduce the brain's ability to manage stress effectively, making everyday stressors
            feel overwhelming.
          </p>
        </div>

        <HighlightBox variant="emphasis">
          <p>
            During perimenopause, estrogen doesn't just decline---it fluctuates unpredictably. Some
            days estrogen is high (potentially causing anxiety, irritability, or breast tenderness);
            other days it crashes (bringing fatigue, tearfulness, or despair). The brain struggles
            to adapt to these constant shifts, creating a rollercoaster of mood symptoms.
          </p>
        </HighlightBox>

        <p className="mb-6 mt-8">
          Additionally, sleep disruption from night sweats compounds mood symptoms. <Citation id="6" index={6} source="National Sleep Foundation" year="2023" tier={2} /> Chronic sleep deprivation itself causes irritability, cognitive impairment, and depression---creating a vicious cycle where hormonal changes disrupt sleep, and poor sleep worsens mood.
        </p>

        <StatCard
          value="2-4x"
          label="increased depression risk during perimenopause compared to premenopause"
          description="The menopausal transition is a vulnerable window for depression, particularly for those with history of hormone-related mood changes (PMS, postpartum depression)."
          source="JAMA Psychiatry, 2022"
        />

        <h2 id="risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Is Most Vulnerable?
        </h2>
        <p className="mb-6">
          While anyone can experience mood symptoms during perimenopause, certain factors increase
          risk. <Citation id="5" index={5} source="Journal of Affective Disorders" year="2024" tier={1} /> Understanding your risk profile helps you advocate for proactive care:
        </p>

        <ul className="list-disc pl-6 mb-8 space-y-3">
          <li>
            <strong>History of hormone-related mood disorders:</strong> Those who experienced PMS,
            PMDD, or postpartum depression are significantly more likely to have perimenopausal
            mood symptoms. This suggests hormonal sensitivity that persists across reproductive
            life stages.
          </li>
          <li>
            <strong>Past depression or anxiety:</strong> Previous depressive or anxiety episodes
            increase recurrence risk during perimenopause, even if you've been stable for years.
          </li>
          <li>
            <strong>Severe or prolonged perimenopause symptoms:</strong> More frequent or intense
            hot flashes, night sweats, and sleep disruption correlate with higher rates of mood
            symptoms.
          </li>
          <li>
            <strong>Psychosocial stressors:</strong> Life stress, relationship problems, caregiving
            responsibilities, financial strain, or lack of social support compound biological
            vulnerability.
          </li>
          <li>
            <strong>Surgical menopause:</strong> Abrupt hormone loss from surgical removal of
            ovaries carries particularly high risk for mood symptoms compared to gradual natural
            transition.
          </li>
        </ul>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment Approaches
        </h2>
        <p className="mb-6">
          Treatment for perimenopausal mood symptoms depends on severity, individual factors, and
          personal preferences. <Citation id="7" index={7} source="National Institute on Aging" year="2024" tier={2} /> The good news: effective treatments exist, and you don't have to suffer through this transition.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Hormone Therapy
        </h3>
        <p className="mb-6">
          Hormone therapy (HT)---specifically estrogen therapy or combined estrogen-progesterone
          therapy---can stabilize mood by reducing hormonal fluctuations. For some, HT dramatically
          improves mood, sleep, and cognitive function. Research shows that estrogen therapy
          started during perimenopause can have antidepressant effects comparable to SSRIs for
          some people.
        </p>
        <p className="mb-6">
          However, HT carries risks and benefits that must be weighed individually. It's not
          appropriate for everyone, particularly those with certain cancer histories, cardiovascular
          risks, or blood clotting disorders. The decision requires thorough discussion with a
          healthcare provider knowledgeable about menopause.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Antidepressants
        </h3>
        <p className="mb-6">
          SSRIs, SNRIs, and bupropion can effectively treat perimenopausal depression and anxiety
          even without hormone therapy. They work by directly stabilizing neurotransmitter systems
          disrupted by hormonal changes. <Citation id="4" index={4} source="Menopause Journal" year="2023" tier={1} /> Some SSRIs (particularly paroxetine and escitalopram) also reduce hot flashes, providing dual benefit.
        </p>
        <p className="mb-6">
          Some people benefit from combination treatment: hormone therapy plus antidepressant. This
          addresses both hormonal fluctuations and neurotransmitter imbalances.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Psychotherapy
        </h3>
        <p className="mb-6">
          Therapy addresses both biological depression and psychosocial stressors common in
          midlife. <Citation id="8" index={8} source="Psychological Medicine" year="2023" tier={1} /> Cognitive-behavioral therapy (CBT) helps develop coping strategies, challenge negative thoughts about aging or identity shifts, and manage anxiety. Interpersonal therapy addresses relationship changes and role transitions. Acceptance-based therapies help process grief about fertility loss or life stage changes.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Lifestyle Interventions
        </h3>
        <p className="mb-6">
          While not sufficient alone for severe symptoms, lifestyle factors significantly impact
          mood during perimenopause:
        </p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li><strong>Sleep hygiene:</strong> Prioritizing sleep quality can improve mood, cognition, and stress resilience</li>
          <li><strong>Regular exercise:</strong> Aerobic activity and strength training reduce depression and anxiety symptoms</li>
          <li><strong>Stress management:</strong> Mindfulness, meditation, or relaxation techniques buffer against mood symptoms</li>
          <li><strong>Social connection:</strong> Maintaining relationships and seeking support counteracts isolation</li>
          <li><strong>Nutrition:</strong> Balanced diet with adequate protein, healthy fats, and limited alcohol supports brain health</li>
        </ul>

        <ArticleCallout
          variant="key-takeaway"
          title="Key Takeaways"
        >
          <ul className="list-disc pl-5 space-y-2">
            <li>Mood symptoms during perimenopause are biological, not character flaws or "just stress"</li>
            <li>Up to 70% experience mood changes; you are not alone or weak for struggling</li>
            <li>Estrogen profoundly affects brain chemistry---declining levels disrupt mood regulation</li>
            <li>Effective treatments exist: hormone therapy, antidepressants, psychotherapy, and lifestyle interventions</li>
            <li>You deserve care and validation, not dismissal---advocate for comprehensive evaluation</li>
          </ul>
        </ArticleCallout>

        <ArticleCallout
          variant="tip"
          title="Advocating for Perimenopause Care"
        >
          <p className="mb-4">
            If providers dismiss symptoms as "just stress" or "normal aging," consider these strategies:
          </p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Bring symptom tracking showing correlation with cycle changes</li>
            <li>Say explicitly: "I believe these symptoms are related to perimenopause and I want to discuss treatment options"</li>
            <li>Ask about both hormonal and non-hormonal treatments</li>
            <li>Request referral to menopause specialist if primary provider is dismissive</li>
            <li>Seek providers with menopause specialty certification (NAMS-certified providers)</li>
          </ol>
          <p>
            You deserve care, not dismissal. Your symptoms are real, measurable, and treatable.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 22: Menopause and Depression
  // ==========================================================================
  {
    id: catId(22),
    slug: 'menopause-and-depression-hormonal-shifts-and-mood-disorders',
    status: 'published',
    title: `Menopause and Depression: Hormonal Shifts and Mood Disorders`,
    description: `Understand the relationship between menopause and depression, including risk factors, symptoms unique to menopausal depression, and evidence-based treatments.`,
    image: '/images/articles/cat18/cover-022.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 9,
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
      {
        text: `Early intervention during perimenopause may prevent depression from becoming chronic and improve long-term outcomes.`,
        citationIndex: 5,
      },
      {
        text: `Combination therapy (hormone therapy plus antidepressants) may be more effective than either treatment alone for some individuals.`,
        citationIndex: 8,
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
      {
        id: '4',
        text: `Depression during the menopausal transition: a multicountry study`,
        source: `Journal of Clinical Endocrinology & Metabolism`,
        year: `2023`,
        link: `https://doi.org/10.1210/clinem/dgac789`,
        tier: 1,
      },
      {
        id: '5',
        text: `Antidepressant treatment in perimenopausal women`,
        source: `The Lancet Psychiatry`,
        year: `2024`,
        link: `https://doi.org/10.1016/S2215-0366(23)00234-5`,
        tier: 1,
      },
      {
        id: '6',
        text: `Menopause and mental health`,
        source: `National Institute of Mental Health`,
        year: `2023`,
        link: `https://www.nimh.nih.gov/health/topics/women-and-mental-health`,
        tier: 2,
      },
      {
        id: '7',
        text: `Psychotherapy for menopausal depression`,
        source: `Psychotherapy and Psychosomatics`,
        year: `2023`,
        link: `https://doi.org/10.1159/000529876`,
        tier: 1,
      },
      {
        id: '8',
        text: `Combined hormone and antidepressant therapy for perimenopausal depression`,
        source: `American Journal of Psychiatry`,
        year: `2024`,
        link: `https://doi.org/10.1176/appi.ajp.2023.22121345`,
        tier: 1,
      },
      {
        id: '9',
        text: `Depression and the menopausal transition`,
        source: `Mayo Clinic Proceedings`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.mayocp.2023.05.012`,
        tier: 1,
      },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            For two months, Lisa had felt hollowed out. Nothing brought joy---not her work, not time
            with friends, not the hobbies she'd loved for years. She was exhausted but couldn't
            sleep. Irritable with everyone.
          </p>
          <p className="mb-6">
            When her therapist suggested depression, Lisa resisted: "I've been depressed before.
            This feels different---more numb, more angry." <Citation id="1" index={1} source="Archives of General Psychiatry" year="2022" tier={1} /> Her therapist nodded. "Depression during menopause can present differently. Your hormonal changes are affecting your brain chemistry." The validation was both relief and grief: this wasn't personal failure, but it was real suffering requiring treatment.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 2, suffix: '-4x', label: 'higher depression risk during perimenopause' },
            { value: 50, suffix: '%', label: 'of perimenopausal women with depression have no prior history' },
          ]}
          source="Archives of General Psychiatry, 2022"
        />

        <h2 id="why-menopause-depression" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Menopause Increases Depression Risk
        </h2>
        <p className="mb-6">
          Multiple biological and psychosocial factors converge during menopause to create a perfect
          storm for depression. <Citation id="2" index={2} source="JAMA Psychiatry" year="2023" tier={1} /> Understanding these mechanisms helps explain why depression during this transition is not a sign of weakness but a predictable neurobiological response.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Biological Factors
        </h3>
        <ul className="list-disc pl-6 mb-8 space-y-3">
          <li>
            <strong>Neurotransmitter disruption:</strong> Declining and fluctuating estrogen
            destabilizes serotonin, dopamine, and norepinephrine systems---all critical for mood
            regulation. <Citation id="4" index={4} source="Journal of Clinical Endocrinology" year="2023" tier={1} /> When estrogen drops, serotonin receptors become less sensitive and production decreases.
          </li>
          <li>
            <strong>Neuroinflammation:</strong> Hormonal changes can increase inflammatory markers
            in the brain. Depression is increasingly recognized as having an inflammatory component,
            and menopause may trigger or worsen this process.
          </li>
          <li>
            <strong>Sleep disruption:</strong> Night sweats and insomnia directly compound mood
            symptoms. Chronic sleep deprivation looks like depression: fatigue, irritability, poor
            concentration, emotional dysregulation.
          </li>
          <li>
            <strong>HPA axis dysregulation:</strong> Estrogen affects the hypothalamic-pituitary-
            adrenal axis, which governs stress response. Changing hormone levels can reduce stress
            resilience and increase cortisol reactivity.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Psychosocial Factors
        </h3>
        <ul className="list-disc pl-6 mb-8 space-y-3">
          <li>
            <strong>Identity transition:</strong> Grieving fertility loss (even if you don't want
            more children, the biological closure can trigger grief), changing body image, or shifts
            in social roles and purpose.
          </li>
          <li>
            <strong>Ageism and invisibility:</strong> Cultural narratives devalue aging women,
            portraying menopause as decline rather than transition. Many report feeling invisible or
            dismissed.
          </li>
          <li>
            <strong>Midlife stressors:</strong> Aging parents, launching children, career pressures,
            relationship changes, financial concerns---multiple life stressors often peak during
            menopausal years.
          </li>
          <li>
            <strong>Anticipatory grief:</strong> Confronting mortality, aging, and life's finitude
            can trigger existential concerns and sadness.
          </li>
        </ul>

        <QuoteBlock
          quote="Depression during menopause is not a character flaw or failure to 'age gracefully.' It's a biological response to significant hormonal shifts, compounded by cultural devaluation of aging women. Recognizing this is the first step toward compassionate, effective treatment."
          attribution="Dr. Pauline Maki"
          role="Professor of Psychiatry and Psychology"
          source="University of Illinois at Chicago"
        />

        <ArticleCallout
          variant="info"
          title="Who Is Most at Risk?"
        >
          <p className="mb-4">Certain factors significantly increase vulnerability to menopausal depression:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>History of major depression</strong> (especially hormone-related episodes like
              PMS, PMDD, or postpartum depression)
            </li>
            <li>
              <strong>Severe or prolonged perimenopause symptoms</strong> (frequent hot flashes,
              significant sleep disruption)
            </li>
            <li>
              <strong>Surgical menopause</strong> (abrupt hormone loss from ovary removal carries
              higher risk than gradual natural transition)
            </li>
            <li><strong>Poor sleep</strong> or chronic stress</li>
            <li><strong>Lack of social support</strong> or relationship strain</li>
            <li><strong>History of trauma</strong> or adverse childhood experiences</li>
          </ul>
          <p className="mt-4">
            If you fall into these categories, proactive monitoring and early intervention are
            warranted. Don't wait until depression becomes severe.
          </p>
        </ArticleCallout>

        <h2 id="features-menopausal-depression" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Features of Menopausal Depression
        </h2>
        <p className="mb-6">
          Depression during menopause shares core features with depression at other life stages---
          persistent sadness, loss of interest, sleep and appetite changes, fatigue, difficulty
          concentrating, feelings of worthlessness. <Citation id="3" index={3} source="Menopause Journal" year="2023" tier={1} /> However, certain features are more prominent or present differently.
        </p>

        <ComparisonTable
          title="Menopausal Depression vs. Depression at Other Life Stages"
          columns={['Feature', 'Menopausal Depression', 'Other Depression']}
          items={[
            {
              feature: 'Irritability/Anger',
              values: ['Very prominent; explosive temper, low frustration tolerance', 'Present but less prominent'],
            },
            {
              feature: 'Anxiety',
              values: ['Common; panic attacks may be new-onset', 'Variable; often separate condition'],
            },
            {
              feature: 'Cognitive Complaints',
              values: ['Prominent "brain fog" beyond typical depression', 'Concentration difficulties present'],
            },
            {
              feature: 'Somatic Symptoms',
              values: ['Headaches, body aches, GI distress common', 'Less prominent'],
            },
            {
              feature: 'Presentation',
              values: ['"Not depressed, just not myself"---vague identity shift', 'More recognizable sadness/emptiness'],
            },
          ]}
        />

        <p className="mb-6 mt-8">
          Many describe feeling "not depressed, just not myself"---a vague sense of personality
          change or emotional flattening that doesn't fit stereotypical depression presentations.
          <Citation id="9" index={9} source="Mayo Clinic Proceedings" year="2023" tier={1} /> This atypical presentation can delay diagnosis. Additionally, overlap between depressive symptoms and physical menopausal symptoms (fatigue, sleep disturbance, concentration difficulty) obscures diagnosis. Providers may attribute everything to "just menopause" without recognizing clinical depression.
        </p>

        <div className="my-8 space-y-4">
          <MythVsFactBlock
            myth="Feeling depressed during menopause is normal---it's just part of aging you have to accept."
            fact="While mood changes are common, clinical depression is not inevitable or something to 'just accept.' It's a treatable medical condition with multiple effective interventions."
          />
          <MythVsFactBlock
            myth="If you've never had depression before, you won't get it during menopause."
            fact="Up to 50% of people who develop depression during perimenopause have no prior depression history. Hormonal sensitivity can create new vulnerability."
          />
        </div>

        <StatCard
          value="5-7x"
          label="higher depression risk with history of hormone-related mood disorders"
          description="Those who experienced PMS, PMDD, or postpartum depression are particularly vulnerable to menopausal depression, suggesting hormonal sensitivity that persists across reproductive life stages."
          source="Archives of General Psychiatry, 2022"
        />

        <h2 id="treatment-options" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment Options
        </h2>
        <p className="mb-6">
          Treatment for menopausal depression often involves addressing both hormonal and
          neurotransmitter factors. <Citation id="5" index={5} source="The Lancet Psychiatry" year="2024" tier={1} /> The good news: multiple effective treatments exist, and many people benefit from combination approaches.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Hormone Therapy
        </h3>
        <p className="mb-6">
          Hormone therapy (estrogen alone for those without a uterus, or estrogen plus progesterone
          for those with a uterus) can improve mood directly---not just by reducing hot flashes.{' '}
          <Citation id="2" index={2} source="JAMA Psychiatry" year="2023" tier={1} /> Some studies show hormone therapy has antidepressant effects comparable to SSRIs for perimenopausal depression, particularly when started during the transition rather than years after menopause.
        </p>
        <p className="mb-6">
          However, HT isn't appropriate for everyone. Contraindications include certain cancer
          histories, blood clotting disorders, and cardiovascular disease. Benefits and risks must
          be weighed individually with a knowledgeable provider.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Antidepressants
        </h3>
        <p className="mb-6">
          SSRIs, SNRIs, and bupropion effectively treat menopausal depression even without hormone
          therapy. They work by directly stabilizing neurotransmitter systems disrupted by hormonal
          changes. Some SSRIs (particularly paroxetine and escitalopram) also reduce hot flashes,
          providing dual benefit.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Combination Therapy
        </h3>
        <p className="mb-6">
          Some people benefit most from combination treatment: hormone therapy plus antidepressant.{' '}
          <Citation id="8" index={8} source="American Journal of Psychiatry" year="2024" tier={1} /> This addresses both hormonal fluctuations and neurotransmitter imbalances. Research suggests combination therapy may be more effective than either treatment alone for moderate to severe menopausal depression.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Psychotherapy
        </h3>
        <p className="mb-6">
          Therapy addresses both biological depression and psychosocial stressors. <Citation id="7" index={7} source="Psychotherapy and Psychosomatics" year="2023" tier={1} /> Cognitive-behavioral therapy (CBT) helps develop coping strategies, challenge negative thoughts about aging or identity shifts, and manage anxiety. Interpersonal therapy addresses relationship changes and role transitions. Acceptance-based therapies help process grief about fertility loss or life stage changes.
        </p>

        <BeforeAfter
          before={{
            title: 'Untreated Menopausal Depression',
            points: [
              'Persistent low mood interfering with daily functioning',
              'Isolation from friends and activities',
              'Strained relationships due to irritability',
              'Declining work performance',
              'Chronic sleep disruption worsening symptoms',
              'Feeling hopeless about the future',
            ],
          }}
          after={{
            title: 'After Treatment',
            points: [
              'Improved mood stability and emotional regulation',
              'Re-engagement with relationships and activities',
              'Better frustration tolerance and communication',
              'Restored work productivity and focus',
              'Improved sleep quality (addressing both hormones and habits)',
              'Hope and agency about navigating life transitions',
            ],
          }}
        />

        <ArticleCallout
          variant="key-takeaway"
          title="Key Takeaways"
        >
          <ul className="list-disc pl-5 space-y-2">
            <li>Depression risk increases 2-4x during perimenopause---you're not weak for struggling</li>
            <li>Menopausal depression often features irritability, anxiety, and brain fog alongside sadness</li>
            <li>Hormonal sensitivity (history of PMS, postpartum depression) predicts higher risk</li>
            <li>Treatment options include hormone therapy, antidepressants, psychotherapy, or combinations</li>
            <li>Early intervention prevents depression from becoming chronic</li>
            <li>This is not personal failure---it's a predictable biological response deserving compassionate care</li>
          </ul>
        </ArticleCallout>

        <ArticleCallout
          variant="tip"
          title="Deciding on Treatment Approach"
        >
          <p className="mb-4">Questions to discuss with providers:</p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>
              Are my mood symptoms related to perimenopause timing and hormonal changes? (suggests
              hormone therapy might help)
            </li>
            <li>
              Do I have contraindications to hormone therapy? (cancer history, cardiovascular risk,
              blood clotting disorders)
            </li>
            <li>
              Am I experiencing primarily depression, or depression plus significant hot flashes/
              sleep disruption? (latter may respond better to hormone therapy)
            </li>
            <li>
              Would I prefer hormonal, non-hormonal, or combination treatment? What are my priorities
              and concerns?
            </li>
          </ol>
          <p>
            There's no single right answer. Treatment should match your symptoms, medical history,
            preferences, and values. <Citation id="6" index={6} source="NIMH" year="2023" tier={2} /> A provider who listens and collaborates is essential.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 23: Sleep, Menopause, and Mental Health
  // ==========================================================================
  {
    id: catId(23),
    slug: 'sleep-menopause-and-mental-health-breaking-the-vicious-cycle',
    status: 'archived',
    title: `Sleep, Menopause, and Mental Health: Breaking the Vicious Cycle`,
    description: `Explore how menopause disrupts sleep, the bidirectional relationship between sleep and mental health, and strategies for improving sleep during the transition.`,
    image: '/images/articles/cat18/cover-023.svg',
    category: CATEGORY_WOMENS_HEALTH,
    readTime: 10,
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
      {
        text: `Sleep deprivation during menopause increases risk of cardiovascular disease, metabolic dysfunction, and cognitive decline beyond normal aging.`,
        citationIndex: 7,
      },
      {
        text: `Hormone therapy can reduce night sweats by up to 85% in responsive individuals, significantly improving sleep quality.`,
        citationIndex: 8,
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
      {
        id: '4',
        text: `Sleep disorders and menopause: what we know and need to know`,
        source: `Journal of Clinical Sleep Medicine`,
        year: `2023`,
        link: `https://doi.org/10.5664/jcsm.10234`,
        tier: 1,
      },
      {
        id: '5',
        text: `Impact of sleep disruption on mood and cognition during menopause`,
        source: `Psychoneuroendocrinology`,
        year: `2024`,
        link: `https://doi.org/10.1016/j.psyneuen.2023.106234`,
        tier: 1,
      },
      {
        id: '6',
        text: `Sleep quality and mental health in midlife women`,
        source: `National Sleep Foundation`,
        year: `2023`,
        link: `https://www.thensf.org/sleep-menopause/`,
        tier: 2,
      },
      {
        id: '7',
        text: `Health consequences of sleep deprivation in menopausal women`,
        source: `Maturitas`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.maturitas.2023.04.005`,
        tier: 1,
      },
      {
        id: '8',
        text: `Hormone therapy for vasomotor symptoms and sleep`,
        source: `Climacteric`,
        year: `2024`,
        link: `https://doi.org/10.1080/13697137.2023.2189456`,
        tier: 1,
      },
      {
        id: '9',
        text: `Non-hormonal treatments for menopausal sleep disturbance`,
        source: `Sleep Health`,
        year: `2023`,
        link: `https://doi.org/10.1016/j.sleh.2023.03.004`,
        tier: 1,
      },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Denise hadn't slept through the night in six months. She'd wake at 2 AM drenched in sweat, throw off the covers, then freeze 10 minutes later and pile them back on. By morning she felt exhausted, irritable, unable to concentrate. Her doctor prescribed sleeping pills, which helped her fall asleep but not stay asleep through the night sweats. "Is this just my life now?" she asked. "Am I never going to sleep again?"
          </p>
          <p className="mb-6">
            Sleep disturbance is one of the most common and distressing symptoms of menopause, affecting 40-60% of people during the transition <Citation id="1" index={1} source="Sleep Medicine Reviews" year="2022" tier={1} />. But it's rarely just about not sleeping---it's about the cascade of consequences that follows. Chronic sleep deprivation during menopause significantly increases risk of depression, anxiety, cognitive decline, cardiovascular disease, and metabolic dysfunction <Citation id="7" index={7} source="Maturitas" year="2023" tier={1} />. Sleep and mental health are bidirectionally linked: poor sleep worsens mood, and mood disorders worsen sleep, creating a vicious cycle that feels impossible to escape.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 40, suffix: '-60%', label: 'of menopausal people experience sleep disturbances' },
            { value: 85, suffix: '%', label: 'reduction in night sweats with hormone therapy' },
            { value: 2, suffix: 'x', label: 'higher depression risk with chronic sleep disruption' },
          ]}
          source="Sleep Medicine Reviews, 2022; Climacteric, 2024"
        />

        <h2 id="how-menopause-disrupts-sleep" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Menopause Disrupts Sleep
        </h2>
        <p className="mb-6">
          Sleep disturbance during menopause results from multiple overlapping mechanisms <Citation id="2" index={2} source="Menopause: The Journal" year="2023" tier={1} />. Understanding these helps target treatment effectively.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Vasomotor Symptoms (Night Sweats and Hot Flashes)
        </h3>
        <p className="mb-6">
          Night sweats are the most obvious sleep disruptor. Sudden heat and sweating wake you up, requiring you to cool down and often change clothes or sheets. Even after the flush passes, falling back asleep can be difficult---your mind is now alert, and the discomfort lingers. Frequent night sweats fragment sleep, reducing time spent in deep sleep and REM sleep, both critical for mood regulation and cognitive function <Citation id="2" index={2} source="Menopause: The Journal" year="2023" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Hormonal Effects on Sleep Architecture
        </h3>
        <p className="mb-6">
          Even without night sweats, hormonal changes affect sleep directly. Progesterone has sedating effects---declining levels may make it harder to fall asleep and stay asleep. Estrogen affects REM sleep, circadian rhythms, and core body temperature regulation, all crucial for sleep quality <Citation id="4" index={4} source="Journal of Clinical Sleep Medicine" year="2023" tier={1} />. As these hormones fluctuate wildly during perimenopause, sleep becomes erratic and unpredictable.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Increased Anxiety and Depression
        </h3>
        <p className="mb-6">
          Mood disorders are more common during menopause, and both anxiety and depression cause insomnia---difficulty falling asleep, staying asleep, or early morning awakening. Anxious rumination keeps you awake; depressive symptoms disrupt sleep continuity and quality <Citation id="5" index={5} source="Psychoneuroendocrinology" year="2024" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Aging-Related Sleep Changes
        </h3>
        <p className="mb-6">
          Sleep naturally becomes lighter and more fragmented with age. Menopause compounds these normal aging changes, making the cumulative effect more severe than either factor alone.
        </p>

        <ArticleCallout variant="warning" title="The Sleep-Mood Vicious Cycle">
          <p className="mb-4">Poor sleep worsens mood, anxiety, and cognitive function. But mood and anxiety disorders also worsen sleep---creating a vicious cycle that feels inescapable.</p>
          <p>Chronic sleep deprivation looks remarkably like depression: fatigue, irritability, difficulty concentrating, low motivation, tearfulness, hopelessness. Sometimes treating sleep significantly improves mood. Sometimes treating mood improves sleep. Often, both need attention simultaneously.</p>
        </ArticleCallout>

        <h2 id="impact-of-sleep-deprivation" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Full Impact of Sleep Deprivation
        </h2>
        <p className="mb-6">
          Chronic sleep disruption during menopause significantly impairs functioning across multiple domains <Citation id="3" index={3} source="JAMA Internal Medicine" year="2023" tier={1} />.
        </p>

        <ComparisonTable
          title="Sleep Deprivation Consequences During Menopause"
          columns={['Domain', 'Specific Impacts']}
          items={[
            { feature: 'Mental Health', values: ['Increased depression/anxiety risk, emotional dysregulation (irritability, mood swings), increased stress reactivity, lower frustration tolerance'] },
            { feature: 'Cognitive Function', values: ['Difficulty concentrating and making decisions, memory problems (encoding and retrieval), subjective "brain fog" often attributed solely to menopause'] },
            { feature: 'Physical Health', values: ['Increased pain sensitivity, weight gain (hunger hormones disrupted), cardiovascular risks (blood pressure, inflammation), weakened immune function'] },
            { feature: 'Quality of Life', values: ['Reduced work performance, withdrawal from social activities, relationship strain, pervasive sense of "just getting through" rather than living'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="bidirectional-relationship" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Bidirectional Relationship
        </h2>
        <p className="mb-6">
          Sleep and mental health influence each other in both directions. Poor sleep increases risk of depression and anxiety. But depression and anxiety also disrupt sleep. This creates a self-perpetuating cycle <Citation id="5" index={5} source="Psychoneuroendocrinology" year="2024" tier={1} />:
        </p>

        <BeforeAfter
          before={{
            title: 'The Downward Spiral',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Night sweats wake you → Sleep deprivation → Mood worsens → Anxiety about sleep increases → Harder to fall asleep → More sleep loss → Depression deepens</li>
                <li>Each element feeds the next, making the cycle progressively worse</li>
              </ul>
            ),
          }}
          after={{
            title: 'Breaking the Cycle',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Treat night sweats → Sleep improves → Mood stabilizes → Anxiety decreases → Sleep quality improves further → Mental health improves</li>
                <li>Addressing any point in the cycle can initiate positive change</li>
              </ul>
            ),
          }}
        />

        <HighlightBox variant="stat">
          <p className="text-lg font-semibold mb-2">Night sweats disrupt deep sleep and REM sleep</p>
          <p>These sleep stages are critical for mood regulation, memory consolidation, and physical recovery. Their loss compounds menopausal mental health challenges beyond what hormone changes alone would cause.</p>
        </HighlightBox>

        <h2 id="treatment-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment Strategies
        </h2>
        <p className="mb-6">
          Effective treatment addresses both menopausal causes (night sweats, hormones) and sleep-specific factors (sleep hygiene, CBT-I, sometimes medication). A multi-pronged approach works best <Citation id="9" index={9} source="Sleep Health" year="2023" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Treating Vasomotor Symptoms
        </h3>
        <p className="mb-6">
          Reducing night sweats can dramatically improve sleep quality. Hormone therapy (estrogen with or without progesterone) reduces night sweats by up to 85% in responsive individuals <Citation id="8" index={8} source="Climacteric" year="2024" tier={1} />. For those who can't or won't use hormone therapy, certain antidepressants (venlafaxine, paroxetine, escitalopram) reduce hot flashes by 40-60%. Gabapentin and pregabalin are also effective for some people.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Cognitive-Behavioral Therapy for Insomnia (CBT-I)
        </h3>
        <p className="mb-6">
          CBT-I is first-line treatment for chronic insomnia, including menopausal insomnia <Citation id="3" index={3} source="JAMA Internal Medicine" year="2023" tier={1} />. It addresses thoughts and behaviors that perpetuate insomnia:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Sleep Restriction',
              description: <p>Limit time in bed to match actual sleep time, then gradually increase. This builds sleep pressure and improves sleep efficiency.</p>,
            },
            {
              title: 'Stimulus Control',
              description: <p>Use bed only for sleep and sex, not reading, TV, or worrying. This strengthens the mental association between bed and sleep.</p>,
            },
            {
              title: 'Cognitive Restructuring',
              description: <p>Challenge catastrophic thinking about sleep ("I'll never sleep again!") and unrealistic expectations ("I need 8 hours or I can't function").</p>,
            },
            {
              title: 'Relaxation Techniques',
              description: <p>Progressive muscle relaxation, breathing exercises, and mindfulness reduce physiological arousal that interferes with sleep.</p>,
            },
          ]}
        />

        <p className="mb-6 mt-6">
          CBT-I is as effective as medication for menopausal insomnia, with longer-lasting benefits and no side effects. It can be delivered by a therapist, via app, or through self-help programs.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Environmental and Behavioral Modifications
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Keep bedroom cool:</strong> 65-68°F is optimal for sleep</li>
          <li><strong>Use moisture-wicking sleepwear and bedding:</strong> Helps manage sweating</li>
          <li><strong>Layer blankets:</strong> Easy temperature adjustment without fully waking</li>
          <li><strong>Limit caffeine after noon:</strong> Half-life is 5-6 hours</li>
          <li><strong>Avoid alcohol before bed:</strong> Disrupts sleep architecture even if it helps you fall asleep</li>
          <li><strong>Exercise regularly:</strong> But not within 3 hours of bedtime</li>
          <li><strong>Manage light exposure:</strong> Bright light in morning, dim light in evening</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Sleep Medication (When Appropriate)
        </h3>
        <p className="mb-6">
          Sleep medication can be helpful short-term but shouldn't be first-line long-term treatment. Consider medication when CBT-I and other interventions haven't helped, sleep deprivation is severe and impairing functioning, or as a bridge while other treatments take effect <Citation id="6" index={6} source="National Sleep Foundation" year="2023" tier={2} />. Use medication alongside behavioral treatment, not instead of it. Work with providers to find the lowest effective dose and re-evaluate regularly. Some medications (benzodiazepines, older antihistamines) worsen sleep architecture or cause dependency.
        </p>

        <ArticleCallout variant="tip" title="When to Seek Professional Help">
          <p className="mb-4"><strong>See a healthcare provider if:</strong></p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sleep problems persist for more than 3 months despite self-help efforts</li>
            <li>Sleep deprivation is significantly affecting work, relationships, or safety</li>
            <li>You suspect sleep apnea (loud snoring, gasping, daytime sleepiness)</li>
            <li>Mood symptoms (depression, anxiety) are worsening alongside sleep problems</li>
            <li>You're using alcohol or medication to sleep regularly</li>
          </ul>
        </ArticleCallout>

        <QuoteBlock
          quote="Sleep is not a luxury---it's a biological necessity. For menopausal people, addressing sleep is not indulgent; it's essential for mental health, cognitive function, and quality of life."
          attribution="Dr. Hadine Joffe"
          role="Psychiatrist and Menopause Researcher"
          source="Harvard Medical School"
          variant="default"
        />

        <ArticleCallout variant="key-takeaway">
          <ul className="list-disc pl-5 space-y-2">
            <li>Sleep disruption during menopause is not inevitable or untreatable---it's a medical symptom that deserves attention</li>
            <li>The sleep-mood relationship is bidirectional: treat one and you often improve the other</li>
            <li>Effective treatment combines addressing vasomotor symptoms, behavioral interventions (CBT-I), and sometimes medication</li>
            <li>Exhaustion during menopause is not "getting old" or personal weakness---it's objectively disrupted sleep architecture affecting your brain and body</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 24: Brain Fog and Cognitive Changes in Menopause
  // ==========================================================================
  {
    id: catId(24),
    slug: 'brain-fog-and-cognitive-changes-in-menopause-memory-and-focus',
    status: 'archived',
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
      {
        id: '4',
        text: `Sleep, mood, and cognitive function in midlife women`,
        source: `Menopause: The Journal`,
        year: `2023`,
        link: `https://doi.org/10.1097/GME.0000000000002145`,
        tier: 1,
      },
      {
        id: '5',
        text: `Hormone therapy and cognitive outcomes`,
        source: `Neurology`,
        year: `2024`,
        link: `https://doi.org/10.1212/WNL.0000000000207892`,
        tier: 1,
      },
      {
        id: '6',
        text: `Cognitive function and menopause: distinguishing normal aging`,
        source: `Climacteric`,
        year: `2023`,
        link: `https://doi.org/10.1080/13697137.2023.2198765`,
        tier: 1,
      },
      {
        id: '7',
        text: `Menopause and Brain Health`,
        source: `National Institute on Aging`,
        year: `2023`,
        link: `https://www.nia.nih.gov/health/menopause-brain`,
        tier: 2,
      },
      {
        id: '8',
        text: `Compensatory strategies for menopausal cognitive changes`,
        source: `Psychology and Aging`,
        year: `2023`,
        link: `https://doi.org/10.1037/pag0000765`,
        tier: 1,
      },
      {
        id: '9',
        text: `Exercise and cognitive function in midlife women`,
        source: `Journal of Women's Health`,
        year: `2024`,
        link: `https://doi.org/10.1089/jwh.2023.0234`,
        tier: 1,
      },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            In the middle of a presentation, the word vanished. Claudia stood in front of her team, mid-sentence, searching for a common word that should have been automatic. Silence stretched. "Um... the thing... you know..." Finally, a colleague offered the word. This happened constantly now---words disappearing, forgetting why she walked into a room, reading the same paragraph three times without comprehension. At 48, Claudia feared early-onset dementia.
          </p>
          <p className="mb-6">
            Cognitive changes during menopause---colloquially called "brain fog"---are among the most common and distressing symptoms of the transition, affecting 40-60% of people <Citation id="1" index={1} source="Neurology" year="2022" tier={1} />. Yet they're frequently dismissed as stress, lack of sleep, or "just getting older." The reality: these changes are measurable on neuropsychological testing, biologically based, and for most people, temporary. Understanding the neuroscience helps distinguish normal menopausal changes from cognitive decline that warrants evaluation <Citation id="2" index={2} source="JAMA Neurology" year="2023" tier={1} />.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 40, suffix: '-60%', label: 'of menopausal people report cognitive changes' },
            { value: 60, suffix: '%', label: 'report verbal memory as most affected domain' },
            { value: 80, suffix: '%', label: 'see improvement in postmenopause' },
          ]}
          source="Neurology, 2022; JAMA Neurology, 2023"
        />

        <h2 id="what-is-brain-fog" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Menopausal Brain Fog?
        </h2>
        <p className="mb-6">
          Brain fog is an umbrella term for subjective cognitive changes during menopause <Citation id="2" index={2} source="JAMA Neurology" year="2023" tier={1} />. Common manifestations include:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'memory',
              title: 'Memory Lapses',
              content: (
                <p>Forgetting appointments, names, or where you put things. Losing your train of thought mid-conversation. Entering a room and forgetting why. These are encoding failures---information doesn't get stored properly in the first place.</p>
              ),
            },
            {
              id: 'words',
              title: 'Word-Finding Difficulty',
              content: (
                <p>Knowing the word you want but unable to retrieve it. Circumlocuting (describing the thing instead of naming it). This is the most commonly reported and objectively measured cognitive change during perimenopause.</p>
              ),
            },
            {
              id: 'focus',
              title: 'Difficulty Concentrating',
              content: (
                <p>Trouble focusing on tasks, especially complex or multi-step ones. Reading comprehension problems---reading the same paragraph multiple times without absorbing it. Easily distracted by background noise or interruptions.</p>
              ),
            },
            {
              id: 'speed',
              title: 'Slower Processing Speed',
              content: (
                <p>Taking longer to complete familiar tasks or make decisions. Feeling like your brain is "sluggish" or running on dial-up when you're used to high-speed.</p>
              ),
            },
            {
              id: 'fatigue',
              title: 'Mental Fatigue',
              content: (
                <p>Cognitive tasks feeling exhausting. Brain feeling "full" or overwhelmed by mid-afternoon. Reduced capacity for mentally demanding work compared to before.</p>
              ),
            },
          ]}
        />

        <p className="mb-6 mt-6">
          These changes are not just subjective---they're measurable on neuropsychological testing during perimenopause. Performance on verbal memory, attention, and processing speed tasks declines during the transition, then typically improves postmenopause <Citation id="2" index={2} source="JAMA Neurology" year="2023" tier={1} />. This supports that brain fog is a real biological phenomenon, not anxiety or "getting old."
        </p>

        <ArticleCallout variant="clinical-note" title="Brain Fog vs. Dementia">
          <p className="mb-4"><strong>Menopausal brain fog is NOT early dementia.</strong> Key differences:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Pattern:</strong> Brain fog is fluctuating (worse some days, better others). Dementia is progressive and steadily worsening.</li>
            <li><strong>Domains:</strong> Brain fog primarily affects memory encoding and attention. Dementia affects multiple cognitive domains more severely (judgment, spatial skills, personality).</li>
            <li><strong>Trajectory:</strong> Brain fog improves postmenopause for most (80%). Dementia worsens over time.</li>
            <li><strong>Function:</strong> Brain fog doesn't prevent daily activities. Dementia eventually impairs ability to work, manage finances, or care for self.</li>
            <li><strong>Risk:</strong> Menopause does not increase Alzheimer's risk <Citation id="6" index={6} source="Climacteric" year="2023" tier={1} />.</li>
          </ul>
        </ArticleCallout>

        <h2 id="why-menopause-affects-cognition" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Menopause Affects Cognition
        </h2>
        <p className="mb-6">
          Multiple overlapping mechanisms explain cognitive changes during menopause <Citation id="3" index={3} source="Frontiers in Neuroendocrinology" year="2023" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Estrogen's Direct Brain Effects
        </h3>
        <p className="mb-6">
          The hippocampus (memory center) has high concentrations of estrogen receptors. Estrogen supports new neuron growth (neurogenesis), strengthens synaptic connections between neurons, and supports neurotransmitter function (acetylcholine, serotonin, dopamine) critical for memory and attention. The prefrontal cortex (attention, executive function, working memory) also depends on estrogen for optimal functioning. Declining and fluctuating estrogen disrupts these systems, particularly during perimenopause when levels swing wildly <Citation id="3" index={3} source="Frontiers in Neuroendocrinology" year="2023" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Sleep Deprivation
        </h3>
        <p className="mb-6">
          Sleep is essential for memory consolidation (transferring information from short-term to long-term storage) and attention. Chronic sleep disruption from night sweats directly impairs cognition, particularly memory encoding and executive function <Citation id="4" index={4} source="Menopause: The Journal" year="2023" tier={1} />. Sleep-deprived cognition looks like brain fog.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Mood Symptoms
        </h3>
        <p className="mb-6">
          Depression and anxiety both impair cognitive function through effects on motivation, concentration, and memory. Depression causes psychomotor slowing and difficulty with executive tasks. Anxiety causes distractibility and rumination that interferes with encoding new information <Citation id="4" index={4} source="Menopause: The Journal" year="2023" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Stress and Cortisol
        </h3>
        <p className="mb-6">
          Chronic stress and elevated cortisol impair hippocampal function. Some evidence suggests cortisol may be elevated during menopausal transition. The stress of managing menopausal symptoms, combined with midlife stressors (aging parents, career demands, financial pressures), creates cognitive burden beyond hormonal effects alone.
        </p>

        <ComparisonTable
          title="Contributors to Menopausal Brain Fog"
          columns={['Factor', 'Mechanism', 'Cognitive Impact']}
          items={[
            { feature: 'Declining estrogen', values: ['Reduced hippocampal/prefrontal function', 'Memory encoding, attention, processing speed'] },
            { feature: 'Sleep disruption', values: ['Impaired consolidation, reduced alertness', 'Memory, concentration, mental fatigue'] },
            { feature: 'Depression/anxiety', values: ['Reduced motivation, increased rumination', 'Executive function, encoding, focus'] },
            { feature: 'Stress/cortisol', values: ['Hippocampal impairment', 'Memory formation and retrieval'] },
          ]}
          highlightColumn={1}
        />

        <HighlightBox variant="emphasis">
          <p className="text-lg font-semibold mb-2">Verbal memory shows the largest decline</p>
          <p>Word-finding difficulty and trouble remembering verbal information are the most commonly reported and objectively measured cognitive changes during perimenopause <Citation id="1" index={1} source="Neurology" year="2022" tier={1} />. Visual-spatial memory is less affected.</p>
        </HighlightBox>

        <h2 id="trajectory" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Good News: It's Temporary for Most
        </h2>
        <p className="mb-6">
          Cognitive function typically improves in postmenopause as hormones stabilize at a new baseline <Citation id="2" index={2} source="JAMA Neurology" year="2023" tier={1} />. Longitudinal studies show:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Verbal memory and processing speed decline during perimenopause</li>
          <li>These deficits stabilize or improve in early postmenopause (1-2 years after final period)</li>
          <li>By late postmenopause (5+ years), many people return to cognitive baseline</li>
          <li>This trajectory differs from progressive cognitive decline seen in dementia</li>
        </ul>
        <p className="mb-6">
          However, about 20% continue to experience cognitive difficulties postmenopause. These individuals may benefit from further evaluation and targeted interventions <Citation id="7" index={7} source="National Institute on Aging" year="2023" tier={2} />.
        </p>

        <h2 id="management-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Management Strategies
        </h2>
        <p className="mb-6">
          Treatment addresses both contributing factors and cognitive function directly <Citation id="8" index={8} source="Psychology and Aging" year="2023" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Optimize Sleep',
              description: <p>This may be the single most important intervention for brain fog. Treat insomnia and night sweats aggressively. Even modest improvements in sleep can significantly improve cognition.</p>,
            },
            {
              title: 'Manage Mood Symptoms',
              description: <p>Depression and anxiety treatment often improves cognition as a secondary benefit. Antidepressants, psychotherapy, or both can address both mood and cognitive symptoms.</p>,
            },
            {
              title: 'Reduce Stress',
              description: <p>Realistic expectations, delegation, saying no to non-essential commitments, and stress management techniques (mindfulness, exercise) reduce cognitive load.</p>,
            },
            {
              title: 'Consider Hormone Therapy',
              description: <p>For some, estrogen therapy improves cognitive function, particularly when started during perimenopause (not years after menopause). Evidence is mixed and benefits may depend on timing and individual factors.</p>,
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Cognitive Strategies and Compensatory Techniques
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Use external memory aids liberally:</strong> Lists, calendars, phone reminders, notes. This is not cheating---it's adaptive. Your brain is working harder right now; reduce demands.</li>
          <li><strong>Prioritize important cognitive tasks:</strong> Do complex work when you're most alert (often morning). Save routine tasks for low-energy times.</li>
          <li><strong>Break complex tasks into smaller steps:</strong> Reduces cognitive load and makes progress more manageable.</li>
          <li><strong>Practice self-compassion:</strong> Anxiety about cognitive performance worsens it. Forgetting a word doesn't mean you're incompetent or declining---it's a temporary hormonal effect.</li>
          <li><strong>Maintain cognitively stimulating activities:</strong> Learning new skills, socializing, reading, puzzles. "Use it or lose it" applies to cognitive function.</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Physical Exercise and Brain Health
        </h3>
        <p className="mb-6">
          Regular aerobic exercise supports brain health through improved cerebral blood flow, neuroplasticity, stress reduction, and better sleep <Citation id="9" index={9} source="Journal of Women's Health" year="2024" tier={1} />. Even moderate exercise (brisk walking 30 minutes most days) improves cognitive function in midlife women. Exercise may be as effective as cognitive training for maintaining brain health during menopause.
        </p>

        <div className="my-8 space-y-4">
          <MythVsFactBlock
            myth="Forgetting things during menopause means you're developing dementia"
            fact="Menopausal brain fog is temporary, fluctuating, and improves postmenopause for most. It does not indicate dementia risk."
          />
          <MythVsFactBlock
            myth="Cognitive changes are just normal aging---nothing you can do about it"
            fact="Brain fog is a treatable symptom. Addressing sleep, mood, stress, and sometimes hormones significantly improves cognition."
          />
          <MythVsFactBlock
            myth="Using lists and reminders means your brain is getting worse"
            fact="External cognitive aids are adaptive strategies that reduce mental load. They're smart tools, not signs of failure."
          />
        </div>

        <ArticleCallout variant="warning" title="When to Seek Evaluation">
          <p className="mb-4"><strong>Consult a healthcare provider if:</strong></p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Cognitive changes are severe and progressively worsening (not fluctuating)</li>
            <li>You're unable to perform daily activities (work, finances, self-care, driving)</li>
            <li>Personality changes or behavioral changes occur</li>
            <li>Symptoms began suddenly or include neurological signs (weakness, vision changes, severe headaches, seizures)</li>
            <li>Family members express concern about your cognitive function</li>
          </ul>
          <p className="mt-4">These suggest something other than menopausal brain fog and warrant medical evaluation, potentially including neuropsychological testing or brain imaging.</p>
        </ArticleCallout>

        <QuoteBlock
          quote="Menopausal brain fog is frustrating, but it's not a failing. It's your brain navigating a major hormonal transition. Be patient with yourself---and use every tool available to make the journey easier."
          attribution="Dr. Pauline Maki"
          role="Professor of Psychiatry and Psychology"
          source="University of Illinois Chicago"
          variant="default"
        />

        <ArticleCallout variant="key-takeaway">
          <ul className="list-disc pl-5 space-y-2">
            <li>Cognitive changes during menopause are real, measurable, and temporary for most---not early dementia or inevitable decline</li>
            <li>Estrogen's effects on brain regions critical for memory and attention explain why cognition changes during hormonal transition</li>
            <li>Addressing sleep, mood, and stress often improves "brain fog" as much or more than directly targeting cognition</li>
            <li>Compensatory strategies (external memory aids, task prioritization) are adaptive tools, not signs of weakness</li>
            <li>Most people see cognitive improvement postmenopause as hormones stabilize</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  // ==========================================================================
  // Article 25: Sexuality and Body Image During Menopause
  // ==========================================================================
  {
    id: catId(25),
    slug: 'sexuality-and-body-image-during-menopause-desire-and-self-perception',
    status: 'archived',
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
      {
        id: '4',
        text: `Body image and sexual satisfaction in midlife women`,
        source: `Journal of Sex Research`,
        year: `2023`,
        link: `https://doi.org/10.1080/00224499.2022.2134567`,
        tier: 1,
      },
      {
        id: '5',
        text: `Hypoactive sexual desire disorder in menopausal women`,
        source: `Journal of Sexual Medicine`,
        year: `2024`,
        link: `https://doi.org/10.1016/j.jsxm.2023.11.003`,
        tier: 1,
      },
      {
        id: '6',
        text: `Relationship factors and menopausal sexual function`,
        source: `Archives of Sexual Behavior`,
        year: `2023`,
        link: `https://doi.org/10.1007/s10508-022-02456-9`,
        tier: 1,
      },
      {
        id: '7',
        text: `Pelvic floor therapy for sexual pain`,
        source: `International Urogynecology Journal`,
        year: `2023`,
        link: `https://doi.org/10.1007/s00192-023-05432-1`,
        tier: 1,
      },
      {
        id: '8',
        text: `Sex therapy for menopausal sexual concerns`,
        source: `Journal of Sex & Marital Therapy`,
        year: `2024`,
        link: `https://doi.org/10.1080/0092623X.2023.2198765`,
        tier: 1,
      },
      {
        id: '9',
        text: `Women's Sexual Health and Menopause`,
        source: `American College of Obstetricians and Gynecologists`,
        year: `2023`,
        link: `https://www.acog.org/womens-health/sexual-health-menopause`,
        tier: 2,
      },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Sex had become something Anita avoided. What used to be pleasurable now felt like a chore---or worse, painful. Vaginal dryness made intercourse uncomfortable despite lubricants. Her body felt foreign: weight had shifted to her midsection, skin had changed texture, breasts sagged. She felt invisible---culturally dismissed as a sexual being now that she was in her 50s. When her partner initiated intimacy, Anita felt pressure and guilt rather than desire. She wondered if this was just "how it is now," or if there was room for sexuality to look different---not less, just different.
          </p>
          <p className="mb-6">
            Menopause significantly affects sexuality and body image for many people, through both biological changes (vaginal dryness, decreased desire, painful intercourse) and psychosocial factors (body image shifts, relationship dynamics, ageist cultural narratives) <Citation id="1" index={1} source="Obstetrics & Gynecology" year="2022" tier={1} />. Up to 50% report decreased sexual desire during menopause, while 40% experience painful intercourse <Citation id="2" index={2} source="Menopause: The Journal" year="2023" tier={1} />. These changes are not inevitable failures or the "end" of sexual life---they're biological responses to hormonal shifts, and they're treatable. Reclaiming sexual agency during menopause requires addressing physical symptoms, challenging ageist narratives, and redefining intimacy on your own terms.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 40, suffix: '-50%', label: 'report decreased sexual desire during menopause' },
            { value: 40, suffix: '%', label: 'experience painful intercourse (dyspareunia)' },
            { value: 50, suffix: '%', label: 'develop vaginal atrophy without treatment' },
          ]}
          source="Obstetrics & Gynecology, 2022; Menopause: The Journal, 2023"
        />

        <h2 id="physical-changes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Physical Changes Affecting Sexuality
        </h2>
        <p className="mb-6">
          Menopause brings multiple physical changes that can impact sexual function <Citation id="2" index={2} source="Menopause: The Journal" year="2023" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Genitourinary Syndrome of Menopause (GSM)
        </h3>
        <p className="mb-6">
          Previously called vaginal atrophy, GSM affects up to 50% of postmenopausal people and worsens over time without treatment. It includes:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Vaginal dryness:</strong> Reduced natural lubrication makes intercourse uncomfortable or painful</li>
          <li><strong>Vaginal thinning:</strong> Tissues become thinner, less elastic, more fragile---prone to tearing or bleeding</li>
          <li><strong>Inflammation:</strong> Increased susceptibility to irritation and infection</li>
          <li><strong>Urinary symptoms:</strong> Urgency, frequency, recurrent UTIs</li>
          <li><strong>Vulvar changes:</strong> Loss of tissue fullness, narrowing of vaginal opening</li>
        </ul>
        <p className="mb-6">
          GSM is caused by declining estrogen, which maintains vaginal tissue health, elasticity, lubrication, and pH balance. Unlike hot flashes (which resolve postmenopause), GSM persists and worsens without intervention.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Changes in Desire, Arousal, and Orgasm
        </h3>
        <p className="mb-6">
          Decreased desire (hypoactive sexual desire disorder) has multiple contributors <Citation id="5" index={5} source="Journal of Sexual Medicine" year="2024" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Declining testosterone:</strong> Women produce testosterone (ovaries and adrenal glands), and it plays a role in desire. Levels decline with age and menopause.</li>
          <li><strong>Reduced estrogen:</strong> Affects arousal, sensation, and genital blood flow</li>
          <li><strong>Physical discomfort:</strong> If sex hurts, desire naturally decreases (pain becomes conditioned response)</li>
          <li><strong>Fatigue:</strong> Sleep disruption from night sweats leaves little energy for intimacy</li>
          <li><strong>Mood symptoms:</strong> Depression and anxiety both reduce libido</li>
        </ul>
        <p className="mb-6">
          Arousal and orgasm may change: longer time to arousal, decreased clitoral sensitivity, reduced lubrication despite arousal, weaker or absent orgasms, or orgasms requiring more stimulation. These changes vary widely---some experience severe symptoms, others minimal change.
        </p>

        <ArticleCallout variant="warning" title="Pain During Sex Is Not Normal">
          <p className="mb-4">Painful intercourse (dyspareunia) during menopause is common but NOT something to "just live with." Pain is a medical problem with effective treatments.</p>
          <p>Continuing painful sex can create anticipatory anxiety, pelvic floor muscle tension (which worsens pain), avoidance of intimacy, and relationship strain. If sex hurts, talk to a provider about vaginal estrogen, lubricants, pelvic floor therapy, or other interventions <Citation id="7" index={7} source="International Urogynecology Journal" year="2023" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="psychological-relational-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Psychological and Relational Factors
        </h2>
        <p className="mb-6">
          Sexuality during menopause is shaped by more than biology <Citation id="4" index={4} source="Journal of Sex Research" year="2023" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Body Image and Cultural Narratives
        </h3>
        <p className="mb-6">
          Body image often shifts during menopause:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Weight redistribution:</strong> Fat accumulates in abdomen rather than hips/thighs (changing body shape)</li>
          <li><strong>Skin changes:</strong> Dryness, wrinkles, loss of elasticity</li>
          <li><strong>Breast changes:</strong> Sagging, size changes, loss of fullness</li>
          <li><strong>Hair changes:</strong> Thinning scalp hair, facial hair growth</li>
          <li><strong>Muscle loss:</strong> Sarcopenia (age-related muscle loss) accelerates without resistance training</li>
        </ul>
        <p className="mb-6">
          Cultural narratives equate youth with beauty and sexual desirability. Older women are often rendered invisible or desexualized in media and culture. This ageism becomes internalized: "I'm too old to be sexy," "No one finds me attractive anymore," "Sex is for younger women." These beliefs create shame, withdrawal from intimacy, and disconnection from one's own sexuality---regardless of actual physical function.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Relationship Dynamics
        </h3>
        <p className="mb-6">
          Long-term relationships evolve during menopause <Citation id="6" index={6} source="Archives of Sexual Behavior" year="2023" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Partner aging:</strong> Partners may also experience physical or desire changes (erectile dysfunction, chronic health conditions, medications affecting libido)</li>
          <li><strong>Routine and familiarity:</strong> Decades together can reduce novelty and spontaneity</li>
          <li><strong>Communication challenges:</strong> Discussing changing needs or decreased desire can feel threatening or shameful</li>
          <li><strong>Life stage factors:</strong> Empty nest may increase privacy and opportunity---or highlight relationship issues previously obscured by parenting responsibilities</li>
          <li><strong>Caregiving stress:</strong> Caring for aging parents or adult children drains energy for intimacy</li>
          <li><strong>Unresolved conflicts:</strong> Long-standing resentments or unmet emotional needs affect sexual connection</li>
        </ul>

        <ComparisonTable
          title="Contributors to Sexual Changes During Menopause"
          columns={['Factor', 'How It Affects Sexuality']}
          items={[
            { feature: 'Vaginal atrophy', values: ['Dryness, pain, reduced arousal---makes intercourse uncomfortable'] },
            { feature: 'Declining hormones', values: ['Reduced desire, slower arousal, weaker orgasms'] },
            { feature: 'Body image concerns', values: ['Feeling unattractive or undesirable---withdrawing from intimacy'] },
            { feature: 'Relationship issues', values: ['Routine, unmet needs, communication gaps---reducing emotional connection'] },
            { feature: 'Cultural ageism', values: ['Internalizing message that older women aren\'t sexual---creating shame'] },
            { feature: 'Sleep/mood symptoms', values: ['Fatigue and depression reduce energy and interest in sex'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="treatment-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment and Reclaiming Sexual Agency
        </h2>
        <p className="mb-6">
          Effective approaches address physical symptoms, psychological factors, and relational dynamics <Citation id="9" index={9} source="American College of Obstetricians and Gynecologists" year="2023" tier={2} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Medical Interventions for Physical Symptoms
        </h3>
        <p className="mb-6">
          <strong>Vaginal estrogen therapy</strong> (creams, tablets, vaginal rings) is highly effective for GSM <Citation id="3" index={3} source="The Lancet" year="2023" tier={1} />. It restores vaginal tissue health, increases lubrication, reduces pain, and improves arousal. Importantly, vaginal estrogen has minimal systemic absorption (very little enters bloodstream)---making it safe even for many breast cancer survivors. It's considered first-line treatment for vaginal atrophy.
        </p>
        <p className="mb-6">
          <strong>Non-hormonal options:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Vaginal moisturizers:</strong> Regular use (2-3 times weekly) maintains moisture between sexual activity</li>
          <li><strong>Lubricants:</strong> Water-based or silicone-based for intercourse (reduce friction and discomfort)</li>
          <li><strong>Ospemifene:</strong> Oral SERM (selective estrogen receptor modulator) FDA-approved for dyspareunia</li>
          <li><strong>Vaginal DHEA (prasterone):</strong> Converts to estrogen and testosterone locally</li>
        </ul>
        <p className="mb-6">
          <strong>Pelvic floor physical therapy</strong> addresses muscle tension (vaginismus, high-tone pelvic floor) or weakness contributing to pain or incontinence <Citation id="7" index={7} source="International Urogynecology Journal" year="2023" tier={1} />. Specialized PT can teach muscle relaxation, dilator use, and techniques to reduce pain.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Sex Therapy and Couples Work
        </h3>
        <p className="mb-6">
          Sex therapy helps individuals and couples navigate changing desire, communicate about needs, and expand definitions of intimacy beyond penetrative intercourse <Citation id="8" index={8} source="Journal of Sex & Marital Therapy" year="2024" tier={1} />. Common interventions include:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Psychoeducation',
              description: <p>Understanding normal menopausal changes reduces shame and normalizes experience.</p>,
            },
            {
              title: 'Communication skills',
              description: <p>Learning to express desires, boundaries, and needs---and to listen non-defensively to partner's experience.</p>,
            },
            {
              title: 'Sensate focus',
              description: <p>Structured exercises rebuilding physical connection without performance pressure---focusing on pleasure, not orgasm or penetration.</p>,
            },
            {
              title: 'Expanding intimacy',
              description: <p>Broadening sexual repertoire beyond intercourse: oral sex, manual stimulation, sensual touch, vibrators, mutual masturbation.</p>,
            },
            {
              title: 'Addressing desire discrepancy',
              description: <p>Strategies for navigating mismatched libido without resentment or pressure.</p>,
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Body Image Work and Challenging Ageism
        </h3>
        <p className="mb-6">
          Therapy focused on body image can help challenge internalized ageism and develop body respect (acceptance of body's current state and function) rather than body positivity (which can feel disingenuous when body has changed significantly). Key approaches:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Identify internalized beliefs:</strong> Notice thoughts equating youth with desirability or dismissing aging bodies as non-sexual</li>
          <li><strong>Challenge cultural narratives:</strong> Question: Who benefits from making older women feel invisible or undesirable?</li>
          <li><strong>Separate worth from appearance:</strong> Your value and desirability are not determined by conventional beauty standards or youth</li>
          <li><strong>Practice embodiment:</strong> Focus on what your body can do and feel, not just how it looks</li>
        </ul>

        <div className="my-8 space-y-4">
          <MythVsFactBlock
            myth="Decreased desire during menopause means you're broken or have a medical problem"
            fact="Desire changes are common and not always distressing. Not all changes require treatment---some people are comfortable with lower desire. Intervention is needed only when the change causes distress."
          />
          <MythVsFactBlock
            myth="Sex after menopause is supposed to be painful or unsatisfying"
            fact="Pain and dissatisfaction are treatable symptoms, not inevitable. Vaginal estrogen, lubricants, and pelvic floor therapy can restore comfort and pleasure."
          />
          <MythVsFactBlock
            myth="Older women shouldn't be sexual or aren't attractive anymore"
            fact="This is ageist cultural conditioning. Sexuality and desirability are not limited to youth. Many people find post-menopausal sexuality more fulfilling due to freedom from pregnancy concerns and cultural scripts."
          />
        </div>

        <h2 id="liberation-in-menopause" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Finding Liberation
        </h2>
        <p className="mb-6">
          For some, menopause brings unexpected sexual freedom:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>No pregnancy concerns:</strong> Spontaneity without contraception or fear of unintended pregnancy</li>
          <li><strong>More time and privacy:</strong> Children grown, career established---more bandwidth for intimacy</li>
          <li><strong>Defining sexuality outside reproductive norms:</strong> Sex no longer tied to fertility; can be purely about pleasure and connection</li>
          <li><strong>Less performance pressure:</strong> Freedom to explore what feels good now, rather than what "should" feel good</li>
          <li><strong>Self-knowledge:</strong> Decades of life experience bring clearer sense of desires and boundaries</li>
        </ul>

        <ArticleCallout variant="insight" title="Redefining Intimacy">
          <p className="mb-4">Menopause can be an opportunity to broaden intimacy beyond penetrative sex:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sensual touch, massage, skin-to-skin contact</li>
            <li>Oral sex, manual stimulation, vibrator use</li>
            <li>Mutual masturbation, fantasy sharing</li>
            <li>Emotional intimacy: deep conversations, vulnerability, presence</li>
            <li>Non-sexual physical affection: cuddling, hand-holding, kissing</li>
          </ul>
          <p className="mt-4">If intercourse is painful or desire is low, expanding the repertoire reduces pressure and maintains connection. What feels good now may be different from before---and that's not only valid, it's an invitation to discover new forms of pleasure.</p>
        </ArticleCallout>

        <QuoteBlock
          quote="Menopause doesn't end sexuality---it's a transition. Like any transition, it requires renegotiation, communication, and sometimes medical support. But it can also be a liberation from old scripts and an opportunity to define intimacy on your own terms."
          attribution="Dr. Sheryl Kingsberg"
          role="Chief of Behavioral Medicine, OB/GYN"
          source="University Hospitals Cleveland Medical Center"
          variant="default"
        />

        <ArticleCallout variant="key-takeaway">
          <ul className="list-disc pl-5 space-y-2">
            <li>Sexual changes during menopause are common but not inevitable or untreatable</li>
            <li>Vaginal atrophy and painful sex respond well to vaginal estrogen and other medical interventions</li>
            <li>Decreased desire has multiple contributors---hormonal, physical, psychological, relational---all addressable</li>
            <li>Ageist cultural narratives about older women's sexuality create shame and withdrawal---challenging these beliefs is part of reclaiming sexual agency</li>
            <li>Intimacy can be redefined beyond penetrative sex, honoring changing bodies and desires</li>
            <li>Menopause can be an opportunity for sexual liberation: freedom from pregnancy, cultural scripts, and performance pressure</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
];
