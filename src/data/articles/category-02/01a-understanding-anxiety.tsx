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
  QuoteBlock,
} from '../../../components/article/blocks';

export const understandingAnxietyArticlesA: Article[] = [
  // ========================================================================
  // Article 1: What Is Anxiety? A Complete Guide to Your Body's Alarm System
  // ========================================================================
  {
    id: catId(1),
    slug: 'what-is-anxiety-complete-guide',
    title: "What Is Anxiety? A Complete Guide to Your Body's Alarm System",
    description: "Discover what anxiety really is, how it works in your brain and body, and why this natural alarm system sometimes goes into overdrive.",
    image: "/images/articles/cat02/cover-001.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anxiety Basics', 'Mental Health Education', 'Stress Response', 'Neuroscience'],
    citations: [
      {
        id: '1',
        text: 'The neurobiology of anxiety disorders: brain imaging, genetics, and psychoneuroendocrinology',
        source: 'Psychiatric Clinics of North America',
        year: '2009',
        link: 'https://doi.org/10.1016/j.psc.2009.05.010',
        tier: 1,
      },
      {
        id: '2',
        text: 'Anxiety Disorders',
        source: 'National Institute of Mental Health',
        year: '2023',
        link: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
        tier: 2,
      },
      {
        id: '3',
        text: 'The neurobiology of the human amygdala in anxiety disorders',
        source: 'Biological Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1016/j.biopsych.2020.06.007',
        tier: 1,
      },
      {
        id: '4',
        text: 'Fight or flight: the sympathetic nervous system',
        source: 'American Physiological Society',
        year: '2018',
        link: 'https://www.aps.org/publications/apsnews/201804/physiology.cfm',
        tier: 2,
      },
      {
        id: '5',
        text: 'The evolution of anxiety: adaptive significance of worry and rumination',
        source: 'Evolutionary Psychology',
        year: '2019',
        link: 'https://doi.org/10.1177/1474704919862641',
        tier: 1,
      },
      {
        id: '6',
        text: 'Cognitive models of generalized anxiety disorder',
        source: 'Psychiatric Clinics',
        year: '2021',
        link: 'https://doi.org/10.1016/j.psc.2021.04.001',
        tier: 1,
      },
      {
        id: '7',
        text: 'The HPA axis and anxiety: novel insights from animal models',
        source: 'Frontiers in Neuroscience',
        year: '2019',
        link: 'https://doi.org/10.3389/fnins.2019.00302',
        tier: 1,
      },
      {
        id: '8',
        text: 'Facts & Statistics: Anxiety and Depression Association of America',
        source: 'ADAA',
        year: '2023',
        link: 'https://adaa.org/understanding-anxiety/facts-statistics',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your heart pounds. Your palms sweat. Your mind races through worst-case scenarios. This is
            anxiety — your body's built-in alarm system doing exactly what it was designed to do. But
            understanding why this happens, and what makes anxiety different from everyday worry, can
            change how you respond to it.
          </p>
          <p className="mb-6">
            Anxiety is one of the most common human experiences, affecting approximately 40 million adults
            in the United States each year{', '}
            <Citation id="2" index={1} source="National Institute of Mental Health" year="2023" tier={2} />.
            Yet despite its prevalence, many people misunderstand what anxiety actually is, why it exists,
            and when it crosses from helpful to harmful.
          </p>
        </div>

        <h2
          id="what-is-anxiety"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Anxiety, Really?
        </h2>
        <p className="mb-6">
          At its core, anxiety is your body's response to perceived threat. It's a complex emotional and
          physiological state that involves your brain, nervous system, and hormones all working together
          to prepare you for danger{', '}
          <Citation id="1" index={2} source="Psychiatric Clinics of North America" year="2009" tier={1} />.
        </p>
        <p className="mb-6">
          When you feel anxious, your amygdala — the brain's threat-detection center — identifies
          something as potentially dangerous and triggers a cascade of responses{', '}
          <Citation id="3" index={3} source="Biological Psychiatry" year="2020" tier={1} />. This includes:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Release of stress hormones like cortisol and adrenaline</li>
          <li>Increased heart rate and blood pressure</li>
          <li>Rapid, shallow breathing</li>
          <li>Muscle tension and heightened alertness</li>
          <li>Redirected blood flow from digestion to major muscle groups</li>
        </ul>

        <StatCard
          stats={[
            { value: 40, suffix: 'M', label: 'U.S. adults affected annually' },
            { value: 31, suffix: '%', label: 'Will experience an anxiety disorder in lifetime' },
            { value: 23, suffix: '%', label: 'With severe impairment' },
          ]}
          source="National Institute of Mental Health, 2023"
        />

        <h2
          id="evolutionary-purpose"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why We Have Anxiety: The Evolutionary Perspective
        </h2>
        <p className="mb-6">
          Anxiety exists for a reason. From an evolutionary standpoint, anxiety is an adaptive mechanism
          that helped our ancestors survive{', '}
          <Citation id="5" index={4} source="Evolutionary Psychology" year="2019" tier={1} />. The ability
          to anticipate danger and prepare for threats kept humans alive in environments where predators,
          hostile tribes, and environmental hazards were constant concerns.
        </p>
        <p className="mb-6">
          The problem is that our modern brains haven't caught up to our modern environment. The same
          alarm system that once protected us from lions now activates for emails from our boss, social
          media notifications, and public speaking. The threat has changed, but the response hasn't.
        </p>

        <ArticleCallout variant="did-you-know" title="The Ancient Alarm System">
          <p>
            Your anxiety response is so ancient that it predates language. The amygdala, your brain's
            threat detector, evolved hundreds of millions of years ago and operates faster than conscious
            thought — which is why you often feel anxious before you know why.
          </p>
        </ArticleCallout>

        <h2
          id="anxiety-vs-fear"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Anxiety vs. Fear: What's the Difference?
        </h2>
        <p className="mb-6">
          While often used interchangeably, anxiety and fear are distinct experiences. Fear is a response
          to an immediate, concrete threat — a car swerving into your lane, a snake on the hiking trail. It
          happens in the present moment and typically resolves when the danger passes.
        </p>
        <p className="mb-6">
          Anxiety, on the other hand, is oriented toward the future. It's apprehension about what might
          happen, often without a specific, identifiable threat{', '}
          <Citation id="6" index={5} source="Psychiatric Clinics" year="2021" tier={1} />. Where fear says
          "there's danger right now," anxiety says "what if something bad happens?"
        </p>

        <ComparisonTable
          title="Fear vs. Anxiety: Key Differences"
          columns={['Feature', 'Fear', 'Anxiety']}
          items={[
            { feature: 'Timing', values: ['Present-focused', 'Future-focused'] },
            { feature: 'Trigger', values: ['Specific, concrete threat', 'Vague or anticipated threat'] },
            { feature: 'Duration', values: ['Brief, ends when threat passes', 'Can persist long-term'] },
            { feature: 'Response', values: ['Fight or flight', 'Worry, avoidance, hypervigilance'] },
            { feature: 'Purpose', values: ['Immediate survival', 'Risk anticipation and preparation'] },
          ]}
        />

        <h2
          id="the-anxiety-response"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Anxiety Response: What Happens in Your Body
        </h2>
        <p className="mb-6">
          When anxiety kicks in, your sympathetic nervous system — the "fight or flight" system — takes
          over{', '}
          <Citation id="4" index={6} source="American Physiological Society" year="2018" tier={2} />. This
          creates a cascade of physical sensations:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'cardiovascular',
              title: 'Cardiovascular Changes',
              content: (
                <p>
                  Your heart beats faster to pump oxygen-rich blood to muscles. Blood pressure rises. You
                  might feel your pulse pounding in your chest, neck, or ears. This is your body preparing
                  to either fight a threat or flee from it.
                </p>
              ),
            },
            {
              id: 'respiratory',
              title: 'Breathing Shifts',
              content: (
                <p>
                  Breathing becomes rapid and shallow to increase oxygen intake. This can lead to
                  hyperventilation, which paradoxically makes you feel short of breath and can cause
                  dizziness, tingling in fingers and toes, and chest tightness.
                </p>
              ),
            },
            {
              id: 'digestive',
              title: 'Digestive Slowdown',
              content: (
                <p>
                  Blood flow diverts away from non-essential functions like digestion, causing that
                  'butterflies in stomach' feeling, nausea, or urgent need to use the bathroom. Your body
                  doesn't prioritize digestion when it thinks you're in danger.
                </p>
              ),
            },
            {
              id: 'muscular',
              title: 'Muscle Tension',
              content: (
                <p>
                  Muscles tense up in preparation for action. Prolonged tension can lead to headaches, jaw
                  clenching, shoulder pain, and overall body aches. This is why chronic anxiety often comes
                  with chronic pain.
                </p>
              ),
            },
            {
              id: 'cognitive',
              title: 'Mental Effects',
              content: (
                <p>
                  Your brain prioritizes threat detection, making it harder to focus on other tasks. Working
                  memory decreases, decision-making becomes difficult, and you might experience racing
                  thoughts or mental blanks.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="when-anxiety-becomes-a-problem"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When Does Anxiety Become a Problem?
        </h2>
        <p className="mb-6">
          Some anxiety is normal and even helpful. Anxiety before a job interview motivates you to prepare.
          Anxiety about a deadline helps you stay focused. The question isn't whether you have anxiety —
          most people do — but whether your anxiety is proportionate to the situation and manageable.
        </p>
        <p className="mb-6">
          Anxiety becomes problematic when it:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Persists without clear reason:</strong> You feel anxious most days for weeks or months
          </li>
          <li>
            <strong>Is disproportionate to the threat:</strong> Your response doesn't match the actual
            danger
          </li>
          <li>
            <strong>Interferes with daily life:</strong> You avoid activities, relationships, or
            responsibilities
          </li>
          <li>
            <strong>Causes significant distress:</strong> The anxiety itself becomes more problematic than
            the situation
          </li>
          <li>
            <strong>Doesn't respond to usual coping:</strong> Strategies that normally help don't work
            anymore
          </li>
        </ul>

        <ArticleCallout variant="warning" title="Red Flags for Clinical Anxiety">
          <p className="mb-4">
            Seek professional help if anxiety is accompanied by panic attacks, avoidance that shrinks your
            world, difficulty functioning at work or school, substance use to cope, or thoughts of
            self-harm.
          </p>
          <p>
            The earlier you address problematic anxiety, the better the outcomes. Anxiety disorders are
            highly treatable with therapy, medication, or both.
          </p>
        </ArticleCallout>

        <h2
          id="types-of-anxiety"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Spectrum of Anxiety Experiences
        </h2>
        <p className="mb-6">
          Anxiety isn't one-size-fits-all. It exists on a spectrum from everyday worry to clinical anxiety
          disorders{', '}
          <Citation id="8" index={7} source="ADAA" year="2023" tier={3} />. Understanding where you fall on
          this spectrum can help you determine what kind of support you need.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Everyday anxiety:</strong> Temporary, situation-specific worry that resolves on its own
          </li>
          <li>
            <strong>High trait anxiety:</strong> A personality characteristic where you generally feel more
            anxious than others
          </li>
          <li>
            <strong>Stress-related anxiety:</strong> Heightened anxiety during difficult life circumstances
          </li>
          <li>
            <strong>Anxiety disorders:</strong> Persistent, excessive anxiety that requires professional
            treatment
          </li>
        </ul>

        <h2
          id="next-steps"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Understanding Is the First Step
        </h2>
        <p className="mb-6">
          Recognizing anxiety for what it is — a natural, evolutionarily adaptive response that sometimes
          misfires in modern contexts — can reduce the shame and confusion many people feel. You're not
          broken. Your alarm system is just overly sensitive.
        </p>
        <p className="mb-6">
          The next steps involve learning to distinguish between helpful anxiety and unhelpful anxiety,
          developing skills to manage the physical and mental components of anxiety, and seeking
          professional support when needed. Anxiety is highly responsive to treatment, and most people see
          significant improvement with the right interventions{', '}
          <Citation id="7" index={8} source="Frontiers in Neuroscience" year="2019" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Remember:</strong> Anxiety isn't your enemy. It's a signal. The goal isn't to eliminate
            anxiety entirely — that's both impossible and undesirable. The goal is to develop a healthier
            relationship with it, so it informs you without controlling you.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ========================================================================
  // Article 2: Normal Worry vs. Anxiety Disorder
  // ========================================================================
  {
    id: catId(2),
    slug: 'normal-worry-vs-anxiety-disorder',
    title: 'Normal Worry vs. Anxiety Disorder: How to Tell the Difference',
    description: "Learn the crucial differences between everyday worry and clinical anxiety disorders, and understand when it's time to seek professional help.",
    image: '/images/articles/cat02/cover-002.svg',
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anxiety Disorders', 'Mental Health Assessment', 'Self-Awareness', 'Clinical Psychology'],
    citations: [
      {
        id: '1',
        text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.books.9780890425787',
        tier: 4,
      },
      {
        id: '2',
        text: 'Generalized Anxiety Disorder: When Worry Gets Out of Control',
        source: 'National Institute of Mental Health',
        year: '2022',
        link: 'https://www.nimh.nih.gov/health/publications/generalized-anxiety-disorder-gad',
        tier: 2,
      },
      {
        id: '3',
        text: 'Distinguishing clinical from nonclinical anxiety in children and adolescents',
        source: 'Journal of Anxiety Disorders',
        year: '2018',
        link: 'https://doi.org/10.1016/j.janxdis.2018.06.007',
        tier: 1,
      },
      {
        id: '4',
        text: 'The worry content questionnaire: discriminating between subclinical and clinical worry',
        source: 'Cognitive Therapy and Research',
        year: '2019',
        link: 'https://doi.org/10.1007/s10608-019-10033-6',
        tier: 1,
      },
      {
        id: '5',
        text: 'Duration and severity of anxiety disorders: results from the WHO World Mental Health Surveys',
        source: 'Depression and Anxiety',
        year: '2020',
        link: 'https://doi.org/10.1002/da.22979',
        tier: 1,
      },
      {
        id: '6',
        text: 'Functional impairment in generalized anxiety disorder: a systematic review',
        source: 'Journal of Affective Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jad.2021.02.019',
        tier: 1,
      },
      {
        id: '7',
        text: 'Intolerance of uncertainty as a contributor to fear and avoidance symptoms',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.04.001',
        tier: 1,
      },
      {
        id: '8',
        text: 'The role of avoidance in anxiety disorders',
        source: 'Behaviour Research and Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.brat.2020.103642',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Everyone worries sometimes. You worry about money, relationships, health, your kids. But how do
            you know if your worry has crossed the line from normal to something that needs professional
            attention? The difference isn't always obvious, but it matters.
          </p>
          <p className="mb-6">
            Anxiety disorders affect 31% of adults at some point in their lives{', '}
            <Citation id="2" index={1} source="National Institute of Mental Health" year="2022" tier={2} />,
            yet many people struggle for years before recognizing that what they're experiencing goes beyond
            typical worry. Understanding the distinction can be the first step toward getting help.
          </p>
        </div>

        <h2
          id="what-is-normal-worry"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Normal Worry Looks Like
        </h2>
        <p className="mb-6">
          Normal worry is a natural part of being human. It's your mind trying to solve problems and
          anticipate challenges. Healthy worry has several characteristics:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Proportionate to the situation:</strong> You worry about things that have real
            consequences
          </li>
          <li>
            <strong>Time-limited:</strong> The worry fades when the situation resolves or when you problem-solve
          </li>
          <li>
            <strong>Manageable:</strong> You can set it aside to focus on other things when needed
          </li>
          <li>
            <strong>Productive:</strong> The worry motivates helpful action rather than paralyzing you
          </li>
          <li>
            <strong>Contextual:</strong> It makes sense given what's happening in your life
          </li>
        </ul>
        <p className="mb-6">
          If you're worried about an upcoming presentation, that's normal worry. If the worry motivates you
          to prepare and then subsides, your anxiety is functioning as it should.
        </p>

        <ArticleCallout variant="tip" title="The Productivity Test">
          <p>
            Ask yourself: Is this worry helping me solve a problem or prepare for something, or is it just
            spinning in circles without resolution? Productive worry leads to action. Unproductive worry
            just creates distress.
          </p>
        </ArticleCallout>

        <h2
          id="anxiety-disorder-markers"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Makes Anxiety a "Disorder"
        </h2>
        <p className="mb-6">
          According to the DSM-5-TR (the diagnostic manual used by mental health professionals), anxiety
          becomes a disorder when it meets specific criteria{', '}
          <Citation id="1" index={2} source="American Psychiatric Association" year="2022" tier={4} />. The
          key factors are:
        </p>

        <ComparisonTable
          title="Normal Worry vs. Clinical Anxiety"
          columns={['Feature', 'Normal Worry', 'Anxiety Disorder']}
          items={[
            {
              feature: 'Duration',
              values: ['Days to weeks', 'Months or years without relief'],
            },
            {
              feature: 'Intensity',
              values: ['Mild to moderate discomfort', 'Severe, overwhelming distress'],
            },
            {
              feature: 'Trigger',
              values: ['Specific, realistic concern', 'Vague threats or excessive response'],
            },
            {
              feature: 'Control',
              values: ['Can redirect attention when needed', 'Difficult or impossible to stop'],
            },
            {
              feature: 'Impact',
              values: ['Minimal life disruption', 'Interferes with work, relationships, daily tasks'],
            },
            {
              feature: 'Physical symptoms',
              values: ['Occasional, mild', 'Frequent, intense, debilitating'],
            },
          ]}
        />

        <h2
          id="the-six-month-rule"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Six-Month Rule and Other Diagnostic Criteria
        </h2>
        <p className="mb-6">
          For Generalized Anxiety Disorder (GAD) — the most common anxiety disorder — the anxiety and worry
          must occur more days than not for at least six months{', '}
          <Citation id="5" index={3} source="Depression and Anxiety" year="2020" tier={1} />. This
          duration criterion helps distinguish temporary stress responses from persistent patterns.
        </p>
        <p className="mb-6">Additionally, clinical anxiety typically includes:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Excessive worry:</strong> Worry that's out of proportion to the actual likelihood or
            impact of feared events
          </li>
          <li>
            <strong>Difficulty controlling worry:</strong> You can't just 'turn it off' or distract
            yourself effectively
          </li>
          <li>
            <strong>Physical symptoms:</strong> At least three from a list including restlessness, fatigue,
            difficulty concentrating, irritability, muscle tension, or sleep disturbance
          </li>
          <li>
            <strong>Significant distress or impairment:</strong> The anxiety causes real problems in your
            work, relationships, or daily functioning{', '}
            <Citation id="6" index={4} source="Journal of Affective Disorders" year="2021" tier={1} />
          </li>
        </ul>

        <ArticleChart
          type="bar"
          title="Common Physical Symptoms in Anxiety Disorders"
          data={[
            { label: 'Muscle tension', value: 82 },
            { label: 'Sleep disturbance', value: 76 },
            { label: 'Fatigue', value: 71 },
            { label: 'Restlessness', value: 68 },
            { label: 'Difficulty concentrating', value: 65 },
            { label: 'Irritability', value: 63 },
          ]}
          source="Journal of Affective Disorders, 2021"
        />

        <h2
          id="the-content-of-worry"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What You Worry About Matters Less Than How You Worry
        </h2>
        <p className="mb-6">
          Research shows that the content of worry (what you're worried about) is less important than the
          process of worry (how you worry about it){', '}
          <Citation id="4" index={5} source="Cognitive Therapy and Research" year="2019" tier={1} />.
        </p>
        <p className="mb-6">People with clinical anxiety tend to:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Catastrophize:</strong> Jump to worst-case scenarios without considering more likely
            outcomes
          </li>
          <li>
            <strong>Engage in "what-if" spirals:</strong> Each worry spawns three more worries in an
            endless chain
          </li>
          <li>
            <strong>Struggle with uncertainty:</strong> Need absolute certainty about outcomes, which is
            impossible{', '}
            <Citation id="7" index={6} source="Clinical Psychology Review" year="2019" tier={1} />
          </li>
          <li>
            <strong>Use worry as attempted problem-solving:</strong> Believe that worrying itself will
            prevent bad things from happening
          </li>
        </ul>

        <QuoteBlock
          quote="The problem isn't that you worry. The problem is that you can't stop worrying, even when you want to. It's like a mental channel stuck on the fear network."
          attribution="Dr. James Rivera"
          role="Clinical Psychologist"
          source="Psychage Content Team"
          variant="default"
        />

        <h2
          id="avoidance-patterns"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Role of Avoidance
        </h2>
        <p className="mb-6">
          One of the clearest markers that anxiety has become problematic is when you start avoiding things
          because of worry{', '}
          <Citation id="8" index={7} source="Behaviour Research and Therapy" year="2020" tier={1} />. This
          might look like:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Skipping social events because you're worried about judgment</li>
          <li>Not applying for jobs because rejection feels unbearable</li>
          <li>Avoiding driving, flying, or public spaces due to panic fears</li>
          <li>Procrastinating on important tasks because worry makes them feel overwhelming</li>
          <li>Seeking constant reassurance from others to calm your fears</li>
        </ul>
        <p className="mb-6">
          Normal worry doesn't shrink your world. Anxiety disorders often do. If your life is getting
          smaller because of what you're avoiding, that's a significant red flag.
        </p>

        <ArticleCallout variant="warning" title="When Avoidance Becomes the Problem">
          <p className="mb-4">
            Avoidance provides short-term relief but long-term amplification. Every time you avoid something
            anxiety-provoking, you reinforce the belief that the situation is truly dangerous. This creates
            a vicious cycle where anxiety grows stronger over time.
          </p>
        </ArticleCallout>

        <h2
          id="functional-impairment"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Impairment Question
        </h2>
        <p className="mb-6">
          Perhaps the most important distinction is functional impairment. Ask yourself these questions:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Has anxiety affected your job performance or career trajectory?</li>
          <li>Have relationships suffered because of your worry or avoidance?</li>
          <li>Are you missing out on important experiences due to anxiety?</li>
          <li>Is your physical health declining (poor sleep, stress-related illnesses)?</li>
          <li>Do you use alcohol or other substances to manage anxiety?</li>
          <li>Does worry consume hours of your day?</li>
        </ul>
        <p className="mb-6">
          If you answered yes to several of these, your anxiety has crossed into disorder territory. The
          good news: anxiety disorders are among the most treatable mental health conditions{', '}
          <Citation id="3" index={8} source="Journal of Anxiety Disorders" year="2018" tier={1} />.
        </p>

        <h2
          id="when-to-seek-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          You don't need to wait until anxiety is completely debilitating to seek help. Consider
          professional support if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Anxiety persists for more than a few weeks without improvement</li>
          <li>Self-help strategies aren't providing relief</li>
          <li>You're experiencing panic attacks</li>
          <li>Avoidance is limiting your life in significant ways</li>
          <li>You're noticing impacts on work, school, or relationships</li>
          <li>Physical symptoms are frequent or severe</li>
          <li>You're using substances to cope with anxiety</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Bottom line:</strong> Normal worry is uncomfortable but manageable. It motivates action
            without paralyzing you. Clinical anxiety is persistent, excessive, uncontrollable, and
            interferes with your life in meaningful ways.
          </p>
          <p>
            If you're unsure where you fall, err on the side of seeking an assessment. A mental health
            professional can provide clarity and help you determine the best path forward.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ========================================================================
  // Article 3: The Anxiety Cycle
  // ========================================================================
  {
    id: catId(3),
    slug: 'anxiety-cycle-avoidance-feeds-fear',
    title: 'The Anxiety Cycle: How Avoidance Feeds Fear',
    description: 'Understand the self-reinforcing loop that keeps anxiety alive, and learn why avoiding what scares you makes it stronger.',
    image: "/images/articles/cat02/cover-003.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anxiety Cycle', 'Avoidance', 'Behavioral Psychology', 'CBT'],
    citations: [
      {
        id: '1',
        text: 'The role of avoidance and safety behavior in anxiety disorders',
        source: 'Behaviour Research and Therapy',
        year: '2019',
        link: 'https://doi.org/10.1016/j.brat.2019.05.007',
        tier: 1,
      },
      {
        id: '2',
        text: 'Negative reinforcement and the maintenance of avoidance',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101839',
        tier: 1,
      },
      {
        id: '3',
        text: 'Safety behaviors in anxiety: a critical review',
        source: 'Journal of Anxiety Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.janxdis.2021.102398',
        tier: 1,
      },
      {
        id: '4',
        text: 'Anxiety sensitivity and interoceptive exposure',
        source: 'Behavior Therapy',
        year: '2018',
        link: 'https://doi.org/10.1016/j.beth.2018.03.008',
        tier: 1,
      },
      {
        id: '5',
        text: 'Cognitive models of panic disorder: an integration',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101867',
        tier: 1,
      },
      {
        id: '6',
        text: 'Breaking the anxiety cycle through exposure therapy',
        source: 'Journal of Consulting and Clinical Psychology',
        year: '2019',
        link: 'https://doi.org/10.1037/ccp0000367',
        tier: 1,
      },
      {
        id: '7',
        text: 'The vicious cycle of anxiety: a neuroscience perspective',
        source: 'Neuroscience & Biobehavioral Reviews',
        year: '2021',
        link: 'https://doi.org/10.1016/j.neubiorev.2021.04.015',
        tier: 1,
      },
      {
        id: '8',
        text: 'Worry, reassurance seeking, and anxiety persistence',
        source: 'Cognitive Therapy and Research',
        year: '2020',
        link: 'https://doi.org/10.1007/s10608-020-10098-5',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You avoid the thing that makes you anxious. Relief floods in — temporarily. But then, the next
            time the situation arises, your anxiety is even stronger. This is the anxiety cycle, a
            self-reinforcing loop that keeps you trapped in fear. Understanding how it works is the first
            step toward breaking free.
          </p>
          <p className="mb-6">
            Avoidance is one of the most natural responses to anxiety. When something scares you, moving
            away from it makes intuitive sense. The problem is that avoidance is also the primary mechanism
            that maintains anxiety long-term{', '}
            <Citation id="1" index={1} source="Behaviour Research and Therapy" year="2019" tier={1} />.
          </p>
        </div>

        <h2
          id="the-four-stages"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Four Stages of the Anxiety Cycle
        </h2>
        <p className="mb-6">
          The anxiety cycle operates in a predictable pattern. Once you recognize it, you'll start seeing
          it everywhere in your own life:
        </p>

        <ArticleAccordion
          type="single"
          items={[
            {
              id: 'stage1',
              title: 'Stage 1: Trigger — Something Activates Your Anxiety',
              content: (
                <div>
                  <p className="mb-4">
                    A situation, thought, or sensation triggers your anxiety alarm. This could be:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>An upcoming social event (for social anxiety)</li>
                    <li>Physical sensations like rapid heartbeat (for panic disorder)</li>
                    <li>Uncertainty about the future (for generalized anxiety)</li>
                    <li>A specific situation like driving or flying (for phobias)</li>
                  </ul>
                  <p className="mt-4">
                    Your brain perceives threat, even if the actual danger is minimal or nonexistent{', '}
                    <Citation id="7" index={2} source="Neuroscience & Biobehavioral Reviews" year="2021" tier={1} />.
                  </p>
                </div>
              ),
            },
            {
              id: 'stage2',
              title: 'Stage 2: Response — Anxiety Symptoms Emerge',
              content: (
                <div>
                  <p className="mb-4">
                    Your body launches the full anxiety response: racing heart, sweaty palms, racing
                    thoughts, muscle tension, nausea, or difficulty breathing. These symptoms feel
                    overwhelming and intolerable.
                  </p>
                  <p>
                    This is also where catastrophic thinking kicks in: "What if I embarrass myself?", "What if
                    I have a heart attack?", "What if I lose control?"{', '}
                    <Citation id="5" index={3} source="Clinical Psychology Review" year="2020" tier={1} />
                  </p>
                </div>
              ),
            },
            {
              id: 'stage3',
              title: 'Stage 3: Avoidance — You Escape or Prevent the Situation',
              content: (
                <div>
                  <p className="mb-4">
                    To stop the discomfort, you avoid the situation entirely or engage in "safety behaviors"
                    to make it feel less threatening{', '}
                    <Citation id="3" index={4} source="Journal of Anxiety Disorders" year="2021" tier={1} />.
                    Examples:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Canceling plans to avoid social situations</li>
                    <li>Leaving a crowded place when panic symptoms start</li>
                    <li>Only driving familiar routes or having someone else drive</li>
                    <li>Excessively checking things or seeking reassurance</li>
                    <li>Using alcohol or medication to "take the edge off"</li>
                  </ul>
                  <p className="mt-4">
                    The anxiety immediately decreases. You feel relief. This reinforces the behavior.
                  </p>
                </div>
              ),
            },
            {
              id: 'stage4',
              title: 'Stage 4: Reinforcement — The Cycle Strengthens',
              content: (
                <div>
                  <p className="mb-4">
                    Because avoidance reduced your anxiety in the short term, your brain learns that the
                    situation is indeed dangerous and avoidance is the solution{', '}
                    <Citation id="2" index={5} source="Clinical Psychology Review" year="2020" tier={1} />.
                  </p>
                  <p className="mb-4">
                    This is called negative reinforcement: a behavior (avoidance) is strengthened because it
                    removes an unpleasant experience (anxiety). The problem? You never learn that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The feared outcome probably wouldn't have happened</li>
                    <li>Even if it did, you could have handled it</li>
                    <li>Your anxiety would have decreased on its own if you'd stayed in the situation</li>
                  </ul>
                  <p className="mt-4">
                    Instead, the next time you encounter the trigger, your anxiety is even stronger because
                    your brain "knows" it's dangerous. The cycle repeats.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <ArticleChart
          type="line"
          title="How Avoidance Strengthens Anxiety Over Time"
          data={[
            { label: 'Week 1', value: 45 },
            { label: 'Week 2', value: 52 },
            { label: 'Week 3', value: 61 },
            { label: 'Week 4', value: 68 },
            { label: 'Week 5', value: 74 },
            { label: 'Week 6', value: 79 },
          ]}
          source="Conceptual model based on CBT research"
        />

        <h2
          id="why-avoidance-works-short-term"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Avoidance Feels Like the Right Choice
        </h2>
        <p className="mb-6">
          Avoidance isn't irrational. It works — in the moment. The relief you feel when you cancel plans,
          leave a situation, or avoid a feared outcome is real and immediate. Your nervous system calms
          down. The threat is gone.
        </p>
        <p className="mb-6">
          This is precisely why avoidance is so powerful and so difficult to break. Your brain experiences
          it as a successful strategy. It doesn't register the long-term cost: that your world is shrinking,
          your confidence is eroding, and your anxiety is growing stronger.
        </p>

        <ArticleCallout variant="clinical-note" title="The Safety Behavior Trap">
          <p className="mb-4">
            Sometimes avoidance isn't complete withdrawal. "Safety behaviors" let you enter feared
            situations but only with protective rituals: sitting near exits, bringing a companion, having
            your phone ready to call for help, or carrying anti-anxiety medication "just in case."
          </p>
          <p>
            These behaviors feel helpful, but they send the same message to your brain: "This situation is
            dangerous and I can only handle it with special precautions." This prevents you from learning
            that you're actually capable without them{', '}
            <Citation id="3" index={6} source="Journal of Anxiety Disorders" year="2021" tier={1} />.
          </p>
        </ArticleCallout>

        <h2
          id="breaking-the-cycle"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Breaking the Cycle: The Power of Exposure
        </h2>
        <p className="mb-6">
          The only way to break the anxiety cycle is to do the thing that feels impossible: face the feared
          situation without avoiding or using safety behaviors. This is called exposure, and it's the
          cornerstone of effective anxiety treatment{', '}
          <Citation id="6" index={7} source="Journal of Consulting and Clinical Psychology" year="2019" tier={1} />.
        </p>
        <p className="mb-6">Here's what happens when you stay in an anxiety-provoking situation:</p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>
            <strong>Anxiety peaks:</strong> Initially, anxiety spikes when you confront the trigger. This
            is uncomfortable but not dangerous.
          </li>
          <li>
            <strong>Habituation occurs:</strong> If you stay in the situation, your anxiety naturally begins
            to decrease after 10-30 minutes. Your body can't maintain peak anxiety indefinitely.
          </li>
          <li>
            <strong>New learning happens:</strong> You learn that the feared outcome didn't occur, or that
            even if something uncomfortable happened, you could handle it.
          </li>
          <li>
            <strong>The cycle weakens:</strong> The next time you face the situation, your initial anxiety
            is lower because your brain has new evidence that it's not as dangerous as previously believed.
          </li>
        </ol>

        <QuoteBlock
          quote="Avoidance teaches your brain that anxiety is intolerable and the situation is dangerous. Exposure teaches your brain that anxiety is temporary and you are capable."
          attribution="Dr. James Rivera"
          role="Clinical Psychologist"
          source="Psychage Content Team"
          variant="large"
        />

        <h2
          id="gradual-exposure"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Starting Small: Gradual Exposure
        </h2>
        <p className="mb-6">
          Breaking the cycle doesn't mean jumping into your worst fear immediately. Effective exposure is
          gradual, systematic, and collaborative (ideally with a therapist who specializes in anxiety).
        </p>
        <p className="mb-6">The process typically involves:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Create a fear hierarchy:</strong> List situations from least to most anxiety-provoking
          </li>
          <li>
            <strong>Start with manageable steps:</strong> Begin with situations that provoke mild to
            moderate anxiety
          </li>
          <li>
            <strong>Practice repeatedly:</strong> Repeat each step until your anxiety decreases by at least
            50%
          </li>
          <li>
            <strong>Progress gradually:</strong> Move up the hierarchy as each level becomes more manageable
          </li>
          <li>
            <strong>Drop safety behaviors:</strong> Gradually eliminate protective rituals as you build
            confidence
          </li>
        </ul>

        <ArticleCallout variant="tip" title="The 50% Rule">
          <p>
            Don't move to the next level of exposure until your anxiety for the current level has decreased
            by at least 50% from your first attempt. This ensures you're consolidating new learning before
            adding difficulty.
          </p>
        </ArticleCallout>

        <h2
          id="interoceptive-exposure"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Facing the Sensations: Interoceptive Exposure
        </h2>
        <p className="mb-6">
          For panic disorder and health anxiety, the feared trigger isn't external — it's the physical
          sensations themselves. People fear rapid heartbeat, dizziness, shortness of breath, or other
          anxiety symptoms because they interpret them as dangerous{', '}
          <Citation id="4" index={8} source="Behavior Therapy" year="2018" tier={1} />.
        </p>
        <p className="mb-6">
          Interoceptive exposure involves deliberately inducing these sensations in a safe environment to
          learn they're uncomfortable but not dangerous:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Spinning in a chair to create dizziness</li>
          <li>Hyperventilating to produce shortness of breath and lightheadedness</li>
          <li>Running in place to elevate heart rate</li>
          <li>Breathing through a straw to simulate restricted breathing</li>
        </ul>
        <p className="mb-6">
          By experiencing these sensations without catastrophic consequences, you break the association
          between body sensations and danger.
        </p>

        <h2
          id="when-to-seek-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When to Seek Professional Support
        </h2>
        <p className="mb-6">
          Breaking the anxiety cycle through exposure is most effective with professional guidance. Cognitive
          Behavioral Therapy (CBT) and Exposure and Response Prevention (ERP) are evidence-based treatments
          specifically designed to break this cycle.
        </p>
        <p className="mb-6">Consider working with a therapist if:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Your avoidance has significantly limited your life</li>
          <li>You're struggling to design or implement exposures on your own</li>
          <li>Anxiety is severe or accompanied by panic attacks</li>
          <li>You've tried self-help but haven't seen improvement</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Remember:</strong> The anxiety cycle thrives on avoidance. Every time you avoid something
            because of anxiety, you strengthen the belief that it's dangerous and that you can't handle it.
          </p>
          <p>
            Breaking the cycle requires doing the opposite: approaching what you fear, staying until anxiety
            decreases, and discovering that you're more capable than your anxiety tells you. It's difficult
            work, but it's the path to freedom.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ========================================================================
  // Article 4: Why Anxiety Feels So Physical
  // ========================================================================
  {
    id: catId(4),
    slug: 'why-anxiety-feels-physical-mind-body-connection',
    title: 'Why Anxiety Feels So Physical: Understanding the Mind-Body Connection',
    description: 'Explore why anxiety manifests in your body with racing heart, tight chest, and trembling hands, and what these symptoms really mean.',
    image: "/images/articles/cat02/cover-004.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Physical Symptoms', 'Somatic Anxiety', 'Mind-Body Connection', 'Autonomic Nervous System'],
    citations: [
      {
        id: '1',
        text: 'The autonomic nervous system and anxiety: a review',
        source: 'Autonomic Neuroscience',
        year: '2020',
        link: 'https://doi.org/10.1016/j.autneu.2020.102662',
        tier: 1,
      },
      {
        id: '2',
        text: 'Interoception and mental health: a roadmap',
        source: 'Biological Psychiatry: Cognitive Neuroscience and Neuroimaging',
        year: '2019',
        link: 'https://doi.org/10.1016/j.bpsc.2019.06.001',
        tier: 1,
      },
      {
        id: '3',
        text: 'The gut-brain axis in anxiety disorders',
        source: 'Nature Reviews Gastroenterology & Hepatology',
        year: '2021',
        link: 'https://doi.org/10.1038/s41575-021-00488-6',
        tier: 1,
      },
      {
        id: '4',
        text: 'Physiological signatures of anxiety: a systematic review',
        source: 'Psychophysiology',
        year: '2019',
        link: 'https://doi.org/10.1111/psyp.13336',
        tier: 1,
      },
      {
        id: '5',
        text: 'Hyperventilation syndrome and anxiety',
        source: 'Respiratory Medicine',
        year: '2020',
        link: 'https://doi.org/10.1016/j.rmed.2020.105899',
        tier: 1,
      },
      {
        id: '6',
        text: 'Muscle tension in anxiety disorders: mechanisms and treatment implications',
        source: 'Journal of Anxiety Disorders',
        year: '2018',
        link: 'https://doi.org/10.1016/j.janxdis.2018.09.003',
        tier: 1,
      },
      {
        id: '7',
        text: 'Cardiovascular response to anxiety: implications for panic disorder',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102045',
        tier: 1,
      },
      {
        id: '8',
        text: 'Anxiety sensitivity and the interpretation of physiological symptoms',
        source: 'Behavior Therapy',
        year: '2019',
        link: 'https://doi.org/10.1016/j.beth.2019.05.002',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your heart races. Your chest tightens. Your stomach churns. Your hands shake. Anxiety doesn't
            just live in your mind — it commandeers your entire body. Understanding why anxiety feels so
            intensely physical can help you stop fearing the symptoms themselves.
          </p>
          <p className="mb-6">
            Many people experiencing anxiety for the first time end up in emergency rooms, convinced they're
            having a heart attack or serious medical crisis. The physical symptoms of anxiety are that real,
            that intense, and that convincing{', '}
            <Citation id="7" index={1} source="Clinical Psychology Review" year="2021" tier={1} />.
          </p>
        </div>

        <h2
          id="why-anxiety-is-physical"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Mental Distress Creates Physical Symptoms
        </h2>
        <p className="mb-6">
          The mind-body distinction is largely artificial. Your brain is an organ, and your thoughts and
          emotions are neurochemical events that cascade throughout your entire nervous system{', '}
          <Citation id="1" index={2} source="Autonomic Neuroscience" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          When your brain perceives threat — whether it's a bear in the woods or an upcoming presentation —
          it activates your sympathetic nervous system, the "fight or flight" branch of your autonomic
          nervous system. This triggers immediate physical changes designed to help you survive:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Adrenaline floods your bloodstream</li>
          <li>Your heart pumps faster to deliver oxygen to muscles</li>
          <li>Blood vessels constrict in some areas and dilate in others</li>
          <li>Digestion slows or stops (who needs to digest food when running from danger?)</li>
          <li>Muscles tense in preparation for action</li>
          <li>Breathing quickens to increase oxygen intake</li>
        </ul>

        <StatCard
          stats={[
            { value: 74, suffix: '%', label: 'Report chest pain or tightness' },
            { value: 68, suffix: '%', label: 'Experience GI symptoms' },
            { value: 62, suffix: '%', label: 'Have muscle tension or pain' },
          ]}
          source="Psychophysiology, 2019"
        />

        <h2
          id="common-physical-symptoms"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Most Common Physical Symptoms of Anxiety
        </h2>
        <p className="mb-6">
          While everyone experiences anxiety differently, certain physical symptoms appear across most
          anxiety presentations{', '}
          <Citation id="4" index={3} source="Psychophysiology" year="2019" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'cardiovascular',
              title: 'Cardiovascular: Racing Heart & Chest Discomfort',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>What you feel:</strong> Rapid or pounding heartbeat, chest tightness, chest pain,
                    feeling like your heart is skipping beats
                  </p>
                  <p className="mb-4">
                    <strong>Why it happens:</strong> Your heart rate increases to pump more oxygen-rich blood
                    to your muscles. Blood pressure rises. Chest muscles tense. These are normal responses to
                    adrenaline, not signs of heart disease in most cases.
                  </p>
                  <p>
                    <strong>Important note:</strong> While anxiety is the most common cause of chest pain in
                    people under 40, never ignore chest pain. If you're unsure, get it checked.
                  </p>
                </div>
              ),
            },
            {
              id: 'respiratory',
              title: 'Respiratory: Breathing Problems & Hyperventilation',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>What you feel:</strong> Shortness of breath, feeling like you can't get enough air,
                    chest tightness, tingling in fingers or face, dizziness
                  </p>
                  <p className="mb-4">
                    <strong>Why it happens:</strong> Anxiety triggers rapid, shallow breathing
                    (hyperventilation). Ironically, this makes you feel more breathless, creating a vicious
                    cycle{', '}
                    <Citation id="5" index={4} source="Respiratory Medicine" year="2020" tier={1} />.
                    Hyperventilation also changes blood chemistry, causing tingling and lightheadedness.
                  </p>
                </div>
              ),
            },
            {
              id: 'gastrointestinal',
              title: "Gastrointestinal: The 'Nervous Stomach'",
              content: (
                <div>
                  <p className="mb-4">
                    <strong>What you feel:</strong> Nausea, butterflies, urgent need to use the bathroom,
                    diarrhea, stomach pain, loss of appetite
                  </p>
                  <p className="mb-4">
                    <strong>Why it happens:</strong> The gut and brain are intimately connected through the
                    gut-brain axis{', '}
                    <Citation id="3" index={5} source="Nature Reviews Gastroenterology & Hepatology" year="2021" tier={1} />.
                    During anxiety, blood flow diverts away from digestion. Your gut essentially "shuts down"
                    because your body doesn't prioritize digesting lunch when it thinks you're in danger.
                  </p>
                </div>
              ),
            },
            {
              id: 'muscular',
              title: 'Muscular: Tension, Trembling & Pain',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>What you feel:</strong> Muscle tension, trembling or shaking, headaches, jaw
                    clenching, shoulder and neck pain, body aches
                  </p>
                  <p className="mb-4">
                    <strong>Why it happens:</strong> Muscles tense up in preparation for fight or flight{', '}
                    <Citation id="6" index={6} source="Journal of Anxiety Disorders" year="2018" tier={1} />.
                    When anxiety becomes chronic, so does muscle tension, leading to tension headaches,
                    TMJ problems, and chronic pain.
                  </p>
                </div>
              ),
            },
            {
              id: 'neurological',
              title: 'Neurological: Dizziness, Tingling & Brain Fog',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>What you feel:</strong> Lightheadedness, dizziness, feeling faint, numbness or
                    tingling (especially in hands, feet, or face), difficulty concentrating, feeling
                    disconnected from reality
                  </p>
                  <p className="mb-4">
                    <strong>Why it happens:</strong> Changes in breathing patterns alter blood flow and oxygen
                    levels. Hypervigilance redirects mental resources toward threat detection, leaving less
                    capacity for other cognitive tasks.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="interoception"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Interoception: Your Body's Internal Awareness System
        </h2>
        <p className="mb-6">
          Interoception is your ability to sense what's happening inside your body — hunger, heartbeat,
          breathing, temperature, muscle tension{', '}
          <Citation id="2" index={7} source="Biological Psychiatry" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          People with anxiety disorders often have heightened interoceptive awareness. They're more attuned
          to subtle body sensations, which sounds like it would be helpful but often isn't. When you're
          anxious, you interpret neutral or benign sensations as dangerous:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Normal heart rate variability feels like arrhythmia</li>
          <li>Natural digestive sounds feel like serious GI problems</li>
          <li>Typical muscle tension feels like impending collapse</li>
        </ul>
        <p className="mb-6">
          This is called anxiety sensitivity: fear of anxiety-related sensations themselves{', '}
          <Citation id="8" index={8} source="Behavior Therapy" year="2019" tier={1} />. You're not just
          anxious about external situations — you're anxious about your own body's responses.
        </p>

        <ArticleCallout variant="clinical-note" title="The Panic Spiral">
          <p className="mb-4">
            Panic attacks often start with normal body sensations that get misinterpreted as dangerous. You
            notice your heart beating faster (maybe from caffeine, exercise, or just standing up quickly).
            This triggers anxiety. Anxiety increases your heart rate further. You notice this increase and
            interpret it as a heart attack. More anxiety. The cycle escalates into full panic.
          </p>
          <p>
            Breaking this cycle requires learning that the sensations themselves aren't dangerous — they're
            just uncomfortable.
          </p>
        </ArticleCallout>

        <h2
          id="why-symptoms-feel-dangerous"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Anxiety Symptoms Feel So Dangerous
        </h2>
        <p className="mb-6">
          The physical symptoms of anxiety can be genuinely terrifying. They mimic serious medical
          conditions:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Chest pain and rapid heartbeat feel like a heart attack</li>
          <li>Shortness of breath feels like you're suffocating</li>
          <li>Dizziness and tingling feel like a stroke</li>
          <li>GI symptoms feel like serious digestive disease</li>
        </ul>
        <p className="mb-6">
          This is why so many people with anxiety end up in emergency rooms. The symptoms are real. The
          distress is real. What's different is the cause and the danger level.
        </p>

        <ComparisonTable
          title="Anxiety vs. Medical Emergency: Key Differences"
          columns={['Symptom', 'Anxiety', 'Medical Emergency']}
          items={[
            {
              feature: 'Onset',
              values: ['Sudden or gradual', 'Usually sudden'],
            },
            {
              feature: 'Duration',
              values: ['Minutes to hours (panic) or constant (GAD)', 'Persistent and worsening'],
            },
            {
              feature: 'Triggers',
              values: ['Often identifiable (stress, worry)', 'No clear psychological trigger'],
            },
            {
              feature: 'Response to calming',
              values: ['Symptoms improve with relaxation', 'Symptoms continue regardless'],
            },
            {
              feature: 'Pattern',
              values: ['Recurrent episodes with recovery', 'First-time or progressively worse'],
            },
          ]}
        />

        <ArticleCallout variant="warning" title="When to Seek Medical Attention">
          <p className="mb-4">
            If you're experiencing symptoms for the first time, especially severe chest pain, difficulty
            breathing, or sudden neurological symptoms, seek medical evaluation. It's better to rule out
            medical causes.
          </p>
          <p>
            Once medical issues are excluded, you can work with a mental health professional to address the
            anxiety underlying your physical symptoms.
          </p>
        </ArticleCallout>

        <h2
          id="managing-physical-symptoms"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Managing the Physical Side of Anxiety
        </h2>
        <p className="mb-6">
          Understanding that your symptoms are anxiety-driven rather than signs of medical danger is the
          first step. From there, several strategies can help:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Breath regulation:</strong> Slow, diaphragmatic breathing counteracts hyperventilation
          </li>
          <li>
            <strong>Progressive muscle relaxation:</strong> Systematically tensing and releasing muscles
            reduces baseline tension
          </li>
          <li>
            <strong>Regular exercise:</strong> Metabolizes stress hormones and improves heart rate variability
          </li>
          <li>
            <strong>Interoceptive exposure:</strong> Deliberately inducing feared sensations in safe
            contexts to learn they're not dangerous
          </li>
          <li>
            <strong>Cognitive reappraisal:</strong> Learning to interpret body sensations accurately rather
            than catastrophically
          </li>
        </ul>

        <h2
          id="key-takeaways"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Your Body Isn't Betraying You
        </h2>
        <p className="mb-6">
          The physical symptoms of anxiety aren't a sign that something is wrong with your body. They're a
          sign that your body is doing exactly what it's designed to do when it perceives threat — even if
          that threat isn't actually dangerous.
        </p>
        <p className="mb-6">
          Your heart races not because it's failing, but because it's working hard to protect you. Your
          stomach churns not because you have a disease, but because your nervous system is prioritizing
          survival over digestion.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Remember:</strong> The goal isn't to eliminate physical anxiety symptoms entirely — that's
            unrealistic. The goal is to change your relationship with them so they inform you without
            terrifying you.
          </p>
          <p>
            When you stop fearing the symptoms themselves, they lose much of their power. Anxiety still
            feels uncomfortable, but it no longer feels dangerous.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ========================================================================
  // Article 5: Types of Anxiety Disorders
  // ========================================================================
  {
    id: catId(5),
    slug: 'types-of-anxiety-disorders-overview',
    title: 'Types of Anxiety Disorders: A Clear Overview',
    description: 'Learn about the major anxiety disorders — GAD, panic disorder, social anxiety, phobias, and more — and how they differ from each other.',
    image: "/images/articles/cat02/cover-005.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: [
      'Anxiety Disorders',
      'Mental Health Diagnosis',
      'GAD',
      'Panic Disorder',
      'Social Anxiety',
    ],
    citations: [
      {
        id: '1',
        text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://doi.org/10.1176/appi.books.9780890425787',
        tier: 4,
      },
      {
        id: '2',
        text: 'The epidemiology of anxiety disorders: an update',
        source: 'Current Psychiatry Reports',
        year: '2021',
        link: 'https://doi.org/10.1007/s11920-021-01266-w',
        tier: 1,
      },
      {
        id: '3',
        text: 'Generalized anxiety disorder: clinical presentation and management',
        source: 'BMJ',
        year: '2020',
        link: 'https://doi.org/10.1136/bmj.m3311',
        tier: 1,
      },
      {
        id: '4',
        text: 'Panic disorder: epidemiology, diagnosis and treatment',
        source: 'The Medical Clinics of North America',
        year: '2019',
        link: 'https://doi.org/10.1016/j.mcna.2019.02.008',
        tier: 1,
      },
      {
        id: '5',
        text: 'Social anxiety disorder: recognition, assessment, and treatment',
        source: 'BMJ',
        year: '2021',
        link: 'https://doi.org/10.1136/bmj.n2183',
        tier: 1,
      },
      {
        id: '6',
        text: 'Specific phobias: a review of DSM-IV specific phobias and preliminary recommendations for DSM-V',
        source: 'Depression and Anxiety',
        year: '2018',
        link: 'https://doi.org/10.1002/da.22468',
        tier: 1,
      },
      {
        id: '7',
        text: 'Agoraphobia: current perspectives in understanding and treatment',
        source: 'Psychology Research and Behavior Management',
        year: '2020',
        link: 'https://doi.org/10.2147/PRBM.S211047',
        tier: 1,
      },
      {
        id: '8',
        text: 'Comorbidity of anxiety disorders: current understanding and future directions',
        source: 'Dialogues in Clinical Neuroscience',
        year: '2019',
        link: 'https://doi.org/10.31887/DCNS.2019.21.3/bgoldstein',
        tier: 1,
      },
      {
        id: '9',
        text: 'Treatment of anxiety disorders',
        source: 'Lancet',
        year: '2020',
        link: 'https://doi.org/10.1016/S0140-6736(20)31652-9',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "Anxiety disorder" isn't a single condition — it's a category that includes several distinct
            diagnoses, each with its own patterns, triggers, and treatment approaches. Understanding which
            type you might be experiencing can guide you toward the most effective help.
          </p>
          <p className="mb-6">
            According to the DSM-5-TR, the standard diagnostic manual used by mental health professionals,
            anxiety disorders are characterized by excessive fear and anxiety that cause significant distress
            or impairment{', '}
            <Citation id="1" index={1} source="American Psychiatric Association" year="2022" tier={4} />.
            But the specifics vary widely.
          </p>
        </div>

        <StatCard
          stats={[
            { value: 284, suffix: 'M', label: 'People worldwide with anxiety disorders' },
            { value: 31, suffix: '%', label: 'U.S. adults affected in lifetime' },
            { value: 62, suffix: '%', label: 'Have multiple anxiety disorders' },
          ]}
          source="Current Psychiatry Reports, 2021"
        />

        <h2
          id="generalized-anxiety-disorder"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Generalized Anxiety Disorder (GAD): The Constant Worrier
        </h2>
        <p className="mb-6">
          Generalized Anxiety Disorder is characterized by persistent, excessive worry about a variety of
          topics — health, work, finances, relationships, minor matters{', '}
          <Citation id="3" index={2} source="BMJ" year="2020" tier={1} />. The worry is difficult to
          control and occurs more days than not for at least six months.
        </p>
        <p className="mb-6">
          <strong>Key features:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Worry that shifts from one topic to another ("What if..." thinking)</li>
          <li>Difficulty controlling the worry even when you know it's excessive</li>
          <li>Physical symptoms: restlessness, fatigue, muscle tension, sleep disturbance</li>
          <li>Anticipating worst-case scenarios across multiple life domains</li>
          <li>Trouble relaxing even in safe, comfortable situations</li>
        </ul>
        <p className="mb-6">
          <strong>What it's NOT:</strong> Temporary stress during difficult life circumstances. GAD involves
          chronic worry that persists even when things are objectively going well.
        </p>

        <ArticleCallout variant="did-you-know" title="GAD Prevalence">
          <p>
            GAD affects approximately 6.8 million adults in the U.S. (3.1% of the population), with women
            twice as likely to be affected as men. It most commonly begins in young adulthood, though it can
            emerge at any age.
          </p>
        </ArticleCallout>

        <h2
          id="panic-disorder"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Panic Disorder: When Panic Attacks Become a Pattern
        </h2>
        <p className="mb-6">
          Panic Disorder involves recurrent, unexpected panic attacks followed by at least one month of
          persistent worry about having another attack or significant behavior changes to avoid attacks{', '}
          <Citation id="4" index={3} source="The Medical Clinics of North America" year="2019" tier={1} />.
        </p>
        <p className="mb-6">
          A panic attack is an abrupt surge of intense fear that peaks within minutes and includes at least
          four of these symptoms:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Pounding heart or rapid heart rate</li>
          <li>Sweating, trembling, or shaking</li>
          <li>Shortness of breath or feeling smothered</li>
          <li>Chest pain or discomfort</li>
          <li>Nausea or abdominal distress</li>
          <li>Dizziness, lightheadedness, or feeling faint</li>
          <li>Chills or heat sensations</li>
          <li>Numbness or tingling</li>
          <li>Feelings of unreality or being detached from oneself</li>
          <li>Fear of losing control or "going crazy"</li>
          <li>Fear of dying</li>
        </ul>
        <p className="mb-6">
          <strong>What distinguishes Panic Disorder:</strong> It's not having a panic attack (many people
          have one or two in their lifetime). It's the development of persistent fear of future attacks and
          the behavioral changes this fear causes.
        </p>

        <h2
          id="social-anxiety-disorder"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Social Anxiety Disorder: Fear of Judgment
        </h2>
        <p className="mb-6">
          Social Anxiety Disorder (also called Social Phobia) involves intense fear of social situations
          where you might be scrutinized by others{', '}
          <Citation id="5" index={4} source="BMJ" year="2021" tier={1} />. This goes far beyond shyness or
          introversion.
        </p>
        <p className="mb-6">
          <strong>Common feared situations:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Public speaking or performing</li>
          <li>Meeting new people or making small talk</li>
          <li>Eating or drinking in front of others</li>
          <li>Being the center of attention</li>
          <li>Using public restrooms</li>
          <li>Speaking up in meetings or classes</li>
        </ul>
        <p className="mb-6">
          <strong>Core fears:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Being negatively evaluated or judged</li>
          <li>Embarrassing or humiliating yourself</li>
          <li>Showing anxiety symptoms that others will notice</li>
          <li>Being rejected or socially excluded</li>
        </ul>
        <p className="mb-6">
          Social anxiety exists on a spectrum from performance-only (fear limited to speaking/performing) to
          generalized (fear across most social interactions).
        </p>

        <ArticleChart
          type="bar"
          title="Prevalence of Major Anxiety Disorders in U.S. Adults"
          data={[
            { label: 'Specific Phobia', value: 12.5 },
            { label: 'Social Anxiety', value: 12.1 },
            { label: 'GAD', value: 5.7 },
            { label: 'Panic Disorder', value: 4.7 },
            { label: 'Agoraphobia', value: 2.5 },
          ]}
          source="Current Psychiatry Reports, 2021"
        />

        <h2
          id="specific-phobias"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Specific Phobias: Intense Fear of Particular Objects or Situations
        </h2>
        <p className="mb-6">
          Specific Phobias involve marked, persistent fear of specific objects or situations{', '}
          <Citation id="6" index={5} source="Depression and Anxiety" year="2018" tier={1} />. The fear is
          out of proportion to actual danger and causes significant distress or avoidance.
        </p>
        <p className="mb-6">
          <strong>Common categories:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Animal:</strong> Dogs, snakes, spiders, insects
          </li>
          <li>
            <strong>Natural environment:</strong> Heights, storms, water
          </li>
          <li>
            <strong>Blood-injection-injury:</strong> Needles, blood, medical procedures
          </li>
          <li>
            <strong>Situational:</strong> Flying, elevators, enclosed spaces, bridges
          </li>
          <li>
            <strong>Other:</strong> Choking, vomiting, loud sounds, costumed characters
          </li>
        </ul>
        <p className="mb-6">
          Specific phobias are the most common anxiety disorder, affecting about 12.5% of adults at some
          point in their lives. Many people have mild phobias that don't interfere with daily life. They
          become disorders when avoidance significantly limits functioning.
        </p>

        <h2
          id="agoraphobia"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Agoraphobia: Fear of Situations Where Escape Might Be Difficult
        </h2>
        <p className="mb-6">
          Agoraphobia involves intense fear of at least two of these situations{', '}
          <Citation id="7" index={6} source="Psychology Research and Behavior Management" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Using public transportation</li>
          <li>Being in open spaces (parking lots, bridges, marketplaces)</li>
          <li>Being in enclosed spaces (shops, theaters, cinemas)</li>
          <li>Standing in line or being in a crowd</li>
          <li>Being outside the home alone</li>
        </ul>
        <p className="mb-6">
          The common thread: fear that escape might be difficult or help unavailable if panic-like symptoms
          or other embarrassing symptoms occur. People with agoraphobia often need a companion to enter
          feared situations or avoid them entirely. In severe cases, people become housebound.
        </p>
        <p className="mb-6">
          Agoraphobia can occur with or without panic disorder, though they often co-occur.
        </p>

        <h2
          id="separation-anxiety"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Separation Anxiety Disorder: Not Just for Children
        </h2>
        <p className="mb-6">
          While most common in children, Separation Anxiety Disorder can also affect adults. It involves
          excessive anxiety about separation from attachment figures (parents, partners, children).
        </p>
        <p className="mb-6">
          <strong>In adults, this might look like:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Excessive distress when anticipating or experiencing separation from partner or children</li>
          <li>Persistent worry that something bad will happen to attachment figures</li>
          <li>Reluctance to go to work, travel, or sleep away from home</li>
          <li>Nightmares about separation</li>
          <li>Physical symptoms (headaches, nausea) when separation occurs or is anticipated</li>
        </ul>

        <h2
          id="comorbidity"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When Anxiety Disorders Overlap
        </h2>
        <p className="mb-6">
          It's common to have more than one anxiety disorder simultaneously{', '}
          <Citation id="8" index={7} source="Dialogues in Clinical Neuroscience" year="2019" tier={1} />.
          Research shows that 60-70% of people with one anxiety disorder will meet criteria for at least one
          other anxiety disorder during their lifetime.
        </p>
        <p className="mb-6">Common combinations:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>GAD + Social Anxiety Disorder</li>
          <li>Panic Disorder + Agoraphobia</li>
          <li>Social Anxiety + Specific Phobias</li>
        </ul>
        <p className="mb-6">
          Additionally, anxiety disorders frequently co-occur with depression, OCD, PTSD, and substance use
          disorders. This comorbidity affects treatment planning and prognosis.
        </p>

        <ComparisonTable
          title="Quick Reference: Distinguishing Features"
          columns={['Disorder', 'Primary Fear', 'Key Behavior']}
          items={[
            {
              feature: 'GAD',
              values: ['Multiple worries about future events', 'Chronic overthinking and tension'],
            },
            {
              feature: 'Panic Disorder',
              values: ['Having another panic attack', 'Avoiding triggers or places where attacks occurred'],
            },
            {
              feature: 'Social Anxiety',
              values: ['Negative evaluation by others', 'Avoiding social situations or enduring with distress'],
            },
            {
              feature: 'Specific Phobia',
              values: ['Particular object or situation', 'Avoiding or escaping the phobic stimulus'],
            },
            {
              feature: 'Agoraphobia',
              values: ['Being trapped without escape', 'Avoiding open/enclosed spaces, crowds, travel'],
            },
          ]}
        />

        <h2
          id="treatment-approaches"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Good News: All Anxiety Disorders Are Treatable
        </h2>
        <p className="mb-6">
          Despite their differences, all anxiety disorders respond well to similar evidence-based treatments{', '}
          <Citation id="9" index={8} source="Lancet" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Cognitive Behavioral Therapy (CBT):</strong> The gold standard for most anxiety
            disorders
          </li>
          <li>
            <strong>Exposure therapy:</strong> Especially effective for phobias, panic, and social anxiety
          </li>
          <li>
            <strong>Medication:</strong> SSRIs, SNRIs, and occasionally benzodiazepines
          </li>
          <li>
            <strong>Mindfulness-based approaches:</strong> Helpful adjuncts to other treatments
          </li>
        </ul>
        <p className="mb-6">
          The specific treatment plan depends on which disorder(s) you have, their severity, and your
          preferences. Many people benefit from combining therapy with medication, especially initially.
        </p>

        <h2
          id="getting-diagnosed"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Getting a Proper Diagnosis
        </h2>
        <p className="mb-6">
          Self-diagnosis based on online descriptions can be a helpful starting point, but a formal
          evaluation by a mental health professional is important. They can:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Rule out medical conditions that mimic anxiety (thyroid disorders, heart conditions)</li>
          <li>Identify comorbid conditions</li>
          <li>Determine severity and functional impairment</li>
          <li>Create a tailored treatment plan</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Bottom line:</strong> Understanding which anxiety disorder you're experiencing helps you
            find the most effective treatment. While all anxiety disorders involve excessive fear and worry,
            the specific focus of that fear — and the behaviors it drives — distinguishes one from another.
          </p>
          <p className="mb-4">
            Most importantly: all of these conditions are highly treatable. With the right support, people
            with anxiety disorders make significant improvements and regain quality of life.
          </p>
          <p>
            If you recognize yourself in any of these descriptions, reaching out to a mental health
            professional is a strong first step.
          </p>
        </ArticleCallout>
      </>
    ),
  },
];
