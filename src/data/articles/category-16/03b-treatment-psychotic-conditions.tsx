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
  MythVsFactBlock,
  HighlightBox,
} from '../../../components/article/blocks';

// ============================================================================
// Subcategory 3 --- Treatment for Psychotic Conditions | Articles 26--30
// ============================================================================

export const treatmentPsychoticArticlesB: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-PSY-026 | Early Intervention for Psychosis
  // --------------------------------------------------------------------------
  {
    id: catId(26),
    slug: 'early-intervention-for-psychosis-why-timing-changes-everything',
    title: 'Early Intervention for Psychosis: Why Timing Changes Everything',
    description: 'How early intervention programs for first-episode psychosis transform outcomes --- the critical period hypothesis, coordinated specialty care, and why every week of untreated psychosis matters.',
    image: '/images/articles/cat16/cover-026.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Early Intervention', 'First Episode', 'Treatment', 'Recovery'],

    summary: 'The first 2--5 years after psychosis onset represent a critical window during which the trajectory of the illness is most responsive to intervention. Early intervention programs --- comprehensive, team-based services that combine low-dose medication, individual therapy, family support, and vocational assistance --- produce dramatically better outcomes than standard care. They reduce hospitalization by 30--50%, improve employment and educational attainment, and decrease the duration of untreated psychosis (DUP) that directly predicts long-term prognosis. Programs like NAVIGATE (US), OPUS (Denmark), and EPPIC (Australia) have demonstrated that investing in the first episode pays dividends that persist years after the program ends. Yet access remains profoundly unequal, with most people worldwide receiving no specialized early intervention at all.',

    keyFacts: [
      { text: 'Every week of untreated psychosis is associated with worse outcomes --- the median duration of untreated psychosis (DUP) remains 1--2 years in many settings', citationIndex: 1 },
      { text: 'Coordinated specialty care programs reduce hospitalization by 30--50% and improve vocational outcomes compared to standard treatment', citationIndex: 2 },
      { text: 'The "critical period" hypothesis suggests the first 2--5 years after onset are the window of greatest treatment sensitivity', citationIndex: 3 },
      { text: 'Early intervention programs cost less per person than standard care over 5 years when reduced hospitalization is factored in', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'In medicine, we accept that a heart attack treated within the first hour has dramatically better outcomes than one treated after 24 hours. Psychosis works the same way --- but the "golden hour" is measured in weeks and months, and most healthcare systems act as if timing doesn\'t matter at all.',

    practicalExercise: {
      title: 'Recognizing When to Seek Urgent Evaluation',
      steps: [
        { title: 'Know the early warning signs', description: 'New suspiciousness or paranoia, hearing sounds others don\'t hear, unusual beliefs held with strong conviction, marked social withdrawal, significant decline in school or work functioning, confused or disorganized speech --- any of these warrant evaluation.' },
        { title: 'Don\'t wait for certainty', description: 'You don\'t need to be sure someone is experiencing psychosis to seek help. Expressing concern and requesting evaluation is always appropriate. It\'s better to be evaluated and reassured than to wait until a crisis forces emergency care.' },
        { title: 'Find your local early intervention program', description: 'In the US, search SAMHSA\'s Early Serious Mental Illness Treatment Locator. In the UK, contact your GP for referral to an Early Intervention in Psychosis (EIP) team. In Australia, ask about headspace or EPPIC services.' },
        { title: 'Advocate for comprehensive care', description: 'Early intervention should include more than medication. Ask about individual therapy, family support, educational or vocational assistance, and peer support. If only medication is offered, ask for referral to a specialized first-episode program.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Explore the Symptom Navigator',
    },

    citations: [
      { id: '1', text: 'Duration of untreated psychosis and long-term outcome of schizophrenia: A systematic review and meta-analysis', source: 'The Lancet Psychiatry', year: '2020', link: 'https://doi.org/10.1016/S2215-0366(20)30003-2', tier: 1 },
      { id: '2', text: 'RAISE-ETP: Recovery After an Initial Schizophrenia Episode --- Early Treatment Program', source: 'American Journal of Psychiatry', year: '2016', link: 'https://doi.org/10.1176/appi.ajp.2015.15050632', tier: 1 },
      { id: '3', text: 'The critical period for early intervention in psychosis: A systematic review', source: 'Schizophrenia Bulletin', year: '2020', link: 'https://doi.org/10.1093/schbul/sbaa130', tier: 1 },
      { id: '4', text: 'Cost-effectiveness of early intervention for psychosis: A systematic review', source: 'British Journal of Psychiatry', year: '2019', link: 'https://doi.org/10.1192/bjp.2018.298', tier: 1 },
      { id: '5', text: 'OPUS trial: Ten-year follow-up of a randomized controlled trial of early intervention for first-episode psychosis', source: 'Schizophrenia Bulletin', year: '2018', link: 'https://doi.org/10.1093/schbul/sbx155', tier: 1 },
      { id: '6', text: 'Clinical staging in psychiatry: A cross-cutting model of diagnosis with heuristic value', source: 'British Journal of Psychiatry', year: '2014', link: 'https://doi.org/10.1192/bjp.bp.113.131953', tier: 1 },
      { id: '7', text: 'NIMH RAISE project: Early treatment program', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/research/research-funded-by-nimh/research-initiatives/raise', tier: 2 },
      { id: '8', text: 'Global access to early intervention for psychosis: A review of implementation status', source: 'World Psychiatry', year: '2021', link: 'https://doi.org/10.1002/wps.20892', tier: 1 },
      { id: '9', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            For most of psychiatry's history, intervention for psychosis meant waiting for a
            crisis --- a psychotic break severe enough to warrant hospitalization --- and then
            treating it reactively. By that point, months or years of untreated psychosis had
            already done damage: relationships fractured, education disrupted, employment lost,
            and the brain exposed to sustained neurobiological stress. Early intervention
            programs flipped this model, asking: what if we treated psychosis the way we treat
            other medical emergencies --- as a condition where every week of delay
            matters <Citation id="1" index={1} source="The Lancet Psychiatry" year="2020" tier={1} />?
          </p>
        </div>

        <h2 id="the-dup-problem" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Duration of Untreated Psychosis: The Clock That's Always Running
        </h2>
        <p className="mb-6">
          Duration of untreated psychosis (DUP) --- the time between the onset of psychotic
          symptoms and the initiation of adequate treatment --- is one of the most consistent
          predictors of long-term outcome in schizophrenia. Meta-analyses show that longer
          DUP is associated with more severe symptoms at presentation, poorer response to
          treatment, greater functional impairment, and lower rates of
          remission <Citation id="1" index={1} source="The Lancet Psychiatry" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          Despite decades of awareness, median DUP remains disturbingly long in most settings:
          1--2 years in high-income countries, and often much longer in low- and middle-income
          nations. The reasons are multifaceted: the insidious onset of many psychotic
          conditions makes it difficult to identify a clear starting point; families may
          attribute changes to adolescent moodiness, substance use, or stress; stigma prevents
          help-seeking; and healthcare systems often lack the infrastructure to evaluate
          and treat psychosis quickly.
        </p>

        <StatCard
          stats={[
            { value: 1, suffix: '--2 years', label: 'Median DUP in high-income countries' },
            { value: 30, suffix: '--50%', label: 'Reduction in hospitalization with early intervention' },
            { value: 2, suffix: '--5 years', label: 'Critical treatment window after onset' },
          ]}
          source="The Lancet Psychiatry, 2020; AJP, 2016"
        />

        <h2 id="coordinated-specialty-care" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Coordinated Specialty Care: The Treatment Model That Works
        </h2>
        <p className="mb-6">
          Early intervention isn't just early medication. The programs that have produced the
          most compelling evidence --- NAVIGATE in the United States, OPUS in Denmark, EPPIC
          in Australia --- share a common structure: coordinated specialty care (CSC), a
          team-based approach that integrates multiple treatment
          modalities <Citation id="2" index={2} source="American Journal of Psychiatry" year="2016" tier={1} />.
        </p>

        <ProgressSteps
          steps={[
            { title: 'Low-Dose Medication Management', description: 'Shared decision-making about antipsychotic medication, starting at lower doses than traditional practice. The goal is the minimum effective dose that controls psychotic symptoms without excessive side effects.' },
            { title: 'Individual Therapy (CBTp or Related)', description: 'Evidence-based psychological therapy adapted for psychosis, focusing on coping with symptoms, building resilience, and preventing relapse. Typically CBTp or a resilience-focused approach.' },
            { title: 'Family Education and Support', description: 'Structured family psychoeducation teaching communication skills, problem-solving, and crisis management. Families are treated as partners in recovery, not as bystanders.' },
            { title: 'Supported Employment/Education', description: 'Dedicated vocational specialists helping young people stay in school or return to work. Employment and education are treated as therapeutic interventions, not rewards for recovery.' },
            { title: 'Case Management', description: 'A team coordinator who ensures all elements work together, manages transitions, and provides continuity. The person doesn\'t navigate a fragmented system alone.' },
          ]}
        />

        <p className="mt-6 mb-6">
          The RAISE-ETP trial --- the largest randomized controlled trial of early intervention
          in the United States --- found that participants receiving NAVIGATE showed significantly
          better quality of life, greater symptom reduction, more involvement in work and school,
          and lower rates of hospitalization compared to those receiving standard
          care <Citation id="2" index={2} source="American Journal of Psychiatry" year="2016" tier={1} />.
          These benefits were most pronounced for people with shorter DUP, reinforcing the
          urgency of early detection.
        </p>

        <h2 id="sustainability-question" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Do the Benefits Last? The Sustainability Question
        </h2>
        <p className="mb-6">
          One of the most important questions in early intervention research is whether the
          benefits persist after the program ends --- typically at 2--3 years. The evidence is
          mixed but instructive. The Danish OPUS trial, which followed participants for 10 years,
          found that some clinical advantages of early intervention faded after the program
          ended, particularly when patients returned to standard
          care <Citation id="5" index={5} source="Schizophrenia Bulletin" year="2018" tier={1} />.
          This suggests that the benefits require ongoing investment --- not a brief intensive
          phase followed by treatment-as-usual.
        </p>
        <p className="mb-6">
          However, certain gains proved durable regardless: people who received early
          intervention were more likely to have completed education, established employment,
          and built social networks during the critical period --- structural advantages that
          persisted even when clinical improvements partially faded. The lesson is clear:
          early intervention creates a foundation for recovery, but maintaining that foundation
          requires continued
          support <Citation id="3" index={3} source="Schizophrenia Bulletin" year="2020" tier={1} />.
        </p>

        <ArticleCallout type="warning" title="The Global Access Gap">
          While evidence for early intervention is overwhelming, access remains profoundly
          unequal. In the United States, the NIMH's RAISE initiative catalyzed the
          establishment of CSC programs in every
          state <Citation id="7" index={7} source="National Institute of Mental Health" year="2024" tier={2} />,
          but coverage remains sparse. In England, Early Intervention in Psychosis teams are
          mandated by NHS
          policy <Citation id="9" index={9} source="National Institute for Health and Care Excellence" year="2024" tier={3} />,
          but wait times and caseload sizes compromise delivery. Globally, the vast majority
          of people experiencing first-episode psychosis receive no specialized early
          intervention at
          all <Citation id="8" index={8} source="World Psychiatry" year="2021" tier={1} />.
        </ArticleCallout>

        <h2 id="clinical-staging" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Before the First Episode: Clinical Staging and At-Risk States
        </h2>
        <p className="mb-6">
          The most ambitious frontier in early intervention is identifying people at risk for
          psychosis before the first full episode. The clinical staging
          model <Citation id="6" index={6} source="British Journal of Psychiatry" year="2014" tier={1} />,
          borrowed from oncology, proposes that psychotic disorders progress through identifiable
          stages --- from non-specific symptoms to attenuated (subclinical) psychotic symptoms
          to full-threshold psychosis. If people at the "ultra-high risk" (UHR) stage can be
          identified, intervention might prevent or delay the transition to full psychosis.
        </p>
        <p className="mb-6">
          Approximately 22--36% of people identified as UHR go on to develop full psychotic
          disorders within three years. Current interventions for UHR individuals include
          CBT, omega-3 fatty acids, and close monitoring --- though the ethics and effectiveness
          of pharmacological intervention at this stage remain debated. The promise is enormous:
          preventing psychosis entirely, rather than just treating it early. The challenge is
          that the majority of UHR individuals never develop psychosis, raising concerns about
          unnecessary treatment and the psychological burden of a "pre-psychosis" label.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-027 | Art Therapy, Music Therapy, and Creative Approaches
  // --------------------------------------------------------------------------
  {
    id: catId(27),
    slug: 'art-music-therapy-creative-approaches-psychosis-treatment',
    title: 'Art Therapy, Music Therapy, and Creative Approaches to Psychosis Treatment',
    description: 'How creative arts therapies complement traditional treatment for psychosis --- the evidence for art therapy, music therapy, and drama therapy in improving engagement, expression, and recovery.',
    image: '/images/articles/cat16/cover-027.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 9,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Art Therapy', 'Music Therapy', 'Creative Therapies', 'Treatment'],

    summary: 'Creative arts therapies --- including art therapy, music therapy, drama therapy, and dance/movement therapy --- offer something that medication and talking therapies alone cannot: a way to engage with experiences and emotions that exist beyond language. For people with psychosis, whose inner worlds may be vivid, overwhelming, or difficult to articulate, creative modalities provide alternative channels for expression, processing, and connection. These aren\'t recreational activities dressed up as treatment --- they\'re structured therapeutic interventions delivered by trained professionals, with a growing evidence base showing meaningful effects on negative symptoms, social functioning, and overall wellbeing. Major treatment guidelines now recommend creative arts therapies as part of comprehensive psychosis care.',

    keyFacts: [
      { text: 'NICE guidelines recommend group art therapies for all people with psychosis, particularly for alleviating negative symptoms', citationIndex: 1 },
      { text: 'Music therapy produces moderate improvements in global state, negative symptoms, and social functioning in people with schizophrenia', citationIndex: 2 },
      { text: 'Art therapy reduces negative symptoms with an effect size comparable to some psychosocial interventions', citationIndex: 3 },
      { text: 'Creative therapies may be particularly effective for people who find verbal therapy difficult or threatening --- offering engagement through non-verbal channels', citationIndex: 4 },
      { text: 'Creative arts therapies are delivered by credentialed professionals using structured therapeutic protocols, not recreational activities', citationIndex: 1 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'A person with schizophrenia who can\'t explain what their voices sound like might paint it. Someone who can\'t describe their paranoia in words might drum it. Creative arts therapies don\'t bypass the illness --- they provide a different language for it, one that doesn\'t require the exact cognitive and verbal skills that psychosis disrupts.',

    practicalExercise: {
      title: 'A Simple Creative Expression Exercise',
      steps: [
        { title: 'Choose a medium', description: 'Select something accessible: drawing with colored pencils, playing a simple rhythm on a table, singing along to music, or moving to a beat. No skill or training is needed --- this is about expression, not performance.' },
        { title: 'Express a feeling without words', description: 'Choose a current emotion or internal experience. Without planning or judging, try to express it through your chosen medium for 5--10 minutes. If you\'re drawing, what colors does the feeling have? If you\'re making rhythm, what tempo?' },
        { title: 'Notice what emerged', description: 'Look at, listen to, or reflect on what you created. Not whether it\'s "good," but what it tells you. Did anything surprise you? Did the process itself change how the feeling felt? Some people find that externalizing an experience reduces its intensity.' },
        { title: 'Consider sharing (optionally)', description: 'If you have a trusted therapist, support worker, or friend, consider sharing what you created and what it means to you. The sharing itself --- having an experience witnessed and acknowledged --- can be therapeutic.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Journal About Your Experience',
    },

    citations: [
      { id: '1', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '2', text: 'Music therapy for schizophrenia: A Cochrane systematic review', source: 'Cochrane Database of Systematic Reviews', year: '2017', link: 'https://doi.org/10.1002/14651858.CD004025.pub4', tier: 1 },
      { id: '3', text: 'Art therapy for schizophrenia: A systematic review and meta-analysis', source: 'Schizophrenia Research', year: '2019', link: 'https://doi.org/10.1016/j.schres.2019.01.031', tier: 1 },
      { id: '4', text: 'Creative arts therapies for psychosis: Mechanisms of action and treatment engagement', source: 'Frontiers in Psychology', year: '2020', link: 'https://doi.org/10.3389/fpsyg.2020.00595', tier: 1 },
      { id: '5', text: 'Dance/movement therapy for schizophrenia: A pilot randomized controlled trial', source: 'Body, Movement and Dance in Psychotherapy', year: '2019', link: 'https://doi.org/10.1080/17432979.2019.1653160', tier: 1 },
      { id: '6', text: 'Drama therapy and psychosis: A systematic review of the evidence', source: 'Arts in Psychotherapy', year: '2020', link: 'https://doi.org/10.1016/j.aip.2020.101677', tier: 1 },
      { id: '7', text: 'Neurobiological mechanisms of music therapy in mental health: A narrative review', source: 'World Journal of Psychiatry', year: '2021', link: 'https://doi.org/10.5498/wjp.v11.i8.386', tier: 1 },
      { id: '8', text: 'Recovery-oriented creative arts therapies: Perspectives from service users', source: 'Qualitative Health Research', year: '2020', link: 'https://doi.org/10.1177/1049732320951546', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Psychosis involves experiences that often defy ordinary description. How do you
            explain what it's like to hear voices that no one else can hear? How do you put
            into words the texture of a paranoid belief that feels as real as the chair you're
            sitting in? For many people, the answer is: you don't --- not in words, anyway.
            Creative arts therapies offer an alternative vocabulary --- visual, musical, physical,
            dramatic --- for experiences that words can't fully
            capture <Citation id="4" index={4} source="Frontiers in Psychology" year="2020" tier={1} />.
            Far from being a soft add-on to "real" treatment, these approaches address symptoms
            and needs that medication and talking therapy leave untouched.
          </p>
        </div>

        <h2 id="music-therapy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Music Therapy: The Strongest Evidence Base
        </h2>
        <p className="mb-6">
          Among the creative arts therapies, music therapy has the most robust evidence for
          psychotic
          conditions <Citation id="2" index={2} source="Cochrane Database of Systematic Reviews" year="2017" tier={1} />.
          The Cochrane review found that music therapy, when added to standard care, produces
          significant improvements in global state, negative symptoms, social functioning, and
          quality of life. The effects are dose-dependent: more sessions produce larger gains,
          with the review suggesting a minimum of 20 sessions for meaningful clinical impact.
        </p>
        <p className="mb-6">
          Music therapy for psychosis takes many forms. Active approaches involve creating music
          together --- improvising on instruments, composing songs, using rhythm and melody to
          structure group interaction. Receptive approaches involve listening to music and
          exploring the emotional responses it evokes. Both leverage music's unique capacity to
          bypass verbal processing and engage emotional and social circuits
          directly <Citation id="7" index={7} source="World Journal of Psychiatry" year="2021" tier={1} />.
        </p>

        <ArticleCallout type="insight" title="Why Music Works Differently">
          Music engages the brain differently from speech. It activates reward circuits
          (dopaminergic pathways), emotional processing areas (amygdala, insula), motor
          regions (through rhythm entrainment), and social bonding mechanisms (through
          synchronization). For someone whose verbal processing and social cognition are
          impaired by psychosis, music provides an alternative neural pathway to emotional
          experience and social
          connection <Citation id="7" index={7} source="World Journal of Psychiatry" year="2021" tier={1} />.
        </ArticleCallout>

        <h2 id="art-therapy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Art Therapy: Making the Internal World Visible
        </h2>
        <p className="mb-6">
          Art therapy uses visual art-making --- drawing, painting, sculpting, collage --- as the
          primary medium of therapeutic communication. For people with psychosis, art therapy
          offers a way to externalize internal experiences: a hallucination can be drawn, a
          delusional belief can be depicted, an emotional state can be rendered in color and
          form <Citation id="3" index={3} source="Schizophrenia Research" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          The therapeutic value lies not in the artwork's aesthetic quality but in the process
          itself --- the act of creation, the relationship with the therapist, and the
          conversation that emerges around the art. Externalization is a key mechanism: when
          a frightening experience exists on paper rather than only inside your head, it can
          feel more manageable, more contained. The art object becomes a bridge between the
          person's inner world and shared reality.
        </p>

        <ComparisonTable
          headers={['Modality', 'Primary Medium', 'Key Mechanisms', 'Strongest Evidence For']}
          rows={[
            ['Music therapy', 'Sound, rhythm, melody', 'Reward activation, social synchronization, emotional regulation', 'Negative symptoms, global functioning, social skills'],
            ['Art therapy', 'Visual art-making', 'Externalization, containment, non-verbal expression', 'Negative symptoms, engagement, emotional processing'],
            ['Drama therapy', 'Role-play, storytelling, improvisation', 'Perspective-taking, social skills practice, identity exploration', 'Social cognition, interpersonal skills'],
            ['Dance/movement therapy', 'Body movement, gesture', 'Body awareness, emotional embodiment, group cohesion', 'Body image, social interaction, negative symptoms'],
          ]}
        />

        <h2 id="drama-and-movement" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Drama Therapy and Dance/Movement Therapy
        </h2>
        <p className="mb-6">
          Drama therapy uses theatrical techniques --- role-play, improvisation, storytelling,
          mask work --- to explore emotions, practice social skills, and try on different
          perspectives in a safe
          context <Citation id="6" index={6} source="Arts in Psychotherapy" year="2020" tier={1} />.
          For people with impaired social cognition --- difficulty reading facial expressions,
          understanding others' intentions, or navigating social situations --- drama therapy
          provides structured practice in perspective-taking that feels more like play than
          clinical intervention.
        </p>
        <p className="mb-6">
          Dance and movement therapy approaches the body as a site of experience and
          expression. Psychosis can profoundly alter a person's relationship with their body ---
          some people feel disconnected from physical sensations, while others experience
          somatic symptoms as part of their psychotic
          experiences <Citation id="5" index={5} source="Body, Movement and Dance in Psychotherapy" year="2019" tier={1} />.
          Movement-based interventions help rebuild body awareness, emotional grounding, and
          the physical experience of being present in space. Group movement activities also
          foster social connection through shared physical experience rather than verbal exchange.
        </p>

        <h2 id="what-service-users-say" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What People Who've Participated Say
        </h2>
        <p className="mb-6">
          Qualitative research with people who have participated in creative arts therapies
          for psychosis reveals themes that standard outcome measures often
          miss <Citation id="8" index={8} source="Qualitative Health Research" year="2020" tier={1} />.
          Participants describe rediscovering a sense of identity beyond illness --- "I was an
          artist before I was a patient." They describe finding a space where unusual
          experiences are assets rather than deficits --- a vivid inner world becomes raw
          material for creation rather than evidence of pathology.
        </p>
        <p className="mb-6">
          Perhaps most importantly, participants describe creative arts therapies as the only
          part of their treatment that didn't start from a deficit model --- that didn't begin
          with what's wrong and try to fix it, but instead began with what's possible and
          built from there. This recovery-oriented framing --- where the goal is a meaningful
          life rather than symptom elimination --- aligns with what many people with psychosis
          say they actually want from
          treatment <Citation id="1" index={1} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
        </p>

        <QuoteBlock
          quote="In art therapy I could put what was in my head onto paper. And once it was on paper, it was separate from me. I could look at it, talk about it, even change it. Inside my head it was overwhelming. On paper, it was just a picture."
          author="Service user perspective, Qualitative Health Research, 2020"
        />

        <h2 id="accessing-creative-therapies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Accessing Creative Arts Therapies: Navigating the System
        </h2>
        <p className="mb-6">
          Despite guideline recommendations, creative arts therapies remain underutilized in
          psychosis treatment. Many community mental health teams don't employ arts therapists,
          and those that do often have long wait lists. Funding restrictions mean that some
          services are rationed to those deemed "most in need" --- though creative therapies
          may be most valuable precisely for people who are less engaged with traditional
          treatment modalities.
        </p>
        <p className="mb-6">
          If you're seeking creative arts therapies, start by asking your treatment team directly:
          "Do you have a music therapist, art therapist, or drama therapist on staff?" If not,
          ask for referrals to external providers. In some health systems, arts therapies are
          covered under mental health benefits; in others, they're classified as "complementary"
          and not reimbursed. Community mental health centers, day programs, and peer-run
          organizations often offer group-based arts activities even when individual therapy
          isn't available. University clinics and training programs may provide low-cost
          services delivered by supervised trainees.
        </p>

        <HighlightBox variant="emphasis">
          <p>
            <strong>Credentials matter:</strong> Creative arts therapies are regulated professions
            with specific training requirements. In the United States, look for board certification
            (MT-BC for music therapy, ATR-BC for art therapy, RDT for drama therapy). These
            credentials ensure the practitioner has completed accredited graduate training and
            supervised clinical hours. Recreation programs and hobby groups can be valuable, but
            they're not the same as clinical therapy delivered by a trained professional.
          </p>
        </HighlightBox>

        <h2 id="integration-with-standard-care" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Integration With Standard Care: Complementing, Not Replacing
        </h2>
        <p className="mb-6">
          Creative arts therapies work best when integrated with --- not substituted for ---
          medication and evidence-based psychological therapy. They are not alternative medicine;
          they're complementary interventions that address dimensions of experience that
          medication and talk therapy don't fully
          reach <Citation id="4" index={4} source="Frontiers in Psychology" year="2020" tier={1} />.
          The most effective treatment programs offer creative therapies alongside psychiatry,
          CBTp, family support, and vocational services --- recognizing that recovery requires
          addressing the whole person, not just suppressing symptoms.
        </p>
        <p className="mb-6">
          Research on combined interventions is still emerging, but early evidence suggests
          synergistic effects: people receiving both CBTp and music therapy show greater
          improvements than either intervention alone. Creative therapies may improve engagement
          with medication by providing a positive, non-stigmatizing treatment experience that
          keeps people connected to services. And for people whose negative symptoms make verbal
          therapy difficult, arts therapies can provide a bridge --- building therapeutic
          relationships through non-verbal channels that later transfer to talking therapies.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>Creative arts therapies provide alternative channels for expression and processing when words are inadequate or inaccessible</li>
            <li>Music therapy has the strongest evidence base, with Cochrane reviews showing significant improvements in symptoms and functioning</li>
            <li>Art, drama, and dance/movement therapies each offer unique mechanisms targeting different dimensions of psychotic experience</li>
            <li>These are structured clinical interventions delivered by credentialed professionals, not recreational activities</li>
            <li>Creative therapies work best when integrated with comprehensive care --- medication, therapy, family support, and vocational services</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-028 | Supported Employment and Vocational Rehabilitation
  // --------------------------------------------------------------------------
  {
    id: catId(28),
    slug: 'supported-employment-vocational-rehabilitation-psychosis',
    title: 'Supported Employment and Vocational Rehabilitation for People With Psychosis',
    description: 'How the Individual Placement and Support model is transforming employment outcomes for people with psychosis --- and why work itself is a form of treatment.',
    image: '/images/articles/cat16/cover-028.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 10,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Employment', 'IPS', 'Vocational', 'Recovery'],

    summary: 'For decades, the prevailing assumption in mental health services was that people with psychosis needed to achieve clinical stability before they could work. The Individual Placement and Support (IPS) model inverts this logic: instead of "train then place," it follows "place then train" --- helping people secure competitive employment first and providing support to maintain it. The evidence is overwhelming: IPS consistently achieves employment rates of 55--65% compared to 25% for traditional vocational rehabilitation, and working itself produces clinical benefits that extend beyond what any treatment can achieve alone. Employment provides structure, purpose, social contact, financial independence, and identity beyond illness. Yet access to IPS remains limited, and many people with psychosis who want to work are never offered support to do so.',

    keyFacts: [
      { text: 'IPS achieves competitive employment rates of 55--65% --- approximately double the rate of traditional vocational rehabilitation', citationIndex: 1 },
      { text: 'People with psychosis who work show improvements in self-esteem, symptom severity, and quality of life independent of other treatment effects', citationIndex: 2 },
      { text: 'Only 10--20% of people with schizophrenia in high-income countries are competitively employed, despite most expressing desire to work', citationIndex: 3 },
      { text: 'The "train then place" model has been decisively outperformed by "place then train" across 27+ randomized controlled trials', citationIndex: 1 },
      { text: 'IPS has no exclusion criteria based on symptoms, substance use, or work history --- anyone who wants to work is eligible', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'Traditional rehabilitation said: get better first, then we\'ll help you work. IPS says: start working now, and we\'ll help you succeed. That inversion --- treating work as part of recovery rather than proof of it --- changed everything about employment outcomes for people with psychosis.',

    practicalExercise: {
      title: 'Taking the First Step Toward Employment',
      steps: [
        { title: 'Clarify what you want', description: 'What kind of work interests you? This isn\'t about what you think you "should" do or what feels realistic --- it\'s about what appeals to you. IPS starts with preferences, not limitations.' },
        { title: 'Ask about IPS services', description: 'Contact your mental health treatment team and ask: "Do you have an employment specialist or IPS program?" If not, search for "supported employment" or "IPS program" plus your area.' },
        { title: 'Consider volunteering as a bridge', description: 'If competitive employment feels overwhelming, volunteering can provide structure, social contact, and a resume builder. But it should be a bridge to paid work, not a permanent alternative.' },
        { title: 'Know your rights', description: 'In most countries, people with mental health conditions have legal protections against employment discrimination. You are not required to disclose your diagnosis to employers, and reasonable accommodations (flexible scheduling, quiet workspace) are legally mandated in many jurisdictions.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Work-Related Goals',
    },

    citations: [
      { id: '1', text: 'Supported employment for adults with severe mental illness: A Cochrane systematic review', source: 'Cochrane Database of Systematic Reviews', year: '2019', link: 'https://doi.org/10.1002/14651858.CD008331.pub3', tier: 1 },
      { id: '2', text: 'The clinical benefits of employment for people with psychosis: A systematic review', source: 'Schizophrenia Research', year: '2020', link: 'https://doi.org/10.1016/j.schres.2020.02.005', tier: 1 },
      { id: '3', text: 'Employment rates and barriers for people with schizophrenia: A cross-national study', source: 'Social Psychiatry and Psychiatric Epidemiology', year: '2019', link: 'https://doi.org/10.1007/s00127-019-01760-8', tier: 1 },
      { id: '4', text: 'The IPS Employment Center: Principles of Individual Placement and Support', source: 'Dartmouth Psychiatric Research Center', year: '2024', link: 'https://ipsworks.org', tier: 3 },
      { id: '5', text: 'Cognitive remediation combined with supported employment: A randomized controlled trial', source: 'American Journal of Psychiatry', year: '2018', link: 'https://doi.org/10.1176/appi.ajp.2017.17060700', tier: 1 },
      { id: '6', text: 'Employment as a clinical intervention: Evidence and mechanisms', source: 'World Psychiatry', year: '2020', link: 'https://doi.org/10.1002/wps.20733', tier: 1 },
      { id: '7', text: 'IPS implementation across 22 countries: What we have learned', source: 'Psychiatric Rehabilitation Journal', year: '2021', link: 'https://doi.org/10.1037/prj0000474', tier: 1 },
      { id: '8', text: 'Understanding schizophrenia', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "I want to work." It's one of the most commonly expressed goals among people with
            psychotic disorders --- and one of the most commonly
            unaddressed <Citation id="3" index={3} source="Social Psychiatry and Psychiatric Epidemiology" year="2019" tier={1} />.
            Employment rates for people with schizophrenia hover around 10--20% in most
            high-income countries, despite the majority expressing desire to work. The gap
            between aspiration and reality reflects not a lack of capability but a lack of
            support --- and, until recently, a fundamental misunderstanding of the relationship
            between work and recovery.
          </p>
        </div>

        <h2 id="ips-model" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The IPS Model: Place Then Train
        </h2>
        <p className="mb-6">
          Traditional vocational rehabilitation followed a "train then place" model: people
          would attend pre-vocational training programs, develop work skills in sheltered
          settings, and --- theoretically --- graduate to competitive employment. The problem
          was that graduation rarely happened. People got stuck in training programs or
          sheltered workshops indefinitely, never transitioning to real jobs in real workplaces.
        </p>
        <p className="mb-6">
          Individual Placement and Support (IPS) inverts this
          sequence <Citation id="4" index={4} source="Dartmouth Psychiatric Research Center" year="2024" tier={3} />.
          It helps people secure competitive employment as quickly as possible and then
          provides ongoing support to maintain it. The approach is guided by eight core
          principles:
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Competitive Employment as the Goal',
              content: 'The target is regular jobs in regular workplaces at or above minimum wage --- not sheltered workshops, simulated work environments, or volunteer positions. This isn\'t an aspirational ideal; it\'s the operational starting point.',
            },
            {
              title: 'Zero Exclusion',
              content: 'Anyone who wants to work is eligible. There are no readiness criteria, no psychiatric stability requirements, and no cognitive screening. The assumption is that everyone deserves the opportunity to try.',
            },
            {
              title: 'Rapid Job Search',
              content: 'Job searching begins within weeks of program enrollment --- not after months of pre-vocational training. Employment specialists help with resumes, interview preparation, and job applications immediately.',
            },
            {
              title: 'Integration With Clinical Treatment',
              content: 'Employment specialists are embedded within clinical teams, attending treatment meetings and coordinating with clinicians. Employment and treatment inform each other rather than operating in parallel silos.',
            },
          ]}
        />

        <h2 id="the-evidence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Evidence: 27+ Trials and Counting
        </h2>
        <p className="mb-6">
          IPS has been evaluated in more randomized controlled trials than virtually any other
          psychosocial intervention in mental
          health <Citation id="1" index={1} source="Cochrane Database of Systematic Reviews" year="2019" tier={1} />.
          Across 27+ trials conducted in North America, Europe, Asia, and Australia, the
          finding is remarkably consistent: IPS approximately doubles the rate of competitive
          employment compared to any alternative approach.
        </p>

        <ArticleChart
          type="bar"
          data={[
            { label: 'IPS supported employment', value: 58 },
            { label: 'Traditional vocational rehabilitation', value: 24 },
            { label: 'Treatment as usual', value: 14 },
          ]}
          title="Competitive employment rates by intervention type (%)"
          source="Cochrane Database of Systematic Reviews, 2019"
        />

        <p className="mt-6 mb-6">
          Beyond employment rates, IPS participants work more hours, earn more income, and
          maintain employment for longer periods. When IPS is combined with cognitive
          remediation --- exercises that target the cognitive deficits that often accompany
          psychosis --- outcomes improve even
          further <Citation id="5" index={5} source="American Journal of Psychiatry" year="2018" tier={1} />.
        </p>

        <h2 id="work-as-treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Work as Treatment: The Clinical Benefits of Employment
        </h2>
        <p className="mb-6">
          Perhaps the most important shift in thinking about employment and psychosis is the
          recognition that work isn't just an outcome of recovery --- it's a driver of
          it <Citation id="6" index={6} source="World Psychiatry" year="2020" tier={1} />.
          Systematic reviews show that people with psychosis who work show improvements in:
        </p>
        <p className="mb-6">
          Self-esteem and sense of identity --- being "an employee" rather than "a patient."
          Symptom severity --- the structure and distraction of work can reduce preoccupation
          with psychotic experiences. Social functioning --- the workplace provides natural social
          contact that clinical settings cannot replicate. Financial independence --- reducing
          the poverty that compounds psychiatric
          disability <Citation id="2" index={2} source="Schizophrenia Research" year="2020" tier={1} />.
        </p>

        <ArticleCallout type="info" title="Addressing the Fear of Losing Benefits">
          A common barrier to employment is fear of losing disability benefits. In many
          jurisdictions, returning to work doesn't mean losing all support --- graduated
          return-to-work provisions, trial work periods, and continued access to healthcare
          are often available. An IPS employment specialist can help navigate these systems,
          ensuring that taking a job doesn't inadvertently create financial
          risk <Citation id="8" index={8} source="National Institute of Mental Health" year="2024" tier={2} />.
        </ArticleCallout>

        <h2 id="implementation-challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Implementation Challenges and the Path Forward
        </h2>
        <p className="mb-6">
          Despite overwhelming evidence, IPS implementation remains
          limited <Citation id="7" index={7} source="Psychiatric Rehabilitation Journal" year="2021" tier={1} />.
          As of 2021, IPS programs operated in at least 22 countries, but coverage within
          each country was typically sparse. Barriers include funding structures that separate
          mental health and employment services, employer reluctance, and clinician attitudes
          that underestimate patients' work capacity.
        </p>
        <p className="mb-6">
          The path forward requires treating employment support as a standard component of
          psychosis treatment --- not an optional extra. When we accept that work is therapeutic,
          the question shifts from "Is this person ready to work?" to "What support does this
          person need to work?" That reframing --- from gatekeeping to enabling --- is the
          essence of recovery-oriented care.
        </p>

        <h2 id="employer-perspective" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          From the Employer's Perspective: Why Hiring Makes Business Sense
        </h2>
        <p className="mb-6">
          Employer reluctance is often cited as a barrier to employment for people with psychosis,
          but this reluctance is rooted more in stigma and misperception than in actual experience.
          Studies following employers who have hired people with psychosis through IPS programs
          reveal high levels of satisfaction. Workers with psychosis show comparable or better
          job performance, lower turnover rates, and fewer workplace accidents than employees
          hired through conventional channels.
        </p>
        <p className="mb-6">
          The business case for supported employment is straightforward: employment specialists
          do the heavy lifting of recruitment, training support, and ongoing consultation at no
          cost to the employer. When issues arise, the employment specialist intervenes quickly,
          often resolving problems that would otherwise lead to termination. In effect, the
          employer gains a dedicated HR consultant focused on one employee's success. This
          support infrastructure makes hiring someone with psychosis through IPS a lower-risk
          proposition than hiring someone without any support system in place.
        </p>

        <MythVsFactBlock
          myth="People with schizophrenia can't handle the stress of competitive employment"
          fact="IPS achieves 55-65% employment rates in competitive jobs, and working itself reduces symptoms and improves quality of life for most participants"
        />
        <MythVsFactBlock
          myth="You have to be symptom-free before you can work"
          fact="IPS has zero exclusion criteria — people work successfully while managing ongoing symptoms, with employment itself often reducing symptom severity"
        />
        <MythVsFactBlock
          myth="Pre-vocational training prepares people better than direct job placement"
          fact="27+ randomized trials show 'place then train' (IPS) consistently doubles employment rates compared to 'train then place' approaches"
        />

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>The IPS model's "place then train" approach consistently doubles employment rates compared to traditional vocational rehabilitation</li>
            <li>Employment provides clinical benefits independent of other treatments --- improving self-esteem, reducing symptoms, and enhancing quality of life</li>
            <li>IPS has no exclusion criteria --- symptom severity, substance use, and work history do not disqualify anyone from services</li>
            <li>Most people with psychosis want to work, but fewer than 20% are employed --- the gap reflects lack of support, not lack of capability</li>
            <li>Supported employment should be a standard component of psychosis treatment, not an add-on for the 'high-functioning'</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-029 | Exercise and Physical Health in Psychotic Conditions
  // --------------------------------------------------------------------------
  {
    id: catId(29),
    slug: 'exercise-physical-health-psychotic-conditions',
    title: 'Exercise and Physical Health in Psychotic Conditions',
    description: 'The evidence for exercise as a treatment for psychosis symptoms --- how physical activity improves cognition, mood, and physical health in people with schizophrenia and related conditions.',
    image: '/images/articles/cat16/cover-029.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 10,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Exercise', 'Physical Health', 'Treatment', 'Wellbeing'],

    summary: 'People with schizophrenia die 15--20 years earlier than the general population --- and the leading causes are cardiovascular disease, diabetes, and other conditions that are largely preventable through lifestyle modification and medical monitoring. This life expectancy gap is one of the greatest health disparities in medicine, driven by a toxic combination of metabolic side effects from antipsychotic medications, reduced physical activity, poor dietary options, limited access to preventive healthcare, and a healthcare system that treats the mind and body as separate domains. Exercise is emerging as a powerful intervention that addresses both sides of this equation: it improves physical health markers while simultaneously producing meaningful improvements in psychiatric symptoms, cognition, and quality of life.',

    keyFacts: [
      { text: 'People with schizophrenia have a 15--20 year reduction in life expectancy, primarily due to cardiovascular disease and metabolic conditions', citationIndex: 1 },
      { text: 'Aerobic exercise produces moderate improvements in cognitive function comparable to cognitive remediation therapy', citationIndex: 2 },
      { text: 'Exercise interventions reduce positive and negative symptoms with effect sizes of 0.3--0.5, comparable to adding a second antipsychotic', citationIndex: 3 },
      { text: 'Physical activity levels in people with schizophrenia are approximately 50% lower than age-matched controls', citationIndex: 4 },
      { text: 'Exercise increases brain-derived neurotrophic factor (BDNF) and promotes hippocampal neurogenesis, potentially counteracting brain changes in schizophrenia', citationIndex: 7 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'If exercise were a pill, it would be the most broadly effective medication in psychiatry. It improves cognition, reduces symptoms, combats medication side effects, prevents cardiovascular disease, and enhances quality of life. It has no patent, costs nothing, and the side effects are almost entirely positive. The challenge isn\'t the evidence --- it\'s making it accessible.',

    practicalExercise: {
      title: 'Starting an Exercise Routine With Low Motivation',
      steps: [
        { title: 'Forget the gym', description: 'You don\'t need a gym membership, special equipment, or athletic clothing. Walking counts. Dancing in your room counts. Stretching counts. Any movement above your baseline is progress.' },
        { title: 'Set the bar absurdly low', description: 'Your initial goal should feel embarrassingly easy: walk to the end of the block and back. Do three stretches. Stand up from the couch five times. The purpose is to build the habit of "doing something physical," not to achieve a fitness milestone.' },
        { title: 'Attach it to something you already do', description: 'Link exercise to an existing routine: walk after breakfast, stretch before your favorite show, do arm circles while the kettle boils. Attaching a new behavior to an established one makes it more likely to stick.' },
        { title: 'Track only participation', description: 'Mark each day you did any physical activity --- even 2 minutes. Don\'t track duration, intensity, or calories. Over weeks, you\'ll likely notice natural increases in both duration and enjoyment without the pressure of targets.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Activity and Mood',
    },

    citations: [
      { id: '1', text: 'Mortality in schizophrenia: A systematic review and meta-analysis of population-based studies', source: 'The Lancet Psychiatry', year: '2019', link: 'https://doi.org/10.1016/S2215-0366(19)30059-X', tier: 1 },
      { id: '2', text: 'Exercise and cognitive function in schizophrenia: A systematic review and meta-analysis', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S003329171900382X', tier: 1 },
      { id: '3', text: 'Exercise intervention for people with schizophrenia: A Cochrane systematic review', source: 'Cochrane Database of Systematic Reviews', year: '2020', link: 'https://doi.org/10.1002/14651858.CD004412.pub4', tier: 1 },
      { id: '4', text: 'Sedentary behavior and physical activity in people with schizophrenia: A systematic review and meta-analysis', source: 'Schizophrenia Research', year: '2019', link: 'https://doi.org/10.1016/j.schres.2019.02.007', tier: 1 },
      { id: '5', text: 'Metabolic monitoring of patients receiving antipsychotics: International guidelines and implementation', source: 'World Psychiatry', year: '2020', link: 'https://doi.org/10.1002/wps.20714', tier: 1 },
      { id: '6', text: 'Lifestyle interventions for people with severe mental illness: A systematic review and meta-analysis', source: 'The Lancet Psychiatry', year: '2019', link: 'https://doi.org/10.1016/S2215-0366(19)30230-7', tier: 1 },
      { id: '7', text: 'Neurobiological mechanisms linking physical exercise and mental health in schizophrenia', source: 'Neuroscience & Biobehavioral Reviews', year: '2021', link: 'https://doi.org/10.1016/j.neubiorev.2021.03.017', tier: 1 },
      { id: '8', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '9', text: 'Physical health guidelines for people with severe mental illness', source: 'World Federation of Societies of Biological Psychiatry', year: '2020', link: 'https://doi.org/10.1080/15622975.2020.1728291', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            A person diagnosed with schizophrenia at age 25 can expect, on average, to live
            15--20 fewer years than someone without the
            condition <Citation id="1" index={1} source="The Lancet Psychiatry" year="2019" tier={1} />.
            This isn't primarily because of suicide or violence --- it's because of heart disease,
            diabetes, and metabolic syndrome. It is one of the largest health disparities in
            the developed world, and it is largely preventable. Exercise sits at the intersection
            of this crisis: it simultaneously addresses the physical health catastrophe and
            produces psychiatric benefits that rival those of medications and therapy.
          </p>
        </div>

        <h2 id="mortality-gap" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Physical Health Crisis in Psychotic Conditions
        </h2>
        <p className="mb-6">
          The life expectancy gap for people with schizophrenia has not narrowed over the past
          three decades --- in some countries, it has actually
          widened <Citation id="1" index={1} source="The Lancet Psychiatry" year="2019" tier={1} />.
          The primary drivers are cardiovascular disease, metabolic syndrome, and type 2
          diabetes, all of which occur at dramatically higher rates than in the general population.
        </p>

        <StatCard
          stats={[
            { value: 15, suffix: '--20 yrs', label: 'Life expectancy reduction' },
            { value: 2, suffix: '--3×', label: 'Higher cardiovascular mortality' },
            { value: 50, suffix: '%', label: 'Lower physical activity levels' },
          ]}
          source="The Lancet Psychiatry, 2019; Schizophrenia Research, 2019"
        />

        <p className="mt-6 mb-6">
          Multiple factors converge to create this crisis: antipsychotic medications --- particularly
          second-generation drugs like olanzapine and clozapine --- cause significant weight gain,
          insulin resistance, and dyslipidemia. Negative symptoms reduce motivation for physical
          activity. Poverty limits access to healthy food. Smoking rates are 2--3 times higher.
          And perhaps most insidiously, healthcare systems routinely fail to monitor and treat
          the physical health of people with serious mental
          illness <Citation id="5" index={5} source="World Psychiatry" year="2020" tier={1} />.
        </p>

        <h2 id="exercise-psychiatric-benefits" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Exercise as Psychiatric Treatment
        </h2>
        <p className="mb-6">
          The psychiatric benefits of exercise in schizophrenia are increasingly well-documented
          and clinically
          significant <Citation id="3" index={3} source="Cochrane Database of Systematic Reviews" year="2020" tier={1} />.
          The Cochrane review of exercise interventions found improvements in both positive
          symptoms (hallucinations, delusions) and negative symptoms (motivation, social
          withdrawal), with effect sizes of 0.3--0.5 --- comparable to the incremental benefit
          of adding a second antipsychotic to a treatment regimen.
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Cognitive Benefits',
              content: 'Aerobic exercise produces moderate improvements in attention, working memory, and processing speed --- the cognitive domains most affected by schizophrenia. A meta-analysis found effect sizes comparable to dedicated cognitive remediation programs, suggesting exercise may be the most cost-effective cognitive intervention available. The mechanism likely involves exercise-induced increases in brain-derived neurotrophic factor (BDNF), hippocampal neurogenesis, and improved cerebral blood flow.',
            },
            {
              label: 'Symptom Reduction',
              content: 'Both aerobic exercise and resistance training reduce positive and negative symptoms. The effects appear dose-dependent: more frequent and intense exercise produces larger symptom reductions. Group-based exercise may offer additional benefits through social interaction. The mechanisms likely include dopamine system modulation, stress hormone regulation, and improved sleep quality.',
            },
            {
              label: 'Metabolic Benefits',
              content: 'Exercise directly counteracts the metabolic effects of antipsychotic medication: reducing weight, improving insulin sensitivity, lowering blood pressure, and improving lipid profiles. These effects can be achieved even when medication-related weight gain continues, suggesting that exercise and medication side effects operate through partially independent pathways.',
            },
          ]}
        />

        <h2 id="making-it-happen" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Making Exercise Accessible: Overcoming the Barriers
        </h2>
        <p className="mb-6">
          The challenge with exercise for people with psychosis isn't the evidence --- it's
          the implementation. Negative symptoms directly impair motivation. Medication-related
          sedation makes physical activity feel exhausting. Social anxiety makes gym
          environments overwhelming. Poverty limits access to facilities and
          equipment <Citation id="4" index={4} source="Schizophrenia Research" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          Successful exercise programs for this population share several features: they start
          with very low intensity and duration; they are facilitated rather than self-directed;
          they integrate social elements that make participation rewarding; and they treat
          participation as the metric of success rather than fitness
          targets <Citation id="6" index={6} source="The Lancet Psychiatry" year="2019" tier={1} />.
          Walking groups, supervised gym sessions, yoga classes, and team sports adapted
          for varying ability levels have all shown effectiveness.
        </p>

        <ArticleCallout type="tip" title="For Clinicians and Support Workers">
          Exercise is among the most underutilized interventions in psychosis care. Consider
          prescribing physical activity as deliberately as you prescribe medication --- with
          specific type, duration, and frequency recommendations. Better yet, integrate
          exercise into treatment
          settings <Citation id="8" index={8} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
          On-site walking groups, in-clinic exercise sessions, and partnerships with
          community fitness facilities can bridge the gap between recommendation and
          reality <Citation id="9" index={9} source="World Federation of Societies of Biological Psychiatry" year="2020" tier={3} />.
        </ArticleCallout>

        <h2 id="neurobiological-mechanisms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Exercise Changes the Brain in Psychosis
        </h2>
        <p className="mb-6">
          The neurobiological mechanisms linking exercise to psychiatric improvement in
          psychosis are becoming increasingly
          clear <Citation id="7" index={7} source="Neuroscience & Biobehavioral Reviews" year="2021" tier={1} />.
          Aerobic exercise increases levels of BDNF --- a protein crucial for neuronal growth
          and survival --- which is typically reduced in schizophrenia. It promotes hippocampal
          neurogenesis, potentially counteracting the hippocampal volume reductions observed
          in the condition. It modulates dopamine and serotonin signaling in ways that
          complement (rather than duplicate) the effects of antipsychotic medication.
        </p>
        <p className="mb-6">
          Exercise also reduces systemic inflammation --- and there is growing evidence that
          neuroinflammation plays a role in the pathophysiology of schizophrenia. It
          improves sleep quality, which is frequently disrupted in psychotic conditions.
          And it activates the hypothalamic-pituitary-adrenal (HPA) axis in ways that
          build stress resilience over time. In short, exercise acts on multiple
          pathological pathways simultaneously --- making it one of the most biologically
          comprehensive interventions available.
        </p>

        <h2 id="practical-prescription" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Type of Exercise? Practical Prescriptions
        </h2>
        <p className="mb-6">
          The evidence base for exercise in psychosis primarily comes from supervised aerobic
          exercise programs --- walking, cycling, jogging, or group fitness classes at moderate
          intensity for 30-60 minutes, 2-3 times per week. This is the "dosage" that has
          produced measurable clinical benefits in research
          trials <Citation id="3" index={3} source="Cochrane Database of Systematic Reviews" year="2020" tier={1} />.
          However, resistance training, yoga, and team sports have also shown benefits, suggesting
          that the best exercise is the one that gets done consistently.
        </p>
        <p className="mb-6">
          For people with low baseline activity levels --- which describes most people with
          schizophrenia --- starting with even 10-15 minutes of walking three times per week
          represents a meaningful increase. The goal is progressive: start where you are, add
          small increments over weeks, and prioritize consistency over intensity. Supervised
          or group-based programs show better adherence than "just exercise on your own"
          recommendations, suggesting that social support and structure are key enablers.
        </p>

        <StatCard
          stats={[
            { value: 30, suffix: ' min', label: 'Minimum duration per session in research trials' },
            { value: 3, suffix: '× per week', label: 'Minimum frequency for clinical benefits' },
            { value: 50, suffix: '%', label: 'Improvement in adherence with supervised vs. independent exercise' },
          ]}
          source="Cochrane Database of Systematic Reviews, 2020"
        />

        <ArticleCallout variant="action" title="For Healthcare Providers">
          <p className="mb-4">
            Exercise should be prescribed as deliberately as medication: specify type, duration,
            frequency, and intensity. Better yet, integrate exercise into treatment settings.
            On-site walking groups, partnerships with community gyms offering reduced rates,
            and referrals to exercise physiologists trained in mental health can bridge the
            gap between recommendation and
            reality <Citation id="8" index={8} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
          </p>
          <p>
            Monitor physical health metrics routinely: weight, blood pressure, glucose, lipids.
            When antipsychotics cause weight gain, prescribing exercise isn't optional --- it's
            harm reduction. And when someone's negative symptoms make initiating activity nearly
            impossible, consider prescribing facilitated exercise as you would any other
            therapeutic
            intervention <Citation id="9" index={9} source="World Federation of Societies of Biological Psychiatry" year="2020" tier={3} />.
          </p>
        </ArticleCallout>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>The 15-20 year life expectancy gap for people with schizophrenia is driven primarily by preventable cardiovascular disease, not by the psychiatric condition itself</li>
            <li>Exercise produces benefits across psychiatric, cognitive, and physical health domains — it's one of the most comprehensive interventions available</li>
            <li>The effective "dose" is 30-60 minutes of moderate aerobic activity, 2-3 times per week — but starting with less is far better than not starting at all</li>
            <li>Supervised and group-based programs dramatically improve adherence compared to independent exercise recommendations</li>
            <li>Exercise should be prescribed, facilitated, and monitored as deliberately as medication — not mentioned briefly at the end of appointments</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-030 | Navigating the Mental Health System With Psychosis
  // --------------------------------------------------------------------------
  {
    id: catId(30),
    slug: 'navigating-mental-health-system-psychosis-practical-guide',
    title: 'Navigating the Mental Health System With Psychosis: A Practical Guide',
    description: 'A practical guide to navigating psychiatric services, understanding your rights, communicating with treatment teams, and advocating for comprehensive care when living with psychosis.',
    image: '/images/articles/cat16/cover-030.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 10,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Healthcare Navigation', 'Patient Rights', 'Advocacy', 'Practical Guide'],

    summary: 'The mental health system can be bewildering even for people without psychiatric conditions --- and for someone experiencing psychosis, navigating complex bureaucracies while managing symptoms that affect thinking and communication adds layers of difficulty. This practical guide addresses the questions that people with psychosis and their families most commonly face: How do you find the right treatment? What should you expect from your care team? What are your legal rights regarding treatment and hospitalization? How do you advocate for comprehensive care in systems that often default to medication-only approaches? Whether you\'re newly diagnosed, supporting a family member, or years into your journey, understanding the system is the first step to getting what you need from it.',

    keyFacts: [
      { text: 'People with psychosis report that feeling heard and respected by their treatment team is among the strongest predictors of treatment engagement and satisfaction', citationIndex: 1 },
      { text: 'Advance directives for mental health allow people to specify treatment preferences while well --- providing guidance for situations when they may not be able to communicate preferences', citationIndex: 2 },
      { text: 'Shared decision-making in psychosis care is associated with improved treatment adherence, satisfaction, and therapeutic alliance', citationIndex: 3 },
      { text: 'Peer navigators --- people with lived experience of psychosis who guide others through the system --- improve engagement and reduce hospitalization', citationIndex: 4 },
      { text: 'Comprehensive psychosis care should include medication, psychological therapy, family support, and vocational assistance --- medication alone is substandard care', citationIndex: 7 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The mental health system was designed by people who don\'t use it, for people who didn\'t ask for it, in language that assumes the person navigating it has the cognitive and executive function that their condition may impair. Recognizing this isn\'t cynicism --- it\'s the starting point for effective advocacy.',

    practicalExercise: {
      title: 'Creating Your Treatment Advocacy Kit',
      steps: [
        { title: 'Write a one-page summary', description: 'Create a document that includes: your diagnoses, current medications and doses, allergies, your treatment team contacts, your emergency contacts, and --- most importantly --- what works for you when you\'re in crisis. Update it every 6 months.' },
        { title: 'Prepare for appointments', description: 'Before each appointment, write down: your top 3 concerns, any medication side effects, changes in symptoms, and one question you want answered. Bring this paper with you --- it\'s easy to forget things during short appointments.' },
        { title: 'Consider an advance directive', description: 'While you\'re well, write down your treatment preferences for situations when you may not be able to advocate for yourself: preferred hospital, acceptable and unacceptable medications, who should be contacted, what interventions help during crises.' },
        { title: 'Identify an advocate', description: 'Choose someone --- a family member, friend, peer specialist, or patient advocate --- who can attend appointments with you, help you communicate your needs, and follow up on care plans when you\'re unable to.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Treatment Experiences',
    },

    citations: [
      { id: '1', text: 'Therapeutic alliance and treatment engagement in psychosis: A systematic review', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291720001282', tier: 1 },
      { id: '2', text: 'Psychiatric advance directives: A systematic review of outcomes', source: 'Psychiatric Services', year: '2019', link: 'https://doi.org/10.1176/appi.ps.201800437', tier: 1 },
      { id: '3', text: 'Shared decision making in psychiatry: A systematic review and meta-analysis', source: 'The Lancet Psychiatry', year: '2020', link: 'https://doi.org/10.1016/S2215-0366(20)30191-7', tier: 1 },
      { id: '4', text: 'Peer support services for people with psychosis: A systematic review and meta-analysis', source: 'Psychiatric Services', year: '2020', link: 'https://doi.org/10.1176/appi.ps.201900418', tier: 1 },
      { id: '5', text: 'Mental Health Act reform: International perspectives', source: 'The Lancet Psychiatry', year: '2021', link: 'https://doi.org/10.1016/S2215-0366(21)00263-4', tier: 1 },
      { id: '6', text: 'Patient experience measures in psychosis: A systematic review', source: 'Schizophrenia Bulletin', year: '2019', link: 'https://doi.org/10.1093/schbul/sby176', tier: 1 },
      { id: '7', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '8', text: 'Understanding schizophrenia', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Receiving a diagnosis of a psychotic disorder --- or watching someone you love
            receive one --- often feels like being dropped into a foreign country without a
            map or
            phrasebook <Citation id="6" index={6} source="Schizophrenia Bulletin" year="2019" tier={1} />.
            The language is clinical. The systems are complex. The decisions feel
            overwhelming. And the very condition you're trying to get treated may impair
            the cognitive and executive functions needed to navigate the bureaucracy.
            This guide can't fix that system, but it can provide the map.
          </p>
        </div>

        <h2 id="building-your-team" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Building Your Treatment Team
        </h2>
        <p className="mb-6">
          Comprehensive psychosis care involves multiple professionals, and understanding
          each role helps you know what to expect and what to
          ask <Citation id="7" index={7} source="National Institute for Health and Care Excellence" year="2024" tier={3} />:
        </p>

        <ComparisonTable
          headers={['Role', 'What They Do', 'What to Ask Them']}
          rows={[
            ['Psychiatrist', 'Prescribes and manages medication; diagnoses conditions', '"What are the alternatives if this medication doesn\'t work?" "What side effects should I watch for?"'],
            ['Psychologist / Therapist', 'Provides CBTp, family therapy, or other psychological interventions', '"What approach do you use?" "How will we know it\'s working?"'],
            ['Care Coordinator / Case Manager', 'Coordinates services, manages referrals, ensures continuity', '"Who do I call when something goes wrong?" "What services am I entitled to?"'],
            ['Peer Support Specialist', 'Shares lived experience, provides mentoring and navigation', '"What helped you most in your recovery?" "Can you help me understand what to expect?"'],
            ['Social Worker', 'Helps with housing, benefits, employment, legal issues', '"What financial support am I eligible for?" "Can you help with housing?"'],
          ]}
        />

        <p className="mt-6 mb-6">
          Not every setting provides all of these roles. If your current care consists only
          of a psychiatrist prescribing medication, you are receiving less than what guidelines
          recommend <Citation id="7" index={7} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
          Asking for referrals to psychological therapy, family support, and vocational
          services is not being demanding --- it's requesting standard care.
        </p>

        <h2 id="your-rights" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding Your Rights
        </h2>
        <p className="mb-6">
          Mental health law varies by country and jurisdiction, but several rights are
          near-universal in high-income
          nations <Citation id="5" index={5} source="The Lancet Psychiatry" year="2021" tier={1} />:
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Informed Consent',
              content: 'You have the right to understand your diagnosis, treatment options, potential benefits and risks, and alternatives to the proposed treatment. Consent should be informed and voluntary. If you feel pressured into treatment without adequate information, you have the right to ask for more time, more information, or a second opinion.',
            },
            {
              title: 'Involuntary Treatment',
              content: 'In most jurisdictions, involuntary hospitalization or treatment requires meeting specific legal criteria --- typically imminent danger to self or others, or inability to care for oneself. These decisions must be reviewed by a tribunal or court within specified timeframes. You have the right to legal representation during these proceedings.',
            },
            {
              title: 'Advance Directives',
              content: 'Psychiatric advance directives allow you to specify your treatment preferences while you\'re well --- documenting which medications you consent to, which you refuse, who should make decisions if you\'re unable to, and what interventions help during crisis. These documents carry legal weight in many jurisdictions and should be shared with your treatment team.',
            },
            {
              title: 'Access to Records',
              content: 'You have the right to access your medical records in most jurisdictions. Reading your own file can be informative and sometimes surprising --- if something is inaccurate, you typically have the right to request corrections.',
            },
          ]}
        />

        <h2 id="shared-decision-making" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Shared Decision-Making: Your Voice Matters
        </h2>
        <p className="mb-6">
          Shared decision-making means that treatment decisions are made collaboratively
          between you and your clinician --- not imposed on
          you <Citation id="3" index={3} source="The Lancet Psychiatry" year="2020" tier={1} />.
          This approach is associated with better treatment adherence, higher satisfaction,
          and stronger therapeutic relationships. In practice, it means your preferences,
          values, and goals should inform every treatment decision, from medication choice
          to therapy approach to discharge planning.
        </p>

        <ArticleCallout type="tip" title="When You Feel Unheard">
          If you feel your treatment team isn't listening, you have options. You can request
          a care review or case conference. You can ask for a second opinion from another
          clinician. You can contact a patient advocate --- most hospitals and health systems
          have advocacy services. You can bring a support person to appointments who can
          help you articulate your concerns. And you can put your concerns in writing, which
          creates a record and often receives more formal
          attention <Citation id="1" index={1} source="Psychological Medicine" year="2020" tier={1} />.
        </ArticleCallout>

        <h2 id="peer-navigation" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Peer Navigation: Guides Who've Been There
        </h2>
        <p className="mb-6">
          One of the most effective innovations in mental health service delivery is the
          peer navigator --- a person with their own lived experience of psychosis who helps
          others navigate the
          system <Citation id="4" index={4} source="Psychiatric Services" year="2020" tier={1} />.
          Peer navigators understand the system from the inside, can translate clinical
          jargon into plain language, and offer the credibility that comes from having
          walked the same path.
        </p>
        <p className="mb-6">
          Research shows that peer navigation improves engagement with services, reduces
          hospitalization, and increases satisfaction with care. Peer navigators can
          accompany you to appointments, help you prepare questions, debrief after difficult
          conversations, and connect you with community resources. If your treatment
          program doesn't include peer support, organizations like NAMI, the Hearing
          Voices Network, and local peer-run organizations can often provide it.
        </p>
        <p className="mb-6">
          Navigating the mental health system with psychosis shouldn't require a PhD in
          bureaucracy. But until systems are redesigned around the people they serve, the
          best defense is knowledge: understanding your rights, knowing what standard care
          looks like, and having people in your corner who can help you get what you
          need <Citation id="8" index={8} source="National Institute of Mental Health" year="2024" tier={2} />.
        </p>

        <h2 id="communication-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Communication Strategies: Making Yourself Heard
        </h2>
        <p className="mb-6">
          Communicating effectively with treatment teams is challenging when psychosis impairs
          concentration, organization of thought, or verbal expression. Simple strategies can
          make appointments more productive: writing concerns down before the appointment,
          bringing a support person who can fill in gaps, and asking the clinician to summarize
          what was discussed at the end. If you don't understand something, say so --- complex
          clinical terminology is jargon, not a test of your intelligence.
        </p>
        <p className="mb-6">
          When you disagree with a recommendation, frame it as a question rather than refusal:
          "Can you help me understand why you're recommending this medication instead of the
          one I'm currently taking?" This signals engagement rather than resistance and often
          surfaces information that changes your perspective --- or the clinician's. If the
          answer doesn't satisfy you, it's appropriate to say: "I'd like time to think about
          this" or "I'd like to get a second opinion before deciding."
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Before the Appointment', description: 'Write down your top 3 concerns, any medication side effects, and one question you want answered. Bring this list and refer to it during the appointment. Consider bringing a support person who can help you remember and communicate.' },
            { title: 'During the Appointment', description: 'If you don\'t understand something, ask for clarification immediately. Take notes or ask if you can record the conversation (most clinicians will agree). If decisions are being made, ensure you understand: what the decision is, why it\'s being recommended, what alternatives exist, and what happens if you decline.' },
            { title: 'End of Appointment', description: 'Ask the clinician to summarize: what was discussed, what the plan is, and what you should do before the next appointment. Confirm the date and time of your next visit and get contact information for urgent questions.' },
            { title: 'After the Appointment', description: 'Review your notes. If something is unclear or you forgot to mention something important, contact the clinic within 24-48 hours — don\'t wait until the next appointment. Write down what worked and what didn\'t to improve the next visit.' },
          ]}
        />

        <h2 id="red-flags" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Red Flags: When Your Care Falls Short of Standards
        </h2>
        <p className="mb-6">
          Not all mental health care meets accepted standards. Warning signs that your treatment
          may be substandard
          include <Citation id="7" index={7} source="National Institute for Health and Care Excellence" year="2024" tier={3} />:
          medication prescribed without discussing alternatives, side effects, or your
          preferences; appointments focused exclusively on medication adjustment with no inquiry
          about symptoms, functioning, or quality of life; no offer of psychological therapy
          despite guidelines recommending it; treatment decisions made without your input or
          against your expressed wishes (outside of involuntary treatment contexts); and refusal
          to provide information about your diagnosis, prognosis, or treatment options.
        </p>
        <p className="mb-6">
          When care falls short, your options include: requesting a case review with your
          clinician's supervisor, filing a formal complaint with the facility's patient relations
          department, contacting an external patient advocacy organization, or switching providers
          if feasible. These steps aren't confrontational --- they're how healthcare systems
          receive feedback and improve. You're advocating not just for yourself but for everyone
          who comes after you.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>Feeling heard and respected by your treatment team is one of the strongest predictors of engagement and satisfaction with care</li>
            <li>Comprehensive care for psychosis should include medication, psychological therapy, family support, and vocational assistance — medication alone is inadequate</li>
            <li>You have legal rights to informed consent, access to your records, and participation in treatment decisions — understanding these rights is the foundation of self-advocacy</li>
            <li>Peer navigators with lived experience of psychosis can provide unique support in understanding and navigating the system</li>
            <li>Preparation (written concerns, support people, clarifying questions) dramatically improves the productivity of clinical appointments</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
];
