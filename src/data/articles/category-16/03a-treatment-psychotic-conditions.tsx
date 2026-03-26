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
// Subcategory 3 --- Treatment for Psychotic Conditions | Articles 21--25
// ============================================================================

export const treatmentPsychoticArticlesA: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-PSY-021 | Antipsychotic Medications Explained
  // --------------------------------------------------------------------------
  {
    id: catId(21),
    slug: 'antipsychotic-medications-explained-how-they-work-what-to-expect',
    title: 'Antipsychotic Medications Explained: How They Work and What to Expect',
    description: 'A comprehensive guide to antipsychotic medications --- how they work in the brain, what the differences between first- and second-generation drugs are, and what to expect during treatment.',
    image: '/images/articles/cat16/cover-021.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 14,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Antipsychotics', 'Medication', 'Treatment', 'Pharmacology'],

    summary: 'Antipsychotic medications are the cornerstone of treatment for schizophrenia and other psychotic conditions. They work primarily by modulating dopamine signaling in the brain --- reducing the overactive dopamine transmission that contributes to hallucinations and delusions. First-generation (typical) antipsychotics, introduced in the 1950s, revolutionized psychiatric care by making it possible to treat psychosis pharmacologically for the first time. Second-generation (atypical) antipsychotics, developed from the 1990s onward, expanded the options with different side effect profiles. Neither generation is universally superior; the right medication depends on the individual. This article breaks down how these medications work, what the evidence says about their effectiveness, and what to expect --- including the side effects that matter most.',

    keyFacts: [
      { text: 'All antipsychotic medications work at least partly by blocking dopamine D2 receptors --- this mechanism has remained the basis of antipsychotic action since chlorpromazine in 1952', citationIndex: 1 },
      { text: 'Response rates to first-line antipsychotics are approximately 60--70%, but approximately one-third of people show minimal improvement', citationIndex: 2 },
      { text: 'Second-generation antipsychotics are associated with higher risk of metabolic side effects (weight gain, diabetes) while first-generation drugs carry higher risk of movement disorders', citationIndex: 3 },
      { text: 'Clozapine remains the most effective antipsychotic for treatment-resistant schizophrenia, yet it is significantly underused worldwide', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The discovery of chlorpromazine in 1952 didn\'t just give psychiatry its first effective antipsychotic --- it fundamentally changed who could leave psychiatric institutions. Within a decade, hospital populations dropped by hundreds of thousands. For all their limitations, antipsychotics made community-based recovery possible for the first time in history.',

    practicalExercise: {
      title: 'Preparing for a Medication Discussion',
      steps: [
        { title: 'Document your experience', description: 'Before your next appointment, write down: current symptoms (what\'s better, what\'s worse), any side effects you\'re experiencing, how the medication affects your daily life, and any questions you have.' },
        { title: 'Identify your priorities', description: 'What matters most to you? Minimizing sedation? Avoiding weight gain? Maintaining cognitive clarity? Knowing your priorities helps your clinician choose among medications that have different side effect profiles.' },
        { title: 'Ask about monitoring', description: 'Request a clear plan for monitoring metabolic effects --- weight, blood sugar, lipids, blood pressure. Regular monitoring catches problems early when they\'re most treatable.' },
        { title: 'Understand the timeline', description: 'Ask how long it typically takes to see a response, what the plan is if this medication doesn\'t work, and what tapering or switching would look like. Having a roadmap reduces anxiety about the process.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Medication Effects',
    },

    citations: [
      { id: '1', text: 'The dopamine hypothesis of schizophrenia: Version III --- The final common pathway', source: 'Schizophrenia Bulletin', year: '2009', link: 'https://doi.org/10.1093/schbul/sbp006', tier: 1 },
      { id: '2', text: 'Comparative efficacy and tolerability of 32 oral antipsychotics for the acute treatment of adults with multi-episode schizophrenia: A systematic review and network meta-analysis', source: 'The Lancet', year: '2019', link: 'https://doi.org/10.1016/S0140-6736(19)31135-3', tier: 1 },
      { id: '3', text: 'Metabolic effects of antipsychotic medications: A systematic review and meta-analysis', source: 'World Psychiatry', year: '2020', link: 'https://doi.org/10.1002/wps.20714', tier: 1 },
      { id: '4', text: 'Clozapine for treatment-resistant schizophrenia: A systematic review and meta-analysis', source: 'Schizophrenia Bulletin', year: '2021', link: 'https://doi.org/10.1093/schbul/sbaa161', tier: 1 },
      { id: '5', text: 'Long-acting injectable antipsychotics: A systematic review and meta-analysis of randomized controlled trials', source: 'Schizophrenia Research', year: '2020', link: 'https://doi.org/10.1016/j.schres.2020.01.005', tier: 1 },
      { id: '6', text: 'Understanding schizophrenia', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
      { id: '7', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '8', text: 'Side effects of antipsychotic medications: Physician\'s guide to clinical assessment and management', source: 'Journal of Clinical Psychiatry', year: '2019', link: 'https://doi.org/10.4088/JCP.18ac12635', tier: 1 },
      { id: '9', text: 'The evolution of antipsychotic drugs', source: 'Annual Review of Neuroscience', year: '2017', link: 'https://doi.org/10.1146/annurev-neuro-072116-031527', tier: 1 },
      { id: '10', text: 'Shared decision making in psychiatry: A systematic review', source: 'Psychiatric Services', year: '2020', link: 'https://doi.org/10.1176/appi.ps.201900401', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            In 1952, a French surgeon named Henri Laborit noticed that a new antihistamine called
            chlorpromazine produced a remarkable calm in his surgical patients --- a state he described
            as "artificial hibernation." When psychiatrists tried the drug on patients with acute
            psychosis, the results were transformative. For the first time in medical history,
            hallucinations and delusions could be pharmacologically
            controlled <Citation id="9" index={9} source="Annual Review of Neuroscience" year="2017" tier={1} />.
            More than 70 years later, antipsychotic medications remain the foundation of
            treatment for schizophrenia and other psychotic conditions. They're neither miracle
            drugs nor the villains of anti-psychiatry narratives --- they're complex tools with
            real benefits and real costs that deserve clear-eyed understanding.
          </p>
        </div>

        <h2 id="how-they-work" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Antipsychotics Work in the Brain
        </h2>
        <p className="mb-6">
          All antipsychotic medications share a common mechanism: they block dopamine D2 receptors
          in the
          brain <Citation id="1" index={1} source="Schizophrenia Bulletin" year="2009" tier={1} />.
          In the mesolimbic pathway --- the circuit connecting the midbrain to the limbic system ---
          excessive dopamine signaling is associated with positive psychotic symptoms (hallucinations,
          delusions, disorganized thinking). By blocking D2 receptors in this pathway, antipsychotics
          reduce the "signal noise" that underlies these experiences.
        </p>
        <p className="mb-6">
          The challenge is selectivity. Dopamine operates in multiple brain pathways simultaneously,
          and blocking D2 receptors broadly produces unintended effects: in the nigrostriatal
          pathway, it causes movement problems; in the tuberoinfundibular pathway, it elevates
          prolactin; in the mesocortical pathway, it may worsen cognitive and negative symptoms.
          Much of the history of antipsychotic development has been the pursuit of greater
          selectivity --- targeting the pathways that need modulation while sparing those that don't.
        </p>

        <ArticleCallout type="info" title="D2 Receptor Occupancy: The Sweet Spot">
          Brain imaging studies show that antipsychotic effectiveness requires approximately
          65--80% occupancy of D2 receptors. Below 65%, psychotic symptoms persist. Above 80%,
          movement side effects (extrapyramidal symptoms) increase sharply without additional
          therapeutic benefit. This "therapeutic window" explains why dosing matters so much ---
          more isn't always
          better <Citation id="6" index={6} source="National Institute of Mental Health" year="2024" tier={2} />.
        </ArticleCallout>

        <h2 id="generations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          First Generation vs. Second Generation: What's Actually Different
        </h2>
        <p className="mb-6">
          The terms "first generation" (typical) and "second generation" (atypical) suggest a
          clear progression, but the reality is more nuanced than the marketing
          implied <Citation id="2" index={2} source="The Lancet" year="2019" tier={1} />.
          First-generation antipsychotics (FGAs) like haloperidol and chlorpromazine are potent
          D2 blockers with well-established efficacy. Second-generation antipsychotics (SGAs)
          like risperidone, olanzapine, and quetiapine also block D2 receptors but additionally
          block serotonin 5-HT2A receptors and, in some cases, have weaker D2 binding.
        </p>

        <ComparisonTable
          headers={['Feature', 'First-Generation (Typical)', 'Second-Generation (Atypical)']}
          rows={[
            ['Mechanism', 'Strong D2 blockade', 'D2 + serotonin 5-HT2A blockade; variable profiles'],
            ['Efficacy for positive symptoms', 'Well-established', 'Comparable (with exceptions)'],
            ['Movement side effects (EPS)', 'Higher risk', 'Lower risk (varies by drug)'],
            ['Metabolic side effects', 'Lower risk', 'Higher risk (especially olanzapine, clozapine)'],
            ['Prolactin elevation', 'Common', 'Varies (risperidone high; aripiprazole low)'],
            ['Cost', 'Generally lower (generics)', 'Often higher'],
            ['Notable examples', 'Haloperidol, chlorpromazine, fluphenazine', 'Risperidone, olanzapine, quetiapine, aripiprazole'],
          ]}
        />

        <p className="mt-6 mb-6">
          A landmark 2019 meta-analysis in The Lancet compared 32 oral antipsychotics and found
          that the most effective medications spanned both generations. Clozapine (second-generation)
          ranked highest for efficacy, but amisulpride (technically first-generation by some
          classifications) was also near the
          top <Citation id="2" index={2} source="The Lancet" year="2019" tier={1} />.
          The practical takeaway: the generation label matters less than the individual drug's
          profile and how it matches a specific person's needs and tolerability.
        </p>

        <h2 id="side-effects" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Side Effects: The Full Picture
        </h2>
        <p className="mb-6">
          Side effects are the primary reason people discontinue antipsychotic medication --- and
          understandable so. The most significant side effect categories
          include <Citation id="8" index={8} source="Journal of Clinical Psychiatry" year="2019" tier={1} />:
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Metabolic Effects',
              content: 'Weight gain, elevated blood sugar, and abnormal lipid levels are the most concerning long-term side effects, particularly with olanzapine and clozapine. A meta-analysis found that some SGAs produce average weight gains of 4--7 kg within the first year. Regular metabolic monitoring --- weight, fasting glucose, and lipid panels --- is essential and recommended by all major guidelines but often inconsistently implemented.',
            },
            {
              title: 'Movement Disorders (Extrapyramidal Symptoms)',
              content: 'More common with FGAs, these include acute dystonia (involuntary muscle contractions), akathisia (intense restlessness), parkinsonism (tremor, rigidity, slowness), and tardive dyskinesia (involuntary facial and body movements that can be permanent). The risk of tardive dyskinesia increases with duration of treatment and cumulative dose.',
            },
            {
              title: 'Sedation and Cognitive Dulling',
              content: 'Many antipsychotics cause significant drowsiness, particularly in the early weeks. Some people describe a sense of cognitive "fogginess" or emotional blunting. These effects vary widely between drugs --- quetiapine and olanzapine are more sedating, while aripiprazole and lurasidone tend to be less so.',
            },
            {
              title: 'Cardiovascular Effects',
              content: 'QTc prolongation (changes to heart rhythm), orthostatic hypotension (dizziness on standing), and tachycardia can occur. Baseline and periodic ECG monitoring is recommended for some medications. Clozapine carries a rare but serious risk of myocarditis, particularly in the first month of treatment.',
            },
          ]}
        />

        <h2 id="treatment-decisions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Making Treatment Decisions: Shared Decision-Making
        </h2>
        <p className="mb-6">
          The best antipsychotic medication is the one a person will actually take consistently ---
          and that calculus involves far more than efficacy data. It involves weighing side effect
          profiles against individual priorities, considering formulation options (oral daily,
          oral dissolving, long-acting
          injectable <Citation id="5" index={5} source="Schizophrenia Research" year="2020" tier={1} />),
          accounting for comorbid conditions, and respecting the person's own values and preferences.
        </p>
        <p className="mb-6">
          Shared decision-making --- a collaborative process where clinicians share evidence and
          patients share preferences --- is associated with better treatment satisfaction, improved
          adherence, and stronger therapeutic
          alliance <Citation id="10" index={10} source="Psychiatric Services" year="2020" tier={1} />.
          NICE guidelines explicitly recommend that antipsychotic choice should be made jointly
          between the prescriber and the person, with full discussion of benefits and
          risks <Citation id="7" index={7} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
        </p>
        <p className="mb-6">
          When a first-line antipsychotic doesn't produce adequate response --- which occurs in
          approximately one-third of
          cases <Citation id="2" index={2} source="The Lancet" year="2019" tier={1} /> ---
          switching to a different medication is the standard next step. If two adequate trials fail,
          clozapine should be offered. Despite being the most effective option for treatment-resistant
          schizophrenia, clozapine is often delayed for years due to its monitoring requirements
          and clinician
          reluctance <Citation id="4" index={4} source="Schizophrenia Bulletin" year="2021" tier={1} />.
          This delay represents a significant gap between evidence and practice.
        </p>

        <StatCard
          stats={[
            { value: 60, suffix: '--70%', label: 'Response to first-line antipsychotics' },
            { value: 30, suffix: '%', label: 'Respond inadequately to two trials' },
            { value: 50, suffix: '--60%', label: 'Treatment-resistant respond to clozapine' },
          ]}
          source="The Lancet, 2019; Schizophrenia Bulletin, 2021"
        />
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-022 | Cognitive Behavioral Therapy for Psychosis
  // --------------------------------------------------------------------------
  {
    id: catId(22),
    slug: 'cbt-for-psychosis-how-talking-therapy-helps-manage-voices-and-beliefs',
    title: 'CBT for Psychosis: How Talking Therapy Helps Manage Voices and Beliefs',
    description: 'How cognitive behavioral therapy has been adapted for psychosis --- what it involves, how it differs from standard CBT, and what the evidence says about its effectiveness.',
    image: '/images/articles/cat16/cover-022.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['CBT for Psychosis', 'Therapy', 'Treatment', 'Evidence-Based'],

    summary: 'Cognitive behavioral therapy for psychosis (CBTp) adapts the principles of standard CBT --- examining the relationship between thoughts, feelings, and behaviors --- for people experiencing hallucinations, delusions, and other psychotic symptoms. Unlike the common misconception that you can\'t do therapy with someone who is "out of touch with reality," CBTp works precisely because it doesn\'t require the person to abandon their beliefs. Instead, it helps them examine how those beliefs affect them emotionally, develop coping strategies for distressing experiences, and gradually test out alternative interpretations at their own pace. Recommended by major treatment guidelines worldwide, CBTp has accumulated robust evidence as an adjunct to medication, and emerging data supports its use even when medication is declined or ineffective.',

    keyFacts: [
      { text: 'CBTp is recommended as a first-line treatment alongside medication by NICE, APA, and WHO guidelines for schizophrenia and related psychotic disorders', citationIndex: 1 },
      { text: 'Meta-analyses show CBTp produces small to moderate improvements in positive symptoms, distress, and functioning --- with effect sizes of 0.33--0.44', citationIndex: 2 },
      { text: 'CBTp does not require the person to agree that their experiences are symptoms of illness --- it works with the person\'s own framework', citationIndex: 3 },
      { text: 'Access to CBTp remains limited: despite guideline recommendations, fewer than 10% of people with psychosis in England receive it', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'Standard CBT asks you to challenge irrational thoughts. CBTp asks a much more radical question: even if the voices are real, even if the beliefs are true --- how are they affecting your life, and what would you like to be different? Starting with the person\'s own experience rather than the clinician\'s framework is what makes it work.',

    practicalExercise: {
      title: 'A Simple CBTp-Informed Coping Strategy',
      steps: [
        { title: 'Notice the experience', description: 'When you notice a distressing thought or voice, pause and describe it to yourself: "I\'m hearing a critical voice right now" or "I\'m having the thought that people are watching me." Naming the experience creates a small space between you and it.' },
        { title: 'Rate the distress', description: 'On a 0--10 scale, how distressing is this experience right now? Not how true or real it feels, but how much distress it\'s causing. This separates the experience from its emotional impact.' },
        { title: 'Use a coping response', description: 'Choose one response from your toolkit: put in earbuds and listen to music, call someone you trust, focus intently on a physical sensation (cold water, textured object), or change your environment (go outside, move rooms).' },
        { title: 'Re-rate after 15 minutes', description: 'Rate the distress again. Over time, you\'ll build evidence about which coping strategies work best for you --- and the pattern itself becomes therapeutic information you can share with your treatment team.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Distress Patterns',
    },

    citations: [
      { id: '1', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '2', text: 'Cognitive behavioural therapy for psychosis: A systematic review and meta-analysis', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291720000100', tier: 1 },
      { id: '3', text: 'CBT for psychosis: A clinical handbook', source: 'Oxford University Press', year: '2019', link: 'https://global.oup.com/academic/product/cbt-for-psychosis-9780198703402', tier: 5 },
      { id: '4', text: 'Access to evidence-based care for psychosis in England: A survey of community mental health teams', source: 'The Lancet Psychiatry', year: '2021', link: 'https://doi.org/10.1016/S2215-0366(21)00182-3', tier: 1 },
      { id: '5', text: 'CBTp for people who refuse antipsychotic medication: A randomized controlled trial', source: 'The Lancet', year: '2014', link: 'https://doi.org/10.1016/S0140-6736(13)62246-1', tier: 1 },
      { id: '6', text: 'Relating therapy for psychosis: A pilot randomized controlled trial', source: 'Schizophrenia Research', year: '2020', link: 'https://doi.org/10.1016/j.schres.2019.11.028', tier: 1 },
      { id: '7', text: 'The normalizing approach in cognitive therapy for psychosis', source: 'Clinical Psychology Review', year: '2018', link: 'https://doi.org/10.1016/j.cpr.2018.01.002', tier: 1 },
      { id: '8', text: 'Self-help interventions for psychosis: A systematic review and meta-analysis', source: 'Schizophrenia Bulletin', year: '2021', link: 'https://doi.org/10.1093/schbul/sbab064', tier: 1 },
      { id: '9', text: 'Therapeutic alliance in CBT for psychosis: A systematic review', source: 'Psychological Medicine', year: '2019', link: 'https://doi.org/10.1017/S0033291719001314', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            For decades, conventional wisdom held that talking therapy was pointless for people
            experiencing psychosis. How could you reason with someone who hears voices that
            aren't there? How could you challenge beliefs held with delusional intensity? The
            development of CBT for psychosis (CBTp) answered these questions not by arguing
            people out of their experiences, but by working with those experiences in a
            fundamentally different
            way <Citation id="3" index={3} source="Oxford University Press" year="2019" tier={5} />.
            The result is one of the most evidence-supported psychological treatments in
            psychiatry --- and one of the most underdelivered.
          </p>
        </div>

        <h2 id="how-cbtp-differs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How CBTp Differs From Standard CBT
        </h2>
        <p className="mb-6">
          Standard CBT for depression or anxiety typically asks the person to identify "distorted"
          thoughts and replace them with more realistic ones. CBTp takes a fundamentally different
          starting
          point <Citation id="7" index={7} source="Clinical Psychology Review" year="2018" tier={1} />.
          It doesn't require the person to agree that their voices aren't real or that their beliefs
          are false. Instead, it starts with the person's own experience and explores how that
          experience affects them.
        </p>

        <BeforeAfter
          before={{
            title: 'Standard CBT Approach',
            items: [
              'Identify the distorted thought',
              'Examine evidence for and against',
              'Replace with a balanced thought',
              'Goal: change the belief',
            ],
          }}
          after={{
            title: 'CBTp Approach',
            items: [
              'Understand the person\'s experience on their terms',
              'Explore how the experience causes distress',
              'Develop coping strategies for distress',
              'Goal: reduce suffering, increase functioning',
            ],
          }}
        />

        <p className="mt-6 mb-6">
          A person hearing commanding voices, for example, might work with a CBTp therapist not
          to eliminate the voices but to examine their power: "The voice tells me to hurt myself ---
          but I've never done it. What does that say about who's actually in control?" This
          approach --- often called the "normalizing" approach --- reduces the catastrophic
          interpretation of psychotic experiences while respecting the person's subjective reality.
        </p>

        <h2 id="what-sessions-look-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What CBTp Sessions Actually Look Like
        </h2>
        <p className="mb-6">
          A typical course of CBTp involves 16--20 sessions delivered over several months, though
          flexible delivery is increasingly
          recognized <Citation id="1" index={1} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
          The therapeutic alliance is paramount --- research shows it predicts outcomes more
          strongly in CBTp than in standard
          CBT <Citation id="9" index={9} source="Psychological Medicine" year="2019" tier={1} />.
          Building trust with someone who may be suspicious of others is a skill that requires
          patience, consistency, and genuine curiosity.
        </p>

        <ProgressSteps
          steps={[
            { title: 'Engagement and Assessment', description: 'Building trust and understanding the person\'s unique experience. The therapist asks about voices, beliefs, and distressing experiences without challenging their validity. This phase may take several sessions.' },
            { title: 'Shared Formulation', description: 'Together, therapist and client develop a map of how experiences, thoughts, emotions, and behaviors connect. For example: "When I hear the critical voice → I feel ashamed → I stay in bed → I feel more isolated → the voice gets louder."' },
            { title: 'Coping Strategy Development', description: 'Building a personalized toolkit: attention-switching techniques for voices, behavioral experiments for testing beliefs, graded exposure for avoided situations, mindfulness for managing distress.' },
            { title: 'Gentle Belief Exploration', description: 'Only when the person is ready: examining beliefs not as "right" or "wrong" but as one possible explanation among several. "What if there were another way to understand this experience?"' },
            { title: 'Relapse Prevention', description: 'Identifying early warning signs, creating an action plan for future crises, and consolidating gains into a written blueprint the person keeps.' },
          ]}
        />

        <h2 id="evidence-base" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Evidence: What CBTp Can and Can't Do
        </h2>
        <p className="mb-6">
          Meta-analyses of randomized controlled trials show that CBTp produces consistent
          improvements in positive symptoms (hallucinations and delusions), overall symptom
          severity, and
          functioning <Citation id="2" index={2} source="Psychological Medicine" year="2020" tier={1} />.
          Effect sizes (0.33--0.44) are considered small to moderate --- comparable to the
          difference between most antipsychotics and each other. The gains tend to persist
          for months after treatment ends, suggesting durable learning rather than temporary
          relief.
        </p>
        <p className="mb-6">
          Perhaps the most provocative evidence comes from a landmark trial showing that CBTp
          can be effective even for people who choose not to take antipsychotic
          medication <Citation id="5" index={5} source="The Lancet" year="2014" tier={1} />.
          This doesn't mean CBTp should replace medication --- for most people, combination
          treatment is optimal. But it establishes that psychological intervention has
          independent value, which is crucial for the significant minority who decline or
          cannot tolerate medication.
        </p>

        <ArticleCallout type="warning" title="The Access Gap">
          Despite being recommended by every major treatment guideline, CBTp remains
          dramatically underdelivered. In England, fewer than 10% of people with psychosis
          receive
          it <Citation id="4" index={4} source="The Lancet Psychiatry" year="2021" tier={1} />.
          The reasons are systemic: insufficient numbers of trained therapists, competing
          clinical priorities, and healthcare systems designed around medication rather than
          psychological intervention. Self-help approaches and digital delivery are being
          explored to bridge this
          gap <Citation id="8" index={8} source="Schizophrenia Bulletin" year="2021" tier={1} />.
        </ArticleCallout>

        <h2 id="newer-approaches" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Beyond Traditional CBTp: Newer Approaches
        </h2>
        <p className="mb-6">
          The principles of CBTp are evolving. Relating Therapy focuses specifically on the
          relationships people have with their voices --- transforming a dominant, persecutory
          relationship into a more balanced
          one <Citation id="6" index={6} source="Schizophrenia Research" year="2020" tier={1} />.
          Compassion-focused therapy addresses the intense shame and self-criticism that often
          accompany psychotic experiences. Acceptance and Commitment Therapy (ACT) for
          psychosis shifts the goal from changing experiences to changing one's relationship
          with them --- defusing from distressing thoughts rather than challenging them.
        </p>
        <p className="mb-6">
          Digital and self-help interventions are also emerging, including computerized CBTp
          programs, smartphone apps for voice management, and guided self-help manuals. While
          these can't replace skilled therapy, they can extend access to people who would
          otherwise receive no psychological
          support <Citation id="8" index={8} source="Schizophrenia Bulletin" year="2021" tier={1} />.
          The common thread across all these developments is a fundamental respect for the
          person's experience and an understanding that recovery means reducing suffering ---
          not necessarily eliminating all unusual experiences.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-023 | Clozapine: The Gold Standard for Treatment-Resistant Schizophrenia
  // --------------------------------------------------------------------------
  {
    id: catId(23),
    slug: 'clozapine-gold-standard-treatment-resistant-schizophrenia',
    title: 'Clozapine: The Gold Standard for Treatment-Resistant Schizophrenia',
    description: 'Why clozapine remains the most effective antipsychotic for treatment-resistant schizophrenia --- its unique pharmacology, required monitoring, and the controversy over its persistent underuse.',
    image: '/images/articles/cat16/cover-023.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Clozapine', 'Treatment-Resistant', 'Pharmacology', 'Schizophrenia'],

    summary: 'Clozapine occupies a singular position in psychiatry: it is the only antipsychotic with proven superiority for treatment-resistant schizophrenia, the only one that reduces suicide risk, and the only one that requires mandatory blood monitoring. Introduced in the 1970s, withdrawn after causing fatal agranulocytosis, and reintroduced in 1990 with a monitoring protocol, clozapine remains the most effective pharmacological intervention available when other antipsychotics fail. Yet it is dramatically underused --- delays of years between qualifying for clozapine and actually receiving it are common. This article examines what makes clozapine uniquely effective, what the monitoring requirements involve, and why closing the "clozapine gap" is a matter of equity and urgency.',

    keyFacts: [
      { text: 'Clozapine is effective in approximately 50--60% of people who fail to respond to two other antipsychotics --- no other medication matches this response rate', citationIndex: 1 },
      { text: 'Clozapine is the only antipsychotic proven to reduce suicide risk, with a 26% reduction compared to olanzapine in the InterSePT trial', citationIndex: 2 },
      { text: 'Agranulocytosis (dangerous drop in white blood cells) occurs in approximately 0.8% of patients, requiring regular blood monitoring', citationIndex: 3 },
      { text: 'The average delay between meeting criteria for clozapine and actually receiving it is 4--5 years in many healthcare systems', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'Clozapine is the only psychiatric medication so effective that withholding it is increasingly considered an ethical issue. When someone has spent years on medications that don\'t work, the delay in offering the one drug that might --- because of administrative burden, clinician reluctance, or systemic inertia --- represents a failure not of pharmacology but of healthcare delivery.',

    practicalExercise: {
      title: 'Evaluating Whether Clozapine Should Be Discussed',
      steps: [
        { title: 'Review treatment history', description: 'Has the person tried two different antipsychotics at adequate doses for adequate duration (typically 6+ weeks each)? If both produced inadequate response, this meets the standard definition of treatment resistance.' },
        { title: 'Ask the treatment team', description: 'If treatment resistance criteria are met, ask the prescribing clinician: "Has clozapine been considered?" If not, ask what the barriers are and whether a referral to a clozapine clinic is possible.' },
        { title: 'Understand the monitoring', description: 'Clozapine requires regular blood tests (weekly for 18 weeks, then biweekly for a year, then monthly). This is non-negotiable but manageable --- many clinics offer point-of-care testing with results in minutes.' },
        { title: 'Weigh benefits against burden', description: 'The monitoring and side effects are real burdens. But for someone who hasn\'t responded to other treatments, the alternative --- ongoing psychosis with its own massive burden --- needs to be part of the equation.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Explore the Symptom Navigator',
    },

    citations: [
      { id: '1', text: 'Clozapine for treatment-resistant schizophrenia: A systematic review and meta-analysis', source: 'Schizophrenia Bulletin', year: '2021', link: 'https://doi.org/10.1093/schbul/sbaa161', tier: 1 },
      { id: '2', text: 'Clozapine treatment for suicidality in schizophrenia: International Suicide Prevention Trial (InterSePT)', source: 'Archives of General Psychiatry', year: '2003', link: 'https://doi.org/10.1001/archpsyc.60.1.82', tier: 1 },
      { id: '3', text: 'Clozapine-associated agranulocytosis: A systematic review of incidence, risk factors, and monitoring', source: 'CNS Drugs', year: '2020', link: 'https://doi.org/10.1007/s40263-020-00726-0', tier: 1 },
      { id: '4', text: 'Delays in the initiation of clozapine: A systematic review', source: 'Schizophrenia Research', year: '2020', link: 'https://doi.org/10.1016/j.schres.2020.04.007', tier: 1 },
      { id: '5', text: 'Clozapine: Pharmacology, clinical use, and side effects', source: 'The Lancet Psychiatry', year: '2021', link: 'https://doi.org/10.1016/S2215-0366(21)00043-8', tier: 1 },
      { id: '6', text: 'Metabolic monitoring of patients on clozapine: Systematic review and meta-analysis', source: 'Journal of Clinical Psychiatry', year: '2019', link: 'https://doi.org/10.4088/JCP.18r12591', tier: 1 },
      { id: '7', text: 'Clozapine and benign ethnic neutropenia: Updated guidance', source: 'British Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1192/bjp.2020.184', tier: 1 },
      { id: '8', text: 'Understanding schizophrenia', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
      { id: '9', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            In the landscape of psychiatric pharmacology, clozapine stands alone. It's the only
            antipsychotic with demonstrated superiority for treatment-resistant schizophrenia.
            The only one proven to reduce suicide risk. The only one that requires mandatory
            blood monitoring. And paradoxically, the only one that is systematically underused
            despite overwhelming
            evidence <Citation id="1" index={1} source="Schizophrenia Bulletin" year="2021" tier={1} />.
            Understanding clozapine --- its remarkable efficacy, its real risks, and the barriers
            that prevent people from accessing it --- is essential for anyone involved in the
            care of someone with persistent psychosis.
          </p>
        </div>

        <h2 id="unique-pharmacology" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Makes Clozapine Different
        </h2>
        <p className="mb-6">
          Clozapine's pharmacological profile is unlike any other antipsychotic. While all
          antipsychotics block dopamine D2 receptors, clozapine does so with relatively low
          affinity --- it binds loosely and detaches quickly. Instead, it exerts its effects
          through a remarkably broad receptor profile: serotonin 5-HT2A, histamine H1,
          muscarinic, and alpha-adrenergic
          receptors <Citation id="5" index={5} source="The Lancet Psychiatry" year="2021" tier={1} />.
          No one fully understands why this combination produces superior antipsychotic
          effects, but the clinical evidence is unambiguous.
        </p>
        <p className="mb-6">
          The loose D2 binding is clinically significant: it explains why clozapine causes
          far fewer movement side effects (extrapyramidal symptoms) than other antipsychotics.
          For people who have developed tardive dyskinesia on previous medications, clozapine
          can actually reduce these movements --- making it therapeutic for a side effect that
          other antipsychotics cause.
        </p>

        <StatCard
          stats={[
            { value: 50, suffix: '--60%', label: 'Response rate in treatment-resistant cases' },
            { value: 26, suffix: '%', label: 'Reduction in suicide risk (InterSePT)' },
            { value: 0.8, suffix: '%', label: 'Agranulocytosis risk' },
          ]}
          source="Schizophrenia Bulletin, 2021; Archives of General Psychiatry, 2003"
        />

        <h2 id="the-evidence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Evidence for Superiority
        </h2>
        <p className="mb-6">
          Treatment-resistant schizophrenia --- defined as persistent psychotic symptoms despite
          adequate trials of at least two different antipsychotics --- affects approximately
          one-third of people with the condition. For these individuals, switching between
          non-clozapine antipsychotics produces diminishing returns: each subsequent trial
          is less likely to work than the
          last <Citation id="1" index={1} source="Schizophrenia Bulletin" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          Clozapine breaks this pattern. Meta-analyses consistently show response rates of
          50--60% in treatment-resistant populations --- a figure no other single agent approaches.
          Beyond psychosis reduction, clozapine uniquely reduces aggression, substance use,
          and --- most importantly --- suicidality. The InterSePT trial, the largest suicide
          prevention study in schizophrenia, found a 26% reduction in suicidal behavior
          compared to
          olanzapine <Citation id="2" index={2} source="Archives of General Psychiatry" year="2003" tier={1} />.
          This finding led the FDA to approve clozapine's anti-suicidal indication --- a claim
          no other antipsychotic carries.
        </p>

        <ArticleCallout type="insight" title="Beyond Positive Symptoms">
          Clozapine's benefits extend beyond hallucination and delusion reduction. People on
          clozapine frequently report improvements in cognition, social engagement, and quality
          of life that exceed what symptom scores alone would predict. Some researchers
          hypothesize this reflects clozapine's effects on glutamate signaling and its
          anti-inflammatory properties --- mechanisms that may address the underlying
          neurobiology rather than just masking
          symptoms <Citation id="5" index={5} source="The Lancet Psychiatry" year="2021" tier={1} />.
        </ArticleCallout>

        <h2 id="monitoring-requirements" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Monitoring Protocol: What's Required and Why
        </h2>
        <p className="mb-6">
          Clozapine was withdrawn from the market in 1975 after causing fatal agranulocytosis ---
          a dangerous drop in white blood cells that compromises the immune system --- in several
          patients in Finland. It was reintroduced in 1990 with a mandatory blood monitoring
          protocol that has made fatal agranulocytosis exceedingly
          rare <Citation id="3" index={3} source="CNS Drugs" year="2020" tier={1} />.
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Blood Monitoring Schedule',
              content: 'Weekly complete blood counts (CBC) for the first 18 weeks, then biweekly for the remainder of the first year, then monthly for the duration of treatment. Results must be registered in a national monitoring system before pharmacies can dispense the next supply. If neutrophil counts drop below specified thresholds, clozapine must be stopped.',
            },
            {
              label: 'Metabolic Monitoring',
              content: 'Weight, waist circumference, fasting glucose, HbA1c, and lipid panels should be checked at baseline, 1 month, 3 months, and then annually. Clozapine carries the highest metabolic risk of any antipsychotic --- weight gains of 5--10 kg in the first year are common. Proactive metabolic management is essential.',
            },
            {
              label: 'Cardiac Monitoring',
              content: 'ECG at baseline and periodically during treatment. Clozapine carries a small risk of myocarditis (inflammation of heart muscle), primarily in the first month of treatment. Troponin and CRP levels should be monitored in the early weeks, and any unexplained fever, chest pain, or tachycardia requires immediate investigation.',
            },
          ]}
        />

        <h2 id="the-clozapine-gap" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Clozapine Gap: Why It's Underused
        </h2>
        <p className="mb-6">
          Despite decades of evidence establishing clozapine's superiority, it remains
          dramatically
          underused <Citation id="4" index={4} source="Schizophrenia Research" year="2020" tier={1} />.
          The average delay between meeting treatment-resistance criteria and receiving clozapine
          is 4--5 years. In some systems, fewer than 5% of eligible patients are prescribed it.
          The barriers are multiple: the monitoring burden deters both clinicians and patients;
          many prescribers have never initiated clozapine and lack confidence; organizational
          infrastructure for monitoring is inadequate; and the metabolic side effects require
          active management that stretched healthcare systems struggle to provide.
        </p>
        <p className="mb-6">
          An additional equity concern involves benign ethnic neutropenia (BEN) --- a variant
          in which people of African, Middle Eastern, and some other ancestries naturally
          have lower baseline neutrophil counts. Under standard monitoring protocols, these
          individuals could be inappropriately flagged or denied clozapine. Updated guidelines
          now include adjusted thresholds for people with
          BEN <Citation id="7" index={7} source="British Journal of Psychiatry" year="2020" tier={1} />,
          but awareness of this adjustment remains inconsistent.
        </p>
        <p className="mb-6">
          Closing the clozapine gap is not just a pharmacological question --- it's an ethical
          one. When someone has spent years on medications that don't adequately control their
          symptoms, every year of delay in offering the one drug most likely to help represents
          lost functioning, unnecessary suffering, and increased
          risk <Citation id="9" index={9} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
          Advocacy from patients, families, and professional organizations is driving change,
          but progress remains slow.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-024 | Family Psychoeducation
  // --------------------------------------------------------------------------
  {
    id: catId(24),
    slug: 'family-psychoeducation-how-families-can-support-recovery-from-psychosis',
    title: 'Family Psychoeducation: How Families Can Support Recovery From Psychosis',
    description: 'The evidence behind family psychoeducation for psychosis --- how structured family intervention reduces relapse, improves outcomes, and transforms family relationships.',
    image: '/images/articles/cat16/cover-024.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Family Intervention', 'Psychoeducation', 'Relapse Prevention', 'Treatment'],

    summary: 'Family psychoeducation is one of the most robustly supported interventions in psychosis treatment --- yet it remains among the least implemented. The approach is straightforward: provide families with accurate information about psychotic conditions, teach communication and problem-solving skills, and create a structured framework for supporting recovery while protecting family wellbeing. The evidence is compelling: family psychoeducation reduces relapse rates by approximately 50%, improves medication adherence, decreases hospitalization, and enhances quality of life for both the person with psychosis and their family members. This article explores what family psychoeducation involves, why it works so powerfully, and how families can access or create their own version of this intervention.',

    keyFacts: [
      { text: 'Family psychoeducation reduces relapse rates by approximately 50% compared to standard treatment --- one of the largest effect sizes in psychosis intervention research', citationIndex: 1 },
      { text: 'High "expressed emotion" (criticism, hostility, over-involvement) in families is associated with a 2--3× increase in relapse risk', citationIndex: 2 },
      { text: 'Families who participate in psychoeducation report reduced burden, improved coping, and better family relationship quality', citationIndex: 3 },
      { text: 'Despite guideline recommendations, fewer than 15% of families of people with psychosis receive any form of structured family intervention', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The single strongest predictor of relapse in schizophrenia isn\'t medication adherence or symptom severity --- it\'s the emotional temperature of the home. Families who criticize less, worry less intrusively, and maintain warmth without smothering produce dramatically better outcomes. And the remarkable thing is: these family patterns can be learned.',

    practicalExercise: {
      title: 'Lowering Expressed Emotion: A Family Exercise',
      steps: [
        { title: 'Notice critical comments', description: 'For one week, try to notice when you make critical comments about your family member\'s behavior --- out loud or in your head. Don\'t try to stop them yet; just notice. Write a tally at the end of each day. Awareness is the first step.' },
        { title: 'Replace criticism with observation', description: 'When you catch yourself about to criticize ("You\'re so lazy"), try replacing it with a neutral observation ("I noticed you stayed in bed today"). Observations invite conversation; criticism invites defensiveness.' },
        { title: 'Express your own feelings', description: 'Instead of "You never do anything," try "I feel worried when I see you spending so much time alone." Using "I" statements shifts from blame to connection and models emotional expression.' },
        { title: 'Plan one positive interaction daily', description: 'Choose one brief, low-pressure positive interaction each day --- watching a show together, sharing a meal, a short walk. Rebuilding positive experiences counterbalances the weight of the condition.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Family Interactions',
    },

    citations: [
      { id: '1', text: 'Family intervention for schizophrenia: A Cochrane systematic review', source: 'Cochrane Database of Systematic Reviews', year: '2020', link: 'https://doi.org/10.1002/14651858.CD000088.pub4', tier: 1 },
      { id: '2', text: 'Expressed emotion and relapse in psychosis: A meta-analysis spanning 35 years', source: 'Psychological Medicine', year: '2019', link: 'https://doi.org/10.1017/S0033291719001065', tier: 1 },
      { id: '3', text: 'Impact of family psychoeducation on caregiver burden: A systematic review and meta-analysis', source: 'World Psychiatry', year: '2021', link: 'https://doi.org/10.1002/wps.20878', tier: 1 },
      { id: '4', text: 'Implementation of family intervention for psychosis: A systematic review of barriers and facilitators', source: 'The Lancet Psychiatry', year: '2020', link: 'https://doi.org/10.1016/S2215-0366(20)30120-6', tier: 1 },
      { id: '5', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '6', text: 'McFarlane WR. Family interventions for schizophrenia and the psychoses: A review', source: 'Family Process', year: '2016', link: 'https://doi.org/10.1111/famp.12235', tier: 1 },
      { id: '7', text: 'Online family psychoeducation for psychosis: A systematic review', source: 'Schizophrenia Research', year: '2021', link: 'https://doi.org/10.1016/j.schres.2021.03.018', tier: 1 },
      { id: '8', text: 'NAMI Family-to-Family: Outcomes of a peer-led family education program', source: 'Psychiatric Services', year: '2018', link: 'https://doi.org/10.1176/appi.ps.201700321', tier: 1 },
      { id: '9', text: 'Coordinated Specialty Care for first episode psychosis', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/research/research-funded-by-nimh/research-initiatives/raise', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When a family member develops psychosis, the entire family system is affected. Parents
            feel guilt, siblings feel fear, partners feel helpless. In the absence of guidance,
            families often oscillate between two extremes: overprotective hovering that stifles
            the person's autonomy, or frustrated withdrawal that leaves them isolated. Family
            psychoeducation provides a middle path --- one grounded in decades of research showing
            that what happens at home matters at least as much as what happens in the
            clinic <Citation id="1" index={1} source="Cochrane Database of Systematic Reviews" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="expressed-emotion" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Expressed Emotion: The Discovery That Changed Everything
        </h2>
        <p className="mb-6">
          In the 1960s, British researcher George Brown made a remarkable discovery: the
          single strongest predictor of whether someone with schizophrenia would relapse
          wasn't their symptom severity or medication regimen --- it was the emotional
          environment they returned to after hospitalization. Specifically, families
          characterized by high "expressed emotion" (EE) --- a combination of critical
          comments, hostility, and emotional over-involvement --- had relapse rates two
          to three times higher than families with low
          EE <Citation id="2" index={2} source="Psychological Medicine" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          This finding --- replicated in over 30 studies across diverse cultures --- wasn't about
          blaming families. High EE is a natural, understandable response to the stress of
          living with a loved one's psychosis. When your child hears voices, your instinct is
          to express intense concern (over-involvement). When your partner refuses to shower
          or leave the house, frustration (criticism) is a human response. The point isn't
          that these reactions are wrong --- it's that they're modifiable, and modifying them
          dramatically changes outcomes.
        </p>

        <ArticleChart
          type="bar"
          data={[
            { label: 'High EE + no medication', value: 92 },
            { label: 'High EE + medication', value: 53 },
            { label: 'Low EE + no medication', value: 42 },
            { label: 'Low EE + medication', value: 12 },
          ]}
          title="9-month relapse rates by expressed emotion and medication status (%)"
          source="Psychological Medicine, 2019"
        />

        <h2 id="what-psychoeducation-involves" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Family Psychoeducation Involves
        </h2>
        <p className="mb-6">
          Family psychoeducation programs vary in format --- some are single-family, some
          multi-family; some run for months, others for years --- but they share core
          components <Citation id="6" index={6} source="Family Process" year="2016" tier={1} />:
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Education About the Condition',
              content: 'Families receive accurate, accessible information about psychosis --- what causes it, how it manifests, what treatments are available, and what the evidence says about outcomes. This replaces the mixture of internet misinformation, media stereotypes, and guesswork that most families rely on. Understanding that negative symptoms reflect neurobiological changes rather than "laziness" can transform a family\'s emotional response overnight.',
            },
            {
              title: 'Communication Skills Training',
              content: 'Families learn specific communication techniques: making clear, calm requests instead of global criticisms; expressing positive feelings; using "I" statements; and active listening. These skills reduce the emotional intensity of family interactions without requiring families to suppress genuine feelings.',
            },
            {
              title: 'Structured Problem-Solving',
              content: 'A step-by-step approach to addressing practical challenges: define the problem, brainstorm solutions, evaluate options, choose one, implement it, and review. This structured approach prevents the circular arguments and helpless frustration that characterize many family discussions about the person\'s care.',
            },
            {
              title: 'Crisis Planning',
              content: 'Families develop a written crisis plan: early warning signs to watch for, whom to contact, when to go to the emergency department, and what to do if the person refuses help. Having a plan reduces panic and enables faster, more effective responses.',
            },
            {
              title: 'Self-Care for Family Members',
              content: 'Recognizing that caregivers cannot pour from an empty cup. Programs address caregiver burnout, guilt, grief (for the life they expected), and the importance of maintaining their own social connections, activities, and health. Peer support among families --- connecting with others who understand --- is particularly valued.',
            },
          ]}
        />

        <h2 id="the-evidence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Evidence: Why This Works So Well
        </h2>
        <p className="mb-6">
          The Cochrane systematic review of family interventions for schizophrenia --- the gold
          standard of evidence synthesis --- found that family psychoeducation approximately
          halves the risk of relapse compared to standard
          treatment <Citation id="1" index={1} source="Cochrane Database of Systematic Reviews" year="2020" tier={1} />.
          It also reduces hospitalization, improves medication adherence, and enhances social
          functioning. For caregivers, it reduces burden, improves coping, and increases
          knowledge and
          confidence <Citation id="3" index={3} source="World Psychiatry" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          These are among the largest effect sizes in the entire psychosis treatment
          literature --- yet family psychoeducation remains one of the least implemented
          evidence-based
          practices <Citation id="4" index={4} source="The Lancet Psychiatry" year="2020" tier={1} />.
          Barriers include lack of trained facilitators, limited session availability, family
          scheduling difficulties, and healthcare systems organized around individual rather
          than family-based care.
        </p>

        <ArticleCallout type="tip" title="Accessing Support Without a Formal Program">
          If formal family psychoeducation isn't available in your area, several alternatives
          exist. NAMI's Family-to-Family program --- a free, peer-led 8-week course --- has shown
          significant improvements in family member knowledge, coping, and
          distress <Citation id="8" index={8} source="Psychiatric Services" year="2018" tier={1} />.
          Online programs are emerging that deliver psychoeducation digitally, with some
          evidence of
          effectiveness <Citation id="7" index={7} source="Schizophrenia Research" year="2021" tier={1} />.
          And coordinated specialty care programs for first-episode psychosis typically include
          family intervention as a core
          component <Citation id="9" index={9} source="National Institute of Mental Health" year="2024" tier={2} />.
        </ArticleCallout>

        <h2 id="for-families" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Families Need to Hear
        </h2>
        <p className="mb-6">
          If you are a family member of someone experiencing psychosis, several things are
          true simultaneously: this is not your fault; your reactions are understandable; your
          role matters enormously; and you deserve support in your own right --- not just as an
          extension of your family member's treatment
          plan <Citation id="5" index={5} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
        </p>
        <p className="mb-6">
          The research on expressed emotion can feel like blame if it's misunderstood. But the
          intention is the opposite: it identifies specific, learnable communication patterns
          that reduce relapse risk. It's not about feeling less --- it's about expressing more
          skillfully. A parent can feel devastated about their child's diagnosis and still
          learn to replace "Why won't you take your medication?" with "I notice you seem to
          be struggling. What would help right now?" The feeling is the same. The impact is
          dramatically different.
        </p>
        <p className="mb-6">
          Recovery from psychosis is not a solo endeavor --- and neither is supporting someone
          through it. The families who do best are the ones who seek out their own community:
          other families who understand, professionals who include them in the treatment
          conversation, and resources that validate their experience while building their
          skills. You are not just a spectator in your family member's recovery. You are, the
          evidence suggests, among the most powerful therapeutic forces available.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-025 | Long-Acting Injectable Antipsychotics
  // --------------------------------------------------------------------------
  {
    id: catId(25),
    slug: 'long-acting-injectable-antipsychotics-how-they-work-who-benefits',
    title: 'Long-Acting Injectable Antipsychotics: How They Work and Who Benefits',
    description: 'How long-acting injectable antipsychotics eliminate daily pill-taking, reduce relapse risk, and are emerging as a first-line option --- not just a last resort.',
    image: '/images/articles/cat16/cover-025.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['LAI', 'Antipsychotics', 'Medication', 'Adherence'],

    summary: 'Long-acting injectable (LAI) antipsychotics deliver medication through an injection given every 2 weeks to 6 months, eliminating the need for daily pill-taking. Originally positioned as a "last resort" for people who couldn\'t adhere to oral medication, LAIs are increasingly recognized as a first-line option that offers genuine advantages for anyone with a psychotic disorder. The pharmacokinetic benefits are straightforward: steady medication levels without the peaks and troughs of daily dosing, no possibility of covert non-adherence, and immediate clinical awareness if someone misses an appointment. Studies consistently show that LAIs reduce relapse and rehospitalization compared to equivalent oral medications. This article examines the evidence, addresses common misconceptions, and explores why these medications deserve consideration earlier in treatment.',

    keyFacts: [
      { text: 'LAIs reduce the risk of relapse and hospitalization by approximately 20--30% compared to equivalent oral antipsychotics in real-world studies', citationIndex: 1 },
      { text: 'Non-adherence to oral antipsychotics is approximately 50% within the first year --- LAIs eliminate this as a factor', citationIndex: 2 },
      { text: 'Modern LAIs are available in formulations lasting from 2 weeks to 6 months, with paliperidone palmitate offering quarterly and biannual options', citationIndex: 3 },
      { text: 'Patient satisfaction with LAIs is consistently high once initiated, despite initial reluctance --- most report preferring the convenience', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The biggest barrier to LAI use isn\'t patient reluctance --- it\'s clinician reluctance. Studies consistently show that patients are more open to injectable medications than their prescribers assume. When offered in a neutral, informative way, many people choose LAIs. The assumption that "patients won\'t want injections" has kept effective treatment from people who might prefer it.',

    practicalExercise: {
      title: 'Deciding if an LAI Might Be Right for You',
      steps: [
        { title: 'Assess your adherence honestly', description: 'Over the past month, how many days did you miss your medication? If the answer is "a few" or "I\'m not sure," an LAI could provide more consistent coverage. There\'s no judgment --- inconsistency with daily pills is the human norm, not the exception.' },
        { title: 'Consider the lifestyle benefits', description: 'Would not having to remember a daily pill improve your quality of life? Would it reduce conflict with family members about medication? Would one appointment per month (or less) be preferable to daily reminders?' },
        { title: 'Ask about side effect profiles', description: 'LAI formulations have side effect profiles similar to their oral equivalents. If you tolerate the oral version well, you\'ll likely tolerate the LAI. Ask your clinician how the transition works.' },
        { title: 'Address needle concerns directly', description: 'If needles are a concern, ask about the injection experience from someone who receives LAIs. Many report that the injection is a minor inconvenience compared to the freedom from daily pills. Modern LAI needles and techniques have minimized discomfort.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Medication Consistency',
    },

    citations: [
      { id: '1', text: 'Long-acting injectable versus oral antipsychotics in schizophrenia: A systematic review and meta-analysis of mirror-image studies', source: 'Journal of Clinical Psychiatry', year: '2020', link: 'https://doi.org/10.4088/JCP.19r13055', tier: 1 },
      { id: '2', text: 'Medication non-adherence in schizophrenia: Prevalence, predictors, and outcomes', source: 'Schizophrenia Bulletin', year: '2019', link: 'https://doi.org/10.1093/schbul/sby170', tier: 1 },
      { id: '3', text: 'Once-every-6-months paliperidone palmitate: A systematic review of efficacy and safety', source: 'European Neuropsychopharmacology', year: '2021', link: 'https://doi.org/10.1016/j.euroneuro.2021.07.006', tier: 1 },
      { id: '4', text: 'Patient attitudes toward long-acting injectable antipsychotics: A systematic review', source: 'Psychiatric Services', year: '2020', link: 'https://doi.org/10.1176/appi.ps.201900434', tier: 1 },
      { id: '5', text: 'Early use of long-acting injectable antipsychotics in first-episode psychosis: A systematic review', source: 'Schizophrenia Research', year: '2021', link: 'https://doi.org/10.1016/j.schres.2021.04.006', tier: 1 },
      { id: '6', text: 'Pharmacokinetics of long-acting injectable antipsychotics: Clinical implications', source: 'CNS Drugs', year: '2019', link: 'https://doi.org/10.1007/s40263-019-00670-0', tier: 1 },
      { id: '7', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '8', text: 'Understanding schizophrenia', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Every day, approximately half of all people prescribed oral antipsychotics don't take
            them as
            directed <Citation id="2" index={2} source="Schizophrenia Bulletin" year="2019" tier={1} />.
            This isn't a character flaw --- it's the predictable reality of asking humans to take
            daily medication for a condition that, when well-treated, feels like it doesn't need
            treatment. Long-acting injectable antipsychotics offer a fundamentally different
            approach: one injection every 2 weeks to 6 months replaces daily pill-taking entirely.
            The result is consistent medication levels, eliminated adherence guesswork, and ---
            the data shows --- significantly better real-world outcomes.
          </p>
        </div>

        <h2 id="how-lais-work" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How LAIs Work: The Pharmacokinetic Advantage
        </h2>
        <p className="mb-6">
          Long-acting injectables work by depositing medication in a form that is slowly
          absorbed from the injection site over weeks or months. The active compound is
          typically bonded to a fatty acid (creating a "prodrug") or suspended in a
          microsphere matrix that gradually releases the
          medication <Citation id="6" index={6} source="CNS Drugs" year="2019" tier={1} />.
          This slow-release mechanism produces steady blood levels without the daily peaks
          and troughs that characterize oral dosing.
        </p>

        <ComparisonTable
          headers={['Feature', 'Oral Antipsychotic', 'Long-Acting Injectable']}
          rows={[
            ['Dosing frequency', 'Daily', 'Every 2 weeks to 6 months'],
            ['Adherence certainty', 'Unknown without monitoring', 'Verified at each appointment'],
            ['Blood level stability', 'Peaks and troughs daily', 'Steady-state with minimal fluctuation'],
            ['If a dose is missed', 'Often undetected; may lead to gradual relapse', 'Immediately known; clinical team alerted'],
            ['Available medications', 'All antipsychotics', 'Paliperidone, aripiprazole, risperidone, haloperidol, fluphenazine, olanzapine'],
            ['Flexibility to adjust dose', 'Easily adjusted', 'Requires waiting for next injection cycle'],
          ]}
        />

        <h2 id="the-evidence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Evidence: Better Outcomes in the Real World
        </h2>
        <p className="mb-6">
          The evidence for LAIs shows an interesting split. In randomized controlled trials ---
          where both groups are carefully monitored --- LAIs and oral medications show similar
          outcomes, largely because the monitoring itself improves oral adherence. But in
          mirror-image studies and real-world observational data --- which better reflect actual
          clinical practice --- LAIs consistently outperform oral
          equivalents <Citation id="1" index={1} source="Journal of Clinical Psychiatry" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          Meta-analyses of mirror-image studies (comparing the same person's outcomes before
          and after switching from oral to LAI) show reductions of 20--30% in relapse rates
          and 50--60% in hospitalization. These are clinically meaningful differences that
          translate to fewer emergency department visits, fewer inpatient stays, and more
          continuous community functioning.
        </p>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Non-adherence rate with oral medication' },
            { value: 56, suffix: '%', label: 'Reduction in hospitalization (LAI vs oral)' },
            { value: 6, suffix: ' months', label: 'Longest interval between injections' },
          ]}
          source="Schizophrenia Bulletin, 2019; Journal of Clinical Psychiatry, 2020"
        />

        <h2 id="first-line-not-last-resort" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Moving From Last Resort to First Line
        </h2>
        <p className="mb-6">
          Historically, LAIs were positioned as a "last resort" --- prescribed only after multiple
          oral medication failures, typically framed as something imposed on people who "can't
          be trusted" to take their pills. This framing is both inaccurate and harmful. It
          stigmatizes LAI use and delays access to a treatment approach that could prevent
          the cycle of relapse and rehospitalization that characterizes poorly adherent oral
          treatment.
        </p>
        <p className="mb-6">
          Emerging evidence supports offering LAIs early in the treatment course --- even during
          first-episode
          psychosis <Citation id="5" index={5} source="Schizophrenia Research" year="2021" tier={1} />.
          The rationale is compelling: early psychosis is the period of greatest treatment
          sensitivity, and preventing relapse during this critical window has lasting effects
          on long-term trajectory. Starting with an LAI from the beginning prevents the first
          adherence gap --- which is often when the first relapse occurs.
        </p>

        <ArticleCallout type="insight" title="The Perception Gap">
          Research consistently shows a "perception gap" between how clinicians think patients
          feel about LAIs and how patients actually
          feel <Citation id="4" index={4} source="Psychiatric Services" year="2020" tier={1} />.
          Clinicians overestimate patient reluctance. When LAIs are presented as a neutral
          option --- "Here's another way to take your medication that some people prefer" ---
          rather than a punitive measure, acceptance rates are
          high <Citation id="7" index={7} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
          Many patients report that the convenience of not worrying about daily pills,
          combined with the stability of consistent blood levels, makes LAIs their preferred
          formulation.
        </ArticleCallout>

        <h2 id="practical-considerations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practical Considerations: Making the Transition
        </h2>
        <p className="mb-6">
          Transitioning from oral to injectable medication typically involves a brief overlap
          period. Most LAIs require oral supplementation for the first 2--4 weeks while the
          injectable reaches therapeutic levels. Once steady state is achieved, oral medication
          is
          discontinued <Citation id="6" index={6} source="CNS Drugs" year="2019" tier={1} />.
          The injection itself is typically administered in the deltoid (shoulder) or gluteal
          (hip) muscle, takes a few minutes, and is managed by a nurse or clinician.
        </p>
        <p className="mb-6">
          Side effect profiles of LAIs generally mirror their oral equivalents: if someone
          tolerates oral paliperidone, they will likely tolerate injectable paliperidone.
          The main additional consideration is injection site reactions --- mild pain, swelling,
          or redness at the injection site --- which are typically transient and manageable.
        </p>
        <p className="mb-6">
          The appointments themselves can become a therapeutic anchor. Regular contact with
          healthcare providers --- every 2 weeks to 6 months depending on the formulation ---
          creates structured check-in opportunities that might not occur with oral medication.
          These visits provide natural moments to assess symptoms, address concerns, and
          maintain therapeutic
          engagement <Citation id="8" index={8} source="National Institute of Mental Health" year="2024" tier={2} />.
          For some people, knowing that their next appointment is scheduled --- and that missing
          it will be noticed --- provides a scaffold of accountability that supports their
          broader recovery.
        </p>
      </>
    ),
  },
];
