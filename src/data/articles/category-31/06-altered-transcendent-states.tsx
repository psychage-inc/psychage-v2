
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SPIRITUALITY_MEANING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// altered-transcendent-states | Articles 50–50
// ============================================================================

export const alteredtranscendentstatesArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-SPR-059 | Mystical Experiences: The Psychology of Transcendent States
  // --------------------------------------------------------------------------
  {
    id: catId(50),
    slug: 'mystical-experiences-spiritual-states',
    title: 'Mystical Experiences: The Psychology of Transcendent States',
    description: 'Understand mystical experiences—profound states of unity, transcendence, and ineffability. Explore their psychological characteristics, neurobiology, triggers, mental health impacts, and integration challenges.',
    image: '/images/articles/cat31/cover-050.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 13,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['altered-transcendent-states', 'Mystical Experiences', 'The Psychology of Transcendent States'],

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
      { id: '1', text: 'Hood, R. W., Jr. (1975). The construction and preliminary validation of a measure of reported mystical experience. Journal for the Scientific Study of Religion, 14(1), 29-41.', source: 'Journal for the Scientific Study of Religion', year: '1975', link: '', tier: 1 },
      { id: '2', text: 'Pahnke, W. N. (1969). Psychedelic drugs and mystical experience. International Psychiatry Clinics, 5(4), 149-162.', source: 'Psychedelic drugs and mystical experience', year: '1969', link: '', tier: 1 },
      { id: '3', text: 'Griffiths, R. R., et al. (2019). Survey of subjective "God encounter experiences": Comparisons among naturally occurring experiences and those occasioned by the classic psychedelics psilocybin, LSD, ayahuasca, or DMT. PLoS ONE, 14(4), e0214377.', source: 'PLoS ONE', year: '2019', link: '', tier: 1 },
      { id: '4', text: 'Roseman, L., et al. (2018). Quality of acute psychedelic experience predicts therapeutic efficacy of psilocybin for treatment-resistant depression. Frontiers in Pharmacology, 8, 974.', source: 'Frontiers in Pharmacology', year: '2018', link: '', tier: 1 },
      { id: '5', text: 'Carhart-Harris, R. L., et al. (2016). Neural correlates of the LSD experience revealed by multimodal neuroimaging. Proceedings of the National Academy of Sciences, 113(17), 4853-4858.', source: 'Proceedings of the National Academy of Sciences', year: '2016', link: '', tier: 1 },
      { id: '6', text: 'James, W. (1902/2002). The varieties of religious experience: A study in human nature. New York: Modern Library.', source: 'The varieties of religious experience: A study in human nature', year: '', link: '', tier: 1 },
      { id: '7', text: 'Barrett, F. S., et al. (2015). Validation of the revised Mystical Experience Questionnaire in experimental sessions with psilocybin. Journal of Psychopharmacology, 29(11), 1182-1190.', source: 'Journal of Psychopharmacology', year: '2015', link: '', tier: 1 },
      { id: '8', text: 'MacLean, K. A., et al. (2012). Factor analysis of the Mystical Experience Questionnaire: A study of experiences occasioned by the hallucinogen psilocybin. Journal for the Scientific Study of Religion, 51(4), 721-737.', source: 'Journal for the Scientific Study of Religion', year: '2012', link: '', tier: 1 },
      { id: '9', text: 'Underhill, E. (1911/2002). Mysticism: A study in the nature and development of spiritual consciousness. Mineola, NY: Dover Publications.', source: 'Mysticism: A study in the nature and development of spiritual consciousness', year: '', link: '', tier: 1 },
      { id: '10', text: 'Grof, S., & Grof, C. (1989). Spiritual emergency: When personal transformation becomes a crisis. Los Angeles: J. P. Tarcher.', source: 'Spiritual emergency: When personal transformation becomes a crisis', year: '1989', link: '', tier: 1 },
      { id: '11', text: 'Lutz, A., et al. (2007). Long-term meditators self-induce high-amplitude gamma synchrony during mental practice. Proceedings of the National Academy of Sciences, 101(46), 16369-16373.', source: 'Proceedings of the National Academy of Sciences', year: '2007', link: '', tier: 1 },
      { id: '12', text: 'Griffiths, R. R., et al. (2006). Psilocybin can occasion mystical-type experiences having substantial and sustained personal meaning and spiritual significance. Psychopharmacology, 187(3), 268-283.', source: 'Psychopharmacology', year: '2006', link: '', tier: 1 },
      { id: '13', text: 'Garcia-Romeu, A., et al. (2015). Psilocybin-occasioned mystical experiences in the treatment of tobacco addiction. Current Drug Abuse Reviews, 7(3), 157-164.', source: 'Current Drug Abuse Reviews', year: '2015', link: '', tier: 1 },
      { id: '14', text: 'Liechti, M. E., et al. (2017). Alterations of consciousness and mystical-type experiences after acute LSD in humans. Psychopharmacology, 234(9-10), 1499-1510.', source: 'Psychopharmacology', year: '2017', link: '', tier: 1 },
      { id: '15', text: 'Timmermann, C., et al. (2020). A neurophenomenological approach to non-ordinary states of consciousness: Hypnosis, meditation, and psychedelics. Trends in Cognitive Sciences, 24(9), 1023-1028.', source: 'Trends in Cognitive Sciences', year: '2020', link: '', tier: 1 },
      { id: '16', text: 'Davis, A. K., et al. (2020). Survey of entity encounter experiences occasioned by inhaled N,N-dimethyltryptamine: Phenomenology, interpretation, and enduring effects. Journal of Psychopharmacology, 34(9), 1008-1020.', source: 'Journal of Psychopharmacology', year: '2020', link: '', tier: 1 },
      { id: '17', text: 'Pahnke, W. N., & Richards, W. A. (1966). Implications of LSD and experimental mysticism. Journal of Religion and Health, 5(3), 175-208.', source: 'Journal of Religion and Health', year: '1966', link: '', tier: 1 },
      { id: '18', text: 'Carhart-Harris, R. L., & Friston, K. J. (2019). REBUS and the anarchic brain: Toward a unified model of the brain action of psychedelics. Pharmacological Reviews, 71(3), 316-344.', source: 'Pharmacological Reviews', year: '2019', link: '', tier: 1 },
      { id: '19', text: 'Carhart-Harris, R. L., et al. (2012). Neural correlates of the psychedelic state as determined by fMRI studies with psilocybin. Proceedings of the National Academy of Sciences, 109(6), 2138-2143.', source: 'Proceedings of the National Academy of Sciences', year: '2012', link: '', tier: 1 },
      { id: '20', text: 'Petri, G., et al. (2014). Homological scaffolds of brain functional networks. Journal of the Royal Society Interface, 11(101), 20140873.', source: 'Journal of the Royal Society Interface', year: '2014', link: '', tier: 1 },
      { id: '21', text: 'Vollenweider, F. X., & Preller, K. H. (2020). Psychedelic drugs: neurobiology and potential for treatment of psychiatric disorders. Nature Reviews Neuroscience, 21(11), 611-624.', source: 'Nature Reviews Neuroscience', year: '2020', link: '', tier: 1 },
      { id: '22', text: 'Lebedev, A. V., et al. (2015). Finding the self by losing the self: Neural correlates of ego-dissolution under psilocybin. Human Brain Mapping, 36(8), 3137-3153.', source: 'Human Brain Mapping', year: '2015', link: '', tier: 1 },
      { id: '23', text: 'Nichols, D. E. (2016). Psychedelics. Pharmacological Reviews, 68(2), 264-355.', source: 'Pharmacological Reviews', year: '2016', link: '', tier: 1 },
      { id: '24', text: 'Preller, K. H., et al. (2018). Changes in global and thalamic brain connectivity in LSD-induced altered states of consciousness are attributable to the 5-HT2A receptor. eLife, 7, e35082.', source: 'eLife', year: '2018', link: '', tier: 1 },
      { id: '25', text: 'Vollenweider, F. X., & Kometer, M. (2010). The neurobiology of psychedelic drugs: implications for the treatment of mood disorders. Nature Reviews Neuroscience, 11(9), 642-651.', source: 'Nature Reviews Neuroscience', year: '2010', link: '', tier: 1 },
      { id: '26', text: 'Strassman, R. (2001). DMT: The spirit molecule. Rochester, VT: Park Street Press.', source: 'DMT: The spirit molecule', year: '2001', link: '', tier: 5 },
      { id: '27', text: 'Frecska, E., et al. (2016). The therapeutic potentials of ayahuasca: possible effects against various diseases of civilization. Frontiers in Pharmacology, 7, 35.', source: 'Frontiers in Pharmacology', year: '2016', link: '', tier: 1 },
      { id: '28', text: 'Winkelman, M. (2017). The mechanisms of psychedelic visionary experiences: Hypotheses from evolutionary psychology. Frontiers in Neuroscience, 11, 539.', source: 'Frontiers in Neuroscience', year: '2017', link: '', tier: 1 },
      { id: '29', text: 'Watts, R., et al. (2017). Patients\' accounts of increased "connectedness" and "acceptance" after psilocybin for treatment-resistant depression. Journal of Humanistic Psychology, 57(5), 520-564.', source: 'Journal of Humanistic Psychology', year: '2017', link: '', tier: 1 },
      { id: '30', text: 'Yaden, D. B., et al. (2017). The varieties of self-transcendent experience. Review of General Psychology, 21(2), 143-160.', source: 'Review of General Psychology', year: '2017', link: '', tier: 1 },
      { id: '31', text: 'Ly, C., et al. (2018). Psychedelics promote structural and functional neural plasticity. Cell Reports, 23(11), 3170-3182.', source: 'Cell Reports', year: '2018', link: '', tier: 1 },
      { id: '32', text: 'Flanagan, O., & Graham, G. (2018). Mystical experience, neuroscience, and the nature of reality. In D. Mosser et al. (Eds.), Philosophy of mysticism (pp. 181-202). New York: Routledge.', source: 'Philosophy of mysticism', year: '2018', link: '', tier: 1 },
      { id: '33', text: 'Carbonaro, T. M., et al. (2016). Survey study of challenging experiences after ingesting psilocybin mushrooms: Acute and enduring positive and negative consequences. Journal of Psychopharmacology, 30(12), 1268-1278.', source: 'Journal of Psychopharmacology', year: '2016', link: '', tier: 1 },
      { id: '34', text: 'Griffiths, R. R., et al. (2008). Mystical-type experiences occasioned by psilocybin mediate the attribution of personal meaning and spiritual significance 14 months later. Journal of Psychopharmacology, 22(6), 621-632.', source: 'Journal of Psychopharmacology', year: '2008', link: '', tier: 1 },
      { id: '35', text: 'MacLean, K. A., et al. (2011). Mystical experiences occasioned by the hallucinogen psilocybin lead to increases in the personality domain of openness. Journal of Psychopharmacology, 25(11), 1453-1461.', source: 'Journal of Psychopharmacology', year: '2011', link: '', tier: 1 },
      { id: '36', text: 'Lyons, T., & Carhart-Harris, R. L. (2018). Increased nature relatedness and decreased authoritarian political views after psilocybin for treatment-resistant depression. Journal of Psychopharmacology, 32(7), 811-819.', source: 'Journal of Psychopharmacology', year: '2018', link: '', tier: 1 },
      { id: '37', text: 'Griffiths, R. R., et al. (2011). Psilocybin occasioned mystical-type experiences: Immediate and persisting dose-related effects. Psychopharmacology, 218(4), 649-665.', source: 'Psychopharmacology', year: '2011', link: '', tier: 1 },
      { id: '38', text: 'Mason, N. L., et al. (2019). Sub-acute effects of psilocybin on empathy, creative thinking, and subjective well-being. Journal of Psychoactive Drugs, 51(2), 123-134.', source: 'Journal of Psychoactive Drugs', year: '2019', link: '', tier: 1 },
      { id: '39', text: 'Griffiths, R. R., et al. (2016). Psilocybin produces substantial and sustained decreases in depression and anxiety in patients with life-threatening cancer: A randomized double-blind trial. Journal of Psychopharmacology, 30(12), 1181-1197.', source: 'Journal of Psychopharmacology', year: '2016', link: '', tier: 1 },
      { id: '40', text: 'Doblin, R. (1991). Pahnke\'s "Good Friday Experiment": A long-term follow-up and methodological critique. Journal of Transpersonal Psychology, 23(1), 1-28.', source: 'Journal of Transpersonal Psychology', year: '1991', link: '', tier: 1 },
      { id: '41', text: 'Carhart-Harris, R. L., & Goodwin, G. M. (2017). The therapeutic potential of psychedelic drugs: past, present, and future. Neuropsychopharmacology, 42(11), 2105-2113.', source: 'Neuropsychopharmacology', year: '2017', link: '', tier: 1 },
      { id: '42', text: 'Davis, A. K., et al. (2021). Effects of psilocybin-assisted therapy on major depressive disorder: A randomized clinical trial. JAMA Psychiatry, 78(5), 481-489.', source: 'JAMA Psychiatry', year: '2021', link: '', tier: 1 },
      { id: '43', text: 'Ross, S., et al. (2016). Rapid and sustained symptom reduction following psilocybin treatment for anxiety and depression in patients with life-threatening cancer: A randomized controlled trial. Journal of Psychopharmacology, 30(12), 1165-1180.', source: 'Journal of Psychopharmacology', year: '2016', link: '', tier: 1 },
      { id: '44', text: 'Johnson, M. W., et al. (2014). Pilot study of the 5-HT2AR agonist psilocybin in the treatment of tobacco addiction. Journal of Psychopharmacology, 28(11), 983-992.', source: 'Journal of Psychopharmacology', year: '2014', link: '', tier: 1 },
      { id: '45', text: 'Mithoefer, M. C., et al. (2019). MDMA-assisted psychotherapy for treatment of PTSD: Study design and rationale for phase 3 trials based on pooled analysis of six phase 2 randomized controlled trials. Psychopharmacology, 236(9), 2735-2745.', source: 'Psychopharmacology', year: '2019', link: '', tier: 1 },
      { id: '46', text: 'Garcia-Romeu, A., et al. (2014). Persisting reductions in cannabis, opioid, and stimulant misuse after naturalistic psychedelic use: An online survey. Frontiers in Psychiatry, 10, 955.', source: 'Frontiers in Psychiatry', year: '2014', link: '', tier: 1 },
      { id: '47', text: 'Grof, S., & Grof, C. (Eds.). (1989). Spiritual emergency: When personal transformation becomes a crisis. Los Angeles: J. P. Tarcher.', source: 'Spiritual emergency: When personal transformation becomes a crisis', year: '1989', link: '', tier: 1 },
      { id: '48', text: 'Buckley, P. (1981). Mystical experience and schizophrenia. Schizophrenia Bulletin, 7(3), 516-521.', source: 'Schizophrenia Bulletin', year: '1981', link: '', tier: 1 },
      { id: '49', text: 'Jackson, M., & Fulford, K. W. M. (1997). Spiritual experience and psychopathology. Philosophy, Psychiatry, & Psychology, 4(1), 41-65.', source: 'Philosophy, Psychiatry, & Psychology', year: '1997', link: '', tier: 1 },
      { id: '50', text: 'Grof, S. (1985). Beyond the brain: Birth, death, and transcendence in psychotherapy. Albany: State University of New York Press.', source: 'Beyond the brain: Birth, death, and transcendence in psychotherapy', year: '1985', link: '', tier: 1 },
      { id: '51', text: 'Gasser, P., et al. (2015). LSD-assisted psychotherapy for anxiety associated with a life-threatening disease: A qualitative study of acute and sustained subjective effects. Journal of Psychopharmacology, 29(1), 57-68.', source: 'Journal of Psychopharmacology', year: '2015', link: '', tier: 1 },
      { id: '52', text: 'Stace, W. T. (1960). Mysticism and philosophy. London: Macmillan.', source: 'Mysticism and philosophy', year: '1960', link: '', tier: 1 },
      { id: '53', text: 'Taves, A. (2009). Religious experience reconsidered: A building-block approach to the study of religion and other special things. Princeton, NJ: Princeton University Press.', source: 'Religious experience reconsidered: A building-block approach to the study of religion and other special things', year: '2009', link: '', tier: 5 },
      { id: '54', text: 'Forman, R. K. C. (Ed.). (1990). The problem of pure consciousness: Mysticism and philosophy. New York: Oxford University Press.', source: 'The problem of pure consciousness: Mysticism and philosophy', year: '1990', link: '', tier: 5 },
      { id: '55', text: 'Saver, J. L., & Rabin, J. (1997). The neural substrates of religious experience. Journal of Neuropsychiatry and Clinical Neurosciences, 9(3), 498-510.', source: 'Journal of Neuropsychiatry and Clinical Neurosciences', year: '1997', link: '', tier: 1 },
      { id: '56', text: 'Johnson, M. W., et al. (2008). Human hallucinogen research: Guidelines for safety. Journal of Psychopharmacology, 22(6), 603-620.', source: 'Journal of Psychopharmacology', year: '2008', link: '', tier: 1 },
      { id: '57', text: 'Grof, C., & Grof, S. (1990). The stormy search for the self: A guide to personal growth through transformational crisis. Los Angeles: J. P. Tarcher.', source: 'The stormy search for the self: A guide to personal growth through transformational crisis', year: '1990', link: '', tier: 1 },
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
          <Citation id="1" index={1} source="Journal for the Scientific Study of Religion" year="1975" tier={1} />
          <Citation id="2" index={2} source="Psychedelic drugs and mystical experience" year="1969" tier={1} />
          <Citation id="3" index={3} source="PLoS ONE" year="2019" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
