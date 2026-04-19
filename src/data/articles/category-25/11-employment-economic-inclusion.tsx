
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DISABILITY_ACCESSIBILITY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Employment & Economic Inclusion | Articles 52–52
// ============================================================================

export const employmentEconomicInclusionArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-DIS-010 | Disability and Employment: The Psychological Impact of Worki
  // --------------------------------------------------------------------------
  {
    id: catId(52),
    slug: 'disability-employment-workplace',
    title: 'Disability and Employment: The Psychological Impact of Working While Disabled',
    description: 'Disabled people who want to work face a 35-point employment gap, systemic discrimination, and inadequate accommodations. Employment is a mental health intervention—when the workplace doesn\'t make you sick.',
    image: '/images/articles/cat25/cover-052.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 16,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['disability employment', 'workplace accommodations', 'disability discrimination work', 'employment gap disability', 'disability and income'],

    summary: 'Employment is one of the strongest social determinants of mental health—providing income, structure, purpose, social connection, and identity. For disabled people, the employment gap is staggering: in the United States, only 21% of working-age disabled people are employed, compared to 65% of non-disabled people—a gap that has barely narrowed in the 35 years since the Americans with Disabilities Act was signed. This gap is not explained by incapacity: the majority of unemployed disabled people want to work and could work with appropriate accommodations. It is explained by discrimination (disabled job applicants are 26% less likely to receive callbacks than identical non-disabled applicants), inadequate accommodations (employers who treat "reasonable adjustments" as extraordinary burdens rather than standard practice), inaccessible workplaces (physical, digital, and attitudinal barriers), benefits traps (disability benefit systems that discourage employment by threatening loss of healthcare and income), and a labor market that equates productivity with speed, consistency, and physical presence. The mental health consequences are bidirectional: unemployment worsens depression and anxiety in disabled people (as it does in everyone), while hostile or inaccessible workplaces produce work-related psychological injury. The solution is not simply "getting disabled people into jobs"—it\'s creating workplaces where disabled people can work without being harmed by the experience.',

    keyFacts: [
      { text: 'The disability employment gap is 35+ percentage points and has barely changed in decades', citationIndex: 1 },
      { text: 'Disabled job applicants face measurable hiring discrimination', citationIndex: 2 },
      { text: 'Workplace accommodations are typically low-cost but massively underutilized', citationIndex: 3 },
      { text: 'The "benefits trap" discourages disabled people from working by threatening loss of healthcare and income', citationIndex: 4 },
      { text: 'Employment is a mental health intervention—when the workplace is accessible and inclusive', citationIndex: 5 },
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
      { id: '1', text: 'Bureau of Labor Statistics. (2024). Persons with a Disability: Labor Force Characteristics. US Department of Labor.', source: 'Persons with a Disability: Labor Force Characteristics', year: '2024', link: '', tier: 1 },
      { id: '2', text: 'Ameri, M., et al. (2018). The disability employment puzzle: a field experiment on employer hiring behavior. ILR Review, 71(2), 329-364. https://doi.org/10.1177/0019793917717474', source: 'ILR Review', year: '2018', link: '', tier: 1 },
      { id: '3', text: 'Schur, L., et al. (2014). Disability at work: a look back and forward. Journal of Occupational Rehabilitation, 24(1), 52-59. https://doi.org/10.1007/s10926-013-9471-z', source: 'Journal of Occupational Rehabilitation', year: '2014', link: '', tier: 1 },
      { id: '4', text: 'Stapleton, D. C., et al. (2006). Exploring the economic benefits of return to work. Journal of Disability Policy Studies, 16(4), 231-239.', source: 'Journal of Disability Policy Studies', year: '2006', link: '', tier: 1 },
      { id: '5', text: 'Marmot, M., et al. (2010). Fair society, healthy lives: the Marmot Review. The Lancet, 376(9755), 1811-1813.', source: 'The Lancet', year: '2010', link: '', tier: 1 },
      { id: '6', text: 'World Health Organization. (2011). World Report on Disability. WHO.', source: 'World Report on Disability', year: '2011', link: '', tier: 2 },
      { id: '7', text: 'Drake, R. E., et al. (2012). Individual placement and support: an evidence-based approach to supported employment. Oxford University Press.', source: 'Oxford University Press', year: '2012', link: '', tier: 5 },
      { id: '8', text: 'Bonaccio, S., et al. (2020). The participation of people with disabilities in the workplace across the employment cycle. Journal of Management, 46(6), 878-900. https://doi.org/10.1177/0149206319892614', source: 'Journal of Management', year: '2020', link: '', tier: 1 },
      { id: '9', text: 'Job Accommodation Network. (2023). Accommodation and Compliance: Low Cost, High Impact. US Department of Labor.', source: 'Accommodation and Compliance: Low Cost, High Impact', year: '2023', link: '', tier: 1 },
      { id: '10', text: 'Vornholt, K., et al. (2018). Disability and employment—overview and highlights. European Journal of Work and Organizational Psychology, 27(1), 40-55. https://doi.org/10.1080/1359432X.2017.1387536', source: 'European Journal of Work and Organizational Psychology', year: '2018', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Employment is one of the strongest social determinants of mental health—providing income, structure, purpose, social connection, and identity. For disabled people, the employment gap is staggering: in the United States, only 21% of working-age disabled people are employed, compared to 65% of non-disabled people—a gap that has barely narrowed in the 35 years since the Americans with Disabilities Act was signed.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          The disability employment gap is 35+ percentage points and has barely changed in decades
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          Disabled job applicants face measurable hiring discrimination
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Persons with a Disability: Labor Force Characteristics" year="2024" tier={1} />
          <Citation id="2" index={2} source="ILR Review" year="2018" tier={1} />
          <Citation id="3" index={3} source="Journal of Occupational Rehabilitation" year="2014" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
