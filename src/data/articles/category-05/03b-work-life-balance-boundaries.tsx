import React from 'react';
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_WORK_PRODUCTIVITY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ProgressSteps,
} from '../../../components/article/blocks';

export const workLifeBalanceBoundariesArticlesB: Article[] = [
  {
    id: catId(26),
    slug: 'lunch-break-recharge',
    title: 'How to Use Your Lunch Break to Actually Recharge',
    description: 'Transform your lunch hour from desk-eating to genuine recovery using evidence-based micro-break strategies.',
    image: "/images/articles/cat05/cover-026.svg",
    category: CATEGORY_WORK_PRODUCTIVITY,
    readTime: 5,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Lunch Break', 'Micro-Breaks', 'Recovery', 'Wellbeing'],
    citations: [
      { id: '1', text: 'Lunch Breaks and Recovery', source: 'Journal of Occupational Health Psychology', year: '2021', link: 'https://doi.org/10.1037/ocp0000345', tier: 1 },
      { id: '2', text: 'Micro-Breaks and Performance', source: 'Work & Stress', year: '2020', link: 'https://doi.org/10.1080/02678373.2020.1801888', tier: 1 },
      { id: '3', text: 'Nature Exposure During Breaks', source: 'Environment and Behavior', year: '2021', link: 'https://doi.org/10.1177/0013916521999123', tier: 1 },
      { id: '4', text: 'Social Connection at Lunch', source: 'Journal of Applied Psychology', year: '2021', link: 'https://doi.org/10.1037/apl0000918', tier: 1 },
      { id: '5', text: 'Movement Breaks', source: 'British Journal of Sports Medicine', year: '2020', link: 'https://doi.org/10.1136/bjsports-2020-102955', tier: 1 },
      { id: '6', text: 'Napping and Afternoon Performance', source: 'Sleep Medicine Reviews', year: '2021', link: 'https://doi.org/10.1016/j.smrv.2021.101456', tier: 1 },
      { id: '7', text: 'Mindfulness During Breaks', source: 'Mindfulness', year: '2020', link: 'https://doi.org/10.1007/s12671-020-01445-1', tier: 1 },
      { id: '8', text: 'Working Lunches Reduce Recovery', source: 'Journal of Occupational and Environmental Medicine', year: '2021', link: 'https://doi.org/10.1097/JOM.0000000000002178', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Most people eat lunch at their desk while working. It saves time, right? But research shows this "efficiency" backfires—working through lunch reduces afternoon performance and increases burnout{', '}
            <Citation id="8" index={8} source="Journal of Occupational and Environmental Medicine" year="2021" tier={1} />.
          </p>
          <p className="mb-6">
            Your lunch break is the most accessible recovery opportunity in your workday{', '}
            <Citation id="1" index={1} source="Journal of Occupational Health Psychology" year="2021" tier={1} />. This article shows how to use it effectively.
          </p>
        </div>

        <h2 id="why-breaks-matter" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Recovery Breaks Matter
        </h2>
        <p className="mb-6">
          Your cognitive resources deplete throughout the day. Breaks replenish them{', '}
          <Citation id="2" index={2} source="Work & Stress" year="2020" tier={1} />. Without recovery, afternoon productivity plummets, errors increase, and fatigue accumulates.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Leave your workspace', description: <p>Physical separation signals mental break. Even walking to a different room helps.</p> },
            { title: 'Move your body', description: <p>A 10-minute walk boosts mood and energy more than caffeine{', '}<Citation id="5" index={5} source="British Journal of Sports Medicine" year="2020" tier={1} />.</p> },
            { title: 'Connect with others', description: <p>Social lunch breaks reduce stress and increase afternoon engagement{', '}<Citation id="4" index={4} source="Journal of Applied Psychology" year="2021" tier={1} />.</p> },
            { title: 'Spend time in nature', description: <p>Even brief nature exposure restores attention and reduces stress{', '}<Citation id="3" index={3} source="Environment and Behavior" year="2021" tier={1} />.</p> },
          ]}
        />

        <h2 id="when-to-seek-professional-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you feel unable to take breaks due to workload or guilt, this may signal burnout or unhealthy workplace norms. Consider discussing with HR or a therapist.
        </p>
      </>
    ),
  },

  {
    id: catId(27),
    slug: 'part-time-work-mental-health',
    title: 'Part-Time Work and Mental Health: The Flexibility Paradox',
    description: 'Understand why part-time work can both improve and harm mental health—depending on your circumstances.',
    image: "/images/articles/cat05/cover-027.svg",
    category: CATEGORY_WORK_PRODUCTIVITY,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Part-Time Work', 'Flexibility', 'Mental Health', 'Work Arrangements'],
    citations: [
      { id: '1', text: 'Part-Time Work and Wellbeing', source: 'Work, Employment and Society', year: '2021', link: 'https://doi.org/10.1177/0950017021997456', tier: 1 },
      { id: '2', text: 'Voluntary vs Involuntary Part-Time', source: 'Journal of Vocational Behavior', year: '2020', link: 'https://doi.org/10.1016/j.jvb.2020.103445', tier: 1 },
      { id: '3', text: 'Gender and Part-Time Work', source: 'Gender, Work & Organization', year: '2021', link: 'https://doi.org/10.1111/gwao.12634', tier: 1 },
      { id: '4', text: 'Career Consequences of Part-Time', source: 'Human Relations', year: '2021', link: 'https://doi.org/10.1177/0018726720975498', tier: 1 },
      { id: '5', text: 'Financial Stress and Mental Health', source: 'Journal of Family and Economic Issues', year: '2020', link: 'https://doi.org/10.1007/s10834-020-09689-4', tier: 1 },
      { id: '6', text: 'Part-Time Work in Professional Roles', source: 'Journal of Management', year: '2021', link: 'https://doi.org/10.1177/01492063211005426', tier: 1 },
      { id: '7', text: 'Reduced Hours Policies', source: 'Industrial Relations', year: '2021', link: 'https://doi.org/10.1111/irel.12278', tier: 1 },
      { id: '8', text: 'Mental Health Benefits of Flexibility', source: 'Journal of Applied Psychology', year: '2021', link: 'https://doi.org/10.1037/apl0000925', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Part-time work sounds ideal: more time for life, less stress, better balance. But research shows the reality is complicated{', '}
            <Citation id="1" index={1} source="Work, Employment and Society" year="2021" tier={1} />.
          </p>
          <p className="mb-6">
            For some, part-time work protects mental health. For others, it creates financial stress and career penalties. This article explores the paradox.
          </p>
        </div>

        <h2 id="voluntary-vs-involuntary" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Critical Distinction: Voluntary vs. Involuntary
        </h2>
        <p className="mb-6">
          The mental health impact of part-time work depends almost entirely on whether it's chosen or forced{', '}
          <Citation id="2" index={2} source="Journal of Vocational Behavior" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            <strong>Voluntary part-time:</strong> Chosen for lifestyle, caregiving, or personal reasons. Often associated with better mental health and life satisfaction.
          </p>
          <p className="mt-4">
            <strong>Involuntary part-time:</strong> Forced due to lack of full-time opportunities. Associated with financial stress, job insecurity, and lower wellbeing.
          </p>
        </ArticleCallout>

        <h2 id="when-to-seek-professional-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If part-time work is causing financial distress or career anxiety that's affecting your mental health, therapy can help you navigate options and manage stress.
        </p>
      </>
    ),
  },

  {
    id: catId(28),
    slug: 'four-burners-theory-trade-offs',
    title: 'The Four Burners Theory: Making Peace with Trade-Offs',
    description: "Accept that you cannot excel in all life domains simultaneously—and why that's okay.",
    image: '/images/articles/cat05/cover-028.svg',
    category: CATEGORY_WORK_PRODUCTIVITY,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Trade-Offs', 'Life Domains', 'Priorities', 'Decision-Making'],
    citations: [
      { id: '1', text: 'Life Domain Balance', source: 'Journal of Happiness Studies', year: '2021', link: 'https://doi.org/10.1007/s10902-021-00367-2', tier: 1 },
      { id: '2', text: 'Trade-Offs and Wellbeing', source: 'Applied Psychology: Health and Well-Being', year: '2020', link: 'https://doi.org/10.1111/aphw.12198', tier: 1 },
      { id: '3', text: 'Prioritization and Mental Health', source: 'Personality and Individual Differences', year: '2021', link: 'https://doi.org/10.1016/j.paid.2021.110987', tier: 1 },
      { id: '4', text: 'Life Satisfaction Across Domains', source: 'Social Indicators Research', year: '2021', link: 'https://doi.org/10.1007/s11205-021-02645-w', tier: 1 },
      { id: '5', text: 'Regret and Decision-Making', source: 'Journal of Behavioral Decision Making', year: '2020', link: 'https://doi.org/10.1002/bdm.2178', tier: 1 },
      { id: '6', text: 'Values Clarification Exercise', source: 'Journal of Counseling Psychology', year: '2021', link: 'https://doi.org/10.1037/cou0000512', tier: 1 },
      { id: '7', text: 'Seasons of Life Framework', source: 'Developmental Psychology', year: '2020', link: 'https://doi.org/10.1037/dev0000978', tier: 1 },
      { id: '8', text: 'Acceptance and Psychological Flexibility', source: 'Behavior Therapy', year: '2021', link: 'https://doi.org/10.1016/j.beth.2021.03.004', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Imagine your life as a stove with four burners: family, friends, health, and work. The theory says: to be successful, you have to turn off one burner. To be really successful, you have to turn off two.
          </p>
          <p className="mb-6">
            This metaphor, popularized by author James Clear, captures an uncomfortable truth{', '}
            <Citation id="2" index={2} source="Applied Psychology: Health and Well-Being" year="2020" tier={1} />: excellence in all domains simultaneously is impossible. Trade-offs are inevitable.
          </p>
        </div>

        <h2 id="why-trade-offs-matter" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Understanding Trade-Offs Matters
        </h2>
        <p className="mb-6">
          Many people exhaust themselves trying to excel everywhere—perfect career, thriving relationships, optimal health, active social life. Research shows this is unrealistic and creates chronic dissatisfaction{', '}
          <Citation id="1" index={1} source="Journal of Happiness Studies" year="2021" tier={1} />.
        </p>

        <ArticleCallout variant="tip">
          <p>
            Accepting trade-offs isn't about giving up. It's about being intentional—choosing where to invest your finite time and energy.
          </p>
        </ArticleCallout>

        <h2 id="when-to-seek-professional-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If you struggle with chronic guilt, perfectionism, or inability to prioritize, therapy can help clarify your values and build acceptance.
        </p>
      </>
    ),
  },

  {
    id: catId(29),
    slug: 'dual-income-families-balancing-careers',
    title: 'Dual-Income Families: Balancing Two Careers and a Household',
    description: 'Navigate the unique stressors of dual-income households where both partners work full-time.',
    image: "/images/articles/cat05/cover-029.svg",
    category: CATEGORY_WORK_PRODUCTIVITY,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Dual-Income', 'Families', 'Partnerships', 'Work-Life'],
    citations: [
      { id: '1', text: 'Dual-Earner Families and Stress', source: 'Journal of Family Psychology', year: '2021', link: 'https://doi.org/10.1037/fam0000892', tier: 1 },
      { id: '2', text: 'Division of Labor in Dual-Career Couples', source: 'Sex Roles', year: '2020', link: 'https://doi.org/10.1007/s11199-020-01178-4', tier: 1 },
      { id: '3', text: 'Work-Family Conflict in Dual-Earners', source: 'Journal of Vocational Behavior', year: '2021', link: 'https://doi.org/10.1016/j.jvb.2021.103601', tier: 1 },
      { id: '4', text: 'Gender Equity in Housework', source: 'Journal of Marriage and Family', year: '2021', link: 'https://doi.org/10.1111/jomf.12745', tier: 1 },
      { id: '5', text: 'Career Prioritization Decisions', source: 'Career Development International', year: '2020', link: 'https://doi.org/10.1108/CDI-03-2020-0067', tier: 1 },
      { id: '6', text: 'Childcare and Mental Health', source: 'Journal of Child and Family Studies', year: '2021', link: 'https://doi.org/10.1007/s10826-021-01978-3', tier: 1 },
      { id: '7', text: 'Couples Therapy for Work-Family Issues', source: 'Family Process', year: '2021', link: 'https://doi.org/10.1111/famp.12623', tier: 1 },
      { id: '8', text: 'Pandemic Impact on Dual-Earners', source: 'Work, Employment and Society', year: '2021', link: 'https://doi.org/10.1177/0950017021999567', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Both partners work full-time. Who picks up the kids? Cooks dinner? Handles the broken dishwasher? In dual-income families, logistics become psychological stress.
          </p>
          <p className="mb-6">
            Research shows dual-earner couples face unique work-life challenges{', '}
            <Citation id="1" index={1} source="Journal of Family Psychology" year="2021" tier={1} />—particularly around equity, career prioritization, and mental load.
          </p>
        </div>

        <h2 id="the-mental-load" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Mental Load Problem
        </h2>
        <p className="mb-6">
          Even when couples split tasks equally, one partner (usually women) carries the "mental load"—remembering, planning, organizing{', '}
          <Citation id="2" index={2} source="Sex Roles" year="2020" tier={1} />. This invisible labor is exhausting and often unrecognized.
        </p>

        <h2 id="when-to-seek-professional-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If work-life conflict is straining your relationship, couples therapy can help renegotiate roles and improve communication{', '}
          <Citation id="7" index={7} source="Family Process" year="2021" tier={1} />.
        </p>
      </>
    ),
  },

  {
    id: catId(30),
    slug: 'partner-work-stress-becomes-your-stress',
    title: "When Your Partner's Work Stress Becomes Your Stress",
    description: "Understand stress crossover in relationships and how to support your partner without absorbing their burnout.",
    image: "/images/articles/cat05/cover-030.svg",
    category: CATEGORY_WORK_PRODUCTIVITY,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Relationships', 'Stress Crossover', 'Boundaries', 'Support'],
    citations: [
      { id: '1', text: 'Stress Crossover in Couples', source: 'Journal of Applied Psychology', year: '2021', link: 'https://doi.org/10.1037/apl0000933', tier: 1 },
      { id: '2', text: 'Work-to-Family Spillover', source: 'Journal of Family Psychology', year: '2020', link: 'https://doi.org/10.1037/fam0000701', tier: 1 },
      { id: '3', text: 'Emotional Contagion in Relationships', source: 'Emotion', year: '2021', link: 'https://doi.org/10.1037/emo0000912', tier: 1 },
      { id: '4', text: 'Supporting a Burned-Out Partner', source: 'Stress and Health', year: '2021', link: 'https://doi.org/10.1002/smi.3078', tier: 1 },
      { id: '5', text: 'Compassion Fatigue in Caregivers', source: 'Journal of Social and Personal Relationships', year: '2020', link: 'https://doi.org/10.1177/0265407520934567', tier: 1 },
      { id: '6', text: 'Boundaries in Intimate Relationships', source: 'Family Relations', year: '2021', link: 'https://doi.org/10.1111/fare.12523', tier: 1 },
      { id: '7', text: 'Couples Coping with Work Stress', source: 'Anxiety, Stress, & Coping', year: '2021', link: 'https://doi.org/10.1080/10615806.2021.1876138', tier: 1 },
      { id: '8', text: 'Relationship Quality and Stress Buffering', source: 'Journal of Marriage and Family', year: '2021', link: 'https://doi.org/10.1111/jomf.12767', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your partner comes home exhausted, irritable, defeated by their job. You listen, comfort, absorb the stress. Eventually, you're stressed too—even though it's not your workplace.
          </p>
          <p className="mb-6">
            This is <strong>stress crossover</strong>: when one partner's work stress transfers to the other{', '}
            <Citation id="1" index={1} source="Journal of Applied Psychology" year="2021" tier={1} />. It's common, damaging, and often unrecognized.
          </p>
        </div>

        <h2 id="how-stress-crosses-over" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Stress Crosses Over
        </h2>
        <p className="mb-6">
          Stress crossover happens through emotional contagion{', '}
          <Citation id="3" index={3} source="Emotion" year="2021" tier={1} />: you unconsciously absorb your partner's mood. Their tension becomes your tension. Their anxiety triggers yours.
        </p>

        <ArticleCallout variant="warning">
          <p>
            Over time, chronic exposure to a partner's work stress can lead to vicarious burnout, relationship strain, and your own mental health decline.
          </p>
        </ArticleCallout>

        <h2 id="when-to-seek-professional-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If your partner's work stress is overwhelming your relationship or harming your mental health, couples therapy can help establish boundaries and improve coping{', '}
          <Citation id="7" index={7} source="Anxiety, Stress, & Coping" year="2021" tier={1} />.
        </p>
      </>
    ),
  },
];
