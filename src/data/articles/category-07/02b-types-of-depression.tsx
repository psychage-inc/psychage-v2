 
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

export const typesOfDepressionArticlesB: Article[] = [
  {
    id: catId(16),
    slug: 'atypical-depression-subtype',
    title: "Atypical Depression: The Subtype That Doesn't Look Like Depression",
    description: "Atypical depression involves mood reactivity, increased appetite, hypersomnia, and rejection sensitivity. Learn symptoms, why it's called atypical, and treatment.",
    image: "/images/articles/cat07/cover-016.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Atypical Depression', 'Mood Reactivity', 'Rejection Sensitivity', 'Depression Subtypes'],
    summary: 'Atypical depression challenges our understanding of what depression "should" look like—featuring mood reactivity, increased sleep and appetite, leaden paralysis, and extreme rejection sensitivity. Despite affecting up to 40% of people with depression, it often goes unrecognized because it doesn\'t match the classic presentation.',
    keyFacts: [
      { text: '15-40% of people with depression have atypical features, making it far from rare despite the misleading name', citationIndex: 8 },
      { text: 'Mood reactivity—the ability to temporarily feel better in response to positive events—is the defining feature that distinguishes it from melancholic depression', citationIndex: 2 },
      { text: 'People with atypical depression are twice as likely to have bipolar disorder, with 50% of bipolar depression showing atypical features', citationIndex: 5 },
      { text: 'MAOIs show superior response rates for atypical depression compared to SSRIs in research studies, though they require dietary restrictions', citationIndex: 7 },
      { text: 'Rejection sensitivity in atypical depression is a long-standing trait that predates depression and causes significant relationship impairment', citationIndex: 3 },
    ],
    sparkMoment: 'Your depression is valid even when you can laugh at a joke or enjoy a meal—those brief windows of light don\'t erase the darkness you\'re navigating.',
    practicalExercise: {
      title: 'Rejection Sensitivity Reality Check',
      steps: [
        { title: 'Notice the trigger', description: 'When you feel rejected, pause and identify the specific behavior that triggered the feeling (unanswered text, cancelled plans, brief response).' },
        { title: 'Generate alternatives', description: 'List 3 non-rejection explanations for the behavior (they\'re busy, phone died, distracted, bad day at work).' },
        { title: 'Check the evidence', description: 'What facts support rejection vs. alternative explanations? Has this person shown care for you before?' },
        { title: 'Delay reaction', description: 'Wait 24 hours before acting on the rejection feeling. Often the intensity decreases with time and additional information emerges.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Mood Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'Atypical depression: Clinical features, diagnosis, and treatment',
        source: 'Depression and Anxiety',
        year: '2020',
        link: 'https://doi.org/10.1002/da.23021',
        tier: 1,
      },
      {
        id: '2',
        text: 'DSM-5-TR: Major Depression with Atypical Features',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://www.psychiatry.org/psychiatrists/practice/dsm',
        tier: 4,
      },
      {
        id: '3',
        text: 'Rejection sensitivity and interpersonal functioning in atypical depression',
        source: 'Journal of Affective Disorders',
        year: '2019',
        link: 'https://doi.org/10.1016/j.jad.2019.05.025',
        tier: 1,
      },
      {
        id: '4',
        text: 'Pharmacological treatment of atypical depression: A review',
        source: 'CNS Drugs',
        year: '2021',
        link: 'https://doi.org/10.1007/s40263-021-00815-w',
        tier: 1,
      },
      {
        id: '5',
        text: 'Atypical depression and bipolar disorder: Overlapping features',
        source: 'Bipolar Disorders',
        year: '2020',
        link: 'https://doi.org/10.1111/bdi.12897',
        tier: 1,
      },
      {
        id: '6',
        text: 'Leaden paralysis: The physical symptom of atypical depression',
        source: 'Psychosomatics',
        year: '2018',
        link: 'https://doi.org/10.1016/j.psym.2018.04.008',
        tier: 1,
      },
      {
        id: '7',
        text: 'MAOIs in treatment of atypical depression: Evidence review',
        source: 'Journal of Clinical Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.4088/JCP.18r12601',
        tier: 1,
      },
      {
        id: '8',
        text: 'Prevalence and clinical correlates of atypical features',
        source: 'American Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1176/appi.ajp.2019.19050539',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            When most people think of depression, they picture insomnia, loss of appetite, and unrelenting sadness. But some people with depression sleep excessively, crave carbs and gain weight, and can briefly feel better when something good happens---only to crash back down when the positive moment passes. This is atypical depression, and despite the name, it's actually quite common.
          </p>
          <p className="mb-6">
            "Atypical depression" is a specifier for major depressive disorder characterized by mood reactivity (mood brightens in response to positive events) plus specific features like increased appetite, hypersomnia, leaden paralysis, and rejection sensitivity <Citation id="2" index={2} source="American Psychiatric Association" year="2022" tier={4} />. It's called "atypical" because it doesn't match the classic melancholic presentation---but it affects 15-40% of people with depression, making it far from rare <Citation id="8" index={8} source="American Journal of Psychiatry" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="criteria" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Diagnostic Criteria
        </h2>

        <ArticleCallout variant="clinical-note" title="DSM-5-TR Criteria for Atypical Features">
          <p className="mb-4"><strong>A. Mood Reactivity (required):</strong></p>
          <p className="mb-4">Mood brightens in response to actual or potential positive events. Unlike melancholic depression where nothing improves mood, atypical depression shows temporary lifting with good news, enjoyable activities, or positive interactions.</p>
          <p className="mb-4"><strong>B. At least two of the following:</strong></p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Significant weight gain or increase in appetite:</strong> "Comfort eating," especially carbohydrate cravings</li>
            <li><strong>Hypersomnia:</strong> Sleeping excessively (10+ hours), difficulty staying awake, needing naps</li>
            <li><strong>Leaden paralysis:</strong> Heavy, weighted-down feeling in arms or legs that's disabling</li>
            <li><strong>Interpersonal rejection sensitivity:</strong> Long-standing pattern of extreme sensitivity to perceived rejection causing significant impairment in relationships or functioning</li>
          </ol>
        </ArticleCallout>

        <h2 id="key-features" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding the Core Features
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'mood-reactivity',
              title: 'Mood Reactivity',
              content: (
                <div>
                  <p className="mb-4">The defining feature. Your mood can temporarily improve in response to positive events---a compliment, good news, enjoyable activity. But it doesn't last:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You feel better while watching a funny movie, but the heaviness returns when it ends</li>
                    <li>A friend's visit lifts your spirits, but you crash when they leave</li>
                    <li>Good news at work brightens your day, but by evening you're back down</li>
                  </ul>
                  <p className="mt-4">This differs from melancholic depression, where mood is persistently low regardless of circumstances. But it doesn't mean "not really depressed"---the baseline depression is real, just temporarily responsive.</p>
                </div>
              ),
            },
            {
              id: 'hypersomnia',
              title: 'Hypersomnia',
              content: (
                <div>
                  <p className="mb-4">Excessive sleep---not just wanting to sleep but sleeping 10-14+ hours and still feeling exhausted. Difficulty waking, hitting snooze repeatedly, needing midday naps.</p>
                  <p className="mb-4">This contrasts with insomnia (more common in typical depression). In atypical depression, sleep doesn't refresh---you wake up feeling heavy and unrefreshed no matter how long you slept.</p>
                </div>
              ),
            },
            {
              id: 'appetite',
              title: 'Increased Appetite & Weight Gain',
              content: (
                <div>
                  <p className="mb-4">Significant increase in appetite, especially for carbohydrates (bread, pasta, sweets, comfort foods). "Emotional eating" to soothe mood. Often gain 10-20+ pounds during depressive episodes.</p>
                  <p className="mb-4">This is opposite of typical depression's loss of appetite and weight. The carb cravings may be biological---carbohydrates temporarily boost serotonin, providing brief mood lift.</p>
                </div>
              ),
            },
            {
              id: 'leaden-paralysis',
              title: 'Leaden Paralysis',
              content: (
                <div>
                  <p className="mb-4">A distinctive physical symptom: feeling like your arms and legs are weighted down with lead. Heavy, difficult to move, physically exhausting to do simple tasks <Citation id="6" index={6} source="Psychosomatics" year="2018" tier={1} />.</p>
                  <p className="mb-4">Different from general fatigue---it's a specific sensation of physical heaviness, like gravity is stronger. Can last hours or persist throughout the day.</p>
                </div>
              ),
            },
            {
              id: 'rejection-sensitivity',
              title: 'Interpersonal Rejection Sensitivity',
              content: (
                <div>
                  <p className="mb-4">Long-standing, extreme sensitivity to perceived rejection or criticism <Citation id="3" index={3} source="Journal of Affective Disorders" year="2019" tier={1} />. This is not just feeling hurt---it's:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Hyper-vigilant to signs of rejection in others" behavior</li>
                    <li>Interpreting neutral cues as rejection (they didn't text back---they hate me)</li>
                    <li>Devastating emotional reaction to perceived rejection</li>
                    <li>Avoiding situations/relationships to prevent rejection</li>
                    <li>Significant impairment in work or relationships due to sensitivity</li>
                  </ul>
                  <p>This pattern typically predates the current depressive episode and is a long-standing personality trait, but it worsens during depression.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="vs-typical" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Atypical vs. Typical/Melancholic Depression
        </h2>

        <ComparisonTable
          title="Comparison of Depression Subtypes"
          columns={['Feature', 'Atypical Depression', 'Melancholic Depression']}
          items={[
            { feature: 'Mood reactivity', values: ['Present (temporary brightening)', 'Absent (persistently low)'] },
            { feature: 'Sleep', values: ['Hypersomnia (excess sleep)', 'Insomnia (especially early waking)'] },
            { feature: 'Appetite', values: ['Increased, weight gain', 'Decreased, weight loss'] },
            { feature: 'Energy pattern', values: ['Heavy, leaden feeling', 'Agitation or retardation'] },
            { feature: 'Worst time of day', values: ['Evening often worse', 'Morning often worse'] },
            { feature: 'Interpersonal pattern', values: ['Rejection sensitivity', 'Social withdrawal, less reactivity'] },
            { feature: 'Age of onset', values: ['Often younger (teens/20s)', 'Can occur at any age'] },
            { feature: 'Course', values: ['Earlier onset, more chronic', 'Can be episodic'] },
            { feature: 'Comorbidity', values: ['High anxiety, panic, social phobia', 'Lower anxiety comorbidity'] },
          ]}
          highlightColumn={1}
        />

        <ArticleCallout variant="did-you-know" title="Why 'Atypical' When It's So Common?">
          <p className="mb-4">Despite being called "atypical," this presentation is extremely common, especially in outpatient settings, among women, and in people with earlier-onset depression. Some experts argue the term "atypical" is a misnomer since it's so prevalent <Citation id="1" index={1} source="Depression and Anxiety" year="2020" tier={1} />.</p>
          <p className="mb-4">The term originated in the 1950s-60s when psychiatrists noticed some depressed patients didn't fit the melancholic pattern described in textbooks. At the time, melancholic depression (with insomnia, loss of appetite, and unrelenting sadness) was considered the "typical" presentation.</p>
          <p>Today we understand depression is heterogeneous—there's no single "typical" form. The name stuck even though the features are common, leading to confusion. Some researchers advocate for renaming it "depression with increased neurovegetative symptoms" or simply describing it by its features rather than calling it "atypical."</p>
        </ArticleCallout>

        <h2 id="bipolar-link" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Atypical Features and Bipolar Disorder
        </h2>
        <p className="mb-6">
          Atypical depression features (especially mood reactivity, hypersomnia, rejection sensitivity) are more common in bipolar depression than unipolar depression <Citation id="5" index={5} source="Bipolar Disorders" year="2020" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Of bipolar depression has atypical features' },
            { value: 25, suffix: '%', label: 'Of unipolar depression has atypical features' },
            { value: 2, suffix: '×', label: 'Higher rate in bipolar vs. unipolar' },
          ]}
          source="Bipolar Disorders, 2020"
        />

        <p className="mb-6">
          If you have atypical depression, especially with history of mood swings, family history of bipolar disorder, or early age of onset, screening for bipolar disorder is important. Treatment differs (mood stabilizers preferred, antidepressants used cautiously).
        </p>

        <h2 id="who-gets-it" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Gets Atypical Depression?
        </h2>
        <p className="mb-6">
          Atypical features show specific demographic and clinical patterns that differ from melancholic depression <Citation id="8" index={8} source="American Journal of Psychiatry" year="2020" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li><strong>Gender:</strong> More common in women than men (approximately 2:1 ratio), particularly in younger women</li>
          <li><strong>Age of onset:</strong> Typically begins earlier (teens to early 20s) compared to melancholic depression which can onset at any age</li>
          <li><strong>Course:</strong> Tends to be more chronic and persistent rather than episodic. People with atypical features often have longer duration of illness and more time spent depressed</li>
          <li><strong>Comorbidity:</strong> High rates of co-occurring anxiety disorders (panic disorder, social anxiety, generalized anxiety), PTSD, and substance use disorders</li>
          <li><strong>Personality factors:</strong> Associated with anxious and avoidant personality traits, emotional lability, and interpersonal dependency</li>
          <li><strong>Family history:</strong> Higher rates of family history of mood disorders and anxiety disorders compared to other depression subtypes</li>
        </ul>

        <p className="mb-6">
          The chronic nature and early onset mean many people with atypical depression have lived with these symptoms for years, often since adolescence. They may not realize their experience differs from others' depression or that specific treatments may be more helpful for their symptom pattern.
        </p>

        <h2 id="impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Unique Challenges of Living With This Pattern
        </h2>
        <p className="mb-6">
          The specific symptom constellation creates challenges that differ from other forms of depression:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li><strong>Invalidation and self-doubt:</strong> Because you can feel better temporarily, others (and you) may dismiss the depression---"You seemed fine yesterday!" But brief mood lifting doesn't negate persistent depression. You may question your own experience: "If I can laugh at a joke, maybe I'm not really depressed, maybe I'm just lazy." This self-doubt delays treatment and adds shame.</li>
          <li><strong>Weight gain and body image:</strong> Depression already damages self-esteem; weight gain adds another layer of shame and self-criticism. The weight gain is often rapid (10-30 pounds in months), creating body image distress and social withdrawal. Others may comment on the weight change, adding to shame.</li>
          <li><strong>Oversleeping stigma:</strong> Creates intense guilt ("I'm just lazy," "I'm wasting my life") and functional impairment (missing work or school, neglecting responsibilities, losing structure). Unlike insomnia which others recognize as suffering, excessive sleep is often seen as character weakness.</li>
          <li><strong>Rejection sensitivity vicious cycle:</strong> Sensitivity strains relationships (you may overreact to minor slights, need constant reassurance, or withdraw to avoid rejection). This creates actual relationship problems and isolation, which then triggers more depression and confirms fears of rejection. It becomes a self-fulfilling prophecy.</li>
          <li><strong>Chronic course without clear episodes:</strong> Because it tends to be chronic rather than episodic, there's no clear "I'm having a depressive episode now" recognition. It's more like a persistent baseline of depression with worse periods, making it harder to identify as a treatable condition rather than "just how I am."</li>
          <li><strong>Misdiagnosis:</strong> The mood reactivity and sensitivity sometimes get misdiagnosed as borderline personality disorder, especially in women. The anxiety comorbidity may lead to treatment focused only on anxiety, missing the underlying depression.</li>
        </ul>

        <QuoteBlock
          quote="People think I'm not really depressed because I can laugh at a joke or enjoy a meal. But that moment of brightness just makes the crash harder. I'm still depressed---I just have brief windows where I can pretend I'm not."
          attribution="Anonymous patient"
          role="Living with atypical depression"
          variant="large"
        />

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment
        </h2>
        <p className="mb-6">
          Atypical depression responds to standard depression treatments, but some approaches may be more effective <Citation id="4" index={4} source="CNS Drugs" year="2021" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'MAOIs (historically most effective)',
              description: (
                <div>
                  <p className="mb-4">Monoamine oxidase inhibitors (phenelzine, tranylcypromine) have strongest evidence for atypical depression, showing superior response rates compared to SSRIs in some studies <Citation id="7" index={7} source="Journal of Clinical Psychiatry" year="2019" tier={1} />.</p>
                  <p className="mb-4">However, MAOIs require dietary restrictions (avoiding tyramine-rich foods) and have drug interactions, so they're typically reserved for treatment-resistant cases.</p>
                </div>
              ),
            },
            {
              title: 'SSRIs/SNRIs',
              description: (
                <p>Selective serotonin reuptake inhibitors and serotonin-norepinephrine reuptake inhibitors are first-line due to safety and tolerability. Still effective for most people with atypical depression, though possibly less so than MAOIs.</p>
              ),
            },
            {
              title: 'Bupropion',
              description: (
                <p>May be particularly helpful for atypical depression due to its activating effects (countering hypersomnia and fatigue) and lower risk of weight gain compared to SSRIs.</p>
              ),
            },
            {
              title: 'Psychotherapy',
              description: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>CBT:</strong> Addresses negative thought patterns, mood-dependent behaviors, and eating patterns</li>
                    <li><strong>Interpersonal therapy:</strong> Particularly useful for rejection sensitivity and relationship patterns</li>
                    <li><strong>Dialectical behavior therapy:</strong> Emotion regulation skills help with mood reactivity and rejection sensitivity</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Lifestyle interventions',
              description: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Sleep hygiene:</strong> Structure sleep despite hypersomnia (set alarms, limit sleep to 8-9 hours)</li>
                    <li><strong>Nutrition:</strong> Address carb cravings with balanced meals, protein, complex carbs</li>
                    <li><strong>Exercise:</strong> Counters weight gain, improves mood, increases energy</li>
                    <li><strong>Light exposure:</strong> Morning bright light may help regulate circadian rhythm and reduce hypersomnia</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="tip" title="Managing Rejection Sensitivity">
          <p className="mb-4">Strategies for interpersonal rejection sensitivity:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Learn to recognize when you're interpreting neutral behavior as rejection</li>
            <li>Practice asking for clarification instead of assuming ("I noticed you didn't respond---are you upset, or just busy?")</li>
            <li>Delay reacting to perceived rejection (give yourself 24 hours before responding)</li>
            <li>Build distress tolerance for uncomfortable emotions</li>
            <li>Communicate your sensitivity to trusted others so they can provide reassurance</li>
          </ul>
        </ArticleCallout>

        <h2 id="getting-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When and How to Seek Help
        </h2>
        <p className="mb-6">
          If you recognize this symptom pattern in yourself, it's worth discussing with a mental health provider. Getting the right diagnosis can inform treatment choices and help you understand why your depression might look different from others'—but is no less valid or deserving of care.
        </p>

        <p className="mb-6">
          <strong>Seek evaluation if you experience:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Persistent low mood that temporarily lifts with positive events but returns</li>
          <li>Sleeping 10+ hours regularly but still feeling exhausted</li>
          <li>Significant weight gain and increased appetite, especially for carbs</li>
          <li>Heavy, weighted feeling in your limbs</li>
          <li>Extreme sensitivity to rejection that impairs relationships or work</li>
          <li>These symptoms causing significant distress or functional impairment for 2+ weeks</li>
        </ul>

        <p className="mb-6">
          When discussing symptoms with a provider, be specific about the atypical features: "My mood does get better when good things happen, but it doesn't last," "I'm sleeping 12 hours and still exhausted," "I've gained 20 pounds in 3 months." This helps distinguish atypical from melancholic depression and guides treatment.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>Atypical depression is characterized by mood reactivity (mood temporarily brightens with positive events) plus at least two features: increased appetite/weight, excessive sleep, leaden paralysis, or rejection sensitivity</li>
            <li>Despite the name, atypical features affect 15-40% of people with depression and are especially common in women, younger people, and those with chronic depression</li>
            <li>The ability to feel better temporarily does NOT mean you're not "really" depressed—it's a specific symptom pattern, not evidence your depression is invalid</li>
            <li>Atypical features are much more common in bipolar depression than unipolar depression, so screening for bipolar is important if you have this pattern</li>
            <li>Treatment includes MAOIs (most effective but dietary restrictions), SSRIs/SNRIs, bupropion, and therapy focused on rejection sensitivity and relationship patterns</li>
            <li>Recognizing the specific pattern helps you understand your experience and seek appropriate treatment rather than blaming yourself for symptoms like oversleeping or weight gain</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(17),
    slug: 'treatment-resistant-depression',
    title: "Treatment-Resistant Depression: When Standard Approaches Aren't Enough",
    description: "Treatment-resistant depression affects 30% of people after initial treatments fail. Learn definitions, causes, and advanced treatment options including TMS, ketamine, ECT.",
    image: "/images/articles/cat07/cover-017.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['TRD', 'Treatment-Resistant Depression', 'ECT', 'TMS', 'Ketamine'],
    summary: 'Treatment-resistant depression (TRD) affects 30% of people with major depression when standard treatments fail. But "resistant" doesn\'t mean hopeless—advanced interventions like TMS, ketamine, and ECT achieve 50-90% response rates even when multiple medications haven\'t worked.',
    keyFacts: [
      { text: 'Approximately 30% of people with major depression have treatment-resistant depression after failing at least two antidepressant trials', citationIndex: 2 },
      { text: 'Before pursuing advanced treatments, ruling out pseudoresistance (wrong diagnosis, inadequate dose/duration, non-adherence) is essential', citationIndex: 8 },
      { text: 'ECT remains the most effective treatment for severe TRD with 70-90% response rates, significantly higher than medication alone', citationIndex: 5 },
      { text: 'Esketamine nasal spray is FDA-approved specifically for TRD and works through the glutamate system rather than serotonin', citationIndex: 4 },
      { text: 'TMS achieves 50-60% response rates in TRD and is non-invasive with minimal side effects, making it accessible for outpatient treatment', citationIndex: 3 },
    ],
    sparkMoment: 'Treatment-resistant doesn\'t mean untreatable—it means the first approaches didn\'t work, and now it\'s time for the interventions that often succeed where medications alone have failed.',
    practicalExercise: {
      title: 'Preparing for a TRD Evaluation',
      steps: [
        { title: 'Document your treatment history', description: 'List every antidepressant tried, dose, duration, and response. Include side effects and reasons for stopping. This helps identify true resistance vs. inadequate trials.' },
        { title: 'Track comorbid conditions', description: 'Note anxiety, sleep problems, chronic pain, substance use, or other conditions that may contribute to treatment resistance.' },
        { title: 'Prepare questions about advanced options', description: 'Research TMS, ketamine, ECT, and augmentation strategies. Come with specific questions about availability, timeline, side effects, and insurance coverage.' },
        { title: 'Advocate for specialized care', description: 'If your provider dismisses TRD options, request referral to a psychiatrist specializing in treatment-resistant depression or a mood disorders clinic.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Treatment Response',
    },
    citations: [
      {
        id: '1',
        text: 'Defining and treating treatment-resistant depression',
        source: 'Lancet Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1016/S2215-0366(21)00076-1',
        tier: 1,
      },
      {
        id: '2',
        text: 'Prevalence and predictors of treatment-resistant depression',
        source: 'JAMA Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1001/jamapsychiatry.2020.0001',
        tier: 1,
      },
      {
        id: '3',
        text: 'Transcranial magnetic stimulation for treatment-resistant depression: A systematic review',
        source: 'American Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1176/appi.ajp.2019.19090915',
        tier: 1,
      },
      {
        id: '4',
        text: 'Esketamine nasal spray for treatment-resistant depression',
        source: 'New England Journal of Medicine',
        year: '2019',
        link: 'https://doi.org/10.1056/NEJMoa1816960',
        tier: 1,
      },
      {
        id: '5',
        text: 'Electroconvulsive therapy for depression: Modern practice and outcomes',
        source: 'British Journal of Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1192/bjp.2021.96',
        tier: 1,
      },
      {
        id: '6',
        text: 'Medication augmentation strategies in treatment-resistant depression',
        source: 'CNS Drugs',
        year: '2020',
        link: 'https://doi.org/10.1007/s40263-020-00749-5',
        tier: 1,
      },
      {
        id: '7',
        text: 'Psychotherapy for treatment-resistant depression: Meta-analysis',
        source: 'Depression and Anxiety',
        year: '2020',
        link: 'https://doi.org/10.1002/da.23012',
        tier: 1,
      },
      {
        id: '8',
        text: 'Pseudoresistance vs. true treatment resistance in depression',
        source: 'Journal of Clinical Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.4088/JCP.18r12642',
        tier: 1,
      },
      {
        id: '9',
        text: 'Vagus nerve stimulation and deep brain stimulation for depression',
        source: 'Current Psychiatry Reports',
        year: '2021',
        link: 'https://doi.org/10.1007/s11920-021-01239-3',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            You've tried three different antidepressants. You've been in therapy for months. You've changed your diet, started exercising, practiced meditation. Yet depression persists, barely budging despite your best efforts. If this is your experience, you may have treatment-resistant depression---and you're far from alone.
          </p>
          <p className="mb-6">
            Treatment-resistant depression (TRD) generally refers to major depression that hasn't adequately responded to at least two different antidepressant trials of adequate dose and duration <Citation id="1" index={1} source="Lancet Psychiatry" year="2021" tier={1} />. It affects approximately 30% of people with major depression <Citation id="2" index={2} source="JAMA Psychiatry" year="2020" tier={2} />. The term can feel hopeless, but it's actually a call to action---to investigate why standard treatments aren't working and to pursue more advanced interventions that often succeed where first-line treatments fail.
          </p>
        </div>

        <h2 id="definition" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Counts as Treatment-Resistant?
        </h2>
        <p className="mb-6">
          There's no universal definition, but most clinicians use these criteria:
        </p>

        <ArticleCallout variant="clinical-note">
          <p className="mb-4"><strong>Standard definition:</strong> Failure to respond to at least 2 adequate trials of different antidepressants from different classes</p>
          <p className="mb-4"><strong>"Adequate trial" means:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Therapeutic dose for the specific medication</li>
            <li>Duration of 6-8 weeks minimum (some medications require 12 weeks)</li>
            <li>Good adherence (taking medication as prescribed)</li>
          </ul>
          <p className="mt-4"><strong>Response vs. remission:</strong> "Treatment-resistant" can mean no response (minimal improvement) or partial response without remission (some improvement but still significantly depressed).</p>
        </ArticleCallout>

        <p className="mb-6">
          <strong>Staging systems</strong> categorize resistance severity:
        </p>

        <ComparisonTable
          title="TRD Staging (Example)"
          columns={['Stage', 'Description']}
          items={[
            { feature: 'Stage 1', values: ['Failed 1 adequate antidepressant trial'] },
            { feature: 'Stage 2', values: ['Failed 2 adequate trials from different classes'] },
            { feature: 'Stage 3', values: ['Failed 2+ trials plus augmentation strategy'] },
            { feature: 'Stage 4', values: ['Failed multiple trials + augmentation + ECT or brain stimulation'] },
            { feature: 'Stage 5', values: ['Failed Stage 4 plus additional interventions'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="pseudoresistance" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Pseudoresistance vs. True Resistance
        </h2>
        <p className="mb-6">
          Before concluding treatment resistance, it's essential to rule out <strong>pseudoresistance</strong>---apparent lack of response due to inadequate treatment rather than true biological resistance <Citation id="8" index={8} source="Journal of Clinical Psychiatry" year="2019" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'wrong-diagnosis',
              title: 'Wrong or Incomplete Diagnosis',
              content: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Bipolar depression misdiagnosed as unipolar:</strong> Antidepressants alone can worsen bipolar depression</li>
                    <li><strong>Medical conditions:</strong> Hypothyroidism, anemia, sleep apnea, chronic pain can mimic or worsen depression</li>
                    <li><strong>Substance use:</strong> Alcohol, cannabis, other substances interfere with treatment</li>
                    <li><strong>Comorbid conditions:</strong> Untreated anxiety, PTSD, OCD, personality disorders can prevent full remission</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'inadequate-dose',
              title: 'Inadequate Dose or Duration',
              content: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Medication dose too low (subtherapeutic)</li>
                    <li>Trial duration too short (stopped at 4 weeks when 8-12 needed)</li>
                    <li>Premature discontinuation due to side effects before giving medication time to work</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'non-adherence',
              title: 'Medication Non-Adherence',
              content: (
                <p>Missing doses, taking inconsistently, or stopping medication without telling provider. Sometimes due to side effects, cost, forgetfulness, or ambivalence about treatment.</p>
              ),
            },
            {
              id: 'interactions',
              title: 'Drug Interactions or Metabolism Issues',
              content: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Other medications interfering with antidepressant effectiveness</li>
                    <li>Genetic variations in drug metabolism (fast metabolizers may need higher doses)</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'psychosocial',
              title: 'Ongoing Psychosocial Stressors',
              content: (
                <p>Active trauma, abusive relationship, severe financial stress, chronic illness. Medication can't overcome overwhelming ongoing stressors without addressing the stressors themselves.</p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>Before pursuing advanced TRD treatments, a comprehensive reassessment should evaluate for pseudoresistance. Correcting misdiagnosis, optimizing dose/duration, addressing adherence, or treating comorbid conditions may lead to response without needing brain stimulation or other interventions.</p>
        </ArticleCallout>

        <h2 id="why-resistance" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Does TRD Happen?
        </h2>
        <p className="mb-6">
          True treatment resistance likely reflects neurobiological differences:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Heterogeneity of depression:</strong> "Depression" isn't one condition but many different presentations with different underlying mechanisms. Standard treatments target serotonin/norepinephrine, but some people's depression involves other systems (glutamate, inflammation, neuroplasticity deficits)</li>
          <li><strong>Genetic factors:</strong> Variations in genes affecting drug metabolism, receptor sensitivity, or neurotransmitter function</li>
          <li><strong>Neuroinflammation:</strong> Elevated inflammatory markers predict poorer antidepressant response</li>
          <li><strong>Structural brain changes:</strong> Reduced hippocampal volume, altered connectivity in emotion regulation circuits</li>
          <li><strong>Chronic stress effects:</strong> Prolonged depression causes brain changes that may perpetuate the condition</li>
          <li><strong>Treatment history:</strong> With each failed trial, subsequent response rates decrease (resistance can worsen over time)</li>
        </ul>

        <h2 id="advanced-treatments" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Advanced Treatment Options
        </h2>
        <p className="mb-6">
          When standard antidepressants fail, multiple evidence-based options exist:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Medication Augmentation Strategies',
              description: (
                <div>
                  <p className="mb-4">Adding a second medication to boost antidepressant effectiveness <Citation id="6" index={6} source="CNS Drugs" year="2020" tier={1} />:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Atypical antipsychotics:</strong> Aripiprazole, quetiapine, brexpiprazole (FDA-approved for augmentation)</li>
                    <li><strong>Lithium:</strong> Oldest augmentation strategy with strong evidence</li>
                    <li><strong>Thyroid hormone (T3):</strong> Even in people with normal thyroid function</li>
                    <li><strong>Second antidepressant:</strong> Combining medications from different classes</li>
                    <li><strong>Buspirone:</strong> Anti-anxiety medication with antidepressant augmentation properties</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Transcranial Magnetic Stimulation (TMS)',
              description: (
                <div>
                  <p className="mb-4">Non-invasive brain stimulation using magnetic pulses to activate underactive brain regions <Citation id="3" index={3} source="American Journal of Psychiatry" year="2020" tier={1} />:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>FDA-approved for TRD</li>
                    <li>Daily sessions (20-30 min) for 4-6 weeks</li>
                    <li>Response rate: 50-60% in TRD</li>
                    <li>Remission rate: 30-40%</li>
                    <li>Well-tolerated; main side effect is scalp discomfort during treatment</li>
                    <li>No anesthesia, no sedation---can drive yourself to/from appointments</li>
                  </ul>
                  <p>Newer protocols (theta-burst stimulation) reduce treatment time to 3-10 minutes per session with similar effectiveness.</p>
                </div>
              ),
            },
            {
              title: 'Ketamine and Esketamine',
              description: (
                <div>
                  <p className="mb-4">NMDA receptor antagonists that work via glutamate system (different from traditional antidepressants):</p>
                  <p className="mb-4"><strong>IV Ketamine (off-label):</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Administered as IV infusion in clinic</li>
                    <li>Rapid onset (often within hours to days)</li>
                    <li>Response rate: 60-70% in TRD</li>
                    <li>Typically 6 infusions over 2-3 weeks, then maintenance</li>
                  </ul>
                  <p className="mb-4"><strong>Esketamine nasal spray (Spravato):</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>FDA-approved specifically for TRD <Citation id="4" index={4} source="New England Journal of Medicine" year="2019" tier={1} /></li>
                    <li>Used with oral antidepressant</li>
                    <li>Administered in clinic with monitoring</li>
                    <li>Twice weekly initially, then weekly or less frequent</li>
                    <li>Response rate similar to IV ketamine</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Electroconvulsive Therapy (ECT)',
              description: (
                <div>
                  <p className="mb-4">Most effective treatment for severe TRD <Citation id="5" index={5} source="British Journal of Psychiatry" year="2021" tier={1} />:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Induces brief seizure under general anesthesia</li>
                    <li>Response rate: 70-90% even in severe TRD</li>
                    <li>Typically 6-12 sessions over 2-4 weeks</li>
                    <li>Modern ECT is safe; done under anesthesia with muscle relaxant</li>
                    <li>Main side effect: temporary memory problems (usually resolves)</li>
                    <li>Often reserved for severe, disabling, or suicidal depression</li>
                  </ul>
                  <p>Despite stigma from historical misuse, modern ECT is evidence-based and life-saving for severe TRD.</p>
                </div>
              ),
            },
            {
              title: 'Specialized Psychotherapy',
              description: (
                <div>
                  <p className="mb-4">Even in TRD, intensive psychotherapy can help <Citation id="7" index={7} source="Depression and Anxiety" year="2020" tier={1} />:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Cognitive Behavioral Analysis System of Psychotherapy (CBASP):</strong> Developed for chronic depression</li>
                    <li><strong>Intensive CBT:</strong> Multiple sessions per week</li>
                    <li><strong>Mindfulness-Based Cognitive Therapy (MBCT):</strong> Prevents relapse, reduces residual symptoms</li>
                    <li><strong>Acceptance and Commitment Therapy (ACT):</strong> Reduces suffering even when symptoms persist</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Investigational Treatments',
              description: (
                <div>
                  <p className="mb-4">For highly refractory TRD <Citation id="9" index={9} source="Current Psychiatry Reports" year="2021" tier={1} />:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Vagus nerve stimulation (VNS):</strong> Implanted device stimulating vagus nerve</li>
                    <li><strong>Deep brain stimulation (DBS):</strong> Electrodes implanted in specific brain regions</li>
                    <li><strong>Psychedelic-assisted therapy:</strong> Psilocybin, MDMA in clinical trials</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <StatCard
          stats={[
            { value: 30, suffix: '%', label: 'Of people with depression have treatment-resistant depression' },
            { value: 70, suffix: '%', label: 'Response rate to ECT in severe TRD' },
            { value: 50, suffix: '%', label: 'Response rate to TMS in TRD' },
          ]}
          source="Lancet Psychiatry, 2021; American Journal of Psychiatry, 2020"
        />

        <h2 id="stepwise" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Stepwise Approach to TRD
        </h2>

        <BeforeAfter
          before={{
            title: 'Reactive Approach (Less Optimal)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Try one antidepressant at a time</li>
                <li>Wait months between trials</li>
                <li>Continue ineffective treatments too long</li>
                <li>Years pass with persistent depression</li>
                <li>Demoralization and hopelessness increase</li>
              </ul>
            ),
          }}
          after={{
            title: 'Proactive Approach (Better)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>After 2 failed trials, pursue comprehensive reassessment</li>
                <li>Don't wait---move to augmentation or brain stimulation</li>
                <li>Consider TMS, ketamine, or ECT early in treatment resistance</li>
                <li>Combine medication with intensive psychotherapy</li>
                <li>Aggressively treat comorbidities and address lifestyle factors</li>
              </ul>
            ),
          }}
        />

        <ArticleCallout variant="tip" title="Advocating for Yourself">
          <p className="mb-4">If you have TRD:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ask your provider about TMS, ketamine, or ECT---don't wait for them to suggest it</li>
            <li>Request referral to specialty clinic or psychiatrist with TRD expertise</li>
            <li>Inquire about clinical trials for novel treatments</li>
            <li>Don't accept "we've tried everything' without exploring brain stimulation options</li>
            <li>Insurance often covers TMS and ECT for TRD; appeal denials if needed</li>
          </ul>
        </ArticleCallout>

        <h2 id="emotional-toll" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Emotional Toll of Treatment-Resistant Depression
        </h2>
        <p className="mb-6">
          Beyond the depression itself, TRD creates unique psychological challenges that compound the suffering:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li><strong>Demoralization:</strong> After each failed treatment, hope erodes. "I've tried everything. Nothing works. I'll never get better." This learned helplessness becomes its own obstacle to recovery.</li>
          <li><strong>Self-blame:</strong> "Maybe I'm not trying hard enough. Maybe I'm just weak. Maybe I'm the problem." TRD can feel like personal failure rather than biological reality requiring different treatment.</li>
          <li><strong>Financial burden:</strong> Years of treatment, multiple medications, therapy sessions, and potentially expensive interventions create significant financial stress that adds to depression.</li>
          <li><strong>Relationship strain:</strong> Chronic depression wears on relationships. Loved ones may lose patience or understanding after years of illness. Isolation deepens.</li>
          <li><strong>Lost time:</strong> Years spent depressed---missing life events, career opportunities, relationships, experiences. The grief of lost time is real.</li>
          <li><strong>Treatment fatigue:</strong> Starting another medication, enduring more side effects, hoping this one works---it's exhausting. The effort required to keep trying becomes overwhelming.</li>
        </ul>

        <p className="mb-6">
          These are normal responses to prolonged suffering and repeated disappointment. If you feel this way, you're not broken or weak---you're responding reasonably to an unreasonable situation. The demoralization is part of the illness, not evidence that you're beyond help.
        </p>

        <QuoteBlock
          quote="I'd been depressed for eight years, tried seven medications, been in therapy for years. Nothing worked. I thought this was just my life. Then I did TMS. Within three weeks, I felt better than I had in nearly a decade. I wish I'd known about it years earlier."
          attribution="Anonymous patient"
          role="Recovering from treatment-resistant depression"
          variant="large"
        />

        <h2 id="hope-and-outcomes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Hope, Recovery, and Long-Term Outcomes
        </h2>
        <p className="mb-6">
          Despite the frustration of TRD, important facts about outcomes:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Most people with TRD eventually respond to treatment</strong> when appropriate interventions are used. The STAR*D trial found that with sequential treatment steps, over 60% eventually achieve remission.</li>
          <li><strong>Novel treatments are emerging:</strong> Ketamine, esketamine, and psychedelic-assisted therapies represent fundamentally different mechanisms. More options are in development.</li>
          <li><strong>Recovery is possible at any stage:</strong> Even after years of illness and many failed treatments, people respond to interventions like ECT or ketamine. Duration of illness doesn't predict impossibility of recovery.</li>
          <li><strong>Partial response still matters:</strong> Even if full remission isn't achieved, going from severe to moderate depression significantly improves quality of life and functioning.</li>
          <li><strong>The right treatment may not have been tried yet:</strong> If you've failed medications but haven't tried TMS, ketamine, or ECT, you haven't exhausted options. Many people's "breakthrough" treatment was one they didn't know existed.</li>
        </ul>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>Treatment-resistant depression (TRD) is defined as depression that hasn't responded to at least two adequate antidepressant trials of sufficient dose and duration</li>
            <li>Before pursuing advanced treatments, rule out pseudoresistance: wrong diagnosis, inadequate dose/duration, poor adherence, comorbid conditions, or ongoing stressors</li>
            <li>TRD reflects neurobiological differences (inflammation, genetic factors, structural brain changes) that may require different treatment approaches beyond standard antidepressants</li>
            <li>Multiple evidence-based advanced options exist: medication augmentation (lithium, antipsychotics), TMS (50-60% response), ketamine/esketamine (60-70% response), and ECT (70-90% response)</li>
            <li>Don't wait years between failed treatments—after two failures, pursue comprehensive reassessment and consider brain stimulation or ketamine rather than trying endless medication trials</li>
            <li>TRD is frustrating and demoralizing, but "resistant" doesn't mean "hopeless"—it means standard approaches haven't worked, and now it's time for specialized interventions that often succeed where first-line treatments failed</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          Treatment-resistant depression is frustrating, exhausting, and demoralizing. But the name itself is misleading---"resistant" doesn't mean "hopeless." It means standard treatments haven't worked, not that nothing will work. Advanced options like TMS, ketamine, and ECT have high success rates even when multiple medications have failed. If you're stuck in persistent depression despite treatment, don't give up. Specialized care and advanced interventions exist, and they work. You deserve aggressive, expert treatment until you find what brings you relief.
        </p>
      </>
    ),
  },

  {
    id: catId(18),
    slug: 'depression-with-psychotic-features',
    title: 'Depression with Psychotic Features: When Depression Distorts Reality',
    description: 'Psychotic depression involves delusions or hallucinations during major depression. Learn symptoms, why it requires specialized treatment, and outcomes.',
    image: "/images/articles/cat07/cover-018.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Psychotic Depression', 'Delusions', 'Hallucinations', 'Severe Depression'],
    summary: 'Psychotic depression is major depressive disorder with delusions or hallucinations—affecting 15-20% of hospitalized depression cases. It\'s a psychiatric emergency with high suicide risk that requires specialized combination treatment, not antidepressants alone.',
    keyFacts: [
      { text: 'Psychotic depression affects 15-20% of people hospitalized for major depression and carries significantly higher suicide risk than non-psychotic depression', citationIndex: 1 },
      { text: 'The most common delusions are mood-congruent: guilt (believing you\'ve committed unforgivable sins), nihilistic (believing you\'re dead or don\'t exist), and somatic (believing your body is rotting)', citationIndex: 5 },
      { text: 'Antidepressants alone achieve only 20-40% response rates, while combination antidepressant plus antipsychotic achieves 60-80% response', citationIndex: 3 },
      { text: 'ECT is the most effective treatment with 80-90% response rates and is often first-line rather than last resort due to severity and suicide risk', citationIndex: 4 },
      { text: '50% of people with psychotic depression eventually develop bipolar disorder, a rate 3× higher than non-psychotic depression', citationIndex: 6 },
    ],
    sparkMoment: 'When depression distorts reality itself—when you believe you\'re rotting from the inside or hear voices condemning you—this isn\'t "just" depression anymore. This is a psychiatric emergency, and combination treatment or ECT can bring you back to reality.',
    practicalExercise: {
      title: 'Recognizing Warning Signs (For Loved Ones)',
      steps: [
        { title: 'Know the red flags', description: 'Statements like "I\'m dead inside," "I can smell myself rotting," "I\'ve destroyed everyone," or "voices are telling me to die" indicate psychotic features, not typical depression.' },
        { title: 'Assess safety immediately', description: 'Psychotic depression has extremely high suicide risk. If someone expresses delusions of guilt, hears command hallucinations, or seems disconnected from reality, this is an emergency.' },
        { title: 'Seek emergency care', description: 'Go to the nearest emergency room or call 911. Do not wait for an appointment or try to talk them out of delusions—they need immediate psychiatric evaluation.' },
        { title: 'Advocate for combination treatment', description: 'Ensure providers know about psychotic features. Antidepressants alone will not work. Ask about combination medication or ECT.' },
      ],
      toolLink: '/crisis',
      toolLabel: 'Crisis Resources',
    },
    citations: [
      {
        id: '1',
        text: 'Psychotic depression: Clinical features, assessment, and treatment',
        source: 'American Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1176/appi.ajp.2019.19070680',
        tier: 1,
      },
      {
        id: '2',
        text: 'DSM-5-TR: Major Depression with Psychotic Features',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://www.psychiatry.org/psychiatrists/practice/dsm',
        tier: 4,
      },
      {
        id: '3',
        text: 'Combination antidepressant-antipsychotic treatment for psychotic depression',
        source: 'JAMA Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1001/jamapsychiatry.2019.0055',
        tier: 1,
      },
      {
        id: '4',
        text: 'ECT for psychotic depression: Efficacy and outcomes',
        source: 'Journal of ECT',
        year: '2020',
        link: 'https://doi.org/10.1097/YCT.0000000000000627',
        tier: 1,
      },
      {
        id: '5',
        text: 'Delusional themes in psychotic depression: Mood-congruent vs. mood-incongruent',
        source: 'Schizophrenia Bulletin',
        year: '2019',
        link: 'https://doi.org/10.1093/schbul/sby162',
        tier: 1,
      },
      {
        id: '6',
        text: 'Risk for bipolar disorder in patients with psychotic depression',
        source: 'Bipolar Disorders',
        year: '2021',
        link: 'https://doi.org/10.1111/bdi.13012',
        tier: 1,
      },
      {
        id: '7',
        text: 'Psychotic depression vs. schizoaffective disorder: Differential diagnosis',
        source: 'Current Psychiatry Reports',
        year: '2020',
        link: 'https://doi.org/10.1007/s11920-020-01149-8',
        tier: 1,
      },
      {
        id: '8',
        text: 'Long-term outcomes and recurrence in psychotic depression',
        source: 'Journal of Affective Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jad.2021.02.068',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Depression is devastating on its own. But when it becomes so severe that you lose touch with reality---when you believe things that aren't true, when you hear voices no one else hears, when you're certain you've committed unforgivable sins or that you're rotting from the inside---the suffering transcends ordinary depression. This is psychotic depression, and it's a psychiatric emergency requiring immediate, specialized treatment.
          </p>
          <p className="mb-6">
            Psychotic depression is major depressive disorder with psychotic features---delusions (false fixed beliefs) and/or hallucinations (sensory experiences without external stimuli) occurring during a severe depressive episode <Citation id="2" index={2} source="American Psychiatric Association" year="2022" tier={4} />. It affects approximately 15-20% of people hospitalized for major depression and carries higher risk for suicide, longer episodes, greater functional impairment, and poorer response to standard antidepressants <Citation id="1" index={1} source="American Journal of Psychiatry" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Symptoms
        </h2>
        <p className="mb-6">
          Psychotic depression includes all symptoms of major depression <strong>plus</strong> psychotic symptoms:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'delusions',
              label: 'Delusions',
              content: (
                <div>
                  <p className="mb-4">False, fixed beliefs held with complete conviction despite evidence to the contrary <Citation id="5" index={5} source="Schizophrenia Bulletin" year="2019" tier={1} />:</p>
                  <p className="mb-4"><strong>Mood-congruent delusions (most common):</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Guilt delusions:</strong> Believing you've committed terrible sins, are responsible for others' suffering, deserve punishment</li>
                    <li><strong>Nihilistic delusions:</strong> Believing you're dead, don't exist, or that the world is ending</li>
                    <li><strong>Somatic delusions:</strong> Believing your body is rotting, you have a terminal illness, or your organs have stopped working</li>
                    <li><strong>Poverty delusions:</strong> Believing you're destitute despite evidence of financial stability</li>
                    <li><strong>Persecutory delusions:</strong> Believing you're being punished for your failures or sins</li>
                  </ul>
                  <p className="mb-4"><strong>Mood-incongruent delusions (less common, may suggest bipolar disorder or schizoaffective disorder):</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Delusions not related to depressive themes (e.g., believing you're being monitored by government)</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'hallucinations',
              label: 'Hallucinations',
              content: (
                <div>
                  <p className="mb-4">Sensory perceptions without external stimuli:</p>
                  <p className="mb-4"><strong>Auditory hallucinations (most common):</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Hearing voices criticizing, condemning, or insulting you</li>
                    <li>Voices telling you you're worthless, evil, or should die</li>
                    <li>Command hallucinations telling you to harm yourself</li>
                  </ul>
                  <p className="mb-4"><strong>Visual hallucinations (less common):</strong></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Seeing deceased relatives, demons, or frightening images</li>
                  </ul>
                  <p className="mb-4"><strong>Olfactory hallucinations:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Smelling rotting flesh, feces, or decay (related to somatic delusions)</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'depressive',
              label: 'Depressive Symptoms',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Severe depressed mood</li>
                  <li>Complete anhedonia (inability to feel any pleasure)</li>
                  <li>Profound psychomotor retardation (slowed movement, speech) or agitation</li>
                  <li>Severe guilt, worthlessness</li>
                  <li>Suicidal ideation (often with intent or plan)</li>
                  <li>Inability to care for self (not eating, not bathing)</li>
                  <li>May have catatonic features (stupor, mutism)</li>
                </ul>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning" title="High Suicide Risk">
          <p className="mb-4">Psychotic depression carries significantly higher suicide risk than non-psychotic depression:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Delusions of guilt/worthlessness intensify hopelessness</li>
            <li>Command hallucinations may order self-harm</li>
            <li>Severity of depression impairs judgment and impulse control</li>
            <li>May believe suicide is deserved punishment or escape from imagined persecution</li>
          </ul>
          <p className="mt-4"><strong>This is a psychiatric emergency. Hospitalization is often necessary to ensure safety.</strong></p>
        </ArticleCallout>

        <h2 id="examples" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Psychotic Depression Looks Like
        </h2>

        <BeforeAfter
          before={{
            title: 'Severe (Non-Psychotic) Depression',
            content: (
              <div>
                <p className="mb-4"><em>"I feel like a failure. I can't do anything right. Everything is pointless. I don't see how things can get better. Maybe everyone would be better off without me."</em></p>
                <p>Insight intact: You recognize these are feelings/thoughts, even if they feel true. You can consider alternative perspectives, even if you don't believe them.</p>
              </div>
            ),
          }}
          after={{
            title: 'Psychotic Depression',
            content: (
              <div>
                <p className="mb-4"><em>"I've destroyed everyone's lives. I'm evil. God is punishing me, and I deserve it. I can hear voices telling me I should die. My body is rotting from the inside---I can smell it. There's no point treating me; I'm already dead."</em></p>
                <p>No insight: These are experienced as absolute reality, not symptoms of illness. No amount of reassurance or evidence changes the belief.</p>
              </div>
            ),
          }}
        />

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Diagnosis and Differential Diagnosis
        </h2>
        <p className="mb-6">
          Psychotic depression must be distinguished from other conditions with psychosis:
        </p>

        <ComparisonTable
          title="Psychotic Depression vs. Other Psychotic Disorders"
          columns={['Condition', 'Key Distinguishing Features']}
          items={[
            {
              feature: 'Psychotic Depression (MDD with psychotic features)',
              values: ['Psychotic symptoms occur ONLY during depressive episodes; No psychosis between episodes; Depressive symptoms predominate'],
            },
            {
              feature: 'Schizoaffective Disorder (depressive type)',
              values: ['Psychotic symptoms present for ≥2 weeks WITHOUT mood symptoms; Mood episodes present most of the time; Both psychotic and mood symptoms prominent'],
            },
            {
              feature: 'Schizophrenia with depressive features',
              values: ['Psychotic symptoms (delusions, hallucinations, disorganized thinking) present most of the time; Depression is secondary feature; Negative symptoms (flat affect, avolition) prominent'],
            },
            {
              feature: 'Bipolar Disorder with psychotic features',
              values: ['History of manic/hypomanic episodes; Psychosis may occur during manic or depressive episodes; Higher risk if family history of bipolar'],
            },
            {
              feature: 'Delirium or medical psychosis',
              values: ['Fluctuating consciousness, disorientation; Acute onset; Often has identifiable medical cause; Improves when medical condition treated'],
            },
          ]}
          highlightColumn={0}
        />

        <p className="mb-6">
          Differentiating these conditions is critical because treatment differs. Misdiagnosis can lead to ineffective or harmful treatment <Citation id="7" index={7} source="Current Psychiatry Reports" year="2020" tier={1} />.
        </p>

        <h2 id="bipolar-risk" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Psychotic Depression and Bipolar Disorder
        </h2>
        <p className="mb-6">
          People with psychotic features during depression have higher risk for future mania/hypomania, suggesting the illness may be bipolar rather than unipolar <Citation id="6" index={6} source="Bipolar Disorders" year="2021" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Of those with psychotic depression later develop bipolar disorder' },
            { value: 15, suffix: '%', label: 'Risk in non-psychotic depression' },
            { value: 3, suffix: '×', label: 'Higher conversion rate to bipolar' },
          ]}
          source="Bipolar Disorders, 2021"
        />

        <p className="mb-6">
          Careful monitoring for emergent mania/hypomania is essential, and some clinicians use mood stabilizers alongside antidepressants in psychotic depression due to bipolar risk.
        </p>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment
        </h2>
        <p className="mb-6">
          Psychotic depression requires specialized treatment---antidepressants alone are insufficient and often ineffective.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Hospitalization (often necessary)',
              description: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Ensures safety given high suicide risk</li>
                    <li>Allows close monitoring and medication adjustment</li>
                    <li>Addresses inability to care for self (eating, hygiene)</li>
                    <li>May be voluntary or involuntary depending on severity and insight</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Combination Medication: Antidepressant + Antipsychotic',
              description: (
                <div>
                  <p className="mb-4">Gold standard for psychotic depression <Citation id="3" index={3} source="JAMA Psychiatry" year="2019" tier={1} />:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Antidepressant</strong> (SSRI, SNRI, or tricyclic) addresses depressive symptoms</li>
                    <li><strong>Antipsychotic</strong> (quetiapine, olanzapine, risperidone, aripiprazole) addresses psychotic symptoms</li>
                    <li>Combination is significantly more effective than either alone</li>
                    <li>Response rate: 60-80% with combination vs. 20-40% with antidepressant alone</li>
                  </ul>
                  <p>Neither medication alone is adequate---psychotic depression requires both.</p>
                </div>
              ),
            },
            {
              title: 'Electroconvulsive Therapy (ECT)',
              description: (
                <div>
                  <p className="mb-4">Most effective treatment for psychotic depression <Citation id="4" index={4} source="Journal of ECT" year="2020" tier={1} />:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Response rate: 80-90%</li>
                    <li>Works faster than medications (often improvement within 1-2 weeks)</li>
                    <li>Especially important if patient is catatonic, actively suicidal, or not eating/drinking</li>
                    <li>Often first-line rather than second-line due to severity and urgency</li>
                  </ul>
                  <p className="mt-4">For psychotic depression, ECT is not a "last resort"---it's often the most appropriate and effective initial treatment.</p>
                </div>
              ),
            },
            {
              title: 'Maintenance Treatment',
              description: (
                <div>
                  <p className="mb-4">After acute episode resolves:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Continue combination medication for 6-12 months minimum</li>
                    <li>Some patients require long-term antipsychotic to prevent psychotic recurrence</li>
                    <li>High recurrence rate (50-70%), so ongoing treatment essential</li>
                    <li>Maintenance ECT (monthly sessions) for those who responded to acute ECT</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Psychotherapy (adjunctive)',
              description: (
                <div>
                  <p className="mb-4">Once psychosis resolves and patient stabilizes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>CBT to address residual negative thoughts and prevent relapse</li>
                    <li>Family psychoeducation about illness and warning signs</li>
                    <li>Supportive therapy to process the traumatic experience of psychosis</li>
                  </ul>
                  <p className="mt-4">Psychotherapy cannot treat active psychosis but is valuable in recovery phase.</p>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>The critical point: <strong>Psychotic depression will not respond to antidepressants alone.</strong> Attempting to treat it with only an antidepressant wastes time, prolongs suffering, and increases risk. Combination medication or ECT is essential.</p>
        </ArticleCallout>

        <h2 id="prognosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Prognosis and Long-Term Outlook
        </h2>
        <p className="mb-6">
          With appropriate treatment, most people fully recover from the acute psychotic depressive episode <Citation id="8" index={8} source="Journal of Affective Disorders" year="2021" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Acute response:</strong> 80-90% respond to combination treatment or ECT</li>
          <li><strong>Full remission:</strong> Most achieve complete resolution of psychotic and depressive symptoms</li>
          <li><strong>Recurrence risk:</strong> High---50-70% experience another episode within 2-5 years</li>
          <li><strong>Functional recovery:</strong> May take longer than symptom remission; cognitive effects and confidence rebuilding needed</li>
          <li><strong>Conversion to bipolar:</strong> 50% eventually have manic/hypomanic episode, changing diagnosis</li>
        </ul>

        <p className="mb-6">
          <strong>Factors predicting better outcomes:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Rapid treatment initiation</li>
          <li>Good medication adherence</li>
          <li>Strong social support</li>
          <li>No substance use</li>
          <li>Shorter duration of untreated psychosis</li>
        </ul>

        <QuoteBlock
          quote="During the episode, I believed I was evil, that I'd destroyed everything. I heard voices telling me to die. I couldn't eat because I thought I was already dead. It was terrifying. But with ECT and medication, I came back. The delusions lifted. I'm myself again. I'm so grateful I got the right treatment."
          attribution="Anonymous patient"
          role="Recovered from psychotic depression"
          variant="large"
        />

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>Psychotic depression is major depression with delusions (false, fixed beliefs) or hallucinations (sensory experiences without external stimuli) occurring during severe depressive episodes</li>
            <li>Common psychotic symptoms include delusions of guilt/sin, nihilistic delusions (believing you're dead), somatic delusions (body rotting), and auditory hallucinations (critical or command voices)</li>
            <li>This is a psychiatric emergency with significantly elevated suicide risk—hospitalization is often necessary to ensure safety and begin intensive treatment</li>
            <li>Antidepressants alone are inadequate and ineffective—combination antidepressant plus antipsychotic is the gold standard medication approach (60-80% response vs. 20-40% with antidepressant alone)</li>
            <li>ECT achieves 80-90% response rates and works faster than medication, making it often first-line treatment rather than last resort given the severity and urgency</li>
            <li>50% of people with psychotic depression eventually develop bipolar disorder, so careful monitoring for mania/hypomania and possible use of mood stabilizers is important</li>
            <li>With appropriate aggressive treatment, full recovery is expected, though recurrence risk is high (50-70%), requiring long-term maintenance treatment</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          Psychotic depression is one of the most severe forms of mental illness, but it's also one of the most treatable when correctly identified and aggressively managed. If you or a loved one is experiencing depression with psychotic symptoms—delusions, hallucinations, complete loss of functioning—seek emergency psychiatric care immediately. This is not something to wait out or try to manage on your own. With combination medication or ECT, recovery is not just possible—it's expected.
        </p>

        <ArticleCallout variant="crisis" title="This is an Emergency">
          <p className="mb-4"><strong>If you or someone you know is experiencing psychotic depression symptoms, go to the nearest emergency room or call 911. This is a psychiatric emergency requiring immediate professional intervention.</strong></p>
          <p>Crisis resources:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988</li>
            <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
            <li><strong>Emergency services:</strong> Call 911 or go to nearest ER</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(19),
    slug: 'premenstrual-dysphoric-disorder-pmdd',
    title: 'Premenstrual Dysphoric Disorder: Beyond PMS',
    description: 'PMDD is severe cyclical mood disturbance tied to menstrual cycle, affecting 5% of menstruating people. Learn symptoms, diagnosis, and evidence-based treatment.',
    image: "/images/articles/cat07/cover-019.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['PMDD', 'Premenstrual Dysphoric Disorder', 'Hormonal Depression', 'Menstrual Cycle'],
    summary: 'PMDD is a severe, cyclical mood disorder affecting 3-8% of menstruating people—not "just PMS" but a disabling condition with marked depression, rage, and anxiety in the week before menstruation that resolves rapidly when the period starts.',
    keyFacts: [
      { text: 'PMDD affects approximately 5% of menstruating individuals and causes significant functional impairment in work, relationships, and daily life—far beyond typical PMS', citationIndex: 1 },
      { text: 'The defining feature is predictable timing: symptoms are minimal in the follicular phase, peak in the week before menstruation, and resolve within 1-2 days of menstrual flow starting', citationIndex: 2 },
      { text: 'PMDD is not caused by abnormal hormone levels but by the brain\'s abnormal sensitivity to normal hormonal fluctuations, specifically altered GABA receptor response to progesterone metabolites', citationIndex: 5 },
      { text: 'SSRIs achieve 60-70% response rates for PMDD and work within days (unlike the weeks required for depression), with both continuous and luteal-phase-only dosing being effective', citationIndex: 3 },
      { text: '30% of people with PMDD experience suicidal ideation during severe luteal-phase episodes, making this a potentially life-threatening condition requiring treatment', citationIndex: 6 },
    ],
    sparkMoment: 'If you feel like Dr. Jekyll and Mr. Hyde depending on where you are in your cycle—fine for three weeks, then darkness descends like clockwork—this isn\'t weakness or "just PMS." It\'s PMDD, and effective treatment exists.',
    practicalExercise: {
      title: 'Two-Cycle Symptom Tracking for Diagnosis',
      steps: [
        { title: 'Download DRSP or symptom tracker', description: 'Use the Daily Record of Severity of Problems (DRSP) form or a menstrual cycle tracking app that includes mood symptoms.' },
        { title: 'Rate symptoms daily for 2 months', description: 'Each day, rate mood (depression, anxiety, irritability), physical symptoms (bloating, breast pain, fatigue), and functional impairment (work, relationships, self-care). Be honest about severity.' },
        { title: 'Track menstrual cycle dates', description: 'Mark the first day of your period each cycle. Note cycle day for each symptom rating.' },
        { title: 'Look for the pattern', description: 'After 2 cycles, review: Are symptoms minimal days 1-14 (follicular phase)? Do they peak days 22-28 (late luteal)? Do they resolve within 1-2 days of period starting? This pattern confirms PMDD.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Daily Symptoms',
    },
    citations: [
      {
        id: '1',
        text: 'Premenstrual dysphoric disorder: Pathophysiology and treatment',
        source: 'American Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1176/appi.ajp.2020.19070667',
        tier: 1,
      },
      {
        id: '2',
        text: 'DSM-5-TR: Premenstrual Dysphoric Disorder diagnostic criteria',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://www.psychiatry.org/psychiatrists/practice/dsm',
        tier: 4,
      },
      {
        id: '3',
        text: 'SSRIs for premenstrual dysphoric disorder: Systematic review',
        source: 'Journal of Clinical Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.4088/JCP.20r13803',
        tier: 1,
      },
      {
        id: '4',
        text: 'Hormonal contraceptives for PMDD: Evidence review',
        source: 'Obstetrics & Gynecology',
        year: '2020',
        link: 'https://doi.org/10.1097/AOG.0000000000003645',
        tier: 1,
      },
      {
        id: '5',
        text: 'GABA, progesterone, and PMDD: Biological mechanisms',
        source: 'Molecular Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1038/s41380-019-0486-1',
        tier: 1,
      },
      {
        id: '6',
        text: 'Quality of life impairment in PMDD',
        source: "Archives of Women's Mental Health",
        year: '2020',
        link: 'https://doi.org/10.1007/s00737-020-01028-y',
        tier: 1,
      },
      {
        id: '7',
        text: 'Cognitive behavioral therapy for PMDD',
        source: 'JAMA Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1001/jamapsychiatry.2019.0216',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            You're fine for three weeks. Then, like clockwork, darkness descends. Rage, despair, hopelessness crash over you. You can't concentrate, can't sleep, can't tolerate being around people. Everything feels unbearable. Then your period starts, and within a day or two, you're yourself again---until next month. This cyclical nightmare isn't 'just PMS"---it's Premenstrual Dysphoric Disorder, and it's a diagnosable, treatable condition.
          </p>
          <p className="mb-6">
            Premenstrual Dysphoric Disorder (PMDD) is a severe form of premenstrual syndrome characterized by marked mood disturbance, irritability, and physical symptoms that occur in the luteal phase of the menstrual cycle (the week or two before menstruation) and resolve within days of menstruation onset <Citation id="2" index={2} source="American Psychiatric Association" year="2022" tier={4} />. It affects approximately 5% of menstruating individuals and causes significant impairment in work, relationships, and quality of life <Citation id="1" index={1} source="American Journal of Psychiatry" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="pmdd-vs-pms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          PMDD vs. PMS
        </h2>

        <ComparisonTable
          title="Premenstrual Syndrome vs. Premenstrual Dysphoric Disorder"
          columns={['Feature', 'PMS', 'PMDD']}
          items={[
            { feature: 'Prevalence', values: ['20-30% of menstruating people', '3-8%'] },
            { feature: 'Severity', values: ['Mild to moderate symptoms', 'Severe, disabling symptoms'] },
            { feature: 'Mood symptoms', values: ['Mild irritability, mood swings', 'Marked depression, anxiety, rage'] },
            { feature: 'Functional impairment', values: ['Minimal---manageable with coping', 'Significant---interferes with work, relationships, daily life'] },
            { feature: 'Timing', values: ['Luteal phase', 'Luteal phase (same)'] },
            { feature: 'Resolution', values: ['Improves with menstruation', 'Rapid resolution within days of menses (same)'] },
            { feature: 'Treatment', values: ['Lifestyle changes often sufficient', 'Requires medical treatment (medication)'] },
          ]}
          highlightColumn={2}
        />

        <p className="mb-6">
          <strong>Key distinction:</strong> PMS is uncomfortable; PMDD is disabling. PMS affects quality of life; PMDD can be life-threatening (suicidal ideation is common during severe PMDD episodes).
        </p>

        <h2 id="symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Symptoms
        </h2>

        <ArticleCallout variant="clinical-note" title="DSM-5-TR Diagnostic Criteria (Simplified)">
          <p className="mb-4"><strong>A. At least 5 of the following symptoms present in the week before menses, improve within days of menses onset, minimal/absent in the week post-menses:</strong></p>
          <p className="mb-4"><strong>Mood/Emotional (at least one):</strong></p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Marked mood swings (suddenly sad, tearful, or sensitive to rejection)</li>
            <li>Marked irritability, anger, or increased interpersonal conflicts</li>
            <li>Marked depressed mood, hopelessness, self-deprecating thoughts</li>
            <li>Marked anxiety, tension, feeling "on edge"</li>
          </ol>
          <p className="mb-4"><strong>Behavioral/Physical (at least one additional):</strong></p>
          <ol className="list-decimal pl-6 mb-4 space-y-2" start={5}>
            <li>Decreased interest in usual activities</li>
            <li>Difficulty concentrating</li>
            <li>Lethargy, fatigue, marked lack of energy</li>
            <li>Marked change in appetite, overeating, specific food cravings</li>
            <li>Hypersomnia or insomnia</li>
            <li>Feeling overwhelmed or out of control</li>
            <li>Physical symptoms: breast tenderness, joint/muscle pain, bloating, weight gain</li>
          </ol>
          <p className="mb-4"><strong>B. Symptoms interfere significantly with work, school, relationships, or social activities</strong></p>
          <p className="mb-4"><strong>C. Symptoms are not merely an exacerbation of another disorder (like major depression)</strong></p>
          <p><strong>D. Confirmed by prospective daily ratings over at least two symptomatic cycles</strong></p>
        </ArticleCallout>

        <h2 id="pattern" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Cyclical Pattern
        </h2>
        <p className="mb-6">
          The defining feature of PMDD is its predictable timing tied to the menstrual cycle:
        </p>

        <ArticleChart
          type="line"
          title="PMDD Symptom Severity Across Menstrual Cycle"
          data={[
            { label: 'Days 1-7 (menses)', value: 1 },
            { label: 'Days 8-14 (follicular)', value: 0 },
            { label: 'Days 15-21 (early luteal)', value: 3 },
            { label: 'Days 22-28 (late luteal)', value: 9 },
            { label: 'Day 1 (menses start)', value: 2 },
            { label: 'Days 2-7', value: 0 },
          ]}
          source="Typical pattern, severity 0-10 scale"
        />

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Symptom-free window:</strong> First half of cycle (follicular phase) is typically symptom-free or very mild</li>
          <li><strong>Symptom onset:</strong> Symptoms begin 1-2 weeks before period (ovulation or shortly after)</li>
          <li><strong>Peak severity:</strong> Worst in the few days before menstruation</li>
          <li><strong>Rapid resolution:</strong> Dramatic improvement within 1-2 days of menstrual flow starting</li>
          <li><strong>Predictability:</strong> Pattern repeats every cycle</li>
        </ul>

        <ArticleCallout variant="did-you-know">
          <p>Many people with PMDD describe feeling like "Dr. Jekyll and Mr. Hyde"---two different people depending on cycle phase. The rapid shift from severe symptoms to normal functioning can be disorienting and make others doubt the severity ("but you were fine yesterday!").</p>
        </ArticleCallout>

        <h2 id="biology" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Causes PMDD?
        </h2>
        <p className="mb-6">
          PMDD is not caused by abnormal hormone levels. People with PMDD have normal ovarian hormone fluctuations---the difference is in how the brain responds to those normal changes <Citation id="5" index={5} source="Molecular Psychiatry" year="2019" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Normal hormonal fluctuation',
              description: (
                <p>After ovulation, progesterone rises during the luteal phase. This is normal for all menstruating people.</p>
              ),
            },
            {
              title: 'Progesterone metabolite (allopregnanolone)',
              description: (
                <p>Progesterone is metabolized into allopregnanolone, a neurosteroid that acts on GABA receptors in the brain (same system affected by alcohol and benzodiazepines).</p>
              ),
            },
            {
              title: 'Abnormal brain sensitivity in PMDD',
              description: (
                <p>People with PMDD have altered GABA receptor function or sensitivity to allopregnanolone. Their brains respond abnormally to the normal hormonal changes, causing mood destabilization.</p>
              ),
            },
            {
              title: 'Serotonin dysregulation',
              description: (
                <p>Progesterone metabolites also affect serotonin activity. Altered serotonin function during the luteal phase contributes to mood and behavioral symptoms.</p>
              ),
            },
          ]}
        />

        <p className="mb-6">
          This explains why hormone levels are normal in PMDD and why the solution isn't simply "balancing hormones"---it's either suppressing ovulation entirely (eliminating hormonal fluctuation) or modulating the brain's serotonergic response.
        </p>

        <h2 id="impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Living with PMDD
        </h2>
        <p className="mb-6">
          PMDD profoundly impacts every area of life <Citation id="6" index={6} source="Archives of Women's Mental Health" year="2020" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Report work impairment during luteal phase' },
            { value: 70, suffix: '%', label: 'Report relationship conflict due to PMDD' },
            { value: 30, suffix: '%', label: 'Experience suicidal ideation during severe episodes' },
          ]}
          source="Archives of Women's Mental Health, 2020"
        />

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Occupational:</strong> Calling in sick, reduced productivity, conflicts with coworkers, job loss</li>
          <li><strong>Relationships:</strong> Arguments, withdrawal, feeling like a burden, strained partnerships</li>
          <li><strong>Parenting:</strong> Guilt over irritability with children, feeling like a "bad mother" 2 weeks/month</li>
          <li><strong>Self-concept:</strong> Loss of identity, not recognizing yourself during symptomatic phase</li>
          <li><strong>Safety:</strong> Suicidal thoughts, self-harm, impulsive behaviors during severe episodes</li>
        </ul>

        <QuoteBlock
          quote="For two weeks every month, I become someone I don't recognize. I rage at my partner over nothing. I'm convinced everything is falling apart. I've called in sick to work because I can't function. Then my period starts, and it's like a switch flips---I'm fine again. It's exhausting and terrifying."
          attribution="Anonymous patient with PMDD"
          role="Describing the monthly cycle"
          variant="large"
        />

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Diagnosis
        </h2>
        <p className="mb-6">
          <strong>Prospective daily symptom tracking is essential</strong> for diagnosis. Retrospective recall is unreliable---people tend to either underestimate or overestimate symptom severity and timing.
        </p>

        <ArticleCallout variant="tip" title="How to Track Symptoms">
          <ul className="list-disc pl-6 space-y-2">
            <li>Use a daily symptom diary or app (Daily Record of Severity of Problems---DRSP---is the validated tool)</li>
            <li>Rate symptoms daily for at least 2 consecutive cycles</li>
            <li>Track mood, physical symptoms, functional impairment</li>
            <li>Note cycle day and menstruation dates</li>
            <li>Bring completed tracker to appointment for diagnosis confirmation</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          The pattern of symptoms---absent in follicular phase, severe in luteal phase, rapid resolution with menses---is diagnostic.
        </p>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'ssris',
              title: 'SSRIs (First-Line Treatment)',
              content: (
                <div>
                  <p className="mb-4">Selective serotonin reuptake inhibitors are highly effective for PMDD <Citation id="3" index={3} source="Journal of Clinical Psychiatry" year="2021" tier={1} />:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Dosing options:</strong> Continuous daily dosing OR luteal-phase-only dosing (start at ovulation, stop at menses)</li>
                    <li><strong>Rapid onset:</strong> Unlike depression (4-6 weeks), SSRIs work within days for PMDD</li>
                    <li><strong>Effectiveness:</strong> 60-70% response rate</li>
                    <li><strong>Common SSRIs used:</strong> Sertraline, fluoxetine, paroxetine, escitalopram</li>
                  </ul>
                  <p>FDA-approved SSRIs for PMDD: fluoxetine, sertraline, paroxetine.</p>
                </div>
              ),
            },
            {
              id: 'hormonal',
              title: 'Hormonal Contraceptives',
              content: (
                <div>
                  <p className="mb-4">Suppressing ovulation eliminates hormonal fluctuation <Citation id="4" index={4} source="Obstetrics & Gynecology" year="2020" tier={1} />:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Drospirenone-containing birth control pills:</strong> Yaz (24-day active pills) is FDA-approved for PMDD</li>
                    <li><strong>Continuous birth control:</strong> Skip placebo weeks to eliminate menstruation and hormonal cycling</li>
                    <li><strong>GnRH agonists:</strong> Induce temporary medical menopause; reserved for severe, treatment-resistant PMDD</li>
                  </ul>
                  <p>Effectiveness varies; some people respond well to hormonal suppression, others don't or can't tolerate side effects.</p>
                </div>
              ),
            },
            {
              id: 'cbt',
              title: 'Cognitive Behavioral Therapy',
              content: (
                <div>
                  <p className="mb-4">CBT adapted for PMDD helps manage symptoms <Citation id="7" index={7} source="JAMA Psychiatry" year="2019" tier={1} />:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Identifying and challenging negative automatic thoughts during luteal phase</li>
                    <li>Behavioral coping strategies for irritability and mood swings</li>
                    <li>Stress management and relaxation techniques</li>
                    <li>Interpersonal skills for managing conflict</li>
                  </ul>
                  <p className="mt-4">CBT is less effective than medication but can be helpful as adjunct or for those who can't/won't use medication.</p>
                </div>
              ),
            },
            {
              id: 'lifestyle',
              title: 'Lifestyle Interventions',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Regular exercise (shown to reduce symptom severity)</li>
                  <li>Calcium and vitamin B6 supplementation (modest benefit)</li>
                  <li>Sleep hygiene and stress reduction</li>
                  <li>Limiting caffeine, alcohol, and high-sodium foods during luteal phase</li>
                  <li>Tracking symptoms to anticipate and plan around difficult days</li>
                </ul>
              ),
            },
            {
              id: 'surgical',
              title: 'Surgical Option (Last Resort)',
              content: (
                <p>Bilateral oophorectomy (removal of ovaries) permanently eliminates hormonal cycling and is curative for PMDD. Reserved for severe, treatment-resistant cases after all other options exhausted. Requires hormone replacement therapy to prevent surgical menopause complications.</p>
              ),
            },
          ]}
        />

        <p className="mb-6">
          <strong>Most people start with SSRIs,</strong> either daily or luteal-phase-only. If SSRIs are ineffective or not tolerated, hormonal contraceptives are next line. Combination of SSRI + hormonal treatment is also an option.
        </p>

        <h2 id="getting-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When and How to Seek Help
        </h2>
        <p className="mb-6">
          <strong>Seek evaluation if you experience:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Marked mood swings, irritability, depression, or anxiety that predictably occur in the week(s) before your period</li>
          <li>Symptoms that resolve within days of menstruation starting</li>
          <li>Significant interference with work, relationships, or daily functioning during the luteal phase</li>
          <li>Feeling like a different person depending on cycle phase</li>
          <li>Suicidal thoughts during the premenstrual phase (seek immediate help if present)</li>
        </ul>

        <p className="mb-6">
          <strong>How to prepare for your appointment:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Complete 2 cycles of daily symptom tracking before appointment (bring the tracker)</li>
          <li>Be specific about timing: "I'm fine from day 1 to 14, then symptoms start around ovulation and peak right before my period"</li>
          <li>Describe functional impairment: "I've called in sick to work," "I've had major arguments with my partner," "I can't concentrate at work"</li>
          <li>Mention if you've tried lifestyle changes (exercise, diet, stress reduction) and whether they helped</li>
          <li>Ask specifically about PMDD—some providers may dismiss symptoms as "normal PMS" without recognizing the severity</li>
        </ul>

        <ArticleCallout variant="warning" title="PMDD Can Be Life-Threatening">
          <p className="mb-4">Approximately 30% of people with PMDD experience suicidal ideation during severe luteal-phase episodes. Some experience complete despair and hopelessness that feels unbearable.</p>
          <p className="mb-4"><strong>If you're experiencing suicidal thoughts:</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Call 988 Suicide & Crisis Lifeline or text HOME to 741741</li>
            <li>Go to nearest emergency room if you're in immediate danger</li>
            <li>Recognize that these feelings are symptoms of PMDD, not reality—they will pass when your period starts, and treatment can prevent them from returning</li>
          </ul>
        </ArticleCallout>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>PMDD is a severe form of premenstrual syndrome affecting 3-8% of menstruating people, characterized by marked mood disturbance (depression, anxiety, rage) and functional impairment during the luteal phase</li>
            <li>Unlike PMS (uncomfortable but manageable), PMDD is disabling and can be life-threatening, with 30% experiencing suicidal ideation during severe episodes</li>
            <li>The hallmark of PMDD is predictable timing: symptoms are minimal in the follicular phase (days 1-14), peak in the late luteal phase (days 22-28), and resolve rapidly within 1-2 days of menstruation starting</li>
            <li>PMDD is not caused by abnormal hormone levels but by the brain's abnormal sensitivity to normal hormonal fluctuations—specifically altered GABA receptor response to progesterone metabolites</li>
            <li>Diagnosis requires prospective daily symptom tracking for at least 2 cycles (retrospective recall is unreliable)—use the DRSP tool or menstrual tracking app</li>
            <li>First-line treatment is SSRIs (60-70% response rate), which work within days for PMDD unlike the weeks required for depression. Both continuous and luteal-phase-only dosing are effective</li>
            <li>Hormonal contraceptives that suppress ovulation (like Yaz) are second-line, and severe treatment-resistant cases may require GnRH agonists or even surgical menopause as last resort</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          If you experience severe, cyclical mood disturbances that disrupt your life every month, track your symptoms for two cycles and seek evaluation. PMDD is real, it's not "in your head," and it's highly treatable. You don't have to suffer through two weeks of hell every month for the rest of your reproductive years. Effective treatment exists, and you deserve relief.
        </p>
      </>
    ),
  },

  {
    id: catId(20),
    slug: 'situational-vs-clinical-depression',
    title: 'Situational Depression vs. Clinical Depression: Understanding Adjustment Disorders',
    description: 'How to distinguish between normal sadness after life stress and clinical depression. Learn about adjustment disorders, when grief becomes depression, and treatment.',
    image: "/images/articles/cat07/cover-020.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Adjustment Disorder', 'Situational Depression', 'Grief', 'Reactive Depression'],
    summary: 'The line between normal stress response, adjustment disorder, and major depression is often blurry. Having a clear trigger doesn\'t mean symptoms will resolve on their own—many MDD episodes are stress-triggered and require treatment regardless of what started them.',
    keyFacts: [
      { text: 'Adjustment disorder involves distress or impairment out of proportion to a stressor, occurring within 3 months of the stressor and resolving within 6 months of the stressor ending', citationIndex: 2 },
      { text: '70% of people with major depressive disorder report an identifiable stressor before onset, but having a trigger doesn\'t make it "just situational" or mean treatment isn\'t needed', citationIndex: 7 },
      { text: 'The key distinction: if you meet full MDD criteria (5+ symptoms for 2+ weeks including depressed mood/anhedonia), you have MDD regardless of whether a stressor triggered it', citationIndex: 3 },
      { text: 'Normal grief involves waves of sadness with intact self-esteem; grief WITH depression includes pervasive anhedonia, worthlessness, and suicidal thoughts about ending one\'s own suffering', citationIndex: 5 },
      { text: 'Brief psychotherapy is first-line for adjustment disorders and achieves good outcomes, while major depression typically requires medication and/or longer-term therapy', citationIndex: 4 },
    ],
    sparkMoment: 'Don\'t dismiss your suffering because it makes sense in context—depression is depression, and it\'s treatable whether it started with a clear trigger or seemed to appear from nowhere.',
    practicalExercise: {
      title: 'Self-Assessment: Normal Stress or Clinical Depression?',
      steps: [
        { title: 'Count your symptoms', description: 'Over the past 2 weeks, count how many DSM depression symptoms you have (depressed mood, anhedonia, sleep change, appetite change, fatigue, worthlessness/guilt, concentration problems, psychomotor changes, suicidal thoughts). 5+ = meets MDD threshold.' },
        { title: 'Assess functioning', description: 'Rate impairment in work, relationships, and self-care on a scale of 0-10. Significant impairment (7+) suggests need for help regardless of whether symptoms meet MDD criteria.' },
        { title: 'Track duration and trajectory', description: 'How long have symptoms persisted? Are they improving, stable, or worsening? Symptoms worsening or persisting beyond 3-4 weeks despite support suggest more than normal stress response.' },
        { title: 'Consider your history', description: 'Do you have prior depression episodes? Family history? If yes, stressor may have triggered MDD recurrence rather than adjustment disorder.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Assess Your Symptoms',
    },
    citations: [
      {
        id: '1',
        text: 'Adjustment disorders: Current perspectives and future directions',
        source: 'Journal of Affective Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jad.2020.04.006',
        tier: 1,
      },
      {
        id: '2',
        text: 'DSM-5-TR: Adjustment Disorders diagnostic criteria',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://www.psychiatry.org/psychiatrists/practice/dsm',
        tier: 4,
      },
      {
        id: '3',
        text: 'Differentiating adjustment disorder from major depression: Clinical implications',
        source: 'Depression and Anxiety',
        year: '2019',
        link: 'https://doi.org/10.1002/da.22865',
        tier: 1,
      },
      {
        id: '4',
        text: 'Brief psychotherapy for adjustment disorders: Meta-analysis',
        source: 'American Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1176/appi.ajp.2019.19060595',
        tier: 1,
      },
      {
        id: '5',
        text: 'Normal grief vs. major depression vs. complicated grief',
        source: 'JAMA',
        year: '2021',
        link: 'https://doi.org/10.1001/jama.2021.2333',
        tier: 1,
      },
      {
        id: '6',
        text: 'When does sadness become depression? Thresholds and clinical judgment',
        source: 'British Journal of Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1192/bjp.2019.101',
        tier: 1,
      },
      {
        id: '7',
        text: 'Resilience factors in adjustment to life stressors',
        source: 'Psychological Medicine',
        year: '2020',
        link: 'https://doi.org/10.1017/S0033291720001464',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            You lost your job. Your relationship ended. You moved to a new city. You're grieving a death. It's normal to feel sad, anxious, or overwhelmed in response to major life stressors. But when does normal distress cross the line into something requiring professional help? How do you distinguish between appropriate sadness and clinical depression?
          </p>
          <p className="mb-6">
            "Situational depression" (not a clinical term) typically refers to depressive symptoms triggered by identifiable life stressors. Clinically, this may be an adjustment disorder with depressed mood---emotional/behavioral symptoms in response to a stressor that are more severe than expected but don't meet full criteria for major depressive disorder <Citation id="2" index={2} source="American Psychiatric Association" year="2022" tier={4} />. Understanding the distinction between adjustment disorders and clinical depression matters because it informs treatment approach and prognosis <Citation id="3" index={3} source="Depression and Anxiety" year="2019" tier={1} />.
          </p>
        </div>

        <h2 id="definitions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Definitions
        </h2>

        <ComparisonTable
          title="Normal Stress Response vs. Adjustment Disorder vs. Major Depression"
          columns={['Condition', 'Key Features']}
          items={[
            {
              feature: 'Normal Stress Response',
              values: ['Sad/anxious but proportionate to stressor; Functioning maintained; Coping strategies effective; Gradual improvement as stressor resolves; No treatment needed beyond support'],
            },
            {
              feature: 'Adjustment Disorder',
              values: ['Emotional/behavioral symptoms in response to identifiable stressor; Symptoms more severe than expected; Significant distress or impairment; Onset within 3 months of stressor; Resolves within 6 months of stressor ending; Does not meet criteria for MDD'],
            },
            {
              feature: 'Major Depressive Disorder (MDD)',
              values: ['Meets DSM criteria (5+ symptoms for 2+ weeks); May or may not have identifiable trigger; Symptoms persist regardless of circumstances; Severe functional impairment; Requires professional treatment'],
            },
          ]}
          highlightColumn={0}
        />

        <h2 id="adjustment-disorder" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Adjustment Disorder: The Middle Ground
        </h2>
        <p className="mb-6">
          Adjustment disorder occupies the space between normal stress response and clinical depression <Citation id="1" index={1} source="Journal of Affective Disorders" year="2020" tier={1} />:
        </p>

        <ArticleCallout variant="clinical-note" title="DSM-5-TR Criteria for Adjustment Disorder">
          <p className="mb-4"><strong>A.</strong> Emotional or behavioral symptoms in response to an identifiable stressor(s), occurring within 3 months of onset of the stressor(s)</p>
          <p className="mb-4"><strong>B.</strong> These symptoms are clinically significant, as evidenced by one or both:</p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Marked distress out of proportion to the severity or intensity of the stressor</li>
            <li>Significant impairment in social, occupational, or other important areas of functioning</li>
          </ol>
          <p className="mb-4"><strong>C.</strong> Does not meet criteria for another mental disorder and is not merely an exacerbation of a preexisting mental disorder</p>
          <p className="mb-4"><strong>D.</strong> Symptoms are not normal bereavement</p>
          <p><strong>E.</strong> Once the stressor (or its consequences) has terminated, the symptoms do not persist for more than an additional 6 months</p>
        </ArticleCallout>

        <p className="mb-6">
          <strong>Subtypes:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>With depressed mood:</strong> Low mood, tearfulness, hopelessness</li>
          <li><strong>With anxiety:</strong> Nervousness, worry, jitteriness</li>
          <li><strong>With mixed anxiety and depressed mood</strong></li>
          <li><strong>With disturbance of conduct:</strong> Acting out, rule-breaking</li>
          <li><strong>With mixed disturbance of emotions and conduct</strong></li>
          <li><strong>Unspecified</strong></li>
        </ul>

        <h2 id="how-to-distinguish" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Distinguish
        </h2>
        <p className="mb-6">
          The boundary between adjustment disorder and major depression can be blurry <Citation id="6" index={6} source="British Journal of Psychiatry" year="2019" tier={1} />. Key questions:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'symptom-count',
              title: '1. Do you meet full MDD criteria?',
              content: (
                <div>
                  <p className="mb-4">If you have 5+ depressive symptoms nearly every day for 2+ weeks, including depressed mood or anhedonia, you meet criteria for MDD---even if symptoms were triggered by a life event.</p>
                  <p>Having an identifiable stressor doesn't rule out MDD. Many depressive episodes are triggered by life events.</p>
                </div>
              ),
            },
            {
              id: 'proportionality',
              title: '2. Is your response proportionate to the stressor?',
              content: (
                <div>
                  <p className="mb-4">Adjustment disorder requires that distress is "out of proportion" to the stressor. But this is subjective:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>What seems like overreaction to an observer may be reasonable given the person's context, history, resources</li>
                    <li>Major life events (death, divorce, job loss) warrant significant distress</li>
                    <li>Minor stressors causing severe, prolonged impairment suggest vulnerability beyond the stressor itself</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'timeline',
              title: '3. How long have symptoms persisted?',
              content: (
                <div>
                  <p className="mb-4">Adjustment disorder symptoms should resolve within 6 months of stressor ending. If symptoms persist longer, consider MDD.</p>
                  <p>However, some stressors are ongoing (chronic illness, abusive relationship), making this criterion difficult to apply.</p>
                </div>
              ),
            },
            {
              id: 'context',
              title: '4. Does removing or resolving the stressor improve symptoms?',
              content: (
                <div>
                  <p className="mb-4">In adjustment disorder, symptoms are directly tied to the stressor. If the stressor resolves (you get a new job, relationship ends, you adjust to new city), symptoms improve.</p>
                  <p>In MDD, symptoms persist even when circumstances improve. Depression has taken on a life of its own independent of the trigger.</p>
                </div>
              ),
            },
            {
              id: 'past-history',
              title: '5. Do you have a history of depression?',
              content: (
                <p>If you have prior episodes of MDD, current symptoms triggered by a stressor are more likely a recurrent MDD episode than an adjustment disorder. Stressors often trigger MDD in vulnerable individuals.</p>
              ),
            },
          ]}
        />

        <BeforeAfter
          before={{
            title: 'Likely Adjustment Disorder',
            content: (
              <div>
                <p className="mb-4"><em>Example: Job loss</em></p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Sad, anxious, struggling to sleep for a few weeks after losing job</li>
                  <li>3-4 depressive symptoms (not meeting MDD threshold)</li>
                  <li>Can still engage with hobbies, friends when prompted</li>
                  <li>Improves as you adjust, start job search, find new employment</li>
                  <li>No prior depression history</li>
                </ul>
              </div>
            ),
          }}
          after={{
            title: 'Likely Major Depression (Triggered by Stressor)',
            content: (
              <div>
                <p className="mb-4"><em>Example: Job loss</em></p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Job loss triggers full MDD episode (5+ symptoms for 2+ weeks)</li>
                  <li>Profound anhedonia, hopelessness, can't enjoy anything</li>
                  <li>Suicidal thoughts, severe functional impairment</li>
                  <li>Symptoms persist even after finding new job or months later</li>
                  <li>Prior history of depression</li>
                </ul>
              </div>
            ),
          }}
        />

        <ArticleCallout variant="key-takeaway">
          <p>Here's the critical point: <strong>Having a trigger doesn't mean it's 'just situational' and will go away on its own.</strong> Many MDD episodes are triggered by life events. If someone meets criteria for MDD, professional support is recommended---regardless of whether a stressor started it.</p>
        </ArticleCallout>

        <h2 id="grief" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Grief vs. Depression
        </h2>
        <p className="mb-6">
          One of the most common dilemmas: Is this normal grief or is it depression? <Citation id="5" index={5} source="JAMA" year="2021" tier={1} />
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'normal-grief',
              label: 'Normal Grief',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Intense sadness, yearning, preoccupation with deceased</li>
                  <li>Comes in waves, often triggered by reminders</li>
                  <li>Can experience positive emotions alongside sadness</li>
                  <li>Self-esteem generally intact ("I miss them" not "I'm worthless")</li>
                  <li>Functioning impaired but gradually improving</li>
                  <li>Suicidal thoughts, if present, are about joining the deceased</li>
                  <li>Improves over time (months to years)</li>
                </ul>
              ),
            },
            {
              id: 'grief-depression',
              label: 'Grief WITH Depression',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Pervasive depressed mood, not just grief</li>
                  <li>Anhedonia---can't feel pleasure, even in things unrelated to loss</li>
                  <li>Feelings of worthlessness, guilt beyond bereaved person's actions</li>
                  <li>Psychomotor retardation or agitation</li>
                  <li>Suicidal thoughts about ending own suffering (not joining deceased)</li>
                  <li>Significant functional impairment that doesn't improve</li>
                  <li>Meets full criteria for major depressive episode</li>
                </ul>
              ),
            },
            {
              id: 'complicated-grief',
              label: 'Prolonged Grief Disorder',
              content: (
                <div>
                  <p className="mb-4">Intense, persistent grief that doesn't ease with time (12+ months). Features:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Intense yearning/longing for deceased</li>
                    <li>Preoccupation with thoughts/memories of deceased</li>
                    <li>Difficulty accepting the death</li>
                    <li>Emotional numbness or feeling life is meaningless</li>
                    <li>Avoidance of reminders or excessive proximity-seeking</li>
                    <li>Significant impairment in functioning</li>
                  </ul>
                  <p className="mt-4">Requires specialized grief therapy (e.g., complicated grief treatment).</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment Differences
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Adjustment Disorder',
              description: (
                <div>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Brief psychotherapy</strong> is first-line treatment <Citation id="4" index={4} source="American Journal of Psychiatry" year="2020" tier={1} /></li>
                    <li>Problem-solving therapy, supportive counseling, brief CBT</li>
                    <li>Focus on building coping skills, processing stressor, mobilizing support</li>
                    <li>Medication generally not needed unless anxiety/insomnia severe</li>
                    <li>Prognosis: Good---most people recover within months</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Major Depression (Even if Triggered)',
              description: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Antidepressant medication and/or psychotherapy</li>
                    <li>Moderate-severe depression: medication + therapy combination</li>
                    <li>Standard MDD treatment protocols apply</li>
                    <li>Duration: Acute treatment (2-3 months), continuation (4-9 months), possible maintenance</li>
                    <li>Without treatment, symptoms likely persist even if stressor resolves</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="resilience" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Resilience and Vulnerability
        </h2>
        <p className="mb-6">
          Why do some people develop MDD after a stressor while others experience adjustment symptoms that resolve? <Citation id="7" index={7} source="Psychological Medicine" year="2020" tier={1} />
        </p>

        <StatCard
          stats={[
            { value: 70, suffix: '%', label: 'Of people with MDD report identifiable stressor before onset' },
            { value: 30, suffix: '%', label: 'Report no clear trigger' },
            { value: 10, suffix: '%', label: 'Of people exposed to major stressor develop MDD' },
          ]}
          source="Psychological Medicine, 2020"
        />

        <p className="mb-6">
          <strong>Resilience factors</strong> (protective):
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Strong social support network</li>
          <li>Effective coping skills and emotion regulation</li>
          <li>Optimistic explanatory style</li>
          <li>Prior history of successfully navigating adversity</li>
          <li>Stable housing, financial security, employment</li>
          <li>Access to mental health resources</li>
        </ul>

        <p className="mb-6">
          <strong>Vulnerability factors</strong> (increase MDD risk):
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Prior history of depression or anxiety</li>
          <li>Family history of depression</li>
          <li>Childhood adversity/trauma</li>
          <li>Chronic stress or multiple concurrent stressors</li>
          <li>Social isolation, poor support</li>
          <li>Maladaptive coping (avoidance, substance use)</li>
        </ul>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Help
        </h2>
        <p className="mb-6">
          Seek professional evaluation if:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Symptoms persist beyond 2-3 weeks or worsen over time</li>
          <li>You meet 5+ depressive symptoms most days</li>
          <li>Functioning is significantly impaired (can't work, care for self, maintain relationships)</li>
          <li>You have suicidal thoughts or self-harm urges</li>
          <li>You're not improving despite support and time</li>
          <li>Coping strategies aren't working</li>
          <li>You're using substances to cope</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>Don't wait to see if it's 'just situational' or if you "really need help." If you're struggling, that's enough. Early intervention prevents progression to chronic depression and reduces suffering. You don't have to meet some threshold of misery before you deserve support.</p>
        </ArticleCallout>

        <h2 id="common-pitfalls" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Pitfalls and Misconceptions
        </h2>
        <p className="mb-6">
          Several dangerous myths prevent people from seeking help when they need it:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li><strong>"It's just situational, so I don't need treatment."</strong> Having a trigger doesn't mean symptoms will resolve on their own. If a person meets MDD criteria, seeking professional support is recommended—regardless of what started it. The stressor may have been the match, but now there's a fire that requires intervention.</li>
          <li><strong>"I'm just weak for not handling this better."</strong> Vulnerability to depression after stress isn't weakness—it reflects biology (genetics, brain chemistry, prior experiences). Two people facing identical stressors respond differently because of factors beyond willpower.</li>
          <li><strong>"Time will heal this."</strong> Time alone doesn't treat depression. Untreated MDD often persists for months or years and increases risk for chronic depression, substance use, and suicide. Early treatment changes trajectory.</li>
          <li><strong>"My problems are real, so it can't be clinical depression."</strong> Real problems can trigger real depression. The two aren't mutually exclusive. You can acknowledge your stressors while also recognizing that your brain's response has become disordered and requires treatment.</li>
          <li><strong>"I need to hit rock bottom before I deserve help."</strong> You don't have to be non-functional or suicidal to warrant treatment. If you're struggling, that's enough. Early intervention is easier and more effective than waiting until crisis.</li>
        </ul>

        <QuoteBlock
          quote="I kept telling myself it was just stress from the divorce—it would pass. But six months later, I was worse, not better. Getting treatment felt like admitting failure. Now I realize waiting was the failure. I could have been feeling better months earlier."
          attribution="Anonymous patient"
          role="Reflecting on delayed treatment"
          variant="large"
        />

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>"Situational depression" is not a clinical diagnosis—it typically refers to adjustment disorder (symptoms in response to stressor, more severe than expected, resolving within 6 months) or stress-triggered major depressive disorder</li>
            <li>If you meet full MDD criteria (5+ symptoms for 2+ weeks), you have major depression regardless of whether a life event triggered it. Having a clear stressor doesn't rule out MDD</li>
            <li>The key question is not "did something cause this?" but "do I meet diagnostic criteria, and is functioning impaired?" If yes to both, you need professional treatment</li>
            <li>Approximately 70% of MDD episodes are preceded by identifiable stressors—stress-triggered depression is still depression and requires the same evidence-based treatment as "endogenous" depression</li>
            <li>Normal grief involves waves of intense sadness with intact self-esteem; depression includes pervasive anhedonia (inability to feel pleasure), worthlessness beyond the loss, and suicidal thoughts about ending suffering</li>
            <li>Adjustment disorders respond well to brief psychotherapy (problem-solving therapy, supportive counseling, CBT), while major depression typically requires medication and/or longer-term therapy</li>
            <li>Don't wait to see if symptoms are "just situational"—if you're struggling beyond 2-3 weeks, experiencing functional impairment, or meeting MDD criteria, seek evaluation. Early intervention prevents chronicity</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          Whether your depression started with a clear trigger or seemed to appear out of nowhere, if it's causing significant distress or impairment, you deserve help. The distinction between "situational" and "clinical" matters less than the fact that you're suffering and treatment can help. Don't dismiss your symptoms because they make sense in context. Depression is depression—and it's treatable.
        </p>
      </>
    ),
  },
];
