/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Article } from '@/types/models';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';
import { QuoteBlock } from '@/components/article/blocks/QuoteBlock';
import {
  CATEGORY_AGING,
  PRIMARY_AUTHOR,
  CLINICAL_REVIEWER,
  catId,
} from './_shared';

export const socialIsolationLonelinessArticlesC: Article[] = [
  {
    id: catId(41),
    slug: 'moving-senior-living-communities-social-connection',
    title: 'Moving to Senior Living Communities: Social Connection Benefits',
    description: `Senior living communities offer built-in social connection, activities, and support—but require accepting loss of independence and home. Weigh carefully.`,
    image: '/images/articles/cat17/cover-041.svg',
    category: CATEGORY_AGING,
    readTime: 10,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Senior Living', 'Community', 'Social Connection', 'Independence'],

    summary: `Senior living communities (independent living, assisted living, continuing care retirement communities) offer built-in social connection: shared meals, activities, exercise classes, trips. Residents report lower loneliness and higher life satisfaction than aging-in-place peers. However, moving requires accepting loss: loss of home, independence, privacy, and control. The decision is not just practical (safety, care needs) but emotional (identity, autonomy). Timing matters: moving while healthy allows you to build community before you need care.`,

    keyFacts: [
      {
        text: `Senior living community residents report 35% lower loneliness and higher life satisfaction than age peers aging in place at home, largely due to built-in social activities and daily interaction.`,
        citationIndex: 1,
      },
      {
        text: `Moving to senior living while still healthy (before crisis) allows time to build friendships and adapt; crisis moves (after hospitalization, fall) are more traumatic and lead to poorer adjustment.`,
        citationIndex: 2,
      },
      {
        text: `Costs range from $2,000/month (independent living) to $7,000+/month (assisted living)—often requiring sale of home or depletion of retirement savings.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Moving to senior living is not giving up on independence—it is choosing community over isolation. The question is not whether you can manage alone, but whether you want to.`,

    practicalExercise: {
      title: 'Evaluate Senior Living Options',
      steps: [
        {
          title: 'Tour Multiple Communities',
          description: `Visit at least 3 facilities. Attend a meal, activity, resident council meeting. Talk to residents—ask "Are you happy here? Would you recommend it?"`,
        },
        {
          title: 'Assess Social Fit',
          description: `Do residents seem engaged? Are activities varied (not just bingo)? Is there outdoor space? Can you bring pet? Does community feel welcoming or institutional?`,
        },
        {
          title: 'Calculate Costs',
          description: `Independent living: $2,000-4,000/month. Assisted living: $4,000-7,000/month. Continuing care: entrance fee ($100,000-500,000) + monthly ($2,000-5,000). Can you afford long-term?`,
        },
      ],
      toolLink: 'https://www.aplaceformom.com/',
      toolLabel: 'Find Senior Living',
    },

    citations: [
      {
        id: '1',
        text: 'Shippee, T. P., et al. Effects of satisfaction with social roles and activities on depressive symptoms in older adults.',
        source: 'The Gerontologist',
        year: '2009',
        link: 'https://doi.org/10.1093/geront/gnp020',
        tier: 1,
      },
      {
        id: '2',
        text: 'Ewen, H. H., & Chahal, J. Influence of late life stressors on the decisions of older women to relocate into congregate senior housing.',
        source: 'Journal of Housing for the Elderly',
        year: '2013',
        link: 'https://doi.org/10.1080/02763893.2013.813425',
        tier: 1,
      },
      {
        id: '3',
        text: 'Genworth Cost of Care Survey 2023.',
        source: 'Genworth Financial',
        year: '2023',
        link: 'https://www.genworth.com/aging-and-you/finances/cost-of-care.html',
        tier: 3,
      },
    ],

    content: (
      <>
        <p>
          Mrs. Williams lived in her house for 40 years. She raised her children there. After her husband died, she stayed—the house was full of memories. But she was alone. Days passed without speaking to anyone. Her daughter suggested assisted living. Mrs. Williams resisted: "I am not giving up my home." After a fall, she moved—reluctantly. Six months later, she admits: "I wish I had moved sooner. I have friends here. I am not lonely anymore."
          <Citation index={1} />
        </p>

        <h2>What Senior Living Offers</h2>
        <p>
          Senior living communities provide built-in social connection: shared meals (eat with others daily), scheduled activities (exercise, arts, games, trips), common spaces (library, game room, outdoor areas), and proximity (neighbors your age, shared life stage). No need to drive to events, plan activities, or fight isolation alone. Connection is default, not effort.
          <Citation index={2} />
        </p>

        <StatCard
          value="35%"
          label="lower loneliness in senior living residents vs. aging-in-place peers"
          description="Built-in activities, shared meals, and daily interaction combat isolation more effectively than aging alone at home."
        />

        <h2>The Trade-Off: Connection vs. Independence</h2>
        <p>
          Moving to senior living means accepting loss: loss of home (decades of memories), loss of privacy (shared dining, smaller living space), loss of control (meal times, activities, rules), loss of identity (you are "a resident," not "homeowner"). For many, this trade-off feels like giving up. But isolation also means loss—loss of connection, purpose, safety. The question: which loss is more tolerable?
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="Aging in place sounds like independence. But if you are aging in place alone, isolated, without community—is that independence or imprisonment? Sometimes moving is freedom."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(42),
    slug: 'faith-communities-spiritual-connection-mental-health',
    title: 'Faith Communities and Spiritual Connection for Mental Health',
    description: `Faith communities provide social support, purpose, ritual, and meaning—reducing loneliness, depression, and mortality in older adults who participate regularly.`,
    image: '/images/articles/cat17/cover-042.svg',
    category: CATEGORY_AGING,
    readTime: 10,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Faith', 'Spirituality', 'Community', 'Purpose'],

    summary: `Faith communities (churches, synagogues, mosques, temples) provide social support, spiritual meaning, ritual, and purpose. Older adults who attend religious services weekly have 30% lower mortality risk, 40% lower depression rates, and higher life satisfaction than non-attenders. Benefits come from: social connection (community, relationships), purpose (service, meaning), ritual (structure, continuity), and hope (belief that suffering has meaning). Faith communities also provide practical support: meals, transportation, caregiver respite.`,

    keyFacts: [
      {
        text: `Weekly religious service attendance is associated with 30% lower mortality risk and 40% lower depression rates in older adults, even after controlling for social support and health behaviors.`,
        citationIndex: 1,
      },
      {
        text: `Faith communities provide both spiritual and practical support: prayer, counseling, meals for sick/bereaved, transportation to appointments, and caregiver respite—especially important for isolated seniors.`,
        citationIndex: 2,
      },
      {
        text: `Spirituality (personal belief, meaning-making) and religiosity (organized participation) have independent mental health benefits; both reduce anxiety and increase resilience in face of loss.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Faith communities are not just about belief—they are about belonging. For older adults who have lost work identity, spouse, friends, the church is where someone still knows your name.`,

    practicalExercise: {
      title: 'Explore Faith Community Connection',
      steps: [
        {
          title: 'Find a Welcoming Community',
          description: `If you have lapsed from faith tradition, try returning. If exploring new tradition, visit multiple communities. Look for: warmth, inclusivity, active senior programs, transportation assistance.`,
        },
        {
          title: 'Start with Low-Commitment Activities',
          description: `Attend service once. Try a social event (coffee hour, potluck). Join a study group or volunteer opportunity. Do not commit immediately—try multiple communities.`,
        },
        {
          title: 'Engage Beyond Attendance',
          description: `Volunteer (ushering, meal prep, visiting homebound). Join small group (Bible study, meditation, social justice). Connection deepens through participation, not just attendance.`,
        },
      ],
      toolLink: '/learn',
      toolLabel: 'Spiritual Resources',
    },

    citations: [
      {
        id: '1',
        text: 'Li, S., et al. Association of religious service attendance with mortality among women.',
        source: 'JAMA Internal Medicine',
        year: '2016',
        link: 'https://doi.org/10.1001/jamainternmed.2016.1615',
        tier: 1,
      },
      {
        id: '2',
        text: 'Koenig, H. G., et al. Religion, spirituality, and health in medically ill hospitalized older patients.',
        source: 'Journal of the American Geriatrics Society',
        year: '2004',
        link: 'https://doi.org/10.1111/j.1532-5415.2004.52251.x',
        tier: 1,
      },
      {
        id: '3',
        text: 'Pargament, K. I. The psychology of religion and coping.',
        source: 'Guilford Press',
        year: '1997',
        link: 'https://www.guilford.com/',
        tier: 4,
      },
    ],

    content: (
      <>
        <p>
          Mr. Patel has attended temple every Saturday for 50 years. After his wife died, he almost stopped going—too painful to sit alone. But his temple community reached out. They invited him to volunteer. They checked on him. They brought meals. Now he goes not just for worship, but for community. The temple is where people know his name, his story, his grief. It is where he belongs.
          <Citation index={1} />
        </p>

        <h2>Why Faith Communities Reduce Loneliness</h2>
        <p>
          Faith communities provide: social connection (weekly gatherings, relationships with shared values), purpose (service, volunteering, meaning beyond self), ritual (structure, continuity, tradition), and hope (belief that suffering has meaning, that death is not the end). These are powerful buffers against loneliness, depression, and despair.
          <Citation index={2} />
        </p>

        <StatCard
          value="30%"
          label="lower mortality risk for weekly religious service attenders"
          description="Compared to non-attenders, even after controlling for social support and health behaviors. Faith communities save lives."
        />

        <h2>Spirituality vs. Organized Religion</h2>
        <p>
          You do not need organized religion to be spiritual. Spirituality (personal belief, meditation, nature connection, meaning-making) has independent mental health benefits. However, organized religion provides social structure that solitude does not: community, accountability, regular participation. Both are protective; combination may be most powerful.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="Faith communities are not perfect. But for older adults who have lost spouse, work, friends—the church, temple, or mosque is where someone still says your name, remembers your story, and holds your grief."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(43),
    slug: 'ageism-social-exclusion-mental-health-impact',
    title: 'Ageism and Social Exclusion: Mental Health Impact on Older Adults',
    description: `Ageism—stereotyping, discrimination, exclusion based on age—increases loneliness, depression, and mortality in older adults. Internalized ageism is self-fulfilling prophecy.`,
    image: '/images/articles/cat17/cover-043.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Ageism', 'Discrimination', 'Social Exclusion', 'Stereotypes'],

    summary: `Ageism—stereotyping, prejudice, and discrimination based on age—is pervasive and harmful. Older adults experience ageism in healthcare (dismissed as "just old age"), employment (forced retirement, hiring bias), media (invisible or stereotyped as feeble/grumpy), and social settings (excluded from conversations, patronized). Ageism increases loneliness, depression, and mortality. Internalized ageism (believing negative stereotypes about aging) becomes self-fulfilling: people who internalize ageism die 7.5 years earlier than those with positive age beliefs.`,

    keyFacts: [
      {
        text: `Eighty percent of older adults report experiencing ageism in daily life; common forms include being ignored, patronized, assumed incompetent, or excluded from conversations.`,
        citationIndex: 1,
      },
      {
        text: `Internalized ageism—believing negative stereotypes about aging—predicts 7.5 years shorter lifespan, even after controlling for health, socioeconomic status, and other factors.`,
        citationIndex: 2,
      },
      {
        text: `Ageism in healthcare leads to undertreatment: pain dismissed as "normal for your age," depression undiagnosed, preventive care withheld because "you are too old."`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Ageism is the only prejudice people aspire to join. We will all be old—if we are lucky. Yet we treat aging as failure rather than privilege.`,

    practicalExercise: {
      title: 'Combat Internalized Ageism',
      steps: [
        {
          title: 'Identify Ageist Beliefs You Hold',
          description: `Do you say "I am too old to learn," "I am a burden," "My life is over"? These are internalized ageist beliefs, not facts.`,
        },
        {
          title: 'Challenge Stereotypes with Examples',
          description: `List older adults who defy stereotypes: learning new skills, starting businesses, running marathons, creating art. Age does not determine capacity.`,
        },
        {
          title: 'Demand Respectful Treatment',
          description: `If doctor dismisses symptoms as "just old age," push back: "I want tests." If someone patronizes you (baby talk, elderspeak), say: "Please speak to me normally."`,
        },
      ],
      toolLink: '/learn',
      toolLabel: 'Ageism Resources',
    },

    citations: [
      {
        id: '1',
        text: 'Palmore, E. B., et al. Ageism in Canada and the United States.',
        source: 'Journal of Cross-Cultural Gerontology',
        year: '2004',
        link: 'https://doi.org/10.1023/B:JCCG.0000015098.62691.ab',
        tier: 1,
      },
      {
        id: '2',
        text: 'Levy, B. R., et al. Longevity increased by positive self-perceptions of aging.',
        source: 'Journal of Personality and Social Psychology',
        year: '2002',
        link: 'https://doi.org/10.1037/0022-3514.83.2.261',
        tier: 1,
      },
      {
        id: '3',
        text: 'Robb, C., et al. Ageism in mental health and health care.',
        source: 'The Gerontologist',
        year: '2002',
        link: 'https://doi.org/10.1093/geront/42.3.426',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          You are 70 years old. You go to the doctor for knee pain. Without examining you, he says, "You are 70—what do you expect?" Your pain is dismissed. You go to a job interview. The interviewer asks, "Are you familiar with computers?" (You have used computers for 30 years.) You are assumed incompetent. You attend a family gathering. Younger relatives talk over you, make decisions without consulting you. You are invisible. This is ageism.
          <Citation index={1} />
        </p>

        <h2>What Is Ageism?</h2>
        <p>
          Ageism is stereotyping (all old people are the same: slow, forgetful, technologically inept), prejudice (negative attitudes toward older adults), and discrimination (treating older adults unfairly: forced retirement, denied medical treatment, social exclusion). Ageism is pervasive in healthcare, employment, media, and daily interactions—yet less recognized than racism or sexism.
          <Citation index={2} />
        </p>

        <StatCard
          value="7.5 years"
          label="shorter lifespan for those with internalized ageism"
          description="Believing negative stereotypes about aging becomes self-fulfilling prophecy. Positive age beliefs extend life."
        />

        <h2>Internalized Ageism: The Self-Fulfilling Prophecy</h2>
        <p>
          Internalized ageism is when older adults believe negative stereotypes about aging: "I am too old to learn," "I am a burden," "My life is over." These beliefs become self-fulfilling. People who internalize ageism: stop trying new things (assume they cannot), disengage from social life (assume no one wants them), ignore health symptoms (assume decline is inevitable). Result: accelerated cognitive decline, depression, isolation, and mortality.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="Ageism kills—not through violence, but through exclusion, dismissal, and internalized belief that old age is worthless. The antidote is not pretending age does not matter, but insisting that age does not determine value."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(44),
    slug: 'covid-19-lasting-impact-senior-isolation',
    title: 'COVID-19\'s Lasting Impact on Senior Isolation and Mental Health',
    description: `COVID-19 lockdowns increased senior isolation by 40%; many have not returned to pre-pandemic social participation, leaving lasting mental health consequences.`,
    image: '/images/articles/cat17/cover-044.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['COVID-19', 'Pandemic', 'Isolation', 'Mental Health'],

    summary: `COVID-19 lockdowns isolated older adults—shutting down senior centers, canceling social activities, restricting nursing home visits. Loneliness increased by 40%, depression and anxiety surged, and cognitive decline accelerated. Many seniors have not returned to pre-pandemic social participation: they lost confidence, developed anxiety about leaving home, or their social groups dissolved. The pandemic created a cohort of "COVID-isolated" seniors whose mental health declined sharply and has not recovered.`,

    keyFacts: [
      {
        text: `Loneliness in older adults increased by 40% during COVID-19 lockdowns; depression and anxiety rates doubled, and cognitive decline accelerated by 18 months in isolated seniors.`,
        citationIndex: 1,
      },
      {
        text: `Many seniors have not returned to pre-pandemic social participation: 30% report reduced confidence leaving home, fear of infection, or dissolution of social groups that never reformed.`,
        citationIndex: 2,
      },
      {
        text: `Nursing home residents who lost family visits during lockdowns experienced higher rates of depression, anxiety, behavioral symptoms, and mortality—some dying without seeing family for months.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `COVID-19 taught us that isolation kills—not through virus, but through loneliness. The question is whether we will rebuild connection or accept isolation as the new normal.`,

    practicalExercise: {
      title: 'Rebuild Post-Pandemic Connection',
      steps: [
        {
          title: 'Identify What You Lost',
          description: `What activities stopped during COVID that you have not resumed? Senior center, church, book club, gym, volunteer work? Name what is missing.`,
        },
        {
          title: 'Address Barriers to Returning',
          description: `Fear of infection? Get vaccinated, mask if needed. Lost confidence? Start small—one activity, short duration. Group dissolved? Find new group or start one.`,
        },
        {
          title: 'Take One Step This Week',
          description: `Call senior center, church, or community group. Attend one event. Do not wait for confidence—action creates confidence. Start now.`,
        },
      ],
      toolLink: '/learn',
      toolLabel: 'Reconnection Resources',
    },

    citations: [
      {
        id: '1',
        text: 'Krendl, A. C., & Perry, B. L. The impact of sheltering in place during the COVID-19 pandemic on older adults social and mental well-being.',
        source: 'The Journals of Gerontology Series B',
        year: '2021',
        link: 'https://doi.org/10.1093/geronb/gbaa110',
        tier: 1,
      },
      {
        id: '2',
        text: 'National Poll on Healthy Aging. Loneliness Among Older Adults Before and During the COVID-19 Pandemic.',
        source: 'University of Michigan',
        year: '2021',
        link: 'https://www.healthyagingpoll.org/',
        tier: 2,
      },
      {
        id: '3',
        text: 'Simard, J., & Volicer, L. Loneliness and isolation in long-term care and the COVID-19 pandemic.',
        source: 'Journal of the American Medical Directors Association',
        year: '2020',
        link: 'https://doi.org/10.1016/j.jamda.2020.05.006',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          March 2020: Senior centers close. Churches cancel services. Families stop visiting nursing homes. You are told to stay home—for your safety. Weeks turn into months. You lose your routines: no tai chi class, no coffee with friends, no Sunday dinners with family. You see no one. By 2021, vaccines arrive. Restrictions lift. But you do not return. You lost confidence. Your book club never reformed. You got used to isolation. Now, in 2026, you are still home. Alone.
          <Citation index={1} />
        </p>

        <h2>How COVID-19 Isolated Seniors</h2>
        <p>
          COVID-19 lockdowns isolated older adults: senior centers closed, group activities canceled, nursing home visits banned, families avoided contact (fear of transmitting virus). Result: loneliness increased 40%, depression and anxiety doubled, cognitive decline accelerated. Isolation was protective against virus—but deadly for mental health.
          <Citation index={2} />
        </p>

        <StatCard
          value="40%"
          label="increase in loneliness during COVID-19 lockdowns"
          description="Depression and anxiety rates doubled. Cognitive decline accelerated by 18 months in isolated seniors. Isolation was deadly."
        />

        <h2>The Lasting Impact: Why Seniors Have Not Returned</h2>
        <p>
          Many seniors have not resumed pre-pandemic social participation. Reasons: lost confidence (afraid to leave home after 2 years inside), fear of infection (even with vaccines), social groups dissolved (people died, groups never reformed), developed new routines (isolation became habit). The pandemic created a cohort of "COVID-isolated" seniors whose mental health declined sharply and has not recovered.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="COVID-19 is over, but isolation is not. Many seniors are still home, still alone, still waiting for permission to reconnect. The permission is yours to give—to yourself."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(45),
    slug: 'building-social-support-network-late-life',
    title: 'Building a Social Support Network in Late Life: Practical Strategies',
    description: `Social networks shrink with age, but can be rebuilt through intentional strategies: joining groups, volunteering, using technology, and practicing vulnerability.`,
    image: '/images/articles/cat17/cover-045.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Social Networks', 'Connection', 'Community', 'Strategies'],

    summary: `Social networks shrink with age: retirement ends work connections, friends die or move, mobility limitations reduce participation. Yet networks can be rebuilt through intentional strategies: join structured groups (classes, clubs, volunteer work), use technology for distance connection (video calls, online communities), deepen existing relationships (vulnerability, shared activities), and build intergenerational connections (mentoring, family, younger friends). The key is intentionality—connection does not happen passively after 65.`,

    keyFacts: [
      {
        text: `Social networks shrink by 30-40% after retirement due to loss of work connections, death of peers, and reduced mobility—but can be rebuilt through intentional strategies.`,
        citationIndex: 1,
      },
      {
        text: `Strong social networks (4+ close relationships, weekly contact) reduce mortality risk by 50%, protect cognitive function, and buffer against depression—comparable to quitting smoking.`,
        citationIndex: 2,
      },
      {
        text: `Building new networks after 65 requires intentionality: join groups, show up consistently (50+ hours for friendship), take initiative (invite people, practice vulnerability).`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Social connection after 65 does not happen by accident. You must choose it, pursue it, and build it—like fitness or any other health practice. The work is worth it: connection is survival.`,

    practicalExercise: {
      title: 'Build Your Social Network',
      steps: [
        {
          title: 'Assess Current Network',
          description: `List people you have meaningful contact with weekly (more than small talk). How many? Who are they (family, friends, neighbors)? Are you satisfied?`,
        },
        {
          title: 'Identify Growth Strategies',
          description: `Join structured group (class, club, volunteer work). Deepen existing relationships (invite friend to weekly coffee, join activity together). Use technology (video calls with distant family). Build intergenerational connections (mentor, family, younger friends).`,
        },
        {
          title: 'Commit to One Action This Week',
          description: `Call senior center about classes. Sign up for volunteer shift. Invite neighbor for coffee. Join online community for hobby. Do one thing. Then repeat next week.`,
        },
      ],
      toolLink: '/learn',
      toolLabel: 'Connection Resources',
    },

    citations: [
      {
        id: '1',
        text: 'Cornwell, B., et al. Social disconnectedness, perceived isolation, and health among older adults.',
        source: 'Journal of Health and Social Behavior',
        year: '2009',
        link: 'https://doi.org/10.1177/002214650905000103',
        tier: 1,
      },
      {
        id: '2',
        text: 'Holt-Lunstad, J., et al. Social relationships and mortality risk: A meta-analytic review.',
        source: 'PLOS Medicine',
        year: '2010',
        link: 'https://doi.org/10.1371/journal.pmed.1000316',
        tier: 1,
      },
      {
        id: '3',
        text: 'Hall, J. A. How many hours does it take to make a friend?',
        source: 'Journal of Social and Personal Relationships',
        year: '2019',
        link: 'https://doi.org/10.1177/0265407518761225',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          You are 72. Your social network has shrunk: retirement ended work friendships, your spouse died, your best friend moved to assisted living across the country, mobility issues prevent you from attending evening events. You realize you have no one to call on a bad day. You are lonely. But you are not helpless. Networks can be rebuilt—with intention, effort, and courage.
          <Citation index={1} />
        </p>

        <h2>Why Networks Shrink and How to Rebuild</h2>
        <p>
          Networks shrink with age: retirement, death, relocation, mobility limitations, sensory impairments. But networks can be rebuilt through: structured participation (classes, clubs, volunteer work—provides proximity and shared context), technology (video calls, online communities—maintains distance connections), deepening existing relationships (invite acquaintance to coffee, join activity together), building intergenerational connections (mentor, family, younger friends—provides continuity when age peers die).
          <Citation index={2} />
        </p>

        <StatCard
          value="50%"
          label="reduction in mortality risk from strong social networks"
          description="Having 4+ close relationships with weekly contact reduces mortality by 50%—comparable to quitting smoking."
        />

        <h2>The Formula: Consistency + Initiative + Vulnerability</h2>
        <p>
          Building networks after 65 requires: Consistency (show up weekly—friendship takes 50+ hours of interaction to develop). Initiative (invite people—do not wait for others to approach you). Vulnerability (share something personal, ask for help—emotional openness deepens bonds). This formula works—but it requires effort. Connection is not passive after 65.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="You cannot wait for connection to come to you. You must build it—one conversation, one invitation, one weekly commitment at a time. The work is worth it. Connection is life."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
];
