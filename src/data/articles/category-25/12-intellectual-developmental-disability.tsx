
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DISABILITY_ACCESSIBILITY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Intellectual & Developmental Disability | Articles 53–53
// ============================================================================

export const intellectualDevelopmentalDisabilityArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-DIS-004 | Intellectual Disability and Mental Health: The Most Underser
  // --------------------------------------------------------------------------
  {
    id: catId(53),
    slug: 'intellectual-disability-mental-health',
    title: 'Intellectual Disability and Mental Health: The Most Underserved Population in Psychiatry',
    description: 'People with intellectual disabilities experience mental health conditions at 2-4× the general population rate—yet receive the least mental health support. Here\'s why and what needs to change.',
    image: '/images/articles/cat25/cover-053.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 17,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['intellectual disability mental health', 'learning disability psychology', 'dual diagnosis', 'diagnostic overshadowing', 'IDD mental health'],

    summary: 'People with intellectual disabilities (ID)—characterized by significant limitations in both intellectual functioning (IQ below 70) and adaptive behavior, originating before age 18—represent approximately 1-3% of the global population and experience mental health conditions at rates two to four times higher than the general population. Despite this elevated prevalence, they are among the most underserved populations in psychiatry and psychology. The reasons are structural and attitudinal: diagnostic overshadowing (attributing psychiatric symptoms to the intellectual disability rather than recognizing them as separate, treatable conditions), a profound shortage of clinicians trained to assess and treat mental health conditions in people with ID, communication barriers that make standard psychiatric assessment unreliable, historical institutionalization that produced trauma across entire generations, and pervasive assumptions that people with intellectual disabilities cannot benefit from psychotherapy. Every one of these barriers is wrong—and overcoming them is a matter of clinical competence and moral urgency. Research demonstrates that people with intellectual disabilities can develop the full range of psychiatric conditions, can benefit from adapted psychotherapy (CBT, DBT, psychodynamic approaches), and deserve the same quality of mental health care as anyone else.',

    keyFacts: [
      { text: 'People with intellectual disabilities experience psychiatric disorders at 2-4× the general population rate', citationIndex: 1 },
      { text: 'Diagnostic overshadowing—the most significant barrier to mental health care for people with ID—occurs when clinicians attribute psychiatric symptoms to the intellectual disability itself', citationIndex: 2 },
      { text: 'Standard psychiatric assessment tools are unreliable in people with intellectual disabilities', citationIndex: 3 },
      { text: 'The legacy of institutionalization produced intergenerational trauma in people with intellectual disabilities', citationIndex: 4 },
      { text: 'Adapted psychotherapy works for people with intellectual disabilities—the evidence base is growing', citationIndex: 5 },
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
      { id: '1', text: 'Einfeld, S. L., et al. (2011). Psychopathology in young people with intellectual disability. JAMA, 296(16), 1981-1989. https://doi.org/10.1001/jama.296.16.1981', source: 'JAMA', year: '2011', link: '', tier: 1 },
      { id: '2', text: 'Reiss, S., Levitan, G. W., & Szyszko, J. (1982). Emotional disturbance and mental retardation: diagnostic overshadowing. American Journal of Mental Deficiency, 86(6), 567-574.', source: 'American Journal of Mental Deficiency', year: '1982', link: '', tier: 1 },
      { id: '3', text: 'Moss, S., et al. (1998). Reliability and validity of the PAS-ADD Checklist for detecting psychiatric disorders in adults with intellectual disability. Journal of Intellectual Disability Research, 42(2), 173-183.', source: 'Journal of Intellectual Disability Research', year: '1998', link: '', tier: 1 },
      { id: '4', text: 'Wolfensberger, W. (1972). The Principle of Normalization in Human Services. National Institute on Mental Retardation.', source: 'The Principle of Normalization in Human Services', year: '1972', link: '', tier: 3 },
      { id: '5', text: 'Vereenooghe, L., & Langdon, P. E. (2013). Psychological therapies for people with intellectual disabilities: a systematic review and meta-analysis. Research in Developmental Disabilities, 34(11), 4085-4102. https://doi.org/10.1016/j.ridd.2013.08.030', source: 'Research in Developmental Disabilities', year: '2013', link: '', tier: 1 },
      { id: '6', text: 'Cooper, S.-A., et al. (2007). Mental ill-health in adults with intellectual disabilities: prevalence and associated factors. British Journal of Psychiatry, 190(1), 27-35. https://doi.org/10.1192/bjp.bp.106.022483', source: 'British Journal of Psychiatry', year: '2007', link: '', tier: 1 },
      { id: '7', text: 'Hatton, C., & Emerson, E. (2004). The relationship between life events and psychopathology amongst children with intellectual disabilities. Journal of Applied Research in Intellectual Disabilities, 17(2), 109-117.', source: 'Journal of Applied Research in Intellectual Disabilities', year: '2004', link: '', tier: 1 },
      { id: '8', text: 'Hassiotis, A., et al. (2013). Cognitive behaviour therapy (CBT) for anxiety and depression in adults with mild intellectual disabilities (ID). Trials, 14, 160. https://doi.org/10.1186/1745-6215-14-160', source: 'Trials', year: '2013', link: '', tier: 1 },
      { id: '9', text: 'Sheehan, R., et al. (2015). Mental illness, challenging behaviour, and psychotropic drug prescribing in people with intellectual disability. BMJ, 351, h4326. https://doi.org/10.1136/bmj.h4326', source: 'BMJ', year: '2015', link: '', tier: 1 },
      { id: '10', text: 'Banks, R., et al. (2016). Supported decision making for people with cognitive disability. Australian Journal of Social Issues, 51(2), 115-134.', source: 'Australian Journal of Social Issues', year: '2016', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            People with intellectual disabilities (ID)—characterized by significant limitations in both intellectual functioning (IQ below 70) and adaptive behavior, originating before age 18—represent approximately 1-3% of the global population and experience mental health conditions at rates two to four times higher than the general population. Despite this elevated prevalence, they are among the most underserved populations in psychiatry and psychology.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          People with intellectual disabilities experience psychiatric disorders at 2-4× the general population rate
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          Diagnostic overshadowing—the most significant barrier to mental health care for people with ID—occurs when clinicians attribute psychiatric symptoms to the intellectual disability itself
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="JAMA" year="2011" tier={1} />
          <Citation id="2" index={2} source="American Journal of Mental Deficiency" year="1982" tier={1} />
          <Citation id="3" index={3} source="Journal of Intellectual Disability Research" year="1998" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
