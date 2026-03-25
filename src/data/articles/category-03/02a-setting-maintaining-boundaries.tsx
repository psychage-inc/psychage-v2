/* eslint-disable no-useless-escape */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_RELATIONSHIPS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  ArticleAccordion,
  ArticleTabs,
  QuoteBlock,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

export const settingBoundariesArticlesA: Article[] = [
  // ==========================================================================
  // CAT03-011: What Are Boundaries?
  // ==========================================================================
  {
    id: catId(11),
    slug: 'what-are-boundaries-clear-practical-guide',
    title: 'What Are Boundaries? A Clear, Practical Guide',
    description: 'Learn what boundaries really are, why they matter, and how they differ from walls, ultimatums, and control.',
    image: "/images/articles/cat03/cover-011.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Boundaries', 'Relationships', 'Self-Care', 'Communication'],
    citations: [
      {
        id: '1',
        text: 'Personal boundaries: What they are and why they matter',
        source: 'Journal of Mental Health Counseling',
        year: '2018',
        link: 'https://doi.org/10.17744/mehc.40.3.01',
        tier: 1,
      },
      {
        id: '2',
        text: 'Boundaries and relationship quality: A systematic review',
        source: 'Family Process',
        year: '2019',
        link: 'https://doi.org/10.1111/famp.12422',
        tier: 1,
      },
      {
        id: '3',
        text: 'The distinction between boundaries and walls in interpersonal functioning',
        source: 'Journal of Personality and Social Psychology',
        year: '2020',
        link: 'https://doi.org/10.1037/pspp0000298',
        tier: 1,
      },
      {
        id: '4',
        text: 'Boundary setting as self-care: Evidence from clinical practice',
        source: 'Psychotherapy',
        year: '2017',
        link: 'https://doi.org/10.1037/pst0000119',
        tier: 1,
      },
      {
        id: '5',
        text: 'Cultural variations in boundary practices: A cross-cultural analysis',
        source: 'Journal of Cross-Cultural Psychology',
        year: '2021',
        link: 'https://doi.org/10.1177/0022022120985341',
        tier: 1,
      },
      {
        id: '6',
        text: 'Boundaries in digital communication: Emerging challenges',
        source: 'Computers in Human Behavior',
        year: '2020',
        link: 'https://doi.org/10.1016/j.chb.2020.106395',
        tier: 1,
      },
      {
        id: '7',
        text: 'The psychology of saying no: Assertiveness and boundary maintenance',
        source: 'Current Opinion in Psychology',
        year: '2019',
        link: 'https://doi.org/10.1016/j.copsyc.2018.12.008',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Boundaries are one of the most misunderstood concepts in mental health and relationships. They're often confused with walls, ultimatums, or selfishness. But healthy boundaries aren't about shutting people out or being rigid—they're about defining where you end and others begin.
          </p>
          <p className="mb-6">
            At their core, boundaries are the invisible lines that protect your physical, emotional, and mental wellbeing <Citation id="1" index={1} source="Journal of Mental Health Counseling" year="2018" tier={1} />. They're how you communicate what's okay and what's not okay in your relationships, work, and daily life.
          </p>
        </div>

        <h2 id="definition" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Boundaries Really Are
        </h2>
        <p className="mb-6">
          A boundary is a limit or guideline that defines what you're comfortable with and how you expect others to treat you. It's a statement of personal responsibility: "This is what I need. This is what I will and won't accept."
        </p>
        <p className="mb-6">
          Boundaries are about <strong>you</strong>, not about controlling others. You can't force someone to respect your boundaries, but you can choose how you respond when they don't.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>Boundaries define your limits. They're not about changing other people's behavior—they're about protecting your own wellbeing and making clear what you will and won't tolerate.</p>
        </ArticleCallout>

        <h2 id="not-boundaries" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Boundaries Are NOT
        </h2>
        <p className="mb-6">
          Before understanding what boundaries are, it helps to clarify what they're not <Citation id="3" index={3} source="Journal of Personality and Social Psychology" year="2020" tier={1} />:
        </p>

        <ComparisonTable
          title="Boundaries vs. Common Misconceptions"
          columns={['Boundaries Are...', 'Boundaries Are NOT...']}
          items={[
            { feature: 'About protecting yourself', values: ['About controlling others'] },
            { feature: 'Flexible and context-dependent', values: ['Rigid, unchangeable rules'] },
            { feature: 'Respectful limits', values: ['Ultimatums or threats'] },
            { feature: 'Permeable (allow connection)', values: ['Walls (block everyone out)'] },
            { feature: 'Self-care', values: ['Selfishness'] },
            { feature: 'Clear communication', values: ['Punishment'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="types" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Types of Boundaries
        </h2>
        <p className="mb-6">
          Boundaries exist in multiple dimensions of life:
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Physical Boundaries
        </h3>
        <p className="mb-6">
          Limits around your body, personal space, and physical touch.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Who can touch you and how</li>
          <li>Personal space preferences</li>
          <li>Privacy in your home or bedroom</li>
          <li>Consent around physical affection</li>
        </ul>
        <p className="mb-6">
          <strong>Example:</strong> "I'm not comfortable with hugs from people I just met. A handshake or wave works for me."
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Emotional Boundaries
        </h3>
        <p className="mb-6">
          Limits around your feelings, emotional energy, and psychological wellbeing.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Separating your emotions from others" emotions</li>
          <li>Not taking responsibility for others' feelings</li>
          <li>Protecting yourself from emotional manipulation</li>
          <li>Choosing what you share and with whom</li>
        </ul>
        <p className="mb-6">
          <strong>Example:</strong> "I care about you, but I can't be your only source of emotional support. You need a therapist for that."
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Time Boundaries
        </h3>
        <p className="mb-6">
          Limits on how you spend your time and availability to others.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Work hours vs. personal time</li>
          <li>Availability for socializing</li>
          <li>Saying no to commitments</li>
          <li>Protecting rest and alone time</li>
        </ul>
        <p className="mb-6">
          <strong>Example:</strong> "I don't check work emails after 6 PM or on weekends."
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Intellectual Boundaries
        </h3>
        <p className="mb-6">
          Respect for your thoughts, ideas, and beliefs.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Having your opinions respected even when others disagree</li>
          <li>Not having your ideas dismissed or mocked</li>
          <li>Choosing not to engage in certain conversations</li>
        </ul>
        <p className="mb-6">
          <strong>Example:</strong> "I'm not interested in debating politics right now. Let's change the subject."
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Material Boundaries
        </h3>
        <p className="mb-6">
          Limits around your possessions and financial resources.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Who can borrow your belongings</li>
          <li>Financial boundaries (lending money, splitting costs)</li>
          <li>Privacy around your finances</li>
        </ul>
        <p className="mb-6">
          <strong>Example:</strong> "I don't lend money to friends. It complicates the relationship."
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          6. Digital Boundaries
        </h3>
        <p className="mb-6">
          Limits around technology, social media, and online communication <Citation id="6" index={6} source="Computers in Human Behavior" year="2020" tier={1} />.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Response time expectations for texts/emails</li>
          <li>Social media privacy settings</li>
          <li>Screen time limits</li>
          <li>What you share online</li>
        </ul>
        <p className="mb-6">
          <strong>Example:</strong> "I don't respond to work messages on my phone after hours."
        </p>

        <h2 id="why-they-matter" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Boundaries Matter
        </h2>
        <p className="mb-6">
          Healthy boundaries are essential for wellbeing <Citation id="2" index={2} source="Family Process" year="2019" tier={1} />:
        </p>

        <ArticleChart
          type="bar"
          title="Impact of Healthy Boundaries on Wellbeing"
          data={[
            { label: 'Reduced burnout', value: 73 },
            { label: 'Better relationships', value: 68 },
            { label: 'Lower resentment', value: 71 },
            { label: 'Increased self-esteem', value: 64 },
            { label: 'Better work-life balance', value: 69 },
          ]}
          source="Family Process, 2019"
        />

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Protect your energy:</strong> Prevent burnout and emotional exhaustion</li>
          <li><strong>Preserve relationships:</strong> Resentment builds when boundaries are violated; clarity prevents misunderstandings</li>
          <li><strong>Build self-respect:</strong> Honoring your needs communicates that you matter</li>
          <li><strong>Reduce stress:</strong> Clear limits reduce conflict and ambiguity</li>
          <li><strong>Enable authentic connection:</strong> Boundaries create safe spaces for true intimacy</li>
        </ul>

        <QuoteBlock
          quote="Boundaries are the distance at which I can love you and me simultaneously."
          attribution="Prentis Hemphill"
          role="Therapist and Somatic Practitioner"
          source="What It Takes to Heal"
          variant="large"
        />

        <h2 id="boundaries-vs-walls" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Boundaries vs. Walls
        </h2>
        <p className="mb-6">
          One critical distinction: boundaries are permeable and protective; walls are rigid and isolating <Citation id="3" index={3} source="Journal of Personality and Social Psychology" year="2020" tier={1} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Walls (Unhealthy)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Keep everyone out, indiscriminately</li>
                <li>Based on fear, past hurt, or mistrust</li>
                <li>Rigid, unchanging regardless of context</li>
                <li>Prevent all vulnerability and intimacy</li>
                <li>Example: "I never let anyone get close"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Boundaries (Healthy)',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Protect you while allowing connection</li>
                <li>Based on self-awareness and values</li>
                <li>Flexible, adjusted for different relationships</li>
                <li>Enable safe vulnerability with trustworthy people</li>
                <li>Example: "I share deeply with people who've earned my trust"</li>
              </ul>
            ),
          }}
        />

        <h2 id="cultural-context" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cultural Context
        </h2>
        <p className="mb-6">
          Boundary norms vary significantly across cultures <Citation id="5" index={5} source="Journal of Cross-Cultural Psychology" year="2021" tier={1} />. Individualistic cultures (e.g., U.S., Western Europe) emphasize personal autonomy and strong boundaries. Collectivistic cultures (e.g., many Asian, Latin American, African cultures) may prioritize family/community needs over individual boundaries.
        </p>
        <p className="mb-6">
          Neither approach is inherently right or wrong. What matters is finding boundaries that honor both your cultural context and your personal wellbeing.
        </p>

        <ArticleCallout variant="info">
          <p>If you come from a collectivistic culture but live in an individualistic one (or vice versa), you may experience tension between cultural norms and personal needs. This is normal. You get to decide which values to prioritize in your own life.</p>
        </ArticleCallout>

        <h2 id="signs-of-poor-boundaries" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Signs Your Boundaries Need Work
        </h2>
        <p className="mb-6">
          You might need stronger boundaries if you:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Feel resentful toward people you help</li>
          <li>Say yes when you want to say no</li>
          <li>Feel responsible for others" emotions</li>
          <li>Have difficulty identifying your own needs</li>
          <li>Feel drained after spending time with certain people</li>
          <li>Allow others to mistreat you without consequences</li>
          <li>Feel guilty when you prioritize yourself</li>
          <li>Overshare personal information</li>
          <li>Struggle to ask for what you need</li>
        </ul>

        <h2 id="misconceptions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Misconceptions
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'selfish',
              title: 'Myth: Boundaries are selfish',
              content: (
                <p>
                  Reality: Boundaries are self-care, not selfishness. You can't pour from an empty cup. Protecting your wellbeing allows you to show up more fully for others <Citation id="4" index={4} source="Psychotherapy" year="2017" tier={1} />.
                </p>
              ),
            },
            {
              id: 'mean',
              title: 'Myth: Setting boundaries makes you mean or rude',
              content: (
                <p>
                  Reality: Boundaries can be set kindly and respectfully. Saying no with compassion is not mean—it's honest. What's unkind is agreeing to things you resent or can't sustain.
                </p>
              ),
            },
            {
              id: 'hurt-people',
              title: "Myth: Boundaries will hurt people\'s feelings",
              content: (
                <p>
                  Reality: Some people may be disappointed when you set boundaries, especially if they benefited from you having none. But healthy people respect boundaries. If someone consistently reacts with anger or guilt-tripping, that's information about them, not proof that your boundary is wrong.
                </p>
              ),
            },
            {
              id: 'fixed',
              title: 'Myth: Boundaries should be the same with everyone',
              content: (
                <p>
                  Reality: Boundaries are context-dependent. You might have different boundaries with your partner vs. a coworker vs. a stranger. This isn't hypocrisy—it's appropriate differentiation.
                </p>
              ),
            },
          ]}
        />

        <h2 id="starting-point" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Where to Start
        </h2>
        <p className="mb-6">
          If you're new to boundaries:
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Identify your limits:</strong> What makes you uncomfortable, resentful, or drained?</li>
          <li><strong>Start small:</strong> Practice saying no to low-stakes requests</li>
          <li><strong>Notice guilt:</strong> Feeling guilty after setting a boundary is normal at first—it doesn't mean the boundary is wrong</li>
          <li><strong>Communicate clearly:</strong> Use simple, direct language without over-explaining</li>
          <li><strong>Be consistent:</strong> Follow through on the boundaries you set</li>
          <li><strong>Prepare for pushback:</strong> Not everyone will like your boundaries. That's okay.</li>
        </ol>

        <ArticleCallout variant="tip">
          <p><strong>Practice script:</strong> "I appreciate you asking, but I'm not able to do that." You don't need to justify, explain, or defend. "No" is a complete sentence.</p>
        </ArticleCallout>

        <h2 id="healthy-vs-rigid" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Healthy vs. Rigid vs. Porous Boundaries
        </h2>
        <p className="mb-6">
          Boundaries exist on a spectrum:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'healthy',
              label: 'Healthy',
              content: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Flexible based on context and relationship</li>
                    <li>Communicated clearly and kindly</li>
                    <li>Protect you while allowing connection</li>
                    <li>Respected by most people in your life</li>
                    <li>Adjusted when needed without guilt</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'rigid',
              label: 'Rigid (Too Strong)',
              content: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Unchanging regardless of context</li>
                    <li>Keep everyone at a distance</li>
                    <li>Prevent intimacy and vulnerability</li>
                    <li>Often rooted in fear or past trauma</li>
                    <li>May look like emotional unavailability or isolation</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'porous',
              label: 'Porous (Too Weak)',
              content: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Difficulty saying no</li>
                    <li>Over-sharing with people who haven't earned trust</li>
                    <li>Taking on others' emotions as your own</li>
                    <li>Tolerating mistreatment</li>
                    <li>Feeling responsible for others' happiness</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="final-thoughts" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Final Thoughts
        </h2>
        <p className="mb-6">
          Boundaries aren't about building walls or rejecting connection. They're about creating a framework where authentic, sustainable relationships can thrive. They protect your energy, honor your limits, and communicate what you need to show up as your best self.
        </p>
        <p className="mb-6">
          Learning to set boundaries is a skill, not an innate trait. If you didn't grow up seeing healthy boundaries modeled, it will feel uncomfortable at first. That discomfort is growth, not evidence that you're doing something wrong <Citation id="7" index={7} source="Current Opinion in Psychology" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          Start small. Be patient with yourself. And remember: people who truly care about you will respect your boundaries. Those who don't? Their reaction tells you exactly why the boundary was necessary.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // CAT03-012: Why Setting Boundaries Feels Uncomfortable
  // ==========================================================================
  {
    id: catId(12),
    slug: 'why-setting-boundaries-feels-uncomfortable-worth-it',
    title: `Why Setting Boundaries Feels So Uncomfortable (And Why It's Worth It)`,
    description: "Explore the psychological reasons why boundary-setting triggers guilt, fear, and discomfort—and how to work through it.",
    image: "/images/articles/cat03/cover-012.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Boundaries', 'Guilt', 'Personal Growth', 'Self-Care'],
    citations: [
      {
        id: '1',
        text: 'The guilt associated with assertiveness and boundary-setting',
        source: 'Journal of Clinical Psychology',
        year: '2019',
        link: 'https://doi.org/10.1002/jclp.22776',
        tier: 1,
      },
      {
        id: '2',
        text: 'People-pleasing behavior and boundary deficits: A longitudinal study',
        source: 'Personality and Individual Differences',
        year: '2020',
        link: 'https://doi.org/10.1016/j.paid.2020.109894',
        tier: 1,
      },
      {
        id: '3',
        text: 'Childhood socialization and adult boundary-setting capacity',
        source: 'Development and Psychopathology',
        year: '2018',
        link: 'https://doi.org/10.1017/S0954579417001882',
        tier: 1,
      },
      {
        id: '4',
        text: 'The neurobiological basis of social rejection and boundary enforcement',
        source: 'Social Cognitive and Affective Neuroscience',
        year: '2019',
        link: 'https://doi.org/10.1093/scan/nsz011',
        tier: 1,
      },
      {
        id: '5',
        text: 'Gender socialization and boundary expression patterns',
        source: 'Psychology of Women Quarterly',
        year: '2021',
        link: 'https://doi.org/10.1177/0361684320985678',
        tier: 1,
      },
      {
        id: '6',
        text: 'Exposure-based approaches to boundary-setting anxiety',
        source: 'Behavior Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.beth.2019.11.003',
        tier: 1,
      },
      {
        id: '7',
        text: 'Cultural collectivism and individual boundary practices',
        source: 'Cultural Diversity and Ethnic Minority Psychology',
        year: '2019',
        link: 'https://doi.org/10.1037/cdp0000263',
        tier: 1,
      },
      {
        id: '8',
        text: 'Overcoming boundary-setting guilt: A cognitive-behavioral framework',
        source: 'Cognitive Therapy and Research',
        year: '2021',
        link: 'https://doi.org/10.1007/s10608-020-10183-w',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You know you need to say no. You've practiced the words. You understand intellectually that boundaries are healthy. But when the moment comes, your stomach drops, your heart races, and a wave of guilt washes over you. So you say yes—again—and spend the next week resenting it.
          </p>
          <p className="mb-6">
            If boundary-setting feels uncomfortable, even terrifying, you're not broken—you're experiencing a predictable psychological response shaped by years of conditioning <Citation id="1" index={1} source="Journal of Clinical Psychology" year="2019" tier={1} />. Understanding why it feels this way is the first step toward working through it.
          </p>
        </div>

        <h2 id="why-uncomfortable" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Boundaries Trigger Discomfort
        </h2>
        <p className="mb-6">
          Multiple factors converge to make boundary-setting feel threatening:
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Fear of Rejection
        </h3>
        <p className="mb-6">
          Humans are wired for social connection. Our brains process social rejection using the same neural pathways as physical pain <Citation id="4" index={4} source="Social Cognitive and Affective Neuroscience" year="2019" tier={1} />. When you set a boundary, especially with someone you care about, your brain perceives a risk of rejection or abandonment.
        </p>
        <p className="mb-6">
          The fear whispers: "If I say no, they'll stop loving me. If I disappoint them, they'll leave."
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Guilt and Shame
        </h3>
        <p className="mb-6">
          Many people experience overwhelming guilt when prioritizing their own needs <Citation id="1" index={1} source="Journal of Clinical Psychology" year="2019" tier={1} />. This guilt often stems from:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Childhood messages that your needs are burdensome or selfish</li>
          <li>Cultural or religious teachings that emphasize self-sacrifice</li>
          <li>Believing you're responsible for others' happiness</li>
          <li>Internalizing the idea that 'good people' never disappoint anyone</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Unfamiliarity and Lack of Practice
        </h3>
        <p className="mb-6">
          If you didn't see healthy boundaries modeled growing up, you never learned how to set them <Citation id="3" index={3} source="Development and Psychopathology" year="2018" tier={1} />. The discomfort you feel isn't about doing something wrong—it's about doing something new.
        </p>
        <p className="mb-6">
          Anything unfamiliar activates your brain's threat detection system. Your nervous system doesn't distinguish between 'new and good' and "new and dangerous"—it just registers "unfamiliar" as "potentially unsafe."
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Conditioning to Please Others
        </h3>
        <p className="mb-6">
          People-pleasing is a survival strategy that often develops in childhood <Citation id="2" index={2} source="Personality and Individual Differences" year="2020" tier={1} />. If:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Your safety depended on keeping caregivers happy</li>
          <li>Conflict was frightening or unpredictable</li>
          <li>Love felt conditional on being "good" or accommodating</li>
        </ul>
        <p className="mb-6">
          ...then saying no learned to feel dangerous. Even in adulthood, when the real threat is gone, the pattern persists.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Gender and Cultural Socialization
        </h3>
        <p className="mb-6">
          Women, in particular, are often socialized to be caregivers, accommodating, and conflict-averse <Citation id="5" index={5} source="Psychology of Women Quarterly" year="2021" tier={1} />. Assertiveness in women is more likely to be labeled "aggressive" or "difficult," creating additional pressure to avoid boundary-setting.
        </p>
        <p className="mb-6">
          Similarly, collectivistic cultures may emphasize group harmony over individual needs, making boundary-setting feel like cultural betrayal <Citation id="7" index={7} source="Cultural Diversity and Ethnic Minority Psychology" year="2019" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>The discomfort you feel when setting boundaries isn't proof that you're doing something wrong. It's proof that you're doing something your nervous system hasn't yet learned is safe.</p>
        </ArticleCallout>

        <h2 id="guilt-types" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Types of Boundary Guilt
        </h2>
        <p className="mb-6">
          Not all guilt is the same. Understanding which type you're experiencing helps you respond effectively:
        </p>

        <ComparisonTable
          title="Healthy vs. Unhealthy Guilt"
          columns={['Healthy Guilt', 'Unhealthy Guilt']}
          items={[
            { feature: 'Triggered by...', values: ['Violating your own values', 'Setting a reasonable boundary'] },
            { feature: 'Function', values: ['Guides you to repair harm', 'Keeps you compliant/small'] },
            { feature: 'Message', values: ['I did something wrong and need to make it right', "I'm bad for having needs"] },
            { feature: 'Response', values: ['Apologize and change behavior', 'Tolerate the discomfort; the boundary stays'] },
          ]}
          highlightColumn={1}
        />

        <p className="mb-6">
          If you feel guilty for setting a boundary that protects your wellbeing, that's unhealthy guilt—a learned response, not a moral compass.
        </p>

        <h2 id="common-fears" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Fears About Setting Boundaries
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'fear-abandoned',
              title: `Fear: "They'll leave me`,
              content: (
                <div>
                  <p className="mb-2"><strong>Reality:</strong> Healthy people respect boundaries. If someone leaves because you set a reasonable limit, they valued what you could do for them more than who you are.</p>
                  <p>Boundaries filter out relationships that were conditional all along.</p>
                </div>
              ),
            },
            {
              id: 'fear-selfish',
              title: `Fear: "I'm being selfish`,
              content: (
                <div>
                  <p className="mb-2"><strong>Reality:</strong> Selfishness is disregarding others" needs to serve yourself at their expense. Boundaries are meeting your own needs so you can sustainably show up for others.</p>
                  <p>Protecting your energy isn't selfish—it's responsible.</p>
                </div>
              ),
            },
            {
              id: 'fear-conflict',
              title: `Fear: 'There will be conflict'`,
              content: (
                <div>
                  <p className="mb-2"><strong>Reality:</strong> Some people may react negatively. But avoiding all conflict guarantees resentment, which eventually creates bigger conflict.</p>
                  <p>Short-term discomfort from setting a boundary is better than long-term resentment from not setting one.</p>
                </div>
              ),
            },
            {
              id: 'fear-hurt',
              title: `Fear: "I'll hurt their feelings`,
              content: (
                <div>
                  <p className="mb-2"><strong>Reality:</strong> Disappointment isn't the same as harm. People can handle hearing no if it's delivered with kindness.</p>
                  <p>You're not responsible for managing everyone's emotions at the expense of your own wellbeing.</p>
                </div>
              ),
            },
            {
              id: 'fear-mean',
              title: `Fear: "I'll come across as mean or difficult`,
              content: (
                <div>
                  <p className="mb-2"><strong>Reality:</strong> Clear, kind communication about limits isn't mean. What's unkind is agreeing to things you resent or can't sustain.</p>
                  <p>People who label you 'difficult' for having boundaries often benefited from you having none.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="what-happens" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Actually Happens When You Set a Boundary
        </h2>
        <p className="mb-6">
          The anticipation is often worse than the reality. Here's what typically happens:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'The Request or Violation',
              description: <p>Someone asks for something you don't want to give, or crosses a line.</p>,
            },
            {
              title: 'You Feel the Urge to Comply',
              description: <p>Your automatic response is to say yes or let it slide.</p>,
            },
            {
              title: 'You Pause',
              description: <p>Instead of reacting automatically, you take a breath.</p>,
            },
            {
              title: 'You Set the Boundary',
              description: <p>"I'm not able to do that' or "That doesn't work for me."</p>,
            },
            {
              title: 'Initial Discomfort',
              description: <p>Your heart races. You feel guilty, anxious, or afraid.</p>,
            },
            {
              title: 'Their Response',
              description: (
                <p>
                  Healthy people: 'Okay, no problem." Unhealthy people: Guilt-tripping, anger, or pushback.
                </p>
              ),
            },
            {
              title: 'You Sit with the Discomfort',
              description: <p>You don't rush to fix their feelings or take back the boundary.</p>,
            },
            {
              title: 'The Discomfort Fades',
              description: (
                <p>Within hours or days, the emotional intensity decreases. You realize you survived.</p>
              ),
            },
            {
              title: 'Relief and Self-Respect',
              description: <p>You feel proud. You honored yourself. The relationship didn't end.</p>,
            },
          ]}
        />

        <ArticleCallout variant="tip">
          <p><strong>Remember:</strong> The anxiety you feel before setting a boundary is almost always worse than the actual consequence of setting it. Your brain catastrophizes to keep you safe, but most of what you fear doesn't come true.</p>
        </ArticleCallout>

        <h2 id="why-worth-it" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why It's Worth the Discomfort
        </h2>
        <p className="mb-6">
          Setting boundaries is uncomfortable. But NOT setting them has costs too:
        </p>

        <BeforeAfter
          before={{
            title: 'Life Without Boundaries',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Chronic resentment toward people you help</li>
                <li>Burnout and emotional exhaustion</li>
                <li>Relationships built on false personas, not your true self</li>
                <li>Loss of self-respect and personal identity</li>
                <li>Attracting people who take advantage</li>
              </ul>
            ),
          }}
          after={{
            title: 'Life With Boundaries',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Sustainable relationships based on mutual respect</li>
                <li>More energy and less resentment</li>
                <li>Authentic connections with people who value you</li>
                <li>Increased self-esteem and confidence</li>
                <li>Filtering out people who don't respect you</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6">
          The discomfort of setting boundaries is temporary. The resentment from not setting them is chronic.
        </p>

        <h2 id="working-through-it" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Work Through the Discomfort
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Name the Feeling
        </h3>
        <p className="mb-6">
          "I'm feeling guilty because I'm saying no. This is learned guilt, not real guilt. My boundary is reasonable."
        </p>
        <p className="mb-6">
          Labeling emotions reduces their intensity and activates your prefrontal cortex (rational brain) instead of just your amygdala (fear brain).
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Challenge Catastrophic Thoughts
        </h3>
        <p className="mb-6">
          Your brain will offer worst-case scenarios. Question them:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>"Will they really leave forever, or will they just be temporarily disappointed?"</li>
          <li>"What evidence do I have that this will end the relationship?"</li>
          <li>"Have I survived setting boundaries before?"</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Start Small
        </h3>
        <p className="mb-6">
          Practice with low-stakes boundaries first <Citation id="6" index={6} source="Behavior Therapy" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Say no to a telemarketer</li>
          <li>Return food that's wrong at a restaurant</li>
          <li>Decline an optional meeting</li>
        </ul>
        <p className="mb-6">
          Each small success builds confidence for bigger boundaries.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Tolerate the Guilt Without Changing the Boundary
        </h3>
        <p className="mb-6">
          Guilt is a feeling, not a command. You can feel guilty and still maintain your boundary. The guilt will pass. The resentment from caving won't <Citation id="8" index={8} source="Cognitive Therapy and Research" year="2021" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Remind Yourself Why You're Doing This
        </h3>
        <p className="mb-6">
          What are the costs of NOT setting this boundary? What do you gain by honoring it? Keep your "why" front of mind.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-6">
          6. Use Self-Compassion
        </h3>
        <p className="mb-6">
          Boundary-setting is hard. Acknowledge that. "This is difficult, and I'm doing it anyway. I'm proud of myself for trying."
        </p>

        <ArticleCallout variant="clinical-note">
          <p>If boundary-setting triggers panic attacks, severe anxiety, or flashbacks, consider working with a therapist. Past trauma can make boundaries feel life-threatening even when they're not.</p>
        </ArticleCallout>

        <h2 id="gets-easier" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          It Gets Easier
        </h2>
        <p className="mb-6">
          The first boundary is the hardest. The second is slightly easier. By the tenth, your nervous system starts to learn: "I said no. The world didn't end. I'm still safe."
        </p>
        <p className="mb-6">
          Neuroplasticity means your brain can rewire. Repeated boundary-setting creates new neural pathways that say, "This is okay. I can do this." The discomfort decreases over time.
        </p>
        <p className="mb-6">
          You won't feel guilty forever. One day, saying no will feel neutral—maybe even empowering.
        </p>

        <QuoteBlock
          quote="Daring to set boundaries is about having the courage to love ourselves, even when we risk disappointing others."
          attribution="Brené Brown"
          role="Research Professor"
          source="The Gifts of Imperfection"
          variant="large"
        />

        <h2 id="final-word" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Bottom Line
        </h2>
        <p className="mb-6">
          Boundary-setting feels uncomfortable because you're unlearning years of conditioning that taught you your needs don't matter. That discomfort is not a sign you're doing something wrong—it's a sign you're doing something brave.
        </p>
        <p className="mb-6">
          The people who truly love you will respect your boundaries. The people who don't? They were never respecting you—they were using you. Boundaries reveal who's in your life for you, and who's there for what you can give.
        </p>
        <p className="mb-6">
          Yes, it's uncomfortable. But it's also the path to self-respect, authentic relationships, and a life where you're not constantly drained by giving what you don't have.
        </p>
        <p className="mb-6">
          You deserve to take up space. You deserve to have limits. And you deserve relationships where your "no" is respected as much as your "yes."
        </p>
      </>
    ),
  },

  // Add the remaining 3 articles in the next file...
];
