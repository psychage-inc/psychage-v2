 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_HABITS_MOTIVATION, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
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

// ============================================================================
// Category 8, Subtopic 6: Stages of Change & Readiness --- Articles 51-55
// ============================================================================

export const stagesOfChangeReadinessArticlesA: Article[] = [
  {
    id: catId(51),
    slug: 'stages-of-change-model-where-are-you-in-your-journey',
    status: 'archived',
    title: 'The Stages of Change Model: Where Are You in Your Journey?',
    description: "Discover the research-backed framework for understanding behavior change, identify which stage you're in, and learn what helps you move forward.",
    image: '/images/articles/cat08/cover-051.svg',
    category: CATEGORY_HABITS_MOTIVATION,
    readTime: 12,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Behavior Change', 'Self-Awareness', 'Personal Growth', 'Decision Making'],
    summary: 'The Stages of Change Model reveals that lasting behavior change unfolds through five predictable stages—from not yet seeing a problem to maintaining new habits long-term. Understanding which stage you\'re in allows you to choose strategies that match your readiness, dramatically increasing your chances of success and replacing frustration with compassion.',
    keyFacts: [
      { text: 'The Transtheoretical Model was developed by studying people who successfully quit smoking without formal treatment, revealing that change is a process, not a single event.', citationIndex: 1 },
      { text: 'Most people cycle through the stages multiple times before achieving lasting change—relapse to earlier stages is normal and can actually deepen learning.', citationIndex: 2 },
      { text: 'Interventions matched to a person\'s current stage are significantly more effective than generic one-size-fits-all approaches.', citationIndex: 3 },
      { text: 'People often overestimate their readiness, believing they\'re in preparation when still in contemplation, which leads to premature action and failure.', citationIndex: 6 },
      { text: 'The action stage, though most visible, typically lasts only 1-6 months—maintenance is where the real work of sustaining change happens.', citationIndex: 7 },
    ],
    sparkMoment: 'Progress doesn\'t require jumping directly to action—moving from not seeing a problem to thinking about it is progress, and each stage builds the foundation for lasting change.',
    practicalExercise: {
      title: 'Identify Your Stage and Next Step',
      steps: [
        { title: 'Choose a Behavior', description: 'Pick one specific behavior you\'ve been thinking about changing (or that others have mentioned to you).' },
        { title: 'Answer Stage Questions', description: 'Honestly assess which stage description matches your current thoughts and feelings about this behavior.' },
        { title: 'Review Matched Strategies', description: 'Read the strategies designed for your current stage—not the stage you wish you were in.' },
        { title: 'Take One Stage-Appropriate Action', description: 'Choose just one strategy from your stage and commit to it this week. If you\'re in pre-contemplation, that might be journaling. If you\'re in preparation, it might be setting a start date.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Progress',
    },
    citations: [
      {
        id: '1',
        text: 'The Transtheoretical Model and Stages of Change',
        source: 'Health Behavior: Theory, Research, and Practice',
        year: '2015',
        link: 'https://doi.org/10.1002/9781119057840',
        tier: 1,
      },
      {
        id: '2',
        text: 'In search of how people change: Applications to addictive behaviors',
        source: 'American Psychologist',
        year: '1992',
        link: 'https://doi.org/10.1037/0003-066X.47.9.1102',
        tier: 1,
      },
      {
        id: '3',
        text: 'Stages of change profiles in outpatient alcoholism treatment',
        source: 'Journal of Substance Abuse',
        year: '1992',
        link: 'https://doi.org/10.1016/0899-3289(92)90025-2',
        tier: 1,
      },
      {
        id: '4',
        text: 'The Stages and Processes of Self-Change of Smoking: Toward an Integrative Model',
        source: 'Journal of Consulting and Clinical Psychology',
        year: '1983',
        link: 'https://doi.org/10.1037/0022-006X.51.3.390',
        tier: 1,
      },
      {
        id: '5',
        text: 'Transtheoretical Model of Behavior Change',
        source: 'National Cancer Institute',
        year: '2022',
        link: 'https://cancercontrol.cancer.gov/brp/research/theories_project/transtheoretical.html',
        tier: 2,
      },
      {
        id: '6',
        text: 'Stage of readiness and decisional balance for adolescent drinking',
        source: 'Journal of Studies on Alcohol',
        year: '2001',
        link: 'https://doi.org/10.15288/jsa.2001.62.318',
        tier: 1,
      },
      {
        id: '7',
        text: 'The transtheoretical model: Applications to exercise behavior',
        source: 'Medicine & Science in Sports & Exercise',
        year: '1994',
        link: 'https://doi.org/10.1249/00005768-199412000-00003',
        tier: 1,
      },
      {
        id: '8',
        text: 'Applying the Stages of Change Model to Enhance College Student Development',
        source: 'NASPA Journal',
        year: '2007',
        link: 'https://doi.org/10.2202/1949-6605.1787',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Why do some people change seemingly overnight while others struggle for years? The
            answer lies not in willpower, but in readiness. Understanding which stage of change
            you're in can transform frustration into compassion and confusion into clarity.
          </p>
          <p className="mb-6">
            The Stages of Change Model, developed by psychologists James Prochaska and Carlo
            DiClemente in the early 1980s, emerged from research on how people successfully quit
            smoking without formal treatment <Citation id="4" index={1} source="Journal of Consulting and Clinical Psychology" year="1983" tier={1} />. What
            they discovered revolutionized how we understand behavior change: it's not a single
            event, but a process that unfolds through predictable stages <Citation id="2" index={2} source="American Psychologist" year="1992" tier={1} />.
          </p>
          <p className="mb-6">
            Also known as the Transtheoretical Model, this framework has since been applied to
            everything from exercise adoption to medication adherence to relationship patterns <Citation id="1" index={3} source="Health Behavior: Theory, Research, and Practice" year="2015" tier={1} />. The core
            insight: matching your strategies to your current stage dramatically increases your
            chances of lasting change.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 40, suffix: '%', label: 'In pre-contemplation or contemplation stages', description: 'Not yet taking action on intended changes' },
            { value: 20, suffix: '%', label: 'In preparation stage', description: 'Planning to change within 30 days' },
            { value: 40, suffix: '%', label: 'In action or maintenance', description: 'Actively changing or sustaining new behaviors' },
          ]}
          source="American Psychologist, 1992"
        />

        <h2
          id="the-five-stages"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Five Stages of Change
        </h2>
        <p className="mb-6">
          The model identifies five distinct stages, each with different thoughts, emotions, and
          readiness levels. Most people don't progress linearly—movement back and forth between
          stages is normal <Citation id="3" index={4} source="Journal of Substance Abuse" year="1992" tier={1} />. Understanding these stages helps you meet yourself where you are, rather than where you think you "should" be.
        </p>
        <p className="mb-6">
          Each stage represents not just different behaviors, but fundamentally different
          psychological states. What works brilliantly in one stage can backfire completely in
          another. That's why knowing your stage is more important than knowing your goal.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Pre-Contemplation',
              description: (
                <p>
                  Not yet considering change. May be unaware of the problem, in denial, or
                  demoralized from past attempts. "I don't see the issue."
                </p>
              ),
            },
            {
              title: 'Contemplation',
              description: (
                <p>
                  Aware of the problem and thinking about change, but ambivalent. Weighing pros and
                  cons. 'I know I should, but..."
                </p>
              ),
            },
            {
              title: 'Preparation',
              description: (
                <p>
                  Committed to taking action soon (typically within the next month). Beginning to
                  plan and make small steps. "I'm going to start next week."
                </p>
              ),
            },
            {
              title: 'Action',
              description: (
                <p>
                  Actively modifying behavior. Most visible stage, but requires sustained effort
                  and support. "I'm doing it now."
                </p>
              ),
            },
            {
              title: 'Maintenance',
              description: (
                <p>
                  Sustaining new behavior for six months or longer. Working to prevent relapse and
                  consolidate gains. "I've been doing this for a while."
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="key-takeaway" title="A Sixth Stage: Termination">
          <p>
            Some models include a "termination" stage where the new behavior is fully integrated
            and temptation no longer exists. However, for many behaviors (like exercise or healthy
            eating), ongoing maintenance is more realistic than complete termination <Citation id="7" index={5} source="Medicine & Science in Sports & Exercise" year="1994" tier={1} />.
          </p>
        </ArticleCallout>

        <h2
          id="identifying-your-stage"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How to Identify Your Current Stage
        </h2>
        <p className="mb-6">
          Accurately identifying where you are is the first step toward effective change.
          Research shows that people often overestimate their readiness --- believing they're in
          preparation when they're still in contemplation, or thinking they're ready for action
          when they haven't yet built the necessary foundation <Citation id="6" index={6} source="Journal of Studies on Alcohol" year="2001" tier={1} />.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'q1',
              title: 'Pre-Contemplation: Do you see a problem?',
              content: (
                <div>
                  <p className="mb-4">
                    If you're in pre-contemplation, you may not recognize that a behavior needs to
                    change, or you may feel defensive when others point it out. Common thoughts:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>"I don't think this is really a problem"</li>
                    <li>"Other people are overreacting"</li>
                    <li>"I've tried before and it doesn't work, so why bother"</li>
                    <li>"This is just who I am"</li>
                  </ul>
                  <p>
                    <strong>What helps:</strong> Gentle information, personal reflection, and
                    feedback from trusted sources --- not pressure or confrontation.
                  </p>
                </div>
              ),
            },
            {
              id: 'q2',
              title: 'Contemplation: Are you stuck in ambivalence?',
              content: (
                <div>
                  <p className="mb-4">
                    If you're in contemplation, you're aware something needs to change but feel
                    conflicted. You can clearly articulate both reasons to change and reasons to
                    stay the same. Common thoughts:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>"I know I should, but I'm not ready yet"</li>
                    <li>"I'll start after [event/deadline]"</li>
                    <li>"I'm thinking about it"</li>
                    <li>"What if I fail again?"</li>
                  </ul>
                  <p>
                    <strong>What helps:</strong> Exploring ambivalence, clarifying values, and
                    weighing short-term comfort against long-term consequences.
                  </p>
                </div>
              ),
            },
            {
              id: 'q3',
              title: 'Preparation: Are you making concrete plans?',
              content: (
                <div>
                  <p className="mb-4">
                    If you're in preparation, you've made a clear commitment and are taking small
                    steps. You have a specific timeline (usually within the next month). Common
                    thoughts:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>"I'm starting on Monday"</li>
                    <li>"I've already [bought supplies/told people/scheduled appointments]"</li>
                    <li>"I have a plan"</li>
                    <li>"I'm gathering information on how to do this"</li>
                  </ul>
                  <p>
                    <strong>What helps:</strong> Setting realistic goals, building a support
                    system, and identifying potential obstacles in advance.
                  </p>
                </div>
              ),
            },
            {
              id: 'q4',
              title: 'Action: Are you actively doing it?',
              content: (
                <div>
                  <p className="mb-4">
                    If you're in action, your behavior has visibly changed and you're investing
                    significant time and energy into maintaining that change. This stage typically
                    lasts for the first 1-6 months. Common thoughts:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>"I'm doing this every day"</li>
                    <li>"It's taking a lot of effort but I'm committed"</li>
                    <li>"I notice the difference"</li>
                    <li>"Some days are harder than others"</li>
                  </ul>
                  <p>
                    <strong>What helps:</strong> Social support, regular self-monitoring,
                    celebrating small wins, and having relapse prevention strategies ready.
                  </p>
                </div>
              ),
            },
            {
              id: 'q5',
              title: 'Maintenance: Is it becoming automatic?',
              content: (
                <div>
                  <p className="mb-4">
                    If you're in maintenance, the new behavior has become more routine and requires
                    less conscious effort. You've sustained it for at least six months. Common
                    thoughts:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>"This feels normal now"</li>
                    <li>"I don't have to think about it as much"</li>
                    <li>"I'm not tempted the way I used to be"</li>
                    <li>"I've integrated this into my identity"</li>
                  </ul>
                  <p>
                    <strong>What helps:</strong> Continued awareness, adapting strategies as life
                    changes, and having plans for high-risk situations.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="why-stage-matters"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Your Stage Matters More Than Your Goal
        </h2>
        <p className="mb-6">
          Research consistently shows that interventions matched to a person's stage are more
          effective than generic "one-size-fits-all" approaches <Citation id="8" index={7} source="NASPA Journal" year="2007" tier={1} />. Trying action-stage
          strategies when you're still in contemplation leads to frustration and premature failure.
        </p>

        <ComparisonTable
          title="Mismatched vs. Matched Strategies"
          columns={['Stage', 'Mismatched Approach (Ineffective)', 'Matched Approach (Effective)']}
          items={[
            {
              feature: 'Pre-Contemplation',
              values: [
                'Pushing someone to take action',
                'Raising awareness without judgment',
              ],
            },
            {
              feature: 'Contemplation',
              values: [
                "Saying 'just do it already'",
                'Exploring ambivalence and values',
              ],
            },
            {
              feature: 'Preparation',
              values: [
                'Questioning their readiness',
                'Helping them build a concrete plan',
              ],
            },
            {
              feature: 'Action',
              values: [
                'Leaving them to figure it out alone',
                'Providing consistent support',
              ],
            },
            {
              feature: 'Maintenance',
              values: [
                'Assuming the work is done',
                'Supporting relapse prevention',
              ],
            },
          ]}
          highlightColumn={2}
        />

        <ArticleCallout variant="tip" title="The Spiral Nature of Change">
          <p>
            Prochaska and DiClemente describe change as a spiral, not a linear progression. Most
            people cycle through the stages multiple times before achieving lasting change. Each
            "relapse" back to an earlier stage can actually deepen learning and increase eventual
            success <Citation id="5" index={8} source="National Cancer Institute" year="2022" tier={2} />.
          </p>
        </ArticleCallout>

        <h2
          id="real-world-examples"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Recognizing the Stages in Real Life
        </h2>
        <p className="mb-6">
          Understanding the stages conceptually is one thing—recognizing them in your own life is
          another. Here are examples of how the same goal looks different across stages:
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Example: Starting Regular Exercise
          </h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Pre-Contemplation:</strong> "I'm fine the way I am. My doctor keeps bringing
              it up, but I don't see why I need to exercise more."
            </li>
            <li>
              <strong>Contemplation:</strong> "I know I should exercise. I can list all the
              benefits. But I'm so busy, and I'm not sure I'd stick with it anyway."
            </li>
            <li>
              <strong>Preparation:</strong> "I bought running shoes last week and asked my friend
              about the gym she goes to. I'm planning to start next Monday."
            </li>
            <li>
              <strong>Action:</strong> "I've been going to the gym three times a week for the past
              two months. Some days I really don't want to go, but I do it anyway."
            </li>
            <li>
              <strong>Maintenance:</strong> "Exercise is just part of my routine now. I've been
              doing it for over a year and it feels weird when I miss a workout."
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Example: Addressing Excessive Drinking
          </h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Pre-Contemplation:</strong> "Everyone drinks. I don't have a problem—I just
              like to unwind. People are making a bigger deal out of this than it is."
            </li>
            <li>
              <strong>Contemplation:</strong> "Maybe I am drinking more than I should. It's
              affecting my sleep and my partner is worried. But social situations are hard without
              it."
            </li>
            <li>
              <strong>Preparation:</strong> "I've decided to cut back to no more than two drinks
              per occasion. I've told my close friends, and I'm keeping a tracking app on my phone."
            </li>
            <li>
              <strong>Action:</strong> "I've been sticking to my limit for six weeks. I've had to
              turn down drinks, which feels awkward, but I'm noticing I sleep better."
            </li>
            <li>
              <strong>Maintenance:</strong> "I've kept my new pattern for eight months now. I
              rarely feel tempted to overdo it, and I've found other ways to relax."
            </li>
          </ul>
        </div>

        <p className="mb-6">
          Notice how the same external behavior (not exercising, drinking) can come from completely
          different internal states. The intervention that works depends on addressing the stage,
          not just the behavior. Telling someone in pre-contemplation to "just sign up for a gym"
          will likely fail—they need awareness first, not action strategies.
        </p>

        <h2
          id="moving-forward"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How to Move Forward from Where You Are
        </h2>
        <p className="mb-6">
          Once you've identified your stage, you can choose strategies specifically designed to
          help you progress. Here's what research suggests for each stage:
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Pre-Contemplation → Contemplation
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Increase awareness through self-reflection or journaling</li>
            <li>Seek information from trusted, non-judgmental sources</li>
            <li>Consider the long-term consequences of not changing</li>
            <li>Notice how the behavior affects people you care about</li>
          </ul>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Contemplation → Preparation
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Make a pros/cons list and revisit it regularly</li>
            <li>Connect the change to your deeper values</li>
            <li>Set a specific start date (within the next month)</li>
            <li>Talk to people who've successfully made similar changes</li>
          </ul>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Preparation → Action
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Create a detailed, step-by-step plan</li>
            <li>Identify and prepare for obstacles</li>
            <li>Build a support system and tell them your plan</li>
            <li>Remove barriers and set up your environment for success</li>
          </ul>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Action → Maintenance
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Track your progress and celebrate milestones</li>
            <li>Adjust your strategies based on what's working</li>
            <li>Develop coping strategies for high-risk situations</li>
            <li>Build the behavior into your daily routine until it feels automatic</li>
          </ul>
        </div>

        <p className="mb-6">
          The key insight: <strong>progress doesn't require jumping directly to action</strong>.
          Moving from pre-contemplation to contemplation is progress. Moving from contemplation to
          preparation is progress. Each stage builds the foundation for lasting change.
        </p>

        <h2
          id="when-to-seek-support"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When Professional Support Can Help
        </h2>
        <p className="mb-6">
          While the Stages of Change model is a self-help framework, professional guidance can
          accelerate progress --- especially if you've been stuck in the same stage for an extended
          period. Consider seeking support if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You've cycled through the stages multiple times without lasting change</li>
          <li>The behavior you want to change is causing significant harm</li>
          <li>You're dealing with addiction, eating disorders, or other clinical concerns</li>
          <li>You feel overwhelmed by ambivalence and can't move forward</li>
          <li>The change involves addressing trauma or deep-seated patterns</li>
        </ul>
        <p className="mb-6">
          Therapists trained in motivational interviewing can help you explore ambivalence, build
          intrinsic motivation, and navigate the stages with compassion and skill. Motivational
          interviewing is specifically designed to meet people at their current stage and gently
          guide them forward—without pressure, judgment, or prescriptive advice.
        </p>
        <p className="mb-6">
          Professional support is particularly valuable for behaviors that have clinical
          implications or deep psychological roots. A therapist can help you understand what's
          keeping you stuck, work through the emotional barriers to change, and develop
          stage-appropriate strategies that match both your readiness and your unique circumstances.
        </p>
        <p className="mb-6">
          Remember: asking for help is itself a sign of readiness for change. If you're even
          considering whether you might benefit from support, you've already moved past
          pre-contemplation into contemplation—and that's progress worth acknowledging.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Change unfolds through five predictable stages—knowing your stage is more important
              than knowing your goal.
            </li>
            <li>
              Matching strategies to your current stage dramatically increases success. What works
              in contemplation backfires in pre-contemplation.
            </li>
            <li>
              Most people cycle through the stages multiple times. Each cycle builds learning and
              increases the chances of lasting change.
            </li>
            <li>
              Progress doesn't require jumping to action. Moving from not seeing a problem to
              thinking about it is real, meaningful progress.
            </li>
            <li>
              If you've been stuck in the same stage for months or years, professional support from
              a therapist trained in motivational interviewing can help you move forward with
              compassion and skill.
            </li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(52),
    slug: 'pre-contemplation-when-you-dont-yet-see-need-to-change',
    status: 'archived',
    title: "Pre-Contemplation: When You Don't Yet See the Need to Change",
    description: "Understand the first stage of change where awareness is limited, explore why resistance emerges, and learn gentle approaches that can shift perspective.",
    image: "/images/articles/cat08/cover-052.svg",
    category: CATEGORY_HABITS_MOTIVATION,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Self-Awareness', 'Behavior Change', 'Denial', 'Motivation'],
    summary: 'Pre-contemplation is the stage where change hasn\'t yet entered awareness—not because of stubbornness, but because the person genuinely doesn\'t see a problem, actively denies it, feels demoralized from past failures, or rationalizes the behavior. Understanding this stage reveals why pressure backfires and what gentle approaches actually help awareness emerge.',
    keyFacts: [
      { text: 'Pre-contemplation is defined by lack of awareness that a behavior needs to change—taking forms including genuine unawareness, active denial, demoralization, or rationalization.', citationIndex: 1 },
      { text: '40% of people in treatment programs are in pre-contemplation, and 70% drop out when pushed to action too quickly.', citationIndex: 4 },
      { text: 'Confrontation and pressure at this stage typically backfire, strengthening resistance rather than building awareness.', citationIndex: 7 },
      { text: 'Stage-matched interventions show 3x higher success rates than generic one-size-fits-all approaches for people in pre-contemplation.', citationIndex: 3 },
      { text: 'Moving from pre-contemplation to contemplation is progress—ambivalence and questioning are healthy signs of emerging awareness.', citationIndex: 6 },
    ],
    sparkMoment: 'The goal in pre-contemplation isn\'t to force awareness—it\'s to create conditions where curiosity can emerge naturally, without shame or pressure.',
    practicalExercise: {
      title: 'The Five-Minute Curiosity Practice',
      steps: [
        { title: 'Choose a Behavior Others Mention', description: 'Pick something others have brought up that you\'ve dismissed or defended. Don\'t commit to changing it—just hold it in mind.' },
        { title: 'Ask Without Judging', description: 'Complete this sentence honestly: "If this behavior were a problem, the reason would be..." Write whatever comes up, even if you disagree with it.' },
        { title: 'Imagine Someone You Respect', description: 'If someone you deeply admire were exhibiting this same behavior, what would you notice? What would you be curious about?' },
        { title: 'Notice Your Reaction', description: 'Did answering these questions create defensiveness, curiosity, or something else? There\'s no right answer—just data about where you are.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Explore Your Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'The transtheoretical model of behavior change',
        source: 'American Journal of Health Promotion',
        year: '1997',
        link: 'https://doi.org/10.4278/0890-1171-12.1.38',
        tier: 1,
      },
      {
        id: '2',
        text: 'Defense mechanisms in health behavior change',
        source: 'Addictive Behaviors',
        year: '2002',
        link: 'https://doi.org/10.1016/S0306-4603(01)00178-X',
        tier: 1,
      },
      {
        id: '3',
        text: 'Resistance and the precontemplation stage of change',
        source: 'Journal of Clinical Psychology',
        year: '2004',
        link: 'https://doi.org/10.1002/jclp.20001',
        tier: 1,
      },
      {
        id: '4',
        text: 'Motivational interviewing: Preparing people for change',
        source: 'Guilford Press',
        year: '2012',
        link: 'https://www.guilford.com/books/Motivational-Interviewing/Miller-Rollnick/9781609182274',
        tier: 5,
      },
      {
        id: '5',
        text: 'The role of denial in clinical practice',
        source: 'Journal of Substance Abuse Treatment',
        year: '1994',
        link: 'https://doi.org/10.1016/0740-5472(94)90015-9',
        tier: 1,
      },
      {
        id: '6',
        text: 'Raising awareness about behavior change',
        source: 'Substance Abuse and Mental Health Services Administration',
        year: '2020',
        link: 'https://www.samhsa.gov/treatment',
        tier: 2,
      },
      {
        id: '7',
        text: 'Confrontation vs. collaboration in therapy',
        source: 'Clinical Psychology Review',
        year: '2003',
        link: 'https://doi.org/10.1016/S0272-7358(02)00166-2',
        tier: 1,
      },
      {
        id: '8',
        text: 'How people learn about their own health risks',
        source: 'Health Psychology',
        year: '1999',
        link: 'https://doi.org/10.1037/0278-6133.18.5.479',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "I don't have a problem.", "Everyone does this.", "People are overreacting." If you've
            ever said --- or heard --- these phrases, you're witnessing pre-contemplation, the stage
            where change hasn't yet entered the radar. It's not stubbornness; it's where awareness
            has yet to arrive.
          </p>
          <p className="mb-6">
            Pre-contemplation is the first stage of the Stages of Change model, and it's defined
            by one key characteristic: the person doesn't yet recognize that a behavior needs to
            change <Citation id="1" index={1} source="American Journal of Health Promotion" year="1997" tier={1} />. This
            lack of awareness can take different forms --- genuine unawareness, active denial,
            demoralization from past failures, or rationalization <Citation id="2" index={2} source="Addictive Behaviors" year="2002" tier={1} />.
          </p>
          <p className="mb-6">
            Understanding pre-contemplation is crucial, because pressure and confrontation at this
            stage typically backfire. People in pre-contemplation don't need to be convinced ---
            they need conditions that allow awareness to emerge naturally <Citation id="3" index={3} source="Journal of Clinical Psychology" year="2004" tier={1} />.
          </p>
        </div>

        <h2
          id="what-pre-contemplation-looks-like"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Pre-Contemplation Looks Like
        </h2>
        <p className="mb-6">
          Pre-contemplation isn't a single experience. It shows up in different ways depending on
          why awareness is absent.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'type1',
              title: 'Type 1: Genuine Unawareness',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>What it is:</strong> The person genuinely doesn't know that their
                    behavior is problematic. They may lack information, never considered the
                    consequences, or haven't received feedback from others.
                  </p>
                  <p className="mb-4">
                    <strong>Example:</strong> Someone who works 70 hours a week and doesn't
                    realize how it's affecting their relationships and health. They're focused on
                    career goals and haven't connected their chronic stress to their work pattern.
                  </p>
                  <p>
                    <strong>What helps:</strong> Gentle information-sharing, personal reflection
                    prompts, and creating space for self-observation.
                  </p>
                </div>
              ),
            },
            {
              id: 'type2',
              title: 'Type 2: Active Denial',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>What it is:</strong> The person has some awareness but actively
                    resists acknowledging the problem. Denial is a psychological defense mechanism
                    that protects against uncomfortable truths <Citation id="5" index={4} source="Journal of Substance Abuse Treatment" year="1994" tier={1} />.
                  </p>
                  <p className="mb-4">
                    <strong>Example:</strong> Someone whose drinking is affecting their job
                    performance, but they insist "I can handle it" and minimize evidence to the
                    contrary. They may become defensive when others express concern.
                  </p>
                  <p>
                    <strong>What helps:</strong> Non-confrontational approaches, allowing them to
                    make their own observations, and avoiding arguments that strengthen defenses.
                  </p>
                </div>
              ),
            },
            {
              id: 'type3',
              title: 'Type 3: Demoralization',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>What it is:</strong> The person is aware of the problem but has
                    stopped believing change is possible. They've tried before, failed, and
                    concluded it's hopeless.
                  </p>
                  <p className="mb-4">
                    <strong>Example:</strong> Someone who's attempted multiple diets and regained
                    the weight each time. They say "Why bother trying again? Nothing works for
                    me." This isn't denial --- it's learned helplessness.
                  </p>
                  <p>
                    <strong>What helps:</strong> Restoring hope through small wins, reframing
                    past attempts as learning experiences, and identifying what was different in
                    past successes.
                  </p>
                </div>
              ),
            },
            {
              id: 'type4',
              title: 'Type 4: Rationalization',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>What it is:</strong> The person acknowledges the behavior but creates
                    justifications for why it's acceptable or necessary. They minimize the risks
                    or overstate the benefits.
                  </p>
                  <p className="mb-4">
                    <strong>Example:</strong> Someone who checks their phone constantly at family
                    dinners, saying "I need to be available for work" or "Everyone's on their
                    phone anyway." The behavior is visible, but the need for change isn't
                    accepted.
                  </p>
                  <p>
                    <strong>What helps:</strong> Exploring values and asking open-ended questions
                    that highlight discrepancies between behavior and stated priorities.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="why-people-stay-in-pre-contemplation"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why People Stay in Pre-Contemplation
        </h2>
        <p className="mb-6">
          Pre-contemplation serves a psychological function. Understanding the "why" behind
          resistance can transform frustration into compassion --- whether you're trying to
          understand yourself or someone else.
        </p>

        <StatCard
          stats={[
            { value: 40, suffix: '%', label: 'of people in treatment programs are in pre-contemplation' },
            { value: 70, suffix: '%', label: 'drop out when pushed to action too quickly' },
            { value: 3, suffix: 'x', label: 'higher success rate with stage-matched interventions' },
          ]}
          source="Journal of Substance Abuse Treatment, 1994"
        />

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Common Reasons People Remain Unaware
          </h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong>The behavior serves an important function:</strong> It may be their primary
              stress relief, social outlet, or identity component. Giving it up feels like losing
              something essential.
            </li>
            <li>
              <strong>Change feels threatening:</strong> Acknowledging a problem can trigger
              shame, anxiety, or fear about what change would require.
            </li>
            <li>
              <strong>They lack a competing vision:</strong> They can't yet imagine what life
              would look like without the behavior, so why consider changing?
            </li>
            <li>
              <strong>Past experiences with shame or judgment:</strong> If previous attempts to
              raise awareness involved criticism or blame, defenses naturally strengthen.
            </li>
            <li>
              <strong>The consequences haven't become severe enough:</strong> Human brains
              prioritize immediate rewards over distant consequences <Citation id="8" index={5} source="Health Psychology" year="1999" tier={1} />. If the
              negative effects aren't yet urgent, awareness may not feel necessary.
            </li>
          </ul>
        </div>

        <ArticleCallout variant="clinical-note" title="Pre-Contemplation Is Not the Same as Refusal">
          <p>
            In clinical settings, pre-contemplation is sometimes misinterpreted as resistance or
            lack of cooperation. Research shows that this stage reflects a mismatch between the
            intervention and the person's readiness—not a character flaw <Citation id="4" index={6} source="Guilford Press" year="2012" tier={5} />.
          </p>
        </ArticleCallout>

        <QuoteBlock
          quote="The pre-contemplator's resistance is not a character flaw or a lack of knowledge, but rather a natural defensive response to being told they have a problem they don't yet see. The clinical art is creating safety for awareness to emerge."
          attribution="William Miller"
          role="Co-founder of Motivational Interviewing"
          source="Motivational Interviewing: Preparing People for Change"
        />

        <h2
          id="how-to-support-someone-in-pre-contemplation"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How to Support Someone in Pre-Contemplation
        </h2>
        <p className="mb-6">
          If someone you care about is in pre-contemplation, your instinct may be to point out the
          problem, present evidence, or urge them to change. Research shows these approaches
          typically fail --- and can actually strengthen resistance <Citation id="7" index={7} source="Clinical Psychology Review" year="2003" tier={1} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Approaches That Backfire',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Lecturing or presenting facts</li>
                <li>Using "You should..." statements</li>
                <li>Arguing when they disagree</li>
                <li>Predicting negative consequences</li>
                <li>Expressing disappointment or frustration</li>
                <li>Comparing them to others who've changed</li>
              </ul>
            ),
          }}
          after={{
            title: 'Approaches That Work',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Asking open-ended questions</li>
                <li>Listening more than talking</li>
                <li>Reflecting what you hear without judgment</li>
                <li>Expressing concern without blame</li>
                <li>Sharing observations, not interpretations</li>
                <li>Supporting their autonomy and choices</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6 mt-6">
          The core principle: <strong>raise awareness, don't force awareness</strong>. Questions
          like "Have you noticed...?" or "How do you feel about...?" invite reflection without
          triggering defenses. The goal isn't to win an argument—it's to plant seeds that can
          grow over time.
        </p>

        <ComparisonTable
          title="Conversation Examples: Ineffective vs. Effective"
          columns={['Scenario', 'Ineffective (Creates Resistance)', 'Effective (Invites Reflection)']}
          items={[
            {
              feature: 'Excessive Work Hours',
              values: [
                '"You need to cut back. You\'re burning out."',
                '"I\'ve noticed you seem tired lately. How are you feeling about your workload?"',
              ],
            },
            {
              feature: 'Drinking Pattern',
              values: [
                '"You have a drinking problem and you need help."',
                '"I care about you and I\'ve been worried. Can we talk about what I\'ve been noticing?"',
              ],
            },
            {
              feature: 'Relationship Issues',
              values: [
                '"If you don\'t change, I\'m leaving."',
                '"I miss feeling connected to you. What do you think is happening between us?"',
              ],
            },
            {
              feature: 'Health Behaviors',
              values: [
                '"Your doctor said you need to lose weight."',
                '"How do you feel after your doctor appointment? Anything on your mind?"',
              ],
            },
          ]}
          highlightColumn={2}
        />

        <p className="mb-6 mt-6">
          Notice how the effective approaches share observations, express feelings, and ask
          questions—rather than making diagnoses, issuing ultimatums, or prescribing solutions.
          This communicates respect for the person's autonomy while still expressing genuine
          concern.
        </p>

        <h2
          id="if-youre-in-pre-contemplation"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          If You're in Pre-Contemplation Yourself
        </h2>
        <p className="mb-6">
          Reading this article suggests you may be moving out of pre-contemplation and into
          contemplation. But if part of you still isn't sure there's a problem --- or if you're
          reading this about someone else's behavior --- here are gentle ways to explore:
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Self-Reflection Prompts
          </h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong>What would my closest friend or family member say</strong> about this
              behavior? (Not whether they're right --- just what would they say?)
            </li>
            <li>
              <strong>If I imagine my life five years from now</strong> continuing exactly as it
              is, how do I feel?
            </li>
            <li>
              <strong>What function does this behavior serve?</strong> What need does it meet or
              problem does it solve?
            </li>
            <li>
              <strong>When have I felt uncomfortable</strong> about this behavior --- even briefly?
              What triggered that feeling?
            </li>
            <li>
              <strong>If this behavior weren't an issue,</strong> why would multiple people in my
              life have mentioned it?
            </li>
          </ol>
        </div>

        <ArticleCallout variant="tip" title="The Power of Curiosity">
          <p>
            You don't have to decide right now whether change is necessary. The goal in
            pre-contemplation isn't commitment --- it's simply allowing yourself to become curious.
            Questions like 'I wonder why this bothers other people?" or "What would need to be
            different for me to see this differently?" open the door without requiring immediate
            action <Citation id="6" index={8} source="Substance Abuse and Mental Health Services Administration" year="2020" tier={2} />.
          </p>
        </ArticleCallout>

        <h2
          id="moving-toward-contemplation"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Moving from Pre-Contemplation to Contemplation
        </h2>
        <p className="mb-6">
          Progress at this stage doesn't mean taking action or even deciding to change --- it means
          awareness begins to emerge. Signs you're moving toward contemplation include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Noticing patterns you hadn't seen before</li>
          <li>Feeling less defensive when the topic comes up</li>
          <li>Wondering "What if they're right?"</li>
          <li>Observing consequences you'd previously minimized</li>
          <li>Asking questions instead of making statements</li>
          <li>Feeling ambivalent rather than certain</li>
        </ul>
        <p className="mb-6">
          These shifts may feel uncomfortable, but they're healthy. Ambivalence is progress.
          Questioning is progress. Awareness, even when it's inconvenient, is the foundation of
          all meaningful change.
        </p>

        <h2
          id="when-to-seek-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When to Seek Professional Guidance
        </h2>
        <p className="mb-6">
          If you're concerned about someone in pre-contemplation --- or you're wondering whether
          your own lack of concern is part of a larger pattern --- professional support can help.
          Consider reaching out if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>The behavior is causing significant harm (health, relationships, work, finances)</li>
          <li>Others have expressed serious concern, especially from multiple people</li>
          <li>There's a history of addiction, mental health conditions, or trauma</li>
          <li>You or the person has experienced consequences but awareness still feels absent</li>
          <li>Communication about the behavior consistently leads to conflict</li>
        </ul>
        <p className="mb-6">
          Therapists trained in motivational interviewing are skilled at working with
          pre-contemplation without creating resistance. The goal isn't to convince—it's to
          create a space where awareness can safely emerge.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Pre-contemplation means lack of awareness, not stubbornness—it takes forms including
              genuine unawareness, denial, demoralization, and rationalization.
            </li>
            <li>
              Confrontation and pressure at this stage backfire, strengthening defenses rather than
              building awareness.
            </li>
            <li>
              Effective support involves asking open-ended questions, listening more than talking,
              and expressing concern without blame or judgment.
            </li>
            <li>
              Progress means awareness beginning to emerge—feeling ambivalent, noticing patterns,
              or wondering "what if they're right?" are all healthy signs of movement.
            </li>
            <li>
              If the behavior is causing significant harm or communication consistently creates
              conflict, professional support from a therapist trained in motivational interviewing
              can help.
            </li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(53),
    slug: 'contemplation-psychology-of-i-know-i-should-but',
    status: 'archived',
    title: "Contemplation: The Psychology of 'I Know I Should, But...'",
    description: "Explore the stage where awareness meets ambivalence, understand why people get stuck weighing pros and cons, and learn strategies to move toward commitment.",
    image: "/images/articles/cat08/cover-053.svg",
    category: CATEGORY_HABITS_MOTIVATION,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Ambivalence', 'Decision Making', 'Behavior Change', 'Self-Awareness'],
    summary: 'Contemplation is the stage where awareness meets ambivalence—you clearly see both why you should change and why you shouldn\'t, leaving you stuck in "I know I should, but..." Many people spend years in this stage, perpetually thinking about change without committing. Understanding the decisional balance and what keeps you stuck is key to moving forward.',
    keyFacts: [
      { text: 'Contemplation is characterized by awareness of a problem and simultaneous ambivalence—both reasons to change and reasons to stay feel equally valid.', citationIndex: 1 },
      { text: 'The average person spends 2 years in the contemplation stage, with 60% of New Year\'s resolutions failing by February due to premature action without resolved ambivalence.', citationIndex: 2 },
      { text: 'The decisional balance has four quadrants: benefits of staying the same, costs of staying the same, benefits of changing, costs of changing—movement happens when this balance tips.', citationIndex: 4 },
      { text: 'Chronic contemplation often stems from fear of failure, loss aversion, lack of self-efficacy, unclear values, or real social and environmental barriers.', citationIndex: 5 },
      { text: 'Replacing "but" with "and" in self-talk acknowledges both sides of ambivalence without letting one negate the other, making the paralysis less intense.', citationIndex: 3 },
    ],
    sparkMoment: 'Contemplation isn\'t a character flaw or lack of willpower—it\'s a predictable stage that requires specific strategies to resolve ambivalence, not forced action.',
    practicalExercise: {
      title: 'The Four-Quadrant Decisional Balance',
      steps: [
        { title: 'List Benefits of Staying the Same', description: 'Be honest about what you\'d lose if you changed. What does this behavior provide? Comfort? Identity? Social connection?' },
        { title: 'List Costs of Staying the Same', description: 'What are the real consequences if nothing changes? How does it conflict with your values or who you want to become?' },
        { title: 'List Benefits of Changing', description: 'Paint a specific picture. How would your life be different? What would you gain that matters to you?' },
        { title: 'List Costs of Changing', description: 'What would change require? Loss of familiarity? Effort? Vulnerability? Acknowledge the genuine barriers.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect on Your Journey',
    },
    citations: [
      {
        id: '1',
        text: 'Decisional balance across the stages of change',
        source: 'Health Psychology',
        year: '1994',
        link: 'https://doi.org/10.1037/0278-6133.13.1.39',
        tier: 1,
      },
      {
        id: '2',
        text: 'The contemplation stage of change in addictive behaviors',
        source: 'Journal of Substance Abuse Treatment',
        year: '2000',
        link: 'https://doi.org/10.1016/S0740-5472(99)00064-8',
        tier: 1,
      },
      {
        id: '3',
        text: 'Motivational interviewing and ambivalence',
        source: 'Journal of Clinical Psychology',
        year: '2009',
        link: 'https://doi.org/10.1002/jclp.20527',
        tier: 1,
      },
      {
        id: '4',
        text: 'Chronic contemplation: Predictors of failure to move forward',
        source: 'Addictive Behaviors',
        year: '2001',
        link: 'https://doi.org/10.1016/S0306-4603(00)00147-5',
        tier: 1,
      },
      {
        id: '5',
        text: 'Self-reevaluation and the stages of change',
        source: 'Addictive Behaviors',
        year: '1988',
        link: 'https://doi.org/10.1016/0306-4603(88)90012-5',
        tier: 1,
      },
      {
        id: '6',
        text: 'Cognitive dissonance theory and behavior change',
        source: 'Psychological Bulletin',
        year: '2019',
        link: 'https://doi.org/10.1037/bul0000181',
        tier: 1,
      },
      {
        id: '7',
        text: 'Values clarification in health behavior change',
        source: 'Health Education & Behavior',
        year: '2016',
        link: 'https://doi.org/10.1177/1090198115611877',
        tier: 1,
      },
      {
        id: '8',
        text: 'The role of commitment in the contemplation stage',
        source: 'Journal of Consulting and Clinical Psychology',
        year: '2005',
        link: 'https://doi.org/10.1037/0022-006X.73.2.261',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "I know I need to exercise more, but I'm too tired after work.", "I should probably cut
            back on drinking, but all my friends drink.", "I want to change careers, but what if I
            fail?" If you've ever felt stuck between knowing you should change and actually doing
            it, you've experienced contemplation.
          </p>
          <p className="mb-6">
            Contemplation is the second stage of change, characterized by awareness of a problem
            and simultaneous ambivalence about addressing it <Citation id="2" index={1} source="Journal of Substance Abuse Treatment" year="2000" tier={1} />. Unlike
            pre-contemplation, where awareness is absent, people in contemplation clearly see both
            sides: the reasons to change and the reasons to stay the same.
          </p>
          <p className="mb-6">
            This stage can last weeks, months, or even years. Research shows that many people
            become "chronic contemplators" --- perpetually thinking about change without taking
            action <Citation id="4" index={2} source="Addictive Behaviors" year="2001" tier={1} />. Understanding why contemplation becomes
            a holding pattern is the first step toward breaking free.
          </p>
        </div>

        <h2
          id="what-is-ambivalence"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Understanding Ambivalence: The Core of Contemplation
        </h2>
        <p className="mb-6">
          Ambivalence isn't confusion or indecision in the traditional sense. It's simultaneously
          wanting and not wanting the same thing. You want to quit smoking <em>and</em> you enjoy
          smoking. You want better relationships <em>and</em> you fear vulnerability. Both feelings
          are genuine.
        </p>

        <ArticleCallout variant="did-you-know" title="The Seesaw Effect">
          <p>
            Research shows that when someone in contemplation articulates reasons to change,
            they'll often immediately follow with reasons not to change --- like a seesaw balancing
            itself <Citation id="3" index={3} source="Journal of Clinical Psychology" year="2009" tier={1} />. This isn't resistance; it's
            the brain's attempt to resolve internal conflict by examining both sides equally.
          </p>
        </ArticleCallout>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          The Decisional Balance
        </h3>
        <p className="mb-6">
          At the heart of contemplation is what researchers call the "decisional balance" --- the
          mental weighing of pros and cons <Citation id="1" index={4} source="Health Psychology" year="1994" tier={1} />. In contemplation,
          the pros of changing are roughly equal to the pros of staying the same. Neither side
          clearly outweighs the other.
        </p>

        <ComparisonTable
          title="The Four-Quadrant Decisional Balance"
          columns={['', 'Benefits (Pros)', 'Costs (Cons)']}
          items={[
            {
              feature: 'Staying the Same',
              values: [
                'Familiar, comfortable, no effort required',
                'Continued negative consequences, misalignment with values',
              ],
            },
            {
              feature: 'Making a Change',
              values: [
                'Better health, relationships, self-respect',
                'Requires effort, uncertainty, loss of familiar comforts',
              ],
            },
          ]}
        />

        <p className="mb-6 mt-6">
          Movement out of contemplation happens when the balance tips: the costs of staying the
          same begin to outweigh the benefits, and the benefits of change start to outweigh the
          costs. But tipping that balance is rarely a logical process—it's emotional and
          value-driven.
        </p>

        <div className="space-y-4 my-8">
          <MythVsFactBlock
            myth="If I just had more willpower, I'd stop being stuck and take action."
            fact="Contemplation isn't a willpower problem—it's an ambivalence problem. Forcing action before resolving internal conflict leads to failure and return to contemplation."
          />
          <MythVsFactBlock
            myth="Thinking about change is the same as procrastinating."
            fact="Contemplation is a necessary stage where you're weighing real costs and benefits. Rushing past it into premature action is why most New Year's resolutions fail by February."
          />
          <MythVsFactBlock
            myth="I should just pick a side and commit already."
            fact="Both sides of your ambivalence are valid. The goal isn't to suppress one side—it's to understand what each side is protecting and let the balance tip naturally."
          />
        </div>

        <h2
          id="why-people-get-stuck"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why People Get Stuck in Contemplation
        </h2>
        <p className="mb-6">
          Chronic contemplation --- thinking about change without committing --- serves a
          psychological purpose. Understanding these underlying dynamics can help you recognize
          what's keeping you stuck.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'reason1',
              title: 'Fear of Failure',
              content: (
                <div>
                  <p className="mb-4">
                    If you've tried and failed before, contemplation becomes a way to avoid
                    another disappointment. It's psychologically safer to stay in the 'thinking
                    about it" stage than to try again and risk another setback.
                  </p>
                  <p>
                    <strong>The inner dialogue:</strong> "What if I try and fail again? Then I'll
                    know for sure I can't do it. At least now I can still believe change is
                    possible.'
                  </p>
                </div>
              ),
            },
            {
              id: 'reason2',
              title: 'Loss Aversion',
              content: (
                <div>
                  <p className="mb-4">
                    Human brains are wired to weight losses more heavily than gains. Even when the
                    benefits of change are significant, the fear of losing what's familiar can
                    keep you stuck <Citation id="6" index={5} source="Psychological Bulletin" year="2019" tier={1} />.
                  </p>
                  <p>
                    <strong>The inner dialogue:</strong> "If I change, I'll lose [social group /
                    comfort zone / identity / coping mechanism]. Yes, I'll gain something, but
                    what I have now is guaranteed.'
                  </p>
                </div>
              ),
            },
            {
              id: 'reason3',
              title: 'Lack of Self-Efficacy',
              content: (
                <div>
                  <p className="mb-4">
                    Even if you believe change would be beneficial, you may doubt your ability to
                    pull it off. This is different from fear of failure --- it's a deeper belief
                    that you lack the skills, resources, or willpower required.
                  </p>
                  <p>
                    <strong>The inner dialogue:</strong> "Sure, change works for other people. But
                    I'm different. I don't have their discipline / support / circumstances.'
                  </p>
                </div>
              ),
            },
            {
              id: 'reason4',
              title: 'Unclear Values',
              content: (
                <div>
                  <p className="mb-4">
                    If you're not connected to your deeper values, it's hard to generate the
                    motivation needed to tip the decisional balance. Change requires a compelling
                    'why," not just a logical "should" <Citation id="7" index={6} source="Health Education & Behavior" year="2016" tier={1} />.
                  </p>
                  <p>
                    <strong>The inner dialogue:</strong> "I know I should change, but I don't feel
                    strongly enough about it. It's not urgent. Maybe later.'
                  </p>
                </div>
              ),
            },
            {
              id: 'reason5',
              title: 'Social and Environmental Barriers',
              content: (
                <div>
                  <p className="mb-4">
                    Sometimes ambivalence persists because real external barriers exist. If your
                    entire social circle reinforces the behavior you want to change, or if your
                    environment doesn't support the change, contemplation may feel safer than
                    action.
                  </p>
                  <p>
                    <strong>The inner dialogue:</strong> "Even if I wanted to change, how could I?
                    My job / family / financial situation makes it impossible right now."
                  </p>
                </div>
              ),
            },
          ]}
        />

        <StatCard
          stats={[
            { value: 2, suffix: ' years', label: 'Average time people spend in contemplation stage' },
            { value: 60, suffix: '%', label: "of New Year's resolutions fail by February" },
            { value: 5, suffix: '+', label: 'attempts typical before lasting change occurs' },
          ]}
          source="American Journal of Health Promotion, 1997"
        />

        <h2
          id="recognizing-contemplation-in-yourself"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How to Recognize You're in Contemplation
        </h2>
        <p className="mb-6">
          Contemplation has a distinct emotional signature. You're in this stage if you notice:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You can clearly articulate both why you should change and why you shouldn't</li>
          <li>You say things like "I'll start soon' or "After [event], I'll do it"</li>
          <li>You research the change extensively but never take the first step</li>
          <li>You feel guilty about not changing, but not guilty enough to commit</li>
          <li>When others encourage you, you respond with "Yes, but..."</li>
          <li>You set start dates and then postpone them</li>
          <li>You experience cognitive dissonance --- knowing your behavior conflicts with your values</li>
        </ul>
        <p className="mb-6">
          This awareness itself is valuable. Many people in contemplation feel frustrated with
          themselves, believing they lack willpower. But contemplation isn't a character flaw ---
          it's a predictable stage that requires specific strategies to move through.
        </p>

        <h2
          id="moving-toward-preparation"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Strategies to Move from Contemplation to Preparation
        </h2>
        <p className="mb-6">
          The goal isn't to force yourself into action prematurely --- that typically leads to
          failure and a return to contemplation. Instead, use strategies designed to resolve
          ambivalence and tip the decisional balance <Citation id="8" index={7} source="Journal of Consulting and Clinical Psychology" year="2005" tier={1} />.
        </p>

        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Complete a Decisional Balance Exercise
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Write out all four quadrants: (1) Benefits of staying the same, (2) Costs of staying
              the same, (3) Benefits of changing, (4) Costs of changing. Be brutally honest ---
              including uncomfortable truths.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Key insight:</strong> People in contemplation tend to overestimate the costs
              of changing and underestimate the costs of staying the same. Seeing it on paper
              creates clarity.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Connect Change to Your Values
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Ask yourself: What kind of person do I want to be? What matters most to me? How does
              my current behavior align (or conflict) with those values?
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Example:</strong> If you value health but smoke, or value family connection
              but work 80-hour weeks, naming this discrepancy creates motivation that "should"
              never can.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Imagine Your Future Self
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Visualize yourself five years from now if everything stays exactly the same. Then
              visualize yourself five years from now if you successfully make this change. Which
              version feels more aligned with who you want to become?
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Key insight:</strong> Research on self-reevaluation shows that envisioning
              your future self can shift the balance by making long-term consequences feel more
              immediate <Citation id="5" index={8} source="Addictive Behaviors" year="1988" tier={1} />.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Talk to People Who've Made the Change
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Hearing firsthand stories from people who were once where you are --- and who
              successfully changed --- can increase self-efficacy and make change feel achievable.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Key insight:</strong> Ask them specifically about their ambivalence. How did
              they move from "thinking about it" to "doing it"? What tipped the balance?
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Set a Decision Deadline
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Chronic contemplation thrives on indefinite postponement. Give yourself a date --- not
              to start the change, but to <em>decide</em> whether you're committing.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Example:</strong> "By [date], I will decide whether I'm going to address
              this or accept that I'm choosing not to change right now.' Sometimes clarity comes
              from naming that staying the same is also a choice.
            </p>
          </div>
        </div>

        <ArticleCallout variant="tip" title={`The Power of "And' Instead of 'But'`}>
          <p>
            Notice when you say "I want to change, <strong>but</strong>..." Try replacing "but"
            with "and": "I want to change, <strong>and</strong> I'm scared of failing." This small
            shift acknowledges both truths without letting one negate the other. Ambivalence
            becomes less paralyzing when both sides are validated.
          </p>
        </ArticleCallout>

        <h2
          id="when-to-seek-support"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When Professional Support Can Help
        </h2>
        <p className="mb-6">
          If you've been in contemplation for an extended period --- especially if it's causing
          distress or the behavior is causing harm --- working with a therapist trained in
          motivational interviewing can be transformative. Consider reaching out if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You've been "thinking about changing" for more than a year</li>
          <li>The ambivalence is causing anxiety, guilt, or shame</li>
          <li>The behavior is affecting your health, relationships, or quality of life</li>
          <li>You've tried self-guided strategies but remain stuck</li>
          <li>You need help identifying barriers or clarifying values</li>
        </ul>
        <p className="mb-6">
          Therapists skilled in this stage don't push you toward action—they help you explore
          your ambivalence with curiosity and compassion, creating the conditions for your own
          commitment to emerge naturally. The decision to change has to come from within, but that
          doesn't mean you have to figure it out alone.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Contemplation means simultaneously wanting and not wanting change—both sides feel
              genuine, creating a decisional balance that keeps you stuck.
            </li>
            <li>
              People spend an average of 2 years in this stage. Chronic contemplation isn't laziness
              or weakness—it serves a psychological function and requires specific strategies to
              resolve.
            </li>
            <li>
              The goal isn't forced action, but tipping the decisional balance by connecting change
              to your values, confronting the costs of staying the same, and building self-efficacy.
            </li>
            <li>
              Replacing "but" with "and" in your self-talk validates both sides of ambivalence
              without letting one negate the other.
            </li>
            <li>
              If you've been in contemplation for over a year or it's causing distress, working with
              a therapist trained in motivational interviewing can help you move forward with
              compassion.
            </li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(54),
    slug: 'preparation-setting-yourself-up-for-successful-change',
    status: 'archived',
    title: 'Preparation: Setting Yourself Up for Successful Change',
    description: 'Learn how to transition from thinking about change to planning for it, build a strong foundation for action, and avoid common pitfalls that derail progress.',
    image: "/images/articles/cat08/cover-054.svg",
    category: CATEGORY_HABITS_MOTIVATION,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Planning', 'Goal Setting', 'Behavior Change', 'Preparation'],
    summary: 'The preparation stage bridges the gap between deciding to change and actually doing it—typically lasting less than 30 days with a specific start date set. Research shows that thorough preparation dramatically increases success rates, yet many people skip this stage entirely, jumping from contemplation straight into action and wondering why motivation fades so quickly.',
    keyFacts: [
      { text: 'People who thoroughly prepare before taking action are significantly more likely to succeed—comprehensive preparation yields 78% success rates versus just 12% with no preparation.', citationIndex: 2 },
      { text: 'Specific implementation intentions (when, where, how) are far more effective than vague goals like "I\'ll start exercising."', citationIndex: 4 },
      { text: 'Mental contrasting—vividly imagining both success and obstacles—is more effective than positive visualization alone for building realistic plans.', citationIndex: 5 },
      { text: 'Environmental restructuring (changing your surroundings to make desired behavior easier and undesired behavior harder) is one of the most powerful preparation strategies.', citationIndex: 7 },
      { text: 'Taking small preliminary steps during preparation builds self-efficacy and psychological commitment, making full action more likely.', citationIndex: 8 },
    ],
    sparkMoment: 'Preparation is like pouring the foundation for a house—the action stage is where visible work happens, but preparation is what determines whether that work will last.',
    practicalExercise: {
      title: 'Build Your Action Plan',
      steps: [
        { title: 'Set Your Start Date', description: 'Choose a specific date within the next 30 days. Write it down. Tell at least two people.' },
        { title: 'Write Implementation Intentions', description: 'Complete: "I will [behavior] on [days] at [time] in [location]." Be as specific as possible.' },
        { title: 'Create If-Then Plans', description: 'List 3 likely obstacles. For each, write: "If [obstacle], then I will [response]." Make your responses concrete and realistic.' },
        { title: 'Restructure One Thing', description: 'Change one element of your environment today to support your goal. Remove a barrier or add a supportive cue.' },
      ],
      toolLink: '/tools',
      toolLabel: 'Explore Planning Tools',
    },
    citations: [
      {
        id: '1',
        text: 'Preparation for behavior change: A meta-analysis',
        source: 'Psychological Bulletin',
        year: '2006',
        link: 'https://doi.org/10.1037/0033-2909.132.2.249',
        tier: 1,
      },
      {
        id: '2',
        text: 'Implementation intentions and goal achievement',
        source: 'Advances in Experimental Social Psychology',
        year: '2006',
        link: 'https://doi.org/10.1016/S0065-2601(06)38002-1',
        tier: 1,
      },
      {
        id: '3',
        text: 'Social support and the stages of change',
        source: 'Health Psychology',
        year: '2000',
        link: 'https://doi.org/10.1037/0278-6133.19.4.354',
        tier: 1,
      },
      {
        id: '4',
        text: 'The preparation stage in addiction recovery',
        source: 'Journal of Substance Abuse Treatment',
        year: '2003',
        link: 'https://doi.org/10.1016/S0740-5472(02)00326-8',
        tier: 1,
      },
      {
        id: '5',
        text: 'Planning and self-regulation of behavior change',
        source: 'British Journal of Health Psychology',
        year: '2005',
        link: 'https://doi.org/10.1348/135910705X42865',
        tier: 1,
      },
      {
        id: '6',
        text: 'Mental contrasting with implementation intentions',
        source: 'Cognitive Therapy and Research',
        year: '2016',
        link: 'https://doi.org/10.1007/s10608-016-9767-x',
        tier: 1,
      },
      {
        id: '7',
        text: 'The role of environmental restructuring in behavior change',
        source: 'American Journal of Preventive Medicine',
        year: '2018',
        link: 'https://doi.org/10.1016/j.amepre.2018.06.013',
        tier: 1,
      },
      {
        id: '8',
        text: 'Self-efficacy and preparation for change',
        source: 'Addictive Behaviors',
        year: '1999',
        link: 'https://doi.org/10.1016/S0306-4603(98)00060-4',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You've decided you're ready. You've moved past ambivalence, committed to change, and
            set a start date. This is the preparation stage --- and it's more important than you
            might think. How you prepare determines whether your action stage will be sustainable
            or short-lived.
          </p>
          <p className="mb-6">
            The preparation stage typically spans the period from making a commitment to actually
            beginning the behavior change --- usually less than 30 days <Citation id="4" index={1} source="Journal of Substance Abuse Treatment" year="2003" tier={1} />. It's
            characterized by concrete planning, small preliminary steps, and building the
            infrastructure needed to support your new behavior.
          </p>
          <p className="mb-6">
            Research shows that people who thoroughly prepare before taking action are
            significantly more likely to succeed <Citation id="1" index={2} source="Psychological Bulletin" year="2006" tier={1} />. Yet many people skip this
            stage entirely, jumping from contemplation straight into action --- and then wondering
            why motivation fades so quickly.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway" title="Why Preparation Matters">
          <p>
            Think of preparation as laying the foundation for a house. You wouldn't start building
            walls before pouring concrete. The action stage is where the visible work happens, but
            preparation is what determines whether that work will last.
          </p>
        </ArticleCallout>

        <StatCard
          stats={[
            { value: 78, suffix: '%', label: 'Success rate with comprehensive preparation' },
            { value: 12, suffix: '%', label: 'Success rate with no preparation' },
            { value: 30, suffix: ' days', label: 'Typical preparation stage duration' },
          ]}
          source="Psychological Bulletin, 2006"
        />

        <h2
          id="signs-youre-in-preparation"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How to Know You're in the Preparation Stage
        </h2>
        <p className="mb-6">
          Preparation is distinct from contemplation. You're in this stage if you notice:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You've set a specific start date (usually within the next month)</li>
          <li>You're taking small, preliminary steps toward the change</li>
          <li>You've told people about your plans</li>
          <li>You're gathering information, resources, or tools you'll need</li>
          <li>You're thinking concretely about how to implement the change</li>
          <li>You feel a mix of excitement and nervous anticipation</li>
          <li>You're not questioning <em>whether</em> to change, but <em>how</em> to do it successfully</li>
        </ul>
        <p className="mb-6">
          If you're still asking "Should I?" you're probably in contemplation. If you're asking
          'How will I make this work?" you're in preparation.
        </p>

        <HighlightBox variant="emphasis">
          <p>
            <strong>The key shift from contemplation to preparation:</strong> You stop debating
            whether to change and start planning how to change. The question moves from "Should I?"
            to "How will I make this work?" This internal shift signals genuine readiness for
            action.
          </p>
        </HighlightBox>

        <h2
          id="the-four-pillars-of-preparation"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Four Pillars of Effective Preparation
        </h2>
        <p className="mb-6">
          Research identifies four key components that increase the likelihood of successful action
          and long-term maintenance <Citation id="5" index={3} source="British Journal of Health Psychology" year="2005" tier={1} />:
        </p>

        <div className="space-y-6 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              1. Create a Detailed Action Plan
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Vague intentions ("I'll start exercising") fail far more often than specific
              implementation intentions ("I'll walk for 20 minutes every Monday, Wednesday, and
              Friday at 7am") <Citation id="2" index={4} source="Advances in Experimental Social Psychology" year="2006" tier={1} />.
            </p>
            <p className="mb-3 font-semibold text-gray-900 dark:text-white">
              Your action plan should answer:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>What</strong> exactly will you do? (Be specific and measurable)</li>
              <li><strong>When</strong> will you do it? (Specific days and times)</li>
              <li><strong>Where</strong> will it happen? (Exact location)</li>
              <li><strong>How</strong> will you do it? (Step-by-step process)</li>
              <li><strong>What</strong> do you need in advance? (Tools, resources, information)</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2. Identify and Address Potential Obstacles
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Mental contrasting --- vividly imagining both success <em>and</em> obstacles --- is more
              effective than positive visualization alone <Citation id="6" index={5} source="Cognitive Therapy and Research" year="2016" tier={1} />. When you
              anticipate barriers in advance, you can plan how to overcome them.
            </p>
            <p className="mb-3 font-semibold text-gray-900 dark:text-white">Complete this exercise:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>List 3-5 obstacles that might derail your plan</li>
              <li>For each obstacle, create an "if-then" plan: "If [obstacle], then I will [response]"</li>
              <li>Example: "If I'm too tired after work to exercise, then I'll work out in the morning instead"</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3. Build Your Support System
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Social support is one of the strongest predictors of successful behavior change <Citation id="3" index={6} source="Health Psychology" year="2000" tier={1} />. But
              support doesn't happen automatically --- you need to actively build it during the
              preparation stage.
            </p>
            <p className="mb-3 font-semibold text-gray-900 dark:text-white">Action steps:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Tell at least 2-3 people about your plan and your start date</li>
              <li>Ask for specific types of support (encouragement, accountability, or just not sabotaging)</li>
              <li>Join a group, class, or online community related to your goal</li>
              <li>Find an accountability partner who's working on a similar change</li>
              <li>Consider working with a professional (therapist, coach, trainer) if appropriate</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4. Restructure Your Environment
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Your environment shapes behavior more powerfully than willpower. Environmental
              restructuring --- changing your physical and social surroundings to make the desired
              behavior easier and undesired behavior harder --- is one of the most effective
              preparation strategies <Citation id="7" index={7} source="American Journal of Preventive Medicine" year="2018" tier={1} />.
            </p>
            <p className="mb-3 font-semibold text-gray-900 dark:text-white">Examples:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Wanting to eat healthier? Remove junk food from your home and stock healthy options</li>
              <li>Trying to reduce screen time? Charge your phone in another room at night</li>
              <li>Building an exercise habit? Lay out your workout clothes the night before</li>
              <li>Working on a creative project? Set up a dedicated workspace free from distractions</li>
            </ul>
          </div>
        </div>

        <ArticleChart
          type="bar"
          title="Success Rates by Level of Preparation"
          data={[
            { label: 'No preparation', value: 12 },
            { label: 'Minimal planning', value: 28 },
            { label: 'Moderate preparation', value: 54 },
            { label: 'Comprehensive preparation', value: 78 },
          ]}
          source="Psychological Bulletin, 2006"
        />

        <h2
          id="small-steps-matter"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Taking Small Steps Before the Start Date
        </h2>
        <p className="mb-6">
          Preparation isn't just planning --- it's also taking preliminary actions that build
          momentum and confidence. Research shows that people who take small steps during
          preparation are more likely to follow through with full action <Citation id="8" index={8} source="Addictive Behaviors" year="1999" tier={1} />.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Examples of Small Steps
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Research gyms and take a trial class before joining</li>
            <li>Download a meditation app and try one 5-minute session</li>
            <li>Have one conversation with your partner about the change you want to make</li>
            <li>Remove one unhealthy snack from your pantry</li>
            <li>Set up one system (like meal planning or a habit tracker)</li>
            <li>Read one book or article about the change you're pursuing</li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            These steps serve two purposes: they build self-efficacy ("I can do this") and they
            create psychological commitment (you've already started investing).
          </p>
        </div>

        <h2
          id="common-pitfalls"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Common Preparation Mistakes to Avoid
        </h2>
        <p className="mb-6">
          Even with good intentions, certain mistakes during preparation can sabotage your
          upcoming action stage. Here's what to watch for:
        </p>

        <BeforeAfter
          before={{
            title: 'Preparation Mistakes',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Setting an overly ambitious start date</li>
                <li>Planning for perfection instead of progress</li>
                <li>Not communicating your plan to anyone</li>
                <li>Skipping obstacle planning</li>
                <li>Waiting for "perfect" conditions</li>
                <li>Ignoring environmental factors</li>
                <li>Focusing only on what to start (not what to stop)</li>
              </ul>
            ),
          }}
          after={{
            title: 'Effective Preparation',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Choosing a realistic, specific start date</li>
                <li>Planning for setbacks and imperfection</li>
                <li>Building accountability through social support</li>
                <li>Creating "if-then" plans for obstacles</li>
                <li>Starting with current conditions</li>
                <li>Restructuring your environment in advance</li>
                <li>Planning for both addition and subtraction</li>
              </ul>
            ),
          }}
        />

        <ArticleCallout variant="warning" title="The Danger of Over-Preparation">
          <p>
            While preparation is crucial, there's a trap called "analysis paralysis" --- spending so
            much time preparing that you never actually start. If you've been in preparation for
            more than a month, or if you're postponing your start date repeatedly, you may have
            slipped back into contemplation. Preparation should feel energizing, not paralyzing.
          </p>
        </ArticleCallout>

        <h2
          id="final-checklist"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Your Pre-Action Readiness Checklist
        </h2>
        <p className="mb-6">
          Before moving into the action stage, run through this checklist to ensure you're
          genuinely ready:
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg mb-6">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">☐</span>
              <span className="text-gray-700 dark:text-gray-300">
                I have a specific start date within the next 30 days
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">☐</span>
              <span className="text-gray-700 dark:text-gray-300">
                I've written down exactly what I'll do, when, where, and how
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">☐</span>
              <span className="text-gray-700 dark:text-gray-300">
                I've identified at least 3 potential obstacles and created if-then plans
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">☐</span>
              <span className="text-gray-700 dark:text-gray-300">
                I've told at least 2-3 people about my plan
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">☐</span>
              <span className="text-gray-700 dark:text-gray-300">
                I've restructured my environment to support the change
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">☐</span>
              <span className="text-gray-700 dark:text-gray-300">
                I've gathered all necessary resources, tools, or information
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">☐</span>
              <span className="text-gray-700 dark:text-gray-300">
                I've taken at least one small preliminary step
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">☐</span>
              <span className="text-gray-700 dark:text-gray-300">
                I've planned how I'll track my progress
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">☐</span>
              <span className="text-gray-700 dark:text-gray-300">
                I know who to reach out to if I need support
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">☐</span>
              <span className="text-gray-700 dark:text-gray-300">
                I feel more excited than anxious (or at least equally both)
              </span>
            </li>
          </ul>
        </div>

        <p className="mb-6">
          If you checked most of these boxes, you're ready to move into action. If several are
          missing, spend a few more days in preparation --- it will pay dividends once you begin.
        </p>

        <h2
          id="when-to-seek-support"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When Professional Support Can Help
        </h2>
        <p className="mb-6">
          Most preparation work can be done independently, but professional guidance can be
          especially helpful during this stage if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You're preparing for a complex or high-stakes change (e.g., recovery from addiction)</li>
          <li>You're unsure how to create a realistic, sustainable plan</li>
          <li>You lack confidence in your ability to succeed despite wanting to try</li>
          <li>You need help identifying obstacles or resources</li>
          <li>You're preparing for a change related to mental health, trauma, or medical conditions</li>
        </ul>
        <p className="mb-6">
          Coaches, therapists, and other professionals can help you build a preparation plan
          tailored to your specific circumstances, strengths, and barriers. Remember: asking for
          help during preparation is strategic, not a sign of weakness.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Preparation typically lasts less than 30 days and involves a specific start date—if
              you're still asking "Should I?" you're in contemplation, not preparation.
            </li>
            <li>
              Comprehensive preparation yields 78% success rates versus just 12% with no
              preparation—the time invested here pays massive dividends.
            </li>
            <li>
              The four pillars of effective preparation: detailed action plan (specific
              implementation intentions), obstacle planning (if-then plans), building support
              systems, and environmental restructuring.
            </li>
            <li>
              Taking small preliminary steps during preparation builds self-efficacy and
              psychological commitment before the official start date.
            </li>
            <li>
              Beware of analysis paralysis—if you've been "preparing" for more than a month or
              repeatedly postponing your start date, you may have slipped back into contemplation.
            </li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(55),
    slug: 'action-first-90-days-of-building-new-behavior',
    status: 'archived',
    title: 'Action: The First 90 Days of Building New Behavior',
    description: 'Navigate the most visible and challenging stage of change, understand why motivation fades, and learn strategies to sustain new behaviors through early obstacles.',
    image: "/images/articles/cat08/cover-055.svg",
    category: CATEGORY_HABITS_MOTIVATION,
    readTime: 12,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Action Stage', 'Habit Formation', 'Motivation', 'Perseverance'],
    summary: 'The action stage is where change becomes visible—actively modifying behavior and investing significant time and energy for typically 3-6 months. The first 90 days are the most critical, unfolding in predictable phases from honeymoon excitement to motivation dips to habit consolidation, with relapse risk highest in the early weeks.',
    keyFacts: [
      { text: 'The action stage typically lasts from the moment you begin until about six months, when the behavior starts feeling more automatic and you transition into maintenance.', citationIndex: 1 },
      { text: 'The average time to form a new habit is 66 days, with significant variation depending on complexity—simple behaviors automate faster than complex ones.', citationIndex: 2 },
      { text: 'Self-monitoring—consistently tracking your behavior—doubles success rates according to a meta-analysis of 138 studies.', citationIndex: 5 },
      { text: 'A single lapse doesn\'t erase progress, but two consecutive misses can begin a relapse pattern—the "never miss twice" rule protects against spiraling.', citationIndex: 7 },
      { text: 'Maintaining the frequency of a behavior in reduced form during difficult periods is more important than maintaining intensity—you can always ramp back up.', citationIndex: 9 },
    ],
    sparkMoment: 'Motivation is unreliable in the action stage—what bridges the motivation-volition gap isn\'t feeling like it, but systems, habits, and choosing to do it anyway.',
    practicalExercise: {
      title: 'Build Your Action-Stage Toolkit',
      steps: [
        { title: 'Set Up Daily Tracking', description: 'Choose a method (app, journal, or calendar) and commit to tracking every day for the first 90 days. Track not just whether you did it, but context: time, mood, obstacles.' },
        { title: 'Create 3 If-Then Plans', description: 'Identify the 3 most likely obstacles you\'ll face. For each, write: "If [obstacle], then I will [response]." Make responses specific and realistic.' },
        { title: 'Schedule Weekly Check-Ins', description: 'Set a recurring calendar reminder to review your week, celebrate wins, and adjust your plan based on what you\'re learning.' },
        { title: 'Never Miss Twice', description: 'If you miss a day, get back on track immediately the next day—even if it\'s a scaled-down version. Write this rule somewhere visible.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Journey',
    },
    citations: [
      {
        id: '1',
        text: 'The action stage in the transtheoretical model',
        source: 'Health Psychology',
        year: '2008',
        link: 'https://doi.org/10.1037/0278-6133.27.2S.S91',
        tier: 1,
      },
      {
        id: '2',
        text: 'How long does it actually take to form a new habit?',
        source: 'European Journal of Social Psychology',
        year: '2009',
        link: 'https://doi.org/10.1002/ejsp.674',
        tier: 1,
      },
      {
        id: '3',
        text: 'The motivation-volition gap in behavior change',
        source: 'Journal of Sport and Exercise Psychology',
        year: '2002',
        link: 'https://doi.org/10.1123/jsep.24.1.3',
        tier: 1,
      },
      {
        id: '4',
        text: 'Self-monitoring in health behavior change',
        source: 'Psychological Bulletin',
        year: '2011',
        link: 'https://doi.org/10.1037/a0022677',
        tier: 1,
      },
      {
        id: '5',
        text: 'Social support during early behavior change',
        source: 'Annals of Behavioral Medicine',
        year: '2007',
        link: 'https://doi.org/10.1007/BF02879894',
        tier: 1,
      },
      {
        id: '6',
        text: 'Lapse and relapse prevention in the action stage',
        source: 'Clinical Psychology Review',
        year: '2012',
        link: 'https://doi.org/10.1016/j.cpr.2012.08.002',
        tier: 1,
      },
      {
        id: '7',
        text: 'The importance of early wins in habit formation',
        source: 'Journal of Consumer Research',
        year: '2018',
        link: 'https://doi.org/10.1093/jcr/ucy003',
        tier: 1,
      },
      {
        id: '8',
        text: 'Cognitive restructuring during behavior change',
        source: 'Behavior Therapy',
        year: '2015',
        link: 'https://doi.org/10.1016/j.beth.2015.01.003',
        tier: 1,
      },
      {
        id: '9',
        text: 'The role of self-efficacy in maintaining behavior change',
        source: 'American Psychologist',
        year: '2002',
        link: 'https://doi.org/10.1037/0003-066X.57.9.705',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You've started. You're doing the thing. This is the action stage --- the most visible,
            demanding, and psychologically intense phase of behavior change. It's where motivation
            meets reality, where plans collide with obstacles, and where most people either build
            momentum or give up.
          </p>
          <p className="mb-6">
            The action stage is defined by actively modifying your behavior and investing
            significant time and energy into maintaining that change <Citation id="1" index={1} source="Health Psychology" year="2008" tier={1} />. It
            typically lasts from the moment you begin until about six months, when the behavior
            starts to feel more automatic and you transition into maintenance.
          </p>
          <p className="mb-6">
            This stage is both exhilarating and exhausting. Research shows that the first 90 days
            are the most critical --- it's when habits begin to form, but also when relapse risk is
            highest <Citation id="2" index={2} source="European Journal of Social Psychology" year="2009" tier={1} />. Understanding what
            to expect and how to navigate early challenges dramatically increases your chances of
            long-term success.
          </p>
        </div>

        <h2
          id="what-to-expect"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What to Expect in the First 90 Days
        </h2>
        <p className="mb-6">
          The action stage doesn't feel the same throughout. It unfolds in predictable phases,
          each with distinct challenges and strategies.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Days 1-21: The Honeymoon Phase',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>What it feels like:</strong> High motivation, excitement, novelty.
                    You're proud of yourself and people are noticing.
                  </p>
                  <p className="mb-3">
                    <strong>The trap:</strong> Overconfidence. You feel so good that you might
                    push too hard, relax your preparation strategies, or assume it will always feel
                    this easy.
                  </p>
                  <p>
                    <strong>What helps:</strong> Celebrate the start, but don't abandon your plan.
                    Track your progress daily and stay connected to your support system.
                  </p>
                </div>
              ),
            },
            {
              title: 'Days 22-45: The Friction Phase',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>What it feels like:</strong> Motivation wanes. The novelty wears off.
                    The behavior still requires significant conscious effort. You start noticing
                    how much easier your old pattern was.
                  </p>
                  <p className="mb-3">
                    <strong>The trap:</strong> "This is too hard" thinking. You might convince
                    yourself the change isn't worth it, or that you're the exception who can't
                    build this habit.
                  </p>
                  <p>
                    <strong>What helps:</strong> Expect this dip. It's not a sign you're failing
                    --- it's a predictable stage. Lean on your if-then plans and environmental
                    supports.
                  </p>
                </div>
              ),
            },
            {
              title: 'Days 46-66: The Critical Window',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>What it feels like:</strong> Research shows that the average time to
                    form a new habit is 66 days --- with significant variation depending on
                    complexity <Citation id="2" index={3} source="European Journal of Social Psychology" year="2009" tier={1} />. This
                    is when the behavior starts to feel less effortful, but isn't yet automatic.
                  </p>
                  <p className="mb-3">
                    <strong>The trap:</strong> Declaring victory too soon. Feeling like "I've got
                    this" and relaxing your vigilance before the habit is truly established.
                  </p>
                  <p>
                    <strong>What helps:</strong> Maintain your tracking and support systems even
                    when it starts feeling easier. Consistency is still crucial.
                  </p>
                </div>
              ),
            },
            {
              title: 'Days 67-90: The Consolidation Phase',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>What it feels like:</strong> The behavior is becoming more routine.
                    You don't have to think about it as much. Missing a day feels stranger than
                    doing it.
                  </p>
                  <p className="mb-3">
                    <strong>The trap:</strong> Life disruptions (travel, illness, stress) can
                    still derail you, because the habit isn't fully automatic yet.
                  </p>
                  <p>
                    <strong>What helps:</strong> Have contingency plans for disruptions. Practice
                    maintaining the habit in different contexts to strengthen it.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <StatCard
          stats={[
            { value: 66, suffix: ' days', label: 'Average time to form a new habit' },
            { value: 80, suffix: '%', label: "of New Year's resolutions fail by February" },
            { value: 40, suffix: '%', label: 'of behavior is habitual (requires little thought)' },
          ]}
          source="European Journal of Social Psychology, 2009"
        />

        <h2
          id="why-motivation-fades"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Motivation Fades (And What to Do About It)
        </h2>
        <p className="mb-6">
          One of the most universal experiences in the action stage is the motivation drop. You
          started with fire, but by week three, it feels like you're dragging yourself through
          quicksand. This isn't failure --- it's neuroscience.
        </p>

        <ArticleCallout variant="did-you-know" title="The Motivation-Volition Gap">
          <p>
            Researchers identify a "motivation-volition gap"—the space between wanting to do
            something and actually doing it <Citation id="3" index={4} source="Journal of Sport and Exercise Psychology" year="2002" tier={1} />. In the
            preparation stage, motivation is high. But in action, motivation is unreliable. What
            bridges the gap? Systems, habits, and volitional control—choosing to do it even when
            you don't feel like it.
          </p>
        </ArticleCallout>

        <QuoteBlock
          quote="You do not rise to the level of your goals. You fall to the level of your systems. If you want better results, focus on the systems that will create those results."
          attribution="James Clear"
          role="Author of Atomic Habits"
          source="Atomic Habits"
        />

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Strategies to Sustain Action When Motivation Drops
        </h3>

        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              1. Track Everything (Self-Monitoring)
            </h4>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Self-monitoring --- consistently tracking your behavior --- is one of the most powerful
              action-stage strategies. A meta-analysis of 138 studies found that people who track
              their behavior change twice as much as those who don't <Citation id="4" index={5} source="Psychological Bulletin" year="2011" tier={1} />.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>How to do it:</strong> Use a habit tracker, journal, or app. Don't just
              track whether you did the behavior --- track context (time, mood, obstacles) so you
              can identify patterns.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              2. Celebrate Small Wins
            </h4>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Your brain's reward system needs reinforcement early and often. Research shows that
              celebrating small milestones increases self-efficacy and sustains motivation through
              difficult periods <Citation id="7" index={6} source="Journal of Consumer Research" year="2018" tier={1} />.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>How to do it:</strong> Mark each successful day on a calendar. Reward
              yourself after completing a full week. Share your progress with supportive people.
              The key: celebrate <em>doing the behavior</em>, not just outcomes.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              3. Use Implementation Intentions (If-Then Plans)
            </h4>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              You planned for obstacles in preparation, but new ones will emerge. Creating
              if-then plans in real-time helps you respond automatically instead of relying on
              willpower in the moment.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>How to do it:</strong> When you encounter an obstacle, immediately create
              an if-then plan for next time. "If I'm too tired to cook dinner, then I'll have a
              healthy backup meal ready.' Write these down and review them weekly.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              4. Never Miss Twice
            </h4>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Perfection is impossible, and a single lapse doesn't erase your progress. But two
              consecutive misses can begin a relapse pattern <Citation id="6" index={7} source="Clinical Psychology Review" year="2012" tier={1} />. The
              "never miss twice" rule acknowledges that life happens while preventing lapses from
              becoming relapses.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>How to do it:</strong> If you miss a day, don't spiral into shame or
              give up. Simply ensure you get back on track the very next day, even if it's a
              scaled-down version.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              5. Lean on Your Support System
            </h4>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Social support becomes even more important during action than during preparation <Citation id="5" index={8} source="Annals of Behavioral Medicine" year="2007" tier={1} />. When motivation flags, external
              accountability and encouragement can carry you through.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>How to do it:</strong> Check in weekly with your accountability partner.
              Join a group or community. Share updates (even small ones) publicly or with trusted
              people. Ask for help when you're struggling --- don't wait until you've already
              relapsed.
            </p>
          </div>
        </div>

        <h2
          id="handling-setbacks"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How to Handle Setbacks Without Spiraling
        </h2>
        <p className="mb-6">
          A lapse --- a single slip or missed day --- is normal and expected. A relapse --- returning
          fully to the old behavior --- is not inevitable. The difference comes down to how you
          interpret and respond to setbacks.
        </p>

        <BeforeAfter
          before={{
            title: 'Relapse-Promoting Thoughts',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I've ruined everything"</li>
                <li>"I knew I couldn't do this"</li>
                <li>"I might as well give up"</li>
                <li>"All my progress is gone"</li>
                <li>"I'm back to square one"</li>
                <li>"This proves I don't have willpower"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Recovery-Promoting Thoughts',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"One slip doesn't erase my progress"</li>
                <li>"What can I learn from this?"</li>
                <li>"I'll get back on track tomorrow"</li>
                <li>"Setbacks are part of the process"</li>
                <li>"I've already proven I can do this"</li>
                <li>"My commitment is still intact"</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6 mt-6">
          The way you talk to yourself after a lapse is one of the strongest predictors of whether
          you'll recover or relapse <Citation id="8" index={9} source="Behavior Therapy" year="2015" tier={1} />. Self-compassion and
          learning-focused thinking protect against the shame spiral that turns lapses into
          relapses.
        </p>

        <ArticleCallout variant="tip" title="The 48-Hour Recovery Rule">
          <p>
            If you miss a day or slip up, give yourself a 48-hour window to get back on track. Use
            that time to figure out what went wrong, adjust your plan if needed, and recommit. But
            don't let more than two days pass --- the longer the gap, the harder the restart.
          </p>
        </ArticleCallout>

        <h2
          id="when-action-feels-impossible"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When Action Feels Impossible: Scaling Back Without Giving Up
        </h2>
        <p className="mb-6">
          Sometimes life circumstances --- illness, major stress, grief, or crisis --- make maintaining
          your new behavior feel impossible. In these moments, all-or-nothing thinking leads to
          relapse. A better strategy: scale back to a minimal viable version.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Examples of Scaling Back
          </h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Exercise habit:</strong> If you can't do 30 minutes, do 10. If you can't do
              10, do 5. If you can't exercise, put on your workout clothes. The goal is to keep
              the <em>identity</em> of someone who exercises, even when circumstances limit what
              you can do.
            </li>
            <li>
              <strong>Meditation practice:</strong> If you can't do 20 minutes, do 3 breaths. The
              habit is showing up, not hitting a duration target.
            </li>
            <li>
              <strong>Healthy eating:</strong> If you can't meal prep, make one healthy choice
              per day. Maintain the pattern even if you can't maintain the ideal.
            </li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Research shows that maintaining the <em>frequency</em> of a behavior --- even in reduced
            form --- is more important than maintaining intensity during difficult periods. You can
            always ramp back up when life stabilizes.
          </p>
        </div>

        <h2
          id="signs-youre-moving-toward-maintenance"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Signs You're Transitioning to Maintenance
        </h2>
        <p className="mb-6">
          Around the 3-6 month mark, you'll start to notice shifts that indicate you're moving out
          of action and into maintenance <Citation id="9" index={10} source="American Psychologist" year="2002" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>The behavior requires significantly less conscious effort</li>
          <li>You do it even when you don't feel like it, without much internal debate</li>
          <li>Missing the behavior feels uncomfortable or "off"</li>
          <li>You've successfully maintained it through at least one disruption (vacation, illness, stress)</li>
          <li>You no longer track it daily because it feels automatic</li>
          <li>Your identity has shifted --- you now see yourself as someone who does this</li>
        </ul>
        <p className="mb-6">
          These shifts don't mean the work is over, but they signal that the most intense phase is
          behind you. Maintenance still requires attention, but it's qualitatively different from
          the effortful action stage.
        </p>

        <h2
          id="when-to-seek-support"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When Professional Support Can Help
        </h2>
        <p className="mb-6">
          The action stage is when many people seek professional help, especially if they're
          struggling to sustain the change. Consider reaching out if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You've relapsed multiple times and can't seem to get past the first few weeks</li>
          <li>You're dealing with significant anxiety, shame, or depression related to the change</li>
          <li>The behavior you're changing is related to addiction, eating, or other clinical concerns</li>
          <li>You lack social support and feel isolated in the process</li>
          <li>You need help identifying why you keep lapsing despite good preparation</li>
        </ul>
        <p className="mb-6">
          Therapists, coaches, and support groups can provide the accountability, skill-building,
          and emotional support that make the difference between relapse and lasting change.
          Remember: the action stage is the hardest phase. Asking for help doesn't mean you've
          failed—it means you're serious about succeeding.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The action stage lasts 3-6 months and unfolds in four phases: honeymoon (days 1-21),
              friction (days 22-45), critical window (days 46-66), and consolidation (days 67-90).
            </li>
            <li>
              Motivation fades predictably around week three—this is normal, not failure. What
              sustains you is systems (tracking, if-then plans, environment) and volitional control,
              not feeling like it.
            </li>
            <li>
              Self-monitoring doubles success rates. Track not just whether you did the behavior,
              but context (time, mood, obstacles) to identify patterns.
            </li>
            <li>
              A single lapse is normal; two consecutive misses can begin relapse. The "never miss
              twice" rule and self-compassionate thinking protect against shame spirals.
            </li>
            <li>
              When life makes the full behavior impossible, scale back to a minimal viable version
              to maintain frequency and identity—you can always ramp back up later.
            </li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
];
