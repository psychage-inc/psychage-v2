
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DISABILITY_ACCESSIBILITY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Universal Design & Inclusion | Articles 64–64
// ============================================================================

export const universalDesignInclusionArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-DIS-012 | Universal Design and Psychological Inclusion: Building a Wor
  // --------------------------------------------------------------------------
  {
    id: catId(64),
    slug: 'universal-design-psychological-inclusion',
    title: 'Universal Design and Psychological Inclusion: Building a World That Works for Every Mind and Body',
    description: 'Universal design—building environments, products, and services for the widest range of human variation from the start—isn\'t just good ethics. It\'s better design. Here\'s the psychology of inclusion.',
    image: '/images/articles/cat25/cover-064.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 16,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['universal design', 'psychological inclusion', 'inclusive design', 'accessibility design', 'disability inclusion'],

    summary: 'Universal design—the principle that environments, products, and services should be designed from the outset to be usable by the widest possible range of people, without requiring adaptation or specialized design—represents a fundamental shift from the traditional accommodation model. Rather than building for an imaginary "average" user and then retrofitting for those who don\'t fit, universal design starts with the full range of human variation: different bodies, different senses, different cognitive profiles, different developmental stages, and different cultural contexts. The psychological implications of this design philosophy are profound. Inclusive environments reduce minority stress: when disabled people don\'t have to fight for access, negotiate accommodations, or encounter barriers that signal their exclusion, the chronic stress that produces depression and anxiety is reduced at the structural level. Universal design benefits everyone, not just disabled people: curb cuts help parents with strollers, delivery workers with carts, and travelers with luggage; captions help non-native speakers, people in noisy environments, and children learning to read; flexible work schedules help caregivers, people with chronic conditions, and anyone with a life outside work. The built environment communicates belonging: when a space is accessible, it communicates "you were expected here"; when it\'s not, it communicates "you weren\'t considered." This communication has measurable psychological effects on self-esteem, belonging, and identity. Universal design is not merely a technical standard—it\'s a statement about who matters, whose presence is anticipated, and what kind of society we choose to build.',

    keyFacts: [
      { text: 'The curb cut effect demonstrates that disability-driven design innovations benefit the entire population', citationIndex: 1 },
      { text: 'The built environment produces measurable psychological effects on belonging, stress, and self-esteem', citationIndex: 2 },
      { text: 'Universal Design for Learning (UDL) improves educational outcomes for all students, not just disabled students', citationIndex: 3 },
      { text: 'Sensory design—creating environments that accommodate diverse sensory profiles—reduces distress across neurodivergent and neurotypical populations', citationIndex: 4 },
      { text: 'Inclusive digital design is a civil rights issue that affects 1+ billion people globally', citationIndex: 5 },
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
      { id: '1', text: 'Blackwell, A. G. (2017). The curb-cut effect. Stanford Social Innovation Review, 15(1), 28-33.', source: 'Stanford Social Innovation Review', year: '2017', link: '', tier: 1 },
      { id: '2', text: 'Imrie, R. (2012). Universalism, universal design and equitable access to the built environment. Disability and Rehabilitation, 34(10), 873-882. https://doi.org/10.3109/09638288.2011.624250', source: 'Disability and Rehabilitation', year: '2012', link: '', tier: 1 },
      { id: '3', text: 'Rose, D. H., & Meyer, A. (2002). Teaching Every Student in the Digital Age: Universal Design for Learning. ASCD.', source: 'Teaching Every Student in the Digital Age: Universal Design for Learning', year: '2002', link: '', tier: 1 },
      { id: '4', text: 'Mostafa, M. (2014). Architecture for autism: autism ASPECTSS design index. Archnet-IJAR: International Journal of Architectural Research, 8(1), 143-158.', source: 'Archnet-IJAR: International Journal of Architectural Research', year: '2014', link: '', tier: 1 },
      { id: '5', text: 'WebAIM. (2024). The WebAIM Million: An Annual Accessibility Analysis of the Top 1,000,000 Home Pages. Institute for Disability Research, Policy, and Practice.', source: 'The WebAIM Million: An Annual Accessibility Analysis of the Top 1,000,000 Home Pages', year: '2024', link: '', tier: 3 },
      { id: '6', text: 'Story, M. F., et al. (1998). The Universal Design File: Designing for People of All Ages and Abilities. NC State University, Center for Universal Design.', source: 'The Universal Design File: Designing for People of All Ages and Abilities', year: '1998', link: '', tier: 1 },
      { id: '7', text: 'Steinfeld, E., & Maisel, J. L. (2012). Universal Design: Creating Inclusive Environments. Wiley.', source: 'Universal Design: Creating Inclusive Environments', year: '2012', link: '', tier: 5 },
      { id: '8', text: 'World Health Organization. (2011). World Report on Disability. WHO.', source: 'World Report on Disability', year: '2011', link: '', tier: 2 },
      { id: '9', text: 'Hamraie, A. (2017). Building Access: Universal Design and the Politics of Disability. University of Minnesota Press.', source: 'Building Access: Universal Design and the Politics of Disability', year: '2017', link: '', tier: 5 },
      { id: '10', text: 'Preiser, W. F. E., & Smith, K. H. (2011). Universal Design Handbook. McGraw-Hill.', source: 'Universal Design Handbook', year: '2011', link: '', tier: 5 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Universal design—the principle that environments, products, and services should be designed from the outset to be usable by the widest possible range of people, without requiring adaptation or specialized design—represents a fundamental shift from the traditional accommodation model. Rather than building for an imaginary &quot;average&quot; user and then retrofitting for those who don&apos;t fit, universal design starts with the full range of human variation: different bodies, different senses, different cognitive profiles, different developmental stages, and different cultural contexts.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          The curb cut effect demonstrates that disability-driven design innovations benefit the entire population
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          The built environment produces measurable psychological effects on belonging, stress, and self-esteem
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Stanford Social Innovation Review" year="2017" tier={1} />
          <Citation id="2" index={2} source="Disability and Rehabilitation" year="2012" tier={1} />
          <Citation id="3" index={3} source="Teaching Every Student in the Digital Age: Universal Design for Learning" year="2002" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
