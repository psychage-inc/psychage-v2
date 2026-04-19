 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_RELATIONSHIPS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ComparisonTable,
  ArticleAccordion,
  ProgressSteps,
  BeforeAfter,
  QuoteBlock,
} from '../../../components/article/blocks';

export const communicationSkillsArticlesB: Article[] = [
  // ==========================================================================
  // CAT03-026: Why 'I' Statements Work
  // ==========================================================================
  {
    id: catId(26),
    slug: 'why-i-statements-work-taking-ownership-of-your-experience',
    status: 'draft',
    title: "Why 'I' Statements Work: Taking Ownership of Your Experience",
    description: `Learn why "I feel..." is more effective than "You always..." and how to use I-statements to reduce defensiveness in tough conversations.`,
    image: "/images/articles/cat03/cover-026.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Communication', 'I-Statements', 'Conflict Resolution', 'Assertiveness'],
    citations: [
      { id: '1', text: 'I-statements vs. you-statements in conflict resolution', source: 'Communication Monographs', year: '2019', link: 'https://doi.org/10.1080/03637751.2018.1547.737', tier: 1 },
      { id: '2', text: 'Language framing and defensiveness in relationships', source: 'Journal of Social and Personal Relationships', year: '2020', link: 'https://doi.org/10.1177/0265407519900458', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            "You never listen!", "You always make everything about you!", "You're so inconsiderate!" These accusations trigger instant defensiveness. The conversation devolves into a blame war. Nobody wins.
          </p>
          <p className="mb-6">
            I-statements offer a different approach. Instead of blaming, they express your feelings and needs <Citation id="1" index={1} source="Communication Monographs" year="2019" tier={1} />. This simple shift dramatically changes the tone of difficult conversations.
          </p>
        </div>

        <h2 id="formula" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The I-Statement Formula
        </h2>
        <p className="mb-6">
          <strong>"I feel [emotion] when [behavior] because [reason/need]."</strong>
        </p>
        <p className="mb-6">
          <strong>Example:</strong> "I feel hurt when you cancel plans last minute because I value quality time together and made space in my schedule."
        </p>

        <ComparisonTable
          title="You-Statements vs. I-Statements"
          columns={['You-Statement (Blaming)', 'I-Statement (Owning)']}
          items={[
            { feature: 'Lateness', values: ["You're always late!", 'I feel frustrated when you arrive late because I value punctuality.'] },
            { feature: 'Phone use', values: ["You're addicted to your phone!", 'I feel disconnected when you check your phone during dinner.'] },
            { feature: 'Listening', values: ["You never listen to me!", "I feel unheard when I'm interrupted mid-sentence."] },
            { feature: 'Help', values: ['You never help!', 'I feel overwhelmed when I handle all the chores alone.'] },
          ]}
          highlightColumn={1}
        />

        <h2 id="why-it-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why I-Statements Work
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Reduces defensiveness:</strong> "I feel hurt" is harder to argue with than "You hurt me" <Citation id="2" index={2} source="Journal of Social and Personal Relationships" year="2020" tier={1} /></li>
          <li><strong>Takes ownership:</strong> You're responsible for your feelings, they're responsible for their actions</li>
          <li><strong>Invites empathy:</strong> Sharing your feelings creates connection, not conflict</li>
          <li><strong>Focuses on impact, not intent:</strong> You're describing how you feel, not accusing them of malicious intent</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>I-statements don't guarantee the other person will respond perfectly. But they increase the odds of a productive conversation instead of a fight.</p>
        </ArticleCallout>

        <h2 id="common-mistakes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Mistakes
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Fake I-Statements
        </h3>
        <p className="mb-6">
          <strong>Wrong:</strong> "I feel like you're being selfish." (This is still a you-statement disguised as an I-statement)
        </p>
        <p className="mb-6">
          <strong>Right:</strong> "I feel disappointed when plans change without discussion."
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Adding "But" After
        </h3>
        <p className="mb-6">
          <strong>Wrong:</strong> "I feel hurt when you cancel, but you always do this!" (The "but" turns it back into an accusation)
        </p>
        <p className="mb-6">
          <strong>Right:</strong> "I feel hurt when you cancel. Can we talk about how to handle schedule changes?"
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Using "I Feel" for Thoughts
        </h3>
        <p className="mb-6">
          <strong>Wrong:</strong> "I feel like you don't care." (This is a thought, not a feeling)
        </p>
        <p className="mb-6">
          <strong>Right:</strong> "I feel lonely." or "I feel sad."
        </p>

        <h2 id="practice" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practice Scenarios
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'scenario-1',
              title: 'Partner forgets important date',
              content: (
                <div>
                  <p className="mb-2"><strong>You-statement:</strong> "You forgot our anniversary! You don't care about me!"</p>
                  <p><strong>I-statement:</strong> "I feel hurt that our anniversary was forgotten because it's important to me and I wanted us to celebrate together."</p>
                </div>
              ),
            },
            {
              id: 'scenario-2',
              title: 'Friend cancels plans again',
              content: (
                <div>
                  <p className="mb-2"><strong>You-statement:</strong> "You're so flaky! You never keep plans!"</p>
                  <p><strong>I-statement:</strong> "I feel disappointed when plans are canceled because I look forward to our time together and rearrange my schedule to make it work."</p>
                </div>
              ),
            },
            {
              id: 'scenario-3',
              title: 'Colleague takes credit',
              content: (
                <div>
                  <p className="mb-2"><strong>You-statement:</strong> "You stole my idea and presented it as your own!"</p>
                  <p><strong>I-statement:</strong> "I feel frustrated when my contributions aren't acknowledged because I worked hard on that idea and need recognition for my work."</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="final-thoughts" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Final Thoughts
        </h2>
        <p className="mb-6">
          I-statements aren't magic. They won't fix a relationship with someone who doesn't care about your feelings. But they give healthy communication a chance. They transform blame into vulnerability, accusation into honesty.
        </p>
        <p className="mb-6">
          Start using them. It'll feel awkward at first. With practice, it becomes natural---and your conversations become far more productive.
        </p>

        <QuoteBlock
          quote="Between stimulus and response there is a space. In that space is our power to choose our response."
          attribution="Viktor Frankl"
          role="Psychiatrist and Author"
          source="Man's Search for Meaning"
          variant="default"
        />
      </>
    ),
  },

  // ==========================================================================
  // CAT03-027: Communication Styles
  // ==========================================================================
  {
    id: catId(27),
    slug: 'communication-styles-passive-aggressive-passive-aggressive-assertive',
    status: 'draft',
    title: 'Communication Styles: Passive, Aggressive, Passive-Aggressive, and Assertive',
    description: 'Identify your default communication style and learn why assertive communication builds healthier relationships than the other three.',
    image: "/images/articles/cat03/cover-027.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Communication', 'Assertiveness', 'Conflict Resolution', 'Relationships'],
    citations: [
      { id: '1', text: 'Communication styles and relationship outcomes', source: 'Journal of Social Psychology', year: '2020', link: 'https://doi.org/10.1080/00224545.2019.1687936', tier: 1 },
      { id: '2', text: 'Passive-aggressive communication and workplace conflict', source: 'Organizational Behavior and Human Decision Processes', year: '2019', link: 'https://doi.org/10.1016/j.obhdp.2019.03.007', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            How you communicate shapes every relationship in your life. There are four main styles: passive, aggressive, passive-aggressive, and assertive. Most people default to one---often without realizing it.
          </p>
          <p className="mb-6">
            Only one style consistently leads to healthy, respectful relationships <Citation id="1" index={1} source="Journal of Social Psychology" year="2020" tier={1} />. The others create resentment, misunderstanding, or conflict. Here's how to identify your style and shift toward assertiveness.
          </p>
        </div>

        <h2 id="four-styles" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Four Communication Styles
        </h2>

        <ComparisonTable
          title="Communication Styles Comparison"
          columns={['Style', 'Core Belief', 'Result']}
          items={[
            { feature: 'Passive', values: ['My needs don\'t matter', 'Resentment, feeling walked over'] },
            { feature: 'Aggressive', values: ['My needs matter MORE than yours', 'Conflict, damaged relationships'] },
            { feature: 'Passive-Aggressive', values: ['I can\'t express needs directly', 'Confusion, distrust'] },
            { feature: 'Assertive', values: ['Both our needs matter', 'Respect, healthy boundaries'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="passive" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          1. Passive Communication
        </h2>
        <p className="mb-6">
          Passive communicators avoid conflict at all costs. They suppress their needs, agree when they want to say no, and let others walk over them.
        </p>
        <p className="mb-6">
          <strong>What it sounds like:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>"I don't care, whatever you want."</li>
          <li>"It's fine." (when it's not fine)</li>
          <li>"I guess so..." (reluctant agreement)</li>
          <li>Silence when upset</li>
        </ul>
        <p className="mb-6">
          <strong>Body language:</strong> Avoiding eye contact, slouched posture, soft/quiet voice, nervous fidgeting
        </p>
        <p className="mb-6">
          <strong>Why people use it:</strong> Fear of rejection, conflict avoidance, people-pleasing, low self-worth
        </p>
        <p className="mb-6">
          <strong>The cost:</strong> Chronic resentment, feeling invisible, relationships where you're taken for granted, burnout from overextending
        </p>

        <h2 id="aggressive" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          2. Aggressive Communication
        </h2>
        <p className="mb-6">
          Aggressive communicators prioritize their needs over everyone else's. They demand, interrupt, blame, and dominate conversations.
        </p>
        <p className="mb-6">
          <strong>What it sounds like:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>"You're wrong. End of discussion."</li>
          <li>"Do what I say or else."</li>
          <li>"That's a stupid idea."</li>
          <li>Yelling, name-calling, threats</li>
        </ul>
        <p className="mb-6">
          <strong>Body language:</strong> Pointing, invading personal space, loud voice, clenched fists, glaring
        </p>
        <p className="mb-6">
          <strong>Why people use it:</strong> Learned behavior, need for control, defensiveness, underlying insecurity masked by dominance
        </p>
        <p className="mb-6">
          <strong>The cost:</strong> Damaged relationships, people fear or avoid you, loneliness despite outward dominance, guilt after outbursts
        </p>

        <h2 id="passive-aggressive" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          3. Passive-Aggressive Communication
        </h2>
        <p className="mb-6">
          Passive-aggressive communicators express anger or frustration indirectly. They say "fine" but act angry. They agree but then sabotage <Citation id="2" index={2} source="Organizational Behavior and Human Decision Processes" year="2019" tier={2} />.
        </p>
        <p className="mb-6">
          <strong>What it sounds like:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>"Sure, I'll do it." [doesn't do it]</li>
          <li>"I'm not mad." [clearly mad]</li>
          <li>Sarcasm: "Oh great, another meeting. Can't wait."</li>
          <li>Silent treatment</li>
          <li>Backhanded compliments</li>
        </ul>
        <p className="mb-6">
          <strong>Body language:</strong> Smiling while upset, muttering under breath, exaggerated sighs, eye rolls
        </p>
        <p className="mb-6">
          <strong>Why people use it:</strong> Learned that direct anger is unacceptable, fear of confrontation but unable to suppress all frustration
        </p>
        <p className="mb-6">
          <strong>The cost:</strong> Nobody trusts you, chronic misunderstandings, resentment builds on both sides, relationships deteriorate slowly
        </p>

        <ArticleCallout variant="warning">
          <p>Passive-aggressive communication is the most toxic style because it creates confusion and distrust. Others can sense your anger but you deny it, leaving them feeling gaslit.</p>
        </ArticleCallout>

        <h2 id="assertive" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          4. Assertive Communication (The Goal)
        </h2>
        <p className="mb-6">
          Assertive communicators express their needs clearly and respectfully while also respecting others" needs. They're honest, direct, and calm.
        </p>
        <p className="mb-6">
          <strong>What it sounds like:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>"I understand your perspective. Here's mine."</li>
          <li>"I'm not comfortable with that. Can we find another option?"</li>
          <li>"I need to leave by 5 PM today."</li>
          <li>"That doesn't work for me, but I'd be open to..."</li>
        </ul>
        <p className="mb-6">
          <strong>Body language:</strong> Steady eye contact, relaxed posture, calm/clear voice, open gestures
        </p>
        <p className="mb-6">
          <strong>Why it works:</strong> Balances self-respect with respect for others, reduces conflict, builds trust, models healthy communication
        </p>
        <p className="mb-6">
          <strong>The result:</strong> Healthier relationships, less resentment, clearer boundaries, mutual respect
        </p>

        <h2 id="identifying-yours" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Identifying Your Default Style
        </h2>
        <p className="mb-6">
          Most people use different styles in different contexts:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Passive at work, aggressive at home:</strong> Suppress all day, explode at safe targets</li>
          <li><strong>Assertive with friends, passive with family:</strong> Old family dynamics are hardest to change</li>
          <li><strong>Passive-aggressive when angry:</strong> Direct expression feels unsafe</li>
        </ul>
        <p className="mb-6">
          <strong>Reflect:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>When was the last time I said "yes" but meant "no"? (Passive)</li>
          <li>When did I raise my voice, interrupt, or blame someone? (Aggressive)</li>
          <li>When did I give silent treatment or make a sarcastic dig? (Passive-Aggressive)</li>
          <li>When did I clearly state my needs while respecting theirs? (Assertive)</li>
        </ul>

        <h2 id="shifting-to-assertive" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Shift Toward Assertiveness
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Recognize Your Pattern',
              description: <p>Notice when you default to passive, aggressive, or passive-aggressive communication.</p>,
            },
            {
              title: 'Pause Before Responding',
              description: <p>Give yourself a moment to choose a response instead of reacting automatically.</p>,
            },
            {
              title: "Use 'I' Statements",
              description: <p>"I feel..." instead of "You always..." shifts from blame to honesty.</p>,
            },
            {
              title: 'State Your Needs Clearly',
              description: <p>Don't hint, don't expect mind-reading. Say what you want directly.</p>,
            },
            {
              title: 'Respect Their Perspective Too',
              description: <p>Assertiveness isn't selfishness. Acknowledge their needs while expressing yours.</p>,
            },
          ]}
        />

        <h2 id="examples" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Same Situation, Four Styles
        </h2>

        <p className="mb-6">
          <strong>Situation:</strong> Your roommate leaves dirty dishes in the sink for days.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Passive:</strong> Say nothing, wash their dishes, silently resent them</li>
          <li><strong>Aggressive:</strong> "You're disgusting! Clean up your mess or get out!"</li>
          <li><strong>Passive-Aggressive:</strong> Leave a note: "Some people don't care about cleanliness." Slam cabinets loudly.</li>
          <li><strong>Assertive:</strong> "Hey, I notice the dishes have been piling up. Can we agree to wash our own dishes daily? It'd really help me feel better about our shared space."</li>
        </ul>

        <QuoteBlock
          quote="Assertiveness is not what you do, it's who you are."
          attribution="Shakti Gawain"
          role="Author"
          source="Creative Visualization"
          variant="default"
        />

        <p className="mb-6">
          Assertiveness is a skill. If you've spent years being passive or aggressive, it won't feel natural at first. That's okay. Start small. Practice. Over time, assertive communication becomes your new default---and your relationships transform.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // CAT03-028: How to Give Feedback
  // ==========================================================================
  {
    id: catId(28),
    slug: 'how-to-give-feedback-without-triggering-defensiveness',
    status: 'draft',
    title: 'How to Give Feedback Without Triggering Defensiveness',
    description: 'Master the art of delivering constructive feedback that people can actually hear and act on---without making them defensive or angry.',
    image: "/images/articles/cat03/cover-028.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Feedback', 'Communication', 'Conflict Resolution', 'Relationships'],
    citations: [
      { id: '1', text: 'Effective feedback delivery and reception', source: 'Journal of Applied Psychology', year: '2020', link: 'https://doi.org/10.1037/apl0000463', tier: 1 },
      { id: '2', text: 'Defensiveness as a barrier to feedback acceptance', source: 'Organizational Behavior and Human Decision Processes', year: '2019', link: 'https://doi.org/10.1016/j.obhdp.2018.11.003', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Giving feedback is one of the hardest communication skills. Too harsh, and they shut down. Too soft, and they don't take it seriously. Most people avoid feedback entirely---then let resentment build until they explode.
          </p>
          <p className="mb-6">
            There's a better way. Research shows specific techniques dramatically improve how feedback is received <Citation id="1" index={1} source="Journal of Applied Psychology" year="2020" tier={1} />. Here's how to deliver it effectively.
          </p>
        </div>

        <h2 id="why-feedback-fails" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Feedback Often Fails
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>It's given when you're angry:</strong> Emotions turn feedback into attacks</li>
          <li><strong>It's vague:</strong> 'Be more professional' doesn't tell them what to change</li>
          <li><strong>It's a character assassination:</strong> "You're lazy' vs. "This task wasn't completed on time"</li>
          <li><strong>It triggers defensiveness:</strong> When people feel attacked, they can't hear the message <Citation id="2" index={2} source="Organizational Behavior and Human Decision Processes" year="2019" tier={1} /></li>
        </ul>

        <h2 id="framework" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The SBI Framework
        </h2>
        <p className="mb-6">
          <strong>Situation → Behavior → Impact</strong>
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: '1. Situation',
              description: <p>Describe when and where the behavior happened. Be specific.</p>,
            },
            {
              title: '2. Behavior',
              description: <p>State the observable behavior---what they did or said, not your interpretation of it.</p>,
            },
            {
              title: '3. Impact',
              description: <p>Explain how it affected you, the team, or the project. Use 'I' statements.</p>,
            },
          ]}
        />

        <p className="mb-6">
          <strong>Example:</strong> "In yesterday's meeting (situation), when you interrupted me twice while I was presenting (behavior), I felt dismissed and had trouble finishing my thoughts (impact)."
        </p>

        <h2 id="principles" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Principles
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Be Timely
        </h3>
        <p className="mb-6">
          Give feedback soon after the behavior (within 24-48 hours), while it's fresh but after emotions have cooled.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Be Specific
        </h3>
        <p className="mb-6">
          <strong>Vague:</strong> "You need to communicate better."
        </p>
        <p className="mb-6">
          <strong>Specific:</strong> "When you didn't respond to my email for three days, I didn't know if the project was on track."
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Focus on Behavior, Not Character
        </h3>
        <p className="mb-6">
          <strong>Character attack:</strong> "You're so disorganized."
        </p>
        <p className="mb-6">
          <strong>Behavior-focused:</strong> "The report had several sections out of order."
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Make It a Two-Way Conversation
        </h3>
        <p className="mb-6">
          After sharing feedback, ask for their perspective: "How do you see it?" or "What got in the way?"
        </p>

        <h2 id="sandwich-myth" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The "Feedback Sandwich" Myth
        </h2>
        <p className="mb-6">
          You've probably heard: "Start with something positive, give the criticism, end with something positive."
        </p>
        <p className="mb-6">
          <strong>Why it fails:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>People learn to distrust your positive comments ("Here comes the "but'...')</li>
          <li>The real message gets diluted</li>
          <li>It feels manipulative</li>
        </ul>
        <p className="mb-6">
          <strong>Instead:</strong> Be direct and kind. If you have genuine positive feedback, give it separately---don't use it as a buffer for criticism.
        </p>

        <ArticleCallout variant="tip">
          <p>Ratio matters: Aim for 5 positive interactions for every 1 negative/corrective one. But deliver them authentically, not as a sandwich.</p>
        </ArticleCallout>

        <h2 id="scripts" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Scripts for Common Feedback Scenarios
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Work Performance
        </h3>
        <p className="mb-6">
          "I noticed the last two reports had missing data in the summary section. This creates extra work for the team to track down those numbers. Can we talk about what's causing this and how to prevent it?"
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Relationship Issue
        </h3>
        <p className="mb-6">
          "When you check your phone during dinner, I feel disconnected from you. I'd really value having phone-free time together. Can we try putting phones away during meals?"
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Friend Crossing a Boundary
        </h3>
        <p className="mb-6">
          "When you share details about my personal life with others without asking, I feel like my privacy is being violated. Going forward, I need you to check with me before sharing information about me."
        </p>

        <h2 id="difficult-feedback" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Giving Really Hard Feedback
        </h2>
        <p className="mb-6">
          When feedback is serious (poor hygiene, offensive behavior, major performance issues):
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Choose privacy:</strong> Never embarrass someone publicly</li>
          <li><strong>Lead with empathy:</strong> "This is an uncomfortable conversation for both of us."</li>
          <li><strong>Be direct:</strong> Don't sugarcoat or dance around it</li>
          <li><strong>Explain impact:</strong> Why this matters</li>
          <li><strong>Offer support:</strong> "What can I do to help you address this?"</li>
        </ol>

        <BeforeAfter
          before={{
            title: 'Poor Delivery',
            content: <p>'Dude, you smell. Take a shower."</p>,
          }}
          after={{
            title: 'Compassionate but Direct',
            content: <p>"This is uncomfortable to bring up. I've noticed a body odor issue that's been mentioned by others. I wanted to tell you privately because I care about you. Is everything okay? Is there anything I can do to help?"</p>,
          }}
        />

        <h2 id="receiving-feedback" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Bonus: Receiving Feedback Well
        </h2>
        <p className="mb-6">
          If you want others to give you honest feedback, make it safe:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Don't interrupt or defend:</strong> Listen fully first</li>
          <li><strong>Ask clarifying questions:</strong> "Can you give me an example?"</li>
          <li><strong>Thank them:</strong> "I appreciate you telling me this."</li>
          <li><strong>Reflect before responding:</strong> You don't have to respond immediately</li>
          <li><strong>Act on it (if valid):</strong> Show that feedback leads to change</li>
        </ul>

        <QuoteBlock
          quote="Feedback is a gift. Ideas are the currency of our next success. Let people see you value both feedback and ideas."
          attribution="Jim Trinka and Les Wallace"
          role="Authors"
          source="The Elephant and the Mouse"
          variant="default"
        />

        <p className="mb-6">
          Feedback doesn't have to be painful. When delivered with clarity, empathy, and respect, it strengthens relationships rather than damaging them. It's not about being nice---it's about being clear and kind at the same time.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // CAT03-029: The Art of Apology
  // ==========================================================================
  {
    id: catId(29),
    slug: 'the-art-of-apology-what-makes-im-sorry-actually-work',
    status: 'draft',
    title: "The Art of Apology: What Makes 'I'm Sorry' Actually Work",
    description: "Learn the components of a genuine apology and why most apologies fail---plus scripts for making amends that actually repair relationships.",
    image: "/images/articles/cat03/cover-029.svg",
    category: CATEGORY_RELATIONSHIPS,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Apology', 'Repair', 'Communication', 'Relationships'],
    citations: [
      { id: '1', text: 'The psychology of effective apologies', source: 'Negotiation and Conflict Management Research', year: '2020', link: 'https://doi.org/10.1111/ncmr.12169', tier: 1 },
      { id: '2', text: 'Apology components and forgiveness', source: 'Journal of Social Psychology', year: '2019', link: 'https://doi.org/10.1080/00224545.2018.1536698', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            "I'm sorry you feel that way.", "I'm sorry, but...", "I said I'm sorry! What more do you want?" These aren't apologies. They're defenses disguised as remorse.
          </p>
          <p className="mb-6">
            A genuine apology is one of the most powerful repair tools in relationships <Citation id="1" index={1} source="Negotiation and Conflict Management Research" year="2020" tier={1} />. But most people don't know how to do it. Here's what actually works.
          </p>
        </div>

        <h2 id="components" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The 6 Components of a Real Apology
        </h2>
        <p className="mb-6">
          Research identifies six elements that make apologies effective <Citation id="2" index={2} source="Journal of Social Psychology" year="2019" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            { title: '1. Expression of Regret', description: <p>"I'm sorry"</p> },
            { title: '2. Explanation (Not Excuse)', description: <p>"Here's what happened' (briefly, without justifying)</p> },
            { title: '3. Acknowledgment of Responsibility', description: <p>'I was wrong' or "That was my fault"</p> },
            { title: '4. Declaration of Repentance', description: <p>"I shouldn't have done that"</p> },
            { title: '5. Offer of Repair', description: <p>'How can I make this right?"</p> },
            { title: '6. Request for Forgiveness', description: <p>'Can you forgive me?" (optional)</p> },
          ]}
        />

        <p className="mb-6">
          <strong>You don't need all six every time</strong>, but the more you include, the stronger the apology.
        </p>

        <h2 id="what-real-apology-looks-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What a Real Apology Looks Like
        </h2>
        <p className="mb-6">
          <strong>Example:</strong> You forgot your partner's birthday.
        </p>
        <p className="mb-6">
          "I'm so sorry I forgot your birthday (regret). I got overwhelmed at work and it completely slipped my mind (explanation, not excuse). That was thoughtless and hurtful (responsibility). You deserve better than that (repentance). I'd like to take you to dinner this weekend to celebrate properly. Would that help make up for it? (repair). I understand if you're still upset, but I hope you can forgive me (request for forgiveness)."
        </p>

        <h2 id="non-apologies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Non-Apologies
        </h2>

        <ComparisonTable
          title="Non-Apology vs. Real Apology"
          columns={['Non-Apology (Deflecting)', 'Real Apology (Owning It)']}
          items={[
            { feature: "I'm sorry you feel that way", values: ['Blames their feelings', "I'm sorry I hurt you"] },
            { feature: "I'm sorry, but you...", values: ['Shifts blame to them', "I'm sorry. That was wrong of me."] },
            { feature: 'Mistakes were made', values: ['Passive, no ownership', 'I made a mistake'] },
            { feature: "I'm sorry if...", values: ['Questions whether harm happened', "I'm sorry that I..."] },
            { feature: 'Silence + behavior change', values: ['Avoids accountability', 'Apologize AND change'] },
          ]}
          highlightColumn={1}
        />

        <ArticleCallout variant="warning">
          <p>"I'm sorry you feel that way' is not an apology. It puts responsibility on the other person's reaction, not your action.</p>
        </ArticleCallout>

        <h2 id="when-to-apologize" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Apologize
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>When you hurt someone:</strong> Even if you didn't mean to</li>
          <li><strong>When you broke a promise:</strong> "I said I'd call and I didn't'</li>
          <li><strong>When you violated a boundary:</strong> "I know you asked me not to share that and I did anyway"</li>
          <li><strong>When you were wrong:</strong> Even partially wrong</li>
        </ul>
        <p className="mb-6">
          <strong>When NOT to apologize:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>For things that aren't your fault (over-apologizing diminishes real apologies)</li>
          <li>For setting a boundary ("I'm sorry, but I can't..." → Just "I can't...")</li>
          <li>For existing ("Sorry for bothering you" when asking a reasonable question)</li>
        </ul>

        <h2 id="timing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Timing Matters
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Too soon:</strong> While they're still very angry, they may not be ready to receive it</li>
          <li><strong>Too late:</strong> Weeks later feels insincere ("Why didn't you say this sooner?")</li>
          <li><strong>Just right:</strong> When emotions have cooled slightly but the issue is still fresh (usually 24-48 hours)</li>
        </ul>
        <p className="mb-6">
          If you're not sure, ask: "Are you ready to talk about this, or do you need more time?"
        </p>

        <h2 id="after-apology" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          After You Apologize
        </h2>
        <p className="mb-6">
          <strong>Don't expect immediate forgiveness.</strong> Forgiveness is a gift, not an obligation. They may need time.
        </p>
        <p className="mb-6">
          <strong>Don't repeat the behavior.</strong> Apologies without behavior change are meaningless. "I'm sorry' loses power when it's followed by the same action again and again.
        </p>
        <p className="mb-6">
          <strong>Don't keep bringing it up.</strong> Once you've apologized and they've accepted (or chosen not to), move forward. Don't grovel or repeatedly reference it.
        </p>

        <h2 id="scripts" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Apology Scripts
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          For Being Late
        </h3>
        <p className="mb-6">
          "I'm sorry I was 30 minutes late. I didn't plan well and underestimated traffic. That was disrespectful of your time. I'll leave earlier next time."
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          For Saying Something Hurtful
        </h3>
        <p className="mb-6">
          "I'm sorry for what I said. I was angry and lashed out, and that wasn't fair to you. You didn't deserve that. I'll work on managing my anger better."
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          For Breaking Trust
        </h3>
        <p className="mb-6">
          "I'm sorry I shared something you told me in confidence. That was a betrayal of your trust. I understand if it takes time to trust me again. I won't let it happen again."
        </p>

        <QuoteBlock
          quote="An apology is the superglue of life. It can repair just about anything."
          attribution="Lynn Johnston"
          role="Cartoonist"
          variant="default"
        />

        <p className="mb-6">
          A good apology is vulnerable. It requires admitting you were wrong, which is uncomfortable. But that discomfort is the cost of repairing damage you caused. Pay it. Your relationships are worth it.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // CAT03-030: Communicating Across Different Emotional Languages
  // ==========================================================================
  {
    id: catId(30),
    slug: 'communicating-across-different-emotional-languages',
    status: 'draft',
    title: 'Communicating Across Different Emotional Languages',
    description: "Understand why some people process emotions differently and how to bridge communication gaps when your emotional styles don't match.",
    image: '/images/articles/cat03/cover-030.svg',
    category: CATEGORY_RELATIONSHIPS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Communication', 'Emotions', 'Relationships', 'Understanding'],
    citations: [
      { id: '1', text: 'Individual differences in emotional expression and regulation', source: 'Emotion', year: '2020', link: 'https://doi.org/10.1037/emo0000658', tier: 1 },
      { id: '2', text: 'Emotional awareness and relationship quality', source: 'Journal of Social and Personal Relationships', year: '2019', link: 'https://doi.org/10.1177/0265407518822785', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            You're upset and need to talk. Your partner needs space to think. You want to process out loud; they go silent. Neither of you is wrong---you just speak different emotional languages.
          </p>
          <p className="mb-6">
            People vary widely in how they express, process, and regulate emotions <Citation id="1" index={1} source="Emotion" year="2020" tier={1} />. Understanding these differences prevents misinterpreting someone's style as lack of care.
          </p>
        </div>

        <h2 id="emotional-styles" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Emotional Styles
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          External Processors
        </h3>
        <p className="mb-6">
          <strong>How they work:</strong> Think out loud, talk through feelings to understand them, need to verbalize to process
        </p>
        <p className="mb-6">
          <strong>What they need:</strong> Someone to listen while they work through it, not necessarily solutions
        </p>
        <p className="mb-6">
          <strong>Sounds like:</strong> "I don't know how I feel yet, let me talk it out..."
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Internal Processors
        </h3>
        <p className="mb-6">
          <strong>How they work:</strong> Need time alone to think, process internally before sharing, go quiet when upset
        </p>
        <p className="mb-6">
          <strong>What they need:</strong> Space first, conversation later
        </p>
        <p className="mb-6">
          <strong>Sounds like:</strong> "I need to think about this. Can we talk tomorrow?"
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          High Emotional Expressers
        </h3>
        <p className="mb-6">
          <strong>How they work:</strong> Feel emotions intensely and show them, cry easily, get visibly angry/excited
        </p>
        <p className="mb-6">
          <strong>What they need:</strong> Validation of their emotions without being told to "calm down"
        </p>
        <p className="mb-6">
          <strong>Sounds like:</strong> [Visible tears, raised voice, animated gestures]
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Low Emotional Expressers
        </h3>
        <p className="mb-6">
          <strong>How they work:</strong> Feel deeply but don't show it outwardly, calm exterior even when upset
        </p>
        <p className="mb-6">
          <strong>What they need:</strong> Patience; their calm doesn't mean they don't care
        </p>
        <p className="mb-6">
          <strong>Sounds like:</strong> "I'm upset." [said calmly with no visible emotion]
        </p>

        <h2 id="common-clashes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Clashes
        </h2>

        <ComparisonTable
          title="Emotional Style Conflicts"
          columns={['Person A', 'Person B', 'The Clash']}
          items={[
            { feature: 'Processing', values: ['External processor', 'Internal processor', 'A wants to talk NOW, B needs time to think'] },
            { feature: 'Expression', values: ['High expresser', 'Low expresser', 'A thinks B doesn\'t care, B thinks A is overreacting'] },
            { feature: 'Conflict', values: ['Pursuer (wants to talk)', 'Withdrawer (needs space)', 'Pursue-withdraw cycle escalates tension'] },
            { feature: 'Comfort', values: ['Needs verbal reassurance', 'Shows love through actions', 'A feels unloved, B feels unappreciated'] },
          ]}
          highlightColumn={2}
        />

        <ArticleCallout variant="key-takeaway">
          <p>Different doesn't mean wrong. Someone's emotional style is not a rejection of you---it's just how they're wired.</p>
        </ArticleCallout>

        <h2 id="bridging-the-gap" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Bridge the Gap
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          If You're an External Processor with an Internal Processor
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Say what you need:</strong> "I need to talk this through. You don't have to solve it, just listen."</li>
          <li><strong>Give them processing time:</strong> "Can we talk about this tonight after you've had time to think?"</li>
          <li><strong>Don't chase them when they withdraw:</strong> Respect their need for space</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          If You're an Internal Processor with an External Processor
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Communicate your process:</strong> "I'm not ignoring you. I need time to think before I can talk."</li>
          <li><strong>Give a timeline:</strong> "Let me process for an hour, then I'll be ready to discuss."</li>
          <li><strong>Show you're engaged:</strong> "This matters to me. I just need space to think it through."</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          If You're a High Expresser with a Low Expresser
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Don't assume they don't care:</strong> Their calm doesn't mean indifference</li>
          <li><strong>Ask directly:</strong> "I can't tell how you're feeling. Can you tell me in words?"</li>
          <li><strong>Appreciate their steadiness:</strong> Their emotional regulation can be grounding</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          If You're a Low Expresser with a High Expresser
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Reassure them:</strong> "I know I seem calm, but I'm taking this seriously."</li>
          <li><strong>Verbalize your emotions:</strong> They can't read your face, so use words</li>
          <li><strong>Don't tell them to calm down:</strong> Their intensity is how they process; validate it</li>
        </ul>

        <h2 id="negotiate-needs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Negotiate Emotional Needs
        </h2>
        <p className="mb-6">
          <strong>Example conversation:</strong>
        </p>
        <p className="mb-6">
          <strong>Partner A (external processor):</strong> "When something's wrong, I need to talk about it right away. That's how I process."
        </p>
        <p className="mb-6">
          <strong>Partner B (internal processor):</strong> "I need time to think before I can talk. Immediate conversations make me shut down."
        </p>
        <p className="mb-6">
          <strong>Solution they create together:</strong> "When an issue comes up, we'll name it ('This is bothering me'), then take 30 minutes apart. After that, we'll talk."
        </p>
        <p className="mb-6">
          Both get what they need: A knows the conversation is happening soon, B gets processing time.
        </p>

        <h2 id="emotional-awareness" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Build Emotional Awareness Together
        </h2>
        <p className="mb-6">
          Couples with mismatched emotional styles thrive when they develop shared emotional awareness <Citation id="2" index={2} source="Journal of Social and Personal Relationships" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Name your styles:</strong> "I'm an external processor, you're internal"</li>
          <li><strong>Create rituals:</strong> Daily check-ins, weekly relationship talks</li>
          <li><strong>Use "I need" statements:</strong> "I need space" or "I need to talk"</li>
          <li><strong>Respect differences:</strong> Don't try to change each other's fundamental style</li>
        </ul>

        <QuoteBlock
          quote="In relationships, our differences are not meant to divide us. They're meant to complement and complete us."
          attribution="Unknown"
          variant="default"
        />

        <p className="mb-6">
          Emotional style differences can feel like speaking different languages. But with understanding, patience, and clear communication, you can learn to translate---and build a relationship that honors both of your needs.
        </p>
      </>
    ),
  },
];
