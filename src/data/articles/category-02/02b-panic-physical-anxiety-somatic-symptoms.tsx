import React from 'react';
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_ANXIETY_STRESS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
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

// ============================================================================
// Subtopic 2: Panic, Physical Anxiety & Somatic Symptoms | Articles 16-20
// ============================================================================

export const panicPhysicalAnxietyArticlesB: Article[] = [
  // ============================================================================
  // Article 16: The Nervous Stomach
  // ============================================================================
  {
    id: catId(16),
    slug: 'the-nervous-stomach-why-anxiety-targets-your-gut',
    title: 'The Nervous Stomach: Why Anxiety Targets Your Gut',
    description: 'Understand the gut-brain axis, why anxiety causes nausea, diarrhea, and stomach pain, and evidence-based strategies to calm digestive symptoms of anxiety.',
    image: "/images/articles/cat02/cover-016.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Gut-Brain Axis', 'Physical Symptoms', 'IBS', 'Anxiety Management'],
    citations: [
      {
        id: '1',
        text: 'The gut-brain axis: Interactions between enteric microbiota, central and enteric nervous systems',
        source: 'Annals of Gastroenterology',
        year: '2020',
        link: 'https://doi.org/10.20524/aog.2020.0476',
        tier: 1,
      },
      {
        id: '2',
        text: 'Anxiety and gastrointestinal illness: The bidirectional gut-brain axis',
        source: 'Gastroenterology Clinics of North America',
        year: '2021',
        link: 'https://doi.org/10.1016/j.gtc.2021.02.005',
        tier: 1,
      },
      {
        id: '3',
        text: 'Irritable bowel syndrome and anxiety disorders: A population-based study',
        source: 'American Journal of Gastroenterology',
        year: '2020',
        link: 'https://doi.org/10.14309/ajg.0000000000000744',
        tier: 1,
      },
      {
        id: '4',
        text: 'Gut-directed hypnotherapy for functional dyspepsia: A systematic review and meta-analysis',
        source: 'Clinical Gastroenterology and Hepatology',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cgh.2021.02.028',
        tier: 1,
      },
      {
        id: '5',
        text: 'The role of the vagus nerve in the gut-brain axis',
        source: 'Frontiers in Neuroscience',
        year: '2020',
        link: 'https://doi.org/10.3389/fnins.2020.00742',
        tier: 1,
      },
      {
        id: '6',
        text: 'Cognitive behavioral therapy for irritable bowel syndrome: A meta-analysis',
        source: 'Journal of Consulting and Clinical Psychology',
        year: '2020',
        link: 'https://doi.org/10.1037/ccp0000595',
        tier: 1,
      },
      {
        id: '7',
        text: 'Stress and the gut microbiome: Linking diet and mental health',
        source: 'Neurogastroenterology & Motility',
        year: '2021',
        link: 'https://doi.org/10.1111/nmo.14105',
        tier: 1,
      },
      {
        id: '8',
        text: 'Functional gastrointestinal disorders and psychiatric comorbidity',
        source: 'World Journal of Gastroenterology',
        year: '2020',
        link: 'https://doi.org/10.3748/wjg.v26.i32.4729',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Before a big presentation, your stomach churns. During a stressful week, you live between the bathroom
            and the couch. When anxiety hits, your gut is often the first to know — and the last to recover. The
            phrase "gut feeling" is more literal than you might think.
          </p>
          <p className="mb-6">
            The connection between your brain and your digestive system is so intimate that your gut is often
            called your "second brain"{', '}
            <Citation id="1" index={1} source="Annals of Gastroenterology" year="2020" tier={1} />. Understanding
            this gut-brain axis explains why anxiety wreaks havoc on your stomach — and what you can do about it.
          </p>
        </div>

        <h2
          id="gut-brain-axis"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Gut-Brain Axis: A Two-Way Highway
        </h2>
        <p className="mb-6">
          Your brain and gut communicate constantly through the <strong>gut-brain axis</strong> — a bidirectional
          communication network involving{', '}
          <Citation id="2" index={2} source="Gastroenterology Clinics of North America" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>The vagus nerve:</strong> A major nerve connecting the brain directly to the digestive tract
          </li>
          <li>
            <strong>Neurotransmitters:</strong> Chemical messengers like serotonin (90% of which is produced in the
            gut)
          </li>
          <li>
            <strong>Hormones:</strong> Stress hormones like cortisol directly affect gut function
          </li>
          <li>
            <strong>Immune system signals:</strong> Gut inflammation can trigger brain changes and vice versa
          </li>
          <li>
            <strong>Gut microbiome:</strong> Trillions of bacteria in your intestines influence mood and stress
            response
          </li>
        </ul>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Brain detects threat',
              description: <p>Amygdala and hypothalamus activate stress response.</p>,
            },
            {
              title: 'Sympathetic activation',
              description: <p>Fight-or-flight system diverts blood and energy away from digestion.</p>,
            },
            {
              title: 'Gut motility changes',
              description: <p>Intestines either speed up (diarrhea) or slow down (constipation).</p>,
            },
            {
              title: 'Increased sensitivity',
              description: <p>Gut nerves become more sensitive to sensations, creating pain or discomfort.</p>,
            },
            {
              title: 'Feedback to brain',
              description: <p>Gut signals travel back to brain, often increasing anxiety.</p>,
            },
          ]}
        />

        <h2
          id="why-anxiety-affects-gut"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Anxiety Affects Your Gut
        </h2>
        <p className="mb-6">
          When you're anxious, your body prioritizes survival over digestion. The sympathetic nervous system
          (fight-or-flight) essentially tells your digestive system: "We don't have time to digest food right now —
          we need to deal with this threat"{', '}
          <Citation id="5" index={3} source="Frontiers in Neuroscience" year="2020" tier={1} />.
        </p>
        <p className="mb-6">This manifests as:</p>

        <ArticleTabs
          tabs={[
            {
              id: 'nausea',
              label: 'Nausea',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Mechanism:</strong> Stomach empties slower, blood flow to stomach decreases, stomach
                    acid production changes.
                  </p>
                  <p className="mb-4">
                    <strong>How it feels:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Queasiness or feeling like you might vomit</li>
                    <li>Loss of appetite</li>
                    <li>Stomach feels "off" or unsettled</li>
                    <li>Worse in the morning or before stressful events</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'diarrhea',
              label: 'Diarrhea',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Mechanism:</strong> Stress hormones speed up intestinal contractions (peristalsis),
                    reducing time for water absorption.
                  </p>
                  <p className="mb-4">
                    <strong>How it feels:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Sudden urgent need to use bathroom</li>
                    <li>Loose or watery stools</li>
                    <li>Cramping before bowel movements</li>
                    <li>Multiple trips to bathroom during anxious periods</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'constipation',
              label: 'Constipation',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Mechanism:</strong> In some people, stress slows gut motility instead of speeding it
                    up.
                  </p>
                  <p className="mb-4">
                    <strong>How it feels:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Difficulty passing stools</li>
                    <li>Bloating and abdominal fullness</li>
                    <li>Hard, dry stools</li>
                    <li>Feeling of incomplete evacuation</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'pain',
              label: 'Abdominal Pain',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Mechanism:</strong> Anxiety increases sensitivity of gut nerves, making normal
                    contractions feel painful.
                  </p>
                  <p className="mb-4">
                    <strong>How it feels:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Cramping or sharp pains in abdomen</li>
                    <li>Dull, constant ache</li>
                    <li>Pain that moves around</li>
                    <li>Relief after bowel movement</li>
                    <li>Worsens with stress, improves during relaxation</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Of IBS patients have anxiety disorder' },
            { value: 40, suffix: '%', label: 'Of anxiety patients report GI symptoms' },
            { value: 3, suffix: 'x', label: 'Higher IBS risk with anxiety disorder' },
          ]}
          source="American Journal of Gastroenterology, 2020"
        />

        <h2
          id="ibs-and-anxiety"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Irritable Bowel Syndrome (IBS) and Anxiety
        </h2>
        <p className="mb-6">
          IBS is a chronic functional gastrointestinal disorder characterized by abdominal pain and altered bowel
          habits (diarrhea, constipation, or both). While IBS is not caused solely by anxiety, the two conditions
          are deeply intertwined{', '}
          <Citation id="3" index={4} source="American Journal of Gastroenterology" year="2020" tier={1} />:
        </p>

        <ComparisonTable
          title="IBS vs. Anxiety-Induced GI Symptoms"
          columns={['Feature', 'IBS', 'Anxiety-Only GI Symptoms']}
          items={[
            {
              feature: 'Duration',
              values: [
                'Chronic (symptoms for 3+ months)',
                'Episodic (during anxiety episodes)',
              ],
            },
            {
              feature: 'Triggers',
              values: [
                'Food, stress, hormones, gut inflammation',
                'Primarily stress and anxiety',
              ],
            },
            {
              feature: 'Pattern',
              values: [
                'Rome IV criteria: pain related to bowel movements, change in frequency or form',
                'May occur without bowel habit changes',
              ],
            },
            {
              feature: 'Treatment response',
              values: [
                'Responds to gut-directed therapies + anxiety treatment',
                'Improves primarily with anxiety treatment',
              ],
            },
          ]}
        />

        <p className="mb-6">Many people have both — anxiety worsens IBS, and IBS symptoms create anxiety about gut function, creating a vicious cycle.</p>

        <h2
          id="strategies-to-calm-gut"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Strategies to Calm Your Anxious Gut
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Gut-Directed Cognitive Behavioral Therapy
        </h3>
        <p className="mb-6">
          CBT adapted for gut symptoms is highly effective for IBS and anxiety-related GI issues{', '}
          <Citation id="6" index={5} source="Journal of Consulting and Clinical Psychology" year="2020" tier={1} />.
          It addresses:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Catastrophic thinking about gut symptoms</li>
          <li>Fear of symptoms leading to avoidance behaviors</li>
          <li>The gut-anxiety cycle</li>
          <li>Stress management and relaxation techniques</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Gut-Directed Hypnotherapy
        </h3>
        <p className="mb-6">
          Hypnotherapy focused on the gut has strong evidence for reducing IBS symptoms{', '}
          <Citation id="4" index={6} source="Clinical Gastroenterology and Hepatology" year="2021" tier={1} />. It
          teaches your unconscious mind to regulate gut function, reduce pain perception, and calm the gut-brain
          connection.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Diaphragmatic Breathing
        </h3>
        <p className="mb-6">
          Deep belly breathing activates the vagus nerve — the main communication line between brain and gut. This
          shifts your nervous system from sympathetic (fight-or-flight) to parasympathetic (rest-and-digest) mode.
        </p>
        <p className="mb-6">
          <strong>Practice:</strong> Place hand on belly, breathe so belly expands (not chest). Breathe in for 4
          counts, out for 6-8 counts. Do this for 5 minutes before meals or when gut symptoms flare.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Dietary Modifications
        </h3>
        <p className="mb-6">While anxiety is the primary driver, some foods can worsen gut symptoms:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Consider limiting:</strong> Caffeine (stimulates gut), high-fat foods (slow digestion), alcohol
            (irritates GI tract), very spicy foods
          </li>
          <li>
            <strong>Low-FODMAP diet:</strong> For IBS, this elimination diet can identify trigger foods (work with a
            dietitian)
          </li>
          <li>
            <strong>Regular meals:</strong> Skipping meals or erratic eating worsens gut symptoms
          </li>
          <li>
            <strong>Fiber balance:</strong> Too little or too much fiber can worsen symptoms; find your optimal level
          </li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          5. Probiotics and Gut Microbiome Support
        </h3>
        <p className="mb-6">
          Emerging research shows gut bacteria influence mood and anxiety through the gut-brain axis{', '}
          <Citation id="7" index={7} source="Neurogastroenterology & Motility" year="2021" tier={1} />. While more
          research is needed, some people find probiotics help with both gut symptoms and anxiety.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          6. Mindfulness and Stress Reduction
        </h3>
        <p className="mb-6">
          Mind-body practices like mindfulness meditation, yoga, and progressive muscle relaxation reduce overall
          stress levels, which translates to calmer gut function.
        </p>

        <ArticleCallout variant="tip" title="The 3-3-3 Grounding Technique for Gut Anxiety">
          <p className="mb-4">When gut symptoms trigger panic about being stuck somewhere without a bathroom:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Name 3 things you can see</li>
            <li>Name 3 sounds you can hear</li>
            <li>Move 3 body parts (wiggle fingers, roll shoulders, tap feet)</li>
          </ol>
          <p className="mt-4">
            This shifts attention from internal sensations (gut distress) to external environment, interrupting the
            anxiety escalation.
          </p>
        </ArticleCallout>

        <h2
          id="when-to-see-doctor"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When to See a Doctor
        </h2>
        <p className="mb-6">
          While anxiety can cause significant GI symptoms, it's important to rule out medical causes{', '}
          <Citation id="8" index={8} source="World Journal of Gastroenterology" year="2020" tier={1} />. See a
          doctor if you have:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Blood in stool</li>
          <li>Unexplained weight loss</li>
          <li>Persistent vomiting</li>
          <li>Difficulty swallowing</li>
          <li>Severe pain that wakes you from sleep</li>
          <li>Symptoms that don't improve with anxiety treatment</li>
          <li>New onset symptoms after age 50</li>
          <li>Family history of colon cancer, IBD, or celiac disease</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            Your "gut feeling" about anxiety is real — because your gut and brain are in constant conversation.
            Anxiety doesn't just live in your head; it manifests throughout your body, with the gut being one of the
            most sensitive barometers of your mental state.
          </p>
          <p>
            The good news: treatments that calm the brain-gut axis — CBT, gut-directed hypnotherapy, breathing
            techniques, and stress management — can significantly reduce both anxiety and digestive symptoms. You
            don't have to live at the mercy of your nervous stomach.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ============================================================================
  // Article 17: Panic Disorder
  // ============================================================================
  {
    id: catId(17),
    slug: 'panic-disorder-when-panic-attacks-become-a-pattern',
    title: 'Panic Disorder: When Panic Attacks Become a Pattern',
    description: 'Learn about panic disorder diagnosis, how it differs from isolated panic attacks, the cycle of fear that maintains it, and evidence-based treatments that offer lasting relief.',
    image: "/images/articles/cat02/cover-017.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 13,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Panic Disorder', 'Panic Attacks', 'CBT', 'Mental Health Conditions'],
    citations: [
      {
        id: '1',
        text: 'Panic disorder: A review of the DSM-5 criteria and current evidence',
        source: 'Psychiatry Research',
        year: '2021',
        link: 'https://doi.org/10.1016/j.psychres.2021.113892',
        tier: 1,
      },
      {
        id: '2',
        text: 'Cognitive behavioral therapy for panic disorder: A meta-analytic review',
        source: 'Journal of Psychiatric Research',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jpsychires.2020.08.032',
        tier: 1,
      },
      {
        id: '3',
        text: 'Interoceptive exposure for panic disorder: A systematic review and meta-analysis',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102015',
        tier: 1,
      },
      {
        id: '4',
        text: 'Pharmacological treatment of panic disorder: Current evidence',
        source: 'Journal of Clinical Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.4088/JCP.20r13396',
        tier: 1,
      },
      {
        id: '5',
        text: 'The neurobiology of panic disorder: Evidence from neuroimaging',
        source: 'Neuroscience & Biobehavioral Reviews',
        year: '2020',
        link: 'https://doi.org/10.1016/j.neubiorev.2020.06.008',
        tier: 1,
      },
      {
        id: '6',
        text: 'Panic disorder and agoraphobia: Diagnostic considerations in DSM-5-TR',
        source: 'American Journal of Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1176/appi.ajp.2021.21020127',
        tier: 1,
      },
      {
        id: '7',
        text: 'Safety behaviors in panic disorder: Impact on treatment outcome',
        source: 'Behaviour Research and Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.brat.2020.103722',
        tier: 1,
      },
      {
        id: '8',
        text: 'Long-term outcomes in cognitive behavioral therapy for panic disorder',
        source: 'Depression and Anxiety',
        year: '2021',
        link: 'https://doi.org/10.1002/da.23142',
        tier: 1,
      },
      {
        id: '9',
        text: 'The fear-of-fear cycle in panic disorder: Cognitive models and clinical implications',
        source: 'Clinical Psychology: Science and Practice',
        year: '2020',
        link: 'https://doi.org/10.1037/cps0000041',
        tier: 1,
      },
      {
        id: '10',
        text: 'Panic-focused psychodynamic psychotherapy: Evidence and clinical practice',
        source: 'Psychodynamic Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1521/pdps.2020.48.2.245',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The first panic attack arrives out of nowhere — a sudden surge of terror so intense you're convinced
            you're dying, having a heart attack, or losing your mind. But panic disorder isn't about that first
            attack. It's about what happens next: the fear of the next attack, the constant vigilance, the
            shrinking world as you avoid situations where panic might strike.
          </p>
          <p className="mb-6">
            Panic disorder transforms panic attacks from isolated events into a pervasive condition dominated by
            anticipatory anxiety and avoidance{', '}
            <Citation id="1" index={1} source="Psychiatry Research" year="2021" tier={1} />. Understanding this
            shift — and the evidence-based treatments that target it — is essential for reclaiming your life.
          </p>
        </div>

        <h2
          id="what-is-panic-disorder"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Panic Disorder?
        </h2>
        <p className="mb-6">
          Panic disorder is diagnosed when someone experiences <strong>recurrent, unexpected panic attacks</strong>{', '}
          followed by at least one month of{', '}
          <Citation id="6" index={2} source="American Journal of Psychiatry" year="2021" tier={1} />:
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>
            <strong>Persistent concern</strong> about having additional panic attacks or their consequences (e.g.,
            "I'm going to have a heart attack,", "I'm going crazy")
          </li>
          <li>
            <strong>Significant maladaptive change in behavior</strong> related to the attacks (e.g., avoiding
            exercise, situations, or places where attacks occurred)
          </li>
        </ol>

        <p className="mb-6">
          <strong>Key word: unexpected.</strong> Panic attacks in panic disorder are not reliably triggered by
          specific situations (that would be a phobia). They feel "out of the blue," which makes them even more
          frightening and harder to predict.
        </p>

        <ComparisonTable
          title="Panic Attack vs. Panic Disorder"
          columns={['Feature', 'Panic Attack (Isolated)', 'Panic Disorder']}
          items={[
            {
              feature: 'Frequency',
              values: [
                'One or occasional attacks',
                'Recurrent attacks (typically multiple per month)',
              ],
            },
            {
              feature: 'Between attacks',
              values: [
                'Life returns to normal',
                'Persistent worry about next attack',
              ],
            },
            {
              feature: 'Behavioral change',
              values: [
                'Minimal or temporary avoidance',
                'Significant avoidance and lifestyle changes',
              ],
            },
            {
              feature: 'Impact',
              values: [
                'Isolated episode, limited lasting effect',
                'Chronic condition affecting daily functioning',
              ],
            },
            {
              feature: 'Treatment needed',
              values: [
                'Often improves with education and stress management',
                'Requires structured treatment (CBT, medication, or both)',
              ],
            },
          ]}
        />

        <StatCard
          stats={[
            { value: 3, suffix: '%', label: 'Lifetime prevalence in US adults' },
            { value: 2, suffix: 'x', label: 'More common in women than men' },
            { value: 45, suffix: '%', label: 'Develop agoraphobia if untreated' },
          ]}
          source="Psychiatry Research, 2021"
        />

        <h2
          id="fear-of-fear"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Fear-of-Fear Cycle
        </h2>
        <p className="mb-6">
          Panic disorder is maintained by a vicious cycle researchers call "fear of fear"{', '}
          <Citation id="9" index={3} source="Clinical Psychology: Science and Practice" year="2020" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Initial panic attack',
              description: <p>First attack occurs (often during stress, but sometimes without obvious trigger).</p>,
            },
            {
              title: 'Catastrophic misinterpretation',
              description: (
                <p>
                  Symptoms (racing heart, breathlessness) are interpreted as signs of imminent death or loss of
                  control.
                </p>
              ),
            },
            {
              title: 'Hypervigilance develops',
              description: (
                <p>
                  Constant monitoring for signs of another attack — checking heart rate, scanning for symptoms,
                  avoiding perceived triggers.
                </p>
              ),
            },
            {
              title: 'Anticipatory anxiety',
              description: (
                <p>
                  Fear about having another panic attack becomes a constant background anxiety, ironically creating
                  the physiological arousal that triggers attacks.
                </p>
              ),
            },
            {
              title: 'Avoidance behaviors',
              description: (
                <p>
                  Avoiding situations where escape would be difficult or help unavailable (crowded places, driving,
                  being alone, exercise).
                </p>
              ),
            },
            {
              title: 'Another panic attack',
              description: (
                <p>
                  The anxiety, hypervigilance, and avoidance create the perfect conditions for another panic
                  episode.
                </p>
              ),
            },
            {
              title: 'Cycle reinforced',
              description: (
                <p>
                  Each attack strengthens the belief that panic is dangerous and unpredictable, deepening the
                  disorder.
                </p>
              ),
            },
          ]}
        />

        <QuoteBlock
          quote="Panic disorder is not the panic itself — it's the fear of the panic. The attacks are time-limited and, while terrifying, not medically dangerous. What disables people is the anticipatory anxiety and the behavioral changes made to avoid panic."
          attribution="Core clinical insight"
          role="Cognitive Model of Panic Disorder"
          variant="large"
        />

        <h2
          id="physical-symptoms"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Physical Symptoms During Panic Attacks
        </h2>
        <p className="mb-6">
          Panic attacks involve at least 4 of the following symptoms, peaking within minutes:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'cardiac',
              title: 'Cardiac symptoms',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Palpitations or pounding heart</li>
                  <li>Rapid heart rate (tachycardia)</li>
                  <li>Chest pain or discomfort</li>
                </ul>
              ),
            },
            {
              id: 'respiratory',
              title: 'Respiratory symptoms',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Shortness of breath or smothering sensation</li>
                  <li>Feeling of choking</li>
                  <li>Hyperventilation</li>
                </ul>
              ),
            },
            {
              id: 'neurological',
              title: 'Neurological symptoms',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Dizziness, lightheadedness, or faintness</li>
                  <li>Trembling or shaking</li>
                  <li>Numbness or tingling (paresthesias)</li>
                </ul>
              ),
            },
            {
              id: 'cognitive',
              title: 'Cognitive/perceptual symptoms',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Derealization (feelings of unreality)</li>
                  <li>Depersonalization (feeling detached from oneself)</li>
                  <li>Fear of losing control or "going crazy"</li>
                  <li>Fear of dying</li>
                </ul>
              ),
            },
            {
              id: 'other',
              title: 'Other physical symptoms',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Sweating</li>
                  <li>Chills or heat sensations</li>
                  <li>Nausea or abdominal distress</li>
                </ul>
              ),
            },
          ]}
        />

        <h2
          id="neurobiology"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Happens in the Brain During Panic
        </h2>
        <p className="mb-6">
          Neuroimaging studies reveal that panic disorder involves dysfunction in brain regions responsible for
          threat detection and fear response{', '}
          <Citation id="5" index={4} source="Neuroscience & Biobehavioral Reviews" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Amygdala hyperactivity:</strong> The brain's alarm system becomes oversensitive, triggering
            panic in response to benign internal sensations
          </li>
          <li>
            <strong>Prefrontal cortex underactivity:</strong> The rational, regulation part of the brain has
            difficulty modulating the fear response
          </li>
          <li>
            <strong>Brainstem sensitivity:</strong> Some people with panic disorder have heightened CO₂ sensitivity,
            triggering panic from minor changes in breathing
          </li>
          <li>
            <strong>Interoceptive network:</strong> Brain regions that process body sensations may be hyperactive,
            amplifying normal sensations
          </li>
        </ul>

        <p className="mb-6">
          These changes are not permanent — treatment, particularly CBT, has been shown to normalize brain activity
          patterns in panic disorder.
        </p>

        <h2
          id="treatment-cbt"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Cognitive Behavioral Therapy for Panic Disorder
        </h2>
        <p className="mb-6">
          CBT is the gold-standard psychological treatment for panic disorder, with remission rates of 40-90% and
          durable long-term outcomes{', '}
          <Citation id="2" index={5} source="Journal of Psychiatric Research" year="2020" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Core Components of CBT for Panic
        </h3>

        <ArticleTabs
          tabs={[
            {
              id: 'psychoeducation',
              label: 'Psychoeducation',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Goal:</strong> Understand what panic attacks are, why they occur, and why they feel
                    dangerous but aren't.
                  </p>
                  <p className="mb-4">
                    <strong>What you learn:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>The physiology of panic (fight-or-flight response)</li>
                    <li>Why symptoms like dizziness and chest pain occur</li>
                    <li>How panic attacks cannot cause heart attacks, fainting, or "going crazy"</li>
                    <li>The fear-of-fear cycle and how it maintains panic disorder</li>
                  </ul>
                  <p className="mt-4">
                    Understanding alone reduces fear and can decrease attack frequency.
                  </p>
                </div>
              ),
            },
            {
              id: 'cognitive-restructuring',
              label: 'Cognitive Restructuring',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Goal:</strong> Identify and challenge catastrophic interpretations of panic symptoms.
                  </p>
                  <p className="mb-4">
                    <strong>Examples:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>
                      <strong>Catastrophic thought:</strong> "My racing heart means I'm having a heart attack."
                    </li>
                    <li>
                      <strong>Evidence check:</strong> "I've had this sensation 50+ times and never had a heart
                      attack. Doctors have cleared me. This is anxiety, not cardiac disease."
                    </li>
                    <li>
                      <strong>Balanced thought:</strong> "My heart is racing because I'm anxious. It feels awful,
                      but it's not dangerous.'
                    </li>
                  </ul>
                  <p>
                    This process weakens the catastrophic interpretation that drives panic escalation.
                  </p>
                </div>
              ),
            },
            {
              id: 'interoceptive-exposure',
              label: 'Interoceptive Exposure',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Goal:</strong> Reduce fear of panic sensations by deliberately inducing them in a safe
                    environment.
                  </p>
                  <p className="mb-4">
                    <strong>How it works:</strong> You learn that the sensations themselves aren't dangerous by
                    experiencing them on purpose and observing that nothing catastrophic happens{', '}
                    <Citation id="3" index={6} source="Clinical Psychology Review" year="2021" tier={1} />.
                  </p>
                  <p className="mb-4">
                    <strong>Exposure exercises:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Hyperventilate for 60 seconds (creates dizziness, tingling)</li>
                    <li>Spin in a chair (creates dizziness)</li>
                    <li>Run in place or climb stairs (creates rapid heartbeat, breathlessness)</li>
                    <li>Breathe through a straw (creates breathlessness)</li>
                    <li>Tense all muscles (creates tension, trembling)</li>
                  </ul>
                  <p className="mt-4">
                    <strong>Outcome:</strong> Panic sensations lose their catastrophic meaning. You learn "I can
                    handle these feelings — they're uncomfortable but not dangerous."
                  </p>
                </div>
              ),
            },
            {
              id: 'situational-exposure',
              label: 'Situational Exposure',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Goal:</strong> Gradually return to avoided situations without using safety behaviors.
                  </p>
                  <p className="mb-4">
                    <strong>Process:</strong> Create a fear hierarchy (list situations from least to most feared),
                    then systematically face each situation starting with the easiest.
                  </p>
                  <p className="mb-4">
                    <strong>Example hierarchy:</strong>
                  </p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Drive alone for 5 minutes in neighborhood (least feared)</li>
                    <li>Drive on highway for 10 minutes with someone else in car</li>
                    <li>Drive on highway alone for 15 minutes</li>
                    <li>Drive on highway alone during rush hour</li>
                    <li>Drive across a long bridge alone (most feared)</li>
                  </ol>
                  <p className="mt-4">
                    <strong>Critical:</strong> No safety behaviors (no phone on dashboard, no planning escape
                    routes). The goal is to learn you can handle panic even if it occurs.
                  </p>
                </div>
              ),
            },
            {
              id: 'breathing-retraining',
              label: 'Breathing Retraining',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Goal:</strong> Correct hyperventilation patterns that worsen panic symptoms.
                  </p>
                  <p className="mb-4">
                    <strong>Technique:</strong> Diaphragmatic breathing at a rate of 10-12 breaths per minute (in
                    for 4, out for 6).
                  </p>
                  <p>
                    <strong>Note:</strong> This is a coping skill, not a safety behavior. The difference: breathing
                    retraining is used to <em>normalize physiology</em>, not to <em>prevent panic</em>. You learn
                    to tolerate panic even without using breathing techniques.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="safety-behaviors"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Safety Behaviors: The Hidden Problem
        </h2>
        <p className="mb-6">
          Safety behaviors are subtle actions taken to prevent panic or reduce its severity. They seem helpful but
          actually maintain panic disorder by preventing you from learning that panic isn't dangerous{', '}
          <Citation id="7" index={7} source="Behaviour Research and Therapy" year="2020" tier={1} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Common Safety Behaviors',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Always carrying water bottle or anxiety medication "just in case"</li>
                <li>Only going places if someone else is with you</li>
                <li>Sitting near exits or avoiding middle seats</li>
                <li>Constantly checking pulse or heart rate</li>
                <li>Carrying phone everywhere, even inside the house</li>
                <li>Avoiding caffeine, exercise, or anything that increases heart rate</li>
                <li>Using distraction or thought suppression to avoid panic</li>
              </ul>
            ),
          }}
          after={{
            title: `Why They're Problematic`,
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Teach your brain: "I only survived because I had my safety net"</li>
                <li>Prevent learning: "I can handle panic even without precautions"</li>
                <li>Maintain belief: "Panic is dangerous and must be avoided"</li>
                <li>Limit life: Can't do things spontaneously or outside comfort zone</li>
                <li>Create dependency: Safety behaviors become compulsive rituals</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6">
          <strong>Treatment involves systematically dropping safety behaviors</strong> — initially anxiety
          increases, but over time you learn that panic is tolerable and self-limiting without them.
        </p>

        <h2
          id="medication"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Medication for Panic Disorder
        </h2>
        <p className="mb-6">
          Several medication classes are effective for panic disorder{', '}
          <Citation id="4" index={8} source="Journal of Clinical Psychiatry" year="2020" tier={1} />:
        </p>

        <ArticleAccordion
          type="single"
          items={[
            {
              id: 'ssri-snri',
              title: 'SSRIs and SNRIs (First-Line)',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Examples:</strong> Sertraline, paroxetine, escitalopram, venlafaxine
                  </p>
                  <p className="mb-4">
                    <strong>How they work:</strong> Increase serotonin (and norepinephrine for SNRIs) to regulate
                    mood and anxiety over time.
                  </p>
                  <p className="mb-4">
                    <strong>Timeline:</strong> Take 4-6 weeks to reach full effect; panic frequency and
                    anticipatory anxiety gradually decrease.
                  </p>
                  <p className="mb-4">
                    <strong>Pros:</strong> Not addictive, treat comorbid depression/anxiety, well-tolerated.
                  </p>
                  <p>
                    <strong>Cons:</strong> Delayed onset, potential side effects (GI upset, sexual dysfunction),
                    symptoms may return if stopped.
                  </p>
                </div>
              ),
            },
            {
              id: 'benzodiazepines',
              title: 'Benzodiazepines (Short-Term or Rescue Use)',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Examples:</strong> Clonazepam, lorazepam, alprazolam
                  </p>
                  <p className="mb-4">
                    <strong>How they work:</strong> Enhance GABA (calming neurotransmitter) for rapid anxiety
                    relief.
                  </p>
                  <p className="mb-4">
                    <strong>Timeline:</strong> Work within 30-60 minutes.
                  </p>
                  <p className="mb-4">
                    <strong>Pros:</strong> Fast-acting, highly effective for acute panic.
                  </p>
                  <p>
                    <strong>Cons:</strong> Risk of tolerance and dependence, withdrawal symptoms, sedation,
                    cognitive impairment. Can become a safety behavior ("I'm only safe if I have my pills"). Best
                    used short-term while starting CBT or SSRI.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <p className="mb-6">
          <strong>CBT vs. Medication:</strong> Both are effective, but CBT has more durable effects{', '}
          <Citation id="8" index={9} source="Depression and Anxiety" year="2021" tier={1} />. Relapse rates are
          lower after CBT than after medication discontinuation. Combination treatment (CBT + SSRI) may be best for
          severe panic disorder.
        </p>

        <h2
          id="other-therapies"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Other Evidence-Based Therapies
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong>Panic-focused psychodynamic psychotherapy (PFPP):</strong> Explores unconscious conflicts and
            relationship patterns underlying panic{', '}
            <Citation id="10" index={10} source="Psychodynamic Psychiatry" year="2020" tier={1} />. Effective for
            some, particularly when panic has relational or trauma roots.
          </li>
          <li>
            <strong>Acceptance and Commitment Therapy (ACT):</strong> Teaches willingness to experience panic
            without fighting it, while committing to valued actions regardless of anxiety.
          </li>
          <li>
            <strong>Mindfulness-based interventions:</strong> Cultivate non-judgmental awareness of panic
            sensations, reducing catastrophic reactivity.
          </li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>The path out of panic disorder:</strong> It's not about never having panic attacks again — it's
            about changing your relationship with panic. When panic loses its catastrophic meaning, when you stop
            avoiding it, when you drop safety behaviors and learn you can handle the sensations — panic loses its
            power.
          </p>
          <p className="mb-4">
            Treatment works. CBT has decades of research showing it helps the majority of people with panic
            disorder achieve remission or significant improvement. The disorder feels permanent when you're in it,
            but it's not. With the right treatment, most people reclaim their lives.
          </p>
          <p>
            The cruel irony: the more you fear panic, the more panic you have. The liberating truth: the less you
            fear it, the less it controls you.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ============================================================================
  // Article 18: Interoception and Anxiety
  // ============================================================================
  {
    id: catId(18),
    slug: 'interoception-and-anxiety-how-body-awareness-can-help-or-hurt',
    title: 'Interoception and Anxiety: How Body Awareness Can Help or Hurt',
    description: 'Explore interoception — your ability to sense internal body states — and learn how it can amplify anxiety or become a powerful tool for emotional regulation.',
    image: "/images/articles/cat02/cover-018.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Interoception', 'Body Awareness', 'Mindfulness', 'Anxiety Research'],
    citations: [
      {
        id: '1',
        text: 'Interoception and mental health: A roadmap',
        source: 'Biological Psychiatry: Cognitive Neuroscience and Neuroimaging',
        year: '2021',
        link: 'https://doi.org/10.1016/j.bpsc.2021.04.011',
        tier: 1,
      },
      {
        id: '2',
        text: 'Interoceptive accuracy in anxiety and depression: A systematic review and meta-analysis',
        source: 'Psychological Medicine',
        year: '2020',
        link: 'https://doi.org/10.1017/S0033291720002883',
        tier: 1,
      },
      {
        id: '3',
        text: 'The neurobiology of interoception in health and disease',
        source: 'Annals of the New York Academy of Sciences',
        year: '2020',
        link: 'https://doi.org/10.1111/nyas.14441',
        tier: 1,
      },
      {
        id: '4',
        text: 'Interoception and anxiety: Mechanisms and clinical implications',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102089',
        tier: 1,
      },
      {
        id: '5',
        text: 'Mindfulness-based interoceptive exposure for panic disorder',
        source: 'Behavior Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.beth.2020.05.008',
        tier: 1,
      },
      {
        id: '6',
        text: 'Interoceptive training for emotional resilience: Theory and evidence',
        source: 'Frontiers in Psychology',
        year: '2021',
        link: 'https://doi.org/10.3389/fpsyg.2021.649856',
        tier: 1,
      },
      {
        id: '7',
        text: 'The role of the insula in interoception and anxiety',
        source: 'Nature Reviews Neuroscience',
        year: '2020',
        link: 'https://doi.org/10.1038/s41583-020-0251-2',
        tier: 1,
      },
      {
        id: '8',
        text: 'Body-scan meditation and interoceptive awareness in anxiety disorders',
        source: 'Mindfulness',
        year: '2020',
        link: 'https://doi.org/10.1007/s12671-020-01436-w',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Right now, without looking down, can you tell if your heart is beating fast or slow? Can you sense the
            subtle sensations in your stomach that signal hunger before it becomes overwhelming? This ability to
            perceive your body's internal signals is called <strong>interoception</strong> — and it's deeply
            connected to anxiety.
          </p>
          <p className="mb-6">
            For people with anxiety disorders, interoception becomes a double-edged sword{', '}
            <Citation id="1" index={1} source="Biological Psychiatry: Cognitive Neuroscience and Neuroimaging" year="2021" tier={1} />.
            Heightened awareness of body sensations can trigger panic. But with the right training, interoception
            can also become a powerful tool for emotional regulation and resilience.
          </p>
        </div>

        <h2
          id="what-is-interoception"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Interoception?
        </h2>
        <p className="mb-6">
          Interoception is your sense of your body's internal state{', '}
          <Citation id="3" index={2} source="Annals of the New York Academy of Sciences" year="2020" tier={1} />.
          It includes awareness of:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Heartbeat and heart rate</li>
          <li>Breathing rate and depth</li>
          <li>Hunger and fullness</li>
          <li>Thirst</li>
          <li>Temperature (feeling hot or cold)</li>
          <li>Pain and discomfort</li>
          <li>Muscle tension</li>
          <li>Bladder and bowel fullness</li>
          <li>Fatigue and energy levels</li>
          <li>Emotions (which have physical components)</li>
        </ul>

        <p className="mb-6">
          Unlike the five traditional senses (sight, hearing, touch, taste, smell), interoception is often
          invisible — you're not consciously aware of most internal signals unless they become strong or you
          deliberately tune in.
        </p>

        <ArticleChart
          type="radar"
          title="Interoception Across Different Body Systems"
          data={[
            { label: 'Cardiac', value: 85 },
            { label: 'Respiratory', value: 75 },
            { label: 'Digestive', value: 60 },
            { label: 'Muscular', value: 70 },
            { label: 'Emotional', value: 80 },
          ]}
          source="Frontiers in Psychology, 2021"
        />

        <h2
          id="interoception-and-anxiety"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Interoception in Anxiety Disorders
        </h2>
        <p className="mb-6">
          Research shows people with anxiety disorders often have altered interoceptive processing{', '}
          <Citation id="2" index={3} source="Psychological Medicine" year="2020" tier={1} />:
        </p>

        <ComparisonTable
          title="Interoceptive Patterns in Anxiety"
          columns={['Dimension', 'Anxiety Pattern', 'Impact']}
          items={[
            {
              feature: 'Accuracy',
              values: [
                'Mixed findings — some higher, some normal',
                'May detect heartbeat better but interpret incorrectly',
              ],
            },
            {
              feature: 'Sensitivity',
              values: [
                'Heightened — notice subtle sensations',
                'Small changes feel significant; hypervigilance',
              ],
            },
            {
              feature: 'Interpretation',
              values: [
                'Catastrophic — sensations mean danger',
                `Normal heartbeat → 'heart attack'; breathlessness → "suffocating`,
              ],
            },
            {
              feature: 'Attention',
              values: [
                'Excessive focus on body sensations',
                'Constant scanning creates more symptoms',
              ],
            },
          ]}
        />

        <p className="mb-6">
          The problem isn't just sensitivity — it's <strong>how sensations are interpreted</strong>. In anxiety,
          normal interoceptive signals trigger catastrophic thoughts, which create more anxiety, which amplifies
          body sensations, creating a vicious cycle.
        </p>

        <h2
          id="the-insula"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Brain's Interoception Hub: The Insula
        </h2>
        <p className="mb-6">
          The <strong>insula</strong> is a brain region deep within the cortex that processes interoceptive signals
          and integrates them with emotions{', '}
          <Citation id="7" index={4} source="Nature Reviews Neuroscience" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          In anxiety disorders, neuroimaging shows <strong>hyperactivity in the insula</strong> — it's working
          overtime, amplifying body signals and their emotional meaning. This explains why people with anxiety:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Notice heartbeat fluctuations that others wouldn't detect</li>
          <li>Experience normal digestion as "something wrong"</li>
          <li>Feel breathless despite adequate oxygen</li>
          <li>Interpret fatigue as a sign of serious illness</li>
        </ul>

        <p className="mb-6">
          The good news: interoceptive training can modulate insula activity and reduce catastrophic interpretations.
        </p>

        <h2
          id="when-interoception-hurts"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When Interoception Amplifies Anxiety
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Baseline heightened sensitivity',
              description: <p>You notice subtle body sensations that others might not detect.</p>,
            },
            {
              title: 'Catastrophic interpretation',
              description: <p>'My heart skipped a beat — something must be wrong with my heart."</p>,
            },
            {
              title: 'Anxiety response',
              description: <p>Fear activates sympathetic nervous system, creating more body sensations.</p>,
            },
            {
              title: 'Hypervigilance',
              description: <p>You begin scanning body for symptoms, amplifying awareness of sensations.</p>,
            },
            {
              title: 'More sensations detected',
              description: (
                <p>
                  Focused attention makes you notice even more signals (tingling, tension, stomach sensations).
                </p>
              ),
            },
            {
              title: 'Panic or health anxiety',
              description: <p>The cycle escalates into panic attacks or chronic health worry.</p>,
            },
          ]}
        />

        <ArticleCallout variant="did-you-know">
          <p>
            Studies using heartbeat perception tasks show that anxiety is associated with <strong>misinterpreting
            </strong> interoceptive signals more than <strong>accurately detecting</strong> them. People with panic
            disorder may think their heart is racing when it's not, or attribute normal heart rate increases to
            danger rather than benign causes like standing up or climbing stairs{', '}
            <Citation id="4" index={5} source="Clinical Psychology Review" year="2021" tier={1} />.
          </p>
        </ArticleCallout>

        <h2
          id="when-interoception-helps"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When Interoception Becomes Helpful
        </h2>
        <p className="mb-6">
          The same interoceptive system that fuels anxiety can, with training, become a source of emotional
          regulation and resilience{', '}
          <Citation id="6" index={6} source="Frontiers in Psychology" year="2021" tier={1} />. The key is learning
          to:
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>
            <strong>Notice sensations without judgment:</strong> "I notice my heart beating faster" (observation)
            vs. "My heart is racing — I'm going to have a heart attack!" (catastrophe)
          </li>
          <li>
            <strong>Recognize emotions through body cues:</strong> Anxiety announces itself through tight chest,
            shallow breathing, stomach tension before you consciously register "I'm anxious"
          </li>
          <li>
            <strong>Respond early:</strong> Catching anxiety at the body level — before full panic — allows
            intervention when it's easier to manage
          </li>
          <li>
            <strong>Use sensations as biofeedback:</strong> Notice when breathing slows or muscles relax, signaling
            that calming techniques are working
          </li>
        </ol>

        <h2
          id="interoceptive-training"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Interoceptive Training for Anxiety
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Mindfulness-Based Interoceptive Exposure
        </h3>
        <p className="mb-6">
          This approach, used in CBT for panic disorder, involves deliberately noticing body sensations with
          non-judgmental awareness{', '}
          <Citation id="5" index={7} source="Behavior Therapy" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Body-scan meditation:</strong> Systematically attend to sensations in each body part, noticing
            without changing or judging
          </li>
          <li>
            <strong>Heartbeat tracking:</strong> Place hand on chest and count heartbeats for 30 seconds, building
            accurate awareness
          </li>
          <li>
            <strong>Breathing awareness:</strong> Notice breath without controlling it — observe rate, depth,
            sensations in chest/belly
          </li>
          <li>
            <strong>Emotion-body mapping:</strong> When anxious, curious, or calm, notice where you feel it in your
            body
          </li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Body-Scan Meditation
        </h3>
        <p className="mb-6">
          Research shows regular body-scan practice improves interoceptive awareness and reduces anxiety symptoms{', '}
          <Citation id="8" index={8} source="Mindfulness" year="2020" tier={1} />.
        </p>

        <ArticleAccordion
          type="single"
          items={[
            {
              id: 'body-scan-guide',
              title: 'Body-Scan Practice Guide',
              content: (
                <div>
                  <ol className="list-decimal pl-5 space-y-3">
                    <li>
                      <strong>Lie down or sit comfortably.</strong> Close eyes or soften gaze.
                    </li>
                    <li>
                      <strong>Start with feet.</strong> Notice sensations in toes, soles, heels. No need to feel
                      anything specific — just observe what's there (tingling, pressure, warmth, nothing).
                    </li>
                    <li>
                      <strong>Move slowly upward:</strong> Ankles → calves → knees → thighs → hips → abdomen →
                      chest → hands → arms → shoulders → neck → face → top of head.
                    </li>
                    <li>
                      <strong>If you notice tension or discomfort:</strong> Breathe into that area, observe without
                      trying to change it.
                    </li>
                    <li>
                      <strong>If mind wanders:</strong> Gently return attention to body sensations.
                    </li>
                    <li>
                      <strong>Duration:</strong> 10-30 minutes. Start short, build up.
                    </li>
                  </ol>
                  <p className="mt-4">
                    <strong>Goal:</strong> Not relaxation (though that may happen), but <em>awareness</em> — learning
                    to observe body sensations without reacting to them.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Reframing Interoceptive Signals
        </h3>
        <p className="mb-6">Practice shifting interpretation of body sensations:</p>

        <BeforeAfter
          before={{
            title: 'Catastrophic Interpretation',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"My heart is racing → I'm having a heart attack"</li>
                <li>"I feel dizzy → I'm going to faint"</li>
                <li>"My stomach hurts → Something is seriously wrong"</li>
                <li>"I can't catch my breath → I'm suffocating"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Neutral/Accurate Interpretation',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"My heart is beating faster → I'm anxious, or I just climbed stairs"</li>
                <li>"I feel dizzy → I stood up quickly, or I'm hyperventilating"</li>
                <li>"My stomach hurts → I'm nervous, or I need to eat"</li>
                <li>"My breathing feels off → I'm breathing too fast; I can slow it down"</li>
              </ul>
            ),
          }}
        />

        <h2
          id="practical-tips"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Practical Tips for Interoceptive Anxiety
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong>Limit body checking:</strong> Resist urge to constantly check pulse, temperature, or scan for
            symptoms. Set limits (e.g., once in morning, once at night).
          </li>
          <li>
            <strong>Diversify attention:</strong> When you notice yourself hyperfocused on internal sensations,
            deliberately shift attention outward (5-4-3-2-1 grounding: 5 things you see, 4 you hear, etc.).
          </li>
          <li>
            <strong>Exercise to increase interoceptive tolerance:</strong> Physical activity creates strong body
            sensations in a context you expect them, reducing fear of similar sensations during anxiety.
          </li>
          <li>
            <strong>Label sensations neutrally:</strong> "I notice tightness in my chest" instead of "Oh no, chest
            pain!"
          </li>
          <li>
            <strong>Practice during calm:</strong> Build interoceptive skills when you're not anxious, so they're
            available when you need them.
          </li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>The paradox of interoception:</strong> In anxiety, heightened body awareness becomes a curse —
            you're too attuned to sensations and interpret them catastrophically. But with training, that same
            heightened awareness becomes a gift: early warning system for emotions, biofeedback for regulation, and
            a pathway to grounding.
          </p>
          <p className="mb-4">
            The difference isn't in <em>how much</em> you feel — it's in <em>how you relate</em> to what you feel.
            Judgment and catastrophizing turn interoception into fuel for anxiety. Curiosity and acceptance turn it
            into information you can use.
          </p>
          <p>
            Your body is always sending signals. Learning to listen without panicking is one of the most powerful
            skills you can develop for managing anxiety.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ============================================================================
  // Article 19: Agoraphobia
  // ============================================================================
  {
    id: catId(19),
    slug: 'agoraphobia-when-the-fear-of-panic-shrinks-your-world',
    title: 'Agoraphobia: When the Fear of Panic Shrinks Your World',
    description: 'Understand agoraphobia — the fear of situations where escape might be difficult — including its connection to panic disorder, how it develops, and exposure-based treatments that work.',
    image: "/images/articles/cat02/cover-019.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 11,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Agoraphobia', 'Panic Disorder', 'Avoidance', 'Exposure Therapy'],
    citations: [
      {
        id: '1',
        text: 'Agoraphobia: Diagnosis, epidemiology, and clinical course',
        source: 'Current Psychiatry Reports',
        year: '2021',
        link: 'https://doi.org/10.1007/s11920-021-01254-6',
        tier: 1,
      },
      {
        id: '2',
        text: 'Cognitive-behavioral therapy for agoraphobia: A systematic review and meta-analysis',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101886',
        tier: 1,
      },
      {
        id: '3',
        text: 'The role of safety behaviors in maintaining agoraphobia',
        source: 'Behaviour Research and Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.brat.2020.103662',
        tier: 1,
      },
      {
        id: '4',
        text: 'Virtual reality exposure therapy for agoraphobia: A randomized controlled trial',
        source: 'Journal of Anxiety Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.janxdis.2021.102409',
        tier: 1,
      },
      {
        id: '5',
        text: 'Agoraphobia without panic disorder: Clinical characteristics and treatment outcomes',
        source: 'Psychiatry Research',
        year: '2020',
        link: 'https://doi.org/10.1016/j.psychres.2020.113214',
        tier: 1,
      },
      {
        id: '6',
        text: 'The neurobiology of agoraphobia: Current understanding and future directions',
        source: 'Neuroscience & Biobehavioral Reviews',
        year: '2021',
        link: 'https://doi.org/10.1016/j.neubiorev.2021.02.015',
        tier: 1,
      },
      {
        id: '7',
        text: 'In vivo versus virtual reality exposure for agoraphobia: Comparative effectiveness',
        source: 'Psychological Medicine',
        year: '2020',
        link: 'https://doi.org/10.1017/S0033291720003463',
        tier: 1,
      },
      {
        id: '8',
        text: 'Pharmacotherapy for agoraphobia: Evidence-based recommendations',
        source: 'CNS Drugs',
        year: '2020',
        link: 'https://doi.org/10.1007/s40263-020-00742-w',
        tier: 1,
      },
      {
        id: '9',
        text: 'The relationship between agoraphobia and quality of life: A systematic review',
        source: 'Quality of Life Research',
        year: '2021',
        link: 'https://doi.org/10.1007/s11136-021-02802-1',
        tier: 1,
      },
      {
        id: '10',
        text: 'Graduated exposure hierarchies for agoraphobia: Clinical guidelines',
        source: 'Behavior Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.beth.2020.03.004',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            It starts small: avoiding the grocery store where you once had a panic attack. Then you skip the highway
            where traffic made you feel trapped. Soon, leaving the house at all feels impossible. What began as fear
            of panic has become fear of the world itself — a condition called <strong>agoraphobia</strong>.
          </p>
          <p className="mb-6">
            Contrary to popular belief, agoraphobia isn't simply "fear of open spaces" or crowds. It's the fear of
            situations where escape might be difficult or help unavailable if panic-like symptoms occur{', '}
            <Citation id="1" index={1} source="Current Psychiatry Reports" year="2021" tier={1} />. Over time, this
            fear shrinks your world — sometimes to the point where home is the only place that feels safe.
          </p>
        </div>

        <h2
          id="what-is-agoraphobia"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Agoraphobia?
        </h2>
        <p className="mb-6">
          Agoraphobia is characterized by intense fear or anxiety about at least two of the following situations:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Using public transportation (buses, trains, planes, boats)</li>
          <li>Being in open spaces (parking lots, marketplaces, bridges)</li>
          <li>Being in enclosed spaces (shops, theaters, cinemas)</li>
          <li>Standing in line or being in a crowd</li>
          <li>Being outside the home alone</li>
        </ul>

        <p className="mb-6">
          The common thread: fear of being unable to escape or get help if panic symptoms, embarrassing symptoms, or
          other incapacitating symptoms occur. These situations are either:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Avoided entirely</strong> (can't go to grocery store, can't drive on highway)
          </li>
          <li>
            <strong>Endured with intense distress</strong> (white-knuckle through situations while panicking)
          </li>
          <li>
            <strong>Require a companion</strong> (can only do things if someone is with you)
          </li>
        </ul>

        <StatCard
          stats={[
            { value: 1.7, suffix: '%', label: '12-month prevalence in US adults' },
            { value: 2, suffix: 'x', label: 'More common in women than men' },
            { value: 50, suffix: '%', label: 'Of panic disorder patients develop agoraphobia' },
          ]}
          source="Current Psychiatry Reports, 2021"
        />

        <h2
          id="agoraphobia-and-panic"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Agoraphobia and Panic Disorder: The Connection
        </h2>
        <p className="mb-6">
          Agoraphobia often — but not always — develops alongside panic disorder. About half of people with panic
          disorder develop agoraphobia if the panic disorder goes untreated.
        </p>

        <ComparisonTable
          title="Agoraphobia With vs. Without Panic Disorder"
          columns={['Feature', 'With Panic Disorder', 'Without Panic Disorder']}
          items={[
            {
              feature: 'Prevalence',
              values: [
                'More common (majority of agoraphobia cases)',
                'Less common but exists',
              ],
            },
            {
              feature: 'Fear focus',
              values: [
                'Fear of having panic attack in situation',
                'Fear of panic-like symptoms (dizziness, diarrhea, fainting) without full panic attacks',
              ],
            },
            {
              feature: 'Course',
              values: [
                'Agoraphobia develops after panic attacks begin',
                'Agoraphobia may be primary concern from onset',
              ],
            },
            {
              feature: 'Treatment emphasis',
              values: [
                'Must treat both panic and avoidance',
                'Focus on exposure to feared situations',
              ],
            },
          ]}
        />

        <p className="mb-6">
          Importantly, you can have agoraphobia without ever having full-blown panic attacks{', '}
          <Citation id="5" index={2} source="Psychiatry Research" year="2020" tier={1} />. Some people fear specific
          symptoms (fainting, losing bladder control, vomiting in public) rather than panic per se.
        </p>

        <h2
          id="how-agoraphobia-develops"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How Agoraphobia Develops
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Initial panic attack or frightening symptoms',
              description: (
                <p>
                  First panic attack or episode of overwhelming symptoms (often in a specific place: grocery store,
                  highway, crowded event).
                </p>
              ),
            },
            {
              title: 'Association forms',
              description: (
                <p>Brain links that location/situation with danger: 'Panic happened there — that place is unsafe.'</p>
              ),
            },
            {
              title: 'Avoidance begins',
              description: (
                <p>
                  To prevent another panic attack, you avoid that specific place. This feels safer and provides
                  short-term relief.
                </p>
              ),
            },
            {
              title: 'Avoidance generalizes',
              description: (
                <p>
                  Fear spreads to similar situations: 'I panicked in a store, so all stores are unsafe. I panicked on
                  a highway, so all highways are unsafe."
                </p>
              ),
            },
            {
              title: 'Safety zone shrinks',
              description: (
                <p>
                  More situations are avoided. Eventually, only home (or only certain rooms) feels safe. Going
                  anywhere else requires companion or safety behaviors.
                </p>
              ),
            },
            {
              title: 'Avoidance reinforced',
              description: (
                <p>
                  Each time you avoid a situation and don't panic, it reinforces belief: "I'm only safe if I avoid."
                  Agoraphobia is now entrenched.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning" title="The Cruel Irony of Avoidance">
          <p className="mb-4">
            Avoidance works brilliantly in the short term — you avoid the store, you don't panic, anxiety decreases.
            Your brain learns: "Avoidance keeps me safe."
          </p>
          <p>
            But long-term, avoidance is the <strong>fuel that maintains agoraphobia</strong>. It prevents you from
            learning that you can handle these situations, that panic passes, and that the situations themselves
            aren't dangerous. The more you avoid, the more your fear grows.
          </p>
        </ArticleCallout>

        <h2
          id="impact-quality-of-life"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Impact on Quality of Life
        </h2>
        <p className="mb-6">
          Agoraphobia can be profoundly disabling{', '}
          <Citation id="9" index={3} source="Quality of Life Research" year="2021" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'work',
              label: 'Work & Education',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Unable to commute to work or school</li>
                  <li>Difficulty attending meetings, conferences, or training</li>
                  <li>Career advancement limited by inability to travel</li>
                  <li>Some people become homebound and unable to work</li>
                </ul>
              ),
            },
            {
              id: 'relationships',
              label: 'Relationships',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Social isolation due to inability to attend gatherings</li>
                  <li>Strain on partners/family who become "safety persons"</li>
                  <li>Difficulty dating or maintaining friendships</li>
                  <li>Embarrassment and shame about limitations</li>
                  <li>Missed life events: weddings, funerals, graduations</li>
                </ul>
              ),
            },
            {
              id: 'daily-life',
              label: 'Daily Functioning',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Difficulty grocery shopping or running errands</li>
                  <li>Avoiding medical appointments (ironically worsening health)</li>
                  <li>Inability to exercise outside home</li>
                  <li>Dependence on others for basic tasks</li>
                  <li>In severe cases: unable to leave house at all</li>
                </ul>
              ),
            },
            {
              id: 'mental-health',
              label: 'Mental Health',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Depression from isolation and loss of independence</li>
                  <li>Low self-esteem and sense of failure</li>
                  <li>Hopelessness about future ("I'll never get better")</li>
                  <li>Increased anxiety from shrinking world</li>
                  <li>Substance use to cope with fear</li>
                </ul>
              ),
            },
          ]}
        />

        <h2
          id="safety-behaviors"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Safety Behaviors in Agoraphobia
        </h2>
        <p className="mb-6">
          When avoidance isn't total, people with agoraphobia often use safety behaviors — subtle actions meant to
          prevent panic{', '}
          <Citation id="3" index={4} source="Behaviour Research and Therapy" year="2020" tier={1} />:
        </p>

        <BeforeAfter
          before={{
            title: 'Common Safety Behaviors',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Only going places with a companion</li>
                <li>Sitting near exits</li>
                <li>Carrying cell phone, water, medication "just in case"</li>
                <li>Mapping escape routes before entering situations</li>
                <li>Limiting time in feared situations ("I'll only stay 10 minutes")</li>
                <li>Using distraction (music, phone) to avoid noticing anxiety</li>
                <li>Only driving in right lane (to exit easily)</li>
                <li>Avoiding certain times (rush hour, weekends)</li>
              </ul>
            ),
          }}
          after={{
            title: 'Why They Maintain the Problem',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Prevent learning: "I can handle this without safety nets"</li>
                <li>Attribute success to behavior, not to your ability: "I only survived because I had my phone"</li>
                <li>Keep fear alive: "If I didn't have my companion, disaster would happen"</li>
                <li>Limit engagement: Can't fully participate in life with one foot out the door</li>
                <li>Become compulsive: Safety behaviors escalate over time</li>
              </ul>
            ),
          }}
        />

        <h2
          id="treatment"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Treatment: Exposure Therapy
        </h2>
        <p className="mb-6">
          The gold-standard treatment for agoraphobia is <strong>exposure therapy</strong>, typically within a CBT
          framework{', '}
          <Citation id="2" index={5} source="Clinical Psychology Review" year="2020" tier={1} />. The principle:
          gradually and systematically face feared situations until anxiety decreases and you learn they're safe.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          How Exposure Therapy Works
        </h3>

        <ol className="list-decimal pl-6 mb-6 space-y-4">
          <li>
            <strong>Create a fear hierarchy:</strong> List feared situations from least to most anxiety-provoking
            (0-100 scale).
          </li>
          <li>
            <strong>Start with easiest item:</strong> Begin exposure at the bottom of the hierarchy, where anxiety is
            manageable (e.g., 30-40/100).
          </li>
          <li>
            <strong>Stay in situation:</strong> Remain in the situation long enough for anxiety to peak and then
            decrease (habituation). Typically 30-90 minutes.
          </li>
          <li>
            <strong>No safety behaviors:</strong> Face the situation without escape routes, companions, or other
            safety nets (this is critical).
          </li>
          <li>
            <strong>Repeat until anxiety drops:</strong> Repeat exposure to same situation until it no longer
            triggers significant anxiety.
          </li>
          <li>
            <strong>Move up hierarchy:</strong> Once a situation is mastered, move to the next level.
          </li>
          <li>
            <strong>Generalize:</strong> Practice in different contexts to ensure learning transfers (different
            stores, different times of day, etc.).
          </li>
        </ol>

        <ArticleAccordion
          type="single"
          items={[
            {
              id: 'example-hierarchy',
              title: 'Example Fear Hierarchy for Agoraphobia',
              content: (
                <div>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      Walk to mailbox at end of driveway alone (anxiety: 30/100)
                    </li>
                    <li>Drive to nearby convenience store at off-peak time (40/100)</li>
                    <li>Walk around the block alone (45/100)</li>
                    <li>Go to small grocery store during quiet hours (50/100)</li>
                    <li>Go to large grocery store during moderate traffic (60/100)</li>
                    <li>Drive on highway for 10 minutes (65/100)</li>
                    <li>Attend a movie at a local theater, sit in middle row (70/100)</li>
                    <li>Go to crowded grocery store on weekend (75/100)</li>
                    <li>Drive on highway during rush hour for 30 minutes (80/100)</li>
                    <li>Attend a concert or crowded event alone (90/100)</li>
                  </ol>
                  <p className="mt-4">
                    <strong>Note:</strong> Hierarchies are personalized — your specific fears determine the steps.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Virtual Reality Exposure Therapy (VRET)
        </h3>
        <p className="mb-6">
          For people with severe agoraphobia who cannot initially tolerate in vivo (real-life) exposure, virtual
          reality offers a middle step{', '}
          <Citation id="4" index={6} source="Journal of Anxiety Disorders" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>VR environments simulate feared situations (crowded mall, subway, highway driving)</li>
          <li>Allows gradual exposure in therapist's office before facing real situations</li>
          <li>Can control intensity and duration precisely</li>
          <li>
            Research shows VRET is effective, though in vivo exposure may be needed for full generalization{', '}
            <Citation id="7" index={7} source="Psychological Medicine" year="2020" tier={1} />
          </li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Medication
        </h3>
        <p className="mb-6">
          Medications can reduce anxiety enough to engage in exposure therapy{', '}
          <Citation id="8" index={8} source="CNS Drugs" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>SSRIs:</strong> First-line pharmacological treatment; reduce panic and anxiety over 4-6 weeks
          </li>
          <li>
            <strong>Benzodiazepines:</strong> Short-term use for acute anxiety, but problematic long-term (tolerance,
            dependence, can become safety behavior)
          </li>
        </ul>
        <p className="mb-6">
          <strong>Best approach:</strong> Medication + CBT exposure therapy. Medication reduces symptoms enough to
          start exposure; therapy provides lasting change.
        </p>

        <h2
          id="self-help-strategies"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Self-Help Strategies for Agoraphobia
        </h2>
        <p className="mb-6">
          While professional treatment is strongly recommended, these strategies can support recovery{', '}
          <Citation id="10" index={9} source="Behavior Therapy" year="2020" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong>Start small:</strong> Don't wait until you feel "ready" — anxiety won't disappear before you
            face it. Start with the easiest exposures.
          </li>
          <li>
            <strong>Be consistent:</strong> Daily or near-daily exposure is more effective than occasional attempts.
          </li>
          <li>
            <strong>Resist reassurance-seeking:</strong> Don't ask 'Will I be okay?" or "Can we leave if I panic?"
            These questions maintain fear.
          </li>
          <li>
            <strong>Celebrate small wins:</strong> Going to the mailbox is progress. Every step forward matters.
          </li>
          <li>
            <strong>Expect setbacks:</strong> Exposure isn't linear. Bad days happen. One setback doesn't erase
            progress.
          </li>
          <li>
            <strong>Join support groups:</strong> Connecting with others who understand agoraphobia reduces isolation
            and provides motivation.
          </li>
          <li>
            <strong>Practice self-compassion:</strong> Agoraphobia isn't weakness or failure. It's a treatable
            condition that developed through understandable mechanisms.
          </li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>The path out of agoraphobia is through it — not around it.</strong> Every avoided situation
            strengthens the fear. Every faced situation weakens it.
          </p>
          <p className="mb-4">
            Agoraphobia feels permanent when you're trapped by it. The world shrinks until home is the only safe
            place, and the idea of going back out seems impossible. But thousands of people have walked this path
            before you — and found their way back.
          </p>
          <p className="mb-4">
            Exposure therapy works{', '}
            <Citation id="2" index={10} source="Clinical Psychology Review" year="2020" tier={1} />. It's hard,
            uncomfortable, and requires courage. But it works. With each step beyond your comfort zone, your world
            expands. Slowly, the fear loses its grip.
          </p>
          <p>
            You're not broken. You're not weak. You're experiencing a treatable condition — and treatment can give
            you your life back.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ============================================================================
  // Article 20: Night Panic
  // ============================================================================
  {
    id: catId(20),
    slug: 'night-panic-why-anxiety-wakes-you-up-and-what-to-do-about-it',
    title: 'Night Panic: Why Anxiety Wakes You Up and What to Do About It',
    description: 'Discover why panic attacks happen during sleep, how nocturnal panic differs from nightmares, and evidence-based strategies to reduce night panic and improve sleep quality.',
    image: "/images/articles/cat02/cover-020.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Night Panic', 'Nocturnal Panic', 'Sleep', 'Panic Disorder'],
    citations: [
      {
        id: '1',
        text: 'Nocturnal panic attacks: Clinical features and sleep architecture',
        source: 'Sleep Medicine Reviews',
        year: '2020',
        link: 'https://doi.org/10.1016/j.smrv.2020.101345',
        tier: 1,
      },
      {
        id: '2',
        text: 'Nocturnal panic attacks and sleep quality in panic disorder',
        source: 'Journal of Clinical Sleep Medicine',
        year: '2021',
        link: 'https://doi.org/10.5664/jcsm.9012',
        tier: 1,
      },
      {
        id: '3',
        text: 'Cognitive behavioral therapy for nocturnal panic: A pilot study',
        source: 'Behaviour Research and Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.brat.2020.103723',
        tier: 1,
      },
      {
        id: '4',
        text: 'Sleep-related panic attacks versus nightmares: Diagnostic differentiation',
        source: 'Sleep',
        year: '2020',
        link: 'https://doi.org/10.1093/sleep/zsaa097',
        tier: 1,
      },
      {
        id: '5',
        text: 'Respiratory physiology during nocturnal panic attacks',
        source: 'Journal of Psychosomatic Research',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jpsychores.2020.110194',
        tier: 1,
      },
      {
        id: '6',
        text: 'Sleep hygiene and anxiety disorders: Evidence-based recommendations',
        source: 'Sleep Medicine Clinics',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jsmc.2021.02.007',
        tier: 2,
      },
      {
        id: '7',
        text: 'Pharmacological treatment of nocturnal panic attacks',
        source: 'Journal of Clinical Psychopharmacology',
        year: '2020',
        link: 'https://doi.org/10.1097/JCP.0000000000001256',
        tier: 1,
      },
      {
        id: '8',
        text: 'The impact of nocturnal panic on daytime anxiety and avoidance',
        source: 'Depression and Anxiety',
        year: '2021',
        link: 'https://doi.org/10.1002/da.23159',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You jolt awake at 3 AM, heart pounding, drenched in sweat, gasping for air. There was no nightmare, no
            loud noise — just sudden, overwhelming terror that pulled you from sleep. This is nocturnal panic, and
            for people who experience it, even sleep feels unsafe.
          </p>
          <p className="mb-6">
            Nocturnal panic attacks — panic attacks that occur during sleep — affect up to 70% of people with panic
            disorder at some point{', '}
            <Citation id="1" index={1} source="Sleep Medicine Reviews" year="2020" tier={1} />. They're terrifying,
            disruptive, and often misunderstood. Understanding why they happen and how to address them can help you
            reclaim your nights.
          </p>
        </div>

        <h2
          id="what-is-nocturnal-panic"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Nocturnal Panic?
        </h2>
        <p className="mb-6">
          Nocturnal panic attacks are panic attacks that occur during sleep, typically during non-REM sleep (stages 2
          or 3){', '}
          <Citation id="2" index={2} source="Journal of Clinical Sleep Medicine" year="2021" tier={1} />. They wake
          you abruptly with symptoms identical to daytime panic attacks:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Rapid, pounding heartbeat</li>
          <li>Shortness of breath or feeling of suffocation</li>
          <li>Chest pain or tightness</li>
          <li>Sweating, chills, or hot flashes</li>
          <li>Trembling or shaking</li>
          <li>Dizziness or lightheadedness</li>
          <li>Fear of dying or losing control</li>
          <li>Derealization or depersonalization</li>
        </ul>

        <p className="mb-6">
          <strong>Key distinction:</strong> You wake up <em>during</em> the panic attack, not after. The attack is
          already in progress when consciousness returns.
        </p>

        <ComparisonTable
          title="Nocturnal Panic vs. Nightmares vs. Night Terrors"
          columns={['Feature', 'Nocturnal Panic', 'Nightmares', 'Night Terrors (Adults)']}
          items={[
            {
              feature: 'Sleep stage',
              values: [
                'Non-REM (stages 2-3)',
                'REM sleep',
                'Non-REM (deep sleep, stage 3)',
              ],
            },
            {
              feature: 'Dream recall',
              values: [
                'No dream; woke up panicking',
                'Vivid, frightening dream recalled',
                'No dream recall; confusion upon waking',
              ],
            },
            {
              feature: 'Awareness upon waking',
              values: [
                'Fully awake and aware of symptoms',
                'Awake, remembers dream',
                'Partial arousal; may not fully wake',
              ],
            },
            {
              feature: 'Duration',
              values: [
                '5-20 minutes typically',
                'Variable (dream length)',
                'Few seconds to minutes',
              ],
            },
            {
              feature: 'Associated condition',
              values: [
                'Panic disorder',
                'PTSD, anxiety, stress',
                'Rare in adults; usually childhood',
              ],
            },
          ]}
        />

        <StatCard
          stats={[
            { value: 44, suffix: '%', label: 'Of panic disorder patients have nocturnal panic' },
            { value: 18, suffix: '%', label: 'Experience panic attacks only at night' },
            { value: 2, suffix: 'x', label: 'Risk of agoraphobia with nocturnal panic' },
          ]}
          source="Sleep Medicine Reviews, 2020"
        />

        <h2
          id="why-nocturnal-panic"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Do Panic Attacks Happen During Sleep?
        </h2>
        <p className="mb-6">
          The exact mechanism isn't fully understood, but several factors contribute{', '}
          <Citation id="5" index={3} source="Journal of Psychosomatic Research" year="2020" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'co2-sensitivity',
              title: '1. CO₂ Sensitivity and Respiratory Changes',
              content: (
                <div>
                  <p className="mb-4">
                    People with panic disorder often have heightened sensitivity to carbon dioxide (CO₂) levels.
                    During sleep, breathing naturally slows and becomes shallower, causing temporary increases in CO₂.
                  </p>
                  <p className="mb-4">
                    In those with panic disorder, this normal CO₂ fluctuation may trigger the brain's suffocation
                    alarm system, initiating a panic response that wakes you gasping for air.
                  </p>
                </div>
              ),
            },
            {
              id: 'autonomic',
              title: '2. Autonomic Nervous System Instability',
              content: (
                <div>
                  <p className="mb-4">
                    During sleep, the autonomic nervous system (which controls automatic functions like heart rate)
                    can have brief surges in sympathetic activity (fight-or-flight).
                  </p>
                  <p className="mb-4">
                    In panic disorder, these normal surges may be misinterpreted as threats, triggering a full panic
                    cascade that rips you from sleep.
                  </p>
                </div>
              ),
            },
            {
              id: 'anticipatory',
              title: '3. Anticipatory Anxiety About Sleep',
              content: (
                <div>
                  <p className="mb-4">
                    Once nocturnal panic has occurred, many people develop fear of sleep itself: "What if I panic
                    again tonight?"
                  </p>
                  <p className="mb-4">
                    This anticipatory anxiety increases physiological arousal at bedtime, creating hypervigilance
                    even during sleep. The heightened arousal makes panic attacks more likely — a self-fulfilling
                    cycle.
                  </p>
                </div>
              ),
            },
            {
              id: 'conditioned',
              title: '4. Conditioned Response to Sleep Environment',
              content: (
                <div>
                  <p>
                    After repeated nocturnal panic attacks, the bed/bedroom can become associated with panic. The
                    brain learns: 'This place is where panic happens," which increases arousal and panic likelihood
                    when in that environment.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="impact"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Impact of Nocturnal Panic
        </h2>
        <p className="mb-6">
          Beyond the terror of the attacks themselves, nocturnal panic creates cascading problems{', '}
          <Citation id="8" index={4} source="Depression and Anxiety" year="2021" tier={1} />:
        </p>

        <BeforeAfter
          before={{
            title: 'Immediate Effects',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Disrupted sleep; difficulty falling back asleep after panic</li>
                <li>Exhaustion and fatigue the next day</li>
                <li>Fear of going to bed (bedtime becomes anxiety-provoking)</li>
                <li>Hypervigilance during sleep, preventing deep rest</li>
                <li>Multiple awakenings per night</li>
              </ul>
            ),
          }}
          after={{
            title: 'Long-Term Consequences',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Chronic sleep deprivation worsening overall anxiety</li>
                <li>Increased daytime panic attacks (fatigue lowers panic threshold)</li>
                <li>Avoidance of sleep situations (staying up late, sleeping with lights on)</li>
                <li>Development of insomnia independent of panic</li>
                <li>Increased risk of depression and health problems</li>
              </ul>
            ),
          }}
        />

        <ArticleCallout variant="clinical-note" title="Nocturnal Panic and Sleep Disorders">
          <p className="mb-4">
            Nocturnal panic should be differentiated from sleep disorders like sleep apnea, which can also cause
            sudden awakenings with breathlessness and pounding heart.
          </p>
          <p>
            If nocturnal panic symptoms are new, or if you snore loudly, gasp during sleep, or have excessive
            daytime sleepiness, a sleep study may be warranted to rule out obstructive sleep apnea{', '}
            <Citation id="4" index={5} source="Sleep" year="2020" tier={1} />.
          </p>
        </ArticleCallout>

        <h2
          id="treatment"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Treatment for Nocturnal Panic
        </h2>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Cognitive Behavioral Therapy (CBT)
        </h3>
        <p className="mb-6">
          CBT for panic disorder is effective for nocturnal panic as well{', '}
          <Citation id="3" index={6} source="Behaviour Research and Therapy" year="2020" tier={1} />. Treatment
          components include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong>Psychoeducation:</strong> Understanding nocturnal panic mechanisms reduces catastrophic
            interpretations ("I'm dying in my sleep")
          </li>
          <li>
            <strong>Cognitive restructuring:</strong> Challenge beliefs like "I can't survive another panic attack"
            or "Sleep is dangerous"
          </li>
          <li>
            <strong>Sleep-focused exposure:</strong> Gradually reclaim healthy sleep habits, facing feared sleep
            situations (sleeping alone, lights off, normal bedtime)
          </li>
          <li>
            <strong>Breathing retraining:</strong> Practice slow, diaphragmatic breathing before bed and upon waking
            from panic
          </li>
          <li>
            <strong>Reducing anticipatory anxiety:</strong> Address worry about nocturnal panic through exposure to
            uncertainty ("What if I panic tonight?" without engaging in safety behaviors)
          </li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Sleep Hygiene
        </h3>
        <p className="mb-6">
          Improving overall sleep quality can reduce nocturnal panic frequency{', '}
          <Citation id="6" index={7} source="Sleep Medicine Clinics" year="2021" tier={2} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'bedtime-routine',
              label: 'Bedtime Routine',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Consistent sleep and wake times (even weekends)</li>
                  <li>Wind-down routine 30-60 minutes before bed (reading, gentle stretching, warm bath)</li>
                  <li>Avoid stimulating activities before bed (work, arguments, intense TV)</li>
                  <li>Dim lights in evening to promote melatonin production</li>
                </ul>
              ),
            },
            {
              id: 'sleep-environment',
              label: 'Sleep Environment',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Cool, dark, quiet bedroom (use blackout curtains, white noise if needed)</li>
                  <li>Comfortable mattress and bedding</li>
                  <li>Remove clock from view (checking time increases anxiety)</li>
                  <li>Use bed only for sleep and intimacy (not work, TV, scrolling)</li>
                </ul>
              ),
            },
            {
              id: 'substances',
              label: 'Substances to Avoid',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Caffeine after 2 PM</li>
                  <li>Alcohol close to bedtime (disrupts sleep architecture)</li>
                  <li>Large meals within 3 hours of bedtime</li>
                  <li>Nicotine (stimulant that disrupts sleep)</li>
                </ul>
              ),
            },
            {
              id: 'daytime',
              label: 'Daytime Habits',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Regular exercise (but not within 3 hours of bedtime)</li>
                  <li>Exposure to natural light during the day (regulates circadian rhythm)</li>
                  <li>Limit daytime naps (or keep them short, before 3 PM)</li>
                  <li>Manage stress throughout the day (don't save all worry for bedtime)</li>
                </ul>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Medication
        </h3>
        <p className="mb-6">
          Medications can reduce nocturnal panic frequency{', '}
          <Citation id="7" index={8} source="Journal of Clinical Psychopharmacology" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>SSRIs:</strong> Reduce overall panic frequency, including nocturnal attacks; take 4-6 weeks for
            full effect
          </li>
          <li>
            <strong>Benzodiazepines:</strong> Can reduce nocturnal panic short-term, but risk of tolerance and
            dependence; not ideal long-term solution
          </li>
          <li>
            <strong>Low-dose tricyclics (e.g., imipramine):</strong> Sometimes used for nocturnal panic when SSRIs
            are ineffective
          </li>
        </ul>

        <h2
          id="what-to-do"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What to Do During a Nocturnal Panic Attack
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: `Recognize it's panic`,
              description: (
                <p>
                  Remind yourself: "This is a panic attack. It's not a heart attack. It will pass." This cognitive
                  label reduces catastrophic thinking.
                </p>
              ),
            },
            {
              title: 'Get out of bed',
              description: (
                <p>
                  Don't stay in bed trying to force sleep. Get up, leave the bedroom. This prevents conditioning
                  your bed as a 'panic place."
                </p>
              ),
            },
            {
              title: 'Do a calming activity',
              description: (
                <p>
                  Gentle stretching, slow breathing, reading something boring, listen to calming music. Avoid
                  screens if possible (blue light disrupts sleep).
                </p>
              ),
            },
            {
              title: 'Slow your breathing',
              description: (
                <p>
                  Breathe in for 4 counts, out for 6-8 counts. This counteracts hyperventilation and activates the
                  parasympathetic nervous system.
                </p>
              ),
            },
            {
              title: 'Return to bed when calm',
              description: (
                <p>
                  Only go back to bed when you feel sleepy and panic has subsided (usually 20-40 minutes). If you
                  can't sleep, repeat the process.
                </p>
              ),
            },
            {
              title: `Don't check the clock`,
              description: (
                <p>
                  Knowing the time creates anxiety about how much sleep you're losing. Ignorance is bliss here.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="self-help-strategies"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Long-Term Self-Help Strategies
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong>Address anticipatory anxiety:</strong> Notice thoughts like "What if I panic tonight?" and
            respond with "If I panic, I've handled it before and I'll handle it again. Worrying about it doesn't
            prevent it.'
          </li>
          <li>
            <strong>Drop safety behaviors:</strong> Avoid sleeping with lights on, phone next to bed, or with doors
            open as "safety measures." These maintain fear of sleep.
          </li>
          <li>
            <strong>Practice relaxation before bed:</strong> Progressive muscle relaxation, body-scan meditation, or
            gentle yoga can reduce physiological arousal at bedtime.
          </li>
          <li>
            <strong>Keep a sleep-panic log:</strong> Track nocturnal panic frequency, triggers, and what helped.
            This provides data and helps identify patterns.
          </li>
          <li>
            <strong>Treat daytime panic:</strong> Reducing overall panic disorder severity often reduces nocturnal
            attacks as well.
          </li>
          <li>
            <strong>Be patient with yourself:</strong> Recovery from nocturnal panic takes time. Bad nights don't
            erase progress.
          </li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Nocturnal panic is frightening precisely because it invades the one place you expect to be
            safe: sleep.</strong> It turns rest into a threat, making every night a potential battleground.
          </p>
          <p className="mb-4">
            But nocturnal panic, like daytime panic, is not dangerous — it's a false alarm. Your body's threat
            detection system is oversensitive, triggering panic where no real danger exists. Understanding this
            doesn't make it less scary in the moment, but it's the foundation for recovery.
          </p>
          <p>
            With treatment — CBT, medication if needed, improved sleep hygiene, and addressing anticipatory
            anxiety — most people with nocturnal panic see significant improvement. You can reclaim your nights.
            Sleep can become safe again.
          </p>
        </ArticleCallout>
      </>
    ),
  },
];
