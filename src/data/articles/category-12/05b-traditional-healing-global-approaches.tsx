/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_CULTURAL_GLOBAL, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import SummaryBox from '../../../components/article/SummaryBox';
import KeyFacts from '../../../components/article/KeyFacts';
import SparkMoment from '../../../components/article/SparkMoment';
import PracticalExercise from '../../../components/article/PracticalExercise';
import ReferenceList from '../../../components/article/ReferenceList';
import {
  ArticleCallout,
  ComparisonTable,
  StatCard,
  ProgressSteps,
  QuoteBlock,
  DiagramBlock,
  RelatedToolsBlock,
} from '../../../components/article/blocks';

export const traditionalHealingGlobalApproachesArticlesB: Article[] = [
  {
    id: catId(46),
    slug: 'faith-based-counseling-spiritual-support-meets-psychological-need',
    title: 'Faith-Based Counseling: When Spiritual Support Meets Psychological Need',
    description: 'Understand how faith and therapy can work together, when religious counseling is helpful, and when clinical care is essential.',
    image: "/images/articles/cat12/cover-046.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 13,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Faith-Based Counseling', 'Religion', 'Spirituality', 'Pastoral Care', 'Mental Health'],
    citations: [
      { id: '1', text: 'Effectiveness of faith-based interventions for mental health: Meta-analysis', source: 'Journal of Religion and Health', year: '2020', link: 'https://doi.org/10.1007/s10943-020-01006-x', tier: 1 },
      { id: '2', text: 'Integrating spirituality into mental health treatment: Clinical guidelines', source: 'American Psychological Association', year: '2021', link: 'https://www.apa.org/topics/spirituality-mental-health', tier: 3 },
      { id: '3', text: 'Religious coping and mental health outcomes: Systematic review', source: 'Psychology of Religion and Spirituality', year: '2019', link: 'https://doi.org/10.1037/rel0000228', tier: 1 },
      { id: '4', text: 'Pastoral counseling and clinical psychology: Collaborative care', source: 'Journal of Psychology and Theology', year: '2018', link: 'https://doi.org/10.1177/0091647118809162', tier: 1 },
      { id: '5', text: 'Faith communities and mental health: Resources and referrals', source: 'Substance Abuse and Mental Health Services Administration', year: '2022', link: 'https://www.samhsa.gov/faith-based-initiatives', tier: 2 },
    ],
    content: (
      <>
        <SummaryBox>
          For millions of people worldwide, faith communities provide the first—and sometimes only—source of support during mental health crises. Pastors, rabbis, imams, and spiritual leaders often serve as de facto counselors, offering comfort, guidance, and meaning-making through religious frameworks. Faith-based counseling blends spiritual support with psychological principles, while pastoral care focuses primarily on spiritual wellness and moral guidance. But when does religious support help mental health, and when can it cause harm? This article explores the intersection of faith and therapy, examines the evidence for religious coping and faith-based interventions, and offers guidance on integrating spirituality into clinical care or knowing when to seek professional mental health treatment beyond religious counsel.
        </SummaryBox>

        <KeyFacts>
          <Citation id="1" article="traditionalHealingGlobalApproachesArticlesB[0]">
            Faith-based interventions for anxiety and depression show moderate positive effects, particularly for religious individuals who find spiritual meaning in their struggles
          </Citation>
          <Citation id="3" article="traditionalHealingGlobalApproachesArticlesB[0]">
            Positive religious coping (seeking spiritual support, reframing hardship as meaningful) predicts better mental health, while negative coping (viewing suffering as divine punishment) predicts worse outcomes
          </Citation>
          <Citation id="4" article="traditionalHealingGlobalApproachesArticlesB[0]">
            Collaborative care models pairing pastoral counselors with clinical psychologists demonstrate high patient satisfaction and improved access to mental health services
          </Citation>
          <Citation id="2" article="traditionalHealingGlobalApproachesArticlesB[0]">
            APA guidelines recommend assessing clients' spirituality and integrating faith respectfully when it's central to their identity and values
          </Citation>
          <Citation id="5" article="traditionalHealingGlobalApproachesArticlesB[0]">
            Faith communities can reduce mental health stigma and increase treatment-seeking when religious leaders are trained in mental health literacy and destigmatization
          </Citation>
        </KeyFacts>

        <h2>The Landscape: Faith, Spirituality, and Mental Health</h2>
        <p>
          Religion and spirituality aren't identical. Religion typically involves organized belief systems, communal practices, and institutional structures (churches, mosques, temples, synagogues). Spirituality can be religious or secular, referring to a sense of connection to something larger than oneself—whether that's God, nature, humanity, or transcendent meaning.<Citation id="2" article="traditionalHealingGlobalApproachesArticlesB[0]" /> Both can profoundly influence mental health, for better or worse.
        </p>
        <p>
          For many people, faith provides community, purpose, moral framework, comfort during suffering, and rituals that mark life transitions. Religious practices like prayer, meditation, scripture study, and worship can reduce stress, increase hope, and foster social support. Faith communities often mobilize material aid—meals, childcare, financial assistance—that addresses social determinants of mental health.
        </p>
        <p>
          But religion can also harm mental health when it promotes guilt, shame, or toxic beliefs (suffering as punishment, mental illness as spiritual failure, LGBTQ+ identities as sinful), when it enables abuse through authority structures, or when it discourages professional help in favor of "pray harder" approaches that leave serious illness untreated.
        </p>

        <h2>Religious Coping: What Helps and What Harms</h2>
        <p>
          Not all religious coping is equal. Research distinguishes between positive and negative forms, with dramatically different mental health outcomes.<Citation id="3" article="traditionalHealingGlobalApproachesArticlesB[0]" /> Positive religious coping includes: seeking spiritual support from God or community, reframing hardships as meaningful tests or opportunities for growth, finding comfort in religious rituals and prayer, and trusting that suffering has purpose even when incomprehensible.
        </p>
        <p>
          Negative religious coping involves: believing suffering is divine punishment for sin, feeling abandoned or unloved by God, experiencing religious doubt as catastrophic, questioning one's faith in destructive ways, or passively deferring all agency to God while refusing to take action. Systematic reviews consistently find that positive religious coping predicts better mental health outcomes—lower depression and anxiety, faster recovery from illness, greater life satisfaction—while negative coping predicts worse outcomes, sometimes rivaling the impact of severe life stressors.<Citation id="3" article="traditionalHealingGlobalApproachesArticlesB[0]" />
        </p>
        <p>
          For clinicians, this means assessing not just whether clients are religious, but how they use their faith. A client who prays for strength while also attending therapy and taking medication may benefit from spiritual support. A client who refuses treatment because "God will heal me" or believes depression means they lack faith needs gentle redirection toward evidence-based care alongside spiritual support.
        </p>

        <DiagramBlock
          type="flowchart"
          title="When to Seek Pastoral Care vs. Clinical Mental Health Treatment"
          nodes={[
            { id: '1', label: 'Spiritual Questions', description: 'Meaning, purpose, faith doubts, moral guidance' },
            { id: '2', label: 'Life Stressors', description: 'Grief, relationship conflicts, life transitions' },
            { id: '3', label: 'Mild Symptoms', description: 'Temporary sadness, worry, stress within normal range' },
            { id: '4', label: 'Moderate-Severe Symptoms', description: 'Persistent depression, anxiety, panic, trauma symptoms' },
            { id: '5', label: 'Crisis', description: 'Suicidal thoughts, psychosis, severe impairment' },
            { id: 'pastoral', label: 'Pastoral Care Appropriate', description: 'Religious leader + optional therapy' },
            { id: 'both', label: 'Combined Approach', description: 'Therapy + pastoral support together' },
            { id: 'clinical', label: 'Clinical Care Essential', description: 'Licensed mental health professional required' }
          ]}
          connections={[
            { from: '1', to: 'pastoral' },
            { from: '2', to: 'pastoral' },
            { from: '3', to: 'both' },
            { from: '4', to: 'both' },
            { from: '5', to: 'clinical' }
          ]}
          description="Decision guide for matching spiritual and psychological needs to appropriate support"
        />

        <h2>Faith-Based Interventions: What the Research Shows</h2>
        <p>
          Faith-based interventions—treatments that explicitly incorporate religious or spiritual elements—have been studied primarily in Christian contexts but increasingly across other faiths. A 2020 meta-analysis of 156 studies found that religiously integrated psychotherapy produces small to moderate benefits for depression and anxiety, with slightly stronger effects for highly religious clients who prefer faith-aligned treatment.<Citation id="1" article="traditionalHealingGlobalApproachesArticlesB[0]" />
        </p>
        <p>
          What do these interventions look like? Examples include: cognitive therapy that incorporates prayer and scripture alongside thought restructuring, mindfulness meditation framed through Christian contemplative practice or Islamic dhikr, group therapy held in churches with opening prayers, and therapists who explicitly discuss how faith can support recovery. The key is matching the intervention to the client's beliefs—a devout Muslim won't benefit from Christian-framed therapy, and a secular client may feel alienated by any religious content.
        </p>
        <p>
          Importantly, religiously integrated therapy doesn't appear superior to secular evidence-based therapy for most conditions—it's about preference and cultural fit. For clients who view mental health through a spiritual lens, faith-integrated care may feel more congruent and therefore improve engagement. For others, separating therapy from religion preserves important boundaries.
        </p>

        <h2>Pastoral Counseling: Trained Spiritual Care vs. Informal Support</h2>
        <p>
          Pastoral counseling as a profession involves graduate-level training in both theology and counseling psychology, with certification from bodies like the American Association of Pastoral Counselors. Trained pastoral counselors can address mental health concerns within a spiritual framework, recognize when to refer for psychiatric care, and maintain ethical boundaries.<Citation id="4" article="traditionalHealingGlobalApproachesArticlesB[0]" />
        </p>
        <p>
          In contrast, many religious leaders offer informal spiritual support without mental health training. They provide valuable comfort, community, and moral guidance—but may not recognize serious mental illness, may give harmful advice (like suggesting prayer will cure bipolar disorder), or may lack boundaries around confidentiality and dual relationships. The distinction matters: professional pastoral counselors are equipped to handle complex mental health issues; well-meaning but untrained clergy often are not.
        </p>

        <ComparisonTable
          headers={['Type of Support', 'Training', 'Scope', 'Best For']}
          rows={[
            {
              cells: [
                'Pastoral Counseling (Professional)',
                'Master\'s in pastoral counseling + licensure; combines theology and psychology training',
                'Mental health treatment within spiritual framework; can diagnose and treat disorders',
                'Religious individuals wanting therapy that integrates their faith explicitly'
              ]
            },
            {
              cells: [
                'Spiritual Direction',
                'Training in spiritual formation and contemplative practices',
                'Guiding spiritual growth, prayer life, discernment; NOT mental health treatment',
                'Deepening faith practice, exploring vocation, spiritual questions'
              ]
            },
            {
              cells: [
                'Clergy Support',
                'Theological education; variable mental health literacy',
                'Spiritual comfort, community connection, religious rituals, moral guidance',
                'Life transitions, grief, moral questions, religious doubt'
              ]
            },
            {
              cells: [
                'Faith-Informed Therapy',
                'Licensed therapist (psychologist, social worker, counselor) + personal faith background',
                'Evidence-based therapy that respects and incorporates client\'s spirituality',
                'Clients wanting therapy from someone who understands their faith tradition'
              ]
            }
          ]}
          caption="Four types of faith-based support: distinguishing professional mental health care from spiritual guidance"
        />

        <h2>Collaborative Care: Faith Communities as Mental Health Partners</h2>
        <p>
          Rather than viewing faith and therapy as competing, the most effective models create partnerships. Faith communities can serve as mental health access points—religious leaders trained in mental health first aid can recognize warning signs, reduce stigma through education, provide referrals to clinical services, and offer community support that complements professional treatment.<Citation id="5" article="traditionalHealingGlobalApproachesArticlesB[0]" />
        </p>
        <p>
          Programs like Mental Health First Aid for Faith Communities train clergy and lay leaders to identify mental health crises, have supportive conversations, and connect people to resources. Research shows these programs increase mental health knowledge, reduce stigma, and improve referral rates—particularly important in communities where religious authority figures' endorsement of mental health care can overcome cultural barriers.<Citation id="5" article="traditionalHealingGlobalApproachesArticlesB[0]" />
        </p>
        <p>
          For therapists, collaboration might mean: asking permission to consult with a client's religious leader (with appropriate releases), attending to how religious beliefs affect presenting problems and treatment goals, recommending faith-based support groups as adjuncts to therapy, or referring to pastoral counselors when spiritual crises intersect with mental health.
        </p>

        <h2>When Faith Causes Harm: Toxic Religion and Mental Health</h2>
        <p>
          Religious trauma is real. Harmful religious teachings and practices can cause lasting psychological damage: purity culture that instills sexual shame, spiritual abuse by authority figures, ostracism for questioning doctrine, condemnation of LGBTQ+ identities, teachings that mental illness reflects spiritual weakness or demonic influence, and demands for unquestioning obedience to leaders.
        </p>
        <p>
          People leaving high-control religious groups often experience complex grief—losing community, identity, worldview, and sometimes family relationships all at once. They may struggle with lingering guilt, difficulty trusting others, and existential questions about meaning and morality outside their former faith. Therapists working with religious trauma need specialized training to avoid minimizing these experiences or inadvertently reinforcing harmful beliefs.
        </p>
        <p>
          Not all critique of religion constitutes therapy bias—affirming LGBTQ+ identities, naming spiritual abuse, or encouraging clients to question harmful teachings is good clinical care, not anti-religious prejudice. The line is honoring clients' right to their beliefs while not supporting teachings that demonstrably harm mental health.
        </p>

        <PracticalExercise
          title="Assessing the Role of Faith in Your Mental Health"
          description="Reflect on how spirituality or religion intersects with your wellbeing:"
          steps={[
            {
              instruction: 'Identify your coping style',
              details: 'When facing stress or crisis, do you turn to prayer, religious community, scripture, or spiritual practices? Does this help you feel supported, or add pressure and guilt? Notice whether your religious coping feels sustaining or draining.'
            },
            {
              instruction: 'Examine your religious messages about mental health',
              details: 'What does your faith tradition teach about depression, anxiety, therapy, or medication? Have you received messages that mental illness reflects weak faith, sin, or spiritual attack? How do these beliefs affect your willingness to seek help?'
            },
            {
              instruction: 'Assess spiritual support vs. spiritual harm',
              details: 'Does your faith community respond to mental health struggles with compassion and resources, or with judgment and "pray harder" advice? Do religious teachings bring comfort or shame?'
            },
            {
              instruction: 'Consider integration preferences',
              details: 'Would you prefer therapy that explicitly incorporates your faith, therapy that respects but doesn\'t focus on spirituality, or completely secular treatment? There\'s no wrong answer—it\'s about fit.'
            },
            {
              instruction: 'Know when to seek professional help',
              details: 'If religious support alone isn\'t resolving symptoms, if you\'re experiencing suicidal thoughts, severe anxiety/depression, or impaired functioning, clinical mental health care is essential—and doesn\'t conflict with continued spiritual support.'
            }
          ]}
          timeEstimate="30-45 minutes for reflection; ongoing as you navigate care"
        />

        <ArticleCallout variant="warning" title="Red Flags: When Religious Counsel Becomes Dangerous">
          Seek licensed mental health care immediately if religious leaders suggest: discontinuing psychiatric medications in favor of prayer alone, that mental illness is caused by demons requiring exorcism rather than treatment, that trauma survivors should "forgive and forget" without processing harm, that suicidal thoughts just need more faith, or that your LGBTQ+ identity is the root of your mental health problems. Spiritual support can complement clinical care, but should never replace it for serious mental illness.
        </ArticleCallout>

        <SparkMoment>
          At its best, faith offers what therapy sometimes can't: transcendent meaning, connection to something eternal, community that endures beyond treatment, and frameworks for making sense of suffering that go beyond symptom reduction. At its worst, religion deepens wounds, compounds shame, and barriers to healing. The future of mental health care isn't choosing between faith and therapy—it's creating space for both to coexist, where spirituality enhances clinical treatment when desired, where religious communities become allies in destigmatizing mental illness, and where no one has to choose between their faith and their wellbeing.
        </SparkMoment>

        <RelatedToolsBlock
          tools={[
            {
              name: 'Provider Directory',
              path: '/find-care',
              description: 'Find faith-informed therapists and pastoral counselors who integrate spirituality'
            },
            {
              name: 'Crisis Resources',
              path: '/crisis',
              description: 'Including faith-based crisis lines for immediate spiritual and mental health support'
            }
          ]}
        />

        <ReferenceList article="traditionalHealingGlobalApproachesArticlesB[0]" />
      </>
    )
  },
  {
    id: catId(47),
    slug: 'art-therapy-across-cultures-creative-healing-universal-language',
    title: 'Art Therapy Across Cultures: Creative Healing as a Universal Language',
    description: 'Discover how art therapy transcends language barriers and provides culturally accessible expression for trauma, grief, and healing.',
    image: "/images/articles/cat12/cover-047.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Art Therapy', 'Creative Therapies', 'Cross-Cultural', 'Trauma Treatment', 'Expressive Arts'],
    citations: [
      { id: '1', text: 'Art therapy for trauma: Systematic review and meta-analysis', source: 'Trauma, Violence, & Abuse', year: '2020', link: 'https://doi.org/10.1177/1524838020915591', tier: 1 },
      { id: '2', text: 'Cultural considerations in art therapy practice', source: 'Art Therapy: Journal of the American Art Therapy Association', year: '2019', link: 'https://doi.org/10.1080/07421656.2019.1649549', tier: 1 },
      { id: '3', text: 'Art therapy with refugees and asylum seekers: Evidence and practice', source: 'The Arts in Psychotherapy', year: '2021', link: 'https://doi.org/10.1016/j.aip.2021.101815', tier: 1 },
      { id: '4', text: 'Cross-cultural applications of expressive therapies', source: 'Journal of Cross-Cultural Psychology', year: '2018', link: 'https://doi.org/10.1177/0022022118789147', tier: 1 },
      { id: '5', text: 'What is Art Therapy?', source: 'American Art Therapy Association', year: '2022', link: 'https://arttherapy.org/about-art-therapy/', tier: 3 },
    ],
    content: <>content placeholder</>
  },
  {
    id: catId(48),
    slug: 'community-based-mental-health-non-western-models-center-collective',
    title: 'Community-Based Mental Health: How Non-Western Models Center the Collective',
    description: 'Learn from mental health models that prioritize community, connection, and collective healing over individual treatment.',
    image: "/images/articles/cat12/cover-048.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Community Mental Health', 'Collectivism', 'Global Models', 'Ubuntu', 'Collective Healing'],
    citations: [
      { id: '1', text: 'Community-based mental health care in low-resource settings', source: 'The Lancet Global Health', year: '2020', link: 'https://doi.org/10.1016/S2214-109X(20)30432-0', tier: 1 },
      { id: '2', text: 'Ubuntu philosophy and mental health in Africa', source: 'Transcultural Psychiatry', year: '2019', link: 'https://doi.org/10.1177/1363461519857074', tier: 1 },
      { id: '3', text: 'Collective healing approaches in Indigenous communities', source: 'American Journal of Community Psychology', year: '2021', link: 'https://doi.org/10.1002/ajcp.12498', tier: 1 },
      { id: '4', text: 'Task-shifting and community health workers in mental health', source: 'World Psychiatry', year: '2018', link: 'https://doi.org/10.1002/wps.20544', tier: 1 },
      { id: '5', text: 'Community Mental Health Services', source: 'World Health Organization', year: '2021', link: 'https://www.who.int/mental_health/community-based-services', tier: 2 },
    ],
    content: <>content placeholder</>
  },
  {
    id: catId(49),
    slug: 'global-mental-health-policy-who-guidelines-treatment-gap',
    title: 'Global Mental Health Policy: WHO Guidelines and the Treatment Gap',
    description: 'Examine the global mental health crisis through WHO data, understand the treatment gap, and explore policy solutions for equity.',
    image: "/images/articles/cat12/cover-049.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Global Mental Health', 'WHO', 'Treatment Gap', 'Policy', 'Health Equity'],
    citations: [
      { id: '1', text: 'World Mental Health Report: Transforming mental health for all', source: 'World Health Organization', year: '2022', link: 'https://www.who.int/publications/i/item/9789240049338', tier: 2 },
      { id: '2', text: 'The global mental health treatment gap: Evidence and policy implications', source: 'The Lancet Psychiatry', year: '2020', link: 'https://doi.org/10.1016/S2215-0366(20)30232-0', tier: 1 },
      { id: '3', text: 'Mental health in low- and middle-income countries: Burden and interventions', source: 'Nature Reviews Disease Primers', year: '2021', link: 'https://doi.org/10.1038/s41572-021-00275-w', tier: 1 },
      { id: '4', text: 'Scaling up mental health services in resource-poor settings', source: 'Annual Review of Clinical Psychology', year: '2019', link: 'https://doi.org/10.1146/annurev-clinpsy-050718-095559', tier: 1 },
      { id: '5', text: 'Global mental health governance: Challenges and opportunities', source: 'Global Health Action', year: '2020', link: 'https://doi.org/10.1080/16549716.2020.1790793', tier: 1 },
    ],
    content: <>content placeholder</>
  },
  {
    id: catId(50),
    slug: 'future-culturally-responsive-mental-healthcare-integration-not-replacement',
    title: 'The Future of Culturally Responsive Mental Healthcare: Integration, Not Replacement',
    description: 'Envision a future where Western and traditional healing systems work together, honoring diverse ways of knowing and healing.',
    image: "/images/articles/cat12/cover-050.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Future of Mental Health', 'Integrative Care', 'Cultural Competence', 'Health Equity', 'Innovation'],
    citations: [
      { id: '1', text: 'Integrative mental health care: Future directions', source: 'JAMA Psychiatry', year: '2021', link: 'https://doi.org/10.1001/jamapsychiatry.2021.2478', tier: 1 },
      { id: '2', text: 'Decolonizing global mental health: Moving toward epistemic justice', source: 'Transcultural Psychiatry', year: '2020', link: 'https://doi.org/10.1177/1363461520938090', tier: 1 },
      { id: '3', text: 'Cultural humility in mental health: A framework for the future', source: 'American Journal of Orthopsychiatry', year: '2019', link: 'https://doi.org/10.1037/ort0000429', tier: 1 },
      { id: '4', text: 'Pluralistic approaches to mental health: Global perspectives', source: 'Global Mental Health', year: '2021', link: 'https://doi.org/10.1017/gmh.2021.16', tier: 1 },
      { id: '5', text: 'Mental Health Action Plan 2013-2030', source: 'World Health Organization', year: '2021', link: 'https://www.who.int/publications/i/item/9789241506021', tier: 2 },
    ],
    content: <>content placeholder</>
  },
];
