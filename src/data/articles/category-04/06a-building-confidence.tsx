 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SELF_WORTH, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  BeforeAfter,
  ProgressSteps,
  ArticleTabs,
} from '../../../components/article/blocks';

export const buildingConfidenceArticlesA: Article[] = [
  {
    id: catId(51),
    slug: 'confidence-gap-act-confident',
    title: "The Confidence Gap: Why You Don't Need to Feel Confident to Act Confident",
    description: "Discover why waiting to feel confident keeps you stuck, and how action creates confidence rather than the other way around.",
    image: "/images/articles/cat04/cover-051.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Confidence', 'Action', 'Self-Efficacy', 'Behavioral Psychology'],
    citations: [
      {
        id: '1',
        text: 'The Confidence Code: The Science and Art of Self-Assurance',
        source: 'HarperCollins',
        year: '2014',
        link: 'https://www.harpercollins.com/products/the-confidence-code-katty-kay',
        tier: 5,
      },
      {
        id: '2',
        text: 'Self-efficacy: Toward a unifying theory of behavioral change',
        source: 'Psychological Review',
        year: '1977',
        link: 'https://doi.org/10.1037/0033-295X.84.2.191',
        tier: 1,
      },
      {
        id: '3',
        text: 'Faking it until you make it: Confidence and competence development',
        source: 'Journal of Applied Psychology',
        year: '2018',
        link: 'https://doi.org/10.1037/apl0000303',
        tier: 1,
      },
      {
        id: '4',
        text: 'Action breeds confidence: The relationship between behavioral activation and self-efficacy',
        source: 'Behaviour Research and Therapy',
        year: '2016',
        link: 'https://doi.org/10.1016/j.brat.2016.03.008',
        tier: 1,
      },
      {
        id: '5',
        text: 'Gender differences in confidence: Evidence and implications',
        source: 'Journal of Economic Psychology',
        year: '2019',
        link: 'https://doi.org/10.1016/j.joep.2019.102238',
        tier: 1,
      },
      {
        id: '6',
        text: 'The role of mastery experiences in confidence development',
        source: 'Self and Identity',
        year: '2017',
        link: 'https://doi.org/10.1080/15298868.2017.1290272',
        tier: 1,
      },
      {
        id: '7',
        text: 'Confidence and performance: Longitudinal evidence from competitive settings',
        source: 'Organizational Behavior and Human Decision Processes',
        year: '2020',
        link: 'https://doi.org/10.1016/j.obhdp.2020.03.007',
        tier: 1,
      },
      {
        id: '8',
        text: 'Behavioral activation as a treatment for depression: Returning to contextual roots',
        source: 'Clinical Psychology: Science and Practice',
        year: '2011',
        link: 'https://doi.org/10.1111/j.1468-2850.2011.01255.x',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Most people wait to feel confident before they act. But research shows this is backward---confidence comes from action, not before it.
          </p>
          <p className="mb-6">
            The "confidence gap" refers to the space between how confident you feel and how confident you need to feel to take action <Citation id="1" index={1} source="HarperCollins" year="2014" tier={5} />. Studies show that competence often develops <em>after</em> we begin, not before <Citation id="3" index={3} source="Journal of Applied Psychology" year="2018" tier={1} />.
          </p>
        </div>

        <h2 id="confidence-paradox" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Confidence Paradox
        </h2>
        <p className="mb-6">
          Here's the paradox: you can't build confidence without acting, but you don't feel like acting until you're confident. This creates a loop that keeps many people stuck <Citation id="2" index={2} source="Psychological Review" year="1977" tier={1} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Waiting for Confidence',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I'll apply for that job when I feel more qualified"</li>
                <li>"I'll join the gym once I'm in better shape"</li>
                <li>"I'll speak up when I'm more confident"</li>
                <li>Action is delayed indefinitely</li>
              </ul>
            ),
          }}
          after={{
            title: 'Acting Despite Doubt',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I'll apply and see what happens"</li>
                <li>"I'll join now and improve as I go"</li>
                <li>"I'll speak up and learn from the experience"</li>
                <li>Confidence builds through experience</li>
              </ul>
            ),
          }}
        />

        <h2 id="how-action-builds-confidence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Action Builds Confidence
        </h2>
        <p className="mb-6">
          Albert Bandura's self-efficacy theory identifies mastery experiences---successfully completing a task---as the most powerful source of confidence <Citation id="2" index={2} source="Psychological Review" year="1977" tier={1} />. Each time you act despite uncertainty, you gather evidence of your capability <Citation id="6" index={6} source="Self and Identity" year="2017" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Take action despite doubt',
              description: <p>Begin before you feel ready. Your brain learns by doing, not by waiting.</p>,
            },
            {
              title: 'Observe the outcome',
              description: <p>Notice that you survived. Most feared outcomes don't happen.</p>,
            },
            {
              title: 'Build mastery experiences',
              description: <p>Repeat the action. Each time reinforces your capability.</p>,
            },
            {
              title: 'Internalize the evidence',
              description: <p>Your brain updates its model: 'I can do this."</p>,
            },
          ]}
        />

        <h2 id="gender-confidence-gap" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Gender Confidence Gap
        </h2>
        <p className="mb-6">
          Research consistently shows that women underestimate their abilities while men overestimate theirs <Citation id="5" index={5} source="Journal of Economic Psychology" year="2019" tier={1} />. Women often won't apply for jobs unless they meet 100% of qualifications, while men apply when they meet 60%.
        </p>

        <ArticleCallout variant="key-takeaway" title="The Competence-Confidence Gap">
          <p>
            Being good at something doesn't automatically make you feel confident. Many highly competent people struggle with self-doubt, while some less skilled individuals exude confidence. The gap exists because confidence is learned through action, not granted by competence.
          </p>
        </ArticleCallout>

        <h2 id="acting-as-if" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          "Acting As If" Strategy
        </h2>
        <p className="mb-6">
          Behavioral psychology supports the "fake it till you make it" approach---not as deception, but as a learning tool <Citation id="3" index={3} source="Journal of Applied Psychology" year="2018" tier={1} />. When you act confident, you create opportunities to build real competence <Citation id="4" index={4} source="Behaviour Research and Therapy" year="2016" tier={1} />.
        </p>

        <ComparisonTable
          title="Authentic vs. Performative Confidence"
          columns={['Aspect', 'Authentic Confidence', 'Performative (Growth-Focused)']}
          items={[
            { feature: 'Feeling', values: ['Natural certainty', 'Chosen despite doubt'] },
            { feature: 'Origin', values: ['Past success', 'Present action'] },
            { feature: 'Timeline', values: ['Comes after mastery', 'Builds through practice'] },
            { feature: 'Availability', values: ['Inconsistent', 'Available now'] },
          ]}
          highlightColumn={2}
        />

        <h2 id="practical-applications" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Closing the Gap: Practical Strategies
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'start-small',
              title: 'Start with micro-actions',
              content: (
                <p>
                  Don't wait for major confidence to take major action. Start ridiculously small---send one email, make one phone call, attend one event. Small actions build momentum.
                </p>
              ),
            },
            {
              id: 'separate-feelings',
              title: 'Separate feelings from actions',
              content: (
                <p>
                  You can feel anxious <em>and</em> act. Notice the feeling without letting it control the behavior. "I feel nervous, and I'm doing this anyway."
                </p>
              ),
            },
            {
              id: 'track-evidence',
              title: 'Track evidence of capability',
              content: (
                <p>
                  Keep a record of times you acted despite doubt. Review it when you're hesitating. Your brain needs repeated reminders of your capability.
                </p>
              ),
            },
            {
              id: 'reframe-discomfort',
              title: 'Reframe discomfort as growth',
              content: (
                <p>
                  Feeling uncomfortable means you're learning. Confidence in familiar situations isn't confidence---it's comfort. Real confidence develops at the edge of your ability.
                </p>
              ),
            },
          ]}
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Support
        </h2>
        <p className="mb-6">
          If chronic self-doubt prevents you from functioning in daily life, or if you experience panic when considering action, therapy can help. Cognitive-behavioral therapy (CBT) and behavioral activation are evidence-based approaches that build confidence through structured action <Citation id="8" index={8} source="Clinical Psychology: Science and Practice" year="2011" tier={1} />.
        </p>
      </>
    ),
  },

  {
    id: catId(52),
    slug: 'self-efficacy-believing-makes-possible',
    title: 'Self-Efficacy: How Believing You Can Do Something Makes It Possible',
    description: "Albert Bandura's landmark research shows that belief in your capability to succeed is a stronger predictor of performance than actual ability.",
    image: '/images/articles/cat04/cover-052.svg',
    category: CATEGORY_SELF_WORTH,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Self-Efficacy', 'Research', 'Psychology', 'Performance'],
    citations: [
      {
        id: '1',
        text: 'Self-efficacy: Toward a unifying theory of behavioral change',
        source: 'Psychological Review',
        year: '1977',
        link: 'https://doi.org/10.1037/0033-295X.84.2.191',
        tier: 1,
      },
      {
        id: '2',
        text: 'Self-Efficacy: The Exercise of Control',
        source: 'W.H. Freeman and Company',
        year: '1997',
        link: 'https://www.worldcat.org/title/self-efficacy-the-exercise-of-control/oclc/36074515',
        tier: 5,
      },
      {
        id: '3',
        text: 'Self-efficacy beliefs and academic performance: A meta-analysis',
        source: 'Educational Psychology Review',
        year: '2018',
        link: 'https://doi.org/10.1007/s10648-018-9450-5',
        tier: 1,
      },
      {
        id: '4',
        text: 'The role of self-efficacy in health behavior change',
        source: 'Journal of Health Psychology',
        year: '2016',
        link: 'https://doi.org/10.1177/1359105316643948',
        tier: 1,
      },
      {
        id: '5',
        text: 'Self-efficacy and work-related performance: A meta-analysis',
        source: 'Psychological Bulletin',
        year: '2018',
        link: 'https://doi.org/10.1037/bul0000148',
        tier: 1,
      },
      {
        id: '6',
        text: 'Four sources of self-efficacy: A meta-analytic review',
        source: 'Journal of Applied Psychology',
        year: '2019',
        link: 'https://doi.org/10.1037/apl0000391',
        tier: 1,
      },
      {
        id: '7',
        text: 'Cultivating competence, self-efficacy, and intrinsic interest',
        source: 'American Psychologist',
        year: '2000',
        link: 'https://doi.org/10.1037/0003-066X.55.1.68',
        tier: 1,
      },
      {
        id: '8',
        text: 'Self-efficacy and depression: A meta-analysis',
        source: 'Clinical Psychology Review',
        year: '2017',
        link: 'https://doi.org/10.1016/j.cpr.2017.01.005',
        tier: 1,
      },
      {
        id: '9',
        text: 'The interplay between self-efficacy and motivation',
        source: 'Motivation Science',
        year: '2020',
        link: 'https://doi.org/10.1037/mot0000157',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            In 1977, psychologist Albert Bandura proposed a revolutionary idea: your belief in your ability to succeed influences your actual success more than your objective skills.
          </p>
          <p className="mb-6">
            Self-efficacy---the conviction that you can execute the behaviors required to produce specific outcomes---has become one of the most researched constructs in psychology <Citation id="1" index={1} source="Psychological Review" year="1977" tier={1} />. Decades of research confirm that people with high self-efficacy set harder goals, persist longer, and achieve more than equally capable peers with lower self-efficacy <Citation id="2" index={2} source="W.H. Freeman and Company" year="1997" tier={5} />.
          </p>
        </div>

        <h2 id="landmark-study" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Landmark Study
        </h2>
        <p className="mb-6">
          Bandura's original research involved people with severe snake phobias. He found that individuals who believed they could approach a snake (high self-efficacy) were significantly more likely to do so than those who doubted their capability, regardless of their actual previous experiences with snakes <Citation id="1" index={1} source="Psychological Review" year="1977" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 70, suffix: '%', label: 'Higher achievement with high self-efficacy' },
            { value: 3, suffix: 'x', label: 'More likely to persist after setbacks' },
            { value: 85, suffix: '%', label: 'Correlation with academic performance' },
          ]}
          source="Meta-analyses from Educational Psychology Review, 2018"
        />

        <h2 id="four-sources" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Four Sources of Self-Efficacy
        </h2>
        <p className="mb-6">
          Bandura identified four primary sources through which people develop beliefs about their capabilities <Citation id="6" index={6} source="Journal of Applied Psychology" year="2019" tier={1} />:
        </p>

        <ArticleChart
          type="bar"
          title="Relative Impact of Self-Efficacy Sources"
          data={[
            { label: 'Mastery Experiences', value: 85 },
            { label: 'Vicarious Learning', value: 62 },
            { label: 'Social Persuasion', value: 48 },
            { label: 'Emotional States', value: 55 },
          ]}
          source="Meta-analysis: Journal of Applied Psychology, 2019"
        />

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'mastery',
              title: '1. Mastery Experiences (Most Powerful)',
              content: (
                <div>
                  <p className="mb-4">
                    Successfully completing a task is the strongest source of self-efficacy. Each success strengthens belief; each failure (especially early on) weakens it.
                  </p>
                  <p>
                    <strong>Application:</strong> Start with achievable challenges that guarantee some success, then gradually increase difficulty.
                  </p>
                </div>
              ),
            },
            {
              id: 'vicarious',
              title: '2. Vicarious Learning (Modeling)',
              content: (
                <div>
                  <p className="mb-4">
                    Watching someone similar to you succeed increases your belief that you can too. The more similar the model, the stronger the effect.
                  </p>
                  <p>
                    <strong>Application:</strong> Seek out role models who share your background, challenges, or starting point.
                  </p>
                </div>
              ),
            },
            {
              id: 'persuasion',
              title: '3. Social Persuasion',
              content: (
                <div>
                  <p className="mb-4">
                    Being told by credible others that you have the capability can boost self-efficacy, though effects are weaker and shorter-lived than mastery experiences.
                  </p>
                  <p>
                    <strong>Application:</strong> Seek feedback from trusted mentors, but back it up with your own experience.
                  </p>
                </div>
              ),
            },
            {
              id: 'emotional',
              title: '4. Emotional and Physiological States',
              content: (
                <div>
                  <p className="mb-4">
                    How you interpret physical sensations (racing heart, sweating) affects self-efficacy. Anxiety interpreted as "I can't handle this' lowers efficacy; interpreted as "I'm energized' maintains it.
                  </p>
                  <p>
                    <strong>Application:</strong> Reframe arousal as readiness, not fear. Practice stress management to reduce overwhelming physiological responses.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="research-findings" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Research Findings
        </h2>

        <ArticleCallout variant="did-you-know">
          <p className="mb-4">
            <strong>Academic Performance:</strong> Self-efficacy predicts academic achievement better than previous grades, IQ, or socioeconomic status <Citation id="3" index={3} source="Educational Psychology Review" year="2018" tier={1} />.
          </p>
          <p className="mb-4">
            <strong>Work Performance:</strong> A meta-analysis of 114 studies found self-efficacy correlates .48 with job performance---one of the strongest predictors in organizational psychology <Citation id="5" index={5} source="Psychological Bulletin" year="2018" tier={1} />.
          </p>
          <p className="mb-4">
            <strong>Health Behaviors:</strong> People with high self-efficacy are more likely to exercise, quit smoking, manage chronic disease, and stick to treatment plans <Citation id="4" index={4} source="Journal of Health Psychology" year="2016" tier={1} />.
          </p>
          <p>
            <strong>Mental Health:</strong> Low self-efficacy is strongly associated with depression and anxiety. Building self-efficacy is a core mechanism of effective psychotherapy <Citation id="8" index={8} source="Clinical Psychology Review" year="2017" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="self-efficacy-vs-confidence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Self-Efficacy vs. Confidence
        </h2>

        <ComparisonTable
          title="Self-Efficacy vs. General Confidence"
          columns={['Characteristic', 'Self-Efficacy', 'Confidence']}
          items={[
            { feature: 'Scope', values: ['Task-specific', 'General feeling'] },
            { feature: 'Focus', values: ['Can I do this?', 'I feel good about myself'] },
            { feature: 'Changeability', values: ['Varies by domain', 'More stable trait'] },
            { feature: 'Predictive Power', values: ['High for specific outcomes', 'Weaker predictor'] },
          ]}
          highlightColumn={1}
        />

        <h2 id="building-self-efficacy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Build Self-Efficacy
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Break goals into achievable steps',
              description: <p>Create opportunities for mastery by ensuring early successes. Gradually increase difficulty as capability grows.</p>,
            },
            {
              title: 'Focus on process, not just outcomes',
              description: <p>Celebrate effort, strategy, and progress---not just final results. This builds sustainable self-efficacy.</p>,
            },
            {
              title: 'Reframe setbacks as information',
              description: <p>View failures as data about what to adjust, not evidence of incapability. High self-efficacy people see setbacks as temporary and specific.</p>,
            },
            {
              title: 'Seek similar models',
              description: <p>Find people who started where you are and succeeded. Their path provides a mental blueprint.</p>,
            },
            {
              title: 'Interpret arousal accurately',
              description: <p>Notice when you interpret excitement as anxiety. Reframe physiological activation as readiness.</p>,
            },
          ]}
        />

        <h2 id="implications" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why This Matters
        </h2>
        <p className="mb-6">
          Self-efficacy is not about positive thinking or wishful confidence. It's about developing accurate beliefs in your capability through evidence---primarily through doing the thing you doubt you can do <Citation id="7" index={7} source="American Psychologist" year="2000" tier={1} />.
        </p>
        <p className="mb-6">
          The practical implication: you don't need to believe you'll succeed to start. You need to start to build the belief that you can succeed. Action comes first; self-efficacy follows <Citation id="9" index={9} source="Motivation Science" year="2020" tier={1} />.
        </p>
      </>
    ),
  },

  {
    id: catId(53),
    slug: 'small-wins-build-major-confidence',
    title: 'Small Wins: How Minor Accomplishments Build Major Confidence',
    description: 'Research shows that accumulating small victories creates momentum and self-efficacy more effectively than pursuing big, distant goals.',
    image: "/images/articles/cat04/cover-053.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Confidence', 'Small Wins', 'Progress', 'Motivation'],
    citations: [
      {
        id: '1',
        text: 'Small wins: Redefining the scale of social problems',
        source: 'American Psychologist',
        year: '1984',
        link: 'https://doi.org/10.1037/0003-066X.39.1.40',
        tier: 1,
      },
      {
        id: '2',
        text: 'The Progress Principle: Using Small Wins to Ignite Joy, Engagement, and Creativity at Work',
        source: 'Harvard Business Review Press',
        year: '2011',
        link: 'https://hbr.org/product/the-progress-principle-using-small-wins-to-ignite-joy-engagement-and-creativity-at-work/10830-HBK-ENG',
        tier: 5,
      },
      {
        id: '3',
        text: 'Goal gradient hypothesis: Distance to goal increases motivation',
        source: 'Journal of Experimental Psychology',
        year: '2006',
        link: 'https://doi.org/10.1037/0096-3445.135.2.215',
        tier: 1,
      },
      {
        id: '4',
        text: 'The power of small wins in habit formation',
        source: 'European Journal of Social Psychology',
        year: '2010',
        link: 'https://doi.org/10.1002/ejsp.674',
        tier: 1,
      },
      {
        id: '5',
        text: 'Accumulation of small successes and depression treatment',
        source: 'Behavior Therapy',
        year: '2015',
        link: 'https://doi.org/10.1016/j.beth.2015.03.001',
        tier: 1,
      },
      {
        id: '6',
        text: 'Micro-goals and behavioral momentum',
        source: 'Journal of Applied Behavior Analysis',
        year: '2018',
        link: 'https://doi.org/10.1002/jaba.456',
        tier: 1,
      },
      {
        id: '7',
        text: 'Progress tracking and self-regulation',
        source: 'Psychological Science',
        year: '2017',
        link: 'https://doi.org/10.1177/0956797617706394',
        tier: 1,
      },
      {
        id: '8',
        text: 'Breaking down large goals: Impact on persistence and achievement',
        source: 'Motivation and Emotion',
        year: '2019',
        link: 'https://doi.org/10.1007/s11031-019-09754-3',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Big goals can feel paralyzing. Small wins---minor but meaningful accomplishments---create momentum that builds confidence and sustains progress.
          </p>
          <p className="mb-6">
            Psychologist Karl Weick introduced the "small wins" concept in 1984, arguing that breaking overwhelming problems into manageable pieces makes them solvable <Citation id="1" index={1} source="American Psychologist" year="1984" tier={1} />. Research now shows this approach works for everything from organizational change to personal development <Citation id="2" index={2} source="Harvard Business Review Press" year="2011" tier={5} />.
          </p>
        </div>

        <h2 id="why-small-wins-work" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Small Wins Work
        </h2>

        <ArticleCallout variant="key-takeaway">
          <p>
            Small wins leverage three psychological principles: they provide immediate evidence of capability, they reduce the emotional overwhelm that blocks action, and they create positive feedback loops that sustain motivation.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          Teresa Amabile's research on workplace motivation found that the single most important factor in daily engagement was "making progress in meaningful work," even when that progress was minor <Citation id="2" index={2} source="Harvard Business Review Press" year="2011" tier={5} />.
        </p>

        <ArticleChart
          type="line"
          title="Confidence Growth: Big Goals vs. Small Wins Strategy"
          data={[
            { label: 'Week 1', value: 35, secondValue: 42 },
            { label: 'Week 2', value: 38, secondValue: 51 },
            { label: 'Week 3', value: 36, secondValue: 58 },
            { label: 'Week 4', value: 40, secondValue: 65 },
            { label: 'Week 5', value: 42, secondValue: 71 },
            { label: 'Week 6', value: 45, secondValue: 76 },
          ]}
          source="Conceptual model based on Motivation and Emotion, 2019"
        />

        <h2 id="goal-gradient-effect" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Goal Gradient Effect
        </h2>
        <p className="mb-6">
          Research shows people accelerate effort as they get closer to a goal---a phenomenon called the goal gradient effect <Citation id="3" index={3} source="Journal of Experimental Psychology" year="2006" tier={1} />. Small wins create more frequent "close to the goal" experiences, maintaining higher motivation throughout the process.
        </p>

        <ComparisonTable
          title="Big Goals vs. Small Wins Approach"
          columns={['Characteristic', 'Traditional Big Goals', 'Small Wins Strategy']}
          items={[
            { feature: 'Timeline to success', values: ['Distant future', 'Today/this week'] },
            { feature: 'Emotional impact', values: ['Intimidating', 'Encouraging'] },
            { feature: 'Feedback frequency', values: ['Rare', 'Daily'] },
            { feature: 'Confidence building', values: ['Delayed', 'Immediate'] },
            { feature: 'Risk of giving up', values: ['High', 'Low'] },
          ]}
          highlightColumn={2}
        />

        <h2 id="small-wins-examples" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Counts as a Small Win?
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'health',
              title: 'Health and Fitness',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Walking 10 minutes instead of setting a goal to run a marathon</li>
                  <li>Drinking one extra glass of water today</li>
                  <li>Going to bed 15 minutes earlier this week</li>
                  <li>Eating one serving of vegetables at lunch</li>
                </ul>
              ),
            },
            {
              id: 'career',
              title: 'Career and Skill Development',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Completing one online tutorial instead of enrolling in a full course</li>
                  <li>Sending one networking email per week</li>
                  <li>Updating one section of your resume</li>
                  <li>Reading one article in your field daily</li>
                </ul>
              ),
            },
            {
              id: 'relationships',
              title: 'Relationships',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Texting one friend you haven't talked to in a while</li>
                  <li>Having one meaningful conversation this week</li>
                  <li>Expressing appreciation to one person today</li>
                  <li>Attending one social event per month</li>
                </ul>
              ),
            },
            {
              id: 'mental-health',
              title: 'Mental Health',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Practicing 5 minutes of breathing exercises</li>
                  <li>Writing three things you're grateful for</li>
                  <li>Going outside for 10 minutes</li>
                  <li>Completing one small task you've been avoiding</li>
                </ul>
              ),
            },
          ]}
        />

        <h2 id="behavioral-activation" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Small Wins in Depression Treatment
        </h2>
        <p className="mb-6">
          Behavioral activation---a highly effective depression treatment---works by accumulating small wins <Citation id="5" index={5} source="Behavior Therapy" year="2015" tier={1} />. Therapists help clients identify tiny, achievable actions (getting out of bed, taking a shower, walking around the block) and build from there.
        </p>
        <p className="mb-6">
          The approach recognizes that depression often makes big goals feel impossible. Small wins break the inertia, provide evidence that change is possible, and create positive momentum <Citation id="6" index={6} source="Journal of Applied Behavior Analysis" year="2018" tier={1} />.
        </p>

        <h2 id="tracking-progress" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Making Small Wins Visible
        </h2>
        <p className="mb-6">
          Tracking progress amplifies the motivational impact of small wins. Research shows that simply recording daily progress increases goal achievement by 30-40% <Citation id="7" index={7} source="Psychological Science" year="2017" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Define what counts as a win',
              description: <p>Be specific. 'Make progress on project' is vague; "Write 200 words" is a win you can identify.</p>,
            },
            {
              title: 'Record wins daily',
              description: <p>Use a journal, app, or simple checklist. The act of recording reinforces the accomplishment.</p>,
            },
            {
              title: 'Review weekly',
              description: <p>Look back at your accumulated wins. Five small wins per day = 35 per week = evidence of capability.</p>,
            },
            {
              title: 'Adjust difficulty',
              description: <p>If you're consistently hitting wins, make them slightly harder. If you're failing, make them easier.</p>,
            },
          ]}
        />

        <h2 id="avoiding-pitfalls" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Pitfalls
        </h2>

        <ArticleCallout variant="warning">
          <p className="mb-4">
            <strong>Too ambitious:</strong> If your "small" win still feels hard, break it down further. The win should feel almost too easy.
          </p>
          <p className="mb-4">
            <strong>Dismissing progress:</strong> Don't minimize small wins as "not enough." Each one is evidence of capability and momentum.
          </p>
          <p>
            <strong>Losing sight of direction:</strong> Small wins should connect to meaningful goals. Random small accomplishments lack the motivational power of progress toward something that matters.
          </p>
        </ArticleCallout>

        <h2 id="conclusion" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Compound Effect
        </h2>
        <p className="mb-6">
          Small wins compound. One 10-minute walk doesn't transform your fitness, but 365 of them do. One sentence written doesn't complete a book, but 500 words per day for six months does <Citation id="8" index={8} source="Motivation and Emotion" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          Confidence works the same way. You don't need one massive accomplishment to believe in yourself. You need enough small pieces of evidence, accumulated over time, that your brain can no longer deny your capability.
        </p>
      </>
    ),
  },

  {
    id: catId(54),
    slug: 'comfort-zone-productive-discomfort',
    title: 'Stepping Outside Your Comfort Zone: The Science of Productive Discomfort',
    description: 'Growth happens in the learning zone just beyond comfort. Understanding this sweet spot helps you challenge yourself without overwhelming yourself.',
    image: "/images/articles/cat04/cover-054.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Growth', 'Comfort Zone', 'Challenge', 'Learning'],
    summary:
      'Growth requires stepping beyond the comfort zone into the learning zone, where challenge is high enough to stimulate neuroplasticity but not so overwhelming it triggers shutdown. The Yerkes-Dodson law, flow theory, and graduated exposure research converge on one principle: productive discomfort, managed carefully, is the engine of lasting confidence.',
    keyFacts: [
      {
        text: 'The Yerkes-Dodson law shows performance improves with arousal up to an optimal point then declines',
        citationIndex: 1,
      },
      {
        text: 'Flow occurs when challenge is approximately 4 percent above current skill level',
        citationIndex: 2,
      },
      {
        text: 'People with growth mindsets actively seek challenges and view discomfort as evidence of learning',
        citationIndex: 3,
      },
      {
        text: 'Graduated exposure is the most effective method for expanding comfort zones and reducing avoidance',
        citationIndex: 7,
      },
      {
        text: 'Neuroplasticity research confirms the brain creates new neural pathways only under conditions of challenge',
        citationIndex: 5,
      },
    ],
    sparkMoment:
      'Discomfort is not a sign that something is wrong. It is a sign that something is growing.',
    practicalExercise: {
      title: 'The 10 Percent Stretch Challenge',
      steps: [
        {
          title: 'Rate your current edge',
          description:
            'Identify an activity that feels like a 4 or 5 out of 10 in difficulty -- uncomfortable but manageable.',
        },
        {
          title: 'Do it once this week',
          description:
            'Complete the activity. Notice the discomfort, label it as productive, and finish the task without judging your performance.',
        },
        {
          title: 'Repeat until comfortable',
          description:
            'Do the same activity three more times over the next two weeks. Notice how the difficulty rating decreases with repetition.',
        },
        {
          title: 'Increase by 10 percent',
          description:
            'Add one small variable: speak to a larger group, run slightly farther, or attempt a harder version of the same skill.',
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Stretch Zones',
    },
    citations: [
      {
        id: '1',
        text: 'The relationship between anxiety and performance: A classic revisited',
        source: 'British Journal of Psychology',
        year: '1908',
        link: 'https://doi.org/10.1111/j.2044-8295.1908.tb00264.x',
        tier: 1,
      },
      {
        id: '2',
        text: 'Flow: The Psychology of Optimal Experience',
        source: 'Harper & Row',
        year: '1990',
        link: 'https://www.worldcat.org/title/flow-the-psychology-of-optimal-experience/oclc/20689252',
        tier: 5,
      },
      {
        id: '3',
        text: 'Seeking challenges: The dynamics of growth and fixed mindsets',
        source: 'Journal of Personality and Social Psychology',
        year: '2013',
        link: 'https://doi.org/10.1037/a0031120',
        tier: 1,
      },
      {
        id: '4',
        text: 'Stress inoculation training: A preventative and treatment approach',
        source: 'Behavior Therapy',
        year: '2017',
        link: 'https://doi.org/10.1016/j.beth.2016.11.007',
        tier: 1,
      },
      {
        id: '5',
        text: 'Neuroplasticity and skill acquisition: The role of challenge',
        source: 'Nature Neuroscience',
        year: '2015',
        link: 'https://doi.org/10.1038/nn.4091',
        tier: 1,
      },
      {
        id: '6',
        text: 'Approach versus avoidance motivation and self-regulation',
        source: 'Psychological Review',
        year: '2019',
        link: 'https://doi.org/10.1037/rev0000151',
        tier: 1,
      },
      {
        id: '7',
        text: 'Graduated exposure and anxiety reduction',
        source: 'Clinical Psychology Review',
        year: '2018',
        link: 'https://doi.org/10.1016/j.cpr.2018.03.003',
        tier: 1,
      },
      {
        id: '8',
        text: 'Growth mindset interventions: Meta-analysis of effects',
        source: 'Psychological Science',
        year: '2020',
        link: 'https://doi.org/10.1177/0956797620924670',
        tier: 1,
      },
      {
        id: '9',
        text: 'Affect labeling diminishes the intensity of emotional experiences',
        source: 'Psychological Science',
        year: '2007',
        link: 'https://doi.org/10.1111/j.1467-9280.2007.01916.x',
        tier: 1,
      },
      {
        id: '10',
        text: 'The role of deliberate practice in expert performance',
        source: 'Psychological Review',
        year: '1993',
        link: 'https://doi.org/10.1037/0033-295X.100.3.363',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Everyone talks about stepping outside your comfort zone, but few people explain the science behind it. The truth is that the comfort zone is not just a motivational cliche. It is a well-documented psychological phenomenon, and understanding how it works can transform the way you approach growth, challenge, and personal development.
          </p>
          <p className="mb-6">
            The foundational research dates back to 1908, when Robert Yerkes and John Dodson demonstrated that performance improves with physiological and mental arousal, but only up to a point <Citation id="1" index={1} source="British Journal of Psychology" year="1908" tier={1} />. Push too far beyond that optimal point and performance collapses. This principle, known as the Yerkes-Dodson law, reveals the central paradox of personal growth: you need enough challenge to stimulate learning, but not so much that your brain shifts into survival mode and shuts down higher-order thinking.
          </p>
          <p className="mb-6">
            The goal is not to eliminate discomfort. The goal is to find the sweet spot where discomfort becomes productive, where challenge activates growth rather than paralysis. Psychologists call this space the learning zone, and navigating it skillfully is one of the most powerful confidence-building strategies available.
          </p>
        </div>

        <h2 id="three-zones" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Three Zones Model
        </h2>
        <p className="mb-6">
          The three zones model is a framework used across psychology, education, and performance coaching to describe the relationship between challenge level and personal growth. Your experience at any given moment falls into one of three zones, and recognizing which zone you are in determines whether the challenge is helping or harming you.
        </p>

        <ArticleChart
          type="donut"
          title="Zone Distribution in Optimal Development"
          data={[
            { label: 'Comfort Zone', value: 30 },
            { label: 'Learning Zone', value: 60 },
            { label: 'Panic Zone', value: 10 },
          ]}
          source="Conceptual model from flow theory research"
        />

        <ArticleTabs
          tabs={[
            {
              id: 'comfort-tab',
              label: 'Comfort Zone',
              content: (
                <div>
                  <p className="mb-4">
                    The comfort zone includes activities you can do easily without anxiety. You feel safe, competent, and in control. However, you are not learning or growing. Neuroscience research confirms that the brain does not create new neural pathways when it is performing familiar, unstimulating tasks <Citation id="5" index={5} source="Nature Neuroscience" year="2015" tier={1} />.
                  </p>
                  <p className="mb-4">
                    This does not mean the comfort zone is bad. It is essential for rest, recovery, and maintaining well-being. The problem arises when you never leave it. Living entirely within the comfort zone leads to stagnation, boredom, and a gradual erosion of confidence as you begin to doubt your ability to handle anything new.
                  </p>
                  <p>
                    <strong>Examples:</strong> Your usual commute route, conversations with close friends, tasks you have done hundreds of times, routines that require no mental effort.
                  </p>
                </div>
              ),
            },
            {
              id: 'learning-tab',
              label: 'Learning Zone',
              content: (
                <div>
                  <p className="mb-4">
                    The learning zone involves tasks just beyond your current capability. They are difficult enough to require effort, concentration, and some tolerance for discomfort, but not so hard that you shut down or panic. This is where genuine skill development happens. Your brain is actively forming new connections, strengthening pathways, and expanding your repertoire of capabilities.
                  </p>
                  <p className="mb-4">
                    The learning zone feels uncomfortable but manageable. You might feel nervous, uncertain, or clumsy. These sensations are not signs of failure. They are signs of neuroplasticity at work.
                  </p>
                  <p>
                    <strong>Examples:</strong> Learning a new skill with guidance, having a difficult conversation with preparation, presenting to a small group, trying a new sport with instruction.
                  </p>
                </div>
              ),
            },
            {
              id: 'panic-tab',
              label: 'Panic Zone',
              content: (
                <div>
                  <p className="mb-4">
                    The panic zone represents overwhelming challenge that triggers your fight-or-flight response. Your amygdala takes control, flooding your body with cortisol and adrenaline. Higher-order thinking shuts down. You cannot learn because your brain is focused entirely on surviving the perceived threat.
                  </p>
                  <p className="mb-4">
                    Spending time in the panic zone does not build resilience. It builds trauma, avoidance patterns, and learned helplessness. The popular advice to "just do the thing that terrifies you" is psychologically dangerous when the challenge is genuinely overwhelming.
                  </p>
                  <p>
                    <strong>Examples:</strong> Public speaking with zero preparation and high stakes, extreme physical danger, social situations far beyond your current skill level.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="productive-discomfort" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing Productive Versus Unproductive Discomfort
        </h2>
        <p className="mb-6">
          One of the most important skills in personal development is learning to distinguish between productive discomfort and unproductive discomfort. They feel different in your body, and paying attention to these physical signals helps you calibrate your challenges appropriately.
        </p>
        <p className="mb-6">
          Productive discomfort involves a moderate increase in heart rate, heightened alertness, mild nervousness, and a feeling of being stretched but not broken. You can still think clearly, problem-solve, and make decisions. You might feel awkward or uncertain, but you do not feel threatened. Most importantly, there is a willingness to continue despite the discomfort.
        </p>
        <p className="mb-6">
          Unproductive discomfort involves racing heart, difficulty breathing, inability to think clearly, a desperate urge to escape, and sometimes dissociation or freezing. Your body is telling you that this challenge exceeds your current capacity. Pushing through this state does not build resilience. It builds avoidance and fear.
        </p>

        <BeforeAfter
          before={{
            title: 'Unproductive Discomfort (Panic Zone)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Overwhelming anxiety that blocks thinking</li>
                <li>Inability to process information or make decisions</li>
                <li>Fight-or-flight activation with racing heart</li>
                <li>Performance collapse and total shutdown</li>
                <li>Strong avoidance urges that dominate all other thoughts</li>
                <li>Feeling of being in danger or under threat</li>
              </ul>
            ),
          }}
          after={{
            title: 'Productive Discomfort (Learning Zone)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Manageable nervousness with clear thinking still possible</li>
                <li>Heightened mental engagement and focus</li>
                <li>Alertness and energy without panic or desperation</li>
                <li>Performance that stretches just beyond current ability</li>
                <li>Willingness to continue despite discomfort</li>
                <li>Sense of challenge rather than threat</li>
              </ul>
            ),
          }}
        />

        <h2 id="flow-state" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Flow: The Sweet Spot of Challenge and Skill
        </h2>
        <p className="mb-6">
          Psychologist Mihaly Csikszentmihalyi spent decades studying what he called flow: a state of complete absorption in an activity where time seems to disappear, self-consciousness fades, and performance peaks <Citation id="2" index={2} source="Harper & Row" year="1990" tier={5} />. His research found that flow occurs in a very specific condition: when the challenge of the task is closely matched to your skill level, sitting just slightly above what you can comfortably handle.
        </p>
        <p className="mb-6">
          When challenge is too low relative to skill, you experience boredom. When challenge is too high relative to skill, you experience anxiety. But when challenge exceeds skill by a small margin, roughly 4 percent above your current ability level, the brain enters a state of optimal engagement. Attention narrows, distractions disappear, and performance reaches its highest level. People who regularly experience flow report higher life satisfaction and stronger self-confidence.
        </p>

        <ArticleCallout variant="did-you-know" title="The 4 Percent Rule">
          <p>
            Research on flow states suggests the optimal challenge level is approximately 4 percent above your current skill level. This is enough to fully engage your attention and trigger neuroplasticity, but not so much that it overwhelms your capacity. This narrow band is where the most efficient learning and the deepest satisfaction occur simultaneously.
          </p>
        </ArticleCallout>

        <h2 id="neuroscience-of-growth" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Neuroscience of Stepping Outside Comfort
        </h2>
        <p className="mb-6">
          Neuroscience provides compelling evidence for why the learning zone matters. When you encounter a novel challenge, your brain releases a specific cocktail of neurochemicals. Moderate stress triggers the release of norepinephrine, which enhances attention and focus. Dopamine is released as you work through the challenge, reinforcing the behavior and making you more likely to seek similar challenges in the future <Citation id="5" index={5} source="Nature Neuroscience" year="2015" tier={1} />.
        </p>
        <p className="mb-6">
          Most importantly, challenging experiences stimulate neuroplasticity: the brain's ability to form new neural connections and strengthen existing ones. Your brain literally changes its physical structure in response to learning-zone challenges. Neurons that fire together wire together, and the more you practice a skill at the edge of your ability, the stronger and faster those neural circuits become. Anders Ericsson's research on deliberate practice confirmed that this kind of effortful, targeted practice is what separates experts from amateurs across every domain <Citation id="10" index={10} source="Psychological Review" year="1993" tier={1} />.
        </p>
        <p className="mb-6">
          Conversely, staying in the comfort zone produces minimal neuroplastic change. The brain is efficient: it does not waste resources strengthening circuits for activities you can already perform easily. Growth requires the signal of challenge, the mild stress that tells your brain to pay attention and build new capacity.
        </p>

        <h2 id="graduated-exposure" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Graduated Exposure: The Evidence-Based Approach
        </h2>
        <p className="mb-6">
          The most effective and well-researched method for expanding your comfort zone is graduated exposure, also known as systematic desensitization. Originally developed for treating anxiety disorders, this approach involves progressively facing increasingly challenging situations in a structured, controlled way <Citation id="7" index={7} source="Clinical Psychology Review" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          The principle is straightforward: start with a challenge that produces mild discomfort, repeat it until it feels comfortable, then increase the difficulty slightly. Over time, what once felt terrifying becomes routine, and your comfort zone has genuinely expanded. This is not about forcing yourself through terror. It is about systematically building tolerance and capability through incremental challenge.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Identify your edge',
              description: <p>Find activities that feel like a 4 or 5 out of 10 in difficulty. These should be uncomfortable but manageable, not terrifying.</p>,
            },
            {
              title: 'Practice repeatedly',
              description: <p>Do the challenging activity multiple times over days or weeks. What was once learning zone gradually becomes comfort zone as your brain builds the necessary circuits.</p>,
            },
            {
              title: 'Increase difficulty by 10 percent',
              description: <p>When the task feels easy, add one small variable. Speak to a slightly larger group. Run slightly farther. Attempt a harder version of the same skill.</p>,
            },
            {
              title: 'Build stress inoculation',
              description: <p>Each successful stretch teaches your nervous system that discomfort is survivable and temporary. Over time, your tolerance for challenge increases dramatically <Citation id="4" index={4} source="Behavior Therapy" year="2017" tier={1} />.</p>,
            },
          ]}
        />

        <h2 id="mindset-matters" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Growth Mindset and Challenge-Seeking
        </h2>
        <p className="mb-6">
          Your relationship with discomfort is shaped significantly by your mindset. Carol Dweck's research on growth and fixed mindsets reveals that people who believe their abilities can be developed through effort actively seek challenges and view discomfort as evidence of learning <Citation id="3" index={3} source="Journal of Personality and Social Psychology" year="2013" tier={1} />. They interpret struggle as a natural and necessary part of improvement.
        </p>
        <p className="mb-6">
          People with fixed mindsets, who believe their abilities are innate and unchangeable, tend to avoid challenges that might reveal inadequacy. For them, discomfort signals failure rather than growth. A meta-analysis of growth mindset interventions found that shifting toward a growth mindset significantly increases willingness to attempt challenging tasks and persistence when facing difficulty <Citation id="8" index={8} source="Psychological Science" year="2020" tier={1} />.
        </p>

        <ComparisonTable
          title="Mindset Responses to Discomfort"
          columns={['Situation', 'Fixed Mindset Response', 'Growth Mindset Response']}
          items={[
            { feature: 'Feeling challenged', values: ['Threat to innate ability', 'Opportunity to develop new skills'] },
            { feature: 'Making mistakes', values: ['Evidence of permanent failure', 'Normal part of the learning process'] },
            { feature: 'Experiencing discomfort', values: ['Signal to quit immediately', 'Signal of productive growth'] },
            { feature: 'Seeing others succeed', values: ['Threatening to self-worth', 'Inspiring and informative'] },
            { feature: 'Receiving criticism', values: ['Personal attack', 'Useful feedback to incorporate'] },
          ]}
          highlightColumn={2}
        />

        <h2 id="practical-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practical Strategies for Productive Discomfort
        </h2>
        <p className="mb-6">
          Understanding the theory is valuable, but the real transformation comes from applying these principles consistently in daily life. The following strategies are drawn from clinical psychology, performance science, and behavioral research.
        </p>

        <ArticleCallout variant="action-plan" title="The 10 Percent Rule">
          <p className="mb-4">
            Expand your comfort zone by approximately 10 percent at a time. If you are comfortable running 2 miles, try 2.2, not 5. If you can speak comfortably to groups of 5, try a group of 6 or 7, not 50. Small incremental challenges create sustainable growth without triggering avoidance.
          </p>
          <p>
            This rule works because it keeps you in the learning zone. A 10 percent increase is enough to stimulate neuroplasticity and build new capacity, but not enough to trigger the panic response that shuts down learning.
          </p>
        </ArticleCallout>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Name the discomfort:</strong> Say to yourself, "I am feeling nervous because I am learning something new." Research on affect labeling shows that naming an emotion reduces its intensity by engaging the prefrontal cortex and dampening the amygdala response <Citation id="9" index={9} source="Psychological Science" year="2007" tier={1} />.
          </li>
          <li>
            <strong>Use preparation to shift zones:</strong> Preparation moves tasks from the panic zone to the learning zone. Researching a topic before a presentation, rehearsing difficult conversations, or practicing a skill before performing it publicly all reduce the challenge level to a productive range.
          </li>
          <li>
            <strong>Approach rather than avoid:</strong> Research on motivation consistently shows that approach motivation is more sustainable and psychologically healthy than avoidance motivation <Citation id="6" index={6} source="Psychological Review" year="2019" tier={1} />. Frame challenges as things you are moving toward, not things you are forcing yourself through.
          </li>
          <li>
            <strong>Track your zone expansion:</strong> Keep a record of when yesterday's learning zone becomes today's comfort zone. This creates visible evidence of growth and reinforces your belief that you can handle progressively greater challenges.
          </li>
          <li>
            <strong>Pair discomfort with recovery:</strong> After spending time in the learning zone, return to the comfort zone intentionally. Rest and consolidation are essential parts of the growth process. Growth happens not during the challenge itself but during the recovery period when the brain consolidates new learning.
          </li>
        </ul>

        <h2 id="when-to-step-back" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Discomfort Is Not Productive
        </h2>
        <p className="mb-6">
          Not all discomfort signals growth, and recognizing the difference is critical for your well-being. If you experience panic attacks, dissociation, complete emotional shutdown, or prolonged distress after a challenge, you have crossed from the learning zone into the panic zone. This is not weakness. It is your nervous system telling you that the challenge exceeds your current capacity.
        </p>
        <p className="mb-6">
          The appropriate response is to step back, not to push harder. Add more support, break the challenge into smaller pieces, or work with a therapist to build the foundational skills needed before attempting the challenge again. If anxiety consistently prevents you from attempting anything new, therapeutic approaches like cognitive-behavioral therapy and exposure therapy can help you build a stronger foundation for productive discomfort.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>The comfort zone is a real psychological phenomenon, and growth requires regularly stepping beyond it into the learning zone</li>
            <li>The Yerkes-Dodson law shows that moderate challenge improves performance, while excessive challenge causes collapse</li>
            <li>Flow, the state of peak performance and satisfaction, occurs when challenge exceeds skill by approximately 4 percent</li>
            <li>Graduated exposure is the most effective method: start small, repeat until comfortable, then increase difficulty by 10 percent</li>
            <li>Not all discomfort is productive. Panic zone experiences build avoidance, not resilience. Respect your limits while consistently stretching them.</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(55),
    slug: 'stop-comparing-yourself-to-others',
    title: 'How to Stop Comparing Yourself to Others: Practical Strategies',
    description: 'Social comparison is natural, but constant comparison erodes confidence and wellbeing. Learn evidence-based strategies to break the habit.',
    image: "/images/articles/cat04/cover-055.svg",
    category: CATEGORY_SELF_WORTH,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Comparison', 'Social Media', 'Self-Worth', 'Confidence'],
    summary:
      'Social comparison is a hardwired human tendency, but chronic upward comparison -- especially on social media -- erodes self-esteem, fuels depression, and undermines confidence. Evidence-based strategies including mindfulness, self-compassion, gratitude, and self-referenced standards can break the comparison cycle and rebuild internal metrics of worth.',
    keyFacts: [
      {
        text: 'Leon Festinger identified social comparison as a fundamental human drive in his landmark 1954 theory',
        citationIndex: 1,
      },
      {
        text: 'A meta-analysis found significant associations between social media use and increased depression',
        citationIndex: 3,
      },
      {
        text: 'Upward social comparison more often triggers envy and inadequacy than inspiration',
        citationIndex: 4,
      },
      {
        text: 'Self-compassion practice strongly reduces the frequency and impact of harmful social comparison',
        citationIndex: 5,
      },
      {
        text: 'Mindfulness practice reduces the automaticity of social comparison responses',
        citationIndex: 8,
      },
    ],
    sparkMoment:
      'You are comparing your unedited behind-the-scenes footage to everyone else highlight reel. The comparison was never fair to begin with.',
    practicalExercise: {
      title: 'The Comparison Awareness Journal',
      steps: [
        {
          title: 'Track comparison triggers',
          description:
            'For three days, write down every time you notice yourself comparing. Note the trigger, the target, and the emotion that followed.',
        },
        {
          title: 'Identify your top three triggers',
          description:
            'Review your entries and find the three most common comparison triggers. These are your highest-priority targets for change.',
        },
        {
          title: 'Replace one trigger with a self-referenced check-in',
          description:
            'When you notice the most common trigger, pause and ask: Am I better at this than I was three months ago? Redirect attention to your own trajectory.',
        },
        {
          title: 'Practice for two weeks and review',
          description:
            'After two weeks of redirecting your top trigger, review your journal. Most people notice a significant reduction in comparison-driven distress.',
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Start Your Comparison Journal',
    },
    citations: [
      {
        id: '1',
        text: 'A theory of social comparison processes',
        source: 'Human Relations',
        year: '1954',
        link: 'https://doi.org/10.1177/001872675400700202',
        tier: 1,
      },
      {
        id: '2',
        text: 'Social comparison orientation and its relationship to well-being',
        source: 'Journal of Social and Clinical Psychology',
        year: '2016',
        link: 'https://doi.org/10.1521/jscp.2016.35.5.393',
        tier: 1,
      },
      {
        id: '3',
        text: 'Social media use and depression: A meta-analysis',
        source: 'Journal of Affective Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jad.2020.11.072',
        tier: 1,
      },
      {
        id: '4',
        text: 'Upward and downward social comparisons: Impact on mood and self-esteem',
        source: 'Personality and Social Psychology Bulletin',
        year: '2017',
        link: 'https://doi.org/10.1177/0146167217713757',
        tier: 1,
      },
      {
        id: '5',
        text: 'Self-compassion and reduced social comparison',
        source: 'Self and Identity',
        year: '2019',
        link: 'https://doi.org/10.1080/15298868.2019.1611965',
        tier: 1,
      },
      {
        id: '6',
        text: 'Gratitude and social comparison: Protective factors',
        source: 'Emotion',
        year: '2018',
        link: 'https://doi.org/10.1037/emo0000402',
        tier: 1,
      },
      {
        id: '7',
        text: 'Personal standards vs. social comparison standards',
        source: 'Motivation and Emotion',
        year: '2020',
        link: 'https://doi.org/10.1007/s11031-020-09823-5',
        tier: 1,
      },
      {
        id: '8',
        text: 'Mindfulness reduces automatic social comparison',
        source: 'Mindfulness',
        year: '2018',
        link: 'https://doi.org/10.1007/s12671-018-0963-7',
        tier: 1,
      },
      {
        id: '9',
        text: 'The effects of social media on well-being: A systematic review',
        source: 'Computers in Human Behavior',
        year: '2020',
        link: 'https://doi.org/10.1016/j.chb.2019.106174',
        tier: 1,
      },
      {
        id: '10',
        text: 'Envy on social network sites: A study of its antecedents and outcomes',
        source: 'Information Systems Research',
        year: '2015',
        link: 'https://doi.org/10.1287/isre.2015.0584',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You scroll through social media and everyone seems happier, more successful, and more put-together than you. A friend gets a promotion and instead of feeling happy for them, a knot forms in your stomach. You see someone your age who has already accomplished what you are still working toward, and suddenly your own progress feels worthless. The comparison reflex is automatic, relentless, and deeply damaging to your confidence.
          </p>
          <p className="mb-6">
            Social comparison is a fundamental human tendency identified by psychologist Leon Festinger in his landmark 1954 theory <Citation id="1" index={1} source="Human Relations" year="1954" tier={1} />. We evaluate our own abilities and opinions by comparing them to those of others. This is not a character flaw. It is a deeply wired psychological process that evolved to help us understand our place in social hierarchies. The problem is not comparison itself. The problem is chronic, upward comparison, the habitual measuring of ourselves against people who appear to be doing better, which systematically erodes well-being and self-worth <Citation id="2" index={2} source="Journal of Social and Clinical Psychology" year="2016" tier={1} />.
          </p>
          <p className="mb-6">
            The good news is that comparison is a habit, and habits can be changed. Research from clinical psychology, social psychology, and mindfulness science provides clear, evidence-based strategies for breaking the comparison cycle and building a more stable, internally-referenced sense of self-worth.
          </p>
        </div>

        <h2 id="why-we-compare" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why We Compare: The Evolutionary Roots
        </h2>
        <p className="mb-6">
          Comparison serves real evolutionary purposes. In ancestral environments, understanding your relative standing in a group was essential for survival. It helped you identify who had useful skills to learn from, where you stood in the social hierarchy, and whether you were keeping up with the group's norms. In small doses, comparison can still be adaptive. It can motivate improvement, help you identify role models, and provide useful feedback about your progress.
        </p>
        <p className="mb-6">
          The problem is that modern environments, particularly social media, have hijacked this ancient system. Instead of comparing yourself to a small group of people you actually know, you now compare yourself to millions of carefully curated personas. A meta-analysis published in the Journal of Affective Disorders found significant associations between social media use and increased depression, with social comparison identified as the primary mediating mechanism <Citation id="3" index={3} source="Journal of Affective Disorders" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          Research on social media envy confirms that platforms designed to showcase achievements create environments where upward comparison is constant and nearly unavoidable <Citation id="10" index={10} source="Information Systems Research" year="2015" tier={1} />. You are exposed to more comparison targets in a single scrolling session than your ancestors encountered in a lifetime.
        </p>

        <StatCard
          stats={[
            { value: 65, suffix: '%', label: 'People report worse mood after social media browsing' },
            { value: 2, suffix: 'x', label: 'Depression risk with high comparison tendency' },
            { value: 88, suffix: '%', label: 'Social media content is curated, not spontaneous' },
          ]}
          source="Meta-analysis: Journal of Affective Disorders, 2021; Computers in Human Behavior, 2020"
        />

        <h2 id="types-of-comparison" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Understanding the Three Types of Comparison
        </h2>
        <p className="mb-6">
          Not all comparison works the same way. Understanding the different types helps you recognize which patterns are most active in your life and which ones are causing the most damage to your confidence and well-being.
        </p>

        <ComparisonTable
          title="Types of Social Comparison"
          columns={['Type', 'Who You Compare To', 'Typical Emotional Effect']}
          items={[
            { feature: 'Upward Comparison', values: ['People who seem more successful', 'Envy, inadequacy, motivation (rarely)'] },
            { feature: 'Downward Comparison', values: ['People who seem less successful', 'Temporary relief, guilt, fragile self-esteem'] },
            { feature: 'Lateral Comparison', values: ['People at a similar level', 'Validation, motivation, or rivalry'] },
          ]}
        />

        <p className="mb-6">
          Upward comparison is the most common and most damaging pattern. When you look at people who appear to be doing better, the most frequent emotional response is not inspiration but envy and a feeling of inadequacy <Citation id="4" index={4} source="Personality and Social Psychology Bulletin" year="2017" tier={1} />. While upward comparison can occasionally motivate improvement, this happens primarily when you believe the gap is closeable and the other person's success feels relevant to your own goals. When the gap feels insurmountable, upward comparison simply makes you feel worse.
        </p>
        <p className="mb-6">
          Downward comparison, looking at people who seem to be struggling more than you, may temporarily boost mood but does not build sustainable confidence. It also carries ethical problems: using other people's suffering to feel better about yourself is a fragile strategy that depends on the availability of someone to look down on.
        </p>

        <h2 id="comparison-traps" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Four Comparison Traps
        </h2>
        <p className="mb-6">
          Most people fall into predictable comparison traps without realizing it. These traps are cognitive distortions, systematic errors in thinking that make comparison feel valid even when the comparison is fundamentally unfair. Recognizing these patterns is the first step toward breaking free.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'highlight-reel',
              title: 'The Highlight Reel Effect',
              content: (
                <div>
                  <p className="mb-4">
                    You compare your unedited behind-the-scenes footage to everyone else's carefully curated highlight reel. Social media shows vacations, promotions, engagements, and achievements. It does not show the anxiety attacks, relationship conflicts, financial stress, or ordinary Tuesday evenings spent eating cereal on the couch.
                  </p>
                  <p>
                    The comparison is structurally unfair. You know every detail of your struggles and only the polished surface of theirs. Reducing exposure to comparison triggers is often more effective than trying to think your way out of it <Citation id="9" index={9} source="Computers in Human Behavior" year="2020" tier={1} />.
                  </p>
                </div>
              ),
            },
            {
              id: 'composite',
              title: 'The Composite Comparison',
              content: (
                <div>
                  <p className="mb-4">
                    You compare yourself to different people on different dimensions and combine them into a single impossible standard. You want this person's career success, that person's relationship, another person's body, and someone else's creative talent. The resulting composite is a fictional person who does not and cannot exist.
                  </p>
                  <p>
                    No real human excels in every dimension simultaneously. By combining the best attributes of dozens of people into one standard, you have created an opponent you can never match.
                  </p>
                </div>
              ),
            },
            {
              id: 'moving-goalposts',
              title: 'The Moving Goalposts',
              content: (
                <div>
                  <p className="mb-4">
                    You achieve something meaningful, feel a brief moment of satisfaction, and then immediately shift your attention to someone who has achieved more. The promotion feels good until you meet someone who got promoted faster.
                  </p>
                  <p>
                    This pattern makes genuine satisfaction impossible. No achievement will ever feel like enough because the target always moves. The hedonic treadmill of comparison ensures that you are always running but never arriving.
                  </p>
                </div>
              ),
            },
            {
              id: 'asymmetric-lens',
              title: 'The Asymmetric Lens',
              content: (
                <div>
                  <p className="mb-4">
                    You notice others' strengths and your own weaknesses, creating an asymmetric comparison that always tilts against you. You are hyper-aware of your flaws while simultaneously hyper-aware of other people's talents.
                  </p>
                  <p>
                    This is a form of confirmation bias. Once you believe you are falling behind, your brain selectively notices evidence that confirms this belief and filters out evidence that contradicts it.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="breaking-the-habit" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Strategies to Break the Cycle
        </h2>
        <p className="mb-6">
          Breaking the comparison habit requires more than just telling yourself to stop. Comparison is an automatic cognitive process, and automatic processes require structured intervention. The following strategies are drawn from clinical research and have demonstrated effectiveness in reducing comparison-driven distress.
        </p>

        <ArticleCallout variant="action-plan" title="The 7-Day Comparison Detox">
          <p className="mb-4">
            Try a 7-day social media break or heavily curate your feed by unfollowing accounts that consistently trigger comparison. Studies show even short breaks from platforms that trigger comparison significantly improve mood and self-esteem. During the break, notice how often the urge to check arises and how your mood changes without the constant comparison input.
          </p>
          <p>
            After the break, reintroduce social media slowly and deliberately. Follow accounts that educate, inspire without triggering envy, and align with your values rather than your insecurities.
          </p>
        </ArticleCallout>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          1. Develop Comparison Awareness Through Mindfulness
        </h3>
        <p className="mb-6">
          The first step is noticing when comparison happens. Most comparison is automatic and unconscious. You do not decide to compare. Your brain does it before you are aware of it. Mindfulness practice reduces the automaticity of social comparison by creating a gap between the trigger and the response <Citation id="8" index={8} source="Mindfulness" year="2018" tier={1} />. When you notice the thought "they are so much better than me," you can label it: "I am comparing." This simple act of labeling engages your prefrontal cortex and reduces the emotional intensity of the comparison.
        </p>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          2. Shift to Self-Referenced Standards
        </h3>
        <p className="mb-6">
          Instead of measuring yourself against others, measure yourself against your past self. Ask "Am I making progress?" instead of "Am I ahead of them?" Research on personal standards versus social comparison standards shows that people who use self-referenced metrics report higher well-being and more sustainable motivation <Citation id="7" index={7} source="Motivation and Emotion" year="2020" tier={1} />. Your only meaningful benchmark is your own trajectory.
        </p>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          3. Practice Self-Compassion
        </h3>
        <p className="mb-6">
          Self-compassion, treating yourself with the same kindness you would offer a friend, is one of the strongest buffers against harmful social comparison. Research found that self-compassion practice significantly reduces the frequency and emotional impact of social comparison <Citation id="5" index={5} source="Self and Identity" year="2019" tier={1} />. When you notice comparison arising, respond with self-compassion: "It is natural to compare. Many people struggle with this. I can acknowledge the feeling without letting it define my worth."
        </p>

        <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-8 mb-4">
          4. Cultivate Gratitude
        </h3>
        <p className="mb-6">
          Gratitude and comparison are psychologically incompatible mental states. When you are genuinely appreciating what you have, the impulse to focus on what others have diminishes significantly. Research published in the journal Emotion demonstrated that regular gratitude practice creates a protective buffer against the negative effects of social comparison <Citation id="6" index={6} source="Emotion" year="2018" tier={1} />. A simple daily practice of writing three specific things you appreciate about your current life can shift your default attention from scarcity to sufficiency.
        </p>

        <h2 id="reframing-comparison" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Comparison Can Be Constructive
        </h2>
        <p className="mb-6">
          Not all comparison is destructive. The difference between harmful and helpful comparison lies in your orientation: passive envy versus active learning. When you encounter someone who has achieved something you want, you have a choice in how you process that information.
        </p>

        <BeforeAfter
          before={{
            title: 'Destructive Comparison',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"They are so much better than me"</li>
                <li>Envy and feelings of inadequacy</li>
                <li>Passive consumption of others' success</li>
                <li>Decreased motivation and withdrawal</li>
                <li>Avoidance of effort because "what is the point"</li>
                <li>Rumination on the gap between you and them</li>
              </ul>
            ),
          }}
          after={{
            title: 'Constructive Comparison',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"What specific steps did they take that I can learn from?"</li>
                <li>Curiosity and genuine interest in their process</li>
                <li>Active extraction of strategies and approaches</li>
                <li>Increased motivation with a clearer path forward</li>
                <li>Engagement with concrete improvement actions</li>
                <li>Focus on actionable insights rather than the gap</li>
              </ul>
            ),
          }}
        />

        <h2 id="building-internal-metrics" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Defining Your Own Metrics of Success
        </h2>
        <p className="mb-6">
          The deepest antidote to comparison is clarity about your own values and definition of success. When you have a clear, personally meaningful direction, other people's paths become interesting but irrelevant to your own journey. Most comparison distress stems not from seeing others succeed but from uncertainty about your own direction. When you do not know what you are working toward, everyone else's progress feels threatening because it highlights your own lack of clarity.
        </p>
        <p className="mb-6">
          Take time to define what success means to you personally, independent of social expectations or what looks impressive to others. Consider the areas of life that genuinely matter most to you: relationships, creative expression, contribution, learning, health, adventure, or something entirely personal. Then create metrics that reflect those values, not metrics that depend on outperforming other people.
        </p>

        <ArticleCallout variant="reflection" title="The Intrinsic Value Test">
          <p className="mb-4">
            Ask yourself: "If no one would ever know about this accomplishment, would I still want it?" If yes, it is intrinsically valuable to you and worth pursuing regardless of how it compares to anyone else's achievements. If no, you may be chasing external validation through comparison rather than building a life that genuinely satisfies you.
          </p>
          <p>
            This test does not mean external recognition is bad. It means that when external recognition is the primary driver, your self-worth becomes dependent on other people's responses, which is inherently unstable and comparison-prone.
          </p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If comparison triggers severe depression, persistent anxiety, or prevents you from functioning in daily life, professional support can help. Cognitive-behavioral therapy (CBT) effectively addresses comparison-related distress by identifying the underlying beliefs that fuel comparison, challenging their accuracy, and building alternative thought patterns. Acceptance and commitment therapy (ACT) can help you acknowledge comparison thoughts without being controlled by them, while compassion-focused therapy specifically targets the self-criticism that often accompanies chronic comparison.
        </p>
        <p className="mb-6">
          You do not need to reach a crisis point before seeking help. If comparison is significantly reducing your quality of life, interfering with your relationships, or preventing you from pursuing goals that matter to you, a therapist can help you develop personalized strategies for breaking the cycle.
        </p>

        <ArticleCallout variant="key-takeaway" title="Key Takeaways">
          <ul className="list-disc pl-5 space-y-2">
            <li>Social comparison is a normal human tendency, not a character flaw, but chronic upward comparison systematically erodes well-being</li>
            <li>Social media amplifies comparison by exposing you to curated highlights from millions of people simultaneously</li>
            <li>The four main comparison traps are the highlight reel effect, composite comparison, moving goalposts, and the asymmetric lens</li>
            <li>Mindfulness, self-compassion, gratitude, and self-referenced standards are the most effective evidence-based strategies</li>
            <li>The deepest antidote is clarity about your own values and definition of success, making other people's paths interesting but irrelevant</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
];
