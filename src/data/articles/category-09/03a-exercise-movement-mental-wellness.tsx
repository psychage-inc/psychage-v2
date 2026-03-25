/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SLEEP_BODY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  QuoteBlock,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

export const exerciseMovementMentalWellnessArticlesA: Article[] = [
  {
    id: catId(21),
    slug: 'exercise-mental-health-effective-as-medications',
    title: 'Exercise and Mental Health: Why Movement Is as Effective as Some Medications',
    description: 'Regular physical activity rivals antidepressants in effectiveness for mild-moderate depression and reduces anxiety as much as therapy.',
    image: "/images/articles/cat09/cover-021.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Exercise', 'Mental Health', 'Depression', 'Evidence-Based'],
    citations: [
      { id: '1', text: 'Exercise for depression', source: 'Cochrane Database of Systematic Reviews', year: '2013', link: 'https://doi.org/10.1002/14651858.CD004366.pub6', tier: 1 },
      { id: '2', text: 'Physical activity and anxiety', source: 'Depression and Anxiety', year: '2020', link: 'https://doi.org/10.1002/da.22965', tier: 1 },
      { id: '3', text: 'Exercise as treatment for depression', source: 'JAMA Psychiatry', year: '2019', link: 'https://doi.org/10.1001/jamapsychiatry.2018.4175', tier: 1 },
      { id: '4', text: 'Dose-response relationship', source: 'American Journal of Psychiatry', year: '2018', link: 'https://doi.org/10.1176/appi.ajp.2018.17111194', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            If exercise came in pill form, it would be the most widely prescribed medication for mental health. Research shows that regular physical activity is as effective as antidepressants for treating mild-to-moderate depression—and it works for anxiety, too <Citation id="1" index={1} source="Cochrane Database of Systematic Reviews" year="2013" tier={1} />.
          </p>
          <p className="mb-6">
            Movement isn't just good for your body—it fundamentally changes your brain, improving mood, reducing stress, enhancing cognition, and building resilience. Understanding how and why exercise works can motivate you to make movement a core part of your mental health toolkit.
          </p>
        </div>

        <StatCard stats={[{value: 30, suffix: '%', label: 'Reduction in depression risk with regular exercise'}, {value: 43, suffix: '%', label: 'Reduction in anxiety symptoms'}, {value: 150, suffix: ' min/wk', label: 'WHO-recommended moderate activity for adults'}]} source="JAMA Psychiatry, 2019; WHO, 2020" />

        <h2 id="depression-evidence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Evidence for Depression</h2>
        <p className="mb-6">Meta-analyses consistently show exercise reduces depressive symptoms with effect sizes comparable to psychotherapy and medication <Citation id="3" index={3} source="JAMA Psychiatry" year="2019" tier={1} />. It works for mild, moderate, and—when combined with other treatments—severe depression.</p>
        <p className="mb-6"><strong>Dose matters:</strong> More is better, but even modest amounts help. One study found that just 1 hour per week of any exercise reduced depression risk by 12% <Citation id="4" index={4} source="American Journal of Psychiatry" year="2018" tier={1} />.</p>

        <h2 id="anxiety-evidence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Evidence for Anxiety</h2>
        <p className="mb-6">Exercise reduces symptoms of generalized anxiety, panic disorder, social anxiety, and PTSD <Citation id="2" index={2} source="Depression and Anxiety" year="2020" tier={1} />. Both aerobic exercise (running, cycling) and resistance training (weightlifting) are effective.</p>

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>Exercise is as effective as antidepressants</strong> for mild-moderate depression.</li><li><strong>Anxiety symptoms decrease 30-50%</strong> with regular physical activity.</li><li><strong>Benefits appear within 2-4 weeks</strong> of consistent exercise.</li><li><strong>Any amount helps</strong>—even 1 hour/week reduces depression risk.</li></ul></ArticleCallout>
      </>
    ),
  },

  {
    id: catId(22),
    slug: 'exercise-changes-brain-neuroplasticity-bdnf-mood',
    title: 'How Exercise Changes Your Brain: Neuroplasticity, BDNF, and Mood',
    description: 'Exercise triggers cascades of neurochemical changes—boosting BDNF, growing new neurons, and rewiring circuits involved in mood and stress.',
    image: "/images/articles/cat09/cover-022.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Neuroscience', 'BDNF', 'Neuroplasticity', 'Exercise'],
    citations: [
      { id: '1', text: 'Exercise and brain plasticity', source: 'Nature Reviews Neuroscience', year: '2019', link: 'https://doi.org/10.1038/s41583-019-0152-2', tier: 1 },
      { id: '2', text: 'BDNF and exercise', source: 'Trends in Neurosciences', year: '2020', link: 'https://doi.org/10.1016/j.tins.2020.01.003', tier: 1 },
      { id: '3', text: 'Hippocampal neurogenesis from exercise', source: 'Cell Metabolism', year: '2019', link: 'https://doi.org/10.1016/j.cmet.2019.05.011', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Exercise doesn't just make you feel better temporarily—it changes your brain's structure and function. Movement triggers the release of brain-derived neurotrophic factor (BDNF), grows new neurons, and strengthens neural networks involved in mood regulation.
          </p>
        </div>

        <h2 id="bdnf" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">BDNF: The Brain's Miracle-Gro</h2>
        <p className="mb-6">BDNF is a protein that supports neuron survival, growth, and differentiation. Exercise dramatically increases BDNF levels <Citation id="2" index={2} source="Trends in Neurosciences" year="2020" tier={2} />. Low BDNF is implicated in depression—antidepressants work partly by increasing BDNF. Exercise does the same thing, naturally.</p>

        <h2 id="neurogenesis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Adult Neurogenesis</h2>
        <p className="mb-6">For decades, scientists believed adults couldn't grow new brain cells. We now know aerobic exercise stimulates neurogenesis in the hippocampus—critical for learning, memory, and mood <Citation id="3" index={3} source="Cell Metabolism" year="2019" tier={1} />.</p>

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>Exercise boosts BDNF</strong>, supporting neuron health and growth.</li><li><strong>New neurons form in the hippocampus</strong> from regular aerobic activity.</li><li><strong>Brain plasticity increases</strong>, making it easier to learn and adapt.</li></ul></ArticleCallout>
      </>
    ),
  },

  {
    id: catId(23),
    slug: 'best-exercise-types-anxiety-research-recommends',
    title: 'The Best Types of Exercise for Anxiety: What the Research Recommends',
    description: 'Aerobic exercise, strength training, and yoga all reduce anxiety—but they work through different mechanisms. Learn which approach suits you best.',
    image: "/images/articles/cat09/cover-023.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anxiety', 'Exercise', 'Aerobic', 'Strength Training'],
    citations: [
      { id: '1', text: 'Exercise modality and anxiety reduction', source: 'Journal of Anxiety Disorders', year: '2021', link: 'https://doi.org/10.1016/j.janxdis.2021.102389', tier: 1 },
      { id: '2', text: 'Resistance training for anxiety', source: 'Sports Medicine', year: '2020', link: 'https://doi.org/10.1007/s40279-020-01323-8', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            All exercise helps anxiety, but different types work through distinct mechanisms. Aerobic exercise burns off stress hormones, strength training builds confidence, and yoga combines movement with mindfulness.
          </p>
        </div>

        <h2 id="aerobic" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Aerobic Exercise: Burning Off Anxiety</h2>
        <p className="mb-6">Running, cycling, swimming—anything that elevates heart rate for sustained periods—reduces anxiety by lowering cortisol, increasing endorphins, and promoting post-exercise relaxation <Citation id="1" index={1} source="Journal of Anxiety Disorders" year="2021" tier={1} />.</p>
        <p className="mb-6"><strong>Recommended dose:</strong> 20-30 minutes, moderate intensity, 3-5x/week.</p>

        <h2 id="strength" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Strength Training: Building Resilience</h2>
        <p className="mb-6">Lifting weights reduces anxiety as much as aerobic exercise <Citation id="2" index={2} source="Sports Medicine" year="2020" tier={2} />. Benefits include mastery experiences (confidence from getting stronger) and neurochemical changes.</p>

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>Both aerobic and strength training work</strong> for anxiety reduction.</li><li><strong>Consistency matters more than intensity</strong>—moderate, regular exercise beats intense, sporadic workouts.</li><li><strong>Choose what you enjoy</strong>—adherence is key to long-term benefits.</li></ul></ArticleCallout>
      </>
    ),
  },

  {
    id: catId(24),
    slug: 'best-exercise-types-depression-movement-lifts-mood',
    title: 'The Best Types of Exercise for Depression: How Movement Lifts Mood',
    description: 'Aerobic exercise, strength training, and even walking reduce depressive symptoms. Learn optimal intensity, frequency, and how to start when motivation is low.',
    image: "/images/articles/cat09/cover-024.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Depression', 'Exercise', 'Treatment', 'Self-Help'],
    citations: [
      { id: '1', text: 'Exercise intensity and depression', source: 'BMJ', year: '2019', link: 'https://doi.org/10.1136/bmj.l1428', tier: 1 },
      { id: '2', text: 'Resistance exercise and depression', source: 'JAMA Psychiatry', year: '2018', link: 'https://doi.org/10.1001/jamapsychiatry.2018.0572', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When you're depressed, movement feels impossible. But exercise is one of the most effective non-pharmaceutical interventions for depression—and it works regardless of intensity.
          </p>
        </div>

        <h2 id="what-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What Works Best</h2>
        <ComparisonTable title="Exercise Types for Depression" columns={['Type', 'Evidence', 'Accessibility']} items={[{feature: 'Aerobic (running, cycling)', values: ['Strong evidence', 'Moderate (requires no equipment)']}, {feature: 'Strength training', values: ['Strong evidence', 'Low (requires gym/weights)']}, {feature: 'Walking', values: ['Moderate-strong evidence', 'Very high (anyone, anywhere)']}, {feature: 'Yoga', values: ['Moderate evidence', 'High (classes or home practice)']}]} />

        <h2 id="starting-low" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Starting When Motivation Is Low</h2>
        <ProgressSteps variant="vertical" steps={[{title: 'Start Small', description: <p>5-10 minutes counts. Even a walk around the block initiates neurochemical changes.</p>}, {title: 'Schedule It', description: <p>Treat it like a prescription. Same time daily removes decision fatigue.</p>}, {title: 'Lower the Bar', description: <p>Goal: move, not "work out." Any movement {'>'} no movement.</p>}]} />

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>All exercise types help depression</strong>—aerobic, strength, even gentle walking.</li><li><strong>Intensity doesn't determine effectiveness</strong>—moderate exercise works as well as vigorous <Citation id="1" index={1} source="BMJ" year="2019" tier={1} />.</li><li><strong>Consistency beats intensity</strong>—3x/week moderate is better than 1x/week intense.</li></ul></ArticleCallout>
      </>
    ),
  },

  {
    id: catId(25),
    slug: 'walking-mental-health-simplest-exercise-strongest-evidence',
    title: 'Walking for Mental Health: The Simplest Exercise with the Strongest Evidence',
    description: 'Walking is free, accessible, and backed by decades of research. Even 10 minutes improves mood, and regular walks rival antidepressants for mild depression.',
    image: "/images/articles/cat09/cover-025.svg",
    category: CATEGORY_SLEEP_BODY,
    readTime: 5,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Walking', 'Exercise', 'Mental Health', 'Accessibility'],
    citations: [
      { id: '1', text: 'Walking and depression prevention', source: 'American Journal of Preventive Medicine', year: '2020', link: 'https://doi.org/10.1016/j.amepre.2020.03.004', tier: 1 },
      { id: '2', text: 'Nature walks and mental health', source: 'Environmental Science & Technology', year: '2019', link: 'https://doi.org/10.1021/acs.est.9b01012', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You don't need a gym membership, special equipment, or athletic ability. Walking—the most accessible form of exercise—has robust evidence for improving mental health.
          </p>
        </div>

        <h2 id="evidence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Evidence</h2>
        <p className="mb-6">Studies show walking 30 minutes/day, 5 days/week reduces depression risk by 26% <Citation id="1" index={1} source="American Journal of Preventive Medicine" year="2020" tier={1} />. Even shorter walks (10-15 min) improve mood immediately.</p>
        <p className="mb-6"><strong>Nature walks amplify benefits:</strong> Walking in green spaces reduces rumination and anxiety more than urban walking <Citation id="2" index={2} source="Environmental Science & Technology" year="2019" tier={2} />.</p>

        <h2 id="how-to-start" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">How to Start</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2"><li><strong>Start with 10 minutes</strong>—build gradually</li><li><strong>Walk at a pace where you can talk</strong> but feel slightly challenged</li><li><strong>Make it a habit</strong>—same time daily</li><li><strong>Vary routes</strong> to maintain interest</li></ul>

        <ArticleCallout variant="key-takeaway"><ul className="list-disc pl-5 space-y-2"><li><strong>30 min/day, 5 days/week reduces depression risk by 26%</strong>.</li><li><strong>Even 10 minutes improves mood</strong> immediately.</li><li><strong>Nature walks are more beneficial</strong> than urban walks.</li><li><strong>No special equipment needed</strong>—most accessible exercise.</li></ul></ArticleCallout>
      </>
    ),
  },
];
