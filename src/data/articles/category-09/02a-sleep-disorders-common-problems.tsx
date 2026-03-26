 
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
    readTime: 12,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Sleep Apnea', 'OSA', 'CPAP', 'Mental Health'],
    citations: [
      { id: '1', text: 'Obstructive sleep apnea: diagnosis and treatment', source: 'Mayo Clinic Proceedings', year: '2020', link: 'https://doi.org/10.1016/j.mayocp.2020.03.031', tier: 5 },
      { id: '2', text: 'Sleep apnea and mental health', source: 'Sleep Medicine Reviews', year: '2021', link: 'https://doi.org/10.1016/j.smrv.2021.101447', tier: 1 },
      { id: '3', text: 'CPAP adherence and depression outcomes', source: 'Journal of Clinical Sleep Medicine', year: '2019', link: 'https://doi.org/10.5664/jcsm.7780', tier: 1 },
      { id: '4', text: 'Untreated OSA and cardiovascular risk', source: 'Circulation', year: '2020', link: 'https://doi.org/10.1161/CIRCULATIONAHA.119.044195', tier: 1 },
      { id: '5', text: 'Sleep apnea', source: 'National Heart, Lung, and Blood Institute', year: '2022', link: 'https://www.nhlbi.nih.gov/health/sleep-apnea', tier: 2 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You sleep 8 hours but wake exhausted. Your partner says you snore loudly and sometimes stop breathing. You fall asleep during the day despite "full nights" of sleep. These are hallmarks of sleep apnea---a serious disorder affecting 25 million Americans.
          </p>
          <p className="mb-6">
            Sleep apnea causes repeated interruptions in breathing during sleep, fragmenting rest and depriving the brain of oxygen <Citation id="1" index={1} source="Mayo Clinic Proceedings" year="2020" tier={5} />. Beyond physical health risks (hypertension, heart disease, stroke), untreated sleep apnea significantly impacts mental health, increasing rates of depression, anxiety, and cognitive decline <Citation id="2" index={2} source="Sleep Medicine Reviews" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-osa" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Obstructive Sleep Apnea: The Most Common Type
        </h2>
        <p className="mb-6">
          <strong>Obstructive Sleep Apnea (OSA)</strong> occurs when throat muscles relax during sleep, blocking the airway. This causes breathing to stop repeatedly---sometimes hundreds of times per night---for 10 seconds or longer. Each time, the brain briefly wakes you (though you often don't remember it) to restart breathing.
        </p>
        <ComparisonTable title="Types of Sleep Apnea" columns={['Type', 'Cause', 'Prevalence']} items={[{feature: 'Obstructive (OSA)', values: ['Airway blockage', '80-90% of cases']}, {feature: 'Central (CSA)', values: ['Brain signal failure', '5-10% of cases']}, {feature: 'Mixed/Complex', values: ['Both mechanisms', '5-10% of cases']}]} />

        <h2 id="symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Signs and Symptoms
        </h2>
        <ArticleTabs tabs={[{id: 'nighttime', label: 'Nighttime', content: <div><ul className="list-disc pl-5 space-y-2"><li>Loud snoring</li><li>Gasping or choking during sleep</li><li>Pauses in breathing (witnessed by partner)</li><li>Frequent awakenings</li><li>Night sweats</li></ul></div>}, {id: 'daytime', label: 'Daytime', content: <div><ul className="list-disc pl-5 space-y-2"><li>Excessive daytime sleepiness</li><li>Morning headaches</li><li>Difficulty concentrating</li><li>Irritability, mood swings</li><li>Falling asleep during activities</li></ul></div>}]} />

        <h2 id="mental-health-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Mental Health Connection
        </h2>
        <p className="mb-6">
          OSA and mental health are bidirectionally linked. Sleep fragmentation and oxygen deprivation disrupt neurotransmitter systems, increasing depression and anxiety risk. Conversely, depression can worsen OSA severity through weight gain, reduced treatment adherence, and altered sleep architecture.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2"><li><strong>Depression:</strong> 46% of OSA patients have depressive symptoms</li><li><strong>Anxiety:</strong> 30% meet criteria for anxiety disorder</li><li><strong>Cognitive impairment:</strong> Attention, memory, and executive function decline</li><li><strong>Mood dysregulation:</strong> Irritability and emotional reactivity increase</li></ul>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment: CPAP and Beyond
        </h2>
        <ProgressSteps variant="vertical" steps={[{title: 'CPAP Therapy', description: <p>Continuous Positive Airway Pressure keeps airways open with gentle air pressure. Gold-standard treatment with 70-80% effectiveness when used consistently <Citation id="3" index={3} source="Journal of Clinical Sleep Medicine" year="2019" tier={1} />.</p>}, {title: 'Oral Appliances', description: <p>Custom mouthpieces reposition jaw/tongue to keep airways open. Effective for mild-moderate OSA.</p>}, {title: 'Lifestyle Changes', description: <p>Weight loss (10% reduction can improve OSA by 30%), side sleeping, avoiding alcohol/sedatives.</p>}, {title: 'Surgery', description: <p>For severe cases unresponsive to CPAP: uvulopalatopharyngoplasty, jaw advancement, or inspire therapy (nerve stimulation).</p>}]} />

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>Sleep apnea causes repeated breathing interruptions</strong>, fragmenting sleep and depriving the brain of oxygen.</li><li><strong>Mental health impacts are significant</strong>: depression, anxiety, and cognitive decline are common.</li><li><strong>CPAP therapy is highly effective</strong> when used consistently (4+ hours/night).</li><li><strong>Untreated OSA increases risk</strong> of heart disease, stroke, and premature death <Citation id="4" index={4} source="Circulation" year="2020" tier={1} />.</li><li><strong>Diagnosis requires a sleep study</strong> (home or in-lab polysomnography).</li></ul></ArticleCallout>
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
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Restless Leg Syndrome', 'RLS', 'Sleep Disorders', 'Neurological'],
    citations: [
      { id: '1', text: 'Restless legs syndrome: clinical features, diagnosis and treatment', source: 'The Lancet Neurology', year: '2020', link: 'https://doi.org/10.1016/S1474-4422(20)30268-X', tier: 1 },
      { id: '2', text: 'Iron deficiency and RLS', source: 'Sleep Medicine', year: '2021', link: 'https://doi.org/10.1016/j.sleep.2021.02.011', tier: 1 },
      { id: '3', text: 'Dopaminergic treatment for RLS', source: 'Movement Disorders', year: '2020', link: 'https://doi.org/10.1002/mds.28165', tier: 1 },
      { id: '4', text: 'RLS and mental health comorbidity', source: 'Journal of Psychosomatic Research', year: '2019', link: 'https://doi.org/10.1016/j.jpsychores.2019.05.006', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Just as you're about to fall asleep, an overwhelming urge to move your legs jolts you awake. Your legs feel tingly, crawling, aching---relief comes only with movement. This is Restless Leg Syndrome (RLS), a neurological disorder affecting 5-10% of adults.
          </p>
          <p className="mb-6">
            RLS is characterized by an irresistible urge to move the legs, usually accompanied by uncomfortable sensations <Citation id="1" index={1} source="The Lancet Neurology" year="2020" tier={1} />. Symptoms worsen at rest and in the evening, making it difficult to fall asleep or stay seated during activities like movies or flights.
          </p>
        </div>

        <h2 id="diagnostic-criteria" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Diagnostic Criteria
        </h2>
        <p className="mb-6">To diagnose RLS, you must have all five features:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2"><li>Urge to move legs, usually with uncomfortable sensations</li><li>Symptoms begin or worsen during rest/inactivity</li><li>Symptoms partially or totally relieved by movement</li><li>Symptoms worse in evening/night than day</li><li>Not better explained by another condition</li></ul>

        <h2 id="causes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Causes and Risk Factors
        </h2>
        <p className="mb-6"><strong>Primary RLS:</strong> Genetic (40-60% have family history), likely related to dopamine dysfunction in brain.</p>
        <p className="mb-6"><strong>Secondary RLS:</strong> Iron deficiency is the most common trigger <Citation id="2" index={2} source="Sleep Medicine" year="2021" tier={1} />. Also: pregnancy, kidney disease, diabetes, peripheral neuropathy, certain medications (antihistamines, antidepressants).</p>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment Options
        </h2>
        <ProgressSteps variant="vertical" steps={[{title: 'Correct Iron Deficiency', description: <p>Check ferritin levels---if low ({'<'}75 μg/L), iron supplementation often improves or resolves RLS.</p>}, {title: 'Dopaminergic Medications', description: <p>Pramipexole, ropinirole---first-line for moderate-severe RLS <Citation id="3" index={3} source="Movement Disorders" year="2020" tier={1} />. Risk: augmentation (worsening symptoms over time).</p>}, {title: 'Alpha-2-Delta Ligands', description: <p>Gabapentin, pregabalin---effective with lower augmentation risk.</p>}, {title: 'Lifestyle Modifications', description: <p>Exercise, massage, warm baths, leg compression, avoiding triggers (caffeine, alcohol, nicotine).</p>}]} />

        <h2 id="mental-health-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          RLS and Mental Health
        </h2>
        <p className="mb-6">Chronic sleep disruption from RLS increases risk of depression and anxiety <Citation id="4" index={4} source="Journal of Psychosomatic Research" year="2019" tier={1} />. The condition itself is also frustrating and isolating---many people don't understand why you can't sit still or need to pace during meetings or social events.</p>

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>RLS causes an irresistible urge to move legs</strong>, worsening at rest and in evenings.</li><li><strong>Iron deficiency is a common trigger</strong>---check ferritin levels first.</li><li><strong>Medications are effective</strong>: dopamine agonists or gabapentinoids.</li><li><strong>RLS significantly impacts sleep quality</strong>, leading to insomnia and daytime fatigue.</li><li><strong>Mental health comorbidity is common</strong>: depression and anxiety rates are 2-3x higher.</li></ul></ArticleCallout>
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
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Narcolepsy', 'Hypocretin', 'Cataplexy', 'Sleep Disorders'],
    citations: [
      { id: '1', text: 'Narcolepsy: clinical spectrum, diagnosis, and treatment', source: 'Nature Reviews Neurology', year: '2020', link: 'https://doi.org/10.1038/s41582-020-0387-4', tier: 1 },
      { id: '2', text: 'Hypocretin deficiency in narcolepsy type 1', source: 'Sleep Medicine Reviews', year: '2019', link: 'https://doi.org/10.1016/j.smrv.2019.04.001', tier: 1 },
      { id: '3', text: 'Psychosocial impact of narcolepsy', source: 'Sleep Medicine', year: '2020', link: 'https://doi.org/10.1016/j.sleep.2020.03.018', tier: 1 },
      { id: '4', text: 'Treatment of narcolepsy', source: 'American Academy of Sleep Medicine', year: '2021', link: 'https://doi.org/10.5664/jcsm.9328', tier: 4 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Movies depict narcolepsy as people randomly collapsing into sleep mid-sentence. The reality is more complex---and more challenging. Narcolepsy is a chronic neurological disorder affecting the brain's ability to regulate sleep-wake cycles.
          </p>
          <p className="mb-6">
            People with narcolepsy experience excessive daytime sleepiness, sudden muscle weakness (cataplexy), sleep paralysis, and vivid hallucinations <Citation id="1" index={1} source="Nature Reviews Neurology" year="2020" tier={1} />. These symptoms result from the brain's inability to maintain stable wakefulness and prevent REM sleep from intruding into waking life.
          </p>
        </div>

        <h2 id="types" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Two Types of Narcolepsy
        </h2>
        <ComparisonTable title="Narcolepsy Type 1 vs. Type 2" columns={['Feature', 'Type 1', 'Type 2']} items={[{feature: 'Cataplexy', values: ['Present', 'Absent']}, {feature: 'Hypocretin levels', values: ['Very low/absent', 'Normal']}, {feature: 'Severity', values: ['More severe', 'Less severe']}, {feature: 'Prevalence', values: ['70% of cases', '30% of cases']}]} />

        <h2 id="core-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Core Symptoms
        </h2>
        <ArticleTabs tabs={[{id: 'eds', label: 'Excessive Daytime Sleepiness', content: <div><p className="mb-4">Overwhelming, irresistible urge to sleep during the day despite adequate nighttime sleep. Can occur during any activity---driving, eating, talking.</p></div>}, {id: 'cataplexy', label: 'Cataplexy', content: <div><p className="mb-4">Sudden loss of muscle tone triggered by strong emotions (laughter, surprise, anger). Ranges from mild (drooping face) to severe (complete collapse). Only in Type 1.</p></div>}, {id: 'paralysis', label: 'Sleep Paralysis', content: <div><p className="mb-4">Temporary inability to move or speak while falling asleep or waking up. Can be terrifying---you're conscious but can't move.</p></div>}, {id: 'hallucinations', label: 'Hypnagogic Hallucinations', content: <div><p className="mb-4">Vivid, dreamlike experiences while falling asleep or waking. Visual, auditory, or tactile sensations that feel real.</p></div>}]} />

        <h2 id="cause" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Causes Narcolepsy?
        </h2>
        <p className="mb-6">Type 1 narcolepsy is caused by loss of hypocretin (orexin)-producing neurons in the hypothalamus <Citation id="2" index={2} source="Sleep Medicine Reviews" year="2019" tier={1} />. Hypocretin regulates wakefulness---without it, the brain can't maintain stable arousal and REM sleep intrudes into waking.</p>
        <p className="mb-6"><strong>Why neurons die:</strong> Likely autoimmune process triggered by genetic predisposition + environmental factor (possibly infection). Type 2 cause is unknown.</p>

        <h2 id="diagnosis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Diagnosis
        </h2>
        <p className="mb-6">Requires sleep study (polysomnography) + Multiple Sleep Latency Test (MSLT). MSLT measures how quickly you fall asleep during daytime naps---narcolepsy patients fall asleep in {'<'}8 minutes on average and enter REM sleep during naps (abnormal).</p>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment
        </h2>
        <ProgressSteps variant="vertical" steps={[{title: 'Wakefulness-Promoting Agents', description: <p>Modafinil, armodafinil, solriamfetol---reduce daytime sleepiness <Citation id="4" index={4} source="American Academy of Sleep Medicine" year="2021" tier={4} />.</p>}, {title: 'Sodium Oxybate', description: <p>Highly effective for both sleepiness and cataplexy. Taken twice nightly (requires waking to take second dose).</p>}, {title: 'Antidepressants', description: <p>SSRIs, SNRIs---can reduce cataplexy, sleep paralysis, and hallucinations.</p>}, {title: 'Scheduled Naps', description: <p>20-minute naps 2-3x/day can reduce sleepiness attacks.</p>}]} />

        <h2 id="psychosocial-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Living with Narcolepsy
        </h2>
        <p className="mb-6">Narcolepsy profoundly impacts quality of life <Citation id="3" index={3} source="Sleep Medicine" year="2020" tier={1} />. Many face stigma ("you're just lazy"), employment discrimination, and social isolation. Depression and anxiety rates are significantly elevated.</p>

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>Narcolepsy is a neurological disorder</strong> caused by loss of hypocretin neurons (Type 1) or unknown mechanisms (Type 2).</li><li><strong>Core symptom is excessive daytime sleepiness</strong>---not just "tiredness" but irresistible sleep attacks.</li><li><strong>Cataplexy (sudden muscle weakness)</strong> is specific to Type 1 and triggered by strong emotions.</li><li><strong>Treatment combines medication and behavioral strategies</strong>---no cure exists, but symptoms are manageable.</li><li><strong>Psychosocial impact is significant</strong>: stigma, employment challenges, and mental health comorbidity are common.</li></ul></ArticleCallout>
      </>
    ),
  },
];
