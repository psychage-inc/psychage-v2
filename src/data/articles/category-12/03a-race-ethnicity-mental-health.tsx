/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_CULTURAL_GLOBAL, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

export const raceEthnicityMentalHealthArticlesA: Article[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // Article 21: Racial Trauma
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: catId(21),
    slug: 'racial-trauma-psychological-impact-racism-mental-health',
    status: 'published',
    title: 'Racial Trauma: The Psychological Impact of Racism on Mental Health',
    description: 'Understand how experiences of racism cause real psychological harm, from hypervigilance to PTSD symptoms, and how to begin the healing process.',
    image: "/images/articles/cat12/cover-021.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Racial Trauma', 'Racism', 'PTSD', 'Mental Health Disparities', 'Healing'],
    summary: 'Racial trauma is the psychological harm caused by experiences of racism, from microaggressions to violent attacks. It produces PTSD-like symptoms including hypervigilance, intrusive thoughts, and emotional numbness. This article explores how racism impacts mental health, why it often goes unrecognized, and pathways to healing through culturally responsive care and community support.',
    keyFacts: [
      { text: 'Black Americans exposed to racial discrimination have 2.3 times higher risk of PTSD symptoms', citationIndex: 3 },
      { text: 'Daily racial microaggressions increase psychological distress by 50% for people of color', citationIndex: 1 },
      { text: 'Chronic racism exposure causes "weathering"—premature physiological aging through elevated cortisol and inflammatory markers', citationIndex: 6 },
      { text: '60% of people of color report vicarious trauma from witnessing racist violence', citationIndex: 1 },
      { text: 'Culturally responsive therapy produces significantly better outcomes than generic treatment for racial trauma', citationIndex: 8 },
    ],
    sparkMoment: 'Racism isn\'t just unfair—it causes measurable, serious harm to mental health that deserves validation, recognition, and culturally informed treatment.',
    practicalExercise: {
      title: 'Processing Racial Trauma Through Journaling',
      steps: [
        { title: 'Name the Experience', description: 'Write about a recent racist incident without minimizing it. Describe what happened, how it felt, and what it made you believe about yourself or the world.' },
        { title: 'Validate the Harm', description: 'Write "What happened was real, wrong, and harmful" at the top of the page. Repeat this affirmation to counter gaslighting and self-doubt.' },
        { title: 'Externalize the Cause', description: 'Write "This harm is not about my worth—it\'s about racism" to separate the trauma from your identity and place responsibility where it belongs.' },
        { title: 'Identify Support', description: 'List three people or communities who understand your experience and can offer validation. Reach out to one of them within 24 hours.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Use the Mood Journal',
    },
    citations: [
      {
        id: '1',
        text: 'Racial trauma: Theory, research, and healing: Introduction to the special issue',
        source: 'American Psychologist',
        year: '2019',
        link: 'https://doi.org/10.1037/amp0000442',
        tier: 1,
      },
      {
        id: '2',
        text: 'Race-based traumatic stress: An analysis of the research and theory',
        source: 'American Journal of Orthopsychiatry',
        year: '2017',
        link: 'https://doi.org/10.1037/ort0000225',
        tier: 1,
      },
      {
        id: '3',
        text: 'The impact of racial discrimination and the role of coping behaviors on PTSD symptoms among Black Americans',
        source: 'Anxiety, Stress & Coping',
        year: '2018',
        link: 'https://doi.org/10.1080/10615806.2018.1482723',
        tier: 1,
      },
      {
        id: '4',
        text: 'Racism and health: Evidence and needed research',
        source: 'Annual Review of Public Health',
        year: '2019',
        link: 'https://doi.org/10.1146/annurev-publhealth-040218-043750',
        tier: 1,
      },
      {
        id: '5',
        text: 'Mental Health Impacts of Racism',
        source: 'American Psychiatric Association',
        year: '2021',
        link: 'https://www.psychiatry.org/newsroom/apa-apology-for-its-support-of-structural-racism',
        tier: 3,
      },
      {
        id: '6',
        text: 'Weathering and age patterns of allostatic load scores among blacks and whites in the United States',
        source: 'American Journal of Public Health',
        year: '2006',
        link: 'https://doi.org/10.2105/AJPH.2004.060749',
        tier: 1,
      },
      {
        id: '7',
        text: 'Understanding and Addressing the Impact of Structural Racism on Health',
        source: 'Centers for Disease Control and Prevention',
        year: '2022',
        link: 'https://www.cdc.gov/minorityhealth/racism-disparities/index.html',
        tier: 2,
      },
      {
        id: '8',
        text: 'Healing from Racial Trauma: A Guide for People of Color',
        source: 'Journal of Multicultural Counseling and Development',
        year: '2020',
        link: 'https://doi.org/10.1002/jmcd.12187',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            When you experience racism---whether a violent assault, a microaggression at work, or watching another person who looks like you harmed on the news---your body and mind respond with a stress reaction. When these experiences accumulate over a lifetime, they can produce symptoms that look remarkably like PTSD: hypervigilance, intrusive thoughts, emotional numbness, and a persistent sense of danger.
          </p>
          <p className="mb-6">
            This is racial trauma <Citation id="1" index={1} source="American Psychologist" year="2019" tier={1} />. Also called race-based traumatic stress, it refers to the psychological and emotional harm caused by encounters with racial bias, discrimination, and violence <Citation id="2" index={2} source="American Journal of Orthopsychiatry" year="2017" tier={1} />. The term validates what people of color have long known: racism isn't just unfair---it's harmful to mental health in measurable, serious ways.
          </p>
        </div>

        <h2 id="what-is-racial-trauma" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Racial Trauma?
        </h2>
        <p className="mb-6">
          Racial trauma occurs when experiences of racism overwhelm a person's ability to cope, producing lasting psychological harm <Citation id="1" index={1} source="American Psychologist" year="2019" tier={1} />. These experiences can include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Direct attacks</strong>: Being called slurs, physically assaulted, or threatened because of race</li>
          <li><strong>Institutional racism</strong>: Being denied jobs, housing, loans, or healthcare due to racial bias</li>
          <li><strong>Vicarious trauma</strong>: Witnessing or hearing about violence against people who share your racial or ethnic identity</li>
          <li><strong>Microaggressions</strong>: Cumulative "small" indignities---being followed in stores, asked "where are you really from," having your name mispronounced repeatedly, or being assumed to be in a lower-status role</li>
          <li><strong>Historical trauma</strong>: Carrying the psychological legacy of slavery, colonization, genocide, or forced displacement experienced by your ancestors</li>
        </ul>

        <ArticleCallout variant="clinical-note" title="Why the Term Matters">
          <p>
            For decades, the mental health field lacked language to describe race-specific psychological harm. People experiencing racial trauma were often misdiagnosed with depression or generalized anxiety when the root cause was racialized violence and stress. The term "racial trauma" validates the source of the harm and points toward culturally responsive treatment.
          </p>
        </ArticleCallout>

        <h2 id="symptoms-of-racial-trauma" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Symptoms of Racial Trauma
        </h2>
        <p className="mb-6">
          Racial trauma can produce symptoms that closely resemble post-traumatic stress disorder (PTSD) <Citation id="3" index={3} source="Anxiety, Stress & Coping" year="2018" tier={1} />. Common reactions include:
        </p>

        <ComparisonTable
          title="Racial Trauma Symptoms Across Domains"
          columns={['Domain', 'Common Symptoms', 'How It Shows Up']}
          items={[
            {
              feature: 'Hypervigilance & Re-Experiencing',
              values: [
                'Intrusive thoughts, flashbacks, nightmares of racist incidents',
                'Constantly scanning environments for racial threats; replaying racist encounters mentally',
              ],
            },
            {
              feature: 'Avoidance & Numbing',
              values: [
                'Avoiding places, people, or situations where racism is likely',
                'Emotional numbing; difficulty trusting others, especially from dominant racial groups',
              ],
            },
            {
              feature: 'Physical Stress Response',
              values: [
                'Elevated heart rate, sweating, muscle tension when triggered',
                'Chronic headaches, digestive issues, sleep disturbances linked to racial stress',
              ],
            },
            {
              feature: 'Emotional Impact',
              values: [
                'Anger, rage, sadness, grief, hopelessness',
                "Difficulty regulating emotions; feeling 'on edge' or emotionally exhausted",
              ],
            },
            {
              feature: 'Cognitive Effects',
              values: [
                'Negative beliefs about self-worth and safety',
                'Rumination; difficulty concentrating; questioning one\'s perception of reality (racial gaslighting)',
              ],
            },
          ]}
          highlightColumn={0}
        />

        <h2 id="weathering-and-health-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          "Weathering": How Chronic Racism Accelerates Aging
        </h2>
        <p className="mb-6">
          Dr. Arline Geronimus introduced the concept of "weathering" to describe how chronic exposure to racism causes premature physiological aging <Citation id="6" index={6} source="American Journal of Public Health" year="2006" tier={1} />. The stress of racism activates the body's fight-or-flight system repeatedly, leading to:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Elevated cortisol and inflammatory markers</li>
          <li>Higher rates of hypertension, diabetes, and cardiovascular disease</li>
          <li>Increased allostatic load---the cumulative wear and tear on the body from chronic stress</li>
          <li>Shortened telomeres (cellular markers of aging)</li>
        </ul>

        <StatCard
          stats={[
            { value: 2.3, suffix: 'x', label: 'Higher PTSD risk for Black Americans exposed to racial discrimination' },
            { value: 50, suffix: '%', label: 'Increase in psychological distress from daily racial microaggressions' },
            { value: 60, suffix: '%', label: 'Of people of color report vicarious trauma from witnessing racist violence' },
          ]}
          source="American Psychologist, 2019; CDC Health Disparities Report, 2022"
        />

        <h2 id="why-it-goes-unrecognized" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Racial Trauma Often Goes Unrecognized
        </h2>
        <p className="mb-6">
          Despite its prevalence, racial trauma is frequently dismissed or misunderstood <Citation id="4" index={4} source="Annual Review of Public Health" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Minimization</strong>: People are told they're "too sensitive" or that an incident "wasn't about race"</li>
          <li><strong>Racial gaslighting</strong>: Being made to doubt your perception of racism, leading to self-blame</li>
          <li><strong>Provider bias</strong>: Mental health professionals may lack training in recognizing race-based trauma</li>
          <li><strong>Cultural mistrust</strong>: Survivors of racial trauma may avoid predominantly white mental health systems due to justified mistrust</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>
            If a therapist dismisses, minimizes, or denies your experiences of racism, it is appropriate to seek a different provider. Healing from racial trauma requires a clinician who validates your reality and understands the systemic nature of racism.
          </p>
        </ArticleCallout>

        <h2 id="healing-from-racial-trauma" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Pathways to Healing
        </h2>
        <p className="mb-6">
          Recovery from racial trauma is possible, though it often requires both individual healing and collective action <Citation id="8" index={8} source="Journal of Multicultural Counseling and Development" year="2020" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Name the Harm',
              description: (
                <p>
                  Validate that what happened to you was real, wrong, and harmful. Journaling, speaking with trusted friends, or joining a support group for people of color can help you process and externalize the trauma rather than internalizing it.
                </p>
              ),
            },
            {
              title: 'Seek Culturally Responsive Care',
              description: (
                <p>
                  Look for therapists who specialize in racial trauma, use frameworks like Racial Trauma-Focused CBT, and share your racial or cultural background when possible. Organizations like Therapy for Black Girls, Latinx Therapy, and the Asian Mental Health Collective can help you find culturally affirming providers.
                </p>
              ),
            },
            {
              title: 'Build Community',
              description: (
                <p>
                  Connection with others who share your experience can reduce isolation and restore a sense of safety. Cultural affinity groups, racial justice organizations, and spaces centered on people of color provide both validation and collective resistance.
                </p>
              ),
            },
            {
              title: 'Engage in Collective Action',
              description: (
                <p>
                  Many survivors find that participating in racial justice work---organizing, protesting, educating---helps transform pain into purpose. This doesn\'t mean you must become an activist, but engaging in meaningful action can restore a sense of agency.
                </p>
              ),
            },
            {
              title: 'Practice Restorative Self-Care',
              description: (
                <p>
                  Prioritize rest, joy, and activities that reconnect you to cultural heritage and identity. Engage in practices that honor your body\'s need to recover from hypervigilance---somatic therapies, yoga, breathwork, and time in nature can all support nervous system regulation.
                </p>
              ),
            },
          ]}
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Support
        </h2>
        <p className="mb-6">
          Consider reaching out to a mental health professional if racial trauma is:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Interfering with daily functioning (work, relationships, sleep)</li>
          <li>Causing intrusive thoughts, flashbacks, or nightmares</li>
          <li>Leading to substance use or other harmful coping behaviors</li>
          <li>Producing physical symptoms (chronic pain, digestive issues, headaches)</li>
          <li>Leaving you feeling hopeless, numb, or disconnected from life</li>
        </ul>

        <ArticleCallout variant="info" title="Finding Culturally Responsive Therapy">
          <p><strong>Directories for finding therapists specializing in racial trauma:</strong></p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Therapy for Black Girls (therapyforblackgirls.com)</li>
            <li>Latinx Therapy (latinxtherapy.com)</li>
            <li>Asian Mental Health Collective (asianmentalhealthcollective.com)</li>
            <li>National Queer and Trans Therapists of Color Network (nqttcn.com)</li>
            <li>Inclusive Therapists (inclusivetherapists.com)</li>
          </ul>
        </ArticleCallout>
      </>
    ),
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Article 22: Mental Health Disparities
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: catId(22),
    slug: 'mental-health-disparities-people-of-color-care-access',
    status: 'published',
    title: 'Mental Health Disparities: Why People of Color Receive Less and Worse Care',
    description: 'Explore the systemic barriers that prevent people of color from accessing quality mental health care, from insurance gaps to provider bias.',
    image: "/images/articles/cat12/cover-022.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Health Disparities', 'Systemic Racism', 'Access to Care', 'Provider Bias', 'Mental Health Equity'],
    summary: 'People of color face profound mental health care disparities: they are less likely to receive treatment, more likely to receive lower-quality care, and often encounter provider bias in clinical settings. These gaps stem from structural barriers including insurance inequities, provider shortages, language barriers, cultural incompetence, and justified mistrust of healthcare systems rooted in historical medical racism.',
    keyFacts: [
      { text: 'Black adults are 50% less likely to receive mental health treatment than white adults with the same condition', citationIndex: 1 },
      { text: 'Only 4% of psychologists and 2% of psychiatrists are Black, despite Black Americans comprising 13% of the population', citationIndex: 5 },
      { text: 'Hispanic/Latino adults are nearly 3 times more likely to be uninsured than white adults, creating financial barriers to care', citationIndex: 8 },
      { text: 'Black patients are more likely to be misdiagnosed with schizophrenia and receive coercive interventions like involuntary hospitalization', citationIndex: 3 },
      { text: 'Nearly 20 million Americans have limited English proficiency, yet mental health services in non-English languages are scarce', citationIndex: 7 },
    ],
    sparkMoment: 'Mental health disparities are not about individual choices—they are the result of structural barriers embedded in healthcare systems that can and must be dismantled.',
    practicalExercise: {
      title: 'Advocating for Your Mental Health Needs',
      steps: [
        { title: 'Know Your Rights', description: 'You have the right to culturally competent care, to be treated with respect, and to request a different provider if you feel dismissed or discriminated against.' },
        { title: 'Prepare Questions', description: 'Before meeting a new provider, write down questions about their experience with your community, their approach to racism, and their cultural competence training.' },
        { title: 'Document Your Experience', description: 'Keep notes on appointments, including how you felt heard, any dismissive comments, and quality of care. This helps you assess whether to continue or seek a new provider.' },
        { title: 'Build Your Support Network', description: 'Connect with community organizations, cultural centers, or faith groups that can provide referrals to culturally responsive providers in your area.' },
      ],
      toolLink: '/find-care',
      toolLabel: 'Find a Provider',
    },
    citations: [
      {
        id: '1',
        text: 'Mental Health Care Disparities Among Racial/Ethnic Minorities',
        source: 'Substance Abuse and Mental Health Services Administration',
        year: '2021',
        link: 'https://www.samhsa.gov/data/report/mental-health-care-disparities',
        tier: 2,
      },
      {
        id: '2',
        text: 'Racial/ethnic differences in mental health service use among adults',
        source: 'Health Affairs',
        year: '2020',
        link: 'https://doi.org/10.1377/hlthaff.2020.00757',
        tier: 1,
      },
      {
        id: '3',
        text: 'Implicit racial bias in healthcare: Clinical practice, research and decision making',
        source: 'Future Healthcare Journal',
        year: '2019',
        link: 'https://doi.org/10.7861/futurehosp.6-1-17',
        tier: 1,
      },
      {
        id: '4',
        text: 'Structural racism and health inequities: Recommendations for health and human services',
        source: 'National Academies of Sciences, Engineering, and Medicine',
        year: '2023',
        link: 'https://doi.org/10.17226/26593',
        tier: 2,
      },
      {
        id: '5',
        text: 'The mental health workforce shortage: Causes, consequences, and solutions',
        source: 'American Psychological Association',
        year: '2022',
        link: 'https://www.apa.org/monitor/2022/07/mental-health-workforce-shortage',
        tier: 3,
      },
      {
        id: '6',
        text: 'Cultural mistrust and mental health service utilization among Black Americans',
        source: 'Journal of Community Psychology',
        year: '2018',
        link: 'https://doi.org/10.1002/jcop.22045',
        tier: 1,
      },
      {
        id: '7',
        text: 'Language barriers and access to mental health services',
        source: 'Psychiatric Services',
        year: '2017',
        link: 'https://doi.org/10.1176/appi.ps.201600263',
        tier: 1,
      },
      {
        id: '8',
        text: 'Insurance coverage and mental health service utilization among racial/ethnic minorities',
        source: 'JAMA Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1001/jamapsychiatry.2019.2857',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Mental health conditions do not discriminate---depression, anxiety, PTSD, and other disorders affect people across all racial and ethnic groups. But access to quality mental health care is far from equal. People of color are less likely to receive treatment, more likely to receive lower-quality care, and more likely to face discrimination in clinical settings.
          </p>
          <p className="mb-6">
            These disparities are not the result of individual choices or cultural preferences. They stem from structural barriers embedded in healthcare systems, economic inequities, provider bias, and the ongoing effects of racism <Citation id="4" index={4} source="National Academies" year="2023" tier={2} />. Understanding why these gaps exist is the first step toward closing them.
          </p>
        </div>

        <h2 id="the-treatment-gap" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Treatment Gap: Who Gets Care and Who Doesn\'t
        </h2>
        <p className="mb-6">
          Despite similar or higher rates of mental health conditions, people of color are significantly less likely to receive mental health services than white Americans <Citation id="1" index={1} source="SAMHSA" year="2021" tier={2} />:
        </p>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Lower rate of mental health treatment for Black adults vs. white adults with depression' },
            { value: 36, suffix: '%', label: 'Of Hispanic adults with mental illness who receive treatment (vs. 52% of white adults)' },
            { value: 25, suffix: '%', label: 'Of Asian Americans with mental health conditions who seek professional help' },
          ]}
          source="SAMHSA Mental Health Disparities Report, 2021; Health Affairs, 2020"
        />

        <p className="mb-6 mt-6">
          When people of color do access care, they often receive lower-quality treatment: shorter sessions, less evidence-based therapy, higher rates of misdiagnosis, and more coercive interventions like involuntary hospitalization <Citation id="2" index={2} source="Health Affairs" year="2020" tier={1} />.
        </p>

        <h2 id="barriers-to-access" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Structural Barriers to Mental Health Care
        </h2>
        <p className="mb-6">
          Mental health disparities are the result of layered, systemic obstacles <Citation id="4" index={4} source="National Academies" year="2023" tier={2} />:
        </p>

        <ArticleChart
          type="bar"
          title="Barriers to Mental Health Care for People of Color"
          data={[
            { label: 'Lack of insurance or underinsurance', value: 68 },
            { label: 'Cost of care (copays, deductibles)', value: 62 },
            { label: 'No providers in area who accept insurance', value: 54 },
            { label: 'Language barriers', value: 47 },
            { label: 'Lack of culturally responsive providers', value: 45 },
            { label: 'Mistrust of healthcare system', value: 41 },
            { label: 'Fear of discrimination or bias', value: 38 },
            { label: 'Stigma within community', value: 35 },
          ]}
          source="SAMHSA National Survey, 2021"
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Economic and Insurance Barriers
        </h3>
        <p className="mb-6">
          People of color are disproportionately uninsured or underinsured, making mental health care financially out of reach <Citation id="8" index={8} source="JAMA Psychiatry" year="2019" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Hispanic/Latino adults are nearly 3 times more likely to be uninsured than white adults</li>
          <li>Even with insurance, high deductibles and copays create barriers (therapy sessions often cost $100--$250 per session)</li>
          <li>Medicaid covers fewer providers, leading to long wait times or inaccessible care for low-income individuals</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. Provider Shortages and Geographic Deserts
        </h3>
        <p className="mb-6">
          Communities of color---particularly rural and low-income areas---face severe shortages of mental health providers <Citation id="5" index={5} source="APA" year="2022" tier={3} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Only 4% of psychologists, 2% of psychiatrists, and 5% of social workers are Black, despite Black Americans making up 13% of the population</li>
          <li>Providers of color are more likely to work in underserved areas but are overwhelmed by demand</li>
          <li>Telehealth has expanded access but still requires internet, devices, and privacy---barriers for low-income households</li>
        </ul>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Language Barriers
        </h3>
        <p className="mb-6">
          Nearly 20 million people in the U.S. have limited English proficiency, yet mental health services in languages other than English are scarce <Citation id="7" index={7} source="Psychiatric Services" year="2017" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Using untrained interpreters (including family members) leads to miscommunication and compromised confidentiality</li>
          <li>Mental health concepts often don't translate directly, leading to misdiagnosis</li>
          <li>Shame or stigma may prevent patients from disclosing symptoms through interpreters</li>
        </ul>

        <h2 id="provider-bias" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Provider Bias and Discrimination in Clinical Care
        </h2>
        <p className="mb-6">
          Even when people of color access care, they often encounter bias---both implicit and explicit---from healthcare providers <Citation id="3" index={3} source="Future Healthcare Journal" year="2019" tier={1} />:
        </p>

        <ComparisonTable
          title="How Provider Bias Shows Up in Mental Health Care"
          columns={['Type of Bias', 'How It Manifests', 'Impact on Care']}
          items={[
            {
              feature: 'Diagnostic Bias',
              values: [
                'Black patients more likely to be diagnosed with schizophrenia; less likely to be diagnosed with mood disorders',
                'Misdiagnosis leads to inappropriate treatment (antipsychotics vs. therapy); perpetuates stereotypes',
              ],
            },
            {
              feature: 'Pain and Symptom Dismissal',
              values: [
                'Providers underestimate pain and emotional distress in Black and Hispanic patients',
                'Leads to under-treatment; patients feel invalidated and may not return',
              ],
            },
            {
              feature: 'Cultural Incompetence',
              values: [
                'Providers lack understanding of cultural expressions of distress (e.g., somatization)',
                "Symptoms dismissed as 'just cultural'; patients labeled non-compliant if they prefer traditional healing",
              ],
            },
            {
              feature: 'Coercive Treatment',
              values: [
                'Black patients more likely to be involuntarily hospitalized or restrained',
                'Increases trauma; deepens mistrust of mental health system',
              ],
            },
          ]}
          highlightColumn={0}
        />

        <ArticleCallout variant="clinical-note" title="The Legacy of Racism in Psychiatry">
          <p>
            Psychiatry has a deeply troubling history: enslaved Africans who fled captivity were diagnosed with "drapetomania" (a supposed mental illness causing the "irrational" desire for freedom). Black Americans were used in unethical medical experiments. Homosexuality was classified as a mental disorder until 1973. These harms are not ancient history---they shape present-day mistrust and must be acknowledged by providers committed to equity.
          </p>
        </ArticleCallout>

        <h2 id="cultural-mistrust" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cultural Mistrust: A Rational Response
        </h2>
        <p className="mb-6">
          Many people of color avoid mental health care not due to lack of need or cultural stigma, but due to justified mistrust of systems that have historically harmed them <Citation id="6" index={6} source="Journal of Community Psychology" year="2018" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Historical trauma</strong>: Tuskegee Syphilis Study, forced sterilization, and other medical abuses create intergenerational mistrust</li>
          <li><strong>Current discrimination</strong>: Experiences of bias in healthcare settings reinforce the belief that providers will not listen or care</li>
          <li><strong>Pathologization of culture</strong>: Fear that cultural practices, religious beliefs, or community values will be labeled as "abnormal"</li>
          <li><strong>Consequences of diagnosis</strong>: Concern that mental health diagnoses could be used against them (custody battles, immigration cases, employment)</li>
        </ul>

        <h2 id="closing-the-gap" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Needs to Change
        </h2>
        <p className="mb-6">
          Closing mental health disparities requires systemic change at every level:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Increase diversity in the mental health workforce</strong>: Recruit, train, and retain providers of color</li>
          <li><strong>Mandate cultural competence training</strong>: All providers must receive ongoing education on racism, implicit bias, and culturally responsive care</li>
          <li><strong>Expand insurance coverage and reduce costs</strong>: Universal coverage, elimination of copays for mental health, and parity enforcement</li>
          <li><strong>Address social determinants of health</strong>: Housing, employment, education, and safety directly impact mental health and must be part of the solution</li>
          <li><strong>Center community-based models</strong>: Invest in culturally specific organizations, peer support, and traditional healing alongside clinical care</li>
        </ul>

        <ArticleCallout variant="info" title="Finding Culturally Responsive Care">
          <p>
            While the system has deep flaws, you deserve care that honors your full identity. Seek providers who share your background, ask about their training in cultural humility, and trust your instincts---if a provider dismisses your experiences of racism or cultural context, it\'s okay to find someone else.
          </p>
        </ArticleCallout>
      </>
    ),
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Article 23: Microaggressions
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: catId(23),
    slug: 'microaggressions-mental-health-cumulative-toll-everyday-racism',
    status: 'published',
    title: 'Microaggressions and Mental Health: The Cumulative Toll of Everyday Racism',
    description: 'Understand how "small" daily indignities add up to serious psychological harm, and how to cope when racism shows up in subtle forms.',
    image: "/images/articles/cat12/cover-023.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Microaggressions', 'Racism', 'Mental Health Impact', 'Workplace Bias', 'Coping Strategies'],
    summary: 'Racial microaggressions—brief, everyday slights that communicate hostile messages based on race—may seem small individually, but their cumulative effect produces chronic stress, depression, anxiety, and even PTSD symptoms. This article explores what microaggressions are, why they cause serious psychological harm despite being "subtle," and evidence-based strategies for coping and responding.',
    keyFacts: [
      { text: 'Frequent microaggressions increase depression symptoms by 45% and double the risk of anxiety disorders', citationIndex: 2 },
      { text: 'Cumulative exposure to racial microaggressions can produce PTSD symptoms similar to major traumatic events', citationIndex: 3 },
      { text: '63% of people of color report that microaggressions cause significant psychological distress in their daily lives', citationIndex: 4 },
      { text: 'Women of color experience compounded microaggressions at the intersection of race and gender', citationIndex: 6 },
      { text: 'The ambiguity of microaggressions creates a "catch-22": staying silent causes emotional burden, but speaking up risks being labeled "too sensitive"', citationIndex: 1 },
    ],
    sparkMoment: 'Microaggressions are not "micro" in their impact—they are death by a thousand cuts, and the harm is real, measurable, and deserving of validation.',
    practicalExercise: {
      title: 'Microaggression Processing and Boundary-Setting',
      steps: [
        { title: 'Validate Your Experience', description: 'Write down what happened and how it made you feel. Trust yourself—if it felt racist, it likely was. You don\'t need external validation to know harm occurred.' },
        { title: 'Name the Pattern', description: 'Reflect on whether this is an isolated incident or part of a recurring pattern from this person or environment. Recognizing patterns helps you see it\'s not "just you."' },
        { title: 'Decide Your Response', description: 'Ask yourself: Do I have the energy to respond? Will it be safe? Is this person open to feedback? Remember, you are not obligated to educate every person who harms you.' },
        { title: 'Process With Community', description: 'Share your experience with a trusted friend, therapist, or affinity group who understands. Carrying these experiences alone increases the harm—validation from others who "get it" is healing.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Journal Your Experience',
    },
    citations: [
      {
        id: '1',
        text: 'Racial microaggressions in everyday life: Implications for clinical practice',
        source: 'American Psychologist',
        year: '2007',
        link: 'https://doi.org/10.1037/0003-066X.62.4.271',
        tier: 1,
      },
      {
        id: '2',
        text: 'The impact of racial microaggressions on mental health: Counseling implications for clients of color',
        source: 'Journal of Counseling & Development',
        year: '2011',
        link: 'https://doi.org/10.1002/j.1556-6678.2011.tb00105.x',
        tier: 1,
      },
      {
        id: '3',
        text: 'Cumulative trauma from racial microaggressions predicts PTSD symptoms',
        source: 'Traumatology',
        year: '2015',
        link: 'https://doi.org/10.1037/trm0000045',
        tier: 1,
      },
      {
        id: '4',
        text: 'Racial microaggressions and psychological functioning among Black American men',
        source: 'Cultural Diversity and Ethnic Minority Psychology',
        year: '2017',
        link: 'https://doi.org/10.1037/cdp0000138',
        tier: 1,
      },
      {
        id: '5',
        text: 'Microaggressions in the workplace: What targets and observers can do',
        source: 'Harvard Business Review',
        year: '2020',
        link: 'https://hbr.org/2020/07/what-to-do-when-you-experience-a-microaggression',
        tier: 5,
      },
      {
        id: '6',
        text: 'Gender microaggressions and the mental health of women of color',
        source: 'Psychology of Women Quarterly',
        year: '2016',
        link: 'https://doi.org/10.1177/0361684316654529',
        tier: 1,
      },
      {
        id: '7',
        text: 'Coping with racial microaggressions: Assimilation and confrontation strategies',
        source: 'Journal of Diversity in Higher Education',
        year: '2019',
        link: 'https://doi.org/10.1037/dhe0000094',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            A coworker touches your hair without asking. Someone asks "where are you really from?" You\'re followed around a store. A professor assumes you\'re in the class on an athletic scholarship. Your name is mispronounced---again---and you\'re told "Can I just call you something easier?"
          </p>
          <p className="mb-6">
            These incidents may seem small. The person who said it might claim they "didn't mean anything by it." But these everyday slights---called racial microaggressions---are not harmless <Citation id="1" index={1} source="American Psychologist" year="2007" tier={1} />. When they happen repeatedly, they accumulate into chronic stress that damages mental health in measurable ways.
          </p>
        </div>

        <h2 id="what-are-microaggressions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Are Racial Microaggressions?
        </h2>
        <p className="mb-6">
          Racial microaggressions are brief, everyday exchanges that communicate hostile, derogatory, or negative messages to people of color based on their race or ethnicity <Citation id="1" index={1} source="American Psychologist" year="2007" tier={1} />. They are often unintentional and may even be delivered by well-meaning people, but they still cause harm.
        </p>
        <p className="mb-6">
          Dr. Derald Wing Sue identified three main types:
        </p>

        <ComparisonTable
          title="Types of Racial Microaggressions"
          columns={['Type', 'Definition', 'Examples']}
          items={[
            {
              feature: 'Microassaults',
              values: [
                'Explicit racial derogations; conscious and intentional',
                'Using racial slurs, displaying Confederate flags, deliberately avoiding someone based on race',
              ],
            },
            {
              feature: 'Microinsults',
              values: [
                "Subtle snubs that demean a person\'s racial heritage or identity",
                `You\'re so articulate" (implying surprise); "I don\'t see color"; clutching purse when a Black person enters elevator`,
              ],
            },
            {
              feature: 'Microinvalidations',
              values: [
                'Communications that negate or nullify the experiences of people of color',
                `Racism doesn\'t exist anymore"; "You\'re being too sensitive"; "I have Black friends, so I can\'t be racist`,
              ],
            },
          ]}
          highlightColumn={0}
        />

        <h2 id="common-microaggressions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Microaggressions and What They Communicate
        </h2>
        <p className="mb-6">
          Microaggressions often carry hidden messages about belonging, competence, and worth:
        </p>

        <BeforeAfter
          before={{
            title: 'What Is Said',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>"Where are you really from?"</li>
                <li>"You're so well-spoken."</li>
                <li>"Can I touch your hair?"</li>
                <li>"You don't act like other [racial group]."</li>
                <li>"I don't see color."</li>
                <li>"Everyone has an equal chance if they work hard."</li>
                <li>Being confused with another person of the same race</li>
                <li>"You must be good at math/sports/dancing."</li>
              </ul>
            ),
          }}
          after={{
            title: 'Hidden Message Received',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>You are a perpetual foreigner; you don't belong here</li>
                <li>People of your race are usually inarticulate</li>
                <li>Your body is not your own; you are exotic and other</li>
                <li>Your race is deficient; you're an exception</li>
                <li>Your racial experience doesn't matter</li>
                <li>Racism doesn't exist; your struggles are your fault</li>
                <li>All people of your race look the same</li>
                <li>You are reducible to racial stereotypes</li>
              </ul>
            ),
          }}
        />

        <h2 id="mental-health-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Cumulative Mental Health Toll
        </h2>
        <p className="mb-6">
          Research shows that racial microaggressions are not "micro" in their impact <Citation id="2" index={2} source="Journal of Counseling & Development" year="2011" tier={1} />. Their cumulative effect produces:
        </p>

        <StatCard
          stats={[
            { value: 45, suffix: '%', label: 'Increase in depression symptoms from frequent microaggressions' },
            { value: 2, suffix: 'x', label: 'Higher risk of anxiety disorders for those experiencing daily microaggressions' },
            { value: 63, suffix: '%', label: 'Of people of color report microaggressions cause significant psychological distress' },
          ]}
          source="Traumatology, 2015; Cultural Diversity and Ethnic Minority Psychology, 2017"
        />

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Psychological Consequences
        </h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Chronic stress</strong>: Constant vigilance about when the next incident will occur <Citation id="3" index={3} source="Traumatology" year="2015" tier={1} /></li>
          <li><strong>Self-doubt and rumination</strong>: "Did that really happen? Am I overreacting? Should I say something?"</li>
          <li><strong>Anger and frustration</strong>: Feeling invalidated and powerless, especially when others deny the harm</li>
          <li><strong>Emotional exhaustion</strong>: The mental labor of deciding whether and how to respond drains energy</li>
          <li><strong>Imposter syndrome</strong>: Internalizing messages that you don't belong or aren't qualified</li>
          <li><strong>Physical health effects</strong>: Headaches, sleep disturbances, elevated blood pressure from chronic stress</li>
        </ul>

        <ArticleCallout variant="clinical-note" title="Microaggressions and Trauma">
          <p>
            Studies show that cumulative exposure to racial microaggressions can produce PTSD symptoms similar to those from major traumatic events <Citation id="3" index={3} source="Traumatology" year="2015" tier={1} />. This is especially true when microaggressions are frequent, dismissed by others, and occur in settings where the person has little power to respond (e.g., workplace, healthcare).
          </p>
        </ArticleCallout>

        <h2 id="why-they-hurt" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why "Small" Incidents Cause Big Harm
        </h2>
        <p className="mb-6">
          There are several reasons microaggressions are uniquely harmful:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Ambiguity</strong>: It's often unclear whether the comment was intentionally racist, leaving the target to question their perception</li>
          <li><strong>Catch-22 of responding</strong>: If you say nothing, you carry the emotional burden; if you speak up, you risk being labeled "angry,", "difficult," or "too sensitive"</li>
          <li><strong>Invalidation</strong>: When others deny the harm ("They didn't mean it that way"), it compounds the injury by making you doubt your reality</li>
          <li><strong>Frequency</strong>: It's not one incident---it's multiple incidents per day, every day, over a lifetime</li>
          <li><strong>Powerlessness</strong>: Microaggressions often occur in contexts where speaking up could jeopardize your job, grade, or safety</li>
        </ul>

        <h2 id="intersectionality" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Microaggressions and Intersectionality
        </h2>
        <p className="mb-6">
          People with multiple marginalized identities experience compounded microaggressions <Citation id="6" index={6} source="Psychology of Women Quarterly" year="2016" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Women of color</strong>: Face both racial and gender microaggressions (e.g., being mistaken for administrative staff when you're the doctor)</li>
          <li><strong>LGBTQ+ people of color</strong>: Experience racism within LGBTQ+ spaces and homophobia/transphobia within racial communities</li>
          <li><strong>People with disabilities</strong>: Face ableism compounded by racial bias (e.g., assumptions about intellectual capacity)</li>
          <li><strong>People with non-Western names or accents</strong>: Experience xenophobia alongside racial bias</li>
        </ul>

        <h2 id="coping-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Coping with Microaggressions
        </h2>
        <p className="mb-6">
          There is no "right" way to respond to microaggressions. Your response may vary depending on context, power dynamics, safety, and energy <Citation id="7" index={7} source="Journal of Diversity in Higher Education" year="2019" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Validate Your Experience',
              description: (
                <p>
                  Trust yourself. If something felt racist, it likely was---even if the other person didn\'t intend harm. You don\'t need external validation to know that what happened was hurtful.
                </p>
              ),
            },
            {
              title: 'Decide Whether to Respond',
              description: (
                <p>
                  You are not obligated to educate others or call out every microaggression. Consider: Is this person open to feedback? Do I have the energy? Will responding put me at risk? Sometimes silence is self-preservation, not complicity.
                </p>
              ),
            },
            {
              title: 'If You Choose to Respond',
              description: (
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Ask for clarification</strong>: "What did you mean by that?"</li>
                  <li><strong>Name the impact</strong>: "When you said X, it made me feel like Y"</li>
                  <li><strong>Redirect</strong>: "I'd prefer if you called me by my actual name"</li>
                  <li><strong>Educate (if you choose)</strong>: "That comment is actually a common stereotype that's harmful because..."</li>
                </ul>
              ),
            },
            {
              title: 'Process and Release',
              description: (
                <p>
                  Talk to trusted friends, journal, or seek therapy to process the emotional toll. Carrying these experiences alone increases the harm. Community support---especially from others who share your racial identity---can be deeply healing.
                </p>
              ),
            },
            {
              title: 'Engage in Collective Action',
              description: (
                <p>
                  Some people find empowerment in organizing for policy changes (e.g., mandatory bias training at work), creating affinity groups, or participating in racial justice movements. This shifts the burden from individual coping to systemic change.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="tip" title="For Allies and Bystanders">
          <p>
            If you witness a microaggression, intervene if it\'s safe to do so. Interrupt the comment, redirect the conversation, or check in privately with the target afterward. Don\'t ask the target to explain or prove the harm---believe them. And do your own learning rather than expecting people of color to educate you.
          </p>
        </ArticleCallout>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Support
        </h2>
        <p className="mb-6">
          If microaggressions are causing persistent distress, consider reaching out to a therapist---ideally one who specializes in racial trauma and understands the reality of microaggressions. You deserve a space where your experiences are validated, not questioned.
        </p>
      </>
    ),
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Article 24: Cultural Competence in Therapy
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: catId(24),
    slug: 'cultural-competence-therapy-what-to-look-for-provider',
    status: 'published',
    title: 'Cultural Competence in Therapy: What to Look for in a Provider',
    description: `Find a therapist who truly understands your cultural background and won\'t dismiss racism, traditions, or community values as irrelevant to your mental health.`,
    image: '/images/articles/cat12/cover-024.svg',
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Cultural Competence', 'Finding a Therapist', 'Culturally Responsive Care', 'Therapy', 'Provider Selection'],
    summary: 'Cultural competence is the ability of a therapist to recognize, understand, and respectfully respond to the cultural factors that shape your identity and experiences. This article explains what culturally competent care looks like, how to identify red flags of cultural incompetence, and practical steps to find a provider who will validate your experiences of racism and honor your cultural values.',
    keyFacts: [
      { text: 'Culturally adapted therapy produces significantly better outcomes than generic, one-size-fits-all treatment approaches', citationIndex: 5 },
      { text: 'People of color drop out of therapy at higher rates when cultural mismatch occurs with their provider', citationIndex: 6 },
      { text: 'Racial and ethnic match between therapist and patient predicts better retention and treatment outcomes', citationIndex: 6 },
      { text: 'Cultural humility—approaching each client as the expert on their own culture—is as important as cultural knowledge', citationIndex: 3 },
      { text: 'A strong therapeutic alliance rooted in cultural competence directly predicts positive mental health outcomes', citationIndex: 4 },
    ],
    sparkMoment: 'You deserve a therapist who doesn\'t erase your identity—who understands that your race, culture, and experiences of racism are integral to your mental health, not separate from it.',
    practicalExercise: {
      title: 'Vetting a Potential Therapist for Cultural Competence',
      steps: [
        { title: 'Prepare Your Questions', description: 'Before your first session, write down 3-5 questions about their experience with your community, their training in cultural competence, and how they approach discussions of racism.' },
        { title: 'Assess Their Response', description: 'During the consultation, notice: Do they seem comfortable or defensive? Do they give specific examples or vague generalities? Do they acknowledge systemic racism or minimize it?' },
        { title: 'Trust Your Gut', description: 'If the therapist dismisses your concerns, says "I don\'t see color," or seems uncomfortable discussing race, trust your instincts—this is not the right provider for you.' },
        { title: 'Follow Up', description: 'If they pass the initial assessment, give it 2-3 sessions. If you continue to feel misunderstood or invalidated, it\'s okay to move on. You deserve culturally affirming care.' },
      ],
      toolLink: '/find-care',
      toolLabel: 'Search for Providers',
    },
    citations: [
      {
        id: '1',
        text: 'Multicultural Guidelines: An Ecological Approach to Context, Identity, and Intersectionality',
        source: 'American Psychological Association',
        year: '2017',
        link: 'https://www.apa.org/about/policy/multicultural-guidelines',
        tier: 3,
      },
      {
        id: '2',
        text: 'Cultural competence in clinical psychology: Moving from assessment to practice',
        source: 'Clinical Psychology: Science and Practice',
        year: '2018',
        link: 'https://doi.org/10.1111/cpsp.12251',
        tier: 1,
      },
      {
        id: '3',
        text: 'Therapist cultural humility: Measuring openness and flexibility in cross-cultural clinical work',
        source: 'Psychotherapy Research',
        year: '2016',
        link: 'https://doi.org/10.1080/10503307.2015.1015430',
        tier: 1,
      },
      {
        id: '4',
        text: 'The therapeutic alliance in multicultural therapy: Linking cultural competence to positive outcomes',
        source: 'Journal of Counseling Psychology',
        year: '2019',
        link: 'https://doi.org/10.1037/cou0000347',
        tier: 1,
      },
      {
        id: '5',
        text: 'Culturally adapted psychotherapy and the legitimacy of myth: A direct-comparison meta-analysis',
        source: 'Journal of Consulting and Clinical Psychology',
        year: '2015',
        link: 'https://doi.org/10.1037/a0038950',
        tier: 1,
      },
      {
        id: '6',
        text: 'Racial and ethnic match between therapist and patient predicts retention',
        source: 'JAMA Psychiatry',
        year: '2018',
        link: 'https://doi.org/10.1001/jamapsychiatry.2018.0317',
        tier: 1,
      },
      {
        id: '7',
        text: 'What to Look for in a Culturally Competent Therapist',
        source: 'National Alliance on Mental Illness',
        year: '2022',
        link: 'https://www.nami.org/Blogs/NAMI-Blog/April-2022/What-to-Look-for-in-a-Culturally-Competent-Therapist',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            You\'re sitting across from a therapist, trying to explain what it\'s like to navigate the world in your skin. You mention racism, family expectations rooted in your culture, or spiritual beliefs that shape how you see mental health. The therapist looks uncomfortable, changes the subject, or says, "Let\'s not focus on race---let\'s talk about you as an individual."
          </p>
          <p className="mb-6">
            This is a failure of cultural competence <Citation id="1" index={1} source="APA" year="2017" tier={3} />. A culturally competent therapist doesn't erase your identity---they center it. They understand that your race, ethnicity, immigration status, language, and cultural values are not separate from your mental health; they are integral to it.
          </p>
        </div>

        <h2 id="what-is-cultural-competence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Cultural Competence in Therapy?
        </h2>
        <p className="mb-6">
          Cultural competence is the ability of a therapist to recognize, understand, and respectfully respond to the cultural factors that shape a client's identity and experiences <Citation id="2" index={2} source="Clinical Psychology: Science and Practice" year="2018" tier={1} />. This includes:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Awareness</strong>: Recognizing their own cultural biases and how power, privilege, and oppression shape the therapeutic relationship</li>
          <li><strong>Knowledge</strong>: Understanding the histories, values, and worldviews of different cultural groups</li>
          <li><strong>Skills</strong>: Using culturally responsive interventions and adapting treatment to align with clients" cultural contexts</li>
          <li><strong>Humility</strong>: Approaching each client as the expert on their own culture, remaining open to learning, and acknowledging when they don't know something <Citation id="3" index={3} source="Psychotherapy Research" year="2016" tier={1} /></li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>
            Research shows that culturally adapted therapy---treatment tailored to cultural values, language, and context---produces better outcomes than generic, one-size-fits-all approaches <Citation id="5" index={5} source="Journal of Consulting and Clinical Psychology" year="2015" tier={1} />. Cultural competence isn't just "nice to have"---it directly improves treatment effectiveness.
          </p>
        </ArticleCallout>

        <h2 id="why-it-matters" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Cultural Competence Matters
        </h2>
        <p className="mb-6">
          When therapists lack cultural competence, real harm occurs:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Misdiagnosis</strong>: Symptoms are misinterpreted because the therapist doesn't understand cultural expressions of distress (e.g., somatization in some Asian cultures)</li>
          <li><strong>Invalidation</strong>: Experiences of racism, discrimination, or cultural stress are minimized or dismissed</li>
          <li><strong>Pathologization</strong>: Cultural practices, family structures, or spiritual beliefs are labeled as "dysfunctional"</li>
          <li><strong>Dropout</strong>: Clients don't return when they feel misunderstood or disrespected---people of color drop out of therapy at higher rates when cultural mismatch occurs <Citation id="6" index={6} source="JAMA Psychiatry" year="2018" tier={1} /></li>
        </ul>

        <h2 id="red-flags" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Red Flags: Signs of Cultural Incompetence
        </h2>
        <p className="mb-6">
          Trust your instincts. If a therapist does any of the following, consider finding someone else:
        </p>

        <BeforeAfter
          before={{
            title: 'Culturally Incompetent Therapist',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Says "I don't see color' or "We're all just human"</li>
                <li>Dismisses your experiences of racism as "perception"</li>
                <li>Assumes your family is dysfunctional because it doesn't match Western norms (e.g., living with extended family, emphasis on collectivism)</li>
                <li>Pathologizes cultural or spiritual practices (e.g., consulting elders, using traditional healing)</li>
                <li>Interrupts or talks over you when you discuss race or culture</li>
                <li>Becomes defensive if you point out a cultural misunderstanding</li>
                <li>Asks invasive "educate me" questions about your culture instead of doing their own homework</li>
              </ul>
            ),
          }}
          after={{
            title: 'Culturally Competent Therapist',
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Acknowledges that race and culture shape your experiences</li>
                <li>Validates the reality of racism and its impact on mental health</li>
                <li>Respects family structures and cultural values, even if they differ from Western individualism</li>
                <li>Is curious about your spiritual and cultural practices and how to integrate them into treatment</li>
                <li>Makes space for you to discuss race and culture without discomfort</li>
                <li>Accepts feedback gracefully and commits to learning</li>
                <li>Does their own learning about your culture rather than expecting you to teach them</li>
              </ul>
            ),
          }}
        />

        <h2 id="what-to-ask" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Questions to Ask When Choosing a Therapist
        </h2>
        <p className="mb-6">
          During an initial consultation or first session, these questions can help you assess cultural competence <Citation id="7" index={7} source="NAMI" year="2022" tier={3} />:
        </p>

        <ComparisonTable
          title="Cultural Competence Interview Questions"
          columns={['Question', "What You\'re Assessing", 'Green Flag Response']}
          items={[
            {
              feature: 'Have you worked with clients from my cultural background?',
              values: [
                'Experience with your specific community',
                `Honest answer ('yes' with examples, or "no, but I\'m committed to learning"); avoids generalizations`,
              ],
            },
            {
              feature: 'What training have you had in cultural competence?',
              values: [
                "Whether they\'ve invested in ongoing education",
                "Names specific courses, workshops, or certifications (not just 'I took a class once in grad school')",
              ],
            },
            {
              feature: 'How do you approach discussions of racism in therapy?',
              values: [
                'Comfort and skill in addressing racial trauma',
                "Racism is real, harmful, and central to many clients' mental health. I make space for that.",
              ],
            },
            {
              feature: 'Do you work with interpreters or offer therapy in [your language]?',
              values: [
                'Accessibility for non-English speakers',
                'Yes, and explains how they ensure confidentiality and accuracy in interpretation',
              ],
            },
            {
              feature: 'How do you integrate cultural values into treatment?',
              values: [
                'Flexibility and cultural adaptation',
                'Gives specific examples (e.g., involving family in therapy for collectivist cultures, incorporating spirituality)',
              ],
            },
          ]}
          highlightColumn={0}
        />

        <h2 id="finding-a-provider" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Find a Culturally Competent Therapist
        </h2>
        <p className="mb-6">
          Finding the right therapist takes effort, but these strategies can help:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Use Culturally Specific Directories',
              description: (
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Therapy for Black Girls</strong>: therapyforblackgirls.com</li>
                  <li><strong>Latinx Therapy</strong>: latinxtherapy.com</li>
                  <li><strong>Asian Mental Health Collective</strong>: asianmentalhealthcollective.com</li>
                  <li><strong>National Queer and Trans Therapists of Color Network</strong>: nqttcn.com</li>
                  <li><strong>Inclusive Therapists</strong>: inclusivetherapists.com</li>
                </ul>
              ),
            },
            {
              title: 'Search by Identity on General Platforms',
              description: (
                <p>
                  Platforms like Psychology Today, Zencare, and Open Path allow you to filter by therapist race, ethnicity, languages spoken, and specialties (e.g., racial trauma, immigration stress).
                </p>
              ),
            },
            {
              title: 'Ask for Referrals',
              description: (
                <p>
                  Reach out to community organizations, cultural centers, or faith communities for recommendations. Word-of-mouth referrals from people who share your background can lead you to providers who understand your context.
                </p>
              ),
            },
            {
              title: 'Consider Racial Concordance',
              description: (
                <p>
                  Research shows that racial and ethnic match between therapist and client improves retention and outcomes <Citation id="6" index={6} source="JAMA Psychiatry" year="2018" tier={1} />. While it's not essential---white therapists can be culturally competent---shared identity often reduces the burden of explaining your cultural context.
                </p>
              ),
            },
            {
              title: 'Trust Your Gut',
              description: (
                <p>
                  If a therapist feels dismissive, uncomfortable, or defensive when you bring up race and culture, it\'s okay to move on. You deserve a provider who makes you feel seen, respected, and understood.
                </p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="info" title="What If I Can't Find a Culturally Matched Provider?">
          <p>
            In areas with limited diversity in the mental health workforce, finding a provider who shares your background may not be possible. In this case, prioritize cultural humility: a therapist who is open, curious, willing to learn, and committed to understanding your unique cultural context. A humble white therapist who listens and validates can be far more effective than a provider of color who dismisses your concerns.
          </p>
        </ArticleCallout>

        <h2 id="your-rights" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Your Rights in Therapy
        </h2>
        <p className="mb-6">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Be treated with respect and dignity</li>
          <li>Have your cultural identity and experiences validated</li>
          <li>Discuss racism, discrimination, and cultural stress without judgment</li>
          <li>Request a different therapist if you don't feel understood</li>
          <li>Ask your therapist to learn more about your culture</li>
          <li>Expect that your spiritual beliefs, family values, and cultural practices will be honored---not pathologized</li>
        </ul>

        <p className="mb-6">
          Therapy should be a space of healing, not another site of harm. If your therapist cannot provide culturally competent care, you deserve to find someone who can.
        </p>
      </>
    ),
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Article 25: Black Mental Health
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: catId(25),
    slug: 'black-mental-health-breaking-silence-african-american-communities',
    title: 'Black Mental Health: Breaking the Silence in African American Communities',
    description: 'Understand the unique mental health challenges facing Black Americans, the historical roots of mistrust, and how to find culturally affirming support.',
    image: "/images/articles/cat12/cover-025.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Black Mental Health', 'African American Mental Health', 'Racial Trauma', 'Therapy', 'Community Healing'],
    summary: 'Black Americans experience mental health conditions at rates similar to or higher than the general population, yet they are far less likely to receive treatment due to systemic barriers, provider shortages, cultural mistrust rooted in medical racism, and stigma within communities. This article explores the unique stressors Black Americans face, the historical trauma that shapes justified mistrust, and pathways to culturally affirming mental health support.',
    keyFacts: [
      { text: 'Black adults are 50% less likely to receive mental health treatment than white adults, despite similar or higher rates of mental illness', citationIndex: 1 },
      { text: 'Only 4% of psychologists in the U.S. are Black, creating severe shortages of culturally matched providers', citationIndex: 2 },
      { text: 'Exposure to police killings of unarmed Black people increases poor mental health days for Black Americans in surrounding areas', citationIndex: 6 },
      { text: 'The "Strong Black Woman" schema—cultural pressure to be perpetually resilient—is linked to higher rates of depression when emotional pain is suppressed', citationIndex: 5 },
      { text: 'Black Americans\' mistrust of healthcare is not paranoia—it\'s a rational response to historical abuses like the Tuskegee Syphilis Study', citationIndex: 4 },
    ],
    sparkMoment: 'Seeking help is not weakness—it\'s courage, it\'s refusing to carry trauma alone, and it\'s choosing to heal so the next generation doesn\'t have to carry what you did.',
    practicalExercise: {
      title: 'Breaking the Silence: Starting Mental Health Conversations',
      steps: [
        { title: 'Identify a Trusted Person', description: 'Think of one person in your life—a friend, family member, pastor, or mentor—who you feel safe opening up to about mental health struggles.' },
        { title: 'Start Small', description: 'You don\'t have to share everything at once. Start with "I\'ve been going through a hard time" or "I\'ve been thinking about talking to someone professionally."' },
        { title: 'Challenge the Scripts', description: 'When you hear "we don\'t do therapy" or "just pray about it," gently reframe: "Faith and therapy aren\'t opposites. Taking care of my mental health honors the body and mind God gave me."' },
        { title: 'Seek Community Resources', description: 'Reach out to Black-centered organizations like Therapy for Black Girls, The Loveland Foundation, or your local Black church for referrals and support.' },
      ],
      toolLink: '/find-care',
      toolLabel: 'Find Black Therapists',
    },
    citations: [
      {
        id: '1',
        text: 'Mental Health Facts for African Americans',
        source: 'National Alliance on Mental Illness',
        year: '2022',
        link: 'https://www.nami.org/Your-Journey/Identity-and-Cultural-Dimensions/Black-African-American',
        tier: 3,
      },
      {
        id: '2',
        text: 'Mental health of Black Americans: Research trends and directions',
        source: 'Annual Review of Clinical Psychology',
        year: '2020',
        link: 'https://doi.org/10.1146/annurev-clinpsy-050718-095726',
        tier: 1,
      },
      {
        id: '3',
        text: 'Racism and mental health outcomes: A systematic review',
        source: 'The Lancet Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1016/S2215-0366(22)00120-7',
        tier: 1,
      },
      {
        id: '4',
        text: 'The Tuskegee Syphilis Study: Implications for the 21st century',
        source: 'Journal of the National Medical Association',
        year: '2019',
        link: 'https://doi.org/10.1016/j.jnma.2019.03.006',
        tier: 1,
      },
      {
        id: '5',
        text: 'Strong Black Woman schema and mental health in Black women',
        source: 'Psychology of Women Quarterly',
        year: '2018',
        link: 'https://doi.org/10.1177/0361684318793947',
        tier: 1,
      },
      {
        id: '6',
        text: 'Police violence and mental health outcomes in Black communities',
        source: 'American Journal of Public Health',
        year: '2021',
        link: 'https://doi.org/10.2105/AJPH.2021.306370',
        tier: 1,
      },
      {
        id: '7',
        text: 'Faith, spirituality, and mental health in the Black community',
        source: 'Journal of Black Psychology',
        year: '2017',
        link: 'https://doi.org/10.1177/0095798417712717',
        tier: 1,
      },
      {
        id: '8',
        text: 'Therapy for Black Girls: Increasing Access and Representation',
        source: 'American Psychological Association Monitor',
        year: '2020',
        link: 'https://www.apa.org/monitor/2020/07/cover-therapy-black-girls',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            In many Black families and communities, there\'s a shared script: "We don\'t do therapy.", "Prayer is enough.", "You just have to be strong." These messages come from love, from survival, from generations who endured unimaginable trauma without the luxury of professional help. But they also come at a cost.
          </p>
          <p className="mb-6">
            Black Americans experience mental health conditions at rates similar to---or higher than---the general population, yet they are far less likely to receive treatment <Citation id="1" index={1} source="NAMI" year="2022" tier={3} />. This gap isn't about lack of need. It's about a mental health system that has historically failed, harmed, and excluded Black people---and a culture of silence that has made asking for help feel like weakness.
          </p>
        </div>

        <h2 id="the-treatment-gap" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Mental Health Treatment Gap
        </h2>
        <p className="mb-6">
          Black Americans face significant disparities in mental health access and quality of care <Citation id="2" index={2} source="Annual Review of Clinical Psychology" year="2020" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 50, suffix: '%', label: 'Lower rate of mental health treatment for Black adults vs. white adults' },
            { value: 4, suffix: '%', label: 'Of psychologists in the U.S. are Black (vs. 13% of population)' },
            { value: 20, suffix: '%', label: 'Of Black Americans live below the poverty line, limiting access to care' },
            { value: 2.5, suffix: 'x', label: 'Higher likelihood of receiving antipsychotic medications vs. therapy for Black patients' },
          ]}
          source="NAMI Mental Health Facts, 2022; SAMHSA National Survey, 2021"
        />

        <h2 id="unique-stressors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Unique Mental Health Stressors for Black Americans
        </h2>
        <p className="mb-6">
          Beyond the universal stressors that affect all people, Black Americans navigate additional, race-specific mental health challenges:
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          1. Racial Trauma and Violence
        </h3>
        <p className="mb-6">
          Experiencing or witnessing racial violence---whether police brutality, hate crimes, or viral videos of Black death---produces psychological harm similar to PTSD <Citation id="3" index={3} source="The Lancet Psychiatry" year="2022" tier={1} />. Studies show that exposure to police killings of unarmed Black people increases poor mental health days for Black Americans in the surrounding area <Citation id="6" index={6} source="American Journal of Public Health" year="2021" tier={1} />.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          2. The "Strong Black Woman" and "Strong Black Man" Schemas
        </h3>
        <p className="mb-6">
          Cultural expectations to be perpetually strong, resilient, and self-reliant---while positive in some ways---can become a barrier to seeking help. The "Strong Black Woman" schema, for example, is linked to higher rates of depression when women suppress emotional pain to fulfill caregiving roles <Citation id="5" index={5} source="Psychology of Women Quarterly" year="2018" tier={1} />. Similarly, Black men face pressure to embody stoicism and hyper-masculinity, making vulnerability feel unsafe.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          3. Socioeconomic Stress
        </h3>
        <p className="mb-6">
          Structural racism produces economic inequality: Black families have significantly lower median wealth, higher unemployment, and less access to health insurance. Financial stress, housing instability, and food insecurity all directly harm mental health.
        </p>

        <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          4. Lack of Representation in Mental Health Care
        </h3>
        <p className="mb-6">
          Only 4% of psychologists and 2% of psychiatrists are Black. This means many Black clients must explain their cultural context, educate white providers about racism, or tolerate microaggressions in therapy---turning what should be a healing space into another site of labor.
        </p>

        <ArticleCallout variant="clinical-note" title="Historical Trauma and Mistrust">
          <p>
            Black Americans" mistrust of the healthcare system is not paranoia---it's rational. The Tuskegee Syphilis Study left Black men untreated for syphilis for 40 years in the name of 'research' <Citation id="4" index={4} source="Journal of the National Medical Association" year="2019" tier={1} />. Enslaved people were used for medical experimentation. Psychiatric diagnoses were weaponized to pathologize resistance to slavery. This history is not ancient---it shapes present-day hesitation to seek care.
          </p>
        </ArticleCallout>

        <h2 id="stigma-and-silence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Stigma and the Culture of Silence
        </h2>
        <p className="mb-6">
          In many Black communities, mental health struggles are met with silence, shame, or religious explanations <Citation id="7" index={7} source="Journal of Black Psychology" year="2017" tier={1} />. Common messages include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>"What happens in this house stays in this house"</li>
          <li>"Pray about it"</li>
          <li>"Our ancestors survived worse---you can handle this"</li>
          <li>"Therapy is for white people"</li>
          <li>"You're just being weak"</li>
        </ul>
        <p className="mb-6">
          These messages are rooted in survival strategies---Black communities have historically had to be resilient in the face of systemic violence. But they also prevent people from accessing life-saving support.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>
            Faith and therapy are not opposites. Many Black therapists integrate spirituality into their practice, honoring the role of faith while also providing evidence-based tools. Seeking therapy doesn\'t mean you lack faith---it means you\'re taking care of the mind and body that your faith teaches are sacred.
          </p>
        </ArticleCallout>

        <h2 id="breaking-the-silence" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Breaking the Silence: How Change Is Happening
        </h2>
        <p className="mb-6">
          There is a growing movement within Black communities to destigmatize mental health and make care more accessible:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Therapy for Black Girls</strong>: Founded by Dr. Joy Harden Bradford, this platform provides a directory of Black therapists and a podcast normalizing mental health conversations <Citation id="8" index={8} source="APA Monitor" year="2020" tier={3} /></li>
          <li><strong>Black Mental Health Alliance, Boris Lawrence Henson Foundation, The Loveland Foundation</strong>: Organizations providing financial assistance, resources, and advocacy</li>
          <li><strong>Culturally specific interventions</strong>: Therapies like African-centered psychology and community healing circles honor Black cultural strengths</li>
          <li><strong>Celebrity advocacy</strong>: Public figures like Taraji P. Henson, Kid Cudi, and Naomi Osaka speaking openly about their mental health challenges</li>
        </ul>

        <h2 id="finding-support" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Find Culturally Affirming Mental Health Support
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Seek Black Therapists or Culturally Competent Providers',
              description: (
                <p>
                  Use directories like Therapy for Black Girls (therapyforblackgirls.com), Therapy for Black Men (therapyforblackmen.org), or Inclusive Therapists (inclusivetherapists.com). If a Black provider isn\'t available, look for someone trained in racial trauma and cultural humility.
                </p>
              ),
            },
            {
              title: 'Ask About Their Approach to Racism and Racial Trauma',
              description: (
                <p>
                  In your first session, ask: 'How do you approach discussions of racism in therapy?" If the provider dismisses it or seems uncomfortable, find someone else.
                </p>
              ),
            },
            {
              title: 'Explore Community-Based Resources',
              description: (
                <p>
                  Many Black churches, community centers, and cultural organizations offer support groups, peer counseling, or connections to affordable therapy.
                </p>
              ),
            },
            {
              title: 'Consider Sliding Scale or Low-Cost Options',
              description: (
                <p>
                  Open Path Collective, local community mental health centers, and training clinics offer therapy at reduced rates. The Loveland Foundation provides financial assistance for Black women and girls.
                </p>
              ),
            },
            {
              title: 'Lean on Trusted Community',
              description: (
                <p>
                  While professional help is invaluable, informal support from family, friends, church members, or affinity groups can be a starting point or complement to therapy.
                </p>
              ),
            },
          ]}
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          Consider reaching out to a mental health professional if you\'re experiencing:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Persistent sadness, hopelessness, or numbness</li>
          <li>Difficulty sleeping, eating, or concentrating</li>
          <li>Intrusive thoughts about racism, violence, or past trauma</li>
          <li>Withdrawing from relationships or activities you used to enjoy</li>
          <li>Using substances to cope</li>
          <li>Thoughts of self-harm or suicide</li>
        </ul>

        <ArticleCallout variant="warning">
          <p>
            <strong>If you're in crisis:</strong> Call the 988 Suicide & Crisis Lifeline (call or text 988) or the Black Emotional and Mental Health Collective (BEAM) Helpline for culturally affirming crisis support. You are not alone, and help is available.
          </p>
        </ArticleCallout>

        <h2 id="final-thoughts" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          You Deserve Healing
        </h2>
        <p className="mb-6">
          Seeking help is not weakness. It\'s courage. It\'s refusing to carry trauma alone. It\'s choosing to heal so that the next generation doesn\'t have to carry what you did. Mental health care is not a luxury reserved for others---it\'s a right that belongs to you, too.
        </p>
      </>
    ),
  },
];
