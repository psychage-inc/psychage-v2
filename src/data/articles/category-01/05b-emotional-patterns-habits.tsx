 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_EMOTIONAL_REGULATION, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ComparisonTable,
  ArticleAccordion,
  ProgressSteps,
  QuoteBlock,
} from '../../../components/article/blocks';

export const emotionalPatternsHabitsArticlesB: Article[] = [
  // ==========================================================================
  // Article 46: The Anger Iceberg
  // ==========================================================================
  {
    id: catId(46),
    slug: 'the-anger-iceberg-whats-really-underneath-your-frustration',
    title: `The Anger Iceberg: What's Really Underneath Your Frustration`,
    description: `Anger is often a surface emotion masking deeper feelings. Learn to look beneath the iceberg to understand what's really driving your irritation.`,
    image: "/images/articles/cat01/cover-046.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anger', 'Emotional Awareness', 'Vulnerability', 'Communication'],
    citations: [
      { id: '1', text: 'The function of anger in psychological health', source: 'Aggression and Violent Behavior', year: '2020', link: 'https://doi.org/10.1016/j.avb.2020.101422', tier: 1 },
      { id: '2', text: 'Secondary emotions and emotional suppression', source: 'Emotion', year: '2019', link: 'https://doi.org/10.1037/emo0000562', tier: 1 },
      { id: '3', text: 'Anger as a defense against vulnerability', source: 'Journal of Counseling Psychology', year: '2021', link: 'https://doi.org/10.1037/cou0000519', tier: 1 },
      { id: '4', text: 'Gender differences in anger expression', source: 'Sex Roles', year: '2020', link: 'https://doi.org/10.1007/s11199-020-01145-9', tier: 1 },
      { id: '5', text: 'Anger management: A meta-analysis of interventions', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102031', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Someone cuts you off in traffic and rage floods your body. Your partner forgets an important date and fury erupts. A colleague takes credit for your idea and you snap. But is anger really what you're feeling—or is it protecting you from something deeper?
          </p>
          <p className="mb-6">
            The anger iceberg metaphor illustrates a powerful truth: anger is often a secondary emotion, a protective response that hides more vulnerable feelings underneath <Citation id="2" index={2} source="Emotion" year="2019" tier={2} />. What you see on the surface—irritation, frustration, rage—is just the tip. Below the waterline lie the real feelings: hurt, fear, shame, helplessness.
          </p>
        </div>

        <h2 id="why-anger-first" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Anger Surfaces First
        </h2>
        <p className="mb-6">
          Anger feels safer than vulnerability <Citation id="3" index={3} source="Journal of Counseling Psychology" year="2021" tier={1} />. It's activating, empowering, and protective. Anger says: "I'm strong. I'm in control. You can't hurt me." Sadness, fear, and shame feel weak, exposed, and dangerous.
        </p>
        <p className="mb-6">
          For many people—especially those socialized to suppress vulnerability—anger becomes the go-to emotion for all distress. It's the only acceptable way to express pain.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>Anger is not a "bad" emotion—it's a messenger. But if you only listen to the anger and ignore what's beneath it, you never address the real wound.</p>
        </ArticleCallout>

        <h2 id="whats-below" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What's Below the Surface
        </h2>
        <p className="mb-6">
          Beneath anger, you might find:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Hurt:</strong> Someone's words or actions wounded you emotionally</li>
          <li><strong>Fear:</strong> You're scared of loss, rejection, or being out of control</li>
          <li><strong>Shame:</strong> You feel inadequate, embarrassed, or exposed</li>
          <li><strong>Grief:</strong> You're mourning a loss or disappointment</li>
          <li><strong>Helplessness:</strong> You feel powerless to change a situation</li>
          <li><strong>Overwhelm:</strong> You're flooded and don't know how to cope</li>
        </ul>

        <h2 id="how-to-look-beneath" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Look Beneath the Anger
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Pause before reacting', description: <p>When anger surges, take a breath. Don't act on it immediately.</p> },
            { title: `Ask: 'What else am I feeling?`, description: <p>Anger rarely travels alone. What softer emotion is hiding underneath?</p> },
            { title: 'Identify the threat', description: <p>What feels threatened? Your safety? Your worth? Your connection? Your autonomy?</p> },
            { title: 'Name the vulnerable feeling', description: <p>"I'm angry because I feel hurt.", "I'm frustrated because I'm scared."</p> },
            { title: 'Address the root, not just the symptom', description: <p>If you're hurt, you need acknowledgment. If you're scared, you need reassurance. Anger alone doesn't meet those needs.</p> },
          ]}
        />

        <h2 id="gender-culture" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Gender and Cultural Factors
        </h2>
        <p className="mb-6">
          Men are often socialized to express anger but suppress sadness and fear <Citation id="4" index={4} source="Sex Roles" year="2020" tier={1} />. Women are often socialized to suppress anger but express sadness. These patterns aren't biological—they're learned. And they limit emotional range.
        </p>
        <ArticleCallout variant="info">
          <p>Expanding your emotional vocabulary means giving yourself permission to feel the full range—not just the emotions your gender or culture says are acceptable.</p>
        </ArticleCallout>

        <h2 id="communicating" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Communicating What's Beneath
        </h2>
        <p className="mb-6">
          Expressing anger without vulnerability often escalates conflict. Expressing the underlying feeling opens connection.
        </p>
        <ComparisonTable
          title="Surface vs. Underneath Communication"
          columns={['Surface (Anger Only)', 'Underneath (Vulnerable Truth)']}
          items={[
            { feature: 'You never listen to me!', values: ["I feel hurt and invisible when I'm interrupted"] },
            { feature: "You're always late!", values: ["I feel scared that I'm not a priority to you"] },
            { feature: "Why didn't you text back?", values: ['I felt anxious and worried something was wrong'] },
          ]}
        />

        <h2 id="when-anger-is-primary" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Anger IS the Primary Emotion
        </h2>
        <p className="mb-6">
          Sometimes anger is the appropriate response—to injustice, violation of boundaries, or genuine threat <Citation id="1" index={1} source="Aggression and Violent Behavior" year="2020" tier={1} />. Healthy anger motivates action, sets limits, and protects.
        </p>
        <p className="mb-6">
          The question is: Is this anger proportionate to the situation? Or is it amplified by unprocessed pain beneath?
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If anger is damaging relationships, causing violence, or feels out of control, therapy can help <Citation id="5" index={5} source="Clinical Psychology Review" year="2021" tier={1} />. Anger management, DBT, and emotion-focused therapy teach healthier ways to process and express all emotions—not just the ones on the surface.
        </p>
        <p className="mb-6">
          The next time anger rises, pause and ask: "What am I protecting? What's the feeling I don't want to face?" The answer is where healing begins.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // Article 47: Shame vs. Guilt
  // ==========================================================================
  {
    id: catId(47),
    slug: 'shame-vs-guilt-two-very-different-emotions-with-very-different-effects',
    title: 'Shame vs. Guilt: Two Very Different Emotions with Very Different Effects',
    description: 'Shame and guilt are often confused, but their effects on mental health and behavior are radically different. Learn to tell them apart—and why it matters.',
    image: "/images/articles/cat01/cover-047.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Shame', 'Guilt', 'Self-Compassion', 'Mental Health'],
    citations: [
      { id: '1', text: 'Shame and guilt: Distinct self-conscious emotions', source: 'Psychological Bulletin', year: '2020', link: 'https://doi.org/10.1037/bul0000241', tier: 1 },
      { id: '2', text: 'Shame-proneness and psychopathology', source: 'Clinical Psychology Review', year: '2019', link: 'https://doi.org/10.1016/j.cpr.2019.04.007', tier: 1 },
      { id: '3', text: 'Guilt and prosocial behavior', source: 'Journal of Personality and Social Psychology', year: '2020', link: 'https://doi.org/10.1037/pspi0000213', tier: 1 },
      { id: '4', text: 'Compassion-focused therapy for shame', source: 'British Journal of Clinical Psychology', year: '2021', link: 'https://doi.org/10.1111/bjc.12285', tier: 1 },
      { id: '5', text: "I Thought It Was Just Me (But It Isn't)", source: 'Avery', year: '2007', link: 'https://www.worldcat.org/title/i-thought-it-was-just-me-but-it-isnt/oclc/85692537', tier: 5 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You make a mistake. Do you think "I did something bad" or "I am bad"? That subtle difference—between guilt and shame—determines whether you grow from the experience or spiral into self-loathing.
          </p>
          <p className="mb-6">
            Guilt says: "I made a mistake." Shame says: "I am a mistake." One focuses on behavior; the other attacks identity <Citation id="1" index={1} source="Psychological Bulletin" year="2020" tier={1} />. And research shows that while guilt can motivate positive change, shame leads to hiding, defensiveness, and mental health problems.
          </p>
        </div>

        <h2 id="the-distinction" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Critical Distinction
        </h2>
        <ComparisonTable
          title="Guilt vs. Shame"
          columns={['Dimension', 'Guilt', 'Shame']}
          items={[
            { feature: 'Focus', values: ["Behavior ('I did something bad')", "Self ('I am bad')"] },
            { feature: 'Message', values: ["That action doesn't align with my values", 'I am fundamentally flawed'] },
            { feature: 'Motivation', values: ['Repair, apologize, change behavior', 'Hide, withdraw, self-attack'] },
            { feature: 'Mental health', values: ['Associated with empathy and growth', 'Associated with depression, anxiety, addiction'] },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>Guilt is: "I'm sorry I hurt you." Shame is: "I'm a terrible person who always hurts people." One is specific and repairable. The other is global and devastating.</p>
        </ArticleCallout>

        <h2 id="why-shame-is-toxic" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Shame Is So Toxic
        </h2>
        <p className="mb-6">
          Shame is highly correlated with depression, anxiety, addiction, aggression, eating disorders, and suicide <Citation id="2" index={2} source="Clinical Psychology Review" year="2019" tier={1} />. Here's why:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>It attacks identity:</strong> "I'm bad' feels permanent and unfixable</li>
          <li><strong>It creates isolation:</strong> Shame thrives in secrecy and silence</li>
          <li><strong>It blocks growth:</strong> You can't learn from mistakes if you believe you ARE the mistake</li>
          <li><strong>It generates more shame:</strong> Feeling ashamed → hiding → more isolation → deeper shame</li>
        </ul>

        <QuoteBlock
          quote="Shame is the most powerful, master emotion. It's the fear that we're not good enough."
          attribution="Brené Brown"
          role="Research Professor"
          source="I Thought It Was Just Me"
          variant="default"
        />

        <h2 id="guilt-is-adaptive" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Guilt Is Actually Adaptive
        </h2>
        <p className="mb-6">
          Guilt, when proportionate, motivates prosocial behavior and repair <Citation id="3" index={3} source="Journal of Personality and Social Psychology" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You feel guilty → you apologize → you make amends → the relationship heals</li>
          <li>Guilt signals: "This behavior conflicts with my values"</li>
          <li>It focuses on what you can change (your actions), not what you can't (your worth)</li>
        </ul>
        <ArticleCallout variant="info">
          <p>Healthy guilt is temporary and action-oriented. Toxic guilt becomes rumination and self-punishment without repair.</p>
        </ArticleCallout>

        <h2 id="common-sources" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Sources of Shame
        </h2>
        <ArticleAccordion
          type="multiple"
          items={[
            { id: 'appearance', title: 'Body shame', content: <p>"My body is wrong. I'm not attractive enough."</p> },
            { id: 'achievement', title: 'Performance shame', content: <p>"I'm not successful enough. I'm a failure."</p> },
            { id: 'identity', title: 'Identity shame', content: <p>'Who I am is fundamentally unacceptable."</p> },
            { id: 'trauma', title: 'Trauma-based shame', content: <p>'What happened to me means something is wrong with me."</p> },
          ]}
        />

        <h2 id="how-to-shift" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Shift from Shame to Guilt
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Recognize shame language', description: <p>Notice when you say "I'm bad' vs. "I did something I regret."</p> },
            { title: 'Name it', description: <p>"I'm feeling shame right now." Labeling reduces its power.</p> },
            { title: 'Separate self from behavior', description: <p>'I made a mistake' not "I am a mistake."</p> },
            { title: 'Share it', description: <p>Shame thrives in secrecy. Talking about it with someone you trust disarms it.</p> },
            { title: 'Practice self-compassion', description: <p>"I'm human. I'm allowed to be imperfect."</p> },
          ]}
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If shame is pervasive, chronic, or interfering with your life, therapy can help. Compassion-Focused Therapy (CFT) and trauma-informed approaches specifically target deep-seated shame <Citation id="4" index={4} source="British Journal of Clinical Psychology" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          You are not your worst moment. You are not your mistakes. Guilt says you did something wrong. Shame says you are something wrong. Only one of those is true—and it's not shame.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // Article 48: Rumination
  // ==========================================================================
  {
    id: catId(48),
    slug: 'rumination-why-your-brain-replays-painful-moments-and-how-to-stop',
    title: 'Rumination: Why Your Brain Replays Painful Moments (And How to Stop)',
    description: 'Rumination keeps you stuck in the past, amplifying distress. Learn why it happens and evidence-based strategies to break the cycle.',
    image: "/images/articles/cat01/cover-048.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Rumination', 'Overthinking', 'Depression', 'Cognitive Patterns'],
    citations: [
      { id: '1', text: 'Rumination and depression: A meta-analysis', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101885', tier: 1 },
      { id: '2', text: 'The neuroscience of repetitive negative thinking', source: 'Nature Reviews Neuroscience', year: '2021', link: 'https://doi.org/10.1038/s41583-021-00470-6', tier: 1 },
      { id: '3', text: 'Rumination-focused cognitive-behavioral therapy', source: 'Behaviour Research and Therapy', year: '2020', link: 'https://doi.org/10.1016/j.brat.2020.103698', tier: 1 },
      { id: '4', text: 'Mindfulness for rumination: A systematic review', source: 'Mindfulness', year: '2021', link: 'https://doi.org/10.1007/s12671-021-01625-6', tier: 1 },
      { id: '5', text: 'Rumination and the default mode network', source: 'NeuroImage', year: '2019', link: 'https://doi.org/10.1016/j.neuroimage.2019.05.007', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            It's 3 AM. You're replaying a conversation from three weeks ago, thinking of what you should have said. Or you're analyzing a mistake you made, spiraling through all the ways you're a failure. You know this mental loop isn't helping—but you can't stop.
          </p>
          <p className="mb-6">
            This is rumination: repetitive, passive focus on distress and its causes without moving toward solutions <Citation id="1" index={1} source="Clinical Psychology Review" year="2020" tier={1} />. It's not the same as productive problem-solving. It's a mental hamster wheel that keeps you stuck in pain.
          </p>
        </div>

        <h2 id="what-is-rumination" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Rumination?
        </h2>
        <p className="mb-6">
          Rumination involves:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Repetitive focus on negative events or feelings</li>
          <li>Passive reflection without active problem-solving</li>
          <li>Analyzing "why" questions without resolution ("Why did this happen to me?")</li>
          <li>Comparing yourself to idealized versions of events ("If only I had...")</li>
        </ul>

        <ComparisonTable
          title="Rumination vs. Productive Reflection"
          columns={['Rumination', 'Productive Reflection']}
          items={[
            { feature: 'Why am I such a failure?', values: ['What can I learn from this?'] },
            { feature: 'Passive, stuck', values: ['Active, forward-moving'] },
            { feature: 'No resolution, endless loop', values: ['Leads to insight or action'] },
            { feature: 'Increases distress', values: ['Reduces distress over time'] },
          ]}
        />

        <h2 id="why-it-happens" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Your Brain Ruminates
        </h2>
        <p className="mb-6">
          Rumination activates the default mode network (DMN)—the brain's "idle" state <Citation id="5" index={5} source="NeuroImage" year="2019" tier={1} />. When you're not focused on a task, the DMN turns inward, often looping through unresolved concerns.
        </p>
        <p className="mb-6">
          Your brain thinks rumination is problem-solving. It feels productive—like if you just think hard enough, you'll figure it out. But rumination doesn't solve; it reinforces the neural pathway of distress <Citation id="2" index={2} source="Nature Reviews Neuroscience" year="2021" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>Rumination creates the illusion of control. "If I keep thinking about it, I can prevent it from happening again." But you can't think your way out of an emotional problem.</p>
        </ArticleCallout>

        <h2 id="the-costs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Costs of Rumination
        </h2>
        <p className="mb-6">
          Chronic rumination is strongly linked to:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Depression (both onset and maintenance)</li>
          <li>Anxiety and worry</li>
          <li>Sleep disturbances</li>
          <li>Impaired problem-solving (ironically)</li>
          <li>Increased physiological stress</li>
        </ul>

        <h2 id="how-to-stop" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Break the Rumination Cycle
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: `Notice you're ruminating`, description: <p>Label it: "I'm ruminating right now." Awareness is the first step.</p> },
            { title: 'Ask: Is this solving anything?', description: <p>If the answer is no, it's time to shift.</p> },
            { title: 'Engage your senses', description: <p>Ground yourself in the present: 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste.</p> },
            { title: 'Do something active', description: <p>Physical activity disrupts rumination. Walk, stretch, clean—anything that engages your body.</p> },
            { title: `Schedule 'worry time'`, description: <p>Set aside 15 minutes to ruminate intentionally. Outside that window, postpone it.</p> },
          ]}
        />

        <h2 id="mindfulness" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Mindfulness as an Antidote
        </h2>
        <p className="mb-6">
          Mindfulness-based interventions are highly effective for rumination <Citation id="4" index={4} source="Mindfulness" year="2021" tier={1} />. Why? Because mindfulness teaches you to observe thoughts without getting caught in them.
        </p>
        <ArticleCallout variant="tip">
          <p>When a ruminative thought arises, practice: 'I'm having the thought that I'm a failure' rather than "I am a failure." This creates distance.</p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If rumination is constant, interfering with sleep or functioning, or accompanied by depression, therapy helps. Rumination-Focused CBT and Mindfulness-Based Cognitive Therapy (MBCT) specifically target this pattern <Citation id="3" index={3} source="Behaviour Research and Therapy" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          The past is a place to visit, not to live. Rumination keeps you trapped there. Breaking free means learning to let thoughts pass like clouds—acknowledging them without clinging.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // Article 49: Emotional Perfectionism
  // ==========================================================================
  {
    id: catId(49),
    slug: 'emotional-perfectionism-the-hidden-pressure-to-always-feel-good',
    title: `Emotional Perfectionism: The Hidden Pressure to Always Feel 'Good'`,
    description: "The unrealistic expectation that you should always be happy, calm, and positive creates suffering. Learn to accept the full range of human emotions.",
    image: "/images/articles/cat01/cover-049.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 5,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Perfectionism', 'Acceptance', 'Self-Compassion', 'Toxic Positivity'],
    citations: [
      { id: '1', text: 'Emotional perfectionism and psychological distress', source: 'Personality and Individual Differences', year: '2021', link: 'https://doi.org/10.1016/j.paid.2021.110892', tier: 1 },
      { id: '2', text: 'Toxic positivity: The dark side of positive thinking', source: 'Journal of Humanistic Psychology', year: '2020', link: 'https://doi.org/10.1177/0022167820951155', tier: 1 },
      { id: '3', text: 'Radical acceptance in DBT', source: 'Cognitive and Behavioral Practice', year: '2019', link: 'https://doi.org/10.1016/j.cbpra.2019.02.001', tier: 1 },
      { id: '4', text: 'The function of negative emotions', source: 'Emotion Review', year: '2020', link: 'https://doi.org/10.1177/1754073920930211', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "Good vibes only.", "Just be positive.", "Don't be so negative." We live in a culture that treats discomfort like failure and negative emotions like character flaws. The result? A hidden epidemic of emotional perfectionism—the belief that you should always feel good, and that anything else is wrong.
          </p>
          <p className="mb-6">
            Emotional perfectionism is the unrealistic expectation that you should only experience pleasant emotions <Citation id="1" index={1} source="Personality and Individual Differences" year="2021" tier={1} />. When sadness, anger, or anxiety arise, you judge yourself for feeling them. This creates a secondary layer of suffering: pain about your pain.
          </p>
        </div>

        <h2 id="what-it-looks-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Emotional Perfectionism Looks Like
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>"I shouldn't feel anxious—I have no reason to."</li>
          <li>"Other people have it worse, so I shouldn't be sad."</li>
          <li>"I meditate and exercise—why am I still depressed?"</li>
          <li>"I need to fix this feeling immediately."</li>
          <li>Forcing positivity when you're genuinely struggling</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Emotional perfectionism says: "I should be over this by now." Reality says: "Healing isn't linear, and discomfort is part of being human."</p>
        </ArticleCallout>

        <h2 id="toxic-positivity" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Problem with Toxic Positivity
        </h2>
        <p className="mb-6">
          Toxic positivity is the excessive and ineffective overgeneralization of a happy, optimistic state across all situations <Citation id="2" index={2} source="Journal of Humanistic Psychology" year="2020" tier={1} />. It invalidates genuine struggle and creates shame around normal human emotions.
        </p>
        <p className="mb-6">
          Examples: "Everything happens for a reason!" (when someone is grieving), "Just think positive!" (when someone is depressed), "Good vibes only!" (when someone needs to process pain).
        </p>

        <h2 id="negative-emotions-serve-purpose" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Negative Emotions Aren't the Enemy
        </h2>
        <p className="mb-6">
          Every emotion serves a function <Citation id="4" index={4} source="Emotion Review" year="2020" tier={4} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Sadness:</strong> Signals loss, prompts connection and support</li>
          <li><strong>Anger:</strong> Alerts to boundary violations, mobilizes action</li>
          <li><strong>Fear:</strong> Protects from danger, increases vigilance</li>
          <li><strong>Guilt:</strong> Signals misalignment with values, prompts repair</li>
        </ul>
        <p className="mb-6">
          Trying to eliminate these emotions is like removing smoke detectors because you don't like the noise. They're giving you information.
        </p>

        <h2 id="how-to-let-go" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Letting Go of Emotional Perfectionism
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: `Notice the "should`, description: <p>"I should be happy" is a red flag. Who says?</p> },
            { title: 'Validate your feelings', description: <p>"It makes sense I feel this way given what I'm experiencing."</p> },
            { title: 'Allow the emotion to exist', description: <p>You don't have to like it. Just make room for it.</p> },
            { title: 'Practice radical acceptance', description: <p>"This is what I'm feeling right now, and that's okay" <Citation id="3" index={3} source="Cognitive and Behavioral Practice" year="2019" tier={1} />.</p> },
          ]}
        />

        <QuoteBlock
          quote="You don't have to feel good to be good. You're allowed to feel all of it."
          attribution="Glennon Doyle"
          role="Author"
          source="Untamed"
          variant="default"
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If emotional perfectionism leads to chronic suppression, shame, or mental health decline, therapy can help. Acceptance-based therapies (ACT, DBT) teach emotional flexibility—the ability to feel without fighting.
        </p>
        <p className="mb-6">
          You are not broken for feeling uncomfortable emotions. You're human. And being human means the full spectrum—not just the highlight reel.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // Article 50: Breaking the Pattern
  // ==========================================================================
  {
    id: catId(50),
    slug: 'breaking-the-pattern-how-to-build-new-emotional-responses',
    title: 'Breaking the Pattern: How to Build New Emotional Responses',
    description: 'Step-by-step guide to identifying old emotional patterns and deliberately building new, healthier responses that serve you better.',
    image: "/images/articles/cat01/cover-050.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Behavior Change', 'Neuroplasticity', 'Habits', 'Personal Growth'],
    citations: [
      { id: '1', text: 'Neuroplasticity and habit change', source: 'Nature Reviews Neuroscience', year: '2021', link: 'https://doi.org/10.1038/s41583-021-00474-2', tier: 1 },
      { id: '2', text: 'Implementation intentions for behavior change', source: 'Psychological Bulletin', year: '2020', link: 'https://doi.org/10.1037/bul0000267', tier: 1 },
      { id: '3', text: 'Habit formation in real-world settings', source: 'European Journal of Social Psychology', year: '2020', link: 'https://doi.org/10.1002/ejsp.2711', tier: 1 },
      { id: '4', text: 'The role of self-compassion in behavior change', source: 'Self and Identity', year: '2021', link: 'https://doi.org/10.1080/15298868.2020.1849524', tier: 1 },
      { id: '5', text: 'Cognitive restructuring in CBT', source: 'Behavior Therapy', year: '2020', link: 'https://doi.org/10.1016/j.beth.2019.11.002', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You've spent this series learning about emotional patterns—how they form, why they persist, and what drives them. Now comes the most important part: how do you actually change them?
          </p>
          <p className="mb-6">
            Breaking an emotional pattern isn't about willpower or positive thinking. It's about neuroplasticity—your brain's ability to form new pathways <Citation id="1" index={1} source="Nature Reviews Neuroscience" year="2021" tier={1} />. With awareness, intention, and practice, you can build new emotional responses that better serve who you are now.
          </p>
        </div>

        <h2 id="the-process" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Pattern-Breaking Process
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: '1. Identify the pattern', description: <p>Name the trigger, emotional response, and outcome. 'When X happens, I feel Y, and I do Z."</p> },
            { title: '2. Understand the function', description: <p>What does this pattern give you? Protection? Control? Comfort? Understanding the payoff helps you find alternatives.</p> },
            { title: '3. Design the new response', description: <p>What would you rather do? Choose a specific, realistic alternative that meets the same need.</p> },
            { title: '4. Create an implementation intention', description: <p>'When X happens, I will Y." Be specific <Citation id="2" index={2} source="Psychological Bulletin" year="2020" tier={1} />.</p> },
            { title: '5. Practice in low-stakes situations', description: <p>Don't wait for high-intensity moments. Rehearse the new response when stakes are low.</p> },
            { title: '6. Expect setbacks', description: <p>You will default to the old pattern sometimes. That's not failure—it's part of learning.</p> },
            { title: '7. Reinforce with self-compassion', description: <p>Shame blocks change. Self-compassion fuels it <Citation id="4" index={4} source="Self and Identity" year="2021" tier={1} />.</p> },
          ]}
        />

        <h2 id="example-walkthrough" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Example: Changing a Defensive Anger Pattern
        </h2>
        <ArticleAccordion
          type="multiple"
          items={[
            { id: 'old', title: 'Old Pattern', content: <p><strong>Trigger:</strong> Criticism at work. <strong>Response:</strong> Immediate defensiveness, anger, counterattack. <strong>Outcome:</strong> Relationship damage, no learning from feedback.</p> },
            { id: 'understand', title: 'Understand the Function', content: <p>Anger protects me from feeling shame or inadequacy. It makes me feel strong instead of vulnerable.</p> },
            { id: 'new', title: 'New Response Design', content: <p><strong>Alternative:</strong> Pause, take a breath, ask a clarifying question instead of defending. <strong>Same need met:</strong> Maintaining dignity, but without damage.</p> },
            { id: 'intention', title: 'Implementation Intention', content: <p>"When someone gives me critical feedback, I will take three breaths and say: "Can you help me understand what you'd like to see differently?""</p> },
          ]}
        />

        <h2 id="cognitive-restructuring" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Changing the Thoughts That Drive the Pattern
        </h2>
        <p className="mb-6">
          Often, emotional patterns are driven by automatic thoughts. Cognitive restructuring helps you identify and challenge them <Citation id="5" index={5} source="Behavior Therapy" year="2020" tier={1} />:
        </p>
        <ul className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Catch the thought:</strong> "They think I'm incompetent."</li>
          <li><strong>Evaluate the evidence:</strong> Is this true? What evidence supports or contradicts it?</li>
          <li><strong>Generate alternatives:</strong> "They're giving feedback to help me improve, not to attack me."</li>
          <li><strong>Choose the most balanced thought:</strong> "This feedback is hard to hear, and it might have useful information."</li>
        </ul>

        <h2 id="how-long" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Long Does It Take?
        </h2>
        <p className="mb-6">
          Research shows habit formation takes an average of 66 days, with a range of 18-254 days depending on complexity <Citation id="3" index={3} source="European Journal of Social Psychology" year="2020" tier={1} />. Emotional patterns are on the longer end—expect months, not weeks.
        </p>
        <ArticleCallout variant="info">
          <p>The old pattern will still activate sometimes, even after the new one is established. That's normal. The goal isn't perfection—it's having a choice.</p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If patterns are deeply entrenched, rooted in trauma, or you've tried changing them alone without success, therapy accelerates the process. CBT, DBT, and EMDR all target emotional and behavioral patterns at their source.
        </p>
        <p className="mb-6">
          You are not your patterns. They're learned responses that once served you. And what was learned can be unlearned. With patience, practice, and self-compassion, you can build a new way of being—one response at a time.
        </p>
      </>
    ),
  },
];
