/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_TRAUMA_HEALING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
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

export const understandingTraumaArticlesB: Article[] = [
  {
    id: catId(6),
    slug: 'trauma-and-body-unprocessed-experiences-nervous-system',
    title: 'Trauma and the Body: How Unprocessed Experiences Live in Your Nervous System',
    description: "Trauma isn't just in your mind—it lives in your body. Learn how unprocessed trauma affects your nervous system and why body-based healing matters.",
    image: '/images/articles/cat11/cover-006.svg',
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Somatic Trauma', 'Nervous System', 'Body-Based Healing', 'Polyvagal Theory'],
    citations: [
      {
        id: '1',
        text: 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma',
        source: 'Viking Press',
        year: '2014',
        link: 'https://www.penguinrandomhouse.com/books/229478/',
        tier: 5,
      },
      {
        id: '2',
        text: 'Polyvagal theory and trauma: Implications for treatment',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101816',
        tier: 1,
      },
      {
        id: '3',
        text: 'Somatic symptoms in PTSD: Neurobiological mechanisms',
        source: 'Journal of Psychosomatic Research',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jpsychores.2021.110456',
        tier: 1,
      },
      {
        id: '4',
        text: 'The neurobiology of interoception in health and disease',
        source: 'Annals of the New York Academy of Sciences',
        year: '2019',
        link: 'https://doi.org/10.1111/nyas.14190',
        tier: 1,
      },
      {
        id: '5',
        text: 'Trauma-related dissociation and the autonomic nervous system',
        source: 'European Journal of Psychotraumatology',
        year: '2020',
        link: 'https://doi.org/10.1080/20008198.2020.1753995',
        tier: 1,
      },
      {
        id: '6',
        text: 'Chronic pain and trauma: The role of the nervous system',
        source: 'Pain Medicine',
        year: '2019',
        link: 'https://doi.org/10.1093/pm/pnz044',
        tier: 1,
      },
      {
        id: '7',
        text: 'Somatic experiencing for PTSD: A randomized controlled trial',
        source: 'Journal of Traumatic Stress',
        year: '2017',
        link: 'https://doi.org/10.1002/jts.22189',
        tier: 1,
      },
      {
        id: '8',
        text: 'Body-based interventions for trauma',
        source: 'Substance Abuse and Mental Health Services Administration',
        year: '2022',
        link: 'https://www.samhsa.gov/trauma-violence',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You might have heard the phrase "the body keeps the score"—and it's more than a catchy title. Trauma
            doesn't just create psychological symptoms; it fundamentally changes how your body functions. Unprocessed
            traumatic experiences live on in your nervous system, manifesting as physical sensations, chronic tension,
            pain, and dysregulated responses to everyday stress.
          </p>
          <p className="mb-6">
            Understanding how trauma lives in your body is crucial because it explains why talk therapy alone sometimes
            isn't enough—and why body-based approaches can be so powerful{', '}
            <Citation id="1" index={1} source="Viking Press" year="2014" tier={5} />.
          </p>
        </div>

        <h2
          id="nervous-system-101"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Your Nervous System: A Quick Primer
        </h2>
        <p className="mb-6">To understand how trauma affects the body, we need to understand the nervous system:</p>

        <ArticleTabs
          tabs={[
            {
              id: 'sns',
              label: 'Sympathetic (Fight/Flight)',
              content: (
                <div>
                  <p className="mb-4">
                    The sympathetic nervous system is your body's accelerator. It activates during stress, preparing you
                    to fight or flee. Heart rate increases, breathing quickens, muscles tense, blood flows to large
                    muscle groups, digestion slows.
                  </p>
                  <p>
                    This system is designed to activate temporarily during threats, then turn off once the danger
                    passes. In trauma, it can get stuck in the "on" position.
                  </p>
                </div>
              ),
            },
            {
              id: 'pns',
              label: 'Parasympathetic (Rest/Digest)',
              content: (
                <div>
                  <p className="mb-4">
                    The parasympathetic nervous system is your body's brake. It promotes rest, relaxation, digestion,
                    and healing. Heart rate slows, breathing deepens, muscles relax, blood flows to organs.
                  </p>
                  <p>
                    A healthy nervous system flexibly moves between sympathetic activation (when needed) and
                    parasympathetic rest (most of the time). Trauma disrupts this flexibility.
                  </p>
                </div>
              ),
            },
            {
              id: 'polyvagal',
              label: 'Polyvagal System',
              content: (
                <div>
                  <p className="mb-4">
                    Polyvagal theory adds nuance: the parasympathetic system has two branches{', '}
                    <Citation id="2" index={2} source="Clinical Psychology Review" year="2020" tier={1} />. The
                    <strong> ventral vagal</strong> (safe and social) supports connection and calm. The{', '}
                    <strong>dorsal vagal</strong> (shutdown) activates during extreme threat when fight/flight won't
                    work.
                  </p>
                  <p>
                    Dorsal vagal shutdown is the freeze response: feeling numb, disconnected, or 'playing dead." This is
                    the state of collapse or immobilization that can persist after trauma.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="what-happens"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Happens During Trauma
        </h2>
        <p className="mb-6">
          During a traumatic event, your nervous system floods with activation. Your body prepares to fight, flee, or
          freeze. Energy mobilizes in your muscles, your heart pounds, adrenaline surges. This is adaptive—it helps you
          survive.
        </p>
        <p className="mb-6">
          But here's the problem: <strong>when the threat is overwhelming or inescapable, that energy doesn't get
          discharged</strong>. You couldn't fight effectively. You couldn't flee. You froze or submitted. All that
          mobilized survival energy gets trapped in your nervous system{', '}
          <Citation id="3" index={3} source="Journal of Psychosomatic Research" year="2021" tier={1} />.
        </p>

        <ArticleCallout variant="did-you-know">
          <p>
            Animals in the wild shake, tremble, or run after escaping threats—they discharge the stress energy.
            Humans, due to social conditioning and cognitive interference, often suppress these natural discharge
            mechanisms, leading to trapped activation.
          </p>
        </ArticleCallout>

        <h2
          id="trapped-energy"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How Trapped Energy Manifests in the Body
        </h2>
        <p className="mb-6">Unprocessed trauma shows up in your body in predictable ways:</p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'chronic-tension',
              title: 'Chronic Muscle Tension',
              content: (
                <p>
                  Your body remains braced for threat. You might hold tension in your shoulders, jaw, neck, or back.
                  This chronic contraction can lead to pain, headaches, and fatigue. The tension is your body's way of
                  staying prepared—but it never fully relaxes.
                </p>
              ),
            },
            {
              id: 'hyperarousal',
              title: 'Hyperarousal and Hypervigilance',
              content: (
                <p>
                  Your sympathetic system stays activated. You're easily startled, struggle to sleep, feel 'wired,"
                  can't relax, and constantly scan for threats. Your body believes danger is still present, even when
                  you're objectively safe.
                </p>
              ),
            },
            {
              id: 'shutdown',
              title: 'Shutdown and Numbness',
              content: (
                <p>
                  Conversely, some people get stuck in dorsal vagal shutdown{', '}
                  <Citation id="5" index={5} source="European Journal of Psychotraumatology" year="2020" tier={1} />.
                  They feel disconnected, numb, exhausted, or "not really here." This is the body's last-resort survival
                  strategy when fight/flight fails.
                </p>
              ),
            },
            {
              id: 'pain',
              title: 'Chronic Pain Conditions',
              content: (
                <p>
                  Research links trauma to fibromyalgia, chronic fatigue, irritable bowel syndrome, migraines, and other
                  conditions{', '}
                  <Citation id="6" index={6} source="Pain Medicine" year="2019" tier={1} />. The nervous system
                  dysregulation contributes to heightened pain sensitivity and persistent physical symptoms.
                </p>
              ),
            },
            {
              id: 'digestive',
              title: 'Digestive Issues',
              content: (
                <p>
                  When your sympathetic system is chronically active, digestion gets suppressed. This can lead to nausea,
                  stomach pain, constipation, diarrhea, or IBS. The gut-brain connection means nervous system
                  dysregulation directly affects digestive function.
                </p>
              ),
            },
            {
              id: 'immune',
              title: 'Immune System Dysfunction',
              content: (
                <p>
                  Chronic stress from unresolved trauma can dysregulate immune function, increasing inflammation and
                  vulnerability to illness. The body's constant state of alert diverts resources away from healing and
                  maintenance.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="interoception"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Trauma and Interoception
        </h2>
        <p className="mb-6">
          Interoception is your ability to sense what's happening inside your body—your heartbeat, breathing, tension,
          temperature, hunger, and emotions. It's how you know you're anxious, tired, or need to use the bathroom{', '}
          <Citation id="4" index={4} source="Annals of the New York Academy of Sciences" year="2019" tier={1} />.
        </p>
        <p className="mb-6">Trauma often disrupts interoception in two ways:</p>

        <BeforeAfter
          before={{
            title: 'Hyper-Interoception',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Overly focused on body sensations</li>
                <li>Interpret normal sensations as threatening</li>
                <li>Panic at slight increases in heart rate</li>
                <li>Can't tolerate discomfort</li>
              </ul>
            ),
          }}
          after={{
            title: 'Hypo-Interoception',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Disconnected from body signals</li>
                <li>Can't identify emotions or needs</li>
                <li>Miss hunger, fullness, fatigue cues</li>
                <li>Feel numb or "not here"</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6 mt-6">
          Both patterns represent disrupted body awareness. Healing often involves recalibrating this internal sense,
          learning to notice body signals without being overwhelmed or disconnected.
        </p>

        <h2
          id="why-body-matters"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why You Can't Just "Think" Your Way Out
        </h2>
        <p className="mb-6">Here's the crucial point: <strong>trauma is stored below the level of language</strong>.</p>
        <p className="mb-6">
          When you experience trauma, your brain's language centers (in the prefrontal cortex) go offline. The amygdala
          and brain stem—subcortical regions that don't use words—process and store the experience. This is why:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Trauma memories often come as body sensations, images, or emotions rather than coherent narratives</li>
          <li>You might struggle to put the experience into words</li>
          <li>Talking about it doesn't always provide relief</li>
          <li>Your body reacts to triggers before your conscious mind knows what's happening</li>
        </ul>
        <p className="mb-6">
          This is why <strong>body-based therapies</strong> can be so effective. They work directly with the nervous
          system where trauma is stored, rather than only addressing it through language and cognition.
        </p>

        <h2
          id="body-based-approaches"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Body-Based Approaches to Healing
        </h2>
        <p className="mb-6">
          Several evidence-based therapies specifically target the somatic (body) aspects of trauma{', '}
          <Citation id="7" index={7} source="Journal of Traumatic Stress" year="2017" tier={1} />:
        </p>

        <ComparisonTable
          title="Body-Based Trauma Therapies"
          columns={['Approach', 'How It Works']}
          items={[
            {
              feature: 'Somatic Experiencing',
              values: [
                'Helps discharge trapped survival energy through gentle body awareness and titrated release',
              ],
            },
            {
              feature: 'Sensorimotor Psychotherapy',
              values: [
                'Uses body movements and sensations as gateways to processing trauma memories',
              ],
            },
            {
              feature: 'Yoga for Trauma',
              values: [
                'Builds interoceptive awareness and nervous system regulation through mindful movement',
              ],
            },
            {
              feature: 'EMDR',
              values: [
                'Uses bilateral stimulation to help the brain reprocess traumatic memories',
              ],
            },
            {
              feature: 'Neurofeedback',
              values: [
                'Trains the brain to self-regulate by providing real-time feedback on brainwave patterns',
              ],
            },
          ]}
          highlightColumn={1}
        />

        <h2
          id="self-regulation"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Self-Regulation Techniques
        </h2>
        <p className="mb-6">
          You can also support your nervous system's healing outside of therapy{', '}
          <Citation id="8" index={8} source="SAMHSA" year="2022" tier={2} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Breathing Practices',
              description: (
                <p>
                  Slow, deep breathing activates the parasympathetic system. Try 4-7-8 breathing: inhale for 4 counts,
                  hold for 7, exhale for 8. This signals safety to your nervous system.
                </p>
              ),
            },
            {
              title: 'Grounding Exercises',
              description: (
                <p>
                  Connect to the present moment through your senses. Feel your feet on the floor, notice 5 things you can
                  see, hold a cold object. This interrupts fight/flight activation.
                </p>
              ),
            },
            {
              title: 'Gentle Movement',
              description: (
                <p>
                  Walking, stretching, or yoga helps discharge trapped energy. Listen to your body's impulses—you might
                  need to shake, stretch, or move slowly.
                </p>
              ),
            },
            {
              title: 'Self-Touch',
              description: (
                <p>
                  Placing a hand on your heart or giving yourself a gentle hug can activate the social engagement system
                  and provide comfort. This taps into the ventral vagal state of safety.
                </p>
              ),
            },
            {
              title: 'Rhythmic Activities',
              description: (
                <p>
                  Drumming, dancing, rocking, or listening to rhythmic music can help regulate the nervous system.
                  Rhythm is organizing for a dysregulated system.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning" title="Important Note">
          <p>
            For some trauma survivors, increased body awareness can initially be overwhelming. If focusing on your body
            brings up intense distress, work with a trained trauma therapist. Healing should feel gradual and
            manageable, not retraumatizing.
          </p>
        </ArticleCallout>

        <h2
          id="healing-is-possible"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Your Body Can Heal
        </h2>
        <p className="mb-6">
          The nervous system is plastic—it can change. Trapped energy can be released. Dysregulated patterns can be
          retrained. Your body has an innate capacity to return to regulation, given the right conditions and support.
        </p>
        <p className="mb-6">
          Healing doesn't mean erasing what happened. It means helping your body understand, at a physiological level,
          that the threat has passed. It means restoring flexibility to your nervous system so you can move freely
          between activation and rest, connection and solitude, engagement and recovery.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Key Takeaways:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Trauma lives in your nervous system, not just your mind</li>
            <li>Unprocessed survival energy manifests as physical symptoms</li>
            <li>Body-based approaches address trauma where it's stored</li>
            <li>You can support nervous system healing through daily practices</li>
            <li>The body has an innate capacity to return to regulation</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(7),
    slug: 'window-of-tolerance-understanding-capacity-for-stress',
    title: 'The Window of Tolerance: Understanding Your Capacity for Stress',
    description: 'Learn about the window of tolerance—your optimal zone of arousal. Discover what happens when you move outside this window and how to expand it over time.',
    image: "/images/articles/cat11/cover-007.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Window of Tolerance', 'Regulation', 'Nervous System', 'Coping'],
    citations: [
      {
        id: '1',
        text: 'Affect dysregulation and disorders of the self',
        source: 'W. W. Norton & Company',
        year: '2003',
        link: 'https://wwnorton.com/books/9780393704594',
        tier: 5,
      },
      {
        id: '2',
        text: 'Window of tolerance: A model for understanding affect regulation',
        source: 'Journal of Psychotherapy Integration',
        year: '2018',
        link: 'https://doi.org/10.1037/int0000131',
        tier: 1,
      },
      {
        id: '3',
        text: 'Emotional regulation in PTSD: A systematic review',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101846',
        tier: 1,
      },
      {
        id: '4',
        text: 'Interventions to expand the window of tolerance',
        source: 'Psychotherapy Research',
        year: '2021',
        link: 'https://doi.org/10.1080/10503307.2021.1920707',
        tier: 1,
      },
      {
        id: '5',
        text: 'Mindfulness and affect regulation',
        source: 'JAMA Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1001/jamapsychiatry.2019.0177',
        tier: 1,
      },
      {
        id: '6',
        text: 'Trauma and the window of tolerance',
        source: 'National Center for PTSD',
        year: '2023',
        link: 'https://www.ptsd.va.gov/professional/treat/essentials/affect_regulation.asp',
        tier: 2,
      },
      {
        id: '7',
        text: 'Building distress tolerance: DBT skills for expanding capacity',
        source: 'Behavior Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.beth.2019.11.003',
        tier: 1,
      },
      {
        id: '8',
        text: 'Therapeutic relationship and window of tolerance',
        source: 'Journal of Clinical Psychology',
        year: '2018',
        link: 'https://doi.org/10.1002/jclp.22634',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Have you ever noticed that sometimes you can handle a stressful situation just fine, but at other times the
            same situation completely overwhelms you? Or that certain people seem to stay calm in circumstances that
            would send you spiraling? The answer lies in something called the "window of tolerance"—a concept that
            explains your nervous system's capacity for stress.
          </p>
          <p className="mb-6">
            Understanding your window of tolerance is key to managing emotions, recovering from trauma, and building
            resilience{', '}
            <Citation id="1" index={1} source="W. W. Norton & Company" year="2003" tier={5} />.
          </p>
        </div>

        <h2
          id="what-is-window"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is the Window of Tolerance?
        </h2>
        <p className="mb-6">
          The window of tolerance is the zone of arousal in which you can function effectively. When you're within your
          window, you can think clearly, regulate emotions, connect with others, and respond to stress in healthy ways{', '}
          <Citation id="2" index={2} source="Journal of Psychotherapy Integration" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          Think of it like the optimal temperature range for your body. Too cold, and you shiver and shut down. Too
          hot, and you become agitated and overwhelmed. Just right, and you function comfortably. Your nervous system
          works the same way with arousal and activation.
        </p>

        <ArticleChart
          type="area"
          title="The Window of Tolerance Model"
          data={[
            { label: 'Hypoarousal (Shutdown)', value: 20 },
            { label: 'Window of Tolerance', value: 60 },
            { label: 'Hyperarousal (Fight/Flight)', value: 20 },
          ]}
          source="Siegel, 2003 (adapted)"
        />

        <h2
          id="inside-window"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Inside the Window: Optimal Functioning
        </h2>
        <p className="mb-6">When you're inside your window of tolerance, you experience:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Emotional flexibility</strong>: You can feel emotions without being overwhelmed by them
          </li>
          <li>
            <strong>Clear thinking</strong>: Your prefrontal cortex is online, allowing rational thought and
            decision-making
          </li>
          <li>
            <strong>Social engagement</strong>: You can connect with others, read social cues, and feel safe in
            relationships
          </li>
          <li>
            <strong>Appropriate arousal</strong>: Your energy level matches the situation
          </li>
          <li>
            <strong>Resilience</strong>: You can handle stress, recover from setbacks, and adapt to challenges
          </li>
          <li>
            <strong>Body awareness</strong>: You can sense your body's signals without being overwhelmed
          </li>
        </ul>

        <ArticleCallout variant="tip">
          <p>
            Being in your window doesn't mean you never feel stress or negative emotions. It means you can experience
            those feelings without losing your capacity to function or regulate.
          </p>
        </ArticleCallout>

        <h2
          id="outside-window"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Outside the Window: Dysregulation
        </h2>
        <p className="mb-6">
          When stress exceeds your capacity, you move outside your window into one of two states{', '}
          <Citation id="3" index={3} source="Clinical Psychology Review" year="2020" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'hyperarousal',
              label: 'Hyperarousal',
              content: (
                <div>
                  <h3 className="text-xl font-bold mb-3">Above the Window (Fight/Flight)</h3>
                  <p className="mb-4">
                    Hyperarousal is the zone of too much activation. Your sympathetic nervous system dominates. You're
                    in survival mode—fight or flight.
                  </p>
                  <p className="mb-4">
                    <strong>How it feels:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Anxious, panicky, or terrified</li>
                    <li>Racing thoughts or mind going blank</li>
                    <li>Heart pounding, rapid breathing</li>
                    <li>Muscle tension, restlessness</li>
                    <li>Irritable, angry, or reactive</li>
                    <li>Hypervigilant, easily startled</li>
                    <li>Overwhelmed, out of control</li>
                  </ul>
                  <p className="mt-4">
                    <strong>What you might do:</strong> Lash out, flee situations, avoid triggers, panic, make impulsive
                    decisions
                  </p>
                </div>
              ),
            },
            {
              id: 'hypoarousal',
              label: 'Hypoarousal',
              content: (
                <div>
                  <h3 className="text-xl font-bold mb-3">Below the Window (Freeze/Shutdown)</h3>
                  <p className="mb-4">
                    Hypoarousal is the zone of too little activation. Your dorsal vagal system dominates. You've
                    collapsed into shutdown or freeze.
                  </p>
                  <p className="mb-4">
                    <strong>How it feels:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Numb, disconnected, "not really here"</li>
                    <li>Foggy thinking, can't concentrate</li>
                    <li>Exhausted, no energy</li>
                    <li>Depressed, hopeless</li>
                    <li>Dissociated or "checked out"</li>
                    <li>Can't feel emotions or physical sensations</li>
                    <li>Passive, unable to take action</li>
                  </ul>
                  <p className="mt-4">
                    <strong>What you might do:</strong> Withdraw, zone out, sleep excessively, feel paralyzed, can't
                    make decisions
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="trauma-narrows"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How Trauma Narrows Your Window
        </h2>
        <p className="mb-6">
          Trauma doesn't just push you outside your window temporarily—it can make the window itself narrower{', '}
          <Citation id="6" index={6} source="National Center for PTSD" year="2023" tier={2} />. This means:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>It takes less stress to dysregulate you</li>
          <li>You spend more time in hyperarousal or hypoarousal</li>
          <li>You have less capacity to handle everyday challenges</li>
          <li>You might rapidly flip between hyperarousal and hypoarousal</li>
        </ul>

        <ComparisonTable
          title="Window Size Comparison"
          columns={['Characteristic', 'Wider Window', 'Narrower Window']}
          items={[
            { feature: 'Stress tolerance', values: ['Can handle significant stress', 'Overwhelmed by minor stress'] },
            { feature: 'Recovery time', values: ['Quick return to baseline', 'Slow or incomplete recovery'] },
            { feature: 'Emotional range', values: ['Can feel full range of emotions', 'Either numb or overwhelmed'] },
            {
              feature: 'Daily functioning',
              values: ['Consistent performance', 'Highly variable, unpredictable'],
            },
            {
              feature: 'Relationships',
              values: ['Can maintain connections', 'Withdraw or become reactive'],
            },
          ]}
          highlightColumn={1}
        />

        <h2
          id="individual-differences"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Your Window Is Unique
        </h2>
        <p className="mb-6">Everyone's window of tolerance is different in size and flexibility. Your window is shaped by:</p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'genetics',
              title: 'Genetics and Temperament',
              content: (
                <p>
                  Some people are born with more sensitive nervous systems. Highly sensitive people (HSPs) naturally
                  have narrower windows—they feel things more intensely and are more easily overwhelmed.
                </p>
              ),
            },
            {
              id: 'childhood',
              title: 'Childhood Experiences',
              content: (
                <p>
                  Secure attachment and consistent caregiving help build a wider window. Trauma, neglect, or chaotic
                  environments narrow it. Early experiences literally shape nervous system development.
                </p>
              ),
            },
            {
              id: 'trauma-history',
              title: 'Trauma History',
              content: (
                <p>
                  Each unprocessed trauma can narrow your window further. Complex trauma (repeated exposure) often
                  results in a very narrow window and frequent dysregulation.
                </p>
              ),
            },
            {
              id: 'current-stress',
              title: 'Current Stress Load',
              content: (
                <p>
                  Your window isn't fixed—it changes based on what's happening in your life. High stress, illness, lack
                  of sleep, or major life changes can temporarily narrow your window.
                </p>
              ),
            },
            {
              id: 'resources',
              title: 'Resources and Skills',
              content: (
                <p>
                  Social support, coping skills, therapy, mindfulness practice, and physical health all contribute to a
                  wider, more flexible window.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="expanding-window"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How to Expand Your Window
        </h2>
        <p className="mb-6">
          The good news: you can expand your window of tolerance{', '}
          <Citation id="4" index={4} source="Psychotherapy Research" year="2021" tier={1} />. This is a central goal
          of trauma therapy and emotion regulation work.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Build Awareness',
              description: (
                <p>
                  Learn to recognize when you're moving outside your window. Notice your early warning signs—tension,
                  irritability, foggy thinking. The sooner you catch it, the easier it is to return.
                </p>
              ),
            },
            {
              title: 'Develop Regulation Skills',
              description: (
                <p>
                  Learn techniques to bring yourself back into your window: breathing exercises, grounding, movement,
                  self-soothing. DBT distress tolerance skills are particularly helpful{', '}
                  <Citation id="7" index={7} source="Behavior Therapy" year="2020" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Practice Mindfulness',
              description: (
                <p>
                  Mindfulness increases your capacity to tolerate uncomfortable emotions and sensations without
                  dysregulating{', '}
                  <Citation id="5" index={5} source="JAMA Psychiatry" year="2019" tier={1} />. You expand your window
                  by staying present with what arises.
                </p>
              ),
            },
            {
              title: 'Process Trauma',
              description: (
                <p>
                  Work with a trauma therapist to process unresolved experiences. EMDR, CPT, Somatic Experiencing, and
                  other modalities help your nervous system complete the trauma response, widening your window.
                </p>
              ),
            },
            {
              title: 'Build Safety and Support',
              description: (
                <p>
                  Cultivate safe relationships, stable routines, and environments where you feel secure. A sense of
                  safety in the present allows your window to gradually expand{', '}
                  <Citation id="8" index={8} source="Journal of Clinical Psychology" year="2018" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Gradual Exposure',
              description: (
                <p>
                  Carefully, with support, practice tolerating slightly more arousal than usual. This is called
                  'titration"—increasing your capacity in small, manageable doses. Never push beyond what feels safe.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning" title="Go Slow">
          <p>
            Expanding your window is a gradual process. Trying to force yourself to "toughen up" or pushing too hard can
            actually narrow your window further. Healing happens through gentle, consistent practice—not willpower.
          </p>
        </ArticleCallout>

        <h2
          id="daily-application"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Using This Concept Daily
        </h2>
        <p className="mb-6">Understanding your window helps you:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Know your limits</strong>: Recognize how much stress you can handle today (your window fluctuates)
          </li>
          <li>
            <strong>Plan accordingly</strong>: Don't schedule demanding tasks when your window is narrow
          </li>
          <li>
            <strong>Ask for help</strong>: Communicate when you're getting close to your edge
          </li>
          <li>
            <strong>Be self-compassionate</strong>: Understand that dysregulation isn't a character flaw—it's a nervous
            system response
          </li>
          <li>
            <strong>Choose interventions wisely</strong>: If you're hyperaroused, you need calming. If you're
            hypoaroused, you need gentle activation.
          </li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Key Takeaways:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your window of tolerance is your optimal zone of nervous system arousal</li>
            <li>Trauma narrows your window, making you more easily dysregulated</li>
            <li>Dysregulation manifests as hyperarousal (fight/flight) or hypoarousal (freeze/shutdown)</li>
            <li>You can expand your window through therapy, regulation skills, and safe relationships</li>
            <li>Understanding your window helps you navigate life with more self-compassion</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(8),
    slug: 'secondary-trauma-exposure-to-others-pain',
    title: "Secondary Trauma: How Exposure to Others' Pain Affects You",
    description: "Therapists, first responders, and caregivers can develop trauma from witnessing others' suffering. Learn about secondary trauma and how to protect yourself.",
    image: "/images/articles/cat11/cover-008.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Secondary Trauma', 'Vicarious Trauma', 'Compassion Fatigue', 'Burnout'],
    citations: [
      {
        id: '1',
        text: 'Secondary traumatic stress: A fact sheet',
        source: 'National Child Traumatic Stress Network',
        year: '2022',
        link: 'https://www.nctsn.org/trauma-informed-care/secondary-traumatic-stress',
        tier: 2,
      },
      {
        id: '2',
        text: 'Prevalence of secondary traumatic stress among social workers',
        source: 'Traumatology',
        year: '2019',
        link: 'https://doi.org/10.1037/trm0000177',
        tier: 1,
      },
      {
        id: '3',
        text: 'Vicarious trauma in therapists: A meta-analysis',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101851',
        tier: 1,
      },
      {
        id: '4',
        text: 'Compassion fatigue and burnout: Prevalence and associations',
        source: 'BMC Emergency Medicine',
        year: '2021',
        link: 'https://doi.org/10.1186/s12873-021-00424-6',
        tier: 1,
      },
      {
        id: '5',
        text: 'Moral injury in healthcare workers',
        source: 'Journal of Psychiatric Research',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jpsychires.2020.09.009',
        tier: 1,
      },
      {
        id: '6',
        text: 'Interventions to prevent secondary traumatic stress',
        source: 'Research on Social Work Practice',
        year: '2021',
        link: 'https://doi.org/10.1177/1049731520969157',
        tier: 1,
      },
      {
        id: '7',
        text: 'Self-care for trauma professionals',
        source: 'Substance Abuse and Mental Health Services Administration',
        year: '2022',
        link: 'https://www.samhsa.gov/dtac/ccp-toolkit/self-care',
        tier: 2,
      },
      {
        id: '8',
        text: 'Secondary trauma in first responders: A systematic review',
        source: 'Prehospital and Disaster Medicine',
        year: '2018',
        link: 'https://doi.org/10.1017/S1049023X18000055',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You don't have to experience trauma firsthand for it to affect you. Therapists who listen to stories of
            abuse, emergency responders who witness accidents, nurses who care for suffering patients, and even friends
            who support trauma survivors can develop real trauma symptoms from indirect exposure. This phenomenon is
            called secondary trauma—and it's more common than most people realize.
          </p>
          <p className="mb-6">
            If you work with or care for people who have experienced trauma, understanding secondary trauma isn't
            optional—it's essential for your own well-being and your capacity to continue helping others{', '}
            <Citation id="1" index={1} source="National Child Traumatic Stress Network" year="2022" tier={2} />.
          </p>
        </div>

        <h2
          id="what-is-secondary-trauma"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Secondary Trauma?
        </h2>
        <p className="mb-6">
          Secondary trauma (also called vicarious trauma, secondary traumatic stress, or STS) is the emotional distress
          that results when you hear about or witness the traumatic experiences of another person. It's an occupational
          hazard for anyone who works with trauma survivors or is regularly exposed to traumatic content{', '}
          <Citation id="2" index={2} source="Traumatology" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          The key point: <strong>you don't have to experience the trauma yourself</strong>. Simply bearing witness—listening
          to details, seeing images, treating injuries, or supporting someone through their pain—can create trauma responses
          in your own nervous system.
        </p>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Therapists report secondary trauma symptoms' },
            { value: 75, suffix: '%', label: 'Emergency responders affected by vicarious trauma' },
            { value: 40, suffix: '%', label: 'Social workers meet criteria for STS' },
          ]}
          source="Meta-analysis, Clinical Psychology Review, 2020"
        />

        <h2
          id="who-is-at-risk"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Who Is at Risk?
        </h2>
        <p className="mb-6">
          Anyone who is regularly exposed to others" trauma can develop secondary trauma. High-risk groups include:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'mental-health',
              title: 'Mental Health Professionals',
              content: (
                <p>
                  Therapists, counselors, psychologists, and psychiatrists who work with trauma survivors hear detailed
                  accounts of abuse, violence, and suffering. The very empathy that makes them effective can make them
                  vulnerable to vicarious trauma{', '}
                  <Citation id="3" index={3} source="Clinical Psychology Review" year="2020" tier={1} />.
                </p>
              ),
            },
            {
              id: 'first-responders',
              title: 'First Responders',
              content: (
                <p>
                  Police officers, firefighters, paramedics, and EMTs witness death, injury, and violence. They see
                  traumatic scenes firsthand and often work in high-stress, unpredictable conditions{', '}
                  <Citation id="8" index={8} source="Prehospital and Disaster Medicine" year="2018" tier={1} />.
                </p>
              ),
            },
            {
              id: 'healthcare',
              title: 'Healthcare Workers',
              content: (
                <p>
                  Nurses, doctors, and other medical staff treat trauma victims, provide end-of-life care, and witness
                  suffering daily. The COVID-19 pandemic dramatically increased secondary trauma in this population{', '}
                  <Citation id="4" index={4} source="BMC Emergency Medicine" year="2021" tier={1} />.
                </p>
              ),
            },
            {
              id: 'social-workers',
              title: 'Social Workers',
              content: (
                <p>
                  Child protective services workers, domestic violence advocates, and case managers regularly encounter
                  stories of abuse, neglect, and hardship—often with high caseloads and limited resources.
                </p>
              ),
            },
            {
              id: 'journalists',
              title: 'Journalists and Media Workers',
              content: (
                <p>
                  Reporters covering war, natural disasters, crime, or human rights violations are repeatedly exposed to
                  traumatic material. Photo and video editors viewing graphic content are especially vulnerable.
                </p>
              ),
            },
            {
              id: 'caregivers',
              title: 'Family Members and Caregivers',
              content: (
                <p>
                  Partners, parents, and friends supporting trauma survivors can develop secondary trauma. The impact is
                  real even though it's not a professional role.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="symptoms"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Signs and Symptoms of Secondary Trauma
        </h2>
        <p className="mb-6">
          Secondary trauma can look remarkably similar to PTSD. You might experience:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'intrusive',
              label: 'Intrusive Symptoms',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Intrusive thoughts or images from others" trauma stories</li>
                  <li>Nightmares about the traumatic material you've been exposed to</li>
                  <li>Difficulty getting certain cases or stories out of your mind</li>
                  <li>Flashbacks to details you heard or witnessed secondhand</li>
                </ul>
              ),
            },
            {
              id: 'avoidance',
              label: 'Avoidance',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Avoiding certain clients, cases, or types of trauma work</li>
                  <li>Emotional numbing or detachment</li>
                  <li>Reluctance to engage with work-related material</li>
                  <li>Avoiding news, movies, or conversations about trauma</li>
                </ul>
              ),
            },
            {
              id: 'arousal',
              label: 'Hyperarousal',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Heightened anxiety or hypervigilance</li>
                  <li>Sleep disturbances</li>
                  <li>Irritability or anger</li>
                  <li>Difficulty concentrating</li>
                  <li>Increased startle response</li>
                </ul>
              ),
            },
            {
              id: 'cognitive',
              label: 'Cognitive Changes',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Worldview shifts (believing the world is dangerous, people are bad)</li>
                  <li>Loss of hope or meaning</li>
                  <li>Questioning your ability to make a difference</li>
                  <li>Cynicism or loss of faith in humanity</li>
                </ul>
              ),
            },
          ]}
        />

        <h2
          id="related-concepts"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Related Concepts: Compassion Fatigue, Burnout, and Moral Injury
        </h2>
        <p className="mb-6">
          Secondary trauma is related to but distinct from other occupational stressors:
        </p>

        <ComparisonTable
          title="Comparing Secondary Trauma, Compassion Fatigue, and Burnout"
          columns={['Concept', 'Definition', 'Primary Cause']}
          items={[
            {
              feature: 'Secondary Trauma',
              values: [
                'PTSD-like symptoms from indirect exposure to trauma',
                'Exposure to traumatic material',
              ],
            },
            {
              feature: 'Compassion Fatigue',
              values: [
                'Exhaustion from caring for suffering people',
                'Empathic engagement with pain',
              ],
            },
            {
              feature: 'Burnout',
              values: [
                'Physical and emotional exhaustion from work stress',
                'Workload, lack of control, poor support',
              ],
            },
            {
              feature: 'Moral Injury',
              values: [
                'Distress from actions that violate moral code',
                'Being unable to provide adequate care',
              ],
            },
          ]}
          highlightColumn={1}
        />

        <p className="mb-6 mt-6">
          Often, these conditions overlap. A healthcare worker might experience burnout from long hours, compassion
          fatigue from caring for COVID patients, secondary trauma from witnessing deaths, and moral injury from being
          unable to save everyone{', '}
          <Citation id="5" index={5} source="Journal of Psychiatric Research" year="2020" tier={1} />.
        </p>

        <h2
          id="why-happens"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Does Secondary Trauma Happen?
        </h2>
        <p className="mb-6">Several factors contribute to secondary trauma:</p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Mirror Neurons and Empathy',
              description: (
                <p>
                  Your brain is wired for empathy. Mirror neurons fire when you witness or hear about someone else's
                  experience, creating similar neural patterns in your own brain. This is why hearing about trauma can
                  feel traumatic.
                </p>
              ),
            },
            {
              title: 'Cumulative Exposure',
              description: (
                <p>
                  Repeated exposure to traumatic material has a cumulative effect. Each story, each image, each case
                  adds to your trauma load. Over time, your capacity can become overwhelmed.
                </p>
              ),
            },
            {
              title: 'Personal Trauma History',
              description: (
                <p>
                  If you have your own unresolved trauma, exposure to others' trauma can reactivate it. Personal trauma
                  history is one of the strongest predictors of secondary trauma.
                </p>
              ),
            },
            {
              title: 'Lack of Boundaries',
              description: (
                <p>
                  Taking work home (mentally or physically), being available 24/7, or over-identifying with clients
                  increases vulnerability. Healthy boundaries are protective.
                </p>
              ),
            },
            {
              title: 'Organizational Factors',
              description: (
                <p>
                  High caseloads, inadequate supervision, lack of support, and organizational cultures that don't
                  acknowledge secondary trauma make it worse.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="clinical-note" title="Important">
          <p>
            Secondary trauma is <strong>not</strong> a sign that you're weak, unsuited for your work, or "not cut out for
            it." It's a normal human response to abnormal exposure. The most empathic, dedicated helpers are often most
            at risk.
          </p>
        </ArticleCallout>

        <h2
          id="prevention"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Preventing and Managing Secondary Trauma
        </h2>
        <p className="mb-6">
          Fortunately, there are evidence-based strategies to protect yourself{', '}
          <Citation id="6" index={6} source="Research on Social Work Practice" year="2021" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'boundaries',
              title: 'Maintain Professional Boundaries',
              content: (
                <p>
                  Set limits on when and how you're available. Don't take on more than you can handle. Learn to say no.
                  Leave work at work when possible—both physically and mentally.
                </p>
              ),
            },
            {
              id: 'supervision',
              title: 'Get Regular Supervision and Support',
              content: (
                <p>
                  Clinical supervision, peer consultation, or debriefing sessions help you process what you're exposed
                  to. Talking about difficult cases in a safe space prevents them from getting stuck in your system.
                </p>
              ),
            },
            {
              id: 'self-care',
              title: 'Prioritize Self-Care',
              content: (
                <p>
                  This isn't optional or indulgent—it's essential{', '}
                  <Citation id="7" index={7} source="SAMHSA" year="2022" tier={2} />. Exercise, sleep, nutrition,
                  hobbies, relationships, and activities that restore you are protective factors.
                </p>
              ),
            },
            {
              id: 'mindfulness',
              title: 'Practice Mindfulness and Grounding',
              content: (
                <p>
                  Mindfulness helps you stay present rather than getting lost in others' trauma narratives. Grounding
                  techniques help you separate their experience from yours.
                </p>
              ),
            },
            {
              id: 'meaning',
              title: 'Cultivate Meaning and Purpose',
              content: (
                <p>
                  Remember why you do this work. Connect with the impact you're making. Celebrate small wins. Meaning is
                  protective against secondary trauma.
                </p>
              ),
            },
            {
              id: 'therapy',
              title: 'Seek Your Own Therapy',
              content: (
                <p>
                  Work through your own trauma history. Process the secondary trauma as it arises. Many trauma workers
                  benefit from regular therapy to stay healthy.
                </p>
              ),
            },
            {
              id: 'balance',
              title: 'Balance Your Caseload',
              content: (
                <p>
                  If possible, mix trauma cases with less intense work. Vary the types of trauma you work with. Don't
                  specialize so narrowly that you're exposed to the same type of trauma constantly.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="organizational-responsibility"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Organizational Responsibility
        </h2>
        <p className="mb-6">
          Secondary trauma isn't just an individual problem—it's an organizational issue. Employers have a
          responsibility to:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Provide training on secondary trauma recognition and prevention</li>
          <li>Ensure reasonable caseloads and work hours</li>
          <li>Offer regular supervision and consultation</li>
          <li>Create a culture where self-care is valued, not seen as weakness</li>
          <li>Provide access to mental health resources</li>
          <li>Allow flexibility for workers to step back from intense cases when needed</li>
          <li>Implement debriefing protocols after critical incidents</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Key Takeaways:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Secondary trauma is a real, recognized condition from indirect trauma exposure</li>
            <li>Anyone who works with trauma survivors or traumatic material is at risk</li>
            <li>Symptoms can mirror PTSD: intrusive thoughts, avoidance, hyperarousal, worldview changes</li>
            <li>Prevention requires both individual self-care and organizational support</li>
            <li>Seeking help for secondary trauma isn't weakness—it's professional responsibility</li>
          </ul>
        </ArticleCallout>

        <h2
          id="when-to-seek-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When to Seek Help
        </h2>
        <p className="mb-6">If you experience:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Persistent intrusive thoughts or nightmares related to others" trauma</li>
          <li>Significant changes in your worldview or sense of safety</li>
          <li>Avoidance of work or specific types of cases</li>
          <li>Emotional numbing or feeling disconnected</li>
          <li>Impairment in your work or personal life</li>
        </ul>
        <p className="mb-6">
          It's time to seek professional support. Early intervention prevents secondary trauma from becoming chronic.
          You can't pour from an empty cup—taking care of yourself ensures you can continue helping others.
        </p>
      </>
    ),
  },

  {
    id: catId(9),
    slug: 'complex-trauma-vs-single-incident-why-distinction-matters',
    title: 'Complex Trauma vs. Single-Incident Trauma: Why the Distinction Matters',
    description: 'Not all trauma is the same. Learn the crucial differences between single-incident and complex trauma, and why they require different healing approaches.',
    image: "/images/articles/cat11/cover-009.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Complex Trauma', 'C-PTSD', 'Developmental Trauma', 'Treatment'],
    citations: [
      {
        id: '1',
        text: 'Complex PTSD: A syndrome in survivors of prolonged and repeated trauma',
        source: 'Journal of Traumatic Stress',
        year: '1992',
        link: 'https://doi.org/10.1002/jts.2490050305',
        tier: 1,
      },
      {
        id: '2',
        text: 'ICD-11 Complex Post Traumatic Stress Disorder: Simplifying diagnosis',
        source: 'British Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1192/bjp.2019.48',
        tier: 1,
      },
      {
        id: '3',
        text: 'Developmental trauma disorder: A missed opportunity in DSM-5',
        source: 'Journal of Loss and Trauma',
        year: '2019',
        link: 'https://doi.org/10.1080/15325024.2018.1519279',
        tier: 1,
      },
      {
        id: '4',
        text: 'Treatment of complex trauma: A meta-analysis',
        source: 'JAMA Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1001/jamapsychiatry.2021.0350',
        tier: 1,
      },
      {
        id: '5',
        text: 'Attachment disruption and developmental trauma',
        source: 'Attachment & Human Development',
        year: '2020',
        link: 'https://doi.org/10.1080/14616734.2020.1751987',
        tier: 1,
      },
      {
        id: '6',
        text: 'Complex PTSD vs. PTSD: Diagnostic considerations',
        source: 'European Journal of Psychotraumatology',
        year: '2019',
        link: 'https://doi.org/10.1080/20008198.2019.1654052',
        tier: 1,
      },
      {
        id: '7',
        text: 'Understanding complex trauma',
        source: 'National Child Traumatic Stress Network',
        year: '2022',
        link: 'https://www.nctsn.org/what-is-child-trauma/trauma-types/complex-trauma',
        tier: 2,
      },
      {
        id: '8',
        text: 'Phase-based treatment for complex trauma',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101872',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            There's a crucial distinction in the trauma field that doesn't get enough attention: the difference between
            experiencing a single traumatic event and living through prolonged, repeated trauma—especially in
            childhood. While both are serious, they affect people differently and require different approaches to
            healing. Understanding this distinction can be life-changing for survivors who've wondered why standard
            trauma treatments haven't fully worked for them.
          </p>
          <p className="mb-6">
            This article explains complex trauma (sometimes called developmental trauma or Complex PTSD) and why
            recognizing it matters for recovery{', '}
            <Citation id="1" index={1} source="Journal of Traumatic Stress" year="1992" tier={1} />.
          </p>
        </div>

        <h2
          id="single-incident"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Single-Incident Trauma (Type I)
        </h2>
        <p className="mb-6">
          Single-incident trauma, also called Type I trauma, results from a one-time event. You had a baseline of
          relative safety, experienced a traumatic event, and now have to integrate that experience and return to
          safety.
        </p>
        <p className="mb-6">Examples include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>A car accident</li>
          <li>A natural disaster (earthquake, hurricane)</li>
          <li>A single assault or robbery</li>
          <li>Witnessing a sudden death</li>
          <li>A one-time medical trauma</li>
        </ul>

        <ArticleCallout variant="info">
          <p>
            Single-incident trauma is what most PTSD research and treatment protocols were originally designed for. The
            classic PTSD model assumes you were functioning well before the trauma, experienced a discrete event, and
            need to process that specific experience to recover.
          </p>
        </ArticleCallout>

        <h2
          id="complex-trauma"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Complex Trauma (Type II)
        </h2>
        <p className="mb-6">
          Complex trauma, or Type II trauma, involves exposure to multiple traumatic events, typically of an invasive,
          interpersonal nature. These experiences are often prolonged, repeated, and occur during developmental periods
          (childhood/adolescence){', '}
          <Citation id="7" index={7} source="National Child Traumatic Stress Network" year="2022" tier={2} />.
        </p>
        <p className="mb-6">Key characteristics:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Repeated</strong>: Not a single event but ongoing or recurring experiences
          </li>
          <li>
            <strong>Prolonged</strong>: Lasting months or years, especially throughout childhood
          </li>
          <li>
            <strong>Interpersonal</strong>: Perpetrated by people, often those who should protect you
          </li>
          <li>
            <strong>Inescapable</strong>: The person couldn't leave the situation (child dependent on caregivers)
          </li>
          <li>
            <strong>Developmental</strong>: Occurs when the brain and personality are still forming
          </li>
        </ul>

        <p className="mb-6">Examples include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Childhood physical, sexual, or emotional abuse</li>
          <li>Severe neglect during childhood</li>
          <li>Witnessing chronic domestic violence</li>
          <li>Growing up with a severely mentally ill or addicted caregiver</li>
          <li>Being held captive or imprisoned for extended periods</li>
          <li>Experiencing ongoing war or community violence as a child</li>
          <li>Human trafficking or exploitation</li>
        </ul>

        <h2
          id="cptsd-diagnosis"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Complex PTSD: A Distinct Diagnosis
        </h2>
        <p className="mb-6">
          In 2018, the World Health Organization's ICD-11 (International Classification of Diseases) officially
          recognized Complex PTSD (C-PTSD) as distinct from PTSD{', '}
          <Citation id="2" index={2} source="British Journal of Psychiatry" year="2020" tier={1} />. The DSM-5 (used
          in the U.S.) doesn't have C-PTSD as a separate diagnosis, though many clinicians recognize it informally.
        </p>

        <p className="mb-6">
          <strong>C-PTSD includes all the symptoms of PTSD, plus three additional clusters:</strong>
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'ptsd-symptoms',
              label: 'Core PTSD',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Re-experiencing (flashbacks, nightmares)</li>
                  <li>Avoidance (of reminders, emotions)</li>
                  <li>Hyperarousal (always on edge, easily startled)</li>
                </ul>
              ),
            },
            {
              id: 'emotion-regulation',
              label: 'Emotion Dysregulation',
              content: (
                <div>
                  <p className="mb-3">Persistent difficulties managing emotions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Intense emotional reactions that feel uncontrollable</li>
                    <li>Numbness or disconnection from emotions</li>
                    <li>Difficulty calming down once upset</li>
                    <li>Self-destructive behaviors to manage emotions</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'negative-self',
              label: 'Negative Self-Concept',
              content: (
                <div>
                  <p className="mb-3">Pervasive negative beliefs about oneself:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Deep feelings of shame, guilt, or worthlessness</li>
                    <li>Believing you are fundamentally damaged or defective</li>
                    <li>Feeling different from other people</li>
                    <li>Persistent self-blame for the trauma</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'relationships',
              label: 'Relationship Difficulties',
              content: (
                <div>
                  <p className="mb-3">Persistent problems with relationships:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Difficulty trusting others or feeling safe in relationships</li>
                    <li>Avoiding relationships or feeling unable to connect</li>
                    <li>Pattern of unstable or harmful relationships</li>
                    <li>Difficulty maintaining long-term relationships</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="key-differences"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Key Differences Between PTSD and C-PTSD
        </h2>

        <ComparisonTable
          title="PTSD vs. Complex PTSD"
          columns={['Aspect', 'PTSD', 'C-PTSD']}
          items={[
            {
              feature: 'Type of trauma',
              values: ['Usually single incident', 'Repeated, prolonged trauma'],
            },
            {
              feature: 'Age of onset',
              values: ['Any age', 'Often in childhood/development'],
            },
            {
              feature: 'Relationship to perpetrator',
              values: ['Often stranger/impersonal', 'Often caregiver/trusted person'],
            },
            {
              feature: 'Core symptoms',
              values: ['Re-experiencing, avoidance, hyperarousal', 'PTSD symptoms PLUS additional features'],
            },
            {
              feature: 'Identity impact',
              values: ['Sense of self usually intact', 'Deep disruption to sense of self'],
            },
            {
              feature: 'Emotional regulation',
              values: ['Usually manageable', 'Severely impaired'],
            },
            {
              feature: 'Relationships',
              values: ['Can maintain connections', 'Pervasive relationship difficulties'],
            },
            {
              feature: 'Treatment focus',
              values: ['Process specific trauma memory', 'Build capacity THEN process trauma'],
            },
          ]}
          highlightColumn={2}
        />

        <h2
          id="why-it-matters"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why the Distinction Matters
        </h2>
        <p className="mb-6">
          Understanding whether you're dealing with single-incident PTSD or complex trauma is crucial for several
          reasons{', '}
          <Citation id="6" index={6} source="European Journal of Psychotraumatology" year="2019" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'validation',
              title: '1. Validation and Understanding',
              content: (
                <p>
                  Many people with complex trauma have been misdiagnosed with depression, bipolar disorder, borderline
                  personality disorder, or other conditions. Understanding complex trauma helps make sense of symptoms
                  that might otherwise seem confusing or treatment-resistant.
                </p>
              ),
            },
            {
              id: 'treatment-approach',
              title: '2. Treatment Approach',
              content: (
                <p>
                  Standard PTSD treatments (like Prolonged Exposure) can be harmful for complex trauma if applied too
                  early. Complex trauma requires phase-based treatment{', '}
                  <Citation id="8" index={8} source="Clinical Psychology Review" year="2020" tier={1} />: first building
                  safety and regulation skills, THEN processing trauma memories, THEN reconnecting with life.
                </p>
              ),
            },
            {
              id: 'expectations',
              title: '3. Realistic Expectations',
              content: (
                <p>
                  Complex trauma doesn't resolve as quickly as single-incident PTSD. It took years to develop; it takes
                  time to heal. Knowing this prevents discouragement when recovery isn't linear or rapid.
                </p>
              ),
            },
            {
              id: 'self-compassion',
              title: '4. Self-Compassion',
              content: (
                <p>
                  Understanding that your struggles with emotion regulation, relationships, and self-worth are
                  <em>symptoms</em> of complex trauma—not character flaws—can reduce shame and self-blame.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="developmental-impact"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Developmental Impact
        </h2>
        <p className="mb-6">
          When trauma occurs during childhood, it doesn't just create memories to process—it shapes development{', '}
          <Citation id="5" index={5} source="Attachment & Human Development" year="2020" tier={1} />. Children
          experiencing ongoing trauma develop in a context of threat, which affects:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Attachment Patterns',
              description: (
                <p>
                  Secure attachment requires consistent, safe caregiving. Trauma from caregivers creates disorganized
                  attachment—the person you need for safety is also the source of danger. This fundamentally shapes how
                  you relate to others throughout life.
                </p>
              ),
            },
            {
              title: 'Emotion Regulation Skills',
              description: (
                <p>
                  Children learn to regulate emotions through co-regulation with caregivers. When caregivers are
                  abusive, neglectful, or dysregulated themselves, children don't develop these crucial skills.
                </p>
              ),
            },
            {
              title: 'Sense of Self',
              description: (
                <p>
                  Identity forms through reflected appraisals—how others treat you tells you who you are. Abuse and
                  neglect teach children they are worthless, unlovable, or bad, shaping core beliefs that persist into
                  adulthood.
                </p>
              ),
            },
            {
              title: 'Brain Development',
              description: (
                <p>
                  Chronic stress during development affects brain architecture. The amygdala becomes hyperactive, the
                  hippocampus may be smaller, and prefrontal regulation systems develop differently.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="did-you-know">
          <p>
            Some researchers advocate for "Developmental Trauma Disorder" as a diagnosis specifically for children who
            experience complex trauma during critical developmental periods{', '}
            <Citation id="3" index={3} source="Journal of Loss and Trauma" year="2019" tier={1} />. While not yet
            officially recognized, it highlights the unique impact of childhood trauma.
          </p>
        </ArticleCallout>

        <h2
          id="treatment-differences"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Treatment Differences
        </h2>
        <p className="mb-6">
          Effective treatment for complex trauma differs from PTSD treatment{', '}
          <Citation id="4" index={4} source="JAMA Psychiatry" year="2021" tier={1} />:
        </p>

        <BeforeAfter
          before={{
            title: 'PTSD Treatment',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Focus immediately on trauma processing</li>
                <li>Exposure to trauma memories is central</li>
                <li>Treatment is often brief (8-12 sessions)</li>
                <li>Goal: Process specific traumatic event</li>
              </ul>
            ),
          }}
          after={{
            title: 'C-PTSD Treatment',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Phase 1: Safety, stabilization, skill-building</li>
                <li>Phase 2: Trauma processing (when ready)</li>
                <li>Phase 3: Reconnection and integration</li>
                <li>Treatment is longer-term (often 1-3+ years)</li>
                <li>Goal: Build capacities that trauma prevented developing</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6 mt-6">Effective approaches for complex trauma often include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Dialectical Behavior Therapy (DBT)</strong>: Builds emotion regulation and distress tolerance skills
          </li>
          <li>
            <strong>Schema Therapy</strong>: Addresses core beliefs and patterns formed in childhood
          </li>
          <li>
            <strong>Internal Family Systems (IFS)</strong>: Works with different parts of self that hold trauma
          </li>
          <li>
            <strong>Sensorimotor Psychotherapy</strong>: Body-based approach for developmental trauma
          </li>
          <li>
            <strong>EMDR (with preparation phase)</strong>: Can be helpful once sufficient stability is established
          </li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Key Takeaways:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Complex trauma involves repeated, prolonged exposure, often in childhood</li>
            <li>C-PTSD includes PTSD symptoms plus emotion dysregulation, negative self-concept, and relationship difficulties</li>
            <li>Developmental timing matters—childhood trauma shapes identity and capacities</li>
            <li>Treatment for complex trauma requires phase-based approach, not just trauma processing</li>
            <li>Recovery is possible but takes time, patience, and the right therapeutic approach</li>
          </ul>
        </ArticleCallout>

        <h2
          id="hope"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          A Message of Hope
        </h2>
        <p className="mb-6">
          If you recognize yourself in the description of complex trauma, know this: healing is absolutely possible.
          It may take longer than you'd like, and the path isn't always linear. But with trauma-informed therapy,
          supportive relationships, and self-compassion, you can:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Develop the emotion regulation skills you never had the chance to learn</li>
          <li>Challenge and change the negative beliefs formed in childhood</li>
          <li>Build healthy, secure relationships</li>
          <li>Integrate your trauma story without being defined by it</li>
          <li>Discover who you are beyond the trauma</li>
        </ul>
        <p className="mb-6">
          You are not broken. You adapted brilliantly to impossible circumstances. Now, you can learn new ways of being
          that serve you better.
        </p>
      </>
    ),
  },

  {
    id: catId(10),
    slug: 'trauma-prevalence-how-common-traumatic-experiences',
    title: 'Trauma Prevalence: How Common Traumatic Experiences Actually Are',
    description: "You're not alone. Discover the surprising statistics on how many people experience trauma and why understanding prevalence combats isolation and stigma.",
    image: '/images/articles/cat11/cover-010.svg',
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Statistics', 'Prevalence', 'Research', 'Epidemiology'],
    citations: [
      {
        id: '1',
        text: 'Trauma and PTSD in the WHO World Mental Health Surveys',
        source: 'European Journal of Psychotraumatology',
        year: '2017',
        link: 'https://doi.org/10.1080/20008198.2017.1353383',
        tier: 1,
      },
      {
        id: '2',
        text: 'Prevalence of traumatic events and PTSD in the United States',
        source: 'JAMA Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1001/jamapsychiatry.2020.2269',
        tier: 1,
      },
      {
        id: '3',
        text: 'Adverse childhood experiences: National and state-level prevalence',
        source: 'Centers for Disease Control and Prevention',
        year: '2023',
        link: 'https://www.cdc.gov/violenceprevention/aces/about.html',
        tier: 2,
      },
      {
        id: '4',
        text: 'Sexual violence: A systematic review of prevalence',
        source: 'Lancet Public Health',
        year: '2021',
        link: 'https://doi.org/10.1016/S2468-2667(21)00110-0',
        tier: 1,
      },
      {
        id: '5',
        text: 'Global burden of PTSD and major depression',
        source: 'Lancet Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1016/S2215-0366(20)30121-2',
        tier: 1,
      },
      {
        id: '6',
        text: 'Combat exposure and PTSD in military personnel',
        source: 'Military Medicine',
        year: '2019',
        link: 'https://doi.org/10.1093/milmed/usy223',
        tier: 1,
      },
      {
        id: '7',
        text: 'Trauma exposure and mental health in refugee populations',
        source: 'World Health Organization',
        year: '2022',
        link: 'https://www.who.int/health-topics/refugee-and-migrant-health',
        tier: 2,
      },
      {
        id: '8',
        text: 'Trauma types and prevalence: A population-based study',
        source: 'Psychological Medicine',
        year: '2018',
        link: 'https://doi.org/10.1017/S0033291718001800',
        tier: 1,
      },
      {
        id: '9',
        text: 'Intimate partner violence: Global prevalence and health impacts',
        source: 'World Health Organization',
        year: '2021',
        link: 'https://www.who.int/news-room/fact-sheets/detail/violence-against-women',
        tier: 2,
      },
      {
        id: '10',
        text: 'Childhood trauma and long-term health outcomes',
        source: 'American Journal of Preventive Medicine',
        year: '2019',
        link: 'https://doi.org/10.1016/j.amepre.2019.04.014',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            One of the most isolating aspects of trauma is the feeling that you're alone—that what happened to you is
            rare, that others wouldn't understand, that you should just be able to 'get over it." But here's the truth:
            traumatic experiences are strikingly common. Understanding just how prevalent trauma is can be validating,
            reduce shame, and help you realize that your struggles are shared by millions of others.
          </p>
          <p className="mb-6">
            This article presents the data on trauma prevalence—not to minimize your experience, but to show that trauma
            is a major public health issue affecting the majority of people at some point in their lives{', '}
            <Citation id="1" index={1} source="European Journal of Psychotraumatology" year="2017" tier={1} />.
          </p>
        </div>

        <h2
          id="overall-prevalence"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Overall Trauma Exposure
        </h2>
        <p className="mb-6">
          Let's start with the big picture. Research from the World Health Organization's World Mental Health Surveys,
          which included data from 24 countries, found that <strong>about 70% of adults have experienced at least one
          traumatic event in their lifetime</strong>{', '}
          <Citation id="1" index={1} source="European Journal of Psychotraumatology" year="2017" tier={1} />.
        </p>
        <p className="mb-6">
          In the United States specifically, studies show that approximately 60% of men and 50% of women experience at
          least one traumatic event during their lives{', '}
          <Citation id="2" index={2} source="JAMA Psychiatry" year="2020" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 70, suffix: '%', label: 'Global adults experience trauma in lifetime' },
            { value: 89, suffix: '%', label: 'Experience at least one stressful event' },
            { value: 31, suffix: '%', label: 'Experience four or more traumatic events' },
          ]}
          source="WHO World Mental Health Surveys, 2017"
        />

        <ArticleCallout variant="did-you-know">
          <p>
            The average person who experiences one traumatic event will experience a total of three during their
            lifetime{', '}
            <Citation id="8" index={8} source="Psychological Medicine" year="2018" tier={1} />. Trauma exposure isn't
            typically a one-time occurrence.
          </p>
        </ArticleCallout>

        <h2
          id="types-prevalence"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Prevalence by Type of Trauma
        </h2>
        <p className="mb-6">Different types of trauma have different prevalence rates. Here's what the research shows:</p>

        <ArticleChart
          type="bar"
          title="Lifetime Prevalence of Specific Trauma Types (U.S. Adults)"
          data={[
            { label: 'Sudden death of loved one', value: 31 },
            { label: 'Witnessed violence', value: 22 },
            { label: 'Life-threatening accident', value: 16 },
            { label: 'Physical assault', value: 10 },
            { label: 'Natural disaster', value: 8 },
            { label: 'Sexual assault', value: 7 },
            { label: 'Combat exposure', value: 4 },
          ]}
          source="National Comorbidity Survey, adapted"
        />

        <h3 className="text-2xl font-bold mt-8 mb-4">Sexual Violence</h3>
        <p className="mb-6">
          Sexual violence is devastatingly common, though often underreported{', '}
          <Citation id="4" index={4} source="Lancet Public Health" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>1 in 3 women globally have experienced physical or sexual violence in their lifetime</li>
          <li>1 in 5 women in the U.S. has experienced completed or attempted rape</li>
          <li>1 in 71 men in the U.S. has experienced rape or attempted rape</li>
          <li>81% of women and 43% of men report experiencing some form of sexual harassment or assault</li>
          <li>Rates are even higher for LGBTQ+ individuals, especially transgender people</li>
        </ul>

        <h3 className="text-2xl font-bold mt-8 mb-4">Intimate Partner Violence</h3>
        <p className="mb-6">
          Intimate partner violence (IPV) affects millions globally{', '}
          <Citation id="9" index={9} source="World Health Organization" year="2021" tier={2} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>1 in 4 women and 1 in 9 men experience severe intimate partner violence</li>
          <li>1 in 7 women and 1 in 25 men have been injured by an intimate partner</li>
          <li>IPV accounts for 15% of all violent crime</li>
          <li>On average, nearly 20 people per minute are physically abused by an intimate partner in the U.S.</li>
        </ul>

        <h3 className="text-2xl font-bold mt-8 mb-4">Childhood Adversity</h3>
        <p className="mb-6">
          The CDC's Adverse Childhood Experiences (ACE) Study revealed how common childhood trauma is{', '}
          <Citation id="3" index={3} source="CDC" year="2023" tier={2} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>64%</strong> of adults have at least one ACE
          </li>
          <li>
            <strong>17%</strong> have four or more ACEs
          </li>
          <li>1 in 4 children experience child abuse or neglect at some point</li>
          <li>1 in 5 children witness domestic violence</li>
          <li>1 in 7 children experience some form of childhood sexual abuse</li>
        </ul>

        <ArticleCallout variant="clinical-note" title="Important Context">
          <p>
            These statistics likely <em>underestimate</em> true prevalence. Many traumatic experiences—especially sexual
            abuse, domestic violence, and emotional abuse—are significantly underreported due to shame, fear,
            minimization, or memory suppression.
          </p>
        </ArticleCallout>

        <h2
          id="ptsd-prevalence"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          PTSD Prevalence: Not Everyone Develops the Disorder
        </h2>
        <p className="mb-6">
          While trauma exposure is very common, Post-Traumatic Stress Disorder (PTSD) is less so—though still affects
          millions. About 6-8% of the U.S. population will have PTSD at some point in their lives{', '}
          <Citation id="2" index={2} source="JAMA Psychiatry" year="2020" tier={1} />.
        </p>
        <p className="mb-6">This means:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>About 8 million American adults have PTSD in a given year</li>
          <li>10% of women and 4% of men develop PTSD at some point</li>
          <li>Approximately 10-20% of people who experience trauma develop PTSD</li>
        </ul>

        <ComparisonTable
          title="Trauma Exposure vs. PTSD Development"
          columns={['Population', 'Trauma Exposure', 'PTSD Development']}
          items={[
            { feature: 'General population', values: ['60-70%', '6-8%'] },
            { feature: 'Women', values: ['~50%', '10%'] },
            { feature: 'Men', values: ['~60%', '4%'] },
            { feature: 'Combat veterans', values: ['~100%', '10-30%'] },
            { feature: 'Rape survivors', values: ['100%', '~50%'] },
            { feature: 'First responders', values: ['~90%', '15-30%'] },
          ]}
          highlightColumn={2}
        />

        <p className="mb-6 mt-6">
          The variation in PTSD rates after trauma reflects the many factors that influence response: genetics, prior
          trauma history, social support, type of trauma, age at exposure, and access to early intervention.
        </p>

        <h2
          id="special-populations"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Prevalence in Specific Populations
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'veterans',
              title: 'Military Veterans',
              content: (
                <div>
                  <p className="mb-3">
                    Combat exposure creates unique trauma burden{', '}
                    <Citation id="6" index={6} source="Military Medicine" year="2019" tier={1} />:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>10-30% of veterans who served in wars develop PTSD</li>
                    <li>12% of Gulf War (Desert Storm) veterans have PTSD</li>
                    <li>15% of Vietnam veterans currently have PTSD</li>
                    <li>11-20% of Iraq and Afghanistan veterans have PTSD in a given year</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'refugees',
              title: 'Refugees and Asylum Seekers',
              content: (
                <div>
                  <p className="mb-3">
                    Forced displacement involves multiple, compounding traumas{', '}
                    <Citation id="7" index={7} source="World Health Organization" year="2022" tier={2} />:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>30-50% of refugees meet criteria for PTSD</li>
                    <li>Rates are higher for those who experienced torture or witnessed atrocities</li>
                    <li>Post-migration stressors (detention, uncertainty, discrimination) compound trauma</li>
                    <li>Children and adolescents show particularly high rates of trauma symptoms</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'first-responders',
              title: 'First Responders and Healthcare Workers',
              content: (
                <div>
                  <p className="mb-3">Regular exposure to traumatic events takes a toll:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>15-30% of first responders develop PTSD (compared to 6-8% in general population)</li>
                    <li>30% of emergency medical services personnel report PTSD symptoms</li>
                    <li>Healthcare workers experienced elevated trauma rates during COVID-19 pandemic</li>
                    <li>Cumulative exposure increases risk over the course of a career</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'marginalized',
              title: 'Marginalized Communities',
              content: (
                <div>
                  <p className="mb-3">
                    Systemic oppression creates additional trauma exposure and compounding risk:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>LGBTQ+ individuals experience higher rates of violence, assault, and discrimination</li>
                    <li>People of color face racial trauma, microaggressions, and police violence</li>
                    <li>Transgender individuals have extremely high rates of violence exposure</li>
                    <li>People with disabilities experience abuse at rates 3-4 times higher than general population</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="global-perspective"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Global Perspective
        </h2>
        <p className="mb-6">
          Trauma isn't just an American or Western phenomenon. Globally{', '}
          <Citation id="5" index={5} source="Lancet Psychiatry" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>An estimated 354 million people globally have experienced traumatic events</li>
          <li>PTSD prevalence varies by region, from 0.3% to 6.1%, with higher rates in conflict zones</li>
          <li>Low- and middle-income countries often have higher trauma exposure due to war, disaster, and violence</li>
          <li>Access to mental health care is severely limited in many regions, creating a treatment gap</li>
        </ul>

        <h2
          id="co-occurring"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Co-Occurring Conditions
        </h2>
        <p className="mb-6">Trauma rarely exists in isolation. People with trauma histories often also have:</p>

        <ArticleChart
          type="donut"
          title="Co-Occurring Conditions in People with PTSD"
          data={[
            { label: 'Depression', value: 48 },
            { label: 'Anxiety disorders', value: 44 },
            { label: 'Substance use disorders', value: 27 },
            { label: 'Chronic pain', value: 35 },
            { label: 'Other', value: 20 },
          ]}
          source="Meta-analysis data (approximate percentages)"
        />

        <p className="mb-6 mt-6">
          This high comorbidity rate reflects how trauma affects multiple systems—brain chemistry, stress response,
          emotion regulation, and physical health. It also means that effective treatment often needs to address
          multiple conditions, not just PTSD in isolation.
        </p>

        <h2
          id="why-matters"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why These Numbers Matter
        </h2>
        <p className="mb-6">Understanding trauma prevalence has several important implications:</p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'You Are Not Alone',
              description: (
                <p>
                  If you've experienced trauma, you are one of millions. This isn't about minimizing your experience—it's
                  about recognizing that trauma is a shared human experience, not an isolated or rare occurrence.
                </p>
              ),
            },
            {
              title: 'Public Health Priority',
              description: (
                <p>
                  These numbers make clear that trauma is a major public health issue requiring prevention efforts,
                  accessible treatment, and trauma-informed systems across healthcare, education, and social services.
                </p>
              ),
            },
            {
              title: 'Reducing Stigma',
              description: (
                <p>
                  When we understand how common trauma is, it becomes harder to maintain stigma. Seeking help for trauma
                  is not unusual or shameful—it's a reasonable response to a widespread problem.
                </p>
              ),
            },
            {
              title: 'Normalizing Recovery',
              description: (
                <p>
                  The fact that most people who experience trauma do NOT develop chronic PTSD is hopeful. Recovery is the
                  norm, not the exception. With support, most people adapt and heal{', '}
                  <Citation id="10" index={10} source="American Journal of Preventive Medicine" year="2019" tier={1} />.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="seeking-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What the Data Tells Us About Seeking Help
        </h2>
        <p className="mb-6">
          Despite high prevalence, many trauma survivors don't seek help. Studies show that only about half of people
          with PTSD ever receive treatment—and of those who do, many wait a decade or more after symptom onset.
        </p>
        <p className="mb-6">Barriers include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Stigma and shame</li>
          <li>Not recognizing symptoms as treatable</li>
          <li>Lack of access to mental health care</li>
          <li>Cost and insurance barriers</li>
          <li>Cultural factors that discourage help-seeking</li>
          <li>Fear of being labeled or misunderstood</li>
        </ul>
        <p className="mb-6">
          If you're struggling with trauma symptoms, know that effective treatments exist—and you deserve access to
          them. Early intervention leads to better outcomes, so seeking help sooner rather than later makes a real
          difference.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Key Takeaways:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>70% of adults globally experience trauma in their lifetime</li>
            <li>64% of U.S. adults have at least one Adverse Childhood Experience</li>
            <li>About 6-8% develop PTSD, meaning most trauma survivors are resilient</li>
            <li>Certain populations (veterans, refugees, assault survivors) have higher rates</li>
            <li>Trauma is a major public health issue requiring systemic response</li>
            <li>You are not alone—millions share this experience and recovery is possible</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },
];
