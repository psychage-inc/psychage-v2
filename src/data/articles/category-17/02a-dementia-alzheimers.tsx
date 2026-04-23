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

export const dementiaAlzheimersArticlesA: Article[] = [
  {
    id: catId(11),
    slug: 'what-is-dementia-types-causes-and-progression',
    status: 'published',
    title: 'What Is Dementia? Types, Causes, and Progression',
    description:
      'Understand dementia as an umbrella term for cognitive decline--from Alzheimer disease to vascular dementia to Lewy body disease.',
    image: '/images/articles/cat17/cover-011.svg',
    category: CATEGORY_AGING,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Dementia', 'Alzheimer', 'Cognitive Decline', 'Neurology'],

    summary:
      'Dementia is not a specific disease--it is an umbrella term describing progressive decline in memory, thinking, and daily functioning severe enough to interfere with life. Alzheimer disease accounts for 60-80% of cases; vascular dementia (15-20%), Lewy body dementia (5-10%), frontotemporal dementia (5-10%), and mixed dementia are other major types. Causes include protein accumulation (amyloid, tau), vascular damage, Lewy bodies, and frontotemporal degeneration. Progression is variable--some cases advance slowly over decades; others deteriorate rapidly within years. Early signs include memory loss, difficulty finding words, impaired judgment, confusion with time or place, and personality changes. Dementia is not a normal part of aging, though age is the greatest risk factor. Diagnosis requires comprehensive clinical assessment, cognitive testing, brain imaging, and sometimes biomarker analysis.',

    keyFacts: [
      {
        text: 'Fifty-five million people worldwide live with dementia; projected to reach 139 million by 2050.',
        citationIndex: 1,
      },
      {
        text: 'Alzheimer disease is the most common cause (60-80%), followed by vascular dementia (15-20%).',
        citationIndex: 2,
      },
      {
        text: 'Age is the strongest risk factor--prevalence doubles every 5 years after age 65.',
        citationIndex: 3,
      },
      {
        text: 'Up to 40% of dementia cases may be preventable through modifiable lifestyle factors.',
        citationIndex: 4,
      },
      {
        text: 'Dementia is a clinical syndrome (symptom cluster), not a single disease--the underlying cause must be identified for proper treatment.',
        citationIndex: 5,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Dementia is not the brain failing--it is the brain changing in ways we are learning to understand, slow, and sometimes prevent.',

    practicalExercise: {
      title: 'Recognizing Early Warning Signs',
      steps: [
        {
          title: 'Memory Changes',
          description: 'Forgetting recent events, repeating questions, difficulty recalling names of familiar people. Normal aging: occasional forgetfulness. Dementia: frequent, worsening forgetting that interferes with daily life.',
        },
        {
          title: 'Problem-Solving Difficulties',
          description: 'Trouble with planning, following recipes, managing finances, or completing familiar tasks. Takes longer to do things than before.',
        },
        {
          title: 'Confusion with Time or Place',
          description: 'Losing track of dates, seasons, passage of time. Forgetting where you are or how you got there.',
        },
        {
          title: 'Language Problems',
          description: 'Trouble finding the right words, calling things by wrong names, difficulty following or joining conversations.',
        },
        {
          title: 'Personality or Mood Changes',
          description: 'Becoming confused, suspicious, depressed, fearful, or anxious. Easily upset in unfamiliar situations.',
        },
      ],
      toolLink: '/tools/cognitive-screening',
      toolLabel: 'Take a Cognitive Screen',
    },

    citations: [
      {
        id: '1',
        text: 'World Health Organization (2023). Global status report on the public health response to dementia.',
        source: 'World Health Organization',
        year: '2023',
        link: 'https://www.who.int/publications/i/item/9789240033245',
        tier: 2,
      },
      {
        id: '2',
        text: 'Alzheimer\'s Association (2024). 2024 Alzheimer\'s disease facts and figures. Alzheimer\'s & Dementia, 20(5), 3708-3821.',
        source: 'Alzheimer\'s & Dementia',
        year: '2024',
        link: 'https://doi.org/10.1002/alz.13809',
        tier: 3,
      },
      {
        id: '3',
        text: 'Plassman et al. (2007). Prevalence of dementia in the United States: The Aging, Demographics, and Memory Study. Neuroepidemiology, 29(1-2), 125-132.',
        source: 'Neuroepidemiology',
        year: '2007',
        link: 'https://doi.org/10.1159/000109998',
        tier: 1,
      },
      {
        id: '4',
        text: 'Livingston et al. (2020). Dementia prevention, intervention, and care: 2020 report of the Lancet Commission. The Lancet, 396(10248), 413-446.',
        source: 'The Lancet',
        year: '2020',
        link: 'https://doi.org/10.1016/S0140-6736(20)30367-6',
        tier: 1,
      },
      {
        id: '5',
        text: 'National Institute on Aging (2023). What Is Dementia? Symptoms, Types, and Diagnosis.',
        source: 'National Institute on Aging',
        year: '2023',
        link: 'https://www.nia.nih.gov/health/alzheimers-and-dementia/what-dementia',
        tier: 2,
      },
      {
        id: '6',
        text: 'McKhann et al. (2011). The diagnosis of dementia due to Alzheimer disease: Recommendations from the NIA-Alzheimer Association workgroups. Alzheimer\'s & Dementia, 7(3), 263-269.',
        source: 'Alzheimer\'s & Dementia',
        year: '2011',
        link: 'https://doi.org/10.1016/j.jalz.2011.03.005',
        tier: 4,
      },
      {
        id: '7',
        text: 'Petersen et al. (2018). Practice guideline update summary: Mild cognitive impairment. Neurology, 90(3), 126-135.',
        source: 'Neurology',
        year: '2018',
        link: 'https://doi.org/10.1212/WNL.0000000000004826',
        tier: 4,
      },
      {
        id: '8',
        text: 'Knopman et al. (2021). Alzheimer disease. Nature Reviews Disease Primers, 7(1), 33.',
        source: 'Nature Reviews Disease Primers',
        year: '2021',
        link: 'https://doi.org/10.1038/s41572-021-00269-y',
        tier: 1,
      },
    ],

    content: (
      <>
        <h2>Dementia Is an Umbrella, Not a Diagnosis</h2>
        <p>
          Dementia is not a single disease. It is a clinical syndrome--an umbrella term describing progressive decline in memory, thinking, language, judgment, and behavior severe enough to interfere with daily functioning. If cognition were a house, dementia would be the category "structural damage"--the cause could be fire, flood, earthquake, or slow erosion. Alzheimer disease, vascular dementia, Lewy body dementia, and frontotemporal dementia are the different causes.
          <Citation index={1} />
        </p>

        <p>
          This distinction matters: dementia is the symptom cluster (memory loss, confusion, personality changes); Alzheimer disease, vascular dementia, etc., are the underlying pathologies. You do not "have dementia" in the way you "have diabetes"--you have a specific disease that causes dementia. Proper diagnosis identifies which disease is present, which informs prognosis, treatment, and care planning.
          <Citation index={2} />
        </p>

        <StatCard
          value="55 million"
          label="People worldwide living with dementia (2023)"
          description="Projected to reach 139 million by 2050 as populations age globally."
          source={<Citation index={1} />}
        />

        <h2>Major Types of Dementia</h2>
        <p>
          Understanding the major types helps clarify what is happening in the brain and what to expect:
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Alzheimer Disease (60-80% of cases)',
              content: (
                <>
                  <p>
                    The most common cause. Characterized by accumulation of amyloid plaques (protein clumps) and tau tangles (twisted fibers) in the brain, leading to neuron death and brain shrinkage. Early symptoms: short-term memory loss, difficulty finding words, impaired judgment. Progression: gradual decline over 8-12 years on average. Risk factors: age, APOE-e4 gene variant, family history, cardiovascular disease.
                    <Citation index={8} />
                  </p>
                </>
              ),
            },
            {
              title: 'Vascular Dementia (15-20% of cases)',
              content: (
                <>
                  <p>
                    Caused by reduced blood flow to the brain--from strokes (large or small) or chronic damage to small blood vessels. Symptoms depend on location and extent of damage: executive dysfunction (planning, organizing), slowed thinking, difficulty with complex tasks. Progression: stepwise (sudden worsening after strokes) or gradual. Prevention: managing cardiovascular risk factors (hypertension, diabetes, smoking).
                    <Citation index={2} />
                  </p>
                </>
              ),
            },
            {
              title: 'Lewy Body Dementia (5-10% of cases)',
              content: (
                <>
                  <p>
                    Caused by abnormal deposits of alpha-synuclein protein (Lewy bodies) in the brain. Symptoms: visual hallucinations, fluctuating cognition (good days and bad days), Parkinsonian motor features (tremor, rigidity, slow movement), REM sleep behavior disorder. Progression: more rapid than Alzheimer, average 5-8 years. Sensitivity to antipsychotic medications is a major concern.
                    <Citation index={5} />
                  </p>
                </>
              ),
            },
            {
              title: 'Frontotemporal Dementia (5-10% of cases)',
              content: (
                <>
                  <p>
                    Caused by degeneration of frontal and temporal lobes. Younger onset (45-65 years common). Symptoms: personality and behavior changes (disinhibition, apathy, compulsive behaviors), language difficulties (aphasia), early executive dysfunction. Memory relatively preserved until later stages. Progression: variable, often faster than Alzheimer. Genetic component stronger than other types.
                    <Citation index={2} />
                  </p>
                </>
              ),
            },
            {
              title: 'Mixed Dementia (10-20% of cases)',
              content: (
                <>
                  <p>
                    More than one type present simultaneously--most commonly Alzheimer plus vascular changes. Autopsy studies show that many people with clinical Alzheimer disease also have vascular pathology, Lewy bodies, or both. Mixed dementia may explain why some people decline faster than expected or why symptoms do not fit one pattern neatly.
                    <Citation index={2} />
                  </p>
                </>
              ),
            },
          ]}
        />

        <h2>How Dementia Progresses</h2>
        <p>
          Dementia is progressive--it worsens over time. Progression varies by type, individual factors, and interventions. The typical trajectory includes three stages, though boundaries are fluid:
        </p>

        <ProgressSteps
          steps={[
            {
              title: 'Early Stage (Mild)',
              description: 'Memory lapses (recent events, names), word-finding difficulties, misplacing items, mild disorientation, subtle personality changes. Person can function independently with occasional help. Duration: 2-4 years (Alzheimer).',
            },
            {
              title: 'Middle Stage (Moderate)',
              description: 'Significant memory loss (past and recent), confusion about time/place, difficulty recognizing people, impaired judgment, need for help with daily tasks (dressing, bathing), behavioral changes (wandering, agitation, suspicion). Duration: 2-10 years.',
            },
            {
              title: 'Late Stage (Severe)',
              description: 'Severe memory loss, inability to communicate coherently, loss of physical abilities (walking, swallowing), complete dependence on caregivers, vulnerability to infections. Duration: 1-3 years. End-stage dementia is terminal.',
            },
          ]}
        />

        <ArticleCallout
          type="info"
          title="Not All Decline Is Linear"
          content="Some dementias plateau for periods, some fluctuate day to day (Lewy body), some worsen suddenly after strokes (vascular). Progression is not a smooth downward slope--it is a staircase, a roller coaster, or waves. This unpredictability is exhausting for caregivers and patients alike."
        />

        <h2>Dementia vs. Normal Aging</h2>
        <p>
          A critical distinction: dementia is pathological; normal cognitive aging is not. Both involve changes, but dementia crosses a threshold into dysfunction.
        </p>

        <BeforeAfter
          before={{
            title: 'Normal Aging',
            points: [
              'Occasional forgetfulness (names, appointments) that does not worsen rapidly',
              'Slower processing speed but intact reasoning',
              'Needs reminders but manages tasks independently',
              'Personality stable, judgment intact',
              'Does not interfere with work, relationships, or safety',
            ],
          }}
          after={{
            title: 'Dementia',
            points: [
              'Frequent, progressive forgetting that disrupts daily life',
              'Impaired problem-solving, judgment, and decision-making',
              'Cannot complete familiar tasks without help',
              'Personality changes, mood instability, behavioral problems',
              'Interferes with independence, safety, and quality of life',
            ],
          }}
        />

        <QuoteBlock
          quote="Dementia is not aging poorly--it is disease. The brain in normal aging slows down; the brain in dementia breaks down."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },

  {
    id: catId(12),
    slug: 'alzheimer-disease-brain-changes-symptoms-and-stages',
    status: 'published',
    title: 'Alzheimer Disease: Brain Changes, Symptoms, and Stages',
    description:
      'Deep dive into the biology of Alzheimer--from amyloid plaques and tau tangles to symptom progression and diagnostic advances.',
    image: '/images/articles/cat17/cover-012.svg',
    category: CATEGORY_AGING,
    readTime: 14,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Alzheimer', 'Neurobiology', 'Biomarkers', 'Diagnosis'],

    summary:
      'Alzheimer disease is characterized by two abnormal protein deposits in the brain: amyloid plaques (sticky clumps outside neurons) and tau tangles (twisted fibers inside neurons). These disrupt communication between brain cells, leading to cell death and brain shrinkage. The hippocampus (memory center) and cortex (thinking, language) are first affected. Symptoms begin subtly--forgetting recent conversations, repeating questions, difficulty with finances--and progress to severe memory loss, disorientation, language breakdown, and dependence. Stages: preclinical (brain changes before symptoms), mild cognitive impairment (noticeable changes but independent), mild/moderate/severe Alzheimer dementia. Diagnosis relies on clinical assessment, cognitive testing, brain imaging (MRI/PET), and increasingly cerebrospinal fluid or blood biomarkers. No cure exists, but treatments slow progression and manage symptoms.',

    keyFacts: [
      {
        text: 'Alzheimer pathology begins 10-20 years before symptoms appear--the "preclinical" phase.',
        citationIndex: 1,
      },
      {
        text: 'Amyloid-beta plaques and tau neurofibrillary tangles are the hallmark brain changes.',
        citationIndex: 2,
      },
      {
        text: 'The hippocampus (memory formation) and entorhinal cortex are first regions affected.',
        citationIndex: 3,
      },
      {
        text: 'Average survival after symptom onset is 4-8 years, though some live 20+ years.',
        citationIndex: 4,
      },
      {
        text: 'Tau tangles correlate more closely with symptom severity than amyloid plaques--as tau spreads, function declines.',
        citationIndex: 2,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Alzheimer steals the past slowly, then the present, then the future--but connection, kindness, and presence remain powerful until the end.',

    practicalExercise: {
      title: 'Early Detection Steps',
      steps: [
        {
          title: 'Track Changes Over Time',
          description: 'If memory lapses or confusion are worsening over months, not static or improving, that pattern signals potential concern. Compare to 6-12 months ago.',
        },
        {
          title: 'Get Baseline Cognitive Testing',
          description: 'Annual screening with tools like MMSE, MoCA, or SLUMS establishes baseline and tracks change. Primary care can administer these in 10-15 minutes.',
        },
        {
          title: 'Seek Specialist Evaluation If Concerned',
          description: 'Neurologists or geriatricians perform comprehensive workup: detailed history, neurological exam, brain imaging, labs to rule out other causes (thyroid, B12 deficiency, etc.).',
        },
        {
          title: 'Consider Biomarker Testing',
          description: 'CSF analysis (amyloid, tau) or amyloid PET scans confirm Alzheimer pathology. Blood biomarkers emerging. Not standard yet, but increasingly available.',
        },
        {
          title: 'Discuss Family History and Genetic Risk',
          description: 'APOE-e4 gene increases risk but does not cause disease. Genetic testing is available but complex--discuss pros and cons with specialist.',
        },
      ],
      toolLink: '/resources/alzheimers-screening',
      toolLabel: 'Screening Resources',
    },

    citations: [
      {
        id: '1',
        text: 'Jack et al. (2018). NIA-AA Research Framework: Toward a biological definition of Alzheimer\'s disease. Alzheimer\'s & Dementia, 14(4), 535-562.',
        source: 'Alzheimer\'s & Dementia',
        year: '2018',
        link: 'https://doi.org/10.1016/j.jalz.2018.02.018',
        tier: 4,
      },
      {
        id: '2',
        text: 'Knopman et al. (2021). Alzheimer disease. Nature Reviews Disease Primers, 7(1), 33.',
        source: 'Nature Reviews Disease Primers',
        year: '2021',
        link: 'https://doi.org/10.1038/s41572-021-00269-y',
        tier: 1,
      },
      {
        id: '3',
        text: 'Braak & Braak (1991). Neuropathological stageing of Alzheimer-related changes. Acta Neuropathologica, 82(4), 239-259.',
        source: 'Acta Neuropathologica',
        year: '1991',
        link: 'https://doi.org/10.1007/BF00308809',
        tier: 1,
      },
      {
        id: '4',
        text: 'Alzheimer\'s Association (2024). 2024 Alzheimer\'s disease facts and figures. Alzheimer\'s & Dementia, 20(5), 3708-3821.',
        source: 'Alzheimer\'s & Dementia',
        year: '2024',
        link: 'https://doi.org/10.1002/alz.13809',
        tier: 3,
      },
      {
        id: '5',
        text: 'Scheltens et al. (2021). Alzheimer\'s disease. The Lancet, 397(10284), 1577-1590.',
        source: 'The Lancet',
        year: '2021',
        link: 'https://doi.org/10.1016/S0140-6736(20)32205-4',
        tier: 1,
      },
      {
        id: '6',
        text: 'McKhann et al. (2011). The diagnosis of dementia due to Alzheimer disease. Alzheimer\'s & Dementia, 7(3), 263-269.',
        source: 'Alzheimer\'s & Dementia',
        year: '2011',
        link: 'https://doi.org/10.1016/j.jalz.2011.03.005',
        tier: 4,
      },
      {
        id: '7',
        text: 'Hansson et al. (2022). The Alzheimer\'s Association appropriate use recommendations for blood biomarkers. Alzheimer\'s & Dementia, 18(12), 2669-2686.',
        source: 'Alzheimer\'s & Dementia',
        year: '2022',
        link: 'https://doi.org/10.1002/alz.12756',
        tier: 4,
      },
      {
        id: '8',
        text: 'National Institute on Aging (2023). Alzheimer\'s Disease Fact Sheet.',
        source: 'National Institute on Aging',
        year: '2023',
        link: 'https://www.nia.nih.gov/health/alzheimers-and-dementia/alzheimers-disease-fact-sheet',
        tier: 2,
      },
    ],

    content: (
      <>
        <h2>What Happens in the Alzheimer Brain</h2>
        <p>
          Alzheimer disease is defined by two abnormal protein accumulations that destroy brain cells:
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Amyloid Plaques',
              content: (
                <>
                  <p>
                    Beta-amyloid protein fragments clump together between neurons, forming sticky plaques. In healthy brains, amyloid is produced and cleared continuously. In Alzheimer, clearance fails, and amyloid accumulates. Plaques disrupt cell-to-cell signaling and trigger immune responses that damage neurons. Amyloid buildup begins 10-20 years before symptoms--the earliest detectable change.
                    <Citation index={2} />
                  </p>
                </>
              ),
            },
            {
              label: 'Tau Tangles',
              content: (
                <>
                  <p>
                    Tau is a protein that stabilizes microtubules (the neuron\'s internal transport system). In Alzheimer, tau becomes abnormally phosphorylated, detaches from microtubules, and twists into neurofibrillary tangles inside neurons. This collapses the transport system, starving neurons of nutrients and leading to cell death. Tau tangles correlate more closely with symptom severity than amyloid plaques do.
                    <Citation index={3} />
                  </p>
                </>
              ),
            },
            {
              label: 'Neurodegeneration',
              content: (
                <>
                  <p>
                    As plaques and tangles accumulate, neurons die, synapses (connections) are lost, and brain tissue shrinks. The hippocampus (critical for forming new memories) and entorhinal cortex are first affected, explaining why short-term memory loss is the earliest symptom. Later, cortex (thinking, language, judgment) degenerates. Brain scans show progressive atrophy.
                    <Citation index={5} />
                  </p>
                </>
              ),
            },
          ]}
        />

        <StatCard
          stats={[
            { value: '10-20', suffix: ' years', label: 'Preclinical phase (brain changes before symptoms)', description: 'Amyloid accumulation detectable on PET scans years before memory loss appears.' },
            { value: '25-30%', label: 'Brain shrinkage in severe Alzheimer', description: 'Hippocampus and cortex lose significant volume as neurons die.' },
          ]}
        />

        <h2>Symptom Progression: The Journey Through Alzheimer</h2>
        <p>
          Alzheimer progresses through predictable stages, though pace and exact trajectory vary. Understanding stages helps families prepare and plan.
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Preclinical Alzheimer (No Symptoms)',
              content: (
                <>
                  <p>
                    Brain changes (amyloid plaques, early tau tangles) are present, but person functions normally. Only detectable via biomarkers (PET scans, CSF analysis). This phase can last 10-20 years. Most people in preclinical stage will develop symptoms if they live long enough, but not all. Research focuses on interventions during this window.
                    <Citation index={1} />
                  </p>
                </>
              ),
            },
            {
              title: 'Mild Cognitive Impairment (MCI)',
              content: (
                <>
                  <p>
                    Noticeable memory or thinking problems beyond normal aging but not severe enough to interfere with daily life. Person is aware of changes and may feel frustrated. Not everyone with MCI has Alzheimer--some have vascular issues, medications, or other causes. Fifteen to twenty percent of people with MCI progress to dementia per year; 50% within 5 years.
                    <Citation index={6} />
                  </p>
                </>
              ),
            },
            {
              title: 'Mild Alzheimer Dementia',
              content: (
                <>
                  <p>
                    Memory loss disrupts daily life: forgetting recent events, repeating questions, difficulty managing finances, getting lost in familiar places, misplacing items. Judgment impaired--poor decisions, vulnerability to scams. Personality changes--withdrawal, apathy, irritability. Person can still live independently with support. Duration: 2-4 years.
                    <Citation index={4} />
                  </p>
                </>
              ),
            },
            {
              title: 'Moderate Alzheimer Dementia',
              content: (
                <>
                  <p>
                    Severe memory gaps: forgetting personal history, not recognizing family members. Confusion about time, date, location. Language difficulties--struggling to find words, using wrong words. Need help with dressing, bathing, toileting. Behavioral changes common--wandering, agitation, sundowning (worse confusion in evenings), suspicion, hallucinations. Requires supervision. Duration: 2-10 years (longest stage).
                    <Citation index={4} />
                  </p>
                </>
              ),
            },
            {
              title: 'Severe Alzheimer Dementia',
              content: (
                <>
                  <p>
                    Profound memory loss--cannot communicate coherently, recognize loved ones, or recall personal history. Loss of physical abilities: difficulty walking, swallowing, bladder/bowel control. Vulnerable to infections (pneumonia, UTIs) and malnutrition. Complete dependence on caregivers. End-stage Alzheimer is terminal--complications like pneumonia or immobility cause death. Duration: 1-3 years.
                    <Citation index={4} />
                  </p>
                </>
              ),
            },
          ]}
        />

        <h2>How Alzheimer Is Diagnosed</h2>
        <p>
          No single test diagnoses Alzheimer definitively during life (only autopsy confirms). Diagnosis is clinical, based on converging evidence:
        </p>

        <ProgressSteps
          steps={[
            {
              title: 'Clinical History',
              description: 'Detailed interview about symptom onset, progression, impact on daily life. Family history, medical history, medications reviewed. Informant (family member) perspective critical--person with dementia may not recognize deficits.',
            },
            {
              title: 'Cognitive Testing',
              description: 'Standardized tests assess memory, attention, language, problem-solving. Common tools: MMSE (Mini-Mental State Exam), MoCA (Montreal Cognitive Assessment). Scores indicate severity. Neuropsychological testing provides detailed cognitive profile.',
            },
            {
              title: 'Physical and Neurological Exam',
              description: 'Rule out other causes: infections, medications, vitamin deficiencies (B12, thyroid), strokes, tumors. Assess reflexes, balance, sensory function.',
            },
            {
              title: 'Brain Imaging',
              description: 'MRI or CT scans show brain structure--atrophy (shrinkage) in hippocampus and cortex supports Alzheimer diagnosis. PET scans can detect amyloid plaques or tau tangles, or show glucose metabolism patterns.',
            },
            {
              title: 'Biomarker Testing (Emerging)',
              description: 'CSF analysis (lumbar puncture) measures amyloid and tau--low amyloid + high tau = Alzheimer pathology. Blood tests for amyloid and tau are emerging but not yet standard. Biomarkers confirm diagnosis but not required.',
            },
          ]}
        />

        <ArticleCallout
          type="warning"
          title="Diagnosis Is Often Delayed"
          content="Many people wait years before seeking evaluation--attributing symptoms to normal aging or minimizing concerns. Earlier diagnosis allows earlier treatment, better planning, and access to clinical trials. If you notice progressive memory loss, see a doctor."
        />

        <QuoteBlock
          quote="Alzheimer diagnosis is not an ending--it is information. Information allows you to fight, to plan, to live fully in the time you have."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },

  {
    id: catId(13),
    slug: 'treatment-and-management-of-alzheimer-disease',
    status: 'published',
    title: 'Treatment and Management of Alzheimer Disease',
    description:
      'Review current medications, emerging therapies, and comprehensive care strategies for Alzheimer--from cholinesterase inhibitors to lifestyle interventions.',
    image: '/images/articles/cat17/cover-013.svg',
    category: CATEGORY_AGING,
    readTime: 15,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Alzheimer', 'Treatment', 'Medications', 'Care Management'],

    summary:
      'No cure for Alzheimer disease exists, but treatments slow progression, manage symptoms, and improve quality of life. Medications include cholinesterase inhibitors (donepezil, rivastigmine, galantamine) for mild-moderate disease, which boost acetylcholine levels and improve cognition modestly; memantine for moderate-severe disease, which regulates glutamate. Disease-modifying drugs (aducanumab, lecanemab) target amyloid plaques and show small benefits in early disease. Non-drug approaches are equally critical: cognitive stimulation, physical exercise, social engagement, structured routines, environmental modifications (safety, simplicity). Managing behavioral symptoms (agitation, sleep disturbances) with non-pharmacological strategies first, medications if necessary. Comprehensive care includes legal/financial planning, caregiver support, advance directives. Treatment is individualized, multidisciplinary, and evolves as disease progresses.',

    keyFacts: [
      {
        text: 'Cholinesterase inhibitors improve cognition and function in 30-50% of people with mild-moderate Alzheimer.',
        citationIndex: 1,
      },
      {
        text: 'Aerobic exercise 3-5x per week may slow cognitive decline and hippocampal atrophy.',
        citationIndex: 2,
      },
      {
        text: 'Disease-modifying drugs (lecanemab, donanemab) reduce amyloid plaques but have modest clinical effects and serious risks.',
        citationIndex: 3,
      },
      {
        text: 'Behavioral symptoms (agitation, aggression) respond better to environmental changes than medications.',
        citationIndex: 4,
      },
      {
        text: 'Comprehensive care planning--legal, financial, end-of-life--should begin while the person can still participate in decisions.',
        citationIndex: 4,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Alzheimer treatment is not about stopping the unstoppable--it is about slowing, soothing, and staying connected for as long as possible.',

    practicalExercise: {
      title: 'Building a Comprehensive Care Plan',
      steps: [
        {
          title: 'Medication Management',
          description: 'Start cholinesterase inhibitor (donepezil most common) if mild-moderate Alzheimer. Monitor for side effects (nausea, diarrhea, insomnia). Add memantine if moderate-severe. Discuss disease-modifying drugs with neurologist if early-stage.',
        },
        {
          title: 'Lifestyle Interventions',
          description: 'Exercise 30 minutes daily (walking, swimming). Social engagement (groups, volunteering, family visits). Cognitive activities (puzzles, reading, music). Mediterranean diet. These amplify medication effects.',
        },
        {
          title: 'Environmental Modifications',
          description: 'Simplify home layout, remove clutter, label drawers/doors, install grab bars, improve lighting. Reduce noise and distractions. Create structured daily routine. Safety: locks on stove, car keys removed.',
        },
        {
          title: 'Behavioral Management',
          description: 'Identify triggers for agitation (hunger, pain, overstimulation). Use calm tone, simple sentences, redirection rather than confrontation. Music, aromatherapy, gentle touch can soothe. Medications only if non-drug strategies fail.',
        },
        {
          title: 'Legal and Financial Planning',
          description: 'While person can still participate: advance directives, power of attorney, will, long-term care insurance. Discuss wishes for care, living arrangements, end-of-life preferences.',
        },
      ],
      toolLink: '/resources/alzheimers-care-planning',
      toolLabel: 'Care Planning Guide',
    },

    citations: [
      {
        id: '1',
        text: 'Birks & Harvey (2018). Donepezil for dementia due to Alzheimer disease. Cochrane Database of Systematic Reviews, 6(6), CD001190.',
        source: 'Cochrane Database of Systematic Reviews',
        year: '2018',
        link: 'https://doi.org/10.1002/14651858.CD001190.pub3',
        tier: 1,
      },
      {
        id: '2',
        text: 'Erickson et al. (2011). Exercise training increases size of hippocampus and improves memory. PNAS, 108(7), 3017-3022.',
        source: 'PNAS',
        year: '2011',
        link: 'https://doi.org/10.1073/pnas.1015950108',
        tier: 1,
      },
      {
        id: '3',
        text: 'van Dyck et al. (2023). Lecanemab in early Alzheimer disease. New England Journal of Medicine, 388(1), 9-21.',
        source: 'New England Journal of Medicine',
        year: '2023',
        link: 'https://doi.org/10.1056/NEJMoa2212948',
        tier: 1,
      },
      {
        id: '4',
        text: 'Livingston et al. (2020). Dementia prevention, intervention, and care: 2020 report of the Lancet Commission. The Lancet, 396(10248), 413-446.',
        source: 'The Lancet',
        year: '2020',
        link: 'https://doi.org/10.1016/S0140-6736(20)30367-6',
        tier: 1,
      },
      {
        id: '5',
        text: 'Reus et al. (2016). The American Psychiatric Association practice guideline on the use of antipsychotics to treat agitation or psychosis in patients with dementia. American Journal of Psychiatry, 173(5), 543-546.',
        source: 'American Journal of Psychiatry',
        year: '2016',
        link: 'https://doi.org/10.1176/appi.ajp.2015.173501',
        tier: 4,
      },
      {
        id: '6',
        text: 'Schneider et al. (2006). Effectiveness of atypical antipsychotic drugs in patients with Alzheimer disease. New England Journal of Medicine, 355(15), 1525-1538.',
        source: 'New England Journal of Medicine',
        year: '2006',
        link: 'https://doi.org/10.1056/NEJMoa061240',
        tier: 1,
      },
      {
        id: '7',
        text: 'Brodaty & Arasaratnam (2012). Meta-analysis of nonpharmacological interventions for neuropsychiatric symptoms of dementia. American Journal of Psychiatry, 169(9), 946-953.',
        source: 'American Journal of Psychiatry',
        year: '2012',
        link: 'https://doi.org/10.1176/appi.ajp.2012.11101529',
        tier: 1,
      },
      {
        id: '8',
        text: 'Alzheimer\'s Association (2024). 2024 Alzheimer\'s disease facts and figures. Alzheimer\'s & Dementia, 20(5), 3708-3821.',
        source: 'Alzheimer\'s & Dementia',
        year: '2024',
        link: 'https://doi.org/10.1002/alz.13809',
        tier: 3,
      },
    ],

    content: (
      <>
        <h2>Medications for Alzheimer: What They Do and Do Not Do</h2>
        <p>
          Current medications do not cure Alzheimer or stop its progression completely--they modestly slow decline and improve symptoms temporarily. Two classes are FDA-approved:
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Cholinesterase Inhibitors',
              content: (
                <>
                  <p>
                    Donepezil (Aricept), rivastigmine (Exelon), galantamine (Razadyne). Mechanism: prevent breakdown of acetylcholine (a neurotransmitter critical for learning and memory) in the brain. By increasing acetylcholine levels, these drugs enhance communication between neurons. Approved for mild-moderate Alzheimer. Effects: modest improvements in cognition, function, and behavior in 30-50% of people. Average benefit: 6-12 months delay in symptom progression. Side effects: nausea, diarrhea, insomnia, muscle cramps (usually mild and transient).
                    <Citation index={1} />
                  </p>
                </>
              ),
            },
            {
              label: 'Memantine',
              content: (
                <>
                  <p>
                    Namenda. Mechanism: blocks NMDA receptors to regulate glutamate (excitatory neurotransmitter). Excess glutamate damages neurons; memantine prevents overstimulation. Approved for moderate-severe Alzheimer. Effects: slows decline in daily functioning, reduces behavioral symptoms. Can be combined with cholinesterase inhibitors. Side effects: dizziness, headache, confusion (less common than cholinesterase inhibitors).
                    <Citation index={8} />
                  </p>
                </>
              ),
            },
            {
              label: 'Disease-Modifying Drugs',
              content: (
                <>
                  <p>
                    Aducanumab (Aduhelm, controversial approval 2021), lecanemab (Leqembi, 2023), donanemab (2024). Mechanism: monoclonal antibodies that target and clear amyloid plaques from the brain. Approved for early Alzheimer (mild cognitive impairment or mild dementia with confirmed amyloid pathology). Effects: reduce amyloid on brain scans and slow cognitive decline by 20-30% (small but statistically significant). Serious risks: brain swelling (ARIA-E) and microbleeds (ARIA-H) in 10-20% of people. Requires regular MRI monitoring and intravenous infusions.
                    <Citation index={3} />
                  </p>
                </>
              ),
            },
          ]}
        />

        <ArticleCallout
          type="warning"
          title="Medications Are Not Magic Bullets"
          content="Cholinesterase inhibitors and memantine provide modest, temporary benefits--they do not reverse Alzheimer. Disease-modifying drugs show promise but have serious risks and high costs. Medication is one component of comprehensive care, not a standalone solution."
        />

        <h2>Lifestyle and Non-Drug Interventions: The Foundation</h2>
        <p>
          Non-pharmacological approaches are as important as medications--sometimes more so. They address cognition, behavior, and quality of life without side effects.
        </p>

        <StatCard
          stats={[
            { value: '30-40%', label: 'Reduction in cognitive decline with regular aerobic exercise', description: 'Exercise increases blood flow to the brain, promotes neurogenesis, and reduces inflammation.' },
            { value: '50%', label: 'Reduction in behavioral symptoms with structured activities', description: 'Cognitive stimulation, music therapy, and social engagement reduce agitation and depression.' },
          ]}
        />

        <ArticleAccordion
          items={[
            {
              title: 'Physical Exercise',
              content: (
                <>
                  <p>
                    Aerobic exercise (walking, swimming, dancing) 30+ minutes, 3-5 days per week improves cognition, slows hippocampal atrophy, and enhances mood. Even in moderate-severe dementia, physical activity reduces agitation and improves sleep. Exercise may be more effective than any medication currently available.
                    <Citation index={2} />
                  </p>
                </>
              ),
            },
            {
              title: 'Cognitive Stimulation',
              content: (
                <>
                  <p>
                    Activities that engage thinking: puzzles, reading, reminiscence therapy (recalling past experiences), art, music. Does not prevent decline but slows it and improves quality of life. Music therapy especially powerful--even people who cannot speak can sing familiar songs. Engagement matters more than difficulty level.
                    <Citation index={7} />
                  </p>
                </>
              ),
            },
            {
              title: 'Social Engagement',
              content: (
                <>
                  <p>
                    Loneliness and isolation accelerate cognitive decline. Regular social interaction--family visits, adult day programs, support groups, faith communities--provides stimulation, purpose, and emotional connection. Social engagement is protective at every stage.
                    <Citation index={4} />
                  </p>
                </>
              ),
            },
            {
              title: 'Environmental Modifications',
              content: (
                <>
                  <p>
                    Simplify the environment to reduce confusion and improve safety. Remove clutter, label cabinets and doors, use contrasting colors for visibility, install grab bars in bathroom, improve lighting. Structured routines reduce anxiety. Minimize noise and distractions. Small changes have big effects.
                    <Citation index={8} />
                  </p>
                </>
              ),
            },
          ]}
        />

        <h2>Managing Behavioral and Psychological Symptoms</h2>
        <p>
          Eighty to ninety percent of people with Alzheimer develop behavioral symptoms: agitation, aggression, wandering, hallucinations, sleep disturbances, apathy. These are often more distressing than memory loss. Non-drug strategies are first-line:
        </p>

        <ProgressSteps
          steps={[
            {
              title: 'Identify Triggers',
              description: 'Agitation usually has a cause: pain, hunger, need for bathroom, overstimulation, unfamiliar environment. Observe patterns. Address the underlying need.',
            },
            {
              title: 'Use Calm, Simple Communication',
              description: 'Speak slowly, use short sentences, maintain eye contact. Avoid arguing or correcting--person cannot remember reality. Validate feelings ("I see you are upset") and redirect.',
            },
            {
              title: 'Engage in Soothing Activities',
              description: 'Music, gentle touch, aromatherapy, pet therapy, familiar objects. What calms varies by person--trial and error. Distraction often more effective than confrontation.',
            },
            {
              title: 'Medications Only When Necessary',
              description: 'Antipsychotics (risperidone, quetiapine) are sometimes used for severe aggression or psychosis, but increase risk of stroke and death. Use lowest dose for shortest time. Benzodiazepines worsen confusion and fall risk. SSRIs or trazodone safer for depression or sleep issues.',
            },
          ]}
        />

        <ArticleCallout
          type="info"
          title="Behavioral Symptoms Are Communication"
          content="Agitation, wandering, and resistance are not defiance--they are the brain\'s way of expressing unmet needs. Pain, fear, boredom, and overstimulation cannot be verbalized, so they emerge as behavior. The goal is not to suppress behavior but to understand and address its cause."
        />

        <h2>Comprehensive Care Planning</h2>
        <p>
          Alzheimer care extends beyond medications and daily management--it includes legal, financial, and end-of-life planning. Early planning, while person can still participate, honors autonomy and reduces family conflict.
        </p>

        <BeforeAfter
          before={{
            title: 'What to Plan Early',
            points: [
              'Advance directives: living will, durable power of attorney for healthcare',
              'Financial power of attorney: designate someone to manage finances',
              'Will and estate planning: distribute assets, appoint guardians',
              'Long-term care preferences: in-home care, assisted living, nursing home',
              'End-of-life wishes: resuscitation, feeding tubes, hospice',
            ],
          }}
          after={{
            title: 'Resources and Support',
            points: [
              'Alzheimer\'s Association: 24/7 helpline, education, support groups, care consultations',
              'Adult day programs: structured activities, socialization, respite for caregivers',
              'Respite care: temporary in-home or facility care to relieve caregivers',
              'Hospice care: end-of-life comfort care when disease progresses',
              'Legal aid: elder law attorneys for estate planning and guardianship',
            ],
          }}
        />

        <QuoteBlock
          quote="Alzheimer care is not a battle you win or lose--it is a journey you navigate with love, patience, and the best tools available."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },

  {
    id: catId(14),
    slug: 'vascular-dementia-lewy-body-and-other-types',
    status: 'published',
    title: 'Vascular Dementia, Lewy Body, and Other Types',
    description:
      'Explore non-Alzheimer dementias--from vascular dementia caused by strokes to Lewy body dementia with hallucinations and frontotemporal dementia.',
    image: '/images/articles/cat17/cover-014.svg',
    category: CATEGORY_AGING,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Vascular Dementia', 'Lewy Body', 'Frontotemporal Dementia', 'Neurology'],

    summary:
      'While Alzheimer disease is the most common cause of dementia, other types account for 20-40% of cases and present distinct symptoms and trajectories. Vascular dementia results from reduced blood flow to the brain (strokes, small vessel disease) and manifests as executive dysfunction, slowed thinking, and stepwise decline. Lewy body dementia involves abnormal protein deposits, visual hallucinations, fluctuating cognition, and Parkinsonian motor symptoms. Frontotemporal dementia affects frontal and temporal lobes, causing personality and behavior changes, language difficulties, and earlier onset (40s-60s). Mixed dementia (multiple pathologies) is increasingly recognized. Treatment is tailored to type: vascular risk factor management for vascular dementia, cautious medication use for Lewy body, supportive care for frontotemporal. Accurate diagnosis matters because treatments and prognoses differ.',

    keyFacts: [
      {
        text: 'Vascular dementia is the second most common type (15-20% of cases), often co-existing with Alzheimer.',
        citationIndex: 1,
      },
      {
        text: 'Lewy body dementia affects 5-10% of dementia cases; hallucinations and motor symptoms distinguish it from Alzheimer.',
        citationIndex: 2,
      },
      {
        text: 'Frontotemporal dementia has younger onset (average age 58) and stronger genetic component than Alzheimer.',
        citationIndex: 3,
      },
      {
        text: 'Mixed dementia (Alzheimer + vascular + Lewy body) is found in 30-50% of autopsied brains.',
        citationIndex: 4,
      },
      {
        text: 'Antipsychotic medications can cause severe, life-threatening reactions in Lewy body dementia--extreme caution required.',
        citationIndex: 2,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Not all dementia is Alzheimer--and knowing the difference shapes how we care, how we treat, and how we hope.',

    practicalExercise: {
      title: 'Recognizing Different Dementia Types',
      steps: [
        {
          title: 'Vascular Dementia Clues',
          description: 'History of strokes, hypertension, diabetes, heart disease. Stepwise decline (sudden worsening after strokes). Executive dysfunction (planning, organizing) more prominent than memory loss early on. Gait disturbances, urinary urgency.',
        },
        {
          title: 'Lewy Body Dementia Clues',
          description: 'Visual hallucinations (seeing people, animals that are not there). Fluctuating cognition (lucid one day, confused the next). Parkinsonian symptoms (tremor, rigidity, slow movement). REM sleep behavior disorder (acting out dreams). Extreme sensitivity to antipsychotic medications.',
        },
        {
          title: 'Frontotemporal Dementia Clues',
          description: 'Younger onset (40s-60s). Personality and behavior changes first: disinhibition (inappropriate comments, impulsive actions), apathy, compulsive behaviors (rituals, hoarding). Language difficulties (trouble finding words, using wrong words). Memory relatively preserved until later.',
        },
        {
          title: 'When to Suspect Mixed Dementia',
          description: 'Symptoms do not fit one pattern neatly. Faster decline than expected. Both memory loss (Alzheimer-like) and executive dysfunction (vascular-like). Hallucinations plus memory loss. Autopsy often reveals multiple pathologies.',
        },
        {
          title: 'Seek Specialist Diagnosis',
          description: 'Neurologist or geriatrician performs detailed workup: history, cognitive testing, brain imaging (MRI/PET), sometimes CSF analysis or genetic testing. Accurate diagnosis guides treatment and prognosis.',
        },
      ],
      toolLink: '/resources/dementia-types-comparison',
      toolLabel: 'Compare Dementia Types',
    },

    citations: [
      {
        id: '1',
        text: 'Iadecola (2013). The pathobiology of vascular dementia. Neuron, 80(4), 844-866.',
        source: 'Neuron',
        year: '2013',
        link: 'https://doi.org/10.1016/j.neuron.2013.10.008',
        tier: 1,
      },
      {
        id: '2',
        text: 'McKeith et al. (2017). Diagnosis and management of dementia with Lewy bodies. Neurology, 89(1), 88-100.',
        source: 'Neurology',
        year: '2017',
        link: 'https://doi.org/10.1212/WNL.0000000000004058',
        tier: 4,
      },
      {
        id: '3',
        text: 'Bang et al. (2015). Frontotemporal dementia. The Lancet, 386(10004), 1672-1682.',
        source: 'The Lancet',
        year: '2015',
        link: 'https://doi.org/10.1016/S0140-6736(15)00461-4',
        tier: 1,
      },
      {
        id: '4',
        text: 'Jellinger & Attems (2007). Neuropathological evaluation of mixed dementia. Journal of the Neurological Sciences, 257(1-2), 80-87.',
        source: 'Journal of the Neurological Sciences',
        year: '2007',
        link: 'https://doi.org/10.1016/j.jns.2007.01.045',
        tier: 1,
      },
      {
        id: '5',
        text: 'Gorelick et al. (2011). Vascular contributions to cognitive impairment and dementia. Stroke, 42(9), 2672-2713.',
        source: 'Stroke',
        year: '2011',
        link: 'https://doi.org/10.1161/STR.0b013e3182299496',
        tier: 4,
      },
      {
        id: '6',
        text: 'Gomperts (2016). Lewy body dementias: Dementia with Lewy bodies and Parkinson disease dementia. Continuum, 22(2), 435-463.',
        source: 'Continuum',
        year: '2016',
        link: 'https://doi.org/10.1212/CON.0000000000000309',
        tier: 1,
      },
      {
        id: '7',
        text: 'Rabinovici & Miller (2010). Frontotemporal lobar degeneration. CNS Drugs, 24(5), 375-398.',
        source: 'CNS Drugs',
        year: '2010',
        link: 'https://doi.org/10.2165/11533100-000000000-00000',
        tier: 1,
      },
      {
        id: '8',
        text: 'Alzheimer\'s Association (2024). 2024 Alzheimer\'s disease facts and figures. Alzheimer\'s & Dementia, 20(5), 3708-3821.',
        source: 'Alzheimer\'s & Dementia',
        year: '2024',
        link: 'https://doi.org/10.1002/alz.13809',
        tier: 3,
      },
    ],

    content: (
      <>
        <h2>Vascular Dementia: When Blood Flow Fails</h2>
        <p>
          Vascular dementia is the second most common type of dementia, caused by reduced or blocked blood flow to the brain. Unlike Alzheimer, where protein accumulation kills neurons, vascular dementia results from vascular damage--strokes (large or small), chronic small vessel disease, or brain hemorrhages. The brain is starved of oxygen and nutrients, leading to tissue death.
          <Citation index={1} />
        </p>

        <p>
          Vascular dementia often overlaps with Alzheimer (mixed dementia), making pure vascular dementia less common than once thought. Risk factors are the same as for stroke: hypertension, diabetes, high cholesterol, smoking, atrial fibrillation, obesity. Prevention focuses on vascular health--control blood pressure, manage diabetes, exercise, do not smoke.
          <Citation index={5} />
        </p>

        <StatCard
          value="15-20%"
          label="Dementia cases caused by vascular pathology"
          description="Often co-exists with Alzheimer plaques/tangles (mixed dementia)."
          source={<Citation index={8} />}
        />

        <ArticleAccordion
          items={[
            {
              title: 'Symptoms of Vascular Dementia',
              content: (
                <>
                  <p>
                    Executive dysfunction (planning, organizing, decision-making) is often more prominent than memory loss--unlike Alzheimer, where memory fails first. Slowed thinking, difficulty with complex tasks, trouble following multi-step instructions. Gait disturbances (unsteady, shuffling), urinary urgency or incontinence. Depression, apathy, emotional lability. Symptoms depend on location and extent of vascular damage.
                    <Citation index={1} />
                  </p>
                </>
              ),
            },
            {
              title: 'Progression of Vascular Dementia',
              content: (
                <>
                  <p>
                    Progression is often stepwise: sudden worsening after each stroke, then plateaus or slight improvement. This contrasts with Alzheimer gradual, steady decline. However, chronic small vessel disease can cause slow, progressive decline similar to Alzheimer, making diagnosis challenging.
                    <Citation index={5} />
                  </p>
                </>
              ),
            },
            {
              title: 'Treatment and Prevention',
              content: (
                <>
                  <p>
                    No medications reverse vascular dementia, but managing vascular risk factors can slow or prevent further damage: control hypertension (target less than 130/80), treat diabetes (HbA1c less than 7%), lower cholesterol (statins), antiplatelet therapy (aspirin, clopidogrel) if history of stroke, anticoagulation if atrial fibrillation. Lifestyle: exercise, Mediterranean diet, smoking cessation. Cholinesterase inhibitors (donepezil) sometimes used but evidence weaker than for Alzheimer.
                    <Citation index={5} />
                  </p>
                </>
              ),
            },
          ]}
        />

        <h2>Lewy Body Dementia: Hallucinations and Fluctuations</h2>
        <p>
          Dementia with Lewy bodies (DLB) is caused by abnormal deposits of alpha-synuclein protein (Lewy bodies) in the brain. It shares features with both Alzheimer (dementia) and Parkinson disease (motor symptoms), but has distinct characteristics that set it apart.
          <Citation index={2} />
        </p>

        <p>
          DLB is often misdiagnosed as Alzheimer or Parkinson dementia because symptoms overlap. Distinguishing it matters because treatment differs--antipsychotic medications (commonly used for Alzheimer behavioral symptoms) can cause severe, life-threatening reactions in DLB patients.
          <Citation index={6} />
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Core Features',
              content: (
                <>
                  <ul>
                    <li><strong>Visual hallucinations</strong>: Seeing people, animals, or objects that are not there. Detailed, recurrent, and occur early in the disease. Not distressing to patient initially.</li>
                    <li><strong>Fluctuating cognition</strong>: Good days and bad days. Periods of lucidity alternating with confusion, drowsiness, or incoherence. Fluctuations occur within hours or days.</li>
                    <li><strong>Parkinsonian motor symptoms</strong>: Tremor, rigidity, slow movement, shuffling gait, balance problems. Occur early, not just late-stage.</li>
                    <li><strong>REM sleep behavior disorder</strong>: Acting out dreams--punching, kicking, talking during sleep. Often precedes dementia by years.</li>
                  </ul>
                  <Citation index={2} />
                </>
              ),
            },
            {
              label: 'Diagnosis',
              content: (
                <>
                  <p>
                    Clinical diagnosis based on core features. DaTscan (dopamine transporter imaging) can support diagnosis by showing reduced dopamine in basal ganglia. MRI may show less hippocampal atrophy than Alzheimer. Autopsy confirms Lewy bodies in cortex and brainstem.
                    <Citation index={2} />
                  </p>
                </>
              ),
            },
            {
              label: 'Treatment',
              content: (
                <>
                  <p>
                    Cholinesterase inhibitors (rivastigmine preferred) improve cognition and reduce hallucinations in some people. Levodopa for motor symptoms, but use cautiously--can worsen hallucinations. **Avoid typical antipsychotics (haloperidol)--can cause severe rigidity, immobility, even death.** If hallucinations are distressing, quetiapine or clozapine may be safer. Non-drug strategies for behavior (calm environment, reassurance) preferred.
                    <Citation index={6} />
                  </p>
                </>
              ),
            },
          ]}
        />

        <ArticleCallout
          type="warning"
          title="Antipsychotics and Lewy Body Dementia: A Dangerous Combination"
          content="People with Lewy body dementia have extreme sensitivity to antipsychotic medications. Typical antipsychotics (haloperidol, risperidone) can cause severe neuroleptic sensitivity reactions: rigidity, immobility, confusion, worsening of Parkinsonian symptoms, and potentially death. Always inform doctors of DLB diagnosis before any medication changes."
        />

        <h2>Frontotemporal Dementia: Personality Before Memory</h2>
        <p>
          Frontotemporal dementia (FTD) is caused by degeneration of the frontal and temporal lobes of the brain. Unlike Alzheimer (memory-first) and vascular dementia (executive-first), FTD presents with personality and behavior changes or language difficulties--memory is relatively preserved until later stages. Younger onset (40s-60s) is characteristic.
          <Citation index={3} />
        </p>

        <StatCard
          value="58 years"
          label="Average age of FTD onset"
          description="Younger than Alzheimer (average 75) or vascular dementia (average 72)."
          source={<Citation index={3} />}
        />

        <ArticleAccordion
          items={[
            {
              title: 'Behavioral Variant FTD',
              content: (
                <>
                  <p>
                    Most common subtype (60% of FTD cases). Frontal lobe degeneration causes disinhibition (socially inappropriate comments, sexual advances, impulsive actions), apathy (loss of interest, motivation, emotions), compulsive behaviors (rituals, hoarding, repetitive actions), hyperorality (overeating, putting non-food items in mouth), lack of empathy. Personality changes are the first sign--family often reports "He is not the same person." Memory, language, and visuospatial skills intact early on.
                    <Citation index={7} />
                  </p>
                </>
              ),
            },
            {
              title: 'Primary Progressive Aphasia',
              content: (
                <>
                  <p>
                    Language difficulties dominate: trouble finding words, using wrong words, difficulty understanding speech, grammar errors. Three subtypes: semantic (loss of word meaning), non-fluent/agrammatic (effortful, halting speech), and logopenic (word-finding pauses). Behavior and memory relatively preserved early. Temporal lobe most affected.
                    <Citation index={7} />
                  </p>
                </>
              ),
            },
            {
              title: 'Diagnosis and Treatment',
              content: (
                <>
                  <p>
                    Clinical diagnosis based on behavioral or language symptoms. MRI shows frontal/temporal lobe atrophy. FDG-PET shows reduced glucose metabolism in affected regions. Genetic testing if family history (30-50% of FTD cases have genetic component--mutations in C9orf72, MAPT, GRN genes). No FDA-approved medications--SSRIs may help with disinhibition or compulsive behaviors. Focus on behavioral management, speech therapy, caregiver support. Progression often faster than Alzheimer.
                    <Citation index={3} />
                  </p>
                </>
              ),
            },
          ]}
        />

        <QuoteBlock
          quote="Frontotemporal dementia steals who you are before it steals what you remember. It is the cruelest reordering--the self dissolves while the mind still watches."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />

        <h2>Mixed Dementia: Multiple Pathologies</h2>
        <p>
          Autopsy studies reveal that many older adults have multiple brain pathologies: Alzheimer plaques and tangles, vascular changes (small strokes, white matter disease), Lewy bodies, or combinations thereof. This is called mixed dementia. It is increasingly recognized as common--perhaps 30-50% of dementia cases--rather than rare.
          <Citation index={4} />
        </p>

        <p>
          Mixed dementia complicates diagnosis and treatment. Symptoms may not fit neatly into one category. Decline may be faster than expected for single-type dementia. Treatment addresses all contributing factors: cholinesterase inhibitors for Alzheimer component, vascular risk factor management for vascular component, cautious medication use if Lewy bodies suspected.
          <Citation index={4} />
        </p>

        <BeforeAfter
          before={{
            title: 'Why Mixed Dementia Matters',
            points: [
              'Explains why some people do not respond to Alzheimer medications--other pathologies are driving decline',
              'Highlights importance of comprehensive diagnosis--treating one pathology ignores others',
              'Suggests that preventing vascular damage (hypertension, diabetes) may slow Alzheimer progression',
              'Challenges the idea of pure dementia types--the brain is complex, pathologies interact',
            ],
          }}
          after={{
            title: 'Implications for Treatment',
            points: [
              'Manage vascular risk factors even in diagnosed Alzheimer--may slow decline',
              'Use medications cautiously--multiple pathologies increase side effect risk',
              'Expect variable symptoms and progression--mixed dementia is unpredictable',
              'Focus on comprehensive care, not single-disease protocols',
            ],
          }}
        />
      </>
    ),
  },

  {
    id: catId(15),
    slug: 'risk-factors-and-prevention-of-dementia',
    status: 'published',
    title: 'Risk Factors and Prevention of Dementia',
    description:
      'Identify modifiable risk factors for dementia and evidence-based strategies to reduce risk--from cardiovascular health to cognitive reserve.',
    image: '/images/articles/cat17/cover-015.svg',
    category: CATEGORY_AGING,
    readTime: 14,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Prevention', 'Risk Factors', 'Lifestyle', 'Cognitive Reserve'],

    summary:
      'Age is the strongest dementia risk factor, but not destiny--up to 40% of dementia cases may be preventable through modifiable lifestyle factors. The Lancet Commission identifies 12 risk factors: less education, hearing loss, traumatic brain injury, hypertension, excessive alcohol, obesity, smoking, depression, social isolation, physical inactivity, diabetes, air pollution. Addressing these across the lifespan--early education, midlife cardiovascular health, late-life cognitive engagement--can delay or prevent dementia onset. Protective factors include higher education (builds cognitive reserve), regular exercise (increases brain-derived neurotrophic factor), Mediterranean diet, social engagement, cognitively stimulating activities, and treating hearing loss. No single intervention is magic, but combined lifestyle changes reduce risk by 30-40%. Prevention starts now, regardless of age.',

    keyFacts: [
      {
        text: 'Up to 40% of dementia cases worldwide are potentially preventable through modifying 12 risk factors.',
        citationIndex: 1,
      },
      {
        text: 'Physical activity reduces dementia risk by 30-40%, comparable to the strongest genetic risk factors.',
        citationIndex: 2,
      },
      {
        text: 'Hearing loss in midlife is the largest modifiable risk factor, accounting for 8% of dementia cases.',
        citationIndex: 1,
      },
      {
        text: 'Cognitive reserve (built through education, complex work, lifelong learning) delays symptom onset by 4-5 years.',
        citationIndex: 3,
      },
      {
        text: 'Even people with APOE-e4 gene (highest genetic risk) can reduce dementia risk through lifestyle--genes load the gun, lifestyle pulls the trigger.',
        citationIndex: 1,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Dementia is not written in your genes alone--it is written in how you live, and that is a story you can rewrite every day.',

    practicalExercise: {
      title: 'Building a Brain-Healthy Lifestyle',
      steps: [
        {
          title: 'Manage Cardiovascular Health',
          description: 'Control blood pressure (target less than 130/80), treat diabetes (HbA1c less than 7%), lower cholesterol if needed, quit smoking. What is good for the heart is good for the brain--vascular health matters.',
        },
        {
          title: 'Exercise Regularly',
          description: 'Thirty minutes of moderate aerobic activity (brisk walking, swimming, dancing) 5x per week. Strength training 2x per week. Exercise is the single most powerful dementia prevention strategy.',
        },
        {
          title: 'Engage Socially',
          description: 'Maintain friendships, join clubs/groups, volunteer, stay connected to community. Loneliness accelerates cognitive decline; social engagement is protective.',
        },
        {
          title: 'Challenge Your Brain',
          description: 'Learn new skills (language, musical instrument), read, puzzles, complex work tasks. Novelty and challenge build cognitive reserve--a buffer against dementia.',
        },
        {
          title: 'Treat Hearing Loss',
          description: 'Get hearing tested if you notice difficulty. Use hearing aids if recommended--untreated hearing loss in midlife increases dementia risk by 90%.',
        },
        {
          title: 'Eat a Mediterranean Diet',
          description: 'Emphasize vegetables, fruits, whole grains, fish, olive oil, nuts. Limit red meat, processed foods, sugar. Diet impacts brain health through inflammation, vascular health, and gut-brain axis.',
        },
        {
          title: 'Limit Alcohol',
          description: 'No more than 1 drink per day (women) or 2 per day (men). Heavy drinking damages the brain directly and increases dementia risk.',
        },
      ],
      toolLink: '/tools/brain-health-tracker',
      toolLabel: 'Track Lifestyle Factors',
    },

    citations: [
      {
        id: '1',
        text: 'Livingston et al. (2020). Dementia prevention, intervention, and care: 2020 report of the Lancet Commission. The Lancet, 396(10248), 413-446.',
        source: 'The Lancet',
        year: '2020',
        link: 'https://doi.org/10.1016/S0140-6736(20)30367-6',
        tier: 1,
      },
      {
        id: '2',
        text: 'Hörder et al. (2018). Midlife cardiovascular fitness and dementia: A 44-year longitudinal study. Annals of Internal Medicine, 168(11), 758-766.',
        source: 'Annals of Internal Medicine',
        year: '2018',
        link: 'https://doi.org/10.7326/M17-1974',
        tier: 1,
      },
      {
        id: '3',
        text: 'Stern (2012). Cognitive reserve in ageing and Alzheimer disease. The Lancet Neurology, 11(11), 1006-1012.',
        source: 'The Lancet Neurology',
        year: '2012',
        link: 'https://doi.org/10.1016/S1474-4422(12)70191-6',
        tier: 1,
      },
      {
        id: '4',
        text: 'Ngandu et al. (2015). A 2-year multidomain intervention of diet, exercise, cognitive training, and vascular risk monitoring versus control to prevent cognitive decline (FINGER). The Lancet, 385(9984), 2255-2263.',
        source: 'The Lancet',
        year: '2015',
        link: 'https://doi.org/10.1016/S0140-6736(15)60461-5',
        tier: 1,
      },
      {
        id: '5',
        text: 'Scarmeas et al. (2006). Mediterranean diet and risk for Alzheimer disease. Annals of Neurology, 59(6), 912-921.',
        source: 'Annals of Neurology',
        year: '2006',
        link: 'https://doi.org/10.1002/ana.20854',
        tier: 1,
      },
      {
        id: '6',
        text: 'Loughrey et al. (2018). Association of age-related hearing loss with cognitive function, cognitive impairment, and dementia. JAMA Otolaryngology--Head & Neck Surgery, 144(2), 115-126.',
        source: 'JAMA Otolaryngology--Head & Neck Surgery',
        year: '2018',
        link: 'https://doi.org/10.1001/jamaoto.2017.2513',
        tier: 1,
      },
      {
        id: '7',
        text: 'Xu et al. (2017). Education and risk of dementia: Dose-response meta-analysis. Neurology, 89(16), 1694-1701.',
        source: 'Neurology',
        year: '2017',
        link: 'https://doi.org/10.1212/WNL.0000000000004510',
        tier: 1,
      },
      {
        id: '8',
        text: 'National Institute on Aging (2023). Preventing Alzheimer Disease: What Do We Know?',
        source: 'National Institute on Aging',
        year: '2023',
        link: 'https://www.nia.nih.gov/health/alzheimers-and-dementia/preventing-alzheimers-disease-what-do-we-know',
        tier: 2,
      },
    ],

    content: (
      <>
        <h2>The Case for Prevention: 40% of Dementia Is Preventable</h2>
        <p>
          For decades, dementia was viewed as inevitable--an unavoidable consequence of aging. The 2020 Lancet Commission shattered this fatalism: up to 40% of dementia cases worldwide are potentially preventable by addressing 12 modifiable risk factors across the lifespan. This is not speculative--it is based on population-attributable fractions from rigorous epidemiological studies.
          <Citation index={1} />
        </p>

        <p>
          Prevention does not mean guarantee--even perfect lifestyle cannot eliminate dementia risk entirely. Genetics, aging, and chance still matter. But the evidence is clear: what you do across your life--how you eat, move, think, connect--shapes your brain health as much as your genes do. Prevention is not futile; it is powerful.
          <Citation index={8} />
        </p>

        <StatCard
          value="40%"
          label="Dementia cases potentially preventable"
          description="By addressing 12 modifiable risk factors: education, hearing loss, TBI, hypertension, alcohol, obesity, smoking, depression, isolation, inactivity, diabetes, air pollution."
          source={<Citation index={1} />}
        />

        <h2>The 12 Modifiable Risk Factors (Lancet Commission 2020)</h2>
        <p>
          The Lancet Commission identified risk factors across three life stages. Addressing these reduces dementia risk cumulatively--the more you tackle, the greater the benefit.
        </p>

        <ArticleTabs
          tabs={[
            {
              label: 'Early Life (Age 0-18)',
              content: (
                <>
                  <ul>
                    <li><strong>Less education</strong>: Contributes 7% of dementia risk. Education builds cognitive reserve--the brain capacity to compensate for damage. Each additional year of education reduces risk by 11%. Cognitive reserve delays symptom onset by 4-5 years, even when pathology is present.</li>
                  </ul>
                  <Citation index={7} />
                </>
              ),
            },
            {
              label: 'Midlife (Age 45-65)',
              content: (
                <>
                  <ul>
                    <li><strong>Hearing loss</strong>: 8% of risk. Largest single modifiable factor. Untreated hearing loss forces the brain to work harder, reduces social engagement, and may accelerate atrophy. Hearing aids reduce risk by 90% in those with hearing loss.</li>
                    <li><strong>Traumatic brain injury (TBI)</strong>: 3% of risk. Especially repeated concussions (sports, falls). TBI triggers neuroinflammation and tau pathology. Prevention: seatbelts, helmets, fall-proofing homes.</li>
                    <li><strong>Hypertension</strong>: 2% of risk. High blood pressure in midlife (age 40-60) damages small blood vessels in the brain, causing white matter lesions and microinfarcts. Treat to target (less than 130/80).</li>
                    <li><strong>Excessive alcohol</strong>: 1% of risk. More than 21 drinks per week increases risk. Alcohol is directly neurotoxic and causes thiamine deficiency (Korsakoff syndrome).</li>
                    <li><strong>Obesity</strong>: 1% of risk. BMI greater than 30 in midlife increases risk via inflammation, insulin resistance, vascular damage. Weight loss reduces risk.</li>
                  </ul>
                  <Citation index={1} />
                </>
              ),
            },
            {
              label: 'Later Life (Age 65+)',
              content: (
                <>
                  <ul>
                    <li><strong>Smoking</strong>: 5% of risk. Damages blood vessels, increases inflammation, accelerates brain atrophy. Quitting at any age reduces risk.</li>
                    <li><strong>Depression</strong>: 4% of risk. Unclear if depression is cause or early symptom of dementia, but treating depression improves cognition and may reduce risk.</li>
                    <li><strong>Social isolation</strong>: 4% of risk. Loneliness accelerates cognitive decline via stress, inflammation, and reduced stimulation. Social engagement is protective.</li>
                    <li><strong>Physical inactivity</strong>: 2% of risk. Exercise increases BDNF (brain-derived neurotrophic factor), promotes neurogenesis, reduces inflammation. Most powerful lifestyle intervention.</li>
                    <li><strong>Diabetes</strong>: 1% of risk. Insulin resistance, vascular damage, and inflammation link diabetes to dementia. Tight glucose control reduces risk.</li>
                    <li><strong>Air pollution</strong>: 2% of risk. PM2.5 (fine particulate matter) causes neuroinflammation and vascular damage. Reduce exposure where possible (air filters, avoid high-traffic areas).</li>
                  </ul>
                  <Citation index={1} />
                </>
              ),
            },
          ]}
        />

        <h2>Protective Factors: What Builds Brain Resilience</h2>
        <p>
          Prevention is not just avoiding risk--it is actively building cognitive reserve and brain health. Protective factors delay dementia onset even when pathology is present.
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Physical Exercise',
              content: (
                <>
                  <p>
                    The single most powerful dementia prevention strategy. Aerobic exercise (walking, swimming, cycling) 150 minutes per week reduces dementia risk by 30-40%. Exercise increases hippocampal volume, stimulates neurogenesis, improves vascular health, reduces inflammation, and boosts BDNF. Even starting exercise in later life provides benefits. Strength training and balance exercises add additional protection.
                    <Citation index={2} />
                  </p>
                </>
              ),
            },
            {
              title: 'Cognitive Reserve',
              content: (
                <>
                  <p>
                    Higher education, cognitively demanding work, lifelong learning, and novel activities build cognitive reserve--the brain ability to recruit alternative networks to compensate for damage. People with high cognitive reserve can have significant Alzheimer pathology (plaques, tangles) but remain cognitively normal. Reserve does not prevent pathology; it delays symptoms by 4-5 years. Build reserve through: learning new skills (languages, instruments), reading, puzzles, complex problem-solving, intellectually stimulating work.
                    <Citation index={3} />
                  </p>
                </>
              ),
            },
            {
              title: 'Mediterranean Diet',
              content: (
                <>
                  <p>
                    Emphasizes vegetables, fruits, whole grains, fish, olive oil, nuts; limits red meat and processed foods. Associated with 30-40% reduced Alzheimer risk. Mechanisms: anti-inflammatory, antioxidant-rich, supports vascular health, improves gut microbiome. MIND diet (Mediterranean-DASH Intervention for Neurodegenerative Delay) combines Mediterranean and DASH diets with emphasis on berries and leafy greens--shows even stronger cognitive benefits.
                    <Citation index={5} />
                  </p>
                </>
              ),
            },
            {
              title: 'Social Engagement',
              content: (
                <>
                  <p>
                    Frequent social interaction (daily contact with friends, family, community groups) reduces dementia risk by 30-50%. Social engagement provides cognitive stimulation, emotional support, purpose, and reduces stress. Loneliness is as harmful to the brain as smoking 15 cigarettes per day. Quality matters more than quantity--meaningful relationships are more protective than superficial contacts.
                    <Citation index={1} />
                  </p>
                </>
              ),
            },
            {
              title: 'Treating Hearing Loss',
              content: (
                <>
                  <p>
                    Hearing aids in people with midlife hearing loss reduce dementia risk by 90%. Hearing loss increases cognitive load (brain works harder to decode sounds), reduces social engagement, and may accelerate brain atrophy. Early treatment is critical--do not wait until hearing loss is severe. Annual hearing screenings after age 50 recommended.
                    <Citation index={6} />
                  </p>
                </>
              ),
            },
          ]}
        />

        <h2>Multidomain Interventions: Combining Strategies</h2>
        <p>
          No single intervention is a magic bullet--combined lifestyle changes are most effective. The FINGER trial (Finnish Geriatric Intervention Study) tested a multidomain intervention: diet, exercise, cognitive training, vascular risk monitoring in at-risk older adults. Results: 25% improvement in executive function, 83% improvement in processing speed compared to control group over 2 years.
          <Citation index={4} />
        </p>

        <ProgressSteps
          steps={[
            {
              title: 'Start Where You Are',
              description: 'Prevention is not all-or-nothing. Each risk factor you address reduces risk incrementally. Prioritize 2-3 changes that fit your life.',
            },
            {
              title: 'Focus on What You Can Control',
              description: 'You cannot change your age or genes, but you can change how you move, eat, think, and connect. Control what is controllable.',
            },
            {
              title: 'Build Habits, Not Perfection',
              description: 'Consistency matters more than intensity. Daily 30-minute walks beat occasional marathons. Small, sustainable changes compound over decades.',
            },
            {
              title: 'Start Early, Benefit Always',
              description: 'Prevention is most effective when started in midlife, but benefits accrue at any age. It is never too late to improve brain health.',
            },
          ]}
        />

        <BeforeAfter
          before={{
            title: 'High-Risk Lifestyle',
            points: [
              'Sedentary (no regular exercise)',
              'Poor diet (processed foods, low vegetables)',
              'Untreated hypertension, diabetes, high cholesterol',
              'Socially isolated, lonely',
              'Cognitively passive (no learning, no challenges)',
              'Heavy alcohol use, smoking',
              'Untreated hearing loss, depression',
            ],
          }}
          after={{
            title: 'Brain-Healthy Lifestyle',
            points: [
              'Exercise 150+ minutes per week (aerobic + strength)',
              'Mediterranean/MIND diet (vegetables, fish, olive oil, berries)',
              'Vascular health managed (BP less than 130/80, HbA1c less than 7%, cholesterol controlled)',
              'Socially engaged (daily meaningful interactions)',
              'Cognitively active (learning, reading, puzzles, complex work)',
              'Moderate/no alcohol, no smoking',
              'Hearing aids if needed, depression treated',
            ],
          }}
        />

        <ArticleCallout
          type="info"
          title="Genetics Is Not Destiny"
          content="APOE-e4 gene increases Alzheimer risk 3-fold (one copy) to 12-fold (two copies), but 50% of people with two e4 copies never develop dementia. Lifestyle modifies genetic risk--physically active e4 carriers have the same dementia risk as inactive non-carriers. Your genes load the gun; your lifestyle pulls the trigger."
        />

        <QuoteBlock
          quote="Dementia prevention is not about living longer--it is about living better. Every step, every connection, every challenge you give your brain is an investment in the future version of yourself."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
];
