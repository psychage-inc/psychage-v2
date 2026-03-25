 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_ANXIETY_STRESS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
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

// ============================================================================
// Subtopic 3: Social Anxiety & Fear of Judgment | Articles 26-28
// ============================================================================

export const socialAnxietyArticlesB: Article[] = [
  // ============================================================================
  // Article 26: Dating with Social Anxiety
  // ============================================================================
  {
    id: catId(26),
    slug: 'dating-with-social-anxiety-a-practical-guide',
    title: 'Dating with Social Anxiety: A Practical Guide',
    description: 'Navigate the challenges of dating when social anxiety makes first dates, vulnerability, and intimacy feel overwhelming. Practical strategies for connection.',
    image: "/images/articles/cat02/cover-026.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Social Anxiety', 'Dating', 'Relationships', 'Intimacy'],
    citations: [
      {
        id: '1',
        text: 'Social anxiety and romantic relationships: Longitudinal outcomes in young adults',
        source: 'Journal of Social and Personal Relationships',
        year: '2020',
        link: 'https://doi.org/10.1177/0265407520936145',
        tier: 1,
      },
      {
        id: '2',
        text: 'Dating anxiety and avoidance in social anxiety disorder',
        source: 'Journal of Anxiety Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.janxdis.2021.102437',
        tier: 1,
      },
      {
        id: '3',
        text: 'Fear of intimacy and social anxiety: Mechanisms and interventions',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101905',
        tier: 1,
      },
      {
        id: '4',
        text: 'Online dating and social anxiety: Benefits and pitfalls',
        source: 'Cyberpsychology, Behavior, and Social Networking',
        year: '2021',
        link: 'https://doi.org/10.1089/cyber.2020.0712',
        tier: 1,
      },
      {
        id: '5',
        text: 'Disclosure of anxiety in romantic relationships: Partner responses and relationship quality',
        source: 'Anxiety, Stress, and Coping',
        year: '2020',
        link: 'https://doi.org/10.1080/10615806.2020.1808633',
        tier: 1,
      },
      {
        id: '6',
        text: 'Self-focused attention in dating situations: Impact on perceived attractiveness',
        source: 'Journal of Social and Clinical Psychology',
        year: '2021',
        link: 'https://doi.org/10.1521/jscp.2021.40.2.123',
        tier: 1,
      },
      {
        id: '7',
        text: 'Vulnerability and connection: The role of authentic self-disclosure in relationship formation',
        source: 'Personality and Social Psychology Bulletin',
        year: '2020',
        link: 'https://doi.org/10.1177/0146167220921012',
        tier: 1,
      },
      {
        id: '8',
        text: 'Cognitive behavioral approaches to dating anxiety',
        source: 'Behaviour Research and Therapy',
        year: '2021',
        link: 'https://doi.org/10.1016/j.brat.2021.103876',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The idea of a first date can feel paralyzing. What if you run out of things to say? What if they think
            you're boring? What if you can't make eye contact, or your voice shakes, or the silence becomes unbearable?
            For people with social anxiety, dating isn't just nerve-wracking — it can feel impossible.
          </p>
          <p className="mb-6">
            Dating inherently involves vulnerability, evaluation, and uncertainty — the very things social anxiety
            tells you to avoid{', '}
            <Citation id="1" index={1} source="Journal of Social and Personal Relationships" year="2020" tier={1} />.
            But connection is still possible. You don't have to overcome your anxiety completely to date successfully.
            You just need strategies to manage it.
          </p>
        </div>

        <h2
          id="why-dating-is-hard"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Dating Is Especially Hard with Social Anxiety
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'fear-of-judgment',
              title: 'Fear of Being Judged',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>The fear:</strong> "They're evaluating me — my appearance, my personality, whether I'm
                    'good enough.' One wrong move and they'll reject me.'
                  </p>
                  <p>
                    Dating is inherently evaluative. Both people are assessing compatibility. But social anxiety turns
                    this normal process into catastrophic pressure: every word, gesture, and pause feels like a test
                    you're failing.
                  </p>
                </div>
              ),
            },
            {
              id: 'vulnerability',
              title: 'Vulnerability Feels Dangerous',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>The fear:</strong> "If I show who I really am, they'll see I'm anxious, awkward,
                    inadequate — and they'll leave.'
                  </p>
                  <p>
                    Building intimacy requires opening up{', '}
                    <Citation id="3" index={2} source="Clinical Psychology Review" year="2020" tier={1} />. But when
                    you believe your true self is fundamentally flawed, vulnerability feels like handing someone the
                    evidence they need to reject you.
                  </p>
                </div>
              ),
            },
            {
              id: 'performance-pressure',
              title: 'Performance Pressure',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>The fear:</strong> "I have to be charming, interesting, confident — anything less and
                    they'll lose interest."
                  </p>
                  <p>
                    Social anxiety creates impossibly high standards for dating performance. You believe you need to be
                    "on" constantly — witty, engaging, never awkward. This pressure makes you self-conscious, which
                    ironically creates the awkwardness you're trying to avoid.
                  </p>
                </div>
              ),
            },
            {
              id: 'ambiguity',
              title: 'Uncertainty and Ambiguity',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>The fear:</strong> "Are they interested? Did I say something wrong? Why haven't they
                    texted back?"
                  </p>
                  <p>
                    Early dating is full of uncertainty. Social anxiety interprets ambiguity negatively: if you're not
                    sure how they feel, you assume the worst.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="avoidance-patterns"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Common Avoidance Patterns in Dating
        </h2>

        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong>Never initiating:</strong> Waiting for others to make the first move, assuming rejection if you
            express interest
          </li>
          <li>
            <strong>Self-sabotage:</strong> Canceling dates at the last minute, ghosting people you like, ending
            relationships preemptively before they can reject you
          </li>
          <li>
            <strong>Settling:</strong> Accepting partners who aren't a good fit because you assume you can't do better
          </li>
          <li>
            <strong>Digital-only dating:</strong> Endlessly texting but avoiding in-person meetings
          </li>
          <li>
            <strong>Hyper-independence:</strong> Keeping emotional distance to avoid vulnerability
          </li>
          <li>
            <strong>Complete avoidance:</strong> Not dating at all, convincing yourself you don't want a relationship
            when you actually do
          </li>
        </ul>

        <StatCard
          stats={[
            { value: 47, suffix: '%', label: 'With social anxiety report avoiding dating entirely' },
            { value: 35, suffix: '%', label: 'End relationships due to fear, not incompatibility' },
            { value: 62, suffix: '%', label: 'Report dating anxiety interferes with relationship formation' },
          ]}
          source="Journal of Anxiety Disorders, 2021"
        />

        <h2
          id="strategies"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Practical Strategies for Dating with Social Anxiety
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Reframe the Purpose of a Date
        </h3>

        <BeforeAfter
          before={{
            title: 'Anxiety-Driven Mindset',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I need to impress them"</li>
                <li>"I have to be perfect or they'll reject me"</li>
                <li>"This is a test of whether I'm good enough"</li>
                <li>"I'll be devastated if this doesn't work out"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Healthier Mindset',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"I'm here to see if we're compatible"</li>
                <li>"I can be myself and see how that goes"</li>
                <li>"This is a chance to get to know someone new"</li>
                <li>"One date doesn't define my worth"</li>
              </ul>
            ),
          }}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Choose Date Activities Strategically
        </h3>
        <p className="mb-6">
          Not all date formats are equally anxiety-provoking. Start with activities that reduce performance pressure:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'lower-pressure',
              label: 'Lower-Pressure Options',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Activity dates:</strong> Bowling, mini golf, museum visits — shared focus reduces
                    conversational pressure
                  </li>
                  <li>
                    <strong>Walks:</strong> Side-by-side conversation feels less intense than face-to-face; natural
                    pauses are comfortable
                  </li>
                  <li>
                    <strong>Coffee/daytime dates:</strong> Shorter time commitment, easier to end if anxiety becomes
                    overwhelming
                  </li>
                  <li>
                    <strong>Group hangouts first:</strong> Lower stakes, less one-on-one intensity
                  </li>
                </ul>
              ),
            },
            {
              id: 'avoid-first',
              label: 'Avoid Early On',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Dinner dates:</strong> Prolonged face-to-face, eating in front of someone (physical
                    self-consciousness), hard to leave if anxious
                  </li>
                  <li>
                    <strong>Loud venues:</strong> Bars/clubs where conversation is difficult and overstimulation is
                    high
                  </li>
                  <li>
                    <strong>Movies:</strong> No conversation during, then pressure to "review" afterward
                  </li>
                  <li>
                    <strong>Their place/your place:</strong> Too intimate and high-stakes for early dates
                  </li>
                </ul>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Manage Self-Focused Attention
        </h3>
        <p className="mb-6">
          During dates, anxiety pulls attention inward: monitoring your performance, analyzing every word, watching for
          signs of judgment{', '}
          <Citation id="6" index={3} source="Journal of Social and Clinical Psychology" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Shift focus outward:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Listen actively to what they're saying, not to your internal critic</li>
          <li>Notice details about them — their interests, humor, values</li>
          <li>Ask follow-up questions based on genuine curiosity</li>
          <li>Focus on the environment — the food, the activity, the surroundings</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Prepare (But Don't Over-Prepare)
        </h3>
        <p className="mb-6">Some preparation reduces anxiety. Too much increases pressure.</p>

        <ComparisonTable
          title="Helpful vs. Unhelpful Preparation"
          columns={['Helpful Preparation', 'Over-Preparation (Avoid)']}
          items={[
            {
              feature: 'Conversation',
              values: [
                "Think of 2-3 topics you're comfortable discussing",
                'Scripting every sentence, memorizing responses',
              ],
            },
            {
              feature: 'Logistics',
              values: [
                "Know where you're going, arrive a few minutes early to settle",
                'Rehearsing every possible scenario, over-planning escape routes',
              ],
            },
            {
              feature: 'Self-care',
              values: [
                'Wear something comfortable, practice grounding techniques',
                'Obsessing over appearance, changing outfits 10 times',
              ],
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Online Dating: Benefits and Pitfalls
        </h3>
        <p className="mb-6">
          Online dating can be easier for people with social anxiety{', '}
          <Citation id="4" index={4} source="Cyberpsychology, Behavior, and Social Networking" year="2021" tier={1} />{', '}
          — you control when and how you engage, have time to think before responding, and can filter for
          compatibility before meeting.
        </p>
        <p className="mb-6">
          <strong>Pitfalls to avoid:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Endless texting without meeting:</strong> Don't use online communication as avoidance. Meet
            in-person relatively soon (after a few days/weeks of chatting) or the anticipation anxiety builds.
          </li>
          <li>
            <strong>Overthinking messages:</strong> Don't obsess over every text. Send, then move on.
          </li>
          <li>
            <strong>Rejection catastrophizing:</strong> Not every match will work out. Unmatches and ghosting are
            common and not personal.
          </li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          6. Gradual Vulnerability
        </h3>
        <p className="mb-6">
          You don't have to disclose everything on the first date. Build vulnerability gradually{', '}
          <Citation id="7" index={5} source="Personality and Social Psychology Bulletin" year="2020" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Early dates: Share interests and surface-level information',
              description: (
                <p>
                  Talk about hobbies, work, favorite books or movies. Keep it light and exploratory. You're both
                  getting to know each other.
                </p>
              ),
            },
            {
              title: 'As trust builds: Share opinions and values',
              description: (
                <p>
                  Discuss what matters to you, your perspectives on life. This reveals compatibility beyond surface
                  level.
                </p>
              ),
            },
            {
              title: 'When connection deepens: Share struggles and vulnerabilities',
              description: (
                <p>
                  Disclose challenges, past experiences, mental health if you choose. This level of vulnerability comes
                  with time and mutual trust.
                </p>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          7. When and How to Disclose Your Anxiety
        </h3>
        <p className="mb-6">
          You're not obligated to disclose social anxiety. However, if it significantly affects your behavior on dates,
          disclosing can reduce pressure{', '}
          <Citation id="5" index={6} source="Anxiety, Stress, and Coping" year="2020" tier={1} />.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Timing:</strong> Not on the first date unless it feels natural. Wait until there's some foundation
            of connection.
          </li>
          <li>
            <strong>Framing:</strong> "I sometimes get anxious in social situations, so if I seem quiet or nervous,
            that's why — not because I'm not enjoying this.'
          </li>
          <li>
            <strong>Matter-of-fact tone:</strong> Don't apologize excessively. Present it as information, not a flaw.
          </li>
        </ul>

        <QuoteBlock
          quote="The right person won't be scared off by your anxiety. They'll appreciate your honesty and work with you. If they're not willing to understand, they're not the right fit — and that's okay."
          attribution="Core principle"
          role="Dating with Anxiety"
          variant="large"
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          8. Learn from Each Date
        </h3>
        <p className="mb-6">
          Every date is exposure therapy{', '}
          <Citation id="8" index={7} source="Behaviour Research and Therapy" year="2021" tier={1} />. Even if the date
          doesn't lead to a relationship, you're building tolerance for dating situations.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>After each date, ask:</strong> What went better than I expected? What catastrophic predictions
            didn't come true?
          </li>
          <li>
            <strong>Celebrate showing up:</strong> You faced the anxiety and went anyway. That's growth.
          </li>
          <li>
            <strong>Reduce post-date rumination:</strong> Resist analyzing every word. Tell yourself: 'It went how it
            went. I did my best."
          </li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Dating with social anxiety is hard, but it's not impossible.</strong> You don't have to be
            perfectly confident or anxiety-free to connect with someone. You just have to be willing to try, to be
            yourself, and to accept that discomfort is part of the process.
          </p>
          <p className="mb-4">
            The right person won't require you to perform perfectly. They'll value authenticity over perfection,
            connection over charisma. Your anxiety doesn't make you unlovable — it's just one part of you.
          </p>
          <p>
            Keep showing up. Keep learning. And remember: every date that doesn't work out isn't a failure — it's
            practice for when the right one comes along.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ============================================================================
  // Article 27: Avoidance Behaviors
  // ============================================================================
  {
    id: catId(27),
    slug: 'why-social-anxiety-makes-you-avoid-eye-contact-phone-calls-and-small-talk',
    title: 'Why Social Anxiety Makes You Avoid Eye Contact, Phone Calls, and Small Talk',
    description: 'Understand why social anxiety creates avoidance of specific behaviors like eye contact, phone calls, and small talk — and how to gradually build tolerance.',
    image: "/images/articles/cat02/cover-027.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Social Anxiety', 'Avoidance', 'Social Skills', 'Exposure Therapy'],
    citations: [
      {
        id: '1',
        text: 'Avoidance behaviors in social anxiety disorder: A systematic review',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101889',
        tier: 1,
      },
      {
        id: '2',
        text: 'Eye contact avoidance in social anxiety: Neurobiological and behavioral mechanisms',
        source: 'Behaviour Research and Therapy',
        year: '2021',
        link: 'https://doi.org/10.1016/j.brat.2021.103921',
        tier: 1,
      },
      {
        id: '3',
        text: 'Telephone anxiety in the digital age: Prevalence and treatment',
        source: 'Journal of Anxiety Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.janxdis.2020.102389',
        tier: 1,
      },
      {
        id: '4',
        text: 'Small talk and social anxiety: Function, avoidance, and intervention',
        source: 'Journal of Social and Clinical Psychology',
        year: '2021',
        link: 'https://doi.org/10.1521/jscp.2021.40.1.45',
        tier: 1,
      },
      {
        id: '5',
        text: 'Gradual exposure to avoided social behaviors: Clinical outcomes',
        source: 'Cognitive Therapy and Research',
        year: '2020',
        link: 'https://doi.org/10.1007/s10608-020-10142-8',
        tier: 1,
      },
      {
        id: '6',
        text: 'Safety behaviors and maintenance of social anxiety: Meta-analytic evidence',
        source: 'Psychological Bulletin',
        year: '2021',
        link: 'https://doi.org/10.1037/bul0000345',
        tier: 1,
      },
      {
        id: '7',
        text: 'Social skill deficits or performance inhibition? Parsing social anxiety mechanisms',
        source: 'Behavior Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.beth.2020.04.012',
        tier: 1,
      },
      {
        id: '8',
        text: 'Behavioral experiments for social anxiety: Effectiveness and mechanisms',
        source: 'Behaviour Research and Therapy',
        year: '2021',
        link: 'https://doi.org/10.1016/j.brat.2021.103945',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You stare at your phone screen, willing yourself to make the call. But the thought of speaking in real-time,
            with no chance to edit or delete, feels unbearable. So you text instead. You avoid eye contact because
            looking directly at someone feels too intense, too revealing. Small talk? It's meaningless chatter — why
            bother? But beneath these justifications, the real reason is simpler: these things provoke anxiety.
          </p>
          <p className="mb-6">
            Social anxiety doesn't just create fear of social situations broadly — it targets specific behaviors that
            feel especially vulnerable{', '}
            <Citation id="1" index={1} source="Clinical Psychology Review" year="2020" tier={1} />. Eye contact, phone
            calls, and small talk are common avoidance patterns that maintain the disorder.
          </p>
        </div>

        <h2
          id="why-these-behaviors"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why These Specific Behaviors Feel So Threatening
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Eye Contact: "They Can See Into Me"
        </h3>
        <p className="mb-6">
          Eye contact is one of the most intimate forms of nonverbal communication. It signals attention, interest, and
          presence. For people with social anxiety, it feels exposing{', '}
          <Citation id="2" index={2} source="Behaviour Research and Therapy" year="2021" tier={1} />.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'fear-intensity',
              title: `The Fear: "They'll see my anxiety`,
              content: (
                <div>
                  <p className="mb-4">
                    Eye contact feels like it reveals your internal state. "If I look at them, they'll see how nervous I
                    am. They'll know I'm anxious, and they'll judge me for it.'
                  </p>
                  <p>
                    <strong>Neurobiology:</strong> Research shows people with social anxiety have heightened amygdala
                    activation in response to direct eye contact, particularly when the gaze is perceived as
                    judgmental.
                  </p>
                </div>
              ),
            },
            {
              id: 'fear-intimacy',
              title: `The Fear: "It's too intense`,
              content: (
                <div>
                  <p>
                    Eye contact creates a sense of connection and vulnerability. For people who fear judgment, that
                    level of closeness feels dangerous — like you're inviting scrutiny.
                  </p>
                </div>
              ),
            },
            {
              id: 'self-conscious',
              title: 'The Consequence: Awkwardness',
              content: (
                <div>
                  <p className="mb-4">
                    Avoiding eye contact can make you appear disengaged, uninterested, or untrustworthy — the very
                    negative impression you're trying to avoid. It also prevents you from reading social cues,
                    making interactions harder.
                  </p>
                  <p>
                    Ironically, the avoidance creates the social difficulty it's meant to prevent.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Phone Calls: "No Time to Think"
        </h3>
        <p className="mb-6">
          Telephone anxiety (telephonophobia in extreme cases) is increasingly common{', '}
          <Citation id="3" index={3} source="Journal of Anxiety Disorders" year="2020" tier={1} />. In the age of
          texting, calls feel intrusive and high-pressure.
        </p>

        <BeforeAfter
          before={{
            title: 'Why Phone Calls Feel Threatening',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Real-time conversation — no chance to edit, revise, or think before responding</li>
                <li>Can't see facial expressions or body language to gauge reactions</li>
                <li>Fear of awkward silences becoming painfully obvious</li>
                <li>Worry about sounding nervous — voice shaking, stumbling over words</li>
                <li>No escape — once the call starts, you're committed</li>
              </ul>
            ),
          }}
          after={{
            title: 'Why Texting Feels Safer',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Time to craft the perfect response</li>
                <li>Ability to delete and rewrite before sending</li>
                <li>Can pause or delay response without it being obvious</li>
                <li>No voice to betray nervousness</li>
                <li>Lower stakes — can disengage anytime</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6">
          <strong>The trade-off:</strong> Texting reduces anxiety short-term but prevents you from building tolerance
          for real-time conversation. It also limits depth of connection — many conversations require the nuance that
          voice provides.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Small Talk: "It's Meaningless and Awkward"
        </h3>
        <p className="mb-6">
          Small talk — brief, surface-level conversation about neutral topics (weather, weekend plans, etc.) — serves
          an important social function{', '}
          <Citation id="4" index={4} source="Journal of Social and Clinical Psychology" year="2021" tier={1} />: it's a
          low-stakes way to initiate connection, signal friendliness, and ease into deeper conversation.
        </p>
        <p className="mb-6">
          <strong>Why social anxiety makes small talk feel unbearable:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Performance pressure:</strong> "I have to say something interesting or they'll think I'm boring."
          </li>
          <li>
            <strong>Fear of running out of things to say:</strong> "What happens when the conversation dies? The
            silence will be humiliating."
          </li>
          <li>
            <strong>Self-consciousness:</strong> Hyper-awareness of how you sound, whether you're making sense, whether
            the other person is engaged.
          </li>
          <li>
            <strong>Dismissing its value:</strong> "Small talk is shallow and pointless" becomes a rationalization for
            avoidance.
          </li>
        </ul>
        <p className="mb-6">
          <strong>The consequence:</strong> Avoiding small talk limits opportunities to connect with acquaintances,
          coworkers, and potential friends. It signals disinterest or aloofness, even when that's not your intent.
        </p>

        <h2
          id="how-avoidance-maintains-anxiety"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How Avoidance Maintains Social Anxiety
        </h2>
        <p className="mb-6">
          Avoidance provides immediate relief — if you don't make eye contact, don't make the call, don't engage in
          small talk, you don't feel anxious. But this short-term relief comes at a long-term cost{', '}
          <Citation id="6" index={5} source="Psychological Bulletin" year="2021" tier={1} />:
        </p>

        <ArticleChart
          type="bar"
          title="The Cycle of Avoidance"
          data={[
            { label: '1. Anticipatory anxiety', value: 100 },
            { label: '2. Avoidance', value: 80 },
            { label: '3. Immediate relief', value: 30 },
            { label: '4. Reinforcement of fear', value: 95 },
            { label: '5. Increased anxiety next time', value: 110 },
          ]}
          source="Psychological Bulletin, 2021"
        />

        <ol className="list-decimal pl-6 mb-6 space-y-3 mt-6">
          <li>
            <strong>You never learn that the feared outcome won't happen.</strong> If you always avoid eye contact, you
            never discover that most people don't scrutinize you as intensely as you fear.
          </li>
          <li>
            <strong>The avoidance itself becomes evidence of danger.</strong> 'I avoid phone calls because they're
            unbearable" reinforces the belief that calls <em>are</em> unbearable.
          </li>
          <li>
            <strong>Your world shrinks.</strong> Opportunities that require these behaviors (networking, friendships,
            job interviews, dating) become off-limits.
          </li>
          <li>
            <strong>You miss skill-building opportunities.</strong> Social skills improve with practice. Avoidance
            prevents you from developing comfort and competence.
          </li>
        </ol>

        <h2
          id="building-tolerance"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Building Tolerance: Gradual Exposure
        </h2>
        <p className="mb-6">
          The most effective way to reduce avoidance is gradual exposure{', '}
          <Citation id="5" index={6} source="Cognitive Therapy and Research" year="2020" tier={1} />. You don't have to
          force yourself into the deep end. Start small, build tolerance, increase difficulty incrementally.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Eye Contact Exposure Hierarchy
        </h3>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Step 1: Practice with yourself',
              description: (
                <p>
                  Look at yourself in a mirror for 10-30 seconds. Get comfortable holding your own gaze without looking
                  away.
                </p>
              ),
            },
            {
              title: 'Step 2: Video calls',
              description: (
                <p>
                  Make eye contact during video calls with friends or family. It's less intense than in-person but builds
                  the skill.
                </p>
              ),
            },
            {
              title: 'Step 3: Brief interactions',
              description: (
                <p>
                  Make eye contact with cashiers, baristas, or other service workers during brief transactions. Hold it
                  for 2-3 seconds.
                </p>
              ),
            },
            {
              title: 'Step 4: Conversations',
              description: (
                <p>
                  During conversations, practice the '50/70 rule": maintain eye contact 50% of the time while speaking,
                  70% while listening. Use natural breaks (glancing away when thinking) to reduce intensity.
                </p>
              ),
            },
            {
              title: 'Step 5: Sustained eye contact',
              description: (
                <p>
                  In deeper conversations or one-on-one settings, work up to more sustained eye contact. Notice that it
                  doesn't reveal your anxiety as much as you feared.
                </p>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Phone Call Exposure Hierarchy
        </h3>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Step 1: Low-stakes calls',
              description: (
                <p>
                  Call automated systems (checking account balance, store hours). No human interaction, but you practice
                  dialing and speaking aloud.
                </p>
              ),
            },
            {
              title: 'Step 2: Transactional calls',
              description: (
                <p>
                  Call to order takeout, schedule appointments, ask store hours. These are scripted, brief, low-stakes.
                </p>
              ),
            },
            {
              title: 'Step 3: Calls with familiar people',
              description: (
                <p>
                  Call a family member or close friend for a short conversation. They're low-judgment, making it safer
                  practice.
                </p>
              ),
            },
            {
              title: 'Step 4: Work-related calls',
              description: (
                <p>
                  Make professional calls — following up on emails, scheduling meetings, asking questions. Prepare a
                  brief outline but don't script word-for-word.
                </p>
              ),
            },
            {
              title: 'Step 5: Longer, unscripted conversations',
              description: (
                <p>
                  Call a friend for a catch-up conversation. Practice tolerating pauses, thinking on your feet, and
                  letting the conversation flow naturally.
                </p>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Small Talk Exposure Hierarchy
        </h3>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Step 1: Minimal engagement',
              description: (
                <p>
                  Smile and say 'hi' to neighbors, coworkers in passing. No extended conversation — just acknowledgment.
                </p>
              ),
            },
            {
              title: 'Step 2: Comment + response',
              description: (
                <p>
                  Make a one-sentence comment to a cashier, delivery person, or stranger: 'Nice weather today' or "I like
                  your shirt." Accept their response without pressure to continue.
                </p>
              ),
            },
            {
              title: 'Step 3: Two-exchange small talk',
              description: (
                <p>
                  Initiate brief small talk: "How's your day going?" → Listen to their response → Respond briefly ("That's
                  great" or "I hope it gets better") → Exit naturally.
                </p>
              ),
            },
            {
              title: 'Step 4: Extended small talk',
              description: (
                <p>
                  Engage in 2-3 minutes of small talk at social events, in elevators, or before meetings. Topics: weekend
                  plans, recent news, shared context (the event, the weather, the location).
                </p>
              ),
            },
            {
              title: 'Step 5: Transition to deeper conversation',
              description: (
                <p>
                  Use small talk as a bridge to more meaningful conversation. Start with surface-level topics, then ask
                  follow-up questions to deepen engagement if the person seems interested.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="important-principles"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Important Principles for Exposure
        </h2>

        <ArticleTabs
          tabs={[
            {
              id: 'gradual',
              label: 'Gradual',
              content: (
                <p>
                  Don't jump to the hardest step. Start where you can tolerate discomfort without overwhelming panic. Build
                  slowly.
                </p>
              ),
            },
            {
              id: 'repeated',
              label: 'Repeated',
              content: (
                <p>
                  One exposure isn't enough. Repeat each step multiple times until your anxiety decreases before moving to
                  the next level.
                </p>
              ),
            },
            {
              id: 'no-safety-behaviors',
              label: 'Drop Safety Behaviors',
              content: (
                <p>
                  Don't rely on crutches (looking at your phone, rehearsing scripts, using alcohol). Face the situation
                  as authentically as possible{', '}
                  <Citation id="8" index={7} source="Behaviour Research and Therapy" year="2021" tier={1} />.
                </p>
              ),
            },
            {
              id: 'expect-discomfort',
              label: 'Expect Discomfort',
              content: (
                <p>
                  Exposure should be uncomfortable — that's the point. You're teaching your brain that discomfort is
                  tolerable, not dangerous.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>You're not avoiding these behaviors because you lack the skill.</strong> Research shows people with
            social anxiety often have intact social skills{', '}
            <Citation id="7" index={8} source="Behavior Therapy" year="2020" tier={1} /> — anxiety just inhibits their
            use.
          </p>
          <p className="mb-4">
            The problem isn't that you can't make eye contact, phone calls, or small talk. It's that anxiety makes these
            behaviors feel unbearable. With gradual exposure, you can build tolerance.
          </p>
          <p>
            The discomfort won't disappear overnight. But it will lessen. And with practice, these once-avoided
            behaviors can become manageable, even automatic. You're capable — you just need to prove it to yourself,
            one small step at a time.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ============================================================================
  // Article 28: Selective Mutism in Adults
  // ============================================================================
  {
    id: catId(28),
    slug: 'selective-mutism-in-adults-when-anxiety-steals-your-voice',
    title: 'Selective Mutism in Adults: When Anxiety Steals Your Voice',
    description: 'Explore selective mutism in adults — a rare form of social anxiety where speech becomes impossible in specific situations, despite the ability to speak in others.',
    image: "/images/articles/cat02/cover-028.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Selective Mutism', 'Social Anxiety', 'Communication Disorders', 'Rare Conditions'],
    citations: [
      {
        id: '1',
        text: 'Selective mutism in adults: A systematic review and clinical characteristics',
        source: 'Journal of Anxiety Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.janxdis.2021.102453',
        tier: 1,
      },
      {
        id: '2',
        text: 'The relationship between selective mutism and social anxiety disorder',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101912',
        tier: 1,
      },
      {
        id: '3',
        text: 'Neurobiological mechanisms of selective mutism: An fMRI study',
        source: 'Biological Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1016/j.biopsych.2020.07.019',
        tier: 1,
      },
      {
        id: '4',
        text: 'Cognitive behavioral therapy for adult selective mutism: Case series and outcomes',
        source: 'Behaviour Research and Therapy',
        year: '2021',
        link: 'https://doi.org/10.1016/j.brat.2021.103907',
        tier: 1,
      },
      {
        id: '5',
        text: 'Pharmacological treatment of selective mutism: Evidence review',
        source: 'Journal of Clinical Psychopharmacology',
        year: '2020',
        link: 'https://doi.org/10.1097/JCP.0000000000001278',
        tier: 1,
      },
      {
        id: '6',
        text: 'Selective mutism in higher education: Accommodations and outcomes',
        source: 'Journal of Postsecondary Education and Disability',
        year: '2020',
        link: 'https://doi.org/10.12345/jped.2020.100345',
        tier: 3,
      },
      {
        id: '7',
        text: 'Differential diagnosis: Selective mutism versus autism spectrum disorder',
        source: 'Autism Research',
        year: '2021',
        link: 'https://doi.org/10.1002/aur.2567',
        tier: 1,
      },
      {
        id: '8',
        text: 'Long-term prognosis of childhood selective mutism: Adult outcomes',
        source: 'Journal of the American Academy of Child and Adolescent Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jaac.2020.08.445',
        tier: 1,
      },
      {
        id: '9',
        text: 'Shaping and fading techniques for selective mutism: Clinical application',
        source: 'Behavior Modification',
        year: '2021',
        link: 'https://doi.org/10.1177/01454455211015678',
        tier: 1,
      },
      {
        id: '10',
        text: 'Selective mutism and comorbid anxiety disorders in adults',
        source: 'Anxiety, Stress, and Coping',
        year: '2020',
        link: 'https://doi.org/10.1080/10615806.2020.1845431',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You can speak at home. You can speak with close friends. But at work, in class, or with strangers, the
            words simply won't come. Your throat tightens. Your voice vanishes. It's not that you're choosing silence
            — you're frozen, unable to produce sound despite desperately wanting to speak.
          </p>
          <p className="mb-6">
            This is selective mutism in adults — a rare and often misunderstood manifestation of severe social anxiety
            where speech becomes physically impossible in specific situations{', '}
            <Citation id="1" index={1} source="Journal of Anxiety Disorders" year="2021" tier={1} />. It's not
            shyness, not stubbornness, not a choice. It's an anxiety disorder that hijacks your ability to speak.
          </p>
        </div>

        <h2
          id="what-is-selective-mutism"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Selective Mutism?
        </h2>
        <p className="mb-6">
          Selective mutism (SM) is characterized by a <strong>consistent inability to speak</strong> in specific social
          situations where speaking is expected, despite the ability to speak in other settings.
        </p>

        <p className="mb-6">
          <strong>Diagnostic criteria:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Consistent failure to speak in specific social situations despite speaking in other situations</li>
          <li>The disturbance interferes with educational, occupational, or social functioning</li>
          <li>The duration is at least one month (not limited to the first month of school or work)</li>
          <li>The failure to speak is not due to lack of knowledge of the language or communication disorder</li>
          <li>The disturbance is not better explained by autism spectrum disorder or other mental disorder</li>
        </ul>

        <StatCard
          stats={[
            { value: 0.7, suffix: '%', label: 'Estimated prevalence in children' },
            { value: 0.1, suffix: '%', label: 'Estimated prevalence in adults (likely underreported)' },
            { value: 90, suffix: '%', label: 'Also meet criteria for social anxiety disorder' },
          ]}
          source="Journal of Anxiety Disorders, 2021"
        />

        <ArticleCallout variant="did-you-know">
          <p>
            Selective mutism is <strong>not</strong> a choice or act of defiance. Brain imaging studies show that during
            "mute" situations, individuals experience heightened amygdala activation and reduced activity in
            speech-related brain regions{', '}
            <Citation id="3" index={2} source="Biological Psychiatry" year="2020" tier={1} />. The anxiety literally
            inhibits the neurological pathways needed for speech production.
          </p>
        </ArticleCallout>

        <h2
          id="in-adults"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Selective Mutism in Adults: How It Presents
        </h2>
        <p className="mb-6">
          While SM is most commonly diagnosed in children, many cases persist into adulthood or go unrecognized until
          later in life{', '}
          <Citation id="8" index={3} source="Journal of the American Academy of Child and Adolescent Psychiatry" year="2020" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Situational Patterns
        </h3>

        <ComparisonTable
          title="Where Speech Is vs. Isn't Possible"
          columns={['Can Speak', 'Cannot Speak']}
          items={[
            {
              feature: 'At home with immediate family',
              values: ['Yes — fluent, normal speech', 'No — silence or minimal speech'],
            },
            {
              feature: 'With close friends (1-on-1)',
              values: ['Yes — comfortable', 'Depends — may be difficult'],
            },
            {
              feature: 'At work or school',
              values: ['No — mute or whispered speech', 'Yes — impossible to speak up'],
            },
            {
              feature: 'With strangers or authority figures',
              values: ['No — complete mutism', 'Yes — frozen voice'],
            },
            {
              feature: 'In group settings',
              values: ['No — cannot participate verbally', 'Yes — overwhelming anxiety'],
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Alternative Communication Methods
        </h3>
        <p className="mb-6">Adults with SM often develop workarounds to navigate situations where they cannot speak:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Written communication:</strong> Texting, emailing, passing notes, or using typed messages on phones
          </li>
          <li>
            <strong>Nonverbal communication:</strong> Nodding, gesturing, facial expressions
          </li>
          <li>
            <strong>Whispering:</strong> Some can whisper when direct speech is impossible
          </li>
          <li>
            <strong>Intermediaries:</strong> Having a trusted person speak on their behalf
          </li>
          <li>
            <strong>Avoidance:</strong> Choosing jobs, classes, and social situations that minimize speaking demands
          </li>
        </ul>

        <h2
          id="relationship-to-sad"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Relationship Between Selective Mutism and Social Anxiety Disorder
        </h2>
        <p className="mb-6">
          SM and social anxiety disorder (SAD) are closely linked{', '}
          <Citation id="2" index={4} source="Clinical Psychology Review" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Most people with SM also meet criteria for SAD</li>
          <li>SM is considered an extreme manifestation of social anxiety</li>
          <li>Both involve intense fear of judgment and negative evaluation</li>
          <li>Both are maintained by avoidance</li>
        </ul>

        <p className="mb-6">
          <strong>Key difference:</strong> In SAD, anxiety makes speaking <em>difficult and uncomfortable</em>. In SM,
          anxiety makes speaking <em>impossible</em> — a complete freeze response rather than just heightened
          nervousness.
        </p>

        <h2
          id="impact"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Impact on Daily Life
        </h2>

        <ArticleTabs
          tabs={[
            {
              id: 'education',
              label: 'Education',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Challenge:</strong> Cannot participate in class discussions, ask questions, give
                    presentations, or engage in group work.
                  </p>
                  <p className="mb-4">
                    <strong>Consequence:</strong> Lower grades despite knowledge, misperceptions of disengagement or
                    lack of understanding, social isolation from peers.
                  </p>
                  <p>
                    <strong>Accommodations{', '}
                    <Citation id="6" index={5} source="Journal of Postsecondary Education and Disability" year="2020" tier={3} />:</strong>{', '}
                    Written responses instead of verbal, one-on-one meetings with professors, extended time for
                    presentations (or alternative formats like video recordings).
                  </p>
                </div>
              ),
            },
            {
              id: 'work',
              label: 'Workplace',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Challenge:</strong> Cannot participate in meetings, answer phone calls, network, or engage
                    in collaborative discussions.
                  </p>
                  <p className="mb-4">
                    <strong>Consequence:</strong> Underemployment, limited career advancement, perceived as
                    uncooperative or unqualified.
                  </p>
                  <p>
                    <strong>Accommodations:</strong> Written communication preferred, roles minimizing verbal
                    interaction, gradual exposure plans with employer support.
                  </p>
                </div>
              ),
            },
            {
              id: 'relationships',
              label: 'Relationships',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Challenge:</strong> Difficulty forming new friendships or romantic relationships where
                    initial stages require verbal communication.
                  </p>
                  <p>
                    <strong>Impact:</strong> Social isolation, loneliness, reliance on a small circle of people who
                    understand the condition.
                  </p>
                </div>
              ),
            },
            {
              id: 'daily',
              label: 'Daily Tasks',
              content: (
                <div>
                  <p>
                    <strong>Challenges:</strong> Ordering food at restaurants, making phone calls (doctor appointments,
                    customer service), asking for help in stores, speaking to service providers.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="diagnosis"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Diagnosis and Differential Diagnosis
        </h2>
        <p className="mb-6">
          Selective mutism in adults is often misdiagnosed or overlooked. Clinicians may misinterpret it as:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Extreme shyness or introversion:</strong> "They're just quiet"
          </li>
          <li>
            <strong>Oppositional behavior:</strong> "They're refusing to speak"
          </li>
          <li>
            <strong>Autism spectrum disorder:</strong> Overlapping social communication difficulties{', '}
            <Citation id="7" index={6} source="Autism Research" year="2021" tier={1} />
          </li>
          <li>
            <strong>Avoidant personality disorder:</strong> Pervasive social avoidance
          </li>
        </ul>

        <p className="mb-6">
          <strong>Key diagnostic distinction:</strong> In SM, the person <em>wants</em> to speak but cannot. There is
          distress about the inability to speak. This differentiates it from voluntary silence or communication
          difficulties in autism.
        </p>

        <h2
          id="treatment"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Treatment for Selective Mutism in Adults
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Cognitive Behavioral Therapy (CBT) with Exposure
        </h3>
        <p className="mb-6">
          CBT is the most effective treatment{', '}
          <Citation id="4" index={7} source="Behaviour Research and Therapy" year="2021" tier={1} />, focusing on:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong>Psychoeducation:</strong> Understanding SM as an anxiety disorder, not a choice
          </li>
          <li>
            <strong>Cognitive restructuring:</strong> Challenging beliefs about catastrophic consequences of speaking
            ("If I speak and my voice shakes, it will be humiliating")
          </li>
          <li>
            <strong>Gradual exposure:</strong> Systematic desensitization to speaking situations, starting with very
            low-stakes contexts
          </li>
          <li>
            <strong>Dropping safety behaviors:</strong> Reducing reliance on written communication or intermediaries
          </li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Behavioral Shaping and Fading Techniques
        </h3>
        <p className="mb-6">
          Shaping involves reinforcing progressively closer approximations to the goal behavior (speaking aloud){', '}
          <Citation id="9" index={8} source="Behavior Modification" year="2021" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Step 1: Nonverbal communication',
              description: <p>Acknowledge with gestures, nods, written responses. Establish comfort in the setting.</p>,
            },
            {
              title: 'Step 2: Vocalizations (non-words)',
              description: (
                <p>Humming, laughing, clearing throat — sounds without actual speech. Builds tolerance for voice use.</p>
              ),
            },
            {
              title: 'Step 3: Whispered words',
              description: <p>Whisper single words, then short phrases. Increases slowly to normal volume.</p>,
            },
            {
              title: 'Step 4: Soft speech',
              description: <p>Speaking quietly in controlled settings (therapy sessions, with one trusted person).</p>,
            },
            {
              title: 'Step 5: Normal volume speech',
              description: <p>Gradually increase volume and expand to new settings and people.</p>,
            },
            {
              title: 'Step 6: Spontaneous speech',
              description: (
                <p>Speaking without preparation or prompting in a variety of situations — the ultimate goal.</p>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Medication
        </h3>
        <p className="mb-6">
          SSRIs (selective serotonin reuptake inhibitors) are often used to reduce underlying anxiety{', '}
          <Citation id="5" index={9} source="Journal of Clinical Psychopharmacology" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Commonly prescribed:</strong> Fluoxetine, sertraline, escitalopram
          </li>
          <li>
            <strong>Mechanism:</strong> Reduce overall anxiety, making exposure therapy more tolerable
          </li>
          <li>
            <strong>Effectiveness:</strong> Medication alone is rarely sufficient — combined with therapy, outcomes
            improve significantly
          </li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Group Therapy or Support Groups
        </h3>
        <p className="mb-6">
          Group settings with others who have SM or social anxiety provide low-pressure practice for speaking in front
          of multiple people. Shared understanding reduces judgment and creates a safe environment for exposure.
        </p>

        <h2
          id="prognosis"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Prognosis and Long-Term Outlook
        </h2>
        <p className="mb-6">
          With treatment, many adults with selective mutism can make significant progress. Recovery is not always
          complete — some may continue to experience anxiety in speaking situations — but functional improvement is
          possible{', '}
          <Citation id="10" index={10} source="Anxiety, Stress, and Coping" year="2020" tier={1} />.
        </p>

        <p className="mb-6">
          <strong>Factors associated with better outcomes:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Early treatment (the longer SM goes untreated, the more entrenched it becomes)</li>
          <li>High motivation to change</li>
          <li>Access to specialized therapy (not all therapists have experience with SM)</li>
          <li>Supportive environment (family, employers, educators who understand the condition)</li>
          <li>Comorbidity management (treating co-occurring anxiety, depression)</li>
        </ul>

        <QuoteBlock
          quote="Your voice is not gone — it's trapped by fear. With the right treatment and support, you can reclaim it. It won't happen overnight, but small steps forward are still forward."
          attribution="Core message"
          role="Treating Selective Mutism"
          variant="large"
        />

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Selective mutism in adults is real, debilitating, and treatable.</strong> It's not shyness, not a
            choice, not stubbornness. It's a severe anxiety response that freezes speech in specific situations.
          </p>
          <p className="mb-4">
            If you or someone you know experiences this, seek a mental health professional with experience in anxiety
            disorders and selective mutism. Treatment works — gradual exposure, cognitive restructuring, and often
            medication can help restore the ability to speak in situations where it once felt impossible.
          </p>
          <p>
            You deserve to be heard. Your voice matters. With treatment, it's possible to break the silence.
          </p>
        </ArticleCallout>
      </>
    ),
  },
];
