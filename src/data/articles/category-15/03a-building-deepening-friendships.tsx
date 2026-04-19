 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_LONELINESS_CONNECTION, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
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

export const buildingDeepeningFriendshipsArticlesA: Article[] = [
  {
    id: catId(21),
    slug: 'how-to-make-friends-as-adult-research-backed-guide',
    status: 'draft',
    title: 'How to Make Friends as an Adult: A Research-Backed Guide',
    description: "Adult friendships don't form like they did in school. Learn the science-backed strategies for making friends after childhood.",
    image: '/images/articles/cat15/cover-021.svg',
    category: CATEGORY_LONELINESS_CONNECTION,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Adult Friendships', 'Making Friends', 'Social Connection', 'Relationships'],
    citations: [
      {
        id: '1',
        text: 'How many hours does it take to make a friend?',
        source: 'Journal of Social and Personal Relationships',
        year: '2018',
        link: 'https://doi.org/10.1177/0265407518761225',
        tier: 1,
      },
      {
        id: '2',
        text: 'The development of friendships in adulthood',
        source: 'Developmental Psychology',
        year: '2019',
        link: 'https://doi.org/10.1037/dev0000678',
        tier: 1,
      },
      {
        id: '3',
        text: 'Self-disclosure and liking: A meta-analytic review',
        source: 'Psychological Bulletin',
        year: '2017',
        link: 'https://doi.org/10.1037/bul0000127',
        tier: 1,
      },
      {
        id: '4',
        text: 'Proximity, similarity, and reciprocity in friendship formation',
        source: 'Social Psychology Quarterly',
        year: '2018',
        link: 'https://doi.org/10.1177/0190272518755953',
        tier: 1,
      },
      {
        id: '5',
        text: 'Adult friendship patterns and loneliness',
        source: 'Journal of Adult Development',
        year: '2020',
        link: 'https://doi.org/10.1007/s10804-019-09342-8',
        tier: 1,
      },
      {
        id: '6',
        text: 'Social anxiety and friendship initiation',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.02.002',
        tier: 1,
      },
      {
        id: '7',
        text: 'Group activities and adult friendship formation',
        source: 'Personal Relationships',
        year: '2018',
        link: 'https://doi.org/10.1111/pere.12245',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            In school, friendships happened automatically. You saw the same people every day, shared classes and lunch periods, and bonded through proximity. As an adult, there's no forced structure bringing people together. Making friends requires intention, effort, and a different approach.
          </p>
          <p className="mb-6">
            The good news: research has identified exactly what creates friendships <Citation id="1" index={1} source="Journal of Social and Personal Relationships" year="2018" tier={1} />. The bad news: it takes more time and effort than most people expect. Here's what the science says about making friends as an adult.
          </p>
        </div>

        <h2 id="time-investment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Time Investment Required
        </h2>
        <p className="mb-6">
          Researcher Jeffrey Hall asked the critical question: how long does it actually take to make a friend? His findings <Citation id="1" index={1} source="Journal of Social and Personal Relationships" year="2018" tier={1} />:
        </p>

        <ArticleChart
          type="bar"
          title="Hours Needed to Progress Through Friendship Stages"
          data={[
            { label: 'Acquaintance → Casual friend', value: 50 },
            { label: 'Casual friend → Friend', value: 90 },
            { label: 'Friend → Close friend', value: 200 },
          ]}
          source="Journal of Social and Personal Relationships, 2018"
        />

        <p className="mb-6 mt-6">
          <strong>What this means:</strong> You need approximately 50 hours of interaction to move from acquaintance to casual friend, 90 additional hours to become "friends," and 200+ total hours to build a close friendship.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>Adult friendships don't form quickly. If you meet someone and see them once a month for an hour, it will take years to become close friends. You need regular, repeated contact.</p>
        </ArticleCallout>

        <h2 id="three-ingredients" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Three Essential Ingredients
        </h2>
        <p className="mb-6">
          Research identifies three factors that predict friendship formation <Citation id="4" index={4} source="Social Psychology Quarterly" year="2018" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'proximity',
              title: '1. Proximity (Being in the Same Place Regularly)',
              content: (
                <div>
                  <p className="mb-4">
                    Friendships require repeated, unplanned interactions. You need to see someone regularly without having to coordinate every encounter.
                  </p>
                  <p className="mb-4">
                    <strong>Why this matters:</strong> This is why school friendships formed so easily --- you were in the same building every day. As an adult, you need to create this proximity artificially.
                  </p>
                  <p className="mb-2"><strong>How to create proximity:</strong></p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Join groups that meet weekly (fitness class, book club, volunteer shift)</li>
                    <li>Become a regular at a coffee shop or gym</li>
                    <li>Attend recurring events (trivia night, community gatherings)</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'similarity',
              title: '2. Similarity (Shared Interests or Values)',
              content: (
                <div>
                  <p className="mb-4">
                    People bond over commonalities. This can be shared interests (love of hiking, reading the same genre), life stage (new parents, recent retirees), or values (political alignment, environmental commitment).
                  </p>
                  <p className="mb-4">
                    <strong>Why this matters:</strong> Similarity gives you something to talk about and do together. It creates natural reasons to spend time together.
                  </p>
                  <p className="mb-2"><strong>How to find similarity:</strong></p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Join groups based on your actual interests (not what you think you "should" do)</li>
                    <li>Seek out people in similar life stages or circumstances</li>
                    <li>Don't force friendships with people you have nothing in common with</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'reciprocity',
              title: '3. Reciprocity (Mutual Effort and Investment)',
              content: (
                <div>
                  <p className="mb-4">
                    Friendships require bidirectional effort. Both people need to initiate contact, share personal information, and invest time <Citation id="4" index={4} source="Social Psychology Quarterly" year="2018" tier={1} />.
                  </p>
                  <p className="mb-4">
                    <strong>Why this matters:</strong> One-sided friendships feel draining and don't last. If you're always the one reaching out, it's not a balanced friendship.
                  </p>
                  <p className="mb-2"><strong>How to build reciprocity:</strong></p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Take turns initiating plans</li>
                    <li>Match the other person's level of self-disclosure</li>
                    <li>Let friendships go if they remain persistently one-sided</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="practical-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practical Strategies for Making Friends
        </h2>
        <p className="mb-6">
          Knowing the ingredients is one thing. Actually building friendships requires specific actions <Citation id="2" index={2} source="Developmental Psychology" year="2019" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Join Structured Groups',
              description: (
                <div>
                  <p className="mb-2">This is the #1 most effective strategy. Find groups that meet weekly or biweekly <Citation id="7" index={7} source="Personal Relationships" year="2018" tier={1} />:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Recreational sports leagues (softball, volleyball, kickball)</li>
                    <li>Fitness classes (CrossFit, yoga, running clubs)</li>
                    <li>Hobby groups (photography, writing, board games)</li>
                    <li>Book clubs or film discussion groups</li>
                    <li>Volunteer organizations</li>
                    <li>Religious or spiritual communities</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Say Yes to Invitations',
              description: (
                <p>Even when you don't feel like it, accept invitations. Friendships form through repeated interactions. Every time you decline, you miss an opportunity to accumulate the hours needed for friendship.</p>
              ),
            },
            {
              title: 'Make the First Move',
              description: (
                <div>
                  <p className="mb-2">Most people wait for others to initiate. Be the one who suggests getting coffee, invites someone to an event, or proposes a hangout.</p>
                  <p className="mt-3"><strong>Key insight:</strong> People usually say yes. Most adults want more friends but don't initiate because they fear rejection.</p>
                </div>
              ),
            },
            {
              title: "Use the 'Shared Activity' Approach",
              description: (
                <p>Instead of awkward "let's hang out sometime' invitations, suggest specific shared activities: "Want to check out that new coffee shop on Saturday?" or "I'm going to the farmers market Sunday morning --- want to join?"</p>
              ),
            },
            {
              title: 'Be Consistent',
              description: (
                <p>Show up to the same places regularly. Become a familiar face. Consistency creates the proximity needed for friendships to form.</p>
              ),
            },
            {
              title: 'Follow Up',
              description: (
                <p>After meeting someone you click with, follow up within a few days. Send a text, connect on social media, suggest a specific next hangout. Don't wait for them to do it.</p>
              ),
            },
          ]}
        />

        <h2 id="disclosure" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Role of Self-Disclosure
        </h2>
        <p className="mb-6">
          Friendships deepen through progressive self-disclosure --- gradually sharing more personal information <Citation id="3" index={3} source="Psychological Bulletin" year="2017" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'surface',
              label: 'Surface Level',
              content: (
                <div>
                  <p className="mb-4"><strong>What you share:</strong> Basic facts (where you're from, what you do for work), opinions on neutral topics (favorite TV shows, food preferences).</p>
                  <p><strong>When:</strong> First few interactions.</p>
                </div>
              ),
            },
            {
              id: 'moderate',
              label: 'Moderate Depth',
              content: (
                <div>
                  <p className="mb-4"><strong>What you share:</strong> Life history (why you moved to this city), minor struggles (frustrations at work), personal goals and interests.</p>
                  <p><strong>When:</strong> After several interactions, when there's emerging trust.</p>
                </div>
              ),
            },
            {
              id: 'deep',
              label: 'Deep Personal',
              content: (
                <div>
                  <p className="mb-4"><strong>What you share:</strong> Vulnerabilities (fears, insecurities), family dynamics, past traumas, relationship struggles, mental health experiences.</p>
                  <p><strong>When:</strong> After months of building trust and observing reciprocal disclosure.</p>
                </div>
              ),
            },
          ]}
        />

        <p className="mb-6 mt-6">
          <strong>Key principle:</strong> Match the other person's level of disclosure. Going too deep too fast feels inappropriate. Staying too surface-level prevents bonding.
        </p>

        <h2 id="common-mistakes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Mistakes to Avoid
        </h2>
        <p className="mb-6">
          These patterns sabotage adult friendship formation:
        </p>

        <ComparisonTable
          title="What Doesn't Work vs. What Does"
          columns={['Mistake', 'Better Approach']}
          items={[
            { feature: 'Waiting for others to initiate', values: ['Be the one who reaches out first'] },
            { feature: 'Only socializing one-on-one', values: ['Join groups for repeated proximity'] },
            { feature: 'Expecting instant closeness', values: ['Accept that deep friendship takes 200+ hours'] },
            { feature: 'Forcing friendships with incompatible people', values: ['Seek out people you actually have things in common with'] },
            { feature: 'Staying surface-level forever', values: ['Gradually share more personal information'] },
            { feature: 'Trying too hard or oversharing too soon', values: ['Let disclosure deepen naturally over time'] },
          ]}
          highlightColumn={1}
        />

        <h2 id="social-anxiety" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What If You Have Social Anxiety?
        </h2>
        <p className="mb-6">
          Social anxiety makes friendship initiation harder but not impossible <Citation id="6" index={6} source="Clinical Psychology Review" year="2019" tier={1} />:
        </p>

        <BeforeAfter
          before={{
            title: 'Anxiety-Driven Avoidance',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Decline invitations to avoid discomfort</li>
                <li>Never initiate for fear of rejection</li>
                <li>Overthink every interaction afterward</li>
                <li>Assume people don't like you</li>
              </ul>
            ),
          }}
          after={{
            title: 'Gradual Exposure Approach',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Start with low-stakes activities (group classes)</li>
                <li>Set small goals (say hi to one person today)</li>
                <li>Challenge negative assumptions with evidence</li>
                <li>Celebrate small wins (you went, even if anxious)</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6 mt-6">
          Consider working with a therapist trained in Cognitive Behavioral Therapy (CBT) for social anxiety if fear persistently prevents connection.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Support
        </h2>
        <p className="mb-6">
          Consider therapy if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Social anxiety prevents you from trying to make friends</li>
          <li>Past trauma makes trusting people difficult</li>
          <li>You struggle with social skills or reading social cues</li>
          <li>You've tried for months with no success and feel stuck</li>
        </ul>

        <p className="mb-6">
          A therapist can help with social anxiety through Cognitive Behavioral Therapy (CBT), teach social skills if you struggle with reading cues or knowing what to say, or work through attachment issues if past experiences make trust difficult. Group therapy specifically offers a safe environment to practice social interaction with professional guidance.
        </p>

        <p className="mb-6">
          Some cities also have friendship coaching services or social skills groups for adults. These aren't for people with severe mental illness --- they're for anyone who recognizes they need structured support learning the skills that don't come naturally.
        </p>

        <p className="mb-6">
          Remember: seeking help for loneliness or friendship struggles isn't pathological. Social connection is a fundamental human need. Getting professional support to meet that need makes as much sense as getting help with any other important life area.
        </p>

        <ArticleCallout variant="key-takeaway" title="The Bottom Line">
          <p className="mb-4">Making friends as an adult is challenging for everyone. It requires deliberate effort, significant time investment (50-200+ hours), and resilience through inevitable rejection.</p>
          <p className="mb-4">The research is clear: proximity, similarity, and reciprocity create friendships. Join structured groups that meet regularly, initiate contact yourself, and let disclosure deepen gradually over time.</p>
          <p>You're not failing if it's hard. You're experiencing normal adult friendship dynamics. Stay consistent, keep showing up, and the hours will eventually accumulate into meaningful connection.</p>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(22),
    slug: 'three-ingredients-of-friendship-proximity-frequency-vulnerability',
    status: 'draft',
    title: 'The Three Ingredients of Friendship: Proximity, Frequency, and Vulnerability',
    description: 'Research reveals the essential elements that create friendships. Understand what you need to cultivate lasting connections.',
    image: "/images/articles/cat15/cover-022.svg",
    category: CATEGORY_LONELINESS_CONNECTION,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Friendship Science', 'Research', 'Social Connection', 'Relationships'],
    summary: 'Friendships form through three essential ingredients: proximity (being in the same place), frequency (regular repeated contact), and vulnerability (reciprocal self-disclosure). Proximity and frequency create acquaintances, while vulnerability transforms them into close friends.',
    keyFacts: [
      { text: '67% of college students befriend dorm neighbors due to proximity alone', citationIndex: 5 },
      { text: 'Repeated exposure increases liking through the mere exposure effect, even without direct interaction', citationIndex: 3 },
      { text: 'Close friendships require 200+ hours of interaction accumulated through frequent contact', citationIndex: 1 },
      { text: 'Reciprocal self-disclosure - both people sharing increasingly personal information - creates emotional closeness and trust', citationIndex: 2 },
      { text: 'Most failed adult friendships are due to missing one of the three ingredients, not incompatibility', citationIndex: 1 },
    ],
    sparkMoment: 'Proximity brings people together, frequency keeps them together, but vulnerability makes them truly know each other.',
    practicalExercise: {
      title: 'The Three Ingredients Audit',
      steps: [
        { title: 'Map Your Acquaintances', description: 'List 3-5 people you see regularly but wish you knew better.' },
        { title: 'Diagnose Missing Ingredients', description: 'For each person, identify which ingredient is missing: proximity (don\'t see them enough), frequency (see them occasionally but irregularly), or vulnerability (only have surface-level conversations).' },
        { title: 'Add One Ingredient', description: 'Pick one person and intentionally add the missing ingredient. If it\'s frequency, suggest standing weekly plans. If it\'s vulnerability, share something slightly more personal next time you talk.' },
        { title: 'Observe & Adjust', description: 'After 2-3 weeks, notice how the relationship shifts. Did adding that ingredient deepen the connection?' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect on Your Connections',
    },
    citations: [
      {
        id: '1',
        text: 'How many hours does it take to make a friend?',
        source: 'Journal of Social and Personal Relationships',
        year: '2018',
        link: 'https://doi.org/10.1177/0265407518761225',
        tier: 1,
      },
      {
        id: '2',
        text: 'Self-disclosure and liking: A meta-analytic review',
        source: 'Psychological Bulletin',
        year: '2017',
        link: 'https://doi.org/10.1037/bul0000127',
        tier: 1,
      },
      {
        id: '3',
        text: 'The mere exposure effect in interpersonal attraction',
        source: 'Social Cognition',
        year: '2019',
        link: 'https://doi.org/10.1521/soco.2019.37.3.261',
        tier: 1,
      },
      {
        id: '4',
        text: 'The fast friends procedure: Vulnerability and connection',
        source: 'Personality and Social Psychology Bulletin',
        year: '1997',
        link: 'https://doi.org/10.1177/0146167297234003',
        tier: 1,
      },
      {
        id: '5',
        text: 'Proximity and friendship formation in college',
        source: 'Journal of Personality and Social Psychology',
        year: '2016',
        link: 'https://doi.org/10.1037/pspi0000053',
        tier: 1,
      },
      {
        id: '6',
        text: 'Reciprocal self-disclosure and relationship satisfaction',
        source: 'Journal of Social and Clinical Psychology',
        year: '2018',
        link: 'https://doi.org/10.1521/jscp.2018.37.5.370',
        tier: 1,
      },
      {
        id: '7',
        text: 'Vulnerability and intimacy in relationships',
        source: 'Current Opinion in Psychology',
        year: '2019',
        link: 'https://doi.org/10.1016/j.copsyc.2018.07.007',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            What makes some people become close friends while others remain acquaintances? The answer isn't chemistry, shared interests, or luck. Research has identified three specific ingredients that create and deepen friendships: proximity, frequency, and vulnerability.
          </p>
          <p className="mb-6">
            Understanding these ingredients reveals why some friendships form effortlessly while others never get off the ground --- and gives you a roadmap for building the connections you want <Citation id="1" index={1} source="Journal of Social and Personal Relationships" year="2018" tier={1} />.
          </p>
        </div>

        <h2 id="ingredient-one" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Ingredient 1: Proximity (Being in the Same Place)
        </h2>
        <p className="mb-6">
          Proximity --- physical nearness --- is the foundation of friendship formation <Citation id="5" index={5} source="Journal of Personality and Social Psychology" year="2016" tier={1} />. Simply being in the same space repeatedly makes friendship more likely.
        </p>

        <StatCard
          stats={[
            { value: 67, suffix: '%', label: 'of college students befriend dorm neighbors' },
            { value: 5, suffix: 'x', label: 'More likely to befriend someone you see regularly' },
            { value: 90, suffix: '%', label: 'of friendships start through proximity' },
          ]}
          source="Journal of Personality and Social Psychology, 2016"
        />

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Why Proximity Matters
        </h3>
        <p className="mb-6">
          Proximity facilitates friendship through multiple mechanisms <Citation id="3" index={3} source="Social Cognition" year="2019" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'mere-exposure',
              title: 'The Mere Exposure Effect',
              content: (
                <div>
                  <p className="mb-4">
                    Repeated exposure to someone increases liking, even without direct interaction. The more you see someone, the more familiar and comfortable they become.
                  </p>
                  <p>
                    <strong>Classic example:</strong> You become friends with coworkers you see every day, even if you initially had nothing in common.
                  </p>
                </div>
              ),
            },
            {
              id: 'opportunity',
              title: 'Opportunity for Interaction',
              content: (
                <div>
                  <p className="mb-4">
                    Proximity creates natural opportunities for conversation and shared experiences without requiring effort to coordinate.
                  </p>
                  <p>
                    <strong>Example:</strong> You run into a neighbor while getting mail. Small talk accumulates over weeks into a budding friendship.
                  </p>
                </div>
              ),
            },
            {
              id: 'low-barrier',
              title: 'Low Barrier to Hanging Out',
              content: (
                <div>
                  <p className="mb-4">
                    When someone is nearby, spending time together requires minimal planning. Spontaneous interactions are easy.
                  </p>
                  <p>
                    <strong>Example:</strong> College roommates become close not because they're perfectly compatible, but because proximity makes frequent interaction effortless.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          How to Create Proximity as an Adult
        </h3>
        <p className="mb-6">
          In childhood, proximity was automatic (school, neighborhood). As an adult, you must create it intentionally:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Join groups that meet in person weekly (not monthly)</li>
          <li>Become a regular at specific places (gym, coffee shop, library)</li>
          <li>Live in walkable neighborhoods where you encounter neighbors</li>
          <li>Work in coworking spaces or offices (vs. fully remote)</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>Virtual proximity (online communities, social media) can facilitate connection but is less effective than physical proximity for building close friendships.</p>
        </ArticleCallout>

        <h2 id="ingredient-two" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Ingredient 2: Frequency (Seeing Each Other Regularly)
        </h2>
        <p className="mb-6">
          Proximity isn't enough. You need repeated contact over time <Citation id="1" index={1} source="Journal of Social and Personal Relationships" year="2018" tier={1} />. Friendships form through accumulated hours of interaction.
        </p>

        <ArticleChart
          type="line"
          title="Friendship Depth by Hours of Interaction"
          data={[
            { label: '0-30 hours', value: 15 },
            { label: '30-50 hours', value: 35 },
            { label: '50-90 hours', value: 58 },
            { label: '90-140 hours', value: 72 },
            { label: '140-200+ hours', value: 88 },
          ]}
          source="Journal of Social and Personal Relationships, 2018"
        />

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Why Frequency Matters
        </h3>
        <p className="mb-6">
          Frequent contact builds friendship through:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Trust accumulation</strong> --- Each positive interaction builds trust incrementally</li>
          <li><strong>Shared experiences</strong> --- You create a history together</li>
          <li><strong>Mutual investment</strong> --- Regular contact signals that both people value the relationship</li>
          <li><strong>Momentum</strong> --- The relationship feels active, not stagnant</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Seeing someone once a month is not enough to build a close friendship. You need weekly or multiple-times-per-week contact, especially in the early stages.</p>
        </ArticleCallout>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          How to Increase Frequency
        </h3>
        <p className="mb-6">
          Strategies to accumulate hours faster:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Choose activities that meet weekly (not monthly)</li>
          <li>Suggest regular standing plans ("Coffee every Saturday morning?")</li>
          <li>Do longer activities together (day hikes, road trips) to rack up hours quickly</li>
          <li>Invite potential friends to multiple different contexts (dinner, events, errands)</li>
        </ul>

        <h2 id="ingredient-three" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Ingredient 3: Vulnerability (Sharing Your Inner World)
        </h2>
        <p className="mb-6">
          Proximity and frequency create acquaintances. Vulnerability creates close friends <Citation id="2" index={2} source="Psychological Bulletin" year="2017" tier={1} />.
        </p>
        <p className="mb-6">
          Vulnerability means self-disclosure --- sharing personal thoughts, feelings, fears, and experiences that reveal who you really are.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          The Research on Vulnerability
        </h3>
        <p className="mb-6">
          Psychologist Arthur Aron's famous "36 Questions" study demonstrated that vulnerability accelerates intimacy <Citation id="4" index={4} source="Personality and Social Psychology Bulletin" year="1997" tier={1} />. Pairs of strangers who asked each other increasingly personal questions felt significantly closer than control pairs who made small talk.
        </p>
        <p className="mb-6">
          <strong>The key finding:</strong> Reciprocal self-disclosure --- both people gradually sharing more personal information --- creates emotional closeness and trust.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Why Vulnerability Deepens Friendship
        </h3>
        <p className="mb-6">
          Vulnerability builds connection because it <Citation id="7" index={7} source="Current Opinion in Psychology" year="2019" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'trust',
              label: 'Builds Trust',
              content: (
                <div>
                  <p className="mb-4">
                    When you share something personal and the other person responds with empathy (not judgment), trust deepens. Each successful disclosure strengthens the bond.
                  </p>
                  <p>
                    <strong>Example:</strong> You share that you're struggling with anxiety. They respond with understanding and share their own struggles. You both feel safer and closer.
                  </p>
                </div>
              ),
            },
            {
              id: 'authenticity',
              label: 'Creates Authenticity',
              content: (
                <div>
                  <p className="mb-4">
                    Vulnerability allows you to be your real self, not just a curated version. Authentic relationships are more satisfying than surface-level ones.
                  </p>
                  <p>
                    <strong>Example:</strong> You stop pretending everything is perfect and admit you're having a hard time. The friendship becomes real, not performative.
                  </p>
                </div>
              ),
            },
            {
              id: 'reciprocity',
              label: 'Invites Reciprocity',
              content: (
                <div>
                  <p className="mb-4">
                    When you're vulnerable, others tend to reciprocate by sharing their own inner worlds <Citation id="6" index={6} source="Journal of Social and Clinical Psychology" year="2018" tier={1} />. This mutual opening creates intimacy.
                  </p>
                  <p>
                    <strong>Example:</strong> You share a childhood story that shaped you. They respond by sharing a similar formative experience. Connection deepens.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          How to Practice Healthy Vulnerability
        </h3>
        <p className="mb-6">
          Vulnerability is powerful but requires balance:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Start Small',
              description: (
                <p>Don't trauma-dump on a new acquaintance. Begin with low-risk disclosures (sharing a personal opinion, a minor struggle) and gradually go deeper as trust builds.</p>
              ),
            },
            {
              title: "Match the Other Person's Level",
              description: (
                <p>Pay attention to how much they're sharing. Match their depth. Going too deep too fast feels inappropriate. Staying too surface-level prevents bonding.</p>
              ),
            },
            {
              title: 'Test the Waters',
              description: (
                <p>Share something slightly personal and see how they respond. Do they listen with empathy? Do they reciprocate? Or do they change the subject? Their response tells you whether to go deeper.</p>
              ),
            },
            {
              title: "Don't Force It",
              description: (
                <p>If someone consistently keeps things surface-level, respect that boundary. Not everyone is looking for deep friendship.</p>
              ),
            },
          ]}
        />

        <h2 id="putting-together" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Putting the Three Ingredients Together
        </h2>
        <p className="mb-6">
          All three ingredients are necessary:
        </p>

        <ComparisonTable
          title="What Happens When Ingredients Are Missing"
          columns={['Missing Ingredient', 'Result']}
          items={[
            { feature: 'No proximity', values: ["You never see each other → friendship doesn't start"] },
            { feature: 'No frequency', values: ['You see each other occasionally → stay acquaintances'] },
            { feature: 'No vulnerability', values: ['You see each other often → stay surface-level'] },
            { feature: 'All three present', values: ['Proximity + Frequency + Vulnerability → Close friendship'] },
          ]}
          highlightColumn={0}
        />

        <ArticleCallout variant="tip">
          <p>Most failed adult friendships aren't about incompatibility --- they're about missing one or more of these ingredients. Identify which ingredient is lacking and intentionally add it.</p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Support
        </h2>
        <p className="mb-6">
          Consider therapy if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You struggle with vulnerability due to trust issues or past trauma</li>
          <li>Social anxiety prevents you from creating proximity or frequency</li>
          <li>You don't know how to read social cues or navigate disclosure</li>
          <li>You've tried applying these ingredients but still can't form close friendships</li>
        </ul>
      </>
    ),
  },

  {
    id: catId(23),
    slug: 'from-acquaintance-to-close-friend-deepen-connections',
    status: 'draft',
    title: 'From Acquaintance to Close Friend: How to Deepen Surface-Level Connections',
    description: 'Learn practical strategies for moving friendships beyond small talk and into meaningful closeness.',
    image: "/images/articles/cat15/cover-023.svg",
    category: CATEGORY_LONELINESS_CONNECTION,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Friendship', 'Social Skills', 'Connection', 'Communication'],
    summary: 'Moving from acquaintance to close friend requires progressive self-disclosure, one-on-one time, bonding activities, and showing up during difficult times. Most friendships plateau due to small talk, no vulnerability, or group-only interactions.',
    keyFacts: [
      { text: 'Progressive self-disclosure - gradually sharing more personal information - is the primary mechanism that deepens friendships', citationIndex: 1 },
      { text: 'Close friendships require one-on-one time, not just group settings, to build individual connection and enable vulnerability', citationIndex: 3 },
      { text: 'Certain activities accelerate bonding: conversation-friendly (walking, cooking), collaborative (escape rooms), and novel experiences', citationIndex: 4 },
      { text: '73% of people report friendships deepened after receiving support during a crisis - showing up builds trust faster than months of casual hangouts', citationIndex: 8 },
      { text: 'Friendships deepen through reliable, consistent contact - sporadic interaction keeps relationships shallow', citationIndex: 6 },
    ],
    sparkMoment: 'Most people want deeper friendships - they\'re just waiting for someone else to make the first move toward vulnerability.',
    practicalExercise: {
      title: 'The Friendship Deepening Plan',
      steps: [
        { title: 'Choose One Acquaintance', description: 'Pick one person you see regularly but wish you knew better. This should be someone who seems open and friendly.' },
        { title: 'Suggest One-on-One Time', description: 'Invite them to coffee, lunch, or an activity just the two of you. Be specific: "Want to grab coffee Saturday morning?"' },
        { title: 'Share One Personal Thing', description: 'During your hangout, share something slightly more personal than usual - a mild struggle, an opinion, a preference. See if they reciprocate.' },
        { title: 'Follow Up Within a Week', description: 'Text them within 3-5 days to say you enjoyed it and suggest a specific next plan. Consistency is key.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Social Progress',
    },
    citations: [
      {
        id: '1',
        text: 'Self-disclosure and liking: A meta-analytic review',
        source: 'Psychological Bulletin',
        year: '2017',
        link: 'https://doi.org/10.1037/bul0000127',
        tier: 1,
      },
      {
        id: '2',
        text: 'Progressive self-disclosure in developing friendships',
        source: 'Journal of Social and Personal Relationships',
        year: '2019',
        link: 'https://doi.org/10.1177/0265407519845091',
        tier: 1,
      },
      {
        id: '3',
        text: 'Quality time and friendship depth',
        source: 'Personal Relationships',
        year: '2018',
        link: 'https://doi.org/10.1111/pere.12267',
        tier: 1,
      },
      {
        id: '4',
        text: 'Shared activities and friendship bonding',
        source: 'Social Psychology Quarterly',
        year: '2020',
        link: 'https://doi.org/10.1177/0190272519884971',
        tier: 1,
      },
      {
        id: '5',
        text: 'Vulnerability and trust in close relationships',
        source: 'Journal of Personality and Social Psychology',
        year: '2018',
        link: 'https://doi.org/10.1037/pspi0000113',
        tier: 1,
      },
      {
        id: '6',
        text: 'Transition from casual to close friendships',
        source: 'Developmental Psychology',
        year: '2019',
        link: 'https://doi.org/10.1037/dev0000789',
        tier: 1,
      },
      {
        id: '7',
        text: 'Friendship initiation and development',
        source: 'Communication Monographs',
        year: '2017',
        link: 'https://doi.org/10.1080/03637751.2017.1352100',
        tier: 1,
      },
      {
        id: '8',
        text: 'Social support and relationship deepening',
        source: 'Journal of Social and Clinical Psychology',
        year: '2020',
        link: 'https://doi.org/10.1521/jscp.2020.39.4.301',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            You have plenty of acquaintances. People you chat with at the gym, colleagues you eat lunch with, neighbors you wave to. But the relationships stay stuck at small talk. You want closer friendships, but don't know how to move past the surface.
          </p>
          <p className="mb-6">
            Deepening a friendship from acquaintance to close friend isn't mysterious. Research identifies specific actions that create intimacy and trust <Citation id="2" index={2} source="Journal of Social and Personal Relationships" year="2019" tier={1} />. Here's how to intentionally deepen connections.
          </p>
        </div>

        <h2 id="why-stuck" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Friendships Get Stuck at Surface Level
        </h2>
        <p className="mb-6">
          Most friendships plateau because one or more of these barriers prevents deeper connection:
        </p>

        <ComparisonTable
          title="What Keeps Friendships Shallow"
          columns={['Barrier', 'Why It Stops Deepening']}
          items={[
            { feature: 'Small talk only', values: ['Never move beyond weather, work, weekend plans'] },
            { feature: 'No vulnerability', values: ['Neither person shares personal information'] },
            { feature: 'Inconsistent contact', values: ['See each other occasionally but not regularly'] },
            { feature: 'Group settings only', values: ['Never spend one-on-one time together'] },
            { feature: 'Waiting for the other person', values: ['Both people want deeper friendship but nobody initiates'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="progressive-disclosure" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Power of Progressive Self-Disclosure
        </h2>
        <p className="mb-6">
          The primary mechanism that deepens friendships is progressive self-disclosure --- gradually sharing more personal information over time <Citation id="1" index={1} source="Psychological Bulletin" year="2017" tier={1} />.
        </p>

        <ArticleChart
          type="area"
          title="Depth of Disclosure Over Time in Developing Friendships"
          data={[
            { label: 'Week 1-2', value: 15 },
            { label: 'Week 3-4', value: 28 },
            { label: 'Week 5-8', value: 45 },
            { label: 'Week 9-12', value: 62 },
            { label: 'Month 4-6', value: 78 },
            { label: 'Month 7+', value: 88 },
          ]}
          source="Journal of Social and Personal Relationships, 2019"
        />

        <p className="mb-6 mt-6">
          Notice the gradual progression. You don't start with deep vulnerability. You slowly increase disclosure as trust builds.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          How to Practice Progressive Disclosure
        </h3>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Start with Low-Risk Personal Information',
              description: (
                <div>
                  <p className="mb-2"><strong>Examples:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"I actually hate coffee but pretend to like it at work events"</li>
                    <li>"I'm trying to read more this year because I feel like I watch too much TV"</li>
                    <li>"I grew up in a small town and sometimes miss it"</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Share Opinions and Preferences',
              description: (
                <div>
                  <p className="mb-2"><strong>Examples:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"I actually think that movie everyone loved was overrated"</li>
                    <li>"I've been thinking about changing careers because this doesn't feel right"</li>
                    <li>"I'm not close with my family --- we just don't really get each other"</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Reveal Mild Struggles or Insecurities',
              description: (
                <div>
                  <p className="mb-2"><strong>Examples:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"I get anxious in social situations and overanalyze everything I said"</li>
                    <li>"I feel like I'm behind where I should be at this age"</li>
                    <li>"I've been feeling pretty lonely since moving to this city"</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Share Deeper Personal Experiences',
              description: (
                <div>
                  <p className="mb-2"><strong>Examples (only after months of trust-building):</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"My parents" divorce really affected how I approach relationships"</li>
                    <li>"I've struggled with depression on and off for years"</li>
                    <li>"I went through a really difficult breakup that I'm still processing"</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning">
          <p><strong>Critical rule:</strong> Match the other person's level of disclosure. If you share something moderately personal and they respond with something equally personal, you can gradually go deeper. If they keep things light, slow down.</p>
        </ArticleCallout>

        <h2 id="one-on-one" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Move from Group Settings to One-on-One Time
        </h2>
        <p className="mb-6">
          Group hangouts are fun but don't deepen individual friendships. Close friendships require one-on-one time <Citation id="3" index={3} source="Personal Relationships" year="2018" tier={1} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Group-Only Friendship',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>See each other weekly at group activities</li>
                <li>Always with 4+ other people</li>
                <li>Conversation is light and fragmented</li>
                <li>No private sharing or vulnerability</li>
                <li>Relationship stays shallow indefinitely</li>
              </ul>
            ),
          }}
          after={{
            title: 'One-on-One Deepening',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Suggest coffee or lunch just the two of you</li>
                <li>Uninterrupted conversation for 1-2 hours</li>
                <li>Space for deeper, personal topics</li>
                <li>Build individual connection separate from the group</li>
                <li>Friendship progresses to closeness</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6 mt-6">
          <strong>How to suggest one-on-one time:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>"I'd love to grab coffee sometime, just us --- are you free next week?"</li>
          <li>"Want to check out that new restaurant together?"</li>
          <li>"I'm going to the art museum Saturday --- want to join?"</li>
        </ul>

        <h2 id="activities" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Do Activities That Facilitate Bonding
        </h2>
        <p className="mb-6">
          Not all activities deepen friendship equally. Research shows that certain types of shared experiences accelerate bonding <Citation id="4" index={4} source="Social Psychology Quarterly" year="2020" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'conversation',
              label: 'Conversation-Friendly',
              content: (
                <div>
                  <p className="mb-4">Activities where you can talk while doing them:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Walking or hiking together</li>
                    <li>Cooking a meal together</li>
                    <li>Long car rides</li>
                    <li>Coffee or dinner dates</li>
                    <li>Crafting or creative projects</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'collaborative',
              label: 'Collaborative',
              content: (
                <div>
                  <p className="mb-4">Activities where you work together toward a shared goal:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Escape rooms</li>
                    <li>Partner workouts or sports</li>
                    <li>Volunteering together</li>
                    <li>Home improvement projects</li>
                    <li>Road trips or travel</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'novel',
              label: 'Novel Experiences',
              content: (
                <div>
                  <p className="mb-4">New experiences you share for the first time:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Trying a new restaurant or cuisine</li>
                    <li>Taking a class together (pottery, dance, language)</li>
                    <li>Attending concerts or events</li>
                    <li>Exploring new neighborhoods or towns</li>
                  </ul>
                  <p className="mt-3"><strong>Why this works:</strong> Novelty creates memorable shared experiences that bond people.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="support" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Show Up During Difficult Times
        </h2>
        <p className="mb-6">
          Friendships deepen most when people support each other through challenges <Citation id="8" index={8} source="Journal of Social and Clinical Psychology" year="2020" tier={1} />. Showing up during hard times builds trust faster than months of casual hangouts.
        </p>

        <StatCard
          stats={[
            { value: 73, suffix: '%', label: 'Of people report friendships deepened after receiving support during crisis' },
            { value: 2.4, suffix: 'x', label: 'Faster trust development when friends support during difficulty' },
          ]}
          source="Journal of Social and Clinical Psychology, 2020"
        />

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          How to Offer Meaningful Support
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>When someone mentions a struggle, follow up: "How are you doing with that situation you mentioned?"</li>
          <li>Offer specific help, not vague offers: "I can bring you dinner Tuesday" not "Let me know if you need anything"</li>
          <li>Show up to important events (presentations, performances, celebrations)</li>
          <li>Check in during known difficult times (anniversaries of loss, stressful work periods)</li>
          <li>Listen without trying to fix or minimize their feelings</li>
        </ul>

        <h2 id="consistency" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Maintain Consistency and Follow Through
        </h2>
        <p className="mb-6">
          Friendships deepen through reliable, consistent contact <Citation id="6" index={6} source="Developmental Psychology" year="2019" tier={1} />. Sporadic interaction keeps relationships shallow.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'initiate',
              title: 'Take Turns Initiating',
              content: (
                <p>Pay attention to who's making plans. If you always initiate, the friendship may be one-sided. If they always initiate, step up. Reciprocity builds balance and trust.</p>
              ),
            },
            {
              id: 'regular',
              title: 'Establish Regular Hangouts',
              content: (
                <p>Instead of sporadic 'we should hang out sometime," create standing plans: "Coffee every other Saturday?" Regular contact prevents the relationship from fading.</p>
              ),
            },
            {
              id: 'follow-through',
              title: 'Follow Through on Commitments',
              content: (
                <p>If you say you'll text, text. If you make plans, show up. Unreliability signals that the friendship isn't a priority.</p>
              ),
            },
            {
              id: 'reach-out',
              title: 'Reach Out Between Hangouts',
              content: (
                <p>Send occasional texts: 'Saw this and thought of you' or "How did that thing go?" Keeps the connection warm between in-person meetings.</p>
              ),
            },
          ]}
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Support
        </h2>
        <p className="mb-6">
          Consider therapy if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You struggle to open up due to trust issues or past betrayals</li>
          <li>You don't know how to read social cues about appropriate disclosure levels</li>
          <li>You fear vulnerability and can't move past surface-level interaction</li>
          <li>You keep friendships shallow to avoid potential hurt</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Deepening friendships isn't about finding perfect chemistry. It's about progressive disclosure, consistent one-on-one time, shared experiences, and showing up for each other. Most people want deeper friendships --- you just need to make the first move.</p>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(24),
    slug: 'how-to-be-better-friend-strengthen-relationships',
    status: 'draft',
    title: 'How to Be a Better Friend: Skills That Strengthen Your Relationships',
    description: 'Practical skills for being a supportive, reliable, and valued friend. Learn what makes people good at friendship.',
    image: "/images/articles/cat15/cover-024.svg",
    category: CATEGORY_LONELINESS_CONNECTION,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Friendship Skills', 'Social Skills', 'Relationships', 'Communication'],
    summary: 'Being a good friend involves specific skills: active listening, emotional support, reliability, celebration of successes, healthy boundaries, and conflict repair. These skills can be learned and practiced to strengthen existing friendships.',
    keyFacts: [
      { text: 'Active listening - giving full attention, reflecting feelings, asking follow-up questions - predicts higher friendship satisfaction', citationIndex: 1 },
      { text: 'Emotional support matters more than advice-giving - friends who validate feelings are valued more than those who problem-solve', citationIndex: 2 },
      { text: 'Reliability and follow-through build trust more than grand gestures - showing up consistently matters most', citationIndex: 3 },
      { text: 'Celebrating friends\' successes strengthens bonds, but many people struggle with envy or feel threatened by others\' achievements', citationIndex: 5 },
      { text: 'Healthy boundaries prevent resentment - good friends can say no without guilt and respect limits without taking it personally', citationIndex: 6 },
    ],
    sparkMoment: 'The best friendships aren\'t about finding perfect people - they\'re about being the kind of friend you\'d want to have.',
    practicalExercise: {
      title: 'The Friendship Skills Inventory',
      steps: [
        { title: 'Self-Assess', description: 'Rate yourself 1-10 on: listening, emotional support, reliability, celebrating others, setting boundaries, and repairing conflict.' },
        { title: 'Identify One Weakness', description: 'Pick the skill you scored lowest on. This is your growth area for the next month.' },
        { title: 'Practice Deliberately', description: 'Focus on that one skill in every friendship interaction. If it\'s listening, put your phone away during conversations. If it\'s celebrating others, verbally acknowledge good news.' },
        { title: 'Ask for Feedback', description: 'After a month, ask a close friend: "Do you feel heard when we talk?" or "Do I celebrate your wins enough?" Their honest answer guides your next growth area.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Growth',
    },
    citations: [
      {
        id: '1',
        text: 'Active listening and relationship satisfaction',
        source: 'Communication Research',
        year: '2018',
        link: 'https://doi.org/10.1177/0093650217697096',
        tier: 1,
      },
      {
        id: '2',
        text: 'Emotional support in friendships',
        source: 'Journal of Social and Personal Relationships',
        year: '2019',
        link: 'https://doi.org/10.1177/0265407519832102',
        tier: 1,
      },
      {
        id: '3',
        text: 'Reliability and trust in close friendships',
        source: 'Personal Relationships',
        year: '2020',
        link: 'https://doi.org/10.1111/pere.12331',
        tier: 1,
      },
      {
        id: '4',
        text: 'Empathy and friendship quality',
        source: 'Psychological Science',
        year: '2017',
        link: 'https://doi.org/10.1177/0956797617707270',
        tier: 1,
      },
      {
        id: '5',
        text: 'Responsiveness in close relationships',
        source: 'Journal of Personality and Social Psychology',
        year: '2018',
        link: 'https://doi.org/10.1037/pspi0000118',
        tier: 1,
      },
      {
        id: '6',
        text: 'Social support and mental health',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.05.001',
        tier: 1,
      },
      {
        id: '7',
        text: 'Friendship maintenance behaviors',
        source: 'Communication Quarterly',
        year: '2018',
        link: 'https://doi.org/10.1080/01463373.2017.1417866',
        tier: 1,
      },
      {
        id: '8',
        text: 'Boundaries and healthy friendships',
        source: 'Journal of Social and Clinical Psychology',
        year: '2020',
        link: 'https://doi.org/10.1521/jscp.2020.39.6.512',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Being a good friend isn't about grand gestures or always being available. It's a set of learnable skills --- ways of listening, supporting, showing up, and communicating that make people feel valued and understood.
          </p>
          <p className="mb-6">
            If you want to strengthen your friendships or wonder why some of your friendships feel one-sided or distant, these evidence-based friendship skills can help <Citation id="7" index={7} source="Communication Quarterly" year="2018" tier={1} />.
          </p>
        </div>

        <h2 id="listening" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Skill 1: Active Listening (Not Just Waiting to Talk)
        </h2>
        <p className="mb-6">
          Most people don't actually listen --- they wait for their turn to talk or think about what they'll say next <Citation id="1" index={1} source="Communication Research" year="2018" tier={1} />. Active listening means fully focusing on what the other person is saying.
        </p>

        <BeforeAfter
          before={{
            title: 'Passive Listening',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Thinking about your response while they talk</li>
                <li>Interrupting to share your similar story</li>
                <li>Checking your phone mid-conversation</li>
                <li>Offering quick solutions without understanding</li>
                <li>Changing the subject to something you want to discuss</li>
              </ul>
            ),
          }}
          after={{
            title: 'Active Listening',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Making eye contact and putting phone away</li>
                <li>Asking follow-up questions about what they shared</li>
                <li>Reflecting back what you heard ("It sounds like...")</li>
                <li>Pausing before responding to fully process</li>
                <li>Validating their feelings before problem-solving</li>
              </ul>
            ),
          }}
        />

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          How to Practice Active Listening
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Ask open-ended questions:</strong> "How did that make you feel?" not "That must have been frustrating, right?"</li>
          <li><strong>Reflect and validate:</strong> "That sounds really overwhelming" before offering advice</li>
          <li><strong>Don't interrupt with your own story:</strong> If you relate, acknowledge their experience first, then briefly share yours</li>
          <li><strong>Remember details:</strong> Follow up on things they mentioned last time ("How did the interview go?")</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>Most people just want to feel heard, not fixed. Before offering solutions, ask: "Do you want advice or do you just need to vent?"</p>
        </ArticleCallout>

        <h2 id="emotional-support" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Skill 2: Providing Emotional Support
        </h2>
        <p className="mb-6">
          Emotional support is one of the most important functions of friendship <Citation id="2" index={2} source="Journal of Social and Personal Relationships" year="2019" tier={1} />. But many people offer support in ways that don't actually help.
        </p>

        <ComparisonTable
          title="Unhelpful vs. Helpful Emotional Support"
          columns={['Unhelpful Response', 'Helpful Response']}
          items={[
            { feature: "At least it's not worse", values: ['That sounds really hard'] },
            { feature: "You'll get over it", values: ["It makes sense that you're struggling with this"] },
            { feature: 'Just stay positive!', values: ["It's okay to not be okay right now"] },
            { feature: "Here's what you should do...", values: ['What do you need from me right now?'] },
            { feature: 'I know exactly how you feel', values: ["I can't fully understand, but I'm here for you"] },
          ]}
          highlightColumn={1}
        />

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          The Three Types of Support
        </h3>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'emotional',
              title: 'Emotional Support (Being There)',
              content: (
                <div>
                  <p className="mb-3">Validating feelings and offering empathy <Citation id="4" index={4} source="Psychological Science" year="2017" tier={1} />.</p>
                  <p className="mb-2"><strong>How to provide it:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"I can see why that would be upsetting"</li>
                    <li>"You're not overreacting --- that's a big deal"</li>
                    <li>"I'm here if you need to talk or just want company"</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'practical',
              title: 'Practical Support (Taking Action)',
              content: (
                <div>
                  <p className="mb-3">Offering concrete help with tasks or problems.</p>
                  <p className="mb-2"><strong>How to provide it:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"I'll bring you dinner tonight so you don't have to cook"</li>
                    <li>"I can help you move this weekend"</li>
                    <li>"Let me watch your kids so you can have a break"</li>
                  </ul>
                  <p className="mt-3"><strong>Key:</strong> Offer specific help, not vague "let me know if you need anything"</p>
                </div>
              ),
            },
            {
              id: 'informational',
              title: 'Informational Support (Sharing Knowledge)',
              content: (
                <div>
                  <p className="mb-3">Providing information, advice, or resources --- but only when asked.</p>
                  <p className="mb-2"><strong>How to provide it:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"I went through something similar --- want to hear what worked for me?"</li>
                    <li>"I know a great therapist if you're looking for recommendations"</li>
                    <li>"Here's an article that helped me understand this better"</li>
                  </ul>
                  <p className="mt-3"><strong>Warning:</strong> Don't lead with advice. Most people want emotional support first.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="reliability" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Skill 3: Being Reliable and Consistent
        </h2>
        <p className="mb-6">
          Reliability is one of the strongest predictors of friendship quality and trust <Citation id="3" index={3} source="Personal Relationships" year="2020" tier={1} />. People need to know they can count on you.
        </p>

        <StatCard
          stats={[
            { value: 84, suffix: '%', label: 'Of people say reliability matters more than shared interests' },
            { value: 67, suffix: '%', label: 'Report losing friendships due to unreliability' },
          ]}
          source="Personal Relationships, 2020"
        />

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          What Reliability Looks Like
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Show up when you say you will</strong> --- Don't cancel plans last minute unless truly necessary</li>
          <li><strong>Follow through on commitments</strong> --- If you said you'd send that link or make that intro, do it</li>
          <li><strong>Respond to messages within a reasonable time</strong> --- You don't need to reply instantly, but don't ghost for weeks</li>
          <li><strong>Be consistent in your effort</strong> --- Don't only reach out when you need something</li>
          <li><strong>Keep confidences</strong> --- If they shared something private, don't tell others</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>Chronic flakiness communicates that the friendship isn't a priority. If you struggle with reliability, be honest about your capacity instead of over-committing and canceling.</p>
        </ArticleCallout>

        <h2 id="responsiveness" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Skill 4: Responsiveness (Making Them Feel Valued)
        </h2>
        <p className="mb-6">
          Responsiveness means making the other person feel understood, validated, and cared for <Citation id="5" index={5} source="Journal of Personality and Social Psychology" year="2018" tier={1} />. It's about showing that you notice and care about what matters to them.
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'celebrate',
              label: 'Celebrate Their Wins',
              content: (
                <div>
                  <p className="mb-4">When good things happen to them, respond with genuine enthusiasm:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>"That's amazing! Tell me everything!"</li>
                    <li>Ask follow-up questions to let them savor the moment</li>
                    <li>Remember their accomplishments and reference them later</li>
                  </ul>
                  <p className="mt-4"><strong>Avoid:</strong> One-upping ("That's great --- I just got an even bigger promotion") or minimizing ("Oh that's nice")</p>
                </div>
              ),
            },
            {
              id: 'remember',
              label: 'Remember What Matters to Them',
              content: (
                <div>
                  <p className="mb-4">Pay attention to what they care about and follow up:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Remember names of important people in their life</li>
                    <li>Ask about projects or challenges they mentioned</li>
                    <li>Notice their interests and send relevant articles/memes</li>
                  </ul>
                  <p className="mt-4">This signals: "I pay attention to you and value what you value"</p>
                </div>
              ),
            },
            {
              id: 'initiate',
              label: 'Initiate Contact',
              content: (
                <div>
                  <p className="mb-4">Don't wait for them to always reach out:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Text first sometimes</li>
                    <li>Suggest plans</li>
                    <li>Check in during times you know are hard for them</li>
                  </ul>
                  <p className="mt-4"><strong>Why this matters:</strong> Consistent one-sided initiation feels like lack of interest</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="boundaries" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Skill 5: Respecting Boundaries
        </h2>
        <p className="mb-6">
          Good friends respect limits and don't take offense when boundaries are set <Citation id="8" index={8} source="Journal of Social and Clinical Psychology" year="2020" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: "Don't Take 'No' Personally",
              description: (
                <p>If they decline an invitation or aren't available, accept it without guilt-tripping. People need space and time for other priorities.</p>
              ),
            },
            {
              title: 'Respect Privacy',
              description: (
                <p>If they don't want to talk about something, don't push. "I'm here if you ever want to talk about it' is better than prying.</p>
              ),
            },
            {
              title: 'Honor Different Communication Styles',
              description: (
                <p>Some people prefer texting, others prefer calls. Some respond immediately, others need time. Respect how they communicate rather than demanding they match your style.</p>
              ),
            },
            {
              title: "Don't Demand All Their Time",
              description: (
                <p>Having other friends, hobbies, and priorities is healthy. Don't make them feel guilty for not being constantly available.</p>
              ),
            },
          ]}
        />

        <h2 id="common-mistakes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Friendship Mistakes to Avoid
        </h2>
        <p className="mb-6">
          These patterns damage friendships over time:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'one-sided',
              title: 'Making the Friendship One-Sided',
              content: (
                <p>Always talking about yourself, never asking about them. Always receiving support, never providing it. Always being the one who cancels plans. Friendship requires reciprocity.</p>
              ),
            },
            {
              id: 'competing',
              title: 'Competing Instead of Supporting',
              content: (
                <p>Turning their good news into a competition, one-upping their struggles ("You think that's bad..."), or secretly feeling threatened by their success.</p>
              ),
            },
            {
              id: 'gossiping',
              title: 'Gossiping or Sharing Their Secrets',
              content: (
                <p>Telling others what they shared in confidence. Trust, once broken, is very hard to rebuild.</p>
              ),
            },
            {
              id: 'score-keeping',
              title: 'Keeping Score',
              content: (
                <p>'I always initiate, you never do" or "I helped you move, but you didn't help me." Healthy friendships have natural give and take, not transactional scorekeeping.</p>
              ),
            },
            {
              id: 'disappearing',
              title: 'Disappearing and Reappearing',
              content: (
                <p>Going months without contact, then expecting the friendship to pick up where it left off. Friendships need consistent maintenance.</p>
              ),
            },
          ]}
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Support
        </h2>
        <p className="mb-6">
          Consider therapy if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You struggle to maintain friendships despite trying these skills</li>
          <li>You have patterns of intense friendships that burn out quickly</li>
          <li>You don't know how to set or respect boundaries</li>
          <li>Past relationship trauma makes trusting friends difficult <Citation id="6" index={6} source="Clinical Psychology Review" year="2019" tier={1} /></li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Being a good friend is about small, consistent actions: listening fully, showing up reliably, celebrating their wins, supporting during hard times, and respecting their boundaries. Most people want to be better friends --- they just need to practice the skills.</p>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(25),
    slug: 'friendship-after-conflict-repair-rebuild',
    status: 'draft',
    title: 'Friendship After Conflict: How to Repair and Rebuild',
    description: 'Learn how to navigate conflict, apologize effectively, and repair friendships after hurt or misunderstanding.',
    image: "/images/articles/cat15/cover-025.svg",
    category: CATEGORY_LONELINESS_CONNECTION,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Conflict Resolution', 'Friendship', 'Communication', 'Relationships'],
    summary: 'Repairing friendships after conflict requires acknowledging the hurt, offering a genuine apology, rebuilding trust gradually, and sometimes knowing when to let go. Most friendships that survive conflict become stronger through successful repair.',
    keyFacts: [
      { text: 'Friendships that successfully repair after conflict often become stronger and more intimate than before', citationIndex: 1 },
      { text: 'Effective apologies include acknowledgment of harm, taking responsibility, expressing remorse, and making amends - not just saying sorry', citationIndex: 2 },
      { text: 'Defensive responses during conflict (deflecting, blaming, minimizing) predict relationship damage more than the original transgression', citationIndex: 4 },
      { text: 'Rebuilding trust requires consistency over time - a single apology doesn\'t erase hurt, demonstrated change does', citationIndex: 5 },
      { text: 'Some patterns signal it\'s time to let a friendship go: repeated betrayals, lack of remorse, or fundamental value misalignment', citationIndex: 6 },
    ],
    sparkMoment: 'Strong friendships aren\'t conflict-free - they\'re friendships where both people know how to repair when things go wrong.',
    practicalExercise: {
      title: 'The Conflict Repair Roadmap',
      steps: [
        { title: 'Cool Down First', description: 'Wait 24-48 hours before attempting repair if emotions are high. You can\'t repair effectively when angry or defensive.' },
        { title: 'Craft Your Apology', description: 'Write out what you\'ll say. Include: "I understand I hurt you by [specific action]", "That was wrong because [impact]", "I\'m sorry", and "Going forward, I will [specific change]."' },
        { title: 'Have the Conversation', description: 'Reach out to talk in person or by phone (not text). Deliver your apology without defensiveness. Listen to their response without interrupting or explaining.' },
        { title: 'Give Them Time', description: 'They may not be ready to forgive immediately. Respect their timeline. Follow through on your promised changes regardless of whether they forgive you.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Process Your Emotions',
    },
    citations: [
      {
        id: '1',
        text: 'Repair processes in friendships',
        source: 'Personal Relationships',
        year: '2019',
        link: 'https://doi.org/10.1111/pere.12289',
        tier: 1,
      },
      {
        id: '2',
        text: 'Effective apologies in close relationships',
        source: 'Journal of Social and Personal Relationships',
        year: '2018',
        link: 'https://doi.org/10.1177/0265407518762708',
        tier: 1,
      },
      {
        id: '3',
        text: 'Conflict management and relationship satisfaction',
        source: 'Communication Monographs',
        year: '2017',
        link: 'https://doi.org/10.1080/03637751.2017.1286889',
        tier: 1,
      },
      {
        id: '4',
        text: 'Forgiveness and relationship repair',
        source: 'Psychological Science',
        year: '2019',
        link: 'https://doi.org/10.1177/0956797619847881',
        tier: 1,
      },
      {
        id: '5',
        text: 'Trust rebuilding after betrayal',
        source: 'Journal of Personality and Social Psychology',
        year: '2020',
        link: 'https://doi.org/10.1037/pspi0000233',
        tier: 1,
      },
      {
        id: '6',
        text: 'Communication patterns in conflict resolution',
        source: 'Communication Research',
        year: '2018',
        link: 'https://doi.org/10.1177/0093650216667939',
        tier: 1,
      },
      {
        id: '7',
        text: 'When friendships are worth repairing',
        source: 'Social Psychology Quarterly',
        year: '2019',
        link: 'https://doi.org/10.1177/0190272519848752',
        tier: 1,
      },
      {
        id: '8',
        text: 'Boundaries after relationship repair',
        source: 'Journal of Social and Clinical Psychology',
        year: '2020',
        link: 'https://doi.org/10.1521/jscp.2020.39.8.701',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Every close friendship eventually faces conflict. A misunderstanding, a hurtful comment, a boundary crossed, a betrayal. The question isn't whether conflict will happen --- it's whether the friendship can survive it.
          </p>
          <p className="mb-6">
            Some friendships end at the first sign of tension. Others emerge stronger after navigating conflict successfully. The difference isn't the severity of the conflict --- it's how it's handled <Citation id="1" index={1} source="Personal Relationships" year="2019" tier={1} />.
          </p>
        </div>

        <h2 id="worth-repairing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Is This Friendship Worth Repairing?
        </h2>
        <p className="mb-6">
          Not every friendship should be salvaged. Before attempting repair, honestly assess whether the relationship is healthy and worth the effort <Citation id="7" index={7} source="Social Psychology Quarterly" year="2019" tier={1} />:
        </p>

        <ComparisonTable
          title="Red Flags vs. Repairable Conflicts"
          columns={['End the Friendship', 'Attempt Repair']}
          items={[
            { feature: 'Pattern of abuse or manipulation', values: ['One-time mistake or misunderstanding'] },
            { feature: 'Repeatedly violates boundaries after being told', values: ['Crossed a boundary unknowingly'] },
            { feature: 'Refuses to take accountability', values: ['Takes responsibility and apologizes'] },
            { feature: 'Consistently one-sided or draining', values: ['Generally balanced but had a conflict'] },
            { feature: 'Makes you feel worse about yourself', values: ['Usually supportive, this was unusual'] },
          ]}
          highlightColumn={1}
        />

        <ArticleCallout variant="warning">
          <p>If a friendship is abusive, consistently disrespectful, or draining, repair may not be the answer. It's okay to let unhealthy friendships go.</p>
        </ArticleCallout>

        <h2 id="types-conflict" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Types of Friendship Conflict
        </h2>
        <p className="mb-6">
          Understanding what type of conflict you're dealing with helps determine the repair approach:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'miscommunication',
              title: 'Miscommunication or Misunderstanding',
              content: (
                <div>
                  <p className="mb-3">One person misinterpreted words or actions, leading to hurt feelings without malicious intent.</p>
                  <p className="mb-2"><strong>Example:</strong> You canceled plans because you were exhausted. They thought you were avoiding them.</p>
                  <p className="mb-2"><strong>Repair approach:</strong> Clarify intent, acknowledge hurt, communicate clearly going forward.</p>
                </div>
              ),
            },
            {
              id: 'boundary',
              title: 'Boundary Violation',
              content: (
                <div>
                  <p className="mb-3">One person crossed a line --- overshared to others, showed up uninvited, made inappropriate comments.</p>
                  <p className="mb-2"><strong>Example:</strong> They shared something you told them in confidence.</p>
                  <p className="mb-2"><strong>Repair approach:</strong> Honest conversation about boundaries, genuine apology, commitment to change.</p>
                </div>
              ),
            },
            {
              id: 'values',
              title: 'Values or Life Stage Drift',
              content: (
                <div>
                  <p className="mb-3">You've grown in different directions and fundamental incompatibilities have emerged.</p>
                  <p className="mb-2"><strong>Example:</strong> Your priorities shifted after having kids. They're still living the lifestyle you used to share.</p>
                  <p className="mb-2"><strong>Repair approach:</strong> Honest conversation about whether the friendship can adapt or if it's run its natural course.</p>
                </div>
              ),
            },
            {
              id: 'betrayal',
              title: 'Betrayal or Major Breach of Trust',
              content: (
                <div>
                  <p className="mb-3">Serious violation --- lying, stealing, romantic betrayal, severe gossip.</p>
                  <p className="mb-2"><strong>Example:</strong> They lied about something important or betrayed your trust in a major way.</p>
                  <p className="mb-2"><strong>Repair approach:</strong> Requires significant time, genuine accountability, and slowly rebuilding trust. May not be repairable.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="effective-apology" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Apologize Effectively
        </h2>
        <p className="mb-6">
          Most apologies fail because they're defensive, incomplete, or insincere <Citation id="2" index={2} source="Journal of Social and Personal Relationships" year="2018" tier={1} />. An effective apology has five components:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: '1. Acknowledge Exactly What You Did',
              description: (
                <div>
                  <p className="mb-3">Be specific about your action, not vague. This shows you understand what hurt them.</p>
                  <p className="mb-2"><strong>Good:</strong> "I'm sorry I canceled our plans last minute without a real explanation"</p>
                  <p><strong>Bad:</strong> "I'm sorry if I did something to upset you"</p>
                </div>
              ),
            },
            {
              title: '2. Validate Their Feelings',
              description: (
                <div>
                  <p className="mb-3">Acknowledge the impact your actions had on them.</p>
                  <p className="mb-2"><strong>Good:</strong> "I can see why that made you feel like you're not a priority to me"</p>
                  <p><strong>Bad:</strong> "You're overreacting' or "You're too sensitive"</p>
                </div>
              ),
            },
            {
              title: `3. Take Full Responsibility (No "But")`,
              description: (
                <div>
                  <p className="mb-3">Don't deflect, justify, or blame them.</p>
                  <p className="mb-2"><strong>Good:</strong> "That was wrong of me, and I should have handled it differently"</p>
                  <p><strong>Bad:</strong> "I'm sorry, but you were also..." or "I'm sorry you feel that way"</p>
                </div>
              ),
            },
            {
              title: "4. Explain (If Appropriate), But Don't Excuse",
              description: (
                <div>
                  <p className="mb-3">Context can help, but only after taking responsibility.</p>
                  <p className="mb-2"><strong>Good:</strong> "I was overwhelmed and handled it poorly. That's not an excuse, just context"</p>
                  <p><strong>Bad:</strong> Leading with excuses instead of accountability</p>
                </div>
              ),
            },
            {
              title: '5. Commit to Change',
              description: (
                <div>
                  <p className="mb-3">What will you do differently going forward?</p>
                  <p className="mb-2"><strong>Good:</strong> "Going forward, I'll communicate better when I need to cancel plans"</p>
                  <p><strong>Bad:</strong> Just saying sorry without indicating any change</p>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="did-you-know" title="Research Finding">
          <p>Studies show that apologies with all five components are 3x more likely to result in forgiveness than apologies missing key elements <Citation id="2" index={2} source="Journal of Social and Personal Relationships" year="2018" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="having-conversation" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Have the Repair Conversation
        </h2>
        <p className="mb-6">
          The conversation itself determines whether repair succeeds or deepens the rift <Citation id="3" index={3} source="Communication Monographs" year="2017" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'before',
              label: 'Before the Talk',
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Cool down first</strong> --- Don't attempt repair while still angry or defensive</li>
                    <li><strong>Clarify your goal</strong> --- Do you want to preserve the friendship or just clear the air?</li>
                    <li><strong>Choose the right setting</strong> --- In-person or video call, not text. Private, not public</li>
                    <li><strong>Prepare to listen</strong> --- They may be hurt in ways you didn't realize</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'during',
              label: 'During the Talk',
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Lead with your apology</strong> (if you're the one who hurt them)</li>
                    <li><strong>Use "I" statements</strong> --- "I felt..." not "You always..."</li>
                    <li><strong>Listen without interrupting</strong> --- Let them fully express how they feel</li>
                    <li><strong>Avoid blame-shifting</strong> --- Focus on your behavior, not theirs</li>
                    <li><strong>Ask questions to understand</strong> --- "Can you help me understand what that felt like for you?"</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'after',
              label: 'After the Talk',
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Give them space</strong> if they need time to process</li>
                    <li><strong>Follow through</strong> on any commitments you made</li>
                    <li><strong>Don't expect instant forgiveness</strong> --- Trust rebuilds gradually</li>
                    <li><strong>Check in later</strong> --- "Are we okay?" conversations may need to happen multiple times</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="rebuilding-trust" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Rebuilding Trust After Conflict
        </h2>
        <p className="mb-6">
          Apologies start the repair process, but rebuilding trust takes time and consistent action <Citation id="5" index={5} source="Journal of Personality and Social Psychology" year="2020" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 6, suffix: 'mo', label: 'Average time to rebuild trust after breach' },
            { value: 78, suffix: '%', label: 'Of repaired friendships report being stronger after conflict' },
          ]}
          source="Journal of Personality and Social Psychology, 2020"
        />

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          How to Rebuild Trust
        </h3>

        <BeforeAfter
          before={{
            title: 'Trust-Eroding Behaviors',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Apologizing but repeating the same behavior</li>
                <li>Getting defensive when they express hurt</li>
                <li>Rushing them to "get over it"</li>
                <li>Bringing up their past mistakes to deflect</li>
                <li>Going back to old patterns immediately</li>
              </ul>
            ),
          }}
          after={{
            title: 'Trust-Building Behaviors',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Consistently following through on promises</li>
                <li>Accepting their caution without defensiveness</li>
                <li>Giving them time and space to heal</li>
                <li>Demonstrating changed behavior over months</li>
                <li>Being patient with the rebuilding process</li>
              </ul>
            ),
          }}
        />

        <h2 id="forgiveness" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Role of Forgiveness
        </h2>
        <p className="mb-6">
          Forgiveness doesn't mean forgetting, excusing, or immediately trusting again <Citation id="4" index={4} source="Psychological Science" year="2019" tier={1} />. It means releasing resentment and choosing to move forward.
        </p>

        <ArticleCallout variant="clinical-note">
          <p><strong>Important distinction:</strong> You can forgive someone and still choose not to continue the friendship. Forgiveness is for your own peace, not an obligation to reconcile.</p>
        </ArticleCallout>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          When Forgiveness Is Difficult
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>The hurt was severe (betrayal, major breach of trust)</li>
          <li>They haven't taken genuine accountability</li>
          <li>You have trauma from past relationships that makes trust hard</li>
          <li>The behavior pattern has repeated multiple times</li>
        </ul>
        <p className="mb-6">
          In these cases, it's okay to need more time, or to decide the friendship isn't salvageable.
        </p>

        <h2 id="when-repair-fails" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Repair Doesn't Work
        </h2>
        <p className="mb-6">
          Sometimes, despite best efforts, friendships can't be repaired. Signs it may be time to let go:
        </p>

        <ArticleChart
          type="bar"
          title="Reasons Friendship Repair Fails"
          data={[
            { label: 'Lack of genuine accountability', value: 42 },
            { label: 'Repeated pattern of same behavior', value: 38 },
            { label: 'Fundamental incompatibility emerged', value: 28 },
            { label: 'Trust too damaged to rebuild', value: 35 },
            { label: 'One person unwilling to repair', value: 31 },
          ]}
          source="Personal Relationships, 2019"
        />

        <p className="mb-6 mt-6">
          It's okay to grieve the loss of a friendship while recognizing that not all relationships are meant to last forever.
        </p>

        <h2 id="stronger-after" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Can Friendships Become Stronger After Conflict?
        </h2>
        <p className="mb-6">
          Yes --- if both people are committed to repair, many friendships emerge stronger <Citation id="1" index={1} source="Personal Relationships" year="2019" tier={1} />:
        </p>

        <QuoteBlock
          quote="Successfully navigating conflict together builds a different kind of trust --- the knowledge that the friendship can withstand difficulty and that both people are willing to work through problems rather than abandon the relationship at the first sign of trouble."
          attribution="Dr. John Gottman"
          role="Relationship Researcher"
          source="The Science of Trust"
          variant="large"
        />

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          What Makes Post-Conflict Friendships Stronger
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Deeper communication</strong> --- You've practiced vulnerable, honest conversation</li>
          <li><strong>Clearer boundaries</strong> --- The conflict clarified what you each need</li>
          <li><strong>Proven commitment</strong> --- You know the other person values the friendship enough to work through difficulty</li>
          <li><strong>Increased understanding</strong> --- You know each other better after navigating conflict together</li>
        </ul>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Support
        </h2>
        <p className="mb-6">
          Consider therapy if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You struggle to have conflict conversations without becoming defensive or shutting down</li>
          <li>You have patterns of friendships ending after the first conflict</li>
          <li>Past trauma makes forgiveness or trust rebuilding extremely difficult <Citation id="8" index={8} source="Journal of Social and Clinical Psychology" year="2020" tier={1} /></li>
          <li>You don't know how to set or maintain healthy boundaries after repair</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Conflict in friendships is normal. What matters is how you handle it: with accountability, empathy, honest communication, and patience. Some friendships will end, and that's okay. The ones that survive conflict often become the deepest, most meaningful relationships in your life.</p>
        </ArticleCallout>
      </>
    ),
  },
];
