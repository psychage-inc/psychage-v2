
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SPIRITUALITY_MEANING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Existential Questions & Spiritual Practice | Articles 5–6
// ============================================================================

export const existentialQuestionsSpiritualPracticeArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-SPR-053 | Death Anxiety: Understanding and Coping With Fear of Mortali
  // --------------------------------------------------------------------------
  {
    id: catId(5),
    slug: 'death-anxiety',
    title: 'Death Anxiety: Understanding and Coping With Fear of Mortality',
    description: 'Death anxiety—fear and distress about mortality—affects most people to varying degrees. Learn terror management theory, protective factors like meaning and acceptance, and evidence-based strategies for reducing death-related fear.',
    image: '/images/articles/cat31/cover-005.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 9,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Existential Questions & Spiritual Practice', 'Death Anxiety', 'Understanding and Coping With Fear of Mortality'],

    summary: 'Death anxiety is psychological distress related to awareness of mortality—fear of dying, fear of death itself, fear of what comes after, or fear of ceasing to exist. Ernest Becker\'s The Denial of Death and subsequent terror management theory propose that much of human behavior is motivated by managing anxiety about inevitable mortality. While mild death anxiety is universal and potentially adaptive, severe death anxiety can impair functioning and exacerbate depression, anxiety disorders, and existential distress. Protective factors include sense of meaning, spiritual beliefs, secure attachment, and accepting rather than denying mortality. Evidence-based interventions combine cognitive restructuring, exposure, meaning-making, and acceptance-based approaches.',

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
      { id: '561', text: 'https://doi.org/10.1080/07481180701356936 [^2]: Arndt, J., Routledge, C., Cox, C. R., & Goldenberg, J. L. (2005). The worm at the core: A terror management perspective on the roots of psychological dysfunction. Applied and Preventive Psychology, 11(3), 191-213. https://doi.org/10.1016/j.appsy.2005.07.002 [^3]: Kashima, Y., Halloran, M., Yuki, M., & Kashima, E. S. (2004). The effects of personal and collective mortality salience on individualism: Comparing Australians and Japanese with higher and lower self-esteem. Journal of Experimental Social Psychology, 40(3), 384-392. https://doi.org/10.1016/j.jesp.2003.08.002 [^4]: Routledge, C., & Juhl, J. (2010). When death thoughts lead to death fears: Mortality salience increases death anxiety for individuals who lack meaning in life. Cognition and Emotion, 24(5), 848-854. https://doi.org/10.1080/02699930902847144 [^5]: Ray, A., Block, S. D., Friedlander, R. J., Zhang, B., Maciejewski, P. K., & Prigerson, H. G. (2006). Peaceful awareness in patients with advanced cancer. Journal of Palliative Medicine, 9(6), 1359-1368. https://doi.org/10.1089/jpm.2006.9.1359 [^6]: Neimeyer, R. A., Wittkowski, J., & Moser, R. P. (2004). Psychological research on death attitudes: An overview and evaluation. Death Studies, 28(4), 309-340. https://doi.org/10.1080/07481180490432324 [^7]: Becker, E. (1973). The denial of death. Free Press. [^8]: Becker, E. (1975). Escape from evil. Free Press. [^9]: Greenberg, J., Pyszczynski, T., & Solomon, S. (1986). The causes and consequences of a need for self-esteem: A terror management theory. In R. F. Baumeister (Ed.), Public self and private self (pp. 189-212). Springer-Verlag. [^10]: Burke, B. L., Martens, A., & Faucher, E. H. (2010). Two decades of terror management theory: A meta-analysis of mortality salience research. Personality and Social Psychology Review, 14(2), 155-195. https://doi.org/10.1177/1088868309352321 [^11]: Ma-Kellams, C., & Blascovich, J. (2011). Culturally divergent responses to mortality salience. Psychological Science, 22(8), 1019-1024. https://doi.org/10.1177/0956797611413935 [^12]: Iverach, L., Menzies, R. G., & Menzies, R. E. (2014). Death anxiety and its role in psychopathology: Reviewing the status of a transdiagnostic construct. Clinical Psychology Review, 34(7), 580-593. https://doi.org/10.1016/j.cpr.2014.09.002 [^13]: Strachan, E., Schimel, J., Arndt, J., Williams, T., Solomon, S., Pyszczynski, T., & Greenberg, J. (2007). Terror mismanagement: Evidence that mortality salience exacerbates phobic and compulsive behaviors. Personality and Social Psychology Bulletin, 33(8), 1137-1151. https://doi.org/10.1177/0146167207303018 [^14]: Menzies, R. E., & Menzies, R. G. (2020). Death anxiety in the time of COVID-19: Theoretical explanations and clinical implications. The Cognitive Behaviour Therapist, 13, e19. https://doi.org/10.1017/S1754470X20000215 [^15]: Routledge, C., Ostafin, B., Juhl, J., Sedikides, C., Cathey, C., & Liao, J. (2010). Adjusting to death: The effects of mortality salience and self-esteem on psychological well-being, growth motivation, and maladaptive behavior. Journal of Personality and Social Psychology, 99(6), 897-916. https://doi.org/10.1037/a0021431 [^16]: Mikulincer, M., Florian, V., & Hirschberger, G. (2003). The existential function of close relationships: Introducing death into the science of love. Personality and Social Psychology Review, 7(1), 20-40. https://doi.org/10.1207/S15327957PSPR0701_2 [^17]: Erikson, E. H. (1963). Childhood and society (2nd ed.). Norton. [^18]: Van Humbeeck, L., Piers, R., Van Camp, S., Dillen, L., Verhaeghe, S. T., & Van Den Noortgate, N. (2013). Aged parents\' experiences during a critical illness trajectory and after the death of an adult child: A review of the literature. Palliative Medicine, 27(7), 583-595. https://doi.org/10.1177/0269216313483662 [^19]: Furer, P., & Walker, J. R. (2008). Death anxiety: A cognitive-behavioral approach. Journal of Cognitive Psychotherapy, 22(2), 167-182. https://doi.org/10.1891/0889-8391.22.2.167 [^20]: Menzies, R. E., Sharpe, L., & Dar-Nimrod, I. (2019). The relationship between death anxiety and severity of mental illnesses. British Journal of Clinical Psychology, 58(4), 452-467. https://doi.org/10.1111/bjc.12229 [^21]: Yalom, I. D. (2008). Staring at the sun: Overcoming the terror of death. Jossey-Bass. [^22]: Breitbart, W., Rosenfeld, B., Pessin, H., Applebaum, A., Kulikowski, J., & Lichtenthal, W. G. (2015). Meaning-centered group psychotherapy: An effective intervention for improving psychological well-being in patients with advanced cancer. Journal of Clinical Oncology, 33(7), 749-754. https://doi.org/10.1200/JCO.2014.57.2198 [^23]: Chochinov, H. M., Hack, T., Hassard, T., Kristjanson, L. J., McClement, S., & Harlos, M. (2005). Dignity therapy: A novel psychotherapeutic intervention for patients near the end of life. Journal of Clinical Oncology, 23(24), 5520-5525. https://doi.org/10.1200/JCO.2005.08.391 [^24]: Abeyta, A. A., Juhl, J., & Routledge, C. (2014). Exploring the effects of self-esteem and mortality salience on proximal and distally measured death anxiety: A further test of the dual process model of terror management. Motivation and Emotion, 38(4), 523-528. https://doi.org/10.1007/s11031-014-9400-y [^25]: Warren, J. (2004). Facing death: Epicurus and his critics. Oxford University Press. [^26]: Jong, J., Ross, R., Philip, T., Chang, S. H., Simons, N., & Halberstadt, J. (2018). The religious correlates of death anxiety: A systematic review and meta-analysis. Religion, Brain & Behavior, 8(1), 4-20. https://doi.org/10.1080/2153599X.2016.1238844 [^27]: Heidegger, M. (1962). Being and time (J. Macquarrie & E. Robinson, Trans.). Harper & Row. (Original work published 1927) [^28]: Niemiec, C. P., Brown, K. W., Kashdan, T. B., Cozzolino, P. J., Breen, W. E., Levesque-Bristol, C., & Ryan, R. M. (2010). Being present in the face of existential threat: The role of trait mindfulness in reducing defensive responses to mortality salience. Journal of Personality and Social Psychology, 99(2), 344-365. https://doi.org/10.1037/a0019388 [^29]: Chochinov, H. M., Kristjanson, L. J., Breitbart, W., McClement, S., Hack, T. F., Hassard, T., & Harlos, M. (2011). Effect of dignity therapy on distress and end-of-life experience in terminally ill patients: A randomised controlled trial. The Lancet Oncology, 12(8), 753-762. https://doi.org/10.1016/S1470-2045(11)70153-X [^30]: Steger, M. F., Frazier, P., Oishi, S., & Kaler, M. (2006). The meaning in life questionnaire: Assessing the presence of and search for meaning in life. Journal of Counseling Psychology, 53(1), 80-93. https://doi.org/10.1037/0022-0167.53.1.80 [^31]: Furer, P., Walker, J. R., & Stein, M. B. (2007). Treating health anxiety and fear of death: A practitioner\'s guide. Springer.', source: 'Applied and Preventive Psychology', year: '2005', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Death anxiety is psychological distress related to awareness of mortality—fear of dying, fear of death itself, fear of what comes after, or fear of ceasing to exist. Ernest Becker&apos;s The Denial of Death and subsequent terror management theory propose that much of human behavior is motivated by managing anxiety about inevitable mortality.
          </p>
        </div>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="561" index={561} source="Applied and Preventive Psychology" year="2005" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-SPR-055 | Mindfulness: The Practice of Present-Moment Awareness and It
  // --------------------------------------------------------------------------
  {
    id: catId(6),
    slug: 'mindfulness-practice',
    title: 'Mindfulness: The Practice of Present-Moment Awareness and Its Mental Health Benefits',
    description: 'Mindfulness—paying attention to present experience with openness and non-judgment—has robust evidence for reducing anxiety, depression, and stress while improving emotion regulation and wellbeing. Learn the science and practice of mindfulness.',
    image: '/images/articles/cat31/cover-006.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 10,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Existential Questions & Spiritual Practice', 'Mindfulness', 'The Practice of Present', 'Moment Awareness and Its Mental Health Benefits'],

    summary: 'Mindfulness is the practice of intentionally paying attention to present-moment experience with openness, curiosity, and acceptance—without judgment or reactivity. Originating in Buddhist contemplative traditions and adapted for secular contexts by Jon Kabat-Zinn and others, mindfulness has become one of the most researched psychological interventions. Meta-analyses show mindfulness training reduces depression (d = 0.30-0.60), anxiety (d = 0.38-0.63), stress (d = 0.51), and chronic pain (d = 0.33), while improving emotion regulation, attention, and wellbeing. Mindfulness-Based Stress Reduction (MBSR) and Mindfulness-Based Cognitive Therapy (MBCT) are evidence-based programs with demonstrated efficacy. Neuroimaging reveals mindfulness strengthens prefrontal-amygdala regulation, increases insula activation (interoception), and alters default mode network connectivity.',

    keyFacts: [

    ],

    sparkMoment: '',

    practicalExercise: {
      title: 'Morning coffee/tea',
      steps: [
        { title: 'Morning coffee/tea', description: ': Notice aroma, warmth of cup, first taste, swallowing' },
        { title: 'Shower', description: ': Feel water temperature, sound, soap texture, body sensations' },
        { title: 'Commute', description: ': Notice surroundings, body sensations, thoughts arising without getting lost in them' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    },

    citations: [
      { id: '60', text: 'https://doi.org/10.1016/j.cpr.2017.10.011 [^2]: Piet, J., & Hougaard, E. (2011). The effect of mindfulness-based cognitive therapy for prevention of relapse in recurrent major depressive disorder: A systematic review and meta-analysis. Clinical Psychology Review, 31(6), 1032-1040. https://doi.org/10.1016/j.cpr.2011.05.002 [^3]: Hölzel, B. K., Carmody, J., Vangel, M., Congleton, C., Yerramsetti, S. M., Gard, T., & Lazar, S. W. (2011). Mindfulness practice leads to increases in regional brain gray matter density. Psychiatry Research: Neuroimaging, 191(1), 36-43. https://doi.org/10.1016/j.pscychresns.2010.08.006 [^4]: Carmody, J., & Baer, R. A. (2008). Relationships between mindfulness practice and levels of mindfulness, medical and psychological symptoms and well-being in a mindfulness-based stress reduction program. Journal of Behavioral Medicine, 31(1), 23-33. https://doi.org/10.1007/s10865-007-9130-7 [^5]: Parsons, C. E., Crane, C., Parsons, L. J., Fjorback, L. O., & Kuyken, W. (2017). Home practice in Mindfulness-Based Cognitive Therapy and Mindfulness-Based Stress Reduction: A systematic review and meta-analysis of participants\' mindfulness practice and its association with outcomes. Behaviour Research and Therapy, 95, 29-41. https://doi.org/10.1016/j.brat.2017.05.004 [^6]: Kabat-Zinn, J. (1994). Wherever you go, there you are: Mindfulness meditation in everyday life. Hyperion. [^7]: Kabat-Zinn, J. (2013). Full catastrophe living: Using the wisdom of your body and mind to face stress, pain, and illness (Revised edition). Bantam Books. [^8]: Brown, K. W., & Ryan, R. M. (2003). The benefits of being present: Mindfulness and its role in psychological well-being. Journal of Personality and Social Psychology, 84(4), 822-848. https://doi.org/10.1037/0022-3514.84.4.822 [^9]: Hofmann, S. G., Sawyer, A. T., Witt, A. A., & Oh, D. (2010). The effect of mindfulness-based therapy on anxiety and depression: A meta-analytic review. Journal of Consulting and Clinical Psychology, 78(2), 169-183. https://doi.org/10.1037/a0018555 [^10]: Khoury, B., Lecomte, T., Fortin, G., Masse, M., Therien, P., Bouchard, V., ... & Hofmann, S. G. (2013). Mindfulness-based therapy: A comprehensive meta-analysis. Clinical Psychology Review, 33(6), 763-771. https://doi.org/10.1016/j.cpr.2013.05.005 [^11]: Chiesa, A., & Serretti, A. (2009). Mindfulness-based stress reduction for stress management in healthy people: A review and meta-analysis. The Journal of Alternative and Complementary Medicine, 15(5), 593-600. https://doi.org/10.1089/acm.2008.0495 [^12]: Hilton, L., Hempel, S., Ewing, B. A., Apaydin, E., Xenakis, L., Newberry, S., ... & Maglione, M. A. (2017). Mindfulness meditation for chronic pain: Systematic review and meta-analysis. Annals of Behavioral Medicine, 51(2), 199-213. https://doi.org/10.1007/s12160-016-9844-2 [^13]: Lao, S. A., Kissane, D., & Meadows, G. (2016). Cognitive effects of MBSR/MBCT: A systematic review of neuropsychological outcomes. Consciousness and Cognition, 45, 109-123. https://doi.org/10.1016/j.concog.2016.08.017 [^14]: Chambers, R., Gullone, E., & Allen, N. B. (2009). Mindful emotion regulation: An integrative review. Clinical Psychology Review, 29(6), 560-572. https://doi.org/10.1016/j.cpr.2009.06.005 [^15]: Neff, K. D., & Germer, C. K. (2013). A pilot study and randomized controlled trial of the mindful self-compassion program. Journal of Clinical Psychology, 69(1), 28-44. https://doi.org/10.1002/jclp.21923 [^16]: Fresco, D. M., Moore, M. T., van Dulmen, M. H., Segal, Z. V., Ma, S. H., Teasdale, J. D., & Williams, J. M. G. (2007). Initial psychometric properties of the experiences questionnaire: Validation of a self-report measure of decentering. Behavior Therapy, 38(3), 234-246. https://doi.org/10.1016/j.beth.2006.08.003 [^17]: Hayes, S. C., Strosahl, K. D., & Wilson, K. G. (2011). Acceptance and commitment therapy: The process and practice of mindful change (2nd ed.). Guilford Press. [^18]: Jain, S., Shapiro, S. L., Swanick, S., Roesch, S. C., Mills, P. J., Bell, I., & Schwartz, G. E. (2007). A randomized controlled trial of mindfulness meditation versus relaxation training: Effects on distress, positive states of mind, rumination, and distraction. Annals of Behavioral Medicine, 33(1), 11-21. https://doi.org/10.1207/s15324796abm3301_2 [^19]: Farb, N. A., Segal, Z. V., & Anderson, A. K. (2013). Mindfulness meditation training alters cortical representations of interoceptive attention. Social Cognitive and Affective Neuroscience, 8(1), 15-26. https://doi.org/10.1093/scan/nss066 [^20]: Hölzel, B. K., Carmody, J., Vangel, M., Congleton, C., Yerramsetti, S. M., Gard, T., & Lazar, S. W. (2011). Mindfulness practice leads to increases in regional brain gray matter density. Psychiatry Research: Neuroimaging, 191(1), 36-43. https://doi.org/10.1016/j.pscychresns.2010.08.006 [^21]: Lazar, S. W., Kerr, C. E., Wasserman, R. H., Gray, J. R., Greve, D. N., Treadway, M. T., ... & Fischl, B. (2005). Meditation experience is associated with increased cortical thickness. Neuroreport, 16(17), 1893-1897. https://doi.org/10.1097/01.wnr.0000186598.66243.19 [^22]: Farb, N. A., Segal, Z. V., Mayberg, H., Bean, J., McKeon, D., Fatima, Z., & Anderson, A. K. (2007). Attending to the present: Mindfulness meditation reveals distinct neural modes of self-reference. Social Cognitive and Affective Neuroscience, 2(4), 313-322. https://doi.org/10.1093/scan/nsm030 [^23]: Taren, A. A., Gianaros, P. J., Greco, C. M., Lindsay, E. K., Fairgrieve, A., Brown, K. W., ... & Creswell, J. D. (2015). Mindfulness meditation training alters stress-related amygdala resting state functional connectivity: A randomized controlled trial. Social Cognitive and Affective Neuroscience, 10(12), 1758-1768. https://doi.org/10.1093/scan/nsv066 [^24]: Desbordes, G., Negi, L. T., Pace, T. W., Wallace, B. A., Raison, C. L., & Schwartz, E. L. (2012). Effects of mindful-attention and compassion meditation training on amygdala response to emotional stimuli in an ordinary, non-meditative state. Frontiers in Human Neuroscience, 6, 292. https://doi.org/10.3389/fnhum.2012.00292 [^25]: Brewer, J. A., Worhunsky, P. D., Gray, J. R., Tang, Y. Y., Weber, J., & Kober, H. (2011). Meditation experience is associated with differences in default mode network activity and connectivity. Proceedings of the National Academy of Sciences, 108(50), 20254-20259. https://doi.org/10.1073/pnas.1112029108 [^26]: Tang, Y. Y., Hölzel, B. K., & Posner, M. I. (2015). The neuroscience of mindfulness meditation. Nature Reviews Neuroscience, 16(4), 213-225. https://doi.org/10.1038/nrn3916 [^27]: Creswell, J. D., Pacilio, L. E., Lindsay, E. K., & Brown, K. W. (2014). Brief mindfulness meditation training alters psychological and neuroendocrine responses to social evaluative stress. Psychoneuroendocrinology, 44, 1-12. https://doi.org/10.1016/j.psyneuen.2014.02.007 [^28]: Kabat-Zinn, J. (1982). An outpatient program in behavioral medicine for chronic pain patients based on the practice of mindfulness meditation: Theoretical considerations and preliminary results. General Hospital Psychiatry, 4(1), 33-47. https://doi.org/10.1016/0163-8343(82)90026-3 [^29]: Segal, Z. V., Williams, J. M. G., & Teasdale, J. D. (2013). Mindfulness-based cognitive therapy for depression (2nd ed.). Guilford Press. [^30]: Linehan, M. M. (2014). DBT skills training manual (2nd ed.). Guilford Press. [^31]: Hayes, S. C., Luoma, J. B., Bond, F. W., Masuda, A., & Lillis, J. (2006). Acceptance and commitment therapy: Model, processes and outcomes. Behaviour Research and Therapy, 44(1), 1-25. https://doi.org/10.1016/j.brat.2005.06.006 [^32]: Arch, J. J., & Craske, M. G. (2006). Mechanisms of mindfulness: Emotion regulation following a focused breathing induction. Behaviour Research and Therapy, 44(12), 1849-1858. https://doi.org/10.1016/j.brat.2005.12.007 [^33]: Kabat-Zinn, J. (2005). Guided mindfulness meditation practice CDs: Series 1, 2, and 3. Sounds True. [^34]: Tsang, H. W., Fung, K. M., Chan, A. S., Lee, G., & Chan, F. (2006). Effect of a qigong exercise programme on elderly with depression. International Journal of Geriatric Psychiatry, 21(9), 890-897. https://doi.org/10.1002/gps.1582 [^35]: Lutz, A., Slagter, H. A., Dunne, J. D., & Davidson, R. J. (2008). Attention regulation and monitoring in meditation. Trends in Cognitive Sciences, 12(4), 163-169. https://doi.org/10.1016/j.tics.2008.01.005 [^36]: Hofmann, S. G., Grossman, P., & Hinton, D. E. (2011). Loving-kindness and compassion meditation: Potential for psychological interventions. Clinical Psychology Review, 31(7), 1126-1132. https://doi.org/10.1016/j.cpr.2011.07.003 [^37]: Kristeller, J. L., & Wolever, R. Q. (2011). Mindfulness-based eating awareness training for treating binge eating disorder: The conceptual foundation. Eating Disorders, 19(1), 49-61. https://doi.org/10.1080/10640266.2011.533605 [^38]: Teut, M., Roesner, E. J., Ortiz, M., Reese, F., Binting, S., Roll, S., ... & Brinkhaus, B. (2013). Mindful walking in psychologically distressed individuals: A randomized controlled trial. Evidence-Based Complementary and Alternative Medicine, 2013, 489856. https://doi.org/10.1155/2013/489856 [^39]: Weger Jr, H., Bell, G. C., Minei, E. M., & Robinson, M. C. (2014). The relative effectiveness of active listening in initial interactions. International Journal of Listening, 28(1), 13-31. https://doi.org/10.1080/10904018.2013.813234 [^40]: Stahl, B., & Goldstein, E. (2010). A mindfulness-based stress reduction workbook. New Harbinger Publications. [^41]: Slagter, H. A., Davidson, R. J., & Lutz, A. (2011). Mental training as a tool in the neuroscientific study of brain and cognitive plasticity. Frontiers in Human Neuroscience, 5, 17. https://doi.org/10.3389/fnhum.2011.00017 [^42]: Williams, M., & Penman, D. (2011). Mindfulness: An eight-week plan for finding peace in a frantic world. Rodale Books. [^43]: Goldstein, J. (2013). Mindfulness: A practical guide to awakening. Sounds True. [^44]: Kornfield, J. (2008). The wise heart: A guide to the universal teachings of Buddhist psychology. Bantam. [^45]: Salzberg, S. (2011). Real happiness: The power of meditation. Workman Publishing. [^46]: Kabat-Zinn, J. (1994). Wherever you go, there you are: Mindfulness meditation in everyday life. Hyperion. [^47]: Kabat-Zinn, J. (2013). Full catastrophe living: Using the wisdom of your body and mind to face stress, pain, and illness (Revised edition). Bantam Books.', source: 'Clinical Psychology Review', year: '2011', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Mindfulness is the practice of intentionally paying attention to present-moment experience with openness, curiosity, and acceptance—without judgment or reactivity. Originating in Buddhist contemplative traditions and adapted for secular contexts by Jon Kabat-Zinn and others, mindfulness has become one of the most researched psychological interventions.
          </p>
        </div>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="60" index={60} source="Clinical Psychology Review" year="2011" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
