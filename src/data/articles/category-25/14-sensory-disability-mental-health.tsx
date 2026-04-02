
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DISABILITY_ACCESSIBILITY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Sensory Disability & Mental Health | Articles 55–55
// ============================================================================

export const sensoryDisabilityMentalHealthArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-DIS-005 | Deaf Culture, Sensory Disability, and Mental Health: When th
  // --------------------------------------------------------------------------
  {
    id: catId(55),
    slug: 'deaf-culture-mental-health',
    title: 'Deaf Culture, Sensory Disability, and Mental Health: When the World Isn\'t Built for Your Senses',
    description: 'Deaf, hard of hearing, blind, and deafblind people face unique mental health challenges rooted in communication barriers, cultural mismatch, and a world designed for hearing and sighted people.',
    image: '/images/articles/cat25/cover-055.svg',
    category: CATEGORY_DISABILITY_ACCESSIBILITY,
    readTime: 16,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['deaf mental health', 'Deaf culture', 'hearing loss psychology', 'blind mental health', 'vision loss depression'],

    summary: 'Sensory disabilities—deafness, hearing loss, blindness, low vision, and deafblindness—affect over 2 billion people globally and produce mental health challenges that are fundamentally different from those associated with mobility or cognitive disabilities. The core issue is communication and information access: when the world\'s primary systems for sharing information, building relationships, and accessing services are designed for people who can hear and see, those who cannot are not just inconvenienced—they are systematically excluded from the social infrastructure that supports mental health. Deaf and hard of hearing people experience depression and anxiety at 2-3× the general population rate, driven not by deafness itself but by communication barriers, language deprivation (particularly in deaf children of hearing parents who don\'t learn sign language), social isolation, and the chronic stress of navigating a hearing-designed world. The Deaf community (capital-D Deaf) represents a distinct cultural and linguistic minority with its own language (ASL, BSL, and other sign languages), culture, history, and identity—not a disability to be fixed. Blind and low-vision people face elevated depression rates (25-35%), particularly following adult-onset vision loss, driven by loss of independence, mobility restriction, and social participation decline. Mental health services for all sensory disability populations are critically inadequate: fewer than 2% of therapists can communicate in sign language, mental health materials are rarely available in accessible formats, and clinicians routinely lack the cultural competence to work with these populations.',

    keyFacts: [
      { text: 'Deaf and hard of hearing people experience depression at 2-3× the general population rate—and the primary driver is communication barriers, not deafness', citationIndex: 1 },
      { text: 'Language deprivation in deaf children of hearing parents is a critical mental health risk factor', citationIndex: 2 },
      { text: 'Deaf culture is a linguistic and cultural minority—not a disability identity', citationIndex: 3 },
      { text: 'Vision loss produces depression in 25-35% of affected individuals, with highest rates following adult-onset loss', citationIndex: 4 },
      { text: 'Fewer than 2% of mental health professionals can communicate in sign language—creating a therapy access crisis', citationIndex: 5 },
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
      { id: '1', text: 'Fellinger, J., et al. (2012). Mental health of deaf people. The Lancet, 379(9820), 1037-1044. https://doi.org/10.1016/S0140-6736(11)61143-4', source: 'The Lancet', year: '2012', link: '', tier: 1 },
      { id: '2', text: 'Hall, W. C., et al. (2017). What you don\'t know can hurt you: the risk of language deprivation by impairing sign language development in deaf children. Maternal and Child Health Journal, 21(5), 961-965. https://doi.org/10.1007/s10995-017-2287-y', source: 'Maternal and Child Health Journal', year: '2017', link: '', tier: 1 },
      { id: '3', text: 'Leigh, I. W. (2009). A Lens on Deaf Identities. Oxford University Press.', source: 'A Lens on Deaf Identities', year: '2009', link: '', tier: 5 },
      { id: '4', text: 'van der Aa, H. P. A., et al. (2015). Stepped care for depression and anxiety in visually impaired older adults: multicentre randomised controlled trial. BMJ, 351, h6127. https://doi.org/10.1136/bmj.h6127', source: 'BMJ', year: '2015', link: '', tier: 1 },
      { id: '5', text: 'Steinberg, A. G., et al. (2006). Deaf women: experiences and perceptions of healthcare system access. Journal of Women\'s Health, 15(6), 729-741. https://doi.org/10.1089/jwh.2006.15.729', source: 'Journal of Women\'s Health', year: '2006', link: '', tier: 1 },
      { id: '6', text: 'Kvam, M. H. (2004). Sexual abuse of deaf children: a retrospective analysis of the prevalence and characteristics of childhood sexual abuse among deaf adults in Norway. Child Abuse & Neglect, 28(3), 241-251. https://doi.org/10.1016/j.chiabu.2003.09.017', source: 'Child Abuse & Neglect', year: '2004', link: '', tier: 1 },
      { id: '7', text: 'Horowitz, A. (2004). The prevalence and consequences of vision impairment in later life. Topics in Geriatric Rehabilitation, 20(3), 185-195.', source: 'Topics in Geriatric Rehabilitation', year: '2004', link: '', tier: 1 },
      { id: '8', text: 'Cox, T. M., & ffytche, D. H. (2014). Negative outcome Charles Bonnet Syndrome. British Journal of Ophthalmology, 98(9), 1236-1239. https://doi.org/10.1136/bjophthalmol-2014-304920', source: 'British Journal of Ophthalmology', year: '2014', link: '', tier: 1 },
      { id: '9', text: 'Glickman, N. S. (2013). Deaf Mental Health Care. Routledge.', source: 'Deaf Mental Health Care', year: '2013', link: '', tier: 5 },
      { id: '10', text: 'Humphries, T., et al. (2012). Language acquisition for deaf children: reducing the harms of zero tolerance to the use of alternative approaches. Harm Reduction Journal, 9, 16. https://doi.org/10.1186/1477-7517-9-16', source: 'Harm Reduction Journal', year: '2012', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Sensory disabilities—deafness, hearing loss, blindness, low vision, and deafblindness—affect over 2 billion people globally and produce mental health challenges that are fundamentally different from those associated with mobility or cognitive disabilities. The core issue is communication and information access: when the world&apos;s primary systems for sharing information, building relationships, and accessing services are designed for people who can hear and see, those who cannot are not just inconvenienced—they are systematically excluded from the social infrastructure that supports mental health.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          Deaf and hard of hearing people experience depression at 2-3× the general population rate—and the primary driver is communication barriers, not deafness
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          Language deprivation in deaf children of hearing parents is a critical mental health risk factor
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="The Lancet" year="2012" tier={1} />
          <Citation id="2" index={2} source="Maternal and Child Health Journal" year="2017" tier={1} />
          <Citation id="3" index={3} source="A Lens on Deaf Identities" year="2009" tier={5} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
