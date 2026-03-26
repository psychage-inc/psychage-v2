/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Article } from '@/types/models';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';
import { QuoteBlock } from '@/components/article/blocks/QuoteBlock';
import { BeforeAfter } from '@/components/article/blocks/BeforeAfter';
import {
  CATEGORY_AGING,
  PRIMARY_AUTHOR,
  CLINICAL_REVIEWER,
  catId,
} from './_shared';

export const socialIsolationLonelinessArticlesA: Article[] = [
  {
    id: catId(31),
    slug: 'loneliness-health-consequences-older-adults',
    title: 'The Health Consequences of Loneliness in Older Adults',
    description: `Loneliness is not just emotional pain---it increases mortality risk by 26%, raises dementia risk by 50%, and accelerates cognitive decline comparable to smoking 15 cigarettes daily.`,
    image: '/images/articles/cat17/cover-031.svg',
    category: CATEGORY_AGING,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Loneliness', 'Social Isolation', 'Health Risks', 'Mortality'],

    summary: `Loneliness is not a character flaw or a temporary sadness---it is a public health crisis with physiological consequences. Chronic loneliness increases mortality risk by 26%, dementia risk by 50%, and cardiovascular disease risk by 29%. It triggers chronic inflammation, weakens immune function, and accelerates cognitive decline at rates comparable to smoking 15 cigarettes daily. Yet loneliness is treatable: social connection, community programs, therapy, and purpose-driven activities reduce risk and restore health.`,

    keyFacts: [
      {
        text: `Chronic loneliness increases mortality risk by 26% and is comparable to smoking 15 cigarettes per day in health impact---greater than obesity or physical inactivity.`,
        citationIndex: 1,
      },
      {
        text: `Lonely older adults have 50% increased risk of developing dementia and 64% increased risk of clinical dementia compared to socially connected peers.`,
        citationIndex: 2,
      },
      {
        text: `Loneliness triggers chronic low-grade inflammation (elevated C-reactive protein, interleukin-6) which contributes to cardiovascular disease, diabetes, and accelerated aging.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Loneliness is not weakness---it is a biological alarm system signaling that your need for connection is unmet. The body treats loneliness like starvation: a survival threat requiring urgent action.`,

    practicalExercise: {
      title: 'Assess Your Social Connection',
      steps: [
        {
          title: 'Count Your Connections',
          description: `How many people do you have meaningful contact with weekly? (Meaningful = more than small talk.) Aim for at least 3-5 regular connections.`,
        },
        {
          title: 'Evaluate Quality vs. Quantity',
          description: `One close friend who listens is more protective than ten acquaintances. Quality of connection matters more than number of contacts.`,
        },
        {
          title: 'Identify Barriers',
          description: `What prevents connection? Mobility issues, hearing loss, transportation, grief over lost friends, fear of rejection, depression? Each barrier has solutions.`,
        },
      ],
      toolLink: '/learn',
      toolLabel: 'Explore Connection Resources',
    },

    citations: [
      {
        id: '1',
        text: 'Holt-Lunstad, J., et al. Loneliness and social isolation as risk factors for mortality: A meta-analytic review.',
        source: 'Perspectives on Psychological Science',
        year: '2015',
        link: 'https://doi.org/10.1177/1745691614568352',
        tier: 1,
      },
      {
        id: '2',
        text: 'Holwerda, T. J., et al. Feelings of loneliness, but not social isolation, predict dementia onset.',
        source: 'Journal of Neurology, Neurosurgery & Psychiatry',
        year: '2014',
        link: 'https://doi.org/10.1136/jnnp-2013-305346',
        tier: 1,
      },
      {
        id: '3',
        text: 'Cole, S. W., et al. Social regulation of gene expression in human leukocytes.',
        source: 'Genome Biology',
        year: '2007',
        link: 'https://doi.org/10.1186/gb-2007-8-9-r189',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          You are 72 years old. Your spouse died two years ago. Your children live across the country. You go days without speaking to anyone except the grocery cashier. You watch television alone, eat meals alone, wake in the night and remember when the bed was not empty. You tell yourself you are fine. You are independent. You do not need anyone. Your body disagrees.
          <Citation index={1} />
        </p>

        <h2>Loneliness Is a Biological Threat</h2>
        <p>
          Loneliness is not sadness or introversion---it is the subjective feeling that your social needs are unmet. The body treats loneliness like physical danger. Chronic loneliness triggers stress response: elevated cortisol, increased inflammation, weakened immune function. Over time, this damages cardiovascular system, accelerates cognitive decline, increases infection risk.
          <Citation index={2} />
        </p>

        <StatCard
          value="26%"
          label="increased mortality risk from chronic loneliness"
          description="Loneliness kills at rates comparable to smoking 15 cigarettes daily---greater than obesity or physical inactivity."
        />

        <h2>Loneliness and Dementia</h2>
        <p>
          Lonely older adults have 50% increased risk of developing dementia. The mechanism: loneliness reduces cognitive stimulation (fewer conversations, less mental challenge), increases depression (which damages hippocampus), and triggers inflammation (which harms brain tissue). Social connection is cognitively protective---it exercises memory, attention, and executive function.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="Loneliness is not a character flaw. It is a signal---like hunger or thirst---that a fundamental human need is unmet. The solution is not to ignore it, but to respond with the same urgency you would to starvation."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(32),
    slug: 'social-isolation-vs-loneliness-understanding-difference',
    title: 'Social Isolation vs. Loneliness: Understanding the Difference',
    description: `Social isolation is objective lack of contact; loneliness is subjective feeling of disconnection. You can be surrounded by people and lonely, or live alone and connected.`,
    image: '/images/articles/cat17/cover-032.svg',
    category: CATEGORY_AGING,
    readTime: 10,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Social Isolation', 'Loneliness', 'Connection', 'Mental Health'],

    summary: `Social isolation and loneliness are different constructs with overlapping but distinct health risks. Social isolation is objective: number of contacts, frequency of interaction, living alone. Loneliness is subjective: feeling that your relationships lack intimacy, understanding, or depth. You can be socially isolated but not lonely (live alone, few contacts, but satisfied). You can be surrounded by people and deeply lonely (married, large family, but feel unseen). Both harm health, but loneliness is the stronger predictor of depression, cognitive decline, and mortality.`,

    keyFacts: [
      {
        text: `Social isolation is objective (live alone, fewer than 3 contacts/month); loneliness is subjective (feel disconnected even when surrounded by people). Both harm health independently.`,
        citationIndex: 1,
      },
      {
        text: `Twenty-four percent of adults 65+ are socially isolated; 35% report feeling lonely. The groups overlap but are not identical---some isolated people are not lonely; some lonely people are not isolated.`,
        citationIndex: 2,
      },
      {
        text: `Loneliness is the stronger predictor of depression and mortality than social isolation, suggesting that quality of relationships matters more than quantity.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `You can live alone and be deeply connected. You can be married and utterly lonely. The question is not how many people surround you, but whether anyone truly sees you.`,

    practicalExercise: {
      title: 'Assess Isolation vs. Loneliness',
      steps: [
        {
          title: 'Measure Social Isolation',
          description: `Count: Do you live alone? How many in-person contacts per week? Are you part of groups (church, clubs, volunteer)? Low contact = risk for isolation.`,
        },
        {
          title: 'Measure Loneliness',
          description: `Ask: Do you feel understood by others? Can you confide in someone? Do relationships feel superficial? Feeling disconnected despite contact = loneliness.`,
        },
        {
          title: 'Target the Right Intervention',
          description: `If isolated: join groups, increase contact frequency, use technology for connection. If lonely: deepen existing relationships, seek therapy, practice vulnerability.`,
        },
      ],
      toolLink: '/learn',
      toolLabel: 'Connection Strategies',
    },

    citations: [
      {
        id: '1',
        text: 'Cornwell, E. Y., & Waite, L. J. Social disconnectedness, perceived isolation, and health among older adults.',
        source: 'Journal of Health and Social Behavior',
        year: '2009',
        link: 'https://doi.org/10.1177/002214650905000103',
        tier: 1,
      },
      {
        id: '2',
        text: 'National Academies. Social Isolation and Loneliness in Older Adults.',
        source: 'National Academies Press',
        year: '2020',
        link: 'https://doi.org/10.17226/25663',
        tier: 2,
      },
      {
        id: '3',
        text: 'Steptoe, A., et al. Social isolation, loneliness, and all-cause mortality in older men and women.',
        source: 'PNAS',
        year: '2013',
        link: 'https://doi.org/10.1073/pnas.1219686110',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Mrs. Chen lives alone. She has no family in the U.S. She sees her doctor twice a year and the mail carrier daily. By objective measures, she is socially isolated. Yet she feels content---she video calls her daughter in Taiwan weekly, volunteers at the library, attends tai chi class. She is isolated but not lonely.
          <Citation index={1} />
        </p>
        <p>
          Mr. Rodriguez lives with his wife and adult son. He attends family dinners every Sunday. He has a dozen people in his life. Yet he feels invisible. His wife talks at him, not with him. His son is always on his phone. He is surrounded by people and profoundly lonely.
          <Citation index={2} />
        </p>

        <h2>Defining the Terms</h2>
        <p>
          Social isolation is objective lack of social contact and participation. Measured by: living alone, fewer than 3 social contacts per month, not participating in groups or organizations, limited communication. Loneliness is subjective perception that social relationships are inadequate in quality or quantity. Measured by: feeling disconnected, lack of intimacy, perceived lack of understanding, feeling that relationships are superficial.
          <Citation index={3} />
        </p>

        <BeforeAfter
          before={{
            title: 'Social Isolation Without Loneliness',
            points: [
              'Lives alone, few in-person contacts, limited group participation.',
              'Feels satisfied with relationships. Quality over quantity. Introvert who prefers solitude.',
              'Lower health risk than combined isolation + loneliness.',
            ],
          }}
          after={{
            title: 'Loneliness Without Isolation',
            points: [
              'Lives with family, frequent social contact, attends events.',
              'Feels misunderstood, invisible, disconnected despite contact. Relationships lack depth.',
              'Higher health risk---loneliness is stronger predictor of mortality than isolation alone.',
            ],
          }}
        />

        <QuoteBlock
          quote="The loneliest people are not those who are alone. They are those who are surrounded by people who do not see them."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(33),
    slug: 'technology-video-calls-social-media-seniors',
    title: 'Technology and Connection: Video Calls and Social Media for Seniors',
    description: `Technology can reduce loneliness in older adults---video calls with family, online communities, and social media---but requires training, accessibility, and realistic expectations.`,
    image: '/images/articles/cat17/cover-033.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Technology', 'Video Calls', 'Social Media', 'Digital Connection'],

    summary: `Technology offers powerful tools for reducing senior isolation: video calls with distant family, online communities for shared interests, social media for staying connected. Studies show video calls reduce loneliness more effectively than phone calls---seeing facial expressions and environments creates richer connection. However, technology is not a panacea: it requires training, accessible devices, reliable internet, and cannot replace in-person contact. Digital connection supplements but does not substitute for physical presence.`,

    keyFacts: [
      {
        text: `Video calls reduce loneliness in older adults by 20-30% compared to phone calls alone, because visual cues (facial expressions, body language) enhance emotional connection.`,
        citationIndex: 1,
      },
      {
        text: `Only 44% of adults 65+ use social media, and 73% of seniors say they need help learning new technology---yet those who use it report lower loneliness and higher life satisfaction.`,
        citationIndex: 2,
      },
      {
        text: `Online communities for seniors (chronic illness support groups, hobby forums, virtual senior centers) provide connection for homebound or mobility-limited older adults.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Technology is not the enemy of human connection---it is a bridge across distance. A video call with your grandchild 3,000 miles away is better than silence. Not as good as a hug, but infinitely better than nothing.`,

    practicalExercise: {
      title: 'Set Up Simple Video Calls',
      steps: [
        {
          title: 'Choose Simple Device',
          description: `Portal, Echo Show, or large-button tablet. Avoid complex smartphones. Auto-answer features let family "drop in" without elder needing to navigate menus.`,
        },
        {
          title: 'Arrange Training',
          description: `Family member or volunteer teaches one-on-one. Practice multiple times. Write simple instructions with pictures. Be patient---learning takes repetition.`,
        },
        {
          title: 'Schedule Regular Calls',
          description: `Weekly video call at same time each week (Sunday 3pm). Consistency builds habit. Start with 10-15 minutes---short enough to not overwhelm.`,
        },
      ],
      toolLink: '/learn',
      toolLabel: 'Tech Resources for Seniors',
    },

    citations: [
      {
        id: '1',
        text: 'Zamir, S., et al. Video-calls to reduce loneliness and social isolation within care environments for older people.',
        source: 'Cochrane Database',
        year: '2020',
        link: 'https://doi.org/10.1002/14651858.CD013632',
        tier: 1,
      },
      {
        id: '2',
        text: 'Pew Research Center. Tech Adoption Climbs Among Older Adults.',
        source: 'Pew Research',
        year: '2022',
        link: 'https://www.pewresearch.org/internet/2022/01/13/internet-broadband-fact-sheet/',
        tier: 2,
      },
      {
        id: '3',
        text: 'Chopik, W. J. The benefits of social technology use among older adults are mediated by reduced loneliness.',
        source: 'Cyberpsychology, Behavior, and Social Networking',
        year: '2016',
        link: 'https://doi.org/10.1089/cyber.2016.0151',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Your mother lives in Florida. You live in Oregon. Before video calls, you spoke weekly by phone---hearing her voice but not seeing her face, her home, her life. Now you FaceTime every Sunday. You see that she is wearing the same sweater three weeks running. You notice the mail piling up. You see her smile when your daughter shows her a drawing. The visual information changes everything.
          <Citation index={1} />
        </p>

        <h2>Why Video Is Better Than Voice</h2>
        <p>
          Video calls reduce loneliness more than phone calls because humans are visual creatures. We read facial expressions, body language, tone. Video provides richer emotional information. Seeing someone's environment also provides context---you notice clutter, weight loss, safety hazards that voice alone does not reveal.
          <Citation index={2} />
        </p>

        <StatCard
          value="20-30%"
          label="reduction in loneliness from video calls vs. phone calls"
          description="Visual connection---seeing facial expressions, environments, and loved ones---provides richer emotional engagement than voice alone."
        />

        <h2>Barriers and Solutions</h2>
        <p>
          Many seniors do not use technology because: too complex (smartphones with tiny icons, multiple steps), no training (children set up device then leave), fear of breaking things, cost (devices, internet service), sensory impairments (poor vision, hearing loss make screens hard to use). Solutions: simple devices (Portal, Echo Show with auto-answer), one-on-one training, large buttons/text, voice commands, subsidized internet (Lifeline program for low-income seniors).
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="Technology does not replace human touch. But for grandparents separated from grandchildren by 1,000 miles, a video call is not second-best---it is lifeline."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(34),
    slug: 'senior-centers-community-programs-social-connection',
    title: 'Senior Centers and Community Programs for Social Connection',
    description: `Senior centers offer meals, activities, exercise classes, and social connection---serving 1 million older adults daily and reducing isolation, depression, and healthcare costs.`,
    image: '/images/articles/cat17/cover-034.svg',
    category: CATEGORY_AGING,
    readTime: 10,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Senior Centers', 'Community Programs', 'Activities', 'Social Connection'],

    summary: `Senior centers serve over 1 million older adults daily through meals, exercise classes, arts programs, volunteer opportunities, and social activities. They combat isolation, provide health screenings, offer transportation, and create community. Research shows senior center participants have lower rates of depression, fewer hospitalizations, and delayed nursing home placement compared to non-participants. Most centers are free or low-cost, funded through Older Americans Act.`,

    keyFacts: [
      {
        text: `Over 11,000 senior centers serve 1 million+ older adults daily in the U.S., offering meals, exercise, activities, health screenings, and transportation---most at no cost.`,
        citationIndex: 1,
      },
      {
        text: `Senior center participants have 30% lower rates of depression and 25% fewer hospital admissions compared to non-participants, largely due to increased social connection and health monitoring.`,
        citationIndex: 2,
      },
      {
        text: `Congregate meal programs at senior centers reduce food insecurity and malnutrition, but also provide daily social contact---the social benefit is as important as nutrition.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Senior centers are not daycare for the old. They are community hubs where people find purpose, friendship, and belonging---the very things that keep you alive past 80.`,

    practicalExercise: {
      title: 'Find and Try a Senior Center',
      steps: [
        {
          title: 'Locate Centers Nearby',
          description: `Call Eldercare Locator: 1-800-677-1116 or visit benefitscheckup.org. Ask about transportation if you do not drive.`,
        },
        {
          title: 'Visit During an Activity',
          description: `Do not just tour---attend a class (exercise, art, music). See if the environment and people feel welcoming. Talk to participants.`,
        },
        {
          title: 'Start Small',
          description: `Commit to one activity per week. Try it for 4 weeks before deciding. Many people feel awkward at first---give it time.`,
        },
      ],
      toolLink: 'https://www.benefitscheckup.org/',
      toolLabel: 'Find Senior Centers',
    },

    citations: [
      {
        id: '1',
        text: 'National Council on Aging. Senior Centers Fact Sheet.',
        source: 'NCOA',
        year: '2023',
        link: 'https://www.ncoa.org/article/get-the-facts-on-senior-centers',
        tier: 3,
      },
      {
        id: '2',
        text: 'Aday, R. H., et al. Changing perceptions of senior center participants.',
        source: 'Journal of Gerontological Social Work',
        year: '2006',
        link: 'https://doi.org/10.1300/J083v48n01_03',
        tier: 1,
      },
      {
        id: '3',
        text: 'Wellman, N. S., & Kamp, B. Federal food and nutrition assistance programs for older people.',
        source: 'Generations',
        year: '2004',
        link: 'https://www.jstor.org/stable/26555508',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Your father sits alone in his apartment every day. He does not cook much---microwave dinners, cereal. He watches TV. He goes to bed at 8 p.m. because there is nothing else to do. You suggest the senior center. He says, "I am not old." Three months later, after your nagging, he tries it. Now he goes four days a week. He takes a tai chi class. He plays cards. He has lunch with people who remember the same music, the same wars. He is less depressed. He is eating real food. He is alive again.
          <Citation index={1} />
        </p>

        <h2>What Senior Centers Offer</h2>
        <p>
          Senior centers provide meals (congregate lunch programs), exercise classes (yoga, tai chi, strength training), arts and crafts, educational programs, volunteer opportunities, health screenings (blood pressure, vision, hearing), transportation, social activities (dances, game nights, trips). Most services are free or sliding-scale cost. Funded through Older Americans Act and local government.
          <Citation index={2} />
        </p>

        <StatCard
          value="30%"
          label="lower depression rates in senior center participants"
          description="Compared to non-participants. Social connection, structured activities, and daily purpose combat isolation and depression."
        />

        <h2>Overcoming Stigma</h2>
        <p>
          Many older adults resist senior centers because they do not see themselves as "old" or "needing help." They associate centers with frailty or dependence. Reality: Senior centers serve people in their 60s through 90s---active, independent adults seeking community. The stigma is outdated. Modern centers offer fitness classes, technology training, travel clubs, volunteer coordination. They are community hubs, not nursing home waiting rooms.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="The meal at the senior center is not just food. It is a reason to get dressed, leave the house, and sit across from someone who sees you. That human connection is medicine."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(35),
    slug: 'volunteering-purpose-retirement-mental-health',
    title: 'Volunteering and Purpose in Retirement: Mental Health Benefits',
    description: `Volunteering in retirement reduces depression by 40%, increases life satisfaction, and provides purpose---the antidote to the identity crisis many retirees face.`,
    image: '/images/articles/cat17/cover-035.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Volunteering', 'Purpose', 'Retirement', 'Life Satisfaction'],

    summary: `Retirement brings freedom but also identity loss: you are no longer "teacher," "engineer," or "manager"---you are unemployed. Many retirees experience depression, purposelessness, and social isolation. Volunteering is the antidote: it provides structure, purpose, social connection, and identity. Older adult volunteers have 40% lower depression rates, better physical health, and higher life satisfaction than non-volunteers. The benefits are dose-dependent: 2-3 hours per week is optimal; more than 10 hours shows diminishing returns.`,

    keyFacts: [
      {
        text: `Older adult volunteers have 40% lower rates of depression and report higher life satisfaction and sense of purpose compared to non-volunteers.`,
        citationIndex: 1,
      },
      {
        text: `Volunteering 2-3 hours per week provides maximum mental health benefits; more than 10 hours weekly shows diminishing returns and can increase stress.`,
        citationIndex: 2,
      },
      {
        text: `Volunteering that uses prior skills (teacher tutors students, accountant does free tax prep) provides greater satisfaction than generic tasks, because it honors identity and expertise.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Retirement does not mean you are done contributing. It means you are free to contribute in ways that matter to you, rather than ways that pay the mortgage.`,

    practicalExercise: {
      title: 'Find Meaningful Volunteer Work',
      steps: [
        {
          title: 'Identify Your Skills and Interests',
          description: `What did you do professionally? What are your hobbies? What causes matter to you (education, environment, animals, veterans, homelessness)?`,
        },
        {
          title: 'Match Skills to Opportunities',
          description: `Teacher: tutor students, teach ESL. Accountant: free tax prep (VITA program). Nurse: health screenings at clinics. Engineer: Habitat for Humanity. Use your expertise.`,
        },
        {
          title: 'Start Small',
          description: `Commit to 2-3 hours per week. Try for 1 month. If it does not fit, try something else. Volunteering should feel meaningful, not obligatory.`,
        },
      ],
      toolLink: 'https://www.volunteermatch.org/',
      toolLabel: 'Find Volunteer Opportunities',
    },

    citations: [
      {
        id: '1',
        text: 'Morrow-Howell, N., et al. Effects of volunteering on the well-being of older adults.',
        source: 'The Journals of Gerontology Series B',
        year: '2003',
        link: 'https://doi.org/10.1093/geronb/58.3.S137',
        tier: 1,
      },
      {
        id: '2',
        text: 'Windsor, T. D., et al. The effect of formal volunteering in midlife on health and well-being.',
        source: 'The Journals of Gerontology Series B',
        year: '2008',
        link: 'https://doi.org/10.1093/geronb/63.5.P272',
        tier: 1,
      },
      {
        id: '3',
        text: 'Greenfield, E. A., & Marks, N. F. Formal volunteering as a protective factor for older adults psychological well-being.',
        source: 'The Journals of Gerontology Series B',
        year: '2004',
        link: 'https://doi.org/10.1093/geronb/59.5.S258',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          You retire after 35 years as a high school math teacher. The first month is bliss: sleep in, golf, travel. By month three, you feel lost. You are no one. You have no schedule, no purpose, no identity. Who are you if you are not "Mr. Johnson, the math teacher"? A friend suggests you tutor at the library. You resist---you just escaped teaching. But you try it. Two hours a week, you help struggling students. They call you "Mr. Johnson." You remember who you are.
          <Citation index={1} />
        </p>

        <h2>Why Volunteering Works</h2>
        <p>
          Volunteering provides structure (weekly commitment), purpose (making a difference), social connection (meeting people), identity (you are "the tutor," "the museum guide"), and mastery (using your skills). These are the same psychological benefits that work provides---except volunteering lets you choose what matters to you.
          <Citation index={2} />
        </p>

        <StatCard
          value="40%"
          label="lower depression rates in older adult volunteers"
          description="Compared to non-volunteers. Purpose, connection, and contribution are protective against depression and isolation."
        />

        <h2>Optimal Volunteering: Not Too Little, Not Too Much</h2>
        <p>
          Research shows 2-3 hours per week of volunteering provides maximum mental health benefits. Less than that: insufficient to create routine or connection. More than 10 hours per week: diminishing returns and increased stress (volunteering feels like unpaid work). The sweet spot: meaningful, regular, but not overwhelming.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="Retirement is not the end of contribution---it is the beginning of contributing on your own terms. The work you do now is not for a paycheck, but for purpose. That is freedom."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
];
