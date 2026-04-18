
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_MENTAL_HEALTH_CONDITIONS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  QuoteBlock,
  ProgressSteps,
} from '../../../components/article/blocks';

export const additionalConditionsArticles: Article[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // Article 26 — Bipolar I Disorder
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: catId(26),
    slug: 'bipolar-i-disorder-manic-depressive-episodes',
    status: 'published',
    title: 'Bipolar I Disorder: Understanding Manic and Depressive Episodes',
    description: 'A comprehensive guide to Bipolar I Disorder — the dramatic mood swings between mania and depression, their neurobiological basis, and the evidence-based treatments that help people achieve stability.',
    image: '/images/articles/cat13/cover-026.svg',
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 14,
    publishedAt: '2026-04-01',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Bipolar I Disorder', 'Mania', 'Mood Disorders', 'Lithium', 'Mood Stabilizers'],
    summary: 'Bipolar I Disorder affects approximately 2.8% of adults in the United States, characterized by full manic episodes that can last a week or longer and depressive episodes that may persist for weeks to months. This guide explores the neurobiology of mood cycling, the role of genetics and brain structure, and the evidence-based treatments — including lithium, mood stabilizers, and psychoeducation — that help people living with bipolar I build lasting stability and reclaim their lives.',
    keyFacts: [
      { text: 'Bipolar I Disorder affects approximately 2.8% of U.S. adults, with equal prevalence across genders', citationIndex: 1 },
      { text: 'Manic episodes must last at least seven days or be severe enough to require hospitalization for a Bipolar I diagnosis', citationIndex: 3 },
      { text: 'Lithium remains the gold-standard mood stabilizer, reducing suicide risk by up to 60% in people with bipolar disorder', citationIndex: 6 },
      { text: 'Heritability of Bipolar I Disorder is estimated at 70-80%, one of the highest among psychiatric conditions', citationIndex: 4 },
      { text: 'Psychoeducation combined with medication improves relapse prevention by 40-60% compared to medication alone', citationIndex: 8 },
    ],
    sparkMoment: 'Bipolar I Disorder is not a personality flaw or a failure of willpower — it is a neurobiological condition rooted in how the brain regulates mood, energy, and sleep. With the right treatment, stability is not just possible but expected.',
    practicalExercise: {
      title: 'The Daily Mood and Sleep Tracker',
      steps: [
        { title: 'Rate Your Mood Each Morning and Evening', description: 'Use a 1-10 scale where 1 is deeply depressed, 5 is stable, and 10 is euphoric or agitated. Record the number at the same times daily.' },
        { title: 'Track Sleep Duration and Quality', description: 'Note what time you went to bed, when you woke up, and how rested you feel. Decreased need for sleep is often the earliest sign of an emerging manic episode.' },
        { title: 'Log Energy and Activity Levels', description: 'Record whether your energy feels low, normal, or unusually high. Note any impulsive decisions, increased spending, or goal-directed activity.' },
        { title: 'Share Patterns with Your Treatment Team', description: 'Bring your weekly log to appointments so your clinician can identify early warning signs and adjust treatment before episodes fully develop.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Start Tracking Your Mood',
    },
    citations: [
      {
        id: '1',
        text: 'Prevalence and Correlates of Bipolar Spectrum Disorder in the World Mental Health Survey Initiative',
        source: 'Archives of General Psychiatry',
        year: '2011',
        link: 'https://doi.org/10.1001/archgenpsychiatry.2011.12',
        tier: 1,
      },
      {
        id: '2',
        text: 'Bipolar Disorder',
        source: 'National Institute of Mental Health',
        year: '2023',
        link: 'https://www.nimh.nih.gov/health/topics/bipolar-disorder',
        tier: 2,
      },
      {
        id: '3',
        text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.books.9780890425787',
        tier: 4,
      },
      {
        id: '4',
        text: 'The Genetics of Bipolar Disorder',
        source: 'Molecular Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1038/s41380-019-0397-7',
        tier: 1,
      },
      {
        id: '5',
        text: 'Neurobiology of Bipolar Disorder: A Review of Genetic and Neuroimaging Findings',
        source: 'Journal of Affective Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jad.2020.03.016',
        tier: 1,
      },
      {
        id: '6',
        text: 'Lithium in the Prevention of Suicide in Mood Disorders: Updated Systematic Review and Meta-Analysis',
        source: 'BMJ',
        year: '2013',
        link: 'https://doi.org/10.1136/bmj.f3646',
        tier: 1,
      },
      {
        id: '7',
        text: 'Comparative Efficacy and Tolerability of Pharmacological Treatments for Acute Mania: A Network Meta-Analysis',
        source: 'The Lancet',
        year: '2019',
        link: 'https://doi.org/10.1016/S0140-6736(19)31135-X',
        tier: 1,
      },
      {
        id: '8',
        text: 'Psychoeducation for Bipolar Disorder: A Systematic Review of Randomized Controlled Trials',
        source: 'Journal of Clinical Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.4088/JCP.20r13835',
        tier: 1,
      },
      {
        id: '9',
        text: 'Functional Impairment in Bipolar Disorder: An Overview of Systematic Reviews',
        source: 'Acta Psychiatrica Scandinavica',
        year: '2020',
        link: 'https://doi.org/10.1111/acps.13150',
        tier: 1,
      },
      {
        id: '10',
        text: 'Canadian Network for Mood and Anxiety Treatments (CANMAT) and International Society for Bipolar Disorders (ISBD) Guidelines for Management of Patients with Bipolar Disorder',
        source: 'Bipolar Disorders',
        year: '2018',
        link: 'https://doi.org/10.1111/bdi.12609',
        tier: 4,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            One week you are on top of the world — bursting with energy, sleeping only a few hours, launching ambitious projects, and feeling invincible. The next, you can barely get out of bed, weighed down by a sadness so heavy it feels physical. This is not normal fluctuation in mood. This is Bipolar I Disorder, a condition that takes the brain's mood thermostat and breaks the dial.
          </p>
          <p className="mb-6">
            Bipolar I Disorder affects approximately 2.8 percent of adults in the United States <Citation id="1" index={1} source="Archives of General Psychiatry" year="2011" tier={1} />. It is defined by the occurrence of at least one full manic episode — a period of abnormally elevated, expansive, or irritable mood accompanied by increased energy or activity lasting at least seven days <Citation id="3" index={2} source="DSM-5-TR" year="2022" tier={4} />.
          </p>
          <p className="mb-6">
            Despite its challenges, Bipolar I Disorder is one of the most treatable conditions in psychiatry. With proper diagnosis, medication, and psychoeducation, most people living with this condition can achieve lasting stability <Citation id="2" index={3} source="NIMH" year="2023" tier={2} />.
          </p>
        </div>

        <h2 id="overview" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Bipolar I Disorder?
        </h2>
        <p className="mb-6">
          Bipolar I Disorder is a chronic mood disorder characterized by episodes of mania and, in most cases, episodes of major depression. The defining feature is the manic episode — a distinct period of abnormally and persistently elevated, expansive, or irritable mood that lasts at least seven days (or any duration if hospitalization is required) <Citation id="3" index={4} source="DSM-5-TR" year="2022" tier={4} />.
        </p>
        <p className="mb-6">
          Unlike everyday mood changes, manic episodes represent a dramatic departure from a person's baseline functioning. During mania, people may feel extraordinarily confident, need very little sleep, talk rapidly, take on multiple projects simultaneously, and engage in risky behaviors without recognizing the consequences.
        </p>
        <p className="mb-6">
          While depressive episodes are common in Bipolar I Disorder and cause significant suffering, they are not required for diagnosis. The presence of at least one manic episode is sufficient, even if depressive episodes have never occurred. However, the vast majority of people with Bipolar I will experience both poles of the illness over the course of their lives.
        </p>

        <StatCard
          stats={[
            { value: 2.8, suffix: '%', label: 'U.S. adults affected by bipolar I' },
            { value: 25, suffix: ' yrs', label: 'Average age of onset' },
            { value: 70, suffix: '%', label: 'Heritability estimate' },
          ]}
          source="Archives of General Psychiatry, 2011; Molecular Psychiatry, 2019"
        />

        <h2 id="manic-episodes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding Manic Episodes
        </h2>
        <p className="mb-6">
          A manic episode is not simply being in a good mood. It is a clinically significant change in functioning that is observable by others and causes impairment or requires hospitalization. The DSM-5-TR requires the elevated or irritable mood to be accompanied by at least three additional symptoms (four if the mood is only irritable) <Citation id="3" index={5} source="DSM-5-TR" year="2022" tier={4} />.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'grandiosity',
              title: 'Grandiosity and Inflated Self-Esteem',
              content: (
                <div>
                  <p className="mb-4">
                    During mania, a person may believe they have special powers, unique talents, or an important mission. This goes beyond normal confidence — it can include delusional beliefs, such as believing one has a direct connection to a historical figure or has been chosen for a special purpose.
                  </p>
                  <p>Grandiosity can lead to risky decisions, such as investing life savings in an impulsive business venture or making commitments that cannot be kept.</p>
                </div>
              ),
            },
            {
              id: 'sleep',
              title: 'Decreased Need for Sleep',
              content: (
                <div>
                  <p className="mb-4">
                    One of the earliest and most reliable signs of an emerging manic episode is a decreased need for sleep. Unlike insomnia, where a person wants to sleep but cannot, during mania a person feels rested after only two or three hours of sleep — or may not sleep at all for days.
                  </p>
                  <p>Sleep disruption both triggers and perpetuates manic episodes, making sleep regulation a critical component of treatment.</p>
                </div>
              ),
            },
            {
              id: 'speech',
              title: 'Pressured Speech and Racing Thoughts',
              content: (
                <div>
                  <p className="mb-4">
                    People in a manic episode often speak rapidly and loudly, jumping from topic to topic in a pattern called flight of ideas. Their thoughts race faster than they can articulate, and they may feel as though their mind is producing ideas at an incredible pace.
                  </p>
                  <p>Others may find it difficult to follow the conversation or to get a word in.</p>
                </div>
              ),
            },
            {
              id: 'risk',
              title: 'Risky and Impulsive Behavior',
              content: (
                <div>
                  <p className="mb-4">
                    Mania frequently leads to behaviors that have serious consequences: excessive spending, sexual indiscretions, reckless driving, substance use, or quitting a job without a plan. These behaviors are inconsistent with the person's usual character and values.
                  </p>
                  <p>The impaired judgment during mania means that the person often does not recognize these behaviors as problematic until the episode resolves.</p>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="clinical-note" title="Mixed Features">
          <p>Some manic episodes include depressive symptoms simultaneously — this is called mania with mixed features. A person may feel energized and agitated while also experiencing hopelessness, guilt, or suicidal thoughts. Mixed episodes carry a particularly high risk of self-harm and require urgent clinical attention <Citation id="10" index={6} source="CANMAT/ISBD Guidelines" year="2018" tier={4} />.</p>
        </ArticleCallout>

        <h2 id="depressive-episodes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding Depressive Episodes
        </h2>
        <p className="mb-6">
          The depressive pole of Bipolar I Disorder is often the more debilitating phase. Depressive episodes in bipolar disorder are clinically similar to major depressive disorder, but they tend to be more severe, longer-lasting, and more treatment-resistant. People experience persistent sadness, loss of interest in activities, fatigue, changes in appetite and sleep, difficulty concentrating, feelings of worthlessness, and in severe cases, thoughts of death or suicide.
        </p>
        <p className="mb-6">
          Depressive episodes typically last longer than manic episodes — often weeks to months — and are responsible for the majority of disability associated with bipolar disorder <Citation id="9" index={7} source="Acta Psychiatrica Scandinavica" year="2020" tier={1} />. Many people spend significantly more time in depressive episodes than in mania over the course of the illness.
        </p>
        <p className="mb-6">
          One of the greatest clinical challenges is distinguishing bipolar depression from unipolar depression. Because many people with Bipolar I Disorder first present during a depressive episode, they may be misdiagnosed with major depressive disorder and prescribed antidepressants alone — which can potentially trigger a manic episode.
        </p>

        <h2 id="causes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Causes and Neurobiology
        </h2>
        <p className="mb-6">
          Bipolar I Disorder has one of the strongest genetic components of any psychiatric condition. Twin studies estimate heritability at 70 to 80 percent, meaning that genetics account for the majority of risk <Citation id="4" index={8} source="Molecular Psychiatry" year="2019" tier={1} />. However, no single gene is responsible — rather, hundreds of genetic variants each contribute small amounts of risk.
        </p>
        <p className="mb-6">
          Neuroimaging research has revealed structural and functional differences in the brains of people with bipolar disorder. Key findings include reduced gray matter volume in the prefrontal cortex (which governs emotion regulation and impulse control), abnormalities in the amygdala (the brain's emotional processing center), and disrupted connectivity between these regions <Citation id="5" index={9} source="Journal of Affective Disorders" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          The neurotransmitters dopamine, serotonin, and norepinephrine are all implicated. During manic episodes, dopamine activity appears to be elevated, which may explain the euphoria, increased energy, and goal-directed behavior. During depressive episodes, these systems appear to be underactive.
        </p>
        <p className="mb-6">
          Environmental triggers also play a role. Stressful life events, disrupted sleep-wake cycles, substance use, and seasonal changes can precipitate episodes in people who are genetically vulnerable. The interaction between genetic predisposition and environmental stressors is central to understanding why some people develop bipolar disorder while others with similar genetic risk do not.
        </p>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Treatment
        </h2>
        <p className="mb-6">
          Treatment for Bipolar I Disorder typically involves a combination of medication and psychotherapy, with the goal of stabilizing mood, preventing relapse, and improving quality of life.
        </p>

        <ComparisonTable
          title="Pharmacological Treatments for Bipolar I Disorder"
          columns={['Medication Class', 'Examples', 'Primary Use']}
          items={[
            {
              feature: 'Mood Stabilizers',
              values: [
                'Lithium, valproate (divalproex)',
                'First-line for acute mania and maintenance therapy; lithium reduces suicide risk',
              ],
            },
            {
              feature: 'Atypical Antipsychotics',
              values: [
                'Quetiapine, olanzapine, aripiprazole, lurasidone',
                'Effective for acute mania and bipolar depression; often combined with mood stabilizers',
              ],
            },
            {
              feature: 'Anticonvulsants',
              values: [
                'Lamotrigine, carbamazepine',
                'Lamotrigine is especially effective for preventing depressive episodes',
              ],
            },
            {
              feature: 'Antidepressants (with caution)',
              values: [
                'SSRIs, SNRIs (always with a mood stabilizer)',
                'Used cautiously for bipolar depression; risk of triggering mania if used alone',
              ],
            },
          ]}
          highlightColumn={2}
        />

        <p className="mb-6">
          Lithium remains the gold-standard treatment for Bipolar I Disorder. It is effective for both acute mania and long-term maintenance, and it is the only psychiatric medication with robust evidence for reducing suicide risk — by up to 60 percent <Citation id="6" index={10} source="BMJ" year="2013" tier={1} />. However, lithium requires regular blood monitoring to ensure therapeutic levels and prevent toxicity.
        </p>
        <p className="mb-6">
          A landmark network meta-analysis published in The Lancet compared the efficacy and tolerability of pharmacological treatments for acute mania, confirming that several medications — including lithium, valproate, and atypical antipsychotics — are effective, though they differ in side-effect profiles <Citation id="7" index={11} source="The Lancet" year="2019" tier={1} />.
        </p>

        <h2 id="psychoeducation" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Power of Psychoeducation
        </h2>
        <p className="mb-6">
          Psychoeducation — structured education about bipolar disorder for both patients and families — is one of the most powerful adjuncts to medication. Research consistently shows that psychoeducation significantly reduces relapse rates, improves medication adherence, and enhances overall functioning <Citation id="8" index={12} source="Journal of Clinical Psychiatry" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          Effective psychoeducation programs teach people to recognize their personal early warning signs (such as decreased sleep, increased irritability, or rapid speech), develop action plans for when warning signs appear, maintain regular routines, and communicate effectively with family members and treatment providers.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Learn Your Warning Signs',
              description: (
                <p>Track mood, sleep, and energy daily. Identify the personal patterns that precede your manic or depressive episodes — these are your early warning signals.</p>
              ),
            },
            {
              title: 'Build a Wellness Action Plan',
              description: (
                <p>Create a written plan that specifies what to do when early warning signs appear: who to call, which medications to adjust (with your doctor), and which triggers to avoid.</p>
              ),
            },
            {
              title: 'Maintain Rhythm and Routine',
              description: (
                <p>Social Rhythm Therapy emphasizes keeping regular schedules for sleep, meals, exercise, and social activities. Disruptions to routine are a known trigger for episodes.</p>
              ),
            },
            {
              title: 'Strengthen Your Support System',
              description: (
                <p>Involve trusted family members or friends in your wellness plan. Educate them about the illness so they can recognize warning signs you might miss during an episode.</p>
              ),
            },
            {
              title: 'Stay Engaged with Treatment',
              description: (
                <p>Medication adherence is the single strongest predictor of stability. Work with your psychiatrist to find a regimen that balances effectiveness with tolerability.</p>
              ),
            },
          ]}
        />

        <QuoteBlock
          quote="Bipolar disorder is not a character flaw. It is a medical condition. And like other medical conditions, it responds to treatment."
          attribution="Dr. Kay Redfield Jamison"
          role="Professor of Psychiatry, Johns Hopkins"
          source="An Unquiet Mind"
          variant="large"
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you or someone you know is experiencing dramatic mood swings, periods of unusually elevated energy, reckless behavior, or severe depression, it is important to seek a comprehensive psychiatric evaluation. Bipolar I Disorder is often misdiagnosed — particularly as unipolar depression — and an accurate diagnosis is essential for appropriate treatment.
        </p>
        <p className="mb-6">
          Seek immediate help if you or someone you love is experiencing:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Psychotic symptoms during mania (delusions, hallucinations)</li>
          <li>Suicidal thoughts or self-harm during a depressive or mixed episode</li>
          <li>Inability to sleep for several days accompanied by agitation</li>
          <li>Engaging in dangerous or self-destructive behavior</li>
          <li>Severe impairment in ability to function at work, school, or home</li>
        </ul>
        <p className="mb-6">
          With proper treatment, people living with Bipolar I Disorder lead fulfilling, productive lives. The key is early diagnosis, consistent treatment, and a strong support network.
        </p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Article 27 — Bipolar II Disorder
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: catId(27),
    slug: 'bipolar-ii-disorder-overlooked-mood-condition',
    status: 'published',
    title: 'Bipolar II Disorder: The Overlooked Mood Condition',
    description: 'Bipolar II Disorder is one of the most misdiagnosed conditions in psychiatry. Learn the critical difference between hypomania and mania, why this condition is so often missed, and the treatments that make stability possible.',
    image: '/images/articles/cat13/cover-027.svg',
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 13,
    publishedAt: '2026-04-01',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Bipolar II Disorder', 'Hypomania', 'Mood Disorders', 'Lamotrigine', 'Misdiagnosis'],
    summary: 'Bipolar II Disorder affects approximately 0.4 to 2.0% of adults and is characterized by recurrent depressive episodes and at least one hypomanic episode. Often misdiagnosed as major depression because hypomanic episodes may feel productive rather than problematic, this guide explains the diagnostic criteria, the critical difference between hypomania and mania, and why treatments like lamotrigine and psychotherapy offer real hope for long-term stability.',
    keyFacts: [
      { text: 'Bipolar II Disorder is misdiagnosed as major depression in up to 40% of cases, delaying proper treatment by an average of 7-10 years', citationIndex: 1 },
      { text: 'Hypomania lasts at least four days but does not cause severe impairment or require hospitalization, distinguishing it from mania', citationIndex: 3 },
      { text: 'People with Bipolar II spend significantly more time in depressive episodes than hypomanic episodes — roughly a 37:1 ratio', citationIndex: 5 },
      { text: 'Lamotrigine is the most effective medication for preventing bipolar II depressive episodes with fewer side effects than many alternatives', citationIndex: 7 },
      { text: 'Antidepressant monotherapy in unrecognized Bipolar II can trigger hypomanic switching and rapid cycling', citationIndex: 8 },
    ],
    sparkMoment: 'Bipolar II is not a milder form of Bipolar I — it is a distinct condition where the depressive episodes are often more frequent and debilitating, and the hypomania can mask the true diagnosis for years.',
    practicalExercise: {
      title: 'The Hypomania Awareness Journal',
      steps: [
        { title: 'Establish Your Baseline', description: 'For two weeks, record your normal energy level, sleep needs, and social activity on a 1-10 scale each evening.' },
        { title: 'Flag Above-Baseline Days', description: 'Any day where energy, confidence, or productivity exceeds your baseline by 3 or more points, flag it and note specific behaviors: reduced sleep but feeling rested, starting new projects, increased talkativeness, spending more money than usual.' },
        { title: 'Track Duration Patterns', description: 'Note how many consecutive days the elevated mood persists. Hypomania requires at least four consecutive days of sustained change.' },
        { title: 'Bring Your Data to a Clinician', description: 'Share your journal with a psychiatrist or psychologist. This self-reported data is invaluable for differentiating Bipolar II from major depression.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Mood Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'Bipolar II Disorder: Epidemiology, Diagnosis, and Management',
        source: 'Annals of General Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1186/s12991-019-0226-0',
        tier: 1,
      },
      {
        id: '2',
        text: 'Bipolar Disorder',
        source: 'National Institute of Mental Health',
        year: '2023',
        link: 'https://www.nimh.nih.gov/health/topics/bipolar-disorder',
        tier: 2,
      },
      {
        id: '3',
        text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.books.9780890425787',
        tier: 4,
      },
      {
        id: '4',
        text: 'Distinguishing Bipolar II Disorder from Major Depressive Disorder: Clinical and Biological Differences',
        source: 'Journal of Clinical Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.4088/JCP.19ac13139',
        tier: 1,
      },
      {
        id: '5',
        text: 'Course and Outcome of Bipolar II Disorder: A Longitudinal Study',
        source: 'American Journal of Psychiatry',
        year: '2018',
        link: 'https://doi.org/10.1176/appi.ajp.2018.17121311',
        tier: 1,
      },
      {
        id: '6',
        text: 'Psychotherapy for Bipolar Disorder: A Systematic Review of Randomized Controlled Trials',
        source: 'Acta Psychiatrica Scandinavica',
        year: '2021',
        link: 'https://doi.org/10.1111/acps.13333',
        tier: 1,
      },
      {
        id: '7',
        text: 'Lamotrigine in the Maintenance Treatment of Bipolar Disorder: A Systematic Review and Meta-Analysis',
        source: 'Journal of Affective Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jad.2020.02.034',
        tier: 1,
      },
      {
        id: '8',
        text: 'Antidepressant-Associated Mood Switching and Rapid Cycling in Bipolar Disorder',
        source: 'The British Journal of Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1192/bjp.2019.58',
        tier: 1,
      },
      {
        id: '9',
        text: 'Canadian Network for Mood and Anxiety Treatments (CANMAT) and International Society for Bipolar Disorders (ISBD) Guidelines: Management of Patients with Bipolar Disorder',
        source: 'Bipolar Disorders',
        year: '2018',
        link: 'https://doi.org/10.1111/bdi.12609',
        tier: 4,
      },
      {
        id: '10',
        text: 'Quality of Life and Functional Impairment in Bipolar II Disorder',
        source: 'Journal of Clinical Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.4088/JCP.20m13617',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            For years, you have been told you have depression. The antidepressants help for a while, then stop working — or worse, make you feel wired and unstable. Nobody ever asked about the days when you felt unusually productive, needed less sleep, and had an almost electric energy. Those days did not seem like a problem. They seemed like you were finally feeling normal. But those days are the missing piece of the puzzle — and they change the diagnosis entirely.
          </p>
          <p className="mb-6">
            Bipolar II Disorder is one of the most commonly misdiagnosed conditions in all of psychiatry. Studies suggest that up to 40 percent of people with Bipolar II are initially diagnosed with major depressive disorder <Citation id="1" index={1} source="Annals of General Psychiatry" year="2019" tier={1} />, leading to years of ineffective — and sometimes harmful — treatment.
          </p>
          <p className="mb-6">
            Understanding the difference between Bipolar II and unipolar depression is not an academic exercise. It changes the medications prescribed, the therapy approaches used, and the entire trajectory of someone's recovery <Citation id="2" index={2} source="NIMH" year="2023" tier={2} />.
          </p>
        </div>

        <h2 id="overview" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Bipolar II Disorder?
        </h2>
        <p className="mb-6">
          Bipolar II Disorder is characterized by a pattern of depressive episodes and hypomanic episodes, but never a full manic episode. The DSM-5-TR requires at least one hypomanic episode and at least one major depressive episode for diagnosis <Citation id="3" index={3} source="DSM-5-TR" year="2022" tier={4} />.
        </p>
        <p className="mb-6">
          The critical word is hypomania — a milder form of mania that lasts at least four consecutive days. During hypomania, a person may feel unusually energetic, confident, creative, and productive. They may sleep less, talk more, and take on more projects. However, unlike full mania, hypomania does not cause severe impairment in social or occupational functioning and does not include psychotic features.
        </p>
        <p className="mb-6">
          This is precisely why Bipolar II is so often missed. Hypomanic episodes frequently feel good to the person experiencing them — and they often look like healthy productivity to others. Neither the person nor their clinician may recognize hypomania as a symptom of a mood disorder.
        </p>

        <ComparisonTable
          title="Hypomania vs. Full Mania"
          columns={['Feature', 'Hypomania (Bipolar II)', 'Mania (Bipolar I)']}
          items={[
            {
              feature: 'Duration Required',
              values: ['At least 4 consecutive days', 'At least 7 days (or any duration if hospitalized)'],
            },
            {
              feature: 'Severity',
              values: ['Noticeable change but no severe impairment', 'Causes marked impairment in functioning'],
            },
            {
              feature: 'Hospitalization',
              values: ['Not required', 'Often required for safety'],
            },
            {
              feature: 'Psychotic Features',
              values: ['Never present', 'May include delusions or hallucinations'],
            },
            {
              feature: 'Subjective Experience',
              values: ['Often feels pleasurable and productive', 'Can feel euphoric initially but often becomes dysphoric'],
            },
            {
              feature: 'Impact on Relationships',
              values: ['May increase social engagement', 'Frequently damages relationships'],
            },
          ]}
          highlightColumn={1}
        />

        <h2 id="why-missed" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Bipolar II Is So Often Misdiagnosed
        </h2>
        <p className="mb-6">
          Several factors conspire to keep Bipolar II hidden. First, people rarely seek help during hypomania because it feels good — they seek help during depression, and depression looks the same whether it is unipolar or bipolar <Citation id="4" index={4} source="Journal of Clinical Psychiatry" year="2020" tier={1} />. Second, clinicians often do not ask specifically about periods of elevated mood, increased energy, or decreased sleep need. Standard depression screening tools do not screen for hypomania.
        </p>
        <p className="mb-6">
          Third, people with Bipolar II spend a dramatically disproportionate amount of time depressed. Longitudinal studies show they spend roughly 37 times more days in depression than in hypomania <Citation id="5" index={5} source="American Journal of Psychiatry" year="2018" tier={1} />. When a person has been depressed for months and experienced only a few days of elevated mood, it is easy to overlook the hypomania as simply a good spell between depressive episodes.
        </p>
        <p className="mb-6">
          The consequences of misdiagnosis are serious. Antidepressant monotherapy — the standard treatment for unipolar depression — can trigger hypomanic switching, induce rapid cycling (four or more mood episodes per year), and destabilize mood over time <Citation id="8" index={6} source="British Journal of Psychiatry" year="2019" tier={1} />.
        </p>

        <ArticleCallout variant="warning" title="A Critical Diagnostic Distinction">
          <p>If antidepressants have repeatedly stopped working, caused agitation, or led to periods of unusual energy followed by crashes, a comprehensive evaluation for Bipolar II Disorder is essential. Proper diagnosis changes everything about the treatment approach.</p>
        </ArticleCallout>

        <h2 id="depressive-episodes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Depressive Burden
        </h2>
        <p className="mb-6">
          Depression is the dominant feature of Bipolar II Disorder. Depressive episodes in Bipolar II tend to be severe, recurrent, and accompanied by significant functional impairment. People may experience profound sadness, loss of interest in activities, fatigue, difficulty concentrating, changes in appetite, feelings of worthlessness, and recurrent thoughts of death.
        </p>
        <p className="mb-6">
          Research indicates that the depressive episodes in Bipolar II can be more frequent, longer-lasting, and more treatment-resistant than those in Bipolar I <Citation id="5" index={7} source="American Journal of Psychiatry" year="2018" tier={1} />. Quality of life and functional impairment measures in Bipolar II are comparable to — and sometimes worse than — those in Bipolar I, challenging the outdated notion that Bipolar II is a "milder" condition <Citation id="10" index={8} source="Journal of Clinical Psychiatry" year="2021" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 40, suffix: '%', label: 'Initially misdiagnosed as unipolar depression' },
            { value: 37, suffix: ':1', label: 'Ratio of depressive to hypomanic days' },
            { value: 7, suffix: ' yrs', label: 'Average delay to correct diagnosis' },
          ]}
          source="Annals of General Psychiatry, 2019; American Journal of Psychiatry, 2018"
        />

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Treatment
        </h2>
        <p className="mb-6">
          Treatment for Bipolar II Disorder focuses primarily on preventing depressive episodes while managing hypomania and maintaining overall mood stability. The treatment approach differs meaningfully from both unipolar depression and Bipolar I.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'lamotrigine',
              title: 'Lamotrigine: The Cornerstone Medication',
              content: (
                <div>
                  <p className="mb-4">
                    Lamotrigine is widely considered the first-line medication for Bipolar II Disorder, particularly for preventing depressive episodes. Systematic reviews and meta-analyses confirm its efficacy in maintaining mood stability with a favorable side-effect profile compared to lithium or antipsychotics <Citation id="7" index={9} source="Journal of Affective Disorders" year="2020" tier={1} />.
                  </p>
                  <p>Lamotrigine must be titrated slowly to minimize the risk of a rare but serious skin reaction (Stevens-Johnson syndrome). Most people tolerate it well once at therapeutic dose.</p>
                </div>
              ),
            },
            {
              id: 'lithium',
              title: 'Lithium and Other Mood Stabilizers',
              content: (
                <div>
                  <p className="mb-4">
                    Lithium is also used in Bipolar II, particularly when there is a significant suicide risk or when lamotrigine alone is insufficient. Valproate may be considered for patients who do not respond to first-line options.
                  </p>
                  <p>Treatment guidelines from CANMAT and ISBD recommend individualized medication selection based on the predominant pole (depressive vs. hypomanic), side-effect sensitivity, and patient preferences <Citation id="9" index={10} source="CANMAT/ISBD Guidelines" year="2018" tier={4} />.</p>
                </div>
              ),
            },
            {
              id: 'psychotherapy',
              title: 'Psychotherapy Approaches',
              content: (
                <div>
                  <p className="mb-4">
                    Several psychotherapy approaches have demonstrated effectiveness for Bipolar II. Cognitive Behavioral Therapy (CBT) helps identify and modify unhelpful thought patterns during depressive episodes. Interpersonal and Social Rhythm Therapy (IPSRT) focuses on maintaining stable daily routines to prevent mood episode triggers.
                  </p>
                  <p>A systematic review of randomized controlled trials found that structured psychotherapy combined with medication significantly reduces relapse rates and improves functioning compared to medication alone <Citation id="6" index={11} source="Acta Psychiatrica Scandinavica" year="2021" tier={1} />.</p>
                </div>
              ),
            },
            {
              id: 'avoid',
              title: 'What to Avoid',
              content: (
                <div>
                  <p className="mb-4">
                    Antidepressant monotherapy (without a mood stabilizer) should generally be avoided in Bipolar II due to the risk of mood switching and cycle acceleration. Alcohol and recreational substances can destabilize mood and interact with medications.
                  </p>
                  <p>Irregular sleep patterns are a potent trigger for both hypomania and depression — maintaining consistent sleep and wake times is a foundational element of treatment.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="living-with" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Living with Bipolar II Disorder
        </h2>
        <p className="mb-6">
          Living well with Bipolar II Disorder requires consistent self-monitoring, strong relationships with treatment providers, and strategies for maintaining stability. Many people find that once properly diagnosed and treated, they experience significant improvement in both mood stability and quality of life.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Accept the Diagnosis',
              description: (
                <p>Accepting that Bipolar II is a lifelong condition — not a personal failure — is the foundation for effective management. Many people grieve the loss of hypomanic energy when it is managed, but stability brings something hypomania cannot: reliability.</p>
              ),
            },
            {
              title: 'Partner with Your Treatment Team',
              description: (
                <p>Regular appointments, honest communication about symptoms and medication side effects, and shared decision-making lead to better outcomes than passive compliance.</p>
              ),
            },
            {
              title: 'Protect Your Sleep',
              description: (
                <p>Sleep is the most powerful biomarker for mood state in bipolar disorder. Prioritize consistent sleep and wake times, even on weekends, and take any changes in sleep need seriously.</p>
              ),
            },
            {
              title: 'Develop an Early Warning Plan',
              description: (
                <p>Work with your therapist to identify your personal prodromal symptoms — the subtle signs that appear days or weeks before a full episode — and create an action plan for each scenario.</p>
              ),
            },
          ]}
        />

        <QuoteBlock
          quote="The diagnosis of Bipolar II is not a limitation — it is the beginning of understanding yourself in a way that finally makes sense."
          attribution="Dr. S. Nassir Ghaemi"
          role="Professor of Psychiatry, Tufts Medical Center"
          source="A First-Rate Madness"
          variant="large"
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you are experiencing recurrent depression that does not respond well to antidepressants, or if you have noticed periods of elevated mood, increased energy, and decreased sleep that feel good but are a departure from your norm, seek evaluation from a psychiatrist experienced in mood disorders.
        </p>
        <p className="mb-6">
          Seek help promptly if you experience:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Depressive episodes that have not responded to multiple antidepressants</li>
          <li>Antidepressants that initially work but then cause agitation, insomnia, or mood instability</li>
          <li>A family history of bipolar disorder</li>
          <li>Suicidal thoughts during depressive episodes</li>
          <li>Periods of uncharacteristic productivity, decreased sleep, or impulsive spending</li>
        </ul>
        <p className="mb-6">
          An accurate diagnosis is the single most important step toward effective treatment. With proper care, people with Bipolar II Disorder can achieve lasting stability and live rich, fulfilling lives.
        </p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Article 28 — Schizophrenia
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: catId(28),
    slug: 'schizophrenia-complex-brain-condition',
    status: 'published',
    title: 'Schizophrenia: Understanding a Complex Brain Condition',
    description: 'Schizophrenia is one of the most misunderstood conditions in all of medicine. This guide covers the positive, negative, and cognitive symptoms, the neurobiology, and the treatments that help people living with schizophrenia build meaningful lives.',
    image: '/images/articles/cat13/cover-028.svg',
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 15,
    publishedAt: '2026-04-01',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Schizophrenia', 'Psychosis', 'Antipsychotics', 'Cognitive Symptoms', 'Dopamine Hypothesis'],
    summary: 'Schizophrenia affects approximately 1% of the global population and is characterized by positive symptoms (hallucinations, delusions), negative symptoms (social withdrawal, flat affect), and cognitive symptoms (impaired memory and attention). This guide explains the neurobiological basis including the dopamine and glutamate hypotheses, examines the evidence for antipsychotic medications and CBT for psychosis, and provides resources for people navigating this condition and their families.',
    keyFacts: [
      { text: 'Schizophrenia affects approximately 1 in 100 people worldwide, typically emerging in late adolescence or early adulthood', citationIndex: 1 },
      { text: 'The dopamine hypothesis — that excess dopamine in certain brain pathways contributes to psychotic symptoms — has been the dominant model for over 50 years', citationIndex: 5 },
      { text: 'Negative symptoms (social withdrawal, flat affect, reduced motivation) often cause more long-term disability than positive symptoms', citationIndex: 4 },
      { text: 'Early intervention programs that provide treatment within the first two years of illness significantly improve long-term outcomes', citationIndex: 8 },
      { text: 'Cognitive Behavioral Therapy for psychosis (CBTp) has been shown to reduce the severity of hallucinations and delusions when used alongside medication', citationIndex: 7 },
    ],
    sparkMoment: 'Schizophrenia is not a split personality, a moral failing, or a life sentence of disability — it is a treatable brain condition, and with the right support, recovery is not only possible but common.',
    practicalExercise: {
      title: 'Building a Personal Wellness Toolkit',
      steps: [
        { title: 'Identify Your Baseline', description: 'With a trusted person, describe what you are like when you are feeling well: your sleep patterns, energy level, social engagement, and thinking clarity. Write this down as your reference point.' },
        { title: 'Map Your Early Warning Signs', description: 'List the subtle changes that tend to occur before a difficult period: sleep changes, increased suspicion, social withdrawal, or difficulty concentrating. These are your personal red flags.' },
        { title: 'Create Your Response Plan', description: 'For each warning sign, specify an action: call your clinician, increase sleep hours, reach out to a trusted friend, or use a grounding technique.' },
        { title: 'Share the Plan', description: 'Give copies of your wellness toolkit to your treatment team, a family member, and a friend. Their awareness of your warning signs can help catch early changes before they escalate.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Monitor Your Daily Wellness',
    },
    citations: [
      {
        id: '1',
        text: 'Schizophrenia: A Concise Overview of Incidence, Prevalence, and Mortality',
        source: 'Epidemiologic Reviews',
        year: '2008',
        link: 'https://doi.org/10.1093/epirev/mxn001',
        tier: 1,
      },
      {
        id: '2',
        text: 'Schizophrenia',
        source: 'National Institute of Mental Health',
        year: '2023',
        link: 'https://www.nimh.nih.gov/health/topics/schizophrenia',
        tier: 2,
      },
      {
        id: '3',
        text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.books.9780890425787',
        tier: 4,
      },
      {
        id: '4',
        text: 'Negative Symptoms in Schizophrenia: A Review and Clinical Guide',
        source: 'Schizophrenia Research',
        year: '2020',
        link: 'https://doi.org/10.1016/j.schres.2020.02.015',
        tier: 1,
      },
      {
        id: '5',
        text: 'The Dopamine Hypothesis of Schizophrenia: Version III — The Final Common Pathway',
        source: 'Schizophrenia Bulletin',
        year: '2009',
        link: 'https://doi.org/10.1093/schbul/sbp006',
        tier: 1,
      },
      {
        id: '6',
        text: 'Comparative Efficacy and Tolerability of 32 Oral Antipsychotics for the Acute Treatment of Adults with Multi-Episode Schizophrenia',
        source: 'The Lancet',
        year: '2019',
        link: 'https://doi.org/10.1016/S0140-6736(19)31135-X',
        tier: 1,
      },
      {
        id: '7',
        text: 'Cognitive Behavioral Therapy for Psychosis: A Meta-Analysis of Randomized Controlled Trials',
        source: 'Schizophrenia Research',
        year: '2018',
        link: 'https://doi.org/10.1016/j.schres.2018.02.039',
        tier: 1,
      },
      {
        id: '8',
        text: 'Early Intervention in Psychosis: Evidence, Challenges, and Future Directions',
        source: 'World Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1002/wps.20860',
        tier: 1,
      },
      {
        id: '9',
        text: 'Supported Employment for Adults with Severe Mental Illness',
        source: 'Cochrane Database of Systematic Reviews',
        year: '2017',
        link: 'https://doi.org/10.1002/14651858.CD001088.pub4',
        tier: 1,
      },
      {
        id: '10',
        text: 'The Glutamate Hypothesis of Schizophrenia: Evidence from Human Brain Tissue Studies',
        source: 'Neuroscience & Biobehavioral Reviews',
        year: '2020',
        link: 'https://doi.org/10.1016/j.neubiorev.2020.03.005',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Schizophrenia is surrounded by more stigma, fear, and misunderstanding than almost any other health condition. In popular culture, it is confused with split personality, equated with violence, and treated as a hopeless diagnosis. None of these characterizations are accurate. Schizophrenia is a brain condition — one that affects how a person thinks, feels, and perceives the world — and it is treatable.
          </p>
          <p className="mb-6">
            Affecting approximately 1 in 100 people worldwide <Citation id="1" index={1} source="Epidemiologic Reviews" year="2008" tier={1} />, schizophrenia typically emerges in late adolescence or early adulthood. It is one of the leading causes of disability globally, not because of any inherent hopelessness, but because too many people do not receive adequate treatment, support, or understanding <Citation id="2" index={2} source="NIMH" year="2023" tier={2} />.
          </p>
          <p className="mb-6">
            This guide is written to cut through the myths and provide a clear, research-based understanding of what schizophrenia actually is, what causes it, and what treatments offer real hope.
          </p>
        </div>

        <ArticleCallout variant="warning" title="Crisis Resources">
          <p>If you or someone you know is experiencing a psychotic crisis, severe paranoia, or thoughts of harming themselves or others, contact the <strong>988 Suicide and Crisis Lifeline</strong> (call or text 988) or go to your nearest emergency room. The <strong>NAMI Helpline</strong> (1-800-950-6264) offers guidance and support for families navigating a psychotic episode.</p>
        </ArticleCallout>

        <h2 id="overview" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Schizophrenia?
        </h2>
        <p className="mb-6">
          Schizophrenia is a chronic brain disorder that affects approximately 0.5 to 1 percent of the population. It is characterized by disruptions in thought processes, perceptions, emotional responsiveness, and social interactions <Citation id="3" index={3} source="DSM-5-TR" year="2022" tier={4} />.
        </p>
        <p className="mb-6">
          The symptoms of schizophrenia are traditionally divided into three categories: positive symptoms (experiences added to normal functioning), negative symptoms (experiences subtracted from normal functioning), and cognitive symptoms (impairments in thinking processes). Understanding these categories is essential because they respond differently to treatment and affect quality of life in distinct ways.
        </p>
        <p className="mb-6">
          Schizophrenia is not a split personality (that is Dissociative Identity Disorder). It is not caused by bad parenting. And it does not mean a person is dangerous — in fact, people living with schizophrenia are far more likely to be victims of violence than perpetrators of it.
        </p>

        <StatCard
          stats={[
            { value: 1, suffix: '%', label: 'Global population affected' },
            { value: 18, suffix: '-25', label: 'Typical age of onset (years)' },
            { value: 50, suffix: '%', label: 'Do not receive adequate treatment' },
          ]}
          source="Epidemiologic Reviews, 2008; NIMH, 2023"
        />

        <h2 id="positive-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Positive Symptoms: Experiences Added to Reality
        </h2>
        <p className="mb-6">
          Positive symptoms are the features of schizophrenia that are most visible and most dramatic. They are called "positive" not because they are good, but because they represent experiences that are added to a person's perception of reality.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'hallucinations',
              title: 'Hallucinations',
              content: (
                <div>
                  <p className="mb-4">
                    Hallucinations are sensory experiences that occur without an external stimulus. Auditory hallucinations — hearing voices — are the most common type in schizophrenia, occurring in approximately 60 to 80 percent of people with the condition. The voices may comment on the person's behavior, argue with each other, or give commands.
                  </p>
                  <p className="mb-4">
                    Visual hallucinations, tactile hallucinations (feeling things that are not there), and olfactory hallucinations (smelling things others cannot) also occur but are less common. Hallucinations feel completely real to the person experiencing them — the brain processes them through the same pathways as real sensory input.
                  </p>
                  <p>Understanding that hallucinations are brain-generated experiences — not evidence of weakness or moral failing — is essential for both people with schizophrenia and their families.</p>
                </div>
              ),
            },
            {
              id: 'delusions',
              title: 'Delusions',
              content: (
                <div>
                  <p className="mb-4">
                    Delusions are firmly held beliefs that are not based in reality and are resistant to evidence. Common types include persecutory delusions (believing someone is plotting against you), referential delusions (believing that everyday events have special personal significance), grandiose delusions (believing you have special powers or importance), and thought insertion or withdrawal (believing thoughts are being placed in or removed from your mind).
                  </p>
                  <p>Delusions can be highly distressing and may lead a person to act in ways that seem bizarre to others but are entirely logical within their delusional framework.</p>
                </div>
              ),
            },
            {
              id: 'disorganized',
              title: 'Disorganized Thinking and Speech',
              content: (
                <div>
                  <p className="mb-4">
                    Disorganized thinking is inferred from a person's speech. They may jump from topic to topic without logical connection (derailment or loose associations), give answers unrelated to questions (tangentiality), or produce speech that is so disorganized it is incomprehensible (word salad).
                  </p>
                  <p>This symptom reflects the fundamental disruption in thought organization that is a core feature of schizophrenia, and it can make communication extremely difficult for both the person and those around them.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="negative-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Negative Symptoms: Losses from Normal Functioning
        </h2>
        <p className="mb-6">
          Negative symptoms are often less visible than positive symptoms but can be more disabling in the long term <Citation id="4" index={4} source="Schizophrenia Research" year="2020" tier={1} />. They represent a diminishment or absence of normal emotional responses and behaviors.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Flat affect:</strong> Reduced emotional expression — the person may speak in a monotone, show little facial expression, or appear emotionally unresponsive</li>
          <li><strong>Alogia:</strong> Poverty of speech — providing brief, empty replies that suggest a decrease in thought content</li>
          <li><strong>Avolition:</strong> Decreased motivation to initiate and persist in purposeful activities — difficulty starting or completing tasks</li>
          <li><strong>Anhedonia:</strong> Diminished ability to experience pleasure from activities that were previously enjoyable</li>
          <li><strong>Social withdrawal:</strong> Reduced desire and ability to engage in social interactions</li>
        </ul>
        <p className="mb-6">
          Negative symptoms are particularly challenging because they are often mistaken for laziness, depression, or lack of effort. They are actually core features of the illness itself. Current antipsychotic medications are much less effective against negative symptoms than positive symptoms, making psychosocial interventions especially important.
        </p>

        <h2 id="cognitive-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cognitive Symptoms: Impairments in Thinking
        </h2>
        <p className="mb-6">
          Cognitive symptoms affect the brain's executive functions and are often present even before the first psychotic episode. They include deficits in working memory (the ability to hold and use information in the short term), attention and concentration, processing speed, and executive functioning (planning, organizing, and abstract thinking).
        </p>
        <p className="mb-6">
          Cognitive impairment is increasingly recognized as one of the strongest predictors of long-term functional outcomes in schizophrenia. A person's ability to hold a job, live independently, and maintain relationships is more closely tied to their cognitive functioning than to the severity of their hallucinations or delusions.
        </p>

        <h2 id="neurobiology" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Neurobiology: What Happens in the Brain
        </h2>
        <p className="mb-6">
          The neurobiology of schizophrenia involves multiple brain systems, and research over the past several decades has produced two major theoretical frameworks.
        </p>

        <ComparisonTable
          title="Neurobiological Models of Schizophrenia"
          columns={['Model', 'Key Mechanism', 'Explains']}
          items={[
            {
              feature: 'Dopamine Hypothesis',
              values: [
                'Excess dopamine activity in the mesolimbic pathway; reduced dopamine in the prefrontal cortex',
                'Positive symptoms (hallucinations, delusions) linked to mesolimbic excess; negative and cognitive symptoms linked to prefrontal deficit',
              ],
            },
            {
              feature: 'Glutamate Hypothesis',
              values: [
                'Dysfunction of NMDA glutamate receptors leading to downstream dopamine dysregulation',
                'Negative and cognitive symptoms that dopamine-blocking medications do not address',
              ],
            },
          ]}
          highlightColumn={2}
        />

        <p className="mb-6">
          The dopamine hypothesis, first proposed in the 1960s and refined multiple times since, remains the most influential model <Citation id="5" index={5} source="Schizophrenia Bulletin" year="2009" tier={1} />. In its current form, it proposes that schizophrenia involves excess dopamine activity in the mesolimbic pathway (leading to positive symptoms) combined with reduced dopamine activity in the prefrontal cortex (contributing to negative and cognitive symptoms).
        </p>
        <p className="mb-6">
          The glutamate hypothesis has gained significant traction as a complementary model, particularly for understanding the cognitive and negative symptoms that current treatments address poorly <Citation id="10" index={6} source="Neuroscience & Biobehavioral Reviews" year="2020" tier={1} />. The interaction between dopamine and glutamate systems is now considered central to the neurobiology of schizophrenia.
        </p>
        <p className="mb-6">
          Structural brain imaging has revealed reduced gray matter volume in the prefrontal and temporal cortices, enlarged ventricles, and reduced connectivity in certain neural circuits. These changes often begin before the first psychotic episode and progress over time, particularly in the absence of treatment.
        </p>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Treatment
        </h2>
        <p className="mb-6">
          Treatment for schizophrenia is most effective when it combines pharmacological and psychosocial approaches. The goal is not just symptom reduction but functional recovery — helping people live the lives they want to live.
        </p>

        <ArticleCallout variant="key-takeaway" title="Early Intervention Matters">
          <p>Research consistently shows that early intervention programs — which provide comprehensive treatment within the first two years of illness — significantly improve long-term outcomes, including symptom severity, employment, and quality of life <Citation id="8" index={7} source="World Psychiatry" year="2021" tier={1} />.</p>
        </ArticleCallout>

        <p className="mb-6">
          Antipsychotic medications are the foundation of pharmacological treatment. A landmark network meta-analysis comparing 32 oral antipsychotics found that most are effective for reducing positive symptoms, but they vary substantially in side-effect profiles <Citation id="6" index={8} source="The Lancet" year="2019" tier={1} />. Second-generation (atypical) antipsychotics like risperidone, olanzapine, aripiprazole, and quetiapine are commonly prescribed because they tend to have fewer movement-related side effects than first-generation medications, though they carry their own risks including metabolic syndrome.
        </p>
        <p className="mb-6">
          Clozapine remains the most effective antipsychotic for treatment-resistant schizophrenia — the only medication shown to help when two or more other antipsychotics have failed. Despite its efficacy, clozapine is underutilized due to the requirement for regular blood monitoring (to detect a rare but serious side effect called agranulocytosis).
        </p>
        <p className="mb-6">
          Cognitive Behavioral Therapy for psychosis (CBTp) is recommended by international guidelines as an adjunct to medication. CBTp helps people develop alternative explanations for psychotic experiences, reduce distress associated with hallucinations and delusions, and improve functioning <Citation id="7" index={9} source="Schizophrenia Research" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          Supported employment programs — particularly the Individual Placement and Support (IPS) model — have robust evidence for helping people with schizophrenia obtain and maintain competitive employment. Cochrane reviews consistently show that IPS is more effective than traditional vocational rehabilitation <Citation id="9" index={10} source="Cochrane Database" year="2017" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Start with the Right Medication',
              description: (
                <p>Work with a psychiatrist to find an antipsychotic that effectively manages positive symptoms with acceptable side effects. Give each medication at least 4-6 weeks at adequate doses before switching.</p>
              ),
            },
            {
              title: 'Add Psychosocial Interventions',
              description: (
                <p>CBT for psychosis, social skills training, and family psychoeducation all improve outcomes when combined with medication. These are not alternatives to medication but powerful additions.</p>
              ),
            },
            {
              title: 'Focus on Functional Recovery',
              description: (
                <p>Beyond symptom control, pursue supported employment, independent living skills, and social engagement. Recovery is about building a meaningful life, not just reducing symptoms.</p>
              ),
            },
            {
              title: 'Build a Long-Term Support System',
              description: (
                <p>Connect with community mental health services, peer support groups, and family education programs. Long-term support is essential because schizophrenia is a chronic condition that benefits from ongoing care.</p>
              ),
            },
          ]}
        />

        <QuoteBlock
          quote="Recovery from schizophrenia is not only possible — it is the expected outcome with appropriate treatment and support."
          attribution="Dr. William McFarlane"
          role="Professor of Psychiatry"
          source="Multifamily Groups in the Treatment of Severe Psychiatric Disorders"
          variant="large"
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you or someone you care about is experiencing hallucinations, delusions, disorganized thinking, marked social withdrawal, or a significant decline in functioning, seek a psychiatric evaluation as soon as possible. Early treatment dramatically improves outcomes.
        </p>
        <p className="mb-6">
          Warning signs that warrant immediate attention include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Hearing voices or seeing things others cannot</li>
          <li>Believing that others are controlling your thoughts or monitoring you</li>
          <li>Significant decline in personal hygiene, school, or work performance</li>
          <li>Increasing social isolation and suspiciousness</li>
          <li>Difficulty distinguishing reality from fantasy</li>
          <li>Any thoughts of self-harm or harming others</li>
        </ul>

        <ArticleCallout variant="warning" title="If You Are in Crisis">
          <p>Contact the <strong>988 Suicide and Crisis Lifeline</strong> (call or text 988) anytime, day or night. If you believe someone is experiencing a psychotic episode and may be a danger to themselves or others, call 911 or go to the nearest emergency room. You are not overreacting — psychotic crises require immediate professional support.</p>
        </ArticleCallout>

        <p className="mb-6">
          Schizophrenia is a challenging condition, but it is not a hopeless one. With the right combination of medication, therapy, social support, and self-advocacy, people living with schizophrenia build meaningful, connected, and fulfilling lives every day.
        </p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Article 29 — Obsessive-Compulsive Disorder
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: catId(29),
    slug: 'ocd-intrusive-thoughts-take-control',
    status: 'published',
    title: 'Obsessive-Compulsive Disorder: When Intrusive Thoughts Take Control',
    description: 'OCD goes far beyond hand-washing and organization. Understand the obsession-compulsion cycle, the neurobiology of doubt, and why Exposure and Response Prevention is the gold-standard treatment.',
    image: '/images/articles/cat13/cover-029.svg',
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 14,
    publishedAt: '2026-04-01',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['OCD', 'Obsessive-Compulsive Disorder', 'ERP', 'Intrusive Thoughts', 'SSRIs'],
    summary: 'Obsessive-Compulsive Disorder affects approximately 2-3% of people worldwide, trapping them in relentless cycles of intrusive thoughts and ritualistic behaviors. This guide explains the different types of obsessions and compulsions, the neurobiology of the cortico-striatal-thalamic circuit, and the evidence-based treatments — particularly Exposure and Response Prevention (ERP) and SSRIs — that help people break free from the OCD cycle and reclaim their lives.',
    keyFacts: [
      { text: 'OCD affects approximately 2-3% of the global population, making it one of the most common psychiatric conditions worldwide', citationIndex: 1 },
      { text: 'Exposure and Response Prevention (ERP) is the gold-standard psychological treatment, with 60-80% of patients experiencing significant improvement', citationIndex: 6 },
      { text: 'The average delay between symptom onset and receiving appropriate treatment is 7-10 years due to shame and misunderstanding', citationIndex: 2 },
      { text: 'Neuroimaging reveals hyperactivity in the cortico-striatal-thalamic circuit — the brain\'s error detection system — in people with OCD', citationIndex: 5 },
      { text: 'SSRIs at higher doses than typically used for depression are the first-line pharmacological treatment, with 40-60% response rates', citationIndex: 7 },
    ],
    sparkMoment: 'Everyone has intrusive thoughts — what makes OCD different is not the content of the thoughts but the brain\'s inability to let them go. OCD is not about what kind of person you are; it is about a misfiring alarm system in the brain.',
    practicalExercise: {
      title: 'Understanding Your OCD Cycle',
      steps: [
        { title: 'Identify an Obsession', description: 'Write down one intrusive thought, image, or urge that causes you distress. Be specific: "What if I left the stove on and my house burns down?"' },
        { title: 'Name the Emotion', description: 'What feeling does the obsession trigger? Anxiety, disgust, guilt, fear, doubt? Rate its intensity from 0-100.' },
        { title: 'Identify the Compulsion', description: 'What do you do to reduce the distress? Checking, washing, reassurance-seeking, mental reviewing, counting? How long does it take?' },
        { title: 'Notice the Temporary Relief', description: 'The compulsion reduces anxiety briefly — but the obsession always returns, often stronger. This is the cycle ERP is designed to break.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your OCD Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'Obsessive-Compulsive Disorder: Prevalence, Comorbidity, Impact, and Help-Seeking',
        source: 'Journal of Clinical Psychiatry',
        year: '2010',
        link: 'https://doi.org/10.4088/JCP.09m05667blu',
        tier: 1,
      },
      {
        id: '2',
        text: 'Obsessive-Compulsive Disorder',
        source: 'National Institute of Mental Health',
        year: '2023',
        link: 'https://www.nimh.nih.gov/health/topics/obsessive-compulsive-disorder-ocd',
        tier: 2,
      },
      {
        id: '3',
        text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.books.9780890425787',
        tier: 4,
      },
      {
        id: '4',
        text: 'Subtypes of Obsessive-Compulsive Disorder: A Review',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.101778',
        tier: 1,
      },
      {
        id: '5',
        text: 'Neuroimaging in Obsessive-Compulsive Disorder: A Systematic Review',
        source: 'Psychiatry Research: Neuroimaging',
        year: '2020',
        link: 'https://doi.org/10.1016/j.pscychresns.2020.111063',
        tier: 1,
      },
      {
        id: '6',
        text: 'Exposure and Response Prevention for Obsessive-Compulsive Disorder: A Review and New Directions',
        source: 'Indian Journal of Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.4103/psychiatry.IndianJPsychiatry_516_18',
        tier: 1,
      },
      {
        id: '7',
        text: 'Pharmacological Treatment of Obsessive-Compulsive Disorder: A Meta-Analysis',
        source: 'Journal of Clinical Psychopharmacology',
        year: '2020',
        link: 'https://doi.org/10.1097/JCP.0000000000001257',
        tier: 1,
      },
      {
        id: '8',
        text: 'Deep Brain Stimulation for Treatment-Resistant Obsessive-Compulsive Disorder: A Systematic Review',
        source: 'BMC Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1186/s12888-021-03542-0',
        tier: 1,
      },
      {
        id: '9',
        text: 'The Yale-Brown Obsessive Compulsive Scale: Development, Use, and Reliability',
        source: 'Archives of General Psychiatry',
        year: '1989',
        link: 'https://doi.org/10.1001/archpsyc.1989.01810110048007',
        tier: 1,
      },
      {
        id: '10',
        text: 'Obsessive-Compulsive Disorder: Current Science and Clinical Practice',
        source: 'World Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1002/wps.20852',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            You check the door lock. It is locked. You know it is locked. But five seconds later, a thought creeps in: "What if it is not locked?" So you check again. And again. And again. Each time, the relief lasts only moments before the doubt returns, stronger than before. This is not careful behavior. This is Obsessive-Compulsive Disorder.
          </p>
          <p className="mb-6">
            OCD is one of the most misunderstood conditions in mental health. Popular culture has reduced it to a preference for tidiness or an endearing quirk. In reality, OCD is a debilitating condition that can consume hours of a person's day with unwanted, intrusive thoughts and the rituals performed to neutralize them <Citation id="2" index={1} source="NIMH" year="2023" tier={2} />.
          </p>
          <p className="mb-6">
            Affecting approximately 2 to 3 percent of the global population <Citation id="1" index={2} source="Journal of Clinical Psychiatry" year="2010" tier={1} />, OCD ranks among the top 10 most disabling illnesses according to the World Health Organization. Yet the average person waits 7 to 10 years from symptom onset before receiving appropriate treatment, often due to shame, secrecy, and widespread misunderstanding of the condition.
          </p>
        </div>

        <h2 id="overview" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is OCD?
        </h2>
        <p className="mb-6">
          Obsessive-Compulsive Disorder is characterized by the presence of obsessions, compulsions, or both. Obsessions are recurrent, unwanted, intrusive thoughts, images, or urges that cause marked anxiety or distress. Compulsions are repetitive behaviors or mental acts that a person feels driven to perform in response to an obsession, according to rigid rules, or to prevent a dreaded outcome <Citation id="3" index={3} source="DSM-5-TR" year="2022" tier={4} />.
        </p>
        <p className="mb-6">
          The critical feature of OCD is the cycle it creates: an obsession triggers intense distress, the compulsion temporarily reduces that distress, but the obsession returns — often with greater intensity — reinforcing the need for the compulsion. Over time, this cycle strengthens and expands, consuming more and more of a person's time and energy.
        </p>
        <p className="mb-6">
          It is important to understand that the intrusive thoughts in OCD are ego-dystonic — they are in direct conflict with the person's values and desires. A person with harm obsessions does not want to harm anyone; a person with contamination obsessions does not enjoy cleaning. The thoughts are unwanted, distressing, and experienced as foreign invaders in the mind.
        </p>

        <StatCard
          stats={[
            { value: 2.3, suffix: '%', label: 'Global lifetime prevalence' },
            { value: 7, suffix: ' yrs', label: 'Average delay to proper treatment' },
            { value: 65, suffix: '%', label: 'Experience significant improvement with ERP' },
          ]}
          source="Journal of Clinical Psychiatry, 2010; NIMH, 2023"
        />

        <h2 id="obsession-types" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Types of Obsessions
        </h2>
        <p className="mb-6">
          Obsessions in OCD can take many forms, though research has identified several common themes <Citation id="4" index={4} source="Clinical Psychology Review" year="2019" tier={1} />. Understanding that these categories exist helps people recognize OCD beyond the stereotypical hand-washing and checking portrayals.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'contamination',
              title: 'Contamination Obsessions',
              content: (
                <div>
                  <p className="mb-4">
                    Fear of being contaminated by germs, bodily fluids, chemicals, dirt, or environmental contaminants. This can extend to abstract "contamination" — feeling contaminated by a person, place, or concept. Compulsions typically involve excessive washing, cleaning, or avoidance.
                  </p>
                  <p>The fear is not that something is dirty — it is the intolerable uncertainty about whether something could be dangerous.</p>
                </div>
              ),
            },
            {
              id: 'harm',
              title: 'Harm Obsessions',
              content: (
                <div>
                  <p className="mb-4">
                    Intrusive thoughts about accidentally or deliberately harming others — stabbing a family member, pushing someone off a platform, or causing an accident. These thoughts are extremely distressing precisely because the person finds them abhorrent. Compulsions may include mental reviewing, reassurance-seeking, or avoidance of sharp objects.
                  </p>
                  <p>People with harm obsessions are among the least likely to actually harm anyone — the distress they feel about these thoughts reflects their strong moral compass.</p>
                </div>
              ),
            },
            {
              id: 'symmetry',
              title: 'Symmetry, Ordering, and Exactness',
              content: (
                <div>
                  <p className="mb-4">
                    An intense need for things to be symmetrical, arranged in a certain order, or feel "just right." The distress is not about aesthetics but about an overwhelming sense that something terrible will happen if things are not arranged correctly, or an intolerable sense of incompleteness.
                  </p>
                  <p>Compulsions involve arranging, ordering, counting, and repeating actions until they feel "right."</p>
                </div>
              ),
            },
            {
              id: 'taboo',
              title: 'Taboo or Forbidden Thought Obsessions',
              content: (
                <div>
                  <p className="mb-4">
                    Intrusive sexual, religious, or morally objectionable thoughts that are deeply distressing because they violate the person's core values. Examples include unwanted blasphemous images, intrusive sexual thoughts about inappropriate subjects, or persistent doubt about one's sexual orientation or identity.
                  </p>
                  <p>These obsessions are often the most hidden due to extreme shame, and they are frequently among the most responsive to ERP treatment.</p>
                </div>
              ),
            },
            {
              id: 'existential',
              title: 'Existential and Meta-Cognitive Obsessions',
              content: (
                <div>
                  <p className="mb-4">
                    Intrusive philosophical thoughts about the nature of reality, consciousness, or existence that become stuck and distressing. Questions like "What if nothing is real?" or "What if I am not actually me?" that most people can dismiss become inescapable loops.
                  </p>
                  <p>Similarly, some people experience obsessions about the OCD itself — worrying about whether their thoughts are truly OCD or whether they actually want to act on them.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="compulsion-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Compulsion Patterns
        </h2>
        <p className="mb-6">
          Compulsions can be observable physical behaviors or invisible mental rituals. Both serve the same function — to reduce the distress caused by obsessions and to prevent the feared outcome.
        </p>

        <ComparisonTable
          title="Physical vs. Mental Compulsions"
          columns={['Type', 'Examples', 'Common Triggers']}
          items={[
            {
              feature: 'Physical (Observable)',
              values: [
                'Hand-washing, checking locks/stoves, arranging objects, tapping, counting aloud, hoarding',
                'Contamination fears, doubt about safety, need for symmetry',
              ],
            },
            {
              feature: 'Mental (Invisible)',
              values: [
                'Mental reviewing, praying, counting silently, neutralizing thoughts, reassurance-seeking, mental checking',
                'Harm obsessions, taboo thoughts, religious scrupulosity',
              ],
            },
            {
              feature: 'Avoidance Behaviors',
              values: [
                'Avoiding triggers (knives, certain places, specific people), not driving, not being alone with children',
                'Harm obsessions, contamination fears, all obsession types',
              ],
            },
          ]}
          highlightColumn={1}
        />

        <p className="mb-6">
          Mental compulsions are particularly important to recognize because they are invisible to others and can lead clinicians to conclude that a person "only has obsessions." In reality, mental rituals can be just as time-consuming and impairing as physical ones.
        </p>

        <h2 id="neurobiology" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Neurobiology of OCD
        </h2>
        <p className="mb-6">
          Neuroimaging studies have consistently identified a specific brain circuit — the cortico-striatal-thalamic-cortical (CSTC) loop — as central to OCD <Citation id="5" index={5} source="Psychiatry Research: Neuroimaging" year="2020" tier={1} />. This circuit connects the orbitofrontal cortex (which detects errors and assesses threats), the caudate nucleus (which filters and gates information), and the thalamus (which relays information to other brain regions).
        </p>
        <p className="mb-6">
          In OCD, this circuit is hyperactive. The orbitofrontal cortex sends constant "something is wrong" signals, the caudate nucleus fails to properly filter these signals, and the result is a relentless sense of error, incompleteness, or danger that the person cannot shut off. Compulsions are the brain's attempt to resolve these false alarms.
        </p>
        <p className="mb-6">
          The neurotransmitter serotonin is strongly implicated, which is why serotonergic medications are effective. Research also points to roles for glutamate and dopamine, particularly in treatment-resistant cases. The genetic contribution to OCD is estimated at 40 to 50 percent, with multiple genes involved, each contributing a small amount of risk.
        </p>

        <ArticleCallout variant="did-you-know">
          <p>The brain of a person with OCD is not fundamentally different from anyone else's — it is the same error-detection system that everyone has, but running at a much higher sensitivity. OCD has been called "the doubting disease" because the core problem is not danger but intolerable uncertainty <Citation id="10" index={6} source="World Psychiatry" year="2021" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Treatment
        </h2>
        <p className="mb-6">
          The two pillars of OCD treatment are Exposure and Response Prevention (ERP) and serotonergic medications, with ERP considered the gold-standard psychological intervention <Citation id="6" index={7} source="Indian Journal of Psychiatry" year="2019" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Exposure and Response Prevention (ERP)
        </h3>
        <p className="mb-6">
          ERP is a specialized form of Cognitive Behavioral Therapy designed specifically for OCD. It involves two components: exposure to situations, thoughts, or images that trigger obsessions; and response prevention — voluntarily refraining from performing the compulsion.
        </p>
        <p className="mb-6">
          The goal of ERP is not to eliminate intrusive thoughts but to change the person's relationship with them. Through repeated exposure without performing compulsions, the brain learns that the feared consequences do not occur (or can be tolerated), and the obsession's emotional charge gradually diminishes — a process called habituation.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Build a Fear Hierarchy',
              description: (
                <p>With your therapist, list situations that trigger your obsessions and rate them from 0 to 100. You will start with moderately distressing exposures and work up.</p>
              ),
            },
            {
              title: 'Begin Graduated Exposure',
              description: (
                <p>Face a triggering situation deliberately while resisting the urge to perform the compulsion. For example, if you fear contamination, you might touch a doorknob and then sit with the anxiety without washing your hands.</p>
              ),
            },
            {
              title: 'Practice Response Prevention',
              description: (
                <p>When the urge to perform the compulsion arises, delay it. Let the anxiety peak and then naturally decline on its own. Each time you do this, you prove to your brain that the feared outcome does not happen — or that you can tolerate it if it does.</p>
              ),
            },
            {
              title: 'Consolidate and Generalize',
              description: (
                <p>Over weeks and months, work through progressively more challenging items on your hierarchy. As earlier items become easy, harder ones become manageable. The goal is a new relationship with uncertainty — not the elimination of all doubt.</p>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Medication
        </h3>
        <p className="mb-6">
          SSRIs are the first-line pharmacological treatment for OCD, but they are typically prescribed at higher doses than for depression. Meta-analyses confirm response rates of 40 to 60 percent <Citation id="7" index={8} source="Journal of Clinical Psychopharmacology" year="2020" tier={1} />. The most commonly used SSRIs for OCD are fluvoxamine, fluoxetine, sertraline, and paroxetine. Clomipramine, a tricyclic antidepressant with strong serotonergic effects, is also highly effective but has more side effects.
        </p>
        <p className="mb-6">
          It is important to note that SSRIs take 8 to 12 weeks to reach full effectiveness for OCD — longer than the typical 4 to 6 weeks for depression. Many people give up too soon, believing the medication is not working.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Treatment-Resistant OCD
        </h3>
        <p className="mb-6">
          For the approximately 30 to 40 percent of people who do not respond adequately to ERP and SSRIs, additional options include augmentation with low-dose antipsychotics, combining ERP with medication, and intensive residential or day treatment programs. In severe, treatment-resistant cases, deep brain stimulation (DBS) targeting the ventral capsule/ventral striatum has shown promising results in carefully selected patients <Citation id="8" index={9} source="BMC Psychiatry" year="2021" tier={1} />.
        </p>

        <ArticleCallout variant="tip" title="Finding an ERP Therapist">
          <p>Not all therapists are trained in ERP. When seeking treatment for OCD, specifically ask whether the therapist has training and experience with Exposure and Response Prevention. The International OCD Foundation (iocdf.org) maintains a directory of trained providers. Standard talk therapy or general CBT without the ERP component is not effective for OCD and can sometimes make symptoms worse by providing reassurance <Citation id="9" index={10} source="Archives of General Psychiatry" year="1989" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="living-with-ocd" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Living with OCD
        </h2>
        <p className="mb-6">
          OCD is a chronic condition, but with proper treatment, most people experience significant improvement. The goal of treatment is not to eliminate all intrusive thoughts — everyone has them — but to reduce the distress and time consumed by obsessions and compulsions to a manageable level.
        </p>
        <p className="mb-6">
          Many people with OCD learn to recognize their intrusive thoughts as "just OCD" rather than meaningful signals. This shift in relationship with the thoughts — from "I must respond to this" to "I notice this thought, and I am choosing not to engage with it" — is a hallmark of recovery.
        </p>
        <p className="mb-6">
          Family members and loved ones play an important role. Well-meaning family members often provide reassurance or participate in rituals (known as accommodation), which inadvertently reinforces the OCD. Family-based interventions that reduce accommodation while maintaining support are an important component of treatment.
        </p>

        <QuoteBlock
          quote="OCD is not about having too many thoughts. It is about having a brain that will not stop ringing the alarm bell, even when there is no fire."
          attribution="Dr. Jonathan Grayson"
          role="OCD Specialist"
          source="Freedom from Obsessive-Compulsive Disorder"
          variant="large"
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If intrusive thoughts are consuming more than an hour of your day, if you are avoiding situations to prevent obsessions, or if compulsions are interfering with your work, relationships, or daily functioning, it is time to seek specialized help.
        </p>
        <p className="mb-6">
          Seek help if you notice:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Intrusive thoughts that keep returning despite your efforts to dismiss them</li>
          <li>Rituals or behaviors that take up significant time each day</li>
          <li>Avoidance of places, people, or activities due to obsessive fears</li>
          <li>Increasing distress about your thoughts despite trying to control them</li>
          <li>Difficulty functioning at work, school, or in relationships due to obsessions or compulsions</li>
          <li>Feelings of shame or hopelessness about your symptoms</li>
        </ul>
        <p className="mb-6">
          You do not need to live under the tyranny of intrusive thoughts. ERP works, medication helps, and recovery is the expected outcome with proper treatment. The first step is the hardest — and the most important.
        </p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Article 30 — Post-Traumatic Stress Disorder
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: catId(30),
    slug: 'ptsd-understanding-trauma-brain-impact',
    status: 'published',
    title: 'Post-Traumatic Stress Disorder: Understanding Trauma\'s Impact on the Brain',
    description: 'PTSD is not a sign of weakness — it is a brain condition caused by traumatic experiences. Learn about the four symptom clusters, the neurobiology of trauma, and the evidence-based therapies that help people process traumatic memories and reclaim their lives.',
    image: '/images/articles/cat13/cover-030.svg',
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 15,
    publishedAt: '2026-04-01',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['PTSD', 'Trauma', 'EMDR', 'CPT', 'Prolonged Exposure', 'Hyperarousal'],
    summary: 'Post-Traumatic Stress Disorder affects approximately 6-7% of people at some point in their lives, developing after exposure to traumatic events such as combat, assault, accidents, or natural disasters. Characterized by four symptom clusters — re-experiencing, avoidance, negative cognitions and mood, and hyperarousal — PTSD reflects fundamental changes in how the brain processes threat and memory. This guide examines the neurobiology of trauma, explores evidence-based treatments including EMDR, Cognitive Processing Therapy, and Prolonged Exposure, and provides resources for people on the path to recovery.',
    keyFacts: [
      { text: 'Approximately 6-7% of the U.S. population will experience PTSD at some point in their lifetime, with women affected at roughly twice the rate of men', citationIndex: 1 },
      { text: 'The amygdala becomes hyperactive in PTSD while the prefrontal cortex becomes underactive, creating a brain locked in survival mode', citationIndex: 5 },
      { text: 'EMDR, Cognitive Processing Therapy, and Prolonged Exposure all have strong evidence as first-line treatments, with 50-80% of patients achieving significant improvement', citationIndex: 7 },
      { text: 'Not everyone who experiences trauma develops PTSD — resilience factors include strong social support, coping skills, and early intervention', citationIndex: 4 },
      { text: 'PTSD often co-occurs with depression, substance use disorders, and chronic pain, requiring integrated treatment approaches', citationIndex: 9 },
    ],
    sparkMoment: 'PTSD is not a weakness or a choice — it is your brain\'s survival system working exactly as designed, but unable to recognize that the danger has passed. Treatment helps the brain update its threat assessment so you can live in the present, not the past.',
    practicalExercise: {
      title: 'The Grounding Anchor Technique',
      steps: [
        { title: 'Recognize the Trigger', description: 'When you notice flashback symptoms beginning — racing heart, a sense of being transported back, or sudden intense emotion — pause and say to yourself: "I am having a trauma response. I am safe right now."' },
        { title: 'Activate Your Five Senses', description: 'Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This grounds you in the present moment.' },
        { title: 'Use Your Anchor Object', description: 'Carry a small object (a smooth stone, a textured keychain) that you associate with safety. Hold it, focus on its weight and texture, and use it as a physical reminder that you are in the present.' },
        { title: 'Slow Your Breathing', description: 'Breathe in for 4 counts, hold for 4 counts, exhale for 6 counts. Repeat until your heart rate slows. Extended exhale activates the parasympathetic nervous system and signals safety to your brain.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Recovery Progress',
    },
    citations: [
      {
        id: '1',
        text: 'Epidemiology of PTSD in the National Comorbidity Survey Replication',
        source: 'Archives of General Psychiatry',
        year: '2005',
        link: 'https://doi.org/10.1001/archpsyc.62.6.617',
        tier: 1,
      },
      {
        id: '2',
        text: 'Post-Traumatic Stress Disorder',
        source: 'National Institute of Mental Health',
        year: '2023',
        link: 'https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd',
        tier: 2,
      },
      {
        id: '3',
        text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.books.9780890425787',
        tier: 4,
      },
      {
        id: '4',
        text: 'Risk and Resilience Factors for PTSD: A Meta-Analysis',
        source: 'Psychological Bulletin',
        year: '2018',
        link: 'https://doi.org/10.1037/bul0000138',
        tier: 1,
      },
      {
        id: '5',
        text: 'The Neurobiology of PTSD: Implications for Understanding Fear-Based Disorders',
        source: 'Neuroscience & Biobehavioral Reviews',
        year: '2020',
        link: 'https://doi.org/10.1016/j.neubiorev.2020.06.007',
        tier: 1,
      },
      {
        id: '6',
        text: 'EMDR Therapy for PTSD: A Systematic Review and Meta-Analysis',
        source: 'Journal of Affective Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jad.2021.05.019',
        tier: 1,
      },
      {
        id: '7',
        text: 'Psychological and Pharmacological Treatments for PTSD: An Updated Systematic Review and Meta-Analysis',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101866',
        tier: 1,
      },
      {
        id: '8',
        text: 'Cognitive Processing Therapy for PTSD: A Comprehensive Manual',
        source: 'Journal of Consulting and Clinical Psychology',
        year: '2017',
        link: 'https://doi.org/10.1037/ccp0000215',
        tier: 1,
      },
      {
        id: '9',
        text: 'Comorbidity of PTSD: Current Prevalence and Clinical Implications',
        source: 'Psychiatric Annals',
        year: '2019',
        link: 'https://doi.org/10.3928/00485713-20190612-01',
        tier: 1,
      },
      {
        id: '10',
        text: 'VA/DoD Clinical Practice Guideline for the Management of Posttraumatic Stress Disorder and Acute Stress Disorder',
        source: 'U.S. Department of Veterans Affairs',
        year: '2023',
        link: 'https://www.healthquality.va.gov/guidelines/MH/ptsd/',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            The car accident happened three years ago, but your body acts as if it happened three minutes ago. A car horn sends your heart racing. The smell of burning rubber makes your palms sweat. You dream about it, think about it, relive it — even though you desperately want to forget. You are not going crazy. You are not weak. Your brain is doing exactly what it was designed to do after a life-threatening experience. The problem is that it cannot turn off.
          </p>
          <p className="mb-6">
            Post-Traumatic Stress Disorder (PTSD) develops after exposure to one or more traumatic events — experiences that involve actual or threatened death, serious injury, or sexual violence <Citation id="3" index={1} source="DSM-5-TR" year="2022" tier={4} />. Approximately 6 to 7 percent of the U.S. population will experience PTSD at some point in their lifetime <Citation id="1" index={2} source="Archives of General Psychiatry" year="2005" tier={1} />, though rates are substantially higher among combat veterans, survivors of sexual assault, and first responders.
          </p>
          <p className="mb-6">
            PTSD is not a sign of weakness, and it is not a permanent state. It is a treatable brain condition, and with evidence-based therapy, the vast majority of people experience significant improvement <Citation id="2" index={3} source="NIMH" year="2023" tier={2} />.
          </p>
        </div>

        <ArticleCallout variant="warning" title="Crisis Resources">
          <p>If you or someone you know is experiencing a trauma-related crisis, suicidal thoughts, or severe distress, contact the <strong>988 Suicide and Crisis Lifeline</strong> (call or text 988). <strong>Veterans</strong> can press 1 after dialing 988 to reach the Veterans Crisis Line. The <strong>Crisis Text Line</strong> is available by texting HOME to 741741.</p>
        </ArticleCallout>

        <h2 id="overview" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is PTSD?
        </h2>
        <p className="mb-6">
          PTSD is a psychiatric condition that can develop after exposure to traumatic events. While it is normal to have strong reactions after trauma — nightmares, difficulty sleeping, heightened anxiety — these responses typically resolve within weeks. PTSD is diagnosed when symptoms persist for more than one month and cause significant distress or impairment in functioning <Citation id="3" index={4} source="DSM-5-TR" year="2022" tier={4} />.
        </p>
        <p className="mb-6">
          Traumatic events that can lead to PTSD include combat exposure, physical or sexual assault, serious accidents, natural disasters, childhood abuse, witnessing violence, and other life-threatening situations. PTSD can also develop from learning about traumatic events that happened to a close family member or friend, or from repeated professional exposure to traumatic details (as experienced by first responders and forensic investigators).
        </p>
        <p className="mb-6">
          Importantly, not everyone who experiences trauma develops PTSD. Research has identified both risk factors and resilience factors that influence who develops the condition <Citation id="4" index={5} source="Psychological Bulletin" year="2018" tier={1} />. Risk factors include prior trauma history, childhood adversity, mental health history, lack of social support, and severity of the traumatic event. Resilience factors include strong social connections, effective coping strategies, access to early intervention, and a sense of purpose or meaning.
        </p>

        <StatCard
          stats={[
            { value: 6, suffix: '%', label: 'U.S. lifetime prevalence of PTSD' },
            { value: 2, suffix: 'x', label: 'Higher rate in women than men' },
            { value: 50, suffix: '%+', label: 'Improvement with evidence-based therapy' },
          ]}
          source="Archives of General Psychiatry, 2005; Clinical Psychology Review, 2020"
        />

        <h2 id="symptom-clusters" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Four Symptom Clusters
        </h2>
        <p className="mb-6">
          The DSM-5-TR organizes PTSD symptoms into four clusters. A person must have symptoms from each cluster for a diagnosis.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 're-experiencing',
              title: 'Cluster 1: Re-Experiencing (Intrusion Symptoms)',
              content: (
                <div>
                  <p className="mb-4">
                    Re-experiencing symptoms are the hallmark of PTSD. They include flashbacks (reliving the traumatic event as if it is happening again, sometimes with complete sensory vividness), intrusive memories that appear without warning, nightmares about the trauma, and intense psychological or physiological distress when exposed to reminders of the event.
                  </p>
                  <p className="mb-4">
                    Flashbacks can be triggered by sights, sounds, smells, or even bodily sensations that the brain associates with the traumatic event. During a flashback, the person may temporarily lose awareness of their current surroundings, feeling as though they are back in the traumatic situation.
                  </p>
                  <p>These symptoms reflect the brain's failure to properly process and file the traumatic memory. Instead of being stored as a past event, the memory remains "active" and can be involuntarily triggered at any time.</p>
                </div>
              ),
            },
            {
              id: 'avoidance',
              title: 'Cluster 2: Avoidance',
              content: (
                <div>
                  <p className="mb-4">
                    People with PTSD often go to great lengths to avoid anything that reminds them of the trauma. This includes avoiding people, places, activities, objects, or situations that might trigger distressing memories. They may also avoid thinking or talking about the traumatic event itself.
                  </p>
                  <p>While avoidance provides short-term relief, it reinforces the brain's belief that the trauma-related stimuli are dangerous. Over time, the avoidance often expands — a person who initially avoids one intersection may eventually avoid driving entirely, progressively shrinking their world.</p>
                </div>
              ),
            },
            {
              id: 'cognitions',
              title: 'Cluster 3: Negative Cognitions and Mood',
              content: (
                <div>
                  <p className="mb-4">
                    PTSD frequently distorts a person's beliefs about themselves, others, and the world. Common negative cognitions include: "I am permanently damaged," "No one can be trusted," "The world is completely dangerous," or "It was my fault."
                  </p>
                  <p className="mb-4">
                    Emotional changes include persistent negative emotional states (fear, horror, anger, guilt, shame), diminished interest in activities that were previously meaningful, feelings of detachment or estrangement from others, and a persistent inability to experience positive emotions.
                  </p>
                  <p>Some people experience dissociative amnesia — the inability to remember important aspects of the traumatic event, not due to head injury but as a protective mechanism of the brain.</p>
                </div>
              ),
            },
            {
              id: 'hyperarousal',
              title: 'Cluster 4: Hyperarousal and Reactivity',
              content: (
                <div>
                  <p className="mb-4">
                    The nervous system in PTSD is stuck in a state of high alert. Symptoms include being easily startled (an exaggerated startle response), hypervigilance (constantly scanning the environment for threats), difficulty concentrating, irritability or angry outbursts, sleep disturbance, and reckless or self-destructive behavior.
                  </p>
                  <p>Hyperarousal reflects the brain's persistent activation of the fight-or-flight response. The person's nervous system is continuously preparing for a threat that is no longer present, leading to chronic physical and emotional exhaustion.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="neurobiology" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Neurobiology of Trauma
        </h2>
        <p className="mb-6">
          PTSD involves measurable changes in brain structure and function. Understanding these changes helps explain why PTSD is not simply a matter of willpower or attitude — it is rooted in the biology of the brain <Citation id="5" index={6} source="Neuroscience & Biobehavioral Reviews" year="2020" tier={1} />.
        </p>

        <ComparisonTable
          title="Brain Changes in PTSD"
          columns={['Brain Region', 'Normal Function', 'Change in PTSD']}
          items={[
            {
              feature: 'Amygdala',
              values: [
                'Detects threats and triggers the fear response',
                'Becomes hyperactive — constantly fires "danger" signals even in safe environments',
              ],
            },
            {
              feature: 'Prefrontal Cortex',
              values: [
                'Regulates emotions and evaluates whether threats are real',
                'Becomes underactive — reduced ability to override the amygdala\'s false alarms',
              ],
            },
            {
              feature: 'Hippocampus',
              values: [
                'Processes and stores memories with time and context stamps',
                'Volume reduced — traumatic memories are stored without proper temporal context, making them feel "current"',
              ],
            },
          ]}
          highlightColumn={2}
        />

        <p className="mb-6">
          The interplay between these three structures creates the core experience of PTSD. The amygdala, acting as the brain's smoke detector, is set to maximum sensitivity. The prefrontal cortex, which should be able to assess whether the alarm is real, is weakened. And the hippocampus, which should tag memories with "this happened in the past," is impaired — so traumatic memories feel present rather than historical.
        </p>
        <p className="mb-6">
          Additionally, the hypothalamic-pituitary-adrenal (HPA) axis — the body's stress response system — shows chronic dysregulation in PTSD. Cortisol levels may be abnormally low (paradoxically), while norepinephrine levels are elevated, keeping the body in a state of chronic physiological stress.
        </p>
        <p className="mb-6">
          The encouraging news is that these brain changes are not permanent. Effective treatment — particularly trauma-focused psychotherapy — has been shown to normalize amygdala activity, strengthen prefrontal cortex function, and even increase hippocampal volume over time. The brain's capacity for change (neuroplasticity) is the foundation on which PTSD treatment works.
        </p>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Treatment
        </h2>
        <p className="mb-6">
          The VA/DoD Clinical Practice Guidelines and international treatment guidelines consistently recommend three trauma-focused psychotherapies as first-line treatments for PTSD <Citation id="10" index={7} source="VA/DoD Guidelines" year="2023" tier={2} />. All three have strong evidence from randomized controlled trials and meta-analyses <Citation id="7" index={8} source="Clinical Psychology Review" year="2020" tier={1} />.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'cpt',
              title: 'Cognitive Processing Therapy (CPT)',
              content: (
                <div>
                  <p className="mb-4">
                    CPT is a 12-session structured therapy that focuses on the negative beliefs (called "stuck points") that develop after trauma. Examples include "It was my fault," "I should have been able to prevent it," or "The world is completely dangerous." CPT helps people examine these beliefs, challenge them with evidence, and develop more balanced perspectives <Citation id="8" index={9} source="Journal of Consulting and Clinical Psychology" year="2017" tier={1} />.
                  </p>
                  <p>CPT does not require people to describe the trauma in detail, which makes it appealing for some individuals who find detailed trauma recounting too distressing. The focus is on how the person is thinking about the trauma now, rather than reliving the experience itself.</p>
                </div>
              ),
            },
            {
              id: 'pe',
              title: 'Prolonged Exposure (PE)',
              content: (
                <div>
                  <p className="mb-4">
                    PE involves gradually and systematically confronting trauma-related memories, feelings, and situations that have been avoided. It includes two main components: imaginal exposure (repeatedly recounting the traumatic memory in the safety of the therapy session) and in vivo exposure (gradually approaching real-world situations that have been avoided due to their association with the trauma).
                  </p>
                  <p>The principle behind PE is that avoidance prevents the natural processing of traumatic memories. By confronting the memory in a safe, controlled environment, the emotional charge of the memory diminishes over time (a process called emotional processing), and the person learns that remembering the trauma is not the same as re-experiencing the danger.</p>
                </div>
              ),
            },
            {
              id: 'emdr',
              title: 'Eye Movement Desensitization and Reprocessing (EMDR)',
              content: (
                <div>
                  <p className="mb-4">
                    EMDR is a structured therapy that involves attending to a traumatic memory while simultaneously engaging in bilateral stimulation — typically following the therapist's moving finger with the eyes. The precise mechanism is debated, but research consistently shows that EMDR reduces the vividness and emotional intensity of traumatic memories <Citation id="6" index={10} source="Journal of Affective Disorders" year="2021" tier={1} />.
                  </p>
                  <p>EMDR does not require detailed verbal accounts of the traumatic event, which may be beneficial for people who find it difficult to articulate their experiences. A standard EMDR protocol typically involves 8-12 sessions.</p>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="clinical-note" title="Medication for PTSD">
          <p>While trauma-focused psychotherapy is the preferred first-line treatment, medications can be helpful — particularly SSRIs (sertraline and paroxetine are FDA-approved for PTSD) and the alpha-1 blocker prazosin for trauma-related nightmares. Medication is often most effective when combined with psychotherapy <Citation id="7" index={11} source="Clinical Psychology Review" year="2020" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="comorbidity" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Comorbidity: PTSD Rarely Travels Alone
        </h2>
        <p className="mb-6">
          PTSD frequently co-occurs with other conditions, which can complicate diagnosis and treatment. Research indicates that approximately 80 percent of people with PTSD have at least one comorbid psychiatric condition <Citation id="9" index={12} source="Psychiatric Annals" year="2019" tier={1} />.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Major Depression:</strong> Occurs in approximately 50 percent of people with PTSD. Shared symptoms (insomnia, difficulty concentrating, loss of interest) can make differential diagnosis challenging.</li>
          <li><strong>Substance Use Disorders:</strong> Many people use alcohol or drugs to self-medicate PTSD symptoms. Integrated treatment that addresses both PTSD and substance use simultaneously is more effective than treating them sequentially.</li>
          <li><strong>Chronic Pain:</strong> The physiological stress of PTSD can manifest as chronic pain conditions, and traumatic events (such as accidents) often cause physical injuries. Pain and PTSD can amplify each other in a vicious cycle.</li>
          <li><strong>Other Anxiety Disorders:</strong> Generalized anxiety, social anxiety, and panic disorder frequently co-occur with PTSD.</li>
        </ul>

        <h2 id="recovery" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Path to Recovery
        </h2>
        <p className="mb-6">
          Recovery from PTSD is not about forgetting the trauma — it is about processing it in a way that allows the memory to exist without dominating your life. With treatment, the traumatic memory moves from being an ever-present, vivid experience to a painful but tolerable part of your history.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Acknowledge What Happened',
              description: (
                <p>Recovery begins with acknowledging that something traumatic occurred and that it has affected you. This is not about blame or weakness — it is about honesty. Many people minimize their experiences or compare their trauma to others' — your experience is valid.</p>
              ),
            },
            {
              title: 'Seek Specialized Help',
              description: (
                <p>Not all therapists are trained in trauma-focused treatments. Specifically seek out a provider trained in CPT, PE, or EMDR. General talk therapy is less effective for PTSD than these structured, evidence-based approaches.</p>
              ),
            },
            {
              title: 'Build Safety and Stability',
              description: (
                <p>Before processing trauma, establish a foundation of safety: stable housing, basic self-care routines, grounding techniques, and a support network you can rely on during difficult moments.</p>
              ),
            },
            {
              title: 'Process the Trauma',
              description: (
                <p>With professional guidance, work through the traumatic memories using an evidence-based protocol. This is the hardest part of treatment but also the most transformative. Symptoms typically worsen briefly before improving — this is expected and normal.</p>
              ),
            },
            {
              title: 'Rebuild and Reconnect',
              description: (
                <p>As trauma processing reduces symptom severity, focus on rebuilding areas of life that were affected: relationships, career goals, hobbies, and social engagement. Many people discover post-traumatic growth — new strengths, deeper compassion, and a changed perspective on what matters.</p>
              ),
            },
          ]}
        />

        <QuoteBlock
          quote="Trauma creates change you don't choose. Healing is about creating change you do choose."
          attribution="Dr. Michele Rosenthal"
          role="Trauma Recovery Specialist"
          source="Your Life After Trauma"
          variant="large"
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you have been experiencing trauma-related symptoms — flashbacks, nightmares, avoidance, emotional numbing, hypervigilance — for more than a month after a traumatic event, seek a professional evaluation. You do not need to wait until symptoms become severe.
        </p>
        <p className="mb-6">
          Seek help immediately if you are experiencing:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Suicidal thoughts or thoughts of self-harm</li>
          <li>Flashbacks so intense that you lose awareness of your surroundings</li>
          <li>Using alcohol or drugs to cope with trauma-related symptoms</li>
          <li>Inability to maintain daily responsibilities (work, childcare, self-care)</li>
          <li>Increasing isolation from people you care about</li>
          <li>Aggressive or self-destructive behavior</li>
        </ul>

        <ArticleCallout variant="warning" title="You Are Not Alone">
          <p>Contact the <strong>988 Suicide and Crisis Lifeline</strong> (call or text 988) for immediate support. <strong>Veterans</strong> can press 1 after dialing for the Veterans Crisis Line. The <strong>SAMHSA National Helpline</strong> (1-800-662-4357) provides referrals to local treatment and support groups. Recovery is possible, and help is available right now.</p>
        </ArticleCallout>

        <p className="mb-6">
          PTSD changes the brain, but the brain can change again. The neuroplasticity that makes trauma so impactful is the same neuroplasticity that makes recovery possible. With the right treatment, support, and time, people who have experienced the worst that life can deliver go on to live lives of meaning, connection, and even joy.
        </p>
      </>
    ),
  },
];
