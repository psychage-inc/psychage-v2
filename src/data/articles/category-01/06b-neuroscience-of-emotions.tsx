 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_EMOTIONAL_REGULATION, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  QuoteBlock,
} from '../../../components/article/blocks';

export const neuroscienceOfEmotionsArticlesB: Article[] = [
  // Neuroscience articles 56-60 (research_digest type, concise format)
  {
    id: catId(56),
    slug: 'neuroscience-emotional-contagion-mirror-neurons-empathy',
    title: 'The Neuroscience of Emotional Contagion: Mirror Neurons and Empathy',
    description: "Mirror neurons help you simulate others' experiences—the biological basis of empathy and why emotions spread between people.",
    image: '/images/articles/cat01/cover-056.svg',
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Mirror Neurons', 'Empathy', 'Research Digest', 'Social Neuroscience'],
    citations: [
      { id: '1', text: 'Mirror neuron system and empathy', source: 'Current Biology', year: '2020', link: 'https://doi.org/10.1016/j.cub.2020.02.016', tier: 1 },
      { id: '2', text: 'Emotional contagion: Neural mechanisms', source: 'Trends in Cognitive Sciences', year: '2021', link: 'https://doi.org/10.1016/j.tics.2021.02.003', tier: 1 },
      { id: '3', text: 'Empathy and brain connectivity', source: 'Neuroscience & Biobehavioral Reviews', year: '2020', link: 'https://doi.org/10.1016/j.neubiorev.2020.05.008', tier: 1 },
      { id: '4', text: 'Mirror neuron dysfunction in autism', source: 'Molecular Psychiatry', year: '2019', link: 'https://doi.org/10.1038/s41380-019-0405-5', tier: 1 },
      { id: '5', text: 'Social pain and physical pain: Shared neural circuits', source: 'Science', year: '2020', link: 'https://doi.org/10.1126/science.aay2352', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You wince when someone stubs their toe. You feel joy watching a friend succeed. You absorb anxiety from a stressed coworker. This isn't imagination—your brain is literally simulating their internal experience through mirror neurons.
          </p>
          <p className="mb-6">
            Mirror neurons fire both when you perform an action and when you observe someone else performing it <Citation id="1" index={1} source="Current Biology" year="2020" tier={1} />. They're the biological foundation of empathy and emotional contagion.
          </p>
        </div>
        <h2 id="key-findings" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Key Research Findings</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Mirror neurons activate in premotor cortex, inferior parietal lobule, and insula</li>
          <li>Emotional contagion occurs through automatic mimicry + mirror neuron activation <Citation id="2" index={2} source="Trends in Cognitive Sciences" year="2021" tier={1} /></li>
          <li>Social pain (rejection, exclusion) activates the same brain regions as physical pain <Citation id="5" index={5} source="Science" year="2020" tier={5} /></li>
          <li>Reduced mirror neuron activity may contribute to empathy deficits in autism <Citation id="4" index={4} source="Molecular Psychiatry" year="2019" tier={1} /></li>
        </ul>
        <h2 id="what-this-means" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What This Means for You</h2>
        <p className="mb-6">Emotional contagion is automatic and biological. When you're around anxious or stressed people, your mirror neurons simulate their state—which is why boundaries and self-regulation matter. You're not "too sensitive"—you're neurologically wired for connection <Citation id="3" index={3} source="Neuroscience & Biobehavioral Reviews" year="2020" tier={1} />.</p>
      </>
    ),
  },

  {
    id: catId(57),
    slug: 'sleep-deprivation-makes-everything-feel-worse-brain-science',
    title: 'Why Sleep Deprivation Makes Everything Feel Worse: The Brain Science',
    description: 'Sleep loss amplifies negative emotions and impairs regulation. Discover how sleep affects your amygdala, prefrontal cortex, and emotional resilience.',
    image: "/images/articles/cat01/cover-057.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Sleep', 'Emotional Regulation', 'Research Digest', 'Brain'],
    citations: [
      { id: '1', text: 'Sleep and emotional brain function', source: 'Nature Reviews Neuroscience', year: '2021', link: 'https://doi.org/10.1038/s41583-021-00464-4', tier: 1 },
      { id: '2', text: 'Sleep deprivation and amygdala reactivity', source: 'Current Biology', year: '2020', link: 'https://doi.org/10.1016/j.cub.2020.03.019', tier: 1 },
      { id: '3', text: 'REM sleep and emotional memory processing', source: 'Neuroscience & Biobehavioral Reviews', year: '2019', link: 'https://doi.org/10.1016/j.neubiorev.2019.08.002', tier: 1 },
      { id: '4', text: 'Sleep loss and mood disorders', source: 'JAMA Psychiatry', year: '2020', link: 'https://doi.org/10.1001/jamapsychiatry.2020.1608', tier: 2 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            After a bad night's sleep, minor annoyances feel catastrophic. Small stressors trigger intense reactions. Everything feels harder. This isn't weakness—it's neuroscience. Sleep deprivation fundamentally alters how your brain processes emotions.
          </p>
          <p className="mb-6">
            Just one night of poor sleep increases amygdala reactivity by 60% and weakens prefrontal control <Citation id="2" index={2} source="Current Biology" year="2020" tier={1} />. Your emotional thermostat is broken.
          </p>
        </div>
        <h2 id="key-findings" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Key Research Findings</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Sleep deprivation amplifies negative emotional responses while blunting positive ones <Citation id="1" index={1} source="Nature Reviews Neuroscience" year="2021" tier={1} /></li>
          <li>Prefrontal-amygdala connectivity weakens with insufficient sleep, reducing emotional control</li>
          <li>REM sleep processes emotional memories—insufficient REM leads to emotional dysregulation <Citation id="3" index={3} source="Neuroscience & Biobehavioral Reviews" year="2019" tier={1} /></li>
          <li>Chronic sleep loss is both a symptom and cause of mood disorders <Citation id="4" index={4} source="JAMA Psychiatry" year="2020" tier={2} /></li>
        </ul>
        <StatCard stats={[{ value: 60, suffix: '%', label: 'Increase in amygdala reactivity after one night of poor sleep' }, { value: 30, suffix: '%', label: 'Reduction in prefrontal cortex activity when sleep-deprived' }]} source="Current Biology, 2020" />
        <h2 id="what-this-means" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What This Means for You</h2>
        <p className="mb-6">If you're struggling with emotional regulation, prioritize sleep. Seven to nine hours of quality sleep restores your brain's ability to manage emotions. Sleep is not optional—it's biological maintenance for your emotional brain.</p>
      </>
    ),
  },

  {
    id: catId(58),
    slug: 'exercise-changes-brain-chemistry-emotional-baseline',
    title: 'How Exercise Changes Your Brain Chemistry and Emotional Baseline',
    description: "Physical activity isn't just about fitness—it reshapes your brain, increases neuroplasticity, and elevates mood through neurotransmitter changes.",
    image: '/images/articles/cat01/cover-058.svg',
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Exercise', 'Neurochemistry', 'Research Digest', 'Mental Health'],
    citations: [
      { id: '1', text: 'Exercise and brain plasticity', source: 'Nature Reviews Neuroscience', year: '2020', link: 'https://doi.org/10.1038/s41583-020-0322-4', tier: 1 },
      { id: '2', text: 'Physical activity and depression: Meta-analysis', source: 'JAMA Psychiatry', year: '2021', link: 'https://doi.org/10.1001/jamapsychiatry.2021.0609', tier: 2 },
      { id: '3', text: 'Exercise-induced neurogenesis', source: 'Cell Metabolism', year: '2020', link: 'https://doi.org/10.1016/j.cmet.2020.01.011', tier: 1 },
      { id: '4', text: 'BDNF and mood regulation', source: 'Molecular Psychiatry', year: '2019', link: 'https://doi.org/10.1038/s41380-019-0453-x', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "Just go for a walk" sounds dismissive when you're depressed. But exercise isn't a platitude—it's a biological intervention that changes your brain chemistry, structure, and function in ways comparable to antidepressant medication.
          </p>
          <p className="mb-6">
            Regular physical activity increases BDNF (brain-derived neurotrophic factor), stimulates neurogenesis, and rebalances neurotransmitter systems <Citation id="1" index={1} source="Nature Reviews Neuroscience" year="2020" tier={1} />.
          </p>
        </div>
        <h2 id="key-findings" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Key Research Findings</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Exercise is as effective as antidepressants for mild-to-moderate depression <Citation id="2" index={2} source="JAMA Psychiatry" year="2021" tier={2} /></li>
          <li>Aerobic exercise increases hippocampal volume and promotes neurogenesis <Citation id="3" index={3} source="Cell Metabolism" year="2020" tier={1} /></li>
          <li>BDNF levels increase during exercise, enhancing synaptic plasticity and mood <Citation id="4" index={4} source="Molecular Psychiatry" year="2019" tier={1} /></li>
          <li>Even 15 minutes of moderate activity improves mood and reduces anxiety</li>
        </ul>
        <ArticleCallout variant="info"><p>You don't need intense workouts. Moderate aerobic activity (brisk walking, cycling, swimming) 3-5 times per week produces measurable brain changes within 6 weeks.</p></ArticleCallout>
        <h2 id="what-this-means" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What This Means for You</h2>
        <p className="mb-6">Exercise is not a replacement for therapy or medication when needed—but it's a powerful adjunct. Movement changes your brain at a molecular level, creating resilience against stress and depression.</p>
      </>
    ),
  },

  {
    id: catId(59),
    slug: 'default-mode-network-brain-lost-in-thought',
    title: "The Default Mode Network: What Your Brain Does When You're Lost in Thought",
    description: "The DMN activates during rest and mind-wandering. Overactivity is linked to rumination, depression, and self-focused negative thinking.",
    image: "/images/articles/cat01/cover-059.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Default Mode Network', 'Mind-Wandering', 'Research Digest', 'Rumination'],
    citations: [
      { id: '1', text: 'The default mode network and self-referential thought', source: 'Trends in Cognitive Sciences', year: '2020', link: 'https://doi.org/10.1016/j.tics.2020.03.011', tier: 1 },
      { id: '2', text: 'DMN hyperactivity in depression', source: 'Biological Psychiatry', year: '2021', link: 'https://doi.org/10.1016/j.biopsych.2021.03.007', tier: 1 },
      { id: '3', text: 'Mindfulness and DMN deactivation', source: 'NeuroImage', year: '2020', link: 'https://doi.org/10.1016/j.neuroimage.2020.116616', tier: 1 },
      { id: '4', text: 'Mind-wandering and unhappiness', source: 'Science', year: '2010', link: 'https://doi.org/10.1126/science.1192439', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You're driving home and suddenly realize you don't remember the last 10 minutes. You're reading a book but your mind is replaying yesterday's argument. This is your default mode network (DMN) at work—the brain's 'idle' state that activates when you're not focused on external tasks.
          </p>
          <p className="mb-6">
            The DMN includes medial prefrontal cortex, posterior cingulate, and angular gyrus <Citation id="1" index={1} source="Trends in Cognitive Sciences" year="2020" tier={1} />. It's involved in self-referential thinking, memory, and imagining the future.
          </p>
        </div>
        <h2 id="key-findings" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Key Research Findings</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Overactive DMN is characteristic of depression—associated with rumination and negative self-focus <Citation id="2" index={2} source="Biological Psychiatry" year="2021" tier={1} /></li>
          <li>Mind-wandering correlates with unhappiness—people are less happy when their minds wander <Citation id="4" index={4} source="Science" year="2010" tier={1} /></li>
          <li>Mindfulness meditation reduces DMN activity and connectivity <Citation id="3" index={3} source="NeuroImage" year="2020" tier={1} /></li>
          <li>Task-focused attention deactivates DMN—why flow states feel good</li>
        </ul>
        <h2 id="what-this-means" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What This Means for You</h2>
        <p className="mb-6">When your DMN is overactive, you're lost in self-referential thought—often negative. Engaging in focused tasks, mindfulness, or physical activity quiets the DMN and reduces rumination. This is why "getting out of your head" through action or presence helps.</p>
      </>
    ),
  },

  {
    id: catId(60),
    slug: 'polyvagal-theory-nervous-system-three-states',
    title: "Polyvagal Theory in Plain Language: Your Nervous System's Three States",
    description: "Polyvagal theory explains three nervous system states: safe/social, fight/flight, and shutdown. Learn to recognize and shift between them.",
    image: "/images/articles/cat01/cover-060.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Polyvagal Theory', 'Nervous System', 'Research Digest', 'Trauma'],
    citations: [
      { id: '1', text: 'The polyvagal theory: New insights into adaptive reactions', source: 'Cleveland Clinic Journal of Medicine', year: '2009', link: 'https://doi.org/10.3949/ccjm.76.s2.17', tier: 2 },
      { id: '2', text: 'Polyvagal theory and trauma treatment', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101850', tier: 1 },
      { id: '3', text: 'Vagal regulation and emotional well-being', source: 'Biological Psychology', year: '2021', link: 'https://doi.org/10.1016/j.biopsycho.2021.108049', tier: 1 },
      { id: '4', text: 'Social engagement system and co-regulation', source: 'Development and Psychopathology', year: '2011', link: 'https://doi.org/10.1017/S0954579411000156', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Why do you sometimes freeze when threatened instead of fighting or fleeing? Why does connection with others calm you down? Polyvagal theory, developed by Stephen Porges, explains how your autonomic nervous system has three distinct states—each with different emotional and behavioral profiles.
          </p>
          <p className="mb-6">
            Unlike the outdated "fight-or-flight" binary, polyvagal theory recognizes three hierarchical states governed by different branches of the vagus nerve <Citation id="1" index={1} source="Cleveland Clinic Journal of Medicine" year="2009" tier={2} />.
          </p>
        </div>
        <h2 id="three-states" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Three States</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Ventral vagal (Safe & Social):</strong> Calm, connected, open to social engagement. Optimal state for learning, connection, and play.</li>
          <li><strong>Sympathetic (Mobilization):</strong> Fight-or-flight. Activated when safety is threatened. Anxiety, anger, panic.</li>
          <li><strong>Dorsal vagal (Shutdown):</strong> Freeze, collapse, dissociation. Oldest survival response when mobilization fails. Numbness, hopelessness, disconnection.</li>
        </ul>
        <h2 id="key-findings" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Key Research Findings</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Trauma survivors often oscillate between sympathetic hyperarousal and dorsal shutdown <Citation id="2" index={2} source="Clinical Psychology Review" year="2020" tier={1} /></li>
          <li>Social connection activates the ventral vagal system—why supportive relationships are healing <Citation id="4" index={4} source="Development and Psychopathology" year="2011" tier={1} /></li>
          <li>Higher vagal tone (ventral vagal activity) predicts better emotional regulation <Citation id="3" index={3} source="Biological Psychology" year="2021" tier={1} /></li>
          <li>You cannot think your way into safety—you need bottom-up physiological interventions</li>
        </ul>
        <QuoteBlock quote="The nervous system is constantly asking: Is it safe? Only when we feel safe can we connect, learn, and thrive." attribution="Stephen Porges" role="Neuroscientist" source="The Polyvagal Theory" variant="default" />
        <h2 id="what-this-means" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What This Means for You</h2>
        <p className="mb-6">Understanding your nervous system state helps you choose appropriate interventions. In sympathetic activation: move, breathe, expend energy. In dorsal shutdown: gentle movement, warmth, connection. In ventral vagal: you're already regulated—maintain through connection and presence.</p>
      </>
    ),
  },
];
