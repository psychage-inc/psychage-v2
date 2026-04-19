/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_MENTAL_HEALTH_CONDITIONS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout, StatCard, ComparisonTable, SummaryBox, KeyFacts, DiagramBlock, PracticalExercise, SparkMoment, RelatedToolsBlock } from '../../../components/article/blocks';
import ReferenceList from '../../../components/article/ReferenceList';

export const traumaDissociativeArticles: Article[] = [
  { id: catId(21), slug: 'ptsd-deep-dive', status: 'draft', title: 'PTSD: A Deep Dive into Post-Traumatic Stress Disorder', description: 'PTSD develops after trauma exposure. Learn symptoms, neurobiology, and evidence-based treatments like CPT and EMDR.', image: "/images/articles/cat13/cover-021.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 14, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['PTSD', 'Trauma', 'EMDR', 'CPT'], citations: [
    { id: '1', text: 'PTSD Statistics', source: 'NIMH', year: '2023', link: 'https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd', tier: 2 },
    { id: '2', text: 'DSM-5-TR Diagnostic Criteria', source: 'APA', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
    { id: '3', text: 'EMDR Meta-Analysis', source: 'JAMA Psychiatry', year: '2020', link: 'https://doi.org/10.1001/jamapsychiatry.2020.0757', tier: 1 },
    { id: '4', text: 'Neurobiology of PTSD', source: 'Nature Reviews Neuroscience', year: '2021', link: 'https://doi.org/10.1038/s41583-021-00480-7', tier: 1 },
    { id: '5', text: 'CPT Effectiveness RCT', source: 'Journal of Traumatic Stress', year: '2020', link: 'https://doi.org/10.1002/jts.22542', tier: 1 },
    { id: '6', text: 'Prolonged Exposure Therapy', source: 'Behaviour Research and Therapy', year: '2021', link: 'https://doi.org/10.1016/j.brat.2021.103891', tier: 1 },
    { id: '7', text: 'Pharmacotherapy for PTSD', source: 'The Lancet Psychiatry', year: '2020', link: 'https://doi.org/10.1016/S2215-0366(20)30194-6', tier: 1 },
    { id: '8', text: 'VA/DOD Clinical Practice Guideline', source: 'U.S. Department of Veterans Affairs', year: '2023', link: 'https://www.healthquality.va.gov/guidelines/MH/ptsd/', tier: 2 },
    { id: '9', text: 'Trauma-Focused Psychotherapies', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101849', tier: 1 },
  ], content: <>
    <SummaryBox
      keyPoints={[
        "PTSD develops in about 6% of trauma survivors, affecting approximately 8 million U.S. adults annually",
        "Four symptom clusters: intrusive re-experiencing, avoidance, negative cognitions/mood, and hyperarousal",
        "Trauma-focused therapies (CPT, EMDR, PE) show 50-70% symptom reduction rates",
        "Neurobiological changes involve amygdala hyperactivity, hippocampal volume reduction, and prefrontal cortex underactivation",
        "Treatment is highly effective when tailored to individual trauma type and symptom presentation"
      ]}
      className="mb-12"
    />

    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
        Post-Traumatic Stress Disorder (PTSD) occurs after exposure to actual or threatened death, serious injury, or sexual violence. While most people experience distress after trauma, PTSD develops when these reactions persist beyond one month and significantly impair functioning. Intrusive memories, avoidance behaviors, negative cognitions, and hyperarousal characterize this debilitating condition that affects approximately 6% of the U.S. population at some point in their lives <Citation id="1" index={1} source="NIMH" year="2023" tier={2} />.
      </p>

      <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
        PTSD is not a sign of weakness—it represents the brain's adaptive survival mechanisms becoming dysregulated after overwhelming experiences. The condition involves fundamental changes in how the brain processes threat, memory, and safety. Understanding PTSD as a neurobiological disorder rather than a character flaw is essential for effective treatment and recovery.
      </p>
    </div>

    <KeyFacts
      facts={[
        { label: "Lifetime Prevalence", value: "6-8%", context: "Of U.S. adults will develop PTSD" },
        { label: "Female:Male Ratio", value: "2:1", context: "Women twice as likely to develop PTSD" },
        { label: "Treatment Response", value: "60-70%", context: "Show significant improvement with evidence-based therapy" },
        { label: "Comorbidity Rate", value: "80%", context: "Have at least one other mental health condition" },
        { label: "Median Time to Treatment", value: "12 years", context: "Average delay between symptom onset and seeking care" }
      ]}
      className="my-12"
    />

    <h2 id="diagnostic-criteria" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Diagnostic Criteria</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      The DSM-5-TR requires exposure to a traumatic event plus symptoms in four distinct clusters <Citation id="2" index={2} source="DSM-5-TR" year="2022" tier={4} />:
    </p>

    <ComparisonTable
      title="Four Symptom Clusters of PTSD"
      items={[
        {
          name: "Intrusive Re-experiencing",
          description: "Unwanted memories, nightmares, flashbacks, or intense distress when reminded of the trauma. The person feels as if the event is happening again."
        },
        {
          name: "Avoidance",
          description: "Persistent efforts to avoid trauma-related thoughts, feelings, people, places, conversations, activities, objects, or situations that trigger memories."
        },
        {
          name: "Negative Cognitions & Mood",
          description: "Inability to recall key trauma details, persistent negative beliefs about self/others/world, distorted blame, diminished interest in activities, detachment from others, inability to experience positive emotions."
        },
        {
          name: "Hyperarousal & Reactivity",
          description: "Irritability, reckless behavior, hypervigilance, exaggerated startle response, concentration problems, sleep disturbance."
        }
      ]}
      className="my-8"
    />

    <ArticleCallout type="info" className="my-8">
      <h4 className="font-bold mb-2">Criterion A: Trauma Exposure</h4>
      <p>Diagnosis requires exposure to actual or threatened death, serious injury, or sexual violence through: (1) direct experience, (2) witnessing in person, (3) learning it happened to a close family member or friend, or (4) repeated exposure to aversive details (e.g., first responders collecting human remains). Exposure through media alone (TV, movies, electronic media) does not qualify unless work-related.</p>
    </ArticleCallout>

    <h2 id="neurobiology" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Neurobiology of PTSD</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      PTSD involves measurable changes in brain structure and function. Neuroimaging studies consistently show three key alterations <Citation id="4" index={3} source="Nature Reviews Neuroscience" year="2021" tier={1} />:
    </p>

    <DiagramBlock
      title="Key Brain Regions Affected in PTSD"
      description="Three interconnected systems show dysfunction in PTSD"
      items={[
        { label: "Amygdala", value: "Hyperactive", description: "The brain's threat detection center shows increased activity, leading to heightened fear responses and overreaction to potential dangers" },
        { label: "Hippocampus", value: "Reduced Volume", description: "The memory consolidation center shows structural shrinkage (8-10% volume reduction), impairing ability to contextualize memories as 'past' events" },
        { label: "Prefrontal Cortex", value: "Underactive", description: "The executive control region shows decreased activity, reducing ability to regulate emotions and distinguish real threats from triggered memories" }
      ]}
      className="my-8"
    />

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      These neurobiological changes explain why PTSD survivors experience the trauma as present rather than past. The hyperactive amygdala sounds false alarms, the shrunken hippocampus cannot properly timestamp memories, and the underactive prefrontal cortex cannot override the fear response. Effective treatment works by normalizing these neural circuits.
    </p>

    <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Evidence-Based Treatments</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      Three trauma-focused psychotherapies have the strongest evidence base and are recommended as first-line treatments by the VA/DOD and WHO <Citation id="8" index={4} source="VA/DOD" year="2023" tier={2} />:
    </p>

    <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Cognitive Processing Therapy (CPT)</h3>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      CPT is a 12-session structured therapy that addresses "stuck points"—maladaptive beliefs developed after trauma. Patients write detailed accounts of the trauma and systematically challenge distorted beliefs about safety, trust, control, esteem, and intimacy. Randomized controlled trials show 50-60% of participants no longer meet PTSD diagnostic criteria after treatment <Citation id="5" index={5} source="Journal of Traumatic Stress" year="2020" tier={1} />.
    </p>

    <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Eye Movement Desensitization and Reprocessing (EMDR)</h3>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      EMDR uses bilateral stimulation (eye movements, tapping, or auditory tones) while recalling trauma memories to facilitate adaptive information processing. The eight-phase protocol helps patients reprocess traumatic memories so they become less emotionally charged. Meta-analyses show EMDR produces significant symptom reduction with fewer dropouts than other therapies <Citation id="3" index={6} source="JAMA Psychiatry" year="2020" tier={1} />.
    </p>

    <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Prolonged Exposure (PE) Therapy</h3>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      PE involves repeated, prolonged imaginal exposure to the trauma memory and in vivo exposure to trauma reminders that have been avoided. Through emotional processing, the fear network is activated and modified. PE produces 60-70% reduction in PTSD symptoms and is particularly effective for single-incident traumas <Citation id="6" index={7} source="Behaviour Research and Therapy" year="2021" tier={1} />.
    </p>

    <ComparisonTable
      title="Comparing First-Line PTSD Treatments"
      headers={["Treatment", "Duration", "Key Mechanism", "Best For"]}
      items={[
        {
          name: "CPT",
          description: "12 sessions",
          additionalInfo: "Cognitive restructuring of trauma-related beliefs",
          context: "Those with significant guilt, shame, or self-blame"
        },
        {
          name: "EMDR",
          description: "8-12 sessions",
          additionalInfo: "Bilateral stimulation during memory recall",
          context: "Those who struggle with verbal processing or multiple traumas"
        },
        {
          name: "PE",
          description: "8-15 sessions",
          additionalInfo: "Repeated exposure to trauma memories and avoided situations",
          context: "Those with strong avoidance and single-incident trauma"
        }
      ]}
      className="my-8"
    />

    <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Pharmacotherapy</h3>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      While psychotherapy is first-line treatment, medications can be helpful adjuncts. Sertraline and paroxetine (SSRIs) are FDA-approved for PTSD and show moderate efficacy. Prazosin helps reduce nightmares in some patients. However, medication effects are smaller than those of trauma-focused therapies and symptoms often return when medication is discontinued <Citation id="7" index={8} source="The Lancet Psychiatry" year="2020" tier={1} />.
    </p>

    <ArticleCallout type="warning" className="my-8">
      <h4 className="font-bold mb-2">What Doesn't Work</h4>
      <p>Benzodiazepines should be avoided—they do not reduce PTSD symptoms and may impair natural recovery processes. Debriefing immediately after trauma does not prevent PTSD and may increase risk in some individuals. Generic "talk therapy" without trauma focus shows minimal benefit.</p>
    </ArticleCallout>

    <h2 id="recovery" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Path to Recovery</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      Recovery from PTSD is highly achievable with appropriate treatment. Research shows 60-70% of individuals who complete trauma-focused therapy experience significant symptom reduction, with many no longer meeting diagnostic criteria. Recovery is not about forgetting the trauma—it's about the memory no longer controlling your life.
    </p>

    <PracticalExercise
      title="Grounding Technique: 5-4-3-2-1"
      description="This sensory awareness exercise helps bring you back to the present moment when experiencing flashbacks or intense anxiety."
      duration="3-5 minutes"
      frequency="As needed during distress"
      steps={[
        "Name 5 things you can see around you (ceiling, floor, window, pen, etc.)",
        "Name 4 things you can physically feel (shirt on shoulders, feet on floor, chair beneath you, breeze on skin)",
        "Name 3 things you can hear right now (traffic, birds, refrigerator hum, your breathing)",
        "Name 2 things you can smell or like the smell of (coffee, fresh laundry, grass, favorite candle)",
        "Name 1 thing you can taste or like the taste of (mint, chocolate, orange juice, toothpaste)"
      ]}
      warning="This technique is for in-the-moment grounding, not a replacement for trauma-focused therapy. If distress persists, contact a mental health professional."
      className="my-8"
    />

    <h2 id="seeking-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">When to Seek Help</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      If trauma-related symptoms persist beyond one month and interfere with work, relationships, or daily functioning, professional evaluation is warranted. Look for therapists specifically trained in CPT, EMDR, or PE. The PTSD treatment provider directory at the International Society for Traumatic Stress Studies (istss.org) can help locate qualified clinicians.
    </p>

    <ArticleCallout type="crisis" className="my-8">
      <h4 className="font-bold mb-2">Crisis Support</h4>
      <p><strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988 (available 24/7)</p>
      <p><strong>Veterans Crisis Line:</strong> Call 988 and press 1, text 838255, or chat at VeteransCrisisLine.net</p>
      <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
    </ArticleCallout>

    <SparkMoment
      quote="Trauma is not what happens to you. Trauma is what happens inside you as a result of what happens to you."
      author="Dr. Gabor Maté"
      context="Physician and trauma expert"
      reflection="This distinction is crucial: PTSD is about the internal response, not the external event. Two people can experience the same trauma and have vastly different outcomes. Recovery focuses on healing what happened inside you—the neurobiological and psychological aftermath—rather than trying to change or forget what happened."
      className="my-12"
    />

    <RelatedToolsBlock
      tools={[
        {
          name: "PTSD Coach",
          description: "Free mobile app from VA offering self-assessment, symptom tracking, and coping strategies",
          link: "https://www.ptsd.va.gov/appvid/mobile/ptsdcoach_app.asp"
        },
        {
          name: "PE Coach",
          description: "Companion app for Prolonged Exposure therapy to support between-session practice",
          link: "https://www.ptsd.va.gov/appvid/mobile/pecoach_app.asp"
        },
        {
          name: "ISTSS Find a Therapist",
          description: "Directory of trauma treatment providers with specialized training",
          link: "https://istss.org/public-resources/find-a-clinician"
        },
        {
          name: "VA PTSD Resources",
          description: "Comprehensive resources for veterans and their families",
          link: "https://www.ptsd.va.gov/"
        }
      ]}
      className="my-12"
    />

    <ReferenceList
      references={[
        { id: '1', text: 'PTSD Statistics', source: 'NIMH', year: '2023', link: 'https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd', tier: 2 },
        { id: '2', text: 'DSM-5-TR Diagnostic Criteria', source: 'APA', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
        { id: '3', text: 'EMDR Meta-Analysis', source: 'JAMA Psychiatry', year: '2020', link: 'https://doi.org/10.1001/jamapsychiatry.2020.0757', tier: 1 },
        { id: '4', text: 'Neurobiology of PTSD', source: 'Nature Reviews Neuroscience', year: '2021', link: 'https://doi.org/10.1038/s41583-021-00480-7', tier: 1 },
        { id: '5', text: 'CPT Effectiveness RCT', source: 'Journal of Traumatic Stress', year: '2020', link: 'https://doi.org/10.1002/jts.22542', tier: 1 },
        { id: '6', text: 'Prolonged Exposure Therapy', source: 'Behaviour Research and Therapy', year: '2021', link: 'https://doi.org/10.1016/j.brat.2021.103891', tier: 1 },
        { id: '7', text: 'Pharmacotherapy for PTSD', source: 'The Lancet Psychiatry', year: '2020', link: 'https://doi.org/10.1016/S2215-0366(20)30194-6', tier: 1 },
        { id: '8', text: 'VA/DOD Clinical Practice Guideline', source: 'U.S. Department of Veterans Affairs', year: '2023', link: 'https://www.healthquality.va.gov/guidelines/MH/ptsd/', tier: 2 },
        { id: '9', text: 'Trauma-Focused Psychotherapies', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101849', tier: 1 },
      ]}
      className="mt-12"
    />
  </> },

  { id: catId(22), slug: 'complex-ptsd', status: 'draft', title: 'Complex PTSD: When Trauma Is Repeated and Relational', description: 'C-PTSD results from prolonged trauma. Understand how it differs from PTSD and specialized treatment approaches.', image: "/images/articles/cat13/cover-022.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 13, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['C-PTSD', 'Complex Trauma', 'Developmental Trauma'], citations: [
    { id: '1', text: 'C-PTSD Diagnostic Criteria ICD-11', source: 'World Psychiatry', year: '2020', link: 'https://doi.org/10.1002/wps.20748', tier: 1 },
    { id: '2', text: 'Phase-Based Treatment for C-PTSD', source: 'European Journal of Psychotraumatology', year: '2021', link: 'https://doi.org/10.1080/20008198.2021.1863580', tier: 1 },
    { id: '3', text: 'Developmental Trauma Effects', source: 'American Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1176/appi.ajp.2020.19111151', tier: 1 },
    { id: '4', text: 'ISTSS C-PTSD Treatment Guidelines', source: 'International Society for Traumatic Stress Studies', year: '2023', link: 'https://istss.org/clinical-resources/treating-trauma', tier: 3 },
    { id: '5', text: 'Emotion Regulation in C-PTSD', source: 'Journal of Traumatic Stress', year: '2021', link: 'https://doi.org/10.1002/jts.22656', tier: 1 },
    { id: '6', text: 'Schema Therapy for C-PTSD', source: 'Behaviour Research and Therapy', year: '2020', link: 'https://doi.org/10.1016/j.brat.2020.103713', tier: 1 },
    { id: '7', text: 'Attachment in Complex Trauma', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102009', tier: 1 },
    { id: '8', text: 'DBT for C-PTSD', source: 'Journal of Clinical Psychology', year: '2020', link: 'https://doi.org/10.1002/jclp.22991', tier: 1 },
  ], content: <>
    <SummaryBox
      keyPoints={[
        "C-PTSD differs from PTSD by including emotion dysregulation, negative self-concept, and interpersonal difficulties",
        "Results from prolonged, repeated trauma—often childhood abuse, domestic violence, captivity, or ongoing community violence",
        "Recognized in ICD-11 (2022) but not yet in DSM-5-TR as a separate diagnosis",
        "Treatment requires phase-based approach: stabilization, trauma processing, then integration",
        "Recovery focuses on building self-capacity before addressing trauma memories"
      ]}
      className="mb-12"
    />

    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
        Complex PTSD (C-PTSD) emerges from prolonged, repeated trauma—particularly trauma that is interpersonal, begins early in life, or involves captivity with no reasonable escape. While PTSD can develop from a single traumatic event, C-PTSD reflects cumulative damage from ongoing traumatic circumstances. The World Health Organization's ICD-11 officially recognized C-PTSD in 2022, distinguishing it from traditional PTSD by three additional symptom domains: severe emotion regulation problems, persistent negative self-beliefs, and profound interpersonal difficulties <Citation id="1" index={1} source="World Psychiatry" year="2020" tier={1} />.
      </p>

      <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
        Individuals with C-PTSD experienced trauma not as isolated incidents but as ongoing life conditions. Childhood abuse lasting years, long-term domestic violence, human trafficking, prolonged captivity, or growing up in war zones can all produce C-PTSD's characteristic pattern: the core PTSD symptoms combined with fundamental disruptions to identity, self-worth, and relationship capacity.
      </p>
    </div>

    <KeyFacts
      facts={[
        { label: "Additional Symptoms", value: "3 Domains", context: "Beyond standard PTSD criteria" },
        { label: "Childhood Trauma", value: "75-80%", context: "Of C-PTSD cases involve early-life trauma" },
        { label: "Treatment Duration", value: "2-5 years", context: "Longer than standard PTSD treatment" },
        { label: "Comorbidity", value: "90%+", context: "Have other mental health diagnoses" },
        { label: "Self-Harm Risk", value: "3-5x higher", context: "Compared to standard PTSD" }
      ]}
      className="my-12"
    />

    <h2 id="c-ptsd-vs-ptsd" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">How C-PTSD Differs from PTSD</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      C-PTSD includes all core PTSD symptoms (re-experiencing, avoidance, hyperarousal) plus three additional symptom clusters that reflect damage to the developing self:
    </p>

    <ComparisonTable
      title="C-PTSD vs Standard PTSD"
      headers={["Aspect", "PTSD", "Complex PTSD"]}
      items={[
        {
          name: "Trauma Type",
          description: "Single or limited incidents",
          additionalInfo: "Prolonged, repeated, often interpersonal"
        },
        {
          name: "Core Symptoms",
          description: "Re-experiencing, avoidance, hyperarousal",
          additionalInfo: "Same core symptoms PLUS disturbances in self-organization"
        },
        {
          name: "Emotion Regulation",
          description: "Intact baseline capacity",
          additionalInfo: "Severe dysregulation, difficulty modulating emotions"
        },
        {
          name: "Self-Concept",
          description: "May have trauma-related guilt/shame",
          additionalInfo: "Pervasive feelings of worthlessness, failure, defeat"
        },
        {
          name: "Relationships",
          description: "Specific avoidance of trauma reminders",
          additionalInfo: "Global difficulty feeling close to others, chronic interpersonal problems"
        },
        {
          name: "Treatment Approach",
          description: "Direct trauma processing often tolerated",
          additionalInfo: "Requires stabilization phase before trauma work"
        }
      ]}
      className="my-8"
    />

    <h2 id="additional-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Three Additional Symptom Domains</h2>

    <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Affective Dysregulation</h3>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      Individuals with C-PTSD struggle with intense, uncontrollable emotional reactions. Small triggers produce overwhelming emotional storms. They may experience chronic emotional numbing alternating with intense reactivity, difficulty calming down once upset, and emotional responses that seem disproportionate to current situations. This reflects developmental disruption of emotion regulation capacities that typically form during childhood <Citation id="5" index={2} source="Journal of Traumatic Stress" year="2021" tier={1} />.
    </p>

    <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Negative Self-Concept</h3>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      Prolonged trauma—especially when perpetrated by caregivers—produces profound beliefs about being fundamentally damaged, worthless, or deserving of bad treatment. Unlike the specific guilt or shame in standard PTSD, C-PTSD involves a global sense of being defective. Survivors internalize messages from abusers, developing core beliefs like "I am unlovable," "I don't deserve good things," or "Something is wrong with me."
    </p>

    <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Relational Disturbances</h3>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      When trauma occurs in relationships—particularly attachment relationships during childhood—it disrupts the capacity for healthy connection. Individuals with C-PTSD often feel persistently distant from others, have difficulty sustaining relationships, or oscillate between desperate clinging and harsh withdrawal. Trust feels impossible. Intimacy triggers fear. Isolation becomes both a protective strategy and a source of profound loneliness <Citation id="7" index={3} source="Clinical Psychology Review" year="2021" tier={1} />.
    </p>

    <ArticleCallout type="info" className="my-8">
      <h4 className="font-bold mb-2">Why Early Trauma Produces C-PTSD</h4>
      <p>Childhood is when we develop core capacities for emotion regulation, self-concept formation, and relationship building. When trauma occurs during these critical developmental periods, it doesn't just create traumatic memories—it disrupts the development of fundamental psychological structures. An adult traumatized in a car accident likely had 20-30 years of healthy development first; a child abused from ages 3-12 never developed these capacities normally <Citation id="3" index={4} source="American Journal of Psychiatry" year="2020" tier={1} />.</p>
    </ArticleCallout>

    <h2 id="causes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Common Causes of C-PTSD</h2>

    <DiagramBlock
      title="Trauma Types Most Associated with C-PTSD"
      description="Prolonged, inescapable, interpersonal trauma"
      items={[
        { label: "Childhood Abuse/Neglect", value: "Most Common", description: "Physical, sexual, or emotional abuse or severe neglect during developmental years" },
        { label: "Domestic Violence", value: "Years-Long", description: "Intimate partner violence with no safe escape, particularly with isolation from support" },
        { label: "Human Trafficking", value: "Captivity", description: "Sex trafficking or labor trafficking involving coercion and control" },
        { label: "POW/Torture", value: "Extended", description: "Prisoners of war, political prisoners, torture survivors" },
        { label: "Organized Abuse", value: "Ongoing", description: "Repeated abuse by multiple perpetrators, often with threats preventing disclosure" },
        { label: "Community Violence", value: "Chronic", description: "Growing up in war zones or areas with pervasive gang violence" }
      ]}
      className="my-8"
    />

    <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Phase-Based Treatment Approach</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      Unlike standard PTSD where trauma-focused therapy can begin immediately, C-PTSD typically requires a sequential, phase-based approach <Citation id="2" index={5} source="European Journal of Psychotraumatology" year="2021" tier={1} />:
    </p>

    <ComparisonTable
      title="Three Phases of C-PTSD Treatment"
      items={[
        {
          name: "Phase 1: Stabilization & Safety",
          description: "Building foundational capacities before trauma work: emotion regulation skills, distress tolerance, grounding techniques, establishing safety in current life, reducing self-harm and substance use, developing therapeutic trust. Duration: 6-18 months."
        },
        {
          name: "Phase 2: Trauma Processing",
          description: "Addressing traumatic memories using adapted trauma-focused therapies (modified EMDR, narrative exposure, schema therapy). Pacing is slower, with frequent returns to stabilization when overwhelmed. Duration: 1-3 years."
        },
        {
          name: "Phase 3: Integration & Reconnection",
          description: "Building meaningful life beyond trauma identity, developing healthy relationships, pursuing values-based goals, consolidating gains, planning for future challenges. Duration: 6-12 months."
        }
      ]}
      className="my-8"
    />

    <ArticleCallout type="warning" className="my-8">
      <h4 className="font-bold mb-2">Why Rushing to Trauma Processing Backfires</h4>
      <p>Starting trauma-focused work before adequate stabilization often leads to retraumatization, therapy dropout, or crisis escalation. When someone lacks emotion regulation skills and you activate traumatic memories, they have no tools to manage the emotional flooding. The first phase isn't avoidance—it's building the capacity to successfully process trauma later.</p>
    </ArticleCallout>

    <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Effective Therapeutic Approaches</h3>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      Several modalities show effectiveness for C-PTSD when delivered in a phased manner:
    </p>

    <ul className="list-disc list-inside mb-6 space-y-3 text-lg text-gray-700 dark:text-neutral-300">
      <li><strong>Schema Therapy:</strong> Addresses maladaptive schemas formed in childhood, using limited reparenting and experiential techniques to heal developmental wounds <Citation id="6" index={6} source="Behaviour Research and Therapy" year="2020" tier={1} />.</li>
      <li><strong>Dialectical Behavior Therapy (DBT):</strong> Originally for borderline personality disorder (which has high C-PTSD overlap), DBT's emotion regulation and distress tolerance modules are highly effective for stabilization <Citation id="8" index={7} source="Journal of Clinical Psychology" year="2020" tier={1} />.</li>
      <li><strong>Internal Family Systems (IFS):</strong> Works with different "parts" of self that developed in response to trauma, promoting internal cooperation and healing.</li>
      <li><strong>Trauma-Focused CBT (TF-CBT):</strong> Modified for complex trauma with extended stabilization phase and gradual exposure.</li>
    </ul>

    <h2 id="self-care" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Living with C-PTSD</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      C-PTSD recovery is a long journey, but meaningful improvement is absolutely possible. Stabilization work—while less dramatic than trauma processing—produces noticeable quality of life improvements: fewer crises, better relationships, more emotional control, reduced self-destructive behaviors.
    </p>

    <PracticalExercise
      title="Window of Tolerance Awareness"
      description="Learn to recognize when you're in your optimal zone for functioning vs. when you're emotionally flooded (hyperarousal) or emotionally numb (hypoarousal)."
      duration="5-10 minutes daily"
      frequency="Multiple times per day"
      steps={[
        "Pause and check in with your body and emotions",
        "Ask: Am I in my window (relatively calm, able to think clearly, emotions manageable)?",
        "If flooded (panic, rage, terror, overwhelm): Use grounding techniques, cold water on face, bilateral tapping, call support person",
        "If numb (disconnected, empty, robotic, can't feel): Use activating strategies—physical movement, cold shower, strong sensory input (sour candy, ice cube)",
        "Chart patterns: What pushes you out of your window? What helps you return?"
      ]}
      warning="This is a self-awareness tool, not a substitute for professional treatment. If you're consistently outside your window, increase therapeutic support."
      className="my-8"
    />

    <SparkMoment
      quote="Trauma is not your fault, but healing is your responsibility."
      author="Unknown"
      context="Often cited in trauma recovery communities"
      reflection="This paradox captures the C-PTSD journey: you didn't cause what happened to you, especially if it occurred in childhood when you had no power. But as an adult, you're the only one who can choose to pursue healing. The trauma was done to you; the recovery must be done by you—with help, with support, but ultimately through your own agency."
      className="my-12"
    />

    <RelatedToolsBlock
      tools={[
        {
          name: "CPTSD Foundation",
          description: "Education, peer support, and resources specifically for complex trauma",
          link: "https://cptsdfoundation.org/"
        },
        {
          name: "DBT Skills Training Handouts",
          description: "Free emotion regulation and distress tolerance worksheets",
          link: "https://www.dbtselfhelp.com/"
        },
        {
          name: "The Body Keeps the Score",
          description: "Influential book by Bessel van der Kolk on trauma's effects and healing",
          link: "https://www.besselvanderkolk.com/"
        },
        {
          name: "ISTSS Find a Therapist",
          description: "Directory of trauma specialists",
          link: "https://istss.org/public-resources/find-a-clinician"
        }
      ]}
      className="my-12"
    />

    <ReferenceList
      references={[
        { id: '1', text: 'C-PTSD Diagnostic Criteria ICD-11', source: 'World Psychiatry', year: '2020', link: 'https://doi.org/10.1002/wps.20748', tier: 1 },
        { id: '2', text: 'Phase-Based Treatment for C-PTSD', source: 'European Journal of Psychotraumatology', year: '2021', link: 'https://doi.org/10.1080/20008198.2021.1863580', tier: 1 },
        { id: '3', text: 'Developmental Trauma Effects', source: 'American Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1176/appi.ajp.2020.19111151', tier: 1 },
        { id: '4', text: 'ISTSS C-PTSD Treatment Guidelines', source: 'International Society for Traumatic Stress Studies', year: '2023', link: 'https://istss.org/clinical-resources/treating-trauma', tier: 3 },
        { id: '5', text: 'Emotion Regulation in C-PTSD', source: 'Journal of Traumatic Stress', year: '2021', link: 'https://doi.org/10.1002/jts.22656', tier: 1 },
        { id: '6', text: 'Schema Therapy for C-PTSD', source: 'Behaviour Research and Therapy', year: '2020', link: 'https://doi.org/10.1016/j.brat.2020.103713', tier: 1 },
        { id: '7', text: 'Attachment in Complex Trauma', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102009', tier: 1 },
        { id: '8', text: 'DBT for C-PTSD', source: 'Journal of Clinical Psychology', year: '2020', link: 'https://doi.org/10.1002/jclp.22991', tier: 1 },
      ]}
      className="mt-12"
    />
  </> },

  { id: catId(23), slug: 'acute-stress-disorder', status: 'draft', title: 'Acute Stress Disorder: The Immediate Aftermath of Trauma', description: 'ASD occurs within days to weeks after trauma. Early intervention prevents PTSD development.', image: "/images/articles/cat13/cover-023.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 11, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['ASD', 'Acute Stress', 'Trauma'], citations: [
    { id: '1', text: 'ASD Diagnostic Criteria', source: 'APA DSM-5-TR', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
    { id: '2', text: 'Early Intervention for ASD', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101853', tier: 1 },
    { id: '3', text: 'Progression from ASD to PTSD', source: 'Journal of Traumatic Stress', year: '2021', link: 'https://doi.org/10.1002/jts.22639', tier: 1 },
    { id: '4', text: 'Trauma-Focused CBT for ASD', source: 'Behaviour Research and Therapy', year: '2020', link: 'https://doi.org/10.1016/j.brat.2020.103642', tier: 1 },
    { id: '5', text: 'Cognitive Therapy for ASD', source: 'JAMA Psychiatry', year: '2021', link: 'https://doi.org/10.1001/jamapsychiatry.2021.0013', tier: 1 },
    { id: '6', text: 'Natural Recovery from Trauma', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291720000847', tier: 1 },
    { id: '7', text: 'Psychoeducation After Trauma', source: 'European Journal of Psychotraumatology', year: '2020', link: 'https://doi.org/10.1080/20008198.2020.1738051', tier: 1 },
    { id: '8', text: 'ASD Risk Factors', source: 'Depression and Anxiety', year: '2021', link: 'https://doi.org/10.1002/da.23128', tier: 1 },
  ], content: <>
    <SummaryBox
      keyPoints={[
        "ASD occurs 3 days to 1 month after trauma exposure—earlier than PTSD diagnosis",
        "Without treatment, 50% of those with ASD develop chronic PTSD",
        "Early cognitive-behavioral therapy within first month reduces PTSD risk by 50-60%",
        "Symptoms include intrusion, avoidance, dissociation, and arousal changes",
        "Not everyone who experiences trauma develops ASD—natural recovery is common"
      ]}
      className="mb-12"
    />

    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
        Acute Stress Disorder (ASD) captures the immediate psychological aftermath of trauma—the period between three days and one month after exposure to a life-threatening event. While most trauma survivors experience some distress in the days following trauma, ASD represents a more severe acute reaction that significantly impairs functioning and predicts higher risk for developing chronic PTSD <Citation id="1" index={1} source="DSM-5-TR" year="2022" tier={4} />. The condition provides a critical window for early intervention that can prevent long-term psychological damage.
      </p>
    </div>

    <KeyFacts
      facts={[
        { label: "Prevalence After Trauma", value: "6-33%", context: "Varies by trauma type" },
        { label: "Conversion to PTSD", value: "50%", context: "Without early treatment" },
        { label: "Treatment Prevention Effect", value: "50-60%", context: "Reduction in PTSD development" },
        { label: "Natural Recovery", value: "50-70%", context: "Recover without intervention" },
        { label: "Diagnosis Window", value: "3-30 days", context: "After trauma exposure" }
      ]}
      className="my-12"
    />

    <h2 id="symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Symptoms of ASD</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      ASD involves nine or more symptoms from five categories <Citation id="1" index={2} source="DSM-5-TR" year="2022" tier={4} />:
    </p>

    <ComparisonTable
      title="Five Symptom Categories in ASD"
      items={[
        {
          name: "Intrusion",
          description: "Recurrent distressing memories, nightmares, flashbacks, intense psychological distress when exposed to trauma reminders"
        },
        {
          name: "Negative Mood",
          description: "Persistent inability to experience positive emotions (happiness, satisfaction, love)"
        },
        {
          name: "Dissociation",
          description: "Altered sense of reality (time slowing, derealization), inability to remember important aspects of trauma, feeling in a daze or detached"
        },
        {
          name: "Avoidance",
          description: "Efforts to avoid distressing memories, thoughts, or feelings; avoidance of external reminders (people, places, conversations, activities)"
        },
        {
          name: "Arousal",
          description: "Sleep disturbance, irritability, hypervigilance, concentration problems, exaggerated startle response"
        }
      ]}
      className="my-8"
    />

    <ArticleCallout type="info" className="my-8">
      <h4 className="font-bold mb-2">Why the 3-Day Minimum?</h4>
      <p>Immediate distress in the first 1-2 days after trauma is normal and expected. The 3-day minimum ensures we're identifying reactions that persist beyond the acute shock phase. Before 3 days, it's simply an acute stress reaction—not yet a disorder requiring intervention.</p>
    </ArticleCallout>

    <h2 id="asd-to-ptsd" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Bridge from ASD to PTSD</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      ASD essentially represents the acute phase that, if unresolved, transitions into chronic PTSD after one month. Research shows approximately 50% of individuals diagnosed with ASD go on to meet PTSD criteria one month later if untreated <Citation id="3" index={3} source="Journal of Traumatic Stress" year="2021" tier={1} />. This makes ASD diagnosis clinically valuable—it identifies those at highest risk while there's still time for preventive intervention.
      </p>

    <DiagramBlock
      title="Trauma Response Timeline"
      description="Understanding when ASD and PTSD diagnoses apply"
      items={[
        { label: "0-3 Days Post-Trauma", value: "Acute Stress Reaction", description: "Normal distress—no diagnosis yet. Psychoeducation and support appropriate." },
        { label: "3-30 Days Post-Trauma", value: "Acute Stress Disorder", description: "If 9+ symptoms present causing impairment. Early CBT strongly recommended." },
        { label: "1+ Months Post-Trauma", value: "PTSD", description: "If symptoms persist beyond one month. Trauma-focused therapy indicated." }
      ]}
      className="my-8"
    />

    <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Early Intervention: Preventing PTSD</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      The evidence is clear: early cognitive-behavioral therapy delivered within the first month after trauma reduces the likelihood of developing chronic PTSD by 50-60% <Citation id="2" index={4} source="Clinical Psychology Review" year="2020" tier={1} />. This makes ASD one of the few psychiatric conditions where we have strong preventive interventions.
    </p>

    <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Trauma-Focused CBT for ASD</h3>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      A brief (4-5 session) course of trauma-focused CBT typically includes:
    </p>

    <ul className="list-disc list-inside mb-6 space-y-2 text-lg text-gray-700 dark:text-neutral-300">
      <li>Psychoeducation about normal vs. problematic trauma reactions</li>
      <li>Breathing retraining and progressive muscle relaxation</li>
      <li>Imaginal exposure to trauma memory (revisiting and processing what happened)</li>
      <li>In vivo exposure to avoided situations that are objectively safe</li>
      <li>Cognitive restructuring of unhelpful thoughts ("It was my fault," "I'm permanently damaged")</li>
    </ul>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      Studies show this brief intervention produces sustained benefits—those who receive early CBT for ASD have lower PTSD rates at 6-month and 12-month follow-ups compared to those who receive only supportive counseling <Citation id="4" index={5} source="Behaviour Research and Therapy" year="2020" tier={1} />.
    </p>

    <ArticleCallout type="warning" className="my-8">
      <h4 className="font-bold mb-2">What About Psychological Debriefing?</h4>
      <p>Single-session "critical incident debriefing" where trauma survivors are asked to recount what happened within hours of the event does NOT prevent PTSD and may increase risk in some individuals. The effective interventions are multi-session, skills-based cognitive-behavioral protocols delivered after the first 3 days <Citation id="7" index={6} source="European Journal of Psychotraumatology" year="2020" tier={1} />.</p>
    </ArticleCallout>

    <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">When to Seek Help</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      If you've experienced a traumatic event and notice these warning signs 3+ days afterward, professional evaluation is recommended:
    </p>

    <ul className="list-disc list-inside mb-6 space-y-2 text-lg text-gray-700 dark:text-neutral-300">
      <li>Intrusive memories or nightmares that interfere with sleep or daily activities</li>
      <li>Feeling emotionally numb or unable to experience positive emotions</li>
      <li>Feeling detached from reality or your body</li>
      <li>Avoiding reminders of the trauma to the point it disrupts normal life</li>
      <li>Constant hypervigilance, jumpiness, or difficulty concentrating</li>
      <li>Significant distress or impairment in work, relationships, or self-care</li>
    </ul>

    <PracticalExercise
      title="Controlled Breathing for Acute Stress"
      description="4-7-8 breathing technique to activate the parasympathetic nervous system and reduce physiological arousal"
      duration="5-10 minutes"
      frequency="3-4 times daily, plus as needed"
      steps={[
        "Sit comfortably with your back straight",
        "Place the tip of your tongue against the ridge behind your upper front teeth",
        "Exhale completely through your mouth, making a whoosh sound",
        "Close your mouth and inhale quietly through your nose for 4 counts",
        "Hold your breath for 7 counts",
        "Exhale completely through your mouth for 8 counts, making a whoosh sound",
        "Repeat the cycle 3-4 times",
      ]}
      warning="If you feel dizzy, return to normal breathing. This technique is powerful—start with just 3-4 cycles."
      className="my-8"
    />

    <SparkMoment
      quote="The expectation of normal recovery is powerful medicine. Most people who experience trauma do not develop chronic PTSD."
      author="Dr. Richard Bryant"
      context="Psychologist and ASD researcher"
      reflection="This counterintuitive finding matters: emphasizing resilience and natural recovery (rather than pathologizing all trauma reactions) actually improves outcomes. When people expect to recover, believe trauma reactions are temporary, and have access to early support, they're more likely to do so. ASD diagnosis serves to identify those needing extra help while normalizing recovery as the expected trajectory."
      className="my-12"
    />

    <RelatedToolsBlock
      tools={[
        {
          name: "PTSD Coach",
          description: "Free VA app with symptom tracking and coping tools",
          link: "https://www.ptsd.va.gov/appvid/mobile/ptsdcoach_app.asp"
        },
        {
          name: "Disaster Distress Helpline",
          description: "24/7 crisis counseling for disaster survivors: 1-800-985-5990",
          link: "https://www.samhsa.gov/find-help/disaster-distress-helpline"
        },
        {
          name: "ISTSS Find a Therapist",
          description: "Directory of trauma specialists for early intervention",
          link: "https://istss.org/public-resources/find-a-clinician"
        }
      ]}
      className="my-12"
    />

    <ReferenceList
      references={[
        { id: '1', text: 'ASD Diagnostic Criteria', source: 'APA DSM-5-TR', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
        { id: '2', text: 'Early Intervention for ASD', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101853', tier: 1 },
        { id: '3', text: 'Progression from ASD to PTSD', source: 'Journal of Traumatic Stress', year: '2021', link: 'https://doi.org/10.1002/jts.22639', tier: 1 },
        { id: '4', text: 'Trauma-Focused CBT for ASD', source: 'Behaviour Research and Therapy', year: '2020', link: 'https://doi.org/10.1016/j.brat.2020.103642', tier: 1 },
        { id: '5', text: 'Cognitive Therapy for ASD', source: 'JAMA Psychiatry', year: '2021', link: 'https://doi.org/10.1001/jamapsychiatry.2021.0013', tier: 1 },
        { id: '6', text: 'Natural Recovery from Trauma', source: 'Psychological Medicine', year: '2020', link: 'https://doi.org/10.1017/S0033291720000847', tier: 1 },
        { id: '7', text: 'Psychoeducation After Trauma', source: 'European Journal of Psychotraumatology', year: '2020', link: 'https://doi.org/10.1080/20008198.2020.1738051', tier: 1 },
        { id: '8', text: 'ASD Risk Factors', source: 'Depression and Anxiety', year: '2021', link: 'https://doi.org/10.1002/da.23128', tier: 1 },
      ]}
      className="mt-12"
    />
  </> },

  { id: catId(24), slug: 'dissociative-identity-disorder', status: 'draft', title: 'Dissociative Identity Disorder: Understanding What Was Once Called "Multiple Personality"', description: "DID involves distinct identity states. Learn the reality behind this misunderstood condition.", image: "/images/articles/cat13/cover-024.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 14, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['DID', 'Dissociation', 'Trauma'], citations: [
    { id: '1', text: 'DID Diagnostic Criteria', source: 'DSM-5-TR', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
    { id: '2', text: 'Trauma Etiology of DID', source: 'American Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1176/appi.ajp.2019.19080821', tier: 1 },
    { id: '3', text: 'DID Treatment Guidelines', source: 'International Society for the Study of Trauma and Dissociation', year: '2023', link: 'https://www.isst-d.org/guidelines/', tier: 3 },
    { id: '4', text: 'Prevalence of DID', source: 'Journal of Trauma & Dissociation', year: '2021', link: 'https://doi.org/10.1080/15299732.2021.1903183', tier: 1 },
    { id: '5', text: 'Neurobiology of DID', source: 'NeuroImage: Clinical', year: '2020', link: 'https://doi.org/10.1016/j.nicl.2020.102356', tier: 1 },
    { id: '6', text: 'Misdiagnosis of DID', source: 'Psychological Medicine', year: '2021', link: 'https://doi.org/10.1017/S0033291721001628', tier: 1 },
    { id: '7', text: 'Phase-Oriented Treatment', source: 'European Journal of Psychotraumatology', year: '2020', link: 'https://doi.org/10.1080/20008198.2020.1771382', tier: 1 },
    { id: '8', text: 'Integration vs Cooperation', source: 'Journal of Clinical Psychology', year: '2021', link: 'https://doi.org/10.1002/jclp.23117', tier: 1 },
  ], content: <>
    <SummaryBox
      keyPoints={[
        "DID involves two or more distinct personality states with discontinuities in sense of self and agency",
        "Results from severe, repeated childhood trauma (90% have documented abuse history)",
        "Prevalence: 1-1.5% of general population—more common than previously thought",
        "Not a psychotic disorder—reality testing remains intact",
        "Treatment is phase-oriented trauma therapy aiming for cooperation or integration of identity states"
      ]}
      className="mb-12"
    />

    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
        Dissociative Identity Disorder (DID), formerly called Multiple Personality Disorder, is perhaps the most misunderstood psychiatric condition. Sensationalized in media and doubted by some clinicians, DID's reality is both more complex and more comprehensible than popular portrayals suggest. At its core, DID represents the mind's attempt to compartmentalize overwhelming childhood trauma so severe that normal integration of identity, memory, and consciousness could not occur <Citation id="2" index={1} source="American Journal of Psychiatry" year="2020" tier={1} />.
      </p>

      <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
        The condition involves disruption of identity characterized by two or more distinct personality states (often called "alters"). These states demonstrate discontinuous sense of self and agency, accompanied by gaps in memory beyond ordinary forgetting. DID is not schizophrenia, not psychosis, and not voluntary role-playing—it's a complex trauma disorder involving fundamental fragmentationof identity development.
      </p>
    </div>

    <h2 id="diagnostic-criteria" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What DID Actually Is</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      DSM-5-TR criteria require <Citation id="1" index={2} source="DSM-5-TR" year="2022" tier={4} />:
    </p>

    <ComparisonTable
      title="Core Features of DID"
      items={[
        {
          name: "Identity Disruption",
          description: "Two or more distinct personality states with discontinuous sense of self, each with its own pattern of perceiving, relating to, and thinking about self and environment"
        },
        {
          name: "Amnesia",
          description: "Recurrent gaps in recall of everyday events, personal information, or traumatic events—inconsistent with ordinary forgetting"
        },
        {
          name: "Distress/Impairment",
          description: "Significant distress or impairment in social, occupational, or other areas of functioning"
        },
        {
          name: "Not Cultural Practice",
          description: "Not part of broadly accepted cultural or religious practice (e.g., possession states in certain traditions)"
        },
        {
          name: "Not Substance-Induced",
          description: "Not attributable to physiological effects of substances or medical conditions"
        }
      ]}
      className="my-8"
    />

    <ArticleCallout type="info" className="my-8">
      <h4 className="font-bold mb-2">Understanding "Alters"</h4>
      <p>Different identity states (alters) may have distinct names, ages, genders, preferences, and even physical characteristics (handwriting, voice). They're not "separate people" but fragmented aspects of one person's psyche that didn't integrate during development. Think of them as survival-based compartments that allowed a child to endure the unendurable by psychologically "going away" during abuse.</p>
    </ArticleCallout>

    <h2 id="causes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">The Trauma Origins of DID</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      DID develops from severe, repeated childhood trauma—typically before age 9. Research shows 90% of individuals with DID report documented histories of severe childhood abuse or neglect. The condition represents a developmental adaptation to trauma so overwhelming that the child's mind compartmentalizes the experience into separate states to preserve some semblance of functioning <Citation id="2" index={3} source="American Journal of Psychiatry" year="2020" tier={1} />.
    </p>

    <DiagramBlock
      title="How DID Develops"
      description="Dissociative defense becomes structural fragmentation"
      items={[
        { label: "Severe Childhood Trauma", value: "Before Age 9", description: "Typically prolonged sexual, physical, or emotional abuse by caregivers" },
        { label: "Dissociation as Defense", value: "Adaptive", description: "Child 'goes away' mentally during abuse—a normal protective response" },
        { label: "Repeated Activation", value: "Chronic", description: "Ongoing trauma reinforces dissociative escape as primary coping mechanism" },
        { label: "Failed Integration", value: "Developmental", description: "Normal consolidation of unified identity doesn't occur—compartments remain separate" },
        { label: "Distinct Identity States", value: "Structural", description: "What began as situational dissociation becomes structural personality fragmentation" }
      ]}
      className="my-8"
    />

    <h2 id="prevalence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">More Common Than You Think</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      DID is not extremely rare. Population studies suggest prevalence of 1-1.5%—similar to schizophrenia or bipolar disorder <Citation id="4" index={4} source="Journal of Trauma & Dissociation" year="2021" tier={1} />. However, it's dramatically underdiagnosed. Average time from first contact with mental health services to accurate diagnosis is 12 years. Patients typically receive an average of 3-4 misdiagnoses (commonly bipolar disorder, borderline personality disorder, schizophrenia, or major depression) before DID is recognized.
    </p>

    <KeyFacts
      facts={[
        { label: "Prevalence", value: "1-1.5%", context: "Of general population" },
        { label: "Childhood Abuse", value: "90%", context: "Report documented trauma history" },
        { label: "Time to Diagnosis", value: "12 years", context: "Average delay from first treatment contact" },
        { label: "Female:Male Ratio", value: "9:1", context: "In clinical samples (gender differences in trauma types)" },
        { label: "Comorbidity", value: "95%+", context: "Have other mental health diagnoses" }
      ]}
      className="my-12"
    />

    <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Treatment: Phase-Oriented Approach</h2>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      DID treatment follows a three-phase model similar to C-PTSD but with additional focus on working with different identity states <Citation id="3" index={5} source="ISSTD" year="2023" tier={3} />:
    </p>

    <ComparisonTable
      title="Three Phases of DID Treatment"
      items={[
        {
          name: "Phase 1: Stabilization",
          description: "Establishing safety, symptom management, developing internal communication between alters, reducing self-harm and dangerous behaviors, building trust in therapy. Duration: 1-3 years."
        },
        {
          name: "Phase 2: Trauma Processing",
          description: "Carefully working through traumatic memories while maintaining stabilization, addressing each alter's trauma experiences, modifying EMDR/CPT for dissociative presentations. Duration: 2-5 years."
        },
        {
          name: "Phase 3: Integration or Cooperation",
          description: "Working toward either full integration (alters blending into unified self) or cooperative functioning (alters working together harmoniously). Duration: 1-2 years."
        }
      ]}
      className="my-8"
    />

    <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">Integration vs. Cooperation</h3>

    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">
      Treatment goals are individualized. Full integration—where all alters blend into a unified identity—is one possible outcome but not the only valid goal. Many individuals with DID achieve excellent functioning through cooperation, where alters maintain some distinctness but work together collaboratively, sharing memories and co-managing life <Citation id="8" index={6} source="Journal of Clinical Psychology" year="2021" tier={1} />.
    </p>

    <ArticleCallout type="warning" className="my-8">
      <h4 className="font-bold mb-2">Hypnosis and "Recovered Memories" Controversy</h4>
      <p>While hypnosis was historically used in DID treatment, current guidelines recommend against it due to risk of creating false memories. Treatment focuses on processing memories that naturally emerge rather than using techniques to "recover" hidden memories. The goal is healing, not archaeological excavation of every trauma detail.</p>
    </ArticleCallout>

    <SparkMoment
      quote="DID is not about 'having multiple people inside.' It's about being one person who, as a child, learned to compartmentalize overwhelming experiences so thoroughly that the compartments developed their own continuity."
      author="Dr. Bethany Brand"
      context="Clinical psychologist and DID researcher"
      reflection="This reframing is crucial: DID patients are not 'possessed' by foreign entities or housing separate individuals. They're trauma survivors whose normal developmental integration was disrupted by experiences no child should endure. Understanding this reduces stigma and clarifies treatment goals—helping one person become more unified."
      className="my-12"
    />

    <RelatedToolsBlock
      tools={[
        {
          name: "ISSTD Treatment Guidelines",
          description: "Evidence-based clinical guidelines for dissociative disorders",
          link: "https://www.isst-d.org/guidelines/"
        },
        {
          name: "Dissociative Experiences Scale",
          description: "Screening tool for dissociative symptoms",
          link: "https://www.isst-d.org/resources/screening-tools/"
        },
        {
          name: "The Haunted Self",
          description: "Definitive textbook by van der Hart, Nijenhuis, & Steele on structural dissociation",
          link: "https://www.guilford.com/books/The-Haunted-Self/Hart-Nijenhuis-Steele/9780393704570"
        }
      ]}
      className="my-12"
    />

    <ReferenceList
      references={[
        { id: '1', text: 'DID Diagnostic Criteria', source: 'DSM-5-TR', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
        { id: '2', text: 'Trauma Etiology of DID', source: 'American Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1176/appi.ajp.2019.19080821', tier: 1 },
        { id: '3', text: 'DID Treatment Guidelines', source: 'International Society for the Study of Trauma and Dissociation', year: '2023', link: 'https://www.isst-d.org/guidelines/', tier: 3 },
        { id: '4', text: 'Prevalence of DID', source: 'Journal of Trauma & Dissociation', year: '2021', link: 'https://doi.org/10.1080/15299732.2021.1903183', tier: 1 },
        { id: '5', text: 'Neurobiology of DID', source: 'NeuroImage: Clinical', year: '2020', link: 'https://doi.org/10.1016/j.nicl.2020.102356', tier: 1 },
        { id: '6', text: 'Misdiagnosis of DID', source: 'Psychological Medicine', year: '2021', link: 'https://doi.org/10.1017/S0033291721001628', tier: 1 },
        { id: '7', text: 'Phase-Oriented Treatment', source: 'European Journal of Psychotraumatology', year: '2020', link: 'https://doi.org/10.1080/20008198.2020.1771382', tier: 1 },
        { id: '8', text: 'Integration vs Cooperation', source: 'Journal of Clinical Psychology', year: '2021', link: 'https://doi.org/10.1002/jclp.23117', tier: 1 },
      ]}
      className="mt-12"
    />
  </> },

  { id: catId(25), slug: 'osdd', status: 'draft', title: 'Other Specified Dissociative Disorder: The In-Between Diagnosis', description: 'OSDD captures dissociative experiences not meeting full DID criteria.', image: "/images/articles/cat13/cover-025.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 10, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['OSDD', 'Dissociation'], citations: [
    { id: '1', text: 'OSDD Diagnostic Category', source: 'APA DSM-5-TR', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
    { id: '2', text: 'OSDD-1 Subtypes', source: 'Journal of Trauma & Dissociation', year: '2021', link: 'https://doi.org/10.1080/15299732.2021.1989351', tier: 1 },
    { id: '3', text: 'Clinical Significance', source: 'European Journal of Trauma & Dissociation', year: '2020', link: 'https://doi.org/10.1016/j.ejtd.2020.100175', tier: 1 },
    { id: '4', text: 'Treatment for OSDD', source: 'Psychological Trauma', year: '2021', link: 'https://doi.org/10.1037/tra0001045', tier: 1 },
    { id: '5', text: 'OSDD vs DID', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101897', tier: 1 },
    { id: '6', text: 'ISSTD Guidelines', source: 'ISSTD', year: '2023', link: 'https://www.isst-d.org/', tier: 3 },
  ], content: <>
    <SummaryBox keyPoints={["OSDD includes dissociative presentations not meeting full DID criteria", "OSDD-1a: Identity states with less distinct amnesia", "OSDD-1b: Identity alterations without fully distinct states", "Equally impairing as DID", "Treatment follows phase-oriented approach"]} className="mb-12" />
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">Other Specified Dissociative Disorder (OSDD) captures clinically significant dissociative presentations close to DID but not quite meeting full criteria. OSDD-1 involves identity fragmentation similar to DID with subtle differences in amnesia patterns or identity distinctness <Citation id="1" index={1} source="DSM-5-TR" year="2022" tier={4} />. Not "DID-lite"—OSDD causes comparable distress and impairment <Citation id="3" index={2} source="European Journal of Trauma & Dissociation" year="2020" tier={1} />.</p>
    </div>
    <KeyFacts facts={[{label:"Prevalence",value:"~1%",context:"Similar to DID"},{label:"Trauma History",value:"85-90%",context:"Childhood abuse"},{label:"OSDD-1a",value:"Less Amnesia",context:"Identity states, emotional amnesia only"},{label:"OSDD-1b",value:"Less Distinct",context:"Identity shifts without full separation"}]} className="my-12" />
    <h2 id="subtypes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">OSDD-1 Subtypes</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300"><strong>OSDD-1a:</strong> Distinct identity states but with less clear-cut amnesia—emotional amnesia (remember events but not feelings) rather than memory blackouts. <strong>OSDD-1b:</strong> Less distinct ego states with memory gaps present. Many transition between DID and OSDD-1 diagnoses as symptoms fluctuate <Citation id="2" index={3} source="Journal of Trauma & Dissociation" year="2021" tier={1} />.</p>
    <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Treatment</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">Same phase-oriented approach as DID: stabilization, trauma processing, integration/cooperation <Citation id="4" index={4} source="Psychological Trauma" year="2021" tier={1} />. Parts mapping exercises help understand internal system. Therapy develops communication between parts and processes underlying trauma.</p>
    <RelatedToolsBlock tools={[{name:"ISSTD Guidelines",description:"Evidence-based approaches",link:"https://www.isst-d.org/guidelines/"},{name:"The Haunted Self",description:"Structural dissociation theory",link:"https://www.guilford.com/books/The-Haunted-Self/Hart-Nijenhuis-Steele/9780393704570"}]} className="my-12" />
    <ReferenceList references={[{id:'1',text:'OSDD Diagnostic Category',source:'APA DSM-5-TR',year:'2022',link:'https://doi.org/10.1176/appi.books.9780890425787',tier:4},{id:'2',text:'OSDD-1 Subtypes',source:'Journal of Trauma & Dissociation',year:'2021',link:'https://doi.org/10.1080/15299732.2021.1989351',tier:1},{id:'3',text:'Clinical Significance',source:'European Journal of Trauma & Dissociation',year:'2020',link:'https://doi.org/10.1016/j.ejtd.2020.100175',tier:1},{id:'4',text:'Treatment for OSDD',source:'Psychological Trauma',year:'2021',link:'https://doi.org/10.1037/tra0001045',tier:1},{id:'5',text:'OSDD vs DID',source:'Clinical Psychology Review',year:'2020',link:'https://doi.org/10.1016/j.cpr.2020.101897',tier:1},{id:'6',text:'ISSTD Guidelines',source:'ISSTD',year:'2023',link:'https://www.isst-d.org/',tier:3}]} className="mt-12" />
  </> },

  { id: catId(26), slug: 'depersonalization-derealization', status: 'draft', title: 'Depersonalization and Derealization: When Reality Feels Unreal', description: 'DPDR involves feeling detached from self or surroundings. Learn causes and treatments.', image: "/images/articles/cat13/cover-026.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 12, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['Depersonalization', 'Derealization', 'Dissociation'], citations: [
    { id: '1', text: 'DPDR Criteria', source: 'DSM-5-TR', year: '2022', link: 'https://doi.org/10.1176/appi.books.9780890425787', tier: 4 },
    { id: '2', text: 'Treatment of DPDR', source: 'Journal of Trauma & Dissociation', year: '2020', link: 'https://doi.org/10.1080/15299732.2020.1719263', tier: 1 },
    { id: '3', text: 'Prevalence and Course', source: 'Comprehensive Psychiatry', year: '2021', link: 'https://doi.org/10.1016/j.comppsych.2021.152256', tier: 1 },
    { id: '4', text: 'CBT for DPDR', source: 'Behaviour Research and Therapy', year: '2020', link: 'https://doi.org/10.1016/j.brat.2020.103718', tier: 1 },
    { id: '5', text: 'Grounding Techniques', source: 'Clinical Psychology & Psychotherapy', year: '2021', link: 'https://doi.org/10.1002/cpp.2551', tier: 1 },
  ], content: <>
    <SummaryBox keyPoints={["Depersonalization: feeling detached from yourself", "Derealization: surroundings feel unreal or dreamlike", "Prevalence: 1-2% have chronic form, 50% experience transiently", "Reality testing remains intact—know feelings aren't 'real'", "CBT and grounding techniques are first-line treatment"]} className="mb-12" />
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">Depersonalization/Derealization Disorder (DPDR) involves persistent or recurrent feelings of detachment from yourself (depersonalization) or experiencing surroundings as unreal, dreamlike, or distorted (derealization). Crucially, reality testing remains intact—people know these feelings aren't real, which distinguishes DPDR from psychosis <Citation id="1" index={1} source="DSM-5-TR" year="2022" tier={4} />. Up to 50% of adults experience transient depersonalization/derealization after trauma or extreme stress; 1-2% have the chronic disorder <Citation id="3" index={2} source="Comprehensive Psychiatry" year="2021" tier={1} />.</p>
    </div>
    <h2 id="what-it-feels-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">What DPDR Feels Like</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">Depersonalization: feeling like an outside observer of your thoughts, feelings, body—"I'm watching myself from outside." Emotional numbing, feeling robotic, body feels unfamiliar. Derealization: world feels foggy, flat, artificial—people seem like actors, familiar places feel foreign. Time distortion common. Despite these experiences, people recognize they're altered perceptions, not reality.</p>
    <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Treatment</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">Cognitive-behavioral therapy targeting underlying anxiety and avoidance patterns shows effectiveness <Citation id="4" index={3} source="Behaviour Research and Therapy" year="2020" tier={1} />. Grounding techniques (5-4-3-2-1 sensory awareness, cold water, strong sensory input) interrupt dissociative episodes <Citation id="5" index={4} source="Clinical Psychology & Psychotherapy" year="2021" tier={1} />. No FDA-approved medications, but some find SSRIs helpful for comorbid anxiety. Reducing substance use, stress management, and sleep hygiene help prevent triggers.</p>
    <PracticalExercise title="5-4-3-2-1 Grounding" description="Interrupt dissociation by engaging all five senses" duration="3-5 minutes" frequency="As needed" steps={["Name 5 things you see","Name 4 things you physically feel","Name 3 things you hear","Name 2 things you smell","Name 1 thing you taste"]} warning="For in-moment grounding, not treatment replacement" className="my-8" />
    <ReferenceList references={[{id:'1',text:'DPDR Criteria',source:'DSM-5-TR',year:'2022',link:'https://doi.org/10.1176/appi.books.9780890425787',tier:4},{id:'2',text:'Treatment of DPDR',source:'Journal of Trauma & Dissociation',year:'2020',link:'https://doi.org/10.1080/15299732.2020.1719263',tier:1},{id:'3',text:'Prevalence',source:'Comprehensive Psychiatry',year:'2021',link:'https://doi.org/10.1016/j.comppsych.2021.152256',tier:1},{id:'4',text:'CBT for DPDR',source:'Behaviour Research and Therapy',year:'2020',link:'https://doi.org/10.1016/j.brat.2020.103718',tier:1},{id:'5',text:'Grounding',source:'Clinical Psychology & Psychotherapy',year:'2021',link:'https://doi.org/10.1002/cpp.2551',tier:1}]} className="mt-12" />
  </> },

  { id: catId(27), slug: 'dissociation-double-edged', status: 'draft', title: 'How Dissociation Protects and Hinders: The Double-Edged Coping Mechanism', description: 'Dissociation shields from overwhelming trauma but impairs functioning. Understand this adaptive-turned-maladaptive response.', image: "/images/articles/cat13/cover-027.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 8, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['Dissociation', 'Coping', 'Trauma'], citations: [
    { id: '1', text: 'Dissociation as Defense', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101836', tier: 1 },
    { id: '2', text: 'Adaptive vs Maladaptive', source: 'Journal of Traumatic Stress', year: '2021', link: 'https://doi.org/10.1002/jts.22621', tier: 1 },
    { id: '3', text: 'Peritraumatic Dissociation', source: 'Psychological Trauma', year: '2020', link: 'https://doi.org/10.1037/tra0000566', tier: 1 },
    { id: '4', text: 'Structural Dissociation', source: 'European Journal of Psychotraumatology', year: '2021', link: 'https://doi.org/10.1080/20008198.2021.1863580', tier: 1 },
  ], content: <>
    <SummaryBox keyPoints={["Dissociation is adaptive during trauma—'mental escape' when physical escape impossible","Becomes maladaptive when activated chronically post-trauma","Impairs emotional processing, memory integration, present-moment awareness","Common in PTSD, C-PTSD, DID, borderline personality disorder","Treatment: grounding, mindfulness, trauma processing once stabilized"]} className="mb-12" />
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">Dissociation protects the psyche during overwhelming trauma by creating psychological distance from unbearable experience. When you can't physically escape, your mind escapes—detaching from emotions, body sensations, or the event itself. This is adaptive survival <Citation id="1" index={1} source="Clinical Psychology Review" year="2020" tier={1} />. The problem emerges when dissociation becomes chronic—activated in safe situations, preventing emotional processing and keeping you disconnected from present reality <Citation id="2" index={2} source="Journal of Traumatic Stress" year="2021" tier={1} />.</p>
    </div>
    <h2 id="adaptive-phase" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">When Dissociation Helps</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">During trauma: mental escape reduces psychological damage when overwhelmed. Allows functioning during crisis (first responders, abuse survivors). Compartmentalizes unbearable memories until person has resources to process. Peritraumatic dissociation (during trauma) predicts PTSD but also reflects adaptive coping in the moment <Citation id="3" index={3} source="Psychological Trauma" year="2020" tier={1} />.</p>
    <h2 id="maladaptive-phase" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">When Dissociation Hinders</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">Post-trauma: chronic dissociation prevents integration of traumatic memories. Emotional numbing blocks processing. Depersonalization disconnects from recovery resources. Memory fragmentation impairs narrative coherence. Becomes automatic response to stress, even minor. In structural dissociation, segregated identity states can't share information or cooperate <Citation id="4" index={4} source="European Journal of Psychotraumatology" year="2021" tier={1} />.</p>
    <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Healing: Reducing Maladaptive Dissociation</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">Grounding techniques increase present-moment awareness. Mindfulness training without overwhelming. Trauma processing (once stabilized) resolves triggers. Therapy helps recognize dissociation triggers. Goal: reduce automatic dissociation while preserving ability to use it adaptively if genuinely needed.</p>
    <ReferenceList references={[{id:'1',text:'Dissociation as Defense',source:'Clinical Psychology Review',year:'2020',link:'https://doi.org/10.1016/j.cpr.2020.101836',tier:1},{id:'2',text:'Adaptive vs Maladaptive',source:'Journal of Traumatic Stress',year:'2021',link:'https://doi.org/10.1002/jts.22621',tier:1},{id:'3',text:'Peritraumatic Dissociation',source:'Psychological Trauma',year:'2020',link:'https://doi.org/10.1037/tra0000566',tier:1},{id:'4',text:'Structural Dissociation',source:'European Journal of Psychotraumatology',year:'2021',link:'https://doi.org/10.1080/20008198.2021.1863580',tier:1}]} className="mt-12" />
  </> },

  { id: catId(28), slug: 'trauma-military-veterans', status: 'draft', title: 'Trauma-Related Disorders in Military Veterans: Specialized Considerations', description: 'Combat trauma presents unique challenges. Learn about military-specific PTSD treatment.', image: "/images/articles/cat13/cover-028.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 9, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['Veterans', 'PTSD', 'Military'], citations: [
    { id: '1', text: 'PTSD in Veterans', source: 'JAMA', year: '2021', link: 'https://doi.org/10.1001/jama.2021.5863', tier: 1 },
    { id: '2', text: 'VA/DOD Guidelines', source: 'U.S. Department of Veterans Affairs', year: '2023', link: 'https://www.healthquality.va.gov/guidelines/MH/ptsd/', tier: 2 },
    { id: '3', text: 'Moral Injury', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102019', tier: 1 },
    { id: '4', text: 'Military Sexual Trauma', source: 'Psychological Trauma', year: '2020', link: 'https://doi.org/10.1037/tra0000547', tier: 1 },
    { id: '5', text: 'VA Specialized Programs', source: 'Psychiatric Services', year: '2021', link: 'https://doi.org/10.1176/appi.ps.202000295', tier: 1 },
  ], content: <>
    <SummaryBox keyPoints={["11-20% of Iraq/Afghanistan veterans have PTSD", "Combat trauma often includes moral injury (guilt over actions/inactions)", "VA offers specialized PTSD programs: CPT, PE, EMDR", "Military sexual trauma (MST) affects 1 in 4 women, 1 in 100 men veterans", "Veterans Crisis Line: 988 press 1, available 24/7"]} className="mb-12" />
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">Combat veterans face unique trauma challenges beyond civilian PTSD. Approximately 11-20% of Iraq and Afghanistan veterans have PTSD <Citation id="1" index={1} source="JAMA" year="2021" tier={1} />. Military trauma often involves moral injury—psychological distress from actions or inactions that violate deeply held values. The VA health system provides specialized PTSD treatment programs with strong evidence base <Citation id="2" index={2} source="VA/DOD" year="2023" tier={2} />.</p>
    </div>
    <h2 id="military-specific-challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Military-Specific Trauma</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300"><strong>Combat exposure:</strong> Firefights, IEDs, witnessing casualties. <strong>Moral injury:</strong> Guilt over killing, failure to prevent deaths, following orders that conflict with values <Citation id="3" index={3} source="Clinical Psychology Review" year="2021" tier={1} />. <strong>Military sexual trauma (MST):</strong> Sexual assault or harassment during service affects 1 in 4 women veterans <Citation id="4" index={4} source="Psychological Trauma" year="2020" tier={1} />. <strong>Loss of military identity:</strong> Transition to civilian life compounds trauma.</p>
    <h2 id="va-treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">VA PTSD Programs</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">VA offers evidence-based treatments: Cognitive Processing Therapy (CPT), Prolonged Exposure (PE), EMDR. Specialized tracks for MST survivors. Residential PTSD programs for severe cases. Vet Centers provide readjustment counseling. All veterans with combat service eligible regardless of discharge status <Citation id="5" index={5} source="Psychiatric Services" year="2021" tier={1} />.</p>
    <ArticleCallout type="crisis" className="my-8"><h4 className="font-bold mb-2">Veterans Crisis Line</h4><p>Call 988 and press 1, text 838255, or chat at VeteransCrisisLine.net. Available 24/7 for veterans, service members, and families.</p></ArticleCallout>
    <RelatedToolsBlock tools={[{name:"VA PTSD Treatment Locator",description:"Find VA PTSD specialists",link:"https://www.va.gov/find-locations/"},{name:"Make the Connection",description:"Veteran stories and resources",link:"https://maketheconnection.net/"},{name:"AboutFace",description:"Veterans share PTSD recovery stories",link:"https://www.ptsd.va.gov/apps/aboutface/"}]} className="my-12" />
    <ReferenceList references={[{id:'1',text:'PTSD in Veterans',source:'JAMA',year:'2021',link:'https://doi.org/10.1001/jama.2021.5863',tier:1},{id:'2',text:'VA/DOD Guidelines',source:'U.S. Department of Veterans Affairs',year:'2023',link:'https://www.healthquality.va.gov/guidelines/MH/ptsd/',tier:2},{id:'3',text:'Moral Injury',source:'Clinical Psychology Review',year:'2021',link:'https://doi.org/10.1016/j.cpr.2021.102019',tier:1},{id:'4',text:'Military Sexual Trauma',source:'Psychological Trauma',year:'2020',link:'https://doi.org/10.1037/tra0000547',tier:1},{id:'5',text:'VA Programs',source:'Psychiatric Services',year:'2021',link:'https://doi.org/10.1176/appi.ps.202000295',tier:1}]} className="mt-12" />
  </> },

  { id: catId(29), slug: 'trauma-substance-use', status: 'draft', title: 'The Relationship Between Trauma Disorders and Substance Use', description: 'Trauma and addiction commonly co-occur. Understand the self-medication hypothesis and integrated treatment.', image: "/images/articles/cat13/cover-029.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 8, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['Trauma', 'Substance Use', 'Dual Diagnosis'], citations: [
    { id: '1', text: 'PTSD-SUD Comorbidity', source: 'Addiction', year: '2020', link: 'https://doi.org/10.1111/add.14956', tier: 1 },
    { id: '2', text: 'Self-Medication Hypothesis', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102067', tier: 1 },
    { id: '3', text: 'Integrated Treatment', source: 'JAMA Psychiatry', year: '2020', link: 'https://doi.org/10.1001/jamapsychiatry.2020.3650', tier: 1 },
    { id: '4', text: 'SAMHSA TIP 42', source: 'SAMHSA', year: '2023', link: 'https://store.samhsa.gov/product/tip-42-substance-use-disorder-treatment-persons-co-occurring-disorders/pep21-02-01-002', tier: 2 },
  ], content: <>
    <SummaryBox keyPoints={["30-60% with PTSD also have substance use disorder", "Self-medication: using substances to numb trauma symptoms", "Sequential treatment often fails—integrated approach needed", "Treating only SUD without trauma leads to relapse", "Evidence-based: CPT, PE, EMDR adapted for dual diagnosis"]} className="mb-12" />
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">Trauma and addiction frequently co-occur: 30-60% of individuals with PTSD also meet criteria for substance use disorder <Citation id="1" index={1} source="Addiction" year="2020" tier={1} />. The self-medication hypothesis explains this link—substances temporarily reduce trauma symptoms (numbing nightmares, calming hyperarousal, suppressing intrusive memories) but ultimately worsen PTSD and create addiction <Citation id="2" index={2} source="Clinical Psychology Review" year="2021" tier={1} />. Integrated treatment addressing both conditions simultaneously produces better outcomes than sequential approaches.</p>
    </div>
    <h2 id="why-they-cooccur" className="text-3xl font-display font-bold text-gray-900 dark:text-neutral-300 mt-12 mb-6 scroll-mt-32">Why Trauma and Addiction Co-Occur</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">Alcohol/sedatives reduce hyperarousal and help sleep. Stimulants counter numbing/dissociation. Opioids ease emotional pain. Cannabis reduces nightmares (short-term). Problem: tolerance develops, requiring more substance. Withdrawal worsens PTSD symptoms. Substance use impairs trauma memory processing. Creates cycle: trauma → substance use → worsening trauma symptoms → increased use.</p>
    <h2 id="integrated-treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Integrated Treatment</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">Addressing both conditions concurrently improves outcomes <Citation id="3" index={3} source="JAMA Psychiatry" year="2020" tier={1} />. SAMHSA recommends integrated approach: simultaneous PTSD and SUD treatment by coordinated providers <Citation id="4" index={4} source="SAMHSA" year="2023" tier={2} />. Modified CPT/PE/EMDR for dual diagnosis. Harm reduction approaches accepted. Medication-assisted treatment (MAT) for opioid/alcohol use supported. Residential trauma programs for severe cases.</p>
    <ArticleCallout type="warning" className="my-8"><h4 className="font-bold mb-2">Abstinence Not Always Required First</h4><p>Older models required sobriety before trauma treatment. Current evidence: integrated treatment with harm reduction works better. Trauma processing can occur while actively reducing (not necessarily eliminating) substance use.</p></ArticleCallout>
    <ReferenceList references={[{id:'1',text:'PTSD-SUD Comorbidity',source:'Addiction',year:'2020',link:'https://doi.org/10.1111/add.14956',tier:1},{id:'2',text:'Self-Medication',source:'Clinical Psychology Review',year:'2021',link:'https://doi.org/10.1016/j.cpr.2021.102067',tier:1},{id:'3',text:'Integrated Treatment',source:'JAMA Psychiatry',year:'2020',link:'https://doi.org/10.1001/jamapsychiatry.2020.3650',tier:1},{id:'4',text:'SAMHSA TIP 42',source:'SAMHSA',year:'2023',link:'https://store.samhsa.gov/product/tip-42-substance-use-disorder-treatment-persons-co-occurring-disorders/pep21-02-01-002',tier:2}]} className="mt-12" />
  </> },

  { id: catId(30), slug: 'advances-trauma-treatment', status: 'draft', title: 'Advances in Trauma and Dissociative Disorder Treatment', description: 'New trauma treatments show promise. Explore innovations beyond traditional therapy.', image: "/images/articles/cat13/cover-030.svg", category: CATEGORY_MENTAL_HEALTH_CONDITIONS, readTime: 9, publishedAt: '2026-03-17', author: PRIMARY_AUTHOR, reviewedBy: CLINICAL_REVIEWER, tags: ['Trauma Treatment', 'Research', 'Innovation'], citations: [
    { id: '1', text: 'MDMA for PTSD', source: 'Nature Medicine', year: '2021', link: 'https://doi.org/10.1038/s41591-021-01336-3', tier: 1 },
    { id: '2', text: 'Stellate Ganglion Block', source: 'JAMA Psychiatry', year: '2020', link: 'https://doi.org/10.1001/jamapsychiatry.2020.3474', tier: 1 },
    { id: '3', text: 'Neurofeedback for PTSD', source: 'NeuroImage: Clinical', year: '2021', link: 'https://doi.org/10.1016/j.nicl.2021.102738', tier: 1 },
    { id: '4', text: 'Virtual Reality Exposure', source: 'Behaviour Research and Therapy', year: '2021', link: 'https://doi.org/10.1016/j.brat.2021.103896', tier: 1 },
    { id: '5', text: 'Ketamine for PTSD', source: 'American Journal of Psychiatry', year: '2021', link: 'https://doi.org/10.1176/appi.ajp.2021.21010128', tier: 1 },
  ], content: <>
    <SummaryBox keyPoints={["MDMA-assisted therapy: 67% no longer met PTSD criteria in Phase 3 trials", "Stellate ganglion block: injection reducing hyperarousal symptoms", "Neurofeedback: training brain activity patterns", "VR exposure therapy: controlled trauma-related scenarios", "Ketamine: rapid-acting treatment for severe PTSD"]} className="mb-12" />
    <div id="introduction" className="scroll-mt-32">
      <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">Beyond traditional CPT, EMDR, and PE, several innovative treatments show promise for trauma disorders. MDMA-assisted therapy produced breakthrough results in Phase 3 trials: 67% of participants no longer met PTSD diagnostic criteria after three sessions <Citation id="1" index={1} source="Nature Medicine" year="2021" tier={1} />. FDA approval anticipated in 2024. These advances offer hope for treatment-resistant PTSD and expand options beyond talk therapy alone.</p>
    </div>
    <h2 id="emerging-treatments" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Promising Innovations</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300"><strong>MDMA-assisted psychotherapy:</strong> 3 sessions with MDMA plus therapy. Reduces fear during trauma processing. Allows deeper engagement with memories <Citation id="1" index={2} source="Nature Medicine" year="2021" tier={1} />. <strong>Stellate ganglion block (SGB):</strong> Local anesthetic injection to neck nerve bundle. Reduces physiological hyperarousal. Effect often immediate, lasts months <Citation id="2" index={3} source="JAMA Psychiatry" year="2020" tier={1} />. <strong>Neurofeedback:</strong> Real-time brain activity display. Training to normalize PTSD-related patterns <Citation id="3" index={4} source="NeuroImage: Clinical" year="2021" tier={1} />. <strong>VR exposure:</strong> Virtual reality simulations for controlled exposure <Citation id="4" index={5} source="Behaviour Research and Therapy" year="2021" tier={1} />. <strong>Ketamine:</strong> Rapid reduction in PTSD symptoms, particularly for severe cases <Citation id="5" index={6} source="American Journal of Psychiatry" year="2021" tier={1} />.</p>
    <h2 id="status" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Current Status</h2>
    <p className="mb-6 text-lg text-gray-700 dark:text-neutral-300">Most remain experimental or limited availability. MDMA-assisted therapy awaiting FDA approval. SGB available at some VA centers and private clinics. VR exposure increasingly available. Standard therapies (CPT, EMDR, PE) remain first-line with strongest evidence base. Innovations expand toolkit for treatment-resistant cases.</p>
    <ReferenceList references={[{id:'1',text:'MDMA for PTSD',source:'Nature Medicine',year:'2021',link:'https://doi.org/10.1038/s41591-021-01336-3',tier:1},{id:'2',text:'Stellate Ganglion Block',source:'JAMA Psychiatry',year:'2020',link:'https://doi.org/10.1001/jamapsychiatry.2020.3474',tier:1},{id:'3',text:'Neurofeedback',source:'NeuroImage: Clinical',year:'2021',link:'https://doi.org/10.1016/j.nicl.2021.102738',tier:1},{id:'4',text:'VR Exposure',source:'Behaviour Research and Therapy',year:'2021',link:'https://doi.org/10.1016/j.brat.2021.103896',tier:1},{id:'5',text:'Ketamine',source:'American Journal of Psychiatry',year:'2021',link:'https://doi.org/10.1176/appi.ajp.2021.21010128',tier:1}]} className="mt-12" />
  </> },
];
