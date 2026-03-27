 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SLEEP_BODY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
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
  HighlightBox,
} from '../../../components/article/blocks';

export const sleepDisordersCommonProblemsArticlesA: Article[] = [
  {
    id: catId(11),
    slug: 'insomnia-complete-guide-brain-wont-let-you-sleep',
    title: "Insomnia: A Complete Guide to When Your Brain Won't Let You Sleep",
    description: "Insomnia is more than occasional sleepless nights. Explore the types, causes, and evidence-based treatments for the most common sleep disorder.",
    image: "/images/articles/cat09/cover-011.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 13,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Insomnia', 'Sleep Disorders', 'Chronic Insomnia', 'Treatment'],
    citations: [
      {
        id: '1',
        text: 'International classification of sleep disorders, third edition',
        source: 'American Academy of Sleep Medicine',
        year: '2014',
        link: 'https://aasm.org/clinical-resources/international-classification-sleep-disorders/',
        tier: 4,
      },
      {
        id: '2',
        text: 'Insomnia: definition, prevalence, etiology, and consequences',
        source: 'Journal of Clinical Sleep Medicine',
        year: '2007',
        link: 'https://doi.org/10.5664/jcsm.26929',
        tier: 1,
      },
      {
        id: '3',
        text: 'Cognitive behavioral therapy for insomnia: a systematic review',
        source: 'Annals of Internal Medicine',
        year: '2015',
        link: 'https://doi.org/10.7326/M14-2841',
        tier: 1,
      },
      {
        id: '4',
        text: 'Hyperarousal and insomnia',
        source: 'Sleep Medicine Reviews',
        year: '2020',
        link: 'https://doi.org/10.1016/j.smrv.2019.101259',
        tier: 1,
      },
      {
        id: '5',
        text: 'Pharmacological treatment of insomnia',
        source: 'Sleep Medicine',
        year: '2021',
        link: 'https://doi.org/10.1016/j.sleep.2021.01.011',
        tier: 1,
      },
      {
        id: '6',
        text: 'The neurobiology of insomnia',
        source: 'Current Psychiatry Reports',
        year: '2020',
        link: 'https://doi.org/10.1007/s11920-020-01173-2',
        tier: 1,
      },
      {
        id: '7',
        text: 'Comorbid insomnia and mental disorders',
        source: 'Sleep',
        year: '2019',
        link: 'https://doi.org/10.1093/sleep/zsz030',
        tier: 1,
      },
      {
        id: '8',
        text: 'Insomnia disorder',
        source: 'National Institute of Mental Health',
        year: '2023',
        link: 'https://www.nimh.nih.gov/health/topics/sleep-disorders',
        tier: 2,
      },
      {
        id: '9',
        text: 'Sleep restriction therapy for insomnia',
        source: 'Behavioral Sleep Medicine',
        year: '2020',
        link: 'https://doi.org/10.1080/15402002.2019.1698496',
        tier: 1,
      },
      {
        id: '10',
        text: 'Long-term outcomes of CBT for insomnia',
        source: 'JAMA Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1001/jamapsychiatry.2021.0013',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Lying awake at 2 AM, watching the clock, calculating how many hours of sleep you'll get if you fall asleep <em>right now</em>---this is the exhausting reality of insomnia, the most common sleep disorder worldwide.
          </p>
          <p className="mb-6">
            Insomnia isn't just difficulty falling asleep. It's a complex condition characterized by persistent problems initiating or maintaining sleep, despite adequate opportunity to sleep, that causes significant distress or impairment during the day <Citation id="1" index={1} source="American Academy of Sleep Medicine" year="2014" tier={4} />.
          </p>
          <p className="mb-6">
            About 10-30% of adults experience chronic insomnia at any given time <Citation id="2" index={2} source="Journal of Clinical Sleep Medicine" year="2007" tier={1} />, making it one of the most prevalent yet undertreated health conditions. Understanding insomnia---its causes, types, and evidence-based treatments---is the first step toward breaking the cycle.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 30, suffix: '%', label: 'Adults with insomnia symptoms' },
            { value: 10, suffix: '%', label: 'Meet criteria for chronic insomnia disorder' },
            { value: 75, suffix: '%', label: 'Of those with depression also have insomnia' },
          ]}
          source="NIMH, 2023; JCSM, 2007"
        />

        <h2 id="diagnostic-criteria" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Qualifies as Insomnia?
        </h2>
        <p className="mb-6">
          To meet diagnostic criteria for insomnia disorder, you must have:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Difficulty falling asleep, staying asleep, or early morning awakening</strong> (with inability to return to sleep)</li>
          <li><strong>Adequate opportunity to sleep</strong> (you're not being deprived of sleep by external factors)</li>
          <li><strong>Daytime impairment</strong> such as fatigue, mood disturbance, difficulty concentrating, or impaired performance</li>
          <li><strong>Frequency:</strong> Occurs at least 3 nights per week</li>
          <li><strong>Duration:</strong> Persists for at least 3 months (for chronic insomnia)</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>
            <strong>Acute insomnia</strong> (short-term, lasting less than 3 months) is often triggered by stress, travel, or life changes. <strong>Chronic insomnia</strong> persists for 3+ months and often develops its own maintaining factors even after the original trigger resolves.
          </p>
        </ArticleCallout>

        <h2 id="types" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Types of Insomnia
        </h2>

        <ArticleTabs
          tabs={[
            {
              id: 'sleep-onset',
              label: 'Sleep-Onset Insomnia',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Difficulty falling asleep</strong> --- often lying awake for 30+ minutes after lights out. This type is common in people with anxiety, racing thoughts, or heightened arousal at bedtime.
                  </p>
                  <p>
                    <strong>Typical pattern:</strong> Normal sleep once achieved, but the struggle to initiate sleep causes sleep deprivation over time.
                  </p>
                </div>
              ),
            },
            {
              id: 'sleep-maintenance',
              label: 'Sleep-Maintenance Insomnia',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Difficulty staying asleep</strong> --- frequent nighttime awakenings (often 3+ times per night) with trouble returning to sleep. This type is common in older adults and people with chronic pain or sleep apnea.
                  </p>
                  <p>
                    <strong>Typical pattern:</strong> Fragmented sleep, feeling like you "never slept deeply."
                  </p>
                </div>
              ),
            },
            {
              id: 'early-morning',
              label: 'Early Morning Awakening',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Waking too early</strong> (e.g., 4 or 5 AM) with inability to return to sleep. Strongly associated with depression, this type involves waking 1-2+ hours before your desired wake time.
                  </p>
                  <p>
                    <strong>Typical pattern:</strong> Total sleep time is reduced, causing significant daytime fatigue.
                  </p>
                </div>
              ),
            },
            {
              id: 'mixed',
              label: 'Mixed Insomnia',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Combination of types</strong> --- difficulty falling asleep, staying asleep, and/or early awakening. Often the most severe and impairing form.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="causes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Causes Insomnia?
        </h2>
        <p className="mb-6">
          Insomnia is rarely caused by a single factor. Instead, it typically develops through a combination of predisposing factors (genetics, temperament), precipitating factors (triggers like stress or illness), and perpetuating factors (behaviors that maintain the insomnia).
        </p>

        <ComparisonTable
          title="The 3-P Model of Insomnia"
          columns={['Factor Type', 'Description', 'Examples']}
          items={[
            {
              feature: 'Predisposing',
              values: ['Vulnerabilities that increase risk', 'Genetic predisposition, anxiety-prone temperament, hyperarousal tendency'],
            },
            {
              feature: 'Precipitating',
              values: ['Events that trigger insomnia onset', 'Job loss, relationship breakup, medical illness, trauma, travel'],
            },
            {
              feature: 'Perpetuating',
              values: ['Behaviors that maintain insomnia', 'Excessive time in bed, napping, irregular schedule, worry about sleep'],
            },
          ]}
        />

        <h2 id="hyperarousal" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Hyperarousal Theory
        </h2>
        <p className="mb-6">
          One of the most well-supported explanations for chronic insomnia is the <strong>hyperarousal model</strong> <Citation id="4" index={4} source="Sleep Medicine Reviews" year="2020" tier={1} />. People with insomnia show elevated physiological, cognitive, and emotional arousal---not just at bedtime, but throughout the 24-hour day.
        </p>
        <p className="mb-6">
          <strong>Evidence of hyperarousal:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Physiological:</strong> Higher heart rate, elevated cortisol, increased body temperature, greater brain activity during sleep attempts</li>
          <li><strong>Cognitive:</strong> Racing thoughts, worry, rumination, selective attention to sleep-related threats</li>
          <li><strong>Emotional:</strong> Heightened anxiety, frustration, distress about sleep</li>
        </ul>
        <p className="mb-6">
          This state of hyperarousal makes it biologically difficult to transition into sleep, even when the person is tired. It's not that they're 'choosing' to stay awake---their nervous system is stuck in a wakefulness mode.
        </p>

        <QuoteBlock
          quote={`Insomnia isn't about not being tired enough. It's about being too "awake"---your brain and body are on high alert, and sleep feels impossible even when you're exhausted.`}
          attribution="Dr. Charles Morin"
          role="Insomnia Researcher"
          source="Université Laval, 2020"
        />

        <h2 id="comorbidities" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Insomnia and Mental Health
        </h2>
        <p className="mb-6">
          Insomnia rarely exists in isolation. It's bidirectionally related to mental health conditions <Citation id="7" index={7} source="Sleep" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Depression:</strong> 75% of people with depression have insomnia; insomnia increases depression risk by 2-4x</li>
          <li><strong>Anxiety:</strong> Worry and rumination drive sleep-onset insomnia; poor sleep worsens anxiety symptoms</li>
          <li><strong>PTSD:</strong> Hypervigilance and nightmares disrupt sleep; insomnia maintains PTSD symptoms</li>
          <li><strong>Substance use:</strong> Alcohol and sedatives may temporarily help sleep but worsen insomnia long-term</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Treating insomnia can improve mental health outcomes. Research shows that cognitive behavioral therapy for insomnia (CBT-I) reduces symptoms of depression and anxiety even when those conditions aren't directly treated.
          </p>
        </ArticleCallout>

        <h2 id="perpetuating-behaviors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Insomnia Becomes Chronic: Perpetuating Behaviors
        </h2>
        <p className="mb-6">
          What starts as acute insomnia (from stress, illness, or life changes) often becomes chronic because of well-intentioned but counterproductive coping strategies:
        </p>

        <BeforeAfter
          before={{
            title: 'Sleep-Disrupting Behaviors',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Spending 9+ hours in bed to "try harder" to sleep</li>
                <li>Napping during the day to compensate</li>
                <li>Going to bed very early "just in case"</li>
                <li>Lying in bed awake, trying to force sleep</li>
                <li>Using alcohol or sedatives as sleep aids</li>
                <li>Avoiding activities due to fatigue</li>
                <li>Constantly monitoring sleep (apps, clocks)</li>
              </ul>
            ),
          }}
          after={{
            title: 'Sleep-Promoting Behaviors',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Limiting time in bed to match actual sleep time</li>
                <li>Avoiding daytime naps</li>
                <li>Going to bed only when sleepy</li>
                <li>Leaving bed if unable to sleep within 20 min</li>
                <li>Avoiding substances that disrupt sleep architecture</li>
                <li>Maintaining normal activities despite tiredness</li>
                <li>Not clock-watching or tracking sleep excessively</li>
              </ul>
            ),
          }}
        />

        <h2 id="consequences" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Consequences of Chronic Insomnia
        </h2>
        <p className="mb-6">
          Untreated chronic insomnia affects nearly every domain of life:
        </p>

        <ArticleChart
          type="radar"
          title="Impact Domains of Chronic Insomnia"
          data={[
            { label: 'Cognitive Function', value: 75 },
            { label: 'Mood/Emotions', value: 85 },
            { label: 'Physical Health', value: 60 },
            { label: 'Work Performance', value: 70 },
            { label: 'Relationships', value: 65 },
            { label: 'Quality of Life', value: 80 },
          ]}
          source="Journal of Clinical Sleep Medicine, 2007"
        />

        <h2 id="treatment-overview" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Treatments for Insomnia
        </h2>
        <p className="mb-6">
          The good news: insomnia is highly treatable. The gold-standard treatment is <strong>Cognitive Behavioral Therapy for Insomnia (CBT-I)</strong>, which is more effective than medication in the long term <Citation id="3" index={3} source="Annals of Internal Medicine" year="2015" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Cognitive Behavioral Therapy for Insomnia (CBT-I)',
              description: (
                <p>
                  CBT-I addresses the thoughts and behaviors that perpetuate insomnia through sleep restriction, stimulus control, cognitive restructuring, and relaxation techniques. Typically delivered in 4-8 sessions, it produces lasting improvements in 70-80% of people <Citation id="10" index={10} source="JAMA Psychiatry" year="2021" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Sleep Restriction Therapy',
              description: (
                <p>
                  Limits time in bed to match actual sleep time, creating mild sleep deprivation that increases sleep drive and consolidates sleep. Gradually, time in bed is extended as sleep improves <Citation id="9" index={9} source="Behavioral Sleep Medicine" year="2020" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Stimulus Control',
              description: (
                <p>
                  Re-associates the bed with sleep (not wakefulness) by using the bed only for sleep and intimacy, leaving bed if unable to sleep within 20 minutes, and maintaining a consistent wake time.
                </p>
              ),
            },
            {
              title: 'Medication (When Appropriate)',
              description: (
                <p>
                  Short-term use of sleep medications (benzodiazepines, Z-drugs, melatonin receptor agonists) can provide relief during acute insomnia or while starting CBT-I. However, long-term use often leads to tolerance, dependence, and rebound insomnia <Citation id="5" index={5} source="Sleep Medicine" year="2021" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Treat Underlying Conditions',
              description: (
                <p>
                  If insomnia is comorbid with depression, anxiety, PTSD, or a medical condition, treating those conditions alongside insomnia improves outcomes. However, insomnia often requires specific treatment even when comorbidities are addressed.
                </p>
              ),
            },
          ]}
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          Seek help from a healthcare provider or sleep specialist if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Insomnia persists for 3+ months despite good sleep hygiene</li>
          <li>Daytime impairment is significant (fatigue, mood problems, poor concentration)</li>
          <li>You're relying on alcohol or medications to sleep</li>
          <li>Insomnia is worsening depression, anxiety, or other mental health conditions</li>
          <li>You suspect another sleep disorder (sleep apnea, restless legs syndrome, etc.)</li>
        </ul>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'cbt-i-access',
              title: 'How do I access CBT-I?',
              content: (
                <p>
                  CBT-I is available through sleep specialists, psychologists trained in behavioral sleep medicine, and increasingly via digital apps (e.g., Sleepio, SHUTi). Ask your primary care provider for a referral, or search for providers through the Society of Behavioral Sleep Medicine directory.
                </p>
              ),
            },
            {
              id: 'meds-ok',
              title: 'Are sleep medications ever appropriate?',
              content: (
                <p>
                  Yes, for short-term use (2-4 weeks) during acute insomnia or as a bridge while starting CBT-I. However, they're not a long-term solution and should always be combined with behavioral strategies. Never stop sleep medications abruptly---work with your provider to taper safely.
                </p>
              ),
            },
            {
              id: 'natural-remedies',
              title: 'What about melatonin or herbal supplements?',
              content: (
                <p>
                  Melatonin can help with circadian rhythm issues (jet lag, delayed sleep phase) but has limited evidence for chronic insomnia. Herbal supplements (valerian, chamomile) have minimal supporting research. Always discuss supplements with your provider, as they can interact with medications.
                </p>
              ),
            },
          ]}
        />

        <h2 id="key-takeaways" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Takeaways
        </h2>
        <ArticleCallout variant="key-takeaway">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Insomnia is a disorder</strong>, not a character flaw or "just stress." It has biological underpinnings (hyperarousal) and requires treatment.</li>
            <li><strong>Chronic insomnia</strong> persists for 3+ months, occurs 3+ nights/week, and causes daytime impairment.</li>
            <li><strong>Perpetuating behaviors</strong> (excessive time in bed, napping, irregular schedules) maintain insomnia even after triggers resolve.</li>
            <li><strong>CBT-I is the gold-standard treatment</strong>, with 70-80% effectiveness and lasting results.</li>
            <li><strong>Insomnia and mental health</strong> are bidirectionally linked---treating one improves the other.</li>
            <li><strong>Seek professional help</strong> if insomnia persists despite self-help efforts or significantly impairs your life.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(12),
    slug: 'cbt-i-gold-standard-insomnia-treatment',
    title: "CBT-I: The Gold-Standard Treatment for Insomnia That Most People Haven't Heard Of",
    description: "Cognitive Behavioral Therapy for Insomnia is more effective than medication for long-term sleep improvement. Learn how it works and who it helps.",
    image: "/images/articles/cat09/cover-012.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['CBT-I', 'Insomnia Treatment', 'Sleep Therapy', 'Behavioral Medicine'],
    citations: [
      {
        id: '1',
        text: 'Efficacy of cognitive behavioral therapy for insomnia: a meta-analysis',
        source: 'Sleep Medicine Reviews',
        year: '2015',
        link: 'https://doi.org/10.1016/j.smrv.2014.11.007',
        tier: 1,
      },
      {
        id: '2',
        text: 'CBT-I versus pharmacotherapy: long-term outcomes',
        source: 'JAMA',
        year: '2006',
        link: 'https://doi.org/10.1001/jama.295.24.2851',
        tier: 1,
      },
      {
        id: '3',
        text: 'Sleep restriction therapy: implementation and mechanisms',
        source: 'Sleep Medicine Clinics',
        year: '2019',
        link: 'https://doi.org/10.1016/j.jsmc.2019.05.002',
        tier: 1,
      },
      {
        id: '4',
        text: 'Stimulus control instructions for insomnia',
        source: 'Behaviour Research and Therapy',
        year: '1972',
        link: 'https://doi.org/10.1016/0005-7967(72)90061-5',
        tier: 1,
      },
      {
        id: '5',
        text: 'Digital CBT-I: effectiveness and accessibility',
        source: 'Sleep',
        year: '2021',
        link: 'https://doi.org/10.1093/sleep/zsab045',
        tier: 1,
      },
      {
        id: '6',
        text: 'CBT-I for comorbid insomnia and depression',
        source: 'Journal of Clinical Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.4088/JCP.19r12928',
        tier: 1,
      },
      {
        id: '7',
        text: 'Cognitive restructuring in CBT-I',
        source: 'Cognitive and Behavioral Practice',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cbpra.2019.12.002',
        tier: 1,
      },
      {
        id: '8',
        text: 'CBT for insomnia',
        source: 'National Sleep Foundation',
        year: '2022',
        link: 'https://www.thensf.org/cognitive-behavioral-therapy-insomnia/',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            If you told your doctor you have chronic insomnia, you'd likely receive a prescription for sleeping pills. But there's a more effective, longer-lasting treatment that most people have never heard of: Cognitive Behavioral Therapy for Insomnia, or CBT-I.
          </p>
          <p className="mb-6">
            CBT-I is a structured, evidence-based program that addresses the thoughts and behaviors perpetuating insomnia. Unlike medication, which provides temporary relief, CBT-I targets the root causes of sleeplessness and produces lasting improvements in 70-80% of people who complete it <Citation id="1" index={1} source="Sleep Medicine Reviews" year="2015" tier={1} />.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 75, suffix: '%', label: 'Improvement rate with CBT-I' },
            { value: 6, suffix: '', label: 'Typical number of sessions' },
            { value: 2, suffix: 'yrs', label: 'Benefits sustained at 2-year follow-up' },
          ]}
          source="Sleep Medicine Reviews, 2015; JAMA, 2006"
        />

        <h2 id="what-is-cbt-i" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is CBT-I?
        </h2>
        <p className="mb-6">
          CBT-I is a multi-component treatment that combines behavioral techniques (sleep restriction, stimulus control), cognitive therapy (challenging dysfunctional beliefs about sleep), and education about sleep hygiene and sleep biology.
        </p>
        <p className="mb-6">
          Unlike general CBT, which addresses a broad range of psychological issues, CBT-I is specifically designed for insomnia. It's typically delivered in 4-8 weekly sessions (individual or group) by a psychologist, sleep specialist, or trained clinician. Digital versions (apps, online programs) are also increasingly available and effective <Citation id="5" index={5} source="Sleep" year="2021" tier={1} />.
        </p>

        <h2 id="components" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Five Core Components of CBT-I
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: '1. Sleep Restriction Therapy',
              description: (
                <p>
                  Limits time in bed to match actual sleep time, creating mild sleep deprivation that increases sleep drive and consolidates sleep <Citation id="3" index={3} source="Sleep Medicine Clinics" year="2019" tier={1} />. For example, if you spend 9 hours in bed but only sleep 6, you'd initially restrict time in bed to 6 hours. As sleep efficiency improves (sleeping 85%+ of time in bed), time is gradually extended.
                </p>
              ),
            },
            {
              title: '2. Stimulus Control',
              description: (
                <p>
                  Re-associates the bed with sleep (not wakefulness) through behavioral rules <Citation id="4" index={4} source="Behaviour Research and Therapy" year="1972" tier={1} />: go to bed only when sleepy, leave bed if unable to sleep within 15-20 minutes, use the bed only for sleep and intimacy, maintain a consistent wake time.
                </p>
              ),
            },
            {
              title: '3. Cognitive Restructuring',
              description: (
                <p>
                  Identifies and challenges dysfunctional beliefs about sleep <Citation id="7" index={7} source="Cognitive and Behavioral Practice" year="2020" tier={1} />. Common unhelpful thoughts include "I must get 8 hours or I'll be a disaster tomorrow,", "My insomnia is ruining my life," or "I'll never sleep normally again." CBT-I helps replace these with realistic, evidence-based perspectives.
                </p>
              ),
            },
            {
              title: '4. Sleep Hygiene Education',
              description: (
                <p>
                  Teaches evidence-based habits that support sleep: consistent schedule, appropriate sleep environment (cool, dark, quiet), avoiding caffeine/alcohol, managing light exposure, regular exercise.
                </p>
              ),
            },
            {
              title: '5. Relaxation Techniques',
              description: (
                <p>
                  Addresses the hyperarousal that maintains insomnia through progressive muscle relaxation, diaphragmatic breathing, guided imagery, or mindfulness meditation. These techniques reduce physiological and cognitive arousal at bedtime.
                </p>
              ),
            },
          ]}
        />

        <h2 id="sleep-restriction-detail" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Sleep Restriction: The Counterintuitive Core of CBT-I
        </h2>
        <p className="mb-6">
          Sleep restriction therapy is often the most challenging---and most effective---component of CBT-I. It feels counterintuitive: limiting sleep when you're already sleep-deprived. But the logic is sound.
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'rationale',
              label: 'The Rationale',
              content: (
                <div>
                  <p className="mb-4">
                    People with insomnia often spend excessive time in bed trying to "catch up" on sleep. This dilutes sleep pressure (the biological drive to sleep) and creates long periods of wakefulness in bed---which trains the brain to associate the bed with being awake, not sleeping.
                  </p>
                  <p>
                    Sleep restriction creates mild sleep deprivation, which increases sleep drive and makes it easier to fall asleep and stay asleep. Over time, this consolidates sleep into a shorter, more efficient window.
                  </p>
                </div>
              ),
            },
            {
              id: 'process',
              label: 'How It Works',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Step 1:</strong> Calculate your average sleep time from a sleep diary (e.g., 6 hours).<br />
                    <strong>Step 2:</strong> Restrict time in bed to match that average (but never less than 5 hours for safety).<br />
                    <strong>Step 3:</strong> Maintain a consistent wake time.<br />
                    <strong>Step 4:</strong> Once sleep efficiency (time asleep / time in bed) reaches 85-90%, add 15-30 minutes to your sleep window.<br />
                    <strong>Step 5:</strong> Repeat until you reach optimal sleep duration.
                  </p>
                </div>
              ),
            },
            {
              id: 'challenges',
              label: 'Common Challenges',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Initial fatigue:</strong> The first 1-2 weeks can be tough. You may feel more tired as your body adjusts. This is expected and temporary.<br />
                    <strong>Resisting naps:</strong> Daytime napping reduces sleep pressure at night, undermining the process. Stay awake during the day, even if you're tired.<br />
                    <strong>Maintaining the schedule:</strong> Consistency is critical. Sleeping in on weekends or going to bed early "just in case" disrupts progress.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning">
          <p>
            <strong>Safety note:</strong> Sleep restriction is generally safe for healthy adults, but it should be done under professional guidance if you have bipolar disorder, seizure disorder, or a job requiring high alertness (e.g., operating heavy machinery, driving long distances).
          </p>
        </ArticleCallout>

        <h2 id="stimulus-control-detail" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Stimulus Control: Re-Training Your Brain
        </h2>
        <p className="mb-6">
          Stimulus control is based on classical conditioning: if you spend hours lying awake in bed (trying to sleep, worrying, watching TV), your brain learns to associate the bed with wakefulness and frustration---not sleep.
        </p>
        <p className="mb-6">
          <strong>The rules:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Go to bed only when sleepy (not just tired---actually ready to sleep)</li>
          <li>If you can't fall asleep within 15-20 minutes, get out of bed and do a quiet, non-stimulating activity until you feel sleepy again</li>
          <li>Use the bed only for sleep and intimacy (no TV, work, scrolling, or reading)</li>
          <li>Wake up at the same time every day, regardless of how much you slept</li>
          <li>Avoid daytime napping</li>
        </ul>

        <QuoteBlock
          quote="Stimulus control is about breaking the association between your bed and frustration. If you're lying there awake, your bed becomes a place of stress. By getting up and returning only when sleepy, you retrain your brain to see the bed as a place for sleep---and only sleep."
          attribution="Dr. Richard Bootzin"
          role="Developer of Stimulus Control Therapy"
          source="University of Arizona, 1972"
        />

        <h2 id="cognitive-component" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cognitive Restructuring: Challenging Sleep-Related Thoughts
        </h2>
        <p className="mb-6">
          People with chronic insomnia often develop catastrophic beliefs about sleep and its consequences. These thoughts increase anxiety and arousal, making sleep even harder to achieve.
        </p>

        <ComparisonTable
          title="Challenging Unhelpful Sleep Thoughts"
          columns={['Unhelpful Thought', 'Reality-Based Alternative']}
          items={[
            {
              feature: "I must get 8 hours or I'll be a disaster tomorrow.",
              values: ["I function reasonably well on 6-7 hours. One bad night won't ruin me."],
            },
            {
              feature: 'My insomnia is permanent and unfixable.',
              values: ["Insomnia is highly treatable. I'm learning skills to improve my sleep."],
            },
            {
              feature: "If I don't fall asleep soon, I'll never sleep tonight.",
              values: ["Sleep comes in cycles. If I don't sleep now, I'll get another chance later."],
            },
            {
              feature: "I can't function without perfect sleep.",
              values: ["I've functioned before on less-than-ideal sleep. It's uncomfortable but manageable."],
            },
          ]}
        />

        <h2 id="effectiveness" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Effective Is CBT-I?
        </h2>
        <p className="mb-6">
          CBT-I is the most evidence-based treatment for chronic insomnia. Meta-analyses show:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>70-80% of people</strong> experience significant improvement in sleep onset, sleep maintenance, or both <Citation id="1" index={1} source="Sleep Medicine Reviews" year="2015" tier={1} /></li>
          <li><strong>Benefits persist long-term:</strong> Improvements are maintained at 1-year and 2-year follow-ups, unlike medication which only works while being taken <Citation id="2" index={2} source="JAMA" year="2006" tier={1} /></li>
          <li><strong>Superior to medication:</strong> Head-to-head trials show CBT-I is as effective as sleeping pills in the short term and more effective in the long term</li>
          <li><strong>Works for comorbid insomnia:</strong> CBT-I is effective even when insomnia occurs alongside depression, anxiety, PTSD, or chronic pain <Citation id="6" index={6} source="Journal of Clinical Psychiatry" year="2020" tier={1} /></li>
        </ul>

        <ArticleChart
          type="line"
          title="Sleep Quality: CBT-I vs. Medication Over Time"
          data={[
            { label: 'Baseline', value: 40 },
            { label: '2 weeks', value: 70 },
            { label: '8 weeks', value: 85 },
            { label: '6 months', value: 80 },
            { label: '1 year', value: 78 },
            { label: '2 years', value: 75 },
          ]}
          source="JAMA, 2006"
        />

        <h2 id="who-benefits" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Benefits from CBT-I?
        </h2>
        <p className="mb-6">
          CBT-I is appropriate for:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Adults with chronic insomnia (3+ months, 3+ nights/week)</li>
          <li>People with insomnia comorbid with depression, anxiety, PTSD, or chronic pain</li>
          <li>Older adults (CBT-I is particularly effective in this population)</li>
          <li>Individuals who want to discontinue sleep medication</li>
          <li>People for whom medication is contraindicated (pregnancy, substance use history, certain medical conditions)</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>
            CBT-I can be combined with medication initially, with the goal of tapering medication as behavioral strategies take effect. Many people successfully discontinue sleeping pills after completing CBT-I.
          </p>
        </ArticleCallout>

        <h2 id="digital-cbt-i" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Digital CBT-I: Increasing Access
        </h2>
        <p className="mb-6">
          One barrier to CBT-I has been access---not enough trained clinicians, high cost, and geographic limitations. Digital CBT-I programs (delivered via apps or websites) are addressing this gap <Citation id="5" index={5} source="Sleep" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Effective digital programs include:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Sleepio:</strong> Fully automated, 6-week program with personalized recommendations</li>
          <li><strong>SHUTi:</strong> Internet-based CBT-I developed at the University of Virginia</li>
          <li><strong>Somryst:</strong> FDA-cleared digital therapeutic (prescription required)</li>
          <li><strong>CBT-I Coach:</strong> Free app from the VA, designed as a companion to therapy</li>
        </ul>
        <p className="mb-6">
          Research shows digital CBT-I is nearly as effective as in-person therapy for many people, with the added benefits of convenience, lower cost, and 24/7 accessibility.
        </p>

        <h2 id="what-to-expect" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What to Expect During CBT-I
        </h2>

        <BeforeAfter
          before={{
            title: 'Before CBT-I',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Spending 9+ hours in bed, sleeping 5-6</li>
                <li>Lying awake 1-2 hours trying to fall asleep</li>
                <li>Waking multiple times, lying awake in frustration</li>
                <li>Napping during the day to cope with fatigue</li>
                <li>Dreading bedtime, anxious about another bad night</li>
                <li>Relying on sleep medication with diminishing returns</li>
              </ul>
            ),
          }}
          after={{
            title: 'After CBT-I (6-8 weeks)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>In bed 7-8 hours, sleeping 6.5-7</li>
                <li>Falling asleep within 15-20 minutes</li>
                <li>Fewer awakenings, returning to sleep more easily</li>
                <li>No daytime napping, better daytime energy</li>
                <li>Reduced anxiety about sleep</li>
                <li>Medication-free or significantly reduced reliance</li>
              </ul>
            ),
          }}
        />

        <h2 id="challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Challenges and How to Overcome Them
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'initial-worsening',
              title: 'My sleep got worse in the first week. Is that normal?',
              content: (
                <p>
                  Yes. Sleep restriction creates short-term sleep deprivation, which can feel uncomfortable. This is temporary---most people see improvement by week 2-3. Stick with the program.
                </p>
              ),
            },
            {
              id: 'cant-stay-awake',
              title: "I can't stay awake during my restricted sleep window. What do I do?",
              content: (
                <p>
                  If you're falling asleep earlier than your prescribed bedtime, engage in mildly stimulating activities (light chores, social conversation, gentle movement). Avoid screens or intense activity, but don't allow yourself to doze off early.
                </p>
              ),
            },
            {
              id: 'partner-impact',
              title: 'How do I manage CBT-I with a partner who has different sleep needs?',
              content: (
                <p>
                  Communication is key. Explain the process and its temporary challenges. You may need to sleep in separate rooms during the intensive phase of sleep restriction. Once your sleep is consolidated, you can return to shared sleeping arrangements.
                </p>
              ),
            },
          ]}
        />

        <h2 id="key-takeaways" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Takeaways
        </h2>
        <ArticleCallout variant="key-takeaway">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>CBT-I is the gold-standard treatment</strong> for chronic insomnia, with 70-80% effectiveness.</li>
            <li><strong>It works by addressing root causes</strong>: sleep restriction consolidates sleep, stimulus control re-associates the bed with sleep, and cognitive restructuring reduces sleep-related anxiety.</li>
            <li><strong>Benefits are long-lasting</strong>, unlike medication which only works while being taken.</li>
            <li><strong>Digital CBT-I</strong> makes the treatment more accessible and is nearly as effective as in-person therapy.</li>
            <li><strong>The first 1-2 weeks can be challenging</strong>, but improvement typically follows quickly---persistence is key.</li>
            <li><strong>CBT-I works even with comorbid conditions</strong> like depression, anxiety, and chronic pain.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(13),
    slug: 'sleep-apnea-breathing-disorder-mental-health',
    title: 'Sleep Apnea: The Breathing Disorder That Affects Your Mental Health',
    description: 'Sleep apnea disrupts breathing during sleep, fragmenting rest and increasing risk of depression, anxiety, and cognitive impairment.',
    image: "/images/articles/cat09/cover-013.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Sleep Apnea', 'OSA', 'CPAP', 'Mental Health'],
    summary: 'Sleep apnea causes repeated breathing interruptions during sleep, fragmenting rest and depriving the brain of oxygen. Beyond physical risks like heart disease, untreated sleep apnea significantly impacts mental health, increasing rates of depression, anxiety, and cognitive decline.',
    keyFacts: [
      { text: '25 million Americans have sleep apnea, with many cases undiagnosed', citationIndex: 5 },
      { text: '46% of people with obstructive sleep apnea experience depressive symptoms', citationIndex: 2 },
      { text: 'CPAP therapy shows 70-80% effectiveness when used consistently for 4+ hours per night', citationIndex: 3 },
      { text: 'Untreated sleep apnea increases cardiovascular disease risk by 2-3 times', citationIndex: 4 },
      { text: 'Each apnea episode can last 10+ seconds and occur hundreds of times per night', citationIndex: 1 },
    ],
    sparkMoment: 'Sleep apnea isn\'t just snoring—it\'s your brain being woken hundreds of times each night to restart breathing, preventing the deep, restorative sleep that mental health depends on.',
    practicalExercise: {
      title: 'Sleep Apnea Self-Assessment',
      steps: [
        { title: 'Track Your Symptoms', description: 'For one week, note: loud snoring (ask a partner), morning headaches, daytime sleepiness, difficulty concentrating, and witnessed breathing pauses during sleep.' },
        { title: 'Complete the STOP-BANG Questionnaire', description: 'Answer 8 yes/no questions about Snoring, Tiredness, Observed apneas, blood Pressure, BMI, Age, Neck circumference, and Gender. 3+ yes answers suggest high OSA risk.' },
        { title: 'Evaluate Daytime Impact', description: 'Rate your likelihood of falling asleep during quiet activities (reading, watching TV, as a passenger in a car) on a scale of 0-3. Scores above 10 indicate significant sleepiness.' },
        { title: 'Discuss with Your Provider', description: 'Bring your symptom log and questionnaire results to your doctor. If OSA is suspected, they can order a sleep study for diagnosis.' },
      ],
      toolLink: '/tools/sleep-architect',
      toolLabel: 'Track Your Sleep Patterns',
    },
    citations: [
      { id: '1', text: 'Obstructive sleep apnea: clinical features, pathophysiology, and diagnosis', source: 'American Journal of Respiratory and Critical Care Medicine', year: '2021', link: 'https://doi.org/10.1164/rccm.202012-4501SO', tier: 1 },
      { id: '2', text: 'Sleep apnea and mental health: bidirectional relationships', source: 'Sleep Medicine Reviews', year: '2021', link: 'https://doi.org/10.1016/j.smrv.2021.101447', tier: 1 },
      { id: '3', text: 'CPAP adherence and depression outcomes in OSA patients', source: 'Journal of Clinical Sleep Medicine', year: '2019', link: 'https://doi.org/10.5664/jcsm.7780', tier: 1 },
      { id: '4', text: 'Untreated obstructive sleep apnea and cardiovascular disease risk', source: 'Circulation', year: '2020', link: 'https://doi.org/10.1161/CIRCULATIONAHA.119.044195', tier: 1 },
      { id: '5', text: 'Sleep apnea', source: 'National Heart, Lung, and Blood Institute', year: '2022', link: 'https://www.nhlbi.nih.gov/health/sleep-apnea', tier: 2 },
      { id: '6', text: 'Cognitive impairment in obstructive sleep apnea', source: 'Chest', year: '2020', link: 'https://doi.org/10.1016/j.chest.2020.03.020', tier: 1 },
      { id: '7', text: 'Alternative treatments for sleep apnea', source: 'Sleep Medicine Clinics', year: '2020', link: 'https://doi.org/10.1016/j.jsmc.2020.02.004', tier: 1 },
      { id: '8', text: 'Home sleep apnea testing: clinical utility and accuracy', source: 'Annals of the American Thoracic Society', year: '2020', link: 'https://doi.org/10.1513/AnnalsATS.201912-880CME', tier: 1 },
      { id: '9', text: 'Weight loss and obstructive sleep apnea improvement', source: 'American Journal of Medicine', year: '2019', link: 'https://doi.org/10.1016/j.amjmed.2019.02.011', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You sleep 8 hours but wake exhausted. Your partner says you snore loudly and sometimes stop breathing. You fall asleep during the day despite "full nights" of sleep. These are hallmarks of sleep apnea---a serious disorder affecting 25 million Americans.
          </p>
          <p className="mb-6">
            Sleep apnea causes repeated interruptions in breathing during sleep, fragmenting rest and depriving the brain of oxygen <Citation id="1" index={1} source="American Journal of Respiratory and Critical Care Medicine" year="2021" tier={1} />. Beyond physical health risks like hypertension, heart disease, and stroke, untreated sleep apnea significantly impacts mental health, increasing rates of depression, anxiety, and cognitive decline <Citation id="2" index={2} source="Sleep Medicine Reviews" year="2021" tier={1} />.
          </p>
          <p className="mb-6">
            The disorder is often misunderstood as "just snoring" or dismissed as a minor inconvenience. In reality, sleep apnea is a serious medical condition that affects not only sleep quality but also daytime functioning, emotional regulation, and long-term brain health. Understanding the different types, recognizing symptoms, and pursuing treatment can dramatically improve quality of life.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 25, suffix: 'M', label: 'Americans with sleep apnea' },
            { value: 80, suffix: '%', label: 'Of cases remain undiagnosed' },
            { value: 46, suffix: '%', label: 'Experience depressive symptoms' },
          ]}
          source="NHLBI, 2022; Sleep Medicine Reviews, 2021"
        />

        <h2 id="what-is-osa" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding Obstructive Sleep Apnea
        </h2>
        <p className="mb-6">
          <strong>Obstructive Sleep Apnea (OSA)</strong> is the most common form, occurring when throat muscles relax during sleep and physically block the airway. This obstruction causes breathing to stop repeatedly---sometimes hundreds of times per night---for 10 seconds or longer. Each time breathing stops, oxygen levels drop and the brain sends emergency signals to wake you just enough to gasp for air and restart breathing.
        </p>
        <p className="mb-6">
          You typically don't remember these awakenings---they're so brief that they don't register in conscious memory. But they prevent you from reaching and maintaining the deep, restorative stages of sleep your brain and body need. The result: you may spend 8 hours in bed but wake feeling like you barely slept at all.
        </p>

        <ComparisonTable
          title="Types of Sleep Apnea"
          columns={['Type', 'Cause', 'Prevalence', 'Key Feature']}
          items={[
            { feature: 'Obstructive (OSA)', values: ['Physical airway blockage', '80-90% of cases', 'Loud snoring, gasping'] },
            { feature: 'Central (CSA)', values: ['Brain fails to signal breathing muscles', '5-10% of cases', 'Quiet apneas, no snoring'] },
            { feature: 'Mixed/Complex', values: ['Combination of both mechanisms', '5-10% of cases', 'Features of both types'] },
          ]}
        />

        <h2 id="risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Is at Risk?
        </h2>
        <p className="mb-6">
          While anyone can develop sleep apnea, certain factors significantly increase risk:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Excess weight:</strong> Obesity is the strongest risk factor---fat deposits around the upper airway can obstruct breathing. However, people at healthy weights can also have OSA.</li>
          <li><strong>Neck circumference:</strong> A thicker neck (greater than 17 inches in men, 16 inches in women) often means narrower airways.</li>
          <li><strong>Anatomical factors:</strong> Naturally narrow airway, enlarged tonsils or adenoids, deviated septum, or recessed chin can contribute.</li>
          <li><strong>Age and gender:</strong> OSA is 2-3 times more common in men, though the gap narrows after menopause. Risk increases with age.</li>
          <li><strong>Family history:</strong> Genetics play a role in airway structure and fat distribution.</li>
          <li><strong>Alcohol and sedatives:</strong> Relax throat muscles, worsening airway collapse during sleep.</li>
          <li><strong>Smoking:</strong> Increases inflammation and fluid retention in upper airways.</li>
          <li><strong>Nasal congestion:</strong> Chronic allergies or structural problems make breathing through the nose difficult, increasing OSA risk.</li>
        </ul>

        <h2 id="symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing the Signs
        </h2>
        <p className="mb-6">
          Sleep apnea symptoms span nighttime events (often noticed by a sleep partner) and daytime impairments that affect daily functioning.
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'nighttime',
              label: 'Nighttime Symptoms',
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Loud, chronic snoring</strong> --- usually very loud, disruptive to partners</li>
                    <li><strong>Gasping or choking sounds</strong> during sleep --- the sound of airways reopening</li>
                    <li><strong>Observed breathing pauses</strong> --- partner witnesses you stop breathing for 10+ seconds</li>
                    <li><strong>Frequent awakenings</strong> --- often to urinate, or with a feeling of breathlessness</li>
                    <li><strong>Night sweats</strong> --- result of increased effort to breathe and stress response</li>
                    <li><strong>Restless sleep</strong> --- tossing, turning, kicking as body tries to restore breathing</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'daytime',
              label: 'Daytime Symptoms',
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Excessive sleepiness</strong> --- falling asleep during quiet activities (reading, watching TV, sitting in meetings)</li>
                    <li><strong>Morning headaches</strong> --- caused by low oxygen and high carbon dioxide levels during sleep</li>
                    <li><strong>Difficulty concentrating</strong> --- brain fog, poor attention, memory problems <Citation id="6" index={6} source="Chest" year="2020" tier={1} /></li>
                    <li><strong>Irritability and mood changes</strong> --- short temper, emotional volatility</li>
                    <li><strong>Dry mouth or sore throat</strong> upon waking --- from mouth breathing during apneas</li>
                    <li><strong>High blood pressure</strong> --- OSA is a leading cause of treatment-resistant hypertension</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning">
          <p>
            <strong>When to seek immediate help:</strong> If you or a partner witness long pauses in breathing (20+ seconds), severe gasping, or turning blue/gray during sleep, seek medical evaluation immediately. These are signs of severe OSA that requires urgent treatment.
          </p>
        </ArticleCallout>

        <h2 id="mental-health-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Mental Health Connection
        </h2>
        <p className="mb-6">
          The relationship between OSA and mental health is bidirectional and profound. Sleep fragmentation and repeated oxygen deprivation disrupt neurotransmitter systems, particularly serotonin and dopamine, which regulate mood. At the same time, depression and anxiety can worsen OSA severity through weight gain, reduced motivation to pursue treatment, and altered sleep architecture.
        </p>
        <p className="mb-6">
          Research shows striking mental health impacts:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Depression:</strong> 46% of people with OSA experience depressive symptoms, compared to 10% in the general population <Citation id="2" index={2} source="Sleep Medicine Reviews" year="2021" tier={1} /></li>
          <li><strong>Anxiety:</strong> 30% meet diagnostic criteria for an anxiety disorder---rates are 2-3 times higher than in people without OSA</li>
          <li><strong>Cognitive impairment:</strong> Attention, working memory, and executive function (planning, decision-making) all decline with untreated OSA</li>
          <li><strong>Mood dysregulation:</strong> Irritability, emotional reactivity, and difficulty regulating emotions increase significantly</li>
          <li><strong>Suicidal ideation:</strong> Severe, untreated OSA is associated with increased suicidal thoughts, particularly when comorbid with depression</li>
        </ul>

        <QuoteBlock
          quote="Many of my patients who've been diagnosed with depression for years see dramatic mood improvements within weeks of starting CPAP. The 'depression' was often their brain's response to chronic oxygen deprivation and sleep fragmentation."
          attribution="Dr. Rafael Pelayo"
          role="Sleep Medicine Specialist"
          source="Stanford Sleep Medicine Center, 2021"
        />

        <p className="mb-6">
          The good news: treating OSA can significantly improve mental health outcomes. Studies show that CPAP therapy reduces depressive symptoms by 30-50% in patients with comorbid OSA and depression, even when depression isn't directly treated <Citation id="3" index={3} source="Journal of Clinical Sleep Medicine" year="2019" tier={1} />.
        </p>

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Getting Diagnosed
        </h2>
        <p className="mb-6">
          Diagnosis requires a sleep study (polysomnography), which measures breathing patterns, oxygen levels, brain activity, heart rate, and body movements during sleep. There are two main options:
        </p>

        <BeforeAfter
          before={{
            title: 'In-Lab Sleep Study',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Sleep overnight in a sleep center</li>
                <li>Monitored by technicians with comprehensive equipment</li>
                <li>Measures brain waves, eye movement, muscle activity, heart rhythm, breathing, oxygen levels</li>
                <li>Gold standard for diagnosis, especially for complex cases</li>
                <li>More expensive, requires overnight travel</li>
              </ul>
            ),
          }}
          after={{
            title: 'Home Sleep Apnea Test (HSAT)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Portable device used at home in your own bed</li>
                <li>Measures breathing, oxygen levels, heart rate</li>
                <li>More convenient and less expensive</li>
                <li>Effective for diagnosing moderate-severe OSA <Citation id="8" index={8} source="Annals of the American Thoracic Society" year="2020" tier={1} /></li>
                <li>May miss milder cases or other sleep disorders</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6">
          Results are reported as the <strong>Apnea-Hypopnea Index (AHI)</strong>---the number of breathing disruptions per hour of sleep:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Normal:</strong> AHI less than 5</li>
          <li><strong>Mild OSA:</strong> AHI 5-15</li>
          <li><strong>Moderate OSA:</strong> AHI 15-30</li>
          <li><strong>Severe OSA:</strong> AHI greater than 30</li>
        </ul>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment Options: CPAP and Beyond
        </h2>
        <p className="mb-6">
          Treatment choice depends on OSA severity, underlying causes, and individual preferences. The goal is to keep airways open during sleep, restore normal breathing, and eliminate apnea events.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'CPAP Therapy (First-Line Treatment)',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>Continuous Positive Airway Pressure (CPAP)</strong> delivers gentle air pressure through a mask, keeping airways open throughout the night. It's the gold-standard treatment with 70-80% effectiveness when used consistently (at least 4 hours per night, ideally 7+) <Citation id="3" index={3} source="Journal of Clinical Sleep Medicine" year="2019" tier={1} />.
                  </p>
                  <p className="mb-3">
                    <strong>Common challenges:</strong> Mask discomfort, claustrophobia, dry nose/mouth, noise. Modern machines address many of these issues with heated humidifiers, quieter motors, and multiple mask styles (nasal, nasal pillows, full-face).
                  </p>
                  <p>
                    <strong>Adherence is key:</strong> Most people notice dramatic improvement within days to weeks---better sleep, more energy, improved mood. The first week can be an adjustment period, but persistence pays off.
                  </p>
                </div>
              ),
            },
            {
              title: 'Oral Appliances',
              description: (
                <p>
                  Custom-fitted mouthpieces (mandibular advancement devices) reposition the jaw and tongue forward to prevent airway collapse. Effective for mild-moderate OSA and for people who can't tolerate CPAP <Citation id="7" index={7} source="Sleep Medicine Clinics" year="2020" tier={1} />. Requires fitting by a dentist trained in sleep medicine.
                </p>
              ),
            },
            {
              title: 'Lifestyle Modifications',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>Weight loss:</strong> For people with obesity, losing 10% of body weight can reduce AHI by 30% or more <Citation id="9" index={9} source="American Journal of Medicine" year="2019" tier={1} />. In some cases, significant weight loss can resolve OSA entirely.
                  </p>
                  <p className="mb-3">
                    <strong>Positional therapy:</strong> Some people have OSA primarily when sleeping on their back. Devices or techniques to encourage side sleeping can help.
                  </p>
                  <p>
                    <strong>Avoid alcohol and sedatives:</strong> These relax throat muscles and worsen apneas. Stop drinking at least 3-4 hours before bedtime.
                  </p>
                </div>
              ),
            },
            {
              title: 'Surgical Options',
              description: (
                <div>
                  <p className="mb-3">
                    For severe OSA unresponsive to other treatments, or when anatomical abnormalities are the primary cause:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Uvulopalatopharyngoplasty (UPPP):</strong> Removes excess tissue from throat to widen airway</li>
                    <li><strong>Maxillomandibular advancement:</strong> Repositions upper and lower jaw to enlarge airway space</li>
                    <li><strong>Hypoglossal nerve stimulation (Inspire):</strong> Implanted device stimulates tongue muscles to prevent collapse during sleep</li>
                    <li><strong>Nasal surgery:</strong> Corrects deviated septum or removes obstructions to improve nasal breathing</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="living-with-osa" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Living Well with Sleep Apnea
        </h2>
        <p className="mb-6">
          With proper treatment, most people with OSA see dramatic improvements in sleep quality, daytime energy, mood, and overall health. Here are strategies for long-term success:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Use your CPAP every night:</strong> Consistency matters more than perfection. Even one night off can reverse benefits and reset your body's adjustment.</li>
          <li><strong>Clean equipment regularly:</strong> Daily: wipe mask and headgear. Weekly: wash mask, tubing, and humidifier chamber with mild soap.</li>
          <li><strong>Troubleshoot problems:</strong> Mask leaks, skin irritation, and dry mouth are common but solvable. Work with your equipment provider or sleep specialist to adjust.</li>
          <li><strong>Monitor your progress:</strong> Many CPAP machines track usage and provide data on AHI reduction. Review this with your provider to ensure treatment is effective.</li>
          <li><strong>Address weight and lifestyle factors:</strong> Even with CPAP, weight management, regular exercise, and avoiding alcohol improve outcomes.</li>
          <li><strong>Annual follow-ups:</strong> OSA can change over time. Regular check-ins ensure your treatment remains optimal.</li>
        </ul>

        <ArticleCallout variant="did-you-know" title="Did You Know?">
          <p>
            Untreated OSA increases the risk of motor vehicle accidents by 2.5 times due to daytime sleepiness. After starting CPAP, accident risk returns to normal levels within weeks. Some states and insurance companies offer incentives or discounts for CPAP-compliant drivers.
          </p>
        </ArticleCallout>

        <h2 id="key-takeaways" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Takeaways
        </h2>
        <ArticleCallout variant="key-takeaway">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Sleep apnea causes repeated breathing interruptions</strong> during sleep, fragmenting rest and depriving the brain of oxygen hundreds of times per night.</li>
            <li><strong>Mental health impacts are profound:</strong> 46% of people with OSA experience depression, and rates of anxiety and cognitive impairment are significantly elevated.</li>
            <li><strong>CPAP therapy is highly effective</strong> when used consistently (4+ hours per night), reducing AHI by 70-80% and improving mood, energy, and cognitive function.</li>
            <li><strong>Untreated OSA increases serious health risks:</strong> heart disease, stroke, high blood pressure, diabetes, and premature death <Citation id="4" index={4} source="Circulation" year="2020" tier={1} />.</li>
            <li><strong>Diagnosis requires a sleep study</strong> (in-lab or home-based), which measures breathing patterns and oxygen levels during sleep.</li>
            <li><strong>Lifestyle changes matter:</strong> Weight loss, positional therapy, and avoiding alcohol can significantly reduce OSA severity, sometimes even resolving it entirely.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(14),
    slug: 'restless-leg-syndrome-body-wont-let-you-rest',
    title: "Restless Leg Syndrome: When Your Body Won't Let You Rest",
    description: "An irresistible urge to move your legs disrupts sleep onset and quality. Learn about this neurological disorder and evidence-based treatments.",
    image: "/images/articles/cat09/cover-014.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Restless Leg Syndrome', 'RLS', 'Sleep Disorders', 'Neurological'],
    summary: 'Restless Leg Syndrome is a neurological disorder causing an irresistible urge to move the legs, usually accompanied by uncomfortable sensations. Symptoms worsen at rest and in the evening, making it difficult to fall asleep and significantly impacting quality of life.',
    keyFacts: [
      { text: '5-10% of adults experience Restless Leg Syndrome, with higher rates in women and older adults', citationIndex: 1 },
      { text: 'Iron deficiency is the most common treatable cause of RLS symptoms', citationIndex: 2 },
      { text: '40-60% of people with RLS have a family history, suggesting strong genetic component', citationIndex: 1 },
      { text: 'Depression and anxiety rates are 2-3 times higher in people with RLS compared to the general population', citationIndex: 4 },
      { text: 'Dopaminergic medications can improve symptoms in 70-80% of moderate-severe RLS cases', citationIndex: 3 },
    ],
    sparkMoment: 'RLS isn\'t restlessness or anxiety—it\'s a neurological disorder where your brain\'s dopamine system misfires, creating sensations so uncomfortable that movement becomes the only relief.',
    practicalExercise: {
      title: 'RLS Symptom and Trigger Diary',
      steps: [
        { title: 'Track Daily Symptoms', description: 'For 2 weeks, note when RLS symptoms occur (time of day), their severity (0-10 scale), and which sensations you experience (tingling, crawling, aching, itching).' },
        { title: 'Identify Triggers', description: 'Record what you consumed that day: caffeine (coffee, tea, soda), alcohol, antihistamines, or certain antidepressants. Note if symptoms worsened after specific activities or at particular times.' },
        { title: 'Test Relief Strategies', description: 'Try different approaches when symptoms occur: walking, leg massage, warm or cold compress, stretching. Note which provides the most relief and how long relief lasts.' },
        { title: 'Review with Your Doctor', description: 'Bring your completed diary to a medical appointment. This data helps determine if you meet diagnostic criteria and identifies modifiable triggers.' },
      ],
      toolLink: '/tools/sleep-architect',
      toolLabel: 'Track Your Sleep Quality',
    },
    citations: [
      { id: '1', text: 'Restless legs syndrome: clinical features, diagnosis and comprehensive management', source: 'The Lancet Neurology', year: '2020', link: 'https://doi.org/10.1016/S1474-4422(20)30268-X', tier: 1 },
      { id: '2', text: 'Iron deficiency and restless legs syndrome: pathophysiological link and clinical implications', source: 'Sleep Medicine', year: '2021', link: 'https://doi.org/10.1016/j.sleep.2021.02.011', tier: 1 },
      { id: '3', text: 'Dopaminergic treatment of restless legs syndrome: efficacy and augmentation', source: 'Movement Disorders', year: '2020', link: 'https://doi.org/10.1002/mds.28165', tier: 1 },
      { id: '4', text: 'Mental health comorbidity in restless legs syndrome', source: 'Journal of Psychosomatic Research', year: '2019', link: 'https://doi.org/10.1016/j.jpsychores.2019.05.006', tier: 1 },
      { id: '5', text: 'Gabapentin and pregabalin for RLS treatment', source: 'Neurology', year: '2020', link: 'https://doi.org/10.1212/WNL.0000000000009326', tier: 1 },
      { id: '6', text: 'Pregnancy-related restless legs syndrome', source: 'Sleep Medicine Reviews', year: '2019', link: 'https://doi.org/10.1016/j.smrv.2019.05.002', tier: 1 },
      { id: '7', text: 'Non-pharmacological interventions for RLS', source: 'Journal of Clinical Sleep Medicine', year: '2020', link: 'https://doi.org/10.5664/jcsm.8254', tier: 1 },
      { id: '8', text: 'Restless legs syndrome', source: 'National Institute of Neurological Disorders and Stroke', year: '2023', link: 'https://www.ninds.nih.gov/health-information/disorders/restless-legs-syndrome', tier: 2 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Just as you're about to fall asleep, an overwhelming urge to move your legs jolts you awake. Your legs feel tingly, crawling, aching---relief comes only with movement. This is Restless Leg Syndrome (RLS), a neurological disorder affecting 5-10% of adults.
          </p>
          <p className="mb-6">
            RLS is characterized by an irresistible urge to move the legs, usually accompanied by uncomfortable sensations <Citation id="1" index={1} source="The Lancet Neurology" year="2020" tier={1} />. Symptoms worsen at rest and in the evening, making it difficult to fall asleep or stay seated during activities like movies, meetings, or flights.
          </p>
          <p className="mb-6">
            Unlike simple restlessness or leg cramps, RLS sensations are uniquely unpleasant---often described as crawling, tingling, pulling, or electric sensations deep inside the legs. Movement provides immediate but temporary relief, creating a cycle that severely disrupts sleep and quality of life.
          </p>
        </div>

        <HighlightBox variant="stat">
          <p className="text-2xl font-bold mb-2">5-10%</p>
          <p className="text-sm">of adults have RLS, with women 1.5-2x more likely than men to develop the condition</p>
        </HighlightBox>

        <h2 id="diagnostic-criteria" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Diagnosing Restless Leg Syndrome
        </h2>
        <p className="mb-6">
          RLS is diagnosed clinically based on symptoms---no blood test or imaging can confirm it. To meet diagnostic criteria, you must have all five essential features:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Urge to move legs</strong>, usually accompanied by uncomfortable or unpleasant sensations in the legs (sometimes arms or other body parts)</li>
          <li><strong>Symptoms begin or worsen during periods of rest or inactivity</strong> such as lying down or sitting</li>
          <li><strong>Symptoms are partially or totally relieved by movement</strong> such as walking or stretching, at least as long as the activity continues</li>
          <li><strong>Symptoms are worse in the evening or night</strong> than during the day, or only occur in the evening/night</li>
          <li><strong>Symptoms are not better explained by another condition</strong> such as leg cramps, positional discomfort, or habitual foot tapping</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>
            <strong>How to describe RLS sensations:</strong> People use many creative descriptions---"bugs crawling under my skin," "fizzy soda in my veins," "electric current," "aching deep in my bones," "itching from the inside out." There's no single "right" way to describe it, but the key feature is that the sensation is unpleasant enough to create an irresistible urge to move.
          </p>
        </ArticleCallout>

        <h2 id="severity" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding Severity
        </h2>
        <p className="mb-6">
          RLS ranges from mild annoyance to severe disability. Severity is often rated on the International RLS Rating Scale, which considers symptom frequency, intensity, and impact on daily life.
        </p>

        <ComparisonTable
          title="RLS Severity Levels"
          columns={['Severity', 'Symptom Frequency', 'Impact on Life']}
          items={[
            { feature: 'Mild', values: ['Occasional episodes', 'Little to no sleep disturbance, minimal daily impact'] },
            { feature: 'Moderate', values: ['Up to 2x per week', 'Some sleep disturbance, interference with daily activities'] },
            { feature: 'Severe', values: ['2+ times per week', 'Significant sleep loss, major disruption to work and social life'] },
            { feature: 'Very Severe', values: ['Nearly every day', 'Inability to sleep or function, profound life impairment'] },
          ]}
        />

        <h2 id="causes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Causes RLS?
        </h2>
        <p className="mb-6">
          RLS is classified as either primary (idiopathic) or secondary (caused by another condition or medication).
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
          Primary RLS
        </h3>
        <p className="mb-6">
          Primary RLS is genetic and runs in families---40-60% of people with RLS have a first-degree relative who also has it <Citation id="1" index={1} source="The Lancet Neurology" year="2020" tier={1} />. The condition is thought to involve dysfunction in the brain's dopamine system, particularly in circuits that control movement and sensation. Dopamine helps regulate motor activity and sensory processing; when these circuits malfunction, the brain misinterprets normal sensory signals as uncomfortable and generates inappropriate movement urges.
        </p>
        <p className="mb-6">
          Genetics aren't the full story---environmental factors likely play a role in triggering symptoms in genetically susceptible individuals.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
          Secondary RLS
        </h3>
        <p className="mb-6">
          Secondary RLS is caused by an underlying condition or medication. <strong>Iron deficiency</strong> is the most common and treatable cause <Citation id="2" index={2} source="Sleep Medicine" year="2021" tier={1} />. Iron is essential for dopamine production, and low brain iron levels---even when blood iron levels are normal---can trigger RLS symptoms.
        </p>
        <p className="mb-6">
          <strong>Other causes of secondary RLS:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Pregnancy:</strong> 20-30% of pregnant women develop RLS, usually in the third trimester. Symptoms typically resolve after delivery <Citation id="6" index={6} source="Sleep Medicine Reviews" year="2019" tier={1} /></li>
          <li><strong>Chronic kidney disease:</strong> Especially in people on dialysis---prevalence can be as high as 50%</li>
          <li><strong>Peripheral neuropathy:</strong> Nerve damage from diabetes, alcohol use, or other causes</li>
          <li><strong>Certain medications:</strong> Antihistamines (Benadryl, Zyrtec), some antidepressants (SSRIs, mirtazapine), antipsychotics, anti-nausea medications (metoclopramide)</li>
          <li><strong>Other conditions:</strong> Parkinson's disease, rheumatoid arthritis, fibromyalgia, celiac disease</li>
        </ul>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'iron-ferritin',
              title: 'Why check ferritin levels, not just iron?',
              content: (
                <p>
                  Standard iron tests (serum iron, hemoglobin) may appear normal even when iron stores are low. <strong>Ferritin</strong> measures stored iron in the body and is the most accurate indicator for RLS. Target ferritin level is 75 μg/L or higher---below this, iron supplementation can significantly improve or resolve RLS symptoms.
                </p>
              ),
            },
            {
              id: 'pregnancy-rls',
              title: 'Will my RLS go away after pregnancy?',
              content: (
                <p>
                  In most cases, yes. Pregnancy-related RLS usually resolves within days to weeks after delivery. However, women who develop RLS during pregnancy are at higher risk of developing chronic RLS later in life, especially if they have a family history of the condition.
                </p>
              ),
            },
          ]}
        />

        <h2 id="impact-on-sleep" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Sleep-Life Connection
        </h2>
        <p className="mb-6">
          RLS primarily disrupts sleep onset---the time it takes to fall asleep. Because symptoms worsen at rest and peak in the evening, people with RLS may lie in bed for hours before finally falling asleep out of exhaustion. This leads to chronic sleep deprivation, daytime fatigue, and impaired functioning.
        </p>
        <p className="mb-6">
          Beyond sleep, RLS affects daily activities that require sitting still: meetings, movies, flights, religious services, concerts. Many people with moderate-severe RLS avoid these situations entirely or face embarrassment when they must constantly move, stretch, or pace.
        </p>

        <QuoteBlock
          quote="RLS is torture in slow motion. You're trapped in your own body, desperate to move but socially expected to sit still. People think you're anxious or rude when you can't stop fidgeting. They have no idea it's a neurological condition you can't control."
          attribution="Sarah M."
          role="Living with severe RLS for 12 years"
          source="RLS Foundation patient testimonial, 2020"
        />

        <h2 id="mental-health-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          RLS and Mental Health
        </h2>
        <p className="mb-6">
          Chronic sleep disruption from RLS significantly increases risk of depression and anxiety <Citation id="4" index={4} source="Journal of Psychosomatic Research" year="2019" tier={1} />. Depression rates are 2-3 times higher in people with RLS compared to the general population, and anxiety disorders are similarly elevated.
        </p>
        <p className="mb-6">
          The condition itself is frustrating and isolating. Many people don't understand why you can't sit still or need to pace during meetings or social events. Partners may be disturbed by your nighttime movements. The constant sleep deprivation worsens mood, irritability, and emotional regulation.
        </p>
        <p className="mb-6">
          The relationship is bidirectional: depression and anxiety can worsen RLS symptoms through changes in dopamine systems and increased stress hormones. Treating RLS often improves mental health, and treating mental health can reduce RLS severity.
        </p>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment: A Stepwise Approach
        </h2>
        <p className="mb-6">
          Treatment depends on RLS severity and whether there's an underlying cause. For mild RLS, lifestyle changes alone may be sufficient. Moderate-severe RLS typically requires medication.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Step 1: Identify and Correct Iron Deficiency',
              description: (
                <div>
                  <p className="mb-3">
                    Everyone with RLS should have ferritin levels checked. If ferritin is below 75 μg/L, iron supplementation (typically 325 mg ferrous sulfate with 200 mg vitamin C to improve absorption) is recommended <Citation id="2" index={2} source="Sleep Medicine" year="2021" tier={1} />.
                  </p>
                  <p>
                    <strong>Timeline:</strong> Iron supplementation takes 3-6 months to replenish stores and improve symptoms. Recheck ferritin after 3 months. In severe deficiency, intravenous iron infusions can produce faster results.
                  </p>
                </div>
              ),
            },
            {
              title: 'Step 2: Remove Triggers and Try Lifestyle Modifications',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>Avoid triggers:</strong> Caffeine, alcohol, nicotine, antihistamines, certain antidepressants can all worsen RLS. Review medications with your doctor.
                  </p>
                  <p className="mb-3">
                    <strong>Non-drug strategies <Citation id="7" index={7} source="Journal of Clinical Sleep Medicine" year="2020" tier={1} />:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Leg massage or self-massage before bed</li>
                    <li>Warm or cold compresses applied to legs</li>
                    <li>Moderate exercise earlier in the day (avoid intense exercise close to bedtime)</li>
                    <li>Pneumatic compression devices for legs</li>
                    <li>Mental alerting activities when symptoms occur (puzzles, video games)</li>
                    <li>Good sleep hygiene (consistent schedule, cool room)</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Step 3: Dopaminergic Medications (First-Line for Moderate-Severe RLS)',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>Pramipexole (Mirapex)</strong> and <strong>ropinirole (Requip)</strong> are dopamine agonists that reduce RLS symptoms in 70-80% of people <Citation id="3" index={3} source="Movement Disorders" year="2020" tier={1} />. Taken 1-2 hours before symptoms typically begin, they prevent the urge to move and uncomfortable sensations.
                  </p>
                  <p className="mb-3">
                    <strong>Major risk: Augmentation.</strong> Over time (months to years), dopamine agonists can worsen RLS---symptoms become more severe, start earlier in the day, and spread to other body parts. This occurs in 30-50% of long-term users. When augmentation develops, the medication must be tapered and switched to an alternative.
                  </p>
                </div>
              ),
            },
            {
              title: 'Step 4: Alpha-2-Delta Ligands (Alternative First-Line)',
              description: (
                <p>
                  <strong>Gabapentin</strong> and <strong>pregabalin (Lyrica)</strong> are increasingly used as first-line treatment, especially for people at high risk of augmentation <Citation id="5" index={5} source="Neurology" year="2020" tier={1} />. They're as effective as dopamine agonists but with lower augmentation risk. Side effects include dizziness, drowsiness, and weight gain. Taken 1-2 hours before bed.
                </p>
              ),
            },
            {
              title: 'Step 5: Other Medications for Refractory Cases',
              description: (
                <div>
                  <p className="mb-3">
                    When first-line treatments fail or aren't tolerated:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Opioids:</strong> Low-dose codeine, tramadol, or oxycodone can be effective for severe, treatment-resistant RLS. Risk of dependence requires careful monitoring.</li>
                    <li><strong>Benzodiazepines:</strong> Clonazepam may improve sleep quality even if RLS sensations persist.</li>
                    <li><strong>Alpha-2 agonists:</strong> Clonidine in select cases.</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning">
          <p>
            <strong>Never stop RLS medications abruptly,</strong> especially dopamine agonists or opioids. Sudden discontinuation can cause severe rebound symptoms or withdrawal. Work with your doctor to taper gradually if you need to stop or switch medications.
          </p>
        </ArticleCallout>

        <h2 id="living-well" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Living Well with RLS
        </h2>
        <p className="mb-6">
          While RLS is a chronic condition, most people achieve good symptom control with the right treatment approach. Here are strategies for long-term management:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Keep a symptom diary:</strong> Track what makes symptoms better or worse. This helps identify triggers and evaluate treatment effectiveness.</li>
          <li><strong>Plan ahead for situations requiring sitting:</strong> Choose aisle seats for flights or movies so you can get up easily. Arrive late to movies or meetings so you can stand in the back if needed.</li>
          <li><strong>Educate family and friends:</strong> Explain that RLS is a neurological condition, not anxiety or rudeness. Their understanding reduces social stress.</li>
          <li><strong>Monitor for augmentation:</strong> If symptoms start occurring earlier in the day or spreading to arms, alert your doctor---this suggests augmentation and requires treatment adjustment.</li>
          <li><strong>Regular follow-ups:</strong> RLS can change over time. Annual check-ins with your provider ensure treatment remains optimal.</li>
        </ul>

        <ArticleCallout variant="did-you-know" title="Did You Know?">
          <p>
            Some people with RLS find relief from yoga, especially yoga poses that stretch and compress the legs. A 2020 study found that 8 weeks of twice-weekly yoga reduced RLS symptom severity by 40% compared to no intervention. The mechanism isn't fully understood but may involve improved circulation, reduced stress hormones, or dopamine modulation.
          </p>
        </ArticleCallout>

        <h2 id="key-takeaways" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Takeaways
        </h2>
        <ArticleCallout variant="key-takeaway">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>RLS causes an irresistible urge to move the legs</strong>, accompanied by uncomfortable sensations that worsen at rest and in the evening.</li>
            <li><strong>Iron deficiency is the most common treatable cause</strong>---everyone with RLS should have ferritin levels checked and aim for 75+ μg/L.</li>
            <li><strong>Dopaminergic medications are effective</strong> for moderate-severe RLS but carry a risk of augmentation (worsening symptoms) over time.</li>
            <li><strong>Gabapentin and pregabalin</strong> are increasingly used as first-line treatment with lower augmentation risk.</li>
            <li><strong>RLS significantly impacts sleep quality and quality of life</strong>, leading to chronic sleep deprivation, daytime fatigue, and social limitations.</li>
            <li><strong>Mental health comorbidity is common:</strong> Depression and anxiety rates are 2-3 times higher in people with RLS <Citation id="4" index={4} source="Journal of Psychosomatic Research" year="2019" tier={1} />.</li>
            <li><strong>Lifestyle modifications</strong> (avoiding triggers, leg massage, exercise, compression) can reduce symptom severity, especially for mild RLS.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(15),
    slug: 'narcolepsy-understanding-condition-beyond-stereotypes',
    title: 'Narcolepsy: Understanding the Condition Beyond the Stereotypes',
    description: `Narcolepsy isn't just "falling asleep randomly." Learn about this complex neurological disorder affecting wakefulness, sleep, and daily functioning.`,
    image: '/images/articles/cat09/cover-015.svg',
    category: CATEGORY_SLEEP_BODY,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Narcolepsy', 'Hypocretin', 'Cataplexy', 'Sleep Disorders'],
    summary: 'Narcolepsy is a chronic neurological disorder affecting the brain\'s ability to regulate sleep-wake cycles. People with narcolepsy experience excessive daytime sleepiness, sudden muscle weakness triggered by emotions (cataplexy), sleep paralysis, and vivid hallucinations as REM sleep intrudes into waking life.',
    keyFacts: [
      { text: '1 in 2,000 people has narcolepsy, though many cases remain undiagnosed for years', citationIndex: 1 },
      { text: 'Type 1 narcolepsy is caused by loss of 90%+ of hypocretin-producing neurons in the brain', citationIndex: 2 },
      { text: 'Cataplexy (sudden muscle weakness) is triggered by strong positive emotions like laughter in 70% of Type 1 cases', citationIndex: 1 },
      { text: 'Average time from symptom onset to diagnosis is 8-10 years due to low awareness', citationIndex: 3 },
      { text: 'Sodium oxybate improves both excessive daytime sleepiness and cataplexy in 70-80% of patients', citationIndex: 4 },
    ],
    sparkMoment: 'In narcolepsy, the brain\'s "wakefulness switch" is broken—REM sleep with its vivid dreams and paralyzed muscles can intrude into your waking day at any moment.',
    practicalExercise: {
      title: 'Narcolepsy Symptom Awareness Check',
      steps: [
        { title: 'Assess Your Sleepiness', description: 'Complete the Epworth Sleepiness Scale: rate your likelihood (0-3) of dozing during 8 quiet activities. Scores above 10 suggest excessive daytime sleepiness warranting evaluation.' },
        { title: 'Identify Cataplexy Episodes', description: 'Over 2 weeks, note any episodes of sudden muscle weakness: jaw dropping, head nodding, knees buckling, or complete collapse. Record what emotion triggered it (laughter, surprise, anger, excitement).' },
        { title: 'Document Sleep Disruptions', description: 'Track unusual sleep experiences: feeling paralyzed when waking or falling asleep, vivid dream-like hallucinations, or automatic behaviors (doing things on "autopilot" with no memory).' },
        { title: 'Discuss Patterns with Your Doctor', description: 'If you experience excessive sleepiness plus any of the other symptoms, request a referral to a sleep specialist for formal evaluation with polysomnography and MSLT testing.' },
      ],
      toolLink: '/tools/sleep-architect',
      toolLabel: 'Track Your Sleep Patterns',
    },
    citations: [
      { id: '1', text: 'Narcolepsy: clinical spectrum, pathophysiology, diagnosis and treatment', source: 'Nature Reviews Neurology', year: '2020', link: 'https://doi.org/10.1038/s41582-020-0387-4', tier: 1 },
      { id: '2', text: 'Hypocretin deficiency in narcolepsy type 1: pathogenesis and clinical implications', source: 'Sleep Medicine Reviews', year: '2019', link: 'https://doi.org/10.1016/j.smrv.2019.04.001', tier: 1 },
      { id: '3', text: 'Psychosocial burden and quality of life in narcolepsy', source: 'Sleep Medicine', year: '2020', link: 'https://doi.org/10.1016/j.sleep.2020.03.018', tier: 1 },
      { id: '4', text: 'Treatment of central disorders of hypersomnolence: an American Academy of Sleep Medicine clinical practice guideline', source: 'Journal of Clinical Sleep Medicine', year: '2021', link: 'https://doi.org/10.5664/jcsm.9328', tier: 1 },
      { id: '5', text: 'Modafinil and armodafinil for narcolepsy: comparative efficacy', source: 'CNS Drugs', year: '2020', link: 'https://doi.org/10.1007/s40263-020-00715-5', tier: 1 },
      { id: '6', text: 'Sodium oxybate for narcolepsy with cataplexy: systematic review and meta-analysis', source: 'Sleep Medicine', year: '2019', link: 'https://doi.org/10.1016/j.sleep.2019.03.015', tier: 1 },
      { id: '7', text: 'Driving safety and narcolepsy: risk assessment and management', source: 'Chest', year: '2020', link: 'https://doi.org/10.1016/j.chest.2020.01.009', tier: 1 },
      { id: '8', text: 'Narcolepsy', source: 'National Institute of Neurological Disorders and Stroke', year: '2023', link: 'https://www.ninds.nih.gov/health-information/disorders/narcolepsy', tier: 2 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Movies depict narcolepsy as people randomly collapsing into sleep mid-sentence. The reality is more complex---and more challenging. Narcolepsy is a chronic neurological disorder affecting the brain's ability to regulate sleep-wake cycles.
          </p>
          <p className="mb-6">
            People with narcolepsy experience excessive daytime sleepiness, sudden muscle weakness (cataplexy), sleep paralysis, and vivid hallucinations <Citation id="1" index={1} source="Nature Reviews Neurology" year="2020" tier={1} />. These symptoms result from the brain's inability to maintain stable wakefulness and prevent REM sleep---with its paralyzed muscles and vivid dreams---from intruding into waking life.
          </p>
          <p className="mb-6">
            Affecting approximately 1 in 2,000 people, narcolepsy often goes undiagnosed for years. Many people are dismissed as lazy, unmotivated, or depressed before receiving a correct diagnosis. Understanding the true nature of narcolepsy---a biological brain disorder, not a character flaw---is the first step toward effective treatment and compassionate support.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 1, suffix: ' in 2K', label: 'People affected by narcolepsy' },
            { value: 70, suffix: '%', label: 'Have Type 1 with cataplexy' },
            { value: 10, suffix: 'yrs', label: 'Average delay to diagnosis' },
          ]}
          source="Nature Reviews Neurology, 2020; NINDS, 2023"
        />

        <h2 id="types" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Two Types of Narcolepsy
        </h2>
        <p className="mb-6">
          Narcolepsy is divided into two types based on the presence or absence of cataplexy and measurable hypocretin levels.
        </p>

        <ComparisonTable
          title="Narcolepsy Type 1 vs. Type 2"
          columns={['Feature', 'Type 1 (with Cataplexy)', 'Type 2 (without Cataplexy)']}
          items={[
            { feature: 'Cataplexy', values: ['Present (sudden muscle weakness)', 'Absent'] },
            { feature: 'Hypocretin levels', values: ['Very low or undetectable', 'Normal or near-normal'] },
            { feature: 'Cause', values: ['Loss of 90%+ hypocretin neurons', 'Unknown mechanism'] },
            { feature: 'Severity', values: ['Generally more severe', 'Generally less severe'] },
            { feature: 'Prevalence', values: ['70% of narcolepsy cases', '30% of narcolepsy cases'] },
          ]}
        />

        <ArticleCallout variant="info">
          <p>
            <strong>Important distinction:</strong> All people with Type 1 have excessive daytime sleepiness, but only Type 1 includes cataplexy. However, not everyone with Type 1 experiences frequent or severe cataplexy episodes---some may have only occasional, subtle episodes.
          </p>
        </ArticleCallout>

        <h2 id="core-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Four Core Symptoms
        </h2>
        <p className="mb-6">
          Not everyone with narcolepsy experiences all four symptoms, but excessive daytime sleepiness is universal. The other three symptoms reflect REM sleep intruding into waking life.
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'eds',
              label: 'Excessive Daytime Sleepiness',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>The hallmark symptom.</strong> This isn't normal tiredness---it's an overwhelming, irresistible urge to sleep that can occur during any activity: driving, eating, talking, working. People often describe "sleep attacks" where they feel compelled to nap, regardless of how much sleep they got the night before.
                  </p>
                  <p className="mb-4">
                    Brief naps (10-20 minutes) may provide temporary refreshment, unlike the unrefreshing naps of other sleep disorders. However, the need to sleep returns within a few hours.
                  </p>
                  <p>
                    <strong>Impact:</strong> Makes it difficult to work, drive safely, maintain relationships, or participate in activities requiring sustained attention.
                  </p>
                </div>
              ),
            },
            {
              id: 'cataplexy',
              label: 'Cataplexy',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Sudden loss of muscle tone triggered by strong emotions</strong>---almost always positive emotions like laughter, surprise, or excitement (though anger or fear can also trigger it). Cataplexy is unique to Type 1 narcolepsy and is the most specific diagnostic feature.
                  </p>
                  <p className="mb-4">
                    <strong>Severity ranges widely:</strong> Mild episodes may involve only drooping eyelids, slurred speech, or jaw sagging. Severe episodes cause complete body collapse, though the person remains fully conscious throughout. Episodes last seconds to minutes.
                  </p>
                  <p>
                    <strong>Why it happens:</strong> During REM sleep, muscles are paralyzed to prevent acting out dreams. In cataplexy, this REM-related muscle paralysis intrudes into waking when emotions trigger the response.
                  </p>
                </div>
              ),
            },
            {
              id: 'paralysis',
              label: 'Sleep Paralysis',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Temporary inability to move or speak</strong> while falling asleep or waking up. You're fully conscious and aware, but your body won't respond. Episodes last from a few seconds to several minutes and can be terrifying, especially when accompanied by hallucinations.
                  </p>
                  <p className="mb-4">
                    Many people without narcolepsy experience sleep paralysis occasionally, but in narcolepsy it's more frequent and distressing.
                  </p>
                  <p>
                    <strong>Explanation:</strong> REM sleep muscle paralysis persists briefly into waking, trapping you in a state where your mind is awake but your body is still "asleep."
                  </p>
                </div>
              ),
            },
            {
              id: 'hallucinations',
              label: 'Hypnagogic Hallucinations',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Vivid, dreamlike experiences</strong> while falling asleep (hypnagogic) or waking up (hypnopompic). These can be visual (seeing figures or shapes), auditory (hearing voices or sounds), or tactile (feeling touches or movement). They feel completely real and can be frightening.
                  </p>
                  <p className="mb-4">
                    Common themes: sensing a presence in the room, seeing intruders, feeling someone sitting on your chest, hearing footsteps or voices. When combined with sleep paralysis, the experience can be genuinely terrifying.
                  </p>
                  <p>
                    <strong>Cause:</strong> REM sleep dreams intrude into the transition between wake and sleep, creating dream imagery while you're partially or fully conscious.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="cause" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Causes Narcolepsy?
        </h2>
        <p className="mb-6">
          Type 1 narcolepsy is caused by the loss of hypocretin (also called orexin)-producing neurons in the hypothalamus <Citation id="2" index={2} source="Sleep Medicine Reviews" year="2019" tier={1} />. Hypocretin is a neuropeptide that stabilizes wakefulness and prevents inappropriate transitions into REM sleep. People with Type 1 lose 90%+ of these neurons, resulting in profoundly low or undetectable hypocretin levels in cerebrospinal fluid.
        </p>
        <p className="mb-6">
          <strong>Why do these neurons die?</strong> The leading theory is an autoimmune process: the body's immune system mistakenly attacks and destroys hypocretin neurons. This is likely triggered by a combination of genetic susceptibility (most people with Type 1 carry a specific HLA gene variant) and an environmental trigger such as a viral infection (influenza, H1N1, strep throat).
        </p>
        <p className="mb-6">
          <strong>Type 2 narcolepsy</strong> has an unknown cause. Hypocretin levels are normal, suggesting a different mechanism---possibly dysfunction in other sleep-wake regulatory systems.
        </p>

        <QuoteBlock
          quote="Losing hypocretin neurons is like losing the brain's master switch for wakefulness. Without it, the boundary between sleep and wake dissolves---you can't maintain stable wakefulness, and REM sleep invades your day unpredictably."
          attribution="Dr. Emmanuel Mignot"
          role="Narcolepsy Researcher"
          source="Stanford Center for Sleep Sciences and Medicine, 2019"
        />

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Getting a Diagnosis
        </h2>
        <p className="mb-6">
          Narcolepsy diagnosis requires specialized sleep testing. No blood test or brain scan can confirm it (though genetic testing for HLA-DQB1*06:02 can support the diagnosis).
        </p>
        <p className="mb-6">
          <strong>Diagnostic process:</strong>
        </p>

        <BeforeAfter
          before={{
            title: 'Overnight Polysomnography (PSG)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Sleep overnight in a sleep lab</li>
                <li>Measures brain waves, eye movements, muscle activity, breathing, heart rate</li>
                <li>Rules out other sleep disorders (sleep apnea, periodic limb movements)</li>
                <li>Confirms that nighttime sleep is disrupted or that you enter REM sleep unusually quickly</li>
              </ul>
            ),
          }}
          after={{
            title: 'Multiple Sleep Latency Test (MSLT)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Takes place the day after PSG, starting 1.5-3 hours after waking</li>
                <li>You take 4-5 scheduled naps, 2 hours apart</li>
                <li>Measures how quickly you fall asleep (sleep latency) and whether you enter REM sleep during naps</li>
                <li><strong>Narcolepsy criteria:</strong> Average sleep latency ≤8 minutes + entering REM sleep in 2+ naps</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6">
          <strong>Alternative for Type 1:</strong> If cataplexy is clearly present, measuring hypocretin levels in cerebrospinal fluid (via lumbar puncture) can confirm Type 1 narcolepsy without needing an MSLT. Levels ≤110 pg/mL or ≤1/3 of normal values are diagnostic.
        </p>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment: Managing Symptoms
        </h2>
        <p className="mb-6">
          There's no cure for narcolepsy, but symptoms can be effectively managed with a combination of medications and lifestyle strategies. Treatment is individualized based on which symptoms are most impairing.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Wakefulness-Promoting Agents (for Excessive Daytime Sleepiness)',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>Modafinil</strong> and <strong>armodafinil</strong> are first-line treatments for daytime sleepiness. They promote wakefulness without the high abuse potential of traditional stimulants. Taken once daily in the morning <Citation id="5" index={5} source="CNS Drugs" year="2020" tier={1} />.
                  </p>
                  <p className="mb-3">
                    <strong>Solriamfetol</strong> and traditional stimulants (methylphenidate, amphetamines) are alternatives for people who don't respond to modafinil/armodafinil or need stronger wakefulness promotion.
                  </p>
                  <p>
                    <strong>Effectiveness:</strong> Reduce sleepiness severity by 30-50%, allowing most people to function with fewer sleep attacks during the day.
                  </p>
                </div>
              ),
            },
            {
              title: 'Sodium Oxybate (for Cataplexy and Sleepiness)',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>Sodium oxybate (Xyrem)</strong> is highly effective for both excessive sleepiness and cataplexy <Citation id="6" index={6} source="Sleep Medicine" year="2019" tier={1} />. It consolidates nighttime sleep, reducing sleep fragmentation and improving daytime alertness. It also dramatically reduces cataplexy frequency---often eliminating it entirely.
                  </p>
                  <p className="mb-3">
                    <strong>Dosing:</strong> Taken twice nightly---once at bedtime and again 2.5-4 hours later (requiring you to wake up to take the second dose). This unusual schedule is necessary because the medication has a short half-life.
                  </p>
                  <p>
                    <strong>Considerations:</strong> Controlled substance (high abuse potential), expensive, requires enrollment in a restricted distribution program. Side effects can include nausea, dizziness, bedwetting.
                  </p>
                </div>
              ),
            },
            {
              title: 'Antidepressants (for Cataplexy, Sleep Paralysis, Hallucinations)',
              description: (
                <p>
                  <strong>SSRIs</strong> (fluoxetine, sertraline) and <strong>SNRIs</strong> (venlafaxine) suppress REM sleep and can reduce cataplexy, sleep paralysis, and hypnagogic hallucinations. They don't improve daytime sleepiness. Often used in combination with wakefulness-promoting agents.
                </p>
              ),
            },
            {
              title: 'Scheduled Naps (Behavioral Strategy)',
              description: (
                <p>
                  <strong>Two or three brief naps per day</strong> (15-20 minutes each) can reduce sleepiness and improve alertness. Naps should be scheduled at consistent times, ideally mid-morning, early afternoon, and late afternoon if needed. This approach works best when combined with medication.
                </p>
              ),
            },
            {
              title: 'Lifestyle Adjustments',
              description: (
                <div>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Consistent sleep schedule:</strong> Go to bed and wake up at the same time every day, even weekends</li>
                    <li><strong>Avoid alcohol and sedatives:</strong> Worsen sleepiness and disrupt nighttime sleep</li>
                    <li><strong>Limit caffeine:</strong> May interfere with nighttime sleep quality</li>
                    <li><strong>Safety precautions:</strong> Avoid driving when sleepy, arrange for backup drivers, inform employer of need for naps</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning">
          <p>
            <strong>Driving with narcolepsy:</strong> Excessive daytime sleepiness increases accident risk significantly <Citation id="7" index={7} source="Chest" year="2020" tier={1} />. With effective treatment, most people with narcolepsy can drive safely. However, you must be honest with your doctor about sleepiness severity, and some states require reporting narcolepsy to the DMV. Never drive if you're experiencing frequent sleep attacks.
          </p>
        </ArticleCallout>

        <h2 id="psychosocial-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Living with Narcolepsy: The Psychosocial Burden
        </h2>
        <p className="mb-6">
          Narcolepsy profoundly impacts quality of life <Citation id="3" index={3} source="Sleep Medicine" year="2020" tier={1} />. Beyond the physical symptoms, many people face stigma, misunderstanding, and discrimination.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Social stigma:</strong> Being labeled "lazy," "unmotivated," or "weird" when falling asleep during activities or experiencing cataplexy</li>
          <li><strong>Employment challenges:</strong> Difficulty maintaining jobs that require sustained attention or strict schedules; fear of disclosure leading to discrimination</li>
          <li><strong>Relationship strain:</strong> Partners may not understand the severity of sleepiness or the unpredictability of cataplexy; social isolation due to avoiding situations that trigger symptoms</li>
          <li><strong>Mental health comorbidity:</strong> Depression and anxiety rates are 2-3 times higher in people with narcolepsy. Chronic fatigue, loss of independence, and social isolation all contribute.</li>
          <li><strong>Financial burden:</strong> Medications are expensive (sodium oxybate can cost $10,000+ per month without insurance), and many people must reduce work hours or leave employment entirely</li>
        </ul>
        <p className="mb-6">
          <strong>Advocacy and support:</strong> Connecting with narcolepsy support groups, educating family and employers, and working with accommodations specialists can significantly improve quality of life. The Americans with Disabilities Act (ADA) protects people with narcolepsy from employment discrimination and requires reasonable accommodations such as scheduled nap breaks.
        </p>

        <h2 id="key-takeaways" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Takeaways
        </h2>
        <ArticleCallout variant="key-takeaway">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Narcolepsy is a neurological disorder</strong> caused by loss of hypocretin neurons (Type 1) or unknown mechanisms (Type 2), not laziness or poor motivation.</li>
            <li><strong>Core symptom is excessive daytime sleepiness</strong>---not just tiredness, but irresistible, overwhelming urges to sleep that intrude into daily activities.</li>
            <li><strong>Cataplexy (sudden muscle weakness triggered by emotions)</strong> is specific to Type 1 and ranges from mild drooping to complete collapse.</li>
            <li><strong>Sleep paralysis and hypnagogic hallucinations</strong> reflect REM sleep intruding into waking transitions, often causing terrifying experiences.</li>
            <li><strong>Diagnosis requires specialized testing:</strong> overnight polysomnography followed by Multiple Sleep Latency Test (MSLT) showing rapid sleep onset and early REM entry.</li>
            <li><strong>Treatment combines medication and behavioral strategies:</strong> wakefulness-promoting agents, sodium oxybate for cataplexy, scheduled naps, and lifestyle adjustments.</li>
            <li><strong>Psychosocial impact is profound:</strong> stigma, employment discrimination, relationship strain, and elevated mental health comorbidity <Citation id="3" index={3} source="Sleep Medicine" year="2020" tier={1} />.</li>
            <li><strong>With proper treatment, most people manage symptoms effectively</strong> and maintain good quality of life, though narcolepsy remains a chronic, lifelong condition.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
];
