
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SPIRITUALITY_MEANING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// spiritual-crises-challenges | Articles 54–54
// ============================================================================

export const spiritualcriseschallengesArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-SPR-062 | Religious and Spiritual Struggles: When Faith Becomes a Sour
  // --------------------------------------------------------------------------
  {
    id: catId(54),
    slug: 'religious-spiritual-struggles',
    title: 'Religious and Spiritual Struggles: When Faith Becomes a Source of Distress',
    description: 'Understand religious and spiritual struggles—conflicts, doubts, and tensions around faith. Learn about different types of struggles, their mental health impacts, and evidence-based approaches for finding resolution or peaceful coexistence.',
    image: '/images/articles/cat31/cover-054.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 12,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['spiritual-crises-challenges', 'Religious and Spiritual Struggles', 'When Faith Becomes a Source of Distress'],

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
      { id: '1', text: 'Exline, J. J., & Rose, E. D. (2013). Religious and spiritual struggles. In R. F. Paloutzian & C. L. Park (Eds.), Handbook of the psychology of religion and spirituality (2nd ed., pp. 380-398). New York: Guilford Press.', source: 'Handbook of the psychology of religion and spirituality', year: '2013', link: '', tier: 1 },
      { id: '2', text: 'Abu-Raiya, H., et al. (2015). Robust links between religious/spiritual struggles, psychological distress, and well-being in a national sample of American adults. American Journal of Orthopsychiatry, 85(6), 565-575.', source: 'American Journal of Orthopsychiatry', year: '2015', link: '', tier: 1 },
      { id: '3', text: 'Zuckerman, P., et al. (2016). The nonreligious: Understanding secular people and societies. New York: Oxford University Press.', source: 'The nonreligious: Understanding secular people and societies', year: '2016', link: '', tier: 5 },
      { id: '4', text: 'Exline, J. J., et al. (2014). Religious and spiritual struggles. In APA handbook of psychology, religion, and spirituality (Vol. 1, pp. 459-475). Washington, DC: American Psychological Association.', source: '', year: '2014', link: '', tier: 1 },
      { id: '5', text: 'Pargament, K. I. (2007). Spiritually integrated psychotherapy: Understanding and addressing the sacred. New York: Guilford Press.', source: 'Spiritually integrated psychotherapy: Understanding and addressing the sacred', year: '2007', link: '', tier: 1 },
      { id: '6', text: 'Exline, J. J., et al. (2014). The Religious and Spiritual Struggles Scale: Development and initial validation. Psychology of Religion and Spirituality, 6(3), 208-222.', source: 'Psychology of Religion and Spirituality', year: '2014', link: '', tier: 1 },
      { id: '7', text: 'Exline, J. J., et al. (2014). The Religious and Spiritual Struggles Scale: Development and initial validation. Psychology of Religion and Spirituality, 6(3), 208-222.', source: 'Psychology of Religion and Spirituality', year: '2014', link: '', tier: 1 },
      { id: '8', text: 'Fowler, J. W. (1981). Stages of faith: The psychology of human development and the quest for meaning. San Francisco: Harper & Row.', source: 'Stages of faith: The psychology of human development and the quest for meaning', year: '1981', link: '', tier: 1 },
      { id: '9', text: 'Arnett, J. J., & Jensen, L. A. (2002). A congregation of one: Individualized religious beliefs among emerging adults. Journal of Adolescent Research, 17(5), 451-467.', source: 'Journal of Adolescent Research', year: '2002', link: '', tier: 1 },
      { id: '10', text: 'Regnerus, M. D. (2007). Forbidden fruit: Sex & religion in the lives of American teenagers. New York: Oxford University Press.', source: 'Forbidden fruit: Sex & religion in the lives of American teenagers', year: '2007', link: '', tier: 5 },
      { id: '11', text: 'Pargament, K. I., et al. (2000). Patterns of positive and negative religious coping with major life stressors. Journal for the Scientific Study of Religion, 39(4), 710-724.', source: 'Journal for the Scientific Study of Religion', year: '2000', link: '', tier: 1 },
      { id: '12', text: 'Burke, L. A., et al. (1999). Religious coping, negative religious coping, and bereaved parents. In S. W. Russell (Ed.), Bereavement care (pp. 25-32). London: Routledge.', source: 'Bereavement care', year: '1999', link: '', tier: 5 },
      { id: '13', text: 'Krause, N. (2006). Religious doubt and psychological well-being: A longitudinal investigation. Review of Religious Research, 47(3), 287-302.', source: 'Review of Religious Research', year: '2006', link: '', tier: 1 },
      { id: '14', text: 'Park, C. L. (2013). Religion and meaning. In R. F. Paloutzian & C. L. Park (Eds.), Handbook of the psychology of religion and spirituality (2nd ed., pp. 357-379). New York: Guilford Press.', source: 'Handbook of the psychology of religion and spirituality', year: '2013', link: '', tier: 1 },
      { id: '15', text: 'Janoff-Bulman, R. (1992). Shattered assumptions: Towards a new psychology of trauma. New York: Free Press.', source: 'Shattered assumptions: Towards a new psychology of trauma', year: '1992', link: '', tier: 1 },
      { id: '16', text: 'Pargament, K. I. (1997). The psychology of religion and coping: Theory, research, practice. New York: Guilford Press.', source: 'The psychology of religion and coping: Theory, research, practice', year: '1997', link: '', tier: 1 },
      { id: '17', text: 'Scheitle, C. P., & Adamczyk, A. (2010). High-cost religion, religious switching, and health. Journal of Health and Social Behavior, 51(3), 325-342.', source: 'Journal of Health and Social Behavior', year: '2010', link: '', tier: 1 },
      { id: '18', text: 'Exline, J. J., et al. (2012). Anger toward God: Social-cognitive predictors, prevalence, and links with adjustment to bereavement and cancer. Journal of Personality and Social Psychology, 100(1), 129-148.', source: 'Journal of Personality and Social Psychology', year: '2012', link: '', tier: 1 },
      { id: '19', text: 'Frankl, V. E. (1959/2006). Man\'s search for meaning. Boston: Beacon Press.', source: 'Man\'s search for meaning', year: '', link: '', tier: 5 },
      { id: '20', text: 'Desai, K. M., & Pargament, K. I. (2015). Predictors of growth and decline following spiritual struggles. International Journal for the Psychology of Religion, 25(1), 42-56.', source: 'International Journal for the Psychology of Religion', year: '2015', link: '', tier: 1 },
      { id: '21', text: 'Ellison, C. G., & Lee, J. (2010). Spiritual struggles and psychological distress: Is there a dark side of religion? Social Indicators Research, 98(3), 501-517.', source: 'Social Indicators Research', year: '2010', link: '', tier: 1 },
      { id: '22', text: 'Bryant, A. N., & Astin, H. S. (2008). The correlates of spiritual struggle during the college years. Journal of Higher Education, 79(1), 1-27.', source: 'Journal of Higher Education', year: '2008', link: '', tier: 1 },
      { id: '23', text: 'Ano, G. G., & Pargament, K. I. (2013). Predictors of spiritual struggles: An exploratory study. Mental Health, Religion & Culture, 16(4), 419-434.', source: 'Mental Health, Religion & Culture', year: '2013', link: '', tier: 1 },
      { id: '24', text: 'Wilt, J. A., et al. (2016). Partnering with God: Religious coping and the search for intimacy with God. Psychology of Religion and Spirituality, 8(3), 165-174.', source: 'Psychology of Religion and Spirituality', year: '2016', link: '', tier: 1 },
      { id: '25', text: 'Exline, J. J. (2013). Religious and spiritual struggles. In K. I. Pargament (Ed.), APA handbook of psychology, religion, and spirituality (Vol. 1, pp. 459-475). Washington, DC: American Psychological Association.', source: 'APA handbook of psychology, religion, and spirituality', year: '2013', link: '', tier: 1 },
      { id: '26', text: 'Exline, J. J., et al. (2011). People-pleasing through eating: Sociotropy predicts greater eating in response to perceived social pressure. Journal of Social and Clinical Psychology, 30(2), 169-193.', source: 'Journal of Social and Clinical Psychology', year: '2011', link: '', tier: 1 },
      { id: '27', text: 'Herman, J. L. (1992). Trauma and recovery: The aftermath of violence—from domestic abuse to political terror. New York: Basic Books.', source: 'Trauma and recovery: The aftermath of violence—from domestic abuse to political terror', year: '1992', link: '', tier: 5 },
      { id: '28', text: 'Kushner, H. S. (1981). When bad things happen to good people. New York: Schocken Books.', source: 'When bad things happen to good people', year: '1981', link: '', tier: 5 },
      { id: '29', text: 'Ladd, K. L., & Spilka, B. (2002). Inward, outward, and upward: Cognitive aspects of prayer. Journal for the Scientific Study of Religion, 41(3), 475-484.', source: 'Journal for the Scientific Study of Religion', year: '2002', link: '', tier: 1 },
      { id: '30', text: 'Pargament, K. I., et al. (1998). Patterns of positive and negative religious coping with major life stressors. Journal for the Scientific Study of Religion, 37(4), 710-724.', source: 'Journal for the Scientific Study of Religion', year: '1998', link: '', tier: 1 },
      { id: '31', text: 'Harris, J. I., et al. (2008). Religious functioning and trauma outcomes. Journal of Clinical Psychology, 64(1), 17-29.', source: 'Journal of Clinical Psychology', year: '2008', link: '', tier: 1 },
      { id: '32', text: 'Exline, J. J., & Martin, A. (2005). Anger toward God: A new frontier in forgiveness research. In E. L. Worthington Jr. (Ed.), Handbook of forgiveness (pp. 73-88). New York: Routledge.', source: 'Handbook of forgiveness', year: '2005', link: '', tier: 5 },
      { id: '33', text: 'Sherry, A., et al. (2010). Internalized homophobia and adult attachment: Implications for clinical practice. Psychotherapy: Theory, Research, Practice, Training, 47(4), 560-570.', source: 'Psychotherapy: Theory, Research, Practice, Training', year: '2010', link: '', tier: 1 },
      { id: '34', text: 'Worthington, E. L., Jr., & Langberg, D. (2012). Religious considerations and self-forgiveness in treating complex trauma and moral injury in present and former soldiers. Journal of Psychology and Theology, 40(4), 274-288.', source: 'Journal of Psychology and Theology', year: '2012', link: '', tier: 1 },
      { id: '35', text: 'Abramowitz, J. S., et al. (2002). Religious obsessions and compulsions in a non-clinical sample: The Penn Inventory of Scrupulosity (PIOS). Behaviour Research and Therapy, 40(7), 825-838.', source: 'Behaviour Research and Therapy', year: '2002', link: '', tier: 1 },
      { id: '36', text: 'Drescher, K. D., et al. (2011). An exploration of the viability and usefulness of the construct of moral injury in war veterans. Traumatology, 17(1), 8-13.', source: 'Traumatology', year: '2011', link: '', tier: 1 },
      { id: '37', text: 'Hunsberger, B., et al. (1996). Religious fundamentalism and religious doubts: Content, connections, and complexity of thinking. International Journal for the Psychology of Religion, 6(3), 201-220.', source: 'International Journal for the Psychology of Religion', year: '1996', link: '', tier: 1 },
      { id: '38', text: 'Evans, E. M. (2001). Cognitive and contextual factors in the emergence of diverse belief systems: Creation versus evolution. Cognitive Psychology, 42(3), 217-266.', source: 'Cognitive Psychology', year: '2001', link: '', tier: 1 },
      { id: '39', text: 'Bart, D. E. (2007). Misquoting Jesus: The story behind who changed the Bible and why. New York: HarperOne.', source: 'Misquoting Jesus: The story behind who changed the Bible and why', year: '2007', link: '', tier: 2 },
      { id: '40', text: 'Hick, J. (1989). An interpretation of religion: Human responses to the transcendent. New Haven, CT: Yale University Press.', source: 'An interpretation of religion: Human responses to the transcendent', year: '1989', link: '', tier: 5 },
      { id: '41', text: 'Smith, C., & Denton, M. L. (2005). Soul searching: The religious and spiritual lives of American teenagers. New York: Oxford University Press.', source: 'Soul searching: The religious and spiritual lives of American teenagers', year: '2005', link: '', tier: 5 },
      { id: '42', text: 'Exline, J. J., et al. (2016). Anger toward God in survivors of sexual abuse: How therapeutic work can move clients forward. Psychology of Religion and Spirituality, 8(1), 37-48.', source: 'Psychology of Religion and Spirituality', year: '2016', link: '', tier: 1 },
      { id: '43', text: 'Haidt, J. (2012). The righteous mind: Why good people are divided by politics and religion. New York: Pantheon Books.', source: 'The righteous mind: Why good people are divided by politics and religion', year: '2012', link: '', tier: 5 },
      { id: '44', text: 'Barnes, D. M., & Meyer, I. H. (2012). Religious affiliation, internalized homophobia, and mental health in lesbians, gay men, and bisexuals. American Journal of Orthopsychiatry, 82(4), 505-515.', source: 'American Journal of Orthopsychiatry', year: '2012', link: '', tier: 1 },
      { id: '45', text: 'Johnson, D., & VanVonderen, J. (1991). The subtle power of spiritual abuse: Recognizing and escaping spiritual manipulation and false spiritual authority within the church. Minneapolis, MN: Bethany House Publishers.', source: 'The subtle power of spiritual abuse: Recognizing and escaping spiritual manipulation and false spiritual authority within the church', year: '1991', link: '', tier: 5 },
      { id: '46', text: 'Altemeyer, B., & Hunsberger, B. (1997). Amazing conversions: Why some turn to faith & others abandon religion. Amherst, NY: Prometheus Books.', source: 'Amazing conversions: Why some turn to faith & others abandon religion', year: '1997', link: '', tier: 5 },
      { id: '47', text: 'Pargament, K. I., et al. (2005). The many methods of religious coping: Development and initial validation of the RCOPE. Journal of Clinical Psychology, 61(4), 519-543.', source: 'Journal of Clinical Psychology', year: '2005', link: '', tier: 1 },
      { id: '48', text: 'Beck, R., & McDonald, A. (2004). Attachment to God: The Attachment to God Inventory, tests of working model correspondence, and an exploration of faith group differences. Journal of Psychology and Theology, 32(2), 92-103.', source: 'Journal of Psychology and Theology', year: '2004', link: '', tier: 1 },
      { id: '49', text: 'Granqvist, P., & Kirkpatrick, L. A. (2013). Religion, spirituality, and attachment. In K. I. Pargament (Ed.), APA handbook of psychology, religion, and spirituality (Vol. 1, pp. 139-155). Washington, DC: American Psychological Association.', source: 'APA handbook of psychology, religion, and spirituality', year: '2013', link: '', tier: 1 },
      { id: '50', text: 'Exline, J. J., et al. (2012). Anger toward God: Social-cognitive predictors, prevalence, and links with adjustment to bereavement and cancer. Journal of Personality and Social Psychology, 100(1), 129-148.', source: 'Journal of Personality and Social Psychology', year: '2012', link: '', tier: 1 },
      { id: '51', text: 'Hayes, S. C., et al. (2012). Acceptance and commitment therapy: The process and practice of mindful change (2nd ed.). New York: Guilford Press.', source: 'Acceptance and commitment therapy: The process and practice of mindful change', year: '2012', link: '', tier: 5 },
      { id: '52', text: 'Krause, N., & Wulff, K. M. (2004). Religious doubt and health: Exploring the potential dark side of religion. Sociology of Religion, 65(1), 35-56.', source: 'Sociology of Religion', year: '2004', link: '', tier: 1 },
      { id: '53', text: 'Abu-Raiya, H., & Pargament, K. I. (2015). Religious coping among diverse religions: Commonalities and divergences. Psychology of Religion and Spirituality, 7(1), 24-33.', source: 'Psychology of Religion and Spirituality', year: '2015', link: '', tier: 1 },
      { id: '54', text: 'Exline, J. J. (2013). Religious and spiritual struggles. In K. I. Pargament (Ed.), APA handbook of psychology, religion, and spirituality (Vol. 1, pp. 459-475). Washington, DC: American Psychological Association.', source: 'APA handbook of psychology, religion, and spirituality', year: '2013', link: '', tier: 1 },
      { id: '55', text: 'Granqvist, P., et al. (2010). Attachment and religious representations and behavior. In P. R. Shaver & M. Mikulincer (Eds.), Prosocial motives, emotions, and behavior (pp. 139-160). Washington, DC: American Psychological Association.', source: 'Prosocial motives, emotions, and behavior', year: '2010', link: '', tier: 1 },
      { id: '56', text: 'Kashdan, T. B., & Rottenberg, J. (2010). Psychological flexibility as a fundamental aspect of health. Clinical Psychology Review, 30(7), 865-878.', source: 'Clinical Psychology Review', year: '2010', link: '', tier: 1 },
      { id: '57', text: 'Pargament, K. I., et al. (2013). The many faces of (un)forgiveness: Crosscultural differences in forgiveness. In M. T. Evans & E. D. Walker (Eds.), Religion and psychology (pp. 109-123). New York: Nova Science Publishers.', source: 'Religion and psychology', year: '2013', link: '', tier: 1 },
      { id: '58', text: 'Fowler, J. W. (1981). Stages of faith: The psychology of human development and the quest for meaning. San Francisco: Harper & Row.', source: 'Stages of faith: The psychology of human development and the quest for meaning', year: '1981', link: '', tier: 1 },
      { id: '59', text: 'Batson, C. D., & Schoenrade, P. A. (1991). Measuring religion as quest: Validity concerns. Journal for the Scientific Study of Religion, 30(4), 416-429.', source: 'Journal for the Scientific Study of Religion', year: '1991', link: '', tier: 1 },
      { id: '60', text: 'Park, C. L. (2010). Making sense of the meaning literature: An integrative review of meaning making and its effects on adjustment to stressful life events. Psychological Bulletin, 136(2), 257-301.', source: 'Psychological Bulletin', year: '2010', link: '', tier: 1 },
      { id: '61', text: 'Smith, J. M., et al. (2018). Relief, resolve, and resilience: Trajectories of religious and spiritual struggle across time. Journal of Religion and Health, 57(6), 2217-2233.', source: 'Journal of Religion and Health', year: '2018', link: '', tier: 1 },
      { id: '62', text: 'Stauner, N., et al. (2016). From crisis to profit: Spiritual transformation mediates the relationship between stressful life events and psychological well-being. Psychology of Religion and Spirituality, 8(1), 23-35.', source: 'Psychology of Religion and Spirituality', year: '2016', link: '', tier: 1 },
      { id: '63', text: 'Fuller, R. C. (2001). Spiritual, but not religious: Understanding unchurched America. New York: Oxford University Press.', source: 'Spiritual, but not religious: Understanding unchurched America', year: '2001', link: '', tier: 5 },
      { id: '64', text: 'Baker, J. O., & Smith, B. G. (2015). American secularism: Cultural contours of nonreligious belief systems. New York: New York University Press.', source: 'American secularism: Cultural contours of nonreligious belief systems', year: '2015', link: '', tier: 5 },
      { id: '65', text: 'Bushman, B. J., et al. (2007). When God sanctions killing: Effect of scriptural violence on aggression. Psychological Science, 18(3), 204-207.', source: 'Psychological Science', year: '2007', link: '', tier: 1 },
      { id: '66', text: 'Koenig, H. G., et al. (2012). Handbook of religion and health (2nd ed.). New York: Oxford University Press.', source: 'Handbook of religion and health', year: '2012', link: '', tier: 5 },
      { id: '67', text: 'Pargament, K. I. (2007). Spiritually integrated psychotherapy: Understanding and addressing the sacred. New York: Guilford Press.', source: 'Spiritually integrated psychotherapy: Understanding and addressing the sacred', year: '2007', link: '', tier: 1 },
      { id: '68', text: 'Worthington, E. L., Jr., et al. (2011). Empirical research on religion and psychotherapeutic processes and outcomes: A 10-year review and research prospectus. Psychological Bulletin, 137(2), 329-353.', source: 'Psychological Bulletin', year: '2011', link: '', tier: 1 },
      { id: '69', text: 'Pearce, M. J., et al. (2015). Religiously integrated cognitive behavioral therapy: A new method of treatment for major depression in patients with chronic medical illness. Psychotherapy, 52(1), 56-66.', source: 'Psychotherapy', year: '2015', link: '', tier: 1 },
      { id: '70', text: 'Hayes, S. C., et al. (2012). Acceptance and commitment therapy: The process and practice of mindful change (2nd ed.). New York: Guilford Press.', source: 'Acceptance and commitment therapy: The process and practice of mindful change', year: '2012', link: '', tier: 5 },
      { id: '71', text: 'Wong, P. T. P. (2012). The human quest for meaning: Theories, research, and applications (2nd ed.). New York: Routledge.', source: 'The human quest for meaning: Theories, research, and applications', year: '2012', link: '', tier: 5 },
      { id: '72', text: 'Bromley, D. G. (Ed.). (1988). Falling from the faith: Causes and consequences of religious apostasy. Newbury Park, CA: Sage Publications.', source: 'Falling from the faith: Causes and consequences of religious apostasy', year: '1988', link: '', tier: 1 },
      { id: '73', text: 'Brueggemann, W. (1984). The message of the Psalms: A theological commentary. Minneapolis, MN: Augsburg Publishing House.', source: 'The message of the Psalms: A theological commentary', year: '1984', link: '', tier: 1 },
      { id: '74', text: 'Billman, K. D., & Migliore, D. L. (1999). Rachel\'s cry: Prayer of lament and rebirth of hope. Eugene, OR: Wipf and Stock Publishers.', source: 'Rachel\'s cry: Prayer of lament and rebirth of hope', year: '1999', link: '', tier: 5 },
      { id: '75', text: 'Turner, D. (1995). The darkness of God: Negativity in Christian mysticism. Cambridge: Cambridge University Press.', source: 'The darkness of God: Negativity in Christian mysticism', year: '1995', link: '', tier: 5 },
      { id: '76', text: 'Underhill, E. (1911/2002). Mysticism: A study in the nature and development of spiritual consciousness. Mineola, NY: Dover Publications.', source: 'Mysticism: A study in the nature and development of spiritual consciousness', year: '', link: '', tier: 1 },
      { id: '77', text: 'Guenther, M. (1992). Holy listening: The art of spiritual direction. Boston: Cowley Publications.', source: 'Holy listening: The art of spiritual direction', year: '1992', link: '', tier: 1 },
      { id: '78', text: 'Keating, T. (2006). Open mind, open heart: The contemplative dimension of the Gospel. New York: Continuum.', source: 'Open mind, open heart: The contemplative dimension of the Gospel', year: '2006', link: '', tier: 1 },
      { id: '79', text: 'Exline, J. J., & Rose, E. D. (2013). Religious and spiritual struggles. In R. F. Paloutzian & C. L. Park (Eds.), Handbook of the psychology of religion and spirituality (2nd ed., pp. 380-398). New York: Guilford Press.', source: 'Handbook of the psychology of religion and spirituality', year: '2013', link: '', tier: 1 },
      { id: '80', text: 'Pargament, K. I. (2007). Spiritually integrated psychotherapy: Understanding and addressing the sacred. New York: Guilford Press.', source: 'Spiritually integrated psychotherapy: Understanding and addressing the sacred', year: '2007', link: '', tier: 1 },
      { id: '81', text: 'Richards, P. S., & Bergin, A. E. (2005). A spiritual strategy for counseling and psychotherapy (2nd ed.). Washington, DC: American Psychological Association.', source: 'A spiritual strategy for counseling and psychotherapy', year: '2005', link: '', tier: 1 },
      { id: '82', text: 'Marlene Winell, R. (2007). Leaving the fold: A guide for former fundamentalists and others leaving their religion. Oakland, CA: New Harbinger Publications.', source: 'Leaving the fold: A guide for former fundamentalists and others leaving their religion', year: '2007', link: '', tier: 1 },
      { id: '83', text: 'Walker, D. F., et al. (2004). Therapists\' integration of religion and spirituality in counseling: A meta-analysis. Counseling and Values, 49(1), 69-80.', source: 'Counseling and Values', year: '2004', link: '', tier: 1 },
      { id: '84', text: 'Worthington, E. L., Jr., et al. (2011). Empirical research on religion and psychotherapeutic processes and outcomes: A 10-year review and research prospectus. Psychological Bulletin, 137(2), 329-353.', source: 'Psychological Bulletin', year: '2011', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            .
          </p>
        </div>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Handbook of the psychology of religion and spirituality" year="2013" tier={1} />
          <Citation id="2" index={2} source="American Journal of Orthopsychiatry" year="2015" tier={1} />
          <Citation id="3" index={3} source="The nonreligious: Understanding secular people and societies" year="2016" tier={5} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
