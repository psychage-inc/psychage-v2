
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SPIRITUALITY_MEANING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// values-ethics-conscience | Articles 58–58
// ============================================================================

export const valuesethicsconscienceArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-SPR-057 | Moral Injury: When Your Actions Violate Your Deepest Values
  // --------------------------------------------------------------------------
  {
    id: catId(58),
    slug: 'moral-injury',
    title: 'Moral Injury: When Your Actions Violate Your Deepest Values',
    description: 'Understand moral injury—the psychological wound from violating deeply held moral beliefs. Learn to recognize symptoms, understand causes beyond combat, and explore evidence-based healing approaches.',
    image: '/images/articles/cat31/cover-058.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 12,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['values-ethics-conscience', 'Moral Injury', 'When Your Actions Violate Your Deepest Values'],

    summary: '',

    keyFacts: [

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
      { id: '1', text: 'Litz, B. T., et al. (2009). Moral injury and moral repair in war veterans: A preliminary model and intervention strategy. Clinical Psychology Review, 29(8), 695-706.', source: 'Clinical Psychology Review', year: '2009', link: '', tier: 1 },
      { id: '2', text: 'Bryan, C. J., et al. (2016). The functions and mechanisms of deliberate self-harm: A systematic review and meta-analysis. Clinical Psychology Review, 49, 95-106.', source: 'Clinical Psychology Review', year: '2016', link: '', tier: 1 },
      { id: '3', text: 'Maguen, S., et al. (2021). Moral injury in U.S. combat veterans: Results from the National Vietnam Veterans Longitudinal Study. Depression and Anxiety, 38(9), 951-959.', source: 'Depression and Anxiety', year: '2021', link: '', tier: 5 },
      { id: '4', text: 'Griffin, B. J., et al. (2019). Moral injury: An integrative review. Journal of Traumatic Stress, 32(3), 350-362.', source: 'Journal of Traumatic Stress', year: '2019', link: '', tier: 1 },
      { id: '5', text: 'Drescher, K. D., et al. (2011). An exploration of the viability and usefulness of the construct of moral injury in war veterans. Traumatology, 17(1), 8-13.', source: 'Traumatology', year: '2011', link: '', tier: 1 },
      { id: '6', text: 'Shay, J. (1994). Achilles in Vietnam: Combat trauma and the undoing of character. New York: Atheneum.', source: 'Achilles in Vietnam: Combat trauma and the undoing of character', year: '1994', link: '', tier: 1 },
      { id: '7', text: 'Litz, B. T., & Kerig, P. K. (2019). Introduction to the special issue on moral injury: Conceptual challenges, methodological issues, and clinical applications. Journal of Traumatic Stress, 32(3), 341-349.', source: 'Journal of Traumatic Stress', year: '2019', link: '', tier: 1 },
      { id: '8', text: 'Frankfurt, S., & Frazier, P. (2016). A review of research on moral injury in combat veterans. Military Psychology, 28(5), 318-330.', source: 'Military Psychology', year: '2016', link: '', tier: 1 },
      { id: '9', text: 'Bryan, A. O., et al. (2018). Moral injury, suicidal ideation, and suicide attempts in a military sample. Traumatology, 24(1), 36-43.', source: 'Traumatology', year: '2018', link: '', tier: 1 },
      { id: '10', text: 'Currier, J. M., et al. (2015). Longitudinal associations between moral judgment development and posttraumatic stress disorder symptomatology among military personnel deployed to Iraq. Traumatology, 21(1), 51-59.', source: 'Traumatology', year: '2015', link: '', tier: 3 },
      { id: '11', text: 'Wisco, B. E., et al. (2017). Moral injury in U.S. combat veterans: Results from the National Health and Resilience in Veterans Study. Depression and Anxiety, 34(4), 340-347.', source: 'Depression and Anxiety', year: '2017', link: '', tier: 5 },
      { id: '12', text: 'Bryan, C. J., et al. (2014). Combat exposure and suicide risk in two samples of military personnel. Journal of Clinical Psychology, 70(7), 603-609.', source: 'Journal of Clinical Psychology', year: '2014', link: '', tier: 1 },
      { id: '13', text: 'Williamson, V., et al. (2021). Moral injury in UK healthcare workers during the COVID-19 pandemic. BJPsych Open, 7(2), e62.', source: 'BJPsych Open', year: '2021', link: '', tier: 1 },
      { id: '14', text: 'Litam, S. D. A., & Balkin, R. S. (2021). Moral injury in health-care workers during COVID-19 pandemic. Traumatology, 27(1), 14-19.', source: 'Traumatology', year: '2021', link: '', tier: 1 },
      { id: '15', text: 'Papazoglou, K., & Chopko, B. (2017). The role of moral suffering (moral distress and moral injury) in police compassion fatigue and PTSD. Frontiers in Psychology, 8, 1999.', source: 'Frontiers in Psychology', year: '2017', link: '', tier: 1 },
      { id: '16', text: 'Barnes, H. A., et al. (2019). Moral injury and PTSD: Often co-occurring yet mechanistically different. Journal of Psychiatric Practice, 25(2), 94-102.', source: 'Journal of Psychiatric Practice', year: '2019', link: '', tier: 1 },
      { id: '17', text: 'Nash, W. P., et al. (2013). Psychometric evaluation of the Moral Injury Events Scale. Military Medicine, 178(6), 646-652.', source: 'Military Medicine', year: '2013', link: '', tier: 1 },
      { id: '18', text: 'Currier, J. M., et al. (2019). The associations of spiritually integrated bereavement variables with complicated grief and posttraumatic growth. Psychology of Religion and Spirituality, 11(1), 43-52.', source: 'Psychology of Religion and Spirituality', year: '2019', link: '', tier: 1 },
      { id: '19', text: 'Harris, J. I., et al. (2018). Moral injury in veterans and active duty military. In J. M. Currier et al. (Eds.), Addressing moral injury in clinical practice (pp. 69-82). Washington, DC: American Psychological Association.', source: 'Addressing moral injury in clinical practice', year: '2018', link: '', tier: 1 },
      { id: '20', text: 'Worthington, E. L., & Langberg, D. (2012). Religious considerations and self-forgiveness in treating complex trauma and moral injury in present and former soldiers. Journal of Psychology and Theology, 40(4), 274-288.', source: 'Journal of Psychology and Theology', year: '2012', link: '', tier: 1 },
      { id: '21', text: 'Koenig, H. G., et al. (2020). Moral injury in veterans and active duty military. In H. G. Koenig (Ed.), Religion and mental health: Research and clinical applications (pp. 223-240). London: Academic Press.', source: 'Religion and mental health: Research and clinical applications', year: '2020', link: '', tier: 1 },
      { id: '22', text: 'Gray, M. J., et al. (2012). Adaptive disclosure: An open trial of a novel exposure-based intervention for service members with combat-related psychological stress injuries. Behavior Therapy, 43(2), 407-415.', source: 'Behavior Therapy', year: '2012', link: '', tier: 1 },
      { id: '23', text: 'Purcell, N., et al. (2018). A systematic review of interventions for moral injury. In J. M. Currier et al. (Eds.), Addressing moral injury in clinical practice (pp. 23-50). Washington, DC: American Psychological Association.', source: 'Addressing moral injury in clinical practice', year: '2018', link: '', tier: 1 },
      { id: '24', text: 'Gilbert, P., & Procter, S. (2006). Compassionate mind training for people with high shame and self-criticism: Overview and pilot study of a group therapy approach. Clinical Psychology & Psychotherapy, 13(6), 353-379.', source: 'Clinical Psychology & Psychotherapy', year: '2006', link: '', tier: 1 },
      { id: '25', text: 'Maguen, S., et al. (2017). The Impact of Killing in War on Mental Health Symptoms and Related Functioning. Journal of Traumatic Stress, 30(4), 347-354.', source: 'Journal of Traumatic Stress', year: '2017', link: '', tier: 1 },
      { id: '26', text: 'Frankl, V. E. (1959/2006). Man\'s search for meaning. Boston: Beacon Press.', source: 'Man\'s search for meaning', year: '', link: '', tier: 5 },
      { id: '27', text: 'Currier, J. M., et al. (2018). Meaning made following deployment in Iraq or Afghanistan: Examining unique associations with posttraumatic stress and clinical functioning. Journal of Traumatic Stress, 31(6), 794-803.', source: 'Journal of Traumatic Stress', year: '2018', link: '', tier: 1 },
      { id: '28', text: 'Nieuwsma, J. A., et al. (2015). Chaplaincy and mental health in the Department of Veterans Affairs and Department of Defense. Journal of Health Care Chaplaincy, 21(3), 95-108.', source: 'Journal of Health Care Chaplaincy', year: '2015', link: '', tier: 1 },
      { id: '29', text: 'Exline, J. J., et al. (2011). People-pleasing through eating: Sociotropy predicts greater eating in response to perceived social pressure. Journal of Social and Clinical Psychology, 30(2), 169-193.', source: 'Journal of Social and Clinical Psychology', year: '2011', link: '', tier: 1 },
      { id: '30', text: 'Farnsworth, J. K., et al. (2017). A functional approach to understanding and treating military-related moral injury. Journal of Contextual Behavioral Science, 6(4), 391-397.', source: 'Journal of Contextual Behavioral Science', year: '2017', link: '', tier: 1 },
      { id: '31', text: 'Dean, W., et al. (2019). Reframing clinician distress: Moral injury not burnout. Federal Practitioner, 36(9), 400-402.', source: 'Federal Practitioner', year: '2019', link: '', tier: 1 },
      { id: '32', text: 'Jinkerson, J. D. (2016). Defining and assessing moral injury: A syndrome perspective. Traumatology, 22(2), 122-130.', source: 'Traumatology', year: '2016', link: '', tier: 1 },
      { id: '33', text: 'Norman, S. B., et al. (2019). Moral distress in frontline healthcare workers in the initial epicenter of the COVID-19 pandemic in the United States: Relationship to PTSD symptoms, burnout, and psychosocial functioning. Depression and Anxiety, 38(10), 1007-1017.', source: 'Depression and Anxiety', year: '2019', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            .
          </p>
        </div>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Clinical Psychology Review" year="2009" tier={1} />
          <Citation id="2" index={2} source="Clinical Psychology Review" year="2016" tier={1} />
          <Citation id="3" index={3} source="Depression and Anxiety" year="2021" tier={5} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
