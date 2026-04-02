
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SPIRITUALITY_MEANING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// meaning-symbolic-systems | Articles 53–53
// ============================================================================

export const meaningsymbolicsystemsArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-SPR-063 | The Sacred and the Profane: How Humans Create Meaning Throug
  // --------------------------------------------------------------------------
  {
    id: catId(53),
    slug: 'sacred-profane',
    title: 'The Sacred and the Profane: How Humans Create Meaning Through Distinction',
    description: 'Explore the psychological distinction between sacred and profane—how humans designate certain things as special, set-apart, and meaningful. Understand the mental health implications of having (or losing) access to the sacred in daily life.',
    image: '/images/articles/cat31/cover-053.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 11,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['meaning-symbolic-systems', 'The Sacred and the Profane', 'How Humans Create Meaning Through Distinction'],

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
      { id: '1', text: 'Durkheim, É. (1912/1995). The elementary forms of religious life (K. E. Fields, Trans.). New York: Free Press.', source: 'The elementary forms of religious life', year: '', link: '', tier: 5 },
      { id: '2', text: 'Pargament, K. I., & Mahoney, A. (2005). Sacred matters: Sanctification as a vital topic for the psychology of religion. International Journal for the Psychology of Religion, 15(3), 179-198.', source: 'International Journal for the Psychology of Religion', year: '2005', link: '', tier: 1 },
      { id: '3', text: 'Tetlock, P. E., et al. (2000). The psychology of the unthinkable: Taboo trade-offs, forbidden base rates, and heretical counterfactuals. Journal of Personality and Social Psychology, 78(5), 853-870.', source: 'Journal of Personality and Social Psychology', year: '2000', link: '', tier: 1 },
      { id: '4', text: 'Mahoney, A., et al. (2001). Marriage and the spiritual realm: The role of proximal and distal religious constructs in marital functioning. Journal of Family Psychology, 15(4), 559-596.', source: 'Journal of Family Psychology', year: '2001', link: '', tier: 1 },
      { id: '5', text: 'Pargament, K. I. (2007). Spiritually integrated psychotherapy: Understanding and addressing the sacred. New York: Guilford Press.', source: 'Spiritually integrated psychotherapy: Understanding and addressing the sacred', year: '2007', link: '', tier: 1 },
      { id: '6', text: 'Durkheim, É. (1912/1995). The elementary forms of religious life (K. E. Fields, Trans.). New York: Free Press.', source: 'The elementary forms of religious life', year: '', link: '', tier: 5 },
      { id: '7', text: 'Durkheim, É. (1912/1995). The elementary forms of religious life (K. E. Fields, Trans.). New York: Free Press.', source: 'The elementary forms of religious life', year: '', link: '', tier: 5 },
      { id: '8', text: 'Pargament, K. I., & Mahoney, A. (2005). Sacred matters: Sanctification as a vital topic for the psychology of religion. International Journal for the Psychology of Religion, 15(3), 179-198.', source: 'International Journal for the Psychology of Religion', year: '2005', link: '', tier: 1 },
      { id: '9', text: 'Mahoney, A., et al. (2005). Sanctification of the body and behavioral health patterns of college students. International Journal for the Psychology of Religion, 15(3), 221-238.', source: 'International Journal for the Psychology of Religion', year: '2005', link: '', tier: 1 },
      { id: '10', text: 'Tetlock, P. E. (2003). Thinking the unthinkable: Sacred values and taboo cognitions. Trends in Cognitive Sciences, 7(7), 320-324.', source: 'Trends in Cognitive Sciences', year: '2003', link: '', tier: 1 },
      { id: '11', text: 'Baron, J., & Spranca, M. (1997). Protected values. Organizational Behavior and Human Decision Processes, 70(1), 1-16.', source: 'Organizational Behavior and Human Decision Processes', year: '1997', link: '', tier: 1 },
      { id: '12', text: 'Eliade, M. (1957/1959). The sacred and the profane: The nature of religion (W. R. Trask, Trans.). New York: Harcourt, Brace & World.', source: 'The sacred and the profane: The nature of religion', year: '', link: '', tier: 1 },
      { id: '13', text: 'Pargament, K. I., et al. (2013). Envisioning an integrative paradigm for the psychology of religion and spirituality. In K. I. Pargament (Ed.), APA handbook of psychology, religion, and spirituality (Vol. 1, pp. 3-19). Washington, DC: American Psychological Association.', source: 'APA handbook of psychology, religion, and spirituality', year: '2013', link: '', tier: 1 },
      { id: '14', text: 'Mahoney, A., et al. (1999). Marriage and the spiritual realm: The role of proximal and distal religious constructs in marital functioning. Journal of Family Psychology, 13(3), 321-338.', source: 'Journal of Family Psychology', year: '1999', link: '', tier: 1 },
      { id: '15', text: 'Taylor, B. (2010). Dark green religion: Nature spirituality and the planetary future. Berkeley: University of California Press.', source: 'Dark green religion: Nature spirituality and the planetary future', year: '2010', link: '', tier: 1 },
      { id: '16', text: 'Tetlock, P. E., et al. (2000). The psychology of the unthinkable: Taboo trade-offs, forbidden base rates, and heretical counterfactuals. Journal of Personality and Social Psychology, 78(5), 853-870.', source: 'Journal of Personality and Social Psychology', year: '2000', link: '', tier: 1 },
      { id: '17', text: 'Atran, S., & Ginges, J. (2012). Religious and sacred imperatives in human conflict. Science, 336(6083), 855-857.', source: 'Science', year: '2012', link: '', tier: 1 },
      { id: '18', text: 'Belk, R. W., et al. (1989). The sacred and the profane in consumer behavior: Theodicy on the odyssey. Journal of Consumer Research, 16(1), 1-38.', source: 'Journal of Consumer Research', year: '1989', link: '', tier: 1 },
      { id: '19', text: 'Grayson, K., & Shulman, D. (2000). Indexicality and the verification function of irreplaceable possessions: A semiotic analysis. Journal of Consumer Research, 27(1), 17-30.', source: 'Journal of Consumer Research', year: '2000', link: '', tier: 1 },
      { id: '20', text: 'Pargament, K. I., & Mahoney, A. (2005). Sacred matters: Sanctification as a vital topic for the psychology of religion. International Journal for the Psychology of Religion, 15(3), 179-198.', source: 'International Journal for the Psychology of Religion', year: '2005', link: '', tier: 1 },
      { id: '21', text: 'Mahoney, A., et al. (2005). Sanctification of the body and behavioral health patterns of college students. International Journal for the Psychology of Religion, 15(3), 221-238.', source: 'International Journal for the Psychology of Religion', year: '2005', link: '', tier: 1 },
      { id: '22', text: 'James, W. (1902/2002). The varieties of religious experience: A study in human nature. New York: Modern Library.', source: 'The varieties of religious experience: A study in human nature', year: '', link: '', tier: 1 },
      { id: '23', text: 'Rappaport, R. A. (1999). Ritual and religion in the making of humanity. Cambridge: Cambridge University Press.', source: 'Ritual and religion in the making of humanity', year: '1999', link: '', tier: 5 },
      { id: '24', text: 'McAdams, D. P. (1993). The stories we live by: Personal myths and the making of the self. New York: William Morrow.', source: 'The stories we live by: Personal myths and the making of the self', year: '1993', link: '', tier: 1 },
      { id: '25', text: 'Durkheim, É. (1912/1995). The elementary forms of religious life (K. E. Fields, Trans.). New York: Free Press.', source: 'The elementary forms of religious life', year: '', link: '', tier: 5 },
      { id: '26', text: 'Maslow, A. H. (1964). Religions, values, and peak-experiences. Columbus: Ohio State University Press.', source: 'Religions, values, and peak-experiences', year: '1964', link: '', tier: 5 },
      { id: '27', text: 'Park, C. L. (2010). Making sense of the meaning literature: An integrative review of meaning making and its effects on adjustment to stressful life events. Psychological Bulletin, 136(2), 257-301.', source: 'Psychological Bulletin', year: '2010', link: '', tier: 1 },
      { id: '28', text: 'Tillich, P. (1957). Dynamics of faith. New York: Harper & Row.', source: 'Dynamics of faith', year: '1957', link: '', tier: 5 },
      { id: '29', text: 'McAdams, D. P., et al. (2001). When bad things turn good and good things turn bad: Sequences of redemption and contamination in life narrative and their relation to psychosocial adaptation in midlife adults and in students. Personality and Social Psychology Bulletin, 27(4), 474-485.', source: 'Personality and Social Psychology Bulletin', year: '2001', link: '', tier: 1 },
      { id: '30', text: 'Yaden, D. B., et al. (2017). The varieties of self-transcendent experience. Review of General Psychology, 21(2), 143-160.', source: 'Review of General Psychology', year: '2017', link: '', tier: 1 },
      { id: '31', text: 'Steger, M. F., & Frazier, P. (2005). Meaning in life: One link in the chain from religiousness to well-being. Journal of Counseling Psychology, 52(4), 574-582.', source: 'Journal of Counseling Psychology', year: '2005', link: '', tier: 1 },
      { id: '32', text: 'Geertz, C. (1973). The interpretation of cultures: Selected essays. New York: Basic Books.', source: 'The interpretation of cultures: Selected essays', year: '1973', link: '', tier: 5 },
      { id: '33', text: 'Mahoney, A., et al. (1999). Marriage and the spiritual realm: The role of proximal and distal religious constructs in marital functioning. Journal of Family Psychology, 13(3), 321-338.', source: 'Journal of Family Psychology', year: '1999', link: '', tier: 1 },
      { id: '34', text: 'Atran, S., & Ginges, J. (2012). Religious and sacred imperatives in human conflict. Science, 336(6083), 855-857.', source: 'Science', year: '2012', link: '', tier: 1 },
      { id: '35', text: 'Baron, J., & Spranca, M. (1997). Protected values. Organizational Behavior and Human Decision Processes, 70(1), 1-16.', source: 'Organizational Behavior and Human Decision Processes', year: '1997', link: '', tier: 1 },
      { id: '36', text: 'Mahoney, A., et al. (2001). Marriage and the spiritual realm: The role of proximal and distal religious constructs in marital functioning. Journal of Family Psychology, 15(4), 559-596.', source: 'Journal of Family Psychology', year: '2001', link: '', tier: 1 },
      { id: '37', text: 'Mahoney, A., et al. (1999). Marriage and the spiritual realm: The role of proximal and distal religious constructs in marital functioning. Journal of Family Psychology, 13(3), 321-338.', source: 'Journal of Family Psychology', year: '1999', link: '', tier: 1 },
      { id: '38', text: 'Murray-Swank, A. B., et al. (2006). Sanctification of parenting: Links to corporal punishment and parental warmth among biblically conservative and liberal mothers. International Journal for the Psychology of Religion, 16(4), 271-287.', source: 'International Journal for the Psychology of Religion', year: '2006', link: '', tier: 1 },
      { id: '39', text: 'Rusu, P. P., et al. (2020). Spirituality and friendship: Evidence for a curvilinear relationship. Journal of Social and Personal Relationships, 37(5), 1574-1592.', source: 'Journal of Social and Personal Relationships', year: '2020', link: '', tier: 1 },
      { id: '40', text: 'Pargament, K. I. (1997). The psychology of religion and coping: Theory, research, practice. New York: Guilford Press.', source: 'The psychology of religion and coping: Theory, research, practice', year: '1997', link: '', tier: 1 },
      { id: '41', text: 'Park, C. L., & Folkman, S. (1997). Meaning in the context of stress and coping. Review of General Psychology, 1(2), 115-144.', source: 'Review of General Psychology', year: '1997', link: '', tier: 1 },
      { id: '42', text: 'Ano, G. G., & Vasconcelles, E. B. (2005). Religious coping and psychological adjustment to stress: A meta-analysis. Journal of Clinical Psychology, 61(4), 461-480.', source: 'Journal of Clinical Psychology', year: '2005', link: '', tier: 1 },
      { id: '43', text: 'Krause, N. (2008). Aging in the church: How social relationships affect health. West Conshohocken, PA: Templeton Foundation Press.', source: '', year: '2008', link: '', tier: 3 },
      { id: '44', text: 'Frankl, V. E. (1959/2006). Man\'s search for meaning. Boston: Beacon Press.', source: 'Man\'s search for meaning', year: '', link: '', tier: 5 },
      { id: '45', text: 'Weber, M. (1917/1946). Science as a vocation. In H. H. Gerth & C. Wright Mills (Eds.), From Max Weber: Essays in sociology (pp. 129-156). New York: Oxford University Press.', source: 'From Max Weber: Essays in sociology', year: '', link: '', tier: 1 },
      { id: '46', text: 'Taylor, C. (2007). A secular age. Cambridge, MA: Harvard University Press.', source: 'A secular age', year: '2007', link: '', tier: 5 },
      { id: '47', text: 'Sandel, M. J. (2012). What money can\'t buy: The moral limits of markets. New York: Farrar, Straus and Giroux.', source: 'What money can\'t buy: The moral limits of markets', year: '2012', link: '', tier: 1 },
      { id: '48', text: 'Weber, M. (1917/1946). Science as a vocation. In H. H. Gerth & C. Wright Mills (Eds.), From Max Weber: Essays in sociology (pp. 129-156). New York: Oxford University Press.', source: 'From Max Weber: Essays in sociology', year: '', link: '', tier: 1 },
      { id: '49', text: 'Berger, P. L. (1967). The sacred canopy: Elements of a sociological theory of religion. Garden City, NY: Doubleday.', source: 'The sacred canopy: Elements of a sociological theory of religion', year: '1967', link: '', tier: 1 },
      { id: '50', text: 'Turkle, S. (2015). Reclaiming conversation: The power of talk in a digital age. New York: Penguin Press.', source: 'Reclaiming conversation: The power of talk in a digital age', year: '2015', link: '', tier: 5 },
      { id: '51', text: 'Baumeister, R. F. (1991). Meanings of life. New York: Guilford Press.', source: 'Meanings of life', year: '1991', link: '', tier: 5 },
      { id: '52', text: 'Taylor, C. (2007). A secular age. Cambridge, MA: Harvard University Press.', source: 'A secular age', year: '2007', link: '', tier: 5 },
      { id: '53', text: 'Brickman, P., & Campbell, D. T. (1971). Hedonic relativism and planning the good society. In M. H. Appley (Ed.), Adaptation-level theory (pp. 287-305). New York: Academic Press.', source: 'Adaptation-level theory', year: '1971', link: '', tier: 3 },
      { id: '54', text: 'MacIntyre, A. (1981). After virtue: A study in moral theory. Notre Dame, IN: University of Notre Dame Press.', source: 'After virtue: A study in moral theory', year: '1981', link: '', tier: 5 },
      { id: '55', text: 'Cherlin, A. J. (2009). The marriage-go-round: The state of marriage and the family in America today. New York: Alfred A. Knopf.', source: 'The marriage-go-round: The state of marriage and the family in America today', year: '2009', link: '', tier: 1 },
      { id: '56', text: 'Frankl, V. E. (1959/2006). Man\'s search for meaning. Boston: Beacon Press.', source: 'Man\'s search for meaning', year: '', link: '', tier: 5 },
      { id: '57', text: 'Tetlock, P. E. (2003). Thinking the unthinkable: Sacred values and taboo cognitions. Trends in Cognitive Sciences, 7(7), 320-324.', source: 'Trends in Cognitive Sciences', year: '2003', link: '', tier: 1 },
      { id: '58', text: 'Tetlock, P. E., et al. (2000). The psychology of the unthinkable: Taboo trade-offs, forbidden base rates, and heretical counterfactuals. Journal of Personality and Social Psychology, 78(5), 853-870.', source: 'Journal of Personality and Social Psychology', year: '2000', link: '', tier: 1 },
      { id: '59', text: 'Atran, S., & Ginges, J. (2012). Religious and sacred imperatives in human conflict. Science, 336(6083), 855-857.', source: 'Science', year: '2012', link: '', tier: 1 },
      { id: '60', text: 'Herman, J. L. (1992). Trauma and recovery: The aftermath of violence—from domestic abuse to political terror. New York: Basic Books.', source: 'Trauma and recovery: The aftermath of violence—from domestic abuse to political terror', year: '1992', link: '', tier: 5 },
      { id: '61', text: 'Atran, S., & Ginges, J. (2012). Religious and sacred imperatives in human conflict. Science, 336(6083), 855-857.', source: 'Science', year: '2012', link: '', tier: 1 },
      { id: '62', text: 'Smith, J. Z. (1987). To take place: Toward theory in ritual. Chicago: University of Chicago Press.', source: 'To take place: Toward theory in ritual', year: '1987', link: '', tier: 5 },
      { id: '63', text: 'Rappaport, R. A. (1999). Ritual and religion in the making of humanity. Cambridge: Cambridge University Press.', source: 'Ritual and religion in the making of humanity', year: '1999', link: '', tier: 5 },
      { id: '64', text: 'Smith, W. C. (1993). What is scripture? A comparative approach. Minneapolis, MN: Fortress Press.', source: 'What is scripture? A comparative approach', year: '1993', link: '', tier: 5 },
      { id: '65', text: 'Turner, V., & Turner, E. (1978). Image and pilgrimage in Christian culture: Anthropological perspectives. New York: Columbia University Press.', source: 'Image and pilgrimage in Christian culture: Anthropological perspectives', year: '1978', link: '', tier: 5 },
      { id: '66', text: 'Durkheim, É. (1912/1995). The elementary forms of religious life (K. E. Fields, Trans.). New York: Free Press.', source: 'The elementary forms of religious life', year: '', link: '', tier: 5 },
      { id: '67', text: 'Keating, T. (2006). Open mind, open heart: The contemplative dimension of the Gospel. New York: Continuum.', source: 'Open mind, open heart: The contemplative dimension of the Gospel', year: '2006', link: '', tier: 1 },
      { id: '68', text: 'Pargament, K. I., et al. (2013). Envisioning an integrative paradigm for the psychology of religion and spirituality. In K. I. Pargament (Ed.), APA handbook of psychology, religion, and spirituality (Vol. 1, pp. 3-19). Washington, DC: American Psychological Association.', source: 'APA handbook of psychology, religion, and spirituality', year: '2013', link: '', tier: 1 },
      { id: '69', text: 'Kaplan, S. (1995). The restorative benefits of nature: Toward an integrative framework. Journal of Environmental Psychology, 15(3), 169-182.', source: 'Journal of Environmental Psychology', year: '1995', link: '', tier: 1 },
      { id: '70', text: 'Piff, P. K., et al. (2015). Awe, the small self, and prosocial behavior. Journal of Personality and Social Psychology, 108(6), 883-899.', source: 'Journal of Personality and Social Psychology', year: '2015', link: '', tier: 1 },
      { id: '71', text: 'Atran, S., & Ginges, J. (2012). Religious and sacred imperatives in human conflict. Science, 336(6083), 855-857.', source: 'Science', year: '2012', link: '', tier: 1 },
      { id: '72', text: 'Mahoney, A., et al. (2001). Marriage and the spiritual realm: The role of proximal and distal religious constructs in marital functioning. Journal of Family Psychology, 15(4), 559-596.', source: 'Journal of Family Psychology', year: '2001', link: '', tier: 1 },
      { id: '73', text: 'Hanh, T. N. (1991). Peace is every step: The path of mindfulness in everyday life. New York: Bantam Books.', source: 'Peace is every step: The path of mindfulness in everyday life', year: '1991', link: '', tier: 5 },
      { id: '74', text: 'Dillard, A. (1982). Teaching a stone to talk: Expeditions and encounters. New York: Harper & Row.', source: 'Teaching a stone to talk: Expeditions and encounters', year: '1982', link: '', tier: 5 },
      { id: '75', text: 'Berman, M. (1981). The reenchantment of the world. Ithaca, NY: Cornell University Press.', source: 'The reenchantment of the world', year: '1981', link: '', tier: 5 },
      { id: '76', text: 'Taylor, B. (2010). Dark green religion: Nature spirituality and the planetary future. Berkeley: University of California Press.', source: 'Dark green religion: Nature spirituality and the planetary future', year: '2010', link: '', tier: 1 },
      { id: '77', text: 'Cimino, R., & Smith, C. (2007). Secular humanism and atheism beyond progressive secularism. Sociology of Religion, 68(4), 407-424.', source: 'Sociology of Religion', year: '2007', link: '', tier: 1 },
      { id: '78', text: 'Honoré, C. (2004). In praise of slowness: How a worldwide movement is challenging the cult of speed. San Francisco: HarperSanFrancisco.', source: 'In praise of slowness: How a worldwide movement is challenging the cult of speed', year: '2004', link: '', tier: 5 },
      { id: '79', text: 'Kabat-Zinn, J. (1990). Full catastrophe living: Using the wisdom of your body and mind to face stress, pain, and illness. New York: Delacorte Press.', source: 'Full catastrophe living: Using the wisdom of your body and mind to face stress, pain, and illness', year: '1990', link: '', tier: 5 },
      { id: '80', text: 'Griffiths, R. R., et al. (2011). Psilocybin occasioned mystical-type experiences: Immediate and persisting dose-related effects. Psychopharmacology, 218(4), 649-665.', source: 'Psychopharmacology', year: '2011', link: '', tier: 1 },
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
          <Citation id="1" index={1} source="The elementary forms of religious life" year="" tier={5} />
          <Citation id="2" index={2} source="International Journal for the Psychology of Religion" year="2005" tier={1} />
          <Citation id="3" index={3} source="Journal of Personality and Social Psychology" year="2000" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
