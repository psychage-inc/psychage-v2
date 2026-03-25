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

export const socialIsolationLonelinessArticlesB: Article[] = [
  {
    id: catId(36),
    slug: 'pet-ownership-companionship-mental-health-older-adults',
    title: 'Pet Ownership and Companionship for Mental Health in Older Adults',
    description: `Pets reduce loneliness, lower blood pressure, increase physical activity, and provide purpose—but require realistic assessment of care capacity and costs.`,
    image: '/images/articles/cat17/cover-036.svg',
    category: CATEGORY_AGING,
    readTime: 10,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Pet Ownership', 'Companionship', 'Loneliness', 'Mental Health'],

    summary: `Pet ownership reduces loneliness, depression, and anxiety in older adults. Dogs provide routine (feeding, walking), social connection (talking to other dog owners), and physical activity. Cats offer companionship without demanding mobility. Pets lower blood pressure and cortisol levels. However, pet ownership requires realistic assessment: cost ($1,000-2,000/year for dog, $500-1,000 for cat), physical capacity to care for pet, and contingency planning (who cares for pet if you are hospitalized or die).`,

    keyFacts: [
      {
        text: `Pet ownership reduces loneliness by 36% and depression by 30% in older adults, particularly for those living alone or recently widowed.`,
        citationIndex: 1,
      },
      {
        text: `Dog owners walk an average of 22 minutes more per day than non-dog owners, meeting physical activity guidelines more consistently than seniors without pets.`,
        citationIndex: 2,
      },
      {
        text: `Pets cost $500-2,000/year (food, vet, grooming) and require physical capacity to walk, clean, and lift—many seniors adopt pets without planning for these realities.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `A pet does not judge your wrinkles, your slowness, or your memory lapses. It sees you, needs you, and loves you unconditionally. For many older adults living alone, that is lifesaving.`,

    practicalExercise: {
      title: 'Assess Readiness for Pet',
      steps: [
        {
          title: 'Evaluate Physical Capacity',
          description: `Can you walk a dog daily? Bend to clean litter box? Lift cat carrier to vet? If mobility limited, consider low-maintenance pet (cat, small dog) or pet therapy visits instead.`,
        },
        {
          title: 'Calculate Costs',
          description: `Dog: $1,500-2,000/year (food, vet, grooming). Cat: $500-1,000/year. Emergency vet visits: $500-3,000. Can you afford this on fixed income?`,
        },
        {
          title: 'Plan Contingencies',
          description: `Who cares for pet if you are hospitalized? Dies? Include pet in will or trust. Identify backup caregiver. Some shelters offer "rehoming agreements" for senior pet owners.`,
        },
      ],
      toolLink: '/learn',
      toolLabel: 'Pet Resources for Seniors',
    },

    citations: [
      {
        id: '1',
        text: 'Krause-Parello, C. A., & Gulick, E. E. Pet ownership and older women.',
        source: 'Journal of Women & Aging',
        year: '2013',
        link: 'https://doi.org/10.1080/08952841.2013.816215',
        tier: 1,
      },
      {
        id: '2',
        text: 'Thorpe, R. J., et al. Dog ownership, walking behavior, and maintained mobility in late life.',
        source: 'Journal of the American Geriatrics Society',
        year: '2006',
        link: 'https://doi.org/10.1111/j.1532-5415.2006.00856.x',
        tier: 1,
      },
      {
        id: '3',
        text: 'American Pet Products Association. Pet Ownership Costs.',
        source: 'APPA',
        year: '2023',
        link: 'https://www.americanpetproducts.org/',
        tier: 3,
      },
    ],

    content: (
      <>
        <p>
          Mrs. Garcia has been a widow for three years. She lives alone. Some days she does not speak to anyone. Her daughter suggests getting a dog. Mrs. Garcia adopts a small terrier named Max. Every morning, Max wakes her at 7 a.m. for breakfast. They walk around the block—slowly, but daily. Other dog owners stop to chat. Max sits on her lap while she reads. She is no longer alone. She has purpose: Max needs her.
          <Citation index={1} />
        </p>

        <h2>How Pets Reduce Loneliness</h2>
        <p>
          Pets provide unconditional companionship. They create routine (feeding, walking), facilitate social connection (talking to other pet owners), reduce stress (petting lowers cortisol and blood pressure), and offer purpose (something depends on you). For older adults living alone, pets fill the silence.
          <Citation index={2} />
        </p>

        <StatCard
          value="22 minutes"
          label="more daily walking for dog owners vs. non-dog owners"
          description="Dog ownership increases physical activity, which improves cardiovascular health, mobility, and mood."
        />

        <h2>Realistic Considerations</h2>
        <p>
          Pet ownership requires physical and financial capacity. Dogs need daily walks (can you walk 15-30 minutes?), vet visits (can you transport pet?), grooming. Cats need litter box cleaning (can you bend, scoop, lift?). Costs: food, vet, medications, emergencies. Contingency planning: who cares for pet if you are hospitalized, move to assisted living, or die? Many seniors adopt pets without addressing these realities—leading to surrender or neglect.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="A pet is not a cure for loneliness—but for someone living alone in silence, a creature that greets you at the door with joy is medicine."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(37),
    slug: 'intergenerational-programs-relationships-mental-health',
    title: 'Intergenerational Programs and Relationships for Mental Health',
    description: `Intergenerational programs—pairing seniors with children or young adults—reduce loneliness, increase purpose, and benefit both generations through mutual support.`,
    image: '/images/articles/cat17/cover-037.svg',
    category: CATEGORY_AGING,
    readTime: 10,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Intergenerational Programs', 'Mentoring', 'Purpose', 'Connection'],

    summary: `Intergenerational programs pair older adults with children, teens, or young adults for mutual benefit. Examples: seniors mentor students, read to preschoolers, teach life skills, or share housing with college students. Benefits for seniors: reduced loneliness (40% decrease), increased purpose, cognitive stimulation. Benefits for youth: improved academic performance, reduced ageism, emotional support. These programs combat age segregation—a modern phenomenon where old and young never interact.`,

    keyFacts: [
      {
        text: `Intergenerational programs reduce loneliness in older adults by 40% and increase sense of purpose, while improving academic performance and reducing ageism in youth.`,
        citationIndex: 1,
      },
      {
        text: `Programs pairing seniors with preschoolers (reading, tutoring) or teens (mentoring, job skills) benefit both groups: elders gain purpose, youth gain wisdom and support.`,
        citationIndex: 2,
      },
      {
        text: `Shared housing programs (college students live with seniors in exchange for companionship/chores) reduce isolation and housing costs for both generations.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Loneliness is partly a product of age segregation—we warehouse old people separately from young people. Intergenerational connection is not charity; it is restoring what used to be normal.`,

    practicalExercise: {
      title: 'Get Involved in Intergenerational Programs',
      steps: [
        {
          title: 'Find Programs Nearby',
          description: `Search "intergenerational programs" + your city. Libraries, schools, senior centers, and nonprofits run programs: reading buddies, mentoring, shared housing.`,
        },
        {
          title: 'Match Skills to Program',
          description: `Love kids? Read to preschoolers. Good at math? Tutor middle schoolers. Career expertise? Mentor high schoolers on job skills. Share housing? Nestle programs pair seniors with students.`,
        },
        {
          title: 'Start Small',
          description: `Commit to one hour per week. Programs provide training and support. Many are virtual (if mobility limited).`,
        },
      ],
      toolLink: '/learn',
      toolLabel: 'Intergenerational Resources',
    },

    citations: [
      {
        id: '1',
        text: 'Jarrott, S. E., & Bruno, K. Intergenerational programs: Bringing the generations together.',
        source: 'Journal of Gerontological Social Work',
        year: '2003',
        link: 'https://doi.org/10.1300/J083v40n01_01',
        tier: 1,
      },
      {
        id: '2',
        text: 'Generations United. Intergenerational Programs Toolkit.',
        source: 'Generations United',
        year: '2022',
        link: 'https://www.gu.org/',
        tier: 3,
      },
      {
        id: '3',
        text: 'Kaplan, M., et al. Intergenerational programs in schools, agencies, and faith-based settings.',
        source: 'Educational Gerontology',
        year: '2004',
        link: 'https://doi.org/10.1080/03601270490445078',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          Mr. Thompson volunteers at the elementary school library every Tuesday. He reads to kindergarteners. They sit in a circle, wide-eyed, as he acts out voices from picture books. They call him "Mr. T." One child asks, "Are you my grandpa?" He is not—his own grandchildren live 1,000 miles away. But for one hour a week, he is someone's grandpa. That is enough.
          <Citation index={1} />
        </p>

        <h2>What Are Intergenerational Programs?</h2>
        <p>
          Intergenerational programs intentionally bring together old and young people for mutual benefit. Examples: seniors read to preschoolers, tutor students, mentor teens on career skills, teach art or music, share housing with college students (student lives rent-free in exchange for companionship and light chores). These programs combat age segregation—a modern phenomenon where generations never interact.
          <Citation index={2} />
        </p>

        <StatCard
          value="40%"
          label="reduction in loneliness from intergenerational programs"
          description="Seniors paired with youth report increased purpose, social connection, and life satisfaction."
        />

        <h2>Benefits for Both Generations</h2>
        <p>
          For seniors: reduced loneliness, increased purpose, cognitive stimulation (teaching keeps mind sharp), physical activity (playing with kids). For youth: improved academic performance (tutoring), reduced ageism (seeing elders as people, not stereotypes), emotional support (mentors provide wisdom and perspective). Win-win.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="Intergenerational programs are not charity—they are exchange. The old give wisdom; the young give energy. Both need what the other has."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(38),
    slug: 'overcoming-barriers-socialization-mobility-hearing-transportation',
    title: 'Overcoming Barriers to Socialization: Mobility, Hearing Loss, Transportation',
    description: `Physical barriers (mobility issues, hearing loss, lack of transportation) isolate older adults—but each barrier has practical solutions that restore connection.`,
    image: '/images/articles/cat17/cover-038.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Mobility', 'Hearing Loss', 'Transportation', 'Accessibility'],

    summary: `Physical barriers prevent social connection: mobility limitations (cannot walk to events, use stairs), hearing loss (conversations are exhausting, isolating), vision loss (cannot drive at night, read event flyers), lack of transportation (cannot drive, no public transit, rides unavailable). Each barrier compounds loneliness. Yet each has solutions: accessible venues, assistive devices (hearing aids, walkers), transportation services (paratransit, volunteer drivers, ride-sharing), and technology (virtual participation).`,

    keyFacts: [
      {
        text: `Sixty-two percent of adults 70+ have mobility limitations that restrict participation in social activities; accessibility modifications (ramps, seating, transportation) remove barriers.`,
        citationIndex: 1,
      },
      {
        text: `Untreated hearing loss increases social isolation by 50%—conversations are exhausting, group settings overwhelming—yet only 30% of adults with hearing loss use hearing aids.`,
        citationIndex: 2,
      },
      {
        text: `Twenty percent of adults 65+ do not drive; lack of transportation is the #1 barrier to accessing healthcare, social activities, and grocery stores in non-urban areas.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Isolation is not always a choice. Sometimes it is a wheelchair-inaccessible building, a conversation you cannot hear, or a ride you cannot afford. Fixing these barriers is not luxury—it is basic dignity.`,

    practicalExercise: {
      title: 'Identify and Solve Barriers',
      steps: [
        {
          title: 'Identify Your Barriers',
          description: `What prevents you from socializing? Cannot drive? Hearing loss? Stairs too hard? Fatigue? Cost? Fear? Name the specific barrier.`,
        },
        {
          title: 'Research Solutions',
          description: `Mobility: accessible venues, paratransit, scooter/walker. Hearing: hearing aids (subsidized programs exist), captioned events, smaller groups. Transportation: volunteer driver programs (AARP), Uber/Lyft, senior center shuttles.`,
        },
        {
          title: 'Ask for Accommodations',
          description: `Call venue: "Do you have wheelchair access? Hearing loop? Seating?" Many places accommodate if asked. Do not assume—ask.`,
        },
      ],
      toolLink: '/learn',
      toolLabel: 'Accessibility Resources',
    },

    citations: [
      {
        id: '1',
        text: 'Freedman, V. A., et al. Trends in late-life activity limitations.',
        source: 'The Journals of Gerontology Series B',
        year: '2013',
        link: 'https://doi.org/10.1093/geronb/gbs128',
        tier: 1,
      },
      {
        id: '2',
        text: 'Dawes, P., et al. Hearing loss and cognition: The role of hearing aids.',
        source: 'JAMA Otolaryngology',
        year: '2015',
        link: 'https://doi.org/10.1001/jamaoto.2015.1804',
        tier: 1,
      },
      {
        id: '3',
        text: 'Bailey, L. Aging Americans: Stranded Without Options.',
        source: 'Transportation for America',
        year: '2011',
        link: 'https://t4america.org/',
        tier: 3,
      },
    ],

    content: (
      <>
        <p>
          Mrs. Lee loves her book club—or she did, before her hearing got worse. Now she sits in meetings straining to follow conversations. Everyone talks over each other. She smiles and nods but understands half. Afterward, she is exhausted. She stops going. She tells herself it is fine. But she is lonelier than ever.
          <Citation index={1} />
        </p>

        <h2>Common Barriers to Socialization</h2>
        <p>
          Mobility limitations: cannot walk distances, climb stairs, stand for long periods. Limits attendance at events in inaccessible venues. Hearing loss: group conversations overwhelming, restaurants too noisy, phone calls difficult. Social situations become exhausting rather than enjoyable. Vision loss: cannot drive at night, read event flyers, recognize faces across room. Transportation: cannot drive, no public transit, rides unavailable, cost prohibitive.
          <Citation index={2} />
        </p>

        <StatCard
          value="50%"
          label="increase in social isolation from untreated hearing loss"
          description="Conversations become exhausting; group settings overwhelming. Yet only 30% of adults with hearing loss use hearing aids."
        />

        <h2>Solutions for Each Barrier</h2>
        <p>
          Mobility: Choose accessible venues (ramps, elevators, seating). Use assistive devices (walker, wheelchair, scooter). Request accommodations (front-row seating, breaks). Hearing: Get hearing aids (Medicaid, VA, hearing aid banks offer subsidized devices). Choose quieter settings (coffee shop over restaurant). Ask for accommodations (microphone, written materials). Transportation: Paratransit (ADA-mandated service for disabled), volunteer driver programs (AARP, faith communities), ride-sharing (Uber/Lyft), senior center shuttles.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="Isolation is not always about willingness to connect. Sometimes it is about a staircase with no ramp, a conversation you cannot hear, or a ride you cannot get. Fixing these is justice, not charity."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(39),
    slug: 'making-friends-after-65-social-connection-strategies',
    title: 'Making Friends After 65: Strategies for Social Connection in Late Life',
    description: `Making friends after 65 is hard—you lack work environment, childhood connections died or moved—but structured activities, vulnerability, and consistency work.`,
    image: '/images/articles/cat17/cover-039.svg',
    category: CATEGORY_AGING,
    readTime: 10,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Friendship', 'Social Connection', 'Late Life', 'Loneliness'],

    summary: `Making friends after 65 is challenging: work connections end with retirement, childhood friends die or move away, social circles shrink. Yet friendship is possible through structured activities (classes, clubs, volunteer work), shared interests (hobbies, causes), and intentional vulnerability (asking for help, sharing struggles). Keys to late-life friendship: consistency (show up weekly), initiative (invite people to coffee), and patience (friendship takes 50+ hours of interaction to develop).`,

    keyFacts: [
      {
        text: `Developing a casual friendship requires approximately 50 hours of interaction; close friendship requires 200+ hours—meaning consistency and repeated contact are essential.`,
        citationIndex: 1,
      },
      {
        text: `Friendships formed through shared activities (classes, volunteer work, clubs) are more likely to endure than proximity-based friendships (neighbors), because they are built on common interests.`,
        citationIndex: 2,
      },
      {
        text: `Vulnerability accelerates friendship: sharing struggles, asking for help, and emotional openness create deeper bonds faster than surface-level interactions.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Making friends at 70 is harder than making friends at 7—but the friends you make now are chosen, not assigned. They are built on shared values, not shared zip codes. That makes them worth the effort.`,

    practicalExercise: {
      title: 'Build New Friendships',
      steps: [
        {
          title: 'Join Structured Activity',
          description: `Class (art, exercise, language), club (book club, gardening), volunteer work (library, food bank). Shared activity creates repeated contact—foundation of friendship.`,
        },
        {
          title: 'Show Up Consistently',
          description: `Attend same activity weekly. Friendship requires 50+ hours of interaction. Consistency builds familiarity and trust.`,
        },
        {
          title: 'Take Initiative',
          description: `After class, invite someone for coffee. Ask for help (builds connection). Share something personal (vulnerability deepens bonds). Do not wait for others to initiate.`,
        },
      ],
      toolLink: '/learn',
      toolLabel: 'Social Connection Resources',
    },

    citations: [
      {
        id: '1',
        text: 'Hall, J. A. How many hours does it take to make a friend?',
        source: 'Journal of Social and Personal Relationships',
        year: '2019',
        link: 'https://doi.org/10.1177/0265407518761225',
        tier: 1,
      },
      {
        id: '2',
        text: 'Adams, R. G., & Blieszner, R. Aging well with friends and family.',
        source: 'American Behavioral Scientist',
        year: '1995',
        link: 'https://doi.org/10.1177/0002764295039002006',
        tier: 1,
      },
      {
        id: '3',
        text: 'Collins, N. L., & Miller, L. C. Self-disclosure and liking: A meta-analytic review.',
        source: 'Psychological Bulletin',
        year: '1994',
        link: 'https://doi.org/10.1037/0033-2909.116.3.457',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          You are 68 years old. You retired two years ago. Your work friends have drifted away. Your childhood best friend died last year. Your spouse is your only close relationship—and you worry about putting all your social needs on one person. You want friends. But how do you make friends at 68? You do not go to bars. You do not have kids in school to connect with other parents. You feel awkward introducing yourself at senior center. Where do you even start?
          <Citation index={1} />
        </p>

        <h2>Why Friendship Is Hard After 65</h2>
        <p>
          Making friends requires proximity (seeing same people repeatedly) and shared context (common interests, life stage). Childhood and work provide both. After retirement, both disappear. Proximity: no longer see coworkers daily. Shared context: no longer bonding over deadlines, projects, office politics. Add mobility limitations, hearing loss, transportation barriers, and friend-making becomes structurally difficult—not a personal failing.
          <Citation index={2} />
        </p>

        <StatCard
          value="50 hours"
          label="of interaction required to develop a casual friendship"
          description="Close friendship requires 200+ hours. Friendship is not instant—it is built through consistent, repeated contact over time."
        />

        <h2>Strategies That Work</h2>
        <p>
          Join structured activities: Classes, clubs, volunteer work provide proximity and shared context. Show up weekly—consistency builds familiarity. Take initiative: After class, invite someone for coffee. Do not wait for others to approach you. Practice vulnerability: Share something personal (not trauma, but real). Ask for help (builds connection). Emotional openness deepens bonds faster than small talk.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="Making friends at 70 requires what it did at 7: showing up, being brave enough to say hello, and risking rejection. The difference is now you know that rejection is not the end of the world."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
  {
    id: catId(40),
    slug: 'coping-outliving-friends-spouse-grief-isolation',
    title: 'Coping with Outliving Friends and Spouse: Grief and Isolation',
    description: `Outliving your peers brings cumulative grief and shrinking social networks—yet strategies exist to grieve losses while building new connections.`,
    image: '/images/articles/cat17/cover-040.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Grief', 'Widowhood', 'Cumulative Loss', 'Social Networks'],

    summary: `Outliving your peers brings cumulative grief: you lose spouse, siblings, lifelong friends, and with each loss, your social network shrinks. This is not normal grief—it is serial bereavement with no time to recover between losses. The result: social isolation (no one left who remembers your history), identity erosion (you are the last one standing), and depression (grief stacks without resolution). Coping requires: allowing cumulative grief, building intergenerational friendships (not just age peers), and finding meaning beyond "the last one left."`,

    keyFacts: [
      {
        text: `Adults 80+ experience an average of 8-12 significant losses (spouse, siblings, close friends) within a decade—cumulative bereavement without time to fully grieve between losses.`,
        citationIndex: 1,
      },
      {
        text: `Widowhood increases social isolation by 50% because couple-based friendships dissolve—married friends stop inviting the widow, who feels like "third wheel."`,
        citationIndex: 2,
      },
      {
        text: `Building intergenerational friendships (younger friends, mentoring relationships) provides social continuity when age peers die, reducing isolation risk.`,
        citationIndex: 3,
      },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Outliving everyone you love is not a badge of honor—it is cumulative loss without reprieve. The question is not how to avoid grief, but how to grieve and still choose to connect.`,

    practicalExercise: {
      title: 'Navigate Cumulative Grief',
      steps: [
        {
          title: 'Acknowledge Cumulative Loss',
          description: `List everyone you have lost in the past 10 years. Recognize that grief stacks—you are mourning multiple people simultaneously. This is harder than single loss.`,
        },
        {
          title: 'Seek Bereavement Support',
          description: `Join grief support group for widows/widowers or seniors who have lost multiple peers. Sharing cumulative grief with others who understand validates the enormity.`,
        },
        {
          title: 'Build Intergenerational Connections',
          description: `Do not rely only on age peers (who may die). Build friendships with younger people through volunteering, mentoring, family. They provide continuity when peers are gone.`,
        },
      ],
      toolLink: '/crisis',
      toolLabel: 'Grief Resources',
    },

    citations: [
      {
        id: '1',
        text: 'Bergman, E. J., & Haley, W. E. Depressive symptoms, social network, and bereavement experiences in recently widowed adults.',
        source: 'Aging & Mental Health',
        year: '2009',
        link: 'https://doi.org/10.1080/13607860902774410',
        tier: 1,
      },
      {
        id: '2',
        text: 'Utz, R. L., et al. The effect of widowhood on older adults social participation.',
        source: 'The Gerontologist',
        year: '2002',
        link: 'https://doi.org/10.1093/geront/42.4.522',
        tier: 1,
      },
      {
        id: '3',
        text: 'de Jong Gierveld, J., & Havens, B. Cross-national comparisons of social isolation and loneliness.',
        source: 'Canadian Journal on Aging',
        year: '2004',
        link: 'https://doi.org/10.1353/cja.2004.0021',
        tier: 1,
      },
    ],

    content: (
      <>
        <p>
          You are 85. Your spouse died five years ago. Your sister died last year. Your best friend from college died six months ago. You attend more funerals than birthdays. Each loss shrinks your world. Who is left who remembers your wedding? Your first job? The person you were at 30? You are the last one standing. And standing alone.
          <Citation index={1} />
        </p>

        <h2>Cumulative Grief</h2>
        <p>
          Adults 80+ experience serial bereavement: spouse, siblings, lifelong friends die within years of each other. This is not normal grief—it is cumulative loss without time to recover. Each new death reopens old wounds. Grief stacks. The result: depression (unresolved grief accumulates), social isolation (network shrinks with each death), identity erosion (no one left who remembers your history).
          <Citation index={2} />
        </p>

        <StatCard
          value="50%"
          label="increase in social isolation after widowhood"
          description="Couple-based friendships dissolve. Married friends stop inviting the widow, who feels like third wheel. Social network collapses."
        />

        <h2>Building Continuity</h2>
        <p>
          If you rely only on age peers for friendship, your social network will disappear as they die. Strategy: build intergenerational connections. Volunteer with younger people. Mentor. Stay close to younger family members (nieces, nephews, cousins). These relationships provide social continuity when age peers are gone. You will still grieve losses—but you will not be alone.
          <Citation index={3} />
        </p>

        <QuoteBlock
          quote="You cannot avoid outliving people you love. But you can choose to keep connecting—to younger people, to new friends, to the world. Grief and connection are not opposites. They coexist."
          author="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
        />
      </>
    ),
  },
];
