 
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

export const phobiasSpecificFearsArticlesB: Article[] = [
  // ============================================================================
  // CAT02-056: Claustrophobia (self_help)
  // ============================================================================
  {
    id: catId(56),
    slug: 'claustrophobia-understanding-the-fear-of-enclosed-spaces',
    title: 'Claustrophobia: Understanding the Fear of Enclosed Spaces',
    description: 'Explore claustrophobia, the intense fear of confined spaces, its triggers, why it develops, and evidence-based strategies for managing and overcoming it.',
    image: "/images/articles/cat02/cover-056.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Claustrophobia', 'Enclosed Spaces', 'Phobia', 'Panic'],
    summary: 'Claustrophobia, the fear of enclosed or confined spaces, affects 4-7% of people and can severely limit life by preventing use of elevators, MRIs, airplanes, and other confined settings. The core fear centers on perceived inability to escape and suffocation anxiety. With exposure therapy and coping strategies, most people significantly reduce their fear and regain freedom.',
    keyFacts: [
      { text: 'Claustrophobia affects 4-7% of people at a clinical level, with many more experiencing milder discomfort', citationIndex: 1 },
      { text: 'The core fear is not the space itself but the perceived inability to escape combined with fear of suffocation or losing control', citationIndex: 4 },
      { text: '37% of MRI scans are not completed due to claustrophobia, delaying critical medical diagnoses', citationIndex: 3 },
      { text: 'Brain imaging shows amygdala hyperactivation and prefrontal cortex underactivation in people with claustrophobia', citationIndex: 2 },
      { text: 'Exposure therapy shows 75% improvement rates, with VR exposure therapy achieving 78% success', citationIndex: 5 },
    ],
    sparkMoment: 'The spaces that once felt like prisons can become just... spaces.',
    practicalExercise: {
      title: 'Build Your Claustrophobia Exposure Ladder',
      steps: [
        { title: 'List Your Triggers', description: 'Write down all the confined spaces that trigger anxiety for you, from mildest to most intense (e.g., small rooms, elevators, MRI machines, airplanes).' },
        { title: 'Rate Your Fear', description: 'On a scale of 0-10, rate how much anxiety each situation causes. This helps you create a gradual progression.' },
        { title: 'Start with the Easiest', description: 'Begin with the situation you rated lowest. Practice entering and staying in that space until your anxiety decreases by at least 50%.' },
        { title: 'Use Grounding Techniques', description: 'While in the confined space, use the 5-4-3-2-1 grounding technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Try the Symptom Navigator',
    },
    citations: [
      {
        id: '1',
        text: 'Prevalence and characteristics of claustrophobia',
        source: 'Depression and Anxiety',
        year: '2018',
        link: 'https://doi.org/10.1002/da.22735',
        tier: 1,
      },
      {
        id: '2',
        text: 'Neural correlates of claustrophobia',
        source: 'NeuroImage: Clinical',
        year: '2020',
        link: 'https://doi.org/10.1016/j.nicl.2020.102345',
        tier: 1,
      },
      {
        id: '3',
        text: 'Claustrophobia and MRI avoidance',
        source: 'Radiology',
        year: '2019',
        link: 'https://doi.org/10.1148/radiol.2019182296',
        tier: 1,
      },
      {
        id: '4',
        text: 'Suffocation fear theory',
        source: 'Cognitive Therapy and Research',
        year: '2017',
        link: 'https://doi.org/10.1007/s10608-017-9845-3',
        tier: 1,
      },
      {
        id: '5',
        text: 'Exposure therapy for claustrophobia',
        source: 'Behaviour Research and Therapy',
        year: '2018',
        link: 'https://doi.org/10.1016/j.brat.2018.06.007',
        tier: 1,
      },
      {
        id: '6',
        text: 'Virtual reality for claustrophobia',
        source: 'Journal of Anxiety Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.janxdis.2020.102245',
        tier: 1,
      },
      {
        id: '7',
        text: 'Coping strategies in confined spaces',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.05.003',
        tier: 1,
      },
      {
        id: '8',
        text: 'Childhood origins of claustrophobia',
        source: 'Journal of Clinical Psychology',
        year: '2016',
        link: 'https://doi.org/10.1002/jclp.22349',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The elevator doors close. Your chest tightens. Your breath quickens. The walls feel like they're moving inward. You need out --- now. Or maybe it's an MRI machine, a crowded subway car, a windowless room, or even a packed concert. Anywhere you feel trapped, enclosed, unable to escape freely.
          </p>
          <p className="mb-6">
            Claustrophobia, the fear of enclosed or confined spaces, affects 4-7% of people at a clinical level and causes milder discomfort in many more <Citation id="1" index={1} source="Depression and Anxiety" year="2018" tier={1} />. It's more than just preferring open spaces --- it's a visceral panic response that can severely limit your life.
          </p>
        </div>

        <h2 id="what-triggers-claustrophobia" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Triggers Claustrophobia?
        </h2>
        <p className="mb-6">
          Common situations that trigger claustrophobic panic:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Elevators</strong> --- especially small or crowded ones, or when they stop between floors</li>
          <li><strong>MRI and CT scanners</strong> --- the narrow tube and loud noises create intense confinement</li>
          <li><strong>Small rooms</strong> without windows or with locked doors</li>
          <li><strong>Airplanes</strong> --- the inability to leave mid-flight triggers panic</li>
          <li><strong>Crowded spaces</strong> --- packed trains, concerts, theaters where you feel hemmed in by people</li>
          <li><strong>Tunnels and caves</strong> --- underground spaces with limited exits</li>
          <li><strong>Cars in traffic</strong> --- feeling stuck, unable to escape</li>
          <li><strong>Tight clothing or restraints</strong> --- anything that restricts movement</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            The core fear in claustrophobia isn't the space itself --- it's the perceived inability to escape combined with fear of suffocation, being trapped, or losing control. Even large rooms can trigger claustrophobia if exits are locked or blocked.
          </p>
        </ArticleCallout>

        <h2 id="what-happens-during-panic" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Happens During a Claustrophobic Panic Attack
        </h2>
        <p className="mb-6">
          When trapped in a confined space, your body launches a full fight-or-flight response:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'physical',
              title: 'Physical Symptoms',
              content: (
                <ul className="list-disc pl-5 space-y-1">
                  <li>Rapid heartbeat and chest tightness</li>
                  <li>Shortness of breath or feeling of suffocation</li>
                  <li>Sweating, trembling, dizziness</li>
                  <li>Nausea or stomach distress</li>
                  <li>Hot or cold flashes</li>
                </ul>
              ),
            },
            {
              id: 'cognitive',
              title: 'Cognitive Symptoms',
              content: (
                <ul className="list-disc pl-5 space-y-1">
                  <li>"I'm going to suffocate"</li>
                  <li>"The walls are closing in"</li>
                  <li>"I'm trapped, I can't get out"</li>
                  <li>"I'm going to die in here"</li>
                  <li>"What if something goes wrong and I can't escape?"</li>
                </ul>
              ),
            },
            {
              id: 'behavioral',
              title: 'Behavioral Symptoms',
              content: (
                <ul className="list-disc pl-5 space-y-1">
                  <li>Desperate attempts to escape (pounding on doors, pressing elevator buttons repeatedly)</li>
                  <li>Refusing to enter confined spaces</li>
                  <li>Positioning yourself near exits</li>
                  <li>Hypervigilance --- constantly scanning for escape routes</li>
                </ul>
              ),
            },
          ]}
        />

        <h2 id="why-it-develops" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Claustrophobia Develops
        </h2>
        <p className="mb-6">
          Claustrophobia typically originates from one or more of these pathways <Citation id="8" index={8} source="Journal of Clinical Psychology" year="2016" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: '1. Traumatic Experience',
              description: (
                <p>
                  Being trapped or stuck in a confined space as a child or adult: locked in a closet, stuck in an elevator, trapped in a car accident, or buried in a collapsed structure. A single terrifying event can create lasting claustrophobia.
                </p>
              ),
            },
            {
              title: '2. Panic Attack in a Confined Space',
              description: (
                <p>
                  Having your first panic attack in an elevator or small room can condition intense fear of that space. Your brain associates confinement with panic, even if the space itself wasn't the cause.
                </p>
              ),
            },
            {
              title: '3. Observational Learning',
              description: (
                <p>
                  Watching a parent or loved one panic in confined spaces. Children absorb fear responses and can develop claustrophobia without direct trauma.
                </p>
              ),
            },
            {
              title: '4. Evolutionary Preparedness',
              description: (
                <p>
                  Some researchers believe humans are biologically primed to fear entrapment because historically, being trapped meant danger (caught by predators, trapped in caves). This makes claustrophobia easier to develop than fears of modern, harmless objects.
                </p>
              ),
            },
          ]}
        />

        <h2 id="brain-research" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Brain Research Shows
        </h2>
        <p className="mb-6">
          Neuroimaging studies reveal altered brain activity in people with claustrophobia <Citation id="2" index={2} source="NeuroImage: Clinical" year="2020" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Amygdala hyperactivation</strong>: Overreacts to images of confined spaces</li>
          <li><strong>Insula engagement</strong>: Heightened processing of physical threat and discomfort</li>
          <li><strong>Prefrontal cortex underactivation</strong>: Difficulty regulating the fear response with rational thought ("I know I'm safe, but I still panic")</li>
        </ul>

        <ArticleCallout variant="did-you-know" title="Suffocation Fear Theory">
          <p>
            Research suggests claustrophobia is closely linked to <strong>suffocation fear</strong> --- the terror of not being able to breathe <Citation id="4" index={4} source="Cognitive Therapy and Research" year="2017" tier={1} />. People with claustrophobia often report feeling like the air is running out in confined spaces, even when objectively there's plenty of oxygen. This explains why even large elevators can trigger panic if they feel "airless."
          </p>
        </ArticleCallout>

        <h2 id="medical-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Claustrophobia Becomes Medically Dangerous
        </h2>
        <p className="mb-6">
          Claustrophobia can interfere with essential medical care:
        </p>

        <StatCard
          stats={[
            { value: 37, suffix: '%', label: 'MRI scans not completed due to claustrophobia' },
            { value: 13, suffix: '%', label: 'Patients refuse MRI entirely due to fear' },
            { value: 50, suffix: '%', label: 'Claustrophobic patients require sedation for MRI' },
          ]}
          source="Radiology study on MRI completion rates, 2019"
        />

        <p className="mb-6">
          MRI machines are essential for diagnosing brain tumors, spinal injuries, torn ligaments, and many other conditions. Avoiding MRI due to claustrophobia can delay critical diagnoses <Citation id="3" index={3} source="Radiology" year="2019" tier={1} />.
        </p>

        <h2 id="coping-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Coping Strategies
        </h2>
        <p className="mb-6">
          Strategies that help manage claustrophobic anxiety <Citation id="7" index={7} source="Clinical Psychology Review" year="2019" tier={1} />:
        </p>

        <ComparisonTable
          title="In-the-Moment Coping Techniques"
          columns={['Technique', 'How It Helps', 'When to Use']}
          items={[
            {
              feature: 'Deep breathing (4-7-8)',
              values: ['Activates calm response, counters hyperventilation', 'During panic in confined space'],
            },
            {
              feature: 'Grounding (5-4-3-2-1)',
              values: ['Redirects focus from fear to present sensory input', 'When feeling trapped'],
            },
            {
              feature: 'Visualization',
              values: ['Mentally escape to open, safe space', 'In MRI, elevator, airplane'],
            },
            {
              feature: 'Progressive muscle relaxation',
              values: ['Releases physical tension', 'Before entering confined space'],
            },
            {
              feature: 'Self-talk',
              values: ["I've done this before. It's temporary. I'm safe.'", 'Throughout exposure'],
            },
          ]}
        />

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Practical Accommodations
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>MRI:</strong> Request an open MRI machine, use a mirror to see outside the tube, ask for music or headphones, request sedation if needed</li>
          <li><strong>Elevators:</strong> Take stairs when possible, use larger elevators, stand near the door, ride with a support person</li>
          <li><strong>Flights:</strong> Book aisle seats, use distraction (movies, music), practice breathing exercises beforehand</li>
          <li><strong>General:</strong> Always know where exits are, keep doors slightly open when possible, use fans for air circulation</li>
        </ul>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Professional Treatment: Exposure Therapy
        </h2>
        <p className="mb-6">
          Claustrophobia responds very well to exposure therapy <Citation id="5" index={5} source="Behaviour Research and Therapy" year="2018" tier={1} />. Treatment involves:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Building a Fear Hierarchy',
              description: (
                <p>
                  Rank situations from least to most fear-inducing. Example: (1) Looking at photos of elevators, (2) Standing outside an elevator, (3) Entering with doors open, (4) Brief ride with doors closing, (5) Longer elevator rides alone.
                </p>
              ),
            },
            {
              title: 'Gradual Exposure',
              description: (
                <p>
                  Start at the bottom of the hierarchy. Stay in each situation until anxiety decreases by at least 50%. Repeat until that level no longer triggers significant fear.
                </p>
              ),
            },
            {
              title: 'Cognitive Restructuring',
              description: (
                <p>
                  Challenge catastrophic thoughts: "The elevator won't run out of air,", "I've never been trapped before,", "Even if I panic, I'll survive."
                </p>
              ),
            },
            {
              title: 'Interoceptive Exposure',
              description: (
                <p>
                  Practice triggering the physical sensations (breathlessness, tightness) in safe settings to reduce fear of the sensations themselves.
                </p>
              ),
            },
          ]}
        />

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          Virtual Reality Exposure Therapy (VRET)
        </h3>
        <p className="mb-6">
          VR is especially effective for claustrophobia <Citation id="6" index={6} source="Journal of Anxiety Disorders" year="2020" tier={1} />. Therapists use VR to simulate elevators, MRI machines, or other confined spaces, allowing gradual exposure without real-world logistics. Studies show 70-80% improvement after 6-8 VR sessions.
        </p>

        <ArticleChart
          type="bar"
          title="Treatment Success Rates for Claustrophobia"
          data={[
            { label: 'Exposure therapy', value: 75 },
            { label: 'VR exposure therapy', value: 78 },
            { label: 'CBT alone', value: 50 },
            { label: 'Relaxation training', value: 35 },
            { label: 'Medication (SSRIs)', value: 40 },
          ]}
          source="Meta-analysis of claustrophobia treatment studies"
        />

        <QuoteBlock
          quote="The cave you fear to enter holds the treasure you seek."
          attribution="Joseph Campbell"
          role="Mythologist, Author"
          variant="default"
        />

        <p className="mb-6">
          Claustrophobia doesn't have to control your medical care, career choices, or daily life. With treatment, most people significantly reduce their fear and regain freedom. The spaces that once felt like prisons can become just... spaces.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-057: Animal Phobias (self_help)
  // ============================================================================
  {
    id: catId(57),
    slug: 'animal-phobias-why-some-fears-feel-hardwired',
    title: 'Animal Phobias: Why Some Fears Feel Hardwired',
    description: 'Discover why fears of spiders, snakes, and other animals develop so easily, the evolutionary roots of animal phobias, and how to overcome them.',
    image: "/images/articles/cat02/cover-057.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Animal Phobia', 'Arachnophobia', 'Evolutionary Psychology', 'Fear'],
    summary: 'Animal phobias like fear of spiders, snakes, and dogs feel hardwired because evolution primed our brains to quickly learn fear of ancestral threats. These "prepared" fears develop fast, resist extinction, and can be transmitted socially even without direct trauma. Despite feeling ancient and unchangeable, animal phobias are highly treatable with exposure therapy and virtual reality approaches.',
    keyFacts: [
      { text: 'Infants as young as 6 months pay more visual attention to snakes and spiders than to flowers or fish, showing an innate bias before fear develops', citationIndex: 2 },
      { text: 'Animal phobias develop through prepared learning—our brains evolved to quickly learn fear of things that were threats to ancestors, making spider/snake phobias far more common than car phobias despite cars being statistically more dangerous', citationIndex: 1 },
      { text: 'Monkey studies show fear can be socially transmitted for evolutionarily prepared stimuli (snakes) but not for arbitrary objects (flowers)', citationIndex: 3 },
      { text: 'Animal phobias involve both fear and disgust, with the dual emotional response making them particularly intense and persistent', citationIndex: 4 },
      { text: 'One-session treatment for animal phobias shows 85% improvement rates, with 90% maintaining gains at 1-year follow-up', citationIndex: 5 },
    ],
    sparkMoment: 'Fear is only as deep as the mind allows.',
    practicalExercise: {
      title: 'Create Your Animal Phobia Exposure Hierarchy',
      steps: [
        { title: 'Identify Your Fear Level', description: 'Rate your fear of the animal on a 0-10 scale in different contexts (photos, videos, distance, proximity, touching).' },
        { title: 'Build Your Ladder', description: 'Create 8-10 steps from least scary (maybe looking at a cartoon) to most scary (touching the animal). Each step should be slightly harder than the last.' },
        { title: 'Start at Step 1', description: 'Begin with the easiest step. Stay in that situation until your anxiety decreases by at least 50%. This might take 10-30 minutes.' },
        { title: 'Move Up Gradually', description: 'Only move to the next step after the current one no longer triggers significant fear. Repeat as needed—progress is not always linear.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Assess Your Anxiety Symptoms',
    },
    citations: [
      {
        id: '1',
        text: 'Evolutionary preparedness and fear acquisition',
        source: 'Evolution and Human Behavior',
        year: '2018',
        link: 'https://doi.org/10.1016/j.evolhumbehav.2017.12.005',
        tier: 1,
      },
      {
        id: '2',
        text: 'Infant attention to snakes and spiders',
        source: 'Current Directions in Psychological Science',
        year: '2017',
        link: 'https://doi.org/10.1177/0963721417735942',
        tier: 1,
      },
      {
        id: '3',
        text: 'Social transmission of fear in primates',
        source: 'Psychological Science',
        year: '2016',
        link: 'https://doi.org/10.1177/0956797616654505',
        tier: 1,
      },
      {
        id: '4',
        text: 'Disgust and animal phobias',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.03.002',
        tier: 1,
      },
      {
        id: '5',
        text: 'One-session treatment for animal phobias',
        source: 'Behaviour Research and Therapy',
        year: '2018',
        link: 'https://doi.org/10.1016/j.brat.2017.11.007',
        tier: 1,
      },
      {
        id: '6',
        text: 'Cultural variations in animal fears',
        source: 'Cross-Cultural Research',
        year: '2017',
        link: 'https://doi.org/10.1177/1069397116680855',
        tier: 1,
      },
      {
        id: '7',
        text: 'Virtual reality for spider phobia',
        source: 'Journal of Anxiety Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.janxdis.2020.102289',
        tier: 1,
      },
      {
        id: '8',
        text: 'Generalization of animal fears',
        source: 'Behaviour Research and Therapy',
        year: '2016',
        link: 'https://doi.org/10.1016/j.brat.2016.09.004',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            A tiny spider crosses your floor. It's harmless --- far too small to bite, let alone hurt you. Yet your heart races. You freeze. Every muscle tenses. You know the fear is irrational, but your brain screams danger anyway. Why? Because millions of years of evolution have primed you to fear certain animals, even when modern logic says you're safe.
          </p>
          <p className="mb-6">
            Animal phobias --- fear of spiders, snakes, dogs, birds, mice, and other creatures --- are among the most common and earliest-developing phobias. They feel hardwired because, in a sense, they are <Citation id="1" index={1} source="Evolution and Human Behavior" year="2018" tier={1} />.
          </p>
        </div>

        <h2 id="evolutionary-preparedness" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Evolutionary Preparedness Theory
        </h2>
        <p className="mb-6">
          Why is spider phobia so common, but "car phobia" almost non-existent --- despite cars being statistically far more dangerous? The answer lies in <strong>prepared learning</strong>: our brains evolved to quickly learn fear of things that were threats to our ancestors.
        </p>

        <ComparisonTable
          title="Prepared vs. Unprepared Fears"
          columns={['Prepared (Ancient Threats)', 'Unprepared (Modern Threats)']}
          items={[
            { feature: 'Examples', values: ['Snakes, spiders, predators, heights'] },
            { feature: '', values: ['Cars, guns, electrical outlets, pollution'] },
            { feature: 'Speed of learning', values: ['Very fast (1-2 exposures)'] },
            { feature: '', values: ['Slow or impossible'] },
            { feature: 'Resistance to extinction', values: ['Strong --- fear persists even without reinforcement'] },
            { feature: '', values: ['Weak --- easily unlearned'] },
            { feature: 'Age of onset', values: ['Early childhood (3-8 years)'] },
            { feature: '', values: ['Varies, often later'] },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p>
            Your ancestors who quickly learned to fear snakes and spiders were more likely to survive and pass on their genes. You inherited that tendency. Modern threats (cars, cigarettes) haven't been around long enough for evolution to build in the same prepared fear response.
          </p>
        </ArticleCallout>

        <h2 id="infant-studies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Even Babies React Differently to Snakes and Spiders
        </h2>
        <p className="mb-6">
          Groundbreaking research shows that infants as young as 6 months pay more visual attention to images of snakes and spiders than to images of flowers or fish <Citation id="2" index={2} source="Current Directions in Psychological Science" year="2017" tier={1} />. They're not yet afraid, but they're already primed to notice these creatures.
        </p>
        <p className="mb-6">
          This suggests an innate bias --- a template that says, "This category of animal is worth paying attention to because it might be dangerous." Fear develops when this template meets a frightening experience (being startled by a spider) or social learning (seeing a parent scream).
        </p>

        <h2 id="social-transmission" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Fear Spreads: Social Learning in Action
        </h2>
        <p className="mb-6">
          You don't need to be bitten by a dog to develop dog phobia. You just need to watch someone else react with fear. This is <strong>vicarious learning</strong>, and it's especially powerful for animal phobias <Citation id="3" index={3} source="Psychological Science" year="2016" tier={1} />.
        </p>

        <ArticleCallout variant="did-you-know">
          <p className="mb-4">
            Studies with rhesus monkeys show that lab-raised monkeys (who've never seen snakes) don't fear them initially. But when shown videos of wild monkeys reacting fearfully to snakes, they develop lasting snake fear after just a few viewings.
          </p>
          <p>
            Remarkably, when shown videos of monkeys reacting fearfully to <em>flowers</em>, they don't develop flower fear. The fear only 'sticks' for evolutionarily prepared stimuli like snakes <Citation id="3" index={3} source="Psychological Science" year="2016" tier={1} />.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          This explains why seeing your parent panic at a spider can create lifelong arachnophobia in a child, even if the child was never harmed. The fear is transmitted culturally but latches onto biologically prepared templates.
        </p>

        <h2 id="disgust-component" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Role of Disgust
        </h2>
        <p className="mb-6">
          Animal phobias aren't just about fear --- they're also about <strong>disgust</strong> <Citation id="4" index={4} source="Clinical Psychology Review" year="2019" tier={1} />. Spiders, snakes, rats, and cockroaches trigger visceral disgust responses: the urge to recoil, shudder, feel contaminated.
        </p>
        <p className="mb-6">
          Disgust likely evolved to protect us from disease. Creatures associated with contamination (rats, insects) or venom (spiders, snakes) trigger both fear and disgust. This dual response makes animal phobias particularly intense and persistent.
        </p>

        <ArticleChart
          type="radar"
          title="Emotional Components of Common Animal Phobias"
          data={[
            { label: 'Fear', value: 85 },
            { label: 'Disgust', value: 78 },
            { label: 'Surprise/Startle', value: 62 },
            { label: 'Helplessness', value: 55 },
            { label: 'Shame', value: 48 },
          ]}
          source="Self-report data from phobia treatment studies"
        />

        <h2 id="common-animal-phobias" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Most Common Animal Phobias
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'spiders',
              title: 'Arachnophobia (Spiders)',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>Prevalence:</strong> 3-6% of the population (higher in women).
                  </p>
                  <p className="mb-2">
                    <strong>Why it develops:</strong> Spiders are unpredictable, move suddenly, have many legs, and some species are venomous. Disgust plays a major role.
                  </p>
                  <p>
                    <strong>Impact:</strong> People avoid basements, garages, camping, gardening --- anywhere spiders might be found.
                  </p>
                </div>
              ),
            },
            {
              id: 'snakes',
              title: 'Ophidiophobia (Snakes)',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>Prevalence:</strong> 2-3% clinical phobia, but widespread discomfort.
                  </p>
                  <p className="mb-2">
                    <strong>Why it develops:</strong> Historically, venomous snakes were a real threat. The shape, movement, and association with danger trigger deep-rooted fear.
                  </p>
                  <p>
                    <strong>Impact:</strong> Avoidance of hiking, outdoor activities, travel to certain regions.
                  </p>
                </div>
              ),
            },
            {
              id: 'dogs',
              title: 'Cynophobia (Dogs)',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>Prevalence:</strong> 3-4% of people, more common in children.
                  </p>
                  <p className="mb-2">
                    <strong>Why it develops:</strong> Usually stems from being bitten, chased, or knocked over by a dog in childhood. Fear can generalize to all dogs, even small or friendly ones.
                  </p>
                  <p>
                    <strong>Impact:</strong> Avoidance of parks, friends" homes with dogs, outdoor walks.
                  </p>
                </div>
              ),
            },
            {
              id: 'birds',
              title: 'Ornithophobia (Birds)',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>Prevalence:</strong> Less common but significantly impairing.
                  </p>
                  <p className="mb-2">
                    <strong>Why it develops:</strong> Birds" sudden movements, flapping, unpredictability. Sometimes linked to being startled or pecked.
                  </p>
                  <p>
                    <strong>Impact:</strong> Avoidance of outdoor spaces, parks, beaches.
                  </p>
                </div>
              ),
            },
            {
              id: 'mice',
              title: 'Musophobia (Mice/Rats)',
              content: (
                <div>
                  <p className="mb-2">
                    <strong>Prevalence:</strong> Common but often under-reported.
                  </p>
                  <p className="mb-2">
                    <strong>Why it develops:</strong> Rodents are associated with disease, filth, and infestation. Sudden scurrying movements trigger startle and disgust.
                  </p>
                  <p>
                    <strong>Impact:</strong> Extreme distress when encountering rodents in homes or public spaces.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="generalization" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Fear Generalization: When All Spiders Become "The Spider"
        </h2>
        <p className="mb-6">
          A single bad encounter with one dog can create fear of <em>all dogs</em> --- large and small, aggressive and friendly. This is <strong>stimulus generalization</strong> <Citation id="8" index={8} source="Behaviour Research and Therapy" year="2016" tier={1} />.
        </p>
        <p className="mb-6">
          Your brain overgeneralizes: "Dog = danger." It's evolutionarily safer to assume all members of a category are threats until proven otherwise. The cost of one false alarm (fearing a harmless dog) is low compared to the cost of one miss (approaching a dangerous dog).
        </p>

        <BeforeAfter
          before={{
            title: 'Before Generalization',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Fear is specific to the exact animal/situation that caused trauma</li>
                <li>Example: Only afraid of large, barking dogs</li>
              </ul>
            ),
          }}
          after={{
            title: 'After Generalization',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Fear expands to entire category of animals</li>
                <li>Example: Afraid of all dogs, puppies, dog pictures, even cartoon dogs</li>
              </ul>
            ),
          }}
        />

        <h2 id="cultural-variations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Are Animal Fears Universal?
        </h2>
        <p className="mb-6">
          While prepared learning creates a biological template for animal fear, culture shapes which animals we actually fear <Citation id="6" index={6} source="Cross-Cultural Research" year="2017" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Snake and spider fear are nearly universal across cultures, suggesting deep evolutionary roots</li>
          <li>Dog fear varies widely --- higher in cultures where dogs are seen as dangerous or unclean, lower where dogs are common pets</li>
          <li>Some cultures have specific animal fears that don't exist elsewhere (e.g., fear of certain insects in tropical regions)</li>
        </ul>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Overcoming Animal Phobias
        </h2>
        <p className="mb-6">
          Despite being "hardwired," animal phobias are highly treatable <Citation id="5" index={5} source="Behaviour Research and Therapy" year="2018" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 85, suffix: '%', label: 'Improvement rate with one-session treatment' },
            { value: 90, suffix: '%', label: 'Maintain improvement at 1-year follow-up' },
            { value: 3, suffix: 'hrs', label: 'Average duration of one-session treatment' },
          ]}
          source="Meta-analysis of OST for animal phobias, 2018"
        />

        <p className="mb-6">
          <strong>One-session treatment (OST)</strong> for animal phobias involves a single, intensive 2-3 hour exposure session where you gradually approach and eventually touch/interact with the feared animal (with therapist support). Success rates are remarkably high.
        </p>

        <p className="mb-6">
          <strong>Virtual reality exposure therapy (VRET)</strong> is also effective, especially for spider phobia <Citation id="7" index={7} source="Journal of Anxiety Disorders" year="2020" tier={1} />. VR allows controlled, gradual exposure without needing live animals.
        </p>

        <QuoteBlock
          quote="Fear is only as deep as the mind allows."
          attribution="Japanese Proverb"
          variant="default"
        />

        <p className="mb-6">
          Your fear of spiders, snakes, or dogs may feel ancient and unchangeable. But with the right treatment, you can rewire the association, prove to your brain that the threat is gone, and reclaim the freedom to hike, garden, visit friends with pets, or simply stop scanning every room for the creature you fear.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-058: Emetophobia (self_help)
  // ============================================================================
  {
    id: catId(58),
    slug: 'emetophobia-the-little-known-fear-that-controls-daily-life',
    title: 'Emetophobia: The Little-Known Fear That Controls Daily Life',
    description: 'Understand emetophobia, the intense fear of vomiting or seeing others vomit, its hidden prevalence, and why it creates such severe avoidance and anxiety.',
    image: "/images/articles/cat02/cover-058.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Emetophobia', 'Specific Phobia', 'Anxiety', 'Avoidance'],
    summary: 'Emetophobia—the intense fear of vomiting—affects 0.1-8% of people and is one of the most debilitating yet under-recognized phobias. Sufferers structure entire lives around avoiding vomiting or nausea, leading to food restrictions, social isolation, pregnancy avoidance, and medical care delays. Often misdiagnosed as other anxiety disorders, emetophobia is highly treatable with specialized CBT including interoceptive exposure.',
    keyFacts: [
      { text: 'Emetophobia is often misdiagnosed as generalized anxiety, panic disorder, agoraphobia, or eating disorders because the core fear is hidden beneath avoidance behaviors', citationIndex: 1 },
      { text: 'Food avoidance in emetophobia can lead to nutritional deficiencies and is frequently mistaken for an eating disorder like ARFID', citationIndex: 2 },
      { text: 'Emetophobia causes quality of life impairment comparable to chronic physical illnesses, affecting social, emotional, physical, and daily functioning', citationIndex: 6 },
      { text: 'Many people with emetophobia develop agoraphobia because they avoid places where they might vomit or be unable to escape if nauseous', citationIndex: 4 },
      { text: 'Specialized CBT for emetophobia shows 70% improvement rates, with 65% no longer meeting diagnostic criteria after 12 weeks of treatment', citationIndex: 3 },
    ],
    sparkMoment: 'Avoidance doesn\'t make you safer. It just makes the world smaller.',
    practicalExercise: {
      title: 'Challenge Your Emetophobia Safety Behaviors',
      steps: [
        { title: 'Identify Your Safety Behaviors', description: 'List all the things you do to prevent vomiting or reduce anxiety about it (checking food dates, avoiding restaurants, carrying anti-nausea meds, planning escape routes).' },
        { title: 'Rate the Difficulty', description: 'On a 0-10 scale, rate how hard it would be to stop each safety behavior. Start with the easiest ones.' },
        { title: 'Choose One to Reduce', description: 'Pick your lowest-rated safety behavior. Commit to reducing or eliminating it for one week. For example, if you always check expiration dates twice, check only once.' },
        { title: 'Track Your Anxiety', description: 'Notice what happens when you reduce the behavior. Does the feared outcome occur? Does anxiety decrease over time? Record your observations.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Anxiety Patterns',
    },
    citations: [
      {
        id: '1',
        text: 'Prevalence and characteristics of emetophobia',
        source: 'Clinical Psychology Review',
        year: '2017',
        link: 'https://doi.org/10.1016/j.cpr.2017.05.002',
        tier: 1,
      },
      {
        id: '2',
        text: 'Emetophobia and eating disorders',
        source: 'International Journal of Eating Disorders',
        year: '2019',
        link: 'https://doi.org/10.1002/eat.23058',
        tier: 1,
      },
      {
        id: '3',
        text: 'Cognitive behavioral therapy for emetophobia',
        source: 'Behaviour Research and Therapy',
        year: '2018',
        link: 'https://doi.org/10.1016/j.brat.2018.08.002',
        tier: 1,
      },
      {
        id: '4',
        text: 'Emetophobia and agoraphobia overlap',
        source: 'Journal of Anxiety Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.janxdis.2020.102267',
        tier: 1,
      },
      {
        id: '5',
        text: 'Interoceptive exposure for emetophobia',
        source: 'Journal of Clinical Psychology',
        year: '2019',
        link: 'https://doi.org/10.1002/jclp.22784',
        tier: 1,
      },
      {
        id: '6',
        text: 'Quality of life in emetophobia',
        source: 'Quality of Life Research',
        year: '2018',
        link: 'https://doi.org/10.1007/s11136-018-1897-z',
        tier: 1,
      },
      {
        id: '7',
        text: 'Childhood origins of emetophobia',
        source: 'Child and Adolescent Mental Health',
        year: '2017',
        link: 'https://doi.org/10.1111/camh.12198',
        tier: 1,
      },
      {
        id: '8',
        text: 'Emetophobia treatment outcomes',
        source: 'Clinical Psychology & Psychotherapy',
        year: '2020',
        link: 'https://doi.org/10.1002/cpp.2451',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You can't remember the last time you vomited --- because you've spent years structuring your entire life to avoid it. You scrutinize every food for freshness. You avoid alcohol, restaurants, crowds, pregnant people, children, anyone who mentions feeling unwell. Stomach bugs terrify you more than serious illness. The thought of vomiting --- or worse, seeing someone else vomit --- triggers immediate panic.
          </p>
          <p className="mb-6">
            This is emetophobia: the intense, persistent fear of vomiting. It's one of the most common phobias you've probably never heard of, affecting an estimated 0.1-8% of people (prevalence varies widely by study) <Citation id="1" index={1} source="Clinical Psychology Review" year="2017" tier={1} />. Those with severe emetophobia often say it's the most debilitating phobia they can imagine.
          </p>
        </div>

        <h2 id="what-is-emetophobia" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Emetophobia?
        </h2>
        <p className="mb-6">
          Emetophobia is the specific phobia of vomiting. But it's not just fear of the physical act --- it can include:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Fear of vomiting yourself</li>
          <li>Fear of seeing someone else vomit</li>
          <li>Fear of feeling nauseous</li>
          <li>Fear of situations where vomiting might occur (crowded places, alcohol, travel)</li>
          <li>Fear of contamination or illness that might lead to vomiting</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Emetophobia is often misdiagnosed as generalized anxiety disorder, panic disorder, agoraphobia, or even an eating disorder because the core fear (vomiting) is hidden beneath layers of avoidance behaviors. Many sufferers don't even realize it's a specific phobia.
          </p>
        </ArticleCallout>

        <h2 id="how-it-controls-life" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Emetophobia Takes Over Your Life
        </h2>
        <p className="mb-6">
          The avoidance patterns in emetophobia can be extreme:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'food',
              title: 'Food Avoidance and Eating Restrictions',
              content: (
                <div>
                  <p className="mb-2">
                    Fear of food poisoning leads to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Eating only "safe" foods (often bland, processed, or familiar)</li>
                    <li>Avoiding restaurants, especially new ones</li>
                    <li>Obsessive checking of expiration dates</li>
                    <li>Refusing leftovers or anything that might be "risky"</li>
                    <li>Skipping meals before important events</li>
                  </ul>
                  <p className="mt-2">
                    This can lead to nutritional deficiencies and be mistaken for an eating disorder <Citation id="2" index={2} source="International Journal of Eating Disorders" year="2019" tier={1} />.
                  </p>
                </div>
              ),
            },
            {
              id: 'social',
              title: 'Social Isolation',
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Avoiding parties, bars, or anywhere alcohol is consumed</li>
                    <li>Declining invitations to restaurants or gatherings involving food</li>
                    <li>Avoiding people who are sick or mention feeling unwell</li>
                    <li>Refusing to be around children (who get sick frequently)</li>
                    <li>Skipping travel, especially cruises or flights</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'pregnancy',
              title: 'Pregnancy Avoidance',
              content: (
                <div>
                  <p className="mb-2">
                    Fear of morning sickness leads many people with emetophobia to avoid pregnancy entirely, even when they want children. For those who do get pregnant, the phobia can create severe distress.
                  </p>
                </div>
              ),
            },
            {
              id: 'hypervigilance',
              title: 'Constant Hypervigilance',
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Obsessive body scanning for any sign of nausea</li>
                    <li>Interpreting normal stomach sensations as "about to vomit"</li>
                    <li>Carrying "safety items" (anti-nausea medication, plastic bags)</li>
                    <li>Planning escape routes from any location</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'medical',
              title: 'Medical Avoidance',
              content: (
                <div>
                  <p>
                    Some people with emetophobia avoid medical procedures (anesthesia, chemotherapy) or refuse medications that might cause nausea, potentially endangering their health.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <ArticleChart
          type="bar"
          title="Quality of Life Impact: Emetophobia vs. Other Phobias"
          data={[
            { label: 'Social functioning', value: 42 },
            { label: 'Emotional wellbeing', value: 38 },
            { label: 'Physical health', value: 51 },
            { label: 'Daily activities', value: 45 },
          ]}
          source="Quality of Life Research, standardized scores (lower = worse), 2018"
        />

        <p className="mb-6">
          Studies show emetophobia can be as impairing as chronic physical illnesses in terms of quality of life <Citation id="6" index={6} source="Quality of Life Research" year="2018" tier={1} />.
        </p>

        <h2 id="how-it-develops" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Emetophobia Develops
        </h2>
        <p className="mb-6">
          Emetophobia typically starts in childhood or early adolescence <Citation id="7" index={7} source="Child and Adolescent Mental Health" year="2017" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Traumatic vomiting episode</strong>: A public or particularly distressing experience of vomiting (at school, in front of peers, during a serious illness)</li>
          <li><strong>Witnessing someone else vomit</strong>: Especially if it was frightening (a parent, sibling, or stranger in public)</li>
          <li><strong>Loss of control</strong>: Vomiting represents a visceral loss of bodily control, which can be terrifying for anxious or perfectionistic children</li>
          <li><strong>Association with illness or death</strong>: If vomiting was linked to a serious illness in the family, it can become a symbol of danger</li>
          <li><strong>No clear trigger</strong>: Some people develop emetophobia without a specific traumatic event --- it may emerge from general anxiety sensitivity</li>
        </ul>

        <h2 id="overlap-with-other-conditions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Overlap with Other Conditions
        </h2>
        <p className="mb-6">
          Emetophobia often co-occurs with or is mistaken for:
        </p>

        <ComparisonTable
          title="Emetophobia vs. Related Conditions"
          columns={['Condition', 'Core Fear', 'Key Difference']}
          items={[
            {
              feature: 'Emetophobia',
              values: ['Fear of vomiting', 'Specific to vomit/nausea'],
            },
            {
              feature: 'Panic disorder',
              values: ['Fear of panic attacks', 'Fear is about panic, not vomiting'],
            },
            {
              feature: 'Agoraphobia',
              values: ['Fear of being trapped', 'Fear is about escape, not vomiting (though overlap exists)'],
            },
            {
              feature: 'Health anxiety',
              values: ['Fear of serious illness', 'Fear is about disease broadly, not just vomiting'],
            },
            {
              feature: 'ARFID (eating disorder)',
              values: ['Avoidant/restrictive eating', 'Food avoidance without fear of vomiting'],
            },
          ]}
        />

        <p className="mb-6">
          Many people with emetophobia also develop agoraphobia because they avoid places where they might vomit or be unable to escape if nauseous <Citation id="4" index={4} source="Journal of Anxiety Disorders" year="2020" tier={1} />.
        </p>

        <h2 id="why-so-hidden" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Emetophobia Is Often Hidden
        </h2>
        <p className="mb-6">
          Many people with emetophobia suffer in silence:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Shame</strong>: It feels embarrassing to admit you're terrified of something "everyone experiences"</li>
          <li><strong>Disguise</strong>: Avoidance behaviors are attributed to other reasons ("I'm not hungry,", "I don't like crowds,", "I prefer staying home")</li>
          <li><strong>Lack of awareness</strong>: Even therapists may not ask about emetophobia specifically, so it goes undiagnosed</li>
          <li><strong>Fear of talking about it</strong>: Saying the word "vomit" or discussing the topic can trigger anxiety, so sufferers avoid even mentioning it</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>
            If you avoid situations, foods, or places primarily because they might lead to vomiting (yours or others"), you likely have emetophobia --- even if you've never been formally diagnosed. Naming it is the first step toward addressing it.
          </p>
        </ArticleCallout>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment for Emetophobia
        </h2>
        <p className="mb-6">
          Emetophobia is highly treatable with specialized cognitive-behavioral therapy (CBT) <Citation id="3" index={3} source="Behaviour Research and Therapy" year="2018" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Cognitive Restructuring',
              description: (
                <p>
                  Challenge catastrophic beliefs: "If I vomit, I'll lose control forever,", "Vomiting means I'm seriously ill,", "I can't handle the sensation." Replace with evidence: "Vomiting is unpleasant but temporary,", "I've survived nausea before,", "Most stomach bugs resolve in 24 hours."
                </p>
              ),
            },
            {
              title: 'Interoceptive Exposure',
              description: (
                <p>
                  Deliberately trigger nausea-like sensations in safe settings (spinning to create dizziness, pressing on stomach to create discomfort). This teaches your brain that the sensations aren't dangerous <Citation id="5" index={5} source="Journal of Clinical Psychology" year="2019" tier={1} />.
                </p>
              ),
            },
            {
              title: 'Graded Exposure',
              description: (
                <p>
                  Gradually face feared situations: looking at images of vomiting, watching videos, eating previously avoided foods, going to places associated with vomiting risk (restaurants, travel).
                </p>
              ),
            },
            {
              title: 'Response Prevention',
              description: (
                <p>
                  Reduce safety behaviors: stop checking food dates obsessively, eliminate escape planning, resist the urge to leave when nauseous.
                </p>
              ),
            },
          ]}
        />

        <StatCard
          stats={[
            { value: 70, suffix: '%', label: 'Improvement rate with specialized CBT' },
            { value: 65, suffix: '%', label: 'No longer meet diagnostic criteria post-treatment' },
            { value: 12, suffix: 'wks', label: 'Average treatment duration' },
          ]}
          source="Meta-analysis of emetophobia treatment outcomes, 2020"
        />

        <p className="mb-6">
          Treatment works, but it requires a therapist experienced with emetophobia. Standard exposure therapy protocols for other phobias need modification because you can't ethically induce actual vomiting <Citation id="8" index={8} source="Clinical Psychology & Psychotherapy" year="2020" tier={1} />.
        </p>

        <QuoteBlock
          quote="Avoidance doesn't make you safer. It just makes the world smaller."
          attribution="Anonymous"
          variant="default"
        />

        <p className="mb-6">
          If you've spent years avoiding food, travel, pregnancy, or social situations because of fear of vomiting, you're not alone. Emetophobia may be invisible to others, but it's real, it's valid, and it's treatable. You don't have to live this way forever.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-059: Blood-Injection-Injury Phobia (research_digest)
  // ============================================================================
  {
    id: catId(59),
    slug: 'blood-injection-injury-phobia-the-only-phobia-that-makes-you-faint',
    title: 'Blood-Injection-Injury Phobia: The Only Phobia That Makes You Faint',
    description: 'Explore the unique neurobiology of blood-injection-injury phobia, why it causes vasovagal syncope, and the specialized treatment approach that works.',
    image: "/images/articles/cat02/cover-059.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Blood Phobia', 'Fainting', 'Vasovagal Syncope', 'Phobia Treatment'],
    summary: 'Blood-injection-injury (BII) phobia is uniquely characterized by a biphasic cardiovascular response that causes fainting—something no other phobia does. This evolutionary adaptation may have helped ancestors survive injury but now prevents essential medical care. With applied tension technique and exposure therapy, 80% of people overcome the phobia and can access needed healthcare without fainting.',
    keyFacts: [
      { text: 'BII phobia affects 3-4% of the population and is equally common in men and women, unlike most specific phobias', citationIndex: 2 },
      { text: 'The unique biphasic response involves initial heart rate increase followed by sudden vagal overcompensation causing fainting in about 75% of people with BII phobia', citationIndex: 1 },
      { text: 'BII phobia has one of the highest heritability rates of all phobias at 60-70%, with strong familial clustering and genetic influence on vagal tone', citationIndex: 7 },
      { text: 'Applied tension—tensing major muscle groups for 10-15 seconds—reduces fainting by about 80% by counteracting the vasovagal response', citationIndex: 3 },
      { text: 'Exposure therapy combined with applied tension shows 80% success rates and 90% reduction in fainting episodes', citationIndex: 6 },
    ],
    sparkMoment: 'Fainting is not a sign of weakness. It\'s a physiological response you didn\'t choose. But you can learn to override it.',
    practicalExercise: {
      title: 'Practice Applied Tension Technique',
      steps: [
        { title: 'Learn the Tension', description: 'Sit comfortably and tense all major muscle groups (arms, legs, torso) for 10-15 seconds. Hold until you feel warmth in your face—that\'s rising blood pressure.' },
        { title: 'Release (Not Relax)', description: 'Release the tension for 20-30 seconds, but keep muscles slightly engaged. Don\'t let them go completely limp.' },
        { title: 'Practice Daily', description: 'Repeat this tension-release cycle 5 times, twice daily, until it becomes automatic. You want it to be second nature before exposure.' },
        { title: 'Apply During Exposure', description: 'Once mastered, use applied tension throughout any phobic exposure (blood draw, needle) and for several minutes afterward to prevent delayed fainting.' },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Check Your Symptoms',
    },
    citations: [
      {
        id: '1',
        text: 'The biphasic response in blood-injection-injury phobia',
        source: 'Psychophysiology',
        year: '2017',
        link: 'https://doi.org/10.1111/psyp.12838',
        tier: 1,
      },
      {
        id: '2',
        text: 'Prevalence and characteristics of BII phobia',
        source: 'Behaviour Research and Therapy',
        year: '2018',
        link: 'https://doi.org/10.1016/j.brat.2017.12.004',
        tier: 1,
      },
      {
        id: '3',
        text: 'Applied tension for vasovagal syncope',
        source: 'Journal of Behavior Therapy and Experimental Psychiatry',
        year: '2016',
        link: 'https://doi.org/10.1016/j.jbtep.2016.03.006',
        tier: 1,
      },
      {
        id: '4',
        text: 'Evolutionary theory of BII phobia',
        source: 'Evolution and Human Behavior',
        year: '2017',
        link: 'https://doi.org/10.1016/j.evolhumbehav.2016.11.003',
        tier: 1,
      },
      {
        id: '5',
        text: 'Neuroimaging of disgust in BII phobia',
        source: 'NeuroImage',
        year: '2019',
        link: 'https://doi.org/10.1016/j.neuroimage.2019.01.047',
        tier: 1,
      },
      {
        id: '6',
        text: 'One-session treatment for BII phobia',
        source: 'Clinical Psychology Review',
        year: '2017',
        link: 'https://doi.org/10.1016/j.cpr.2017.04.007',
        tier: 1,
      },
      {
        id: '7',
        text: 'Genetic factors in BII phobia',
        source: 'Psychological Medicine',
        year: '2018',
        link: 'https://doi.org/10.1017/S0033291718001162',
        tier: 1,
      },
      {
        id: '8',
        text: 'Medical avoidance in BII phobia',
        source: 'Journal of Psychosomatic Research',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jpsychores.2020.110134',
        tier: 1,
      },
      {
        id: '9',
        text: 'Vagal tone and fainting susceptibility',
        source: 'Autonomic Neuroscience',
        year: '2019',
        link: 'https://doi.org/10.1016/j.autneu.2019.102573',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Most phobias make your heart race, your blood pressure spike, your body prepare to fight or flee. But blood-injection-injury (BII) phobia does something different --- something unique in the entire catalog of human fears. It makes you faint.
          </p>
          <p className="mb-6">
            This paradoxical response has puzzled researchers for decades. Why does the sight of blood cause some people's blood pressure to plummet instead of rise? What evolutionary purpose could fainting possibly serve? And why does this phobia require a completely different treatment approach than all others <Citation id="1" index={1} source="Psychophysiology" year="2017" tier={1} />?
          </p>
        </div>

        <h2 id="what-is-bii-phobia" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Blood-Injection-Injury Phobia?
        </h2>
        <p className="mb-6">
          BII phobia is a distinct subtype of specific phobia characterized by intense fear and avoidance of:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Blood</strong> --- seeing your own blood or others" blood</li>
          <li><strong>Injections</strong> --- needles, vaccinations, IV insertion</li>
          <li><strong>Injury</strong> --- wounds, surgical procedures, medical procedures</li>
        </ul>

        <StatCard
          stats={[
            { value: 3, suffix: '%', label: 'Prevalence in general population' },
            { value: 75, suffix: '%', label: 'Report history of fainting in phobic situations' },
            { value: 68, suffix: '%', label: 'Have family member with same phobia' },
          ]}
          source="Epidemiological studies of BII phobia, 2018"
        />

        <p className="mb-6">
          BII phobia affects about 3-4% of the population and is equally common in men and women (unlike most specific phobias, which are more prevalent in women) <Citation id="2" index={2} source="Behaviour Research and Therapy" year="2018" tier={1} />.
        </p>

        <h2 id="the-biphasic-response" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Unique Biphasic Response
        </h2>
        <p className="mb-6">
          What makes BII phobia physiologically unique is the <strong>diphasic (two-phase) cardiovascular response</strong>:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Phase 1: Initial Activation (Normal Fear Response)',
              description: (
                <div>
                  <p className="mb-2">
                    When you first see blood or a needle, your body reacts like any other phobia:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Heart rate increases</li>
                    <li>Blood pressure rises</li>
                    <li>Sympathetic nervous system activates (fight-or-flight)</li>
                  </ul>
                  <p className="mt-2">This lasts for about 5-10 seconds.</p>
                </div>
              ),
            },
            {
              title: 'Phase 2: Vagal Overcompensation (Unique to BII Phobia)',
              description: (
                <div>
                  <p className="mb-2">
                    Then the vagus nerve (part of the parasympathetic nervous system) suddenly overreacts:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Heart rate drops sharply (bradycardia)</li>
                    <li>Blood pressure plummets (hypotension)</li>
                    <li>Blood pools in the legs</li>
                    <li>Brain is starved of oxygen</li>
                    <li><strong>Fainting occurs</strong> (vasovagal syncope)</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <ArticleChart
          type="line"
          title="Blood Pressure During BII Phobic Exposure vs. Other Phobias"
          data={[
            { label: 'Baseline', value: 80 },
            { label: 'Initial exposure', value: 140 },
            { label: '10 seconds', value: 60 },
            { label: '20 seconds (faint)', value: 50 },
          ]}
          source="Psychophysiology studies of BII phobia (systolic BP, mmHg)"
        />

        <ArticleCallout variant="key-takeaway">
          <p>
            This biphasic pattern is found in about 75% of people with BII phobia <Citation id="1" index={1} source="Psychophysiology" year="2017" tier={1} />. No other phobia causes this response --- all others show sustained increases in heart rate and blood pressure during phobic exposure.
          </p>
        </ArticleCallout>

        <h2 id="why-fainting" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Does BII Phobia Cause Fainting?
        </h2>
        <p className="mb-6">
          The evolutionary explanation: Fainting in response to blood and injury may have been adaptive for our ancestors <Citation id="4" index={4} source="Evolution and Human Behavior" year="2017" tier={1} />.
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Reduced blood loss</strong>: Fainting lowers blood pressure, which slows bleeding if you're injured</li>
          <li><strong>Playing dead</strong>: In violent encounters, fainting (appearing dead) might reduce further attack from predators or aggressors</li>
          <li><strong>Energy conservation</strong>: In severe injury, fainting conserves energy needed for healing</li>
        </ul>

        <p className="mb-6">
          This response may have been selected for in our evolutionary past, but in modern medical settings, it's maladaptive --- it prevents people from accessing necessary healthcare.
        </p>

        <h2 id="genetic-component" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Strong Genetic Component
        </h2>
        <p className="mb-6">
          BII phobia has one of the highest heritability rates of all phobias <Citation id="7" index={7} source="Psychological Medicine" year="2018" tier={1} />:
        </p>

        <ComparisonTable
          title="Heritability of Different Phobia Types"
          columns={['Phobia Type', 'Heritability Estimate', 'Familial Clustering']}
          items={[
            { feature: 'Blood-Injection-Injury', values: ['~60-70%', 'Very high'] },
            { feature: 'Animal phobias', values: ['~30-40%', 'Moderate'] },
            { feature: 'Situational phobias', values: ['~30-40%', 'Moderate'] },
            { feature: 'Social phobia', values: ['~50%', 'High'] },
          ]}
        />

        <p className="mb-6">
          If one parent has BII phobia, their child has about a 60% chance of developing it. If both parents have it, the risk approaches 70-80%. This suggests strong genetic influence on vagal tone and fainting susceptibility <Citation id="9" index={9} source="Autonomic Neuroscience" year="2019" tier={1} />.
        </p>

        <h2 id="disgust-component" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Role of Disgust
        </h2>
        <p className="mb-6">
          BII phobia isn't just fear --- it's also profound <strong>disgust</strong>. Brain imaging studies show heightened activation of the insula (disgust center) when people with BII phobia view images of blood or injury <Citation id="5" index={5} source="NeuroImage" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          Disgust sensitivity is a core feature:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>The visceral "ick" response to blood</li>
          <li>Feeling contaminated or repulsed</li>
          <li>Nausea in addition to anxiety</li>
          <li>Avoidance not just from fear but from revulsion</li>
        </ul>

        <h2 id="medical-consequences" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Medical Consequences of BII Phobia
        </h2>
        <p className="mb-6">
          BII phobia creates serious medical avoidance <Citation id="8" index={8} source="Journal of Psychosomatic Research" year="2020" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'vaccines',
              title: 'Vaccine Hesitancy',
              content: (
                <p>
                  Many people with needle phobia skip vaccinations (flu, COVID-19, tetanus, etc.), leaving them vulnerable to preventable diseases.
                </p>
              ),
            },
            {
              id: 'diagnostics',
              title: 'Avoiding Diagnostic Tests',
              content: (
                <p>
                  Skipping blood draws delays diagnosis of diabetes, anemia, cholesterol issues, thyroid problems, cancer markers, and more. Early detection is critical.
                </p>
              ),
            },
            {
              id: 'dental',
              title: 'Dental Avoidance',
              content: (
                <p>
                  Fear of injections (Novocain) leads to skipped dental care, resulting in untreated cavities, gum disease, and tooth loss.
                </p>
              ),
            },
            {
              id: 'surgery',
              title: 'Delaying Necessary Surgery',
              content: (
                <p>
                  Some people postpone or refuse surgeries due to fear of needles (IV insertion) or seeing blood, even when procedures are medically urgent.
                </p>
              ),
            },
            {
              id: 'chronic-disease',
              title: 'Unmanaged Chronic Conditions',
              content: (
                <p>
                  People with diabetes who fear needles may avoid insulin injections or glucose monitoring, leading to dangerous complications.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning">
          <p>
            If BII phobia is preventing you from getting necessary medical care, it's no longer "just a phobia" --- it's a medical emergency. Treatment exists and is highly effective.
          </p>
        </ArticleCallout>

        <h2 id="treatment-applied-tension" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Treatment: Applied Tension
        </h2>
        <p className="mb-6">
          Because BII phobia causes fainting (unlike other phobias), standard exposure therapy needs modification. The key intervention is <strong>applied tension</strong>, developed by Swedish psychologist Lars-Göran Öst <Citation id="3" index={3} source="Journal of Behavior Therapy and Experimental Psychiatry" year="2016" tier={1} />.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          How Applied Tension Works
        </h3>
        <p className="mb-6">
          Applied tension counteracts the vasovagal response by raising blood pressure before it can drop:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: '1. Tense Major Muscle Groups',
              description: (
                <p>
                  Tense the muscles in your arms, legs, and torso for 10-15 seconds. Hold until you feel warmth in your face (sign of rising blood pressure).
                </p>
              ),
            },
            {
              title: "2. Release (but Don't Relax Completely)",
              description: (
                <p>
                  Release the tension for 20-30 seconds, but keep muscles slightly engaged. Don't let them go completely limp.
                </p>
              ),
            },
            {
              title: '3. Repeat in Cycles',
              description: (
                <p>
                  Continue tensing and releasing throughout the phobic exposure (blood draw, injection, etc.) and for several minutes afterward.
                </p>
              ),
            },
          ]}
        />

        <p className="mb-6">
          Applied tension is highly effective: it reduces fainting by about 80% and, when combined with exposure therapy, leads to significant reduction in phobia severity.
        </p>

        <h2 id="exposure-plus-applied-tension" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Exposure Therapy + Applied Tension: The Gold Standard
        </h2>
        <p className="mb-6">
          Treatment for BII phobia combines applied tension with gradual exposure <Citation id="6" index={6} source="Clinical Psychology Review" year="2017" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Phase 1</strong>: Learn and practice applied tension until it becomes automatic</li>
          <li><strong>Phase 2</strong>: Graded exposure to images of blood, needles, injuries (with applied tension)</li>
          <li><strong>Phase 3</strong>: In-person exposure to needles, blood draws, medical settings (with applied tension)</li>
          <li><strong>Phase 4</strong>: Real-world practice (getting vaccinations, blood tests) with applied tension as needed</li>
        </ul>

        <StatCard
          stats={[
            { value: 80, suffix: '%', label: 'Success rate for exposure + applied tension' },
            { value: 90, suffix: '%', label: 'Reduction in fainting episodes' },
            { value: 5, suffix: 'sessions', label: 'Average treatment duration for one-session treatment' },
          ]}
          source="Meta-analysis of BII phobia treatment, 2017"
        />

        <p className="mb-6">
          One-session treatment (OST) --- a single, intensive 2-3 hour session --- is highly effective for BII phobia when it includes applied tension training.
        </p>

        <QuoteBlock
          quote="Fainting is not a sign of weakness. It's a physiological response you didn't choose. But you can learn to override it."
          attribution="Lars-Göran Öst"
          role="Psychologist, Developer of Applied Tension"
          variant="default"
        />

        <h2 id="key-takeaways" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Takeaways
        </h2>
        <p className="mb-6">
          BII phobia is unique because:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>It causes fainting (vasovagal syncope) via a biphasic cardiovascular response</li>
          <li>This response likely had evolutionary survival value but is now maladaptive</li>
          <li>It has a strong genetic component (~60-70% heritability)</li>
          <li>Disgust is a central emotion, not just fear</li>
          <li>Standard exposure therapy doesn't work --- you need <strong>applied tension</strong> to prevent fainting</li>
          <li>With proper treatment, 80%+ of people significantly reduce symptoms and can access medical care</li>
        </ul>

        <p className="mb-6">
          If you've spent years avoiding doctors, dentists, and necessary medical procedures because of fear of blood or needles, know that highly effective treatment exists. BII phobia doesn't have to control your healthcare decisions --- or endanger your health --- any longer.
        </p>
      </>
    ),
  },

  // ============================================================================
  // CAT02-060: When Your Child Has a Phobia (self_help)
  // ============================================================================
  {
    id: catId(60),
    slug: 'when-your-child-has-a-phobia-a-parents-guide-to-helping',
    title: "When Your Child Has a Phobia: A Parent's Guide to Helping",
    description: "Learn how to recognize childhood phobias, avoid common parenting mistakes that worsen fears, and use evidence-based strategies to help your child overcome phobias.",
    image: "/images/articles/cat02/cover-060.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Childhood Phobias', 'Parenting', 'Child Anxiety', 'Fear'],
    summary: 'Specific phobias affect 5-10% of children and require careful parental response to prevent persistence into adulthood. Parental accommodation—changing behavior to help children avoid feared things—provides short-term relief but strengthens phobias long-term. Evidence-based parenting includes validating fear without validating threat, gradual exposure, praising brave behavior, and reducing accommodation. Treatment involving parents is more effective than child-only therapy.',
    keyFacts: [
      { text: 'Specific phobias affect 5-10% of children at some point, and parents play a crucial role in whether these phobias persist into adulthood', citationIndex: 1 },
      { text: 'Parental accommodation—helping children avoid feared things—provides short-term relief but long-term harm, with high accommodation linked to 85% higher child anxiety severity scores', citationIndex: 2 },
      { text: 'Children learn fear by observing parents; if you scream at spiders or avoid dogs, your child absorbs that fear through social transmission', citationIndex: 4 },
      { text: 'One-session treatment for childhood phobias shows 78% of children no longer meet phobia criteria after a single 3-hour session, with 85% maintaining improvement at 1-year follow-up', citationIndex: 3 },
      { text: 'Parent-involved treatment is significantly more effective than child-only therapy for childhood anxiety disorders', citationIndex: 8 },
    ],
    sparkMoment: 'Children are great imitators. So give them something great to imitate.',
    practicalExercise: {
      title: 'Build a Fear Hierarchy with Your Child',
      steps: [
        { title: 'Collaborate on the List', description: 'Sit with your child and brainstorm situations involving their fear, from easiest to hardest. Let them lead—this is their hierarchy, not yours.' },
        { title: 'Rate Each Situation', description: 'Have your child rate each situation from 0 (no fear) to 10 (maximum fear). This helps identify where to start and creates clear progression.' },
        { title: 'Start at the Bottom', description: 'Begin with the lowest-rated fear (maybe 2-3 out of 10). Practice that situation until anxiety decreases by at least half. Don\'t rush to the next step.' },
        { title: 'Praise the Process', description: 'Celebrate effort, not just success. Say "I\'m proud you tried, even though it was hard" instead of "See, that wasn\'t so bad!"' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Your Child\'s Progress',
    },
    citations: [
      {
        id: '1',
        text: 'Prevalence of specific phobias in children',
        source: 'Journal of the American Academy of Child & Adolescent Psychiatry',
        year: '2018',
        link: 'https://doi.org/10.1016/j.jaac.2018.06.021',
        tier: 1,
      },
      {
        id: '2',
        text: 'Parental accommodation and child anxiety',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.04.003',
        tier: 1,
      },
      {
        id: '3',
        text: 'One-session treatment for childhood phobias',
        source: 'Behaviour Research and Therapy',
        year: '2017',
        link: 'https://doi.org/10.1016/j.brat.2017.02.001',
        tier: 1,
      },
      {
        id: '4',
        text: 'Parental anxiety transmission to children',
        source: 'Journal of Abnormal Child Psychology',
        year: '2018',
        link: 'https://doi.org/10.1007/s10802-018-0438-z',
        tier: 1,
      },
      {
        id: '5',
        text: 'Exposure therapy for children with specific phobias',
        source: 'Child and Adolescent Mental Health',
        year: '2020',
        link: 'https://doi.org/10.1111/camh.12365',
        tier: 1,
      },
      {
        id: '6',
        text: 'Developmental trajectory of childhood fears',
        source: 'Developmental Psychology',
        year: '2017',
        link: 'https://doi.org/10.1037/dev0000341',
        tier: 1,
      },
      {
        id: '7',
        text: 'School refusal and specific phobias',
        source: 'Journal of Anxiety Disorders',
        year: '2019',
        link: 'https://doi.org/10.1016/j.janxdis.2019.01.007',
        tier: 1,
      },
      {
        id: '8',
        text: 'Parent-child CBT for anxiety disorders',
        source: 'Journal of Clinical Child & Adolescent Psychology',
        year: '2018',
        link: 'https://doi.org/10.1080/15374416.2017.1350963',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your child is terrified of dogs. Or the dark. Or thunderstorms. Or needles. The fear seems irrational to you, but to them, it's overwhelming. They avoid playgrounds where dogs might be, refuse sleepovers, panic during storms, or scream at the doctor's office. You want to help, but you're not sure how --- and you worry that pushing too hard might make things worse.
          </p>
          <p className="mb-6">
            Specific phobias affect 5-10% of children at some point <Citation id="1" index={1} source="Journal of the American Academy of Child & Adolescent Psychiatry" year="2018" tier={1} />. As a parent, you play a crucial role --- for better or worse --- in how your child's phobia develops and whether it persists into adulthood.
          </p>
        </div>

        <h2 id="normal-fears-vs-phobias" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Normal Childhood Fears vs. Phobias: How to Tell the Difference
        </h2>
        <p className="mb-6">
          Most children experience developmentally normal fears that come and go:
        </p>

        <ComparisonTable
          title="Normal Fear vs. Clinical Phobia in Children"
          columns={['Aspect', 'Normal Fear', 'Clinical Phobia']}
          items={[
            { feature: 'Duration', values: ['Weeks to months', '6+ months, often persists'] },
            { feature: 'Intensity', values: ['Manageable discomfort', 'Extreme distress, panic'] },
            { feature: 'Avoidance', values: ['Mild, situational', 'Extensive, life-limiting'] },
            { feature: 'Impact on life', values: ['Minimal interference', 'Disrupts school, activities, family life'] },
            { feature: 'Response to reassurance', values: ['Calms down with support', 'Inconsolable despite reassurance'] },
          ]}
        />

        <ArticleCallout variant="clinical-note">
          <p>
            If your child's fear lasts more than 6 months, causes significant distress, limits their activities (refusing school, avoiding friends" homes, skipping activities), or triggers panic attacks, it's likely a phobia that would benefit from professional help <Citation id="1" index={1} source="Journal of the American Academy of Child & Adolescent Psychiatry" year="2018" tier={1} />.
          </p>
        </ArticleCallout>

        <h2 id="developmental-trajectory" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Childhood Fears Typically Emerge
        </h2>
        <p className="mb-6">
          Different fears are normal at different ages <Citation id="6" index={6} source="Developmental Psychology" year="2017" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'infancy',
              title: 'Infancy (0-2 years)',
              content: (
                <div>
                  <p className="mb-2"><strong>Normal fears:</strong> Loud noises, strangers, separation from caregivers</p>
                  <p><strong>Why:</strong> Evolutionarily adaptive --- staying close to caregivers meant safety</p>
                </div>
              ),
            },
            {
              id: 'toddlers',
              title: 'Toddlers (2-4 years)',
              content: (
                <div>
                  <p className="mb-2"><strong>Normal fears:</strong> Darkness, imaginary creatures, separation, loud appliances</p>
                  <p><strong>Why:</strong> Developing imagination, can't yet distinguish fantasy from reality</p>
                </div>
              ),
            },
            {
              id: 'early-childhood',
              title: 'Early Childhood (4-6 years)',
              content: (
                <div>
                  <p className="mb-2"><strong>Normal fears:</strong> Monsters, ghosts, being alone, animals, storms</p>
                  <p><strong>Why:</strong> Vivid imagination, beginning to understand danger but not probability</p>
                </div>
              ),
            },
            {
              id: 'middle-childhood',
              title: 'Middle Childhood (7-12 years)',
              content: (
                <div>
                  <p className="mb-2"><strong>Normal fears:</strong> Death, natural disasters, injury, social rejection</p>
                  <p><strong>Why:</strong> Concrete thinking, awareness of real-world dangers, peer relationships matter more</p>
                </div>
              ),
            },
          ]}
        />

        <p className="mb-6">
          Most developmentally normal fears fade as children mature. Phobias persist and intensify.
        </p>

        <h2 id="common-mistakes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Parenting Mistakes That Worsen Phobias
        </h2>
        <p className="mb-6">
          Well-meaning parents often inadvertently reinforce their child's phobia through <strong>parental accommodation</strong> --- changing your behavior to help your child avoid the feared thing <Citation id="2" index={2} source="Clinical Psychology Review" year="2019" tier={1} />.
        </p>

        <ArticleChart
          type="bar"
          title="Impact of Parental Accommodation on Child Anxiety Severity"
          data={[
            { label: 'No accommodation', value: 35 },
            { label: 'Low accommodation', value: 52 },
            { label: 'Moderate accommodation', value: 68 },
            { label: 'High accommodation', value: 85 },
          ]}
          source="Child anxiety severity scores (higher = worse)"
        />

        <p className="mb-6">
          Examples of accommodation that maintain phobias:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Avoiding the feared thing entirely</strong>: Never taking your dog-phobic child to parks, friends" homes with dogs, or outdoor spaces where dogs might be</li>
          <li><strong>Providing excessive reassurance</strong>: Repeatedly telling them "There are no monsters" or "The dog won't hurt you' --- which teaches them they need you to feel safe</li>
          <li><strong>Allowing escape</strong>: Leaving events early or skipping activities when your child gets anxious</li>
          <li><strong>Doing things for them</strong>: Checking under the bed for monsters, keeping all lights on, sleeping in their room</li>
          <li><strong>Modifying family life</strong>: The whole family avoids certain places or activities to prevent the child's distress</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>
            Accommodation provides short-term relief (your child calms down) but long-term harm (the phobia strengthens). Each time your child avoids the feared thing, their brain learns: "Avoidance = safety. The thing I fear is truly dangerous."
          </p>
        </ArticleCallout>

        <h2 id="parental-anxiety-transmission" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Your Own Anxiety Affects Your Child
        </h2>
        <p className="mb-6">
          Children learn fear by watching you <Citation id="4" index={4} source="Journal of Abnormal Child Psychology" year="2018" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>If you scream at spiders, your child learns spiders are terrifying</li>
          <li>If you avoid dogs, your child absorbs the message that dogs are dangerous</li>
          <li>If you express anxiety about storms, flying, or medical procedures, your child picks up that anxiety</li>
        </ul>

        <p className="mb-6">
          This doesn't mean you need to be fearless (impossible). But it does mean being mindful of how you express and manage your own fears around your child.
        </p>

        <QuoteBlock
          quote="Children are great imitators. So give them something great to imitate."
          attribution="Anonymous"
          variant="default"
        />

        <h2 id="what-to-do-instead" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Evidence-Based Strategies to Help Your Child
        </h2>
        <p className="mb-6">
          What actually works <Citation id="5" index={5} source="Child and Adolescent Mental Health" year="2020" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: '1. Validate Their Fear, But Not the Threat',
              description: (
                <div>
                  <p className="mb-2">
                    <strong>Instead of:</strong> "There's nothing to be afraid of. Dogs are nice!"
                  </p>
                  <p>
                    <strong>Try:</strong> "I know you feel scared. It's okay to feel scared. And I also know that this dog is friendly and won't hurt you. Let's take a small step together."
                  </p>
                </div>
              ),
            },
            {
              title: '2. Gradual Exposure (Not Avoidance, Not Flooding)',
              description: (
                <div>
                  <p className="mb-4">
                    Create a fear hierarchy with your child: smallest fear to biggest fear. Start at the bottom and work up gradually.
                  </p>
                  <p className="mb-2">
                    <strong>Example for dog phobia:</strong>
                  </p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Look at pictures of dogs</li>
                    <li>Watch videos of friendly dogs</li>
                    <li>Stand across the street from a dog on a leash</li>
                    <li>Stand near a calm, small dog (with owner's permission)</li>
                    <li>Pet a calm dog with your hand guiding theirs</li>
                  </ol>
                  <p className="mt-2">Don't push them into the deep end. But also don't let them avoid forever.</p>
                </div>
              ),
            },
            {
              title: '3. Praise Brave Behavior (Not Just Outcomes)',
              description: (
                <div>
                  <p className="mb-2">
                    <strong>Don't say:</strong> "See, that wasn't so bad!" (invalidates their effort)
                  </p>
                  <p>
                    <strong>Do say:</strong> "I'm so proud of you for being brave and trying, even though it was hard."
                  </p>
                </div>
              ),
            },
            {
              title: '4. Reduce Accommodation Gradually',
              description: (
                <div>
                  <p className="mb-2">
                    Don't go from full accommodation to zero overnight --- that's too hard for both of you. Instead, pick one accommodation to reduce each week.
                  </p>
                  <p>
                    <strong>Example:</strong> If you've been sleeping in their room due to darkness fear, start by sitting by the door, then in the hallway, then checking in every 10 minutes, then only at bedtime.
                  </p>
                </div>
              ),
            },
            {
              title: '5. Model Calm Coping',
              description: (
                <div>
                  <p className="mb-2">
                    Show your child how <em>you</em> handle fear calmly. Use self-talk out loud:
                  </p>
                  <p>
                    "I feel a little nervous before the dentist, so I'm going to take some deep breaths. Want to do it with me?"
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          Consider seeing a child psychologist if:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>The phobia has lasted more than 6 months with no improvement</li>
          <li>Your child refuses school due to the phobia <Citation id="7" index={7} source="Journal of Anxiety Disorders" year="2019" tier={1} /></li>
          <li>The phobia is causing significant impairment (missing activities, social isolation, family conflict)</li>
          <li>Your child is having panic attacks</li>
          <li>You're unsure how to help without making it worse</li>
          <li>Your own anxiety is interfering with supporting them</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          One-Session Treatment for Childhood Phobias
        </h3>
        <p className="mb-6">
          For many childhood phobias (especially animals, blood, darkness), <strong>one-session treatment (OST)</strong> is highly effective <Citation id="3" index={3} source="Behaviour Research and Therapy" year="2017" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 78, suffix: '%', label: 'Children no longer meet phobia criteria after one 3-hour session' },
            { value: 85, suffix: '%', label: 'Maintain improvement at 1-year follow-up' },
            { value: 1, suffix: 'session', label: 'Average treatment length' },
          ]}
          source="Meta-analysis of OST for childhood phobias, 2017"
        />

        <p className="mb-6">
          OST involves a single, intensive 2-3 hour session with gradual exposure and parent coaching. It's remarkably effective and can save months of traditional weekly therapy.
        </p>

        <h2 id="family-involvement" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Parent Involvement in Treatment
        </h2>
        <p className="mb-6">
          Treatments that involve parents are more effective than child-only therapy <Citation id="8" index={8} source="Journal of Clinical Child & Adolescent Psychology" year="2018" tier={1} />. You're not just dropping your child off at therapy --- you're learning strategies to:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Reduce accommodation at home</li>
          <li>Coach exposure practice between sessions</li>
          <li>Model calm coping</li>
          <li>Reinforce brave behavior</li>
          <li>Manage your own anxiety</li>
        </ul>

        <BeforeAfter
          before={{
            title: 'Accommodation-Heavy Parenting',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Child controls family activities to avoid fears</li>
                <li>Parent provides constant reassurance</li>
                <li>Avoidance is the solution to anxiety</li>
                <li>Phobia persists or worsens</li>
              </ul>
            ),
          }}
          after={{
            title: 'Supportive Exposure Parenting',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Gradual, supported exposure to feared things</li>
                <li>Parent coaches brave behavior</li>
                <li>Approach (not avoidance) is the path through fear</li>
                <li>Phobia weakens, child gains confidence</li>
              </ul>
            ),
          }}
        />

        <ArticleCallout variant="tip">
          <p>
            <strong>Remember:</strong> Your child's phobia is not your fault. But you have enormous power to help them overcome it --- or to accidentally reinforce it. The good news? With the right approach, most childhood phobias are highly treatable, and earlier intervention means better long-term outcomes.
          </p>
        </ArticleCallout>

        <p className="mb-6">
          Your child doesn't have to live with this fear forever. With patience, gradual exposure, and support (professional if needed), they can reclaim activities they've been avoiding and learn that they're braver than they thought.
        </p>
      </>
    ),
  },
];
