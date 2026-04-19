
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DISABILITY_ACCESSIBILITY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Chronic Illness & Mental Health | Articles 10–10
// ============================================================================

export const chronicIllnessMentalHealthArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-DIS-003 | Chronic Illness and Mental Health: Living in a Body That Won
  // --------------------------------------------------------------------------
  {
    id: catId(10),
    slug: 'chronic-illness-mental-health',
    title: 'Chronic Illness and Mental Health: Living in a Body That Won\'t Cooperate',
    description: 'Chronic illness doesn\'t just affect the body—it reshapes identity, relationships, and mental health. Here\'s what the research shows about living with a condition that doesn\'t go away.',
    image: '/images/articles/cat25/cover-010.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 17,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['chronic illness mental health', 'chronic pain depression', 'invisible illness', 'fibromyalgia psychology', 'autoimmune mental health'],

    summary: 'Chronic illness—any health condition lasting longer than three months that cannot be cured and is managed rather than resolved—affects approximately 60% of adults in the United States and is the leading cause of disability worldwide. The mental health consequences of chronic illness are profound and bidirectional: chronic illness dramatically increases risk for depression, anxiety, and PTSD, while depression and anxiety worsen disease outcomes, creating a reinforcing cycle that conventional healthcare rarely addresses adequately. The relationship between chronic illness and mental health is not simply "feeling sad about being sick"—it involves neurobiological mechanisms (chronic inflammation driving depression, HPA axis dysregulation, cytokine-mediated sickness behavior), psychological processes (grief, identity disruption, loss of control, uncertainty), and social determinants (medical gaslighting, relationship strain, financial toxicity, workplace discrimination). Invisible illnesses—conditions that produce severe symptoms without visible markers—carry an additional burden: disbelief from healthcare providers, employers, family, and society. Research consistently shows that psychological distress in chronic illness is under-recognized, undertreated, and frequently dismissed as a normal consequence of being sick rather than addressed as a treatable condition that significantly affects disease outcomes and quality of life.',

    keyFacts: [
      { text: 'Depression occurs in 20-40% of people with chronic illness—two to four times the general population rate', citationIndex: 1 },
      { text: 'The inflammation-depression link means chronic illness and depression share biological mechanisms', citationIndex: 2 },
      { text: 'Medical gaslighting—having symptoms dismissed by healthcare providers—is a pervasive and damaging experience', citationIndex: 3 },
      { text: 'Chronic illness grief is real, recurring, and insufficiently recognized', citationIndex: 4 },
      { text: 'Treating depression in chronic illness improves physical health outcomes—not just mood', citationIndex: 5 },
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
      { id: '1', text: 'Katon, W. J. (2011). Epidemiology and treatment of depression in patients with chronic medical illness. Dialogues in Clinical Neuroscience, 13(1), 7-23. https://doi.org/10.31887/DCNS.2011.13.1/wkaton', source: 'Dialogues in Clinical Neuroscience', year: '2011', link: '', tier: 1 },
      { id: '2', text: 'Dantzer, R., et al. (2008). From inflammation to sickness and depression: when the immune system subjugates the brain. Nature Reviews Neuroscience, 9(1), 46-56. https://doi.org/10.1038/nrn2297', source: 'Nature Reviews Neuroscience', year: '2008', link: '', tier: 1 },
      { id: '3', text: 'Nettleton, S. (2006). \'I just want permission to be ill\': towards a sociology of medically unexplained symptoms. Social Science & Medicine, 62(5), 1167-1178. https://doi.org/10.1016/j.socscimed.2005.07.030', source: 'Social Science & Medicine', year: '2006', link: '', tier: 1 },
      { id: '4', text: 'Ahlström, G. (2007). Experiences of loss and chronic sorrow in persons with severe chronic illness. Journal of Clinical Nursing, 16(3a), 76-83. https://doi.org/10.1111/j.1365-2702.2005.01583.x', source: 'Journal of Clinical Nursing', year: '2007', link: '', tier: 1 },
      { id: '5', text: 'Katon, W. J., et al. (2010). Collaborative care for patients with depression and chronic illnesses. New England Journal of Medicine, 363(27), 2611-2620. https://doi.org/10.1056/NEJMoa1003955', source: 'New England Journal of Medicine', year: '2010', link: '', tier: 1 },
      { id: '6', text: 'Charmaz, K. (1995). The body, identity, and self: adapting to impairment. The Sociological Quarterly, 36(4), 657-680. https://doi.org/10.1111/j.1533-8525.1995.tb00459.x', source: 'The Sociological Quarterly', year: '1995', link: '', tier: 1 },
      { id: '7', text: 'Hoffman, D. L., & Dukes, E. M. (2008). The health status burden of people with fibromyalgia. Clinical Journal of Pain, 24(2), 124-130. https://doi.org/10.1097/AJP.0b013e318156d950', source: 'Clinical Journal of Pain', year: '2008', link: '', tier: 1 },
      { id: '8', text: 'Mulligan, K., et al. (2017). Illness perceptions and depression in chronic conditions: a meta-analysis. British Journal of Health Psychology, 22(4), 927-942.', source: 'British Journal of Health Psychology', year: '2017', link: '', tier: 1 },
      { id: '9', text: 'Grace, S. L., et al. (2005). Prospective examination of anxiety persistence and its relationship to cardiac symptoms and recurrent cardiac events. Psychotherapy and Psychosomatics, 74(6), 344-352. https://doi.org/10.1159/000087781', source: 'Psychotherapy and Psychosomatics', year: '2005', link: '', tier: 1 },
      { id: '10', text: 'McCracken, L. M., & Vowles, K. E. (2014). Acceptance and commitment therapy and mindfulness for chronic pain. American Psychologist, 69(2), 178-187. https://doi.org/10.1037/a0035623', source: 'American Psychologist', year: '2014', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Chronic illness—any health condition lasting longer than three months that cannot be cured and is managed rather than resolved—affects approximately 60% of adults in the United States and is the leading cause of disability worldwide. The mental health consequences of chronic illness are profound and bidirectional: chronic illness dramatically increases risk for depression, anxiety, and PTSD, while depression and anxiety worsen disease outcomes, creating a reinforcing cycle that conventional healthcare rarely addresses adequately.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          Depression occurs in 20-40% of people with chronic illness—two to four times the general population rate
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          The inflammation-depression link means chronic illness and depression share biological mechanisms
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Dialogues in Clinical Neuroscience" year="2011" tier={1} />
          <Citation id="2" index={2} source="Nature Reviews Neuroscience" year="2008" tier={1} />
          <Citation id="3" index={3} source="Social Science & Medicine" year="2006" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
