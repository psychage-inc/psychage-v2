/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_AGING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  ArticleChart,
  ComparisonTable,
  ArticleAccordion,
  ArticleTabs,
  QuoteBlock,
  ProgressSteps,
  BeforeAfter,
} from '../../../components/article/blocks';

export const mentalHealthLaterLifeArticlesB: Article[] = [
  {
    id: catId(6),
    slug: 'late-life-depression-recognition-and-treatment-approaches',
    status: 'archived',
    title: 'Late-Life Depression: Recognition and Treatment Approaches',
    description:
      'Comprehensive guide to diagnosing and treating depression in older adults--from medications to therapy to lifestyle interventions.',
    image: '/images/articles/cat17/cover-006.svg',
    category: CATEGORY_AGING,
    readTime: 14,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Depression', 'Treatment', 'Antidepressants', 'Psychotherapy'],

    summary:
      'Late-life depression affects 15-20% of community-dwelling older adults and 30-50% of those in nursing homes or with chronic illness. It differs from depression in younger adults: more medical comorbidity, cognitive symptoms prominent, greater suicide risk, and medication sensitivities. Treatment is highly effective--antidepressants (SSRIs, SNRIs) show 60-70% response rates, psychotherapy (especially problem-solving therapy and CBT) works as well as in younger adults, and combination treatment is most effective. Exercise, social support, and treating underlying medical conditions amplify benefits. Untreated depression worsens medical outcomes, accelerates cognitive decline, and increases mortality--making recognition and treatment essential, not optional.',

    keyFacts: [
      {
        text: 'Antidepressants show 60-70% response rates in older adults, comparable to younger populations.',
        citationIndex: 1,
      },
      {
        text: 'Problem-solving therapy and CBT are effective, with benefits persisting 6-12 months post-treatment.',
        citationIndex: 2,
      },
      {
        text: 'Exercise (aerobic activity 3-5x per week) reduces depression symptoms with effect sizes of 0.4-0.6.',
        citationIndex: 3,
      },
      {
        text: 'Untreated depression in older adults doubles mortality risk and triples dementia risk.',
        citationIndex: 4,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Late-life depression is not weakness or fate--it is illness, and illness responds to treatment at every age.',

    practicalExercise: {
      title: 'Creating a Depression Treatment Plan',
      steps: [
        {
          title: 'Get Proper Diagnosis',
          description: 'See your primary care provider or a geriatric psychiatrist. Screening (PHQ-9, GDS) plus clinical interview confirms depression.',
        },
        {
          title: 'Discuss Treatment Options',
          description: 'Ask about both medication and therapy. Combination treatment is most effective for moderate-severe depression.',
        },
        {
          title: 'Start Medication If Recommended',
          description: 'SSRIs (sertraline, escitalopram) or SNRIs (venlafaxine, duloxetine) are first-line. Start low, go slow. Track side effects.',
        },
        {
          title: 'Begin Psychotherapy',
          description: 'Problem-solving therapy or CBT focuses on current stressors, coping skills, and behavioral activation. 8-12 sessions typically effective.',
        },
        {
          title: 'Add Lifestyle Interventions',
          description: 'Exercise 30+ minutes 3-5x per week. Social engagement. Sleep hygiene. These amplify treatment effects.',
        },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Symptoms',
    },

    citations: [
      {
        id: '1',
        text: 'Nelson et al. (2008). A randomized controlled trial of filotherapy for late-life depression. American Journal of Geriatric Psychiatry, 16(9), 711-719.',
        source: 'American Journal of Geriatric Psychiatry',
        year: '2008',
        link: 'https://doi.org/10.1097/JGP.0b013e3181784898',
        tier: 1,
      },
      {
        id: '2',
        text: 'Arean et al. (2010). Problem-solving therapy and supportive therapy in older adults with major depression and executive dysfunction. American Journal of Psychiatry, 167(11), 1391-1398.',
        source: 'American Journal of Psychiatry',
        year: '2010',
        link: 'https://doi.org/10.1176/appi.ajp.2010.09091327',
        tier: 1,
      },
      {
        id: '3',
        text: 'Schuch et al. (2016). Exercise as a treatment for depression: A meta-analysis. Journal of Psychiatric Research, 77, 42-51.',
        source: 'Journal of Psychiatric Research',
        year: '2016',
        link: 'https://doi.org/10.1016/j.jpsychires.2016.02.023',
        tier: 1,
      },
      {
        id: '4',
        text: 'Diniz et al. (2013). Late-life depression and risk of vascular dementia and Alzheimer disease. Archives of General Psychiatry, 70(12), 1283-1289.',
        source: 'Archives of General Psychiatry',
        year: '2013',
        link: 'https://doi.org/10.1001/jamapsychiatry.2013.2433',
        tier: 1,
      },
      {
        id: '5',
        text: 'Alexopoulos et al. (2011). Using the PROSPECT model to treat late-life depression in primary care. American Journal of Geriatric Psychiatry, 19(8), 690-698.',
        source: 'American Journal of Geriatric Psychiatry',
        year: '2011',
        link: 'https://doi.org/10.1097/JGP.0b013e318202bf57',
        tier: 1,
      },
      {
        id: '6',
        text: 'National Institute on Aging (2023). Depression and Older Adults.',
        source: 'NIA/NIH',
        year: '2023',
        link: 'https://www.nia.nih.gov/health/depression-and-older-adults',
        tier: 2,
      },
      {
        id: '7',
        text: 'American Psychiatric Association (2019). Practice Guideline for the Treatment of Patients with Major Depressive Disorder.',
        source: 'APA',
        year: '2019',
        link: 'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines',
        tier: 4,
      },
      {
        id: '8',
        text: 'Geriatric Mental Health Foundation (2022). Depression in Late Life.',
        source: 'GMHF',
        year: '2022',
        link: 'https://www.gmhfonline.org/gmhf/consumer/factsheets/depression_latelife.html',
        tier: 3,
      },
    ],

    content: (
      <>
        <p>
          A 74-year-old woman with heart disease and arthritis tells her doctor she feels tired all the time, has no appetite, and sleeps poorly. Blood tests show nothing wrong. Her doctor increases her arthritis medication. Her depression--the real culprit--goes untreated for another year, during which she loses 15 pounds, stops seeing friends, and contemplates suicide.
          <Citation index={4} />
        </p>

        <p>
          This scenario is tragically common. Late-life depression is underrecognized, undertreated--and highly treatable. This article provides a comprehensive guide to recognizing and treating depression in older adults, emphasizing that age is not a barrier to recovery.
        </p>

        <h2>Prevalence and Impact</h2>
        <p>
          Clinically significant depression affects 15-20% of community-dwelling older adults. Rates are higher in nursing homes (30-50%), among those with chronic medical illness (20-40%), and after stroke or heart attack (30-50%). Despite high prevalence, fewer than half receive treatment.
          <Citation index={6} />
        </p>

        <StatCard
          value="2-3x"
          label="mortality risk in older adults with untreated depression"
          description="Depression is not just distressing--it is deadly"
        />

        <p>
          Consequences extend beyond mood. Depression worsens medical outcomes (longer hospitalizations, poorer adherence to medications, slower recovery from illness), accelerates cognitive decline (triples dementia risk), and dramatically increases suicide risk. Older white men have the highest suicide rate of any demographic--yet receive the least mental health care.
          <Citation index={4} />
        </p>

        <h2>How Late-Life Depression Differs</h2>
        <p>
          Depression in older adults differs from younger populations in presentation, risk factors, and treatment considerations.
        </p>

        <BeforeAfter
          before={{
            title: 'Depression in Younger Adults',
            points: [
              'Reports sadness, crying, hopelessness',
              'Often triggered by psychosocial stressors',
              'Medical comorbidity less common',
              'Suicide attempts more frequent; completions less so',
              'Responds well to standard-dose SSRIs',
            ],
          }}
          after={{
            title: 'Depression in Older Adults',
            points: [
              'May report pain, fatigue, memory problems (not sadness)',
              'Often comorbid with chronic medical illness',
              'Medical comorbidity common (heart disease, diabetes, arthritis)',
              'Suicide attempts less frequent; completion rate very high',
              'More sensitive to medication side effects--requires dose adjustment',
            ],
          }}
        />

        <p>
          Atypical presentation is the rule, not the exception. Older adults with depression may deny sadness but report vague physical complaints, memory difficulties ("pseudodementia"), or anxiety. They may appear apathetic, withdrawn, or irritable. Screening tools and clinical suspicion are essential for diagnosis.
          <Citation index={6} />
        </p>

        <h2>Antidepressant Medications: First-Line Treatment</h2>
        <p>
          Antidepressants are effective in older adults, with response rates of 60-70%--comparable to younger populations. Selective serotonin reuptake inhibitors (SSRIs) and serotonin-norepinephrine reuptake inhibitors (SNRIs) are first-line due to efficacy and tolerability.
          <Citation index={1} />
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'SSRIs',
              content: 'Sertraline, escitalopram, citalopram. Well-tolerated. Side effects: nausea, diarrhea (usually transient), sexual dysfunction, hyponatremia (monitor sodium). Start with half the standard adult dose.',
            },
            {
              label: 'SNRIs',
              content: 'Venlafaxine, duloxetine. Effective for depression plus pain (e.g., neuropathy, arthritis). Side effects similar to SSRIs plus possible blood pressure increase. Monitor BP.',
            },
            {
              label: 'Mirtazapine',
              content: 'Useful when poor appetite or insomnia predominates. Sedating, increases appetite--can be benefit or drawback. Less sexual dysfunction than SSRIs.',
            },
            {
              label: 'Bupropion',
              content: 'Activating antidepressant. Good for apathy, low energy. No sexual side effects. Avoid if seizure history. Can cause insomnia if dosed late in day.',
            },
          ]}
        />

        <p>
          Treatment principles: Start low, go slow. Begin with half the standard adult dose and increase gradually every 1-2 weeks based on response and side effects. Full therapeutic effect takes 6-12 weeks. If no response after 8 weeks at adequate dose, consider switching or augmenting.
          <Citation index={7} />
        </p>

        <ArticleCallout
          type="warning"
          title="Monitor for Hyponatremia"
          content="SSRIs and SNRIs can cause low sodium (hyponatremia) in older adults, especially if on diuretics. Symptoms: confusion, weakness, falls. Check sodium levels 2-4 weeks after starting and periodically."
        />

        <h2>Psychotherapy: As Effective as Medication</h2>
        <p>
          Psychotherapy for late-life depression is highly effective, with benefits comparable to antidepressants and more durable (lower relapse rates). Problem-solving therapy (PST) and cognitive-behavioral therapy (CBT) have the strongest evidence.
          <Citation index={2} />
        </p>

        <ProgressSteps
          steps={[
            {
              title: 'Problem-Solving Therapy (PST)',
              description: 'Teaches systematic approach to solving life stressors (e.g., managing chronic illness, loneliness, financial strain). Six to twelve sessions. Effective even with mild cognitive impairment.',
            },
            {
              title: 'Cognitive-Behavioral Therapy (CBT)',
              description: 'Identifies and challenges negative thought patterns, increases pleasant activities (behavioral activation). Eight to sixteen sessions. Reduces rumination and hopelessness.',
            },
            {
              title: 'Interpersonal Therapy (IPT)',
              description: 'Focuses on relationship conflicts, role transitions (e.g., retirement, widowhood), grief. Twelve to sixteen sessions. Strong evidence for late-life depression.',
            },
            {
              title: 'Life Review Therapy',
              description: 'Guided reminiscence about life experiences. Helps find meaning, resolve regrets, enhance self-worth. Particularly suited to older adults.',
            },
          ]}
        />

        <p>
          Psychotherapy is especially valuable when medication is contraindicated (e.g., drug interactions, side effect intolerance) or when patient prefers non-pharmacological treatment. Combination therapy (medication plus psychotherapy) is most effective for moderate-severe depression.
          <Citation index={2} />
        </p>

        <h2>Exercise: The Underutilized Antidepressant</h2>
        <p>
          Aerobic exercise reduces depression symptoms with effect sizes (0.4-0.6) comparable to medication or therapy. Meta-analyses show that 30-45 minutes of moderate-intensity exercise 3-5 times per week significantly improves mood, often within 4-6 weeks.
          <Citation index={3} />
        </p>

        <ArticleChart
          type="bar"
          title="Depression Symptom Reduction by Intervention"
          data={[
            { name: 'Antidepressant', reduction: 50, color: '#3b82f6' },
            { name: 'Psychotherapy', reduction: 48, color: '#10b981' },
            { name: 'Exercise', reduction: 45, color: '#f59e0b' },
            { name: 'Combination', reduction: 65, color: '#8b5cf6' },
          ]}
          xAxisLabel="Treatment Type"
          yAxisLabel="% Symptom Reduction"
        />

        <p>
          Mechanisms: exercise increases brain-derived neurotrophic factor (BDNF), reduces inflammation, improves sleep, provides social contact (if group-based), and enhances self-efficacy. It also treats comorbid conditions (heart disease, diabetes) that worsen depression.
        </p>

        <h2>Treating Medical Comorbidities</h2>
        <p>
          Depression co-occurs with chronic medical conditions in 30-50% of older adults. The relationship is bidirectional--illness triggers depression, and depression worsens medical outcomes. Treating both conditions improves both.
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Post-Stroke Depression',
              content: 'Affects 30-50% within first year. Antidepressants (SSRIs preferred) improve mood and functional recovery. Start early--depression delays rehabilitation.',
            },
            {
              title: 'Cardiac Disease and Depression',
              content: 'Depression after heart attack doubles mortality risk. SSRIs (especially sertraline, escitalopram) are safe and effective. Avoid TCAs (cardiac side effects).',
            },
            {
              title: 'Diabetes and Depression',
              content: 'Depression worsens glucose control; poor control worsens depression. Collaborative care models (integrated mental health and diabetes management) improve both.',
            },
            {
              title: 'Chronic Pain and Depression',
              content: 'SNRIs (duloxetine, venlafaxine) treat both pain and depression. CBT for pain also reduces depressive symptoms. Address both simultaneously.',
            },
            {
              title: 'Cancer and Depression',
              content: 'Depression is common but not inevitable. Screen routinely. Psychotherapy plus antidepressants if needed. Palliative care teams can integrate mental health support.',
            },
          ]}
        />

        <h2>Electroconvulsive Therapy (ECT): When First-Line Fails</h2>
        <p>
          ECT is the most effective treatment for severe, treatment-resistant, or psychotic depression, with response rates of 70-90%. It is safe in older adults, including those with heart disease or dementia. Side effects (transient memory loss, confusion) are typically mild and reversible.
        </p>

        <p>
          Indications: severe depression with suicidal intent, psychotic features, catatonia, or failure to respond to multiple medication trials. ECT works faster than medication (improvement in 2-3 weeks vs. 6-12 weeks), making it valuable when rapid response is needed.
          <Citation index={7} />
        </p>

        <h2>Maintenance Treatment and Relapse Prevention</h2>
        <p>
          Late-life depression often recurs. After successful treatment, maintenance therapy reduces relapse risk by 50-70%. Continue antidepressants for at least 12 months after remission; if multiple prior episodes, consider indefinite maintenance.
        </p>

        <p>
          Psychotherapy booster sessions (monthly or quarterly) sustain gains. Lifestyle factors (exercise, social engagement, sleep hygiene) are equally important. Monitor for early warning signs (sleep disturbance, loss of interest) and intervene quickly if symptoms return.
        </p>

        <h2>When to Refer to a Specialist</h2>
        <p>
          Most late-life depression can be managed in primary care using collaborative care models (care managers coordinate treatment). Refer to geriatric psychiatry when:
        </p>

        <ul>
          <li>Treatment-resistant depression (failure of 2+ adequate antidepressant trials)</li>
          <li>Psychotic features (hallucinations, delusions)</li>
          <li>Active suicidal ideation or planning</li>
          <li>Comorbid dementia complicating diagnosis or treatment</li>
          <li>Severe side effects or medication interactions requiring expert management</li>
        </ul>

        <QuoteBlock
          quote="Late-life depression is not a character flaw, a normal part of aging, or untreatable. It is an illness--and illness responds to treatment, regardless of age."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },

  {
    id: catId(7),
    slug: 'anxiety-disorders-in-older-adults-more-than-just-worry',
    status: 'archived',
    title: 'Anxiety Disorders in Older Adults: More Than Just Worry',
    description:
      'Understand how anxiety manifests in later life--from generalized anxiety to panic attacks--and evidence-based treatments.',
    image: '/images/articles/cat17/cover-007.svg',
    category: CATEGORY_AGING,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anxiety', 'GAD', 'Panic Disorder', 'Treatment'],

    summary:
      'Anxiety disorders affect 10-20% of older adults, often co-occurring with depression (50% comorbidity). Common presentations include generalized anxiety disorder (excessive worry), panic disorder (sudden attacks), specific phobias, and late-onset PTSD. Anxiety in older adults is frequently underrecognized--attributed to medical illness or personality rather than treatable disorder. Cognitive-behavioral therapy is first-line treatment with strong evidence. SSRIs and SNRIs are effective but require careful dosing due to side effects. Benzodiazepines should be avoided (fall risk, cognitive impairment, dependence). Mindfulness, relaxation training, and exercise provide adjunctive benefits. Untreated anxiety worsens quality of life, increases medical utilization, and predicts disability.',

    keyFacts: [
      {
        text: 'Anxiety disorders affect 10-20% of older adults, often co-occurring with depression.',
        citationIndex: 1,
      },
      {
        text: 'CBT for late-life anxiety shows effect sizes of 0.5-0.8, comparable to younger populations.',
        citationIndex: 2,
      },
      {
        text: 'Benzodiazepines increase fall risk by 50% and should be avoided in older adults.',
        citationIndex: 3,
      },
      {
        text: 'Anxiety often presents as physical symptoms (chest pain, dizziness) leading to extensive medical workups.',
        citationIndex: 4,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Worry in older age is not wisdom--it is often anxiety, and anxiety is treatable.',

    practicalExercise: {
      title: 'Managing Anxiety: Quick Techniques',
      steps: [
        {
          title: 'Diaphragmatic Breathing',
          description: 'Breathe slowly and deeply from the belly (not chest). Inhale 4 counts, hold 4, exhale 6. Repeat 5 times. Calms nervous system.',
        },
        {
          title: 'Progressive Muscle Relaxation',
          description: 'Tense then relax muscle groups sequentially (feet, legs, abdomen, arms, face). Reduces physical tension.',
        },
        {
          title: 'Grounding Technique (5-4-3-2-1)',
          description: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. Anchors you in present moment.',
        },
        {
          title: 'Scheduled Worry Time',
          description: 'Set aside 15 minutes daily to write down worries. Outside this time, postpone worry ("I will think about that during worry time").',
        },
        {
          title: 'Limit Triggers',
          description: 'Reduce caffeine, avoid news overload, maintain regular sleep schedule. Environmental changes reduce anxiety fuel.',
        },
      ],
      toolLink: '/tools/anxiety-tracker',
      toolLabel: 'Track Anxiety Patterns',
    },

    citations: [
      {
        id: '1',
        text: 'Wolitzky-Taylor et al. (2010). Anxiety disorders in older adults: A comprehensive review. Depression and Anxiety, 27(2), 190-211.',
        source: 'Depression and Anxiety',
        year: '2010',
        link: 'https://doi.org/10.1002/da.20653',
        tier: 1,
      },
      {
        id: '2',
        text: 'Wetherell et al. (2013). Cognitive-behavioral therapy for late-life generalized anxiety disorder. Behavior Therapy, 44(2), 302-316.',
        source: 'Behavior Therapy',
        year: '2013',
        link: 'https://doi.org/10.1016/j.beth.2012.10.005',
        tier: 1,
      },
      {
        id: '3',
        text: 'American Geriatrics Society (2019). Updated Beers Criteria for Potentially Inappropriate Medication Use in Older Adults.',
        source: 'Journal of the American Geriatrics Society',
        year: '2019',
        link: 'https://doi.org/10.1111/jgs.15767',
        tier: 4,
      },
      {
        id: '4',
        text: 'Lenze et al. (2011). Comorbid anxiety disorders in late-life depression. American Journal of Psychiatry, 157(5), 722-728.',
        source: 'American Journal of Psychiatry',
        year: '2011',
        link: 'https://doi.org/10.1176/appi.ajp.157.5.722',
        tier: 1,
      },
      {
        id: '5',
        text: 'Gonçalves & Byrne (2012). Interventions for generalized anxiety disorder in older adults: Systematic review and meta-analysis. Journal of Anxiety Disorders, 26(1), 1-11.',
        source: 'Journal of Anxiety Disorders',
        year: '2012',
        link: 'https://doi.org/10.1016/j.janxdis.2011.08.010',
        tier: 1,
      },
      {
        id: '6',
        text: 'National Institute of Mental Health (2022). Anxiety Disorders in Older Adults.',
        source: 'NIMH',
        year: '2022',
        link: 'https://www.nimh.nih.gov/health/publications/anxiety-disorders',
        tier: 2,
      },
      {
        id: '7',
        text: 'Anxiety and Depression Association of America (2023). Older Adults and Anxiety.',
        source: 'ADAA',
        year: '2023',
        link: 'https://adaa.org/living-with-anxiety/older-adults',
        tier: 3,
      },
      {
        id: '8',
        text: 'Veterans Affairs (2021). Managing Anxiety in Older Veterans.',
        source: 'U.S. Department of Veterans Affairs',
        year: '2021',
        link: 'https://www.va.gov/GERIATRICS/Guide/LongTermCare/Anxiety.asp',
        tier: 2,
      },
    ],

    content: (
      <>
        <p>
          An 82-year-old woman experiences chest pain, rapid heartbeat, and shortness of breath. She goes to the emergency room fearing a heart attack. Tests show normal cardiac function. She is told it is anxiety and sent home--but no one treats the anxiety. Episodes continue weekly. She stops leaving her house for fear of having an attack in public.
          <Citation index={4} />
        </p>

        <p>
          Anxiety disorders in older adults are common, distressing, and undertreated. They often masquerade as medical illness, leading to extensive workups while the underlying anxiety goes unrecognized. This article provides a comprehensive guide to identifying and treating late-life anxiety.
        </p>

        <h2>Types of Anxiety Disorders in Older Adults</h2>
        <p>
          Anxiety disorders are not a single condition but a family of related disorders, each with distinct features.
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Generalized Anxiety Disorder (GAD)',
              content: 'Excessive, uncontrollable worry about multiple domains (health, finances, family, safety) occurring most days for 6+ months. Accompanied by restlessness, fatigue, concentration difficulty, irritability, muscle tension, sleep disturbance. Most common anxiety disorder in older adults.',
            },
            {
              title: 'Panic Disorder',
              content: 'Recurrent unexpected panic attacks (sudden surges of intense fear with physical symptoms: heart palpitations, sweating, trembling, shortness of breath, chest pain, dizziness, fear of dying). Often leads to agoraphobia (avoidance of situations where escape might be difficult).',
            },
            {
              title: 'Specific Phobias',
              content: 'Intense fear of specific objects or situations (heights, driving, medical procedures, animals). Common in older adults: fear of falling, fear of medical procedures. Leads to avoidance and functional impairment.',
            },
            {
              title: 'Social Anxiety Disorder',
              content: 'Fear of social or performance situations where one might be judged or embarrassed. Less common in older adults but can emerge after life transitions (retirement, hearing loss making conversation difficult).',
            },
            {
              title: 'Post-Traumatic Stress Disorder (PTSD)',
              content: 'Can emerge decades after trauma (war, assault, accidents). Late-onset PTSD triggered by retirement, illness, or loss that evokes earlier unprocessed trauma. Symptoms: intrusive memories, nightmares, avoidance, hypervigilance.',
            },
          ]}
        />

        <p>
          Generalized anxiety disorder is most prevalent, affecting 5-10% of older adults. Panic disorder and phobias each affect 2-5%. Many older adults have subclinical anxiety--significant symptoms not meeting full diagnostic criteria but still impairing quality of life.
          <Citation index={1} />
        </p>

        <h2>How Anxiety Presents Differently in Older Adults</h2>
        <p>
          Older adults with anxiety often focus on physical symptoms rather than emotional distress. They report chest pain, dizziness, shortness of breath, gastrointestinal distress--leading to medical workups that find no organic cause. The underlying anxiety goes unrecognized.
          <Citation index={4} />
        </p>

        <StatCard
          value="50%"
          label="of older adults with anxiety also have depression"
          description="Comorbidity is the rule, not the exception"
        />

        <p>
          Worry content also differs. Younger adults worry about work, relationships, and future goals. Older adults worry about health, loss of independence, becoming a burden, financial security, and death. This worry feels rational given life circumstances, making it harder to recognize as pathological.
        </p>

        <h2>Cognitive-Behavioral Therapy: First-Line Treatment</h2>
        <p>
          CBT for late-life anxiety shows strong efficacy with effect sizes of 0.5-0.8--comparable to medication and younger populations. Benefits persist 6-12 months post-treatment. CBT is preferred over medication due to lower side effects and more durable outcomes.
          <Citation index={2} />
        </p>

        <ProgressSteps
          steps={[
            {
              title: 'Psychoeducation',
              description: 'Learn about anxiety, the fight-or-flight response, and how worry perpetuates itself. Understanding reduces fear of symptoms.',
            },
            {
              title: 'Cognitive Restructuring',
              description: 'Identify catastrophic thoughts ("I am having a heart attack," "Something terrible will happen"). Challenge with evidence. Replace with realistic alternatives.',
            },
            {
              title: 'Exposure Therapy',
              description: 'Gradually face feared situations (e.g., driving, social events, medical appointments). Repeated exposure without catastrophe reduces fear.',
            },
            {
              title: 'Relaxation Training',
              description: 'Learn diaphragmatic breathing, progressive muscle relaxation, and mindfulness. Practice daily to reduce baseline arousal.',
            },
            {
              title: 'Worry Management',
              description: 'Set aside designated worry time (15 minutes daily). Outside this time, postpone worry. Reduces rumination.',
            },
          ]}
        />

        <p>
          Standard CBT protocols are 8-16 sessions. Adaptations for older adults include: slower pace, written materials (compensate for memory), addressing age-specific worries (health, independence), and involving caregivers if cognitive impairment present.
          <Citation index={2} />
        </p>

        <h2>Medications: SSRIs and SNRIs, Not Benzodiazepines</h2>
        <p>
          SSRIs (sertraline, escitalopram) and SNRIs (venlafaxine, duloxetine) are first-line pharmacotherapy for anxiety disorders in older adults. They reduce anxiety symptoms by 40-60% and are generally well-tolerated. Start with half the standard adult dose and titrate slowly.
        </p>

        <BeforeAfter
          before={{
            title: 'Avoid in Older Adults',
            points: [
              'Benzodiazepines (lorazepam, alprazolam, clonazepam)',
              'Increase fall risk by 50%',
              'Cause cognitive impairment and memory problems',
              'High dependence potential',
              'Paradoxical agitation in some older adults',
            ],
          }}
          after={{
            title: 'Preferred Medications',
            points: [
              'SSRIs: sertraline, escitalopram (well-tolerated)',
              'SNRIs: venlafaxine, duloxetine (also treat pain)',
              'Buspirone: anxiolytic without sedation or dependence',
              'Pregabalin: for GAD with chronic pain',
              'Mirtazapine: if insomnia and poor appetite prominent',
            ],
          }}
        />

        <p>
          Benzodiazepines should be avoided except for short-term use (e.g., acute situational anxiety like dental procedures). Long-term use increases fall risk, dementia risk, and dependence. Taper slowly if patient is already on benzodiazepines--abrupt discontinuation causes withdrawal.
          <Citation index={3} />
        </p>

        <h2>Mindfulness and Relaxation Techniques</h2>
        <p>
          Mindfulness-based interventions reduce anxiety in older adults with effect sizes of 0.3-0.5. Techniques include mindfulness meditation, body scans, and mindful breathing. These practices cultivate present-moment awareness, reducing worry about the future.
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Diaphragmatic Breathing',
              content: 'Breathe slowly from the belly (not chest). Place one hand on chest, one on belly. Belly hand should rise more. Inhale 4 counts, hold 4, exhale 6. Repeat 5-10 times. Activates parasympathetic nervous system.',
            },
            {
              label: 'Progressive Muscle Relaxation',
              content: 'Sequentially tense then relax muscle groups: feet, legs, abdomen, arms, shoulders, face. Hold tension 5 seconds, release 10 seconds. Notice contrast between tension and relaxation. Reduces physical arousal.',
            },
            {
              label: 'Mindfulness Meditation',
              content: 'Sit comfortably. Focus attention on breath. When mind wanders (it will), gently return focus to breath. Start with 5 minutes, increase to 20. Reduces rumination and reactivity.',
            },
            {
              label: 'Guided Imagery',
              content: 'Visualize a peaceful place (beach, forest, mountain). Engage all senses: what do you see, hear, smell, feel? Spend 10-15 minutes immersed in this image. Calms nervous system.',
            },
          ]}
        />

        <p>
          Older adults often respond well to structured relaxation programs. Senior centers, community mental health centers, and online platforms offer classes. Daily practice (even 10 minutes) reduces baseline anxiety over weeks.
        </p>

        <h2>Exercise and Lifestyle Interventions</h2>
        <p>
          Regular aerobic exercise reduces anxiety symptoms with effect sizes comparable to medication (0.4-0.6). Mechanisms: reduces stress hormones (cortisol), increases endorphins, improves sleep, provides social contact (if group-based), and enhances self-efficacy.
        </p>

        <p>
          Recommended: 30-45 minutes of moderate-intensity exercise (brisk walking, swimming, cycling) 3-5 times per week. Tai chi and yoga offer combined benefits of physical activity, mindfulness, and balance training--particularly suited to older adults.
          <Citation index={5} />
        </p>

        <h2>When Anxiety Co-Occurs with Medical Illness</h2>
        <p>
          Anxiety frequently accompanies chronic medical conditions. The relationship is bidirectional--illness triggers anxiety, and anxiety worsens medical outcomes.
        </p>

        <ArticleCallout
          type="warning"
          title="Rule Out Medical Causes First"
          content="Hyperthyroidism, cardiac arrhythmias, hypoglycemia, and medication side effects can mimic anxiety. Check thyroid function, glucose, ECG, and review medications before diagnosing primary anxiety disorder."
        />

        <ul>
          <li>Cardiovascular disease: Anxiety increases heart attack risk and worsens outcomes. Treat both conditions.</li>
          <li>COPD: Shortness of breath triggers panic. Pulmonary rehabilitation plus CBT reduces anxiety and improves breathing.</li>
          <li>Chronic pain: Pain and anxiety amplify each other. SNRIs (duloxetine) treat both. CBT for pain includes anxiety management.</li>
          <li>Dementia: Anxiety is common in early dementia. Treat with SSRIs, environmental modification (reduce overstimulation), and caregiver support.</li>
        </ul>

        <h2>Special Considerations: Late-Onset PTSD</h2>
        <p>
          PTSD can emerge decades after trauma, triggered by retirement, illness, loss, or sensory cues (sounds, smells) that evoke earlier experiences. Veterans who functioned well for 50 years may develop PTSD symptoms in late life when work no longer provides distraction.
        </p>

        <p>
          Treatment: trauma-focused CBT (prolonged exposure, cognitive processing therapy) and EMDR (eye movement desensitization and reprocessing) are effective. SSRIs reduce symptom severity. Veterans Affairs offers specialized PTSD programs for older veterans.
          <Citation index={8} />
        </p>

        <QuoteBlock
          quote="Anxiety in later life is not a character flaw or sign of weakness. It is a treatable condition--and treatment works, regardless of how long you have suffered."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(8),
    slug: 'substance-use-and-addiction-in-later-life-the-overlooked-crisis',
    status: 'archived',
    title: 'Substance Use and Addiction in Later Life: The Overlooked Crisis',
    description:
      'Examine alcohol and prescription medication misuse in older adults--prevalence, risks, and age-appropriate treatment approaches.',
    image: '/images/articles/cat17/cover-008.svg',
    category: CATEGORY_AGING,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Substance Use', 'Alcohol', 'Prescription Medications', 'Addiction'],

    summary:
      'Substance use disorders affect 5-10% of older adults, but rates are rising as baby boomers age. Alcohol is most common (17% of adults 65+ engage in risky drinking), followed by prescription medication misuse (especially opioids, benzodiazepines). Older adults are more vulnerable to substance-related harm due to physiological changes (slower metabolism, drug interactions, falls), medical comorbidity, and isolation. Substance use often goes unrecognized--providers do not screen, family attributes changes to aging, and older adults feel shame. Treatment is effective: brief interventions reduce drinking, medication-assisted treatment works for opioid dependence, and age-specific programs show better outcomes. Early intervention prevents catastrophic consequences (falls, overdose, cognitive decline).',

    keyFacts: [
      {
        text: 'Seventeen percent of adults 65+ engage in risky drinking (exceeding recommended limits for older adults).',
        citationIndex: 1,
      },
      {
        text: 'Prescription medication misuse affects 10-15% of older adults, especially opioids and benzodiazepines.',
        citationIndex: 2,
      },
      {
        text: 'Older adults metabolize alcohol and medications more slowly, increasing intoxication duration and side effects.',
        citationIndex: 3,
      },
      {
        text: 'Brief interventions (5-15 minutes of counseling) reduce risky drinking by 20-30% in older adults.',
        citationIndex: 4,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Addiction does not discriminate by age--and neither should treatment. Recovery is possible at 70 as it is at 30.',

    practicalExercise: {
      title: 'Assessing Your Substance Use',
      steps: [
        {
          title: 'Track Drinking',
          description: 'Keep a diary for 2 weeks: how many drinks per day? Recommended limits for 65+: 1 drink/day, 7/week maximum. More than this is risky.',
        },
        {
          title: 'Review Medications',
          description: 'List all prescriptions and over-the-counter meds. Are you taking more than prescribed? Using medications not prescribed to you? These signal misuse.',
        },
        {
          title: 'Complete AUDIT-C Screener',
          description: 'Three-question alcohol screener (available online). Scores of 3+ indicate risky drinking. Discuss with provider.',
        },
        {
          title: 'Assess Consequences',
          description: 'Have you had falls, accidents, or arguments related to substance use? Memory problems? These are red flags.',
        },
        {
          title: 'Seek Help Without Shame',
          description: 'Substance use in older adults is common and treatable. Talk to your provider, call SAMHSA helpline (1-800-662-4357), or attend AA/NA meetings.',
        },
      ],
      toolLink: '/resources/substance-use-support',
      toolLabel: 'Find Treatment',
    },

    citations: [
      {
        id: '1',
        text: 'Han et al. (2017). Substance use disorder among older adults in the United States in 2020. Addiction, 104(1), 88-96.',
        source: 'Addiction',
        year: '2017',
        link: 'https://doi.org/10.1111/add.14478',
        tier: 1,
      },
      {
        id: '2',
        text: 'Simoni-Wastila & Yang (2006). Psychoactive drug abuse in older adults. American Journal of Geriatric Pharmacotherapy, 4(4), 380-394.',
        source: 'American Journal of Geriatric Pharmacotherapy',
        year: '2006',
        link: 'https://doi.org/10.1016/j.amjopharm.2006.10.002',
        tier: 1,
      },
      {
        id: '3',
        text: 'Moore et al. (2007). Rates and correlates of alcohol-medication interactions in older adults. Journal of the American Geriatrics Society, 55(6), 891-896.',
        source: 'Journal of the American Geriatrics Society',
        year: '2007',
        link: 'https://doi.org/10.1111/j.1532-5415.2007.01194.x',
        tier: 1,
      },
      {
        id: '4',
        text: 'Fleming et al. (1999). Brief physician advice for alcohol problems in older adults. Journal of Family Practice, 48(5), 378-384.',
        source: 'Journal of Family Practice',
        year: '1999',
        link: 'https://pubmed.ncbi.nlm.nih.gov/10334615/',
        tier: 1,
      },
      {
        id: '5',
        text: 'Kuerbis et al. (2014). Substance abuse among older adults. Clinics in Geriatric Medicine, 30(3), 629-654.',
        source: 'Clinics in Geriatric Medicine',
        year: '2014',
        link: 'https://doi.org/10.1016/j.cger.2014.04.008',
        tier: 1,
      },
      {
        id: '6',
        text: 'SAMHSA (2020). Substance Use in Older Adults.',
        source: 'SAMHSA',
        year: '2020',
        link: 'https://www.samhsa.gov/find-help/older-adults',
        tier: 2,
      },
      {
        id: '7',
        text: 'National Institute on Alcohol Abuse and Alcoholism (2023). Older Adults and Alcohol.',
        source: 'NIAAA',
        year: '2023',
        link: 'https://www.niaaa.nih.gov/alcohols-effects-health/older-adults',
        tier: 2,
      },
      {
        id: '8',
        text: 'American Geriatrics Society (2019). Beers Criteria Update: Alcohol and Older Adults.',
        source: 'AGS',
        year: '2019',
        link: 'https://www.americangeriatrics.org/publications/shop-ags-publications/beers-criteria-update',
        tier: 4,
      },
    ],

    content: (
      <>
        <p>
          A 70-year-old retired teacher drinks three glasses of wine every evening. She has done this for years without problem. Recently, she has fallen twice, cannot remember conversations, and feels dizzy often. Her doctor attributes this to aging. But the real cause is alcohol--her body no longer tolerates what it once did.
          <Citation index={3} />
        </p>

        <p>
          Substance use and addiction in older adults are hidden epidemics. Alcohol and prescription medication misuse are common, dangerous, and undertreated. This article examines the scope of the problem, why older adults are vulnerable, and how to intervene effectively.
        </p>

        <h2>Prevalence: A Growing Crisis</h2>
        <p>
          Approximately 17% of adults aged 65 and older engage in risky drinking--exceeding recommended limits of 1 drink per day or 7 per week. This percentage is rising as baby boomers (who have higher lifetime substance use rates than previous generations) age. By 2030, an estimated 5.7 million older adults will have substance use disorders.
          <Citation index={1} />
        </p>

        <StatCard
          value="10-15%"
          label="of older adults misuse prescription medications"
          description="Especially opioids, benzodiazepines, and sedatives"
        />

        <p>
          Prescription medication misuse--taking medications in higher doses than prescribed, using medications prescribed to others, or using for non-medical purposes--affects 10-15% of older adults. Opioid misuse (painkillers like oxycodone, hydrocodone) and benzodiazepine misuse (anxiety/sleep medications like lorazepam, alprazolam) are most common.
          <Citation index={2} />
        </p>

        <h2>Why Older Adults Are More Vulnerable</h2>
        <p>
          Aging changes how the body processes substances, increasing vulnerability to harm even at doses that were safe in younger years.
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Slower Metabolism',
              content: 'Liver and kidney function decline with age. Alcohol and medications are metabolized more slowly, leading to prolonged intoxication and higher blood levels. What was "one drink" at 30 has effects of "two drinks" at 70.',
            },
            {
              title: 'Decreased Body Water',
              content: 'Older adults have less body water, so alcohol becomes more concentrated in the bloodstream. Same amount of alcohol produces higher blood alcohol levels.',
            },
            {
              title: 'Medication Interactions',
              content: 'Older adults take an average of 5-7 medications. Alcohol and medications interact dangerously: alcohol plus benzodiazepines causes severe sedation, falls, respiratory depression. Alcohol plus NSAIDs increases GI bleeding risk.',
            },
            {
              title: 'Medical Comorbidity',
              content: 'Chronic conditions (liver disease, heart disease, diabetes) are worsened by substance use. Alcohol destabilizes blood sugar, worsens hypertension, and exacerbates heart failure.',
            },
            {
              title: 'Cognitive and Physical Decline',
              content: 'Substances impair balance (fall risk), cognition (confusion, memory problems), and judgment (risky behaviors). Effects are amplified in those with existing impairment.',
            },
          ]}
        />

        <p>
          These physiological changes mean that drinking or medication use that was safe at 50 becomes risky at 70. Recommended alcohol limits for older adults are lower: 1 drink per day maximum, 7 per week maximum (less than younger adults).
          <Citation index={7} />
        </p>

        <h2>Patterns of Substance Use: Early-Onset vs. Late-Onset</h2>
        <p>
          Substance use disorders in older adults follow two patterns with different causes and prognoses.
        </p>

        <BeforeAfter
          before={{
            title: 'Early-Onset (Long-Standing Use)',
            points: [
              'Began substance use in young adulthood',
              'Often has decades-long history of dependence',
              'More severe physical and cognitive damage',
              'Higher tolerance (needs more to achieve effect)',
              'Often socially isolated, estranged from family',
            ],
          }}
          after={{
            title: 'Late-Onset (New Use in Later Life)',
            points: [
              'Began heavy use after age 60',
              'Triggered by retirement, loss, illness, isolation',
              'Less physical damage (shorter duration)',
              'Lower tolerance (smaller amounts cause problems)',
              'Better prognosis--responds well to brief interventions',
            ],
          }}
        />

        <p>
          Late-onset users (about one-third of older adults with substance problems) have better treatment outcomes. Early intervention can prevent progression to severe dependence.
          <Citation index={5} />
        </p>

        <h2>Screening and Recognition</h2>
        <p>
          Substance use in older adults is systematically underrecognized. Providers do not routinely screen. Families attribute changes (memory problems, falls, mood changes) to aging, not substance use. Older adults feel shame and hide use.
        </p>

        <ProgressSteps
          steps={[
            {
              title: 'AUDIT-C Alcohol Screener',
              description: 'Three questions: (1) How often do you drink? (2) How many drinks on a typical day? (3) How often do you have 6+ drinks? Scores of 3+ indicate risky drinking.',
            },
            {
              title: 'Medication Review',
              description: 'At every visit, review all medications (prescription, OTC, supplements). Ask: Are you taking more than prescribed? Using medications from others? This signals misuse.',
            },
            {
              title: 'Observe Red Flags',
              description: 'Falls, accidents, confusion, poor hygiene, neglecting responsibilities, mood changes, unexplained injuries. All can indicate substance use.',
            },
            {
              title: 'Ask Direct Questions',
              description: 'Non-judgmental: "Many people your age drink to cope with stress or pain. How much alcohol do you drink in a typical week?" Normalize to reduce shame.',
            },
          ]}
        />

        <p>
          Screening should be annual for all adults 65+, and more frequent if risk factors present (chronic pain, depression, social isolation, recent loss).
          <Citation index={6} />
        </p>

        <h2>Brief Interventions: 5-15 Minutes Can Save Lives</h2>
        <p>
          Brief interventions--short counseling sessions (5-15 minutes) delivered in primary care--reduce risky drinking by 20-30% in older adults. They work best for late-onset users and those with mild-moderate use (not severe dependence).
          <Citation index={4} />
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Feedback',
              content: 'Provide objective information: "Your drinking exceeds safe limits for your age and medications. This increases risk of falls, memory problems, and worsening of your heart condition."',
            },
            {
              label: 'Responsibility',
              content: 'Emphasize patient autonomy: "Only you can decide whether to change your drinking. I am here to provide information and support."',
            },
            {
              label: 'Advice',
              content: 'Give clear recommendation: "I recommend reducing to no more than 1 drink per day, 7 per week. Avoid alcohol on days you take your pain medication."',
            },
            {
              label: 'Menu of Options',
              content: 'Offer strategies: Keep a drinking diary. Set specific limits. Find alternative coping (exercise, hobbies, social activities). Attend support groups.',
            },
            {
              label: 'Empathy',
              content: 'Acknowledge difficulty: "I understand this is hard. Many people drink to cope with stress, pain, or loneliness. Let us find healthier ways to address those needs."',
            },
            {
              label: 'Self-Efficacy',
              content: 'Express confidence: "I believe you can make this change. We will work together and monitor your progress."',
            },
          ]}
        />

        <p>
          Brief interventions are brief, non-confrontational, and effective. They are suitable for primary care, require minimal training, and reduce substance-related harm even without complete abstinence.
        </p>

        <h2>Specialized Treatment for Severe Dependence</h2>
        <p>
          Older adults with severe substance use disorders require specialized treatment--detoxification, residential programs, or intensive outpatient care. Age-specific programs show better outcomes than mixed-age programs.
        </p>

        <ul>
          <li>Detoxification: Medically supervised withdrawal from alcohol or benzodiazepines (abrupt cessation causes dangerous withdrawal--seizures, delirium tremens).</li>
          <li>Medication-Assisted Treatment: For opioid dependence, methadone or buprenorphine reduces cravings and withdrawal. Naltrexone for alcohol dependence reduces drinking.</li>
          <li>Psychotherapy: CBT, motivational interviewing, and relapse prevention tailored to older adults (addressing grief, retirement, chronic illness as triggers).</li>
          <li>Peer Support: AA, SMART Recovery, and other mutual-help groups. Older adult-specific meetings exist in some communities.</li>
        </ul>

        <p>
          Age-specific programs address unique needs: slower pace, focus on loss and grief, integration of medical care, addressing cognitive impairment, and building social connections.
          <Citation index={5} />
        </p>

        <h2>Preventing Prescription Medication Misuse</h2>
        <p>
          Prescription medication misuse often begins iatrogenically--providers prescribe opioids for chronic pain or benzodiazepines for anxiety/sleep, and dependence develops. Prevention strategies include:
        </p>

        <ArticleCallout
          type="warning"
          title="Avoid Long-Term Benzodiazepines and Opioids"
          content="Both are on the Beers Criteria of potentially inappropriate medications for older adults. Use alternatives when possible (CBT for anxiety/insomnia, non-opioid pain management)."
        />

        <ul>
          <li>Use non-pharmacological treatments first (CBT for anxiety, physical therapy for pain).</li>
          <li>If opioids or benzodiazepines are necessary, use lowest effective dose for shortest duration.</li>
          <li>Monitor closely: pill counts, urine drug screens, prescription drug monitoring programs.</li>
          <li>Taper slowly if discontinuing (abrupt cessation causes withdrawal).</li>
          <li>Educate patients on risks: falls, cognitive impairment, dependence, overdose.</li>
        </ul>

        <h2>The Role of Family and Caregivers</h2>
        <p>
          Family members often notice substance use before providers. They can:
        </p>

        <ul>
          <li>Express concern non-judgmentally: "I have noticed you are drinking more. I am worried about your health."</li>
          <li>Encourage professional help: Offer to attend appointments together.</li>
          <li>Remove substances from the home if the person agrees.</li>
          <li>Attend Al-Anon or family therapy to learn how to support without enabling.</li>
        </ul>

        <p>
          Confrontational interventions ("You are an alcoholic and need to stop") often backfire. Motivational interviewing techniques (express concern, explore ambivalence, support autonomy) are more effective.
        </p>

        <QuoteBlock
          quote="Substance use in later life is not moral failure. It is a health condition--often triggered by pain, loss, and isolation--and it responds to compassionate, evidence-based treatment."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },

  {
    id: catId(9),
    slug: 'grief-bereavement-and-complicated-mourning-in-later-life',
    status: 'archived',
    title: 'Grief, Bereavement, and Complicated Mourning in Later Life',
    description:
      'Navigate the profound losses of later life--distinguishing normal grief from complicated grief and depression, and finding paths through sorrow.',
    image: '/images/articles/cat17/cover-009.svg',
    category: CATEGORY_AGING,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Grief', 'Bereavement', 'Loss', 'Complicated Grief'],

    summary:
      'Grief is universal in later life--loss of spouse, siblings, friends, health, independence, and identity accumulates. Normal grief involves waves of sadness, longing, and pain that fluctuate but gradually lessen over months to years. Complicated grief (affecting 10-20% of bereaved older adults) involves persistent, intense yearning and preoccupation that does not improve and impairs functioning. It differs from depression--grief maintains capacity for positive emotion and is focused on the deceased; depression is pervasive emptiness. Treatment for complicated grief includes grief-focused CBT, narrative therapy, and meaning reconstruction. Support groups, rituals, and maintaining connections to the deceased (memories, legacy projects) facilitate healing. Grief never fully ends, but it evolves--from acute pain to bittersweet remembrance.',

    keyFacts: [
      {
        text: 'Fifty percent of women and 25% of men over 65 are widowed--loss of spouse is near-universal in later life.',
        citationIndex: 1,
      },
      {
        text: 'Complicated grief affects 10-20% of bereaved individuals, characterized by persistent yearning and functional impairment beyond 6-12 months.',
        citationIndex: 2,
      },
      {
        text: 'Grief-focused CBT reduces complicated grief symptoms by 50-60%, with benefits persisting long-term.',
        citationIndex: 3,
      },
      {
        text: 'Social support and maintaining routines are the strongest predictors of healthy grief adaptation.',
        citationIndex: 4,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Grief is not a problem to solve--it is love persisting beyond death, and that love is not pathology.',

    practicalExercise: {
      title: 'Navigating Grief',
      steps: [
        {
          title: 'Allow the Waves',
          description: 'Grief comes in waves--intense one moment, calmer the next. Do not fight the waves. Feel them, then let them recede. This is normal.',
        },
        {
          title: 'Maintain Routines',
          description: 'Keep eating, sleeping, and moving. Routine provides structure when everything else feels chaotic.',
        },
        {
          title: 'Connect with Others',
          description: 'Isolation worsens grief. Talk to friends, family, clergy, or support groups. Sharing stories of the deceased honors them.',
        },
        {
          title: 'Create Rituals',
          description: 'Light a candle, visit the grave, look at photos, write letters. Rituals provide ways to maintain connection and express love.',
        },
        {
          title: 'Seek Help If Stuck',
          description: 'If grief does not lessen after 6-12 months, or if functioning is severely impaired, see a grief therapist. Complicated grief is treatable.',
        },
      ],
      toolLink: '/resources/grief-support',
      toolLabel: 'Find Support Groups',
    },

    citations: [
      {
        id: '1',
        text: 'U.S. Census Bureau (2021). Marital Status of the Population 65 Years and Over.',
        source: 'U.S. Census Bureau',
        year: '2021',
        link: 'https://www.census.gov/library/publications/2021/demo/p70br-172.html',
        tier: 2,
      },
      {
        id: '2',
        text: 'Shear et al. (2011). Complicated grief and related bereavement issues. Depression and Anxiety, 28(2), 103-117.',
        source: 'Depression and Anxiety',
        year: '2011',
        link: 'https://doi.org/10.1002/da.20780',
        tier: 1,
      },
      {
        id: '3',
        text: 'Shear et al. (2014). Treatment of complicated grief in elderly persons: A randomized clinical trial. JAMA Psychiatry, 71(11), 1287-1295.',
        source: 'JAMA Psychiatry',
        year: '2014',
        link: 'https://doi.org/10.1001/jamapsychiatry.2014.1242',
        tier: 1,
      },
      {
        id: '4',
        text: 'Stroebe et al. (2007). Health outcomes of bereavement. Lancet, 370(9603), 1960-1973.',
        source: 'Lancet',
        year: '2007',
        link: 'https://doi.org/10.1016/S0140-6736(07)61816-9',
        tier: 1,
      },
      {
        id: '5',
        text: 'Bonanno & Kaltman (1999). Toward an integrative perspective on bereavement. Psychological Bulletin, 125(6), 760-776.',
        source: 'Psychological Bulletin',
        year: '1999',
        link: 'https://doi.org/10.1037/0033-2909.125.6.760',
        tier: 1,
      },
      {
        id: '6',
        text: 'National Institute on Aging (2022). Mourning the Death of a Spouse.',
        source: 'NIA/NIH',
        year: '2022',
        link: 'https://www.nia.nih.gov/health/end-life/mourning-death-spouse',
        tier: 2,
      },
      {
        id: '7',
        text: 'Center for Complicated Grief (2023). Resources and Treatment.',
        source: 'Columbia University',
        year: '2023',
        link: 'https://complicatedgrief.columbia.edu',
        tier: 3,
      },
      {
        id: '8',
        text: 'AARP (2022). Grief and Loss Resources for Older Adults.',
        source: 'AARP',
        year: '2022',
        link: 'https://www.aarp.org/caregiving/grief-loss-end-of-life/',
        tier: 3,
      },
    ],

    content: (
      <>
        <p>
          A 78-year-old woman sits alone in the house she shared with her husband for 52 years. He died six months ago. The grief comes in waves--sometimes she functions normally, cooks, sees friends. Other times, the longing is so intense she cannot breathe. She wonders if this pain will ever end. She wonders if she wants it to--because if the pain ends, does that mean she is forgetting him?
          <Citation index={4} />
        </p>

        <p>
          Grief in later life is near-universal. Loss accumulates--spouses, siblings, friends, health, independence, roles. This article explores the terrain of late-life grief: what is normal, when grief becomes complicated, and how to navigate profound loss while continuing to live.
        </p>

        <h2>The Ubiquity of Loss in Later Life</h2>
        <p>
          By age 65, most people have experienced multiple significant losses. Approximately 50% of women and 25% of men over 65 are widowed. Beyond spousal loss, older adults lose siblings (often childhood companions), lifelong friends, adult children (particularly painful and against the expected order), and pets who provided companionship.
          <Citation index={1} />
        </p>

        <StatCard
          value="50%"
          label="of women over 65 are widowed"
          description="Loss of spouse is near-universal in later life"
        />

        <p>
          Non-death losses also mount: retirement ends work identity and daily structure; chronic illness steals physical capabilities; sensory decline (vision, hearing) isolates; cognitive changes threaten autonomy. These ambiguous losses--mourning something not dead but irrevocably changed--carry their own grief.
          <Citation index={6} />
        </p>

        <h2>Normal Grief: What to Expect</h2>
        <p>
          Normal grief is intensely painful but not pathological. It involves waves of sadness, yearning, anger, guilt, and disbelief that fluctuate in intensity. Between waves, positive emotions remain possible--moments of humor, connection, or peace. Over months to years, acute pain lessens (though never fully disappears), and functioning improves.
          <Citation index={5} />
        </p>

        <ProgressSteps
          steps={[
            {
              title: 'Acute Phase (Weeks to Months)',
              description: 'Shock, numbness, intense waves of sadness and yearning. Sleep and appetite disturbed. Difficulty concentrating. Searching behaviors (looking for the deceased, hearing their voice).',
            },
            {
              title: 'Integration Phase (Months to 1-2 Years)',
              description: 'Pain remains but becomes less constant. Positive memories emerge alongside sadness. Gradual resumption of activities and relationships. "First year" milestones (holidays, anniversaries) trigger intensification.',
            },
            {
              title: 'Adaptation Phase (1-2+ Years)',
              description: 'Deceased integrated into life narrative. Bittersweet remembrance replaces acute pain. Capacity for joy and engagement returns. Grief triggered by reminders but no longer dominates daily life.',
            },
          ]}
        />

        <p>
          There is no timeline. "Stages of grief" (denial, anger, bargaining, depression, acceptance) are not linear or universal. Grief is individual, influenced by relationship quality, circumstances of death, personality, support, and concurrent stressors.
          <Citation index={5} />
        </p>

        <h2>Complicated Grief: When Mourning Gets Stuck</h2>
        <p>
          Complicated grief (also called prolonged grief disorder) affects 10-20% of bereaved individuals. It involves intense, persistent yearning and preoccupation with the deceased that does not improve over time and severely impairs functioning. Diagnostic criteria require symptoms persisting beyond 6-12 months post-loss.
          <Citation index={2} />
        </p>

        <BeforeAfter
          before={{
            title: 'Normal Grief',
            points: [
              'Sadness comes in waves; between waves, other emotions possible',
              'Functioning gradually improves over months',
              'Positive memories emerge alongside pain',
              'Engages in activities and relationships (even if difficult)',
              'Accepts the reality of the loss',
            ],
          }}
          after={{
            title: 'Complicated Grief',
            points: [
              'Intense yearning dominates every moment',
              'Functioning remains impaired beyond 6-12 months',
              'Only painful memories; positive memories feel like betrayal',
              'Avoids reminders of deceased or, conversely, cannot move forward',
              'Difficulty accepting the loss is real',
            ],
          }}
        />

        <p>
          Complicated grief is distinct from depression. In grief, pain is focused on the deceased--longing, yearning, preoccupation. In depression, pain is generalized--pervasive emptiness, hopelessness, worthlessness. Grief retains capacity for positive emotion (when not triggered by reminders); depression does not.
          <Citation index={2} />
        </p>

        <h2>Risk Factors for Complicated Grief</h2>
        <p>
          Certain circumstances increase risk for complicated grief:
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Sudden or Traumatic Death',
              content: 'Accidents, suicide, homicide leave no time to prepare. Trauma (witnessing the death, violent circumstances) compounds grief with PTSD symptoms.',
            },
            {
              title: 'Loss of a Child',
              content: 'Even adult children. Violates the expected order of life. Parents often experience guilt ("I should have protected them") and existential questioning.',
            },
            {
              title: 'Ambivalent or Dependent Relationship',
              content: 'If the relationship was conflicted (unresolved anger, guilt), grief is complicated by regret. If highly dependent (spouse was sole source of identity, purpose), survivor feels lost.',
            },
            {
              title: 'Social Isolation',
              content: 'Lack of support network intensifies grief. Disenfranchised grief (loss not socially recognized, e.g., ex-spouse, pet, same-sex partner in non-accepting community) adds isolation.',
            },
            {
              title: 'Prior Mental Health Issues',
              content: 'History of depression, anxiety, or previous complicated grief increases vulnerability.',
            },
            {
              title: 'Multiple Losses',
              content: 'Bereavement overload--losing multiple people in short succession--overwhelms coping resources.',
            },
          ]}
        />

        <h2>Treatment for Complicated Grief</h2>
        <p>
          Complicated grief responds to specialized grief-focused psychotherapy. Standard depression or anxiety treatments are less effective. Grief-focused cognitive-behavioral therapy (CBT) reduces symptoms by 50-60% in randomized trials.
          <Citation index={3} />
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Grief-Focused CBT',
              content: 'Combines exposure (revisiting memories, visiting places associated with deceased), cognitive restructuring (addressing guilt, regrets), and meaning reconstruction (finding purpose after loss). Sixteen to twenty sessions.',
            },
            {
              label: 'Narrative Therapy',
              content: 'Telling and retelling the story of the relationship and the loss. Externali zing grief as a companion rather than an enemy. Re-authoring life story to include loss without being defined by it.',
            },
            {
              label: 'Meaning-Making',
              content: 'Exploring: What did this relationship mean? How did it shape who I am? How can I honor the deceased while continuing to live? Legacy projects (volunteering in their name, scholarship funds) provide purpose.',
            },
            {
              label: 'Complicated Grief Treatment (CGT)',
              content: 'Evidence-based protocol developed by Katherine Shear at Columbia. Combines exposure, cognitive restructuring, and restoration of connections to life. Shows strong efficacy in older adults.',
            },
          ]}
        />

        <p>
          Medication (antidepressants) may help if comorbid depression is present but does not treat grief itself. Support groups (bereavement groups, widow/widower groups) provide normalization and peer support--valuable adjuncts to therapy.
          <Citation index={3} />
        </p>

        <h2>Widowhood: The Most Common Loss</h2>
        <p>
          Loss of spouse is particularly profound in later life. Marriages of 30, 40, 50+ years involve deeply intertwined identities, daily routines, and futures. Widowhood brings not just emotional loss but practical challenges: managing finances, home maintenance, social isolation (couple friends drift away), and identity loss ("I am no longer a wife/husband--who am I?").
        </p>

        <p>
          Men and women experience widowhood differently. Widowed men are at higher risk for depression, substance use, and suicide--especially if they relied on spouse for emotional support and social connections. Widowed women face financial insecurity (especially older cohorts where husband managed finances) and greater loneliness (women outlive men, so female peer groups shrink).
          <Citation index={6} />
        </p>

        <h2>Supporting Someone Who Is Grieving</h2>
        <p>
          Family, friends, and communities play critical roles in supporting bereaved older adults.
        </p>

        <ArticleCallout
          type="info"
          title="What Helps"
          content="Presence (visit, call, sit together), practical help (meals, errands, paperwork), listening without fixing, remembering the deceased (share stories, say their name), patience (grief takes years, not weeks)."
        />

        <ul>
          <li>Do not avoid the grieving person. Isolation worsens grief.</li>
          <li>Do not say: "They are in a better place," "Time heals all wounds," "You should be over this by now." These minimize pain.</li>
          <li>Do say: "I am so sorry," "Tell me about them," "I am here for you," "There is no timeline for grief."</li>
          <li>Remember milestones: anniversaries, birthdays, holidays. Check in on these difficult days.</li>
          <li>Encourage professional help if grief seems stuck or depression emerges.</li>
        </ul>

        <h2>Continuing Bonds: Staying Connected After Death</h2>
        <p>
          Modern grief theory recognizes that the goal is not "letting go" or "moving on" but rather maintaining continuing bonds--an ongoing connection to the deceased that evolves over time. This is healthy, not pathological.
        </p>

        <ProgressSteps
          steps={[
            {
              title: 'Memories',
              description: 'Looking at photos, sharing stories, reminiscing. Keeps the person alive in memory and honors their impact.',
            },
            {
              title: 'Rituals',
              description: 'Lighting candles, visiting the grave, continuing traditions they loved (e.g., their favorite holiday meal). Provides structure for connection.',
            },
            {
              title: 'Legacy Projects',
              description: 'Volunteering for causes they cared about, scholarship funds, planting trees, creating memorials. Channels grief into purpose.',
            },
            {
              title: 'Internal Conversations',
              description: 'Talking to the deceased in your mind, imagining what they would say. Not delusion--a way of accessing internalized wisdom.',
            },
            {
              title: 'Living Their Values',
              description: 'Embodying qualities they valued (kindness, courage, humor). Their influence continues through you.',
            },
          ]}
        />

        <p>
          Continuing bonds allow the bereaved to carry the deceased forward while simultaneously engaging in life. The relationship changes from physical presence to internalized presence--but love persists.
          <Citation index={7} />
        </p>

        <h2>Grief and Meaning</h2>
        <p>
          Profound loss often triggers existential questions: Why did this happen? What is the meaning of life? How do I go on? Meaning-making--finding or creating significance in the loss--predicts better adaptation.
        </p>

        <p>
          Meaning can come from: recognizing the deceased's lasting impact, finding growth through suffering (e.g., deeper compassion, appreciation for life), helping others facing similar loss, or spiritual/religious frameworks that provide context. There is no "right" meaning--what matters is the process of searching.
        </p>

        <QuoteBlock
          quote="Grief is not a disorder, a disease, or a sign of weakness. It is the price we pay for love--and that price, however steep, is worth it."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },

  {
    id: catId(10),
    slug: 'suicide-prevention-in-older-adults-the-silent-epidemic',
    status: 'archived',
    title: 'Suicide Prevention in Older Adults: The Silent Epidemic',
    description:
      'Understand the highest-risk demographic for suicide--older adults, especially men--and learn how to recognize warning signs and intervene.',
    image: '/images/articles/cat17/cover-010.svg',
    category: CATEGORY_AGING,
    readTime: 14,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Suicide Prevention', 'Crisis', 'Mental Health', 'Intervention'],

    summary:
      'Older adults, especially white men over 75, have the highest suicide completion rates of any demographic--three times the national average. Unlike younger adults, older adults make fewer attempts but use more lethal means (firearms), leading to high completion rates. Risk factors include depression, chronic pain, social isolation, recent loss, access to firearms, and terminal illness. Warning signs are often subtle: giving away possessions, settling affairs, sudden calmness after depression, increased substance use, expressing burden to others. Prevention requires screening for suicidal ideation in primary care, treating underlying depression and pain, reducing access to lethal means (firearms, medications), increasing social connection, and crisis intervention (988 Suicide & Crisis Lifeline). Late-life suicide is preventable--most who die by suicide saw a healthcare provider within 30 days.',

    keyFacts: [
      {
        text: 'White men over 75 have suicide rates three times the national average--the highest of any demographic.',
        citationIndex: 1,
      },
      {
        text: 'Ninety percent of older adults who die by suicide saw a healthcare provider within one month--missed opportunities for intervention.',
        citationIndex: 2,
      },
      {
        text: 'Firearms account for 70% of late-life suicides--reducing access to lethal means saves lives.',
        citationIndex: 3,
      },
      {
        text: 'Depression is present in 70-90% of older adult suicides, yet most were not receiving mental health treatment.',
        citationIndex: 4,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Suicide is not inevitable, even in the face of profound suffering. Connection, treatment, and hope can save lives at any age.',

    practicalExercise: {
      title: 'Recognizing and Responding to Suicidal Risk',
      steps: [
        {
          title: 'Know the Warning Signs',
          description: 'Talking about death/suicide, giving away possessions, settling affairs, sudden calmness after depression, withdrawal, increased substance use, acquiring means (firearms, pills).',
        },
        {
          title: 'Ask Directly',
          description: 'If concerned, ask: "Are you thinking about suicide?" Asking does NOT plant the idea--it shows you care and opens conversation.',
        },
        {
          title: 'Listen Without Judgment',
          description: 'Do not minimize ("You have so much to live for"), argue, or offer quick fixes. Listen, validate pain, express concern.',
        },
        {
          title: 'Remove Lethal Means',
          description: 'If firearms present, ask family to secure or remove them. Lock up medications. Reducing access to means prevents impulsive acts.',
        },
        {
          title: 'Get Help Immediately',
          description: 'Call 988 Suicide & Crisis Lifeline, take person to emergency room, or call 911. Do not leave the person alone until help arrives.',
        },
      ],
      toolLink: '/crisis',
      toolLabel: 'Crisis Resources',
    },

    citations: [
      {
        id: '1',
        text: 'Centers for Disease Control and Prevention (2022). Suicide Rates by Age Group.',
        source: 'CDC',
        year: '2022',
        link: 'https://www.cdc.gov/suicide/suicide-data-statistics.html',
        tier: 2,
      },
      {
        id: '2',
        text: 'Luoma et al. (2002). Contact with mental health and primary care providers before suicide. American Journal of Psychiatry, 159(6), 909-916.',
        source: 'American Journal of Psychiatry',
        year: '2002',
        link: 'https://doi.org/10.1176/appi.ajp.159.6.909',
        tier: 1,
      },
      {
        id: '3',
        text: 'Conwell et al. (2011). Suicide in older adults. Psychiatric Clinics of North America, 34(2), 451-468.',
        source: 'Psychiatric Clinics of North America',
        year: '2011',
        link: 'https://doi.org/10.1016/j.psc.2011.02.002',
        tier: 1,
      },
      {
        id: '4',
        text: 'Conwell & Thompson (2008). Suicidal behavior in elders. Psychiatric Clinics of North America, 31(2), 333-356.',
        source: 'Psychiatric Clinics of North America',
        year: '2008',
        link: 'https://doi.org/10.1016/j.psc.2008.01.004',
        tier: 1,
      },
      {
        id: '5',
        text: 'Erlangsen et al. (2020). Suicide among older adults: The role of physical illness. Social Psychiatry and Psychiatric Epidemiology, 55(3), 371-379.',
        source: 'Social Psychiatry and Psychiatric Epidemiology',
        year: '2020',
        link: 'https://doi.org/10.1007/s00127-019-01768-6',
        tier: 1,
      },
      {
        id: '6',
        text: 'National Institute of Mental Health (2023). Suicide Prevention.',
        source: 'NIMH',
        year: '2023',
        link: 'https://www.nimh.nih.gov/health/topics/suicide-prevention',
        tier: 2,
      },
      {
        id: '7',
        text: '988 Suicide & Crisis Lifeline (2023). Resources and Support.',
        source: '988 Lifeline',
        year: '2023',
        link: 'https://988lifeline.org',
        tier: 3,
      },
      {
        id: '8',
        text: 'American Foundation for Suicide Prevention (2023). Older Adults and Suicide.',
        source: 'AFSP',
        year: '2023',
        link: 'https://afsp.org/older-adults-and-suicide',
        tier: 3,
      },
    ],

    content: (
      <>
        <p>
          An 80-year-old man tells his daughter he has put his affairs in order and wants her to have his watch--the one his father gave him. She thinks he is being practical. Three days later, he dies by suicide. Looking back, she realizes: giving away possessions was a warning sign. But no one taught her to look for it.
          <Citation index={2} />
        </p>

        <p>
          Suicide among older adults is a silent epidemic. Rates are highest in this demographic, yet awareness is low, screening is rare, and intervention often comes too late. This article provides a comprehensive guide to understanding, recognizing, and preventing late-life suicide.
        </p>

        <h2>The Scope of the Crisis</h2>
        <p>
          Adults aged 75 and older have suicide rates approximately 50% higher than the national average. Among white men over 75, rates are three times the national average--the highest of any demographic group. Approximately 8,500 adults aged 65+ die by suicide annually in the United States.
          <Citation index={1} />
        </p>

        <StatCard
          value="3x"
          label="higher suicide rate in white men over 75 vs. national average"
          description="The highest-risk demographic for suicide"
        />

        <p>
          Unlike younger adults, older adults make fewer suicide attempts but use more lethal means (firearms account for 70% of late-life suicides), leading to higher completion rates. The ratio of attempts to completions is approximately 4:1 in older adults, compared to 25:1 in younger adults--meaning when older adults attempt suicide, they are far more likely to die.
          <Citation index={3} />
        </p>

        <h2>Risk Factors: A Constellation of Vulnerabilities</h2>
        <p>
          Late-life suicide is rarely impulsive. It results from accumulating risk factors--psychiatric illness, physical illness, social isolation, and existential despair--overwhelming protective factors like social support and reasons for living.
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Depression and Mental Illness',
              content: 'Present in 70-90% of older adult suicides. Often undiagnosed or undertreated. Hopelessness (belief that suffering is permanent) is the strongest predictor.',
            },
            {
              title: 'Chronic Pain and Physical Illness',
              content: 'Cancer, COPD, heart disease, stroke increase suicide risk 2-3x. Chronic pain that impairs function and quality of life is particularly high-risk. Fear of becoming a burden is common.',
            },
            {
              title: 'Social Isolation and Loneliness',
              content: 'Living alone, loss of spouse, lack of close relationships. Men are at higher risk--less likely to seek help, smaller social networks, higher rates of substance use.',
            },
            {
              title: 'Recent Loss',
              content: 'Death of spouse, especially within first year of bereavement. Loss of independence (e.g., had to stop driving, move to nursing home). Loss of identity after retirement.',
            },
            {
              title: 'Access to Lethal Means',
              content: 'Firearms in the home dramatically increase risk. Stockpiling medications. Suicide is often impulsive--reducing access to means prevents completion.',
            },
            {
              title: 'Substance Use',
              content: 'Alcohol and prescription medication misuse increase impulsivity, worsen depression, and provide means (overdose).',
            },
            {
              title: 'Prior Suicide Attempt',
              content: 'History of attempt is strong predictor of future attempt. Older adults are more likely to complete on subsequent attempts.',
            },
          ]}
        />

        <p>
          Risk factors cluster. An isolated, depressed widower with chronic pain and access to firearms is at very high risk. Addressing even one factor (e.g., treating depression, reducing isolation) can tip the balance toward life.
          <Citation index={4} />
        </p>

        <h2>Warning Signs: Often Subtle, Always Serious</h2>
        <p>
          Older adults are less likely than younger adults to express suicidal thoughts directly. Warning signs are often subtle or misinterpreted as normal aging or practical planning.
        </p>

        <ProgressSteps
          steps={[
            {
              title: 'Verbal Cues',
              description: 'Statements like: "I am a burden," "I wish I were dead," "My family would be better off without me," "I have nothing to live for," "Soon you will not have to worry about me." Take all statements seriously.',
            },
            {
              title: 'Behavioral Changes',
              description: 'Giving away possessions, settling affairs (updating will, giving instructions for after death), saying goodbye, sudden interest in estate planning. Often misinterpreted as being responsible.',
            },
            {
              title: 'Sudden Calmness',
              description: 'After period of depression, sudden peace or calmness can indicate decision made to die. Family may think "They are finally feeling better," but this can signal imminent risk.',
            },
            {
              title: 'Acquiring Means',
              description: 'Purchasing firearm, stockpiling medications, researching methods. Direct preparation for suicide.',
            },
            {
              title: 'Withdrawal',
              description: 'Isolating from family and friends, canceling appointments, losing interest in previously enjoyed activities. May be preparing to die alone.',
            },
            {
              title: 'Increased Substance Use',
              description: 'New or increased alcohol or medication use. Reduces inhibitions and increases impulsivity.',
            },
          ]}
        />

        <p>
          If any warning signs are present, ask directly about suicidal thoughts. Contrary to myth, asking about suicide does NOT plant the idea--it shows you care and opens the door to help.
          <Citation index={6} />
        </p>

        <h2>Missed Opportunities: Contact with Healthcare</h2>
        <p>
          Approximately 90% of older adults who die by suicide saw a healthcare provider (primary care physician, specialist) within 30 days before death. Many saw a provider within one week. These are missed opportunities for screening and intervention.
          <Citation index={2} />
        </p>

        <ArticleCallout
          type="warning"
          title="Providers Must Screen"
          content="Primary care visits should include routine screening for depression (PHQ-9, GDS) and direct questions about suicidal ideation: 'Have you had thoughts of harming yourself or ending your life?' This is life-saving care."
        />

        <p>
          Why are opportunities missed? Providers do not routinely screen. Patients do not disclose distress (shame, belief that nothing can help, not wanting to burden). Physical symptoms (pain, fatigue) dominate the visit, leaving no time for mental health. Ageism leads providers to assume sadness is understandable given circumstances.
        </p>

        <h2>Intervention: What to Do If Someone Is Suicidal</h2>
        <p>
          If you suspect someone is suicidal, act immediately. Do not wait, minimize, or hope it will pass.
        </p>

        <BeforeAfter
          before={{
            title: 'What NOT to Do',
            points: [
              'Do not ignore warning signs hoping they will go away',
              'Do not minimize ("You have so much to live for")',
              'Do not argue or lecture ("Suicide is selfish")',
              'Do not promise secrecy ("I will not tell anyone")',
              'Do not leave the person alone if imminent risk',
            ],
          }}
          after={{
            title: 'What TO Do',
            points: [
              'Ask directly: "Are you thinking about suicide?"',
              'Listen without judgment, validate pain',
              'Express concern: "I care about you and want to help"',
              'Remove lethal means (firearms, medications)',
              'Get immediate help: 988 Lifeline, emergency room, 911',
            ],
          }}
        />

        <p>
          If the person is in immediate danger (has a plan, has means, intends to act soon), call 911 or take them to the nearest emergency room. Do not leave them alone. If risk is not imminent but present, call 988 Suicide & Crisis Lifeline (available 24/7) for guidance. Ensure they see a mental health professional within 24-48 hours.
          <Citation index={7} />
        </p>

        <h2>Means Restriction: Saving Lives by Reducing Access</h2>
        <p>
          Suicide is often impulsive--90% of people who survive a suicide attempt do not go on to die by suicide later. Reducing access to lethal means during crisis prevents deaths.
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Firearms',
              content: 'Ask family members to temporarily remove firearms from the home. Use gun locks, store ammunition separately, or have firearms held by a trusted person outside the home. Seventy percent of late-life suicides involve firearms--removal is life-saving.',
            },
            {
              label: 'Medications',
              content: 'Secure medications in locked cabinets. Dispense only small amounts (e.g., weekly pill organizers). Family members can control access. Overdose is common method in older adults.',
            },
            {
              label: 'Other Means',
              content: 'Remove or secure other potential means: ropes, plastic bags, carbon monoxide sources (car exhaust in garage). While uncomfortable, these measures prevent impulsive acts.',
            },
          ]}
        />

        <p>
          Means restriction is temporary--during acute crisis, often weeks to months while treatment begins. Once stabilized, risk decreases. But in the acute phase, removing means prevents irreversible tragedy.
          <Citation index={3} />
        </p>

        <h2>Treatment: Addressing Underlying Causes</h2>
        <p>
          Suicidal ideation is a symptom of underlying conditions--depression, pain, isolation. Treating these conditions reduces suicidal risk.
        </p>

        <ul>
          <li>Depression treatment: Antidepressants (SSRIs, SNRIs) plus psychotherapy. Suicidal ideation often lifts as depression improves. Monitor closely in early weeks (antidepressants can initially increase energy before improving mood, creating risk).</li>
          <li>Pain management: Treat chronic pain aggressively--physical therapy, non-opioid medications, nerve blocks, psychological pain management. Uncontrolled pain drives suicide.</li>
          <li>Social connection: Reduce isolation through senior centers, volunteer opportunities, support groups, faith communities. Connection is protective.</li>
          <li>Substance use treatment: If alcohol or medication misuse present, treat this as it worsens depression and increases impulsivity.</li>
          <li>Crisis safety planning: Collaboratively develop plan: warning signs, coping strategies, people to contact, how to make environment safe. Written plan reduces risk.</li>
        </ul>

        <p>
          Hospitalization may be necessary if risk is acute and person cannot be kept safe outpatient. Intensive outpatient programs or partial hospitalization provide structure and monitoring while allowing person to remain in community.
          <Citation index={6} />
        </p>

        <h2>Special Considerations: Terminal Illness and End-of-Life</h2>
        <p>
          Terminal illness increases suicide risk. Patients fear pain, loss of dignity, becoming a burden. Some request physician-assisted suicide (legal in some states under strict criteria). Distinguishing between rational end-of-life decision-making and depression-driven suicidal ideation is ethically complex.
          <Citation index={5} />
        </p>

        <p>
          Palliative care--focused on quality of life, pain management, and holistic support--reduces suicidal ideation in terminally ill patients. Hospice provides comprehensive end-of-life care that addresses physical, emotional, and spiritual suffering. Many patients who initially request hastened death change their minds once symptoms are well-managed and support is in place.
        </p>

        <h2>Role of Family and Community</h2>
        <p>
          Family members, friends, and community are frontline suicide prevention. Stay connected--regular visits, phone calls. Express concern if warning signs noticed. Encourage professional help. Reduce isolation by inviting the person to activities, even if they initially decline.
        </p>

        <p>
          Communities can support suicide prevention through:
        </p>

        <ul>
          <li>Gatekeeper training (teaching community members--clergy, senior center staff, librarians--to recognize warning signs and connect people to help)</li>
          <li>Reducing social isolation through senior programs, volunteer opportunities, intergenerational activities</li>
          <li>Public education campaigns reducing stigma around mental health and help-seeking</li>
          <li>Ensuring access to mental health services--telehealth, mobile crisis teams, geriatric psychiatry</li>
        </ul>

        <QuoteBlock
          quote="Suicide is not inevitable, even in the face of profound suffering. Treatment works, connection heals, and hope can be rekindled--at any age."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />

        <ArticleCallout
          type="warning"
          title="If You Are in Crisis"
          content="Call or text 988 Suicide & Crisis Lifeline (24/7, free, confidential). Go to your nearest emergency room. Call 911. You do not have to face this alone--help is available, and life can get better."
        />
      </>
    ),
  },
];
