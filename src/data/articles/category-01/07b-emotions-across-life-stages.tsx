 
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_EMOTIONAL_REGULATION, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ProgressSteps,
  ArticleAccordion,
  StatCard,
  ComparisonTable,
} from '../../../components/article/blocks';

export const emotionsAcrossLifeStagesArticlesB: Article[] = [
  {
    id: catId(66),
    slug: 'how-major-life-transitions-reshape-emotional-landscape',
    title: 'How Major Life Transitions Reshape Your Emotional Landscape',
    description: 'Understanding how significant life changes affect your emotional world and practical strategies for navigating transitions with resilience.',
    image: "/images/articles/cat01/cover-066.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Life Transitions', 'Change', 'Adaptation', 'Resilience'],
    citations: [
      {
        id: '1',
        text: 'Life transitions and mental health: A review',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101871',
        tier: 1,
      },
      {
        id: '2',
        text: 'The emotional impact of major life events',
        source: 'Journal of Personality and Social Psychology',
        year: '2019',
        link: 'https://doi.org/10.1037/pspp0000233',
        tier: 1,
      },
      {
        id: '3',
        text: 'Transition theory in counseling',
        source: 'Counseling Psychologist',
        year: '2020',
        link: 'https://doi.org/10.1177/0011000020931019',
        tier: 1,
      },
      {
        id: '4',
        text: 'Coping with life transitions',
        source: 'American Psychologist',
        year: '2019',
        link: 'https://doi.org/10.1037/amp0000428',
        tier: 1,
      },
      {
        id: '5',
        text: 'Identity reconstruction after major life changes',
        source: 'Identity: An International Journal',
        year: '2020',
        link: 'https://doi.org/10.1080/15283488.2020.1737431',
        tier: 1,
      },
      {
        id: '6',
        text: 'Resilience during life transitions',
        source: 'Developmental Psychology',
        year: '2021',
        link: 'https://doi.org/10.1037/dev0001146',
        tier: 1,
      },
      {
        id: '7',
        text: 'Social support and transition outcomes',
        source: 'Social Science & Medicine',
        year: '2020',
        link: 'https://doi.org/10.1016/j.socscimed.2020.113042',
        tier: 1,
      },
      {
        id: '8',
        text: 'Life Changes and Stress',
        source: 'American Psychological Association',
        year: '2021',
        link: 'https://www.apa.org/topics/stress/life-changes',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Major life transitions—moving, career changes, relationship shifts, health diagnoses—don't just alter circumstances; they fundamentally reshape your emotional world and sense of identity.
          </p>
          <p className="mb-6">
            Even positive transitions create stress because change requires adaptation <Citation id="1" index={1} source="Clinical Psychology Review" year="2020" tier={1} />. Understanding the emotional arc of transitions helps you navigate them with greater self-compassion and realistic expectations.
          </p>
        </div>

        <h2 id="transition-phases" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Three Phases of Transition
        </h2>
        <p className="mb-6">
          Psychologist William Bridges identified that all transitions follow a pattern: endings, neutral zone, and new beginnings <Citation id="3" index={3} source="Counseling Psychologist" year="2020" tier={1} />. Each phase brings distinct emotional challenges.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Phase 1: Ending/Letting Go',
              description: (
                <div>
                  <p className="mb-2">The transition begins with loss—even if you chose the change. Grief, anxiety, and resistance are normal as you leave the familiar.</p>
                  <p><strong>Common feelings:</strong> Sadness, fear, denial, relief (if leaving difficult situation), nostalgia, identity confusion</p>
                </div>
              ),
            },
            {
              title: 'Phase 2: Neutral Zone',
              description: (
                <div>
                  <p className="mb-2">The in-between where the old is gone but the new isn't established. This is often the hardest phase—disorienting and ambiguous.</p>
                  <p><strong>Common feelings:</strong> Confusion, vulnerability, emptiness, impatience, creative possibility, questioning everything</p>
                </div>
              ),
            },
            {
              title: 'Phase 3: New Beginning',
              description: (
                <div>
                  <p className="mb-2">New patterns solidify, identity reforms around changed circumstances, and a sense of normalcy returns—though it's a different normal.</p>
                  <p><strong>Common feelings:</strong> Hope, energy, curiosity, tentative optimism, occasional grief for what was lost</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="emotional-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Transitions Feel So Intense
        </h2>
        <p className="mb-6">
          Major life changes affect multiple emotional systems simultaneously <Citation id="2" index={2} source="Journal of Personality and Social Psychology" year="2019" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Identity disruption:</strong> "Who am I?" questions arise when defining roles change (parent, employee, partner, healthy person)</li>
          <li><strong>Control loss:</strong> Uncertainty about outcomes triggers anxiety and hypervigilance</li>
          <li><strong>Grief for the old:</strong> Even unwanted situations become familiar; losing them still hurts</li>
          <li><strong>Decision fatigue:</strong> Everything feels new, requiring constant choices when routines dissolve</li>
          <li><strong>Social network shifts:</strong> Relationships may change or end, creating loneliness during vulnerable times</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>Research shows that positive transitions (marriage, promotion, new baby) can be as stressful as negative ones (divorce, job loss, illness) because all change requires psychological adaptation <Citation id="4" index={4} source="American Psychologist" year="2019" tier={1} />. Struggling with "good" changes doesn't mean something is wrong with you.</p>
        </ArticleCallout>

        <h2 id="common-transitions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Life Transitions and Their Emotional Signatures
        </h2>

        <ComparisonTable
          title="Emotional Patterns by Transition Type"
          columns={['Transition', 'Primary Emotions', 'Identity Challenge']}
          items={[
            {
              feature: 'Career change',
              values: ['Excitement + anxiety + imposter syndrome', 'Who am I without my professional identity?'],
            },
            {
              feature: 'Becoming a parent',
              values: ['Joy + overwhelm + loss of autonomy', 'Integrating parent role with previous self'],
            },
            {
              feature: 'Relationship ending',
              values: ['Grief + relief + fear of future', 'Redefining self as single person'],
            },
            {
              feature: 'Health diagnosis',
              values: ['Shock + anger + adaptation', 'Patient identity vs. whole person'],
            },
            {
              feature: 'Relocation',
              values: ['Loneliness + possibility + disorientation', 'Belonging in new place/community'],
            },
          ]}
        />

        <h2 id="identity-reconstruction" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Rebuilding Identity After Change
        </h2>
        <p className="mb-6">
          Major transitions often require identity reconstruction—creating a new sense of self that incorporates the change <Citation id="5" index={5} source="Identity: An International Journal" year="2020" tier={1} />. This is active emotional work, not passive adjustment.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'acknowledge',
              title: 'Acknowledge the Loss',
              content: (
                <p>Name what you've lost, even if the change was chosen. "I'm no longer [previous identity]" needs to be said and felt before moving forward.</p>
              ),
            },
            {
              id: 'explore',
              title: 'Explore the Neutral Zone',
              content: (
                <p>Use the in-between time to experiment. Try new activities, relationships, routines. Not everything will stick—that's the point of exploration.</p>
              ),
            },
            {
              id: 'narrative',
              title: 'Create a New Narrative',
              content: (
                <p>How does this change fit into your life story? Finding meaning in transitions helps integrate them rather than viewing them as disruptions.</p>
              ),
            },
            {
              id: 'maintain',
              title: 'Maintain Continuity',
              content: (
                <p>Identify what remains constant despite the change. Core values, important relationships, cherished practices—these threads provide stability.</p>
              ),
            },
          ]}
        />

        <h2 id="building-resilience" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Building Resilience Through Transitions
        </h2>
        <p className="mb-6">
          Research identifies factors that help people navigate transitions successfully <Citation id="6" index={6} source="Developmental Psychology" year="2021" tier={1} />:
        </p>

        <StatCard
          stats={[
            { value: 65, suffix: '%', label: 'Better outcomes with strong social support' },
            { value: 12, suffix: '+', label: 'Months typical major transition takes' },
            { value: 40, suffix: '%', label: 'Report personal growth from difficult transitions' },
          ]}
          source="Developmental Psychology, 2021"
        />

        <p className="mb-6 mt-6">
          Social support is the strongest predictor of positive transition outcomes <Citation id="7" index={7} source="Social Science & Medicine" year="2020" tier={1} />. Talking to others who've been through similar changes provides both practical guidance and emotional validation.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          Transitions are hard; clinical struggles need support <Citation id="8" index={8} source="American Psychological Association" year="2021" tier={3} />. Consider therapy if:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>You're stuck in one phase (especially denial or despair) for extended periods</li>
          <li>Daily functioning significantly impaired for more than a few weeks</li>
          <li>Using substances to cope with transition stress</li>
          <li>Experiencing panic attacks, severe anxiety, or depression</li>
          <li>Relationship problems intensifying during transition</li>
          <li>Thoughts of self-harm or that life isn't worth living</li>
        </ul>

        <p className="mb-6">
          Transitions are some of life's hardest emotional work. Seeking support doesn't mean you're weak—it means you're taking the process seriously.
        </p>
      </>
    ),
  },

  {
    id: catId(67),
    slug: 'emotional-regulation-during-pregnancy-and-postpartum',
    title: 'Emotional Regulation During Pregnancy and Postpartum',
    description: 'Understanding the hormonal and psychological emotional changes during pregnancy and postpartum, with strategies for navigating this intense period.',
    image: "/images/articles/cat01/cover-067.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Pregnancy', 'Postpartum', 'Maternal Mental Health', 'Perinatal Mood'],
    citations: [
      {
        id: '1',
        text: 'Hormonal changes and mood during pregnancy',
        source: 'Obstetrics & Gynecology',
        year: '2020',
        link: 'https://doi.org/10.1097/AOG.0000000000003642',
        tier: 1,
      },
      {
        id: '2',
        text: 'Perinatal mood and anxiety disorders: A review',
        source: 'JAMA Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1001/jamapsychiatry.2020.4055',
        tier: 1,
      },
      {
        id: '3',
        text: 'Postpartum depression: Epidemiology and treatment',
        source: 'The Lancet',
        year: '2020',
        link: 'https://doi.org/10.1016/S0140-6736(20)30047-2',
        tier: 1,
      },
      {
        id: '4',
        text: 'Emotional changes in pregnancy: Biological and psychological factors',
        source: 'Journal of Affective Disorders',
        year: '2019',
        link: 'https://doi.org/10.1016/j.jad.2019.08.007',
        tier: 1,
      },
      {
        id: '5',
        text: 'Postpartum anxiety: Prevalence and risk factors',
        source: "Archives of Women's Mental Health",
        year: '2020',
        link: 'https://doi.org/10.1007/s00737-020-01024-0',
        tier: 1,
      },
      {
        id: '6',
        text: 'Sleep deprivation and postpartum mood',
        source: 'Sleep Medicine Reviews',
        year: '2021',
        link: 'https://doi.org/10.1016/j.smrv.2020.101399',
        tier: 1,
      },
      {
        id: '7',
        text: 'Social support and perinatal mental health',
        source: 'BMC Pregnancy and Childbirth',
        year: '2020',
        link: 'https://doi.org/10.1186/s12884-020-03029-2',
        tier: 1,
      },
      {
        id: '8',
        text: 'Maternal Mental Health',
        source: 'National Institute of Mental Health',
        year: '2021',
        link: 'https://www.nimh.nih.gov/health/publications/perinatal-depression',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Pregnancy and postpartum bring dramatic hormonal shifts that directly affect emotional regulation—what you're feeling isn't 'just in your head'; it's biochemistry reshaping your nervous system.
          </p>
          <p className="mb-6">
            Understanding these changes helps distinguish normal adjustment from clinical conditions requiring treatment <Citation id="1" index={1} source="Obstetrics & Gynecology" year="2020" tier={1} />. Both deserve attention and support.
          </p>
        </div>

        <h2 id="pregnancy-emotions" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Emotional Changes During Pregnancy
        </h2>
        <p className="mb-6">
          Pregnancy hormones—estrogen, progesterone, cortisol—increase 10-fold or more, directly affecting neurotransmitter systems that regulate mood <Citation id="4" index={4} source="Journal of Affective Disorders" year="2019" tier={1} />. This creates heightened emotional sensitivity and reactivity.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'first',
              title: 'First Trimester (Weeks 1-12)',
              content: (
                <div>
                  <p className="mb-2"><strong>Common emotions:</strong> Anxiety, ambivalence (even in wanted pregnancies), fatigue-related irritability, mood swings</p>
                  <p><strong>Why:</strong> Rapid hormone changes, physical symptoms (nausea, exhaustion), processing identity shift to parent</p>
                </div>
              ),
            },
            {
              id: 'second',
              title: 'Second Trimester (Weeks 13-26)',
              content: (
                <div>
                  <p className="mb-2"><strong>Common emotions:</strong> Often more stable, increased excitement, some anxiety about health/birth</p>
                  <p><strong>Why:</strong> Hormones stabilizing, physical discomfort usually lessens, pregnancy becomes "real" with movement</p>
                </div>
              ),
            },
            {
              id: 'third',
              title: 'Third Trimester (Weeks 27-40)',
              content: (
                <div>
                  <p className="mb-2"><strong>Common emotions:</strong> Nesting urgency, fear about labor, impatience, sleep-related irritability</p>
                  <p><strong>Why:</strong> Physical discomfort increases, anticipation builds, sleep disruption worsens emotional regulation</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="postpartum-adjustment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Postpartum Emotional Landscape
        </h2>
        <p className="mb-6">
          After birth, hormone levels plummet—estrogen and progesterone drop to pre-pregnancy levels within days <Citation id="1" index={1} source="Obstetrics & Gynecology" year="2020" tier={1} />. This rapid withdrawal affects mood systems similarly to other hormone crashes, while simultaneously managing a newborn's 24/7 needs.
        </p>

        <StatCard
          stats={[
            { value: 80, suffix: '%', label: "Experience 'baby blues' in first 2 weeks" },
            { value: 15, suffix: '%', label: 'Develop postpartum depression' },
            { value: 10, suffix: '%', label: 'Experience postpartum anxiety' },
          ]}
          source="Perinatal Mental Health Research, 2020-2021"
        />

        <h2 id="baby-blues-vs-ppd" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Baby Blues vs. Postpartum Depression
        </h2>
        <p className="mb-6">
          Distinguishing normal adjustment from clinical depression is critical <Citation id="2" index={2} source="JAMA Psychiatry" year="2021" tier={1} />:
        </p>

        <ComparisonTable
          title="Baby Blues vs. Postpartum Depression"
          columns={['Feature', 'Baby Blues', 'Postpartum Depression']}
          items={[
            {
              feature: 'Timing',
              values: ['Days 2-5 after birth', 'Anytime in first year (often weeks 2-8)'],
            },
            {
              feature: 'Duration',
              values: ['1-2 weeks', 'More than 2 weeks without improvement'],
            },
            {
              feature: 'Severity',
              values: ['Mild, manageable', 'Significantly impairs functioning'],
            },
            {
              feature: 'Pattern',
              values: ['Comes and goes, improves gradually', 'Persistent, may worsen'],
            },
            {
              feature: 'Treatment',
              values: ['Support, rest, usually resolves', 'Requires professional treatment'],
            },
          ]}
        />

        <ArticleCallout variant="warning">
          <p><strong>Red flags requiring immediate help:</strong> Thoughts of harming yourself or baby, inability to care for baby, hallucinations, extreme confusion or agitation, severe insomnia even when baby sleeps. These may indicate postpartum psychosis (rare but serious) or severe PPD.</p>
        </ArticleCallout>

        <h2 id="postpartum-anxiety" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Postpartum Anxiety: The Overlooked Condition
        </h2>
        <p className="mb-6">
          Postpartum anxiety affects as many people as postpartum depression but receives less attention <Citation id="5" index={5} source="Archives of Women's Mental Health" year="2020" tier={1} />. Symptoms include:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Constant worry about baby's health or safety beyond normal parental concern</li>
          <li>Intrusive, disturbing thoughts (often about harm coming to baby)</li>
          <li>Physical symptoms: racing heart, difficulty breathing, dizziness</li>
          <li>Inability to relax or sleep even when opportunity exists</li>
          <li>Compulsive checking or avoidance behaviors</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>Intrusive thoughts about baby being harmed are common and don't mean you'll act on them. However, if these thoughts are distressing and persistent, speak to a healthcare provider about postpartum OCD, a treatable condition.</p>
        </ArticleCallout>

        <h2 id="sleep-factor" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Sleep Deprivation Factor
        </h2>
        <p className="mb-6">
          Sleep disruption is the strongest modifiable risk factor for postpartum mood disorders <Citation id="6" index={6} source="Sleep Medicine Reviews" year="2021" tier={1} />. Even a few nights of interrupted sleep significantly impairs emotional regulation.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Prioritize Sleep Opportunities',
              description: (
                <p>Sleep when baby sleeps isn't trite advice—it's essential for emotional health. Let other tasks go if it means getting sleep.</p>
              ),
            },
            {
              title: 'Accept Help',
              description: (
                <p>Let others do household tasks, hold baby while you nap, or take a night feeding shift. Pride about 'doing it alone' isn't worth your mental health.</p>
              ),
            },
            {
              title: 'Shift Sleep if Possible',
              description: (
                <p>Having a partner take one longer stretch (4-5 hours) allows your brain to complete some sleep cycles, which improves mood more than fragmented rest.</p>
              ),
            },
          ]}
        />

        <h2 id="support-strategies" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Emotional Regulation Strategies
        </h2>
        <p className="mb-6">
          While hormones and sleep deprivation create real limitations, some strategies help <Citation id="7" index={7} source="BMC Pregnancy and Childbirth" year="2020" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Lower the bar:</strong> Survival mode is appropriate. Good enough parenting is genuinely good enough.</li>
          <li><strong>Connect with others:</strong> Isolation worsens perinatal mood disorders. Parent groups, text support, or therapy all help.</li>
          <li><strong>Move your body:</strong> Gentle movement (walking, stretching) when medically cleared improves mood</li>
          <li><strong>Nutrition matters:</strong> Blood sugar crashes worsen emotional volatility. Regular, protein-rich meals help stabilize mood.</li>
          <li><strong>Ask for what you need:</strong> People want to help but don't know how. Be specific: "Bring food,", "Hold baby while I shower,", "Listen without advice."</li>
        </ul>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          Perinatal mood and anxiety disorders are the most common complication of pregnancy, affecting 1 in 7 people <Citation id="3" index={3} source="The Lancet" year="2020" tier={1} />. Treatment works—therapy, medication, and support all improve outcomes <Citation id="8" index={8} source="National Institute of Mental Health" year="2021" tier={2} />.
        </p>

        <p className="mb-6">
          <strong>Seek help if:</strong>
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Symptoms persist beyond 2 weeks postpartum</li>
          <li>You can't enjoy anything or bond with baby</li>
          <li>Anxiety or worry significantly interferes with daily life</li>
          <li>You have thoughts of harming yourself or baby</li>
          <li>Physical symptoms (panic, insomnia) are severe</li>
          <li>Your gut says something isn't right</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>Resources: PSI Helpline (1-800-944-4773), Postpartum Support International (postpartum.net), Your OB/midwife, 988 Suicide & Crisis Lifeline for urgent concerns</p>
        </ArticleCallout>
      </>
    ),
  },

  {
    id: catId(68),
    slug: 'emotions-and-menopause-understanding-hormonal-emotional-changes',
    title: 'Emotions and Menopause: Understanding Hormonal Emotional Changes',
    description: 'How hormonal shifts during perimenopause and menopause affect mood, emotional regulation, and mental health, with evidence-based coping strategies.',
    image: "/images/articles/cat01/cover-068.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Menopause', 'Hormones', "Women's Health", 'Midlife'],
    citations: [
      {
        id: '1',
        text: 'Menopause and mood: Current knowledge and clinical recommendations',
        source: 'Menopause',
        year: '2020',
        link: 'https://doi.org/10.1097/GME.0000000000001524',
        tier: 1,
      },
      {
        id: '2',
        text: 'Depression during the menopausal transition',
        source: 'JAMA Psychiatry',
        year: '2019',
        link: 'https://doi.org/10.1001/jamapsychiatry.2019.0187',
        tier: 1,
      },
      {
        id: '3',
        text: 'Estrogen and neurotransmitter systems',
        source: 'Frontiers in Neuroendocrinology',
        year: '2020',
        link: 'https://doi.org/10.1016/j.yfrne.2020.100857',
        tier: 1,
      },
      {
        id: '4',
        text: 'Anxiety symptoms during menopausal transition',
        source: 'Climacteric',
        year: '2021',
        link: 'https://doi.org/10.1080/13697137.2020.1842427',
        tier: 1,
      },
      {
        id: '5',
        text: 'Sleep disturbance and mood in perimenopause',
        source: 'Sleep Medicine Reviews',
        year: '2020',
        link: 'https://doi.org/10.1016/j.smrv.2020.101337',
        tier: 1,
      },
      {
        id: '6',
        text: 'Hormone therapy and mental health',
        source: 'Lancet Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1016/S2215-0366(20)30487-X',
        tier: 1,
      },
      {
        id: '7',
        text: 'Psychosocial factors and menopausal symptoms',
        source: 'Maturitas',
        year: '2020',
        link: 'https://doi.org/10.1016/j.maturitas.2020.03.002',
        tier: 1,
      },
      {
        id: '8',
        text: 'Menopause and Mental Health',
        source: 'North American Menopause Society',
        year: '2021',
        link: 'https://www.menopause.org/for-women/menopause-mental-health',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The hormonal changes of menopause don't just cause hot flashes—they directly affect brain chemistry, mood regulation, and emotional wellbeing in ways many people don't expect.
          </p>
          <p className="mb-6">
            Understanding the connection between fluctuating hormones and emotions helps distinguish what's biochemical from what's psychological, and informs more effective treatment approaches <Citation id="1" index={1} source="Menopause" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="hormones-and-brain" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Hormones Affect Your Emotional Brain
        </h2>
        <p className="mb-6">
          Estrogen isn't just a reproductive hormone—it's a neuromodulator that affects serotonin, dopamine, and other neurotransmitters regulating mood <Citation id="3" index={3} source="Frontiers in Neuroendocrinology" year="2020" tier={1} />. When estrogen levels fluctuate wildly during perimenopause, emotional systems destabilize.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>The emotional symptoms of menopause aren't "all in your head"—they're neurochemical. Estrogen receptors exist throughout the brain, especially in mood-regulating regions. Changes in estrogen directly alter how your brain processes emotions.</p>
        </ArticleCallout>

        <h2 id="perimenopause-vs-menopause" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Perimenopause vs. Menopause: Different Emotional Patterns
        </h2>

        <ComparisonTable
          title="Emotional Changes Across Stages"
          columns={['Stage', 'Hormone Pattern', 'Common Emotional Symptoms']}
          items={[
            {
              feature: 'Perimenopause (4-10 years before menopause)',
              values: ['Wildly fluctuating estrogen/progesterone', 'Mood swings, irritability, anxiety, tearfulness'],
            },
            {
              feature: 'Menopause (12 months no period)',
              values: ['Low, stable estrogen', 'May stabilize emotionally or develop low mood'],
            },
            {
              feature: 'Postmenopause',
              values: ['Consistently low estrogen', 'Usually stable; chronic low mood if untreated'],
            },
          ]}
        />

        <p className="mb-6 mt-6">
          Perimenopause is often emotionally harder than menopause itself because fluctuations are more disruptive than consistently low levels <Citation id="2" index={2} source="JAMA Psychiatry" year="2019" tier={1} />.
        </p>

        <h2 id="common-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Emotional Symptoms of Hormonal Transition
        </h2>

        <StatCard
          stats={[
            { value: 40, suffix: '%', label: 'Experience mood changes during perimenopause' },
            { value: 2, suffix: 'x', label: 'Higher risk of depression during transition' },
            { value: 60, suffix: '%', label: 'Report increased anxiety or irritability' },
          ]}
          source="Menopause & Psychiatry Research, 2019-2021"
        />

        <p className="mb-6 mt-6">
          Common emotional experiences include:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Mood swings:</strong> Rapid shifts between irritability, sadness, and normalcy</li>
          <li><strong>Heightened anxiety:</strong> Generalized worry or panic attacks, even without previous anxiety <Citation id="4" index={4} source="Climacteric" year="2021" tier={1} /></li>
          <li><strong>Low frustration tolerance:</strong> Things that didn't bother you before now feel overwhelming</li>
          <li><strong>Emotional flatness:</strong> Loss of joy or interest in usual activities</li>
          <li><strong>Crying easily:</strong> Tears at things that wouldn't previously affect you</li>
          <li><strong>Brain fog affecting emotion:</strong> Difficulty processing emotional situations or finding words</li>
        </ul>

        <h2 id="sleep-factor" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Sleep-Mood Connection
        </h2>
        <p className="mb-6">
          Sleep disruption—from night sweats, insomnia, or anxiety—is one of the strongest contributors to menopausal mood changes <Citation id="5" index={5} source="Sleep Medicine Reviews" year="2020" tier={1} />. Addressing sleep often improves mood more than directly targeting emotions.
        </p>

        <ArticleCallout variant="tip">
          <p><strong>Sleep strategies:</strong> Cool bedroom (60-67°F), moisture-wicking bedding, cognitive behavioral therapy for insomnia (CBT-I), addressing hot flashes medically, limiting caffeine and alcohol</p>
        </ArticleCallout>

        <h2 id="treatment-options" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment Approaches
        </h2>
        <p className="mb-6">
          Multiple effective options exist for managing menopausal emotional symptoms <Citation id="6" index={6} source="Lancet Psychiatry" year="2021" tier={1} />:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'hrt',
              title: 'Hormone Replacement Therapy (HRT/MHT)',
              content: (
                <p>Estrogen therapy can stabilize mood by addressing the root cause—hormone fluctuation. Many people see significant emotional improvement. Discuss risks/benefits with a healthcare provider.</p>
              ),
            },
            {
              id: 'antidepressants',
              title: 'Antidepressants',
              content: (
                <p>SSRIs/SNRIs treat both depression and hot flashes. Effective for those who can't or won't use hormone therapy, or need additional mood support.</p>
              ),
            },
            {
              id: 'therapy',
              title: 'Psychotherapy',
              content: (
                <p>CBT helps manage mood and anxiety symptoms, addresses life stage challenges concurrent with menopause, and provides coping strategies for the transition.</p>
              ),
            },
            {
              id: 'lifestyle',
              title: 'Lifestyle Approaches',
              content: (
                <p>Regular exercise, stress management, social connection, and healthy sleep habits all improve emotional outcomes. Not sufficient for severe symptoms but helpful adjuncts.</p>
              ),
            },
          ]}
        />

        <h2 id="psychosocial-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          It's Not Just Hormones
        </h2>
        <p className="mb-6">
          Menopause often coincides with other life stressors—aging parents, adult children leaving, career transitions, relationship changes—that compound emotional challenges <Citation id="7" index={7} source="Maturitas" year="2020" tier={1} />. Both the biological and psychosocial factors deserve attention.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          Seek support from a healthcare provider if you experience <Citation id="8" index={8} source="North American Menopause Society" year="2021" tier={3} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Depression symptoms lasting more than two weeks</li>
          <li>Anxiety or panic attacks interfering with daily life</li>
          <li>Mood changes significantly affecting relationships or work</li>
          <li>Thoughts of self-harm</li>
          <li>Quality of life notably diminished</li>
          <li>Previous mental health conditions worsening</li>
        </ul>

        <p className="mb-6">
          Menopausal emotional symptoms are real, common, and treatable. You don't have to "just deal with it"—effective interventions exist for both the hormonal and psychological components.
        </p>
      </>
    ),
  },

  {
    id: catId(69),
    slug: 'retirement-and-emotional-identity-who-are-you-without-your-role',
    title: 'Retirement and Emotional Identity: Who Are You Without Your Role?',
    description: 'Navigating the identity transition of retirement and rebuilding a sense of purpose and meaning beyond career.',
    image: "/images/articles/cat01/cover-069.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Retirement', 'Identity', 'Purpose', 'Life Transitions'],
    citations: [
      {
        id: '1',
        text: 'Retirement and identity: A systematic review',
        source: 'Work, Aging and Retirement',
        year: '2020',
        link: 'https://doi.org/10.1093/workar/waaa015',
        tier: 1,
      },
      {
        id: '2',
        text: 'Psychological impact of retirement',
        source: 'Journal of Vocational Behavior',
        year: '2019',
        link: 'https://doi.org/10.1016/j.jvb.2019.06.004',
        tier: 1,
      },
      {
        id: '3',
        text: 'Purpose in life and retirement adjustment',
        source: 'Psychology and Aging',
        year: '2020',
        link: 'https://doi.org/10.1037/pag0000461',
        tier: 1,
      },
      {
        id: '4',
        text: 'Depression in early retirement',
        source: 'The Lancet Public Health',
        year: '2020',
        link: 'https://doi.org/10.1016/S2468-2667(20)30087-7',
        tier: 1,
      },
      {
        id: '5',
        text: 'Social networks and retirement wellbeing',
        source: 'Social Science & Medicine',
        year: '2021',
        link: 'https://doi.org/10.1016/j.socscimed.2021.113821',
        tier: 1,
      },
      {
        id: '6',
        text: 'Successful aging and retirement',
        source: 'The Gerontologist',
        year: '2020',
        link: 'https://doi.org/10.1093/geront/gnaa058',
        tier: 1,
      },
      {
        id: '7',
        text: 'Financial security and emotional wellbeing in retirement',
        source: 'Journal of Financial Therapy',
        year: '2020',
        link: 'https://doi.org/10.4148/1944-9771.1226',
        tier: 1,
      },
      {
        id: '8',
        text: 'Planning for Retirement',
        source: 'American Psychological Association',
        year: '2021',
        link: 'https://www.apa.org/topics/aging-older-adults/retirement',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            For many, retirement isn't just leaving a job—it's losing a central identity, daily structure, and sense of purpose that defined decades of life. The emotional impact can be surprising and profound.
          </p>
          <p className="mb-6">
            Research shows retirement affects emotional wellbeing in complex ways: some thrive with newfound freedom, while others struggle with loss of identity and meaning <Citation id="1" index={1} source="Work, Aging and Retirement" year="2020" tier={1} />. Understanding this transition helps you navigate it more successfully.
          </p>
        </div>

        <h2 id="identity-loss" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Identity Question
        </h2>
        <p className="mb-6">
          "What do you do?" is often the first question when meeting someone. When your answer changes from a career to "I'm retired," it can feel like losing part of yourself <Citation id="2" index={2} source="Journal of Vocational Behavior" year="2019" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway">
          <p>Career isn't just what you did—for many, it's who you were. Retirement removes not just tasks but identity, status, competence, and belonging. Grieving this loss is normal and necessary.</p>
        </ArticleCallout>

        <p className="mb-6">
          The emotional impact varies based on how much of your identity was wrapped up in work. Those whose primary sense of self came from career roles typically face harder adjustments than those with diverse identity sources.
        </p>

        <h2 id="emotional-stages" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Emotional Patterns in Retirement
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Honeymoon Phase (Months 1-6)',
              description: (
                <p>Initial relief and excitement. Freedom feels wonderful. You enjoy leisure, travel, projects. This feels like an extended vacation.</p>
              ),
            },
            {
              title: 'Disenchantment (Months 6-18)',
              description: (
                <p>Novelty wears off. Lack of structure feels aimless. Loss of purpose, identity confusion, sometimes depression emerge. 'Now what?" becomes pressing.</p>
              ),
            },
            {
              title: 'Reorientation (Months 12-24+)',
              description: (
                <p>Actively building new identity, routines, and meaning. Testing activities, relationships, and roles. Finding what matters in this life stage.</p>
              ),
            },
            {
              title: 'Stability (Years 2+)',
              description: (
                <p>New normal established. Identity reconstructed around retiree role and chosen activities. Emotional equilibrium returns, often with greater life satisfaction.</p>
              ),
            },
          ]}
        />

        <p className="mb-6 mt-6">
          Not everyone follows this pattern linearly, but research identifies these phases as common <Citation id="6" index={6} source="The Gerontologist" year="2020" tier={1} />. Knowing them helps normalize difficult periods.
        </p>

        <h2 id="risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Makes Retirement Harder
        </h2>

        <StatCard
          stats={[
            { value: 40, suffix: '%', label: 'Report difficulty adjusting to retirement' },
            { value: 2, suffix: 'x', label: 'Higher depression risk in first year' },
            { value: 25, suffix: '%', label: 'Return to work within 2 years' },
          ]}
          source="Retirement Transition Research, 2019-2020"
        />

        <p className="mb-6 mt-6">
          Factors that complicate emotional adjustment:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Involuntary retirement:</strong> Forced by health, job loss, or caregiving creates more distress than chosen retirement</li>
          <li><strong>Work-centered identity:</strong> Few roles or interests outside career leaves an identity vacuum</li>
          <li><strong>Weak social networks:</strong> If most friends were work colleagues, retirement brings isolation <Citation id="5" index={5} source="Social Science & Medicine" year="2021" tier={1} /></li>
          <li><strong>Financial insecurity:</strong> Money stress undermines wellbeing and limits options <Citation id="7" index={7} source="Journal of Financial Therapy" year="2020" tier={1} /></li>
          <li><strong>Poor health:</strong> Retirement due to illness or limitations makes adjustment harder</li>
          <li><strong>Partner mismatched:</strong> One partner retired while other still working creates schedule/lifestyle conflicts</li>
        </ul>

        <h2 id="finding-purpose" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Rebuilding Purpose and Identity
        </h2>
        <p className="mb-6">
          Purpose—the sense that your life matters and has direction—is one of the strongest predictors of wellbeing in retirement <Citation id="3" index={3} source="Psychology and Aging" year="2020" tier={1} />. Building new sources of meaning is active work.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'volunteer',
              title: 'Contribution Through Volunteering',
              content: (
                <p>Using skills to help others provides purpose, structure, and social connection. Mentoring, board service, community work—all offer ways to contribute beyond paid work.</p>
              ),
            },
            {
              id: 'learn',
              title: 'Lifelong Learning',
              content: (
                <p>Pursuing education, hobbies, or skills provides growth and challenge. Learning something new rebuilds confidence and creates future-focused goals.</p>
              ),
            },
            {
              id: 'relationships',
              title: 'Deepening Relationships',
              content: (
                <p>Investing time in family, friends, and community. Quality relationships become more central to identity and provide emotional fulfillment.</p>
              ),
            },
            {
              id: 'creative',
              title: 'Creative Expression',
              content: (
                <p>Art, writing, music, crafts—creative pursuits offer meaning, flow states, and tangible accomplishments outside career metrics.</p>
              ),
            },
            {
              id: 'part-time',
              title: 'Phased Retirement or Part-Time Work',
              content: (
                <p>Some find purpose in continued work at reduced intensity. Consulting, seasonal work, or passion projects maintain identity continuity while allowing flexibility.</p>
              ),
            },
          ]}
        />

        <h2 id="successful-adjustment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Keys to Successful Adjustment
        </h2>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Plan before retiring:</strong> Explore interests, build non-work friendships, clarify values while still working</li>
          <li><strong>Create structure:</strong> Replace work routine with chosen structure—regular activities, commitments, rituals</li>
          <li><strong>Stay physically active:</strong> Exercise supports mood, provides routine, and maintains health</li>
          <li><strong>Maintain social connections:</strong> Proactively build and sustain relationships; isolation is the biggest risk factor</li>
          <li><strong>Give yourself time:</strong> Adjustment takes 1-2 years for most people. Early struggles don't predict long-term outcomes</li>
          <li><strong>Define success differently:</strong> Achievement in retirement looks different—impact, relationships, growth, joy, not productivity</li>
        </ul>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">
          Adjustment difficulties are normal; clinical depression requires treatment <Citation id="4" index={4} source="The Lancet Public Health" year="2020" tier={1} />. Seek help if you experience:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Persistent sadness, emptiness, or hopelessness</li>
          <li>Loss of interest in all activities for more than two weeks</li>
          <li>Significant sleep or appetite changes</li>
          <li>Withdrawal from all social connections</li>
          <li>Feelings of worthlessness or being a burden</li>
          <li>Thoughts of self-harm or that life isn't worth living</li>
        </ul>

        <p className="mb-6">
          Retirement is a major life transition that reshapes identity <Citation id="8" index={8} source="American Psychological Association" year="2021" tier={3} />. Struggling with it doesn't mean failure—it means you're navigating genuine developmental work. With intention and support, most people build satisfying post-career lives.
        </p>
      </>
    ),
  },

  {
    id: catId(70),
    slug: 'teaching-kids-emotional-regulation-age-appropriate-strategies',
    title: 'Teaching Kids Emotional Regulation: Age-Appropriate Strategies',
    description: 'Practical, developmentally-appropriate techniques for helping children learn to understand and regulate their emotions from toddlerhood through adolescence.',
    image: "/images/articles/cat01/cover-070.svg",
    category: CATEGORY_EMOTIONAL_REGULATION,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Parenting', 'Child Development', 'Emotional Intelligence', 'Teaching Skills'],
    citations: [
      {
        id: '1',
        text: 'Teaching emotion regulation to children: A systematic review',
        source: 'Clinical Child and Family Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1007/s10567-020-00320-5',
        tier: 1,
      },
      {
        id: '2',
        text: 'Emotion socialization and child outcomes',
        source: 'Child Development Perspectives',
        year: '2019',
        link: 'https://doi.org/10.1111/cdep.12348',
        tier: 1,
      },
      {
        id: '3',
        text: 'Parental emotion coaching and child emotional competence',
        source: 'Journal of Family Psychology',
        year: '2020',
        link: 'https://doi.org/10.1037/fam0000630',
        tier: 1,
      },
      {
        id: '4',
        text: 'Developmentally appropriate emotion regulation strategies',
        source: 'Developmental Psychology',
        year: '2021',
        link: 'https://doi.org/10.1037/dev0001105',
        tier: 1,
      },
      {
        id: '5',
        text: 'Mindfulness-based interventions for children',
        source: 'Mindfulness',
        year: '2020',
        link: 'https://doi.org/10.1007/s12671-020-01403-2',
        tier: 1,
      },
      {
        id: '6',
        text: 'Co-regulation: Parent scaffolding of child emotion regulation',
        source: 'Emotion',
        year: '2019',
        link: 'https://doi.org/10.1037/emo0000636',
        tier: 1,
      },
      {
        id: '7',
        text: 'Long-term benefits of early emotion regulation skills',
        source: 'Journal of Child Psychology and Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1111/jcpp.13410',
        tier: 1,
      },
      {
        id: '8',
        text: 'Helping Children Manage Emotions',
        source: 'American Academy of Pediatrics',
        year: '2021',
        link: 'https://www.healthychildren.org/emotional-regulation',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Emotional regulation isn't innate—it's a skill children learn through repeated practice with supportive adults. What you teach now shapes their lifelong emotional health.
          </p>
          <p className="mb-6">
            Research shows that children whose parents actively teach emotion regulation skills develop better mental health, stronger relationships, and greater academic success <Citation id="1" index={1} source="Clinical Child and Family Psychology Review" year="2020" tier={1} />. The key is matching strategies to developmental capacity.
          </p>
        </div>

        <h2 id="foundation-principles" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Foundation: What All Ages Need
        </h2>
        <p className="mb-6">
          Before age-specific strategies, three principles apply across development <Citation id="2" index={2} source="Child Development Perspectives" year="2019" tier={2} />:
        </p>

        <ArticleCallout variant="key-takeaway" title="The Three Foundations">
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Emotional Safety:</strong> Children must feel safe expressing all emotions without punishment or ridicule</li>
            <li><strong>Co-Regulation:</strong> Adults regulate WITH children before expecting self-regulation—your calm presence helps their nervous system settle</li>
            <li><strong>Validation:</strong> All emotions are acceptable; some behaviors are not. "You're really angry' (validation) + "We don't hit' (boundary)</li>
          </ol>
        </ArticleCallout>

        <h2 id="toddlers" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Toddlers (Ages 1-3): The Foundation Years
        </h2>
        <p className="mb-6">
          Toddlers have big emotions and zero regulation skills. Your calm presence is their primary regulation tool <Citation id="6" index={6} source="Emotion" year="2019" tier={1} />. They're building the brain circuitry that will support future self-regulation.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Name Emotions Consistently',
              description: (
                <p>"You're feeling frustrated that the toy won't work." Building emotional vocabulary is the foundation. Name what you see on their face and in their behavior.</p>
              ),
            },
            {
              title: 'Offer Physical Comfort',
              description: (
                <p>Hugs, holding, rocking. Physical soothing teaches their nervous system how to calm down. This is co-regulation in action.</p>
              ),
            },
            {
              title: 'Simple Strategies',
              description: (
                <p>Teach 1-2 simple tools: deep breaths (blow bubbles!), squeezing a stuffed animal, going to a cozy corner. Keep it concrete and sensory.</p>
              ),
            },
            {
              title: 'Model Regulation',
              description: (
                <p>Narrate your process: "Mommy is frustrated. I'm going to take a deep breath." They learn by watching you manage emotions.</p>
              ),
            },
          ]}
        />

        <h2 id="preschool" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Preschoolers (Ages 3-5): Expanding the Toolkit
        </h2>
        <p className="mb-6">
          Preschoolers can start learning simple strategies and understand cause-effect relationships <Citation id="4" index={4} source="Developmental Psychology" year="2021" tier={1} />. They need lots of practice and reminders.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'feelings-wheel',
              title: 'Use Visual Tools',
              content: (
                <p>Feelings charts with faces help identify emotions. 'Point to how you feel." Visual aids work better than abstract concepts at this age.</p>
              ),
            },
            {
              id: 'calm-down-kit',
              title: 'Create a Calm-Down Kit',
              content: (
                <p>Box with sensory items: stress ball, glitter jar, favorite book, crayons. Give them tools to self-soothe in developmentally appropriate ways.</p>
              ),
            },
            {
              id: 'breathing',
              title: 'Teach Belly Breathing',
              content: (
                <p>'Smell the flower (breathe in), blow out the candle (breathe out)." Make it playful and practice when calm, not just during meltdowns.</p>
              ),
            },
            {
              id: 'emotion-coaching',
              title: 'Practice Emotion Coaching',
              content: (
                <p>Step 1: Notice emotion. Step 2: Name it. Step 3: Validate ('That makes sense'). Step 4: Problem-solve together. Step 5: Set limits if needed <Citation id="3" index={3} source="Journal of Family Psychology" year="2020" tier={1} />.</p>
              ),
            },
          ]}
        />

        <h2 id="school-age" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          School-Age (Ages 6-11): Building Independence
        </h2>
        <p className="mb-6">
          School-age children can learn cognitive strategies, understand their own patterns, and begin self-regulating with less adult support.
        </p>

        <StatCard
          stats={[
            { value: 5, suffix: '+', label: 'Regulation strategies most kids can use by age 8' },
            { value: 70, suffix: '%', label: 'Improvement in emotional skills with practice' },
            { value: 10, suffix: '', label: 'Minutes of practice needed daily for new skills' },
          ]}
          source="Child Development Research, 2020-2021"
        />

        <p className="mb-6 mt-6">
          Effective strategies for this age:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Emotion journaling:</strong> Writing or drawing about feelings builds awareness and processing skills</li>
          <li><strong>Body scanning:</strong> "Where do you feel anger in your body?" Connecting physical sensations to emotions</li>
          <li><strong>Thought challenging:</strong> "Is that thought true? What else could be true?" Early cognitive reframing</li>
          <li><strong>Problem-solving steps:</strong> Identify problem → Brainstorm solutions → Pick one → Try it → Evaluate</li>
          <li><strong>Mindfulness basics:</strong> Simple meditation or focusing exercises <Citation id="5" index={5} source="Mindfulness" year="2020" tier={1} /></li>
          <li><strong>Physical outlets:</strong> Running, dancing, sports—movement as regulation tool</li>
        </ul>

        <h2 id="tweens-teens" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Tweens & Teens (Ages 12+): Sophisticated Skills
        </h2>
        <p className="mb-6">
          Adolescents need strategies that match their cognitive capacity and respect their developing autonomy. They can learn complex techniques but still need parental co-regulation during intense emotions.
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Advanced mindfulness:</strong> Longer meditations, mindful movement, apps like Headspace or Calm</li>
          <li><strong>Cognitive reappraisal:</strong> Changing perspective on situations to alter emotional response</li>
          <li><strong>Values clarification:</strong> Using values to guide decisions and evaluate emotional reactions</li>
          <li><strong>Social support skills:</strong> Teaching when and how to reach out to friends, adults, or professionals</li>
          <li><strong>Distress tolerance:</strong> Sitting with uncomfortable emotions without acting impulsively</li>
          <li><strong>Self-compassion:</strong> Treating themselves kindly during emotional struggles</li>
        </ul>

        <ArticleCallout variant="tip" title="For Parents of Teens">
          <p>Your role shifts from directing to coaching. Offer strategies but let them choose. Validate intense feelings while maintaining boundaries. Stay available even when they push away—your presence still matters deeply.</p>
        </ArticleCallout>

        <h2 id="common-mistakes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Mistakes to Avoid
        </h2>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Dismissing emotions:</strong> "You're fine' or "It's not a big deal' invalidates their experience</li>
          <li><strong>Teaching only during crisis:</strong> Introduce strategies when calm; practice before meltdowns</li>
          <li><strong>Punishing emotions:</strong> "Stop crying" or timeouts for feelings teaches suppression, not regulation</li>
          <li><strong>Solving problems for them:</strong> Guide them to solutions rather than fixing everything</li>
          <li><strong>Expecting adult-level control:</strong> Their brains are still developing; they can't regulate like you do</li>
        </ul>

        <h2 id="long-term-benefits" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Long-Term Impact
        </h2>
        <p className="mb-6">
          Children who learn emotional regulation skills early show lasting benefits: lower rates of anxiety and depression, better academic performance, stronger relationships, and greater resilience to stress <Citation id="7" index={7} source="Journal of Child Psychology and Psychiatry" year="2021" tier={1} />.
        </p>

        <p className="mb-6">
          The time you invest in teaching these skills pays dividends throughout their lives <Citation id="8" index={8} source="American Academy of Pediatrics" year="2021" tier={3} />. You're not just managing today's tantrum—you're building tomorrow's emotionally healthy adult.
        </p>
      </>
    ),
  },
];
