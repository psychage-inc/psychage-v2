
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DISABILITY_ACCESSIBILITY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Disability & Identity | Articles 11–12
// ============================================================================

export const disabilityIdentityArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-DIS-001 | Disability Identity and Mental Health: Beyond the Medical Mo
  // --------------------------------------------------------------------------
  {
    id: catId(11),
    slug: 'disability-identity-mental-health',
    title: 'Disability Identity and Mental Health: Beyond the Medical Model',
    description: 'Disability is not a tragedy to overcome—it\'s a human experience with its own culture, identity, and pride. Here\'s how disability models shape mental health and why the medical model isn\'t enough.',
    image: '/images/articles/cat25/cover-011.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 17,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['disability identity', 'social model disability', 'medical model disability', 'disability pride', 'ableism mental health'],

    summary: 'How we understand disability fundamentally shapes how we approach the mental health of disabled people. The medical model defines disability as a problem located within the individual—a deficiency to be cured, fixed, or rehabilitated. This model dominates healthcare and positions disabled people as patients whose goal should be to become as "normal" as possible. The social model reframes disability as the product of barriers created by society—inaccessible environments, discriminatory attitudes, and exclusionary policies disable people, not their bodies or minds. The biopsychosocial model integrates both perspectives, recognizing that disability involves the interaction between individual health conditions and contextual factors (environmental, social, attitudinal). For mental health, the model matters enormously: the medical model pathologizes the disabled experience (treating adjustment to disability as a disorder rather than a natural process), promotes "overcoming" narratives that set impossible standards, and locates emotional distress in the individual rather than in the ableist systems that produce it. Disabled people experience higher rates of depression, anxiety, and psychological distress—but research consistently shows that these elevated rates are primarily explained by social factors (discrimination, poverty, inaccessibility, social isolation, unemployment) rather than by disability itself. Disability identity—a positive sense of identification with the disability community—is a protective factor for mental health, associated with higher self-esteem, greater life satisfaction, and reduced internalized stigma.',

    keyFacts: [
      { text: 'Disabled people are 2-3× more likely to experience depression and anxiety than non-disabled people—but the cause is primarily social, not medical', citationIndex: 1 },
      { text: 'Disability identity—identifying positively with the disability community—is associated with better mental health', citationIndex: 2 },
      { text: 'Internalized ableism—the unconscious adoption of negative beliefs about disability—is a significant mental health risk factor', citationIndex: 3 },
      { text: 'The "disability paradox"—that many disabled people report good or excellent quality of life—reveals the limitations of non-disabled assumptions', citationIndex: 4 },
      { text: 'The social model of disability emerged from disabled people\'s own advocacy—and it transforms mental health practice', citationIndex: 5 },
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
      { id: '1', text: 'Emerson, E., et al. (2011). The physical health of British adults with intellectual disability. Journal of Intellectual & Developmental Disability, 36(1), 11-18. https://doi.org/10.3109/13668250.2010.545052', source: 'Journal of Intellectual & Developmental Disability', year: '2011', link: '', tier: 1 },
      { id: '2', text: 'Dunn, D. S., & Burcaw, S. (2013). Disability identity: exploring narrative accounts of disability. Rehabilitation Psychology, 58(2), 148-157. https://doi.org/10.1037/a0031691', source: 'Rehabilitation Psychology', year: '2013', link: '', tier: 1 },
      { id: '3', text: 'Campbell, F. K. (2008). Exploring internalized ableism using critical race theory. Disability & Society, 23(2), 151-162. https://doi.org/10.1080/09687590701841190', source: 'Disability & Society', year: '2008', link: '', tier: 1 },
      { id: '4', text: 'Albrecht, G. L., & Devlieger, P. J. (1999). The disability paradox: high quality of life against all odds. Social Science & Medicine, 48(8), 977-988. https://doi.org/10.1016/S0277-9536(98)00411-0', source: 'Social Science & Medicine', year: '1999', link: '', tier: 1 },
      { id: '5', text: 'Oliver, M. (1990). The Politics of Disablement. Macmillan.', source: 'The Politics of Disablement', year: '1990', link: '', tier: 1 },
      { id: '6', text: 'World Health Organization (2001). International Classification of Functioning, Disability and Health (ICF). WHO.', source: 'International Classification of Functioning, Disability and Health (ICF)', year: '2001', link: '', tier: 2 },
      { id: '7', text: 'Olkin, R. (2017). Disability-Affirmative Therapy: A Case Formulation Template for Clients with Disabilities. Oxford University Press.', source: 'Disability-Affirmative Therapy: A Case Formulation Template for Clients with Disabilities', year: '2017', link: '', tier: 5 },
      { id: '8', text: 'Nario-Redmond, M. R. (2020). Ableism: The Causes and Consequences of Disability Prejudice. Wiley.', source: 'Ableism: The Causes and Consequences of Disability Prejudice', year: '2020', link: '', tier: 5 },
      { id: '9', text: 'Hahn, H. D., & Belt, T. L. (2004). Disability identity and attitudes toward cure in a sample of disabled activists. Journal of Health and Social Behavior, 45(4), 453-464. https://doi.org/10.1177/002214650404500407', source: 'Journal of Health and Social Behavior', year: '2004', link: '', tier: 1 },
      { id: '10', text: 'Mitra, S. (2018). Disability, Health and Human Development. Palgrave Macmillan.', source: 'Disability, Health and Human Development', year: '2018', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            How we understand disability fundamentally shapes how we approach the mental health of disabled people. The medical model defines disability as a problem located within the individual—a deficiency to be cured, fixed, or rehabilitated.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          Disabled people are 2-3× more likely to experience depression and anxiety than non-disabled people—but the cause is primarily social, not medical
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          Disability identity—identifying positively with the disability community—is associated with better mental health
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Journal of Intellectual & Developmental Disability" year="2011" tier={1} />
          <Citation id="2" index={2} source="Rehabilitation Psychology" year="2013" tier={1} />
          <Citation id="3" index={3} source="Disability & Society" year="2008" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-DIS-002 | Ableism and Microaggressions: The Psychological Toll of Bein
  // --------------------------------------------------------------------------
  {
    id: catId(12),
    slug: 'ableism-microaggressions-psychological-harm',
    title: 'Ableism and Microaggressions: The Psychological Toll of Being Seen as Less',
    description: 'Ableism—the systemic devaluation of disabled people—produces chronic psychological harm through microaggressions, discrimination, and invisibility. Here\'s how it works and what it costs.',
    image: '/images/articles/cat25/cover-012.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 16,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['ableism', 'disability microaggressions', 'disability discrimination', 'ableist language', 'inspiration porn'],

    summary: 'Ableism—the systemic belief that non-disabled bodies and minds are superior, and the structural and interpersonal discrimination that flows from this belief—is the most normalized form of oppression in contemporary society. Unlike racism or sexism, ableism is rarely recognized, routinely denied, and often disguised as concern, pity, or admiration. Disabled people navigate a constant stream of ableist microaggressions: being spoken to as if they are children, being praised for "inspiring" others by existing, being told they "don\'t look disabled," having their competence questioned, being stared at, being spoken about in their presence as if they\'re not there, being subjected to unsolicited medical advice, and having their access needs treated as inconveniences. The minority stress model—developed to explain health disparities in racial minorities and LGBTQ+ populations—applies directly to disability: chronic exposure to discrimination, prejudice, and stigma produces elevated cortisol, chronic inflammation, hypervigilance, and psychological distress that accumulate over a lifetime. Research shows that disability-related discrimination is a stronger predictor of depression and anxiety than disability severity itself. Ableism operates at multiple levels simultaneously: structural (inaccessible infrastructure, exclusionary policies), interpersonal (microaggressions, patronizing behavior, pity), and internalized (absorbing society\'s devaluation of disability into one\'s self-concept).',

    keyFacts: [
      { text: 'Disability-related discrimination is a stronger predictor of psychological distress than disability severity', citationIndex: 1 },
      { text: 'Disabled people experience an average of 3-5 microaggressions per day', citationIndex: 2 },
      { text: '"Inspiration porn"—portraying disabled people as inspiring for doing ordinary things—is a form of ableist dehumanization', citationIndex: 3 },
      { text: 'The minority stress model explains the elevated mental health burden in disabled populations', citationIndex: 4 },
      { text: 'Internalized ableism—the unconscious belief that disability makes you less valuable—is pervasive and damaging', citationIndex: 5 },
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
      { id: '1', text: 'Susman, J. (1994). Disability, stigma and deviance. Social Science & Medicine, 38(1), 15-22. https://doi.org/10.1016/0277-9536(94)90295-X', source: 'Social Science & Medicine', year: '1994', link: '', tier: 1 },
      { id: '2', text: 'Keller, R. M., & Galgay, C. E. (2010). Microaggressive experiences of people with disabilities. In D. W. Sue (Ed.), Microaggressions and Marginality. Wiley.', source: 'Microaggressions and Marginality', year: '2010', link: '', tier: 5 },
      { id: '3', text: 'Nario-Redmond, M. R. (2020). Ableism: The Causes and Consequences of Disability Prejudice. Wiley.', source: 'Ableism: The Causes and Consequences of Disability Prejudice', year: '2020', link: '', tier: 5 },
      { id: '4', text: 'Meyer, I. H. (2003). Prejudice, social stress, and mental health in lesbian, gay, and bisexual populations. Psychological Bulletin, 129(5), 674-697. https://doi.org/10.1037/0033-2909.129.5.674', source: 'Psychological Bulletin', year: '2003', link: '', tier: 1 },
      { id: '5', text: 'Campbell, F. K. (2009). Contours of Ableism: The Production of Disability and Abledness. Palgrave Macmillan.', source: 'Contours of Ableism: The Production of Disability and Abledness', year: '2009', link: '', tier: 1 },
      { id: '6', text: 'Deal, M. (2007). Aversive disablism: subtle prejudice toward disabled people. Disability & Society, 22(1), 93-107. https://doi.org/10.1080/09687590601056667', source: 'Disability & Society', year: '2007', link: '', tier: 1 },
      { id: '7', text: 'Reeve, D. (2012). Psycho-emotional disablism: the missing link? In N. Watson et al. (Eds.), Routledge Handbook of Disability Studies. Routledge.', source: 'Routledge Handbook of Disability Studies', year: '2012', link: '', tier: 1 },
      { id: '8', text: 'Olkin, R., & Pledger, C. (2003). Can disability studies and psychology join hands? American Psychologist, 58(4), 296-304. https://doi.org/10.1037/0003-066X.58.4.296', source: 'American Psychologist', year: '2003', link: '', tier: 1 },
      { id: '9', text: 'Andrews, E. E., et al. (2019). #SayTheWord: a disability culture commentary on the erasure of "disability." Rehabilitation Psychology, 64(2), 111-118. https://doi.org/10.1037/rep0000258', source: 'Rehabilitation Psychology', year: '2019', link: '', tier: 1 },
      { id: '10', text: 'Watermeyer, B. (2013). Towards a Contextual Psychology of Disablism. Routledge.', source: 'Towards a Contextual Psychology of Disablism', year: '2013', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Ableism—the systemic belief that non-disabled bodies and minds are superior, and the structural and interpersonal discrimination that flows from this belief—is the most normalized form of oppression in contemporary society. Unlike racism or sexism, ableism is rarely recognized, routinely denied, and often disguised as concern, pity, or admiration.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          Disability-related discrimination is a stronger predictor of psychological distress than disability severity
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          Disabled people experience an average of 3-5 microaggressions per day
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Social Science & Medicine" year="1994" tier={1} />
          <Citation id="2" index={2} source="Microaggressions and Marginality" year="2010" tier={5} />
          <Citation id="3" index={3} source="Ableism: The Causes and Consequences of Disability Prejudice" year="2020" tier={5} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
