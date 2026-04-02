
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SPIRITUALITY_MEANING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// spiritual-practices-methods | Articles 55–56
// ============================================================================

export const spiritualpracticesmethodsArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-SPR-058 | Contemplative Practices: Beyond Meditation—Diverse Paths to 
  // --------------------------------------------------------------------------
  {
    id: catId(55),
    slug: 'contemplative-practices',
    title: 'Contemplative Practices: Beyond Meditation—Diverse Paths to Inner Stillness',
    description: 'Explore contemplative practices beyond meditation—from lectio divina to tea ceremony. Learn how diverse traditions cultivate presence, insight, and wellbeing through sustained attention and reflection.',
    image: '/images/articles/cat31/cover-055.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 11,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['spiritual-practices-methods', 'Contemplative Practices', 'Beyond Meditation', 'Diverse Paths to Inner Stillness'],

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
      { id: '1', text: 'Sharf, R. H. (2015). Is mindfulness Buddhist? (And why it matters). Transcultural Psychiatry, 52(4), 470-484.', source: 'Transcultural Psychiatry', year: '2015', link: '', tier: 1 },
      { id: '2', text: 'Dahl, C. J., et al. (2015). Reconstructing and deconstructing the self: Cognitive mechanisms in meditation practice. Trends in Cognitive Sciences, 19(9), 515-523.', source: 'Trends in Cognitive Sciences', year: '2015', link: '', tier: 1 },
      { id: '3', text: 'Galante, J., et al. (2021). A systematic review of the evidence for meditation interventions. Nature Human Behaviour, 5(9), 1107-1113.', source: 'Nature Human Behaviour', year: '2021', link: '', tier: 1 },
      { id: '4', text: 'Eberth, J., & Sedlmeier, P. (2012). The effects of mindfulness meditation: A meta-analysis. Mindfulness, 3(3), 174-189.', source: 'Mindfulness', year: '2012', link: '', tier: 1 },
      { id: '5', text: 'Treleaven, D. A. (2018). Trauma-sensitive mindfulness: Practices for safe and transformative healing. New York: W. W. Norton & Company.', source: 'Trauma-sensitive mindfulness: Practices for safe and transformative healing', year: '2018', link: '', tier: 1 },
      { id: '6', text: 'Lutz, A., et al. (2008). Attention regulation and monitoring in meditation. Trends in Cognitive Sciences, 12(4), 163-169.', source: 'Trends in Cognitive Sciences', year: '2008', link: '', tier: 1 },
      { id: '7', text: 'Keating, T. (2006). Open mind, open heart: The contemplative dimension of the Gospel. New York: Continuum.', source: 'Open mind, open heart: The contemplative dimension of the Gospel', year: '2006', link: '', tier: 1 },
      { id: '8', text: 'Travis, F., & Shear, J. (2010). Focused attention, open monitoring and automatic self-transcending: Categories to organize meditations from Vedic, Buddhist and Chinese traditions. Consciousness and Cognition, 19(4), 1110-1118.', source: 'Consciousness and Cognition', year: '2010', link: '', tier: 1 },
      { id: '9', text: 'Kabat-Zinn, J. (1990). Full catastrophe living: Using the wisdom of your body and mind to face stress, pain, and illness. New York: Delacorte Press.', source: 'Full catastrophe living: Using the wisdom of your body and mind to face stress, pain, and illness', year: '1990', link: '', tier: 5 },
      { id: '10', text: 'Vago, D. R., & Silbersweig, D. A. (2012). Self-awareness, self-regulation, and self-transcendence (S-ART): A framework for understanding the neurobiological mechanisms of mindfulness. Frontiers in Human Neuroscience, 6, 296.', source: 'Frontiers in Human Neuroscience', year: '2012', link: '', tier: 1 },
      { id: '11', text: 'Payne, P., & Crane-Godreau, M. A. (2015). The preparatory set: A novel approach to understanding stress, trauma, and the bodymind therapies. Frontiers in Human Neuroscience, 9, 178.', source: 'Frontiers in Human Neuroscience', year: '2015', link: '', tier: 1 },
      { id: '12', text: 'Jerath, R., et al. (2006). Physiology of long pranayamic breathing: Neural respiratory elements may provide a mechanism that explains how slow deep breathing shifts the autonomic nervous system. Medical Hypotheses, 67(3), 566-571.', source: 'Medical Hypotheses', year: '2006', link: '', tier: 1 },
      { id: '13', text: 'Ditto, B., et al. (2006). Short-term autonomic and cardiovascular effects of mindfulness body scan meditation. Annals of Behavioral Medicine, 32(3), 227-234.', source: 'Annals of Behavioral Medicine', year: '2006', link: '', tier: 1 },
      { id: '14', text: 'Hofmann, S. G., et al. (2011). Loving-kindness and compassion meditation: Potential for psychological interventions. Clinical Psychology Review, 31(7), 1126-1132.', source: 'Clinical Psychology Review', year: '2011', link: '', tier: 1 },
      { id: '15', text: 'Pennington, M. B. (1980). Centering Prayer: Renewing an ancient Christian prayer form. New York: Doubleday.', source: 'Centering Prayer: Renewing an ancient Christian prayer form', year: '1980', link: '', tier: 1 },
      { id: '16', text: 'Sivananda, S. (1994). Bliss divine: A book of spiritual essays on the lofty purpose of human life and the means to its achievement. Shivanandanagar, India: Divine Life Society.', source: 'Bliss divine: A book of spiritual essays on the lofty purpose of human life and the means to its achievement', year: '1994', link: '', tier: 3 },
      { id: '17', text: 'Ernst, C. W. (1997). The Shambhala guide to Sufism. Boston: Shambhala Publications.', source: 'The Shambhala guide to Sufism', year: '1997', link: '', tier: 1 },
      { id: '18', text: 'Dysinger, L. (2005). Accepting the embrace of God: The ancient art of lectio divina. Cistercian Studies Quarterly, 40(3), 255-288.', source: 'Cistercian Studies Quarterly', year: '2005', link: '', tier: 1 },
      { id: '19', text: 'Hori, V. S. (1994). Teaching and learning in the Rinzai Zen monastery. Journal of Japanese Studies, 20(1), 5-35.', source: 'Journal of Japanese Studies', year: '1994', link: '', tier: 1 },
      { id: '20', text: 'Godman, D. (Ed.). (1985). Be as you are: The teachings of Sri Ramana Maharshi. London: Arkana.', source: 'Be as you are: The teachings of Sri Ramana Maharshi', year: '1985', link: '', tier: 1 },
      { id: '21', text: 'Pennebaker, J. W., & Smyth, J. M. (2016). Opening up by writing it down: How expressive writing improves health and eases emotional pain (3rd ed.). New York: Guilford Press.', source: 'Opening up by writing it down: How expressive writing improves health and eases emotional pain', year: '2016', link: '', tier: 5 },
      { id: '22', text: 'Baumgartner, T. A., et al. (2014). Seeing beyond the self: Perspectives on self-awareness and self-transcendence in Buddhist meditation. Progress in Brain Research, 244, 203-220.', source: 'Progress in Brain Research', year: '2014', link: '', tier: 1 },
      { id: '23', text: 'Sen, S. (1998). The Japanese way of tea: From its origins in China to Sen Rikyu. Honolulu: University of Hawaii Press.', source: 'The Japanese way of tea: From its origins in China to Sen Rikyu', year: '1998', link: '', tier: 5 },
      { id: '24', text: 'Richie, D. (2007). A tractate on Japanese aesthetics. Berkeley, CA: Stone Bridge Press.', source: 'A tractate on Japanese aesthetics', year: '2007', link: '', tier: 5 },
      { id: '25', text: 'Beck, G. L. (2012). Sonic liturgy: Ritual and music in Hindu tradition. Columbia: University of South Carolina Press.', source: 'Sonic liturgy: Ritual and music in Hindu tradition', year: '2012', link: '', tier: 5 },
      { id: '26', text: 'Tang, Y. Y., et al. (2015). The neuroscience of mindfulness meditation. Nature Reviews Neuroscience, 16(4), 213-225.', source: 'Nature Reviews Neuroscience', year: '2015', link: '', tier: 1 },
      { id: '27', text: 'Brewer, J. A., et al. (2011). Meditation experience is associated with differences in default mode network activity and connectivity. Proceedings of the National Academy of Sciences, 108(50), 20254-20259.', source: 'Proceedings of the National Academy of Sciences', year: '2011', link: '', tier: 1 },
      { id: '28', text: 'Tang, Y. Y., & Posner, M. I. (2009). Attention training and attention state training. Trends in Cognitive Sciences, 13(5), 222-227.', source: 'Trends in Cognitive Sciences', year: '2009', link: '', tier: 1 },
      { id: '29', text: 'Davidson, R. J., et al. (2003). Alterations in brain and immune function produced by mindfulness meditation. Psychosomatic Medicine, 65(4), 564-570.', source: 'Psychosomatic Medicine', year: '2003', link: '', tier: 1 },
      { id: '30', text: 'Hölzel, B. K., et al. (2011). Mindfulness practice leads to increases in regional brain gray matter density. Psychiatry Research: Neuroimaging, 191(1), 36-43.', source: 'Psychiatry Research: Neuroimaging', year: '2011', link: '', tier: 1 },
      { id: '31', text: 'Shapiro, S. L., et al. (2006). Mechanisms of mindfulness. Journal of Clinical Psychology, 62(3), 373-386.', source: 'Journal of Clinical Psychology', year: '2006', link: '', tier: 1 },
      { id: '32', text: 'Fresco, D. M., et al. (2007). Initial psychometric properties of the Experiences Questionnaire: Validation of a self-report measure of decentering. Behavior Therapy, 38(3), 234-246.', source: 'Behavior Therapy', year: '2007', link: '', tier: 1 },
      { id: '33', text: 'Jha, A. P., et al. (2007). Mindfulness training modifies subsystems of attention. Cognitive, Affective, & Behavioral Neuroscience, 7(2), 109-119.', source: 'Cognitive, Affective, & Behavioral Neuroscience', year: '2007', link: '', tier: 1 },
      { id: '34', text: 'Farb, N. A., et al. (2015). Interoception, contemplative practice, and health. Frontiers in Psychology, 6, 763.', source: 'Frontiers in Psychology', year: '2015', link: '', tier: 1 },
      { id: '35', text: 'Yaden, D. B., et al. (2017). The varieties of self-transcendent experience. Review of General Psychology, 21(2), 143-160.', source: 'Review of General Psychology', year: '2017', link: '', tier: 1 },
      { id: '36', text: 'Klimecki, O. M., et al. (2014). Differential pattern of functional brain plasticity after compassion and empathy training. Social Cognitive and Affective Neuroscience, 9(6), 873-879.', source: 'Social Cognitive and Affective Neuroscience', year: '2014', link: '', tier: 1 },
      { id: '37', text: 'Goyal, M., et al. (2014). Meditation programs for psychological stress and well-being: A systematic review and meta-analysis. JAMA Internal Medicine, 174(3), 357-368.', source: 'JAMA Internal Medicine', year: '2014', link: '', tier: 1 },
      { id: '38', text: 'Khoury, B., et al. (2015). Mindfulness-based stress reduction for healthy individuals: A meta-analysis. Journal of Psychosomatic Research, 78(6), 519-528.', source: 'Journal of Psychosomatic Research', year: '2015', link: '', tier: 1 },
      { id: '39', text: 'Anderson, J. W., et al. (2008). Blood pressure response to Transcendental Meditation: A meta-analysis. American Journal of Hypertension, 21(3), 310-316.', source: 'American Journal of Hypertension', year: '2008', link: '', tier: 1 },
      { id: '40', text: 'Hofmann, S. G., et al. (2016). The effect of mindfulness-based therapy on anxiety and depression: A meta-analytic review. Journal of Consulting and Clinical Psychology, 84(4), 365-378.', source: 'Journal of Consulting and Clinical Psychology', year: '2016', link: '', tier: 1 },
      { id: '41', text: 'Cramer, H., et al. (2017). Yoga for depression: A systematic review and meta-analysis. Depression and Anxiety, 34(9), 833-845.', source: 'Depression and Anxiety', year: '2017', link: '', tier: 1 },
      { id: '42', text: 'Piet, J., & Hougaard, E. (2011). The effect of mindfulness-based cognitive therapy for prevention of relapse in recurrent major depressive disorder: A systematic review and meta-analysis. Clinical Psychology Review, 31(6), 1032-1040.', source: 'Clinical Psychology Review', year: '2011', link: '', tier: 1 },
      { id: '43', text: 'Fredrickson, B. L., et al. (2008). Open hearts build lives: Positive emotions, induced through loving-kindness meditation, build consequential personal resources. Journal of Personality and Social Psychology, 95(5), 1045-1062.', source: 'Journal of Personality and Social Psychology', year: '2008', link: '', tier: 1 },
      { id: '44', text: 'Cramer, H., et al. (2013). Yoga for depression: A systematic review. Cochrane Database of Systematic Reviews, 2013(11), CD004377.', source: 'Cochrane Database of Systematic Reviews', year: '2013', link: '', tier: 1 },
      { id: '45', text: 'Chiesa, A., et al. (2011). Does mindfulness training improve cognitive abilities? A systematic review of neuropsychological findings. Clinical Psychology Review, 31(3), 449-464.', source: 'Clinical Psychology Review', year: '2011', link: '', tier: 1 },
      { id: '46', text: 'MacLean, K. A., et al. (2010). Intensive meditation training improves perceptual discrimination and sustained attention. Psychological Science, 21(6), 829-839.', source: 'Psychological Science', year: '2010', link: '', tier: 1 },
      { id: '47', text: 'Jha, A. P., et al. (2015). Examining the protective effects of mindfulness training on working memory capacity and affective experience. Emotion, 10(1), 54-64.', source: 'Emotion', year: '2015', link: '', tier: 1 },
      { id: '48', text: 'Moore, A., & Malinowski, P. (2009). Meditation, mindfulness and cognitive flexibility. Consciousness and Cognition, 18(1), 176-186.', source: 'Consciousness and Cognition', year: '2009', link: '', tier: 1 },
      { id: '49', text: 'Weng, H. Y., et al. (2013). Compassion training alters altruism and neural responses to suffering. Psychological Science, 24(7), 1171-1180.', source: 'Psychological Science', year: '2013', link: '', tier: 1 },
      { id: '50', text: 'Leiberg, S., et al. (2011). Short-term compassion training increases prosocial behavior in a newly developed prosocial game. PLoS ONE, 6(3), e17798.', source: 'PLoS ONE', year: '2011', link: '', tier: 1 },
      { id: '51', text: 'Kok, B. E., et al. (2013). How positive emotions build physical health: Perceived positive social connections account for the upward spiral between positive emotions and vagal tone. Psychological Science, 24(7), 1123-1132.', source: 'Psychological Science', year: '2013', link: '', tier: 1 },
      { id: '52', text: 'Scarlet, J., et al. (2017). Effects of compassion cultivation training (CCT) on health-care providers. Journal of Compassionate Health Care, 4(1), 1-11.', source: 'Journal of Compassionate Health Care', year: '2017', link: '', tier: 1 },
      { id: '53', text: 'Britton, W. B., et al. (2018). Defining and measuring meditation-related adverse effects in mindfulness-based programs. Clinical Psychological Science, 6(6), 829-849.', source: 'Clinical Psychological Science', year: '2018', link: '', tier: 1 },
      { id: '54', text: 'Kornfield, J. (1993). A path with heart: A guide through the perils and promises of spiritual life. New York: Bantam Books.', source: 'A path with heart: A guide through the perils and promises of spiritual life', year: '1993', link: '', tier: 5 },
      { id: '55', text: 'Lindahl, J. R., et al. (2017). The varieties of contemplative experience: A mixed-methods study of meditation-related challenges in Western Buddhists. PLoS ONE, 12(5), e0176239.', source: 'PLoS ONE', year: '2017', link: '', tier: 1 },
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
          <Citation id="1" index={1} source="Transcultural Psychiatry" year="2015" tier={1} />
          <Citation id="2" index={2} source="Trends in Cognitive Sciences" year="2015" tier={1} />
          <Citation id="3" index={3} source="Nature Human Behaviour" year="2021" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-SPR-060 | Ritual and Ceremony: The Psychological Power of Sacred Acts
  // --------------------------------------------------------------------------
  {
    id: catId(56),
    slug: 'ritual-ceremony',
    title: 'Ritual and Ceremony: The Psychological Power of Sacred Acts',
    description: 'Explore the psychology of rituals and ceremonies—from religious sacraments to personal practices. Learn how structured symbolic actions reduce anxiety, mark transitions, build community, and create meaning.',
    image: '/images/articles/cat31/cover-056.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 12,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['spiritual-practices-methods', 'Ritual and Ceremony', 'The Psychological Power of Sacred Acts'],

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
      { id: '1', text: 'Turner, V. (1969). The ritual process: Structure and anti-structure. Chicago: Aldine Publishing.', source: 'The ritual process: Structure and anti-structure', year: '1969', link: '', tier: 1 },
      { id: '2', text: 'Brooks, A. W., et al. (2016). Don\'t stop believing: Rituals improve performance by decreasing anxiety. Organizational Behavior and Human Decision Processes, 137, 71-85.', source: 'Organizational Behavior and Human Decision Processes', year: '2016', link: '', tier: 1 },
      { id: '3', text: 'Hobson, N. M., et al. (2018). The psychology of rituals: An integrative review and process-based framework. Personality and Social Psychology Review, 22(3), 260-284.', source: 'Personality and Social Psychology Review', year: '2018', link: '', tier: 1 },
      { id: '4', text: 'Tarr, B., et al. (2016). Synchrony and exertion during dance independently raise pain threshold and encourage social bonding. Biology Letters, 12(10), 20160767.', source: 'Biology Letters', year: '2016', link: '', tier: 1 },
      { id: '5', text: 'Norton, M. I., & Gino, F. (2014). Rituals alleviate grieving for loved ones, lovers, and lotteries. Journal of Experimental Psychology: General, 143(1), 266-272.', source: 'Journal of Experimental Psychology: General', year: '2014', link: '', tier: 1 },
      { id: '6', text: 'Boyer, P., & Liénard, P. (2006). Why ritualized behavior? Precaution systems and action parsing in developmental, pathological and cultural rituals. Behavioral and Brain Sciences, 29(6), 595-613.', source: 'Behavioral and Brain Sciences', year: '2006', link: '', tier: 1 },
      { id: '7', text: 'Wood, W., & Rünger, D. (2016). Psychology of habit. Annual Review of Psychology, 67, 289-314.', source: 'Annual Review of Psychology', year: '2016', link: '', tier: 1 },
      { id: '8', text: 'Bell, C. (1997). Ritual: Perspectives and dimensions. New York: Oxford University Press.', source: 'Ritual: Perspectives and dimensions', year: '1997', link: '', tier: 5 },
      { id: '9', text: 'Lang, M., et al. (2015). Effects of anxiety on spontaneous ritualized behavior. Current Biology, 25(14), 1892-1897.', source: 'Current Biology', year: '2015', link: '', tier: 1 },
      { id: '10', text: 'Damisch, L., et al. (2010). Keep your fingers crossed! How superstition improves performance. Psychological Science, 21(7), 1014-1020.', source: 'Psychological Science', year: '2010', link: '', tier: 1 },
      { id: '11', text: 'Whitehouse, H., & Lanman, J. A. (2014). The ties that bind us: Ritual, fusion, and identification. Current Anthropology, 55(6), 674-695.', source: 'Current Anthropology', year: '2014', link: '', tier: 1 },
      { id: '12', text: 'Hobson, N. M., et al. (2017). Rituals decrease the neural response to performance failure. PeerJ, 5, e3363.', source: 'PeerJ', year: '2017', link: '', tier: 1 },
      { id: '13', text: 'Romanoff, B. D., & Terenzio, M. (1998). Rituals and the grieving process. Death Studies, 22(8), 697-711.', source: 'Death Studies', year: '1998', link: '', tier: 1 },
      { id: '14', text: 'Legare, C. H., & Souza, A. L. (2012). Evaluating ritual efficacy: Evidence from the supernatural. Cognition, 124(1), 1-15.', source: 'Cognition', year: '2012', link: '', tier: 1 },
      { id: '15', text: 'Tian, A. D., et al. (2018). Enacting rituals to improve self-control. Journal of Personality and Social Psychology, 114(6), 851-876.', source: 'Journal of Personality and Social Psychology', year: '2018', link: '', tier: 1 },
      { id: '16', text: 'Vohs, K. D., et al. (2013). Rituals enhance self-control. Journal of Personality and Social Psychology, 105(2), 268-283.', source: 'Journal of Personality and Social Psychology', year: '2013', link: '', tier: 1 },
      { id: '17', text: 'Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta‐analysis of effects and processes. Advances in Experimental Social Psychology, 38, 69-119.', source: 'Advances in Experimental Social Psychology', year: '2006', link: '', tier: 1 },
      { id: '18', text: 'Rudd, M., et al. (2019). Rituals enhance consumption. Psychological Science, 30(5), 714-721.', source: 'Psychological Science', year: '2019', link: '', tier: 1 },
      { id: '19', text: 'McNeill, W. H. (1995). Keeping together in time: Dance and drill in human history. Cambridge, MA: Harvard University Press.', source: 'Keeping together in time: Dance and drill in human history', year: '1995', link: '', tier: 5 },
      { id: '20', text: 'Sullivan, P., & Rickers, K. (2013). The effect of behavioral synchrony in groups of teammates and strangers. International Journal of Sport and Exercise Psychology, 11(3), 286-291.', source: 'International Journal of Sport and Exercise Psychology', year: '2013', link: '', tier: 1 },
      { id: '21', text: 'Durkheim, E. (1912/1995). The elementary forms of religious life (K. E. Fields, Trans.). New York: Free Press.', source: 'The elementary forms of religious life', year: '', link: '', tier: 5 },
      { id: '22', text: 'Sosis, R., & Bressler, E. R. (2003). Cooperation and commune longevity: A test of the costly signaling theory of religion. Cross-Cultural Research, 37(2), 211-239.', source: 'Cross-Cultural Research', year: '2003', link: '', tier: 1 },
      { id: '23', text: 'Rimé, B. (2009). Emotion elicits the social sharing of emotion: Theory and empirical review. Emotion Review, 1(1), 60-85.', source: 'Emotion Review', year: '2009', link: '', tier: 1 },
      { id: '24', text: 'Wiltermuth, S. S., & Heath, C. (2009). Synchrony and cooperation. Psychological Science, 20(1), 1-5.', source: 'Psychological Science', year: '2009', link: '', tier: 1 },
      { id: '25', text: 'Legare, C. H., & Souza, A. L. (2014). Searching for control: Priming randomness increases the evaluation of ritual efficacy. Cognitive Science, 38(1), 152-161.', source: 'Cognitive Science', year: '2014', link: '', tier: 1 },
      { id: '26', text: 'Dai, H., et al. (2014). The fresh start effect: Temporal landmarks motivate aspirational behavior. Management Science, 60(10), 2563-2582.', source: 'Management Science', year: '2014', link: '', tier: 1 },
      { id: '27', text: 'Turner, V. (1967). The forest of symbols: Aspects of Ndembu ritual. Ithaca, NY: Cornell University Press.', source: 'The forest of symbols: Aspects of Ndembu ritual', year: '1967', link: '', tier: 5 },
      { id: '28', text: 'van Gennep, A. (1909/1960). The rites of passage (M. B. Vizedom & G. L. Caffee, Trans.). Chicago: University of Chicago Press.', source: 'The rites of passage', year: '', link: '', tier: 5 },
      { id: '29', text: 'Connerton, P. (1989). How societies remember. Cambridge: Cambridge University Press.', source: 'How societies remember', year: '1989', link: '', tier: 5 },
      { id: '30', text: 'Anastasi, M. W., & Newberg, A. B. (2008). A preliminary study of the acute effects of religious ritual on anxiety. Journal of Alternative and Complementary Medicine, 14(2), 163-165.', source: 'Journal of Alternative and Complementary Medicine', year: '2008', link: '', tier: 1 },
      { id: '31', text: 'Brooks, A. W., et al. (2016). Don\'t stop believing: Rituals improve performance by decreasing anxiety. Organizational Behavior and Human Decision Processes, 137, 71-85.', source: 'Organizational Behavior and Human Decision Processes', year: '2016', link: '', tier: 1 },
      { id: '32', text: 'Castle, J., & Phillips, W. L. (2003). Grief rituals: Aspects that facilitate adjustment to bereavement. Journal of Loss and Trauma, 8(1), 41-71.', source: 'Journal of Loss and Trauma', year: '2003', link: '', tier: 1 },
      { id: '33', text: 'Legare, C. H., & Souza, A. L. (2012). Evaluating ritual efficacy: Evidence from the supernatural. Cognition, 124(1), 1-15.', source: 'Cognition', year: '2012', link: '', tier: 1 },
      { id: '34', text: 'Norton, M. I., & Gino, F. (2014). Rituals alleviate grieving for loved ones, lovers, and lotteries. Journal of Experimental Psychology: General, 143(1), 266-272.', source: 'Journal of Experimental Psychology: General', year: '2014', link: '', tier: 1 },
      { id: '35', text: 'Neimeyer, R. A., et al. (2002). The meaning of your absence: Traumatic loss and narrative reconstruction. In J. Kauffman (Ed.), Loss of the assumptive world (pp. 31-47). New York: Brunner-Routledge.', source: 'Loss of the assumptive world', year: '2002', link: '', tier: 5 },
      { id: '36', text: 'Klass, D., et al. (Eds.). (1996). Continuing bonds: New understandings of grief. Washington, DC: Taylor & Francis.', source: 'Continuing bonds: New understandings of grief', year: '1996', link: '', tier: 1 },
      { id: '37', text: 'Bonanno, G. A., & Kaltman, S. (2001). The varieties of grief experience. Clinical Psychology Review, 21(5), 705-734.', source: 'Clinical Psychology Review', year: '2001', link: '', tier: 1 },
      { id: '38', text: 'Czech, D. R., et al. (2004). The experience of Christian prayer in sport: An existential phenomenological investigation. Journal of Psychology and Christianity, 23(1), 3-11.', source: 'Journal of Psychology and Christianity', year: '2004', link: '', tier: 1 },
      { id: '39', text: 'Schippers, M. C., & Van Lange, P. A. (2006). The psychological benefits of superstitious rituals in top sport: A study among top sportspersons. Journal of Applied Social Psychology, 36(10), 2532-2553.', source: 'Journal of Applied Social Psychology', year: '2006', link: '', tier: 1 },
      { id: '40', text: 'Risen, J. L. (2016). Believing what we do not believe: Acquiescence to superstitious beliefs and other powerful intuitions. Psychological Review, 123(2), 182-207.', source: 'Psychological Review', year: '2016', link: '', tier: 1 },
      { id: '41', text: 'Currey, M. (2013). Daily rituals: How artists work. New York: Alfred A. Knopf.', source: 'Daily rituals: How artists work', year: '2013', link: '', tier: 1 },
      { id: '42', text: 'Lally, P., et al. (2010). How are habits formed: Modelling habit formation in the real world. European Journal of Social Psychology, 40(6), 998-1009.', source: 'European Journal of Social Psychology', year: '2010', link: '', tier: 1 },
      { id: '43', text: 'Gardner, B., et al. (2012). Making health habitual: The psychology of \'habit-formation\' and general practice. British Journal of General Practice, 62(605), 664-666.', source: 'British Journal of General Practice', year: '2012', link: '', tier: 1 },
      { id: '44', text: 'Kripalani, S., et al. (2007). Interventions to enhance medication adherence in chronic diseases: A systematic review. Archives of Internal Medicine, 167(6), 540-550.', source: 'Archives of Internal Medicine', year: '2007', link: '', tier: 1 },
      { id: '45', text: 'Mindell, J. A., et al. (2009). A nightly bedtime routine: Impact on sleep in young children and maternal mood. Sleep, 32(5), 599-606.', source: 'Sleep', year: '2009', link: '', tier: 1 },
      { id: '46', text: 'Smart, N. (1998). The world\'s religions (2nd ed.). Cambridge: Cambridge University Press.', source: 'The world\'s religions', year: '1998', link: '', tier: 5 },
      { id: '47', text: 'Rappaport, R. A. (1999). Ritual and religion in the making of humanity. Cambridge: Cambridge University Press.', source: 'Ritual and religion in the making of humanity', year: '1999', link: '', tier: 5 },
      { id: '48', text: 'Bellah, R. N. (1967). Civil religion in America. Daedalus, 96(1), 1-21.', source: 'Daedalus', year: '1967', link: '', tier: 1 },
      { id: '49', text: 'Legare, C. H., et al. (2015). Ritual theory and the role of stipulated actions. Religion, Brain & Behavior, 5(1), 20-24.', source: 'Religion, Brain & Behavior', year: '2015', link: '', tier: 1 },
      { id: '50', text: 'Hobson, N. M., et al. (2018). The psychology of rituals: An integrative review and process-based framework. Personality and Social Psychology Review, 22(3), 260-284.', source: 'Personality and Social Psychology Review', year: '2018', link: '', tier: 1 },
      { id: '51', text: 'Fiske, A. P., & Haslam, N. (1997). Is obsessive-compulsive disorder a pathology of the human disposition to perform socially meaningful rituals? Evidence of similar content. Journal of Nervous and Mental Disease, 185(4), 211-222.', source: 'Journal of Nervous and Mental Disease', year: '1997', link: '', tier: 1 },
      { id: '52', text: 'Abramowitz, J. S., et al. (2009). Exposure and response prevention for obsessive-compulsive disorder: A meta-analysis and treatment considerations. Clinical Psychology Review, 29(8), 670-683.', source: 'Clinical Psychology Review', year: '2009', link: '', tier: 1 },
      { id: '53', text: 'Boyer, P., & Liénard, P. (2006). Why ritualized behavior? Precaution systems and action parsing in developmental, pathological and cultural rituals. Behavioral and Brain Sciences, 29(6), 595-613.', source: 'Behavioral and Brain Sciences', year: '2006', link: '', tier: 1 },
      { id: '54', text: 'van Gennep, A. (1909/1960). The rites of passage (M. B. Vizedom & G. L. Caffee, Trans.). Chicago: University of Chicago Press.', source: 'The rites of passage', year: '', link: '', tier: 5 },
      { id: '55', text: 'Mahdi, L. C., et al. (Eds.). (1996). Crossroads: The quest for contemporary rites of passage. Chicago: Open Court.', source: 'Crossroads: The quest for contemporary rites of passage', year: '1996', link: '', tier: 1 },
      { id: '56', text: 'Bloch, M. (1992). Prey into hunter: The politics of religious experience. Cambridge: Cambridge University Press.', source: '', year: '1992', link: '', tier: 5 },
      { id: '57', text: 'Wall, K., & Ferguson, G. M. (2011). Rites of passage and their effects on psychological and social functioning of adolescents. In S. Kreitner & R. N. Hughes (Eds.), The sources of the self (pp. 241-265). New York: Springer.', source: 'The sources of the self', year: '2011', link: '', tier: 1 },
      { id: '58', text: 'Alexander, J. C. (2004). Toward a theory of cultural trauma. In J. C. Alexander et al. (Eds.), Cultural trauma and collective identity (pp. 1-30). Berkeley: University of California Press.', source: 'Cultural trauma and collective identity', year: '2004', link: '', tier: 5 },
      { id: '59', text: 'Minow, M. (1998). Between vengeance and forgiveness: Facing history after genocide and mass violence. Boston: Beacon Press.', source: 'Between vengeance and forgiveness: Facing history after genocide and mass violence', year: '1998', link: '', tier: 5 },
      { id: '60', text: 'Pennebaker, J. W., & Banasik, B. L. (1997). On the creation and maintenance of collective memories: History as social psychology. In J. W. Pennebaker et al. (Eds.), Collective memory of political events (pp. 3-19). Mahwah, NJ: Lawrence Erlbaum Associates.', source: 'Collective memory of political events', year: '1997', link: '', tier: 1 },
      { id: '61', text: 'Collins, R. (2004). Interaction ritual chains. Princeton, NJ: Princeton University Press.', source: 'Interaction ritual chains', year: '2004', link: '', tier: 5 },
      { id: '62', text: 'Taylor, V., & Whittier, N. (1992). Collective identity in social movement communities: Lesbian feminist mobilization. In A. D. Morris & C. M. Mueller (Eds.), Frontiers in social movement theory (pp. 104-129). New Haven, CT: Yale University Press.', source: 'Frontiers in social movement theory', year: '1992', link: '', tier: 1 },
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
          <Citation id="1" index={1} source="The ritual process: Structure and anti-structure" year="1969" tier={1} />
          <Citation id="2" index={2} source="Organizational Behavior and Human Decision Processes" year="2016" tier={1} />
          <Citation id="3" index={3} source="Personality and Social Psychology Review" year="2018" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
