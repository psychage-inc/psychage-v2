/* eslint-disable @typescript-eslint/no-unused-vars, no-useless-escape */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_RELATIONSHIPS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  ArticleAccordion,
  ArticleTabs,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

export const attachmentStylesArticlesB: Article[] = [
  // ==========================================================================
  // CAT03-006: How to Identify Your Attachment Style
  // ==========================================================================
  {
    id: catId(6),
    slug: 'how-to-identify-attachment-style-self-assessment-guide',
    title: 'How to Identify Your Attachment Style: A Self-Assessment Guide',
    description: 'A practical guide to recognizing your attachment patterns through self-reflection questions, behavioral markers, and relationship history analysis.',
    image: "/images/articles/cat03/cover-006.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Self-Assessment', 'Attachment Theory', 'Self-Awareness', 'Relationships'],
    citations: [
      {
        id: '1',
        text: 'Experiences in Close Relationships-Revised (ECR-R): A self-report measure of adult attachment',
        source: 'Journal of Personality Assessment',
        year: '2000',
        link: 'https://doi.org/10.1207/S15327752JPA7503_01',
        tier: 1,
      },
      {
        id: '2',
        text: 'Self-report measurement of adult attachment: An integrative overview',
        source: 'Attachment & Human Development',
        year: '2010',
        link: 'https://doi.org/10.1080/14616730903488476',
        tier: 1,
      },
      {
        id: '3',
        text: 'The Adult Attachment Interview: Coherence of discourse and unresolved states',
        source: 'Attachment & Human Development',
        year: '2003',
        link: 'https://doi.org/10.1080/1461673031000108489',
        tier: 1,
      },
      {
        id: '4',
        text: 'Attachment patterns in early adulthood: Self-awareness and relationship outcomes',
        source: 'Journal of Social and Personal Relationships',
        year: '2018',
        link: 'https://doi.org/10.1177/0265407517733404',
        tier: 1,
      },
      {
        id: '5',
        text: 'Behavioral indicators of attachment security across relationship contexts',
        source: 'Personal Relationships',
        year: '2016',
        link: 'https://doi.org/10.1111/pere.12122',
        tier: 1,
      },
      {
        id: '6',
        text: 'Relationship-specific vs. global attachment: Predicting relationship outcomes',
        source: 'Journal of Personality',
        year: '2019',
        link: 'https://doi.org/10.1111/jopy.12420',
        tier: 1,
      },
      {
        id: '7',
        text: 'The accuracy of self-reported attachment: Comparing self-report to behavioral assessment',
        source: 'Attachment & Human Development',
        year: '2015',
        link: 'https://doi.org/10.1080/14616734.2015.1006383',
        tier: 1,
      },
      {
        id: '8',
        text: 'Childhood recollections and adult attachment: A longitudinal examination',
        source: 'Development and Psychopathology',
        year: '2017',
        link: 'https://doi.org/10.1017/S0954579417000049',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Understanding your attachment style isn't about getting a label---it's about gaining clarity on the patterns that shape how you connect with others. This self-awareness is the first step toward healthier relationships and, if needed, intentional change.
          </p>
          <p className="mb-6">
            While formal assessments exist, you can gain meaningful insight through honest self-reflection about your relationship history, emotional patterns, and automatic reactions to intimacy and distance <Citation id="1" index={1} source="Journal of Personality Assessment" year="2000" tier={1} />.
          </p>
        </div>

        <h2 id="before-you-start" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Before You Start: Important Context
        </h2>
        <p className="mb-6">
          Attachment styles exist on a spectrum, not in rigid boxes. You may show different patterns in different relationships or shift between styles under stress <Citation id="6" index={6} source="Journal of Personality" year="2019" tier={1} />.
        </p>

        <ArticleCallout variant="info">
          <p>Most people don't fit perfectly into one category. You might be primarily secure but show anxious tendencies in romantic relationships, or lean avoidant except with very close friends. This is normal.</p>
        </ArticleCallout>

        <h2 id="core-questions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Core Self-Reflection Questions
        </h2>
        <p className="mb-6">
          Answer these questions honestly, thinking about your most common patterns across multiple relationships---not just one particularly good or bad relationship.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          About Closeness and Intimacy
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Do you generally feel comfortable with emotional closeness?</li>
          <li>Does intimacy feel threatening or suffocating?</li>
          <li>Do you crave more closeness than your partners seem to offer?</li>
          <li>Can you be vulnerable without fearing judgment or abandonment?</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          About Independence and Dependence
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Is asking for help difficult for you?</li>
          <li>Do you feel uncomfortable relying on others?</li>
          <li>Do you worry about being too dependent on your partner?</li>
          <li>Can you maintain your sense of self within close relationships?</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          About Fear and Worry
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Do you often worry that partners will leave you?</li>
          <li>Do you fear being rejected or unloved?</li>
          <li>Are you afraid of losing yourself in relationships?</li>
          <li>Do you simultaneously want and fear closeness?</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          About Communication and Conflict
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Can you express your needs clearly without fear?</li>
          <li>Do you shut down or withdraw during disagreements?</li>
          <li>Do you become emotionally intense during conflicts?</li>
          <li>Can you listen to criticism without becoming defensive or devastated?</li>
        </ul>

        <h2 id="behavioral-markers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Behavioral Markers of Each Style
        </h2>
        <p className="mb-6">
          Look for recurring patterns in how you behave across different relationships <Citation id="5" index={5} source="Personal Relationships" year="2016" tier={1} />.
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'secure',
              label: 'Secure',
              content: (
                <div>
                  <p className="mb-4"><strong>You might be secure if you:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Feel comfortable both alone and in close relationships</li>
                    <li>Can communicate needs without anxiety or avoidance</li>
                    <li>Trust that others will be there for you</li>
                    <li>Don't take conflict personally---you see it as solvable</li>
                    <li>Can self-soothe but also ask for support when needed</li>
                    <li>Feel worthy of love and expect relationships to be generally positive</li>
                    <li>Can give your partner space without feeling threatened</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'anxious',
              label: 'Anxious',
              content: (
                <div>
                  <p className="mb-4"><strong>You might be anxious if you:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Frequently check your phone for messages from your partner</li>
                    <li>Need regular reassurance about the relationship</li>
                    <li>Overanalyze small changes in tone, word choice, or behavior</li>
                    <li>Feel anxious when you don't hear from someone</li>
                    <li>Struggle to be alone---you feel better when connected</li>
                    <li>Worry that you love more than you're loved</li>
                    <li>Sometimes engage in protest behaviors (dramatic gestures to get attention)</li>
                    <li>Take perceived rejection very hard</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'avoidant',
              label: 'Avoidant',
              content: (
                <div>
                  <p className="mb-4"><strong>You might be avoidant if you:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Value independence above connection</li>
                    <li>Feel uncomfortable when people express emotional needs</li>
                    <li>Downplay or minimize your own emotions</li>
                    <li>Pull away when relationships get "too serious"</li>
                    <li>Prefer surface-level interactions over deep vulnerability</li>
                    <li>Rarely ask for help, even when struggling</li>
                    <li>Focus on partners" flaws when things get intimate</li>
                    <li>Feel trapped or suffocated by commitment</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'disorganized',
              label: 'Disorganized',
              content: (
                <div>
                  <p className="mb-4"><strong>You might be disorganized if you:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Crave closeness but pull away when you get it</li>
                    <li>Experience intense fear of both abandonment and engulfment</li>
                    <li>Have tumultuous, on-again-off-again relationships</li>
                    <li>Feel overwhelmed by emotions you can't regulate</li>
                    <li>Struggle to trust even trustworthy people</li>
                    <li>Alternate between clinging and distancing</li>
                    <li>Test relationships to see if people will stay</li>
                    <li>Have a history of trauma or very inconsistent caregiving</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="relationship-history" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Analyzing Your Relationship History
        </h2>
        <p className="mb-6">
          Your past relationships reveal patterns. Reflect on these questions <Citation id="4" index={4} source="Journal of Social and Personal Relationships" year="2018" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'patterns',
              title: 'What patterns repeat across your relationships?',
              content: (
                <p>
                  Do you often feel abandoned? Do partners frequently complain you're distant? Do you tend to pick unavailable people? Recurring themes point to attachment patterns.
                </p>
              ),
            },
            {
              id: 'endings',
              title: 'How do your relationships typically end?',
              content: (
                <p>
                  Do you leave when things get too close? Do you get left when you become 'too much'? Do relationships explode dramatically or fade quietly?
                </p>
              ),
            },
            {
              id: 'conflict',
              title: 'How do you handle conflict in relationships?',
              content: (
                <p>
                  Do you withdraw and shut down? Pursue and escalate? Oscillate between both? Can you resolve issues calmly?
                </p>
              ),
            },
            {
              id: 'attraction',
              title: 'Who are you attracted to?',
              content: (
                <p>
                  Do you choose secure, available partners? Or do you find yourself drawn to people who are emotionally distant, chaotic, or inconsistent?
                </p>
              ),
            },
            {
              id: 'triggers',
              title: 'What triggers your strongest reactions?',
              content: (
                <p>
                  Delayed texts? Requests for alone time? Emotional conversations? Your triggers reveal your fears.
                </p>
              ),
            },
          ]}
        />

        <h2 id="childhood-reflection" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Childhood Relationship Patterns
        </h2>
        <p className="mb-6">
          While attachment isn't solely determined by childhood, early experiences provide important context <Citation id="8" index={8} source="Development and Psychopathology" year="2017" tier={1} />. Reflect on:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Caregiver responsiveness:</strong> Were your emotional and physical needs met consistently?</li>
          <li><strong>Emotional expression:</strong> Were your feelings acknowledged and validated, or dismissed?</li>
          <li><strong>Comfort-seeking:</strong> When upset, did you go to caregivers for comfort? Were they available?</li>
          <li><strong>Independence:</strong> Were you encouraged to be self-reliant, or supported in depending on others?</li>
          <li><strong>Trauma or instability:</strong> Did you experience abuse, neglect, loss, or frightening caregiver behavior?</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>Difficult childhood memories can be painful to revisit. If this reflection brings up overwhelming emotions, consider working with a therapist who can provide support and guidance through the process.</p>
        </ArticleCallout>

        <h2 id="stress-responses" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How You Respond Under Stress
        </h2>
        <p className="mb-6">
          Attachment patterns become most visible when you're stressed, tired, or emotionally activated. Think about your last argument or moment of relationship uncertainty:
        </p>

        <ComparisonTable
          title="Stress Responses by Attachment Style"
          columns={['Style', 'Typical Stress Response', 'Example']}
          items={[
            { feature: 'Secure', values: ["Communicate needs, seek support", "I'm stressed. Can we talk?"] },
            { feature: 'Anxious', values: ['Seek excessive reassurance, cling', 'Do you still love me? Are we okay?'] },
            { feature: 'Avoidant', values: ["Withdraw, shut down, need space", "I'm fine. I need to be alone."] },
            { feature: 'Disorganized', values: ['Oscillate---cling then push away', 'I need you---actually, leave me alone.'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="formal-assessments" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Formal Attachment Assessments
        </h2>
        <p className="mb-6">
          If you want a more structured evaluation, validated self-report measures can provide additional clarity <Citation id="2" index={2} source="Attachment & Human Development" year="2010" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Experiences in Close Relationships-Revised (ECR-R):</strong> 36 questions measuring anxiety and avoidance dimensions</li>
          <li><strong>Relationship Questionnaire (RQ):</strong> Brief categorical measure</li>
          <li><strong>Adult Attachment Interview (AAI):</strong> In-depth interview administered by trained professionals---the gold standard, but requires a specialist <Citation id="3" index={3} source="Attachment & Human Development" year="2003" tier={1} /></li>
        </ul>
        <p className="mb-6">
          These tools are available through therapists or online. However, self-reflection often provides enough insight to begin working on patterns.
        </p>

        <ArticleCallout variant="tip">
          <p>Free online versions of the ECR-R are available, but be cautious about interpretation. Scores are most useful when discussed with a therapist who can provide context.</p>
        </ArticleCallout>

        <h2 id="limitations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Limitations of Self-Assessment
        </h2>
        <p className="mb-6">
          Self-report measures have blind spots <Citation id="7" index={7} source="Attachment & Human Development" year="2015" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Avoidant individuals often underreport distress:</strong> Their coping strategy includes minimizing emotions, even to themselves</li>
          <li><strong>Social desirability bias:</strong> You may answer how you think you "should" rather than how you actually behave</li>
          <li><strong>Limited self-awareness:</strong> Some patterns are unconscious and only visible to others</li>
        </ul>
        <p className="mb-6">
          For the most accurate picture, combine self-assessment with feedback from trusted friends or partners, and consider professional evaluation if needed.
        </p>

        <h2 id="what-next" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What to Do With This Information
        </h2>
        <p className="mb-6">
          Identifying your attachment style is the beginning, not the end. Once you recognize your patterns:
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Practice self-compassion:</strong> Your attachment style isn't a flaw---it's an adaptation</li>
          <li><strong>Notice patterns in real-time:</strong> Start recognizing when attachment fears are driving behavior</li>
          <li><strong>Communicate with partners:</strong> Sharing your attachment awareness can reduce misunderstandings</li>
          <li><strong>Seek support if needed:</strong> Therapy, particularly attachment-focused therapy, can accelerate healing</li>
          <li><strong>Choose relationships intentionally:</strong> Recognize which relationship dynamics reinforce vs. challenge insecure patterns</li>
        </ol>

        <ArticleCallout variant="key-takeaway">
          <p>Knowing your attachment style isn't about putting yourself in a box---it's about understanding the invisible forces shaping your relationships so you can make conscious choices instead of automatic reactions.</p>
        </ArticleCallout>

        <h2 id="final-reflection" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Final Reflection Exercise
        </h2>
        <p className="mb-6">
          Take a moment to write down your answers to these questions:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Based on your self-reflection, which attachment style do you most identify with?</li>
          <li>Which specific patterns or behaviors from that style show up most frequently in your life?</li>
          <li>How do these patterns serve you? How do they hold you back?</li>
          <li>What would you like to change about how you connect with others?</li>
        </ul>
        <p className="mb-6">
          Your answers are a roadmap---a starting point for building the relationships you want.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // CAT03-007: Attachment Styles in Friendships
  // ==========================================================================
  {
    id: catId(7),
    slug: 'attachment-styles-in-friendships-not-just-about-romance',
    title: "Attachment Styles in Friendships: It's Not Just About Romance",
    description: "Discover how anxious, avoidant, and disorganized attachment patterns show up in friendships---and why platonic bonds matter just as much.",
    image: "/images/articles/cat03/cover-007.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Friendship', 'Attachment Theory', 'Relationships', 'Social Connection'],
    citations: [
      {
        id: '1',
        text: 'Attachment theory and close friendships: A theoretical review',
        source: 'Personality and Social Psychology Review',
        year: '2011',
        link: 'https://doi.org/10.1177/1088868310383344',
        tier: 1,
      },
      {
        id: '2',
        text: 'Attachment anxiety and avoidance in friendship: Differential patterns',
        source: 'Journal of Social and Personal Relationships',
        year: '2017',
        link: 'https://doi.org/10.1177/0265407516640603',
        tier: 1,
      },
      {
        id: '3',
        text: 'Friendship quality and attachment security across the lifespan',
        source: 'Personal Relationships',
        year: '2019',
        link: 'https://doi.org/10.1111/pere.12274',
        tier: 1,
      },
      {
        id: '4',
        text: "Avoidant attachment and friendship maintenance: Why some people keep friends at arm\'s length",
        source: 'Journal of Research in Personality',
        year: '2016',
        link: 'https://doi.org/10.1016/j.jrp.2016.01.005',
        tier: 1,
      },
      {
        id: '5',
        text: 'Anxious attachment and friendship jealousy: The role of perceived threat',
        source: 'British Journal of Social Psychology',
        year: '2018',
        link: 'https://doi.org/10.1111/bjso.12237',
        tier: 1,
      },
      {
        id: '6',
        text: 'The role of same-sex friendships in attachment security development',
        source: 'Development and Psychopathology',
        year: '2020',
        link: 'https://doi.org/10.1017/S0954579419001214',
        tier: 1,
      },
      {
        id: '7',
        text: 'Friendship dissolution and attachment insecurity',
        source: 'Journal of Social Psychology',
        year: '2015',
        link: 'https://doi.org/10.1080/00224545.2015.1015476',
        tier: 1,
      },
      {
        id: '8',
        text: 'Adult attachment and friendship support: Differential patterns in times of stress',
        source: 'Personality and Individual Differences',
        year: '2021',
        link: 'https://doi.org/10.1016/j.paid.2020.110482',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            When we talk about attachment theory, romantic relationships dominate the conversation. But the patterns you learned in childhood don't just influence who you date---they shape every close relationship in your life, including friendships.
          </p>
          <p className="mb-6">
            The friend who needs constant reassurance that you're not mad at them? The one who pulls away when you try to deepen the bond? The friendship that feels like a roller coaster of intensity and distance? Attachment styles explain these dynamics too <Citation id="1" index={1} source="Personality and Social Psychology Review" year="2011" tier={1} />.
          </p>
        </div>

        <h2 id="why-friendships-matter" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Friendships Matter for Attachment
        </h2>
        <p className="mb-6">
          Friendships serve as attachment bonds throughout life---especially in adolescence and early adulthood when peer relationships often rival or surpass romantic ones in importance <Citation id="6" index={6} source="Development and Psychopathology" year="2020" tier={1} />. Close friends can provide:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>A secure base (someone you can rely on when stressed)</li>
          <li>A safe haven (emotional support and comfort)</li>
          <li>Opportunities to practice vulnerability and trust</li>
          <li>Corrective relational experiences that can shift insecure patterns</li>
        </ul>

        <ArticleCallout variant="did-you-know">
          <p>Research shows that secure friendships in adolescence can buffer against the effects of insecure romantic attachment later in life. Friends aren't just "practice" for romance---they're independently valuable attachment figures.</p>
        </ArticleCallout>

        <h2 id="secure-in-friendship" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Secure Attachment in Friendships
        </h2>
        <p className="mb-6">
          Securely attached individuals approach friendships with trust, balance, and flexibility <Citation id="3" index={3} source="Personal Relationships" year="2019" tier={1} />. They:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Feel comfortable with both closeness and independence</li>
          <li>Can maintain friendships even with long gaps in contact</li>
          <li>Trust that disagreements won't destroy the bond</li>
          <li>Can ask for support without shame or discomfort</li>
          <li>Give friends space without feeling rejected</li>
          <li>Communicate openly when something bothers them</li>
        </ul>
        <p className="mb-6">
          Secure friendships feel stable, low-drama, and nourishing. There's room for both people to grow without the friendship feeling threatened.
        </p>

        <h2 id="anxious-in-friendship" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Anxious Attachment in Friendships
        </h2>
        <p className="mb-6">
          Anxiously attached individuals crave closeness in friendships but worry constantly about being left out, replaced, or forgotten <Citation id="2" index={2} source="Journal of Social and Personal Relationships" year="2017" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Common Patterns
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Overinterpreting silence:</strong> If a friend doesn't respond quickly, you assume you've done something wrong</li>
          <li><strong>Frequent check-ins:</strong> Needing regular contact to feel secure in the friendship</li>
          <li><strong>Friendship jealousy:</strong> Feeling threatened when your friend spends time with others <Citation id="5" index={5} source="British Journal of Social Psychology" year="2018" tier={1} /></li>
          <li><strong>Difficulty with boundaries:</strong> Wanting more closeness than the friend is comfortable with</li>
          <li><strong>Fear of abandonment:</strong> Worrying the friendship will end over small conflicts</li>
          <li><strong>One-sided effort:</strong> Feeling like you're always the one reaching out</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          What It Feels Like
        </h3>
        <p className="mb-6">
          Anxious attachment in friendship often feels like walking on eggshells. You're hyper-aware of shifts in your friend's tone, availability, or mood. Unanswered texts trigger panic. You might over-apologize, seek constant reassurance, or sacrifice your own needs to keep the friend happy.
        </p>

        <ArticleCallout variant="tip">
          <p><strong>For anxiously attached friends:</strong> Before sending that "Are you mad at me?" text, pause. Ask yourself: Is there concrete evidence my friend is upset, or am I responding to a fear? Often, the silence is just life---not rejection.</p>
        </ArticleCallout>

        <h2 id="avoidant-in-friendship" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Avoidant Attachment in Friendships
        </h2>
        <p className="mb-6">
          Avoidantly attached individuals value independence and often keep even close friendships at a controlled distance <Citation id="4" index={4} source="Journal of Research in Personality" year="2016" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Common Patterns
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Surface-level connection:</strong> Keeping conversations light, avoiding deep vulnerability</li>
          <li><strong>Discomfort with neediness:</strong> Feeling drained when friends express emotional needs</li>
          <li><strong>Long gaps in contact:</strong> Comfortable disappearing for weeks or months without checking in</li>
          <li><strong>Reluctance to ask for help:</strong> Handling problems alone rather than leaning on friends</li>
          <li><strong>Difficulty maintaining friendships:</strong> Letting connections fade without much effort to preserve them</li>
          <li><strong>Preference for activity-based friendships:</strong> Easier to connect over shared activities than emotional conversation</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          What It Feels Like
        </h3>
        <p className="mb-6">
          Avoidant individuals often feel suffocated by friends who want "too much" closeness. Emotional conversations feel uncomfortable. They may genuinely care about friends but struggle to express it or make time for connection. Friendships feel most comfortable when they're low-maintenance.
        </p>

        <ArticleCallout variant="tip">
          <p><strong>For avoidantly attached friends:</strong> If you value a friendship, communicate that---even in small ways. A brief "thinking of you" text goes a long way. Your friends can't read your mind, and your silence may be misinterpreted as disinterest.</p>
        </ArticleCallout>

        <h2 id="disorganized-in-friendship" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Disorganized Attachment in Friendships
        </h2>
        <p className="mb-6">
          Disorganized attachment creates the same push-pull dynamic in friendships as in romantic relationships---craving closeness but fearing it.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Common Patterns
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Oscillating between intense closeness and sudden withdrawal</li>
          <li>Testing the friendship (e.g., creating conflict to see if the friend will stay)</li>
          <li>Difficulty trusting even loyal, consistent friends</li>
          <li>Intense reactions to perceived rejection or abandonment</li>
          <li>Chaotic friendships with frequent conflicts and reconciliations</li>
        </ul>

        <p className="mb-6">
          Disorganized attachment in friendship often stems from unresolved trauma. The friend is simultaneously seen as a source of safety and a potential threat.
        </p>

        <h2 id="anxious-avoidant-friendship" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Anxious Meets Avoidant in Friendship
        </h2>
        <p className="mb-6">
          Just like in romantic pairings, anxious and avoidant friends can create a frustrating dynamic:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>The anxious friend pursues more connection</li>
          <li>The avoidant friend feels overwhelmed and withdraws</li>
          <li>The withdrawal triggers the anxious friend's abandonment fears</li>
          <li>The anxious friend pursues harder</li>
          <li>The avoidant friend distances further</li>
        </ul>
        <p className="mb-6">
          Both are in pain, but their coping strategies are incompatible. The anxious friend feels unloved; the avoidant friend feels smothered.
        </p>

        <BeforeAfter
          before={{
            title: 'Unconscious Pattern',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Anxious friend: "Why don't they text back? I must have done something wrong."</li>
                <li>Avoidant friend: "They're too needy. I need space."</li>
                <li>Result: Resentment and misunderstanding on both sides</li>
              </ul>
            ),
          }}
          after={{
            title: 'Conscious Communication',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Anxious friend: "I notice I feel anxious when I don't hear from you. Can we check in once a week?"</li>
                <li>Avoidant friend: "I care about you, but I need solo time to recharge. Weekly check-ins work for me."</li>
                <li>Result: Mutual understanding and negotiated closeness</li>
              </ul>
            ),
          }}
        />

        <h2 id="friendship-breakups" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Attachment and Friendship Breakups
        </h2>
        <p className="mb-6">
          Friendship endings are influenced by attachment patterns <Citation id="7" index={7} source="Journal of Social Psychology" year="2015" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Anxious individuals:</strong> Often devastated by friendship losses, may cling to unhealthy friendships to avoid abandonment</li>
          <li><strong>Avoidant individuals:</strong> May let friendships fade without much emotional processing or closure</li>
          <li><strong>Secure individuals:</strong> Can grieve friendship losses while accepting that some relationships naturally end</li>
          <li><strong>Disorganized individuals:</strong> May experience chaotic breakups or repeatedly break and reconnect</li>
        </ul>

        <h2 id="support-seeking" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Attachment Affects Support-Seeking in Friendships
        </h2>
        <p className="mb-6">
          When stressed, people turn to friends differently based on attachment style <Citation id="8" index={8} source="Personality and Individual Differences" year="2021" tier={1} />:
        </p>

        <ComparisonTable
          title="Support-Seeking by Attachment Style"
          columns={['Style', 'Under Stress', 'Friend\'s Experience']}
          items={[
            { feature: 'Secure', values: ['Openly asks for support', 'Feels trusted and helpful'] },
            { feature: 'Anxious', values: ['Seeks excessive reassurance', 'May feel drained or unable to help enough'] },
            { feature: 'Avoidant', values: ['Handles problems alone', 'May feel shut out or unneeded'] },
            { feature: 'Disorganized', values: ['Oscillates---asks then rejects help', 'Feels confused or rejected'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="healing-through-friendship" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Can Friendships Heal Insecure Attachment?
        </h2>
        <p className="mb-6">
          Yes. Secure friendships can be corrective experiences---proving that closeness is safe, that people can be reliable, and that you're worthy of consistent care <Citation id="6" index={6} source="Development and Psychopathology" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          A friend who:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Shows up consistently over time</li>
          <li>Tolerates your insecurities without abandoning you</li>
          <li>Respects your need for space without taking it personally</li>
          <li>Models healthy communication and boundaries</li>
        </ul>
        <p className="mb-6">
          ...can gradually shift your internal working model toward greater security.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>Friendships aren't inferior to romantic relationships in the attachment system---they're parallel tracks. Healing can happen in platonic bonds just as powerfully as in romantic ones.</p>
        </ArticleCallout>

        <h2 id="practical-steps" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Working With Your Attachment Style in Friendships
        </h2>
        <p className="mb-6">
          <strong>If you're anxiously attached:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Practice tolerating uncertainty without seeking immediate reassurance</li>
          <li>Diversify your support system so no one friend carries all your needs</li>
          <li>Challenge catastrophic thoughts ("They didn't text back" doesn't mean "They hate me")</li>
        </ul>

        <p className="mb-6">
          <strong>If you're avoidantly attached:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Practice small acts of vulnerability with safe friends</li>
          <li>Schedule regular check-ins so friendships don't fade from neglect</li>
          <li>Notice when you're pulling away and explore what triggered it</li>
        </ul>

        <p className="mb-6">
          <strong>If you're disorganized:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Work with a therapist to process trauma underlying your attachment patterns</li>
          <li>Communicate your push-pull tendency to close friends so they understand</li>
          <li>Practice staying present even when the urge to flee arises</li>
        </ul>

        <p className="mb-6">
          Friendships are fertile ground for attachment growth. They're lower-stakes than romantic relationships in some ways, making them safer spaces to practice new patterns. And unlike family, you choose your friends---which means you can intentionally seek out people who help you move toward security.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // CAT03-008: Anxious-Avoidant Trap
  // ==========================================================================
  {
    id: catId(8),
    slug: 'when-two-insecure-attachment-styles-meet-anxious-avoidant-trap',
    title: 'When Two Insecure Attachment Styles Meet: The Anxious-Avoidant Trap',
    description: 'Explore the painful dynamics of anxious-avoidant pairings---why opposites attract, how the pursue-withdraw cycle perpetuates, and paths to breaking free.',
    image: "/images/articles/cat03/cover-008.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Relationship Dynamics', 'Anxious Attachment', 'Avoidant Attachment', 'Conflict'],
    citations: [
      {
        id: '1',
        text: 'The pursuit-withdrawal pattern: A sequential analysis in distressed couples',
        source: 'Journal of Family Psychology',
        year: '2015',
        link: 'https://doi.org/10.1037/fam0000070',
        tier: 1,
      },
      {
        id: '2',
        text: 'Anxious and avoidant attachment in romantic dyads: Interaction patterns and relationship outcomes',
        source: 'Personal Relationships',
        year: '2018',
        link: 'https://doi.org/10.1111/pere.12239',
        tier: 1,
      },
      {
        id: '3',
        text: 'Why opposites attract: Complementary attachment dynamics',
        source: 'Journal of Personality and Social Psychology',
        year: '2016',
        link: 'https://doi.org/10.1037/pspp0000036',
        tier: 1,
      },
      {
        id: '4',
        text: 'Breaking the anxious-avoidant cycle: Intervention strategies from emotionally focused therapy',
        source: 'Journal of Marital and Family Therapy',
        year: '2019',
        link: 'https://doi.org/10.1111/jmft.12362',
        tier: 1,
      },
      {
        id: '5',
        text: 'The role of perceived partner responsiveness in anxious-avoidant relationships',
        source: 'Attachment & Human Development',
        year: '2017',
        link: 'https://doi.org/10.1080/14616734.2017.1330833',
        tier: 1,
      },
      {
        id: '6',
        text: 'Neural synchrony in anxious-avoidant romantic pairs during conflict',
        source: 'Social Cognitive and Affective Neuroscience',
        year: '2020',
        link: 'https://doi.org/10.1093/scan/nsaa112',
        tier: 1,
      },
      {
        id: '7',
        text: 'Demand-withdraw communication and relationship satisfaction: The moderating role of attachment',
        source: 'Communication Monographs',
        year: '2018',
        link: 'https://doi.org/10.1080/03637751.2017.1352104',
        tier: 1,
      },
      {
        id: '8',
        text: 'Can anxious-avoidant couples change? Longitudinal outcomes in couples therapy',
        source: 'Psychotherapy Research',
        year: '2021',
        link: 'https://doi.org/10.1080/10503307.2020.1831098',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            One partner craves closeness but is met with distance. The other values independence but feels pursued relentlessly. The more one seeks connection, the more the other withdraws. The withdrawal triggers more pursuit. The pursuit triggers more withdrawal. Both are in pain, but their pain speaks different languages.
          </p>
          <p className="mb-6">
            This is the anxious-avoidant trap---one of the most common and painful relationship dynamics in modern psychology <Citation id="1" index={1} source="Journal of Family Psychology" year="2015" tier={1} />. It's also one of the most paradoxical: these opposite attachment styles attract each other, yet their core strategies are fundamentally incompatible.
          </p>
        </div>

        <h2 id="why-opposites-attract" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Opposites Attract
        </h2>
        <p className="mb-6">
          Anxious and avoidant individuals are disproportionately drawn to each other---far more than chance would predict <Citation id="3" index={3} source="Journal of Personality and Social Psychology" year="2016" tier={1} />. Why?
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          The Anxious Perspective
        </h3>
        <p className="mb-6">
          Avoidant partners feel like a challenge. Their emotional distance activates the anxious person's attachment system, making the connection feel urgent and meaningful. The difficulty of getting close creates an illusion of depth. When the avoidant partner <em>does</em> show affection, it feels like a victory---intermittent reinforcement that keeps the anxious person hooked.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          The Avoidant Perspective
        </h3>
        <p className="mb-6">
          Anxious partners initially seem warm, emotionally open, and deeply interested---qualities the avoidant person admires but struggles to embody. The anxious partner's willingness to pursue means the avoidant doesn't have to do the emotional heavy lifting. Early on, it feels complementary: 'They bring the closeness I struggle with; I bring the independence they lack."
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>Anxious-avoidant pairings confirm each person's deepest beliefs: the anxious person's fear that love is conditional and requires constant effort, and the avoidant person's belief that closeness is suffocating.</p>
        </ArticleCallout>

        <h2 id="the-pursue-withdraw-cycle" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Pursue-Withdraw Cycle
        </h2>
        <p className="mb-6">
          The core dynamic is a self-perpetuating loop <Citation id="2" index={2} source="Personal Relationships" year="2018" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'The Anxious Partner Seeks Closeness',
              description: (
                <p>
                  Feeling insecure or disconnected, the anxious partner reaches out for reassurance, physical affection, or emotional conversation.
                </p>
              ),
            },
            {
              title: 'The Avoidant Partner Feels Overwhelmed',
              description: (
                <p>
                  The request for closeness triggers the avoidant person's fear of engulfment or loss of autonomy. They withdraw---emotionally, physically, or both.
                </p>
              ),
            },
            {
              title: 'The Anxious Partner Panics',
              description: (
                <p>
                  Withdrawal activates the anxious person's abandonment fears. They pursue harder---more texts, more emotional intensity, more questions.
                </p>
              ),
            },
            {
              title: 'The Avoidant Partner Distances Further',
              description: (
                <p>
                  The increased pursuit feels like pressure. The avoidant partner pulls away even more to protect their sense of self.
                </p>
              ),
            },
            {
              title: 'The Cycle Intensifies',
              description: (
                <p>
                  Each person's coping strategy triggers the other's worst fear, reinforcing the pattern. The anxious person feels unloved; the avoidant person feels controlled.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning">
          <p>This cycle can escalate to the point where both partners are operating in survival mode---the anxious partner in panic, the avoidant partner in shutdown. At this stage, rational communication becomes nearly impossible without intervention.</p>
        </ArticleCallout>

        <h2 id="what-it-looks-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What the Cycle Looks Like in Daily Life
        </h2>
        <p className="mb-6">
          Real-world examples of the anxious-avoidant trap <Citation id="7" index={7} source="Communication Monographs" year="2018" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'texting',
              title: 'The Texting Pattern',
              content: (
                <div>
                  <p className="mb-2"><strong>Anxious:</strong> Sends multiple texts throughout the day.</p>
                  <p className="mb-2"><strong>Avoidant:</strong> Replies hours later with short, minimal responses.</p>
                  <p className="mb-2"><strong>Anxious:</strong> Interprets delay as rejection, sends more texts.</p>
                  <p><strong>Avoidant:</strong> Feels overwhelmed, stops responding or takes even longer.</p>
                </div>
              ),
            },
            {
              id: 'quality-time',
              title: 'The Quality Time Conflict',
              content: (
                <div>
                  <p className="mb-2"><strong>Anxious:</strong> "Why don't we spend more time together? Do you even want to be with me?"</p>
                  <p className="mb-2"><strong>Avoidant:</strong> "We just spent all weekend together. I need some space."</p>
                  <p className="mb-2"><strong>Anxious:</strong> Hears "I don't want to be around you."</p>
                  <p><strong>Avoidant:</strong> Feels smothered and withdraws further.</p>
                </div>
              ),
            },
            {
              id: 'emotional-talk',
              title: "The 'We Need to Talk' Conversation",
              content: (
                <div>
                  <p className="mb-2"><strong>Anxious:</strong> Wants to discuss relationship feelings or concerns.</p>
                  <p className="mb-2"><strong>Avoidant:</strong> Shuts down, says "I'm fine," or physically leaves the room.</p>
                  <p className="mb-2"><strong>Anxious:</strong> Pursues, escalates emotion to get a response.</p>
                  <p><strong>Avoidant:</strong> Goes completely silent or says something dismissive.</p>
                </div>
              ),
            },
            {
              id: 'intimacy',
              title: 'The Intimacy Dance',
              content: (
                <div>
                  <p className="mb-2"><strong>Anxious:</strong> Seeks physical closeness, reassurance, 'I love you's.</p>
                  <p className="mb-2"><strong>Avoidant:</strong> Shows affection sporadically, then pulls back when it feels like "too much."</p>
                  <p className="mb-2"><strong>Anxious:</strong> Clings harder during the pullback.</p>
                  <p><strong>Avoidant:</strong> Becomes even more distant.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="neural-mismatch" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Neural Mismatch
        </h2>
        <p className="mb-6">
          Recent neuroscience research reveals that anxious-avoidant couples show <strong>neural desynchrony</strong> during conflict---their brains are literally not on the same wavelength <Citation id="6" index={6} source="Social Cognitive and Affective Neuroscience" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          When securely attached couples argue, their brains show synchronized activity in regions responsible for empathy and emotional regulation. Anxious-avoidant couples show opposite patterns: one brain activates threat responses while the other deactivates emotional processing.
        </p>

        <h2 id="why-it-persists" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why the Cycle Persists
        </h2>
        <p className="mb-6">
          The anxious-avoidant trap is reinforcing for both parties in painful ways:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Anxious partner:</strong> The difficulty of getting closeness makes the relationship feel intensely meaningful. When the avoidant partner <em>does</em> show affection, it's like a dopamine hit---intermittent reinforcement that keeps them hooked.</li>
          <li><strong>Avoidant partner:</strong> The anxious partner's pursuit confirms their belief that people are demanding and relationships are suffocating. Their withdrawal confirms the anxious partner's belief that love requires constant effort.</li>
        </ul>
        <p className="mb-6">
          Both are re-enacting their earliest attachment wounds---getting exactly what they fear most, which paradoxically feels familiar and therefore "right."
        </p>

        <h2 id="who-suffers-more" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Who Suffers More?
        </h2>
        <p className="mb-6">
          Both suffer, but differently:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Anxious partners:</strong> Experience constant emotional turmoil, anxiety, fear of abandonment, and feelings of unworthiness. They're often the ones seeking therapy or trying to "fix" the relationship.</li>
          <li><strong>Avoidant partners:</strong> May appear less distressed on the surface, but they experience chronic stress from feeling pressured, misunderstood, and unable to meet their partner's needs. Many report feeling like failures in relationships <Citation id="5" index={5} source="Attachment & Human Development" year="2017" tier={1} />.</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>Avoidant individuals often don't realize they're suffering because their coping strategy involves suppressing awareness of emotional pain. But physiological measures (heart rate, cortisol) show they're just as stressed as anxious partners---they just hide it better.</p>
        </ArticleCallout>

        <h2 id="can-it-work" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Can Anxious-Avoidant Relationships Work?
        </h2>
        <p className="mb-6">
          Yes---but only with intentional effort from both partners <Citation id="8" index={8} source="Psychotherapy Research" year="2021" tier={1} />. Research on couples therapy outcomes shows that anxious-avoidant pairs can shift toward greater security, but it requires:
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Mutual awareness of the pattern:</strong> Both people must recognize the pursue-withdraw cycle and their role in it</li>
          <li><strong>Willingness to change:</strong> The anxious partner must work on self-soothing and tolerating uncertainty; the avoidant partner must practice vulnerability and staying present</li>
          <li><strong>Professional support:</strong> Emotionally Focused Therapy (EFT) or attachment-based couples therapy is highly effective for breaking these patterns <Citation id="4" index={4} source="Journal of Marital and Family Therapy" year="2019" tier={1} /></li>
          <li><strong>Patience:</strong> Change is slow and non-linear</li>
        </ol>

        <h2 id="breaking-the-cycle" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Breaking the Cycle: Practical Steps
        </h2>
        <p className="mb-6">
          Both partners must shift their automatic reactions:
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          For the Anxious Partner
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Pause before pursuing:</strong> Notice the urge to text, call, or seek reassurance. Can you sit with the discomfort for 30 minutes?</li>
          <li><strong>Self-soothe:</strong> Develop tools to calm your nervous system without external validation (breathwork, journaling, movement)</li>
          <li><strong>Challenge catastrophic thinking:</strong> "They didn't respond' doesn't mean "They don't love me"</li>
          <li><strong>Communicate needs clearly, not desperately:</strong> "I'd like to schedule a weekly date night' is more effective than "You never spend time with me"</li>
          <li><strong>Respect their need for space:</strong> Giving space doesn't mean you're losing them---it often brings them closer</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          For the Avoidant Partner
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Stay present instead of withdrawing:</strong> Notice the urge to shut down or leave. Can you stay in the conversation for 5 more minutes?</li>
          <li><strong>Name your need for space explicitly:</strong> "I need an hour to myself, then I'd like to talk' is kinder than disappearing</li>
          <li><strong>Practice small acts of vulnerability:</strong> Share one feeling, one fear, one need---start small</li>
          <li><strong>Recognize that your partner's needs aren't attacks:</strong> Requests for closeness aren't attempts to control you</li>
          <li><strong>Initiate closeness occasionally:</strong> Don't always wait for your partner to pursue. Reach out first sometimes</li>
        </ul>

        <BeforeAfter
          before={{
            title: 'The Trap',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Anxious: "Why don't you ever want to talk to me?"</li>
                <li>Avoidant: (Shuts down, leaves room)</li>
                <li>Anxious: (Follows, escalates) "See? You're doing it again!"</li>
                <li>Avoidant: (Total withdrawal)</li>
              </ul>
            ),
          }}
          after={{
            title: 'Breaking Free',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Anxious: "I notice I'm feeling anxious and want reassurance. Can we talk for 10 minutes?"</li>
                <li>Avoidant: "I'm feeling overwhelmed right now. Can we talk in an hour after I take a walk?"</li>
                <li>Anxious: "Yes, that works. Thank you for telling me."</li>
                <li>Avoidant: (Returns in an hour, engages in conversation)</li>
              </ul>
            ),
          }}
        />

        <h2 id="when-to-leave" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Leave
        </h2>
        <p className="mb-6">
          Not all anxious-avoidant relationships should continue. Consider leaving if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Only one partner is willing to work on the pattern</li>
          <li>The relationship has become emotionally or physically abusive</li>
          <li>Your mental health is deteriorating despite your best efforts</li>
          <li>The avoidant partner refuses to engage at all, or the anxious partner's behavior has become controlling</li>
          <li>You've been in couples therapy for months with no progress</li>
        </ul>
        <p className="mb-6">
          Sometimes the healthiest choice is to walk away and find a partner whose attachment style is more compatible with healing.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>The anxious-avoidant trap isn't destiny, but it also isn't easy to break. Both partners must be willing to do the uncomfortable work of changing their automatic responses. If only one person is trying, the cycle will continue.</p>
        </ArticleCallout>

        <h2 id="finding-secure-partners" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Alternative: Choosing Secure Partners
        </h2>
        <p className="mb-6">
          One of the most powerful ways to break the anxious-avoidant trap is to deliberately choose securely attached partners. Secure individuals:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Won't trigger the pursue-withdraw cycle</li>
          <li>Provide consistency that helps anxious partners calm their fears</li>
          <li>Model healthy vulnerability that helps avoidant partners feel safe opening up</li>
          <li>Can tolerate both closeness and independence without panic</li>
        </ul>
        <p className="mb-6">
          Secure partners may feel "boring" at first---especially to anxious individuals used to the adrenaline of the chase, or avoidant individuals used to keeping people at a distance. But with time, that stability can become the foundation for earned security.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // CAT03-009: Earned Secure Attachment
  // ==========================================================================
  {
    id: catId(9),
    slug: 'earned-secure-attachment-how-healing-happens-through-new-relationships',
    title: 'Earned Secure Attachment: How Healing Happens Through New Relationships',
    description: 'Learn how new relational experiences---romantic, therapeutic, or platonic---can help you move from insecure to earned secure attachment.',
    image: "/images/articles/cat03/cover-009.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Earned Security', 'Healing', 'Relationships', 'Growth'],
    citations: [
      {
        id: '1',
        text: 'Earned-security in retrospect: Emerging systematic patterns in understanding of childhood adversity',
        source: 'Development and Psychopathology',
        year: '2018',
        link: 'https://doi.org/10.1017/S095457941800023X',
        tier: 1,
      },
      {
        id: '2',
        text: 'From insecurity to security: The role of corrective relational experiences',
        source: 'Psychotherapy',
        year: '2019',
        link: 'https://doi.org/10.1037/pst0000226',
        tier: 1,
      },
      {
        id: '3',
        text: 'Romantic relationships as secure base for insecurely attached adults: A longitudinal study',
        source: 'Personal Relationships',
        year: '2020',
        link: 'https://doi.org/10.1111/pere.12315',
        tier: 1,
      },
      {
        id: '4',
        text: 'The therapeutic relationship as an attachment bond: Earned security through therapy',
        source: 'Journal of Counseling Psychology',
        year: '2017',
        link: 'https://doi.org/10.1037/cou0000201',
        tier: 1,
      },
      {
        id: '5',
        text: 'Characteristics of earned-secure adults: Reflective functioning and narrative coherence',
        source: 'Attachment & Human Development',
        year: '2019',
        link: 'https://doi.org/10.1080/14616734.2018.1534247',
        tier: 1,
      },
      {
        id: '6',
        text: 'Breaking intergenerational cycles: Earned-secure parents and their children',
        source: 'Child Development',
        year: '2021',
        link: 'https://doi.org/10.1111/cdev.13478',
        tier: 1,
      },
      {
        id: '7',
        text: 'Mentalizing and earned security: The pathway from adversity to resilience',
        source: 'Journal of Personality',
        year: '2020',
        link: 'https://doi.org/10.1111/jopy.12491',
        tier: 1,
      },
      {
        id: '8',
        text: 'The role of safe haven and secure base in attachment change',
        source: 'Clinical Psychology Review',
        year: '2018',
        link: 'https://doi.org/10.1016/j.cpr.2018.09.002',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Your childhood was difficult. Your early relationships taught you that people are unreliable, that closeness is dangerous, or that love is conditional. But now---through therapy, through a secure partner, through years of self-work---you've found a way to trust, to be vulnerable, to believe that you're worthy of consistent care.
          </p>
          <p className="mb-6">
            This is earned secure attachment---one of the most hopeful concepts in attachment research. It means that insecure patterns formed in childhood are not permanent <Citation id="1" index={1} source="Development and Psychopathology" year="2018" tier={1} />. Through new relational experiences, you can build internal working models that weren't available to you as a child.
          </p>
        </div>

        <h2 id="what-is-earned-security" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Earned Secure Attachment?
        </h2>
        <p className="mb-6">
          Earned security refers to individuals who had insecure or traumatic childhoods but now function with secure attachment patterns in adulthood <Citation id="5" index={5} source="Attachment & Human Development" year="2019" tier={1} />. They've processed their early experiences in a way that no longer controls their current relationships.
        </p>
        <p className="mb-6">
          Earned-secure individuals can:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Reflect on difficult childhoods without becoming emotionally dysregulated</li>
          <li>Acknowledge how past patterns influenced them without being bound by them</li>
          <li>Form stable, trusting relationships despite early adversity</li>
          <li>Recognize and interrupt insecure tendencies when they arise</li>
          <li>Parent their own children with secure attachment, breaking intergenerational cycles <Citation id="6" index={6} source="Child Development" year="2021" tier={1} /></li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Earned security is not about pretending your past didn't happen or denying its impact. It's about integrating those experiences into a coherent narrative that no longer dictates your present behavior.</p>
        </ArticleCallout>

        <h2 id="how-it-happens" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Earned Security Develops
        </h2>
        <p className="mb-6">
          Earned security develops through corrective relational experiences---relationships that provide what early caregivers could not <Citation id="2" index={2} source="Psychotherapy" year="2019" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Secure Romantic Relationships
        </h3>
        <p className="mb-6">
          A securely attached partner who provides consistent responsiveness, patience with insecure patterns, and models healthy communication can gradually reshape your internal working model <Citation id="3" index={3} source="Personal Relationships" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          Over time, you learn:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Closeness doesn't always lead to rejection (anxious pattern)</li>
          <li>Vulnerability doesn't always lead to control or harm (avoidant pattern)</li>
          <li>People can be both safe and close (disorganized pattern)</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Therapy as a Secure Base
        </h3>
        <p className="mb-6">
          The therapeutic relationship itself can function as an attachment bond <Citation id="4" index={4} source="Journal of Counseling Psychology" year="2017" tier={1} />. A skilled therapist provides:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Consistency:</strong> Showing up reliably, week after week</li>
          <li><strong>Attunement:</strong> Recognizing and validating emotions</li>
          <li><strong>Non-judgment:</strong> Creating a space where all feelings are acceptable</li>
          <li><strong>Rupture and repair:</strong> Demonstrating that relational mistakes can be fixed</li>
        </ul>
        <p className="mb-6">
          This allows the client to internalize a new template for what relationships can be.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Secure Friendships
        </h3>
        <p className="mb-6">
          Close friendships with securely attached individuals provide practice for vulnerability, trust, and mutual support. These relationships can be less threatening than romantic ones, making them safer spaces to try new relational behaviors.
        </p>

        <h3 className="text-2xl font-display font-semibent text-gray-900 dark:text-white mt-8 mb-4">
          4. Parenting Your Own Children
        </h3>
        <p className="mb-6">
          For some, becoming a parent creates motivation to break intergenerational cycles. The process of providing secure attachment to a child can help heal the parent's own attachment wounds.
        </p>

        <h2 id="key-characteristics" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Characteristics of Earned-Secure Individuals
        </h2>
        <p className="mb-6">
          Research identifies several traits common among those who've achieved earned security <Citation id="5" index={5} source="Attachment & Human Development" year="2019" tier={1} />:
        </p>

        <ComparisonTable
          title="Earned Security vs. Continuous Security"
          columns={['Trait', 'Earned-Secure', 'Continuous-Secure']}
          items={[
            { feature: 'Childhood experiences', values: ['Adverse or insecure', 'Secure and supportive'] },
            { feature: 'Self-awareness', values: ['Often higher (worked for it)', 'May take security for granted'] },
            { feature: 'Compassion for others', values: ['Deep (from lived experience)', 'Present but different origin'] },
            { feature: 'Relationship functioning', values: ['Secure in adulthood', 'Secure in adulthood'] },
            { feature: 'Narrative coherence', values: ['Achieved through reflection', 'Naturally integrated'] },
          ]}
          highlightColumn={0}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Reflective Functioning (Mentalizing)
        </h3>
        <p className="mb-6">
          Earned-secure individuals tend to have strong reflective functioning---the ability to understand their own and others" mental states <Citation id="7" index={7} source="Journal of Personality" year="2020" tier={1} />. They can step back and observe their thoughts and feelings without being consumed by them.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Narrative Coherence
        </h3>
        <p className="mb-6">
          When discussing their past, earned-secure individuals tell coherent stories---not denying the pain, not overly dramatic, but integrated. They can say: "My childhood was hard. My parents struggled. I've worked through it. It shaped me, but it doesn't control me."
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Compassion and Resilience
        </h3>
        <p className="mb-6">
          Having walked the path from insecurity to security, earned-secure individuals often have deep compassion for others" struggles and a realistic understanding of how difficult change can be.
        </p>

        <h2 id="what-it-requires" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Earned Security Requires
        </h2>
        <p className="mb-6">
          Achieving earned security is possible, but it's not easy. It typically requires:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Awareness of Your Patterns',
              description: (
                <p>
                  You can't change what you don't see. Recognizing your attachment style and how it manifests is the first step.
                </p>
              ),
            },
            {
              title: 'Willingness to Feel Discomfort',
              description: (
                <p>
                  Healing means doing the opposite of your automatic reactions---anxious individuals must tolerate space, avoidant individuals must practice vulnerability. This feels deeply unsafe at first.
                </p>
              ),
            },
            {
              title: 'Relational Experiences That Challenge Old Models',
              description: (
                <p>
                  You need repeated experiences of: "I was vulnerable and wasn't rejected" or "I gave them space and they didn't abandon me." One good experience isn't enough---new neural pathways require repetition <Citation id="8" index={8} source="Clinical Psychology Review" year="2018" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Time and Patience',
              description: (
                <p>
                  Earned security doesn't happen overnight. It's a years-long process of small shifts that compound.
                </p>
              ),
            },
            {
              title: 'Often, Professional Support',
              description: (
                <p>
                  While some people achieve earned security through relationships alone, therapy (especially attachment-focused or trauma-focused therapy) significantly accelerates the process.
                </p>
              ),
            },
          ]}
        />

        <h2 id="not-linear" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Path Is Not Linear
        </h2>
        <p className="mb-6">
          Moving toward earned security involves setbacks. Stressful life events (job loss, illness, breakups) can temporarily reactivate old patterns. You might regress to anxious clinging or avoidant withdrawal even after months of progress.
        </p>
        <p className="mb-6">
          This is normal. The difference is that earned-secure individuals:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Notice the regression faster</li>
          <li>Don't catastrophize ("I'm broken forever")</li>
          <li>Have tools to re-regulate</li>
          <li>Can ask for support when needed</li>
          <li>Return to secure functioning more quickly</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>Regression isn't failure---it's information. It tells you that your nervous system is under stress and needs support. The goal isn't to never have insecure moments; it's to move through them with awareness and self-compassion.</p>
        </ArticleCallout>

        <h2 id="role-of-therapy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Role of Therapy in Earning Security
        </h2>
        <p className="mb-6">
          Therapy accelerates the journey to earned security because it provides a controlled, safe relationship where you can practice new patterns <Citation id="4" index={4} source="Journal of Counseling Psychology" year="2017" tier={1} />.
        </p>
        <p className="mb-6">
          Effective therapeutic approaches include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Emotionally Focused Therapy (EFT):</strong> Creates corrective emotional experiences within the therapeutic relationship</li>
          <li><strong>Psychodynamic therapy:</strong> Explores how early attachment wounds show up in current relationships, including with the therapist</li>
          <li><strong>Internal Family Systems (IFS):</strong> Works with protective parts formed during childhood trauma</li>
          <li><strong>EMDR:</strong> Processes traumatic attachment memories to reduce their emotional charge</li>
          <li><strong>Mentalization-Based Therapy:</strong> Builds reflective functioning---the capacity to understand your own and others" mental states</li>
        </ul>

        <h2 id="breaking-cycles" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Breaking Intergenerational Cycles
        </h2>
        <p className="mb-6">
          One of the most profound aspects of earned security is its impact on parenting. Earned-secure parents can provide their children with the attachment experiences they themselves didn't receive <Citation id="6" index={6} source="Child Development" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          Research shows that earned-secure parents:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Raise securely attached children at the same rates as continuous-secure parents</li>
          <li>Are often more intentional and reflective about parenting</li>
          <li>Model resilience and the possibility of change for their children</li>
        </ul>
        <p className="mb-6">
          This means insecure attachment doesn't have to be inherited. You can be the one who breaks the cycle.
        </p>

        <h2 id="practical-steps" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practical Steps Toward Earned Security
        </h2>
        <p className="mb-6">
          If you're working toward earned security:
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Identify your pattern:</strong> Anxious, avoidant, or disorganized? Where does it show up most?</li>
          <li><strong>Understand the origin:</strong> Reflect on your early attachment experiences without judgment</li>
          <li><strong>Notice triggers in real-time:</strong> When do you feel the urge to cling or withdraw?</li>
          <li><strong>Practice opposite actions:</strong> Anxious? Sit with uncertainty. Avoidant? Share something vulnerable.</li>
          <li><strong>Seek secure relationships:</strong> Choose friends and partners who model healthy attachment</li>
          <li><strong>Consider therapy:</strong> Especially if patterns feel overwhelming or deeply rooted in trauma</li>
          <li><strong>Be patient with yourself:</strong> This is long-term work. Celebrate small wins.</li>
          <li><strong>Build reflective capacity:</strong> Journal, meditate, or engage in therapy to strengthen self-awareness</li>
        </ol>

        <ArticleCallout variant="key-takeaway">
          <p>Earned security is proof that your attachment history is not your destiny. With awareness, new relational experiences, and often professional support, you can build the internal security you didn't receive in childhood.</p>
        </ArticleCallout>

        <h2 id="hope" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Message of Hope
        </h2>
        <p className="mb-6">
          Earned security is one of the most hopeful findings in attachment research. It means that early adversity, while impactful, is not deterministic. The brain remains plastic. New relationships can rewire old patterns. You are not forever limited by the caregiving you received---or didn't receive---as a child.
        </p>
        <p className="mb-6">
          The journey requires courage, self-compassion, and the willingness to trust again despite having been hurt. But on the other side is the capacity to love and be loved in ways that once felt impossible.
        </p>
        <p className="mb-6">
          Earned security doesn't erase your past. It integrates it. Your story becomes: "That happened to me. It was hard. I've worked through it. And now I'm building something different."
        </p>
      </>
    ),
  },

  // ==========================================================================
  // CAT03-010: Attachment Theory for Parents
  // ==========================================================================
  {
    id: catId(10),
    slug: 'attachment-theory-for-parents-how-your-style-affects-children',
    title: 'Attachment Theory for Parents: How Your Style Affects Your Children',
    description: 'Understand how your own attachment patterns influence your parenting---and how to build secure attachment with your children regardless of your history.',
    image: "/images/articles/cat03/cover-010.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Parenting', 'Attachment Theory', 'Child Development', 'Family'],
    citations: [
      {
        id: '1',
        text: 'Intergenerational transmission of attachment: A meta-analysis',
        source: 'Psychological Bulletin',
        year: '2018',
        link: 'https://doi.org/10.1037/bul0000180',
        tier: 1,
      },
      {
        id: '2',
        text: 'Parental reflective functioning and the development of infant attachment security',
        source: 'Attachment & Human Development',
        year: '2019',
        link: 'https://doi.org/10.1080/14616734.2018.1547787',
        tier: 1,
      },
      {
        id: '3',
        text: 'Breaking the cycle: Earned-secure parents and their children',
        source: 'Child Development',
        year: '2020',
        link: 'https://doi.org/10.1111/cdev.13344',
        tier: 1,
      },
      {
        id: '4',
        text: 'Sensitive parenting and infant attachment: A meta-analytic review',
        source: 'Developmental Psychology',
        year: '2017',
        link: 'https://doi.org/10.1037/dev0000339',
        tier: 1,
      },
      {
        id: '5',
        text: 'The role of parental mentalizing in the development of reflective functioning in offspring',
        source: 'Development and Psychopathology',
        year: '2018',
        link: 'https://doi.org/10.1017/S0954579417001870',
        tier: 1,
      },
      {
        id: '6',
        text: 'Parental attachment avoidance and child emotional development',
        source: 'Journal of Family Psychology',
        year: '2019',
        link: 'https://doi.org/10.1037/fam0000509',
        tier: 1,
      },
      {
        id: '7',
        text: 'Parental anxiety and overprotection: Impact on child attachment security',
        source: 'Parenting: Science and Practice',
        year: '2021',
        link: 'https://doi.org/10.1080/15295192.2020.1850709',
        tier: 1,
      },
      {
        id: '8',
        text: 'Attachment-based interventions for parents: Effectiveness and mechanisms of change',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101850',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Your attachment style doesn't stay contained in your romantic relationships. It shows up in how you respond when your toddler cries, how you react when your teenager asks for independence, and whether you can tolerate your child's big emotions without shutting down or becoming overwhelmed.
          </p>
          <p className="mb-6">
            Research shows that attachment patterns are often passed from one generation to the next <Citation id="1" index={1} source="Psychological Bulletin" year="2018" tier={1} />. But here's the hopeful part: you don't have to be perfectly secure to raise securely attached children. Awareness, intentionality, and reflective parenting can break intergenerational cycles.
          </p>
        </div>

        <h2 id="transmission" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Attachment Is Transmitted Across Generations
        </h2>
        <p className="mb-6">
          Attachment isn't genetically inherited---it's transmitted through caregiving behaviors. The way you respond to your child's needs shapes their internal working model of relationships <Citation id="4" index={4} source="Developmental Psychology" year="2017" tier={1} />.
        </p>
        <p className="mb-6">
          Key parenting behaviors that build secure attachment:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Sensitivity:</strong> Noticing and responding to your child's cues accurately and promptly</li>
          <li><strong>Consistency:</strong> Being a predictable source of comfort and support</li>
          <li><strong>Emotional availability:</strong> Being present and attuned, not just physically there</li>
          <li><strong>Non-frightening presence:</strong> Never being the source of fear for your child</li>
        </ul>

        <ArticleCallout variant="info">
          <p>You don't need to be perfect. Research shows that parents who are attuned about 50% of the time raise securely attached children. It's the pattern over time---not every interaction---that matters.</p>
        </ArticleCallout>

        <h2 id="secure-parenting" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Securely Attached Parents
        </h2>
        <p className="mb-6">
          Securely attached parents tend to:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Feel comfortable with their child's dependence and independence</li>
          <li>Regulate their own emotions well enough to co-regulate their child</li>
          <li>Respond to distress calmly and confidently</li>
          <li>Tolerate a range of emotions without judgment</li>
          <li>Provide a secure base for exploration and a safe haven for comfort</li>
        </ul>
        <p className="mb-6">
          Their children learn: "My needs matter. The world is safe. I can explore and come back. I'm worthy of love."
        </p>

        <h2 id="anxious-parenting" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Anxiously Attached Parents
        </h2>
        <p className="mb-6">
          Anxiously attached parents often struggle with their child's independence. Their own fear of abandonment can manifest as <Citation id="7" index={7} source="Parenting: Science and Practice" year="2021" tier={1} />:
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Common Patterns
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Overprotection:</strong> Difficulty letting children take age-appropriate risks</li>
          <li><strong>Intrusive care:</strong> Hovering, anticipating needs before the child expresses them</li>
          <li><strong>Using the child for emotional regulation:</strong> Seeking reassurance from the child rather than providing it</li>
          <li><strong>Difficulty with separation:</strong> Becoming anxious when the child shows independence</li>
          <li><strong>Inconsistent availability:</strong> Sometimes smothering, sometimes distracted by their own anxiety</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Impact on Children
        </h3>
        <p className="mb-6">
          Children of anxious parents may:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Develop anxious attachment themselves</li>
          <li>Struggle with autonomy and self-confidence</li>
          <li>Feel responsible for managing their parent's emotions</li>
          <li>Become overly cautious or risk-averse</li>
        </ul>

        <ArticleCallout variant="tip">
          <p><strong>For anxious parents:</strong> Notice the urge to intervene or seek reassurance from your child. Can you pause and let them solve the problem? Can you self-soothe your own anxiety instead of needing your child's presence to calm you?</p>
        </ArticleCallout>

        <h2 id="avoidant-parenting" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Avoidantly Attached Parents
        </h2>
        <p className="mb-6">
          Avoidantly attached parents often feel uncomfortable with emotional needs---both their own and their child's <Citation id="6" index={6} source="Journal of Family Psychology" year="2019" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Common Patterns
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Emotional unavailability:</strong> Difficulty attuning to or validating emotions</li>
          <li><strong>Encouraging premature independence:</strong> Expecting self-reliance before the child is developmentally ready</li>
          <li><strong>Dismissing distress:</strong> "You're fine' or "Don't cry' when the child is upset</li>
          <li><strong>Discomfort with physical affection:</strong> Limited hugs, cuddles, or physical comfort</li>
          <li><strong>Focus on tasks over connection:</strong> Prioritizing achievement, competence, or problem-solving over emotional bonding</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Impact on Children
        </h3>
        <p className="mb-6">
          Children of avoidant parents may:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Develop avoidant attachment themselves</li>
          <li>Suppress emotions and struggle to identify feelings</li>
          <li>Become excessively self-reliant</li>
          <li>Learn that emotional needs are burdensome or unwelcome</li>
        </ul>

        <ArticleCallout variant="tip">
          <p><strong>For avoidant parents:</strong> When your child is upset, resist the urge to fix, minimize, or leave. Practice staying present for 2 minutes. Validate the emotion even if it feels uncomfortable: "I see you're really sad right now."</p>
        </ArticleCallout>

        <h2 id="disorganized-parenting" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Disorganized Attachment and Parenting
        </h2>
        <p className="mb-6">
          Parents with unresolved trauma or disorganized attachment face unique challenges. Their own fear can unconsciously manifest as frightening or frightened behavior toward the child.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Common Patterns
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Unpredictable responses (sometimes comforting, sometimes overwhelming)</li>
          <li>Difficulty regulating their own emotions, leading to outbursts or dissociation</li>
          <li>Role confusion (expecting the child to care for them)</li>
          <li>Fearful or threatening behavior when stressed</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Impact on Children
        </h3>
        <p className="mb-6">
          Children with a disorganized parent face an impossible bind: their source of safety is also their source of fear. This significantly increases risk for disorganized attachment in the child.
        </p>

        <ArticleCallout variant="warning">
          <p>If you have unresolved trauma or recognize disorganized patterns in yourself, working with a trauma-informed therapist is crucial---both for your wellbeing and your child's.</p>
        </ArticleCallout>

        <h2 id="reflective-functioning" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Power of Reflective Functioning
        </h2>
        <p className="mb-6">
          One of the strongest predictors of secure attachment in children is parental reflective functioning (also called mentalizing)---the capacity to understand your child's behavior in terms of their internal mental states <Citation id="2" index={2} source="Attachment & Human Development" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          Reflective parents think:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>"My toddler is hitting because they're frustrated and don't have words yet"</li>
          <li>"My teenager's door-slamming is about feeling overwhelmed, not about hating me"</li>
          <li>"This tantrum is about exhaustion, not manipulation"</li>
        </ul>
        <p className="mb-6">
          This capacity helps parents respond to the underlying need rather than just the behavior <Citation id="5" index={5} source="Development and Psychopathology" year="2018" tier={1} />.
        </p>

        <h2 id="breaking-the-cycle" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Breaking the Cycle: Earned Security in Parenting
        </h2>
        <p className="mb-6">
          The most hopeful finding: parents who've achieved earned security raise securely attached children at the same rates as continuously-secure parents <Citation id="3" index={3} source="Child Development" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          What allows this?
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Processing your own attachment history:</strong> Understanding how your childhood affects your parenting</li>
          <li><strong>Self-awareness:</strong> Noticing when your attachment patterns are triggered</li>
          <li><strong>Conscious choice:</strong> Interrupting automatic reactions and choosing different responses</li>
          <li><strong>Seeking support:</strong> Therapy, parenting groups, or secure co-parent</li>
          <li><strong>Self-compassion:</strong> Forgiving yourself for inevitable mistakes</li>
        </ul>

        <h2 id="practical-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practical Strategies by Attachment Style
        </h2>

        <ArticleTabs
          tabs={[
            {
              id: 'anxious-parent',
              label: 'Anxious',
              content: (
                <div>
                  <p className="mb-4"><strong>If you're anxiously attached:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Practice tolerating your child's independence without intervening</li>
                    <li>Notice when you're seeking reassurance from your child ('Do you still love Mommy?")</li>
                    <li>Build your own support network so your child isn't your primary emotional regulator</li>
                    <li>Let your child solve age-appropriate problems before stepping in</li>
                    <li>Remind yourself: "Their independence doesn't mean they don't need me"</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'avoidant-parent',
              label: 'Avoidant',
              content: (
                <div>
                  <p className="mb-4"><strong>If you're avoidantly attached:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Practice staying present when your child is emotional (count to 60, don't leave)</li>
                    <li>Validate emotions even when they feel foreign: "You're really upset. That makes sense."</li>
                    <li>Initiate physical affection even when it feels awkward (hugs, cuddles)</li>
                    <li>Ask about feelings, not just facts ("How did that make you feel?" not just "What happened?")</li>
                    <li>Remind yourself: "Their emotions aren't a burden---they're information"</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'disorganized-parent',
              label: 'Disorganized',
              content: (
                <div>
                  <p className="mb-4"><strong>If you have disorganized attachment:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Work with a trauma-informed therapist to process your own history</li>
                    <li>Build awareness of when you're dysregulated (before it escalates to frightening behavior)</li>
                    <li>Have a plan for when you're overwhelmed (safe person to call, cooling-off strategies)</li>
                    <li>Practice self-compassion---you're breaking a cycle, and that's hard work</li>
                    <li>Consider attachment-based parenting programs designed for trauma survivors <Citation id="8" index={8} source="Clinical Psychology Review" year="2020" tier={1} /></li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2 id="age-specific-tips" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Age-Specific Attachment Parenting
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Infants (0-12 months)
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Respond consistently to cries (you cannot "spoil" an infant)</li>
          <li>Provide physical comfort and proximity</li>
          <li>Attune to their cues (tired, hungry, overstimulated)</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Toddlers (1-3 years)
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Be a secure base for exploration (they check back for your presence)</li>
          <li>Name emotions: "You're feeling frustrated because the tower fell"</li>
          <li>Provide consistent routines and boundaries</li>
          <li>Stay calm during tantrums (they need co-regulation, not punishment)</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          School Age (4-12 years)
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Encourage independence while remaining available for support</li>
          <li>Listen without immediately problem-solving</li>
          <li>Validate all emotions, set limits on behaviors</li>
          <li>Model healthy conflict resolution and emotion regulation</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Adolescents (13-18 years)
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Respect growing autonomy while staying connected</li>
          <li>Don't take rejection or distancing personally (it's developmentally normal)</li>
          <li>Remain a safe haven even when they seem not to need you</li>
          <li>Model that adults can apologize and repair when they mess up</li>
        </ul>

        <h2 id="repair" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Importance of Repair
        </h2>
        <p className="mb-6">
          You will mess up. You'll yell when you meant to stay calm. You'll dismiss your child's feelings when you're tired. You'll let your own attachment fears drive your reactions.
        </p>
        <p className="mb-6">
          This is inevitable and, crucially, not catastrophic. What matters more than perfection is <strong>repair</strong>:
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Acknowledge the rupture: "I yelled, and that wasn't okay"</li>
          <li>Take responsibility: "That was about me being stressed, not about you"</li>
          <li>Repair the connection: "I'm sorry. You deserved better. I love you"</li>
        </ol>
        <p className="mb-6">
          Children who see their parents repair mistakes learn that relationships can withstand conflict, that people can change, and that they're worthy of apologies.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>Secure attachment isn't built through perfect parenting---it's built through good-enough parenting with consistent repair. Show up, attune most of the time, and apologize when you miss the mark.</p>
        </ArticleCallout>

        <h2 id="seeking-support" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Support
        </h2>
        <p className="mb-6">
          Consider parent-focused therapy or attachment-based parenting programs if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You recognize patterns from your own childhood playing out with your children</li>
          <li>You feel overwhelmed by your child's emotions</li>
          <li>You have unresolved trauma that's affecting your parenting</li>
          <li>Your child is showing signs of insecure attachment (extreme clinginess, total avoidance, chaotic behavior)</li>
          <li>You're struggling with postpartum depression or anxiety</li>
        </ul>
        <p className="mb-6">
          Interventions like Circle of Security Parenting or attachment-focused family therapy can make a significant difference <Citation id="8" index={8} source="Clinical Psychology Review" year="2020" tier={1} />.
        </p>

        <h2 id="final-word" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Final Word
        </h2>
        <p className="mb-6">
          Your attachment history doesn't have to become your child's. With awareness, intentional effort, and self-compassion, you can provide the security you may not have received.
        </p>
        <p className="mb-6">
          Parenting is the ultimate opportunity for earned security---for you and for your child. Every moment you pause before reacting, every time you repair after a mistake, every instance you stay present with discomfort, you're breaking the cycle.
        </p>
        <p className="mb-6">
          Your children don't need perfection. They need a parent who's trying, who's reflective, and who's willing to grow alongside them.
        </p>
      </>
    ),
  },
];
