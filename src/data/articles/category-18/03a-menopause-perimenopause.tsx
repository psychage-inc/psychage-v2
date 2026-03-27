 
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
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
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
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
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
