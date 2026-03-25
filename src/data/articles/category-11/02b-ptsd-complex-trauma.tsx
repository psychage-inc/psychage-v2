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

export const ptsdComplexTraumaArticlesB: Article[] = [
  {
    id: catId(16),
    slug: 'ptsd-nightmares-why-trauma-disrupts-sleep',
    title: 'PTSD and Nightmares: Why Trauma Disrupts Your Sleep',
    description: 'PTSD nightmares are more than bad dreams. Learn why trauma invades your sleep, the neuroscience behind nightmares, and evidence-based strategies to improve sleep.',
    image: "/images/articles/cat11/cover-016.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['PTSD', 'Nightmares', 'Sleep', 'Treatment'],
    citations: [
      {
        id: '1',
        text: 'Sleep disturbance in PTSD: A comprehensive review',
        source: 'Sleep Medicine Reviews',
        year: '2021',
        link: 'https://doi.org/10.1016/j.smrv.2021.101398',
        tier: 1,
      },
      {
        id: '2',
        text: 'REM sleep and trauma processing',
        source: 'Current Biology',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cub.2020.08.025',
        tier: 1,
      },
      {
        id: '3',
        text: 'Nightmares and PTSD',
        source: 'National Center for PTSD',
        year: '2023',
        link: 'https://www.ptsd.va.gov/understand/related/sleep_disorders.asp',
        tier: 2,
      },
      {
        id: '4',
        text: 'Imagery Rehearsal Therapy for nightmares: A meta-analysis',
        source: 'Sleep',
        year: '2020',
        link: 'https://doi.org/10.1093/sleep/zsaa002',
        tier: 1,
      },
      {
        id: '5',
        text: 'Prazosin for PTSD nightmares',
        source: 'JAMA Psychiatry',
        year: '2018',
        link: 'https://doi.org/10.1001/jamapsychiatry.2018.0326',
        tier: 1,
      },
      {
        id: '6',
        text: 'Sleep architecture in PTSD',
        source: 'Biological Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1016/j.biopsych.2019.05.016',
        tier: 1,
      },
      {
        id: '7',
        text: 'CBT for insomnia in PTSD',
        source: 'Journal of Traumatic Stress',
        year: '2021',
        link: 'https://doi.org/10.1002/jts.22658',
        tier: 1,
      },
      {
        id: '8',
        text: 'Sleep and trauma recovery',
        source: 'World Health Organization',
        year: '2022',
        link: 'https://www.who.int/mental_health/evidence/sleep',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You dread going to bed. Sleep, which should be restful, has become a battleground. You wake up gasping, heart pounding, sheets soaked with sweat. The nightmare felt so real—you were back there, reliving it. This happens night after night, robbing you of rest and leaving you exhausted. PTSD doesn't respect the boundary between waking and sleeping.
          </p>
          <p className="mb-6">
            Sleep disturbance, particularly nightmares, is one of the most common and distressing symptoms of PTSD{', '}
            <Citation id="1" index={1} source="Sleep Medicine Reviews" year="2021" tier={1} />. Understanding why trauma invades your sleep is the first step toward reclaiming rest.
          </p>
        </div>

        <h2
          id="sleep-in-ptsd"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Sleep Problems in PTSD
        </h2>
        <p className="mb-6">
          Up to 90% of people with PTSD experience sleep disturbances{', '}
          <Citation id="3" index={3} source="National Center for PTSD" year="2023" tier={2} />. Common problems include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Nightmares</strong>: Vivid, terrifying dreams that replay or symbolize the trauma</li>
          <li><strong>Insomnia</strong>: Difficulty falling asleep or staying asleep</li>
          <li><strong>Hyperarousal at bedtime</strong>: Too alert and vigilant to relax into sleep</li>
          <li><strong>Fear of sleep</strong>: Avoiding sleep because you know nightmares are waiting</li>
          <li><strong>Fragmented sleep</strong>: Waking frequently throughout the night</li>
          <li><strong>Non-restorative sleep</strong>: Waking up feeling exhausted despite sleeping</li>
        </ul>

        <StatCard
          stats={[
            { value: 90, suffix: '%', label: 'PTSD patients have sleep disturbances' },
            { value: 70, suffix: '%', label: 'Experience recurrent nightmares' },
            { value: 3, suffix: 'x', label: 'Higher risk of sleep apnea' },
          ]}
          source="Sleep Medicine Reviews, 2021"
        />

        <h2
          id="why-nightmares"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why PTSD Causes Nightmares
        </h2>
        <p className="mb-6">
          PTSD nightmares aren't random bad dreams. They serve a function—your brain is trying to process traumatic memories during sleep{', '}
          <Citation id="2" index={2} source="Current Biology" year="2020" tier={1} />.
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'rem-disruption',
              label: 'REM Sleep Disruption',
              content: (
                <div>
                  <p className="mb-3">
                    During REM (Rapid Eye Movement) sleep, your brain processes emotional memories and consolidates learning. In PTSD, the REM system is dysregulated:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>REM sleep is fragmented and shorter</li>
                    <li>The amygdala (fear center) stays overactive during REM</li>
                    <li>Normal emotional processing is disrupted</li>
                    <li>Instead of integrating memories, you re-experience them</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'failed-processing',
              label: 'Failed Memory Processing',
              content: (
                <div>
                  <p className="mb-3">
                    Your brain is attempting to process the trauma during sleep, but the memory is too overwhelming. The nightmare is the brain's failed attempt to make sense of and integrate the traumatic experience.
                  </p>
                  <p>This is why nightmares often replay the trauma or present symbolic versions of it—your mind is working on the problem but can't resolve it during sleep alone.</p>
                </div>
              ),
            },
            {
              id: 'hyperarousal',
              label: 'Chronic Hyperarousal',
              content: (
                <div>
                  <p className="mb-3">
                    Your nervous system remains in a state of high alert even during sleep{', '}
                    <Citation id="6" index={6} source="Biological Psychiatry" year="2019" tier={1} />. This means:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your threat detection system doesn't turn off</li>
                    <li>Minor stimuli (sounds, body sensations) trigger awakening</li>
                    <li>You wake easily from nightmares rather than transitioning back to calmer sleep</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="types-nightmares"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Types of PTSD Nightmares
        </h2>

        <ComparisonTable
          title="Nightmare Types in PTSD"
          columns={['Type', 'Description']}
          items={[
            {
              feature: 'Replicative',
              values: ['Direct replay of the traumatic event with little variation'],
            },
            {
              feature: 'Symbolic',
              values: ['Themes related to trauma but different content (being chased, trapped, threatened)'],
            },
            {
              feature: 'Mixed',
              values: ['Combination of actual trauma elements with symbolic or distorted content'],
            },
          ]}
          highlightColumn={1}
        />

        <h2
          id="vicious-cycle"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Vicious Cycle
        </h2>
        <p className="mb-6">Sleep problems in PTSD create a harmful cycle:</p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Trauma Creates Sleep Disturbance',
              description: <p>The traumatic experience dysregulates your sleep system.</p>,
            },
            {
              title: 'Poor Sleep Worsens PTSD Symptoms',
              description: (
                <p>
                  Sleep deprivation increases emotional reactivity, impairs prefrontal cortex function, and makes you more vulnerable to hyperarousal and flashbacks.
                </p>
              ),
            },
            {
              title: 'Worsened PTSD Further Disrupts Sleep',
              description: <p>More severe PTSD symptoms make sleep even more difficult.</p>,
            },
            {
              title: 'The Cycle Continues',
              description: (
                <p>
                  Without intervention, sleep problems and PTSD symptoms perpetuate each other{', '}
                  <Citation id="8" index={8} source="World Health Organization" year="2022" tier={2} />.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning">
          <p>
            Chronic sleep deprivation from PTSD nightmares isn't just uncomfortable—it actively prevents healing. Good sleep is essential for trauma recovery. Addressing sleep problems should be a priority in PTSD treatment.
          </p>
        </ArticleCallout>

        <h2
          id="treatment"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Evidence-Based Treatments for PTSD Nightmares
        </h2>

        <h3 className="text-2xl font-bold mt-8 mb-4">1. Imagery Rehearsal Therapy (IRT)</h3>
        <p className="mb-6">
          IRT is the most well-researched treatment specifically for nightmares{', '}
          <Citation id="4" index={4} source="Sleep" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>What it is</strong>: You choose a recurring nightmare and "rewrite" it with a different, less distressing ending</li>
          <li><strong>How it works</strong>: You rehearse the new version while awake, which changes how your brain processes the nightmare during sleep</li>
          <li><strong>Duration</strong>: Usually 3-6 sessions</li>
          <li><strong>Effectiveness</strong>: Reduces nightmare frequency and intensity in 60-70% of people</li>
        </ul>

        <h3 className="text-2xl font-bold mt-8 mb-4">2. Cognitive Behavioral Therapy for Insomnia (CBT-I)</h3>
        <p className="mb-6">
          CBT-I addresses the broader sleep problems in PTSD{', '}
          <Citation id="7" index={7} source="Journal of Traumatic Stress" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Sleep restriction to consolidate fragmented sleep</li>
          <li>Stimulus control (re-associating bed with sleep, not wakefulness)</li>
          <li>Challenging catastrophic thoughts about sleep</li>
          <li>Relaxation techniques</li>
        </ul>

        <h3 className="text-2xl font-bold mt-8 mb-4">3. Medication</h3>
        <p className="mb-6">Several medications can help:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Prazosin</strong>: Alpha-1 blocker that reduces nightmares (though recent large trials show mixed results){', '}
            <Citation id="5" index={5} source="JAMA Psychiatry" year="2018" tier={1} />
          </li>
          <li><strong>Trazodone</strong>: Antidepressant that improves sleep quality</li>
          <li><strong>Clonidine</strong>: Can reduce hyperarousal at night</li>
        </ul>
        <p className="mb-6">
          <em>Note: Benzodiazepines and most sleep medications are NOT recommended for PTSD as they interfere with REM sleep and can worsen symptoms long-term.</em>
        </p>

        <h2
          id="self-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Self-Help Strategies
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'sleep-hygiene',
              title: 'Sleep Hygiene Basics',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Consistent sleep/wake schedule (even on weekends)</li>
                  <li>Cool, dark, quiet bedroom</li>
                  <li>No screens 1 hour before bed</li>
                  <li>Avoid caffeine after 2pm, alcohol close to bedtime</li>
                  <li>Exercise earlier in the day, not close to bedtime</li>
                </ul>
              ),
            },
            {
              id: 'wind-down',
              title: 'Wind-Down Routine',
              content: (
                <p>
                  Create a calming 30-60 minute routine before bed: warm bath, gentle stretching, reading, listening to calming music. This signals to your nervous system that it's safe to rest.
                </p>
              ),
            },
            {
              id: 'safety',
              title: 'Create Sense of Safety',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Check locks before bed if it helps you feel secure</li>
                  <li>Night lights if darkness feels threatening</li>
                  <li>Comforting objects near bed</li>
                  <li>Pet sleeping nearby (if appropriate)</li>
                </ul>
              ),
            },
            {
              id: 'nightmare-protocol',
              title: 'After-Nightmare Protocol',
              content: (
                <div>
                  <p className="mb-3">When you wake from a nightmare:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Ground yourself: feet on floor, lights on, orient to current reality</li>
                    <li>Don't try to force sleep immediately—calm your nervous system first</li>
                    <li>Gentle activity: sip water, walk around, gentle breathing</li>
                    <li>Return to bed when you feel calmer</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4"><strong>Key Takeaways:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sleep problems are nearly universal in PTSD and perpetuate other symptoms</li>
            <li>Nightmares represent failed attempts to process traumatic memories during sleep</li>
            <li>Imagery Rehearsal Therapy is the most effective treatment for PTSD nightmares</li>
            <li>Addressing sleep problems is essential for overall PTSD recovery</li>
            <li>Both therapy and lifestyle changes can improve sleep quality</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          You deserve restful sleep. While PTSD nightmares can feel overwhelming and inescapable, effective treatments exist. With the right support, you can reclaim your nights and wake feeling rested rather than retraumatized.
        </p>
      </>
    ),
  },

  {
    id: catId(17),
    slug: 'trauma-dissociation-mind-disconnects-survive',
    title: 'Trauma and Dissociation: When Your Mind Disconnects to Survive',
    description: 'Dissociation is a protective mechanism where your mind separates from overwhelming experiences. Learn about dissociation in trauma and paths to reconnection.',
    image: "/images/articles/cat11/cover-017.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Dissociation', 'PTSD', 'Trauma Response', 'Grounding'],
    citations: [
      {
        id: '1',
        text: 'Dissociation in PTSD: A comprehensive review',
        source: 'European Journal of Psychotraumatology',
        year: '2020',
        link: 'https://doi.org/10.1080/20008198.2020.1721498',
        tier: 1,
      },
      {
        id: '2',
        text: 'PTSD with dissociative symptoms subtype',
        source: 'American Journal of Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1176/appi.ajp.2019.19010021',
        tier: 1,
      },
      {
        id: '3',
        text: 'Understanding dissociation',
        source: 'National Center for PTSD',
        year: '2023',
        link: 'https://www.ptsd.va.gov/professional/treat/cooccurring/dissociation_ptsd.asp',
        tier: 2,
      },
      {
        id: '4',
        text: 'Grounding techniques for dissociation',
        source: 'Journal of Traumatic Stress',
        year: '2020',
        link: 'https://doi.org/10.1002/jts.22516',
        tier: 1,
      },
      {
        id: '5',
        text: 'Depersonalization and derealization in trauma',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102040',
        tier: 1,
      },
      {
        id: '6',
        text: 'Neurobiology of dissociation',
        source: 'Biological Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1016/j.biopsych.2020.06.003',
        tier: 1,
      },
      {
        id: '7',
        text: 'Treatment of dissociative symptoms',
        source: 'Substance Abuse and Mental Health Services Administration',
        year: '2022',
        link: 'https://www.samhsa.gov/trauma-violence',
        tier: 2,
      },
      {
        id: '8',
        text: 'Dissociative identity disorder and complex trauma',
        source: 'Lancet Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1016/S2215-0366(19)30194-9',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            During the trauma, you weren't there. You floated above your body, watching it happen to someone else. Or everything went fuzzy and dreamlike—you were present but not really present. Time moved strangely. You remember fragments but it doesn't feel like a real memory. This is dissociation, and it's one of the most confusing and frightening experiences in trauma.
          </p>
          <p className="mb-6">
            Dissociation is your mind's emergency brake—a protective mechanism that separates you from an experience that would otherwise overwhelm you completely{', '}
            <Citation id="1" index={1} source="European Journal of Psychotraumatology" year="2020" tier={1} />.
          </p>
        </div>

        <h2
          id="what-is-dissociation"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Dissociation?
        </h2>
        <p className="mb-6">
          Dissociation is a disconnection between your thoughts, memories, feelings, actions, or sense of identity{', '}
          <Citation id="3" index={3} source="National Center for PTSD" year="2023" tier={2} />. It exists on a spectrum from mild (like highway hypnosis) to severe (dissociative identity disorder).
        </p>
        <p className="mb-6">Common dissociative experiences include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Depersonalization</strong>: Feeling detached from yourself, like you're watching yourself from outside your body</li>
          <li><strong>Derealization</strong>: Feeling that the world around you is unreal, dreamlike, or distorted</li>
          <li><strong>Amnesia</strong>: Gaps in memory, inability to recall parts of the traumatic event</li>
          <li><strong>Identity confusion</strong>: Uncertainty about who you are</li>
          <li><strong>Emotional numbing</strong>: Disconnection from feelings</li>
        </ul>

        <ArticleCallout variant="did-you-know">
          <p>
            The DSM-5 recognizes a "PTSD with dissociative symptoms" subtype for people who experience significant depersonalization or derealization alongside their PTSD symptoms{', '}
            <Citation id="2" index={2} source="American Journal of Psychiatry" year="2019" tier={1} />. This affects about 15-30% of people with PTSD.
          </p>
        </ArticleCallout>

        <h2
          id="types"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Types of Dissociation in Trauma
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'peritraumatic',
              title: 'Peritraumatic Dissociation (During Trauma)',
              content: (
                <div>
                  <p className="mb-3">
                    Dissociation that occurs <em>during</em> the traumatic event:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Out-of-body experiences</li>
                    <li>Time distortion (event feels like it lasts forever or happens in an instant)</li>
                    <li>Tunnel vision or altered perception</li>
                    <li>Feeling like it's happening to someone else</li>
                    <li>Emotional numbness during the event</li>
                  </ul>
                  <p className="mt-3"><em>Peritraumatic dissociation is a strong predictor of developing PTSD later.</em></p>
                </div>
              ),
            },
            {
              id: 'persistent',
              title: 'Persistent Dissociation (After Trauma)',
              content: (
                <div>
                  <p className="mb-3">
                    Ongoing dissociative symptoms that persist after the trauma:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Chronic depersonalization/derealization</li>
                    <li>"Spacing out" or "losing time"</li>
                    <li>Feeling disconnected from your body or emotions</li>
                    <li>World feeling consistently unreal</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'flashback',
              title: 'Dissociation During Flashbacks',
              content: (
                <p>
                  When triggered, you may dissociate and partially or completely lose awareness of present reality, experiencing the trauma as if it's happening now.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="depersonalization-derealization"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Depersonalization vs. Derealization
        </h2>
        <p className="mb-6">
          These two forms of dissociation often occur together but are distinct{', '}
          <Citation id="5" index={5} source="Clinical Psychology Review" year="2021" tier={1} />:
        </p>

        <BeforeAfter
          before={{
            title: 'Depersonalization',
            content: (
              <div>
                <p className="mb-3"><strong>Detachment from self</strong></p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>"I feel like I'm watching myself from outside my body"</li>
                  <li>"My hands don't feel like mine"</li>
                  <li>"I'm a robot going through motions"</li>
                  <li>"I can see myself but I'm not me"</li>
                </ul>
              </div>
            ),
          }}
          after={{
            title: 'Derealization',
            content: (
              <div>
                <p className="mb-3"><strong>Detachment from surroundings</strong></p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>"The world looks foggy or dreamlike"</li>
                  <li>"Everything feels unreal or distant"</li>
                  <li>"People look flat or two-dimensional"</li>
                  <li>"I'm living in a movie or behind glass"</li>
                </ul>
              </div>
            ),
          }}
        />

        <h2
          id="why-happens"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Dissociation Happens
        </h2>
        <p className="mb-6">
          Dissociation is actually an <em>adaptive</em> survival mechanism{', '}
          <Citation id="6" index={6} source="Biological Psychiatry" year="2020" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Overwhelming Experience',
              description: (
                <p>
                  During trauma, your emotional and physical pain exceeds what your mind can bear. The experience is literally too much to handle.
                </p>
              ),
            },
            {
              title: 'Protective Disconnect',
              description: (
                <p>
                  Your brain creates distance between your consciousness and the experience. It's as if your mind says, "This is too much. I'm going to step back so you can survive this."
                </p>
              ),
            },
            {
              title: 'Allows Functioning',
              description: (
                <p>
                  Dissociation allows you to continue functioning during otherwise unbearable circumstances. Children especially use dissociation to survive ongoing abuse.
                </p>
              ),
            },
            {
              title: 'Pattern Persists',
              description: (
                <p>
                  Unfortunately, once your brain learns this protective strategy, it may continue using it even when you're safe—disconnecting at any sign of stress or distress.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="tip">
          <p>
            Dissociation served a purpose. It protected you when nothing else could. The goal isn't to judge yourself for dissociating—it's to understand it and learn new ways of handling distress now that you're safer.
          </p>
        </ArticleCallout>

        <h2
          id="neuroscience"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Neuroscience of Dissociation
        </h2>
        <p className="mb-6">Brain imaging studies show distinct patterns during dissociation:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Prefrontal cortex overactivation</strong>: Unlike in hyperarousal (where PFC is underactive), dissociation involves the PFC suppressing the amygdala and other emotion centers</li>
          <li><strong>Reduced connectivity</strong>: Brain regions that normally communicate become disconnected from each other</li>
          <li><strong>Altered body awareness</strong>: The insula (which processes body sensations) shows reduced activity, explaining why you feel detached from your body</li>
        </ul>

        <h2
          id="grounding"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Grounding: Reconnecting to the Present
        </h2>
        <p className="mb-6">
          When you're dissociating, grounding techniques help bring you back to the present moment{', '}
          <Citation id="4" index={4} source="Journal of Traumatic Stress" year="2020" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'sensory',
              label: 'Sensory Grounding',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Touch</strong>: Hold ice cubes, run hands under cold water, touch textured objects</li>
                  <li><strong>Smell</strong>: Strong scents (peppermint, citrus, coffee) engage you in present</li>
                  <li><strong>Taste</strong>: Sour candy, mint, gum—something with a distinct flavor</li>
                  <li><strong>Sound</strong>: Listen to music, name 5 things you can hear</li>
                  <li><strong>Sight</strong>: Describe your surroundings in detail, name colors</li>
                </ul>
              ),
            },
            {
              id: 'physical',
              label: 'Physical Grounding',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Stomp your feet on the ground</li>
                  <li>Press your hands together or against a wall</li>
                  <li>Stretch or do jumping jacks</li>
                  <li>Clench and release your fists</li>
                  <li>Focus on the feeling of your body in the chair</li>
                </ul>
              ),
            },
            {
              id: 'mental',
              label: 'Mental Grounding',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Describe your environment out loud in detail</li>
                  <li>Count backwards from 100 by 7s</li>
                  <li>Name categories (countries, colors, animals)</li>
                  <li>Orient to time/place: state your name, age, location, date</li>
                  <li>List facts you know are true about your current reality</li>
                </ul>
              ),
            },
          ]}
        />

        <h2
          id="treatment"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Professional Treatment for Dissociation
        </h2>
        <p className="mb-6">
          Treating dissociation requires specialized approaches{', '}
          <Citation id="7" index={7} source="SAMHSA" year="2022" tier={2} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Phase-oriented trauma therapy</strong>: Build grounding and stabilization skills before processing trauma</li>
          <li><strong>Sensorimotor Psychotherapy</strong>: Body-based therapy that addresses dissociation through physical awareness</li>
          <li><strong>Internal Family Systems</strong>: Works with dissociated parts of self</li>
          <li><strong>DBT skills</strong>: Distress tolerance and emotion regulation skills help manage dissociation triggers</li>
          <li><strong>EMDR</strong>: Can be adapted for dissociative clients with careful pacing</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>
            If you have severe dissociation (significant time loss, amnesia, or multiple identity states), seek specialized trauma therapy. Standard PTSD treatments may need to be modified, and you may meet criteria for a dissociative disorder{', '}
            <Citation id="8" index={8} source="Lancet Psychiatry" year="2019" tier={1} />.
          </p>
        </ArticleCallout>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4"><strong>Key Takeaways:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Dissociation is a protective mechanism that creates distance from overwhelming experiences</li>
            <li>It ranges from mild (spacing out) to severe (identity fragmentation)</li>
            <li>Dissociation during trauma increases PTSD risk</li>
            <li>Grounding techniques help reconnect you to the present moment</li>
            <li>Specialized trauma therapy can address chronic dissociation</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          Dissociation helped you survive. Now, with support and practice, you can learn to stay present—to inhabit your body and your life fully, even when things are difficult. You don't have to disconnect to protect yourself anymore.
        </p>
      </>
    ),
  },

  {
    id: catId(18),
    slug: 'ptsd-first-responders-cost-witnessing-crisis',
    title: 'PTSD in First Responders: The Cost of Witnessing Crisis',
    description: 'First responders face cumulative trauma exposure. Learn about PTSD in police, firefighters, paramedics, and why occupational trauma requires targeted support.',
    image: "/images/articles/cat11/cover-018.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['First Responders', 'Occupational Trauma', 'PTSD', 'Public Safety'],
    citations: [
      {
        id: '1',
        text: 'PTSD in first responders: A systematic review',
        source: 'Prehospital and Disaster Medicine',
        year: '2018',
        link: 'https://doi.org/10.1017/S1049023X18000055',
        tier: 1,
      },
      {
        id: '2',
        text: 'Mental health in emergency services personnel',
        source: 'BMC Emergency Medicine',
        year: '2021',
        link: 'https://doi.org/10.1186/s12873-021-00424-6',
        tier: 1,
      },
      {
        id: '3',
        text: 'Police and PTSD',
        source: 'Journal of Police and Criminal Psychology',
        year: '2020',
        link: 'https://doi.org/10.1007/s11896-020-09367-4',
        tier: 1,
      },
      {
        id: '4',
        text: 'Firefighter mental health',
        source: 'Journal of Occupational and Environmental Medicine',
        year: '2019',
        link: 'https://doi.org/10.1097/JOM.0000000000001688',
        tier: 1,
      },
      {
        id: '5',
        text: 'Supporting first responder mental health',
        source: 'Substance Abuse and Mental Health Services Administration',
        year: '2022',
        link: 'https://www.samhsa.gov/dtac/ccp-toolkit',
        tier: 2,
      },
      {
        id: '6',
        text: 'Cumulative trauma and resilience in emergency personnel',
        source: 'Psychological Trauma: Theory, Research, Practice, and Policy',
        year: '2021',
        link: 'https://doi.org/10.1037/tra0001024',
        tier: 1,
      },
      {
        id: '7',
        text: 'Organizational factors in first responder mental health',
        source: 'Work & Stress',
        year: '2020',
        link: 'https://doi.org/10.1080/02678373.2020.1778999',
        tier: 1,
      },
      {
        id: '8',
        text: 'First responder wellness',
        source: 'National Institute of Mental Health',
        year: '2023',
        link: 'https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Every shift, they witness humanity's worst moments. They arrive at scenes most people flee from—accidents, violence, death, suffering. They're trained to stay calm, to function, to save lives. But no training prepares you for the cumulative weight of others' worst days becoming your ordinary workday.
          </p>
          <p className="mb-6">
            Police officers, firefighters, paramedics, and EMTs experience trauma exposure at rates far exceeding the general population. The cost of serving is high—and often invisible{', '}
            <Citation id="1" index={1} source="Prehospital and Disaster Medicine" year="2018" tier={1} />.
          </p>
        </div>

        <h2
          id="prevalence"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          PTSD Prevalence in First Responders
        </h2>
        <p className="mb-6">
          First responders develop PTSD at 2-5 times the rate of the general population{', '}
          <Citation id="2" index={2} source="BMC Emergency Medicine" year="2021" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 15, suffix: '-30%', label: 'First responders have PTSD (vs. 6-8% general population)' },
            { value: 37, suffix: '%', label: 'Report suicidal thoughts at some point' },
            { value: 5, suffix: 'x', label: 'Higher suicide risk than general population' },
          ]}
          source="BMC Emergency Medicine, 2021; SAMHSA, 2022"
        />

        <p className="mb-6 mt-6">By occupation:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Paramedics/EMTs</strong>: 20-30% PTSD prevalence</li>
          <li><strong>Police officers</strong>: 15-20% PTSD prevalence{', '}
            <Citation id="3" index={3} source="Journal of Police and Criminal Psychology" year="2020" tier={1} />
          </li>
          <li><strong>Firefighters</strong>: 10-20% PTSD prevalence{', '}
            <Citation id="4" index={4} source="Journal of Occupational and Environmental Medicine" year="2019" tier={1} />
          </li>
        </ul>

        <h2
          id="unique-challenges"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Makes First Responder Trauma Unique
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'cumulative',
              title: 'Cumulative Exposure',
              content: (
                <div>
                  <p className="mb-3">
                    Unlike single-incident trauma, first responders experience repeated exposure to traumatic events over careers spanning decades{', '}
                    <Citation id="6" index={6} source="Psychological Trauma" year="2021" tier={1} />. Each incident adds to the cumulative burden.
                  </p>
                  <p>It's like filling a bucket drop by drop—at some point, even a small incident can cause it to overflow.</p>
                </div>
              ),
            },
            {
              id: 'unpredictable',
              title: 'Unpredictable and Uncontrollable',
              content: (
                <p>
                  You never know what the next call will bring. The unpredictability and lack of control—especially over outcomes—creates chronic stress. Not every victim survives. Not every situation resolves well.
                </p>
              ),
            },
            {
              id: 'children',
              title: 'Exposure to Injured or Dead Children',
              content: (
                <p>
                  Calls involving children are particularly traumatizing for first responders. Many report that scenes with child victims are the hardest to process and the most likely to cause lasting distress.
                </p>
              ),
            },
            {
              id: 'no-debriefing',
              title: 'Immediate Return to Duty',
              content: (
                <p>
                  After a traumatic call, first responders often have minutes or hours before the next one. There's no time to process or decompress. The culture often expects you to 'shake it off' and get back to work.
                </p>
              ),
            },
            {
              id: 'secondary',
              title: 'Secondary Trauma Exposure',
              content: (
                <p>
                  Beyond direct exposure, first responders hear colleagues' stories, see graphic images in reports, and absorb others' trauma secondhand. This vicarious exposure compounds primary trauma.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="culture-barrier"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Cultural Barriers to Seeking Help
        </h2>
        <p className="mb-6">First responder culture often actively discourages acknowledgment of mental health struggles:</p>

        <ComparisonTable
          title="Cultural Messages vs. Reality"
          columns={['Cultural Message', 'Reality']}
          items={[
            {
              feature: 'Suck it up',
              values: ['Suppressing emotions increases PTSD risk'],
            },
            {
              feature: 'You signed up for this',
              values: ['Being prepared doesn\'t mean being immune to trauma'],
            },
            {
              feature: "Weak people can't do this job",
              values: ['Seeking help is strength, not weakness'],
            },
            {
              feature: "Don't talk about it",
              values: ['Social support is the strongest protective factor'],
            },
            {
              feature: 'Therapy is career-ending',
              values: ['Untreated PTSD is more likely to end careers'],
            },
          ]}
          highlightColumn={1}
        />

        <p className="mb-6 mt-6">
          This culture of silence means first responders often wait years before seeking help—if they seek it at all. Many self-medicate with alcohol, withdraw from relationships, or struggle alone{', '}
          <Citation id="7" index={7} source="Work & Stress" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="warning">
          <p>
            First responders have suicide rates significantly higher than the general population—and often higher than line-of-duty deaths. This is a public health crisis that requires organizational change, not just individual resilience.
          </p>
        </ArticleCallout>

        <h2
          id="symptoms"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How PTSD Manifests in First Responders
        </h2>
        <p className="mb-6">Beyond standard PTSD symptoms, first responders may experience:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Hypervigilance on and off duty</strong>: Can't turn off threat detection even at home</li>
          <li><strong>Emotional numbing</strong>: Necessary on the job but bleeds into personal life</li>
          <li><strong>Difficulty with civilian life</strong>: Frustration with "normal" problems that seem trivial</li>
          <li><strong>Relationship strain</strong>: Partners feel shut out; difficulty relating to non-first-responders</li>
          <li><strong>Substance use</strong>: Alcohol use is common in first responder culture and often used to cope</li>
          <li><strong>Moral injury</strong>: Distress from actions (or inaction) that violated moral code—like being unable to save someone</li>
        </ul>

        <h2
          id="treatment"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Effective Treatment Approaches
        </h2>
        <p className="mb-6">
          Standard PTSD treatments work for first responders, but modifications help{', '}
          <Citation id="5" index={5} source="SAMHSA" year="2022" tier={2} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'peer-support',
              label: 'Peer Support',
              content: (
                <div>
                  <p className="mb-3">
                    Programs staffed by other first responders who've experienced similar trauma:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Reduces stigma (harder to dismiss as "not understanding")</li>
                    <li>Provides practical coping strategies from people who've been there</li>
                    <li>Creates safe space to talk without judgment</li>
                  </ul>
                  <p className="mt-3"><em>Note: Peer support complements but doesn't replace professional treatment.</em></p>
                </div>
              ),
            },
            {
              id: 'specialized-therapy',
              label: 'Specialized Therapy',
              content: (
                <div>
                  <p className="mb-3">Work with therapists who understand first responder culture:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>CPT or PE adapted for cumulative trauma</li>
                    <li>EMDR for processing multiple traumatic incidents</li>
                    <li>Group therapy with other first responders</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'organizational',
              label: 'Organizational Support',
              content: (
                <div>
                  <p className="mb-3">Departments implementing:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Critical Incident Stress Management (CISM) programs</li>
                    <li>Mandatory post-critical-incident check-ins</li>
                    <li>Confidential employee assistance programs (EAPs)</li>
                    <li>Training leadership to recognize and respond to mental health concerns</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="resilience"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Building Resilience
        </h2>
        <p className="mb-6">
          Protective factors that reduce PTSD risk in first responders{', '}
          <Citation id="8" index={8} source="National Institute of Mental Health" year="2023" tier={2} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Strong social support</strong>: Both from fellow first responders and from family/friends</li>
          <li><strong>Work-life balance</strong>: Time off, hobbies, identity beyond the job</li>
          <li><strong>Physical health</strong>: Regular exercise, adequate sleep, healthy diet</li>
          <li><strong>Sense of meaning</strong>: Connecting work to larger purpose and values</li>
          <li><strong>Humor</strong>: Healthy (not dark/dismissive) humor helps process difficult experiences</li>
          <li><strong>Mental health literacy</strong>: Understanding PTSD and knowing when to seek help</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4"><strong>Key Takeaways:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>First responders have 2-5x higher PTSD rates than general population</li>
            <li>Cumulative exposure and cultural barriers create unique challenges</li>
            <li>Seeking help is professional, not weak—untreated PTSD ends careers</li>
            <li>Evidence-based treatments work when adapted for first responder context</li>
            <li>Organizational support is essential, not optional</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          If you're a first responder struggling with trauma symptoms, know this: what you're experiencing is a normal response to abnormal, repeated exposure. You've spent your career helping others—it's time to let others help you. Your service matters, and so does your well-being.
        </p>
      </>
    ),
  },

  {
    id: catId(19),
    slug: 'military-ptsd-combat-trauma-challenges-coming-home',
    title: 'Military PTSD: Combat Trauma and the Challenges of Coming Home',
    description: 'Combat PTSD affects 11-20% of veterans. Learn about military trauma, the transition home, barriers to care, and VA treatment options.',
    image: "/images/articles/cat11/cover-019.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Military PTSD', 'Combat Trauma', 'Veterans', 'VA Services'],
    citations: [
      {
        id: '1',
        text: 'PTSD in veterans: Epidemiology and treatment',
        source: 'Military Medicine',
        year: '2019',
        link: 'https://doi.org/10.1093/milmed/usy223',
        tier: 1,
      },
      {
        id: '2',
        text: 'Combat exposure and PTSD',
        source: 'JAMA Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1001/jamapsychiatry.2020.2151',
        tier: 1,
      },
      {
        id: '3',
        text: 'Understanding PTSD and PTSD treatment for veterans',
        source: 'National Center for PTSD',
        year: '2023',
        link: 'https://www.ptsd.va.gov/understand_tx/tx_basics.asp',
        tier: 2,
      },
      {
        id: '4',
        text: 'Moral injury in combat veterans',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102025',
        tier: 1,
      },
      {
        id: '5',
        text: 'Transition from military to civilian life',
        source: 'Military Psychology',
        year: '2020',
        link: 'https://doi.org/10.1080/08995605.2020.1754128',
        tier: 1,
      },
      {
        id: '6',
        text: 'TBI and PTSD comorbidity',
        source: 'Brain Injury',
        year: '2019',
        link: 'https://doi.org/10.1080/02699052.2019.1565895',
        tier: 1,
      },
      {
        id: '7',
        text: 'Evidence-based treatments for veterans with PTSD',
        source: 'Department of Veterans Affairs',
        year: '2023',
        link: 'https://www.va.gov/health-care/health-needs-conditions/mental-health/ptsd/',
        tier: 2,
      },
      {
        id: '8',
        text: 'Military sexual trauma',
        source: 'Trauma, Violence, & Abuse',
        year: '2020',
        link: 'https://doi.org/10.1177/1524838020906530',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You came home, but part of you is still there. Fireworks sound like incoming rounds. Crowds feel like ambush zones. You scan rooftops and assess threats that don't exist here. Your family says you've changed, that you're distant, angry, not the person who deployed. They don't understand what you've seen, what you've done, what you carry.
          </p>
          <p className="mb-6">
            Combat PTSD is distinct from civilian trauma. The intensity, duration, moral complexity, and military culture all create unique challenges for veterans{', '}
            <Citation id="1" index={1} source="Military Medicine" year="2019" tier={1} />.
          </p>
        </div>

        <h2
          id="prevalence"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          PTSD in Military Populations
        </h2>

        <StatCard
          stats={[
            { value: 11, suffix: '-20%', label: 'Iraq/Afghanistan veterans have PTSD' },
            { value: 15, suffix: '%', label: 'Vietnam veterans currently have PTSD' },
            { value: 12, suffix: '%', label: 'Gulf War veterans have PTSD' },
          ]}
          source="National Center for PTSD, 2023"
        />

        <p className="mb-6 mt-6">
          PTSD rates vary by conflict, role, and exposure. Combat exposure is the strongest predictor, but PTSD can develop from non-combat military experiences as well{', '}
          <Citation id="2" index={2} source="JAMA Psychiatry" year="2020" tier={1} />.
        </p>

        <h2
          id="unique-aspects"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Makes Combat PTSD Unique
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'prolonged',
              title: 'Prolonged, Repeated Exposure',
              content: (
                <p>
                  Unlike single-incident trauma, combat typically involves extended periods (months to years) of repeated threat exposure. Multiple deployments compound the effect. The cumulative burden is immense.
                </p>
              ),
            },
            {
              id: 'moral-injury',
              title: 'Moral Injury',
              content: (
                <div>
                  <p className="mb-3">
                    Many veterans struggle with <strong>moral injury</strong>—distress from actions (or inactions) that violated their moral code{', '}
                    <Citation id="4" index={4} source="Clinical Psychology Review" year="2021" tier={1} />:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Killing, even when necessary and lawful</li>
                    <li>Witnessing atrocities</li>
                    <li>Being unable to save wounded comrades</li>
                    <li>Civilian casualties</li>
                    <li>Betrayal by leadership or military</li>
                  </ul>
                  <p className="mt-3">
                    Moral injury involves guilt, shame, and loss of meaning/faith—symptoms that standard PTSD treatment doesn't fully address.
                  </p>
                </div>
              ),
            },
            {
              id: 'identity',
              title: 'Military Identity and Culture',
              content: (
                <div>
                  <p className="mb-3">Military culture emphasizes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Strength, not vulnerability</li>
                    <li>Mission completion over personal needs</li>
                    <li>Unit cohesion and not burdening others</li>
                    <li>Self-reliance</li>
                  </ul>
                  <p className="mt-3">
                    These values, while adaptive in combat, can prevent veterans from acknowledging distress or seeking help.
                  </p>
                </div>
              ),
            },
            {
              id: 'loss-of-purpose',
              title: 'Loss of Purpose and Structure',
              content: (
                <p>
                  Military service provides clear mission, structure, and camaraderie. Transitioning to civilian life can feel aimless and isolating{', '}
                  <Citation id="5" index={5} source="Military Psychology" year="2020" tier={1} />. Veterans often describe civilian concerns as trivial after what they've experienced.
                </p>
              ),
            },
            {
              id: 'mst',
              title: 'Military Sexual Trauma (MST)',
              content: (
                <div>
                  <p className="mb-3">
                    MST—sexual assault or harassment during military service—affects approximately 1 in 4 women and 1 in 100 men in the military{', '}
                    <Citation id="8" index={8} source="Trauma, Violence, & Abuse" year="2020" tier={1} />.
                  </p>
                  <p>
                    MST creates unique trauma: betrayal by those you serve with, reporting barriers, and often inadequate institutional response. It significantly increases PTSD risk.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="comorbidity"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Common Co-Occurring Conditions
        </h2>
        <p className="mb-6">PTSD in veterans rarely occurs alone:</p>

        <ArticleChart
          type="bar"
          title="Comorbid Conditions in Veterans with PTSD"
          data={[
            { label: 'Traumatic Brain Injury', value: 45 },
            { label: 'Depression', value: 50 },
            { label: 'Substance Use Disorders', value: 35 },
            { label: 'Chronic Pain', value: 60 },
            { label: 'Sleep Disorders', value: 80 },
          ]}
          source="Approximate percentages from multiple studies"
        />

        <p className="mb-6 mt-6">
          <strong>Traumatic Brain Injury (TBI)</strong> deserves special mention. Many Iraq/Afghanistan veterans experienced blast-related TBIs. TBI and PTSD share overlapping symptoms (concentration problems, irritability, sleep disturbance), making diagnosis and treatment complex{', '}
          <Citation id="6" index={6} source="Brain Injury" year="2019" tier={1} />.
        </p>

        <h2
          id="barriers"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Barriers to Seeking Care
        </h2>
        <p className="mb-6">Despite VA mental health services being available, many veterans don't access care due to:</p>

        <BeforeAfter
          before={{
            title: 'Perceived Barriers',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"Asking for help is weak"</li>
                <li>"It will hurt my career" (active duty)</li>
                <li>"Others had it worse"</li>
                <li>"I should be able to handle this"</li>
                <li>"The VA is too bureaucratic/slow"</li>
                <li>"Therapy won't help"</li>
              </ul>
            ),
          }}
          after={{
            title: 'Reality',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Most veterans improve with treatment</li>
                <li>VA protections for mental health exist</li>
                <li>Your suffering is valid regardless of others"</li>
                <li>PTSD requires professional treatment</li>
                <li>VA has streamlined access; Vet Centers exist</li>
                <li>Evidence-based treatments have strong success rates</li>
              </ul>
            ),
          }}
        />

        <h2
          id="va-treatment"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          VA Treatment Options
        </h2>
        <p className="mb-6">
          The VA offers evidence-based PTSD treatments free of charge to eligible veterans{', '}
          <Citation id="7" index={7} source="Department of Veterans Affairs" year="2023" tier={2} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'psychotherapy',
              label: 'Psychotherapy',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Cognitive Processing Therapy (CPT)</strong>: 12 sessions addressing trauma-related thoughts</li>
                  <li><strong>Prolonged Exposure (PE)</strong>: Gradual, safe exposure to trauma reminders</li>
                  <li><strong>Eye Movement Desensitization and Reprocessing (EMDR)</strong>: Processing memories with bilateral stimulation</li>
                  <li><strong>Group therapy</strong>: Processing with other veterans</li>
                </ul>
              ),
            },
            {
              id: 'medication',
              label: 'Medication',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>SSRIs</strong>: Sertraline (Zoloft) and paroxetine (Paxil) are FDA-approved for PTSD</li>
                  <li><strong>Prazosin</strong>: For nightmares (though recent evidence is mixed)</li>
                  <li>Medication works best when combined with psychotherapy</li>
                </ul>
              ),
            },
            {
              id: 'other',
              label: 'Other Services',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Vet Centers</strong>: Community-based counseling in less clinical settings</li>
                  <li><strong>Peer support groups</strong>: Connect with other veterans</li>
                  <li><strong>Family therapy</strong>: Help loved ones understand and support recovery</li>
                  <li><strong>Vocational rehab</strong>: Employment support</li>
                  <li><strong>Residential programs</strong>: Intensive treatment for severe PTSD</li>
                </ul>
              ),
            },
          ]}
        />

        <ArticleCallout variant="tip">
          <p>
            <strong>How to access VA mental health care:</strong>
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Call the VA's general information hotline: 1-800-827-1000</li>
            <li>Veterans Crisis Line (24/7): 988, then press 1</li>
            <li>Find your nearest VA facility: va.gov/find-locations</li>
            <li>Vet Centers (no VA enrollment required): vetcenter.va.gov</li>
          </ul>
        </ArticleCallout>

        <h2
          id="for-families"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          For Family Members
        </h2>
        <p className="mb-6">
          PTSD affects the whole family. If you're living with a veteran with PTSD{', '}
          <Citation id="3" index={3} source="National Center for PTSD" year="2023" tier={2} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Educate yourself</strong>: Understanding PTSD helps you recognize it's not personal</li>
          <li><strong>Encourage treatment</strong>: Gently support (don't pressure) them to seek help</li>
          <li><strong>Set boundaries</strong>: You can be supportive while protecting your own well-being</li>
          <li><strong>Seek your own support</strong>: VA offers family counseling; you need support too</li>
          <li><strong>Don't try to 'fix' them</strong>: Professional help is necessary; your role is support</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4"><strong>Key Takeaways:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>11-20% of recent-era veterans have PTSD; rates vary by conflict and exposure</li>
            <li>Combat PTSD involves unique features: moral injury, identity shifts, comorbidity with TBI</li>
            <li>Military culture can be a barrier to seeking help, but recovery is possible</li>
            <li>VA offers free, evidence-based treatment for eligible veterans</li>
            <li>Family involvement and support improve outcomes</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          If you're a veteran struggling with combat trauma, know this: what you're experiencing is a normal response to abnormal experiences. You served your country. Now it's time to let others serve you. Treatment works. Recovery is possible. You don't have to carry this alone.
        </p>
      </>
    ),
  },

  {
    id: catId(20),
    slug: 'ptsd-vs-acute-stress-disorder-understanding-timeline',
    title: 'PTSD vs. Acute Stress Disorder: Understanding the Timeline',
    description: 'Not all trauma reactions become PTSD. Learn the difference between Acute Stress Disorder, normal trauma response, and PTSD—and why timing matters for treatment.',
    image: "/images/articles/cat11/cover-020.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['ASD', 'PTSD', 'Diagnosis', 'Early Intervention'],
    citations: [
      {
        id: '1',
        text: 'Acute Stress Disorder: A systematic review',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101849',
        tier: 1,
      },
      {
        id: '2',
        text: 'From acute stress to PTSD: Longitudinal studies',
        source: 'JAMA Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1001/jamapsychiatry.2019.0982',
        tier: 1,
      },
      {
        id: '3',
        text: 'Diagnostic criteria for Acute Stress Disorder',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://www.psychiatry.org/psychiatrists/practice/dsm',
        tier: 4,
      },
      {
        id: '4',
        text: 'Early intervention for trauma',
        source: 'Cochrane Database of Systematic Reviews',
        year: '2021',
        link: 'https://doi.org/10.1002/14651858.CD007944.pub3',
        tier: 1,
      },
      {
        id: '5',
        text: 'Natural recovery from trauma',
        source: 'Psychological Medicine',
        year: '2020',
        link: 'https://doi.org/10.1017/S0033291720001300',
        tier: 1,
      },
      {
        id: '6',
        text: 'Understanding trauma reactions',
        source: 'National Center for PTSD',
        year: '2023',
        link: 'https://www.ptsd.va.gov/understand/what/acute_stress.asp',
        tier: 2,
      },
      {
        id: '7',
        text: 'Psychological First Aid',
        source: 'World Health Organization',
        year: '2022',
        link: 'https://www.who.int/publications/i/item/9789241548205',
        tier: 2,
      },
      {
        id: '8',
        text: 'Trauma-focused CBT for ASD',
        source: 'Behavior Research and Therapy',
        year: '2019',
        link: 'https://doi.org/10.1016/j.brat.2019.05.002',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You experienced something traumatic a week ago. You're having nightmares, feeling on edge, replaying the event in your mind. Is this PTSD? Or is it a normal response that will resolve on its own? Understanding the distinction between acute stress reactions, Acute Stress Disorder (ASD), and PTSD is crucial—because timing matters for both diagnosis and treatment.
          </p>
          <p className="mb-6">
            Most people who experience trauma will have distressing reactions initially. For many, these symptoms naturally resolve within weeks. For others, they persist and develop into PTSD{', '}
            <Citation id="1" index={1} source="Clinical Psychology Review" year="2020" tier={1} />.
          </p>
        </div>

        <h2
          id="timeline"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Timeline of Trauma Responses
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Days 1-3: Acute Stress Reaction',
              description: (
                <div>
                  <p className="mb-3">
                    Immediate responses to trauma (within first 3 days) are considered <strong>acute stress reactions</strong>, not disorders:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Shock, numbness, or disbelief</li>
                    <li>Intense fear or anxiety</li>
                    <li>Confusion or difficulty concentrating</li>
                    <li>Physical symptoms (shaking, rapid heartbeat)</li>
                  </ul>
                  <p className="mt-3">
                    <em>This is normal. These reactions don't require formal diagnosis or treatment—supportive care and safety are the priorities{', '}
                    <Citation id="6" index={6} source="National Center for PTSD" year="2023" tier={2} />.</em>
                  </p>
                </div>
              ),
            },
            {
              title: 'Days 3-30: Acute Stress Disorder (ASD)',
              description: (
                <div>
                  <p className="mb-3">
                    If symptoms persist and intensify from day 3 to day 30, you may meet criteria for <strong>Acute Stress Disorder</strong>.
                  </p>
                  <p>ASD is essentially PTSD-like symptoms that occur in the first month after trauma. It's a separate diagnosis that acknowledges early, significant distress.</p>
                </div>
              ),
            },
            {
              title: 'After 1 Month: PTSD',
              description: (
                <div>
                  <p className="mb-3">
                    If symptoms persist beyond 1 month and cause significant impairment, the diagnosis shifts to <strong>PTSD</strong>.
                  </p>
                  <p>
                    About 50% of people with ASD go on to develop PTSD{', '}
                    <Citation id="2" index={2} source="JAMA Psychiatry" year="2019" tier={1} />. The other 50% recover with time, support, or early intervention.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="asd-criteria"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Acute Stress Disorder Diagnostic Criteria
        </h2>
        <p className="mb-6">
          According to the DSM-5-TR, ASD requires{', '}
          <Citation id="3" index={3} source="American Psychiatric Association" year="2022" tier={4} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'exposure',
              title: 'Criterion A: Trauma Exposure',
              content: (
                <p>
                  Exposure to actual or threatened death, serious injury, or sexual violence (same as PTSD).
                </p>
              ),
            },
            {
              id: 'symptoms',
              title: 'Criterion B: Intrusion, Negative Mood, Dissociation, Avoidance, Arousal',
              content: (
                <div>
                  <p className="mb-3">At least 9 symptoms from these categories:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Intrusion symptoms</strong>: Intrusive memories, nightmares, flashbacks, distress at reminders</li>
                    <li><strong>Negative mood</strong>: Inability to experience positive emotions</li>
                    <li><strong>Dissociative symptoms</strong>: Altered sense of reality, feeling detached, amnesia for parts of the trauma</li>
                    <li><strong>Avoidance symptoms</strong>: Avoiding memories or external reminders</li>
                    <li><strong>Arousal symptoms</strong>: Sleep problems, irritability, hypervigilance, concentration problems, exaggerated startle</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'duration',
              title: 'Criterion C: Duration',
              content: (
                <p>
                  Symptoms last from 3 days to 1 month after trauma exposure. If symptoms persist beyond 1 month, diagnosis changes to PTSD.
                </p>
              ),
            },
            {
              id: 'impairment',
              title: 'Criterion D: Functional Impairment',
              content: (
                <p>
                  Symptoms cause clinically significant distress or impairment in social, occupational, or other important functioning.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="comparison"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          ASD vs. PTSD: Key Differences
        </h2>

        <ComparisonTable
          title="ASD vs. PTSD"
          columns={['Feature', 'Acute Stress Disorder', 'PTSD']}
          items={[
            {
              feature: 'Onset',
              values: ['3 days to 1 month post-trauma', '1+ months post-trauma'],
            },
            {
              feature: 'Duration',
              values: ['Maximum 1 month', 'Can last years without treatment'],
            },
            {
              feature: 'Dissociation',
              values: ['Emphasized in criteria', 'Not required (though can be present)'],
            },
            {
              feature: 'Prognosis',
              values: ['50% recover naturally', 'Rarely resolves without treatment'],
            },
            {
              feature: 'Treatment urgency',
              values: ['Early intervention may prevent PTSD', 'Established condition requires treatment'],
            },
          ]}
          highlightColumn={1}
        />

        <h2
          id="natural-recovery"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Natural Recovery vs. Chronic PTSD
        </h2>
        <p className="mb-6">
          Most people who experience trauma do NOT develop chronic PTSD{', '}
          <Citation id="5" index={5} source="Psychological Medicine" year="2020" tier={1} />:
        </p>

        <ArticleChart
          type="pie"
          title="Trauma Outcomes at 3 Months Post-Trauma"
          data={[
            { label: 'Natural recovery', value: 60 },
            { label: 'Developed PTSD', value: 25 },
            { label: 'Subclinical symptoms', value: 15 },
          ]}
          source="Meta-analysis data (approximate)"
        />

        <p className="mb-6 mt-6">
          The majority of trauma survivors experience natural recovery—symptoms gradually decrease over weeks to months without formal treatment. This is resilience in action.
        </p>

        <ArticleCallout variant="info">
          <p>
            <strong>Signs you're on the path to natural recovery:</strong>
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Symptoms are gradually decreasing (even if slowly)</li>
            <li>You're having more good days than bad</li>
            <li>Sleep is slowly improving</li>
            <li>You can talk about the event without becoming completely overwhelmed</li>
            <li>You're able to engage with daily activities</li>
          </ul>
        </ArticleCallout>

        <h2
          id="when-to-seek-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When to Seek Professional Help
        </h2>
        <p className="mb-6">You don't have to wait a month to seek help. Consider professional support if:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Symptoms are severe and significantly impair your functioning</li>
          <li>You're having thoughts of self-harm or suicide</li>
          <li>Symptoms are getting worse instead of better</li>
          <li>You're using alcohol or drugs to cope</li>
          <li>You can't work, care for family, or maintain basic daily functions</li>
          <li>You've had PTSD in the past (you're at higher risk)</li>
        </ul>

        <h2
          id="early-intervention"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Early Intervention for ASD
        </h2>
        <p className="mb-6">
          Research shows that early intervention for ASD can prevent the development of chronic PTSD{', '}
          <Citation id="4" index={4} source="Cochrane Database" year="2021" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'pfa',
              label: 'Psychological First Aid',
              content: (
                <div>
                  <p className="mb-3">
                    Immediate, supportive intervention in the days following trauma{', '}
                    <Citation id="7" index={7} source="World Health Organization" year="2022" tier={2} />:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Providing safety and comfort</li>
                    <li>Practical assistance</li>
                    <li>Connection to social support</li>
                    <li>Information about normal stress reactions</li>
                    <li>Referral to services if needed</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'cbt',
              label: 'Trauma-Focused CBT',
              content: (
                <div>
                  <p className="mb-3">
                    Brief (5-7 sessions) cognitive-behavioral therapy specifically for ASD{', '}
                    <Citation id="8" index={8} source="Behavior Research and Therapy" year="2019" tier={1} />:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Psychoeducation about normal trauma reactions</li>
                    <li>Breathing and relaxation training</li>
                    <li>Cognitive restructuring of trauma-related thoughts</li>
                    <li>Gradual exposure to trauma memories and reminders</li>
                  </ul>
                  <p className="mt-3"><em>This can reduce PTSD development by about 50%.</em></p>
                </div>
              ),
            },
            {
              id: 'avoid',
              label: 'What NOT to Do',
              content: (
                <div>
                  <p className="mb-3">Avoid these debunked approaches:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Critical Incident Stress Debriefing (single-session)</strong>: Not helpful and may harm</li>
                    <li><strong>Benzodiazepines</strong>: May interfere with natural processing and increase PTSD risk</li>
                    <li><strong>Forced processing</strong>: Pushing someone to talk before they're ready</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4"><strong>Key Takeaways:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>ASD occurs 3 days to 1 month after trauma; PTSD is diagnosed after 1 month</li>
            <li>Most trauma survivors recover naturally without developing chronic PTSD</li>
            <li>About 50% of people with ASD go on to develop PTSD</li>
            <li>Early intervention for ASD can prevent chronic PTSD</li>
            <li>Don't wait to seek help if symptoms are severe or worsening</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          If you're in the early days or weeks after trauma, be patient with yourself. Your reactions are normal. Many people recover naturally with time, support, and self-care. But if symptoms are severe or persistent, early professional help can make a significant difference in preventing long-term PTSD.
        </p>
      </>
    ),
  },
];
