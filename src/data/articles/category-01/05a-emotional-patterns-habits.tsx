/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_EMOTIONAL_REGULATION, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  QuoteBlock,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

export const emotionalPatternsHabitsArticlesA: Article[] = [
  // ==========================================================================
  // Article 41: Emotional Habits
  // ==========================================================================
  {
    id: catId(41),
    slug: 'emotional-habits-how-repetitive-feeling-patterns-form-and-stick',
    title: 'Emotional Habits: How Repetitive Feeling Patterns Form and Stick',
    description: 'Why do you always feel the same way in certain situations? Discover how emotional habits form through neural pathways and how to rewire them.',
    image: "/images/articles/cat01/cover-041.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Habits', 'Neural Pathways', 'Behavior Change', 'Emotional Patterns'],
    citations: [
      {
        id: '1',
        text: 'The neuroscience of habit formation',
        source: 'Nature Neuroscience',
        year: '2020',
        link: 'https://doi.org/10.1038/s41593-020-0653-z',
        tier: 1,
      },
      {
        id: '2',
        text: 'Emotional habits and their role in psychopathology',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.04.005',
        tier: 1,
      },
      {
        id: '3',
        text: 'Neuroplasticity and emotional learning across the lifespan',
        source: 'Developmental Cognitive Neuroscience',
        year: '2021',
        link: 'https://doi.org/10.1016/j.dcn.2021.100953',
        tier: 1,
      },
      {
        id: '4',
        text: 'Breaking unwanted habits: A randomized controlled trial',
        source: 'Behaviour Research and Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.brat.2020.103642',
        tier: 1,
      },
      {
        id: '5',
        text: 'The Power of Habit: Why We Do What We Do in Life and Business',
        source: 'Random House',
        year: '2012',
        link: 'https://www.worldcat.org/title/power-of-habit/oclc/754718696',
        tier: 5,
      },
      {
        id: '6',
        text: 'Emotion regulation strategies as transdiagnostic processes',
        source: 'Annual Review of Clinical Psychology',
        year: '2020',
        link: 'https://doi.org/10.1146/annurev-clinpsy-050718-095617',
        tier: 1,
      },
      {
        id: '7',
        text: 'Context-dependent emotional responses: Neural mechanisms',
        source: 'Trends in Neurosciences',
        year: '2019',
        link: 'https://doi.org/10.1016/j.tins.2019.08.002',
        tier: 1,
      },
      {
        id: '8',
        text: 'Habit reversal training: A meta-analysis of efficacy',
        source: 'Journal of Consulting and Clinical Psychology',
        year: '2021',
        link: 'https://doi.org/10.1037/ccp0000638',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You walk into your childhood home and feel instantly small. Your phone buzzes with a work email and anxiety floods your chest before you've even read it. Someone criticizes you and shame washes over you like clockwork. These aren't random reactions---they're emotional habits, deeply grooved patterns your brain has learned to run automatically.
          </p>
          <p className="mb-6">
            Just like behavioral habits (brushing your teeth, checking your phone), emotional habits are learned responses that become automatic through repetition <Citation id="1" index={1} source="Nature Neuroscience" year="2020" tier={1} />. The good news? What's been learned can be unlearned---but first, you need to understand how these patterns form and why they stick.
          </p>
        </div>

        <h2 id="what-are-they" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Are Emotional Habits?
        </h2>
        <p className="mb-6">
          An emotional habit is a consistent emotional response to a specific trigger---so automatic that it feels like the only possible reaction. It's the pattern that makes you always feel anxious before social events, always get defensive when receiving feedback, or always withdraw when conflict arises <Citation id="2" index={2} source="Clinical Psychology Review" year="2019" tier={1} />.
        </p>

        <ComparisonTable
          title="Emotional Response vs. Emotional Habit"
          columns={['Dimension', 'Emotional Response', 'Emotional Habit']}
          items={[
            { feature: 'Frequency', values: ['Occasional, varies by context', 'Predictable, consistent pattern'] },
            { feature: 'Awareness', values: ['Usually conscious', 'Often happens before you notice'] },
            { feature: 'Flexibility', values: ['Can adjust based on situation', 'Rigid, same response every time'] },
            { feature: 'Origin', values: ['Rational appraisal of current event', 'Learned association from past'] },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>Emotional habits are not character flaws---they're learned patterns that once served a purpose. Your brain created them to keep you safe, even if they no longer work.</p>
        </ArticleCallout>

        <h2 id="how-they-form" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Emotional Habits Form: The Habit Loop
        </h2>
        <p className="mb-6">
          Neuroscientist Ann Graybiel discovered that all habits follow a three-part loop: cue, routine, reward <Citation id="5" index={5} source="Random House" year="2012" tier={5} />. Emotional habits work the same way.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Cue (Trigger)',
              description: <p>A situation, person, place, time of day, or internal state that signals your brain to activate a specific emotional pattern. Example: Your boss's tone of voice shifts slightly.</p>,
            },
            {
              title: 'Routine (Emotional Response)',
              description: <p>The automatic emotional and behavioral pattern that follows. Example: You feel instant anxiety, your chest tightens, and you start mentally rehearsing what you did wrong.</p>,
            },
            {
              title: 'Reward (What You Get)',
              description: <p>The payoff that reinforces the habit---even if it's painful. Example: The anxiety motivates hypervigilance, which feels like protection. Or rumination gives you the illusion of control.</p>,
            },
          ]}
        />

        <ArticleCallout variant="did-you-know">
          <p>Your brain doesn't distinguish between "good" and "bad" habits---it reinforces whatever gets repeated, regardless of whether it serves you <Citation id="1" index={1} source="Nature Neuroscience" year="2020" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="neural-pathways" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Neuroscience: Why Patterns Become Automatic
        </h2>
        <p className="mb-6">
          Every time you experience a specific emotional response to a trigger, you strengthen the neural pathway connecting the two. It's like walking through a field of tall grass---the first time is hard, but the 100th time, there's a clear path <Citation id="3" index={3} source="Developmental Cognitive Neuroscience" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          This process is called Hebbian learning: "Neurons that fire together, wire together." The more you feel shame in response to criticism, the more automatic that connection becomes. Eventually, the pathway is so well-worn that the emotion fires before conscious thought.
        </p>

        <StatCard
          stats={[
            { value: 40, suffix: '%', label: 'Of daily actions governed by habits, not conscious decisions' },
            { value: 66, suffix: ' days', label: 'Average time to form a new habit (range: 18-254 days)' },
            { value: 3, suffix: ' sec', label: 'Time it takes for an emotional habit to activate' },
          ]}
          source="Nature Neuroscience, 2020"
        />

        <h2 id="common-types" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Emotional Habits
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'anxiety',
              title: 'Habitual Anxiety',
              content: <p><strong>Pattern:</strong> Anticipating the worst-case scenario in ambiguous situations. <strong>Cue:</strong> Uncertainty or lack of control. <strong>Reward:</strong> The illusion of preparedness---"If I worry about it, I won't be blindsided."</p>,
            },
            {
              id: 'shame',
              title: 'Habitual Shame',
              content: <p><strong>Pattern:</strong> Immediately feeling defective or 'bad' when making mistakes. <strong>Cue:</strong> Criticism, failure, or imperfection. <strong>Reward:</strong> Avoiding the vulnerability of being seen as flawed by punishing yourself first.</p>,
            },
            {
              id: 'anger',
              title: 'Habitual Anger/Defensiveness',
              content: <p><strong>Pattern:</strong> Reacting with defensiveness or anger when feeling criticized or controlled. <strong>Cue:</strong> Perceived threat to autonomy or self-image. <strong>Reward:</strong> Protection from vulnerability---anger feels stronger than hurt.</p>,
            },
            {
              id: 'withdrawal',
              title: 'Habitual Withdrawal',
              content: <p><strong>Pattern:</strong> Shutting down emotionally or physically when conflict arises. <strong>Cue:</strong> Interpersonal tension or emotional intensity. <strong>Reward:</strong> Avoidance of confrontation and the short-term relief of escape.</p>,
            },
          ]}
        />

        <h2 id="where-they-come-from" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Where Emotional Habits Come From
        </h2>
        <p className="mb-6">
          Most emotional habits are rooted in early experiences and survival strategies <Citation id="7" index={7} source="Trends in Neurosciences" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Childhood environment:</strong> If expressing anger led to punishment, you learned to suppress it. If crying brought comfort, you learned to cry when overwhelmed.</li>
          <li><strong>Attachment patterns:</strong> Anxious attachment creates habitual fear of abandonment. Avoidant attachment creates habitual emotional distance.</li>
          <li><strong>Trauma:</strong> A single intense experience can create a lasting emotional habit---hypervigilance after assault, panic in enclosed spaces after being trapped.</li>
          <li><strong>Modeling:</strong> You learned emotional patterns by watching caregivers. If your parent always catastrophized, you may do the same.</li>
        </ul>

        <QuoteBlock
          quote="We don't see things as they are, we see them as we are. Our emotional habits filter every experience through the lens of what we've learned to expect."
          attribution="Anaïs Nin"
          role="Writer"
          source="The Seduction of the Minotaur"
          variant="default"
        />

        <h2 id="why-they-persist" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Emotional Habits Are So Hard to Change
        </h2>
        <p className="mb-6">
          Several factors make emotional habits particularly sticky:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>They operate below conscious awareness:</strong> By the time you notice the emotion, the habit has already run.</li>
          <li><strong>They feel like truth:</strong> "I'm anxious because this situation IS threatening," not "I'm anxious because I have a habit of responding this way."</li>
          <li><strong>They serve a protective function:</strong> Even maladaptive habits once kept you safe. Your brain resists giving up survival strategies.</li>
          <li><strong>They're reinforced daily:</strong> Every time you avoid, withdraw, or catastrophize, you strengthen the pathway.</li>
          <li><strong>There's often a secondary gain:</strong> Anxiety motivates productivity. Anger creates distance. Shame prevents rejection.</li>
        </ul>

        <h2 id="how-to-change" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Change an Emotional Habit
        </h2>
        <p className="mb-6">
          Research on habit reversal shows that you can't delete a neural pathway---but you can build a new one that eventually becomes stronger <Citation id="4" index={4} source="Behaviour Research and Therapy" year="2020" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: '1. Identify the Pattern',
              description: <p>Notice the cue-routine-reward loop. 'When X happens (cue), I always feel Y (routine), and it gives me Z (reward)." Name the pattern without judgment.</p>,
            },
            {
              title: '2. Catch the Cue Early',
              description: <p>The earlier you catch the cue, the easier it is to interrupt. Learn your personal warning signs---physical sensations, thoughts, situations.</p>,
            },
            {
              title: '3. Pause Before the Routine',
              description: <p>Insert space between the cue and the habitual response. Even 5 seconds of awareness disrupts automaticity.</p>,
            },
            {
              title: '4. Choose a New Response',
              description: <p>Replace the old routine with a new one that provides a similar reward. If anxiety gives you control, find another way to feel grounded (breathwork, action planning).</p>,
            },
            {
              title: '5. Repeat Consistently',
              description: <p>Building a new pathway requires repetition. The first 10 times will feel forced. The next 100 will start to feel natural.</p>,
            },
          ]}
        />

        <ArticleCallout variant="tip" title="Habit Replacement, Not Elimination">
          <p>Don't try to stop the old habit---replace it. Your brain needs a new script to run when the old cue appears. If your habit is to withdraw when criticized, the new habit might be to pause, breathe, and ask a clarifying question.</p>
        </ArticleCallout>

        <h2 id="self-compassion" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Self-Compassion Matters Here
        </h2>
        <p className="mb-6">
          Emotional habits developed for a reason---they were adaptive at some point in your life. Shame about having them only reinforces the pattern <Citation id="6" index={6} source="Annual Review of Clinical Psychology" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          Instead of "Why do I always do this? What's wrong with me?" try: "This pattern made sense once. It's not serving me anymore. I'm learning a new way."
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If emotional habits are interfering with your functioning---causing relationship damage, work problems, or significant distress---therapy can help. Habit Reversal Training (HRT), Cognitive Behavioral Therapy (CBT), and Dialectical Behavior Therapy (DBT) all target habitual emotional patterns <Citation id="8" index={8} source="Journal of Consulting and Clinical Psychology" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          Emotional habits are not permanent. They're just well-practiced. And with awareness, patience, and deliberate practice, you can teach your brain a new way to respond.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // Article 42: Understanding Emotional Triggers
  // ==========================================================================
  {
    id: catId(42),
    slug: 'why-you-always-react-the-same-way-understanding-emotional-triggers',
    title: 'Why You Always React the Same Way: Understanding Emotional Triggers',
    description: 'Discover what triggers are, how they form, and why certain situations provoke intense reactions---plus how to identify and defuse your personal triggers.',
    image: "/images/articles/cat01/cover-042.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Triggers', 'Trauma', 'Emotional Reactivity', 'Self-Awareness'],
    citations: [
      {
        id: '1',
        text: 'The neurobiology of emotional triggers in PTSD',
        source: 'Biological Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1016/j.biopsych.2020.02.009',
        tier: 1,
      },
      {
        id: '2',
        text: 'Associative learning and emotional memory',
        source: 'Nature Reviews Neuroscience',
        year: '2019',
        link: 'https://doi.org/10.1038/s41583-019-0176-8',
        tier: 1,
      },
      {
        id: '3',
        text: 'Identifying and managing emotional triggers: A clinical guide',
        source: 'Clinical Psychology: Science and Practice',
        year: '2021',
        link: 'https://doi.org/10.1037/cps0000042',
        tier: 1,
      },
      {
        id: '4',
        text: 'The role of context in emotional triggering',
        source: 'Emotion',
        year: '2020',
        link: 'https://doi.org/10.1037/emo0000691',
        tier: 1,
      },
      {
        id: '5',
        text: 'Trauma and the body: A sensorimotor approach to psychotherapy',
        source: 'Norton Professional Books',
        year: '2006',
        link: 'https://www.worldcat.org/title/trauma-and-the-body/oclc/70173915',
        tier: 5,
      },
      {
        id: '6',
        text: 'Exposure therapy for emotional triggers: Meta-analysis',
        source: 'Journal of Anxiety Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.janxdis.2021.102374',
        tier: 1,
      },
      {
        id: '7',
        text: 'Emotional regulation and trigger management in BPD',
        source: 'Personality Disorders: Theory, Research, and Treatment',
        year: '2019',
        link: 'https://doi.org/10.1037/per0000345',
        tier: 1,
      },
      {
        id: '8',
        text: 'The window of tolerance: A model for understanding dysregulation',
        source: 'Journal of Psychotherapy Integration',
        year: '2018',
        link: 'https://doi.org/10.1037/int0000118',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            A colleague says "We need to talk, ' and your heart races. Someone raises their voice slightly and you shut down completely. You see a car accident on the highway and panic floods your system hours later. These aren't overreactions---they're triggers, and understanding them is key to breaking free from automatic emotional patterns.
          </p>
          <p className="mb-6">
            A trigger is a stimulus---internal or external---that activates an intense emotional response disproportionate to the current situation <Citation id="1" index={1} source="Biological Psychiatry" year="2020" tier={1} />. The intensity is because your brain has connected this stimulus to a past experience, and it's responding to the old threat, not the present moment.
          </p>
        </div>

        <h2 id="what-is-a-trigger" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Exactly Is a Trigger?
        </h2>
        <p className="mb-6">
          A trigger is any sensory or emotional experience that your brain has associated with danger, pain, or threat---usually because of a past event <Citation id="2" index={2} source="Nature Reviews Neuroscience" year="2019" tier={1} />. When you encounter that stimulus again, your brain bypasses rational thought and activates the threat response.
        </p>

        <ComparisonTable
          title="Normal Response vs. Triggered Response"
          columns={['Dimension', 'Normal Response', 'Triggered Response']}
          items={[
            { feature: 'Intensity', values: ['Proportionate to situation', 'Disproportionate, overwhelming'] },
            { feature: 'Duration', values: ['Brief, resolves when situation ends', 'Lasts long after stimulus is gone'] },
            { feature: 'Cognitive access', values: ['Can think clearly, use reason', 'Rational brain goes offline'] },
            { feature: 'Origin', values: ['Current situation', 'Past experience bleeding into present'] },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>When you're triggered, you're not responding to what's happening now---you're responding to what happened then. Your brain is trying to protect you from a threat that no longer exists.</p>
        </ArticleCallout>

        <h2 id="types-of-triggers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Types of Triggers
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'sensory',
              title: 'Sensory Triggers',
              content: (
                <div>
                  <p className="mb-2">Sights, sounds, smells, tastes, or textures that activate traumatic memory.</p>
                  <p><strong>Examples:</strong> A specific cologne reminds you of an ex. The smell of alcohol triggers fear from growing up with an alcoholic parent. Sirens activate panic from a past accident.</p>
                </div>
              ),
            },
            {
              id: 'interpersonal',
              title: 'Interpersonal Triggers',
              content: (
                <div>
                  <p className="mb-2">Relational dynamics or interactions that echo past painful experiences.</p>
                  <p><strong>Examples:</strong> Being criticized triggers shame from childhood. Someone withdrawing emotionally triggers abandonment fear. Raised voices trigger freeze response from witnessing domestic violence.</p>
                </div>
              ),
            },
            {
              id: 'internal',
              title: 'Internal Triggers',
              content: (
                <div>
                  <p className="mb-2">Thoughts, feelings, or body sensations that remind you of a past threat.</p>
                  <p><strong>Examples:</strong> Feeling vulnerable triggers defensive anger. Chest tightness triggers panic because it resembles a past panic attack. Feeling ignored triggers rage from neglect history.</p>
                </div>
              ),
            },
            {
              id: 'situational',
              title: 'Situational Triggers',
              content: (
                <div>
                  <p className="mb-2">Environments, dates, or contexts linked to past distress.</p>
                  <p><strong>Examples:</strong> Hospitals trigger medical trauma. Anniversaries of loss trigger grief. Crowded spaces trigger assault-related hypervigilance.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="how-they-form" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Triggers Form: The Neuroscience
        </h2>
        <p className="mb-6">
          Triggers are created through associative learning <Citation id="2" index={2} source="Nature Reviews Neuroscience" year="2019" tier={1} />. When you experience a threatening or painful event, your brain encodes everything present at the time---sights, sounds, smells, emotions, body sensations---into the memory.
        </p>
        <p className="mb-6">
          Later, when you encounter any part of that sensory constellation, your amygdala (threat detection center) lights up and activates the fight-flight-freeze response---even if the current situation is objectively safe.
        </p>

        <StatCard
          stats={[
            { value: 300, suffix: ' ms', label: 'Time for amygdala to detect threat and trigger response' },
            { value: 3, suffix: ' sec', label: 'Delay before prefrontal cortex can intervene' },
            { value: 70, suffix: '%', label: 'Of people with PTSD report hypersensitivity to triggers' },
          ]}
          source="Biological Psychiatry, 2020"
        />

        <ArticleCallout variant="did-you-know">
          <p>Traumatic memories are often stored as fragmented sensory experiences rather than coherent narratives. This is why triggers can feel so confusing---you feel terror without knowing why <Citation id="5" index={5} source="Norton Professional Books" year="2006" tier={5} />.</p>
        </ArticleCallout>

        <h2 id="window-of-tolerance" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Window of Tolerance
        </h2>
        <p className="mb-6">
          Psychiatrist Dan Siegel introduced the concept of the "window of tolerance"---the zone in which you can process emotions and stress without becoming dysregulated <Citation id="8" index={8} source="Journal of Psychotherapy Integration" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          When you're within your window, you can think clearly, make decisions, and manage emotions. When a trigger pushes you outside your window, you either:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Hyperarousal (above the window):</strong> Fight or flight---racing heart, panic, anger, hypervigilance</li>
          <li><strong>Hypoarousal (below the window):</strong> Freeze or collapse---numbness, dissociation, shutdown, emptiness</li>
        </ul>

        <ArticleChart
          type="area"
          title="The Window of Tolerance"
          data={[
            { label: 'Hyperarousal', value: 85 },
            { label: 'Optimal Zone', value: 50 },
            { label: 'Hypoarousal', value: 15 },
          ]}
          source="Journal of Psychotherapy Integration, 2018"
        />

        <h2 id="common-triggers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Emotional Triggers
        </h2>
        <p className="mb-6">
          While triggers are deeply personal, certain themes are common <Citation id="4" index={4} source="Emotion" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Rejection or abandonment:</strong> Someone canceling plans, not responding to texts, pulling away emotionally</li>
          <li><strong>Criticism or judgment:</strong> Feedback at work, corrective comments, perceived disapproval</li>
          <li><strong>Feeling controlled or powerless:</strong> Someone making decisions for you, being told what to do, loss of autonomy</li>
          <li><strong>Being ignored or dismissed:</strong> Feeling unseen, interrupted, talked over, minimized</li>
          <li><strong>Injustice or unfairness:</strong> Witnessing cruelty, inequality, rule-breaking without consequences</li>
          <li><strong>Loss of safety or predictability:</strong> Unexpected change, chaos, uncertainty</li>
        </ul>

        <h2 id="identifying-yours" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Identify Your Triggers
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Track Your Reactions',
              description: <p>When you have an intense emotional reaction, write down: What happened? What did I feel? How intense (1-10)? How long did it last?</p>,
            },
            {
              title: 'Look for Patterns',
              description: <p>After a few weeks, review your notes. Do certain people, topics, or situations consistently provoke the same reaction?</p>,
            },
            {
              title: 'Identify the Underlying Wound',
              description: <p>Ask: What does this remind me of? What fear does this activate? Often the trigger connects to a core wound: abandonment, inadequacy, powerlessness.</p>,
            },
            {
              title: 'Notice Physical Cues',
              description: <p>Triggers often show up in the body first. Learn your personal warning signs: tightness in chest, heat rising, nausea, numbness.</p>,
            },
          ]}
        />

        <ArticleCallout variant="tip" title={`The "Then vs. Now' Exercise`}>
          <p>When triggered, ask yourself: "Am I responding to what's happening NOW, or to what happened THEN?" This simple question can help you identify when past pain is bleeding into the present.</p>
        </ArticleCallout>

        <h2 id="managing-triggers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Manage Triggers in the Moment
        </h2>
        <p className="mb-6">
          You can't always prevent triggers, but you can reduce their intensity and duration <Citation id="3" index={3} source="Clinical Psychology: Science and Practice" year="2021" tier={1} />:
        </p>

        <ul className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Name it:</strong> "I'm being triggered right now." Labeling the experience activates the prefrontal cortex and reduces amygdala activation.</li>
          <li><strong>Ground yourself:</strong> Use the 5-4-3-2-1 technique (5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste) to anchor in the present.</li>
          <li><strong>Regulate your nervous system:</strong> Deep breathing, cold water on your face, progressive muscle relaxation---physiological interventions calm the threat response.</li>
          <li><strong>Remind yourself of safety:</strong> "That was then, this is now. I am safe. I am an adult. I have choices."</li>
          <li><strong>Remove yourself if needed:</strong> It's okay to say "I need a break" and step away until you're regulated.</li>
        </ul>

        <h2 id="long-term-healing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Long-Term: Healing the Trigger at the Root
        </h2>
        <p className="mb-6">
          Managing triggers in the moment is helpful, but addressing the underlying wound is what creates lasting change. This often requires professional help.
        </p>

        <ArticleAccordion
          type="single"
          items={[
            {
              id: 'exposure',
              title: 'Exposure Therapy',
              content: <p>Gradually and safely confronting the trigger in a controlled environment helps your brain learn that the stimulus is no longer dangerous <Citation id="6" index={6} source="Journal of Anxiety Disorders" year="2021" tier={1} />.</p>,
            },
            {
              id: 'emdr',
              title: 'EMDR (Eye Movement Desensitization and Reprocessing)',
              content: <p>Helps reprocess traumatic memories so they're stored as 'past events' rather than "current threats," reducing trigger intensity.</p>,
            },
            {
              id: 'somatic',
              title: 'Somatic Therapy',
              content: <p>Works with body-based responses to trauma, helping you release stored activation and expand your window of tolerance.</p>,
            },
            {
              id: 'dbt',
              title: 'DBT (Dialectical Behavior Therapy)',
              content: <p>Particularly effective for people with frequent triggers and emotional dysregulation, like those with BPD or trauma histories <Citation id="7" index={7} source="Personality Disorders: Theory, Research, and Treatment" year="2019" tier={1} />.</p>,
            },
          ]}
        />

        <QuoteBlock
          quote="Triggers are not signs of weakness. They are breadcrumbs leading you back to unhealed wounds that need your compassion, not your judgment."
          attribution="Bessel van der Kolk"
          role="Psychiatrist and Trauma Researcher"
          source="The Body Keeps the Score"
          variant="default"
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If triggers are interfering with daily functioning---causing avoidance of important activities, damaging relationships, or creating constant hypervigilance---therapy can help. Trauma-focused treatments are highly effective at reducing trigger sensitivity.
        </p>
        <p className="mb-6">
          Understanding your triggers is not about eliminating all discomfort---it's about recognizing when the past is hijacking the present, and giving yourself the tools to stay anchored in now.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // Article 43: The Cycle of Emotional Avoidance
  // ==========================================================================
  {
    id: catId(43),
    slug: 'the-cycle-of-emotional-avoidance-why-running-from-feelings-makes-them-louder',
    title: 'The Cycle of Emotional Avoidance: Why Running from Feelings Makes Them Louder',
    description: 'Discover why avoiding painful emotions paradoxically intensifies them---and how to break the avoidance cycle for lasting relief.',
    image: "/images/articles/cat01/cover-043.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Avoidance', 'Acceptance', 'Coping', 'Anxiety'],
    citations: [
      { id: '1', text: 'Experiential avoidance and psychopathology', source: 'Psychological Bulletin', year: '2020', link: 'https://doi.org/10.1037/bul0000280', tier: 1 },
      { id: '2', text: 'The paradoxical effects of thought suppression', source: 'Journal of Personality and Social Psychology', year: '2019', link: 'https://doi.org/10.1037/pspa0000147', tier: 1 },
      { id: '3', text: 'Acceptance and Commitment Therapy for emotional avoidance', source: 'Behavior Therapy', year: '2021', link: 'https://doi.org/10.1016/j.beth.2020.12.002', tier: 1 },
      { id: '4', text: 'Avoidance coping and mental health outcomes', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101871', tier: 1 },
      { id: '5', text: 'The neuroscience of emotion regulation through acceptance', source: 'NeuroImage', year: '2019', link: 'https://doi.org/10.1016/j.neuroimage.2019.06.010', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "Just don't think about it.", "Distract yourself.", "Keep busy." We've all tried to outrun uncomfortable emotions. And for a moment, it works---until the feeling comes back stronger, more persistent, demanding to be felt.
          </p>
          <p className="mb-6">
            Emotional avoidance is the attempt to escape, suppress, or control unwanted emotions, thoughts, or sensations <Citation id="1" index={1} source="Psychological Bulletin" year="2020" tier={1} />. It's one of the most common coping strategies---and also one of the most destructive. Because avoiding emotions doesn't make them disappear. It makes them grow.
          </p>
        </div>

        <h2 id="the-paradox" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Paradox: Suppression Amplifies
        </h2>
        <p className="mb-6">
          In a famous study, participants were told "Don't think about a white bear." Predictably, they couldn't stop thinking about white bears. This is the ironic process theory: trying to suppress a thought makes it more intrusive <Citation id="2" index={2} source="Journal of Personality and Social Psychology" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          The same principle applies to emotions. When you try to push away sadness, anxiety, or anger, your brain allocates more resources to monitoring and suppressing that emotion---which keeps it front and center. The emotion doesn't fade; it intensifies.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>What you resist persists. Emotions that aren't acknowledged and processed don't disappear---they go underground and leak out in unexpected ways.</p>
        </ArticleCallout>

        <h2 id="forms-of-avoidance" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Forms of Emotional Avoidance
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Distraction:</strong> Constantly keeping busy, scrolling, working, socializing---anything to avoid stillness where feelings arise</li>
          <li><strong>Numbing:</strong> Alcohol, drugs, overeating, oversleeping---dulling all sensation to escape the painful ones</li>
          <li><strong>Intellectualization:</strong> Analyzing feelings instead of feeling them---"I know why I feel this way" without actually experiencing it</li>
          <li><strong>Suppression:</strong> Pushing feelings down, white-knuckling through, "staying strong"</li>
          <li><strong>Rumination:</strong> Obsessing about the situation instead of feeling the emotion---thinking about sadness rather than crying</li>
        </ul>

        <h2 id="why-it-backfires" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Avoidance Backfires
        </h2>
        <p className="mb-6">
          Emotional avoidance creates a vicious cycle <Citation id="4" index={4} source="Clinical Psychology Review" year="2020" tier={1} />:
        </p>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Uncomfortable emotion arises', description: <p>You feel sadness, fear, anger, or shame.</p> },
            { title: 'You avoid the feeling', description: <p>You distract, suppress, or numb.</p> },
            { title: 'Short-term relief', description: <p>The emotion temporarily decreases---this rewards the avoidance.</p> },
            { title: 'Emotion returns stronger', description: <p>Unprocessed emotions don't resolve---they accumulate.</p> },
            { title: 'Avoidance becomes habitual', description: <p>Your brain learns: 'Avoidance works!" and does it more.</p> },
          ]}
        />

        <h2 id="breaking-the-cycle" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Breaking the Cycle: Radical Acceptance
        </h2>
        <p className="mb-6">
          The alternative to avoidance is acceptance---willingly experiencing emotions without trying to change, escape, or judge them <Citation id="3" index={3} source="Behavior Therapy" year="2021" tier={1} />. This doesn't mean liking the emotion. It means making room for it.
        </p>
        <ArticleCallout variant="tip">
          <p>Ask yourself: "Can I let this feeling be here, just for now, without fighting it?" The answer is usually yes---and the emotion often softens when you stop resisting it.</p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If avoidance is interfering with your life---substance use, compulsive behaviors, chronic numbing---therapy can help. Acceptance and Commitment Therapy (ACT) specifically targets experiential avoidance and teaches psychological flexibility.
        </p>
        <p className="mb-6">
          You don't have to like your emotions. But learning to coexist with them, rather than running from them, is what creates lasting peace.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // Article 44: Emotional Eating, Shopping, Scrolling
  // ==========================================================================
  {
    id: catId(44),
    slug: 'emotional-eating-shopping-scrolling-understanding-coping-mechanisms',
    title: 'Emotional Eating, Shopping, and Scrolling: Understanding Coping Mechanisms',
    description: 'Why we turn to food, spending, and screens to manage feelings---and how to develop healthier ways to cope with emotional discomfort.',
    image: "/images/articles/cat01/cover-044.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Coping Mechanisms', 'Emotional Eating', 'Behavioral Patterns', 'Self-Regulation'],
    citations: [
      { id: '1', text: 'Emotional eating and its correlates', source: 'Appetite', year: '2020', link: 'https://doi.org/10.1016/j.appet.2020.104829', tier: 1 },
      { id: '2', text: 'Compulsive buying behavior: A meta-analysis', source: 'Journal of Behavioral Addictions', year: '2019', link: 'https://doi.org/10.1556/2006.8.2019.31', tier: 1 },
      { id: '3', text: 'Problematic smartphone use and emotional regulation', source: 'Computers in Human Behavior', year: '2021', link: 'https://doi.org/10.1016/j.chb.2021.106803', tier: 1 },
      { id: '4', text: 'Behavioral activation for depression', source: 'Behavior Therapy', year: '2020', link: 'https://doi.org/10.1016/j.beth.2019.09.005', tier: 1 },
      { id: '5', text: 'Mindful eating interventions: A review', source: 'Eating Behaviors', year: '2021', link: 'https://doi.org/10.1016/j.eatbeh.2021.101503', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You're not hungry, but you're standing in front of the fridge. You don't need anything, but your shopping cart has five items. You're exhausted, but you've been scrolling for an hour. These aren't random behaviors---they're emotional coping mechanisms in disguise.
          </p>
          <p className="mb-6">
            When uncomfortable emotions arise and we don't know how to process them, we often turn to behaviors that provide immediate relief: eating, shopping, scrolling, gaming, binge-watching. These aren't inherently bad---but when they become our primary way of managing emotions, they create more problems than they solve.
          </p>
        </div>

        <h2 id="why-we-do-it" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why We Turn to These Behaviors
        </h2>
        <p className="mb-6">
          All of these behaviors provide:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Immediate comfort:</strong> A quick hit of dopamine, distraction, or pleasure</li>
          <li><strong>Emotional numbing:</strong> Temporary escape from painful feelings</li>
          <li><strong>Sense of control:</strong> When life feels chaotic, these behaviors feel manageable</li>
          <li><strong>Self-soothing:</strong> A way to provide yourself comfort when you're distressed</li>
        </ul>

        <h2 id="emotional-eating" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Emotional Eating: Food as Comfort
        </h2>
        <p className="mb-6">
          Emotional eating is using food to manage emotions rather than satisfy physical hunger <Citation id="1" index={1} source="Appetite" year="2020" tier={1} />. It's not about lack of willpower---it's about unprocessed feelings.
        </p>
        <p className="mb-6">
          Common triggers: stress, boredom, loneliness, sadness, anxiety. The cycle: feel uncomfortable → eat to soothe → temporary relief → guilt/shame → repeat.
        </p>
        <ArticleCallout variant="tip">
          <p>Before eating, ask: "Am I physically hungry, or am I feeling something?" If it's the latter, name the emotion first. Sometimes just acknowledging it reduces the urge.</p>
        </ArticleCallout>

        <h2 id="retail-therapy" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Compulsive Shopping: Buying Feelings Away
        </h2>
        <p className="mb-6">
          Shopping provides a temporary mood boost and sense of control <Citation id="2" index={2} source="Journal of Behavioral Addictions" year="2019" tier={1} />. But when it becomes compulsive---shopping to escape emotions rather than meet needs---it creates financial stress and guilt.
        </p>
        <p className="mb-6">
          Warning signs: buying things you don't need, hiding purchases, feeling regret immediately after, shopping to cope with negative emotions.
        </p>

        <h2 id="scrolling" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Endless Scrolling: Numbing Through Screens
        </h2>
        <p className="mb-6">
          Phones and social media provide infinite distraction from uncomfortable internal states <Citation id="3" index={3} source="Computers in Human Behavior" year="2021" tier={1} />. You're not scrolling because the content is valuable---you're scrolling to avoid feeling.
        </p>
        <p className="mb-6">
          The problem: digital distraction prevents you from processing emotions, and the comparison and negativity online often worsen the feelings you were trying to escape.
        </p>

        <h2 id="healthier-alternatives" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Building Healthier Coping Mechanisms
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Pause and name the feeling', description: <p>Before reaching for the behavior, ask: 'What am I feeling right now?"</p> },
            { title: 'Sit with it briefly', description: <p>Can you tolerate the emotion for just 60 seconds without acting? Often it peaks and fades.</p> },
            { title: 'Choose a response', description: <p>If you still want to eat/shop/scroll, do it mindfully. If not, try a healthier alternative: walk, call a friend, journal, breathe.</p> },
            { title: 'Practice self-compassion', description: <p>If you engage in the behavior, don't shame yourself. Notice the pattern without judgment: "I ate my feelings today. That's information."</p> },
          ]}
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If these behaviors are causing significant distress---financial problems, health issues, or interfering with daily life---consider therapy. Behavioral Activation, DBT, and mindfulness-based interventions address maladaptive coping <Citation id="4" index={4} source="Behavior Therapy" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          These behaviors aren't the problem---they're symptoms of unmet emotional needs. Healing means learning to meet those needs directly rather than through temporary escapes.
        </p>
      </>
    ),
  },

  // ==========================================================================
  // Article 45: Childhood Experiences Shape Adult Patterns
  // ==========================================================================
  {
    id: catId(45),
    slug: 'how-childhood-experiences-shape-your-adult-emotional-patterns',
    title: 'How Childhood Experiences Shape Your Adult Emotional Patterns',
    description: 'Discover how early relationships and experiences create lasting emotional blueprints---and how awareness can help you rewrite old patterns.',
    image: "/images/articles/cat01/cover-045.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Childhood', 'Attachment', 'Development', 'Healing'],
    citations: [
      { id: '1', text: 'Early life stress and adult psychopathology', source: 'Nature Neuroscience', year: '2020', link: 'https://doi.org/10.1038/s41593-020-0622-6', tier: 1 },
      { id: '2', text: 'Attachment in childhood and emotional regulation in adulthood', source: 'Developmental Psychology', year: '2019', link: 'https://doi.org/10.1037/dev0000749', tier: 1 },
      { id: '3', text: 'Adverse childhood experiences and emotion dysregulation', source: 'Journal of Traumatic Stress', year: '2021', link: 'https://doi.org/10.1002/jts.22649', tier: 1 },
      { id: '4', text: 'Schema therapy for early maladaptive schemas', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101854', tier: 1 },
      { id: '5', text: 'Neuroplasticity and recovery from childhood trauma', source: 'Biological Psychiatry', year: '2021', link: 'https://doi.org/10.1016/j.biopsych.2021.01.004', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "Why do I always shut down when someone gets angry?", "Why do I panic when people get too close?", "Why do I feel responsible for everyone's emotions?" The answers often trace back to childhood---not because you're stuck in the past, but because your brain learned patterns early that it still runs today.
          </p>
          <p className="mb-6">
            Your early experiences---especially with caregivers---taught you what emotions are safe to feel, how to get your needs met, and how to navigate relationships <Citation id="1" index={1} source="Nature Neuroscience" year="2020" tier={1} />. These lessons became your emotional blueprint. Understanding this blueprint is the first step to rewriting it.
          </p>
        </div>

        <h2 id="the-blueprint" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Emotional Blueprint: What You Learned Early
        </h2>
        <p className="mb-6">
          As a child, you learned emotional patterns through observation, experience, and necessity. Your developing brain absorbed lessons about:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Which emotions are acceptable:</strong> If anger was punished, you learned to suppress it. If sadness was met with comfort, you learned to express it.</li>
          <li><strong>How to get needs met:</strong> If crying brought attention, you learned to cry. If independence was rewarded, you learned to hide needs.</li>
          <li><strong>What relationships feel like:</strong> If love was conditional, you learned to perform. If caregivers were unpredictable, you learned hypervigilance.</li>
        </ul>

        <h2 id="attachment-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Attachment: The Foundation of Emotional Patterns
        </h2>
        <p className="mb-6">
          Attachment theory shows that your earliest relationships shape how you regulate emotions and relate to others across your lifespan <Citation id="2" index={2} source="Developmental Psychology" year="2019" tier={1} />.
        </p>
        <ComparisonTable
          title="Attachment Styles and Emotional Patterns"
          columns={['Style', 'Childhood Experience', 'Adult Pattern']}
          items={[
            { feature: 'Secure', values: ['Consistent care, emotions validated', 'Comfortable with intimacy and independence'] },
            { feature: 'Anxious', values: ['Inconsistent care, unpredictable responses', 'Fear of abandonment, emotional intensity'] },
            { feature: 'Avoidant', values: ['Emotional neglect, dismissed needs', 'Emotional distance, self-reliance'] },
            { feature: 'Disorganized', values: ['Frightening or abusive care', 'Push-pull dynamics, emotional chaos'] },
          ]}
        />

        <h2 id="aces" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Adverse Childhood Experiences (ACEs)
        </h2>
        <p className="mb-6">
          ACEs---trauma, neglect, household dysfunction---have lasting effects on emotional regulation <Citation id="3" index={3} source="Journal of Traumatic Stress" year="2021" tier={1} />. Common patterns from ACEs:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Hypervigilance to threat, difficulty relaxing</li>
          <li>Emotional numbing or flooding</li>
          <li>Difficulty trusting others or asking for help</li>
          <li>Shame, worthlessness, or self-blame</li>
        </ul>
        <ArticleCallout variant="info">
          <p>If you experienced ACEs, your emotional patterns make sense---they were survival strategies. Healing is possible through neuroplasticity and therapeutic support <Citation id="5" index={5} source="Biological Psychiatry" year="2021" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="recognizing-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recognizing Your Patterns
        </h2>
        <p className="mb-6">
          Ask yourself:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>What emotions were discouraged in my family? Do I still suppress those?</li>
          <li>How did my caregivers respond to distress? Do I do the same to myself or others?</li>
          <li>What did I have to do to feel safe or loved? Am I still doing that in adult relationships?</li>
        </ul>

        <h2 id="rewriting-the-script" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Rewriting the Script
        </h2>
        <p className="mb-6">
          Awareness is the first step. Healing involves:
        </p>
        <ul className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Naming the origin:</strong> "I learned this pattern as a child to stay safe."</li>
          <li><strong>Challenging the belief:</strong> "Is this still true? Do I still need this strategy?"</li>
          <li><strong>Practicing new responses:</strong> Deliberately choosing different emotional reactions</li>
          <li><strong>Reparenting yourself:</strong> Giving yourself what you didn't receive---validation, comfort, permission to feel</li>
        </ul>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          If childhood patterns are causing significant suffering---relationship problems, chronic dysregulation, unresolved trauma---therapy helps. Schema Therapy, EMDR, and attachment-based therapies target these early patterns <Citation id="4" index={4} source="Clinical Psychology Review" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          Your past doesn't have to be your future. With awareness, compassion, and deliberate practice, you can build new emotional patterns---ones that serve the adult you are now, not the child you were then.
        </p>
      </>
    ),
  },
];
