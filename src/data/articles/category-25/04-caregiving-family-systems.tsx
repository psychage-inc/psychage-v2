
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DISABILITY_ACCESSIBILITY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Caregiving & Family Systems | Articles 9–9
// ============================================================================

export const caregivingFamilySystemsArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-DIS-008 | Disability and Caregiving: The Psychological Cost of Being N
  // --------------------------------------------------------------------------
  {
    id: catId(9),
    slug: 'disability-caregiving-family',
    title: 'Disability and Caregiving: The Psychological Cost of Being Needed and Needing',
    description: 'Caregiving for a disabled family member reshapes every relationship in the family. Here\'s the psychology of caregiving—for those who give care, those who receive it, and the families that hold both.',
    image: '/images/articles/cat25/cover-009.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 16,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['disability caregiving', 'caregiver burnout', 'family disability', 'caregiver mental health', 'caregiving burden'],

    summary: 'Approximately 53 million Americans—one in five adults—provide unpaid care to a family member with a disability, chronic illness, or aging-related need. Caregiving is often framed as a private, voluntary act of love—but it is more accurately understood as an unpaid labor force that saves the US healthcare system an estimated $470 billion annually while producing significant psychological, physical, and financial costs for those who perform it. Caregiver burden—the objective demands and subjective distress of providing care—affects 40-70% of family caregivers, with depression rates of 20-40% (compared to ~7% in age-matched non-caregivers) and anxiety rates of 25-50%. But the psychology of disability and caregiving is not one-directional. Care recipients also experience psychological consequences: guilt about burdening family members, loss of autonomy, role reversal (particularly when children care for parents or parents become dependent on children), and the complex emotions of needing help in a culture that valorizes independence. The family system itself is restructured around the caregiving relationship—siblings may take on different roles, marriages strain under the asymmetry of care demands, and children who grow up as young carers develop psychological profiles that reflect both the maturity gained from responsibility and the losses incurred by a childhood organized around someone else\'s needs.',

    keyFacts: [
      { text: 'Family caregivers experience depression at 2-3× the general population rate and have elevated mortality risk', citationIndex: 1 },
      { text: '"Caregiver burden" involves both objective demands and subjective distress—and subjective burden is the stronger predictor of mental health outcomes', citationIndex: 2 },
      { text: 'Care recipients experience guilt, autonomy loss, and role reversal that produce their own psychological distress', citationIndex: 3 },
      { text: 'Young carers—children providing care for disabled or ill family members—experience a specific developmental profile', citationIndex: 4 },
      { text: 'The caregiving relationship improves when the care recipient has autonomy and the caregiver has support', citationIndex: 5 },
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
      { id: '1', text: 'Schulz, R., & Beach, S. R. (1999). Caregiving as a risk factor for mortality: the Caregiver Health Effects Study. JAMA, 282(23), 2215-2219. https://doi.org/10.1001/jama.282.23.2215', source: 'JAMA', year: '1999', link: '', tier: 1 },
      { id: '2', text: 'Zarit, S. H. (2012). Positive aspects of caregiving: more than looking on the bright side. The Gerontologist, 52(3), 426-428. https://doi.org/10.1093/geront/gns048', source: 'The Gerontologist', year: '2012', link: '', tier: 1 },
      { id: '3', text: 'Shakespeare, T. (2006). Disability Rights and Wrongs. Routledge.', source: 'Disability Rights and Wrongs', year: '2006', link: '', tier: 5 },
      { id: '4', text: 'Becker, S. (2007). Global perspectives on children\'s unpaid caregiving in the family: research and policy on \'young carers\' in the UK, Australia, the USA and Sub-Saharan Africa. Global Social Policy, 7(1), 23-50. https://doi.org/10.1177/1468018107073892', source: 'Global Social Policy', year: '2007', link: '', tier: 1 },
      { id: '5', text: 'Roth, D. L., et al. (2015). Positive aspects of family caregiving for dementia: differential item functioning by race. The Journals of Gerontology: Series B, 70(6), 813-819. https://doi.org/10.1093/geronb/gbv034', source: 'The Journals of Gerontology: Series B', year: '2015', link: '', tier: 1 },
      { id: '6', text: 'Pinquart, M., & Sörensen, S. (2003). Differences between caregivers and noncaregivers in psychological health and physical health: a meta-analysis. Psychology and Aging, 18(2), 250-267. https://doi.org/10.1037/0882-7974.18.2.250', source: 'Psychology and Aging', year: '2003', link: '', tier: 1 },
      { id: '7', text: 'Tough, H., et al. (2017). Caregiver burden and quality of life in family caregivers of patients with disabilities. Disability and Rehabilitation, 39(13), 1241-1250.', source: 'Disability and Rehabilitation', year: '2017', link: '', tier: 1 },
      { id: '8', text: 'Morris, J. (1993). Independent Lives?: Community Care and Disabled People. Macmillan.', source: 'Independent Lives?: Community Care and Disabled People', year: '1993', link: '', tier: 1 },
      { id: '9', text: 'Earley, L., & Cushway, D. (2002). The parentified child. Clinical Child Psychology and Psychiatry, 7(2), 163-178. https://doi.org/10.1177/1359104502007002005', source: 'Clinical Child Psychology and Psychiatry', year: '2002', link: '', tier: 1 },
      { id: '10', text: 'National Alliance for Caregiving. (2020). Caregiving in the US 2020. NAC/AARP.', source: 'Caregiving in the US 2020', year: '2020', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Approximately 53 million Americans—one in five adults—provide unpaid care to a family member with a disability, chronic illness, or aging-related need. Caregiving is often framed as a private, voluntary act of love—but it is more accurately understood as an unpaid labor force that saves the US healthcare system an estimated $470 billion annually while producing significant psychological, physical, and financial costs for those who perform it.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          Family caregivers experience depression at 2-3× the general population rate and have elevated mortality risk
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          &quot;Caregiver burden&quot; involves both objective demands and subjective distress—and subjective burden is the stronger predictor of mental health outcomes
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="JAMA" year="1999" tier={1} />
          <Citation id="2" index={2} source="The Gerontologist" year="2012" tier={1} />
          <Citation id="3" index={3} source="Disability Rights and Wrongs" year="2006" tier={5} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
