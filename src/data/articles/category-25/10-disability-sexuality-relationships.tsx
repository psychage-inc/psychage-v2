
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DISABILITY_ACCESSIBILITY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Disability, Sexuality & Relationships | Articles 51–51
// ============================================================================

export const disabilitySexualityRelationshipsArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-DIS-009 | Disability, Sexuality, and Intimacy: Reclaiming Desire in Bo
  // --------------------------------------------------------------------------
  {
    id: catId(51),
    slug: 'disability-sexuality-intimacy',
    title: 'Disability, Sexuality, and Intimacy: Reclaiming Desire in Bodies That Don\'t Fit the Script',
    description: 'Disabled people are sexual beings—but society treats them as if they\'re not. Here\'s the psychology of sexuality, intimacy, and desire in the context of disability.',
    image: '/images/articles/cat25/cover-051.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 16,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['disability sexuality', 'disabled intimacy', 'disability sex education', 'sexual health disability', 'disability desexualization'],

    summary: 'Sexuality is a fundamental dimension of human experience—and disability does not erase it. Yet disabled people are among the most desexualized populations in contemporary society: treated as asexual by default, excluded from sex education, absent from media representations of desire, and subjected to a cultural narrative that frames disability and sexuality as incompatible. This desexualization is not benign—it denies a basic aspect of human identity, compounds social isolation, and contributes to psychological distress. The reality is that the vast majority of disabled people are sexual beings who experience desire, pursue intimacy, form romantic and sexual partnerships, and have the same right to sexual expression as anyone else. Disability may change how sexuality is experienced and expressed—requiring adaptation, communication, creativity, and sometimes assistive technology—but it does not eliminate it. Research documents that sexual satisfaction in disabled people is more strongly predicted by relationship quality, body image, and psychosocial factors than by the nature or severity of the disability. The mental health implications are significant: sexual wellbeing is a protective factor for depression and self-esteem, sexual difficulties predict psychological distress, and the intersection of disability stigma with sexual shame creates a compound burden that deserves clinical attention it rarely receives.',

    keyFacts: [
      { text: 'Disabled people are systematically desexualized—and this desexualization is itself a form of ableism', citationIndex: 1 },
      { text: 'Sexual satisfaction after spinal cord injury is predicted more by relationship quality and psychological adjustment than by neurological function', citationIndex: 2 },
      { text: 'Body image and internalized ableism are major barriers to sexual wellbeing in disabled people', citationIndex: 3 },
      { text: 'Disabled people experience sexual violence at significantly higher rates than non-disabled people', citationIndex: 4 },
      { text: 'Adaptive sexuality—creative approaches to sexual expression that accommodate disability—is effective and underutilized', citationIndex: 5 },
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
      { id: '1', text: 'Shildrick, M. (2009). Dangerous Discourses of Disability, Subjectivity and Sexuality. Palgrave Macmillan.', source: 'Dangerous Discourses of Disability, Subjectivity and Sexuality', year: '2009', link: '', tier: 1 },
      { id: '2', text: 'Kreuter, M., et al. (2011). Sexual adjustment and its predictors after traumatic spinal cord injury. Archives of Physical Medicine and Rehabilitation, 92(6), 930-936. https://doi.org/10.1016/j.apmr.2010.12.022', source: 'Archives of Physical Medicine and Rehabilitation', year: '2011', link: '', tier: 1 },
      { id: '3', text: 'Taleporos, G., & McCabe, M. P. (2002). Body image and physical disability—personal perspectives. Social Science & Medicine, 54(6), 971-980. https://doi.org/10.1016/S0277-9536(01)00069-7', source: 'Social Science & Medicine', year: '2002', link: '', tier: 1 },
      { id: '4', text: 'Hughes, K., et al. (2012). Prevalence and risk of violence against adults with disabilities. The Lancet, 379(9826), 1621-1629. https://doi.org/10.1016/S0140-6736(11)61851-5', source: 'The Lancet', year: '2012', link: '', tier: 1 },
      { id: '5', text: 'Kaufman, M., Silverberg, C., & Odette, F. (2007). The Ultimate Guide to Sex and Disability. Cleis Press.', source: 'The Ultimate Guide to Sex and Disability', year: '2007', link: '', tier: 5 },
      { id: '6', text: 'Shakespeare, T., et al. (1996). The Sexual Politics of Disability: Untold Desires. Cassell.', source: 'The Sexual Politics of Disability: Untold Desires', year: '1996', link: '', tier: 1 },
      { id: '7', text: 'Esmail, S., et al. (2010). Attitudes and perceptions towards disability and sexuality. Disability and Rehabilitation, 32(14), 1148-1155. https://doi.org/10.3109/09638280903419277', source: 'Disability and Rehabilitation', year: '2010', link: '', tier: 1 },
      { id: '8', text: 'Milligan, M. S., & Neufeldt, A. H. (2001). The myth of asexuality: a survey of social and empirical evidence. Sexuality and Disability, 19(2), 91-109. https://doi.org/10.1023/A:1010621705591', source: 'Sexuality and Disability', year: '2001', link: '', tier: 1 },
      { id: '9', text: 'Tepper, M. S. (2000). Sexuality and disability: the missing discourse of pleasure. Sexuality and Disability, 18(4), 283-290.', source: 'Sexuality and Disability', year: '2000', link: '', tier: 1 },
      { id: '10', text: 'World Health Organization. (2006). Defining Sexual Health: Report of a Technical Consultation on Sexual Health. WHO.', source: 'Defining Sexual Health: Report of a Technical Consultation on Sexual Health', year: '2006', link: '', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Sexuality is a fundamental dimension of human experience—and disability does not erase it. Yet disabled people are among the most desexualized populations in contemporary society: treated as asexual by default, excluded from sex education, absent from media representations of desire, and subjected to a cultural narrative that frames disability and sexuality as incompatible.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          Disabled people are systematically desexualized—and this desexualization is itself a form of ableism
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          Sexual satisfaction after spinal cord injury is predicted more by relationship quality and psychological adjustment than by neurological function
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Dangerous Discourses of Disability, Subjectivity and Sexuality" year="2009" tier={1} />
          <Citation id="2" index={2} source="Archives of Physical Medicine and Rehabilitation" year="2011" tier={1} />
          <Citation id="3" index={3} source="Social Science & Medicine" year="2002" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
