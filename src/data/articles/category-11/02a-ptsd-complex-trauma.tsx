import React from 'react';
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

export const ptsdComplexTraumaArticlesA: Article[] = [
  {
    id: catId(11),
    slug: 'ptsd-complete-guide-post-traumatic-stress-disorder',
    title: 'PTSD: A Complete Guide to Post-Traumatic Stress Disorder',
    description: 'A comprehensive guide to PTSD covering symptoms, causes, diagnosis, treatment options, and recovery. Learn what PTSD is and how to get help.',
    image: "/images/articles/cat11/cover-011.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 14,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['PTSD', 'Diagnosis', 'Treatment', 'Recovery', 'Mental Health'],
    citations: [
      {
        id: '1',
        text: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://www.psychiatry.org/psychiatrists/practice/dsm',
        tier: 4,
      },
      {
        id: '2',
        text: 'Posttraumatic stress disorder',
        source: 'Nature Reviews Disease Primers',
        year: '2015',
        link: 'https://doi.org/10.1038/nrdp.2015.57',
        tier: 1,
      },
      {
        id: '3',
        text: 'Understanding PTSD and PTSD treatment',
        source: 'National Center for PTSD',
        year: '2023',
        link: 'https://www.ptsd.va.gov/understand/index.asp',
        tier: 2,
      },
      {
        id: '4',
        text: 'Prevalence of PTSD in the United States',
        source: 'JAMA Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1001/jamapsychiatry.2020.2269',
        tier: 1,
      },
      {
        id: '5',
        text: 'Evidence-based psychotherapies for PTSD',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102015',
        tier: 1,
      },
      {
        id: '6',
        text: 'Pharmacotherapy for PTSD: A systematic review',
        source: 'JAMA Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1001/jamapsychiatry.2019.0892',
        tier: 1,
      },
      {
        id: '7',
        text: 'PTSD and comorbid conditions',
        source: 'American Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1176/appi.ajp.2020.20010053',
        tier: 1,
      },
      {
        id: '8',
        text: 'Recovery from PTSD: A meta-analysis',
        source: 'Psychological Medicine',
        year: '2018',
        link: 'https://doi.org/10.1017/S0033291718002453',
        tier: 1,
      },
      {
        id: '9',
        text: 'Risk and resilience factors for PTSD',
        source: 'Psychological Bulletin',
        year: '2019',
        link: 'https://doi.org/10.1037/bul0000195',
        tier: 1,
      },
      {
        id: '10',
        text: 'Post-traumatic stress disorder',
        source: 'World Health Organization',
        year: '2022',
        link: 'https://www.who.int/news-room/fact-sheets/detail/post-traumatic-stress-disorder',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Post-Traumatic Stress Disorder (PTSD) is a mental health condition that develops after experiencing or
            witnessing a traumatic event. While it's normal to have distressing reactions after trauma, PTSD occurs
            when those reactions persist, intensify, or interfere with daily life for an extended period. Understanding
            PTSD is the first step toward recognizing it and getting effective treatment.
          </p>
          <p className="mb-6">
            This comprehensive guide covers everything you need to know about PTSD: what it is, how it's diagnosed, who
            gets it, treatment options, and the path to recovery{', '}
            <Citation id="2" index={2} source="Nature Reviews Disease Primers" year="2015" tier={1} />.
          </p>
        </div>

        <h2
          id="what-is-ptsd"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is PTSD?
        </h2>
        <p className="mb-6">
          PTSD is a psychiatric disorder that can occur in people who have experienced or witnessed a traumatic event
          such as a natural disaster, serious accident, terrorist act, war/combat, rape, or other violent personal
          assault{', '}
          <Citation id="1" index={1} source="American Psychiatric Association" year="2022" tier={4} />.
        </p>
        <p className="mb-6">
          The key word is "disorder"—PTSD is not just the immediate shock or distress following trauma (which is
          normal). It's a pattern of symptoms that persist for more than a month and significantly impair functioning.
        </p>

        <StatCard
          stats={[
            { value: 6, suffix: '%', label: 'U.S. adults will have PTSD in their lifetime' },
            { value: 8, suffix: 'M', label: 'American adults have PTSD in a given year' },
            { value: 10, suffix: '%', label: 'Women develop PTSD (vs. 4% of men)' },
          ]}
          source="National Center for PTSD, 2023"
        />

        <h2
          id="dsm-criteria"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          DSM-5-TR Diagnostic Criteria
        </h2>
        <p className="mb-6">
          The DSM-5-TR (the diagnostic manual used by mental health professionals) defines PTSD with specific criteria{', '}
          <Citation id="1" index={1} source="American Psychiatric Association" year="2022" tier={4} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'criterion-a',
              label: 'Criterion A: Exposure',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>You must have been exposed to actual or threatened death, serious injury, or sexual violence in at least one of these ways:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Directly experiencing the traumatic event</li>
                    <li>Witnessing the event happen to others</li>
                    <li>Learning that the event happened to a close family member or friend</li>
                    <li>
                      Experiencing repeated or extreme exposure to aversive details of traumatic events (e.g., first
                      responders collecting human remains)
                    </li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'criterion-b',
              label: 'Criterion B: Intrusion',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>One or more intrusion symptoms:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Recurrent, involuntary, intrusive distressing memories</li>
                    <li>Recurrent distressing dreams related to the trauma</li>
                    <li>Dissociative reactions (flashbacks) where you feel or act as if the trauma is recurring</li>
                    <li>Intense psychological distress at reminders of the trauma</li>
                    <li>Marked physiological reactions to trauma reminders</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'criterion-c',
              label: 'Criterion C: Avoidance',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Persistent avoidance of trauma-related stimuli (one or both):</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Avoidance of trauma-related thoughts, feelings, or memories</li>
                    <li>Avoidance of external reminders (people, places, activities, objects, situations)</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'criterion-d',
              label: 'Criterion D: Negative Cognition',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Negative alterations in cognitions and mood (two or more):</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Inability to remember important aspects of the trauma</li>
                    <li>Persistent negative beliefs about oneself, others, or the world</li>
                    <li>Persistent distorted blame of self or others</li>
                    <li>Persistent negative emotional state</li>
                    <li>Markedly diminished interest or participation in significant activities</li>
                    <li>Feelings of detachment from others</li>
                    <li>Persistent inability to experience positive emotions</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'criterion-e',
              label: 'Criterion E: Arousal',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Marked alterations in arousal and reactivity (two or more):</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Irritable behavior and angry outbursts</li>
                    <li>Reckless or self-destructive behavior</li>
                    <li>Hypervigilance</li>
                    <li>Exaggerated startle response</li>
                    <li>Problems with concentration</li>
                    <li>Sleep disturbance</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'other-criteria',
              label: 'Additional Criteria',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>Duration, functional impairment, and exclusion:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Symptoms persist for more than 1 month</li>
                    <li>Symptoms cause clinically significant distress or impairment in functioning</li>
                    <li>Symptoms are not due to medication, substance use, or other illness</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="clinical-note" title="Note">
          <p>
            You don't need to have every symptom listed to be diagnosed with PTSD. The criteria require a combination
            from each category. Also, symptoms can vary in intensity over time.
          </p>
        </ArticleCallout>

        <h2
          id="who-gets-ptsd"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Who Gets PTSD?
        </h2>
        <p className="mb-6">
          Not everyone who experiences trauma develops PTSD. In fact, the majority of people exposed to trauma do not
          develop the disorder{', '}
          <Citation id="4" index={4} source="JAMA Psychiatry" year="2020" tier={1} />. Approximately 10-20% of people
          exposed to traumatic events develop PTSD.
        </p>
        <p className="mb-6">
          Risk factors that increase the likelihood of developing PTSD include{', '}
          <Citation id="9" index={9} source="Psychological Bulletin" year="2019" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'event-factors',
              title: 'Event-Related Factors',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Severity of the trauma (life-threatening, involves serious injury)</li>
                  <li>Interpersonal trauma (assault, abuse) carries higher risk than accidents or natural disasters</li>
                  <li>Repeated or prolonged trauma exposure</li>
                  <li>Peritraumatic dissociation (feeling detached during the event)</li>
                </ul>
              ),
            },
            {
              id: 'individual-factors',
              title: 'Individual Factors',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Prior trauma history, especially childhood trauma</li>
                  <li>Pre-existing mental health conditions (depression, anxiety)</li>
                  <li>Family history of mental health problems</li>
                  <li>Female sex (women are 2x more likely to develop PTSD)</li>
                  <li>Younger age at time of trauma</li>
                  <li>Genetic vulnerability</li>
                </ul>
              ),
            },
            {
              id: 'post-event',
              title: 'Post-Event Factors',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Lack of social support</li>
                  <li>Additional life stress after the trauma</li>
                  <li>Negative appraisal of the event or its aftermath</li>
                  <li>Avoidant coping strategies</li>
                </ul>
              ),
            },
          ]}
        />

        <h2
          id="course-timeline"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Timeline and Course of PTSD
        </h2>
        <p className="mb-6">
          PTSD symptoms can begin immediately after trauma or appear months (rarely years) later. The DSM-5-TR
          distinguishes:
        </p>

        <ComparisonTable
          title="PTSD Specifiers by Onset"
          columns={['Type', 'Symptom Onset', 'Clinical Notes']}
          items={[
            {
              feature: 'Acute Stress Disorder',
              values: ['3 days to 1 month post-trauma', 'Immediate reaction; may or may not develop into PTSD'],
            },
            {
              feature: 'PTSD',
              values: ['1+ months post-trauma', 'Full criteria met for at least one month'],
            },
            {
              feature: 'Delayed Expression PTSD',
              values: ['6+ months post-trauma', 'Full criteria not met until at least 6 months after trauma'],
            },
          ]}
          highlightColumn={1}
        />

        <p className="mb-6 mt-6">
          The course of PTSD varies{', '}
          <Citation id="3" index={3} source="National Center for PTSD" year="2023" tier={2} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Natural recovery</strong>: About half of people with PTSD recover within 3 months without treatment
          </li>
          <li>
            <strong>Chronic PTSD</strong>: For others, symptoms persist for years without treatment
          </li>
          <li>
            <strong>Waxing and waning</strong>: Symptoms may fluctuate in intensity, often worsening under stress
          </li>
        </ul>

        <h2
          id="treatment"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Evidence-Based Treatments for PTSD
        </h2>
        <p className="mb-6">
          The good news: PTSD is treatable. Multiple evidence-based therapies have strong research support{', '}
          <Citation id="5" index={5} source="Clinical Psychology Review" year="2021" tier={1} />.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">Psychotherapy (First-Line Treatment)</h3>

        <ArticleTabs
          tabs={[
            {
              id: 'cpt',
              label: 'Cognitive Processing Therapy',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>CPT</strong> helps you examine and change unhelpful beliefs about the trauma. You learn to
                    challenge thoughts like "It was my fault" or "The world is completely unsafe."
                  </p>
                  <p className="mb-4">
                    <strong>Format</strong>: 12 sessions, can be individual or group
                  </p>
                  <p>
                    <strong>Evidence</strong>: One of the most well-researched PTSD treatments, particularly effective
                    for trauma involving interpersonal violence
                  </p>
                </div>
              ),
            },
            {
              id: 'pe',
              label: 'Prolonged Exposure',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>PE</strong> involves gradually approaching trauma-related memories, feelings, and situations
                    you've been avoiding. Through repeated, safe exposure, you learn that these reminders are not
                    actually dangerous.
                  </p>
                  <p className="mb-4">
                    <strong>Format</strong>: 8-15 sessions
                  </p>
                  <p>
                    <strong>Evidence</strong>: Extensive research support; reduces avoidance and anxiety
                  </p>
                </div>
              ),
            },
            {
              id: 'emdr',
              label: 'EMDR',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>EMDR (Eye Movement Desensitization and Reprocessing)</strong> uses bilateral stimulation
                    (eye movements, tapping) while you recall traumatic memories. This helps your brain process the
                    memory differently.
                  </p>
                  <p className="mb-4">
                    <strong>Format</strong>: 6-12 sessions typically
                  </p>
                  <p>
                    <strong>Evidence</strong>: WHO-recommended; particularly helpful for single-event trauma
                  </p>
                </div>
              ),
            },
            {
              id: 'other',
              label: 'Other Therapies',
              content: (
                <div>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      <strong>Trauma-Focused CBT</strong>: Cognitive-behavioral approach addressing trauma-related
                      thoughts and behaviors
                    </li>
                    <li>
                      <strong>Narrative Exposure Therapy</strong>: Creating a coherent life narrative that integrates
                      traumatic experiences
                    </li>
                    <li>
                      <strong>Present-Centered Therapy</strong>: Focuses on current life problems stemming from trauma
                    </li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-bold mt-8 mb-4">Medication</h3>
        <p className="mb-6">
          While therapy is the first-line treatment, medications can help manage PTSD symptoms{', '}
          <Citation id="6" index={6} source="JAMA Psychiatry" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>SSRIs</strong> (sertraline/Zoloft, paroxetine/Paxil): Only FDA-approved medications for PTSD
          </li>
          <li>
            <strong>SNRIs</strong> (venlafaxine/Effexor): Often prescribed off-label
          </li>
          <li>
            <strong>Prazosin</strong>: May help with nightmares
          </li>
        </ul>
        <p className="mb-6">
          Medication works best when combined with psychotherapy. It can reduce symptoms enough to make therapy more
          tolerable, but doesn't replace the need for trauma processing.
        </p>

        <h2
          id="comorbidity"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Co-Occurring Conditions
        </h2>
        <p className="mb-6">
          PTSD rarely exists alone. Common co-occurring conditions include{', '}
          <Citation id="7" index={7} source="American Journal of Psychiatry" year="2020" tier={1} />:
        </p>

        <ArticleChart
          type="bar"
          title="Common Comorbid Conditions with PTSD"
          data={[
            { label: 'Major Depression', value: 48 },
            { label: 'Anxiety Disorders', value: 44 },
            { label: 'Substance Use Disorders', value: 27 },
            { label: 'Sleep Disorders', value: 70 },
          ]}
          source="American Journal of Psychiatry, 2020 (approximate percentages)"
        />

        <p className="mb-6 mt-6">
          Effective PTSD treatment often improves co-occurring conditions as well, though sometimes they require
          separate, targeted treatment.
        </p>

        <h2
          id="recovery"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Recovery and Prognosis
        </h2>
        <p className="mb-6">
          The prognosis for PTSD with proper treatment is good{', '}
          <Citation id="8" index={8} source="Psychological Medicine" year="2018" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>With evidence-based treatment, 50-60% of people with PTSD experience significant improvement</li>
          <li>Many achieve full remission (no longer meet criteria for PTSD)</li>
          <li>Even without full remission, symptoms can become more manageable</li>
          <li>Early intervention improves outcomes</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Key Takeaways:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>PTSD is a specific disorder with defined diagnostic criteria, not just general distress after trauma</li>
            <li>About 6-8% of people will have PTSD in their lifetime</li>
            <li>Symptoms include intrusive memories, avoidance, negative thoughts/mood, and hyperarousal</li>
            <li>Evidence-based treatments (CPT, PE, EMDR) are highly effective</li>
            <li>Recovery is possible—most people improve significantly with proper treatment</li>
          </ul>
        </ArticleCallout>

        <h2
          id="when-to-seek-help"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          When to Seek Help
        </h2>
        <p className="mb-6">
          If you've experienced a traumatic event and symptoms have persisted for more than a month, interfere with your
          daily life, or cause significant distress, it's time to seek professional help{', '}
          <Citation id="10" index={10} source="World Health Organization" year="2022" tier={2} />.
        </p>
        <p className="mb-6">Look for a mental health professional who specializes in trauma and uses evidence-based treatments like CPT, PE, or EMDR. Don't be discouraged if the first therapist or treatment approach isn't the right fit—finding the right match is part of the process.</p>
        <p className="mb-6">
          PTSD is not a sign of weakness. It's a normal response of a nervous system that experienced something
          abnormal. With the right support, healing is not just possible—it's expected.
        </p>
      </>
    ),
  },

  {
    id: catId(12),
    slug: 'complex-ptsd-dsm-catching-up',
    title: 'Complex PTSD: The Condition the DSM Is Still Catching Up To',
    description: 'Complex PTSD is distinct from PTSD but not yet recognized in the DSM-5. Learn about C-PTSD, its unique symptoms, and why the diagnosis matters.',
    image: "/images/articles/cat11/cover-012.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 13,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['C-PTSD', 'Complex Trauma', 'Diagnosis', 'ICD-11', 'Treatment'],
    citations: [
      {
        id: '1',
        text: 'ICD-11 Complex Post Traumatic Stress Disorder: Simplifying diagnosis in trauma populations',
        source: 'British Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1192/bjp.2019.48',
        tier: 1,
      },
      {
        id: '2',
        text: 'Complex PTSD: A syndrome in survivors of prolonged and repeated trauma',
        source: 'Journal of Traumatic Stress',
        year: '1992',
        link: 'https://doi.org/10.1002/jts.2490050305',
        tier: 1,
      },
      {
        id: '3',
        text: 'Distinguishing PTSD, complex PTSD, and borderline personality disorder',
        source: 'European Journal of Psychotraumatology',
        year: '2019',
        link: 'https://doi.org/10.1080/20008198.2019.1654052',
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
        text: 'Childhood trauma and complex PTSD symptoms',
        source: 'Journal of Affective Disorders',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jad.2020.01.029',
        tier: 1,
      },
      {
        id: '6',
        text: 'Complex PTSD prevalence estimates',
        source: 'Acta Psychiatrica Scandinavica',
        year: '2021',
        link: 'https://doi.org/10.1111/acps.13325',
        tier: 1,
      },
      {
        id: '7',
        text: 'Phase-based treatment for complex PTSD',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101872',
        tier: 1,
      },
      {
        id: '8',
        text: 'Understanding complex trauma',
        source: 'National Child Traumatic Stress Network',
        year: '2022',
        link: 'https://www.nctsn.org/what-is-child-trauma/trauma-types/complex-trauma',
        tier: 2,
      },
      {
        id: '9',
        text: 'Attachment disruption in complex PTSD',
        source: 'Attachment & Human Development',
        year: '2020',
        link: 'https://doi.org/10.1080/14616734.2020.1751987',
        tier: 1,
      },
      {
        id: '10',
        text: 'Emotion dysregulation in complex PTSD',
        source: 'Behavior Research and Therapy',
        year: '2019',
        link: 'https://doi.org/10.1016/j.brat.2019.05.004',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Imagine being diagnosed with depression, then anxiety, then borderline personality disorder—cycling through
            treatments that help a little but never quite address what you're experiencing. This is the story of many
            people with Complex PTSD (C-PTSD), a condition that wasn't officially recognized until 2018, and even then,
            only in the international classification system—not in the DSM-5 used in the United States.
          </p>
          <p className="mb-6">
            Complex PTSD represents a crucial evolution in our understanding of trauma. It acknowledges that prolonged,
            repeated trauma—especially in childhood—creates a different clinical picture than single-incident trauma,
            requiring a different treatment approach{', '}
            <Citation id="2" index={2} source="Journal of Traumatic Stress" year="1992" tier={1} />.
          </p>
        </div>

        <h2
          id="history"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          A Brief History: Why It Took So Long
        </h2>
        <p className="mb-6">
          The concept of Complex PTSD was first proposed by trauma researcher Judith Herman in her 1992 book <em>Trauma
          and Recovery</em>. She observed that survivors of prolonged trauma (abuse, captivity, domestic violence)
          showed symptoms beyond classic PTSD—particularly problems with emotion regulation, self-concept, and
          relationships.
        </p>
        <p className="mb-6">
          For decades, C-PTSD existed in clinical practice but not in official diagnostic manuals. Clinicians knew what
          they were seeing, but had no official label for it. Many C-PTSD patients were misdiagnosed with:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Borderline Personality Disorder (BPD)</li>
          <li>Treatment-resistant depression</li>
          <li>Generalized anxiety disorder</li>
          <li>Dissociative disorders</li>
        </ul>
        <p className="mb-6">
          In 2018, the World Health Organization's ICD-11 (International Classification of Diseases, 11th edition)
          officially recognized Complex PTSD as a distinct diagnosis{', '}
          <Citation id="1" index={1} source="British Journal of Psychiatry" year="2020" tier={1} />. However, the
          American Psychiatric Association's DSM-5 (and DSM-5-TR) still does not include C-PTSD as a separate disorder.
        </p>

        <ArticleCallout variant="did-you-know">
          <p>
            The DSM-5 introduced "PTSD with dissociative symptoms" as a specifier, which captures some aspects of C-PTSD
            but doesn't fully address the emotion regulation and self-concept features that make C-PTSD distinct.
          </p>
        </ArticleCallout>

        <h2
          id="what-is-cptsd"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Complex PTSD?
        </h2>
        <p className="mb-6">
          According to the ICD-11, Complex PTSD includes all the symptoms of PTSD <strong>plus</strong> three additional
          symptom clusters{', '}
          <Citation id="1" index={1} source="British Journal of Psychiatry" year="2020" tier={1} />:
        </p>

        <ComparisonTable
          title="PTSD vs. Complex PTSD"
          columns={['Component', 'PTSD', 'C-PTSD']}
          items={[
            {
              feature: 'Core symptoms',
              values: [
                'Re-experiencing, avoidance, hyperarousal',
                'PTSD symptoms PLUS disturbances in self-organization',
              ],
            },
            {
              feature: 'Trauma type',
              values: ['Usually single-incident', 'Prolonged, repeated, often interpersonal'],
            },
            {
              feature: 'Emotion regulation',
              values: ['Usually intact', 'Severe dysregulation'],
            },
            {
              feature: 'Self-concept',
              values: ['Relatively stable', 'Pervasive negative self-beliefs'],
            },
            {
              feature: 'Relationships',
              values: ['Can maintain connections', 'Persistent difficulties'],
            },
            {
              feature: 'Developmental impact',
              values: ['Varies', 'Often occurs during formative years'],
            },
          ]}
          highlightColumn={2}
        />

        <h2
          id="three-pillars"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Three Additional Pillars of C-PTSD
        </h2>
        <p className="mb-6">What distinguishes C-PTSD from PTSD are these three additional symptom domains:</p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'emotion-dysregulation',
              title: '1. Affective Dysregulation (Emotion Regulation Problems)',
              content: (
                <div>
                  <p className="mb-4">
                    People with C-PTSD experience persistent difficulties managing emotions{', '}
                    <Citation id="10" index={10} source="Behavior Research and Therapy" year="2019" tier={1} />:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Heightened emotional reactivity</strong>: Emotions feel overwhelming, intense, and
                      uncontrollable
                    </li>
                    <li>
                      <strong>Difficulty calming down</strong>: Once upset, it takes a very long time to return to
                      baseline
                    </li>
                    <li>
                      <strong>Emotional numbing</strong>: Alternately feeling nothing at all, disconnected from emotions
                    </li>
                    <li>
                      <strong>Self-destructive coping</strong>: Using substances, self-harm, or risky behaviors to manage
                      emotions
                    </li>
                    <li>
                      <strong>Difficulty experiencing positive emotions</strong>: Persistent inability to feel joy,
                      pleasure, or connection
                    </li>
                  </ul>
                  <p className="mt-4">
                    <em>
                      Why this happens: Children learn emotion regulation through co-regulation with caregivers. When
                      caregivers are abusive, neglectful, or dysregulated themselves, this crucial skill doesn't develop.
                    </em>
                  </p>
                </div>
              ),
            },
            {
              id: 'negative-self-concept',
              title: '2. Negative Self-Concept',
              content: (
                <div>
                  <p className="mb-4">C-PTSD involves pervasive negative beliefs about oneself:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Persistent feelings of worthlessness</strong>: "I am fundamentally bad/broken/unlovable"
                    </li>
                    <li>
                      <strong>Deep shame</strong>: Not just guilt about actions, but shame about one's core self
                    </li>
                    <li>
                      <strong>Self-blame</strong>: Believing you caused or deserved the trauma
                    </li>
                    <li>
                      <strong>Feeling permanently damaged</strong>: "I'm too broken to be fixed"
                    </li>
                    <li>
                      <strong>Feeling fundamentally different</strong>: "I don't belong anywhere; I'm not like other
                      people'
                    </li>
                  </ul>
                  <p className="mt-4">
                    <em>
                      Why this happens: Identity forms through reflected appraisals—how others treat you tells you who you
                      are. Chronic abuse and neglect teach children they are worthless, creating core beliefs that persist
                      into adulthood.
                    </em>
                  </p>
                </div>
              ),
            },
            {
              id: 'relationship-disturbances',
              title: '3. Disturbances in Relationships',
              content: (
                <div>
                  <p className="mb-4">Persistent difficulties maintaining and navigating relationships:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Difficulty trusting others</strong>: Constant vigilance for betrayal or harm
                    </li>
                    <li>
                      <strong>Avoiding relationships</strong>: Isolating to avoid vulnerability and potential pain
                    </li>
                    <li>
                      <strong>Difficulty feeling close to others</strong>: Emotional detachment even in intimate
                      relationships
                    </li>
                    <li>
                      <strong>Unstable relationship patterns</strong>: Rapid shifts between idealization and devaluation
                    </li>
                    <li>
                      <strong>Difficulty maintaining long-term relationships</strong>: Repeated relationship failures
                    </li>
                    <li>
                      <strong>Gravitating toward harmful relationships</strong>: Trauma repetition compulsion
                    </li>
                  </ul>
                  <p className="mt-4">
                    <em>
                      Why this happens: Attachment patterns form early. When the people who should protect you also hurt
                      you, it creates disorganized attachment—the person you need for safety is also the source of danger.
                      This fundamentally shapes how you relate to others throughout life{', '}
                      <Citation id="9" index={9} source="Attachment & Human Development" year="2020" tier={1} />.
                    </em>
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="typical-trauma-history"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Kind of Trauma Causes C-PTSD?
        </h2>
        <p className="mb-6">
          C-PTSD typically results from prolonged, repeated trauma, especially when it's{', '}
          <Citation id="8" index={8} source="National Child Traumatic Stress Network" year="2022" tier={2} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Interpersonal</strong>: Perpetrated by people, not impersonal events
          </li>
          <li>
            <strong>Inescapable</strong>: The person couldn't leave (child dependent on caregivers, captive, trapped)
          </li>
          <li>
            <strong>Developmental</strong>: Occurring during childhood when the brain and personality are forming
          </li>
        </ul>

        <p className="mb-6">Common causes include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Childhood physical, sexual, or emotional abuse</li>
          <li>Severe childhood neglect</li>
          <li>Witnessing chronic domestic violence as a child</li>
          <li>Being held in captivity or imprisoned</li>
          <li>Human trafficking or sexual exploitation</li>
          <li>Experiencing organized violence or torture</li>
          <li>Growing up in war zones or refugee camps</li>
        </ul>

        <ArticleCallout variant="clinical-note" title="Important">
          <p>
            While C-PTSD is strongly associated with childhood trauma, adults can develop it from prolonged trauma
            exposure (e.g., domestic violence, POW camps, trafficking). The key is repeated, inescapable trauma that
            prevents the development or maintenance of healthy coping and relationships.
          </p>
        </ArticleCallout>

        <h2
          id="prevalence"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          How Common Is C-PTSD?
        </h2>
        <p className="mb-6">
          Research on C-PTSD prevalence is still emerging, but studies suggest{', '}
          <Citation id="6" index={6} source="Acta Psychiatrica Scandinavica" year="2021" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 3, suffix: '-5%', label: 'General population prevalence' },
            { value: 35, suffix: '%', label: 'Of PTSD patients may have C-PTSD instead' },
            { value: 70, suffix: '%', label: 'C-PTSD patients report childhood trauma' },
          ]}
          source="Meta-analysis, Acta Psychiatrica Scandinavica, 2021"
        />

        <p className="mb-6 mt-6">
          C-PTSD appears to be more common than initially thought, particularly among:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Survivors of childhood abuse or neglect</li>
          <li>Domestic violence survivors</li>
          <li>Former refugees or asylum seekers</li>
          <li>Trafficking and exploitation survivors</li>
          <li>People previously diagnosed with BPD (many may actually have C-PTSD)</li>
        </ul>

        <h2
          id="cptsd-vs-bpd"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          C-PTSD vs. Borderline Personality Disorder
        </h2>
        <p className="mb-6">
          One of the most important distinctions to make is between C-PTSD and BPD. They share overlapping features
          (emotion dysregulation, relationship difficulties, self-concept problems), leading to frequent misdiagnosis{', '}
          <Citation id="3" index={3} source="European Journal of Psychotraumatology" year="2019" tier={1} />.
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'similarities',
              label: 'Similarities',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Emotion dysregulation</li>
                  <li>Unstable sense of self</li>
                  <li>Relationship difficulties</li>
                  <li>Self-destructive behaviors</li>
                  <li>History of childhood trauma (70-90% of BPD patients)</li>
                </ul>
              ),
            },
            {
              id: 'differences',
              label: 'Key Differences',
              content: (
                <div>
                  <p className="mb-4">
                    <strong>C-PTSD</strong>:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Re-experiencing and avoidance symptoms (trauma-specific)</li>
                    <li>Hyperarousal tied to trauma reminders</li>
                    <li>Generally avoids relationships to protect self</li>
                    <li>Shame and worthlessness more prominent than abandonment fears</li>
                  </ul>
                  <p className="mb-4">
                    <strong>BPD</strong>:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>No required trauma exposure (though common)</li>
                    <li>Frantic efforts to avoid abandonment</li>
                    <li>Rapid shifts between idealization and devaluation of others</li>
                    <li>Chronic feelings of emptiness</li>
                    <li>Transient stress-related paranoia or dissociation</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'comorbidity',
              label: 'Can You Have Both?',
              content: (
                <p>
                  Yes, it's possible to have both C-PTSD and BPD. Some researchers argue BPD may be a form of complex
                  trauma response rather than a separate personality disorder. The debate continues, but what matters most
                  is accurate assessment and appropriate treatment.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="treatment"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Treatment for Complex PTSD
        </h2>
        <p className="mb-6">
          This is crucial: <strong>C-PTSD requires a different treatment approach than PTSD</strong>{', '}
          <Citation id="7" index={7} source="Clinical Psychology Review" year="2020" tier={1} />.
        </p>
        <p className="mb-6">
          Standard PTSD treatments (like Prolonged Exposure) that immediately focus on trauma processing can be
          overwhelming or even harmful for C-PTSD patients who lack emotion regulation skills. Instead, C-PTSD
          treatment follows a <strong>phase-based approach</strong>:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Phase 1: Safety and Stabilization',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>Goal</strong>: Build capacity for emotion regulation, establish safety, develop coping skills
                  </p>
                  <p className="mb-3">
                    <strong>Focus</strong>:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Psychoeducation about C-PTSD and trauma</li>
                    <li>Grounding and self-soothing techniques</li>
                    <li>Emotion regulation skills (often using DBT skills)</li>
                    <li>Safety planning (if still in unsafe situations)</li>
                    <li>Building therapeutic relationship and trust</li>
                  </ul>
                  <p className="mt-3">
                    <em>This phase can take months to years. It's not "prep work"—it's essential healing.</em>
                  </p>
                </div>
              ),
            },
            {
              title: 'Phase 2: Trauma Processing',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>Goal</strong>: Work through traumatic memories when you have sufficient capacity
                  </p>
                  <p className="mb-3">
                    <strong>Approaches</strong>:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>EMDR (with preparation and titration)</li>
                    <li>Schema Therapy (addressing core beliefs)</li>
                    <li>Internal Family Systems (working with parts)</li>
                    <li>Sensorimotor Psychotherapy (body-based processing)</li>
                  </ul>
                  <p className="mt-3">
                    <em>This phase proceeds carefully, processing memories in manageable doses.</em>
                  </p>
                </div>
              ),
            },
            {
              title: 'Phase 3: Reconnection and Integration',
              description: (
                <div>
                  <p className="mb-3">
                    <strong>Goal</strong>: Rebuild identity, relationships, and life meaning
                  </p>
                  <p className="mb-3">
                    <strong>Focus</strong>:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Building healthy relationships</li>
                    <li>Developing a coherent sense of self beyond trauma</li>
                    <li>Engaging with meaningful activities and goals</li>
                    <li>Finding post-traumatic growth where possible</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h3 className="text-2xl font-bold mt-8 mb-4">Effective Therapies for C-PTSD</h3>
        <p className="mb-6">
          Several therapeutic approaches show promise for C-PTSD{', '}
          <Citation id="4" index={4} source="JAMA Psychiatry" year="2021" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Dialectical Behavior Therapy (DBT)</strong>: Excellent for Phase 1, builds emotion regulation and
            distress tolerance
          </li>
          <li>
            <strong>Schema Therapy</strong>: Addresses core beliefs and "modes" formed in childhood
          </li>
          <li>
            <strong>EMDR</strong>: Can be very effective when applied with adequate preparation phase
          </li>
          <li>
            <strong>Internal Family Systems (IFS)</strong>: Works with different "parts" of self that hold trauma
          </li>
          <li>
            <strong>Sensorimotor Psychotherapy</strong>: Body-based approach for developmental trauma
          </li>
          <li>
            <strong>Compassion-Focused Therapy</strong>: Addresses shame and self-criticism
          </li>
        </ul>

        <h2
          id="why-diagnosis-matters"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why the C-PTSD Diagnosis Matters
        </h2>
        <p className="mb-6">
          Even though C-PTSD isn't in the DSM-5, recognizing it is crucial{', '}
          <Citation id="5" index={5} source="Journal of Affective Disorders" year="2020" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'validation',
              title: 'Validation',
              content: (
                <p>
                  Understanding that your symptoms are a recognized response to prolonged trauma—not a personality flaw or
                  treatment-resistant depression—can be profoundly validating.
                </p>
              ),
            },
            {
              id: 'treatment-planning',
              title: 'Appropriate Treatment',
              content: (
                <p>
                  Knowing you have C-PTSD means you need phase-based treatment, not immediate exposure therapy. This
                  prevents potential re-traumatization from inappropriate treatment approaches.
                </p>
              ),
            },
            {
              id: 'reducing-misdiagnosis',
              title: 'Reducing Misdiagnosis',
              content: (
                <p>
                  Many people with C-PTSD cycle through diagnoses (BPD, depression, anxiety) and treatments that partially
                  help but never fully address the core issue. C-PTSD recognition can end this cycle.
                </p>
              ),
            },
            {
              id: 'self-compassion',
              title: 'Self-Compassion',
              content: (
                <p>
                  Understanding that your struggles with emotions, relationships, and self-worth are symptoms of a trauma
                  response—not evidence that you're fundamentally broken—fosters self-compassion.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Key Takeaways:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>C-PTSD is officially recognized in the ICD-11 but not yet in the DSM-5</li>
            <li>It includes PTSD symptoms plus emotion dysregulation, negative self-concept, and relationship difficulties</li>
            <li>C-PTSD typically results from prolonged, repeated interpersonal trauma, often in childhood</li>
            <li>Treatment requires a phase-based approach, not immediate trauma processing</li>
            <li>Recognition and proper diagnosis can transform treatment outcomes and quality of life</li>
          </ul>
        </ArticleCallout>

        <h2
          id="path-forward"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Path Forward
        </h2>
        <p className="mb-6">
          If you recognize yourself in this description, seek out a trauma-informed therapist familiar with C-PTSD,
          even if they can't formally diagnose it in the U.S. The label matters less than receiving appropriate,
          phase-based treatment that addresses all your symptoms.
        </p>
        <p className="mb-6">
          Recovery from C-PTSD takes time—often years—but it is absolutely possible. You're not broken or defective.
          You adapted brilliantly to impossible circumstances. Now, you can learn new ways of being that serve you
          better.
        </p>
      </>
    ),
  },

  {
    id: catId(13),
    slug: 'flashbacks-explained-brain-during-trauma-memory',
    title: 'Flashbacks Explained: What Happens in Your Brain During a Trauma Memory',
    description: 'Flashbacks feel like reliving trauma. Learn what happens in your brain during a flashback, why they occur, and evidence-based techniques to manage them.',
    image: "/images/articles/cat11/cover-013.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Flashbacks', 'PTSD', 'Neuroscience', 'Coping Skills'],
    citations: [
      {
        id: '1',
        text: 'The neurobiology of flashbacks in PTSD',
        source: 'Biological Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1016/j.biopsych.2020.05.007',
        tier: 1,
      },
      {
        id: '2',
        text: 'Hippocampal dysfunction and trauma memories',
        source: 'Neuroscience & Biobehavioral Reviews',
        year: '2019',
        link: 'https://doi.org/10.1016/j.neubiorev.2019.02.024',
        tier: 1,
      },
      {
        id: '3',
        text: 'Understanding flashbacks',
        source: 'National Center for PTSD',
        year: '2023',
        link: 'https://www.ptsd.va.gov/understand/related/flash.asp',
        tier: 2,
      },
      {
        id: '4',
        text: 'Grounding techniques for PTSD',
        source: 'Journal of Traumatic Stress',
        year: '2018',
        link: 'https://doi.org/10.1002/jts.22315',
        tier: 1,
      },
      {
        id: '5',
        text: 'Imagery rescripting for intrusive memories',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102016',
        tier: 1,
      },
      {
        id: '6',
        text: 'Dissociation during flashbacks',
        source: 'European Journal of Psychotraumatology',
        year: '2020',
        link: 'https://doi.org/10.1080/20008198.2020.1753995',
        tier: 1,
      },
      {
        id: '7',
        text: 'Triggers and flashback management',
        source: 'Substance Abuse and Mental Health Services Administration',
        year: '2022',
        link: 'https://www.samhsa.gov/trauma-violence',
        tier: 2,
      },
      {
        id: '8',
        text: 'Memory reconsolidation and trauma',
        source: 'Nature Reviews Neuroscience',
        year: '2019',
        link: 'https://doi.org/10.1038/s41583-019-0188-0',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You're going about your day when suddenly you're not here anymore. A smell, a sound, or nothing you can
            identify triggers it—and you're back there. Your heart races. You can see it, feel it, smell it as if it's
            happening right now. This is a flashback, and it's one of the most distressing symptoms of PTSD.
          </p>
          <p className="mb-6">
            Understanding what happens in your brain during a flashback—and why your mind can't tell the difference
            between past and present—is the first step toward managing them{', '}
            <Citation id="1" index={1} source="Biological Psychiatry" year="2020" tier={1} />.
          </p>
        </div>

        <h2
          id="what-is-flashback"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is a Flashback?
        </h2>
        <p className="mb-6">
          A flashback is a dissociative experience where you re-experience a traumatic event as if it's happening in
          the present moment{', '}
          <Citation id="3" index={3} source="National Center for PTSD" year="2023" tier={2} />. It's more than just
          remembering—you feel transported back to the original event.
        </p>
        <p className="mb-6">Flashbacks can involve:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Visual re-experiencing</strong>: Seeing images or scenes from the trauma
          </li>
          <li>
            <strong>Sensory experiences</strong>: Smells, sounds, tastes, or physical sensations from the event
          </li>
          <li>
            <strong>Emotional flooding</strong>: Feeling the same terror, helplessness, or rage you felt during trauma
          </li>
          <li>
            <strong>Physical reactions</strong>: Your body responds as if under threat (rapid heartbeat, sweating,
            trembling)
          </li>
          <li>
            <strong>Dissociation</strong>: Feeling disconnected from your current surroundings
          </li>
        </ul>

        <ArticleCallout variant="info">
          <p>
            Flashbacks exist on a spectrum. Some are brief and fleeting. Others are prolonged and immersive, where you
            completely lose awareness of your current environment. Both are flashbacks.
          </p>
        </ArticleCallout>

        <h2
          id="brain-science"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Happens in Your Brain
        </h2>
        <p className="mb-6">
          To understand flashbacks, you need to understand how trauma memories are different from regular memories{', '}
          <Citation id="2" index={2} source="Neuroscience & Biobehavioral Reviews" year="2019" tier={1} />.
        </p>

        <BeforeAfter
          before={{
            title: 'Normal Memory',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Organized chronologically with beginning, middle, end</li>
                <li>Stored with context (when, where it happened)</li>
                <li>Feels like the past</li>
                <li>Can be retrieved voluntarily</li>
                <li>Integrated into your life narrative</li>
              </ul>
            ),
          }}
          after={{
            title: 'Trauma Memory',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Fragmented into sensory pieces (images, sounds, smells)</li>
                <li>No time stamp—not filed as "past"</li>
                <li>Feels like it's happening now</li>
                <li>Intrudes involuntarily</li>
                <li>Exists separately, not integrated</li>
              </ul>
            ),
          }}
        />

        <p className="mb-6 mt-6">
          <strong>Why this happens:</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            During trauma, your hippocampus (which organizes memories and marks them with time/context) goes offline
            due to stress hormone flooding
          </li>
          <li>The amygdala (fear center) records everything in vivid sensory detail without the hippocampus organizing
            it</li>
          <li>The prefrontal cortex (rational brain) also shuts down, so there's no narrative structure or logical
            processing</li>
          <li>The memory gets stored as disconnected sensory fragments without a "this happened in the past" label</li>
        </ul>

        <p className="mb-6">
          When something in your environment resembles any fragment of the trauma (a smell, sound, visual cue), your
          amygdala recognizes it and activates the full trauma memory. But because the memory has no time stamp, your
          brain and body respond as if the danger is present <em>right now</em>.
        </p>

        <h2
          id="types"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Types of Flashbacks
        </h2>

        <ArticleTabs
          tabs={[
            {
              id: 'sensory',
              label: 'Sensory Flashbacks',
              content: (
                <div>
                  <p className="mb-3">
                    <strong>What it is:</strong> Re-experiencing specific sensory details (sounds, smells, body
                    sensations) without necessarily visualizing the event
                  </p>
                  <p className="mb-3">
                    <strong>Example:</strong> A veteran hears a car backfire and suddenly feels heart-pounding terror,
                    but doesn't necessarily "see" combat scenes—just experiences the body's fear response
                  </p>
                </div>
              ),
            },
            {
              id: 'emotional',
              label: 'Emotional Flashbacks',
              content: (
                <div>
                  <p className="mb-3">
                    <strong>What it is:</strong> Sudden overwhelming emotions from the trauma without clear memory of
                    the event itself
                  </p>
                  <p className="mb-3">
                    <strong>Example:</strong> Feeling sudden, intense shame or terror that feels disproportionate to
                    the current situation—this is your body remembering the emotional state of past trauma
                  </p>
                  <p>
                    <em>
                      Common in complex trauma where memories may be pre-verbal or dissociated. You feel the feeling
                      without knowing why.
                    </em>
                  </p>
                </div>
              ),
            },
            {
              id: 'dissociative',
              label: 'Dissociative Flashbacks',
              content: (
                <div>
                  <p className="mb-3">
                    <strong>What it is:</strong> Completely losing awareness of present reality and experiencing the
                    trauma as if it's currently happening
                  </p>
                  <p className="mb-3">
                    <strong>Example:</strong> During a flashback, you might speak or act as if you're in the traumatic
                    event, not recognizing where you actually are
                  </p>
                  <p>
                    <em>
                      These are the most intense and disorienting type{', '}
                      <Citation id="6" index={6} source="European Journal of Psychotraumatology" year="2020" tier={1} />
                      .
                    </em>
                  </p>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="triggers"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Triggers Flashbacks?
        </h2>
        <p className="mb-6">
          Triggers are reminders of the trauma that activate the trauma memory{', '}
          <Citation id="7" index={7} source="SAMHSA" year="2022" tier={2} />. They can be:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>External triggers</strong>: Sights, sounds, smells, places, people, dates, situations that resemble
            some aspect of the trauma
          </li>
          <li>
            <strong>Internal triggers</strong>: Physical sensations (rapid heartbeat, muscle tension), emotions,
            thoughts that were present during the trauma
          </li>
          <li>
            <strong>Obvious triggers</strong>: Clear connections (a car accident survivor triggered by traffic)
          </li>
          <li>
            <strong>Subtle triggers</strong>: Unconscious associations you may not even recognize (a tone of voice, a
            body posture, a time of day)
          </li>
        </ul>

        <p className="mb-6">
          Sometimes flashbacks seem to come "out of nowhere"—but there's usually a trigger, even if it's operating below
          conscious awareness.
        </p>

        <h2
          id="managing"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Managing Flashbacks: Grounding Techniques
        </h2>
        <p className="mb-6">
          The goal during a flashback is to help your brain recognize that you're in the present, not the past.
          Grounding techniques work by engaging your senses in the here-and-now{', '}
          <Citation id="4" index={4} source="Journal of Traumatic Stress" year="2018" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: '54321 Grounding',
              description: (
                <div>
                  <p className="mb-2">Identify:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>5 things you can see</li>
                    <li>4 things you can touch</li>
                    <li>3 things you can hear</li>
                    <li>2 things you can smell</li>
                    <li>1 thing you can taste</li>
                  </ul>
                  <p className="mt-2">
                    This forces your attention to current sensory input, pulling you back to the present.
                  </p>
                </div>
              ),
            },
            {
              title: 'Physical Grounding',
              description: (
                <p>
                  Press your feet firmly into the floor. Feel the chair supporting you. Hold a cold object or ice cube.
                  These strong physical sensations in the present interrupt the flashback.
                </p>
              ),
            },
            {
              title: 'Orientation Statements',
              description: (
                <p>
                  Say out loud: 'My name is [name]. Today is [date]. I am [age] years old. I am in [location]. The
                  trauma happened in [year]. It is not happening now. I am safe." Stating facts helps your brain
                  recognize the present.
                </p>
              ),
            },
            {
              title: 'Safe Place Imagery',
              description: (
                <p>
                  Visualize a place where you feel completely safe (real or imaginary). Engage all your senses—what do
                  you see, hear, smell, feel there? This gives your brain an alternative to the trauma imagery.
                </p>
              ),
            },
            {
              title: 'Movement',
              description: (
                <p>
                  Stand up, walk, stretch, or do jumping jacks. Physical movement helps discharge the fight/flight
                  activation and reminds your body it's in the present, where it can move freely.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="tip">
          <p>
            Practice grounding techniques when you're <strong>not</strong> in a flashback. This makes them more
            accessible when you need them. It's like a fire drill—you want to know the exits before there's an actual
            emergency.
          </p>
        </ArticleCallout>

        <h2
          id="long-term"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Long-Term Treatment
        </h2>
        <p className="mb-6">
          While grounding helps manage flashbacks in the moment, trauma-focused therapy addresses the root cause by
          helping your brain properly process and file the trauma memory{', '}
          <Citation id="5" index={5} source="Clinical Psychology Review" year="2021" tier={1} />.
        </p>
        <p className="mb-6">
          Treatments like EMDR, CPT, and Prolonged Exposure work by helping your hippocampus finally organize the
          trauma memory, give it a time stamp, and integrate it into your life narrative. When this happens, the memory
          becomes just that—a memory. It stops intruding because your brain now knows it's in the past{', '}
          <Citation id="8" index={8} source="Nature Reviews Neuroscience" year="2019" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Key Takeaways:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Flashbacks occur because trauma memories lack context and time stamps</li>
            <li>Your brain can't tell the difference between past trauma and present danger during a flashback</li>
            <li>Grounding techniques help orient you to the present moment</li>
            <li>Trauma-focused therapy helps your brain properly process memories to reduce flashbacks long-term</li>
            <li>Flashbacks are a symptom, not a sign of weakness or going crazy</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(14),
    slug: 'hypervigilance-brain-wont-stop-scanning-danger',
    title: "Hypervigilance: When Your Brain Won't Stop Scanning for Danger",
    description: "Constantly on alert, unable to relax, always scanning for threats. Learn about hypervigilance in PTSD and strategies to calm an overactive threat-detection system.",
    image: "/images/articles/cat11/cover-014.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Hypervigilance', 'PTSD', 'Nervous System', 'Recovery'],
    citations: [
      {
        id: '1',
        text: 'Hypervigilance in PTSD: Neural mechanisms',
        source: 'Biological Psychiatry: Cognitive Neuroscience',
        year: '2020',
        link: 'https://doi.org/10.1016/j.bpsc.2020.05.001',
        tier: 1,
      },
      {
        id: '2',
        text: 'Amygdala hyperactivity and threat detection',
        source: 'JAMA Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1001/jamapsychiatry.2019.0401',
        tier: 1,
      },
      {
        id: '3',
        text: 'Understanding hypervigilance',
        source: 'National Center for PTSD',
        year: '2023',
        link: 'https://www.ptsd.va.gov/understand/what/hypervigilance.asp',
        tier: 2,
      },
      {
        id: '4',
        text: 'Mindfulness for hyperarousal in PTSD',
        source: 'Journal of Traumatic Stress',
        year: '2020',
        link: 'https://doi.org/10.1002/jts.22516',
        tier: 1,
      },
      {
        id: '5',
        text: 'Vagal tone and threat detection',
        source: 'Psychophysiology',
        year: '2018',
        link: 'https://doi.org/10.1111/psyp.13052',
        tier: 1,
      },
      {
        id: '6',
        text: 'Neurofeedback for hyperarousal',
        source: 'Clinical EEG and Neuroscience',
        year: '2019',
        link: 'https://doi.org/10.1177/1550059418812162',
        tier: 1,
      },
      {
        id: '7',
        text: 'Managing hypervigilance: A guide',
        source: 'Substance Abuse and Mental Health Services Administration',
        year: '2022',
        link: 'https://www.samhsa.gov/trauma-violence',
        tier: 2,
      },
      {
        id: '8',
        text: 'Sleep disturbance and hyperarousal in PTSD',
        source: 'Sleep Medicine Reviews',
        year: '2021',
        link: 'https://doi.org/10.1016/j.smrv.2021.101398',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You can't relax. Your eyes constantly scan every room you enter, noting exits, checking faces, assessing
            threats. You startle at sudden sounds. You notice everything—every movement in your peripheral vision, every
            shift in someone's tone. Your nervous system is stuck in high alert, convinced danger is imminent even when
            you're objectively safe. This is hypervigilance, and it's exhausting.
          </p>
          <p className="mb-6">
            Hypervigilance is a common symptom of PTSD—an overactive threat-detection system that once kept you safe but
            now prevents you from ever feeling at ease{', '}
            <Citation id="1" index={1} source="Biological Psychiatry: Cognitive Neuroscience" year="2020" tier={1} />.
          </p>
        </div>

        <h2
          id="what-is-hypervigilance"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Hypervigilance?
        </h2>
        <p className="mb-6">
          Hypervigilance is an enhanced state of sensory sensitivity accompanied by exaggerated behavioral responses to
          perceived threats{', '}
          <Citation id="3" index={3} source="National Center for PTSD" year="2023" tier={2} />. Your brain's
          threat-detection system is turned up to maximum, constantly scanning your environment for danger.
        </p>

        <p className="mb-6">Common experiences include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Constantly scanning rooms, checking over your shoulder</li>
          <li>Needing to sit with your back to the wall, facing the door</li>
          <li>Being easily startled by sudden sounds or movements</li>
          <li>Difficulty relaxing or "letting your guard down"</li>
          <li>Noticing every detail in your environment</li>
          <li>Interpreting neutral stimuli as threatening</li>
          <li>Feeling like you can never fully rest or feel safe</li>
          <li>Chronic muscle tension from being constantly "on"</li>
        </ul>

        <ArticleCallout variant="did-you-know">
          <p>
            Hypervigilance is different from anxiety. Anxiety is about worry and fear. Hypervigilance is about
            <em> alertness</em> and <em>scanning</em>. You might not feel anxious, but your body is still in
            surveillance mode, gathering data about potential threats.
          </p>
        </ArticleCallout>

        <h2
          id="neuroscience"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Neuroscience of Hypervigilance
        </h2>
        <p className="mb-6">
          Hypervigilance stems from changes in how your brain processes threat{', '}
          <Citation id="2" index={2} source="JAMA Psychiatry" year="2019" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'amygdala',
              title: 'Overactive Amygdala',
              content: (
                <p>
                  Your amygdala (the brain's smoke detector) becomes hypersensitive after trauma. It's like a smoke
                  detector that goes off when you make toast—the sensitivity is too high. Your amygdala now interprets
                  neutral or mildly threatening cues as dangerous.
                </p>
              ),
            },
            {
              id: 'prefrontal',
              title: 'Underactive Prefrontal Cortex',
              content: (
                <p>
                  The prefrontal cortex normally calms down the amygdala when it overreacts. After trauma, this brake
                  system doesn't work as well. The amygdala sounds alarms, and there's insufficient rational input to say
                  "actually, this isn't dangerous."
                </p>
              ),
            },
            {
              id: 'sympathetic',
              title: 'Chronic Sympathetic Activation',
              content: (
                <p>
                  Your sympathetic nervous system (fight/flight) stays partially activated. You're in a state of
                  sustained arousal—not full panic, but always 'on"—ready to spring into action at any moment.
                </p>
              ),
            },
            {
              id: 'attention',
              title: 'Attentional Bias',
              content: (
                <p>
                  Your attention automatically orients toward threat-related stimuli. In a crowded room, you notice the
                  person who seems angry, the exit routes, potential weapons—not because you're choosing to, but because
                  your brain automatically prioritizes threat-relevant information.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="adaptive-origins"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Hypervigilance Develops
        </h2>
        <p className="mb-6">
          Hypervigilance is actually an <em>adaptive</em> response—your brain learned it kept you safe. If you
          experienced prolonged danger (childhood abuse, combat, domestic violence), heightened vigilance helped you
          anticipate and avoid threats.
        </p>
        <p className="mb-6">The problem is that your threat-detection system doesn't turn off when the danger ends. It continues operating as if you're still in the traumatic situation, even when you're objectively safe now.</p>

        <BeforeAfter
          before={{
            title: 'During Trauma',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Hypervigilance = survival skill</li>
                <li>Scanning for danger keeps you alive</li>
                <li>Quick threat detection prevents harm</li>
                <li>It's adaptive and necessary</li>
              </ul>
            ),
          }}
          after={{
            title: 'After Trauma',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Hypervigilance = exhausting burden</li>
                <li>No real threats, but brain still scans</li>
                <li>False alarms drain your energy</li>
                <li>Prevents rest and recovery</li>
              </ul>
            ),
          }}
        />

        <h2
          id="impacts"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Cost of Hypervigilance
        </h2>
        <p className="mb-6">Living in constant high alert takes a toll:</p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Physical exhaustion</strong>: Your body never truly rests; chronic muscle tension, fatigue
          </li>
          <li>
            <strong>Sleep problems</strong>: Difficulty falling asleep or staying asleep because your body won't power
            down{', '}
            <Citation id="8" index={8} source="Sleep Medicine Reviews" year="2021" tier={1} />
          </li>
          <li>
            <strong>Concentration difficulties</strong>: Hard to focus when part of your attention is always scanning
            for threats
          </li>
          <li>
            <strong>Social withdrawal</strong>: Public spaces feel overwhelming; easier to stay home
          </li>
          <li>
            <strong>Relationship strain</strong>: Partners may feel your distrust or constant tension
          </li>
          <li>
            <strong>Inability to enjoy life</strong>: Can't relax enough to be present for positive experiences
          </li>
        </ul>

        <h2
          id="strategies"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Calming Hypervigilance: Strategies That Help
        </h2>
        <p className="mb-6">
          Reducing hypervigilance involves retraining your nervous system to recognize safety{', '}
          <Citation id="7" index={7} source="SAMHSA" year="2022" tier={2} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Create Actual Safety',
              description: (
                <p>
                  First, ensure you're actually safe. If you're still in danger, hypervigilance is appropriate. You can't
                  convince your nervous system to relax in an objectively unsafe environment. Once you're safe, you can
                  work on convincing your nervous system of that fact.
                </p>
              ),
            },
            {
              title: 'Grounding and Orienting',
              description: (
                <p>
                  Regularly orient to the present: 'I am in [location]. Today is [date]. I see [describe room]. I am safe
                  right now." This helps your brain distinguish between past danger and present safety.
                </p>
              ),
            },
            {
              title: 'Controlled Breathing',
              description: (
                <p>
                  Slow, deep breathing activates your parasympathetic (rest/digest) system{', '}
                  <Citation id="5" index={5} source="Psychophysiology" year="2018" tier={1} />. Try 4-7-8 breathing:
                  inhale for 4, hold for 7, exhale for 8. This physiologically signals safety to your nervous system.
                </p>
              ),
            },
            {
              title: 'Mindfulness Practice',
              description: (
                <p>
                  Mindfulness helps you observe your hypervigilant thoughts without getting caught in them{', '}
                  <Citation id="4" index={4} source="Journal of Traumatic Stress" year="2020" tier={1} />. "I notice I'm
                  scanning for threats. That's my trauma response. I don't have to follow it.'
                </p>
              ),
            },
            {
              title: 'Progressive Muscle Relaxation',
              description: (
                <p>
                  Systematically tense and release muscle groups. This addresses the chronic tension that hypervigilance
                  creates and trains your body what 'relaxed' feels like.
                </p>
              ),
            },
            {
              title: 'Safe Place Practice',
              description: (
                <p>
                  Designate a space as your 'safe zone' where you consciously practice relaxing. Start small (5 minutes)
                  and gradually increase. Your nervous system needs practice recognizing and tolerating safety.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="professional-treatment"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Professional Treatment Options
        </h2>
        <p className="mb-6">Several therapeutic approaches specifically address hypervigilance:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Trauma-focused CBT</strong>: Helps identify and challenge threat-biased thinking patterns
          </li>
          <li>
            <strong>EMDR</strong>: Can reduce overall PTSD symptoms, including hypervigilance
          </li>
          <li>
            <strong>Somatic therapies</strong>: Address the body-level activation through movement and sensation
          </li>
          <li>
            <strong>Neurofeedback</strong>: Trains your brain to produce calmer brainwave patterns{', '}
            <Citation id="6" index={6} source="Clinical EEG and Neuroscience" year="2019" tier={1} />
          </li>
          <li>
            <strong>Medication</strong>: SSRIs can reduce overall arousal; prazosin can help with hyperarousal
          </li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Key Takeaways:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Hypervigilance is an overactive threat-detection system</li>
            <li>It was adaptive during trauma but becomes exhausting afterward</li>
            <li>The amygdala stays hyperactive while the prefrontal cortex stays underactive</li>
            <li>Recovery involves retraining your nervous system to recognize safety</li>
            <li>Both self-help strategies and professional treatment can reduce hypervigilance</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          Hypervigilance served a purpose—it kept you alive during danger. But you don't need that level of vigilance
          anymore. With time and practice, you can teach your nervous system that it's okay to relax, to let your guard
          down, to rest. Safety can become more than just a concept—it can become a felt experience in your body.
        </p>
      </>
    ),
  },

  {
    id: catId(15),
    slug: 'emotional-numbness-after-trauma-cant-feel-anything',
    title: "Emotional Numbness After Trauma: Why You Can't Feel Anything",
    description: "Feeling emotionally numb, disconnected, unable to experience joy or connection after trauma. Learn why numbness happens and how to reconnect with your emotions.",
    image: "/images/articles/cat11/cover-015.svg",
    category: CATEGORY_TRAUMA_HEALING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Emotional Numbing', 'Dissociation', 'PTSD', 'Recovery'],
    citations: [
      {
        id: '1',
        text: 'Emotional numbing in PTSD: Neural correlates',
        source: 'Biological Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1016/j.biopsych.2020.03.012',
        tier: 1,
      },
      {
        id: '2',
        text: 'Anhedonia and emotional numbing in trauma',
        source: 'Journal of Affective Disorders',
        year: '2019',
        link: 'https://doi.org/10.1016/j.jad.2019.08.007',
        tier: 1,
      },
      {
        id: '3',
        text: 'Understanding emotional avoidance in PTSD',
        source: 'National Center for PTSD',
        year: '2023',
        link: 'https://www.ptsd.va.gov/understand/what/emotional_numbing.asp',
        tier: 2,
      },
      {
        id: '4',
        text: 'Dissociation and emotional detachment',
        source: 'European Journal of Psychotraumatology',
        year: '2020',
        link: 'https://doi.org/10.1080/20008198.2020.1721498',
        tier: 1,
      },
      {
        id: '5',
        text: 'Reconnecting with emotions after trauma',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102025',
        tier: 1,
      },
      {
        id: '6',
        text: 'Mindfulness for emotional numbing',
        source: 'Journal of Traumatic Stress',
        year: '2020',
        link: 'https://doi.org/10.1002/jts.22559',
        tier: 1,
      },
      {
        id: '7',
        text: 'Treating emotional numbing in PTSD',
        source: 'Substance Abuse and Mental Health Services Administration',
        year: '2022',
        link: 'https://www.samhsa.gov/trauma-violence',
        tier: 2,
      },
      {
        id: '8',
        text: 'Dorsal vagal shutdown and trauma',
        source: 'Frontiers in Psychology',
        year: '2018',
        link: 'https://doi.org/10.3389/fpsyg.2018.02069',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            You feel nothing. Friends share good news and you fake a smile, knowing you should be happy but feeling... empty. Someone you love says "I love you" and the words don't land. You go through the motions—work, meals, conversations—but it's like watching your life through glass. You're here, but you're not really <em>here</em>. This is emotional numbness, and it's one of the most isolating symptoms of trauma.
          </p>
          <p className="mb-6">
            While hypervigilance is all too much feeling, numbness is the opposite—a protective shutdown that leaves you disconnected from your emotions and from life itself{', '}
            <Citation id="1" index={1} source="Biological Psychiatry" year="2020" tier={1} />.
          </p>
        </div>

        <h2
          id="what-is-numbness"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What Is Emotional Numbness?
        </h2>
        <p className="mb-6">
          Emotional numbness (also called emotional anhedonia or affective numbing) is a persistent inability to experience emotions—positive or negative{', '}
          <Citation id="3" index={3} source="National Center for PTSD" year="2023" tier={2} />. You might:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Feel emotionally "flat" or empty</li>
          <li>Be unable to experience joy, pleasure, or excitement (anhedonia)</li>
          <li>Feel detached or disconnected from others, even loved ones</li>
          <li>Struggle to cry or express emotions</li>
          <li>Feel like you're going through the motions without truly experiencing life</li>
          <li>Have difficulty caring about things that used to matter</li>
          <li>Feel like you're watching your life from outside yourself</li>
        </ul>

        <ArticleCallout variant="clinical-note" title="Important Distinction">
          <p>
            Numbness is different from depression, though they can co-occur. Depression involves negative emotions (sadness, hopelessness, guilt). Numbness is the <em>absence</em> of emotion—you don't feel sad, but you also don't feel anything else.
          </p>
        </ArticleCallout>

        <h2
          id="why-happens"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Why Emotional Numbness Happens
        </h2>
        <p className="mb-6">
          Numbness is your nervous system's attempt to protect you from overwhelming emotions. Here's the mechanism:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Emotional Overwhelm During Trauma',
              description: (
                <p>
                  During traumatic events, emotions become unbearably intense—terror, helplessness, rage, shame. These emotions are more than your system can handle.
                </p>
              ),
            },
            {
              title: 'Adaptive Shutdown',
              description: (
                <p>
                  To survive, your brain essentially turns down the emotional volume. This is called dissociation—disconnecting from feelings to get through an impossible situation{', '}
                  <Citation id="4" index={4} source="European Journal of Psychotraumatology" year="2020" tier={1} />.
                </p>
              ),
            },
            {
              title: 'The Shutdown Persists',
              description: (
                <p>
                  After the trauma ends, the numbing doesn't automatically turn off. Your brain learned that emotions = danger, so it keeps them suppressed to keep you 'safe."
                </p>
              ),
            },
            {
              title: 'Unable to Discriminate',
              description: (
                <p>
                  Unfortunately, you can't selectively numb emotions. When you shut down the painful feelings, you also shut down joy, love, pleasure, and connection. It's all or nothing.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="neuroscience"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Neuroscience of Numbing
        </h2>
        <p className="mb-6">
          Several brain systems contribute to emotional numbness{', '}
          <Citation id="2" index={2} source="Journal of Affective Disorders" year="2019" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'prefrontal',
              title: 'Prefrontal Cortex Suppression',
              content: (
                <p>
                  Your prefrontal cortex (rational brain) suppresses the amygdala (emotion center) to prevent emotional flooding. It's like constantly pressing the brake on your feelings. This takes enormous mental energy and prevents you from experiencing any emotions fully.
                </p>
              ),
            },
            {
              id: 'reward-system',
              title: 'Reward System Dysfunction',
              content: (
                <p>
                  Brain regions involved in pleasure and reward (nucleus accumbens, ventral striatum) show reduced activity. This is why nothing feels good anymore—your brain's reward circuitry is dampened.
                </p>
              ),
            },
            {
              id: 'dorsal-vagal',
              title: 'Dorsal Vagal Shutdown',
              content: (
                <p>
                  The dorsal vagal system is your nervous system's 'freeze' or "shutdown" response{', '}
                  <Citation id="8" index={8} source="Frontiers in Psychology" year="2018" tier={1} />. When activated chronically, it creates a state of low energy, disconnection, and emotional flatness. It's your body playing dead to survive.
                </p>
              ),
            },
          ]}
        />

        <h2
          id="paradox"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          The Cruel Paradox
        </h2>
        <p className="mb-6">
          Here's the painful irony: emotional numbness develops to protect you from unbearable feelings, but it also prevents you from experiencing life's goodness. You can't feel the terror anymore, but you also can't feel:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Love and connection with others</li>
          <li>Joy and excitement</li>
          <li>Pride in accomplishments</li>
          <li>Gratitude or contentment</li>
          <li>Pleasure in activities you once enjoyed</li>
        </ul>
        <p className="mb-6">
          Life becomes gray. You function, but you don't <em>live</em>. And because you don't outwardly appear distressed, others may not realize how much you're suffering.
        </p>

        <ArticleCallout variant="warning">
          <p>
            Some people describe numbness as a relief after the intensity of hyperarousal. But long-term, it's deeply damaging. You're not healing—you're just avoiding. Recovery requires feeling your feelings, not eliminating them.
          </p>
        </ArticleCallout>

        <h2
          id="reconnecting"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Reconnecting with Emotions
        </h2>
        <p className="mb-6">
          Recovery from emotional numbness is gradual. You're essentially teaching your nervous system that it's safe to feel again{', '}
          <Citation id="5" index={5} source="Clinical Psychology Review" year="2021" tier={1} />:
        </p>

        <ArticleTabs
          tabs={[
            {
              id: 'start-small',
              label: 'Start Small',
              content: (
                <div>
                  <p className="mb-3">Don't try to feel everything at once. Start with safe, manageable emotions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Notice physical sensations (warmth of sun, texture of fabric)</li>
                    <li>Pay attention to minor preferences ("I like this song more than that one")</li>
                    <li>Identify subtle emotions ("I feel slightly more relaxed/tense")</li>
                  </ul>
                  <p className="mt-3">Building your capacity for feeling happens incrementally.</p>
                </div>
              ),
            },
            {
              id: 'body-based',
              label: 'Body-Based Approaches',
              content: (
                <div>
                  <p className="mb-3">Emotions live in the body. Reconnect through:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Gentle movement (yoga, walking, stretching)</li>
                    <li>Body scans to notice sensations without judgment</li>
                    <li>Breathwork to activate different nervous system states</li>
                    <li>Physical activities that demand presence (dance, martial arts)</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'mindfulness',
              label: 'Mindfulness Practice',
              content: (
                <div>
                  <p className="mb-3">
                    Mindfulness helps you observe emotions as they arise without suppressing or avoiding them{', '}
                    <Citation id="6" index={6} source="Journal of Traumatic Stress" year="2020" tier={1} />.
                  </p>
                  <p>
                    Practice: "What am I feeling right now? Where do I notice it in my body? Can I stay with it for 10 seconds?"
                  </p>
                </div>
              ),
            },
            {
              id: 'safe-contexts',
              label: 'Create Safe Contexts',
              content: (
                <div>
                  <p className="mb-3">You're more likely to feel in safe environments:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>With trusted people who won't judge or pressure you</li>
                    <li>In places where you feel secure</li>
                    <li>During activities with low stakes (watching movies, being in nature)</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <h2
          id="therapy"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          Professional Treatment
        </h2>
        <p className="mb-6">
          Several therapeutic approaches address emotional numbness{', '}
          <Citation id="7" index={7} source="SAMHSA" year="2022" tier={2} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Somatic therapies</strong> (Somatic Experiencing, Sensorimotor Psychotherapy): Work directly with the body to restore emotional connection
          </li>
          <li>
            <strong>EMDR</strong>: Can help process trauma so you don't need to numb anymore
          </li>
          <li>
            <strong>Emotion-Focused Therapy</strong>: Specifically targets difficulty accessing and expressing emotions
          </li>
          <li>
            <strong>Internal Family Systems</strong>: Works with the "protector" parts that maintain numbness
          </li>
          <li>
            <strong>Group therapy</strong>: Connection with others can gradually reawaken emotional responsiveness
          </li>
        </ul>

        <h2
          id="what-to-expect"
          className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32"
        >
          What to Expect as Numbness Lifts
        </h2>
        <p className="mb-6">
          As you reconnect with emotions, it won't be all sunshine and rainbows. You'll feel the difficult emotions too—grief, anger, sadness. This can be scary, but it's actually a sign of healing. You're no longer avoiding; you're processing.
        </p>
        <p className="mb-6">
          The goal isn't to feel good all the time. The goal is to feel—to experience the full range of human emotions, both pleasant and unpleasant. That's what it means to be alive.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4">
            <strong>Key Takeaways:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Emotional numbness is a protective response that persists after trauma</li>
            <li>You can't selectively numb—shutting down pain also shuts down joy</li>
            <li>Reconnecting with emotions is gradual and requires creating safety</li>
            <li>Body-based approaches are often most effective for numbing</li>
            <li>Feeling again—even painful emotions—is a sign of healing, not regression</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6">
          Numbness served a purpose. It got you through something unbearable. But you don't need it anymore. Slowly, carefully, with support, you can thaw. And when you do, you'll discover that being alive—really alive, feeling all of it—is worth the risk.
        </p>
      </>
    ),
  },
];

