/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DEPRESSION_GRIEF, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  ProgressSteps,
  BeforeAfter,
  QuoteBlock,
  MythVsFactBlock,
  HighlightBox,
} from '../../../components/article/blocks';

export const seasonalPatternsArticlesA: Article[] = [
  {
    id: catId(41),
    slug: 'seasonal-affective-disorder-complete-guide-winter-depression',
    title: 'Seasonal Affective Disorder: A Complete Guide to Winter Depression',
    description: 'An in-depth look at SAD, the form of depression that arrives with shorter days and disappears with spring, including causes, symptoms, and evidence-based treatments.',
    image: "/images/articles/cat07/cover-041.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Seasonal Affective Disorder', 'SAD', 'Depression', 'Winter Depression'],
    summary: 'Seasonal Affective Disorder is a clinically recognized form of depression triggered by reduced light exposure in fall and winter, affecting 5% of the U.S. population. This guide covers the biological mechanisms, diagnostic criteria, and evidence-based treatments including light therapy and CBT-SAD.',
    keyFacts: [
      { text: 'SAD affects 5% of the U.S. population, with rates reaching 9% in northern latitudes and 1% in southern states', citationIndex: 5 },
      { text: 'Women are 4 times more likely to be diagnosed with SAD than men', citationIndex: 5 },
      { text: 'Light therapy shows 50-80% response rates, comparable to antidepressant medications', citationIndex: 3 },
      { text: 'People with SAD have reduced retinal sensitivity to light, requiring more exposure for the same biological effects', citationIndex: 2 },
      { text: 'CBT-SAD may have longer-lasting benefits than light therapy alone, with lower relapse rates in subsequent winters', citationIndex: 7 },
    ],
    sparkMoment: 'SAD is not a character flaw or weakness—it\'s your body responding to an environmental mismatch between your biology and the season, and that response can be scientifically measured and effectively treated.',
    practicalExercise: {
      title: 'Track Your Seasonal Patterns',
      steps: [
        { title: 'Review the past 2-3 years', description: 'Note when depressive symptoms began and ended each year. Look for consistent seasonal timing.' },
        { title: 'Document your symptoms', description: 'Track sleep duration, appetite changes, energy levels, and mood throughout one seasonal cycle.' },
        { title: 'Assess functional impact', description: 'Rate how symptoms affect work, relationships, and daily activities on a 1-10 scale.' },
        { title: 'Share findings with a provider', description: 'Bring your tracking data to a healthcare appointment to discuss whether SAD is present and treatment options.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Use the Mood Journal',
    },
    citations: [
      {
        id: '1',
        text: 'Seasonal affective disorder: Overview of epidemiology, presentation, and treatment',
        source: 'American Family Physician',
        year: '2020',
        link: 'https://www.aafp.org/pubs/afp/issues/2020/1201/p653.html',
        tier: 2,
      },
      {
        id: '2',
        text: 'The neurobiology of seasonal affective disorder and phototherapy',
        source: 'Dialogues in Clinical Neuroscience',
        year: '2007',
        link: 'https://doi.org/10.31887/DCNS.2007.9.3/namazi',
        tier: 1,
      },
      {
        id: '3',
        text: 'Light therapy for seasonal affective disorder: A meta-analysis',
        source: 'American Journal of Psychiatry',
        year: '2005',
        link: 'https://doi.org/10.1176/appi.ajp.162.4.656',
        tier: 1,
      },
      {
        id: '4',
        text: 'Circadian rhythm dysfunction in depression: From phenomenology to mechanisms',
        source: 'Sleep Medicine Reviews',
        year: '2019',
        link: 'https://doi.org/10.1016/j.smrv.2019.05.002',
        tier: 1,
      },
      {
        id: '5',
        text: 'Prevalence of seasonal affective disorder at four latitudes',
        source: 'Psychiatry Research',
        year: '1994',
        link: 'https://doi.org/10.1016/0165-1781(94)90115-5',
        tier: 1,
      },
      {
        id: '6',
        text: 'DSM-5-TR criteria for major depressive disorder with seasonal pattern',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.books.9780890425787',
        tier: 4,
      },
      {
        id: '7',
        text: 'Cognitive-behavioral therapy for seasonal affective disorder',
        source: 'Journal of Affective Disorders',
        year: '2015',
        link: 'https://doi.org/10.1016/j.jad.2015.05.057',
        tier: 1,
      },
      {
        id: '8',
        text: 'Seasonal depression: Understanding the causes and finding relief',
        source: 'National Institute of Mental Health',
        year: '2021',
        link: 'https://www.nimh.nih.gov/health/publications/seasonal-affective-disorder',
        tier: 2,
      },
      {
        id: '9',
        text: 'Genetic variants associated with seasonal affective disorder',
        source: 'Translational Psychiatry',
        year: '2018',
        link: 'https://doi.org/10.1038/s41398-018-0308-y',
        tier: 1,
      },
      {
        id: '10',
        text: 'Melatonin and serotonin in seasonal affective disorder',
        source: 'Chronobiology International',
        year: '2016',
        link: 'https://doi.org/10.3109/07420528.2016.1167077',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Every year, as the days shorten and winter sets in, millions of people experience a predictable shift: energy drains away, sleep becomes heavy and excessive, cravings for carbs intensify, and a low-grade depression settles in like fog. When spring arrives, the symptoms lift---almost as if someone flipped a switch.
          </p>
          <p className="mb-6">
            This is Seasonal Affective Disorder (SAD), a subtype of depression characterized by episodes that recur at the same time each year, typically starting in fall or winter and remitting in spring or summer <Citation id="1" index={1} source="American Family Physician" year="2020" tier={2} />. This article provides a comprehensive overview of SAD---what it is, how it develops, and what treatments actually work.
          </p>
        </div>

        <h2 id="what-is-sad" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Seasonal Affective Disorder?
        </h2>
        <p className="mb-6">
          SAD is not just "winter blues" or feeling a little sluggish when it's cold. It's a clinically recognized form of major depressive disorder with a seasonal pattern, as defined in the DSM-5-TR <Citation id="6" index={6} source="American Psychiatric Association" year="2022" tier={4} />. The key distinction is that SAD is recurrent, predictable, and functionally impairing—not just a mild preference for summer weather.
        </p>
        <p className="mb-6">
          To meet diagnostic criteria, you must experience:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Depressive episodes that begin and end at characteristic times of the year (usually fall/winter onset, spring remission)</li>
          <li>This pattern occurring for at least two consecutive years</li>
          <li>Seasonal episodes outnumbering non-seasonal episodes over your lifetime</li>
          <li>Symptoms severe enough to impair functioning</li>
        </ul>

        <p className="mb-6">
          The diagnostic process also requires ruling out other explanations for seasonal mood changes, such as seasonal stressors (e.g., financial strain during holidays, academic calendar pressure) or other medical conditions that worsen in winter (like hypothyroidism or vitamin deficiencies). A thorough evaluation distinguishes SAD from these alternative causes.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            SAD is not "all in your head" or a lack of willpower to get through winter. It's a biological response to reduced light exposure that disrupts circadian rhythms, neurotransmitter production, and hormonal regulation <Citation id="2" index={2} source="Dialogues in Clinical Neuroscience" year="2007" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Symptoms of Winter-Pattern SAD
        </h2>
        <p className="mb-6">
          Winter-pattern SAD has a distinctive symptom profile that differs from non-seasonal depression <Citation id="8" index={8} source="National Institute of Mental Health" year="2021" tier={2} />:
        </p>

        <ComparisonTable
          title="Winter SAD vs. Non-Seasonal Depression"
          columns={['Symptom', 'Winter SAD', 'Non-Seasonal Depression']}
          items={[
            { feature: 'Sleep', values: ['Hypersomnia (sleeping too much)', 'Insomnia or varied sleep patterns'] },
            { feature: 'Appetite', values: ['Increased, with carb/sugar cravings', 'Decreased or increased'] },
            { feature: 'Weight', values: ['Weight gain', 'Weight loss or gain'] },
            { feature: 'Energy', values: ["Extreme fatigue, 'leaden paralysis'", 'Fatigue or agitation'] },
            { feature: 'Mood', values: ['Low mood, anhedonia, irritability', 'Low mood, hopelessness, anhedonia'] },
            { feature: 'Social behavior', values: ["Withdrawal, 'hibernation'", 'Varied'] },
            { feature: 'Timing', values: ['Predictable seasonal onset/remission', 'Variable onset, can be chronic'] },
          ]}
          highlightColumn={1}
        />

        <h2 id="who-gets-sad" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Gets SAD?
        </h2>
        <p className="mb-6">
          SAD affects an estimated 5% of the U.S. population, though prevalence varies dramatically by geography <Citation id="5" index={5} source="Psychiatry Research" year="1994" tier={1} />. The farther you live from the equator, the higher your risk.
        </p>

        <StatCard
          stats={[
            { value: 9, suffix: '%', label: 'Prevalence in northern latitudes (Alaska, New England)' },
            { value: 1, suffix: '%', label: 'Prevalence in southern latitudes (Florida)' },
            { value: 4, suffix: 'x', label: 'More common in women than men' },
          ]}
          source="Psychiatry Research, 1994"
        />

        <p className="mb-6 mt-6">
          <strong>Risk factors include:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Geographic location:</strong> Living far from the equator where daylight hours dramatically shorten in winter</li>
          <li><strong>Age:</strong> Most commonly develops in young adulthood (20s--30s)</li>
          <li><strong>Sex:</strong> Women are 4 times more likely to be diagnosed</li>
          <li><strong>Family history:</strong> Having a close relative with SAD or other depression increases risk <Citation id="9" index={9} source="Translational Psychiatry" year="2018" tier={1} /></li>
          <li><strong>Personal history:</strong> Having major depression or bipolar disorder increases vulnerability</li>
        </ul>

        <h2 id="causes-mechanisms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Causes SAD?
        </h2>
        <p className="mb-6">
          The primary trigger is <strong>reduced light exposure</strong> during fall and winter. This sets off a cascade of biological changes in vulnerable individuals <Citation id="2" index={2} source="Dialogues in Clinical Neuroscience" year="2007" tier={1} />:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Circadian Rhythm Disruption
        </h3>
        <p className="mb-6">
          Light is the primary cue that synchronizes your internal clock. When daylight hours shrink, your circadian rhythm can fall out of sync with the external day-night cycle, leading to sleep problems, fatigue, and mood disturbances <Citation id="4" index={4} source="Sleep Medicine Reviews" year="2019" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Serotonin Dysregulation
        </h3>
        <p className="mb-6">
          Reduced sunlight lowers serotonin production---a neurotransmitter that regulates mood, appetite, and sleep. People with SAD have lower serotonin activity in winter months.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Melatonin Overproduction
        </h3>
        <p className="mb-6">
          Darkness triggers melatonin production (the sleep hormone). Longer nights mean prolonged melatonin secretion, which can cause excessive sleepiness and lethargy <Citation id="10" index={10} source="Chronobiology International" year="2016" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Vitamin D Deficiency
        </h3>
        <p className="mb-6">
          Sunlight exposure stimulates vitamin D synthesis. Low vitamin D in winter may contribute to depressive symptoms, though the exact role is still debated.
        </p>

        <ArticleCallout variant="did-you-know">
          <p>
            People with SAD don't process light in the same way as those without the condition. Research shows that individuals with SAD have reduced retinal sensitivity to light, meaning they need more light exposure to achieve the same biological effects.
          </p>
        </ArticleCallout>

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How SAD Is Diagnosed
        </h2>
        <p className="mb-6">
          Diagnosis is based on clinical interview and symptom history. A healthcare provider will assess:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Timing and recurrence of symptoms (at least 2 consecutive years)</li>
          <li>Severity and functional impairment</li>
          <li>Ruling out other medical conditions (hypothyroidism, vitamin deficiencies)</li>
          <li>Differentiating from bipolar disorder with seasonal pattern</li>
        </ul>

        <p className="mb-6">
          Questionnaires like the Seasonal Pattern Assessment Questionnaire (SPAQ) can help identify seasonal patterns, but diagnosis requires professional evaluation.
        </p>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment Options for SAD
        </h2>
        <p className="mb-6">
          SAD is highly treatable. The most effective interventions target the biological mechanisms driving symptoms.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Light Therapy (First-Line Treatment)
        </h3>
        <p className="mb-6">
          Bright light therapy involves sitting in front of a specialized light box (10,000 lux) for 20--30 minutes each morning. Meta-analyses show it reduces SAD symptoms in 50--80% of people <Citation id="3" index={3} source="American Journal of Psychiatry" year="2005" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>How it works:</strong> Bright light resets circadian rhythms, suppresses melatonin, and boosts serotonin production.
        </p>

        <ArticleCallout variant="tip">
          <p>
            <strong>Light therapy tips:</strong> Use the light box within 30 minutes of waking, sit 16--24 inches away, keep your eyes open (but don't stare directly at the light), and continue daily throughout fall/winter. Most people notice improvement within 1--2 weeks.
          </p>
        </ArticleCallout>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Cognitive-Behavioral Therapy for SAD (CBT-SAD)
        </h3>
        <p className="mb-6">
          A specialized form of CBT adapted for seasonal depression focuses on changing negative thoughts about winter, increasing behavioral activation, and scheduling pleasant activities <Citation id="7" index={7} source="Journal of Affective Disorders" year="2015" tier={1} />. Unlike standard CBT for depression, CBT-SAD specifically addresses seasonal cognitions—thoughts like "I can't function in winter" or "I'm trapped until spring."
        </p>
        <p className="mb-6">
          Research shows CBT-SAD may have longer-lasting benefits than light therapy, with lower relapse rates in subsequent winters. A 2015 study found that while both treatments were equally effective in the short term, CBT-SAD participants had significantly fewer depressive episodes two winters later, suggesting it builds lasting coping skills.
        </p>
        <p className="mb-6">
          <strong>CBT-SAD techniques include:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Behavioral activation:</strong> Scheduling enjoyable activities even when unmotivated, to counteract withdrawal</li>
          <li><strong>Cognitive restructuring:</strong> Identifying and challenging catastrophic thoughts about winter ("I'll never make it through")</li>
          <li><strong>Relapse prevention:</strong> Creating an action plan for early intervention in future winters</li>
          <li><strong>Pleasant event scheduling:</strong> Deliberately planning social, creative, or recreational activities throughout winter months</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Medication
        </h3>
        <p className="mb-6">
          Antidepressants (especially SSRIs like fluoxetine or sertraline, and the atypical antidepressant bupropion) are effective for SAD, particularly if light therapy alone isn't sufficient.
        </p>
        <p className="mb-6">
          Bupropion XL is FDA-approved specifically for preventing SAD when started in fall before symptoms onset.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Lifestyle Modifications
        </h3>
        <p className="mb-6">
          While not sufficient as standalone treatment for clinical SAD, lifestyle changes enhance the effectiveness of light therapy and medication:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Maximize natural light exposure:</strong> Spend at least 30 minutes outdoors during peak daylight hours (10am-2pm), even on cloudy days. Natural light is more intense than indoor lighting. Open all curtains and blinds immediately upon waking. Rearrange workspaces to be near windows.</li>
          <li><strong>Exercise regularly:</strong> Aim for 30 minutes of moderate activity most days. Morning exercise is ideal, as it combines light exposure with mood-boosting endorphins. Winter walking, snowshoeing, or indoor exercise all help counteract lethargy.</li>
          <li><strong>Maintain sleep hygiene:</strong> Set a consistent wake time (even weekends) to prevent oversleeping, which worsens circadian misalignment. Use an alarm across the room to ensure you get up. Avoid napping during the day.</li>
          <li><strong>Plan winter activities:</strong> Pre-schedule social events, creative projects, or trips for winter months. Having structure and things to look forward to combats the urge to hibernate completely. Book a mid-winter getaway to a sunny location if possible.</li>
          <li><strong>Monitor nutrition:</strong> While carb cravings are common, prioritize protein and healthy fats to stabilize blood sugar and energy. Consider vitamin D supplementation after discussing with a healthcare provider.</li>
        </ul>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'prevention',
              title: 'Can SAD be prevented?',
              content: (
                <div>
                  <p className="mb-4">
                    If you have a history of SAD, preventive measures can reduce severity or delay onset. Start light therapy in early fall (before symptoms fully develop) rather than waiting until you're already depressed. Some people benefit from preventive antidepressant medication started in September or October.
                  </p>
                  <p>
                    Proactive scheduling of winter activities and maintaining exercise routines as days shorten also helps. Think of prevention as "pre-loading" your system with protective factors before the seasonal stressor arrives.
                  </p>
                </div>
              ),
            },
            {
              id: 'severity',
              title: 'How severe does SAD get?',
              content: (
                <div>
                  <p className="mb-4">
                    SAD severity ranges from mild (noticeable symptoms but able to function) to severe (debilitating depression requiring time off work, inability to maintain relationships). Some people with severe SAD experience suicidal thoughts during winter months.
                  </p>
                  <p>
                    Severity often correlates with latitude and personal vulnerability factors. If you have severe SAD, combination treatment (light therapy + medication + therapy) is typically recommended, and close monitoring throughout winter is essential.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you notice a pattern of depressive symptoms that begins and ends around the same time each year, talk to a healthcare provider. Early intervention---ideally in early fall before symptoms fully develop---can prevent a severe episode.
        </p>
        <p className="mb-6">
          If you experience suicidal thoughts at any time, seek immediate help: call or text 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room.
        </p>
      </>
    ),
  },

  {
    id: catId(42),
    slug: 'light-therapy-sad-how-it-works-evidence',
    status: 'draft',
    title: 'Light Therapy for SAD: How It Works and What the Evidence Shows',
    description: 'A comprehensive guide to using bright light therapy for seasonal affective disorder, including how it works, effectiveness, and practical implementation.',
    image: "/images/articles/cat07/cover-042.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Light Therapy', 'SAD', 'Treatment', 'Phototherapy'],
    summary: 'Bright light therapy is the first-line, evidence-based treatment for seasonal affective disorder, producing measurable changes in circadian rhythms, hormone levels, and neurotransmitter activity. With 50-80% response rates and minimal side effects, it rivals antidepressant medication in effectiveness.',
    keyFacts: [
      { text: 'Light therapy reduces SAD symptoms in 50-80% of people, with effect sizes comparable to antidepressant medications', citationIndex: 1 },
      { text: 'Clinical devices provide 10,000 lux—about 20 times brighter than typical indoor lighting but dimmer than direct sunlight', citationIndex: 3 },
      { text: 'Morning exposure within 30 minutes of waking is most effective for resetting delayed circadian rhythms', citationIndex: 5 },
      { text: 'Improvement typically occurs within 1-2 weeks of daily use, with 53% achieving full remission in landmark studies', citationIndex: 2 },
      { text: 'Light therapy can trigger mania in people with bipolar disorder and requires medical supervision in these cases', citationIndex: 6 },
    ],
    sparkMoment: 'Light therapy isn\'t about tricking your body—it\'s about giving your biology the environmental input it evolved to expect, restoring the chemical balance that artificial indoor lighting can\'t provide.',
    practicalExercise: {
      title: 'Design Your Light Therapy Routine',
      steps: [
        { title: 'Set a consistent wake time', description: 'Choose a time you can maintain 7 days a week. Consistency amplifies the circadian benefits of light therapy.' },
        { title: 'Prepare your light box', description: 'Position it 16-24 inches away at a comfortable angle (off to the side, not directly in front). Ensure UV filters are intact.' },
        { title: 'Plan a morning activity', description: 'Pair light therapy with breakfast, coffee, reading, or emails—something you can do sitting still for 20-30 minutes.' },
        { title: 'Track your response', description: 'Log your mood, energy, and sleep quality daily for 3 weeks to identify patterns and adjust timing if needed.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Progress',
    },
    citations: [
      {
        id: '1',
        text: 'Light therapy for seasonal affective disorder: A systematic review and meta-analysis',
        source: 'American Journal of Psychiatry',
        year: '2005',
        link: 'https://doi.org/10.1176/appi.ajp.162.4.656',
        tier: 1,
      },
      {
        id: '2',
        text: 'Efficacy of bright light treatment for seasonal affective disorder: Randomized controlled trial',
        source: 'Archives of General Psychiatry',
        year: '1998',
        link: 'https://doi.org/10.1001/archpsyc.55.10.883',
        tier: 1,
      },
      {
        id: '3',
        text: 'Mechanisms of light therapy in seasonal affective disorder',
        source: 'Journal of Biological Rhythms',
        year: '2020',
        link: 'https://doi.org/10.1177/0748730420957164',
        tier: 1,
      },
      {
        id: '4',
        text: 'Light therapy: Clinical practice guidelines',
        source: 'Society for Light Treatment and Biological Rhythms',
        year: '2019',
        link: 'https://www.sltbr.org/guidelines',
        tier: 3,
      },
      {
        id: '5',
        text: 'Timing of light therapy for seasonal affective disorder',
        source: 'Chronobiology International',
        year: '2018',
        link: 'https://doi.org/10.1080/07420528.2018.1465077',
        tier: 1,
      },
      {
        id: '6',
        text: 'Adverse effects and safety of light therapy: A systematic review',
        source: 'Sleep Medicine Reviews',
        year: '2019',
        link: 'https://doi.org/10.1016/j.smrv.2019.04.004',
        tier: 1,
      },
      {
        id: '7',
        text: 'Light therapy for non-seasonal depression: Evidence review',
        source: 'JAMA Psychiatry',
        year: '2016',
        link: 'https://doi.org/10.1001/jamapsychiatry.2015.2235',
        tier: 1,
      },
      {
        id: '8',
        text: 'Light therapy devices: Consumer guide and recommendations',
        source: 'Center for Environmental Therapeutics',
        year: '2021',
        link: 'https://www.cet.org/light-therapy',
        tier: 3,
      },
      {
        id: '9',
        text: 'Blue light vs. white light therapy for seasonal affective disorder',
        source: 'Journal of Affective Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jad.2020.01.06',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Bright light therapy is the first-line treatment for seasonal affective disorder (SAD), backed by decades of research showing it works as well as antidepressant medication---without the side effects. But not all light boxes are created equal, and timing matters more than you might think.
          </p>
          <p className="mb-6">
            This article explains how light therapy works at a biological level, what the evidence shows, and how to use it effectively <Citation id="1" index={1} source="American Journal of Psychiatry" year="2005" tier={1} />.
          </p>
        </div>

        <h2 id="how-light-therapy-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Light Therapy Works
        </h2>
        <p className="mb-6">
          Light therapy, also called phototherapy or bright light treatment, involves exposure to artificial light that mimics natural outdoor light---typically 10,000 lux, which is much brighter than standard indoor lighting (300--500 lux) but dimmer than direct sunlight (50,000--100,000 lux).
          </p>
        <p className="mb-6">
          When light enters your eyes, it triggers several biological processes <Citation id="3" index={3} source="Journal of Biological Rhythms" year="2020" tier={1} />:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Circadian Rhythm Regulation
        </h3>
        <p className="mb-6">
          Light is the primary signal that synchronizes your internal 24-hour clock. Morning bright light exposure shifts your circadian rhythm earlier (phase advance), helping correct the delayed rhythm often seen in SAD.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Melatonin Suppression
        </h3>
        <p className="mb-6">
          Bright light suppresses melatonin production, the hormone that makes you sleepy. In people with SAD, melatonin levels can be elevated during the day in winter, contributing to fatigue and oversleeping. Light therapy normalizes this.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Serotonin Enhancement
        </h3>
        <p className="mb-6">
          Bright light increases serotonin activity in the brain---similar to how antidepressants work. This improves mood, energy, and appetite regulation.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            Light therapy doesn't just "trick" your brain into thinking it's summer. It produces measurable changes in brain chemistry, hormone levels, and circadian timing---changes that directly counteract the biological mechanisms of SAD.
          </p>
        </ArticleCallout>

        <h2 id="effectiveness" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Effective Is Light Therapy?
        </h2>
        <p className="mb-6">
          Meta-analyses of randomized controlled trials consistently show that light therapy reduces SAD symptoms in 50--80% of people <Citation id="1" index={1} source="American Journal of Psychiatry" year="2005" tier={1} />. Effect sizes are comparable to antidepressant medications.
        </p>

        <StatCard
          stats={[
            { value: 67, suffix: '%', label: 'Response rate (significant symptom reduction)' },
            { value: 1, suffix: '--2', label: 'Weeks to see improvement' },
            { value: 0.84, suffix: '', label: 'Effect size (large) vs. placebo' },
          ]}
          source="American Journal of Psychiatry, 2005"
        />

        <p className="mb-6 mt-6">
          A landmark 1998 study found that daily morning bright light therapy was significantly more effective than placebo (dim red light) in reducing depressive symptoms, with 53% of participants achieving remission <Citation id="2" index={2} source="Archives of General Psychiatry" year="1998" tier={1} />.
        </p>

        <ArticleCallout variant="did-you-know">
          <p>
            Light therapy also shows promise for non-seasonal depression, bipolar depression, and circadian rhythm disorders, though it's not yet FDA-approved for these conditions <Citation id="7" index={7} source="JAMA Psychiatry" year="2016" tier={1} />.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          One key advantage of light therapy over medication is the rapid onset of action. While antidepressants typically require 4-6 weeks to reach full effect, many people notice mood improvements within the first week of light therapy. Additionally, there are no systemic side effects like weight gain, sexual dysfunction, or withdrawal symptoms—common concerns with antidepressant use.
        </p>

        <h2 id="how-to-use" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Use Light Therapy Effectively
        </h2>
        <p className="mb-6">
          Light therapy is simple, but getting the details right matters <Citation id="4" index={4} source="Society for Light Treatment and Biological Rhythms" year="2019" tier={3} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Choose the right light box',
              description: (
                <div>
                  <p className="mb-2">Look for a device that provides <strong>10,000 lux</strong> at a comfortable sitting distance (typically 16--24 inches).</p>
                  <p className="mb-2">The light should be <strong>UV-filtered</strong> to protect your eyes and skin.</p>
                  <p>White light is standard; some devices use blue-enriched light, which may be effective at lower intensities <Citation id="9" index={9} source="Journal of Affective Disorders" year="2020" tier={1} />.</p>
                </div>
              ),
            },
            {
              title: 'Time it right',
              description: (
                <div>
                  <p className="mb-2"><strong>Use light therapy within 30 minutes of waking up.</strong> Morning exposure is most effective for resetting circadian rhythms <Citation id="5" index={5} source="Chronobiology International" year="2018" tier={1} />.</p>
                  <p className="mb-2">Avoid use in the evening, as it can delay your sleep schedule and worsen insomnia.</p>
                  <p>Consistency is key---use it every day throughout fall and winter.</p>
                </div>
              ),
            },
            {
              title: 'Position yourself correctly',
              description: (
                <div>
                  <p className="mb-2">Sit with the light box off to the side, not directly in front of your eyes. You don't stare at the light---you just need it in your peripheral vision.</p>
                  <p>Keep your eyes open during the session (you can read, eat, work on a laptop).</p>
                </div>
              ),
            },
            {
              title: 'Start with 20--30 minutes daily',
              description: (
                <div>
                  <p className="mb-2">Most people benefit from 20--30 minutes at 10,000 lux. If using a lower-intensity light (e.g., 2,500 lux), you'll need longer exposure (up to 2 hours).</p>
                  <p>You can split sessions (e.g., 15 minutes twice a day), but morning is most important.</p>
                </div>
              ),
            },
            {
              title: 'Continue through winter',
              description: (
                <div>
                  <p className="mb-2">Don't stop once you feel better. SAD symptoms typically return within days to weeks of discontinuing light therapy.</p>
                  <p>Continue daily use until daylight hours naturally increase in spring.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="choosing-a-device" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Choosing a Light Therapy Device
        </h2>
        <p className="mb-6">
          Not all light boxes marketed for SAD meet clinical standards. Here's what to look for <Citation id="8" index={8} source="Center for Environmental Therapeutics" year="2021" tier={3} />:
        </p>

        <ComparisonTable
          title="Light Box Features to Consider"
          columns={['Feature', 'What to Look For']}
          items={[
            { feature: 'Light intensity', values: ['10,000 lux at recommended distance (usually 16--24 inches)'] },
            { feature: 'Size', values: ['Large enough to provide full-field illumination (at least 12x17 inches)'] },
            { feature: 'UV filtration', values: ['Must block UV rays to protect eyes and skin'] },
            { feature: 'Light color', values: ['White light (full spectrum) is standard; blue-enriched is emerging'] },
            { feature: 'Angle', values: ['Downward angle mimics natural sunlight and reduces glare'] },
            { feature: 'Certification', values: ['Look for medical device certification or FDA registration'] },
          ]}
          highlightColumn={0}
        />

        <ArticleCallout variant="warning">
          <p>
            <strong>Avoid:</strong> Tanning lamps, dawn simulators (not bright enough), or light boxes that don't specify lux output. These won't provide therapeutic effects.
          </p>
        </ArticleCallout>

        <h2 id="side-effects" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Side Effects and Safety
        </h2>
        <p className="mb-6">
          Light therapy is generally safe and well-tolerated. Side effects are mild and usually resolve within a few days <Citation id="6" index={6} source="Sleep Medicine Reviews" year="2019" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Eye strain or headache:</strong> Usually due to sitting too close or using too long; reduce duration or distance</li>
          <li><strong>Nausea:</strong> Rare, often subsides with continued use</li>
          <li><strong>Agitation or irritability:</strong> May indicate too much light exposure; reduce session length</li>
          <li><strong>Insomnia:</strong> If light is used too late in the day; switch to morning-only use</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Who Should Avoid Light Therapy?
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Bipolar disorder:</strong> Light therapy can trigger mania; only use under close medical supervision</li>
          <li><strong>Retinal conditions:</strong> Consult an eye doctor first (e.g., macular degeneration, diabetic retinopathy)</li>
          <li><strong>Photosensitizing medications:</strong> Some drugs (lithium, certain antibiotics, St. John's Wort) increase light sensitivity</li>
        </ul>

        <h2 id="combining-treatments" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Combining Light Therapy with Other Treatments
        </h2>
        <p className="mb-6">
          Light therapy works well alone for mild to moderate SAD, but can be combined with other treatments for more severe cases:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Light therapy + CBT-SAD:</strong> Research shows this combination has the best long-term outcomes</li>
          <li><strong>Light therapy + medication:</strong> Safe to combine with antidepressants; may reduce medication dose needed</li>
          <li><strong>Light therapy + lifestyle changes:</strong> Exercise, social engagement, and sleep hygiene enhance benefits</li>
        </ul>

        <BeforeAfter
          before={{
            title: 'Without Light Therapy',
            points: [
              'Wake up exhausted despite 10+ hours sleep',
              'Struggle to get out of bed, hit snooze repeatedly',
              'Drag through mornings in a fog',
              'Crave carbs and sweets all day',
              'Feel isolated and withdrawn by evening',
            ],
          }}
          after={{
            title: 'With Consistent Light Therapy',
            points: [
              'Wake naturally feeling more refreshed',
              'Get up at first alarm with less resistance',
              'Experience clearer thinking by mid-morning',
              'Have more balanced appetite and food choices',
              'Feel capable of engaging in evening activities',
            ],
          }}
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Guidance
        </h2>
        <p className="mb-6">
          You can start light therapy on your own, but consult a healthcare provider if:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Symptoms don't improve after 2--3 weeks of consistent use</li>
          <li>You experience side effects that don't resolve</li>
          <li>You have bipolar disorder or other conditions that require monitoring</li>
          <li>You're unsure whether your symptoms are due to SAD or another condition</li>
        </ul>
      </>
    ),
  },

  {
    id: catId(43),
    slug: 'summer-sad-overlooked-pattern-warm-weather-depression',
    title: 'Summer SAD: The Overlooked Pattern of Warm-Weather Depression',
    description: 'While winter depression gets most of the attention, some people experience a less-known seasonal pattern: depression that begins in spring or summer and lifts in fall.',
    image: "/images/articles/cat07/cover-043.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Summer SAD', 'Seasonal Depression', 'Reverse SAD', 'Depression'],
    summary: 'Summer-pattern seasonal affective disorder is a less-recognized form of seasonal depression affecting about 10% of people with SAD, characterized by insomnia, weight loss, agitation, and anxiety that begins in spring/summer and remits in fall. Unlike winter SAD, treatment focuses on reducing heat and light exposure rather than increasing it.',
    keyFacts: [
      { text: 'Summer SAD affects approximately 10% of people with seasonal depression, making it much rarer than winter-pattern SAD', citationIndex: 1 },
      { text: 'Symptom profile is often the inverse of winter SAD: insomnia instead of hypersomnia, weight loss instead of gain, agitation instead of lethargy', citationIndex: 6 },
      { text: 'Heat, humidity, and excessive light exposure are thought to trigger summer SAD by disrupting circadian rhythms and sleep', citationIndex: 3 },
      { text: 'Light therapy is NOT recommended for summer SAD—reducing light exposure, especially in evening, may help instead', citationIndex: 5 },
      { text: 'Summer SAD may be more common in regions with extreme summer heat and humidity, like the southern United States', citationIndex: 3 },
    ],
    sparkMoment: 'If you dread summer while everyone else celebrates it, you\'re not broken—your biology may simply be hypersensitive to the very environmental changes that help others thrive.',
    practicalExercise: {
      title: 'Create Your Summer Survival Plan',
      steps: [
        { title: 'Identify your peak symptoms', description: 'Track which months trigger the worst symptoms and what specific factors (heat, light, social pressure) worsen your mood.' },
        { title: 'Optimize your environment', description: 'Install blackout curtains, ensure reliable air conditioning, and create a cool, dark bedroom sanctuary.' },
        { title: 'Schedule proactive support', description: 'Book therapy sessions or start medication in late spring, before symptoms peak, rather than waiting until you\'re in crisis.' },
        { title: 'Plan fall anchors', description: 'Schedule specific events, trips, or activities for fall to give yourself concrete things to look forward to during difficult summer months.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'Summer-onset seasonal affective disorder: Prevalence and clinical features',
        source: 'Journal of Affective Disorders',
        year: '2016',
        link: 'https://doi.org/10.1016/j.jad.2016.03.038',
        tier: 1,
      },
      {
        id: '2',
        text: 'Reverse seasonal affective disorder: A distinct subtype?',
        source: 'Psychiatry Research',
        year: '2018',
        link: 'https://doi.org/10.1016/j.psychres.2018.05.012',
        tier: 1,
      },
      {
        id: '3',
        text: 'Heat, humidity, and mood: Environmental factors in summer depression',
        source: 'International Journal of Biometeorology',
        year: '2019',
        link: 'https://doi.org/10.1007/s00484-019-01701-8',
        tier: 1,
      },
      {
        id: '4',
        text: 'Sleep disruption in summer seasonal affective disorder',
        source: 'Sleep Medicine',
        year: '2020',
        link: 'https://doi.org/10.1016/j.sleep.2020.02.015',
        tier: 1,
      },
      {
        id: '5',
        text: 'Treatment strategies for summer-pattern seasonal affective disorder',
        source: 'Primary Care Companion for CNS Disorders',
        year: '2017',
        link: 'https://doi.org/10.4088/PCC.17f02145',
        tier: 1,
      },
      {
        id: '6',
        text: 'Seasonal depression: Understanding patterns and triggers',
        source: 'National Institute of Mental Health',
        year: '2021',
        link: 'https://www.nimh.nih.gov/health/publications/seasonal-affective-disorder',
        tier: 2,
      },
      {
        id: '7',
        text: 'Geographic and climate factors in summer affective disorder',
        source: 'Journal of Clinical Psychology',
        year: '2019',
        link: 'https://doi.org/10.1002/jclp.22849',
        tier: 1,
      },
      {
        id: '8',
        text: 'Preventive strategies for recurrent summer depression',
        source: 'American Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1176/appi.ajp.2020.19121231',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When people hear "seasonal affective disorder," they think of winter: short days, cold weather, and the urge to hibernate. But for a smaller subset of people, the pattern is reversed. Their depression arrives with longer days, heat, and humidity---and disappears when fall returns.
          </p>
          <p className="mb-6">
            This is summer-pattern SAD (sometimes called reverse SAD), a less-recognized but equally debilitating form of seasonal depression <Citation id="1" index={1} source="Journal of Affective Disorders" year="2016" tier={1} />. This article explores what summer SAD is, why it happens, and how it's treated.
          </p>
        </div>

        <h2 id="what-is-summer-sad" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Summer SAD?
        </h2>
        <p className="mb-6">
          Summer SAD is a subtype of seasonal affective disorder characterized by depressive episodes that begin in late spring or early summer and remit in fall or winter. It's the opposite temporal pattern of classic (winter-onset) SAD <Citation id="2" index={2} source="Psychiatry Research" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          While much rarer than winter SAD (affecting about 10% of people with seasonal depression), summer SAD is a distinct clinical phenomenon with its own symptom profile and triggers.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            Summer SAD is not just "hating summer" or preferring cooler weather. It's a recurring, clinically significant depressive episode that impairs functioning and follows a predictable seasonal pattern.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          The condition was first formally described in the 1980s alongside winter SAD, but has received far less research attention. This knowledge gap contributes to misdiagnosis and lack of recognition. Many people struggle for years thinking they're defective for not enjoying summer, when in fact they have a legitimate mood disorder with specific biological triggers <Citation id="7" index={7} source="Journal of Clinical Psychology" year="2019" tier={1} />.
        </p>

        <h2 id="symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Summer SAD Differs from Winter SAD
        </h2>
        <p className="mb-6">
          The symptom profile of summer SAD is often the inverse of winter SAD <Citation id="6" index={6} source="National Institute of Mental Health" year="2021" tier={2} />:
        </p>

        <ComparisonTable
          title="Winter SAD vs. Summer SAD Symptoms"
          columns={['Symptom Domain', 'Winter SAD', 'Summer SAD']}
          items={[
            { feature: 'Sleep', values: ['Hypersomnia (too much sleep)', 'Insomnia (difficulty sleeping)'] },
            { feature: 'Appetite', values: ['Increased, carb cravings', 'Decreased, weight loss'] },
            { feature: 'Energy', values: ['Fatigue, lethargy', 'Agitation, restlessness'] },
            { feature: 'Mood', values: ['Low mood, anhedonia', 'Irritability, anxiety, low mood'] },
            { feature: 'Behavior', values: ['Social withdrawal', 'Social withdrawal or irritability'] },
            { feature: 'Physical', values: ['Weight gain, heaviness', 'Weight loss, tension'] },
          ]}
          highlightColumn={2}
        />

        <p className="mb-6 mt-6">
          <strong>Core symptoms of summer SAD include:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Insomnia or disrupted sleep</li>
          <li>Decreased appetite and weight loss</li>
          <li>Agitation or restlessness</li>
          <li>Increased anxiety</li>
          <li>Irritability and anger</li>
          <li>Loss of interest in usual activities</li>
        </ul>

        <h2 id="why-summer-sad-happens" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Summer SAD Happens
        </h2>
        <p className="mb-6">
          The mechanisms behind summer SAD are less well-understood than winter SAD, but several factors likely contribute <Citation id="3" index={3} source="International Journal of Biometeorology" year="2019" tier={1} />:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Heat and Humidity
        </h3>
        <p className="mb-6">
          High temperatures and humidity can disrupt sleep, increase irritability, and worsen mood in vulnerable individuals. Some people are simply more sensitive to heat stress.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Longer Days and Excessive Light
        </h3>
        <p className="mb-6">
          While people with winter SAD benefit from light therapy, those with summer SAD may be hypersensitive to long daylight hours. Excessive light exposure can disrupt circadian rhythms and sleep <Citation id="4" index={4} source="Sleep Medicine" year="2020" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Changes in Routine and Social Expectations
        </h3>
        <p className="mb-6">
          Summer brings social pressure to be active, go outside, and "enjoy" the season. For people who feel worse in summer, this creates a mismatch between expectation and reality, leading to isolation and shame.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Metabolic and Hormonal Changes
        </h3>
        <p className="mb-6">
          Some researchers speculate that changes in thyroid function, cortisol levels, or other metabolic factors in response to heat and light may trigger depression in susceptible individuals.
        </p>

        <ArticleCallout variant="did-you-know">
          <p>
            Summer SAD may be more common in regions with extreme summer heat and humidity (e.g., the southern United States). Geography matters for summer SAD just as it does for winter SAD---but in the opposite direction.
          </p>
        </ArticleCallout>

        <h2 id="myths-and-facts" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Myths About Summer SAD
        </h2>
        <p className="mb-6">
          Because summer SAD is less recognized, several misconceptions persist:
        </p>

        <div className="space-y-4 my-8">
          <MythVsFactBlock
            myth="Summer SAD is just being a 'winter person' or not liking heat"
            fact="Summer SAD is a clinical diagnosis with specific symptom criteria, functional impairment, and biological mechanisms—not a personality preference."
          />
          <MythVsFactBlock
            myth="If you have summer SAD, you should try light therapy like winter SAD"
            fact="Light therapy can worsen summer SAD. Treatment involves reducing light exposure, especially in the evening, not increasing it."
          />
          <MythVsFactBlock
            myth="Summer SAD is extremely rare and probably not real"
            fact="While less common than winter SAD (10% vs. 90% of seasonal depression cases), summer SAD is a recognized clinical entity with distinct symptom patterns and treatment needs."
          />
        </div>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Summer SAD Is Treated
        </h2>
        <p className="mb-6">
          Because summer SAD has different triggers than winter SAD, the treatment approach differs <Citation id="5" index={5} source="Primary Care Companion for CNS Disorders" year="2017" tier={1} />:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Environmental Modifications
        </h3>
        <p className="mb-6">
          Creating a cool, dark environment is foundational to managing summer SAD:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Stay cool:</strong> Use air conditioning, fans, or spend time in cool indoor spaces during peak heat (10am-4pm). If AC isn't available, visit libraries, shopping malls, or community cooling centers. Take cool showers multiple times a day.</li>
          <li><strong>Reduce light exposure:</strong> Install blackout curtains in bedroom and main living spaces. Wear wraparound sunglasses outdoors. Dim lights in the evening (starting 2-3 hours before bed). Avoid excessive time in bright sunlight, especially midday.</li>
          <li><strong>Prioritize sleep hygiene:</strong> Keep bedroom temperature at 60-67°F (15-19°C). Use cooling mattress pads, breathable sheets, or a bed fan. Consider using a white noise machine to mask summer sounds (birds, neighbors) that disrupt sleep.</li>
          <li><strong>Control indoor climate:</strong> Use thermal curtains during the day to keep heat out. Run fans to circulate air. Consider a portable AC unit for your bedroom if central air is inadequate.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Medication
        </h3>
        <p className="mb-6">
          Antidepressants (SSRIs like sertraline or escitalopram, or SNRIs like venlafaxine) can be used preventatively, starting in late spring before symptoms fully develop. Some people take medication only during summer months (May-September) and discontinue in fall under medical supervision. This seasonal approach minimizes long-term medication use while providing protection during vulnerable months.
        </p>
        <p className="mb-6">
          Timing matters: starting medication 4-6 weeks before symptom onset (typically late April or early May) allows the medication to reach therapeutic levels before depression takes hold <Citation id="8" index={8} source="American Journal of Psychiatry" year="2020" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Cognitive-Behavioral Therapy
        </h3>
        <p className="mb-6">
          CBT for summer SAD addresses the unique cognitive and behavioral patterns of warm-weather depression. This includes challenging thoughts like "I should be happy right now" or "Everyone else is enjoying this," which create shame and worsen isolation. Behavioral activation focuses on maintaining engagement in valued activities despite heat, fatigue, or low motivation.
        </p>
        <p className="mb-6">
          Therapists may also help develop coping strategies for managing social pressure, assertiveness in declining summer invitations without guilt, and reframing summer as a season to get through rather than enjoy.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Lifestyle Adjustments
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Exercise in cooler parts of the day:</strong> Schedule workouts before 8am or after 7pm. Consider swimming, which provides exercise while cooling the body. Move indoor exercise to air-conditioned gyms during peak summer heat.</li>
          <li><strong>Maintain social connections:</strong> Even if outdoor activities (barbecues, beach trips, hiking) are draining, find indoor socializing: movie theaters, museums, coffee shops with AC, dinner parties in climate-controlled homes.</li>
          <li><strong>Plan fall/winter activities:</strong> Book a fall trip, schedule winter events, or mark your calendar for anticipated seasonal changes. Having concrete things to look forward to reduces the sense of endless summer ahead.</li>
          <li><strong>Set boundaries with summer expectations:</strong> Give yourself permission to decline invitations that will worsen your symptoms. You don't have to participate in every summer tradition.</li>
          <li><strong>Create indoor retreats:</strong> Develop enjoyable indoor hobbies or activities for summer months—reading series, craft projects, online courses, indoor games with friends.</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            <strong>Unlike winter SAD, light therapy is NOT recommended for summer SAD.</strong> In fact, reducing light exposure (especially in the evening) may help. Discuss treatment options with a healthcare provider familiar with summer-pattern depression.
          </p>
        </ArticleCallout>

        <h2 id="recognizing-the-pattern" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing the Pattern
        </h2>
        <p className="mb-6">
          Many people with summer SAD don't recognize it as seasonal depression because it's so underrepresented in public awareness. They may think they're just 'bad at summer' or that something is wrong with them for not enjoying warm weather.
        </p>
        <p className="mb-6">
          <strong>If you notice:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Depressive symptoms that reliably start in late spring/early summer</li>
          <li>Symptoms that lift when fall arrives</li>
          <li>This pattern occurring for at least two consecutive years</li>
        </ul>

        <p className="mb-6">
          Talk to a healthcare provider about summer-pattern seasonal affective disorder. Recognition is the first step toward effective treatment.
        </p>
      </>
    ),
  },

  {
    id: catId(44),
    slug: 'how-seasons-affect-everyones-mood-without-sad',
    title: "How the Seasons Affect Everyone's Mood (Even Without SAD)",
    description: "Seasonal mood changes are normal, even if you don't have SAD. Learn why your mood shifts with the seasons and how to work with these natural rhythms.",
    image: "/images/articles/cat07/cover-044.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Seasonal Mood', 'Circadian Rhythms', 'Mental Health', 'Self-Care'],
    summary: 'Up to 90% of people experience some seasonal mood variation—feeling more energetic in warmer months and more withdrawn in winter—without meeting criteria for SAD. Understanding and working with these natural rhythms, rather than fighting them, supports better mental health throughout the year.',
    keyFacts: [
      { text: 'Up to 90% of people report some seasonal mood variation, making it a normal human response to environmental changes', citationIndex: 2 },
      { text: 'Evolutionary biology wired us to conserve energy in winter when food was scarce and maximize activity in summer when resources were abundant', citationIndex: 2 },
      { text: 'Light exposure regulates circadian rhythms, serotonin production, and melatonin release—all critical for mood regulation', citationIndex: 3 },
      { text: 'Decreased physical activity in winter contributes to lower baseline mood, as exercise is a mood stabilizer', citationIndex: 5 },
      { text: 'Normal seasonal variation differs from SAD by severity, functional impairment, and need for treatment—most people need only lifestyle adjustments', citationIndex: 6 },
    ],
    sparkMoment: 'You are not failing at winter—you are experiencing biology. Building a life that honors seasonal rhythms instead of demanding year-round sameness is self-compassion, not weakness.',
    practicalExercise: {
      title: 'Design Your Seasonal Self-Care Plan',
      steps: [
        { title: 'Identify your patterns', description: 'Over 3-4 months, note when you feel most energetic, productive, social, and creative. Look for seasonal correlations.' },
        { title: 'Create season-specific routines', description: 'Design winter rituals (morning light, cozy evenings, indoor movement) and summer boundaries (rest time, cool activities) that match your energy.' },
        { title: 'Adjust expectations seasonally', description: 'Plan ambitious projects for your high-energy season. Use low-energy seasons for maintenance, reflection, and rest.' },
        { title: 'Communicate your rhythms', description: 'Share your seasonal patterns with family, friends, and colleagues so they understand your natural cycles and can support you.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Seasonal Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'Seasonal variation in mood in the general population',
        source: 'Psychiatry Research',
        year: '2016',
        link: 'https://doi.org/10.1016/j.psychres.2016.06.044',
        tier: 1,
      },
      {
        id: '2',
        text: 'Seasonality of mood and behavior: Evidence from population studies',
        source: 'Current Opinion in Psychiatry',
        year: '2018',
        link: 'https://doi.org/10.1097/YCO.0000000000000408',
        tier: 1,
      },
      {
        id: '3',
        text: 'Light exposure and mood: Population-based analysis',
        source: 'Journal of Affective Disorders',
        year: '2019',
        link: 'https://doi.org/10.1016/j.jad.2019.07.033',
        tier: 1,
      },
      {
        id: '4',
        text: 'Vitamin D, sunlight, and mood in healthy populations',
        source: 'Nutrients',
        year: '2020',
        link: 'https://doi.org/10.3390/nu12020478',
        tier: 1,
      },
      {
        id: '5',
        text: 'Seasonal patterns in physical activity and mental health',
        source: 'Preventive Medicine',
        year: '2019',
        link: 'https://doi.org/10.1016/j.ypmed.2019.04.023',
        tier: 1,
      },
      {
        id: '6',
        text: 'Understanding normal seasonal mood variation',
        source: 'Mayo Clinic',
        year: '2021',
        link: 'https://www.mayoclinic.org/healthy-lifestyle/seasonal-mood',
        tier: 5,
      },
      {
        id: '7',
        text: 'Evolutionary perspectives on seasonal mood and behavior',
        source: 'Evolution and Human Behavior',
        year: '2018',
        link: 'https://doi.org/10.1016/j.evolhumbehav.2018.07.002',
        tier: 1,
      },
      {
        id: '8',
        text: 'Social connection, seasonality, and mental health',
        source: 'Social Science & Medicine',
        year: '2020',
        link: 'https://doi.org/10.1016/j.socscimed.2020.113139',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You don't need to have seasonal affective disorder to notice that your mood, energy, and motivation shift with the seasons. Most people---even those without clinical depression---experience some degree of seasonal mood variation. It's a normal human response to changing light, temperature, and environmental cues.
          </p>
          <p className="mb-6">
            This article explores why seasonal mood changes happen in the general population and how to work with (not against) your body's natural rhythms <Citation id="1" index={1} source="Psychiatry Research" year="2016" tier={1} />.
          </p>
        </div>

        <h2 id="seasonal-variation-is-normal" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Seasonal Variation in Mood Is Normal
        </h2>
        <p className="mb-6">
          Studies show that up to 90% of people report some seasonal mood variation---feeling more energetic in spring and summer, more withdrawn or sluggish in fall and winter <Citation id="2" index={2} source="Current Opinion in Psychiatry" year="2018" tier={2} />. For most people, these shifts are mild and don't interfere with daily functioning.
        </p>
        <p className="mb-6">
          <strong>Common seasonal patterns include:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Winter:</strong> Feeling more tired, craving carbs, wanting to stay indoors more</li>
          <li><strong>Spring:</strong> Increased energy, optimism, desire to be active</li>
          <li><strong>Summer:</strong> Peak energy and socializing, or (for some) feeling overstimulated and irritable</li>
          <li><strong>Fall:</strong> Winding down, slowing pace, preparing for winter</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Humans evolved to respond to seasonal cues. Historically, winter meant conserving energy when food was scarce. Summer meant maximizing activity when resources were abundant. These patterns are wired into us, even if we now live in climate-controlled environments.
          </p>
        </ArticleCallout>

        <HighlightBox variant="stat">
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">90%</p>
          <p className="text-gray-700 dark:text-gray-300">
            of the population experiences some degree of seasonal mood variation—making it more common than not having seasonal shifts <Citation id="2" index={2} source="Current Opinion in Psychiatry" year="2018" tier={1} />.
          </p>
        </HighlightBox>

        <h2 id="why-seasons-affect-mood" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Seasons Affect Mood
        </h2>
        <p className="mb-6">
          Several factors contribute to seasonal mood changes <Citation id="3" index={3} source="Journal of Affective Disorders" year="2019" tier={1} />:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Light Exposure
        </h3>
        <p className="mb-6">
          Daylight hours dramatically shift throughout the year---from about 9 hours in winter to 15 hours in summer at mid-latitudes. Light is the primary signal that regulates circadian rhythms, serotonin production, and melatonin release---all of which influence mood, energy, and sleep. Reduced winter light means less serotonin (the mood stabilizer) and prolonged melatonin (the sleep hormone), which can lower mood and increase fatigue even in people without SAD <Citation id="3" index={3} source="Journal of Affective Disorders" year="2019" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Vitamin D
        </h3>
        <p className="mb-6">
          Sunlight exposure triggers vitamin D synthesis in your skin. In northern latitudes, vitamin D production essentially shuts down from November through February due to sun angle. Low vitamin D in winter is associated with lower mood, though whether supplementation improves mood in non-deficient people is still debated <Citation id="4" index={4} source="Nutrients" year="2020" tier={1} />. What's clear is that the correlation between seasonal sunlight reduction and mood dips is consistent across populations.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Activity Levels
        </h3>
        <p className="mb-6">
          People tend to be more physically active in warmer months---walking, biking, outdoor sports, gardening. Exercise is a powerful mood stabilizer that increases endorphins, reduces stress hormones, and improves sleep. When winter cold and darkness reduce activity, baseline mood drops. Even small decreases in movement (e.g., walking 2,000 fewer steps per day in winter) can affect mood <Citation id="5" index={5} source="Preventive Medicine" year="2019" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Social Connection
        </h3>
        <p className="mb-6">
          Summer naturally facilitates social interaction: backyard gatherings, walks with friends, outdoor events. Winter socializing requires more intentionality and often moves indoors. For some people, this means less frequent connection. Social isolation is a risk factor for depression, so the seasonal reduction in spontaneous social contact can lower mood <Citation id="8" index={8} source="Social Science & Medicine" year="2020" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Temperature
        </h3>
        <p className="mb-6">
          Extreme cold or heat can affect comfort, sleep quality, and physical health---all of which influence mood. Cold reduces motivation to leave home. Heat disrupts sleep and increases irritability. Both extremes can make it harder to maintain routines that support mental health.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          6. Evolutionary Adaptation
        </h3>
        <p className="mb-6">
          From an evolutionary perspective, seasonal energy conservation made survival sense. Winter was a time to minimize energy expenditure when food was scarce. Summer was the season to forage, hunt, and build resources <Citation id="7" index={7} source="Evolution and Human Behavior" year="2018" tier={1} />. Modern life has removed these constraints, but our biology still carries these seasonal response patterns. Recognizing this can normalize winter sluggishness rather than pathologizing it.
        </p>

        <h2 id="when-to-be-concerned" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Seasonal Mood Changes Become a Problem
        </h2>
        <p className="mb-6">
          Seasonal mood variation exists on a spectrum. Most people experience mild shifts. But if seasonal changes significantly impair your functioning, relationships, or well-being, it may be SAD rather than normal variation <Citation id="6" index={6} source="Mayo Clinic" year="2021" tier={5} />.
        </p>

        <ComparisonTable
          title="Normal Seasonal Variation vs. Seasonal Affective Disorder"
          columns={['Normal Variation', 'Seasonal Affective Disorder (SAD)']}
          items={[
            { feature: 'Severity', values: ['Mild mood shifts', 'Significant depressive symptoms'] },
            { feature: 'Functioning', values: ['Minimal impact on daily life', 'Impairs work, relationships, self-care'] },
            { feature: 'Duration', values: ['Fluctuates, manageable', 'Lasts weeks to months'] },
            { feature: 'Sleep', values: ['Slightly more tired', 'Hypersomnia or severe insomnia'] },
            { feature: 'Social life', values: ['Prefer indoors, still engage', 'Complete withdrawal'] },
            { feature: 'Need for treatment', values: ['Self-care adjustments sufficient', 'May need therapy, medication, light therapy'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="working-with-seasonal-rhythms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Working with Your Seasonal Rhythms
        </h2>
        <p className="mb-6">
          Rather than fighting seasonal shifts, you can adjust your routines to align with them:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Winter Strategies
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Maximize morning light:</strong> Open all curtains within 5 minutes of waking. Sit by windows during breakfast or morning coffee. Take a 15-minute walk outdoors between 10am-2pm, even on cloudy days (outdoor light is still 10x brighter than indoor). Rearrange your workspace to face a window if possible.</li>
          <li><strong>Maintain movement:</strong> Commit to 20-30 minutes of movement daily, even if it's just indoor dancing, yoga, or walking laps in your home. Join a winter sports group (skiing, ice skating) to add social connection. Use a standing desk or take movement breaks every hour.</li>
          <li><strong>Keep social plans:</strong> Schedule at least one social activity per week, even if it's just coffee with a friend or a phone call. Don't cancel plans just because you'd rather stay home---often you'll feel better after connecting. Host cozy indoor gatherings instead of waiting for outdoor weather.</li>
          <li><strong>Create cozy rituals:</strong> Embrace hygge (Danish concept of cozy contentment). Light candles in the evening, make warm drinks, wear comfortable clothes, create comfortable reading nooks. Make winter something to embrace rather than endure.</li>
          <li><strong>Plan winter highlights:</strong> Give yourself things to look forward to---a mid-winter trip, tickets to indoor events, new books or shows, winter cooking projects. Don't let winter be a void to survive.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Summer Strategies
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Balance activity with rest:</strong> Summer's energy and longer days can lead to overcommitment and burnout. Schedule downtime intentionally. Say no to some invitations. Rest is productive, not lazy.</li>
          <li><strong>Stay cool:</strong> Heat affects mood and sleep. Use AC, stay hydrated (aim for half your body weight in ounces of water daily), avoid peak sun hours (10am-4pm) if heat-sensitive. Take cool showers before bed.</li>
          <li><strong>Set boundaries:</strong> You don't have to say yes to every summer invitation, trip, or project. It's okay to have a quiet summer. Summer FOMO is real---acknowledge it, then prioritize your actual needs over social expectations.</li>
          <li><strong>Protect your sleep:</strong> Longer daylight can delay melatonin release. Use blackout curtains, maintain consistent sleep/wake times, dim lights in the evening even when it's still light outside.</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            <strong>Honor the rhythm, don't pathologize it.</strong> If you naturally feel more energetic in spring and more introspective in winter, that's okay. Build your year around these patterns rather than expecting constant productivity year-round.
          </p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If seasonal mood changes are interfering with your life---making it hard to work, maintain relationships, or take care of yourself---talk to a healthcare provider. You may have seasonal affective disorder, which is treatable.
        </p>
        <p className="mb-6">
          Don't assume "everyone feels this way" or that you just need to tough it out. Effective treatments exist, and you don't have to struggle through every winter.
        </p>
      </>
    ),
  },

  {
    id: catId(45),
    slug: 'circadian-rhythms-mood-internal-clock-matters',
    title: 'Circadian Rhythms and Mood: Why Your Internal Clock Matters',
    description: "Your 24-hour biological clock doesn't just regulate sleep---it profoundly influences mood, energy, and mental health. Here's how it works and why it matters.",
    image: '/images/articles/cat07/cover-045.svg',
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Circadian Rhythms', 'Depression', 'Sleep', 'Research'],
    summary: 'Your 24-hour circadian rhythm orchestrates mood, energy, hormone release, and cognitive function through the suprachiasmatic nucleus in the brain. Disruptions from irregular sleep, shift work, or poor light exposure create bidirectional relationships with depression—circadian dysfunction causes mood disorders, and mood disorders disrupt circadian timing.',
    keyFacts: [
      { text: 'The suprachiasmatic nucleus (SCN) in the hypothalamus acts as your master circadian pacemaker, coordinating sleep, hormones, metabolism, immunity, and mood', citationIndex: 7 },
      { text: 'Circadian disruption and depression have a bidirectional relationship—each can cause the other', citationIndex: 2 },
      { text: 'Shift work increases depression risk by 23%, and social jetlag (sleeping in on weekends) averages 2 hours for most people', citationIndex: 6 },
      { text: 'People with depression often show a delayed circadian phase, meaning their internal clock runs later than the external day-night cycle', citationIndex: 1 },
      { text: 'Chronotherapy interventions—light therapy, sleep restriction, wake therapy, social rhythm stabilization—can treat depression by resetting circadian timing', citationIndex: 5 },
    ],
    sparkMoment: 'Your mood isn\'t just chemistry—it\'s timing. Protecting your circadian rhythm is one of the most evidence-based, powerful actions you can take for mental health.',
    practicalExercise: {
      title: 'Strengthen Your Circadian Anchors',
      steps: [
        { title: 'Fix your wake time', description: 'Choose one wake time and maintain it 7 days a week for 3 weeks. Set multiple alarms if needed. This is the most powerful circadian anchor.' },
        { title: 'Get morning light', description: 'Within 30 minutes of waking, get 10-15 minutes of bright light—ideally outdoors. If that\'s not possible, use a 10,000 lux light box.' },
        { title: 'Dim evening lights', description: 'Starting 2-3 hours before bed, reduce artificial light. Use amber-tinted blue-light-blocking glasses if you must use screens.' },
        { title: 'Stabilize meal times', description: 'Eat meals at consistent times daily. Your gut has circadian rhythms too, and eating at erratic times disrupts them.' },
      ],
      toolLink: '/tools/sleep-architect',
      toolLabel: 'Optimize Your Sleep',
    },
    citations: [
      {
        id: '1',
        text: 'The circadian clock and mood disorders: Bidirectional relationship',
        source: 'Nature Reviews Neuroscience',
        year: '2019',
        link: 'https://doi.org/10.1038/s41583-019-0185-x',
        tier: 1,
      },
      {
        id: '2',
        text: 'Circadian rhythm disruption and depression: Evidence from human and animal studies',
        source: 'Current Psychiatry Reports',
        year: '2020',
        link: 'https://doi.org/10.1007/s11920-020-01158-x',
        tier: 1,
      },
      {
        id: '3',
        text: 'The molecular circadian clock and psychiatric disorders',
        source: 'Biological Psychiatry',
        year: '2018',
        link: 'https://doi.org/10.1016/j.biopsych.2018.02.006',
        tier: 1,
      },
      {
        id: '4',
        text: 'Social jetlag and mental health: Population-based study',
        source: 'Chronobiology International',
        year: '2019',
        link: 'https://doi.org/10.1080/07420528.2019.1567128',
        tier: 1,
      },
      {
        id: '5',
        text: 'Chronotherapy for mood disorders: Light, sleep, and wake therapy',
        source: 'Journal of Clinical Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.4088/JCP.20r13742',
        tier: 1,
      },
      {
        id: '6',
        text: 'Shift work and mental health outcomes: Meta-analysis',
        source: 'Occupational and Environmental Medicine',
        year: '2020',
        link: 'https://doi.org/10.1136/oemed-2019-106278',
        tier: 1,
      },
      {
        id: '7',
        text: 'The suprachiasmatic nucleus: Master circadian pacemaker',
        source: 'Annual Review of Neuroscience',
        year: '2020',
        link: 'https://doi.org/10.1146/annurev-neuro-091619-022522',
        tier: 1,
      },
      {
        id: '8',
        text: 'Optimizing circadian health: Practical guidelines',
        source: 'Sleep Health',
        year: '2021',
        link: 'https://doi.org/10.1016/j.sleh.2021.02.003',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your body runs on a 24-hour internal clock that orchestrates everything from when you feel hungry to when your immune system peaks. This clock---your circadian rhythm---doesn't just regulate sleep. It profoundly influences mood, energy, cognitive function, and vulnerability to mental illness.
          </p>
          <p className="mb-6">
            When this internal clock falls out of sync with the external world (due to irregular sleep, shift work, travel, or lack of light exposure), mental health suffers <Citation id="1" index={1} source="Nature Reviews Neuroscience" year="2019" tier={1} />. This article explains how circadian rhythms work and why protecting them is essential for emotional well-being.
          </p>
        </div>

        <h2 id="what-are-circadian-rhythms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Are Circadian Rhythms?
        </h2>
        <p className="mb-6">
          Circadian rhythms are physical, mental, and behavioral changes that follow a roughly 24-hour cycle, responding primarily to light and darkness. They're controlled by a master clock in your brain called the suprachiasmatic nucleus (SCN), located in the hypothalamus <Citation id="7" index={7} source="Annual Review of Neuroscience" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>The SCN coordinates:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Sleep-wake cycle</li>
          <li>Hormone release (melatonin, cortisol, growth hormone)</li>
          <li>Body temperature fluctuation</li>
          <li>Metabolism and appetite</li>
          <li>Immune function</li>
          <li>Mood and cognitive performance</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Your circadian rhythm is not just about sleep. It's a master regulator that affects nearly every system in your body---including the systems that control mood and emotional regulation.
          </p>
        </ArticleCallout>

        <h2 id="circadian-rhythms-and-mood" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Circadian Rhythms Affect Mood
        </h2>
        <p className="mb-6">
          The relationship between circadian rhythms and mood is bidirectional: disrupted circadian rhythms can cause depression, and depression can disrupt circadian rhythms <Citation id="2" index={2} source="Current Psychiatry Reports" year="2020" tier={1} />.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Neurotransmitter Regulation
        </h3>
        <p className="mb-6">
          Your circadian clock influences the production and release of mood-regulating neurotransmitters like serotonin, dopamine, and norepinephrine. Serotonin synthesis, for example, follows a circadian pattern with peaks during waking hours. When the clock is disrupted—by irregular sleep, shift work, or insufficient light—neurotransmitter timing goes awry. This means you might have low serotonin when you need it most (morning) and elevated when you should be winding down (evening), directly contributing to depressive symptoms.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Hormonal Rhythms
        </h3>
        <p className="mb-6">
          Cortisol (the stress hormone) normally peaks around 8am to wake you up and gradually drops throughout the day, reaching its lowest point at bedtime. This rhythm gives you energy in the morning and allows restful sleep at night. Depression often flattens this curve—cortisol stays elevated at night (causing insomnia) and remains low in the morning (causing that "can't get out of bed" feeling). Melatonin, the sleep hormone, also follows circadian control. When your internal clock is off, melatonin may be released too early or too late, disrupting your ability to fall asleep or wake refreshed.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Sleep Architecture
        </h3>
        <p className="mb-6">
          Circadian misalignment disrupts sleep quality and REM sleep, which are critical for emotional processing and memory consolidation. REM sleep—when you dream and process emotions—occurs more in the last third of the night. If your circadian rhythm is delayed (e.g., from staying up late), you cut into REM sleep when you wake early for work or school. Less REM means worse emotional regulation, more reactivity, and increased vulnerability to depression. Poor sleep worsens mood, which further disrupts circadian rhythms, creating a vicious cycle.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Genetic Clock Genes
        </h3>
        <p className="mb-6">
          At the cellular level, "clock genes" (like CLOCK, BMAL1, PER, and CRY) regulate circadian processes throughout your body. Mutations or dysregulation of these genes are linked to increased risk of mood disorders <Citation id="3" index={3} source="Biological Psychiatry" year="2018" tier={1} />. Studies show that people with bipolar disorder, major depression, and seasonal depression often have alterations in clock gene expression. This suggests that circadian disruption isn't just a symptom of depression—it may be a mechanism driving it.
        </p>

        <ArticleCallout variant="did-you-know">
          <p>
            People with depression often show a delayed circadian phase---meaning their internal clock is set later than the external day-night cycle. This is why morning depression symptoms are often worst, and why waking at the same time every day (even weekends) can help.
          </p>
        </ArticleCallout>

        <h2 id="what-disrupts-circadian-rhythms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Disrupts Circadian Rhythms?
        </h2>
        <p className="mb-6">
          Modern life is full of circadian disruptors:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Irregular sleep schedules:</strong> Going to bed and waking at different times each day</li>
          <li><strong>Shift work or night work:</strong> Working against your natural rhythm <Citation id="6" index={6} source="Occupational and Environmental Medicine" year="2020" tier={1} /></li>
          <li><strong>Jet lag:</strong> Rapid travel across time zones</li>
          <li><strong>Social jetlag:</strong> Sleeping in on weekends to "catch up," which shifts your internal clock <Citation id="4" index={4} source="Chronobiology International" year="2019" tier={1} /></li>
          <li><strong>Light exposure at wrong times:</strong> Bright screens late at night, insufficient daylight during the day</li>
          <li><strong>Irregular eating patterns:</strong> Meal timing also influences circadian rhythms</li>
        </ul>

        <StatCard
          stats={[
            { value: 23, suffix: '%', label: 'Increased depression risk with shift work' },
            { value: 2, suffix: 'hrs', label: 'Average social jetlag on weekends' },
            { value: 90, suffix: 'min', label: 'Circadian shift from 2 hours of evening screen time' },
          ]}
          source="Occupational & Environmental Medicine, 2020; Chronobiology International, 2019"
        />

        <h2 id="supporting-your-circadian-rhythm" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Support Your Circadian Rhythm
        </h2>
        <p className="mb-6">
          You can't fully control your environment, but you can take steps to strengthen circadian alignment <Citation id="8" index={8} source="Sleep Health" year="2021" tier={1} />:
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Consistent Sleep-Wake Times
        </h3>
        <p className="mb-6">
          Go to bed and wake up at the same time every day—including weekends. This is the single most powerful circadian anchor. If you wake at 7am Monday through Friday but 10am on Saturday and Sunday, you're giving yourself 3 hours of social jetlag—essentially flying from New York to Los Angeles and back every weekend. Your body never fully adjusts, leaving you perpetually fatigued and vulnerable to mood disturbances. Set one wake time and defend it. Use multiple alarms, place your phone across the room, and get up at first alarm. Consistency matters more than duration.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Morning Light Exposure
        </h3>
        <p className="mb-6">
          Get bright light (ideally natural sunlight) within 30 minutes of waking. Light is the most powerful circadian signal—it tells your suprachiasmatic nucleus that it's daytime and suppresses melatonin. Aim for at least 10-15 minutes outdoors, even on cloudy days (outdoor light is still 10-100x brighter than indoor lighting). If you can't get outside, use a 10,000 lux light box positioned 16-24 inches away while you eat breakfast or drink coffee. Open all curtains immediately upon waking. The earlier you get bright light, the earlier your circadian rhythm shifts forward, making it easier to wake early the next day.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Limit Evening Light
        </h3>
        <p className="mb-6">
          Dim lights 2-3 hours before bed. Your brain interprets bright light (especially blue wavelengths from screens) as "daytime," which suppresses melatonin and delays sleep. Use warm, dim lighting in the evening. Enable night shift mode on devices or wear amber-tinted blue-light-blocking glasses if you must use screens (studies show they can reduce the circadian-disrupting effects of screens by up to 50%). Better yet, establish a screen-free wind-down routine—reading paper books, journaling, stretching, or listening to podcasts. Darkness signals your body to produce melatonin, the biological cue for sleep.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Regular Meal Times
        </h3>
        <p className="mb-6">
          Eating at consistent times each day helps entrain circadian rhythms. Your gut, liver, and pancreas all have circadian clocks, and eating erratically disrupts them. Aim to eat your first meal within 1-2 hours of waking and finish your last meal 2-3 hours before bed. Late-night eating shifts your circadian rhythm later and can impair sleep quality. If you're a shift worker or have an irregular schedule, try to eat at the same relative times each day (e.g., always within 1 hour of waking, regardless of when that is).
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Strategic Exercise
        </h3>
        <p className="mb-6">
          Morning or afternoon exercise strengthens circadian rhythms by boosting body temperature and hormonal rhythms. Morning exercise in particular can help advance your circadian phase (making you a natural earlier riser). However, avoid vigorous exercise within 2 hours of bed—it raises core body temperature and cortisol, which can delay sleep onset. If evening is your only option for exercise, try gentler activities like yoga, stretching, or walking rather than high-intensity workouts.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'shift-work',
              title: 'What if I work night shifts? Can I have a healthy circadian rhythm?',
              content: (
                <div>
                  <p className="mb-4">
                    Night shift work is inherently circadian-disrupting, but you can minimize harm. Keep a consistent sleep schedule even on days off (sleep at the same time every day, even if it's during daylight). Make your bedroom as dark as possible with blackout curtains. Wear sunglasses on your commute home in the morning to block light exposure that would delay your sleep phase. Get bright light during your "day" (which is nighttime) if possible—some workplaces provide bright light boxes for night shift workers.
                  </p>
                  <p>
                    If possible, avoid rotating shifts (switching between day and night) as they prevent your body from ever adjusting. Fixed night shifts are better than constantly changing schedules.
                  </p>
                </div>
              ),
            },
            {
              id: 'social-jetlag',
              title: 'Is it really that bad to sleep in on weekends?',
              content: (
                <div>
                  <p className="mb-4">
                    Sleeping in on weekends creates "social jetlag"—the mismatch between your biological clock and social schedule. If you wake at 6am weekdays but 10am weekends, that's a 4-hour shift—equivalent to traveling from New York to Hawaii every Friday night. Your body never fully adjusts, leaving you perpetually fatigued, moody, and vulnerable to depression.
                  </p>
                  <p>
                    If you're sleep-deprived during the week, the solution isn't weekend recovery sleep—it's going to bed earlier on weeknights. Aim for no more than 1 hour difference between weekday and weekend wake times.
                  </p>
                </div>
              ),
            },
            {
              id: 'night-owl',
              title: 'I\'m a night owl. Should I fight my natural rhythm?',
              content: (
                <div>
                  <p className="mb-4">
                    True "night owl" preference (delayed sleep phase) has genetic components. However, modern life (screens, caffeine, irregular schedules) often makes this worse. If your natural rhythm genuinely aligns with late sleep/wake times AND you can maintain a consistent schedule that fits your life, that's fine.
                  </p>
                  <p>
                    The problem arises when your preferred rhythm conflicts with social demands (e.g., you naturally want to sleep 2am-10am but have to wake at 6am for work). In that case, you can gradually shift your rhythm earlier using morning bright light, melatonin supplements (under medical guidance), and consistent wake times. It takes 2-3 weeks of consistency to shift your circadian phase.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="chronotherapy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Chronotherapy: Treating Depression by Resetting the Clock
        </h2>
        <p className="mb-6">
          Chronotherapy uses circadian-based interventions to treat mood disorders <Citation id="5" index={5} source="Journal of Clinical Psychiatry" year="2021" tier={1} />. These interventions directly target circadian timing rather than neurotransmitter systems (like antidepressants do):
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Light therapy:</strong> Bright light (10,000 lux) in the morning advances the circadian phase, helping people with delayed rhythms wake earlier and improving mood in SAD and non-seasonal depression.</li>
          <li><strong>Sleep restriction:</strong> Temporarily limiting sleep to 5-6 hours builds sleep pressure (homeostatic drive), which can reset circadian timing and improve sleep quality. Used for insomnia and depression with sleep disturbances.</li>
          <li><strong>Wake therapy (sleep deprivation):</strong> Staying awake for 24-36 hours can produce rapid (but temporary) antidepressant effects in 40-60% of people with depression. Done under medical supervision and often combined with other interventions to maintain improvements.</li>
          <li><strong>Social rhythm therapy:</strong> Originally developed for bipolar disorder, this approach stabilizes daily routines—wake time, meal times, exercise, social activities. Consistency strengthens circadian rhythms and reduces mood episode recurrence.</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>
            <strong>For clinicians:</strong> Assess circadian patterns in depressed patients. Ask about sleep-wake times, light exposure, shift work, and social jetlag. Circadian-based interventions can enhance outcomes when integrated with standard treatments.
          </p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you have persistent circadian rhythm disruption (due to shift work, travel, or chronic sleep problems) and are experiencing mood symptoms, talk to a healthcare provider. Circadian rhythm sleep disorders are treatable, and addressing them can improve depression outcomes.
        </p>
        <p className="mb-6">
          Your internal clock is powerful---and protecting it is one of the most evidence-based things you can do for your mental health.
        </p>
      </>
    ),
  },
];
