 
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
// Subcategory 4 --- Supporting Someone With Psychosis | Articles 36--40
// ============================================================================

export const supportingSomeoneArticlesB: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-PSY-036 | Stigma and Psychosis
  // --------------------------------------------------------------------------
  {
    id: catId(36),
    slug: 'stigma-and-psychosis-how-prejudice-harms-and-what-you-can-do',
    title: 'Stigma and Psychosis: How Prejudice Harms and What You Can Do',
    description: 'How stigma against psychotic conditions operates at personal, social, and structural levels --- its measurable effects on outcomes, and evidence-based strategies for reducing it.',
    image: '/images/articles/cat16/cover-036.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Stigma', 'Advocacy', 'Social Inclusion', 'Psychosis'],

    summary: 'Stigma against people with psychotic conditions is among the most severe and consequential of any health condition. It operates on multiple levels simultaneously: public stigma (the attitudes society holds), structural stigma (discrimination embedded in policies and institutions), and self-stigma (the internalization of negative beliefs by the person with the condition). Each level produces measurable harm. Public stigma leads to social exclusion and discrimination. Structural stigma limits access to housing, employment, and healthcare. Self-stigma erodes self-esteem, reduces help-seeking, and undermines recovery. Schizophrenia consistently ranks as the most stigmatized psychiatric diagnosis --- more feared and more rejected than depression, anxiety, bipolar disorder, or substance use disorders. Understanding how stigma operates is the first step toward dismantling it.',

    keyFacts: [
      { text: 'Schizophrenia is the most stigmatized psychiatric diagnosis worldwide --- associated with higher social rejection than any other mental health condition', citationIndex: 1 },
      { text: 'Approximately 64% of people with schizophrenia report experiencing discrimination in at least one life domain', citationIndex: 2 },
      { text: 'Self-stigma is associated with reduced self-esteem, lower treatment adherence, and worse recovery outcomes', citationIndex: 3 },
      { text: 'Contact-based interventions --- direct interaction with people who have psychosis --- are the most effective anti-stigma strategy', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The most powerful predictor of whether someone will stigmatize a person with psychosis isn\'t their education level, political orientation, or how much they know about mental illness. It\'s whether they personally know someone with the condition. Contact --- real, human contact --- does what information campaigns alone cannot.',

    practicalExercise: {
      title: 'Challenging Stigma in Your Own Thinking',
      steps: [
        { title: 'Notice your assumptions', description: 'When you hear that someone has schizophrenia, what\'s your first thought? Dangerous? Unpredictable? Hopeless? Write down your associations honestly, without judgment. These automatic associations are the raw material of stigma --- and you can\'t challenge what you don\'t notice.' },
        { title: 'Seek out counter-narratives', description: 'Read first-person accounts from people living well with psychotic conditions. Organizations like the Hearing Voices Network, Schizophrenia & Psychosis Action Alliance, and Mad in America publish these perspectives. Replace stereotypes with real people.' },
        { title: 'Check your language', description: 'Do you use "psychotic" as a synonym for violent or irrational? Do you describe someone as "a schizophrenic" rather than "a person with schizophrenia"? Language shapes perception --- and small changes in how you speak can shift how you and others think.' },
        { title: 'Speak up when you hear stigma', description: 'When someone uses psychosis as a punchline or describes a person with schizophrenia as dangerous, say something. Even a simple "actually, that\'s not accurate" plants a seed. Silence is interpreted as agreement.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect on Your Assumptions',
    },

    citations: [
      { id: '1', text: 'Global patterns of mental illness stigma: A systematic review and meta-analysis', source: 'The Lancet Psychiatry', year: '2020', link: 'https://doi.org/10.1016/S2215-0366(20)30008-1', tier: 1 },
      { id: '2', text: 'Discrimination experienced by people with schizophrenia: INDIGO study across 27 countries', source: 'British Journal of Psychiatry', year: '2019', link: 'https://doi.org/10.1192/bjp.2018.264', tier: 1 },
      { id: '3', text: 'Self-stigma in people with psychosis: A systematic review and meta-analysis', source: 'Schizophrenia Research', year: '2020', link: 'https://doi.org/10.1016/j.schres.2020.01.003', tier: 1 },
      { id: '4', text: 'Interventions to reduce mental health stigma: A systematic review and meta-analysis', source: 'Psychological Medicine', year: '2019', link: 'https://doi.org/10.1017/S003329171900223X', tier: 1 },
      { id: '5', text: 'Media portrayal of schizophrenia: Content analysis of newspaper articles across 7 countries', source: 'Schizophrenia Bulletin', year: '2019', link: 'https://doi.org/10.1093/schbul/sby119', tier: 1 },
      { id: '6', text: 'Structural stigma and mental health: A systematic review', source: 'Social Science & Medicine', year: '2020', link: 'https://doi.org/10.1016/j.socscimed.2020.112875', tier: 1 },
      { id: '7', text: 'Internalized stigma reduction interventions: A meta-analysis', source: 'Stigma and Health', year: '2021', link: 'https://doi.org/10.1037/sah0000317', tier: 1 },
      { id: '8', text: 'Understanding schizophrenia', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            A person with cancer receives sympathy. A person with a broken leg receives
            practical help. A person with schizophrenia receives fear, avoidance, and a
            lifetime of subtle and not-so-subtle exclusion. Stigma against psychotic
            conditions isn't just an attitude problem --- it's a structural force that shapes
            who gets hired, who gets housed, who gets treated with dignity, and who gets
            left
            behind <Citation id="1" index={1} source="The Lancet Psychiatry" year="2020" tier={1} />.
            Understanding stigma isn't an academic exercise. It's a matter of survival for
            millions of people worldwide.
          </p>
        </div>

        <h2 id="three-levels" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Three Levels of Stigma
        </h2>
        <p className="mb-6">
          Stigma against psychotic conditions operates at three distinct levels, each
          reinforcing the
          others <Citation id="6" index={6} source="Social Science & Medicine" year="2020" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Public Stigma',
              content: 'The beliefs, attitudes, and behaviors of the general public toward people with psychotic conditions. Public stigma manifests as fear (associating psychosis with violence), social distance (avoiding people with the diagnosis), and discrimination (refusing to hire, date, or live near someone with schizophrenia). Cross-national surveys consistently show that schizophrenia generates more desire for social distance than any other psychiatric diagnosis.',
            },
            {
              label: 'Structural Stigma',
              content: 'Discrimination embedded in institutions, policies, and systems. Examples include: mental health budgets that are a fraction of physical health budgets; insurance policies that limit psychiatric coverage; employment screening that discriminates against psychiatric histories; and involuntary treatment laws that override autonomy in ways rarely applied to other medical conditions. Structural stigma is often invisible because it operates through policies rather than individual prejudice.',
            },
            {
              label: 'Self-Stigma',
              content: 'The internalization of public stigma by the person with the condition. When someone with schizophrenia absorbs society\'s message that they are dangerous, incompetent, or hopeless, it erodes their self-esteem, reduces their willingness to seek treatment, and undermines their belief that recovery is possible. Self-stigma is among the most powerful predictors of poor outcomes --- not because the person lacks capability, but because they\'ve been taught to believe they do.',
            },
          ]}
        />

        <h2 id="media-role" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Media's Role in Manufacturing Stigma
        </h2>
        <p className="mb-6">
          Content analyses of media coverage across seven countries found that newspaper
          articles about schizophrenia predominantly frame it in terms of violence and
          dangerousness --- despite the statistical reality that people with schizophrenia
          are far more likely to be victims than
          perpetrators <Citation id="5" index={5} source="Schizophrenia Bulletin" year="2019" tier={1} />.
          Television and film reinforce these associations: characters with psychotic
          conditions are overwhelmingly portrayed as violent, unpredictable, and beyond
          help. These portrayals don't just reflect public attitudes --- they create them.
        </p>
        <p className="mb-6">
          The impact is measurable. Studies show that exposure to media portrayals linking
          schizophrenia with violence increases viewers' desire for social distance and
          reduces support for community-based care. One sensationalized news story about
          a violent incident involving someone with psychosis can undo years of anti-stigma
          campaigning. Media literacy --- the ability to recognize and critically evaluate
          these portrayals --- is an essential component of stigma reduction.
        </p>

        <StatCard
          stats={[
            { value: 64, suffix: '%', label: 'Report discrimination in daily life' },
            { value: 14, suffix: '×', label: 'More likely to be victim than perpetrator' },
            { value: 70, suffix: '%', label: 'Media articles link schizophrenia to violence' },
          ]}
          source="British Journal of Psychiatry, 2019; Schizophrenia Bulletin, 2019"
        />

        <h2 id="consequences" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Concrete Consequences of Stigma
        </h2>
        <p className="mb-6">
          Stigma isn't just hurt feelings --- it's lost
          opportunities <Citation id="2" index={2} source="British Journal of Psychiatry" year="2019" tier={1} />.
          The INDIGO study, which surveyed people with schizophrenia across 27 countries,
          found that approximately 64% experienced discrimination in at least one life
          domain. The most commonly reported areas: making or keeping friends (47%),
          finding employment (29%), being treated unfairly by family members (43%),
          and obtaining housing (27%).
        </p>
        <p className="mb-6">
          Perhaps most insidiously, stigma affects healthcare itself. People with
          psychotic conditions receive lower quality medical care for physical health
          problems --- a phenomenon researchers call "diagnostic overshadowing," where
          physical complaints are dismissed as psychiatric symptoms. This contributes
          directly to the 15--20 year life expectancy gap that characterizes severe
          mental
          illness <Citation id="8" index={8} source="National Institute of Mental Health" year="2024" tier={2} />.
        </p>

        <h2 id="what-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Actually Reduces Stigma
        </h2>
        <p className="mb-6">
          Decades of anti-stigma research have identified what works and what
          doesn't <Citation id="4" index={4} source="Psychological Medicine" year="2019" tier={1} />.
          Education-based approaches --- providing facts about mental illness --- produce
          short-term improvements in knowledge but limited changes in attitudes or
          behavior. The most effective strategy, consistently, is contact: direct,
          personal interaction with people who have psychotic conditions and are living
          meaningful lives.
        </p>

        <ArticleCallout type="insight" title="Why Contact Works">
          Contact-based interventions work because they replace abstract stereotypes with
          concrete individuals. It's easy to fear "schizophrenics" as a category. It's
          much harder to fear your neighbor who has schizophrenia and also coaches your
          child's soccer team. Contact humanizes, individualizes, and creates the kind
          of familiarity that dissolves
          prejudice <Citation id="4" index={4} source="Psychological Medicine" year="2019" tier={1} />.
        </ArticleCallout>

        <p className="mt-6 mb-6">
          For people experiencing self-stigma, cognitive approaches that challenge
          internalized beliefs show
          promise <Citation id="7" index={7} source="Stigma and Health" year="2021" tier={1} />.
          Programs like Honest, Open, Proud (formerly Coming Out Proud) help people
          make informed decisions about disclosure and develop counter-narratives to
          stigmatizing messages. The goal isn't to eliminate awareness of stigma --- which
          is a realistic response to a real phenomenon --- but to prevent it from defining
          self-concept and limiting aspirations.
        </p>
        <p className="mb-6">
          Ultimately, reducing stigma requires action at every level: individuals
          challenging their own assumptions, media producing accurate portrayals,
          institutions removing discriminatory policies, and people with lived
          experience being supported to share their stories. None of these alone is
          sufficient. Together, they can shift the narrative from fear to understanding.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-037 | Children of Parents With Psychosis
  // --------------------------------------------------------------------------
  {
    id: catId(37),
    slug: 'children-of-parents-with-psychosis-resilience-support-understanding',
    title: 'Children of Parents With Psychosis: Resilience, Support, and Understanding',
    description: 'What children need when a parent has a psychotic condition --- age-appropriate explanation, emotional support, genetic risk in perspective, and building resilience through adversity.',
    image: '/images/articles/cat16/cover-037.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Children', 'Family Impact', 'Resilience', 'Parenting'],

    summary: 'An estimated 7.5 million children in the United States have at least one parent with a serious mental illness. For children whose parent has a psychotic condition, the experience is often confusing, frightening, and isolating --- not because the parent is incapable of love, but because the condition creates unpredictability and the surrounding silence leaves children without frameworks for understanding what they observe. Research shows that the greatest risk to these children isn\'t the parent\'s diagnosis itself --- it\'s the absence of support, explanation, and emotional scaffolding. Children who receive age-appropriate information about their parent\'s condition, who maintain stable routines, and who have at least one consistent, supportive adult in their lives demonstrate remarkable resilience. This article addresses what children need, how to talk to them, and how to support both parent and child.',

    keyFacts: [
      { text: 'Children of parents with schizophrenia have approximately a 10--13% lifetime risk of developing schizophrenia themselves --- meaning 87--90% will not', citationIndex: 1 },
      { text: 'The strongest protective factor for children of parents with mental illness is having at least one stable, supportive adult relationship', citationIndex: 2 },
      { text: 'Children who receive age-appropriate psychoeducation about their parent\'s condition show less anxiety, fewer behavioral problems, and better coping', citationIndex: 3 },
      { text: 'Many children of parents with psychosis report that the silence around the illness was more distressing than the illness itself', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'Children are extraordinary sense-makers. In the absence of explanation, they create their own theories --- and those theories are almost always worse than the truth. "Mom is sick and sometimes her brain tells her things that aren\'t true" is infinitely less frightening to a child than the silent terror of watching inexplicable behavior with no framework for understanding it.',

    practicalExercise: {
      title: 'Talking to a Child About a Parent\'s Psychosis',
      steps: [
        { title: 'Use age-appropriate language', description: 'For young children (5--8): "Mom/Dad has an illness in their brain that sometimes makes them see or hear things that other people can\'t. It\'s not their fault and it\'s not your fault." For older children (9--12): explain the condition by name, that it\'s a medical illness like diabetes, and that treatment helps.' },
        { title: 'Answer their real questions', description: 'Children typically have three unspoken questions: "Did I cause this?" (No), "Will it happen to me?" (unlikely --- explain the actual numbers), and "Who will take care of me?" (be specific about the safety plan). Address all three even if they don\'t ask directly.' },
        { title: 'Normalize their feelings', description: 'Give explicit permission to feel angry, scared, sad, embarrassed, or relieved. "It\'s okay to feel frustrated when Dad can\'t do things other dads do. That doesn\'t mean you love him less." Naming emotions reduces their power.' },
        { title: 'Maintain routines', description: 'During parental episodes, maintaining the child\'s routine --- school, activities, bedtimes, meals --- provides stability when everything else feels chaotic. Identify who will maintain routines if the parent is hospitalized, and tell the child in advance.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Journal About Family Experiences',
    },

    citations: [
      { id: '1', text: 'Genetic risk of schizophrenia: Family studies and molecular genetics', source: 'Schizophrenia Bulletin', year: '2019', link: 'https://doi.org/10.1093/schbul/sbz033', tier: 1 },
      { id: '2', text: 'Resilience in children of parents with mental illness: A systematic review', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101870', tier: 1 },
      { id: '3', text: 'Psychoeducation for children of parents with mental illness: A systematic review and meta-analysis', source: 'Journal of Child Psychology and Psychiatry', year: '2019', link: 'https://doi.org/10.1111/jcpp.13058', tier: 1 },
      { id: '4', text: 'Growing up with parental psychosis: Children\'s experiences and needs', source: 'Qualitative Health Research', year: '2020', link: 'https://doi.org/10.1177/1049732320929690', tier: 1 },
      { id: '5', text: 'Parenting with psychosis: A qualitative synthesis of lived experience', source: 'Schizophrenia Research', year: '2019', link: 'https://doi.org/10.1016/j.schres.2019.05.028', tier: 1 },
      { id: '6', text: 'Programs for children of parents with mental illness: A systematic review', source: 'Australian & New Zealand Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1177/0004867420924071', tier: 1 },
      { id: '7', text: 'Adverse childhood experiences and mental health: A meta-analysis', source: 'JAMA Psychiatry', year: '2019', link: 'https://doi.org/10.1001/jamapsychiatry.2019.0286', tier: 1 },
      { id: '8', text: 'Understanding schizophrenia', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When a parent has psychosis, the children are often the invisible patients. The
            clinical focus lands --- understandably --- on the person who is unwell. The
            partner or other family members become the identified caregivers. And the
            children? They watch. They absorb. They construct their own explanations for
            what's happening, because no one has given them
            one <Citation id="4" index={4} source="Qualitative Health Research" year="2020" tier={1} />.
            Those self-constructed explanations --- "It's my fault," "Mom is crazy,"
            "This will happen to me" --- can be far more damaging than the truth. What
            children need most is what they least often receive: honest, age-appropriate
            information and emotional support.
          </p>
        </div>

        <h2 id="what-children-experience" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Children Actually Experience
        </h2>
        <p className="mb-6">
          Qualitative research with children who have grown up with a parent's psychosis
          reveals consistent
          themes <Citation id="4" index={4} source="Qualitative Health Research" year="2020" tier={1} />.
          Children describe confusion --- watching a parent behave in ways they can't
          understand, without anyone explaining why. They describe fear --- of the parent's
          symptoms, of hospitalization, of what will happen to them. They describe shame ---
          unable to invite friends over, unable to explain absences, carrying a secret
          they didn't choose.
        </p>
        <p className="mb-6">
          But they also describe love, loyalty, and a premature maturity that can be both
          a burden and a strength. Many children of parents with psychosis take on
          caregiving roles --- monitoring medication, managing household tasks, caring for
          younger siblings --- that exceed their developmental stage. This "parentification"
          can foster competence and empathy, but it can also rob children of the
          unstructured play and freedom that childhood requires.
        </p>

        <ArticleCallout type="insight" title="The Silence Is Worse Than the Illness">
          Across studies, children consistently report that the silence surrounding their
          parent's condition was more distressing than the condition itself. Not knowing
          the name for what was happening, not understanding why their parent behaved
          differently from other parents, and feeling unable to talk about their
          experiences created a profound
          isolation <Citation id="4" index={4} source="Qualitative Health Research" year="2020" tier={1} />.
          Breaking the silence --- with honesty calibrated to the child's age and
          understanding --- is consistently described as a turning point.
        </ArticleCallout>

        <h2 id="genetic-risk-in-context" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Genetic Risk: The Numbers in Perspective
        </h2>
        <p className="mb-6">
          One of the questions children eventually ask --- or worry about without asking ---
          is "Will this happen to me?" The genetic risk is real but is often
          catastrophized <Citation id="1" index={1} source="Schizophrenia Bulletin" year="2019" tier={1} />.
        </p>

        <ArticleChart
          type="bar"
          data={[
            { label: 'General population', value: 1 },
            { label: 'One parent with schizophrenia', value: 13 },
            { label: 'Both parents with schizophrenia', value: 46 },
            { label: 'Identical twin has schizophrenia', value: 48 },
          ]}
          title="Lifetime risk of developing schizophrenia (%)"
          source="Schizophrenia Bulletin, 2019"
        />

        <p className="mt-6 mb-6">
          Having one parent with schizophrenia raises lifetime risk from approximately
          1% to approximately 10--13%. This means 87--90% of children with one affected
          parent will not develop the condition. For children old enough to understand
          statistics, this framing --- "you have about a 9 in 10 chance of not getting
          it" --- is far less frightening than "you're at higher risk." Genetic risk is
          not destiny. And many protective factors --- stable relationships, low stress,
          avoiding substance use --- can further reduce risk.
        </p>

        <h2 id="resilience-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Building Resilience: What Protects Children
        </h2>
        <p className="mb-6">
          Research on resilience in children of parents with mental illness has identified
          several factors that consistently predict better
          outcomes <Citation id="2" index={2} source="Clinical Psychology Review" year="2020" tier={1} />:
        </p>

        <ComparisonTable
          headers={['Protective Factor', 'How It Helps', 'How to Provide It']}
          rows={[
            ['At least one stable adult relationship', 'Provides emotional security, reliable care, and a model of consistent functioning', 'Grandparents, aunts/uncles, teachers, coaches, family friends --- any trusted adult who is consistently present'],
            ['Age-appropriate psychoeducation', 'Reduces confusion, guilt, and anxiety; provides a framework for understanding', 'Dedicated programs (e.g., Kidstime) or conversations with a trusted adult using developmentally appropriate language'],
            ['Maintained routines', 'Provides predictability and normalcy during chaotic periods', 'School attendance, extracurricular activities, bedtimes, and meals maintained even during parental episodes'],
            ['Peer connection', 'Reduces isolation and normalizes experience', 'Programs for children of parents with mental illness, school friendships maintained, opportunities for unstructured play'],
            ['Emotional validation', 'Gives permission to feel without guilt', 'Naming and accepting all emotions --- including anger, embarrassment, and relief --- without judgment'],
          ]}
        />

        <h2 id="programs-and-support" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Programs and Support Services
        </h2>
        <p className="mb-6">
          Specialized programs for children of parents with mental illness have demonstrated
          significant benefits --- reduced anxiety, fewer behavioral problems, improved coping,
          and better understanding of the parent's
          condition <Citation id="3" index={3} source="Journal of Child Psychology and Psychiatry" year="2019" tier={1} />.
          Programs like Kidstime (UK), COPMI (Australia), and Family Talk (US) use age-appropriate
          psychoeducation, creative expression, and peer support to address the specific
          needs of these children.
        </p>
        <p className="mb-6">
          Unfortunately, access to such programs remains
          limited <Citation id="6" index={6} source="Australian & New Zealand Journal of Psychiatry" year="2020" tier={1} />.
          In most healthcare systems, children of parents with mental illness are not
          systematically identified, assessed, or offered support. This represents a
          missed prevention opportunity: supporting these children not only improves
          their current wellbeing but may reduce their own risk of developing mental
          health difficulties later in life.
        </p>

        <ArticleCallout type="tip" title="For Parents With Psychosis">
          Having a psychotic condition does not make you a bad
          parent <Citation id="5" index={5} source="Schizophrenia Research" year="2019" tier={1} />.
          Many people with psychosis parent effectively, especially with support. What
          matters most is being honest with your children at their level, having a plan
          for their care during episodes, and accepting help when you need it. Your
          children don't need a symptom-free parent --- they need a parent who is present,
          loving, and willing to talk about what's happening.
        </ArticleCallout>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-038 | Psychosis and Relationships
  // --------------------------------------------------------------------------
  {
    id: catId(38),
    slug: 'psychosis-and-relationships-maintaining-connection-through-illness',
    title: 'Psychosis and Relationships: Maintaining Connection Through Illness',
    description: 'How psychotic conditions affect romantic relationships, friendships, and social connections --- and evidence-based strategies for maintaining meaningful relationships during and after episodes.',
    image: '/images/articles/cat16/cover-038.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Relationships', 'Social Connection', 'Recovery', 'Communication'],

    summary: 'Psychotic conditions don\'t just affect the person who has them --- they reshape every relationship in that person\'s life. Romantic partners navigate trust, intimacy, and caregiving in ways they never anticipated. Friendships strain under the weight of misunderstanding and social withdrawal. Family bonds are tested by crisis after crisis. Yet the research is equally clear that meaningful relationships are among the most powerful predictors of recovery from psychosis. This creates a paradox: the condition that most needs social connection simultaneously makes social connection hardest. This article explores how psychosis affects different types of relationships, what evidence-based strategies help maintain connection, and why investing in relationships is investing in recovery.',

    keyFacts: [
      { text: 'Social isolation is both a symptom of and a risk factor for psychosis, creating a cycle that treatment must actively address', citationIndex: 1 },
      { text: 'Romantic relationship satisfaction is significantly lower among people with schizophrenia, but supportive partnerships are associated with better clinical outcomes', citationIndex: 2 },
      { text: 'Social skills training produces moderate improvements in social functioning that persist for at least 6 months after intervention', citationIndex: 3 },
      { text: 'Loneliness in people with psychosis is associated with increased symptom severity, reduced quality of life, and higher suicide risk', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The loneliest moment in psychosis isn\'t hearing voices --- it\'s looking around and seeing no one who understands. Recovery research consistently shows that the presence or absence of just one genuinely supportive relationship can be the difference between a life that gains traction and one that stays stuck.',

    practicalExercise: {
      title: 'Rebuilding Social Connection',
      steps: [
        { title: 'Start with existing connections', description: 'List three people you feel some connection with --- even if the relationship has faded. Send a simple message: "I was thinking about you." You don\'t need to explain your absence or reveal your diagnosis. Just re-establish contact.' },
        { title: 'Use structured social activities', description: 'Unstructured socializing can be overwhelming. Activities with built-in structure --- classes, clubs, volunteer work, walking groups --- provide social contact with lower cognitive and emotional demands.' },
        { title: 'Practice disclosure at your own pace', description: 'You are not obligated to disclose your diagnosis to anyone. But selective disclosure to trusted people --- on your terms, when you\'re ready --- can deepen connections and reduce the burden of secrecy. Start with the person you trust most.' },
        { title: 'Consider peer support', description: 'Connecting with others who have experienced psychosis --- through peer support groups, the Hearing Voices Network, or online communities --- provides a form of connection that doesn\'t require explanation or justification.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Social Activities',
    },

    citations: [
      { id: '1', text: 'Social isolation and psychosis: A systematic review and meta-analysis', source: 'Schizophrenia Bulletin', year: '2019', link: 'https://doi.org/10.1093/schbul/sby021', tier: 1 },
      { id: '2', text: 'Romantic relationships and schizophrenia: A systematic review', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101865', tier: 1 },
      { id: '3', text: 'Social skills training for schizophrenia: An updated meta-analysis', source: 'Schizophrenia Research', year: '2019', link: 'https://doi.org/10.1016/j.schres.2019.01.016', tier: 1 },
      { id: '4', text: 'Loneliness in psychosis: A systematic review and meta-analysis', source: 'Schizophrenia Bulletin', year: '2020', link: 'https://doi.org/10.1093/schbul/sbaa080', tier: 1 },
      { id: '5', text: 'Friendship and psychosis: A qualitative study of lived experience', source: 'Journal of Mental Health', year: '2019', link: 'https://doi.org/10.1080/09638237.2018.1521937', tier: 1 },
      { id: '6', text: 'Intimacy and sexuality in people with psychosis: A systematic review', source: 'Schizophrenia Research', year: '2020', link: 'https://doi.org/10.1016/j.schres.2020.02.010', tier: 1 },
      { id: '7', text: 'Social cognition training in psychosis: A meta-analysis of randomized controlled trials', source: 'Schizophrenia Bulletin', year: '2021', link: 'https://doi.org/10.1093/schbul/sbab025', tier: 1 },
      { id: '8', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            No one tells you how lonely psychosis can
            be <Citation id="4" index={4} source="Schizophrenia Bulletin" year="2020" tier={1} />.
            The voices may be constant companions, but they're poor substitutes for
            human connection. The paranoia that makes others seem threatening pushes away
            the very people who might help. The negative symptoms --- flat affect, reduced
            social drive, difficulty reading social cues --- make even basic social
            interaction feel like a foreign language you used to speak fluently.
            Understanding how psychosis affects relationships --- and what can be done
            about it --- is essential for anyone who wants to recover or to support someone
            in doing so.
          </p>
        </div>

        <h2 id="romantic-relationships" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Romantic Relationships: Love Under Pressure
        </h2>
        <p className="mb-6">
          Romantic relationships involving someone with a psychotic condition face unique
          challenges that research is only beginning to map
          systematically <Citation id="2" index={2} source="Clinical Psychology Review" year="2020" tier={1} />.
          Partners must navigate shifting roles --- from equal partner to caregiver and back
          again, sometimes within the same week. They manage medication side effects that
          affect intimacy, including sexual dysfunction and emotional blunting. They absorb
          paranoid accusations during acute episodes that they know aren't personal --- but
          that feel deeply personal in the moment.
        </p>
        <p className="mb-6">
          Yet supportive partnerships are among the strongest predictors of positive
          outcomes. People with psychosis who have supportive romantic partners show lower
          relapse rates, better treatment adherence, and higher quality of life. The
          partnership itself is therapeutic --- but only when the non-ill partner also
          receives support, education, and opportunities to maintain their own
          identity and
          wellbeing <Citation id="6" index={6} source="Schizophrenia Research" year="2020" tier={1} />.
        </p>

        <ArticleCallout type="tip" title="For Partners">
          Your relationship can survive and even deepen through this experience, but not
          if you sacrifice yourself in the process. Maintain your own friendships, your
          own interests, and your own mental health support. Couples therapy with a
          clinician experienced in psychosis can provide a space for both of you to be
          honest about the impact --- without the conversation devolving into blame or
          caretaking <Citation id="8" index={8} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
        </ArticleCallout>

        <h2 id="friendships" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Friendships: The Relationships Most Easily Lost
        </h2>
        <p className="mb-6">
          Friendships are often the first casualties of psychosis --- and the last to be
          restored <Citation id="5" index={5} source="Journal of Mental Health" year="2019" tier={1} />.
          Social withdrawal during episodes, inability to maintain contact, the
          embarrassment of explaining absences, and the gradual narrowing of the social
          world all contribute to friendship loss. Many people with psychosis describe a
          shrinking social circle that eventually contracts to family members and
          professionals --- with no friends at all.
        </p>
        <p className="mb-6">
          Rebuilding friendships requires both skills and opportunities. Social skills
          training --- which teaches specific interpersonal behaviors like conversation
          initiation, active listening, and assertiveness --- produces meaningful
          improvements that persist after
          treatment <Citation id="3" index={3} source="Schizophrenia Research" year="2019" tier={1} />.
          Social cognition training --- which targets the ability to read facial
          expressions, understand sarcasm, and infer mental states --- addresses the
          underlying deficits that make social interaction
          difficult <Citation id="7" index={7} source="Schizophrenia Bulletin" year="2021" tier={1} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Barriers to Social Connection',
            items: [
              'Social withdrawal from negative symptoms',
              'Paranoia making others seem threatening',
              'Difficulty reading social cues',
              'Stigma and fear of disclosure',
              'Medication side effects (sedation, weight gain)',
            ],
          }}
          after={{
            title: 'Bridges to Social Connection',
            items: [
              'Structured social activities with built-in purpose',
              'Peer support from others with lived experience',
              'Social skills and cognition training',
              'Selective disclosure to trusted individuals',
              'Community integration through work or volunteering',
            ],
          }}
        />

        <h2 id="social-isolation-cycle" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Breaking the Isolation Cycle
        </h2>
        <p className="mb-6">
          Social isolation and psychosis exist in a bidirectional
          relationship <Citation id="1" index={1} source="Schizophrenia Bulletin" year="2019" tier={1} />.
          Psychosis causes social withdrawal --- through negative symptoms, paranoia,
          cognitive deficits, and stigma. And social isolation worsens psychosis --- through
          increased rumination, loss of reality-testing opportunities, and the absence of
          the positive stimulation that social interaction provides. Breaking this cycle
          requires intentional intervention at both ends.
        </p>
        <p className="mb-6">
          For treatment teams, this means treating social functioning as a clinical
          priority --- not an afterthought. For family and friends, it means maintaining
          connection even when it's not reciprocated --- showing up, extending invitations
          (without pressure), and keeping the social door open. For the person with
          psychosis, it means recognizing that the motivation to socialize may never
          come first --- and acting despite its absence, in the knowledge that connection
          usually feels better than the anticipation predicted.
        </p>

        <QuoteBlock
          quote="Nobody came to see me when I was psychotic --- and I told myself it was because I wanted to be alone. But looking back, I think I was waiting for someone to come anyway. The people who kept calling, kept texting, kept inviting me even when I always said no --- they're the ones who saved me."
          author="Lived experience perspective, Journal of Mental Health, 2019"
        />
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-039 | Financial Management and Psychosis
  // --------------------------------------------------------------------------
  {
    id: catId(39),
    slug: 'financial-management-psychosis-benefits-budgeting-protection',
    title: 'Financial Management and Psychosis: Benefits, Budgeting, and Financial Protection',
    description: 'A practical guide to managing money with a psychotic condition --- navigating disability benefits, building budgeting systems that work with cognitive symptoms, and protecting against financial exploitation.',
    image: '/images/articles/cat16/cover-039.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Financial Management', 'Benefits', 'Practical Guide', 'Independence'],

    summary: 'Financial difficulty is nearly universal among people with psychotic conditions. Poverty, unemployment, disability benefit complexity, and the cognitive symptoms that impair planning and organization converge to create financial instability that undermines every other aspect of recovery. During acute episodes, impaired judgment can lead to spending sprees, susceptibility to scams, or neglect of bills and obligations. Between episodes, the bureaucratic maze of disability benefits can overwhelm even people without cognitive impairments. This practical guide addresses the financial realities of living with psychosis: how to access benefits, build sustainable budgeting systems that accommodate cognitive fluctuations, protect against exploitation, and maintain financial stability as a foundation for recovery.',

    keyFacts: [
      { text: 'People with schizophrenia have an average income approximately 40% below the national median, with poverty rates 2--3 times the general population', citationIndex: 1 },
      { text: 'Cognitive symptoms --- particularly executive function and working memory deficits --- directly impair financial decision-making and planning', citationIndex: 2 },
      { text: 'People with serious mental illness are 2--3 times more likely to be victims of financial exploitation, fraud, and scams', citationIndex: 3 },
      { text: 'Automatic bill payment, simplified banking, and supported financial management significantly reduce financial crisis among people with psychosis', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'Financial management with psychosis isn\'t about willpower --- it\'s about systems. The same executive function deficits that make it hard to organize a daily schedule make it hard to track spending, remember bill due dates, and evaluate financial decisions. The solution isn\'t "try harder" --- it\'s building external systems that do the organizing your brain struggles with.',

    practicalExercise: {
      title: 'Building a Financial Safety System',
      steps: [
        { title: 'Automate essential payments', description: 'Set up automatic payments for rent, utilities, phone, and medication copays. These should come out of your account on the same day each month, ideally the day after your income arrives. Once automated, you never risk missing essential payments due to forgetting or being unwell.' },
        { title: 'Use a two-account system', description: 'Open a separate account for essential expenses. Transfer rent and bills money to this account automatically. Keep your spending money in a different account with a debit card. You can only spend what\'s in the spending account --- the essential account stays protected.' },
        { title: 'Set spending limits', description: 'Many banks allow you to set daily spending limits on debit cards. Setting a limit during stable periods protects you during periods when judgment may be impaired. You can always call to raise the limit if needed --- the friction is the point.' },
        { title: 'Designate a financial ally', description: 'Identify someone you trust --- a family member, case manager, or payee service --- who can help monitor your finances during difficult periods. This isn\'t about losing control; it\'s about having a safety net. Discuss in advance what level of involvement you\'d want during episodes.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Financial Wellbeing',
    },

    citations: [
      { id: '1', text: 'Economic burden of schizophrenia: Individual and societal costs', source: 'Journal of Clinical Psychiatry', year: '2019', link: 'https://doi.org/10.4088/JCP.19m12828', tier: 1 },
      { id: '2', text: 'Cognitive impairment and financial decision-making in severe mental illness', source: 'Psychiatric Services', year: '2020', link: 'https://doi.org/10.1176/appi.ps.201900432', tier: 1 },
      { id: '3', text: 'Financial exploitation of people with mental illness: Prevalence and risk factors', source: 'Community Mental Health Journal', year: '2019', link: 'https://doi.org/10.1007/s10597-019-00394-3', tier: 1 },
      { id: '4', text: 'Financial management interventions for people with serious mental illness: A systematic review', source: 'Psychiatric Rehabilitation Journal', year: '2020', link: 'https://doi.org/10.1037/prj0000406', tier: 1 },
      { id: '5', text: 'Social Security disability benefits and serious mental illness', source: 'Social Security Administration', year: '2024', link: 'https://www.ssa.gov/benefits/disability', tier: 2 },
      { id: '6', text: 'Representative payee programs for people with mental illness: Benefits and concerns', source: 'Psychiatric Services', year: '2019', link: 'https://doi.org/10.1176/appi.ps.201800427', tier: 1 },
      { id: '7', text: 'Understanding schizophrenia', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
      { id: '8', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Money problems aren't a side issue in psychosis --- they're a central one.
            When you can't pay rent, every other aspect of recovery is threatened. When
            an acute episode leads to impulsive spending, the financial consequences
            outlast the symptoms. When the cognitive effort required to navigate disability
            benefits exhausts the limited executive function that psychosis has
            spared, basic survival becomes a full-time
            job <Citation id="1" index={1} source="Journal of Clinical Psychiatry" year="2019" tier={1} />.
            This guide isn't about financial planning for people who have disposable
            income to invest. It's about financial survival for people whose condition
            makes the basics of money management genuinely difficult.
          </p>
        </div>

        <h2 id="disability-benefits" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding Disability Benefits
        </h2>
        <p className="mb-6">
          Most people with psychotic conditions that significantly impair functioning
          are eligible for disability
          benefits <Citation id="5" index={5} source="Social Security Administration" year="2024" tier={2} />.
          The specific programs vary by country, but the principles are similar: you
          must demonstrate that your condition prevents substantial gainful activity,
          provide medical documentation, and navigate an application process that can
          take months to years.
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'US: SSDI and SSI',
              content: 'Social Security Disability Insurance (SSDI) is for people who have a sufficient work history. Supplemental Security Income (SSI) is for people with limited work history and low income. Both require medical documentation that your condition meets or equals a listed impairment. The initial denial rate is approximately 65% --- don\'t give up at the first rejection. Appeals succeed at much higher rates, especially with legal representation.',
            },
            {
              title: 'UK: PIP and UC',
              content: 'Personal Independence Payment (PIP) covers additional costs of disability regardless of employment. Universal Credit provides income support for people who are unable to work or working limited hours. Assessment involves describing how your condition affects daily activities and mobility. Requesting a mandatory reconsideration and then appealing to a tribunal is common and often successful.',
            },
            {
              title: 'Australia: DSP and NDIS',
              content: 'Disability Support Pension (DSP) provides income for people with permanent conditions that prevent them from working 15+ hours per week. The National Disability Insurance Scheme (NDIS) funds individualized support packages. Both require detailed medical evidence and functional assessment.',
            },
          ]}
        />

        <h2 id="cognitive-and-financial" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Cognitive Symptoms Affect Financial Decisions
        </h2>
        <p className="mb-6">
          The cognitive symptoms of psychosis --- impaired working memory, reduced
          processing speed, executive function deficits --- directly affect financial
          management in ways that are rarely
          discussed <Citation id="2" index={2} source="Psychiatric Services" year="2020" tier={1} />.
          Holding multiple bills and due dates in working memory is difficult when
          working memory is impaired. Comparing prices, evaluating contracts, and
          calculating long-term costs require the kind of abstract reasoning that
          psychosis compromises. And during acute episodes, impaired judgment can
          lead to financial decisions that seem reasonable in the moment but are
          catastrophic in retrospect.
        </p>

        <StatCard
          stats={[
            { value: 40, suffix: '%', label: 'Income below national median' },
            { value: 2, suffix: '--3×', label: 'Poverty rate vs. general population' },
            { value: 2, suffix: '--3×', label: 'Risk of financial exploitation' },
          ]}
          source="Journal of Clinical Psychiatry, 2019; Community Mental Health Journal, 2019"
        />

        <h2 id="financial-protection" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Protecting Against Financial Exploitation
        </h2>
        <p className="mb-6">
          People with serious mental illness are disproportionately targeted by scams,
          predatory lenders, and financial
          exploitation <Citation id="3" index={3} source="Community Mental Health Journal" year="2019" tier={1} />.
          During psychotic episodes, impaired reality testing can make fraudulent offers
          seem legitimate. Even between episodes, social isolation and desire for
          connection can make people vulnerable to relationship-based exploitation.
        </p>
        <p className="mb-6">
          Protective strategies include: setting daily spending limits on bank cards;
          adding fraud alerts to bank accounts; registering on do-not-call lists;
          using a representative payee during periods of impaired
          judgment <Citation id="6" index={6} source="Psychiatric Services" year="2019" tier={1} />;
          and having a trusted person review major financial decisions (purchases
          over a threshold amount, new contracts, loans). These aren't restrictions
          on autonomy --- they're safety nets that protect financial stability while
          preserving as much independence as possible.
        </p>

        <ArticleCallout type="tip" title="Representative Payees: A Tool, Not a Punishment">
          A representative payee is a person or organization that manages disability
          benefit payments on behalf of someone who is unable to manage them
          independently. While some people resist this arrangement, research shows
          that representative payees reduce financial crisis, housing instability,
          and substance use among people with serious mental
          illness <Citation id="6" index={6} source="Psychiatric Services" year="2019" tier={1} />.
          The key is choosing a trustworthy payee and establishing clear agreements
          about how decisions are made. This is a tool for stability, not a loss of
          control <Citation id="8" index={8} source="National Institute for Health and Care Excellence" year="2024" tier={3} />.
        </ArticleCallout>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-PSY-040 | Emergency Planning for Psychotic Crises
  // --------------------------------------------------------------------------
  {
    id: catId(40),
    slug: 'emergency-planning-psychotic-crises-family-preparedness',
    title: 'Emergency Planning for Psychotic Crises: A Family Preparedness Guide',
    description: 'How to create a comprehensive crisis plan for psychotic episodes --- early warning signs, escalation steps, emergency contacts, and post-crisis recovery strategies for families and individuals.',
    image: '/images/articles/cat16/cover-040.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Crisis Planning', 'Emergency', 'Family Support', 'Practical Guide'],

    summary: 'Psychotic crises are often predictable --- not in their exact timing, but in their pattern. Most people who experience recurrent psychosis have identifiable early warning signs that precede full episodes by days or weeks: changes in sleep, increased suspiciousness, social withdrawal, neglecting self-care, unusual preoccupation with specific topics. A written crisis plan, developed collaboratively during a period of stability, transforms a family\'s response from panicked improvisation to coordinated action. It specifies who to call, what interventions help, when to go to the emergency department, and what the person\'s treatment preferences are. This guide walks through creating a comprehensive crisis plan --- not because crises are inevitable, but because preparation makes them less terrifying and more manageable when they do occur.',

    keyFacts: [
      { text: 'Approximately 80% of people who have experienced one psychotic episode will have subsequent episodes, making crisis planning essential', citationIndex: 1 },
      { text: 'Early warning signs precede full psychotic relapse by an average of 2--4 weeks, providing a window for early intervention', citationIndex: 2 },
      { text: 'Families with written crisis plans report less panic, faster access to services, and better outcomes during episodes', citationIndex: 3 },
      { text: 'Psychiatric advance directives --- legal documents specifying treatment preferences --- are associated with reduced involuntary treatment and higher satisfaction', citationIndex: 4 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: 'The best time to plan for a crisis is when one isn\'t happening. During a psychotic episode, the person may not be able to articulate what they need. The family may be too panicked to think clearly. A plan written during stability is a gift to your future self --- a set of instructions from the person you are when you\'re thinking clearly, to the person you\'ll be when everything feels like it\'s falling apart.',

    practicalExercise: {
      title: 'Creating Your Family Crisis Plan',
      steps: [
        { title: 'Document early warning signs', description: 'With the person (if they\'re willing and able), list the specific signs that have preceded previous episodes. Be concrete: "stops sleeping," "starts wearing headphones all the time," "stops showering," "talks about feeling watched." Each person\'s warning signs are unique --- document yours specifically.' },
        { title: 'Establish a graduated response', description: 'Create three response levels: Green (early signs noticed --- increase support, contact treatment team), Yellow (symptoms escalating --- activate crisis plan, contact psychiatrist directly), Red (immediate safety concern --- call crisis line or emergency services). Assign specific actions to each level.' },
        { title: 'Create a contacts card', description: 'List on one card: psychiatrist\'s name and emergency number, crisis hotline (988 in US), local mobile crisis team number, preferred hospital, emergency contacts, current medications and doses, known drug allergies. Laminate it. Put copies in wallet, on fridge, in car.' },
        { title: 'Document treatment preferences', description: 'While well, the person should document: which hospital they prefer, which medications help and which they refuse, who should be contacted, what de-escalation strategies work ("play calming music," "don\'t crowd me," "speak softly"), and who has power of attorney for healthcare decisions.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Early Warning Signs',
    },

    citations: [
      { id: '1', text: 'Relapse rates in schizophrenia: A systematic review and meta-analysis', source: 'Schizophrenia Research', year: '2019', link: 'https://doi.org/10.1016/j.schres.2019.06.014', tier: 1 },
      { id: '2', text: 'Early warning signs of psychotic relapse: A systematic review and meta-analysis', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291720001476', tier: 1 },
      { id: '3', text: 'Crisis planning for psychosis: Family outcomes and service utilization', source: 'Psychiatric Services', year: '2020', link: 'https://doi.org/10.1176/appi.ps.201900489', tier: 1 },
      { id: '4', text: 'Psychiatric advance directives: A systematic review of outcomes', source: 'Psychiatric Services', year: '2019', link: 'https://doi.org/10.1176/appi.ps.201800437', tier: 1 },
      { id: '5', text: 'Wellness Recovery Action Planning (WRAP): Outcomes and implementation', source: 'Psychiatric Rehabilitation Journal', year: '2019', link: 'https://doi.org/10.1037/prj0000345', tier: 1 },
      { id: '6', text: 'De-escalation techniques in acute psychosis: A practice guide', source: 'Aggression and Violent Behavior', year: '2020', link: 'https://doi.org/10.1016/j.avb.2020.101437', tier: 1 },
      { id: '7', text: 'Post-crisis recovery and relapse prevention: A family guide', source: 'Schizophrenia & Psychosis Action Alliance', year: '2024', link: 'https://sczaction.org', tier: 3 },
      { id: '8', text: 'Psychosis and schizophrenia in adults: Prevention and management (NICE CG178)', source: 'National Institute for Health and Care Excellence', year: '2024', link: 'https://www.nice.org.uk/guidance/cg178', tier: 3 },
      { id: '9', text: 'Understanding schizophrenia', source: 'National Institute of Mental Health', year: '2024', link: 'https://www.nimh.nih.gov/health/topics/schizophrenia', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The first psychotic crisis hits like an earthquake --- sudden, disorienting,
            and without a playbook. But subsequent episodes don't need to feel the same
            way. With approximately 80% of people who experience a first psychotic
            episode going on to have additional
            episodes <Citation id="1" index={1} source="Schizophrenia Research" year="2019" tier={1} />,
            crisis planning isn't pessimism --- it's pragmatism. A well-constructed
            crisis plan doesn't prevent episodes, but it transforms the response
            from chaos to coordination, reduces the trauma for everyone involved,
            and often shortens the episode itself by enabling faster access to care.
          </p>
        </div>

        <h2 id="early-warning-signs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Identifying Early Warning Signs
        </h2>
        <p className="mb-6">
          Research consistently shows that full psychotic relapse is preceded by early
          warning signs --- subtle changes in behavior, thinking, and self-care that
          appear days to weeks before the full episode
          develops <Citation id="2" index={2} source="Psychological Medicine" year="2020" tier={1} />.
          These signs are highly individual, but common patterns include:
        </p>

        <ComparisonTable
          headers={['Category', 'Common Early Warning Signs', 'What to Watch For']}
          rows={[
            ['Sleep', 'Insomnia, reversal of sleep-wake cycle, sleeping much more than usual', 'Any significant change from the person\'s established sleep pattern'],
            ['Social behavior', 'Increasing isolation, canceling commitments, not answering phone', 'Withdrawal that exceeds the person\'s baseline introversion'],
            ['Thinking', 'Increased suspiciousness, preoccupation with specific themes, difficulty concentrating', 'Themes that have preceded previous episodes (same delusions often recur)'],
            ['Self-care', 'Neglecting hygiene, not eating regularly, stopping medication', 'Changes that represent a decline from current functioning level'],
            ['Emotional', 'Irritability, anxiety, emotional flatness, inappropriate laughter', 'Mood changes that are out of proportion to circumstances'],
          ]}
        />

        <p className="mt-6 mb-6">
          The key is documenting these signs during a period of stability, when the
          person and their family can reflect on what has preceded previous episodes.
          Each person's early warning signs are their fingerprint --- unique and relatively
          consistent across episodes. The earlier these signs are recognized, the wider
          the intervention window.
        </p>

        <h2 id="graduated-response" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Graduated Response Plan
        </h2>
        <p className="mb-6">
          An effective crisis plan uses a traffic-light system that matches responses to
          the level of
          concern <Citation id="3" index={3} source="Psychiatric Services" year="2020" tier={1} />:
        </p>

        <ProgressSteps
          steps={[
            { title: 'Green: Early Warning Signs Detected', description: 'Increase frequency of check-ins. Contact the treatment team to report observations. Reduce stressors where possible. Ensure medication is being taken. Implement sleep hygiene measures. Monitor for escalation. The goal is early intervention that may prevent progression to crisis.' },
            { title: 'Yellow: Symptoms Escalating', description: 'Contact the psychiatrist directly (not just the appointment line). Request urgent medication review or dose adjustment. Activate support network --- ensure the person is not alone. Begin implementing de-escalation strategies. Prepare for possible emergency department visit. Alert the person\'s employer or school if appropriate.' },
            { title: 'Red: Immediate Safety Concern', description: 'Call the crisis line (988 in the US) or mobile crisis team. If immediate danger exists, call emergency services. Do not physically restrain the person unless there is imminent risk of serious harm. Remove access to weapons or dangerous items. Stay calm and use de-escalation techniques while waiting for professional help.' },
          ]}
        />

        <h2 id="advance-directives" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Psychiatric Advance Directives: Your Future Self's Instructions
        </h2>
        <p className="mb-6">
          A psychiatric advance directive (PAD) is a legal document written during a
          period of capacity that specifies treatment preferences for situations when
          the person may lose decision-making
          capacity <Citation id="4" index={4} source="Psychiatric Services" year="2019" tier={1} />.
          PADs can include: preferred and refused medications, preferred hospital,
          persons to be notified (and persons to be excluded), acceptable and
          unacceptable interventions during crisis, and designation of a healthcare
          proxy.
        </p>
        <p className="mb-6">
          Research shows that PADs are associated with reduced involuntary treatment,
          higher treatment satisfaction, and improved therapeutic alliance. They give
          the person a voice in their own care even during periods when they may not
          be able to speak for themselves. Templates are available through organizations
          like the National Resource Center on Psychiatric Advance Directives, and many
          can be completed without legal counsel.
        </p>

        <ArticleCallout type="tip" title="After the Crisis: Recovery and Repair">
          When a psychotic crisis resolves, the work isn't over. Post-crisis recovery
          involves: reviewing what happened and updating the crisis plan with new
          information; addressing any damage to relationships, finances, or employment;
          processing the emotional impact on everyone involved; and adjusting the
          treatment plan based on what
          worked <Citation id="7" index={7} source="Schizophrenia & Psychosis Action Alliance" year="2024" tier={3} />.
          Many families skip this step out of exhaustion, but debriefing while the
          experience is fresh produces the best crisis plans for next
          time <Citation id="5" index={5} source="Psychiatric Rehabilitation Journal" year="2019" tier={1} />.
        </ArticleCallout>

        <h2 id="wrap" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          WRAP: A Recovery-Oriented Crisis Framework
        </h2>
        <p className="mb-6">
          The Wellness Recovery Action Plan
          (WRAP) <Citation id="5" index={5} source="Psychiatric Rehabilitation Journal" year="2019" tier={1} />
          is a widely used, peer-developed framework that integrates crisis planning
          into a broader recovery toolkit. WRAP includes: a daily maintenance plan
          (what you need to do every day to stay well), triggers (events that could
          destabilize you), early warning signs (internal experiences that signal
          emerging difficulty), crisis planning (specific instructions for when things
          go seriously wrong), and post-crisis planning (what to do when the crisis
          resolves).
        </p>
        <p className="mb-6">
          What makes WRAP distinctive is that it's person-directed --- the individual
          creates their own plan based on their own experience, rather than having
          a plan imposed by professionals. This ownership increases buy-in and ensures
          the plan reflects the person's actual needs rather than generic
          guidelines <Citation id="9" index={9} source="National Institute of Mental Health" year="2024" tier={2} />.
          WRAP facilitator training is available through the Copeland Center, and
          many peer support programs incorporate WRAP as a standard offering.
        </p>
      </>
    ),
  },
];
