
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DISABILITY_ACCESSIBILITY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Neurodivergence & Disability | Articles 54–54
// ============================================================================

export const neurodivergenceDisabilityArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-DIS-007 | Neurodivergence and Disability Identity: When Your Brain Wor
  // --------------------------------------------------------------------------
  {
    id: catId(54),
    slug: 'neurodivergence-disability-identity',
    title: 'Neurodivergence and Disability Identity: When Your Brain Works Differently in a World That Demands Sameness',
    description: 'Neurodivergence—autism, ADHD, dyslexia, and related conditions—sits at the intersection of disability and human variation. Here\'s how the neurodiversity paradigm reshapes mental health.',
    image: '/images/articles/cat25/cover-054.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 17,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['neurodivergence', 'neurodiversity', 'autism identity', 'ADHD disability', 'neurodivergent mental health'],

    summary: 'The neurodiversity paradigm—the view that neurological differences such as autism, ADHD, dyslexia, Tourette syndrome, and other conditions represent natural human variation rather than deficits to be cured—has transformed how millions of people understand their own brains. Coined by sociologist Judy Singer in 1998, the term "neurodiversity" draws a direct parallel to biodiversity: just as ecological systems benefit from species diversity, human societies benefit from cognitive diversity. This paradigm sits at a productive tension with the disability framework: neurodivergent people often need accommodations, face discrimination, and experience genuine functional challenges that warrant the protections and resources that disability status provides—yet many resist the deficit framing that traditional disability models impose. The mental health implications are enormous. Neurodivergent people experience depression, anxiety, and suicidality at rates far exceeding the general population, but much of this elevated risk comes not from neurodivergence itself but from the chronic stress of masking (suppressing neurodivergent traits to appear neurotypical), autistic burnout (the cumulative cost of sustained masking and environmental mismatch), late or missed diagnosis (particularly in women and people of color), inadequate accommodation in school and workplace settings, and internalized ableism (absorbing the message that your brain is broken). Understanding neurodivergence through both disability and diversity lenses—simultaneously—is essential for providing mental health care that validates rather than pathologizes neurological difference.',

    keyFacts: [
      { text: 'Autistic adults experience depression at approximately 4× the general population rate and suicidality at 3-7× the general rate', citationIndex: 1 },
      { text: 'Masking—the chronic suppression of neurodivergent traits—is a significant mental health risk factor', citationIndex: 2 },
      { text: 'Autistic burnout is a distinct phenomenon characterized by chronic exhaustion, skill regression, and reduced tolerance to stimuli', citationIndex: 3 },
      { text: 'ADHD is associated with significantly elevated rates of anxiety (47%), depression (39%), and substance use disorders (21%)', citationIndex: 4 },
      { text: 'The neurodiversity paradigm does not deny disability—it reframes its source', citationIndex: 5 },
    ],

    sparkMoment: '',

    practicalExercise: {
      title: 'Reflection Exercise',
      steps: [
        { title: 'Reflect', description: 'Consider how the concepts in this article apply to your own experience.' },
        { title: 'Journal', description: 'Write down your thoughts and any insights that emerged.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    },

    citations: [
      { id: '1', text: 'Cassidy, S., et al. (2018). Risk markers for suicidality in autistic adults. Molecular Autism, 9, 42. https://doi.org/10.1186/s13229-018-0226-4', source: 'Molecular Autism', year: '2018', link: '', tier: 1 },
      { id: '2', text: 'Hull, L., et al. (2017). "Putting on my best normal": social camouflaging in adults with autism spectrum conditions. Journal of Autism and Developmental Disorders, 47(8), 2519-2534. https://doi.org/10.1007/s10803-017-3166-5', source: 'Journal of Autism and Developmental Disorders', year: '2017', link: '', tier: 1 },
      { id: '3', text: 'Raymaker, D. M., et al. (2020). "Having all of your internal resources exhausted beyond measure and being left with no clean-up crew": defining autistic burnout. Autism in Adulthood, 2(2), 132-143. https://doi.org/10.1089/aut.2019.0079', source: 'Autism in Adulthood', year: '2020', link: '', tier: 1 },
      { id: '4', text: 'Biederman, J., et al. (2012). Adult outcome of attention-deficit/hyperactivity disorder: a controlled 16-year follow-up study. Journal of Clinical Psychiatry, 73(7), 941-950. https://doi.org/10.4088/JCP.11m07529', source: 'Journal of Clinical Psychiatry', year: '2012', link: '', tier: 1 },
      { id: '5', text: 'Walker, N. (2021). Neuroqueer Heresies: Notes on the Neurodiversity Paradigm, Autistic Empowerment, and Postnormal Possibilities. Autonomous Press.', source: 'Neuroqueer Heresies: Notes on the Neurodiversity Paradigm, Autistic Empowerment, and Postnormal Possibilities', year: '2021', link: '', tier: 5 },
      { id: '6', text: 'Singer, J. (1998). Odd People In: The Birth of Community Amongst People on the Autism Spectrum. University of Technology, Sydney.', source: 'Odd People In: The Birth of Community Amongst People on the Autism Spectrum', year: '1998', link: '', tier: 1 },
      { id: '7', text: 'Cage, E., & Troxell-Whitman, Z. (2019). Understanding the reasons, contexts and costs of camouflaging for autistic adults. Journal of Autism and Developmental Disorders, 49(5), 1899-1911. https://doi.org/10.1007/s10803-018-03878-x', source: 'Journal of Autism and Developmental Disorders', year: '2019', link: '', tier: 1 },
      { id: '8', text: 'Brown, L. X. Z., et al. (2020). All the Weight of Our Dreams: On Living Racialized Autism. DragonBee Press.', source: 'All the Weight of Our Dreams: On Living Racialized Autism', year: '2020', link: '', tier: 5 },
      { id: '9', text: 'Lai, M.-C., & Baron-Cohen, S. (2015). Identifying the lost generation of adults with autism spectrum conditions. The Lancet Psychiatry, 2(11), 1013-1027. https://doi.org/10.1016/S2215-0366(15)00277-1', source: 'The Lancet Psychiatry', year: '2015', link: '', tier: 1 },
      { id: '10', text: 'Kapp, S. K. (2020). Autistic Community and the Neurodiversity Movement: Stories from the Frontline. Palgrave Macmillan.', source: 'Autistic Community and the Neurodiversity Movement: Stories from the Frontline', year: '2020', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The neurodiversity paradigm—the view that neurological differences such as autism, ADHD, dyslexia, Tourette syndrome, and other conditions represent natural human variation rather than deficits to be cured—has transformed how millions of people understand their own brains. Coined by sociologist Judy Singer in 1998, the term &quot;neurodiversity&quot; draws a direct parallel to biodiversity: just as ecological systems benefit from species diversity, human societies benefit from cognitive diversity.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          Autistic adults experience depression at approximately 4× the general population rate and suicidality at 3-7× the general rate
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          Masking—the chronic suppression of neurodivergent traits—is a significant mental health risk factor
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Molecular Autism" year="2018" tier={1} />
          <Citation id="2" index={2} source="Journal of Autism and Developmental Disorders" year="2017" tier={1} />
          <Citation id="3" index={3} source="Autism in Adulthood" year="2020" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
