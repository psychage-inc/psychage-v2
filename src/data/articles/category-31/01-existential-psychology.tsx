
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SPIRITUALITY_MEANING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Existential Psychology | Articles 1–4
// ============================================================================

export const existentialPsychologyArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-SPR-007 | Existential Crisis: What Triggers It and How to Navigate Thr
  // --------------------------------------------------------------------------
  {
    id: catId(1),
    slug: 'existential-crisis',
    title: 'Existential Crisis: What Triggers It and How to Navigate Through',
    description: 'Understanding existential crisis—what triggers it, why it happens, and evidence-based strategies for navigating periods of profound questioning.',
    image: '/images/articles/cat31/cover-001.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 11,
    publishedAt: '2026-03-28',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['existential crisis', 'meaning', 'purpose', 'existential psychology', 'Viktor Frankl'],

    summary: 'An existential crisis occurs when you confront fundamental questions about your existence, purpose, freedom, or mortality—questions that challenge your previous understanding of yourself and the world. Research shows these periods are developmentally common, particularly during major life transitions, and can lead to personal growth when navigated with support. While distressing, an existential crisis isn\'t a mental illness but rather a psychological turning point that invites deeper reflection on what makes life meaningful.',

    keyFacts: [

    ],

    sparkMoment: 'An existential crisis is your psyche\'s way of saying, "The story you\'ve been telling yourself about who you are and why you\'re here doesn\'t fit anymore." That\'s terrifying. It\'s also an invitation to write a better story—one that\'s more true to who you\'re becoming.',

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
      { id: '1', text: 'Bauer, J. J., & McAdams, D. P. (2004). Personal growth in adults\' stories of life transitions. Journal of Personality, 72(3), 573-602. https://doi.org/10.1111/j.0022-3506.2004.00273.x', source: 'Journal of Personality, 72', year: '2004', link: '', tier: 1 },
      { id: '2', text: 'May, R. (1950). The Meaning of Anxiety. New York: Ronald Press.', source: 'The Meaning of Anxiety', year: '1950', link: '', tier: 5 },
      { id: '3', text: 'Frankl, V. E. (1946/2006). Man\'s Search for Meaning. Boston: Beacon Press.', source: 'Man\'s Search for Meaning', year: '', link: '', tier: 5 },
      { id: '4', text: 'Andrews-Hanna, J. R., Smallwood, J., & Spreng, R. N. (2014). The default network and self-generated thought: component processes, dynamic control, and clinical relevance. Annals of the New York Academy of Sciences, 1316(1), 29-52. https://doi.org/10.1111/nyas.12360', source: 'Annals of the New York Academy of Sciences, 1316', year: '2014', link: '', tier: 1 },
      { id: '5', text: 'Steger, M. F., Shim, Y., Rush, B. R., Brueske, L. A., Shin, J. Y., & Merriman, L. A. (2019). The mind\'s eye: A photographic method of assessing meaning in life. Journal of Positive Psychology, 14(3), 373-384.', source: 'Journal of Positive Psychology, 14', year: '2019', link: '', tier: 1 },
      { id: '6', text: 'Wong, P. T. P. (2010). Meaning therapy: An integrative and positive existential psychotherapy. Journal of Contemporary Psychotherapy, 40(2), 85-93. https://doi.org/10.1007/s10879-009-9132-6', source: 'Journal of Contemporary Psychotherapy, 40', year: '2010', link: '', tier: 1 },
      { id: '7', text: 'Vos, J., Craig, M., & Cooper, M. (2015). Existential therapies: A meta-analysis of their effects on psychological outcomes. Journal of Consulting and Clinical Psychology, 83(1), 115-128. https://doi.org/10.1037/a0037167', source: 'Journal of Consulting and Clinical Psychology, 83', year: '2015', link: '', tier: 1 },
      { id: '8', text: 'Erikson, E. H. (1950). Childhood and Society. New York: W. W. Norton & Company.', source: 'Childhood and Society', year: '1950', link: '', tier: 3 },
      { id: '9', text: 'Greenberg, J., Pyszczynski, T., & Solomon, S. (1986). The causes and consequences of a need for self-esteem: A terror management theory. Public Self and Private Self, 189-212. New York: Springer.', source: 'Public Self and Private Self', year: '1986', link: '', tier: 5 },
      { id: '10', text: 'Ben-Shahar, T. (2007). Happier: Learn the Secrets to Daily Joy and Lasting Fulfillment. New York: McGraw-Hill.', source: 'Happier: Learn the Secrets to Daily Joy and Lasting Fulfillment', year: '2007', link: '', tier: 5 },
      { id: '11', text: 'Streib, H., Hood, R. W., Keller, B., Csöff, R. M., & Silver, C. F. (2009). Deconversion: Qualitative and Quantitative Results from Cross-Cultural Research in Germany and the United States of America. Göttingen: Vandenhoeck & Ruprecht.', source: 'Deconversion: Qualitative and Quantitative Results from Cross-Cultural Research in Germany and the United States of America', year: '2009', link: '', tier: 1 },
      { id: '12', text: 'Baumeister, R. F., & Leary, M. R. (1995). The need to belong: desire for interpersonal attachments as a fundamental human motivation. Psychological Bulletin, 117(3), 497-529. https://doi.org/10.1037/0033-2909.117.3.497', source: 'Psychological Bulletin, 117', year: '1995', link: '', tier: 1 },
      { id: '13', text: 'Watkins, E. R. (2008). Constructive and unconstructive repetitive thought. Psychological Bulletin, 134(2), 163-206. https://doi.org/10.1037/0033-2909.134.2.163', source: 'Psychological Bulletin, 134', year: '2008', link: '', tier: 1 },
      { id: '14', text: 'Tedeschi, R. G., & Calhoun, L. G. (2004). Posttraumatic growth: Conceptual foundations and empirical evidence. Psychological Inquiry, 15(1), 1-18. https://doi.org/10.1207/s15327965pli1501_01', source: 'Psychological Inquiry, 15', year: '2004', link: '', tier: 1 },
      { id: '15', text: 'Hayes, S. C., Strosahl, K. D., & Wilson, K. G. (2011). Acceptance and Commitment Therapy: The Process and Practice of Mindful Change (2nd ed.). New York: Guilford Press.', source: 'Acceptance and Commitment Therapy: The Process and Practice of Mindful Change', year: '2011', link: '', tier: 5 },
      { id: '16', text: 'Stellar, J. E., Gordon, A., Anderson, C. L., Piff, P. K., McNeil, G. D., & Keltner, D. (2018). Awe and humility. Journal of Personality and Social Psychology, 114(2), 258-269. https://doi.org/10.1037/pspi0000109', source: 'Journal of Personality and Social Psychology, 114', year: '2018', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            An existential crisis occurs when you confront fundamental questions about your existence, purpose, freedom, or mortality—questions that challenge your previous understanding of yourself and the world. Research shows these periods are developmentally common, particularly during major life transitions, and can lead to personal growth when navigated with support.
          </p>
        </div>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Journal of Personality, 72" year="2004" tier={1} />
          <Citation id="2" index={2} source="The Meaning of Anxiety" year="1950" tier={5} />
          <Citation id="3" index={3} source="Man\'s Search for Meaning" year="" tier={5} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-SPR-008 | Legacy and Generativity: Finding Purpose Through What You Le
  // --------------------------------------------------------------------------
  {
    id: catId(2),
    slug: 'legacy-and-generativity',
    title: 'Legacy and Generativity: Finding Purpose Through What You Leave Behind',
    description: 'Exploring generativity—the drive to create lasting contributions—and how focusing on legacy can provide meaning and improve psychological wellbeing.',
    image: '/images/articles/cat31/cover-002.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 10,
    publishedAt: '2026-03-28',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['generativity', 'legacy', 'Erik Erikson', 'meaning', 'purpose'],

    summary: 'Generativity—the concern for establishing and guiding the next generation—is a core developmental stage identified by Erik Erikson that typically emerges in midlife but can appear across the lifespan. Research shows that people who engage in generative activities (mentoring, creating, contributing to their communities) report higher life satisfaction, lower depression, and greater sense of purpose. Legacy work isn\'t about fame or immortality—it\'s about the fundamental human need to feel that your life has contributed something meaningful that will outlast you.',

    keyFacts: [

    ],

    sparkMoment: 'Legacy isn\'t what you leave after you die. It\'s what you\'re creating right now through every conversation, every piece of work, every moment of care you offer. You\'re not building a monument—you\'re planting seeds you may never see bloom. That\'s the point.',

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
      { id: '1', text: 'Erikson, E. H. (1950). Childhood and Society. New York: W. W. Norton & Company.', source: 'Childhood and Society', year: '1950', link: '', tier: 3 },
      { id: '2', text: 'Gruenewald, T. L., Liao, D. H., & Seeman, T. E. (2020). Generativity and biomarkers of physical health in older adults. Psychology and Aging, 35(3), 401-411. https://doi.org/10.1037/pag0000381', source: 'Psychology and Aging, 35', year: '2020', link: '', tier: 1 },
      { id: '3', text: 'McAdams, D. P., & de St. Aubin, E. (1992). A theory of generativity and its assessment through self-report, behavioral acts, and narrative themes in autobiography. Journal of Personality and Social Psychology, 62(6), 1003-1015. https://doi.org/10.1037/0022-3514.62.6.1003', source: 'Journal of Personality and Social Psychology, 62', year: '1992', link: '', tier: 1 },
      { id: '4', text: 'Maxfield, M., Pyszczynski, T., Kluck, B., Cox, C. R., Greenberg, J., Solomon, S., & Weise, D. (2007). Age-related differences in responses to thoughts of one\'s own death: Mortality salience and judgments of moral transgressions. Psychology and Aging, 22(2), 341-353. https://doi.org/10.1037/0882-7974.22.2.341', source: 'Psychology and Aging, 22', year: '2007', link: '', tier: 1 },
      { id: '5', text: 'Butler, R. N. (1963). The life review: An interpretation of reminiscence in the aged. Psychiatry, 26(1), 65-76. https://doi.org/10.1080/00332747.1963.11023339', source: 'Psychiatry, 26', year: '1963', link: '', tier: 1 },
      { id: '6', text: 'Warburton, J., McLaughlin, D., & Pinsker, D. (2006). Generative acts: Family and community involvement of older Australians. International Journal of Aging and Human Development, 63(2), 115-137. https://doi.org/10.2190/9TE3-T1VN-JWVG-381C', source: 'International Journal of Aging and Human Development, 63', year: '2006', link: '', tier: 1 },
      { id: '7', text: 'Lifton, R. J. (1979). The Broken Connection: On Death and the Continuity of Life. New York: Simon & Schuster.', source: 'The Broken Connection: On Death and the Continuity of Life', year: '1979', link: '', tier: 1 },
      { id: '8', text: 'McAdams, D. P., Reynolds, J., Lewis, M., Patten, A. H., & Bowman, P. J. (2001). When bad things turn good and good things turn bad: Sequences of redemption and contamination in life narrative and their relation to psychosocial adaptation in midlife adults and in students. Personality and Social Psychology Bulletin, 27(4), 474-485. https://doi.org/10.1177/0146167201274008', source: 'Personality and Social Psychology Bulletin, 27', year: '2001', link: '', tier: 1 },
      { id: '9', text: 'Baines, B. K. (2006). Ethical Wills: Putting Your Values on Paper (2nd ed.). Cambridge, MA: Perseus Books.', source: 'Ethical Wills: Putting Your Values on Paper', year: '2006', link: '', tier: 5 },
      { id: '10', text: 'Kram, K. E. (1985). Mentoring at Work: Developmental Relationships in Organizational Life. Glenview, IL: Scott Foresman.', source: 'Mentoring at Work: Developmental Relationships in Organizational Life', year: '1985', link: '', tier: 1 },
      { id: '11', text: 'Thoits, P. A., & Hewitt, L. N. (2001). Volunteer work and well-being. Journal of Health and Social Behavior, 42(2), 115-131. https://doi.org/10.2307/3090173', source: 'Journal of Health and Social Behavior, 42', year: '2001', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Generativity—the concern for establishing and guiding the next generation—is a core developmental stage identified by Erik Erikson that typically emerges in midlife but can appear across the lifespan. Research shows that people who engage in generative activities (mentoring, creating, contributing to their communities) report higher life satisfaction, lower depression, and greater sense of purpose.
          </p>
        </div>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Childhood and Society" year="1950" tier={3} />
          <Citation id="2" index={2} source="Psychology and Aging, 35" year="2020" tier={1} />
          <Citation id="3" index={3} source="Journal of Personality and Social Psychology, 62" year="1992" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-SPR-009 | The Psychology of Regret: Making Peace With Roads Not Taken
  // --------------------------------------------------------------------------
  {
    id: catId(3),
    slug: 'psychology-of-regret',
    title: 'The Psychology of Regret: Making Peace With Roads Not Taken',
    description: 'Understanding why regret happens, how it affects mental health, and evidence-based strategies for processing regret without getting stuck in rumination.',
    image: '/images/articles/cat31/cover-003.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 12,
    publishedAt: '2026-03-28',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['regret', 'rumination', 'counterfactual thinking', 'self-compassion', 'decision-making'],

    summary: 'Regret is the painful feeling that arises when we believe a different choice would have led to a better outcome. Research shows regret is universal—95% of people report at least one major life regret—and serves an adaptive function when it motivates learning and course correction. However, chronic regret can fuel rumination, depression, and decision paralysis. The key to healthy regret processing is balancing acknowledgment of what you wish you\'d done differently with self-compassion and forward-focused action. You can\'t undo the past, but you can extract wisdom from it and choose differently now.',

    keyFacts: [

    ],

    sparkMoment: 'Regret means you\'re capable of imagining a better version of yourself and your life. That\'s not a character flaw—it\'s evidence of growth. The person you are now sees things the person you were then couldn\'t see yet. Honor the distance you\'ve traveled.',

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
      { id: '1', text: 'Roese, N. J., & Summerville, A. (2005). What we regret most… and why. Personality and Social Psychology Bulletin, 31(9), 1273-1285. https://doi.org/10.1177/0146167205274693', source: 'Personality and Social Psychology Bulletin, 31', year: '2005', link: '', tier: 1 },
      { id: '2', text: 'Gilovich, T., & Medvec, V. H. (1995). The experience of regret: What, when, and why. Psychological Review, 102(2), 379-395. https://doi.org/10.1037/0033-295X.102.2.379', source: 'Psychological Review, 102', year: '1995', link: '', tier: 1 },
      { id: '3', text: 'Morrison, M., & Roese, N. J. (2011). Regrets of the typical American: Findings from a nationally representative sample. Social Psychological and Personality Science, 2(6), 576-583. https://doi.org/10.1177/1948550611401756', source: 'Social Psychological and Personality Science, 2', year: '2011', link: '', tier: 1 },
      { id: '4', text: 'Roese, N. J. (1997). Counterfactual thinking. Psychological Bulletin, 121(1), 133-148. https://doi.org/10.1037/0033-2909.121.1.133', source: 'Psychological Bulletin, 121', year: '1997', link: '', tier: 1 },
      { id: '5', text: 'Neff, K. D., & Germer, C. K. (2013). A pilot study and randomized controlled trial of the mindful self-compassion program. Journal of Clinical Psychology, 69(1), 28-44. https://doi.org/10.1002/jclp.21923', source: 'Journal of Clinical Psychology, 69', year: '2013', link: '', tier: 1 },
      { id: '6', text: 'Pink, D. H. (2022). The Power of Regret: How Looking Backward Moves Us Forward. New York: Riverhead Books.', source: 'The Power of Regret: How Looking Backward Moves Us Forward', year: '2022', link: '', tier: 5 },
      { id: '7', text: 'Landman, J. (1993). Regret: The Persistence of the Possible. New York: Oxford University Press.', source: 'Regret: The Persistence of the Possible', year: '1993', link: '', tier: 5 },
      { id: '8', text: 'Ware, B. (2012). The Top Five Regrets of the Dying: A Life Transformed by the Dearly Departing. Carlsbad, CA: Hay House.', source: 'The Top Five Regrets of the Dying: A Life Transformed by the Dearly Departing', year: '2012', link: '', tier: 1 },
      { id: '9', text: 'Zeelenberg, M., van Dijk, W. W., Manstead, A. S. R., & van der Pligt, J. (2000). On bad decisions and disconfirmed expectancies: The psychology of regret and disappointment. Cognition and Emotion, 14(4), 521-541. https://doi.org/10.1080/026999300402781', source: 'Cognition and Emotion, 14', year: '2000', link: '', tier: 1 },
      { id: '10', text: 'Nolen-Hoeksema, S. (1991). Responses to depression and their effects on the duration of depressive episodes. Journal of Abnormal Psychology, 100(4), 569-582. https://doi.org/10.1037/0021-843X.100.4.569', source: 'Journal of Abnormal Psychology, 100', year: '1991', link: '', tier: 1 },
      { id: '11', text: 'Thomsen, D. K. (2006). The association between rumination and negative affect: A review. Cognition and Emotion, 20(8), 1216-1235. https://doi.org/10.1080/02699930500473533', source: 'Cognition and Emotion, 20', year: '2006', link: '', tier: 1 },
      { id: '12', text: 'Schwartz, B. (2004). The Paradox of Choice: Why More Is Less. New York: Ecco.', source: 'The Paradox of Choice: Why More Is Less', year: '2004', link: '', tier: 1 },
      { id: '13', text: 'Lecci, L., Okun, M. A., & Karoly, P. (1994). Life regrets and current goals as predictors of psychological adjustment. Journal of Personality and Social Psychology, 66(4), 731-741. https://doi.org/10.1037/0022-3514.66.4.731', source: 'Journal of Personality and Social Psychology, 66', year: '1994', link: '', tier: 1 },
      { id: '14', text: 'Gross, J. J., & John, O. P. (2003). Individual differences in two emotion regulation processes: Implications for affect, relationships, and well-being. Journal of Personality and Social Psychology, 85(2), 348-362. https://doi.org/10.1037/0022-3514.85.2.348', source: 'Journal of Personality and Social Psychology, 85', year: '2003', link: '', tier: 1 },
      { id: '15', text: 'Exline, J. J., Root, B. L., Yadavalli, S., Martin, A. M., & Fisher, M. L. (2011). Reparative behaviors and self-forgiveness: Effects of a laboratory-based exercise. Self and Identity, 10(1), 101-126. https://doi.org/10.1080/15298861003669565', source: 'Self and Identity, 10', year: '2011', link: '', tier: 1 },
      { id: '16', text: 'White, M., & Epston, D. (1990). Narrative Means to Therapeutic Ends. New York: W. W. Norton.', source: 'Narrative Means to Therapeutic Ends', year: '1990', link: '', tier: 1 },
      { id: '17', text: 'Welch, S. (2009). 10-10-10: A Life-Transforming Idea. New York: Scribner.', source: '10-10-10: A Life-Transforming Idea', year: '2009', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Regret is the painful feeling that arises when we believe a different choice would have led to a better outcome. Research shows regret is universal—95% of people report at least one major life regret—and serves an adaptive function when it motivates learning and course correction.
          </p>
        </div>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Personality and Social Psychology Bulletin, 31" year="2005" tier={1} />
          <Citation id="2" index={2} source="Psychological Review, 102" year="1995" tier={1} />
          <Citation id="3" index={3} source="Social Psychological and Personality Science, 2" year="2011" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-SPR-010 | Authenticity and Mental Health: The Cost of Living Incongrue
  // --------------------------------------------------------------------------
  {
    id: catId(4),
    slug: 'authenticity-mental-health',
    title: 'Authenticity and Mental Health: The Cost of Living Incongruently',
    description: 'Understanding authenticity, why living incongruently with your values harms mental health, and evidence-based approaches to living more authentically.',
    image: '/images/articles/cat31/cover-004.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 12,
    publishedAt: '2026-03-28',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['authenticity', 'congruence', 'self-concept', 'values', 'existential psychology'],

    summary: 'Authenticity means living in alignment with your core values, beliefs, and sense of self rather than conforming to external expectations or wearing masks to gain approval. Research consistently shows that people who report living authentically experience lower rates of depression and anxiety, higher life satisfaction, and stronger relationships. Conversely, chronic inauthenticity—what psychologist Carl Rogers called "incongruence"—creates psychological distress by forcing you to maintain a gap between who you are and who you present yourself to be. The path to authenticity isn\'t about radical self-disclosure or rejecting all social norms; it\'s about identifying what matters to you and finding ways to honor that in your daily choices.',

    keyFacts: [

    ],

    sparkMoment: 'The version of you that everyone loves might be a performance. The version of you that someone loves after seeing the mess, the doubt, the parts you usually hide—that\'s connection. Authenticity isn\'t about being perfect. It\'s about being real enough to be loved for who you are, not who you pretend to be.',

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
      { id: '1', text: 'Rogers, C. R. (1959). A theory of therapy, personality and interpersonal relationships as developed in the client-centered framework. In S. Koch (Ed.), Psychology: A Study of a Science (Vol. 3, pp. 184-256). New York: McGraw-Hill.', source: 'Psychology: A Study of a Science', year: '1959', link: '', tier: 1 },
      { id: '2', text: 'Sutton, A. (2020). Living the good life: A meta-analysis of authenticity, well-being and engagement. Personality and Individual Differences, 153, 109645. https://doi.org/10.1016/j.paid.2019.109645', source: 'Personality and Individual Differences, 153', year: '2020', link: '', tier: 1 },
      { id: '3', text: 'Grandey, A. A. (2003). When "the show must go on": Surface acting and deep acting as determinants of emotional exhaustion and peer-rated service delivery. Academy of Management Journal, 46(1), 86-96. https://doi.org/10.5465/30040678', source: 'Academy of Management Journal, 46', year: '2003', link: '', tier: 1 },
      { id: '4', text: 'Schlegel, R. J., Hicks, J. A., King, L. A., & Arndt, J. (2011). Feeling like you know who you are: Perceived true self-knowledge and meaning in life. Personality and Social Psychology Bulletin, 37(6), 745-756. https://doi.org/10.1177/0146167211400424', source: 'Personality and Social Psychology Bulletin, 37', year: '2011', link: '', tier: 1 },
      { id: '5', text: 'Meyer, I. H. (2003). Prejudice, social stress, and mental health in lesbian, gay, and bisexual populations: Conceptual issues and research evidence. Psychological Bulletin, 129(5), 674-697. https://doi.org/10.1037/0033-2909.129.5.674', source: 'Psychological Bulletin, 129', year: '2003', link: '', tier: 1 },
      { id: '6', text: 'Sartre, J. P. (1943/1956). Being and Nothingness: An Essay on Phenomenological Ontology (H. E. Barnes, Trans.). New York: Philosophical Library.', source: 'Being and Nothingness: An Essay on Phenomenological Ontology', year: '', link: '', tier: 1 },
      { id: '7', text: 'Kernis, M. H., & Goldman, B. M. (2006). A multicomponent conceptualization of authenticity: Theory and research. Advances in Experimental Social Psychology, 38, 283-357. https://doi.org/10.1016/S0065-2601(06)38006-9', source: 'Advances in Experimental Social Psychology, 38', year: '2006', link: '', tier: 1 },
      { id: '8', text: 'Hochschild, A. R. (1983). The Managed Heart: Commercialization of Human Feeling. Berkeley: University of California Press.', source: 'The Managed Heart: Commercialization of Human Feeling', year: '1983', link: '', tier: 5 },
      { id: '9', text: 'Jourard, S. M. (1971). The Transparent Self (2nd ed.). New York: Van Nostrand Reinhold.', source: 'The Transparent Self', year: '1971', link: '', tier: 1 },
      { id: '10', text: 'Brunell, A. B., Kernis, M. H., Goldman, B. M., Heppner, W., Davis, P., Cascio, E. V., & Webster, G. D. (2010). Dispositional authenticity and romantic relationship functioning. Personality and Individual Differences, 48(8), 900-905. https://doi.org/10.1016/j.paid.2010.02.018', source: 'Personality and Individual Differences, 48', year: '2010', link: '', tier: 1 },
      { id: '11', text: 'Campbell, J. D., Trapnell, P. D., Heine, S. J., Katz, I. M., Lavallee, L. F., & Lehman, D. R. (1996). Self-concept clarity: Measurement, personality correlates, and cultural boundaries. Journal of Personality and Social Psychology, 70(1), 141-156. https://doi.org/10.1037/0022-3514.70.1.141', source: 'Journal of Personality and Social Psychology, 70', year: '1996', link: '', tier: 1 },
      { id: '12', text: 'Brown, B. (2012). Daring Greatly: How the Courage to Be Vulnerable Transforms the Way We Live, Love, Parent, and Lead. New York: Gotham Books.', source: 'Daring Greatly: How the Courage to Be Vulnerable Transforms the Way We Live, Love, Parent, and Lead', year: '2012', link: '', tier: 5 },
      { id: '13', text: 'Syed, M., & McLean, K. C. (2016). Understanding identity integration: Theoretical, methodological, and applied issues. Journal of Adolescence, 47, 109-118. https://doi.org/10.1016/j.adolescence.2015.09.005', source: 'Journal of Adolescence, 47', year: '2016', link: '', tier: 1 },
      { id: '14', text: 'Schwartz, R. C. (1995). Internal Family Systems Therapy. New York: Guilford Press.', source: 'Internal Family Systems Therapy', year: '1995', link: '', tier: 5 },
      { id: '15', text: 'Hayes, S. C., Strosahl, K. D., & Wilson, K. G. (2011). Acceptance and Commitment Therapy: The Process and Practice of Mindful Change (2nd ed.). New York: Guilford Press.', source: 'Acceptance and Commitment Therapy: The Process and Practice of Mindful Change', year: '2011', link: '', tier: 5 },
      { id: '16', text: 'Fosha, D. (2000). The Transforming Power of Affect: A Model for Accelerated Change. New York: Basic Books.', source: 'The Transforming Power of Affect: A Model for Accelerated Change', year: '2000', link: '', tier: 5 },
      { id: '17', text: 'White, M., & Epston, D. (1990). Narrative Means to Therapeutic Ends. New York: W. W. Norton.', source: 'Narrative Means to Therapeutic Ends', year: '1990', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Authenticity means living in alignment with your core values, beliefs, and sense of self rather than conforming to external expectations or wearing masks to gain approval. Research consistently shows that people who report living authentically experience lower rates of depression and anxiety, higher life satisfaction, and stronger relationships.
          </p>
        </div>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Psychology: A Study of a Science" year="1959" tier={1} />
          <Citation id="2" index={2} source="Personality and Individual Differences, 153" year="2020" tier={1} />
          <Citation id="3" index={3} source="Academy of Management Journal, 46" year="2003" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
