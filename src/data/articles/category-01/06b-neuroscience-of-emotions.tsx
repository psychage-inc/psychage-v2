 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_EMOTIONAL_REGULATION, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import SummaryBox from '../../../components/article/SummaryBox';
import KeyFacts from '../../../components/article/KeyFacts';
import SparkMoment from '../../../components/article/SparkMoment';
import PracticalExercise from '../../../components/article/PracticalExercise';
import ReferenceList from '../../../components/article/ReferenceList';
import {
  ArticleCallout,
  StatCard,
  QuoteBlock,
  DiagramBlock,
  RelatedToolsBlock,
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
    readTime: 12,
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
        <SummaryBox>
          Have you ever winced watching someone stub their toe? Felt your mood darken around an anxious friend? Absorbed the energy of a room full of stressed colleagues? This isn't coincidence or oversensitivity—it's your mirror neuron system at work. Mirror neurons are brain cells that fire both when you perform an action and when you observe someone else performing it, creating an internal simulation of their experience. This neural mirroring forms the biological foundation of empathy, allowing you to understand others' feelings not through intellectual analysis but through direct neurological resonance. The same system that helps you connect deeply with others can also leave you vulnerable to emotional contagion, absorbing others' stress, anxiety, or sadness. Understanding how mirror neurons work—and when they work too well—empowers you to harness empathy's gifts while protecting yourself from its costs.
        </SummaryBox>

        <KeyFacts citations={[
          { citationId: '1', fact: 'Mirror neurons fire in your premotor cortex, inferior parietal lobule, and insula when you both perform actions and observe others performing them, creating neural simulation of their experience' },
          { citationId: '2', fact: 'Emotional contagion occurs through automatic facial mimicry paired with mirror neuron activation, causing you to literally "catch" others' emotional states' },
          { citationId: '5', fact: 'Social pain from rejection or exclusion activates the same brain regions (anterior cingulate cortex, insula) as physical pain, explaining why emotional hurt feels genuinely painful' },
          { citationId: '4', fact: 'Reduced mirror neuron activity in autism spectrum disorder may contribute to difficulties with intuitive empathy, though cognitive empathy remains intact' },
          { citationId: '3', fact: 'Empathy involves complex brain connectivity between mirror neuron regions, emotional processing centers, and executive control networks—not a single "empathy center"' },
        ]} />

        <h2>What Are Mirror Neurons?</h2>

        <p>
          Mirror neurons were first discovered accidentally in the 1990s by Italian neuroscientist Giacomo Rizzolatti. While studying motor control in macaque monkeys, researchers noticed something unexpected: certain neurons fired not only when a monkey performed an action (like grasping food) but also when the monkey <em>watched</em> another monkey or human perform the same action.<Citation id="1" />
        </p>

        <p>
          This discovery revolutionized neuroscience's understanding of social cognition. These neurons weren't just representing the monkey's own actions—they were creating an internal simulation of <em>observed</em> actions, as if the monkey were performing them itself. In humans, mirror neuron systems are far more sophisticated, extending beyond simple motor actions to emotions, intentions, and complex social behaviors.
        </p>

        <p>
          In humans, mirror neurons are located in several key brain regions:<Citation id="1" />
        </p>

        <ul>
          <li><strong>Premotor cortex:</strong> Mirrors observed motor actions, allowing you to understand what someone is doing</li>
          <li><strong>Inferior parietal lobule:</strong> Integrates sensory information about observed actions and intentions</li>
          <li><strong>Insula:</strong> Mirrors emotional states, particularly disgust, pain, and visceral experiences</li>
          <li><strong>Anterior cingulate cortex:</strong> Involved in mirroring social pain and emotional distress</li>
        </ul>

        <p>
          When you watch someone smile, your mirror neurons activate the same facial motor programs that produce smiling—often causing you to smile slightly yourself (even if you don't notice). When you see someone in pain, your pain-processing regions activate. When you observe someone reaching for a cup, your action-planning regions simulate that reach. You're not just <em>seeing</em> others' experiences—you're neurologically <em>resonating</em> with them.
        </p>

        <h2>Mirror Neurons and Empathy</h2>

        <p>
          Empathy—the capacity to understand and share others' feelings—relies heavily on mirror neuron systems. But empathy isn't a single, simple process. Neuroscience distinguishes between different types:<Citation id="3" />
        </p>

        <ul>
          <li><strong>Affective empathy (emotional contagion):</strong> Automatically feeling what someone else feels through mirror neuron resonance. This happens fast, unconsciously, and is hard to control. You see someone cry, your throat tightens, your eyes water.</li>
          <li><strong>Cognitive empathy (perspective-taking):</strong> Consciously understanding someone else's mental state through reasoning and theory of mind. This requires prefrontal cortex activity and executive function, not just mirror neurons. You think, "She must be frustrated because her proposal was rejected."</li>
          <li><strong>Empathic concern (compassion):</strong> Feeling motivated to help someone suffering, mediated by different brain regions (anterior insula, medial prefrontal cortex) than mirroring alone.</li>
        </ul>

        <p>
          Mirror neurons primarily drive <em>affective</em> empathy—the gut-level, automatic sharing of emotions. This can be beautiful (crying at weddings, feeling joy for a friend's success) or burdensome (absorbing a partner's anxiety, feeling drained after being around someone depressed). Crucially, affective empathy doesn't require <em>accuracy</em>—you might mirror distress someone isn't actually feeling, or misread their emotion entirely based on your own projections.
        </p>

        <DiagramBlock
          type="cycle"
          title="The Emotional Contagion Cycle"
          description="How mirror neurons create automatic emotional spreading between people"
          nodes={[
            { id: '1', label: 'Person A feels anxious' },
            { id: '2', label: 'Person A displays anxiety cues (facial tension, fidgeting)' },
            { id: '3', label: 'Person B observes cues' },
            { id: '4', label: 'Person B's mirror neurons activate' },
            { id: '5', label: 'Person B unconsciously mimics cues' },
            { id: '6', label: 'Person B feels anxious (feedback from mimicry + neural simulation)' },
          ]}
          source="Based on Trends in Cognitive Sciences, 2021"
        />

        <h2>How Emotional Contagion Works</h2>

        <p>
          Emotional contagion—the phenomenon of "catching" someone else's mood—happens through a multi-step process involving mirror neurons and facial feedback:<Citation id="2" />
        </p>

        <ol>
          <li><strong>Observation:</strong> You see someone displaying an emotion (facial expression, body language, vocal tone)</li>
          <li><strong>Automatic mimicry:</strong> Your mirror neurons activate motor programs that subtly mimic their expression—you slightly furrow your brow when they look worried, relax your shoulders when they seem calm</li>
          <li><strong>Facial feedback:</strong> Sensory signals from your own facial muscles feed back to your brain's emotion centers (this is why forcing a smile can slightly improve mood—your brain interprets your face's position as evidence of happiness)</li>
          <li><strong>Neural simulation:</strong> Your insula and anterior cingulate cortex activate patterns similar to what you'd experience if you were genuinely feeling that emotion</li>
          <li><strong>Conscious experience:</strong> You become aware of feeling anxious, sad, happy, or stressed—often without recognizing it came from someone else</li>
        </ol>

        <p>
          This process happens automatically and unconsciously. You don't <em>decide</em> to catch someone's anxiety—your mirror neurons don't ask permission. This explains why being around chronically stressed, anxious, or depressed people can wear you down emotionally, even when you consciously want to support them. It also explains why positive emotions spread: laughter is contagious because your mirror neurons simulate others' joy.<Citation id="2" />
        </p>

        <h2>Social Pain and Physical Pain: Shared Circuits</h2>

        <p>
          One of the most striking findings in social neuroscience is that social pain—rejection, exclusion, ostracism, loss—activates the same brain regions as physical pain. The anterior cingulate cortex (ACC) and insula, which light up when you burn your hand or stub your toe, also activate when you're socially rejected or watch someone else be excluded.<Citation id="5" />
        </p>

        <p>
          This isn't metaphor—social pain is neurologically real pain. Studies show that taking acetaminophen (Tylenol) can reduce not just physical pain but also the distress of social rejection, because both use overlapping neural pathways. This overlap likely evolved because social connection was survival-critical for humans: being excluded from the group meant death, so the brain treats social pain as seriously as physical injury.<Citation id="5" />
        </p>

        <p>
          Mirror neurons play a role here too: when you watch someone be rejected or humiliated, your own pain networks activate. You literally feel a portion of their hurt. This capacity for shared pain drives prosocial behavior (helping, defending, comforting) but can also lead to empathic distress—becoming so overwhelmed by others' suffering that you shut down or avoid them.
        </p>

        <h2>Mirror Neurons in Autism: A Complex Picture</h2>

        <p>
          Early mirror neuron research hypothesized that autism spectrum disorder (ASD) might involve "broken" mirror neurons, explaining difficulties with social communication and empathy. The reality is far more nuanced.<Citation id="4" />
        </p>

        <p>
          Some studies do find reduced mirror neuron activity in autistic individuals during certain tasks, particularly those involving spontaneous imitation or emotional facial mimicry. However, when autistic people are explicitly instructed to imitate or empathize, mirror neuron activation normalizes. This suggests the issue may be less about broken mirrors and more about different patterns of spontaneous social attention or motivation.<Citation id="4" />
        </p>

        <p>
          Moreover, many autistic people report experiencing <em>intense</em> empathy—sometimes overwhelmingly so—contradicting the idea that they lack mirror neuron function. The difference may lie in <em>expressing</em> empathy in neurotypical-recognizable ways, not in feeling it. Autistic individuals often show strong cognitive empathy (understanding others' perspectives intellectually) even when affective empathy (automatic emotional resonance) functions differently.
        </p>

        <p>
          This research reminds us that mirror neurons are one piece of a complex social brain, not the sole determinant of empathy or social connection.
        </p>

        <SparkMoment
          title="Connection Is Neurological"
          content="Empathy isn't some mystical ability to 'read minds'—it's your brain physically simulating others' internal states using the same neural hardware you use for your own experiences. When someone says they 'feel your pain,' it's not just rhetoric. Their brain is literally activating pain-processing regions. Connection is biological."
        />

        <PracticalExercise
          title="Empathy with Boundaries: Balancing Mirror Neurons"
          description="A 5-step practice for maintaining empathic connection without emotional overwhelm"
          steps={[
            {
              title: '1. Notice Emotional Contagion in Real-Time',
              content: 'When you're around others, pause and check: How did I feel before entering this space? How do I feel now? Did my mood shift after interacting with this person? Awareness is the first step to regulating automatic mirroring.',
            },
            {
              title: '2. Name Whose Emotion You're Feeling',
              content: 'Ask yourself: Is this <em>my</em> anxiety, or am I mirroring someone else's stress? Labeling the source creates psychological distance. You can acknowledge their emotion without fully absorbing it.',
            },
            {
              title: '3. Use Physical Boundaries to Interrupt Mirroring',
              content: 'Mirror neurons activate through visual observation. If you're overwhelmed by someone's emotional state, briefly look away, create physical distance, or excuse yourself. Reducing sensory input to the mirror system reduces contagion.',
            },
            {
              title: '4. Engage Cognitive Empathy, Not Just Affective',
              content: 'Shift from feeling-with (affective empathy) to thinking-about (cognitive empathy). "I understand they're stressed" is less draining than viscerally experiencing their stress yourself. Both are valid forms of empathy—choose intentionally.',
            },
            {
              title: '5. Practice Empathic Concern Without Distress',
              content: 'Compassion—caring about someone's suffering and wanting to help—can exist without full emotional resonance. You can support someone in pain while maintaining your own emotional equilibrium. That's not coldness; it's sustainable empathy.',
            },
          ]}
        />

        <h2>When Mirror Neurons Work Too Well</h2>

        <p>
          For some people—particularly highly sensitive individuals, those with anxiety disorders, or people raised in environments requiring hypervigilance to others' emotions—mirror neuron systems can become over-responsive. You absorb every emotional shift in a room. You feel exhausted after social interactions because you've been neurologically mirroring everyone. You struggle to distinguish your own emotions from those you've absorbed.
        </p>

        <p>
          If this describes you, you're not "too sensitive"—your mirror neurons are doing exactly what they evolved to do, just intensely. Strategies that help:
        </p>

        <ul>
          <li><strong>Limit exposure to highly emotional environments:</strong> You wouldn't expect someone with sensory processing issues to thrive in loud, chaotic spaces. Similarly, highly empathic people need to limit time in emotionally intense settings.</li>
          <li><strong>Practice grounding after social interactions:</strong> Physical grounding (cold water, weighted blankets, movement) helps reset your nervous system after intense mirroring.</li>
          <li><strong>Distinguish cognitive from affective empathy:</strong> You can understand someone without viscerally feeling their emotions. Practice shifting to cognitive empathy when affective empathy becomes overwhelming.</li>
          <li><strong>Work with a therapist on boundaries:</strong> Therapists can help you develop skills for maintaining empathic connection without losing yourself in others' emotions.</li>
        </ul>

        <RelatedToolsBlock
          tools={[
            {
              name: 'Mood Journal',
              path: '/tools/mood-journal',
              description: 'Track your emotional patterns and identify when you're absorbing others' emotions',
            },
            {
              name: 'Emotional Regulation Tools',
              path: '/tools',
              description: 'Explore evidence-based practices for managing empathic overwhelm',
            },
          ]}
        />

        <ReferenceList
          references={[
            { id: '1', text: 'Mirror neuron system and empathy', source: 'Current Biology', year: '2020', link: 'https://doi.org/10.1016/j.cub.2020.02.016' },
            { id: '2', text: 'Emotional contagion: Neural mechanisms', source: 'Trends in Cognitive Sciences', year: '2021', link: 'https://doi.org/10.1016/j.tics.2021.02.003' },
            { id: '3', text: 'Empathy and brain connectivity', source: 'Neuroscience & Biobehavioral Reviews', year: '2020', link: 'https://doi.org/10.1016/j.neubiorev.2020.05.008' },
            { id: '4', text: 'Mirror neuron dysfunction in autism', source: 'Molecular Psychiatry', year: '2019', link: 'https://doi.org/10.1038/s41380-019-0405-5' },
            { id: '5', text: 'Social pain and physical pain: Shared neural circuits', source: 'Science', year: '2020', link: 'https://doi.org/10.1126/science.aay2352' },
          ]}
        />
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
