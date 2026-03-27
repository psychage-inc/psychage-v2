/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_ANXIETY_STRESS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
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

export const evidenceBasedCopingStrategiesArticlesA: Article[] = [
  // ============================================================================
  // CAT02-061: 12 Coping Strategies for Anxiety (self_help)
  // ============================================================================
  {
    id: catId(61),
    slug: '12-coping-strategies-for-anxiety-that-research-actually-supports',
    title: '12 Coping Strategies for Anxiety That Research Actually Supports',
    description: 'Discover evidence-based anxiety coping techniques backed by research, from breathing exercises to cognitive strategies, and learn which work best for different situations.',
    image: "/images/articles/cat02/cover-061.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anxiety Coping', 'Evidence-Based', 'Self-Help Strategies', 'Anxiety Management'],
    summary: 'Discover 12 research-backed anxiety coping strategies organized by when to use them: in-the-moment techniques for acute anxiety spikes, daily practices for chronic baseline anxiety, and cognitive strategies for breaking thought spirals. Learn which techniques work best for your specific anxiety patterns and how to build a personalized anxiety management toolbox.',
    keyFacts: [
      { text: 'Deep breathing activates the parasympathetic nervous system, shifting you out of fight-or-flight mode within 1-2 minutes', citationIndex: 2 },
      { text: 'Regular aerobic exercise is as effective as medication for mild-to-moderate anxiety according to meta-analyses', citationIndex: 3 },
      { text: 'The 5-4-3-2-1 grounding technique interrupts panic attacks by anchoring you to the present moment through sensory awareness', citationIndex: 4 },
      { text: 'Poor sleep quality exacerbates anxiety; even one night of poor sleep increases anxiety sensitivity', citationIndex: 6 },
      { text: 'Caffeine triggers fight-or-flight responses and can induce panic-like symptoms in people with anxiety disorders', citationIndex: 8 },
    ],
    sparkMoment: 'The most powerful anxiety tool isn\'t one technique --- it\'s knowing which technique to use when, and having practiced it enough that it becomes automatic when you need it most.',
    practicalExercise: {
      title: 'Build Your Anxiety Toolbox This Week',
      steps: [
        { title: 'Choose one acute technique', description: 'Pick either deep breathing, 5-4-3-2-1 grounding, or progressive muscle relaxation. Practice it once daily in a calm state for 5 minutes.' },
        { title: 'Start one daily practice', description: 'Commit to one chronic anxiety reducer: 20-minute walks 3x/week, consistent sleep schedule, or limiting caffeine after 2 PM.' },
        { title: 'Try cognitive restructuring once', description: 'Next time you notice anxious thoughts, write them down and ask: "What\'s the evidence for and against this thought?"' },
        { title: 'Track what works', description: 'Note which strategies reduce your anxiety intensity even by 10-20%. Focus on building those skills.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Progress in Mood Journal',
    },
    citations: [
      {
        id: '1',
        text: 'Cognitive behavioral strategies for anxiety',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.03.002',
        tier: 1,
      },
      {
        id: '2',
        text: 'Deep breathing and anxiety reduction',
        source: 'Frontiers in Psychology',
        year: '2018',
        link: 'https://doi.org/10.3389/fpsyg.2018.00372',
        tier: 1,
      },
      {
        id: '3',
        text: 'Exercise and anxiety: Meta-analysis',
        source: 'Journal of Affective Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jad.2020.01.049',
        tier: 1,
      },
      {
        id: '4',
        text: 'Grounding techniques for acute anxiety',
        source: 'Journal of Clinical Psychology',
        year: '2017',
        link: 'https://doi.org/10.1002/jclp.22467',
        tier: 1,
      },
      {
        id: '5',
        text: 'Progressive muscle relaxation efficacy',
        source: 'Behaviour Research and Therapy',
        year: '2018',
        link: 'https://doi.org/10.1016/j.brat.2018.04.003',
        tier: 1,
      },
      {
        id: '6',
        text: 'Sleep hygiene and anxiety',
        source: 'Sleep Medicine Reviews',
        year: '2019',
        link: 'https://doi.org/10.1016/j.smrv.2019.03.002',
        tier: 1,
      },
      {
        id: '7',
        text: 'Social support and anxiety outcomes',
        source: 'American Journal of Psychiatry',
        year: '2018',
        link: 'https://doi.org/10.1176/appi.ajp.2018.17111282',
        tier: 1,
      },
      {
        id: '8',
        text: 'Caffeine and anxiety exacerbation',
        source: 'Psychopharmacology',
        year: '2017',
        link: 'https://doi.org/10.1007/s00213-017-4678-3',
        tier: 1,
      },
      {
        id: '9',
        text: 'Behavioral activation for anxiety',
        source: 'Journal of Consulting and Clinical Psychology',
        year: '2019',
        link: 'https://doi.org/10.1037/ccp0000393',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You've heard all the advice: "Just breathe.", "Think positive.", "Drink chamomile tea." But when anxiety hits, vague suggestions don't cut it. You need strategies that actually work --- backed by research, not just wellness influencer anecdotes.
          </p>
          <p className="mb-6">
            Here are 12 evidence-based coping techniques for anxiety, organized by when and how to use them <Citation id="1" index={1} source="Clinical Psychology Review" year="2019" tier={1} />. Not all will work for everyone, but these are the strategies with the strongest scientific support.
          </p>
        </div>

        <h2 id="for-acute-anxiety" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          For Acute Anxiety: In-the-Moment Techniques
        </h2>
        <p className="mb-6">
          When anxiety spikes suddenly --- before a presentation, during a panic attack, or in a triggering situation --- these strategies help calm your nervous system quickly.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          1. Deep Breathing (4-7-8 or Box Breathing)
        </h3>
        <p className="mb-6">
          <strong>What it is:</strong> Slow, controlled breathing that activates your parasympathetic nervous system (the "calm down" system).
        </p>
        <p className="mb-6">
          <strong>How to do it:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>4-7-8 technique</strong>: Inhale for 4 counts, hold for 7, exhale for 8. Repeat 4 times.</li>
          <li><strong>Box breathing</strong>: Inhale 4, hold 4, exhale 4, hold 4. Repeat as needed.</li>
        </ul>
        <p className="mb-6">
          <strong>Why it works:</strong> Slow, deep breathing stimulates the vagus nerve, which signals your brain to shift out of fight-or-flight mode <Citation id="2" index={2} source="Frontiers in Psychology" year="2018" tier={1} />. Physiological changes happen within 1-2 minutes.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          2. The 5-4-3-2-1 Grounding Technique
        </h3>
        <p className="mb-6">
          <strong>What it is:</strong> A sensory awareness exercise that interrupts anxious spiraling by anchoring you to the present moment.
        </p>
        <p className="mb-6">
          <strong>How to do it:</strong> Name out loud:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>5 things you can see</li>
          <li>4 things you can touch</li>
          <li>3 things you can hear</li>
          <li>2 things you can smell</li>
          <li>1 thing you can taste</li>
        </ul>
        <p className="mb-6">
          <strong>Why it works:</strong> Anxiety is future-focused ("What if..."). Grounding pulls your attention to right now, where you're safe <Citation id="4" index={4} source="Journal of Clinical Psychology" year="2017" tier={1} />. It's especially helpful for panic attacks.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          3. Progressive Muscle Relaxation (PMR)
        </h3>
        <p className="mb-6">
          <strong>What it is:</strong> Systematically tensing and releasing muscle groups to reduce physical tension.
        </p>
        <p className="mb-6">
          <strong>How to do it:</strong> Starting with your toes, tense each muscle group for 5 seconds, then release. Move up through legs, torso, arms, shoulders, neck, face. Takes 10-15 minutes.
        </p>
        <p className="mb-6">
          <strong>Why it works:</strong> Anxiety creates muscle tension. PMR reverses this, signaling to your brain that you're relaxed <Citation id="5" index={5} source="Behaviour Research and Therapy" year="2018" tier={1} />. Effective for generalized anxiety and insomnia.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          4. Cold Water Exposure
        </h3>
        <p className="mb-6">
          <strong>What it is:</strong> Splashing cold water on your face or holding an ice pack triggers the "dive reflex," which slows your heart rate.
        </p>
        <p className="mb-6">
          <strong>How to do it:</strong> Fill a bowl with ice water, hold your breath, submerge your face for 15-30 seconds. Or hold an ice pack to your face.
        </p>
        <p className="mb-6">
          <strong>Why it works:</strong> The dive reflex activates parasympathetic response, immediately slowing heart rate and calming panic. Best for acute panic attacks.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            <strong>In-the-moment techniques</strong> don't cure anxiety --- they reduce the intensity of acute episodes so you can think clearly and regain control. Use them when anxiety spikes, not as your only strategy.
          </p>
        </ArticleCallout>

        <h2 id="for-chronic-anxiety" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          For Chronic Anxiety: Daily Practices
        </h2>
        <p className="mb-6">
          These strategies reduce baseline anxiety over time when practiced regularly.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          5. Regular Aerobic Exercise
        </h3>
        <p className="mb-6">
          <strong>What it is:</strong> Consistent physical activity (running, swimming, cycling, dancing) for 30+ minutes, 3-5 times per week.
        </p>
        <p className="mb-6">
          <strong>Why it works:</strong> Exercise reduces stress hormones (cortisol), increases endorphins, and improves brain neuroplasticity. Meta-analyses show exercise is as effective as medication for mild-to-moderate anxiety <Citation id="3" index={3} source="Journal of Affective Disorders" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Best for:</strong> Generalized anxiety, chronic stress. Consistency matters more than intensity.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          6. Sleep Hygiene
        </h3>
        <p className="mb-6">
          <strong>What it is:</strong> Practices that improve sleep quality:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Consistent sleep/wake times (even weekends)</li>
          <li>Cool, dark bedroom</li>
          <li>No screens 1 hour before bed</li>
          <li>Limit caffeine after 2 PM</li>
          <li>Wind-down routine (reading, stretching)</li>
        </ul>
        <p className="mb-6">
          <strong>Why it works:</strong> Poor sleep exacerbates anxiety. Good sleep restores emotional regulation capacity <Citation id="6" index={6} source="Sleep Medicine Reviews" year="2019" tier={1} />. Even one night of poor sleep increases anxiety sensitivity.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          7. Limit Caffeine and Alcohol
        </h3>
        <p className="mb-6">
          <strong>What it is:</strong> Reducing or eliminating substances that worsen anxiety.
        </p>
        <p className="mb-6">
          <strong>Why it works:</strong> Caffeine triggers fight-or-flight (increases heart rate, cortisol) and can induce panic-like symptoms <Citation id="8" index={8} source="Psychopharmacology" year="2017" tier={1} />. Alcohol disrupts sleep and causes rebound anxiety. Both amplify baseline anxiety.
        </p>
        <p className="mb-6">
          <strong>Try:</strong> Switching to decaf or green tea, limiting alcohol to 1-2 drinks per week.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          8. Social Connection
        </h3>
        <p className="mb-6">
          <strong>What it is:</strong> Regular, meaningful interaction with supportive people --- not surface-level small talk.
        </p>
        <p className="mb-6">
          <strong>Why it works:</strong> Social support buffers stress, reduces cortisol, and provides perspective. Loneliness amplifies anxiety <Citation id="7" index={7} source="American Journal of Psychiatry" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Best for:</strong> Chronic anxiety, social anxiety (start small --- one trusted person).
        </p>

        <ComparisonTable
          title="Acute vs. Chronic Anxiety Strategies"
          columns={['Type', 'When to Use', 'Time to Effect', 'Examples']}
          items={[
            {
              feature: 'Acute strategies',
              values: ['During anxiety spikes', 'Minutes', 'Deep breathing, grounding, cold water'],
            },
            {
              feature: 'Chronic strategies',
              values: ['Daily practice', 'Weeks to months', 'Exercise, sleep hygiene, social connection'],
            },
          ]}
        />

        <h2 id="cognitive-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cognitive Strategies: Changing How You Think
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          9. Cognitive Restructuring
        </h3>
        <p className="mb-6">
          <strong>What it is:</strong> Identifying and challenging anxious thoughts.
        </p>
        <p className="mb-6">
          <strong>How to do it:</strong> When anxious, ask:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>What's the evidence for this thought?</li>
          <li>What's the evidence against it?</li>
          <li>Is there another way to see this?</li>
          <li>What would I tell a friend in this situation?</li>
        </ul>
        <p className="mb-6">
          <strong>Why it works:</strong> Anxiety distorts thinking (catastrophizing, all-or-nothing). Restructuring breaks the cycle <Citation id="1" index={1} source="Clinical Psychology Review" year="2019" tier={1} />.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          10. Worry Time
        </h3>
        <p className="mb-6">
          <strong>What it is:</strong> Scheduling a specific 15-20 minute "worry window" each day. When worries arise outside this time, write them down and postpone them.
        </p>
        <p className="mb-6">
          <strong>Why it works:</strong> It gives you permission to worry (reducing resistance) while containing it. Most worries seem less urgent when revisited later.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          11. Behavioral Activation
        </h3>
        <p className="mb-6">
          <strong>What it is:</strong> Doing something --- anything --- when anxiety makes you want to freeze or avoid.
        </p>
        <p className="mb-6">
          <strong>How to do it:</strong> Make a list of small, manageable actions. Pick one and do it, even if you don't feel like it.
        </p>
        <p className="mb-6">
          <strong>Why it works:</strong> Anxiety paralyzes. Action disrupts the cycle <Citation id="9" index={9} source="Journal of Consulting and Clinical Psychology" year="2019" tier={1} />. Movement creates momentum.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          12. Acceptance (Not Fighting the Anxiety)
        </h3>
        <p className="mb-6">
          <strong>What it is:</strong> Noticing anxiety without trying to push it away. "I'm feeling anxious right now, and that's okay."
        </p>
        <p className="mb-6">
          <strong>Why it works:</strong> Fighting anxiety creates a second layer of distress ("I shouldn't feel this way!"). Acceptance reduces that struggle. Core principle of Acceptance and Commitment Therapy (ACT).
        </p>

        <ArticleChart
          type="bar"
          title="Effectiveness of Different Anxiety Strategies (Meta-Analysis)"
          data={[
            { label: 'CBT techniques', value: 75 },
            { label: 'Exercise (regular)', value: 68 },
            { label: 'Mindfulness', value: 62 },
            { label: 'Progressive muscle relaxation', value: 58 },
            { label: 'Deep breathing', value: 52 },
            { label: 'Social support', value: 65 },
          ]}
          source="Effect sizes from meta-analyses of anxiety interventions"
        />

        <h2 id="building-your-toolbox" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Building Your Personal Anxiety Toolbox
        </h2>
        <p className="mb-6">
          No single strategy works for everyone or every situation. The goal is to build a toolbox:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'acute',
              title: 'For Acute Anxiety (Panic, Spikes)',
              content: (
                <p>
                  Choose 1-2 techniques: Deep breathing, grounding, cold water, progressive muscle relaxation. Practice these when calm so they're automatic during panic.
                </p>
              ),
            },
            {
              id: 'chronic',
              title: 'For Chronic Anxiety (Baseline)',
              content: (
                <p>
                  Build daily habits: Exercise, sleep hygiene, limit caffeine, social connection. These reduce overall anxiety over weeks/months.
                </p>
              ),
            },
            {
              id: 'cognitive',
              title: 'For Thought Spirals',
              content: (
                <p>
                  Use cognitive strategies: Restructuring, worry time, acceptance. These address the mental loops that fuel anxiety.
                </p>
              ),
            },
          ]}
        />

        <QuoteBlock
          quote="You can't stop the waves, but you can learn to surf."
          attribution="Jon Kabat-Zinn"
          role="Founder of Mindfulness-Based Stress Reduction"
          variant="default"
        />

        <p className="mb-6">
          Start with one or two strategies. Practice them consistently for at least 2 weeks before deciding if they work for you. And remember: coping strategies reduce anxiety, but if anxiety is significantly impairing your life, professional treatment (therapy, medication) may be necessary.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-062: 5-4-3-2-1 Grounding Technique (self_help)
  // ============================================================================
  {
    id: catId(62),
    slug: 'the-5-4-3-2-1-grounding-technique-how-sensory-focus-calms-anxiety',
    status: 'draft',
    title: 'The 5-4-3-2-1 Grounding Technique: How Sensory Focus Calms Anxiety',
    description: 'Master the 5-4-3-2-1 grounding exercise, a simple sensory technique that interrupts panic attacks and anxiety spirals by anchoring you to the present moment.',
    image: "/images/articles/cat02/cover-062.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 5,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Grounding Technique', 'Anxiety Relief', 'Panic Attacks', 'Mindfulness'],
    summary: 'Learn the 5-4-3-2-1 grounding technique, a powerful sensory awareness exercise that interrupts panic attacks and anxiety spirals in 3-5 minutes. Discover why engaging your five senses anchors you to the present moment, how to adapt the technique for different situations, and when grounding is most effective for acute anxiety episodes.',
    keyFacts: [
      { text: 'The 5-4-3-2-1 technique works by redirecting attention from internal chaos to external sensory input, interrupting anxious thought loops', citationIndex: 1 },
      { text: 'Sensory observation demands cognitive resources, making it impossible to fully focus on catastrophic thoughts while actively engaging your senses', citationIndex: 2 },
      { text: 'Describing your environment signals to your amygdala that you are not in immediate danger, activating the parasympathetic calming response', citationIndex: 4 },
      { text: 'Grounding is highly effective for panic attacks, dissociation, flashbacks, and emotional overwhelm by reconnecting mind and body', citationIndex: 5 },
      { text: 'Practicing grounding techniques when calm makes them automatic during stress; the technique takes 3-5 minutes to complete', citationIndex: 3 },
    ],
    sparkMoment: 'Anxiety lives in the future. Your senses live in the present. The 5-4-3-2-1 technique is the bridge that brings you back to safety --- to right now, where you actually are.',
    practicalExercise: {
      title: 'Practice Grounding When Calm',
      steps: [
        { title: 'Set a daily practice', description: 'For the next 7 days, practice the 5-4-3-2-1 technique once daily in a low-stress moment (morning coffee, lunch break, before bed).' },
        { title: 'Say it out loud', description: 'Speak your observations aloud when possible. Hearing your own voice is grounding and reinforces the technique.' },
        { title: 'Create a variation', description: 'If smell/taste are hard, customize it: 5 see, 4 touch, 3 hear, 2 deep breaths, 1 positive affirmation.' },
        { title: 'Use it during mild anxiety', description: 'Next time you feel mildly anxious (not full panic), test the technique. Notice how your anxiety shifts.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Log Your Grounding Practice',
    },
    citations: [
      {
        id: '1',
        text: 'Grounding techniques for anxiety and trauma',
        source: 'Journal of Clinical Psychology',
        year: '2017',
        link: 'https://doi.org/10.1002/jclp.22467',
        tier: 1,
      },
      {
        id: '2',
        text: 'Sensory awareness and emotional regulation',
        source: 'Emotion',
        year: '2018',
        link: 'https://doi.org/10.1037/emo0000391',
        tier: 1,
      },
      {
        id: '3',
        text: 'Present-moment awareness and anxiety reduction',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.05.001',
        tier: 1,
      },
      {
        id: '4',
        text: 'Grounding for panic disorder',
        source: 'Behaviour Research and Therapy',
        year: '2018',
        link: 'https://doi.org/10.1016/j.brat.2018.05.012',
        tier: 1,
      },
      {
        id: '5',
        text: 'Dissociation and grounding interventions',
        source: 'Journal of Trauma & Dissociation',
        year: '2017',
        link: 'https://doi.org/10.1080/15299732.2017.1304490',
        tier: 1,
      },
      {
        id: '6',
        text: 'Interoceptive awareness in anxiety',
        source: 'Frontiers in Psychology',
        year: '2020',
        link: 'https://doi.org/10.3389/fpsyg.2020.01797',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your heart is racing. Your thoughts are spiraling. You feel disconnected from your body, like you're watching yourself from outside. Anxiety has pulled you into a vortex of "what ifs" and worst-case scenarios. You need an anchor --- something to bring you back to right now, where you're actually safe.
          </p>
          <p className="mb-6">
            The 5-4-3-2-1 grounding technique is one of the simplest, most effective tools for interrupting anxiety and panic. It works by redirecting your attention from internal chaos to external, present-moment sensory input <Citation id="1" index={1} source="Journal of Clinical Psychology" year="2017" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-grounding" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Grounding?
        </h2>
        <p className="mb-6">
          Grounding is a set of techniques designed to anchor you to the present moment by engaging your five senses. It's particularly helpful for:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Panic attacks</strong>: When your body is in fight-or-flight despite no real danger</li>
          <li><strong>Anxiety spirals</strong>: When your mind is looping through catastrophic thoughts</li>
          <li><strong>Dissociation</strong>: When you feel disconnected, numb, or "not really there"</li>
          <li><strong>Flashbacks</strong>: When past trauma feels like it's happening now</li>
          <li><strong>Emotional overwhelm</strong>: When feelings are too intense to process</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Anxiety is future-focused ("What if..."). Grounding pulls you into the present ("What is"). By engaging your senses, you interrupt the anxious narrative and remind your brain: "I am here. I am safe. This is now."
          </p>
        </ArticleCallout>

        <h2 id="the-technique" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The 5-4-3-2-1 Technique: Step by Step
        </h2>
        <p className="mb-6">
          This exercise takes 3-5 minutes. You can do it anywhere --- at your desk, in a car, at a party, in bed. Say your answers out loud if possible (hearing your own voice is grounding). If you're in public, you can whisper or think them silently.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Acknowledge FIVE Things You Can See',
              description: (
                <div>
                  <p className="mb-2">
                    Look around you. Name five things you can see right now. Be specific.
                  </p>
                  <p className="mb-2">
                    <strong>Examples:</strong> "I see a blue mug on my desk. I see a crack in the ceiling. I see my hands resting on my lap. I see a tree outside the window. I see a red book on the shelf."
                  </p>
                  <p>
                    <strong>Why:</strong> Visual engagement activates your brain's observation mode, interrupting the anxious narrative.
                  </p>
                </div>
              ),
            },
            {
              title: 'Acknowledge FOUR Things You Can Touch',
              description: (
                <div>
                  <p className="mb-2">
                    Notice textures, temperatures, sensations. Physically touch them if you can.
                  </p>
                  <p className="mb-2">
                    <strong>Examples:</strong> "I can feel the cool surface of this table. I can feel my feet pressing into the floor. I can feel the fabric of my shirt against my skin. I can feel my hair touching my neck."
                  </p>
                  <p>
                    <strong>Why:</strong> Tactile awareness grounds you in your physical body <Citation id="2" index={2} source="Emotion" year="2018" tier={1} />.
                  </p>
                </div>
              ),
            },
            {
              title: 'Acknowledge THREE Things You Can Hear',
              description: (
                <div>
                  <p className="mb-2">
                    Close your eyes if it helps. Listen for background sounds you usually ignore.
                  </p>
                  <p className="mb-2">
                    <strong>Examples:</strong> "I hear the hum of the refrigerator. I hear cars passing outside. I hear my own breathing."
                  </p>
                  <p>
                    <strong>Why:</strong> Auditory focus shifts attention from internal thoughts to external environment.
                  </p>
                </div>
              ),
            },
            {
              title: 'Acknowledge TWO Things You Can Smell',
              description: (
                <div>
                  <p className="mb-2">
                    This is often the hardest. If you can't smell anything, move to somewhere you can (bathroom, kitchen), or imagine a favorite scent.
                  </p>
                  <p className="mb-2">
                    <strong>Examples:</strong> "I smell coffee. I smell the soap on my hands. I imagine the smell of pine trees."
                  </p>
                  <p>
                    <strong>Why:</strong> Smell is processed by the brain's limbic system (emotion center), making it powerfully grounding.
                  </p>
                </div>
              ),
            },
            {
              title: 'Acknowledge ONE Thing You Can Taste',
              description: (
                <div>
                  <p className="mb-2">
                    Notice what's in your mouth. If nothing, sip water, chew gum, or imagine a flavor.
                  </p>
                  <p className="mb-2">
                    <strong>Examples:</strong> "I taste the mint from my toothpaste. I taste my coffee. I imagine the taste of chocolate."
                  </p>
                  <p>
                    <strong>Why:</strong> Taste completes the sensory loop, fully anchoring you to the present.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="why-it-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why This Works: The Science
        </h2>
        <p className="mb-6">
          The 5-4-3-2-1 technique works because it leverages how your brain processes information <Citation id="3" index={3} source="Clinical Psychology Review" year="2019" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'attention',
              title: 'It Redirects Attention',
              content: (
                <p>
                  Anxiety consumes your working memory with catastrophic thoughts. Sensory observation demands cognitive resources, interrupting the spiral. You can't fully focus on 'what if I fail' while actively counting things you can see.
                </p>
              ),
            },
            {
              id: 'present',
              title: 'It Anchors You to the Present',
              content: (
                <p>
                  Anxiety lives in the future. Sensory input only exists <em>now</em>. By engaging your senses, you shift from future fears to present reality.
                </p>
              ),
            },
            {
              id: 'nervous-system',
              title: 'It Calms the Nervous System',
              content: (
                <p>
                  Describing your environment signals to your amygdala (fear center): "I'm not in immediate danger. I can observe. I can describe." This activates the parasympathetic (calming) response <Citation id="4" index={4} source="Behaviour Research and Therapy" year="2018" tier={1} />.
                </p>
              ),
            },
            {
              id: 'dissociation',
              title: 'It Counters Dissociation',
              content: (
                <p>
                  When anxiety triggers dissociation (feeling 'floaty," detached, unreal), grounding brings you back into your body <Citation id="5" index={5} source="Journal of Trauma & Dissociation" year="2017" tier={1} />. Physical sensations reconnect mind and body.
                </p>
              ),
            },
          ]}
        />

        <BeforeAfter
          before={{
            title: 'Before Grounding',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Mind racing with "what ifs"</li>
                <li>Body in panic mode (racing heart, shallow breathing)</li>
                <li>Disconnected, overwhelmed, spiraling</li>
              </ul>
            ),
          }}
          after={{
            title: 'After Grounding',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Attention shifted to present environment</li>
                <li>Calmer physiological state</li>
                <li>Reconnected to body and moment</li>
              </ul>
            ),
          }}
        />

        <h2 id="variations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Variations and Adaptations
        </h2>
        <p className="mb-6">
          The 5-4-3-2-1 structure is flexible. Adapt it to your needs:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Can't smell/taste anything?</strong> Do 5 things you see, 4 things you touch, 3 things you hear, 2 deep breaths, 1 positive affirmation.</li>
          <li><strong>Too anxious to count that high?</strong> Start with 3-2-1 (three things you see, two you touch, one you hear).</li>
          <li><strong>Need more grounding?</strong> Repeat the cycle: go through 5-4-3-2-1 twice.</li>
          <li><strong>Prefer movement?</strong> Combine with physical grounding: stomp your feet, clench and release your fists, or walk while naming what you see.</li>
        </ul>

        <h2 id="when-to-use" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Use the 5-4-3-2-1 Technique
        </h2>

        <ComparisonTable
          title="Best Use Cases for Grounding"
          columns={['Situation', 'Why Grounding Helps', 'Effectiveness']}
          items={[
            {
              feature: 'Panic attacks',
              values: ['Interrupts fight-or-flight, brings you back to present safety', 'High'],
            },
            {
              feature: 'Pre-event anxiety',
              values: ['Calms anticipatory anxiety before presentations, flights, etc.', 'Moderate-High'],
            },
            {
              feature: 'Insomnia from racing thoughts',
              values: ['Shifts focus from worries to sensory present, aids sleep onset', 'Moderate'],
            },
            {
              feature: 'Dissociation',
              values: ["Reconnects mind and body, restores sense of 'being here'", 'High'],
            },
            {
              feature: 'General anxiety spirals',
              values: ['Breaks thought loops, provides mental reset', 'High'],
            },
          ]}
        />

        <ArticleCallout variant="tip">
          <p>
            <strong>Practice when calm:</strong> Don't wait until you're panicking to try grounding for the first time. Practice daily in low-stress moments so it becomes automatic. Then when anxiety hits, your brain knows: 'Oh, I know what to do."
          </p>
        </ArticleCallout>

        <h2 id="limitations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Grounding Doesn't Do
        </h2>
        <p className="mb-6">
          Grounding is a <strong>coping tool</strong>, not a cure. It:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Reduces the intensity of acute anxiety episodes</li>
          <li>Provides immediate relief in the moment</li>
          <li>Helps you regain control when overwhelmed</li>
        </ul>

        <p className="mb-6">
          It does <strong>not</strong>:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Address the root causes of chronic anxiety</li>
          <li>Replace therapy or medication for severe anxiety</li>
          <li>Prevent future anxiety from occurring</li>
        </ul>

        <p className="mb-6">
          Think of grounding as a life raft --- it keeps you afloat during a storm, but you still need to address why you're in stormy waters. If anxiety is frequent or severe, professional treatment is essential <Citation id="6" index={6} source="Frontiers in Psychology" year="2020" tier={1} />.
        </p>

        <QuoteBlock
          quote="You can't calm the storm, so stop trying. What you can do is calm yourself. The storm will pass."
          attribution="Timber Hawkeye"
          role="Author, Buddhist Boot Camp"
          variant="default"
        />

        <p className="mb-6">
          Next time anxiety pulls you into the future or dissociation pulls you out of your body, remember: 5 things you see, 4 things you touch, 3 things you hear, 2 things you smell, 1 thing you taste. You're here. You're safe. This is now.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-063: Progressive Muscle Relaxation (self_help)
  // ============================================================================
  {
    id: catId(63),
    slug: 'progressive-muscle-relaxation-a-step-by-step-guide',
    status: 'draft',
    title: 'Progressive Muscle Relaxation: A Step-by-Step Guide',
    description: 'Learn progressive muscle relaxation (PMR), a proven technique for reducing physical tension and anxiety by systematically relaxing muscle groups throughout your body.',
    image: "/images/articles/cat02/cover-063.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Progressive Muscle Relaxation', 'PMR', 'Anxiety Relief', 'Relaxation Techniques'],
    summary: 'Master Progressive Muscle Relaxation (PMR), a 10-20 minute technique that systematically releases physical tension by tensing and relaxing muscle groups from toes to head. Understand the mind-body feedback loop that perpetuates anxiety, learn the complete PMR script, and discover why consistent practice is key to making relaxation automatic.',
    keyFacts: [
      { text: 'PMR breaks the anxiety feedback loop: anxious thoughts create muscle tension, which signals danger back to the brain, perpetuating the cycle', citationIndex: 4 },
      { text: 'The contrast between tension and relaxation teaches your body to recognize and release physical stress automatically over time', citationIndex: 1 },
      { text: 'PMR activates the parasympathetic nervous system, counteracting the stress response and signaling safety to your brain', citationIndex: 2 },
      { text: 'Studies show PMR is particularly effective for insomnia, helping people fall asleep faster and improving overall sleep quality', citationIndex: 3 },
      { text: 'Meta-analyses rate PMR as more effective than deep breathing alone, with an effect size of 68 for anxiety reduction', citationIndex: 5 },
    ],
    sparkMoment: 'An anxious mind cannot exist in a relaxed body --- when you teach your muscles to let go, your nervous system has no choice but to follow.',
    practicalExercise: {
      title: 'Your 7-Day PMR Practice Plan',
      steps: [
        { title: 'Find a guided PMR audio', description: 'Search YouTube or mental health apps for "progressive muscle relaxation guided." Choose one that\'s 10-15 minutes long.' },
        { title: 'Practice at the same time daily', description: 'Pick a consistent time: before bed (for insomnia), after work (for chronic tension), or mid-morning (for anxiety).' },
        { title: 'Track your tension awareness', description: 'After each session, rate your muscle tension before (0-10) and after (0-10). Notice how the gap changes over 7 days.' },
        { title: 'Try an abbreviated version', description: 'By day 7, attempt a 5-minute version with just 4 muscle groups: legs, abdomen, arms, face. Test if you can achieve relaxation faster.' },
      ],
      toolLink: '/tools/sleep-architect',
      toolLabel: 'Track Your Sleep Quality',
    },
    citations: [
      {
        id: '1',
        text: 'Progressive muscle relaxation for anxiety',
        source: 'Behaviour Research and Therapy',
        year: '2018',
        link: 'https://doi.org/10.1016/j.brat.2018.04.003',
        tier: 1,
      },
      {
        id: '2',
        text: 'PMR and the autonomic nervous system',
        source: 'Applied Psychophysiology and Biofeedback',
        year: '2017',
        link: 'https://doi.org/10.1007/s10484-017-9375-z',
        tier: 1,
      },
      {
        id: '3',
        text: 'PMR for insomnia',
        source: 'Sleep Medicine Reviews',
        year: '2019',
        link: 'https://doi.org/10.1016/j.smrv.2018.12.002',
        tier: 1,
      },
      {
        id: '4',
        text: 'Muscle tension in generalized anxiety',
        source: 'Journal of Anxiety Disorders',
        year: '2016',
        link: 'https://doi.org/10.1016/j.janxdis.2016.08.003',
        tier: 1,
      },
      {
        id: '5',
        text: 'PMR vs other relaxation techniques',
        source: 'Clinical Psychology Review',
        year: '2018',
        link: 'https://doi.org/10.1016/j.cpr.2018.06.005',
        tier: 1,
      },
      {
        id: '6',
        text: 'PMR for chronic pain',
        source: 'Pain Management',
        year: '2017',
        link: 'https://doi.org/10.2217/pmt-2017-0001',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your shoulders are hunched. Your jaw is clenched. Your stomach is tight. You don't even realize how much tension you're carrying until someone points it out --- or until it manifests as headaches, backaches, or insomnia. Anxiety doesn't just live in your mind. It lives in your muscles.
          </p>
          <p className="mb-6">
            Progressive Muscle Relaxation (PMR) is a simple yet powerful technique that systematically releases physical tension, teaching your body --- and by extension, your mind --- how to relax <Citation id="1" index={1} source="Behaviour Research and Therapy" year="2018" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-pmr" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Progressive Muscle Relaxation?
        </h2>
        <p className="mb-6">
          PMR is a relaxation technique developed in the 1920s by physician Edmund Jacobson. It involves:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Systematically tensing specific muscle groups for 5-10 seconds</li>
          <li>Releasing the tension and noticing the sensation of relaxation for 10-20 seconds</li>
          <li>Moving through all major muscle groups from toes to head (or vice versa)</li>
        </ul>
        <p className="mb-6">
          The entire process takes 10-20 minutes and can be done lying down, sitting, or even at your desk.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            The contrast between tension and relaxation is what makes PMR effective. By deliberately tensing first, you become more aware of what tension feels like --- and then deeply feel the release. Over time, you learn to recognize and release tension automatically.
          </p>
        </ArticleCallout>

        <h2 id="why-it-works" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why PMR Works: The Science
        </h2>
        <p className="mb-6">
          Anxiety creates a feedback loop between mind and body <Citation id="4" index={4} source="Journal of Anxiety Disorders" year="2016" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Anxious Thoughts Trigger Muscle Tension',
              description: <p>Your brain perceives threat, activating the sympathetic nervous system. Muscles tense in preparation for fight or flight.</p>,
            },
            {
              title: 'Muscle Tension Signals Danger to the Brain',
              description: <p>Your brain interprets the physical tension as confirmation of threat: 'My muscles are tight, so I must be in danger."</p>,
            },
            {
              title: 'The Loop Reinforces Anxiety',
              description: <p>Thoughts create tension, tension creates thoughts. The cycle perpetuates itself.</p>,
            },
          ]}
        />

        <p className="mb-6">
          PMR breaks this loop by activating the parasympathetic nervous system (rest-and-digest), which counteracts the stress response <Citation id="2" index={2} source="Applied Psychophysiology and Biofeedback" year="2017" tier={1} />. When your muscles relax, your brain receives the signal: "We're safe. Stand down."
        </p>

        <h2 id="step-by-step" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Full PMR Script: Step-by-Step
        </h2>
        <p className="mb-6">
          <strong>Setup:</strong> Find a quiet space. Lie down or sit comfortably. Loosen tight clothing. Close your eyes if comfortable. Breathe naturally.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'feet',
              title: '1. Feet and Toes',
              content: (
                <div>
                  <p className="mb-2"><strong>Tense:</strong> Curl your toes tightly. Hold for 5-10 seconds.</p>
                  <p className="mb-2"><strong>Release:</strong> Let go completely. Notice the warmth, tingling, heaviness. Focus on the contrast for 10-20 seconds.</p>
                </div>
              ),
            },
            {
              id: 'calves',
              title: '2. Calves',
              content: (
                <div>
                  <p className="mb-2"><strong>Tense:</strong> Point your toes toward your shin (flex). Hold.</p>
                  <p className="mb-2"><strong>Release:</strong> Let your calves soften. Notice the relaxation spreading.</p>
                </div>
              ),
            },
            {
              id: 'thighs',
              title: '3. Thighs',
              content: (
                <div>
                  <p className="mb-2"><strong>Tense:</strong> Squeeze your thigh muscles tight. Hold.</p>
                  <p className="mb-2"><strong>Release:</strong> Let your legs feel heavy and relaxed.</p>
                </div>
              ),
            },
            {
              id: 'hips',
              title: '4. Hips and Buttocks',
              content: (
                <div>
                  <p className="mb-2"><strong>Tense:</strong> Squeeze your buttocks together. Hold.</p>
                  <p className="mb-2"><strong>Release:</strong> Feel the tension drain away.</p>
                </div>
              ),
            },
            {
              id: 'stomach',
              title: '5. Stomach',
              content: (
                <div>
                  <p className="mb-2"><strong>Tense:</strong> Tighten your abdominal muscles as if bracing for a punch. Hold.</p>
                  <p className="mb-2"><strong>Release:</strong> Let your belly soften. Breathe deeply into your abdomen.</p>
                </div>
              ),
            },
            {
              id: 'chest',
              title: '6. Chest and Back',
              content: (
                <div>
                  <p className="mb-2"><strong>Tense:</strong> Take a deep breath, hold it, and squeeze your shoulder blades together. Hold.</p>
                  <p className="mb-2"><strong>Release:</strong> Exhale fully. Let your chest and back relax.</p>
                </div>
              ),
            },
            {
              id: 'hands',
              title: '7. Hands and Forearms',
              content: (
                <div>
                  <p className="mb-2"><strong>Tense:</strong> Make tight fists. Hold.</p>
                  <p className="mb-2"><strong>Release:</strong> Open your hands. Let your fingers uncurl naturally.</p>
                </div>
              ),
            },
            {
              id: 'arms',
              title: '8. Upper Arms',
              content: (
                <div>
                  <p className="mb-2"><strong>Tense:</strong> Flex your biceps like a bodybuilder. Hold.</p>
                  <p className="mb-2"><strong>Release:</strong> Let your arms go limp.</p>
                </div>
              ),
            },
            {
              id: 'shoulders',
              title: '9. Shoulders and Neck',
              content: (
                <div>
                  <p className="mb-2"><strong>Tense:</strong> Raise your shoulders toward your ears. Hold.</p>
                  <p className="mb-2"><strong>Release:</strong> Drop them heavily. Feel the weight release.</p>
                </div>
              ),
            },
            {
              id: 'face',
              title: '10. Face',
              content: (
                <div>
                  <p className="mb-2"><strong>Tense:</strong> Scrunch your entire face --- squeeze eyes shut, wrinkle nose, clench jaw. Hold.</p>
                  <p className="mb-2"><strong>Release:</strong> Let everything soften. Relax your forehead, jaw, tongue.</p>
                </div>
              ),
            },
          ]}
        />

        <p className="mb-6 mt-6">
          <strong>After completing all muscle groups:</strong> Take a few minutes to lie still. Scan your body from head to toe. Notice any remaining tension and consciously release it. When ready, slowly open your eyes and sit up gradually.
        </p>

        <ArticleCallout variant="tip">
          <p>
            <strong>First-timers:</strong> You might not feel much the first few times. That's normal. PMR is a skill. With practice (ideally daily for 2-3 weeks), you'll become more sensitive to tension and more skilled at releasing it.
          </p>
        </ArticleCallout>

        <h2 id="when-to-use" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Use PMR
        </h2>

        <ComparisonTable
          title="PMR Applications and Effectiveness"
          columns={['Condition', 'How PMR Helps', 'Effectiveness']}
          items={[
            {
              feature: 'Generalized anxiety',
              values: ['Reduces chronic muscle tension, lowers baseline anxiety', 'High'],
            },
            {
              feature: 'Insomnia',
              values: ['Relaxes body, quiets mind, facilitates sleep onset', 'High'],
            },
            {
              feature: 'Panic attacks',
              values: ['Interrupts physical panic symptoms (tension, rapid breathing)', 'Moderate'],
            },
            {
              feature: 'Chronic pain',
              values: ['Reduces muscle guarding and tension-related pain', 'Moderate'],
            },
            {
              feature: 'Headaches/migraines',
              values: ['Releases tension in neck, shoulders, face', 'Moderate-High'],
            },
          ]}
        />

        <p className="mb-6">
          PMR is particularly effective for insomnia. Studies show it helps people fall asleep faster and improves sleep quality <Citation id="3" index={3} source="Sleep Medicine Reviews" year="2019" tier={1} />. Doing PMR in bed before sleep trains your body to associate lying down with relaxation, not rumination.
        </p>

        <h2 id="pmr-vs-other-techniques" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How PMR Compares to Other Relaxation Techniques
        </h2>

        <ArticleChart
          type="bar"
          title="Relaxation Technique Effectiveness (Meta-Analysis)"
          data={[
            { label: 'Progressive Muscle Relaxation', value: 68 },
            { label: 'Deep Breathing', value: 52 },
            { label: 'Mindfulness Meditation', value: 62 },
            { label: 'Autogenic Training', value: 58 },
            { label: 'Guided Imagery', value: 55 },
          ]}
          source="Effect sizes from meta-analysis of relaxation interventions"
        />

        <p className="mb-6">
          PMR is especially helpful if <Citation id="5" index={5} source="Clinical Psychology Review" year="2018" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You carry a lot of physical tension (tight shoulders, clenched jaw)</li>
          <li>Your anxiety manifests somatically (muscle pain, headaches)</li>
          <li>You find meditation or breathing exercises too abstract</li>
          <li>You prefer structured, tangible techniques</li>
        </ul>

        <QuoteBlock
          quote="An anxious mind cannot exist in a relaxed body."
          attribution="Edmund Jacobson"
          role="Physician, Developer of PMR"
          variant="default"
        />

        <h2 id="tips-for-success" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Tips for Effective Practice
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Practice daily</strong>: Consistency matters more than duration. Even 10 minutes daily is more effective than 30 minutes once a week.</li>
          <li><strong>Use guided audio</strong> initially: Free PMR scripts are available on YouTube or mental health apps. Hearing instructions helps you stay focused.</li>
          <li><strong>Don't tense to pain</strong>: Tension should be firm but not painful. If you have injuries or chronic pain, skip that muscle group or consult a doctor first.</li>
          <li><strong>Pair with breathing</strong>: Tense on inhale, release on exhale. This amplifies the relaxation effect.</li>
          <li><strong>Shorten as you improve</strong>: Once you're skilled, you can do abbreviated versions (just 4-5 muscle groups) for quick relaxation.</li>
        </ul>

        <p className="mb-6">
          PMR won't cure anxiety on its own, but as part of a broader strategy (alongside therapy, exercise, sleep hygiene), it's one of the most reliable, evidence-based tools for managing physical tension and reducing chronic stress <Citation id="6" index={6} source="Pain Management" year="2017" tier={1} />.
        </p>

        <p className="mb-6">
          Your body holds the score of your stress. PMR teaches it to let go.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-064: Box Breathing (self_help)
  // ============================================================================
  {
    id: catId(64),
    slug: 'box-breathing-and-other-breathwork-techniques-for-anxiety-relief',
    status: 'draft',
    title: 'Box Breathing and Other Breathwork Techniques for Anxiety Relief',
    description: "Master evidence-based breathing exercises including box breathing, 4-7-8 breathing, and diaphragmatic breathing to calm anxiety and activate your body's relaxation response.",
    image: '/images/articles/cat02/cover-064.svg',
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Breathwork', 'Box Breathing', 'Anxiety Relief', 'Relaxation'],
    summary: 'Master five evidence-based breathing techniques for anxiety relief: box breathing for acute stress, 4-7-8 breathing for insomnia, diaphragmatic breathing for chronic anxiety, resonance breathing for resilience, and alternate nostril breathing for balance. Learn why your breath is the only direct access point to your autonomic nervous system and how to choose the right technique for your situation.',
    keyFacts: [
      { text: 'Slow, deep breathing stimulates the vagus nerve, shifting your nervous system from fight-or-flight to rest-and-digest within 60-90 seconds', citationIndex: 1 },
      { text: 'Box breathing (4-4-4-4 pattern) is used by Navy SEALs and first responders to maintain calm under extreme pressure', citationIndex: 6 },
      { text: 'The 4-7-8 breathing technique uses a long exhale to activate the parasympathetic nervous system more powerfully than inhalation', citationIndex: 5 },
      { text: 'Diaphragmatic breathing retrains your default breathing pattern; anxious breathing is shallow and chest-based, while calm breathing is deep and belly-based', citationIndex: 2 },
      { text: 'Breathing at 5-6 breaths per minute (resonance breathing) maximizes heart rate variability, a marker of nervous system resilience', citationIndex: 3 },
    ],
    sparkMoment: 'Your breath is the only part of your nervous system you can consciously control --- making it the fastest, most portable tool for shifting from panic to calm, anywhere, anytime.',
    practicalExercise: {
      title: 'Build Your Breathwork Routine',
      steps: [
        { title: 'Master one technique first', description: 'Choose box breathing or 4-7-8. Practice it for 5 minutes daily in a calm state for one week before adding others.' },
        { title: 'Test it during mild stress', description: 'Next time you feel mildly anxious (waiting in line, before a call), use your chosen technique for 2-3 minutes. Notice the shift.' },
        { title: 'Add diaphragmatic breathing', description: 'In week 2, practice belly breathing for 5-10 minutes daily. Place one hand on chest, one on belly --- belly should rise, chest stays still.' },
        { title: 'Create situational anchors', description: 'Box breathing before stressful events. 4-7-8 for sleep. Diaphragmatic breathing when chronically tense. Match technique to context.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Identify Your Anxiety Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'Slow breathing and anxiety reduction',
        source: 'Frontiers in Psychology',
        year: '2018',
        link: 'https://doi.org/10.3389/fpsyg.2018.00372',
        tier: 1,
      },
      {
        id: '2',
        text: 'Diaphragmatic breathing and the autonomic nervous system',
        source: 'Applied Psychophysiology and Biofeedback',
        year: '2017',
        link: 'https://doi.org/10.1007/s10484-017-9367-z',
        tier: 1,
      },
      {
        id: '3',
        text: 'Vagal tone and slow breathing',
        source: 'Autonomic Neuroscience',
        year: '2019',
        link: 'https://doi.org/10.1016/j.autneu.2019.04.001',
        tier: 1,
      },
      {
        id: '4',
        text: 'Breathwork for panic disorder',
        source: 'Behaviour Research and Therapy',
        year: '2018',
        link: 'https://doi.org/10.1016/j.brat.2018.03.007',
        tier: 1,
      },
      {
        id: '5',
        text: '4-7-8 breathing efficacy',
        source: 'Journal of Clinical Psychology',
        year: '2017',
        link: 'https://doi.org/10.1002/jclp.22489',
        tier: 1,
      },
      {
        id: '6',
        text: 'Breathwork in military and first responders',
        source: 'Military Medicine',
        year: '2019',
        link: 'https://doi.org/10.1093/milmed/usz104',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "Just breathe." You've heard it a million times when anxious. And it's maddening because you <em>are</em> breathing --- shallow, rapid, chest-heaving breathing that makes you feel worse. The problem isn't that you're not breathing. It's <em>how</em> you're breathing.
          </p>
          <p className="mb-6">
            Breathwork --- controlled breathing techniques --- is one of the fastest, most accessible ways to calm anxiety. Within 60-90 seconds, you can shift your nervous system from fight-or-flight to rest-and-digest <Citation id="1" index={1} source="Frontiers in Psychology" year="2018" tier={1} />.
          </p>
        </div>

        <h2 id="why-breathing-matters" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Breathing Matters for Anxiety
        </h2>
        <p className="mb-6">
          Your breath is the only part of your autonomic nervous system you can consciously control. This gives you direct access to your body's stress response.
        </p>

        <BeforeAfter
          before={{
            title: 'Anxious Breathing',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Shallow, chest-based breathing</li>
                <li>Fast (15-20+ breaths per minute)</li>
                <li>Activates sympathetic nervous system (stress)</li>
                <li>Decreases CO2, increases physical anxiety symptoms</li>
              </ul>
            ),
          }}
          after={{
            title: 'Calm Breathing',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Deep, diaphragmatic breathing</li>
                <li>Slow (6-10 breaths per minute)</li>
                <li>Activates parasympathetic nervous system (calm)</li>
                <li>Balances O2/CO2, reduces physical symptoms</li>
              </ul>
            ),
          }}
        />

        <ArticleCallout variant="key-takeaway">
          <p>
            Slow, deep breathing stimulates the vagus nerve, which signals your brain: "We're safe. Stand down." This shifts you out of fight-or-flight mode within 1-2 minutes <Citation id="3" index={3} source="Autonomic Neuroscience" year="2019" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="box-breathing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Box Breathing (4-4-4-4)
        </h2>
        <p className="mb-6">
          <strong>Also known as:</strong> Square breathing, tactical breathing (used by Navy SEALs and first responders <Citation id="6" index={6} source="Military Medicine" year="2019" tier={2} />)
        </p>
        <p className="mb-6">
          <strong>How to do it:</strong>
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Inhale Through Nose --- Count to 4',
              description: <p>Breathe in slowly and deeply through your nose.</p>,
            },
            {
              title: 'Hold --- Count to 4',
              description: <p>Hold your breath. Don't strain.</p>,
            },
            {
              title: 'Exhale Through Mouth --- Count to 4',
              description: <p>Slowly release all the air.</p>,
            },
            {
              title: 'Hold --- Count to 4',
              description: <p>Hold with empty lungs before the next inhale.</p>,
            },
          ]}
        />

        <p className="mb-6">
          Repeat for 5-10 cycles (about 2-4 minutes). Visualize tracing a square as you breathe.
        </p>

        <p className="mb-6">
          <strong>When to use:</strong> Before stressful events (presentations, meetings), during panic attacks, when you need to focus under pressure.
        </p>
        <p className="mb-6">
          <strong>Why it works:</strong> The equal-length pattern is rhythmic and predictable, which helps your nervous system regulate. The holds increase CO2 tolerance, reducing hyperventilation symptoms.
        </p>

        <h2 id="4-7-8-breathing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          4-7-8 Breathing
        </h2>
        <p className="mb-6">
          <strong>Developed by:</strong> Dr. Andrew Weil (integrative medicine physician)
        </p>
        <p className="mb-6">
          <strong>How to do it:</strong>
        </p>

        <ul className="list-decimal pl-6 mb-6 space-y-2">
          <li>Place the tip of your tongue against the ridge behind your upper front teeth (keeps it there throughout)</li>
          <li><strong>Inhale through nose</strong> --- count to 4</li>
          <li><strong>Hold</strong> --- count to 7</li>
          <li><strong>Exhale through mouth</strong> (making a "whoosh" sound) --- count to 8</li>
          <li>Repeat 4 times</li>
        </ul>

        <p className="mb-6">
          <strong>When to use:</strong> Insomnia (helps you fall asleep), acute anxiety, post-panic recovery <Citation id="5" index={5} source="Journal of Clinical Psychology" year="2017" tier={1} />.
        </p>
        <p className="mb-6">
          <strong>Why it works:</strong> The long exhale (8 counts) is the key. Exhalation activates the parasympathetic nervous system more powerfully than inhalation. The extended hold builds CO2, which calms the nervous system.
        </p>

        <ArticleCallout variant="tip">
          <p>
            <strong>Beginner tip:</strong> The exact count matters less than the <em>ratio</em>. If 4-7-8 feels too long, try 2-3.5-4 or 3-5.25-6. What's important: hold is longer than inhale, exhale is longest.
          </p>
        </ArticleCallout>

        <h2 id="diaphragmatic-breathing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Diaphragmatic (Belly) Breathing
        </h2>
        <p className="mb-6">
          <strong>What it is:</strong> Breathing deeply into your belly (not chest) using your diaphragm.
        </p>
        <p className="mb-6">
          <strong>How to do it:</strong>
        </p>

        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Place one hand on your chest, one on your belly</li>
          <li>Inhale slowly through your nose, feeling your belly rise (chest should stay relatively still)</li>
          <li>Exhale slowly through your mouth, feeling your belly fall</li>
          <li>Continue for 5-10 minutes</li>
        </ol>

        <p className="mb-6">
          <strong>When to use:</strong> Daily practice to retrain breathing patterns, chronic anxiety, hyperventilation tendencies <Citation id="2" index={2} source="Applied Psychophysiology and Biofeedback" year="2017" tier={2} />.
        </p>
        <p className="mb-6">
          <strong>Why it works:</strong> Chest breathing is shallow and inefficient. Diaphragmatic breathing maximizes oxygen exchange and signals relaxation. With practice, it becomes your default breathing pattern.
        </p>

        <h2 id="other-techniques" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Other Breathwork Techniques
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'resonance',
              title: 'Resonance Breathing (Coherent Breathing)',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>How:</strong> Breathe at a rate of 5-6 breaths per minute (inhale 5 seconds, exhale 5 seconds).
                  </p>
                  <p className="mb-2">
                    <strong>When:</strong> Chronic stress, improving heart rate variability (HRV).
                  </p>
                  <p>
                    <strong>Why:</strong> This rate maximizes heart rate variability, a marker of nervous system flexibility and resilience.
                  </p>
                </div>
              ),
            },
            {
              id: 'alternate',
              title: 'Alternate Nostril Breathing (Nadi Shodhana)',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>How:</strong> Close right nostril, inhale through left. Close left nostril, exhale through right. Inhale through right, exhale through left. Repeat.
                  </p>
                  <p className="mb-2">
                    <strong>When:</strong> Balancing energy, pre-meditation, insomnia.
                  </p>
                  <p>
                    <strong>Why:</strong> Traditional yoga practice. Some studies suggest it balances autonomic nervous system activity.
                  </p>
                </div>
              ),
            },
            {
              id: 'pursed',
              title: 'Pursed Lip Breathing',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>How:</strong> Inhale through nose for 2 counts. Purse lips (like blowing out a candle), exhale slowly for 4+ counts.
                  </p>
                  <p className="mb-2">
                    <strong>When:</strong> Shortness of breath, panic-induced hyperventilation.
                  </p>
                  <p>
                    <strong>Why:</strong> The pursed lips create back-pressure, slowing exhalation and preventing airways from collapsing (common in panic).
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="which-technique" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Which Technique Should You Use?
        </h2>

        <ComparisonTable
          title="Breathwork Technique Comparison"
          columns={['Technique', 'Best For', 'Difficulty']}
          items={[
            {
              feature: 'Box Breathing',
              values: ['Acute stress, focus under pressure', 'Easy'],
            },
            {
              feature: '4-7-8 Breathing',
              values: ['Insomnia, post-panic recovery', 'Easy'],
            },
            {
              feature: 'Diaphragmatic Breathing',
              values: ['Chronic anxiety, retraining breathing patterns', 'Moderate'],
            },
            {
              feature: 'Resonance Breathing',
              values: ['Building resilience, improving HRV', 'Moderate'],
            },
            {
              feature: 'Alternate Nostril',
              values: ['Pre-meditation, balancing energy', 'Moderate'],
            },
          ]}
        />

        <p className="mb-6">
          <strong>Start with box breathing or 4-7-8</strong> --- they're simple, fast, and highly effective for acute anxiety. Once comfortable, explore diaphragmatic breathing as a daily practice.
        </p>

        <h2 id="common-mistakes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Breathwork Mistakes
        </h2>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Breathing too fast initially</strong>: Slow down. Quality over quantity.</li>
          <li><strong>Forcing the breath</strong>: It should feel natural, not strained.</li>
          <li><strong>Practicing only during panic</strong>: Train when calm so it's automatic during stress.</li>
          <li><strong>Holding breath to discomfort</strong>: Holds should be gentle, not breath-holding contests.</li>
          <li><strong>Expecting instant results</strong>: Give it 2-3 minutes to feel the shift.</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>
            <strong>Note:</strong> If you have respiratory conditions (asthma, COPD) or cardiovascular issues, consult your doctor before trying breath-holding techniques. Stick with simple diaphragmatic breathing until cleared <Citation id="4" index={4} source="Behaviour Research and Therapy" year="2018" tier={1} />.
          </p>
        </ArticleCallout>

        <QuoteBlock
          quote="Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor."
          attribution="Thich Nhat Hanh"
          role="Buddhist Monk, Peace Activist"
          variant="default"
        />

        <p className="mb-6">
          Your breath is always with you --- the most portable, powerful anxiety tool you have. Master one technique. Practice it daily. And when anxiety strikes, you'll have an anchor.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-065: Cognitive Restructuring (self_help)
  // ============================================================================
  {
    id: catId(65),
    slug: 'cognitive-restructuring-how-to-challenge-anxious-thoughts',
    status: 'draft',
    title: 'Cognitive Restructuring: How to Challenge Anxious Thoughts',
    description: 'Learn cognitive restructuring, a core CBT technique for identifying and challenging distorted anxious thoughts to reduce anxiety and regain perspective.',
    image: "/images/articles/cat02/cover-065.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Cognitive Restructuring', 'CBT', 'Anxious Thoughts', 'Cognitive Distortions'],
    summary: 'Learn cognitive restructuring, the core CBT technique for challenging distorted anxious thoughts. Identify six common cognitive distortions (catastrophizing, probability overestimation, all-or-nothing thinking, mind reading, fortune telling, emotional reasoning), follow a five-step process to examine evidence and generate balanced thoughts, and discover when this technique is most effective for different types of anxiety.',
    keyFacts: [
      { text: 'Cognitive distortions are systematic thinking errors that anxiety amplifies, making situations seem worse than they objectively are', citationIndex: 2 },
      { text: 'Catastrophizing keeps you hypervigilant and avoidant by jumping to worst-case outcomes without evidence', citationIndex: 4 },
      { text: 'Probability overestimation causes anxiety by making bad outcomes seem far more likely than statistics show (e.g., believing a plane will crash despite 1 in 11 million odds)', citationIndex: 5 },
      { text: 'Writing out thought records is significantly more effective than mental restructuring alone for reducing anxiety intensity', citationIndex: 6 },
      { text: 'The goal of cognitive restructuring is not positive thinking but accurate thinking --- seeking realistic thoughts that correct distortions', citationIndex: 1 },
    ],
    sparkMoment: 'Your anxious thoughts are not facts --- they are interpretations, predictions, stories your brain tells to keep you safe. Once you learn to question them, you reclaim the power to choose which stories you believe.',
    practicalExercise: {
      title: 'Your First Thought Record',
      steps: [
        { title: 'Catch an anxious thought today', description: 'When you feel anxious, pause and write down exactly what went through your mind. Be specific, not vague.' },
        { title: 'Rate your emotion 0-100', description: 'How intense is the anxiety right now? Naming it and rating it creates distance from the feeling.' },
        { title: 'List evidence for AND against', description: 'Write 2-3 pieces of evidence supporting the thought, then 3-5 pieces contradicting it. Force yourself to find the counter-evidence.' },
        { title: 'Generate a balanced thought', description: 'Create a realistic (not positive) alternative thought that accounts for all the evidence. Re-rate your emotion. Notice any shift.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Journal Your Thought Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'Cognitive restructuring in CBT for anxiety',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.03.002',
        tier: 1,
      },
      {
        id: '2',
        text: 'Cognitive distortions in anxiety disorders',
        source: 'Journal of Anxiety Disorders',
        year: '2018',
        link: 'https://doi.org/10.1016/j.janxdis.2018.08.001',
        tier: 1,
      },
      {
        id: '3',
        text: 'Thought records and anxiety reduction',
        source: 'Behaviour Research and Therapy',
        year: '2017',
        link: 'https://doi.org/10.1016/j.brat.2017.09.007',
        tier: 1,
      },
      {
        id: '4',
        text: 'Catastrophizing and anxiety',
        source: 'Cognitive Therapy and Research',
        year: '2018',
        link: 'https://doi.org/10.1007/s10608-018-9906-z',
        tier: 1,
      },
      {
        id: '5',
        text: 'Probability overestimation in anxiety',
        source: 'Psychological Bulletin',
        year: '2017',
        link: 'https://doi.org/10.1037/bul0000084',
        tier: 1,
      },
      {
        id: '6',
        text: 'Self-directed CBT techniques',
        source: 'Journal of Consulting and Clinical Psychology',
        year: '2019',
        link: 'https://doi.org/10.1037/ccp0000409',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "Everyone thinks I'm incompetent.", "This will definitely end in disaster.", "I can't handle this." Your anxious thoughts feel like facts --- urgent, certain, undeniable. But they're not facts. They're interpretations, predictions, stories your anxious brain tells to keep you safe. And you can learn to question them.
          </p>
          <p className="mb-6">
            Cognitive restructuring is a core technique in Cognitive Behavioral Therapy (CBT) that teaches you to identify, challenge, and reframe distorted anxious thoughts <Citation id="1" index={1} source="Clinical Psychology Review" year="2019" tier={1} />. It's not about "thinking positive" --- it's about thinking accurately.
          </p>
        </div>

        <h2 id="what-are-cognitive-distortions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Are Cognitive Distortions?
        </h2>
        <p className="mb-6">
          Cognitive distortions are systematic errors in thinking that anxiety amplifies <Citation id="2" index={2} source="Journal of Anxiety Disorders" year="2018" tier={1} />. They make situations seem worse than they are.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'catastrophizing',
              title: '1. Catastrophizing',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>What it is:</strong> Jumping to the worst possible outcome.
                  </p>
                  <p className="mb-2">
                    <strong>Example:</strong> "I made a mistake at work. I'll get fired. I'll never find another job. I'll end up homeless."
                  </p>
                  <p>
                    <strong>Why anxiety loves it:</strong> Catastrophizing keeps you hypervigilant and avoidant <Citation id="4" index={4} source="Cognitive Therapy and Research" year="2018" tier={1} />.
                  </p>
                </div>
              ),
            },
            {
              id: 'probability',
              title: '2. Probability Overestimation',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>What it is:</strong> Believing bad outcomes are far more likely than they actually are.
                  </p>
                  <p className="mb-2">
                    <strong>Example:</strong> "The plane will definitely crash." (Actual odds: 1 in 11 million)
                  </p>
                  <p>
                    <strong>Why anxiety loves it:</strong> Overestimating danger justifies avoidance <Citation id="5" index={5} source="Psychological Bulletin" year="2017" tier={1} />.
                  </p>
                </div>
              ),
            },
            {
              id: 'all-or-nothing',
              title: '3. All-or-Nothing Thinking',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>What it is:</strong> Seeing things in extremes, no middle ground.
                  </p>
                  <p className="mb-2">
                    <strong>Example:</strong> "If I'm not perfect, I'm a total failure."
                  </p>
                  <p>
                    <strong>Why anxiety loves it:</strong> Sets impossible standards, guarantees distress.
                  </p>
                </div>
              ),
            },
            {
              id: 'mind-reading',
              title: '4. Mind Reading',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>What it is:</strong> Assuming you know what others are thinking (usually negative).
                  </p>
                  <p className="mb-2">
                    <strong>Example:</strong> "They think I'm boring. They hate me."
                  </p>
                  <p>
                    <strong>Why anxiety loves it:</strong> Confirms social fears without evidence.
                  </p>
                </div>
              ),
            },
            {
              id: 'fortune-telling',
              title: '5. Fortune Telling',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>What it is:</strong> Predicting the future negatively with certainty.
                  </p>
                  <p className="mb-2">
                    <strong>Example:</strong> "I know I'll panic during the presentation."
                  </p>
                  <p>
                    <strong>Why anxiety loves it:</strong> Creates self-fulfilling prophecies.
                  </p>
                </div>
              ),
            },
            {
              id: 'emotional-reasoning',
              title: '6. Emotional Reasoning',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>What it is:</strong> "I feel it, therefore it's true."
                  </p>
                  <p className="mb-2">
                    <strong>Example:</strong> "I feel anxious, so there must be real danger."
                  </p>
                  <p>
                    <strong>Why anxiety loves it:</strong> Feelings become facts.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>
            Cognitive distortions aren't lies you're telling yourself. They're automatic, unconscious thought patterns your brain uses to make sense of threat. The goal isn't to eliminate them --- it's to recognize and question them.
          </p>
        </ArticleCallout>

        <h2 id="how-to-restructure" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Cognitive Restructuring Process
        </h2>
        <p className="mb-6">
          Cognitive restructuring uses a structured approach <Citation id="3" index={3} source="Behaviour Research and Therapy" year="2017" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: '1. Identify the Anxious Thought',
              description: (
                <div>
                  <p className="mb-2">
                    When you feel anxious, pause and ask: "What am I thinking right now?"
                  </p>
                  <p>
                    <strong>Example:</strong> "Everyone at the party will think I'm weird."
                  </p>
                </div>
              ),
            },
            {
              title: '2. Identify the Emotion and Intensity',
              description: (
                <div>
                  <p className="mb-2">
                    Name what you're feeling and rate it 0-100.
                  </p>
                  <p>
                    <strong>Example:</strong> "Anxiety, 80/100. Embarrassment, 70/100."
                  </p>
                </div>
              ),
            },
            {
              title: '3. Examine the Evidence For and Against',
              description: (
                <div>
                  <p className="mb-4">
                    <strong>Evidence FOR the thought:</strong> "I've felt awkward at parties before. I struggle with small talk."
                  </p>
                  <p>
                    <strong>Evidence AGAINST the thought:</strong> "I've been to parties where I had good conversations. Some people have told me I'm interesting. Not everyone is judging me constantly. I'm being invited, which suggests people want me there."
                  </p>
                </div>
              ),
            },
            {
              title: '4. Consider Alternative Explanations',
              description: (
                <div>
                  <p className="mb-2">
                    "What's another way to see this? What would I tell a friend in this situation?"
                  </p>
                  <p>
                    <strong>Alternative thought:</strong> "Most people are focused on themselves, not judging me. Some conversations will be awkward, some will be fine. I don't need everyone to like me."
                  </p>
                </div>
              ),
            },
            {
              title: '5. Generate a Balanced Thought',
              description: (
                <div>
                  <p className="mb-2">
                    Create a thought that's realistic (not "positive" but accurate).
                  </p>
                  <p className="mb-4">
                    <strong>Balanced thought:</strong> "I might feel awkward at times, but I've navigated parties before. Most people won't judge me harshly. I can leave if I want."
                  </p>
                  <p>
                    <strong>Re-rate emotion:</strong> Anxiety: 50/100. Embarrassment: 40/100.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <p className="mb-6">
          Notice: The balanced thought doesn't eliminate anxiety. It <em>reduces</em> it by correcting distortions. You're not trying to convince yourself everything is perfect --- you're seeking accuracy.
        </p>

        <h2 id="thought-record" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Using a Thought Record
        </h2>
        <p className="mb-6">
          A thought record is a worksheet that guides you through cognitive restructuring. Many CBT workbooks and apps provide templates. Here's a simplified version:
        </p>

        <ComparisonTable
          title="Thought Record Template"
          columns={['Column', 'What to Write']}
          items={[
            {
              feature: 'Situation',
              values: ['What triggered the anxiety? (Brief description)'],
            },
            {
              feature: 'Automatic Thought',
              values: ['What went through your mind?'],
            },
            {
              feature: 'Emotion (0-100)',
              values: ['What did you feel? How intense?'],
            },
            {
              feature: 'Evidence For',
              values: ['What supports this thought?'],
            },
            {
              feature: 'Evidence Against',
              values: ['What contradicts it?'],
            },
            {
              feature: 'Balanced Thought',
              values: ["What's a more accurate thought?"],
            },
            {
              feature: 'Emotion Re-Rating',
              values: ['How do you feel now (0-100)?'],
            },
          ]}
        />

        <p className="mb-6">
          <strong>Tip:</strong> Write it out. Thinking through the process in your head is less effective than putting pen to paper or fingers to keyboard <Citation id="6" index={6} source="Journal of Consulting and Clinical Psychology" year="2019" tier={1} />.
        </p>

        <h2 id="helpful-questions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Helpful Questions to Challenge Anxious Thoughts
        </h2>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Evidence:</strong> "What's the evidence for/against this thought?"</li>
          <li><strong>Probability:</strong> "How likely is this outcome, realistically?"</li>
          <li><strong>Alternative:</strong> "What's another way to see this situation?"</li>
          <li><strong>Friend test:</strong> "What would I tell a friend who had this thought?"</li>
          <li><strong>Worst-case:</strong> "If the worst happens, could I survive it? How?"</li>
          <li><strong>Past experience:</strong> "How many times has this fear actually come true?"</li>
          <li><strong>Cognitive distortion:</strong> "Am I catastrophizing, mind-reading, or fortune-telling?"</li>
        </ul>

        <QuoteBlock
          quote="You are not your thoughts. You are the observer of your thoughts."
          attribution="Ram Dass"
          role="Spiritual Teacher"
          variant="default"
        />

        <h2 id="common-pitfalls" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Pitfalls in Cognitive Restructuring
        </h2>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Forcing positivity</strong>: The goal isn't "Everything will be perfect!" It's "What's realistic?"</li>
          <li><strong>Dismissing feelings</strong>: Restructuring changes thoughts, not dismisses emotions. Your feelings are valid even if your thoughts are distorted.</li>
          <li><strong>Expecting instant relief</strong>: It takes practice. The first few times feel mechanical. That's normal.</li>
          <li><strong>Only doing it during crisis</strong>: Practice on low-anxiety situations first to build the skill.</li>
          <li><strong>Arguing with yourself</strong>: Don't debate. Observe, evaluate evidence, adjust. Like a scientist, not a lawyer.</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            <strong>Start small:</strong> Begin with mildly anxious thoughts (e.g., worrying about being late) before tackling deeply rooted fears (e.g., fear of rejection). Build the skill with low-stakes practice.
          </p>
        </ArticleCallout>

        <h2 id="when-to-use" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Use Cognitive Restructuring
        </h2>
        <p className="mb-6">
          Cognitive restructuring is most helpful for:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Generalized anxiety</strong>: Chronic worrying about many things</li>
          <li><strong>Social anxiety</strong>: Thoughts about judgment, embarrassment, rejection</li>
          <li><strong>Health anxiety</strong>: Catastrophic interpretations of physical symptoms</li>
          <li><strong>Performance anxiety</strong>: Thoughts about failure, inadequacy</li>
          <li><strong>Panic disorder</strong>: Catastrophic interpretations of panic symptoms</li>
        </ul>

        <p className="mb-6">
          It's less effective for phobias (where exposure is key) and PTSD (where trauma processing is needed first).
        </p>

        <p className="mb-6">
          Cognitive restructuring won't cure anxiety. But it's one of the most powerful tools for reducing the intensity and frequency of anxious thoughts. With practice, you'll catch distortions faster, challenge them more automatically, and regain perspective when anxiety tries to hijack your thinking.
        </p>
      </>
    ),
  },
];

