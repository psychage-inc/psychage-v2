import React from 'react';
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

export const sleepScienceMentalHealthArticlesB: Article[] = [
  {
    id: catId(6),
    slug: 'sleep-hygiene-evidence-based-habits-better-sleep',
    title: 'Sleep Hygiene 101: Evidence-Based Habits for Better Sleep',
    description: "Good sleep hygiene isn't just about warm milk and lavender. Learn the science-backed habits that actually improve sleep quality and duration.",
    image: '/images/articles/cat09/cover-006.svg',
    category: CATEGORY_SLEEP_BODY,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Sleep Hygiene', 'Habits', 'Sleep Quality', 'Evidence-Based'],
    citations: [
      {
        id: '1',
        text: 'Sleep hygiene: evidence for the effectiveness',
        source: 'Sleep Medicine Reviews',
        year: '2021',
        link: 'https://doi.org/10.1016/j.smrv.2021.101535',
        tier: 1,
      },
      {
        id: '2',
        text: 'Light exposure and sleep quality',
        source: 'Journal of Clinical Sleep Medicine',
        year: '2020',
        link: 'https://doi.org/10.5664/jcsm.8608',
        tier: 1,
      },
      {
        id: '3',
        text: 'Temperature and sleep: the thermoregulatory basis',
        source: 'Physiology & Behavior',
        year: '2019',
        link: 'https://doi.org/10.1016/j.physbeh.2019.03.022',
        tier: 1,
      },
      {
        id: '4',
        text: 'Exercise timing and sleep quality',
        source: 'Sleep Medicine',
        year: '2020',
        link: 'https://doi.org/10.1016/j.sleep.2020.03.006',
        tier: 1,
      },
      {
        id: '5',
        text: 'Cognitive arousal and sleep: a meta-analysis',
        source: 'Behavior Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.beth.2019.08.003',
        tier: 1,
      },
      {
        id: '6',
        text: 'Sleep environment and sleep quality',
        source: 'Sleep Health',
        year: '2021',
        link: 'https://doi.org/10.1016/j.sleh.2021.02.003',
        tier: 1,
      },
      {
        id: '7',
        text: 'Sleep hygiene recommendations',
        source: 'National Sleep Foundation',
        year: '2022',
        link: 'https://www.thensf.org/sleep-hygiene-what-is-it/',
        tier: 3,
      },
      {
        id: '8',
        text: 'Your guide to healthy sleep',
        source: 'National Heart, Lung, and Blood Institute',
        year: '2022',
        link: 'https://www.nhlbi.nih.gov/health/sleep/healthy-sleep-habits',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "Sleep hygiene" sounds clinical, but it's simply the set of habits and environmental conditions that promote consistent, high-quality sleep. While it won't cure chronic insomnia on its own, good sleep hygiene creates the foundation for restorative rest.
          </p>
          <p className="mb-6">
            Not all sleep hygiene advice is created equal. Some recommendations are backed by robust research <Citation id="1" index={1} source="Sleep Medicine Reviews" year="2021" tier={1} />, while others are folk wisdom with little evidence. This guide focuses on what actually works.
          </p>
        </div>

        <h2 id="light-exposure" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          1. Manage Light Exposure Strategically
        </h2>
        <p className="mb-6">
          Light is the most powerful regulator of your circadian rhythm—the internal 24-hour clock that controls sleep-wake cycles <Citation id="2" index={2} source="Journal of Clinical Sleep Medicine" year="2020" tier={1} />. When, how much, and what kind of light you're exposed to directly affects sleep quality.
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'morning-light',
              label: 'Morning Light',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Get bright light exposure within 30-60 minutes of waking.</strong> This signals to your brain that it's daytime, suppressing melatonin and promoting alertness. Natural sunlight is ideal (15-30 minutes outdoors), but a light therapy box (10,000 lux) also works.
                  </p>
                  <p>
                    <strong>Why it works:</strong> Morning light anchors your circadian rhythm, making it easier to fall asleep at night and wake up at the same time each day.
                  </p>
                </div>
              ),
            },
            {
              id: 'evening-light',
              label: 'Evening Light',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Dim lights 1-2 hours before bedtime.</strong> Bright light in the evening delays melatonin release, pushing your sleep onset later. Use warm-toned, low-wattage bulbs or lamps with dimmers.
                  </p>
                  <p>
                    <strong>Why it works:</strong> Reducing light exposure in the evening allows melatonin (the sleep hormone) to rise naturally, signaling your body that it's time to sleep.
                  </p>
                </div>
              ),
            },
            {
              id: 'screen-light',
              label: 'Screen Light',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Limit screens 30-60 minutes before bed.</strong> While blue light from devices does suppress melatonin, the content you're consuming (social media, work emails, news) also increases cognitive and emotional arousal, making it harder to wind down.
                  </p>
                  <p>
                    <strong>Compromise:</strong> If you must use screens, enable night mode (reduces blue light), lower brightness, and avoid stimulating content.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="temperature" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          2. Keep Your Bedroom Cool
        </h2>
        <p className="mb-6">
          Your body temperature naturally drops as you fall asleep—it's a biological signal that sleep is beginning <Citation id="3" index={3} source="Physiology & Behavior" year="2019" tier={1} />. A bedroom that's too warm interferes with this process, making it harder to fall asleep and stay asleep.
        </p>
        <p className="mb-6">
          <strong>Ideal temperature:</strong> 60-67°F (15-19°C) for most people. This may feel cold initially, but your body warms under blankets. If you tend to run hot, aim for the cooler end of the range.
        </p>

        <ArticleCallout variant="tip">
          <p>
            Taking a warm bath or shower 60-90 minutes before bed can improve sleep onset. The post-bath cooling of your body temperature mimics the natural drop that occurs before sleep, signaling your brain that it's time to rest.
          </p>
        </ArticleCallout>

        <h2 id="consistency" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          3. Maintain a Consistent Sleep Schedule
        </h2>
        <p className="mb-6">
          Going to bed and waking up at the same time every day—<strong>including weekends</strong>—is one of the most effective sleep hygiene practices. It reinforces your circadian rhythm, making it easier to fall asleep and wake up naturally.
        </p>
        <p className="mb-6">
          Irregular sleep schedules (sleeping in on weekends, varying bedtimes) create a phenomenon called "social jet lag," where your internal clock is constantly being reset. This leads to grogginess, mood instability, and difficulty concentrating.
        </p>

        <ComparisonTable
          title="Consistent vs. Irregular Sleep Schedule"
          columns={['Pattern', 'Effect on Sleep', 'Long-Term Impact']}
          items={[
            {
              feature: 'Consistent schedule (7 days/week)',
              values: ['Easier sleep onset, natural waking', 'Strong circadian rhythm, better mood and energy'],
            },
            {
              feature: 'Weekday-only consistency',
              values: ['Social jet lag on weekends', 'Disrupted circadian rhythm, Monday fatigue'],
            },
            {
              feature: 'Highly irregular schedule',
              values: ['Insomnia, fragmented sleep', 'Chronic sleep deprivation, increased health risks'],
            },
          ]}
        />

        <h2 id="exercise" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          4. Exercise Regularly (But Time It Right)
        </h2>
        <p className="mb-6">
          Regular physical activity improves both sleep quality and duration <Citation id="4" index={4} source="Sleep Medicine" year="2020" tier={1} />. Exercise reduces the time it takes to fall asleep, increases deep sleep, and decreases nighttime awakenings.
        </p>
        <p className="mb-6">
          <strong>Timing matters:</strong> Vigorous exercise raises body temperature and increases cortisol and adrenaline—both of which can interfere with sleep if done too close to bedtime. Aim to finish intense workouts at least 3-4 hours before bed. Gentle activities like yoga or stretching are fine in the evening.
        </p>

        <ArticleCallout variant="did-you-know">
          <p>
            Morning or afternoon exercise may be more beneficial for sleep than evening workouts, especially for people with insomnia. Morning exercise helps anchor your circadian rhythm, while evening exercise may delay sleep onset for some people.
          </p>
        </ArticleCallout>

        <h2 id="substances" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          5. Limit Caffeine and Alcohol
        </h2>
        <p className="mb-6">
          Both caffeine and alcohol disrupt sleep, though in different ways:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Caffeine</strong> blocks adenosine receptors (adenosine is a chemical that builds up during wakefulness and makes you feel sleepy). Caffeine has a half-life of 5-6 hours, meaning half of it is still in your system 6 hours after consumption. Avoid caffeine after 2 PM if you're sensitive, or noon if you have sleep problems.
          </li>
          <li>
            <strong>Alcohol</strong> may help you fall asleep faster, but it fragments sleep, suppresses REM, and causes early morning awakenings. The more you drink, the worse the effect. Avoid alcohol within 3-4 hours of bedtime.
          </li>
        </ul>

        <ArticleChart
          type="bar"
          title="Caffeine Clearance: Percentage Remaining in Your System"
          data={[
            { label: 'At consumption', value: 100 },
            { label: '3 hours later', value: 70 },
            { label: '6 hours later', value: 50 },
            { label: '9 hours later', value: 35 },
            { label: '12 hours later', value: 25 },
          ]}
          source="Sleep Medicine Reviews, 2021"
        />

        <h2 id="sleep-environment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          6. Optimize Your Sleep Environment
        </h2>
        <p className="mb-6">
          Your bedroom should be a sleep sanctuary—dark, quiet, cool, and comfortable <Citation id="6" index={6} source="Sleep Health" year="2021" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Darkness',
              description: (
                <p>
                  Even small amounts of light can disrupt sleep. Use blackout curtains or an eye mask if street lights or early sunrise are an issue. Cover or remove LED lights from electronics.
                </p>
              ),
            },
            {
              title: 'Quiet',
              description: (
                <p>
                  Noise disrupts sleep cycles, even if you don't consciously wake up. Use earplugs, a white noise machine, or a fan to mask disruptive sounds. Consistent background noise is better than intermittent silence and noise.
                </p>
              ),
            },
            {
              title: 'Comfortable Bedding',
              description: (
                <p>
                  Invest in a supportive mattress and pillows that suit your sleep position. Use breathable, temperature-regulating fabrics (cotton, linen, bamboo) to avoid overheating.
                </p>
              ),
            },
            {
              title: 'Bedroom = Sleep Only',
              description: (
                <p>
                  Avoid working, watching TV, or scrolling on your phone in bed. Your brain should associate the bedroom with sleep and intimacy, not wakefulness and stress.
                </p>
              ),
            },
          ]}
        />

        <h2 id="wind-down-routine" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          7. Create a Wind-Down Routine
        </h2>
        <p className="mb-6">
          Your brain can't instantly switch from "on" to "off." A consistent pre-sleep routine signals to your body that it's time to transition to sleep <Citation id="5" index={5} source="Behavior Therapy" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Effective wind-down activities:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Reading (physical books, not screens)</li>
          <li>Gentle stretching or yoga</li>
          <li>Journaling or gratitude practice</li>
          <li>Listening to calming music or podcasts</li>
          <li>Progressive muscle relaxation or deep breathing</li>
          <li>Taking a warm bath or shower</li>
        </ul>
        <p className="mb-6">
          <strong>Avoid:</strong> Work tasks, difficult conversations, intense exercise, stimulating TV shows, scrolling social media, or anything that increases cognitive or emotional arousal.
        </p>

        <QuoteBlock
          quote="The hour before bed is not the time to solve problems, plan your week, or scroll through the news. It's time to let your nervous system know that the day is done and it's safe to rest."
          attribution="Dr. Michael Breus"
          role="Clinical Psychologist, Sleep Specialist"
          source="The Sleep Doctor, 2022"
        />

        <h2 id="meal-timing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          8. Watch Meal Timing and Size
        </h2>
        <p className="mb-6">
          Eating large meals close to bedtime can interfere with sleep. Digestion raises body temperature and can cause discomfort, acid reflux, or indigestion—all of which disrupt sleep onset and quality.
        </p>
        <p className="mb-6">
          <strong>Best practices:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Finish dinner 2-3 hours before bed</li>
          <li>If you need a snack, keep it light and protein-based (e.g., a small handful of nuts, yogurt)</li>
          <li>Avoid spicy, fatty, or acidic foods in the evening if you're prone to heartburn</li>
          <li>Don't go to bed hungry—hunger can also disrupt sleep</li>
        </ul>

        <h2 id="napping" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          9. Be Strategic About Naps
        </h2>
        <p className="mb-6">
          Napping can be restorative, but poorly timed or excessively long naps can interfere with nighttime sleep.
        </p>
        <p className="mb-6">
          <strong>Napping guidelines:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Duration:</strong> Keep naps to 20-30 minutes (power nap) or 90 minutes (full sleep cycle). Avoid 30-60 minute naps, which often lead to grogginess.</li>
          <li><strong>Timing:</strong> Nap in the early afternoon (1-3 PM). Napping after 3 PM can make it harder to fall asleep at night.</li>
          <li><strong>If you have insomnia:</strong> Avoid napping altogether, as it reduces sleep pressure (the drive to sleep) at night.</li>
        </ul>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'what-if-cant-sleep',
              title: "What if I can't fall asleep within 20 minutes?",
              content: (
                <p>
                  Get out of bed and do a quiet, non-stimulating activity (reading, gentle stretching) until you feel sleepy. This prevents your brain from associating the bed with wakefulness and frustration—a key principle in CBT for insomnia.
                </p>
              ),
            },
            {
              id: 'sleep-hygiene-enough',
              title: 'Is sleep hygiene enough to treat insomnia?',
              content: (
                <p>
                  Sleep hygiene is necessary but often not sufficient for chronic insomnia. Cognitive Behavioral Therapy for Insomnia (CBT-I) addresses the underlying thoughts and behaviors that perpetuate insomnia and is the gold-standard treatment.
                </p>
              ),
            },
            {
              id: 'how-long-to-work',
              title: 'How long before I see results?',
              content: (
                <p>
                  Some changes (like dimming lights in the evening) may show benefits within days. Others (like maintaining a consistent schedule) may take 1-2 weeks to fully regulate your circadian rhythm. Consistency is key.
                </p>
              ),
            },
          ]}
        />

        <h2 id="common-mistakes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Sleep Hygiene Mistakes
        </h2>
        <BeforeAfter
          before={{
            title: "What Doesn't Help",
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Trying to force sleep by lying in bed awake</li>
                <li>Varying bedtime by 2+ hours on weekends</li>
                <li>Using screens right up until lights out</li>
                <li>Drinking coffee after 3 PM</li>
                <li>Exercising vigorously within 2 hours of bed</li>
                <li>Keeping the bedroom warm (75°F+)</li>
                <li>Using alcohol as a "sleep aid"</li>
              </ul>
            ),
          }}
          after={{
            title: 'What Actually Works',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Getting out of bed if you can't sleep within 20 minutes</li>
                <li>Same bedtime and wake time 7 days/week</li>
                <li>Screen-free wind-down for 30-60 minutes</li>
                <li>No caffeine after 2 PM (or noon if sensitive)</li>
                <li>Finishing workouts 3-4 hours before bed</li>
                <li>Cool bedroom (60-67°F)</li>
                <li>Alcohol-free evenings or stopping 3-4 hours before sleep</li>
              </ul>
            ),
          }}
        />

        <h2 id="key-takeaways" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Takeaways
        </h2>
        <ArticleCallout variant="key-takeaway">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Light exposure</strong> is the most powerful circadian regulator—get bright light in the morning, dim it at night.</li>
            <li><strong>Consistency matters most</strong>: same bedtime and wake time every day, including weekends.</li>
            <li><strong>Cool, dark, quiet environments</strong> promote better sleep quality.</li>
            <li><strong>Avoid caffeine after 2 PM</strong> and alcohol within 3-4 hours of bed.</li>
            <li><strong>Wind-down routines</strong> signal your brain that it's time to sleep.</li>
            <li><strong>Sleep hygiene alone won't cure chronic insomnia</strong>—seek CBT-I if problems persist.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(7),
    slug: 'circadian-rhythm-internal-clock-controls-everything',
    title: 'Your Circadian Rhythm: How Your Internal Clock Controls Everything',
    description: 'Your circadian rhythm regulates far more than sleep—it orchestrates hormones, metabolism, mood, and immune function across the 24-hour cycle.',
    image: "/images/articles/cat09/cover-007.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Circadian Rhythm', 'Chronobiology', 'Sleep Science', 'Metabolism'],
    citations: [
      {
        id: '1',
        text: 'The circadian clock and human health',
        source: 'Current Biology',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cub.2020.02.038',
        tier: 1,
      },
      {
        id: '2',
        text: 'Circadian rhythms and mental health',
        source: 'Translational Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1038/s41398-021-01444-5',
        tier: 1,
      },
      {
        id: '3',
        text: 'Light and the human circadian clock',
        source: 'Sleep Medicine Reviews',
        year: '2019',
        link: 'https://doi.org/10.1016/j.smrv.2019.03.003',
        tier: 1,
      },
      {
        id: '4',
        text: 'The suprachiasmatic nucleus and circadian timekeeping',
        source: 'Progress in Brain Research',
        year: '2020',
        link: 'https://doi.org/10.1016/bs.pbr.2020.02.006',
        tier: 1,
      },
      {
        id: '5',
        text: 'Shift work and health',
        source: 'Occupational Medicine',
        year: '2021',
        link: 'https://doi.org/10.1093/occmed/kqab010',
        tier: 1,
      },
      {
        id: '6',
        text: 'Social jetlag and metabolic health',
        source: 'Current Opinion in Endocrine and Metabolic Research',
        year: '2020',
        link: 'https://doi.org/10.1016/j.coemr.2020.03.002',
        tier: 1,
      },
      {
        id: '7',
        text: 'Chronotypes: morning and evening types',
        source: 'Nature and Science of Sleep',
        year: '2020',
        link: 'https://doi.org/10.2147/NSS.S278946',
        tier: 1,
      },
      {
        id: '8',
        text: 'Circadian rhythm disruption and disease',
        source: 'Annual Review of Physiology',
        year: '2021',
        link: 'https://doi.org/10.1146/annurev-physiol-031820-092733',
        tier: 1,
      },
      {
        id: '9',
        text: 'Circadian rhythms fact sheet',
        source: 'National Institute of General Medical Sciences',
        year: '2023',
        link: 'https://www.nigms.nih.gov/education/fact-sheets/Pages/circadian-rhythms.aspx',
        tier: 2,
      },
      {
        id: '10',
        text: 'The Nobel Prize in Physiology or Medicine 2017: Circadian Rhythms',
        source: 'NobelPrize.org',
        year: '2017',
        link: 'https://www.nobelprize.org/prizes/medicine/2017/summary/',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Deep inside your brain, a cluster of about 20,000 neurons called the suprachiasmatic nucleus (SCN) acts as your body's master clock. This tiny structure orchestrates a 24-hour rhythm that influences nearly every cell in your body—when you feel alert, when you feel hungry, when your body temperature peaks, and when you're most vulnerable to infection.
          </p>
          <p className="mb-6">
            Your circadian rhythm isn't just about sleep. It's a fundamental organizing principle that coordinates physiology, behavior, and metabolism across the day-night cycle <Citation id="1" index={1} source="Current Biology" year="2020" tier={1} />. When this rhythm is disrupted—by shift work, jet lag, or irregular sleep schedules—the consequences extend far beyond fatigue.
          </p>
        </div>

        <ArticleCallout variant="did-you-know">
          <p>
            In 2017, the Nobel Prize in Physiology or Medicine was awarded to three scientists who discovered the molecular mechanisms of the circadian clock <Citation id="10" index={10} source="NobelPrize.org" year="2017" tier={3} />. Their work revealed that circadian rhythms are encoded in our genes and exist in virtually every cell.
          </p>
        </ArticleCallout>

        <h2 id="what-is-circadian-rhythm" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is a Circadian Rhythm?
        </h2>
        <p className="mb-6">
          The term "circadian" comes from the Latin <em>circa diem</em>, meaning "about a day." Circadian rhythms are roughly 24-hour cycles in biological processes that persist even in the absence of environmental cues <Citation id="9" index={9} source="National Institute of General Medical Sciences" year="2023" tier={2} />.
        </p>
        <p className="mb-6">
          These rhythms are <strong>endogenous</strong>—meaning they're generated internally, not imposed by the external environment. If you were placed in a dark cave with no time cues, your body would still maintain an approximately 24-hour cycle of sleep-wake, body temperature, and hormone release. However, this internal rhythm isn't exactly 24 hours for most people; it's closer to 24.2 hours. Light exposure 'resets' the clock each day, keeping it synchronized with the external world.
        </p>

        <h2 id="master-clock-scn" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Master Clock: The Suprachiasmatic Nucleus
        </h2>
        <p className="mb-6">
          The SCN sits in the hypothalamus, just above where the optic nerves cross. It receives direct input from the eyes via a specialized pathway, allowing it to detect light and adjust the circadian rhythm accordingly <Citation id="4" index={4} source="Progress in Brain Research" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          The SCN synchronizes "peripheral clocks" throughout the body—in the liver, heart, muscles, and even individual cells. These peripheral clocks regulate local functions (like when the liver releases glucose or when the gut is most active), but they all take their timing cues from the SCN.
        </p>

        <ArticleChart
          type="line"
          title="Typical 24-Hour Circadian Rhythm Markers"
          data={[
            { label: '6 AM', value: 30 },
            { label: '9 AM', value: 70 },
            { label: '12 PM', value: 85 },
            { label: '3 PM', value: 65 },
            { label: '6 PM', value: 50 },
            { label: '9 PM', value: 25 },
            { label: '12 AM', value: 10 },
            { label: '3 AM', value: 5 },
          ]}
          source="Current Biology, 2020"
        />

        <h2 id="what-circadian-rhythm-controls" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Does Your Circadian Rhythm Control?
        </h2>
        <p className="mb-6">
          Your circadian rhythm orchestrates a staggering array of biological processes:
        </p>

        <ComparisonTable
          title="Circadian-Regulated Processes"
          columns={['System', "What's Regulated", 'Peak Timing (Typical)']}
          items={[
            { feature: 'Sleep-Wake Cycle', values: ['Alertness, sleepiness', 'Alert: midday; Sleepy: 2-4 AM'] },
            { feature: 'Body Temperature', values: ['Core temperature', 'Highest: 5-7 PM; Lowest: 4-6 AM'] },
            { feature: 'Hormone Release', values: ['Cortisol, melatonin, growth hormone', 'Cortisol: morning; Melatonin: evening'] },
            { feature: 'Metabolism', values: ['Insulin sensitivity, glucose regulation', 'Best glucose tolerance: morning'] },
            { feature: 'Immune Function', values: ['Inflammation, white blood cell activity', 'Strongest: night'] },
            { feature: 'Cognitive Performance', values: ['Reaction time, memory, attention', 'Peak: late morning to afternoon'] },
            { feature: 'Cardiovascular', values: ['Blood pressure, heart rate', 'BP peaks: morning; lowest: night'] },
          ]}
        />

        <h2 id="light-zeitgeber" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Light: The Primary Zeitgeber
        </h2>
        <p className="mb-6">
          "Zeitgeber" is German for "time giver"—an environmental cue that synchronizes the internal clock. Light is the most powerful zeitgeber for humans <Citation id="3" index={3} source="Sleep Medicine Reviews" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          Specialized photoreceptor cells in the retina (called intrinsically photosensitive retinal ganglion cells) detect light—especially blue wavelengths—and send signals directly to the SCN. This is why morning sunlight exposure is so effective at "setting" your circadian clock and why blue-light-rich screens in the evening can delay sleep onset.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'other-zeitgebers',
              title: 'Are there other zeitgebers besides light?',
              content: (
                <p>
                  Yes. Meal timing, exercise, social interaction, and temperature changes can all influence circadian rhythms—though none as powerfully as light. Regular meal times, for example, help synchronize peripheral clocks in the liver and gut.
                </p>
              ),
            },
            {
              id: 'blind-people',
              title: "What happens if you're blind?",
              content: (
                <p>
                  Some blind people—those whose eyes can still detect light via the specialized circadian photoreceptors—maintain normal circadian rhythms. Others develop Non-24-Hour Sleep-Wake Disorder, where their internal clock 'free-runs' and gradually drifts later each day because it lacks light input to reset.
                </p>
              ),
            },
          ]}
        />

        <h2 id="chronotypes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Chronotypes: Are You a Lark or an Owl?
        </h2>
        <p className="mb-6">
          People vary in their natural circadian timing—a trait called <strong>chronotype</strong> <Citation id="7" index={7} source="Nature and Science of Sleep" year="2020" tier={1} />. This variation is partly genetic and reflects when your internal clock is set relative to the 24-hour day.
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'morning-types',
              label: 'Morning Types (Larks)',
              content: (
                <div>
                  <p className="mb-4">
                    Wake naturally early, feel most alert in the morning, and become sleepy by 9-10 PM. They perform best on cognitive tasks in the morning.
                  </p>
                  <p>
                    <strong>Prevalence:</strong> ~15-20% of people
                  </p>
                </div>
              ),
            },
            {
              id: 'evening-types',
              label: 'Evening Types (Owls)',
              content: (
                <div>
                  <p className="mb-4">
                    Struggle to wake early, feel most alert in the evening and night, and prefer staying up past midnight. They perform best on cognitive tasks in the afternoon/evening.
                  </p>
                  <p>
                    <strong>Prevalence:</strong> ~15-20% of people
                  </p>
                </div>
              ),
            },
            {
              id: 'intermediate',
              label: 'Intermediate Types',
              content: (
                <div>
                  <p className="mb-4">
                    Fall between the extremes, with moderate flexibility in sleep timing and alertness.
                  </p>
                  <p>
                    <strong>Prevalence:</strong> ~60-70% of people
                  </p>
                </div>
              ),
            },
          ]}
        />

        <p className="mb-6 mt-6">
          Chronotype is not a choice or a personality trait—it's biologically driven. Evening types (night owls) aren't lazy; their circadian rhythms are naturally delayed. Forcing a night owl to wake at 6 AM every day is like imposing permanent jet lag.
        </p>

        <h2 id="circadian-misalignment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Happens When Circadian Rhythms Are Disrupted?
        </h2>
        <p className="mb-6">
          Circadian misalignment—when your internal clock is out of sync with your environment or schedule—has profound health consequences <Citation id="8" index={8} source="Annual Review of Physiology" year="2021" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Shift Work',
              description: (
                <p>
                  Working night shifts or rotating shifts forces your body to be awake when it's biologically programmed to sleep. This chronic circadian disruption is linked to increased risk of cardiovascular disease, diabetes, obesity, cancer, and mood disorders <Citation id="5" index={5} source="Occupational Medicine" year="2021" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Social Jet Lag',
              description: (
                <p>
                  Sleeping in on weekends to 'catch up' creates a mismatch between your weekday and weekend circadian timing—like traveling across time zones every week. Social jet lag is linked to metabolic problems, mood disturbances, and poor cognitive performance <Citation id="6" index={6} source="Current Opinion in Endocrine and Metabolic Research" year="2020" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Travel Across Time Zones',
              description: (
                <p>
                  Jet lag occurs when your internal clock is still set to your home time zone while your environment has shifted. It takes about one day per time zone crossed to fully adjust.
                </p>
              ),
            },
            {
              title: 'Irregular Sleep Schedules',
              description: (
                <p>
                  Going to bed and waking up at drastically different times each day prevents your circadian rhythm from stabilizing, leading to chronic fatigue, mood problems, and metabolic dysfunction.
                </p>
              ),
            },
          ]}
        />

        <h2 id="mental-health-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Circadian Rhythms and Mental Health
        </h2>
        <p className="mb-6">
          Disrupted circadian rhythms are strongly linked to mental health conditions, particularly mood disorders <Citation id="2" index={2} source="Translational Psychiatry" year="2021" tier={1} />.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Depression:</strong> Many people with depression have circadian rhythm abnormalities, including delayed sleep onset, early morning awakening, and flattened body temperature rhythms.</li>
          <li><strong>Bipolar Disorder:</strong> Circadian disruption can trigger manic or depressive episodes. Sleep loss is one of the most reliable predictors of mania.</li>
          <li><strong>Seasonal Affective Disorder (SAD):</strong> Reduced light exposure in winter disrupts circadian timing, contributing to seasonal depression.</li>
          <li><strong>ADHD:</strong> Many people with ADHD have delayed circadian rhythms, making it hard to wake early and feel alert in the morning.</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>
            Bright light therapy, chronotherapy (strategically timed sleep-wake schedules), and melatonin supplementation are all evidence-based interventions that target circadian rhythms to treat depression and other mental health conditions.
          </p>
        </ArticleCallout>

        <h2 id="optimizing-circadian-health" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Optimize Your Circadian Health
        </h2>
        <BeforeAfter
          before={{
            title: 'Circadian-Disrupting Habits',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Sleeping in 2+ hours on weekends</li>
                <li>No morning light exposure</li>
                <li>Bright light exposure late at night</li>
                <li>Eating large meals late in the evening</li>
                <li>Inconsistent bedtimes (varying by 2+ hours)</li>
                <li>Working night shifts with no recovery time</li>
              </ul>
            ),
          }}
          after={{
            title: 'Circadian-Supporting Habits',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Same wake time 7 days/week (±30 min)</li>
                <li>15-30 min bright light within 1 hour of waking</li>
                <li>Dim lights 1-2 hours before bed</li>
                <li>Finish dinner 2-3 hours before sleep</li>
                <li>Consistent bedtime (±30 min nightly)</li>
                <li>Strategic light exposure if shift work is unavoidable</li>
              </ul>
            ),
          }}
        />

        <StatCard
          stats={[
            { value: 24.2, suffix: ' hrs', label: 'Average human circadian period (without light cues)' },
            { value: 20000, suffix: '', label: 'Neurons in the SCN (master clock)' },
            { value: 2, suffix: 'x', label: 'Increased risk of metabolic disease with circadian disruption' },
          ]}
          source="NIGMS, 2023; Annual Review of Physiology, 2021"
        />

        <h2 id="key-takeaways" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Takeaways
        </h2>
        <ArticleCallout variant="key-takeaway">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Your circadian rhythm</strong> is a 24-hour internal clock that regulates sleep, hormones, metabolism, and immune function.</li>
            <li><strong>The SCN is the master clock</strong>, synchronized by light exposure and coordinating peripheral clocks throughout the body.</li>
            <li><strong>Chronotypes vary</strong>: morning types, evening types, and intermediate types have different natural circadian timing.</li>
            <li><strong>Circadian disruption</strong> (shift work, social jet lag, irregular schedules) increases risk of chronic disease and mental health problems.</li>
            <li><strong>Light is the most powerful regulator</strong>: get bright light in the morning, dim it at night.</li>
            <li><strong>Consistency matters</strong>: regular sleep-wake times anchor your circadian rhythm and improve health outcomes.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(8),
    slug: 'blue-light-screens-sleep-science-evidence',
    title: 'Blue Light, Screens, and Sleep: What the Science Actually Says',
    description: 'Blue light suppresses melatonin, but is it the real reason screens disrupt sleep? Explore what the research reveals about technology and rest.',
    image: "/images/articles/cat09/cover-008.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Blue Light', 'Screen Time', 'Melatonin', 'Technology'],
    citations: [
      {
        id: '1',
        text: 'Blue light and sleep: review of the evidence',
        source: 'Sleep Medicine Reviews',
        year: '2020',
        link: 'https://doi.org/10.1016/j.smrv.2020.101321',
        tier: 1,
      },
      {
        id: '2',
        text: 'Evening use of light-emitting eReaders negatively affects sleep',
        source: 'Proceedings of the National Academy of Sciences',
        year: '2015',
        link: 'https://doi.org/10.1073/pnas.1418490112',
        tier: 1,
      },
      {
        id: '3',
        text: 'Blue-light filtering lenses and sleep quality',
        source: 'Journal of Psychiatric Research',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jpsychires.2021.02.019',
        tier: 1,
      },
      {
        id: '4',
        text: 'Content matters: cognitive arousal from screen use',
        source: 'Computers in Human Behavior',
        year: '2020',
        link: 'https://doi.org/10.1016/j.chb.2020.106422',
        tier: 1,
      },
      {
        id: '5',
        text: 'Screen time and adolescent sleep',
        source: 'Sleep Medicine',
        year: '2021',
        link: 'https://doi.org/10.1016/j.sleep.2021.05.009',
        tier: 1,
      },
      {
        id: '6',
        text: 'Melanopsin and circadian photoreception',
        source: 'Nature',
        year: '2020',
        link: 'https://doi.org/10.1038/s41586-020-2019-0',
        tier: 1,
      },
      {
        id: '7',
        text: 'Night mode settings: do they help?',
        source: 'Sleep Health',
        year: '2020',
        link: 'https://doi.org/10.1016/j.sleh.2020.01.003',
        tier: 1,
      },
      {
        id: '8',
        text: 'Screen time and sleep disorders',
        source: 'American Academy of Pediatrics',
        year: '2022',
        link: 'https://www.aap.org/en/patient-care/media-and-children/',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You've heard the warnings: blue light from screens destroys your sleep. But if you've tried blue-light-blocking glasses or night mode settings and still struggle with sleep, you might wonder if the science is oversold.
          </p>
          <p className="mb-6">
            The truth is nuanced. Blue light does suppress melatonin and delay sleep onset <Citation id="1" index={1} source="Sleep Medicine Reviews" year="2020" tier={1} />, but it's not the only—or even the primary—reason screens disrupt sleep. What you're doing on your device matters as much as the light it emits.
          </p>
        </div>

        <h2 id="blue-light-basics" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Blue Light Affects Sleep
        </h2>
        <p className="mb-6">
          Blue light—wavelengths between 450-480 nanometers—is part of the visible light spectrum. It's abundant in natural sunlight (which is why the sky looks blue) and is also emitted by LED screens, smartphones, tablets, and computers.
        </p>
        <p className="mb-6">
          Specialized photoreceptor cells in your eyes, called intrinsically photosensitive retinal ganglion cells (ipRGCs), contain a pigment called melanopsin that is most sensitive to blue light <Citation id="6" index={6} source="Nature" year="2020" tier={1} />. When these cells detect blue light, they send signals to the brain's master clock (the suprachiasmatic nucleus), which suppresses melatonin production.
        </p>
        <p className="mb-6">
          <strong>During the day:</strong> This is beneficial. Blue light from sunlight keeps you alert, suppresses melatonin, and anchors your circadian rhythm.
        </p>
        <p className="mb-6">
          <strong>At night:</strong> Blue light from screens tricks your brain into thinking it's still daytime, delaying melatonin release and making it harder to fall asleep.
        </p>

        <ArticleCallout variant="did-you-know">
          <p>
            A landmark 2015 study found that people who read on an iPad before bed took an average of 10 minutes longer to fall asleep and had 55% less melatonin compared to those who read a printed book <Citation id="2" index={2} source="Proceedings of the National Academy of Sciences" year="2015" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="not-just-blue-light" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          It's Not Just the Blue Light—It's What You're Doing
        </h2>
        <p className="mb-6">
          While blue light suppresses melatonin, research suggests that the <strong>content</strong> you're consuming and the <strong>cognitive arousal</strong> it creates may be even more disruptive to sleep <Citation id="4" index={4} source="Computers in Human Behavior" year="2020" tier={1} />.
        </p>

        <ComparisonTable
          title="Screen Activities and Sleep Disruption"
          columns={['Activity', 'Primary Disruption Mechanism', 'Impact on Sleep']}
          items={[
            { feature: 'Reading an e-book', values: ['Blue light exposure', 'Moderate (delays sleep onset)'] },
            { feature: 'Scrolling social media', values: ['Cognitive/emotional arousal', 'High (increases alertness, reduces sleep quality)'] },
            { feature: 'Watching action movies', values: ['Emotional arousal, blue light', 'High (stimulates adrenaline, delays sleep)'] },
            { feature: 'Work emails before bed', values: ['Stress/cognitive arousal', 'Very High (activates stress response)'] },
            { feature: 'Calm music or meditation app', values: ['Minimal (if screen is dimmed)', 'Low to Moderate'] },
          ]}
        />

        <p className="mb-6 mt-6">
          Checking work emails, scrolling through upsetting news, or watching a thriller activates your stress response and increases cortisol—a wakefulness hormone. Even with blue light filtered out, this cognitive and emotional arousal makes it hard to fall asleep.
        </p>

        <h2 id="blue-light-glasses" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Do Blue-Light-Blocking Glasses Work?
        </h2>
        <p className="mb-6">
          The evidence is mixed. Some studies show that blue-light-blocking glasses worn in the evening can improve sleep quality and reduce the time it takes to fall asleep <Citation id="3" index={3} source="Journal of Psychiatric Research" year="2021" tier={1} />. Other studies find no significant benefit.
        </p>
        <p className="mb-6">
          <strong>When they might help:</strong> If your primary screen use before bed is passive (reading, watching calm content) and you're highly sensitive to light, blue-light-blocking glasses may provide modest benefits.
        </p>
        <p className="mb-6">
          <strong>When they won't help:</strong> If you're engaging in cognitively or emotionally stimulating activities (social media, news, work), blocking blue light won't address the arousal response. You'll still struggle with sleep.
        </p>

        <ArticleCallout variant="tip">
          <p>
            If you want to try blue-light-blocking glasses, look for ones that filter at least 80% of blue light in the 450-480 nm range. Cheap "computer glasses" with minimal filtering are unlikely to be effective.
          </p>
        </ArticleCallout>

        <h2 id="night-mode" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What About Night Mode or "Night Shift" Settings?
        </h2>
        <p className="mb-6">
          Most devices now offer night mode, which reduces blue light by shifting the screen's color temperature toward warmer (orange/red) tones. Does this help?
        </p>
        <p className="mb-6">
          Research shows that night mode provides <strong>minimal to moderate benefit</strong> <Citation id="7" index={7} source="Sleep Health" year="2020" tier={1} />. While it reduces blue light exposure, it doesn't eliminate it completely, and it does nothing to address the arousal caused by the content you're viewing.
        </p>
        <p className="mb-6">
          <strong>Bottom line:</strong> Night mode is better than nothing, but it's not a license to scroll Instagram until midnight and expect good sleep.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'all-screens-equal',
              title: 'Are all screens equally disruptive?',
              content: (
                <p>
                  No. Larger, brighter screens (TVs, desktop monitors) emit more light than smaller ones (phones). However, phones are often held closer to your face, increasing the light's impact on your eyes. E-readers with e-ink displays (like older Kindles) emit almost no light and don't suppress melatonin.
                </p>
              ),
            },
            {
              id: 'distance-matter',
              title: 'Does distance from the screen matter?',
              content: (
                <p>
                  Yes. The closer the screen to your eyes, the more light enters your pupils and the stronger the melatonin-suppressing effect. Watching TV from across the room is less disruptive than scrolling your phone in bed.
                </p>
              ),
            },
            {
              id: 'other-light-sources',
              title: 'What about other light sources at night?',
              content: (
                <p>
                  Bright overhead lights, especially LED or fluorescent bulbs, also suppress melatonin. Dim, warm-toned lights (lamps with orange/red bulbs or candles) have minimal impact on circadian rhythms.
                </p>
              ),
            },
          ]}
        />

        <h2 id="adolescents-screens" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Adolescents Are Especially Vulnerable
        </h2>
        <p className="mb-6">
          Teenagers are particularly susceptible to screen-related sleep disruption <Citation id="5" index={5} source="Sleep Medicine" year="2021" tier={1} />. During puberty, circadian rhythms naturally shift later (a phenomenon called "sleep phase delay"), making teens biologically predisposed to stay up late and sleep in.
        </p>
        <p className="mb-6">
          When you combine this biological tendency with late-night screen use (texting, gaming, social media), the result is chronic sleep deprivation. Studies show that adolescents who use screens for 2+ hours before bed get significantly less sleep and report worse mood, academic performance, and mental health.
        </p>

        <ArticleChart
          type="bar"
          title="Average Sleep Loss in Adolescents by Screen Time Before Bed"
          data={[
            { label: 'No screens', value: 8.2 },
            { label: '<1 hour', value: 7.8 },
            { label: '1-2 hours', value: 7.3 },
            { label: '2-3 hours', value: 6.8 },
            { label: '>3 hours', value: 6.2 },
          ]}
          source="Sleep Medicine, 2021"
        />

        <h2 id="practical-recommendations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Recommendations
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Set a Screen Curfew',
              description: (
                <p>
                  <strong>Best:</strong> No screens 60-90 minutes before bed. <strong>Minimum:</strong> 30 minutes screen-free before sleep. Use this time for reading (physical books), journaling, stretching, or other calming activities.
                </p>
              ),
            },
            {
              title: 'Dim the Brightness',
              description: (
                <p>
                  If you must use screens in the evening, lower the brightness to the minimum comfortable level. Enable night mode as an additional (though limited) measure.
                </p>
              ),
            },
            {
              title: "Change What You're Doing",
              description: (
                <p>
                  Avoid stimulating content: news, work emails, intense games, or emotionally charged social media. If you're going to use screens, stick to calm, passive activities.
                </p>
              ),
            },
            {
              title: 'Increase Distance',
              description: (
                <p>
                  Watch TV from across the room rather than scrolling your phone 6 inches from your face. The farther the screen, the less light reaches your eyes.
                </p>
              ),
            },
            {
              title: 'Use Blue-Light Filters Strategically',
              description: (
                <p>
                  If your work requires evening screen use, consider blue-light-blocking glasses or apps like f.lux that automatically adjust screen color temperature based on time of day.
                </p>
              ),
            },
            {
              title: 'Prioritize Morning Light',
              description: (
                <p>
                  Get 15-30 minutes of bright light (ideally sunlight) within an hour of waking. This strengthens your circadian rhythm, making you more resilient to evening light exposure.
                </p>
              ),
            },
          ]}
        />

        <h2 id="special-cases" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Special Cases: Shift Workers and Night Owls
        </h2>
        <p className="mb-6">
          <strong>Shift workers:</strong> If you work night shifts, you may actually <em>need</em> blue light exposure at night to stay alert. In this case, bright light during your "work day" (even if it's nighttime) and dark, blue-light-free environments during your "sleep time" (even if it's daytime) can help align your circadian rhythm with your schedule.
        </p>
        <p className="mb-6">
          <strong>Extreme night owls:</strong> People with Delayed Sleep Phase Disorder (a circadian rhythm disorder) may benefit from strategic evening blue light reduction combined with morning bright light therapy to gradually shift their rhythm earlier.
        </p>

        <BeforeAfter
          before={{
            title: 'High-Disruption Evening Routine',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Scrolling social media in bed</li>
                <li>Checking work emails at 10 PM</li>
                <li>Watching the news right before sleep</li>
                <li>Phone at full brightness, 6 inches from face</li>
                <li>Engaging in arguments or debates online</li>
                <li>Playing stimulating video games until midnight</li>
              </ul>
            ),
          }}
          after={{
            title: 'Low-Disruption Evening Routine',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Screens off 60 minutes before bed</li>
                <li>Work emails closed after 8 PM</li>
                <li>Calm music, meditation app, or podcast (audio only)</li>
                <li>Night mode enabled, brightness at 30-40%</li>
                <li>Passive content only (reading, watching calm shows)</li>
                <li>Physical book or journaling as wind-down activity</li>
              </ul>
            ),
          }}
        />

        <h2 id="key-takeaways" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Takeaways
        </h2>
        <ArticleCallout variant="key-takeaway">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Blue light suppresses melatonin</strong>, delaying sleep onset when exposure occurs in the evening.</li>
            <li><strong>Content matters as much as light</strong>: cognitively or emotionally stimulating activities disrupt sleep regardless of blue light filtering.</li>
            <li><strong>Night mode helps, but minimally</strong>—it's not a replacement for reducing screen time.</li>
            <li><strong>Blue-light-blocking glasses</strong> may provide modest benefits for passive screen use, but won't fix arousal from stimulating content.</li>
            <li><strong>Screen curfew is most effective</strong>: 30-90 minutes screen-free before bed improves sleep quality.</li>
            <li><strong>Morning light exposure</strong> strengthens your circadian rhythm, making you less vulnerable to evening light disruption.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(9),
    slug: 'caffeine-alcohol-sleep-substances-sabotage-rest',
    title: 'Caffeine, Alcohol, and Sleep: How Common Substances Sabotage Your Rest',
    description: 'Coffee helps you wake up, and alcohol helps you fall asleep—right? The truth about how these substances affect sleep quality is more complicated.',
    image: "/images/articles/cat09/cover-009.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Caffeine', 'Alcohol', 'Sleep Quality', 'Substances'],
    citations: [
      {
        id: '1',
        text: 'Caffeine effects on sleep taken 0, 3, or 6 hours before bedtime',
        source: 'Journal of Clinical Sleep Medicine',
        year: '2013',
        link: 'https://doi.org/10.5664/jcsm.3170',
        tier: 1,
      },
      {
        id: '2',
        text: 'Alcohol and sleep: recent research',
        source: 'Sleep Medicine Reviews',
        year: '2020',
        link: 'https://doi.org/10.1016/j.smrv.2020.101313',
        tier: 1,
      },
      {
        id: '3',
        text: 'Caffeine use disorder: a comprehensive review',
        source: 'Journal of Caffeine Research',
        year: '2020',
        link: 'https://doi.org/10.1089/jcr.2020.0009',
        tier: 1,
      },
      {
        id: '4',
        text: 'Alcohol disrupts sleep homeostasis',
        source: 'Alcoholism: Clinical and Experimental Research',
        year: '2019',
        link: 'https://doi.org/10.1111/acer.14078',
        tier: 1,
      },
      {
        id: '5',
        text: 'Nicotine and sleep disturbance',
        source: 'Sleep Medicine',
        year: '2020',
        link: 'https://doi.org/10.1016/j.sleep.2020.06.012',
        tier: 1,
      },
      {
        id: '6',
        text: 'Genetics of caffeine metabolism',
        source: 'Pharmacological Reviews',
        year: '2019',
        link: 'https://doi.org/10.1124/pr.119.017954',
        tier: 1,
      },
      {
        id: '7',
        text: 'Caffeine and sleep',
        source: 'National Sleep Foundation',
        year: '2022',
        link: 'https://www.thensf.org/caffeine-and-sleep/',
        tier: 3,
      },
      {
        id: '8',
        text: 'Substance use and sleep disorders',
        source: 'Substance Abuse and Mental Health Services Administration',
        year: '2022',
        link: 'https://www.samhsa.gov/find-help/national-helpline',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Coffee in the morning, wine in the evening—it's a daily rhythm for millions of people. But while caffeine and alcohol feel like they help you manage wakefulness and sleep, both substances disrupt the very processes they seem to support.
          </p>
          <p className="mb-6">
            Understanding how these common substances affect sleep architecture, circadian rhythms, and overall sleep quality can help you make informed choices about when and how much to consume.
          </p>
        </div>

        <h2 id="caffeine-basics" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Caffeine: The World's Most Popular Stimulant
        </h2>
        <p className="mb-6">
          Caffeine is consumed by about 90% of adults worldwide, primarily through coffee, tea, energy drinks, and sodas. It works by blocking adenosine receptors in the brain. Adenosine is a neurotransmitter that builds up during wakefulness and makes you feel sleepy—so when caffeine blocks these receptors, you feel more alert.
        </p>
        <p className="mb-6">
          But caffeine doesn't eliminate sleepiness; it just masks it. The adenosine is still there, waiting. When caffeine wears off, the accumulated adenosine floods the receptors all at once, causing the "caffeine crash."
        </p>

        <ArticleCallout variant="did-you-know">
          <p>
            Caffeine has a half-life of 5-6 hours in most people <Citation id="1" index={1} source="Journal of Clinical Sleep Medicine" year="2013" tier={1} />. This means if you drink a cup of coffee at 3 PM, half of that caffeine is still in your system at 9 PM—potentially interfering with sleep onset.
          </p>
        </ArticleCallout>

        <h2 id="caffeine-sleep-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Caffeine Disrupts Sleep
        </h2>
        <p className="mb-6">
          Caffeine affects sleep in multiple ways:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'sleep-onset',
              label: 'Delays Sleep Onset',
              content: (
                <div>
                  <p className="mb-4">
                    Even caffeine consumed 6 hours before bed can significantly increase the time it takes to fall asleep. People often underestimate how long caffeine stays in their system.
                  </p>
                  <p>
                    <strong>Research finding:</strong> Consuming 400mg of caffeine (about 2-3 cups of coffee) 6 hours before bed reduced total sleep time by more than an hour <Citation id="1" index={1} source="Journal of Clinical Sleep Medicine" year="2013" tier={1} />.
                  </p>
                </div>
              ),
            },
            {
              id: 'sleep-quality',
              label: 'Reduces Sleep Quality',
              content: (
                <div>
                  <p className="mb-4">
                    Caffeine reduces deep sleep (slow-wave sleep), the most restorative stage. Even if you fall asleep, the quality of that sleep is compromised, leaving you feeling less refreshed.
                  </p>
                </div>
              ),
            },
            {
              id: 'awakenings',
              label: 'Increases Nighttime Awakenings',
              content: (
                <div>
                  <p className="mb-4">
                    Caffeine increases the number of times you wake up during the night, fragmenting sleep and preventing you from completing full sleep cycles.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="genetic-variation" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Some People Are More Sensitive to Caffeine
        </h2>
        <p className="mb-6">
          Caffeine sensitivity varies widely due to genetic differences in how quickly your liver metabolizes caffeine <Citation id="6" index={6} source="Pharmacological Reviews" year="2019" tier={1} />.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Fast metabolizers:</strong> Break down caffeine quickly (half-life ~2-3 hours). They can often drink coffee in the afternoon with minimal sleep disruption.</li>
          <li><strong>Slow metabolizers:</strong> Break down caffeine slowly (half-life ~7-9 hours). For them, a noon coffee might still interfere with sleep at 11 PM.</li>
        </ul>
        <p className="mb-6">
          Age also matters: older adults metabolize caffeine more slowly, making them more vulnerable to its sleep-disrupting effects.
        </p>

        <ComparisonTable
          title="Caffeine Content in Common Beverages"
          columns={['Beverage', 'Serving Size', 'Caffeine (mg)']}
          items={[
            { feature: 'Brewed coffee', values: ['8 oz', '80-100'] },
            { feature: 'Espresso', values: ['1 oz', '60-80'] },
            { feature: 'Black tea', values: ['8 oz', '40-70'] },
            { feature: 'Green tea', values: ['8 oz', '20-45'] },
            { feature: 'Energy drink', values: ['8 oz', '70-150'] },
            { feature: 'Soda (caffeinated)', values: ['12 oz', '30-55'] },
            { feature: 'Dark chocolate', values: ['1 oz', '12-25'] },
          ]}
        />

        <h2 id="alcohol-basics" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Alcohol: The Sleep Disruptor Disguised as a Sedative
        </h2>
        <p className="mb-6">
          Many people use alcohol as a "nightcap" to help them fall asleep. And it does work—initially. Alcohol acts as a sedative, reducing the time it takes to fall asleep. But the quality of that sleep is profoundly disrupted <Citation id="2" index={2} source="Sleep Medicine Reviews" year="2020" tier={1} />.
        </p>

        <h2 id="alcohol-sleep-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Alcohol Disrupts Sleep
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Suppresses REM Sleep',
              description: (
                <p>
                  Alcohol dramatically reduces REM sleep in the first half of the night. REM is critical for emotional regulation and memory consolidation, so missing it leaves you feeling mentally foggy and emotionally reactive the next day.
                </p>
              ),
            },
            {
              title: 'Causes REM Rebound',
              description: (
                <p>
                  In the second half of the night, as alcohol is metabolized, the brain attempts to 'catch up' on missed REM. This REM rebound often includes vivid, disturbing dreams and frequent awakenings <Citation id="4" index={4} source="Alcoholism: Clinical and Experimental Research" year="2019" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Increases Nighttime Awakenings',
              description: (
                <p>
                  Alcohol disrupts the normal sleep cycle, causing you to wake up multiple times during the night—even if you don't remember it. This fragmentation prevents restorative deep sleep.
                </p>
              ),
            },
            {
              title: 'Worsens Sleep Apnea and Snoring',
              description: (
                <p>
                  Alcohol relaxes the muscles in the throat, making airway obstruction more likely. People with sleep apnea should avoid alcohol, especially before bed.
                </p>
              ),
            },
            {
              title: 'Disrupts Circadian Rhythms',
              description: (
                <p>
                  Chronic alcohol use can desynchronize your circadian rhythm, making it harder to maintain a consistent sleep-wake schedule.
                </p>
              ),
            },
          ]}
        />

        <QuoteBlock
          quote="Alcohol is one of the most misunderstood sleep aids. It may help you fall asleep, but it guarantees you won't sleep well. The second half of the night is fragmented, dream-heavy, and unrestorative."
          attribution="Dr. Matthew Walker"
          role="Sleep Scientist"
          source="Why We Sleep, 2017"
        />

        <h2 id="dose-dependency" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Dose Matters
        </h2>
        <p className="mb-6">
          The more alcohol you consume, the worse the sleep disruption. Even moderate drinking (1-2 drinks) reduces REM sleep and increases fragmentation. Heavy drinking (4+ drinks) can eliminate REM almost entirely in the first half of the night and cause severe sleep fragmentation.
        </p>

        <ArticleChart
          type="bar"
          title="REM Sleep Suppression by Alcohol Dose"
          data={[
            { label: 'No alcohol', value: 100 },
            { label: '1 drink', value: 85 },
            { label: '2 drinks', value: 70 },
            { label: '3+ drinks', value: 50 },
          ]}
          source="Sleep Medicine Reviews, 2020"
        />

        <h2 id="timing-matters" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Timing Matters for Both Substances
        </h2>
        <p className="mb-6">
          <strong>Caffeine:</strong> Stop consuming caffeine at least 6 hours before bedtime. If you're a slow metabolizer or have insomnia, consider cutting off caffeine by noon.
        </p>
        <p className="mb-6">
          <strong>Alcohol:</strong> Stop drinking at least 3-4 hours before bed to allow your body time to metabolize it. This reduces (but doesn't eliminate) sleep disruption.
        </p>

        <ArticleCallout variant="tip">
          <p>
            If you drink alcohol in the evening, hydrate with water before bed. Dehydration worsens hangovers and can contribute to nighttime awakenings.
          </p>
        </ArticleCallout>

        <h2 id="other-substances" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Other Common Sleep-Disrupting Substances
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Nicotine:</strong> A stimulant that disrupts sleep onset and reduces sleep quality. Smokers are more likely to have insomnia and sleep apnea <Citation id="5" index={5} source="Sleep Medicine" year="2020" tier={1} />.</li>
          <li><strong>Cannabis:</strong> May help with sleep onset initially, but chronic use suppresses REM and can lead to tolerance and rebound insomnia when stopped.</li>
          <li><strong>Over-the-counter sleep aids (diphenhydramine, doxylamine):</strong> Can cause next-day grogginess, cognitive impairment, and tolerance. Not recommended for long-term use.</li>
          <li><strong>Prescription medications:</strong> Many medications (e.g., corticosteroids, some antidepressants, decongestants) can interfere with sleep. Always discuss sleep side effects with your healthcare provider.</li>
        </ul>

        <h2 id="breaking-dependence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Breaking the Caffeine-Alcohol Cycle
        </h2>
        <p className="mb-6">
          Many people fall into a vicious cycle: caffeine to wake up (because they slept poorly), alcohol to wind down (which disrupts sleep), repeat. Breaking this cycle requires addressing both substances.
        </p>

        <BeforeAfter
          before={{
            title: 'The Cycle',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Poor sleep → morning fatigue</li>
                <li>Multiple cups of coffee to compensate</li>
                <li>Caffeine still in system at bedtime</li>
                <li>Alcohol to "relax" and fall asleep</li>
                <li>Fragmented, unrestorative sleep</li>
                <li>Wake up tired, repeat</li>
              </ul>
            ),
          }}
          after={{
            title: 'Breaking Free',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Prioritize 7-9 hours of sleep</li>
                <li>Limit caffeine to morning only</li>
                <li>Gradually reduce caffeine intake if needed</li>
                <li>Avoid alcohol 3-4 hours before bed</li>
                <li>Use non-substance wind-down strategies</li>
                <li>Wake naturally rested, less need for stimulants</li>
              </ul>
            ),
          }}
        />

        <h2 id="practical-recommendations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practical Recommendations
        </h2>
        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'caffeine-cutoff',
              title: "What's the latest I should drink coffee?",
              content: (
                <p>
                  For most people, 2 PM is a safe cutoff. Slow metabolizers should stop by noon. If you have chronic insomnia, consider limiting caffeine to the first few hours after waking.
                </p>
              ),
            },
            {
              id: 'decaf-safe',
              title: 'Is decaf coffee safe before bed?',
              content: (
                <p>
                  Decaf still contains 2-5mg of caffeine per cup (compared to 80-100mg in regular coffee). For most people, this is negligible, but highly sensitive individuals may still notice effects.
                </p>
              ),
            },
            {
              id: 'alcohol-okay',
              title: 'Is any amount of alcohol okay before bed?',
              content: (
                <p>
                  Even small amounts disrupt sleep quality. If you choose to drink, finish 3-4 hours before bed and limit to 1 drink. But for optimal sleep, avoiding alcohol altogether is best.
                </p>
              ),
            },
            {
              id: 'withdrawal',
              title: 'Will I have withdrawal if I cut caffeine?',
              content: (
                <p>
                  Yes, if you're a heavy user (3+ cups/day). Symptoms include headache, fatigue, irritability, and difficulty concentrating, lasting 2-9 days. Taper gradually (reduce by 25% every few days) to minimize withdrawal.
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
            <li><strong>Caffeine delays sleep onset</strong>, reduces deep sleep, and stays in your system for 5-6 hours (longer in slow metabolizers).</li>
            <li><strong>Alcohol helps you fall asleep</strong> but fragments sleep, suppresses REM, and causes early morning awakenings.</li>
            <li><strong>Timing is critical</strong>: stop caffeine 6+ hours before bed, alcohol 3-4 hours before bed.</li>
            <li><strong>The caffeine-alcohol cycle</strong> perpetuates poor sleep—breaking it requires addressing both substances.</li>
            <li><strong>Genetic variation matters</strong>: some people metabolize caffeine much slower than others.</li>
            <li><strong>For optimal sleep</strong>, limit caffeine to the morning and minimize or eliminate alcohol in the evening.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(10),
    slug: 'weekend-sleep-catch-up-myth-sleeping-in-help',
    title: 'The Weekend Sleep Catch-Up Myth: Does Sleeping In Actually Help?',
    description: 'Can you "bank" sleep on weekends to compensate for weekday deprivation? The research reveals why catch-up sleep is more complicated than it seems.',
    image: "/images/articles/cat09/cover-010.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Sleep Debt', 'Weekend Sleep', 'Recovery Sleep', 'Circadian Rhythm'],
    citations: [
      {
        id: '1',
        text: 'Weekend recovery sleep and health outcomes',
        source: 'Sleep',
        year: '2021',
        link: 'https://doi.org/10.1093/sleep/zsab051',
        tier: 1,
      },
      {
        id: '2',
        text: 'Sleep debt: theoretical and empirical issues',
        source: 'Sleep Medicine Reviews',
        year: '2020',
        link: 'https://doi.org/10.1016/j.smrv.2020.101276',
        tier: 1,
      },
      {
        id: '3',
        text: 'Social jetlag and metabolic health',
        source: 'Current Diabetes Reports',
        year: '2020',
        link: 'https://doi.org/10.1007/s11892-020-01334-w',
        tier: 1,
      },
      {
        id: '4',
        text: 'Effects of sleep restriction and recovery',
        source: 'Journal of Clinical Sleep Medicine',
        year: '2019',
        link: 'https://doi.org/10.5664/jcsm.7678',
        tier: 1,
      },
      {
        id: '5',
        text: 'Weekend catch-up sleep and cardiovascular health',
        source: 'Sleep Health',
        year: '2020',
        link: 'https://doi.org/10.1016/j.sleh.2020.03.004',
        tier: 1,
      },
      {
        id: '6',
        text: 'Circadian misalignment and weekend sleep',
        source: 'Chronobiology International',
        year: '2021',
        link: 'https://doi.org/10.1080/07420528.2021.1889579',
        tier: 1,
      },
      {
        id: '7',
        text: 'Sleep consistency and health',
        source: 'Sleep Medicine',
        year: '2020',
        link: 'https://doi.org/10.1016/j.sleep.2020.05.027',
        tier: 1,
      },
      {
        id: '8',
        text: 'Sleep deprivation and recovery',
        source: 'National Heart, Lung, and Blood Institute',
        year: '2022',
        link: 'https://www.nhlbi.nih.gov/health/sleep-deprivation',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            It's a familiar pattern: skimp on sleep all week to meet deadlines, then sleep until noon on Saturday to "catch up." It feels restorative in the moment—but does it actually erase the effects of weekday sleep deprivation?
          </p>
          <p className="mb-6">
            The short answer: partially, but not completely <Citation id="1" index={1} source="Sleep" year="2021" tier={1} />. Weekend recovery sleep can mitigate some consequences of chronic sleep restriction, but it also creates new problems—particularly circadian misalignment, known as "social jet lag."
          </p>
        </div>

        <h2 id="sleep-debt-explained" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Sleep Debt?
        </h2>
        <p className="mb-6">
          Sleep debt is the cumulative difference between the sleep you need and the sleep you actually get <Citation id="2" index={2} source="Sleep Medicine Reviews" year="2020" tier={1} />. If you need 8 hours but only get 6, you accumulate a 2-hour sleep debt each night. Over a work week, that's 10 hours of lost sleep.
        </p>
        <p className="mb-6">
          Unlike financial debt, sleep debt doesn't have a clear "payoff" timeline. You can't simply sleep 10 extra hours on Saturday and be fully recovered. The effects of chronic sleep restriction—impaired cognition, emotional dysregulation, metabolic changes—linger even after extended recovery sleep.
        </p>

        <ArticleCallout variant="did-you-know">
          <p>
            After just one week of sleeping 6 hours per night, your cognitive performance is equivalent to staying awake for 24 hours straight <Citation id="8" index={8} source="National Heart, Lung, and Blood Institute" year="2022" tier={2} />—yet most people don't feel that impaired. Sleep debt accumulates silently.
          </p>
        </ArticleCallout>

        <h2 id="what-research-shows" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What the Research Shows About Weekend Catch-Up Sleep
        </h2>
        <p className="mb-6">
          Studies on weekend recovery sleep yield mixed results, suggesting that catch-up sleep provides partial but incomplete recovery.
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'benefits',
              label: 'Potential Benefits',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Cognitive function:</strong> Extra sleep on weekends can partially restore attention, reaction time, and memory performance that declined during the week.
                  </p>
                  <p className="mb-4">
                    <strong>Mood improvement:</strong> Recovery sleep reduces irritability and emotional reactivity.
                  </p>
                  <p>
                    <strong>Some metabolic recovery:</strong> Studies show glucose metabolism and insulin sensitivity improve with catch-up sleep, though not to baseline levels <Citation id="5" index={5} source="Sleep Health" year="2020" tier={1} />.
                  </p>
                </div>
              ),
            },
            {
              id: 'limitations',
              label: 'Limitations',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Incomplete recovery:</strong> Even two full nights of recovery sleep don't fully reverse the effects of a week of sleep restriction <Citation id="4" index={4} source="Journal of Clinical Sleep Medicine" year="2019" tier={1} />.
                  </p>
                  <p className="mb-4">
                    <strong>Circadian disruption:</strong> Sleeping in by 2+ hours on weekends shifts your circadian rhythm later, creating "social jet lag" (see below).
                  </p>
                  <p>
                    <strong>Short-lived benefit:</strong> Gains from weekend recovery sleep disappear quickly once the weekday pattern resumes. You're back in debt by Tuesday.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="social-jetlag" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Problem: Social Jet Lag
        </h2>
        <p className="mb-6">
          Social jet lag occurs when your sleep schedule on work days is misaligned with your sleep schedule on free days <Citation id="3" index={3} source="Current Diabetes Reports" year="2020" tier={1} />. It's called "social" jet lag because it's driven by societal demands (work, school) rather than travel.
        </p>
        <p className="mb-6">
          <strong>Example:</strong> You wake at 6 AM on weekdays but sleep until 10 AM on weekends. Your body experiences a 4-hour time shift—equivalent to flying from New York to California every weekend and back on Monday.
        </p>

        <ComparisonTable
          title="Weekday vs. Weekend Sleep Pattern"
          columns={['Metric', 'Weekday Schedule', 'Weekend Schedule', 'Social Jet Lag']}
          items={[
            { feature: 'Bedtime', values: ['11 PM', '1 AM', '2 hours later'] },
            { feature: 'Wake time', values: ['6 AM', '10 AM', '4 hours later'] },
            { feature: 'Total sleep', values: ['7 hours', '9 hours', '2 hours more'] },
            { feature: 'Circadian midpoint', values: ['3:30 AM', '5:30 AM', '2-hour shift'] },
          ]}
        />

        <h2 id="health-consequences" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Health Consequences of Social Jet Lag
        </h2>
        <p className="mb-6">
          Social jet lag is associated with numerous negative health outcomes <Citation id="6" index={6} source="Chronobiology International" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Metabolic problems:</strong> Increased risk of obesity, insulin resistance, and type 2 diabetes</li>
          <li><strong>Cardiovascular issues:</strong> Higher blood pressure and increased cardiovascular disease risk</li>
          <li><strong>Mood disorders:</strong> Greater prevalence of depression and anxiety</li>
          <li><strong>Cognitive impairment:</strong> Reduced attention, memory, and executive function</li>
          <li><strong>Poor academic/work performance:</strong> Lower grades in students, reduced productivity in adults</li>
        </ul>

        <ArticleChart
          type="bar"
          title="Prevalence of Social Jet Lag by Age Group"
          data={[
            { label: 'Teens (14-17)', value: 75 },
            { label: 'Young Adults (18-25)', value: 68 },
            { label: 'Adults (26-45)', value: 52 },
            { label: 'Adults (46-65)', value: 35 },
            { label: 'Older Adults (65+)', value: 18 },
          ]}
          source="Chronobiology International, 2021"
        />

        <h2 id="why-consistency-matters" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Sleep Consistency Matters More Than Total Sleep Time
        </h2>
        <p className="mb-6">
          Research increasingly shows that <strong>consistency</strong> in sleep timing is as important—if not more so—than total sleep duration <Citation id="7" index={7} source="Sleep Medicine" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          People who maintain consistent sleep-wake times (even on weekends) have:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Better mood and emotional regulation</li>
          <li>Higher energy levels throughout the day</li>
          <li>More stable metabolic markers (glucose, insulin, cortisol)</li>
          <li>Lower rates of cardiovascular disease</li>
          <li>Better cognitive performance</li>
        </ul>

        <QuoteBlock
          quote="Your body doesn't care about weekdays and weekends. It cares about consistent signals. When you sleep in on Saturday, you're telling your brain it's a different time zone—and come Monday, you're jet-lagged."
          attribution="Dr. Till Roenneberg"
          role="Chronobiologist"
          source="University of Munich, 2020"
        />

        <h2 id="what-to-do" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          So What Should You Do?
        </h2>
        <p className="mb-6">
          The ideal solution is to <strong>get adequate sleep every night</strong>—7-9 hours, at consistent times, seven days a week. But for many people, this isn't realistic due to work, caregiving, or other obligations.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Prioritize Weekday Sleep First',
              description: (
                <p>
                  If you're consistently getting less than 7 hours on weekdays, identify what's preventing adequate sleep. Late bedtime? Early obligations? Address the root cause rather than relying on weekend recovery.
                </p>
              ),
            },
            {
              title: 'Limit Weekend Sleep Extension',
              description: (
                <p>
                  If you must catch up, limit sleep-in time to <strong>1 hour max</strong> beyond your weekday wake time. This allows some recovery without severe circadian disruption. For example, if you wake at 6 AM on weekdays, don't sleep past 7 AM on weekends.
                </p>
              ),
            },
            {
              title: 'Use Strategic Napping',
              description: (
                <p>
                  Instead of sleeping in, wake at your normal time and take a 20-30 minute nap in the early afternoon. This provides recovery without shifting your circadian rhythm.
                </p>
              ),
            },
            {
              title: 'Gradually Increase Weeknight Sleep',
              description: (
                <p>
                  Add 15-30 minutes to your weeknight sleep by going to bed earlier. Even small increases—6.5 hours instead of 6, for example—reduce the need for weekend catch-up.
                </p>
              ),
            },
            {
              title: "Accept That Perfect Isn't Possible",
              description: (
                <p>
                  If life circumstances make 7+ hours on weeknights impossible, weekend recovery sleep is better than nothing. Just be aware of the trade-offs and minimize circadian disruption where you can.
                </p>
              ),
            },
          ]}
        />

        <h2 id="special-cases" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Special Cases: Shift Workers and Parents
        </h2>
        <p className="mb-6">
          <strong>Shift workers:</strong> If your work schedule rotates or includes night shifts, weekend recovery sleep can help mitigate chronic sleep deprivation. However, maintaining a consistent sleep schedule on your days off (even if it's shifted relative to typical hours) is still preferable to drastically changing sleep times.
        </p>
        <p className="mb-6">
          <strong>Parents of young children:</strong> Sleep disruption is often unavoidable in the early years. If weekends offer the first opportunity for uninterrupted sleep, take it—but try to wake within 2 hours of your weekday wake time to minimize social jet lag.
        </p>

        <BeforeAfter
          before={{
            title: 'High Social Jet Lag Pattern',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Mon-Fri: 6 AM wake, 11 PM bed (7 hrs)</li>
                <li>Sat-Sun: 10 AM wake, 1 AM bed (9 hrs)</li>
                <li>4-hour weekend shift in wake time</li>
                <li>2-hour shift in bedtime</li>
                <li>Monday: severe fatigue, poor focus</li>
                <li>Chronic circadian misalignment</li>
              </ul>
            ),
          }}
          after={{
            title: 'Low Social Jet Lag Pattern',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Mon-Fri: 6 AM wake, 10:30 PM bed (7.5 hrs)</li>
                <li>Sat-Sun: 7 AM wake, 11 PM bed (8 hrs)</li>
                <li>1-hour weekend shift in wake time</li>
                <li>30-min shift in bedtime</li>
                <li>Monday: refreshed, mentally clear</li>
                <li>Stable circadian rhythm</li>
              </ul>
            ),
          }}
        />

        <h2 id="when-recovery-helps" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Does Recovery Sleep Actually Help?
        </h2>
        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'acute-deprivation',
              title: 'After acute sleep deprivation (1-2 nights)',
              content: (
                <p>
                  If you had one or two bad nights (illness, travel, deadline), recovery sleep is highly effective. One or two nights of extended sleep can restore most cognitive and physiological functions.
                </p>
              ),
            },
            {
              id: 'chronic-mild',
              title: 'For mild chronic restriction (6-6.5 hrs consistently)',
              content: (
                <p>
                  Weekend recovery provides partial benefit—enough to reduce some metabolic and mood consequences, but not enough to fully compensate.
                </p>
              ),
            },
            {
              id: 'severe-restriction',
              title: 'After severe chronic restriction (5 hrs or less)',
              content: (
                <p>
                  Weekend recovery is minimally effective. The damage from severe, prolonged sleep loss takes weeks of consistent adequate sleep to reverse.
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
            <li><strong>Weekend catch-up sleep provides partial recovery</strong> from weekday sleep debt, but it's not a full solution.</li>
            <li><strong>Social jet lag</strong>—the circadian misalignment from drastically different weekend sleep schedules—creates its own health problems.</li>
            <li><strong>Sleep consistency matters</strong> as much as total sleep time for long-term health.</li>
            <li><strong>Limit sleep-in time to 1 hour max</strong> to balance recovery with circadian stability.</li>
            <li><strong>Prioritize weeknight sleep first</strong>—addressing the root cause is better than compensating on weekends.</li>
            <li><strong>If weekends are your only recovery opportunity</strong>, take it—but be aware of the trade-offs.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
];
