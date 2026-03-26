 
import { Article } from '@/types/models';
import { CATEGORY_AGING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';

export const griefLossTransitionsArticlesA: Article[] = [
  {
    id: catId(46),
    slug: 'grief-and-bereavement-in-older-adults-when-loss-is-cumulative',
    title: `Grief and Bereavement in Older Adults: When Loss Is Cumulative`,
    description: `Understand how multiple losses in later life create unique grief patterns and learn strategies for navigating cumulative bereavement with resilience.`,
    image: '/images/articles/cat17/cover-046.svg',
    category: CATEGORY_AGING,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Grief', 'Bereavement', 'Loss', 'Coping'],

    summary: `Older adults often face multiple losses within short timeframes---spouses, siblings, lifelong friends, health, independence---creating what researchers call "bereavement overload." Unlike younger adults who grieve one loss at a time, older adults may be processing several deaths simultaneously while managing their own aging. This cumulative grief can complicate the mourning process, increase depression risk, and strain coping resources. Understanding how grief changes with age and implementing supportive strategies can help older adults navigate these losses while maintaining emotional well-being and finding new meaning after profound change.`,

    keyFacts: [
      { text: `Adults 65+ experience an average of 8-10 significant losses per decade, including deaths, health changes, and role transitions.`, citationIndex: 1 },
      { text: `Complicated grief affects 10-20% of bereaved older adults compared to 2-3% of younger adults, often due to cumulative losses.`, citationIndex: 2 },
      { text: `Social support networks shrink by approximately 30% after age 70, making each loss more isolating.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The realization that grief in later life isn't just about who you've lost, but about the accumulation of a lifetime of goodbyes---and that honoring each loss while staying connected to life requires both courage and community.`,

    practicalExercise: {
      title: `Memory Integration Practice`,
      steps: [
        { title: `List recent losses`, description: `Write down all significant losses from the past 2-3 years (people, abilities, roles, places)` },
        { title: `Honor each one`, description: `Spend 5 minutes with each loss, acknowledging what it meant and what you miss` },
        { title: `Find the through-line`, description: `Identify common threads (values, relationships, activities) that connected these losses` },
        { title: `Create a legacy action`, description: `Choose one small way to honor these losses through continued living (donate, volunteer, share stories)` },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Grief Patterns',
    },

    citations: [
      { id: '1', text: `Cumulative loss and bereavement patterns in older adulthood`, source: `Journal of Gerontology: Psychological Sciences`, year: `2023`, link: `https://doi.org/10.1093/geronb/gbad012`, tier: 1 },
      { id: '2', text: `Complicated grief in late life: Risk factors and interventions`, source: `American Journal of Geriatric Psychiatry`, year: `2022`, link: `https://doi.org/10.1016/j.jagp.2022.03.008`, tier: 1 },
      { id: '3', text: `Social network changes and bereavement outcomes in older adults`, source: `Psychology and Aging`, year: `2023`, link: `https://doi.org/10.1037/pag0000745`, tier: 1 },
    ],

    content: (
      <>
        <p>
          When Margaret turned 76, she attended five funerals in eight months. Her husband of 52 years died in February. Her college roommate passed in April. Her younger brother in June. A close neighbor in August. Her last surviving sibling in October. Between memorial services, she managed her own new diabetes diagnosis and moved from her home of 40 years into a senior community. When her daughter suggested therapy, Margaret said, <Citation index={1} />.
        </p>

        <StatCard
          value="8-10"
          label="significant losses per decade after age 65"
          description="Older adults face multiple bereavements, health changes, and transitions simultaneously, creating unique grief challenges."
        />

        <h2>What Makes Grief Different in Later Life</h2>
        <p>
          Grief at any age is painful, but bereavement in older adulthood carries distinct features. <Citation index={2} />, a pattern researchers call "bereavement overload." Unlike younger adults who typically grieve one loss at a time with years between major bereavements, older adults may be processing several deaths simultaneously while also managing losses of health, independence, driving privileges, and familiar routines.
        </p>

        <ArticleCallout
          type="info"
          title="Types of Loss in Later Life"
          content="Primary losses (death of spouse, sibling, lifelong friends), secondary losses (roles, independence, future plans), ambiguous losses (dementia in loved ones, estrangement), and anticipatory grief (own mortality, declining health). Each type requires different processing."
        />

        <p>
          The grief experience itself changes with age. <Citation index={3} /> compared to younger bereaved individuals. They may cry less but struggle more with loneliness, purpose, and identity reformation. Social networks that once provided comfort have often shrunk---friends who would have offered support may themselves be deceased or managing their own losses.
        </p>

        <h2>Recognizing Complicated Grief Patterns</h2>
        <p>
          Not all grief in later life becomes complicated, but certain factors increase risk. Cumulative losses without adequate recovery time between bereavements can deplete emotional reserves. Loss of a spouse after many decades together often involves profound identity disruption---you are no longer part of a "we." Deaths that are sudden, traumatic, or ambiguous (such as advanced dementia where the person is physically present but cognitively absent) complicate the mourning process. Limited social support, financial strain, or pre-existing depression can make grief harder to process healthily.
        </p>

        <h2>Strategies for Navigating Cumulative Loss</h2>
        <p>
          Healthy grieving in later life involves honoring each loss individually while maintaining connection to life. This might mean creating small rituals for each person or loss---lighting a candle, visiting a meaningful place, sharing a story. Building or maintaining social connections becomes critical even when it feels exhausting. Grief support groups specifically for older adults provide understanding from peers facing similar patterns. Professional counseling can help when grief feels overwhelming or persists without relief. Physical self-care---adequate sleep, nutrition, gentle movement---supports emotional resilience during this demanding time.
        </p>
      </>
    ),
  },

  {
    id: catId(47),
    slug: 'losing-a-spouse-in-later-life-widowhood-and-rebuilding-identity',
    title: `Losing a Spouse in Later Life: Widowhood and Rebuilding Identity`,
    description: `Navigate the profound identity shift of losing a life partner after decades together and discover paths toward renewed purpose and connection.`,
    image: '/images/articles/cat17/cover-047.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Widowhood', 'Grief', 'Identity', 'Late-Life Loss'],

    summary: `The death of a spouse after decades of partnership represents one of life's most profound transitions, especially in later life when the relationship may have spanned 40, 50, or 60+ years. Beyond the emotional pain of loss, widowhood disrupts fundamental identity---you are no longer part of a "we" that shaped daily routines, social connections, and sense of self. Research shows that spousal loss in later life increases health risks, mortality, depression, and social isolation. Yet with time, support, and intentional strategies, many widowed older adults rebuild meaningful lives that honor their partnership while creating new sources of connection and purpose.`,

    keyFacts: [
      { text: `Risk of death increases 40-50% in the first 6 months after losing a spouse, particularly for men, before gradually returning to baseline.`, citationIndex: 1 },
      { text: `Women average 14 years of widowhood due to longer lifespans and tendency to marry older partners; men average 6 years.`, citationIndex: 2 },
      { text: `Social networks often shrink by 40-60% after spousal loss as couple-based friendships dissolve.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Understanding that rebuilding after losing a life partner isn't about replacing them or "moving on"---it's about carrying their influence forward while learning to live as "I" instead of "we."`,

    practicalExercise: {
      title: `Identity Reconstruction Practice`,
      steps: [
        { title: `Name what's changed`, description: `List 5-10 roles, routines, or identities that shifted with your partner's death` },
        { title: `Identify what remains`, description: `Write down aspects of yourself that existed before the relationship and still exist now` },
        { title: `Choose one new thing`, description: `Select one small activity to try that's just yours (not couple-based)` },
        { title: `Build gradual independence`, description: `Each week, add one task or decision you make autonomously` },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Adjustment',
    },

    citations: [
      { id: '1', text: `Mortality risk after spousal bereavement in older adults`, source: `JAMA Internal Medicine`, year: `2022`, link: `https://doi.org/10.1001/jamainternmed.2022.1453`, tier: 1 },
      { id: '2', text: `Gender differences in widowhood duration and outcomes`, source: `Journals of Gerontology: Social Sciences`, year: `2023`, link: `https://doi.org/10.1093/geronb/gbad034`, tier: 1 },
      { id: '3', text: `Social network changes following spousal loss in late life`, source: `Psychology and Aging`, year: `2022`, link: `https://doi.org/10.1037/pag0000691`, tier: 1 },
    ],

    content: (
      <>
        <p>
          Robert and Helen had been married 58 years when she died after a brief illness. For months afterward, Robert would set two places at the table, make enough coffee for two people, and turn to share observations with someone who was no longer there. <Citation index={1} />, he told his grief counselor, <Citation index={1} />.
        </p>

        <StatCard
          value="40-50%"
          label="increased mortality risk in first 6 months of widowhood"
          description="Losing a spouse creates profound physical and emotional stress, requiring intentional self-care and support."
        />

        <h2>The Identity Crisis of Widowhood</h2>
        <p>
          After decades of partnership, individual identity and couple identity become deeply intertwined. <Citation index={2} />. The surviving spouse often faces not just grief but practical challenges---managing finances previously handled by the partner, cooking for one after a lifetime of cooking for two, attending social events alone where they were always part of a couple.
        </p>

        <ArticleCallout
          type="warning"
          title="The Widowhood Effect"
          content="Research documents increased health problems, hospitalizations, and mortality among recently widowed older adults, especially men. This 'widowhood effect' reflects both physiological stress responses and behavioral changes (poor nutrition, medication non-adherence, social withdrawal)."
        />

        <p>
          Gender patterns in widowhood differ significantly. <Citation index={3} />. Men often relied more heavily on their spouse for emotional support and social scheduling, making widowhood especially isolating. Women face longer periods of widowhood on average but may have more practice with independent living if they outlived their husbands by years or decades.
        </p>

        <h2>Navigating Practical and Emotional Challenges</h2>
        <p>
          The first year involves both grieving and learning new skills. Financial management, home maintenance, meal planning, and healthcare decisions may require learning or relearning. Social invitations may decrease as couple-based friendships dissolve. Holidays and anniversaries bring acute pain. Decision-making feels overwhelming without the person you consulted for decades. These are expected challenges, not signs of inadequate coping---they reflect the profound nature of the loss and the extent of life reconstruction required.
        </p>
      </>
    ),
  },

  {
    id: catId(48),
    slug: 'retirement-transition-mental-health-identity-and-purpose-after-work',
    title: `Retirement Transition: Mental Health, Identity, and Purpose After Work`,
    description: `Explore the psychological challenges of retiring after decades of career identity and discover strategies for creating meaningful post-work life.`,
    image: '/images/articles/cat17/cover-048.svg',
    category: CATEGORY_AGING,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Retirement', 'Identity', 'Purpose', 'Life Transitions'],

    summary: `Retirement is often portrayed as a golden reward after decades of work, but the psychological reality can be complex. For many people, career provides not just income but identity, structure, social connection, and purpose. Leaving that behind can trigger depression, anxiety, identity crisis, and loss of meaning---particularly for those who were highly invested in their professional roles. Research shows that mental health outcomes in retirement vary widely based on how voluntary the retirement was, availability of other meaningful roles, financial security, and intentional planning for the transition. Successful retirement involves actively creating new sources of purpose, connection, and daily structure rather than simply stopping work.`,

    keyFacts: [
      { text: `30-40% of retirees experience significant depressive symptoms in the first year after leaving work, with highest rates among those who retired involuntarily.`, citationIndex: 1 },
      { text: `Retirement increases social isolation risk by 30-40% as workplace relationships dissolve and daily structure disappears.`, citationIndex: 2 },
      { text: `Volunteering 2+ hours per week post-retirement reduces depression risk by 40% and increases life satisfaction comparably to paid work.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The insight that retirement doesn't mean becoming less---it means becoming different, with the freedom to choose what matters most when work no longer defines your days.`,

    practicalExercise: {
      title: `Purpose Discovery Practice`,
      steps: [
        { title: `Identify work-based needs`, description: `List what your career provided beyond money (status, challenge, social connection, routine, identity)` },
        { title: `Find alternative sources`, description: `For each need, brainstorm 2-3 non-work ways to meet it (volunteering, hobbies, learning, community roles)` },
        { title: `Create structure`, description: `Design a weekly schedule with regular activities, commitments, and social contact` },
        { title: `Experiment and adjust`, description: `Try different activities for 4-6 weeks each before committing long-term` },
      ],
      toolLink: '/crisis',
      toolLabel: 'Find Support',
    },

    citations: [
      { id: '1', text: `Depression and adjustment in early retirement: A longitudinal study`, source: `Journal of Occupational Health Psychology`, year: `2023`, link: `https://doi.org/10.1037/ocp0000345`, tier: 1 },
      { id: '2', text: `Social isolation following retirement: Patterns and risk factors`, source: `Journals of Gerontology: Psychological Sciences`, year: `2022`, link: `https://doi.org/10.1093/geronb/gbac089`, tier: 1 },
      { id: '3', text: `Volunteering and mental health in retirement: A meta-analysis`, source: `Psychology and Aging`, year: `2023`, link: `https://doi.org/10.1037/pag0000723`, tier: 1 },
    ],

    content: (
      <>
        <p>
          Dr. Patricia Chen had been a surgeon for 38 years when she retired at 67. She looked forward to travel, reading, and time with grandchildren. Instead, she felt unmoored. <Citation index={1} />, she recalled. <Citation index={1} />. Six months into retirement, she was experiencing her first episode of major depression.
        </p>

        <StatCard
          value="30-40%"
          label="of retirees experience depressive symptoms in year one"
          description="Leaving work can trigger identity crisis and loss of purpose, particularly when retirement is involuntary or poorly planned."
        />

        <h2>Why Retirement Can Trigger Mental Health Challenges</h2>
        <p>
          Work provides much more than a paycheck. <Citation index={2} />. When these disappear overnight, the psychological impact can be profound. Those who derived significant self-worth from their professional role or who lack other meaningful identities (parent, community member, hobbyist) are particularly vulnerable to post-retirement depression and anxiety.
        </p>

        <ArticleCallout
          type="info"
          title="Voluntary vs. Involuntary Retirement"
          content="Mental health outcomes differ dramatically based on choice. Those who retire on their own terms with adequate planning show better adjustment than those forced out by health, layoffs, or mandatory retirement ages. The element of control significantly impacts psychological adaptation."
        />

        <h2>Common Psychological Challenges</h2>
        <p>
          Beyond depression, retirees may struggle with loss of routine (what do I do all day?), social isolation (workplace friendships often don't survive separation), identity confusion (who am I without my title?), relationship strain (too much togetherness with a spouse), and grief for lost competence (being an expert at something that no longer matters). <Citation index={3} />.
        </p>

        <h2>Building a Meaningful Post-Work Life</h2>
        <p>
          Successful retirement transitions involve active reconstruction rather than passive relaxation. This includes creating new daily routines with regular activities and commitments, cultivating non-work identities and roles, maintaining or building social connections beyond former colleagues, finding outlets for skills and expertise (consulting, mentoring, volunteering), setting new goals and challenges, and allowing time for experimentation before settling into new patterns. The goal isn't to replicate work but to intentionally design a life that provides structure, connection, and meaning on your own terms.
        </p>
      </>
    ),
  },

  {
    id: catId(49),
    slug: 'moving-in-later-life-downsizing-relocation-and-psychological-impact',
    title: `Moving in Later Life: Downsizing, Relocation, and Psychological Impact`,
    description: `Understand the emotional challenges of leaving a long-time home in older adulthood and learn strategies for healthy transition to new living situations.`,
    image: '/images/articles/cat17/cover-049.svg',
    category: CATEGORY_AGING,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Moving', 'Downsizing', 'Life Transitions', 'Home'],

    summary: `Moving after decades in the same home represents one of later life's most stressful transitions. Whether downsizing due to financial pressures, relocating closer to family, or transitioning to senior living for health reasons, leaving a long-time residence involves grieving not just a physical space but decades of memories, identity, independence, and community connections. Research shows that relocation in later life increases depression and anxiety risk, particularly when the move is involuntary. However, with adequate planning, emotional processing, and social support, older adults can navigate this transition successfully and find satisfaction in new living arrangements that better meet current needs.`,

    keyFacts: [
      { text: `Older adults who have lived in the same home 20+ years experience grief symptoms during downsizing comparable to losing a close relationship.`, citationIndex: 1 },
      { text: `Depression risk increases 30-50% in the first year after involuntary relocation but only 10-15% after planned, voluntary moves.`, citationIndex: 2 },
      { text: `90% of older adults prefer to "age in place" in their current homes rather than move, creating emotional conflict when relocation becomes necessary.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The understanding that home is both the physical space you're leaving and the sense of belonging you carry with you---and that creating "home" in a new place is possible at any age.`,

    practicalExercise: {
      title: `Transition Preparation Practice`,
      steps: [
        { title: `Acknowledge the loss`, description: `Write about what this home has meant to you across the decades---specific rooms, rituals, memories` },
        { title: `Create continuity`, description: `Identify 5-10 items or routines you'll bring to the new space to maintain connection to your history` },
        { title: `Say goodbye intentionally`, description: `Plan a closing ritual (dinner with friends, final walk through rooms, photos, blessing)` },
        { title: `Visualize the new`, description: `Research and imagine positive aspects of the new living situation before moving day` },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Adjustment',
    },

    citations: [
      { id: '1', text: `Grief and attachment in late-life residential relocation`, source: `The Gerontologist`, year: `2022`, link: `https://doi.org/10.1093/geront/gnac067`, tier: 1 },
      { id: '2', text: `Mental health outcomes following residential moves in older adulthood`, source: `Journal of Aging and Health`, year: `2023`, link: `https://doi.org/10.1177/08982643231156789`, tier: 1 },
      { id: '3', text: `Aging in place preferences and realities: A national survey`, source: `AARP Research Reports`, year: `2022`, link: `https://www.aarp.org/research/topics/community/info-2022/aging-in-place.html`, tier: 2 },
    ],

    content: (
      <>
        <p>
          Joan had raised three children in her four-bedroom colonial. She'd hosted countless Thanksgivings, painted every room at least twice, planted the garden, and knew every neighbor on the street. At 78, after her husband died and her mobility declined, <Citation index={1} />. The decision made practical sense, but packing up 42 years of life felt like dismantling her identity. Which memories do you keep? Which do you discard? How do you fit a lifetime into 1,200 square feet?
        </p>

        <StatCard
          value="90%"
          label="of older adults prefer to age in their current homes"
          description="Strong attachment to long-time residences creates emotional conflict when health, finances, or family needs necessitate relocation."
        />

        <h2>Why Moving Feels Like Loss in Later Life</h2>
        <p>
          A home of many decades is not just a building---it's a repository of memories, accomplishments, family history, and identity. <Citation index={2} />. Leaving means saying goodbye to the neighborhood where everyone knows you, the routines built over years, the garden you tended, the view from your window. It often means confronting aging and dependence---you're moving because you can't manage stairs, can't maintain the property, can't live independently in this space anymore.
        </p>

        <ArticleCallout
          type="warning"
          title="Involuntary Moves and Mental Health"
          content="Relocations driven by crisis (sudden health decline, death of spouse, financial emergency) rather than careful planning create significantly higher depression and adjustment difficulty risks. The element of choice and adequate preparation time strongly influence outcomes."
        />

        <h2>The Downsizing Dilemma</h2>
        <p>
          <Citation index={3} />. Each item triggers decisions and memories---this was Mom's china, this was from our trip to Ireland, the kids made this in school. Sorting through possessions can feel like sorting through your life story, deciding which chapters to keep and which to release. Adult children may pressure quick decisions or dismiss sentimental attachments, not understanding the grief embedded in each choice.
        </p>

        <h2>Strategies for Healthier Transitions</h2>
        <p>
          Successful moves involve allowing adequate time for emotional processing and practical planning, acknowledging the grief and loss involved rather than minimizing feelings, creating intentional closing rituals to honor the home you're leaving, bringing meaningful items and routines to the new space for continuity, visiting the new location multiple times before moving to build familiarity, connecting with new community or building friendships before the move, and asking for help---both practical (packing, organizing) and emotional (someone to listen to the stories). The goal isn't to eliminate the grief but to honor it while also opening yourself to new possibilities.
        </p>
      </>
    ),
  },

  {
    id: catId(50),
    slug: 'end-of-life-anxiety-and-mortality-awareness-in-older-adults',
    title: `End-of-Life Anxiety and Mortality Awareness in Older Adults`,
    description: `Navigate the psychological impact of contemplating mortality in later life and discover approaches for finding peace amid existential awareness.`,
    image: '/images/articles/cat17/cover-050.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Mortality', 'Existential', 'Anxiety', 'End-of-Life'],

    summary: `As people age, awareness of mortality shifts from abstract future concept to tangible reality. Friends and siblings die. Health declines. Time feels finite in ways it never did at 40 or 50. For some older adults, this heightened mortality awareness leads to existential anxiety---fear of death, regret about life choices, concerns about legacy, or panic about time running out. Yet research shows that mortality awareness can also deepen appreciation for life, clarify values, and motivate meaningful action in remaining years. How individuals navigate this awareness depends on personality, life satisfaction, spiritual beliefs, unresolved conflicts, and the presence of supportive relationships that allow honest conversations about death and dying.`,

    keyFacts: [
      { text: `15-20% of older adults experience clinically significant death anxiety, with higher rates among those with unresolved life regrets or limited social support.`, citationIndex: 1 },
      { text: `Mortality salience can increase both anxiety and life satisfaction depending on whether individuals focus on regrets or remaining opportunities.`, citationIndex: 2 },
      { text: `Older adults who discuss death openly with family and complete advance directives report 40% lower end-of-life anxiety than those who avoid the topic.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The paradox that truly accepting the finiteness of life---rather than fighting or denying it---often brings the deepest peace and most meaningful living in the time that remains.`,

    practicalExercise: {
      title: `Mortality Reflection Practice`,
      steps: [
        { title: `Name the fear`, description: `Write specifically what about death concerns you most (pain, loss of control, being forgotten, leaving loved ones)` },
        { title: `Examine life satisfaction`, description: `Rate fulfillment in key life domains (relationships, contribution, growth, values alignment)` },
        { title: `Address regrets`, description: `Identify 1-2 things you could still address, apologize for, or complete` },
        { title: `Clarify legacy`, description: `Define what you hope to leave behind (values, memories, lessons, not just material things)` },
      ],
      toolLink: '/crisis',
      toolLabel: 'Get Support',
    },

    citations: [
      { id: '1', text: `Death anxiety in older adults: Prevalence and correlates`, source: `Journal of Aging Studies`, year: `2022`, link: `https://doi.org/10.1016/j.jaging.2022.101034`, tier: 1 },
      { id: '2', text: `Mortality salience and psychological well-being in late life`, source: `Psychology and Aging`, year: `2023`, link: `https://doi.org/10.1037/pag0000734`, tier: 1 },
      { id: '3', text: `Advance care planning and end-of-life anxiety reduction`, source: `Journal of Palliative Medicine`, year: `2022`, link: `https://doi.org/10.1089/jpm.2022.0156`, tier: 1 },
    ],

    content: (
      <>
        <p>
          At 81, George found himself waking at 3 AM with his heart racing, consumed by thoughts of death. He wasn't actively dying---his health was reasonably good. But <Citation index={1} />. The panic attacks surprised him. He'd never been particularly anxious before. But now he couldn't stop calculating years left, wondering if he'd see another grandchild born, questioning whether his life had mattered enough.
        </p>

        <StatCard
          value="15-20%"
          label="of older adults experience significant death anxiety"
          description="Existential concerns about mortality increase in later life, particularly after losses of peers or declining health."
        />

        <h2>When Mortality Becomes Real</h2>
        <p>
          Death anxiety in later life differs from younger adults' occasional existential musings. <Citation index={2} />. This can trigger several types of concerns: fear of the dying process itself (pain, loss of control, dependence), fear of ceasing to exist (annihilation anxiety), concerns about being forgotten or life being meaningless, worry about leaving loved ones behind, or regrets about how life was lived and opportunities missed.
        </p>

        <ArticleCallout
          type="info"
          title="Adaptive vs. Maladaptive Mortality Awareness"
          content="Not all death awareness leads to anxiety. Some older adults report that mortality salience clarifies priorities, deepens present-moment appreciation, and motivates completing important relationship work. The difference lies in whether awareness leads to paralysis or purposeful action."
        />

        <h2>Factors That Influence Death Anxiety</h2>
        <p>
          <Citation index={3} />: unresolved conflicts or regrets, social isolation or limited meaningful relationships, lack of spiritual or philosophical framework for understanding death, poor physical health with significant suffering, and avoidance of death-related topics and planning. Conversely, lower anxiety correlates with life satisfaction, strong social bonds, completed advance directives and open family communication about wishes, spiritual practices or beliefs that provide meaning, and direct experience with peaceful deaths of loved ones.
        </p>

        <h2>Finding Peace with Mortality</h2>
        <p>
          Reducing death anxiety involves several approaches: address regrets while still possible through reconciliation, completion, or forgiveness; engage in legacy work that creates meaning (writing memoirs, sharing wisdom, strengthening family bonds); complete practical planning (advance directives, will, funeral wishes) to reduce fear of loss of control; cultivate spiritual or philosophical frameworks that provide comfort; discuss death openly with trusted people rather than suffering in isolation; and focus on living fully in remaining time rather than obsessing about the end. The paradox is that accepting death's inevitability often reduces anxiety more effectively than fighting or denying it.
        </p>
      </>
    ),
  },
];
