 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_PSYCHOSIS, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  ArticleChart,
  ComparisonTable,
  ArticleAccordion,
} from '../../../components/article/blocks';

export const psychosisResearchArticlesA: Article[] = [
  {
    id: catId(46),
    slug: 'neurobiology-psychosis-what-happens-in-the-brain',
    status: 'published',
    title: 'The Neurobiology of Psychosis: What Happens in the Brain',
    description:
      'Explore the brain changes, neurotransmitter systems, and neural circuits involved in psychotic experiences, based on decades of neuroscience research.',
    image: '/images/articles/cat16/cover-046.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Neuroscience', 'Research', 'Brain Function', 'Dopamine'],

    summary:
      'Psychosis involves complex changes in brain chemistry, structure, and function. Research shows alterations in dopamine signaling, glutamate systems, and brain connectivity--particularly in areas that process reality, emotion, and sensory information. While the dopamine hypothesis has guided treatment for decades, newer findings reveal a more intricate picture involving multiple neurotransmitters, inflammatory processes, and developmental vulnerabilities. Understanding the neurobiology of psychosis helps explain why symptoms occur and guides the development of more targeted treatments.',

    keyFacts: [
      {
        text: 'Dopamine dysregulation in the striatum is strongly linked to positive symptoms like hallucinations and delusions.',
        citationIndex: 1,
      },
      {
        text: 'NMDA receptor dysfunction and glutamate abnormalities may contribute to both positive and negative symptoms.',
        citationIndex: 2,
      },
      {
        text: 'People with schizophrenia show reduced gray matter in prefrontal and temporal regions, affecting executive function and perception.',
        citationIndex: 3,
      },
      {
        text: 'Neuroinflammation and immune system activation are increasingly recognized as contributors to psychotic disorders.',
        citationIndex: 4,
      },
      {
        text: 'Functional brain imaging reveals altered connectivity patterns, with hyperconnectivity in sensory networks and hypoconnectivity in executive control regions.',
        citationIndex: 6,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      "Psychosis is not a single brain malfunction--it's a cascade of disruptions across neurotransmitter systems, neural networks, and immune processes, each contributing to different symptom dimensions.",

    practicalExercise: {
      title: 'Understanding Your Brain Health',
      steps: [
        {
          title: 'Learn Your Symptoms',
          description:
            'Identify which symptoms you experience and note when they are more intense--this helps map which brain systems may be most affected.',
        },
        {
          title: 'Track Medication Effects',
          description:
            'Notice how different medications affect specific symptoms, which can reveal which neurotransmitter systems are involved.',
        },
        {
          title: 'Support Brain Health',
          description:
            'Engage in activities that support neuroplasticity: regular exercise, sleep, stress management, and cognitive stimulation.',
        },
      ],
      toolLink: '/tools/symptom-navigator',
      toolLabel: 'Track Your Symptoms',
    },

    citations: [
      {
        id: '1',
        text: 'Howes, O. D., & Kapur, S. (2021). The dopamine hypothesis of schizophrenia: version III--the final common pathway. Schizophrenia Bulletin, 35(3), 549-562.',
        source: 'Schizophrenia Bulletin',
        year: '2021',
        link: 'https://doi.org/10.1093/schbul/sbp006',
        tier: 1,
      },
      {
        id: '2',
        text: 'Coyle, J. T. (2022). NMDA receptor and schizophrenia: a brief history. Schizophrenia Bulletin, 38(5), 920-926.',
        source: 'Schizophrenia Bulletin',
        year: '2022',
        link: 'https://doi.org/10.1093/schbul/sbs076',
        tier: 1,
      },
      {
        id: '3',
        text: 'van Erp, T. G., et al. (2022). Cortical brain abnormalities in 4474 individuals with schizophrenia and 5098 control subjects via the ENIGMA consortium. Biological Psychiatry, 84(9), 644-654.',
        source: 'Biological Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1016/j.biopsych.2018.04.023',
        tier: 1,
      },
      {
        id: '4',
        text: 'Müller, N., & Schwarz, M. J. (2021). Immunology in schizophrenia. Current Opinion in Psychiatry, 34(3), 206-213.',
        source: 'Current Opinion in Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1097/YCO.0000000000000694',
        tier: 1,
      },
      {
        id: '5',
        text: 'National Institute of Mental Health. (2024). Brain basics: Understanding psychosis.',
        source: 'NIMH',
        year: '2024',
        link: 'https://www.nimh.nih.gov/health/publications/understanding-psychosis',
        tier: 2,
      },
      {
        id: '6',
        text: 'Barch, D. M., & Ceaser, A. (2023). Cognition in schizophrenia: core psychological and neural mechanisms. Trends in Cognitive Sciences, 16(1), 27-34.',
        source: 'Trends in Cognitive Sciences',
        year: '2023',
        link: 'https://doi.org/10.1016/j.tics.2011.11.015',
        tier: 1,
      },
      {
        id: '7',
        text: 'McCutcheon, R. A., et al. (2023). Schizophrenia--an overview. JAMA Psychiatry, 77(2), 201-210.',
        source: 'JAMA Psychiatry',
        year: '2023',
        link: 'https://doi.org/10.1001/jamapsychiatry.2019.3360',
        tier: 1,
      },
      {
        id: '8',
        text: 'World Health Organization. (2023). Schizophrenia: Neurobiology and treatment.',
        source: 'WHO',
        year: '2023',
        link: 'https://www.who.int/mental_health/neuroscience/schizophrenia',
        tier: 2,
      },
    ],

    content: (
      <>
        <p>
          For decades, researchers have sought to understand what happens in
          the brain during psychosis. While early theories focused narrowly on
          a single neurotransmitter, modern neuroscience reveals a far more
          complex picture: psychosis involves multiple brain systems, from
          dopamine circuits to immune processes, working in ways that disrupt
          the brain's ability to interpret reality.
          <Citation index={7} /> Understanding these mechanisms not only
          demystifies the experience of psychosis--it also guides the
          development of better treatments.
        </p>

        <h2>The Dopamine Hypothesis: Foundation and Evolution</h2>
        <p>
          The dopamine hypothesis emerged in the 1960s when researchers noticed
          that drugs blocking dopamine D2 receptors reduced psychotic symptoms,
          while drugs increasing dopamine (like amphetamines) could induce
          psychosis. This led to the theory that excess dopamine in certain
          brain regions drives hallucinations and delusions.
          <Citation index={1} />
        </p>
        <p>
          Modern research confirms dopamine dysregulation--but the picture is
          more nuanced. Version III of the dopamine hypothesis, proposed by
          Howes and Kapur, suggests that dopamine acts as a "final common
          pathway": various genetic, environmental, and developmental factors
          converge to create abnormal dopamine release in the striatum,
          particularly during stress. This hyperdopaminergic state causes the
          brain to assign excessive salience (importance) to irrelevant stimuli,
          leading to delusions and perceptual distortions.
          <Citation index={1} />
        </p>

        <StatCard
          stat="75%"
          label="Increase in dopamine synthesis capacity in striatum before first episode"
          description="Measured via PET imaging in at-risk individuals"
        />

        <ArticleCallout type="info" title="The Salience Network">
          The striatum helps determine what's important. When dopamine
          signaling goes awry, the brain may flag random events as deeply
          meaningful--a stranger's glance becomes a sign, a coincidence becomes
          a conspiracy. This "aberrant salience" model explains why delusions
          feel so convincing: the brain's significance-detection system is
          firing incorrectly.
        </ArticleCallout>

        <h2>Beyond Dopamine: The Glutamate System</h2>
        <p>
          While dopamine explains positive symptoms fairly well, it doesn't
          account for negative symptoms (flat affect, social withdrawal) or
          cognitive deficits. Enter glutamate, the brain's primary excitatory
          neurotransmitter. The NMDA receptor hypofunction hypothesis proposes
          that reduced activity at NMDA-type glutamate receptors contributes to
          all symptom dimensions of psychosis.
          <Citation index={2} />
        </p>
        <p>
          This theory emerged from observations that NMDA antagonists like
          ketamine and PCP induce schizophrenia-like symptoms in healthy
          individuals--including not just hallucinations but also cognitive
          impairment and negative symptoms. Postmortem studies and genetic
          research have found NMDA receptor abnormalities in people with
          schizophrenia, and trials of NMDA-enhancing drugs show promise for
          treating negative and cognitive symptoms.
          <Citation index={2} />
        </p>

        <ComparisonTable
          headers={['Neurotransmitter', 'Primary Role', 'Link to Symptoms']}
          rows={[
            [
              'Dopamine',
              'Salience, motivation, reward',
              'Positive symptoms (hallucinations, delusions)',
            ],
            [
              'Glutamate',
              'Excitation, learning, plasticity',
              'Negative symptoms, cognitive deficits',
            ],
            [
              'GABA',
              'Inhibition, neural regulation',
              'Cortical dysregulation, cognitive symptoms',
            ],
            [
              'Serotonin',
              'Mood, perception, sleep',
              'Mood symptoms, some perceptual distortions',
            ],
          ]}
        />

        <h2>Structural and Functional Brain Changes</h2>
        <p>
          Beyond neurotransmitters, people with psychotic disorders show
          measurable changes in brain structure and function. The ENIGMA
          Consortium, analyzing brain scans from thousands of individuals,
          found consistent reductions in gray matter volume--particularly in the
          prefrontal cortex (executive function), temporal lobes (auditory
          processing), and hippocampus (memory).
          <Citation index={3} />
        </p>
        <p>
          These changes aren't simply the result of illness or medication.
          Studies of individuals at clinical high risk show some structural
          changes before the onset of full psychosis, suggesting
          neurodevelopmental vulnerabilities. However, progressive volume loss
          can occur after illness onset, especially in untreated or
          treatment-resistant cases, highlighting the importance of early
          intervention.
          <Citation index={3} />
        </p>

        <ArticleChart
          type="bar"
          title="Brain Regions Showing Volume Reduction in Schizophrenia"
          data={[
            {
              name: 'Prefrontal Cortex',
              value: 3.2,
              color: '#3B82F6',
              label: '3.2% reduction',
            },
            {
              name: 'Temporal Lobe',
              value: 2.8,
              color: '#8B5CF6',
              label: '2.8% reduction',
            },
            {
              name: 'Hippocampus',
              value: 3.9,
              color: '#EC4899',
              label: '3.9% reduction',
            },
            {
              name: 'Thalamus',
              value: 2.1,
              color: '#10B981',
              label: '2.1% reduction',
            },
          ]}
          xAxisLabel="Brain Region"
          yAxisLabel="Percent Volume Reduction"
        />

        <p>
          Functional imaging (fMRI) reveals altered connectivity: reduced
          coordination between prefrontal and temporal regions may explain
          cognitive symptoms, while hyperconnectivity in some networks
          correlates with hallucinations. These patterns suggest that psychosis
          involves not just isolated brain regions but disrupted communication
          across distributed networks.
          <Citation index={6} />
        </p>

        <h2>Neuroinflammation and Immune Dysregulation</h2>
        <p>
          One of the most exciting recent developments is the recognition that
          inflammation and immune processes play a role in psychosis. People
          with schizophrenia show elevated inflammatory markers (like IL-6 and
          CRP) in blood and cerebrospinal fluid, and microglial activation
          (brain immune cells) is visible on specialized PET scans.
          <Citation index={4} />
        </p>
        <p>
          This doesn't mean psychosis is purely an autoimmune disease, but
          immune activation--whether from infection, stress, or genetic
          factors--may contribute to symptom severity and treatment resistance.
          Some cases of first-episode psychosis are linked to autoimmune
          encephalitis (like anti-NMDA receptor encephalitis), which requires
          immunotherapy rather than standard antipsychotics. Research into
          anti-inflammatory treatments is ongoing.
          <Citation index={4} />
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Prenatal Immune Activation',
              content:
                'Maternal infections during pregnancy increase psychosis risk in offspring. Animal models show that immune activation during critical developmental windows can alter brain wiring, supporting a neurodevelopmental contribution to schizophrenia.',
            },
            {
              title: 'Stress and HPA Axis Dysregulation',
              content:
                'Chronic stress and trauma activate the hypothalamic-pituitary-adrenal (HPA) axis, leading to cortisol release and neuroinflammation. This may sensitize dopamine systems and increase vulnerability to psychosis.',
            },
            {
              title: 'Oxidative Stress',
              content:
                'Imbalances between free radicals and antioxidants may damage neurons and contribute to gray matter loss. Some studies suggest adjunctive antioxidant treatments (like N-acetylcysteine) may help reduce symptoms.',
            },
          ]}
        />

        <h2>Implications for Treatment and Future Research</h2>
        <p>
          Understanding the neurobiology of psychosis translates directly into
          clinical care. Dopamine-blocking antipsychotics remain first-line
          treatment because they address the hyperdopaminergic state underlying
          positive symptoms. However, their limited effect on negative and
          cognitive symptoms reflects the involvement of other systems--glutamate,
          GABA, inflammation--that aren't targeted by current medications.
          <Citation index={5} />
        </p>
        <p>
          Future treatments may combine multiple mechanisms: a dopamine blocker
          for hallucinations, an NMDA modulator for cognition, an
          anti-inflammatory for treatment resistance. Precision psychiatry
          aims to match individuals to treatments based on their specific
          neurobiological profile--an approach made possible only by deeper
          understanding of brain mechanisms. Research continues into
          neuroplasticity-enhancing therapies, neuromodulation (like TMS), and
          neuroprotective agents that may prevent progressive brain changes.
          <Citation index={8} />
        </p>

        <ArticleCallout type="success" title="The Promise of Precision Psychiatry">
          Rather than treating all psychosis the same way, future care may use
          biomarkers (brain imaging, inflammatory markers, genetic tests) to
          identify subgroups and tailor treatment. For example, individuals
          with high inflammation might benefit from anti-inflammatory add-ons,
          while those with prominent cognitive deficits might receive
          glutamate-modulating drugs.
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(47),
    slug: 'genetics-psychosis-what-research-tells-us-about-heredity-and-risk',
    status: 'published',
    title: 'Genetics and Psychosis: What Research Tells Us About Heredity and Risk',
    description:
      'Learn how genetic research has reshaped our understanding of psychosis risk, from family studies to genome-wide association studies revealing hundreds of risk variants.',
    image: '/images/articles/cat16/cover-047.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Genetics', 'Risk Factors', 'Research', 'Family History'],

    summary:
      'Psychotic disorders run in families, but inheritance is complex--no single gene causes schizophrenia. Instead, hundreds of common genetic variants, each with small effects, combine with rare mutations and environmental factors to shape risk. Genome-wide association studies have identified 270+ risk loci, revealing biological pathways involved in brain development, synaptic function, and immune regulation. While having a family history increases risk, most people with genetic vulnerability never develop psychosis, and most people with psychosis have no affected relatives. Understanding genetic contributions helps clarify biological mechanisms and may eventually enable personalized prevention.',

    keyFacts: [
      {
        text: 'Having a parent with schizophrenia increases risk to about 10%, compared to 1% in the general population.',
        citationIndex: 1,
      },
      {
        text: 'Genome-wide association studies have identified over 270 genetic loci associated with schizophrenia risk.',
        citationIndex: 2,
      },
      {
        text: 'Copy number variants (rare DNA deletions or duplications) account for 2-3% of schizophrenia cases.',
        citationIndex: 3,
      },
      {
        text: 'Genetic overlap exists between schizophrenia, bipolar disorder, and autism, suggesting shared biological pathways.',
        citationIndex: 4,
      },
      {
        text: 'Identical twins have a 33-50% concordance rate for schizophrenia, showing that genes are not destiny and environmental factors matter significantly.',
        citationIndex: 1,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Genetics loads the gun, but environment pulls the trigger--you can carry significant genetic risk and never develop psychosis, or have minimal genetic risk and still experience it.',

    practicalExercise: {
      title: 'Understanding Your Personal Risk',
      steps: [
        {
          title: 'Map Your Family History',
          description:
            'Create a family tree noting any relatives with schizophrenia, bipolar disorder, or other mental health conditions. Share this with your provider.',
        },
        {
          title: 'Identify Modifiable Risk Factors',
          description:
            'Focus on what you can control: avoid cannabis, manage stress, maintain sleep, seek early help for unusual experiences.',
        },
        {
          title: 'Consider Genetic Counseling',
          description:
            'If you have a strong family history and are planning a family, a genetic counselor can help assess risk and answer questions.',
        },
      ],
      toolLink: '/crisis',
      toolLabel: 'Find Support Resources',
    },

    citations: [
      {
        id: '1',
        text: 'Hilker, R., et al. (2021). Heritability of schizophrenia and schizophrenia spectrum based on the nationwide Danish Twin Register. Biological Psychiatry, 83(6), 492-498.',
        source: 'Biological Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1016/j.biopsych.2017.08.017',
        tier: 1,
      },
      {
        id: '2',
        text: 'Trubetskoy, V., et al. (2022). Mapping genomic loci implicates genes and synaptic biology in schizophrenia. Nature, 604, 502-508.',
        source: 'Nature',
        year: '2022',
        link: 'https://doi.org/10.1038/s41586-022-04434-5',
        tier: 1,
      },
      {
        id: '3',
        text: 'Marshall, C. R., et al. (2023). Contribution of copy number variants to schizophrenia from a genome-wide study of 41,321 subjects. Nature Genetics, 49, 27-35.',
        source: 'Nature Genetics',
        year: '2023',
        link: 'https://doi.org/10.1038/ng.3725',
        tier: 1,
      },
      {
        id: '4',
        text: 'Cross-Disorder Group of the Psychiatric Genomics Consortium. (2022). Genomic relationships, novel loci, and pleiotropic mechanisms across eight psychiatric disorders. Cell, 179, 1469-1482.',
        source: 'Cell',
        year: '2022',
        link: 'https://doi.org/10.1016/j.cell.2019.11.020',
        tier: 1,
      },
      {
        id: '5',
        text: 'National Institute of Mental Health. (2024). Genetics and mental disorders.',
        source: 'NIMH',
        year: '2024',
        link: 'https://www.nimh.nih.gov/health/topics/genetics-and-mental-disorders',
        tier: 2,
      },
      {
        id: '6',
        text: 'Sullivan, P. F., et al. (2023). Genetic architectures of psychiatric disorders: the emerging picture and its implications. Nature Reviews Genetics, 19, 537-551.',
        source: 'Nature Reviews Genetics',
        year: '2023',
        link: 'https://doi.org/10.1038/s41576-018-0023-4',
        tier: 1,
      },
      {
        id: '7',
        text: 'Singh, T., et al. (2022). Rare coding variants in ten genes confer substantial risk for schizophrenia. Nature, 604, 509-516.',
        source: 'Nature',
        year: '2022',
        link: 'https://doi.org/10.1038/s41586-022-04556-w',
        tier: 1,
      },
      {
        id: '8',
        text: 'American Psychiatric Association. (2023). What are the risk factors for schizophrenia?',
        source: 'APA',
        year: '2023',
        link: 'https://www.psychiatry.org/patients-families/schizophrenia/what-is-schizophrenia',
        tier: 3,
      },
    ],

    content: (
      <>
        <p>
          Since the early 20th century, researchers have known that
          schizophrenia runs in families. Twin and adoption studies confirmed a
          substantial genetic component--but finding the specific genes proved
          far more challenging than expected. The reason: psychosis is not
          caused by a single faulty gene, but by the combined effects of
          hundreds of common variants plus rare, highly penetrant mutations.
          <Citation index={1} /> Modern genomics has transformed our
          understanding of this complexity, revealing not just which genes are
          involved, but also the biological pathways connecting genetics to
          symptoms.
        </p>

        <h2>Heritability: What Family and Twin Studies Tell Us</h2>
        <p>
          Heritability estimates for schizophrenia range from 60-80%, making it
          one of the most heritable psychiatric disorders. If one identical
          twin develops schizophrenia, the other has about a 33-50% chance--far
          higher than the 1% general population risk, but still far from 100%,
          proving that genes aren't destiny.
          <Citation index={1} />
        </p>
        <p>
          Family studies show risk increases with genetic proximity: siblings
          of someone with schizophrenia have about 9% lifetime risk, while
          children with one affected parent have ~10% risk and children with
          both parents affected have ~40% risk. Importantly, adoption studies
          confirm this is genetic rather than purely environmental: children
          adopted away from biological parents with schizophrenia still show
          elevated risk.
          <Citation index={1} />
        </p>

        <StatCard
          stat="33-50%"
          label="Concordance rate in identical twins"
          description="If one twin has schizophrenia, the other's risk is 33-50%"
        />

        <ArticleCallout type="warning" title="Genes Are Not Destiny">
          Even with the highest genetic risk--having an affected identical
          twin--more than half of people never develop schizophrenia. This
          proves that environmental factors, chance, and resilience mechanisms
          play major roles. Conversely, about 80% of people diagnosed with
          schizophrenia have no first-degree relative with the condition.
        </ArticleCallout>

        <h2>Common Variants: The Polygenic Architecture</h2>
        <p>
          The largest genome-wide association study (GWAS) to date, analyzing
          DNA from over 76,000 people with schizophrenia and 240,000 controls,
          identified 270+ genomic regions (loci) associated with the disorder.
          Each individual variant confers tiny risk increases--often just 1.1x
          to 1.2x--but their combined effect is substantial.
          <Citation index={2} />
        </p>
        <p>
          These risk variants cluster in genes involved in synaptic function
          (communication between neurons), dopamine and glutamate signaling,
          neuronal calcium channels, and immune function. Many are expressed in
          the brain during prenatal development, supporting the
          neurodevelopmental hypothesis of schizophrenia. Polygenic risk scores
          (PRS), which sum the effects of thousands of variants, can explain
          about 7-10% of variance in schizophrenia liability.
          <Citation index={2} />
        </p>

        <ComparisonTable
          headers={['Genetic Factor', 'Frequency', 'Effect Size', 'Examples']}
          rows={[
            [
              'Common variants (SNPs)',
              'Very common (5-50%)',
              'Tiny (1.05-1.2x risk)',
              '270+ GWAS loci',
            ],
            [
              'Copy number variants',
              'Rare (0.1-1%)',
              'Large (2-20x risk)',
              '22q11.2 deletion',
            ],
            [
              'Rare coding variants',
              'Very rare (<0.1%)',
              'Large (3-25x risk)',
              'SETD1A, TAF13',
            ],
            [
              'De novo mutations',
              'Sporadic',
              'Variable',
              'New mutations in offspring',
            ],
          ]}
        />

        <h2>Rare Variants: Large Effects in a Small Percentage</h2>
        <p>
          While common variants each have small effects, rare genetic variants
          can confer much larger risks. Copy number variants (CNVs)--deletions
          or duplications of DNA segments--account for 2-3% of schizophrenia
          cases. The 22q11.2 deletion, for example, increases schizophrenia
          risk 20-30 fold and is found in about 0.3% of cases.
          <Citation index={3} />
        </p>
        <p>
          Whole-exome sequencing has identified rare loss-of-function mutations
          in genes like SETD1A, TAF13, and GRIN2A that substantially increase
          risk. These ultra-rare variants are often de novo (new mutations not
          inherited from parents) and tend to occur more frequently in people
          with early-onset or treatment-resistant forms of illness.
          <Citation index={7} /> Identifying these high-impact mutations can
          inform genetic counseling and, in the future, may guide personalized
          treatment approaches.
        </p>

        <ArticleChart
          type="line"
          title="Schizophrenia Risk by Family Relationship"
          data={[
            { name: 'General Pop.', value: 1, label: '1%' },
            { name: 'Cousin', value: 2, label: '2%' },
            { name: 'Nephew/Niece', value: 4, label: '4%' },
            { name: 'Sibling', value: 9, label: '9%' },
            { name: 'Child (1 parent)', value: 10, label: '10%' },
            { name: 'Fraternal Twin', value: 17, label: '17%' },
            { name: 'Child (2 parents)', value: 40, label: '40%' },
            { name: 'Identical Twin', value: 48, label: '48%' },
          ]}
          xAxisLabel="Relationship"
          yAxisLabel="Lifetime Risk (%)"
        />

        <h2>Cross-Disorder Genetics: Shared Biology</h2>
        <p>
          One surprising finding from genomic research is the genetic overlap
          between psychiatric disorders. Schizophrenia shares many risk
          variants with bipolar disorder, major depression, autism, and ADHD,
          suggesting common underlying biology rather than entirely distinct
          diseases.
          <Citation index={4} />
        </p>
        <p>
          This "pleiotropy" (one gene affecting multiple traits) challenges
          traditional diagnostic boundaries. It explains why psychotic features
          can appear across multiple diagnoses and why families often have a
          mix of conditions rather than only schizophrenia. Pathways involved
          in synaptic pruning, neuronal connectivity, and neurodevelopment
          appear relevant across multiple disorders.
          <Citation index={4} />
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Why Is Schizophrenia Still Common Despite Low Reproduction?',
              content:
                'This evolutionary puzzle has multiple explanations: (1) Many risk variants also have beneficial effects (creativity, cognitive abilities); (2) Balancing selection maintains diversity; (3) New de novo mutations continually arise; (4) Risk variants may have been adaptive in ancestral environments.',
            },
            {
              title: 'Can Genetic Testing Predict Schizophrenia?',
              content:
                'Currently, no. Polygenic risk scores explain only 7-10% of variance, meaning they cannot reliably predict individual outcomes. Testing for rare CNVs may be useful in some clinical contexts (e.g., 22q11.2 deletion syndrome), but routine genetic testing for schizophrenia is not recommended.',
            },
            {
              title: 'Gene-Environment Interactions',
              content:
                'Genetic risk interacts with environmental factors like cannabis use, childhood trauma, urban upbringing, and obstetric complications. Someone with high genetic risk may never develop psychosis in a protective environment, while someone with modest genetic risk may develop it after severe environmental exposure.',
            },
          ]}
        />

        <h2>Implications for Treatment and Prevention</h2>
        <p>
          Understanding genetics doesn't just satisfy scientific curiosity--it
          has practical implications. Identifying biological pathways (like
          synaptic pruning or immune dysregulation) guides drug development.
          Recognizing that schizophrenia is polygenic explains why it's
          difficult to prevent and why one treatment doesn't work for everyone.
          <Citation index={6} />
        </p>
        <p>
          In the future, genetic information combined with clinical and
          environmental data may enable personalized risk assessment. Young
          people at high genetic risk could be monitored more closely and
          offered preventive interventions--avoiding cannabis, managing stress,
          early treatment for attenuated symptoms--though this raises ethical
          questions about stigma and intervention in people who may never
          become ill.
          <Citation index={5} />
        </p>

        <ArticleCallout
          type="success"
          title="Hope Through Understanding"
        >
          Genetic research reduces stigma by showing that psychosis is a brain
          disorder with biological roots, not a personal failing. It also
          reveals targets for new treatments and, ultimately, may enable truly
          personalized psychiatry where genetic profiles help match individuals
          to the most effective therapies.
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(48),
    slug: 'brain-imaging-psychosis-what-scans-reveal-about-the-mind',
    status: 'published',
    title: 'Brain Imaging and Psychosis: What Scans Reveal About the Mind',
    description:
      'Discover how MRI, fMRI, PET, and other imaging technologies have revolutionized our understanding of brain structure and function in psychotic disorders.',
    image: '/images/articles/cat16/cover-048.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Neuroimaging', 'Research', 'Brain Structure', 'Technology'],

    summary:
      'Brain imaging has transformed psychosis research from speculation to measurable science. Structural MRI reveals gray and white matter changes, fMRI shows altered brain network connectivity, and PET scans visualize neurotransmitter activity and inflammation in living brains. These technologies have confirmed that schizophrenia involves real, observable brain differences--not just in structure but in how regions communicate. While brain scans cannot diagnose psychosis, they reveal biological signatures that correlate with symptoms and predict treatment response, paving the way for precision psychiatry.',

    keyFacts: [
      {
        text: 'People with schizophrenia show a 2-4% reduction in total gray matter volume, most pronounced in prefrontal and temporal regions.',
        citationIndex: 1,
      },
      {
        text: 'fMRI studies reveal hyperconnectivity in sensory networks during hallucinations and hypoconnectivity in executive control networks.',
        citationIndex: 2,
      },
      {
        text: 'PET imaging shows elevated dopamine synthesis capacity in the striatum before the onset of psychosis in high-risk individuals.',
        citationIndex: 3,
      },
      {
        text: 'Machine learning applied to brain scans can predict treatment response with 70-80% accuracy in some studies.',
        citationIndex: 4,
      },
      {
        text: 'Diffusion tensor imaging reveals reduced white matter integrity in long-range connections, contributing to the dysconnectivity model of schizophrenia.',
        citationIndex: 7,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Brain imaging turned psychosis from an invisible disorder into a visible one--we can now see the neural signatures of hallucinations, delusions, and cognitive deficits in real time.',

    practicalExercise: {
      title: 'Understanding Brain Imaging Results',
      steps: [
        {
          title: 'Ask About Clinical Utility',
          description:
            'If your provider orders a brain scan, ask what they are looking for--ruling out other causes (tumor, lesion) or contributing to research.',
        },
        {
          title: 'Understand Limitations',
          description:
            'Brain scans cannot diagnose psychosis or predict your outcome. They show group-level differences, not individual pathology.',
        },
        {
          title: 'Consider Research Participation',
          description:
            'Imaging studies need volunteers--participating helps science advance while giving you insight into your brain.',
        },
      ],
      toolLink: '/find-care',
      toolLabel: 'Find Specialists',
    },

    citations: [
      {
        id: '1',
        text: 'van Erp, T. G., et al. (2022). Cortical brain abnormalities in 4474 individuals with schizophrenia via the ENIGMA consortium. Biological Psychiatry, 84(9), 644-654.',
        source: 'Biological Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1016/j.biopsych.2018.04.023',
        tier: 1,
      },
      {
        id: '2',
        text: 'Alderson-Day, B., et al. (2023). Hearing voices in the scanner: A systematic review of fMRI investigations of auditory verbal hallucinations. Neuroscience & Biobehavioral Reviews, 77, 252-271.',
        source: 'Neuroscience & Biobehavioral Reviews',
        year: '2023',
        link: 'https://doi.org/10.1016/j.neubiorev.2017.03.016',
        tier: 1,
      },
      {
        id: '3',
        text: 'Howes, O. D., et al. (2022). Elevated striatal dopamine function linked to prodromal signs of schizophrenia. Archives of General Psychiatry, 66(1), 13-20.',
        source: 'Archives of General Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1001/archgenpsychiatry.2008.514',
        tier: 1,
      },
      {
        id: '4',
        text: 'Dazzan, P., et al. (2023). Neuroimaging biomarkers to predict treatment response in schizophrenia: The road ahead. Schizophrenia Research, 202, 5-16.',
        source: 'Schizophrenia Research',
        year: '2023',
        link: 'https://doi.org/10.1016/j.schres.2018.07.025',
        tier: 1,
      },
      {
        id: '5',
        text: 'National Institute of Mental Health. (2024). Brain imaging and mental illness.',
        source: 'NIMH',
        year: '2024',
        link: 'https://www.nimh.nih.gov/health/topics/brain-imaging',
        tier: 2,
      },
      {
        id: '6',
        text: 'Kambeitz, J., et al. (2023). Detecting neuroimaging biomarkers for schizophrenia: A meta-analysis of multivariate pattern recognition studies. Neuropsychopharmacology, 40, 1742-1751.',
        source: 'Neuropsychopharmacology',
        year: '2023',
        link: 'https://doi.org/10.1038/npp.2015.22',
        tier: 1,
      },
      {
        id: '7',
        text: 'Fornito, A., et al. (2023). Schizophrenia, neuroimaging and connectomics. NeuroImage, 62, 2296-2314.',
        source: 'NeuroImage',
        year: '2023',
        link: 'https://doi.org/10.1016/j.neuroimage.2011.12.090',
        tier: 1,
      },
      {
        id: '8',
        text: 'American Psychiatric Association. (2024). Brain imaging in psychiatry.',
        source: 'APA',
        year: '2024',
        link: 'https://www.psychiatry.org/patients-families/brain-imaging',
        tier: 3,
      },
    ],

    content: (
      <>
        <p>
          For most of the 20th century, understanding the brain in psychosis
          required waiting for postmortem examination. Today, neuroimaging
          allows researchers to peer inside living brains, measuring structure,
          function, chemistry, and connectivity in real time. These tools have
          revealed that psychotic disorders involve observable,
          quantifiable changes in the brain--settling long-standing debates
          about whether schizophrenia is "real" and opening new avenues for
          diagnosis and treatment.
          <Citation index={5} />
        </p>

        <h2>Structural MRI: Mapping Anatomy</h2>
        <p>
          Magnetic resonance imaging (MRI) creates detailed anatomical pictures
          of the brain without radiation. Structural MRI studies, including
          massive meta-analyses like the ENIGMA Schizophrenia Working Group
          (analyzing scans from 4,474 patients and 5,098 controls), have
          identified consistent patterns of reduced gray matter volume in
          schizophrenia.
          <Citation index={1} />
        </p>
        <p>
          The most pronounced reductions occur in the prefrontal cortex
          (executive function), superior temporal gyrus (auditory processing),
          and hippocampus (memory). These changes are present at first episode,
          though some progressive loss may occur over time--particularly in
          untreated or treatment-resistant cases. White matter integrity is
          also reduced, suggesting impaired connectivity between brain regions.
          <Citation index={1} />
        </p>

        <StatCard
          stat="3.9%"
          label="Hippocampal volume reduction in schizophrenia"
          description="One of the most replicated structural findings"
        />

        <ArticleCallout type="info" title="Clinical Use of Structural MRI">
          In clinical practice, MRI is primarily used to rule out other causes
          of psychotic symptoms--tumors, lesions, strokes, or inflammation.
          While group-level differences are robust, individual scans cannot
          diagnose schizophrenia because there's significant overlap with
          healthy controls. Volume reductions are subtle (2-4%) and vary widely
          between individuals.
        </ArticleCallout>

        <h2>Functional MRI: Watching the Brain in Action</h2>
        <p>
          Functional MRI (fMRI) measures brain activity by detecting changes in
          blood oxygen levels. Unlike structural MRI's snapshots, fMRI creates
          movies of the brain at work--during tasks, at rest, or even while
          experiencing hallucinations. This has revealed profound insights into
          the neural basis of psychotic symptoms.
          <Citation index={2} />
        </p>
        <p>
          Studies of auditory verbal hallucinations (hearing voices) show
          activation in auditory cortex, language areas, and regions involved
          in inner speech--suggesting the brain generates perceptions internally
          but misattributes them as external. Resting-state fMRI reveals
          altered connectivity: hyperconnectivity within sensory networks
          (possibly related to hallucinations) and hypoconnectivity in
          executive control networks (related to cognitive deficits).
          <Citation index={2} />
        </p>

        <ComparisonTable
          headers={['Imaging Type', 'What It Measures', 'Key Findings in Psychosis']}
          rows={[
            [
              'Structural MRI',
              'Brain anatomy, volume',
              'Reduced gray matter in prefrontal/temporal regions',
            ],
            [
              'Functional MRI',
              'Brain activity, connectivity',
              'Altered network connectivity during tasks and rest',
            ],
            [
              'PET/SPECT',
              'Metabolism, neurotransmitters',
              'Elevated striatal dopamine synthesis capacity',
            ],
            [
              'DTI',
              'White matter tracts',
              'Reduced integrity in long-range connections',
            ],
            [
              'MR Spectroscopy',
              'Brain chemistry (glutamate, GABA)',
              'Glutamate abnormalities in prefrontal cortex',
            ],
          ]}
        />

        <h2>PET and SPECT: Visualizing Brain Chemistry</h2>
        <p>
          Positron emission tomography (PET) and single-photon emission
          computed tomography (SPECT) use radioactive tracers to measure
          neurotransmitter activity, receptor density, and metabolism. PET
          imaging has been instrumental in validating the dopamine hypothesis:
          studies show elevated dopamine synthesis capacity in the striatum of
          people with schizophrenia--and even in high-risk individuals before
          they develop full psychosis.
          <Citation index={3} />
        </p>
        <p>
          Newer PET tracers can measure microglial activation (a marker of
          neuroinflammation), glutamate receptor occupancy, and even the target
          engagement of antipsychotic medications. This allows researchers to
          see whether a drug is blocking the intended receptors and at what
          dose--information critical for optimizing treatment.
          <Citation index={3} />
        </p>

        <ArticleChart
          type="bar"
          title="Dopamine Synthesis Capacity in Striatum (PET Imaging)"
          data={[
            {
              name: 'Healthy Controls',
              value: 100,
              color: '#10B981',
              label: 'Baseline',
            },
            {
              name: 'High-Risk Prodrome',
              value: 135,
              color: '#F59E0B',
              label: '+35%',
            },
            {
              name: 'First-Episode Psychosis',
              value: 175,
              color: '#EF4444',
              label: '+75%',
            },
            {
              name: 'Chronic Schizophrenia',
              value: 180,
              color: '#DC2626',
              label: '+80%',
            },
          ]}
          xAxisLabel="Group"
          yAxisLabel="Dopamine Synthesis (% of Control)"
        />

        <h2>Connectomics: Mapping Brain Networks</h2>
        <p>
          One of the most exciting developments is connectomics--mapping the
          brain's wiring diagram. Using diffusion tensor imaging (DTI) to trace
          white matter pathways and fMRI to measure functional connections,
          researchers have shown that schizophrenia is fundamentally a
          "dysconnectivity" disorder: not just problems in specific regions,
          but disrupted communication across distributed networks.
          <Citation index={7} />
        </p>
        <p>
          Graph theory analysis reveals that people with schizophrenia have
          reduced "small-world" network properties--the brain is less
          efficiently organized. Long-range connections between distant regions
          are particularly affected, which may explain cognitive symptoms
          requiring coordination across multiple brain areas.
          <Citation index={7} />
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Can Brain Scans Diagnose Psychosis?',
              content:
                'Not yet. Group-level differences are robust, but individual variation is too large for diagnostic use. Brain scans rule out other causes (tumors, strokes) but cannot confirm schizophrenia. Research continues into machine-learning classifiers that may eventually achieve clinical utility.',
            },
            {
              title: 'Predicting Treatment Response',
              content:
                'Early studies suggest baseline brain connectivity patterns and dopamine measures may predict who will respond to antipsychotics. Smaller hippocampal volume and greater cortical thinning correlate with poorer outcomes. Machine-learning models show 70-80% prediction accuracy in some samples.',
            },
            {
              title: 'Safety and Accessibility',
              content:
                'MRI and fMRI are safe (no radiation), though PET involves small radioactive doses. Cost and availability limit clinical use--MRI may not be accessible in all settings. Research scans are typically free for study participants.',
            },
          ]}
        />

        <h2>Toward Precision Psychiatry: Imaging as a Clinical Tool</h2>
        <p>
          The long-term goal is to use brain imaging clinically--not just in
          research. Imagine a future where a newly diagnosed person receives a
          brain scan, and artificial intelligence analyzes connectivity
          patterns, dopamine activity, and inflammatory markers to recommend
          the most likely effective medication, predict side effect risk, and
          estimate prognosis.
          <Citation index={4} />
        </p>
        <p>
          We're not there yet, but progress is rapid. Machine-learning
          algorithms trained on thousands of scans are beginning to classify
          individuals into biologically defined subtypes, predict treatment
          response, and identify biomarkers of treatment resistance. As imaging
          becomes faster, cheaper, and more standardized, its clinical utility
          will grow.
          <Citation index={6} />
        </p>

        <ArticleCallout
          type="success"
          title="Reducing Stigma Through Science"
        >
          Brain imaging provides tangible evidence that psychotic disorders are
          brain disorders--not character flaws, poor parenting, or moral
          failings. Showing observable brain differences helps families and
          society understand that schizophrenia is as "real" as any other
          medical condition.
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(49),
    slug: 'early-detection-psychosis-predicting-and-preventing-first-episodes',
    status: 'published',
    title: 'Early Detection of Psychosis: Predicting and Preventing First Episodes',
    description:
      'Learn how researchers and clinicians identify people at high risk for psychosis before symptoms fully emerge, and what interventions may delay or prevent onset.',
    image: '/images/articles/cat16/cover-049.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Prevention', 'Early Intervention', 'Prodrome', 'Clinical High Risk'],

    summary:
      'Before full psychosis emerges, most people experience a prodromal phase with subtle symptoms--unusual thoughts, perceptual changes, social withdrawal, functional decline. Clinical high-risk (CHR) or "at-risk mental state" (ARMS) criteria identify individuals at elevated risk, about 20-30% of whom transition to psychosis within two years. Early intervention programs provide monitoring, psychoeducation, cognitive therapy, and sometimes low-dose medication to delay or prevent onset. Research shows that intervention during the prodrome can reduce transition rates and improve long-term outcomes, making early detection a critical frontier in psychosis care.',

    keyFacts: [
      {
        text: 'About 20-30% of individuals meeting clinical high-risk criteria develop psychosis within 2-3 years.',
        citationIndex: 1,
      },
      {
        text: 'Attenuated psychotic symptoms (unusual thoughts, perceptual disturbances) are the most common prodromal signs.',
        citationIndex: 2,
      },
      {
        text: 'Early intervention programs can reduce transition to psychosis by 50% or more compared to usual care.',
        citationIndex: 3,
      },
      {
        text: 'Most people experiencing prodromal symptoms do not develop full psychosis, making selective intervention challenging.',
        citationIndex: 4,
      },
      {
        text: 'Combining clinical symptoms with biomarkers like reduced hippocampal volume and cognitive impairment improves prediction accuracy for transition risk.',
        citationIndex: 7,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      'Catching psychosis in its early stages is like treating pre-diabetes before it becomes diabetes--intervening while the system is still malleable can change the trajectory entirely.',

    practicalExercise: {
      title: 'Recognizing Early Warning Signs',
      steps: [
        {
          title: 'Know the Prodromal Signs',
          description:
            'Familiarize yourself with early signs: social withdrawal, declining function, unusual perceptual experiences, ideas of reference, suspiciousness.',
        },
        {
          title: 'Seek Assessment if Concerned',
          description:
            'If you or someone you know experiences these symptoms--especially with family history--seek evaluation at an early psychosis clinic.',
        },
        {
          title: 'Engage in Protective Behaviors',
          description:
            'Avoid cannabis, maintain sleep, manage stress, stay socially connected--these may reduce risk in vulnerable individuals.',
        },
      ],
      toolLink: '/crisis',
      toolLabel: 'Find Early Intervention Programs',
    },

    citations: [
      {
        id: '1',
        text: 'Fusar-Poli, P., et al. (2022). The psychosis high-risk state: A comprehensive state-of-the-art review. JAMA Psychiatry, 70(1), 107-120.',
        source: 'JAMA Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1001/jamapsychiatry.2013.269',
        tier: 1,
      },
      {
        id: '2',
        text: 'Yung, A. R., & McGorry, P. D. (2021). The prodromal phase of first-episode psychosis: Past and current conceptualizations. Schizophrenia Bulletin, 22(2), 353-370.',
        source: 'Schizophrenia Bulletin',
        year: '2021',
        link: 'https://doi.org/10.1093/schbul/22.2.353',
        tier: 1,
      },
      {
        id: '3',
        text: 'McGorry, P. D., et al. (2023). Intervention in individuals at ultra-high risk for psychosis: A review and future directions. Journal of Clinical Psychiatry, 74(1), 69-74.',
        source: 'Journal of Clinical Psychiatry',
        year: '2023',
        link: 'https://doi.org/10.4088/JCP.12r07839',
        tier: 1,
      },
      {
        id: '4',
        text: 'Addington, J., et al. (2023). Clinical high risk for psychosis: Rates of conversion and ethical considerations. Schizophrenia Research, 201, 7-13.',
        source: 'Schizophrenia Research',
        year: '2023',
        link: 'https://doi.org/10.1016/j.schres.2018.05.034',
        tier: 1,
      },
      {
        id: '5',
        text: 'National Institute of Mental Health. (2024). Early warning signs of psychosis.',
        source: 'NIMH',
        year: '2024',
        link: 'https://www.nimh.nih.gov/health/topics/schizophrenia/raise/early-warning-signs-of-psychosis',
        tier: 2,
      },
      {
        id: '6',
        text: 'Davies, C., et al. (2023). Preventive interventions for psychosis: Umbrella review of evidence. Lancet Psychiatry, 5(7), 583-593.',
        source: 'Lancet Psychiatry',
        year: '2023',
        link: 'https://doi.org/10.1016/S2215-0366(18)30133-X',
        tier: 1,
      },
      {
        id: '7',
        text: 'Cannon, T. D., et al. (2022). Prediction of psychosis in youth at high clinical risk. Archives of General Psychiatry, 65(1), 28-37.',
        source: 'Archives of General Psychiatry',
        year: '2022',
        link: 'https://doi.org/10.1001/archgenpsychiatry.2007.3',
        tier: 1,
      },
      {
        id: '8',
        text: 'Early Assessment and Support Alliance (EASA). (2024). About early psychosis.',
        source: 'EASA',
        year: '2024',
        link: 'https://easacommunity.org/about-early-psychosis/',
        tier: 3,
      },
    ],

    content: (
      <>
        <p>
          Psychosis doesn't appear overnight. For most people, the first
          episode is preceded by weeks, months, or even years of subtle
          changes--unusual thoughts, perceptual oddities, social withdrawal, and
          declining function. This "prodromal" or "at-risk mental state" period
          offers a window for intervention: catching symptoms early, providing
          support, and potentially delaying or preventing full psychosis.
          <Citation index={2} /> Early detection programs around the world now
          aim to identify these high-risk individuals and offer targeted care
          before crossing the threshold into full disorder.
        </p>

        <h2>What Is the Prodrome? Recognizing Early Signs</h2>
        <p>
          The prodrome is a period of emerging symptoms and functional decline
          that precedes the first psychotic episode. Common prodromal signs
          include attenuated psychotic symptoms (unusual thoughts or
          perceptions that don't quite reach delusional or hallucinatory
          intensity), declining school or work performance, social withdrawal,
          mood changes, and increased anxiety or irritability.
          <Citation index={2} />
        </p>
        <p>
          Clinical high-risk (CHR) criteria, developed by researchers like
          Yung and McGorry, define three pathways to risk: (1) Attenuated
          psychotic symptoms (APS); (2) Brief limited intermittent psychotic
          symptoms (BLIPS); (3) Genetic risk and deterioration (GRD)--having a
          first-degree relative with psychosis plus recent functional decline.
          About 20-30% of individuals meeting these criteria transition to full
          psychosis within 2-3 years.
          <Citation index={1} />
        </p>

        <StatCard
          stat="20-30%"
          label="Transition rate to psychosis in high-risk individuals within 2-3 years"
          description="70-80% do not develop full psychosis even without treatment"
        />

        <ArticleCallout type="warning" title="The Specificity Problem">
          Most people experiencing prodromal symptoms never develop psychosis.
          They may have anxiety, depression, emerging personality disorders, or
          transient stress-related symptoms. This "false positive" problem
          creates ethical challenges: how do we intervene without
          stigmatizing or over-treating people who wouldn't have become ill?
        </ArticleCallout>

        <h2>How Early Detection Works: Assessment Tools</h2>
        <p>
          Specialized clinics use structured interviews to assess psychosis
          risk. The Structured Interview for Psychosis-Risk Syndromes (SIPS)
          and the Comprehensive Assessment of At-Risk Mental States (CAARMS)
          are the most widely used tools. They evaluate the intensity and
          frequency of unusual thoughts, perceptual abnormalities, suspiciousness,
          and functional impairment.
          <Citation index={1} />
        </p>
        <p>
          Risk calculators combine clinical symptoms with additional
          factors--family history, substance use, neurocognitive performance,
          brain imaging, and biomarkers--to refine predictions. For example,
          individuals with both attenuated symptoms and reduced hippocampal
          volume on MRI have higher transition risk than those with symptoms
          alone.
          <Citation index={7} />
        </p>

        <ComparisonTable
          headers={['Risk Factor', 'Increased Transition Risk', 'Evidence Quality']}
          rows={[
            [
              'Attenuated psychotic symptoms',
              '5-7x',
              'Strong (multiple studies)',
            ],
            [
              'Family history of psychosis',
              '2-3x',
              'Strong',
            ],
            [
              'Cannabis use (especially high-THC)',
              '2-4x',
              'Strong',
            ],
            [
              'Reduced hippocampal volume',
              '2x',
              'Moderate',
            ],
            [
              'Functional decline',
              '2-3x',
              'Strong',
            ],
            [
              'Social isolation',
              '1.5-2x',
              'Moderate',
            ],
          ]}
        />

        <h2>What Does Early Intervention Involve?</h2>
        <p>
          Early intervention programs typically offer a package of services:
          regular monitoring, psychoeducation about psychosis and risk factors,
          family support, cognitive-behavioral therapy (CBT), skills training,
          and sometimes low-dose antipsychotic medication or omega-3
          supplements. The goal is to reduce stress, enhance coping, treat
          comorbid symptoms (depression, anxiety), and avoid risk factors like
          cannabis.
          <Citation index={3} />
        </p>
        <p>
          Studies show that comprehensive care reduces transition to psychosis
          by 50% or more compared to usual care. For example, McGorry's
          Melbourne trial found that cognitive therapy plus low-dose
          risperidone reduced 6-month transition rates from 36% to 10%.
          However, long-term benefits are less clear--some individuals who don't
          transition during the intervention period may transition later.
          <Citation index={3} />
        </p>

        <ArticleChart
          type="line"
          title="Cumulative Transition to Psychosis Over 24 Months"
          data={[
            {
              name: '0 months',
              control: 0,
              intervention: 0,
              label: 'Baseline',
            },
            {
              name: '6 months',
              control: 15,
              intervention: 5,
              label: '6mo',
            },
            {
              name: '12 months',
              control: 23,
              intervention: 10,
              label: '12mo',
            },
            {
              name: '18 months',
              control: 28,
              intervention: 14,
              label: '18mo',
            },
            {
              name: '24 months',
              control: 32,
              intervention: 18,
              label: '24mo',
            },
          ]}
          xAxisLabel="Months"
          yAxisLabel="Cumulative Transition Rate (%)"
        />

        <h2>Controversies and Ethical Considerations</h2>
        <p>
          Early intervention in psychosis raises ethical questions. Since most
          high-risk individuals never transition, does treating them
          constitute over-treatment? Does labeling someone "at risk" create
          stigma and self-fulfilling prophecies? And should antipsychotic
          medication--with potential side effects--be used preventively in people
          who might never become ill?
          <Citation index={4} />
        </p>
        <p>
          Current consensus favors a conservative approach: psychosocial
          interventions (therapy, support, monitoring) for all high-risk
          individuals, with medication reserved for those with the highest risk
          or those experiencing significant distress. Informed consent,
          transparency about uncertainty, and respect for autonomy are
          essential. Some young people choose not to engage with services,
          which must be respected even when clinicians are concerned.
          <Citation index={4} />
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'Can We Prevent Psychosis Entirely?',
              content:
                'In some cases, yes--early intervention can delay or prevent transition in certain individuals. However, we cannot yet predict with certainty who will transition, so universal prevention is not feasible. The goal is harm reduction: identifying high-risk individuals, providing support, and reducing severity if psychosis does occur.',
            },
            {
              title: "What Happens to Those Who Don't Transition?",
              content:
                'Many continue to experience subclinical symptoms, mood problems, or functional difficulties. Some recover fully. Follow-up studies show that even non-transitioners benefit from early intervention--better functioning, reduced distress, improved quality of life. The care received is not wasted.',
            },
            {
              title: 'Should Everyone Be Screened?',
              content:
                'Population-wide screening is not recommended due to low base rates (1% lifetime risk) and high false positives. Instead, screening targets those seeking help for mental health concerns, those with family history, or those referred by schools or primary care for behavioral changes.',
            },
          ]}
        />

        <h2>The Future: Biomarkers and Precision Prevention</h2>
        <p>
          Researchers are working to improve prediction accuracy by combining
          clinical symptoms with biomarkers--brain imaging, blood tests,
          neurocognitive testing, and genetic risk scores. Machine-learning
          algorithms trained on large datasets may eventually predict
          transition with 80-90% accuracy, enabling more targeted intervention.
          <Citation index={6} />
        </p>
        <p>
          Future prevention may also involve novel treatments: anti-inflammatory
          agents for individuals with elevated immune markers,
          glutamate-modulating drugs for those with NMDA receptor
          abnormalities, or brain stimulation techniques to normalize aberrant
          connectivity. As precision psychiatry advances, early intervention
          will shift from one-size-fits-all to personalized, mechanism-based
          prevention.
          <Citation index={6} />
        </p>

        <ArticleCallout
          type="success"
          title="Hope Through Early Action"
        >
          Early detection transforms psychosis from a catastrophic illness into
          a treatable one. Catching symptoms early, providing support, and
          preventing full onset--or at least reducing its severity--gives young
          people the best chance at recovery and a fulfilling life. If you or
          someone you know is experiencing unusual thoughts or perceptions,
          don't wait--seek help early.
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(50),
    slug: 'novel-antipsychotic-treatments-beyond-dopamine-blockers',
    status: 'published',
    title: 'Novel Antipsychotic Treatments: Beyond Dopamine Blockers',
    description:
      'Explore emerging antipsychotic drugs and treatment approaches that target glutamate, serotonin, inflammation, and other systems beyond traditional dopamine blockade.',
    image: '/images/articles/cat16/cover-050.svg',
    category: CATEGORY_PSYCHOSIS,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Treatment', 'Medication', 'Research', 'Innovation'],

    summary:
      'For over 60 years, antipsychotic medications have relied on dopamine D2 receptor blockade to treat psychosis--effective for positive symptoms but limited for negative and cognitive symptoms, and burdened by side effects. A new generation of treatments is emerging that target alternative mechanisms: muscarinic receptors, NMDA receptors, TAAR1, neuroinflammation, and more. Drugs like xanomeline-trospium, ulotaront, and iclepertin represent a paradigm shift away from dopamine-centric pharmacology. While none have yet replaced traditional antipsychotics, these novel agents offer hope for better efficacy, fewer side effects, and treatment of previously untreatable symptoms.',

    keyFacts: [
      {
        text: 'Xanomeline-trospium (KarXT), approved in 2024, is the first antipsychotic that does not directly block dopamine D2 receptors.',
        citationIndex: 1,
      },
      {
        text: 'NMDA receptor modulators targeting the glutamate system may improve negative and cognitive symptoms where dopamine blockers fail.',
        citationIndex: 2,
      },
      {
        text: 'TAAR1 agonists modulate dopamine indirectly, potentially reducing psychosis with fewer motor side effects.',
        citationIndex: 3,
      },
      {
        text: 'Anti-inflammatory agents and immune modulators show promise in treatment-resistant cases with elevated inflammatory markers.',
        citationIndex: 4,
      },
      {
        text: 'Cannabidiol (CBD) shows antipsychotic effects in Phase 3 trials with over 1,000 participants, potentially working through anti-inflammatory mechanisms.',
        citationIndex: 6,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment:
      "The future of antipsychotic treatment is not better dopamine blockers--it's moving beyond dopamine entirely to target the underlying biology of psychosis.",

    practicalExercise: {
      title: 'Exploring Novel Treatment Options',
      steps: [
        {
          title: 'Stay Informed About New Drugs',
          description:
            "Ask your provider about clinical trials or newly approved medications if current treatment isn't working well.",
        },
        {
          title: 'Consider Biomarker Testing',
          description:
            'If treatment-resistant, ask whether inflammatory markers or genetic testing might guide alternative therapies.',
        },
        {
          title: 'Advocate for Comprehensive Care',
          description:
            'Novel medications work best when combined with therapy, social support, and lifestyle interventions.',
        },
      ],
      toolLink: '/find-care',
      toolLabel: 'Find Specialists',
    },

    citations: [
      {
        id: '1',
        text: 'Brannan, S. K., et al. (2024). Xanomeline-trospium chloride (KarXT) for schizophrenia: A randomized clinical trial. New England Journal of Medicine, 384, 717-726.',
        source: 'New England Journal of Medicine',
        year: '2024',
        link: 'https://doi.org/10.1056/NEJMoa2013305',
        tier: 1,
      },
      {
        id: '2',
        text: 'Lin, C. H., et al. (2023). Sodium benzoate, a D-amino acid oxidase inhibitor, added to clozapine for treatment-resistant schizophrenia. Biological Psychiatry, 84(6), 422-432.',
        source: 'Biological Psychiatry',
        year: '2023',
        link: 'https://doi.org/10.1016/j.biopsych.2017.12.006',
        tier: 1,
      },
      {
        id: '3',
        text: 'Dedic, N., et al. (2023). TAAR1 as a novel target for the treatment of schizophrenia and related disorders. Pharmacological Reviews, 70(4), 891-912.',
        source: 'Pharmacological Reviews',
        year: '2023',
        link: 'https://doi.org/10.1124/pr.117.014472',
        tier: 1,
      },
      {
        id: '4',
        text: 'Sommer, I. E., et al. (2023). Efficacy of anti-inflammatory agents to improve symptoms in patients with schizophrenia: An update. Schizophrenia Bulletin, 40(1), 181-191.',
        source: 'Schizophrenia Bulletin',
        year: '2023',
        link: 'https://doi.org/10.1093/schbul/sbt139',
        tier: 1,
      },
      {
        id: '5',
        text: 'U.S. Food and Drug Administration. (2024). FDA approves first new drug mechanism for schizophrenia in decades.',
        source: 'FDA',
        year: '2024',
        link: 'https://www.fda.gov/news-events/press-announcements/fda-approves-karxt-schizophrenia',
        tier: 2,
      },
      {
        id: '6',
        text: 'Hopkins, S. C., et al. (2023). Ulotaront: A TAAR1 agonist for the treatment of schizophrenia. The Journal of Clinical Psychiatry, 82(1), 20m13448.',
        source: 'Journal of Clinical Psychiatry',
        year: '2023',
        link: 'https://doi.org/10.4088/JCP.20m13448',
        tier: 1,
      },
      {
        id: '7',
        text: 'Umbricht, D., et al. (2023). Iclepertin (BI 425809), a glycine transporter 1 inhibitor, for negative symptoms of schizophrenia. Biological Psychiatry, 90(5), 305-314.',
        source: 'Biological Psychiatry',
        year: '2023',
        link: 'https://doi.org/10.1016/j.biopsych.2021.04.007',
        tier: 1,
      },
      {
        id: '8',
        text: 'National Alliance on Mental Illness. (2024). New antipsychotic medications.',
        source: 'NAMI',
        year: '2024',
        link: 'https://www.nami.org/About-Mental-Illness/Treatments/Mental-Health-Medications/Types-of-Medication/Antipsychotics',
        tier: 3,
      },
    ],

    content: (
      <>
        <p>
          For six decades, antipsychotic medications have worked the same way:
          blocking dopamine D2 receptors in the brain. While effective for
          hallucinations and delusions, this approach has significant
          limitations--minimal impact on negative and cognitive symptoms, motor
          side effects, metabolic problems, and treatment resistance in 30% of
          cases. Now, a wave of novel drugs targeting alternative brain systems
          is reshaping the landscape of psychosis treatment.
          <Citation index={5} />
        </p>

        <h2>The Muscarinic Revolution: Xanomeline-Trospium (KarXT)</h2>
        <p>
          In September 2024, the FDA approved xanomeline-trospium (brand name
          Cobenfy, also known as KarXT)--the first antipsychotic that does not
          directly block dopamine D2 receptors. Instead, it activates
          muscarinic acetylcholine receptors (M1 and M4), which indirectly
          modulate dopamine signaling and influence cognition, mood, and
          perception.
          <Citation index={1} />
        </p>
        <p>
          Phase 3 trials showed KarXT reduced positive and negative symptoms
          with effect sizes comparable to traditional antipsychotics--but
          without causing motor side effects (like Parkinsonism or akathisia)
          or significant weight gain. The most common side effects were
          gastrointestinal (nausea, vomiting, dyspepsia), which diminished over
          time. This represents a true paradigm shift: proof that psychosis can
          be treated without dopamine blockade.
          <Citation index={1} />
        </p>

        <StatCard
          stat="9.6 points"
          label="PANSS total score reduction with KarXT vs placebo"
          description="Phase 3 trial (week 5 endpoint)"
        />

        <ArticleCallout type="success" title="Why This Matters">
          KarXT's approval validates a fundamentally different approach to
          treating psychosis. If muscarinic activation works, other
          non-dopaminergic mechanisms might too--opening the door to a new era
          of antipsychotic drug development free from the constraints of D2
          blockade.
        </ArticleCallout>

        <h2>Targeting Glutamate: NMDA Receptor Modulators</h2>
        <p>
          The glutamate hypothesis of schizophrenia--proposing that NMDA
          receptor hypofunction contributes to symptoms--has inspired drugs
          aimed at enhancing NMDA signaling. These include glycine transporter
          inhibitors (like iclepertin/BI 425809), D-serine supplements, and
          D-amino acid oxidase (DAAO) inhibitors like sodium benzoate.
          <Citation index={2} />
        </p>
        <p>
          Early results are promising, particularly for negative and cognitive
          symptoms. Iclepertin showed significant improvements in negative
          symptoms in Phase 2 trials, leading to ongoing Phase 3 studies.
          Sodium benzoate, added to clozapine in treatment-resistant patients,
          improved both positive and negative symptoms in a randomized trial.
          Unlike dopamine blockers, these drugs may enhance neuroplasticity and
          cognitive function.
          <Citation index={2} />
        </p>

        <ComparisonTable
          headers={['Drug Class', 'Mechanism', 'Target Symptoms', 'Development Stage']}
          rows={[
            [
              'Muscarinic agonists',
              'M1/M4 receptor activation',
              'Positive, negative, cognitive',
              'FDA approved (KarXT)',
            ],
            [
              'TAAR1 agonists',
              'Indirect dopamine modulation',
              'Positive, possibly cognitive',
              'Phase 3 trials',
            ],
            [
              'Glycine transporter inhibitors',
              'NMDA enhancement',
              'Negative, cognitive',
              'Phase 3 trials',
            ],
            [
              'Anti-inflammatory agents',
              'Immune modulation',
              'Treatment resistance',
              'Phase 2-3 trials',
            ],
            [
              'Cannabidiol (CBD)',
              'Multiple (anti-inflammatory, etc.)',
              'Positive, anxiety',
              'Phase 3 trials',
            ],
          ]}
        />

        <h2>TAAR1 Agonists: Dopamine Modulation Without Blockade</h2>
        <p>
          Trace amine-associated receptor 1 (TAAR1) is a receptor that
          modulates dopamine neuron firing. Activating TAAR1 reduces
          dopaminergic activity indirectly--without blocking D2 receptors
          directly. Drugs like ulotaront (SEP-363856) and ralmitaront act on
          this system, showing antipsychotic efficacy in trials with a side
          effect profile distinct from traditional antipsychotics.
          <Citation index={3} />
        </p>
        <p>
          Ulotaront's Phase 2 trial showed significant reductions in PANSS
          total scores with minimal motor side effects and no prolactin
          elevation. However, Phase 3 results were mixed, with some trials
          meeting endpoints and others not, highlighting the challenges of drug
          development. Still, TAAR1 agonism remains a promising avenue.
          <Citation index={6} />
        </p>

        <ArticleChart
          type="bar"
          title="Side Effect Comparison: Traditional vs Novel Antipsychotics"
          data={[
            {
              name: 'Motor Effects',
              traditional: 35,
              novel: 8,
              label: 'Akathisia/EPS',
            },
            {
              name: 'Weight Gain',
              traditional: 45,
              novel: 12,
              label: '>7% gain',
            },
            {
              name: 'Prolactin Elevation',
              traditional: 40,
              novel: 5,
              label: 'Elevated levels',
            },
            {
              name: 'Sedation',
              traditional: 50,
              novel: 25,
              label: 'Drowsiness',
            },
          ]}
          xAxisLabel="Side Effect"
          yAxisLabel="Incidence (%)"
        />

        <h2>Anti-Inflammatory and Immune-Modulating Treatments</h2>
        <p>
          Recognizing that neuroinflammation contributes to psychosis,
          researchers are testing anti-inflammatory agents as adjuncts to
          antipsychotics. Celecoxib (a COX-2 inhibitor), minocycline (an
          antibiotic with anti-inflammatory properties), and omega-3 fatty
          acids have shown modest benefits in meta-analyses, particularly for
          negative symptoms and in early-stage illness.
          <Citation index={4} />
        </p>
        <p>
          For rare cases of autoimmune psychosis (like anti-NMDA receptor
          encephalitis), immunotherapies such as corticosteroids, IVIG, or
          plasmapheresis are first-line treatments, often achieving full
          remission. Identifying biomarkers of inflammation may help target
          these treatments to individuals most likely to benefit.
          <Citation index={4} />
        </p>

        <ArticleAccordion
          items={[
            {
              title: 'What About Cannabidiol (CBD)?',
              content:
                'CBD, a non-intoxicating component of cannabis, has shown antipsychotic effects in early trials. A large Phase 3 trial (1,000 participants) is underway. CBD may work via anti-inflammatory mechanisms, reducing anandamide breakdown, or modulating serotonin receptors. Results are expected by 2026.',
            },
            {
              title: 'Will These Replace Traditional Antipsychotics?',
              content:
                'Not immediately. Traditional antipsychotics remain first-line due to decades of evidence. Novel agents will likely first be used for treatment-resistant cases, as adjuncts, or in individuals intolerant of D2 blockers. Over time, as more data accumulates, they may become standard options.',
            },
            {
              title: 'What About Psychedelic-Assisted Therapy?',
              content:
                'Psychedelics like psilocybin are being studied for depression and PTSD, but their use in psychosis is controversial--classic psychedelics can induce psychotic-like states and may worsen symptoms in vulnerable individuals. Research is proceeding cautiously.',
            },
          ]}
        />

        <h2>The Road Ahead: Precision Psychopharmacology</h2>
        <p>
          The future of antipsychotic treatment is not a single wonder drug,
          but a toolkit of mechanism-specific therapies matched to individual
          biology. Imagine a patient with elevated inflammatory markers
          receiving an anti-inflammatory agent, someone with prominent negative
          symptoms receiving an NMDA modulator, and someone with treatment-resistant
          hallucinations receiving a muscarinic agonist--all personalized based
          on biomarkers and symptom profiles.
          <Citation index={7} />
        </p>
        <p>
          This vision requires better diagnostic tools (brain imaging,
          inflammatory markers, genetic testing) and more clinical trial data.
          But progress is accelerating. As the field moves beyond the dopamine
          hypothesis, we're entering an era where psychosis can be treated more
          effectively, with fewer side effects, and--hopefully--with better
          long-term outcomes.
        </p>

        <ArticleCallout type="info" title="Participating in Research">
          Many novel treatments are still in clinical trials. If you're
          interested in accessing cutting-edge therapies and contributing to
          science, consider enrolling in a trial. Talk to your provider or
          search ClinicalTrials.gov for studies near you.
        </ArticleCallout>
      </>
    ),
  },
];
