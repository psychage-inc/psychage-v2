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
  BeforeAfter,
} from '../../../components/article/blocks';

// ============================================================================
// Subcategory 1 — Understanding Psychosis | Articles 6–10
// ============================================================================

export const understandingPsychosisArticlesB: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-PSY-006 | Drug-Induced Psychosis
  // --------------------------------------------------------------------------
  {
    id: catId(6),
    slug: 'drug-induced-psychosis-when-substances-trigger-breaks-from-reality',
    title: 'Drug-Induced Psychosis: When Substances Trigger Breaks From Reality',
    description: 'An evidence-based guide to substance-induced psychosis — which drugs carry the highest risk, how it differs from primary psychotic disorders, and what recovery looks like.',
    image: '/images/articles/cat16/cover-006.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Psychosis', 'Substance Use', 'Cannabis', 'Methamphetamine'],

    summary: 'Substance-induced psychosis occurs when a drug — whether recreational, prescribed, or withdrawn abruptly — triggers hallucinations, delusions, or severely disorganized behavior. Cannabis, methamphetamine, cocaine, hallucinogens, and alcohol withdrawal are among the most common causes. For many people, substance-induced psychosis resolves once the drug clears the system. But for a significant minority — estimated at 25–35% — it marks the beginning of a primary psychotic disorder like schizophrenia. Distinguishing between substance-induced and primary psychosis is one of the most challenging tasks in clinical psychiatry, and getting it right determines whether someone receives the treatment they actually need.',

    keyFacts: [
      { text: 'Cannabis use during adolescence is associated with a 2- to 4-fold increased risk of developing psychosis, with higher potency products carrying greater risk', citationIndex: 1 },
      { text: 'Approximately 25–35% of people hospitalized for substance-induced psychosis later receive a diagnosis of a primary psychotic disorder', citationIndex: 2 },
      { text: 'Methamphetamine-induced psychosis can persist for weeks or months after last use, even with treatment', citationIndex: 3 },
      { text: 'Alcohol withdrawal psychosis (delirium tremens) carries a mortality rate of 1–5% without medical treatment', citationIndex: 4 },
      { text: 'The average time to diagnostic clarification — substance-induced vs. primary psychosis — is 3–5 years in clinical settings', citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The line between substance-induced psychosis and primary psychosis isn\'t always a line. For some people, the substance doesn\'t cause psychosis — it accelerates an underlying vulnerability that would have surfaced eventually. The drug pulls the trigger, but the gun was already loaded.',

    practicalExercise: {
      title: 'Assessing Substance-Related Risk',
      steps: [
        { title: 'Know the high-risk substances', description: 'Cannabis (especially high-THC products), methamphetamine, cocaine, synthetic cannabinoids, and hallucinogens carry the highest psychosis risk. Alcohol withdrawal can also trigger psychosis.' },
        { title: 'Watch for warning signs after use', description: 'If someone experiences paranoia, hears voices, or holds beliefs that don\'t match reality during or after substance use — and these persist beyond the expected duration of intoxication — seek medical evaluation.' },
        { title: 'Don\'t self-diagnose', description: 'Only a clinician can distinguish substance-induced from primary psychosis. If symptoms persist more than a few days after last use, a psychiatric evaluation is essential.' },
        { title: 'Consider harm reduction', description: 'If someone uses substances and has a family history of psychosis or schizophrenia, discuss risk reduction with a healthcare provider. Abstinence is the safest approach, but any reduction in use or potency reduces risk.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Use the Symptom Navigator',
    },

    citations: [
      { id: '1', text: 'Cannabis use and the risk of developing a psychotic disorder: A systematic review and meta-analysis', source: 'The Lancet Psychiatry', year: '2019', link: 'https://doi.org/10.1016/S2215-0366(19)30048-3', tier: 1 },
      { id: '2', text: 'Substance-induced psychosis: Diagnostic pitfalls and conversion to schizophrenia', source: 'Schizophrenia Bulletin', year: '2019', link: 'https://doi.org/10.1093/schbul/sby149', tier: 1 },
      { id: '3', text: 'Methamphetamine-associated psychosis: Clinical characteristics, treatment, and outcomes', source: 'Journal of Clinical Psychiatry', year: '2020', link: 'https://doi.org/10.4088/JCP.19r13174', tier: 1 },
      { id: '4', text: 'Alcohol withdrawal syndrome: Diagnosis and management', source: 'American Family Physician', year: '2023', link: 'https://www.aafp.org/pubs/afp/issues/2023/0500/alcohol-withdrawal.html', tier: 3 },
      { id: '5', text: 'Diagnostic stability and conversion in substance-induced psychosis: A systematic review and meta-analysis', source: 'Psychological Medicine', year: '2021', link: 'https://doi.org/10.1017/S0033291720004729', tier: 1 },
      { id: '6', text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', source: 'American Psychiatric Association', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
      { id: '7', text: 'Cannabis potency and risk for psychosis: An analysis of data from the EU-GEI study', source: 'The Lancet Psychiatry', year: '2019', link: 'https://doi.org/10.1016/S2215-0366(19)30048-3', tier: 1 },
      { id: '8', text: 'Substance use and psychosis: Clinical review', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '9', text: 'The relationship between substance use and psychotic disorders: Epidemiological evidence', source: 'World Health Organization', year: '2023', link: 'https://www.who.int/publications', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            A 22-year-old smokes a high-potency cannabis edible at a party. Four hours later, he's
            convinced his friends are plotting against him, hears whispered commentary about his every
            movement, and refuses to leave the bathroom. Is this a drug reaction that will pass? Or is
            it the opening act of something longer? The answer depends on biology, timing, and a set
            of clinical distinctions that even experienced psychiatrists find difficult to make in real
            time.
          </p>
        </div>

        <h2 id="which-substances" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Which Substances Trigger Psychosis — and How
        </h2>
        <p className="mb-6">
          Not all substances carry equal psychosis risk. The pharmacological profile of a drug — which
          neurotransmitter systems it activates — determines both the likelihood and character of
          substance-induced psychotic symptoms.
        </p>
        <p className="mb-6">
          <strong>Cannabis</strong> is the most widely studied. A 2019 meta-analysis published in
          <em>The Lancet Psychiatry</em> found that daily use of high-potency cannabis (THC content above
          10%) was associated with a nearly fivefold increased risk of psychosis compared to
          never-use <Citation id="1" index={1} source="The Lancet Psychiatry" year="2019" tier={1} />.
          The EU-GEI study estimated that if high-potency cannabis were not available, roughly 12% of
          first-episode psychosis cases across Europe could have been
          prevented <Citation id="7" index={7} source="The Lancet Psychiatry" year="2019" tier={1} />.
          THC increases dopamine release in the mesolimbic pathway — the same system implicated in
          primary psychosis — while CBD, the other major cannabinoid, may have antipsychotic properties.
          The shift toward high-THC, low-CBD products in many markets has likely increased population-level
          psychosis risk.
        </p>

        <ArticleChart
          type="bar"
          title="Relative Psychosis Risk by Substance"
          data={[
            { label: 'High-potency cannabis (daily)', value: 5 },
            { label: 'Methamphetamine', value: 11 },
            { label: 'Cocaine', value: 3 },
            { label: 'Synthetic cannabinoids', value: 8 },
            { label: 'Hallucinogens (LSD, psilocybin)', value: 1.5 },
            { label: 'Alcohol withdrawal', value: 4 },
          ]}
          source="Compiled from multiple meta-analyses; odds ratios relative to non-use"
        />

        <p className="mb-6">
          <strong>Methamphetamine</strong> poses the highest risk of any commonly used substance. A
          systematic review found that up to 40% of heavy methamphetamine users experience psychotic
          symptoms during active use, and approximately 25% continue to experience symptoms weeks to
          months after cessation — a uniquely persistent pattern attributed to methamphetamine's
          neurotoxic effects on dopamine
          neurons <Citation id="3" index={3} source="Journal of Clinical Psychiatry" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Cocaine</strong> can trigger paranoid psychosis during heavy use or binge episodes.
          <strong>Hallucinogens</strong> (LSD, psilocybin) produce perceptual distortions by definition,
          but true psychosis — with persistent delusions and loss of insight — is relatively rare and
          typically occurs in people with pre-existing vulnerability. <strong>Alcohol withdrawal</strong>,
          particularly delirium tremens, represents a medical emergency that can include vivid
          hallucinations, severe confusion, and autonomic instability, with a mortality rate of 1–5%
          without treatment <Citation id="4" index={4} source="American Family Physician" year="2023" tier={3} />.
        </p>

        <h2 id="substance-vs-primary" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Substance-Induced vs. Primary Psychosis: The Diagnostic Challenge
        </h2>
        <p className="mb-6">
          The DSM-5-TR defines substance-induced psychotic disorder as psychotic symptoms that develop
          during or shortly after substance intoxication or withdrawal, and that are not better explained
          by a primary psychotic
          disorder <Citation id="6" index={6} source="American Psychiatric Association" year="2022" tier={4} />.
          In practice, making this distinction is anything but straightforward — particularly in acute
          settings where a detailed substance use history may be unavailable and the patient is too
          distressed to provide one.
        </p>
        <p className="mb-6">
          Several features help clinicians differentiate. Substance-induced psychosis tends to resolve
          within days to weeks after the substance is cleared. The hallucinations are more often visual
          (rather than the auditory hallucinations typical of schizophrenia). The person's level of
          insight — their awareness that something is wrong — may fluctuate. And there's typically a
          clear temporal relationship between substance use and symptom
          onset <Citation id="8" index={8} source="NICE" year="2024" tier={3} />.
        </p>

        <ComparisonTable
          title="Substance-Induced vs. Primary Psychosis"
          columns={['Feature', 'Substance-Induced', 'Primary (Schizophrenia)']}
          items={[
            { feature: 'Onset', values: ['Closely linked to substance use', 'Gradual or spontaneous'] },
            { feature: 'Hallucination type', values: ['Often visual', 'Predominantly auditory'] },
            { feature: 'Duration', values: ['Days to weeks', 'Months to persistent'] },
            { feature: 'Insight', values: ['Often retained or fluctuating', 'Often impaired'] },
            { feature: 'Resolution with abstinence', values: ['Typical', 'Symptoms persist'] },
            { feature: 'Family history of psychosis', values: ['Less predictive', 'Significant risk factor'] },
          ]}
          highlightColumn={1}
        />

        <p className="mb-6">
          But here's the complication: a systematic review found that 25–35% of people initially
          diagnosed with substance-induced psychosis are later rediagnosed with a primary psychotic
          disorder — most commonly schizophrenia — within
          3–5 years <Citation id="2" index={2} source="Schizophrenia Bulletin" year="2019" tier={1} />.
          Cannabis-induced psychosis has the highest conversion rate (approximately 47% in some
          studies), followed by amphetamine-induced psychosis. This suggests that for a significant
          minority, the substance doesn't cause psychosis de novo — it unmasks or accelerates an
          underlying vulnerability.
        </p>

        <h2 id="treatment-and-recovery" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment Approaches and Recovery
        </h2>
        <p className="mb-6">
          Acute treatment for substance-induced psychosis depends on the substance involved. In all
          cases, ensuring the person's safety and providing a calm, low-stimulation environment is the
          first priority. For most substance-induced presentations, short-term antipsychotic medication
          (typically a second-generation antipsychotic like risperidone or olanzapine) can reduce acute
          symptoms. Benzodiazepines may be used for alcohol withdrawal psychosis or when agitation is
          severe <Citation id="8" index={8} source="NICE" year="2024" tier={3} />.
        </p>
        <p className="mb-6">
          The longer-term challenge is substance use itself. If the psychosis was genuinely
          substance-induced, continued use virtually guarantees recurrence. Treatment must therefore
          address both the psychosis and the substance use — a dual approach that's often called
          "integrated treatment." NICE guidelines recommend that people with co-occurring substance use
          and psychosis receive care from services equipped to manage both simultaneously, rather than
          being bounced between separate addiction and mental health
          services <Citation id="8" index={8} source="NICE" year="2024" tier={3} />.
        </p>
        <p className="mb-6">
          For people who do convert from substance-induced to primary psychosis, early recognition is
          critical. Clinicians are encouraged to monitor anyone with a substance-induced psychotic episode
          for at least 12 months, with follow-up assessments to detect emerging symptoms of a primary
          disorder <Citation id="5" index={5} source="Psychological Medicine" year="2021" tier={1} />.
          The goal is to catch the transition early and begin coordinated specialty care before the
          condition becomes entrenched.
        </p>

        <ArticleCallout variant="warning" title="High-Potency Cannabis and Adolescent Risk">
          <p>
            The adolescent brain is particularly vulnerable to cannabis-related psychosis risk because
            the endocannabinoid system is still developing. High-potency products — concentrates, dabs,
            and edibles with THC above 20% — carry substantially higher risk than lower-potency flower.
            Family history of psychosis amplifies this risk
            further <Citation id="9" index={9} source="World Health Organization" year="2023" tier={2} />.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-007 | Psychosis vs. Dissociation
  // --------------------------------------------------------------------------
  {
    id: catId(7),
    slug: 'psychosis-vs-dissociation-understanding-two-different-experiences',
    title: 'Psychosis vs. Dissociation: Understanding Two Different Experiences',
    description: 'How to distinguish psychotic experiences from dissociative ones — two fundamentally different conditions that are frequently confused, misdiagnosed, and mistreated.',
    image: '/images/articles/cat16/cover-007.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Psychosis', 'Dissociation', 'Differential Diagnosis', 'Trauma'],

    summary: 'Psychosis and dissociation are two of the most commonly confused experiences in mental health — both involve altered states of reality, but through entirely different mechanisms. Psychosis involves the brain generating false perceptions (hallucinations) and fixed false beliefs (delusions) that the person experiences as real. Dissociation involves a disconnection from one\'s own thoughts, feelings, body, or surroundings — a sense of unreality, detachment, or fragmented identity. The distinction matters enormously for treatment: antipsychotic medication helps psychosis but doesn\'t treat dissociation, while trauma-focused therapy helps dissociation but doesn\'t address psychosis. Misdiagnosis in either direction can lead to years of ineffective or harmful treatment.',

    keyFacts: [
      { text: 'Up to 50% of people with dissociative identity disorder (DID) have been previously misdiagnosed with a psychotic disorder', citationIndex: 1 },
      { text: 'Hearing voices occurs in both conditions but differs in quality: psychotic voices feel external, while dissociative voices often feel internal', citationIndex: 2 },
      { text: 'Dissociation is primarily rooted in trauma, while psychosis has a stronger neurobiological and genetic basis', citationIndex: 3 },
      { text: 'Antipsychotic medication is ineffective for dissociative symptoms and may cause harmful side effects without therapeutic benefit', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'In psychosis, the brain adds things that aren\'t there — voices, beliefs, patterns. In dissociation, the brain subtracts things that are — your sense of self, your connection to your body, your continuity of memory. One is a distortion of reality. The other is a disconnection from it.',

    practicalExercise: {
      title: 'Recognizing the Difference',
      steps: [
        { title: 'Ask about the quality of voices', description: 'If someone hears voices, ask whether they feel like they\'re coming from outside (more typical of psychosis) or from inside their head (more typical of dissociation). This single question can shift the entire diagnostic direction.' },
        { title: 'Look for trauma history', description: 'Dissociative experiences almost always have roots in childhood trauma, particularly repeated trauma. A thorough trauma history is essential for accurate assessment.' },
        { title: 'Assess reality testing', description: 'People with dissociation often retain insight — they know something feels "off." People with psychosis often lack insight into their symptoms. This isn\'t absolute, but it\'s a useful clinical guideline.' },
        { title: 'Advocate for proper assessment', description: 'If you or a loved one has been diagnosed with psychosis but the symptoms don\'t respond to antipsychotics, ask the treatment team to consider a dissociative disorders evaluation.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Explore the Symptom Navigator',
    },

    citations: [
      { id: '1', text: 'Dissociative identity disorder: Epidemiology, pathogenesis, clinical manifestations, course, assessment, and diagnosis', source: 'The Lancet Psychiatry', year: '2022', link: 'https://doi.org/10.1016/S2215-0366(22)00295-4', tier: 1 },
      { id: '2', text: 'Hallucinations in dissociative disorders and psychotic disorders: A comparative study', source: 'Schizophrenia Research', year: '2018', link: 'https://doi.org/10.1016/j.schres.2017.08.003', tier: 1 },
      { id: '3', text: 'Trauma and psychosis: Mediating pathways and clinical implications', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291720000719', tier: 1 },
      { id: '4', text: 'Pharmacological management of dissociative disorders: A systematic review', source: 'Journal of Trauma & Dissociation', year: '2021', link: 'https://doi.org/10.1080/15299732.2020.1869644', tier: 1 },
      { id: '5', text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', source: 'American Psychiatric Association', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
      { id: '6', text: 'Dissociation and psychosis: Converging evidence from neuroscience', source: 'British Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1192/bjp.2020.101', tier: 1 },
      { id: '7', text: 'Understanding dissociation', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/dissociative-disorders', tier: 2 },
      { id: '8', text: 'Guidelines for treating dissociative identity disorder in adults', source: 'International Society for the Study of Trauma and Dissociation', year: '2011', link: 'https://www.isst-d.org/resources/adult-treatment-guidelines/', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            A woman sits in an emergency department describing voices she hears throughout the day. The
            psychiatric resident reaches for an antipsychotic prescription pad. But a more detailed
            conversation reveals that the voices aren't external — they're inside her head, they have
            distinct personalities, and they seem to represent different parts of herself. She doesn't
            have psychosis. She has a dissociative disorder rooted in severe childhood trauma. The
            treatment she needs is fundamentally different — and the antipsychotic won't help.
          </p>
        </div>

        <h2 id="different-mechanisms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Two Different Mechanisms, Two Different Experiences
        </h2>
        <p className="mb-6">
          Psychosis and dissociation both involve altered experiences of reality, but through opposite
          mechanisms. In psychosis, the brain <em>adds</em> — it generates perceptions (voices, visions)
          and beliefs (delusions) that don't correspond to external reality. The person experiencing
          them typically believes they're real. In dissociation, the brain <em>subtracts</em> — it
          disconnects the person from their own thoughts, emotions, body, memories, or sense of
          identity. The person often retains some awareness that something is
          wrong <Citation id="6" index={6} source="British Journal of Psychiatry" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          The DSM-5-TR classifies these as separate disorder categories with distinct diagnostic criteria,
          underlying mechanisms, and treatment
          approaches <Citation id="5" index={5} source="American Psychiatric Association" year="2022" tier={4} />.
          Yet in clinical practice, they're frequently confused. Up to 50% of people with dissociative
          identity disorder have been previously misdiagnosed with a psychotic
          disorder <Citation id="1" index={1} source="The Lancet Psychiatry" year="2022" tier={1} /> — a
          misdiagnosis that leads to ineffective medication, delayed trauma treatment, and sometimes
          years of unnecessary suffering.
        </p>

        <ComparisonTable
          title="Psychosis vs. Dissociation: Key Differences"
          columns={['Feature', 'Psychosis', 'Dissociation']}
          items={[
            { feature: 'Core mechanism', values: ['Brain generates false perceptions/beliefs', 'Brain disconnects from self/reality'] },
            { feature: 'Hallucinations', values: ['Typically external ("heard from outside")', 'Typically internal ("voices in my head")'] },
            { feature: 'Insight', values: ['Often impaired', 'Often partially retained'] },
            { feature: 'Primary root', values: ['Neurobiological/genetic', 'Trauma-based'] },
            { feature: 'Response to antipsychotics', values: ['Positive symptoms improve', 'Minimal or no response'] },
            { feature: 'Primary treatment', values: ['Medication + CBTp', 'Trauma-focused therapy'] },
            { feature: 'Identity disruption', values: ['Rare', 'Central in DID/OSDD'] },
            { feature: 'Memory gaps', values: ['Uncommon', 'Common in dissociative disorders'] },
          ]}
          highlightColumn={2}
        />

        <h2 id="voice-hearing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Voice-Hearing: The Same Symptom, Different Experiences
        </h2>
        <p className="mb-6">
          Hearing voices is the symptom most responsible for diagnostic confusion between psychosis and
          dissociation, because it occurs in both. But the <em>quality</em> of the experience differs in
          ways that careful clinical assessment can
          distinguish <Citation id="2" index={2} source="Schizophrenia Research" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          In psychosis, voices are typically perceived as <strong>external</strong> — coming from outside
          the person's head, often from a specific location in space. They may comment on the person's
          behavior (a "running commentary"), issue commands, or discuss the person in the third person.
          The person often lacks insight into the non-reality of the voices and may develop elaborate
          explanations for their origin (surveillance equipment, telepathy, spiritual entities).
        </p>
        <p className="mb-6">
          In dissociation, voices are more often perceived as <strong>internal</strong> — experienced
          inside the person's head, as though different parts of themselves are speaking. In dissociative
          identity disorder, these voices may represent distinct identity states (alters) with their own
          names, ages, and perspectives. The person often retains some awareness that these are "not
          normal" voices, even if they feel compelling. The voices may argue with each other, provide
          commentary, or represent age-regressed states of the person
          themselves <Citation id="1" index={1} source="The Lancet Psychiatry" year="2022" tier={1} />.
        </p>

        <ArticleCallout variant="clinical-note" title="The Schneider Problem">
          <p>
            For decades, certain types of hallucinations — hearing voices arguing, hearing a running
            commentary — were considered "first-rank symptoms" of schizophrenia (Schneider's criteria).
            Research has since shown that these experiences also occur frequently in dissociative
            disorders, undermining their diagnostic specificity. Clinicians who rely on Schneider's
            criteria alone risk systematic misdiagnosis.
          </p>
        </ArticleCallout>

        <h2 id="trauma-connection" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Trauma Factor
        </h2>
        <p className="mb-6">
          Dissociative disorders are overwhelmingly rooted in early childhood trauma — particularly
          repeated interpersonal trauma such as physical abuse, sexual abuse, emotional neglect, or
          organized exploitation. Dissociation is understood as a survival mechanism: when a child
          cannot physically escape overwhelming experiences, the mind creates psychological escape
          through compartmentalization of memories, emotions, and identity
          states <Citation id="3" index={3} source="Psychological Medicine" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          Psychosis has a more complex etiology. While trauma is increasingly recognized as a risk
          factor for psychosis — with a dose-response relationship between childhood adversity and
          psychosis risk — it's one of many contributing factors alongside genetics, neurodevelopmental
          disruption, substance use, and social
          determinants <Citation id="3" index={3} source="Psychological Medicine" year="2020" tier={1} />.
          When a person with psychosis has a significant trauma history, clinicians face the most
          difficult diagnostic challenge: is this trauma-related dissociation, trauma-associated
          psychosis, or both?
        </p>

        <h2 id="treatment-implications" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Getting the Diagnosis Right Changes Everything
        </h2>
        <p className="mb-6">
          The treatment implications of this distinction are profound. Antipsychotic medications — the
          first-line treatment for psychosis — have been shown to be largely ineffective for
          dissociative
          symptoms <Citation id="4" index={4} source="Journal of Trauma & Dissociation" year="2021" tier={1} />.
          Prescribing them to someone with a dissociative disorder means exposing them to significant
          side effects (weight gain, metabolic changes, sedation, movement abnormalities) without
          therapeutic benefit.
        </p>
        <p className="mb-6">
          Conversely, the gold-standard treatment for dissociative disorders — phased trauma-focused
          therapy as outlined by the International Society for the Study of Trauma and Dissociation —
          requires establishing safety, developing grounding skills, and eventually processing traumatic
          memories in a carefully paced
          manner <Citation id="8" index={8} source="ISSTD" year="2011" tier={3} />.
          This approach is fundamentally different from cognitive behavioral therapy for psychosis and
          requires specialized training that many clinicians don't receive.
        </p>
        <p className="mb-6">
          The clinical pathway from misdiagnosis to correct diagnosis averages years, not months. During
          that time, people may cycle through multiple antipsychotic medications, experience unnecessary
          hospitalizations, and carry a stigmatizing label that doesn't match their actual
          condition <Citation id="7" index={7} source="National Institute of Mental Health" year="2024" tier={2} />.
          Improving clinician education about the differences between psychosis and dissociation — and
          the importance of comprehensive trauma assessment — is one of the most impactful steps the
          mental health system can take.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            If you or someone you know has been diagnosed with psychosis but hasn't responded to
            antipsychotic medication, has a significant history of childhood trauma, and experiences
            voices that feel internal rather than external, it may be worth requesting a specialized
            assessment for dissociative disorders. Correct diagnosis is the foundation of effective
            treatment.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-008 | Brief Psychotic Disorder
  // --------------------------------------------------------------------------
  {
    id: catId(8),
    slug: 'brief-psychotic-disorder-when-psychosis-comes-and-goes-quickly',
    title: 'Brief Psychotic Disorder: When Psychosis Comes and Goes Quickly',
    description: 'Understanding brief psychotic disorder — a sudden, short-lived episode of psychosis that resolves within a month, often triggered by extreme stress, and carries a generally favorable prognosis.',
    image: '/images/articles/cat16/cover-008.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 10,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Psychosis', 'Brief Psychotic Disorder', 'Acute Stress', 'Condition Deep Dive'],

    summary: 'Brief psychotic disorder is one of the most misunderstood conditions on the psychosis spectrum. It involves the sudden onset of psychotic symptoms — hallucinations, delusions, disorganized speech or behavior — that resolve completely within one month. Unlike schizophrenia, it often has an identifiable trigger: extreme stress, bereavement, trauma, or major life upheaval. Many people who experience it never have another episode. The challenge lies in the acute phase, where symptoms can be just as severe as any other psychotic episode, and in the diagnostic uncertainty that follows — because the condition can only be confirmed after the fact, once symptoms have fully resolved.',

    keyFacts: [
      { text: 'Brief psychotic disorder accounts for approximately 9% of all first-episode psychosis presentations', citationIndex: 1 },
      { text: 'Symptoms must last at least one day but no more than one month for the diagnosis to apply', citationIndex: 2 },
      { text: 'Women are diagnosed with brief psychotic disorder at approximately twice the rate of men', citationIndex: 3 },
      { text: 'Between 50–75% of people who experience brief psychotic disorder do not have a recurrence', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'Brief psychotic disorder shows us something profound about the brain: under extreme stress, even a brain with no structural abnormalities and no genetic loading for schizophrenia can temporarily lose its grip on reality. It\'s a reminder that psychosis isn\'t always a disease — sometimes it\'s a response.',

    practicalExercise: {
      title: 'Supporting Someone Through Brief Psychosis',
      steps: [
        { title: 'Ensure safety first', description: 'During the acute episode, focus on safety. Remove access to anything harmful, stay calm, and avoid arguing with delusions. Contact emergency services if the person is at risk of harming themselves or others.' },
        { title: 'Seek immediate evaluation', description: 'Brief psychotic disorder can only be diagnosed after it resolves. In the acute phase, the person needs a psychiatric evaluation to rule out other causes (substance use, medical conditions, emerging schizophrenia).' },
        { title: 'Provide reassurance during recovery', description: 'Once symptoms resolve, the person may feel confused, frightened, or ashamed. Reassure them that brief psychotic disorder has a favorable prognosis and that most people don\'t have a recurrence.' },
        { title: 'Follow up', description: 'Even after full recovery, a follow-up appointment at 3 and 6 months helps monitor for any re-emergence of symptoms and provides an opportunity to address any lingering psychological impact.' },
      ],
      toolLink: '/crisis',
      toolLabel: 'Access Crisis Resources',
    },

    citations: [
      { id: '1', text: 'Brief psychotic disorder: Epidemiology, clinical features, and outcome', source: 'Schizophrenia Research', year: '2019', link: 'https://doi.org/10.1016/j.schres.2018.07.033', tier: 1 },
      { id: '2', text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)', source: 'American Psychiatric Association', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
      { id: '3', text: 'Gender differences in brief psychotic disorder: A systematic review', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291719003507', tier: 1 },
      { id: '4', text: 'Long-term outcome of brief psychotic disorder: A prospective follow-up study', source: 'British Journal of Psychiatry', year: '2018', link: 'https://doi.org/10.1192/bjp.2018.17', tier: 1 },
      { id: '5', text: 'Acute and transient psychotic disorders: A systematic review', source: 'The Lancet Psychiatry', year: '2016', link: 'https://doi.org/10.1016/S2215-0366(16)00074-1', tier: 1 },
      { id: '6', text: 'Stress and psychosis: A review of the neurobiological mechanisms', source: 'Schizophrenia Bulletin', year: '2017', link: 'https://doi.org/10.1093/schbul/sbw171', tier: 1 },
      { id: '7', text: 'Psychosis and schizophrenia in adults: Prevention and management', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '8', text: 'Brief psychotic disorder: Diagnosis, treatment, and prognosis', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            She'd never had a psychiatric symptom in her life. Then her mother died unexpectedly, and
            within 48 hours she was hearing her mother's voice, convinced that the hospital had made a
            mistake and her mother was still alive somewhere. She stopped eating, stopped sleeping, and
            began speaking in disconnected fragments that alarmed her partner. Ten days later — after a
            brief hospitalization and low-dose medication — she was lucid, bewildered, and asking,
            "What happened to me?" What happened was brief psychotic disorder.
          </p>
        </div>

        <h2 id="what-defines-it" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Defines Brief Psychotic Disorder
        </h2>
        <p className="mb-6">
          The DSM-5-TR defines brief psychotic disorder by three essential features: the presence of at
          least one psychotic symptom (delusions, hallucinations, disorganized speech, or grossly
          disorganized or catatonic behavior), a duration of at least one day but no more than one month,
          and an eventual full return to premorbid
          functioning <Citation id="2" index={2} source="American Psychiatric Association" year="2022" tier={4} />.
          This last criterion is crucial — the person doesn't just improve; they return to baseline. The
          episode is, by definition, self-limiting.
        </p>
        <p className="mb-6">
          The disorder can be specified as occurring "with marked stressor" (when a clear triggering event
          is identified), "without marked stressor," or "with postpartum onset" (discussed separately in
          the postpartum psychosis article). The "with marked stressor" subtype — sometimes called
          "reactive psychosis" in older literature — is the most recognized presentation and has the best
          prognosis <Citation id="1" index={1} source="Schizophrenia Research" year="2019" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 9, suffix: '%', label: 'Of first-episode psychosis cases' },
            { value: 1, suffix: '–30', label: 'Days of symptom duration' },
            { value: 50, suffix: '–75%', label: 'Have no recurrence' },
          ]}
          source="Schizophrenia Research, 2019; British Journal of Psychiatry, 2018"
        />

        <h2 id="triggers-and-neurobiology" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Triggers and the Neurobiology of Stress-Induced Psychosis
        </h2>
        <p className="mb-6">
          The triggers for brief psychotic disorder are typically events that overwhelm the brain's
          capacity to process and regulate. Bereavement, natural disasters, combat exposure, sexual
          assault, unexpected job loss, immigration, and incarceration have all been documented as
          precipitants. The common thread is not the type of event but its subjective intensity — the
          degree to which it exceeds the person's psychological resources at that
          moment <Citation id="6" index={6} source="Schizophrenia Bulletin" year="2017" tier={1} />.
        </p>
        <p className="mb-6">
          Neurobiologically, extreme stress triggers a cascade that converges on the dopaminergic system.
          The hypothalamic-pituitary-adrenal (HPA) axis floods the body with cortisol. Sustained cortisol
          elevation increases dopamine transmission in the mesolimbic pathway — the same pathway implicated
          in schizophrenia — which can tip the brain into the aberrant salience processing that produces
          psychotic
          symptoms <Citation id="6" index={6} source="Schizophrenia Bulletin" year="2017" tier={1} />.
          In brief psychotic disorder, this process is transient: once the acute stress response
          subsides and the HPA axis normalizes, dopaminergic hyperactivity resolves, and symptoms fade.
        </p>
        <p className="mb-6">
          Women are diagnosed with brief psychotic disorder at approximately twice the rate of men,
          a disparity that may reflect both biological factors (hormonal influences on stress response
          and dopamine sensitivity) and psychosocial ones (differential exposure to certain types of
          stressors, particularly interpersonal
          violence) <Citation id="3" index={3} source="Psychological Medicine" year="2020" tier={1} />.
        </p>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment: What Helps During and After the Episode
        </h2>
        <p className="mb-6">
          Acute treatment for brief psychotic disorder mirrors the approach for any acute psychotic
          episode: ensuring safety, reducing stimulation, and — if symptoms are severe — short-term
          antipsychotic medication. The NICE guidelines recommend that antipsychotics be used at the
          lowest effective dose and for the shortest duration possible, with a plan for gradual
          discontinuation once symptoms
          resolve <Citation id="7" index={7} source="NICE" year="2024" tier={3} />.
        </p>
        <p className="mb-6">
          What's different about brief psychotic disorder is the recovery conversation. Because the
          condition resolves completely, there's a strong case for therapeutic processing of the
          experience after the acute phase. Many people feel profoundly shaken by what happened to them.
          They may struggle with questions about their own mental stability, fear recurrence, or
          experience shame about their behavior during the episode. Brief supportive therapy or cognitive
          behavioral therapy can help people integrate the experience without developing chronic
          anxiety about it.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'acute-management',
              title: 'During the acute episode',
              content: (
                <p>
                  Low-dose antipsychotic medication (typically for 1–4 weeks), a calm environment with
                  minimal stimulation, and monitoring for safety. Most people show significant improvement
                  within days. Hospitalization is sometimes necessary but can often be avoided with intensive
                  outpatient monitoring.
                </p>
              ),
            },
            {
              id: 'recovery-phase',
              title: 'During recovery (weeks 1–4)',
              content: (
                <p>
                  Gradual medication taper under clinical supervision. Psychoeducation about what happened.
                  Re-establishment of daily routines (sleep, meals, gentle activity). Avoidance of major
                  life decisions until cognitive clarity fully returns.
                </p>
              ),
            },
            {
              id: 'long-term',
              title: 'Long-term follow-up',
              content: (
                <p>
                  Follow-up assessments at 3, 6, and 12 months to monitor for recurrence. Brief therapy to
                  process the experience if needed. Development of a personal early warning plan so the
                  person and their family can recognize warning signs if symptoms were to re-emerge.
                </p>
              ),
            },
          ]}
        />

        <h2 id="prognosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Prognosis: Better Than Most People Expect
        </h2>
        <p className="mb-6">
          Brief psychotic disorder has the most favorable prognosis of any psychotic condition. A
          prospective follow-up study in the <em>British Journal of Psychiatry</em> found that between
          50–75% of people who experience brief psychotic disorder never have another psychotic
          episode <Citation id="4" index={4} source="British Journal of Psychiatry" year="2018" tier={1} />.
          Among those who do have recurrences, most experience additional brief episodes rather than
          progression to schizophrenia.
        </p>
        <p className="mb-6">
          However, the disorder can only be diagnosed retrospectively — once symptoms have fully
          resolved within the one-month
          window <Citation id="5" index={5} source="The Lancet Psychiatry" year="2016" tier={1} />.
          During the acute episode, clinicians can't yet distinguish brief psychotic disorder from the
          beginning of schizophrenia, schizoaffective disorder, or a substance-induced condition. This
          diagnostic uncertainty is one of the most distressing aspects for families, who want immediate
          answers about what's happening and what the future
          holds <Citation id="8" index={8} source="National Institute of Mental Health" year="2024" tier={2} />.
        </p>
        <p className="mb-6">
          The message families and patients need to hear is this: while the acute episode can be
          frightening, the odds are in favor of full recovery. Most people return to their baseline
          functioning and never look back. The key is appropriate acute treatment, patient follow-up,
          and — perhaps most importantly — not over-diagnosing a self-limiting condition as a chronic one.
        </p>

        <QuoteBlock
          quote="Brief psychotic disorder teaches us something important: the brain has a breaking point under extreme stress, but it also has a remarkable capacity to reset."
          attribution="Adapted from clinical observation"
          variant="default"
        />
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-009 | Postpartum Psychosis
  // --------------------------------------------------------------------------
  {
    id: catId(9),
    slug: 'postpartum-psychosis-psychiatric-emergency-every-parent-should-know',
    title: 'Postpartum Psychosis: A Psychiatric Emergency Every Parent Should Know About',
    description: 'A critical guide to postpartum psychosis — the rarest but most dangerous perinatal mental health condition, how to recognize it, and why immediate treatment saves lives.',
    image: '/images/articles/cat16/cover-009.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Postpartum Psychosis', 'Perinatal Mental Health', 'Psychiatric Emergency', 'Crisis'],

    summary: 'Postpartum psychosis is the most severe and dangerous form of perinatal mental health crisis. It affects approximately 1–2 in every 1,000 deliveries and typically emerges within the first two weeks after birth. Symptoms can escalate rapidly — from confusion and insomnia to full-blown hallucinations, delusions (often involving the infant), and severely disorganized behavior. Without immediate treatment, postpartum psychosis carries significant risks of harm to both the parent and baby, including a 5% suicide rate and a 4% infanticide rate. With rapid intervention — typically inpatient care with mood stabilizers, antipsychotics, and intensive monitoring — outcomes are generally good. This is a treatable emergency, but only if recognized in time.',

    keyFacts: [
      { text: 'Postpartum psychosis occurs in 1–2 per 1,000 deliveries, most often within the first 2 weeks after birth', citationIndex: 1 },
      { text: 'Women with bipolar disorder have a 25–50% risk of developing postpartum psychosis', citationIndex: 2 },
      { text: 'Without treatment, postpartum psychosis carries a 5% suicide rate and a 4% infanticide rate', citationIndex: 3 },
      { text: 'With appropriate treatment, the majority of women recover fully and many go on to have subsequent pregnancies without recurrence', citationIndex: 4 },
      { text: 'Sleep deprivation in the postpartum period is a significant triggering factor', citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'Postpartum psychosis isn\'t caused by bad parenting, ambivalence about the baby, or personal weakness. It\'s triggered by the most dramatic hormonal shift in human biology — the postpartum hormone crash — colliding with extreme sleep deprivation in a brain that was already vulnerable. It\'s biology, not character.',

    practicalExercise: {
      title: 'The Postpartum Psychosis Recognition Plan',
      steps: [
        { title: 'Know the timeline', description: 'Postpartum psychosis most often emerges within the first 2 weeks after delivery. If a new parent shows rapidly escalating confusion, paranoia, or bizarre behavior in this window, treat it as an emergency.' },
        { title: 'Watch for red-flag symptoms', description: 'Severe insomnia despite exhaustion, believing the baby is in danger from supernatural forces, hearing voices giving instructions about the baby, or rapidly alternating between euphoria and terror are warning signs.' },
        { title: 'Call for help immediately', description: 'This is a psychiatric emergency. Call emergency services or take the person to the nearest emergency department. Do not leave the parent alone with the infant until they have been evaluated.' },
        { title: 'Know who\'s at highest risk', description: 'Women with bipolar disorder, a personal or family history of postpartum psychosis, or a history of psychotic episodes have the highest risk and should have a postpartum monitoring plan established before delivery.' },
      ],
      toolLink: '/crisis',
      toolLabel: 'Access Crisis Resources Now',
    },

    citations: [
      { id: '1', text: 'Postpartum psychosis: Epidemiology, pathophysiology, clinical manifestations, and diagnosis', source: 'The Lancet Psychiatry', year: '2021', link: 'https://doi.org/10.1016/S2215-0366(21)00237-X', tier: 1 },
      { id: '2', text: 'Risk of postpartum psychosis after bipolar disorder: A systematic review and meta-analysis', source: 'British Journal of Psychiatry', year: '2019', link: 'https://doi.org/10.1192/bjp.2018.281', tier: 1 },
      { id: '3', text: 'Infanticide and filicide in postpartum psychosis: A retrospective study', source: 'Journal of Clinical Psychiatry', year: '2016', link: 'https://doi.org/10.4088/JCP.15r10058', tier: 1 },
      { id: '4', text: 'Treatment and outcomes of postpartum psychosis: A clinical review', source: 'Archives of Women\'s Mental Health', year: '2020', link: 'https://doi.org/10.1007/s00737-020-01017-x', tier: 1 },
      { id: '5', text: 'Sleep loss and postpartum psychosis: A role for circadian disruption', source: 'Bipolar Disorders', year: '2018', link: 'https://doi.org/10.1111/bdi.12619', tier: 1 },
      { id: '6', text: 'Perinatal mental health: Antenatal and postnatal mental health (NICE CG192)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg192', tier: 3 },
      { id: '7', text: 'Postpartum psychosis: A guide for partners and families', source: 'Action on Postpartum Psychosis (UK charity)', year: '2023', link: 'https://www.app-network.org/', tier: 3 },
      { id: '8', text: 'Reproductive and perinatal psychiatry', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/women-and-mental-health', tier: 2 },
      { id: '9', text: 'The neurobiology of postpartum psychosis: Evidence from hormonal, genetic, and neuroimaging studies', source: 'Molecular Psychiatry', year: '2020', link: 'https://doi.org/10.1038/s41380-020-0687-1', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Three days after giving birth to a healthy boy, a 31-year-old woman stops sleeping entirely.
            Not just disrupted sleep — total cessation. By day five, she's pacing the house at 3 a.m.,
            convinced that the hospital swapped her baby with someone else's. By day seven, she's hearing
            a voice telling her the baby is "contaminated" and must be "purified." Her partner, exhausted
            and terrified, doesn't know if this is severe baby blues, postpartum depression, or something
            else entirely. It's something else. It's postpartum psychosis — a psychiatric emergency that
            requires immediate intervention.
          </p>
        </div>

        <h2 id="what-it-is" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Postpartum Psychosis Is — and Why It's an Emergency
        </h2>
        <p className="mb-6">
          Postpartum psychosis is the most severe form of perinatal mental illness. It occurs in
          approximately 1–2 per 1,000 deliveries and typically emerges within the first two weeks
          after birth, though onset can occur up to 12 weeks
          postpartum <Citation id="1" index={1} source="The Lancet Psychiatry" year="2021" tier={1} />.
          The speed of onset is striking: a person can go from apparently well to floridly psychotic
          within 24–48 hours. This rapid escalation is what makes it dangerous.
        </p>
        <p className="mb-6">
          Symptoms include severe insomnia (often total sleeplessness), rapid mood fluctuations between
          elation and despair, confusion and disorientation, paranoid delusions (often involving the
          baby), hallucinations (visual and auditory), and grossly disorganized or bizarre behavior.
          Crucially, delusions in postpartum psychosis frequently involve the infant — beliefs that the
          baby is dead, possessed, defective, or in danger from a supernatural force — which is why
          the condition carries a 4% infanticide
          rate <Citation id="3" index={3} source="Journal of Clinical Psychiatry" year="2016" tier={1} />
          and a 5% suicide rate when untreated.
        </p>

        <ArticleCallout variant="warning" title="This Is a Medical Emergency">
          <p>
            If a new parent is showing signs of psychosis — hallucinations, delusions, severely
            disorganized behavior, total insomnia — in the days or weeks after delivery, this is a
            psychiatric emergency. Do not wait for the symptoms to resolve on their own. Call emergency
            services, take the person to the emergency department, and do not leave them alone with the
            infant until they have received a professional evaluation.
          </p>
        </ArticleCallout>

        <h2 id="who-is-at-risk" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Is at Risk
        </h2>
        <p className="mb-6">
          The strongest risk factor for postpartum psychosis is a history of <strong>bipolar
          disorder</strong>. A meta-analysis in the <em>British Journal of Psychiatry</em> found
          that women with bipolar disorder have a 25–50% chance of developing postpartum
          psychosis <Citation id="2" index={2} source="British Journal of Psychiatry" year="2019" tier={1} />.
          This is one of the highest recurrence risks in all of psychiatry, and it demands proactive
          planning: women with bipolar disorder should have a postpartum monitoring plan established
          before delivery, ideally with psychiatric input during the third trimester.
        </p>
        <p className="mb-6">
          Other risk factors include a previous episode of postpartum psychosis (recurrence rate of
          approximately 30–50%), a family history of postpartum psychosis or bipolar disorder, and
          primiparous status (first-time mothers are at somewhat higher risk). Severe sleep deprivation
          in the immediate postpartum period is increasingly recognized as a proximal triggering
          factor <Citation id="5" index={5} source="Bipolar Disorders" year="2018" tier={1} />,
          suggesting that protecting sleep may be a modifiable intervention.
        </p>

        <ArticleChart
          type="bar"
          title="Risk Factors for Postpartum Psychosis"
          data={[
            { label: 'Bipolar disorder', value: 35 },
            { label: 'Previous postpartum psychosis', value: 40 },
            { label: 'Family history (bipolar/PP)', value: 15 },
            { label: 'First pregnancy', value: 5 },
            { label: 'General population', value: 0.15 },
          ]}
          source="British Journal of Psychiatry, 2019; Lancet Psychiatry, 2021 (approximate % risk)"
        />

        <h2 id="the-biology" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Biology: Hormones, Sleep, and a Vulnerable Brain
        </h2>
        <p className="mb-6">
          After delivery, estrogen and progesterone levels — which have been 100 to 1,000 times higher
          than normal during pregnancy — plummet within hours. This is the most dramatic hormonal shift
          in human biology. In most women, this shift produces temporary mood lability (the "baby blues").
          In women with underlying vulnerability — particularly bipolar-spectrum biology — it can trigger
          a full psychotic
          episode <Citation id="9" index={9} source="Molecular Psychiatry" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          The hormonal crash interacts with extreme sleep deprivation to create a perfect neurobiological
          storm. Research has shown that sleep loss alone can increase dopamine transmission in the
          mesolimbic pathway — the same pathway implicated in psychosis. When sleep deprivation is layered
          on top of hormonal upheaval in a brain predisposed to mood instability, the threshold for
          psychosis drops
          dramatically <Citation id="5" index={5} source="Bipolar Disorders" year="2018" tier={1} />.
          This is why protecting sleep in the immediate postpartum period — through partner involvement,
          shared feeding schedules, or postpartum doula support — is not a luxury but a clinical
          intervention.
        </p>

        <h2 id="treatment-and-recovery" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment: Rapid Intervention Saves Lives
        </h2>
        <p className="mb-6">
          Postpartum psychosis requires immediate psychiatric treatment, typically in an inpatient
          setting. NICE guidelines recommend admission to a specialized mother and baby unit (MBU)
          where available, which allows the parent to maintain a supervised relationship with their
          infant while receiving
          treatment <Citation id="6" index={6} source="NICE" year="2024" tier={3} />.
          In countries without MBUs, general psychiatric admission is necessary.
        </p>
        <p className="mb-6">
          Pharmacological treatment typically includes mood stabilizers (lithium is first-line),
          antipsychotic medication for acute psychotic symptoms, and benzodiazepines for severe
          agitation or
          insomnia <Citation id="4" index={4} source="Archives of Women's Mental Health" year="2020" tier={1} />.
          The question of breastfeeding must be addressed individually — lithium passes into breast
          milk and is generally contraindicated during nursing, but some antipsychotics are compatible
          with breastfeeding under close monitoring.
        </p>
        <p className="mb-6">
          With appropriate treatment, the prognosis is generally good. Most people recover fully from
          the acute episode within weeks to months. The psychological aftermath, however, can be
          significant: many women experience grief over lost bonding time, guilt about their behavior
          during the episode, and anxiety about future pregnancies. Partner and family support, along
          with specialized perinatal mental health follow-up, is essential during
          recovery <Citation id="7" index={7} source="Action on Postpartum Psychosis" year="2023" tier={3} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Without recognition',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Symptoms dismissed as "baby blues" or exhaustion</li>
                <li>Escalation to severe psychosis over days</li>
                <li>Risk of self-harm, infanticide, or chaotic behavior</li>
                <li>Emergency intervention only after crisis</li>
              </ul>
            ),
          }}
          after={{
            title: 'With early recognition',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Warning signs identified within 24–48 hours</li>
                <li>Rapid psychiatric evaluation and treatment</li>
                <li>Inpatient stabilization with mother-baby bonding preserved</li>
                <li>Full recovery in weeks with appropriate support</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6">
          Every obstetric team, midwife, and postpartum care provider should be trained to recognize
          the early warning signs of postpartum psychosis. Every woman with bipolar disorder should
          have a postpartum safety plan before delivery. And every partner and family member should know
          that if a new mother becomes acutely psychotic, this is a medical emergency — not a parenting
          failure <Citation id="8" index={8} source="National Institute of Mental Health" year="2024" tier={2} />.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-010 | Psychosis in Adolescents
  // --------------------------------------------------------------------------
  {
    id: catId(10),
    slug: 'psychosis-in-adolescents-early-identification-and-support',
    title: 'Psychosis in Adolescents: Early Identification and Support',
    description: 'A comprehensive guide to recognizing and responding to psychosis in teenagers — including how it differs from typical adolescent behavior, when to seek help, and what effective treatment looks like.',
    image: '/images/articles/cat16/cover-010.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Psychosis', 'Adolescents', 'Youth Mental Health', 'Early Intervention'],

    summary: 'Adolescence is the peak window for the onset of psychotic conditions. The vast majority of people who develop schizophrenia experience their first symptoms between ages 15 and 25, during a period of intense brain development that creates both creative potential and neurological vulnerability. Recognizing psychosis in teenagers is challenging because many early signs — social withdrawal, mood instability, academic decline, unusual beliefs — overlap with typical adolescent behavior. But certain patterns and combinations of symptoms warrant professional evaluation. Early identification matters more during adolescence than at any other age because the developing brain is both more vulnerable to the harmful effects of untreated psychosis and more responsive to treatment.',

    keyFacts: [
      { text: 'The peak age of onset for first psychotic episodes is 15–25 years, with earlier onset typically associated with more severe long-term course', citationIndex: 1 },
      { text: 'Approximately 75% of people with schizophrenia show prodromal symptoms during adolescence, averaging 1–5 years before the first full episode', citationIndex: 2 },
      { text: 'Early intervention programs for adolescents with psychosis can reduce transition to full psychotic disorder by up to 50%', citationIndex: 3 },
      { text: 'Cannabis use during adolescence roughly doubles the risk of psychosis, with earlier onset of use and higher potency carrying greater risk', citationIndex: 4 },
      { text: 'Youth-specific early psychosis programs show better engagement, lower dropout rates, and improved outcomes compared to adult services', citationIndex: 5 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The adolescent brain isn\'t broken when psychosis emerges — it\'s under construction. The same neurodevelopmental remodeling that enables abstract thought, identity formation, and creative exploration can, in a vulnerable brain, produce the perceptual distortions and belief systems of psychosis. The window of risk is also the window of greatest opportunity for intervention.',

    practicalExercise: {
      title: 'Recognizing Psychosis Risk in Adolescents',
      steps: [
        { title: 'Distinguish from typical teen behavior', description: 'Occasional moodiness, privacy-seeking, and questioning authority are normal. Persistent social withdrawal from previously close friends, declining grades with no clear cause, and emerging suspiciousness of trusted people are not.' },
        { title: 'Listen for perceptual changes', description: 'Ask open-ended questions: "Have you been noticing anything unusual?" rather than "Are you hearing voices?" Teenagers are more likely to disclose perceptual disturbances if the question doesn\'t feel loaded.' },
        { title: 'Monitor sleep and functioning', description: 'Significant insomnia, reversed sleep-wake cycles, and a decline in self-care that goes beyond normal teen messiness can signal emerging psychosis.' },
        { title: 'Seek youth-specific evaluation', description: 'If you\'re concerned, contact a youth mental health service or an early psychosis intervention program. Many accept referrals directly from families without requiring a GP referral.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Try the Symptom Navigator',
    },

    citations: [
      { id: '1', text: 'Age of onset and gender in schizophrenia: An overview', source: 'European Psychiatry', year: '2017', link: 'https://doi.org/10.1016/j.eurpsy.2016.12.002', tier: 1 },
      { id: '2', text: 'The prodromal phase of first-episode psychosis: Past and current conceptualizations', source: 'Schizophrenia Bulletin', year: '2006', link: 'https://doi.org/10.1093/schbul/sbj024', tier: 1 },
      { id: '3', text: 'Early intervention for psychosis in adolescents: A systematic review and meta-analysis', source: 'JAMA Psychiatry', year: '2020', link: 'https://doi.org/10.1001/jamapsychiatry.2019.3199', tier: 1 },
      { id: '4', text: 'Cannabis use and the risk of developing a psychotic disorder', source: 'The Lancet Psychiatry', year: '2019', link: 'https://doi.org/10.1016/S2215-0366(19)30048-3', tier: 1 },
      { id: '5', text: 'Youth-specific early psychosis services: Engagement and outcomes', source: 'Psychological Medicine', year: '2021', link: 'https://doi.org/10.1017/S0033291721001835', tier: 1 },
      { id: '6', text: 'Adolescent brain development and vulnerability to psychosis', source: 'Biological Psychiatry', year: '2018', link: 'https://doi.org/10.1016/j.biopsych.2017.10.010', tier: 1 },
      { id: '7', text: 'Understanding psychosis', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/publications/understanding-psychosis', tier: 2 },
      { id: '8', text: 'Psychosis and schizophrenia in children and young people: Recognition and management (NICE CG155)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg155', tier: 3 },
      { id: '9', text: 'Early psychosis intervention: A culturally adaptive clinical guide', source: 'SAMHSA', year: '2023', link: 'https://store.samhsa.gov/product/early-psychosis-intervention', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            A 16-year-old who used to captain the debate team has stopped attending practice. Her grades
            have dropped from A's to C's. She's spending more time alone in her room, and when her parents
            ask what's wrong, she says nothing — or deflects with irritation. They assume it's normal
            teenage behavior. It might be. But if it's been escalating for months, and if she's also
            mentioned that people at school are "watching her" or that she sometimes hears whispering when
            no one is around, it might be something else entirely. Telling the difference between adolescent
            development and emerging psychosis is one of the most important — and most difficult —
            distinctions in youth mental health.
          </p>
        </div>

        <h2 id="why-adolescence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Psychosis Emerges During Adolescence
        </h2>
        <p className="mb-6">
          Adolescence isn't just a social transition — it's a neurobiological revolution. Between ages 12
          and 25, the brain undergoes massive remodeling. Synaptic pruning eliminates unnecessary neural
          connections while myelination strengthens the ones that remain. The prefrontal cortex — the
          brain's center for reasoning, planning, and reality testing — is the last region to mature,
          not completing development until the mid-twenties. This creates a developmental window where
          the emotional brain (limbic system) is fully online but the cognitive brain (prefrontal cortex)
          is still under
          construction <Citation id="6" index={6} source="Biological Psychiatry" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          This window explains why adolescence is the peak period for the onset of psychotic conditions.
          The vast majority of people who develop schizophrenia experience their first symptoms between
          ages 15 and
          25 <Citation id="1" index={1} source="European Psychiatry" year="2017" tier={1} />.
          The neurodevelopmental changes of this period — particularly in dopamine and glutamate systems —
          can, in a genetically vulnerable brain, tip the balance toward psychosis. Environmental factors
          during this window — substance use (particularly cannabis), social stress, bullying, and
          academic pressure — act as accelerants.
        </p>

        <StatCard
          stats={[
            { value: 15, suffix: '–25', label: 'Peak age of onset (years)' },
            { value: 75, suffix: '%', label: 'Show prodromal symptoms in adolescence' },
            { value: 50, suffix: '%', label: 'Reduction in transition with early intervention' },
          ]}
          source="European Psychiatry, 2017; JAMA Psychiatry, 2020"
        />

        <h2 id="typical-vs-concerning" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Typical Teen Behavior vs. Warning Signs
        </h2>
        <p className="mb-6">
          The overlap between normal adolescent development and prodromal psychosis is the central
          challenge. Moodiness, withdrawal, identity experimentation, and occasional conflict with
          authority are developmentally appropriate in teenagers. The key distinction lies in the
          <em>pattern</em>, <em>persistence</em>, and <em>functional impact</em> of
          changes <Citation id="8" index={8} source="NICE" year="2024" tier={3} />.
        </p>

        <ComparisonTable
          title="Typical Adolescent Behavior vs. Prodromal Warning Signs"
          columns={['Domain', 'Typical Adolescence', 'Possible Prodrome']}
          items={[
            { feature: 'Social life', values: ['Shifts friend groups, seeks independence', 'Withdraws from all friends, increasing isolation'] },
            { feature: 'Academics', values: ['Fluctuating effort, some subject disengagement', 'Broad decline across subjects, can\'t concentrate'] },
            { feature: 'Mood', values: ['Mood swings, irritability, emotional intensity', 'Flat affect, persistent depression, fearfulness'] },
            { feature: 'Beliefs', values: ['Exploring identity, questioning norms', 'Fixed unusual beliefs, suspiciousness of trusted people'] },
            { feature: 'Perception', values: ['Vivid imagination, occasional odd sensory experiences', 'Hearing voices, seeing things, perceptual distortions'] },
            { feature: 'Sleep', values: ['Shifted schedule (later bedtime, later rising)', 'Severe insomnia, inability to sleep despite exhaustion'] },
            { feature: 'Self-care', values: ['Messier room, relaxed grooming', 'Significant decline in hygiene, disorganized appearance'] },
          ]}
          highlightColumn={2}
        />

        <p className="mb-6">
          A single sign from the right column doesn't indicate psychosis. A cluster of signs — social
          withdrawal plus academic decline plus emerging suspiciousness plus sleep disruption — persisting
          for more than two weeks, with a trajectory of worsening, warrants a professional
          evaluation <Citation id="2" index={2} source="Schizophrenia Bulletin" year="2006" tier={1} />.
          Parents and teachers are often the first to notice these patterns, which is why psychoeducation
          for families and school staff is a critical component of early psychosis programs.
        </p>

        <h2 id="cannabis-risk" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cannabis, the Developing Brain, and Psychosis Risk
        </h2>
        <p className="mb-6">
          Cannabis use during adolescence represents one of the most significant modifiable risk factors
          for psychosis. A meta-analysis in <em>The Lancet Psychiatry</em> found that adolescent cannabis
          use approximately doubles the risk of developing a psychotic disorder, with higher potency
          products and earlier onset of use carrying substantially greater
          risk <Citation id="4" index={4} source="The Lancet Psychiatry" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          The adolescent brain is uniquely vulnerable because the endocannabinoid system — which THC
          hijacks — plays a critical role in neurodevelopmental processes during this period. THC disrupts
          the normal pruning and maturation of prefrontal circuits, potentially creating the exact type
          of connectivity disruption that predisposes to psychosis. For adolescents who already carry
          genetic risk (a family history of schizophrenia or bipolar disorder), cannabis use during this
          window may be the environmental trigger that pushes a vulnerable brain past its
          threshold <Citation id="6" index={6} source="Biological Psychiatry" year="2018" tier={1} />.
        </p>

        <ArticleCallout variant="tip" title="Talking to Adolescents About Cannabis and Psychosis">
          <p>
            Fear-based messaging doesn't work with teenagers. Evidence-based conversations do. Instead
            of "marijuana will make you crazy," try: "Your brain is still developing, and high-THC
            cannabis can interfere with that development, particularly if there's a family history of
            psychosis. The younger you start and the more potent the product, the higher the risk."
          </p>
        </ArticleCallout>

        <h2 id="youth-specific-treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Youth-Specific Early Intervention
        </h2>
        <p className="mb-6">
          Adolescents with psychosis do best in treatment programs designed specifically for young people.
          A 2021 study in <em>Psychological Medicine</em> found that youth-specific early psychosis
          services achieve better engagement, lower dropout rates, and improved functional outcomes
          compared to adult psychiatric
          services <Citation id="5" index={5} source="Psychological Medicine" year="2021" tier={1} />.
          This makes intuitive sense: a 16-year-old experiencing first-episode psychosis has different
          needs than a 45-year-old with chronic schizophrenia.
        </p>
        <p className="mb-6">
          Youth-specific programs typically include individual therapy adapted for adolescent development,
          family-based interventions that address parental distress and communication patterns,
          educational support to prevent school dropout, and — when necessary — cautious, low-dose
          medication with close metabolic
          monitoring <Citation id="8" index={8} source="NICE" year="2024" tier={3} />.
          The NICE guidelines for psychosis in children and young people emphasize that medication should
          not be the sole intervention and must always be accompanied by psychological therapy and
          supported education or employment.
        </p>
        <p className="mb-6">
          In the United States, SAMHSA's early psychosis intervention programs serve many adolescents,
          and headspace and EPPIC programs in Australia were specifically designed with youth in mind.
          The UK's early intervention in psychosis (EIP) services accept referrals from age 14 and aim
          to see young people within two weeks of
          referral <Citation id="9" index={9} source="SAMHSA" year="2023" tier={2} />.
          Getting young people into these specialized services — rather than waiting for a crisis that
          leads to emergency department presentation — is the single most impactful thing families,
          schools, and primary care providers can do.
        </p>
        <p className="mb-6">
          The developing brain is more vulnerable to untreated psychosis, but it's also more neuroplastic
          — more capable of recovery and adaptation when the right support arrives in
          time <Citation id="7" index={7} source="National Institute of Mental Health" year="2024" tier={2} />.
          That's the paradox and the promise of adolescent psychosis: the risk is highest, but so is the
          opportunity.
        </p>

        <QuoteBlock
          quote="The adolescent brain is a work in progress. Psychosis during this period is serious — but the same plasticity that makes the brain vulnerable also makes it remarkably responsive to early, comprehensive treatment."
          attribution="Early Psychosis Prevention and Intervention Centre (EPPIC)"
          variant="large"
        />
      </>
    ),
  },
];
