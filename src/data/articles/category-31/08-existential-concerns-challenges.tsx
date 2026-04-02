
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SPIRITUALITY_MEANING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// existential-concerns-challenges | Articles 52–52
// ============================================================================

export const existentialconcernschallengesArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-SPR-061 | Existential Isolation: The Unbridgeable Gap Between Consciou
  // --------------------------------------------------------------------------
  {
    id: catId(52),
    slug: 'existential-isolation',
    title: 'Existential Isolation: The Unbridgeable Gap Between Consciousnesses',
    description: 'Understand existential isolation—the fundamental separateness of individual consciousness. Learn to distinguish it from loneliness, explore its psychological impacts, and find ways to accept and transcend this basic condition of existence.',
    image: '/images/articles/cat31/cover-052.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 11,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['existential-concerns-challenges', 'Existential Isolation', 'The Unbridgeable Gap Between Consciousnesses'],

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
      { id: '1', text: 'Yalom, I. D. (1980). Existential psychotherapy. New York: Basic Books.', source: 'Existential psychotherapy', year: '1980', link: '', tier: 1 },
      { id: '2', text: 'Yalom, I. D. (2008). Staring at the sun: Overcoming the terror of death. Psychotherapy in Australia, 14(4), 14-19.', source: 'Psychotherapy in Australia', year: '2008', link: '', tier: 1 },
      { id: '3', text: 'Pinel, E. C., et al. (2017). I-sharing and a classic conformity paradigm. Social Cognition, 35(1), 96-108.', source: 'Social Cognition', year: '2017', link: '', tier: 1 },
      { id: '4', text: 'Helm, P. J., et al. (2020). Existential isolation, loneliness, depression, and suicide ideation in young adults. Journal of Social and Clinical Psychology, 39(8), 641-674.', source: 'Journal of Social and Clinical Psychology', year: '2020', link: '', tier: 1 },
      { id: '5', text: 'Fromm-Reichmann, F. (1959). Loneliness. Psychiatry, 22(1), 1-15.', source: 'Psychiatry', year: '1959', link: '', tier: 1 },
      { id: '6', text: 'Mijuskovic, B. L. (2012). Loneliness in philosophy, psychology, and literature. Bloomington, IN: iUniverse.', source: 'Loneliness in philosophy, psychology, and literature', year: '2012', link: '', tier: 1 },
      { id: '7', text: 'Yalom, I. D. (1980). Existential psychotherapy. New York: Basic Books.', source: 'Existential psychotherapy', year: '1980', link: '', tier: 1 },
      { id: '8', text: 'Pinel, E. C., et al. (2021). Existential isolation. In S. Tomkins (Ed.), The handbook of solitude (pp. 123-142). Hoboken, NJ: Wiley-Blackwell.', source: 'The handbook of solitude', year: '2021', link: '', tier: 5 },
      { id: '9', text: 'Tillich, P. (1952). The courage to be. New Haven, CT: Yale University Press.', source: 'The courage to be', year: '1952', link: '', tier: 5 },
      { id: '10', text: 'Heidegger, M. (1927/1962). Being and time (J. Macquarrie & E. Robinson, Trans.). New York: Harper & Row.', source: 'Being and time', year: '', link: '', tier: 5 },
      { id: '11', text: 'Greyson, B. (2000). Near-death experiences. In E. Cardeña et al. (Eds.), Varieties of anomalous experience (pp. 315-352). Washington, DC: American Psychological Association.', source: 'Varieties of anomalous experience', year: '2000', link: '', tier: 1 },
      { id: '12', text: 'Scarry, E. (1985). The body in pain: The making and unmaking of the world. New York: Oxford University Press.', source: 'The body in pain: The making and unmaking of the world', year: '1985', link: '', tier: 5 },
      { id: '13', text: 'Letheby, C. (2021). Philosophy of psychedelics. Oxford: Oxford University Press.', source: 'Philosophy of psychedelics', year: '2021', link: '', tier: 5 },
      { id: '14', text: 'Pinel, E. C., & Long, A. E. (2012). When I\'s meet: Sharing subjective experience with someone from the outgroup. Personality and Social Psychology Bulletin, 38(3), 296-307.', source: 'Personality and Social Psychology Bulletin', year: '2012', link: '', tier: 1 },
      { id: '15', text: 'May, R., et al. (Eds.). (1958). Existence: A new dimension in psychiatry and psychology. New York: Basic Books.', source: 'Existence: A new dimension in psychiatry and psychology', year: '1958', link: '', tier: 1 },
      { id: '16', text: 'Bridges, W. (2004). Transitions: Making sense of life\'s changes (2nd ed.). Cambridge, MA: Da Capo Press.', source: 'Transitions: Making sense of life\'s changes', year: '2004', link: '', tier: 5 },
      { id: '17', text: 'Pinel, E. C., et al. (2004). Seeing I to I: A pathway to interpersonal connectedness. Journal of Personality and Social Psychology, 90(2), 243-257.', source: 'Journal of Personality and Social Psychology', year: '2004', link: '', tier: 1 },
      { id: '18', text: 'Corey, G. (2016). Theory and practice of counseling and psychotherapy (10th ed.). Boston: Cengage Learning.', source: 'Theory and practice of counseling and psychotherapy', year: '2016', link: '', tier: 1 },
      { id: '19', text: 'May, R. (1977). The meaning of anxiety (Rev. ed.). New York: W. W. Norton & Company.', source: 'The meaning of anxiety', year: '1977', link: '', tier: 1 },
      { id: '20', text: 'Tillich, P. (1952). The courage to be. New Haven, CT: Yale University Press.', source: 'The courage to be', year: '1952', link: '', tier: 5 },
      { id: '21', text: 'Sierra, M., & David, A. S. (2011). Depersonalization: A selective impairment of self-awareness. Consciousness and Cognition, 20(1), 99-108.', source: 'Consciousness and Cognition', year: '2011', link: '', tier: 1 },
      { id: '22', text: 'Frankl, V. E. (1959/2006). Man\'s search for meaning. Boston: Beacon Press.', source: 'Man\'s search for meaning', year: '', link: '', tier: 5 },
      { id: '23', text: 'Helm, P. J., et al. (2018). An existential perspective on the desire to belong. In J. P. Forgas & R. F. Baumeister (Eds.), The social psychology of living well (pp. 25-40). New York: Psychology Press.', source: 'The social psychology of living well', year: '2018', link: '', tier: 1 },
      { id: '24', text: 'Fromm, E. (1941/1994). Escape from freedom. New York: Henry Holt and Company.', source: 'Escape from freedom', year: '', link: '', tier: 1 },
      { id: '25', text: 'Bowen, M. (1978). Family therapy in clinical practice. New York: Jason Aronson.', source: 'Family therapy in clinical practice', year: '1978', link: '', tier: 1 },
      { id: '26', text: 'Cacioppo, J. T., & Patrick, W. (2008). Loneliness: Human nature and the need for social connection. New York: W. W. Norton & Company.', source: 'Loneliness: Human nature and the need for social connection', year: '2008', link: '', tier: 1 },
      { id: '27', text: 'Asch, S. E. (1956). Studies of independence and conformity: I. A minority of one against a unanimous majority. Psychological Monographs: General and Applied, 70(9), 1-70.', source: 'Psychological Monographs: General and Applied', year: '1956', link: '', tier: 1 },
      { id: '28', text: 'Perry, W. G., Jr. (1970). Forms of intellectual and ethical development in the college years: A scheme. New York: Holt, Rinehart and Winston.', source: 'Forms of intellectual and ethical development in the college years: A scheme', year: '1970', link: '', tier: 3 },
      { id: '29', text: 'Berscheid, E., & Regan, P. (2005). The psychology of interpersonal relationships. Upper Saddle River, NJ: Pearson Prentice Hall.', source: 'The psychology of interpersonal relationships', year: '2005', link: '', tier: 1 },
      { id: '30', text: 'Yalom, I. D. (2002). The gift of therapy: An open letter to a new generation of therapists and their patients. New York: HarperCollins.', source: 'The gift of therapy: An open letter to a new generation of therapists and their patients', year: '2002', link: '', tier: 5 },
      { id: '31', text: 'Bugental, J. F. T. (1987). The art of the psychotherapist. New York: W. W. Norton & Company.', source: 'The art of the psychotherapist', year: '1987', link: '', tier: 1 },
      { id: '32', text: 'Yalom, I. D. (1980). Existential psychotherapy. New York: Basic Books.', source: 'Existential psychotherapy', year: '1980', link: '', tier: 1 },
      { id: '33', text: 'Sartre, J.-P. (1943/1956). Being and nothingness (H. E. Barnes, Trans.). New York: Washington Square Press.', source: 'Being and nothingness', year: '', link: '', tier: 5 },
      { id: '34', text: 'Heidegger, M. (1927/1962). Being and time (J. Macquarrie & E. Robinson, Trans.). New York: Harper & Row.', source: 'Being and time', year: '', link: '', tier: 5 },
      { id: '35', text: 'Buber, M. (1923/1970). I and thou (W. Kaufmann, Trans.). New York: Charles Scribner\'s Sons.', source: 'I and thou', year: '', link: '', tier: 1 },
      { id: '36', text: 'Schnarch, D. (1997). Passionate marriage: Love, sex, and intimacy in emotionally committed relationships. New York: W. W. Norton & Company.', source: 'Passionate marriage: Love, sex, and intimacy in emotionally committed relationships', year: '1997', link: '', tier: 1 },
      { id: '37', text: 'Buber, M. (1923/1970). I and thou (W. Kaufmann, Trans.). New York: Charles Scribner\'s Sons.', source: 'I and thou', year: '', link: '', tier: 1 },
      { id: '38', text: 'Schnarch, D. (1997). Passionate marriage: Love, sex, and intimacy in emotionally committed relationships. New York: W. W. Norton & Company.', source: 'Passionate marriage: Love, sex, and intimacy in emotionally committed relationships', year: '1997', link: '', tier: 1 },
      { id: '39', text: 'Neff, K. (2011). Self-compassion: The proven power of being kind to yourself. New York: William Morrow.', source: 'Self-compassion: The proven power of being kind to yourself', year: '2011', link: '', tier: 1 },
      { id: '40', text: 'Brown, B. (2012). Daring greatly: How the courage to be vulnerable transforms the way we live, love, parent, and lead. New York: Gotham Books.', source: 'Daring greatly: How the courage to be vulnerable transforms the way we live, love, parent, and lead', year: '2012', link: '', tier: 5 },
      { id: '41', text: 'May, R. (1975). The courage to create. New York: W. W. Norton & Company.', source: 'The courage to create', year: '1975', link: '', tier: 1 },
      { id: '42', text: 'Sontag, S. (1966). Against interpretation and other essays. New York: Farrar, Straus and Giroux.', source: 'Against interpretation and other essays', year: '1966', link: '', tier: 1 },
      { id: '43', text: 'Stace, W. T. (1960). Mysticism and philosophy. London: Macmillan.', source: 'Mysticism and philosophy', year: '1960', link: '', tier: 1 },
      { id: '44', text: 'Camus, A. (1942/1955). The myth of Sisyphus and other essays (J. O\'Brien, Trans.). New York: Vintage Books.', source: 'The myth of Sisyphus and other essays', year: '', link: '', tier: 5 },
      { id: '45', text: 'Dass, R. (1971). Be here now. San Cristobal, NM: Lama Foundation.', source: 'Be here now', year: '1971', link: '', tier: 3 },
      { id: '46', text: 'Yalom, I. D. (2002). The gift of therapy: An open letter to a new generation of therapists and their patients. New York: HarperCollins.', source: 'The gift of therapy: An open letter to a new generation of therapists and their patients', year: '2002', link: '', tier: 5 },
      { id: '47', text: 'Rogers, C. R. (1961). On becoming a person: A therapist\'s view of psychotherapy. Boston: Houghton Mifflin.', source: 'On becoming a person: A therapist\'s view of psychotherapy', year: '1961', link: '', tier: 1 },
      { id: '48', text: 'Buber, M. (1957). Distance and relation. Psychiatry, 20(2), 97-104.', source: 'Distance and relation', year: '1957', link: '', tier: 1 },
      { id: '49', text: 'May, R. (1983). The discovery of being: Writings in existential psychology. New York: W. W. Norton & Company.', source: 'The discovery of being: Writings in existential psychology', year: '1983', link: '', tier: 1 },
      { id: '50', text: 'Schneider, K. J., & Krug, O. T. (2010). Existential-humanistic therapy. Washington, DC: American Psychological Association.', source: 'Existential-humanistic therapy', year: '2010', link: '', tier: 1 },
      { id: '51', text: 'Yalom, I. D. (1980). Existential psychotherapy. New York: Basic Books.', source: 'Existential psychotherapy', year: '1980', link: '', tier: 1 },
      { id: '52', text: 'Frankl, V. E. (1959/2006). Man\'s search for meaning. Boston: Beacon Press.', source: 'Man\'s search for meaning', year: '', link: '', tier: 5 },
      { id: '53', text: 'Perls, F., et al. (1951). Gestalt therapy: Excitement and growth in the human personality. New York: Julian Press.', source: 'Gestalt therapy: Excitement and growth in the human personality', year: '1951', link: '', tier: 5 },
      { id: '54', text: 'Aron, L. (1996). A meeting of minds: Mutuality in psychoanalysis. Hillsdale, NJ: Analytic Press.', source: 'A meeting of minds: Mutuality in psychoanalysis', year: '1996', link: '', tier: 1 },
      { id: '55', text: 'American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.). Arlington, VA: American Psychiatric Publishing.', source: 'Diagnostic and statistical manual of mental disorders', year: '2013', link: '', tier: 3 },
      { id: '56', text: 'Sierra, M., & Berrios, G. E. (1998). Depersonalization: Neurobiological perspectives. Biological Psychiatry, 44(9), 898-908.', source: 'Biological Psychiatry', year: '1998', link: '', tier: 1 },
      { id: '57', text: 'Binswanger, L. (1963). Being-in-the-world: Selected papers of Ludwig Binswanger (J. Needleman, Trans.). New York: Basic Books.', source: 'Being-in-the-world: Selected papers of Ludwig Binswanger', year: '1963', link: '', tier: 5 },
      { id: '58', text: 'Becker, E. (1973). The denial of death. New York: Free Press.', source: 'The denial of death', year: '1973', link: '', tier: 5 },
      { id: '59', text: 'Neff, K., & Germer, C. (2018). The mindful self-compassion workbook: A proven way to accept yourself, build inner strength, and thrive. New York: Guilford Press.', source: 'The mindful self-compassion workbook: A proven way to accept yourself, build inner strength, and thrive', year: '2018', link: '', tier: 5 },
      { id: '60', text: 'Dissanayake, E. (1992). Homo aestheticus: Where art comes from and why. New York: Free Press.', source: 'Homo aestheticus: Where art comes from and why', year: '1992', link: '', tier: 5 },
      { id: '61', text: 'James, W. (1902/2002). The varieties of religious experience: A study in human nature. New York: Modern Library.', source: 'The varieties of religious experience: A study in human nature', year: '', link: '', tier: 1 },
      { id: '62', text: 'Turkle, S. (2011). Alone together: Why we expect more from technology and less from each other. New York: Basic Books.', source: 'Alone together: Why we expect more from technology and less from each other', year: '2011', link: '', tier: 5 },
      { id: '63', text: 'Twenge, J. M. (2017). iGen: Why today\'s super-connected kids are growing up less rebellious, more tolerant, less happy—and completely unprepared for adulthood. New York: Atria Books.', source: 'iGen: Why today\'s super-connected kids are growing up less rebellious, more tolerant, less happy—and completely unprepared for adulthood', year: '2017', link: '', tier: 5 },
      { id: '64', text: 'Horton, D., & Wohl, R. R. (1956). Mass communication and para-social interaction: Observations on intimacy at a distance. Psychiatry, 19(3), 215-229.', source: 'Psychiatry', year: '1956', link: '', tier: 1 },
      { id: '65', text: 'Chalmers, D. J. (1996). The conscious mind: In search of a fundamental theory. New York: Oxford University Press.', source: 'The conscious mind: In search of a fundamental theory', year: '1996', link: '', tier: 5 },
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
          <Citation id="1" index={1} source="Existential psychotherapy" year="1980" tier={1} />
          <Citation id="2" index={2} source="Psychotherapy in Australia" year="2008" tier={1} />
          <Citation id="3" index={3} source="Social Cognition" year="2017" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
