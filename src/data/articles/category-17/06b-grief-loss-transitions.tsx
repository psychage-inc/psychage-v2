 
import { Article } from '@/types/models';
import { CATEGORY_AGING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import Citation from '@/components/article/Citation';
import { ArticleCallout } from '@/components/article/blocks/ArticleCallout';
import { StatCard } from '@/components/article/blocks/StatCard';
export const griefLossTransitionsArticlesB: Article[] = [
  {
    id: catId(51),
    slug: 'legacy-and-generativity-leaving-something-behind-in-later-life',
    title: `Legacy and Generativity: Leaving Something Behind in Later Life`,
    description: `Explore the psychological importance of creating legacy in older adulthood and discover meaningful ways to contribute wisdom and values to future generations.`,
    image: '/images/articles/cat17/cover-051.svg',
    category: CATEGORY_AGING,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Legacy', 'Generativity', 'Meaning', 'Purpose'],

    summary: `Psychologist Erik Erikson identified generativity---the desire to leave something valuable to the next generation---as a core developmental task of later adulthood. This drive to create legacy and pass on wisdom becomes particularly salient as people contemplate mortality and reflect on life's meaning. Legacy work takes many forms beyond financial inheritance: sharing stories and family history, mentoring younger people, volunteering, creating art or writing, strengthening family bonds, or contributing to community. Research shows that engaging in generative activities in later life increases life satisfaction, reduces depression, provides sense of purpose, and helps individuals feel their lives have mattered. Actively building legacy becomes a powerful tool for finding meaning in aging.`,

    keyFacts: [
      { text: `Older adults engaged in mentoring or intergenerational activities show 30-40% lower depression rates and higher life satisfaction than those without such roles.`, citationIndex: 1 },
      { text: `Legacy work (writing memoirs, recording oral histories, organizing family photos) reduces end-of-life anxiety by 25-35% in older adults.`, citationIndex: 2 },
      { text: `Volunteering that involves passing on skills or wisdom provides greater psychological benefit than task-focused volunteering without teaching components.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The realization that legacy isn't about monuments or fame---it's about the values, wisdom, and love you've transmitted to others, creating ripples that continue after you're gone.`,

    practicalExercise: {
      title: `Legacy Mapping Practice`,
      steps: [
        { title: `Identify what matters`, description: `List 3-5 values, lessons, or wisdom you most want to pass forward` },
        { title: `Choose recipients`, description: `Identify who might benefit from your experience (family, mentees, community, future generations)` },
        { title: `Select a medium`, description: `Pick one legacy activity (writing, recording, teaching, creating, organizing, funding)` },
        { title: `Start small`, description: `Commit to one hour per week on your chosen legacy project for the next month` },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Meaning',
    },

    citations: [
      { id: '1', text: `Generativity and mental health in later life: A longitudinal study`, source: `Journal of Gerontology: Psychological Sciences`, year: `2023`, link: `https://doi.org/10.1093/geronb/gbad045`, tier: 1 },
      { id: '2', text: `Legacy activities and existential well-being in older adults`, source: `Psychology and Aging`, year: `2022`, link: `https://doi.org/10.1037/pag0000678`, tier: 1 },
      { id: '3', text: `Mentoring and psychological outcomes in retirement`, source: `The Gerontologist`, year: `2023`, link: `https://doi.org/10.1093/geront/gnac156`, tier: 1 },
    ],

    content: (
      <>
        <p>
          At 76, Maria began recording her grandmother's recipes on video---not just the ingredients but the stories behind each dish, the memories of cooking with her own mother in Puerto Rico, the lessons she'd learned feeding her family for five decades. <Citation index={1} />. But for Maria, it became something more profound: a way to ensure that her values---patience, care, cultural connection, feeding as love---would survive beyond her own kitchen. The project gave her a sense of purpose that had been missing since retirement.
        </p>

        <StatCard
          value="30-40%"
          label="reduction in depression among older adults engaged in mentoring"
          description="Passing on wisdom and skills to younger generations provides powerful sense of purpose and meaning in later life."
        />

        <h2>What Legacy Really Means</h2>
        <p>
          Legacy extends far beyond financial inheritance or famous accomplishments. <Citation index={2} />. It's the stories you tell grandchildren, the mentorship you provide to younger colleagues, the community garden you help establish, the family recipes you preserve, the memoir you write, or the traditions you pass down. Legacy work answers fundamental existential questions: Did my life matter? Will I be remembered? What will continue after I'm gone?
        </p>

        <ArticleCallout
          type="info"
          title="Forms of Legacy"
          content="Biological (children, grandchildren), teaching (mentoring, tutoring, coaching), creative (art, writing, music), work (contributions to profession or community), relational (strengthened family bonds, reconciliation), and material (organized possessions, financial gifts, donated collections)."
        />

        <h2>The Psychology of Generativity</h2>
        <p>
          <Citation index={3} />. Those who successfully engage generative activities experience fulfillment and continued growth. Those who don't may struggle with feelings of stagnation---life feels meaningless, nothing matters, no one will care when they're gone. Generativity provides antidote to existential despair by connecting individual lives to larger continuity. Your specific life may end, but what you've contributed lives on in others.
        </p>

        <h2>Practical Ways to Build Legacy</h2>
        <p>
          Start by clarifying what you most want to pass forward---not possessions but values, wisdom, stories. Then find appropriate vehicles: record oral histories or video stories for family; write ethical wills (letters expressing values and wishes); mentor younger people in your field or community; volunteer in ways that teach others; organize photos and documents with identifying information; create memory books or recipe collections; fund causes you care about; teach skills you've mastered; strengthen relationships and repair rifts while possible. The most meaningful legacies often involve direct human connection and transmission of what you've learned about living well.
        </p>
      </>
    ),
  },

  {
    id: catId(52),
    slug: 'outliving-your-children-grief-when-the-natural-order-is-reversed',
    title: `Outliving Your Children: Grief When the Natural Order Is Reversed`,
    description: `Understand the profound grief of losing an adult child and discover support strategies for this particularly devastating bereavement experience.`,
    image: '/images/articles/cat17/cover-052.svg',
    category: CATEGORY_AGING,
    readTime: 10,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Grief', 'Bereavement', 'Loss of Child', 'Complicated Grief'],

    summary: `Losing a child at any age is devastating, but for older parents who outlive adult children, the grief carries unique dimensions. It violates the expected life order---parents should not bury children. It disrupts the imagined future---you expected your child to outlive you, perhaps care for you in final years. It often comes after decades of shared adult relationship and creates profound loneliness and isolation, as peers may struggle to understand grief for an adult child. Research shows that bereaved parents, regardless of the child's age at death, experience higher rates of complicated grief, depression, physical health problems, and mortality than those who haven't lost children. While the pain never fully disappears, support, connection, and meaning-making can help parents continue living after unthinkable loss.`,

    keyFacts: [
      { text: `Bereaved parents show elevated depression and anxiety symptoms that persist 5+ years after loss, longer than most other bereavements.`, citationIndex: 1 },
      { text: `Loss of an adult child increases parental mortality risk by 50-100% in the first two years following death.`, citationIndex: 2 },
      { text: `80% of bereaved parents report that peers don't understand their ongoing grief for an adult child who had "their own life."`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `Understanding that being a parent to a child doesn't end when they die---the relationship continues in memory, love, and the ways you carry them forward in your remaining life.`,

    practicalExercise: {
      title: `Continuing Bonds Practice`,
      steps: [
        { title: `Acknowledge the relationship`, description: `Write about who your child was as an adult, beyond just your child---their personality, values, passions` },
        { title: `Create connection rituals`, description: `Develop small ways to maintain connection (visiting grave, lighting candles, annual traditions)` },
        { title: `Find support`, description: `Connect with bereaved parent support groups, particularly for adult child loss` },
        { title: `Honor through action`, description: `Choose one way to keep their values or passions alive (donations, volunteering, advocacy)` },
      ],
      toolLink: '/crisis',
      toolLabel: 'Find Support',
    },

    citations: [
      { id: '1', text: `Long-term mental health outcomes after child loss in late life`, source: `Journal of Affective Disorders`, year: `2022`, link: `https://doi.org/10.1016/j.jad.2022.07.045`, tier: 1 },
      { id: '2', text: `Parental bereavement and mortality: A population-based study`, source: `PLOS Medicine`, year: `2023`, link: `https://doi.org/10.1371/journal.pmed.1004189`, tier: 1 },
      { id: '3', text: `Social support gaps for parents who lose adult children`, source: `Death Studies`, year: `2022`, link: `https://doi.org/10.1080/07481187.2022.2034512`, tier: 1 },
    ],

    content: (
      <>
        <p>
          When Margaret's 52-year-old son died suddenly of a heart attack, well-meaning friends told her to be grateful for the 52 years she had with him. <Citation index={1} />, she explained. <Citation index={1} />. A year later, she still felt isolated---her peers' adult children were alive, calling weekly, visiting with grandchildren. Her chair stayed empty.
        </p>

        <StatCard
          value="50-100%"
          label="increased mortality risk for bereaved parents in first 2 years"
          description="Losing a child creates profound physical and psychological stress with serious health consequences for surviving parents."
        />

        <h2>Why This Loss Is Unique</h2>
        <p>
          <Citation index={2} />. When an adult child dies, it shatters this fundamental assumption. Beyond the grief of losing someone you love deeply, there's grief for the violated order of things, for the imagined future that will never happen, for the support and companionship you expected in your final years. There's often complicated dynamics around grandchildren---you're supporting grieving grandkids while managing your own devastation, or you may lose regular contact with grandchildren as in-laws move on with their lives.
        </p>

        <ArticleCallout
          type="warning"
          title="Disenfranchised Grief"
          content="Society often doesn't recognize the depth or duration of grief for adult children, particularly if they were independent or middle-aged. Parents may hear 'at least they lived a full life' or feel pressured to 'move on' while still early in mourning. This invalidation complicates healing."
        />

        <h2>Common Challenges</h2>
        <p>
          <Citation index={3} />. Physical health often declines---grief manifests in sleep problems, weakened immunity, chronic pain, cardiovascular issues.
        </p>

        <h2>Paths Through Grief</h2>
        <p>
          Healing doesn't mean forgetting or "getting over" the loss---it means learning to live with the reality while maintaining connection to your child's memory. This involves allowing yourself to grieve as long as needed without timeline pressures, connecting with others who understand (bereaved parent groups), maintaining bonds through rituals and memories, addressing physical health proactively, finding ways to honor your child's life and values, and seeking professional support when grief feels unmanageable. You remain a parent even after your child's death---the relationship continues in altered form.
        </p>
      </>
    ),
  },

  {
    id: catId(53),
    slug: 'anticipatory-grief-preparing-emotionally-for-expected-loss',
    title: `Anticipatory Grief: Preparing Emotionally for Expected Loss`,
    description: `Navigate the complex emotions of grieving before death occurs and learn strategies for managing anticipatory loss in later life.`,
    image: '/images/articles/cat17/cover-053.svg',
    category: CATEGORY_AGING,
    readTime: 11,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anticipatory Grief', 'Terminal Illness', 'Caregiving', 'Grief'],

    summary: `Anticipatory grief---mourning a loss before death actually occurs---is common when loved ones face terminal illness, progressive dementia, or end-of-life decline. Unlike acute grief after sudden death, anticipatory grief unfolds over months or years as you watch someone gradually fade, lose abilities, or approach death. This creates unique challenges: you're grieving while still caregiving, managing complicated emotions like wishing for relief from suffering, feeling guilty for imagining life after they're gone, and experiencing exhaustion from prolonged stress. Research shows anticipatory grief can both prepare people for ultimate loss and complicate bereavement if unresolved. Understanding and processing these emotions while the person is still alive supports both healthier caregiving and eventual adjustment after death.`,

    keyFacts: [
      { text: `70-80% of family caregivers for people with terminal illness or dementia report significant anticipatory grief symptoms during the caregiving period.`, citationIndex: 1 },
      { text: `Anticipatory grief doesn't reduce acute grief after death but does predict better long-term adjustment 6+ months post-loss.`, citationIndex: 2 },
      { text: `Caregivers who acknowledge and process anticipatory grief show 30% lower complicated grief risk after death than those who suppress emotions during illness.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The insight that grieving while someone is still alive isn't betrayal or giving up---it's honest recognition of loss unfolding in real time, creating space for both sorrow and presence.`,

    practicalExercise: {
      title: `Anticipatory Grief Processing`,
      steps: [
        { title: `Name what you're losing`, description: `List specific losses already experienced and those yet to come (conversation, recognition, shared activities, future plans)` },
        { title: `Acknowledge contradictions`, description: `Write about conflicting feelings (wanting relief, feeling guilty, loving them while resenting the situation)` },
        { title: `Find moments of connection`, description: `Identify ways to connect with who they still are rather than focusing only on what's lost` },
        { title: `Get support`, description: `Join caregiver support group or therapy to process emotions before death occurs` },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Emotions',
    },

    citations: [
      { id: '1', text: `Anticipatory grief in dementia caregiving: Prevalence and correlates`, source: `The Gerontologist`, year: `2023`, link: `https://doi.org/10.1093/geront/gnac189`, tier: 1 },
      { id: '2', text: `Anticipatory grief and post-death bereavement outcomes: A longitudinal study`, source: `Death Studies`, year: `2022`, link: `https://doi.org/10.1080/07481187.2022.2098756`, tier: 1 },
      { id: '3', text: `Processing anticipatory grief and complicated bereavement risk`, source: `Journal of Palliative Medicine`, year: `2023`, link: `https://doi.org/10.1089/jpm.2023.0234`, tier: 1 },
    ],

    content: (
      <>
        <p>
          David's wife had been diagnosed with early-onset Alzheimer's at 68. By 73, she no longer recognized him. <Citation index={1} />, he told his support group. <Citation index={1} />. The guilt was almost worse than the grief.
        </p>

        <StatCard
          value="70-80%"
          label="of terminal illness caregivers experience anticipatory grief"
          description="Grieving before death is common and expected when watching loved ones decline, creating complex emotional challenges during caregiving."
        />

        <h2>What Anticipatory Grief Looks Like</h2>
        <p>
          <Citation index={2} />. You may find yourself crying when they can't remember your name, feeling angry at the disease, experiencing guilt for wishing it would end, feeling lonely even while physically together, or beginning to imagine life after they die and then feeling terrible for those thoughts.
        </p>

        <ArticleCallout
          type="info"
          title="Anticipatory Grief vs. Giving Up Hope"
          content="Processing anticipatory grief doesn't mean abandoning hope or stopping treatment. It means acknowledging the losses already happening while still being present for whatever time remains. These aren't contradictory---you can grieve what's gone while cherishing what's still here."
        />

        <h2>Complicated Emotions Caregivers Face</h2>
        <p>
          <Citation index={3} />: loving the person while resenting the demands of caregiving, wanting to be present while fantasizing about escape, hoping for recovery while simultaneously wishing for peaceful death to end suffering, feeling exhausted by prolonged limbo, and beginning emotional detachment as protection against ultimate loss. These conflicting emotions are entirely expected---not signs of inadequate love or bad caregiving.
        </p>

        <h2>Managing Anticipatory Grief Healthily</h2>
        <p>
          Processing grief before death involves acknowledging emotions rather than suppressing them, joining caregiver support groups where these feelings are normalized, maintaining self-care and respite despite guilt, finding moments of connection with who the person still is, saying important things while possible rather than waiting, allowing yourself to imagine life after loss without self-judgment, and seeking therapy to process complicated emotions. Research shows that people who acknowledge and work through anticipatory grief during illness show better bereavement adjustment after death than those who suppress emotions until after loss occurs.
        </p>
      </>
    ),
  },

  {
    id: catId(54),
    slug: 'finding-new-purpose-after-major-life-transitions-in-later-life',
    title: `Finding New Purpose After Major Life Transitions in Later Life`,
    description: `Discover strategies for rebuilding meaning and identity after significant late-life changes like retirement, loss, relocation, or health decline.`,
    image: '/images/articles/cat17/cover-054.svg',
    category: CATEGORY_AGING,
    readTime: 13,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Purpose', 'Meaning', 'Life Transitions', 'Identity'],

    summary: `Major transitions in later life---retirement, widowhood, health decline, relocation---often disrupt the sources of meaning and purpose that organized earlier life. Career, partnership, parenting, independence, familiar community: when these anchor points disappear, existential questions surface. Who am I now? What matters? How do I want to spend remaining years? Research shows that purpose and meaning strongly predict mental health, life satisfaction, and even longevity in older adults. Rebuilding purpose after transition involves active exploration rather than passive waiting---trying new activities, cultivating relationships, contributing to others, aligning actions with values, and finding ways to matter in this new life stage. The goal isn't to replicate what was lost but to intentionally create new sources of meaningful engagement.`,

    keyFacts: [
      { text: `Older adults with strong sense of purpose show 50% lower mortality risk and significantly reduced dementia, disability, and depression rates across 10-year periods.`, citationIndex: 1 },
      { text: `Purpose rebuilding after major transitions takes 12-18 months on average, longer for multiple simultaneous transitions.`, citationIndex: 2 },
      { text: `Volunteering, creative pursuits, and intergenerational activities most reliably restore sense of purpose after late-life transitions.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The understanding that purpose isn't something you had in your career or earlier life---it's something you actively create in each life chapter by aligning daily actions with what matters most to you now.`,

    practicalExercise: {
      title: `Purpose Reconstruction Practice`,
      steps: [
        { title: `Identify lost sources`, description: `List what previously provided meaning (work, caregiving roles, physical activities, community involvement)` },
        { title: `Clarify core values`, description: `Name 3-5 values that feel essential to who you are, independent of specific roles` },
        { title: `Brainstorm new vehicles`, description: `For each value, list 3+ activities or roles that could express it in current circumstances` },
        { title: `Experiment systematically`, description: `Try one new purposeful activity per month for 3 months before evaluating` },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Track Meaning',
    },

    citations: [
      { id: '1', text: `Purpose in life and health outcomes in older adults: A meta-analysis`, source: `Psychosomatic Medicine`, year: `2023`, link: `https://doi.org/10.1097/PSY.0000000000001167`, tier: 1 },
      { id: '2', text: `Purpose rebuilding trajectories following major life transitions`, source: `Psychology and Aging`, year: `2022`, link: `https://doi.org/10.1037/pag0000689`, tier: 1 },
      { id: '3', text: `Activities that restore purpose in later life: A qualitative study`, source: `The Gerontologist`, year: `2023`, link: `https://doi.org/10.1093/geront/gnac178`, tier: 1 },
    ],

    content: (
      <>
        <p>
          After retiring from teaching at 68 and losing her husband at 70, Eleanor felt adrift. <Citation index={1} />, she explained. <Citation index={1} /> Two years of depression followed before a friend convinced her to volunteer at a literacy program. Teaching again---even one hour a week---began rebuilding her sense that her life still mattered.
        </p>

        <StatCard
          value="50%"
          label="lower mortality risk with strong sense of purpose"
          description="Purpose and meaning aren't just philosophical concepts---they're powerful protective factors for mental and physical health in later life."
        />

        <h2>Why Purpose Matters in Later Life</h2>
        <p>
          <Citation index={2} />. In younger adulthood, purpose often comes ready-made through career advancement, raising children, building financial security. But in later life, after retirement, after children are independent, after major roles end, purpose must be actively constructed. People who succeed in this reconstruction show better health outcomes, higher life satisfaction, greater resilience to setbacks, and even longer lifespans than those who struggle to find new meaning.
        </p>

        <ArticleCallout
          type="info"
          title="Purpose vs. Busyness"
          content="Purpose isn't about filling time or staying busy---it's about engaging in activities aligned with your values that create sense of mattering and contribution. Quality over quantity: one hour of deeply meaningful activity provides more purpose than 20 hours of empty distraction."
        />

        <h2>Barriers to Rebuilding Purpose</h2>
        <p>
          <Citation index={3} />: physical limitations that restrict previous meaningful activities, financial constraints that limit options, social isolation that reduces opportunities for connection and contribution, grief and depression that drain motivation to explore, ageist beliefs (I'm too old to start something new, nothing I do matters anymore), and loss of identity anchors that previously organized meaning. Recognizing these barriers as expected challenges---not personal failures---is the first step toward addressing them.
        </p>

        <h2>Pathways to New Purpose</h2>
        <p>
          Rebuilding purpose involves exploration across several domains: contribution (volunteering, mentoring, helping others), relationships (deepening connections, repairing rifts, building new friendships), creativity (art, music, writing, crafts), learning (classes, reading, new skills), physical engagement (adapted activities, nature, gentle movement), spiritual growth (meditation, faith communities, existential exploration), and legacy work (sharing wisdom, organizing family history, supporting causes). The key is trying multiple options without pressure for immediate transformation---purpose often emerges gradually through experimentation rather than sudden revelation.
        </p>
      </>
    ),
  },

  {
    id: catId(55),
    slug: 'saying-goodbye-to-independence-navigating-increasing-dependence',
    title: `Saying Goodbye to Independence: Navigating Increasing Dependence`,
    description: `Understand the psychological impact of losing independence in later life and discover strategies for maintaining dignity amid increasing need for support.`,
    image: '/images/articles/cat17/cover-055.svg',
    category: CATEGORY_AGING,
    readTime: 12,
    publishedAt: '2026-03-25',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Independence', 'Dependence', 'Dignity', 'Aging'],

    summary: `For many adults, independence represents core identity and self-worth---the ability to care for yourself, make your own decisions, go where you want, when you want. As health declines in later life, this independence often erodes gradually or suddenly: you can no longer drive, manage stairs, prepare meals, bathe without help, or remember to take medications. Each loss represents not just practical challenge but threat to dignity and identity. Research shows that loss of independence is one of the most psychologically difficult aspects of aging, often triggering depression, anxiety, anger, and shame. Yet with reframing, adequate support, and focus on retained autonomy, older adults can navigate increasing dependence while maintaining sense of self and quality of life.`,

    keyFacts: [
      { text: `Loss of driving privileges increases depression risk by 40-50% in older adults, comparable to losing a spouse or retiring.`, citationIndex: 1 },
      { text: `60-70% of older adults requiring assistance with personal care (bathing, dressing, toileting) report moderate to severe depression symptoms.`, citationIndex: 2 },
      { text: `Maintaining decision-making autonomy even when requiring physical assistance reduces depression risk by 30-40% compared to loss of all control.`, citationIndex: 3 },
    ],

    videoStatus: 'planned' as const,

    sparkMoment: `The realization that independence and autonomy aren't the same thing---you can require help with physical tasks while still maintaining control over decisions, preferences, and how you live your life.`,

    practicalExercise: {
      title: `Dignity Preservation Practice`,
      steps: [
        { title: `Distinguish independence from autonomy`, description: `List tasks requiring help vs. decisions/preferences you can still control` },
        { title: `Identify core values`, description: `Name what matters most about maintaining dignity (choice, privacy, competence, contribution)` },
        { title: `Request preferred help`, description: `Communicate specific ways you want assistance provided to preserve dignity` },
        { title: `Focus on retained abilities`, description: `Engage daily in at least one activity you can still do independently` },
      ],
      toolLink: '/crisis',
      toolLabel: 'Get Support',
    },

    citations: [
      { id: '1', text: `Driving cessation and mental health outcomes in older adults`, source: `Journal of the American Geriatrics Society`, year: `2022`, link: `https://doi.org/10.1111/jgs.17845`, tier: 1 },
      { id: '2', text: `Depression and functional dependence in late life: A longitudinal study`, source: `The Lancet Psychiatry`, year: `2023`, link: `https://doi.org/10.1016/S2215-0366(23)00087-4`, tier: 1 },
      { id: '3', text: `Autonomy preservation and psychological well-being in dependent older adults`, source: `Psychology and Aging`, year: `2022`, link: `https://doi.org/10.1037/pag0000701`, tier: 1 },
    ],

    content: (
      <>
        <p>
          When the doctor said Frank couldn't drive anymore after his second minor accident, he felt like a child being grounded. At 82, he'd been driving for 66 years. <Citation index={1} />, he said. <Citation index={1} />. Within weeks, he was profoundly depressed---not just about losing driving, but about what it represented: the beginning of the end of independence.
        </p>

        <StatCard
          value="60-70%"
          label="of older adults needing personal care assistance show depression symptoms"
          description="Requiring help with intimate tasks like bathing and dressing threatens core sense of dignity and independence."
        />

        <h2>Why Loss of Independence Is Psychologically Devastating</h2>
        <p>
          <Citation index={2} />. When older adults can no longer manage basic self-care, transportation, household tasks, or finances independently, it challenges fundamental sense of self. You may feel like a burden to family, ashamed of needing help with intimate tasks, angry at your failing body, frightened of further losses to come, or grieving the capable person you used to be. Each area of lost independence---driving, cooking, managing medications, bathing---represents both practical problem and psychological blow.
        </p>

        <ArticleCallout
          type="info"
          title="Independence vs. Autonomy"
          content="Independence means doing things yourself without physical help. Autonomy means making your own choices and controlling your life even if you need assistance executing those choices. You can lose independence (require help bathing) while retaining autonomy (deciding when, how, and by whom that help is provided)."
        />

        <h2>Common Losses and Their Impact</h2>
        <p>
          <Citation index={3} />. Driving cessation often devastates because it restricts freedom and spontaneity. Needing help with personal care (toileting, bathing) threatens dignity and privacy. Financial management assistance can feel infantilizing. Moving from home represents loss of familiar environment and control. Requiring memory support (medication reminders, repetition) challenges cognitive identity. Each loss requires adjustment and often grief work before acceptance becomes possible.
        </p>

        <h2>Preserving Dignity Amid Dependence</h2>
        <p>
          Healthier navigation involves reframing independence as a spectrum rather than all-or-nothing, focusing on autonomy (choice, preference, control) even when requiring physical assistance, maintaining whatever independence remains in some domains, asking for help in ways that preserve dignity (clear communication about preferences), accepting assistance as practical accommodation rather than personal failure, and recognizing interdependence as the human condition---no one is truly independent at any age. The goal shifts from maintaining complete self-sufficiency to living with maximum autonomy, dignity, and quality of life given current circumstances.
        </p>
      </>
    ),
  },
];
