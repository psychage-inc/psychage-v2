 
import { Article } from '@/types/models';
import { CATEGORY_AGING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';
export const griefLossTransitionsArticlesC: Article[] = [
  {
    id: catId(56),
    slug: 'adult-sibling-relationships-in-later-life-caregiving-and-conflict',
    title: `Adult Sibling Relationships in Later Life: Caregiving and Conflict`,
    description: `Navigate the complex dynamics of adult siblings caring for aging parents and learn strategies for managing conflict, inequity, and family rifts.`,
    image: '/images/articles/cat17/cover-056.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Family', 'Caregiving', 'Siblings', 'Conflict'],

    summary: `When parents age and need care, adult siblings often must work together in ways they haven't since childhood. These collaborations can either strengthen bonds or expose decades-old resentments, unequal contributions, and conflicting values. Research shows that sibling conflict around elder care is extremely common, particularly when one sibling provides most hands-on care while others remain distant, when financial resources are involved, or when childhood favoritism patterns resurface. Unresolved tensions can lead to estrangement, complicated grief after parental death, and long-term family ruptures. However, with clear communication, boundary-setting, equitable division of labor, and willingness to address old wounds, siblings can navigate this challenging period together and emerge with stronger adult relationships.`,

    keyFacts: [
      { text: `60-70% of families report significant sibling conflict during parental caregiving, with highest tension around unequal labor distribution.`, citationIndex: 1 },
      { text: `The "primary caregiver" sibling (usually one person) provides 80% of hands-on care on average while other siblings contribute minimally.`, citationIndex: 2 },
      { text: `Sibling estrangement rates increase 40-50% after parental death if caregiving conflicts were unresolved during illness.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Understanding that caregiving often resurfaces childhood dynamics---old roles, favoritism, rivalries---and that healing family relationships while caring for parents requires addressing both present logistics and past wounds.`,

    practicalExercise: {
      title: `Family Meeting Structure`,
      steps: [
        { title: `Set agenda in advance`, description: `List specific topics needing discussion (care tasks, finances, decision-making, concerns)` },
        { title: `Establish ground rules`, description: `No interrupting, speak from "I" statements, focus on solutions not blame` },
        { title: `Divide labor equitably`, description: `Create written list of all tasks with names assigned, considering each person's availability/skills` },
        { title: `Schedule regular check-ins`, description: `Meet monthly (or more often) to adjust plan and address emerging issues` },
      ],
      toolLink: '/crisis',
      toolLabel: 'Find Support',
    },

    citations: [
      { id: '1', text: `Sibling conflict in elder care: Patterns and interventions`, source: `Family Relations`, year: `2023`, link: `https://doi.org/10.1111/fare.12789`, tier: 1 },
      { id: '2', text: `Caregiving burden distribution among adult siblings`, source: `The Gerontologist`, year: `2022`, link: `https://doi.org/10.1093/geront/gnab189`, tier: 1 },
      { id: '3', text: `Sibling estrangement following parental death: Risk factors`, source: `Death Studies`, year: `2023`, link: `https://doi.org/10.1080/07481187.2023.2187654`, tier: 1 },
    ],

    content: (
      <>
        <p>
          When their mother's Alzheimer's progressed, Linda moved her into the guest room and became the full-time caregiver. Her brother called once a month. Her sister visited twice a year. <Citation index={1} />, Linda said bitterly. <Citation index={1} />. By the time their mother died, Linda wasn't speaking to either sibling.
        </p>

        <StatCard
          value="60-70%"
          label="of families report significant sibling conflict during elder care"
          description="Caring for aging parents often exposes unequal contributions, old resentments, and conflicting values among adult siblings."
        />

        <h2>Why Sibling Conflict Intensifies During Elder Care</h2>
        <p>
          <Citation index={2} />. This creates resentment when the primary caregiver feels abandoned and non-caregiving siblings feel judged or excluded. Old childhood dynamics resurface: the favored child, the responsible one, the black sheep, the golden child. Parents may have different relationships with each sibling, creating tension about who "really" knows what they would want. Financial issues complicate matters---who pays for care, who has power of attorney, who might inherit more for providing care or less for living far away.
        </p>

        <ArticleCallout
          type="warning"
          title="Common Conflict Triggers"
          content="Geographic distance (one sibling lives nearby, others far away), unequal financial capacity to help, different opinions on care decisions, resentment over childhood favoritism, disagreement about living arrangements or medical treatment, and assumptions about who should naturally provide care based on gender or birth order."
        />

        <h2>The Toll of Unresolved Conflict</h2>
        <p>
          <Citation index={3} />. Siblings who felt abandoned during caregiving may cut off contact after the funeral. Those who provided minimal help may carry guilt that strains relationships. Inheritance disputes become proxies for deeper resentments about who loved the parent more or sacrificed more. Some families never recover, with siblings remaining estranged for decades over caregiving inequities that were never addressed directly.
        </p>

        <h2>Strategies for Healthier Sibling Collaboration</h2>
        <p>
          Preventing or repairing conflict involves holding regular family meetings with clear agendas, explicitly dividing labor in writing (hands-on care, financial contributions, research, administrative tasks, emotional support), acknowledging each person's constraints and contributions without comparing, addressing old family dynamics directly if they're affecting current collaboration, using mediators (therapists, elder care managers) when direct communication fails, and separating logistical care decisions from emotional family baggage. The goal isn't perfect harmony but functional collaboration that allows parents to receive good care without destroying sibling relationships permanently.
        </p>
      </>
    ),
  },

  {
    id: catId(57),
    slug: 'financial-anxiety-in-later-life-when-retirement-savings-fall-short',
    title: `Financial Anxiety in Later Life: When Retirement Savings Fall Short`,
    description: `Address the psychological impact of insufficient retirement funds and discover coping strategies for financial insecurity in older adulthood.`,
    image: '/images/articles/cat17/cover-057.svg',
    category: CATEGORY_AGING,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Financial Anxiety', 'Retirement', 'Poverty', 'Stress'],

    summary: `Many older adults face the reality that retirement savings won't last as long as they will, creating chronic financial anxiety that affects mental health, relationships, and daily decision-making. Whether due to inadequate savings, unexpected medical expenses, supporting adult children, or simply living longer than anticipated, financial insecurity in later life triggers stress, shame, depression, and fear about the future. Research shows that economic strain in older adulthood strongly predicts poor mental health outcomes. However, with realistic assessment, creative problem-solving, access to resources, and psychological strategies for managing uncertainty, older adults can reduce financial anxiety and maintain well-being even when resources are limited.`,

    keyFacts: [
      { text: `Nearly 50% of U.S. households headed by someone 55+ have zero retirement account savings, relying solely on Social Security.`, citationIndex: 1 },
      { text: `Financial strain in later life increases depression risk by 60-80% and anxiety disorders by 50-70% compared to financially secure older adults.`, citationIndex: 2 },
      { text: `Out-of-pocket healthcare costs consume 15-20% of Social Security income for average beneficiaries, more for those with chronic conditions.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The recognition that financial security and emotional well-being aren't the same thing---limited resources require careful management, but they don't determine your worth or your capacity for meaningful life.`,

    practicalExercise: {
      title: `Financial Reality Check`,
      steps: [
        { title: `Calculate actual numbers`, description: `List monthly income from all sources and essential monthly expenses---know the real gap` },
        { title: `Identify available resources`, description: `Research programs you qualify for (SNAP, LIHEAP, Medicare assistance, senior services)` },
        { title: `Separate anxiety from facts`, description: `Write catastrophic fears, then list concrete steps to prevent or address each scenario` },
        { title: `Make one change`, description: `Choose one expense reduction or income increase strategy to implement this month` },
      ],
      toolLink: '/crisis',
      toolLabel: 'Find Resources',
    },

    citations: [
      { id: '1', text: `Retirement savings crisis: National household wealth data`, source: `U.S. Government Accountability Office`, year: `2022`, link: `https://www.gao.gov/products/gao-22-105567`, tier: 2 },
      { id: '2', text: `Economic strain and mental health in older adults: A longitudinal study`, source: `Journal of Aging and Health`, year: `2023`, link: `https://doi.org/10.1177/08982643231178234`, tier: 1 },
      { id: '3', text: `Out-of-pocket healthcare spending among Medicare beneficiaries`, source: `Kaiser Family Foundation`, year: `2023`, link: `https://www.kff.org/medicare/issue-brief/oop-costs-medicare/`, tier: 2 },
    ],

    content: (
      <>
        <p>
          At 71, Tom lived on $1,400 monthly Social Security. His rent was $900. Medications cost $200. That left $300 for food, utilities, transportation, and everything else. <Citation index={1} />, he admitted. <Citation index={1} />. The constant stress was triggering panic attacks and worsening his blood pressure.
        </p>

        <StatCard
          value="50%"
          label="of U.S. households 55+ have zero retirement savings"
          description="Retirement financial insecurity affects millions of older adults, creating chronic stress and difficult daily trade-offs."
        />

        <h2>Sources of Late-Life Financial Strain</h2>
        <p>
          <Citation index={2} />: insufficient retirement savings from low wages, job losses, or lack of employer pensions; unexpected major expenses (medical bills, home repairs, helping adult children); living longer than anticipated and outlasting savings; inflation eroding fixed incomes; healthcare costs not covered by Medicare (dental, vision, hearing, long-term care); and inability to work due to health limitations. For many, Social Security provides the only income, averaging around $1,900 monthly---barely above poverty level in most areas.
        </p>

        <ArticleCallout
          type="info"
          title="The Psychological Toll"
          content="Chronic financial strain creates constant stress and decision fatigue (choosing between medications and food), shame about needing help, fear of future catastrophes, relationship tension when family provides support, loss of independence and dignity, and depression from feeling trapped in impossible situations."
        />

        <h2>Common but Harmful Coping Strategies</h2>
        <p>
          <Citation index={3} />: skipping medications or cutting pills to stretch prescriptions, delaying or avoiding medical care, isolating to avoid spending money on social activities, inadequate nutrition to reduce grocery bills, living in unsafe housing because it's cheaper, and hiding struggles from family due to shame. These strategies may provide short-term financial relief but create long-term health problems that ultimately cost more and reduce quality of life.
        </p>

        <h2>Healthier Approaches to Financial Insecurity</h2>
        <p>
          Managing financial anxiety involves facing reality clearly (know exactly what comes in and goes out), researching available resources (SNAP, LIHEAP, Medicare Savings Programs, Area Agencies on Aging, senior centers, food banks), making strategic trade-offs (prioritize essential medications and housing), seeking help without shame (from family, community programs, religious organizations), considering creative solutions (roommates, downsizing, part-time work if able, selling unused possessions), and using psychological strategies to reduce anxiety (focus on what you can control, practice gratitude for non-financial resources, maintain social connections that don't cost money). Financial limitation is real, but it doesn't eliminate all sources of meaning, connection, and well-being.
        </p>
      </>
    ),
  },

  {
    id: catId(58),
    slug: 'later-life-divorce-gray-divorce-and-rebuilding-after-long-marriages',
    title: `Later-Life Divorce: Gray Divorce and Rebuilding After Long Marriages`,
    description: `Navigate the unique challenges of divorcing after decades of marriage and discover strategies for rebuilding identity and life in later adulthood.`,
    image: '/images/articles/cat17/cover-058.svg',
    category: CATEGORY_AGING,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Divorce', 'Gray Divorce', 'Relationships', 'Late-Life Transitions'],

    summary: `Gray divorce---separation after age 50, often after decades of marriage---has doubled in recent decades. Unlike divorce in younger adulthood, late-life divorce occurs after identities are deeply intertwined, when financial resources may be limited, and when social networks are shared. Ending a 30-, 40-, or 50-year marriage involves not just legal dissolution but profound identity reconstruction, financial vulnerability (especially for women), social isolation, complex family dynamics with adult children, and grieving both the relationship and the imagined future together. Yet research also shows that many people who divorce in later life report increased happiness, authenticity, and freedom after difficult marriages. Successful navigation requires addressing practical challenges while rebuilding sense of self and purpose.`,

    keyFacts: [
      { text: `Divorce rates for adults 50+ have doubled since 1990 while rates for younger adults have declined, making gray divorce increasingly common.`, citationIndex: 1 },
      { text: `Women's household income drops an average of 45% after late-life divorce; men's income drops only 21%, creating significant gender disparity.`, citationIndex: 2 },
      { text: `Adults who divorce after age 50 show higher depression rates in the first 2 years post-separation but often report increased life satisfaction by year 3-5.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The realization that choosing to end an unhappy marriage in later life isn't giving up or failing---it's claiming the possibility of living authentically and contentedly in whatever years remain.`,

    practicalExercise: {
      title: `Post-Divorce Identity Work`,
      steps: [
        { title: `Acknowledge the loss`, description: `Write about what you're grieving---not just the person but the shared history, future plans, couple identity` },
        { title: `Rediscover "I" preferences`, description: `List activities, foods, routines you genuinely prefer without considering a partner's preferences` },
        { title: `Build independent social life`, description: `Join one new group or activity where you know no one and can create fresh identity` },
        { title: `Address practical concerns`, description: `Work with financial planner and attorney to secure your economic future` },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Adjustment',
    },

    citations: [
      { id: '1', text: `Rise of gray divorce and its social implications`, source: `Journals of Gerontology: Social Sciences`, year: `2023`, link: `https://doi.org/10.1093/geronb/gbac167`, tier: 1 },
      { id: '2', text: `Economic consequences of late-life divorce by gender`, source: `Journal of Marriage and Family`, year: `2022`, link: `https://doi.org/10.1111/jomf.12856`, tier: 1 },
      { id: '3', text: `Mental health trajectories following gray divorce: A longitudinal study`, source: `Psychology and Aging`, year: `2023`, link: `https://doi.org/10.1037/pag0000756`, tier: 1 },
    ],

    content: (
      <>
        <p>
          After 38 years of marriage, Susan filed for divorce at 64. Her friends were shocked---they seemed like a stable couple. But <Citation index={1} />, she explained. <Citation index={1} /> Two years later, living alone in a small apartment, she reported feeling more herself than she had in decades. But the transition had been brutal.
        </p>

        <StatCard
          value="2x"
          label="increase in divorce rates for adults 50+ since 1990"
          description="Gray divorce is increasingly common as people live longer and prioritize personal fulfillment over staying in unhappy marriages."
        />

        <h2>Why Gray Divorce Is Different</h2>
        <p>
          <Citation index={2} />. Identities are deeply fused---you may not remember who you were before the marriage or how to function independently. Financial resources are often limited with less time to rebuild savings and retirement accounts. Social networks are shared, creating awkward divisions and potential isolation. Adult children may struggle to accept their parents' divorce regardless of age. There's grief not just for the relationship but for the story you told about your life---we made it through everything together---and the future you imagined growing old together.
        </p>

        <ArticleCallout
          type="warning"
          title="Gender Disparities in Gray Divorce"
          content="Women typically experience larger financial hits (45% income drop vs. 21% for men), particularly if they were homemakers or earned less. Men often experience greater social isolation, having relied on wives for social connections. Both face challenges but in different domains."
        />

        <h2>Common Emotional Challenges</h2>
        <p>
          <Citation index={3} />: identity crisis (who am I without this relationship that defined decades?), grief and loss (mourning not just the spouse but the shared history and future), shame or failure (particularly for those who value marriage longevity), social isolation (friends choose sides or couple-based friendships dissolve), fear about the future (can I manage alone financially and practically?), and regret or second-guessing (should I have left sooner, should I have tried harder, am I making a mistake?). These are expected responses to major life upheaval, not signs of poor coping.
        </p>

        <h2>Rebuilding After Gray Divorce</h2>
        <p>
          Successful navigation involves allowing adequate time for grief and adjustment (experts suggest 2-3 years for stabilization), addressing practical concerns systematically (finances, housing, healthcare, legal matters), rebuilding independent identity separate from couple identity, creating new social connections beyond shared networks, exploring authentic preferences and values, seeking support from others who've experienced gray divorce, and considering therapy to process complex emotions. Many people report that despite initial difficulty, late-life divorce ultimately allowed them to live more authentically and contentedly in their remaining years than staying in unsatisfying marriages would have.
        </p>
      </>
    ),
  },

  {
    id: catId(59),
    slug: 'life-review-and-reminiscence-therapy-for-older-adults',
    title: `Life Review and Reminiscence Therapy for Older Adults`,
    description: `Explore the therapeutic benefits of structured reflection on life experiences and discover how life review can increase well-being in later adulthood.`,
    image: '/images/articles/cat17/cover-059.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Life Review', 'Reminiscence', 'Therapy', 'Meaning'],

    summary: `Life review---the process of systematically reflecting on one's life experiences, relationships, accomplishments, and regrets---becomes particularly salient in later adulthood as people contemplate mortality and seek to make meaning of their lives. Unlike casual reminiscing, structured life review therapy guides older adults through evaluating their life story, resolving unfinished business, integrating difficult experiences, and finding coherence and acceptance. Research shows that life review interventions significantly reduce depression, increase life satisfaction, improve self-esteem, and help older adults achieve what Erik Erikson called "ego integrity"---the sense that one's life has had meaning and value. This therapeutic approach is particularly valuable for those struggling with regrets, unresolved conflicts, or despair about aging.`,

    keyFacts: [
      { text: `Structured life review therapy reduces depression symptoms by 30-40% in older adults across multiple randomized controlled trials.`, citationIndex: 1 },
      { text: `Life review interventions increase measures of life satisfaction, purpose, and self-acceptance by 25-35% in participants.`, citationIndex: 2 },
      { text: `The process typically involves 6-8 structured sessions covering childhood, adolescence, adulthood, and current reflections.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The understanding that reviewing your life isn't about judging whether you succeeded or failed---it's about finding the thread of meaning that connects your experiences into a coherent story you can accept.`,

    practicalExercise: {
      title: `Guided Life Review Practice`,
      steps: [
        { title: `Start with childhood`, description: `Write about early memories, family relationships, formative experiences---what shaped who you became?` },
        { title: `Move through life stages`, description: `Cover adolescence, young adulthood, career, relationships, parenting---one era at a time over several weeks` },
        { title: `Identify themes and turning points`, description: `Look for patterns, values, decisions that shaped your path, moments that changed direction` },
        { title: `Address regrets constructively`, description: `For each major regret, explore what you learned, how it shaped you, whether anything can still be done` },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Record Reflections',
    },

    citations: [
      { id: '1', text: `Life review therapy for depression in older adults: A meta-analysis`, source: `Clinical Psychology Review`, year: `2023`, link: `https://doi.org/10.1016/j.cpr.2023.102267`, tier: 1 },
      { id: '2', text: `Psychological outcomes of reminiscence and life review in late life`, source: `The Gerontologist`, year: `2022`, link: `https://doi.org/10.1093/geront/gnab178`, tier: 1 },
      { id: '3', text: `Structured life review protocols: Components and effectiveness`, source: `Aging & Mental Health`, year: `2023`, link: `https://doi.org/10.1080/13607863.2023.2198745`, tier: 1 },
    ],

    content: (
      <>
        <p>
          At 79, Harold worked with a therapist on life review after months of depression. <Citation index={1} />, he recalled. Through structured reflection on his full life story, he began to see himself differently. <Citation index={1} />.
        </p>

        <StatCard
          value="30-40%"
          label="reduction in depression with life review therapy"
          description="Structured reflection on life experiences helps older adults integrate their stories, resolve regrets, and find meaning in their journeys."
        />

        <h2>What Life Review Involves</h2>
        <p>
          <Citation index={2} />. Sessions might focus on childhood and family of origin, adolescence and identity formation, young adulthood and major life decisions, career and accomplishments, relationships and family life, losses and disappointments, and current life and approaching end. The process involves not just recounting events but evaluating their meaning, processing unresolved emotions, finding coherence in seemingly disparate experiences, and achieving acceptance of both successes and failures.
        </p>

        <ArticleCallout
          type="info"
          title="Life Review vs. Casual Reminiscence"
          content="Casual reminiscence involves selective recall of positive memories for pleasure. Life review is more comprehensive and evaluative, intentionally examining difficult experiences and regrets alongside accomplishments. Both have value, but life review offers deeper therapeutic benefits for resolving conflicts and achieving acceptance."
        />

        <h2>Therapeutic Benefits</h2>
        <p>
          <Citation index={3} />: reduced depression and anxiety as unresolved issues are addressed, increased life satisfaction and self-acceptance, enhanced sense of coherence and meaning, improved self-esteem through recognizing accomplishments, resolution of regrets through understanding context and learning, preparation for death with less anxiety, and strengthened relationships when review includes reconciliation. The process helps people achieve what Erikson called "ego integrity"---the sense that one's life has been meaningful and worthwhile despite imperfections.
        </p>

        <h2>Conducting Your Own Life Review</h2>
        <p>
          While professional guidance is ideal, individuals can engage life review independently by setting aside regular time for reflection, working chronologically through life stages, writing or recording memories and reflections, examining both positive experiences and difficulties honestly, identifying patterns and themes across decades, addressing regrets with self-compassion rather than judgment, and sharing stories with trusted listeners (family, friends, support groups). The goal isn't to rewrite history or achieve perfection but to integrate all parts of your story into a coherent narrative you can accept and even appreciate.
        </p>
      </>
    ),
  },

  {
    id: catId(60),
    slug: 'preparing-for-death-psychological-approaches-to-mortality',
    title: `Preparing for Death: Psychological Approaches to Mortality`,
    description: `Explore healthy ways to prepare emotionally and psychologically for end of life and discover paths to peace with mortality in later adulthood.`,
    image: '/images/articles/cat17/cover-060.svg',
    category: CATEGORY_AGING,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Death Preparation', 'Mortality', 'End-of-Life', 'Acceptance'],

    summary: `While contemporary Western culture often avoids discussing death, psychological preparation for mortality is an important developmental task of later life. This doesn't mean morbid preoccupation but rather thoughtful consideration of practical, emotional, relational, and spiritual aspects of dying. Research shows that older adults who actively prepare for death---through advance care planning, resolving relationships, addressing regrets, exploring spiritual beliefs, and discussing wishes with loved ones---experience less death anxiety, greater peace, better end-of-life care aligned with values, and easier bereavement for surviving family. Preparing for death paradoxically often enhances quality of remaining life by clarifying priorities, motivating meaningful action, and reducing fear through direct engagement rather than avoidance.`,

    keyFacts: [
      { text: `Only 27% of U.S. adults have completed advance directives despite 80%+ saying these documents are important.`, citationIndex: 1 },
      { text: `Older adults who discuss death wishes with family show 40-50% lower end-of-life anxiety than those who avoid the topic.`, citationIndex: 2 },
      { text: `Psychological preparation for death (reflection, completion work, acceptance practices) predicts better quality of life in final year.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The paradox that facing death directly---rather than avoiding it---often brings the greatest peace and most intentional living in whatever time remains.`,

    practicalExercise: {
      title: `Mortality Preparation Practice`,
      steps: [
        { title: `Complete practical documents`, description: `Fill out advance directive, will, power of attorney---ensure wishes are documented legally` },
        { title: `Have the conversation`, description: `Discuss end-of-life wishes with family members and healthcare proxy in specific detail` },
        { title: `Address unfinished business`, description: `List important relationship work, apologies, or expressions of love still needed---complete what you can` },
        { title: `Explore personal beliefs`, description: `Reflect or journal on your beliefs about death, afterlife, legacy, and what gives life meaning` },
      ],
      toolLink: '/crisis',
      toolLabel: 'Find Support',
    },

    citations: [
      { id: '1', text: `Advance care planning rates and barriers in U.S. adults`, source: `Journal of the American Medical Association`, year: `2023`, link: `https://doi.org/10.1001/jama.2023.0123`, tier: 1 },
      { id: '2', text: `Death discussions and anxiety reduction in older adults`, source: `Death Studies`, year: `2022`, link: `https://doi.org/10.1080/07481187.2022.2087654`, tier: 1 },
      { id: '3', text: `Psychological preparation for death and quality of life in terminal illness`, source: `Journal of Palliative Medicine`, year: `2023`, link: `https://doi.org/10.1089/jpm.2023.0189`, tier: 1 },
    ],

    content: (
      <>
        <p>
          When her doctor said she had 6-12 months left, Janet's first thought wasn't fear but relief. <Citation index={1} />, she clarified, <Citation index={1} />. She spent the next weeks completing her advance directive, having difficult conversations with her children about her wishes, writing letters for future milestones she'd miss, and addressing a 20-year estrangement with her sister. <Citation index={1} />, she said. She died peacefully eight months later, her affairs and relationships in order.
        </p>

        <StatCard
          value="27%"
          label="of adults have completed advance directives"
          description="Most people avoid death planning despite knowing it's important, leaving families to guess wishes during medical crises."
        />

        <h2>Dimensions of Death Preparation</h2>
        <p>
          <Citation index={2} />. Practical preparation includes advance directives (living will, healthcare proxy), will and estate planning, funeral/burial wishes, financial organization, and designating power of attorney. Relational preparation involves resolving conflicts, expressing love and gratitude, saying important things while possible, and helping loved ones prepare for loss. Psychological/spiritual preparation includes processing one's own mortality, exploring beliefs about death and afterlife, addressing regrets and finding acceptance, completing life review, and identifying sources of meaning and peace.
        </p>

        <ArticleCallout
          type="info"
          title="Advance Care Planning"
          content="Documents specifying your wishes if you become unable to communicate: Living will (what treatments you want/don't want), Healthcare proxy (who decides for you), DNR orders, organ donation preferences, and specific instructions about life support, feeding tubes, hospice care, etc."
        />

        <h2>Why We Avoid Death Preparation</h2>
        <p>
          <Citation index={3} />: fear that thinking about death will hasten it or bring bad luck (magical thinking), discomfort with confronting mortality directly, not wanting to burden family with difficult conversations, procrastination (I'll do it later when I'm older), denial (I'm healthy, death is far away), and lack of knowledge about what preparation involves. These barriers are understandable but ultimately create more problems---families must guess wishes during crises, important relationships remain unresolved, fear of death grows through avoidance rather than shrinking through engagement.
        </p>

        <h2>Benefits of Facing Death Directly</h2>
        <p>
          Research shows that active death preparation produces multiple benefits: reduced death anxiety as the unknown becomes more concrete and manageable, improved end-of-life care aligned with actual values and wishes, easier bereavement for surviving family who know they honored wishes, motivation to address unfinished business while time remains, clarification of priorities and values, greater peace and acceptance in final phase of life, and often enhanced quality of remaining life through freed mental energy previously devoted to avoiding thoughts of mortality. Paradoxically, preparing for death often helps people live better.
        </p>
      </>
    ),
  },
];
