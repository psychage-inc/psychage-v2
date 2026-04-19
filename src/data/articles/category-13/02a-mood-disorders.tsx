 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_MENTAL_HEALTH_CONDITIONS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  ArticleTabs,
  QuoteBlock,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

export const moodDisordersArticlesA: Article[] = [
  {
    id: catId(11),
    slug: 'major-depressive-episode-diagnosis-symptoms-path-to-treatment',
    status: 'draft',
    title: 'Major Depressive Episode: Diagnosis, Symptoms, and the Path to Treatment',
    description: 'A major depressive episode is more than sadness. Learn the diagnostic criteria, symptoms, and evidence-based treatments that offer hope and recovery.',
    image: "/images/articles/cat13/cover-011.svg",
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 14,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Major Depression', 'MDE', 'Depression Treatment', 'Mental Health'],
    summary: 'A major depressive episode is a period of at least two weeks marked by profound sadness or loss of interest, along with physical and cognitive symptoms that significantly impair daily functioning. Understanding the diagnostic criteria, biological underpinnings, and evidence-based treatments is essential for recognizing when to seek help and what recovery looks like.',
    keyFacts: [
      { text: 'Approximately 21% of adults will experience at least one major depressive episode in their lifetime', citationIndex: 2 },
      { text: '21 million U.S. adults had depression in 2021, with women experiencing it 1.7 times more often than men', citationIndex: 1 },
      { text: 'Depression involves dysfunction in brain circuits responsible for mood regulation, particularly in the prefrontal cortex, hippocampus, and amygdala', citationIndex: 6 },
      { text: 'Combined treatment (therapy plus medication) is often more effective than either alone, particularly for severe depression', citationIndex: 8 },
      { text: 'Depression significantly increases the risk of suicidal thoughts and behaviors, making immediate crisis support essential', citationIndex: 10 },
    ],
    sparkMoment: 'Depression is not a character flaw or weakness — it is a medical condition with biological roots that requires treatment, and with the right support, recovery is not just possible but probable.',
    practicalExercise: {
      title: 'Daily Mood and Activity Tracking',
      steps: [
        { title: 'Track Your Mood', description: 'Each morning and evening, rate your mood on a scale of 1-10 and note any significant events or stressors.' },
        { title: 'Identify Patterns', description: 'After one week, review your entries to spot patterns — when does your mood dip? What activities or situations correlate with better or worse mood?' },
        { title: 'Schedule One Pleasant Activity Daily', description: 'Even if you don\'t feel like it, engage in one activity that previously brought you pleasure or a sense of accomplishment, such as a walk, listening to music, or calling a friend.' },
        { title: 'Reflect on Progress', description: 'At the end of two weeks, review your mood log. Notice any small shifts or moments of relief. Share findings with a therapist or trusted person.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Try the Mood Journal',
    },
    citations: [
      {
        id: '1',
        text: 'Major Depressive Disorder',
        source: 'National Institute of Mental Health',
        year: '2023',
        link: 'https://www.nimh.nih.gov/health/topics/depression',
        tier: 2,
      },
      {
        id: '2',
        text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.books.9780890425787',
        tier: 4,
      },
      {
        id: '3',
        text: 'The Epidemiology of Major Depressive Disorder: Results from the National Comorbidity Survey Replication',
        source: 'JAMA',
        year: '2003',
        link: 'https://doi.org/10.1001/jama.289.23.3095',
        tier: 1,
      },
      {
        id: '4',
        text: 'Cognitive Behavioral Therapy for Depression: A Meta-Analysis of Randomized Controlled Trials',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.101999',
        tier: 1,
      },
      {
        id: '5',
        text: 'Antidepressant Medications: A Review of the Evidence for Drug-Induced Sexual Dysfunction',
        source: 'Journal of Clinical Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.4088/JCP.19r13189',
        tier: 1,
      },
      {
        id: '6',
        text: 'Neurobiology of Depression: An Integrated View',
        source: 'Neuroscience and Biobehavioral Reviews',
        year: '2020',
        link: 'https://doi.org/10.1016/j.neubiorev.2020.04.003',
        tier: 1,
      },
      {
        id: '7',
        text: 'Psychotherapy for Major Depressive Disorder and Generalized Anxiety Disorder: A Systematic Review',
        source: 'Annals of Internal Medicine',
        year: '2021',
        link: 'https://doi.org/10.7326/M20-6382',
        tier: 1,
      },
      {
        id: '8',
        text: 'Transcranial Magnetic Stimulation for Treatment-Resistant Depression: A Meta-Analysis',
        source: 'JAMA Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1001/jamapsychiatry.2020.0140',
        tier: 1,
      },
      {
        id: '9',
        text: 'Functional Impairment in Major Depressive Disorder',
        source: 'Depression and Anxiety',
        year: '2019',
        link: 'https://doi.org/10.1002/da.22950',
        tier: 1,
      },
      {
        id: '10',
        text: 'Suicidal Ideation and Behavior in Major Depressive Disorder',
        source: 'American Journal of Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1176/appi.ajp.2020.20030325',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            You wake up exhausted even after sleeping for ten hours. Nothing brings you joy --- not your favorite music, not time with friends, not the activities you once loved. You feel like you are moving through life in slow motion, underwater, disconnected from everything. This is what a major depressive episode feels like.
          </p>
          <p className="mb-6">
            A major depressive episode (MDE) is the defining feature of major depressive disorder (MDD). It is not simply feeling sad or having a bad week. It is a debilitating condition that affects mood, thinking, physical health, and functioning <Citation id="1" index={1} source="NIMH" year="2023" tier={2} />. Approximately 21 percent of adults will experience at least one major depressive episode in their lifetime <Citation id="3" index={2} source="JAMA" year="2003" tier={1} />.
          </p>
        </div>

        <h2 id="overview" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is a Major Depressive Episode?
        </h2>
        <p className="mb-6">
          A major depressive episode is a period of at least two weeks during which a person experiences either depressed mood or loss of interest or pleasure in nearly all activities, along with several other symptoms <Citation id="2" index={3} source="DSM-5-TR" year="2022" tier={4} />.
        </p>
        <p className="mb-6">
          The key features are:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Pervasive impact:</strong> Symptoms are present most of the day, nearly every day</li>
          <li><strong>Functional impairment:</strong> The episode causes significant distress or impairment in work, relationships, or daily activities</li>
          <li><strong>Duration:</strong> Symptoms persist for at least two weeks (though episodes often last months if untreated)</li>
        </ul>

        <StatCard
          stats={[
            { value: 21, suffix: 'M', label: 'U.S. adults had depression in 2021' },
            { value: 1.7, suffix: 'x', label: 'More common in women than men' },
            { value: 30, suffix: '%', label: 'Experience treatment-resistant depression' },
          ]}
          source="National Institute of Mental Health, 2023"
        />

        <h2 id="signs-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Signs and Symptoms
        </h2>
        <p className="mb-6">
          To meet criteria for a major depressive episode, a person must experience at least five of the following nine symptoms during the same two-week period, with at least one being either depressed mood or loss of interest/pleasure <Citation id="2" index={4} source="DSM-5-TR" year="2022" tier={4} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'emotional',
              label: 'Emotional Symptoms',
              content: (
                <div>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Depressed mood:</strong> Feeling sad, empty, or hopeless most of the day</li>
                    <li><strong>Anhedonia:</strong> Markedly diminished interest or pleasure in all or almost all activities</li>
                    <li><strong>Feelings of worthlessness or excessive guilt:</strong> Often about past events or perceived failures</li>
                    <li><strong>Suicidal thoughts:</strong> Recurrent thoughts of death, suicidal ideation, or suicide attempts</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'cognitive',
              label: 'Cognitive Symptoms',
              content: (
                <div>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Difficulty thinking or concentrating:</strong> Trouble making decisions, brain fog, memory problems</li>
                    <li><strong>Psychomotor agitation or retardation:</strong> Feeling restless or slowed down (observable by others, not just subjective)</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'physical',
              label: 'Physical Symptoms',
              content: (
                <div>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Sleep disturbance:</strong> Insomnia (difficulty falling or staying asleep) or hypersomnia (sleeping too much)</li>
                    <li><strong>Appetite or weight changes:</strong> Significant weight loss or gain, or increase or decrease in appetite</li>
                    <li><strong>Fatigue or loss of energy:</strong> Feeling exhausted even without physical exertion</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning" title="Suicidal Ideation and Depression">
          <p>
            Depression significantly increases the risk of suicidal thoughts and behaviors <Citation id="10" index={5} source="American Journal of Psychiatry" year="2021" tier={1} />. If you are experiencing thoughts of suicide, reach out for help immediately. Call the 988 Suicide and Crisis Lifeline (available 24/7 in the U.S.) or go to your nearest emergency department.
          </p>
        </ArticleCallout>

        <h2 id="causes-risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Causes and Risk Factors
        </h2>
        <p className="mb-6">
          Major depressive episodes result from a complex interaction of genetic, biological, psychological, and environmental factors <Citation id="6" index={6} source="Neuroscience and Biobehavioral Reviews" year="2020" tier={1} />.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'biological',
              title: 'Biological Factors',
              content: (
                <div>
                  <p className="mb-4">
                    Depression involves dysfunction in brain circuits responsible for mood regulation, particularly in the prefrontal cortex, hippocampus, and amygdala. Neurotransmitter imbalances (serotonin, norepinephrine, dopamine) play a central role.
                  </p>
                  <p>Chronic stress can also dysregulate the HPA axis (stress response system), leading to elevated cortisol and increased vulnerability to depression.</p>
                </div>
              ),
            },
            {
              id: 'genetic',
              title: 'Genetic Factors',
              content: (
                <p>Depression has a heritability estimate of 30 to 40 percent. If you have a first-degree relative with depression, your risk is two to three times higher than the general population.</p>
              ),
            },
            {
              id: 'psychological',
              title: 'Psychological Factors',
              content: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cognitive patterns: negative thinking, rumination, pessimistic attributional style</li>
                    <li>Low self-esteem or perfectionism</li>
                    <li>History of trauma or adverse childhood experiences</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'environmental',
              title: 'Environmental Triggers',
              content: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Major life stressors (loss, divorce, job loss, financial hardship)</li>
                    <li>Chronic stress or ongoing difficulties</li>
                    <li>Social isolation or lack of support</li>
                    <li>Chronic medical illness</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How a Major Depressive Episode Is Diagnosed
        </h2>
        <p className="mb-6">
          A mental health professional will conduct a comprehensive clinical interview and may use standardized questionnaires (like the PHQ-9 or Beck Depression Inventory) to assess symptom severity.
        </p>
        <p className="mb-6">
          The clinician will rule out other causes of symptoms, such as:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Medical conditions (thyroid disorders, vitamin deficiencies, neurological conditions)</li>
          <li>Medication side effects or substance use</li>
          <li>Bipolar disorder (where depressive episodes alternate with manic or hypomanic episodes)</li>
          <li>Grief or normal sadness in response to loss</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>
            Depression looks different in different people. Some experience primarily emotional symptoms (sadness, hopelessness), while others experience more physical symptoms (fatigue, pain, sleep disturbance). Both presentations are valid forms of depression.
          </p>
        </ArticleCallout>

        <h2 id="treatment-options" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment Options
        </h2>
        <p className="mb-6">
          Major depressive episodes are highly treatable. The most effective approaches include psychotherapy, medication, and in some cases, neuromodulation therapies.
        </p>

        <ComparisonTable
          title="Evidence-Based Treatments for Major Depression"
          columns={['Treatment', 'How It Works', 'Effectiveness']}
          items={[
            {
              feature: 'Cognitive Behavioral Therapy (CBT)',
              values: [
                'Identifies and changes negative thought patterns and behaviors',
                '50-60% response rate; prevents relapse',
              ],
            },
            {
              feature: 'Interpersonal Therapy (IPT)',
              values: [
                'Addresses relationship issues and life transitions',
                'As effective as CBT for depression',
              ],
            },
            {
              feature: 'SSRIs (e.g., fluoxetine, sertraline)',
              values: [
                'Increase serotonin in the brain',
                '50-60% response rate; 4-6 weeks to take effect',
              ],
            },
            {
              feature: 'SNRIs (e.g., venlafaxine, duloxetine)',
              values: [
                'Increase serotonin and norepinephrine',
                'Effective, especially for severe depression',
              ],
            },
            {
              feature: 'TMS (Transcranial Magnetic Stimulation)',
              values: [
                'Stimulates underactive brain regions',
                'Effective for treatment-resistant depression',
              ],
            },
          ]}
          highlightColumn={2}
        />

        <p className="mb-6">
          <strong>Psychotherapy</strong> is as effective as medication for mild to moderate depression and has the advantage of teaching skills that prevent relapse <Citation id="4" index={7} source="Clinical Psychology Review" year="2021" tier={1} />. CBT and Interpersonal Therapy (IPT) are the two most studied psychotherapies for depression <Citation id="7" index={8} source="Annals of Internal Medicine" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Medication</strong> is often recommended for moderate to severe depression or when psychotherapy alone is not sufficient. SSRIs and SNRIs are first-line medications. Side effects can include nausea, sexual dysfunction, and weight gain <Citation id="5" index={9} source="Journal of Clinical Psychiatry" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Combined treatment</strong> (therapy plus medication) is often more effective than either alone, particularly for severe depression.
        </p>
        <p className="mb-6">
          <strong>Neuromodulation therapies</strong> like Transcranial Magnetic Stimulation (TMS) and Electroconvulsive Therapy (ECT) are options for treatment-resistant depression <Citation id="8" index={10} source="JAMA Psychiatry" year="2020" tier={1} />.
        </p>

        <h2 id="living-with-depression" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Living with a Major Depressive Episode
        </h2>
        <p className="mb-6">
          Depression can profoundly impair functioning, affecting work performance, relationships, and self-care <Citation id="9" index={11} source="Depression and Anxiety" year="2019" tier={1} />. Many people with depression struggle to get out of bed, maintain employment, or engage in social activities.
        </p>
        <p className="mb-6">
          However, depression is treatable, and most people respond to treatment. Here are strategies that support recovery:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Seek Professional Help',
              description: (
                <p>Do not wait for depression to lift on its own. Early treatment leads to better outcomes.</p>
              ),
            },
            {
              title: 'Engage in Behavioral Activation',
              description: (
                <p>Even when you do not feel like it, engage in activities that previously brought you pleasure or a sense of accomplishment. Start small.</p>
              ),
            },
            {
              title: 'Maintain Routine',
              description: (
                <p>Structure your day with consistent sleep, meal, and activity times. Routine provides stability when mood is unstable.</p>
              ),
            },
            {
              title: 'Move Your Body',
              description: (
                <p>Exercise has antidepressant effects. Even a 15-minute walk can help.</p>
              ),
            },
            {
              title: 'Reach Out for Support',
              description: (
                <p>Isolation worsens depression. Connect with trusted friends, family, or support groups.</p>
              ),
            },
          ]}
        />

        <QuoteBlock
          quote="Depression is being colorblind and constantly told how colorful the world is."
          attribution="Atticus"
          role="Poet"
          source="Love Her Wild"
          variant="large"
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          Seek help immediately if you:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Have thoughts of suicide or self-harm</li>
          <li>Feel unable to care for yourself or perform daily tasks</li>
          <li>Have symptoms lasting more than two weeks</li>
          <li>Notice depression is interfering with work, relationships, or health</li>
          <li>Experience psychotic symptoms (hallucinations, delusions)</li>
        </ul>
        <p className="mb-6">
          Depression is not a character flaw or weakness. It is a medical condition that requires treatment. With the right support, recovery is possible, and you can reclaim your life.
        </p>
      </>
    ),
  },

  {
    id: catId(12),
    slug: 'persistent-depressive-disorder-when-depression-becomes-your-baseline',
    status: 'draft',
    title: 'Persistent Depressive Disorder: When Depression Becomes Your Baseline',
    description: 'Persistent depressive disorder (dysthymia) is chronic, low-grade depression lasting years. Learn how it differs from major depression and how to find effective treatment.',
    image: "/images/articles/cat13/cover-012.svg",
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 13,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Dysthymia', 'Persistent Depressive Disorder', 'Chronic Depression', 'PDD'],
    summary: 'Persistent depressive disorder is a chronic, low-grade depression lasting at least two years that becomes so integrated into daily life many people believe it is their personality. Understanding the distinction between chronic dysthymia and episodic major depression, recognizing treatment options, and learning to build quality of life despite ongoing symptoms are key to managing this long-term condition.',
    keyFacts: [
      { text: 'Persistent depressive disorder affects approximately 1.5% of adults in the United States, with symptoms lasting at least two years', citationIndex: 2 },
      { text: '50% of people with PDD have early onset (before age 21), often associated with childhood adversity or trauma', citationIndex: 6 },
      { text: '75% of people with PDD also experience major depressive episodes on top of their baseline depression, a phenomenon called "double depression"', citationIndex: 5 },
      { text: 'Cognitive Behavioral Analysis System of Psychotherapy (CBASP) is a therapy specifically designed for chronic depression', citationIndex: 8 },
      { text: 'Many people with PDD go undiagnosed for years because they think chronic low mood is just "who they are" rather than a treatable condition', citationIndex: 7 },
    ],
    sparkMoment: 'Chronic depression is not a life sentence — it is a treatable condition, and recovery means not just symptom reduction but rediscovering what it feels like to live without the constant weight of depression.',
    practicalExercise: {
      title: 'Building a Routine for Chronic Depression',
      steps: [
        { title: 'Create a Morning Anchor', description: 'Establish one non-negotiable morning activity (e.g., 5-minute stretch, glass of water, opening curtains) to provide structure when motivation is low.' },
        { title: 'Schedule One Social Connection Weekly', description: 'Isolation worsens chronic depression. Commit to one weekly social activity, even if brief — a coffee with a friend, a phone call, or attending a support group.' },
        { title: 'Track Small Wins', description: 'Each evening, write down one thing you accomplished, no matter how small. Over time, this builds evidence that you are capable despite the depression.' },
        { title: 'Engage in Behavioral Activation', description: 'Choose one activity that previously brought pleasure or accomplishment. Do it for 15 minutes, even if you don\'t feel like it. Notice any shifts in mood afterward.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Try the Mood Journal',
    },
    citations: [
      {
        id: '1',
        text: 'Persistent Depressive Disorder (Dysthymia)',
        source: 'National Institute of Mental Health',
        year: '2023',
        link: 'https://www.nimh.nih.gov/health/statistics/persistent-depressive-disorder-dysthymia',
        tier: 2,
      },
      {
        id: '2',
        text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.books.9780890425787',
        tier: 4,
      },
      {
        id: '3',
        text: 'Persistent Depressive Disorder: Clinical Features and Treatment',
        source: 'Journal of Affective Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jad.2020.08.055',
        tier: 1,
      },
      {
        id: '4',
        text: 'Cognitive Behavioral Analysis System of Psychotherapy for Chronic Depression',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.101748',
        tier: 1,
      },
      {
        id: '5',
        text: 'Pharmacotherapy for Persistent Depressive Disorder: A Systematic Review',
        source: 'Journal of Clinical Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.4088/JCP.20r13806',
        tier: 1,
      },
      {
        id: '6',
        text: 'Quality of Life in Patients with Persistent Depressive Disorder',
        source: 'Comprehensive Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1016/j.comppsych.2020.152220',
        tier: 1,
      },
      {
        id: '7',
        text: 'Early-Onset vs. Late-Onset Persistent Depressive Disorder',
        source: 'Depression and Anxiety',
        year: '2019',
        link: 'https://doi.org/10.1002/da.22935',
        tier: 1,
      },
      {
        id: '8',
        text: 'Comorbidity of Persistent Depressive Disorder and Major Depressive Disorder',
        source: 'Journal of Psychiatric Research',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jpsychires.2020.04.016',
        tier: 1,
      },
      {
        id: '9',
        text: 'Treatment-Resistant Persistent Depressive Disorder: Strategies and Outcomes',
        source: 'Psychiatry Research',
        year: '2021',
        link: 'https://doi.org/10.1016/j.psychres.2021.113942',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            You cannot remember a time when you did not feel this way. The sadness, the fatigue, the low self-esteem --- these are not episodes. They are your normal. You have felt this way for so long that you wonder if this is just who you are. This is what persistent depressive disorder feels like.
          </p>
          <p className="mb-6">
            Persistent depressive disorder (PDD), formerly known as dysthymia, is a chronic form of depression in which symptoms last for at least two years in adults (one year in children and adolescents) <Citation id="1" index={1} source="NIMH" year="2023" tier={2} />. It affects approximately 1.5 percent of adults in the United States <Citation id="1" index={2} source="NIMH" year="2023" tier={2} />.
          </p>
        </div>

        <h2 id="overview" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Persistent Depressive Disorder?
        </h2>
        <p className="mb-6">
          PDD is characterized by a depressed mood that lasts for most of the day, more days than not, for at least two years <Citation id="2" index={3} source="DSM-5-TR" year="2022" tier={4} />. The symptoms are typically less severe than a major depressive episode but are chronic and persistent.
          </p>
        <p className="mb-6">
          People with PDD often describe feeling like they have always been this way. The depression becomes integrated into their identity --- they cannot remember what it feels like to not be depressed.
        </p>

        <ArticleChart
          type="line"
          title="Symptom Severity Over Time: MDD vs. PDD"
          data={[
            { label: 'Month 1', value: 40 },
            { label: 'Month 6', value: 38 },
            { label: 'Month 12', value: 42 },
            { label: 'Month 18', value: 40 },
            { label: 'Month 24', value: 39 },
          ]}
          source="Illustrative comparison of chronic low-grade symptoms"
        />

        <h2 id="signs-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Signs and Symptoms
        </h2>
        <p className="mb-6">
          To meet criteria for PDD, a person must have a depressed mood for at least two years, along with at least two of the following symptoms <Citation id="2" index={4} source="DSM-5-TR" year="2022" tier={4} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Poor appetite or overeating</li>
          <li>Insomnia or hypersomnia</li>
          <li>Low energy or fatigue</li>
          <li>Low self-esteem</li>
          <li>Poor concentration or difficulty making decisions</li>
          <li>Feelings of hopelessness</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            The key difference between PDD and major depression is <strong>duration and severity</strong>. PDD is chronic and low-grade. Major depressive episodes are more severe but episodic. However, people with PDD can also experience major depressive episodes on top of their baseline depression (called "double depression") <Citation id="8" index={5} source="Journal of Psychiatric Research" year="2020" tier={1} />.
          </p>
        </ArticleCallout>

        <ComparisonTable
          title="Persistent Depressive Disorder vs. Major Depressive Disorder"
          columns={['Feature', 'Persistent Depressive Disorder', 'Major Depressive Disorder']}
          items={[
            {
              feature: 'Duration',
              values: ['At least 2 years (chronic)', 'At least 2 weeks (episodic)'],
            },
            {
              feature: 'Severity',
              values: ['Mild to moderate', 'Moderate to severe'],
            },
            {
              feature: 'Number of symptoms required',
              values: ['2+ (in addition to depressed mood)', '5+ (including depressed mood or anhedonia)'],
            },
            {
              feature: 'Course',
              values: ['Chronic, low-grade baseline', 'Discrete episodes with periods of remission'],
            },
          ]}
          highlightColumn={1}
        />

        <h2 id="causes-risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Causes and Risk Factors
        </h2>
        <p className="mb-6">
          PDD has similar risk factors to major depression, but early onset (before age 21) is particularly common <Citation id="7" index={6} source="Depression and Anxiety" year="2019" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 1.5, suffix: '%', label: 'U.S. adults with PDD annually' },
            { value: 50, suffix: '%', label: 'Have early onset (before age 21)' },
            { value: 75, suffix: '%', label: 'Also experience major depressive episodes' },
          ]}
          source="NIMH, 2023"
        />

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'early-onset',
              title: 'Early-Onset PDD',
              content: (
                <div>
                  <p className="mb-4">Early-onset PDD (before age 21) is associated with:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Childhood adversity or trauma</li>
                    <li>Family history of mood disorders</li>
                    <li>More severe functional impairment</li>
                    <li>Higher rates of comorbid anxiety and substance use</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'late-onset',
              title: 'Late-Onset PDD',
              content: (
                <div>
                  <p className="mb-4">Late-onset PDD (after age 21) may be triggered by:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Chronic stress or major life difficulties</li>
                    <li>Chronic medical illness</li>
                    <li>Loss or bereavement that does not resolve</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'biological',
              title: 'Biological and Genetic Factors',
              content: (
                <p>Like major depression, PDD involves neurotransmitter imbalances and brain circuit dysfunction. Genetics play a significant role, particularly in early-onset PDD.</p>
              ),
            },
            {
              id: 'psychological',
              title: 'Psychological Patterns',
              content: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Negative thinking patterns that become deeply ingrained over time</li>
                    <li>Learned helplessness from chronic stress or lack of control</li>
                    <li>Low self-esteem and pessimistic worldview</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How PDD Is Diagnosed
        </h2>
        <p className="mb-6">
          Diagnosis can be challenging because people with PDD often do not realize they are depressed. They may think, "This is just how I am." A mental health professional will assess:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Duration of symptoms (at least two years)</li>
          <li>Presence of depressed mood and at least two additional symptoms</li>
          <li>No symptom-free periods longer than two months during the two-year period</li>
          <li>Functional impairment or distress</li>
          <li>Ruling out other conditions (medical causes, substance use, bipolar disorder)</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>
            Many people with PDD are initially misdiagnosed or go undiagnosed for years. They may seek help for anxiety, insomnia, or physical symptoms without recognizing that chronic depression is the underlying issue <Citation id="3" index={7} source="Journal of Affective Disorders" year="2020" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="treatment-options" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment Options
        </h2>
        <p className="mb-6">
          PDD is treatable, though it often requires long-term treatment. A combination of psychotherapy and medication is typically most effective.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Cognitive Behavioral Analysis System of Psychotherapy (CBASP)',
              description: (
                <div>
                  <p className="mb-4">
                    CBASP is a psychotherapy specifically designed for chronic depression <Citation id="4" index={8} source="Clinical Psychology Review" year="2019" tier={1} />. It helps you identify how your thoughts and behaviors contribute to interpersonal problems and teaches skills to improve relationships and problem-solving.
                  </p>
                </div>
              ),
            },
            {
              title: 'Other Psychotherapies',
              description: (
                <p>CBT, Interpersonal Therapy (IPT), and psychodynamic therapy can also be effective, particularly when adapted for chronic depression.</p>
              ),
            },
            {
              title: 'Medication',
              description: (
                <div>
                  <p className="mb-4">
                    SSRIs and SNRIs are first-line medications for PDD <Citation id="5" index={9} source="Journal of Clinical Psychiatry" year="2021" tier={1} />. Because PDD is chronic, medication is often needed long-term to prevent relapse.
                  </p>
                </div>
              ),
            },
            {
              title: 'Combined Treatment',
              description: (
                <p>Combining psychotherapy and medication produces better outcomes than either alone for PDD.</p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="tip">
          <p>Because PDD is chronic, treatment focuses not just on symptom reduction but on <strong>improving quality of life</strong> --- helping you engage in meaningful activities, build relationships, and develop a sense of purpose despite ongoing vulnerability to low mood.</p>
        </ArticleCallout>

        <h2 id="living-with-pdd" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Living with Persistent Depressive Disorder
        </h2>
        <p className="mb-6">
          PDD can profoundly affect quality of life, leading to chronic underemployment, social isolation, and physical health problems <Citation id="6" index={10} source="Comprehensive Psychiatry" year="2020" tier={1} />. The persistent nature of the condition can erode hope and motivation over time.
        </p>
        <p className="mb-6">
          However, many people with PDD can achieve significant improvement with treatment. Recovery may not mean being symptom-free, but it can mean:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Reduced symptom severity and frequency</li>
          <li>Improved functioning at work and in relationships</li>
          <li>Greater ability to experience pleasure and connection</li>
          <li>A sense of agency and hope for the future</li>
        </ul>

        <BeforeAfter
          before={{
            title: 'Before Treatment',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"This is just who I am"</li>
                <li>Chronic fatigue and low motivation</li>
                <li>Social isolation</li>
                <li>Difficulty maintaining employment</li>
                <li>Feeling hopeless about change</li>
              </ul>
            ),
          }}
          after={{
            title: 'After Treatment',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I can manage this"</li>
                <li>Improved energy and engagement</li>
                <li>Reconnecting with others</li>
                <li>Stable work performance</li>
                <li>Hope and purpose</li>
              </ul>
            ),
          }}
        />

        <QuoteBlock
          quote="I have lived with this depression for so long that I thought it was my personality. Treatment showed me that I am more than my symptoms."
          attribution="Anonymous"
          role="Person Living with PDD"
          source="Mental Health Forum"
          variant="default"
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you have felt down, hopeless, or fatigued for years, do not accept it as "just how you are." Seek help if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You have felt depressed for at least two years</li>
          <li>Your mood is affecting your work, relationships, or health</li>
          <li>You feel hopeless about the possibility of change</li>
          <li>You have thoughts of self-harm or suicide</li>
          <li>You notice your symptoms are worsening</li>
        </ul>
        <p className="mb-6">
          Chronic depression is not a life sentence. With the right treatment, you can rediscover what it feels like to live without the constant weight of depression.
        </p>
      </>
    ),
  },
];
