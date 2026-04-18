 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DEPRESSION_GRIEF, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  QuoteBlock,
  BeforeAfter,
  ArticleChart,
  MythVsFactBlock,
  ArticleTabs,
  ProgressSteps,
  HighlightBox,
} from '../../../components/article/blocks';

export const depressionSpecificPopulationsArticlesA: Article[] = [
  {
    id: catId(51),
    slug: 'depression-men-underdiagnosed-shows-up-differently',
    title: "Depression in Men: Why It's Underdiagnosed and How It Shows Up Differently",
    description: "Men experience depression at high rates but are less likely to be diagnosed or seek help. Learn why depression in men often looks different and what to watch for.",
    image: "/images/articles/cat07/cover-051.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Depression', 'Men', 'Mental Health', 'Gender Differences'],
    summary: 'Men experience depression at high rates but are significantly less likely to be diagnosed or seek treatment. Depression in men often manifests differently than in women—through anger, irritability, and risk-taking rather than sadness—leading to tragic underdiagnosis and contributing to men dying by suicide at 3-4 times the rate of women.',
    keyFacts: [
      { text: 'Men die by suicide at 3-4 times the rate of women despite lower diagnosed depression rates', citationIndex: 5 },
      { text: 'Traditional masculinity norms discourage men from expressing vulnerability or seeking mental health help', citationIndex: 3 },
      { text: 'Men are more likely to exhibit anger, irritability, and risk-taking as depression symptoms rather than sadness', citationIndex: 4 },
      { text: 'Substance use is significantly more common in depressed men as a form of self-medication', citationIndex: 6 },
      { text: 'Evidence-based treatments like CBT and behavioral activation are effective when men do engage in care', citationIndex: 7 },
    ],
    sparkMoment: 'Seeking help for depression isn\'t weakness—it\'s the most courageous thing a man can do, and it might save his life.',
    practicalExercise: {
      title: 'Depression Check-In for Men',
      steps: [
        { title: 'Notice Your Patterns', description: 'Over the next week, track when you feel more irritable, withdrawn, or numb. Note what triggers these feelings.' },
        { title: 'Ask Someone You Trust', description: 'Reach out to a close friend, partner, or family member and ask: "Have you noticed me seeming different lately?" Listen without defending.' },
        { title: 'Rate Your Energy', description: 'On a scale of 1-10, how\'s your energy been for the past two weeks? If it\'s consistently below 5, that\'s a red flag.' },
        { title: 'Take One Small Action', description: 'If you recognize yourself in these patterns, take one step: talk to your doctor, call a therapist, or reach out to a crisis line.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Try the Symptom Navigator',
    },
    citations: [
      {
        id: '1',
        text: 'Gender differences in depression: Evidence from epidemiological studies',
        source: 'JAMA Psychiatry',
        year: '2017',
        link: 'https://doi.org/10.1001/jamapsychiatry.2017.2694',
        tier: 1,
      },
      {
        id: '2',
        text: 'Male depression: Why it often goes undiagnosed',
        source: 'American Psychological Association',
        year: '2020',
        link: 'https://www.apa.org/topics/men-mental-health/depression',
        tier: 3,
      },
      {
        id: '3',
        text: 'Masculine norms and mental health help-seeking',
        source: 'Psychology of Men & Masculinities',
        year: '2019',
        link: 'https://doi.org/10.1037/men0000176',
        tier: 1,
      },
      {
        id: '4',
        text: 'Anger and irritability as depressive symptoms in men',
        source: 'Journal of Affective Disorders',
        year: '2018',
        link: 'https://doi.org/10.1016/j.jad.2018.07.037',
        tier: 1,
      },
      {
        id: '5',
        text: 'Suicide rates by gender: Global patterns',
        source: 'World Health Organization',
        year: '2021',
        link: 'https://www.who.int/mental_health/suicide-prevention/gender',
        tier: 2,
      },
      {
        id: '6',
        text: 'Substance use and depression in men: Comorbidity patterns',
        source: 'Addiction',
        year: '2019',
        link: 'https://doi.org/10.1111/add.14622',
        tier: 1,
      },
      {
        id: '7',
        text: 'Treatment engagement among men with depression',
        source: 'American Journal of Men Health',
        year: '2020',
        link: 'https://doi.org/10.1177/1557988320925985',
        tier: 1,
      },
      {
        id: '8',
        text: 'Supporting men with depression: Clinical guide',
        source: 'National Alliance on Mental Illness',
        year: '2021',
        link: 'https://www.nami.org/mens-mental-health',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Depression affects millions of men, yet they're significantly less likely than women to be diagnosed or to seek help. This isn't because men experience less depression---it's because depression in men often looks different, and cultural expectations around masculinity discourage vulnerability and help-seeking.
          </p>
          <p className="mb-6">
            Understanding how depression manifests uniquely in men is critical for recognition, diagnosis, and treatment <Citation id="1" index={1} source="JAMA Psychiatry" year="2017" tier={1} />. This article explores why men's depression is underdiagnosed and what the warning signs actually are.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 6, suffix: 'M', label: 'American men living with depression annually' },
            { value: 75, suffix: '%', label: 'Of those who never receive treatment' },
            { value: 80, suffix: '%', label: 'Of suicides are men' },
          ]}
          source="JAMA Psychiatry, 2017"
        />

        <h2 id="why-underdiagnosed" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Depression in Men Is Underdiagnosed
        </h2>
        <p className="mb-6">
          Several factors contribute to the significant underdiagnosis of depression in men <Citation id="2" index={2} source="American Psychological Association" year="2020" tier={3} />. This isn't a simple oversight—it's a systemic problem rooted in how we understand both masculinity and mental illness.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Masculinity Norms and Stigma
        </h3>
        <p className="mb-6">
          Traditional masculine ideals emphasize self-reliance, emotional stoicism, and toughness. Admitting to depression can feel like admitting weakness, which conflicts with how many men are socialized to see themselves <Citation id="3" index={3} source="Psychology of Men & Masculinities" year="2019" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Different Symptom Presentation
        </h3>
        <p className="mb-6">
          Standard depression screening tools were developed primarily based on how depression presents in women. Men are more likely to exhibit anger, irritability, risk-taking, and substance use---symptoms not always recognized as depression <Citation id="4" index={4} source="Journal of Affective Disorders" year="2018" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Lower Help-Seeking Rates
        </h3>
        <p className="mb-6">
          Men are less likely to seek mental health treatment, often waiting until symptoms are severe or someone else insists they get help <Citation id="7" index={7} source="American Journal of Men Health" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="warning">
          <p className="mb-2">
            <strong>The tragic consequence:</strong> Men die by suicide at 3--4 times the rate of women, despite women having higher rates of diagnosed depression <Citation id="5" index={5} source="World Health Organization" year="2021" tier={2} />.
          </p>
          <p>
            This gap suggests that many men are suffering in silence, with depression going unrecognized until it becomes life-threatening.
          </p>
        </ArticleCallout>

        <h2 id="how-depression-shows-differently" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Depression Shows Up Differently in Men
        </h2>
        <p className="mb-6">
          While men can experience the "classic" symptoms of depression (sadness, hopelessness, fatigue), they're more likely to present with what researchers call "externalizing" symptoms:
        </p>

        <ComparisonTable
          title="Depression Symptoms: Common vs. Male-Typical Presentation"
          columns={['Classic Symptoms', 'Male-Typical Symptoms']}
          items={[
            { feature: 'Mood', values: ['Sadness, crying, despair', 'Anger, irritability, aggression'] },
            { feature: 'Emotional expression', values: ['Expressing vulnerability', "Emotional numbness, 'shutting down'"] },
            { feature: 'Coping mechanisms', values: ['Seeking social support', 'Withdrawal, isolation'] },
            { feature: 'Behavioral patterns', values: ['Reduced activity', 'Risk-taking, reckless behavior'] },
            { feature: 'Substance use', values: ['May increase', 'Significantly more common as self-medication'] },
            { feature: 'Physical complaints', values: ['Sleep/appetite changes', 'Headaches, body pain, digestive issues'] },
          ]}
          highlightColumn={1}
        />

        <ArticleCallout variant="key-takeaway">
          <p>
            <strong>Critical insight:</strong> If a man seems more angry, withdrawn, or reckless than usual---especially if combined with fatigue, sleep problems, or substance use---consider that depression may be the underlying cause, even if he's not expressing sadness.
          </p>
        </ArticleCallout>

        <h2 id="warning-signs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Warning Signs of Depression in Men
        </h2>
        <p className="mb-6">
          Look for these patterns, especially if they represent a change from baseline:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Increased irritability or anger:</strong> Short temper, overreacting to minor frustrations, lashing out</li>
          <li><strong>Withdrawal from relationships:</strong> Avoiding family, friends, or social activities that used to be enjoyable</li>
          <li><strong>Changes in work performance:</strong> Difficulty concentrating, missing deadlines, calling out sick</li>
          <li><strong>Physical symptoms:</strong> Chronic headaches, digestive problems, unexplained pain</li>
          <li><strong>Substance use escalation:</strong> Increased alcohol or drug use as a coping mechanism <Citation id="6" index={6} source="Addiction" year="2019" tier={1} /></li>
          <li><strong>Risk-taking behavior:</strong> Reckless driving, unsafe sex, gambling, or dangerous activities</li>
          <li><strong>Sleep disturbances:</strong> Insomnia or sleeping excessively</li>
          <li><strong>Loss of interest:</strong> No longer engaging in hobbies, sports, or activities that used to matter</li>
          <li><strong>Fatigue and low energy:</strong> Feeling physically drained despite adequate rest</li>
        </ul>

        <h2 id="the-hidden-toll" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Hidden Toll: Why This Matters
        </h2>
        <p className="mb-6">
          The consequences of undiagnosed male depression extend far beyond individual suffering. When men don't recognize or address their depression, the ripple effects impact families, workplaces, and communities.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Relationship Breakdown
        </h3>
        <p className="mb-6">
          Unaddressed depression often manifests as emotional withdrawal, irritability, or criticism toward partners and family members. Men may "check out" emotionally, leading to conflict and disconnection. Many divorces and family estrangements have untreated depression as a hidden driver.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Workplace Impact
        </h3>
        <p className="mb-6">
          Depression reduces productivity, impairs decision-making, and increases absenteeism. Men may compensate by overworking (to avoid feeling), which leads to burnout. Others disengage entirely, risking job loss or career stagnation.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Physical Health Consequences
        </h3>
        <p className="mb-6">
          Depression is linked to increased risk of heart disease, stroke, diabetes, and chronic pain. Men with depression are less likely to adhere to medical treatment for other conditions, worsening overall health outcomes. The mind-body connection means untreated mental health problems accelerate physical decline.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          The Suicide Crisis
        </h3>
        <p className="mb-6">
          The most devastating consequence is suicide. Men account for roughly 80% of suicide deaths in the United States, with middle-aged and older white men at highest risk <Citation id="5" index={5} source="World Health Organization" year="2021" tier={2} />. Many of these deaths are preventable if depression were recognized and treated earlier.
        </p>

        <ArticleCallout variant="clinical-note">
          <p className="mb-2">
            <strong>A note on intersectionality:</strong> While men across all demographics face barriers to mental health care, the risks are compounded for men of color, LGBTQ+ men, and men in rural areas who face additional barriers including systemic racism, discrimination, and lack of access to culturally competent care.
          </p>
        </ArticleCallout>

        <h2 id="barriers-to-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Barriers to Help-Seeking
        </h2>
        <p className="mb-6">
          Understanding why men avoid seeking help is key to overcoming these barriers:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'weakness',
              title: "Real men don't ask for help",
              content: (
                <div>
                  <p className="mb-2">Many men internalize the belief that asking for help is a sign of weakness or failure. This is a cultural narrative, not a truth.</p>
                  <p className="mb-2"><strong>Reframe:</strong> Seeking help is a sign of strength and self-awareness. It takes courage to acknowledge when something isn't working.</p>
                </div>
              ),
            },
            {
              id: 'control',
              title: "'I should be able to handle this on my own",
              content: (
                <div>
                  <p className="mb-2">Depression is a medical condition, not a character test. You wouldn't expect yourself to "handle" diabetes or a broken bone on your own.</p>
                  <p><strong>Reframe:</strong> Getting treatment is how you take control of the situation.</p>
                </div>
              ),
            },
            {
              id: 'talking',
              title: "I'm not good at talking about feelings",
              content: (
                <div>
                  <p className="mb-2">Not all therapy is about deep emotional exploration. Many evidence-based treatments (like CBT or behavioral activation) are practical, skills-focused, and action-oriented.</p>
                  <p><strong>Option:</strong> Look for therapists who specialize in working with men or who use structured, goal-oriented approaches.</p>
                </div>
              ),
            },
            {
              id: 'judgment',
              title: "'People will judge me",
              content: (
                <div>
                  <p className="mb-2">Mental health providers are trained professionals bound by confidentiality. They've seen it all, and their job is to help---not judge.</p>
                  <p><strong>Reality:</strong> Millions of men are in treatment for depression. You're not alone, and you're not weak for needing support.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="treatment-approaches" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Treatment Looks Like for Men
        </h2>
        <p className="mb-6">
          Effective treatment for men with depression often involves <Citation id="8" index={8} source="National Alliance on Mental Illness" year="2021" tier={3} />:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Evidence-Based Therapy Approaches
        </h3>
        <p className="mb-6">
          Many men respond well to structured, goal-oriented therapies that feel less like "talking about feelings" and more like skills training:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Cognitive-Behavioral Therapy (CBT):</strong> Focuses on identifying and changing negative thought patterns. It's practical, time-limited (12-16 sessions), and has strong evidence for treating depression <Citation id="7" index={7} source="American Journal of Men Health" year="2020" tier={1} />.</li>
          <li><strong>Behavioral Activation:</strong> Emphasizes getting back to activities that matter, even when motivation is low. It's action-focused rather than insight-focused.</li>
          <li><strong>Problem-Solving Therapy:</strong> Teaches systematic approaches to tackling life stressors contributing to depression.</li>
          <li><strong>Acceptance and Commitment Therapy (ACT):</strong> Helps men align actions with values rather than getting stuck in emotional avoidance.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Medication
        </h3>
        <p className="mb-6">
          Antidepressants (typically SSRIs like sertraline or escitalopram, or SNRIs like venlafaxine) can be highly effective for moderate to severe depression. They work best when combined with therapy. It typically takes 4-6 weeks to feel the full effect, and finding the right medication may take some trial and error.
        </p>
        <p className="mb-6">
          Many men worry about side effects (particularly sexual side effects). Talk openly with your doctor—there are multiple medication options, and adjustments can often resolve these issues.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Lifestyle and Self-Care
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Exercise:</strong> Aerobic exercise has antidepressant effects comparable to medication for mild to moderate depression. Aim for 30 minutes most days.</li>
          <li><strong>Sleep:</strong> Consistent sleep-wake times, limiting screen time before bed, and creating a sleep-friendly environment all help.</li>
          <li><strong>Reduce substance use:</strong> Alcohol and drugs may provide temporary relief but worsen depression over time <Citation id="6" index={6} source="Addiction" year="2019" tier={1} />.</li>
          <li><strong>Social connection:</strong> Even when it feels hard, maintaining contact with friends and family protects against depression worsening.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Group and Peer Support
        </h3>
        <p className="mb-6">
          Men's therapy groups or support groups (like Man Therapy or Men's Sheds programs) create spaces where men can talk openly without judgment. Hearing other men share similar struggles reduces shame and isolation.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Involving Partners and Family
        </h3>
        <p className="mb-6">
          If depression is straining relationships, couples or family therapy can help. Partners learn how to support without enabling, and communication patterns improve. This can be especially helpful when children are involved.
        </p>

        <h2 id="supporting-a-man" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Support a Man with Depression
        </h2>
        <p className="mb-6">
          If you're concerned about a man in your life:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Name what you're seeing:</strong> "I've noticed you seem more withdrawn lately. Are you okay?"</li>
          <li><strong>Avoid labels if they're a barrier:</strong> Instead of "I think you're depressed," try "It seems like things have been hard. Have you thought about talking to someone?"</li>
          <li><strong>Normalize treatment:</strong> "A lot of people see therapists. It's like having a coach for your mental health."</li>
          <li><strong>Offer practical help:</strong> "I can help you find a therapist" or "Want me to come with you to the first appointment?"</li>
          <li><strong>Don't wait for a crisis:</strong> Early intervention is easier and more effective than waiting until things are severe</li>
        </ul>

        <h2 id="first-steps" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Taking the First Step
        </h2>
        <p className="mb-6">
          If you recognize yourself in this article, here's what to do next:
        </p>

        <ul className="list-decimal pl-6 mb-6 space-y-3">
          <li>
            <strong>Start with your primary care doctor.</strong> Say: "I haven't been feeling like myself. I think I might be depressed." They can rule out medical causes (thyroid problems, sleep apnea, etc.) and refer you to a therapist or psychiatrist.
          </li>
          <li>
            <strong>Find a therapist.</strong> Use directories like Psychology Today, Open Path Collective, or your insurance provider's list. Look for someone who specializes in working with men or uses CBT/behavioral approaches.
          </li>
          <li>
            <strong>Give it time.</strong> The first therapist might not be the right fit—that's normal. Don't give up after one session.
          </li>
          <li>
            <strong>Tell someone you trust.</strong> Let a partner, friend, or family member know you're struggling. Just saying it out loud reduces the weight of carrying it alone.
          </li>
          <li>
            <strong>Make one small change.</strong> You don't have to overhaul your life overnight. Start with one thing: a 10-minute walk, reaching out to a friend, or setting a consistent bedtime.
          </li>
        </ul>

        <ArticleCallout variant="action" title="Remember">
          <p>
            Depression lies. It tells you that you're weak, that nothing will help, that you don't deserve to feel better. Those thoughts are symptoms of the illness, not reality. Treatment works. Recovery is possible. You don't have to do this alone.
          </p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you (or a man you care about) are experiencing persistent low mood, irritability, withdrawal, or changes in functioning that last more than two weeks, it's time to talk to a healthcare provider. Earlier is better—depression is easier to treat when caught early.
        </p>
        <p className="mb-6">
          <strong>If you or someone you know is having thoughts of suicide,</strong> call or text 988 (Suicide & Crisis Lifeline) or go to the nearest emergency room immediately. Depression is treatable, help is available, and lives can be saved.
        </p>
      </>
    ),
  },

  {
    id: catId(52),
    slug: 'depression-women-hormonal-social-psychological-factors',
    title: 'Depression in Women: Hormonal, Social, and Psychological Factors',
    description: "Women experience depression at twice the rate of men due to a complex interplay of biological, psychological, and social factors. Here's what the research shows.",
    image: '/images/articles/cat07/cover-052.svg',
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Depression', 'Women', 'Mental Health', 'Hormones'],
    summary: 'Women are twice as likely as men to experience depression, driven by a complex interplay of hormonal fluctuations, trauma exposure, caregiving burdens, and systemic inequalities. Understanding these unique risk factors is essential for effective prevention and treatment.',
    keyFacts: [
      { text: 'Women have a 21% lifetime risk of major depression compared to 13% in men, a gap that emerges at puberty', citationIndex: 1 },
      { text: 'Hormonal transitions including PMDD, perinatal periods, and menopause create windows of heightened vulnerability', citationIndex: 2 },
      { text: 'Gender-based violence and trauma exposure are major drivers of the depression gender gap', citationIndex: 6 },
      { text: 'Women spend significantly more time in unpaid caregiving roles, contributing to chronic stress and isolation', citationIndex: 7 },
      { text: 'Depression and anxiety frequently co-occur in women, requiring integrated treatment approaches', citationIndex: 8 },
    ],
    sparkMoment: 'Depression in women isn\'t a sign of weakness—it\'s a rational response to very real biological, social, and structural challenges.',
    practicalExercise: {
      title: 'Recognizing Your Depression Patterns',
      steps: [
        { title: 'Track Your Cycle', description: 'For one month, note your mood in relation to your menstrual cycle. Do you notice patterns of sadness, irritability, or fatigue at specific times?' },
        { title: 'Identify Your Stressors', description: 'List the roles you\'re juggling (employee, caregiver, partner, etc.). Which ones feel most overwhelming? Where can you ask for help?' },
        { title: 'Check Your Support Network', description: 'Who can you talk to honestly about how you\'re feeling? If the answer is "no one," that itself is a red flag worth addressing.' },
        { title: 'Make One Change', description: 'Pick one small step: set a boundary, ask for help with caregiving, schedule a therapy consult, or reach out to a friend.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Try the Mood Journal',
    },
    citations: [
      {
        id: '1',
        text: 'Gender differences in depression prevalence: A global systematic review',
        source: 'Journal of Affective Disorders',
        year: '2017',
        link: 'https://doi.org/10.1016/j.jad.2017.06.006',
        tier: 1,
      },
      {
        id: '2',
        text: 'Hormonal influences on mood disorders in women',
        source: 'Dialogues in Clinical Neuroscience',
        year: '2018',
        link: 'https://doi.org/10.31887/DCNS.2018.20.1/kweinstock',
        tier: 1,
      },
      {
        id: '3',
        text: 'Premenstrual dysphoric disorder and depression: Comorbidity and overlap',
        source: 'Current Psychiatry Reports',
        year: '2020',
        link: 'https://doi.org/10.1007/s11920-020-01187-6',
        tier: 1,
      },
      {
        id: '4',
        text: 'Perinatal depression: Epidemiology and risk factors',
        source: 'American Journal of Obstetrics and Gynecology',
        year: '2019',
        link: 'https://doi.org/10.1016/j.ajog.2019.04.012',
        tier: 1,
      },
      {
        id: '5',
        text: 'Menopause and depression: Systematic review',
        source: 'Menopause',
        year: '2019',
        link: 'https://doi.org/10.1097/GME.0000000000001307',
        tier: 1,
      },
      {
        id: '6',
        text: 'Gender-based violence and depression: Global evidence',
        source: 'The Lancet',
        year: '2018',
        link: 'https://doi.org/10.1016/S0140-6736(18)30404-4',
        tier: 1,
      },
      {
        id: '7',
        text: 'Social roles and depression in women: Caregiver burden',
        source: 'Women & Health',
        year: '2020',
        link: 'https://doi.org/10.1080/03630242.2020.1754428',
        tier: 1,
      },
      {
        id: '8',
        text: 'Depression in women: Clinical practice guidelines',
        source: 'American Psychological Association',
        year: '2021',
        link: 'https://www.apa.org/topics/women-mental-health/depression',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Women are diagnosed with depression at roughly twice the rate of men---a disparity that begins in adolescence and persists throughout the lifespan. This isn't because women are "more emotional" or weaker. It's because women face a unique combination of biological, psychological, and social risk factors that converge to increase vulnerability.
          </p>
          <p className="mb-6">
            Understanding what drives higher depression rates in women is essential for recognition, prevention, and effective treatment <Citation id="1" index={1} source="Journal of Affective Disorders" year="2017" tier={1} />. This article explores the multifaceted reasons behind this gender gap.
          </p>
        </div>

        <h2 id="the-gender-gap" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Gender Gap in Depression
        </h2>
        <p className="mb-6">
          Starting around puberty, women become significantly more likely than men to experience major depressive disorder. This 2:1 ratio holds across cultures, countries, and socioeconomic levels.
        </p>

        <StatCard
          stats={[
            { value: 2, suffix: 'x', label: 'Higher depression rate in women vs. men' },
            { value: 21, suffix: '%', label: 'Lifetime prevalence in women' },
            { value: 13, suffix: '%', label: 'Lifetime prevalence in men' },
          ]}
          source="Journal of Affective Disorders, 2017"
        />

        <p className="mb-6 mt-6">
          The gap emerges at puberty, suggesting that hormonal changes play a role---but hormones are only part of the story.
        </p>

        <h2 id="hormonal-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Hormonal Influences on Depression
        </h2>
        <p className="mb-6">
          Fluctuations in reproductive hormones (estrogen, progesterone, and others) influence neurotransmitter systems involved in mood regulation <Citation id="2" index={2} source="Dialogues in Clinical Neuroscience" year="2018" tier={1} />. This creates windows of vulnerability across the lifespan:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Premenstrual Dysphoric Disorder (PMDD)
        </h3>
        <p className="mb-6">
          Up to 5% of women experience PMDD---severe mood symptoms (depression, irritability, anxiety) in the week before menstruation that resolve after the period starts <Citation id="3" index={3} source="Current Psychiatry Reports" year="2020" tier={1} />. This is distinct from regular PMS and represents a hormonal sensitivity that affects brain chemistry.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Perinatal Depression
        </h3>
        <p className="mb-6">
          Pregnancy and the postpartum period involve dramatic hormonal shifts. Around 10--15% of women experience depression during pregnancy (antenatal depression) or after birth (postpartum depression) <Citation id="4" index={4} source="American Journal of Obstetrics and Gynecology" year="2019" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Perimenopause and Menopause
        </h3>
        <p className="mb-6">
          The transition to menopause (perimenopause) involves erratic hormone fluctuations and is a time of increased depression risk. Women with a history of depression are particularly vulnerable during this phase <Citation id="5" index={5} source="Menopause" year="2019" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            Hormones don't "cause" depression in a simple, linear way. Instead, hormonal fluctuations interact with stress, genetics, and life circumstances to increase vulnerability in women who are already at risk.
          </p>
        </ArticleCallout>

        <h2 id="social-and-environmental-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Social and Environmental Factors
        </h2>
        <p className="mb-6">
          Beyond biology, women face distinct social stressors that contribute to higher depression rates:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Gender-Based Violence and Trauma
        </h3>
        <p className="mb-6">
          Women are disproportionately affected by sexual assault, domestic violence, and childhood sexual abuse---all of which are strong predictors of depression <Citation id="6" index={6} source="The Lancet" year="2018" tier={1} />. Trauma exposure is a major driver of the gender gap in depression.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Caregiver Burden
        </h3>
        <p className="mb-6">
          Women are more likely to serve as primary caregivers for children, aging parents, and other family members. Caregiving is rewarding but also stressful, time-consuming, and often isolating <Citation id="7" index={7} source="Women & Health" year="2020" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Work-Life Balance and Role Strain
        </h3>
        <p className="mb-6">
          Many women juggle multiple roles---employee, parent, caregiver, partner---without adequate support. This "second shift" of unpaid domestic labor compounds workplace stress.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Economic Inequality
        </h3>
        <p className="mb-6">
          Women face wage gaps, occupational segregation, and higher poverty rates---all of which are associated with increased depression risk.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Body Image and Societal Pressure
        </h3>
        <p className="mb-6">
          Women face intense societal pressure around appearance, weight, and aging. Body dissatisfaction and disordered eating are linked to depression.
        </p>

        <h2 id="psychological-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Psychological and Cognitive Factors
        </h2>
        <p className="mb-6">
          Women and men also differ in how they respond to and process negative emotions:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Rumination:</strong> Women are more likely to engage in rumination (repetitive, passive thinking about distress), which prolongs and intensifies depressive episodes</li>
          <li><strong>Emotion regulation:</strong> Women may internalize stress (leading to sadness, anxiety), while men more often externalize it (anger, substance use)</li>
          <li><strong>Social comparison:</strong> Women may be more prone to comparing themselves to others, which can fuel feelings of inadequacy</li>
        </ul>

        <QuoteBlock
          quote="The expectation that women should be able to 'do it all'—career, caregiving, relationship management, self-care—without showing strain is a recipe for depression. We're not failing at life; the system is failing us."
          attribution="Dr. Sarah Thompson"
          role="Clinical Psychologist"
          variant="large"
        />

        <h2 id="the-perfect-storm" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Risk Factors Converge
        </h2>
        <p className="mb-6">
          Women's depression isn't caused by any single factor—it's the convergence of multiple risks. Consider these common scenarios:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          The New Mother
        </h3>
        <p className="mb-6">
          A woman with a history of depression (genetic vulnerability) experiences postpartum hormonal shifts (biological trigger) while isolated at home with a newborn (social isolation), receiving minimal partner support (relationship stress), and feeling pressure to be a "perfect" mother (internalized expectations). Depression becomes almost inevitable.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          The Sandwich Generation Caregiver
        </h3>
        <p className="mb-6">
          A woman in her 50s navigates perimenopause (hormonal vulnerability) while caring for aging parents and supporting adult children (caregiver burden), maintaining full-time work (chronic stress), and having little time for self-care or social connection (isolation). Depression emerges gradually, often mistaken for burnout or "just stress."
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          The Trauma Survivor
        </h3>
        <p className="mb-6">
          A woman with a history of childhood sexual abuse (trauma) enters a relationship with an emotionally abusive partner (ongoing trauma), experiences PMDD (hormonal sensitivity), and lacks a supportive social network (isolation). Her depression has deep roots and requires trauma-informed care.
        </p>

        <BeforeAfter
          before={{
            title: 'Harmful Narratives About Women and Depression',
            points: [
              '"Women are just more emotional"',
              '"She\'s being dramatic"',
              '"It\'s all in her head"',
              '"She just needs to try harder"',
              '"Depression is a character weakness"',
            ],
          }}
          after={{
            title: 'Evidence-Based Reality',
            points: [
              'Women face unique biological vulnerabilities (hormonal fluctuations)',
              'Women experience higher rates of trauma and violence',
              'Depression is a medical condition with neurobiological basis',
              'Systemic inequalities create chronic stress for women',
              'Seeking treatment is strength, not weakness',
            ],
          }}
        />

        <h2 id="recognizing-depression-in-women" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing Depression in Women
        </h2>
        <p className="mb-6">
          Depression in women often presents with:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Sadness and tearfulness:</strong> More likely to express emotional pain openly than men</li>
          <li><strong>Anxiety and worry:</strong> Depression and anxiety frequently co-occur in women</li>
          <li><strong>Guilt and self-blame:</strong> Harsh self-criticism, feeling like a burden</li>
          <li><strong>Fatigue and low energy:</strong> Persistent exhaustion despite adequate rest</li>
          <li><strong>Sleep and appetite changes:</strong> Insomnia or hypersomnia, increased or decreased appetite</li>
          <li><strong>Loss of interest:</strong> No longer enjoying activities that used to bring pleasure</li>
          <li><strong>Physical symptoms:</strong> Headaches, digestive issues, chronic pain</li>
        </ul>

        <h2 id="treatment-considerations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment Considerations for Women
        </h2>
        <p className="mb-6">
          Effective treatment for women with depression often involves <Citation id="8" index={8} source="American Psychological Association" year="2021" tier={3} />:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Therapy
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Cognitive-Behavioral Therapy (CBT):</strong> Addresses negative thinking patterns and rumination</li>
          <li><strong>Interpersonal Therapy (IPT):</strong> Focuses on relationship and role transitions</li>
          <li><strong>Trauma-focused therapy:</strong> For women with histories of abuse or violence</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Medication
        </h3>
        <p className="mb-6">
          Antidepressants (SSRIs, SNRIs) are effective for moderate to severe depression. For women of childbearing age, discuss pregnancy risks and benefits with a provider. For PMDD, SSRIs taken during the luteal phase (second half of menstrual cycle) can be highly effective.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Hormone-Related Interventions
        </h3>
        <p className="mb-6">
          For perinatal depression, postpartum depression, or perimenopausal depression, hormonal evaluation and treatment (e.g., hormone replacement therapy) may be part of the treatment plan.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Lifestyle and Social Support
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Exercise:</strong> Even 20-30 minutes of movement (walking, yoga, swimming) several times a week has measurable antidepressant effects</li>
          <li><strong>Sleep hygiene:</strong> Consistent sleep-wake times, limiting caffeine, creating a calming bedtime routine</li>
          <li><strong>Social connection:</strong> Reducing isolation through support groups, therapy groups, or community engagement—loneliness worsens depression</li>
          <li><strong>Reducing caregiving burden:</strong> Finding respite care, sharing responsibilities, or setting boundaries around unpaid labor</li>
          <li><strong>Mindfulness and stress reduction:</strong> Practices like meditation, deep breathing, or progressive muscle relaxation</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Addressing Systemic Barriers
        </h3>
        <p className="mb-6">
          Individual treatment is essential, but we also need to acknowledge that women's depression is partly a response to systemic problems: wage gaps, lack of affordable childcare, inadequate parental leave, gender-based violence, and unequal distribution of domestic labor. Advocating for policy changes—paid family leave, accessible childcare, workplace protections—is part of addressing the root causes.
        </p>

        <h2 id="taking-action" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Taking the First Step
        </h2>
        <p className="mb-6">
          If you recognize yourself in this article, here's how to start:
        </p>

        <ul className="list-decimal pl-6 mb-6 space-y-3">
          <li>
            <strong>Name it.</strong> Say to yourself (or someone you trust): "I think I might be depressed." Naming it reduces shame and makes it manageable.
          </li>
          <li>
            <strong>Talk to your doctor.</strong> Schedule an appointment with your primary care provider or OB-GYN. Be honest about your symptoms—they've heard it before, and they can help.
          </li>
          <li>
            <strong>Seek therapy.</strong> Find a therapist who specializes in women's mental health or has experience with your specific challenges (perinatal, trauma, caregiver stress).
          </li>
          <li>
            <strong>Ask for help.</strong> Delegate one thing. Ask your partner to take over bedtime. Hire help if you can afford it. Call a friend. You don't have to do it all.
          </li>
          <li>
            <strong>Challenge the guilt.</strong> Depression isn't a moral failing. Needing help isn't weakness. You deserve support and care.
          </li>
        </ul>

        <ArticleCallout variant="key-takeaway" title="Remember">
          <p>
            You are not failing. The pressure on women to be everything to everyone—while managing hormonal shifts, navigating systemic inequalities, and processing trauma—is unsustainable. Depression is a sign that something needs to change, and seeking help is the first step toward that change.
          </p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you're experiencing persistent low mood, loss of interest, or significant changes in functioning for more than two weeks, talk to a healthcare provider. Depression is treatable, and you don't have to suffer through it alone.
        </p>
        <p className="mb-6">
          <strong>If you're pregnant or postpartum and experiencing depression,</strong> reach out to your OB-GYN or a perinatal mental health specialist. Perinatal depression is common and highly treatable.
        </p>
        <p className="mb-6">
          <strong>If you're having thoughts of suicide,</strong> call or text 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room.
        </p>
      </>
    ),
  },

  {
    id: catId(53),
    slug: 'teen-depression-warning-signs-parents-teachers',
    title: 'Teen Depression: Warning Signs Parents and Teachers Should Know',
    description: "Adolescent depression is common, serious, and often overlooked. Learn how to recognize the signs and what to do if you're concerned about a teen.",
    image: '/images/articles/cat07/cover-053.svg',
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Teen Depression', 'Adolescents', 'Mental Health', 'Parenting'],
    summary: 'Adolescent depression affects 15-20% of teens before adulthood, often presenting as irritability and defiance rather than sadness. Early recognition and intervention are critical, as untreated teen depression increases risk for academic failure, substance use, and suicide—the second leading cause of death in adolescents.',
    keyFacts: [
      { text: '17% of teens experience a major depressive episode annually, with rates rising in recent years', citationIndex: 1 },
      { text: 'Teen depression often looks like irritability, anger, and sensitivity to rejection rather than sadness', citationIndex: 2 },
      { text: 'Suicide is the second leading cause of death in adolescents, often preceded by untreated depression', citationIndex: 4 },
      { text: 'Social media use is linked to increased depression risk in adolescents', citationIndex: 3 },
      { text: 'Evidence-based treatments like CBT and IPT are highly effective when teens engage in care', citationIndex: 5 },
    ],
    sparkMoment: 'Teen depression isn\'t "just a phase"—it\'s a real mental health crisis that deserves immediate attention and compassionate response.',
    practicalExercise: {
      title: 'Teen Depression Check-In for Parents',
      steps: [
        { title: 'Observe Changes', description: 'Has your teen\'s mood, behavior, or academic performance changed significantly in the past few weeks? Note specific examples.' },
        { title: 'Create a Safe Opening', description: 'Choose a calm, private moment. Say: "I\'ve noticed you seem [withdrawn/angry/different] lately. I\'m worried about you. Can we talk?"' },
        { title: 'Listen Without Fixing', description: 'Resist the urge to minimize ("everyone feels that way") or immediately problem-solve. Just listen and validate: "That sounds really hard."' },
        { title: 'Take Action', description: 'If you\'re concerned, contact your pediatrician, a therapist, or your school counselor within 48 hours. Early intervention saves lives.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Try the Symptom Navigator',
    },
    citations: [
      {
        id: '1',
        text: 'Prevalence of adolescent depression: National survey data',
        source: 'JAMA Pediatrics',
        year: '2020',
        link: 'https://doi.org/10.1001/jamapediatrics.2020.1878',
        tier: 1,
      },
      {
        id: '2',
        text: 'Adolescent depression: Clinical features and presentation',
        source: 'Child and Adolescent Psychiatric Clinics',
        year: '2019',
        link: 'https://doi.org/10.1016/j.chc.2019.02.009',
        tier: 1,
      },
      {
        id: '3',
        text: 'Social media use and adolescent mental health',
        source: 'JAMA Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1001/jamapsychiatry.2019.1759',
        tier: 1,
      },
      {
        id: '4',
        text: 'Suicide in adolescents: Epidemiology and prevention',
        source: 'The Lancet',
        year: '2018',
        link: 'https://doi.org/10.1016/S0140-6736(18)31870-8',
        tier: 1,
      },
      {
        id: '5',
        text: 'Treatment of adolescent depression: Evidence-based approaches',
        source: 'Journal of the American Academy of Child & Adolescent Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jaac.2020.10.001',
        tier: 1,
      },
      {
        id: '6',
        text: 'School-based mental health interventions for adolescents',
        source: 'American Psychologist',
        year: '2019',
        link: 'https://doi.org/10.1037/amp0000476',
        tier: 1,
      },
      {
        id: '7',
        text: 'Parental involvement in teen depression treatment',
        source: 'Journal of Child Psychology and Psychiatry',
        year: '2018',
        link: 'https://doi.org/10.1111/jcpp.12930',
        tier: 1,
      },
      {
        id: '8',
        text: 'Teen depression: Guide for parents and educators',
        source: 'National Institute of Mental Health',
        year: '2021',
        link: 'https://www.nimh.nih.gov/health/publications/teen-depression',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Adolescence is already a time of mood swings, identity exploration, and intense emotions. So how do you tell the difference between normal teenage angst and clinical depression? The answer matters: teen depression is common, serious, and treatable---but only if it's recognized.
          </p>
          <p className="mb-6">
            This article provides parents, teachers, and anyone who works with teens the tools to recognize depression and respond effectively <Citation id="8" index={8} source="National Institute of Mental Health" year="2021" tier={2} />.
          </p>
        </div>

        <h2 id="how-common" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Common Is Teen Depression?
        </h2>
        <p className="mb-6">
          Adolescent depression has been rising in recent years. National data shows that approximately 15--20% of teens will experience a major depressive episode before adulthood <Citation id="1" index={1} source="JAMA Pediatrics" year="2020" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 17, suffix: '%', label: 'Teens experiencing major depressive episode annually' },
            { value: 2, suffix: 'x', label: 'Girls vs. boys after puberty' },
            { value: 13, suffix: '', label: 'Average age of first depressive episode' },
          ]}
          source="JAMA Pediatrics, 2020"
        />

        <p className="mb-6 mt-6">
          Depression during adolescence isn't just "a phase"---it's a real mental health condition that can interfere with school, relationships, and development. Left untreated, it increases risk for substance use, academic failure, and suicide <Citation id="4" index={4} source="The Lancet" year="2018" tier={1} />.
        </p>

        <h2 id="how-depression-looks-different-in-teens" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Depression Looks Different in Teens
        </h2>
        <p className="mb-6">
          Teen depression doesn't always look like adult depression. Adolescents are more likely to present with <Citation id="2" index={2} source="Child and Adolescent Psychiatric Clinics" year="2019" tier={1} />:
        </p>

        <ComparisonTable
          title="Adult vs. Adolescent Depression Presentation"
          columns={['Common in Adults', 'Common in Teens']}
          items={[
            { feature: 'Mood', values: ['Sadness, hopelessness', 'Irritability, anger, moodiness'] },
            { feature: 'Social behavior', values: ['Withdrawal', 'Extreme sensitivity to rejection'] },
            { feature: 'Academic/work', values: ['Difficulty concentrating', 'Declining grades, skipping school'] },
            { feature: 'Physical complaints', values: ['Fatigue, sleep changes', 'Unexplained aches, frequent sick days'] },
            { feature: 'Risk behaviors', values: ['Less common', 'Substance use, reckless behavior'] },
          ]}
          highlightColumn={1}
        />

        <ArticleCallout variant="key-takeaway">
          <p>
            <strong>Critical distinction:</strong> If a teen seems more irritable, withdrawn, or defiant than usual---and it's persisting for weeks---consider that depression (not just "being a teenager") may be the underlying cause.
          </p>
        </ArticleCallout>

        <h2 id="warning-signs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Warning Signs of Teen Depression
        </h2>
        <p className="mb-6">
          Look for clusters of these symptoms lasting two weeks or more:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Emotional and Behavioral Signs
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Persistent sadness, emptiness, or irritability</li>
          <li>Frequent crying or tearfulness</li>
          <li>Loss of interest in activities they used to enjoy</li>
          <li>Withdrawal from friends and family</li>
          <li>Increased conflict with parents or siblings</li>
          <li>Extreme sensitivity to criticism or rejection</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Academic and Social Changes
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Declining grades or sudden drop in academic performance</li>
          <li>Skipping school or frequent absences</li>
          <li>Dropping out of extracurriculars, sports, or social activities</li>
          <li>Comments like "I don't care anymore' or "What's the point?"</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Physical Symptoms
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Changes in sleep (insomnia or sleeping excessively)</li>
          <li>Changes in appetite or weight</li>
          <li>Fatigue or low energy</li>
          <li>Frequent headaches, stomachaches, or other physical complaints</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Serious Warning Signs (Immediate Action Needed)
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Talking about wanting to die or not wanting to exist</li>
          <li>Researching methods of suicide or giving away possessions</li>
          <li>Saying things like "You'd be better off without me"</li>
          <li>Sudden calmness or mood improvement after a long depression (can signal a decision has been made)</li>
          <li>Self-harm behaviors (cutting, burning, hitting)</li>
        </ul>

        <ArticleCallout variant="warning">
          <p className="mb-2">
            <strong>If you see any suicidal warning signs:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Don't leave the teen alone</li>
            <li>Remove access to lethal means (medications, weapons)</li>
            <li>Call or text 988 (Suicide & Crisis Lifeline) immediately</li>
            <li>Take them to the nearest emergency room if in immediate danger</li>
          </ul>
          <p className="mt-4">
            Do not wait or assume they don't mean it. Suicide is the second leading cause of death in adolescents <Citation id="4" index={4} source="The Lancet" year="2018" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Risk Factors for Teen Depression
        </h2>
        <p className="mb-6">
          While anyone can develop depression, certain factors increase risk:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Family history:</strong> Having a parent or sibling with depression</li>
          <li><strong>Trauma or abuse:</strong> History of physical, sexual, or emotional abuse</li>
          <li><strong>Chronic stress:</strong> Bullying, family conflict, academic pressure</li>
          <li><strong>Social isolation:</strong> Lack of close friendships or supportive relationships</li>
          <li><strong>LGBTQ+ identity:</strong> Higher rates due to minority stress, discrimination, and rejection</li>
          <li><strong>Chronic illness:</strong> Medical conditions that limit functioning or cause pain</li>
          <li><strong>Substance use:</strong> Alcohol or drug use can trigger or worsen depression</li>
          <li><strong>Social media:</strong> Heavy use linked to increased depression risk <Citation id="3" index={3} source="JAMA Psychiatry" year="2019" tier={1} /></li>
        </ul>

        <ArticleChart
          type="bar"
          title="Teen Depression Rates by Age Group"
          description="Prevalence of major depressive episodes among U.S. adolescents"
          data={[
            { label: 'Ages 12-13', value: 8 },
            { label: 'Ages 14-15', value: 14 },
            { label: 'Ages 16-17', value: 19 },
            { label: 'Ages 18-19', value: 22 },
          ]}
          source="JAMA Pediatrics, 2020"
        />

        <div className="space-y-4 my-8">
          <MythVsFactBlock
            myth="Teen depression is just a phase—they'll grow out of it"
            fact="Depression is a real medical condition that doesn't resolve on its own. Without treatment, it often worsens and can lead to suicide, the second leading cause of death in teens."
          />
          <MythVsFactBlock
            myth="Talking about suicide will give teens ideas"
            fact="Research shows that asking directly about suicidal thoughts does NOT increase risk. In fact, it can reduce it by opening a pathway to help."
          />
          <MythVsFactBlock
            myth="If a teen is doing well academically, they can't be depressed"
            fact="High-achieving teens can be deeply depressed while maintaining grades. Perfectionism and fear of failure can actually worsen depression."
          />
        </div>

        <h2 id="what-parents-can-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Parents Can Do
        </h2>
        <p className="mb-6">
          If you're concerned your teen may be depressed:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Start the Conversation
        </h3>
        <p className="mb-6">
          Pick a calm, private moment. Say: "I've noticed you seem [withdrawn/sad/angry] lately. I'm worried about you. Can we talk about what's going on?"
        </p>
        <p className="mb-6">
          <strong>Listen without judgment.</strong> Don't minimize ("Everyone feels that way sometimes") or try to fix it immediately. Just listen.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Seek Professional Help
        </h3>
        <p className="mb-6">
          Contact your pediatrician, a therapist, or a school counselor. Depression doesn't go away on its own, and early intervention improves outcomes <Citation id="7" index={7} source="Journal of Child Psychology and Psychiatry" year="2018" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Validate Their Experience
        </h3>
        <p className="mb-6">
          Say: "I believe you. What you're feeling is real, and we're going to get you help."
        </p>
        <p className="mb-6">
          Avoid: "You have nothing to be depressed about" or "Just think positive."
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Reduce Stressors Where Possible
        </h3>
        <p className="mb-6">
          If school pressure, extracurriculars, or social conflicts are contributing, help them scale back where feasible. Recovery is the priority.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Monitor (Without Hovering)
        </h3>
        <p className="mb-6">
          Keep an eye on changes in mood, behavior, and social connection---but avoid being intrusive in a way that feels controlling.
        </p>

        <h2 id="treatment-for-teens" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment Options for Teen Depression
        </h2>
        <p className="mb-6">
          Evidence-based treatments for adolescent depression include <Citation id="5" index={5} source="Journal of the American Academy of Child & Adolescent Psychiatry" year="2020" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'therapy',
              label: 'Therapy',
              content: (
                <div>
                  <h4 className="font-semibold text-lg mb-3">Therapy Approaches for Teens</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Cognitive-Behavioral Therapy (CBT):</strong> Teaches teens to identify and challenge negative thought patterns. It's structured, time-limited (12-16 sessions), and has strong evidence for treating teen depression.</li>
                    <li><strong>Interpersonal Therapy for Adolescents (IPT-A):</strong> Focuses on relationship problems, grief, role transitions (like starting high school or parents' divorce), and interpersonal conflicts that contribute to depression.</li>
                    <li><strong>Dialectical Behavior Therapy (DBT):</strong> Particularly helpful for teens with self-harm behaviors or intense emotional dysregulation. Teaches distress tolerance and emotion regulation skills.</li>
                    <li><strong>Family therapy:</strong> Involves parents and siblings to improve communication, reduce conflict, and create a more supportive home environment. Depression doesn't exist in a vacuum—it affects and is affected by family dynamics.</li>
                  </ul>
                  <p className="mt-4">
                    Most teens benefit from weekly therapy sessions for 3-6 months, with ongoing check-ins after that.
                  </p>
                </div>
              ),
            },
            {
              id: 'medication',
              label: 'Medication',
              content: (
                <div>
                  <h4 className="font-semibold text-lg mb-3">When Medication Is Recommended</h4>
                  <p className="mb-3">
                    Medication is typically considered for moderate to severe depression, especially when:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Therapy alone hasn't been sufficient</li>
                    <li>Symptoms are severe enough to interfere with daily functioning</li>
                    <li>The teen is at risk for self-harm or suicide</li>
                    <li>There's a family history of depression that responded well to medication</li>
                  </ul>
                  <h4 className="font-semibold text-lg mb-3">FDA-Approved Options</h4>
                  <p className="mb-3">
                    SSRIs (selective serotonin reuptake inhibitors) are first-line medications for teen depression:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Fluoxetine (Prozac):</strong> FDA-approved for ages 8 and up</li>
                    <li><strong>Escitalopram (Lexapro):</strong> FDA-approved for ages 12 and up</li>
                    <li><strong>Sertraline (Zoloft):</strong> Commonly prescribed off-label for teens</li>
                  </ul>
                  <p className="mt-4">
                    <strong>Important:</strong> The FDA requires a "black box warning" on antidepressants for youth about increased risk of suicidal thinking early in treatment. This requires close monitoring but doesn't mean medication should be avoided—untreated depression carries far greater risk.
                  </p>
                </div>
              ),
            },
            {
              id: 'school-support',
              label: 'School Support',
              content: (
                <div>
                  <h4 className="font-semibold text-lg mb-3">Academic Accommodations</h4>
                  <p className="mb-3">
                    Teens with depression may qualify for academic accommodations under Section 504 or an IEP (Individualized Education Program). These might include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Extended time on tests and assignments</li>
                    <li>Reduced course load or modified schedule</li>
                    <li>Excused absences for therapy appointments</li>
                    <li>Access to a quiet space during the day if overwhelmed</li>
                    <li>Modified grading during acute depressive episodes</li>
                  </ul>
                  <h4 className="font-semibold text-lg mb-3">School-Based Mental Health Services</h4>
                  <p className="mb-3">
                    Many schools offer on-site counseling, peer support groups, and mental health education programs <Citation id="6" index={6} source="American Psychologist" year="2019" tier={1} />. These reduce barriers to access and normalize help-seeking.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="what-schools-can-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Teachers and Schools Can Do
        </h2>
        <p className="mb-6">
          Educators often notice warning signs before parents do. If you're concerned about a student:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Report concerns to the school counselor or psychologist</li>
          <li>Reach out to the student privately: "I've noticed you seem different lately. Are you okay?"</li>
          <li>Don't try to diagnose---just listen and connect them with resources</li>
          <li>Know your school's protocol for mental health crises</li>
        </ul>
      </>
    ),
  },

  {
    id: catId(54),
    slug: 'depression-college-students-crisis-campus',
    title: 'Depression in College Students: The Crisis on Campus',
    description: 'College mental health is in crisis. Learn why depression rates are rising among students and what colleges, parents, and students can do about it.',
    image: "/images/articles/cat07/cover-054.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['College', 'Depression', 'Mental Health', 'Students'],
    summary: 'College depression rates have reached crisis levels, with 39% of students reporting symptoms annually. The combination of academic pressure, social isolation, financial stress, and inadequate mental health infrastructure creates a perfect storm for depression among emerging adults.',
    keyFacts: [
      { text: '39% of college students experience depression symptoms annually, but only 20% seek treatment', citationIndex: 1 },
      { text: 'Academic pressure and perfectionism create chronic stress and performance anxiety in college students', citationIndex: 3 },
      { text: 'First-generation college students face higher depression risk due to unique stressors and lack of family guidance', citationIndex: 6 },
      { text: 'Campus counseling centers are severely understaffed, with long waitlists preventing timely access to care', citationIndex: 5 },
      { text: 'Students with depression have lower GPAs and higher dropout rates than their peers', citationIndex: 2 },
    ],
    sparkMoment: 'College depression isn\'t a personal failure—it\'s a systemic crisis that requires institutional change and compassionate individual support.',
    practicalExercise: {
      title: 'Self-Care Check for College Students',
      steps: [
        { title: 'Assess Your Basics', description: 'Rate yourself 1-10 on: sleep quality, nutrition, exercise, and social connection this week. Any below 5? Start there.' },
        { title: 'Identify One Stressor', description: 'What\'s draining you most right now? Academic pressure? Loneliness? Financial worry? Name it specifically.' },
        { title: 'Make One Small Change', description: 'Pick ONE thing you can do this week: set a bedtime, reach out to a friend, go to office hours, or call the counseling center.' },
        { title: 'Tell Someone', description: 'Text a friend, call a family member, or schedule an appointment with student health. You don\'t have to do this alone.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Try the Mood Journal',
    },
    citations: [
      {
        id: '1',
        text: 'Mental health among college students: National survey 2020',
        source: 'Journal of American College Health',
        year: '2021',
        link: 'https://doi.org/10.1080/07448481.2021.1920979',
        tier: 1,
      },
      {
        id: '2',
        text: 'Depression in college: Prevalence and treatment utilization',
        source: 'Psychiatric Services',
        year: '2019',
        link: 'https://doi.org/10.1176/appi.ps.201800332',
        tier: 1,
      },
      {
        id: '3',
        text: 'Academic pressure and mental health in higher education',
        source: 'Anxiety, Stress, & Coping',
        year: '2020',
        link: 'https://doi.org/10.1080/10615806.2020.1746286',
        tier: 1,
      },
      {
        id: '4',
        text: 'Social isolation and loneliness in college students',
        source: 'Journal of Adolescent Health',
        year: '2019',
        link: 'https://doi.org/10.1016/j.jadohealth.2019.03.009',
        tier: 1,
      },
      {
        id: '5',
        text: 'Campus mental health services: Capacity and challenges',
        source: 'Journal of College Student Psychotherapy',
        year: '2020',
        link: 'https://doi.org/10.1080/87568225.2020.1723694',
        tier: 1,
      },
      {
        id: '6',
        text: 'First-generation college students and mental health',
        source: 'Cultural Diversity and Ethnic Minority Psychology',
        year: '2019',
        link: 'https://doi.org/10.1037/cdp0000239',
        tier: 1,
      },
      {
        id: '7',
        text: 'Supporting college students with depression: Best practices',
        source: 'Active Minds',
        year: '2021',
        link: 'https://www.activeminds.org/college-depression',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            College is supposed to be the best years of your life. So why are so many students struggling? Depression among college students has reached crisis levels, with nearly 40% of undergraduates reporting symptoms in the past year. The combination of academic pressure, social transition, financial stress, and isolation has created a mental health emergency on campuses across the country.
          </p>
          <p className="mb-6">
            This article explores why depression is so prevalent among college students and what can be done to address it <Citation id="1" index={1} source="Journal of American College Health" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="the-scale-of-the-problem" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Scale of the Problem
        </h2>
        <p className="mb-6">
          National surveys paint a troubling picture:
        </p>

        <StatCard
          stats={[
            { value: 39, suffix: '%', label: 'College students experiencing depression symptoms' },
            { value: 20, suffix: '%', label: 'Students seeking treatment (huge unmet need)' },
            { value: 2, suffix: 'x', label: 'Increase in depression rates over past decade' },
          ]}
          source="Journal of American College Health, 2021"
        />

        <p className="mb-6 mt-6">
          Depression isn't just common---it's disruptive. Students with depression have lower GPAs, higher dropout rates, and increased risk of substance use and suicide <Citation id="2" index={2} source="Psychiatric Services" year="2019" tier={1} />.
        </p>

        <h2 id="why-college-students-are-vulnerable" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why College Students Are Particularly Vulnerable
        </h2>
        <p className="mb-6">
          College coincides with a high-risk developmental period (late adolescence/early adulthood) and introduces unique stressors:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Academic Pressure and Perfectionism
        </h3>
        <p className="mb-6">
          The pressure to excel academically, secure internships, and build a perfect résumé creates chronic stress. Many students operate in a state of constant performance anxiety <Citation id="3" index={3} source="Anxiety, Stress, & Coping" year="2020" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Social Transition and Loneliness
        </h3>
        <p className="mb-6">
          Leaving home, building a new social network, and navigating complex social hierarchies can be isolating. Despite being surrounded by peers, many students feel profoundly lonely <Citation id="4" index={4} source="Journal of Adolescent Health" year="2019" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Financial Stress
        </h3>
        <p className="mb-6">
          Student loan debt, working while studying, and worrying about post-graduation employment create significant financial anxiety.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Identity Exploration and Uncertainty
        </h3>
        <p className="mb-6">
          College is a time of figuring out who you are, what you want, and where you belong. This exploration is healthy but also destabilizing.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Increased Independence Without Support
        </h3>
        <p className="mb-6">
          Students are expected to manage their own health, schedules, and responsibilities---often without the support structures they had at home.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          6. Substance Use and Sleep Deprivation
        </h3>
        <p className="mb-6">
          Campus culture often normalizes excessive drinking, drug use, and all-nighters---all of which worsen mental health.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            College depression isn't caused by weakness or inability to handle stress. It's the result of a perfect storm of developmental vulnerability, systemic pressures, and inadequate mental health infrastructure.
          </p>
        </ArticleCallout>

        <h2 id="high-risk-groups" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Groups at Higher Risk
        </h2>
        <p className="mb-6">
          While any student can develop depression, certain groups face disproportionate risk:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>First-generation college students:</strong> Navigating an unfamiliar system without family guidance creates additional stress <Citation id="6" index={6} source="Cultural Diversity and Ethnic Minority Psychology" year="2019" tier={1} /></li>
          <li><strong>LGBTQ+ students:</strong> Face discrimination, rejection, and minority stress</li>
          <li><strong>Students of color:</strong> Experience racism, microaggressions, and underrepresentation</li>
          <li><strong>Graduate students:</strong> Unique pressures from advisor relationships, funding insecurity, and career uncertainty</li>
          <li><strong>International students:</strong> Cultural adjustment, visa stress, distance from support networks</li>
          <li><strong>Students with prior mental health history:</strong> College can trigger relapse</li>
        </ul>

        <h2 id="warning-signs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Warning Signs in College Students
        </h2>
        <p className="mb-6">
          Depression in college students may look like:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Skipping classes, falling behind academically</li>
          <li>Withdrawing from friends, clubs, or activities</li>
          <li>Sleeping excessively or staying in bed most of the day</li>
          <li>Increased substance use (alcohol, marijuana, stimulants)</li>
          <li>Irritability, anger, or emotional numbness</li>
          <li>Expressing hopelessness about the future</li>
          <li>Talking about dropping out or giving up</li>
          <li>Self-harm or suicidal ideation</li>
        </ul>

        <h2 id="barriers-to-treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Students Don't Seek Help
        </h2>
        <p className="mb-6">
          Despite high rates of depression, most students don't access treatment <Citation id="5" index={5} source="Journal of College Student Psychotherapy" year="2020" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Stigma:</strong> Fear of being seen as weak or broken</li>
          <li><strong>Limited campus resources:</strong> Long waitlists, session caps, understaffed counseling centers</li>
          <li><strong>Cost:</strong> Off-campus therapy is expensive if insurance doesn't cover it</li>
          <li><strong>Lack of awareness:</strong> Not recognizing symptoms as depression</li>
          <li><strong>Time constraints:</strong> Counseling feels like one more thing to fit into an overscheduled life</li>
        </ul>

        <HighlightBox variant="emphasis">
          <p>
            <strong>If you're reading this and recognizing yourself:</strong> You are not alone. Nearly 4 in 10 college students are experiencing what you're experiencing. Depression doesn't mean you're failing at college—it means you need support, and that support exists.
          </p>
        </HighlightBox>

        <h2 id="what-students-can-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Students Can Do
        </h2>
        <p className="mb-6">
          If you're struggling with depression in college, here's a roadmap for getting help:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Recognize the Signs',
              description: (
                <p>
                  Depression isn't just sadness. If you're sleeping all day, skipping classes, withdrawing from friends, using substances to cope, or feeling hopeless—these are signs worth taking seriously.
                </p>
              ),
            },
            {
              title: 'Reach Out for Help',
              description: (
                <div>
                  <p className="mb-2"><strong>On-campus resources:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Campus counseling center (usually free or low-cost)</li>
                    <li>Student health services</li>
                    <li>Resident advisors or academic advisors</li>
                    <li>Campus ministry or chaplain services</li>
                  </ul>
                  <p className="mt-3 mb-2"><strong>Off-campus resources:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>988 Suicide & Crisis Lifeline (call or text)</li>
                    <li>Crisis Text Line (text HOME to 741741)</li>
                    <li>NAMI HelpLine: 1-800-950-NAMI</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Build Your Support Network',
              description: (
                <p>
                  Tell someone what you're going through—a roommate, a friend from home, a family member. Isolation makes depression worse. Even if you don't feel like socializing, maintain at least one meaningful connection.
                </p>
              ),
            },
            {
              title: 'Take Care of the Basics',
              description: (
                <p>
                  When depressed, everything feels hard. Focus on the fundamentals: 7-8 hours of sleep, eating regular meals (even if it's just cereal), and moving your body for 10 minutes a day. These aren't cures, but they create a foundation for recovery.
                </p>
              ),
            },
            {
              title: 'Get Academic Support',
              description: (
                <p>
                  Talk to your dean of students or disability services office about accommodations: extensions, reduced course load, incomplete grades, or medical leave if needed. Your mental health is more important than a semester's GPA.
                </p>
              ),
            },
            {
              title: 'Engage in Treatment',
              description: (
                <p>
                  Whether it's weekly therapy, medication, or both—give treatment a real try. It takes 4-6 weeks to see results. Stick with it even when it feels like nothing is working. Recovery isn't linear, but it is possible.
                </p>
              ),
            },
          ]}
        />

        <h2 id="what-colleges-can-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Colleges and Universities Can Do
        </h2>
        <p className="mb-6">
          Institutions have a responsibility to address this crisis <Citation id="7" index={7} source="Active Minds" year="2021" tier={3} />. Individual student resilience is important, but systemic change is essential:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Increase Access to Care
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Hire more counselors:</strong> The recommended ratio is 1 counselor per 1,000-1,500 students. Many schools are at 1:2,000 or worse. This is a funding choice.</li>
          <li><strong>Eliminate session caps:</strong> Limiting students to 6-8 sessions per semester forces them off services just when they're starting to improve.</li>
          <li><strong>Provide crisis services:</strong> 24/7 hotlines, walk-in crisis appointments, and psychiatric emergency protocols.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Normalize Help-Seeking
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Campus-wide campaigns:</strong> Mental health awareness weeks, peer education programs, faculty who openly discuss mental health.</li>
          <li><strong>Train faculty and staff:</strong> Equip professors, RAs, and advisors to recognize warning signs and make warm referrals (not just handing out a phone number).</li>
          <li><strong>Peer support programs:</strong> Student-led groups like Active Minds chapters reduce stigma and create community.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Address Root Causes
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Reduce academic pressure:</strong> Reconsider grade deflation policies, excessive workloads, and cultures of constant competition. Mental health can't be a priority if the institution rewards burnout.</li>
          <li><strong>Improve financial support:</strong> Increase need-based aid, emergency funds for students in crisis, and work-study limits that don't force students to choose between paying rent and attending class.</li>
          <li><strong>Create inclusive environments:</strong> Address racism, homophobia, and discrimination that disproportionately harm students of color and LGBTQ+ students.</li>
        </ul>

        <HighlightBox variant="stat">
          <p>
            <strong>The math doesn't lie:</strong> If 39% of students are depressed and only 20% seek treatment, that's a 19-percentage-point gap—representing hundreds of thousands of students nationwide who are suffering without support. This isn't a student problem. It's an infrastructure problem.
          </p>
        </HighlightBox>

        <h2 id="parents-role" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Parents Can Support College Students
        </h2>
        <p className="mb-6">
          Stay connected without being intrusive:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Check in regularly (texts, calls) to ask how they're doing</li>
          <li>Notice changes in mood, communication patterns, or grades</li>
          <li>Normalize mental health: "It's okay to struggle. Let's get you help."</li>
          <li>Help them connect with campus or off-campus resources</li>
          <li>Don't add pressure about grades or career---mental health is the priority</li>
        </ul>
      </>
    ),
  },

  {
    id: catId(55),
    slug: 'depression-older-adults-mistaken-for-aging',
    title: 'Depression in Older Adults: Why It Often Gets Mistaken for Aging',
    description: 'Depression in older adults is common but often overlooked, dismissed as "just part of getting old." Learn how to recognize and address it.',
    image: "/images/articles/cat07/cover-055.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Depression', 'Older Adults', 'Aging', 'Mental Health'],
    summary: 'Depression in older adults is chronically underdiagnosed, dismissed as "normal aging" despite affecting 10-15% of community-dwelling seniors and up to 40% of nursing home residents. Late-life depression presents differently—with physical complaints and apathy rather than sadness—and is highly treatable when recognized.',
    keyFacts: [
      { text: '70% of older adults with depression go untreated due to underdiagnosis and ageist assumptions', citationIndex: 2 },
      { text: 'Older adults are more likely to present with physical complaints and apathy rather than emotional symptoms', citationIndex: 3 },
      { text: 'Depression can mimic dementia (pseudodementia), causing memory problems that are reversible with treatment', citationIndex: 3 },
      { text: 'Social isolation is a major risk factor for late-life depression, affecting those living alone or with limited mobility', citationIndex: 4 },
      { text: 'Depression is highly treatable in older adults with therapy, medication, and social interventions', citationIndex: 5 },
    ],
    sparkMoment: 'Depression is never "just part of getting old"—it\'s a treatable medical condition that deserves the same urgency at 75 as it does at 25.',
    practicalExercise: {
      title: 'Supporting an Older Loved One',
      steps: [
        { title: 'Notice Changes', description: 'Has their personality, mood, or daily functioning changed? Note specific examples: more withdrawn, stopped hobbies, neglecting hygiene, expressing hopelessness.' },
        { title: 'Start the Conversation', description: 'Say: "I\'ve noticed you seem different lately. How are you really doing?" Listen without dismissing their feelings as "normal" for their age.' },
        { title: 'Accompany to Appointments', description: 'Older adults may downplay symptoms to doctors. Go with them to their next medical appointment and mention your concerns directly to the provider.' },
        { title: 'Reduce Isolation', description: 'Increase contact: regular calls, visits, arranging social activities (senior centers, religious communities), or connecting them with peer support.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Try the Mood Journal',
    },
    citations: [
      {
        id: '1',
        text: 'Depression in older adults: Epidemiology and clinical features',
        source: 'The Lancet',
        year: '2018',
        link: 'https://doi.org/10.1016/S0140-6736(18)31948-9',
        tier: 1,
      },
      {
        id: '2',
        text: 'Late-life depression: Diagnosis and treatment challenges',
        source: 'American Journal of Geriatric Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jagp.2020.02.005',
        tier: 1,
      },
      {
        id: '3',
        text: 'Cognitive impairment and depression in older adults: Differential diagnosis',
        source: 'JAMA Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1001/jamapsychiatry.2019.1740',
        tier: 1,
      },
      {
        id: '4',
        text: 'Social isolation and depression in the elderly',
        source: 'Aging & Mental Health',
        year: '2019',
        link: 'https://doi.org/10.1080/13607863.2019.1571019',
        tier: 1,
      },
      {
        id: '5',
        text: 'Treatment of depression in older adults: Evidence review',
        source: 'Cochrane Database of Systematic Reviews',
        year: '2020',
        link: 'https://doi.org/10.1002/14651858.CD004853.pub3',
        tier: 1,
      },
      {
        id: '6',
        text: 'Medical comorbidity and late-life depression',
        source: 'Journal of Clinical Psychiatry',
        year: '2018',
        link: 'https://doi.org/10.4088/JCP.18r12359',
        tier: 1,
      },
      {
        id: '7',
        text: 'Depression in older adults: A guide for families',
        source: 'National Institute on Aging',
        year: '2021',
        link: 'https://www.nia.nih.gov/health/depression-and-older-adults',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            "They're just slowing down.", "It's natural to be sad at their age.", "Memory problems are part of getting old." These assumptions lead to a tragic outcome: depression in older adults is chronically underdiagnosed and undertreated. The result is unnecessary suffering, functional decline, and increased risk of medical complications and death.
          </p>
          <p className="mb-6">
            Depression is not a normal part of aging. It's a medical condition that deserves recognition and treatment---but it often looks different in older adults, which is why it's so often missed <Citation id="1" index={1} source="The Lancet" year="2018" tier={1} />.
          </p>
        </div>

        <h2 id="how-common" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Common Is Depression in Older Adults?
        </h2>
        <p className="mb-6">
          While major depressive disorder is slightly less common in older adults than in younger populations, clinically significant depressive symptoms affect 10--15% of community-dwelling older adults and up to 30--40% of those in nursing homes or hospitals <Citation id="2" index={2} source="American Journal of Geriatric Psychiatry" year="2020" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 15, suffix: '%', label: 'Community-dwelling older adults with depression' },
            { value: 40, suffix: '%', label: 'Nursing home residents with depression' },
            { value: 70, suffix: '%', label: 'Of older adults with depression go untreated' },
          ]}
          source="American Journal of Geriatric Psychiatry, 2020"
        />

        <h2 id="why-its-overlooked" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Depression in Older Adults Is Overlooked
        </h2>
        <p className="mb-6">
          Several factors contribute to underdiagnosis:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Ageist Assumptions
        </h3>
        <p className="mb-6">
          Many people---including healthcare providers---assume that sadness, withdrawal, or loss of interest are "normal" for older adults. This is false. Aging does not cause depression.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Different Symptom Presentation
        </h3>
        <p className="mb-6">
          Older adults are less likely to report sadness and more likely to present with physical complaints, memory problems, or apathy---symptoms easily attributed to aging or medical illness <Citation id="3" index={3} source="JAMA Psychiatry" year="2019" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Overlap with Medical Conditions
        </h3>
        <p className="mb-6">
          Chronic pain, fatigue, and cognitive decline can be symptoms of both depression and medical illness, making it hard to distinguish between the two <Citation id="6" index={6} source="Journal of Clinical Psychiatry" year="2018" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Reluctance to Report Symptoms
        </h3>
        <p className="mb-6">
          Older adults grew up in an era with greater stigma around mental health. They may minimize symptoms or not recognize them as depression.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            <strong>Critical point:</strong> If an older adult's personality, mood, or functioning has changed---even if the changes seem "age-appropriate"---consider depression as a possible cause. Don't assume it's "just aging."
          </p>
        </ArticleCallout>

        <h2 id="how-depression-presents-differently" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Depression Presents Differently in Older Adults
        </h2>
        <p className="mb-6">
          Older adults with depression are more likely to show:
        </p>

        <ComparisonTable
          title="Depression Symptoms: Younger vs. Older Adults"
          columns={['Common in Younger Adults', 'More Common in Older Adults']}
          items={[
            { feature: 'Mood', values: ['Sadness, crying', 'Apathy, emotional numbness'] },
            { feature: 'Complaints', values: ['Emotional distress', 'Physical complaints (pain, fatigue, GI issues)'] },
            { feature: 'Cognitive symptoms', values: ['Less prominent', 'Memory problems, confusion (can mimic dementia)'] },
            { feature: 'Behavior', values: ['Withdrawal, reduced activity', 'Withdrawal, self-neglect'] },
            { feature: 'Anxiety', values: ['May be present', 'Often prominent (worry, agitation)'] },
          ]}
          highlightColumn={1}
        />

        <ArticleCallout variant="warning">
          <p>
            <strong>"Pseudodementia":</strong> Severe depression in older adults can cause memory and concentration problems that look like dementia. This is treatable---unlike neurodegenerative dementia. Always screen for depression when cognitive decline appears <Citation id="3" index={3} source="JAMA Psychiatry" year="2019" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="warning-signs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Warning Signs of Depression in Older Adults
        </h2>
        <p className="mb-6">
          Look for these patterns:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Persistent sadness, emptiness, or loss of interest in activities</li>
          <li>Withdrawal from social activities, hobbies, or family</li>
          <li>Increased physical complaints (headaches, body pain, digestive issues)</li>
          <li>Fatigue or loss of energy</li>
          <li>Changes in appetite or weight</li>
          <li>Sleep disturbances (insomnia or sleeping excessively)</li>
          <li>Memory problems or confusion</li>
          <li>Slowed movement or speech</li>
          <li>Neglecting personal care (hygiene, medications, home maintenance)</li>
          <li>Expressing hopelessness or talking about death</li>
        </ul>

        <h2 id="risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Risk Factors for Late-Life Depression
        </h2>
        <p className="mb-6">
          Older adults face unique stressors that increase depression risk:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Chronic illness:</strong> Heart disease, stroke, diabetes, cancer, chronic pain</li>
          <li><strong>Functional limitations:</strong> Difficulty with daily activities (bathing, cooking, mobility)</li>
          <li><strong>Loss and bereavement:</strong> Death of spouse, siblings, or friends</li>
          <li><strong>Social isolation:</strong> Living alone, limited mobility, loss of social roles <Citation id="4" index={4} source="Aging & Mental Health" year="2019" tier={1} /></li>
          <li><strong>Cognitive decline:</strong> Early dementia or awareness of memory loss</li>
          <li><strong>Medications:</strong> Some medications (beta-blockers, corticosteroids) can trigger depression</li>
          <li><strong>History of depression:</strong> Prior episodes increase risk of recurrence</li>
        </ul>

        <QuoteBlock
          quote="We don't say 'chest pain is a normal part of aging' and ignore heart disease. So why do we dismiss depression in older adults as inevitable? Depression at any age is a medical condition that requires—and responds to—treatment."
          attribution="Dr. Margaret Chen"
          role="Geriatric Psychiatrist"
          variant="large"
        />

        <h2 id="the-cost-of-missed-diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Cost of Missed Diagnosis
        </h2>
        <p className="mb-6">
          When depression in older adults goes untreated, the consequences are severe:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Worsening physical health:</strong> Depression accelerates cognitive decline, increases risk of heart attack and stroke, and worsens outcomes for chronic conditions like diabetes and cancer</li>
          <li><strong>Functional decline:</strong> Depressed older adults are less likely to take medications, eat properly, or engage in physical therapy—leading to faster physical deterioration</li>
          <li><strong>Increased mortality:</strong> Late-life depression is associated with higher death rates, both from medical complications and suicide</li>
          <li><strong>Family caregiver burden:</strong> Depression makes caregiving harder and more stressful for family members</li>
          <li><strong>Loss of quality of life:</strong> The final years of life, which could be meaningful and fulfilling, are instead marked by suffering</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>
            <strong>Suicide risk in older adults:</strong> Older white men have the highest suicide rate of any demographic group in the U.S. Unlike younger people, older adults who attempt suicide are more likely to die—they use more lethal means and are less likely to survive. Every expression of hopelessness or talk of death should be taken seriously.
          </p>
        </ArticleCallout>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment for Depression in Older Adults
        </h2>
        <p className="mb-6">
          Depression in older adults is highly treatable <Citation id="5" index={5} source="Cochrane Database of Systematic Reviews" year="2020" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'therapy',
              title: 'Psychotherapy for Older Adults',
              content: (
                <div>
                  <p className="mb-3">
                    Therapy is effective for late-life depression and doesn't have the side effect risks of medication:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Cognitive-Behavioral Therapy (CBT):</strong> Adapted for older adults, CBT helps identify and challenge negative thought patterns about aging, loss, and mortality. It's structured and time-limited.</li>
                    <li><strong>Problem-Solving Therapy (PST):</strong> Particularly helpful for older adults facing practical challenges (managing chronic illness, adjusting to retirement, coping with mobility limitations).</li>
                    <li><strong>Interpersonal Therapy (IPT):</strong> Focuses on grief (common in late life), role transitions (retirement, moving to assisted living), and relationship conflicts.</li>
                    <li><strong>Life Review Therapy:</strong> Helps older adults reflect on their life story, find meaning, and resolve unfinished business.</li>
                  </ul>
                  <p className="mt-3">
                    Many therapists offer home visits or telehealth sessions to accommodate mobility limitations.
                  </p>
                </div>
              ),
            },
            {
              id: 'medication',
              title: 'Medication Considerations',
              content: (
                <div>
                  <p className="mb-3">
                    Antidepressants are effective in older adults but require careful prescribing:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-3">
                    <li><strong>SSRIs (sertraline, citalopram, escitalopram):</strong> First-line treatment. Lower risk of cardiac side effects than older antidepressants.</li>
                    <li><strong>"Start low, go slow":</strong> Older adults are more sensitive to side effects and drug interactions. Doses are typically half of what's prescribed to younger adults, increased gradually.</li>
                    <li><strong>Drug interactions:</strong> Many older adults take multiple medications. A thorough medication review is essential to avoid dangerous interactions.</li>
                    <li><strong>Side effects to watch:</strong> Falls risk (due to dizziness), low sodium levels (especially with SSRIs), bleeding risk if on blood thinners.</li>
                  </ul>
                  <p>
                    It takes 4-6 weeks to see full benefit. Medication should be continued for at least 6-12 months after symptoms improve to prevent relapse.
                  </p>
                </div>
              ),
            },
            {
              id: 'medical',
              title: 'Addressing Medical Contributors',
              content: (
                <div>
                  <p className="mb-3">
                    Depression often coexists with medical conditions <Citation id="6" index={6} source="Journal of Clinical Psychiatry" year="2018" tier={1} />:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Treat pain:</strong> Chronic pain is both a symptom and a cause of depression. Effective pain management often improves mood.</li>
                    <li><strong>Screen for thyroid dysfunction:</strong> Hypothyroidism can cause depression-like symptoms.</li>
                    <li><strong>Review medications:</strong> Beta-blockers, corticosteroids, benzodiazepines, and some blood pressure medications can trigger depression.</li>
                    <li><strong>Address sleep apnea:</strong> Common in older adults and contributes to depression and cognitive problems.</li>
                    <li><strong>Optimize nutrition:</strong> B12 deficiency and malnutrition worsen depression.</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'social',
              title: 'Social Interventions',
              content: (
                <div>
                  <p className="mb-3">
                    Reducing isolation is critical <Citation id="4" index={4} source="Aging & Mental Health" year="2019" tier={1} />:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Senior centers:</strong> Offer social activities, meals, exercise classes, and peer connection</li>
                    <li><strong>Volunteer programs:</strong> Give purpose and structure to the day (RSVP, SCORE, tutoring)</li>
                    <li><strong>Religious/spiritual communities:</strong> Provide social support and meaning</li>
                    <li><strong>Intergenerational programs:</strong> Connecting with younger people (grandchildren, mentoring) combats loneliness</li>
                    <li><strong>Technology for connection:</strong> Video calls, social media, online communities for homebound seniors</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'ect',
              title: 'Electroconvulsive Therapy (ECT)',
              content: (
                <div>
                  <p className="mb-3">
                    For severe, treatment-resistant depression—especially with psychotic features or active suicidality—ECT is highly effective and safe in older adults.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Response rates of 60-90% in late-life depression</li>
                    <li>Faster onset than medication (works within 2-4 weeks)</li>
                    <li>Modern ECT uses anesthesia and muscle relaxants—it's not like the outdated images from movies</li>
                    <li>Main side effect is temporary memory problems, which typically resolve</li>
                  </ul>
                  <p className="mt-3">
                    ECT is particularly valuable when rapid improvement is needed or when medication hasn't worked.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="supporting-older-adults" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Family Members Can Help
        </h2>
        <p className="mb-6">
          If you're concerned about an older loved one <Citation id="7" index={7} source="National Institute on Aging" year="2021" tier={2} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Don't dismiss symptoms:</strong> "It's not just aging. Let's talk to your doctor."</li>
          <li><strong>Accompany them to appointments:</strong> Older adults may downplay symptoms to doctors</li>
          <li><strong>Monitor medication adherence:</strong> Ensure they're taking antidepressants as prescribed</li>
          <li><strong>Reduce isolation:</strong> Regular visits, phone calls, or arranging social activities</li>
          <li><strong>Watch for suicide risk:</strong> Older white men have the highest suicide rate of any demographic</li>
        </ul>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If an older adult shows persistent sadness, withdrawal, or functional decline for more than two weeks, schedule an appointment with their primary care doctor or a geriatric psychiatrist.
        </p>
        <p className="mb-6">
          <strong>If they express thoughts of suicide or death,</strong> call or text 988 (Suicide & Crisis Lifeline) or take them to the nearest emergency room. Late-life depression is treatable, and recovery is possible at any age.
        </p>
      </>
    ),
  },
];
