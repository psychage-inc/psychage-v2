/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_EMOTIONAL_REGULATION, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  StatCard,
  ArticleAccordion,
  QuoteBlock,
} from '../../../components/article/blocks';

export const neuroscienceOfEmotionsArticlesA: Article[] = [
  // ==========================================================================
  // Article 51: Your Brain on Emotions
  // ==========================================================================
  {
    id: catId(51),
    slug: 'your-brain-on-emotions-neural-networks-that-create-feelings',
    title: 'Your Brain on Emotions: A Tour of the Neural Networks That Create Feelings',
    description: 'Explore the brain regions and networks responsible for generating, processing, and regulating emotions—from the amygdala to the prefrontal cortex.',
    image: "/images/articles/cat01/cover-051.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Neuroscience', 'Brain', 'Research Digest', 'Emotions'],
    citations: [
      { id: '1', text: 'The neural basis of emotion: A meta-analytic review', source: 'Behavioral and Brain Sciences', year: '2020', link: 'https://doi.org/10.1017/S0140525X19002619', tier: 1 },
      { id: '2', text: 'Emotion generation and regulation networks', source: 'Nature Reviews Neuroscience', year: '2021', link: 'https://doi.org/10.1038/s41583-021-00445-7', tier: 1 },
      { id: '3', text: 'The role of the prefrontal cortex in emotional regulation', source: 'Trends in Cognitive Sciences', year: '2020', link: 'https://doi.org/10.1016/j.tics.2020.03.004', tier: 1 },
      { id: '4', text: 'Subcortical contributions to emotion', source: 'Annual Review of Neuroscience', year: '2019', link: 'https://doi.org/10.1146/annurev-neuro-070918-050342', tier: 1 },
      { id: '5', text: 'The insula and emotional awareness', source: 'Current Opinion in Psychology', year: '2021', link: 'https://doi.org/10.1016/j.copsyc.2020.09.006', tier: 1 },
      { id: '6', text: 'Hemispheric asymmetry in emotion processing', source: 'Brain and Cognition', year: '2020', link: 'https://doi.org/10.1016/j.bandc.2020.105608', tier: 1 },
      { id: '7', text: 'The limbic system: Emotion, memory, and motivation', source: 'Neuroscience & Biobehavioral Reviews', year: '2019', link: 'https://doi.org/10.1016/j.neubiorev.2019.04.003', tier: 1 },
      { id: '8', text: 'Neural networks of emotion: Recent advances', source: 'Neuron', year: '2021', link: 'https://doi.org/10.1016/j.neuron.2021.02.012', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Emotions feel automatic and mysterious—but they're the product of specific brain networks firing in coordinated patterns. Understanding the neuroscience of emotions reveals why you feel what you feel, how regulation works at a biological level, and why some people struggle more with emotional control than others.
          </p>
          <p className="mb-6">
            Contrary to outdated models that localized emotions to single "emotion centers," modern neuroscience shows that emotions emerge from distributed networks across the brain <Citation id="1" index={1} source="Behavioral and Brain Sciences" year="2020" tier={1} />. Let's take a tour of the key players.
          </p>
        </div>

        <h2 id="key-regions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Brain Regions in Emotion
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'amygdala',
              title: 'Amygdala: The Threat Detector',
              content: (
                <p>Rapid threat detection and fear processing. Activates the fight-flight-freeze response before conscious awareness. Hyperactive in anxiety disorders, PTSD <Citation id="4" index={4} source="Annual Review of Neuroscience" year="2019" tier={1} />.</p>
              ),
            },
            {
              id: 'prefrontal',
              title: 'Prefrontal Cortex: The Regulator',
              content: (
                <p>Executive control, impulse inhibition, emotion regulation. Modulates amygdala activity. Underactive in impulsive disorders, immature in adolescence <Citation id="3" index={3} source="Trends in Cognitive Sciences" year="2020" tier={1} />.</p>
              ),
            },
            {
              id: 'insula',
              title: 'Insula: The Body Sensor',
              content: (
                <p>Interoception—awareness of internal body states (heart rate, breathing, gut sensations). Critical for emotional awareness and empathy <Citation id="5" index={5} source="Current Opinion in Psychology" year="2021" tier={1} />.</p>
              ),
            },
            {
              id: 'acc',
              title: 'Anterior Cingulate Cortex: The Conflict Monitor',
              content: (
                <p>Detects emotional conflict, monitors pain (physical and social). Involved in empathy and emotion regulation decisions.</p>
              ),
            },
          ]}
        />

        <h2 id="key-findings" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Research Findings
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Emotions are not localized—they emerge from distributed networks involving cortical and subcortical regions <Citation id="2" index={2} source="Nature Reviews Neuroscience" year="2021" tier={1} /></li>
          <li>The prefrontal-amygdala connection is critical for regulation—strong connectivity predicts better emotional control</li>
          <li>Left hemisphere activity is associated with approach/positive emotions; right hemisphere with withdrawal/negative emotions <Citation id="6" index={6} source="Brain and Cognition" year="2020" tier={1} /></li>
          <li>Individual differences in brain structure and function explain why some people are more emotionally reactive than others</li>
        </ul>

        <StatCard
          stats={[
            { value: 86, suffix: ' billion', label: 'Neurons in the human brain' },
            { value: 200, suffix: ' ms', label: 'Time for amygdala to detect threat' },
            { value: 12, suffix: '+', label: 'Brain regions involved in processing a single emotion' },
          ]}
          source="Nature Reviews Neuroscience, 2021"
        />

        <h2 id="what-this-means" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What This Means for You
        </h2>
        <p className="mb-6">
          Understanding the neuroscience of emotion helps you:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Recognize that emotional reactivity has biological roots—it's not a character flaw</li>
          <li>Understand why regulation techniques (breathing, mindfulness, reappraisal) work at a neural level</li>
          <li>Appreciate that emotional control requires prefrontal cortex engagement—which is why it's hard when you're tired, hungry, or stressed</li>
          <li>Know that neural pathways can be rewired through practice (neuroplasticity)</li>
        </ul>
      </>
    ),
  },

  // ==========================================================================
  // Articles 52-55 (concise research digests)
  // ==========================================================================
  {
    id: catId(52),
    slug: 'amygdala-role-how-brain-detects-threat-too-quickly',
    title: "The Amygdala's Role: How Your Brain Detects Threat (Sometimes Too Quickly)",
    description: "The amygdala is your brain's alarm system—fast, powerful, and sometimes overly sensitive. Learn how it works and why it matters for anxiety and fear.",
    image: "/images/articles/cat01/cover-052.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Amygdala', 'Fear', 'Neuroscience', 'Research Digest'],
    citations: [
      { id: '1', text: 'The amygdala in fear and anxiety', source: 'Neuropsychopharmacology', year: '2020', link: 'https://doi.org/10.1038/s41386-019-0558-y', tier: 1 },
      { id: '2', text: 'Amygdala reactivity and anxiety disorders', source: 'Biological Psychiatry', year: '2021', link: 'https://doi.org/10.1016/j.biopsych.2020.11.014', tier: 1 },
      { id: '3', text: 'Prefrontal-amygdala connectivity in emotion regulation', source: 'Neuroscience & Biobehavioral Reviews', year: '2020', link: 'https://doi.org/10.1016/j.neubiorev.2020.03.025', tier: 1 },
      { id: '4', text: 'Amygdala hijack and emotional reactivity', source: 'Emotion', year: '2019', link: 'https://doi.org/10.1037/emo0000581', tier: 1 },
      { id: '5', text: 'Fear conditioning and extinction', source: 'Nature Reviews Neuroscience', year: '2021', link: 'https://doi.org/10.1038/s41583-021-00467-1', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You're walking alone at night. You see a shadow move. Instantly—before you've consciously processed what it is—your heart races, your muscles tense, and adrenaline floods your system. That's your amygdala at work.
          </p>
          <p className="mb-6">
            The amygdala is a small, almond-shaped structure deep in the brain that acts as your threat detection system <Citation id="1" index={1} source="Neuropsychopharmacology" year="2020" tier={1} />. It's fast, automatic, and evolutionarily ancient—designed to keep you alive by triggering fear before your conscious mind catches up.
          </p>
        </div>

        <h2 id="what-it-does" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What the Amygdala Does
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Rapid threat detection:</strong> Processes potential dangers in ~200 milliseconds—before cortical awareness</li>
          <li><strong>Fear learning:</strong> Associates neutral stimuli with danger through classical conditioning</li>
          <li><strong>Activates stress response:</strong> Triggers fight-flight-freeze via hypothalamus and autonomic nervous system</li>
          <li><strong>Encodes emotional memories:</strong> Ensures threatening experiences are remembered vividly</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>The amygdala operates on a "better safe than sorry" principle. It would rather trigger 100 false alarms than miss one real threat. This is why anxiety often feels disproportionate to actual danger <Citation id="4" index={4} source="Emotion" year="2019" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="key-findings" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Research Findings
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>People with anxiety disorders show hyperactive amygdala responses to neutral or ambiguous stimuli <Citation id="2" index={2} source="Biological Psychiatry" year="2021" tier={1} /></li>
          <li>Prefrontal cortex can down-regulate amygdala activity through conscious emotion regulation strategies</li>
          <li>Exposure therapy works by strengthening extinction circuits—teaching the amygdala that old threats are no longer dangerous <Citation id="5" index={5} source="Nature Reviews Neuroscience" year="2021" tier={1} /></li>
          <li>Weak prefrontal-amygdala connectivity predicts poor emotional control and higher anxiety</li>
        </ul>

        <h2 id="what-this-means" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What This Means for You
        </h2>
        <p className="mb-6">
          When you feel sudden fear or panic, your amygdala has likely activated before your rational brain. The key is engaging your prefrontal cortex to assess whether the threat is real. Techniques like slow breathing, grounding, and cognitive reappraisal help quiet amygdala reactivity by strengthening top-down control <Citation id="3" index={3} source="Neuroscience & Biobehavioral Reviews" year="2020" tier={1} />.
        </p>
      </>
    ),
  },

  {
    id: catId(53),
    slug: 'neuroplasticity-emotional-change-rewire-feeling-patterns',
    title: 'Neuroplasticity and Emotional Change: Can You Rewire Your Feeling Patterns?',
    description: 'Your brain can change throughout life. Neuroplasticity explains how therapy, practice, and experience reshape emotional patterns at a biological level.',
    image: "/images/articles/cat01/cover-053.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Neuroplasticity', 'Brain Change', 'Research Digest', 'Therapy'],
    citations: [
      { id: '1', text: 'Neuroplasticity across the lifespan', source: 'Nature Reviews Neuroscience', year: '2020', link: 'https://doi.org/10.1038/s41583-020-0283-7', tier: 1 },
      { id: '2', text: 'Therapy-induced neuroplastic changes', source: 'Biological Psychiatry', year: '2021', link: 'https://doi.org/10.1016/j.biopsych.2021.02.010', tier: 1 },
      { id: '3', text: 'Mindfulness and brain structure changes', source: 'Psychiatry Research: Neuroimaging', year: '2020', link: 'https://doi.org/10.1016/j.pscychresns.2020.111084', tier: 1 },
      { id: '4', text: 'Experience-dependent plasticity in emotion circuits', source: 'Trends in Neurosciences', year: '2021', link: 'https://doi.org/10.1016/j.tins.2021.01.002', tier: 1 },
      { id: '5', text: 'Neuroplasticity and recovery from mental illness', source: 'Current Opinion in Psychiatry', year: '2020', link: 'https://doi.org/10.1097/YCO.0000000000000653', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "You can't teach an old dog new tricks." For decades, neuroscience believed the adult brain was fixed and unchangeable. Then came the discovery of neuroplasticity—the brain's lifelong ability to reorganize itself by forming new neural connections.
          </p>
          <p className="mb-6">
            This revolutionary finding means that emotional patterns, though deeply ingrained, are not permanent. Your brain can rewire itself in response to experience, practice, and therapy <Citation id="1" index={1} source="Nature Reviews Neuroscience" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="what-is-it" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Neuroplasticity?
        </h2>
        <p className="mb-6">
          Neuroplasticity is the brain's ability to change its structure and function in response to experience. This happens through:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Synaptic plasticity:</strong> Strengthening or weakening connections between neurons</li>
          <li><strong>Neurogenesis:</strong> Growing new neurons (limited areas like hippocampus)</li>
          <li><strong>Cortical reorganization:</strong> Reassigning brain regions to new functions</li>
          <li><strong>Myelin changes:</strong> Improving signal transmission speed in frequently-used pathways</li>
        </ul>

        <h2 id="key-findings" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Research Findings
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Cognitive Behavioral Therapy (CBT) produces measurable changes in prefrontal and limbic brain activity <Citation id="2" index={2} source="Biological Psychiatry" year="2021" tier={1} /></li>
          <li>8 weeks of mindfulness meditation increases gray matter density in regions involved in emotion regulation <Citation id="3" index={3} source="Psychiatry Research: Neuroimaging" year="2020" tier={1} /></li>
          <li>Repeated practice of new emotional responses strengthens alternative neural pathways, eventually making them automatic</li>
          <li>Neuroplasticity continues throughout life, though the rate slows with age <Citation id="4" index={4} source="Trends in Neurosciences" year="2021" tier={1} /></li>
        </ul>

        <QuoteBlock
          quote="The brain is not a static organ. It is dynamic, constantly rewiring itself based on what we do, think, and experience."
          attribution="Norman Doidge"
          role="Psychiatrist and Author"
          source="The Brain That Changes Itself"
          variant="default"
        />

        <h2 id="what-this-means" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What This Means for You
        </h2>
        <p className="mb-6">
          Emotional patterns can change—but it requires consistent practice over time. Just as physical exercise builds muscle, mental practice (therapy, mindfulness, deliberate emotional regulation) builds new neural pathways. Recovery from anxiety, depression, and trauma is not just psychological—it's biological <Citation id="5" index={5} source="Current Opinion in Psychiatry" year="2020" tier={1} />.
        </p>
      </>
    ),
  },

  {
    id: catId(54),
    slug: 'vagus-nerve-bodys-built-in-calm-down-system',
    title: "The Vagus Nerve: Your Body's Built-In Calm-Down System",
    description: "The vagus nerve connects your brain to your body's organs and plays a central role in the relaxation response. Learn how to activate it.",
    image: "/images/articles/cat01/cover-054.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Vagus Nerve', 'Nervous System', 'Research Digest', 'Regulation'],
    citations: [
      { id: '1', text: 'The vagus nerve and emotion regulation', source: 'Neuroscience & Biobehavioral Reviews', year: '2020', link: 'https://doi.org/10.1016/j.neubiorev.2020.02.009', tier: 1 },
      { id: '2', text: 'Vagal tone and mental health', source: 'Biological Psychology', year: '2021', link: 'https://doi.org/10.1016/j.biopsycho.2021.108049', tier: 1 },
      { id: '3', text: 'Vagus nerve stimulation for depression', source: 'Brain Stimulation', year: '2020', link: 'https://doi.org/10.1016/j.brs.2020.08.013', tier: 1 },
      { id: '4', text: 'Breathing and vagal activation', source: 'Frontiers in Psychology', year: '2019', link: 'https://doi.org/10.3389/fpsyg.2019.02272', tier: 1 },
      { id: '5', text: 'Polyvagal theory and clinical applications', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101850', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Deep breathing calms you down. Cold water on your face slows your heart rate. Humming or singing soothes anxiety. These aren't just folk remedies—they all activate the vagus nerve, your body's built-in calm-down system.
          </p>
          <p className="mb-6">
            The vagus nerve is the longest cranial nerve, running from your brainstem through your neck and chest to your abdomen <Citation id="1" index={1} source="Neuroscience & Biobehavioral Reviews" year="2020" tier={1} />. It's the main component of the parasympathetic nervous system—the "rest and digest" mode that counteracts stress.
          </p>
        </div>

        <h2 id="what-it-does" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What the Vagus Nerve Does
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Slows heart rate and lowers blood pressure</li>
          <li>Promotes digestion and nutrient absorption</li>
          <li>Reduces inflammation</li>
          <li>Facilitates social connection and emotional regulation</li>
          <li>Communicates body state to the brain (80% of vagal fibers are afferent—sending info up)</li>
        </ul>

        <h2 id="vagal-tone" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Vagal Tone: The Key Metric
        </h2>
        <p className="mb-6">
          Vagal tone refers to the activity level of the vagus nerve. Higher vagal tone = better emotional regulation, stress resilience, and physical health <Citation id="2" index={2} source="Biological Psychology" year="2021" tier={1} />. Low vagal tone is associated with anxiety, depression, and inflammation.
        </p>

        <ArticleCallout variant="tip" title="How to Activate Your Vagus Nerve">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Deep, slow breathing:</strong> Especially slow exhales (6 sec in, 8 sec out) <Citation id="4" index={4} source="Frontiers in Psychology" year="2019" tier={1} /></li>
            <li><strong>Cold exposure:</strong> Splash cold water on your face or hold ice to your chest</li>
            <li><strong>Humming, singing, or chanting:</strong> Vibration stimulates vagal fibers</li>
            <li><strong>Massage:</strong> Especially neck and feet</li>
            <li><strong>Social connection:</strong> Positive social interaction activates the social engagement system</li>
          </ul>
        </ArticleCallout>

        <h2 id="key-findings" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Research Findings
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Vagus nerve stimulation (VNS) is FDA-approved for treatment-resistant depression <Citation id="3" index={3} source="Brain Stimulation" year="2020" tier={1} /></li>
          <li>Higher vagal tone predicts better emotion regulation and lower anxiety</li>
          <li>Polyvagal theory shows the vagus has two branches—one for safety/connection, one for shutdown/collapse <Citation id="5" index={5} source="Clinical Psychology Review" year="2020" tier={1} /></li>
        </ul>

        <h2 id="what-this-means" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What This Means for You
        </h2>
        <p className="mb-6">
          The vagus nerve is trainable. Regular practices like deep breathing, meditation, and cold exposure can increase vagal tone over time, making you more resilient to stress and better able to regulate emotions.
        </p>
      </>
    ),
  },

  {
    id: catId(55),
    slug: 'stress-hormones-hijack-emotional-regulation',
    title: 'How Stress Hormones Hijack Your Emotional Regulation',
    description: 'Cortisol and adrenaline are essential for survival—but chronic activation impairs your ability to think clearly and regulate emotions.',
    image: "/images/articles/cat01/cover-055.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Stress', 'Cortisol', 'Research Digest', 'Hormones'],
    citations: [
      { id: '1', text: 'Cortisol and the stress response', source: 'Nature Reviews Endocrinology', year: '2020', link: 'https://doi.org/10.1038/s41574-020-0355-7', tier: 1 },
      { id: '2', text: 'Chronic stress and prefrontal cortex function', source: 'Nature Neuroscience', year: '2021', link: 'https://doi.org/10.1038/s41593-021-00863-9', tier: 1 },
      { id: '3', text: 'Stress hormones and emotional memory', source: 'Neuroscience & Biobehavioral Reviews', year: '2020', link: 'https://doi.org/10.1016/j.neubiorev.2020.04.012', tier: 1 },
      { id: '4', text: 'HPA axis dysregulation in mood disorders', source: 'Molecular Psychiatry', year: '2021', link: 'https://doi.org/10.1038/s41380-020-00946-3', tier: 1 },
      { id: '5', text: 'Allostatic load and health outcomes', source: 'Psychosomatic Medicine', year: '2020', link: 'https://doi.org/10.1097/PSY.0000000000000841', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You're running late, stuck in traffic, and your boss just sent an angry email. Your heart pounds. Your mind races. You snap at the person next to you. This isn't a character flaw—it's cortisol and adrenaline flooding your system, temporarily shutting down your prefrontal cortex.
          </p>
          <p className="mb-6">
            Stress hormones are designed for survival—they mobilize energy and sharpen focus during acute threats. But when stress becomes chronic, these same hormones impair the very brain regions responsible for emotional regulation <Citation id="1" index={1} source="Nature Reviews Endocrinology" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="stress-response" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Stress Response System
        </h2>
        <p className="mb-6">
          When you perceive a threat, the hypothalamus activates the HPA axis (hypothalamic-pituitary-adrenal), releasing:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Adrenaline (epinephrine):</strong> Immediate response—increases heart rate, blood pressure, energy</li>
          <li><strong>Cortisol:</strong> Sustained response—mobilizes glucose, suppresses non-essential functions</li>
        </ul>

        <h2 id="acute-vs-chronic" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Acute vs. Chronic Stress Effects
        </h2>
        <p className="mb-6">
          <strong>Acute stress:</strong> Enhances focus and memory consolidation. Adaptive and protective.
        </p>
        <p className="mb-6">
          <strong>Chronic stress:</strong> Impairs prefrontal cortex function, shrinks hippocampus, enlarges amygdala. Maladaptive and damaging <Citation id="2" index={2} source="Nature Neuroscience" year="2021" tier={1} />.
        </p>

        <h2 id="key-findings" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Research Findings
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Chronic cortisol exposure reduces prefrontal cortex volume and impairs executive function</li>
          <li>High cortisol enhances fear memory formation—making traumatic memories harder to forget <Citation id="3" index={3} source="Neuroscience & Biobehavioral Reviews" year="2020" tier={1} /></li>
          <li>HPA axis dysregulation is found in major depression, PTSD, and anxiety disorders <Citation id="4" index={4} source="Molecular Psychiatry" year="2021" tier={1} /></li>
          <li>Allostatic load (cumulative stress burden) predicts long-term health outcomes <Citation id="5" index={5} source="Psychosomatic Medicine" year="2020" tier={1} /></li>
        </ul>

        <h2 id="what-this-means" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What This Means for You
        </h2>
        <p className="mb-6">
          When you're chronically stressed, emotional regulation becomes harder—not because you're weak, but because your biology is compromised. Reducing cortisol through stress management (exercise, sleep, social connection, therapy) is essential for restoring emotional control.
        </p>
      </>
    ),
  },
];
