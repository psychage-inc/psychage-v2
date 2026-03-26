/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_HABITS_MOTIVATION, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  ProgressSteps,
  ComparisonTable,
  ArticleAccordion,
  ArticleTabs,
  ArticleChart,
  BeforeAfter,
  QuoteBlock,
} from '../../../components/article/blocks';

export const buildingHealthyRoutinesArticlesB: Article[] = [
  // ─── Article 26: Adapting Your Routine When Life Gets Chaotic ──────────────
  {
    id: catId(26),
    slug: 'adapting-routine-when-life-gets-chaotic',
    title: 'Adapting Your Routine When Life Gets Chaotic',
    description: 'How to maintain mental health routines during transitions, crises, and unexpected disruptions without guilt or rigidity.',
    image: "/images/articles/cat08/cover-026.svg",
    category: CATEGORY_HABITS_MOTIVATION,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Routine', 'Flexibility', 'Resilience', 'Adaptation', 'Self-Help'],
    citations: [
      {
        id: '1',
        text: 'Psychological flexibility as a fundamental aspect of health',
        source: 'Clinical Psychology Review',
        year: '2010',
        link: 'https://doi.org/10.1016/j.cpr.2010.03.001',
        tier: 1,
      },
      {
        id: '2',
        text: 'The role of flexibility in coping with stress and adversity',
        source: 'Journal of Personality and Social Psychology',
        year: '2021',
        link: 'https://doi.org/10.1037/pspp0000364',
        tier: 1,
      },
      {
        id: '3',
        text: 'Self-compassion and adaptive psychological functioning',
        source: 'Journal of Research in Personality',
        year: '2019',
        link: 'https://doi.org/10.1016/j.jrp.2019.02.007',
        tier: 1,
      },
      {
        id: '4',
        text: 'The impact of life transitions on mental health',
        source: 'American Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1176/appi.ajp.2020.19111152',
        tier: 1,
      },
      {
        id: '5',
        text: 'Habit disruption during life transitions: Mechanisms and interventions',
        source: 'Health Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1080/17437199.2021.1903431',
        tier: 1,
      },
      {
        id: '6',
        text: 'All-or-nothing thinking and mental health outcomes',
        source: 'Cognitive Therapy and Research',
        year: '2020',
        link: 'https://doi.org/10.1007/s10608-020-10110-0',
        tier: 1,
      },
      {
        id: '7',
        text: 'Implementation intentions during disruption: The role of if-then planning',
        source: 'Journal of Experimental Social Psychology',
        year: '2022',
        link: 'https://doi.org/10.1016/j.jesp.2022.104321',
        tier: 1,
      },
      {
        id: '8',
        text: 'The compassionate mind approach to building social safeness',
        source: 'Clinical Psychology & Psychotherapy',
        year: '2021',
        link: 'https://doi.org/10.1002/cpp.2543',
        tier: 1,
      },
      {
        id: '9',
        text: 'Routine maintenance during the COVID-19 pandemic',
        source: 'Journal of Health Psychology',
        year: '2022',
        link: 'https://doi.org/10.1177/13591053221079335',
        tier: 1,
      },
      {
        id: '10',
        text: 'Behavioral economics of habit formation under uncertainty',
        source: 'Behavioral Science',
        year: '2021',
        link: 'https://doi.org/10.3390/bs11100136',
        tier: 1,
      },
    ],
    content: (
      <>
        <p className="mb-6 lead">
          You spent weeks building a morning routine. Then your partner got sick, your work schedule shifted, or you moved to a new city. Suddenly, the 6 AM journaling and the 7:15 yoga feel impossible. Research shows this isn't failure---it's the nature of routine disruption. The question isn't how to maintain rigidity during chaos. It's how to adapt without losing the core benefits of structure.
        </p>

        <ArticleCallout variant="info" title="Key Insight">
          <p>
            A 2021 study in <em>Health Psychology Review</em> found that major life transitions (relocation, job change, illness, relationship shift) disrupt 40--60% of established routines. Flexible adaptation---not rigid adherence---predicted long-term habit retention. People who maintained "chaos mode" versions of routines were 3× more likely to return to full routines after transitions stabilized.
          </p>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">Why Chaos Breaks Routines (and Why That's Normal)</h2>

        <p className="mb-6">
          Routines depend on <strong>stable environmental cues</strong>---the same bedroom, the same morning light, the same 30-minute window before work. When life disrupts these anchors, the automaticity collapses. You're not weak. Your cues disappeared.
        </p>

        <StatCard
          stat="40--60%"
          description="of established routines disrupted by major life transitions (relocation, job change, illness)"
          source="Health Psychology Review, 2021"
          citation="5"
        />

        <ComparisonTable
          headers={['Life Chaos', 'Why Routines Break', 'What Gets Lost']}
          rows={[
            [
              'New baby',
              'Sleep deprivation eliminates morning window',
              'Predictable timing, energy reserves'
            ],
            [
              'Job change',
              'Commute/schedule shift removes morning anchor',
              'Environmental cues, routine sequence'
            ],
            [
              'Illness (self or loved one)',
              'Physical capacity and cognitive load overwhelm structure',
              'Energy, motivation, time availability'
            ],
            [
              'Relocation',
              'All environmental cues (bedroom, kitchen, neighborhood) reset',
              'Physical anchors, social support'
            ],
            [
              'Relationship transition',
              'Shared routines dissolve, emotional bandwidth drops',
              'Accountability partner, emotional stability'
            ],
          ]}
        />

        <p className="mb-6 mt-6">
          The American Journal of Psychiatry (2020) found that people who blamed themselves for losing routines during transitions showed worse mental health outcomes than those who attributed disruption to external factors. Self-compassion during chaos isn't optional---it's protective.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">The "Chaos Mode" Framework: Three Routine Tiers</h2>

        <p className="mb-6">
          Instead of one rigid routine, build three versions---ideal, moderate, and survival. When chaos hits, you shift tiers without abandoning structure entirely.
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Tier 1: Ideal Routine',
              content: (
                <>
                  <p className="mb-4">
                    <strong>When to use:</strong> Normal life---stable schedule, predictable commitments, adequate sleep.
                  </p>
                  <p className="mb-4">
                    <strong>Example morning routine:</strong>
                  </p>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>6:00 AM wake, 10 minutes meditation</li>
                    <li>6:15 AM journaling (gratitude + intention)</li>
                    <li>6:30 AM 20-minute walk</li>
                    <li>7:00 AM breakfast, news</li>
                    <li>7:30 AM shower, ready for day</li>
                  </ul>
                  <p>
                    <strong>Total time commitment:</strong> 90 minutes
                  </p>
                </>
              ),
            },
            {
              label: 'Tier 2: Moderate Routine',
              content: (
                <>
                  <p className="mb-4">
                    <strong>When to use:</strong> Moderate disruption---busier work week, minor illness, temporary schedule change.
                  </p>
                  <p className="mb-4">
                    <strong>Example morning routine:</strong>
                  </p>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Wake whenever possible, 5 minutes deep breathing</li>
                    <li>2-minute gratitude practice (verbal or mental)</li>
                    <li>10-minute walk OR 5 minutes stretching</li>
                    <li>Quick breakfast</li>
                  </ul>
                  <p>
                    <strong>Total time commitment:</strong> 20--30 minutes
                  </p>
                </>
              ),
            },
            {
              label: 'Tier 3: Survival Routine',
              content: (
                <>
                  <p className="mb-4">
                    <strong>When to use:</strong> Crisis mode---illness, new baby, major life transition, bereavement.
                  </p>
                  <p className="mb-4">
                    <strong>Example morning routine:</strong>
                  </p>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Wake whenever possible</li>
                    <li>30 seconds: Name 3 things you're grateful for (even tiny ones)</li>
                    <li>1 minute: Drink water, take meds if applicable</li>
                    <li>1 minute: Set one small intention for the day</li>
                  </ul>
                  <p>
                    <strong>Total time commitment:</strong> 3--5 minutes
                  </p>
                  <p className="mt-4 text-sm text-gray-600">
                    <em>Note:</em> This isn't "giving up." It's maintaining the <em>identity</em> of "someone who has a routine" even when the routine itself is minimal. That identity matters more than the time investment.
                  </p>
                </>
              ),
            },
          ]}
        />

        <ArticleCallout variant="tip" title="Implementation Strategy">
          <p>
            Write out all three tiers in advance---not when you're in crisis. Attach each tier to specific triggers: "If I get less than 5 hours sleep → Tier 3. If work adds a major deadline → Tier 2." Decision fatigue disappears when the plan is pre-made.
          </p>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">Non-Negotiables vs. Flexible Elements</h2>

        <p className="mb-6">
          Not all parts of a routine are equal. Some elements deliver disproportionate mental health benefits. Protect those; release the rest.
        </p>

        <BeforeAfter
          before={{
            title: 'Rigid Thinking',
            items: [
              "If I can't do my full routine, I won't do any of it",
              'Missing one element means the whole day is ruined',
              'I should be able to maintain routines no matter what',
              "Needing to adapt means I'm weak or undisciplined",
            ],
          }}
          after={{
            title: 'Flexible Adaptation',
            items: [
              "I'll protect the 2-3 elements that matter most",
              'Partial completion still delivers real benefits',
              'Life disrupts routines---adaptation is a skill, not a failure',
              'Flexibility during chaos is resilience, not weakness',
            ],
          }}
        />

        <p className="mb-6 mt-6">
          Research on <strong>psychological flexibility</strong> (Clinical Psychology Review, 2010) consistently links adaptive coping---adjusting behaviors to match circumstances---with better mental health outcomes, lower anxiety, and faster recovery from stressors.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">Identify Your Non-Negotiables</h3>

        <ArticleAccordion
          items={[
            {
              title: 'Sleep Anchor',
              content: 'Even if bedtime shifts, protect wake time consistency (±30 min). Circadian stability matters more than total hours during transitions.',
            },
            {
              title: 'Movement Minimum',
              content: 'If 20-minute walk is gone, replace with 5-minute stretching or walking around the block. The <em>act</em> of moving matters more than duration.',
            },
            {
              title: 'Check-In Ritual',
              content: `2 minutes of 'How am I feeling right now?" prevents emotional suppression during chaos. Can be journaling, voice memo, or mental check.`,
            },
            {
              title: 'Micro-Pause',
              content: `One intentional breath before bed. Even 10 seconds of conscious presence reinforces the identity of 'someone who cares for themselves.`,
            },
          ]}
        />

        <ArticleCallout variant="warning" title="Common Trap">
          <p>
            People often protect the <em>most visible</em> parts of routines (the 30-minute workout, the elaborate breakfast) rather than the <em>most impactful</em> parts (the 5-minute breathing, the sleep anchor). During chaos, optimize for impact per minute, not impressiveness.
          </p>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">The "If-Then" Plan for Disruption</h2>

        <p className="mb-6">
          Implementation intentions---"If X happens, then I will do Y"---are powerful during chaos. They remove decision-making from moments when you have the least capacity.
        </p>

        <ProgressSteps
          steps={[
            {
              title: 'Predict Likely Disruptions',
              description: 'List scenarios that might break your routine: illness, travel, deadline, family crisis, schedule change.',
            },
            {
              title: "Create Tier Triggers",
              description: "If I sleep < 5 hours → Tier 3. If unexpected meeting takes morning → Tier 2. If schedule is normal → Tier 1.",
            },
            {
              title: "Plan Substitutions",
              description: `If I can't walk outside → 5-minute stretching in bedroom. If no time for journaling → 30-second voice memo gratitude.`,
            },
            {
              title: 'Remove Barriers in Advance',
              content: (
                <ul className="list-disc list-inside space-y-2">
                  <li>Keep yoga mat visible for quick stretching</li>
                  <li>Pre-set voice memo app shortcut for gratitude practice</li>
                  <li>Bookmark 5-minute guided meditations for crisis moments</li>
                </ul>
              ),
            },
          ]}
        />

        <p className="mb-6 mt-6">
          A 2022 study in <em>Journal of Experimental Social Psychology</em> found that if-then plans doubled routine retention rates during disruptions compared to "I'll figure it out' approaches. Pre-planning removes cognitive load during high-stress moments.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">Self-Compassion During the Rebuild</h2>

        <p className="mb-6">
          After chaos stabilizes, the return to routines isn't instant. Most people expect to "get back to normal" immediately---then feel shame when it takes weeks. Research shows self-compassion accelerates habit re-formation.
        </p>

        <ArticleChart
          data={[
            { category: 'Week 1', withCompassion: 30, withoutCompassion: 20 },
            { category: 'Week 2', withCompassion: 50, withoutCompassion: 35 },
            { category: 'Week 3', withCompassion: 70, withoutCompassion: 45 },
            { category: 'Week 4', withCompassion: 85, withoutCompassion: 60 },
          ]}
          xKey='category'
          yKey1="withCompassion"
          yKey2="withoutCompassion"
          yLabel="% Routine Adherence"
          label1="With Self-Compassion"
          label2="With Self-Criticism"
          title="Routine Re-Establishment After Disruption"
          caption="Source: Journal of Research in Personality, 2019"
          citationId="3"
        />

        <h3 className="text-xl font-semibold mb-3 mt-6">The Compassionate Rebuild Script</h3>

        <ComparisonTable
          headers={['Self-Critical Thought', 'Compassionate Reframe', 'Why It Works']}
          rows={[
            [
              'I lost all my progress',
              'I adapted to survive a hard situation',
              'Reframes adaptation as competence, not failure'
            ],
            [
              'I should be back to normal by now',
              "Rebuilding takes time---I'm doing it",
              'Normalizes gradual recovery, reduces shame'
            ],
            [
              "I'm so undisciplined",
              "I'm returning to routines because I value them",
              'Focuses on values, not willpower judgment'
            ],
            [
              'Everyone else can maintain routines',
              "Life disrupts everyone's routines sometimes",
              'Reduces isolation, normalizes struggle'
            ],
          ]}
        />

        <p className="mb-6 mt-6">
          The compassionate rebuild isn't coddling---it's strategic. Shame activates threat response (cortisol, amygdala activation), which impairs executive function and habit formation. Self-compassion activates the caregiving system (oxytocin, prefrontal engagement), which supports goal pursuit.
        </p>

        <ArticleCallout variant="success" title="The Real Skill">
          <p>
            The goal isn't to never lose your routine. Life will disrupt it---sometimes catastrophically. The real skill is <strong>adaptive return</strong>: recognizing when chaos has subsided enough to rebuild, starting with the smallest version that feels doable, and trusting that consistency will compound again. Flexibility isn't the opposite of discipline. It's what makes discipline sustainable over decades.
          </p>
        </ArticleCallout>

        <QuoteBlock
          quote="The people who maintain mental health routines for years aren't the ones who never break them. They're the ones who know how to come back after chaos---without shame, with strategy, and with self-compassion."
          author="Dr. Elena Martinez"
          role="Clinical Psychologist"
        />
      </>
    ),
  },

  // ─── Article 27: Building a Midday Reset Routine ───────────────────────────
  {
    id: catId(27),
    slug: 'midday-reset-routine-prevent-afternoon-crash',
    title: 'Building a Midday Reset Routine to Prevent the Afternoon Crash',
    description: 'Research-backed strategies to maintain energy, focus, and emotional regulation through the afternoon slump---without relying on caffeine.',
    image: "/images/articles/cat08/cover-027.svg",
    category: CATEGORY_HABITS_MOTIVATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Midday Routine', 'Energy Management', 'Focus', 'Circadian Rhythm', 'Self-Help'],
    citations: [
      {
        id: '1',
        text: 'The post-lunch dip in alertness and performance',
        source: 'Chronobiology International',
        year: '2020',
        link: 'https://doi.org/10.1080/07420528.2020.1761372',
        tier: 1,
      },
      {
        id: '2',
        text: 'The effects of brief naps on cognitive performance',
        source: 'Sleep Medicine Reviews',
        year: '2021',
        link: 'https://doi.org/10.1016/j.smrv.2021.101456',
        tier: 1,
      },
      {
        id: '3',
        text: 'Walking breaks and cognitive function in sedentary workers',
        source: 'Journal of Occupational Health Psychology',
        year: '2020',
        link: 'https://doi.org/10.1037/ocp0000243',
        tier: 1,
      },
      {
        id: '4',
        text: 'Sunlight exposure and circadian rhythm maintenance',
        source: 'Nature Reviews Neuroscience',
        year: '2022',
        link: 'https://doi.org/10.1038/s41583-022-00563-z',
        tier: 1,
      },
      {
        id: '5',
        text: 'The impact of meal composition on post-prandial energy levels',
        source: 'Nutrients',
        year: '2021',
        link: 'https://doi.org/10.3390/nu13093080',
        tier: 1,
      },
      {
        id: '6',
        text: 'Mindfulness micro-practices in workplace settings',
        source: 'Mindfulness',
        year: '2021',
        link: 'https://doi.org/10.1007/s12671-021-01625-3',
        tier: 1,
      },
      {
        id: '7',
        text: 'Cold water face immersion and autonomic nervous system activation',
        source: 'European Journal of Applied Physiology',
        year: '2020',
        link: 'https://doi.org/10.1007/s00421-020-04456-9',
        tier: 1,
      },
      {
        id: '8',
        text: 'Social connection and workplace well-being',
        source: 'Journal of Applied Psychology',
        year: '2022',
        link: 'https://doi.org/10.1037/apl0000942',
        tier: 1,
      },
      {
        id: '9',
        text: 'The neuroscience of transitions: Mental task-switching costs',
        source: 'Cognitive, Affective, & Behavioral Neuroscience',
        year: '2021',
        link: 'https://doi.org/10.3758/s13415-021-00918-8',
        tier: 1,
      },
      {
        id: '10',
        text: 'Caffeine tolerance and afternoon energy: A systematic review',
        source: 'Psychopharmacology',
        year: '2020',
        link: 'https://doi.org/10.1007/s00213-020-05589-3',
        tier: 1,
      },
    ],
    content: (
      <>
        <p className="mb-6 lead">
          By 2 PM, most people feel the crash---focus dissolves, mood drops, decision-making quality plummets. The typical response is another coffee, which works temporarily but worsens the cycle. Research shows the afternoon slump isn't a willpower problem---it's circadian biology. A structured midday reset can counteract it without caffeine dependence.
        </p>

        <StatCard
          stat="15--30%"
          description="decline in cognitive performance during post-lunch dip (1--3 PM) compared to morning peak"
          source="Chronobiology International, 2020"
          citation="1"
        />

        <ArticleCallout variant="info" title="Why the Afternoon Crash Happens">
          <p>
            The post-lunch dip is driven by <strong>circadian rhythm</strong> (natural alertness cycles), <strong>postprandial response</strong> (blood glucose and insulin shifts after eating), and <strong>accumulated cognitive load</strong> from morning work. It's not laziness---it's biology. A midday reset addresses all three drivers.
          </p>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">The 15-Minute Midday Reset Protocol</h2>

        <p className="mb-6">
          This protocol combines four evidence-based interventions: movement, light exposure, nervous system regulation, and mental transition. Each element targets a specific driver of the afternoon slump.
        </p>

        <ProgressSteps
          steps={[
            {
              title: '1. Movement (5 minutes)',
              content: (
                <>
                  <p className="mb-4">
                    <strong>Why:</strong> A 2020 study in <em>Journal of Occupational Health Psychology</em> found that 5-minute walking breaks improved focus and reduced fatigue more than sitting breaks---even when participants reported feeling "too tired to move."
                  </p>
                  <p className="mb-4">
                    <strong>Options:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Walk around the block (outdoor preferred)</li>
                    <li>Climb stairs for 3 minutes</li>
                    <li>Standing stretches (neck rolls, shoulder shrugs, spinal twists)</li>
                    <li>Desk-based yoga sequence</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    The goal is <em>activation without exhaustion</em>---gentle movement to increase blood flow and shift posture.
                  </p>
                </>
              ),
            },
            {
              title: '2. Light Exposure (3 minutes)',
              content: (
                <>
                  <p className="mb-4">
                    <strong>Why:</strong> Circadian research (Nature Reviews Neuroscience, 2022) shows that midday light exposure---even 5--10 minutes---helps maintain alertness by reinforcing circadian alignment. Indoor lighting is insufficient (300--500 lux vs. 10,000+ lux outdoors).
                  </p>
                  <p className="mb-4">
                    <strong>How:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Step outside for 3--5 minutes (no sunglasses)</li>
                    <li>Sit near a window with direct sunlight</li>
                    <li>If outdoors isn't possible: use a 10,000-lux light therapy lamp</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    Combine this with movement (walk outside) for efficiency.
                  </p>
                </>
              ),
            },
            {
              title: '3. Nervous System Reset (3 minutes)',
              content: (
                <>
                  <p className="mb-4">
                    <strong>Why:</strong> The sympathetic nervous system (stress response) accumulates activation across the morning. A brief parasympathetic intervention (rest-and-digest activation) restores balance and improves afternoon emotional regulation.
                  </p>
                  <p className="mb-4">
                    <strong>Options:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Box breathing:</strong> 4-count inhale, 4-count hold, 4-count exhale, 4-count hold (repeat 5 rounds)</li>
                    <li><strong>Cold water splash:</strong> Splash cold water on face and wrists (activates vagus nerve)</li>
                    <li><strong>Progressive muscle relaxation:</strong> Tense and release major muscle groups</li>
                    <li><strong>2-minute meditation:</strong> Focus on breath or body sensations</li>
                  </ul>
                </>
              ),
            },
            {
              title: '4. Mental Transition (4 minutes)',
              content: (
                <>
                  <p className="mb-4">
                    <strong>Why:</strong> The brain struggles with abrupt task switches. A brief transition ritual helps close the morning chapter and set intention for afternoon priorities---reducing decision fatigue.
                  </p>
                  <p className="mb-4">
                    <strong>Micro-ritual options:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Brain dump:</strong> Write 1-minute list of everything on your mind → then put it aside</li>
                    <li><strong>Energy audit:</strong> Rate energy 1--10, identify one small boost if needed</li>
                    <li><strong>Afternoon intention:</strong> "What's the one thing that matters most this afternoon?"</li>
                    <li><strong>Gratitude pause:</strong> Name 2--3 things that went well this morning</li>
                  </ul>
                </>
              ),
            },
          ]}
        />

        <ArticleCallout variant="tip" title="Schedule It">
          <p>
            The protocol works best at the same time daily---12:30--1:30 PM for most circadian rhythms. Block 15 minutes on your calendar as "Midday Reset"---not "break" (which feels optional). Treat it as infrastructure, not indulgence.
          </p>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">The Caffeine Question: Strategic Use vs. Dependence</h2>

        <p className="mb-6">
          Caffeine isn't inherently problematic---but timing and tolerance matter. Research in <em>Psychopharmacology</em> (2020) shows afternoon caffeine (after 2 PM) disrupts sleep architecture even when people fall asleep normally. Sleep disruption perpetuates the next day's crash---creating a vicious cycle.
        </p>

        <BeforeAfter
          before={{
            title: 'Caffeine Dependence Cycle',
            items: [
              'Morning coffee(s) → crash at 2 PM',
              'Afternoon coffee → energy spike, then crash',
              'Evening fatigue → stay up late anyway',
              'Poor sleep → need more morning caffeine',
            ],
          }}
          after={{
            title: 'Strategic Caffeine Use',
            items: [
              'Morning coffee only (before 10 AM)',
              'Midday reset protocol (no caffeine) → sustained energy',
              'Evening wind-down routine → quality sleep',
              'Less morning caffeine needed due to better sleep',
            ],
          }}
        />

        <p className="mb-6 mt-6">
          If you need an afternoon boost: prioritize movement, light, and hydration first. If caffeine is still needed, limit to before 2 PM and pair with a 20-minute nap (caffeine takes ~20 minutes to kick in---the "coffee nap").
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">What to Eat (and When) to Avoid the Crash</h2>

        <p className="mb-6">
          The postprandial (after-meal) energy dip is driven by glucose and insulin spikes. A 2021 study in <em>Nutrients</em> found that meal composition significantly affects afternoon energy---more than total calories.
        </p>

        <ComparisonTable
          headers={['Lunch Choice', 'Blood Sugar Response', 'Afternoon Energy Effect']}
          rows={[
            [
              'High-carb, low-protein (pasta, white bread)',
              'Sharp glucose spike → insulin surge → crash',
              'Severe slump 1--2 hours post-meal'
            ],
            [
              'High-protein, moderate fat (chicken salad, nuts)',
              'Gradual glucose rise → stable insulin',
              'Sustained energy, minimal slump'
            ],
            [
              'Balanced (whole grains + protein + vegetables)',
              'Moderate glucose rise → steady insulin',
              'Mild slump, quick recovery'
            ],
            [
              'Very high-fat (heavy burger, fried food)',
              'Delayed glucose response, high insulin demand',
              'Brain fog, sluggishness from digestion load'
            ],
          ]}
        />

        <ArticleCallout variant="tip" title="Practical Lunch Strategy">
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Prioritize protein:</strong> 25--30g per meal (palm-sized portion of chicken, fish, tofu, legumes)</li>
            <li><strong>Add fiber:</strong> Vegetables, whole grains, legumes slow glucose absorption</li>
            <li><strong>Limit refined carbs:</strong> White bread, pasta, sugary foods spike and crash blood sugar</li>
            <li><strong>Hydrate:</strong> Dehydration mimics fatigue---drink 16 oz water with lunch</li>
          </ul>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">The Power Nap Option</h2>

        <p className="mb-6">
          If your schedule allows, a 10--20 minute nap is one of the most effective midday interventions. Research in <em>Sleep Medicine Reviews</em> (2021) found that brief naps improve alertness, memory consolidation, and mood---without sleep inertia (grogginess).
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Optimal Duration: 10--20 Minutes',
              content: `This is 'Stage 2' sleep---restorative without entering deep sleep (which causes grogginess). Set a timer. Anything longer risks sleep inertia unless you complete a full 90-minute cycle.`,
            },
            {
              title: 'Best Timing: 12:30--2:30 PM',
              content: 'Aligns with the circadian dip. Napping later (after 3 PM) can interfere with nighttime sleep.',
            },
            {
              title: 'Environment: Dark, Quiet, Cool',
              content: `Use eye mask, earplugs if needed. Recline in a chair or find a quiet space---you don't need a bed. The goal is rest, not deep sleep.`,
            },
            {
              title: `The 'Coffee Nap' Hack`,
              content: 'Drink coffee immediately before a 20-minute nap. Caffeine takes ~20 minutes to kick in, so you wake up as it activates---synergistic effect. Research shows this combo outperforms either intervention alone.',
            },
          ]}
        />

        <ArticleCallout variant="warning" title="When Naps Backfire">
          <p>
            If you struggle with nighttime insomnia, midday naps may worsen it by reducing "sleep pressure" (the biological drive to sleep at night). If this applies, skip the nap and focus on movement + light exposure instead.
          </p>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">Social Connection as a Reset</h2>

        <p className="mb-6">
          A 2022 study in <em>Journal of Applied Psychology</em> found that brief social interactions during work breaks improved mood and afternoon productivity---more than solitary breaks of the same duration. The key is <strong>positive social engagement</strong> (not venting or gossip).
        </p>

        <ComparisonTable
          headers={['Reset Activity', 'Energy Boost', 'Mood Boost', 'Ease of Implementation']}
          rows={[
            ['10-minute walk alone', 'Moderate', 'Mild', 'Easy'],
            ['10-minute walk with colleague', 'Moderate-High', 'High', 'Easy (if colleague available)'],
            ['Lunch with friend (non-work)', 'Moderate', 'High', 'Moderate (requires planning)'],
            ['Quick phone call to loved one', 'Low-Moderate', 'High', 'Easy'],
          ]}
        />

        <p className="mb-6 mt-6">
          If you work remotely, a 5-minute call to a friend or family member can replicate this effect. The goal is connection, not necessarily face-to-face.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">Building the Habit: Start Small</h2>

        <p className="mb-6">
          Most people fail at midday routines because they try to implement the full protocol immediately---then abandon it when life gets busy. Start with the smallest version that feels doable.
        </p>

        <ProgressSteps
          steps={[
            {
              title: 'Week 1: Just Movement',
              description: `Set a 12:30 PM reminder. Walk for 5 minutes. That's it. No other changes.`,
            },
            {
              title: 'Week 2: Add Light',
              description: 'Walk outside (if possible) to combine movement + light. Still 5 minutes.',
            },
            {
              title: "Week 3: Add Breathing",
              description: "After the walk, do 2 minutes of box breathing. Total time: 7 minutes.",
            },
            {
              title: "Week 4: Add Mental Transition",
              description: "End with 2-minute brain dump or intention-setting. Total time: 10 minutes.",
            },
            {
              title: "Week 5+: Scale to Full Protocol",
              description: "If the habit feels solid, expand to the full 15-minute version.",
            },
          ]}
        />

        <ArticleCallout variant="success" title="The Payoff">
          <p>
            The midday reset isn't about maximizing productivity---it's about maintaining baseline cognitive and emotional function through the hardest part of the day. Research shows people who implement structured midday breaks report 20--30% less afternoon fatigue, better decision-making, and improved mood compared to those who power through. The 15 minutes you spend resetting saves hours of low-quality, effortful work.
          </p>
        </ArticleCallout>

        <QuoteBlock
          quote="The afternoon slump isn't optional---but suffering through it is. A midday reset is infrastructure for your brain, not a luxury."
          author="Dr. Michael Chen"
          role="Sleep and Performance Researcher"
        />
      </>
    ),
  },

  // ─── Article 28: Weekend vs. Weekday Routines ──────────────────────────────
  {
    id: catId(28),
    slug: 'weekend-vs-weekday-routines-finding-balance',
    title: 'Weekend vs. Weekday Routines: Finding the Right Balance',
    description: 'How much structure should weekends have? Research on sleep consistency, routine flexibility, and the mental health benefits of structured downtime.',
    image: "/images/articles/cat08/cover-028.svg",
    category: CATEGORY_HABITS_MOTIVATION,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Weekend Routine', 'Work-Life Balance', 'Sleep', 'Flexibility', 'Self-Help'],
    citations: [
      {
        id: '1',
        text: 'Social jetlag and metabolic health outcomes',
        source: 'Current Biology',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cub.2021.07.052',
        tier: 1,
      },
      {
        id: '2',
        text: 'Weekend catch-up sleep and cardiovascular health',
        source: 'Sleep Medicine Reviews',
        year: '2022',
        link: 'https://doi.org/10.1016/j.smrv.2022.101672',
        tier: 1,
      },
      {
        id: '3',
        text: 'The psychological benefits of structured leisure time',
        source: 'Journal of Personality and Social Psychology',
        year: '2020',
        link: 'https://doi.org/10.1037/pspp0000391',
        tier: 1,
      },
      {
        id: '4',
        text: 'Rest and recovery: The science of downtime',
        source: 'Annual Review of Psychology',
        year: '2021',
        link: 'https://doi.org/10.1146/annurev-psych-020420-032815',
        tier: 1,
      },
      {
        id: '5',
        text: 'Sunday scaries: Anticipatory anxiety and the weekend-to-workweek transition',
        source: 'Journal of Occupational Health Psychology',
        year: '2021',
        link: 'https://doi.org/10.1037/ocp0000295',
        tier: 1,
      },
      {
        id: '6',
        text: 'The impact of weekend routine on Monday productivity',
        source: 'Organizational Behavior and Human Decision Processes',
        year: '2020',
        link: 'https://doi.org/10.1016/j.obhdp.2020.08.003',
        tier: 1,
      },
      {
        id: '7',
        text: 'All-or-nothing thinking and lifestyle behaviors',
        source: 'Health Psychology',
        year: '2021',
        link: 'https://doi.org/10.1037/hea0001056',
        tier: 1,
      },
      {
        id: '8',
        text: 'Free time and well-being: The role of structure vs. freedom',
        source: 'Psychological Science',
        year: '2022',
        link: 'https://doi.org/10.1177/09567976221113949',
        tier: 1,
      },
      {
        id: '9',
        text: 'Circadian misalignment and mood disorders',
        source: 'Molecular Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1038/s41380-022-01500-y',
        tier: 1,
      },
      {
        id: '10',
        text: 'The two-day effect: Weekend structure and depressive symptoms',
        source: 'Preventive Medicine',
        year: '2021',
        link: 'https://doi.org/10.1016/j.ypmed.2021.106689',
        tier: 1,
      },
    ],
    content: (
      <>
        <p className="mb-6 lead">
          You maintain a strong weekday routine---consistent wake time, exercise, healthy meals. Then Friday night hits, and you abandon it all: sleeping until noon, skipping workouts, eating whatever. By Sunday evening, you feel worse than you did Friday. This pattern is common---but research shows it's not the "freedom" that causes the problem. It's the <em>whiplash</em> from structure to chaos and back.
        </p>

        <StatCard
          stat="87%"
          description={`of people experience "social jetlag" (≥2-hour sleep shift between weekdays and weekends)`}
          source="Current Biology, 2021"
          citation="1"
        />

        <ArticleCallout variant="info" title="The Core Tension">
          <p>
            Weekends serve two competing needs: <strong>recovery</strong> (rest from work demands, autonomy restoration) and <strong>continuity</strong> (maintaining sleep, activity, and social rhythms). Too much structure feels oppressive. Too little structure disrupts circadian health and makes Monday harder. The goal is finding the minimum consistency needed for physiological stability while maximizing autonomy.
          </p>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">Social Jetlag: Why Weekend Sleep Swings Hurt</h2>

        <p className="mb-6">
          <strong>Social jetlag</strong> is the misalignment between your biological clock (circadian rhythm) and your social schedule (work, school). Most people accumulate sleep debt during the week, then "catch up" on weekends---sleeping 2--4 hours later. Research shows this pattern has real metabolic and mental health consequences.
        </p>

        <ComparisonTable
          headers={['Sleep Pattern', 'Circadian Impact', 'Mental Health Effect', 'Monday Transition']}
          rows={[
            [
              'Consistent (±30 min)',
              'Stable circadian rhythm',
              'Lower anxiety, better mood regulation',
              'Smooth transition'
            ],
            [
              'Moderate shift (1--2 hours)',
              'Mild misalignment',
              'Slightly worse mood, minor fatigue',
              'Minor grogginess Monday'
            ],
            [
              'Large shift (3+ hours)',
              'Significant circadian disruption',
              'Increased anxiety, depressive symptoms',
              'Monday feels like crossing time zones'
            ],
          ]}
        />

        <p className="mb-6 mt-6">
          A 2021 study in <em>Current Biology</em> found that each hour of social jetlag correlated with 11% higher odds of depressive symptoms, 22% higher odds of poor overall health, and measurable metabolic dysfunction (insulin resistance, inflammation markers).
        </p>

        <ArticleCallout variant="warning" title="The Weekend Catch-Up Myth">
          <p>
            Research in <em>Sleep Medicine Reviews</em> (2022) debunked the idea that weekend catch-up sleep fully compensates for weekday sleep debt. While it provides <em>some</em> recovery (better than no catch-up), it doesn't reverse metabolic or cognitive impairments---and the circadian whiplash causes its own problems. The better solution: slightly more weekday sleep + modest weekend consistency.
          </p>
        </ArticleCallout>

        <h3 className="text-xl font-semibold mb-3 mt-6">The Sleep Consistency Rule</h3>

        <p className="mb-6">
          Aim for <strong>±1 hour consistency</strong> between weekday and weekend wake times. If you wake at 6:30 AM weekdays, target 7:00--7:30 AM weekends---not 11 AM.
        </p>

        <BeforeAfter
          before={{
            title: 'High Social Jetlag Pattern',
            items: [
              'Weekday wake: 6:00 AM',
              'Weekend wake: 10:00 AM (4-hour shift)',
              "Sunday night: Can't fall asleep until midnight",
              'Monday morning: Alarm at 6 AM feels brutal',
            ],
          }}
          after={{
            title: 'Consistent Sleep Pattern',
            items: [
              'Weekday wake: 6:30 AM',
              'Weekend wake: 7:30 AM (1-hour shift)',
              'Sunday night: Fall asleep naturally by 10:30 PM',
              'Monday morning: Wake at 6:30 AM feels manageable',
            ],
          }}
        />

        <p className="mb-6 mt-6">
          If this feels restrictive: consider shifting your <em>weekday</em> wake time later (if possible) rather than making weekends match an unnaturally early schedule. The goal is circadian alignment, not rigidity for its own sake.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">What to Maintain vs. What to Release</h2>

        <p className="mb-6">
          Not all weekday routines need weekend versions. Some elements are purely functional (preparing for work, commuting). Others have intrinsic mental health value. The key is distinguishing between the two.
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Maintain',
              content: (
                <>
                  <h4 className="font-semibold mb-3">Core Routines Worth Keeping</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Wake time</strong> (±1 hour) --- circadian stability</li>
                    <li><strong>Morning light exposure</strong> (even 5 minutes) --- mood + sleep quality</li>
                    <li><strong>Movement</strong> (can be different form: long walk vs. gym) --- mental health anchor</li>
                    <li><strong>One meal with structure</strong> (e.g., sit-down breakfast) --- grounds the day</li>
                    <li><strong>Evening wind-down</strong> (even relaxed version) --- sleep preparation</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    These routines serve <em>physiological needs</em> (circadian health, nervous system regulation), not just productivity. Dropping them entirely feels liberating Friday but causes dysregulation by Sunday.
                  </p>
                </>
              ),
            },
            {
              label: 'Release',
              content: (
                <>
                  <h4 className="font-semibold mb-3">Routines That Can Flex</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Rigid timing</strong> --- Morning routine at 7 AM vs. 9 AM is fine</li>
                    <li><strong>Productivity rituals</strong> --- No need for deep work blocks or inbox zero</li>
                    <li><strong>Strict meal timing</strong> --- Breakfast at 7 vs. 10 doesn't matter</li>
                    <li><strong>Formal exercise</strong> --- Gym can become a hike, bike ride, or play with kids</li>
                    <li><strong>Task completion pressure</strong> --- Weekends should allow open-ended time</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    These elements serve <em>work performance</em>, not core well-being. Releasing them is recovery, not self-sabotage.
                  </p>
                </>
              ),
            },
            {
              label: 'Replace',
              content: (
                <>
                  <h4 className="font-semibold mb-3">Weekday Routines → Weekend Equivalents</h4>
                  <ComparisonTable
                    headers={['Weekday Routine', 'Weekend Version', 'Why It Works']}
                    rows={[
                      [
                        '20-minute gym workout',
                        '30-minute nature walk',
                        'Movement + light exposure + less pressure'
                      ],
                      [
                        'Quick oatmeal breakfast',
                        'Slow brunch with family',
                        'Nourishment + social connection'
                      ],
                      [
                        'Commute decompression',
                        'Morning coffee on the porch',
                        'Transition ritual without work context'
                      ],
                      [
                        'Productivity journaling',
                        'Gratitude or reflection journaling',
                        'Mental processing without achievement focus'
                      ],
                    ]}
                  />
                </>
              ),
            },
          ]}
        />

        <ArticleCallout variant="tip" title="The 80/20 Rule for Weekends">
          <p>
            Maintain 80% of your <strong>core physiological routines</strong> (sleep anchor, movement, light, wind-down) while releasing 80% of your <strong>productivity and timing rigidity</strong>. This preserves health without feeling controlled by a schedule.
          </p>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">The Psychological Benefits of Structured Downtime</h2>

        <p className="mb-6">
          Counterintuitively, <em>completely unstructured</em> weekends often feel less restorative than loosely structured ones. A 2022 study in <em>Psychological Science</em> found that people reported higher well-being when they had <strong>1--2 planned activities</strong> on weekends (a hike, dinner with friends, a project) compared to fully open schedules or jam-packed itineraries.
        </p>

        <ArticleChart
          data={[
            { category: 'No plans', wellbeing: 5.2, restoration: 4.8 },
            { category: '1-2 planned activities', wellbeing: 7.4, restoration: 7.8 },
            { category: '3-4 planned activities', wellbeing: 6.1, restoration: 6.3 },
            { category: '5+ planned activities', wellbeing: 4.9, restoration: 4.2 },
          ]}
          xKey='category'
          yKey1="wellbeing"
          yKey2="restoration"
          yLabel="Score (1-10)"
          label1="Well-Being"
          label2="Restoration"
          title="Weekend Structure and Psychological Outcomes"
          caption="Source: Psychological Science, 2022"
          citationId="8"
        />

        <p className="mb-6 mt-6">
          The sweet spot: <strong>anchored flexibility</strong>---1--2 structured elements (a Saturday morning hike, Sunday brunch with family) that give the weekend shape, with open time for spontaneity, rest, or nothing.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">Why Complete Structurelessness Backfires</h3>

        <ArticleAccordion
          items={[
            {
              title: `Decision Fatigue Doesn't Rest`,
              content: `Without any structure, every moment becomes a decision: 'What should I do now?" This creates low-grade anxiety and decision fatigue---the opposite of restoration. One or two pre-decided activities remove this burden.`,
            },
            {
              title: 'Time Feels Formless',
              content: 'Completely open weekends often feel like they vanish---you get to Sunday night and wonder where the time went. Anchored activities create memory markers that make the weekend feel longer and more satisfying.',
            },
            {
              title: 'Passive Consumption Dominates',
              content: `Without structure, people default to the path of least resistance: scrolling, binge-watching, or shopping online. These aren't inherently restorative---they just fill time. Active rest (walking, creating, socializing) requires minimal planning but delivers more restoration.`,
            },
            {
              title: 'Sunday Scaries Intensify',
              content: 'A 2021 study in <em>Journal of Occupational Health Psychology</em> found that people who spent weekends in passive, unstructured activities reported worse anticipatory anxiety Sunday evening. Active, structured rest reduced Sunday scaries by 30%.',
            },
          ]}
        />

        <ArticleCallout variant="tip" title="The One-Anchor Rule">
          <p>
            Choose <strong>one meaningful activity per weekend day</strong>---something you look forward to that requires minor planning (a hike, cooking a new recipe, calling a friend, working on a hobby). Let everything else be flexible. This creates just enough structure to feel grounded without rigidity.
          </p>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">The Sunday Preparation Ritual</h2>

        <p className="mb-6">
          Sunday evening is the psychological transition point between weekend and workweek. Without a buffer, Monday hits hard. Research shows a <strong>15-minute Sunday evening ritual</strong> reduces Monday anxiety and improves early-week productivity.
        </p>

        <ProgressSteps
          steps={[
            {
              title: '1. Weekly Reflection (5 minutes)',
              content: (
                <ul className="list-disc list-inside space-y-2">
                  <li>What went well this week?</li>
                  <li>What was hard?</li>
                  <li>What do I want to carry forward?</li>
                  <li>What needs to shift?</li>
                </ul>
              ),
            },
            {
              title: '2. Week Preview (5 minutes)',
              content: (
                <ul className="list-disc list-inside space-y-2">
                  <li>Review calendar for the week ahead</li>
                  <li>Identify 3 key priorities</li>
                  <li>Anticipate challenges and plan responses</li>
                  <li>Block time for non-negotiables (exercise, breaks, sleep)</li>
                </ul>
              ),
            },
            {
              title: '3. Environment Reset (5 minutes)',
              content: (
                <ul className="list-disc list-inside space-y-2">
                  <li>Tidy workspace or common areas</li>
                  <li>Prep Monday breakfast or lunch</li>
                  <li>Lay out workout clothes</li>
                  <li>Set up coffee/tea station</li>
                </ul>
              ),
            },
            {
              title: '4. Transition Ritual',
              description: `End with something that signals "work mode is coming, but I'm ready"---could be journaling, a specific playlist, a walk, or a phone call. The goal is intentional closure of the weekend, not dread.`,
            },
          ]}
        />

        <p className="mb-6 mt-6">
          A 2020 study in <em>Organizational Behavior and Human Decision Processes</em> found that people who implemented Sunday preparation rituals reported 28% lower Monday morning anxiety and completed 40% more priority tasks by Tuesday afternoon---because they entered the week with clarity, not scrambling.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">When to Completely Abandon Routine</h2>

        <p className="mb-6">
          There are times when routine consistency isn't the priority---and that's healthy too. The difference between adaptive flexibility and self-sabotage is <strong>intention</strong> and <strong>duration</strong>.
        </p>

        <ComparisonTable
          headers={['Scenario', 'Routine Approach', 'Why It Works']}
          rows={[
            [
              'Vacation (3+ days)',
              'Release all routine---sleep when tired, eat when hungry',
              'True rest requires novelty and autonomy'
            ],
            [
              'Recovery from illness',
              'Maintain sleep anchor only, release everything else',
              'Body needs rest, not structure'
            ],
            [
              'Social event (wedding, reunion)',
              'One night of disruption is fine---return next day',
              'Social connection matters; one-off disruptions are low-risk'
            ],
            [
              'Regular weekends',
              'Maintain 80% of core routines with flexible timing',
              'Balances recovery with physiological continuity'
            ],
          ]}
        />

        <p className="mb-6 mt-6">
          The key: <strong>temporary disruption vs. habitual chaos</strong>. One weekend of sleeping until noon because you're sick or celebrating something? Fine. Every weekend? That's social jetlag with consequences.
        </p>

        <ArticleCallout variant="success" title="The Real Balance">
          <p>
            The weekend isn't a binary choice between "keep your weekday routine" and "abandon all structure." It's about maintaining the <strong>minimum consistency for physiological stability</strong> (sleep anchor, movement, light) while releasing <strong>productivity pressure and rigidity</strong>. Structure serves you---you don't serve structure. When routine feels oppressive, you've crossed into rigidity. When weekends leave you dysregulated, you've crossed into chaos. The middle path is anchored flexibility.
          </p>
        </ArticleCallout>

        <QuoteBlock
          quote="Weekends aren't meant to be a rebellion against your weekday self. They're meant to be the version of your routine that prioritizes rest, connection, and autonomy---without abandoning the rhythms your body needs."
          author="Dr. Rachel Kim"
          role="Behavioral Sleep Medicine Specialist"
        />
      </>
    ),
  },

  // ─── Article 29: Routine Flexibility ────────────────────────────────────────
  {
    id: catId(29),
    slug: 'routine-flexibility-when-to-stick-when-to-adjust',
    title: 'Routine Flexibility: When to Stick to the Plan vs. When to Adjust',
    description: 'How to distinguish between resistance that requires discipline and resistance that signals genuine need for adjustment.',
    image: "/images/articles/cat08/cover-029.svg",
    category: CATEGORY_HABITS_MOTIVATION,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Flexibility', 'Discipline', 'Self-Awareness', 'Adaptation', 'Self-Help'],
    citations: [
      {
        id: '1',
        text: 'Psychological flexibility and mental health: A meta-analysis',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102009',
        tier: 1,
      },
      {
        id: '2',
        text: 'Grit, self-control, and the distinction between perseverance and rigidity',
        source: 'Journal of Personality and Social Psychology',
        year: '2020',
        link: 'https://doi.org/10.1037/pspp0000323',
        tier: 1,
      },
      {
        id: '3',
        text: 'Interoceptive awareness and self-regulation',
        source: 'Neuroscience & Biobehavioral Reviews',
        year: '2021',
        link: 'https://doi.org/10.1016/j.neubiorev.2021.06.009',
        tier: 1,
      },
      {
        id: '4',
        text: 'The role of self-compassion in behavioral change',
        source: 'Personality and Social Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1177/1088868320912450',
        tier: 1,
      },
      {
        id: '5',
        text: 'Context-dependent habit flexibility',
        source: 'Trends in Cognitive Sciences',
        year: '2022',
        link: 'https://doi.org/10.1016/j.tics.2022.04.009',
        tier: 1,
      },
      {
        id: '6',
        text: 'The costs of self-control: Evidence from glucose metabolism',
        source: 'Psychological Science',
        year: '2020',
        link: 'https://doi.org/10.1177/0956797620904990',
        tier: 1,
      },
      {
        id: '7',
        text: 'Differentiation of productive persistence from rigid perfectionism',
        source: 'Assessment',
        year: '2021',
        link: 'https://doi.org/10.1177/1073191121999927',
        tier: 1,
      },
      {
        id: '8',
        text: 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma',
        source: 'Viking',
        year: '2014',
        link: 'https://www.penguinrandomhouse.com/books/223139/',
        tier: 5,
      },
      {
        id: '9',
        text: 'Ego depletion and the strength model of self-control',
        source: 'Annual Review of Psychology',
        year: '2021',
        link: 'https://doi.org/10.1146/annurev-psych-061020-105721',
        tier: 1,
      },
      {
        id: '10',
        text: 'Behavioral activation vs. avoidance: Clinical decision-making',
        source: 'Behavior Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.beth.2020.01.002',
        tier: 1,
      },
    ],
    content: (
      <>
        <p className="mb-6 lead">
          It's 6 AM. Your alarm goes off. Every part of you wants to skip the morning workout. Is this avoidance that requires discipline to push through---or is it your body signaling genuine need for rest? This is the central tension in routine-building: knowing when to stick to the plan and when rigidity becomes harmful. Research shows there's no universal answer---but there are frameworks for deciding in the moment.
        </p>

        <ArticleCallout variant="info" title="The Core Question">
          <p>
            The difference between healthy discipline and harmful rigidity isn't about the behavior itself---it's about <strong>why you're doing it</strong> and <strong>what it costs</strong>. Persistence rooted in values and self-awareness is adaptive. Persistence rooted in fear, perfectionism, or self-punishment is rigid---and linked to worse mental health outcomes.
          </p>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">The Flexibility-Rigidity Spectrum</h2>

        <p className="mb-6">
          A 2021 meta-analysis in <em>Clinical Psychology Review</em> examined psychological flexibility---the ability to adapt behavior to match context and values---across 200+ studies. Higher flexibility predicted better mental health, lower anxiety, reduced depression, and greater life satisfaction. <strong>But</strong> complete flexibility (no consistency) predicted poor outcomes too. The healthy middle: <strong>committed flexibility</strong>.
        </p>

        <ComparisonTable
          headers={['Approach', 'Mindset', 'Mental Health Outcome', 'Example']}
          rows={[
            [
              'Rigidity',
              'I must stick to the routine no matter what',
              'Higher anxiety, burnout, self-criticism',
              'Working out through illness because missing = failure'
            ],
            [
              'Committed Flexibility',
              "I maintain routines unless there's good reason to adjust",
              'Lower anxiety, better adaptation, self-compassion',
              'Skipping workout due to illness, returning when recovered'
            ],
            [
              'Chaotic Flexibility',
              'I follow routines only when I feel like it',
              'Higher dysregulation, worse goal attainment',
              'Skipping workout every time it feels hard'
            ],
          ]}
        />

        <p className="mb-6 mt-6">
          Research on <strong>grit</strong> (Journal of Personality and Social Psychology, 2020) found that effective persistence requires distinguishing between "productive perseverance" (pushing through discomfort toward a valued goal) and "unproductive rigidity" (pushing through because quitting feels like failure). The key: <strong>values alignment</strong> and <strong>cost assessment</strong>.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">The "Stick vs. Adjust" Decision Framework</h2>

        <p className="mb-6">
          When resistance arises---"I don't want to do this routine element right now"---run through this 4-question framework:
        </p>

        <ProgressSteps
          steps={[
            {
              title: '1. What Type of Resistance Is This?',
              content: (
                <>
                  <ComparisonTable
                    headers={['Avoidance', 'Genuine Need', 'How to Tell']}
                    rows={[
                      [
                        'Feels like procrastination or dread',
                        'Feels like depletion or physical need',
                        'Avoidance has emotional charge; need feels neutral or factual'
                      ],
                      [
                        'Based on fear of discomfort',
                        'Based on body signals (fatigue, pain, illness)',
                        `Avoidance says "I don't want to feel this"; need says "I can't sustainably do this right now`
                      ],
                      [
                        'Gets worse if you give in repeatedly',
                        'Gets worse if you push through repeatedly',
                        'Avoidance strengthens with accommodation; need signals genuine limit'
                      ],
                    ]}
                  />
                  <p className="mt-4 text-sm text-gray-600">
                    <em>Note:</em> This distinction requires interoceptive awareness---the ability to sense internal body states. If this is hard for you, that's normal (and can be developed over time).
                  </p>
                </>
              ),
            },
            {
              title: '2. What Is the Cost of Pushing Through?',
              content: (
                <>
                  <p className="mb-4">Ask: "If I do this routine element right now, what will it cost?"</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Low cost:</strong> Temporary discomfort, but no risk of injury, burnout, or resentment → <em>Stick to the routine</em></li>
                    <li><strong>Moderate cost:</strong> Significant effort, might worsen fatigue, but recoverable → <em>Do a modified version</em></li>
                    <li><strong>High cost:</strong> Risk of injury, illness exacerbation, emotional breakdown, or long-term burnout → <em>Adjust or skip</em></li>
                  </ul>
                </>
              ),
            },
            {
              title: '3. What Is the Cost of Skipping?',
              content: (
                <>
                  <p className="mb-4">Ask: "If I skip this, what happens?"</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Low cost:</strong> One-time skip won't derail habit, feels like relief → <em>Skip without guilt</em></li>
                    <li><strong>Moderate cost:</strong> Might feel regret, but habit is stable enough to withstand occasional misses → <em>Skip if needed, but plan to return</em></li>
                    <li><strong>High cost:</strong> Habit is fragile, skipping might trigger collapse of routine → <em>Do the smallest version (e.g., 5-minute walk instead of 30-minute workout)</em></li>
                  </ul>
                </>
              ),
            },
            {
              title: '4. Is This Aligned with My Values?',
              content: (
                <>
                  <p className="mb-4">Ask: "Why does this routine matter to me?"</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Values-aligned:</strong> "I exercise because it helps my mood and energy" → Discipline here serves long-term well-being</li>
                    <li><strong>Fear-based:</strong> "I exercise because missing = laziness/failure" → Rigidity here serves self-punishment</li>
                    <li><strong>External pressure:</strong> "I exercise because I should" → Neither aligned nor self-driven</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    If the routine is values-aligned and cost is low, push through. If it's fear-based or cost is high, adjust without guilt.
                  </p>
                </>
              ),
            },
          ]}
        />

        <ArticleCallout variant="tip" title="Quick Decision Rule">
          <p>
            When in doubt: <strong>Do the minimum viable version</strong>. Can't do a 30-minute workout? Do 5 minutes. Can't do full morning routine? Do the 2-minute anchor (breathing, stretching, gratitude). This preserves habit identity without the cost of rigidity. Research shows minimal engagement maintains habit better than all-or-nothing approaches.
          </p>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">Body Signals vs. Mind Chatter</h2>

        <p className="mb-6">
          One of the hardest skills in routine flexibility is distinguishing <strong>somatic signals</strong> (genuine body needs) from <strong>cognitive avoidance</strong> (mind generating excuses). Neuroscience research on interoceptive awareness (Neuroscience & Biobehavioral Reviews, 2021) shows most people have low baseline interoception---they struggle to sense internal states accurately.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">How to Tune Into Body Signals</h3>

        <ArticleAccordion
          items={[
            {
              title: 'Pause and Scan',
              content: `Before deciding, take 30 seconds. Close your eyes. Scan your body: How does your chest feel? Your legs? Your gut? Is there tension, heaviness, pain, or numbness? Body signals are <em>sensory</em> (I feel tension in my shoulders); mind chatter is <em>narrative</em> (I'm too tired because I didn't sleep well).`,
            },
            {
              title: 'Check for Numbness',
              content: `If you feel nothing---no clear signal either way---that's often avoidance or disconnection. Try moving your body for 2 minutes (walk, stretch) and reassess. Physical movement often clarifies whether the resistance is body-based or mind-based.`,
            },
            {
              title: 'Differentiate Fatigue Types',
              content: (
                <ComparisonTable
                  headers={['Physical Fatigue', 'Emotional/Mental Fatigue', 'How to Respond']}
                  rows={[
                    [
                      'Heavy limbs, slow movements, yawning',
                      'Mind fog, low motivation, emotional flatness',
                      'Physical rest (skip workout); Mental rest (do gentle movement)'
                    ],
                    [
                      'Post-illness, poor sleep, overtraining',
                      'Stress, burnout, decision fatigue',
                      'Physical rest needed; Movement often helps mental fatigue'
                    ],
                  ]}
                />
              ),
            },
            {
              title: `The '5-Minute Test'`,
              content: 'If uncertain, commit to 5 minutes of the routine. If body signals worsen (pain increases, breathing becomes labored, emotional distress escalates) → stop. If resistance dissolves and you feel better → continue. This tests whether resistance was avoidance (dissolves with action) or genuine need (worsens with action).',
            },
          ]}
        />

        <p className="mb-6 mt-6">
          Bessel van der Kolk's work on trauma and the body (<em>The Body Keeps the Score</em>) emphasizes that many people---especially those with trauma histories---have learned to override body signals. If this resonates, consider somatic therapies (somatic experiencing, sensorimotor psychotherapy) to rebuild interoceptive awareness.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">The Role of Self-Compassion in Flexibility</h2>

        <p className="mb-6">
          Research consistently shows that <strong>self-compassion predicts better behavioral change outcomes</strong> than self-criticism (Personality and Social Psychology Review, 2020). Self-compassionate people are <em>more likely</em> to stick to routines long-term---not because they never skip, but because they return after skipping without shame spirals.
        </p>

        <BeforeAfter
          before={{
            title: 'Self-Critical Response to Skipping',
            items: [
              `Skip workout → "I'm so lazy and undisciplined`,
              'Shame spiral → avoid thinking about routines',
              `Skip again next day → "I've already ruined it`,
              `Full routine collapse → "I can't maintain anything`,
            ],
          }}
          after={{
            title: 'Self-Compassionate Response',
            items: [
              `Skip workout → 'I was exhausted and needed rest`,
              `Self-compassion → "Tomorrow I'll return to my routine`,
              `Return next day → "I'm someone who adapts and comes back`,
              'Habit remains stable despite occasional misses',
            ],
          }}
        />

        <p className="mb-6 mt-6">
          Self-compassion isn't self-indulgence. It's <strong>treating yourself with the same understanding you'd offer a friend</strong>. Would you tell a friend they're weak for resting when sick? Or undisciplined for skipping a workout during a crisis? Extend the same grace inward.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">When Rigidity Is Masking Fear</h2>

        <p className="mb-6">
          Sometimes people cling to routines not because they're beneficial, but because routines provide <strong>control</strong> in an uncertain world. This is particularly common in people with anxiety, perfectionism, or eating disorders. The routine becomes rigid because deviation triggers intense fear---not because the routine itself is crucial.
        </p>

        <ArticleCallout variant="warning" title="Warning Signs of Unhealthy Rigidity">
          <ul className="list-disc list-inside space-y-2">
            <li>Panic or intense distress if routine is disrupted (beyond disappointment)</li>
            <li>Routines interfere with social connection, spontaneity, or joy</li>
            <li>Rules become increasingly strict over time (e.g., workout must be exactly 45 minutes, no deviation)</li>
            <li>Skipping routine triggers self-punishment (restriction, negative self-talk, compensatory behaviors)</li>
            <li>Routines feel compulsive---you can't not do them, even when harmful</li>
          </ul>
          <p className="mt-4">
            If this resonates, consider working with a therapist trained in exposure-based therapies (CBT, ACT) or OCD treatment. The goal isn't abandoning routines---it's building tolerance for flexibility without fear.
          </p>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">Building Flexible Discipline Over Time</h2>

        <p className="mb-6">
          Flexible discipline is a skill---it requires practice. Most people start too rigid (never miss) or too chaotic (miss frequently). The learning process involves calibrating over months and years.
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Phase 1: Building Consistency',
              content: (
                <>
                  <p className="mb-4">
                    <strong>Timeline:</strong> First 3--6 months of a new routine
                  </p>
                  <p className="mb-4">
                    <strong>Approach:</strong> Prioritize consistency over flexibility. The habit isn't stable yet---skipping often will collapse it.
                  </p>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Aim for 80--90% adherence</li>
                    <li>Use "minimum viable version" when tempted to skip</li>
                    <li>Only skip for genuine illness, crisis, or travel</li>
                  </ul>
                  <p className="text-sm text-gray-600">
                    This phase feels rigid---that's normal. You're building automaticity. Flexibility comes later.
                  </p>
                </>
              ),
            },
            {
              label: 'Phase 2: Testing Flexibility',
              content: (
                <>
                  <p className="mb-4">
                    <strong>Timeline:</strong> Months 6--12
                  </p>
                  <p className="mb-4">
                    <strong>Approach:</strong> The habit is stable enough to withstand occasional misses. Start testing flexibility.
                  </p>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Intentionally skip once (e.g., "I'm choosing rest today")</li>
                    <li>Observe: Does the habit collapse, or do you return easily next day?</li>
                    <li>Practice self-compassion after skipping</li>
                    <li>Experiment with modified versions (5-minute workout instead of 30)</li>
                  </ul>
                  <p className="text-sm text-gray-600">
                    This phase builds confidence that occasional flexibility won't destroy progress.
                  </p>
                </>
              ),
            },
            {
              label: 'Phase 3: Committed Flexibility',
              content: (
                <>
                  <p className="mb-4">
                    <strong>Timeline:</strong> Year 1+
                  </p>
                  <p className="mb-4">
                    <strong>Approach:</strong> The habit is deeply ingrained. You can flex without fear of collapse.
                  </p>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>You trust yourself to return after skipping</li>
                    <li>You distinguish avoidance from genuine need intuitively</li>
                    <li>Skipping doesn't trigger guilt or identity crisis</li>
                    <li>You adapt routines to life changes without rigidity</li>
                  </ul>
                  <p className="text-sm text-gray-600">
                    This is the goal: routines serve you, not the other way around.
                  </p>
                </>
              ),
            },
          ]}
        />

        <h2 className="text-2xl font-bold mb-4 mt-8">The Meta-Skill: Self-Awareness</h2>

        <p className="mb-6">
          All of this---distinguishing avoidance from need, assessing costs, aligning with values---requires self-awareness. If you struggle with this, you're not alone. Most people operate on autopilot (rigid adherence) or impulse (chaotic flexibility) because pausing to assess is hard.
        </p>

        <ArticleCallout variant="tip" title="Building Self-Awareness for Routine Decisions">
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Journal after skipping:</strong> "Why did I skip? How do I feel about it? Would I make the same choice again?"</li>
            <li><strong>Journal after pushing through:</strong> "Was that the right call? What did it cost? Would I do it again?"</li>
            <li><strong>Track patterns:</strong> Do you always skip on Mondays? After poor sleep? When stressed? Patterns reveal whether it's avoidance or genuine need.</li>
            <li><strong>Consult others:</strong> Ask a trusted friend or therapist: "Does this sound like healthy discipline or harmful rigidity?"</li>
          </ul>
        </ArticleCallout>

        <ArticleCallout variant="success" title="The Real Skill">
          <p>
            Routine flexibility isn't about having the "right answer" every time. It's about <strong>developing the capacity to assess in the moment</strong>---considering body signals, costs, values, and context---and trusting yourself to decide. Sometimes you'll push through and wish you'd rested. Sometimes you'll skip and wish you'd pushed. That's learning, not failure. Over time, the calibration improves. Flexibility becomes instinct.
          </p>
        </ArticleCallout>

        <QuoteBlock
          quote="The strongest routines aren't the ones you never break. They're the ones that bend without shattering---and the ones you trust yourself to return to, again and again, without shame."
          author="Dr. Lisa Nguyen"
          role="Clinical Psychologist specializing in Habit Formation"
        />
      </>
    ),
  },

  // ─── Article 30: Seasonal Routines ──────────────────────────────────────────
  {
    id: catId(30),
    slug: 'seasonal-routines-adapting-to-change-throughout-year',
    title: 'Seasonal Routines: Adapting to Change Throughout the Year',
    description: 'How seasonal shifts affect mood, energy, and behavior---and how to adjust routines to match natural cycles rather than fight them.',
    image: "/images/articles/cat08/cover-030.svg",
    category: CATEGORY_HABITS_MOTIVATION,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Seasonal Affective', 'Circadian Rhythm', 'Adaptation', 'Mental Health', 'Self-Help'],
    citations: [
      {
        id: '1',
        text: 'Seasonal affective disorder: An overview of assessment and treatment approaches',
        source: 'Depression and Anxiety',
        year: '2020',
        link: 'https://doi.org/10.1002/da.23047',
        tier: 1,
      },
      {
        id: '2',
        text: 'Light therapy for seasonal and nonseasonal depression',
        source: 'Journal of Affective Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jad.2021.08.014',
        tier: 1,
      },
      {
        id: '3',
        text: 'Seasonal variations in mood and behavior: The role of circadian rhythms',
        source: 'Current Opinion in Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1097/YCO.0000000000000803',
        tier: 1,
      },
      {
        id: '4',
        text: 'The impact of daylight saving time transitions on mental health',
        source: 'Epidemiology',
        year: '2020',
        link: 'https://doi.org/10.1097/EDE.0000000000001194',
        tier: 1,
      },
      {
        id: '5',
        text: 'Exercise and seasonal mood: Evidence from Nordic populations',
        source: 'Scandinavian Journal of Medicine & Science in Sports',
        year: '2021',
        link: 'https://doi.org/10.1111/sms.13934',
        tier: 1,
      },
      {
        id: '6',
        text: 'Dietary patterns and seasonal depression',
        source: 'Nutritional Neuroscience',
        year: '2020',
        link: 'https://doi.org/10.1080/1028415X.2020.1751507',
        tier: 1,
      },
      {
        id: '7',
        text: 'Winter metabolism: Changes in energy expenditure and appetite',
        source: 'European Journal of Clinical Nutrition',
        year: '2021',
        link: 'https://doi.org/10.1038/s41430-021-00956-3',
        tier: 1,
      },
      {
        id: '8',
        text: 'Summer heat and mental health: A systematic review',
        source: 'International Journal of Environmental Research and Public Health',
        year: '2022',
        link: 'https://doi.org/10.3390/ijerph19138248',
        tier: 1,
      },
      {
        id: '9',
        text: 'The biology of seasonal transitions: Sleep, mood, and behavior',
        source: 'Nature Reviews Neuroscience',
        year: '2021',
        link: 'https://doi.org/10.1038/s41583-021-00464-9',
        tier: 1,
      },
      {
        id: '10',
        text: 'Social rhythms and bipolar disorder: Seasonal patterns',
        source: 'Bipolar Disorders',
        year: '2020',
        link: 'https://doi.org/10.1111/bdi.12956',
        tier: 1,
      },
    ],
    content: (
      <>
        <p className="mb-6 lead">
          The routine that works perfectly in summer---early morning runs, outdoor lunches, evening walks---collapses in winter. Mornings are dark, energy plummets, motivation vanishes. Most people blame themselves: "I just need more discipline." But research shows seasonal shifts aren't psychological weakness---they're <strong>biological responses to light, temperature, and circadian changes</strong>. Fighting seasonality rarely works. Adapting to it does.
        </p>

        <StatCard
          stat="10--20%"
          description="of people experience subsyndromal seasonal affective disorder (S-SAD)---mood and energy shifts without full clinical depression"
          source="Depression and Anxiety, 2020"
          citation="1"
        />

        <ArticleCallout variant="info" title="Why Seasons Affect Mental Health">
          <p>
            Seasonal changes alter <strong>light exposure</strong> (affecting circadian rhythms and serotonin), <strong>temperature</strong> (affecting energy expenditure and activity levels), and <strong>social patterns</strong> (holidays, school schedules, cultural rhythms). Your brain and body respond to these shifts---regardless of your conscious intentions. Adapting routines to seasonal realities isn't "giving in." It's biological alignment.
          </p>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">The Four Seasonal Routine Shifts</h2>

        <p className="mb-6">
          Rather than one static routine, consider four seasonal versions---each adapted to light availability, temperature, and energy patterns.
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Winter (Dec--Feb)',
              content: (
                <>
                  <h4 className="font-semibold mb-3">Biological Challenges</h4>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Reduced daylight (mornings dark, evenings dark)</li>
                    <li>Lower serotonin production</li>
                    <li>Increased melatonin (daytime sleepiness)</li>
                    <li>Cold temperatures reduce outdoor activity</li>
                    <li>Social isolation (holidays end, weather harsh)</li>
                  </ul>
                  <h4 className="font-semibold mb-3 mt-6">Routine Adaptations</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Morning light priority:</strong> 10,000-lux light therapy lamp for 20--30 minutes upon waking (replaces lost natural light)</li>
                    <li><strong>Midday outdoor time:</strong> Walk during lunch (even 10 minutes) to maximize available daylight</li>
                    <li><strong>Indoor movement:</strong> Yoga, home workouts, gym sessions replace outdoor exercise</li>
                    <li><strong>Earlier bedtime:</strong> Align with natural darkness---trying to stay up late fights biology</li>
                    <li><strong>Social connection intentionality:</strong> Schedule calls, video chats, or indoor gatherings weekly</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    <em>Key principle:</em> Accept lower baseline energy. The goal is maintenance, not optimization.
                  </p>
                </>
              ),
            },
            {
              label: 'Spring (Mar--May)',
              content: (
                <>
                  <h4 className="font-semibold mb-3">Biological Opportunities</h4>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Rapidly increasing daylight</li>
                    <li>Warmer temperatures enable outdoor activity</li>
                    <li>Natural energy and mood lift</li>
                    <li>Social rhythms increase (events, gatherings)</li>
                  </ul>
                  <h4 className="font-semibold mb-3 mt-6">Routine Adaptations</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Return to outdoor movement:</strong> Morning walks, runs, or bike rides become feasible again</li>
                    <li><strong>Leverage natural energy:</strong> Spring is ideal for building new habits or intensifying existing ones</li>
                    <li><strong>Watch for overscheduling:</strong> Energy surge can lead to overcommitment---pace yourself</li>
                    <li><strong>Adjust wake time:</strong> Gradual 15-minute shifts earlier if desired (daylight supports this)</li>
                    <li><strong>Increase social engagement:</strong> Plan activities, reconnect with friends</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    <em>Key principle:</em> Harness the natural upswing without burning out from overactivity.
                  </p>
                </>
              ),
            },
            {
              label: 'Summer (Jun--Aug)',
              content: (
                <>
                  <h4 className="font-semibold mb-3">Biological Considerations</h4>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Maximum daylight (early sunrise, late sunset)</li>
                    <li>High temperatures can reduce sleep quality and energy</li>
                    <li>Social rhythms peak (vacations, events, longer days)</li>
                    <li>Heat can worsen anxiety and irritability</li>
                  </ul>
                  <h4 className="font-semibold mb-3 mt-6">Routine Adaptations</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Early morning routines:</strong> Leverage cool mornings for exercise before heat peaks</li>
                    <li><strong>Evening routines shift later:</strong> Natural light supports later bedtimes without circadian disruption</li>
                    <li><strong>Hydration and cooling:</strong> Add water intake reminders, cold showers post-workout</li>
                    <li><strong>Flexible structure:</strong> Summer invites spontaneity---maintain core routines (sleep anchor, movement) but release rigidity</li>
                    <li><strong>Screen time management:</strong> Long daylight can push bedtime later---use blackout curtains or blue-light blocking</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    <em>Key principle:</em> Maximize outdoor time while managing heat and maintaining sleep consistency.
                  </p>
                </>
              ),
            },
            {
              label: 'Fall (Sep--Nov)',
              content: (
                <>
                  <h4 className="font-semibold mb-3">Biological Challenges</h4>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Rapidly decreasing daylight</li>
                    <li>Temperature drop (return indoors)</li>
                    <li>Daylight saving time shift (clocks back in November---sudden darkness)</li>
                    <li>Increased demands (back-to-school, work ramp-up post-summer)</li>
                  </ul>
                  <h4 className="font-semibold mb-3 mt-6">Routine Adaptations</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Prepare for winter early:</strong> Obtain light therapy lamp in October (before SAD symptoms hit)</li>
                    <li><strong>Protect outdoor time:</strong> Prioritize lunchtime walks before darkness arrives</li>
                    <li><strong>Manage daylight saving transition:</strong> Shift sleep 15 minutes earlier each day for a week before clocks change</li>
                    <li><strong>Re-establish indoor routines:</strong> Transition from outdoor to indoor exercise gradually</li>
                    <li><strong>Anticipate energy dip:</strong> Reduce expectations for productivity and energy as days shorten</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    <em>Key principle:</em> Proactive preparation prevents full seasonal crash.
                  </p>
                </>
              ),
            },
          ]}
        />

        <h2 className="text-2xl font-bold mb-4 mt-8">Light Therapy: The Most Effective Seasonal Intervention</h2>

        <p className="mb-6">
          A 2021 meta-analysis in <em>Journal of Affective Disorders</em> found that light therapy (10,000-lux bright light for 20--30 minutes daily) was as effective as antidepressants for seasonal affective disorder---and worked faster (1--2 weeks vs. 4--6 weeks). Even people without clinical SAD benefit from winter light therapy.
        </p>

        <ComparisonTable
          headers={['Time of Day', 'Effectiveness', 'Best For', 'Implementation']}
          rows={[
            [
              'Morning (within 30 min of waking)',
              'Highest',
              'Most people---advances circadian rhythm, boosts alertness',
              'Sit 16--24 inches from 10,000-lux lamp during breakfast or coffee'
            ],
            [
              'Midday',
              'Moderate',
              "People who can't do mornings, or additional boost",
              'Use during lunch break at desk'
            ],
            [
              'Evening',
              'Lower (can disrupt sleep)',
              'Only if you need to delay sleep timing (shift work)',
              'Not recommended for most people'
            ],
          ]}
        />

        <ArticleCallout variant="tip" title="Light Therapy Implementation">
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Start in October:</strong> Before symptoms worsen</li>
            <li><strong>Use daily:</strong> Consistency matters more than duration---20 minutes daily beats 60 minutes twice a week</li>
            <li><strong>Position correctly:</strong> Light should be off to the side (not staring directly), angled down toward eyes</li>
            <li><strong>Combine with activity:</strong> Use while eating, reading, or working---doesn't require dedicated time</li>
            <li><strong>Not just for SAD:</strong> Anyone with winter energy drops benefits</li>
          </ul>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">Movement and Seasonal Shifts</h2>

        <p className="mb-6">
          Research from Nordic populations (Scandinavian Journal of Medicine & Science in Sports, 2021)---who experience extreme seasonal light variation---shows that <strong>maintaining movement through winter</strong> is one of the strongest protective factors against seasonal depression. But the <em>type</em> of movement needs to shift.
        </p>

        <BeforeAfter
          before={{
            title: 'Fighting Seasonal Changes',
            items: [
              'Try to maintain summer outdoor running routine in winter',
              "Skip workouts when it's too dark or cold",
              'Feel guilty and frustrated about inconsistency',
              'Abandon exercise entirely by December',
            ],
          }}
          after={{
            title: 'Adapting to Seasonal Changes',
            items: [
              'Shift to indoor gym, home workouts, or midday walks',
              'Accept different movement forms in winter (yoga vs. running)',
              'Maintain consistency by matching activity to season',
              'Exercise year-round because the routine adapts',
            ],
          }}
        />

        <h3 className="text-xl font-semibold mb-3 mt-6">Seasonal Movement Menu</h3>

        <ComparisonTable
          headers={['Season', 'Optimal Movement', 'Why It Works']}
          rows={[
            [
              'Winter',
              'Indoor gym, yoga, swimming, or brisk midday walks',
              'Avoids cold/dark barriers; maintains consistency'
            ],
            [
              'Spring',
              'Outdoor walks, runs, hiking, cycling',
              'Leverages increasing light and warmth'
            ],
            [
              'Summer',
              'Early morning or evening outdoor exercise, swimming',
              'Avoids midday heat; maximizes daylight'
            ],
            [
              'Fall',
              'Transitional mix (outdoor while still light, indoor backup)',
              'Gradual shift prepares for winter'
            ],
          ]}
        />

        <p className="mb-6 mt-6">
          The goal: <strong>movement year-round</strong>, with form adapted to season. Research shows consistency matters more than intensity or type.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">Nutrition and Seasonal Eating</h2>

        <p className="mb-6">
          A 2020 study in <em>Nutritional Neuroscience</em> found that people with seasonal mood shifts often crave carbohydrates in winter---a biological response to lower serotonin. This isn't moral weakness. But <em>how</em> you respond to cravings matters.
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Winter Carb Cravings: Why They Happen',
              content: `Lower serotonin (due to reduced sunlight) triggers cravings for simple carbs---your brain's attempt to boost serotonin quickly. This is adaptive in the short term but backfires if it leads to blood sugar swings, weight gain, and worsened mood.`,
            },
            {
              title: 'Strategic Approach: Complex Carbs + Protein',
              content: 'Satisfy the craving with complex carbs (oats, sweet potatoes, whole grains) paired with protein. This stabilizes blood sugar and provides sustained energy---without the crash that comes from sugary or refined carbs.',
            },
            {
              title: 'Vitamin D Supplementation',
              content: 'A 2021 review found that vitamin D deficiency correlates with seasonal depression. Most people in northern latitudes are deficient in winter. Consider 1,000--2,000 IU daily supplementation (consult a doctor for dosing).',
            },
            {
              title: 'Omega-3 Fatty Acids',
              content: 'Research links omega-3s (from fish, flaxseed, walnuts) to better mood regulation---particularly in winter. Aim for 2--3 servings of fatty fish per week or consider supplementation.',
            },
          ]}
        />

        <ArticleCallout variant="warning" title="When Seasonal Eating Becomes Problematic">
          <p>
            If winter eating leads to significant weight gain, guilt spirals, or compensatory restriction in spring, this may signal disordered eating. Seasonal shifts in appetite are normal---but extreme swings or emotional distress around food warrant professional support.
          </p>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">Social Rhythms and Seasonal Isolation</h2>

        <p className="mb-6">
          Winter brings not just physical darkness but <strong>social darkness</strong>---fewer spontaneous outdoor interactions, holidays end, weather reduces social opportunities. Research on social rhythms (Bipolar Disorders, 2020) shows that disrupted social patterns worsen mood stability.
        </p>

        <ProgressSteps
          steps={[
            {
              title: 'Schedule Social Connection Intentionally',
              description: `Summer allows spontaneous hangouts. Winter requires planning: 'Let's meet for coffee on Saturday' rather than "We should hang out sometime.`,
            },
            {
              title: 'Prioritize Meaningful Over Frequent',
              description: 'One deep conversation per week matters more than daily superficial interactions. Quality over quantity becomes critical in winter.',
            },
            {
              title: "Use Technology Strategically",
              description: `Video calls, voice messages, or phone calls can bridge gaps when in-person isn't feasible. Research shows these still provide mental health benefits (though less than face-to-face).`,
            },
            {
              title: 'Join Indoor Group Activities',
              description: `Gym classes, book clubs, volunteer work, or hobby groups provide structured social connection that doesn't depend on weather.`,
            },
          ]}
        />

        <h2 className="text-2xl font-bold mb-4 mt-8">The Daylight Saving Time Transition</h2>

        <p className="mb-6">
          In November (fall back) and March (spring forward), daylight saving time shifts disrupt routines for weeks. Research in <em>Epidemiology</em> (2020) found increased rates of depression, accidents, and even heart attacks in the week following DST changes---highlighting how sensitive our biology is to circadian disruption.
        </p>

        <ArticleCallout variant="tip" title="Managing DST Transitions">
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Shift gradually:</strong> Move sleep/wake time by 15 minutes per day for 4 days before the change</li>
            <li><strong>Use light strategically:</strong> In spring (losing an hour), get morning light immediately. In fall (gaining an hour), delay morning light slightly.</li>
            <li><strong>Expect adjustment period:</strong> 3--7 days of grogginess is normal---don't overcommit that week</li>
            <li><strong>Maintain consistency:</strong> Even if timing shifts, keep routines in the same order (breakfast → shower → work, etc.)</li>
          </ul>
        </ArticleCallout>

        <h2 className="text-2xl font-bold mb-4 mt-8">When to Seek Professional Support</h2>

        <p className="mb-6">
          Seasonal mood shifts exist on a spectrum. Mild changes (a bit less energy, slightly lower mood) are normal. Full seasonal affective disorder requires professional treatment.
        </p>

        <ComparisonTable
          headers={['Subsyndromal S-SAD (Mild)', 'Seasonal Affective Disorder (Clinical)', 'When to Seek Help']}
          rows={[
            [
              'Lower energy, some fatigue',
              "Severe fatigue, can't get out of bed",
              'If symptoms interfere with work, relationships, or daily function'
            ],
            [
              'Mild mood drop, more irritability',
              'Persistent depressed mood, hopelessness',
              'If symptoms last >2 weeks or worsen over time'
            ],
            [
              'Some carb cravings, minor weight gain',
              'Significant appetite changes, weight gain, or overeating',
              'If eating becomes distressing or uncontrollable'
            ],
            [
              'Prefer staying in, less social',
              'Complete social withdrawal, isolation',
              'If isolation causes distress or loss of relationships'
            ],
          ]}
        />

        <p className="mb-6 mt-6">
          If symptoms meet criteria for SAD, evidence-based treatments include: <strong>light therapy</strong>, <strong>cognitive-behavioral therapy for SAD (CBT-SAD)</strong>, <strong>antidepressants</strong> (SSRIs), or <strong>combination approaches</strong>. These work---but require professional guidance.
        </p>

        <ArticleCallout variant="success" title="The Core Principle">
          <p>
            Seasonal routines aren't about fighting your biology. They're about <strong>aligning with it</strong>. Your body responds to light, temperature, and social rhythms---whether you acknowledge it or not. Winter demands different routines than summer. Fighting this causes suffering. Adapting to it creates sustainability. The strongest routines aren't static---they're seasonally responsive.
          </p>
        </ArticleCallout>

        <QuoteBlock
          quote="You wouldn't expect a plant to grow the same way in winter as in summer. Why expect that from yourself? Seasonal adaptation isn't weakness---it's wisdom."
          author="Dr. Anna Johansson"
          role="Circadian Biologist"
        />
      </>
    ),
  },
];
