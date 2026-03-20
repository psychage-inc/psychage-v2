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
  ProgressSteps,
  QuoteBlock,
  BeforeAfter,
} from '../../../components/article/blocks';

export const panicPhysicalAnxietyArticlesA: Article[] = [
  // ========================================================================
  // Article 11: Panic Attacks Explained
  // ========================================================================
  {
    id: catId(11),
    slug: 'panic-attacks-explained-brain-body',
    title: 'Panic Attacks Explained: What Happens in Your Brain and Body',
    description: 'Understand the neuroscience and physiology of panic attacks, why they feel so terrifying, and what your body is actually doing.',
    image: "/images/articles/cat02/cover-011.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Panic Attacks', 'Acute Anxiety', 'Fight or Flight', 'Physical Symptoms'],
    citations: [
      {
        id: '1',
        text: 'The neurobiology of panic disorder',
        source: 'Neuroscience & Biobehavioral Reviews',
        year: '2020',
        link: 'https://doi.org/10.1016/j.neubiorev.2020.06.007',
        tier: 1,
      },
      {
        id: '2',
        text: 'Panic Disorder',
        source: 'National Institute of Mental Health',
        year: '2022',
        link: 'https://www.nimh.nih.gov/health/topics/panic-disorder',
        tier: 2,
      },
      {
        id: '3',
        text: 'The acute stress response in panic attacks',
        source: 'Psychoneuroendocrinology',
        year: '2019',
        link: 'https://doi.org/10.1016/j.psyneuen.2019.104397',
        tier: 1,
      },
      {
        id: '4',
        text: 'False suffocation alarm theory of panic attacks',
        source: 'Depression and Anxiety',
        year: '2020',
        link: 'https://doi.org/10.1002/da.22992',
        tier: 1,
      },
      {
        id: '5',
        text: 'The role of carbon dioxide sensitivity in panic disorder',
        source: 'Biological Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1016/j.biopsych.2021.02.005',
        tier: 1,
      },
      {
        id: '6',
        text: 'Cognitive models of panic: catastrophic misinterpretation of bodily sensations',
        source: 'Clinical Psychology Review',
        year: '2019',
        link: 'https://doi.org/10.1016/j.cpr.2019.06.001',
        tier: 1,
      },
      {
        id: '7',
        text: 'The panic cycle: maintaining factors in panic disorder',
        source: 'Behaviour Research and Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.brat.2020.103723',
        tier: 1,
      },
      {
        id: '8',
        text: 'Distinguishing panic attacks from other acute anxiety states',
        source: 'Journal of Anxiety Disorders',
        year: '2019',
        link: 'https://doi.org/10.1016/j.janxdis.2019.102156',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            A panic attack is one of the most terrifying experiences a person can have. Your heart pounds out
            of your chest. You can't catch your breath. The room spins. You're convinced you're dying. Then,
            as suddenly as it started, it's over. Understanding what's happening during a panic attack can
            make them less frightening.
          </p>
          <p className="mb-6">
            Panic attacks affect about 11% of adults each year{', '}
            <Citation id="2" index={1} source="National Institute of Mental Health" year="2022" tier={2} />.
            While they feel dangerous and out of control, they're a dramatic but ultimately harmless
            physiological event.
          </p>
        </div>

        <h2
          id="what-is-panic-attack"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is a Panic Attack?
        </h2>
        <p className="mb-6">
          A panic attack is an abrupt surge of intense fear or discomfort that reaches a peak within minutes
          and includes at least four of the following symptoms:
        </p>

        <StatCard
          stats={[
            { value: 10, suffix: ' min', label: 'Typical duration to peak intensity' },
            { value: 11, suffix: '%', label: 'U.S. adults who experience panic attacks annually' },
            { value: 13, suffix: '', label: 'Distinct physical/mental symptoms in panic attacks' },
          ]}
          source="National Institute of Mental Health, 2022"
        />

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Palpitations, pounding heart, or accelerated heart rate</li>
          <li>Sweating</li>
          <li>Trembling or shaking</li>
          <li>Sensations of shortness of breath or smothering</li>
          <li>Feelings of choking</li>
          <li>Chest pain or discomfort</li>
          <li>Nausea or abdominal distress</li>
          <li>Feeling dizzy, unsteady, lightheaded, or faint</li>
          <li>Chills or heat sensations</li>
          <li>Paresthesias (numbness or tingling sensations)</li>
          <li>Derealization (feelings of unreality) or depersonalization (being detached from oneself)</li>
          <li>Fear of losing control or "going crazy"</li>
          <li>Fear of dying</li>
        </ul>

        <ArticleCallout variant="warning" title="Important Distinction">
          <p className="mb-4">
            Having a panic attack doesn't mean you have panic disorder. Many people have one or two panic
            attacks in their lives without developing the disorder. Panic disorder develops when you have
            recurrent unexpected panic attacks plus persistent worry about future attacks.
          </p>
        </ArticleCallout>

        <h2
          id="what-happens-in-brain"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Happens in Your Brain During a Panic Attack
        </h2>
        <p className="mb-6">
          Panic attacks involve a cascade of neural and hormonal events{', '}
          <Citation id="1" index={2} source="Neuroscience & Biobehavioral Reviews" year="2020" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Amygdala Activation',
              description: (
                <div>
                  <p className="mb-3">
                    Your amygdala (the brain's fear center) detects a threat — real or perceived, sometimes
                    just a body sensation like a skipped heartbeat. It immediately triggers the alarm system.
                  </p>
                  <p>
                    In panic attacks, this activation is often a false alarm, but the response is just as
                    intense as if facing actual danger.
                  </p>
                </div>
              ),
            },
            {
              title: 'Hypothalamus Signals Adrenal Glands',
              description: (
                <p>
                  The hypothalamus activates the sympathetic nervous system and signals your adrenal glands to
                  flood your bloodstream with adrenaline (epinephrine) and noradrenaline. This happens within
                  seconds.
                </p>
              ),
            },
            {
              title: 'Fight-or-Flight Response Peaks',
              description: (
                <div>
                  <p className="mb-3">
                    Adrenaline creates the dramatic physical symptoms: racing heart, rapid breathing, sweating,
                    trembling. Your body is preparing to fight a predator or run for your life.
                  </p>
                  <p>
                    Blood pressure spikes. Pupils dilate. Digestion stops. All resources redirect to survival.
                  </p>
                </div>
              ),
            },
            {
              title: 'Prefrontal Cortex Struggles to Regulate',
              description: (
                <p>
                  Normally, your prefrontal cortex would inhibit the amygdala's alarm. During panic attacks,
                  this regulatory system is overwhelmed or temporarily offline, allowing the panic to escalate
                  unchecked.
                </p>
              ),
            },
            {
              title: 'Symptoms Peak and Gradually Subside',
              description: (
                <div>
                  <p className="mb-3">
                    Panic attacks typically peak within 10 minutes. Your body can't maintain this level of
                    arousal indefinitely.
                  </p>
                  <p>
                    As adrenaline is metabolized, the parasympathetic nervous system (the "rest and digest"
                    system) gradually restores balance. Symptoms fade, often leaving exhaustion.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="false-suffocation-alarm"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The False Suffocation Alarm Theory
        </h2>
        <p className="mb-6">
          One prominent theory about panic attacks is the "false suffocation alarm"{', '}
          <Citation id="4" index={3} source="Depression and Anxiety" year="2020" tier={1} />. This theory
          proposes that people prone to panic have an overly sensitive suffocation detection system in the
          brainstem.
        </p>
        <p className="mb-6">
          This system monitors blood levels of carbon dioxide (CO2). In most people, rising CO2 triggers
          increased breathing to expel it. In people with panic disorder, even small increases in CO2 can
          trigger a false alarm — the brain thinks you're suffocating when you're not{', '}
          <Citation id="5" index={4} source="Biological Psychiatry" year="2021" tier={1} />.
        </p>
        <p className="mb-6">This explains why:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Many panic attacks involve a strong sensation of not being able to breathe</li>
          <li>Hyperventilation is common during panic (the body trying to "fix" perceived suffocation)</li>
          <li>People with panic disorder are more sensitive to CO2 challenges in laboratory settings</li>
          <li>Slow breathing techniques help interrupt panic by normalizing CO2 levels</li>
        </ul>

        <h2
          id="physical-symptoms"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Physical Symptoms Feel So Intense
        </h2>
        <p className="mb-6">
          The physical sensations during a panic attack are not imaginary — they're very real physiological
          changes{', '}
          <Citation id="3" index={5} source="Psychoneuroendocrinology" year="2019" tier={1} />. Here's why
          they feel so extreme:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'heart',
              title: 'Racing Heart & Chest Pain',
              content: (
                <div>
                  <p className="mb-3">
                    <strong>What's happening:</strong> Your heart rate can double or triple (from 70 to 140+
                    bpm). Heart contractions become more forceful. Blood vessels in chest muscles may constrict.
                  </p>
                  <p>
                    <strong>Why it feels terrifying:</strong> This mimics heart attack symptoms. Chest tightness
                    and pain are real, caused by muscle tension and altered blood flow, not cardiac damage.
                  </p>
                </div>
              ),
            },
            {
              id: 'breathing',
              title: 'Shortness of Breath & Hyperventilation',
              content: (
                <div>
                  <p className="mb-3">
                    <strong>What's happening:</strong> You breathe faster and deeper, expelling too much CO2.
                    This changes blood chemistry, making it more alkaline (respiratory alkalosis).
                  </p>
                  <p>
                    <strong>Why it feels terrifying:</strong> Paradoxically, hyperventilation makes you feel
                    like you can't get enough air. Low CO2 also causes dizziness, tingling, and
                    lightheadedness.
                  </p>
                </div>
              ),
            },
            {
              id: 'dizziness',
              title: 'Dizziness & Lightheadedness',
              content: (
                <div>
                  <p className="mb-3">
                    <strong>What's happening:</strong> Hyperventilation alters cerebral blood flow. Blood
                    pressure changes rapidly. Inner ear balance systems may be affected.
                  </p>
                  <p>
                    <strong>Why it feels terrifying:</strong> The sensation of unreality and disconnection is
                    disturbing. You might feel like you're about to faint (though fainting during panic is
                    rare).
                  </p>
                </div>
              ),
            },
            {
              id: 'tingling',
              title: 'Numbness & Tingling',
              content: (
                <div>
                  <p className="mb-3">
                    <strong>What's happening:</strong> Low CO2 from hyperventilation causes blood vessels to
                    constrict, reducing blood flow to extremities. Nerve cells become hyperexcitable.
                  </p>
                  <p>
                    <strong>Why it feels terrifying:</strong> Tingling in hands, feet, and face can feel like a
                    stroke or neurological emergency.
                  </p>
                </div>
              ),
            },
            {
              id: 'derealization',
              title: 'Derealization & Depersonalization',
              content: (
                <div>
                  <p className="mb-3">
                    <strong>What's happening:</strong> Extreme stress can temporarily alter perception. The
                    world feels unreal (derealization) or you feel detached from yourself
                    (depersonalization).
                  </p>
                  <p>
                    <strong>Why it feels terrifying:</strong> These dissociative symptoms create fear that
                    you're 'going crazy' or permanently losing touch with reality.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="catastrophic-misinterpretation"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Catastrophic Misinterpretation Model
        </h2>
        <p className="mb-6">
          A key cognitive model of panic attacks is the "catastrophic misinterpretation" theory{', '}
          <Citation id="6" index={6} source="Clinical Psychology Review" year="2019" tier={1} />. This
          model explains how normal body sensations escalate into panic:
        </p>

        <ArticleChart
          type="area"
          title="The Panic Escalation Cycle"
          data={[
            { label: 'Trigger', value: 3 },
            { label: 'Notice', value: 4 },
            { label: 'Misinterpret', value: 6 },
            { label: 'Catastrophize', value: 8 },
            { label: 'Peak Panic', value: 10 },
            { label: 'Gradual Decline', value: 4 },
          ]}
          source="Conceptual model based on CBT research"
        />

        <ol className="list-decimal pl-6 mb-6 space-y-3">
          <li>
            <strong>Initial trigger:</strong> A body sensation (heart flutter, feeling warm) or thought
            triggers mild anxiety
          </li>
          <li>
            <strong>Heightened attention:</strong> You focus intently on the sensation, noticing every
            variation
          </li>
          <li>
            <strong>Catastrophic interpretation:</strong> You interpret the sensation as dangerous ("My heart
            is failing,", "I can't breathe,", "I'm having a stroke")
          </li>
          <li>
            <strong>Anxiety amplifies:</strong> The catastrophic thought increases anxiety, which increases
            physical symptoms
          </li>
          <li>
            <strong>Feedback loop:</strong> More symptoms → more catastrophic thoughts → more symptoms →
            full panic
          </li>
        </ol>

        <QuoteBlock
          quote="Panic attacks feel like they come out of nowhere, but they often start with a tiny body sensation that gets catastrophically misinterpreted. Breaking that interpretation stops the escalation."
          attribution="Dr. James Rivera"
          role="Clinical Psychologist"
          source="Psychage Content Team"
          variant="default"
        />

        <h2
          id="panic-vs-other"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Panic Attacks vs. Other Acute Anxiety States
        </h2>
        <p className="mb-6">
          Not all intense anxiety is a panic attack{', '}
          <Citation id="8" index={7} source="Journal of Anxiety Disorders" year="2019" tier={1} />. Here's
          how to distinguish:
        </p>

        <ComparisonTable
          title="Panic Attack vs. Other Anxiety States"
          columns={['Feature', 'Panic Attack', 'Severe General Anxiety']}
          items={[
            {
              feature: 'Onset',
              values: ['Abrupt, reaches peak within 10 minutes', 'Gradual build over hours'],
            },
            {
              feature: 'Duration',
              values: ['Usually 10-30 minutes', 'Can last hours or days'],
            },
            {
              feature: 'Intensity',
              values: ['Extreme, overwhelming', 'High but more manageable'],
            },
            {
              feature: 'Symptoms',
              values: ['At least 4 from specific list', 'Varied, not always physical'],
            },
            {
              feature: 'Trigger',
              values: ['Often unexpected/spontaneous', 'Usually situational or worry-based'],
            },
          ]}
        />

        <h2
          id="why-harmless"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Panic Attacks Are Ultimately Harmless
        </h2>
        <p className="mb-6">
          This is crucial to understand: while panic attacks feel like you're dying, they cannot kill you or
          cause permanent harm. Here's why:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Your heart can handle it:</strong> The increased heart rate during panic is well within
            what your heart experiences during exercise. Even prolonged, it won't damage a healthy heart.
          </li>
          <li>
            <strong>You won't suffocate:</strong> Even though it feels like you can't breathe, you're
            actually getting too much oxygen from hyperventilating, not too little.
          </li>
          <li>
            <strong>You won't faint:</strong> Fainting requires a drop in blood pressure. Panic causes blood
            pressure to rise, making fainting unlikely.
          </li>
          <li>
            <strong>You won't 'go crazy':</strong> Panic is an anxiety response, not a psychotic break. The
            feelings of unreality pass when the panic subsides.
          </li>
          <li>
            <strong>It will end:</strong> Your body cannot maintain panic-level arousal indefinitely. The
            adrenaline will metabolize and symptoms will subside, usually within 20-30 minutes.
          </li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Remember:</strong> A panic attack is your fight-or-flight response activating when
            there's no actual danger. It's a false alarm, not a medical emergency.
          </p>
          <p className="mb-4">
            The symptoms are real, intense, and terrifying — but they're caused by adrenaline and
            hyperventilation, not heart attacks, strokes, or other catastrophic events.
          </p>
          <p>
            Understanding what's happening in your brain and body during panic doesn't stop attacks
            immediately, but it's the foundation for effective treatment and reducing the fear of panic
            itself.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ========================================================================
  // Article 12: Am I Having a Heart Attack?
  // ========================================================================
  {
    id: catId(12),
    slug: 'heart-attack-vs-panic-attack-difference',
    title: "Am I Having a Heart Attack?' — How to Tell the Difference from a Panic Attack",
    description: "Learn the critical differences between heart attack and panic attack symptoms, and when you should seek emergency medical care.",
    image: "/images/articles/cat02/cover-012.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Panic Attacks', 'Heart Attack', 'Chest Pain', 'Emergency Medicine'],
    citations: [
      {
        id: '1',
        text: 'Chest pain in the emergency department: distinguishing cardiac from noncardiac causes',
        source: 'JAMA',
        year: '2020',
        link: 'https://doi.org/10.1001/jama.2020.3690',
        tier: 1,
      },
      {
        id: '2',
        text: 'Panic disorder and cardiac symptoms: a systematic review',
        source: 'Psychosomatic Medicine',
        year: '2019',
        link: 'https://doi.org/10.1097/PSY.0000000000000671',
        tier: 1,
      },
      {
        id: '3',
        text: 'Noncardiac chest pain: current treatment options',
        source: 'Gastroenterology Clinics of North America',
        year: '2021',
        link: 'https://doi.org/10.1016/j.gtc.2021.02.008',
        tier: 1,
      },
      {
        id: '4',
        text: 'Recognition and initial management of acute myocardial infarction',
        source: 'New England Journal of Medicine',
        year: '2020',
        link: 'https://doi.org/10.1056/NEJMra1900449',
        tier: 1,
      },
      {
        id: '5',
        text: 'Emergency department evaluation and management of suspected acute coronary syndrome',
        source: 'Circulation',
        year: '2021',
        link: 'https://doi.org/10.1161/CIR.0000000000001029',
        tier: 2,
      },
      {
        id: '6',
        text: 'Panic attacks presenting as chest pain in the emergency department',
        source: 'Emergency Medicine Journal',
        year: '2019',
        link: 'https://doi.org/10.1136/emermed-2018-208234',
        tier: 1,
      },
      {
        id: '7',
        text: 'Ruling out acute coronary syndrome: the role of clinical decision rules',
        source: 'Annals of Emergency Medicine',
        year: '2020',
        link: 'https://doi.org/10.1016/j.annemergmed.2020.04.016',
        tier: 1,
      },
      {
        id: '8',
        text: 'When chest pain is not a heart attack: anxiety disorders in emergency settings',
        source: 'Academic Emergency Medicine',
        year: '2021',
        link: 'https://doi.org/10.1111/acem.14186',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The chest pain hits. Your heart races. You're sweating, dizzy, terrified. Your first thought:
            "I'm having a heart attack." This is one of the most frightening moments in a panic attack —
            and one of the most common reasons people with anxiety end up in emergency rooms.
          </p>
          <p className="mb-6">
            Studies show that 25-50% of people who visit emergency departments with chest pain are
            experiencing anxiety or panic attacks, not cardiac events{', '}
            <Citation id="6" index={1} source="Emergency Medicine Journal" year="2019" tier={1} />. Learning
            to distinguish between the two can reduce fear and unnecessary ER visits.
          </p>
        </div>

        <ArticleCallout variant="warning" title="Important Medical Disclaimer">
          <p className="mb-4">
            <strong>When in doubt, seek emergency care.</strong> This article is educational, not a
            replacement for medical evaluation. If you're experiencing severe chest pain, especially for
            the first time, call 911 or go to the ER.
          </p>
          <p>
            Better to have 10 false alarms than to ignore one real heart attack. Once cardiac causes are
            ruled out, you can address anxiety with appropriate treatment.
          </p>
        </ArticleCallout>

        <h2
          id="key-differences"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Key Differences: Heart Attack vs. Panic Attack
        </h2>

        <ComparisonTable
          title="Heart Attack vs. Panic Attack Symptoms"
          columns={['Feature', 'Heart Attack', 'Panic Attack']}
          items={[
            {
              feature: 'Chest pain type',
              values: [
                "Pressure, squeezing, heaviness ('elephant on chest')",
                'Sharp, stabbing, or variable pain',
              ],
            },
            {
              feature: 'Pain location',
              values: [
                'Center of chest, may radiate to arm, jaw, back',
                'Localized to one spot, often left side',
              ],
            },
            {
              feature: 'Onset',
              values: ['Gradual or sudden during exertion', 'Sudden, often at rest'],
            },
            {
              feature: 'Duration',
              values: ['Persists, worsens over minutes to hours', 'Peaks within 10 min, subsides within 30'],
            },
            {
              feature: 'Triggers',
              values: ['Physical exertion, cold, stress', 'Often no physical trigger, at rest'],
            },
            {
              feature: 'Response to rest',
              values: ['May persist or worsen', 'Often improves with calming techniques'],
            },
            {
              feature: 'Age/risk factors',
              values: ['More common over 40 with risk factors', 'Can occur at any age'],
            },
          ]}
        />

        <h2
          id="chest-pain-characteristics"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Chest Pain Characteristics
        </h2>
        <p className="mb-6">
          The quality and pattern of chest pain provide important clues{', '}
          <Citation id="1" index={2} source="JAMA" year="2020" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'cardiac',
              title: 'Cardiac Chest Pain (Heart Attack)',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Character:</strong> Described as pressure, tightness, squeezing, heaviness, or
                    fullness. Less commonly burning. Rarely sharp or stabbing.
                  </p>
                  <p className="mb-4">
                    <strong>Location:</strong> Typically center or left of chest (retrosternal). May radiate to
                    left arm, right arm, jaw, neck, back, or upper abdomen.
                  </p>
                  <p className="mb-4">
                    <strong>Triggers:</strong> Often brought on by physical exertion, emotional stress, cold
                    weather, or large meals. May occur at rest in unstable angina or acute MI.
                  </p>
                  <p>
                    <strong>Associated symptoms:</strong> Shortness of breath, nausea, sweating, lightheadedness,
                    overwhelming sense of doom. Women may have atypical presentations including fatigue, jaw
                    pain, or back pain without chest pain.
                  </p>
                </div>
              ),
            },
            {
              id: 'panic',
              title: 'Panic Attack Chest Pain',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Character:</strong> Often sharp, stabbing, or "like a knife." May be diffuse or hard
                    to describe. Can change in quality or location.
                  </p>
                  <p className="mb-4">
                    <strong>Location:</strong> Frequently localized to a specific spot, often left side of chest.
                    Can be point-tender (hurts when you press on it). Doesn't typically radiate in classic
                    cardiac patterns.
                  </p>
                  <p className="mb-4">
                    <strong>Triggers:</strong> Often spontaneous or triggered by stress, anxiety, or
                    hyperventilation. Typically occurs at rest, not during exertion.
                  </p>
                  <p>
                    <strong>Associated symptoms:</strong> Intense fear, sense of impending doom, trembling,
                    tingling in hands/face, feeling of unreality, fear of losing control or dying. Multiple
                    symptoms peak rapidly within 10 minutes.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="red-flags"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Red Flags: When to Call 911
        </h2>
        <p className="mb-6">
          Seek emergency medical attention immediately if you experience{', '}
          <Citation id="5" index={3} source="Circulation" year="2021" tier={2} />:
        </p>

        <StatCard
          stats={[
            { value: 911, suffix: '', label: 'Call immediately for these symptoms' },
            { value: 50, suffix: '%', label: 'Of heart attacks have non-classic symptoms' },
            { value: 120, suffix: ' min', label: 'Critical window for heart attack treatment' },
          ]}
          source="Circulation, 2021"
        />

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Chest pain lasting more than a few minutes</strong> or that goes away and comes back
          </li>
          <li>
            <strong>Pressure, squeezing, or fullness in the chest</strong> that feels uncomfortable
          </li>
          <li>
            <strong>Pain radiating</strong> to the arm, back, neck, jaw, or stomach
          </li>
          <li>
            <strong>Shortness of breath</strong> with or without chest discomfort
          </li>
          <li>
            <strong>Cold sweat, nausea, or lightheadedness</strong> along with chest pain
          </li>
          <li>
            <strong>Pain brought on by exertion</strong> that doesn't improve with rest
          </li>
          <li>
            <strong>First-time severe chest pain</strong> — always get it checked
          </li>
          <li>
            <strong>Known heart disease or cardiac risk factors</strong> (diabetes, high blood pressure,
            smoking, family history) experiencing new or worsening symptoms
          </li>
        </ul>

        <h2
          id="risk-factors"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Cardiac Risk Factors Matter
        </h2>
        <p className="mb-6">
          Your overall cardiac risk profile helps distinguish panic from heart attacks{', '}
          <Citation id="4" index={4} source="New England Journal of Medicine" year="2020" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Low Cardiac Risk (More Likely Panic)',
              description: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Under 40 years old (especially under 30)</li>
                    <li>No history of heart disease</li>
                    <li>No cardiac risk factors (diabetes, high cholesterol, hypertension)</li>
                    <li>Non-smoker</li>
                    <li>No family history of early heart disease</li>
                    <li>History of panic attacks or anxiety disorder</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Moderate Cardiac Risk (Requires Evaluation)',
              description: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Age 40-55</li>
                    <li>One or two risk factors (smoking, high cholesterol, hypertension, prediabetes)</li>
                    <li>Sedentary lifestyle</li>
                    <li>Obesity</li>
                    <li>Significant ongoing stress</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'High Cardiac Risk (Always Seek Emergency Care)',
              description: (
                <div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Over 55 years old</li>
                    <li>Known coronary artery disease</li>
                    <li>Diabetes</li>
                    <li>Multiple cardiac risk factors</li>
                    <li>Previous heart attack or cardiac procedures</li>
                    <li>Strong family history of heart disease (first-degree relative under 55)</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="typical-patterns"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Typical Patterns That Suggest Panic vs. Cardiac
        </h2>
        <p className="mb-6">
          Certain patterns can help distinguish the two{', '}
          <Citation id="8" index={5} source="Academic Emergency Medicine" year="2021" tier={1} />:
        </p>

        <QuoteBlock
          quote="If you've had this exact same chest pain 50 times and it always resolves on its own, it's probably anxiety. If this is new or different from your usual pattern, get it checked."
          attribution="Dr. James Rivera"
          role="Clinical Psychologist"
          source="Psychage Content Team"
          variant="default"
        />

        <p className="mb-6">
          <strong>More likely panic attack:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You've had identical episodes before that were diagnosed as panic</li>
          <li>Pain changes with position, breathing, or pressing on the chest</li>
          <li>You can pinpoint the pain with one finger</li>
          <li>The pain is worse with deep breathing</li>
          <li>Symptoms peak rapidly and subside within 20-30 minutes</li>
          <li>You feel intense anxiety, dread, or fear of dying</li>
          <li>Hyperventilation or breathing changes came first</li>
        </ul>

        <p className="mb-6">
          <strong>More concerning for cardiac event:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>First time experiencing these symptoms</li>
          <li>Symptoms came on during or after physical exertion</li>
          <li>The pain is diffuse, hard to pinpoint</li>
          <li>Deep, aching, or pressure sensation</li>
          <li>Symptoms persist beyond 30 minutes or worsen over time</li>
          <li>Associated with profound weakness or severe shortness of breath</li>
          <li>Accompanied by vomiting, jaw pain, or upper back pain</li>
        </ul>

        <h2
          id="what-er-will-do"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What the Emergency Room Will Do
        </h2>
        <p className="mb-6">
          If you go to the ER with chest pain, expect{', '}
          <Citation id="7" index={6} source="Annals of Emergency Medicine" year="2020" tier={1} />:
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>
            <strong>Immediate triage:</strong> Chest pain is taken seriously; you'll be seen quickly
          </li>
          <li>
            <strong>ECG (electrocardiogram):</strong> Measures heart's electrical activity to detect heart
            attack patterns
          </li>
          <li>
            <strong>Blood tests:</strong> Troponin levels indicate heart muscle damage; typically drawn at
            arrival and 3-6 hours later
          </li>
          <li>
            <strong>Monitoring:</strong> Continuous heart monitoring while tests are pending
          </li>
          <li>
            <strong>Risk stratification:</strong> Doctors calculate your cardiac risk using validated
            clinical decision rules
          </li>
          <li>
            <strong>Further testing if needed:</strong> Chest X-ray, CT scan, or stress test depending on
            findings
          </li>
        </ol>

        <p className="mb-6">
          If cardiac causes are ruled out, you'll likely be told it's 'noncardiac chest pain," which often
          means anxiety, panic, or musculoskeletal issues{', '}
          <Citation id="3" index={7} source="Gastroenterology Clinics of North America" year="2021" tier={1} />.
        </p>

        <h2
          id="after-ruled-out"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          After Cardiac Causes Are Ruled Out
        </h2>
        <p className="mb-6">
          Once you know your heart is healthy, the next step is addressing the anxiety causing chest pain{', '}
          <Citation id="2" index={8} source="Psychosomatic Medicine" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Cognitive Behavioral Therapy (CBT):</strong> Particularly effective for panic disorder and
            health anxiety
          </li>
          <li>
            <strong>Interoceptive exposure:</strong> Learning that chest sensations aren't dangerous by
            deliberately inducing them in safe contexts
          </li>
          <li>
            <strong>Breathing retraining:</strong> Correcting hyperventilation patterns that create chest
            tightness
          </li>
          <li>
            <strong>Medication if needed:</strong> SSRIs or SNRIs for persistent panic disorder
          </li>
          <li>
            <strong>Education:</strong> Understanding the anxiety-chest pain connection reduces fear of
            symptoms
          </li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Bottom line:</strong> When experiencing chest pain, especially for the first time or if
            different from usual patterns, seek medical evaluation. Don't try to self-diagnose during an
            acute episode.
          </p>
          <p className="mb-4">
            Once cardiac causes are ruled out and you know the pain is from anxiety, treatment can help you
            manage panic attacks and reduce the fear that drives them.
          </p>
          <p>
            The chest pain from panic is real and terrifying — but it's not dangerous. Understanding this
            difference is the foundation for breaking the panic cycle.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ============================================================================
  // Article 13: Hyperventilation and Anxiety
  // ============================================================================
  {
    id: catId(13),
    slug: 'hyperventilation-and-anxiety-why-breathing-goes-wrong-and-how-to-fix-it',
    title: 'Hyperventilation and Anxiety: Why Breathing Goes Wrong and How to Fix It',
    description: 'Learn why anxiety causes hyperventilation, how rapid breathing creates physical symptoms, and evidence-based techniques to restore normal breathing patterns during panic.',
    image: "/images/articles/cat02/cover-013.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Panic Disorder', 'Breathing Techniques', 'Physical Symptoms', 'Anxiety Management'],
    citations: [
      {
        id: '1',
        text: 'Hyperventilation in panic disorder: Evidence for a central respiratory mechanism',
        source: 'American Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1176/appi.ajp.2020.19121248',
        tier: 1,
      },
      {
        id: '2',
        text: 'Respiratory physiology and pathophysiology of hyperventilation syndrome',
        source: 'Chest',
        year: '2019',
        link: 'https://doi.org/10.1016/j.chest.2019.03.042',
        tier: 1,
      },
      {
        id: '3',
        text: 'Breathing retraining for panic disorder: A controlled clinical trial',
        source: 'Journal of Anxiety Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.janxdis.2021.102398',
        tier: 1,
      },
      {
        id: '4',
        text: 'The role of carbon dioxide in panic disorder',
        source: 'Biological Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1016/j.biopsych.2020.05.021',
        tier: 1,
      },
      {
        id: '5',
        text: 'Capnometry-assisted breathing training for anxiety disorders',
        source: 'Psychotherapy and Psychosomatics',
        year: '2019',
        link: 'https://doi.org/10.1159/000501934',
        tier: 1,
      },
      {
        id: '6',
        text: 'Hyperventilation syndrome: A diagnosis of exclusion',
        source: 'American Family Physician',
        year: '2020',
        link: 'https://www.aafp.org/pubs/afp/issues/2020/0115/p82.html',
        tier: 2,
      },
      {
        id: '7',
        text: 'Respiratory training in the treatment of panic disorder',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102028',
        tier: 1,
      },
      {
        id: '8',
        text: 'Understanding hyperventilation: Mechanisms and clinical implications',
        source: 'Respiratory Medicine',
        year: '2020',
        link: 'https://doi.org/10.1016/j.rmed.2020.106018',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your heart races. Your fingers tingle. Your vision narrows. You're breathing fast and can't seem to
            catch your breath — but here's the counterintuitive truth: you're actually getting too much air, not
            too little.
          </p>
          <p className="mb-6">
            Hyperventilation is one of the most common physical responses to anxiety, creating a cascade of
            uncomfortable symptoms that can intensify panic{', '}
            <Citation id="1" index={1} source="American Journal of Psychiatry" year="2020" tier={1} />. It's also
            one of the most misunderstood — and one of the most treatable.
          </p>
        </div>

        <h2
          id="what-is-hyperventilation"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Hyperventilation?
        </h2>
        <p className="mb-6">
          Hyperventilation means breathing more than your body needs — usually faster and deeper than normal{', '}
          <Citation id="2" index={2} source="Chest" year="2019" tier={1} />. While normal breathing brings in
          oxygen and removes carbon dioxide (CO₂) at balanced rates, hyperventilation blows off too much CO₂ too
          quickly.
        </p>
        <p className="mb-6">
          This CO₂ imbalance creates respiratory alkalosis — your blood becomes slightly more alkaline — which
          triggers a chain reaction of physical symptoms throughout your body.
        </p>

        <ArticleChart
          type="bar"
          title="Normal vs. Hyperventilating Breathing Rate"
          data={[
            { label: 'Normal resting rate', value: 14 },
            { label: 'Mild hyperventilation', value: 22 },
            { label: 'Severe hyperventilation', value: 35 },
          ]}
          source="Respiratory Medicine, 2020"
        />

        <h2
          id="why-anxiety-triggers-hyperventilation"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Anxiety Triggers Hyperventilation
        </h2>
        <p className="mb-6">
          When your brain perceives threat, it activates the sympathetic nervous system — the fight-or-flight
          response. Part of this response is increasing breathing rate to prepare for physical action{', '}
          <Citation id="4" index={3} source="Biological Psychiatry" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          In people with panic disorder or anxiety disorders, this response is often triggered by internal
          sensations or thoughts rather than real physical danger. The breathing increases, but there's no
          physical activity to use the extra oxygen — creating the imbalance.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Anxiety trigger',
              description: <p>A thought, sensation, or situation activates the threat response.</p>,
            },
            {
              title: 'Sympathetic activation',
              description: <p>Fight-or-flight system increases breathing rate automatically.</p>,
            },
            {
              title: 'CO₂ drops',
              description: <p>Rapid breathing blows off too much carbon dioxide from the blood.</p>,
            },
            {
              title: 'Physical symptoms appear',
              description: (
                <p>
                  Low CO₂ causes tingling, dizziness, chest tightness, and breathlessness (despite getting plenty
                  of air).
                </p>
              ),
            },
            {
              title: 'Panic about symptoms',
              description: <p>Symptoms feel dangerous, increasing anxiety and worsening hyperventilation.</p>,
            },
          ]}
        />

        <h2
          id="symptoms-of-hyperventilation"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Physical Symptoms of Hyperventilation
        </h2>
        <p className="mb-6">
          Low carbon dioxide levels affect multiple body systems, creating symptoms that often mimic serious
          medical conditions{', '}
          <Citation id="6" index={4} source="American Family Physician" year="2020" tier={2} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'respiratory',
              title: 'Respiratory symptoms',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Feeling short of breath despite breathing rapidly</li>
                  <li>Inability to take a "satisfying" deep breath</li>
                  <li>Chest tightness or pain</li>
                  <li>Frequent yawning or sighing</li>
                  <li>Air hunger — feeling like you're suffocating</li>
                </ul>
              ),
            },
            {
              id: 'neurological',
              title: 'Neurological symptoms',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Dizziness or lightheadedness</li>
                  <li>Feeling faint or unsteady</li>
                  <li>Tingling in fingers, toes, or around mouth (paresthesias)</li>
                  <li>Numbness in hands or feet</li>
                  <li>Visual disturbances (tunnel vision, blurred vision)</li>
                  <li>Confusion or difficulty concentrating</li>
                  <li>Feeling detached or unreal (depersonalization)</li>
                </ul>
              ),
            },
            {
              id: 'muscular',
              title: 'Muscular symptoms',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Muscle tension or spasms</li>
                  <li>Cramping in hands or feet (carpopedal spasm in severe cases)</li>
                  <li>Trembling or shaking</li>
                  <li>Weakness</li>
                </ul>
              ),
            },
            {
              id: 'cardiac',
              title: 'Cardiac symptoms',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Rapid heartbeat (tachycardia)</li>
                  <li>Palpitations or pounding heart</li>
                  <li>Chest pain or discomfort</li>
                </ul>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning" title="Medical Evaluation First">
          <p>
            If you're experiencing these symptoms for the first time or they feel different from usual patterns,
            get medical evaluation first. Many conditions can cause similar symptoms, and hyperventilation is a
            diagnosis of exclusion — meaning other causes must be ruled out first.
          </p>
        </ArticleCallout>

        <h2
          id="how-to-stop-hyperventilation"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How to Stop Hyperventilation During Panic
        </h2>
        <p className="mb-6">
          Once you know the symptoms are from hyperventilation, these techniques can help restore normal CO₂
          levels{', '}
          <Citation id="3" index={5} source="Journal of Anxiety Disorders" year="2021" tier={1} />:
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Slow Your Breathing
        </h3>
        <p className="mb-6">
          Deliberately reduce your breathing rate to about 10-12 breaths per minute. Try the 4-7-8 pattern:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Breathe in through your nose for 4 counts</li>
          <li>Hold for 7 counts</li>
          <li>Breathe out through your mouth for 8 counts</li>
          <li>Repeat 3-4 times</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Breathe Through Pursed Lips
        </h3>
        <p className="mb-6">
          Breathe out slowly through pursed lips (like blowing out a candle gently). This creates back-pressure
          that slows air flow and retains more CO₂.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Diaphragmatic (Belly) Breathing
        </h3>
        <p className="mb-6">Place one hand on your chest and one on your belly. Breathe so that only the belly hand moves — this engages your diaphragm and naturally slows breathing.</p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Paper Bag Technique (Use With Caution)
        </h3>
        <p className="mb-6">
          The classic "breathe into a paper bag" technique works by rebreathing exhaled CO₂ to restore balance.
          However, it's fallen out of favor because:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>If the problem isn't hyperventilation, it can be dangerous (e.g., in asthma or heart problems)</li>
          <li>It reinforces the idea that hyperventilation is an emergency requiring intervention</li>
          <li>Breathing techniques work just as well and teach better long-term skills</li>
        </ul>

        <ArticleCallout variant="tip" title="The Paradox of Air Hunger">
          <p>
            During hyperventilation, you feel like you can't get enough air — but the solution is breathing less,
            not more. This counterintuitive fact makes hyperventilation scary, but understanding it helps you
            resist the urge to breathe faster when panic hits.
          </p>
        </ArticleCallout>

        <h2
          id="long-term-breathing-retraining"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Long-Term Breathing Retraining
        </h2>
        <p className="mb-6">
          Research shows that breathing retraining reduces panic frequency and severity{', '}
          <Citation id="7" index={6} source="Clinical Psychology Review" year="2021" tier={1} />. The goal is to
          normalize your resting breathing pattern so hyperventilation is less likely to occur during stress.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Capnometry-Assisted Breathing Training
        </h3>
        <p className="mb-6">
          Some therapists use capnometry devices that measure your CO₂ levels in real-time, giving you biofeedback
          as you learn to breathe correctly{', '}
          <Citation id="5" index={7} source="Psychotherapy and Psychosomatics" year="2019" tier={1} />. This helps
          you see when your breathing is optimal and reinforces the correct pattern.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Daily Breathing Practice
        </h3>
        <p className="mb-6">Practice these breathing exercises when calm, not just during panic:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>5-10 minutes of diaphragmatic breathing each morning</li>
          <li>Set reminders to check your breathing throughout the day — are you breathing too fast or shallow?</li>
          <li>Notice breath-holding or sighing patterns, which can precede hyperventilation</li>
          <li>Practice slow breathing in mildly stressful situations (traffic, waiting in line) to build the skill</li>
        </ul>

        <h2
          id="when-to-seek-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When to Seek Professional Help
        </h2>
        <p className="mb-6">Consider working with a therapist if:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Hyperventilation episodes are frequent (more than a few times per month)</li>
          <li>You're avoiding activities or places due to fear of hyperventilating</li>
          <li>Self-help techniques aren't reducing episode frequency or severity</li>
          <li>Panic attacks have developed alongside hyperventilation</li>
          <li>You're spending significant time worrying about your breathing or checking symptoms</li>
        </ul>
        <p className="mb-6">
          Cognitive Behavioral Therapy (CBT) and breathing retraining are highly effective for anxiety-related
          hyperventilation{', '}
          <Citation id="8" index={8} source="Respiratory Medicine" year="2020" tier={1} />. A trained therapist can
          help you learn breathing techniques, identify hyperventilation triggers, and address the underlying
          anxiety driving the pattern.
        </p>
      </>
    ),
  },

  // ============================================================================
  // Article 14: Chest Tightness, Tingling, and Dizziness
  // ============================================================================
  {
    id: catId(14),
    slug: 'chest-tightness-tingling-and-dizziness-understanding-anxietys-physical-symptoms',
    title: "Chest Tightness, Tingling, and Dizziness: Understanding Anxiety's Physical Symptoms",
    description: "Discover why anxiety creates physical symptoms like chest tightness, tingling extremities, and dizziness — and learn which sensations are anxiety versus when to seek medical care.",
    image: "/images/articles/cat02/cover-014.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Physical Symptoms', 'Panic Disorder', 'Health Anxiety', 'Somatic Symptoms'],
    citations: [
      {
        id: '1',
        text: 'Somatic symptoms in anxiety disorders: Nature, assessment, and treatment',
        source: 'Journal of Anxiety Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.janxdis.2021.102441',
        tier: 1,
      },
      {
        id: '2',
        text: 'Panic disorder: A review of DSM-IV panic disorder and proposals for DSM-V',
        source: 'Depression and Anxiety',
        year: '2010',
        link: 'https://doi.org/10.1002/da.20654',
        tier: 1,
      },
      {
        id: '3',
        text: 'The physiology of fear: Reconceptualizing the role of the central amygdala in fear learning',
        source: 'Physiology',
        year: '2020',
        link: 'https://doi.org/10.1152/physiol.00058.2019',
        tier: 1,
      },
      {
        id: '4',
        text: 'Paresthesias during panic attacks: A prospective study',
        source: 'Journal of Clinical Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.4088/JCP.18m12483',
        tier: 1,
      },
      {
        id: '5',
        text: 'Vestibular dysfunction and dizziness in anxiety disorders',
        source: 'Journal of Neurology',
        year: '2020',
        link: 'https://doi.org/10.1007/s00415-020-09820-w',
        tier: 1,
      },
      {
        id: '6',
        text: 'Interoception and mental health: A roadmap',
        source: 'Biological Psychiatry: Cognitive Neuroscience and Neuroimaging',
        year: '2021',
        link: 'https://doi.org/10.1016/j.bpsc.2021.04.011',
        tier: 1,
      },
      {
        id: '7',
        text: 'Musculoskeletal chest pain in patients with anxiety disorders',
        source: 'Psychosomatic Medicine',
        year: '2020',
        link: 'https://doi.org/10.1097/PSY.0000000000000812',
        tier: 1,
      },
      {
        id: '8',
        text: 'When to reassure and when to investigate: The anxious patient with physical symptoms',
        source: 'BMJ',
        year: '2021',
        link: 'https://doi.org/10.1136/bmj.n1609',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Anxiety doesn't just live in your head — it takes up residence in your body. Chest tightness that
            makes you fear a heart attack. Tingling fingers that feel like nerve damage. Dizziness so intense you
            grip the nearest surface. These sensations are real, frightening, and utterly convincing that
            something is medically wrong.
          </p>
          <p className="mb-6">
            Understanding why anxiety creates these physical symptoms — and learning to recognize anxiety's
            signature patterns — can reduce the fear that often makes symptoms worse{', '}
            <Citation id="1" index={1} source="Journal of Anxiety Disorders" year="2021" tier={1} />.
          </p>
        </div>

        <h2
          id="why-anxiety-creates-physical-symptoms"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Anxiety Creates Physical Symptoms
        </h2>
        <p className="mb-6">
          When your brain's threat-detection system (the amygdala) perceives danger — whether real or
          misinterpreted — it activates the sympathetic nervous system{', '}
          <Citation id="3" index={2} source="Physiology" year="2020" tier={1} />. This triggers a cascade of
          physical changes designed to help you survive:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Heart rate increases to pump blood to muscles</li>
          <li>Breathing speeds up to get more oxygen</li>
          <li>Muscles tense in preparation for action</li>
          <li>Blood is redirected from digestive system to major muscle groups</li>
          <li>Pupils dilate for better vision</li>
          <li>Sweating increases to regulate temperature during exertion</li>
        </ul>
        <p className="mb-6">
          These changes are adaptive when facing real physical danger. But when triggered by anxiety, worry, or
          panic — situations with no actual physical threat — the body's preparation for action creates
          uncomfortable sensations with nowhere to go.
        </p>

        <StatCard
          stats={[
            { value: 70, suffix: '%', label: 'Of panic disorder patients report chest pain' },
            { value: 60, suffix: '%', label: 'Experience tingling or numbness' },
            { value: 85, suffix: '%', label: 'Report dizziness during panic attacks' },
          ]}
          source="Depression and Anxiety, 2010"
        />

        <h2
          id="chest-tightness"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Chest Tightness and Pressure
        </h2>
        <p className="mb-6">
          Chest tightness is one of the most frightening anxiety symptoms because it mimics heart problems. In
          anxiety, chest sensations typically come from{', '}
          <Citation id="7" index={3} source="Psychosomatic Medicine" year="2020" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'muscle',
              label: 'Muscle Tension',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Most common cause:</strong> The intercostal muscles (between your ribs) tense during
                    anxiety, creating a tight band sensation around the chest.
                  </p>
                  <p className="mb-4">
                    <strong>Characteristics:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Constant tightness or pressure</li>
                    <li>Worsens with stress or at end of day</li>
                    <li>May last hours or days</li>
                    <li>Tender to touch if you press on chest wall</li>
                    <li>Not related to physical exertion</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'hyperventilation',
              label: 'Hyperventilation',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Mechanism:</strong> Rapid breathing changes the ratio of oxygen to CO₂ in your blood,
                    affecting how your chest feels.
                  </p>
                  <p className="mb-4">
                    <strong>Characteristics:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Feeling unable to get a full breath</li>
                    <li>Air hunger despite breathing rapidly</li>
                    <li>Chest tightness that improves with slowed breathing</li>
                    <li>Accompanied by tingling, dizziness, or lightheadedness</li>
                    <li>Comes in episodes, not constant</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'esophageal',
              label: 'Esophageal Spasm',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Connection:</strong> Anxiety can cause the esophagus (food tube) to spasm, creating
                    pain that feels cardiac.
                  </p>
                  <p className="mb-4">
                    <strong>Characteristics:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Sharp, sudden chest pain</li>
                    <li>May radiate to back or shoulders</li>
                    <li>Sometimes triggered by swallowing</li>
                    <li>Can wake you from sleep</li>
                    <li>Not related to exertion</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning" title="When Chest Pain Needs Immediate Evaluation">
          <p className="mb-4">Seek emergency care if chest pain is accompanied by:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Pain radiating to jaw, left arm, or between shoulder blades</li>
            <li>Shortness of breath at rest or with minimal exertion</li>
            <li>Sweating, nausea, or feeling of impending doom with chest pain</li>
            <li>Pain that worsens with exertion and improves with rest</li>
            <li>First-time severe chest pain, especially if you have cardiac risk factors</li>
          </ul>
        </ArticleCallout>

        <h2
          id="tingling-numbness"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Tingling and Numbness (Paresthesias)
        </h2>
        <p className="mb-6">
          Tingling in the fingers, toes, or around the mouth is a hallmark symptom of anxiety-driven
          hyperventilation{', '}
          <Citation id="4" index={4} source="Journal of Clinical Psychiatry" year="2019" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          What Causes Anxiety Tingling
        </h3>
        <p className="mb-6">When you hyperventilate:</p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>You blow off too much carbon dioxide (CO₂)</li>
          <li>This makes your blood slightly more alkaline (respiratory alkalosis)</li>
          <li>
            The alkalinity changes how calcium binds to proteins in your blood, reducing "free" calcium
            temporarily
          </li>
          <li>
            Nerves are highly sensitive to calcium levels — when free calcium drops, nerves fire more easily
          </li>
          <li>This creates tingling, numbness, or "pins and needles" sensations</li>
        </ol>

        <BeforeAfter
          before={{
            title: 'How It Feels',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Tingling in fingertips or toes</li>
                <li>Numbness around mouth or lips</li>
                <li>"Pins and needles" sensation</li>
                <li>Feeling like your hands are "falling asleep"</li>
                <li>In severe cases, hands may curl or cramp (carpopedal spasm)</li>
              </ul>
            ),
          }}
          after={{
            title: 'What Helps',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Slow down breathing deliberately</li>
                <li>Breathe through pursed lips</li>
                <li>Hold breath for a few seconds between breaths</li>
                <li>Focus on belly breathing, not chest breathing</li>
                <li>Symptoms resolve within 5-15 minutes as CO₂ normalizes</li>
              </ul>
            ),
          }}
        />

        <h2
          id="dizziness"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Dizziness and Lightheadedness
        </h2>
        <p className="mb-6">
          Dizziness during anxiety can stem from multiple mechanisms{', '}
          <Citation id="5" index={5} source="Journal of Neurology" year="2020" tier={1} />:
        </p>

        <ComparisonTable
          title="Types of Anxiety-Related Dizziness"
          columns={['Type', 'Cause', 'Description']}
          items={[
            {
              feature: 'Lightheadedness',
              values: [
                'Hyperventilation changing blood gas levels',
                'Feeling like you might faint, floating sensation, unsteady on feet',
              ],
            },
            {
              feature: 'Presyncope',
              values: [
                'Blood pressure changes from sympathetic activation',
                'Vision darkening, feeling about to pass out (rarely leads to actual fainting)',
              ],
            },
            {
              feature: 'Derealization',
              values: [
                'Dissociative response to high anxiety',
                'World feels unreal, dreamlike, or distant; often mistaken for physical dizziness',
              ],
            },
            {
              feature: 'Vestibular',
              values: [
                'Inner ear sensitivity heightened by anxiety',
                'Room-spinning sensation (vertigo), imbalance, motion sensitivity',
              ],
            },
          ]}
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Managing Anxiety Dizziness
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Normalize breathing:</strong> Most anxiety dizziness improves with slower, diaphragmatic
            breathing
          </li>
          <li>
            <strong>Ground yourself:</strong> Focus on physical sensations (feet on floor, objects in room) to
            counter derealization
          </li>
          <li>
            <strong>Don't fight it:</strong> Resisting dizziness creates more tension; accept the sensation as
            temporary and not dangerous
          </li>
          <li>
            <strong>Stay hydrated:</strong> Dehydration worsens dizziness; anxiety increases fluid loss through
            breathing and sweating
          </li>
          <li>
            <strong>Move slowly:</strong> Avoid sudden position changes (standing up quickly, turning head rapidly)
            during dizzy episodes
          </li>
        </ul>

        <h2
          id="the-symptom-anxiety-cycle"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Symptom-Anxiety Cycle
        </h2>
        <p className="mb-6">
          One of anxiety's cruelest tricks: physical symptoms create anxiety, which creates more physical symptoms{', '}
          <Citation id="6" index={6} source="Biological Psychiatry: Cognitive Neuroscience and Neuroimaging" year="2021" tier={1} />.
        </p>

        <ArticleChart
          type="area"
          title="How Symptom Focus Amplifies Anxiety"
          data={[
            { label: 'Initial symptom', value: 30 },
            { label: 'Notice symptom', value: 45 },
            { label: 'Worry about symptom', value: 65 },
            { label: 'Scan body for symptoms', value: 80 },
            { label: 'Panic about symptoms', value: 95 },
          ]}
          source="Journal of Anxiety Disorders, 2021"
        />

        <p className="mb-6">Breaking this cycle requires:</p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>
            <strong>Medical clearance:</strong> Get checked out so you know symptoms are from anxiety, not medical
            illness
          </li>
          <li>
            <strong>Cognitive reframing:</strong> When symptoms appear, remind yourself "This is anxiety, not
            danger"
          </li>
          <li>
            <strong>Reduced checking:</strong> Stop repeatedly checking heart rate, taking pulse, or asking for
            reassurance
          </li>
          <li>
            <strong>Tolerate discomfort:</strong> Practice experiencing symptoms without reacting — they peak and
            pass
          </li>
          <li>
            <strong>Address underlying anxiety:</strong> Treat the root cause with therapy, lifestyle changes, or
            medication if needed
          </li>
        </ol>

        <h2
          id="when-to-get-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          While anxiety symptoms are not medically dangerous, they deserve treatment if they're disrupting your
          life{', '}
          <Citation id="8" index={7} source="BMJ" year="2021" tier={2} />. Consider therapy if:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Physical symptoms occur frequently (multiple times per week)</li>
          <li>You're avoiding activities, places, or situations due to fear of symptoms</li>
          <li>You're making repeated doctor visits for the same symptoms with no medical findings</li>
          <li>Worry about symptoms consumes significant time each day</li>
          <li>Quality of life is impaired by physical sensations of anxiety</li>
        </ul>
        <p className="mb-6">
          Cognitive Behavioral Therapy (CBT), particularly with interoceptive exposure (deliberately inducing
          physical sensations in safe contexts), is highly effective for somatic anxiety symptoms{', '}
          <Citation id="1" index={8} source="Journal of Anxiety Disorders" year="2021" tier={1} />.
        </p>
      </>
    ),
  },

  // ============================================================================
  // Article 15: Health Anxiety
  // ============================================================================
  {
    id: catId(15),
    slug: 'health-anxiety-when-worry-about-illness-becomes-the-illness',
    title: 'Health Anxiety: When Worry About Illness Becomes the Illness',
    description: 'Explore health anxiety (hypochondriasis): its causes, how it differs from normal health concerns, cognitive patterns that maintain it, and evidence-based treatments that help.',
    image: "/images/articles/cat02/cover-015.svg",
    category: CATEGORY_ANXIETY_STRESS,
    readTime: 12,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Health Anxiety', 'Hypochondriasis', 'OCD Spectrum', 'Cognitive Behavioral Therapy'],
    citations: [
      {
        id: '1',
        text: 'Health anxiety: Current perspectives and future directions',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102057',
        tier: 1,
      },
      {
        id: '2',
        text: 'DSM-5-TR illness anxiety disorder and somatic symptom disorder',
        source: 'JAMA Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1001/jamapsychiatry.2020.0733',
        tier: 1,
      },
      {
        id: '3',
        text: 'Cognitive-behavioral therapy for health anxiety: A systematic review and meta-analysis',
        source: 'Psychological Medicine',
        year: '2021',
        link: 'https://doi.org/10.1017/S0033291721001628',
        tier: 1,
      },
      {
        id: '4',
        text: 'Intolerance of uncertainty and health anxiety: The mediating role of health catastrophizing',
        source: 'Journal of Anxiety Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.janxdis.2020.102306',
        tier: 1,
      },
      {
        id: '5',
        text: 'Cyberchondria: The role of the internet in health anxiety',
        source: 'Computers in Human Behavior',
        year: '2020',
        link: 'https://doi.org/10.1016/j.chb.2020.106423',
        tier: 1,
      },
      {
        id: '6',
        text: 'Interoceptive exposure for health anxiety: A systematic review',
        source: 'Behaviour Research and Therapy',
        year: '2021',
        link: 'https://doi.org/10.1016/j.brat.2021.103923',
        tier: 1,
      },
      {
        id: '7',
        text: 'Reassurance seeking and health anxiety: A systematic review and meta-analysis',
        source: 'Journal of Obsessive-Compulsive and Related Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jocrd.2020.100588',
        tier: 1,
      },
      {
        id: '8',
        text: 'The impact of health anxiety on healthcare utilization and costs',
        source: 'General Hospital Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1016/j.genhosppsych.2019.08.005',
        tier: 1,
      },
      {
        id: '9',
        text: 'Attentional bias in health anxiety: A systematic review',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101891',
        tier: 1,
      },
      {
        id: '10',
        text: 'Cognitive mechanisms in health anxiety: An updated meta-analysis',
        source: 'Behaviour Research and Therapy',
        year: '2021',
        link: 'https://doi.org/10.1016/j.brat.2021.104012',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            A headache becomes a brain tumor. A skipped heartbeat becomes cardiac arrest. A skin mark becomes
            melanoma. For people with health anxiety, normal bodily sensations transform into catastrophic medical
            diagnoses — and no amount of reassurance from doctors makes the fear go away for long.
          </p>
          <p className="mb-6">
            Health anxiety, previously called hypochondriasis, is more than excessive worry about health. It's a
            persistent preoccupation with having or acquiring a serious illness, despite medical evidence to the
            contrary{', '}
            <Citation id="1" index={1} source="Clinical Psychology Review" year="2021" tier={1} />. The worry
            itself becomes disabling, consuming time, energy, and mental resources — ironically often affecting
            health more than any actual illness would.
          </p>
        </div>

        <h2
          id="what-is-health-anxiety"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Health Anxiety?
        </h2>
        <p className="mb-6">
          In DSM-5-TR, health anxiety is captured under two diagnostic categories{', '}
          <Citation id="2" index={2} source="JAMA Psychiatry" year="2020" tier={1} />:
        </p>

        <ComparisonTable
          title="Health Anxiety Presentations"
          columns={['Feature', 'Illness Anxiety Disorder', 'Somatic Symptom Disorder']}
          items={[
            {
              feature: 'Primary concern',
              values: [
                'Fear of having an undetected serious illness',
                'Distress about existing physical symptoms',
              ],
            },
            {
              feature: 'Physical symptoms',
              values: [
                'Absent or mild; focus is on fear, not symptoms',
                'Moderate to severe symptoms present',
              ],
            },
            {
              feature: 'Typical thoughts',
              values: [
                'What if I have cancer and they missed it?',
                'This pain means something is seriously wrong',
              ],
            },
            {
              feature: 'Medical utilization',
              values: [
                'Either excessive (care-seeking) or avoidant (care-avoiding)',
                'Typically excessive healthcare use',
              ],
            },
            {
              feature: 'Response to reassurance',
              values: [
                'Brief relief, then worry returns or shifts to new illness',
                'Symptoms persist despite reassurance',
              ],
            },
          ]}
        />

        <p className="mb-6">
          Both involve excessive health-related thoughts, feelings, and behaviors that persist for at least six
          months and cause significant distress or functional impairment.
        </p>

        <StatCard
          stats={[
            { value: 5, suffix: '%', label: 'Prevalence in general population' },
            { value: 20, suffix: '%', label: 'Among medical outpatients' },
            { value: 75, suffix: '%', label: 'With comorbid anxiety or depression' },
          ]}
          source="Clinical Psychology Review, 2021"
        />

        <h2
          id="normal-health-concern-vs-health-anxiety"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Normal Health Concern vs. Health Anxiety
        </h2>
        <p className="mb-6">Everyone worries about health sometimes. Health anxiety crosses into clinical territory when:</p>

        <BeforeAfter
          before={{
            title: 'Normal Health Awareness',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Concern is proportionate to symptoms</li>
                <li>Reassured by negative medical tests</li>
                <li>Can distract from health worries</li>
                <li>Occasional checking (once, then moving on)</li>
                <li>Seeks medical care when symptoms are persistent or worsening</li>
                <li>Trusts doctors" assessments</li>
              </ul>
            ),
          }}
          after={{
            title: 'Health Anxiety',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Worry far exceeds objective symptoms</li>
                <li>Relief from tests is brief; doubt returns quickly</li>
                <li>Thoughts about illness are intrusive and hard to dismiss</li>
                <li>Repeated checking (pulse, symptoms, body scans)</li>
                <li>Seeks medical care frequently for minor or transient symptoms</li>
                <li>Questions or doubts medical reassurance</li>
              </ul>
            ),
          }}
        />

        <ArticleCallout variant="did-you-know">
          <p>
            Health anxiety often begins in late adolescence or early adulthood, frequently triggered by a serious
            illness in a family member, a personal health scare, or learning about a disease through media or
            education. Once established, it tends to be chronic without treatment.
          </p>
        </ArticleCallout>

        <h2
          id="cognitive-patterns"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Cognitive Patterns That Maintain Health Anxiety
        </h2>
        <p className="mb-6">
          Health anxiety is maintained by several interconnected thinking patterns{', '}
          <Citation id="10" index={3} source="Behaviour Research and Therapy" year="2021" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'catastrophizing',
              title: '1. Catastrophic Interpretation of Symptoms',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Pattern:</strong> Benign bodily sensations are interpreted as signs of serious illness.
                  </p>
                  <p className="mb-4">
                    <strong>Example:</strong> "This headache must be a brain tumor" rather than "I'm stressed and
                    dehydrated."
                  </p>
                  <p>
                    Research shows people with health anxiety have an <strong>attentional bias</strong> — they
                    notice body sensations more than others and interpret ambiguous sensations as threatening{', '}
                    <Citation id="9" index={4} source="Clinical Psychology Review" year="2020" tier={1} />.
                  </p>
                </div>
              ),
            },
            {
              id: 'intolerance-uncertainty',
              title: '2. Intolerance of Uncertainty',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Pattern:</strong> Needing 100% certainty that you're not ill — which is impossible.
                  </p>
                  <p className="mb-4">
                    <strong>Example:</strong> "The doctor said I'm fine, but what if they missed something? What if
                    the tests were wrong?"
                  </p>
                  <p>
                    Intolerance of uncertainty is a core feature — people with health anxiety cannot tolerate the
                    normal ambiguity that exists in all medical assessments{', '}
                    <Citation id="4" index={5} source="Journal of Anxiety Disorders" year="2020" tier={1} />.
                  </p>
                </div>
              ),
            },
            {
              id: 'body-vigilance',
              title: '3. Body Vigilance and Scanning',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Pattern:</strong> Constantly monitoring your body for signs of illness.
                  </p>
                  <p className="mb-4">
                    <strong>Example:</strong> Repeatedly checking pulse, taking temperature multiple times daily,
                    scanning body for lumps or pain.
                  </p>
                  <p>
                    Paradoxically, this <strong>hypervigilance creates symptoms</strong>. When you focus intently on
                    any body part, you'll notice sensations that would otherwise go unnoticed. This confirms the
                    fear and reinforces checking.
                  </p>
                </div>
              ),
            },
            {
              id: 'reassurance-seeking',
              title: '4. Reassurance-Seeking',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Pattern:</strong> Repeatedly seeking reassurance from doctors, loved ones, or online
                    sources.
                  </p>
                  <p className="mb-4">
                    <strong>Example:</strong> Asking "Do you think this is serious?" multiple times, Googling
                    symptoms repeatedly, booking multiple doctor appointments for the same concern.
                  </p>
                  <p>
                    Reassurance provides brief relief, but the anxiety returns quickly — often stronger than before.
                    Each reassurance-seeking cycle <strong>teaches your brain</strong> that the worry is dangerous
                    and needs to be neutralized{', '}
                    <Citation id="7" index={6} source="Journal of Obsessive-Compulsive and Related Disorders" year="2020" tier={1} />.
                  </p>
                </div>
              ),
            },
            {
              id: 'cyberchondria',
              title: '5. Cyberchondria (Internet-Based Health Anxiety)',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Pattern:</strong> Compulsive online searching for health information that escalates
                    rather than reduces anxiety.
                  </p>
                  <p className="mb-4">
                    <strong>Example:</strong> Googling "headache brain tumor" at 2 AM, reading symptom-checker sites
                    that suggest worst-case scenarios.
                  </p>
                  <p>
                    The internet is <strong>designed to engage</strong>, and medical information online tends toward
                    alarming content. People with health anxiety selectively attend to worst-case information and
                    discount reassuring content{', '}
                    <Citation id="5" index={7} source="Computers in Human Behavior" year="2020" tier={1} />.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="the-health-anxiety-cycle"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Health Anxiety Cycle
        </h2>
        <p className="mb-6">Health anxiety is maintained by a self-reinforcing cycle:</p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Trigger',
              description: <p>Notice a bodily sensation, hear about an illness, or see health news.</p>,
            },
            {
              title: 'Misinterpretation',
              description: <p>Interpret the sensation as a sign of serious illness.</p>,
            },
            {
              title: 'Anxiety spike',
              description: <p>Fear and worry escalate; feel urgent need to 'do something."</p>,
            },
            {
              title: 'Safety behaviors',
              description: (
                <p>Check symptoms, seek reassurance, Google symptoms, book doctor appointment, avoid triggers.</p>
              ),
            },
            {
              title: 'Temporary relief',
              description: <p>Anxiety decreases briefly when 'nothing is found' or reassurance is given.</p>,
            },
            {
              title: 'Doubt returns',
              description: <p>'But what if they missed something? What if it develops later?"</p>,
            },
            {
              title: 'Increased vigilance',
              description: (
                <p>
                  The cycle has now taught your brain that symptoms = danger, reinforcing scanning and anxiety.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="clinical-note" title="The Paradox of Safety Behaviors">
          <p className="mb-4">
            Safety behaviors feel protective in the moment — checking reassures you, doctor visits provide
            temporary certainty, avoiding health triggers reduces immediate anxiety. But over time, these
            behaviors <strong>maintain the problem</strong>.
          </p>
          <p>
            They prevent you from learning that symptoms are usually benign, that uncertainty is tolerable, and
            that anxiety naturally decreases without intervention. Treatment involves gradually reducing these
            safety behaviors — which initially increases anxiety but ultimately breaks the cycle.
          </p>
        </ArticleCallout>

        <h2
          id="impact-on-life"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Impact of Health Anxiety
        </h2>
        <p className="mb-6">
          Untreated health anxiety significantly impairs quality of life and healthcare systems{', '}
          <Citation id="8" index={8} source="General Hospital Psychiatry" year="2019" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'personal',
              label: 'Personal Impact',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Time consumed:</strong> Hours daily spent checking symptoms, researching, seeking
                    reassurance
                  </li>
                  <li>
                    <strong>Functional impairment:</strong> Difficulty concentrating at work, withdrawing from
                    activities
                  </li>
                  <li>
                    <strong>Emotional toll:</strong> Chronic fear, anticipatory anxiety, depression
                  </li>
                  <li>
                    <strong>Relationship strain:</strong> Loved ones become frustrated with repeated reassurance
                    requests
                  </li>
                  <li>
                    <strong>Financial cost:</strong> Unnecessary medical tests, missed work, healthcare expenses
                  </li>
                </ul>
              ),
            },
            {
              id: 'medical',
              label: 'Medical Impact',
              content: (
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Overutilization:</strong> Frequent doctor visits for minor symptoms strain healthcare
                    resources
                  </li>
                  <li>
                    <strong>Unnecessary testing:</strong> Repeated imaging, blood work, specialist referrals with
                    low yield
                  </li>
                  <li>
                    <strong>Iatrogenic harm:</strong> Risk of complications from unnecessary procedures (e.g., biopsy
                    complications)
                  </li>
                  <li>
                    <strong>Doctor-patient relationship:</strong> Physicians may become frustrated, patients feel
                    dismissed
                  </li>
                  <li>
                    <strong>Missed diagnoses:</strong> "Cry wolf" effect — real symptoms may be dismissed due to
                    history of health anxiety
                  </li>
                </ul>
              ),
            },
            {
              id: 'avoidance',
              label: 'Avoidance Variant',
              content: (
                <div>
                  <p className="mb-4">
                    Some people with health anxiety respond with <strong>care avoidance</strong> rather than care
                    seeking — they're so afraid of receiving a diagnosis that they avoid medical care entirely.
                  </p>
                  <p className="mb-4">
                    <strong>Behaviors include:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Skipping routine checkups and screening tests</li>
                    <li>Avoiding health-related information or conversations</li>
                    <li>Not reporting symptoms to doctors</li>
                    <li>Refusing recommended tests or procedures</li>
                  </ul>
                  <p>
                    This pattern carries its own risks, as preventable or treatable conditions may progress
                    undetected. It's driven by the same underlying fear but manifests as avoidance rather than
                    hypervigilance.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="treatment"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Evidence-Based Treatment for Health Anxiety
        </h2>
        <p className="mb-6">
          Health anxiety is highly treatable. Cognitive Behavioral Therapy (CBT) is the gold-standard treatment,
          with strong evidence for effectiveness{', '}
          <Citation id="3" index={9} source="Psychological Medicine" year="2021" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          CBT for Health Anxiety
        </h3>
        <p className="mb-6">CBT targets the cognitive and behavioral patterns maintaining the disorder:</p>

        <ol className="list-decimal pl-6 mb-6 space-y-4">
          <li>
            <strong>Psychoeducation:</strong> Understanding the health anxiety cycle, how attention and
            interpretation fuel worry, and why safety behaviors maintain it.
          </li>
          <li>
            <strong>Cognitive restructuring:</strong> Identifying and challenging catastrophic interpretations,
            probability overestimations, and intolerance of uncertainty.
          </li>
          <li>
            <strong>Behavioral experiments:</strong> Testing beliefs (e.g., 'If I don't check my pulse, I'll have a
            heart attack') by deliberately reducing checking and observing outcomes.
          </li>
          <li>
            <strong>Exposure to health-related triggers:</strong> Gradually confronting avoided health information,
            medical settings, or illness-related content without engaging in safety behaviors.
          </li>
          <li>
            <strong>Interoceptive exposure:</strong> Deliberately inducing feared body sensations (e.g., elevated
            heart rate from exercise) to learn they're not dangerous{', '}
            <Citation id="6" index={10} source="Behaviour Research and Therapy" year="2021" tier={1} />.
          </li>
          <li>
            <strong>Reassurance reduction:</strong> Systematically decreasing doctor visits, body checking, and
            reassurance-seeking from others.
          </li>
          <li>
            <strong>Relapse prevention:</strong> Developing skills to recognize early warning signs and respond
            without reverting to old patterns.
          </li>
        </ol>

        <QuoteBlock
          quote="The goal of treatment is not to eliminate all health concerns — that would be unhealthy in a different way. The goal is to respond to health information in a balanced, proportionate way that doesn't consume your life or prevent you from living it."
          attribution="Treatment principle"
          role="CBT for Health Anxiety"
          variant="large"
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Medication
        </h3>
        <p className="mb-6">
          SSRIs (selective serotonin reuptake inhibitors) can reduce health anxiety symptoms, particularly when
          comorbid with depression or generalized anxiety. However, CBT has more durable effects and is typically
          first-line treatment. Medication is most helpful:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>When anxiety is so severe it prevents engagement with therapy</li>
          <li>When significant comorbid depression is present</li>
          <li>When CBT alone has been insufficient</li>
          <li>As an adjunct to ongoing therapy</li>
        </ul>

        <h2
          id="self-help-strategies"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Self-Help Strategies
        </h2>
        <p className="mb-6">While professional treatment is most effective, these strategies can help:</p>

        <ul className="list-disc pl-6 mb-6 space-y-3">
          <li>
            <strong>Limit health-related internet searches:</strong> Set a rule (e.g., no Googling symptoms, or only
            using one trusted medical source once per symptom).
          </li>
          <li>
            <strong>Schedule "worry time":</strong> Designate 15 minutes daily for health worries; postpone worries
            that arise outside that time.
          </li>
          <li>
            <strong>Reduce body checking:</strong> Gradually decrease how often you check pulse, temperature, or
            scan for symptoms.
          </li>
          <li>
            <strong>Practice uncertainty tolerance:</strong> Notice urges for reassurance and intentionally delay or
            skip seeking it.
          </li>
          <li>
            <strong>Engage in values-based activities:</strong> What would you do if health anxiety weren't
            controlling your time? Do those things, even while anxious.
          </li>
          <li>
            <strong>Limit reassurance from loved ones:</strong> Ask family/friends to gently redirect rather than
            repeatedly reassure.
          </li>
          <li>
            <strong>Keep a symptom diary:</strong> Track symptoms and worry levels to see patterns — most symptoms
            fluctuate or resolve on their own.
          </li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>The central insight:</strong> Health anxiety is not about health — it's about anxiety. The
            content is health-related, but the mechanism is anxiety-driven worry, just as in other anxiety
            disorders.
          </p>
          <p className="mb-4">
            Treatment doesn't aim to convince you that you're healthy (reassurance doesn't work). Instead, it helps
            you tolerate uncertainty, respond differently to body sensations, and reclaim your life from the
            tyranny of 'what if?"
          </p>
          <p>
            With appropriate treatment, most people with health anxiety see significant improvement. The worry
            doesn't have to control your life — and it doesn't have to be the illness.
          </p>
        </ArticleCallout>
      </>
    ),
  },
];
