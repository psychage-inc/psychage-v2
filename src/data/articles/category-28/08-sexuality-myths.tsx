
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SEXUALITY_INTIMACY, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// Sexuality Myths | Articles 47–50
// ============================================================================

export const sexualityMythsArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-SEX-041 | Myth: Sexual Desire Should Be Spontaneous and Constant
  // --------------------------------------------------------------------------
  {
    id: catId(47),
    slug: 'myth-sexual-desire-spontaneous-constant',
    title: 'Myth: Sexual Desire Should Be Spontaneous and Constant',
    description: 'Examining the myth that sexual desire must be spontaneous and constant, exploring responsive desire, the dual control model, and how understanding desire styles reduces sexual distress.',
    image: '/images/articles/cat28/cover-047.svg',
    category: CATEGORY_SEXUALITY_INTIMACY,
    readTime: 10,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['sexual desire myth', 'spontaneous desire', 'responsive desire', 'dual control model', 'desire discrepancy'],

    summary: 'One of the most persistent myths in sexual culture is the belief that desire should arrive unbidden—spontaneously, reliably, and with equal intensity across a lifetime. This misconception, deeply embedded in media portrayals and cultural scripts, causes significant distress for individuals and couples who interpret the absence of spontaneous desire as evidence of dysfunction, falling out of love, or personal inadequacy. Research in sexual psychophysiology reveals a far more nuanced picture: desire operates through multiple pathways, fluctuates in response to context and life circumstances, and varies enormously across individuals. Understanding responsive desire, the dual control model of sexual arousal, and the contextual nature of wanting can transform how people relate to their own sexuality and dramatically reduce unnecessary suffering.',

    keyFacts: [
      { text: 'Researcher Emily Nagoski\'s analysis of sexual desire research distinguishes between spontaneous desire (desire that appears seemingly without external trigger) and responsive desire (desire that emerges in response to arousal already in progress), no...', citationIndex: 1 },
      { text: 'The dual control model of sexual response, developed by Erick Janssen and John Bancroft at the Kinsey Institute, conceptualizes arousal as the balance between sexual excitation and sexual inhibition systems—both of which vary across individuals and a...', citationIndex: 2 },
      { text: 'A study published in the *Journal of Sex & Marital Therapy* found that approximately 30% of women and 5% of men primarily experience responsive rather than spontaneous desire', citationIndex: 3 },
      { text: 'Longitudinal research on desire in long-term relationships demonstrates that desire naturally fluctuates across the relationship lifespan, with multiple factors—including habituation, stress, health changes, and caregiving demands—contributing to per...', citationIndex: 4 },
      { text: 'The World Health Organization\'s definition of sexual health explicitly frames sexuality as influenced by biological, psychological, social, economic, political, cultural, legal, historical, religious, and spiritual factors', citationIndex: 5 },
    ],

    sparkMoment: 'Your desire is not broken because it doesn\'t look like a movie scene. It may simply be waiting for the right context—the right safety, the right stimulation, the right moment of connection—to emerge. Understanding how your desire actually works, rather than measuring it against an impossible standard, is one of the most liberating things you can do for your sexual life.',

    practicalExercise: {
      title: 'Learn your desire style.',
      steps: [
        { title: 'Learn your desire style.', description: 'Reflect on whether your desire tends to be more spontaneous (appearing without obvious trigger) or responsive (emerging after stimulation begins). Neither is better—they are different pathways to the same destination. Emily Nagoski\'s *Come As You Are* provides accessible self-assessment tools.' },
        { title: 'Communicate your pattern to your partner.', description: 'If you experience responsive desire, explaining this to your partner can reduce misinterpretation. Rather than "I don\'t want you," the message becomes "I need a different kind of warm-up."' },
        { title: 'Assess your context.', description: 'Identify what factors increase and decrease your desire. Stress, sleep deprivation, body image concerns, unresolved conflict, and environmental distractions all activate the inhibition system. Addressing these contextual factors often has more impact than any supplement or technique.' },
        { title: 'Redefine initiation.', description: 'If spontaneous desire is rare for you, consider that initiating sexual activity from a place of willingness (rather than urgent wanting) is a valid and common pattern. Desire often builds once arousal begins.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    },

    citations: [
      { id: '1', text: 'Nagoski, E. (2015). Come as you are: The surprising new science that will transform your sex life. Simon & Schuster.', source: 'Come as you are: The surprising new science that will transform your sex life', year: '2015', link: '', tier: 1 },
      { id: '2', text: 'Bancroft, J., & Janssen, E. (2000). The dual control model of male sexual response: A theoretical approach to centrally mediated erectile dysfunction. Neuroscience & Biobehavioral Reviews, 24(5), 571–579. https://doi.org/10.1016/S0149-7634(00)00024-5', source: 'Neuroscience & Biobehavioral Reviews', year: '2000', link: '', tier: 1 },
      { id: '3', text: 'Brotto, L. A., & Basson, R. (2016). Group mindfulness-based therapy significantly improves sexual desire in women. Behaviour Research and Therapy, 57, 43–54. https://doi.org/10.1016/j.brat.2014.04.001', source: 'Behaviour Research and Therapy', year: '2016', link: '', tier: 1 },
      { id: '4', text: 'Mark, K. P., & Lasslo, J. A. (2018). Maintaining sexual desire in long-term relationships: A systematic review and conceptual model. Journal of Sex Research, 55(4-5), 563–581. https://doi.org/10.1080/00224499.2018.1437219', source: 'Journal of Sex Research', year: '2018', link: '', tier: 1 },
      { id: '5', text: 'Masters, W. H., & Johnson, V. E. (1966). Human sexual response. Little, Brown and Company.', source: 'Human sexual response', year: '1966', link: '', tier: 1 },
      { id: '6', text: 'Basson, R. (2000). The female sexual response: A different model. Journal of Sex & Marital Therapy, 26(1), 51–65. https://doi.org/10.1080/009262300278641', source: 'Journal of Sex & Marital Therapy', year: '2000', link: '', tier: 1 },
      { id: '7', text: 'Murray, S. H., & Milhausen, R. R. (2012). Sexual desire and relationship duration in young men and women. Journal of Sex & Marital Therapy, 38(1), 28–40. https://doi.org/10.1080/0092623X.2011.569637', source: 'Journal of Sex & Marital Therapy', year: '2012', link: '', tier: 1 },
      { id: '8', text: 'Brotto, L. A. (2018). Better sex through mindfulness: How women can cultivate desire. Greystone Books.', source: 'Better sex through mindfulness: How women can cultivate desire', year: '2018', link: '', tier: 5 },
      { id: '9', text: 'Sutherland, S. E., & Rehman, U. S. (2018). Viewing sexual desire discrepancy through a lens of sexual compatibility. Sexual and Relationship Therapy, 33(3), 263–278. https://doi.org/10.1080/14681994.2017.1397946', source: 'Sexual and Relationship Therapy', year: '2018', link: '', tier: 1 },
      { id: '10', text: 'World Health Organization. (2006). Defining sexual health: Report of a technical consultation on sexual health. WHO.', source: 'Defining sexual health: Report of a technical consultation on sexual health', year: '2006', link: '', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            One of the most persistent myths in sexual culture is the belief that desire should arrive unbidden—spontaneously, reliably, and with equal intensity across a lifetime. This misconception, deeply embedded in media portrayals and cultural scripts, causes significant distress for individuals and couples who interpret the absence of spontaneous desire as evidence of dysfunction, falling out of love, or personal inadequacy.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          Researcher Emily Nagoski&apos;s analysis of sexual desire research distinguishes between spontaneous desire (desire that appears seemingly without external trigger) and responsive desire (desire that emerges in response to arousal already in progress), no...
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          The dual control model of sexual response, developed by Erick Janssen and John Bancroft at the Kinsey Institute, conceptualizes arousal as the balance between sexual excitation and sexual inhibition systems—both of which vary across individuals and a...
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Come as you are: The surprising new science that will transform your sex life" year="2015" tier={1} />
          <Citation id="2" index={2} source="Neuroscience & Biobehavioral Reviews" year="2000" tier={1} />
          <Citation id="3" index={3} source="Behaviour Research and Therapy" year="2016" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-SEX-042 | Myth: If You Love Someone the Sex Should Just Work
  // --------------------------------------------------------------------------
  {
    id: catId(48),
    slug: 'myth-love-someone-sex-should-work',
    title: 'Myth: If You Love Someone the Sex Should Just Work',
    description: 'Debunking the myth that love automatically creates sexual compatibility, exploring how communication, learning, and skill-building are essential to sexual satisfaction in relationships.',
    image: '/images/articles/cat28/cover-048.svg',
    category: CATEGORY_SEXUALITY_INTIMACY,
    readTime: 10,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['sexual compatibility myth', 'love and sex', 'sexual communication', 'sexual satisfaction', 'couples therapy'],

    summary: 'The belief that love should automatically produce great sex is among the most damaging myths in relationship psychology. This assumption—that emotional connection translates seamlessly into physical compatibility without effort, communication, or learning—sets couples up for silent suffering when their sexual experiences fall short of the effortless ideal. Decades of research in sexual psychology demonstrates that sexual satisfaction is a skill domain requiring communication, vulnerability, experimentation, and ongoing negotiation. Couples who understand that good sex is built rather than found report higher satisfaction, better communication, and greater sexual resilience across the lifespan of their relationships. Dismantling this myth is essential for reducing the shame and confusion that prevent couples from addressing sexual difficulties openly.',

    keyFacts: [
      { text: 'Research by David Schnarch, a clinical psychologist specializing in sexuality and relationships, found that the most sexually satisfied couples were not those with the highest initial chemistry but those who developed what he termed "sexual crucible"...', citationIndex: 1 },
      { text: 'A large-scale study of over 38,000 couples published in the *Journal of Sex Research* identified communication about sexual preferences as the strongest predictor of sexual satisfaction, surpassing frequency of sex, relationship duration, and physica...', citationIndex: 2 },
      { text: 'The Gottman Institute\'s research on long-term relationships found that couples who discussed their sexual needs openly—including what they enjoyed, what they wanted to try, and what wasn\'t working—reported significantly higher relationship and sexual...', citationIndex: 3 },
      { text: 'A meta-analysis of 64 studies on sexual satisfaction found that sexual communication, sexual self-disclosure, and responsiveness to partner needs were consistently stronger predictors of sexual satisfaction than any individual sexual behavior or freq...', citationIndex: 4 },
      { text: 'The American Association of Sexuality Educators, Counselors, and Therapists (AASECT) emphasizes that sexual skill-building is a legitimate therapeutic goal, positioning sexual satisfaction as requiring the same intentional practice and communication ...', citationIndex: 5 },
    ],

    sparkMoment: 'Love gives you a reason to build a great sexual relationship. But love alone won\'t build it for you. The willingness to learn each other—not once, but continuously, through conversation and curiosity and the occasional awkward moment—is what transforms love into lasting sexual connection. The question isn\'t "Do we have chemistry?" It\'s "Are we willing to keep learning each other?"',

    practicalExercise: {
      title: 'Start a sexual conversation outside the bedroom.',
      steps: [
        { title: 'Start a sexual conversation outside the bedroom.', description: 'Choose a relaxed, non-sexual moment to ask your partner an open-ended question: "What\'s something you\'ve enjoyed lately that you\'d like more of?" or "Is there anything you\'ve been curious about trying?" Low-stakes questions create openings for deeper dialogue.' },
        { title: 'Practice the "Three Things" exercise.', description: 'Each partner shares three things: one thing they enjoy about their current sexual relationship, one thing they\'d like more of, and one thing they\'re curious about exploring. This structured format reduces the pressure of open-ended sexual conversation.' },
        { title: 'Normalize adjustment.', description: 'Remind yourself and your partner that needing to communicate about sex is a sign of healthy engagement, not a sign of incompatibility. Every couple—regardless of how long they\'ve been together—benefits from ongoing sexual dialogue.' },
        { title: 'Consider professional guidance.', description: 'Sex therapy is not reserved for couples in crisis. Many couples seek sex therapy as a proactive investment in their sexual relationship, working with a certified therapist to develop communication skills and expand their sexual repertoire.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    },

    citations: [
      { id: '1', text: 'Schnarch, D. (1997). Passionate marriage: Keeping love and intimacy alive in committed relationships. W. W. Norton & Company.', source: 'Passionate marriage: Keeping love and intimacy alive in committed relationships', year: '1997', link: '', tier: 1 },
      { id: '2', text: 'Frederick, D. A., Lever, J., Gillespie, B. J., & Garcia, J. R. (2017). What keeps passion alive? Sexual satisfaction is associated with sexual communication, mood setting, sexual variety, oral sex, orgasm, and sex frequency in a national U.S. study. Journal of Sex Research, 54(2), 186–201. https://doi.org/10.1080/00224499.2015.1137854', source: 'Journal of Sex Research', year: '2017', link: '', tier: 1 },
      { id: '3', text: 'Gottman, J. M., & Silver, N. (2012). What makes love last? How to build trust and avoid betrayal. Simon & Schuster.', source: 'What makes love last? How to build trust and avoid betrayal', year: '2012', link: '', tier: 1 },
      { id: '4', text: 'Mallory, A. B., Stanton, A. M., & Handy, A. B. (2019). Couples\' sexual communication and dimensions of sexual function: A meta-analysis. Journal of Sex Research, 56(7), 882–898. https://doi.org/10.1080/00224499.2019.1568375', source: 'Journal of Sex Research', year: '2019', link: '', tier: 1 },
      { id: '5', text: 'Byers, E. S. (2011). Beyond the birds and the bees and was it good for you?: Thirty years of research on sexual communication. Canadian Psychology, 52(1), 20–28. https://doi.org/10.1037/a0022048', source: 'Canadian Psychology', year: '2011', link: '', tier: 1 },
      { id: '6', text: 'Kleinplatz, P. J., Ménard, A. D., Paquet, M. P., Paradis, N., Campbell, M., Zuccarino, D., & Mehak, L. (2009). The components of optimal sexuality: A portrait of "great sex." Canadian Journal of Human Sexuality, 18(1-2), 1–13.', source: 'Canadian Journal of Human Sexuality', year: '2009', link: '', tier: 1 },
      { id: '7', text: 'American Association of Sexuality Educators, Counselors, and Therapists. (2023). Practice guidelines for sexuality counseling and therapy. AASECT.', source: 'Practice guidelines for sexuality counseling and therapy', year: '2023', link: '', tier: 3 },
      { id: '8', text: 'Basson, R. (2001). Using a different model for female sexual response to address women\'s problematic low sexual desire. Journal of Sex & Marital Therapy, 27(5), 395–403. https://doi.org/10.1080/713846827', source: 'Journal of Sex & Marital Therapy', year: '2001', link: '', tier: 1 },
      { id: '9', text: 'McCarthy, B., & McCarthy, E. (2003). Rekindling desire: A step-by-step program to help low-sex and no-sex marriages. Brunner-Routledge.', source: 'Rekindling desire: A step-by-step program to help low-sex and no-sex marriages', year: '2003', link: '', tier: 5 },
      { id: '10', text: 'Metz, M. E., & McCarthy, B. W. (2007). The "Good-Enough Sex" model for couple sexual satisfaction. Sexual and Relationship Therapy, 22(3), 351–362. https://doi.org/10.1080/14681990601013492', source: 'Sexual and Relationship Therapy', year: '2007', link: '', tier: 1 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            The belief that love should automatically produce great sex is among the most damaging myths in relationship psychology. This assumption—that emotional connection translates seamlessly into physical compatibility without effort, communication, or learning—sets couples up for silent suffering when their sexual experiences fall short of the effortless ideal.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          Research by David Schnarch, a clinical psychologist specializing in sexuality and relationships, found that the most sexually satisfied couples were not those with the highest initial chemistry but those who developed what he termed &quot;sexual crucible&quot;...
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          A large-scale study of over 38,000 couples published in the *Journal of Sex Research* identified communication about sexual preferences as the strongest predictor of sexual satisfaction, surpassing frequency of sex, relationship duration, and physica...
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Passionate marriage: Keeping love and intimacy alive in committed relationships" year="1997" tier={1} />
          <Citation id="2" index={2} source="Journal of Sex Research" year="2017" tier={1} />
          <Citation id="3" index={3} source="What makes love last? How to build trust and avoid betrayal" year="2012" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-SEX-043 | Myth: Asexuality Means Something Is Wrong With You
  // --------------------------------------------------------------------------
  {
    id: catId(49),
    slug: 'myth-asexuality-means-something-wrong',
    title: 'Myth: Asexuality Means Something Is Wrong With You',
    description: 'Debunking the myth that asexuality is a disorder, exploring the research on asexual identity, the asexual spectrum, and how pathologization causes harm.',
    image: '/images/articles/cat28/cover-049.svg',
    category: CATEGORY_SEXUALITY_INTIMACY,
    readTime: 10,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['asexuality myth', 'asexual spectrum', 'ace identity', 'sexual orientation', 'HSDD'],

    summary: 'Asexuality—characterized by a persistent lack of sexual attraction to others—has been systematically misunderstood, pathologized, and erased throughout much of psychiatric and cultural history. Despite affecting an estimated 1% of the population, asexuality was long conflated with sexual dysfunction, hormonal imbalance, or the aftermath of trauma. Contemporary research, led by scholars including Anthony Bogaert at Brock University, has established asexuality as a legitimate sexual orientation characterized by its own internal diversity, community, and spectrum of experience. The removal of distress as a defining criterion in current diagnostic frameworks means that asexuality is not a disorder when it is experienced without personal distress. Understanding asexuality as a valid orientation rather than a pathology is essential for clinical practice, for the wellbeing of asexual individuals, and for a more complete understanding of human sexual diversity.',

    keyFacts: [
      { text: 'Anthony Bogaert\'s landmark 2004 analysis of the UK National Survey of Sexual Attitudes and Lifestyles estimated that approximately 1% of the population identifies as asexual, making asexuality comparable in prevalence to several well-recognized sexua...', citationIndex: 1 },
      { text: 'The DSM-5 explicitly notes that a self-identified asexual orientation is an exclusion criterion for the diagnosis of Female Sexual Interest/Arousal Disorder and Male Hypoactive Sexual Desire Disorder, formally recognizing that asexuality is not a cli...', citationIndex: 2 },
      { text: 'Research published in *Archives of Sexual Behavior* found that asexual individuals who embraced their identity reported comparable levels of psychological wellbeing to sexual individuals, while those who experienced external pressure to be sexual or ...', citationIndex: 3 },
      { text: 'The asexual spectrum encompasses diverse experiences including demisexuality (sexual attraction only after strong emotional bonding), gray-asexuality (rare or low-intensity sexual attraction), and aromantic asexuality (absence of both sexual and roma...', citationIndex: 4 },
      { text: 'A systematic review in the *Journal of Sex Research* concluded that asexuality is best understood as a sexual orientation rather than a disorder, noting that asexual individuals show stable patterns of low sexual attraction that are consistent over t...', citationIndex: 5 },
    ],

    sparkMoment: 'Not wanting what the world insists you should want is not evidence of damage. For the approximately one in a hundred people who experience the world without sexual attraction, the most radical act of self-acceptance may be believing their own experience over the insistence of a culture that cannot imagine it.',

    practicalExercise: {
      title: 'If you think you might be asexual',
      steps: [
        { title: 'If you think you might be asexual', description: ', explore community resources such as the Asexual Visibility and Education Network (AVEN), which provides information, forums, and community support for people across the asexual spectrum.' },
        { title: 'Learn the vocabulary.', description: 'Understanding terms like demisexual, gray-ace, aromantic, and the split attraction model (which distinguishes sexual attraction from romantic attraction) can help clarify experiences that may have previously felt confusing.' },
        { title: 'If a partner, friend, or family member has come out as asexual', description: ', resist the urge to offer explanations or suggest solutions. Instead, ask what their experience is like and what kind of support they want from you.' },
        { title: 'If you are a clinician', description: ', review the DSM-5\'s exclusion criteria for sexual desire disorders and familiarize yourself with current research on asexuality to ensure that you do not inadvertently pathologize a patient\'s valid orientation.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    },

    citations: [
      { id: '1', text: 'Bogaert, A. F. (2004). Asexuality: Prevalence and associated factors in a national probability sample. Journal of Sex Research, 41(3), 279–287. https://doi.org/10.1080/00224490409552235', source: 'Journal of Sex Research', year: '2004', link: '', tier: 1 },
      { id: '2', text: 'American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.). APA Publishing.', source: 'Diagnostic and statistical manual of mental disorders', year: '2013', link: '', tier: 3 },
      { id: '3', text: 'Brotto, L. A., Knudson, G., Inskip, J., Rhodes, K., & Erskine, Y. (2010). Asexuality: A mixed-methods approach. Archives of Sexual Behavior, 39(3), 599–618. https://doi.org/10.1007/s10508-008-9434-x', source: 'Archives of Sexual Behavior', year: '2010', link: '', tier: 1 },
      { id: '4', text: 'Carrigan, M. (2011). There\'s more to life than sex? Difference and commonality within the asexual community. Sexualities, 14(4), 462–478. https://doi.org/10.1177/1363460711406462', source: 'Sexualities', year: '2011', link: '', tier: 1 },
      { id: '5', text: 'Yule, M. A., Brotto, L. A., & Gorzalka, B. B. (2014). A validated measure of no sexual attraction: The Asexuality Identification Scale. Psychological Assessment, 26(4), 1091–1099. https://doi.org/10.1037/a0036556', source: 'Psychological Assessment', year: '2014', link: '', tier: 1 },
      { id: '6', text: 'Bogaert, A. F. (2012). Understanding asexuality. Rowman & Littlefield.', source: 'Understanding asexuality', year: '2012', link: '', tier: 1 },
      { id: '7', text: 'Bogaert, A. F. (2015). Asexuality: What it is and why it matters. Journal of Sex Research, 52(4), 362–379. https://doi.org/10.1080/00224499.2015.1015713', source: 'Journal of Sex Research', year: '2015', link: '', tier: 1 },
      { id: '8', text: 'Brotto, L. A., & Yule, M. (2017). Asexuality: Sexual orientation, paraphilia, sexual dysfunction, or none of the above? Archives of Sexual Behavior, 46(3), 619–627. https://doi.org/10.1007/s10508-016-0802-7', source: 'Archives of Sexual Behavior', year: '2017', link: '', tier: 1 },
      { id: '9', text: 'Yule, M. A., Brotto, L. A., & Gorzalka, B. B. (2013). Mental health and interpersonal functioning in self-identified asexual men and women. Psychology & Sexuality, 4(2), 136–151. https://doi.org/10.1080/19419899.2013.774162', source: 'Psychology & Sexuality', year: '2013', link: '', tier: 1 },
      { id: '10', text: 'Przybylo, E. (2019). Asexual erotics: Intimate readings of compulsory sexuality. Ohio State University Press.', source: 'Asexual erotics: Intimate readings of compulsory sexuality', year: '2019', link: '', tier: 5 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            Asexuality—characterized by a persistent lack of sexual attraction to others—has been systematically misunderstood, pathologized, and erased throughout much of psychiatric and cultural history. Despite affecting an estimated 1% of the population, asexuality was long conflated with sexual dysfunction, hormonal imbalance, or the aftermath of trauma.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          Anthony Bogaert&apos;s landmark 2004 analysis of the UK National Survey of Sexual Attitudes and Lifestyles estimated that approximately 1% of the population identifies as asexual, making asexuality comparable in prevalence to several well-recognized sexua...
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          The DSM-5 explicitly notes that a self-identified asexual orientation is an exclusion criterion for the diagnosis of Female Sexual Interest/Arousal Disorder and Male Hypoactive Sexual Desire Disorder, formally recognizing that asexuality is not a cli...
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Journal of Sex Research" year="2004" tier={1} />
          <Citation id="2" index={2} source="Diagnostic and statistical manual of mental disorders" year="2013" tier={3} />
          <Citation id="3" index={3} source="Archives of Sexual Behavior" year="2010" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },

  // --------------------------------------------------------------------------
  // PSY-SEX-044 | Myth: Men Always Want Sex and Women Never Do
  // --------------------------------------------------------------------------
  {
    id: catId(50),
    slug: 'myth-men-always-want-sex-women-never',
    title: 'Myth: Men Always Want Sex and Women Never Do',
    description: 'Debunking the gendered desire myth, exploring how stereotypes about male and female sexual desire harm everyone, with research on desire variability across genders.',
    image: '/images/articles/cat28/cover-050.svg',
    category: CATEGORY_SEXUALITY_INTIMACY,
    readTime: 10,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['gendered desire myth', 'male sexual desire', 'female sexual desire', 'desire discrepancy', 'sexual stereotypes'],

    summary: 'The belief that men are perpetually desirous and women are inherently reluctant represents one of the most stubborn and damaging sexual stereotypes in contemporary culture. This gendered narrative—men as insatiable pursuers, women as reluctant gatekeepers—distorts the lived experience of millions of people whose desires don\'t conform to these rigid scripts. Research consistently demonstrates that sexual desire varies enormously within genders, that overlap between male and female desire distributions is substantial, and that contextual factors (stress, relationship quality, hormonal fluctuations, sleep) influence desire at least as powerfully as biological sex. The stereotype harms everyone: men who experience low desire feel emasculated and ashamed; women who experience high desire feel aberrant and unfeminine; and couples in which the woman has higher desire than the man face particular stigma and confusion. Dismantling this myth is essential for a more accurate and compassionate understanding of human sexual desire.',

    keyFacts: [
      { text: 'A meta-analysis by Baumeister, Catanese, and Vohs (2001) found that while men report higher average levels of spontaneous sexual desire, the within-gender variability for both men and women is far greater than the between-gender difference—meaning th...', citationIndex: 1 },
      { text: 'Research published in the *Journal of Sex Research* found that in approximately 30% of heterosexual couples, the woman reports higher sexual desire than the man—a pattern that directly contradicts the "men always want it" stereotype', citationIndex: 2 },
      { text: 'The Kinsey Institute\'s research on desire discrepancy documented that couples in which the woman has higher desire than the man report the greatest relationship distress, not because the pattern itself is problematic but because it violates gendered ...', citationIndex: 3 },
      { text: 'Meredith Chivers\' psychophysiological research at Queen\'s University demonstrated that women\'s genital arousal responses are broadly responsive to a wide range of sexual stimuli, challenging the assumption that women\'s sexual response is inherently m...', citationIndex: 4 },
      { text: 'The World Health Organization\'s framework for sexual health explicitly rejects gendered assumptions about appropriate levels of sexual desire, emphasizing that sexual wellbeing is individually defined and should not be measured against normative expe...', citationIndex: 5 },
    ],

    sparkMoment: 'Your desire—its presence, its absence, its rhythms, and its conditions—belongs to you, not to a stereotype. The man who doesn\'t want sex tonight and the woman who does are both having completely valid human experiences. The question is never whether your desire matches the script. The question is whether you and your partner can build a shared sexual life based on who you actually are.',

    practicalExercise: {
      title: 'Notice where you\'ve internalized the script.',
      steps: [
        { title: 'Notice where you\'ve internalized the script.', description: 'When you feel desire—or don\'t feel it—do you immediately evaluate whether your experience matches what "someone like you" is supposed to feel? Try naming the stereotype and separating it from your actual experience.' },
        { title: 'If you\'re the higher-desire partner regardless of gender', description: ', know that your experience is common and valid. Desire discrepancy exists in roughly half of all long-term relationships, and the gendered direction varies widely.' },
        { title: 'If you\'re the lower-desire partner', description: ', particularly if you\'re male, know that low desire in men is common, multi-causal, and does not reflect on your masculinity or your love for your partner.' },
        { title: 'Talk about desire patterns explicitly.', description: 'Sharing what increases and decreases your desire—without framing it through gendered expectations—opens space for creative solutions rather than mutual blame.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    },

    citations: [
      { id: '1', text: 'Baumeister, R. F., Catanese, K. R., & Vohs, K. D. (2001). Is there a gender difference in strength of sex drive? Theoretical views, conceptual distinctions, and a review of relevant evidence. Personality and Social Psychology Review, 5(3), 242–273. https://doi.org/10.1207/S15327957PSPR0503_5', source: 'Personality and Social Psychology Review', year: '2001', link: '', tier: 1 },
      { id: '2', text: 'Mark, K. P., & Murray, S. H. (2012). Gender differences in desire discrepancy as a predictor of sexual and relationship satisfaction in a college sample of heterosexual romantic relationships. Journal of Sex & Marital Therapy, 38(2), 198–215. https://doi.org/10.1080/0092623X.2011.606877', source: 'Journal of Sex & Marital Therapy', year: '2012', link: '', tier: 1 },
      { id: '3', text: 'Mark, K. P. (2015). Sexual desire discrepancy. Current Sexual Health Reports, 7(3), 198–202. https://doi.org/10.1007/s11930-015-0057-7', source: 'Current Sexual Health Reports', year: '2015', link: '', tier: 1 },
      { id: '4', text: 'Chivers, M. L., Seto, M. C., Lalumière, M. L., Laan, E., & Grimbos, T. (2010). Agreement of self-reported and genital measures of sexual arousal in men and women: A meta-analysis. Archives of Sexual Behavior, 39(1), 5–56. https://doi.org/10.1007/s10508-009-9556-9', source: 'Archives of Sexual Behavior', year: '2010', link: '', tier: 1 },
      { id: '5', text: 'Diamond, L. M. (2008). Sexual fluidity: Understanding women\'s love and desire. Harvard University Press.', source: 'Sexual fluidity: Understanding women\'s love and desire', year: '2008', link: '', tier: 5 },
      { id: '6', text: 'Martin, W. (2018). Untrue: Why nearly everything we believe about women, lust, and infidelity is wrong and how the new science can set us free. Little, Brown Spark.', source: 'Untrue: Why nearly everything we believe about women, lust, and infidelity is wrong and how the new science can set us free', year: '2018', link: '', tier: 1 },
      { id: '7', text: 'Murray, S. H., Milhausen, R. R., Graham, C. A., & Kuczynski, L. (2017). A qualitative exploration of factors that affect sexual desire among men aged 30 to 65 in long-term relationships. Journal of Sex Research, 54(3), 319–330. https://doi.org/10.1080/00224499.2016.1168352', source: 'Journal of Sex Research', year: '2017', link: '', tier: 1 },
      { id: '8', text: 'van Anders, S. M. (2015). Beyond sexual orientation: Integrating gender/sex and diverse sexualities via sexual configurations theory. Archives of Sexual Behavior, 44(5), 1177–1213. https://doi.org/10.1007/s10508-015-0490-8', source: 'Archives of Sexual Behavior', year: '2015', link: '', tier: 1 },
      { id: '9', text: 'Trivers, R. L. (1972). Parental investment and sexual selection. In B. Campbell (Ed.), Sexual selection and the descent of man (pp. 136–179). Aldine.', source: 'Sexual selection and the descent of man', year: '1972', link: '', tier: 1 },
      { id: '10', text: 'World Health Organization. (2006). Defining sexual health: Report of a technical consultation on sexual health. WHO.', source: 'Defining sexual health: Report of a technical consultation on sexual health', year: '2006', link: '', tier: 2 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            The belief that men are perpetually desirous and women are inherently reluctant represents one of the most stubborn and damaging sexual stereotypes in contemporary culture. This gendered narrative—men as insatiable pursuers, women as reluctant gatekeepers—distorts the lived experience of millions of people whose desires don&apos;t conform to these rigid scripts.
          </p>
        </div>

        <ArticleCallout variant="key-takeaway">
          A meta-analysis by Baumeister, Catanese, and Vohs (2001) found that while men report higher average levels of spontaneous sexual desire, the within-gender variability for both men and women is far greater than the between-gender difference—meaning th...
        </ArticleCallout>

        <ArticleCallout variant="did-you-know">
          Research published in the *Journal of Sex Research* found that in approximately 30% of heterosexual couples, the woman reports higher sexual desire than the man—a pattern that directly contradicts the &quot;men always want it&quot; stereotype
        </ArticleCallout>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Personality and Social Psychology Review" year="2001" tier={1} />
          <Citation id="2" index={2} source="Journal of Sex & Marital Therapy" year="2012" tier={1} />
          <Citation id="3" index={3} source="Current Sexual Health Reports" year="2015" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
