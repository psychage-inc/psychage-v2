 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_PSYCHOSIS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  QuoteBlock,
} from '../../../components/article/blocks';

// ============================================================================
// Subcategory 1 --- Understanding Psychosis | Articles 1--5
// ============================================================================

export const understandingPsychosisArticlesA: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-PSY-001 | What Psychosis Really Is
  // --------------------------------------------------------------------------
  {
    id: catId(1),
    slug: 'what-psychosis-really-is-separating-medical-reality-from-media-myths',
    status: 'published',
    title: 'What Psychosis Really Is: Separating Medical Reality From Media Myths',
    description: 'A comprehensive, evidence-based guide to understanding psychosis --- what it actually involves, how it differs from media portrayals, and why accurate knowledge matters for everyone.',
    image: '/images/articles/cat16/cover-001.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Psychosis', 'Mental Health Education', 'Condition Deep Dive', 'Stigma'],

    summary: 'Psychosis is a medical condition involving disruptions in how the brain processes reality --- not a character flaw, a sign of violence, or a permanent sentence. Roughly 3 in 100 people will experience at least one psychotic episode during their lifetime. Symptoms typically include hallucinations, delusions, disorganized thinking, and changes in behavior, and they arise from identifiable disruptions in brain chemistry and neural connectivity. With early intervention and appropriate treatment, many people who experience psychosis recover substantially and lead fulfilling lives. This article separates the medical reality of psychosis from decades of harmful media misrepresentation.',

    keyFacts: [
      { text: 'Approximately 3% of the global population will experience a psychotic episode at some point in their lives', citationIndex: 1 },
      { text: 'People with psychotic disorders are 14 times more likely to be victims of violence than perpetrators', citationIndex: 2 },
      { text: 'Early intervention programs can reduce hospitalization rates by up to 50%', citationIndex: 3 },
      { text: 'The average delay between psychosis onset and treatment is 1--3 years in many countries', citationIndex: 4 },
      { text: 'Recovery rates improve significantly when treatment begins within the first year of symptoms', citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'Psychosis doesn\'t mean a person has "lost their mind." It means their brain is processing sensory information and beliefs differently --- and in most cases, that processing can be corrected with the right support. The brain is not broken. It\'s misfiring.',

    practicalExercise: {
      title: 'Reality-Check Your Knowledge',
      steps: [
        { title: 'Identify one belief about psychosis', description: 'Write down something you believed about psychosis before reading this article. Was it based on a movie, news story, or something someone told you?' },
        { title: 'Compare it with the evidence', description: 'Look at the statistics and research findings in this article. Does your belief match the data, or was it shaped by stigma and media portrayals?' },
        { title: 'Practice a corrective statement', description: 'Write one sentence that accurately describes psychosis based on what you\'ve learned. For example: "Psychosis is a treatable medical condition that affects how the brain processes reality."' },
        { title: 'Share it forward', description: 'The next time psychosis comes up in conversation, share your corrective statement. Changing one person\'s understanding can ripple outward.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Explore the Symptom Navigator',
    },

    citations: [
      { id: '1', text: 'Psychotic experiences in the general population: A twenty-year systematic review and meta-analysis', source: 'Psychological Medicine', year: '2023', link: 'https://doi.org/10.1017/S0033291722003312', tier: 1 },
      { id: '2', text: 'Violence and mental disorders: A structured review of associations by individual diagnoses, risk factors, and risk assessment', source: 'The Lancet Psychiatry', year: '2019', link: 'https://doi.org/10.1016/S2215-0366(19)30145-4', tier: 1 },
      { id: '3', text: 'Specialized early intervention services for first-episode psychosis: A systematic review and meta-analysis', source: 'JAMA Psychiatry', year: '2020', link: 'https://doi.org/10.1001/jamapsychiatry.2019.3199', tier: 1 },
      { id: '4', text: 'Duration of untreated psychosis and long-term outcomes: A systematic review and meta-analysis', source: 'British Journal of Psychiatry', year: '2018', link: 'https://doi.org/10.1192/bjp.2018.214', tier: 1 },
      { id: '5', text: 'Early intervention in psychosis: Health economic evaluation', source: 'National Institute for Health and Care Excellence (NICE)', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '6', text: 'Psychosis and schizophrenia in adults: Prevention and management', source: 'NICE Clinical Guidelines', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '7', text: 'Schizophrenia fact sheet', source: 'World Health Organization', year: '2024', link: 'https://www.who.int/news-room/fact-sheets/detail/schizophrenia', tier: 2 },
      { id: '8', text: 'Understanding psychosis', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/publications/understanding-psychosis', tier: 2 },
      { id: '9', text: 'Media portrayals of mental illness: A study of their effects on attitudes and behaviors', source: 'American Journal of Psychiatry', year: '2017', link: 'https://doi.org/10.1176/appi.ajp.2016.16010037', tier: 1 },
      { id: '10', text: 'The dopamine hypothesis of schizophrenia: Version III---The final common pathway', source: 'Schizophrenia Bulletin', year: '2009', link: 'https://doi.org/10.1093/schbul/sbp006', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Say the word "psychosis" and most people picture something from a thriller --- a wild-eyed figure
            on a rampage, detached from humanity, dangerous beyond reason. That picture is almost entirely wrong.
            Psychosis is a medical condition, not a horror movie trope. And the gap between what people believe
            about it and what the evidence actually shows is one of the most damaging knowledge failures in
            modern mental health.
          </p>
          <p className="mb-6">
            Roughly 3 in every 100 people will experience at least one psychotic episode during their
            lifetime <Citation id="1" index={1} source="Psychological Medicine" year="2023" tier={1} />.
            That makes psychosis far more common than most people realize. It can be triggered by extreme
            stress, sleep deprivation, substance use, medical conditions, or the onset of a psychiatric
            disorder like schizophrenia. It can also appear briefly and never return.
          </p>
        </div>

        <h2 id="what-psychosis-actually-is" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Psychosis Actually Is --- and What It Isn't
        </h2>
        <p className="mb-6">
          At its core, psychosis describes a disruption in how the brain processes reality. The two hallmark
          experiences are <strong>hallucinations</strong> --- perceiving things that aren't there, most commonly
          hearing voices --- and <strong>delusions</strong> --- holding fixed beliefs that don't align with shared
          reality, such as believing one is being surveilled or has a special mission. These experiences feel
          entirely real to the person having them. That's a critical point: a person experiencing psychosis
          isn't "imagining things" in the way that phrase is colloquially used. Their brain is generating
          sensory data and belief structures with the same conviction that your brain generates your experience
          of reading this sentence right now <Citation id="10" index={10} source="Schizophrenia Bulletin" year="2009" tier={1} />.
        </p>
        <p className="mb-6">
          Other features of psychosis can include disorganized thinking --- speech that jumps between unrelated
          topics or becomes difficult to follow --- and changes in behavior, such as unusual agitation, catatonic
          stillness, or a marked withdrawal from social life. Some people also experience what clinicians call
          "negative symptoms": reduced emotional expression, loss of motivation, and difficulty experiencing
          pleasure. These quieter symptoms often cause more long-term impairment than the more dramatic ones
          that dominate public perception <Citation id="8" index={8} source="National Institute of Mental Health" year="2024" tier={2} />.
        </p>

        <ArticleCallout variant="clinical-note" title="Psychosis Is a Symptom, Not a Diagnosis">
          <p>
            Psychosis itself is a symptom --- not a standalone diagnosis. It can appear in schizophrenia,
            bipolar disorder, severe depression, brief psychotic disorder, substance-induced conditions, and
            certain medical illnesses. Identifying the underlying cause is essential to choosing the right
            treatment approach.
          </p>
        </ArticleCallout>

        <h2 id="the-media-myth-problem" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Media Myth Problem
        </h2>
        <p className="mb-6">
          One of the most persistent and harmful myths about psychosis is the association with violence.
          Film, television, and news media disproportionately portray people with psychotic disorders as
          dangerous. A 2017 analysis published in the <em>American Journal of Psychiatry</em> found that
          media depictions of mental illness --- particularly psychosis --- overwhelmingly emphasize violence,
          unpredictability, and criminality, despite these portrayals contradicting the epidemiological
          evidence <Citation id="9" index={9} source="American Journal of Psychiatry" year="2017" tier={1} />.
        </p>
        <p className="mb-6">
          The data tells a different story. A 2019 study published in <em>The Lancet Psychiatry</em>
          found that people with psychotic disorders are <strong>14 times more likely to be victims of
          violence than perpetrators</strong> <Citation id="2" index={2} source="The Lancet Psychiatry" year="2019" tier={1} />.
          When violence does occur in the context of psychosis, it's most frequently associated with
          co-occurring substance use, a history of trauma, or inadequate access to treatment --- not with
          psychosis itself.
        </p>

        <StatCard
          stats={[
            { value: 3, suffix: '%', label: 'Lifetime prevalence of psychotic episodes' },
            { value: 14, suffix: 'x', label: 'More likely to be victims than perpetrators of violence' },
            { value: 50, suffix: '%', label: 'Reduction in hospitalization with early intervention' },
          ]}
          source="Lancet Psychiatry, 2019; JAMA Psychiatry, 2020"
        />

        <p className="mb-6">
          This stigma has real consequences. It delays help-seeking. Family members who internalize media
          stereotypes may react with fear rather than compassion when a loved one shows early signs of
          psychosis. And healthcare systems underfund psychosis services partly because public sentiment
          treats these conditions as untreatable --- another myth. The World Health Organization notes that
          the treatment gap for psychotic disorders exceeds 70% in low- and middle-income
          countries <Citation id="7" index={7} source="World Health Organization" year="2024" tier={2} />.
        </p>

        <h2 id="neuroscience-of-psychosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Neuroscience: What's Happening in the Brain
        </h2>
        <p className="mb-6">
          Psychosis involves measurable changes in brain chemistry and connectivity. The most well-established
          finding is the <strong>dopamine hypothesis</strong>: in people experiencing psychosis, the mesolimbic
          dopamine pathway --- which assigns salience and importance to stimuli --- becomes overactive. This
          essentially means the brain starts treating irrelevant stimuli as deeply meaningful. A passing
          glance from a stranger might feel like a deliberate signal. A random number sequence might seem
          like a coded message <Citation id="10" index={10} source="Schizophrenia Bulletin" year="2009" tier={1} />.
        </p>
        <p className="mb-6">
          More recent research has expanded beyond dopamine to implicate glutamate signaling, cortical
          connectivity, and immune system activation. Brain imaging studies show reduced gray matter volume
          in the prefrontal cortex and temporal lobes --- areas involved in reasoning, planning, and auditory
          processing --- in people with chronic psychotic conditions. However, many of these changes are
          subtle and develop over time, which is why early intervention matters so
          much <Citation id="3" index={3} source="JAMA Psychiatry" year="2020" tier={1} />.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'dopamine',
              title: 'The dopamine pathway',
              content: (
                <p>
                  Dopamine is a neurotransmitter that helps the brain decide what's important. In psychosis,
                  excessive dopamine activity in the mesolimbic pathway causes the brain to assign profound
                  significance to ordinary events, sounds, or patterns. Antipsychotic medications work primarily
                  by blocking dopamine D2 receptors in this pathway.
                </p>
              ),
            },
            {
              id: 'glutamate',
              title: 'The glutamate hypothesis',
              content: (
                <p>
                  Glutamate is the brain's primary excitatory neurotransmitter. The NMDA receptor hypofunction
                  hypothesis proposes that reduced glutamate signaling at NMDA receptors --- particularly in the
                  prefrontal cortex --- contributes to the cognitive and negative symptoms of psychosis that
                  dopamine-focused treatments often don't address.
                </p>
              ),
            },
            {
              id: 'inflammation',
              title: 'Neuroinflammation',
              content: (
                <p>
                  Emerging research links psychosis to immune system activation and neuroinflammation. Elevated
                  levels of inflammatory markers like C-reactive protein and interleukin-6 have been found in
                  some people during first-episode psychosis, suggesting that the immune system may play a role
                  in triggering or sustaining psychotic symptoms.
                </p>
              ),
            },
          ]}
        />

        <h2 id="recovery-is-real" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recovery Is Real --- and More Common Than People Think
        </h2>
        <p className="mb-6">
          Perhaps the most damaging myth about psychosis is that it's a life sentence. The evidence says
          otherwise. A substantial body of research shows that many people who experience psychosis ---
          including those with schizophrenia --- achieve meaningful recovery. The NICE guidelines for psychosis
          emphasize that with coordinated specialty care, including medication, therapy, family involvement,
          and supported employment, outcomes improve
          dramatically <Citation id="6" index={6} source="NICE Clinical Guidelines" year="2024" tier={3} />.
        </p>
        <p className="mb-6">
          The concept of recovery itself has evolved. Clinical recovery --- defined as symptom remission --- is
          one dimension. But personal recovery --- rebuilding a meaningful life, maintaining relationships,
          pursuing goals --- is increasingly recognized as the more important measure. Many people live
          fulfilling lives while managing ongoing symptoms. Others experience full remission and never have
          another episode.
        </p>
        <p className="mb-6">
          What makes the difference? Time matters enormously. The duration of untreated psychosis --- the gap
          between symptom onset and the start of treatment --- is one of the strongest predictors of long-term
          outcomes. A meta-analysis published in the <em>British Journal of Psychiatry</em> found that
          longer untreated psychosis is associated with poorer response to treatment, worse cognitive outcomes,
          and higher relapse rates <Citation id="4" index={4} source="British Journal of Psychiatry" year="2018" tier={1} />.
          Yet in many countries, people wait an average of 1--3 years before receiving appropriate care. Closing
          that gap is one of the most impactful things the mental health system can do.
        </p>

        <QuoteBlock
          quote="The tragedy of psychosis is not the condition itself --- it's the years of unnecessary suffering caused by stigma, delayed treatment, and underfunded services."
          attribution="Early Psychosis Intervention Network"
          variant="large"
        />

        <p className="mb-6">
          Early intervention programs --- which combine antipsychotic medication with cognitive behavioral therapy,
          family education, and vocational support --- have been shown to reduce hospitalization rates by up to 50%
          and significantly improve quality of
          life <Citation id="3" index={3} source="JAMA Psychiatry" year="2020" tier={1} />.
          These programs exist in many countries, but they remain underfunded relative to their
          impact <Citation id="5" index={5} source="NICE" year="2024" tier={3} />.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-002 | The Psychosis Spectrum
  // --------------------------------------------------------------------------
  {
    id: catId(2),
    slug: 'psychosis-spectrum-from-brief-episodes-to-chronic-conditions',
    status: 'published',
    title: 'The Psychosis Spectrum: From Brief Episodes to Chronic Conditions',
    description: 'Understand the full range of psychotic experiences --- from isolated episodes to schizophrenia --- and why thinking in terms of a spectrum changes how we approach diagnosis and treatment.',
    image: '/images/articles/cat16/cover-002.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Psychosis', 'Schizophrenia Spectrum', 'Diagnosis', 'Research Digest'],

    summary: 'Psychosis isn\'t a single condition --- it\'s a spectrum of experiences ranging from brief, isolated episodes that resolve completely to chronic conditions requiring ongoing management. This spectrum includes brief psychotic disorder, schizophreniform disorder, schizophrenia, schizoaffective disorder, delusional disorder, and substance-induced psychosis, among others. Understanding where someone falls on this spectrum is essential for choosing the right treatment approach and setting realistic expectations for recovery. Research increasingly suggests that psychotic experiences exist on a continuum in the general population, with subclinical experiences being far more common than full-blown episodes.',

    keyFacts: [
      { text: 'Up to 7--8% of the general population reports subclinical psychotic experiences like hearing a voice once or having unusual beliefs', citationIndex: 1 },
      { text: 'Brief psychotic disorder resolves within one month and many people never have another episode', citationIndex: 2 },
      { text: 'Schizophrenia affects approximately 24 million people worldwide --- about 1 in 300', citationIndex: 3 },
      { text: 'Only 20--30% of people who experience a first psychotic episode go on to develop schizophrenia', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'Most people think of psychosis as a binary: you either have it or you don\'t. But the evidence shows it\'s a spectrum, and the same brain mechanisms that produce full psychotic episodes exist --- at lower intensity --- in many people. Hearing your name called when nobody\'s there, for instance, is remarkably common and entirely benign.',

    practicalExercise: {
      title: 'Understanding the Spectrum',
      steps: [
        { title: 'Learn the conditions', description: 'Review the spectrum of psychotic conditions described in this article, from brief psychotic disorder to schizophrenia. Notice how they differ in duration, severity, and prognosis.' },
        { title: 'Understand the continuum', description: 'Reflect on whether you\'ve ever experienced a minor perceptual oddity --- hearing your name in a crowd, a vivid hypnagogic hallucination while falling asleep. These common experiences sit on the same continuum.' },
        { title: 'Challenge the binary', description: 'When you hear someone described as "psychotic," consider where they might fall on this spectrum. A single brief episode has a very different trajectory than chronic schizophrenia.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Try the Symptom Navigator',
    },

    citations: [
      { id: '1', text: 'The prevalence of psychotic experiences in non-clinical populations: A systematic review and meta-analysis', source: 'Psychological Medicine', year: '2015', link: 'https://doi.org/10.1017/S0033291714002621', tier: 1 },
      { id: '2', text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', source: 'American Psychiatric Association', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
      { id: '3', text: 'Schizophrenia fact sheet', source: 'World Health Organization', year: '2024', link: 'https://www.who.int/news-room/fact-sheets/detail/schizophrenia', tier: 2 },
      { id: '4', text: 'Outcomes of first-episode psychosis: A systematic review', source: 'British Journal of Psychiatry', year: '2017', link: 'https://doi.org/10.1192/bjp.bp.116.186692', tier: 1 },
      { id: '5', text: 'The continuum of psychosis and its implication for the structure of psychopathology', source: 'Archives of General Psychiatry', year: '2009', link: 'https://doi.org/10.1001/archgenpsychiatry.2009.152', tier: 1 },
      { id: '6', text: 'Clinical high risk for psychosis: Current status and future directions', source: 'World Psychiatry', year: '2021', link: 'https://doi.org/10.1002/wps.20903', tier: 1 },
      { id: '7', text: 'Course and outcome of schizophrenia-spectrum disorders', source: 'National Institute of Mental Health', year: '2023', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
      { id: '8', text: 'Psychosis continuum model: Implications for early intervention and prevention', source: 'Schizophrenia Research', year: '2020', link: 'https://doi.org/10.1016/j.schres.2019.11.036', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            When people hear "psychosis," they tend to think of one thing: schizophrenia. But that's like
            hearing "fever" and thinking only of malaria. Psychosis is a symptom that spans a wide range
            of conditions, each with its own trajectory, prognosis, and treatment needs. Some resolve in
            days. Others persist for years. Understanding this spectrum is the first step toward replacing
            fear with informed compassion.
          </p>
        </div>

        <h2 id="the-continuum-model" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Continuum Model: Psychosis Isn't Binary
        </h2>
        <p className="mb-6">
          For most of psychiatric history, psychosis was treated as a categorical diagnosis: you either
          had it or you didn't. But research from the past two decades has upended that view. A landmark
          2009 paper in <em>Archives of General Psychiatry</em> demonstrated that psychotic experiences
          exist on a continuum throughout the general population, with subclinical psychotic experiences
          --- such as occasionally hearing one's name when no one has spoken, or briefly holding unusual
          beliefs --- reported by 7--8% of non-clinical
          samples <Citation id="1" index={1} source="Psychological Medicine" year="2015" tier={1} />.
        </p>
        <p className="mb-6">
          This doesn't mean that 7% of people "have psychosis." It means that the brain mechanisms
          underlying psychotic experiences operate on a gradient, and most people who have these
          experiences never develop a clinical disorder. The continuum model --- articulated by researchers
          like Jim van Os --- suggests that the same vulnerability factors that produce subclinical
          experiences in some people, when combined with additional genetic, environmental, and social
          stressors, can push others into full psychotic
          episodes <Citation id="5" index={5} source="Archives of General Psychiatry" year="2009" tier={1} />.
        </p>

        <ArticleChart
          type="bar"
          title="Prevalence Across the Psychosis Spectrum"
          data={[
            { label: 'Subclinical experiences', value: 7.5 },
            { label: 'Clinical high-risk state', value: 3.0 },
            { label: 'Brief psychotic disorder', value: 0.8 },
            { label: 'Schizophreniform disorder', value: 0.5 },
            { label: 'Schizophrenia', value: 0.3 },
            { label: 'Schizoaffective disorder', value: 0.2 },
          ]}
          source="Compiled from WHO, 2024; Psychological Medicine, 2015"
        />

        <h2 id="conditions-on-the-spectrum" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Conditions: From Briefest to Most Persistent
        </h2>
        <p className="mb-6">
          The DSM-5-TR organizes psychotic conditions along a spectrum of severity and
          duration <Citation id="2" index={2} source="American Psychiatric Association" year="2022" tier={4} />.
          Understanding where a particular experience falls on this spectrum fundamentally changes the
          prognosis and treatment plan.
        </p>
        <p className="mb-6">
          <strong>Brief psychotic disorder</strong> involves the sudden onset of psychotic symptoms ---
          delusions, hallucinations, disorganized speech --- that resolves completely within one month. It's
          often triggered by extreme stress, trauma, or physical illness. Many people who experience it
          never have another episode. <strong>Schizophreniform disorder</strong> looks clinically identical
          to schizophrenia, but the total duration of illness (including prodromal, active, and residual
          phases) is less than six months. About one-third of people diagnosed with schizophreniform
          disorder recover fully; the remaining two-thirds eventually receive a schizophrenia
          diagnosis <Citation id="4" index={4} source="British Journal of Psychiatry" year="2017" tier={1} />.
        </p>

        <ComparisonTable
          title="Psychotic Conditions at a Glance"
          columns={['Condition', 'Duration', 'Recovery Rate']}
          items={[
            { feature: 'Brief psychotic disorder', values: ['< 1 month', 'Very high'] },
            { feature: 'Schizophreniform disorder', values: ['1--6 months', '~33% full recovery'] },
            { feature: 'Schizophrenia', values: ['> 6 months', 'Variable; ~30% achieve sustained remission'] },
            { feature: 'Schizoaffective disorder', values: ['Variable', 'Generally better than schizophrenia'] },
            { feature: 'Delusional disorder', values: ['Variable', 'Functional impairment often limited'] },
            { feature: 'Substance-induced psychosis', values: ['Resolves with abstinence', 'Good if substance use stops'] },
          ]}
          highlightColumn={2}
        />

        <p className="mb-6">
          <strong>Schizophrenia</strong> is the most recognized condition on the spectrum, characterized by
          psychotic symptoms lasting at least six months, along with significant functional impairment. It
          affects approximately 24 million people
          worldwide <Citation id="3" index={3} source="World Health Organization" year="2024" tier={2} />.
          But even within schizophrenia, trajectories vary enormously. Some people experience a single
          prolonged episode followed by sustained remission. Others have a relapsing-remitting course.
          A smaller proportion experience persistent symptoms that require continuous
          management <Citation id="7" index={7} source="National Institute of Mental Health" year="2023" tier={2} />.
        </p>
        <p className="mb-6">
          <strong>Schizoaffective disorder</strong> combines features of schizophrenia with a major mood
          episode (depressive or manic) occurring concurrently. <strong>Delusional disorder</strong>
          involves fixed, non-bizarre delusions --- such as being followed, being ill, or being loved by a
          public figure --- without the other features of schizophrenia. And <strong>substance-induced
          psychosis</strong>, triggered by drugs like cannabis, methamphetamine, or hallucinogens, typically
          resolves once the substance is eliminated, though it can mark the beginning of a primary psychotic
          disorder in some individuals.
        </p>

        <h2 id="clinical-high-risk" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Clinical High-Risk: The Window Before Psychosis
        </h2>
        <p className="mb-6">
          One of the most important developments in psychosis research is the identification of a
          "clinical high-risk" (CHR) state --- a period before full psychosis develops when subtle symptoms
          are present but haven't yet crossed the threshold into a psychotic episode. People in this state
          may experience attenuated hallucinations (sounds that are vague or partially formed), mild
          paranoia, and difficulty concentrating. About 20--35% of people identified as clinical high-risk
          go on to develop a psychotic
          disorder <Citation id="6" index={6} source="World Psychiatry" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          This window represents an extraordinary opportunity for intervention. Research into the CHR state
          has shown that cognitive behavioral therapy, omega-3 fatty acid supplementation, and stress
          reduction techniques can reduce conversion rates in some
          populations <Citation id="8" index={8} source="Schizophrenia Research" year="2020" tier={1} />.
          The challenge is that most people in this state don't seek help because they don't recognize
          their experiences as clinically significant --- or because stigma prevents them from disclosing
          what they're experiencing.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            The psychosis spectrum isn't a ladder from "mild" to "severe." It's a landscape with multiple
            pathways, many of which lead to recovery. Understanding which condition someone has --- and where
            they are in its course --- is essential for providing the right support at the right time.
          </p>
        </ArticleCallout>

        <h2 id="why-the-spectrum-matters" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why the Spectrum Matters for Treatment and Hope
        </h2>
        <p className="mb-6">
          When psychosis is treated as a single, monolithic experience, treatment tends to be one-size-fits-all:
          antipsychotic medication at a standard dose, often without the psychosocial support that evidence
          shows is equally important. But when clinicians understand the spectrum, treatment can be tailored.
          A person experiencing brief psychotic disorder may need short-term medication and crisis support.
          Someone at clinical high risk may benefit from therapy alone. A person with schizophrenia may need
          a comprehensive, long-term care plan including medication, CBT for psychosis, family intervention,
          and vocational rehabilitation.
        </p>
        <p className="mb-6">
          The spectrum framework also changes the conversation about hope. Telling a person who's had one
          psychotic episode that they "have schizophrenia" can be devastating --- and premature. Only 20--30%
          of people who experience a first episode go on to develop
          schizophrenia <Citation id="4" index={4} source="British Journal of Psychiatry" year="2017" tier={1} />.
          The rest recover fully, have isolated recurrences, or develop a different condition entirely.
          Accurate diagnosis --- which requires patience, longitudinal assessment, and a spectrum-based
          understanding --- protects people from the psychological harm of premature labeling.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-003 | Early Warning Signs of Psychosis
  // --------------------------------------------------------------------------
  {
    id: catId(3),
    slug: 'early-warning-signs-of-psychosis-what-families-should-watch-for',
    status: 'published',
    title: 'Early Warning Signs of Psychosis: What Families Should Watch For',
    description: 'A practical guide for families on recognizing the prodromal signs of psychosis --- the subtle changes in thinking, perception, and behavior that can precede a first episode.',
    image: '/images/articles/cat16/cover-003.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Psychosis', 'Early Warning Signs', 'Family Support', 'Prevention'],

    summary: 'Psychosis rarely appears without warning. In most cases, a period of gradual change --- called the prodrome --- precedes the first psychotic episode by months or even years. During this phase, families may notice subtle shifts: social withdrawal, declining academic or work performance, increased suspiciousness, unusual perceptual experiences, sleep disruption, and difficulty with concentration. Recognizing these changes early doesn\'t mean overreacting to normal adolescent behavior; it means understanding which patterns of change warrant professional evaluation. Research consistently shows that shorter durations of untreated psychosis lead to better long-term outcomes, making early recognition a critical skill for families.',

    keyFacts: [
      { text: '75% of people who develop schizophrenia experience a prodromal phase lasting months to years before their first psychotic episode', citationIndex: 1 },
      { text: 'The average duration of untreated psychosis is 1--3 years in many healthcare systems', citationIndex: 2 },
      { text: 'Social withdrawal is the most commonly reported prodromal sign, appearing in over 60% of cases', citationIndex: 3 },
      { text: 'Peak age of onset for first psychotic episodes is 18--25 in males and 25--35 in females', citationIndex: 4 },
      { text: 'Earlier treatment is consistently associated with better functional recovery, fewer hospitalizations, and improved quality of life', citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The prodrome isn\'t always dramatic. It often looks like a young person slowly losing interest in life --- pulling away from friends, dropping hobbies, struggling at school. The warning isn\'t a sudden snap. It\'s a gradual dimming.',

    practicalExercise: {
      title: 'The Family Observation Checklist',
      steps: [
        { title: 'Note behavioral changes', description: 'Over the next two weeks, observe whether your family member has withdrawn from social activities, stopped pursuing hobbies, or shown declining performance at school or work.' },
        { title: 'Listen for perceptual changes', description: 'Has the person mentioned hearing things others can\'t hear, seeing things that aren\'t there, or feeling watched or followed? These may be subtle and mentioned in passing.' },
        { title: 'Track sleep and concentration', description: 'Significant changes in sleep patterns (particularly insomnia) and difficulty concentrating can be early indicators. Note how long these changes have persisted.' },
        { title: 'Consult without alarm', description: 'If you\'ve noticed a cluster of these changes persisting for more than two weeks, contact your primary care provider or an early intervention in psychosis program. You don\'t need a diagnosis to ask for an evaluation.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Use the Symptom Navigator',
    },

    citations: [
      { id: '1', text: 'The prodromal phase of first-episode psychosis: Past and current conceptualizations', source: 'Schizophrenia Bulletin', year: '2006', link: 'https://doi.org/10.1093/schbul/sbj024', tier: 1 },
      { id: '2', text: 'Duration of untreated psychosis and long-term outcomes: A systematic review and meta-analysis', source: 'British Journal of Psychiatry', year: '2018', link: 'https://doi.org/10.1192/bjp.2018.214', tier: 1 },
      { id: '3', text: 'Prediction of psychosis: Model development and internal validation in a multicenter longitudinal study', source: 'JAMA Psychiatry', year: '2018', link: 'https://doi.org/10.1001/jamapsychiatry.2018.0793', tier: 1 },
      { id: '4', text: 'Age of onset and gender in schizophrenia: An overview', source: 'European Psychiatry', year: '2017', link: 'https://doi.org/10.1016/j.eurpsy.2016.12.002', tier: 1 },
      { id: '5', text: 'Specialized early intervention services for first-episode psychosis: A systematic review and meta-analysis', source: 'JAMA Psychiatry', year: '2020', link: 'https://doi.org/10.1001/jamapsychiatry.2019.3199', tier: 1 },
      { id: '6', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '7', text: 'Early psychosis intervention: A culturally adaptive clinical guide', source: 'SAMHSA', year: '2023', link: 'https://store.samhsa.gov/product/early-psychosis-intervention', tier: 2 },
      { id: '8', text: 'Family involvement in early psychosis treatment: A systematic review', source: 'Psychological Medicine', year: '2019', link: 'https://doi.org/10.1017/S0033291719000175', tier: 1 },
      { id: '9', text: 'Understanding psychosis', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/publications/understanding-psychosis', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            A mother notices her 19-year-old son has stopped returning texts from his closest friends. He's
            sleeping at odd hours, his grades have dropped from B's to incomplete assignments, and last week
            he mentioned something about a "signal" in the static of the television. She's worried. She's also
            unsure whether this is just stress, or something more. This uncertainty is where families most
            often get stuck --- and where early recognition can change the entire course of a life.
          </p>
        </div>

        <h2 id="the-prodrome" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Prodrome: What Happens Before Psychosis
        </h2>
        <p className="mb-6">
          In roughly 75% of cases, the first full psychotic episode doesn't arrive suddenly. It's preceded
          by a prodromal period --- a phase of subtle but accumulating changes in thinking, perception, and
          behavior that can last anywhere from weeks to
          years <Citation id="1" index={1} source="Schizophrenia Bulletin" year="2006" tier={1} />.
          During this phase, a person's inner world is shifting in ways they may not have words for.
          Thoughts may feel harder to organize. The world may begin to feel subtly strange --- not
          dramatically different, but off in a way that's hard to articulate.
        </p>
        <p className="mb-6">
          The challenge for families is that many prodromal symptoms overlap with experiences common in
          adolescence and young adulthood: mood swings, social withdrawal, academic struggle, sleep
          changes. This overlap is one reason the prodrome is so often missed. But research has identified
          patterns that distinguish prodromal psychosis from typical developmental
          change <Citation id="3" index={3} source="JAMA Psychiatry" year="2018" tier={1} />.
        </p>

        <ArticleCallout variant="warning" title="Important Distinction">
          <p>
            Prodromal symptoms alone don't confirm that someone will develop psychosis. Approximately
            20--35% of people identified as "clinical high-risk" go on to have a psychotic episode. The
            goal of early recognition isn't to diagnose --- it's to get a professional evaluation so the
            right support can begin.
          </p>
        </ArticleCallout>

        <h2 id="signs-to-watch" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Signs Families Should Watch For
        </h2>
        <p className="mb-6">
          Research identifies several categories of early warning signs. No single sign is diagnostic on
          its own. It's the pattern --- multiple signs appearing together, persisting, and worsening over
          time --- that warrants
          concern <Citation id="9" index={9} source="National Institute of Mental Health" year="2024" tier={2} />.
        </p>
        <p className="mb-6">
          <strong>Social withdrawal</strong> is the most commonly reported prodromal sign, appearing in
          over 60% of cases. This isn't the introversion of a quiet teenager --- it's a person who was
          previously social becoming increasingly isolated, avoiding eye contact, declining invitations,
          and eventually withdrawing even from close family
          members <Citation id="3" index={3} source="JAMA Psychiatry" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Cognitive changes</strong> often appear early: difficulty concentrating, trouble following
          conversations, a sense that thoughts are speeding up or becoming fragmented. Academic or work
          performance declines not because of laziness but because the cognitive machinery required for
          sustained attention and sequential reasoning is being disrupted.
        </p>
        <p className="mb-6">
          <strong>Perceptual disturbances</strong> in the prodrome are typically attenuated --- not full
          hallucinations, but experiences that hover at the edge of perception. A person might report
          hearing faint sounds or voices, seeing shadows or movements in their peripheral vision, or
          feeling that everyday objects or environments look strange or unfamiliar (a phenomenon called
          derealisation).
        </p>

        <ArticleChart
          type="bar"
          title="Most Common Prodromal Signs (% of First-Episode Cases)"
          data={[
            { label: 'Social withdrawal', value: 65 },
            { label: 'Declining function', value: 58 },
            { label: 'Suspiciousness', value: 48 },
            { label: 'Sleep disruption', value: 45 },
            { label: 'Concentration difficulty', value: 42 },
            { label: 'Perceptual changes', value: 35 },
            { label: 'Unusual beliefs', value: 30 },
          ]}
          source="JAMA Psychiatry, 2018; Schizophrenia Bulletin, 2006"
        />

        <p className="mb-6">
          <strong>Increased suspiciousness</strong> may manifest as distrust of friends, family, or
          institutions that the person previously trusted. They might express concern about being watched,
          recorded, or talked about. <strong>Mood changes</strong> --- particularly depression, anxiety, and
          irritability --- are common but often attributed to other causes. And <strong>sleep disruption</strong>,
          particularly significant insomnia with no clear external cause, appears in nearly half of prodromal
          cases and may itself contribute to the neurological cascade that precipitates
          psychosis <Citation id="6" index={6} source="NICE" year="2024" tier={3} />.
        </p>

        <h2 id="age-and-gender" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When It Happens: Age, Gender, and Risk Windows
        </h2>
        <p className="mb-6">
          First psychotic episodes most commonly occur in late adolescence and early adulthood. For males,
          the peak window is 18--25; for females, it's somewhat later, at
          25--35 <Citation id="4" index={4} source="European Psychiatry" year="2017" tier={1} />.
          This timing isn't coincidental. The brain undergoes extensive remodeling during these years ---
          particularly in the prefrontal cortex, which governs reasoning, planning, and reality testing.
          The neurodevelopmental changes of adolescence, combined with the stress of identity formation,
          academic pressure, and early independence, create a period of heightened vulnerability.
        </p>
        <p className="mb-6">
          This means families of adolescents and young adults are the most important first observers. They're
          also the people most likely to dismiss prodromal signs as "just a phase." SAMHSA recommends that
          families who notice a cluster of prodromal signs persisting for more than two weeks seek a
          professional evaluation --- not because a diagnosis is certain, but because early assessment opens the
          door to early
          intervention <Citation id="7" index={7} source="SAMHSA" year="2023" tier={2} />.
        </p>

        <h2 id="what-to-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Families Can Do
        </h2>
        <p className="mb-6">
          The single most important thing families can do is reduce the duration of untreated psychosis.
          A meta-analysis in the <em>British Journal of Psychiatry</em> found that longer durations of
          untreated psychosis are associated with worse treatment response, greater cognitive decline, and
          higher relapse rates. Conversely, when treatment begins early --- particularly within the first
          year of symptoms --- recovery rates are substantially
          better <Citation id="2" index={2} source="British Journal of Psychiatry" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          Practically, this means creating an environment where the person feels safe enough to disclose
          unusual experiences. Many people in the prodrome are aware that something is changing but fear
          being labeled "crazy" or institutionalized. A family that can say, "We've noticed some changes,
          and we want to understand what you're going through --- without judgment" is far more likely to
          facilitate help-seeking than one that reacts with panic or
          denial <Citation id="8" index={8} source="Psychological Medicine" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          Early psychosis intervention programs exist in many countries and are specifically designed to
          evaluate people in the prodromal or early phases of psychosis. These programs typically offer
          comprehensive assessment, cognitive behavioral therapy, family education, and, when appropriate,
          low-dose medication --- all in a non-stigmatizing
          environment <Citation id="5" index={5} source="JAMA Psychiatry" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="tip" title="Finding Early Intervention Services">
          <p>
            In the United States, SAMHSA maintains a directory of early psychosis intervention programs. In
            the UK, NICE guidelines mandate access to early intervention services within two weeks of referral.
            In Australia, headspace and EPPIC provide youth-focused early psychosis care. Ask your primary care
            provider about local early intervention options.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-004 | First Episode Psychosis
  // --------------------------------------------------------------------------
  {
    id: catId(4),
    slug: 'first-episode-psychosis-what-happens-and-what-helps',
    status: 'published',
    title: 'First Episode Psychosis: What Happens and What Helps',
    description: 'What to expect during a first psychotic episode --- from initial symptoms through diagnosis and treatment --- plus the evidence-based approaches that give people the best chance of recovery.',
    image: '/images/articles/cat16/cover-004.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['First Episode Psychosis', 'Treatment', 'Recovery', 'Early Intervention'],

    summary: 'A first episode of psychosis is one of the most disorienting experiences a person --- and their family --- can go through. The sudden disruption of reality can feel catastrophic. But it doesn\'t have to define the future. Research from the past two decades consistently shows that early, comprehensive treatment during and after a first psychotic episode dramatically improves long-term outcomes. Coordinated specialty care programs, which combine low-dose medication, individual therapy, family education, and supported employment or education, have become the gold standard. With the right support, many people who experience a first episode of psychosis go on to live full, productive lives.',

    keyFacts: [
      { text: 'Coordinated specialty care (CSC) programs reduce hospitalization rates by 34--50% compared to treatment as usual', citationIndex: 1 },
      { text: 'Only 20--30% of people who experience a first psychotic episode go on to develop chronic schizophrenia', citationIndex: 2 },
      { text: 'The RAISE study demonstrated that CSC improves quality of life, symptom severity, and work/school participation', citationIndex: 3 },
      { text: 'Low-dose antipsychotic medication during first episode psychosis is effective for 70--80% of people', citationIndex: 4 },
      { text: 'Family involvement in treatment is associated with a 20% reduction in relapse rates', citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'A first psychotic episode isn\'t an ending. Research consistently shows it\'s a fork in the road --- and the direction a person takes depends enormously on what kind of support they receive in the first 12 months. That window matters more than almost any other variable in predicting long-term outcomes.',

    practicalExercise: {
      title: 'First Steps After a First Episode',
      steps: [
        { title: 'Connect with a specialized program', description: 'Search for a coordinated specialty care (CSC) or early intervention in psychosis (EIP) program in your area. In the US, SAMHSA\'s Early Serious Mental Illness Locator can help: https://www.samhsa.gov/esmi-treatment-locator' },
        { title: 'Engage the family', description: 'Family involvement is not optional --- it\'s evidence-based. Ask the treatment team about family psychoeducation programs that teach communication skills and reduce expressed emotion.' },
        { title: 'Prioritize daily structure', description: 'Maintaining a consistent daily routine --- regular sleep times, meals, and light physical activity --- supports neurological recovery and reduces relapse risk.' },
        { title: 'Don\'t rush the timeline', description: 'Recovery from a first episode takes time. Avoid major life decisions in the first 3--6 months. Focus on stabilization, not acceleration.' },
      ],
      toolLink: '/tools/sleep-architect',
      toolLabel: 'Build a Recovery Sleep Routine',
    },

    citations: [
      { id: '1', text: 'Specialized early intervention services for first-episode psychosis: A systematic review and meta-analysis', source: 'JAMA Psychiatry', year: '2020', link: 'https://doi.org/10.1001/jamapsychiatry.2019.3199', tier: 1 },
      { id: '2', text: 'Outcomes of first-episode psychosis: A systematic review', source: 'British Journal of Psychiatry', year: '2017', link: 'https://doi.org/10.1192/bjp.bp.116.186692', tier: 1 },
      { id: '3', text: 'Comprehensive versus usual community care for first-episode psychosis: 2-year outcomes from the NIMH RAISE early treatment program', source: 'American Journal of Psychiatry', year: '2016', link: 'https://doi.org/10.1176/appi.ajp.2015.15050632', tier: 1 },
      { id: '4', text: 'Antipsychotic treatment of first-episode psychosis: A systematic review and network meta-analysis', source: 'The Lancet Psychiatry', year: '2020', link: 'https://doi.org/10.1016/S2215-0366(20)30014-X', tier: 1 },
      { id: '5', text: 'Family intervention for psychosis: A systematic review and meta-analysis', source: 'Psychological Medicine', year: '2019', link: 'https://doi.org/10.1017/S0033291719000175', tier: 1 },
      { id: '6', text: 'Understanding psychosis', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/publications/understanding-psychosis', tier: 2 },
      { id: '7', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '8', text: 'Recovery After an Initial Schizophrenia Episode (RAISE) Project', source: 'National Institute of Mental Health', year: '2023', link: 'https://www.nimh.nih.gov/research/research-funded-by-nimh/research-initiatives/recovery-after-an-initial-schizophrenia-episode-raise', tier: 2 },
      { id: '9', text: 'Cognitive behavioural therapy for psychosis: Current evidence and future directions', source: 'World Psychiatry', year: '2019', link: 'https://doi.org/10.1002/wps.20624', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            The first time psychosis happens, it's terrifying --- for the person experiencing it and for everyone
            around them. Reality fractures. The person may hear voices that feel as real as any conversation,
            hold beliefs that no amount of evidence can shake, or behave in ways that seem completely out of
            character. For families, the instinct is often to panic, to call for emergency help, to wonder
            whether their loved one will ever be "the same." The answer, backed by decades of research, is
            that the first episode doesn't determine the future. What happens <em>after</em> it does.
          </p>
        </div>

        <h2 id="what-a-first-episode-looks-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What a First Episode Actually Looks Like
        </h2>
        <p className="mb-6">
          A first psychotic episode typically emerges from the prodromal phase described in earlier articles
          in this series. The transition from prodrome to active psychosis can be gradual or sudden. In
          some cases, a triggering event --- extreme stress, sleep deprivation, substance use, or a medical
          illness --- pushes a vulnerable brain past its
          threshold <Citation id="6" index={6} source="National Institute of Mental Health" year="2024" tier={2} />.
        </p>
        <p className="mb-6">
          The most common symptom during a first episode is <strong>auditory hallucinations</strong> ---
          hearing voices that others can't hear. These voices may be critical, commanding, or conversational.
          <strong>Delusions</strong> --- fixed false beliefs --- are the second most common feature, often
          involving persecution (belief that one is being followed, surveilled, or targeted), reference
          (belief that random events are personally meaningful), or grandiosity (belief in special powers
          or identity). <strong>Disorganized thinking</strong> manifests as speech that's hard to follow,
          tangential, or packed with unusual word associations.
        </p>
        <p className="mb-6">
          What's often overlooked is the <strong>subjective experience</strong> of a first episode. Many
          people report overwhelming confusion, terror, and a sense of the world becoming profoundly strange.
          They may simultaneously recognize that something is wrong and be unable to articulate what it is.
          This internal distress --- invisible to observers --- is a major driver of the trauma that often
          accompanies psychosis.
        </p>

        <StatCard
          stats={[
            { value: 70, suffix: '%', label: 'Respond to antipsychotics during first episode' },
            { value: 34, suffix: '%', label: 'Reduction in hospitalization with CSC' },
            { value: 20, suffix: '%', label: 'Relapse reduction with family involvement' },
          ]}
          source="Lancet Psychiatry, 2020; JAMA Psychiatry, 2020; Psychological Medicine, 2019"
        />

        <h2 id="coordinated-specialty-care" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Coordinated Specialty Care: The Treatment That Works
        </h2>
        <p className="mb-6">
          The single most important advancement in first-episode psychosis treatment is <strong>coordinated
          specialty care (CSC)</strong> --- a team-based approach that integrates multiple evidence-based
          interventions simultaneously. The NIMH-funded RAISE study (Recovery After an Initial Schizophrenia
          Episode) demonstrated that CSC, compared to treatment as usual, leads to significantly greater
          improvements in quality of life, symptom severity, and participation in school or
          work <Citation id="3" index={3} source="American Journal of Psychiatry" year="2016" tier={1} />.
        </p>
        <p className="mb-6">
          A typical CSC team includes a psychiatrist who prescribes low-dose antipsychotic medication, a
          therapist providing individual cognitive behavioral therapy for psychosis (CBTp), a family
          therapist delivering psychoeducation and communication skills training, and a case manager who
          supports employment or education goals. This multidisciplinary approach reflects the recognition
          that psychosis affects every domain of a person's life --- not just their
          symptoms <Citation id="8" index={8} source="National Institute of Mental Health" year="2023" tier={2} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="The First 12 Months Matter Most">
          <p>
            A meta-analysis of early intervention services found that the first 12 months after a psychotic
            episode represent a critical window. Treatment initiated during this period is associated with
            substantially better outcomes than treatment delayed by even a year. This is why early intervention
            programs are designed to engage people quickly --- often within days of
            referral <Citation id="1" index={1} source="JAMA Psychiatry" year="2020" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="medication-in-first-episode" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Medication: Starting Low, Going Slow
        </h2>
        <p className="mb-6">
          Antipsychotic medication is the cornerstone of acute treatment for first-episode psychosis. A
          network meta-analysis published in <em>The Lancet Psychiatry</em> found that 70--80% of people
          experiencing a first psychotic episode respond to antipsychotic medication, a much higher
          response rate than in chronic
          schizophrenia <Citation id="4" index={4} source="The Lancet Psychiatry" year="2020" tier={1} />.
          The key principle is "start low, go slow" --- people in their first episode are often more
          sensitive to both the therapeutic effects and side effects of antipsychotics, so lower doses
          are typically sufficient and better tolerated.
        </p>
        <p className="mb-6">
          NICE guidelines recommend that clinicians discuss the benefits and risks of medication with the
          patient and, where possible, involve them in the decision-making
          process <Citation id="7" index={7} source="NICE" year="2024" tier={3} />. This is important
          because medication adherence is one of the strongest predictors of relapse prevention, and
          adherence is higher when people feel they've had agency in their treatment decisions. Side effects
          --- including weight gain, sedation, and movement abnormalities --- should be monitored from the
          outset, with metabolic screening at regular intervals.
        </p>

        <h2 id="therapy-and-family" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Therapy and Family Involvement: The Other Half of Treatment
        </h2>
        <p className="mb-6">
          Medication manages symptoms. Therapy helps people make sense of what happened to them. Cognitive
          behavioral therapy for psychosis (CBTp) has strong evidence for reducing distress, improving
          coping strategies, and preventing
          relapse <Citation id="9" index={9} source="World Psychiatry" year="2019" tier={1} />.
          Unlike traditional CBT, CBTp doesn't attempt to "disprove" delusions or hallucinations.
          Instead, it helps people examine the beliefs and emotional responses associated with their
          psychotic experiences, develop alternative explanations, and build practical coping strategies
          for managing distressing symptoms.
        </p>
        <p className="mb-6">
          Family intervention is equally critical. A 2019 meta-analysis found that family involvement in
          treatment --- through psychoeducation, communication skills training, and problem-solving therapy ---
          reduces relapse rates by approximately
          20% <Citation id="5" index={5} source="Psychological Medicine" year="2019" tier={1} />.
          Families who understand psychosis, know what to expect during recovery, and have tools for
          managing crisis situations provide a stabilizing environment that medication alone can't replicate.
          The concept of "expressed emotion" --- the level of criticism, hostility, and emotional
          overinvolvement within a family --- has been identified as one of the most robust predictors of
          relapse. Family interventions specifically target reducing expressed emotion.
        </p>
        <p className="mb-6">
          Recovery from a first episode isn't linear. There are setbacks, plateaus, and periods of
          uncertainty. But the trajectory is overwhelmingly positive when comprehensive treatment begins
          early. Only 20--30% of people who experience a first episode go on to develop chronic
          schizophrenia <Citation id="2" index={2} source="British Journal of Psychiatry" year="2017" tier={1} />.
          The rest recover fully, have isolated recurrences that respond to brief intervention, or develop
          a stable pattern that allows them to live independently with appropriate support.
        </p>

        <QuoteBlock
          quote="The question after a first episode isn't 'Will they recover?' It's 'Will they get the right help in time?'"
          attribution="NIMH RAISE Project"
          source="Recovery After an Initial Schizophrenia Episode"
          variant="default"
        />
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-005 | The Neuroscience of Psychosis
  // --------------------------------------------------------------------------
  {
    id: catId(5),
    slug: 'neuroscience-of-psychosis-dopamine-glutamate-brain-connectivity',
    status: 'published',
    title: 'The Neuroscience of Psychosis: Dopamine, Glutamate, and Brain Connectivity',
    description: 'A clear, evidence-based exploration of the brain mechanisms behind psychosis --- from the dopamine hypothesis to glutamate signaling, neuroinflammation, and structural brain changes.',
    image: '/images/articles/cat16/cover-005.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Neuroscience', 'Psychosis', 'Dopamine', 'Research Digest'],

    summary: 'The neuroscience of psychosis has evolved dramatically over the past five decades. The original dopamine hypothesis --- which proposed that psychosis results from excessive dopamine activity --- remains relevant but now represents just one piece of a more complex puzzle. Modern research implicates glutamate signaling dysfunction, disrupted connectivity between brain regions, neuroinflammation, and structural changes in the prefrontal cortex and temporal lobes. Understanding these mechanisms doesn\'t just satisfy scientific curiosity; it directly shapes treatment. Current antipsychotics target dopamine. The next generation of treatments, now in clinical trials, targets glutamate and inflammation --- potentially offering relief for the cognitive and negative symptoms that existing medications barely touch.',

    keyFacts: [
      { text: 'All currently approved antipsychotic medications work primarily by blocking dopamine D2 receptors', citationIndex: 1 },
      { text: 'Brain imaging studies show elevated presynaptic dopamine synthesis capacity in the striatum of people with psychosis', citationIndex: 2 },
      { text: 'Drugs that block glutamate NMDA receptors (like ketamine and PCP) can produce psychosis-like symptoms in healthy volunteers', citationIndex: 3 },
      { text: 'Reduced gray matter volume in the prefrontal cortex is among the most replicated findings in schizophrenia research', citationIndex: 4 },
      { text: 'Elevated levels of inflammatory markers (C-reactive protein, IL-6) have been found in a subset of people during first-episode psychosis', citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The brain doesn\'t "break" in psychosis. It misallocates. The dopamine system that normally helps you distinguish important signals from background noise starts treating everything as urgent and meaningful. A random pattern becomes a coded message. A stranger\'s glance becomes surveillance. The machinery is the same --- it\'s the calibration that\'s off.',

    practicalExercise: {
      title: 'Understanding Your Brain\'s Signal System',
      steps: [
        { title: 'Notice salience in daily life', description: 'Throughout your day, notice what your brain treats as "important" --- a car horn, your name being called, a notification sound. This is your dopamine salience system working correctly.' },
        { title: 'Consider misallocated salience', description: 'Imagine if that system became overactive --- if every sound, pattern, and coincidence felt equally urgent and meaningful. This is a simplified model of what happens in psychotic experiences.' },
        { title: 'Appreciate the complexity', description: 'Psychosis involves multiple brain systems, not just dopamine. Keep this in mind when you encounter simplistic explanations that reduce mental illness to a "chemical imbalance."' },
      ],
      toolLink: '/clarity-score',
      toolLabel: 'Explore the Clarity Score Assessment',
    },

    citations: [
      { id: '1', text: 'The dopamine hypothesis of schizophrenia: Version III---The final common pathway', source: 'Schizophrenia Bulletin', year: '2009', link: 'https://doi.org/10.1093/schbul/sbp006', tier: 1 },
      { id: '2', text: 'Presynaptic dopamine synthesis capacity in patients with schizophrenia: A meta-analysis of PET and SPECT imaging studies', source: 'JAMA Psychiatry', year: '2012', link: 'https://doi.org/10.1001/archgenpsychiatry.2011.1607', tier: 1 },
      { id: '3', text: 'Glutamate and the pathophysiology of schizophrenia: A comprehensive review', source: 'Schizophrenia Research', year: '2020', link: 'https://doi.org/10.1016/j.schres.2019.10.049', tier: 1 },
      { id: '4', text: 'Progressive brain changes in schizophrenia: A prospective longitudinal study of first-episode schizophrenia', source: 'British Journal of Psychiatry', year: '2012', link: 'https://doi.org/10.1192/bjp.bp.111.097139', tier: 1 },
      { id: '5', text: 'Inflammation in schizophrenia: A question of balance', source: 'The Lancet Psychiatry', year: '2019', link: 'https://doi.org/10.1016/S2215-0366(19)30227-7', tier: 1 },
      { id: '6', text: 'Dysconnectivity in schizophrenia: Convergence of imaging and molecular evidence', source: 'Biological Psychiatry', year: '2016', link: 'https://doi.org/10.1016/j.biopsych.2015.12.005', tier: 1 },
      { id: '7', text: 'Aberrant salience in first-episode psychosis', source: 'Psychological Medicine', year: '2017', link: 'https://doi.org/10.1017/S0033291716003573', tier: 1 },
      { id: '8', text: 'Schizophrenia fact sheet', source: 'World Health Organization', year: '2024', link: 'https://www.who.int/news-room/fact-sheets/detail/schizophrenia', tier: 2 },
      { id: '9', text: 'Understanding psychosis', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/publications/understanding-psychosis', tier: 2 },
      { id: '10', text: 'Glutamate-based therapeutic approaches: Clinical trials in schizophrenia', source: 'Current Neuropharmacology', year: '2021', link: 'https://doi.org/10.2174/1570159X19666210127095853', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            For decades, the explanation for psychosis boiled down to four words: "too much dopamine."
            That explanation wasn't wrong --- but it was incomplete. Like explaining a car crash by saying
            "the brakes failed" without examining the road conditions, the tires, the driver's
            alertness, and the weather. The neuroscience of psychosis has matured into a multisystem
            model that implicates dopamine, glutamate, brain connectivity, inflammation, and structural
            changes. Understanding these systems isn't just academic. It determines which treatments work,
            which don't, and what the next generation of therapies might look like.
          </p>
        </div>

        <h2 id="dopamine-hypothesis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Dopamine Hypothesis: Still Relevant, No Longer Sufficient
        </h2>
        <p className="mb-6">
          The dopamine hypothesis remains the most influential neurobiological model of psychosis. In
          its current form --- what researcher Oliver Howes calls "Version III" --- it proposes that the
          final common pathway to psychotic symptoms is elevated presynaptic dopamine synthesis and
          release in the striatum, a brain region involved in assigning salience and motivational
          significance to
          stimuli <Citation id="1" index={1} source="Schizophrenia Bulletin" year="2009" tier={1} />.
        </p>
        <p className="mb-6">
          The evidence for this model is substantial. Positron emission tomography (PET) studies
          consistently show that people experiencing psychosis have elevated dopamine synthesis capacity
          in the striatum --- their brains are literally producing more dopamine precursors than those of
          healthy
          controls <Citation id="2" index={2} source="JAMA Psychiatry" year="2012" tier={1} />.
          This excess dopamine causes the brain to assign profound importance to stimuli that would
          normally be filtered as irrelevant --- a phenomenon called <strong>aberrant salience</strong>.
          A passing stranger's cough becomes a coded signal. A sequence of license plate numbers becomes
          a message. The brain is not generating delusions from nothing; it's misinterpreting real
          environmental data through a broken filter.
        </p>

        <ArticleCallout variant="did-you-know" title="The Salience Model">
          <p>
            Aberrant salience --- the brain assigning excessive importance to irrelevant stimuli --- was formally
            described in a 2017 study as the cognitive mechanism through which dopamine dysfunction produces
            psychotic
            symptoms <Citation id="7" index={7} source="Psychological Medicine" year="2017" tier={1} />.
            The person experiencing psychosis isn't "imagining things." Their salience detection system is
            miscalibrated, making the irrelevant feel urgent and the random feel purposeful.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          Every currently approved antipsychotic medication works, at least in part, by blocking dopamine
          D2 receptors in the mesolimbic pathway. This reduces the signal strength of aberrant salience,
          which is why antipsychotics are most effective against positive symptoms --- hallucinations and
          delusions. But they do relatively little for negative symptoms (emotional flatness, social
          withdrawal, amotivation) or cognitive symptoms (memory impairment, difficulty with executive
          function), which is a major limitation of the dopamine model
          alone <Citation id="9" index={9} source="National Institute of Mental Health" year="2024" tier={2} />.
        </p>

        <h2 id="glutamate-hypothesis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Glutamate Hypothesis: A Missing Piece
        </h2>
        <p className="mb-6">
          The glutamate hypothesis emerged from a striking observation: drugs that block glutamate NMDA
          receptors --- most notably phencyclidine (PCP) and ketamine --- can produce symptoms in healthy
          people that look remarkably like schizophrenia, including not just hallucinations and delusions
          but also the negative and cognitive symptoms that dopamine-blocking drugs don't
          address <Citation id="3" index={3} source="Schizophrenia Research" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          Glutamate is the brain's primary excitatory neurotransmitter, involved in nearly every aspect
          of neural communication. The hypothesis proposes that <strong>hypofunction of NMDA receptors</strong>
          --- particularly on inhibitory interneurons in the prefrontal cortex --- leads to a cascade of
          downstream effects: cortical disinhibition, excess glutamate release, excitotoxicity, and
          ultimately the disruption of prefrontal circuits responsible for working memory, cognitive
          flexibility, and reality testing.
        </p>
        <p className="mb-6">
          What makes the glutamate model so important is that it potentially explains the cognitive and
          negative symptoms that the dopamine model --- and current antipsychotics --- largely fail to
          address. Several glutamate-modulating compounds are currently in clinical
          trials <Citation id="10" index={10} source="Current Neuropharmacology" year="2021" tier={1} />.
          If successful, they could represent the first mechanistically novel class of antipsychotics in
          over 50 years.
        </p>

        <ArticleChart
          type="bar"
          title="What Current Antipsychotics Treat vs. Don't Treat"
          data={[
            { label: 'Hallucinations (positive)', value: 80 },
            { label: 'Delusions (positive)', value: 75 },
            { label: 'Disorganized thinking', value: 60 },
            { label: 'Agitation', value: 70 },
            { label: 'Flat affect (negative)', value: 15 },
            { label: 'Amotivation (negative)', value: 10 },
            { label: 'Working memory (cognitive)', value: 5 },
            { label: 'Executive function (cognitive)', value: 8 },
          ]}
          source="Compiled from multiple meta-analyses; approximate response rates"
        />

        <h2 id="connectivity-and-structure" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Brain Connectivity and Structural Changes
        </h2>
        <p className="mb-6">
          Beyond neurotransmitters, psychosis involves disruptions in how brain regions communicate with
          each other. A 2016 paper in <em>Biological Psychiatry</em> described schizophrenia as a
          "dysconnection syndrome" --- a condition where the functional and structural connections between
          brain regions (particularly between the prefrontal cortex, temporal lobes, and limbic system)
          are
          impaired <Citation id="6" index={6} source="Biological Psychiatry" year="2016" tier={1} />.
        </p>
        <p className="mb-6">
          Structural imaging studies have identified reduced gray matter volume in the prefrontal cortex
          and temporal lobes of people with schizophrenia --- among the most replicated findings in the
          entire
          field <Citation id="4" index={4} source="British Journal of Psychiatry" year="2012" tier={1} />.
          The prefrontal cortex is critical for planning, reasoning, and reality testing. The temporal
          lobes process auditory information and language. It's no coincidence that the most common
          hallucination in psychosis --- hearing voices --- maps onto the brain regions that show the greatest
          structural changes.
        </p>
        <p className="mb-6">
          These structural changes are progressive in some individuals but not in others, and they appear
          to be partially influenced by treatment --- with evidence suggesting that early antipsychotic
          treatment may slow (though not halt) gray matter loss. This is one more argument for early
          intervention: the longer psychosis goes untreated, the more opportunity exists for potentially
          irreversible brain changes.
        </p>

        <h2 id="inflammation-and-immune" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Neuroinflammation: The Emerging Frontier
        </h2>
        <p className="mb-6">
          One of the most exciting developments in psychosis research is the recognition that the immune
          system may play a significant role. A 2019 review in <em>The Lancet Psychiatry</em> documented
          elevated levels of inflammatory markers --- including C-reactive protein (CRP), interleukin-6
          (IL-6), and tumor necrosis factor alpha (TNF-α) --- in a substantial subset of people with
          psychosis, particularly during first
          episodes <Citation id="5" index={5} source="The Lancet Psychiatry" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          Neuroinflammation doesn't affect everyone with psychosis equally. Research suggests that
          approximately 30--40% of people with schizophrenia show elevated inflammatory markers, raising
          the possibility of an "inflammatory subtype" that might respond to different treatments. Clinical
          trials of anti-inflammatory adjuncts --- including celecoxib, minocycline, and aspirin --- have
          shown mixed but promising results in some patient populations.
        </p>
        <p className="mb-6">
          The inflammation model also helps explain some of the epidemiological patterns of psychosis.
          Maternal infection during pregnancy, childhood adversity (which produces chronic low-grade
          inflammation through sustained stress responses), and autoimmune conditions are all risk factors
          for psychosis --- and all involve immune system
          activation <Citation id="8" index={8} source="World Health Organization" year="2024" tier={2} />.
        </p>

        <ArticleCallout variant="info" title="Why Multiple Systems Matter">
          <p>
            The neuroscience of psychosis is converging on a model where dopamine, glutamate, connectivity,
            and inflammation interact --- not in a single linear pathway, but in overlapping feedback loops.
            This is why no single medication fully treats all psychotic symptoms, and why future treatment
            strategies will likely combine agents targeting different systems. The era of "one drug, one
            mechanism" is giving way to precision psychiatry.
          </p>
        </ArticleCallout>
      </>
    ),
  },
];
