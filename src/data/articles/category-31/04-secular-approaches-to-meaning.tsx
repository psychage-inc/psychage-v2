
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SPIRITUALITY_MEANING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Secular Approaches to Meaning | Articles 33–35
// ============================================================================

export const secularApproachesToMeaningArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-SPR-025 | Secular Spirituality: Finding Transcendence Without Religion
  // --------------------------------------------------------------------------
  {
    id: catId(33),
    slug: 'secular-spirituality',
    title: 'Secular Spirituality: Finding Transcendence Without Religion',
    description: 'Understanding secular spirituality, how non-religious people find meaning and transcendence, and research on wellbeing in the non-religious.',
    image: '/images/articles/cat31/cover-033.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 13,
    publishedAt: '2026-03-29',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['secular spirituality', 'atheist meaning', 'transcendence without religion', 'secular humanism', 'spiritual but not religious'],

    summary: 'Secular spirituality involves pursuing meaning, connection, awe, and transcendence without belief in God or adherence to religious institutions. Research shows that non-religious people can achieve psychological wellbeing, moral development, and self-transcendent experiences through secular means: connection to nature, creative expression, ethical commitment, contemplative practices, relationships, and engagement with beauty. The "spiritual but not religious" (SBNR) category is growing rapidly—now representing 27% of US adults—while strictly non-spiritual atheists and agnostics comprise another significant group who find fulfillment through science, philosophy, art, and community. Importantly, research shows no inherent psychological advantage to religious belief; what matters is having some framework for meaning, purpose, and values—whether religious or secular.',

    keyFacts: [

    ],

    sparkMoment: 'You don\'t need to believe in God to kneel before something greater than yourself. The redwood that\'s been standing for 2,000 years. The mathematics that describe how galaxies spiral. The stranger who stopped to help when you were broken. Transcendence isn\'t about escaping the material world—it\'s about fully inhabiting it, noticing its vastness and beauty and terror, and recognizing you\'re part of something incomprehensibly larger than your small self. That\'s not less sacred than the religious version. It\'s just differently sacred.',

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

    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Secular spirituality involves pursuing meaning, connection, awe, and transcendence without belief in God or adherence to religious institutions. Research shows that non-religious people can achieve psychological wellbeing, moral development, and self-transcendent experiences through secular means: connection to nature, creative expression, ethical commitment, contemplative practices, relationships, and engagement with beauty.
          </p>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-SPR-026 | Existential Therapy: Finding Meaning in an Uncertain World
  // --------------------------------------------------------------------------
  {
    id: catId(34),
    slug: 'existential-therapy',
    title: 'Existential Therapy: Finding Meaning in an Uncertain World',
    description: 'Understanding existential therapy, how it addresses questions of meaning, freedom, and death, and research on its effectiveness for existential concerns.',
    image: '/images/articles/cat31/cover-034.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 14,
    publishedAt: '2026-03-29',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['existential therapy', 'meaning-making', 'existential psychology', 'Viktor Frankl', 'Irvin Yalom'],

    summary: 'Existential therapy is an approach to psychotherapy that addresses the fundamental human concerns that underlie psychological distress: death, freedom, isolation, and meaninglessness. Rather than treating symptoms, existential therapists help clients confront these "givens of existence" and construct authentic meaning despite life\'s inherent uncertainty. Founded by psychiatrists Viktor Frankl, Rollo May, and Irvin Yalom, existential therapy draws from philosophy (Kierkegaard, Nietzsche, Heidegger, Sartre) to address questions like "Why am I here?" "How should I live?" "How do I face death?" Research shows existential therapy is particularly effective for people facing terminal illness, major life transitions, or existential crises—situations where symptom-focused therapy feels insufficient because the problem isn\'t pathology but the human condition itself.',

    keyFacts: [

    ],

    sparkMoment: 'You keep asking "What\'s the meaning of life?" as if it\'s a riddle with an answer you haven\'t found yet. Existential therapy says: there\'s no answer. There\'s only the question, and how you choose to live it. That\'s not depressing—that\'s liberation. No cosmic script. No predetermined purpose. Just you, choosing, again and again, who you\'ll be and what will matter. The terror of that freedom is also its gift.',

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
      { id: '1', text: 'Frankl, V. E. (1946/2006). Man\'s Search for Meaning. Boston: Beacon Press.', source: 'Man\'s Search for Meaning', year: '', link: '', tier: 5 },
      { id: '2', text: 'Vos, J., Craig, M., & Cooper, M. (2015). Existential therapies: A meta-analysis of their effects on psychological outcomes. Journal of Consulting and Clinical Psychology, 83(1), 115-128. https://doi.org/10.1037/a0037167', source: 'Journal of Consulting and Clinical Psychology, 83', year: '2015', link: '', tier: 1 },
      { id: '3', text: 'Park, C. L. (2010). Making sense of the meaning literature: An integrative review of meaning making and its effects on adjustment to stressful life events. Psychological Bulletin, 136(2), 257-301. https://doi.org/10.1037/a0018301', source: 'Psychological Bulletin, 136', year: '2010', link: '', tier: 1 },
      { id: '4', text: 'Jonas, E., & Fischer, P. (2006). Terror management and religion: Evidence that intrinsic religiousness mitigates worldview defense following mortality salience. Journal of Personality and Social Psychology, 91(3), 553-567. https://doi.org/10.1037/0022-3514.91.3.553', source: 'Journal of Personality and Social Psychology, 91', year: '2006', link: '', tier: 1 },
      { id: '5', text: 'Correia, E. A., Cooper, M., & Berdondini, L. (2014). Existential psychotherapies: Similarities and differences among the main branches. British Journal of Guidance & Counselling, 43(1), 111-131. https://doi.org/10.1080/03069885.2014.925597', source: 'British Journal of Guidance & Counselling, 43', year: '2014', link: '', tier: 1 },
      { id: '6', text: 'Yalom, I. D. (1980). Existential Psychotherapy. New York: Basic Books.', source: 'Existential Psychotherapy', year: '1980', link: '', tier: 1 },
      { id: '7', text: 'May, R. (1950). The Meaning of Anxiety. New York: Ronald Press.', source: 'The Meaning of Anxiety', year: '1950', link: '', tier: 5 },
      { id: '8', text: 'Laing, R. D. (1960). The Divided Self: An Existential Study in Sanity and Madness. London: Tavistock Publications.', source: 'The Divided Self: An Existential Study in Sanity and Madness', year: '1960', link: '', tier: 1 },
      { id: '9', text: 'Van Deurzen, E. (2010). Everyday Mysteries: A Handbook of Existential Psychotherapy (2nd ed.). London: Routledge.', source: 'Everyday Mysteries: A Handbook of Existential Psychotherapy', year: '2010', link: '', tier: 1 },
      { id: '10', text: 'Yalom, I. D. (2008). Staring at the Sun: Overcoming the Terror of Death. San Francisco: Jossey-Bass.', source: 'Staring at the Sun: Overcoming the Terror of Death', year: '2008', link: '', tier: 1 },
      { id: '11', text: 'Breitbart, W., Rosenfeld, B., Pessin, H., Applebaum, A., Kulikowski, J., & Lichtenthal, W. G. (2015). Meaning-centered group psychotherapy: An effective intervention for improving psychological well-being in patients with advanced cancer. Journal of Clinical Oncology, 33(7), 749-754. https://doi.org/10.1200/JCO.2014.57.2198', source: 'Journal of Clinical Oncology, 33', year: '2015', link: '', tier: 1 },
      { id: '12', text: 'Neimeyer, R. A. (2001). Meaning Reconstruction and the Experience of Loss. Washington, DC: American Psychological Association.', source: 'Meaning Reconstruction and the Experience of Loss', year: '2001', link: '', tier: 1 },
      { id: '13', text: 'Frankl, V. E. (1967). Psychotherapy and Existentialism: Selected Papers on Logotherapy. New York: Simon & Schuster.', source: 'Psychotherapy and Existentialism: Selected Papers on Logotherapy', year: '1967', link: '', tier: 1 },
      { id: '14', text: 'Lantz, J., & Walsh, J. (2007). Short-term existential intervention in clinical practice. Journal of Contemporary Psychotherapy, 37(2), 117-121. https://doi.org/10.1007/s10879-006-9035-x', source: 'Journal of Contemporary Psychotherapy, 37', year: '2007', link: '', tier: 1 },
      { id: '15', text: 'Sartre, J. P. (1943/1992). Being and Nothingness (H. E. Barnes, Trans.). New York: Washington Square Press.', source: 'Being and Nothingness', year: '', link: '', tier: 5 },
      { id: '16', text: 'Wong, P. T. P. (2010). Meaning therapy: An integrative and positive existential psychotherapy. Journal of Contemporary Psychotherapy, 40(2), 85-93. https://doi.org/10.1007/s10879-009-9132-6', source: 'Journal of Contemporary Psychotherapy, 40', year: '2010', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Existential therapy is an approach to psychotherapy that addresses the fundamental human concerns that underlie psychological distress: death, freedom, isolation, and meaninglessness. Rather than treating symptoms, existential therapists help clients confront these &quot;givens of existence&quot; and construct authentic meaning despite life&apos;s inherent uncertainty.
          </p>
        </div>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Man\'s Search for Meaning" year="" tier={5} />
          <Citation id="2" index={2} source="Journal of Consulting and Clinical Psychology, 83" year="2015" tier={1} />
          <Citation id="3" index={3} source="Psychological Bulletin, 136" year="2010" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-SPR-027 | Logotherapy: Viktor Frankl's Search for Meaning
  // --------------------------------------------------------------------------
  {
    id: catId(35),
    slug: 'logotherapy',
    title: 'Logotherapy: Viktor Frankl\'s Search for Meaning',
    description: 'Understanding logotherapy, Viktor Frankl\'s meaning-centered psychotherapy developed from his experiences in Auschwitz, and research on its effectiveness.',
    image: '/images/articles/cat31/cover-035.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 14,
    publishedAt: '2026-03-29',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['logotherapy', 'Viktor Frankl', 'meaning-centered therapy', 'will to meaning', 'existential vacuum'],

    summary: 'Logotherapy is a form of existential therapy developed by Austrian psychiatrist Viktor Frankl based on his experiences surviving Auschwitz. The core premise: humans are driven by a "will to meaning"—the need to find significance and purpose in life—and psychological distress often stems from the "existential vacuum" when that will is frustrated. Unlike therapies that focus on symptom reduction, logotherapy helps clients discover meaning through three pathways: (1) creating work or doing deeds, (2) experiencing something or encountering someone (love, beauty, nature), or (3) choosing their attitude toward unavoidable suffering. Research shows logotherapy is particularly effective for depression, addiction, and situations involving unavoidable suffering where symptom-focused therapy feels inadequate. Frankl\'s concept of "tragic optimism"—finding meaning despite pain, guilt, and death—offers a framework for psychological resilience grounded in meaning rather than happiness.',

    keyFacts: [

    ],

    sparkMoment: 'You keep waiting to feel better before you start living. Frankl says: start living, and you\'ll feel better. Not because life will be easier, but because you\'ll have reasons—reasons to wake up, reasons to struggle, reasons to stay. The question isn\'t "Am I happy?" It\'s "Does my life make sense? Is there something I need to do? Someone I need to love? Some attitude I need to embody?" Answer that, and happiness takes care of itself. Or doesn\'t—and you\'re okay anyway, because you\'re doing what matters.',

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
      { id: '1', text: 'Frankl, V. E. (1946/2006). Man\'s Search for Meaning. Boston: Beacon Press.', source: 'Man\'s Search for Meaning', year: '', link: '', tier: 5 },
      { id: '2', text: 'Thir, M., & Batthyány, A. (2018). The state of empirical research on logotherapy and existential analysis. In A. Batthyány (Ed.), Logotherapy and Existential Analysis: Proceedings of the Viktor Frankl Institute Vienna (pp. 53-74). New York: Springer.', source: 'Logotherapy and Existential Analysis: Proceedings of the Viktor Frankl Institute Vienna', year: '2018', link: '', tier: 3 },
      { id: '3', text: 'Steger, M. F., Oishi, S., & Kashdan, T. B. (2009). Meaning in life across the life span: Levels and correlates of meaning in life from emerging adulthood to older adulthood. The Journal of Positive Psychology, 4(1), 43-52. https://doi.org/10.1080/17439760802303127', source: 'The Journal of Positive Psychology, 4', year: '2009', link: '', tier: 1 },
      { id: '4', text: 'Breitbart, W., Rosenfeld, B., Pessin, H., Applebaum, A., Kulikowski, J., & Lichtenthal, W. G. (2015). Meaning-centered group psychotherapy: An effective intervention for improving psychological well-being in patients with advanced cancer. Journal of Clinical Oncology, 33(7), 749-754. https://doi.org/10.1200/JCO.2014.57.2198', source: 'Journal of Clinical Oncology, 33', year: '2015', link: '', tier: 1 },
      { id: '5', text: 'Frankl, V. E. (1969). The Will to Meaning: Foundations and Applications of Logotherapy. New York: New American Library.', source: 'The Will to Meaning: Foundations and Applications of Logotherapy', year: '1969', link: '', tier: 3 },
      { id: '6', text: 'Frankl, V. E. (1985). Man\'s Search for Ultimate Meaning. New York: Insight Books.', source: 'Man\'s Search for Ultimate Meaning', year: '1985', link: '', tier: 5 },
      { id: '7', text: 'Ascher, L. M. (1989). Paradoxical Intention and Recursive Anxiety. In L. M. Ascher (Ed.), Therapeutic Paradox (pp. 93-137). New York: Guilford Press.', source: 'Paradoxical Intention and Recursive Anxiety', year: '1989', link: '', tier: 5 },
      { id: '8', text: 'Heisel, M. J., & Flett, G. L. (2016). Investigating the psychometric properties of the Geriatric Suicide Ideation Scale (GSIS) among community-residing older adults. Aging & Mental Health, 20(2), 208-221. https://doi.org/10.1080/13607863.2015.1072798', source: 'Aging & Mental Health, 20', year: '2016', link: '', tier: 1 },
      { id: '9', text: 'Crumbaugh, J. C. (1972). Changes in Frankl\'s existential vacuum as a measure of therapeutic outcome. Newsletter for Research in Psychology, 14(2), 35-37.', source: 'Newsletter for Research in Psychology, 14', year: '1972', link: '', tier: 1 },
      { id: '10', text: 'Park, C. L., & Ai, A. L. (2006). Meaning making and growth: New directions for research on survivors of trauma. Journal of Loss and Trauma, 11(5), 389-407. https://doi.org/10.1080/15325020600685295', source: 'Journal of Loss and Trauma, 11', year: '2006', link: '', tier: 1 },
      { id: '11', text: 'Boyle, P. A., Barnes, L. L., Buchman, A. S., & Bennett, D. A. (2009). Purpose in life is associated with mortality among community-dwelling older persons. Psychosomatic Medicine, 71(5), 574-579. https://doi.org/10.1097/PSY.0b013e3181a5a7c0', source: 'Psychosomatic Medicine, 71', year: '2009', link: '', tier: 1 },
      { id: '12', text: 'Wong, P. T. P. (2010). Meaning therapy: An integrative and positive existential psychotherapy. Journal of Contemporary Psychotherapy, 40(2), 85-93. https://doi.org/10.1007/s10879-009-9132-6', source: 'Journal of Contemporary Psychotherapy, 40', year: '2010', link: '', tier: 1 },
      { id: '13', text: 'Ford, B. Q., Shallcross, A. J., Mauss, I. B., Floerke, V. A., & Gruber, J. (2014). Desperately seeking happiness: Valuing happiness is associated with symptoms and diagnosis of depression. Journal of Social and Clinical Psychology, 33(10), 890-905. https://doi.org/10.1521/jscp.2014.33.10.890', source: 'Journal of Social and Clinical Psychology, 33', year: '2014', link: '', tier: 1 },
      { id: '14', text: 'Frankl, V. E. (1967). Psychotherapy and Existentialism: Selected Papers on Logotherapy. New York: Simon & Schuster.', source: 'Psychotherapy and Existentialism: Selected Papers on Logotherapy', year: '1967', link: '', tier: 1 },
      { id: '15', text: 'Lukas, E. (1986). Meaning in Suffering: Comfort in Crisis Through Logotherapy. Berkeley, CA: Institute of Logotherapy Press.', source: 'Meaning in Suffering: Comfort in Crisis Through Logotherapy', year: '1986', link: '', tier: 3 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Logotherapy is a form of existential therapy developed by Austrian psychiatrist Viktor Frankl based on his experiences surviving Auschwitz. The core premise: humans are driven by a &quot;will to meaning&quot;—the need to find significance and purpose in life—and psychological distress often stems from the &quot;existential vacuum&quot; when that will is frustrated.
          </p>
        </div>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Man\'s Search for Meaning" year="" tier={5} />
          <Citation id="2" index={2} source="Logotherapy and Existential Analysis: Proceedings of the Viktor Frankl Institute Vienna" year="2018" tier={3} />
          <Citation id="3" index={3} source="The Journal of Positive Psychology, 4" year="2009" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
