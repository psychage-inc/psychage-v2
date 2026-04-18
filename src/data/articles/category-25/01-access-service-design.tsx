
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DISABILITY_ACCESSIBILITY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Access & Service Design | Articles 1–1
// ============================================================================

export const accessServiceDesignArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-DIS-006 | Accessible Mental Health Care: Why Therapy Shouldn't Require
  // --------------------------------------------------------------------------
  {
    id: catId(1),
    slug: 'accessible-mental-health-care',
    title: 'Accessible Mental Health Care: Why Therapy Shouldn\'t Require an Obstacle Course',
    description: 'Most mental health services are inaccessible to disabled people—physically, communicatively, financially, and attitudinally. Here\'s what accessible therapy actually looks like and why it matters.',
    image: '/images/articles/cat25/cover-001.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 16,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['accessible therapy', 'disability and therapy access', 'accessible mental health services', 'teletherapy accessibility', 'therapy accommodations'],

    summary: 'Despite experiencing mental health conditions at two to four times the general population rate, disabled people face systematic barriers to accessing mental health services—barriers that exist at every stage of the care pathway, from finding a provider to sitting in a therapy session. Physical barriers (offices without wheelchair access, therapy rooms too small for mobility devices, inaccessible parking) remain common despite legal mandates like the Americans with Disabilities Act. Communication barriers (lack of sign language interpretation, materials not available in accessible formats, no accommodation for communication disabilities) exclude millions. Attitudinal barriers (clinicians who lack disability competence, who focus on disability as the presenting problem, who express pity or discomfort, who assume disabled people can\'t benefit from therapy) may be the most damaging of all. Financial barriers (higher healthcare costs for disabled people, insurance limitations, reduced employment and income) compound access difficulties. Digital barriers (teletherapy platforms without screen reader compatibility, video sessions without captioning, apps without accessibility features) have created new exclusions even as they\'ve expanded access for some. The result is a mental health system that most needs to serve disabled populations and least succeeds in doing so. Accessible mental health care is not a special accommodation—it\'s a professional obligation and a civil right.',

    keyFacts: [
      { text: 'Only 3.6% of APA-accredited psychology programs require disability-specific training', citationIndex: 1 },
      { text: '40-50% of disabled people report having experienced barriers to mental health care', citationIndex: 2 },
      { text: 'Teletherapy expanded access for some disabled people while creating new barriers for others', citationIndex: 3 },
      { text: 'Universal design in mental health settings benefits all clients, not just disabled ones', citationIndex: 4 },
      { text: 'Disability-competent therapy produces measurably better outcomes than standard therapy for disabled clients', citationIndex: 5 },
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
      { id: '1', text: 'Strike, D. L., et al. (2004). Unmet needs of persons with physical disabilities served by centers for independent living. Rehabilitation Counseling Bulletin, 48(1), 8-17.', source: 'Rehabilitation Counseling Bulletin', year: '2004', link: '', tier: 1 },
      { id: '2', text: 'Drainoni, M.-L., et al. (2006). Cross-disability experiences of barriers to health-care access: consumer perspectives. Journal of Disability Policy Studies, 17(2), 101-115. https://doi.org/10.1177/10442073060170020101', source: 'Journal of Disability Policy Studies', year: '2006', link: '', tier: 1 },
      { id: '3', text: 'Lund, E. M., et al. (2020). The COVID-19 pandemic, stress, and trauma in the disability community: a call to action. Rehabilitation Psychology, 65(4), 313-322. https://doi.org/10.1037/rep0000368', source: 'Rehabilitation Psychology', year: '2020', link: '', tier: 1 },
      { id: '4', text: 'Burgstahler, S. (2015). Universal Design in Higher Education: From Principles to Practice. Harvard Education Press.', source: 'Universal Design in Higher Education: From Principles to Practice', year: '2015', link: '', tier: 5 },
      { id: '5', text: 'Olkin, R. (2017). Disability-Affirmative Therapy: A Case Formulation Template for Clients with Disabilities. Oxford University Press.', source: 'Disability-Affirmative Therapy: A Case Formulation Template for Clients with Disabilities', year: '2017', link: '', tier: 5 },
      { id: '6', text: 'Andrews, E. E. (2020). Disability as Diversity: Developing Cultural Competence. Oxford University Press.', source: 'Disability as Diversity: Developing Cultural Competence', year: '2020', link: '', tier: 5 },
      { id: '7', text: 'Iezzoni, L. I., et al. (2021). Physicians\' perceptions of people with disability and their health care. Health Affairs, 40(2), 297-306. https://doi.org/10.1377/hlthaff.2020.01452', source: 'Health Affairs', year: '2021', link: '', tier: 1 },
      { id: '8', text: 'Krahn, G. L., et al. (2015). Persons with disabilities as an unrecognized health disparity population. American Journal of Public Health, 105(S2), S198-S206. https://doi.org/10.2105/AJPH.2014.302182', source: 'American Journal of Public Health', year: '2015', link: '', tier: 1 },
      { id: '9', text: 'Shakespeare, T. (2006). Disability Rights and Wrongs. Routledge.', source: 'Disability Rights and Wrongs', year: '2006', link: '', tier: 5 },
      { id: '10', text: 'National Council on Disability. (2009). The Current State of Health Care for People with Disabilities. Washington, DC: NCD.', source: 'The Current State of Health Care for People with Disabilities', year: '2009', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Despite experiencing mental health conditions at two to four times the general population rate, disabled people face systematic barriers to accessing mental health services—barriers that exist at every stage of the care pathway, from finding a provider to sitting in a therapy session. Physical barriers (offices without wheelchair access, therapy rooms too small for mobility devices, inaccessible parking) remain common despite legal mandates like the Americans with Disabilities Act.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          Only 3.6% of APA-accredited psychology programs require disability-specific training
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          40-50% of disabled people report having experienced barriers to mental health care
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Rehabilitation Counseling Bulletin" year="2004" tier={1} />
          <Citation id="2" index={2} source="Journal of Disability Policy Studies" year="2006" tier={1} />
          <Citation id="3" index={3} source="Rehabilitation Psychology" year="2020" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
