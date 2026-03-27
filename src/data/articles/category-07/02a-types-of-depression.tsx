 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DEPRESSION_GRIEF, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
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

export const typesOfDepressionArticlesA: Article[] = [
  {
    id: catId(11),
    slug: 'major-depressive-disorder-clinical-depression',
    title: 'Major Depressive Disorder: The Condition Behind Clinical Depression',
    description: 'Comprehensive guide to major depressive disorder---diagnostic criteria, symptoms, course, treatment, and what makes clinical depression different from sadness.',
    image: "/images/articles/cat07/cover-011.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Major Depression', 'MDD', 'Diagnosis', 'Clinical Depression'],
    summary: 'Major Depressive Disorder is the most common and well-studied form of clinical depression, affecting 20% of people at some point in their lives. Understanding MDD\'s diagnostic criteria, severity levels, course, and treatment options is essential because while highly treatable, it often goes unrecognized---with profound consequences for health, relationships, and quality of life.',
    keyFacts: [
      { text: 'MDD requires 5+ specific symptoms for at least 2 weeks, including depressed mood or anhedonia (loss of pleasure)', citationIndex: 1 },
      { text: '60-70% of people respond to first-line treatment, and 80% achieve remission within a year with adequate care', citationIndex: 3 },
      { text: 'After one episode, 50% will experience recurrence; after three episodes, recurrence risk rises to 90%', citationIndex: 5 },
      { text: 'MDD is a leading cause of disability worldwide, impairing work, relationships, and physical health across all life domains', citationIndex: 7 },
      { text: '60% of suicide deaths are linked to mood disorders, with lifetime suicide risk of 15% for those with severe MDD', citationIndex: 8 },
    ],
    sparkMoment: 'Depression lies when it tells you nothing will help---that\'s a symptom, not reality. Treatment works, recovery is possible, and most people return to full functioning.',
    practicalExercise: {
      title: 'Recognizing Your Depression Patterns',
      steps: [
        { title: 'Track Your Symptoms', description: 'For one week, note which of the nine MDD symptoms you experience each day and their intensity (1-10). Look for patterns in timing, triggers, and severity.' },
        { title: 'Identify Functional Impact', description: 'Write down specific examples of how symptoms affect your work, relationships, self-care, and daily activities. This helps you and your provider understand the real-world consequences.' },
        { title: 'Document Your History', description: 'Create a timeline of past depressive episodes: when they started, how long they lasted, what helped, and what didn\'t. Recognizing your pattern informs treatment.' },
        { title: 'Prepare for Your Appointment', description: 'Bring your symptom tracking, impact notes, and timeline to your healthcare provider. This information makes diagnosis more accurate and treatment planning more effective.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Use the Mood Journal',
    },
    citations: [
      {
        id: '1',
        text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://www.psychiatry.org/psychiatrists/practice/dsm',
        tier: 4,
      },
      {
        id: '2',
        text: 'Major depressive disorder: A clinical review',
        source: 'JAMA',
        year: '2020',
        link: 'https://doi.org/10.1001/jama.2020.6901',
        tier: 1,
      },
      {
        id: '3',
        text: 'The course of major depression: A systematic review of predictors and outcomes',
        source: 'American Journal of Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1176/appi.ajp.2019.18091011',
        tier: 1,
      },
      {
        id: '4',
        text: 'Treatment of major depressive disorder: Evidence-based guidelines',
        source: 'Lancet Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1016/S2215-0366(21)00019-0',
        tier: 1,
      },
      {
        id: '5',
        text: 'Recurrence patterns in major depression: A longitudinal study',
        source: 'Journal of Affective Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jad.2020.02.043',
        tier: 1,
      },
      {
        id: '6',
        text: 'Severity specifiers in major depression: Clinical utility and treatment implications',
        source: 'Depression and Anxiety',
        year: '2019',
        link: 'https://doi.org/10.1002/da.22876',
        tier: 1,
      },
      {
        id: '7',
        text: 'Functional impairment in major depressive disorder',
        source: 'British Journal of Psychiatry',
        year: '2018',
        link: 'https://doi.org/10.1192/bjp.2018.97',
        tier: 1,
      },
      {
        id: '8',
        text: 'Suicide risk in major depressive disorder: Assessment and management',
        source: 'American Journal of Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1176/appi.ajp.2020.20060864',
        tier: 1,
      },
      {
        id: '9',
        text: 'Cognitive dysfunction in major depression: Implications for treatment',
        source: 'CNS Drugs',
        year: '2020',
        link: 'https://doi.org/10.1007/s40263-020-00726-0',
        tier: 1,
      },
      {
        id: '10',
        text: 'Major Depression: Epidemiology and Burden',
        source: 'National Institute of Mental Health',
        year: '2023',
        link: 'https://www.nimh.nih.gov/health/statistics/major-depression',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When someone says they have "clinical depression, ' they're usually referring to Major Depressive Disorder (MDD)---the most common and well-studied form of depression. It's distinct from other types of depression in its severity, duration, and the specific symptoms required for diagnosis.
          </p>
          <p className="mb-6">
            Major Depressive Disorder affects approximately 7% of adults in any given year, with lifetime prevalence around 20% <Citation id="10" index={10} source="National Institute of Mental Health" year="2023" tier={2} />. Understanding MDD is crucial because it's highly treatable, yet often goes unrecognized or untreated---with significant consequences for health, relationships, and quality of life <Citation id="2" index={2} source="JAMA" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="diagnostic-criteria" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Diagnostic Criteria: What Defines MDD
        </h2>
        <p className="mb-6">
          According to the DSM-5-TR, Major Depressive Disorder requires five or more of nine specific symptoms present during the same two-week period, with at least one symptom being either depressed mood or loss of interest/pleasure <Citation id="1" index={1} source="American Psychiatric Association" year="2022" tier={4} />.
        </p>

        <ArticleCallout variant="clinical-note" title="The Nine DSM-5-TR Symptoms">
          <p className="mb-4">At least <strong>five</strong> of these must be present nearly every day for at least two weeks:</p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li><strong>Depressed mood</strong> most of the day (feeling sad, empty, hopeless, or irritable in children/adolescents)</li>
            <li><strong>Markedly diminished interest or pleasure</strong> in all or almost all activities (anhedonia)</li>
            <li><strong>Significant weight loss or gain</strong> (5% in a month), or decrease/increase in appetite</li>
            <li><strong>Insomnia or hypersomnia</strong> nearly every day</li>
            <li><strong>Psychomotor agitation or retardation</strong> observable by others, not just subjective restlessness or being slowed down</li>
            <li><strong>Fatigue or loss of energy</strong> nearly every day</li>
            <li><strong>Feelings of worthlessness or excessive/inappropriate guilt</strong> (not just self-reproach about being depressed)</li>
            <li><strong>Diminished ability to think or concentrate</strong>, or indecisiveness, nearly every day</li>
            <li><strong>Recurrent thoughts of death</strong>, recurrent suicidal ideation without a plan, or a suicide attempt or specific plan for suicide</li>
          </ol>
          <p className="mb-4"><strong>Additional criteria:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Symptoms cause clinically significant distress or impairment in social, occupational, or other important areas of functioning</li>
            <li>The episode is not attributable to the physiological effects of a substance or another medical condition</li>
            <li>The occurrence is not better explained by schizoaffective disorder, schizophrenia, or other psychotic disorders</li>
            <li>There has never been a manic or hypomanic episode (which would suggest bipolar disorder instead)</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          Note that you don't need all nine symptoms---five is the threshold, and those five must include either depressed mood or anhedonia. The specific combination varies between individuals.
        </p>

        <h2 id="distinguishing-from-sadness" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How MDD Differs from Normal Sadness
        </h2>
        <p className="mb-6">
          One of the most common questions: "Am I just sad, or is this depression?" The distinction matters because MDD requires different intervention than normal emotional responses to life stressors.
        </p>

        <ComparisonTable
          title="Normal Sadness vs. Major Depressive Disorder"
          columns={['Characteristic', 'Normal Sadness', 'Major Depressive Disorder']}
          items={[
            {
              feature: 'Trigger',
              values: [
                'Usually connected to specific event or loss',
                'May occur without clear cause or be disproportionate to trigger',
              ],
            },
            {
              feature: 'Duration',
              values: [
                'Days to weeks; improves as you process the situation',
                'Persists for weeks to months; doesn\'t improve on its own',
              ],
            },
            {
              feature: 'Intensity',
              values: [
                'Painful but bearable; comes in waves',
                'Pervasive and unrelenting; colors everything',
              ],
            },
            {
              feature: 'Functioning',
              values: [
                'Can still work, socialize, handle responsibilities (though harder)',
                'Significant impairment; struggling to meet basic obligations',
              ],
            },
            {
              feature: 'Pleasure capacity',
              values: [
                'Still capable of enjoyment, laughter, connection',
                'Anhedonia---unable to feel pleasure even in normally enjoyable activities',
              ],
            },
            {
              feature: 'Self-perception',
              values: [
                'Self-esteem intact; may feel sad but not worthless',
                'Feelings of worthlessness, guilt, or being a burden',
              ],
            },
            {
              feature: 'Physical symptoms',
              values: [
                'May have some sleep or appetite changes but not severe',
                'Marked changes: insomnia/hypersomnia, significant weight change, profound fatigue',
              ],
            },
            {
              feature: 'Response to support',
              values: [
                'Talking to friends, self-care, time help you feel better',
                'Support appreciated but doesn\'t relieve the depression; needs professional treatment',
              ],
            },
          ]}
          highlightColumn={2}
        />

        <p className="mb-6">
          The key distinctions are <strong>duration</strong> (two weeks minimum), <strong>number of symptoms</strong> (five or more from the DSM list), and <strong>functional impairment</strong> (significant difficulty in life domains). Normal sadness doesn't meet these thresholds. It's also important to note that you can experience both---a person with MDD might have additional sadness about a specific loss layered on top of their depression.
        </p>

        <p className="mb-6">
          <strong>When in doubt, err on the side of seeking evaluation.</strong> Healthcare providers are trained to distinguish between normal emotional responses and clinical depression. Early assessment prevents unnecessary suffering and complications.
        </p>

        <h2 id="severity" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Severity Levels
        </h2>
        <p className="mb-6">
          MDD is classified by severity based on the number of symptoms, intensity of distress, and degree of functional impairment <Citation id="6" index={6} source="Depression and Anxiety" year="2019" tier={1} />:
        </p>

        <ComparisonTable
          title="MDD Severity Specifiers"
          columns={['Severity', 'Symptom Count', 'Functional Impact', 'Treatment Implications']}
          items={[
            {
              feature: 'Mild',
              values: [
                '5-6 symptoms',
                'Minor impairment in work/social functioning',
                'May respond to therapy alone or lifestyle changes',
              ],
            },
            {
              feature: 'Moderate',
              values: [
                '7-8 symptoms or fewer with significant intensity',
                'Noticeable difficulty functioning but still managing',
                'Combination of therapy and medication often recommended',
              ],
            },
            {
              feature: 'Severe (without psychotic features)',
              values: [
                'Most or all symptoms, with marked intensity',
                'Major impairment; struggling to meet basic responsibilities',
                'Medication + therapy strongly recommended; possible hospitalization if safety concerns',
              ],
            },
            {
              feature: 'Severe (with psychotic features)',
              values: [
                'All depression symptoms plus delusions/hallucinations',
                'Severe impairment; often unable to function',
                'Requires intensive treatment; hospitalization often necessary',
              ],
            },
          ]}
          highlightColumn={3}
        />

        <ArticleCallout variant="warning">
          <p>Severity can fluctuate during a depressive episode. Someone with mild MDD can worsen to severe, and severe depression can improve to moderate or mild with treatment. Severity assessment should be ongoing, not just at initial diagnosis.</p>
        </ArticleCallout>

        <h2 id="course" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Course and Natural History
        </h2>
        <p className="mb-6">
          Understanding the typical course of MDD helps set realistic expectations for treatment and recovery <Citation id="3" index={3} source="American Journal of Psychiatry" year="2019" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Episode duration (untreated)',
              description: (
                <div>
                  <p className="mb-2">Without treatment, a major depressive episode typically lasts 6-8 months, though duration varies widely:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Some episodes resolve spontaneously in weeks</li>
                    <li>Others persist for years if untreated</li>
                    <li>Treatment significantly shortens episode duration</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Recovery',
              description: (
                <p>Most people (60-70%) achieve full remission with appropriate treatment. However, recovery is often gradual rather than sudden, with symptom improvement occurring over weeks to months.</p>
              ),
            },
            {
              title: 'Recurrence risk',
              description: (
                <div>
                  <p className="mb-2">MDD is often a recurrent condition <Citation id="5" index={5} source="Journal of Affective Disorders" year="2020" tier={1} />:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>After one episode: ~50% will have another</li>
                    <li>After two episodes: ~70% recurrence rate</li>
                    <li>After three or more: ~90% recurrence rate</li>
                    <li>Each subsequent episode tends to occur more quickly after the last</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Residual symptoms',
              description: (
                <p>Even after remission, some people experience lingering low-level symptoms (residual depression). These increase risk for relapse and may warrant continued treatment.</p>
              ),
            },
            {
              title: 'Chronicity',
              description: (
                <p>A subset (15-20%) of people develop chronic MDD, with symptoms persisting for two years or more. This overlaps with persistent depressive disorder (dysthymia) and may require long-term or different treatment approaches.</p>
              ),
            },
          ]}
        />

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Recover within 6 months with treatment' },
            { value: 80, suffix: '%', label: 'Achieve remission within one year with adequate treatment' },
            { value: 40, suffix: '%', label: 'Experience recurrence within two years of recovery' },
          ]}
          source="American Journal of Psychiatry, 2019"
        />

        <h2 id="symptoms-detail" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Experience of MDD: Beyond the Checklist
        </h2>
        <p className="mb-6">
          Diagnostic criteria don't capture the lived experience. Here's what the core symptoms actually feel like:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'emotional',
              label: 'Emotional Symptoms',
              content: (
                <div>
                  <p className="mb-4"><strong>Depressed mood:</strong> Not just sadness but a pervasive emptiness, heaviness, or hopelessness that colors everything. Some describe it as emotional numbness or feeling dead inside.</p>
                  <p className="mb-4"><strong>Anhedonia:</strong> The inability to feel pleasure is often more disabling than sadness. Activities that used to bring joy---hobbies, sex, time with loved ones---feel flat and pointless. You go through the motions without genuine enjoyment.</p>
                  <p className="mb-4"><strong>Guilt and worthlessness:</strong> Not proportional self-criticism but pervasive, often delusional beliefs about being fundamentally flawed, a burden, or deserving of suffering.</p>
                </div>
              ),
            },
            {
              id: 'cognitive',
              label: 'Cognitive Symptoms',
              content: (
                <div>
                  <p className="mb-4"><strong>Concentration problems:</strong> Reading the same paragraph five times, zoning out during conversations, inability to follow TV shows or complex tasks <Citation id="9" index={9} source="CNS Drugs" year="2020" tier={1} />.</p>
                  <p className="mb-4"><strong>Decision paralysis:</strong> Even trivial choices feel overwhelming. What to wear, what to eat, which email to answer---all require energy you don't have.</p>
                  <p className="mb-4"><strong>Memory impairment:</strong> Forgetting recent conversations, appointments, or what you did yesterday. Short-term memory feels unreliable.</p>
                  <p className="mb-4"><strong>Negative thinking patterns:</strong> Automatic thoughts of hopelessness, self-blame, and pessimism about the future. Cognitive distortions become pervasive.</p>
                </div>
              ),
            },
            {
              id: 'physical',
              label: 'Physical Symptoms',
              content: (
                <div>
                  <p className="mb-4"><strong>Fatigue:</strong> Profound exhaustion that sleep doesn't relieve. Getting out of bed feels like moving through concrete. Everything requires enormous effort.</p>
                  <p className="mb-4"><strong>Sleep disturbance:</strong> Insomnia (especially early morning awakening), hypersomnia (sleeping 12+ hours but never feeling rested), or disrupted sleep architecture.</p>
                  <p className="mb-4"><strong>Appetite/weight changes:</strong> Either significant loss of appetite and weight, or increased eating (especially comfort foods) and weight gain.</p>
                  <p className="mb-4"><strong>Psychomotor changes:</strong> Either agitation (restlessness, inability to sit still, pacing) or retardation (moving in slow motion, delayed speech, prolonged pauses).</p>
                  <p className="mb-4"><strong>Physical pain:</strong> Unexplained aches, headaches, digestive problems---depression often manifests physically.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="specifiers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Additional Specifiers
        </h2>
        <p className="mb-6">
          Beyond severity, MDD can be further specified by particular features that inform treatment <Citation id="1" index={1} source="American Psychiatric Association" year="2022" tier={4} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'anxious',
              title: 'With Anxious Distress',
              content: (
                <p>At least two symptoms of anxiety (feeling tense, restless, difficulty concentrating due to worry, fear of something awful happening, feeling loss of control). Common (affects 45-50% of MDD cases) and associated with poorer outcomes, higher suicide risk, and need for different treatment approach.</p>
              ),
            },
            {
              id: 'mixed',
              title: 'With Mixed Features',
              content: (
                <p>Presence of at least three manic/hypomanic symptoms (elevated mood, grandiosity, increased talkativeness, racing thoughts, increased activity, excessive risk-taking) during the depressive episode. Suggests possible bipolar disorder and contraindicates antidepressant monotherapy.</p>
              ),
            },
            {
              id: 'melancholic',
              title: 'With Melancholic Features',
              content: (
                <div>
                  <p className="mb-2">Characterized by:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Loss of pleasure in almost all activities</li>
                    <li>Lack of reactivity to normally pleasurable stimuli</li>
                    <li>Depression worse in morning</li>
                    <li>Early morning awakening (2+ hours before usual)</li>
                    <li>Marked psychomotor retardation or agitation</li>
                    <li>Significant anorexia or weight loss</li>
                    <li>Excessive or inappropriate guilt</li>
                  </ul>
                  <p className="mt-2">May respond better to biological treatments (medication, ECT).</p>
                </div>
              ),
            },
            {
              id: 'atypical',
              title: 'With Atypical Features',
              content: (
                <div>
                  <p className="mb-2">Mood reactivity (brightens in response to positive events) plus at least two of:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Significant weight gain or increased appetite</li>
                    <li>Hypersomnia (sleeping excessively)</li>
                    <li>Leaden paralysis (heavy feeling in arms/legs)</li>
                    <li>Interpersonal rejection sensitivity</li>
                  </ul>
                  <p className="mt-2">May respond better to MAOIs or atypical antidepressants.</p>
                </div>
              ),
            },
            {
              id: 'psychotic',
              title: 'With Psychotic Features',
              content: (
                <div>
                  <p className="mb-2">Presence of delusions or hallucinations during the depressive episode. Often mood-congruent (poverty, guilt, disease, death, deserved punishment) but can be mood-incongruent.</p>
                  <p className="mb-2">Requires antipsychotic medication in addition to antidepressant. Higher risk for bipolar disorder. Severe functional impairment.</p>
                </div>
              ),
            },
            {
              id: 'catatonic',
              title: 'With Catatonia',
              content: (
                <p>Marked psychomotor disturbance with at least three of: stupor, catalepsy, waxy flexibility, mutism, negativism, posturing, mannerisms, stereotypies, agitation, grimacing, echolalia, echopraxia. Rare but serious; may require specialized treatment.</p>
              ),
            },
            {
              id: 'peripartum',
              title: 'With Peripartum Onset',
              content: (
                <p>Onset during pregnancy or within four weeks postpartum. Affects 10-15% of women. Requires specialized treatment approach considering breastfeeding, infant care responsibilities, and hormonal factors.</p>
              ),
            },
            {
              id: 'seasonal',
              title: 'With Seasonal Pattern',
              content: (
                <p>Regular temporal relationship between depressive episodes and time of year (typically fall/winter), with remission in spring/summer. Responds to light therapy in addition to standard treatments.</p>
              ),
            },
          ]}
        />

        <h2 id="functional-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Functional Impairment
        </h2>
        <p className="mb-6">
          MDD causes significant disability across all life domains <Citation id="7" index={7} source="British Journal of Psychiatry" year="2018" tier={1} />:
        </p>

        <ArticleChart
          type="bar"
          title="Functional Impairment by Life Domain in MDD"
          data={[
            { label: 'Work performance', value: 75 },
            { label: 'Social relationships', value: 70 },
            { label: 'Family functioning', value: 68 },
            { label: 'Self-care/ADLs', value: 55 },
            { label: 'Physical health', value: 60 },
          ]}
          source="Percentage reporting significant impairment, British Journal of Psychiatry 2018"
        />

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Occupational:</strong> Reduced productivity, increased absenteeism, difficulty concentrating, errors in work, strained relationships with colleagues, job loss</li>
          <li><strong>Social:</strong> Withdrawal from friends, canceled plans, inability to enjoy social activities, strained relationships</li>
          <li><strong>Familial:</strong> Emotional unavailability to partner/children, reduced parenting capacity, increased conflict, burden on family members</li>
          <li><strong>Physical health:</strong> Neglect of exercise, poor nutrition, medication non-adherence for other conditions, increased risk for cardiovascular disease and other illnesses</li>
          <li><strong>Financial:</strong> Lost income from work impairment, medical costs, poor financial decision-making</li>
        </ul>

        <p className="mb-6">
          The World Health Organization ranks MDD as a leading cause of disability worldwide. Its impact extends beyond the individual to families, workplaces, and communities.
        </p>

        <h2 id="suicide-risk" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Suicide Risk
        </h2>
        <p className="mb-6">
          MDD carries significant suicide risk that must be taken seriously <Citation id="8" index={8} source="American Journal of Psychiatry" year="2021" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 60, suffix: '%', label: 'Of suicide deaths are associated with mood disorders' },
            { value: 15, suffix: '%', label: 'Lifetime suicide risk for people with severe MDD' },
            { value: 2, suffix: '%', label: 'Annual suicide attempt rate among those with MDD' },
          ]}
          source="American Journal of Psychiatry, 2021"
        />

        <ArticleCallout variant="warning" title="Risk Factors for Suicide in MDD">
          <ul className="list-disc pl-6 space-y-2">
            <li>Severe depression symptoms, especially hopelessness</li>
            <li>Previous suicide attempt(s)</li>
            <li>Current suicidal ideation with plan or intent</li>
            <li>Psychotic features (especially command hallucinations)</li>
            <li>Comorbid substance use disorder</li>
            <li>Comorbid anxiety or panic attacks</li>
            <li>Insomnia and agitation</li>
            <li>Recent discharge from psychiatric hospitalization</li>
            <li>Social isolation and lack of support</li>
            <li>Access to lethal means</li>
            <li>Family history of suicide</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          <strong>If you or someone you know is experiencing suicidal thoughts:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Call or text 988 (Suicide & Crisis Lifeline) available 24/7</li>
          <li>Text HOME to 741741 (Crisis Text Line)</li>
          <li>Go to the nearest emergency room</li>
          <li>Call 911 if in immediate danger</li>
          <li>Remove access to lethal means</li>
          <li>Don't leave the person alone</li>
        </ul>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment
        </h2>
        <p className="mb-6">
          MDD is highly treatable, with multiple evidence-based approaches <Citation id="4" index={4} source="Lancet Psychiatry" year="2021" tier={1} />:
        </p>

        <BeforeAfter
          before={{
            title: 'First-Line Treatments',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Psychotherapy:</strong> Cognitive Behavioral Therapy (CBT), Interpersonal Therapy (IPT), Behavioral Activation---all with strong evidence</li>
                <li><strong>Antidepressant medication:</strong> SSRIs, SNRIs, other classes---effective in 50-70% of patients</li>
                <li><strong>Combination:</strong> Therapy + medication often more effective than either alone, especially for moderate-severe depression</li>
              </ul>
            ),
          }}
          after={{
            title: 'Second-Line/Augmentation',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Different medication class or combination</li>
                <li>Augmentation strategies (adding lithium, antipsychotic, or thyroid hormone)</li>
                <li>More intensive psychotherapy</li>
                <li>Brain stimulation: ECT, TMS, ketamine</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6">
          <strong>Lifestyle and self-care (adjunctive to professional treatment):</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Regular exercise (evidence comparable to medication for mild-moderate depression)</li>
          <li>Sleep hygiene and regular sleep schedule</li>
          <li>Social connection and support</li>
          <li>Structured activities and behavioral activation</li>
          <li>Stress management and relaxation techniques</li>
          <li>Nutrition and avoiding alcohol/drugs</li>
        </ul>

        <ArticleCallout variant="tip" title="Treatment Duration">
          <p className="mb-4">Acute treatment (achieving remission): 6-12 weeks minimum, often 3-6 months</p>
          <p className="mb-4">Continuation treatment (preventing relapse): 4-9 months after remission</p>
          <p>Maintenance treatment (preventing recurrence): For those with recurrent MDD, long-term or indefinite treatment may be recommended</p>
        </ArticleCallout>

        <h2 id="prognosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Prognosis and Long-Term Outlook
        </h2>
        <p className="mb-6">
          With treatment, the prognosis for MDD is generally good:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Response rates:</strong> 60-70% respond to first treatment trial, higher with subsequent trials</li>
          <li><strong>Remission:</strong> 50-60% achieve full remission within 6 months, 80% within a year with adequate treatment</li>
          <li><strong>Functionality:</strong> Most people return to previous levels of functioning after treatment</li>
          <li><strong>Quality of life:</strong> Significant improvement in all domains with successful treatment</li>
        </ul>

        <p className="mb-6">
          However, MDD often requires ongoing attention:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>High recurrence rate necessitates vigilance for early warning signs</li>
          <li>Some people need long-term or lifelong treatment to prevent recurrence</li>
          <li>Early intervention for new episodes improves outcomes</li>
          <li>Building coping skills and support systems reduces recurrence risk</li>
        </ul>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Help
        </h2>
        <p className="mb-6">
          Recognizing when to reach out for professional support is crucial. Don't wait until symptoms become unbearable---early intervention leads to better outcomes and faster recovery.
        </p>

        <ArticleCallout variant="action-plan" title="Seek Help Immediately If:">
          <ul className="list-disc pl-6 space-y-2">
            <li>You have thoughts of suicide or self-harm</li>
            <li>You're unable to care for yourself (hygiene, eating, basic functioning)</li>
            <li>You experience psychotic symptoms (delusions, hallucinations)</li>
            <li>Depression is putting you or others at risk</li>
            <li>You're having a severe panic attack or mental health crisis</li>
          </ul>
          <p className="mt-4 font-semibold">Call 988 (Suicide & Crisis Lifeline), go to the emergency room, or call 911.</p>
        </ArticleCallout>

        <p className="mb-6">
          <strong>Schedule an appointment with a healthcare provider soon if:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You've had five or more symptoms from the DSM-5-TR list for two weeks or longer</li>
          <li>Symptoms are interfering with work, relationships, or daily functioning</li>
          <li>You're withdrawing from people and activities you used to enjoy</li>
          <li>You're using alcohol or drugs to cope with emotional pain</li>
          <li>Physical symptoms (sleep problems, appetite changes, fatigue) persist without medical cause</li>
          <li>Loved ones have expressed concern about changes in your mood or behavior</li>
          <li>You have a history of depression and recognize early warning signs returning</li>
        </ul>

        <p className="mb-6">
          <strong>Who can help:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Primary care physician:</strong> Start here for initial assessment, medical workup to rule out other causes, and first-line treatment</li>
          <li><strong>Psychiatrist:</strong> Medical doctor specializing in mental health; can prescribe medication and provide psychotherapy</li>
          <li><strong>Psychologist or therapist:</strong> Provides evidence-based psychotherapy (CBT, IPT, etc.); cannot prescribe medication but works collaboratively with medical providers</li>
          <li><strong>Psychiatric nurse practitioner:</strong> Can diagnose, prescribe medication, and provide therapy</li>
          <li><strong>Licensed clinical social worker or counselor:</strong> Provides therapy and connects you with community resources</li>
        </ul>

        <ArticleCallout variant="tip" title="Preparing for Your First Appointment">
          <p className="mb-4">Maximize your first visit by bringing:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A list of your symptoms, when they started, and how they affect your life</li>
            <li>Your personal and family mental health history</li>
            <li>Current medications and supplements</li>
            <li>Questions about diagnosis and treatment options</li>
            <li>Someone to support you, if helpful (they can provide perspective and remember information)</li>
          </ul>
          <p className="mt-4">Be honest about all symptoms, including thoughts of self-harm. Your provider needs complete information to help you effectively.</p>
        </ArticleCallout>

        <p className="mb-6">
          <strong>What to expect in treatment:</strong> Your first appointment will involve a comprehensive evaluation of your symptoms, medical history, and functional impairment. Your provider will discuss treatment options tailored to your needs---this might be therapy, medication, or both. Treatment is collaborative; you're an active participant in choosing your approach. If the first treatment doesn't work, there are many alternatives. Finding the right fit sometimes takes trial and adjustment, but persistence pays off.
        </p>

        <QuoteBlock
          quote="Major Depressive Disorder is not a life sentence. It's a treatable medical condition. Most people recover, many fully. The key is recognizing it, seeking help, and finding the right treatment approach for you."
          attribution="Raima"
          role="Clinical Psychologist"
          variant="large"
        />

        <p className="mb-6">
          If you recognize yourself in this description of MDD, you're not alone, and help is available. The first step is reaching out to a healthcare provider for evaluation. Depression lies when it tells you nothing will help---that's a symptom, not reality. Treatment works, recovery is possible, and there's hope for a life beyond depression.
        </p>
      </>
    ),
  },

  {
    id: catId(12),
    slug: 'persistent-depressive-disorder-dysthymia',
    title: 'Persistent Depressive Disorder: When Low Mood Becomes Your Baseline',
    description: 'Dysthymia or persistent depressive disorder is chronic, low-grade depression lasting years. Understand symptoms, how it differs from MDD, and treatment approaches.',
    image: "/images/articles/cat07/cover-012.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Dysthymia', 'PDD', 'Chronic Depression', 'Persistent Depression'],
    summary: 'Persistent Depressive Disorder (PDD), formerly dysthymia, is chronic low-grade depression lasting at least two years. While less severe than major depression at any moment, its relentless duration creates profound cumulative suffering. Many normalize it as personality rather than recognizing a treatable medical condition.',
    keyFacts: [
      { text: 'PDD requires depressed mood for most days over 2+ years, with only 2 additional symptoms (vs. 5 for major depression)', citationIndex: 2 },
      { text: '75% of people with PDD experience major depressive episodes too---a pattern called "double depression" where acute episodes layer on chronic baseline depression', citationIndex: 3 },
      { text: 'Early-onset PDD (before age 21) is strongly linked to childhood trauma and shows greater treatment resistance than late-onset', citationIndex: 7 },
      { text: '70% report significant quality of life impairment, and 50% have never experienced full remission without treatment', citationIndex: 4 },
      { text: 'Combination therapy (psychotherapy + medication) proves more effective than either alone, with CBASP specifically designed for chronic depression', citationIndex: 5 },
    ],
    sparkMoment: 'What you\'ve normalized as "just who you are" may be a treatable illness. PDD convinces you this is your personality, but depression talking isn\'t reality---recovery is possible even after decades.',
    practicalExercise: {
      title: 'Mapping Your Baseline',
      steps: [
        { title: 'Identify Your Timeline', description: 'Think back: when was the last time you felt genuinely well? Write down a timeline of your mood over the past 5-10 years. Can you identify a clear "before"?' },
        { title: 'Distinguish Personality from Symptoms', description: 'List traits you consider "just me" (pessimistic, low-energy, joyless). Now, list DSM symptoms of PDD. Notice overlaps---what you call personality might be illness.' },
        { title: 'Track "Good Days"', description: 'For two weeks, note any days you feel slightly better. Do symptoms lift even temporarily? If yes, this suggests depression (which fluctuates) rather than fixed personality.' },
        { title: 'Imagine Wellness', description: 'If your low mood lifted tomorrow, what would change? How would you spend your time? What would you pursue? This exercise reveals what depression has taken from you.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Mood Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'Persistent depressive disorder: Clinical and epidemiological review',
        source: 'Harvard Review of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1097/HRP.0000000000000256',
        tier: 1,
      },
      {
        id: '2',
        text: 'DSM-5-TR: Persistent Depressive Disorder diagnostic criteria',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://www.psychiatry.org/psychiatrists/practice/dsm',
        tier: 4,
      },
      {
        id: '3',
        text: 'Double depression: When dysthymia and major depression co-occur',
        source: 'Journal of Affective Disorders',
        year: '2019',
        link: 'https://doi.org/10.1016/j.jad.2019.08.015',
        tier: 1,
      },
      {
        id: '4',
        text: 'Quality of life impairment in persistent depressive disorder',
        source: 'Depression and Anxiety',
        year: '2018',
        link: 'https://doi.org/10.1002/da.22745',
        tier: 1,
      },
      {
        id: '5',
        text: 'Treatment of persistent depressive disorder: Psychotherapy outcomes',
        source: 'American Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1176/appi.ajp.2019.19050486',
        tier: 1,
      },
      {
        id: '6',
        text: 'Pharmacotherapy for persistent depressive disorder: A systematic review',
        source: 'CNS Drugs',
        year: '2021',
        link: 'https://doi.org/10.1007/s40263-021-00802-1',
        tier: 1,
      },
      {
        id: '7',
        text: 'Childhood adversity and persistent depressive disorder',
        source: 'JAMA Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1001/jamapsychiatry.2019.0337',
        tier: 1,
      },
      {
        id: '8',
        text: 'Early-onset vs. late-onset dysthymia: Clinical differences',
        source: 'Journal of Clinical Psychiatry',
        year: '2018',
        link: 'https://doi.org/10.4088/JCP.17m11852',
        tier: 1,
      },
      {
        id: '9',
        text: 'Functional impairment in persistent depressive disorder compared to major depression',
        source: 'Psychological Medicine',
        year: '2020',
        link: 'https://doi.org/10.1017/S0033291720000306',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Imagine waking up with a low-level sense of sadness, fatigue, and hopelessness---not just today, but every day for years. Not severe enough to be completely incapacitating, but persistent enough that you can barely remember what it feels like to be genuinely happy. This is persistent depressive disorder, formerly known as dysthymia.
          </p>
          <p className="mb-6">
            Persistent Depressive Disorder (PDD) is chronic, low-grade depression that lasts for at least two years in adults (one year in children/adolescents). While less severe than major depression at any given moment, its chronicity creates profound cumulative suffering and impairment <Citation id="1" index={1} source="Harvard Review of Psychiatry" year="2020" tier={1} />. Many people with PDD assume their persistent low mood is just "how they are"---personality rather than a treatable condition.
          </p>
        </div>

        <h2 id="diagnostic-criteria" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Diagnostic Criteria
        </h2>
        <p className="mb-6">
          According to DSM-5-TR <Citation id="2" index={2} source="American Psychiatric Association" year="2022" tier={4} />:
        </p>

        <ArticleCallout variant="clinical-note" title="DSM-5-TR Criteria for Persistent Depressive Disorder">
          <p className="mb-4"><strong>A. Depressed mood for most of the day, for more days than not, for at least 2 years</strong> (1 year for children/adolescents)</p>
          <p className="mb-4"><strong>B. Presence, while depressed, of two or more of the following:</strong></p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Poor appetite or overeating</li>
            <li>Insomnia or hypersomnia</li>
            <li>Low energy or fatigue</li>
            <li>Low self-esteem</li>
            <li>Poor concentration or difficulty making decisions</li>
            <li>Feelings of hopelessness</li>
          </ol>
          <p className="mb-4"><strong>C.</strong> During the 2-year period, never without symptoms for more than 2 months at a time</p>
          <p className="mb-4"><strong>D.</strong> Criteria for major depressive disorder may be continuously present for 2 years</p>
          <p className="mb-4"><strong>E.</strong> Never a manic or hypomanic episode</p>
          <p className="mb-4"><strong>F.</strong> Not better explained by persistent schizoaffective disorder, psychotic disorder, substance use, or medical condition</p>
          <p><strong>G.</strong> Causes clinically significant distress or impairment</p>
        </ArticleCallout>

        <p className="mb-6">
          Key points:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Duration is key:</strong> Must last at least 2 years (vs. 2 weeks for major depression)</li>
          <li><strong>Lower symptom threshold:</strong> Only 2 additional symptoms required (vs. 5 for MDD)</li>
          <li><strong>Persistent, not episodic:</strong> Continuous or nearly continuous, not distinct episodes with clear beginnings and endings</li>
          <li><strong>Can overlap with MDD:</strong> You can have both PDD and major depressive episodes (called "double depression")</li>
        </ul>

        <h2 id="vs-mdd" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          PDD vs. Major Depressive Disorder
        </h2>

        <ComparisonTable
          title="Persistent Depressive Disorder vs. Major Depressive Disorder"
          columns={['Feature', 'Persistent Depressive Disorder', 'Major Depressive Disorder']}
          items={[
            { feature: 'Duration', values: ['At least 2 years continuously', 'At least 2 weeks'] },
            { feature: 'Symptom count', values: ['Depressed mood + 2 other symptoms', 'At least 5 symptoms total'] },
            { feature: 'Severity', values: ['Generally milder (but chronic)', 'Can be mild, moderate, or severe'] },
            { feature: 'Course', values: ['Chronic, persistent baseline', 'Episodic with clear beginning/end'] },
            { feature: 'Functional impact', values: ['Chronic impairment, insidious', 'Acute, often more visible impairment'] },
            { feature: 'Recognition', values: [`Often unrecognized ("that's just me")`, 'More likely to be identified as illness'] },
            { feature: 'Treatment-seeking', values: ['Lower rates; normalized as personality', 'Higher rates due to acute distress'] },
          ]}
          highlightColumn={1}
        />

        <ArticleCallout variant="did-you-know">
          <p>About 75% of people with PDD also experience major depressive episodes at some point---a pattern called "double depression" <Citation id="3" index={3} source="Journal of Affective Disorders" year="2019" tier={1} />. Imagine your baseline is already depressed, and then you experience acute major depression on top of it. When the major episode resolves, you return to chronic dysthymia rather than full wellness.</p>
        </ArticleCallout>

        <h2 id="what-it-feels-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What PDD Feels Like
        </h2>
        <p className="mb-6">
          Because PDD is chronic, people often don't recognize it as depression. It becomes normalized as "just how I am." Common descriptions:
        </p>

        <QuoteBlock
          quote="I've been this way for so long that I don't remember what it's like to feel normal. I assume this is just my personality---I'm a pessimistic, low-energy person. But it's exhausting being me."
          attribution="Anonymous patient with PDD"
          role="Living with persistent depressive disorder"
          variant="large"
        />

        <ArticleTabs
          tabs={[
            {
              id: 'emotional',
              label: 'Emotional Experience',
              content: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Persistent low-level sadness or emptiness that feels like your baseline</li>
                    <li>Joylessness---rarely experiencing genuine happiness or excitement</li>
                    <li>Pervasive pessimism and negative outlook on life</li>
                    <li>Low self-esteem that feels like accurate self-perception rather than distortion</li>
                    <li>Chronic feelings of inadequacy or being "less than" others</li>
                    <li>Hopelessness about the future---not expecting things to improve</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'cognitive',
              label: 'Cognitive Experience',
              content: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Difficulty making decisions, even minor ones</li>
                    <li>Poor concentration that's been chronic for so long you've adapted</li>
                    <li>Negative thinking patterns that feel like realism, not depression</li>
                    <li>Self-critical inner voice that you've internalized as truth</li>
                    <li>Difficulty imagining feeling different or believing change is possible</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'physical',
              label: 'Physical Experience',
              content: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Chronic low energy---you've learned to function despite constant fatigue</li>
                    <li>Sleep problems (too much or too little) for years</li>
                    <li>Appetite changes (undereating or overeating) as long-term pattern</li>
                    <li>Physical heaviness or lethargy</li>
                    <li>Lack of vitality or zest for life</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'social',
              label: 'Social/Functional',
              content: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Persistent sense of not fitting in or connecting with others</li>
                    <li>Social withdrawal becomes habitual</li>
                    <li>Relationships feel effortful; you go through motions without genuine engagement</li>
                    <li>Chronic underachievement relative to potential</li>
                    <li>Life feels like you're just surviving, not thriving</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="onset" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Onset and Course
        </h2>
        <p className="mb-6">
          PDD is distinguished by age of onset <Citation id="8" index={8} source="Journal of Clinical Psychiatry" year="2018" tier={1} />:
        </p>

        <BeforeAfter
          before={{
            title: 'Early-Onset PDD (before age 21)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Often begins in childhood or adolescence</li>
                <li>Strong association with childhood adversity and trauma <Citation id="7" index={7} source="JAMA Psychiatry" year="2019" tier={1} /></li>
                <li>May be viewed as "just shy" or "always been moody"</li>
                <li>More likely to have personality disorder features</li>
                <li>More resistant to treatment</li>
                <li>Greater cumulative impairment over lifespan</li>
              </ul>
            ),
          }}
          after={{
            title: 'Late-Onset PDD (age 21 or later)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Develops in adulthood, often after life stressors</li>
                <li>May follow unresolved major depressive episode</li>
                <li>Person remembers what wellness felt like</li>
                <li>Less personality pathology</li>
                <li>Better treatment response</li>
                <li>May be more likely to seek help</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6">
          <strong>Natural course without treatment:</strong> PDD is often lifelong. The average duration is 5-10 years, but many people experience it for decades. Spontaneous remission is uncommon.
        </p>

        <h2 id="impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Cumulative Toll
        </h2>
        <p className="mb-6">
          While PDD may be less severe than major depression at any single point, its chronicity creates profound cumulative impact <Citation id="4" index={4} source="Depression and Anxiety" year="2018" tier={1} /> <Citation id="9" index={9} source="Psychological Medicine" year="2020" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 70, suffix: '%', label: 'Report significant quality of life impairment' },
            { value: 55, suffix: '%', label: 'Experience chronic work/school difficulties' },
            { value: 50, suffix: '%', label: 'Have never experienced full remission without treatment' },
          ]}
          source="Depression and Anxiety, 2018"
        />

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Lost potential:</strong> Years or decades of underachievement, missed opportunities, unfulfilled goals</li>
          <li><strong>Relationship impact:</strong> Chronic emotional unavailability, difficulty forming or maintaining close relationships</li>
          <li><strong>Identity formation:</strong> Depression becomes fused with identity---"I'm just a sad person"</li>
          <li><strong>Missed developmental milestones:</strong> Especially for early-onset PDD---normal adolescent/young adult experiences missed</li>
          <li><strong>Compound stress:</strong> Chronic low mood makes all life stressors harder to manage</li>
          <li><strong>Hopelessness about treatment:</strong> After years of feeling this way, many doubt anything can help</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>The chronicity of PDD often makes it more disabling than major depression despite lower symptom severity. Someone with MDD experiences acute suffering but may have periods of wellness. Someone with PDD experiences continuous suffering that becomes their normal, with no memory of feeling truly well.</p>
        </ArticleCallout>

        <h2 id="why-unrecognized" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why PDD Often Goes Unrecognized
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'normalized',
              title: 'Normalized as Personality',
              content: (
                <div>
                  <p className="mb-4">After years of persistent low mood, both the person and those around them accept it as "just who they are"---a pessimistic, low-energy, joyless person.</p>
                  <p>This is fundamentally different from recognizing an illness. You don't seek treatment for your personality.</p>
                </div>
              ),
            },
            {
              id: 'gradual',
              title: 'Gradual, Insidious Onset',
              content: (
                <p>Unlike major depression with clear onset, PDD often develops so gradually that there's no obvious 'before' to compare to. People can't identify when they became depressed because it's been so long.</p>
              ),
            },
            {
              id: 'functional',
              title: 'Functional Adaptation',
              content: (
                <div>
                  <p className="mb-4">Most people with PDD remain functional---going to work, maintaining basic self-care, meeting responsibilities. This masks the internal suffering.</p>
                  <p>Others think "they're fine' because they're functioning, and the person themselves may think "it can't be depression because I'm managing."</p>
                </div>
              ),
            },
            {
              id: 'comparison',
              title: 'Comparison to Major Depression',
              content: (
                <p>Because PDD symptoms are milder than major depression, people dismiss their experience: "I'm not depressed---I can get out of bed, I go to work. This is just normal life."</p>
              ),
            },
            {
              id: 'lowered-expectations',
              title: 'Lowered Expectations',
              content: (
                <div>
                  <p className="mb-4">After years of chronic low mood, expectations for happiness, energy, and life satisfaction become so low that the current state seems acceptable.</p>
                  <p>The idea of feeling genuinely happy, energized, or hopeful seems unrealistic or even unattainable.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="getting-diagnosed" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Getting the Right Diagnosis
        </h2>
        <p className="mb-6">
          Because PDD is so often mistaken for personality, getting an accurate diagnosis requires deliberate effort. Here's how to approach evaluation:
        </p>

        <ArticleCallout variant="action-plan" title="Steps to Accurate Diagnosis">
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong>Prepare a symptom history:</strong> Document your mood, energy, sleep, appetite, self-esteem, concentration, and hopelessness over the past several years. Note any pattern or chronicity.</li>
            <li><strong>Identify a timeline:</strong> When did these symptoms begin? Was there ever a period of wellness? If symptoms started in childhood/adolescence, note that---it indicates early-onset PDD.</li>
            <li><strong>Distinguish baseline from episodes:</strong> Have you experienced periods of significantly worse depression (possible major episodes)? Or has your mood been consistently low without much variation?</li>
            <li><strong>Assess functional impact:</strong> How has this affected school, work, relationships, and quality of life over years? Chronic underachievement or relationship difficulties are clues.</li>
            <li><strong>Rule out other causes:</strong> Medical conditions (hypothyroidism, anemia, sleep apnea) and substance use can mimic depression. Your provider will need to assess these.</li>
            <li><strong>Screen for bipolar disorder:</strong> Have you ever experienced periods of elevated mood, decreased need for sleep, increased energy/activity, or impulsivity? If so, mention this---it changes diagnosis and treatment.</li>
          </ol>
        </ArticleCallout>

        <p className="mb-6">
          <strong>Questions your provider will ask:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>"How long have you felt this way?"---This distinguishes PDD (years) from major depression (weeks/months)</li>
          <li>"Can you remember a time when you felt consistently well?"---Lack of wellness memory suggests chronicity</li>
          <li>"Do others describe you as pessimistic, low-energy, or moody?"---External observations validate chronicity</li>
          <li>"Have symptoms been continuous or episodic?"---PDD is persistent; major depression is episodic</li>
          <li>"How has this affected your life over time?"---Cumulative impact assessment</li>
        </ul>

        <ArticleCallout variant="warning">
          <p className="mb-4"><strong>Common diagnostic challenges:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Misdiagnosis as personality disorder:</strong> Early-onset PDD can look like avoidant, dependent, or borderline personality traits. Key difference: PDD has clear mood symptoms and responds to depression treatment.</li>
            <li><strong>Missed bipolar disorder:</strong> If PDD is actually bipolar depression misdiagnosed, antidepressant monotherapy can trigger mania. Always screen for manic/hypomanic history.</li>
            <li><strong>Overlooking comorbidities:</strong> PDD frequently co-occurs with anxiety, substance use, or personality disorders. All need treatment for best outcomes.</li>
          </ul>
        </ArticleCallout>

        <h2 id="double-depression" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Double Depression
        </h2>
        <p className="mb-6">
          Double depression occurs when someone with PDD experiences a major depressive episode <Citation id="3" index={3} source="Journal of Affective Disorders" year="2019" tier={1} />:
        </p>

        <ArticleChart
          type="line"
          title="Mood Course in Double Depression"
          data={[
            { label: 'Baseline PDD', value: 30 },
            { label: 'Major episode begins', value: 10 },
            { label: 'Episode continues', value: 5 },
            { label: 'Major episode resolves', value: 30 },
            { label: 'Returns to PDD baseline', value: 30 },
          ]}
          source="Conceptual representation of mood trajectory"
        />

        <p className="mb-6">
          <strong>Implications:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Higher risk for major depression compared to general population</li>
          <li>When major episode resolves, return to dysthymic baseline (not full wellness)</li>
          <li>This can be confusing---"I got better, but I still don't feel normal"</li>
          <li>Both the PDD and the major depression require treatment</li>
          <li>Poorer overall prognosis than either condition alone</li>
          <li>Higher suicide risk</li>
        </ul>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment
        </h2>
        <p className="mb-6">
          PDD is treatable, though it may require longer or more intensive intervention than major depression.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Psychotherapy (especially effective for PDD)',
              description: (
                <div>
                  <p className="mb-2"><strong>Cognitive Behavioral Therapy (CBT):</strong> Challenges deeply ingrained negative thought patterns <Citation id="5" index={5} source="American Journal of Psychiatry" year="2020" tier={1} /></p>
                  <p className="mb-2"><strong>Cognitive Behavioral Analysis System of Psychotherapy (CBASP):</strong> Developed specifically for chronic depression; focuses on interpersonal patterns and consequences of behavior</p>
                  <p className="mb-2"><strong>Interpersonal Therapy (IPT):</strong> Addresses relationship patterns and social functioning</p>
                  <p className="mb-2"><strong>Psychodynamic therapy:</strong> Explores early experiences and underlying patterns</p>
                  <p className="mt-2">Therapy for PDD often requires longer duration (1-2 years) than for episodic MDD.</p>
                </div>
              ),
            },
            {
              title: 'Medication',
              description: (
                <div>
                  <p className="mb-4"><strong>Antidepressants:</strong> SSRIs, SNRIs, and other classes show effectiveness <Citation id="6" index={6} source="CNS Drugs" year="2021" tier={1} /></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>May take longer to see response than in major depression</li>
                    <li>Often requires long-term or indefinite use to prevent relapse</li>
                    <li>Combination with psychotherapy more effective than either alone</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Lifestyle and behavioral interventions',
              description: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Behavioral activation to increase rewarding activities</li>
                    <li>Regular exercise (strong evidence for mood improvement)</li>
                    <li>Social connection and support groups</li>
                    <li>Sleep hygiene and circadian rhythm regulation</li>
                    <li>Mindfulness-based approaches</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Addressing comorbidities',
              description: (
                <p>PDD frequently co-occurs with anxiety disorders, substance use disorders, and personality disorders. Comprehensive treatment addresses all presenting conditions.</p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="tip" title="What to Expect in Treatment">
          <ul className="list-disc pl-6 space-y-2">
            <li>Improvement is often gradual, not sudden</li>
            <li>You may notice small shifts before major changes</li>
            <li>Treatment duration is typically longer than for episodic depression</li>
            <li>Setbacks are normal; recovery is not linear</li>
            <li>The goal isn't just symptom reduction but reclaiming a life worth living</li>
          </ul>
        </ArticleCallout>

        <h2 id="hope" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Hope
        </h2>
        <p className="mb-6">
          If you've lived with persistent low mood for years, the idea that you could feel different may seem impossible. PDD convinces you that this is just who you are, that happiness isn't in your nature, that expecting more is unrealistic.
        </p>

        <p className="mb-6">
          <strong>But this is depression talking, not reality.</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>PDD is a medical condition, not your personality</li>
          <li>Treatment works---many people experience significant or full remission</li>
          <li>Even partial improvement in chronic depression dramatically increases quality of life</li>
          <li>You don't have to settle for "just getting by"</li>
          <li>Recovery is possible even after decades of persistent depression</li>
        </ul>

        <QuoteBlock
          quote="I didn't realize I was depressed for 15 years. I thought I was just a pessimistic, low-energy person. Treatment showed me I'm not---I'd just been sick for so long I forgot what wellness felt like. Getting better feels like meeting myself for the first time."
          attribution="Anonymous patient"
          role="Recovering from persistent depressive disorder"
          variant="large"
        />

        <p className="mb-6">
          If you recognize yourself in this description---if low mood, fatigue, hopelessness, and joylessness have been your baseline for years---consider seeking professional evaluation. What you've normalized as "just how you are" may be a treatable condition. Life doesn't have to feel this heavy, and you deserve more than chronic emotional suffering.
        </p>

        <p className="mb-6">
          Persistent depressive disorder is persistent---but it's not permanent. With treatment, the future can look different from the past.
        </p>
      </>
    ),
  },

  {
    id: catId(13),
    slug: 'bipolar-depression-vs-unipolar',
    title: 'Bipolar Depression: How It Differs from Unipolar Depression',
    description: 'Bipolar depression looks similar to unipolar depression but requires different treatment. Learn key differences, why diagnosis matters, and treatment approaches.',
    image: "/images/articles/cat07/cover-013.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Bipolar Disorder', 'Bipolar Depression', 'Unipolar Depression', 'Differential Diagnosis'],
    summary: 'Bipolar and unipolar depression may feel identical, but they require completely different treatments. Treating bipolar depression with antidepressants alone can trigger mania, worsen rapid cycling, or destabilize mood. Accurate diagnosis is critical---40-50% of people with bipolar disorder are initially misdiagnosed, leading to years of ineffective or harmful treatment.',
    keyFacts: [
      { text: '40-50% of people with bipolar disorder are initially misdiagnosed as having unipolar depression, with average diagnostic delay of 5-10 years', citationIndex: 6 },
      { text: 'People with bipolar disorder spend 32-50% of their time in depressive episodes vs. only 9% manic/hypomanic---depression is the main source of disability', citationIndex: 5 },
      { text: 'Antidepressant monotherapy in bipolar depression can trigger mania, induce rapid cycling, or cause mixed states---mood stabilizers are first-line', citationIndex: 4 },
      { text: 'Clinical clues to bipolar depression include earlier age of onset, atypical features (hypersomnia, hyperphagia), psychomotor retardation, and family history', citationIndex: 2 },
      { text: 'Treatment for bipolar depression requires ongoing mood stabilization even after depression resolves, unlike unipolar where medication may be discontinued', citationIndex: 7 },
    ],
    sparkMoment: 'Getting the diagnosis right isn\'t academic---it determines whether treatment helps or harms. Bipolar depression requires a fundamentally different approach, and accurate diagnosis can be the difference between years of struggle and effective recovery.',
    practicalExercise: {
      title: 'Screening for Bipolar History',
      steps: [
        { title: 'Map All Mood Episodes', description: 'Create a timeline of ALL your mood episodes---not just depressive ones. Mark periods when you felt unusually high, energized, irritable, or needed less sleep. Include episodes you didn\'t think were significant at the time.' },
        { title: 'Screen for Hypomania', description: 'Review: Have you had a distinct period (4+ days) of elevated/irritable mood + 3+ symptoms: decreased sleep need, talkativeness, racing thoughts, distractibility, increased activity, or risky behavior? Hypomania may have felt good---still counts.' },
        { title: 'Review Treatment Response', description: 'List all antidepressant trials. Did any cause activation, agitation, restlessness, reduced sleep, or mood swings? This suggests bipolar, not unipolar depression.' },
        { title: 'Gather Family History', description: 'Ask first-degree relatives about diagnoses of bipolar disorder, severe depression, substance abuse, or psychiatric hospitalization. Bipolar disorder is highly heritable.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Mood Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'Bipolar depression: A review of treatment options',
        source: 'Canadian Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1177/0706743720905634',
        tier: 1,
      },
      {
        id: '2',
        text: 'Differentiating bipolar from unipolar depression: Clinical and neurobiological considerations',
        source: 'Bipolar Disorders',
        year: '2019',
        link: 'https://doi.org/10.1111/bdi.12778',
        tier: 1,
      },
      {
        id: '3',
        text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://www.psychiatry.org/psychiatrists/practice/dsm',
        tier: 4,
      },
      {
        id: '4',
        text: 'Antidepressant-induced mania in bipolar disorder: Risk factors and management',
        source: 'American Journal of Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1176/appi.ajp.2020.20060831',
        tier: 1,
      },
      {
        id: '5',
        text: 'The burden of bipolar depression: Natural history and treatment gaps',
        source: 'Journal of Affective Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jad.2020.03.177',
        tier: 1,
      },
      {
        id: '6',
        text: 'Misdiagnosis of bipolar disorder: Consequences and contributing factors',
        source: 'JAMA Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1001/jamapsychiatry.2019.0060',
        tier: 1,
      },
      {
        id: '7',
        text: 'Pharmacological treatment of bipolar depression: Evidence and practice',
        source: 'Lancet Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1016/S2215-0366(21)00043-8',
        tier: 1,
      },
      {
        id: '8',
        text: 'Clinical features that distinguish bipolar from unipolar depression',
        source: 'Depression and Anxiety',
        year: '2018',
        link: 'https://doi.org/10.1002/da.22735',
        tier: 1,
      },
      {
        id: '9',
        text: 'Mood stabilizers and atypical antipsychotics in bipolar depression',
        source: 'CNS Drugs',
        year: '2020',
        link: 'https://doi.org/10.1007/s40263-020-00711-7',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When you're in the depths of depression, it may not matter to you whether it's bipolar or unipolar depression---both feel crushing. But the distinction is critical for treatment. Using antidepressants alone for bipolar depression can worsen outcomes, trigger mania, or destabilize mood cycles. Getting the diagnosis right is essential.
          </p>
          <p className="mb-6">
            Bipolar depression refers to depressive episodes occurring in bipolar disorder (either Bipolar I or Bipolar II). Unipolar depression refers to major depressive disorder without any history of manic or hypomanic episodes <Citation id="3" index={3} source="American Psychiatric Association" year="2022" tier={4} />. The depressive symptoms can look nearly identical, yet they're fundamentally different conditions requiring distinct treatment approaches <Citation id="1" index={1} source="Canadian Journal of Psychiatry" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="why-it-matters" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why the Distinction Matters
        </h2>
        <p className="mb-6">
          Approximately 40-50% of people with bipolar disorder are initially misdiagnosed with unipolar depression <Citation id="6" index={6} source="JAMA Psychiatry" year="2019" tier={1} />. This happens because:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>People with bipolar disorder spend much more time depressed than manic/hypomanic---about 3:1 ratio for Bipolar I, even higher for Bipolar II</li>
          <li>Many people seek help during depressive episodes, not recognizing past hypomanic periods as significant</li>
          <li>Hypomania (especially in Bipolar II) can be subtle or feel positive, so it's not reported</li>
          <li>Clinicians may not specifically ask about manic/hypomanic symptoms</li>
          <li>The depressive episodes themselves look very similar</li>
        </ul>

        <ArticleCallout variant="warning" title="Consequences of Misdiagnosis">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Antidepressant monotherapy risks:</strong> Can trigger mania, worsen rapid cycling, or destabilize mood <Citation id="4" index={4} source="American Journal of Psychiatry" year="2021" tier={1} /></li>
            <li><strong>Delayed appropriate treatment:</strong> Mood stabilizers are first-line for bipolar depression but not prescribed if diagnosis is missed</li>
            <li><strong>Years of inadequate treatment:</strong> Average delay from first symptoms to correct bipolar diagnosis is 5-10 years</li>
            <li><strong>Increased morbidity:</strong> Untreated or inadequately treated bipolar disorder has higher suicide risk, substance abuse, and functional impairment</li>
          </ul>
        </ArticleCallout>

        <h2 id="misdiagnosis-scenarios" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Misdiagnosis Scenarios
        </h2>
        <p className="mb-6">
          Understanding how bipolar disorder gets missed helps you recognize it in your own or others' experiences:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'scenario1',
              label: 'The "Good Periods" Aren\'t Reported',
              content: (
                <div>
                  <p className="mb-4">A person experiences severe depression and seeks help. Their provider asks about symptoms, and they report depression accurately. But when asked "Have you ever felt the opposite---very high or energized?"---they say no.</p>
                  <p className="mb-4"><strong>Why the miss:</strong> Past hypomanic periods felt productive, creative, or like "finally feeling normal." They weren't distressing, so they're not mentioned. The person doesn't recognize them as symptoms. Clinician diagnoses unipolar depression, prescribes antidepressant monotherapy.</p>
                  <p><strong>Outcome:</strong> Antidepressant triggers mania or causes mood instability. Person cycles more frequently. Years pass before correct diagnosis.</p>
                </div>
              ),
            },
            {
              id: 'scenario2',
              label: 'Bipolar II Looks Like Depression',
              content: (
                <div>
                  <p className="mb-4">Someone has recurrent severe depressions and brief periods of hypomania. The hypomanic episodes are mild---increased energy, less sleep, more social, taking on projects---and last only 4-5 days.</p>
                  <p className="mb-4"><strong>Why the miss:</strong> Hypomania in Bipolar II is subtle and short. It causes less impairment than mania, so it's easily overlooked. The person spends 90% of symptomatic time depressed, only 10% hypomanic. They identify as "someone with depression."</p>
                  <p><strong>Outcome:</strong> Diagnosed with recurrent unipolar depression. Multiple antidepressant trials fail or cause activation. Diagnosis isn't corrected until someone specifically asks about elevated mood periods.</p>
                </div>
              ),
            },
            {
              id: 'scenario3',
              label: 'First Episode is Depression',
              content: (
                <div>
                  <p className="mb-4">A 19-year-old develops first episode of severe depression. No prior manic/hypomanic episodes. Family history includes a parent with bipolar disorder. Diagnosed with major depression, started on antidepressant.</p>
                  <p className="mb-4"><strong>Why the miss:</strong> At first presentation, there's no bipolar history yet. Diagnosis seems straightforward. But the first episode of bipolar disorder is often depression, with mania emerging later (sometimes triggered by antidepressants).</p>
                  <p><strong>Outcome:</strong> Antidepressant induces first manic episode. Diagnosis revised to Bipolar I. Could have been prevented with mood stabilizer from the start, given family history and young age of onset.</p>
                </div>
              ),
            },
            {
              id: 'scenario4',
              label: 'Mixed States Misinterpreted',
              content: (
                <div>
                  <p className="mb-4">Someone describes feeling depressed but also agitated, restless, with racing thoughts and irritability. They're diagnosed with "agitated depression" or "anxious depression."</p>
                  <p className="mb-4"><strong>Why the miss:</strong> Mixed states (simultaneous depressive and manic/hypomanic symptoms) are challenging to recognize. They may be labeled as anxiety comorbid with depression, rather than a mixed episode indicating bipolar disorder.</p>
                  <p><strong>Outcome:</strong> Antidepressants worsen agitation and mood instability. Person feels worse on treatment. Correct diagnosis requires recognizing the mixed presentation as bipolar.</p>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="tip">
          <p><strong>If you're being treated for depression and it's not working, consider these questions:</strong></p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Have I ever had periods of feeling unusually good, energized, or productive that others commented on?</li>
            <li>Do I have a family history of bipolar disorder or severe mood problems?</li>
            <li>Have antidepressants ever made me feel wired, agitated, or caused mood swings?</li>
            <li>Did my depression start young (teens/early 20s) and recur frequently?</li>
          </ul>
          <p className="mt-4">If you answer yes to any of these, request a comprehensive evaluation specifically screening for bipolar disorder.</p>
        </ArticleCallout>

        <h2 id="key-differences" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Differences During Depression
        </h2>
        <p className="mb-6">
          While depressive symptoms overlap significantly, research has identified clinical features more common in bipolar vs. unipolar depression <Citation id="2" index={2} source="Bipolar Disorders" year="2019" tier={1} /> <Citation id="8" index={8} source="Depression and Anxiety" year="2018" tier={1} />:
        </p>

        <ComparisonTable
          title="Bipolar Depression vs. Unipolar Depression"
          columns={['Clinical Feature', 'More Common in Bipolar Depression', 'More Common in Unipolar Depression']}
          items={[
            { feature: 'Age of onset', values: ['Earlier (teens/early 20s)', 'Later (20s-30s)'] },
            { feature: 'Episode onset', values: ['More abrupt, rapid onset', 'More gradual onset'] },
            { feature: 'Episode duration', values: ['Shorter episodes (weeks-months)', 'Longer episodes (months)'] },
            { feature: 'Psychomotor features', values: ['Psychomotor retardation, hypersomnia', 'Agitation, insomnia'] },
            { feature: 'Mood quality', values: ['Labile mood, mood reactivity', 'Persistently low, less reactive'] },
            { feature: 'Energy', values: ['Leaden paralysis, profound fatigue', 'Generalized fatigue'] },
            { feature: 'Cognitive symptoms', values: ['Racing thoughts, distractibility', 'Slowed thinking, rumination'] },
            { feature: 'Psychotic features', values: ['Higher prevalence', 'Lower prevalence'] },
            { feature: 'Atypical features', values: ['More common (hypersomnia, hyperphagia)', 'Less common'] },
            { feature: 'Postpartum onset', values: ['Higher risk', 'Lower risk'] },
          ]}
          highlightColumn={1}
        />

        <p className="mb-6">
          <strong>Important caveat:</strong> These are statistical trends, not diagnostic rules. Many people with unipolar depression have atypical features, and many with bipolar depression don't. No single depressive symptom definitively distinguishes the two---the diagnosis hinges on history of mania/hypomania.
        </p>

        <h2 id="identifying-bipolar" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Red Flags That Suggest Bipolar Depression
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'history-hypomania',
              title: 'History of Manic or Hypomanic Symptoms',
              content: (
                <div>
                  <p className="mb-4">The defining feature. Even one episode of mania (Bipolar I) or hypomania (Bipolar II) changes the diagnosis from unipolar to bipolar depression.</p>
                  <p className="mb-4"><strong>Screen for past periods when you felt:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Unusually energized, high, or irritable for days/weeks</li>
                    <li>Needing much less sleep without feeling tired</li>
                    <li>More talkative, thoughts racing, distractible</li>
                    <li>Taking on multiple projects, feeling unusually productive or goal-directed</li>
                    <li>Increased confidence, grandiosity, or reckless behavior</li>
                    <li>Increased spending, sexual activity, or risk-taking</li>
                  </ul>
                  <p className="mt-4">Hypomania may have felt good at the time and not been perceived as problematic---yet it still indicates bipolar disorder.</p>
                </div>
              ),
            },
            {
              id: 'family-history',
              title: 'Strong Family History of Bipolar Disorder',
              content: (
                <p>Bipolar disorder is highly heritable. Having a first-degree relative (parent, sibling) with bipolar disorder increases risk significantly. This should raise suspicion even in the absence of clear manic history.</p>
              ),
            },
            {
              id: 'treatment-response',
              title: 'Antidepressant-Induced Mood Changes',
              content: (
                <div>
                  <p className="mb-4">History of antidepressants causing:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Manic or hypomanic episode (activated, high energy, reduced sleep need, impulsive)</li>
                    <li>Mixed states (depressed but agitated and restless)</li>
                    <li>Rapid mood switching</li>
                    <li>Initial improvement followed by destabilization</li>
                  </ul>
                  <p className="mt-4">This is a strong signal that the depression is bipolar, not unipolar.</p>
                </div>
              ),
            },
            {
              id: 'recurrence',
              title: 'Multiple Depressive Episodes with Specific Patterns',
              content: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Early age at first episode (teens/early 20s)</li>
                    <li>Frequent recurrences (4+ lifetime episodes)</li>
                    <li>Rapid-cycling pattern (4+ episodes per year)</li>
                    <li>Seasonal pattern (especially fall/winter depression)</li>
                    <li>Postpartum depression episodes</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'comorbidities',
              title: 'Specific Comorbidities',
              content: (
                <div>
                  <p className="mb-4">More common in bipolar than unipolar depression:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Substance use disorders (especially alcohol, cannabis, stimulants)</li>
                    <li>ADHD or ADHD-like symptoms</li>
                    <li>Anxiety disorders (especially panic disorder, social anxiety)</li>
                    <li>Eating disorders</li>
                    <li>Impulse control problems</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="bipolar-burden" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Burden of Bipolar Depression
        </h2>
        <p className="mb-6">
          People with bipolar disorder spend the majority of their symptomatic time depressed, not manic <Citation id="5" index={5} source="Journal of Affective Disorders" year="2020" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 32, suffix: '%', label: 'Of time spent in depressive episodes (Bipolar I)' },
            { value: 50, suffix: '%', label: 'Of time spent in depressive episodes (Bipolar II)' },
            { value: 9, suffix: '%', label: 'Of time spent manic/hypomanic' },
          ]}
          source="Journal of Affective Disorders, 2020"
        />

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Bipolar depression causes more functional impairment than mania</li>
          <li>It's harder to treat than unipolar depression</li>
          <li>Suicide risk is highest during depressive episodes</li>
          <li>Cognitive impairment persists even between episodes</li>
          <li>Quality of life suffers more from depression than from mania</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Bipolar disorder is fundamentally a depressive illness with periodic mood elevation. The depression is the main source of disability and distress, yet it's the manic/hypomanic episodes that define the diagnosis and determine treatment.</p>
        </ArticleCallout>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment Differences
        </h2>
        <p className="mb-6">
          Treatment for bipolar depression differs fundamentally from unipolar depression <Citation id="7" index={7} source="Lancet Psychiatry" year="2021" tier={1} />:
        </p>

        <BeforeAfter
          before={{
            title: 'Unipolar Depression Treatment',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Antidepressants (SSRIs, SNRIs) are first-line</li>
                <li>Psychotherapy (CBT, IPT) alone or with medication</li>
                <li>Antidepressant monotherapy is safe and effective</li>
                <li>Treatment until remission, then continuation/maintenance</li>
              </ul>
            ),
          }}
          after={{
            title: 'Bipolar Depression Treatment',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Mood stabilizers (lithium, valproate, lamotrigine) are first-line</li>
                <li>Atypical antipsychotics (quetiapine, lurasidone, cariprazine) <Citation id="9" index={9} source="CNS Drugs" year="2020" tier={1} /></li>
                <li>Antidepressants ONLY with mood stabilizer, and with caution</li>
                <li>Psychotherapy adapted for bipolar (IPSRT, FFT, CBT-BD)</li>
                <li>Ongoing mood stabilization even after depression resolves</li>
              </ul>
            ),
          }}
        />

        <ArticleCallout variant="warning" title="Antidepressants in Bipolar Depression">
          <p className="mb-4">The role of antidepressants in bipolar depression is controversial:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>They may trigger mania/hypomania, especially in Bipolar I</li>
            <li>They can induce rapid cycling or mixed states</li>
            <li>They may be less effective than in unipolar depression</li>
            <li>If used, they should ALWAYS be combined with a mood stabilizer, never alone</li>
            <li>Some people with bipolar depression tolerate them fine; others don't</li>
          </ul>
        </ArticleCallout>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Step 1: Mood stabilization',
              description: (
                <p>Establish a mood stabilizer (lithium, lamotrigine, valproate) or atypical antipsychotic as the foundation of treatment. This protects against mania and provides some antidepressant effect.</p>
              ),
            },
            {
              title: 'Step 2: Assess response',
              description: (
                <p>Give the mood stabilizer adequate trial (6-8 weeks at therapeutic dose). Many people respond to mood stabilizers alone without needing additional antidepressant.</p>
              ),
            },
            {
              title: 'Step 3: Augmentation if needed',
              description: (
                <p>If depression persists, consider adding another mood stabilizer, an atypical antipsychotic, lamotrigine, or cautiously adding an antidepressant (with close monitoring for mood destabilization).</p>
              ),
            },
            {
              title: 'Step 4: Adjunctive strategies',
              description: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Psychotherapy (interpersonal and social rhythm therapy, family-focused therapy, CBT adapted for bipolar)</li>
                    <li>Sleep and circadian rhythm regulation</li>
                    <li>Exercise and behavioral activation</li>
                    <li>Avoidance of substances (alcohol, cannabis, stimulants)</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Step 5: Long-term maintenance',
              description: (
                <p>Unlike unipolar depression where you might discontinue meds after remission, bipolar disorder requires ongoing mood stabilization to prevent both depressive and manic episodes.</p>
              ),
            },
          ]}
        />

        <h2 id="getting-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Getting the Right Diagnosis
        </h2>
        <p className="mb-6">
          If you're being treated for depression but:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You've had multiple antidepressant trials without sustained response</li>
          <li>Antidepressants made you feel wired, agitated, or activated</li>
          <li>You have a family history of bipolar disorder</li>
          <li>Your depression has atypical features or specific patterns</li>
          <li>You've had periods of unusually high energy or reduced sleep need</li>
        </ul>

        <p className="mb-6">
          <strong>Request a comprehensive evaluation that specifically assesses for bipolar disorder.</strong> This should include:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Detailed history of ALL mood episodes, not just depressive ones</li>
          <li>Screening questionnaires (Mood Disorder Questionnaire, Hypomania Checklist)</li>
          <li>Collateral history from family members who may have observed behaviors you didn't recognize as significant</li>
          <li>Longitudinal mood tracking</li>
          <li>Consideration of family psychiatric history</li>
        </ul>

        <QuoteBlock
          quote="The correct diagnosis isn't just academic---it determines whether treatment helps or harms. Bipolar depression requires a fundamentally different approach. Getting it right can be the difference between years of struggle and effective treatment."
          attribution="Raima"
          role="Clinical Psychologist"
          variant="large"
        />

        <p className="mb-6">
          If you're struggling with depression, especially treatment-resistant depression, don't assume the diagnosis is settled. Bipolar disorder is commonly missed. Advocating for thorough evaluation may reveal why previous treatments haven't worked---and open the door to approaches that will.
        </p>
      </>
    ),
  },

  {
    id: catId(14),
    slug: 'seasonal-affective-disorder-winter-depression',
    title: 'Seasonal Affective Disorder: Why Winter Darkens More Than the Sky',
    description: 'Seasonal Affective Disorder is recurrent depression triggered by seasonal changes, usually winter. Learn symptoms, light therapy, and evidence-based treatment.',
    image: "/images/articles/cat07/cover-014.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['SAD', 'Seasonal Depression', 'Winter Depression', 'Light Therapy'],
    summary: 'Seasonal Affective Disorder (SAD) is major depression with a seasonal pattern---typically recurring every fall/winter and lifting in spring/summer. It affects 5% of U.S. adults, with higher rates in northern latitudes. The biological mechanism involves disrupted circadian rhythms from reduced light exposure, affecting melatonin, serotonin, and the brain\'s master clock.',
    keyFacts: [
      { text: '60-80% of people with SAD respond to light therapy (10,000 lux for 20-30 minutes each morning), often within 1-2 weeks', citationIndex: 2 },
      { text: 'SAD has clearer biological mechanisms than most depression: reduced light disrupts circadian rhythms, extends melatonin secretion, and decreases serotonin', citationIndex: 5 },
      { text: 'Atypical features distinguish SAD from other depression: hypersomnia (sleeping 2-4+ hours more), carb cravings, weight gain, and leaden paralysis', citationIndex: 1 },
      { text: 'SAD is 4× more common in women than men and has higher prevalence in northern latitudes where winter days are shorter', citationIndex: 1 },
      { text: 'Preventive treatment (starting light therapy or medication in early fall before symptoms emerge) can minimize or prevent winter depression entirely', citationIndex: 2 },
    ],
    sparkMoment: 'SAD feels inevitable every winter, but it doesn\'t have to be. Treatment works---light therapy, CBT, and preventive medication can break the cycle. You don\'t have to suffer through every winter.',
    practicalExercise: {
      title: 'Recognizing and Tracking Your Seasonal Pattern',
      steps: [
        { title: 'Map Your Mood Across Seasons', description: 'Look back over the past 2-3 years. For each season, rate your mood, energy, sleep, and motivation (1-10). Do you see a consistent pattern of worsening in fall/winter and improvement in spring/summer?' },
        { title: 'Identify Your Symptom Onset', description: 'Note the month when symptoms typically begin (usually October-November) and when they lift (typically April-May). This timing helps plan preventive treatment.' },
        { title: 'Document Atypical Features', description: 'Track: How much more are you sleeping? What are you craving? Have you gained weight? Recognizing atypical features confirms SAD vs. other depression.' },
        { title: 'Plan Proactive Treatment', description: 'If you have a 2-year pattern, schedule treatment to start 1 month BEFORE typical onset. Purchase a 10,000-lux light box, schedule a provider appointment, and prepare behavioral strategies.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Seasonal Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'Seasonal affective disorder: Epidemiology, clinical features, assessment, and diagnosis',
        source: 'Journal of Affective Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jad.2020.06.068',
        tier: 1,
      },
      {
        id: '2',
        text: 'Light therapy for seasonal affective disorder: A systematic review and meta-analysis',
        source: 'American Journal of Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1176/appi.ajp.2019.18091037',
        tier: 1,
      },
      {
        id: '3',
        text: 'Circadian rhythms, light exposure, and seasonal affective disorder',
        source: 'Sleep Medicine Reviews',
        year: '2020',
        link: 'https://doi.org/10.1016/j.smrv.2020.101247',
        tier: 1,
      },
      {
        id: '4',
        text: 'DSM-5-TR: Major Depressive Disorder with Seasonal Pattern',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://www.psychiatry.org/psychiatrists/practice/dsm',
        tier: 4,
      },
      {
        id: '5',
        text: 'Neurobiology of seasonal affective disorder and phototherapy',
        source: 'Biological Psychiatry',
        year: '2018',
        link: 'https://doi.org/10.1016/j.biopsych.2018.05.013',
        tier: 1,
      },
      {
        id: '6',
        text: 'Cognitive-behavioral therapy for seasonal affective disorder',
        source: 'Depression and Anxiety',
        year: '2019',
        link: 'https://doi.org/10.1002/da.22890',
        tier: 1,
      },
      {
        id: '7',
        text: 'Vitamin D and seasonal affective disorder: Evidence and recommendations',
        source: 'Journal of Clinical Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.4088/JCP.19r13092',
        tier: 1,
      },
      {
        id: '8',
        text: 'Antidepressant medication for seasonal affective disorder',
        source: 'Cochrane Database of Systematic Reviews',
        year: '2019',
        link: 'https://doi.org/10.1002/14651858.CD004050.pub5',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Every fall, as days shorten and darkness comes earlier, some people feel a familiar heaviness descending. Energy drains, motivation vanishes, and simple tasks feel overwhelming. Come spring, the cloud lifts as predictably as it arrived. This isn't coincidence or laziness---it's Seasonal Affective Disorder, a pattern of depression synchronized with the seasons.
          </p>
          <p className="mb-6">
            Seasonal Affective Disorder (SAD) is major depression with a seasonal pattern---most commonly winter depression that recurs every year during fall/winter months and remits in spring/summer <Citation id="1" index={1} source="Journal of Affective Disorders" year="2020" tier={1} />. It affects approximately 5% of adults in the U.S., with higher rates in northern latitudes where winter days are shorter. The biological mechanism involves disrupted circadian rhythms and reduced light exposure affecting brain chemistry <Citation id="3" index={3} source="Sleep Medicine Reviews" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Symptoms of Winter SAD
        </h2>
        <p className="mb-6">
          SAD meets criteria for major depressive disorder but has characteristic features that distinguish it from non-seasonal depression <Citation id="4" index={4} source="American Psychiatric Association" year="2022" tier={4} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'typical',
              label: 'Typical Depressive Symptoms',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Depressed mood most of the day, nearly every day</li>
                  <li>Loss of interest or pleasure in activities</li>
                  <li>Feelings of hopelessness or worthlessness</li>
                  <li>Difficulty concentrating</li>
                  <li>Social withdrawal</li>
                  <li>Reduced productivity and motivation</li>
                </ul>
              ),
            },
            {
              id: 'atypical',
              label: 'Atypical Features (Common in SAD)',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Hypersomnia:</strong> Sleeping 2-4+ hours more than usual, difficulty waking, daytime sleepiness</li>
                  <li><strong>Increased appetite:</strong> Especially carbohydrate cravings (breads, sweets, pasta)</li>
                  <li><strong>Weight gain:</strong> Often 10-20 pounds during winter months</li>
                  <li><strong>Leaden paralysis:</strong> Heavy, weighted-down feeling in arms and legs</li>
                  <li><strong>Mood reactivity:</strong> Can briefly brighten in response to positive events, unlike melancholic depression</li>
                </ul>
              ),
            },
          ]}
        />

        <ArticleCallout variant="did-you-know">
          <p>The atypical features (hypersomnia, hyperphagia, weight gain) may be evolutionary adaptations---conserving energy and building fat stores during winter scarcity. In modern times with abundant food and indoor living, these adaptations become maladaptive symptoms.</p>
        </ArticleCallout>

        <h2 id="pattern" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Seasonal Pattern
        </h2>
        <p className="mb-6">
          To be diagnosed with seasonal pattern, depression must follow a consistent temporal relationship with specific seasons:
        </p>

        <ComparisonTable
          title="Diagnostic Criteria for Seasonal Pattern"
          columns={['Criterion', 'Requirement']}
          items={[
            { feature: 'Regular temporal relationship', values: ['Depressive episodes begin at characteristic time of year (typically fall/early winter)'] },
            { feature: 'Full remission', values: ['Complete remission at characteristic time (typically spring/summer)'] },
            { feature: 'Recurrence', values: ['Pattern has occurred in last 2 years with no non-seasonal episodes during that period'] },
            { feature: 'Lifetime pattern', values: ['Seasonal episodes substantially outnumber non-seasonal episodes over lifetime'] },
          ]}
          highlightColumn={0}
        />

        <ArticleChart
          type="line"
          title="Typical SAD Symptom Severity Across the Year"
          data={[
            { label: 'Jan', value: 8 },
            { label: 'Feb', value: 9 },
            { label: 'Mar', value: 6 },
            { label: 'Apr', value: 3 },
            { label: 'May', value: 1 },
            { label: 'Jun-Aug', value: 0 },
            { label: 'Sep', value: 2 },
            { label: 'Oct', value: 5 },
            { label: 'Nov', value: 7 },
            { label: 'Dec', value: 8 },
          ]}
          source="Typical pattern representation, severity scale 0-10"
        />

        <p className="mb-6">
          Most people with winter SAD notice symptoms beginning in October-November, worsening through January-February, and resolving by April-May. The timing corresponds with changes in daylight duration and intensity.
        </p>

        <h2 id="biology" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Biology of SAD
        </h2>
        <p className="mb-6">
          SAD has clearer biological underpinnings than most forms of depression <Citation id="5" index={5} source="Biological Psychiatry" year="2018" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Reduced light exposure',
              description: (
                <p>Shorter days and less intense sunlight in winter mean eyes receive less bright light. Light is the primary entraining signal for the brain's circadian system.</p>
              ),
            },
            {
              title: 'Circadian rhythm disruption',
              description: (
                <p>The suprachiasmatic nucleus (SCN), the brain's master clock, relies on light input. Reduced light causes circadian rhythms to drift later (phase delay) and become desynchronized with the sleep-wake cycle <Citation id="3" index={3} source="Sleep Medicine Reviews" year="2020" tier={1} />.</p>
              ),
            },
            {
              title: 'Melatonin dysregulation',
              description: (
                <p>Melatonin, the sleep hormone, is suppressed by light and secreted in darkness. In winter, melatonin secretion extends longer into morning due to prolonged darkness, causing morning grogginess and difficulty waking.</p>
              ),
            },
            {
              title: 'Serotonin changes',
              description: (
                <p>Sunlight influences serotonin synthesis and availability. Reduced light in winter decreases serotonin activity, contributing to depressed mood and carbohydrate cravings (carbs transiently boost serotonin).</p>
              ),
            },
            {
              title: 'Retinal sensitivity differences',
              description: (
                <p>Some research suggests people with SAD may have retinal sensitivity differences, requiring more light to properly entrain circadian rhythms.</p>
              ),
            },
          ]}
        />

        <h2 id="summer-sad" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Summer SAD (Less Common)
        </h2>
        <p className="mb-6">
          While most people with seasonal depression experience winter onset, about 10% have the reverse pattern---depression beginning in late spring/summer and remitting in fall/winter. Summer SAD is less understood but has distinct features:
        </p>

        <ComparisonTable
          title="Winter SAD vs. Summer SAD"
          columns={['Feature', 'Winter SAD (Most Common)', 'Summer SAD (Rare)']}
          items={[
            { feature: 'Symptom onset', values: ['October-November', 'May-June'] },
            { feature: 'Remission', values: ['April-May', 'October-November'] },
            { feature: 'Appetite/weight', values: ['Increased appetite, weight gain', 'Decreased appetite, weight loss'] },
            { feature: 'Sleep', values: ['Hypersomnia (oversleeping)', 'Insomnia (difficulty sleeping)'] },
            { feature: 'Energy', values: ['Fatigue, lethargy', 'Agitation, restlessness'] },
            { feature: 'Mood quality', values: ['Low, empty, heavy', 'Anxious, irritable, angry'] },
            { feature: 'Proposed mechanism', values: ['Too little light', 'Too much light/heat, humidity discomfort'] },
            { feature: 'Treatment', values: ['Light therapy', 'Cool environments, darkness, standard antidepressants'] },
          ]}
          highlightColumn={1}
        />

        <ArticleCallout variant="did-you-know">
          <p>Summer SAD's mechanism is less clear than winter SAD. Hypotheses include discomfort from heat/humidity, disruption from longer daylight (causing sleep deprivation), or allergies. Some people with summer SAD benefit from spending time in cool, dark environments---the opposite of winter SAD treatment.</p>
        </ArticleCallout>

        <h2 id="distinguishing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Distinguishing SAD from Other Patterns
        </h2>
        <p className="mb-6">
          Not everyone who feels worse in winter has SAD. Here's how to distinguish:
        </p>

        <BeforeAfter
          before={{
            title: 'Winter Blues (Subsyndromal SAD)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Mild mood dip in winter, but not full depression</li>
                <li>Doesn't meet criteria for major depressive episode</li>
                <li>Still functional, just less energetic/motivated</li>
                <li>May benefit from lifestyle strategies and light exposure</li>
                <li>Affects ~10% of people</li>
              </ul>
            ),
          }}
          after={{
            title: 'True Seasonal Affective Disorder',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Meets full criteria for major depressive episode</li>
                <li>Significant functional impairment</li>
                <li>Recurrent pattern (at least 2 years)</li>
                <li>Complete remission in opposite season</li>
                <li>Requires professional treatment (light therapy, medication, or therapy)</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6">
          <strong>Also consider:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Bipolar disorder with seasonal pattern:</strong> If you have history of mania/hypomania, your seasonal depression may be part of bipolar disorder (requires different treatment)</li>
          <li><strong>Non-seasonal depression worsened by winter:</strong> Depression that occurs year-round but gets worse in winter isn't true SAD---it's depression with seasonal worsening</li>
          <li><strong>Holiday-related stress:</strong> If symptoms correlate specifically with holidays (Thanksgiving-New Year) rather than daylight changes, this may be stress-related rather than biological SAD</li>
          <li><strong>Anniversary reactions:</strong> Depression triggered by specific dates tied to losses or trauma, not seasonal light changes</li>
        </ul>

        <h2 id="risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Gets SAD?
        </h2>

        <StatCard
          stats={[
            { value: 5, suffix: '%', label: 'Of U.S. adults meet criteria for SAD' },
            { value: 10, suffix: '%', label: `Experience milder 'winter blues'` },
            { value: 4, suffix: '×', label: 'Higher rate in women than men' },
          ]}
          source="Journal of Affective Disorders, 2020"
        />

        <p className="mb-6">
          <strong>Risk factors:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Geography:</strong> Higher prevalence in northern latitudes (farther from equator, longer/darker winters). SAD is rare in equatorial regions with consistent daylight year-round.</li>
          <li><strong>Age:</strong> Typically begins in young adulthood (18-30), rare before adolescence</li>
          <li><strong>Sex:</strong> 4:1 female-to-male ratio</li>
          <li><strong>Family history:</strong> Genetic component; runs in families</li>
          <li><strong>History of depression or bipolar disorder:</strong> Those with existing mood disorders may experience seasonal worsening</li>
          <li><strong>Indoor lifestyle:</strong> People who work indoors with limited light exposure more vulnerable</li>
        </ul>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment
        </h2>
        <p className="mb-6">
          SAD is highly treatable, with multiple evidence-based approaches:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'light-therapy',
              title: 'Light Therapy (First-Line Treatment)',
              content: (
                <div>
                  <p className="mb-4">Light therapy involves daily exposure to bright artificial light (10,000 lux) from a specialized light box. It's the most studied and effective treatment for SAD <Citation id="2" index={2} source="American Journal of Psychiatry" year="2019" tier={1} />.</p>
                  <p className="mb-4"><strong>How it works:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Sit in front of a 10,000-lux light box for 20-30 minutes each morning</li>
                    <li>Position light at eye level, about 16-24 inches from face</li>
                    <li>You don't stare directly at light; it works through peripheral vision</li>
                    <li>Timing: Early morning (6-8 AM) most effective for resetting circadian rhythm</li>
                  </ul>
                  <p className="mb-4"><strong>Effectiveness:</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>60-80% of people with SAD respond to light therapy</li>
                    <li>Improvement often seen within 1-2 weeks</li>
                    <li>Effects maintained with continued daily use</li>
                    <li>Symptoms return if therapy discontinued</li>
                  </ul>
                  <p className="mb-4"><strong>Safety:</strong> Generally very safe. Possible side effects: eye strain, headache, nausea (usually mild and temporary). Not recommended for those with certain eye conditions or taking photosensitizing medications.</p>
                </div>
              ),
            },
            {
              id: 'cbt',
              title: 'Cognitive-Behavioral Therapy (CBT-SAD)',
              content: (
                <div>
                  <p className="mb-4">CBT adapted for SAD targets seasonal patterns, behavioral activation despite low motivation, and cognitive distortions about winter <Citation id="6" index={6} source="Depression and Anxiety" year="2019" tier={1} />.</p>
                  <p className="mb-4"><strong>Components:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Identifying and challenging negative thoughts about winter</li>
                    <li>Behavioral activation: Scheduling rewarding activities</li>
                    <li>Building pleasant winter activities (not waiting for spring)</li>
                    <li>Relapse prevention strategies</li>
                  </ul>
                  <p className="mt-4">Research suggests CBT-SAD may have longer-lasting effects than light therapy, with lower relapse rates in subsequent winters.</p>
                </div>
              ),
            },
            {
              id: 'medication',
              title: 'Antidepressant Medication',
              content: (
                <div>
                  <p className="mb-4">Antidepressants (especially bupropion extended-release) are effective for SAD <Citation id="8" index={8} source="Cochrane Database of Systematic Reviews" year="2019" tier={1} />.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Can be used as monotherapy or combined with light therapy</li>
                    <li>Bupropion XL specifically FDA-approved for prevention of seasonal depression</li>
                    <li>SSRIs (fluoxetine, sertraline, others) also effective</li>
                    <li>Typically started in early fall before symptoms emerge, continued through winter</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'vitamin-d',
              title: 'Vitamin D Supplementation',
              content: (
                <div>
                  <p className="mb-4">Vitamin D deficiency is common in winter (synthesized from sunlight). While research on vitamin D for SAD is mixed <Citation id="7" index={7} source="Journal of Clinical Psychiatry" year="2020" tier={1} />, supplementation is low-risk:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Get vitamin D level tested</li>
                    <li>If deficient, supplement to normal range (typically 1000-2000 IU daily, higher if deficient)</li>
                    <li>Not a replacement for light therapy or other treatments, but may help</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'lifestyle',
              title: 'Lifestyle Strategies',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Maximize natural light:</strong> Open blinds, sit near windows, take midday walks</li>
                  <li><strong>Exercise:</strong> Regular physical activity, especially outdoors in daylight</li>
                  <li><strong>Regular sleep schedule:</strong> Consistent wake/sleep times to stabilize circadian rhythm</li>
                  <li><strong>Social connection:</strong> Maintain social activities despite low motivation</li>
                  <li><strong>Plan enjoyable winter activities:</strong> Don't hibernate---engage with the season</li>
                </ul>
              ),
            },
          ]}
        />

        <h2 id="prevention" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Prevention
        </h2>
        <p className="mb-6">
          Because SAD is predictable, you can start treatment <strong>before symptoms emerge</strong>:
        </p>

        <BeforeAfter
          before={{
            title: 'Reactive Approach',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Wait until depression sets in (October-November)</li>
                <li>Spend weeks in depression before seeking treatment</li>
                <li>Take 2-4 weeks for treatment to work</li>
                <li>Result: 2-3 months of suffering before improvement</li>
              </ul>
            ),
          }}
          after={{
            title: 'Preventive Approach',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Start light therapy in September, before symptoms</li>
                <li>Begin antidepressant in early fall (if using medication)</li>
                <li>Implement behavioral strategies proactively</li>
                <li>Result: Prevent or minimize depressive episode entirely</li>
              </ul>
            ),
          }}
        />

        <ArticleCallout variant="tip" title="Proactive Treatment Plan">
          <p className="mb-4">If you have a history of winter SAD:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>In August/September, review last winter---what helped, what didn't</li>
            <li>Obtain light box if needed; ensure it works</li>
            <li>Schedule start date for light therapy (early September)</li>
            <li>If using medication, schedule psychiatry appointment for early fall</li>
            <li>Plan winter activities/goals---create structure before motivation drops</li>
            <li>Line up social support and accountability</li>
          </ol>
        </ArticleCallout>

        <QuoteBlock
          quote="SAD feels inevitable every winter---the darkness comes, and I fall with it. But it doesn't have to be that way. Treatment works. Now I start light therapy in September, and winter is just... winter. Not a depressive episode."
          attribution="Anonymous patient with SAD"
          role="Managing seasonal depression proactively"
          variant="large"
        />

        <p className="mb-6">
          If you notice a pattern of depression beginning each fall and lifting each spring, you likely have SAD---and that means you have a treatable condition with clear, effective interventions. You don't have to suffer through every winter. Light therapy, CBT, and medication can break the cycle. Talk to a healthcare provider about starting preventive treatment before your symptoms return.
        </p>
      </>
    ),
  },

  {
    id: catId(15),
    slug: 'postpartum-depression-after-birth',
    title: 'Postpartum Depression: Understanding the Darkness After Birth',
    description: 'Postpartum depression affects 1 in 7 new mothers. Learn symptoms, risk factors, treatment, and why seeking help is essential for mother and baby.',
    image: "/images/articles/cat07/cover-015.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Postpartum Depression', 'PPD', 'Maternal Mental Health', 'Perinatal Depression'],
    summary: 'Postpartum depression (PPD) affects 1 in 7 new mothers, causing persistent sadness, anxiety, bonding difficulties, and interference with functioning during pregnancy or the first year after birth. Despite being one of the most common complications of childbirth, it often goes unrecognized due to stigma and the mistaken belief that struggling postpartum is "normal." PPD is highly treatable with therapy, medication, and support.',
    keyFacts: [
      { text: '1 in 7 women (15%) experience postpartum depression, with higher rates in adolescents, those living in poverty, and women with prior depression', citationIndex: 10 },
      { text: 'PPD differs from "baby blues" (50-80% of mothers): PPD is severe, persists beyond 2 weeks, requires treatment, and interferes with functioning', citationIndex: 2 },
      { text: 'Major risk factors include prior depression/anxiety, history of PPD, hormonal fluctuations, sleep deprivation, lack of support, and life stressors', citationIndex: 1 },
      { text: 'Treatment includes psychotherapy (especially CBT and IPT), antidepressants (many safe for breastfeeding), and practical support---combination approaches most effective', citationIndex: 3 },
      { text: 'Postpartum psychosis (1-2 per 1,000 births) is a psychiatric emergency with hallucinations, delusions, and confusion---requires immediate hospitalization', citationIndex: 8 },
    ],
    sparkMoment: 'Postpartum depression is not your fault, doesn\'t mean you don\'t love your baby, and doesn\'t make you a failure. It\'s a medical condition with biological causes, it\'s treatable, and you don\'t have to suffer in silence.',
    practicalExercise: {
      title: 'Postpartum Depression Self-Check',
      steps: [
        { title: 'Screen Yourself with EPDS', description: 'Complete the Edinburgh Postnatal Depression Scale (free online). Score ≥10 suggests possible depression. Score ≥13 indicates likely depression requiring evaluation. Question 10 (self-harm thoughts) needs immediate attention if endorsed.' },
        { title: 'Distinguish Baby Blues from PPD', description: 'Baby blues resolve within 2 weeks and don\'t interfere with functioning. If symptoms persist beyond 2 weeks, worsen, or you can\'t care for yourself/baby, it\'s not baby blues---get evaluated.' },
        { title: 'Identify Your Risk Factors', description: 'Review: history of depression/anxiety, prior PPD, pregnancy/birth complications, lack of support, relationship stress, financial strain. Multiple risk factors increase PPD likelihood.' },
        { title: 'Reach Out for Help', description: 'Tell your OB-GYN, midwife, pediatrician, or primary care doctor. Call Postpartum Support International (1-800-944-4773). Don\'t wait for your next scheduled visit---make an appointment now.' },
      ],
      toolLink: '/crisis',
      toolLabel: 'Find Crisis Resources',
    },
    citations: [
      {
        id: '1',
        text: 'Postpartum depression: Epidemiology, risk factors, and clinical features',
        source: 'Obstetrics & Gynecology',
        year: '2020',
        link: 'https://doi.org/10.1097/AOG.0000000000003903',
        tier: 1,
      },
      {
        id: '2',
        text: 'Screening and diagnosis of postpartum depression',
        source: 'American Journal of Obstetrics and Gynecology',
        year: '2019',
        link: 'https://doi.org/10.1016/j.ajog.2019.04.027',
        tier: 1,
      },
      {
        id: '3',
        text: 'Treatment of postpartum depression: Psychotherapy and pharmacotherapy',
        source: 'JAMA Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1001/jamapsychiatry.2021.0826',
        tier: 1,
      },
      {
        id: '4',
        text: 'Biological mechanisms in postpartum depression',
        source: 'Nature Reviews Neuroscience',
        year: '2020',
        link: 'https://doi.org/10.1038/s41583-020-0294-3',
        tier: 1,
      },
      {
        id: '5',
        text: 'Impact of untreated postpartum depression on infant development',
        source: 'Pediatrics',
        year: '2019',
        link: 'https://doi.org/10.1542/peds.2019-0366',
        tier: 1,
      },
      {
        id: '6',
        text: 'Cognitive-behavioral therapy for postpartum depression',
        source: "Archives of Women's Mental Health",
        year: '2020',
        link: 'https://doi.org/10.1007/s00737-020-01025-1',
        tier: 1,
      },
      {
        id: '7',
        text: 'Antidepressants in breastfeeding: Safety and recommendations',
        source: 'Journal of Clinical Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.4088/JCP.20r13791',
        tier: 1,
      },
      {
        id: '8',
        text: 'Postpartum psychosis: Recognition and emergency management',
        source: 'American Family Physician',
        year: '2020',
        link: 'https://www.aafp.org/afp/2020/0215/p227.html',
        tier: 2,
      },
      {
        id: '9',
        text: 'Partner and paternal postpartum depression',
        source: 'Journal of Affective Disorders',
        year: '2019',
        link: 'https://doi.org/10.1016/j.jad.2019.02.033',
        tier: 1,
      },
      {
        id: '10',
        text: 'Postpartum Depression: Facts',
        source: 'National Institute of Mental Health',
        year: '2023',
        link: 'https://www.nimh.nih.gov/health/publications/postpartum-depression-facts',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Society tells new mothers they should be glowing, grateful, blissfully bonded with their baby. So when you instead feel overwhelming sadness, anxiety, emptiness, or rage---when you can't sleep even when the baby sleeps, when you fantasize about running away, when you feel like a failure at the very thing you're 'supposed' to know how to do---the shame compounds the suffering. This is postpartum depression, and it's one of the most common complications of childbirth.
          </p>
          <p className="mb-6">
            Postpartum depression (PPD) is major depression occurring during pregnancy or within the first year after giving birth, most commonly in the first three months postpartum <Citation id="1" index={1} source="Obstetrics & Gynecology" year="2020" tier={1} />. It affects approximately 1 in 7 women (15%), with higher rates in adolescents, women living in poverty, and those with prior depression <Citation id="10" index={10} source="National Institute of Mental Health" year="2023" tier={2} />. Despite its prevalence, it often goes unrecognized and untreated due to stigma, lack of screening, and the assumption that postpartum struggles are "just part of being a new mom."
          </p>
        </div>

        <h2 id="symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Symptoms
        </h2>
        <p className="mb-6">
          PPD symptoms are the same as major depressive disorder but occur in the perinatal period (during pregnancy or postpartum) and have unique challenges related to infant care and parenting <Citation id="2" index={2} source="American Journal of Obstetrics and Gynecology" year="2019" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'emotional',
              label: 'Emotional Symptoms',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Persistent sad, empty, or hopeless mood</li>
                  <li>Irritability, anger, or rage (sometimes directed at baby or partner)</li>
                  <li>Crying frequently, often for no clear reason</li>
                  <li>Numbness or emotional detachment</li>
                  <li>Overwhelming guilt or feelings of inadequacy as a mother</li>
                  <li>Shame about not feeling the "expected" joy</li>
                  <li>Anxiety or panic attacks</li>
                  <li>Fear of being alone with the baby</li>
                </ul>
              ),
            },
            {
              id: 'bonding',
              label: 'Bonding & Attachment',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Difficulty bonding with baby or feeling connected</li>
                  <li>Lack of interest in baby or feeling detached</li>
                  <li>Intrusive thoughts about harming baby (without intent to act---these are distressing, unwanted thoughts)</li>
                  <li>Excessive worry about baby's health or safety</li>
                  <li>Feeling like you made a mistake having a baby</li>
                  <li>Guilt about not feeling loving toward baby</li>
                </ul>
              ),
            },
            {
              id: 'physical',
              label: 'Physical & Cognitive',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Severe fatigue beyond normal new-parent exhaustion</li>
                  <li>Inability to sleep even when baby sleeps (insomnia)</li>
                  <li>Or excessive sleeping, difficulty getting out of bed</li>
                  <li>Changes in appetite (no appetite or overeating)</li>
                  <li>Difficulty concentrating, making decisions, or remembering</li>
                  <li>Psychomotor agitation or retardation</li>
                  <li>Physical aches and pains</li>
                </ul>
              ),
            },
            {
              id: 'behavioral',
              label: 'Behavioral',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Withdrawing from partner, family, friends</li>
                  <li>Loss of interest in activities previously enjoyed</li>
                  <li>Difficulty caring for baby (going through motions mechanically)</li>
                  <li>Neglecting self-care (not eating, not showering)</li>
                  <li>Thoughts of escaping, running away, or harming self</li>
                  <li>In severe cases, thoughts of harming baby</li>
                </ul>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning" title="PPD vs. Baby Blues">
          <p className="mb-4"><strong>Baby Blues (50-80% of new mothers):</strong></p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Mild mood swings, crying, anxiety, irritability</li>
            <li>Begins 2-3 days after delivery</li>
            <li>Peaks around day 5</li>
            <li>Resolves within 2 weeks</li>
            <li>Does not interfere with functioning</li>
            <li>No treatment needed besides support and rest</li>
          </ul>
          <p className="mb-4"><strong>Postpartum Depression:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Severe, persistent symptoms</li>
            <li>Begins any time in first year (usually first 3 months)</li>
            <li>Does NOT resolve on its own</li>
            <li>Interferes with functioning and caregiving</li>
            <li>Requires professional treatment</li>
          </ul>
          <p className="mt-4">If symptoms persist beyond 2 weeks or are severe, it's not baby blues---it's depression, and you need help.</p>
        </ArticleCallout>

        <h2 id="risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Risk Factors
        </h2>
        <p className="mb-6">
          PPD isn't caused by weakness or character flaw. It's a medical condition with biological, psychological, and social risk factors <Citation id="1" index={1} source="Obstetrics & Gynecology" year="2020" tier={1} />:
        </p>

        <ComparisonTable
          title="Risk Factors for Postpartum Depression"
          columns={['Category', 'Specific Risk Factors']}
          items={[
            {
              feature: 'Mental health history',
              values: ['Prior depression, anxiety, bipolar disorder; History of PPD after previous pregnancy; Depression/anxiety during current pregnancy'],
            },
            {
              feature: 'Biological',
              values: ['Hormonal fluctuations postpartum; Thyroid dysfunction; Sleep deprivation; Pregnancy/birth complications'],
            },
            {
              feature: 'Psychosocial',
              values: ['Poor social support, isolation; Relationship stress or conflict; Stressful life events; Financial stress; Unwanted or unplanned pregnancy'],
            },
            {
              feature: 'Infant factors',
              values: ['Infant health problems; Difficult temperament/colic; Feeding difficulties; NICU admission'],
            },
            {
              feature: 'Demographic',
              values: ['Adolescent mother; Low income/poverty; Single parenthood; History of trauma or abuse'],
            },
          ]}
          highlightColumn={0}
        />

        <h2 id="biology" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Causes PPD?
        </h2>
        <p className="mb-6">
          The postpartum period involves massive biological, psychological, and social changes---a perfect storm for depression vulnerability <Citation id="4" index={4} source="Nature Reviews Neuroscience" year="2020" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Hormonal plunge',
              description: (
                <p>During pregnancy, estrogen and progesterone reach levels 10-100 times higher than normal. Immediately after delivery, they plummet to near-zero levels within 24 hours---the most dramatic hormonal change the body ever experiences. This rapid withdrawal affects neurotransmitters (serotonin, dopamine, GABA) involved in mood regulation.</p>
              ),
            },
            {
              title: 'Sleep deprivation',
              description: (
                <p>Severe, chronic sleep disruption is universal in new parenthood. Sleep deprivation alone can trigger depression, and it worsens all other symptoms. The biological need for sleep conflicts with infant care demands.</p>
              ),
            },
            {
              title: 'Stress system activation',
              description: (
                <p>The stress of childbirth, recovery, infant care, and role transition activates the hypothalamic-pituitary-adrenal (HPA) axis. Prolonged cortisol elevation affects mood and exacerbates depression risk.</p>
              ),
            },
            {
              title: 'Neuroinflammation',
              description: (
                <p>Emerging research suggests immune system changes and neuroinflammation during pregnancy and postpartum may contribute to PPD in some women.</p>
              ),
            },
            {
              title: 'Thyroid dysfunction',
              description: (
                <p>Postpartum thyroiditis (inflammation of thyroid) occurs in 5-10% of women, causing temporary hyperthyroidism followed by hypothyroidism. Thyroid dysfunction can mimic or worsen depression.</p>
              ),
            },
            {
              title: 'Psychological factors',
              description: (
                <p>Identity shift, loss of autonomy, overwhelming responsibility, unrealistic expectations, and discrepancy between expected and actual experience of motherhood create psychological vulnerability.</p>
              ),
            },
          ]}
        />

        <h2 id="impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Treatment Matters
        </h2>
        <p className="mb-6">
          Untreated PPD affects not just the mother but the entire family, particularly infant development:
        </p>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Of women with PPD do not receive treatment' },
            { value: 20, suffix: '%', label: 'Of women with PPD have thoughts of self-harm' },
            { value: 30, suffix: '%', label: 'Of infants show developmental delays when maternal PPD is untreated' },
          ]}
          source="NIMH, 2023; Pediatrics, 2019"
        />

        <p className="mb-6">
          <strong>Impact on mother:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Prolonged suffering and impaired quality of life</li>
          <li>Difficulty bonding with baby</li>
          <li>Impaired ability to care for baby safely</li>
          <li>Relationship strain with partner</li>
          <li>Increased risk of chronic depression</li>
          <li>Suicide risk (rare but serious---maternal suicide accounts for ~20% of postpartum deaths)</li>
        </ul>

        <p className="mb-6">
          <strong>Impact on infant</strong> <Citation id="5" index={5} source="Pediatrics" year="2019" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Reduced maternal responsiveness affects attachment security</li>
          <li>Lower rates of breastfeeding initiation and duration</li>
          <li>Increased infant crying and sleep problems</li>
          <li>Developmental and cognitive delays (language, social-emotional)</li>
          <li>Behavioral problems in childhood</li>
          <li>Increased risk for the child's own mental health problems</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Getting treatment for PPD isn't selfish---it's essential for both you and your baby. Maternal mental health is foundational to infant health and development. Taking care of yourself is taking care of your baby.</p>
        </ArticleCallout>

        <h2 id="myths" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Myths About PPD
        </h2>
        <p className="mb-6">
          Stigma and misinformation prevent many women from seeking help. Let's dispel the most harmful myths:
        </p>

        <div className="space-y-4 my-8">
          <ArticleCallout variant="info">
            <p className="mb-2"><strong>Myth:</strong> "PPD means you're a bad mother or you don't love your baby."</p>
            <p><strong>Reality:</strong> PPD is a medical condition caused by biological changes, not a reflection of your love or capability. Many women with severe PPD deeply love their babies but can't feel that love through the depression. Treatment restores your ability to connect.</p>
          </ArticleCallout>

          <ArticleCallout variant="info">
            <p className="mb-2"><strong>Myth:</strong> "If you really wanted this baby, you wouldn't be depressed."</p>
            <p><strong>Reality:</strong> PPD affects women with wanted, planned, celebrated pregnancies just as much as unplanned ones. Depression doesn't discriminate based on whether the baby was "wanted enough."</p>
          </ArticleCallout>

          <ArticleCallout variant="info">
            <p className="mb-2"><strong>Myth:</strong> "PPD only happens to women with prior mental health problems."</p>
            <p><strong>Reality:</strong> While prior depression increases risk, 50% of women with PPD have no psychiatric history. The dramatic biological changes postpartum can trigger depression in anyone.</p>
          </ArticleCallout>

          <ArticleCallout variant="info">
            <p className="mb-2"><strong>Myth:</strong> "It's just hormones---it will pass on its own."</p>
            <p><strong>Reality:</strong> While hormones play a role, untreated PPD can persist for months or years. It doesn't reliably resolve without treatment. The "just wait it out" approach causes unnecessary suffering.</p>
          </ArticleCallout>

          <ArticleCallout variant="info">
            <p className="mb-2"><strong>Myth:</strong> "You can't take medication if you're breastfeeding."</p>
            <p><strong>Reality:</strong> Many antidepressants are safe during breastfeeding, with minimal transfer to breast milk. The risks of untreated PPD (to both mother and baby) often outweigh minimal medication risks. Discuss options with your provider.</p>
          </ArticleCallout>

          <ArticleCallout variant="info">
            <p className="mb-2"><strong>Myth:</strong> "Asking for help means you're weak or failing."</p>
            <p><strong>Reality:</strong> Seeking treatment is an act of strength and responsibility. Recognizing you need help and taking action to get it demonstrates courage, not weakness.</p>
          </ArticleCallout>

          <ArticleCallout variant="info">
            <p className="mb-2"><strong>Myth:</strong> "PPD only affects women."</p>
            <p><strong>Reality:</strong> 8-10% of non-birthing partners experience postpartum depression. Fathers and co-mothers also face adjustment challenges, sleep deprivation, and relationship stress that can trigger depression.</p>
          </ArticleCallout>
        </div>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment
        </h2>
        <p className="mb-6">
          PPD is highly treatable. With appropriate care, most women fully recover <Citation id="3" index={3} source="JAMA Psychiatry" year="2021" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'psychotherapy',
              title: 'Psychotherapy (Often First-Line)',
              content: (
                <div>
                  <p className="mb-4"><strong>Cognitive Behavioral Therapy (CBT):</strong> Addresses negative thoughts, behavioral activation, coping skills <Citation id="6" index={6} source="Archives of Women's Mental Health" year="2020" tier={1} /></p>
                  <p className="mb-4"><strong>Interpersonal Therapy (IPT):</strong> Focuses on role transition, relationship issues, social support</p>
                  <p className="mb-4">Both are highly effective for PPD, with response rates of 60-80%. Can be delivered individually or in groups. Telehealth options increase accessibility.</p>
                </div>
              ),
            },
            {
              id: 'medication',
              title: 'Antidepressant Medication',
              content: (
                <div>
                  <p className="mb-4">SSRIs (sertraline, escitalopram) are first-line medications for PPD. They're effective and compatible with breastfeeding <Citation id="7" index={7} source="Journal of Clinical Psychiatry" year="2021" tier={1} />.</p>
                  <p className="mb-4"><strong>Breastfeeding considerations:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Most antidepressants transfer to breast milk in very small amounts</li>
                    <li>Sertraline and paroxetine have lowest infant exposure</li>
                    <li>Risk of untreated maternal depression generally outweighs minimal medication exposure</li>
                    <li>Discuss risks/benefits with psychiatrist and pediatrician</li>
                  </ul>
                  <p className="mt-4">For severe PPD, combination of therapy and medication is most effective.</p>
                </div>
              ),
            },
            {
              id: 'specialized',
              title: 'Specialized Treatments',
              content: (
                <div>
                  <p className="mb-4"><strong>Brexanolone (Zulresso):</strong> IV medication specifically FDA-approved for PPD. Administered as 60-hour infusion in healthcare setting. Rapid onset (often improvement within hours to days). Expensive and logistically complex but effective for severe PPD.</p>
                  <p className="mb-4"><strong>Zuranolone (Zurzuvae):</strong> Oral medication approved for PPD, taken for 14 days. More accessible than brexanolone.</p>
                </div>
              ),
            },
            {
              id: 'support',
              title: 'Social Support & Practical Help',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Partner involvement in treatment and infant care</li>
                  <li>Help with household tasks, meals, childcare</li>
                  <li>Postpartum support groups (virtual or in-person)</li>
                  <li>Doula or postpartum doula support</li>
                  <li>Sleep support (taking shifts, help with night wakings)</li>
                </ul>
              ),
            },
            {
              id: 'hormonal',
              title: 'Addressing Medical Factors',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Screen for and treat thyroid dysfunction</li>
                  <li>Address anemia (common postpartum, worsens fatigue)</li>
                  <li>Pain management for birth recovery</li>
                  <li>Sleep hygiene and maximizing sleep opportunities</li>
                </ul>
              ),
            },
          ]}
        />

        <h2 id="getting-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Getting Help
        </h2>

        <ArticleCallout variant="tip" title="When to Seek Help">
          <p className="mb-4">Seek help if you experience:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Depressive symptoms lasting more than 2 weeks</li>
            <li>Symptoms interfering with ability to care for baby or yourself</li>
            <li>Thoughts of harming yourself or baby</li>
            <li>Inability to sleep even when baby sleeps</li>
            <li>Severe anxiety or panic attacks</li>
            <li>Feeling disconnected from baby or lack of bonding</li>
            <li>Regretting having the baby</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          <strong>Where to get help:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>OB-GYN or midwife:</strong> Should screen for PPD at postpartum visits</li>
          <li><strong>Pediatrician:</strong> Also screens mothers during well-baby visits</li>
          <li><strong>Primary care physician</strong></li>
          <li><strong>Psychiatrist or psychiatric nurse practitioner</strong> specializing in perinatal mental health</li>
          <li><strong>Therapist with perinatal specialization</strong></li>
          <li><strong>Postpartum Support International:</strong> 1-800-944-4773, text 503-894-9453, or visit postpartum.net</li>
          <li><strong>Crisis resources:</strong> 988 Suicide & Crisis Lifeline, Crisis Text Line (text HOME to 741741)</li>
        </ul>

        <ArticleCallout variant="warning" title="Postpartum Psychosis---Emergency Condition">
          <p className="mb-4">Postpartum psychosis is rare (1-2 per 1,000 births) but a psychiatric emergency <Citation id="8" index={8} source="American Family Physician" year="2020" tier={2} />. Symptoms:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Hallucinations (seeing/hearing things not there)</li>
            <li>Delusions (false beliefs, often about baby)</li>
            <li>Severe confusion or disorientation</li>
            <li>Rapid mood swings</li>
            <li>Bizarre behavior</li>
            <li>Thoughts of harming baby</li>
          </ul>
          <p className="mb-4">Onset is sudden, typically within first 2 weeks postpartum. Highest risk in women with bipolar disorder.</p>
          <p><strong>If you or someone you know shows these symptoms, go to the emergency room immediately or call 911. This is a medical emergency requiring hospitalization.</strong></p>
        </ArticleCallout>

        <h2 id="partners" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          PPD in Partners and Fathers
        </h2>
        <p className="mb-6">
          Postpartum depression affects 8-10% of non-birthing partners (fathers, co-mothers) <Citation id="9" index={9} source="Journal of Affective Disorders" year="2019" tier={1} />. Risk factors include partner's PPD, relationship stress, sleep deprivation, and adjustment to parenthood. Partners also need and deserve screening and treatment.
        </p>

        <QuoteBlock
          quote="I thought I was a terrible mother because I didn't feel the overwhelming love everyone talks about. I felt nothing---just exhaustion and dread. Getting treatment was the hardest and best thing I did. Now I can actually enjoy my baby. I wish I'd asked for help sooner."
          attribution="Anonymous mother"
          role="Recovering from postpartum depression"
          variant="large"
        />

        <p className="mb-6">
          Postpartum depression is not your fault. It doesn't mean you don't love your baby or that you're failing as a mother. It's a medical condition with biological causes, and it's treatable. You don't have to suffer in silence, and you don't have to wait it out. Help is available, recovery is possible, and you and your baby both deserve your wellness.
        </p>

        <p className="mb-6">
          If you're struggling, please reach out. Treatment works. You will feel better. And one day, you'll be glad you asked for help.
        </p>
      </>
    ),
  },
];
