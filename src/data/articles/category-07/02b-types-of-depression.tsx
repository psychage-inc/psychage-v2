 
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
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Atypical Depression', 'Mood Reactivity', 'Rejection Sensitivity', 'Depression Subtypes'],
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
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When most people think of depression, they picture insomnia, loss of appetite, and unrelenting sadness. But some people with depression sleep excessively, crave carbs and gain weight, and can briefly feel better when something good happens—only to crash back down when the positive moment passes. This is atypical depression, and despite the name, it's actually quite common.
          </p>
          <p className="mb-6">
            "Atypical depression" is a specifier for major depressive disorder characterized by mood reactivity (mood brightens in response to positive events) plus specific features like increased appetite, hypersomnia, leaden paralysis, and rejection sensitivity <Citation id="2" index={2} source="American Psychiatric Association" year="2022" tier={4} />. It's called "atypical" because it doesn't match the classic melancholic presentation—but it affects 15-40% of people with depression, making it far from rare <Citation id="8" index={8} source="American Journal of Psychiatry" year="2020" tier={1} />.
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
                  <p className="mb-4">The defining feature. Your mood can temporarily improve in response to positive events—a compliment, good news, enjoyable activity. But it doesn't last:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You feel better while watching a funny movie, but the heaviness returns when it ends</li>
                    <li>A friend's visit lifts your spirits, but you crash when they leave</li>
                    <li>Good news at work brightens your day, but by evening you're back down</li>
                  </ul>
                  <p className="mt-4">This differs from melancholic depression, where mood is persistently low regardless of circumstances. But it doesn't mean "not really depressed"—the baseline depression is real, just temporarily responsive.</p>
                </div>
              ),
            },
            {
              id: 'hypersomnia',
              title: 'Hypersomnia',
              content: (
                <div>
                  <p className="mb-4">Excessive sleep—not just wanting to sleep but sleeping 10-14+ hours and still feeling exhausted. Difficulty waking, hitting snooze repeatedly, needing midday naps.</p>
                  <p className="mb-4">This contrasts with insomnia (more common in typical depression). In atypical depression, sleep doesn't refresh—you wake up feeling heavy and unrefreshed no matter how long you slept.</p>
                </div>
              ),
            },
            {
              id: 'appetite',
              title: 'Increased Appetite & Weight Gain',
              content: (
                <div>
                  <p className="mb-4">Significant increase in appetite, especially for carbohydrates (bread, pasta, sweets, comfort foods). "Emotional eating" to soothe mood. Often gain 10-20+ pounds during depressive episodes.</p>
                  <p className="mb-4">This is opposite of typical depression's loss of appetite and weight. The carb cravings may be biological—carbohydrates temporarily boost serotonin, providing brief mood lift.</p>
                </div>
              ),
            },
            {
              id: 'leaden-paralysis',
              title: 'Leaden Paralysis',
              content: (
                <div>
                  <p className="mb-4">A distinctive physical symptom: feeling like your arms and legs are weighted down with lead. Heavy, difficult to move, physically exhausting to do simple tasks <Citation id="6" index={6} source="Psychosomatics" year="2018" tier={1} />.</p>
                  <p className="mb-4">Different from general fatigue—it's a specific sensation of physical heaviness, like gravity is stronger. Can last hours or persist throughout the day.</p>
                </div>
              ),
            },
            {
              id: 'rejection-sensitivity',
              title: 'Interpersonal Rejection Sensitivity',
              content: (
                <div>
                  <p className="mb-4">Long-standing, extreme sensitivity to perceived rejection or criticism <Citation id="3" index={3} source="Journal of Affective Disorders" year="2019" tier={1} />. This is not just feeling hurt—it's:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Hyper-vigilant to signs of rejection in others" behavior</li>
                    <li>Interpreting neutral cues as rejection (they didn't text back—they hate me)</li>
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

        <ArticleCallout variant="did-you-know">
          <p>Despite being called "atypical," this presentation is extremely common, especially in outpatient settings, among women, and in people with earlier-onset depression. Some experts argue the term "atypical" is a misnomer since it's so prevalent <Citation id="1" index={1} source="Depression and Anxiety" year="2020" tier={1} />.</p>
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

        <h2 id="impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Living with Atypical Depression
        </h2>
        <p className="mb-6">
          The specific symptom pattern creates unique challenges:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Invalidation:</strong> Because you can feel better temporarily, others (and you) may dismiss the depression—"You seemed fine yesterday!" But brief mood lifting doesn't negate persistent depression.</li>
          <li><strong>Weight gain:</strong> Adds body image issues and shame to depression burden</li>
          <li><strong>Oversleeping:</strong> Creates guilt ("I'm lazy") and functional impairment (missing work, neglecting responsibilities)</li>
          <li><strong>Rejection sensitivity:</strong> Strains relationships, creates isolation, triggers depressive spirals</li>
          <li><strong>Chronic course:</strong> Atypical depression tends to be more chronic and start earlier than melancholic depression</li>
        </ul>

        <QuoteBlock
          quote="People think I'm not really depressed because I can laugh at a joke or enjoy a meal. But that moment of brightness just makes the crash harder. I'm still depressed—I just have brief windows where I can pretend I'm not."
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
            <li>Practice asking for clarification instead of assuming ("I noticed you didn't respond—are you upset, or just busy?")</li>
            <li>Delay reacting to perceived rejection (give yourself 24 hours before responding)</li>
            <li>Build distress tolerance for uncomfortable emotions</li>
            <li>Communicate your sensitivity to trusted others so they can provide reassurance</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          Atypical depression is real depression, despite the temporary mood reactivity. If you recognize this pattern in yourself, it's worth discussing with a mental health provider. Getting the right diagnosis can inform treatment choices and help you understand why your depression might look different from others'—but is no less valid or deserving of care.
        </p>
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
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You've tried three different antidepressants. You've been in therapy for months. You've changed your diet, started exercising, practiced meditation. Yet depression persists, barely budging despite your best efforts. If this is your experience, you may have treatment-resistant depression—and you're far from alone.
          </p>
          <p className="mb-6">
            Treatment-resistant depression (TRD) generally refers to major depression that hasn't adequately responded to at least two different antidepressant trials of adequate dose and duration <Citation id="1" index={1} source="Lancet Psychiatry" year="2021" tier={1} />. It affects approximately 30% of people with major depression <Citation id="2" index={2} source="JAMA Psychiatry" year="2020" tier={2} />. The term can feel hopeless, but it's actually a call to action—to investigate why standard treatments aren't working and to pursue more advanced interventions that often succeed where first-line treatments fail.
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
          Before concluding treatment resistance, it's essential to rule out <strong>pseudoresistance</strong>—apparent lack of response due to inadequate treatment rather than true biological resistance <Citation id="8" index={8} source="Journal of Clinical Psychiatry" year="2019" tier={1} />:
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
                    <li>No anesthesia, no sedation—can drive yourself to/from appointments</li>
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
                <li>Don't wait—move to augmentation or brain stimulation</li>
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
            <li>Ask your provider about TMS, ketamine, or ECT—don't wait for them to suggest it</li>
            <li>Request referral to specialty clinic or psychiatrist with TRD expertise</li>
            <li>Inquire about clinical trials for novel treatments</li>
            <li>Don't accept "we've tried everything' without exploring brain stimulation options</li>
            <li>Insurance often covers TMS and ECT for TRD; appeal denials if needed</li>
          </ul>
        </ArticleCallout>

        <QuoteBlock
          quote="I'd been depressed for eight years, tried seven medications, been in therapy for years. Nothing worked. I thought this was just my life. Then I did TMS. Within three weeks, I felt better than I had in nearly a decade. I wish I'd known about it years earlier."
          attribution="Anonymous patient"
          role="Recovering from treatment-resistant depression"
          variant="large"
        />

        <p className="mb-6">
          Treatment-resistant depression is frustrating, exhausting, and demoralizing. But "resistant" doesn't mean "hopeless." It means standard treatments haven't worked—not that nothing will work. Advanced options like TMS, ketamine, and ECT have high success rates even when multiple medications have failed. If you're stuck in persistent depression despite treatment, don't give up. Specialized care and advanced interventions exist, and they work. You deserve aggressive, expert treatment until you find what brings you relief.
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
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Depression is devastating on its own. But when it becomes so severe that you lose touch with reality—when you believe things that aren't true, when you hear voices no one else hears, when you're certain you've committed unforgivable sins or that you're rotting from the inside—the suffering transcends ordinary depression. This is psychotic depression, and it's a psychiatric emergency requiring immediate, specialized treatment.
          </p>
          <p className="mb-6">
            Psychotic depression is major depressive disorder with psychotic features—delusions (false fixed beliefs) and/or hallucinations (sensory experiences without external stimuli) occurring during a severe depressive episode <Citation id="2" index={2} source="American Psychiatric Association" year="2022" tier={4} />. It affects approximately 15-20% of people hospitalized for major depression and carries higher risk for suicide, longer episodes, greater functional impairment, and poorer response to standard antidepressants <Citation id="1" index={1} source="American Journal of Psychiatry" year="2020" tier={1} />.
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
                <p className="mb-4"><em>"I've destroyed everyone's lives. I'm evil. God is punishing me, and I deserve it. I can hear voices telling me I should die. My body is rotting from the inside—I can smell it. There's no point treating me; I'm already dead."</em></p>
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
          Psychotic depression requires specialized treatment—antidepressants alone are insufficient and often ineffective.
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
                  <p>Neither medication alone is adequate—psychotic depression requires both.</p>
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
                  <p className="mt-4">For psychotic depression, ECT is not a "last resort"—it's often the most appropriate and effective initial treatment.</p>
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
          <li><strong>Recurrence risk:</strong> High—50-70% experience another episode within 2-5 years</li>
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

        <p className="mb-6">
          Psychotic depression is one of the most severe forms of mental illness, but it's also one of the most treatable when correctly identified and aggressively managed. If you or a loved one is experiencing depression with psychotic symptoms—delusions, hallucinations, complete loss of functioning—seek emergency psychiatric care immediately. This is not something to wait out or try to manage on your own. With combination medication or ECT, recovery is not just possible—it's expected.
        </p>

        <p className="mb-6">
          <strong>If you or someone you know is experiencing psychotic depression symptoms, go to the nearest emergency room or call 911. This is a psychiatric emergency requiring immediate professional intervention.</strong>
        </p>
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
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['PMDD', 'Premenstrual Dysphoric Disorder', 'Hormonal Depression', 'Menstrual Cycle'],
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
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You're fine for three weeks. Then, like clockwork, darkness descends. Rage, despair, hopelessness crash over you. You can't concentrate, can't sleep, can't tolerate being around people. Everything feels unbearable. Then your period starts, and within a day or two, you're yourself again—until next month. This cyclical nightmare isn't 'just PMS"—it's Premenstrual Dysphoric Disorder, and it's a diagnosable, treatable condition.
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
            { feature: 'Functional impairment', values: ['Minimal—manageable with coping', 'Significant—interferes with work, relationships, daily life'] },
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
          <p>Many people with PMDD describe feeling like "Dr. Jekyll and Mr. Hyde"—two different people depending on cycle phase. The rapid shift from severe symptoms to normal functioning can be disorienting and make others doubt the severity ("but you were fine yesterday!").</p>
        </ArticleCallout>

        <h2 id="biology" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Causes PMDD?
        </h2>
        <p className="mb-6">
          PMDD is not caused by abnormal hormone levels. People with PMDD have normal ovarian hormone fluctuations—the difference is in how the brain responds to those normal changes <Citation id="5" index={5} source="Molecular Psychiatry" year="2019" tier={1} />:
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
          This explains why hormone levels are normal in PMDD and why the solution isn't simply "balancing hormones"—it's either suppressing ovulation entirely (eliminating hormonal fluctuation) or modulating the brain's serotonergic response.
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
          quote="For two weeks every month, I become someone I don't recognize. I rage at my partner over nothing. I'm convinced everything is falling apart. I've called in sick to work because I can't function. Then my period starts, and it's like a switch flips—I'm fine again. It's exhausting and terrifying."
          attribution="Anonymous patient with PMDD"
          role="Describing the monthly cycle"
          variant="large"
        />

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Diagnosis
        </h2>
        <p className="mb-6">
          <strong>Prospective daily symptom tracking is essential</strong> for diagnosis. Retrospective recall is unreliable—people tend to either underestimate or overestimate symptom severity and timing.
        </p>

        <ArticleCallout variant="tip" title="How to Track Symptoms">
          <ul className="list-disc pl-6 space-y-2">
            <li>Use a daily symptom diary or app (Daily Record of Severity of Problems—DRSP—is the validated tool)</li>
            <li>Rate symptoms daily for at least 2 consecutive cycles</li>
            <li>Track mood, physical symptoms, functional impairment</li>
            <li>Note cycle day and menstruation dates</li>
            <li>Bring completed tracker to appointment for diagnosis confirmation</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          The pattern of symptoms—absent in follicular phase, severe in luteal phase, rapid resolution with menses—is diagnostic.
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

        <p className="mb-6">
          If you experience severe, cyclical mood disturbances that disrupt your life every month, track your symptoms for two cycles and seek evaluation. PMDD is real, it's not "in your head, ' and it's highly treatable. You don't have to suffer through two weeks of hell every month for the rest of your reproductive years. Effective treatment exists, and you deserve relief.
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
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Adjustment Disorder', 'Situational Depression', 'Grief', 'Reactive Depression'],
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
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You lost your job. Your relationship ended. You moved to a new city. You're grieving a death. It's normal to feel sad, anxious, or overwhelmed in response to major life stressors. But when does normal distress cross the line into something requiring professional help? How do you distinguish between appropriate sadness and clinical depression?
          </p>
          <p className="mb-6">
            "Situational depression" (not a clinical term) typically refers to depressive symptoms triggered by identifiable life stressors. Clinically, this may be an adjustment disorder with depressed mood—emotional/behavioral symptoms in response to a stressor that are more severe than expected but don't meet full criteria for major depressive disorder <Citation id="2" index={2} source="American Psychiatric Association" year="2022" tier={4} />. Understanding the distinction between adjustment disorders and clinical depression matters because it informs treatment approach and prognosis <Citation id="3" index={3} source="Depression and Anxiety" year="2019" tier={1} />.
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
                  <p className="mb-4">If you have 5+ depressive symptoms nearly every day for 2+ weeks, including depressed mood or anhedonia, you meet criteria for MDD—even if symptoms were triggered by a life event.</p>
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
          <p>Here's the critical point: <strong>Having a trigger doesn't mean it's 'just situational' and will go away on its own.</strong> Many MDD episodes are triggered by life events. If you meet criteria for MDD, you need treatment—regardless of whether a stressor started it.</p>
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
                  <li>Anhedonia—can't feel pleasure, even in things unrelated to loss</li>
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
                    <li>Prognosis: Good—most people recover within months</li>
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

        <QuoteBlock
          quote="I kept telling myself it was just stress from the divorce—it would pass. But six months later, I was worse, not better. Getting treatment felt like admitting failure. Now I realize waiting was the failure. I could have been feeling better months earlier."
          attribution="Anonymous patient"
          role="Reflecting on delayed treatment"
          variant="large"
        />

        <p className="mb-6">
          Whether your depression started with a clear trigger or seemed to appear out of nowhere, if it's causing significant distress or impairment, you deserve help. The distinction between "situational" and "clinical" matters less than the fact that you're suffering and treatment can help. Don't dismiss your symptoms because they make sense in context. Depression is depression—and it's treatable.
        </p>
      </>
    ),
  },
];
