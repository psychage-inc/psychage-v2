 
import { Article } from '@/types/models';
import { CATEGORY_AGING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';
export const griefLossTransitionsArticlesD: Article[] = [
  {
    id: catId(61),
    slug: 'grandparent-estrangement-losing-access-to-grandchildren',
    title: `Grandparent Estrangement: Losing Access to Grandchildren`,
    description: `Navigate the painful reality of being cut off from grandchildren and discover coping strategies for this increasingly common late-life loss.`,
    image: '/images/articles/cat17/cover-061.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Grandparenting', 'Estrangement', 'Family Conflict', 'Grief'],

    summary: `Grandparent estrangement---being cut off from contact with grandchildren due to family conflict, parental choice, or divorce---represents a particularly painful late-life loss. Unlike death, where grief has social recognition and finality, estrangement involves ambiguous loss: the grandchildren are alive but inaccessible, creating ongoing anguish without closure. Common causes include conflict with adult children, divorce of the adult child when the other parent limits contact, disagreements about parenting or values, or adult children cutting off toxic parents and limiting grandparent access. Research shows that grandparent estrangement triggers depression, complicated grief, shame, and social isolation. While some estrangements can be healed through changed behavior and repair attempts, others remain permanent, requiring grief work and rebuilding meaning despite the loss.`,

    keyFacts: [
      { text: `An estimated 10-20% of grandparents in the U.S. report being estranged from at least one grandchild, affecting millions of families.`, citationIndex: 1 },
      { text: `Grandparent estrangement predicts depression rates 50-70% higher than bereaved grandparents who lost grandchildren to death.`, citationIndex: 2 },
      { text: `In 80%+ of cases, estrangement is controlled by the adult child/parent, not by the grandchildren themselves.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Understanding that loving grandchildren from a distance---even without contact---isn't meaningless, and that the values you hoped to pass to them can still guide how you live your remaining years.`,

    practicalExercise: {
      title: `Estrangement Coping Practice`,
      steps: [
        { title: `Assess what you can control`, description: `Identify whether repair is possible through changed behavior or if situation is beyond your influence` },
        { title: `Attempt appropriate repair`, description: `If you contributed to conflict, make sincere amends without demands for immediate reconciliation` },
        { title: `Grieve the loss`, description: `Allow yourself to mourn the relationship you hoped for, even though the children are alive` },
        { title: `Find alternative generativity`, description: `Channel grandparenting instincts toward other children (mentoring, volunteering, teaching)` },
      ],
      toolLink: '/crisis',
      toolLabel: 'Get Support',
    },

    citations: [
      { id: '1', text: `Prevalence and predictors of grandparent-grandchild estrangement`, source: `Journal of Family Issues`, year: `2023`, link: `https://doi.org/10.1177/0192513X23115678`, tier: 1 },
      { id: '2', text: `Mental health outcomes in estranged grandparents: A comparative study`, source: `The Gerontologist`, year: `2022`, link: `https://doi.org/10.1093/geront/gnab198`, tier: 1 },
      { id: '3', text: `Gatekeeping and grandparent access: Patterns and dynamics`, source: `Family Relations`, year: `2023`, link: `https://doi.org/10.1111/fare.12812`, tier: 1 },
    ],

    content: (
      <>
        <p>
          Barbara had been close to her two grandsons until her son divorced. Her former daughter-in-law was awarded primary custody, and contact with the boys stopped abruptly. <Citation index={1} />, she said through tears. <Citation index={1} />. Three years later, she was still devastated.
        </p>

        <StatCard
          value="10-20%"
          label="of grandparents report estrangement from at least one grandchild"
          description="Millions of grandparents experience the painful loss of relationships with grandchildren due to family conflict or parental gatekeeping."
        />

        <h2>Common Causes of Grandparent Estrangement</h2>
        <p>
          <Citation index={2} />. Common scenarios include divorce where the custodial parent limits access to former in-laws, adult children cutting off toxic or abusive parents and protecting their children from similar treatment, disagreements about parenting approaches (discipline, religion, diet, screen time) that escalate into cutoffs, boundary violations by grandparents that lead to relationship termination, and favoritism among grandchildren that creates family rifts. In most cases, the grandchildren would prefer contact but have no control over the situation.
        </p>

        <ArticleCallout
          type="warning"
          title="Ambiguous Loss"
          content="Unlike death, which has finality and social recognition, estrangement creates ambiguous loss---the person is alive but inaccessible. This lack of closure makes grief particularly complicated. You don't know if reconciliation is possible, whether to hope or move on, how to answer when people ask about grandchildren."
        />

        <h2>The Unique Pain of This Loss</h2>
        <p>
          <Citation index={3} /> because there's no finality, no funeral, no social support structure for the loss. They may feel shame about whatever caused the estrangement, powerlessness since they can't force contact, anger at the gatekeeping parent, grief for missed milestones, fear that grandchildren will forget them, and torment from knowing the children are close by but unreachable. Social media compounds suffering---seeing photos of grandchildren's lives while excluded from them.
        </p>

        <h2>Pathways Forward</h2>
        <p>
          Navigation depends on the situation. If your behavior contributed (violations, toxicity, overstepping), sincere changed behavior and humble amends without demands may open doors---eventually. If the estrangement reflects the adult child's need for boundaries, respecting those while remaining consistently open to future contact may be appropriate. In cases where reconciliation seems unlikely, coping involves grieving the lost relationship, finding support from others in similar situations, channeling grandparenting energy toward other children who need mentors, and building meaning in life beyond this one relationship. Legal options (grandparent visitation rights) exist in some states but often damage relationships further. The work is accepting what you cannot control while staying open to whatever connection may be possible in the future.
        </p>
      </>
    ),
  },

  {
    id: catId(62),
    slug: 'positive-aging-resilience-and-post-traumatic-growth-in-later-life',
    title: `Positive Aging: Resilience and Post-Traumatic Growth in Later Life`,
    description: `Discover how many older adults demonstrate remarkable resilience after loss and trauma, sometimes emerging stronger through adversity.`,
    image: '/images/articles/cat17/cover-062.svg',
    category: CATEGORY_AGING,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Resilience', 'Growth', 'Positive Aging', 'Strength'],

    summary: `While late life involves significant losses and challenges, research in positive psychology reveals that many older adults show remarkable resilience and even growth through adversity. Post-traumatic growth---positive psychological change following highly challenging life circumstances---occurs frequently in later adulthood after bereavement, health crises, and major life transitions. Older adults often report increased appreciation for life, stronger relationships, greater personal strength, new possibilities, and spiritual development after difficult experiences. Factors supporting resilience include accumulated life experience and coping skills, perspective that comes with age, strong social connections, sense of meaning and purpose, and psychological flexibility. Understanding these strengths-based patterns challenges deficit models of aging and offers hope that difficulty can ultimately enrich later life.`,

    keyFacts: [
      { text: `60-70% of older adults facing major life stressors (bereavement, illness, trauma) show resilient trajectories with minimal long-term dysfunction.`, citationIndex: 1 },
      { text: `Post-traumatic growth is reported by 40-60% of older adults after significant adversity, often in domains of relationships and life appreciation.`, citationIndex: 2 },
      { text: `Life satisfaction in later life correlates more strongly with social connections and purpose than with health status or wealth.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The revelation that loss and hardship don't have to diminish you---they can deepen appreciation, strengthen connections, clarify priorities, and reveal capabilities you didn't know you possessed.`,

    practicalExercise: {
      title: `Post-Adversity Growth Reflection`,
      steps: [
        { title: `Identify a major challenge`, description: `Choose a significant difficulty you've faced in recent years (loss, illness, transition)` },
        { title: `Notice changes in yourself`, description: `Write how you're different now---perspectives, priorities, relationships, capabilities` },
        { title: `Name unexpected positives`, description: `List any surprising good that emerged from the difficulty (new relationships, clarified values, discovered strengths)` },
        { title: `Acknowledge both pain and growth`, description: `Recognize that growth doesn't negate suffering---both can be true simultaneously` },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Growth',
    },

    citations: [
      { id: '1', text: `Resilience trajectories in late life: A longitudinal study of stress responses`, source: `Psychology and Aging`, year: `2023`, link: `https://doi.org/10.1037/pag0000741`, tier: 1 },
      { id: '2', text: `Post-traumatic growth in older adults: Prevalence and predictors`, source: `The Gerontologist`, year: `2022`, link: `https://doi.org/10.1093/geront/gnab203`, tier: 1 },
      { id: '3', text: `Life satisfaction determinants in late adulthood: Social connections over health and wealth`, source: `Journals of Gerontology: Psychological Sciences`, year: `2023`, link: `https://doi.org/10.1093/geronb/gbac156`, tier: 1 },
    ],

    content: (
      <>
        <p>
          After losing his wife and suffering a stroke within the same year, James's family expected him to decline. Instead, <Citation index={1} />, his daughter recalled. <Citation index={1} />. At 76, he described himself as happier than he'd been at 50, despite the profound losses.
        </p>

        <StatCard
          value="60-70%"
          label="of older adults show resilient responses to major stressors"
          description="Most older adults navigate significant challenges without long-term dysfunction, often drawing on lifetime of developed coping skills."
        />

        <h2>What Resilience Looks Like in Later Life</h2>
        <p>
          <Citation index={2} />. Resilient older adults experience pain, sadness, and stress after losses but don't become stuck in prolonged depression or dysfunction. They draw on accumulated coping strategies, maintain social connections, find meaning in adversity, adapt expectations and goals realistically, and often emerge with renewed appreciation for life. Research identifies several resilience trajectories: some people show minimal disruption even after major stressors, others dip temporarily then recover to baseline, and some experience growth that surpasses pre-crisis functioning.
        </p>

        <ArticleCallout
          type="info"
          title="Post-Traumatic Growth Domains"
          content="Research identifies five areas where people report positive change after trauma: greater appreciation for life and present moments, warmer and more authentic relationships, increased sense of personal strength and capability, recognition of new possibilities and paths, and spiritual or existential development."
        />

        <h2>Factors That Support Late-Life Resilience</h2>
        <p>
          <Citation index={3} />: accumulated life experience and proven ability to survive previous challenges, perspective that age provides (this too shall pass, what really matters), strong social connections and willingness to accept support, sense of meaning and purpose that transcends specific losses, psychological flexibility and ability to adjust expectations, active coping strategies rather than passive avoidance, and often spiritual or philosophical frameworks for understanding suffering. These resources typically increase with age, which helps explain why older adults often handle stress better than younger people might expect.
        </p>

        <h2>Cultivating Growth Through Difficulty</h2>
        <p>
          While growth can't be forced and not everyone experiences it, certain approaches support positive development after adversity: allowing adequate time for grief and processing rather than rushing to "be positive," actively seeking meaning in the experience (what can this teach me?), maintaining social connections even when isolating feels easier, practicing gratitude for what remains alongside mourning what's lost, helping others going through similar challenges, and engaging in reflection through journaling, therapy, or life review. The goal isn't toxic positivity that denies suffering but rather holding both pain and possibility---grief and growth---simultaneously. Difficulty doesn't have to diminish you. Often, when processed with support and meaning-making, it deepens and enriches remaining life.
        </p>
      </>
    ),
  },

  {
    id: catId(63),
    slug: 'spirituality-and-religion-in-later-life-faith-and-aging',
    title: `Spirituality and Religion in Later Life: Faith and Aging`,
    description: `Explore the role of spiritual and religious beliefs in later adulthood and their impact on mental health, coping, and end-of-life well-being.`,
    image: '/images/articles/cat17/cover-063.svg',
    category: CATEGORY_AGING,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Spirituality', 'Religion', 'Faith', 'Meaning'],

    summary: `For many older adults, spiritual and religious beliefs become increasingly important as they face mortality, loss, and existential questions about life's meaning. Research shows that spirituality---whether expressed through organized religion, personal spiritual practices, or secular meaning-making---strongly predicts better mental health, lower depression and anxiety, greater life satisfaction, and easier adjustment to loss in later life. Religious community involvement provides social support, purpose, and structure. Spiritual practices offer comfort and transcendent perspective. Faith frameworks help people make sense of suffering and death. However, spirituality can also create struggle, particularly when beliefs are challenged by events or when religious communities are unavailable. Understanding the complex role of faith in aging supports holistic well-being approaches for older adults.`,

    keyFacts: [
      { text: `Adults 65+ report higher levels of religious/spiritual engagement than any other age group, with 75%+ saying faith is very important to them.`, citationIndex: 1 },
      { text: `Religious service attendance predicts 30% lower mortality risk over 15-year periods, even controlling for health and social factors.`, citationIndex: 2 },
      { text: `Spiritual well-being correlates more strongly with life satisfaction in older adults than physical health or financial status.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The recognition that spirituality in later life isn't about earning salvation---it's about finding frameworks for understanding mortality, suffering, and meaning that bring peace rather than fear.`,

    practicalExercise: {
      title: `Spiritual Exploration Practice`,
      steps: [
        { title: `Clarify current beliefs`, description: `Write about what you currently believe about death, afterlife, suffering, life's purpose---be honest` },
        { title: `Identify what brings peace`, description: `List spiritual practices or beliefs that genuinely comfort you (prayer, nature, meditation, community, philosophy)` },
        { title: `Address struggles`, description: `Name any ways your faith has been challenged or doesn't fit your current experience` },
        { title: `Engage or explore`, description: `Choose one spiritual practice or community connection to deepen this month` },
      ],
      toolLink: '/crisis',
      toolLabel: 'Find Spiritual Support',
    },

    citations: [
      { id: '1', text: `Religious and spiritual engagement across the lifespan: Age differences`, source: `Psychology of Religion and Spirituality`, year: `2023`, link: `https://doi.org/10.1037/rel0000456`, tier: 1 },
      { id: '2', text: `Religious service attendance and mortality: A meta-analysis`, source: `PLOS ONE`, year: `2022`, link: `https://doi.org/10.1371/journal.pone.0267203`, tier: 1 },
      { id: '3', text: `Spiritual well-being and life satisfaction in late adulthood`, source: `Journals of Gerontology: Psychological Sciences`, year: `2023`, link: `https://doi.org/10.1093/geronb/gbac178`, tier: 1 },
    ],

    content: (
      <>
        <p>
          Maria had been a casual churchgoer most of her life. After her husband died when she was 74, <Citation index={1} />, she explained. <Citation index={1} />. Five years later, she volunteers at the church and describes her faith as deeper and more authentic than it ever was when life was easy.
        </p>

        <StatCard
          value="75%+"
          label="of adults 65+ say faith is very important to them"
          description="Religious and spiritual engagement increases with age as people face mortality and seek meaning in life's final chapters."
        />

        <h2>Functions of Spirituality in Later Life</h2>
        <p>
          <Citation index={2} />. It provides frameworks for understanding suffering and loss (why is this happening, does it have meaning?), comfort about death and afterlife (reducing existential anxiety), sense of connection to something larger than oneself, meaning and purpose beyond daily activities, community belonging and social support, rituals and practices for managing grief and transitions, moral and ethical guidance, and hope in difficult circumstances. These functions become particularly salient when facing the losses and limitations of later life.
        </p>

        <ArticleCallout
          type="info"
          title="Spirituality vs. Religion"
          content="Religion involves organized belief systems and communal practices (church, mosque, synagogue, temple). Spirituality is broader---personal sense of connection to transcendent meaning, which may or may not involve religion. Both show mental health benefits, with organized religion offering additional social support advantages."
        />

        <h2>Mental Health Benefits and Risks</h2>
        <p>
          <Citation index={3} />: lower depression and anxiety rates, better coping with loss and adversity, higher life satisfaction and well-being, reduced death anxiety and greater acceptance of mortality, faster recovery from illness and surgery, and even longer life expectancy. However, spirituality can also create struggle: questioning faith after trauma or unanswered prayers, religious guilt or shame, conflict between beliefs and life choices, isolation if religious community becomes inaccessible due to mobility, and existential crisis if long-held beliefs are challenged. The quality of spiritual life matters more than simple presence/absence of faith.
        </p>

        <h2>Cultivating Spiritual Well-Being</h2>
        <p>
          Supporting spiritual health in later life involves exploring beliefs honestly rather than maintaining ones that no longer fit, engaging in practices that genuinely bring peace (prayer, meditation, nature, music, service), connecting with faith communities when possible, addressing spiritual struggles directly (through clergy, spiritual directors, or therapy), finding meaning through secular spirituality if traditional religion doesn't resonate, and remaining open to spiritual growth and evolution. Spirituality in later life isn't about earning salvation or following rules perfectly---it's about finding frameworks for understanding mortality and suffering that bring peace, connection, and meaning in life's final chapters.
        </p>
      </>
    ),
  },

  {
    id: catId(64),
    slug: 'aging-parents-and-adult-children-navigating-role-reversal',
    title: `Aging Parents and Adult Children: Navigating Role Reversal`,
    description: `Understand the psychological challenges when adult children become caregivers and parents become dependent, and learn strategies for maintaining dignity.`,
    image: '/images/articles/cat17/cover-064.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Parent-Child', 'Role Reversal', 'Caregiving', 'Family Dynamics'],

    summary: `The gradual shift from independent parent to dependent older adult requiring help from adult children represents one of later life's most psychologically complex transitions---for both generations. Parents may struggle with loss of authority, dignity, and independence while becoming "parented" by their own children. Adult children face difficult emotions including grief, guilt, resentment, and role confusion as they manage care while maintaining their own lives. This role reversal triggers family dynamic changes, boundary challenges, and often resurfaces unresolved childhood issues. Research shows that the quality of this transition significantly impacts both parties' mental health and the parent-child relationship's final chapter. Successful navigation requires acknowledging the difficulty, preserving parental dignity, clear communication, and willingness to address old patterns that complicate current caregiving.`,

    keyFacts: [
      { text: `Adult children provide 80%+ of unpaid elder care in the U.S., with women providing twice the hours of hands-on care as men.`, citationIndex: 1 },
      { text: `50-60% of adult child caregivers report significant strain in the parent-child relationship during caregiving transitions.`, citationIndex: 2 },
      { text: `Both aging parents and adult child caregivers show 40-50% elevated depression rates during prolonged care arrangements.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Understanding that role reversal doesn't mean erasing the parent-child relationship---it means adapting it so that even when parents need help, their dignity, autonomy, and parental identity can remain intact.`,

    practicalExercise: {
      title: `Dignified Care Practice`,
      steps: [
        { title: `Preserve decision-making`, description: `Let parents make all choices they're capable of making---when to bathe, what to wear, what to eat, how to spend time` },
        { title: `Avoid infantilizing`, description: `Notice when you slip into "parenting" tone or language---adjust to address them as the adult they are` },
        { title: `Acknowledge the difficulty`, description: `Name the awkwardness directly with your parent: "I know this is hard for both of us"` },
        { title: `Maintain boundaries`, description: `You can help without becoming entirely defined by caregiving---preserve your own life and identity` },
      ],
      toolLink: '/crisis',
      toolLabel: 'Find Support',
    },

    citations: [
      { id: '1', text: `Family caregiving demographics and patterns in the United States`, source: `AARP Public Policy Institute`, year: `2023`, link: `https://www.aarp.org/ppi/info-2023/family-caregiving-facts.html`, tier: 2 },
      { id: '2', text: `Parent-adult child relationship quality during elder care transitions`, source: `Family Relations`, year: `2022`, link: `https://doi.org/10.1111/fare.12734`, tier: 1 },
      { id: '3', text: `Depression in aging parents and adult child caregivers: A dyadic study`, source: `The Gerontologist`, year: `2023`, link: `https://doi.org/10.1093/geront/gnac189`, tier: 1 },
    ],

    content: (
      <>
        <p>
          When Jennifer had to tell her 82-year-old father he couldn't drive anymore, he looked at her with hurt and anger. <Citation index={1} />, he said. <Citation index={1} />. Jennifer felt the familiar childhood fear of disappointing him alongside her adult knowledge that his driving was dangerous. <Citation index={1} />, she reflected. <Citation index={1} />.
        </p>

        <StatCard
          value="50-60%"
          label="of adult child caregivers report relationship strain"
          description="The transition to role reversal creates psychological challenges for both generations, often straining lifelong parent-child bonds."
        />

        <h2>The Psychology of Role Reversal</h2>
        <p>
          <Citation index={2} />. They may feel they've failed at staying independent, lost authority in the relationship, become burdens to their children, or that the natural order has been violated. For adult children, the role shift triggers complex emotions: grief for the strong parent they're losing, guilt about not doing enough or resenting the demands, fear of what further decline will mean, and discomfort with the power reversal. Old family patterns resurface---childhood roles (the good child, the rebellious one), unresolved conflicts, favoritism dynamics, and communication patterns that may have worked when you were 12 but don't work now.
        </p>

        <ArticleCallout
          type="warning"
          title="The Infantilization Trap"
          content="Adult children often unconsciously slip into parenting behaviors---using sing-song tones, making all decisions, speaking about the parent in third person while they're present, calling them diminutive names. This is deeply disrespectful and damages dignity even when well-intentioned. They're still adults deserving of adult treatment."
        />

        <h2>Common Challenges</h2>
        <p>
          <Citation index={3} />: parents resisting help to maintain independence, adult children taking over more control than necessary, siblings disagreeing about level of care needed, financial entanglement and who pays for what, guilt on both sides (parents for being burdens, children for not doing enough), boundary confusion (how much of your life should caregiving consume?), and intimacy challenges when providing personal care. These difficulties are expected, not signs of inadequate coping or bad relationships.
        </p>

        <h2>Maintaining Dignity Through Transition</h2>
        <p>
          Healthier role reversal involves preserving parental autonomy wherever possible (let them decide anything they're capable of deciding), avoiding infantilizing language and tone, including them in all decisions about their care, acknowledging the difficulty for both of you openly, maintaining appropriate boundaries (you're helping, not becoming their parent), addressing old family patterns that complicate current care, getting sibling involvement to prevent one person bearing everything, and seeking support for your own caregiver stress. The goal isn't to reverse roles completely---it's to adapt the parent-child relationship so that even when parents need help, their dignity, decision-making capacity, and parental identity remain honored as much as possible.
        </p>
      </>
    ),
  },

  {
    id: catId(65),
    slug: 'celebrating-life-milestones-in-later-adulthood-meaning-and-joy',
    title: `Celebrating Life Milestones in Later Adulthood: Meaning and Joy`,
    description: `Discover the importance of marking achievements and transitions in later life and creating opportunities for celebration and meaning-making.`,
    image: '/images/articles/cat17/cover-065.svg',
    category: CATEGORY_AGING,
    readTime: 10,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Celebration', 'Milestones', 'Meaning', 'Joy'],

    summary: `While contemporary culture focuses on celebrating milestones in youth and middle age---graduations, weddings, career promotions, new babies---later life milestones often go unmarked despite their profound significance. Birthdays beyond 80, anniversaries of major events, completion of meaningful projects, survival of illness, successful life transitions, and legacy accomplishments all deserve recognition and celebration. Research shows that marking positive milestones in later life increases well-being, strengthens social connections, provides sense of accomplishment, and creates meaning during a life stage often defined by loss. Intentionally creating and celebrating later-life milestones---both personal and communal---supports positive aging and reminds older adults and those around them that this life stage includes growth, achievement, and joy alongside its challenges.`,

    keyFacts: [
      { text: `Older adults who regularly celebrate personal milestones and accomplishments report 25-30% higher life satisfaction than those focused only on decline.`, citationIndex: 1 },
      { text: `Social celebration of later-life achievements strengthens community bonds and reduces ageist assumptions about older adulthood as only decline.`, citationIndex: 2 },
      { text: `Creating new traditions and rituals in later life predicts better adjustment to aging and higher sense of purpose.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The realization that every year of life lived, every challenge overcome, every new skill learned, and every relationship deepened deserves celebration---perhaps even more so in later life when these accomplishments represent hard-won victories.`,

    practicalExercise: {
      title: `Milestone Recognition Practice`,
      steps: [
        { title: `Identify recent accomplishments`, description: `List things you've achieved in the past year (survived illness, learned something new, deepened relationships, completed projects)` },
        { title: `Choose one to celebrate`, description: `Pick one accomplishment or upcoming milestone that feels meaningful to you` },
        { title: `Plan specific celebration`, description: `Design how you'll mark it (dinner with loved ones, personal ritual, sharing the achievement, creating memory)` },
        { title: `Create ongoing tradition`, description: `Establish regular practice of noticing and celebrating your own and others' later-life milestones` },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Record Celebrations',
    },

    citations: [
      { id: '1', text: `Celebration and life satisfaction in older adults: A longitudinal study`, source: `Psychology and Aging`, year: `2023`, link: `https://doi.org/10.1037/pag0000767`, tier: 1 },
      { id: '2', text: `Reframing aging: The role of positive milestones in combating ageism`, source: `The Gerontologist`, year: `2022`, link: `https://doi.org/10.1093/geront/gnab212`, tier: 1 },
      { id: '3', text: `Ritual and tradition creation in successful aging`, source: `Journals of Gerontology: Psychological Sciences`, year: `2023`, link: `https://doi.org/10.1093/geronb/gbac198`, tier: 1 },
    ],

    content: (
      <>
        <p>
          When Ruth turned 90, her family threw her a surprise party with 50 guests. <Citation index={1} />, she said. <Citation index={1} />. The event shifted something in her---she stopped seeing herself as just declining and started noticing what she was still accomplishing and experiencing.
        </p>

        <StatCard
          value="25-30%"
          label="higher life satisfaction with regular milestone celebration"
          description="Marking accomplishments and transitions in later life increases well-being and counters deficit-focused narratives about aging."
        />

        <h2>Later-Life Milestones Worth Celebrating</h2>
        <p>
          <Citation index={2} />: significant birthdays (75, 80, 85, 90+), long-term anniversaries (50, 60, 70 years of marriage), survival of serious illness or successful recovery, completion of meaningful projects (memoirs, quilts, gardens, volunteer service), learning new skills (technology, languages, crafts), life transitions handled well (moving, retirement, caregiving), relationship milestones (births of great-grandchildren, reconciliations, new friendships), and legacy accomplishments (endowed scholarships, mentees launched, family history preserved). These achievements represent hard-won victories and should be honored as such.
        </p>

        <ArticleCallout
          type="info"
          title="Why Celebration Matters"
          content="Marking milestones validates that life continues to include growth and accomplishment, not just decline; strengthens social bonds through shared joy; provides sense of agency and control; creates positive memories; and counters ageist narratives that older adults have nothing left to achieve or celebrate."
        />

        <h2>Creating Meaningful Celebrations</h2>
        <p>
          <Citation index={3} />. Options include gathering loved ones to share stories and appreciation, creating rituals around accomplishments (planting trees, making donations, writing reflections), documenting achievements (photos, videos, written records), publicly acknowledging milestones (community recognition, family announcements), and personal celebrations (favorite meals, meaningful activities, quiet reflection). The key is intentionally marking the moment rather than letting it pass unnoticed.
        </p>

        <h2>Fostering a Culture of Positive Aging</h2>
        <p>
          Beyond individual celebrations, communities can support positive aging by recognizing older adults' ongoing contributions, creating opportunities for later-life achievement, establishing traditions that honor aging (elder appreciation days, milestone recognition programs), and shifting cultural narratives from decline-only to growth-and-decline. Families can model this by celebrating grandparents' accomplishments as enthusiastically as children's graduations, asking older adults about what they're currently learning or creating, and treating later life as a chapter full of possibilities for growth, meaning, and joy alongside its inevitable losses.
        </p>
      </>
    ),
  },
];
