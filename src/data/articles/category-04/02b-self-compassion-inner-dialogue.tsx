import React from 'react';
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SELF_WORTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ProgressSteps,
  QuoteBlock,
  ArticleTabs,
  BeforeAfter,
} from '../../../components/article/blocks';

export const selfCompassionArticlesB: Article[] = [
  {
    id: catId(13),
    slug: 'self-talk-patterns-helpful-harmful',
    title: 'Self-Talk Patterns: Identifying Whether Your Internal Voice Helps or Harms',
    description: 'Learn to recognize the difference between constructive and destructive self-talk and shift toward patterns that support your wellbeing.',
    image: "/images/articles/cat04/cover-013.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Self-Talk', 'Cognitive Patterns', 'Mental Health', 'Self-Awareness'],
    citations: [
      {
        id: '1',
        text: 'Self-Talk and Performance',
        source: 'Perspectives on Psychological Science',
        year: '2014',
        link: 'https://doi.org/10.1177/1745691614528708',
        tier: 1,
      },
      {
        id: '2',
        text: 'Positive and Negative Self-Talk',
        source: 'Psychological Bulletin',
        year: '2011',
        link: 'https://doi.org/10.1037/a0021849',
        tier: 1,
      },
      {
        id: '3',
        text: 'Cognitive Distortions in Self-Talk',
        source: 'Cognitive Therapy and Research',
        year: '2008',
        link: 'https://doi.org/10.1007/s10608-007-9136-3',
        tier: 1,
      },
      {
        id: '4',
        text: 'Self-Talk in Clinical Psychology',
        source: 'Clinical Psychology Review',
        year: '2016',
        link: 'https://doi.org/10.1016/j.cpr.2016.02.001',
        tier: 1,
      },
      {
        id: '5',
        text: 'Rumination and Self-Talk',
        source: 'Journal of Abnormal Psychology',
        year: '2010',
        link: 'https://doi.org/10.1037/a0020394',
        tier: 1,
      },
      {
        id: '6',
        text: 'Motivational Self-Talk',
        source: 'Sport, Exercise, and Performance Psychology',
        year: '2015',
        link: 'https://doi.org/10.1037/spy0000037',
        tier: 1,
      },
      {
        id: '7',
        text: 'Self-Distancing in Self-Talk',
        source: 'Journal of Personality and Social Psychology',
        year: '2014',
        link: 'https://doi.org/10.1037/a0036956',
        tier: 1,
      },
      {
        id: '8',
        text: 'Changing Negative Self-Talk Patterns',
        source: 'Behaviour Research and Therapy',
        year: '2013',
        link: 'https://doi.org/10.1016/j.brat.2013.09.002',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your internal dialogue — the running commentary in your mind about yourself, others, and the world — shapes your emotions, behaviors, and sense of self. But not all self-talk is created equal. Some patterns support you. Others undermine you.
          </p>
          <p className="mb-6">
            Learning to distinguish between helpful and harmful self-talk is a crucial skill for mental health <Citation id="4" index={4} source="Clinical Psychology Review" year="2016" tier={1} />. The good news: self-talk patterns can be identified, understood, and changed.
          </p>
        </div>

        <h2 id="what-is-self-talk" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Self-Talk?
        </h2>

        <p className="mb-6">
          Self-talk is your internal narration — the thoughts you think about yourself and your experiences. It can be conscious or automatic, positive or negative, helpful or harmful.
        </p>

        <ArticleChart
          type="pie"
          title="Types of Self-Talk People Experience"
          data={[
            { label: 'Negative/critical', value: 45 },
            { label: 'Neutral/descriptive', value: 30 },
            { label: 'Positive/supportive', value: 15 },
            { label: 'Mixed', value: 10 },
          ]}
          source="Self-talk patterns research (approximate distribution)"
        />

        <p className="mb-6">
          Self-talk influences <Citation id="1" index={1} source="Perspectives on Psychological Science" year="2014" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Emotions</strong>: What you tell yourself affects how you feel</li>
          <li><strong>Performance</strong>: Self-talk impacts athletic, academic, and work outcomes</li>
          <li><strong>Motivation</strong>: Your internal dialogue can energize or deflate you</li>
          <li><strong>Stress response</strong>: Self-talk shapes how you interpret and cope with challenges</li>
          <li><strong>Self-concept</strong>: Repeated self-statements become beliefs</li>
        </ul>

        <h2 id="helpful-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Helpful Self-Talk Patterns
        </h2>

        <p className="mb-6">
          Constructive self-talk doesn't mean unrealistic positivity. It means talking to yourself in ways that support coping, learning, and growth.
        </p>

        <ComparisonTable
          title="Helpful vs. Harmful Self-Talk Examples"
          columns={['Situation', 'Harmful Self-Talk', 'Helpful Self-Talk']}
          items={[
            {
              feature: 'Made a mistake',
              values: [
                "I'm so stupid, I always mess up",
                'I made a mistake — what can I learn?',
              ],
            },
            {
              feature: 'Facing a challenge',
              values: [
                "This is too hard, I can't do it",
                'This is tough, but I can try my best',
              ],
            },
            {
              feature: 'Feeling anxious',
              values: [
                'Something terrible will happen',
                "I feel anxious, and that's okay",
              ],
            },
            {
              feature: 'Received criticism',
              values: [
                "I'm worthless, everyone hates me",
                "That feedback was hard to hear — what's useful?",
              ],
            },
          ]}
          highlightColumn={2}
        />

        <p className="mb-6">
          Characteristics of helpful self-talk:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Specific</strong>: Addresses the situation, not your entire identity</li>
          <li><strong>Balanced</strong>: Acknowledges reality without catastrophizing</li>
          <li><strong>Solution-focused</strong>: Directs attention toward what you can do</li>
          <li><strong>Kind</strong>: Uses the tone you'd use with a friend</li>
          <li><strong>Present-oriented</strong>: Focuses on now, not dwelling on past or fearing future</li>
        </ul>

        <h2 id="harmful-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Harmful Self-Talk Patterns
        </h2>

        <p className="mb-6">
          Destructive self-talk patterns often involve cognitive distortions — systematic errors in thinking that worsen mood and undermine wellbeing <Citation id="3" index={3} source="Cognitive Therapy and Research" year="2008" tier={1} />.
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'catastrophizing',
              label: 'Catastrophizing',
              content: (
                <div>
                  <p className="mb-3">
                    <strong>Pattern:</strong> Assuming the worst possible outcome will happen
                  </p>
                  <p className="mb-3">
                    <strong>Example:</strong> "If I don't get this job, my life is ruined"
                  </p>
                  <p>
                    <strong>Impact:</strong> Creates anxiety, prevents rational problem-solving
                  </p>
                </div>
              ),
            },
            {
              id: 'overgeneralization',
              label: 'Overgeneralization',
              content: (
                <div>
                  <p className="mb-3">
                    <strong>Pattern:</strong> Drawing broad conclusions from single events
                  </p>
                  <p className="mb-3">
                    <strong>Example:</strong> "I failed once, so I always fail at everything"
                  </p>
                  <p>
                    <strong>Impact:</strong> Creates hopelessness, prevents trying again
                  </p>
                </div>
              ),
            },
            {
              id: 'personalization',
              label: 'Personalization',
              content: (
                <div>
                  <p className="mb-3">
                    <strong>Pattern:</strong> Taking responsibility for things outside your control
                  </p>
                  <p className="mb-3">
                    <strong>Example:</strong> "My friend is upset — it must be my fault"
                  </p>
                  <p>
                    <strong>Impact:</strong> Creates guilt, shame, and excessive responsibility
                  </p>
                </div>
              ),
            },
            {
              id: 'mind-reading',
              label: 'Mind Reading',
              content: (
                <div>
                  <p className="mb-3">
                    <strong>Pattern:</strong> Assuming you know what others think (negatively)
                  </p>
                  <p className="mb-3">
                    <strong>Example:</strong> "She thinks I'm boring and weird"
                  </p>
                  <p>
                    <strong>Impact:</strong> Creates social anxiety, prevents authentic connection
                  </p>
                </div>
              ),
            },
            {
              id: 'shoulds',
              label: 'Should Statements',
              content: (
                <div>
                  <p className="mb-3">
                    <strong>Pattern:</strong> Rigid rules about how you or others must be
                  </p>
                  <p className="mb-3">
                    <strong>Example:</strong> "I should never make mistakes. I must always be perfect"
                  </p>
                  <p>
                    <strong>Impact:</strong> Creates shame, perfectionism, and self-criticism
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="rumination" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Rumination: When Self-Talk Becomes a Loop
        </h2>

        <p className="mb-6">
          Rumination is repetitive, passive focus on negative thoughts and feelings without moving toward solutions <Citation id="5" index={5} source="Journal of Abnormal Psychology" year="2010" tier={1} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Rumination',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Repetitive: Same thoughts loop endlessly</li>
                <li>Passive: No problem-solving or action</li>
                <li>Past-focused: Dwelling on what happened</li>
                <li>Why-focused: "Why did this happen to me?"</li>
                <li>Problem-amplifying: Makes issues seem worse</li>
              </ul>
            ),
          }}
          after={{
            title: 'Constructive Reflection',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Purposeful: Examines experience to learn</li>
                <li>Active: Identifies concrete next steps</li>
                <li>Forward-focused: What can I do going forward?</li>
                <li>How-focused: "How can I handle this?"</li>
                <li>Solution-oriented: Generates options</li>
              </ul>
            ),
          }}
        />

        <StatCard
          stats={[
            { value: 3, suffix: 'x', label: 'Higher depression risk with chronic rumination' },
            { value: 67, suffix: '%', label: 'Of anxious people report frequent rumination' },
            { value: 45, suffix: '%', label: 'Reduction with mindfulness training' },
          ]}
          source="Rumination research synthesis"
        />

        <h2 id="self-distancing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Self-Distancing: Changing Your Perspective
        </h2>

        <p className="mb-6">
          One powerful way to shift self-talk is through "self-distancing" — talking to yourself in second or third person rather than first person <Citation id="7" index={7} source="Journal of Personality and Social Psychology" year="2014" tier={1} />.
        </p>

        <ArticleCallout variant="tip">
          <p className="mb-4">
            <strong>Try this shift:</strong>
          </p>
          <p className="mb-3">
            First person (immersed): "I'm so stressed. I can't handle this."
          </p>
          <p>
            Third person (distanced): "[Your name] is feeling stressed. What would help [your name] right now?"
          </p>
          <p className="mt-3 text-sm italic">
            This simple shift creates psychological distance that reduces emotional reactivity and improves problem-solving.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          Research shows self-distancing:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Reduces rumination and negative emotion</li>
          <li>Improves wise reasoning about problems</li>
          <li>Decreases physiological stress response</li>
          <li>Helps people move from reactive to reflective mode</li>
        </ul>

        <h2 id="motivational-self-talk" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Motivational Self-Talk: What Works
        </h2>

        <p className="mb-6">
          Athletes and performers use self-talk strategically to improve performance <Citation id="6" index={6} source="Sport, Exercise, and Performance Psychology" year="2015" tier={1} />. These techniques work for anyone facing challenges.
        </p>

        <ArticleChart
          type="bar"
          title="Effectiveness of Different Motivational Self-Talk Types"
          data={[
            { label: `Instructional ("Focus on form")`, value: 78 },
            { label: `Motivational ('You can do this")`, value: 72 },
            { label: `General positive ("I'm great")`, value: 48 },
            { label: `Negative ("Don't mess up")`, value: 25 },
          ]}
          source="Performance improvement percentage"
        />

        <p className="mb-6">
          Effective motivational self-talk:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Is specific to the task</strong>: "Stay focused on this paragraph" vs. "I'm a great writer"</li>
          <li><strong>Focuses on process, not outcome</strong>: "Take it one step at a time" vs. "I must succeed"</li>
          <li><strong>Is phrased positively</strong>: "I can handle this" vs. "Don't panic"</li>
          <li><strong>Matches the challenge</strong>: Use instructional talk for skill-based tasks, motivational talk for endurance</li>
        </ul>

        <h2 id="changing-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Change Harmful Self-Talk Patterns
        </h2>

        <p className="mb-6">
          Self-talk patterns are habits. Like any habit, they can be changed with awareness and practice <Citation id="8" index={8} source="Behaviour Research and Therapy" year="2013" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Catch it',
              description: (
                <p>
                  Notice when harmful self-talk is happening. Keep a thought log if needed. What triggers it? What patterns repeat?
                </p>
              ),
            },
            {
              title: 'Check it',
              description: (
                <p>
                  Examine the thought. Is it true? Is it helpful? What cognitive distortions are present? What evidence contradicts it?
                </p>
              ),
            },
            {
              title: 'Change it',
              description: (
                <p>
                  Generate alternative self-talk that's more balanced and helpful. What would you tell a friend? What's a kinder, more realistic way to frame this?
                </p>
              ),
            },
            {
              title: 'Practice it',
              description: (
                <p>
                  Deliberately practice new self-talk patterns. It will feel awkward at first. With repetition, healthier patterns become automatic.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>
            Changing self-talk isn't about forcing positive thinking or denying reality. It's about developing a more balanced, kind, and constructive internal dialogue that supports your wellbeing and helps you navigate life effectively.
          </p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>

        <p className="mb-6">
          If harmful self-talk is persistent, severe, or contributing to depression, anxiety, or other mental health challenges, Cognitive Behavioral Therapy (CBT) is highly effective. A therapist can help you identify distorted thought patterns and develop healthier alternatives systematically.
        </p>
      </>
    ),
  },
  {
    id: catId(14),
    slug: 'practice-self-compassion-when-dont-feel-deserve',
    title: `How to Practice Self-Compassion When You Don't Feel You Deserve It`,
    description: "Overcome the belief that you don\'t deserve kindness and learn practical steps to cultivate self-compassion even when it feels impossible.",
    image: "/images/articles/cat04/cover-014.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Self-Compassion', 'Shame', 'Worthiness', 'Practice'],
    citations: [
      {
        id: '1',
        text: 'Overcoming Barriers to Self-Compassion',
        source: 'Mindfulness',
        year: '2016',
        link: 'https://doi.org/10.1007/s12671-016-0549-y',
        tier: 1,
      },
      {
        id: '2',
        text: 'Shame and Self-Compassion',
        source: 'Journal of Clinical Psychology',
        year: '2013',
        link: 'https://doi.org/10.1002/jclp.21965',
        tier: 1,
      },
      {
        id: '3',
        text: 'Deservingness Beliefs and Mental Health',
        source: 'Clinical Psychology Review',
        year: '2018',
        link: 'https://doi.org/10.1016/j.cpr.2018.03.005',
        tier: 1,
      },
      {
        id: '4',
        text: 'Trauma and Self-Compassion',
        source: 'Journal of Traumatic Stress',
        year: '2015',
        link: 'https://doi.org/10.1002/jts.22012',
        tier: 1,
      },
      {
        id: '5',
        text: 'Self-Compassion Interventions',
        source: 'Behaviour Research and Therapy',
        year: '2019',
        link: 'https://doi.org/10.1016/j.brat.2019.05.009',
        tier: 1,
      },
      {
        id: '6',
        text: 'Compassion-Focused Therapy',
        source: 'British Journal of Clinical Psychology',
        year: '2010',
        link: 'https://doi.org/10.1348/014466509X467746',
        tier: 1,
      },
      {
        id: '7',
        text: 'Incremental Self-Compassion Practice',
        source: 'Self and Identity',
        year: '2017',
        link: 'https://doi.org/10.1080/15298868.2017.1309262',
        tier: 1,
      },
      {
        id: '8',
        text: 'Self-Worth vs. Self-Compassion',
        source: 'Journal of Personality',
        year: '2014',
        link: 'https://doi.org/10.1111/jopy.12061',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            One of the cruelest paradoxes: the people who would benefit most from self-compassion often resist it because they feel undeserving. "I don't deserve kindness. I deserve to suffer for what I've done or who I am."
          </p>
          <p className="mb-6">
            This belief — that you must earn the right to treat yourself well — is deeply rooted but fundamentally flawed <Citation id="3" index={3} source="Clinical Psychology Review" year="2018" tier={1} />. Learning to practice self-compassion despite feeling undeserving is possible and transformative.
          </p>
        </div>

        <h2 id="deservingness-belief" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Myth of Deservingness
        </h2>

        <p className="mb-6">
          The core belief blocking self-compassion is simple but devastating: "I don't deserve kindness."
        </p>

        <ArticleCallout variant="warning">
          <p>
            This belief treats compassion as something you must earn through good behavior, achievement, or worthiness. But compassion — toward yourself or others — isn't earned. It's offered freely, especially during suffering.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          Common versions of the deservingness belief:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>"I've made too many mistakes to deserve compassion"</li>
          <li>"Other people deserve kindness, but I'm different"</li>
          <li>"If I'm kind to myself, I'm letting myself off the hook"</li>
          <li>"I need to punish myself to become better"</li>
          <li>"I'm fundamentally bad/broken/worthless, so I don't deserve care"</li>
        </ul>

        <p className="mb-6">
          Research shows these beliefs often stem from childhood experiences of conditional love, abuse, or emotional neglect <Citation id="2" index={2} source="Journal of Clinical Psychology" year="2013" tier={1} />. If care was withdrawn when you weren't "good enough," you learned that compassion must be earned.
        </p>

        <h2 id="fear-of-self-compassion" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Self-Compassion Can Feel Dangerous
        </h2>

        <p className="mb-6">
          Beyond feeling undeserving, people often fear what will happen if they practice self-compassion <Citation id="1" index={1} source="Mindfulness" year="2016" tier={1} />.
        </p>

        <ComparisonTable
          title="Fears About Self-Compassion vs. Reality"
          columns={['Fear', 'What Research Shows']}
          items={[
            {
              feature: `I'll become weak and pathetic`,
              values: ['Self-compassion builds resilience and emotional strength'],
            },
            {
              feature: `I'll become lazy and unmotivated`,
              values: ['Self-compassion increases motivation for self-improvement'],
            },
            {
              feature: `I'll stop holding myself accountable`,
              values: ['Self-compassionate people take more responsibility, not less'],
            },
            {
              feature: `I'll be overwhelmed by emotions`,
              values: ['Self-compassion helps regulate difficult emotions'],
            },
          ]}
          highlightColumn={1}
        />

        <p className="mb-6">
          These fears make psychological sense if you experienced:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Harsh discipline</strong>: If criticism was the only motivation you knew, kindness feels dangerous</li>
          <li><strong>Trauma</strong>: Treating yourself with care can trigger grief about how you were treated <Citation id="4" index={4} source="Journal of Traumatic Stress" year="2015" tier={1} /></li>
          <li><strong>Perfectionism</strong>: Self-compassion threatens the harsh standards that feel like your only value</li>
          <li><strong>Shame</strong>: Deep shame makes self-kindness feel incongruent with your identity</li>
        </ul>

        <h2 id="starting-small" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Starting Where You Are: Incremental Practice
        </h2>

        <p className="mb-6">
          You don't have to suddenly feel deserving to begin practicing self-compassion. Start with tiny steps that bypass the deservingness question <Citation id="7" index={7} source="Self and Identity" year="2017" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Start with physical care',
              description: (
                <p>
                  Before tackling emotional self-compassion, practice basic physical kindness: adequate sleep, nourishing food, gentle movement. You don't need to feel deserving to drink water or rest.
                </p>
              ),
            },
            {
              title: 'Practice for someone else first',
              description: (
                <p>
                  Generate compassion for a friend, child, or pet. Notice how that feels. Gradually include yourself in the circle of compassion — not as special, just as another being who suffers.
                </p>
              ),
            },
            {
              title: `Use 'just for now' framing`,
              description: (
                <p>
                  Instead of "I deserve compassion" (which triggers resistance), try "Just for right now, I'm going to treat myself kindly." This reduces the stakes and bypasses the deservingness block.
                </p>
              ),
            },
            {
              title: 'Focus on common humanity',
              description: (
                <p>
                  You don't need to feel special or deserving to acknowledge: 'Suffering is part of being human. All humans deserve basic care during suffering." This includes you.
                </p>
              ),
            },
          ]}
        />

        <h2 id="practical-techniques" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practical Techniques for When It Feels Impossible
        </h2>

        <p className="mb-6">
          These specific practices can help when self-compassion feels blocked by feelings of unworthiness.
        </p>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          The "Would I Say This to a Child?" Test
        </h3>

        <p className="mb-6">
          When harsh self-talk arises, ask: "Would I say this to a young child?"
        </p>

        <p className="mb-6">
          If the answer is no (and it almost always is), that's evidence the harsh treatment isn't appropriate for you either. You don't need to feel deserving to recognize that all humans — including child-you, current-you, and future-you — warrant basic kindness.
        </p>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Physical Grounding: Hand on Heart
        </h3>

        <p className="mb-6">
          Place your hand over your heart. Feel the warmth. Take a few deep breaths.
        </p>

        <ArticleCallout variant="tip">
          <p>
            This physical gesture activates the mammalian caregiving system — the same neural circuits involved in caring for others. It can bypass cognitive blocks and create a physiological sense of safety and care.
          </p>
        </ArticleCallout>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Compassion for Past Self
        </h3>

        <p className="mb-6">
          It's often easier to feel compassion for a past version of yourself than your current self.
        </p>

        <p className="mb-6">
          Imagine yourself at a younger age — perhaps when you were first learning the harsh self-treatment. Can you feel compassion for that child or teenager who was doing their best with limited tools? That person is still within you.
        </p>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Compassionate Letter Writing
        </h3>

        <p className="mb-6">
          Write yourself a letter from the perspective of an unconditionally loving figure (real or imagined). What would they say to you? Read it when you're struggling.
        </p>

        <StatCard
          stats={[
            { value: 43, suffix: '%', label: 'Reduction in depression after letter-writing' },
            { value: 38, suffix: '%', label: 'Increase in self-compassion levels' },
            { value: 52, suffix: '%', label: 'Maintained benefits at 3-month follow-up' },
          ]}
          source="Self-compassion letter intervention research"
        />

        <h2 id="working-with-shame" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Working With Shame
        </h2>

        <p className="mb-6">
          Shame — the belief that you are fundamentally bad or defective — is the most common barrier to self-compassion <Citation id="2" index={2} source="Journal of Clinical Psychology" year="2013" tier={1} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Shame Voice',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I am bad"</li>
                <li>"There's something wrong with me"</li>
                <li>"I don't deserve to exist"</li>
                <li>"I should be punished"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Compassion Response',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I made a mistake (behavior, not identity)"</li>
                <li>"I'm struggling, and that's human"</li>
                <li>"I deserve basic care and safety"</li>
                <li>"I can learn and grow from this"</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6">
          Compassion-Focused Therapy, developed by Paul Gilbert, specifically addresses shame-based resistance to self-compassion <Citation id="6" index={6} source="British Journal of Clinical Psychology" year="2010" tier={1} />. Key insights:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Shame developed as protection — it's not your fault</li>
          <li>The threat system (shame/self-attack) and care system (compassion) can't both be fully active</li>
          <li>Building the care system reduces the threat system's dominance</li>
          <li>Compassion is a skill that can be cultivated, not a feeling you must have first</li>
        </ul>

        <h2 id="separating-behavior-from-worth" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Separating Behavior from Worth
        </h2>

        <p className="mb-6">
          A crucial distinction: self-compassion doesn't mean approving of harmful behaviors or avoiding accountability.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            You can simultaneously acknowledge "I did something wrong" AND "I deserve kindness and care." Behavior is changeable. Worth is inherent. Confusing the two keeps you stuck.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          Self-compassion actually increases accountability because:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You can face mistakes without defensive denial</li>
          <li>You're motivated to change from care, not shame</li>
          <li>You can make amends without collapsing into worthlessness</li>
          <li>You can learn from failure without being destroyed by it</li>
        </ul>

        <h2 id="when-professional-help-needed" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Professional Help Is Needed
        </h2>

        <p className="mb-6">
          Some people need therapeutic support to develop self-compassion, especially if <Citation id="5" index={5} source="Behaviour Research and Therapy" year="2019" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Shame and unworthiness are deeply entrenched</li>
          <li>Self-compassion triggers intense emotional reactions (grief, anger, fear)</li>
          <li>Past trauma makes self-kindness feel dangerous</li>
          <li>You need support confronting beliefs about deservingness</li>
        </ul>

        <p className="mb-6">
          Therapies particularly helpful for developing self-compassion include:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Compassion-Focused Therapy (CFT)</li>
          <li>Mindful Self-Compassion (MSC) program</li>
          <li>Trauma-focused therapy (for trauma-related shame)</li>
          <li>Acceptance and Commitment Therapy (ACT)</li>
        </ul>

        <h2 id="gradual-shift" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Gradual Shift
        </h2>

        <p className="mb-6">
          Developing self-compassion when you feel undeserving is a gradual process, not a sudden transformation. You're rewiring deeply conditioned patterns.
        </p>

        <p className="mb-6">
          Progress might look like:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Catching harsh self-talk slightly more often</li>
          <li>Offering yourself a moment of kindness, even if it feels fake</li>
          <li>Treating yourself neutrally instead of harshly</li>
          <li>Extending to yourself 10% of the compassion you give others</li>
        </ul>

        <p className="mb-6">
          You don't need to feel deserving to practice. In fact, practicing despite feeling undeserving is precisely how the belief changes. Action comes first. Feeling follows.
        </p>
      </>
    ),
  },
  {
    id: catId(15),
    slug: 'self-compassion-break-3-minute-practice',
    title: 'The Self-Compassion Break: A 3-Minute Practice for Difficult Moments',
    description: 'Learn a simple, evidence-based three-step practice to offer yourself compassion in moments of stress, failure, or pain.',
    image: "/images/articles/cat04/cover-015.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 5,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Self-Compassion', 'Practice', 'Mindfulness', 'Coping'],
    citations: [
      {
        id: '1',
        text: 'The Self-Compassion Break: Core Practice',
        source: 'Mindful Self-Compassion Workbook',
        year: '2018',
        link: 'https://self-compassion.org/the-three-components-of-self-compassion-2/',
        tier: 5,
      },
      {
        id: '2',
        text: 'Brief Self-Compassion Interventions',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101832',
        tier: 1,
      },
      {
        id: '3',
        text: 'Micro-Practices in Mindfulness',
        source: 'Mindfulness',
        year: '2019',
        link: 'https://doi.org/10.1007/s12671-019-01086-3',
        tier: 1,
      },
      {
        id: '4',
        text: 'Self-Compassion and Stress Reduction',
        source: 'Journal of Clinical Psychology',
        year: '2017',
        link: 'https://doi.org/10.1002/jclp.22368',
        tier: 1,
      },
      {
        id: '5',
        text: 'Neurophysiology of Self-Compassion',
        source: 'Social Cognitive and Affective Neuroscience',
        year: '2016',
        link: 'https://doi.org/10.1093/scan/nsw060',
        tier: 1,
      },
      {
        id: '6',
        text: 'Daily Self-Compassion Practice Effects',
        source: 'Behaviour Research and Therapy',
        year: '2018',
        link: 'https://doi.org/10.1016/j.brat.2018.08.003',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When you're in the middle of a difficult moment — stressed, hurting, or overwhelmed — complex self-compassion theories aren't helpful. You need something simple, fast, and effective. The Self-Compassion Break is exactly that.
          </p>
          <p className="mb-6">
            Developed by Dr. Kristin Neff, this three-minute practice engages all components of self-compassion in a format you can use anytime, anywhere <Citation id="1" index={1} source="Mindful Self-Compassion Workbook" year="2018" tier={5} />. Research shows even brief self-compassion practices significantly reduce distress <Citation id="2" index={2} source="Clinical Psychology Review" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="when-to-use" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Use the Self-Compassion Break
        </h2>

        <p className="mb-6">
          This practice is designed for moments when you're struggling. Use it when you:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Made a mistake or failed at something</li>
          <li>Received criticism or rejection</li>
          <li>Feel anxious, sad, or overwhelmed</li>
          <li>Notice harsh self-judgment arising</li>
          <li>Are experiencing physical or emotional pain</li>
          <li>Feel alone in your struggle</li>
          <li>Need a moment of kindness in a difficult day</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            You don't need to wait for a major crisis. Practice during small daily frustrations — traffic, a spilled coffee, a minor setback. Building the skill during small moments makes it accessible during big ones.
          </p>
        </ArticleCallout>

        <h2 id="the-practice" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Three-Step Self-Compassion Break
        </h2>

        <p className="mb-6">
          Find a quiet place if possible, but this can be done anywhere — at your desk, in the car, in the bathroom. Place your hand over your heart or another soothing location. Take a few breaths.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Step 1: Mindfulness — Acknowledge the Pain',
              description: (
                <div>
                  <p className="mb-3">
                    Say to yourself:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"This is a moment of suffering"</li>
                    <li>"This is hard"</li>
                    <li>"This hurts"</li>
                    <li>"I'm struggling right now"</li>
                  </ul>
                  <p className="mt-3">
                    You're simply naming your experience without judgment. You don't have to make it go away or fix it — just acknowledge it's there.
                  </p>
                </div>
              ),
            },
            {
              title: "Step 2: Common Humanity — Remember You\'re Not Alone",
              description: (
                <div>
                  <p className="mb-3">
                    Say to yourself:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"Suffering is part of life"</li>
                    <li>"I'm not alone in this"</li>
                    <li>"Others feel this way too"</li>
                    <li>"This is part of being human"</li>
                  </ul>
                  <p className="mt-3">
                    You're connecting your individual pain to the shared human experience. This counters the isolating feeling that "I'm the only one struggling."
                  </p>
                </div>
              ),
            },
            {
              title: 'Step 3: Self-Kindness — Offer Yourself Care',
              description: (
                <div>
                  <p className="mb-3">
                    Say to yourself:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"May I be kind to myself"</li>
                    <li>"May I give myself the compassion I need"</li>
                    <li>"May I accept myself as I am"</li>
                    <li>"May I be patient with myself"</li>
                  </ul>
                  <p className="mt-3">
                    You're offering yourself the same care you'd offer a good friend. If traditional phrases don't resonate, create your own kind words.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <p className="mb-6">
          That's it. Three steps. About three minutes. You've engaged mindfulness, common humanity, and self-kindness — all three components of self-compassion.
        </p>

        <h2 id="why-it-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why This Simple Practice Works
        </h2>

        <p className="mb-6">
          The Self-Compassion Break may seem too simple to be effective, but research supports its impact <Citation id="4" index={4} source="Journal of Clinical Psychology" year="2017" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 27, suffix: '%', label: 'Reduction in stress after single practice' },
            { value: 34, suffix: '%', label: 'Lower negative emotion vs. no intervention' },
            { value: 41, suffix: '%', label: 'Increased positive emotion' },
          ]}
          source="Brief self-compassion intervention research"
        />

        <p className="mb-6">
          Why it's effective:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Activates caregiving system</strong>: Physical touch and kind words activate neural circuits associated with safety and care <Citation id="5" index={5} source="Social Cognitive and Affective Neuroscience" year="2016" tier={1} /></li>
          <li><strong>Interrupts rumination</strong>: Mindful acknowledgment stops the cycle of dwelling on pain</li>
          <li><strong>Reduces isolation</strong>: Common humanity counters the shame-based belief that struggle means something is uniquely wrong with you</li>
          <li><strong>Provides alternative to self-criticism</strong>: Self-kindness offers a compassionate response instead of harsh judgment</li>
        </ul>

        <h2 id="customizing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Customizing the Practice
        </h2>

        <p className="mb-6">
          The traditional phrases are a starting point, not a script. Adapt them to your needs and situation.
        </p>

        <ComparisonTable
          title="Customizing the Self-Compassion Break"
          columns={['Traditional', 'Alternative Phrasing']}
          items={[
            {
              feature: `Step 1: 'This is a moment of suffering'`,
              values: [`This is really hard right now" or "I'm feeling pain`],
            },
            {
              feature: `Step 2: 'Suffering is part of life'`,
              values: [`Everyone struggles sometimes' or "Millions feel this way`],
            },
            {
              feature: `Step 3: 'May I be kind to myself'`,
              values: [`I deserve care' or "What do I need right now?`],
            },
          ]}
          highlightColumn={1}
        />

        <ArticleCallout variant="tip">
          <p className="mb-4">
            <strong>For specific situations:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>After a mistake:</strong> "I made a mistake, and that's human. What can I learn?"</li>
            <li><strong>During anxiety:</strong> "I'm feeling anxious, and anxiety is part of life. May I be gentle with myself."</li>
            <li><strong>After rejection:</strong> "Rejection hurts. Everyone experiences rejection. May I hold myself with kindness."</li>
          </ul>
        </ArticleCallout>

        <h2 id="troubleshooting" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Challenges and Solutions
        </h2>

        <p className="mb-6">
          You might encounter obstacles when first practicing the Self-Compassion Break.
        </p>

        <BeforeAfter
          before={{
            title: 'Challenge',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"The words feel fake or forced"</li>
                <li>"I can't feel anything when I say them"</li>
                <li>"My mind wanders immediately"</li>
                <li>"It makes me feel worse, not better"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Solution',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Normal at first — the action matters more than the feeling</li>
                <li>Keep practicing — feeling follows behavior</li>
                <li>Gently return attention when you notice wandering</li>
                <li>May trigger grief — this is actually healing, not harm</li>
              </ul>
            ),
          }}
        />

        <ArticleCallout variant="clinical-note">
          <p>
            If practicing self-compassion triggers intense emotions like sadness or anger, this can actually be a sign it's working. You may be grieving how you've treated yourself or how others treated you. Allow the emotions. They're part of healing.
          </p>
        </ArticleCallout>

        <h2 id="daily-practice" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Building a Daily Practice
        </h2>

        <p className="mb-6">
          While the Self-Compassion Break is designed for difficult moments, practicing it daily — even when you're not struggling — builds the skill <Citation id="6" index={6} source="Behaviour Research and Therapy" year="2018" tier={1} />.
        </p>

        <p className="mb-6">
          Ways to integrate the practice:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Morning ritual</strong>: Start your day with the three steps</li>
          <li><strong>Transition moments</strong>: Use it between tasks or activities</li>
          <li><strong>Before bed</strong>: Offer yourself compassion for the day's struggles</li>
          <li><strong>Set reminders</strong>: Phone alerts to pause and practice</li>
          <li><strong>After noticing harsh self-talk</strong>: Use it as an antidote to self-criticism</li>
        </ul>

        <ArticleChart
          type="line"
          title="Self-Compassion Increases With Daily Brief Practice"
          data={[
            { label: 'Week 1', value: 45 },
            { label: 'Week 2', value: 52 },
            { label: 'Week 3', value: 61 },
            { label: 'Week 4', value: 68 },
            { label: 'Week 8', value: 76 },
          ]}
          source="Average self-compassion scale scores with daily practice"
        />

        <h2 id="beyond-the-break" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Beyond the Self-Compassion Break
        </h2>

        <p className="mb-6">
          The Self-Compassion Break is a gateway practice. Once you're comfortable with it, you can expand to:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Longer compassion meditations</strong>: 10-20 minute guided practices</li>
          <li><strong>Loving-kindness meditation</strong>: Extending compassion to others</li>
          <li><strong>Self-compassion journaling</strong>: Writing compassionate responses to struggles</li>
          <li><strong>Compassionate letter-writing</strong>: Addressing yourself with care in written form</li>
          <li><strong>Mindful Self-Compassion (MSC) program</strong>: 8-week structured course</li>
        </ul>

        <p className="mb-6">
          But the three-minute break remains valuable even with advanced practice. Sometimes simple and quick is exactly what you need.
        </p>

        <h2 id="measuring-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Know It's Working
        </h2>

        <p className="mb-6">
          Progress with self-compassion practice isn't always dramatic. Look for subtle shifts:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You catch harsh self-talk a bit earlier</li>
          <li>The inner critic's voice loses some of its power</li>
          <li>You recover from setbacks slightly faster</li>
          <li>Self-kindness feels less awkward or false over time</li>
          <li>You extend yourself patience you wouldn't have before</li>
          <li>Difficult emotions feel more manageable</li>
        </ul>

        <p className="mb-6">
          The Self-Compassion Break is deceptively simple. Three steps, three minutes, but potentially life-changing. The key is practice — using it regularly, especially during small struggles, until it becomes second nature when big challenges arise.
        </p>
      </>
    ),
  },
  {
    id: catId(16),
    slug: 'common-humanity-reduces-self-blame',
    title: 'Common Humanity: Why Knowing Others Struggle Too Reduces Self-Blame',
    description: 'Understand how recognizing shared human imperfection breaks the isolation of suffering and reduces shame and self-criticism.',
    image: "/images/articles/cat04/cover-016.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Common Humanity', 'Self-Compassion', 'Shame', 'Connection'],
    citations: [
      {
        id: '1',
        text: 'Common Humanity and Psychological Wellbeing',
        source: 'Journal of Happiness Studies',
        year: '2014',
        link: 'https://doi.org/10.1007/s10902-013-9485-z',
        tier: 1,
      },
      {
        id: '2',
        text: 'Isolation vs. Common Humanity',
        source: 'Self and Identity',
        year: '2015',
        link: 'https://doi.org/10.1080/15298868.2014.996249',
        tier: 1,
      },
      {
        id: '3',
        text: 'Shame and Social Connection',
        source: 'Journal of Personality and Social Psychology',
        year: '2011',
        link: 'https://doi.org/10.1037/a0025233',
        tier: 1,
      },
      {
        id: '4',
        text: 'Self-Focused Attention and Isolation',
        source: 'Psychological Bulletin',
        year: '2010',
        link: 'https://doi.org/10.1037/a0020461',
        tier: 1,
      },
      {
        id: '5',
        text: 'Social Comparison and Mental Health',
        source: 'Clinical Psychology Review',
        year: '2017',
        link: 'https://doi.org/10.1016/j.cpr.2017.01.002',
        tier: 1,
      },
      {
        id: '6',
        text: 'Common Humanity Interventions',
        source: 'Mindfulness',
        year: '2018',
        link: 'https://doi.org/10.1007/s12671-018-0941-x',
        tier: 1,
      },
      {
        id: '7',
        text: 'The Social Nature of Self-Consciousness',
        source: 'Psychological Review',
        year: '2013',
        link: 'https://doi.org/10.1037/a0030957',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            When you fail, make a mistake, or feel inadequate, a painful thought often follows: "I'm the only one. Everyone else has it together. Something is uniquely wrong with me." This sense of isolation intensifies suffering and fuels shame.
          </p>
          <p className="mb-6">
            Common humanity — recognizing that imperfection and struggle are part of the shared human experience — is a powerful antidote to this isolation <Citation id="1" index={1} source="Journal of Happiness Studies" year="2014" tier={1} />. It's not just a comforting thought; it's a psychological shift that fundamentally changes how you relate to your difficulties.
          </p>
        </div>

        <h2 id="what-is-common-humanity" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Common Humanity?
        </h2>

        <p className="mb-6">
          Common humanity is the recognition that suffering, failure, and imperfection are not signs that something is wrong with you specifically — they're part of being human.
        </p>

        <QuoteBlock
          quote="To be human is to be beautifully imperfect, gloriously flawed, and inevitably vulnerable."
          attribution="Dr. Brené Brown"
          role="Researcher"
          source="The Gifts of Imperfection"
        />

        <p className="mb-6">
          This component of self-compassion involves:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Recognizing that all humans experience pain, failure, and inadequacy</li>
          <li>Understanding that imperfection is shared, not uniquely yours</li>
          <li>Seeing your struggles as connecting you to others, not isolating you</li>
          <li>Acknowledging that suffering is part of life for everyone</li>
        </ul>

        <h2 id="isolation-default" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Isolation Is the Default
        </h2>

        <p className="mb-6">
          When you're struggling, your mind naturally focuses inward. This self-focused attention creates the illusion that you're uniquely defective <Citation id="4" index={4} source="Psychological Bulletin" year="2010" tier={1} />.
        </p>

        <ComparisonTable
          title="Isolation vs. Common Humanity Perspective"
          columns={['Isolation Thinking', 'Common Humanity Thinking']}
          items={[
            {
              feature: 'Everyone else has it together',
              values: ['Most people struggle privately'],
            },
            {
              feature: `I'm the only one who fails`,
              values: ['Failure is part of learning for everyone'],
            },
            {
              feature: `There's something wrong with me`,
              values: ["I'm experiencing something human"],
            },
            {
              feature: 'No one would understand',
              values: ['Others have felt this way too'],
            },
          ]}
          highlightColumn={1}
        />

        <p className="mb-6">
          Several factors reinforce the isolation perspective:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Social media curation</strong>: People share highlights, not struggles, creating false impression everyone else is thriving</li>
          <li><strong>Cultural individualism</strong>: Western cultures emphasize independence and self-reliance, making struggle feel like personal failure</li>
          <li><strong>Shame culture</strong>: Many people hide their difficulties, so you don't see how universal struggle actually is</li>
          <li><strong>Negativity bias</strong>: Your brain fixates on your flaws while assuming others are fine</li>
        </ul>

        <h2 id="why-it-matters" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Common Humanity Reduces Self-Blame
        </h2>

        <p className="mb-6">
          Recognizing common humanity doesn't minimize your pain. It contextualizes it in a way that reduces shame and self-attack.
        </p>

        <StatCard
          stats={[
            { value: 52, suffix: '%', label: 'Reduction in shame with common humanity awareness' },
            { value: 43, suffix: '%', label: 'Lower self-blame vs. isolation perspective' },
            { value: 38, suffix: '%', label: 'Decrease in rumination' },
          ]}
          source="Common humanity intervention research (2018)"
        />

        <p className="mb-6">
          How common humanity helps:
        </p>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          1. Breaks the "Uniquely Defective" Belief
        </h3>

        <p className="mb-6">
          Shame thrives on the belief that you're uniquely flawed. "Everyone else is normal. I'm broken." Common humanity shatters this belief by recognizing imperfection as universal <Citation id="3" index={3} source="Journal of Personality and Social Psychology" year="2011" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            You're not defective for struggling. You're human. The same neurological, psychological, and social systems that create suffering in others create it in you. Your pain doesn't make you different — it makes you connected.
          </p>
        </ArticleCallout>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          2. Reduces Comparative Thinking
        </h3>

        <p className="mb-6">
          Social comparison — measuring yourself against others — is a major source of self-blame. When you recognize that everyone struggles (just in different ways and at different times), the comparison loses its sting <Citation id="5" index={5} source="Clinical Psychology Review" year="2017" tier={1} />.
        </p>

        <p className="mb-6">
          Instead of:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>"She has it all together and I don't" → "She has her own struggles I don't see"</li>
          <li>"Everyone succeeded except me" → "Others have failed too, even if it's not visible"</li>
          <li>"I should be further along by now" → "Everyone's path is different"</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          3. Counters Perfectionism
        </h3>

        <p className="mb-6">
          Perfectionism is rooted in the belief that you should be flawless while others are allowed to be human. Common humanity rejects this double standard.
        </p>

        <p className="mb-6">
          If all humans are imperfect, then:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Your mistakes don't mean you're inadequate</li>
          <li>Failure is data, not identity</li>
          <li>Learning requires imperfection</li>
          <li>Growth happens through struggle, not despite it</li>
        </ul>

        <h2 id="social-connection" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Humanity as Social Connection
        </h2>

        <p className="mb-6">
          Recognizing common humanity doesn't require direct social contact, but it creates a felt sense of connection <Citation id="2" index={2} source="Self and Identity" year="2015" tier={1} />.
        </p>

        <ArticleChart
          type="donut"
          title="Psychological Effects of Common Humanity Awareness"
          data={[
            { label: 'Reduced loneliness', value: 28 },
            { label: 'Increased belonging', value: 24 },
            { label: 'Lower shame', value: 22 },
            { label: 'Greater empathy', value: 16 },
            { label: 'Reduced self-focus', value: 10 },
          ]}
          source="Common humanity benefits research synthesis"
        />

        <p className="mb-6">
          This connection is psychological and existential:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You're not alone in your fundamental human vulnerability</li>
          <li>Your struggles connect you to billions of others across time and space</li>
          <li>What you feel has been felt by countless humans before you</li>
          <li>You're part of a larger story of human experience</li>
        </ul>

        <h2 id="practices" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practices to Cultivate Common Humanity
        </h2>

        <p className="mb-6">
          Common humanity can be intentionally developed through specific practices <Citation id="6" index={6} source="Mindfulness" year="2018" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Remind yourself during struggle',
              description: (
                <p>
                  When facing difficulty, pause and say: "This is part of being human. Others feel this way too. I'm not alone in this experience."
                </p>
              ),
            },
            {
              title: "Look for shared humanity in others\' stories",
              description: (
                <p>
                  Read memoirs, listen to podcasts, engage with authentic narratives. Notice how others' struggles mirror your own in surprising ways.
                </p>
              ),
            },
            {
              title: 'Share your own struggles selectively',
              description: (
                <p>
                  When appropriate, open up about your difficulties. You'll often discover others have similar experiences, breaking the illusion of isolation.
                </p>
              ),
            },
            {
              title: 'Practice loving-kindness meditation',
              description: (
                <p>
                  Extend wishes for wellbeing to all beings: 'May all people struggling with [issue] find peace." This connects your struggle to the universal.
                </p>
              ),
            },
          ]}
        />

        <h2 id="common-barriers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Common Humanity Feels Dismissive
        </h2>

        <p className="mb-6">
          Some people resist common humanity because it feels invalidating: "Saying everyone struggles minimizes my specific pain."
        </p>

        <ArticleCallout variant="clinical-note">
          <p>
            Common humanity doesn't minimize your unique experience. It acknowledges that while your specific circumstances are yours, the emotional experience of suffering is universal. Both things can be true: your pain is real and valid, AND others have felt similar pain.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          The goal isn't to flatten differences or invalidate specificity. It's to counter the isolating belief that you're uniquely defective or alone.
        </p>

        <BeforeAfter
          before={{
            title: 'Invalidating Version',
            content: (
              <p>"Everyone has problems, so yours don't matter. Get over it."</p>
            ),
          }}
          after={{
            title: 'Common Humanity Version',
            content: (
              <p>"Your pain matters AND you're not alone in experiencing pain. Both are true."</p>
            ),
          }}
        />

        <h2 id="integration" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Integrating Common Humanity into Self-Compassion
        </h2>

        <p className="mb-6">
          Common humanity works best in combination with the other components of self-compassion:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Mindfulness</strong> helps you notice when you're feeling isolated</li>
          <li><strong>Common humanity</strong> provides perspective that you're not uniquely defective</li>
          <li><strong>Self-kindness</strong> offers the care you deserve as one of many struggling humans</li>
        </ul>

        <p className="mb-6">
          Together, these create a complete response to suffering: awareness, connection, and care.
        </p>

        <p className="mb-6">
          Common humanity transforms isolation into connection, shame into shared experience, and self-blame into understanding. It doesn't erase pain, but it changes your relationship to it — and that changes everything.
        </p>
      </>
    ),
  },
];
