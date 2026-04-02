
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DISABILITY_ACCESSIBILITY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Aging, Disability & Mental Health | Articles 8–8
// ============================================================================

export const agingDisabilityMentalHealthArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-DIS-011 | Disability and Aging: When the Body Changes and the World Do
  // --------------------------------------------------------------------------
  {
    id: catId(8),
    slug: 'disability-aging-mental-health',
    title: 'Disability and Aging: When the Body Changes and the World Doesn\'t Adapt',
    description: 'Aging with disability and acquiring disability through aging are two different experiences—both underserved by a healthcare system that treats disability and aging as separate problems.',
    image: '/images/articles/cat25/cover-008.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 16,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['disability aging', 'aging with disability', 'elderly disability mental health', 'acquired disability aging', 'disability and dementia'],

    summary: 'The intersection of disability and aging produces two distinct but overlapping populations with profoundly underserved mental health needs. People aging with disability (those who have lived with disability for decades and are now growing older) face unique challenges: premature aging effects, declining function in already-compromised systems, loss of hard-won independence, and a healthcare system that has no infrastructure for the "old disabled" as opposed to the "old" or the "disabled" separately. People acquiring disability through aging (those who become disabled in later life through stroke, falls, vision loss, hearing loss, arthritis, or cognitive decline) face a different set of challenges: identity disruption from becoming disabled after a lifetime of able-bodiedness, grief for lost function, the stigma of disability compounded by the stigma of aging, and inadequate rehabilitation services that assume older people are less worth investing in. Both populations experience elevated rates of depression (25-40%), anxiety, social isolation, and suicidal ideation. The mental health consequences are driven by the interaction of ageism and ableism—two forms of discrimination that, when combined, produce compounded marginalization. Aging with disability is not simply "getting old" plus "being disabled"—it is a distinct experience that requires specialized understanding, integrated services, and a healthcare system that stops treating disability and aging as separate conditions managed by separate specialties that rarely communicate.',

    keyFacts: [
      { text: 'People who have lived with disability since early life experience premature aging—losing function 15-20 years earlier than non-disabled peers', citationIndex: 1 },
      { text: 'Acquired disability in later life produces depression in 25-40% of affected individuals—with highest rates in the first year', citationIndex: 2 },
      { text: 'Ageism and ableism compound each other—producing "double jeopardy" marginalization', citationIndex: 3 },
      { text: 'Social isolation is the strongest modifiable risk factor for depression in older disabled people', citationIndex: 4 },
      { text: 'Aging in place—remaining in one\'s own home and community—is the strongest preference of older disabled people and the most cost-effective service model', citationIndex: 5 },
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
      { id: '1', text: 'Kemp, B., & Mosqueda, L. (2004). Aging with a Disability: What the Clinician Needs to Know. Johns Hopkins University Press.', source: 'Aging with a Disability: What the Clinician Needs to Know', year: '2004', link: '', tier: 5 },
      { id: '2', text: 'Alexopoulos, G. S. (2005). Depression in the elderly. The Lancet, 365(9475), 1961-1970. https://doi.org/10.1016/S0140-6736(05)66665-2', source: 'The Lancet', year: '2005', link: '', tier: 1 },
      { id: '3', text: 'Jönson, H., & Larsson, A. T. (2009). The exclusion of older people in disability activism and disability studies: a case of inadvertent ageism? Journal of Aging Studies, 23(1), 69-77. https://doi.org/10.1016/j.jaging.2007.09.001', source: 'Journal of Aging Studies', year: '2009', link: '', tier: 1 },
      { id: '4', text: 'Holt-Lunstad, J., et al. (2015). Loneliness and social isolation as risk factors for mortality: a meta-analytic review. Perspectives on Psychological Science, 10(2), 227-237. https://doi.org/10.1177/1745691614568352', source: 'Perspectives on Psychological Science', year: '2015', link: '', tier: 1 },
      { id: '5', text: 'Wiles, J. L., et al. (2012). The meaning of "aging in place" to older people. The Gerontologist, 52(3), 357-366. https://doi.org/10.1093/geront/gnr098', source: 'The Gerontologist', year: '2012', link: '', tier: 1 },
      { id: '6', text: 'Molton, I. R., & Yorkston, K. M. (2017). Growing older with a physical disability: a special application of the successful aging paradigm. The Journals of Gerontology: Series B, 72(2), 290-299. https://doi.org/10.1093/geronb/gbw122', source: 'The Journals of Gerontology: Series B', year: '2017', link: '', tier: 1 },
      { id: '7', text: 'Hackett, M. L., & Pickles, K. (2014). Part I: frequency of depression after stroke: an updated systematic review and meta-analysis of observational studies. International Journal of Stroke, 9(8), 1017-1025.', source: 'International Journal of Stroke', year: '2014', link: '', tier: 1 },
      { id: '8', text: 'Campbell, V. A., et al. (1999). Surveillance for sensory impairment, activity limitation, and health-related quality of life among older adults. Morbidity and Mortality Weekly Report, 48(SS-8), 131-156.', source: 'Morbidity and Mortality Weekly Report', year: '1999', link: '', tier: 1 },
      { id: '9', text: 'Kitwood, T. (1997). Dementia Reconsidered: The Person Comes First. Open University Press.', source: 'Dementia Reconsidered: The Person Comes First', year: '1997', link: '', tier: 5 },
      { id: '10', text: 'Iezzoni, L. I. (2011). Eliminating health and health care disparities among the growing population of people with disabilities. Health Affairs, 30(10), 1947-1954. https://doi.org/10.1377/hlthaff.2011.0613', source: 'Health Affairs', year: '2011', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The intersection of disability and aging produces two distinct but overlapping populations with profoundly underserved mental health needs. People aging with disability (those who have lived with disability for decades and are now growing older) face unique challenges: premature aging effects, declining function in already-compromised systems, loss of hard-won independence, and a healthcare system that has no infrastructure for the &quot;old disabled&quot; as opposed to the &quot;old&quot; or the &quot;disabled&quot; separately.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          People who have lived with disability since early life experience premature aging—losing function 15-20 years earlier than non-disabled peers
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          Acquired disability in later life produces depression in 25-40% of affected individuals—with highest rates in the first year
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Aging with a Disability: What the Clinician Needs to Know" year="2004" tier={5} />
          <Citation id="2" index={2} source="The Lancet" year="2005" tier={1} />
          <Citation id="3" index={3} source="Journal of Aging Studies" year="2009" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
