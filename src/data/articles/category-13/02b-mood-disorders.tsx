 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_MENTAL_HEALTH_CONDITIONS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  ComparisonTable,
  ArticleTabs,
  QuoteBlock,
  ArticleAccordion,
  BeforeAfter,
  ArticleChart,
  MythVsFactBlock,
} from '../../../components/article/blocks';

export const moodDisordersArticlesB: Article[] = [
  {
    id: catId(13),
    slug: 'bipolar-i-disorder-understanding-mania-depression-cycles',
    status: 'published',
    title: 'Bipolar I Disorder: Understanding Mania and Depression Cycles',
    description: 'Bipolar I involves extreme mood swings from manic episodes to depression. Learn the signs, causes, and treatments for this complex mood disorder.',
    image: "/images/articles/cat13/cover-013.svg",
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Bipolar I', 'Mania', 'Bipolar Disorder', 'Mood Episodes'],
    summary: 'Bipolar I Disorder is characterized by extreme mood swings between manic episodes and depression. This guide explains the diagnostic criteria, symptoms, neurobiological causes, and evidence-based treatments that can help people with Bipolar I live stable, fulfilling lives.',
    keyFacts: [
      { text: 'Bipolar I affects 2.8% of U.S. adults and is highly heritable, with 70-80% of risk attributed to genetics.', citationIndex: 1 },
      { text: 'A manic episode must last at least seven days or require hospitalization, with abnormally elevated mood and increased energy.', citationIndex: 3 },
      { text: 'One in five people with bipolar disorder attempt suicide in their lifetime, making it a high-risk condition.', citationIndex: 1 },
      { text: 'Lithium and valproate are first-line mood stabilizers, with evidence showing they reduce episode recurrence by 40-50%.', citationIndex: 4 },
      { text: 'Family-focused therapy combined with medication improves outcomes significantly compared to medication alone.', citationIndex: 5 },
    ],
    sparkMoment: 'Bipolar I is not a character flaw or a lack of willpower---it is a brain-based medical condition as real as diabetes, and equally treatable with the right care.',
    practicalExercise: {
      title: 'Mood Tracking for Early Warning Signs',
      steps: [
        { title: 'Set Up Daily Check-In', description: 'Each evening, rate your mood, energy, sleep hours, and impulsivity on a 1-10 scale.' },
        { title: 'Identify Your Baseline', description: 'After 2 weeks, review patterns to understand what "normal" looks like for you.' },
        { title: 'Spot Early Warning Signs', description: 'Watch for 3+ days of decreased sleep need, racing thoughts, or increased spending as mania signals.' },
        { title: 'Share with Your Treatment Team', description: 'Bring your tracking data to appointments to adjust treatment before full episodes develop.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Try the Mood Journal',
    },
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
      { id: '11', text: 'Lithium in Bipolar Disorder: 70 Years of Evidence', source: 'International Journal of Bipolar Disorders', year: '2020', link: 'https://doi.org/10.1186/s40345-020-00191-4', tier: 1 },
      { id: '12', text: 'Sleep and Circadian Rhythm Disruption in Bipolar Disorder', source: 'Psychological Medicine', year: '2021', link: 'https://doi.org/10.1017/S0033291720003657', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            For a week, you feel invincible. You sleep two hours a night and wake up energized. Ideas pour from your mind faster than you can write them down. You make impulsive decisions that later seem reckless. Then the crash comes, and you plunge into deep depression. This is Bipolar I Disorder.
          </p>
          <p className="mb-6">
            Bipolar I is defined by manic episodes---periods of abnormally elevated mood and energy lasting at least one week <Citation id="1" index={1} source="NIMH" year="2023" tier={2} />. Most people with Bipolar I also experience depressive episodes, creating dramatic mood swings that can devastate functioning <Citation id="3" index={2} source="Lancet" year="2020" tier={1} />. This is not simply "mood swings" everyone experiences. These are extreme shifts in energy, thinking, and behavior that can lead to hospitalization, lost jobs, broken relationships, and even suicide.
          </p>
          <p className="mb-6">
            The condition affects approximately 2.8% of U.S. adults in their lifetime <Citation id="1" index={1} source="NIMH" year="2023" tier={2} />. While Bipolar I typically emerges in late adolescence or early adulthood, it can develop at any age. Understanding the neurobiology, recognizing the warning signs, and accessing evidence-based treatment can transform outcomes.
          </p>
        </div>

        <h2 id="overview" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What Is Bipolar I Disorder?</h2>
        <p className="mb-6">
          Bipolar I requires at least one manic episode <Citation id="2" index={3} source="DSM-5-TR" year="2022" tier={4} />. A manic episode is a distinct period of abnormally elevated, expansive, or irritable mood lasting at least seven days (or requiring hospitalization if symptoms are severe). The mood disturbance must be accompanied by increased energy or goal-directed activity, plus at least three additional symptoms such as decreased need for sleep, racing thoughts, or reckless behavior.
        </p>
        <p className="mb-6">
          Depressive episodes are common in Bipolar I but are not required for diagnosis. The hallmark feature is the manic episode itself---a state so extreme that it causes significant impairment in social or occupational functioning, often necessitating hospitalization to prevent harm to self or others <Citation id="3" index={2} source="Lancet" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          Between episodes, many people experience periods of normal mood called euthymia. However, some individuals have rapid cycling (four or more mood episodes per year), mixed episodes (simultaneous manic and depressive symptoms), or chronic symptoms that never fully remit. The course is highly variable, making personalized treatment essential.
        </p>

        <StatCard stats={[
          { value: 2.8, suffix: '%', label: 'U.S. adults with bipolar disorder' },
          { value: 1, suffix: 'in 5', label: 'Attempt suicide in their lifetime' },
          { value: 60, suffix: '%', label: 'Also have substance use disorder' },
        ]} source="NIMH, 2023" />

        <h2 id="signs-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Signs and Symptoms</h2>
        <p className="mb-6">
          Bipolar I involves two distinct types of mood episodes: manic and depressive. Each has a characteristic symptom profile that differs dramatically from the other.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Manic Episode Symptoms</h3>
        <p className="mb-6">
          A manic episode is more than feeling good or energized. It is a pathological state where judgment, behavior, and thinking become severely impaired. Key symptoms include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Elevated or irritable mood:</strong> Feeling euphoric, excessively happy, or extremely irritable without clear cause</li>
          <li><strong>Decreased need for sleep:</strong> Feeling rested after only 2-3 hours, or not sleeping for days</li>
          <li><strong>Grandiosity:</strong> Inflated self-esteem, believing you have special powers or abilities</li>
          <li><strong>Pressured speech:</strong> Talking rapidly, loudly, and difficult to interrupt</li>
          <li><strong>Racing thoughts:</strong> Thoughts moving so fast you cannot keep up or finish one idea before another arrives</li>
          <li><strong>Distractibility:</strong> Attention pulled in multiple directions, unable to focus on tasks</li>
          <li><strong>Increased goal-directed activity:</strong> Starting multiple projects, working obsessively, excessive socializing</li>
          <li><strong>Risky behaviors:</strong> Spending sprees, sexual indiscretions, reckless driving, substance use</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Depressive Episode Symptoms</h3>
        <p className="mb-6">
          Depressive episodes in Bipolar I are clinically identical to those in major depressive disorder. They include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Depressed mood:</strong> Persistent sadness, hopelessness, or emptiness most of the day</li>
          <li><strong>Anhedonia:</strong> Loss of interest or pleasure in activities once enjoyed</li>
          <li><strong>Fatigue:</strong> Extreme tiredness, lack of energy even after rest</li>
          <li><strong>Sleep changes:</strong> Insomnia or hypersomnia (sleeping excessively)</li>
          <li><strong>Appetite changes:</strong> Significant weight loss or gain due to eating changes</li>
          <li><strong>Psychomotor changes:</strong> Slowed movements and speech, or agitation and restlessness</li>
          <li><strong>Worthlessness or guilt:</strong> Excessive or inappropriate guilt, feelings of being a burden</li>
          <li><strong>Cognitive impairment:</strong> Difficulty concentrating, indecisiveness, memory problems</li>
          <li><strong>Suicidal thoughts:</strong> Recurrent thoughts of death or suicide, with or without a plan</li>
        </ul>

        <ComparisonTable title="Manic vs. Depressive Episodes" columns={['Manic Episode', 'Depressive Episode']} items={[
          { feature: 'Mood', values: ['Euphoric, irritable, expansive', 'Sad, hopeless, empty'] },
          { feature: 'Energy', values: ['Excessive, restless', 'Fatigue, low motivation'] },
          { feature: 'Sleep', values: ['Decreased need (feels rested on 2-3 hours)', 'Insomnia or hypersomnia'] },
          { feature: 'Thinking', values: ['Racing thoughts, distractibility', 'Slowed thinking, poor concentration'] },
          { feature: 'Behavior', values: ['Impulsive, risky decisions', 'Withdrawal, avoidance'] },
          { feature: 'Self-view', values: ['Grandiosity, inflated self-esteem', 'Worthlessness, guilt'] },
        ]} highlightColumn={0} />

        <ArticleCallout variant="warning" title="Psychotic Features in Mania">
          <p>Severe mania can include psychotic symptoms like delusions (false beliefs) or hallucinations (seeing/hearing things that are not there). Common delusions include believing you have special powers, are famous, or have a mission from a higher power. This requires immediate psychiatric care and may necessitate hospitalization <Citation id="3" index={4} source="Lancet" year="2020" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="causes-risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Causes and Risk Factors</h2>
        <p className="mb-6">
          Bipolar I Disorder results from a complex interaction of genetic, neurobiological, and environmental factors. No single cause has been identified, but research has revealed consistent patterns.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Genetic Factors</h3>
        <p className="mb-6">
          Bipolar disorder is one of the most heritable psychiatric conditions, with 70-80% of risk attributed to genetics <Citation id="6" index={5} source="Biological Psychiatry" year="2021" tier={1} />. If one parent has bipolar disorder, each child has a 10-15% chance of developing it. If both parents have bipolar disorder, the risk rises to 30-40%. Twin studies show concordance rates of 40-70% in identical twins, compared to 5-10% in fraternal twins.
        </p>
        <p className="mb-6">
          Multiple genes are involved, each contributing a small effect. These genes influence neurotransmitter systems (particularly dopamine, serotonin, and glutamate), circadian rhythm regulation, and neuronal growth and connectivity <Citation id="6" index={5} source="Biological Psychiatry" year="2021" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Brain Structure and Function</h3>
        <p className="mb-6">
          Neuroimaging studies reveal structural and functional differences in the brains of people with Bipolar I. Key findings include reduced gray matter volume in the prefrontal cortex (involved in decision-making and impulse control), abnormalities in the amygdala (emotion processing), and disrupted connectivity in mood regulation circuits <Citation id="6" index={5} source="Biological Psychiatry" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          Neurotransmitter imbalances also play a role. During mania, dopamine activity is elevated, contributing to increased energy and risk-taking. During depression, serotonin and norepinephrine systems are dysregulated, similar to major depressive disorder.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Environmental Triggers</h3>
        <p className="mb-6">
          Even with genetic vulnerability, environmental factors often trigger the first episode or subsequent relapses. Common triggers include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Sleep disruption:</strong> Sleep deprivation is one of the most reliable triggers for mania <Citation id="12" index={12} source="Psychological Medicine" year="2021" tier={1} /></li>
          <li><strong>Stressful life events:</strong> Major losses, trauma, relationship conflicts, or job changes</li>
          <li><strong>Substance use:</strong> Alcohol, stimulants, and other drugs can precipitate or worsen episodes</li>
          <li><strong>Seasonal changes:</strong> Some people experience mania in spring/summer and depression in fall/winter</li>
          <li><strong>Medication changes:</strong> Antidepressants can trigger mania in vulnerable individuals</li>
        </ul>

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Diagnosis</h2>
        <p className="mb-6">
          Diagnosis of Bipolar I requires a comprehensive clinical assessment by a mental health professional. There is no blood test or brain scan that can diagnose bipolar disorder. Instead, clinicians rely on detailed interviews, symptom history, and collateral information from family members or close contacts.
        </p>
        <p className="mb-6">
          The diagnostic process typically includes:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Clinical interview:</strong> Detailed discussion of current and past mood episodes, family history, and functional impairment</li>
          <li><strong>Mood charting:</strong> Tracking mood, energy, sleep, and behavior over time to identify patterns</li>
          <li><strong>Symptom rating scales:</strong> Standardized questionnaires like the Mood Disorder Questionnaire (MDQ) or Young Mania Rating Scale (YMRS)</li>
          <li><strong>Medical evaluation:</strong> Rule out other conditions that can mimic bipolar disorder (thyroid problems, neurological disorders, substance-induced mood changes)</li>
          <li><strong>Collateral information:</strong> Input from family or friends who can describe behavior during suspected episodes</li>
        </ul>
        <p className="mb-6">
          Misdiagnosis is common. Bipolar I is often mistaken for unipolar depression if patients seek help during depressive episodes and do not report or recognize past manic episodes. The average time from first symptoms to correct diagnosis is 5-10 years <Citation id="3" index={2} source="Lancet" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="clinical-note" title="Differential Diagnosis">
          <p className="mb-3">Bipolar I must be distinguished from other conditions with similar symptoms:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Borderline Personality Disorder:</strong> Mood shifts in BPD are rapid (hours) and triggered by interpersonal events, not sustained episodes</li>
            <li><strong>ADHD:</strong> Shares distractibility and impulsivity, but ADHD symptoms are chronic and present since childhood</li>
            <li><strong>Substance-Induced Mood Disorder:</strong> Mania or depression directly caused by drugs or alcohol</li>
            <li><strong>Schizoaffective Disorder:</strong> Psychotic symptoms persist even when mood is normal</li>
          </ul>
        </ArticleCallout>

        <h2 id="treatment-options" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Treatment Options</h2>
        <p className="mb-6">
          Bipolar I is a chronic condition requiring lifelong management. Treatment combines medication and psychotherapy, with the goal of stabilizing mood, preventing episodes, and improving quality of life.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Medication</h3>
        <p className="mb-6">
          Mood stabilizers are the cornerstone of treatment. The most commonly used medications include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Lithium:</strong> The gold standard mood stabilizer, with 70+ years of evidence <Citation id="11" index={11} source="International Journal of Bipolar Disorders" year="2020" tier={1} />. Reduces mania, depression, and suicide risk by 40-50%. Requires regular blood monitoring due to narrow therapeutic window.</li>
          <li><strong>Valproate (Depakote):</strong> Effective for acute mania and maintenance treatment. Useful for mixed episodes and rapid cycling.</li>
          <li><strong>Lamotrigine (Lamictal):</strong> Particularly effective for bipolar depression. Less effective for mania but well-tolerated.</li>
          <li><strong>Atypical antipsychotics:</strong> Quetiapine, olanzapine, aripiprazole, and others are FDA-approved for acute mania and maintenance. Often combined with mood stabilizers.</li>
        </ul>
        <p className="mb-6">
          Antidepressants are controversial in Bipolar I because they can trigger mania. If used for depressive episodes, they should always be combined with a mood stabilizer <Citation id="4" index={6} source="JAMA Psychiatry" year="2021" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Psychotherapy</h3>
        <p className="mb-6">
          Medication alone is often insufficient. Evidence-based psychotherapies improve medication adherence, identify early warning signs, and teach coping skills <Citation id="5" index={7} source="American Journal of Psychiatry" year="2020" tier={1} />. Effective approaches include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Family-Focused Therapy (FFT):</strong> Involves family members in psychoeducation and communication training. Reduces relapse rates by 35% <Citation id="10" index={10} source="Clinical Psychology Review" year="2020" tier={1} />.</li>
          <li><strong>Cognitive-Behavioral Therapy (CBT):</strong> Targets negative thought patterns, teaches mood monitoring, and develops relapse prevention plans.</li>
          <li><strong>Interpersonal and Social Rhythm Therapy (IPSRT):</strong> Focuses on stabilizing daily routines (sleep, meals, social activities) to regulate circadian rhythms and prevent episodes.</li>
          <li><strong>Psychoeducation:</strong> Learning about bipolar disorder, recognizing warning signs, and understanding medication rationale improves outcomes.</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Other Treatments</h3>
        <p className="mb-6">
          For severe or treatment-resistant cases, additional options include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Electroconvulsive Therapy (ECT):</strong> Highly effective for severe mania or depression, particularly when psychotic features or suicide risk are present. Modern ECT is safe with minimal side effects.</li>
          <li><strong>Transcranial Magnetic Stimulation (TMS):</strong> Non-invasive brain stimulation for bipolar depression when medications have failed.</li>
          <li><strong>Hospitalization:</strong> Necessary during severe mania or suicidal depression to ensure safety and rapid stabilization.</li>
        </ul>

        <ArticleAccordion type="multiple" items={[
          {
            id: 'med-adherence',
            title: 'Why is medication adherence so difficult in Bipolar I?',
            content: (
              <div>
                <p className="mb-3">Approximately 40-60% of people with Bipolar I struggle with medication adherence. Common reasons include:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Missing the energy and creativity of hypomania/mania</li>
                  <li>Side effects (weight gain, sedation, tremor)</li>
                  <li>Feeling well and believing medication is no longer needed</li>
                  <li>Lack of insight during manic episodes (anosognosia)</li>
                  <li>Stigma about having a chronic mental illness</li>
                </ul>
                <p className="mt-3">Working with your treatment team to find the right medication balance and addressing these concerns directly improves long-term adherence.</p>
              </div>
            )
          },
          {
            id: 'pregnancy',
            title: 'What about pregnancy and bipolar medications?',
            content: (
              <div>
                <p className="mb-3">Some mood stabilizers carry risks during pregnancy. Valproate is associated with neural tube defects and should be avoided. Lithium carries a small risk of cardiac malformations. Lamotrigine is generally considered safer.</p>
                <p className="mb-3">However, untreated bipolar disorder during pregnancy also carries significant risks, including postpartum psychosis, which affects 20-30% of women with Bipolar I after childbirth. The decision to continue or adjust medications during pregnancy should be made collaboratively with a psychiatrist and obstetrician, weighing individual risk-benefit ratios.</p>
              </div>
            )
          },
          {
            id: 'cannabis',
            title: 'Does cannabis help or hurt Bipolar I?',
            content: (
              <div>
                <p className="mb-3">Despite anecdotal claims, research shows cannabis use worsens outcomes in Bipolar I. Cannabis can trigger mania, worsen depression, and reduce medication effectiveness <Citation id="8" index={8} source="Addiction" year="2019" tier={1} />.</p>
                <p>THC (the psychoactive component) is particularly problematic. While some people report short-term symptom relief, long-term cannabis use is associated with more severe mood episodes, increased hospitalizations, and poorer functioning. If you use cannabis, discuss this openly with your treatment team.</p>
              </div>
            )
          },
        ]} />

        <h2 id="living-with" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Living With Bipolar I Disorder</h2>
        <p className="mb-6">
          While Bipolar I is a chronic condition, many people achieve long-term stability and lead fulfilling lives. Success requires ongoing treatment, lifestyle management, and self-awareness.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Self-Management Strategies</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Maintain regular routines:</strong> Consistent sleep, meal times, and daily structure help stabilize circadian rhythms</li>
          <li><strong>Monitor mood daily:</strong> Track mood, sleep, energy, and medication adherence to spot early warning signs</li>
          <li><strong>Avoid alcohol and drugs:</strong> Substance use destabilizes mood and interferes with medication</li>
          <li><strong>Manage stress:</strong> Identify stressors and develop healthy coping strategies (exercise, meditation, social support)</li>
          <li><strong>Stay connected:</strong> Isolation worsens depression; maintain relationships and social activities</li>
          <li><strong>Educate loved ones:</strong> Help family and friends understand the condition and recognize warning signs</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Work and Relationships</h3>
        <p className="mb-6">
          Bipolar I can strain relationships and careers, but with treatment and support, many people maintain successful professional and personal lives. Open communication with employers about needed accommodations (flexible schedules during depressive episodes) and with partners about the condition\'s impact can reduce conflicts.
        </p>
        <p className="mb-6">
          Support groups, both in-person and online, connect you with others who understand the challenges. The Depression and Bipolar Support Alliance (DBSA) offers peer-led groups nationwide.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Long-Term Outlook</h3>
        <p className="mb-6">
          With consistent treatment, 60-70% of people with Bipolar I experience significant symptom reduction and functional improvement <Citation id="9" index={9} source="Acta Psychiatrica Scandinavica" year="2021" tier={1} />. Early intervention, medication adherence, and psychotherapy are the strongest predictors of positive outcomes. While relapses can occur, each episode does not have to be as severe as the first---treatment allows you to catch episodes early and intervene before full relapse.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">When to Seek Help</h2>
        <p className="mb-6">
          Bipolar I is a medical emergency during severe mania or suicidal depression <Citation id="7" index={8} source="Journal of Affective Disorders" year="2020" tier={1} />. Seek immediate help if you or someone you know experiences:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Suicidal thoughts, plans, or behaviors</li>
          <li>Psychotic symptoms (delusions, hallucinations)</li>
          <li>Severe risk-taking behaviors (giving away possessions, reckless driving, dangerous sexual behavior)</li>
          <li>Inability to care for basic needs (eating, hygiene, safety)</li>
          <li>Extreme agitation or aggression</li>
        </ul>
        <p className="mb-6">
          Even outside of crises, early intervention improves outcomes. If you notice mood swings, changes in sleep patterns, or impulsive behaviors that interfere with your life, consult a mental health professional. Many people wait years before seeking help, allowing the disorder to cause unnecessary damage to relationships, careers, and health.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>Bipolar I is defined by at least one manic episode lasting seven days or requiring hospitalization</li>
            <li>The condition is highly heritable (70-80%) with neurobiological brain changes</li>
            <li>Mood stabilizers (lithium, valproate) and psychotherapy (FFT, CBT) are first-line treatments</li>
            <li>Suicide risk is high (20% lifetime attempt rate), making treatment urgent</li>
            <li>With consistent treatment, most people achieve significant symptom reduction and functional improvement</li>
            <li>Self-management strategies like routine, mood monitoring, and stress reduction improve long-term stability</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(14),
    slug: 'bipolar-ii-disorder-hypomania-depression-diagnostic-challenge',
    status: 'published',
    title: 'Bipolar II Disorder: Hypomania, Depression, and the Diagnostic Challenge',
    description: 'Bipolar II features hypomanic episodes and major depression. Often misdiagnosed, learn how it differs from Bipolar I and why accurate diagnosis matters.',
    image: "/images/articles/cat13/cover-014.svg",
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Bipolar II', 'Hypomania', 'Depression', 'Mood Disorder'],
    summary: 'Bipolar II Disorder involves hypomanic episodes and major depression, and is often misdiagnosed as unipolar depression. This comprehensive guide explains the diagnostic criteria, how hypomania differs from mania, and why getting the right diagnosis changes everything about treatment.',
    keyFacts: [
      { text: 'Up to 40% of people with Bipolar II are initially misdiagnosed with major depression because hypomania often feels good and goes unreported.', citationIndex: 6 },
      { text: 'Hypomania must last at least four consecutive days and involves elevated mood plus three additional symptoms like decreased sleep need or racing thoughts.', citationIndex: 1 },
      { text: 'People with Bipolar II spend more time in depression than those with Bipolar I, with similar functional impairment and suicide risk.', citationIndex: 4 },
      { text: 'Antidepressants alone can trigger hypomania in people with Bipolar II, which is why mood stabilizers are essential.', citationIndex: 7 },
      { text: 'With proper treatment combining mood stabilizers and psychotherapy, most people with Bipolar II achieve significant symptom reduction.', citationIndex: 5 },
    ],
    sparkMoment: 'Bipolar II is not "Bipolar I-lite"---it is a distinct condition with its own challenges, and recognizing hypomania as abnormal (not just "having a good week") is the first step toward effective treatment.',
    practicalExercise: {
      title: 'Hypomania Self-Check Exercise',
      steps: [
        { title: 'Review Past Good Periods', description: 'Think back to times when you felt unusually energized, productive, or social. Did these periods last 4+ days?' },
        { title: 'Identify Symptom Clusters', description: 'During these periods, did you also have decreased sleep need, racing thoughts, increased talkativeness, or impulsive decisions?' },
        { title: 'Assess Functional Impact', description: 'Did others notice changes in your behavior? Were there consequences (overspending, conflicts, risky choices)?' },
        { title: 'Share with Your Provider', description: 'Bring this information to your next appointment. Hypomania often goes unreported because it feels good, but it is essential for accurate diagnosis.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Mood Patterns',
    },
    citations: [
      { id: '1', text: 'DSM-5-TR', source: 'American Psychiatric Association', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
      { id: '2', text: 'Bipolar II Disorder: Recognition and Treatment', source: 'American Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1176/appi.ajp.2019.19070720', tier: 1 },
      { id: '3', text: 'Bipolar II vs Bipolar I', source: 'Journal of Affective Disorders', year: '2021', link: 'https://doi.org/10.1016/j.jad.2020.11.052', tier: 1 },
      { id: '4', text: 'Hypomania: Clinical Features', source: 'Acta Psychiatrica Scandinavica', year: '2020', link: 'https://doi.org/10.1111/acps.13122', tier: 1 },
      { id: '5', text: 'Treatment of Bipolar II', source: 'Expert Opinion on Pharmacotherapy', year: '2021', link: 'https://doi.org/10.1080/14656566.2021.1890108', tier: 1 },
      { id: '6', text: 'Misdiagnosis of Bipolar II as Depression', source: 'Bipolar Disorders', year: '2019', link: 'https://doi.org/10.1111/bdi.12839', tier: 1 },
      { id: '7', text: 'Functional Impairment in Bipolar II', source: 'Comprehensive Psychiatry', year: '2020', link: 'https://doi.org/10.1016/j.comppsych.2020.152203', tier: 1 },
      { id: '8', text: 'Quetiapine for Bipolar II Depression', source: 'Journal of Clinical Psychiatry', year: '2020', link: 'https://doi.org/10.4088/JCP.19r13200', tier: 1 },
      { id: '9', text: 'Suicide Risk in Bipolar II Disorder', source: 'British Journal of Psychiatry', year: '2021', link: 'https://doi.org/10.1192/bjp.2020.128', tier: 1 },
      { id: '10', text: 'Cognitive-Behavioral Therapy for Bipolar II', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291719002253', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            You have been treated for depression for years, but the medications never seem to work quite right. Sometimes you feel great---productive, social, energized---but those periods are brief. Then you crash back into deep depression. You may have Bipolar II, not depression.
          </p>
          <p className="mb-6">
            Bipolar II is characterized by hypomanic episodes and major depressive episodes <Citation id="1" index={1} source="DSM-5-TR" year="2022" tier={4} />. Unlike Bipolar I, there are no full manic episodes. Hypomania is less severe but still represents a distinct change from normal functioning <Citation id="2" index={2} source="American Journal of Psychiatry" year="2020" tier={1} />. The challenge is that hypomania often feels good---increased productivity, creativity, confidence---so people rarely report it to their doctors. Meanwhile, the depressive episodes are crushing and recurrent.
          </p>
          <p className="mb-6">
            This diagnostic complexity leads to years of misdiagnosis and ineffective treatment. The average delay from first symptoms to correct diagnosis is 10 years <Citation id="6" index={6} source="Bipolar Disorders" year="2019" tier={1} />. During that time, people are often prescribed antidepressants alone, which can worsen mood instability and trigger more frequent hypomanic episodes.
          </p>
        </div>

        <h2 id="overview" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What Is Bipolar II Disorder?</h2>
        <p className="mb-6">
          Bipolar II requires at least one hypomanic episode and one major depressive episode <Citation id="1" index={3} source="DSM-5-TR" year="2022" tier={4} />. By definition, there are no full manic episodes---if a person ever experiences mania, the diagnosis changes to Bipolar I.
        </p>
        <p className="mb-6">
          Hypomania lasts at least four consecutive days and involves a distinct period of elevated, expansive, or irritable mood plus increased energy. During this time, at least three additional symptoms must be present: decreased need for sleep, increased talkativeness, racing thoughts, distractibility, increased goal-directed activity, or risky behaviors. Importantly, the episode must be noticeable to others but does not cause severe impairment or require hospitalization.
        </p>
        <p className="mb-6">
          Depressive episodes in Bipolar II are identical to those in major depressive disorder---they involve persistent low mood, loss of interest, fatigue, sleep and appetite changes, feelings of worthlessness, and sometimes suicidal thoughts. The key difference is the presence of hypomania at some point in the person\'s history.
        </p>

        <ComparisonTable title="Hypomania vs. Mania" columns={['Hypomania (Bipolar II)', 'Mania (Bipolar I)']} items={[
          { feature: 'Duration', values: ['At least 4 days', 'At least 7 days (or hospitalization)'] },
          { feature: 'Severity', values: ['Noticeable but manageable', 'Severe impairment'] },
          { feature: 'Psychotic features', values: ['Absent', 'May be present'] },
          { feature: 'Hospitalization', values: ['Not required', 'Often required'] },
          { feature: 'Functional impact', values: ['Mild to moderate', 'Severe'] },
        ]} highlightColumn={0} />

        <ArticleCallout variant="key-takeaway">
          <p>The "II" does NOT mean less severe. People with Bipolar II spend more time in depression and have similar functional impairment and suicide risk as Bipolar I <Citation id="3" index={4} source="Journal of Affective Disorders" year="2021" tier={1} />. In fact, suicide rates may be even higher in Bipolar II <Citation id="9" index={9} source="British Journal of Psychiatry" year="2021" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="signs-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Signs and Symptoms</h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Hypomanic Episode Symptoms</h3>
        <p className="mb-6">
          Hypomania often feels good, which is why people may not report it <Citation id="4" index={5} source="Acta Psychiatrica Scandinavica" year="2020" tier={1} />. You might describe it as "finally feeling like yourself" or "having a good week." But to meet criteria, these symptoms must represent a distinct change from your usual functioning and be noticeable to others:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Elevated or irritable mood:</strong> Feeling unusually upbeat, euphoric, or easily annoyed</li>
          <li><strong>Increased energy and activity:</strong> Taking on multiple projects, cleaning obsessively, socializing excessively</li>
          <li><strong>Decreased need for sleep:</strong> Feeling fully rested after 3-4 hours (not just insomnia---you genuinely do not feel tired)</li>
          <li><strong>More talkative than usual:</strong> Pressured speech, talking rapidly, hard for others to interrupt</li>
          <li><strong>Racing thoughts or flight of ideas:</strong> Mind jumping from topic to topic, ideas flowing faster than you can capture them</li>
          <li><strong>Distractibility:</strong> Attention easily pulled away, difficulty completing tasks despite high energy</li>
          <li><strong>Increased goal-directed activity:</strong> Starting new projects, working late into the night, excessive focus on goals</li>
          <li><strong>Risky behaviors:</strong> Impulsive spending, sexual indiscretions, reckless driving, substance use</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Depressive Episode Symptoms</h3>
        <p className="mb-6">
          People with Bipolar II spend approximately 37 times more days per year in depression than in hypomania <Citation id="7" index={7} source="Comprehensive Psychiatry" year="2020" tier={1} />. Depressive episodes are the primary source of suffering and functional impairment. Symptoms include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Persistent depressed mood or emptiness most of the day</li>
          <li>Loss of interest or pleasure in all or almost all activities</li>
          <li>Significant weight loss or gain, or changes in appetite</li>
          <li>Insomnia or hypersomnia nearly every day</li>
          <li>Psychomotor agitation or retardation (observable slowing or restlessness)</li>
          <li>Fatigue or loss of energy</li>
          <li>Feelings of worthlessness or excessive guilt</li>
          <li>Diminished ability to think, concentrate, or make decisions</li>
          <li>Recurrent thoughts of death or suicide</li>
        </ul>

        <BeforeAfter
          before={{ title: 'Undiagnosed Bipolar II (Treated as Depression)', points: [
            'Antidepressants prescribed alone without mood stabilizers',
            'Brief periods of feeling "better" followed by crashes',
            'Medications seem to stop working after a few months',
            'Increasing doses or switching antidepressants repeatedly',
            'Depression becomes more frequent and severe over time'
          ]}}
          after={{ title: 'After Correct Bipolar II Diagnosis', points: [
            'Mood stabilizer (lamotrigine, lithium) added as foundation',
            'Antidepressant used cautiously with mood stabilizer if needed',
            'Mood tracking helps identify early warning signs',
            'Psychotherapy teaches skills to manage mood fluctuations',
            'Longer periods of stability with fewer episode relapses'
          ]}}
        />

        <h2 id="causes-risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Causes and Risk Factors</h2>
        <p className="mb-6">
          Bipolar II shares similar genetic and neurobiological underpinnings with Bipolar I. Family studies show that Bipolar II runs in families, with heritability estimated at 60-70%. If a first-degree relative has any bipolar disorder, your risk increases significantly.
        </p>
        <p className="mb-6">
          Neuroimaging research reveals differences in brain regions involved in emotion regulation, including the prefrontal cortex and limbic system. Neurotransmitter systems---particularly dopamine, serotonin, and norepinephrine---show dysregulation patterns similar to both Bipolar I and major depression, which explains the diagnostic overlap.
        </p>
        <p className="mb-6">
          Environmental factors that can trigger episodes include stress, sleep disruption, seasonal changes, and substance use. Interestingly, antidepressant medications can trigger hypomania in vulnerable individuals, which is often the first clue that the diagnosis is Bipolar II rather than unipolar depression <Citation id="5" index={7} source="Expert Opinion on Pharmacotherapy" year="2021" tier={1} />.
        </p>

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Diagnosis and the Challenge of Misdiagnosis</h2>
        <p className="mb-6">
          Up to 40% of people with Bipolar II are initially misdiagnosed with major depression <Citation id="6" index={6} source="Bipolar Disorders" year="2019" tier={1} />. This happens for several reasons:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>People seek help during depression:</strong> Hypomania feels good, so people do not report it as a problem</li>
          <li><strong>Hypomania is subtle:</strong> Unlike mania, hypomania does not involve psychosis or hospitalization, so it can be mistaken for just "having energy"</li>
          <li><strong>Brief screening tools miss hypomania:</strong> Standard depression questionnaires do not ask about elevated mood or increased energy</li>
          <li><strong>Collateral information is rarely obtained:</strong> Family members or friends may notice the mood changes more clearly than the patient</li>
        </ul>
        <p className="mb-6">
          Accurate diagnosis requires a comprehensive clinical interview that explores both current symptoms and lifetime history of mood episodes. Mood charting over several weeks can reveal patterns. Tools like the Mood Disorder Questionnaire (MDQ) or Hypomania Checklist (HCL-32) can help identify potential bipolar features <Citation id="2" index={2} source="American Journal of Psychiatry" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="clinical-note" title="Red Flags for Bipolar II in Someone Treated for Depression">
          <ul className="list-disc pl-5 space-y-2">
            <li>Multiple failed antidepressant trials (medications work briefly, then stop)</li>
            <li>Antidepressants cause agitation, insomnia, or "feeling too good"</li>
            <li>Family history of bipolar disorder</li>
            <li>Early onset of depression (before age 25)</li>
            <li>Recurrent depressive episodes with brief periods of normal or elevated mood</li>
            <li>Postpartum depression with periods of high energy</li>
          </ul>
        </ArticleCallout>

        <h2 id="treatment-options" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Treatment Options</h2>
        <p className="mb-6">
          Treatment for Bipolar II focuses on stabilizing mood and preventing both depressive and hypomanic episodes. The combination of medication and psychotherapy is most effective.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Medication</h3>
        <p className="mb-6">
          Mood stabilizers and atypical antipsychotics are first-line treatments <Citation id="5" index={7} source="Expert Opinion on Pharmacotherapy" year="2021" tier={1} />. Common options include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Lamotrigine (Lamictal):</strong> Particularly effective for bipolar depression, the most common problem in Bipolar II. Well-tolerated with minimal weight gain or sedation.</li>
          <li><strong>Lithium:</strong> Reduces both depression and hypomania, and lowers suicide risk. Requires blood monitoring.</li>
          <li><strong>Quetiapine (Seroquel):</strong> Atypical antipsychotic effective for bipolar depression <Citation id="8" index={8} source="Journal of Clinical Psychiatry" year="2020" tier={1} />. Can cause sedation and weight gain.</li>
          <li><strong>Lurasidone (Latuda):</strong> Newer atypical antipsychotic for bipolar depression with lower metabolic side effects.</li>
        </ul>
        <p className="mb-6">
          Antidepressants are controversial in Bipolar II. When used, they should always be combined with a mood stabilizer to prevent triggering hypomania. Some guidelines recommend avoiding antidepressants entirely, relying instead on mood stabilizers and atypical antipsychotics for depression <Citation id="5" index={7} source="Expert Opinion on Pharmacotherapy" year="2021" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Psychotherapy</h3>
        <p className="mb-6">
          Evidence-based psychotherapies improve outcomes when combined with medication <Citation id="10" index={10} source="Psychological Medicine" year="2020" tier={1} />. Effective approaches include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Cognitive-Behavioral Therapy (CBT):</strong> Helps identify triggers, challenge negative thoughts during depression, and develop coping strategies</li>
          <li><strong>Interpersonal and Social Rhythm Therapy (IPSRT):</strong> Focuses on stabilizing daily routines (sleep, meals, exercise) to regulate mood</li>
          <li><strong>Psychoeducation:</strong> Learning about Bipolar II, recognizing early warning signs, and understanding treatment rationale</li>
          <li><strong>Family-Focused Therapy:</strong> Involves loved ones in understanding the condition and improving communication</li>
        </ul>

        <QuoteBlock quote="Bipolar II is not Bipolar I-lite. The suffering is real, and the treatment must be too." attribution="Dr. Kay Redfield Jamison" role="Clinical Psychologist" source="An Unquiet Mind" variant="large" />

        <h2 id="living-with" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Living With Bipolar II Disorder</h2>
        <p className="mb-6">
          With proper treatment, most people with Bipolar II achieve significant symptom reduction and improved quality of life. Self-management strategies are essential for long-term stability:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Track your mood daily:</strong> Use a mood journal or app to spot early warning signs of hypomania or depression</li>
          <li><strong>Maintain consistent sleep:</strong> Sleep disruption is a powerful trigger for both depressive and hypomanic episodes</li>
          <li><strong>Avoid alcohol and drugs:</strong> Substance use destabilizes mood and reduces medication effectiveness</li>
          <li><strong>Build a support network:</strong> Connect with others who understand through support groups (DBSA, online communities)</li>
          <li><strong>Develop a relapse prevention plan:</strong> Identify early warning signs and specific steps to take when you notice them</li>
          <li><strong>Communicate with your treatment team:</strong> Report changes in mood, sleep, or energy promptly</li>
        </ul>
        <p className="mb-6">
          Many people with Bipolar II maintain successful careers, relationships, and creative pursuits. The key is recognizing that hypomania is part of the disorder, not your "true self," and that stability---while less exciting than hypomania---allows for more consistent functioning and better long-term outcomes.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">When to Seek Help</h2>
        <p className="mb-6">
          If you have been treated for depression without success, especially if antidepressants made you feel "too good," agitated, or caused insomnia, ask your provider about bipolar disorder. Other red flags include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Depressive episodes that come and go with periods of normal or elevated mood</li>
          <li>Family history of bipolar disorder</li>
          <li>Onset of depression before age 25</li>
          <li>Multiple antidepressant trials that "stop working" after a few months</li>
          <li>Brief periods of high energy, productivity, or impulsivity followed by crashes</li>
        </ul>
        <p className="mb-6">
          Seek immediate help if you experience suicidal thoughts or plans. Bipolar II carries a high suicide risk <Citation id="9" index={9} source="British Journal of Psychiatry" year="2021" tier={1} />, and crises require urgent intervention. Call 988 (Suicide and Crisis Lifeline) or go to your nearest emergency room.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>Bipolar II involves hypomanic episodes (4+ days) and major depressive episodes, without full mania</li>
            <li>Up to 40% are misdiagnosed with depression because hypomania feels good and goes unreported</li>
            <li>People with Bipolar II spend far more time in depression than hypomania, causing significant impairment</li>
            <li>Antidepressants alone can trigger hypomania; mood stabilizers (lamotrigine, lithium) are first-line treatment</li>
            <li>Psychotherapy (CBT, IPSRT) combined with medication improves long-term outcomes</li>
            <li>With proper treatment, most people achieve significant symptom reduction and improved quality of life</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(15),
    slug: 'cyclothymic-disorder-chronic-mood-fluctuation-below-bipolar-threshold',
    status: 'published',
    title: 'Cyclothymic Disorder: Chronic Mood Fluctuation Below the Bipolar Threshold',
    description: 'Cyclothymia involves chronic mood instability with hypomanic and depressive symptoms that never reach full episode criteria. Learn about this often-overlooked mood disorder.',
    image: "/images/articles/cat13/cover-015.svg",
    category: CATEGORY_MENTAL_HEALTH_CONDITIONS,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Cyclothymia', 'Cyclothymic Disorder', 'Mood Instability', 'Bipolar Spectrum'],
    summary: 'Cyclothymic Disorder is a chronic mood condition involving fluctuating hypomanic and depressive symptoms that never reach full episode thresholds. Often dismissed as personality traits, cyclothymia causes significant impairment and carries a 15-50% risk of progression to Bipolar I or II.',
    keyFacts: [
      { text: 'Cyclothymia requires at least two years of chronic mood instability with no more than two consecutive symptom-free months.', citationIndex: 1 },
      { text: 'Only 0.4% of the population has cyclothymia, but it is likely underdiagnosed because symptoms are viewed as personality traits.', citationIndex: 3 },
      { text: '15-50% of people with cyclothymia eventually develop Bipolar I or II, making early treatment critical.', citationIndex: 5 },
      { text: '50% of people with cyclothymia have comorbid substance use disorder, often as self-medication for mood instability.', citationIndex: 3 },
      { text: 'Mood stabilizers and psychotherapy (CBT, IPSRT) can reduce symptom severity and may lower progression risk.', citationIndex: 4 },
    ],
    sparkMoment: 'Cyclothymia is not "just being moody"---it is a persistent pattern of mood instability that interferes with your life, and it deserves treatment just as much as any other mood disorder.',
    practicalExercise: {
      title: 'Two-Week Mood Stability Tracker',
      steps: [
        { title: 'Set Up Daily Ratings', description: 'Each evening, rate your mood (-5 to +5), energy level (1-10), sleep hours, and any impulsive decisions or social withdrawal.' },
        { title: 'Chart the Pattern', description: 'After 14 days, graph your mood ratings to see if they fluctuate frequently or remain stable.' },
        { title: 'Count Symptom-Free Days', description: 'Identify how many consecutive days you felt "normal" (no ups or downs). Cyclothymia rarely has more than 2 months symptom-free.' },
        { title: 'Share with a Professional', description: 'Bring your chart to a mental health evaluation. This visual data helps clinicians see patterns you might not notice yourself.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Start Mood Tracking',
    },
    citations: [
      { id: '1', text: 'DSM-5-TR', source: 'American Psychiatric Association', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
      { id: '2', text: 'Cyclothymic Disorder: A Review', source: 'Journal of Affective Disorders', year: '2020', link: 'https://doi.org/10.1016/j.jad.2020.03.097', tier: 1 },
      { id: '3', text: 'Risk of Progression to Bipolar I/II', source: 'Bipolar Disorders', year: '2019', link: 'https://doi.org/10.1111/bdi.12812', tier: 1 },
      { id: '4', text: 'Treatment of Cyclothymia', source: 'Current Psychiatry Reports', year: '2021', link: 'https://doi.org/10.1007/s11920-021-01237-y', tier: 1 },
      { id: '5', text: 'Quality of Life in Cyclothymia', source: 'Comprehensive Psychiatry', year: '2020', link: 'https://doi.org/10.1016/j.comppsych.2020.152195', tier: 1 },
      { id: '6', text: 'Cyclothymia and Creativity', source: 'Journal of Affective Disorders', year: '2019', link: 'https://doi.org/10.1016/j.jad.2019.01.050', tier: 1 },
      { id: '7', text: 'Lamotrigine for Cyclothymic Disorder', source: 'International Journal of Bipolar Disorders', year: '2020', link: 'https://doi.org/10.1186/s40345-020-00179-0', tier: 1 },
      { id: '8', text: 'Psychotherapy for Cyclothymia', source: 'Journal of Clinical Psychology', year: '2021', link: 'https://doi.org/10.1002/jclp.23115', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Your moods are unpredictable. Some days you feel on top of the world, energized and optimistic. Other days you are down, lethargic, and pessimistic. The swings are not severe enough to be bipolar disorder, but they never stop. This is cyclothymic disorder.
          </p>
          <p className="mb-6">
            Cyclothymia is chronic mood instability lasting at least two years in adults (one year in children) <Citation id="1" index={1} source="DSM-5-TR" year="2022" tier={4} />. It involves numerous periods of hypomanic symptoms and depressive symptoms that do not meet full criteria for episodes <Citation id="2" index={2} source="Journal of Affective Disorders" year="2020" tier={1} />. The key word is "chronic"---these fluctuations are not brief reactions to life events. They are persistent, unpredictable, and never stabilize for more than two months at a time.
          </p>
          <p className="mb-6">
            Many people with cyclothymia go undiagnosed for years, dismissing their mood swings as "just my personality" or "being moody." But cyclothymia is not a personality trait. It is a treatable mood disorder that causes real functional impairment and carries significant risk of progression to Bipolar I or II <Citation id="3" index={3} source="Bipolar Disorders" year="2019" tier={1} />.
          </p>
        </div>

        <h2 id="overview" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What Is Cyclothymic Disorder?</h2>
        <p className="mb-6">
          Cyclothymia is on the bipolar spectrum but below the threshold for Bipolar I or II <Citation id="1" index={3} source="DSM-5-TR" year="2022" tier={4} />. To meet diagnostic criteria, you must have:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>At least two years</strong> (one year for children/adolescents) of numerous periods with hypomanic symptoms and depressive symptoms</li>
          <li><strong>Symptoms present at least half the time,</strong> with no more than two consecutive symptom-free months</li>
          <li><strong>Symptoms that never meet full criteria</strong> for a hypomanic episode, manic episode, or major depressive episode</li>
          <li><strong>Significant distress or impairment</strong> in social, occupational, or other important areas of functioning</li>
        </ul>
        <p className="mb-6">
          The "subthreshold" nature makes cyclothymia challenging to diagnose. You experience many of the same symptoms as Bipolar I or II---elevated mood, decreased sleep need, racing thoughts, low mood, fatigue, hopelessness---but they never quite reach the intensity or duration required for full episode criteria. Yet the chronic, unrelenting pattern causes cumulative functional impairment <Citation id="5" index={5} source="Comprehensive Psychiatry" year="2020" tier={1} />.
        </p>

        <StatCard stats={[
          { value: 0.4, suffix: '%', label: 'Lifetime prevalence of cyclothymia' },
          { value: 15, suffix: '-50%', label: 'Progress to Bipolar I or II' },
          { value: 50, suffix: '%', label: 'Have comorbid substance use disorder' },
        ]} source="Bipolar Disorders, 2019" />

        <h2 id="signs-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Signs and Symptoms</h2>
        <p className="mb-6">
          Cyclothymia involves alternating periods of hypomanic symptoms and depressive symptoms. The fluctuations are rapid and unpredictable---you might have a few energized days followed by a week of low mood, then back to feeling good for three days, then down again. This rollercoaster never stops.
        </p>

        <ArticleTabs tabs={[
          { id: 'hypo', label: 'Hypomanic Symptoms', content: (
            <div>
              <p className="mb-4">During "up" periods, you may experience:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Elevated, expansive, or irritable mood</li>
                <li>Increased energy, activity, or restlessness</li>
                <li>Decreased need for sleep (but not as extreme as hypomania---maybe sleeping 5-6 hours instead of 8)</li>
                <li>More talkative than usual, speaking quickly</li>
                <li>Racing thoughts or jumping from idea to idea</li>
                <li>Increased goal-directed activity or productivity bursts</li>
                <li>Mild impulsivity (small spending sprees, minor risk-taking)</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-neutral-400">These symptoms are noticeable but do not cause severe impairment or require hospitalization.</p>
            </div>
          )},
          { id: 'dep', label: 'Depressive Symptoms', content: (
            <div>
              <p className="mb-4">During "down" periods, you may experience:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Low mood, sadness, or feeling empty</li>
                <li>Fatigue or low energy</li>
                <li>Hopelessness or pessimism about the future</li>
                <li>Low self-esteem or feelings of inadequacy</li>
                <li>Social withdrawal or reduced interest in activities</li>
                <li>Difficulty concentrating or making decisions</li>
                <li>Changes in sleep or appetite (but not as extreme as major depression)</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-neutral-400">These symptoms are distressing but do not meet full criteria for a major depressive episode.</p>
            </div>
          )},
        ]} />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">What It Feels Like</h3>
        <p className="mb-6">
          People with cyclothymia often describe feeling like they are on an emotional rollercoaster with no ability to predict or control when the next turn will come. Relationships suffer because others perceive you as inconsistent or unreliable---sometimes you are the life of the party, other times you cancel plans last minute. Work performance fluctuates---you have bursts of productivity followed by periods where you struggle to focus or complete tasks.
        </p>
        <p className="mb-6">
          The chronic nature is exhausting. Unlike Bipolar I or II, where there are clear episodes with periods of stability in between, cyclothymia offers little respite. You rarely feel "normal" for more than a few weeks before the mood shifts again <Citation id="2" index={2} source="Journal of Affective Disorders" year="2020" tier={1} />.
        </p>

        <ArticleChart
          type="line"
          title="Mood Pattern: Cyclothymia vs. Bipolar II"
          description="Cyclothymia shows chronic fluctuation without full episodes; Bipolar II has distinct hypomanic and depressive episodes."
          data={[
            { label: 'Week 1', cyclothymia: 6, bipolarII: 5 },
            { label: 'Week 2', cyclothymia: 3, bipolarII: 4 },
            { label: 'Week 3', cyclothymia: 7, bipolarII: 8 },
            { label: 'Week 4', cyclothymia: 4, bipolarII: 8 },
            { label: 'Week 5', cyclothymia: 6, bipolarII: 3 },
            { label: 'Week 6', cyclothymia: 3, bipolarII: 2 },
            { label: 'Week 7', cyclothymia: 5, bipolarII: 2 },
            { label: 'Week 8', cyclothymia: 7, bipolarII: 5 },
          ]}
          source="Illustrative data for educational purposes"
        />

        <h2 id="causes-risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Causes and Risk Factors</h2>
        <p className="mb-6">
          Cyclothymia appears to share genetic and neurobiological underpinnings with Bipolar I and II. It runs in families, with higher rates among first-degree relatives of people with bipolar disorder. This suggests a common genetic vulnerability along a spectrum of mood instability.
        </p>
        <p className="mb-6">
          Temperament also plays a role. People with cyclothymia often report lifelong mood variability, suggesting that temperamental factors (cyclothymic temperament) may predispose to the disorder <Citation id="2" index={2} source="Journal of Affective Disorders" year="2020" tier={1} />. Some researchers view cyclothymia as the extreme end of normal mood variability, while others see it as a distinct pathological condition.
        </p>
        <p className="mb-6">
          Environmental stressors can exacerbate symptoms, though cyclothymia is not simply a reaction to stress---the mood fluctuations persist even during low-stress periods. Substance use is common (50% comorbidity rate) and may represent attempts to self-medicate the mood instability <Citation id="3" index={3} source="Bipolar Disorders" year="2019" tier={1} />.
        </p>

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Diagnosis and Misdiagnosis</h2>
        <p className="mb-6">
          Cyclothymia is often undiagnosed or misdiagnosed because symptoms are chronic and "subthreshold." People may view mood instability as their personality rather than a treatable condition. Common misdiagnoses include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Borderline Personality Disorder (BPD):</strong> BPD involves rapid mood shifts (hours) triggered by interpersonal events; cyclothymia has mood shifts lasting days to weeks without clear triggers</li>
          <li><strong>Major Depressive Disorder:</strong> If hypomanic periods are not recognized, the diagnosis focuses only on depressive symptoms</li>
          <li><strong>Generalized Anxiety Disorder:</strong> Mood instability can be mistaken for anxiety fluctuations</li>
          <li><strong>"Just being moody":</strong> Dismissed as temperament, especially in adolescents</li>
        </ul>
        <p className="mb-6">
          Accurate diagnosis requires tracking mood over time---ideally through daily mood charting for several weeks. This reveals the chronic fluctuating pattern characteristic of cyclothymia <Citation id="4" index={4} source="Current Psychiatry Reports" year="2021" tier={1} />.
        </p>

        <div className="space-y-4 my-8">
          <MythVsFactBlock
            myth="Cyclothymia is just being moody---everyone has ups and downs."
            fact="Cyclothymia involves chronic mood fluctuations present at least half the time for two years, causing significant functional impairment. This is far beyond normal mood variability."
          />
          <MythVsFactBlock
            myth="Cyclothymia is less severe than bipolar disorder, so it does not need treatment."
            fact="Cyclothymia causes real functional impairment and has a 15-50% risk of progression to Bipolar I or II. Early treatment is essential."
          />
          <MythVsFactBlock
            myth="Cyclothymia is a personality trait, not a disorder."
            fact="While cyclothymic temperament may predispose to the disorder, cyclothymia meets criteria for a diagnosable mood disorder and responds to treatment."
          />
        </div>

        <h2 id="treatment-options" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Treatment Options</h2>
        <p className="mb-6">
          Treatment for cyclothymia aims to reduce mood fluctuation intensity, improve functioning, and potentially lower the risk of progression to Bipolar I or II. Research is more limited than for Bipolar I/II, but several approaches show promise.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Medication</h3>
        <p className="mb-6">
          Mood stabilizers may help reduce symptom severity, though research is limited <Citation id="4" index={4} source="Current Psychiatry Reports" year="2021" tier={1} />. Common options include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Lamotrigine (Lamictal):</strong> May reduce depressive symptoms and stabilize mood fluctuations <Citation id="7" index={7} source="International Journal of Bipolar Disorders" year="2020" tier={1} /></li>
          <li><strong>Lithium:</strong> Some evidence for reducing mood instability, though side effects may limit tolerability</li>
          <li><strong>Valproate:</strong> May reduce symptom intensity in some individuals</li>
        </ul>
        <p className="mb-6">
          Antidepressants are generally avoided or used with caution, as they can destabilize mood and potentially trigger progression to hypomania. The decision to medicate should weigh potential benefits against the reality that cyclothymia research lags behind Bipolar I/II research.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Psychotherapy</h3>
        <p className="mb-6">
          Psychotherapy is often the first-line treatment for cyclothymia, particularly for individuals with milder symptoms <Citation id="8" index={8} source="Journal of Clinical Psychology" year="2021" tier={1} />. Effective approaches include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Cognitive-Behavioral Therapy (CBT):</strong> Teaches skills to manage mood fluctuations, identify triggers, and challenge negative thought patterns</li>
          <li><strong>Interpersonal and Social Rhythm Therapy (IPSRT):</strong> Focuses on stabilizing daily routines (sleep, meals, exercise) to regulate mood</li>
          <li><strong>Mindfulness-Based Interventions:</strong> Help develop awareness of mood shifts and reduce reactivity</li>
          <li><strong>Psychoeducation:</strong> Understanding the disorder and recognizing patterns empowers self-management</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Lifestyle Management</h3>
        <p className="mb-6">
          Lifestyle interventions can significantly reduce symptom severity:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Maintain consistent sleep schedules (irregular sleep worsens mood instability)</li>
          <li>Avoid alcohol and drugs (substance use destabilizes mood)</li>
          <li>Regular exercise (reduces depression and anxiety symptoms)</li>
          <li>Daily mood tracking (helps identify patterns and early warning signs)</li>
          <li>Stress management techniques (meditation, yoga, breathing exercises)</li>
        </ul>

        <ArticleCallout variant="warning" title="Risk of Progression">
          <p className="mb-3">15-50% of people with cyclothymia eventually develop Bipolar I or II <Citation id="3" index={5} source="Bipolar Disorders" year="2019" tier={1} />. Factors that increase progression risk include:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Family history of bipolar disorder</li>
            <li>Substance use</li>
            <li>Antidepressant use without mood stabilizers</li>
            <li>High levels of stress or sleep disruption</li>
          </ul>
          <p className="mt-3">Early treatment may reduce this risk, though research is ongoing.</p>
        </ArticleCallout>

        <h2 id="living-with" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Living With Cyclothymic Disorder</h2>
        <p className="mb-6">
          Many people with cyclothymia learn to manage their mood fluctuations and lead fulfilling lives. The key is accepting that mood instability is part of the condition, not a personal failing, and developing skills to minimize its impact.
        </p>
        <p className="mb-6">
          Some people with cyclothymia report benefits from the "up" periods---increased creativity, productivity, and social energy <Citation id="6" index={6} source="Journal of Affective Disorders" year="2019" tier={1} />. However, relying on these periods can be risky, as the inevitable "down" periods follow. Treatment focuses on reducing the amplitude of fluctuations, creating more consistent (if less exciting) functioning.
        </p>
        <p className="mb-6">
          Support groups, whether in-person or online, can help reduce isolation and provide practical coping strategies from others who understand the experience. The Depression and Bipolar Support Alliance (DBSA) offers resources for all bipolar spectrum disorders, including cyclothymia.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">When to Seek Help</h2>
        <p className="mb-6">
          If chronic mood instability interferes with relationships, work, or quality of life, seek evaluation for cyclothymia or other mood disorders. Specific signs that warrant professional help include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Mood fluctuations present more days than not for over two years</li>
          <li>No more than two consecutive months feeling stable</li>
          <li>Relationships suffering due to unpredictable moods</li>
          <li>Work performance inconsistent due to energy and focus fluctuations</li>
          <li>Substance use to cope with mood swings</li>
          <li>Family history of bipolar disorder</li>
        </ul>
        <p className="mb-6">
          Even if symptoms do not meet full criteria for Bipolar I or II, cyclothymia deserves treatment. The chronic, unrelenting nature causes cumulative functional impairment that responds to intervention <Citation id="5" index={5} source="Comprehensive Psychiatry" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>Cyclothymia involves at least two years of chronic mood fluctuations with no more than two symptom-free months</li>
            <li>Symptoms are "subthreshold" (never meet full episode criteria) but cause real functional impairment</li>
            <li>15-50% of people with cyclothymia progress to Bipolar I or II, making early treatment critical</li>
            <li>Mood stabilizers (lamotrigine, lithium) and psychotherapy (CBT, IPSRT) are primary treatments</li>
            <li>Daily mood tracking, consistent sleep, and stress management improve symptom control</li>
            <li>Cyclothymia is not "just being moody"---it is a diagnosable mood disorder that deserves treatment</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
];
