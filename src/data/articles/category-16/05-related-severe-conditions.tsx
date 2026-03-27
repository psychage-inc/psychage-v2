/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_PSYCHOSIS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
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

// ============================================================================
// Subcategory 5 --- Related Severe Conditions | Articles 41--45
// ============================================================================

export const relatedSevereConditionsArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-PSY-041 | Bipolar Disorder With Psychotic Features
  // --------------------------------------------------------------------------
  {
    id: catId(41),
    slug: 'bipolar-disorder-psychotic-features-when-mood-and-reality-diverge',
    status: 'draft',
    title: 'Bipolar Disorder With Psychotic Features: When Mood and Reality Diverge',
    description: 'How psychosis manifests during bipolar episodes --- the difference between schizoaffective disorder and bipolar with psychotic features, mood-congruent vs. mood-incongruent psychosis, and treatment implications.',
    image: '/images/articles/cat16/cover-041.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Bipolar Disorder', 'Psychosis', 'Mood Disorders', 'Diagnosis'],

    summary: 'Approximately 50--70% of people with bipolar I disorder experience psychotic symptoms during at least one mood episode. These psychotic features --- hallucinations, delusions, and disorganized thinking --- occur exclusively during severe manic or depressive episodes and resolve when the mood episode resolves. This distinguishes bipolar disorder with psychotic features from schizoaffective disorder, where psychotic symptoms persist between mood episodes. The content of psychosis in bipolar disorder is often mood-congruent: grandiose delusions during mania ("I\'m a billionaire," "I can control the weather"), nihilistic delusions during depression ("I\'m dead," "the world is ending"). Understanding this mood-psychosis relationship is essential for accurate diagnosis and effective treatment.',

    keyFacts: [
      { text: 'Approximately 50--70% of people with bipolar I disorder experience psychotic features during at least one episode', citationIndex: 1 },
      { text: 'Psychotic features during bipolar episodes are associated with worse outcomes, higher hospitalization rates, and greater functional impairment', citationIndex: 2 },
      { text: 'Mood-congruent psychosis (delusions matching the mood state) is more common than mood-incongruent psychosis in bipolar disorder', citationIndex: 3 },
      { text: 'The distinction between bipolar disorder with psychotic features and schizoaffective disorder rests on whether psychosis occurs exclusively during mood episodes', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'During a manic episode with psychosis, a person might believe they can fly --- not as a metaphor, but as an absolute conviction that leads them to dangerous heights. During a depressive episode with psychosis, they might believe they\'re already dead --- not feeling dead, but genuinely believing they died and exist as a walking corpse. The mood doesn\'t just color the delusion; it generates it.',

    practicalExercise: {
      title: 'Recognizing Mood-Psychosis Patterns',
      steps: [
        { title: 'Track mood and unusual thoughts together', description: 'When mood is elevated or severely low, note any unusual beliefs or perceptual experiences. Does the content of unusual thinking match the mood? Grandiose thoughts during highs? Nihilistic thoughts during lows? This pattern suggests mood-related psychosis.' },
        { title: 'Monitor for psychosis between episodes', description: 'If you experience psychotic symptoms when your mood is stable, this is clinically significant and should be reported to your treatment team. It may indicate schizoaffective disorder rather than bipolar disorder with psychotic features.' },
        { title: 'Document episode triggers', description: 'What precedes episodes with psychosis? Sleep deprivation? Stress? Substance use? Stopping medication? Identifying triggers creates opportunities for prevention.' },
        { title: 'Create a psychosis-specific crisis plan', description: 'Your crisis plan should distinguish between mood episodes without psychosis (which you might manage at home with medication adjustment) and mood episodes with psychosis (which may require immediate professional evaluation).' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Mood and Symptoms',
    },

    citations: [
      { id: '1', text: 'Psychotic features in bipolar disorder: A systematic review and meta-analysis', source: 'Bipolar Disorders', year: '2020', link: 'https://doi.org/10.1111/bdi.12876', tier: 1 },
      { id: '2', text: 'Clinical outcomes of bipolar disorder with and without psychotic features: A meta-analysis', source: 'Journal of Affective Disorders', year: '2019', link: 'https://doi.org/10.1016/j.jad.2019.03.011', tier: 1 },
      { id: '3', text: 'Mood-congruent and mood-incongruent psychosis in bipolar disorder: A systematic review', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291720000367', tier: 1 },
      { id: '4', text: 'Distinguishing schizoaffective disorder from bipolar disorder with psychotic features: A clinical review', source: 'Schizophrenia Research', year: '2019', link: 'https://doi.org/10.1016/j.schres.2019.08.022', tier: 1 },
      { id: '5', text: 'Treatment of psychotic bipolar disorder: Evidence and recommendations', source: 'American Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1176/appi.ajp.2020.19111145', tier: 1 },
      { id: '6', text: 'Neurobiology of psychosis in bipolar disorder: A review', source: 'Bipolar Disorders', year: '2019', link: 'https://doi.org/10.1111/bdi.12726', tier: 1 },
      { id: '7', text: 'Bipolar disorder fact sheet', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/bipolar-disorder', tier: 2 },
      { id: '8', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When most people think of bipolar disorder, they picture extreme mood swings ---
            highs and lows, mania and depression. What often goes undiscussed is that for
            a substantial proportion of people with bipolar I disorder, these mood extremes
            can fracture reality
            itself <Citation id="1" index={1} source="Bipolar Disorders" year="2020" tier={1} />.
            During severe manic episodes, a person might develop grandiose delusions that
            feel as real as any perception. During severe depressive episodes, nihilistic
            beliefs can take root with delusional intensity. These aren't metaphors or
            exaggerations --- they're genuine breaks from shared reality that occur in the
            context of extreme mood states.
          </p>
        </div>

        <h2 id="prevalence-and-presentation" className="text-3xl font-display font-bold text-gray-900 dark:text-gray-300 mt-12 mb-6 scroll-mt-32">
          How Common Is Psychosis in Bipolar Disorder?
        </h2>
        <p className="mb-6">
          Psychotic features occur in approximately 50--70% of people with bipolar I
          disorder during at least one
          episode <Citation id="1" index={1} source="Bipolar Disorders" year="2020" tier={1} />.
          The presence of psychosis is one of the diagnostic criteria that distinguishes
          bipolar I from bipolar II --- bipolar II is characterized by hypomanic (less
          severe) episodes that by definition do not include psychotic features. Psychosis
          can occur during manic episodes, depressive episodes, or mixed episodes, though
          it's most common during severe mania.
        </p>

        <StatCard
          stats={[
            { value: 60, suffix: '%', label: 'Experience psychosis during at least one episode' },
            { value: 25, suffix: '%', label: 'Have psychosis during first manic episode' },
            { value: 2, suffix: '--3×', label: 'Higher hospitalization rate with psychosis' },
          ]}
          source="Bipolar Disorders, 2020; Journal of Affective Disorders, 2019"
        />

        <h2 id="mood-congruent-vs-incongruent" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Mood-Congruent vs. Mood-Incongruent Psychosis
        </h2>
        <p className="mb-6">
          The content of psychotic experiences in bipolar disorder typically matches the
          prevailing mood state --- a phenomenon called mood
          congruence <Citation id="3" index={3} source="Psychological Medicine" year="2020" tier={1} />:
        </p>

        <ComparisonTable
          headers={['Mood State', 'Mood-Congruent Psychosis', 'Examples']}
          rows={[
            ['Mania', 'Grandiose delusions, inflated sense of power or importance', '"I\'m a billionaire," "I can communicate with God," "I\'m invulnerable," "I\'ve discovered the cure for cancer"'],
            ['Depression', 'Nihilistic delusions, guilt, worthlessness, somatic delusions', '"I\'m already dead" (Cotard delusion), "I\'ve committed unforgivable sins," "My organs are rotting," "The world is ending"'],
            ['Mixed episodes', 'Combination of persecutory and grandiose themes, often chaotic', '"I have special powers but everyone is trying to destroy me," "I\'m meant for greatness but I\'m also doomed"'],
          ]}
        />

        <p className="mt-6 mb-6">
          Mood-incongruent psychosis --- delusions or hallucinations whose content doesn't
          match the mood state --- can also occur in bipolar disorder but is less common.
          When present, it may suggest a more severe illness course or raise diagnostic
          questions about whether schizoaffective disorder better explains the pattern.
        </p>

        <h2 id="vs-schizoaffective" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Bipolar With Psychosis vs. Schizoaffective Disorder
        </h2>
        <p className="mb-6">
          The diagnostic boundary between bipolar disorder with psychotic features and
          schizoaffective disorder (bipolar type) is one of the most challenging
          distinctions in
          psychiatry <Citation id="4" index={4} source="Schizophrenia Research" year="2019" tier={1} />.
          The key question is timing: Does the psychosis occur exclusively during mood
          episodes, or does it persist when mood is stable?
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Bipolar Disorder With Psychotic Features',
              content: 'Psychotic symptoms (hallucinations, delusions) occur only during mood episodes (manic, depressive, or mixed). When the mood episode resolves with treatment, the psychosis resolves too. Between episodes, the person does not experience psychotic symptoms. The primary diagnosis is a mood disorder --- psychosis is a feature of severe mood states.',
            },
            {
              label: 'Schizoaffective Disorder (Bipolar Type)',
              content: 'The person experiences both mood episodes (meeting criteria for bipolar disorder) AND psychotic symptoms that persist for at least 2 weeks in the absence of a major mood episode. Psychosis exists independently of mood state. The diagnosis requires that psychotic symptoms have been present for a substantial portion of the total illness duration. This is conceptualized as a hybrid condition --- not purely a mood disorder, not purely a psychotic disorder.',
            },
          ]}
        />

        <p className="mt-6 mb-6">
          Accurate diagnosis matters because treatment approaches differ. Bipolar disorder
          with psychotic features is typically treated with a mood stabilizer plus an
          antipsychotic during acute episodes, with the antipsychotic often discontinued
          once the episode resolves. Schizoaffective disorder typically requires ongoing
          antipsychotic treatment even between mood episodes.
        </p>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment: Mood Stabilization Plus Antipsychotics
        </h2>
        <p className="mb-6">
          The treatment of bipolar disorder with psychotic features requires addressing
          both the mood dysregulation and the psychotic
          symptoms <Citation id="5" index={5} source="American Journal of Psychiatry" year="2020" tier={1} />.
          Mood stabilizers alone are typically insufficient when psychosis is present ---
          the combination of a mood stabilizer (lithium, valproate, or lamotrigine) plus
          an antipsychotic is standard during acute psychotic manic or depressive episodes.
        </p>
        <p className="mb-6">
          Lithium deserves particular mention: it is the only mood stabilizer with proven
          anti-suicide effects and has moderate antipsychotic properties of its own. For
          people with bipolar disorder who experience psychotic features, lithium plus an
          antipsychotic is often more effective than other mood stabilizer combinations.
          Electroconvulsive therapy (ECT) is also highly effective for severe manic or
          depressive episodes with psychosis and may be considered when medication fails
          or when rapid response is
          needed <Citation id="7" index={7} source="National Institute of Mental Health" year="2024" tier={2} />.
        </p>

        <ArticleCallout type="warning" title="The Risk of Antidepressants">
          Antidepressants are frequently prescribed during bipolar depression, but in
          people with a history of psychotic features, they carry significant risk of
          triggering mania or mixed states --- which may themselves include psychosis.
          If antidepressants are used in bipolar disorder with psychotic features, they
          should always be combined with a mood stabilizer and used with
          caution <Citation id="8" index={8} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
        </ArticleCallout>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-042 | Major Depression With Psychotic Features
  // --------------------------------------------------------------------------
  {
    id: catId(42),
    slug: 'major-depression-psychotic-features-when-despair-distorts-reality',
    status: 'draft',
    title: 'Major Depression With Psychotic Features: When Despair Distorts Reality',
    description: 'Understanding psychotic depression --- how severe major depressive episodes can include delusions and hallucinations, why it\'s often missed, and why treatment differs from non-psychotic depression.',
    image: '/images/articles/cat16/cover-042.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Psychotic Depression', 'Major Depression', 'Psychosis', 'Treatment'],

    summary: 'Psychotic depression --- major depressive disorder with psychotic features --- affects approximately 15--20% of people hospitalized for depression, yet it remains underrecognized and undertreated. Unlike the grandiose delusions of mania, psychotic depression involves nihilistic, guilt-ridden, or somatic delusions that amplify hopelessness to delusional proportions. A person might believe their internal organs are rotting, that they\'ve committed unforgivable sins, or that they\'re already dead (Cotard delusion). These aren\'t exaggerations of depressed thinking --- they\'re fixed false beliefs held with delusional conviction. Psychotic depression carries a significantly higher suicide risk than non-psychotic depression and requires different treatment: antidepressants alone are insufficient; the combination of an antidepressant plus an antipsychotic, or ECT, is the evidence-based approach.',

    keyFacts: [
      { text: 'Approximately 15--20% of people with severe major depression experience psychotic features during at least one episode', citationIndex: 1 },
      { text: 'Psychotic depression carries a 4--5 times higher suicide risk than non-psychotic depression', citationIndex: 2 },
      { text: 'Antidepressants alone have a response rate of only 30--40% in psychotic depression, compared to 60--70% when combined with antipsychotics', citationIndex: 3 },
      { text: 'Psychotic depression is frequently misdiagnosed as schizophrenia, delaying appropriate treatment', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The person with psychotic depression who believes they\'re already dead isn\'t speaking metaphorically. They genuinely experience themselves as a corpse --- walking, talking, but fundamentally no longer alive. This is Cotard delusion, and it transforms depression from unbearable sadness into a reality where hope is literally impossible because the self no longer exists.',

    practicalExercise: {
      title: 'Recognizing Psychotic Features in Depression',
      steps: [
        { title: 'Distinguish metaphor from delusion', description: 'Depressed thinking: "I feel like I\'m worthless." Psychotic depression: "I am worthless --- it\'s an objective fact everyone knows." The difference is conviction and imperviousness to contrary evidence. If reassurance doesn\'t create even momentary doubt, the belief may be delusional.' },
        { title: 'Watch for nihilistic themes', description: 'Common themes in psychotic depression: guilt out of proportion to any action, belief that one\'s body is diseased or rotting, conviction that one has ruined others\' lives irreparably, or belief that the world is ending. These themes are darker and more absolute than typical depressive rumination.' },
        { title: 'Note if depression includes hallucinations', description: 'Auditory hallucinations in psychotic depression typically involve accusatory voices ("You\'re evil," "You deserve to die") rather than command hallucinations. Any hallucinations during severe depression should trigger immediate clinical evaluation.' },
        { title: 'Assess suicide risk urgently', description: 'Psychotic depression represents one of the highest-risk clinical presentations for suicide. If you or someone you know experiences psychotic symptoms during depression, this is a psychiatric emergency requiring immediate professional evaluation.' },
      ],
      toolLink: '/crisis',
      toolLabel: 'Access Crisis Resources',
    },

    citations: [
      { id: '1', text: 'Prevalence and clinical characteristics of psychotic depression: A systematic review', source: 'Depression and Anxiety', year: '2019', link: 'https://doi.org/10.1002/da.22866', tier: 1 },
      { id: '2', text: 'Suicide risk in psychotic vs. non-psychotic depression: A meta-analysis', source: 'The Lancet Psychiatry', year: '2020', link: 'https://doi.org/10.1016/S2215-0366(20)30125-2', tier: 1 },
      { id: '3', text: 'Pharmacological treatment of psychotic depression: A systematic review and meta-analysis', source: 'American Journal of Psychiatry', year: '2019', link: 'https://doi.org/10.1176/appi.ajp.2018.18050579', tier: 1 },
      { id: '4', text: 'Diagnostic challenges in psychotic depression: A clinical review', source: 'Journal of Clinical Psychiatry', year: '2020', link: 'https://doi.org/10.4088/JCP.19r13145', tier: 1 },
      { id: '5', text: 'Electroconvulsive therapy for psychotic depression: Efficacy and predictors of response', source: 'Journal of ECT', year: '2020', link: 'https://doi.org/10.1097/YCT.0000000000000642', tier: 1 },
      { id: '6', text: 'Cotard delusion: A systematic review of 172 cases', source: 'Psychological Medicine', year: '2018', link: 'https://doi.org/10.1017/S0033291717003634', tier: 1 },
      { id: '7', text: 'Understanding depression', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/depression', tier: 2 },
      { id: '8', text: 'Depression in adults: Treatment and management (NICE NG222)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/ng222', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Depression is isolating. Psychotic depression is isolating in a way that defies
            ordinary comprehension --- because the isolation isn't just emotional, it's
            existential. When someone with psychotic depression believes they are already
            dead, or that their sins are so profound that redemption is impossible, or that
            their body is rotting from the inside, they occupy a reality that no amount of
            reassurance can
            penetrate <Citation id="1" index={1} source="Depression and Anxiety" year="2019" tier={1} />.
            This is depression amplified to the point of delusion --- and it requires
            recognition and treatment that standard depression protocols don't provide.
          </p>
        </div>

        <h2 id="what-psychotic-depression-looks-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Psychotic Depression Looks Like
        </h2>
        <p className="mb-6">
          Psychotic depression combines the vegetative symptoms of severe major depression ---
          profound sadness, loss of interest, sleep and appetite disturbance, psychomotor
          changes --- with delusions or hallucinations whose content reflects depressive
          themes <Citation id="4" index={4} source="Journal of Clinical Psychiatry" year="2020" tier={1} />.
          The delusions are almost always mood-congruent, meaning they match and amplify
          the depressive state:
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Delusions of Guilt',
              content: 'The person believes they have committed terrible, unforgivable acts --- often things they haven\'t actually done or minor transgressions blown into catastrophic proportions. The guilt is experienced as objective fact rather than feeling. "I\'ve ruined everyone\'s life and I deserve to be punished" is held with the same certainty that you know your own name.',
            },
            {
              title: 'Nihilistic Delusions',
              content: 'Beliefs that oneself, others, or the world doesn\'t exist or is about to end. The most extreme form is Cotard delusion --- the conviction that one is dead, doesn\'t exist, or has lost essential organs or body parts. This is not metaphorical: the person genuinely experiences themselves as a walking corpse or non-entity.',
            },
            {
              title: 'Somatic Delusions',
              content: 'Fixed false beliefs about one\'s body --- that organs are rotting, that one has a terrible disease doctors have failed to detect, that one\'s body is fundamentally defective or repulsive. These beliefs persist despite medical reassurance and negative test results.',
            },
            {
              title: 'Persecutory Delusions',
              content: 'Beliefs that one is being punished for sins, that others are plotting harm because one deserves it, or that one is under surveillance as a criminal. Unlike persecutory delusions in schizophrenia, these are framed as deserved punishment rather than unjust persecution.',
            },
          ]}
        />

        <h2 id="why-its-missed" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Psychotic Depression Is Often Misdiagnosed
        </h2>
        <p className="mb-6">
          Psychotic depression is frequently missed or
          misdiagnosed <Citation id="4" index={4} source="Journal of Clinical Psychiatry" year="2020" tier={1} />.
          During an initial evaluation, clinicians may focus on the obvious depressive
          symptoms and fail to probe for psychotic features. Patients may not volunteer
          delusional beliefs because the delusions feel like reality --- not symptoms to
          report but facts to accept. And when psychotic features are recognized, they're
          sometimes misattributed to schizophrenia rather than recognized as a feature
          of severe depression.
        </p>
        <p className="mb-6">
          The distinction matters enormously for treatment. Someone misdiagnosed with
          schizophrenia might receive an antipsychotic alone --- which will reduce the
          psychotic symptoms but leave the underlying depression untreated, creating a
          chronically depressed person without delusions rather than a recovered person.
          The correct treatment requires addressing both the mood disorder and the
          psychosis simultaneously.
        </p>

        <ArticleCallout type="warning" title="Suicide Risk Is Extraordinarily High">
          Psychotic depression carries one of the highest suicide risks of any psychiatric
          condition <Citation id="2" index={2} source="The Lancet Psychiatry" year="2020" tier={1} />.
          The combination of profound hopelessness, delusional conviction that death is
          deserved or that one is already dead, and possible command hallucinations creates
          extreme danger. Anyone experiencing psychotic symptoms during depression requires
          immediate psychiatric evaluation and often requires hospitalization for safety
          during the acute phase of treatment.
        </ArticleCallout>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment: Why Antidepressants Alone Aren't Enough
        </h2>
        <p className="mb-6">
          The evidence for treating psychotic depression is unambiguous: antidepressants
          alone produce inadequate
          response <Citation id="3" index={3} source="American Journal of Psychiatry" year="2019" tier={1} />.
          Response rates to antidepressant monotherapy in psychotic depression are
          approximately 30--40% --- comparable to placebo in some trials. The combination
          of an antidepressant plus an antipsychotic produces response rates of 60--70%,
          more than double the rate of either medication alone.
        </p>

        <BeforeAfter
          before={{
            title: 'Ineffective Treatment',
            items: [
              'Antidepressant alone: 30--40% response',
              'Antipsychotic alone: Reduces psychosis, leaves depression',
              'Psychotherapy alone: Ineffective during acute psychosis',
              'Delayed treatment: Higher suicide risk, longer episode',
            ],
          }}
          after={{
            title: 'Evidence-Based Treatment',
            items: [
              'Antidepressant + antipsychotic: 60--70% response',
              'ECT: 80--90% response, fastest onset',
              'Hospitalization for safety during acute phase',
              'Relapse prevention with maintenance medication',
            ],
          }}
        />

        <p className="mt-6 mb-6">
          Electroconvulsive therapy (ECT) is the most effective treatment for psychotic
          depression, with response rates of 80--90% and rapid
          onset <Citation id="5" index={5} source="Journal of ECT" year="2020" tier={1} />.
          ECT should be considered first-line in situations where rapid response is
          essential (imminent suicide risk, catatonia, refusal to eat or drink) or when
          medication has failed. The stigma surrounding ECT has prevented many people
          with psychotic depression from accessing the treatment most likely to
          save their
          lives <Citation id="8" index={8} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-043 | Substance-Induced Psychotic Disorder
  // --------------------------------------------------------------------------
  {
    id: catId(43),
    slug: 'substance-induced-psychotic-disorder-when-drugs-trigger-psychosis',
    status: 'draft',
    title: 'Substance-Induced Psychotic Disorder: When Drugs Trigger Psychosis',
    description: 'How substances --- particularly cannabis, stimulants, and hallucinogens --- can trigger psychotic episodes, the relationship between substance use and schizophrenia, and when psychosis persists after the substance clears.',
    image: '/images/articles/cat16/cover-043.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Substance Use', 'Drug-Induced Psychosis', 'Cannabis', 'Treatment'],

    summary: 'Substance-induced psychotic disorder occurs when psychotic symptoms --- hallucinations, delusions, disorganized thinking --- emerge during or shortly after substance intoxication or withdrawal. The substances most commonly implicated are cannabis (particularly high-potency forms), stimulants (methamphetamine, cocaine), and hallucinogens (LSD, psilocybin). For most people, substance-induced psychosis resolves within hours to weeks once the substance clears and use stops. But for a subset --- particularly those with genetic vulnerability --- substance-induced psychosis can be the trigger that unmasks an underlying psychotic disorder like schizophrenia. This article examines which substances carry the highest risk, who is most vulnerable, and the critical question: when does substance-induced psychosis end and primary psychotic disorder begin?',

    keyFacts: [
      { text: 'Cannabis use disorder increases the risk of developing schizophrenia approximately 2--3×, with the risk highest for high-potency cannabis and adolescent-onset use', citationIndex: 1 },
      { text: 'Approximately 25--40% of people who present with first-episode psychosis have substance-induced psychosis, most commonly from cannabis or stimulants', citationIndex: 2 },
      { text: 'Methamphetamine-induced psychosis can persist for weeks or months after cessation of use, and in some cases transitions to chronic psychosis', citationIndex: 3 },
      { text: 'The younger the age of cannabis initiation, the higher the risk of later developing a psychotic disorder', citationIndex: 1 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The relationship between cannabis and psychosis isn\'t simple causation --- it\'s gene-environment interaction. Most people who use cannabis will never develop psychosis. But for people with specific genetic vulnerabilities, cannabis can be the environmental trigger that initiates a psychotic disorder that would not have emerged otherwise. The question "does cannabis cause schizophrenia?" has the unsatisfying but accurate answer: sometimes, in some people.',

    practicalExercise: {
      title: 'Assessing Substance-Psychosis Connection',
      steps: [
        { title: 'Map the timeline', description: 'If you or someone you know has experienced psychosis, carefully document when substance use began, when psychotic symptoms first appeared, and whether symptoms resolve during periods of abstinence. Symptoms that only occur during/after substance use suggest substance-induced psychosis.' },
        { title: 'Identify all substances', description: 'Include prescription medications (steroids, stimulants for ADHD), over-the-counter drugs (antihistamines, cough suppressants), and supplements --- not just illegal substances. Substance-induced psychosis can result from unexpected sources.' },
        { title: 'Note family psychiatric history', description: 'If there\'s family history of schizophrenia or bipolar disorder, substance-induced psychosis may represent the unmasking of genetic vulnerability. This information should be shared with treatment providers.' },
        { title: 'Commit to a period of abstinence', description: 'The only way to distinguish substance-induced psychosis from primary psychotic disorder is abstinence. If symptoms resolve within weeks to months of stopping all substance use and don\'t return during sustained abstinence, the diagnosis is substance-induced. If symptoms persist, the diagnosis may need revision.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Explore the Symptom Navigator',
    },

    citations: [
      { id: '1', text: 'Cannabis use and the risk of developing a psychotic disorder: A systematic review and meta-analysis', source: 'The Lancet Psychiatry', year: '2019', link: 'https://doi.org/10.1016/S2215-0366(19)30048-3', tier: 1 },
      { id: '2', text: 'Substance-induced psychosis: Prevalence, predictors, and clinical outcomes', source: 'Schizophrenia Research', year: '2020', link: 'https://doi.org/10.1016/j.schres.2020.04.018', tier: 1 },
      { id: '3', text: 'Methamphetamine-associated psychosis: A systematic review and meta-analysis', source: 'American Journal of Psychiatry', year: '2019', link: 'https://doi.org/10.1176/appi.ajp.2019.18101126', tier: 1 },
      { id: '4', text: 'Hallucinogen persisting perception disorder: A systematic review', source: 'Psychopharmacology', year: '2018', link: 'https://doi.org/10.1007/s00213-018-4885-6', tier: 1 },
      { id: '5', text: 'Gene-environment interaction in cannabis-induced psychosis: Evidence from twin studies', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291720000859', tier: 1 },
      { id: '6', text: 'Treatment of substance-induced psychotic disorder: A clinical review', source: 'Journal of Clinical Psychiatry', year: '2020', link: 'https://doi.org/10.4088/JCP.19r13154', tier: 1 },
      { id: '7', text: 'Understanding schizophrenia', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
      { id: '8', text: 'Substance misuse guidance', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/conditions-and-diseases/mental-health-and-behavioural-conditions/substance-misuse', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The person who smokes cannabis and develops paranoid delusions. The college student
            who takes LSD and never fully returns. The person using methamphetamine who begins
            hearing voices that persist long after the drug has cleared their system. These are
            all faces of substance-induced psychotic disorder --- a condition that sits at the
            complicated intersection of pharmacology, genetics, and psychiatric
            vulnerability <Citation id="2" index={2} source="Schizophrenia Research" year="2020" tier={1} />.
            Understanding this intersection isn't academic --- it shapes prevention strategies,
            treatment decisions, and the fundamental question of whether someone has a
            temporary drug reaction or a chronic psychiatric condition.
          </p>
        </div>

        <h2 id="which-substances" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Which Substances Trigger Psychosis?
        </h2>
        <p className="mb-6">
          While virtually any psychoactive substance can theoretically induce psychosis,
          certain drugs carry particularly high risk:
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Cannabis',
              content: 'Cannabis --- particularly high-potency varieties with high THC and low CBD --- is the most commonly implicated substance in drug-induced psychosis. Daily use approximately doubles the risk of psychosis compared to non-use, and high-potency daily use increases risk by approximately 5-fold. The risk is highest for adolescent-onset use, when the developing brain appears most vulnerable. For people with genetic vulnerability (family history of schizophrenia, specific genetic variants), cannabis can act as an environmental trigger for psychotic disorders.',
            },
            {
              label: 'Stimulants',
              content: 'Methamphetamine and cocaine can induce psychosis that is clinically indistinguishable from paranoid schizophrenia --- auditory hallucinations, persecutory delusions, and thought disorder. Methamphetamine-induced psychosis can persist for weeks or months after cessation, and approximately 25% of people with methamphetamine-induced psychosis go on to develop chronic psychotic disorders. The mechanism involves dopamine hyperactivity, the same pathway implicated in schizophrenia.',
            },
            {
              label: 'Hallucinogens',
              content: 'LSD, psilocybin, and similar compounds can induce acute psychotic states during intoxication, but these typically resolve within hours. A small subset develops Hallucinogen Persisting Perception Disorder (HPPD) --- ongoing visual disturbances long after use. And rarely, hallucinogen use appears to trigger persistent psychotic disorders in vulnerable individuals, though the causal relationship remains debated.',
            },
            {
              label: 'Prescription Medications',
              content: 'Corticosteroids (prednisone), stimulant ADHD medications (at high doses), anticholinergic medications, and some antibiotics can induce psychotic symptoms, particularly in vulnerable populations. These reactions are typically dose-related and resolve with medication discontinuation.',
            },
          ]}
        />

        <h2 id="genetic-vulnerability" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Role of Genetic Vulnerability
        </h2>
        <p className="mb-6">
          The relationship between substance use and psychosis is not deterministic --- most
          people who use cannabis or stimulants will never develop psychosis. The critical
          factor is gene-environment
          interaction <Citation id="5" index={5} source="Psychological Medicine" year="2020" tier={1} />.
          People with specific genetic variants (particularly in genes affecting dopamine
          signaling) and family history of psychotic disorders are at substantially higher
          risk when exposed to psychotogenic substances.
        </p>
        <p className="mb-6">
          Twin studies provide compelling evidence: among people with identical genetic
          makeup, the twin who uses cannabis has higher risk of psychosis than the twin
          who doesn't --- but the baseline risk varies depending on family history. This
          means that substance use acts as a trigger in genetically vulnerable individuals,
          potentially initiating a psychotic disorder that might not have emerged otherwise,
          or might have emerged later in life.
        </p>

        <StatCard
          stats={[
            { value: 2, suffix: '--3×', label: 'Schizophrenia risk with cannabis use' },
            { value: 25, suffix: '%', label: 'Of first-episode psychosis is substance-induced' },
            { value: 5, suffix: '×', label: 'Risk with high-potency daily cannabis use' },
          ]}
          source="The Lancet Psychiatry, 2019; Schizophrenia Research, 2020"
        />

        <h2 id="diagnostic-challenge" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Diagnostic Challenge: Induced vs. Primary
        </h2>
        <p className="mb-6">
          Distinguishing substance-induced psychotic disorder from a primary psychotic
          disorder like schizophrenia is one of the most challenging diagnostic questions
          in psychiatry. The DSM-5 criteria specify that substance-induced psychosis should
          resolve within one month of cessation of substance use or
          withdrawal <Citation id="2" index={2} source="Schizophrenia Research" year="2020" tier={1} />.
          If symptoms persist beyond this window despite documented abstinence, the
          diagnosis should be reconsidered.
        </p>
        <p className="mb-6">
          The challenge is that many people presenting with psychosis have concurrent
          substance use, making it impossible to determine causality acutely. The only
          definitive test is time: sustained abstinence that results in symptom resolution
          confirms substance-induced psychosis; sustained abstinence during which symptoms
          persist or worsen suggests a primary psychotic disorder. This diagnostic
          uncertainty has profound implications for prognosis and long-term treatment
          planning.
        </p>

        <ArticleCallout type="tip" title="Why Abstinence Is Essential">
          For someone who has experienced psychosis in the context of substance use,
          achieving and maintaining abstinence is not just harm reduction --- it's diagnostic
          clarification and potentially curative
          treatment <Citation id="6" index={6} source="Journal of Clinical Psychiatry" year="2020" tier={1} />.
          Continued substance use makes it impossible to know whether ongoing psychotic
          symptoms represent chronic psychosis or ongoing substance effects, and prevents
          accurate prognosis. Integrated treatment that addresses both substance use and
          psychosis simultaneously is the standard of care.
        </ArticleCallout>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-044 | Catatonia
  // --------------------------------------------------------------------------
  {
    id: catId(44),
    slug: 'catatonia-when-psychosis-affects-movement-and-speech',
    status: 'draft',
    title: 'Catatonia: When Psychosis Affects Movement and Speech',
    description: 'Understanding catatonia --- a syndrome of motor and behavioral abnormalities that can occur in psychotic conditions, mood disorders, or medical illness --- and why rapid recognition and treatment is essential.',
    image: '/images/articles/cat16/cover-044.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Catatonia', 'Motor Symptoms', 'Medical Emergency', 'Treatment'],

    summary: 'Catatonia is a syndrome of motor and behavioral abnormalities that can range from complete immobility to extreme agitation. While historically associated with schizophrenia, catatonia can occur in mood disorders (especially bipolar disorder and psychotic depression), medical conditions, and neurological disorders. The presentation can be stuporous (immobility, mutism, rigidity) or excited (purposeless agitation, echolalia, stereotypies). Malignant catatonia --- characterized by autonomic instability, fever, and altered mental status --- is a medical emergency with significant mortality risk if untreated. Despite being underrecognized in modern psychiatry, catatonia is highly treatable: benzodiazepines produce rapid response in 60--80% of cases, and ECT is effective in treatment-resistant cases. Recognition is key --- and recognition requires knowing what to look for.',

    keyFacts: [
      { text: 'Approximately 10% of psychiatric inpatients meet criteria for catatonia, though it remains underrecognized', citationIndex: 1 },
      { text: 'Mood disorders (bipolar disorder and major depression) now account for more cases of catatonia than schizophrenia', citationIndex: 2 },
      { text: 'Benzodiazepines (particularly lorazepam) produce response in 60--80% of catatonia cases within hours to days', citationIndex: 3 },
      { text: 'Malignant catatonia carries a mortality rate of 10--20% if untreated, but responds well to ECT', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The person with catatonia who appears "frozen" isn\'t choosing not to move --- they\'re experiencing a neurological disruption so profound that the motor system locks up entirely. What looks like stubbornness or regression is actually a medical emergency that responds, often within hours, to the right treatment. The tragedy is that catatonia is so often missed.',

    practicalExercise: {
      title: 'Recognizing Catatonic Signs',
      steps: [
        { title: 'Know the hallmark signs', description: 'Immobility or extreme slowing of movement, mutism (not speaking) or near-mutism, posturing (holding odd positions), waxy flexibility (limbs can be positioned and stay there), echolalia (repeating others\' words), or echopraxia (copying others\' movements). Any combination of these should trigger catatonia screening.' },
        { title: 'Check for autonomic instability', description: 'If catatonic signs are accompanied by fever, rapid heart rate, blood pressure fluctuations, or profuse sweating, this may be malignant catatonia --- a medical emergency requiring immediate hospitalization and often ICU-level care.' },
        { title: 'Document the context', description: 'When did the motor symptoms begin? Are they associated with a mood episode (mania or depression)? Recent medication changes (especially antipsychotics, which can cause a catatonia-like syndrome called neuroleptic malignant syndrome)? Medical illness? Context helps guide treatment.' },
        { title: 'Request a lorazepam challenge', description: 'If catatonia is suspected, a diagnostic-therapeutic test is to give lorazepam and observe for response. Rapid improvement within 30 minutes to 2 hours confirms the diagnosis and indicates that benzodiazepines will likely be effective.' },
      ],
      toolLink: '/crisis',
      toolLabel: 'Access Emergency Resources',
    },

    citations: [
      { id: '1', text: 'Prevalence of catatonia in psychiatric inpatients: A systematic review and meta-analysis', source: 'Schizophrenia Bulletin', year: '2020', link: 'https://doi.org/10.1093/schbul/sbz121', tier: 1 },
      { id: '2', text: 'Catatonia in mood disorders: A systematic review', source: 'Bipolar Disorders', year: '2019', link: 'https://doi.org/10.1111/bdi.12773', tier: 1 },
      { id: '3', text: 'Pharmacological treatment of catatonia: A systematic review and meta-analysis', source: 'Schizophrenia Research', year: '2020', link: 'https://doi.org/10.1016/j.schres.2020.02.015', tier: 1 },
      { id: '4', text: 'Malignant catatonia: Diagnosis, treatment, and outcomes', source: 'Journal of Clinical Psychiatry', year: '2019', link: 'https://doi.org/10.4088/JCP.19r12824', tier: 1 },
      { id: '5', text: 'The Bush-Francis Catatonia Rating Scale: Validation and clinical utility', source: 'Acta Psychiatrica Scandinavica', year: '2018', link: 'https://doi.org/10.1111/acps.12859', tier: 1 },
      { id: '6', text: 'ECT for catatonia: A systematic review and meta-analysis', source: 'Journal of ECT', year: '2020', link: 'https://doi.org/10.1097/YCT.0000000000000634', tier: 1 },
      { id: '7', text: 'Understanding schizophrenia', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
      { id: '8', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Catatonia looks like nothing else in psychiatry. A person sits frozen, eyes
            open but unseeing, limbs held in positions that should be uncomfortable but
            that they maintain for hours. Or the opposite: frenzied, purposeless movement
            that continues without apparent goal or fatigue. Speech reduced to echolalia ---
            repeating others' words like a broken recording. These aren't metaphors for
            internal states; they're observable motor and behavioral abnormalities with
            neurological
            underpinnings <Citation id="1" index={1} source="Schizophrenia Bulletin" year="2020" tier={1} />.
            And despite being one of the most treatable syndromes in psychiatry, catatonia
            is chronically underrecognized --- often for weeks, sometimes longer.
          </p>
        </div>

        <h2 id="clinical-features" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Clinical Features of Catatonia
        </h2>
        <p className="mb-6">
          Catatonia is diagnosed when at least three of the following features are
          present <Citation id="5" index={5} source="Acta Psychiatrica Scandinavica" year="2018" tier={1} />:
        </p>

        <ComparisonTable
          headers={['Sign', 'Description', 'Clinical Appearance']}
          rows={[
            ['Stupor', 'Marked decrease in responsiveness to environment', 'Person appears awake but unresponsive to questions, commands, or external stimuli'],
            ['Catalepsy (waxy flexibility)', 'Passive induction of posture held against gravity', 'Clinician can position limbs and they remain in that position indefinitely'],
            ['Mutism', 'No or minimal verbal response', 'Person doesn\'t speak or speaks only occasionally in whispers'],
            ['Negativism', 'Opposition or no response to instructions', 'Actively resists attempts to move them or does the opposite of what\'s asked'],
            ['Posturing', 'Spontaneous and active maintenance of posture', 'Holds odd positions (arm raised, head tilted) for extended periods'],
            ['Echolalia / Echopraxia', 'Mimicking speech or movements of others', 'Repeats what others say or copies their gestures automatically'],
            ['Stereotypy', 'Repetitive, non-goal-directed movement', 'Rocks, paces in patterns, or repeats the same gesture continuously'],
            ['Excitement', 'Purposeless, excessive motor activity', 'Frenzied movement without apparent goal, can be dangerous to self or others'],
          ]}
        />

        <h2 id="underlying-conditions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Causes Catatonia?
        </h2>
        <p className="mb-6">
          Catatonia is not a diagnosis itself --- it's a syndrome that can arise from multiple
          underlying
          conditions <Citation id="2" index={2} source="Bipolar Disorders" year="2019" tier={1} />:
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Mood Disorders (Most Common)',
              content: 'Bipolar disorder (especially during mixed or manic episodes) and major depressive disorder (particularly psychotic depression) are now the most common psychiatric causes of catatonia, accounting for approximately 40--50% of cases. This represents a shift from historical associations with schizophrenia.',
            },
            {
              title: 'Schizophrenia and Psychotic Disorders',
              content: 'While less common than historically believed, catatonia does occur in schizophrenia and schizoaffective disorder, particularly during acute psychotic episodes. The presentation tends to be more chronic and may be harder to treat than catatonia in mood disorders.',
            },
            {
              title: 'Medical and Neurological Conditions',
              content: 'Autoimmune encephalitis (particularly anti-NMDA receptor encephalitis), paraneoplastic syndromes, metabolic disorders, infections affecting the brain, and neurodegenerative conditions can all present with catatonia. This is why medical workup is essential when catatonia is identified.',
            },
            {
              title: 'Medication-Induced',
              content: 'Antipsychotics can cause neuroleptic malignant syndrome (NMS), which presents similarly to malignant catatonia. Sudden withdrawal from benzodiazepines or other GABAergic substances can trigger catatonic states. Distinguishing NMS from catatonia is critical because antipsychotics (the treatment for psychosis) can worsen NMS.',
            },
          ]}
        />

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment: Why Benzodiazepines and ECT Work
        </h2>
        <p className="mb-6">
          Catatonia is one of the most reliably treatable conditions in psychiatry ---
          if it's
          recognized <Citation id="3" index={3} source="Schizophrenia Research" year="2020" tier={1} />.
          The first-line treatment is lorazepam (a benzodiazepine), typically given
          intravenously or intramuscularly at doses of 1--2 mg initially, with repeat
          doses every few hours until response occurs. Approximately 60--80% of people
          with catatonia show dramatic improvement within hours to days of starting
          lorazepam.
        </p>
        <p className="mb-6">
          For catatonia that doesn't respond to benzodiazepines --- or for malignant
          catatonia, which is a medical emergency --- electroconvulsive therapy (ECT)
          is highly
          effective <Citation id="6" index={6} source="Journal of ECT" year="2020" tier={1} />.
          Response rates to ECT in catatonia exceed 80%, often within just a few
          treatments. ECT works rapidly and can be lifesaving in malignant catatonia,
          where fever, autonomic instability, and risk of complications like deep vein
          thrombosis, aspiration pneumonia, and rhabdomyolysis make the condition
          potentially fatal if untreated.
        </p>

        <ArticleCallout type="warning" title="What NOT to Do: Antipsychotics">
          When catatonia occurs in the context of psychosis, the instinct may be to
          treat with antipsychotic medication. This can be dangerous. Antipsychotics
          can worsen catatonia and can trigger neuroleptic malignant syndrome, which
          is clinically similar to malignant catatonia but has different treatment
          implications <Citation id="8" index={8} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
          Benzodiazepines or ECT should be the initial treatments for catatonia, with
          antipsychotics introduced only after catatonia has resolved and only if
          psychotic symptoms persist.
        </ArticleCallout>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-045 | Childhood-Onset Schizophrenia
  // --------------------------------------------------------------------------
  {
    id: catId(45),
    slug: 'childhood-onset-schizophrenia-rare-severe-early-psychosis',
    status: 'draft',
    title: 'Childhood-Onset Schizophrenia: Rare, Severe, and Early Psychosis',
    description: 'Understanding childhood-onset schizophrenia --- a rare and severe form of psychosis that begins before age 13, how it differs from adult-onset schizophrenia, and the unique challenges it presents.',
    image: '/images/articles/cat16/cover-045.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Childhood Schizophrenia', 'Early-Onset', 'Pediatric', 'Diagnosis'],

    summary: 'Childhood-onset schizophrenia (COS) --- defined as schizophrenia with onset before age 13 --- is extraordinarily rare, affecting approximately 1 in 40,000 children. It represents one of the most severe forms of the illness, characterized by more prominent negative and cognitive symptoms, poorer response to treatment, and worse long-term outcomes than adult-onset schizophrenia. The diagnostic challenge is immense: normal childhood development includes vivid imaginative play that can resemble psychotic thinking, and many childhood psychiatric conditions can mimic psychosis. Yet early diagnosis and treatment are essential because the longer psychosis goes untreated in childhood, the more profound the developmental disruption. This article explores how COS presents, how it\'s distinguished from other childhood conditions, and what evidence-based treatment looks like for children whose developing brains are navigating psychosis.',

    keyFacts: [
      { text: 'Childhood-onset schizophrenia (before age 13) affects approximately 1 in 40,000 children --- 50 times rarer than adult-onset schizophrenia', citationIndex: 1 },
      { text: 'Children with COS show progressive loss of gray matter volume that exceeds normal developmental changes and adult-onset schizophrenia', citationIndex: 2 },
      { text: 'Cognitive deficits in COS are more severe than in adult-onset schizophrenia, particularly affecting working memory and executive function', citationIndex: 3 },
      { text: 'Second-generation antipsychotics are first-line treatment for COS, but response rates are lower and side effects more prominent than in adults', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The child who tells you about imaginary friends isn\'t experiencing psychosis --- that\'s normal development. The child who is terrified of voices commanding them to hurt themselves, who withdraws from all social contact, and whose academic performance collapses might be. The challenge is that the line between rich imagination and psychosis in childhood is blurry --- and missing COS means missing the narrow window when early intervention matters most.',

    practicalExercise: {
      title: 'Recognizing Red Flags in Childhood',
      steps: [
        { title: 'Distinguish imagination from hallucination', description: 'Normal imaginary play: the child knows it\'s pretend and can turn it on/off. Hallucinations: the child is distressed by experiences they can\'t control, describes them as real, and can\'t make them stop. Fear and loss of control are key distinguishing features.' },
        { title: 'Watch for developmental regression', description: 'Loss of previously acquired skills --- language, social abilities, self-care --- is a red flag. COS is often preceded by a period of typical development followed by deterioration. Document specific skills lost and the timeline.' },
        { title: 'Note social withdrawal beyond shyness', description: 'Most children want peer connection even if they\'re introverted. Profound withdrawal --- refusing to play with others, showing no interest in friendships, seeming unable to connect --- particularly when this represents a change from earlier behavior, warrants evaluation.' },
        { title: 'Seek specialist evaluation', description: 'COS diagnosis requires child psychiatrist evaluation, preferably one with specific expertise in early-onset psychosis. General pediatricians may miss it; general child psychiatrists may be unfamiliar with the presentation. Specialty clinics for early-onset psychosis exist at major academic medical centers.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Explore the Symptom Navigator',
    },

    citations: [
      { id: '1', text: 'Childhood-onset schizophrenia: A systematic review of phenomenology and course', source: 'Schizophrenia Research', year: '2019', link: 'https://doi.org/10.1016/j.schres.2019.02.011', tier: 1 },
      { id: '2', text: 'Progressive brain changes in childhood-onset schizophrenia: A longitudinal MRI study', source: 'American Journal of Psychiatry', year: '2019', link: 'https://doi.org/10.1176/appi.ajp.2018.18050551', tier: 1 },
      { id: '3', text: 'Cognitive functioning in childhood-onset schizophrenia: A meta-analysis', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291720001105', tier: 1 },
      { id: '4', text: 'Pharmacological treatment of childhood-onset schizophrenia: Evidence and recommendations', source: 'Journal of the American Academy of Child & Adolescent Psychiatry', year: '2020', link: 'https://doi.org/10.1016/j.jaac.2019.12.002', tier: 1 },
      { id: '5', text: 'NIMH study of childhood-onset schizophrenia: 20-year outcomes', source: 'American Journal of Psychiatry', year: '2018', link: 'https://doi.org/10.1176/appi.ajp.2017.17010035', tier: 1 },
      { id: '6', text: 'Differential diagnosis of psychotic symptoms in children and adolescents: A clinical review', source: 'European Child & Adolescent Psychiatry', year: '2019', link: 'https://doi.org/10.1007/s00787-018-1243-7', tier: 1 },
      { id: '7', text: 'Family burden in childhood-onset schizophrenia: A qualitative study', source: 'Schizophrenia Bulletin', year: '2019', link: 'https://doi.org/10.1093/schbul/sby135', tier: 1 },
      { id: '8', text: 'Understanding schizophrenia', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When schizophrenia strikes a child, it shatters not just current functioning
            but the entire developmental trajectory. A seven-year-old who hears voices
            telling them they're evil. A ten-year-old whose speech becomes increasingly
            disorganized until communication becomes nearly impossible. An eleven-year-old
            who withdraws completely from family and peers, sitting alone for hours in
            catatonic
            silence <Citation id="1" index={1} source="Schizophrenia Research" year="2019" tier={1} />.
            Childhood-onset schizophrenia is mercifully rare --- but for the families who
            encounter it, it represents one of the most devastating psychiatric conditions
            in medicine, disrupting development at its most vulnerable stage.
          </p>
        </div>

        <h2 id="how-it-presents" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How COS Presents Differently From Adult-Onset
        </h2>
        <p className="mb-6">
          Children with COS typically show a gradual onset after a period of relatively
          normal development. Unlike adult-onset schizophrenia, which often has a
          more acute presentation, COS usually involves a prodromal period of months
          to years during which subtle changes in behavior, cognition, and social
          functioning slowly
          accumulate <Citation id="1" index={1} source="Schizophrenia Research" year="2019" tier={1} />.
        </p>

        <ComparisonTable
          headers={['Feature', 'Childhood-Onset', 'Adult-Onset']}
          rows={[
            ['Age of onset', 'Before age 13', 'Typically late teens to mid-20s'],
            ['Prevalence', '~1 in 40,000', '~1 in 200'],
            ['Prodrome', 'Gradual, often years', 'Can be acute or gradual'],
            ['Hallucinations', 'Often visual and auditory', 'Predominantly auditory'],
            ['Negative symptoms', 'More prominent and severe', 'Variable severity'],
            ['Cognitive deficits', 'More severe, progressive', 'Present but less severe'],
            ['Brain changes', 'Progressive gray matter loss', 'Stable after initial changes'],
            ['Treatment response', 'Lower response rates', 'Higher response rates'],
            ['Long-term outcome', 'Generally poorer', 'Variable, often better'],
          ]}
        />

        <h2 id="neurobiological-changes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Progressive Brain Changes
        </h2>
        <p className="mb-6">
          One of the most striking findings in childhood-onset schizophrenia research
          is the progressive loss of gray matter during adolescence --- a process that
          far exceeds normal developmental pruning and adult-onset
          schizophrenia <Citation id="2" index={2} source="American Journal of Psychiatry" year="2019" tier={1} />.
          Longitudinal MRI studies by the NIMH show that children with COS lose gray
          matter in a wave-like pattern that starts in parietal regions and spreads
          to frontal and temporal cortex --- with total gray matter loss approximately
          double what's seen in age-matched healthy controls.
        </p>
        <p className="mb-6">
          These brain changes correlate with functional decline: as gray matter volume
          decreases, cognitive performance worsens, negative symptoms intensify, and
          functional outcomes deteriorate. The progressive nature of these changes
          underscores why early intervention is critical --- the earlier treatment begins,
          the more developmental plasticity remains to potentially modify the trajectory.
        </p>

        <h2 id="diagnostic-challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Diagnostic Challenge: What Else Could It Be?
        </h2>
        <p className="mb-6">
          Diagnosing schizophrenia in children requires ruling out multiple conditions
          that can mimic
          psychosis <Citation id="6" index={6} source="European Child & Adolescent Psychiatry" year="2019" tier={1} />:
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Normal Developmental Phenomena',
              content: 'Imaginary friends, magical thinking, and vivid fantasy play are developmentally normal in early childhood. The distinguishing features of true hallucinations are distress, inability to control the experiences, and functional impairment. A child who happily describes playing with imaginary friends is not psychotic; a child who is terrified of voices they can\'t make stop likely is.',
            },
            {
              title: 'Autism Spectrum Disorder',
              content: 'Social withdrawal, language abnormalities, and restricted interests in autism can superficially resemble negative symptoms of schizophrenia. The key distinctions are that autism has earlier onset (before age 3), involves developmental delay rather than developmental regression, and doesn\'t include true hallucinations or delusions.',
            },
            {
              title: 'Trauma and PTSD',
              content: 'Children who have experienced trauma may have flashbacks, dissociative experiences, and hypervigilance that can be confused with psychosis. Careful trauma history, the episodic nature of flashbacks (vs. continuous hallucinations), and the relationship of symptoms to trauma reminders help distinguish these conditions.',
            },
            {
              title: 'Medical Causes',
              content: 'Autoimmune encephalitis (particularly anti-NMDA receptor encephalitis), brain tumors, metabolic disorders, and seizure disorders can all present with psychotic symptoms in children. Medical workup including MRI, EEG, and laboratory studies is essential before diagnosing primary psychiatric illness.',
            },
          ]}
        />

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment: Evidence and Challenges
        </h2>
        <p className="mb-6">
          Second-generation antipsychotics are first-line pharmacological treatment
          for COS, with the most evidence supporting risperidone, olanzapine, and
          clozapine <Citation id="4" index={4} source="Journal of the American Academy of Child & Adolescent Psychiatry" year="2020" tier={1} />.
          However, response rates in children are lower than in adults (approximately
          30--50% show significant improvement), and side effects --- particularly
          metabolic effects like weight gain and insulin resistance --- are more
          pronounced in the developing child.
        </p>
        <p className="mb-6">
          Clozapine, despite requiring blood monitoring, may be the most effective
          antipsychotic for COS and should be considered earlier in the treatment
          algorithm than in adult schizophrenia. Psychosocial interventions ---
          including family psychoeducation, social skills training, cognitive
          remediation, and educational support --- are essential components of
          comprehensive treatment. The goal is not just symptom reduction but
          supporting continued development and minimizing the educational and
          social disruption that untreated psychosis causes.
        </p>

        <QuoteBlock
          quote="The families of children with COS face extraordinary challenges --- navigating a mental health system unprepared for childhood psychosis, watching their child's peers develop normally while their child regresses, and mourning the future they expected while fighting for the future that remains possible."
          author="Family burden study, Schizophrenia Bulletin, 2019"
        />

        <p className="mt-6 mb-6">
          Long-term outcomes for childhood-onset schizophrenia are generally poorer
          than for adult-onset, with lower rates of remission, higher rates of
          persistent negative symptoms, and greater functional
          impairment <Citation id="5" index={5} source="American Journal of Psychiatry" year="2018" tier={1} />.
          But outcomes are not uniform --- approximately 10--20% achieve good outcomes
          with adequate treatment, education support, and family stability. The
          predictors of better outcomes mirror those in adult schizophrenia: shorter
          duration of untreated psychosis, better premorbid functioning, and strong
          family support.
        </p>
      </>
    ),
  },
];
