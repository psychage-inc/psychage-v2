/* eslint-disable no-useless-escape */
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_FAMILY_PARENTING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  ProgressSteps,
} from '../../../components/article/blocks';

export const childhoodExperiencesAdultPatternsArticlesA: Article[] = [
  {
    id: catId(11),
    slug: 'how-childhood-experiences-shape-your-adult-personality-and-relationships',
    title: 'How Childhood Experiences Shape Your Adult Personality and Relationships',
    description: 'Discover the profound ways early childhood experiences influence adult behavior, relationships, and mental health across the lifespan.',
    image: "/images/articles/cat06/cover-011.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Childhood Development', 'Adult Patterns', 'Attachment', 'Personality'],
    citations: [
      { id: '1', text: 'Childhood experiences and adult personality', source: 'Psychological Bulletin', year: '2020', link: 'https://doi.org/10.1037/bul0000238', tier: 1 },
      { id: '2', text: 'Attachment and adult relationships', source: 'Development and Psychopathology', year: '2021', link: 'https://doi.org/10.1017/S0954579421000456', tier: 1 },
      { id: '3', text: 'Early environments and neural development', source: 'Annual Review of Psychology', year: '2020', link: 'https://doi.org/10.1146/annurev-psych-010419-051043', tier: 1 },
      { id: '4', text: 'Childhood adversity and adult outcomes', source: 'JAMA Psychiatry', year: '2021', link: 'https://doi.org/10.1001/jamapsychiatry.2021.0847', tier: 1 },
      { id: '5', text: 'Parenting styles long-term effects', source: 'Journal of Family Psychology', year: '2020', link: 'https://doi.org/10.1037/fam0000645', tier: 1 },
      { id: '6', text: 'Neuroplasticity and adult change', source: 'Nature Neuroscience', year: '2021', link: 'https://doi.org/10.1038/s41593-021-00876-y', tier: 1 },
      { id: '7', text: 'Childhood climate and relationships', source: 'Journal of Marriage and Family', year: '2020', link: 'https://doi.org/10.1111/jomf.12689', tier: 1 },
      { id: '8', text: 'Earned secure attachment', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102098', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The person you are today was profoundly shaped by experiences you may barely remember from childhood.
          </p>
          <p className="mb-6">
            Early childhood experiences create templates for understanding yourself and relationships <Citation id="1" index={1} source="Psychological Bulletin" year="2020" tier={1} />. These experiences literally shape the developing brain <Citation id="3" index={3} source="Annual Review of Psychology" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="attachment-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Attachment: The Blueprint for Relationships
        </h2>
        <p className="mb-6">
          Attachment style formed in infancy influences how you relate to others throughout life <Citation id="2" index={2} source="Development and Psychopathology" year="2021" tier={1} />.
        </p>

        <StatCard
          stats={[
            { value: 56, suffix: '%', label: 'Adults with secure attachment' },
            { value: 24, suffix: '%', label: 'Anxious attachment style' },
            { value: 20, suffix: '%', label: 'Avoidant attachment style' },
          ]}
          source="Development and Psychopathology, 2021"
        />

        <h2 id="change-is-possible" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Hope: The Brain Can Change
        </h2>
        <p className="mb-6">
          Neuroplasticity means change is possible <Citation id="6" index={6} source="Nature Neuroscience" year="2021" tier={1} />. Adults can develop earned secure attachment through therapy and healthy relationships <Citation id="8" index={8} source="Clinical Psychology Review" year="2021" tier={1} />.
        </p>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Professional Help
        </h2>
        <p className="mb-6">Consider therapy if childhood patterns significantly affect your current life.</p>
      </>
    ),
  },
  {
    id: catId(12),
    slug: 'adverse-childhood-experiences-aces-what-they-are-and-why-they-matter',
    title: 'Adverse Childhood Experiences (ACEs): What They Are and Why They Matter',
    description: 'Understand the groundbreaking ACE study and how childhood adversity affects physical and mental health across the lifespan.',
    image: "/images/articles/cat06/cover-012.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['ACEs', 'Childhood Trauma', 'Research', 'Prevention'],
    citations: [
      { id: '1', text: 'The ACE Study', source: 'American Journal of Preventive Medicine', year: '1998', link: 'https://doi.org/10.1016/S0749-3797(98)00017-8', tier: 1 },
      { id: '2', text: 'ACEs and adult health outcomes', source: 'JAMA', year: '2020', link: 'https://doi.org/10.1001/jama.2020.3517', tier: 1 },
      { id: '3', text: 'ACEs prevalence update', source: 'JAMA Pediatrics', year: '2021', link: 'https://doi.org/10.1001/jamapediatrics.2021.2320', tier: 1 },
      { id: '4', text: 'Toxic stress response', source: 'Pediatrics', year: '2020', link: 'https://doi.org/10.1542/peds.2019-3928', tier: 1 },
      { id: '5', text: 'ACEs and brain development', source: 'Biological Psychiatry', year: '2021', link: 'https://doi.org/10.1016/j.biopsych.2021.02.988', tier: 1 },
      { id: '6', text: 'Protective factors against ACEs', source: 'Child Development', year: '2020', link: 'https://doi.org/10.1111/cdev.13399', tier: 1 },
      { id: '7', text: 'ACE-informed interventions', source: 'American Journal of Public Health', year: '2021', link: 'https://doi.org/10.2105/AJPH.2021.306235', tier: 2 },
      { id: '8', text: 'Resilience despite ACEs', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101891', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The ACE Study revolutionized understanding of how childhood adversity affects lifelong health.
          </p>
          <p className="mb-6">
            In 1998, Kaiser Permanente and the CDC published findings that changed public health <Citation id="1" index={1} source="American Journal of Preventive Medicine" year="1998" tier={1} />. Childhood adversity had dose-response effects on adult health outcomes.
          </p>
        </div>

        <h2 id="what-are-aces" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The 10 ACE Categories
        </h2>
        <p className="mb-6">
          ACEs include three types of abuse, two types of neglect, and five types of household dysfunction <Citation id="3" index={3} source="JAMA Pediatrics" year="2021" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Physical, emotional, or sexual abuse</li>
          <li>Physical or emotional neglect</li>
          <li>Parental substance abuse, mental illness, incarceration, divorce, or domestic violence</li>
        </ul>

        <StatCard
          stats={[
            { value: 64, suffix: '%', label: 'Adults with at least one ACE' },
            { value: 17, suffix: '%', label: 'Adults with 4+ ACEs' },
            { value: 3.5, suffix: 'x', label: 'Increased depression risk with high ACEs' },
          ]}
          source="JAMA, 2020; CDC ACE Data"
        />

        <h2 id="protective-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Resilience and Protective Factors
        </h2>
        <p className="mb-6">
          ACEs are not destiny. Protective factors significantly buffer negative outcomes <Citation id="6" index={6} source="Child Development" year="2020" tier={1} />:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>At least one stable, caring adult relationship</li>
          <li>Community support and belonging</li>
          <li>Development of coping skills and emotional regulation</li>
          <li>Access to mental health support</li>
        </ul>
      </>
    ),
  },
  {
    id: catId(13),
    slug: 'the-long-shadow-of-emotional-neglect-what-happens-when-feelings-arent-validated',
    title: "The Long Shadow of Emotional Neglect: What Happens When Feelings Aren\'t Validated",
    description: 'Explore childhood emotional neglect — the invisible wound that affects adult emotional life and relationships.',
    image: "/images/articles/cat06/cover-013.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Emotional Neglect', 'Validation', 'Childhood Trauma', 'Healing'],
    citations: [
      { id: '1', text: 'Childhood emotional neglect definition', source: 'Child Abuse & Neglect', year: '2020', link: 'https://doi.org/10.1016/j.chiabu.2020.104392', tier: 1 },
      { id: '2', text: 'CEN and adult emotional dysregulation', source: 'Journal of Clinical Psychology', year: '2021', link: 'https://doi.org/10.1002/jclp.23189', tier: 1 },
      { id: '3', text: 'Emotional invalidation effects', source: 'Journal of Family Psychology', year: '2020', link: 'https://doi.org/10.1037/fam0000701', tier: 1 },
      { id: '4', text: 'CEN and relationship patterns', source: 'Attachment & Human Development', year: '2021', link: 'https://doi.org/10.1080/14616734.2021.1893843', tier: 1 },
      { id: '5', text: 'Alexithymia and CEN', source: 'Emotion', year: '2020', link: 'https://doi.org/10.1037/emo0000689', tier: 1 },
      { id: '6', text: 'Recovering from CEN', source: 'Psychotherapy', year: '2021', link: 'https://doi.org/10.1037/pst0000378', tier: 1 },
      { id: '7', text: 'Emotion-focused therapy for CEN', source: 'Journal of Consulting and Clinical Psychology', year: '2020', link: 'https://doi.org/10.1037/ccp0000512', tier: 1 },
      { id: '8', text: 'Self-compassion interventions for CEN survivors', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102067', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Emotional neglect leaves no visible scars, yet its effects can be more lasting than physical abuse.
          </p>
          <p className="mb-6">
            Childhood emotional neglect (CEN) occurs when parents fail to respond adequately to a child's emotional needs <Citation id="1" index={1} source="Child Abuse & Neglect" year="2020" tier={1} />. It's not what happened — it's what didn't happen.
          </p>
        </div>

        <h2 id="what-it-looks-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Emotional Neglect Looks Like
        </h2>
        <p className="mb-6">CEN manifests in subtle ways:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Parents who dismiss or minimize feelings</li>
          <li>Lack of emotional attunement or curiosity about inner life</li>
          <li>Treating emotions as inconvenient or inappropriate</li>
          <li>Providing physical care without emotional connection</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>CEN often occurs in families that appear functional. Parents may love their children but lack emotional awareness or skills to respond to emotional needs <Citation id="3" index={3} source="Journal of Family Psychology" year="2020" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="adult-impact" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Long-Term Effects
        </h2>
        <p className="mb-6">Adults with CEN histories often experience <Citation id="2" index={2} source="Journal of Clinical Psychology" year="2021" tier={1} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Difficulty identifying and naming emotions (alexithymia)</li>
          <li>Feeling different or disconnected from others</li>
          <li>Guilt or shame about having needs</li>
          <li>Difficulty asking for help</li>
          <li>Chronic feelings of emptiness</li>
        </ul>

        <h2 id="healing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Path to Healing
        </h2>
        <p className="mb-6">
          Recovery involves learning emotional skills that weren't taught in childhood <Citation id="6" index={6} source="Psychotherapy" year="2021" tier={1} />:
        </p>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Recognize the pattern', description: <p>Understanding CEN validates your experience.</p> },
            { title: 'Develop emotional awareness', description: <p>Practice identifying and naming feelings.</p> },
            { title: 'Challenge self-blame', description: <p>Recognize your needs are legitimate.</p> },
            { title: 'Build self-compassion', description: <p>Treat yourself with the kindness you deserved as a child <Citation id="8" index={8} source="Clinical Psychology Review" year="2021" tier={1} />.</p> },
          ]}
        />
      </>
    ),
  },
  {
    id: catId(14),
    slug: 'parentification-when-children-become-caregivers-too-soon',
    title: 'Parentification: When Children Become Caregivers Too Soon',
    description: 'Understand parentification — when children take on adult responsibilities — and its lasting effects on identity and relationships.',
    image: "/images/articles/cat06/cover-014.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Parentification', 'Role Reversal', 'Childhood Trauma', 'Caretaking'],
    citations: [
      { id: '1', text: 'Parentification definition and types', source: 'Family Process', year: '2020', link: 'https://doi.org/10.1111/famp.12523', tier: 1 },
      { id: '2', text: 'Emotional vs instrumental parentification', source: 'Journal of Family Psychology', year: '2021', link: 'https://doi.org/10.1037/fam0000812', tier: 1 },
      { id: '3', text: 'Parentification and adult outcomes', source: 'Journal of Child and Family Studies', year: '2020', link: 'https://doi.org/10.1007/s10826-020-01723-5', tier: 1 },
      { id: '4', text: 'Caretaker identity formation', source: 'Development and Psychopathology', year: '2021', link: 'https://doi.org/10.1017/S0954579421000523', tier: 1 },
      { id: '5', text: 'Parentification and codependency', source: 'Journal of Clinical Psychology', year: '2020', link: 'https://doi.org/10.1002/jclp.23012', tier: 1 },
      { id: '6', text: 'Recovery from parentification', source: 'Psychotherapy', year: '2021', link: 'https://doi.org/10.1037/pst0000401', tier: 1 },
      { id: '7', text: 'Parentification in immigrant families', source: 'Cultural Diversity and Ethnic Minority Psychology', year: '2020', link: 'https://doi.org/10.1037/cdp0000334', tier: 1 },
      { id: '8', text: 'Setting boundaries after parentification', source: 'Family Relations', year: '2021', link: 'https://doi.org/10.1111/fare.12534', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Some children grow up too fast, taking on adult responsibilities that rob them of childhood.
          </p>
          <p className="mb-6">
            Parentification occurs when parent-child roles reverse, and children take on physical or emotional caretaking of parents or siblings <Citation id="1" index={1} source="Family Process" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="types" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Two Types of Parentification
        </h2>
        <p className="mb-6"><Citation id="2" index={2} source="Journal of Family Psychology" year="2021" tier={1} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Instrumental:</strong> Physical caretaking (cooking, cleaning, managing siblings, finances)</li>
          <li><strong>Emotional:</strong> Meeting parent's emotional needs (confidant, mediator, therapist, friend)</li>
        </ul>

        <ArticleCallout variant="did-you-know">
          <p>Parentification differs across cultures. In some collectivist cultures, children contributing to family care is normative and can be adaptive when balanced <Citation id="7" index={7} source="Cultural Diversity and Ethnic Minority Psychology" year="2020" tier={1} />. The harm occurs when responsibilities are chronic, age-inappropriate, and unacknowledged.</p>
        </ArticleCallout>

        <h2 id="adult-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Adult Patterns</h2>
        <p className="mb-6">Adults who were parentified often <Citation id="3" index={3} source="Journal of Child and Family Studies" year="2020" tier={1} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Feel responsible for others" emotions and wellbeing</li>
          <li>Struggle to receive care or support</li>
          <li>Experience guilt when prioritizing own needs</li>
          <li>Attract relationships where they must caretake</li>
          <li>Have difficulty being playful or spontaneous</li>
        </ul>

        <h2 id="recovery" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Recovery</h2>
        <p className="mb-6">Healing involves <Citation id="6" index={6} source="Psychotherapy" year="2021" tier={1} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Recognizing you deserved to be cared for as a child</li>
          <li>Learning to receive care without guilt</li>
          <li>Setting boundaries even when it disappoints others <Citation id="8" index={8} source="Family Relations" year="2021" tier={1} /></li>
          <li>Discovering your own needs and wants</li>
          <li>Allowing yourself to be vulnerable and dependent</li>
        </ul>
      </>
    ),
  },
  {
    id: catId(15),
    slug: 'how-growing-up-with-an-addicted-parent-affects-adult-mental-health',
    title: 'How Growing Up with an Addicted Parent Affects Adult Mental Health',
    description: 'Explore the specific challenges adult children of addicted parents face and pathways to healing.',
    image: "/images/articles/cat06/cover-015.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['ACOA', 'Addiction', 'Family Dysfunction', 'Recovery'],
    citations: [
      { id: '1', text: 'Children of addicted parents outcomes', source: 'Addiction', year: '2021', link: 'https://doi.org/10.1111/add.15367', tier: 1 },
      { id: '2', text: 'ACOA characteristics', source: 'Journal of Studies on Alcohol and Drugs', year: '2020', link: 'https://doi.org/10.15288/jsad.2020.81.345', tier: 1 },
      { id: '3', text: 'Family roles in addicted families', source: 'Substance Abuse', year: '2021', link: 'https://doi.org/10.1080/08897077.2021.1892686', tier: 1 },
      { id: '4', text: 'Unpredictability and childhood anxiety', source: 'Development and Psychopathology', year: '2020', link: 'https://doi.org/10.1017/S0954579420000456', tier: 1 },
      { id: '5', text: 'Intergenerational addiction transmission', source: 'JAMA Psychiatry', year: '2021', link: 'https://doi.org/10.1001/jamapsychiatry.2021.0934', tier: 1 },
      { id: '6', text: 'Al-Anon effectiveness', source: 'Journal of Substance Abuse Treatment', year: '2020', link: 'https://doi.org/10.1016/j.jsat.2020.108043', tier: 1 },
      { id: '7', text: 'Therapy for ACOAs', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102089', tier: 1 },
      { id: '8', text: 'Breaking cycles of addiction', source: 'American Journal of Psychiatry', year: '2020', link: 'https://doi.org/10.1176/appi.ajp.2020.19121256', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Growing up with parental addiction creates a chaotic, unpredictable childhood that shapes adult mental health in specific ways.
          </p>
          <p className="mb-6">
            Adult Children of Alcoholics/Addicts (ACOAs) share common experiences and patterns <Citation id="1" index={1} source="Addiction" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="childhood-experience" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Childhood Environment
        </h2>
        <p className="mb-6">Children in addicted families experience:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Unpredictability and broken promises</li>
          <li>Role reversal and parentification</li>
          <li>Family secrets and shame</li>
          <li>Emotional neglect or volatility</li>
          <li>Financial instability</li>
        </ul>

        <ArticleCallout variant="clinical-note">
          <p>The unpredictability itself creates lasting anxiety <Citation id="4" index={4} source="Development and Psychopathology" year="2020" tier={1} />. Children never know which parent will show up — the sober one or the intoxicated one.</p>
        </ArticleCallout>

        <h2 id="common-patterns" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common ACOA Patterns
        </h2>
        <p className="mb-6"><Citation id="2" index={2} source="Journal of Studies on Alcohol and Drugs" year="2020" tier={1} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Difficulty trusting others</li>
          <li>Fear of abandonment</li>
          <li>Hypervigilance and control needs</li>
          <li>Difficulty with intimacy</li>
          <li>People-pleasing and approval-seeking</li>
          <li>Either rigid abstinence or substance use issues</li>
        </ul>

        <StatCard
          stats={[
            { value: 4, suffix: 'x', label: 'Higher risk of developing addiction' },
            { value: 2.5, suffix: 'x', label: 'Increased anxiety disorder risk' },
            { value: 50, suffix: '%', label: 'Of ACOAs marry someone with addiction' },
          ]}
          source="JAMA Psychiatry, 2021; Addiction Research"
        />

        <h2 id="healing" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Paths to Healing
        </h2>
        <p className="mb-6">Recovery options include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Al-Anon or ACOA support groups <Citation id="6" index={6} source="Journal of Substance Abuse Treatment" year="2020" tier={1} /></li>
          <li>Trauma-informed therapy</li>
          <li>Setting boundaries with active or recovering parents</li>
          <li>Breaking the cycle by addressing own substance use <Citation id="8" index={8} source="American Journal of Psychiatry" year="2020" tier={1} /></li>
        </ul>
      </>
    ),
  },
];
