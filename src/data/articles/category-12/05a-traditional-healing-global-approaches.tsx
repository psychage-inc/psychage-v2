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

export const traditionalHealingGlobalApproachesArticlesA: Article[] = [
  {
    id: catId(41),
    slug: 'traditional-healing-evidence-based-practice-can-they-work-together',
    title: 'Traditional Healing and Evidence-Based Practice: Can They Work Together?',
    description: 'Explore the research on integrating traditional healing with Western psychotherapy, and what it means for culturally responsive mental health care.',
    image: "/images/articles/cat12/cover-041.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 15,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Traditional Healing', 'Integrative Care', 'Evidence-Based Practice', 'Cultural Adaptation', 'Research'],
    citations: [
      { id: '1', text: 'Integrating traditional healing with evidence-based psychotherapy: A systematic review', source: 'Transcultural Psychiatry', year: '2020', link: 'https://doi.org/10.1177/1363461520937558', tier: 1 },
      { id: '2', text: 'Effectiveness of culturally adapted interventions: Meta-analysis', source: 'Journal of Consulting and Clinical Psychology', year: '2019', link: 'https://doi.org/10.1037/ccp0000422', tier: 1 },
      { id: '3', text: 'Traditional healers and mental health in Africa: A review', source: 'The Lancet Psychiatry', year: '2021', link: 'https://doi.org/10.1016/S2215-0366(21)00159-2', tier: 1 },
      { id: '4', text: 'Indigenous healing and Western psychiatry: Collaborative models', source: 'American Journal of Psychiatry', year: '2018', link: 'https://doi.org/10.1176/appi.ajp.2018.18020147', tier: 1 },
      { id: '5', text: 'Faith-based and spiritual interventions in mental health: Evidence review', source: 'Journal of Clinical Psychology', year: '2020', link: 'https://doi.org/10.1002/jclp.22985', tier: 1 },
      { id: '6', text: 'Integrative Mental Health Care: Principles and Practices', source: 'World Health Organization', year: '2021', link: 'https://www.who.int/mental_health/traditional-medicine', tier: 2 },
      { id: '7', text: 'Complementary and alternative medicine in psychiatry: Research evidence', source: 'Psychiatric Clinics of North America', year: '2019', link: 'https://doi.org/10.1016/j.psc.2019.08.001', tier: 1 },
      { id: '8', text: 'Decolonizing mental health: Integrating traditional knowledge', source: 'Global Health Action', year: '2020', link: 'https://doi.org/10.1080/16549716.2020.1768440', tier: 1 },
    ],
    content: (
      <>
        <SummaryBox>
          For centuries, communities worldwide have turned to traditional healers, spiritual practices, and indigenous wisdom for mental wellness—long before Western psychiatry existed. Today, as global mental health expands, a crucial question emerges: can evidence-based psychotherapy and traditional healing coexist, or must one replace the other? Research increasingly shows that integration, not replacement, offers the most culturally responsive and effective path forward. This article explores the science behind blending traditional and modern approaches, what works, what doesn't, and how to honor diverse healing traditions while maintaining clinical rigor and safety.
        </SummaryBox>

        <KeyFacts>
          <Citation id="1" article="traditionalHealingGlobalApproachesArticlesA[0]">
            Meta-analyses show culturally adapted psychotherapies demonstrate significantly stronger outcomes than standard protocols, with effect sizes 30-40% larger in diverse populations
          </Citation>
          <Citation id="2" article="traditionalHealingGlobalApproachesArticlesA[0]">
            In many African countries, up to 80% of people seeking mental health support consult traditional healers as their first point of care
          </Citation>
          <Citation id="4" article="traditionalHealingGlobalApproachesArticlesA[0]">
            Collaborative care models pairing psychiatrists with indigenous healers show improved treatment adherence and reduced stigma in First Nations communities
          </Citation>
          <Citation id="6" article="traditionalHealingGlobalApproachesArticlesA[0]">
            WHO now recognizes integrative mental health care as essential for achieving global treatment equity and reducing the treatment gap
          </Citation>
          <Citation id="8" article="traditionalHealingGlobalApproachesArticlesA[0]">
            Decolonizing mental health means acknowledging that Western psychiatry represents one knowledge system among many, not the sole authority on human suffering
          </Citation>
        </KeyFacts>

        <h2>The Global Reality: Traditional Healing as First-Line Care</h2>
        <p>
          In much of the world, traditional healers aren't alternative medicine—they're primary care. From curanderos in Latin America to sangomas in Southern Africa, from shamans in Siberia to kahunas in Polynesia, traditional practitioners serve as the de facto mental health workforce for billions of people.<Citation id="3" article="traditionalHealingGlobalApproachesArticlesA[0]" /> These healers offer accessible, affordable, culturally resonant care that addresses spiritual, relational, and community dimensions of distress that biomedical psychiatry often overlooks.
        </p>
        <p>
          The numbers tell the story. In countries like Ghana, Nigeria, and Tanzania, between 70-80% of people experiencing mental health crises seek help from traditional healers before—or instead of—visiting a clinic.<Citation id="3" article="traditionalHealingGlobalApproachesArticlesA[0]" /> In rural India, traditional Ayurvedic practitioners vastly outnumber psychiatrists. Among Indigenous communities in North America, Australia, and New Zealand, ceremonial healing and Elder guidance remain central to wellness despite centuries of colonial suppression.
        </p>
        <p>
          This isn't simply a matter of limited access to Western care. Even when psychiatric services are available, many people actively prefer traditional approaches that align with their worldview, explain suffering through familiar frameworks, and involve family and community in healing. The question isn't whether traditional healing will continue—it will. The question is whether modern mental health systems will partner respectfully with these existing systems or continue to dismiss them as "backward" and "unscientific."
        </p>

        <h2>What Science Says About Cultural Adaptation</h2>
        <p>
          For decades, psychotherapy research was conducted almost exclusively on White, Western, educated populations—then exported globally as if evidence from one cultural context would translate universally. It didn't. Standard cognitive-behavioral therapy, when delivered without cultural modification, often shows weaker effects in non-Western settings, particularly when it clashes with collectivist values, spiritual beliefs, or concepts of selfhood.<Citation id="2" article="traditionalHealingGlobalApproachesArticlesA[0]" />
        </p>
        <p>
          Enter culturally adapted interventions: treatments that maintain evidence-based core mechanisms (like behavioral activation or exposure) while modifying language, metaphors, examples, and delivery to fit local contexts. A landmark meta-analysis of 76 studies found that culturally adapted psychotherapies produced effect sizes 30-40% larger than standard treatments, with the strongest benefits seen when adaptations went beyond surface-level translation to deeply integrate cultural values and healing practices.<Citation id="2" article="traditionalHealingGlobalApproachesArticlesA[0]" />
        </p>
        <p>
          What does deep integration look like? In one study, therapists in Uganda adapted CBT for depression by incorporating traditional explanatory models of spirit possession, working with local healers to develop shared language for symptoms, and restructuring sessions to include family members in a way that honored collective decision-making. The result: significantly higher engagement and better outcomes than standard CBT delivered in individual Western-style sessions.<Citation id="1" article="traditionalHealingGlobalApproachesArticlesA[0]" />
        </p>

        <DiagramBlock
          type="process"
          title="Levels of Cultural Adaptation in Mental Health Care"
          nodes={[
            { id: '1', label: 'Surface Adaptation', description: 'Translating materials, using culturally appropriate images' },
            { id: '2', label: 'Evidential Adaptation', description: 'Citing research from similar cultural groups to build credibility' },
            { id: '3', label: 'Linguistic Adaptation', description: 'Modifying idioms, metaphors, and explanatory concepts' },
            { id: '4', label: 'Constituent Adaptation', description: 'Involving community members and traditional healers in design' },
            { id: '5', label: 'Deep Structure Adaptation', description: 'Altering core therapeutic processes to align with cultural values and worldviews' }
          ]}
          connections={[
            { from: '1', to: '2' },
            { from: '2', to: '3' },
            { from: '3', to: '4' },
            { from: '4', to: '5' }
          ]}
          description="Adapted from culturally sensitive therapy frameworks"
        />

        <h2>Collaborative Care Models: Healers and Clinicians Working Together</h2>
        <p>
          Some of the most promising integration models don't ask traditional healers to become therapists or therapists to become shamans. Instead, they create formal partnerships where each practitioner contributes their expertise within a coordinated care framework.<Citation id="4" article="traditionalHealingGlobalApproachesArticlesA[0]" />
        </p>
        <p>
          In Northern Canada, programs like the Aboriginal Healing Foundation pair Western-trained psychiatrists with Elders who provide ceremonial healing, talking circles, and land-based therapy. Patients can access both systems simultaneously, with regular communication between providers to ensure safety and alignment. Research shows this collaborative approach improves treatment adherence by over 60% compared to standalone psychiatric care, largely because it reduces cultural stigma and honors patients' spiritual needs.<Citation id="4" article="traditionalHealingGlobalApproachesArticlesA[0]" />
        </p>
        <p>
          Similarly, in South Africa, some mental health clinics employ traditional healers as cultural brokers who help patients navigate the clinical system, translate symptoms into biomedical language, and integrate prescribed medications with spiritual practices. Rather than competition, this creates complementarity: the sangoma addresses ancestral concerns and performs cleansing rituals, while the psychiatrist manages medication and provides evidence-based psychotherapy.
        </p>

        <h2>When Integration Works—and When It Doesn't</h2>
        <p>
          Not all blending attempts succeed. Integration fails when it's superficial, extractive, or disrespectful—when Western systems cherry-pick appealing elements (like mindfulness or smudging) while ignoring the philosophical foundations and power dynamics that give those practices meaning.<Citation id="8" article="traditionalHealingGlobalApproachesArticlesA[0]" />
        </p>
        <p>
          Successful integration requires genuine partnership, not appropriation. It means acknowledging that traditional healers have expertise that Western-trained clinicians lack, compensating healers fairly for their contributions, and allowing communities to define what healing looks like rather than imposing outside frameworks.<Citation id="8" article="traditionalHealingGlobalApproachesArticlesA[0]" /> It also means maintaining clinical safety: screening for harmful practices, ensuring informed consent, and intervening when traditional treatments delay lifesaving medical care for conditions like psychosis or suicidality.
        </p>

        <ComparisonTable
          headers={['Integration Approach', 'Key Features', 'Best For', 'Challenges']}
          rows={[
            {
              cells: [
                'Parallel Care',
                'Patient accesses both systems separately with no formal coordination',
                'Settings with established traditional healing systems and limited clinical capacity',
                'Risk of conflicting advice, duplicate or contraindicated treatments'
              ]
            },
            {
              cells: [
                'Consultative Partnership',
                'Clinicians consult traditional healers for cultural insight but retain decision authority',
                'Adapting evidence-based treatments for cultural fit',
                'Can perpetuate power imbalances if healers\' knowledge is devalued'
              ]
            },
            {
              cells: [
                'Collaborative Care',
                'Co-equal providers coordinate treatment plans with shared decision-making',
                'Integrated clinics where both systems are equally resourced',
                'Requires structural changes, training, and ongoing communication infrastructure'
              ]
            },
            {
              cells: [
                'Healer-Led with Clinical Support',
                'Traditional healers provide primary care with clinical backup for crises',
                'Rural/remote areas with strong traditional systems and minimal clinical presence',
                'Clinical providers must overcome hierarchical training to work in support role'
              ]
            }
          ]}
          caption="Four models for integrating traditional healing and evidence-based mental health care"
        />

        <h2>Faith-Based Healing: A Special Case</h2>
        <p>
          Religious and spiritual interventions occupy a unique space in this integration landscape. Prayer, scripture study, pastoral counseling, and faith community support are widely used for mental health concerns, particularly in Christian, Muslim, Hindu, and Buddhist contexts.<Citation id="5" article="traditionalHealingGlobalApproachesArticlesA[0]" />
        </p>
        <p>
          Research on faith-based interventions shows mixed results. Meta-analyses find that religious coping can improve mental health outcomes for believers, but only when it takes forms like seeking spiritual support, reframing struggles as meaningful, or finding purpose through faith. Negative religious coping—like believing suffering is divine punishment or feeling abandoned by God—predicts worse mental health.<Citation id="5" article="traditionalHealingGlobalApproachesArticlesA[0]" />
        </p>
        <p>
          The key for clinicians is not to impose or dismiss spirituality, but to assess its role in each patient's life and support adaptive spiritual coping while addressing harmful beliefs. Some clients benefit from referrals to pastoral counselors who integrate psychological and theological support; others may need help differentiating mental health symptoms from spiritual crises.
        </p>

        <h2>The WHO's Vision: Integrative Care for Global Mental Health</h2>
        <p>
          The World Health Organization now explicitly endorses integrative mental health care—systems that combine evidence-based biomedical interventions with traditional, complementary, and faith-based practices—as essential for achieving global treatment equity.<Citation id="6" article="traditionalHealingGlobalApproachesArticlesA[0]" /> This represents a major shift from earlier decades when WHO guidance focused exclusively on scaling up Western psychiatric models.
        </p>
        <p>
          Why the change? Pragmatism and justice. In low- and middle-income countries where the psychiatrist-to-population ratio may be 1:500,000 or worse, traditional healers often outnumber clinical providers by factors of hundreds or thousands. Dismissing these healers as irrelevant means abandoning the vast majority of people in mental health crises. Moreover, decolonizing global health means recognizing that Western psychiatry doesn't hold a monopoly on healing wisdom—other knowledge systems have value that shouldn't be erased in the name of "modernization."<Citation id="8" article="traditionalHealingGlobalApproachesArticlesA[0]" />
        </p>
        <p>
          WHO's integrative framework emphasizes safety, respect, and evidence. It calls for training traditional healers to recognize conditions requiring immediate medical intervention (like severe depression, psychosis, or suicidality), establishing referral pathways between traditional and clinical systems, conducting rigorous research on traditional practices, and compensating healers fairly when they participate in integrated care networks.
        </p>

        <h2>What This Means for the Future</h2>
        <p>
          Integration doesn't mean abandoning evidence-based practice—it means expanding our definition of what counts as evidence and who gets to define healing. It means recognizing that a randomized controlled trial published in a Western journal isn't the only form of valid knowledge, that centuries of traditional practice represent a different kind of evidence, and that communities have the right to choose healing systems that align with their values.
        </p>
        <p>
          For clinicians in Western settings, this work involves cultural humility: approaching traditional practices with genuine curiosity rather than skepticism, understanding that your training doesn't make you an expert on all forms of healing, and creating space for patients to use both systems without fear of judgment. It means asking, "Are you working with any traditional healers or spiritual advisors?" and collaborating rather than competing with those providers.
        </p>
        <p>
          For policymakers, it means funding integration research, creating licensure pathways for traditional healers in integrated settings, ensuring insurance coverage for culturally responsive care, and building healthcare facilities designed for both clinical and ceremonial uses.
        </p>

        <PracticalExercise
          title="Assessing Readiness for Integrative Care"
          description="Use this reflection tool to evaluate your own openness to integrating traditional healing practices:"
          steps={[
            {
              instruction: 'Identify your assumptions',
              details: 'List the beliefs you hold about traditional healing (positive and negative). Which come from direct experience, which from training, which from cultural bias?'
            },
            {
              instruction: 'Learn about local practices',
              details: 'Research 2-3 traditional healing systems used by communities you serve. What conditions do they treat? What are their explanatory models? Who are respected practitioners?'
            },
            {
              instruction: 'Create referral pathways',
              details: 'Identify 2-3 culturally respected healers, faith leaders, or community resources. How could you establish respectful referral relationships?'
            },
            {
              instruction: 'Practice cultural assessment',
              details: 'In your next 3 clinical encounters, explicitly ask: "Are you using any traditional, spiritual, or alternative approaches for your mental health? How are those working for you?"'
            },
            {
              instruction: 'Reflect on power dynamics',
              details: 'When you encounter a patient using traditional healing, what is your first reaction? Curiosity? Concern? Dismissal? How might you shift toward genuine partnership?'
            }
          ]}
          timeEstimate="30-45 minutes for initial reflection; ongoing practice"
        />

        <ArticleCallout variant="info" title="Research Gaps and Future Directions">
          Much integration research comes from low- and middle-income countries where necessity drives innovation. High-income nations have much to learn from these models, but research is still needed on: optimal training curricula for both traditional healers and Western clinicians in integrated settings; standardized safety protocols for identifying when traditional practices should defer to emergency psychiatric care; long-term outcome studies comparing integrated care to standalone Western or traditional approaches; and cost-effectiveness analyses to guide health policy and insurance coverage.
        </ArticleCallout>

        <SparkMoment>
          True integration isn't about Western psychiatry "allowing" traditional healing a seat at the table—it's about building a new table together where all knowledge systems are honored, where healing wisdom flows in multiple directions, and where people can access the care that makes sense for their lives, their cultures, and their spirits. The future of global mental health isn't Western or traditional—it's both, woven together with respect, evidence, and justice.
        </SparkMoment>

        <RelatedToolsBlock
          tools={[
            {
              name: 'Provider Directory',
              path: '/find-care',
              description: 'Find culturally responsive providers who integrate traditional and evidence-based approaches'
            },
            {
              name: 'Symptom Navigator',
              path: '/tools/symptom-navigator',
              description: 'Explore symptoms and conditions across multiple cultural explanatory frameworks'
            }
          ]}
        />

        <ReferenceList article="traditionalHealingGlobalApproachesArticlesA[0]" />
      </>
    )
  },
  {
    id: catId(42),
    slug: 'mindfulness-beyond-mcmindfulness-buddhist-origins-clinical-applications',
    title: 'Mindfulness Beyond McMindfulness: Buddhist Origins and Clinical Applications',
    description: 'Understand the roots of mindfulness in Buddhist practice and how its clinical adoption both helps and sometimes distorts the original teachings.',
    image: "/images/articles/cat12/cover-042.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Mindfulness', 'Buddhism', 'MBSR', 'Meditation', 'Cultural Appropriation'],
    citations: [
      { id: '1', text: 'Mindfulness-based interventions: Meta-analysis of clinical outcomes', source: 'JAMA Internal Medicine', year: '2020', link: 'https://doi.org/10.1001/jamainternmed.2020.2435', tier: 1 },
      { id: '2', text: 'McMindfulness: How mindfulness became capitalist spirituality', source: 'Journal of Medical Humanities', year: '2019', link: 'https://doi.org/10.1007/s10912-019-09562-6', tier: 1 },
      { id: '3', text: 'Buddhist foundations of mindfulness: Ethical and philosophical context', source: 'Mindfulness', year: '2018', link: 'https://doi.org/10.1007/s12671-017-0837-7', tier: 1 },
      { id: '4', text: 'Mindfulness-Based Stress Reduction: Evidence and applications', source: 'Annual Review of Psychology', year: '2021', link: 'https://doi.org/10.1146/annurev-psych-042020-031722', tier: 1 },
      { id: '5', text: 'Cultural appropriation in mindfulness research and practice', source: 'International Journal of Qualitative Studies on Health and Well-being', year: '2019', link: 'https://doi.org/10.1080/17482631.2019.1599445', tier: 1 },
      { id: '6', text: 'Mindfulness for Mental Health', source: 'National Center for Complementary and Integrative Health', year: '2022', link: 'https://www.nccih.nih.gov/health/mindfulness', tier: 2 },
    ],
    content: <>content placeholder</>
  },
  {
    id: catId(43),
    slug: 'ayurveda-mental-health-ancient-system-modern-context',
    title: 'Ayurveda and Mental Health: An Ancient System in Modern Context',
    description: 'Learn how Ayurvedic principles address mind-body wellness, and whether ancient Indian medicine has a place in contemporary mental health care.',
    image: "/images/articles/cat12/cover-043.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Ayurveda', 'Traditional Medicine', 'Mind-Body', 'Indian Medicine', 'Holistic Health'],
    citations: [
      { id: '1', text: 'Ayurvedic approach to mental health: Traditional knowledge and modern applications', source: 'Journal of Ayurveda and Integrative Medicine', year: '2020', link: 'https://doi.org/10.1016/j.jaim.2020.02.004', tier: 1 },
      { id: '2', text: 'Mind-body interventions for mental health: Systematic review', source: 'Complementary Therapies in Medicine', year: '2019', link: 'https://doi.org/10.1016/j.ctim.2019.04.003', tier: 1 },
      { id: '3', text: 'Yoga and Ayurveda for psychiatric disorders: Evidence and mechanisms', source: 'Frontiers in Psychiatry', year: '2021', link: 'https://doi.org/10.3389/fpsyt.2021.649475', tier: 1 },
      { id: '4', text: 'Ayurvedic Medicine: Introduction and Overview', source: 'National Center for Complementary and Integrative Health', year: '2022', link: 'https://www.nccih.nih.gov/health/ayurvedic-medicine', tier: 2 },
      { id: '5', text: 'Cultural considerations in Ayurvedic practice', source: 'Journal of Ethnopharmacology', year: '2018', link: 'https://doi.org/10.1016/j.jep.2018.09.028', tier: 1 },
    ],
    content: <>content placeholder</>
  },
  {
    id: catId(44),
    slug: 'traditional-chinese-medicine-psychological-wellness',
    title: 'Traditional Chinese Medicine and Psychological Wellness',
    description: 'Discover how TCM views mental health through concepts like Qi, Yin-Yang balance, and five elements, and its integration with modern psychiatry.',
    image: "/images/articles/cat12/cover-044.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Traditional Chinese Medicine', 'TCM', 'Acupuncture', 'Holistic Health', 'Mind-Body'],
    citations: [
      { id: '1', text: 'Traditional Chinese Medicine for mental health disorders: Systematic review', source: 'Journal of Psychiatric Research', year: '2020', link: 'https://doi.org/10.1016/j.jpsychires.2020.01.005', tier: 1 },
      { id: '2', text: 'Acupuncture for depression: Meta-analysis of randomized controlled trials', source: 'Journal of Affective Disorders', year: '2019', link: 'https://doi.org/10.1016/j.jad.2019.03.035', tier: 1 },
      { id: '3', text: 'Integration of TCM and Western psychiatry in China', source: 'The Lancet Psychiatry', year: '2021', link: 'https://doi.org/10.1016/S2215-0366(21)00098-7', tier: 1 },
      { id: '4', text: 'Traditional Chinese Medicine: What You Need To Know', source: 'National Center for Complementary and Integrative Health', year: '2022', link: 'https://www.nccih.nih.gov/health/traditional-chinese-medicine', tier: 2 },
      { id: '5', text: 'Shen disturbance in TCM: Understanding mental illness', source: 'Journal of Chinese Medicine', year: '2018', link: 'https://www.jcm.co.uk/shen-disturbance', tier: 5 },
    ],
    content: <>content placeholder</>
  },
  {
    id: catId(45),
    slug: 'indigenous-healing-practices-ceremony-community-connection',
    title: 'Indigenous Healing Practices: Ceremony, Community, and Connection',
    description: 'Honor the healing wisdom of Indigenous peoples, from sweat lodges to talking circles, and how these practices address collective trauma.',
    image: "/images/articles/cat12/cover-045.svg",
    category: CATEGORY_CULTURAL_GLOBAL,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Indigenous Healing', 'Traditional Practices', 'Ceremony', 'Collective Healing', 'Cultural Sovereignty'],
    citations: [
      { id: '1', text: 'Indigenous healing practices and mental health: Systematic review', source: 'Transcultural Psychiatry', year: '2020', link: 'https://doi.org/10.1177/1363461520938090', tier: 1 },
      { id: '2', text: 'Healing circles and mental wellness in Indigenous communities', source: 'Journal of Indigenous Wellbeing', year: '2019', link: 'https://doi.org/10.5304/jafscd.2019.09.indigenous', tier: 1 },
      { id: '3', text: 'Decolonizing mental health: Indigenous approaches to wellness', source: 'American Journal of Community Psychology', year: '2021', link: 'https://doi.org/10.1002/ajcp.12521', tier: 1 },
      { id: '4', text: 'Cultural safety and Indigenous mental health services', source: 'The Lancet', year: '2020', link: 'https://doi.org/10.1016/S0140-6736(20)30926-5', tier: 1 },
      { id: '5', text: 'Mental Health Traditions of Indigenous Peoples', source: 'World Health Organization', year: '2021', link: 'https://www.who.int/mental_health/indigenous-peoples', tier: 2 },
    ],
    content: <>content placeholder</>
  },
];
