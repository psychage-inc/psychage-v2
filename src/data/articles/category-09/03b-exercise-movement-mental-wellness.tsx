/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SLEEP_BODY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  QuoteBlock,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

export const exerciseMovementMentalWellnessArticlesB: Article[] = [
  {
    id: catId(26),
    slug: 'yoga-mental-health-science-supports-what-doesnt',
    title: "Yoga and Mental Health: What the Science Supports (And What It Doesn't)",
    description: "Yoga reduces anxiety and depression---but the research is more nuanced than wellness culture suggests. Learn what evidence supports and what remains unproven.",
    image: "/images/articles/cat09/cover-026.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Yoga', 'Mind-Body', 'Evidence-Based', 'Mental Health'],
    citations: [
      { id: '1', text: 'Yoga for anxiety: a systematic review', source: 'Depression and Anxiety', year: '2020', link: 'https://doi.org/10.1002/da.22967', tier: 1 },
      { id: '2', text: 'Yoga and depression', source: 'British Journal of Sports Medicine', year: '2019', link: 'https://doi.org/10.1136/bjsports-2018-100406', tier: 1 },
      { id: '3', text: 'Mechanisms of yoga for mental health', source: 'Frontiers in Psychiatry', year: '2020', link: 'https://doi.org/10.3389/fpsyt.2020.00108', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Yoga is marketed as a cure-all for mental health. The truth is more modest---but still compelling. Research supports yoga for anxiety and depression, though it's not a replacement for evidence-based treatments in severe cases.
          </p>
        </div>

        <h2 id="what-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What the Science Supports</h2>
        <p className="mb-6"><strong>Anxiety:</strong> Moderate-quality evidence shows yoga reduces anxiety symptoms, particularly in people with diagnosed anxiety disorders <Citation id="1" index={1} source="Depression and Anxiety" year="2020" tier={1} />.</p>
        <p className="mb-6"><strong>Depression:</strong> Yoga reduces depressive symptoms with small-to-moderate effect sizes <Citation id="2" index={2} source="British Journal of Sports Medicine" year="2019" tier={1} />. Less effective than CBT or antidepressants alone, but helpful as an adjunct.</p>

        <h2 id="mechanisms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">How It Works</h2>
        <p className="mb-6">Yoga combines physical movement (which boosts mood like other exercise), breathwork (activates parasympathetic nervous system), and mindfulness (reduces rumination) <Citation id="3" index={3} source="Frontiers in Psychiatry" year="2020" tier={1} />.</p>

        <h2 id="limitations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Limitations and Hype</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2"><li>Most studies are small, with methodological limitations</li><li>Effects are modest compared to gold-standard treatments</li><li>Not a replacement for therapy or medication in moderate-severe cases</li><li>Many claims (detoxification, energy healing) lack scientific support</li></ul>

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>Yoga helps anxiety and depression</strong> with small-to-moderate effects.</li><li><strong>Combines movement, breathwork, and mindfulness</strong>---each contributes to benefits.</li><li><strong>Best as adjunct to therapy/medication</strong>, not standalone for severe symptoms.</li><li><strong>Evidence-based ≠ cure-all</strong>---reject exaggerated wellness claims.</li></ul></ArticleCallout>
      </>
    ),
  },

  {
    id: catId(27),
    slug: 'exercise-ptsd-physical-activity-helps-process-trauma',
    title: 'Exercise and PTSD: How Physical Activity Helps Process Trauma',
    description: 'Movement helps trauma survivors regulate arousal, reconnect with their bodies, and reduce PTSD symptoms. Learn which exercises help most.',
    image: "/images/articles/cat09/cover-027.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['PTSD', 'Trauma', 'Exercise', 'Body-Based Healing'],
    citations: [
      { id: '1', text: 'Exercise for PTSD: a systematic review', source: 'Journal of Traumatic Stress', year: '2020', link: 'https://doi.org/10.1002/jts.22480', tier: 1 },
      { id: '2', text: 'Aerobic exercise and PTSD symptoms', source: 'Depression and Anxiety', year: '2021', link: 'https://doi.org/10.1002/da.23124', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Trauma gets stored in the body---tense muscles, shallow breathing, hypervigilance. Exercise offers a way to discharge that stored energy, regulate the nervous system, and rebuild a sense of safety in your body.
          </p>
        </div>

        <h2 id="evidence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Evidence</h2>
        <p className="mb-6">Meta-analyses show exercise reduces PTSD symptom severity across all symptom clusters---intrusion, avoidance, negative cognitions, and hyperarousal <Citation id="1" index={1} source="Journal of Traumatic Stress" year="2020" tier={1} />.</p>
        <p className="mb-6"><strong>Aerobic exercise</strong> (running, cycling) shows strongest effects, particularly for hyperarousal symptoms <Citation id="2" index={2} source="Depression and Anxiety" year="2021" tier={1} />.</p>

        <h2 id="why-it-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Why Movement Helps Trauma</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2"><li><strong>Discharges hyperarousal:</strong> Burns off cortisol and adrenaline trapped in the body</li><li><strong>Rebuilds body connection:</strong> Trauma creates dissociation; movement restores embodiment</li><li><strong>Provides mastery experiences:</strong> Regaining physical strength counteracts trauma's helplessness</li><li><strong>Regulates nervous system:</strong> Aerobic exercise followed by rest trains parasympathetic activation</li></ul>

        <h2 id="starting-safely" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Starting Safely</h2>
        <ArticleCallout variant="tip"><p><strong>Go slow.</strong> Trauma survivors often push too hard, triggering dissociation or flashbacks. Start gently, stay present, and honor your body's signals.</p></ArticleCallout>

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>Exercise reduces PTSD symptoms</strong> across all symptom clusters.</li><li><strong>Aerobic exercise shows strongest effects</strong>, especially for hyperarousal.</li><li><strong>Movement helps discharge stored trauma</strong> and rebuild body trust.</li><li><strong>Start gently</strong>---avoid pushing past your window of tolerance.</li></ul></ArticleCallout>
      </>
    ),
  },

  {
    id: catId(28),
    slug: 'exercise-sleep-connection-movement-improves-rest',
    title: 'The Exercise-Sleep Connection: How Movement Improves Your Rest',
    description: 'Regular exercise improves sleep quality, reduces time to fall asleep, and increases deep sleep. Learn optimal timing and intensity for better rest.',
    image: "/images/articles/cat09/cover-028.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Exercise', 'Sleep Quality', 'Deep Sleep', 'Circadian Rhythm'],
    citations: [
      { id: '1', text: 'Exercise and sleep quality', source: 'Sleep Medicine Reviews', year: '2020', link: 'https://doi.org/10.1016/j.smrv.2020.101278', tier: 1 },
      { id: '2', text: 'Exercise timing and sleep', source: 'Sports Medicine', year: '2019', link: 'https://doi.org/10.1007/s40279-018-1015-0', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            People who exercise regularly fall asleep faster, sleep longer, and wake less during the night <Citation id="1" index={1} source="Sleep Medicine Reviews" year="2020" tier={1} />. Movement improves sleep through multiple pathways---regulating circadian rhythm, reducing anxiety, and increasing sleep pressure.
          </p>
        </div>

        <h2 id="benefits" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Sleep Benefits of Exercise</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2"><li>29% reduction in time to fall asleep</li><li>Increase in deep sleep (most restorative stage)</li><li>Fewer nighttime awakenings</li><li>Improved subjective sleep quality</li></ul>

        <h2 id="timing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Timing Matters</h2>
        <p className="mb-6">Morning or afternoon exercise strengthens circadian rhythm. Evening exercise doesn't disrupt sleep for most people---but finish vigorous workouts 2-3 hours before bed <Citation id="2" index={2} source="Sports Medicine" year="2019" tier={2} />.</p>

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>Exercise improves sleep quality</strong> and reduces time to fall asleep.</li><li><strong>Deep sleep increases</strong> with regular physical activity.</li><li><strong>Morning exercise anchors circadian rhythm</strong>.</li><li><strong>Evening exercise is fine</strong> if finished 2-3 hours before bed.</li></ul></ArticleCallout>
      </>
    ),
  },

  {
    id: catId(29),
    slug: 'over-exercising-mental-health-when-movement-becomes-harmful',
    title: 'Over-Exercising and Mental Health: When Movement Becomes Harmful',
    description: 'Compulsive exercise, overtraining, and exercise addiction damage physical and mental health. Learn the warning signs and when to pull back.',
    image: "/images/articles/cat09/cover-029.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Overtraining', 'Exercise Addiction', 'Compulsive Exercise', 'Body Image'],
    citations: [
      { id: '1', text: 'Overtraining syndrome', source: 'Sports Medicine', year: '2020', link: 'https://doi.org/10.1007/s40279-020-01368-9', tier: 1 },
      { id: '2', text: 'Compulsive exercise and eating disorders', source: 'International Journal of Eating Disorders', year: '2021', link: 'https://doi.org/10.1002/eat.23493', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Exercise improves mental health---until it doesn't. When movement becomes compulsive, driven by guilt or body image distress, it shifts from healing to harmful.
          </p>
        </div>

        <h2 id="warning-signs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Warning Signs</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2"><li>Exercising despite injury, illness, or exhaustion</li><li>Intense guilt or anxiety if you miss a workout</li><li>Exercise driven by body image distress, not enjoyment</li><li>Social isolation to prioritize exercise</li><li>Declining performance despite increased training</li></ul>

        <h2 id="overtraining-syndrome" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Overtraining Syndrome</h2>
        <p className="mb-6">Chronic exercise without adequate recovery leads to persistent fatigue, mood disturbance, decreased performance, and increased injury risk <Citation id="1" index={1} source="Sports Medicine" year="2020" tier={1} />. Mental health symptoms include irritability, depression, and loss of motivation.</p>

        <h2 id="eating-disorders" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Exercise and Eating Disorders</h2>
        <p className="mb-6">Compulsive exercise is common in eating disorders---used to compensate for eating, control weight, or manage anxiety <Citation id="2" index={2} source="International Journal of Eating Disorders" year="2021" tier={2} />. If exercise feels mandatory, not optional, seek professional evaluation.</p>

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>Compulsive exercise damages mental and physical health</strong>.</li><li><strong>Warning signs: exercising despite injury, guilt if you miss workouts, performance decline</strong>.</li><li><strong>Rest is part of training</strong>---recovery allows adaptation.</li><li><strong>If exercise feels mandatory, seek help</strong>---may signal underlying eating disorder or OCD.</li></ul></ArticleCallout>
      </>
    ),
  },

  {
    id: catId(30),
    slug: 'how-to-start-moving-when-depression-makes-everything-heavy',
    title: 'How to Start Moving When Depression Makes Everything Feel Heavy',
    description: 'Depression drains motivation and energy, making exercise feel impossible. Learn strategies to start small, build momentum, and overcome activation energy.',
    image: "/images/articles/cat09/cover-030.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Depression', 'Motivation', 'Exercise', 'Behavioral Activation'],
    citations: [
      { id: '1', text: 'Behavioral activation and exercise', source: 'Journal of Affective Disorders', year: '2020', link: 'https://doi.org/10.1016/j.jad.2020.02.017', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Depression tells you that moving is pointless, that you're too tired, that nothing will help. This is the depression talking---not reality. Movement helps depression, but getting started requires lowering the bar dramatically.
          </p>
        </div>

        <h2 id="activation-energy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Activation Energy Problem</h2>
        <p className="mb-6">Depression increases "activation energy"---the effort required to start any task. Exercise feels like climbing a mountain. The solution: make the first step so small it's almost impossible to say no.</p>

        <h2 id="strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Strategies That Work</h2>
        <ProgressSteps variant="vertical" steps={[{title: 'Start Absurdly Small', description: <p>Goal: put on shoes. Not "go for a run"---just put on shoes. Often, once shoes are on, you'll walk out the door. If not, that's okay. Shoes = success.</p>}, {title: 'Schedule It', description: <p>Don't rely on motivation. Schedule movement at the same time daily. Treat it like a medication dose.</p>}, {title: 'Lower the Bar', description: <p>5 minutes counts. One lap around the block counts. Anything {'>'} nothing.</p>}, {title: 'Use Behavioral Activation', description: <p>Depression says "wait until you feel motivated." Behavioral activation says "act first, motivation follows" <Citation id="1" index={1} source="Journal of Affective Disorders" year="2020" tier={1} />.</p>}]} />

        <BeforeAfter before={{title: 'Depression-Driven Thinking', content: <ul className="list-disc pl-5 space-y-2"><li>"I'm too tired to exercise"</li><li>"What's the point, it won't help"</li><li>"I should run 3 miles or it doesn't count"</li><li>"I'll start when I feel better"</li></ul>}} after={{title: 'Behavioral Activation Approach', content: <ul className="list-disc pl-5 space-y-2"><li>"I'll walk for 5 minutes, even though I'm tired"</li><li>"It might help, and I need any help I can get"</li><li>"5 minutes counts---it's better than nothing"</li><li>"I'll start now, even though I don't feel motivated"</li></ul>}} />

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>Start absurdly small</strong>---5 minutes, one block, just putting on shoes.</li><li><strong>Schedule it</strong>---don't wait for motivation.</li><li><strong>Action precedes motivation</strong>---you won't feel like it first. Move anyway.</li><li><strong>Any movement &gt; no movement</strong>---lower the bar until success is guaranteed.</li></ul></ArticleCallout>
      </>
    ),
  },
];
