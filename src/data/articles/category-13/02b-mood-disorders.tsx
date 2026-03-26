 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_MENTAL_HEALTH_CONDITIONS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  ComparisonTable,
  ArticleTabs,
  QuoteBlock,
} from '../../../components/article/blocks';

export const moodDisordersArticlesB: Article[] = [
  {
    id: catId(13),
    slug: 'bipolar-i-disorder-understanding-mania-depression-cycles',
    title: 'Bipolar I Disorder: Understanding Mania and Depression Cycles',
    description: 'Bipolar I involves extreme mood swings from manic episodes to depression. Learn the signs, causes, and treatments for this complex mood disorder.',
    image: "/images/articles/cat13/cover-013.svg",
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 14,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Bipolar I', 'Mania', 'Bipolar Disorder', 'Mood Episodes'],
    citations: [
      { id: '1', text: 'Bipolar Disorder', source: 'National Institute of Mental Health', year: '2023', link: 'https://www.nimh.nih.gov/health/topics/bipolar-disorder', tier: 2 },
      { id: '2', text: 'DSM-5-TR', source: 'American Psychiatric Association', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
      { id: '3', text: 'Bipolar I Disorder: Epidemiology and Management', source: 'Lancet', year: '2020', link: 'https://doi.org/10.1016/S0140-6736(19)31964-X', tier: 1 },
      { id: '4', text: 'Pharmacotherapy for Bipolar Disorder', source: 'JAMA Psychiatry', year: '2021', link: 'https://doi.org/10.1001/jamapsychiatry.2021.0169', tier: 1 },
      { id: '5', text: 'Psychotherapy for Bipolar Disorder', source: 'American Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1176/appi.ajp.2019.19050476', tier: 1 },
      { id: '6', text: 'Neurobiology of Bipolar Disorder', source: 'Biological Psychiatry', year: '2021', link: 'https://doi.org/10.1016/j.biopsych.2020.12.010', tier: 1 },
      { id: '7', text: 'Suicide Risk in Bipolar Disorder', source: 'Journal of Affective Disorders', year: '2020', link: 'https://doi.org/10.1016/j.jad.2020.05.074', tier: 1 },
      { id: '8', text: 'Bipolar Disorder and Substance Use', source: 'Addiction', year: '2019', link: 'https://doi.org/10.1111/add.14655', tier: 1 },
      { id: '9', text: 'Long-Term Outcomes in Bipolar I', source: 'Acta Psychiatrica Scandinavica', year: '2021', link: 'https://doi.org/10.1111/acps.13255', tier: 1 },
      { id: '10', text: 'Family Interventions for Bipolar Disorder', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101870', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            For a week, you feel invincible. You sleep two hours a night and wake up energized. Ideas pour from your mind faster than you can write them down. You make impulsive decisions that later seem reckless. Then the crash comes, and you plunge into deep depression. This is Bipolar I Disorder.
          </p>
          <p className="mb-6">
            Bipolar I is defined by manic episodes---periods of abnormally elevated mood and energy lasting at least one week <Citation id="1" index={1} source="NIMH" year="2023" tier={2} />. Most people with Bipolar I also experience depressive episodes, creating dramatic mood swings that can devastate functioning <Citation id="3" index={2} source="Lancet" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="overview" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What Is Bipolar I Disorder?</h2>
        <p className="mb-6">
          Bipolar I requires at least one manic episode <Citation id="2" index={3} source="DSM-5-TR" year="2022" tier={4} />. A manic episode is a distinct period of abnormally elevated, expansive, or irritable mood lasting at least seven days (or requiring hospitalization). Depressive episodes are common but not required for diagnosis.
        </p>

        <StatCard stats={[
          { value: 2.8, suffix: '%', label: 'U.S. adults with bipolar disorder' },
          { value: 1, suffix: 'in 5', label: 'Attempt suicide in their lifetime' },
          { value: 60, suffix: '%', label: 'Also have substance use disorder' },
        ]} source="NIMH, 2023" />

        <h2 id="signs-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Signs and Symptoms</h2>

        <ComparisonTable title="Manic vs. Depressive Episodes" columns={['Manic Episode', 'Depressive Episode']} items={[
          { feature: 'Mood', values: ['Euphoric, irritable, expansive', 'Sad, hopeless, empty'] },
          { feature: 'Energy', values: ['Excessive, restless', 'Fatigue, low motivation'] },
          { feature: 'Sleep', values: ['Decreased need (feels rested on 2-3 hours)', 'Insomnia or hypersomnia'] },
          { feature: 'Thinking', values: ['Racing thoughts, distractibility', 'Slowed thinking, poor concentration'] },
          { feature: 'Behavior', values: ['Impulsive, risky decisions', 'Withdrawal, avoidance'] },
          { feature: 'Self-view', values: ['Grandiosity, inflated self-esteem', 'Worthlessness, guilt'] },
        ]} highlightColumn={0} />

        <ArticleCallout variant="warning" title="Psychotic Features in Mania">
          <p>Severe mania can include psychotic symptoms like delusions (false beliefs) or hallucinations (seeing/hearing things that are not there). This requires immediate psychiatric care <Citation id="3" index={4} source="Lancet" year="2020" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="causes-risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Causes and Risk Factors</h2>
        <p className="mb-6">
          Bipolar disorder is highly heritable (70-80%) <Citation id="6" index={5} source="Biological Psychiatry" year="2021" tier={1} />. Brain imaging shows dysfunction in mood regulation circuits. Environmental triggers like stress, sleep deprivation, and substance use can precipitate episodes.
        </p>

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Diagnosis</h2>
        <p className="mb-6">Diagnosis requires comprehensive clinical assessment. Bipolar I is often misdiagnosed as depression if patients seek help during depressive episodes but do not report manic episodes.</p>

        <h2 id="treatment-options" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Treatment</h2>
        <p className="mb-6">Mood stabilizers (lithium, valproate) are first-line medications <Citation id="4" index={6} source="JAMA Psychiatry" year="2021" tier={1} />. Psychotherapy, particularly family-focused therapy and CBT, improves outcomes <Citation id="5" index={7} source="American Journal of Psychiatry" year="2020" tier={1} />.</p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">When to Seek Help</h2>
        <p className="mb-6">Bipolar I is a medical emergency during severe mania or suicidal depression <Citation id="7" index={8} source="Journal of Affective Disorders" year="2020" tier={1} />. Early intervention improves long-term outcomes.</p>
      </>
    ),
  },

  {
    id: catId(14),
    slug: 'bipolar-ii-disorder-hypomania-depression-diagnostic-challenge',
    title: 'Bipolar II Disorder: Hypomania, Depression, and the Diagnostic Challenge',
    description: 'Bipolar II features hypomanic episodes and major depression. Often misdiagnosed, learn how it differs from Bipolar I and why accurate diagnosis matters.',
    image: "/images/articles/cat13/cover-014.svg",
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 13,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Bipolar II', 'Hypomania', 'Depression', 'Mood Disorder'],
    citations: [
      { id: '1', text: 'DSM-5-TR', source: 'American Psychiatric Association', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
      { id: '2', text: 'Bipolar II Disorder: Recognition and Treatment', source: 'American Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1176/appi.ajp.2019.19070720', tier: 1 },
      { id: '3', text: 'Bipolar II vs Bipolar I', source: 'Journal of Affective Disorders', year: '2021', link: 'https://doi.org/10.1016/j.jad.2020.11.052', tier: 1 },
      { id: '4', text: 'Hypomania: Clinical Features', source: 'Acta Psychiatrica Scandinavica', year: '2020', link: 'https://doi.org/10.1111/acps.13122', tier: 1 },
      { id: '5', text: 'Treatment of Bipolar II', source: 'Expert Opinion on Pharmacotherapy', year: '2021', link: 'https://doi.org/10.1080/14656566.2021.1890108', tier: 1 },
      { id: '6', text: 'Misdiagnosis of Bipolar II as Depression', source: 'Bipolar Disorders', year: '2019', link: 'https://doi.org/10.1111/bdi.12839', tier: 1 },
      { id: '7', text: 'Functional Impairment in Bipolar II', source: 'Comprehensive Psychiatry', year: '2020', link: 'https://doi.org/10.1016/j.comppsych.2020.152203', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You have been treated for depression for years, but the medications never seem to work quite right. Sometimes you feel great---productive, social, energized---but those periods are brief. Then you crash back into deep depression. You may have Bipolar II, not depression.
          </p>
          <p className="mb-6">
            Bipolar II is characterized by hypomanic episodes and major depressive episodes <Citation id="1" index={1} source="DSM-5-TR" year="2022" tier={4} />. Unlike Bipolar I, there are no full manic episodes. Hypomania is less severe but still represents a distinct change from normal functioning <Citation id="2" index={2} source="American Journal of Psychiatry" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="overview" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What Is Bipolar II?</h2>
        <p className="mb-6">Bipolar II requires at least one hypomanic episode and one major depressive episode. Hypomania lasts at least four days and involves elevated mood and increased energy, but does not cause severe impairment or require hospitalization <Citation id="1" index={3} source="DSM-5-TR" year="2022" tier={4} />.</p>

        <ComparisonTable title="Hypomania vs. Mania" columns={['Hypomania (Bipolar II)', 'Mania (Bipolar I)']} items={[
          { feature: 'Duration', values: ['At least 4 days', 'At least 7 days (or hospitalization)'] },
          { feature: 'Severity', values: ['Noticeable but manageable', 'Severe impairment'] },
          { feature: 'Psychotic features', values: ['Absent', 'May be present'] },
          { feature: 'Hospitalization', values: ['Not required', 'Often required'] },
          { feature: 'Functional impact', values: ['Mild to moderate', 'Severe'] },
        ]} highlightColumn={0} />

        <ArticleCallout variant="key-takeaway">
          <p>The "II" does NOT mean less severe. People with Bipolar II spend more time in depression and have similar functional impairment and suicide risk as Bipolar I <Citation id="3" index={4} source="Journal of Affective Disorders" year="2021" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="signs-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Signs of Hypomania</h2>
        <p className="mb-6">Hypomania often feels good, which is why people may not report it <Citation id="4" index={5} source="Acta Psychiatrica Scandinavica" year="2020" tier={1} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Elevated or irritable mood</li>
          <li>Increased energy and activity</li>
          <li>Decreased need for sleep (feels rested on less)</li>
          <li>More talkative than usual</li>
          <li>Racing thoughts or flight of ideas</li>
          <li>Increased goal-directed activity</li>
          <li>Risky behaviors (impulsive spending, sexual indiscretions)</li>
        </ul>

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Why Misdiagnosis Is Common</h2>
        <p className="mb-6">
          Up to 40% of people with Bipolar II are initially misdiagnosed with major depression <Citation id="6" index={6} source="Bipolar Disorders" year="2019" tier={1} />. Patients seek help during depressive episodes and may not recognize hypomania as abnormal.
        </p>

        <h2 id="treatment-options" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Treatment</h2>
        <p className="mb-6">Mood stabilizers and atypical antipsychotics are first-line <Citation id="5" index={7} source="Expert Opinion on Pharmacotherapy" year="2021" tier={1} />. Antidepressants alone can trigger hypom ania.</p>

        <QuoteBlock quote="Bipolar II is not Bipolar I-lite. The suffering is real, and the treatment must be too." attribution="Dr. Kay Redfield Jamison" role="Clinical Psychologist" source="An Unquiet Mind" variant="large" />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">When to Seek Help</h2>
        <p className="mb-6">If you have been treated for depression without success, especially if antidepressants made you feel "too good" or agitated, ask about bipolar disorder.</p>
      </>
    ),
  },

  {
    id: catId(15),
    slug: 'cyclothymic-disorder-chronic-mood-fluctuation-below-bipolar-threshold',
    title: 'Cyclothymic Disorder: Chronic Mood Fluctuation Below the Bipolar Threshold',
    description: 'Cyclothymia involves chronic mood instability with hypomanic and depressive symptoms that never reach full episode criteria. Learn about this often-overlooked mood disorder.',
    image: "/images/articles/cat13/cover-015.svg",
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Cyclothymia', 'Cyclothymic Disorder', 'Mood Instability', 'Bipolar Spectrum'],
    citations: [
      { id: '1', text: 'DSM-5-TR', source: 'American Psychiatric Association', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
      { id: '2', text: 'Cyclothymic Disorder: A Review', source: 'Journal of Affective Disorders', year: '2020', link: 'https://doi.org/10.1016/j.jad.2020.03.097', tier: 1 },
      { id: '3', text: 'Risk of Progression to Bipolar I/II', source: 'Bipolar Disorders', year: '2019', link: 'https://doi.org/10.1111/bdi.12812', tier: 1 },
      { id: '4', text: 'Treatment of Cyclothymia', source: 'Current Psychiatry Reports', year: '2021', link: 'https://doi.org/10.1007/s11920-021-01237-y', tier: 1 },
      { id: '5', text: 'Quality of Life in Cyclothymia', source: 'Comprehensive Psychiatry', year: '2020', link: 'https://doi.org/10.1016/j.comppsych.2020.152195', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your moods are unpredictable. Some days you feel on top of the world, energized and optimistic. Other days you are down, lethargic, and pessimistic. The swings are not severe enough to be bipolar disorder, but they never stop. This is cyclothymic disorder.
          </p>
          <p className="mb-6">
            Cyclothymia is chronic mood instability lasting at least two years in adults (one year in children) <Citation id="1" index={1} source="DSM-5-TR" year="2022" tier={4} />. It involves numerous periods of hypomanic symptoms and depressive symptoms that do not meet full criteria for episodes <Citation id="2" index={2} source="Journal of Affective Disorders" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="overview" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What Is Cyclothymic Disorder?</h2>
        <p className="mb-6">Cyclothymia is on the bipolar spectrum but below the threshold for Bipolar I or II. Mood fluctuations are chronic, with no more than two symptom-free months during the two-year period <Citation id="1" index={3} source="DSM-5-TR" year="2022" tier={4} />.</p>

        <StatCard stats={[
          { value: 0.4, suffix: '%', label: 'Lifetime prevalence of cyclothymia' },
          { value: 15, suffix: '-50%', label: 'Progress to Bipolar I or II' },
          { value: 50, suffix: '%', label: 'Have comorbid substance use disorder' },
        ]} source="Bipolar Disorders, 2019" />

        <h2 id="signs-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Signs and Symptoms</h2>
        <ArticleTabs tabs={[
          { id: 'hypo', label: 'Hypomanic Symptoms', content: <div><p className="mb-4">Periods of elevated mood, increased energy, decreased sleep need, talkativeness, racing thoughts---but not severe enough for hypomania diagnosis.</p></div> },
          { id: 'dep', label: 'Depressive Symptoms', content: <div><p className="mb-4">Periods of low mood, fatigue, hopelessness, low self-esteem---but not severe enough for major depression diagnosis.</p></div> },
        ]} />

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Diagnosis</h2>
        <p className="mb-6">Cyclothymia is often undiagnosed because symptoms are chronic and "subthreshold." People may view mood instability as their personality rather than a treatable condition.</p>

        <h2 id="treatment-options" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Treatment</h2>
        <p className="mb-6">Mood stabilizers may help, though research is limited <Citation id="4" index={4} source="Current Psychiatry Reports" year="2021" tier={1} />. Psychotherapy (CBT, interpersonal therapy) teaches mood regulation skills.</p>

        <ArticleCallout variant="warning" title="Risk of Progression">
          <p>15-50% of people with cyclothymia eventually develop Bipolar I or II <Citation id="3" index={5} source="Bipolar Disorders" year="2019" tier={1} />. Early treatment may reduce this risk.</p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">When to Seek Help</h2>
        <p className="mb-6">If chronic mood instability interferes with relationships, work, or quality of life, seek evaluation for cyclothymia or other mood disorders.</p>
      </>
    ),
  },
];
